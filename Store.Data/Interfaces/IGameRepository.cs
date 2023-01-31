using Store.Data.Entities;

namespace Store.Data.Interfaces
{
    public interface IGameRepository : IBaseRepository<Game>
    {
        Task<IEnumerable<Game>> GetAllWithDetailsAsync();
        Task<Game> GetByIdWithDetailsAsync(int id);
        Task UpdateWithDetailsAsync(Game entity);
    }
}