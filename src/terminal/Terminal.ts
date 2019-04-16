import { CharacterSet } from '../characterset/CharacterSet';
import { TerminalDOM } from './TerminalDOM';

/**
 * Contains framework between the CommandTerminal and GraphicsTerminal.
 */
export abstract class Terminal {

  /**
   * [[CharacterSet]] associated with this Terminal.
   */
  protected characterSet: CharacterSet;

  /**
   * [[TerminalDOM]] associated with this Terminal.
   */
  protected domController: TerminalDOM;

  constructor(domController: TerminalDOM, characterSet: CharacterSet) {
    this.domController = domController;
    this.characterSet = characterSet;
  }

  /**
   * @returns [[characterSet]]
   */
  public getCharacterSet(): CharacterSet {
    return this.characterSet;
  }

}