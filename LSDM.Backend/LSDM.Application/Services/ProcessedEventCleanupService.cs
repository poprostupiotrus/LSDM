using LSDM.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Services
{
    public class ProcessedEventCleanupService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public ProcessedEventCleanupService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();

                var repo = scope.ServiceProvider
                    .GetRequiredService<IProcessedEventRepository>();
                try
                {
                    var cutoff = DateTime.UtcNow.AddMinutes(-10);

                    await repo.RemoveOlderThanAsync(cutoff);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[Cleanup] Error: {ex.Message}");
                }

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
