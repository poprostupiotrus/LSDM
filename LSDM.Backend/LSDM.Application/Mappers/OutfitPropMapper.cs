using LSDM.Application.DTOs.OutfitProp;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class OutfitPropMapper
    {
        public static OutfitProp ToOutfitProp(this OutfitPropDto outfitPropDto)
        {
            return new OutfitProp()
            {
                PropId = outfitPropDto.PropId,
                Drawable = outfitPropDto.Drawable,
                Texture = outfitPropDto.Texture
            };
        }
        public static OutfitPropDto ToOutfitPropDto(this OutfitProp outfitProp)
        {
            return new OutfitPropDto()
            {
                PropId = outfitProp.PropId,
                Drawable = outfitProp.Drawable,
                Texture = outfitProp.Texture
            };
        }
    }
}
