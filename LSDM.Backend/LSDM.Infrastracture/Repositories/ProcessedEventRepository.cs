using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;
using LSDM.Infrastracture.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Infrastracture.Repositories
{
    public class ProcessedEventRepository : IProcessedEventRepository
    {
        private readonly LSDMDbContext _context;

        public ProcessedEventRepository(LSDMDbContext context)
        {
            _context = context;
        }

        public async Task<bool> TryInsertAsync(string eventId)
        {
            try
            {
                _context.ProcessedEvents.Add(new ProcessedEvent
                {
                    Id = eventId,
                });

                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public async Task RemoveOlderThanAsync(DateTime date)
        {
            var old = _context.ProcessedEvents
                .Where(x => x.CreatedAt < date);

            _context.ProcessedEvents.RemoveRange(old);

            await _context.SaveChangesAsync();
        }
    }
}
