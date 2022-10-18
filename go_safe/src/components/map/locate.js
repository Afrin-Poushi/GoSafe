// import LocateControl from "react-leaflet-locate-control";

// // Setup LocateControl options
// const locate = () => {
//   //console.log("locate location");
//   const locateOptions = {
//     position: "topleft",
//     strings: {
//       title: "Show me where I am, yo!",
//     },
//     drawCircle: true,
//     onActivate: () => {}, // callback before engine starts retrieving locations
//   };
// };
// export default locate;

import { Component } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

class LocateControl extends Component {
  constructor(props) {
    super(props);

    this.lc = null;
  }

  componentDidMount() {
    const { options, startDirectly, on } = this.props;
    const { map } = this.props.leaflet;

    this.lc = new Locate(options);

    const lc = this.lc;

    lc.addTo(map);

    if (startDirectly && on) lc.start();
  }

  render() {
    const { on } = this.props;

    if (this.lc && !on) this.lc.stop();

    return null;
  }
}

export default withLeaflet(LocateControl);
