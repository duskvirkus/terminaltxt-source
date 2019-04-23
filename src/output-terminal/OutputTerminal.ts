import { TerminalConfig } from '../config/TerminalConfig';
import { DOMLineController } from '../dom-controller/DOMLineController';

/**
 * Terminal for taking in Text input commands from user.
 */
export class OutputTerminal {

  protected height: number;

  protected lineController: DOMLineController;

  protected width: number;

  constructor(config: TerminalConfig = {} as TerminalConfig) {
    config.width ? this.width = config.width : this.width = 80;
    config.height ? this.height = config.height : this.height = 25;
    if (config.container) {
      this.lineController = new DOMLineController(this.height, config.container);
    } else {
      this.lineController = new DOMLineController(this.height);
    }
  }

}