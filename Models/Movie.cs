using System.ComponentModel.DataAnnotations;

namespace Vidly.Models
{
    public class Movie
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        public Genre Genre { get; set; }
        public byte GenreId { get; set; }
    }
}
