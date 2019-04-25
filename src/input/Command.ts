import { OutputTerminal } from "../output-terminal/OutputTerminal";

export interface CommandArguments {
  argument: string,
  parameters?: string[],
}

export type CommandFunction = (output: OutputTerminal, args: CommandArguments[]) => number;

/**
 * Structure for commands used with [[CommandTracker]].
 */
export interface Command {

  /**
   * Name of the command. Should not contain spaces.
   */
  name: string,

  /**
   * Description of command for that is displayed in help.
   */
  description: string,

  /**
   * Function to be executed when command is invoked.
   */
  command: CommandFunction;

  options?: [{
    argument: string,
    description: string,
  }],

  exitCodes?: [{
    code: number,
    description: string,
  }],

}