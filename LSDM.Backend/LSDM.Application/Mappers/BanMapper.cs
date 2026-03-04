using LSDM.Application.DTOs.Ban;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class BanMapper
    {
        public static BanDto ToBanDto(this Ban ban)
        {
            return new BanDto
            {
                Id = ban.Id,
                UserId = ban.UserId,
                BannedByUserId = ban.BannedByUserId,
                Reason = ban.Reason
            };
        }
    }
}
