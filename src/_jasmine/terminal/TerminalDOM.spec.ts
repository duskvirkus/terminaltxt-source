import { TerminalDOM } from '../../terminal/TerminalDOM';
import 'jasmine-dom-custom-matchers';

describe('TerminalDOM Units: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  })
  
  let dom

  beforeEach(() => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    dom = new TerminalDOM(div);
  });

  it('DOM creation unit', () => {
    expect(dom.container).toBeHTMLElement();
    expect(dom.pre).toBeHTMLElement();
    expect(dom.code).toBeHTMLElement();
    expect(dom.display).toBeHTMLElement();
  });
  
  it('DOM structure unit', () => {
    expect(dom.container).toBeChildOf(document.body);
    expect(dom.pre).toBeChildOf(dom.container);
    expect(dom.code).toBeChildOf(dom.pre);
    expect(dom.display).toBeChildOf(dom.code);
  });

  it('DOM number of children unit', () => {
    expect(dom.container).toHaveChildren(1);
    expect(dom.pre).toHaveChildren(1);
    expect(dom.code).toHaveChildren(1);
  });

  it('DOM clear unit', () => {
    dom.display.innerHTML = 'hello';
    expect(dom.display.innerHTML).toEqual('hello');
    dom.clear();
    expect(dom.display.innerHTML).toEqual('');

    let div = document.createElement('div');
    dom.display.appendChild(div);
    expect(dom.display.children.length).toEqual(1);
    expect(dom.display.innerHTML).not.toEqual('');
    dom.clear();
    expect(dom.display.children.length).toEqual(0);
  });

});