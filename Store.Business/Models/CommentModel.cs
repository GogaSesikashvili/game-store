using System.ComponentModel.DataAnnotations;

namespace Store.Business.Models
{
    public class CommentModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public int ReplyId { get; set; }
        [Required]
        public string UserName { get; set; }

        public int GameId { get; set; }
    }
}
