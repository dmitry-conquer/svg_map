import Popup from "./popup";
import Markers from "./markers";

export default class Map {
  private readonly selectors: Record<string, string> = {
    wrapper: ".wrapper",
    root: ".map",
    map: ".map-svg",
    marker: ".map-marker",
    popup: ".map-popup",
    areaButton: ".map-area",
    area: "[data-area]",
  };
  private wrapper: HTMLElement | null = null;
  private rootElement: HTMLElement | null;
  private mapElement: HTMLElement | null = null;
  private markersData: MarkerData[] = [];
  private activeMarker: SVGElement | null = null;
  private popup: Popup;
  private markers: Markers;
  private areas: HTMLElement[] = [];
  private hightlightedArea: HTMLElement | null = null;
  private defaultPathFill: string = "#BEEDFF";

  constructor(markersData: MarkerData[]) {
    this.popup = new Popup();
    this.markers = new Markers();
    this.wrapper = document.querySelector(this.selectors.wrapper) as HTMLElement;
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.mapElement = this.rootElement?.querySelector(this.selectors.map) as HTMLElement;
    this.markersData = markersData;
    this.areas = Array.from(this.rootElement?.querySelectorAll(this.selectors.area) as NodeListOf<HTMLElement>);
    this.initMap();
  }

  private initMap(): void {
    if (!this.isReady()) return;
    this.fillAreas();
    this.setDefaultFill();
    this.popup.create();
    this.markers.renderMarkers(this.markersData);
    this.bindEvents();
  }

  private isReady(): boolean {
    return !!this.wrapper && !!this.rootElement && !!this.mapElement;
  }

  private fillAreas(): void {
    const keys = this.rootElement?.dataset.filledAreas;
    if (!keys) return;
    const keysArray = keys.split(",").map(key => key.trim());

    this.areas.forEach((area: HTMLElement) => {
      const areaId = area.getAttribute("data-area");
      if (!areaId) return;
      if (keysArray.includes(areaId)) {
        area.setAttribute("fill", this.defaultPathFill);
      }
    });
  }

  private setDefaultFill(): void {
    this.areas.forEach((area: HTMLElement) => {
      const defaultPathFill = area.getAttribute("fill");
      area.setAttribute("data-default-fill", defaultPathFill || "#fff");
    });
  }

  private highlightArea(area: HTMLElement): void {
    area?.setAttribute("stroke", "#BEEDFF");
    area?.setAttribute("stroke-width", "3");
    area?.setAttribute("fill", "#A3D8F4");
  }

  private resetAreaHighlight(area: HTMLElement): void {
    const defaultPathFill = area.dataset.defaultFill;
    this.hightlightedArea?.removeAttribute("stroke");
    this.hightlightedArea?.removeAttribute("stroke-width");
    this.hightlightedArea?.setAttribute("fill", defaultPathFill || "#fff");
    this.hightlightedArea = null;
  }

  private onResize = (): void => {
    if (!this.activeMarker) return;
    const rect = this.activeMarker.getBoundingClientRect();
    this.popup.setPosition(rect);
  };

  private onClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement | SVGElement;
    const markerEl = target.closest(this.selectors.marker);
    const areaEl = target.closest(this.selectors.areaButton);

    if (!markerEl && !areaEl) {
      this.activeMarker = null;
      this.popup.hide();
      return;
    }

    if (markerEl) {
      const markerId = target.getAttribute("data-marker-id");
      const markerData = this.markersData.find((marker: MarkerData) => marker.id?.toString() === markerId);
      if (!markerData) return;
      this.activeMarker = target as SVGElement;
      this.popup.show(target as SVGElement, markerData.content);
    }
  };

  private onMouseOver = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const areaButton = target.closest(this.selectors.areaButton);
    if (areaButton) {
      const areaId = target.dataset.areaButton;
      if (!areaId) return;
      const areaPath = this.rootElement?.querySelector(`path[data-area="${areaId}"]`);
      this.highlightArea(areaPath as HTMLElement);
      this.hightlightedArea = areaPath as HTMLElement;
    } else if (!areaButton && this.hightlightedArea) {
      this.resetAreaHighlight(this.hightlightedArea);
    }
  };

  private bindEvents(): void {
    window.addEventListener("resize", this.onResize);
    document.addEventListener("click", this.onClick);
    this.rootElement?.addEventListener("mouseover", this.onMouseOver);
  }
}
