import { TerminalConfig } from '../config/TerminalConfig';
import { DOMLineController } from '../dom-controller/DOMLineController';

/**
 * Terminal for taking in Text input commands from user.
 * 
 * Notes:
 * - If config.height is passed -1 no cropping will happen.
 */
export class OutputTerminal {

  /**
   * Height of OutputTerminal.
   */
  protected height: number;

  /**
   * [[DOMLineControl]] for this OutputTerminal.
   */
  protected lineController: DOMLineController;

  /**
   * Record of the number of lines to check for [[overwrite]].
   */
  protected linesToCheck: number = 0;

  /**
   * Width of OutputTerminal. -1 is unrestricted width.
   */
  protected width: number;

  /**
   * @param config 
   * @param initialText The first line displayed, won't work if larger than width.
   */
  constructor(config: TerminalConfig = {} as TerminalConfig, initialText: string = '') {
    config.width ? this.width = config.width : this.width = 80;
    config.height ? this.height = config.height : this.height = 25;
    if (config.container) {
      this.lineController = new DOMLineController(this.height, config.container);
    } else {
      this.lineController = new DOMLineController(this.height);
    }
    if (initialText.length > this.getWidth()) {
      initialText = ''
    }
    this.lineController.setCurrentLine(initialText);
  }

  /**
   * @returns [[height]]
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * @returns [[width]]
   */
  public getWidth(): number {
    if (this.width < 0) {
      return Number.MAX_VALUE;
    }
    return this.width;
  }

  /**
   * Adds a line break. Helpful when using [[write]].
   */
  public newLine(): void {
    this.lineController.addLine();
  }

  /**
   * Will overwrite last text if the first character matches. Otherwise it will [[writeln]]. Is marginally slower than [[writeln]].
   * 
   * @param text 
   */
  public overwrite(text: string): void {
    let lineCheck: number;
    Math.ceil(text.length / this.getWidth()) > this.linesToCheck ? lineCheck = Math.ceil(text.length / this.getWidth()) : lineCheck = this.linesToCheck;
    for (let i: number = 0; i <= lineCheck; i++) {
      const index: number = this.lineController.lines.length - (i + 1);
      if (index >= 0
        && index < this.lineController.lines.length
        && this.lineController.lines[index].innerHTML.substring(0, 1) === text.substring(0, 1)) {
        const chunks: RegExpMatchArray | null = text.match(new RegExp('.{1,' + this.getWidth() + '}', 'g'));
        if (chunks !== null) {
          for (let j: number = 0; j < chunks.length; j++) {
            if (index + j < this.lineController.lines.length) {
              this.lineController.lines[index + j].innerHTML = chunks[j];
            } else {
              this.writeln(chunks[j]);
            }
          }
          for (let j: number = chunks.length; j <= i; j++) { // will only run if current text is takes up more lines than last text
            if (index + j < this.lineController.lines.length) {
              this.lineController.lines[index + j].innerHTML = '';
            }
          }
          this.linesToCheck = chunks.length + 1;
          return;
        }
      }
    }
    if (this.lineController.lines.length === 1
      && this.lineController.lines[0].innerHTML === '') {
      this.write(text);
    } else {
      this.writeln(text);
    }
  }

  /**
   * Resets [[linesToCheck]] to 0.
   */
  public resetLinesToCheck(): void {
    this.linesToCheck = 0;
  }

  /**
   * Writes to current line on output terminal if space. If there is not enough space on the current line it will roll over to the next.
   * 
   * @param text 
   */
  public write(text: string): void {
    const lastLineLength: number = this.lineController.lines[this.lineController.lines.length - 1].innerHTML.length;
    if (lastLineLength + text.length <= this.getWidth()) {
      this.lineController.appendCurrentLine(text);
    } else if (lastLineLength === this.getWidth()) {
      this.lineController.addLine(text);
    } else {
      this.lineController.appendCurrentLine(text.substring(0, this.getWidth() - lastLineLength));
      this.writeln(text.substring(this.getWidth() - lastLineLength, text.length))
    }
  }

  /**
   * Will write a line to the OutputTerminal.
   * 
   * @param text 
   */
  public writeln(text: string): void {
    if (text.length <= this.getWidth()) {
      this.lineController.addLine(text);
    } else {
      const chunks: RegExpMatchArray | null = text.match(new RegExp('.{1,' + this.getWidth() + '}', 'g'));
      if (chunks !== null) {
        for (let i: number = 0; i < chunks.length; i++) {
          this.lineController.addLine(chunks[i]);
        }
      }
    }
  }

}