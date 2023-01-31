using System.ComponentModel.DataAnnotations;

namespace Store.Business.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; } = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";
        [Range(0, 9999999)]
        public decimal Price { get; set; }

        public List<GenreModel> Genres { get; set; }
        public List<CommentModel> Comments { get; set; }
    }
}