using LSDM.Domain.Entities;
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
    public class OutfitRepository : IOutfitRepository
    {
        private readonly LSDMDbContext _context;
        public OutfitRepository(LSDMDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(Outfit outfit)
        {
            await _context.Outfits.AddAsync(outfit);
            await _context.SaveChangesAsync();
        }

        public async Task<Outfit?> GetByUserIdAsync(string userid)
        {
            return await _context.Outfits
                            .Include(o => o.Components)
                            .Include(o => o.Props)
                            .Include(o => o.FaceFeatures)
                            .Include(o => o.HeadBlend)
                            .Include(o => o.HeadOverlays)
                            .FirstOrDefaultAsync(o => o.UserId == userid);
        }

        public async Task<Outfit> UpdateAsync(int outfitId, Outfit newOutfit)
        {
            var outfit = await _context.Outfits
                        .Include(o => o.Components)
                        .Include(o => o.Props)
                        .Include(o => o.FaceFeatures)
                        .Include(o => o.HeadBlend)
                        .Include(o => o.HeadOverlays)
                        .FirstAsync(o => o.Id == outfitId);
            _context.OutfitComponents.RemoveRange(outfit.Components);
            _context.OutfitProps.RemoveRange(outfit.Props);
            _context.FaceFeatures.RemoveRange(outfit.FaceFeatures);
            _context.HeadOverlays.RemoveRange(outfit.HeadOverlays);

            outfit.Components = newOutfit.Components;
            outfit.Props = newOutfit.Props;
            outfit.FaceFeatures = newOutfit.FaceFeatures;
            outfit.HeadBlend = newOutfit.HeadBlend;
            outfit.HeadOverlays = newOutfit.HeadOverlays;
            outfit.EyeColor = newOutfit.EyeColor;
            outfit.HairColor = newOutfit.HairColor;
            outfit.Model = newOutfit.Model;

            await _context.SaveChangesAsync();
            return outfit;
        }
        public async Task<bool> ExistsAsync(int outfitId)
        {
            return await _context.Outfits.AnyAsync(o => o.Id == outfitId);
        }
        public async Task<bool> ExistsForUserAsync(int outfitId, string userId)
        {
            return await _context.Outfits.AnyAsync(o => o.Id == outfitId && o.UserId == userId);
        }
        public async Task<bool> UserHasOutfit(string userId)
        {
            return await _context.Outfits.AnyAsync(o => o.UserId == userId);
        }

        public async Task<int> GetOutfitIdForUserAsync(string userId)
        {
            var outfit = await _context.Outfits.FirstAsync(o => o.UserId == userId);
            return outfit.Id;
        }
    }
}
