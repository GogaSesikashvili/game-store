using Microsoft.EntityFrameworkCore;
using Store.Data.DataAccess;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Data.Repositories
{
    public class GenreRepository : BaseRepository<Genre, DbContext>, IGenreRepository
    {
        public GenreRepository(StoreDbContext context) : base(context)
        {
        }
    }
}