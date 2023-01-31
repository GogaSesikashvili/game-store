namespace Store.Data.Entities
{
    public class GameGenre
    {
        public int GamesId { get; set; }
        public Game Game { get; set; }

        public int GenresId { get; set; }
        public Genre Genre { get; set; }
    }
}
