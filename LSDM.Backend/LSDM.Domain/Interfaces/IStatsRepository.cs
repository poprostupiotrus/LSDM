using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Interfaces
{
    public interface IStatsRepository
    {
        public Task IncrementKills(string userId);
        public Task IncrementDeaths(string userId);
    }
}
