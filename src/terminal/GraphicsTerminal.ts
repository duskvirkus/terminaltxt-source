import { CharacterSet } from '../characterset/CharacterSet';
import { TerminalCellData } from './TerminalCellData';
import { TerminalCellDOM } from './TerminalCellDOM';
import { TerminalConfig } from './TerminalConfig';

/**
 * Graphical Terminal for text art rendering.
 */ // TODO
export class GraphicsTerminal {

  /**
   * Cell data for this instance of GraphicsTerminal. see [[TerminalCellData]]
   */
  protected cellData: TerminalCellData;

  // TODO doc // TODO test
  protected charSet: CharacterSet;

  public cellDOM: TerminalCellDOM;

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
      this.cellDOM = new TerminalCellDOM(
        config.graphics.width,
        config.graphics.height,
        config.container,
      );
    } else {
      this.cellDOM = new TerminalCellDOM(
        config.graphics.width,
        config.graphics.height,
      );
    }

    this.cellData = new TerminalCellData(config.graphics.width, config.graphics.height);
    this.charSet = charSet;
  }

  // TODO docs // TODO test
  public update(): void {
    for (let i: number = 0; i < this.cellData.data.length; i++) {
      if (this.cellData.changed[i]) {
        //temp.setCellValueByIndex(this.charSet.toString(this.cellData.data[i]), i);
        //this.cellDOM.setCellValueByIndex('A', i);
      }
      //this.cellDOM.clear();
      this.cellDOM.cells[i].innerHTML = String.fromCharCode(Math.random() * 32 + 65);
    }
  }

}