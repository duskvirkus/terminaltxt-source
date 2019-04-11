import { TerminalConfig } from '../../terminal/TerminalConfig';
import { TerminalDOM } from '../../terminal/TerminalDOM';

describe('TerminalConfig Units: ', () => {

  it('minimal unit', () => {
    let config: TerminalConfig = {};
  });

  it('defaults unit', () => {
    let config: TerminalConfig = {
      container: TerminalDOM.defaultContainer(),
    };
  });

});