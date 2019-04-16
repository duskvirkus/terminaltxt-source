import { TerminalConfig } from '../../terminal/TerminalConfig';
import { GraphicsTerminal } from '../../terminal/GraphicsTerminal';
import { CharacterSet } from '../../characterset/CharacterSet';

describe('GraphicsTerminal Units: ', () => {
  
  it('minimal constructor unit', () => {
    const testTerminal: GraphicsTerminal = new GraphicsTerminal();
  });

  it('config constructor unit', () => {
    const randomDiv = document.createElement('div');
    const testTerminal: GraphicsTerminal = new GraphicsTerminal({
        container: randomDiv,
        graphics: {
          width: 120,
          height: 50,
        },
      } as TerminalConfig, new CharacterSet());
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
      expect(term.cellData.hasBeenChanged(term.cellData.index(randoms[i].col, randoms[i].row))).toEqual(true);
    }
  });

  it('index-setCell unit', () => {
    for (let i = 0; i < randoms.length; i++) {
      term.setCell(1, randoms[i].col, randoms[i].row);
    }
    for (let i = 0; i < randoms.length; i++) {
      // @ts-ignore
      expect(term.cellData.hasBeenChanged(term.cellData.index(randoms[i].col, randoms[i].row))).toEqual(true);
      // @ts-ignore
      expect(term.cellData.getCell(term.cellData.index(randoms[i].col, randoms[i].row))).toEqual(1);
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
      expect(term.cellData.hasBeenChanged(term.cellData.index(randoms[i].col, randoms[i].row))).toEqual(true);
      // @ts-ignore
      expect(term.cellData.getCell(term.cellData.index(randoms[i].col, randoms[i].row))).toEqual(-1);
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

});