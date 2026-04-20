using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class OutfitProp
    {
        public int OutfitId { get; set; }
        public Outfit Outfit { get; set; } = null!;
        public int PropId { get; set; }
        public int Drawable { get; set; }
        public int Texture { get; set; }
    }
}
