using System.ComponentModel.DataAnnotations;

namespace Store.Business.Models
{
    public class GenreModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int ParentId { get; set; }

        public List<GameModel> Games { get; set; }
    }
}