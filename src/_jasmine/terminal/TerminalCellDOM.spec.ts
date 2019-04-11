import { TerminalCellDOM } from '../../terminal/TerminalCellDOM';
import 'jasmine-dom-custom-matchers';

describe('TerminalCellDOM Units: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  });
  
  const testWidth: number = 80;
  const testHeight: number = 25;
  let dom: TerminalCellDOM;

  beforeEach(() => {
    dom = new TerminalCellDOM(testWidth, testHeight);
  });

  it('cell number unit', () => {
    expect(dom.cells.length).toEqual(testWidth * testHeight);
    expect(dom.display.childElementCount).toEqual(testWidth * testHeight);
  });

  it('display innerHTML unit', () => {
    let innerParts = dom.display.innerHTML.split(/(<(span|span .*?)>[^<>]*?<\/span>)/);
    innerParts = innerParts.filter(value => value === 'span' ? false : value);
    expect(innerParts.length).toEqual(testWidth * testHeight + testHeight);
    for (let i = 0; i < innerParts.length; i++) {
      if ((i + 1) % (testWidth + 1) === 0) {
        expect(innerParts[i]).toEqual('\n');
      } else {
        expect(innerParts[i]).toMatch(/<(span|span .*?)>[^<>]*?<\/span>/);
      }
    }
  });

});