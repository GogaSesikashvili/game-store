using Microsoft.EntityFrameworkCore;
using Store.Data.DataAccess;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Data.Repositories
{
    public class GameGenreRepository : BaseRepository<GameGenre, DbContext>, IGameGenreRepository
    {
        public GameGenreRepository(StoreDbContext context) : base(context)
        {
        }
    }
}
