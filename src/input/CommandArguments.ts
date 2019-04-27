/**
 * Command Arguments input by user. The argument followed by parameters.
 * 
 * Example:
 * ```
 * $ help --lookup command-name
 * ```
 * results in
 * ```
 * {
 *   argument: 'lookup',
 *   parameters: ['command-name']
 * }
 * ```
 */
export interface CommandArguments {

  /**
   * Argument for the command.
   */
  argument: string,

  /**
   * Other parameters for that argument.
   */
  parameters?: string[],

}