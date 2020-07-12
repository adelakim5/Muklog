import { renderMap } from "./render.js";

class Main {
  constructor(url) {
    this.url = url;
  }

  render() {
    renderMap(this.url);
  }
}

export default Main;
