using Store.Data.Interfaces;
using Store.Data.Repositories;

namespace Store.Data.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreDbContext context;
        private IGameRepository gameRepository;
        private IGenreRepository genreRepository;
        private IGameGenreRepository gameGenreRepository;
        private ICommentRepository commentRepository;

        public UnitOfWork(StoreDbContext context)
        {
            this.context = context;
        }

        public IGameRepository GameRepository
        {
            get
            {
                if (this.gameRepository == null)
                {
                    this.gameRepository = new GameRepository(context);
                }

                return gameRepository;
            }
        }

        public IGenreRepository GenreRepository
        {
            get
            {
                if (this.genreRepository == null)
                {
                    this.genreRepository = new GenreRepository(context);
                }

                return genreRepository;
            }
        }

        public IGameGenreRepository GameGenreRepository
        {
            get
            {
                if (this.gameGenreRepository == null)
                {
                    this.gameGenreRepository = new GameGenreRepository(context);
                }

                return gameGenreRepository;
            }
        }

        public ICommentRepository CommentRepository
        {
            get
            {
                if (this.commentRepository == null)
                {
                    this.commentRepository = new CommentRepository(context);
                }

                return commentRepository;
            }
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}