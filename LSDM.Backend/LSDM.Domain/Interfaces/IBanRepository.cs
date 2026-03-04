using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Interfaces
{
    public interface IBanRepository
    {
        Task<Ban> CreateBanAsync(string userId, string socialClubId, string hwid, string ipAddress, string adminId, string reason, DateTime? endDate);
        Task<Ban?> GetActiveBanForUserAsync(string userId);
        Task<Ban?> GetActiveBanForIdentifiersAsync(string socialClubId, string hwid, string ipAddress);
    }
}
