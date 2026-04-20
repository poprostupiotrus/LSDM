using LSDM.Application.DTOs.FaceFeature;
using LSDM.Application.DTOs.HeadBlend;
using LSDM.Application.DTOs.HeadOverlay;
using LSDM.Application.DTOs.OutfitComponent;
using LSDM.Application.DTOs.OutfitProp;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.Outfit
{
    public class CreateOutfitRequestDto
    {
        public List<OutfitComponentDto> Components { get; set; } = new();
        public List<OutfitPropDto> Props { get; set; } = new();
        public List<FaceFeatureDto> FaceFeatures { get; set; } = new();
        public HeadBlendDto HeadBlend { get; set; } = null!;
        public List<HeadOverlayDto> HeadOverlays { get; set; } = new();
        public long Model { get; set; }
        public int EyeColor { get; set; }
        public int HairColor { get; set; }
    }
}
