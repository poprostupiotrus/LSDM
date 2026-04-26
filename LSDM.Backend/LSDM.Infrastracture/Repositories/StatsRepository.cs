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
    public class StatsRepository : IStatsRepository
    {
        private readonly LSDMDbContext _context;
        public StatsRepository(LSDMDbContext context)
        {
            _context = context;
        }

        public async Task IncrementDeaths(string userId)
        {
            var user = await _context.Users.FirstAsync(user => user.Id == userId);
            user.Deaths++;
            await _context.SaveChangesAsync();
        }

        public async Task IncrementKills(string userId)
        {
            var user = await _context.Users.FirstAsync(user => user.Id == userId);
            user.Kills++;
            await _context.SaveChangesAsync();
        }
    }
}
