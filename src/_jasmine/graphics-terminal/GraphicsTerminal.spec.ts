import { TerminalConfig } from '../../config/TerminalConfig';
import { GraphicsTerminal } from '../../graphics-terminal/GraphicsTerminal';
import { CharacterSet } from '../../characterset/CharacterSet';
import { getIndex } from '../../utils';

describe('GraphicsTerminal Units: ', () => {
  
  it('minimal constructor unit', () => {
    const testTerminal: GraphicsTerminal = new GraphicsTerminal();
  });

  it('config constructor unit', () => {
    const randomDiv = document.createElement('div');
    const charSet: CharacterSet = new CharacterSet();
    const testTerminal: GraphicsTerminal = new GraphicsTerminal({
        container: randomDiv,
        width: 120,
        height: 50,
      } as TerminalConfig, charSet);
    expect(testTerminal.getCharacterSet()).toBe(charSet);
    expect(testTerminal.getWidth()).toEqual(120);
    expect(testTerminal.getHeight()).toEqual(50);
  });

});


describe('GraphicsTerminal Basic Units: ', () => {

  let term: GraphicsTerminal;
  let randoms = [];

  beforeEach(() => {
    term = new GraphicsTerminal();
    term.update();

    randoms = [];
    for (let i = 0; i < 20; i++) {
      randoms.push({
        col: Math.floor(Math.random() * term.getWidth()),
        row: Math.floor(Math.random() * term.getWidth())
      });
    }
  });

  it('string-setCell unit', () => {
    for (let i = 0; i < randoms.length; i++) {
      term.setCell(' ', randoms[i].col, randoms[i].row);
    }
    for (let i = 0; i < randoms.length; i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(getIndex(randoms[i].col, randoms[i].row, term))).toEqual(true);
    }
  });

  it('index-setCell unit', () => {
    for (let i = 0; i < randoms.length; i++) {
      term.setCell(1, randoms[i].col, randoms[i].row);
    }
    for (let i = 0; i < randoms.length; i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(getIndex(randoms[i].col, randoms[i].row, term))).toEqual(true);
      // @ts-ignore
      expect(term.cellData.getCell(getIndex(randoms[i].col, randoms[i].row, term))).toEqual(1);
    }
  });

  it('index-setCell incorrect input unit', () => {
    for (let i = 0; i < randoms.length; i++) {
      let randomIndex = Math.floor(Math.random() * 1000 - 500);
      while(randomIndex === 0 || randomIndex === 1) {
        randomIndex = Math.floor(Math.random() * 1000 - 500);
      }
      term.setCell(randomIndex, randoms[i].col, randoms[i].row);
    }
    for (let i = 0; i < randoms.length; i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(getIndex(randoms[i].col, randoms[i].row, term))).toEqual(true);
      // @ts-ignore
      expect(term.cellData.getCell(getIndex(randoms[i].col, randoms[i].row, term))).toEqual(-1);
    }
  });

  it('update unit', () => {
    for (let i = 0; i < randoms.length; i++) {
      term.setCell(1, randoms[i].col, randoms[i].row);
    }
    term.update();
    for (let i = 0; i < term.getWidth() * term.getHeight(); i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(i)).toEqual(false);
    }
  });

  it('setCellColor unit', () => {
    // @ts-ignore
    spyOn(term.cellController, 'setColor');
    for (let i = 0; i < randoms.length; i++) {
      term.setCellColor('rgb(255, 0, 255)', randoms[i].col, randoms[i].row);
    }
    // @ts-ignore
    expect(term.cellController.setColor).toHaveBeenCalledTimes(randoms.length);
  });

  it('string-fill unit', () => {
    term.fill(' ');
    for (let i = 0; i < term.getWidth() * term.getHeight(); i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(i)).toEqual(true);
    }
  });

  it('index-fill unit', () => {
    term.fill(1);
    for (let i = 0; i < term.getWidth() * term.getHeight(); i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(i)).toEqual(true);
      // @ts-ignore
      expect(term.cellData.getCell(i)).toEqual(1);
    }
  });

  it('index-fill incorrect input unit', () => {
    term.fill(Math.floor(Math.random() * 1000 + 2));
    for (let i = 0; i < term.getWidth() * term.getHeight(); i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(i)).toEqual(true);
      // @ts-ignore
      expect(term.cellData.getCell(i)).toEqual(-1);
    }
  });

  it('setCellColor unit', () => {
    // @ts-ignore
    spyOn(term.cellController, 'setColor');
    term.fillColor('rgb(255, 0, 255)');
    // @ts-ignore
    expect(term.cellController.setColor).toHaveBeenCalledTimes(term.getWidth() * term.getHeight());
  });

});