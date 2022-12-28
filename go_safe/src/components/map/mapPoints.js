import React from "react";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import pointsJson from "./points_uttara.json";

require("leaflet-routing-machine");

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
});

var lang;
var lat;
var lang1;
var lat1;

const style = {
  width: "100%",
  height: "100vh",
};

var myIcon = L.icon({
  iconUrl: icon,
});

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  // attribution: "© OpenStreetMap",
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.Form = this.Form.bind(this);
    this.state = { a: false };
    this.state = {
      markers: [],
      myPosition: null,
      circlePosition: null,
      activePopup: null,
      liveLocation: null,
    };
  }

  componentDidUpdate(prevProps) {
    console.log("in");

    // this.fetchData(this.props.Form);

    this.setState(this.lang);
    this.setState(this.lat);
    this.setState(this.lang1);
    this.setState(this.lat1);
    console.log(lang, lat, lang1, lat1);

    var routeControl = L.Routing.control({
      show: true,
      fitSelectedRoutes: true,
      showAlternatives: true,
      plan: false,
     // waypoints: waypoints.spliceWaypoints(1,11),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: "0.7",
            weight: 6,
          },
        ],
      },
    })
      .addTo(this.map)
      .getPlan();

    console.log("here");

    // console.log(lang, lat)

    var newLatLngA = new L.LatLng(lat,lang, "taskA");
    console.log(newLatLngA);
    var newLatLngB = new L.LatLng( lat1, lang1, "taskB");
    console.log(newLatLngB);
    // var newLatLngC = new L.LatLng(23.9469787, 90.3774195, "taskc");
    // var newLatLngD = new L.LatLng(23.905446661730625, 90.39890486065245
    //     , "taskc");
   
 //routeControl.setWaypoints([newLatLngA, newLatLngB]);
    var latArr = [];
    var i = 1;
    latArr.push(newLatLngA);
    const pointsGeoJson = new L.GeoJSON(pointsJson, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { geometry = {} } = feature;

        const { level } = properties;
        const { coordinates } = geometry;
        // console.log(geometry);
        // console.log(coordinates[0]);
        

        latArr.push(new L.LatLng(coordinates[1], coordinates[0], "taskU"));

        
        if (!level) return;

        layer.bindPopup(`Severity level:<b> ${level}</b>`);
      },
    });
    var len = latArr.length;
    latArr.push(newLatLngB);
    console.log(latArr);
    for (i = 0; i < latArr.length-1; i++) {
     
      //console.log(latArr[i+1]);
    }
    //routeControl.setWaypoints(latArr);
    L.Routing.control({
      waypoints : latArr, 
      showAlternatives: true,
      allowUTurn: true
    }).addTo(this.map).spliceWaypoints(1,12);
    // L.Routing.control({
    //   waypoints : [newLatLngA, newLatLngB], 
    //   showAlternatives: true,
    // }).addTo(this.map);
//uttara high school 23.87137429464117, 90.39682068149936
    //routeControl.setWaypoints([newLatLngA, 
      //  L.latLng(
      // 23.873813453585864, 90.39714507019949),
     // L.latLng(latArr[0].lat, latArr[0].lng),
            //   L.latLng(latArr[1].lat, latArr[1].lng),
            //   L.latLng(latArr[2].lat, latArr[2].lng),
            //   L.latLng(latArr[3].lat, latArr[3].lng),
            //   L.latLng(latArr[4].lat, latArr[4].lng),
            //   L.latLng(latArr[5].lat, latArr[5].lng),
            //   L.latLng(latArr[6].lat, latArr[6].lng),
            //   L.latLng(latArr[7].lat, latArr[7].lng),
            //   L.latLng(latArr[8].lat, latArr[8].lng),
            //   L.latLng(latArr[9].lat, latArr[9].lng),
            //   L.latLng(latArr[10].lat, latArr[10].lng),
            //  L.latLng(latArr[11].lat, latArr[11].lng)
           //  ,newLatLngB]);
    // L.Routing.control({
    //       waypoints: [
    //         newLatLngA,
    //         L.latLng(
    //                23.873813453585864, 90.39714507019949),
    //         //L.latLng(latArr[0].lat, latArr[0].lng),
    //         // L.latLng(latArr[1].lat, latArr[1].lng),
    //         // L.latLng(latArr[2].lat, latArr[2].lng),
    //         // L.latLng(latArr[3].lat, latArr[3].lng),
    //         // L.latLng(latArr[4].lat, latArr[4].lng),
    //         // L.latLng(latArr[5].lat, latArr[5].lng),
    //         // L.latLng(latArr[6].lat, latArr[6].lng),
    //         // L.latLng(latArr[7].lat, latArr[7].lng),
    //         // L.latLng(latArr[8].lat, latArr[8].lng),
    //         // L.latLng(latArr[9].lat, latArr[9].lng),
    //         // L.latLng(latArr[10].lat, latArr[10].lng),
    //        // L.latLng(latArr[11].lat, latArr[11].lng),
    //         newLatLngB
    //       ],
    //       showAlternatives: true,
    //     }).addTo(this.map).spliceWaypoints(0, 2);

    console.log(latArr[3].lat, latArr[3].lng);
    // L.Routing.control({
    //   waypoints: [
    //     L.latLng(latArr[3].lat, latArr[3].lng,),
    //     L.latLng(latArr[4].lat, latArr[4].lng,)
    //   ]
    // }).addTo(this.map);
    
    pointsGeoJson.addTo(this.map);

  }
  componentDidMount() {
    if (this.map) {
      this.map.remove();
    }
    //const map = this.map;

    // create map
    this.map = L.map("map", {
      center: [23.9469787, 90.3774195],
      zoom: 12,
      layers: [osm],
    });
    var baseMaps = {
      OpenStreetMap: osm,
    };
    var layerControl = L.control.layers(baseMaps).addTo(this.map);

    var satellite = L.tileLayer(
      "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      { id: "MapID", tileSize: 512, zoomOffset: -1 }
    );
    layerControl.addBaseLayer(satellite, "Satellite");
    var cyclosm = L.tileLayer(
      "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      { id: "MapID", tileSize: 512, zoomOffset: -1 }
    );
    layerControl.addBaseLayer(cyclosm, "cyclosm");
    var Stadia_AlidadeSmoothDark = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      { id: "MapID", tileSize: 512, zoomOffset: -1 }
    );
    layerControl.addBaseLayer(Stadia_AlidadeSmoothDark, "dark");

    
      
      // L.Routing.control({
      //   waypoints: [
      //     L.latLng(
      //       23.87459218969208, 90.39680536110893),
      //     // L.latLng(
      //     //   23.87682132593331, 90.3972130668656),
  
      //     L.latLng(
      //       23.87633482164616, 90.39936057486561)
      //   ]
      //   ,
      //    showAlternatives: true
      //   //show: false
      // }).addTo(this.map);
  

    L.Marker.prototype.options.icon = myIcon;
  }

  Form = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      lang = inputs.langitude;
      lat = inputs.latitude;
      lang1 = inputs.langitude1;
      lat1 = inputs.latitude1;
      console.log(lat, lang);
      this.setState({ a: !this.state.a });
    };
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Enter source latitude 
          <input
            type="number"
            name="latitude"
            value={inputs.latitude || ""}
            onChange={handleChange}
            id="latitude"
          />
        </label>
        <label>
          Enter source langitude
          <input
            id="langitude"
            type="number"
            name="langitude"
            value={inputs.langitude || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter destination latitude
          <input
            type="number"
            name="latitude1"
            value={inputs.latitude1 || ""}
            onChange={handleChange}
            id="latitude1"
          />
        </label>
        <label>
          Enter destination langitude 
          <input
            id="langitude1"
            type="number"
            name="langitude1"
            value={inputs.langitude1 || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          <input type="submit" text="Show Route" />
        </label>
      </form>
    );
  };

  render() {
    return (
      <div>
        <div>
          <this.Form />
        </div>

        <div id="map" style={style}></div>
      </div>
    );
  }
}

export default Map;
