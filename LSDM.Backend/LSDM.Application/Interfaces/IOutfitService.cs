using LSDM.Application.DTOs.Outfit;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Interfaces
{
    public interface IOutfitService
    {
        Task<OutfitDto> GetByUserIdAsync(string userid);
        Task CreateAsync(string userId, CreateOutfitRequestDto createOutfitRequestDto);
        Task<OutfitDto> UpdateAsync(string userId, UpdateOutfitRequestDto updateOutfitRequestDto);
    }
}
