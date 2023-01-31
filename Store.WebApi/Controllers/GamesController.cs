using Microsoft.AspNetCore.Mvc;
using Store.Business.Interfaces;
using Store.Business.Models;

namespace Store.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGameService gameService;

        public GamesController(IGameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameModel>>> Get()
        {
            var model = await gameService.GetAllAsync();

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameModel>> GetById(int id)
        {
            var model = await gameService.GetByIdAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] GameModel model)
        {
            if (model == null)
            {
                return NotFound();
            }

            await gameService.AddAsync(model);

            return CreatedAtRoute(Url.Link(nameof(GetById), model.Id), model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] GameModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            await gameService.UpdateAsync(model);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await gameService.DeleteAsync(id);

            return NoContent();
        }
    }
}