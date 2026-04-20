using LSDM.Application.DTOs.HeadBlend;
using LSDM.Application.DTOs.HeadOverlay;
using LSDM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LSDM.Application.Mappers
{
    public static class HeadOverlayMapper
    {
        public static HeadOverlay ToHeadOverlay(this HeadOverlayDto headOverlayDto)
        {
            return new HeadOverlay()
            {
                HeadOverlayId = headOverlayDto.HeadOverlayId,
                Index = headOverlayDto.Index,
                Opacity = headOverlayDto.Opacity,
                FirstColor = headOverlayDto.FirstColor
            };
        }
        public static HeadOverlayDto ToHeadOverlayDto(this HeadOverlay headOverlay)
        {
            return new HeadOverlayDto()
            {
                HeadOverlayId = headOverlay.HeadOverlayId,
                Index = headOverlay.Index,
                Opacity = headOverlay.Opacity,
                FirstColor = headOverlay.FirstColor
            };
        }
    }
}
