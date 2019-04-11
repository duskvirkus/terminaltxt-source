import { TerminalConfig } from '../../terminal/TerminalConfig';
import { GraphicsTerminal } from '../../terminal/GraphicsTerminal';

describe('GraphicsTerminal Units: ', () => {
  
  it('minimal constructor unit', () => {
    const testTerminal: GraphicsTerminal = new GraphicsTerminal();
  });

  it('config constructor unit', () => {
    const testTerminal: GraphicsTerminal = new GraphicsTerminal({
      graphics: {
        width: 120,
        height: 50,
      },
    } as TerminalConfig);
  });

});