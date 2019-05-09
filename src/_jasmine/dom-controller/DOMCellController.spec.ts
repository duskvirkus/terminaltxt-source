import { DOMCellController } from '../../dom-controller/DOMCellController';
import 'jasmine-dom-custom-matchers';

describe('DOMCellController Units: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  });
  
  const testWidth: number = 80;
  const testHeight: number = 25;
  let dom: DOMCellController;

  beforeEach(() => {
    dom = new DOMCellController(testWidth, testHeight);
  });

  it('cell number unit', () => {
    expect(dom.cells.length).toEqual(testWidth * testHeight);
    expect(dom.display.childElementCount).toEqual(testWidth * testHeight);
  });

  it('display innerHTML unit', () => {
    let innerParts = dom.display.innerHTML.split(/(<(?:span|span .*?)>[^<>]*?<\/span>)/);
    innerParts = innerParts.filter(value => value === 'span' ? false : value);
    expect(innerParts.length).toEqual(testWidth * testHeight + testHeight);
    for (let i = 0; i < innerParts.length; i++) {
      if ((i + 1) % (testWidth + 1) === 0) {
        expect(innerParts[i]).toEqual('\n');
      } else {
        expect(innerParts[i]).toMatch(/<(?:span|span .*?)>[^<>]*?<\/span>/);
      }
    }
  });

  it('setCellValue unit', () => {
    // column & number
    for (let i = 0; i < dom.getWidth(); i++) {
      for (let j = 0; j < dom.getHeight(); j++) {
        dom.setCellValue(String.fromCharCode((i + j) % 96 + 63), i, j);
      }
    }
    for (let i = 0; i < dom.cells.length; i++) {
      expect(dom.cells[i].innerHTML).toEqual(String.fromCharCode(((i % dom.getWidth()) + (i / dom.getWidth())) % 96 + 63));
    }
    // index
    for (let i = 0; i < dom.cells.length; i++) {
      dom.setCellValue(String.fromCharCode(i % 96 + 63), i);
    }
    for (let i = 0; i < dom.cells.length; i++) {
      expect(dom.cells[i].innerHTML).toEqual(String.fromCharCode(i % 96 + 63));
    }
  });

  it('span elements unit', () => {
    const offset: number = document.getElementsByTagName('span').length - dom.cells.length;
    for (let i = 0; i < dom.cells.length; i++) {
      expect(dom.cells[i].isEqualNode(document.getElementsByTagName('span')[i + offset])).toEqual(true);
    }
  });

  it('setColor unit', () => {
    dom.setColor(0, 0, '#ff0000');
    expect(dom.cells[0]).toHaveComputedStyle('color', 'rgb(255, 0, 0)');
  });

});