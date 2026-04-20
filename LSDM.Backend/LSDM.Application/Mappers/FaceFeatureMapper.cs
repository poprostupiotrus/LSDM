using LSDM.Application.DTOs.FaceFeature;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class FaceFeatureMapper
    {
        public static FaceFeature ToFaceFeature(this FaceFeatureDto faceFeatureDto)
        {
            return new FaceFeature()
            {
                Index = faceFeatureDto.Index,
                Scale = faceFeatureDto.Scale
            };
        }
        public static FaceFeatureDto ToFaceFeatureDto(this FaceFeature faceFeature)
        {
            return new FaceFeatureDto()
            {
                Index = faceFeature.Index,
                Scale = faceFeature.Scale
            };
        }
    }
}
