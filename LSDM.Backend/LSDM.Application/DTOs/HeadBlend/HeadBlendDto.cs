using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.HeadBlend
{
    public class HeadBlendDto
    {
        public int ShapeFirstId { get; set; }
        public int ShapeSecondId { get; set; }
        public int SkinFirstId { get; set; }
        public int SkinSecondId { get; set; }
        public float ShapeMix { get; set; }
        public float SkinMix { get; set; }
    }
}
