import { CharacterSet } from '../characterset/CharacterSet';
import { Terminal } from './Terminal';
import { TerminalCellData } from './TerminalCellData';
import { TerminalCellDOM } from './TerminalCellDOM';
import { TerminalConfig } from './TerminalConfig';

/**
 * Graphical Terminal for text art rendering.
 */
export class GraphicsTerminal extends Terminal {

  /**
   * Cell data for this instance of GraphicsTerminal. see [[TerminalCellData]]
   */
  protected cellData: TerminalCellData;
  
  /**
   * Height of graphics terminal.
   */
  protected height: number;

  /**
   * Width of graphics terminal.
   */
  protected width: number;

  /**
   * @param config [[TerminalConfig]]
   */
  constructor(config: TerminalConfig = {} as TerminalConfig, characterSet: CharacterSet = new CharacterSet()) {
    if (!config.graphics) {
      config.graphics = {};
    }
    if (!config.graphics.width) {
      config.graphics.width = 80;
    }
    if (!config.graphics.height) {
      config.graphics.height = 25;
    }

    if (config.container) {
      super(
          new TerminalCellDOM(
          config.graphics.width,
          config.graphics.height,
          config.container,
        ),
        characterSet
      );
    } else {
      super(
          new TerminalCellDOM(
          config.graphics.width,
          config.graphics.height,
        ),
        characterSet
      );
    }

    this.width = config.graphics.width;
    this.height = config.graphics.height;
    this.cellData = new TerminalCellData(config.graphics.width, config.graphics.height);
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
   * Set cell with character string containing a character. If string has multiple characters only the first one will be used.
   * 
   * @param character 
   * @param column 
   * @param row 
   */
  public setCell(character: string, column: number, row: number): void
  /**
   * Set cell with index into [[CharacterSet]].
   * 
   * @param index 
   * @param column 
   * @param row 
   */
  public setCell(index: number, column: number, row: number): void
  public setCell(value: string | number, column: number, row: number): void {
    let setValue: number;
    if (typeof value === 'string') {
      setValue = this.characterSet.getIndex(value);
    } else {
      if (value >= 0 && value < this.characterSet.set.length) {
        setValue = value;
      } else {
        setValue = -1;
      }
    }
    this.cellData.setCell(setValue, this.cellData.index(column, row));
  }

  /**
   * Will update dom graphics based on [[TerminalCellData]].
   */
  public update(): void {
    for (let i: number = 0; i < this.cellData.numberOfCells(); i++) {
      if (this.cellData.hasBeenChanged(i)) {
        (this.domController as TerminalCellDOM).setCellValue(this.characterSet.toString(this.cellData.getCell(i)), i);
        this.cellData.doneChange(i);
      }
    }
  }

}