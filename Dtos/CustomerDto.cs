using System;
using System.ComponentModel.DataAnnotations;
using Vidly.Models;
using Vidly.Validators;

namespace Vidly.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public bool IsSubscribedToNewsletter { get; set; }

        [Required]
        public byte MembershipTypeId { get; set; }

        [Min18YearsIfAMember]
        public DateTime? Birthday { get; set; }
    }
}