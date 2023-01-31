using Microsoft.AspNetCore.Mvc;
using Store.Business.Interfaces;
using Store.Business.Models;

namespace Store.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService commentService;

        public CommentsController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetByGameId(int gameId)
        {
            var model = await commentService.GetByGameIdAsync(gameId);

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] CommentModel model)
        {
            if (model == null)
            {
                return NotFound();
            }

            await commentService.AddAsync(model);

            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] CommentModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            await commentService.UpdateAsync(model);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await commentService.DeleteAsync(id);

            return NoContent();
        }
    }
}