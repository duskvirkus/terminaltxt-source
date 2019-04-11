import { TerminalCellData } from '../../terminal/TerminalCellData';

describe('TerminalCellData Units: ', () => {
  
  it('constructor unit', () => {
    const cellData = new TerminalCellData(80, 25);
    
    expect(cellData.width).toEqual(80);
    expect(cellData.height).toEqual(25);
    expect(cellData.data.length).toEqual(80 * 25);
  });

});