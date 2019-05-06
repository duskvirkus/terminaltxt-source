import { Loop } from '../../loop/Loop';

describe('Loop Units: ', () => {

  beforeAll(() => {
    jasmine.clock().install();
  });

  it('constructor unit', () => {
    spyOn(console, 'log');
    let loop: Loop = new Loop(
      (): void => {
        console.log('init called');
      }
    );
    expect(console.log).toHaveBeenCalledWith('init called');
  });

  it('constructor default update unit', () => {
    let loop: Loop = new Loop(
      (): void => {
        return;
      }
    );
    loop.running(true);
    jasmine.clock().tick(50);
    loop.running(false);
  });

  it('constructor w/update unit', () => {
    spyOn(console, 'log');
    let loop: Loop = new Loop(
      (): void => {
        console.log('init called');
      },
      (): void => {
        console.log('update called');
      }
    );
    expect(console.log).toHaveBeenCalledWith('init called');
    jasmine.clock().tick(50);
    loop.running(false);
    expect(console.log).toHaveBeenCalledWith('update called');
  });

  it('setUpdate unit', () => {
    spyOn(console, 'log');
    let loop: Loop = new Loop(
      (): void => {
        console.log('init called');
      },
      (): void => {
        console.log('update called');
      }
    );
    expect(console.log).toHaveBeenCalledWith('init called');
    jasmine.clock().tick(50);
    loop.running(false);
    expect(console.log).toHaveBeenCalledWith('update called');
    loop.setUpdate(() => {
      console.log('setUpdate replacement');
    });
    jasmine.clock().tick(50);
    loop.running(false);
    expect(console.log).toHaveBeenCalledWith('setUpdate replacement');
  });

  it('frameRate set unit', () => {
    let loop: Loop = new Loop(
      (): void => {
        console.log('init called');
      }
    );
    loop.frameRate(1);
    // @ts-ignore
    expect(loop.targetLoopTime).toBeCloseTo(1000);
  });

  it('slow frame rate unit', () => {
    spyOn(console, 'log');
    let loop: Loop = new Loop(
      (): void => {
        console.log('init called');
      },
      (): void => {
        let sum: number = 0;
        for (let i: number = 0; i < 10000; i++) {
          sum += Math.random();
        }
        console.log(sum);
        console.log('update called');
      }
    );

    loop.frameRate(10);
    // @ts-ignore
    expect(loop.targetLoopTime).toBeCloseTo(100);
    // @ts-ignore
    expect(loop.loopRunning).toEqual(true);

    expect(console.log).toHaveBeenCalledWith('init called');
    jasmine.clock().tick(3000);
    loop.running(false);
    expect(console.log).toHaveBeenCalledWith('update called');
  });

  it('frameRate get unit', () => {
    let loop: Loop = new Loop(
      (): void => {
        console.log('init called');
      },
      (): void => {
        console.log('update called');
      }
    );
    jasmine.clock().tick(100);
    loop.running(false);
    // @ts-ignore
    expect(loop.frameRate()).toEqual(loop.currentFrameRate);
  });

});