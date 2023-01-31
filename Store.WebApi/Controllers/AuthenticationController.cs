using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.Business.Models;
using Store.Data.DataAccess;
using Store.Data.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Store.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly StoreDbContext context;
        private readonly IConfiguration configuration;
        private readonly TokenValidationParameters tokenValidationParameters;

        public AuthenticationController(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            StoreDbContext context,
            IConfiguration configuration,
            TokenValidationParameters tokenValidationParameters)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.context = context;
            this.configuration = configuration;
            this.tokenValidationParameters = tokenValidationParameters;
        }

        [HttpPost("update-avatar")]
        public async Task<IActionResult> UpdateAvatar([FromBody] AvatarUpdateModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, provide all the required fields");
            }

            var user = await userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return BadRequest($"User {user} doesn't exists");
            }

            user.Avatar = model.AvatarUrl;

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok("Avatar updated");
            }

            return BadRequest("Avatar could not be updated");
        }

        [HttpPost("register-user")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, provide all the required fields");
            }

            var userExistsWithEmail = await userManager.FindByEmailAsync(model.EmailAddress);

            if (userExistsWithEmail != null)
            {
                return BadRequest($"User {model.EmailAddress} already exists");
            }

            var userExistsWithName = await userManager.FindByNameAsync(model.UserName);

            if (userExistsWithName != null)
            {
                return BadRequest($"User {model.UserName} already exists");
            }

            ApplicationUser newUser = new ApplicationUser()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.EmailAddress,
                UserName = model.UserName,
                Avatar = model.Avatar,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var result = await userManager.CreateAsync(newUser, model.Password);

            if (result.Succeeded)
            {
                return Ok("User created");
            }

            return BadRequest("User could not be created");
        }

        [HttpPost("login-user")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, provide all required fields");
            }

            var userExists = await userManager.FindByNameAsync(model.UserName);

            if (userExists != null && await userManager.CheckPasswordAsync(userExists, model.Password))
            {
                var tokenValue = await GenerateJWTTokenAsync(userExists, null);

                return Ok(tokenValue);
            }

            return Unauthorized();
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, provide all required fields");
            }

            var result = await VerifyAndGenerateTokenAsync(model);

            return Ok(result);
        }

        private async Task<AuthResultModel> VerifyAndGenerateTokenAsync(TokenRequestModel tokenRequestModel)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var storedToken = await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequestModel.RefreshToken);

            var dbUser = await userManager.FindByIdAsync(storedToken.UserId);

            try
            {
                /*var tokenCheckResult =*/
                jwtTokenHandler.ValidateToken(tokenRequestModel.Token, tokenValidationParameters, out var validatedToken);

                return await GenerateJWTTokenAsync(dbUser, storedToken);
            }
            catch (SecurityTokenExpiredException)
            {
                if (storedToken.DateExpire >= DateTime.UtcNow)
                {
                    return await GenerateJWTTokenAsync(dbUser, storedToken);
                }
                else
                {
                    return await GenerateJWTTokenAsync(dbUser, null);
                }
            }
        }

        private async Task<AuthResultModel> GenerateJWTTokenAsync(ApplicationUser user, RefreshToken rToken)
        {
            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:Issuer"],
                audience: configuration["JWT:Audience"],
                expires: DateTime.UtcNow.AddMinutes(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            if (rToken != null)
            {
                var rTokenResponse = new AuthResultModel()
                {
                    Token = jwtToken,
                    RefreshToken = rToken.Token,
                    ExpiresAt = token.ValidTo,
                    FullName = user.FirstName + " " + user.LastName,
                    Avatar = user.Avatar
                };

                return rTokenResponse;
            }

            var refreshToken = new RefreshToken()
            {
                JwtId = token.Id,
                IsRevoked = false,
                UserId = user.Id,
                DateAdded = DateTime.UtcNow,
                DateExpire = DateTime.UtcNow.AddMonths(6),
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString()
            };

            await context.RefreshTokens.AddAsync(refreshToken);
            await context.SaveChangesAsync();

            var response = new AuthResultModel()
            {
                Token = jwtToken,
                RefreshToken = refreshToken.Token,
                ExpiresAt = token.ValidTo,
                FullName = user.FirstName + " " + user.LastName,
                Avatar = user.Avatar
            };

            return response;
        }
    }
}