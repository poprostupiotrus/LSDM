using LSDM.Application.DTOs.Ban;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Interfaces
{
    public interface IBanService
    {
        Task<BanDto> BanUserAsync(string userId, string bannedByUserId, string reason, DateTime? bannedUntil);
    }
}
