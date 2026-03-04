using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.Ban
{
    public class BanDto
    {
        public int Id { get; set; }
        public string UserId { get; set; } = null!;
        public string Reason { get; set; } = null!;
        public string BannedByUserId { get; set; } = null!;
    }
}
