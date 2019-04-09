/**
 * Text Encoding Types
 */
export enum Encoding {

  /**
   * ASCII or American Standard Code for Information Interchange.
   * Range 0: - 127
   */
  ASCII,

  /**
   * Extended ASCII
   * Range: 0 - 255
   */
  EXTENDED_ASCII, // TODO fix

  /**
   * Unicode
   * Range: 0 - 1,111,998
   */ // TODO check spec
  UNICODE,
}