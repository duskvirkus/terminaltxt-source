import { Terminal } from './Terminal';
// import { TerminalClient } from './TerminalClient';
import { TerminalConfig } from './TerminalConfig';
import { TerminalLineDOM } from './TerminalLineDOM';

/**
 * Terminal for taking in Text input commands from user.
 */
export class CommandTerminal extends Terminal {

  protected height: number;

  protected width: number;

  constructor(config: TerminalConfig = {} as TerminalConfig,) {
    if (!config.width) {
      config.width = 80;
    }
    if (!config.height) {
      config.height = 25;
    }

    if (config.container) {
      super(
          new TerminalLineDOM(
          config.height,
          config.container,
        ),
      );
    } else {
      super(
          new TerminalLineDOM(
          config.height,
        ),
      );
    }

    this.width = config.width;
    this.height = config.height;
  }

}