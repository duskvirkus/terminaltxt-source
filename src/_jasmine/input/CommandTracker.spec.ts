import { CommandTracker } from '../../input/CommandTracker';
import { OutputTerminal } from '../../output-terminal/OutputTerminal';
import { TerminalConfig } from '../../config/TerminalConfig';
import { Command } from '../../input/Command';
import { CommandArguments } from '../../input/CommandArguments';

function mockKey(type: string, key: string): void {
  let mockEvent: Event = document.createEvent('Event');
  // @ts-ignore
  mockEvent.key = key;
  mockEvent.initEvent(type, true, true);
  document.dispatchEvent(mockEvent);
}

function mockCommand(command: string): void {
  for (let i = 0; i < command.length; i++) {
    mockKey('keypress', command.charAt(i));
  }
  mockKey('keypress', 'Enter');
}

describe('CommandTracker Units: ', () => {

  let cmd: CommandTracker;

  it('basic constructor unit', () => {
    cmd = new CommandTracker();
  });

  it('output constructor unit', () => {
    let output: OutputTerminal = new OutputTerminal();
    cmd = new CommandTracker(output);
    // @ts-ignore
    expect(cmd.output).toBe(output);
  });

  it('help basic unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    mockCommand('help');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/COMMAND HELP/);
    expect(checkText).toMatch(/------------/);
    expect(checkText).toMatch(/Command: /);
    expect(checkText).toMatch(/Description: /);
    expect(checkText).toMatch(/Use 'help --lookup command-name' for more info on specific commands\./);
  });

  it('help lookup help unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    mockCommand('help --lookup help');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/HELP for help/);
    expect(checkText).toMatch(/Description: /);
    expect(checkText).toMatch(/OPTIONAL ARGUMENTS/);
    expect(checkText).toMatch(/  arg: /);
    expect(checkText).toMatch(/  description: /);
    expect(checkText).toMatch(/EXIT CODES/);
    expect(checkText).toMatch(/No exit codes defined\./);
  });

  it('help lookup invalid unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    mockCommand('help --lookup thisshouldntwork');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/ is not a command. Use 'help' to list commands\./);
  });

  it('help lookup invalid unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    mockCommand('help --lookup this shouldnt work either');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/Invalid number of arguments for help --lookup. Example: 'help --lookup command-name'\./);
  });

  it('backspace unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    mockKey('keypress', 'a');

    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/a/);

    mockKey('keyup', 'Backspace');

    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).not.toMatch(/a/);
  });

  it('history unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));

    mockKey('keyup', 'ArrowUp');
    mockKey('keyup', 'ArrowDown');

    mockCommand('a');
    mockCommand('b');
    mockCommand('c');

    mockKey('keyup', 'ArrowUp');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/c/);

    mockKey('keyup', 'ArrowUp');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/b/);

    mockKey('keyup', 'ArrowUp');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/a/);

    mockKey('keyup', 'ArrowUp');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/a/);

    mockKey('keyup', 'ArrowDown');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/b/);

    mockKey('keyup', 'ArrowDown');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/c/);

    mockKey('keyup', 'ArrowDown');
    // @ts-ignore
    expect(cmd.output.lineController.lines[cmd.output.lineController.lines.length - 1].innerHTML).toMatch(/c/);
  });

  it('historyMax unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));

    cmd.historyMax = 1;

    mockCommand('a');
    expect(cmd.history.length).toEqual(1);

    mockCommand('b');
    expect(cmd.history.length).toEqual(1);

    mockCommand('c');
    expect(cmd.history.length).toEqual(1);
  });

  it('help invalid unit', () => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    mockCommand('help -blah');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/Invalid help command! Use 'help --lookup help' for more info\./);
  });

});

describe('CommandTracker registerCommand Units: ', () => {

  let cmd: CommandTracker;

  beforeEach(() => {
    cmd = new CommandTracker(new OutputTerminal({width: -1} as TerminalConfig));
    cmd.registerCommand({
      name: 'error',
      description: 'testing error',
      command: (output: OutputTerminal, args: CommandArguments[]):number => {
        return 1;
      },
      exitCodes: [{
        code: 1,
        description: 'intended output',
      }],
    } as Command);
  });

  it('help lookup help unit', () => {
    mockCommand('help --lookup error');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/HELP for error/);
    expect(checkText).toMatch(/Description: /);
    expect(checkText).toMatch(/OPTIONAL ARGUMENTS/);
    expect(checkText).toMatch(/No optional arguments defined\./);
    expect(checkText).toMatch(/EXIT CODES/);
    expect(checkText).toMatch(/  exit code: /);
    expect(checkText).toMatch(/  description: /);
  });

  it('help lookup help unit', () => {
    mockCommand('error');

    let checkText: string = '';
    // @ts-ignore
    for (let i = 0; i < cmd.output.lineController.lines.length; i++) {
      //@ts-ignore
      checkText += cmd.output.lineController.lines[i].innerHTML;
    }

    expect(checkText).toMatch(/ exit code /);
    expect(checkText).toMatch(/\. Use 'help --lookup /);
    expect(checkText).toMatch(/' for more information\./);
  });

});