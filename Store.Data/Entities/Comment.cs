namespace Store.Data.Entities
{
    public class Comment : BaseEntity
    {
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int ReplyId { get; set; }
        public string UserName { get; set; }

        public int GameId { get; set; }
    }
}
