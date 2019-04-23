import { CharacterSet } from '../characterset/CharacterSet';
import { TerminalDOM } from './TerminalDOM';

/**
 * Contains framework between the CommandTerminal and GraphicsTerminal.
 */
export abstract class Terminal {

  /**
   * [[TerminalDOM]] associated with this Terminal.
   */
  protected domController: TerminalDOM;

  constructor(domController: TerminalDOM) {
    this.domController = domController;
  }

}