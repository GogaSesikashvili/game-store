namespace Store.Data.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        /// <summary>
        /// Gets all entities.
        /// </summary>
        /// <returns>Entities.</returns>
        Task<IEnumerable<T>> GetAllAsync();

        /// <summary>
        /// Gets entity by id.
        /// </summary>
        /// <param name="id">Id.</param>
        /// <returns>Entity.</returns>
        Task<T> GetByIdAsync(int id);

        /// <summary>
        /// Adds entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        Task AddAsync(T entity);

        /// <summary>
        /// Updates entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        void Update(T entity);

        /// <summary>
        /// Deletes entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        void Delete(T entity);

        /// <summary>
        /// Deletes entity by id.
        /// </summary>
        /// <param name="id">Id.</param>
        Task DeleteByIdAsync(int id);

        /// <summary>
        /// Gets table of entity.
        /// </summary>
        IQueryable<T> Table { get; }
    }
}