using AutoMapper;
using Store.Business.Interfaces;
using Store.Business.Models;
using Store.Business.Validation;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Business.Services
{
    public class GenreService : IGenreService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IGenreRepository genreRepo;

        public GenreService(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            genreRepo = uow.GenreRepository;
            this.mapper = mapper;
        }

        public async Task AddAsync(GenreModel model)
        {
            if (model == null)
            {
                throw new StoreException(nameof(model));
            }

            var genre = mapper.Map<Genre>(model);

            await genreRepo.AddAsync(genre);

            await uow.SaveAsync();
        }

        public async Task DeleteAsync(int modelId)
        {
            await genreRepo.DeleteByIdAsync(modelId);

            await uow.SaveAsync();
        }

        /// <summary>
        /// Gets all genres and orders by parent id.
        /// </summary>
        /// <returns>All ordered genres.</returns>
        public async Task<IEnumerable<GenreModel>> GetAllAsync()
        {
            var genres = await genreRepo.GetAllAsync();

            if (genres == null)
            {
                throw new StoreException(nameof(genres));
            }

            var orderedGenres = genres
                .OrderBy(g => g.ParentId == 0 ? g.Id : g.ParentId);

            var model = mapper.Map<IEnumerable<GenreModel>>(orderedGenres);

            return model;
        }

        public async Task<GenreModel> GetByIdAsync(int id)
        {
            var genre = await genreRepo.GetByIdAsync(id);

            if (genre == null)
            {
                throw new StoreException(nameof(genre));
            }

            var model = mapper.Map<GenreModel>(genre);

            return model;
        }

        public async Task UpdateAsync(GenreModel model)
        {
            if (model == null)
            {
                throw new StoreException(nameof(model));
            }

            var genre = mapper.Map<Genre>(model);

            genreRepo.Update(genre);

            await uow.SaveAsync();
        }
    }
}