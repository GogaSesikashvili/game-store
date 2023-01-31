using Microsoft.AspNetCore.Mvc;
using Store.Business.Interfaces;
using Store.Business.Models;

namespace Store.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService genreService;

        public GenresController(IGenreService genreService)
        {
            this.genreService = genreService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreModel>>> Get()
        {
            var model = await genreService.GetAllAsync();

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreModel>> GetById(int id)
        {
            var model = await genreService.GetByIdAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] GenreModel model)
        {
            if (model == null)
            {
                return NotFound();
            }

            await genreService.AddAsync(model);

            return CreatedAtRoute(Url.Link(nameof(GetById), model.Id), model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int Id, [FromBody] GenreModel model)
        {
            if (Id != model.Id)
            {
                return NotFound();
            }

            await genreService.UpdateAsync(model);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await genreService.DeleteAsync(id);

            return NoContent();
        }
    }
}