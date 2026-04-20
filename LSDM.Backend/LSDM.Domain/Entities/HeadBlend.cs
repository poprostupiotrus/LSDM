using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class HeadBlend
    {
        public int OutfitId { get; set; }
        public Outfit Outfit { get; set; } = null!;
        public int ShapeFirstId { get; set; }
        public int ShapeSecondId { get; set; }
        public int SkinFirstId { get; set; }
        public int SkinSecondId { get; set; }
        public float ShapeMix { get; set; }
        public float SkinMix { get; set; }

    }
}
