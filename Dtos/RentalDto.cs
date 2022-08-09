using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Vidly.Dtos
{
    public class RentalDto
    {

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public List<int> MovieIds { get; set; }
    }
}