using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Store.Data.Entities
{
    public class Game : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; }
        [Precision(14, 2)]
        public decimal Price { get; set; }

        public ICollection<Genre> Genres { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}