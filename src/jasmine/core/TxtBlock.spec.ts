import { TxtBlock } from '../../core/TxtBlock';
import 'jasmine-dom-custom-matchers';

describe('TxtBlock Suite:', () => {

  it('Check Default Size', () => {
    let txtBlock = new TxtBlock();
    expect(txtBlock.getWidth()).toEqual(80);
    expect(txtBlock.getHeight()).toEqual(25);
    expect(txtBlock.getBlock().length).toEqual(80*25);
  });

  it('Check Custom Size', () => {
    let txtBlock = new TxtBlock(1, 1);
    expect(txtBlock.getWidth()).toEqual(1);
    expect(txtBlock.getHeight()).toEqual(1);
    expect(txtBlock.getBlock().length).toEqual(1);
  });

  it('Check block Start Values', () => {
    let txtBlock = new TxtBlock();
    let block = txtBlock.getBlock();
    for (let i = 0; i < block.length; i++) {
      expect(block[i]).toEqual(0);
    }
  });

  // TODO add dom testing
});

describe('TxtBlock DOM Suite: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  });

  it('Check DOM structure', () => {
    let txtBlock = new TxtBlock();
    expect(document.body).toBeHTMLElement();
    //expect(document.getElementsByTagName('div').length).toEqual(1);
  });

});