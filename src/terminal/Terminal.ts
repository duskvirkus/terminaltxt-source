import { TerminalConfig } from './TerminalConfig';
import { TerminalDOM } from './TerminalDOM';

/**
 * Contains the shared framework between the CommandTerminal and GraphicsTerminal.
 */ // TODO
export abstract class Terminal {

  public terminalDOM: TerminalDOM;

  /**
   * @param config see [[TerminalConfig]]
   */
  constructor(config: TerminalConfig) {
    if (!config.container) {
      config.container = TerminalDOM.defaultContainer();
    }

    this.terminalDOM = new TerminalDOM(config.container);
  }

}