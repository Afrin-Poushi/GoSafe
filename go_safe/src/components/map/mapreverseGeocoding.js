import React from "react";
import L from "leaflet";
import { Browser } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import pointsJson from "./points_uttara.json";
import axios from "axios";
import { Route } from "react-router-dom";
import { ServicesH1 } from "../LandingPage/Services/ServiceElements";

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
var latArr = [];
var i = 1;
const style = {
  width: "100%",
  height: "100vh",
};

var myIcon = L.icon({
  iconUrl: icon,
});

var redIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const myAPIKey = "9e8599c1e951425199980bc34c4c925e";
const isRetina = Browser.retina;

var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

var osm = L.tileLayer(isRetina ? retinaUrl : baseUrl, {
  attribution:
    'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
  apiKey: myAPIKey,
  maxZoom: 20,
  id: "osm-bright",
});

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

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

    var newLatLngA = new L.LatLng(lat, lang, "taskA");
    console.log(newLatLngA);
    var newLatLngB = new L.LatLng(lat1, lang1, "taskB");
    console.log(newLatLngB);
    // var newLatLngC = new L.LatLng(23.9469787, 90.3774195, "taskc");
    // var newLatLngD = new L.LatLng(23.905446661730625, 90.39890486065245
    //     , "taskc");

    //routeControl.setWaypoints([newLatLngA, newLatLngB]);
    
    //latArr.unshift(newLatLngA);
    latArr.push(newLatLngA);

    const pointsGeoJson = new L.GeoJSON(pointsJson, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { geometry = {} } = feature;

        const { level } = properties;
        const { coordinates } = geometry;
        const {markerColor} = properties;
        console.log(markerColor);
        // console.log(geometry);
        // console.log(coordinates[0]);

        latArr.push(new L.LatLng(coordinates[1], coordinates[0], "taskU"));

        if (!level) return;
        layer.options.icon = redIcon;

        layer.bindPopup(`Severity level:<b> ${level}</b>`);
      },
    }); 
    pointsGeoJson.addTo(this.map);
   
    
    
    latArr.push(newLatLngB);
    var len = latArr.length;
    console.log(len);
    console.log(latArr);
    for (i = 0; i < latArr.length - 1; i++) {
      //console.log(latArr[i+1]);
    }
      L.Routing.control({
        waypoints: [
          newLatLngA,
            newLatLngB
        ]
        ,
         showAlternatives: true
        //show: false
      }).addTo(this.map);
  
  }
  componentDidMount() {
    if (this.map) {
      return;
    }
    
    //create map
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

    var config = {
      method: "get",
      url: "https://api.geoapify.com/v1/geocode/reverse?lat=23.87006226743587&lon=90.39513137901747&apiKey=9e8599c1e951425199980bc34c4c925e",
      headers: {},
    };

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
    //   routeControl.setWaypoints([L.latLng(23.9469787, 90.3774195),L.latLng(23.905446661730625, 90.39890486065245)]);
    // console.log(routeControl.getRouter());
 

    L.Marker.prototype.options.icon = myIcon;



    function addressAutocomplete(containerElement, callback, options) {
      // create input element
      var inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("placeholder", options.placeholder);
      containerElement.appendChild(inputElement);

      // add input field clear button
      var clearButton = document.createElement("div");
      clearButton.classList.add("clear-button");
      addIcon(clearButton);
      clearButton.addEventListener("click", (e) => {
        e.stopPropagation();
        inputElement.value = "";
        callback(null);
        clearButton.classList.remove("visible");
        closeDropDownList();
        window.location.reload(true);
      });
      containerElement.appendChild(clearButton);

      /* Current autocomplete items data (GeoJSON.Feature) */
      var currentItems;

      /* Active request promise reject function. To be able to cancel the promise when a new request comes */
      var currentPromiseReject;

      /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
      var focusedItemIndex;

      /* Execute a function when someone writes in the text field: */
      inputElement.addEventListener("input", function (e) {
        var currentValue = this.value;

        /* Close any already open dropdown list */
        closeDropDownList();

        // Cancel previous request promise
        if (currentPromiseReject) {
          currentPromiseReject({
            canceled: true,
          });
        }

        if (!currentValue) {
          clearButton.classList.remove("visible");

          return false;
        }

        // Show clearButton when there is a text
        clearButton.classList.add("visible");

        /* Create a new promise and send geocoding request */
        var promise = new Promise((resolve, reject) => {
          currentPromiseReject = reject;

          var apiKey = "9e8599c1e951425199980bc34c4c925e";
          var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            currentValue
          )}&limit=5&apiKey=${apiKey}`;

          if (options.type) {
            url += `&type=${options.type}`;
          }

          fetch(url).then((response) => {
            // check if the call was successful
            if (response.ok) {
              response.json().then((data) => resolve(data));
            } else {
              response.json().then((data) => reject(data));
            }
          });
        });

        promise.then(
          (data) => {
            currentItems = data.features;

            /*create a DIV element that will contain the items (values):*/
            var autocompleteItemsElement = document.createElement("div");
            autocompleteItemsElement.setAttribute(
              "class",
              "autocomplete-items"
            );
            containerElement.appendChild(autocompleteItemsElement);

            /* For each item in the results */
            data.features.forEach((feature, index) => {
              /* Create a DIV element for each element: */
              var itemElement = document.createElement("DIV");
              /* Set formatted address as item value */
              itemElement.innerHTML = feature.properties.formatted;

              /* Set the value for the autocomplete text field and notify: */
              itemElement.addEventListener("click", function (e) {
                inputElement.value = currentItems[index].properties.formatted;

                callback(currentItems[index]);

                /* Close the list of autocompleted values: */
                closeDropDownList();
              });

              autocompleteItemsElement.appendChild(itemElement);
            });
          },
          (err) => {
            if (!err.canceled) {
              console.log(err);
            }
          }
        );
      });

      /* Add support for keyboard navigation */
      inputElement.addEventListener("keydown", function (e) {
        var autocompleteItemsElement = containerElement.querySelector(
          ".autocomplete-items"
        );
        if (autocompleteItemsElement) {
          var itemElements =
            autocompleteItemsElement.getElementsByTagName("div");
          if (e.keyCode == 40) {
            e.preventDefault();
            /*If the arrow DOWN key is pressed, increase the focusedItemIndex variable:*/
            focusedItemIndex =
              focusedItemIndex !== itemElements.length - 1
                ? focusedItemIndex + 1
                : 0;
            /*and and make the current item more visible:*/
            setActive(itemElements, focusedItemIndex);
          } else if (e.keyCode == 38) {
            e.preventDefault();

            /*If the arrow UP key is pressed, decrease the focusedItemIndex variable:*/
            focusedItemIndex =
              focusedItemIndex !== 0
                ? focusedItemIndex - 1
                : (focusedItemIndex = itemElements.length - 1);
            /*and and make the current item more visible:*/
            setActive(itemElements, focusedItemIndex);
          } else if (e.keyCode == 13) {
            /* If the ENTER key is pressed and value as selected, close the list*/
            e.preventDefault();
            if (focusedItemIndex > -1) {
              closeDropDownList();
            }
          }
        } else {
          if (e.keyCode == 40) {
            /* Open dropdown list again */
            var event = document.createEvent("Event");
            event.initEvent("input", true, true);
            inputElement.dispatchEvent(event);
          }
        }
      });

      function setActive(items, index) {
        if (!items || !items.length) return false;

        for (var i = 0; i < items.length; i++) {
          items[i].classList.remove("autocomplete-active");
        }

        /* Add class "autocomplete-active" to the active element*/
        items[index].classList.add("autocomplete-active");

        // Change input value and notify
        inputElement.value = currentItems[index].properties.formatted;
        callback(currentItems[index]);
      }

      function closeDropDownList() {
        var autocompleteItemsElement = containerElement.querySelector(
          ".autocomplete-items"
        );
        if (autocompleteItemsElement) {
          containerElement.removeChild(autocompleteItemsElement);
        }

        focusedItemIndex = -1;
      }

      function addIcon(buttonElement) {
        var svgElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svgElement.setAttribute("viewBox", "0 0 24 24");
        svgElement.setAttribute("height", "24");

        var iconElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        iconElement.setAttribute(
          "d",
          "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        );
        iconElement.setAttribute("fill", "currentColor");
        svgElement.appendChild(iconElement);
        buttonElement.appendChild(svgElement);
      }

      /* Close the autocomplete dropdown when the document is clicked. 
      Skip, when a user clicks on the input field */
      document.addEventListener("click", function (e) {
        if (e.target !== inputElement) {
          closeDropDownList();
        } else if (!containerElement.querySelector(".autocomplete-items")) {
          // open dropdown list again
          var event = document.createEvent("Event");
          event.initEvent("input", true, true);
          inputElement.dispatchEvent(event);
        }
      });
    }
    // Options for the marker
    var markerOptions = {
      title: "MyLocation",
      clickable: true,
      draggable: false,
      autoPan: true,
      icon: myIcon,
    };
    addressAutocomplete(
      document.getElementById("autocomplete-container"),
      (data) => {
        console.log("Selected option: ");
        if (data != null) {
          let lng = data.geometry.coordinates[0];
          let lat = data.geometry.coordinates[1];
          console.log(lng, lat);
          var marker = L.marker([lat, lng], markerOptions);
          marker.bindPopup(`${lat}, ${lng}`).openPopup();

          marker.addTo(this.map.flyTo(marker.getLatLng(), 15));
          var s1 =  document.getElementById("autocomplete-container");
          s1.setAttribute("slat", lat);
          s1.setAttribute("slng", lng);
        }
      },
      {
        placeholder: "Enter source address here", 
        
      }
    );

    addressAutocomplete(
      document.getElementById("autocomplete-container1"),
      (data) => {
        console.log("Selected option: ");
        if (data != null) {
          let lng = data.geometry.coordinates[0];
          let lat = data.geometry.coordinates[1];
          console.log(lng, lat);
          var marker = L.marker([lat, lng], markerOptions);
          marker.bindPopup(`${lat}, ${lng}`).openPopup();

          marker.addTo(this.map.flyTo(marker.getLatLng(), 15));
          var s1 =  document.getElementById("autocomplete-container1");
          s1.setAttribute("slat", lat);
          s1.setAttribute("slng", lng);
        }
      },
      {
        placeholder: "Enter destination address here",
      }
    );
    var newLatLngC, newLatLngD;
    
    this.map.on("click", function (e, map) {
      // Get the latitude and longitude of the click point
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      console.log(lat, lng);
      
      

      var config = {
        method: "get",
        url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=9e8599c1e951425199980bc34c4c925e`,
        headers: {},
      };
      let leafletMap = this;
      console.log(leafletMap);

      const response = axios(config)
        .then(function (response) {
          let address = response.data.results[0].address_line1;
          let address2 = response.data.results[0].address_line2;
          console.log(response.data.results[0]);
          // Create a new marker at the click point
          var marker2 = L.marker([lat, lng], markerOptions).addTo(leafletMap);
          // console.log(marker2);
          var container = L.DomUtil.create('div');
        var startBtn = createButton('Start from this location', container);
        startBtn.setAttribute("id", "startbtn");
        var destBtn = createButton('Go to this location', container);
        destBtn.setAttribute("id", "dstbtn");
        //container.appendChild(startBtn);
        //container.setAttribute("id", "but");
        const pop = L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openPopup();
        const popAddress = L.popup().setLatLng([lat, lng]).setContent(`The address ${address}, ${address2} <br> ${lat}, ${lng}`).openOn(leafletMap);
  
          marker2.bindPopup(popAddress);
          popAddress.setContent(`${popAddress.getContent()} <br> ${startBtn.outerHTML} ${destBtn.outerHTML}`);
          
          L.DomEvent.on(document.getElementById("startbtn"), 'click', function() {
            newLatLngC = new L.LatLng(lat, lng, "taskc");
            // L.Routing.control({
            //   waypoints: [
            //     newLatLngC,
            //       newLatLngD
            //   ],
            //    showAlternatives: true
            // }).addTo(leafletMap).spliceWaypoints(0, 1, e.latlng);
            leafletMap.closePopup();
        });
        
        L.DomEvent.on(document.getElementById("dstbtn"), 'click', function() {
          newLatLngD = new L.LatLng(lat, lng, "taskd");
          console.log(newLatLngC);
          // L.Routing.control({
          //   waypoints: [
          //     newLatLngC,
          //       newLatLngD
          //   ],
          //    showAlternatives: true
          // }).addTo(leafletMap).spliceWaypoints(Route.control.getWaypoints().length - 1, 1, lat);
          leafletMap.closePopup();
      });
      L.Routing.control({
        waypoints: [
          newLatLngC,
            newLatLngD
        ],
         showAlternatives: true
      }).addTo(leafletMap);
      //routeControl.setWaypoints(newLatLngC, newLatLngD);

         
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(response);
    });
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
      console.log( document.getElementById("autocomplete-container").getAttribute("slat"));
      lang =document.getElementById("autocomplete-container").getAttribute("slng");
      lat = document.getElementById("autocomplete-container").getAttribute("slat");
      lang1 = document.getElementById("autocomplete-container1").getAttribute("slng");;
      lat1 = document.getElementById("autocomplete-container1").getAttribute("slat");
      console.log(lat, lang);
      this.setState({ a: !this.state.a });
    };
    return (
      <form onSubmit={handleSubmit}>
        
        <div>
          <div
            className="autocomplete-container"
            id="autocomplete-container"

          ></div>
           <div
            className="autocomplete-container"
            id="autocomplete-container1"
          ></div>
        </div>
        <label>
          <input type="submit" text="Show Route" />
        </label>
      </form>
    );
  };

  render() {
    return (
      <div>
        <button onClick={() => window.location.reload(false)}>Click to reload!</button>
        <div>
          <this.Form />
        </div>
       

        <div id="map" style={style}></div>
      </div>
    );
  }
}

export default Map;
