using LSDM.Application.DTOs.Outfit;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class OutfitMapper
    {
        public static Outfit ToOutfit(this CreateOutfitRequestDto createOutfitRequestDto)
        {
            return new Outfit()
            {
                Components = createOutfitRequestDto.Components.Select(c => c.ToOutfitComponent()).ToList(),
                Props = createOutfitRequestDto.Props.Select(p => p.ToOutfitProp()).ToList(),
                FaceFeatures = createOutfitRequestDto.FaceFeatures.Select(f => f.ToFaceFeature()).ToList(),
                HeadBlend = createOutfitRequestDto.HeadBlend.ToHeadBlend(),
                HeadOverlays = createOutfitRequestDto.HeadOverlays.Select(h => h.ToHeadOverlay()).ToList(),
                Model = createOutfitRequestDto.Model,
                EyeColor = createOutfitRequestDto.EyeColor,
                HairColor = createOutfitRequestDto.HairColor
            };
        }
        public static Outfit ToOutfit(this UpdateOutfitRequestDto updateOutfitRequestDto)
        {
            return new Outfit()
            {
                Components = updateOutfitRequestDto.Components.Select(c => c.ToOutfitComponent()).ToList(),
                Props = updateOutfitRequestDto.Props.Select(p => p.ToOutfitProp()).ToList(),
                FaceFeatures = updateOutfitRequestDto.FaceFeatures.Select(f => f.ToFaceFeature()).ToList(),
                HeadBlend = updateOutfitRequestDto.HeadBlend.ToHeadBlend(),
                HeadOverlays = updateOutfitRequestDto.HeadOverlays.Select(h => h.ToHeadOverlay()).ToList(),
                Model = updateOutfitRequestDto.Model,
                EyeColor = updateOutfitRequestDto.EyeColor,
                HairColor = updateOutfitRequestDto.HairColor
            };
        }
        public static OutfitDto ToOutfitDto(this Outfit outfit)
        {
            return new OutfitDto()
            {
                Id = outfit.Id,
                UserId = outfit.UserId,
                Components = outfit.Components.Select(c => c.ToOutfitComponentDto()).ToList(),
                Props = outfit.Props.Select(p => p.ToOutfitPropDto()).ToList(),
                FaceFeatures = outfit.FaceFeatures.Select(f => f.ToFaceFeatureDto()).ToList(),
                HeadBlend = outfit.HeadBlend.ToHeadBlendDto(),
                HeadOverlays = outfit.HeadOverlays.Select(h => h.ToHeadOverlayDto()).ToList(),
                Model = outfit.Model,
                EyeColor = outfit.EyeColor,
                HairColor = outfit.HairColor
            };
        }
    }
}
