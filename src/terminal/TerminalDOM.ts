/**
 * Keeps track of Terminal's DOM elements and is used for updating them.
 */ // TODO
export class TerminalDOM {
  
  /**
   * Code / Monospace, should be the direct child of the pre tag.
   */
  public code: HTMLElement;

  /**
   * The main DOM wrapper for all DOM elements.
   * Nothing from the terminal should be outside of this element.
   */
  public container: HTMLDivElement;

  /**
   * Span that contains the final display text of the terminal.
   */
  public display: HTMLSpanElement;

  /**
   * Preformatted Text, should be the direct child of the container.
   */
  public pre: HTMLPreElement;

  /**
   * @param container
   */
  constructor(container: HTMLDivElement) {
    this.container = container;
    this.pre = document.createElement('pre');
    this.code = document.createElement('code');
    this.display = document.createElement('span');

    this.container.appendChild(this.pre);
    this.pre.appendChild(this.code);
    this.code.appendChild(this.display);
  }

  /**
   * Creates an empty container div and appends it to the body.
   * 
   * @returns created container
   */
  public static defaultContainer(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }

  /**
   * Clears text and children from inside display span.
   */
  public clear(): void {
    this.display.innerHTML = '';
  }

}