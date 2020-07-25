import Marker from "../../shared/js/marker.js";

class LogMarker extends Marker {
  constructor(position, content, map, sidePost) {
    super(position, map);
    this.content = content;
    this.sidePost = sidePost;
  }
  setLogInfo() {
    if (!this.sidePost.isLoggedIn) return;
    const { title, summary, address, thumbnail, pubDate } = this.content;
    const inner = document.createElement("div");
    inner.classList.add("info-container");

    inner.innerHTML = `
        <div class="info-thumbnail">
          <img src="${thumbnail}" alt="thumbnail"/>
        </div>
        <div class="info-header">
          <div class="info-date">${pubDate}</div>
          <div class="info-title">${title}</div>
          <div class="info-address">${address}</div>
        </div>
        <div class="info-body">${summary}</div>
    `;

    const infoStyle = {
      backgroundColor: "#ffffff",
      borderColor: "none",
      borderWidth: "0",
      disableAnchor: true,
    };
    this.info = new naver.maps.InfoWindow({ content: inner, ...infoStyle });
    const infoContainer = this.info.getContent();
    infoContainer.addEventListener("click", () => {
      this.sidePost.setPostContent(this.content);
      this.info.close();
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

    naver.maps.Event.addListener(this.map, "click", () => {
      this.info.close();
    });
  }
}

export default LogMarker;
