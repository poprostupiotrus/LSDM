using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Interfaces
{
    public interface IOutfitRepository
    {
        Task<Outfit?> GetByUserIdAsync(string userid);
        Task<int> GetOutfitIdForUserAsync(string userId);
        Task CreateAsync(Outfit outfit);
        Task<Outfit> UpdateAsync(int outfitId, Outfit outfit);
        Task<bool> ExistsAsync(int outfitId);
        Task<bool> ExistsForUserAsync(int outfitId, string userId);
        Task<bool> UserHasOutfit(string userId);
    }
}
