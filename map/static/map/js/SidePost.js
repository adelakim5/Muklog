class SidePost {
  constructor(container) {
    this.container = container;
    this.isOpen = false;
    const nodeList = [...this.container.childNodes].filter(
      (node) => node.nodeName !== "#text"
    );
    this.sidePostContainer = nodeList[0];
    this.arrowDiv = nodeList[1];
    this.arrowDiv.classList.add("arrow-div");
    this.arrowDiv.addEventListener("click", () => {
      if (this.isOpen) {
        this.isOpen = false;
        this.arrowDiv.innerText = "";
        this.sidePostContainer.classList.remove("side-post-container-active");
        this.sidePostContainer.innerHTML = "";
      }
    });
  }
  setPostContent(content) {
    const { id, title, body, address } = content;
    this.isOpen = true;
    this.arrowDiv.innerText = "<";
    this.sidePostContainer.classList.add("side-post-container-active");
    const inner = `
      <div>
        <a href="/blog/blog/${id}"><div>${title}</div></a>
        <div>${address}</div>
        <div>${body}</div>
      </div>
    `;
    this.sidePostContainer.innerHTML = inner;
  }
}
export default SidePost;
