using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vidly.Models;

namespace Vidly.Dtos
{
    public class RentalDto
    {
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        [Required]
        public int MovieId { get; set; }

        public Movie Movie { get; set; }

        [Required]
        public DateTime DateRented { get; set; } = DateTime.Now;

        public DateTime? DateReturned { get; set; }
    }
}
