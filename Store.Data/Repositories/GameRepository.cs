using Microsoft.EntityFrameworkCore;
using Store.Data.DataAccess;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Data.Repositories
{
    public class GameRepository : BaseRepository<Game, DbContext>, IGameRepository
    {
        public GameRepository(StoreDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Game>> GetAllWithDetailsAsync()
        {
            return await dbSet
                .Include(g => g.Genres)
                .ToListAsync();
        }

        public async Task<Game> GetByIdWithDetailsAsync(int id)
        {
            return await dbSet
                .Include(g => g.Genres)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task UpdateWithDetailsAsync(Game entity)
        {
            var game = await dbSet
                .Include(g => g.Genres)
                .FirstOrDefaultAsync(g => g.Id == entity.Id);

            game.Genres.Where(g => !entity.Genres.Any(eg => eg.Id == g.Id))
                .ToList().ForEach(g => game.Genres.Remove(g));

            entity.Genres.Where(eg => !game.Genres.Any(g => g.Id == eg.Id))
                .ToList().ForEach(eg => game.Genres.Add(new Genre { Id = eg.Id, Name = eg.Name, ParentId = eg.ParentId }));

            game.Name = entity.Name;
            game.Description = entity.Description;
            game.Image = entity.Image;
            game.Price = entity.Price;
        }
    }
}