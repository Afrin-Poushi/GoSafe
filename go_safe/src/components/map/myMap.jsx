// import React, { useEffect, useRef } from 'react';
// import { map, tileLayer, Browser } from 'leaflet';
// import * as leafletReact from 'leaflet';

// import './mapStyle.css';

// const MyMap = ( /* To be triggered when a map object is created */) => {
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     const initialState = {
//       lng: 11,
//       lat: 49,
//       zoom: 4,
//     };

//     const leafletMap = map(mapContainer.current).setView([initialState.lat, initialState.lng],initialState.zoom );

//     //const myAPIKey = 'YOUR_API_KEY';
//     //const isRetina = Browser.retina;
//     // var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
//     // var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

//     var osm = tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     });
//     osm.addTo(leafletMap);

//     //mapIsReadyCallback(leafletMap);
//   }, [mapContainer.current]);

//   return <div className="map-container" ref={mapContainer}></div>;
// };

// export default MyMap;