import { TerminalDOM } from "./TerminalDOM";

export class TerminalCellDOM extends TerminalDOM {

  /**
   * Span elements that hold characters.
   */
  public cells: HTMLSpanElement[];

  /**
   * Height of instance.
   */
  public height: number;
  
  /**
   * Width of instance.
   */
  public width: number;

  /**
   * @param width 
   * @param height 
   * @param container 
   */
  constructor(width: number, height: number, container?: HTMLDivElement,) {
    if (container) {
      super(container);
    } else {
      super();
    }

    this.width = width;
    this.height = height;

    this.cells = [];
    this.initCells();
  }

  /**
   * Initializes cells as empty span elements with line breaks.
   */
  protected initCells(): void {
    for (let i: number = 0; i < this.height; i++) {
      for (let j: number = 0; j < this.width; j++) {
        const cell: HTMLSpanElement = document.createElement('span');
        this.cells.push(cell);
        this.display.appendChild(cell);
      }
      this.display.innerHTML += '\n';
    }
  }

}