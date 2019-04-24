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
   * Width of OutputTerminal
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
    if (initialText.length > this.width) {
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
    return this.width;
  }

  /**
   * Adds a line break. Helpful when using [[write]].
   */
  public newLine(): void {
    this.lineController.addLine();
  }

  /**
   * Writes to current line on output terminal if space. If there is not enough space on the current line it will roll over to the next.
   * 
   * @param text 
   */
  public write(text: string): void {
    const lastLineLength: number = this.lineController.lines[this.lineController.lines.length - 1].innerHTML.length;
    if (lastLineLength + text.length <= this.width) {
      this.lineController.appendCurrentLine(text);
    } else if (lastLineLength === this.width) {
      this.lineController.addLine(text);
    } else {
      this.lineController.appendCurrentLine(text.substring(0, this.width - lastLineLength));
      this.writeln(text.substring(this.width - lastLineLength, text.length))
    }
  }

  /**
   * Will write a line to the OutputTerminal.
   * 
   * @param text 
   */
  public writeln(text: string): void {
    if (text.length <= this.width) {
      this.lineController.addLine(text);
    } else {
      const chunks: RegExpMatchArray | null = text.match(new RegExp('.{1,' + this.width + '}', 'g'));
      if (chunks !== null) {
        for (let i: number = 0; i < chunks.length; i++) {
          this.lineController.addLine(chunks[i]);
        }
      }
    }
  }

}