import { TerminalConfig } from './TerminalConfig';
import { TerminalDOM } from './TerminalDOM';

/**
 * Contains the shared framework between the CommandTerminal and GraphicsTerminal.
 */ // TODO
export abstract class Terminal {

  public terminalDOM: TerminalDOM; // TODO refactor

  /**
   * @param config see [[TerminalConfig]]
   */
  constructor(config: TerminalConfig) {
    if (config.domOverride) {
      this.terminalDOM = config.domOverride;
    } else if (config.container) {
      this.terminalDOM = new TerminalDOM(config.container);
    } else {
      this.terminalDOM = new TerminalDOM();
    }
  }

}