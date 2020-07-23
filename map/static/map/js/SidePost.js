class SidePost {
  constructor(container, muklogs, isLoggedIn) {
    this.container = container;
    this.isOpen = false;
    this.muklogs = muklogs;
    this.isLoggedIn = isLoggedIn;
    if (this.isLoggedIn) {
      const nodeList = [...this.container.childNodes].filter(
        (node) => node.nodeName !== "#text"
      );
      this.sidePostContainer = nodeList[0];
      this.arrowDiv = nodeList[1];
      this.arrowDiv.classList.add("arrow-div");
      this.arrowDiv.addEventListener("click", () => {
        if (this.isOpen) {
          this.isOpen = false;
          this.arrowDiv.innerText = ">";
          this.sidePostContainer.classList.remove("side-post-container-active");
          this.sidePostContainer.innerHTML = "";
        } else {
          this.isOpen = true;
          this.arrowDiv.innerText = "<";
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
    this.arrowDiv.innerText = "<";
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
      const { id, title, summary, address } = muklog;
      const inner = document.createElement("div");

      inner.innerHTML = `
          <a href="/blog/blog/${id}"><div>${title}</div></a>
          <div>${address}</div>
          <div>${summary}...</div>
      `;
      contents.appendChild(inner);
    });
    this.sidePostContainer.appendChild(contents);
  }
}
export default SidePost;
