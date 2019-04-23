/**
 * Keeps track of Terminal's DOM elements and is used for updating them.
 */
export class DOMController {
  
  /**
   * Keeps track of number of ids that have been created.
   */
  public static idCounter: number = 0;

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
   * ID number for this instance of the TerminalDOM.
   */
  public idNumber: number;

  /**
   * Preformatted Text, should be the direct child of the container.
   */
  public pre: HTMLPreElement;

  /**
   * @param container
   */
  constructor(container: HTMLDivElement = DOMController.defaultContainer()) {
    this.container = container;
    this.pre = document.createElement('pre');
    this.code = document.createElement('code');
    this.display = document.createElement('span');
    this.idNumber = DOMController.getID();

    this.container.appendChild(this.pre);
    this.pre.appendChild(this.code);
    this.code.appendChild(this.display);

    this.setIDs();
    this.setClasses();
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
   * Get an incremented id number for new TerminalDOM.
   * 
   * @returns new idNumber
   */
  public static getID(): number {
    const id: number = DOMController.idCounter;
    DOMController.idCounter++;
    return id;
  }

  /**
   * Clears text and children from inside display span.
   */
  public clear(): void {
    this.display.innerHTML = '';
  }

  /**
   * Adds HTML classes to DOM elements in TerminalDOM.
   */
  protected setClasses(): void {
    this.container.classList.add('termtxt-container');
    this.pre.classList.add('termtxt-pre');
    this.code.classList.add('termtxt-code');
    this.display.classList.add('termtxt-display');
  }

  /**
   * Uses idNumber property to set HTML id traits for each of the DOM elements.
   */
  protected setIDs(): void {
    let idString: string; 
    this.idNumber === 0 ? idString = '' : idString = '-' + this.idNumber.toString();

    this.container.id = 'termtxt-container' + idString;
    this.pre.id = 'termtxt-pre' + idString;
    this.code.id = 'termtxt-code' + idString;
    this.display.id = 'termtxt-display' + idString;
  }

}