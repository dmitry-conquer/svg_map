export default class Map {
  private readonly selectors: Record<string, string> = {
    wrapper: ".wrapper",
    root: ".map",
    map: ".map-svg",
    marker: ".map-marker",
    popup: ".map-popup",
    area: ".map-area",
  };
  private wrapper: HTMLElement | null = null;
  private rootElement: HTMLElement | null;
  private mapElement: HTMLElement | null = null;
  private popupElement!: HTMLElement;
  private markersData: MarkerData[] = [];
  private activeMarker: SVGElement | null = null;

  constructor(markersData: MarkerData[]) {
    this.wrapper = document.querySelector(this.selectors.wrapper) as HTMLElement;
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.mapElement = this.rootElement?.querySelector(this.selectors.map) as HTMLElement;
    this.popupElement = this.rootElement?.querySelector(this.selectors.popup) as HTMLElement;
    this.markersData = markersData;
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

  private showPopup(target: SVGElement, content: string, position: string): void {
    this.popupElement.innerHTML = content;
    this.popupElement.style.display = "block";
    const rect = target.getBoundingClientRect();
    console.log(rect);
    this.setPopupPosition(rect, position as "left" | "center");
  }

  private hidePopup(): void {
    this.popupElement.style.display = "none";
    this.popupElement.innerHTML = "";
    this.activeMarker = null;
  }

  private setPopupPosition(rect: DOMRect, position: "left" | "center"): void {
    const { offsetWidth: width } = this.popupElement;
    const padding = 20;

    const positionsMap = {
      left: () => {
        const top = rect.top + window.scrollY - padding / 2;
        let left = rect.left + rect.width + padding;
        if (left + width > window.innerWidth - padding) {
          left = rect.left - width - padding;
          this.popupElement.classList.add("move-left");
        } else {
          this.popupElement.classList.remove("move-left");
        }
        left = Math.max(left, padding);
        return { top, left };
      },
      center: () => {
        const top = rect.top + window.scrollY + rect.height / 2 - padding / 2;
        const left = rect.left + rect.width / 2;
        return { top, left };
      },
    };

    // Виклик функції для обраної позиції
    const { top, left } = positionsMap[position]();
    this.popupElement.style.left = `${left}px`;
    this.popupElement.style.top = `${top}px`;
  }

  private onResize = (): void => {
    if (!this.activeMarker) return;
    const rect = this.activeMarker.getBoundingClientRect();
    this.setPopupPosition(rect, "left");
  };

  private bindEvents(): void {
    window.addEventListener("resize", this.onResize);
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement | SVGElement;
      const markerEl = target.closest(this.selectors.marker);
      const areaEl = target.closest(this.selectors.area);

      if (!markerEl && !areaEl) {
        this.hidePopup();
        return;
      }

      if (markerEl) {
        const markerId = target.getAttribute("data-marker-id");
        const markerData = this.markersData.find((marker: MarkerData) => marker.id?.toString() === markerId);
        if (!markerData) return;
        this.activeMarker = target as SVGElement;
        this.showPopup(target as SVGElement, markerData.content, "left");
      }

      if (areaEl) {
        const id = target.dataset.areaButton;
        const info = target.nextElementSibling?.innerHTML;
        const path = this.mapElement?.querySelector(`path[data-area="${id}"]`);
        if (!path || !info) return;
        this.showPopup(path as SVGElement, info, "center");
      }
    });
  }
}
