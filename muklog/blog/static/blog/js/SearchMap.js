import NaverMap from "/static/shared/js/NaverMap.js";
// import NaverMap from "../../../../map/static/shared/js/NaverMap.js";

class SearchMap extends NaverMap {
  constructor(staticUrl) {
    super(staticUrl);
  }

  setClickListener(latInput, lngInput, placeInput) {
    naver.maps.Event.addListener(this.map, "click", (event) => {
      this.userPositionMarker.changePosition(event.coord);
      this.userPositionMarker.info.close();
      const { _lat, _lng } = event.latlng;
      this.reverseGeocode({ latitude: _lat, longitude: _lng }, placeInput);
      latInput.value = _lat;
      lngInput.value = _lng;
    });
  }

  reverseGeocode(position, placeInput) {
    const { latitude, longitude } = position;
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(latitude, longitude),
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        }

        const result = response.v2; // 검색 결과의 컨테이너
        const { jibunAddress } = result.address;
        placeInput.value = jibunAddress;
      }
    );
  }

  searchPlaces(searchWord, searchList, latInput, lngInput, placeInput) {
    searchList.innerHTML = "";
    naver.maps.Service.geocode(
      {
        query: searchWord,
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("다시 입력해주세요. 서버 오류 입니다.");
        }

        const result = response.v2; // 검색 결과의 컨테이너
        const { addresses } = result; // 검색 결과의 배열

        addresses.forEach((address) => {
          // x: longitude , y : latitude
          const { jibunAddress, roadAddress, x, y } = address;
          const div = document.createElement("div");
          div.innerHTML = `
            <span>${roadAddress}</span>
            <span>${jibunAddress}</span>
          `;
          div.addEventListener("click", () => {
            placeInput.value = jibunAddress;
            latInput.value = y;
            lngInput.value = x;
          });
          searchList.appendChild(div);
        });
      }
    );
  }
}

export default SearchMap;
