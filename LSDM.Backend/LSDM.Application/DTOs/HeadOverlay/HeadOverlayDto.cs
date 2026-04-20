using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.DTOs.HeadOverlay
{
    public class HeadOverlayDto
    {
        public int HeadOverlayId { get; set; }
        public int Index { get; set; }
        public float Opacity { get; set; }
        public int FirstColor { get; set; }
    }
}
