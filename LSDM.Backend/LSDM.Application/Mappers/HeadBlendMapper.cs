using LSDM.Application.DTOs.HeadBlend;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class HeadBlendMapper
    {
        public static HeadBlend ToHeadBlend(this HeadBlendDto headBlendDto)
        {
            return new HeadBlend()
            {
                ShapeFirstId = headBlendDto.ShapeFirstId,
                ShapeSecondId = headBlendDto.ShapeSecondId,
                SkinFirstId = headBlendDto.SkinFirstId,
                SkinSecondId = headBlendDto.SkinSecondId,
                ShapeMix = headBlendDto.ShapeMix,
                SkinMix = headBlendDto.SkinMix
            };
        }
        public static HeadBlendDto ToHeadBlendDto(this HeadBlend headBlend)
        {
            return new HeadBlendDto()
            {
                ShapeFirstId = headBlend.ShapeFirstId,
                ShapeSecondId = headBlend.ShapeSecondId,
                SkinFirstId = headBlend.SkinFirstId,
                SkinSecondId = headBlend.SkinSecondId,
                ShapeMix = headBlend.ShapeMix,
                SkinMix = headBlend.SkinMix
            };
        }
    }
}
