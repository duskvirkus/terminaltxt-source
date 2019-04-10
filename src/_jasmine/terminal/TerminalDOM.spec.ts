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

  it('DOM addInnerTxt to display', () => {
    let helloString = 'Hello TerminalTXT!';
    dom.addInnerTxt(helloString);
    expect(dom.display.innerHTML).toEqual(helloString);
    let goodbyeString = 'Goodbye';
    dom.addInnerTxt(goodbyeString);
    expect(dom.display.innerHTML).toEqual(helloString + goodbyeString);
    dom.addInnerMultiTxt([helloString, goodbyeString]);
    expect(dom.display.innerHTML).toEqual(helloString + goodbyeString + helloString + goodbyeString);
  });

  it('DOM setInnerTxt to display', () => {
    let helloString = 'Hello TerminalTXT!';
    dom.setInnerTxt(helloString);
    expect(dom.display.innerHTML).toEqual(helloString);
    let goodbyeString = 'Goodbye';
    dom.setInnerTxt(goodbyeString);
    expect(dom.display.innerHTML).toEqual(goodbyeString);
    dom.setInnerMultiTxt([helloString, goodbyeString]);
    expect(dom.display.innerHTML).toEqual(helloString + goodbyeString);
  });

  it('DOM addChildElement to display', () => {
    let hansel = document.createElement('div');
    dom.addChildElement(hansel);
    expect(dom.display.children.length).toEqual(1);
    let gretel = document.createElement('div');
    dom.addChildElement(gretel);
    expect(dom.display.children.length).toEqual(2);
  });

  it('DOM setChildElement to display', () => {
    let hansel = document.createElement('div');
    dom.setChildElement(hansel);
    expect(dom.display.children.length).toEqual(1);
    let gretel = document.createElement('div');
    dom.setChildElement(gretel);
    expect(dom.display.children.length).toEqual(1);
  });

});