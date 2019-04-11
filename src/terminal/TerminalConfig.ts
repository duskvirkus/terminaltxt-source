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
   * Internal override for TerminalDOM element in [[Terminal]].
   */
  domOverride?: TerminalDOM,

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