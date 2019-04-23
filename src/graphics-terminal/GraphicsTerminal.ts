import { CharacterSet } from '../characterset/CharacterSet';
import { TerminalConfig } from '../config/TerminalConfig';
import { DOMCellController } from '../dom-controller/DOMCellController';
import { CellData } from './CellData';

/**
 * Graphical Terminal for text art rendering.
 */
export class GraphicsTerminal {

  /**
   * [[DOMCellController]] associated with this GraphicsTerminal.
   */
  protected cellController: DOMCellController;

  /**
   * Cell data for this instance of GraphicsTerminal. see [[TerminalCellData]]
   */
  protected cellData: CellData;

  /**
   * [[CharacterSet]] associated with this Terminal.
   */
  protected characterSet: CharacterSet;
  
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
    config.width ? this.width = config.width : this.width = 80;
    config.height ? this.height = config.height : this.height = 25;
    if (config.container) {
      this.cellController = new DOMCellController(this.width, this.height, config.container);
    } else {
      this.cellController = new DOMCellController(this.width, this.height);
    }

    this.cellData = new CellData(this.width, this.height);
    this.characterSet = characterSet;
  }

  /**
   * @returns [[characterSet]]
   */
  public getCharacterSet(): CharacterSet {
    return this.characterSet;
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
        this.cellController.setCellValue(this.characterSet.toString(this.cellData.getCell(i)), i);
        this.cellData.doneChange(i);
      }
    }
  }

}