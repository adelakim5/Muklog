class SidePost {
  constructor(container, muklogs, isLoggedIn) {
    this.container = container;
    this.isOpen = false;
    this.muklogs = muklogs;
    this.isLoggedIn = isLoggedIn;
    if (this.isLoggedIn) {
      const img = document.createElement("img");
      img.width = 24;
      img.height = 24;
      const nodeList = [...this.container.childNodes].filter(
        (node) => node.nodeName !== "#text"
      );
      this.sidePostContainer = nodeList[0];
      this.arrowDiv = nodeList[1];
      this.arrowDiv.classList.add("arrow-div");
      this.arrowDiv.addEventListener("click", () => {
        if (this.isOpen) {
          this.isOpen = false;
          img.src = "/static/shared/image/arrow-forward-outline.svg";
          this.arrowDiv.innerHTML = "";
          this.arrowDiv.appendChild(img);
          this.sidePostContainer.classList.remove("side-post-container-active");
          this.sidePostContainer.innerHTML = "";
        } else {
          this.isOpen = true;
          img.src = "/static/shared/image/arrow-back-outline.svg";
          this.arrowDiv.innerHTML = "";
          this.arrowDiv.appendChild(img);
          this.sidePostContainer.classList.add("side-post-container-active");
          this.setMukLogsContent();
        }
      });
    }
  }
  setPostContent(content) {
    const {
      id,
      title,
      body,
      address,
      pubDate,
      thumbnail,
      thumbnailSide,
    } = content;
    this.isOpen = true;
    const img = document.createElement("img");
    img.width = 24;
    img.height = 24;
    img.src = "/static/shared/image/arrow-back-outline.svg";
    this.arrowDiv.innerHTML = "";
    this.arrowDiv.appendChild(img);
    this.sidePostContainer.classList.add("side-post-container-active");
    const pickedThumbnail = thumbnail ? thumbnail : thumbnailSide;
    const inner = `
      <div class="side-post-content-container">
        <div class="side-post-content-thumbnail">
          <img src="${pickedThumbnail}" alt="thumbnail"/>
        </div>
        <div class="side-post-content-header">
          <a href="/blog/blog/${id}">
            <div class="side-post-content-title">${title}</div>
          </a>
          <div class="side-post-content-address">${address}</div>
        </div>
        <div class="side-post-content-body">${body}</div>
      </div>
    `;
    this.sidePostContainer.innerHTML = inner;
  }

  setMukLogsContent() {
    const contents = document.createElement("div");
    this.muklogs.forEach((muklog) => {
      const { id, title, summary, address, thumbnail, pubDate } = muklog;
      const inner = document.createElement("div");

      inner.innerHTML = `
          <a href="/blog/blog/${id}">
            <div class="side-post-list-item">
              <div class="side-post-list-item-thumbnail">
                <img src="${thumbnail}" alt="thumbnail" />
              </div>
              <div class="side-post-list-item-content">
                <div class="header">
                  <div class="date">${pubDate}</div>
                  <div class="title">${title}</div>
                  <div class="address">${address}</div>
                </div>
                <div class="body">
                  ${summary}
                </div>
              </div>
            </div>
          </a>
      `;
      contents.appendChild(inner);
    });
    this.sidePostContainer.appendChild(contents);
  }
}
export default SidePost;
