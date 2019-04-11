import { Terminal } from './Terminal';
import { TerminalCellData } from './TerminalCellData';
import { TerminalCellDOM } from './TerminalCellDOM';
import { TerminalConfig } from './TerminalConfig';

/**
 * Graphical Terminal for text art rendering.
 */ // TODO
export class GraphicsTerminal extends Terminal {

  protected cellData: TerminalCellData;

  constructor(config: TerminalConfig = {} as TerminalConfig) {
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
  }

}