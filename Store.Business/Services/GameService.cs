using AutoMapper;
using Store.Business.Interfaces;
using Store.Business.Models;
using Store.Business.Validation;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Business.Services
{
    public class GameService : IGameService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IGameRepository gameRepo;

        public GameService(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            gameRepo = uow.GameRepository;
            this.mapper = mapper;
        }

        public async Task AddAsync(GameModel model)
        {
            if (model == null)
            {
                throw new StoreException(nameof(model));
            }

            var game = mapper.Map<Game>(model);

            var genres = game.Genres;

            game.Genres = null;

            await gameRepo.AddAsync(game);

            await uow.SaveAsync();

            foreach (var genre in genres)
            {
                var gameGenreEntity = new GameGenre()
                {
                    GamesId = game.Id,
                    GenresId = genre.Id,
                };

                await uow.GameGenreRepository.AddAsync(gameGenreEntity);

                await uow.SaveAsync();
            }
        }

        public async Task DeleteAsync(int modelId)
        {
            await gameRepo.DeleteByIdAsync(modelId);

            await uow.SaveAsync();
        }

        public async Task<IEnumerable<GameModel>> GetAllAsync()
        {
            var games = await gameRepo.GetAllWithDetailsAsync();

            if (games == null)
            {
                throw new StoreException(nameof(games));
            }

            var model = mapper.Map<IEnumerable<GameModel>>(games);

            return model;
        }

        public async Task<GameModel> GetByIdAsync(int id)
        {
            var game = await gameRepo.GetByIdWithDetailsAsync(id);

            if (game == null)
            {
                throw new StoreException(nameof(game));
            }

            var model = mapper.Map<GameModel>(game);

            return model;
        }

        public async Task UpdateAsync(GameModel model)
        {
            if (model == null)
            {
                throw new StoreException(nameof(model));
            }

            var game = mapper.Map<Game>(model);

            await gameRepo.UpdateWithDetailsAsync(game);

            await uow.SaveAsync();
        }
    }
}