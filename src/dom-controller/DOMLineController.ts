import { DOMController } from './DOMController';

/**
 * Creates and has methods to update a Terminal DOM that contains lines.
 */
export class DOMLineController extends DOMController {

  /**
   * Span elements that hold the lines.
   */
  public lines: HTMLSpanElement[];

  /**
   * Maximum number of lines displayed, if -1 no cut off.
   */
  public maxLines: number;

  /**
   * @param maxLines defaults to -1
   * @param container 
   */
  constructor(maxLines: number = -1, container?: HTMLDivElement) {
    if (container) {
      super(container);
    } else {
      super();
    }

    this.maxLines = maxLines;

    this.lines = [];
    this.addLine();
    this.removeFirstChild(1);
  }

  /**
   * Adds a new line. If no text is specified it defaults to ''.
   * 
   * @param lineText 
   */
  public addLine(lineText: string = ''): void {
    this.display.appendChild(document.createTextNode('\n'));
    this.lines.push(document.createElement('span'));
    this.display.appendChild(this.lines[this.lines.length - 1]);
    this.setCurrentLine(lineText);
  }

  /**
   * Will append text to the current line.
   * 
   * @param lineText 
   */
  public appendCurrentLine(lineText: string): void {
    this.lines[this.lines.length - 1].innerHTML += lineText;
    this.checkForOverflow();
  }

  /**
   * Removes the first line from the DOM and [[lines]] array.
   */
  public removeFirstLine(): void {
    this.removeFirstChild(2);
    this.lines.shift();
  }

  /**
   * Will override the any text of the current line with the text passed to this.
   * 
   * @param lineText 
   */
  public setCurrentLine(lineText: string): void {
    this.lines[this.lines.length - 1].innerHTML = lineText;
    this.checkForOverflow();
  }

  /**
   * Checks to see if changes will result in an overflow.
   */
  protected checkForOverflow(): void {
    if (this.maxLines >= 0) {
      while (this.lines.length > this.maxLines) {
        this.removeFirstLine();
      }
    }
  }
  
  /**
   * Removes the first child of the [[display]] element.
   * @param toRemove 
   */
  protected removeFirstChild(toRemove: number): void {
    for (let i: number = 0; i < toRemove; i++) {
      this.display.removeChild(this.display.childNodes[0]);
    }
  }

}