import React from "react";
import L from "leaflet";
import { Browser } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import pointsJson from "./points_uttara.json";
import axios from "axios";
import { Route } from "react-router-dom";

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
    
    latArr.push(newLatLngA);
   
    var len = latArr.length;
    latArr.push(newLatLngB);
    console.log(latArr);
    for (i = 0; i < latArr.length - 1; i++) {
      //console.log(latArr[i+1]);
    }
    //routeControl.setWaypoints(latArr);
    L.Routing.control({
      waypoints: latArr,
      showAlternatives: true,
      allowUTurn: true,
    })
      .addTo(this.map)
      .spliceWaypoints(0, 12);
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

   
  }
  componentDidMount() {
    if (this.map) {
      return;
    }
    //const map = this.map;

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
    // const response = axios(config)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // console.log(response);

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

     const pointsGeoJson = new L.GeoJSON(pointsJson, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { geometry = {} } = feature;

        const { level } = properties;
        const { coordinates } = geometry;
        const {markercolor} = properties;
        // console.log(geometry);
        // console.log(coordinates[0]);

        latArr.push(new L.LatLng(coordinates[1], coordinates[0], "taskU"));

        if (!level) return;

        layer.bindPopup(`Severity level:<b> ${level}</b>`);
      },
    }); 
    pointsGeoJson.addTo(this.map);

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
        }
      },
      {
        placeholder: "Enter an address here",
      }
    );

    addressAutocomplete(
      document.getElementById("autocomplete-container-country"),
      (data) => {
        console.log("Selected country: ");
        console.log(data);
      },
      {
        placeholder: "Enter a country name here",
        type: "country",
      }
    );

    addressAutocomplete(
      document.getElementById("autocomplete-container-city"),
      (data) => {
        console.log("Selected city: ");
        console.log(data);
      },
      {
        placeholder: "Enter a city name here",
      }
    );

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
        var destBtn = createButton('Go to this location', container);
        container.appendChild(startBtn);
        //container.setAttribute("id", "butt");
        const pop = L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openPopup();
        const popAddress = L.popup().setLatLng([lat, lng]).setContent(`The address ${address}, ${address2} <br> ${lat}, ${lng}`).openOn(leafletMap);

          marker2.bindPopup(popAddress);
          popAddress.setContent(`${popAddress.getContent()} <br> ${container.outerHTML}`);

          L.DomEvent.on(startBtn, 'click', function() {
            Route.control.spliceWaypoints(0, 1, e.latlng);
            leafletMap.closePopup();
        });
        L.DomEvent.on(destBtn, 'click', function() {
          Route.control.spliceWaypoints(Route.control.getWaypoints().length - 1, 1, e.latlng);
          leafletMap.closePopup();
      });


         
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
        <div>
          <div
            className="autocomplete-container"
            id="autocomplete-container"
          ></div>
          <div
            className="autocomplete-container"
            id="autocomplete-container-country"
          ></div>
          <div
            className="autocomplete-container"
            id="autocomplete-container-city"
          ></div>
        </div>

        <div id="map" style={style}></div>
      </div>
    );
  }
}

export default Map;
