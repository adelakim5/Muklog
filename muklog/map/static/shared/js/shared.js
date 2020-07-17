export const getClusterImg = (djangoUrl) => {
  const DJANGO_STATIC_URL = djangoUrl;
  return {
    marker1: {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-1.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    marker2: {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-1.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    marker3: {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-3.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    marker4: {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-4.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    marker5: {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-5.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
  };
};
