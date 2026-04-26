using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LSDM.Application.Events.DTOs
{
    public class PlayerDeathDto
    {
        [JsonPropertyName("playerId")]
        public string PlayerId { get; set; } = string.Empty;
    }
}
