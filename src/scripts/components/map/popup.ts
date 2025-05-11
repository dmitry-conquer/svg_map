import { getClassName } from "../../helpers";

export default class Popup {
  private readonly selectors: Record<string, string> = {
    wrapper: ".wrapper",
    popup: ".map-popup",
  };
  private popupElement!: HTMLElement;
  private wrapper: HTMLElement | null = null;

  constructor() {
    this.wrapper = document.querySelector(this.selectors.wrapper) as HTMLElement;
  }

  private isReady(): boolean {
    return !!this.wrapper;
  }

  public create(): void {
    if (!this.isReady()) return;
    this.popupElement = document.createElement("div");
    this.popupElement.classList.add(getClassName(this.selectors.popup));
    this.wrapper?.appendChild(this.popupElement);
  }

  public show(target: SVGElement, content: string): void {
    this.popupElement.innerHTML = content;
    this.popupElement.style.display = "block";
    const rect = target.getBoundingClientRect();
    console.log(rect);
    this.setPosition(rect);
  }

  public hide(): void {
    this.popupElement.style.display = "none";
    this.popupElement.innerHTML = "";
  }

  public setPosition(rect: DOMRect): void {
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
}
