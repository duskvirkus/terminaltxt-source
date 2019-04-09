import { ICharacterSet, SpaceSolidCharacterSet } from '../characterset/index';

/**
 * Stores and updates TxtBlock.
 */ // TODO improve
export class TxtBlock {

  /**
   * 
   */
  public characterSet: ICharacterSet;

  /**
   * Block width.
   */
  protected width: number;

  /**
   * Block height.
   */
  protected height: number;

  /**
   * Block of chars stored as one dimensional array.
   */
  protected block: number[] = [];

  /**
   * Boolean array for what chars in the block have been updated.
   */
  protected updated: boolean[] = [];

  /**
   * Div element that holds all dom elements created
   */
  protected domDiv: HTMLDivElement;

  /**
   * Span element that holds the rendered TxtBlock.
   */
  protected domSpan: HTMLSpanElement;

  /**
   * @param width default: 80
   * @param height default: 25
   * @param parent parent DOM element id
   */
  public constructor(width: number = 80, height: number = 25, parent: HTMLElement = document.getElementsByTagName('body')[0]) {
    this.width = width;
    this.height = height;

    this.domDiv = document.createElement('div');
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    this.domSpan = document.createElement('span');
    code.appendChild(this.domSpan);
    pre.appendChild(code);
    this.domDiv.appendChild(pre);
    this.setParent(parent);

    this.characterSet = new SpaceSolidCharacterSet();

    this.createBlock();
    this.initBlockDiv();
  }

  // ------------------------------------------------------------
  // External Methods

  // TODO change char input
  public setChar(char: number, col: number, row: number): void { // TODO rename // TODO Write docs // TODO make test
    this.block[this.index(col, row)] = char;
    //this.updated[this.index(col, row)] = true;
  }

  // TODO write doc // TODO write test
  public update(): void { // TODO rename
    let html = '';
    for (let i = 0; i < this.block.length; i++) {
      html += String.fromCharCode(this.characterSet.set[this.block[i]]);
      // TODO add unicode support.
      if ((i + 1) % this.width == 0) {
        html += '\n';
      }
    }
    this.domSpan.innerHTML = html;
  }

  // ------------------------------------------------------------
  // Getters

  /**
   * @returns width
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * @returns height
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * @returns block
   */
  public getBlock(): number[] {
    return this.block;
  }

  // ------------------------------------------------------------
  // Setters

  /**
   * @param parent DOM element that blockDiv will be appended to
   */
  public setParent(parent: HTMLElement): void {
    parent.appendChild(this.domDiv);
  }

  // ------------------------------------------------------------
  // Internal Methods

  /**
   * Will create and initialize the block and updated arrays with default values.
   */
  protected createBlock(): void {
    this.block = [];
    this.updated = [];
    for (let i = 0; i < this.width * this.height; i++) {
      this.block.push(0);
      this.updated.push(false);
    }
  }

  // TODO write docs // TODO write test
  protected initBlockDiv(): void {
    let html: string = '';
    for (let i = 0; i < this.block.length; i++) {
      html += String.fromCharCode(this.characterSet.set[this.block[i]]);
      // TODO add unicode support.
      if ((i + 1) % this.width == 0) {
        html += '\n';
      }
    }
    this.domSpan.innerHTML = html;
  }

  // TODO write doc // TODO write test
  protected index(col: number, row: number): number {
    // TODO check inputs?
    return col + row * this.width;
  }

  // TODO write doc // TODO write test
  protected indexDom(index: number): number {
    // TODO refactor
    let row = Math.floor(index / this.width);
    let col = index - (row * this.width);
    return col + row * this.width + 1;
  }

}