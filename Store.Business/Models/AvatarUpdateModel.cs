using System.ComponentModel.DataAnnotations;

namespace Store.Business.Models
{
    public class AvatarUpdateModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string AvatarUrl { get; set; }
    }
}
