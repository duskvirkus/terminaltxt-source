import { CharacterSet } from '../characterset/CharacterSet';
import { Terminal } from './Terminal';
import { TerminalCellData } from './TerminalCellData';
import { TerminalCellDOM } from './TerminalCellDOM';
import { TerminalConfig } from './TerminalConfig';

/**
 * Graphical Terminal for text art rendering.
 */
export class GraphicsTerminal extends Terminal {

  /**
   * Cell data for this instance of GraphicsTerminal. see [[TerminalCellData]]
   */
  protected cellData: TerminalCellData;

  /**
   * @param config [[TerminalConfig]]
   */
  constructor(config: TerminalConfig = {} as TerminalConfig, characterSet: CharacterSet = new CharacterSet()) {
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
      super(
          new TerminalCellDOM(
          config.graphics.width,
          config.graphics.height,
          config.container,
        ),
        characterSet
      );
    } else {
      super(
          new TerminalCellDOM(
          config.graphics.width,
          config.graphics.height,
        ),
        characterSet
      );
    }

    this.cellData = new TerminalCellData(config.graphics.width, config.graphics.height);
  }

  // TODO test
  /**
   * Will update dom graphics based on [[TerminalCellData]].
   */
  public update(): void {
    const cellController: TerminalCellDOM = <TerminalCellDOM> this.domController;
    for (let i: number = 0; i < this.cellData.numberOfCells(); i++) {
      if (this.cellData.hasBeenChanged(i)) {
        cellController.setCellValue(String.fromCharCode(this.cellData.getCell(i)), i);
        this.cellData.doneChange(i);
      }
    }
  }

}