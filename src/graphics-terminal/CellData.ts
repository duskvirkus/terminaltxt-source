import { Indexable } from "../utils";

/**
 * Used to keep track of the data behind a [[GraphicsTerminal]].
 */
export class CellData implements Indexable {

  /**
   * Array of booleans to keep track of what data has been changed since last update.
   */
  protected changed: boolean[] = [];

  /**
   * Array of numbers that map to a characters in a [[CharacterSet]]
   */
  protected data: number[] = [];

  /**
   * Height of data.
   */
  protected height: number;

  /**
   * Width of data.
   */
  protected width: number;

  /**
   * @param width 
   * @param height 
   */
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.initData();
    this.initChanged();
  }

  /**
   * Set changed to false based on index.
   * 
   * @param index 
   */
  public doneChange(index: number): void {
    this.changed[index] = false;
  }

  /**
   * Get the value of a single cell.
   * 
   * @param index 
   */
  public getCell(index: number): number {
    return this.data[index];
  }

  /**
   * @returns [[height]]
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * @returns [[width]]
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * See if single cell value has been changed.
   * 
   * @param index 
   */
  public hasBeenChanged(index: number): boolean {
    return this.changed[index];
  }

  /**
   * @returns number of cells in data
   */
  public numberOfCells(): number {
    return this.width * this.height;
  }

  /**
   * Set the value of a single cell.
   * 
   * @param value 
   * @param index 
   */
  public setCell(value: number, index: number): void {
    this.data[index] = value;
    this.changed[index] = true;
  }

  /**
   * Initializes changed with true.
   */
  protected initChanged(): void {
    this.changed = [];
    for (let i: number = 0; i < this.width * this.height; i++) {
      this.changed.push(true);
    }
  }

  /**
   * Will create a new array for data based on width and height, full of 0s.
   */
  protected initData(): void {
    this.data = [];
    for (let i: number = 0; i < this.width * this.height; i++) {
      this.data.push(0);
    }
  }

}