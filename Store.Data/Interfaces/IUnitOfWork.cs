namespace Store.Data.Interfaces
{
    public interface IUnitOfWork
    {
        IGameRepository GameRepository { get; }
        IGenreRepository GenreRepository { get; }
        IGameGenreRepository GameGenreRepository { get; }
        ICommentRepository CommentRepository { get; }
        Task SaveAsync();
    }
}