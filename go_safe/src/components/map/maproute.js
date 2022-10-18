import React from "react";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';

require("leaflet-routing-machine");

const style = {
  width: "100%",
  height: "100vh"
};


var myIcon = L.icon({
  iconUrl: icon,
});

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});


class Map extends React.Component {
  componentDidMount() {
    
    if(this.map){
        this.map.remove();
    }
    
    // create map
    this.map = L.map("map", {
      center: [23.9469787, 90.3774195],
      zoom: 7,
      layers: [osm
      ]
    });
    var baseMaps = {
      "OpenStreetMap": osm,
  };
  var layerControl = L.control.layers(baseMaps).addTo(this.map);

  var satellite = L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {id: 'MapID', tileSize: 512, zoomOffset: -1});
  layerControl.addBaseLayer(satellite, "Satellite");
  var cyclosm = L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {id: 'MapID', tileSize: 512, zoomOffset: -1});
  layerControl.addBaseLayer(cyclosm, "cyclosm");
  var Stadia_AlidadeSmoothDark = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {id: 'MapID', tileSize: 512, zoomOffset: -1});
  layerControl.addBaseLayer(Stadia_AlidadeSmoothDark, "dark");
  

    L.Marker.prototype.options.icon = myIcon

    var routeControl = L.Routing.control({
      
      show: true,
      fitSelectedRoutes: true,
      plan: false,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: "0.7",
            weight: 6
          }
        ]
      }
    })
      .addTo(this.map)
      .getPlan();

 
    var newLatLngA = new L.LatLng(23.9469787, 90.3774195, "taskA");
     var newLatLngB = new L.LatLng(23.90299703073952, 90.40666944380054, "taskB");
        console.log(newLatLngB);
    var newLatLngC = new L.LatLng(23.9469787, 90.3774195, "taskc");
    var newLatLngD = new L.LatLng(23.905446661730625, 90.39890486065245, "taskd");

    routeControl.setWaypoints([newLatLngA, newLatLngB, newLatLngC, newLatLngD]);
}
render() {
  return <div id="map" style={style} />;
}
}

export default Map;
