import { DOMController } from "./DOMController";

/**
 * Creates and has methods to update a Terminal DOM that contains cells in a grid pattern.
 */
export class DOMCellController extends DOMController {

  /**
   * Span elements that hold characters.
   */
  public cells: HTMLSpanElement[];

  /**
   * Height of instance.
   */
  protected height: number;
  
  /**
   * Width of instance.
   */
  protected width: number;

  /**
   * @param width 
   * @param height 
   * @param container 
   */
  constructor(width: number, height: number, container?: HTMLDivElement) {
    if (container) {
      super(container);
    } else {
      super();
    }

    this.width = width;
    this.height = height;

    this.cells = [];
    this.initCells();
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
   * Get index of cell in cells array based on column and row values.
   * 
   * @param column 
   * @param row 
   * @returns index
   */
  public index(column: number, row: number): number {
    return column + row * this.width;
  }

  /**
   * Will set single cell innerHTML to a string based on cell index.
   * 
   * @param value 
   * @param index 
   */
  public setCellValue(value: string, index: number): void
  /** 
   * Will set single cell innerHTML to a string based on cell column and row.
   * 
   * @param value 
   * @param column 
   * @param row 
   */
  public setCellValue(value: string, column: number, row: number): void
  public setCellValue(value: string, indexOrColumn: number, row?: number): void {
    let index: number;
    if (row) {
      index = this.index(indexOrColumn, row);
    } else {
      index = indexOrColumn;
    }
    this.cells[index].innerHTML = value;
  }

  // TODO test
  /**
   * Set the color via css of a cell.
   * 
   * @param column 
   * @param row 
   * @param color 
   */
  public setColor(column: number, row: number, color: string): void {
    this.cells[this.index(column, row)].style.color = color;
  }

  /**
   * Initializes cells as empty span elements with line breaks.
   */
  protected initCells(): void {
    for (let i: number = 0; i < this.height; i++) {
      for (let j: number = 0; j < this.width; j++) {
        this.cells.push(document.createElement('span'));
        this.display.appendChild(this.cells[this.cells.length - 1]);
        this.cells[this.cells.length - 1].id = `${i}-${j}`;
      }
      this.display.appendChild(document.createTextNode('\n'));
    }
  }

}