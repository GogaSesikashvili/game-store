using System.ComponentModel.DataAnnotations;

namespace Store.Data.Entities
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
