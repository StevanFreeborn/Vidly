using System;
using System.ComponentModel.DataAnnotations;
using Vidly.Dtos;
using Vidly.Models;

namespace Vidly.Validators
{
    public class Min18YearsIfAMember : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var customer = validationContext.ObjectInstance as Customer;

            if (customer.MembershipTypeId == MembershipType.None ||
                customer.MembershipTypeId == MembershipType.PayAsYouGo)
            {
                return ValidationResult.Success;
            }

            if (customer.Birthday == null)
            {
                return new ValidationResult("Birthday is required.");
            }

            var age = DateTime.Today.Year - customer.Birthday.Value.Year;

            return age >= 18 ?
                ValidationResult.Success :
                new ValidationResult("Customer needs to be at least 18 years old.");
        }
    }
}