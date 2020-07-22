import NaverMap from "../../shared/js/NaverMap.js";
import { getClusterImg } from "../../shared/js/shared.js";
import { MarkerClustering } from "../../shared/js/markerCluster.js";
import LogMarker from "../js/LogMarker.js";

class ClusteredMap extends NaverMap {
  constructor(staticUrl, sidePost) {
    super(staticUrl);
    this.sidePost = sidePost;
  }

  setClustering(mukLogs) {
    this.markers = [];
    mukLogs.forEach((muklog) => {
      const position = {
        latitude: muklog.latitude,
        longitude: muklog.longitude,
      };
      const marker = new LogMarker(position, muklog, this.map, this.sidePost);
      marker.setLogInfo();
      this.markers.push(marker.marker);
    });

    const markerImg = getClusterImg(this.staticUrl);

    new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 8,
      map: this.map,
      markers: this.markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [
        markerImg.marker1,
        markerImg.marker2,
        markerImg.marker3,
        markerImg.marker4,
        markerImg.marker5,
      ],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: function (clusterMarker, count) {
        let cluster = clusterMarker.getElement();
        let child = cluster.childNodes;
        child[0].innerText = count;
      },
    });
  }
}

export default ClusteredMap;
