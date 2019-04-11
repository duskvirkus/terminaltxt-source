import { TerminalConfig } from '../../terminal/TerminalConfig';
import { GraphicsTerminal } from '../../terminal/GraphicsTerminal';

describe('GraphicsTerminal Units: ', () => {
  
  it('minimal constructor unit', () => {
    const testTerminal: GraphicsTerminal = new GraphicsTerminal();
  });

  it('config constructor unit', () => {
    const randomDiv = document.createElement('div');
    const testTerminal: GraphicsTerminal = new GraphicsTerminal({
      container: randomDiv,
      graphics: {
        width: 120,
        height: 50,
      },
    } as TerminalConfig);
  });

});