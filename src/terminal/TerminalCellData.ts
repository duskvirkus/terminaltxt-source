/**
 * Used to keep track of the data behind a GraphicsTerminal
 */ // TODO
export class TerminalCellData {

  /**
   * Array of booleans to keep track of what data has been changed since last update.
   */
  public changed: boolean[] = [];

  /**
   * Array of numbers that map to a characters in a [[CharacterSet]]
   */
  public data: number[] = [];

  /**
   * Height of data.
   */
  public height: number;

  /**
   * Width of data.
   */
  public width: number;

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

  // TODO test
  /**
   * Initializes changed with true.
   */
  public initChanged(): void {
    this.changed = [];
    for (let i: number = 0; i < this.width * this.height; i++) {
      this.changed.push(true);
    }
  }

  /**
   * Will create a new array for data based on width and height, full of 0s.
   */
  public initData(): void {
    this.data = [];
    for (let i: number = 0; i < this.width * this.height; i++) {
      this.data.push(0);
    }
  }

}