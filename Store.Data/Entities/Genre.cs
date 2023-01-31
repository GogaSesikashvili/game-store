using System.ComponentModel.DataAnnotations;

namespace Store.Data.Entities
{
    public class Genre : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public int ParentId { get; set; }

        public ICollection<Game> Games { get; set; }
    }
}