import { DOMController } from '../../dom-controller/DOMController';
import 'jasmine-dom-custom-matchers';

describe('DOMController Units: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  });
  
  let dom;

  beforeEach(() => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    dom = new DOMController(div);
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

  it('DOM classes unit', () => {
    expect(dom.container.className).toMatch(/termtxt-container/);
    expect(dom.pre.className).toMatch(/termtxt-pre/);
    expect(dom.code.className).toMatch(/termtxt-code/);
    expect(dom.display.className).toMatch(/termtxt-display/);
  });

  it('DOM ids unit', () => {
    expect(dom.container.id).toMatch(/\btermtxt-container(-(\d{2,}|[1-9]+))?\b/);
    expect(dom.pre.id).toMatch(/\btermtxt-pre(-(\d{2,}|[1-9]+))?\b/);
    expect(dom.code.id).toMatch(/\btermtxt-code(-(\d{2,}|[1-9]+))?\b/);
    expect(dom.display.id).toMatch(/\btermtxt-display(-(\d{2,}|[1-9]+))?\b/);
  });

});

describe('TerminalDOM static Units: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  });

  it('defaultContainer unit', () => {
    let container = DOMController.defaultContainer();
    expect(container).toBeHTMLElement();
    expect(container).toBeChildOf(document.body);
  });

});