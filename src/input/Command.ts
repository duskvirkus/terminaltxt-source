import { OutputTerminal } from '../output-terminal/OutputTerminal';
import { CommandArguments } from './CommandArguments';

/**
 * Function type define for command in [[Command]].
 */
export type CommandFunction = (output: OutputTerminal, args: CommandArguments[]) => number;

/**
 * Structure for commands used with [[CommandTracker]].
 */
export interface Command {

  /**
   * Function to be executed when command is invoked.
   */
  command: CommandFunction;

  /**
   * Description of command for that is displayed in help.
   */
  description: string,

  /**
   * Exit Codes associated with the command.
   */
  exitCodes?: [{

    /**
     * Code for the exit code.
     */
    code: number,

    /**
     * Description of what the exit code means.
     */
    description: string,

  }],

  /**
   * Name of the command. Should not contain spaces.
   */
  name: string,

  /**
   * Options for arguments. See [[CommandArguments]].
   */
  options?: [{

    /**
     * Argument for the given command.
     */
    argument: string,

    /**
     * Description of what that argument does.
     */
    description: string,

  }],

}