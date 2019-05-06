import { InputTracker } from '../../input/InputTracker';
import { KeyEventType } from '../../input/KeyEventType';
import { KeyAction } from '../../input/KeyAction';

function mockKey(type: string, key: string): void {
  let mockEvent: Event = document.createEvent('Event');
  // @ts-ignore
  mockEvent.key = key;
  mockEvent.initEvent(type, true, true);
  document.dispatchEvent(mockEvent);
}

describe('InputTracker Units: ', () => {

  let input: InputTracker | null;

  beforeEach(() => {
    input = new InputTracker();
  });

  afterEach(() => {
    input.setLogKeys(false);
    input = null;
  });

  it('keypress unit', () => {
    input.addAction({
      keys: ['Enter'],
      keyEventType: KeyEventType.KEYPRESS,
      action: () => {
        console.log('enter pressed')
      },
    } as KeyAction);
    spyOn(console, 'log');
    mockKey('keypress', 'Enter');
    expect(console.log).toHaveBeenCalledWith('enter pressed');
  });

  it('keyup unit', () => {
    input.addAction({
      keys: ['Enter'],
      keyEventType: KeyEventType.KEYUP,
      action: () => {
        console.log('enter up')
      },
    } as KeyAction);
    spyOn(console, 'log');
    mockKey('keyup', 'Enter');
    expect(console.log).toHaveBeenCalledWith('enter up');
  });

  it('keydown unit', () => {
    input.addAction({
      keys: ['Enter'],
      keyEventType: KeyEventType.KEYDOWN,
      action: () => {
        console.log('enter down')
      },
    } as KeyAction);
    spyOn(console, 'log');
    mockKey('keydown', 'Enter');
    expect(console.log).toHaveBeenCalledWith('enter down');
  });

  it('multiple key action unit', () => {
    let keys = ['a', 'b', 'c', 'd', 'e'];
    input.addAction({
      keys: keys,
      keyEventType: KeyEventType.KEYPRESS,
      action: () => {
        console.log('something from keys')
      },
    } as KeyAction);
    spyOn(console, 'log');
    for (let i = 0; i < keys.length; i++) {
      mockKey('keypress', keys[i]);
      expect(console.log).toHaveBeenCalledWith('something from keys');
    }
  });

  it('setKeyLog unit', () => {
    input.setLogKeys(true);
    input.addAction({
      keys: ['Tab'],
      keyEventType: KeyEventType.KEYPRESS,
      action: () => {
        console.log('tab key')
      },
    } as KeyAction);
    spyOn(console, 'log');
    mockKey('keypress', 'Tab');
    expect(console.log).toHaveBeenCalledWith('InputTracker Key Log: \'Tab\', type: keypress');
    expect(console.log).toHaveBeenCalledWith('tab key');
  });

});