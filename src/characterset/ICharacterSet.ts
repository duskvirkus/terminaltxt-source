import { Encoding } from './Encoding';

/**
 * Defines a set of Characters to use within an encoding.
 */
export interface ICharacterSet {
  /**
   * Encoding for set.
   */
  encoding: Encoding;

  /**
   * Set allowed.
   */
  set: number[];

  /**
   * Number of characters in set.
   */
  size: number;
  
}