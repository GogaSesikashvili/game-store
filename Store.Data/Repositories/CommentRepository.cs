using Microsoft.EntityFrameworkCore;
using Store.Data.DataAccess;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Data.Repositories
{
    public class CommentRepository : BaseRepository<Comment, DbContext>, ICommentRepository
    {
        public CommentRepository(StoreDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Deletes comment including sub comments.
        /// </summary>
        /// <param name="id">Id.</param>
        public async Task DeleteByIdWithSubCommentsAsync(int id)
        {
            var comment = await GetByIdAsync(id);

            var allComments = await dbSet.ToListAsync();

            var subComments = from comments in allComments
                              where comments.ReplyId == comment.Id
                              select comments;

            if (subComments != null)
            {
                foreach (var subComment in subComments)
                {
                    dbSet.Remove(subComment);
                }
            }
            

            dbSet.Remove(comment);
        }

        public async Task<List<Comment>> GetByGameIdAsync(int gameId)
        {
            return await (
                from c in dbSet
                where c.GameId == gameId
                select c
                ).ToListAsync();
        }
    }
}