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
   * Configuration specific to [[GraphicsTerminal]].
   */
  graphics?: {
    /**
     * Height of [[GraphicsTerminal]].
     */
    height?: number,
    /**
     * Width of [[GraphicsTerminal]].
     */
    width?: number,
  },

}