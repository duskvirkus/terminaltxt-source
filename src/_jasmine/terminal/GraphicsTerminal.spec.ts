import { TerminalConfig } from '../../terminal/TerminalConfig';
import { GraphicsTerminal } from '../../terminal/GraphicsTerminal';
import { CharacterSet } from '../../characterset/CharacterSet';

describe('GraphicsTerminal Units: ', () => {
  
  it('minimal constructor unit', () => {
    const testTerminal: GraphicsTerminal = new GraphicsTerminal({} as TerminalConfig, new CharacterSet());
  });

  it('config constructor unit', () => {
    const randomDiv = document.createElement('div');
    const testTerminal: GraphicsTerminal = new GraphicsTerminal({
        container: randomDiv,
        graphics: {
          width: 120,
          height: 50,
        },
      } as TerminalConfig, new CharacterSet());
  });

});