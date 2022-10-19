import React, { Component } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
//import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "./mapStyle.css";

import "leaflet/dist/leaflet.css";
import LocateControl from "./locate";
import { getDatabase, ref, onValue, child, set } from "firebase/database";
import { auth, db } from "../../firebase";
import $ from "jquery";
import Papa from "papaparse";
import pointsJson from "./points.json";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
});

class MapComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      myPosition: null,
      circlePosition: null,
      activePopup: null,
      liveLocation: null,
    };

    this.map = null;
    this.radius = 2000;
    // this.sayHello = this.sayHello.bind(this);
  }

  componentDidMount() {
    this.map = this.leafletMap.leafletElement;
    const map = this.map;
    const self = this;
    // const searchControl = new ELG.Geosearch().addTo(map);
    // const results = new L.LayerGroup().addTo(map);

    // searchControl.on("results", function (data) {
    //   results.clearLayers();
    //   //console.log(data);
    //   const marker = data.results[0];

    //   if (marker) self.addMyPosition(marker);
    // });

    map.on("locationfound", function (ev) {
      self.addMyPosition(ev);
      console.log(ev.latlng);

      const user = auth.currentUser;
      set(ref(db, "users/" + user.uid + "/locations/"), {
        liveLocation: ev.latlng,
      });
    });

    const pointsGeoJson = new L.GeoJSON(pointsJson, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { level } = properties;

        if (!level) return;

        layer.bindPopup(`Safety level:<b> ${level}</b>`);
      },
    });

    pointsGeoJson.addTo(map);

    // const markers = [
    //   {
    //     id: "1",
    //     name: "ABC",
    //     latlng: {
    //       lat: -9.96403208832135,
    //       lng: -67.82675743103029,
    //     },
    //   },
    //   {
    //     id: "2",
    //     name: "BBBB",
    //     latlng: {
    //       lat: -9.9627640448494,
    //       lng: -67.8948211669922,
    //     },
    //   },
    //   {
    //     id: "three",
    //     name: "CCC",
    //     latlng: {
    //       lat: -9.981361521399743,
    //       lng: -67.81946182250978,
    //     },
    //   },
    // ];

    // markers.forEach((m) => {
    //   self.addMarker(m);
    // });

    // $.get("./US_Accidents_Dec20.csv", function (csvString) {
    //   // Use PapaParse to convert string to array of objects
    //   var data = Papa.parse(csvString, {
    //     header: false,
    //     dynamicTyping: true,
    //   }).data;
    //   console.log(data);

    //   // For each row in data, create a marker and add it to the map
    //   // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    //   for (var i in data) {
    //     var row = data[i];

    //     var marker = L.marker([row.latitude, row.longitude], {
    //       opacity: 1,
    //     }).bindPopup(row.Title);

    //     marker.addTo(map);
    //   }
    // });
  }

  addMyPosition = (e) => {
    const position = e.latlng;

    this.clearMyPosition();

    this.setState({ myPosition: position });

    this.selectPoints(position.lat, position.lng);
    this.drawerCircle(position, this.radius);
  };

  clearMyPosition = () => {
    const circlePosition = this.state.circlePosition;

    if (circlePosition) this.map.removeLayer(circlePosition);

    this.setState({ myPosition: null, circlePosition: null });
  };

  addMarker = (e) => {
    const markers_ = this.state.markers;
    markers_.push(e);
    this.setState({ markers_ });
  };

  selectPoints = (lat, lng) => {
    const radius = this.radius;
    const current_position = L.latLng(lat, lng);

    this.state.markers.forEach((m) => {
      const userLocation = [m.latlng.lat, m.latlng.lng];
      const distance = current_position.distanceTo(userLocation);

      m.inRadius = distance <= radius;
    });
  };

  drawerCircle = (currentPosition, radius) => {
    const circlePosition = L.circle(currentPosition, radius, {
      /// Number is in Meters
      color: "#136aec",
      fillOpacity: 0.2,
      fillColor: "#136aec",
      opacity: 1,
      weight: 0,
    }).addTo(this.map);

    this.setState({ circlePosition });
  };

  // handleCsv() {
  //   navigate("/getCsv.html");
  // }

  sayHello() {
    let uid = auth.currentUser.uid.toString();
    console.log(uid);
    let url =
      "https://gosafe-b9231-default-rtdb.firebaseio.com/users/" + uid + ".json";
    // curl 'https://{db-name}.firebaseio.com/users/eantoni.json?print=pretty'
    let userData = fetch(url, {
      headers: {
        Accept: "application/json",
        Path: "/",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => alert(err.message));

    console.log(userData);
  }

  render() {
    const center = [23.685, 90.3563];
    const markers = this.state.markers;
    const myPosition = this.state.myPosition;
    // const activePopup = this.state.activePopup;

    const locateOptions = {
      showPopup: true,
      position: "topleft",
      strings: {
        title: "Your Location",
        popup: "You are Here",
      },
      drawCircle: false,
      onActivate: () => {}, // callback before engine starts retrieving locations
    };

    return (
      <div id="map">
        <div>
          <button> Share Location</button>
        </div>
        <Map
          style={{ height: "100vh" }}
          center={center}
          zoom="9"
          ref={(m) => {
            this.leafletMap = m;
          }}
          //onClick={this.addMyPosition}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LocateControl
            options={locateOptions}
            on={myPosition ? false : true}
          />

          <div className="pointer" />

          {myPosition && (
            <CircleMarker
              center={myPosition}
              radius={9}
              color="white"
              fillColor="#2A93EE"
              fillOpacity={1}
              opacity={1}
              onClick={this.clearMyPosition}
            />
          )}

          {/* {markers.map((m) => (
          <Marker
            position={m.latlng}
            key={m.id}
            icon={m.inRadius ? RedMarker : BlueMarker}
          >
            <Popup>{m.name}</Popup>
          </Marker>
        ))} */}

          <Marker position={[23.685, 90.3563]}></Marker>
        </Map>
      </div>
    );
  }
}

export default MapComp;
