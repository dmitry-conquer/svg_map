import "../styles/main.scss";
import AccordionCollection from "./components/accordion";
import Map from "./components/map";

declare const mapData: {
  markers?: MarkerData[];
};

document.addEventListener("DOMContentLoaded", () => {
  new AccordionCollection();
  if (typeof mapData !== "undefined" && mapData.markers) {
    new Map(mapData.markers);
  }
});
