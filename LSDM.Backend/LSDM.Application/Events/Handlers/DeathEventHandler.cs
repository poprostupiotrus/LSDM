using LSDM.Application.Events.DTOs;
using LSDM.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace LSDM.Application.Events.Handlers
{
    public class DeathEventHandler : IGameEventHandler
    {
        private readonly IStatsService _statsService;
        public string EventName => "playerDeath";

        public DeathEventHandler(IStatsService statsService)
        {
            _statsService = statsService;
        }

        public async Task Handle(WsMessage message)
        {
            var data = message.Data.Deserialize<PlayerDeathDto>();
            if (data == null) return;
            await _statsService.AddDeath(data);
        }
    }
}
