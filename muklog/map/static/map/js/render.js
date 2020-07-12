import Marker from "./marker.js";
import { MarkerClustering } from "./markerCluster.js";

let map = null;
let currentLocation = { lat: 37.3595704, lng: 127.105399 };
let DJANGO_STATIC_URL = null;

export function renderMap(url) {
  DJANGO_STATIC_URL = url;

  getLocation();
  map = new naver.maps.Map("naver-map", {
    center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
    zoom: 14,
  });
  let markers = [];
  for (let i = 1; i < 100; i++) {
    let marker = new Marker(
      {
        lat: currentLocation.lat + 0.01 + Math.random(),
        lng: currentLocation.lng + 0.01 + Math.random(),
      },
      map
    );
    marker.setInfo(`<div>이건 ${i}번째 마커</div>`);
    markers.push(marker.marker);
  }

  var htmlMarker1 = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-1.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    htmlMarker2 = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-1.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    htmlMarker3 = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-3.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    htmlMarker4 = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-4.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    },
    htmlMarker5 = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
        DJANGO_STATIC_URL +
        'map/image/cluster-marker-5.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    };

  var markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 8,
    map: map,
    markers: markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: function (clusterMarker, count) {
      let cluster = clusterMarker.getElement();
      let child = cluster.childNodes;
      child[0].innerText = count;
    },
  });
}

function getLocation() {
  if (!navigator.geolocation) {
    alert("이 브라우저에서는 HTML5가 지원하지 않습니다.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let { latitude, longitude } = position.coords;
      currentLocation.lat = latitude;
      currentLocation.lng = longitude;
    },
    (error) => console.log(error),
    { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
  );
}
