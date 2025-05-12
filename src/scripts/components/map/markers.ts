import { getClassName } from "../../helpers";

export default class Markers {
  private readonly selectors: Record<string, string> = {
    map: ".map-svg",
    marker: ".map-marker",
  };

  private mapElement: HTMLElement | null = null;

  constructor() {
    this.mapElement = document.querySelector(this.selectors.map) as HTMLElement;
  }

  private isReady(): boolean {
    return !!this.mapElement;
  }

  public renderMarkers(markersData: MarkerData[]): void {
    if (!this.isReady()) return;
    markersData.forEach((markerData: MarkerData, index: number) => {
      markerData.id = index;
      const markerElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
      markerElement.setAttributeNS(null, "href", markerData.image_src);
      markerElement.setAttribute("x", (+markerData.x - 12).toString());
      markerElement.setAttribute("y", (+markerData.y - 12).toString());
      markerElement.setAttribute("data-marker-id", markerData.id.toString());
      markerElement.classList.add(getClassName(this.selectors.marker));
      this.mapElement?.appendChild(markerElement);
    });
  }
}
