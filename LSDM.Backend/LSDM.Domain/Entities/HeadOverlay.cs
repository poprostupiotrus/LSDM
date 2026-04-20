using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Domain.Entities
{
    public class HeadOverlay
    {
        public int OutfitId { get; set; }
        public Outfit Outfit { get; set; } = null!;
        public int HeadOverlayId { get; set; }
        public int Index { get; set; }
        public float Opacity { get; set; }
        public int FirstColor { get; set; }
    }
}
