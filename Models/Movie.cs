using System;
using System.ComponentModel.DataAnnotations;

namespace Vidly.Models
{
    public class Movie
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public Genre Genre { get; set; }

        [Required]
        [Display(Name = "Genre")]
        public byte GenreId { get; set; }

        [Required]
        [Display(Name = "Release Date")]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public DateTime DateAdded { get; set; } = DateTime.Now;

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Number in stock cannot be negative.")]
        [Display(Name = "Number in Stock")]
        public int NumberInStock { get; set; }

        [Required]
        public int NumberAvailable { get; set; }

        public void CheckOut()
        {
            if (NumberAvailable == 0) return;
            NumberAvailable--;
        }

        public bool IsAvailable()
        {
            if (NumberAvailable > 0) return true;
            return false;
        }

        internal void CheckIn()
        {
            NumberAvailable++;
        }
    }
}
