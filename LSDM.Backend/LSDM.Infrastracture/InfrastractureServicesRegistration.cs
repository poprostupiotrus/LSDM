using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Infrastracture
{
    public static class InfrastractureServicesRegistration
    {
        public static IServiceCollection AddInfrastractureServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<LSDMDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            return services;
        }
    }
}
