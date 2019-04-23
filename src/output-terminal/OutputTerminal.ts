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