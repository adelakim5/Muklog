import Marker from "./marker.js";

const DEFAULT_LOCATION = { latitude: 37.3595704, longitude: 127.105399 };

class NaverMap {
  constructor(staticUrl) {
    this.staticUrl = staticUrl;
    this.map = null;
    this.userPositionMarker = null;
  }

  initMap(position = null) {
    const { latitude, longitude } = DEFAULT_LOCATION;
    this.map = new naver.maps.Map("naver-map", {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 14,
    });
    this.userPositionMarker = new Marker(DEFAULT_LOCATION, this.map);
    this.userPositionMarker.setInfo("현재위치");

    this.setCenterMap(position);
  }

  setCenterMap(position = null) {
    if (position) {
      const { latitude, longitude } = position;
      const latLng = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(latLng);
      this.userPositionMarker.changePosition(latLng);
      return;
    }
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      const latLng = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(latLng);
      this.userPositionMarker.changePosition(latLng);
    };
    const errorCallback = (error) => console.log(error);

    if (!navigator.geolocation) {
      alert(
        "이 브라우저에서는 HTML5를 지원하지 않습니다. 현재위치를 불러올 수 없습니다."
      );
      return;
    }

    const getCurrentPositionOptions = {
      maximumAge: 60000,
      timeout: 5000,
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      getCurrentPositionOptions
    );
  }

  render(position = null) {
    this.initMap(position);
  }
}

export default NaverMap;
