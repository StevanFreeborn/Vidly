using System.ComponentModel.DataAnnotations;

namespace Vidly.ViewModels
{
    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
