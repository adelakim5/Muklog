class Marker {
  constructor(position, map) {
    const { latitude, longitude } = position;
    this.marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map,
    });
    this.map = map;
  }

  setInfo(content) {
    this.info = new naver.maps.InfoWindow({ content });

    const listener = naver.maps.Event.addDOMListener(
      this.marker.getElement(),
      "click",
      () => {
        if (this.info.getMap()) {
          this.info.close();
        } else {
          this.info.open(this.map, this.marker);
        }
      }
    );
  }

  changePosition(latLng) {
    this.marker.setPosition(latLng);
  }
}

export default Marker;
