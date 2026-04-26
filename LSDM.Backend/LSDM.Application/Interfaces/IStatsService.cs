using LSDM.Application.Events.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Interfaces
{
    public interface IStatsService
    {
        Task AddKill(PlayerKillDto playerKillDto);
        Task AddDeath(PlayerDeathDto playerDeathDto);
    }
}
