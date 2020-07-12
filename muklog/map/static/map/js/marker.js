class Marker {
  constructor(position, map) {
    this.marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map,
    });
    this.map = map;
  }

  setInfo(content) {
    this.info = new naver.maps.InfoWindow({ content });

    let listener = naver.maps.Event.addDOMListener(
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
}

export default Marker;
