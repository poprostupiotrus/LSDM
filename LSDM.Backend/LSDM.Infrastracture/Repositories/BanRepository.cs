using LSDM.Domain.Entities;
using LSDM.Domain.Enums;
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
    public class BanRepository : IBanRepository
    {
        private readonly LSDMDbContext _context;
        public BanRepository(LSDMDbContext context)
        {
            _context = context;
        }

        public async Task<Ban> CreateBanAsync(string userId, string socialClubId, string hwid, string ipAddress, string adminId, string reason, DateTime? endDate)
        {
            var ban = new Ban
            {
                UserId = userId,
                Reason = reason,
                StartDate = DateTime.UtcNow,
                EndDate = endDate,
                BannedByUserId = adminId
            };
            ban.BanIdentifiers.Add(new BanIdentifier
            {
                Type = BanIdentifierType.User,
                Value = userId
            });
            ban.BanIdentifiers.Add(new BanIdentifier
            {
                Type = BanIdentifierType.SocialClub,
                Value = socialClubId
            });
            ban.BanIdentifiers.Add(new BanIdentifier
            {
                Type = BanIdentifierType.HWID,
                Value = hwid
            });
            ban.BanIdentifiers.Add(new BanIdentifier
            {
                Type = BanIdentifierType.IP,
                Value = ipAddress
            });
            await _context.Bans.AddAsync(ban);
            await _context.SaveChangesAsync();
            return ban;
        }

        public async Task<Ban?> GetActiveBanForIdentifiersAsync(string socialClubId, string hwid, string ipAddress)
        {
            var identifiers = new List<string> { socialClubId, hwid, ipAddress };
            return await _context.BanIdentifiers
                .Where(bi => identifiers.Contains(bi.Value) && (!bi.Ban.EndDate.HasValue || bi.Ban.EndDate > DateTime.UtcNow))
                .Select(bi => bi.Ban)
                .FirstOrDefaultAsync();
        }

        public async Task<Ban?> GetActiveBanForUserAsync(string userId)
        {
            return await _context.BanIdentifiers
                .Where(bi => bi.Value == userId && (!bi.Ban.EndDate.HasValue || bi.Ban.EndDate > DateTime.UtcNow))
                .Select(bi => bi.Ban)
                .FirstOrDefaultAsync();
        }
    }
}
