import { OutputTerminal } from '../../output-terminal/OutputTerminal';
import { TerminalConfig } from '../../config/TerminalConfig';

describe('CommandTerminal Units: ', () => {

  let term: OutputTerminal;
  
  it('default constructor unit', () => {
    term = new OutputTerminal();
    expect(term.getWidth()).toEqual(80);
    expect(term.getHeight()).toEqual(25);
  });

  it('param constructor unit', () => {
    const randomDiv: HTMLDivElement = document.createElement('div');
    term = new OutputTerminal({
      width: 10,
      height: 10,
      container: randomDiv,
    } as TerminalConfig, 'Hello!');
    expect(term.getWidth()).toEqual(10);
    expect(term.getHeight()).toEqual(10);
    // @ts-ignore
    expect(term.lineController.lines[term.lineController.lines.length -1].innerHTML).toEqual('Hello!');
  });

  it('param constructor unit', () => {
    term = new OutputTerminal({width: 1} as TerminalConfig, 'This is too long!!!!!!');
    // @ts-ignore
    expect(term.lineController.lines[term.lineController.lines.length -1].innerHTML).toEqual('');
  });

  it('writeln unit', () => {
    term = new OutputTerminal();

    let randoms: string[] = [];
    for (let i = 0; i < 100; i++) {
      randoms.push(Math.random().toString());
    }

    for (let i = 0; i < randoms.length; i++) {
      term.writeln(randoms[i]);
      // @ts-ignore
      expect(term.lineController.lines[term.lineController.lines.length -1].innerHTML).toEqual(randoms[i]);
    }
  });
  
  it('writeln too long unit', () => {
    term = new OutputTerminal();

    let randoms: string[] = [];
    for (let i = 0; i < 100; i++) {
      let s: string = '';
      for (let j = 0; j < 10; j++) {
        s += Math.random().toString();
      }
      randoms.push(s);
    }

    for (let i = 0; i < randoms.length; i++) {
      term.writeln(randoms[i]);
      // @ts-ignore
      expect(term.lineController.lines[term.lineController.lines.length -1].innerHTML).toEqual(randoms[i].substring((Math.floor(randoms[i].length / 80) * 80)));
    }
  });

});