using AutoMapper;
using Vidly.Dtos;
using Vidly.Models;

namespace Vidly.App_Start
{
    public class AutoMapperConfig
    {
        public static MapperConfiguration Configure()
        {
            return new MapperConfiguration( cfg => 
            {
                cfg.CreateMap<Customer, CustomerDto>();
            });
        }
    }
}