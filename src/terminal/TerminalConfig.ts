import { TerminalDOM } from "./TerminalDOM";

/**
 * Interface for config objects passed to terminal class.
 */
export interface TerminalConfig {

  /**
   * Div container for [[TerminalDOM]].
   */
  container?: HTMLDivElement,

  /**
   * Height of terminal created. May not be used depending on which flavor of terminal you are using.
   */
  height?: number,

  /**
   * Width of terminal created. May not be used depending on which flavor of terminal you are using.
   */
  width?: number,

}