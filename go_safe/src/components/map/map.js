import React, { useEffect, useRef } from "react";
import {
  Map,
  GeoJSON,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
//import { geolocated } from "react-geolocated";
import useGeolocation from "react-hook-geolocation";

import "leaflet/dist/leaflet.css";

function map() {
  // render() {
  const initialState = {
    lat: 23.685,
    lng: 90.3563,
    zoom: 9,
  };
  const liveLocation = [];

  // const lng = this.props.coords ? this.props.coord.langitude : initialState.lng;
  // const lat = this.props.coords ? this.props.coord.latitude : initialState.lat;

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    var locationInfo = { lat: latitude, lng: longitude };
    liveLocation.push(locationInfo);
  });
  console.log(liveLocation);
  return (
    <MapContainer
      center={[initialState.lat, initialState.lng]}
      zoom={initialState.zoom}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
      {/* !this.props.coords? <div className="loading"> Loading </div>: */}

      {/* <Marker position={[liveLocation[0], liveLocation[1]]}>
        <Popup>Your Location</Popup>
      </Marker> */}
    </MapContainer>
  );
}
// }

// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 1000,
// })(map);

export default map;
