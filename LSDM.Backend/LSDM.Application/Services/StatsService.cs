using LSDM.Application.Events.DTOs;
using LSDM.Application.Interfaces;
using LSDM.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Services
{
    public class StatsService : IStatsService
    {
        private readonly IStatsRepository _statsRepository;
        private readonly IUserRepository _userRepository;
        public StatsService(IStatsRepository statsRepository, IUserRepository userRepository)
        {
            _statsRepository = statsRepository;
            _userRepository = userRepository;
        }
        public async Task AddKill(PlayerKillDto playerKillDto)
        {
            var killerExists = await _userRepository.ExistsAsync(playerKillDto.KillerId);
            var victimExists = await _userRepository.ExistsAsync(playerKillDto.VictimId);
            if (!killerExists || !victimExists) return;
            await _statsRepository.IncrementKills(playerKillDto.KillerId);
            await _statsRepository.IncrementDeaths(playerKillDto.VictimId);
        }

        public async Task AddDeath(PlayerDeathDto playerDeathDto)
        {
            var playerExists = await _userRepository.ExistsAsync(playerDeathDto.PlayerId);
            if (!playerExists) return;
            await _statsRepository.IncrementDeaths(playerDeathDto.PlayerId);
        }
    }
}
