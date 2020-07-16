import Marker from "./marker.js";
import { MarkerClustering } from "./markerCluster.js";
import { getClusterImg } from "./shared.js";

let map = null;
let currentLocation = { lat: 37.3595704, lng: 127.105399 };
let DJANGO_STATIC_URL = null;

export function renderMap(url) {
  let latInput = document.getElementById("map-lat");
  let lngInput = document.getElementById("map-lng");
  DJANGO_STATIC_URL = url;

  getLocation();
  map = new naver.maps.Map("naver-map", {
    center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
    zoom: 14,
  });
  let marker = new Marker(currentLocation, map);
  marker.setInfo("클릭한 지점");
  let listener = naver.maps.Event.addListener(map, "click", (e) => {
    console.log(e.coord);
    marker.marker.setPosition(e.coord);
    latInput.value = e.coord._lat;
    lngInput.value = e.coord._lng;
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

/*
const markerImg = getClusterImg(DJANGO_STATIC_URL);
  var markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 8,
    map: map,
    markers: markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: [
      markerImg.marker1,
      markerImg.marker2,
      markerImg.marker3,
      markerImg.marker4,
      markerImg.marker5,
    ],
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: function (clusterMarker, count) {
      let cluster = clusterMarker.getElement();
      let child = cluster.childNodes;
      child[0].innerText = count;
    },
  });
*/
