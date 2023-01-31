using Store.Business.Models;

namespace Store.Business.Interfaces
{
    public interface ICommentService : ICrud<CommentModel>
    {
        Task<IEnumerable<CommentModel>> GetByGameIdAsync(int gameId);
    }
}