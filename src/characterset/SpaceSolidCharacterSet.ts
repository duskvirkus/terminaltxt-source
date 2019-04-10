import { ICharacterSet } from './ICharacterSet';
import { Encoding } from './Encoding';

export class SpaceSolidCharacterSet implements ICharacterSet {

  /**
   * see [[ICharacterSet]]
   */
  public encoding: Encoding;

  /**
   * see [[ICharacterSet]]
   */
  public set: number[];

  /**
   * see [[ICharacterSet]]
   */
  public size: number;

  constructor() {
    this.encoding = Encoding.EXTENDED_ASCII;
    this.set = [];
    this.set.push(32);
    this.set.push(9608); // TODO consider changing
    this.size = this.set.length;
  }

}