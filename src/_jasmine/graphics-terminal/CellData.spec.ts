import { CellData } from '../../graphics-terminal/CellData';

describe('CellData Units: ', () => {
  
  const width: number = 80;
  const height: number = 25;
  let cellData: CellData;

  beforeEach(() => {
    cellData = new CellData(width, height);
  });

  it('constructor unit', () => {
    expect(cellData.getWidth()).toEqual(width);
    expect(cellData.getHeight()).toEqual(height);
    // @ts-ignore
    expect(cellData.data.length).toEqual(cellData.numberOfCells());
    // @ts-ignore
    expect(cellData.changed.length).toEqual(cellData.numberOfCells());
  });

  it('init values unit', () => {
    for (let i = 0; i < cellData.numberOfCells(); i++) {
      expect(cellData.getCell(i)).toEqual(0);
    }
    for (let i = 0; i < cellData.numberOfCells(); i++) {
      expect(cellData.hasBeenChanged(i)).toEqual(true);
    }
  });

  it('doneChange unit', () => {
    let randoms = [];
    for (let i = 0; i < 20; i++) {
      randoms.push({
        col: Math.floor(Math.random() * width),
        row: Math.floor(Math.random() * height),
      });
    }
    for (let i = 0; i < randoms.length; i++) {
      cellData.doneChange(cellData.index(randoms[i].col, randoms[i].row));
    }
    for (let i = 0; i < randoms.length; i++) {
      expect(cellData.hasBeenChanged(cellData.index(randoms[i].col, randoms[i].row))).toEqual(false);
    }
  });

  it('setCell unit', () => {
    let randoms = [];
    for (let i = 0; i < 20; i++) {
      randoms.push({
        col: Math.floor(Math.random() * width),
        row: Math.floor(Math.random() * height),
      });
    }
    for (let i = 0; i < randoms.length; i++) {
      cellData.setCell(1, cellData.index(randoms[i].col, randoms[i].row));
    }
    for (let i = 0; i < randoms.length; i++) {
      expect(cellData.getCell(cellData.index(randoms[i].col, randoms[i].row))).toEqual(1);
    }
  });

});