export default class Map {
  private readonly selectors: Record<string, string> = {
    root: ".map",
    map: ".map-svg",
    marker: ".map-marker",
    popup: ".map-popup",
  };
  private rootElement: HTMLElement | null;
  private mapElement: HTMLElement | null = null;
  private popupElement!: HTMLElement;
  private markers: Marker[] = [];
  private activeMarker: SVGElement | null = null;

  constructor(markers: Marker[]) {
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.mapElement = this.rootElement?.querySelector(this.selectors.map) as HTMLElement;
    this.popupElement = this.rootElement?.querySelector(this.selectors.popup) as HTMLElement;
    this.markers = markers;

    this.initMap();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.mapElement;
  }

  private initMap(): void {
    if (!this.isReady()) return;

    this.createPopup();
    this.renderMarkers();
    this.bindEvents();
  }

  private createPopup(): void {
    this.popupElement = document.createElement("div");
    this.popupElement.classList.add(this.selectors.popup.replace(".", ""));
    document.body.appendChild(this.popupElement);
  }

  private renderMarkers(): void {
    this.markers.forEach((markerData: Marker) => {
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "image");
      marker.setAttributeNS(null, "href", markerData.imageSrc);
      marker.setAttribute("x", (markerData.x - 12).toString());
      marker.setAttribute("y", (markerData.y - 12).toString());
      marker.setAttribute("width", "24");
      marker.setAttribute("height", "24");
      marker.style.cursor = "pointer";
      marker.classList.add(this.selectors.marker.replace(".", ""));
      this.mapElement?.appendChild(marker);

      marker.addEventListener("click", (): void => {
        this.showPopup(marker, markerData.content);
      });
    });
  }

  private showPopup(marker: SVGElement, content: string): void {
    console.log(content);
    this.popupElement.style.display = "block";
    this.popupElement.innerHTML = content;
    this.activeMarker = marker;
    const rect = marker.getBoundingClientRect();
    this.setPopupPosition(rect);
  }

  private hidePopup(): void {
    this.popupElement.innerHTML = "";
    this.activeMarker = null;
  }

  private setPopupPosition(rect: DOMRect): void {
    const width = this.popupElement.offsetWidth;
    const top = rect.top + window.scrollY + rect.height + 10;
    let left = rect.left + rect.width / 2 - width / 2;

    left = Math.min(left, window.innerWidth - width - 20); // Prevents the popup from going off the right side of the screen
    left = Math.max(left, 20); // Prevents the popup from going off the left side of the screen

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
