// TODO
//  1. map event click deligate






export default class Map {
  private readonly selectors: Record<string, string> = {
    wrapper: ".wrapper",
    root: ".map",
    map: ".map-svg",
    marker: ".map-marker",
    popup: ".map-popup",
  };
  private wrapper: HTMLElement | null = null;
  private rootElement: HTMLElement | null;
  private mapElement: HTMLElement | null = null;
  private popupElement!: HTMLElement;
  private markers: Marker[] = [];
  private activeMarker: SVGElement | null = null;

  constructor(markers: Marker[]) {
    this.wrapper = document.querySelector(this.selectors.wrapper) as HTMLElement;
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.mapElement = this.rootElement?.querySelector(this.selectors.map) as HTMLElement;
    this.popupElement = this.rootElement?.querySelector(this.selectors.popup) as HTMLElement;
    this.markers = markers;
    this.initMap();
  }

  private isReady(): boolean {
    return !!this.wrapper && !!this.rootElement && !!this.mapElement;
  }

  private initMap(): void {
    if (!this.isReady()) return;
    this.createPopup();
    this.renderMarkers();
    this.bindEvents();
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
    this.markers.forEach((markerData: Marker) => {
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "image");
      marker.setAttributeNS(null, "href", markerData.imageSrc);
      marker.setAttribute("x", (markerData.x - 12).toString());
      marker.setAttribute("y", (markerData.y - 12).toString());
      marker.style.cursor = "pointer";
      marker.classList.add(this.getClassName(this.selectors.marker));
      this.mapElement?.appendChild(marker);

      marker.addEventListener("click", (): void => {
        this.showPopup(marker, markerData.content);
      });
    });
  }

  private showPopup(marker: SVGElement, content: string): void {
    this.popupElement.innerHTML = content;
    this.activeMarker = marker;
    this.popupElement.style.display = "block";
    const rect = marker.getBoundingClientRect();
    this.setPopupPosition(rect);
  }

  private hidePopup(): void {
    this.popupElement.style.display = "none";
    this.popupElement.innerHTML = "";
    this.activeMarker = null;
  }

  private setPopupPosition(rect: DOMRect): void {
    const width = this.popupElement.offsetWidth;
    const padding = 20;
    const top = rect.top + window.scrollY - padding / 2;
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

  private onResize = (): void => {
    if (!this.activeMarker) return;
    const rect = this.activeMarker.getBoundingClientRect();
    this.setPopupPosition(rect);
  };

  private bindEvents(): void {
    window.addEventListener("resize", this.onResize);
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(this.selectors.marker) === null) {
        this.hidePopup();
      }
    });
  }
}
