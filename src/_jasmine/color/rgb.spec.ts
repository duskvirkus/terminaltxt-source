import { rgb, rgbNoTest, toHex } from '../../color/rgb';

describe('rgb Units: ', () => {

  it('rgb unit', () => {
    expect(rgb(0, 0, 0)).toEqual('#000000');
    expect(rgb(255, 255, 255)).toEqual('#ffffff');
    expect(rgb(128, 128, 128)).toEqual('#808080');
    expect(rgb(0, 128, 255)).toEqual('#0080ff');
    expect(rgb(254.6, 127.9, 0.4)).toEqual('#ff8000');
    expect(rgb(-4, 1000, -12000)).toEqual('#00ff00');
  });

});

describe('rgbNoTest Units: ', () => {

  it('rgbNoTest unit', () => {
    expect(rgbNoTest(0, 0, 0)).toEqual('#000000');
    expect(rgbNoTest(255, 255, 255)).toEqual('#ffffff');
    expect(rgbNoTest(128, 128, 128)).toEqual('#808080');
    expect(rgbNoTest(0, 128, 255)).toEqual('#0080ff');
  });

});

describe('toHex Units: ', () => {

  it('toHex unit', () => {
    expect(toHex(0)).toEqual('00');
    expect(toHex(255)).toEqual('ff');
    expect(toHex(128)).toEqual('80');
    expect(toHex(241)).toEqual('f1');
    expect(toHex(14)).toEqual('0e');
    expect(toHex(1111)).toEqual('45');
  });

});