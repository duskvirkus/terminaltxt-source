/**
 * Keeps track of Terminal's DOM elements and is used for updating them.
 */ // TODO
export class TerminalDOM {

  /**
   * The main DOM wrapper for all DOM elements.
   * Nothing from the terminal should be outside of this element.
   */
  public container: HTMLDivElement;

  /**
   * Preformatted Text, should be the direct child of the container.
   */
  public pre: HTMLPreElement;
  /**
   * Code / Monospace, should be the direct child of the pre tag.
   */
  public code: HTMLElement;

  /**
   * Span that contains the final display text of the terminal.
   */
  public display: HTMLSpanElement;

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
   * Adds text to innerHTML of display.
   * 
   * @param txt 
   */
  protected addInnerTxt(txt: string): void {
    const txtArray: string[] = [];
    txtArray.push(txt);
    this.addInnerMultiTxt(txtArray);
  }

  /**
   * Adds multiple strings of text to innerHTML of display.
   * 
   * @param txtArray 
   */
  protected addInnerMultiTxt(txtArray: string[]): void {
    for (let i: number = 0; i < txtArray.length; i++) {
      this.display.innerHTML += (txtArray[i]);
    }
  }

  /**
   * Clears and then sets the innerHTML of display to text.
   * 
   * @param txt 
   */
  protected setInnerTxt(txt: string): void {
    const txtArray: string[] = [];
    txtArray.push(txt);
    this.setInnerMultiTxt(txtArray);
  }

  /**
   * Clears and then sets the innerHTML of display to multiple strings of text.
   * 
   * @param txtArray 
   */
  protected setInnerMultiTxt(txtArray: string[]): void {
    this.clearInnerTxt();
    this.addInnerMultiTxt(txtArray);
  }

  /**
   * Clears all text from innerHTML of display.
   */
  protected clearInnerTxt(): void {
    this.display.innerHTML = '';
  }

  /**
   * Appends child element to display.
   * 
   * @param element 
   */
  protected addChildElement(element: HTMLElement): void {
    const elements: HTMLElement[] = [];
    elements.push(element);
    this.addChildElements(elements);
  }

  /**
   * Appends multiple children to display.
   * 
   * @param elements 
   */
  protected addChildElements(elements: HTMLElement[]): void {
    for (let i: number = 0; i < elements.length; i++) {
      this.display.appendChild(elements[i]);
    }
  }

  /**
   * Clears all children elements from display and then appends a new child on.
   * 
   * @param element 
   */
  protected setChildElement(element: HTMLElement): void {
    const elements: HTMLElement[] = [];
    elements.push(element);
    this.setChildElements(elements);
  }

  protected setChildElements(elements: HTMLElement[]): void {
    this.clearChildElements();
    this.addChildElements(elements);
  }

  protected clearChildElements(): void {
    while(this.display.firstChild) {
      this.display.removeChild(this.display.firstChild);
    }
  }

}