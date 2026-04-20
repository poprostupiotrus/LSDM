using LSDM.Application.DTOs.OutfitComponent;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class OutfitComponentMapper
    {
        public static OutfitComponent ToOutfitComponent(this OutfitComponentDto outfitComponentDto)
        {
            return new OutfitComponent()
            {
                ComponentId = outfitComponentDto.ComponentId,
                Drawable = outfitComponentDto.Drawable,
                Texture = outfitComponentDto.Texture
            };
        }
        public static OutfitComponentDto ToOutfitComponentDto(this OutfitComponent outfitComponent)
        {
            return new OutfitComponentDto()
            {
                ComponentId = outfitComponent.ComponentId,
                Drawable = outfitComponent.Drawable,
                Texture = outfitComponent.Texture
            };
        }
    }
}
