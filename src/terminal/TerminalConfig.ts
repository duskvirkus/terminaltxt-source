/**
 * Interface for config objects passed to terminal class.
 */
export interface TerminalConfig {

  container?: HTMLDivElement,

  graphics?: {
    height?: number,
    width?: number,
  },

}