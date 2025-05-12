class Accordion {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-accordion]",
    button: "[data-js-accordion-button]",
    content: "[data-js-accordion-content]",
  };
  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };
  private readonly stateAttributes: Record<string, string> = {
    ariaExpanded: "aria-expanded",
    ariaSelected: "aria-selected",
  };
  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private state: TypeAccordioState;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.state = this.getProxyState({
      activeAccordionIndex: [...this.buttonElements].findIndex(buttonElement =>
        buttonElement.classList.contains(this.stateClasses.isActive)
      ),
    });

    this.init();
  }

  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.buttonElements.length;
  }

  private bindEvents(): void {
    this.buttonElements.forEach((buttonElement, index: number) => {
      buttonElement?.addEventListener("click", () => this.onButtonClick(index));
    });
  }

  private getProxyState(state: TypeAccordioState) {
    return new Proxy(state, {
      get: (target: TypeAccordioState, prop: keyof TypeAccordioState) => {
        return target[prop];
      },
      set: (target: TypeAccordioState, prop: keyof TypeAccordioState, value: number) => {
        target[prop] = value;
        this.updateUI();

        return true;
      },
    });
  }

  private updateUI() {
    const { activeAccordionIndex } = this.state;
    this.buttonElements.forEach((buttonElement: HTMLElement, index: number) => {
      const isActive = activeAccordionIndex === index;
      const content = buttonElement.nextElementSibling as HTMLElement;

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isActive.toString());
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      content.style.maxHeight = isActive ? `${content.scrollHeight}px` : "";
    });
  }

  private onButtonClick(index: number) {
    this.state.activeAccordionIndex = this.state.activeAccordionIndex === index ? -1 : index;
  }

  public open(index: number): void {
    this.state.activeAccordionIndex = index;
  }
}

export default Accordion;
