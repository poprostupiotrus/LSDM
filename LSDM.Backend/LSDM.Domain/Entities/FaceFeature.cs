using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class FaceFeature
    {
        public int OutfitId { get; set; }
        public Outfit Outfit { get; set; } = null!;
        public int Index { get; set; }
        public float Scale { get; set; }
    }
}
