import React from "react";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";


require("leaflet-routing-machine");

var lang;
var lat;
var lang1;
var lat1;

const style = {
  width: "100%",
  height: "100vh"
};


var myIcon = L.icon({
  iconUrl: icon,
});

var greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});


class Map extends React.Component {
  constructor(props){
    super(props);
    this.Form = this.Form.bind(this);
    this.state = {a: false}
    
  }
  componentDidUpdate(prevProps) {
    console.log("in")

    
      // this.fetchData(this.props.Form);
      
      this.setState(this.lang)
      this.setState(this.lat)
      this.setState(this.lang1)
      this.setState(this.lat1)
      console.log(lang, lat, lang1, lat1)

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
  
        console.log("here");
  
        
  
       // console.log(lang, lat)
       
      var newLatLngA = new L.LatLng(lang, lat, "taskA");
      console.log(newLatLngA);
       var newLatLngB = new L.LatLng(lang1, lat1 , "taskB");
          console.log(newLatLngB);
      // var newLatLngC = new L.LatLng(23.9469787, 90.3774195, "taskc");
      // var newLatLngD = new L.LatLng(23.905446661730625, 90.39890486065245
      //     , "taskc");
  
      //routeControl.setWaypoints([newLatLngA, newLatLngB, newLatLngC, newLatLngD]);
      
      routeControl.setWaypoints([newLatLngA, newLatLngB]);
    
  }
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

    // var routeControl = L.Routing.control({
      
    //   show: true,
    //   fitSelectedRoutes: true,
    //   plan: false,
    //   lineOptions: {
    //     styles: [
    //       {
    //         color: "blue",
    //         opacity: "0.7",
    //         weight: 6
    //       }
    //     ]
    //   }
    // })
    //   .addTo(this.map)
    //   .getPlan();

    //   console.log("here");

      

    //  // console.log(lang, lat)
     
    // var newLatLngA = new L.LatLng(23.9469787, 90.3774195, "taskA");
    //  var newLatLngB = new L.LatLng(23.90299703073952, 90.40666944380054 , "taskB");
    //     console.log(newLatLngB);
    // // var newLatLngC = new L.LatLng(23.9469787, 90.3774195, "taskc");
    // // var newLatLngD = new L.LatLng(23.905446661730625, 90.39890486065245
    // //     , "taskc");

    // //routeControl.setWaypoints([newLatLngA, newLatLngB, newLatLngC, newLatLngD]);
    
    // routeControl.setWaypoints([newLatLngA, newLatLngB]);
  }


  Form =()=>{
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      lang = inputs.langitude;
      lat = inputs.latitude;
      lang1 = inputs.langitude1;
      lat1 = inputs.latitude1;
      console.log(lat, lang)
      this.setState({a: !this.state.a})
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>Enter source langitude
        <input 
          type="number" 
          name="langitude" 
          value={inputs.langitude || ""} 
          onChange={handleChange}
          id = "langitude"
        />
        </label>
        <label>Enter source latitude
          <input 
            id = "latitude"
            type="number" 
            name="latitude" 
            value={inputs.latitude || ""} 
            onChange={handleChange}
            
          />
          </label>
          <label>Enter destination langitude
        <input 
          type="number" 
          name="langitude1" 
          value={inputs.langitude1 || ""} 
          onChange={handleChange}
          id = "langitude1"
        />
        </label>
        <label>Enter destination latitude
          <input 
            id = "latitude1"
            type="number" 
            name="latitude1" 
            value={inputs.latitude1 || ""} 
            onChange={handleChange}
            
          />
          </label>
          <input type="submit" />
      </form>
    )
}

  render() {
   
    
    return <div> 
  
      
     <div>
      <this.Form/>
    
    </div>
     <div id="map" style={style} >
     </div>
    
  </div>
  
    ;
  }
}

export default Map;
