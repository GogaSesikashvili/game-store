using Store.Data.Entities;

namespace Store.Data.Interfaces
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
        Task<List<Comment>> GetByGameIdAsync(int gameId);
        Task DeleteByIdWithSubCommentsAsync(int id);
    }
}