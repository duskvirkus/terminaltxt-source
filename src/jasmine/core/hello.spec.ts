import { sayHello, addHello } from '../../core/hello';

describe('Hello Module Tests :', () => {
  it('sayHello function', () => {
    const value = 'Test';
    spyOn(console, 'log');
    sayHello(value);
    expect(console.log).toHaveBeenCalledWith('Hello Test');
  });

  it('addHello function', () => {
    spyOn(console, 'log');
    addHello(2, 2);
    expect(console.log).toHaveBeenCalledWith('Hello 4');
  });
});