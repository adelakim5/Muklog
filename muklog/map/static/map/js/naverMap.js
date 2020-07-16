import Marker from "./marker.js";

const DEFAULT_LOCATION = { latitude: 37.3595704, longitude: 127.105399 };

class naverMap {
  constructor(staticUrl) {
    this.staticUrl = staticUrl;
    this.map = null;
    this.userPositionMarker = null;
  }

  initMap() {
    const { latitude, longitude } = DEFAULT_LOCATION;
    this.map = new naver.maps.Map("naver-map", {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 14,
    });
    this.userPositionMarker = new Marker(DEFAULT_LOCATION, this.map);
    this.userPositionMarker.setInfo("현재위치");

    this.setCenterMap();
  }

  setCenterMap() {
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

    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      const latLng = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(latLng);
      this.userPositionMarker.changePosition(latLng);
    };

    const errorCallback = (error) => console.log(error);
  }

  render() {
    this.initMap();
  }
}

export default naverMap;
