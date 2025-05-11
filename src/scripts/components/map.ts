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
  private popupElement!: HTMLElement;
  private markersData: MarkerData[] = [];
  private activeMarker: SVGElement | null = null;
  private areas: HTMLElement[] = [];
  private hightlightedArea: HTMLElement | null = null;
  private defaultPathFill: string = "#BEEDFF";

  constructor(markersData: MarkerData[]) {
    this.wrapper = document.querySelector(this.selectors.wrapper) as HTMLElement;
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.mapElement = this.rootElement?.querySelector(this.selectors.map) as HTMLElement;
    this.popupElement = this.rootElement?.querySelector(this.selectors.popup) as HTMLElement;
    this.markersData = markersData;
    this.areas = Array.from(this.rootElement?.querySelectorAll(this.selectors.area) as NodeListOf<HTMLElement>);
    this.initMap();
  }

  private initMap(): void {
    if (!this.isReady()) return;
    this.fillAreas();
    this.setDefaultFill();
    this.createPopup();
    this.renderMarkers();
    this.bindEvents();
  }

  private isReady(): boolean {
    return !!this.wrapper && !!this.rootElement && !!this.mapElement;
  }

  private createPopup(): void {
    this.popupElement = document.createElement("div");
    this.popupElement.classList.add(this.getClassName(this.selectors.popup));
    this.wrapper?.appendChild(this.popupElement);
  }

  private getClassName(selector: string): string {
    return selector.replace(".", "");
  }

  private renderMarkers(): void {
    this.markersData.forEach((markerData: MarkerData, index: number) => {
      markerData.id = index;
      const markerElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
      markerElement.setAttributeNS(null, "href", markerData.imageSrc);
      markerElement.setAttribute("x", (markerData.x - 12).toString());
      markerElement.setAttribute("y", (markerData.y - 12).toString());
      markerElement.setAttribute("data-marker-id", markerData.id.toString());
      markerElement.classList.add(this.getClassName(this.selectors.marker));
      this.mapElement?.appendChild(markerElement);
    });
  }

  private showPopup(target: SVGElement, content: string): void {
    this.popupElement.innerHTML = content;
    this.popupElement.style.display = "block";
    const rect = target.getBoundingClientRect();
    console.log(rect);
    this.setPopupPosition(rect);
  }

  private hidePopup(): void {
    this.popupElement.style.display = "none";
    this.popupElement.innerHTML = "";
    this.activeMarker = null;
  }

  private setPopupPosition(rect: DOMRect): void {
    const { offsetWidth: width } = this.popupElement;
    const padding = 20;

    const top = rect.top + window.scrollY;
    let left = rect.left + rect.width + padding;
    if (left + width > window.innerWidth - padding) {
      left = rect.left - width - padding;
      this.popupElement.classList.add("move-left");
    } else {
      this.popupElement.classList.remove("move-left");
    }
    left = Math.max(left, padding);

    this.popupElement.style.left = `${left}px`;
    this.popupElement.style.top = `${top}px`;
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

  private onResize = (): void => {
    if (!this.activeMarker) return;
    const rect = this.activeMarker.getBoundingClientRect();
    this.setPopupPosition(rect);
  };

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

  private onClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement | SVGElement;
    const markerEl = target.closest(this.selectors.marker);
    const areaEl = target.closest(this.selectors.areaButton);

    if (!markerEl && !areaEl) {
      this.hidePopup();
      return;
    }

    if (markerEl) {
      const markerId = target.getAttribute("data-marker-id");
      const markerData = this.markersData.find((marker: MarkerData) => marker.id?.toString() === markerId);
      if (!markerData) return;
      this.activeMarker = target as SVGElement;
      this.showPopup(target as SVGElement, markerData.content);
    }
  };

  private onMouseOver = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const areaButton = target.closest(this.selectors.areaButton);
    if (areaButton) {
      const areaId = target.dataset.areaButton;
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
