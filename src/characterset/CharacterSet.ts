/**
 * For creating, loading, and saving terminal character sets.
 * 
 * ## string based constructor
 * 
 * String of characters that will be converted to a set. No separator characters.
 * 
 * ```ts
 * const example: CharacterSet = new CharacterSet(' .:-=+*#%@');
 * ```
 * 
 * ## number[] based constructor
 * 
 * Use a set that has already been converted to UTF-16.
 * 
 * ```ts
 * const example: CharacterSet = new CharacterSet([32, 46, 58, 45, 61, 43, 42, 35, 37, 64]);
 * ```
 * 
 * ## Unknown Characters
 * 
 * Characters which are not in the [[set]] will be displayed using the [[unknown]] character code.
 * By default this is '�' or the [unicode replacement character](https://en.wikipedia.org/wiki/Specials_(Unicode_block)#Replacement_character).
 * Be advised that the replacement character doesn't always displayed with the correct spacing for a monospaced font and can lead to undesirable results.
 * If you intend to use this functionality then you can set the value of [[unknown]] manually or using the [[constructor]].
 * 
 * Notes:
 * - In some cases order matters, so keep that in mind.
 * - You must include a space (32 in UTF-16) in the constructor for it to be included in the set.
 * 
 */ // TODO add see to set used in example // TODO fix problem with <,>,&,&nbsp;
export class CharacterSet {

  /**
   * A set of characters stored as UTF-16 numbers.
   */
  public set: number[];

  /**
   * A number representing the UTF-16 code of the character to use if not in set.
   */
  public unknown: number;

  /**
   * @param characters 
   * @param unknown
   */
  constructor(characters?: string, unknown?: string | number)
  /**
   * @param set
   * @param unknown
   */
  constructor(set?: number[], unknown?: string | number)
  constructor(argument: string | number[] = CharacterSet.getDefaultCharacterSet(), unknown?: string | number) {

    if (typeof argument === 'string') {
      const set: number[] = [];
      for (let i: number = 0; i < argument.length; i++) {
        const code: number = argument.charCodeAt(i);
        if (set.indexOf(code) === -1) {
          set.push(code);
        }
      }
      this.set = set;
    } else {
      // TODO consider adding some checks
      this.set = argument;
    }

    if (!unknown) {
      this.unknown = '�'.charCodeAt(0);
    } else {
      if (typeof unknown === 'string') {
        this.unknown = unknown.charCodeAt(0);
      } else {
        this.unknown = unknown;
      }
    }

  }

  /**
   * @returns ' ' and '█' in UTF-16 form.
   */
  public static getDefaultCharacterSet(): number[] {
    return [32, 9608];
  }

  /**
   * Get index in set based on character. -1 if not in set.
   * 
   * @param character 
   * @returns index or -1
   */
  public getIndex(character: string): number {
    return this.set.indexOf(character.charCodeAt(0));
  }

  /**
   * Will return unknown code if index is out of bounds.
   * 
   * @param index 
   * @return UTF-16 code at index
   */
  public getValue(index: number): number {
    if (index >= 0 && index < this.set.length) {
      return this.set[index];
    }
    return this.unknown;
  }

  /**
   * @returns length of [[set]]
   */
  public size(): number {
    return this.set.length;
  }

  /**
   * Like [[getValue]] just the code is converted into a string.
   * 
   * @param index 
   */
  public toString(index: number): string {
    return String.fromCharCode(this.getValue(index));
  }

}