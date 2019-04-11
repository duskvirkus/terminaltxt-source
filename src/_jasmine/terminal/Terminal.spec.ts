import { Terminal } from '../../terminal/Terminal';
import { TerminalConfig } from '../../terminal';

describe('Terminal Units: ', () => {
  
  it('minimal constructor unit', () => {
    // @ts-ignore
    const terminal: Terminal = new Terminal({} as TerminalConfig);
  });

  it('full constructor unit', () => {
    let randomDiv = document.createElement('div');
    // @ts-ignore
    const terminal: Terminal = new Terminal({
      container: randomDiv,
    } as TerminalConfig);
  });

});