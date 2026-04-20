using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class Outfit
    {
        public int Id { get; set; }
        public string UserId { get; set; } = null!;
        public LSDMUser User { get; set; } = null!;
        public List<OutfitComponent> Components { get; set; } = new();
        public List<OutfitProp> Props { get; set; } = new();
        public List<FaceFeature> FaceFeatures { get; set; } = new();
        public HeadBlend HeadBlend { get; set; } = null!;
        public List<HeadOverlay> HeadOverlays { get; set; } = new();
        public long Model { get; set; }
        public int EyeColor { get; set; }
        public int HairColor { get; set; }
    }
}
