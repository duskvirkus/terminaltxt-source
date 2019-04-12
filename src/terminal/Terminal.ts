import { CharacterSet } from '../characterset/CharacterSet';
import { TerminalDOM } from './TerminalDOM';

/**
 * Contains framework between the CommandTerminal and GraphicsTerminal.
 */
export abstract class Terminal {

  protected characterSet: CharacterSet;

  // TODO docs

  protected domController: TerminalDOM;

  constructor(domController: TerminalDOM, characterSet: CharacterSet) {
    this.domController = domController;
    this.characterSet = characterSet;
  }

}