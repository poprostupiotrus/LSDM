using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class OutfitComponent
    {
        public int OutfitId { get; set; }
        public Outfit Outfit { get; set; } = null!;
        public int ComponentId { get; set; }
        public int Drawable { get; set; }
        public int Texture { get; set; }
    }
}
