using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LSDM.Application.Events.DTOs
{
    public class PlayerKillDto
    {
        [JsonPropertyName("killerId")]
        public string KillerId { get; set; } = string.Empty;
        [JsonPropertyName("victimId")]
        public string VictimId { get; set; } = string.Empty;
    }
}
