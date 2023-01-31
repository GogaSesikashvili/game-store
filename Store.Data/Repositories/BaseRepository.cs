using Microsoft.EntityFrameworkCore;
using Store.Data.Interfaces;

namespace Store.Data.Repositories
{
    public class BaseRepository<T, D> : IBaseRepository<T>
        where T : class
        where D : DbContext
    {
        protected readonly D dbContext;
        protected readonly DbSet<T> dbSet;

        public BaseRepository(D dbContext)
        {
            this.dbContext = dbContext;
            dbSet = dbContext.Set<T>();
        }

        /// <summary>
        /// Gets all entities.
        /// </summary>
        /// <returns>Entities.</returns>
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        /// <summary>
        /// Gets entity by id.
        /// </summary>
        /// <param name="id">Id.</param>
        /// <returns>Entity.</returns>
        public async Task<T> GetByIdAsync(int id)
        {
            return await dbSet.FindAsync(id);
        }

        /// <summary>
        /// Adds entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        public async Task AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
        }

        /// <summary>
        /// Updates entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            dbSet.Update(entity);
        }

        /// <summary>
        /// Deletes entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            dbSet.Remove(entity);
        }

        /// <summary>
        /// Deletes entity by id.
        /// </summary>
        /// <param name="id">Id.</param>
        public async Task DeleteByIdAsync(int id)
        {
            var entity = await GetByIdAsync(id);

            dbSet.Remove(entity);
        }

        /// <summary>
        /// Gets table of entity.
        /// </summary>
        public IQueryable<T> Table => dbSet;
    }
}