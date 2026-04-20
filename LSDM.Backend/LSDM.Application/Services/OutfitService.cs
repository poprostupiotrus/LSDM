using LSDM.Application.DTOs.Outfit;
using LSDM.Application.Interfaces;
using LSDM.Application.Mappers;
using LSDM.Domain.Entities;
using LSDM.Domain.Interfaces;
using LSDM.Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Services
{
    public class OutfitService : IOutfitService
    {
        private readonly IOutfitRepository _outfitRepository;
        public OutfitService(IOutfitRepository outfitRepository, IUserRepository userRepository)
        {
            _outfitRepository = outfitRepository;
        }
        public async Task CreateAsync(string userId, CreateOutfitRequestDto createOutfitRequestDto)
        {
            if(await _outfitRepository.UserHasOutfit(userId))
            {
                throw new UserHasOutfitException("Gracz ma aktualnie już utworzony outfit");
            }
            var outfit = createOutfitRequestDto.ToOutfit();
            outfit.UserId = userId;
            await _outfitRepository.CreateAsync(outfit);
        }

        public async Task<OutfitDto> GetByUserIdAsync(string userid)
        {
            var outfit = await _outfitRepository.GetByUserIdAsync(userid);
            if(outfit == null)
            {
                throw new OutfitNotFoundException($"Nie znaleziono outfitu dla użytkownika o ID: {userid}");
            }
            return outfit.ToOutfitDto();
        }

        public async Task<OutfitDto> UpdateAsync(string userId, UpdateOutfitRequestDto updateOutfitRequestDto)
        {
            if (!await _outfitRepository.UserHasOutfit(userId))
            {
                throw new OutfitNotFoundException($"Nie znaleziono outfitu dla użytkownika o ID: {userId}");
            }
            var outfitId = await _outfitRepository.GetOutfitIdForUserAsync(userId);
            var outfit = updateOutfitRequestDto.ToOutfit();
            var updatedOutfit = await _outfitRepository.UpdateAsync(outfitId, outfit);
            return updatedOutfit.ToOutfitDto();
        }
    }
}
