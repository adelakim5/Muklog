import Marker from "../../shared/js/marker.js";

class LogMarker extends Marker {
  constructor(position, content, map, sidePost) {
    super(position, map);
    this.content = content;
    this.sidePost = sidePost;
  }
  setLogInfo() {
    const { id, title, summary, body, address } = this.content;
    const inner = document.createElement("div");
    inner.innerHTML = `
        <div>${title}</div>
        <div>${address}</div>
        <div>${summary}</div>
    `;
    this.info = new naver.maps.InfoWindow({ content: inner });
    const infoContainer = this.info.getContent();
    infoContainer.addEventListener("click", () => {
      this.sidePost.setPostContent(this.content);
    });

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
}

export default LogMarker;
