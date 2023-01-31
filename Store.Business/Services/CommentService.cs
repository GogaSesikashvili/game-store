using AutoMapper;
using Store.Business.Interfaces;
using Store.Business.Models;
using Store.Business.Validation;
using Store.Data.Entities;
using Store.Data.Interfaces;

namespace Store.Business.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly ICommentRepository commentRepo;

        public CommentService(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;

            commentRepo = uow.CommentRepository;
            this.mapper = mapper;
        }

        public async Task AddAsync(CommentModel model)
        {
            if (model == null)
            {
                throw new StoreException(nameof(model));
            }

            var comment = mapper.Map<Comment>(model);

            await commentRepo.AddAsync(comment);

            await uow.SaveAsync();
        }


        public async Task DeleteAsync(int modelId)
        {
            await commentRepo.DeleteByIdWithSubCommentsAsync(modelId);

            await uow.SaveAsync();
        }

        public async Task<IEnumerable<CommentModel>> GetAllAsync()
        {
            var comments = await commentRepo.GetAllAsync();

            var model = mapper.Map<IEnumerable<CommentModel>>(comments);

            return model;
        }

        /// <summary>
        /// Gets ordered comments by game's Id.
        /// </summary>
        /// <param name="gameId">Game's id.</param>
        /// <returns>Ordered comments.</returns>
        public async Task<IEnumerable<CommentModel>> GetByGameIdAsync(int gameId)
        {
            var comments = await commentRepo.GetByGameIdAsync(gameId);

            if (comments == null)
            {
                throw new StoreException(nameof(comments));
            }

            var orderedComments = comments
                .OrderBy(g => g.ReplyId == 0 ? g.Id : g.ReplyId)
                .ThenBy(g => g.Date);

            var model = mapper.Map<IEnumerable<CommentModel>>(orderedComments);

            return model;
        }

        public async Task<CommentModel> GetByIdAsync(int id)
        {
            var comment = await commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                throw new StoreException(nameof(comment));
            }

            var model = mapper.Map<CommentModel>(comment);

            return model;
        }

        public async Task UpdateAsync(CommentModel model)
        {
            if (model == null)
            {
                throw new StoreException(nameof(model));
            }

            var comment = await commentRepo.GetByIdAsync(model.Id);

            comment.Text = model.Text;
            comment.UserName = model.UserName;

            commentRepo.Update(comment);

            await uow.SaveAsync();
        }
    }
}