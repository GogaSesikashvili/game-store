namespace Store.Business.Interfaces
{
    public interface ICrud<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();

        Task<T> GetByIdAsync(int id);

        Task AddAsync(T model);

        Task UpdateAsync(T model);

        Task DeleteAsync(int modelId);
    }
}