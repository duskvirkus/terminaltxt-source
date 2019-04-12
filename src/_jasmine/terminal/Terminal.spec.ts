import { Terminal } from '../../terminal/Terminal';
import { TerminalDOM } from '../../terminal/TerminalDOM';
import { CharacterSet } from '../../characterset/CharacterSet';

describe('Terminal Units: ', () => {
  
  it('constructor unit', () => {
    // @ts-ignore
    const terminal: Terminal = new Terminal(new TerminalDOM(), new CharacterSet());
  });

});