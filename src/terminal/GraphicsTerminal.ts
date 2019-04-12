import { CharacterSet } from '../characterset/CharacterSet';
import { Terminal } from './Terminal';
import { TerminalCellData } from './TerminalCellData';
import { TerminalCellDOM } from './TerminalCellDOM';
import { TerminalConfig } from './TerminalConfig';

/**
 * Graphical Terminal for text art rendering.
 */ // TODO
export class GraphicsTerminal extends Terminal {

  /**
   * Cell data for this instance of GraphicsTerminal. see [[TerminalCellData]]
   */
  protected cellData: TerminalCellData;

  // TODO doc // TODO test
  protected charSet: CharacterSet;

  /**
   * @param config [[TerminalConfig]]
   */
  constructor(config: TerminalConfig = {} as TerminalConfig, charSet: CharacterSet) {
    if (!config.graphics) {
      config.graphics = {};
    }
    if (!config.graphics.width) {
      config.graphics.width = 80;
    }
    if (!config.graphics.height) {
      config.graphics.height = 25;
    }

    if (config.container) {
      config.domOverride = new TerminalCellDOM(
        config.graphics.width,
        config.graphics.height,
        config.container,
      );
    } else {
      config.domOverride = new TerminalCellDOM(
        config.graphics.width,
        config.graphics.height,
      );
    }

    super(config);

    this.cellData = new TerminalCellData(config.graphics.width, config.graphics.height);
    this.charSet = charSet;
  }

  // TODO docs // TODO test
  public update(): void {
    //if (this.terminalDOM instanceof TerminalCellDOM) { // TODO change after refactor in Terminal
      const temp: TerminalCellDOM = <TerminalCellDOM> this.terminalDOM;
      for (let i: number = 0; i < this.cellData.data.length; i++) {
        if (this.cellData.changed[i]) {
          //temp.setCellValueByIndex(this.charSet.toString(this.cellData.data[i]), i);
          temp.setCellValueByIndex('A', i);
        }
      }
      this.terminalDOM = temp;
    //}
  }

}