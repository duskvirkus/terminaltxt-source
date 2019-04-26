import { InputTracker } from '../input/InputTracker';
import { KeyAction } from '../input/KeyAction';
import { KeyEventType } from '../input/KeyEventType';
import { OutputTerminal } from '../output-terminal/OutputTerminal';
import { Command, CommandArguments } from './Command';

/**
 * Used to track input and check against registered commands.
 */
export class CommandTracker {

  public current: string;

  public history: string[];

  protected commands: Command[];

  protected historyCounter: number;

  protected input: InputTracker;

  protected output: OutputTerminal;

  constructor(outputTerminal: OutputTerminal = new OutputTerminal()) {
    this.history = [];
    this.historyCounter = 0;
    this.current = '';
    this.commands = [];
    this.input = new InputTracker();
    this.input.setLogKeys(true); // TODO remove
    this.output = outputTerminal;

    // bindings
    this.finalizeCurrent = this.finalizeCurrent.bind(this);
    this.addToCurrent = this.addToCurrent.bind(this);
    this.backspaceCurrent = this.backspaceCurrent.bind(this);
    this.historyForwards = this.historyForwards.bind(this);
    this.historyBack = this.historyBack.bind(this);

    this.helpCommand = this.helpCommand.bind(this);

    this.setupInput();

    this.registerCommand({
      name: 'help',
      description: 'Provides information about available commands.',
      command: this.helpCommand,
      options: [{
        argument: 'lookup',
        description: 'Use to look up help pages for a specific registered command.'
      }],
    } as Command);

    this.registerCommand({
      name: 'error',
      description: 'testing error',
      command: (output: OutputTerminal, args: CommandArguments[]):number => {
        output.writeln('this should have non zero return value');
        return 1;
      },
      exitCodes: [{
        code: 1,
        description: 'intended output',
      }],
    } as Command);

    this.update();
  }

  public static indexOfCommandArgument(arg: string, args: CommandArguments[]): number {
    for (let i: number = 0; i < args.length; i++) {
      if (args[i].argument === arg) {
        return i;
      }
    }
    return -1;
  }

  public static indexOfCommandArguments(argsToLookFor: string[], args: CommandArguments[]): number[] {
    const indexes: number[] = [];
    for (let i: number = 0; i < argsToLookFor.length; i++) {
      indexes.push(CommandTracker.indexOfCommandArgument(argsToLookFor[i], args));
    }
    return indexes;
  }

  public finalizeCurrent(key: string): void {
    let exitCode: number = -1;
    const currentCommand: string[] = this.current.split(' ');
    for (let i: number = 0; i < this.commands.length; i++) {
      if (this.commands[i].name.toLowerCase() === currentCommand[0].toLowerCase()) {
        const args: CommandArguments[] = this.parseArguments(currentCommand);
        exitCode = this.commands[i].command(this.output, args);
        break;
      }
    }
    if (exitCode === -1) {
      this.output.writeln(`no \'${this.current}\' found, please try again or enter \'help\' for more information.`)
    } else if (exitCode > 0) {
      this.output.writeln(`\'${currentCommand[0]}\' exit code [${exitCode}]. Use \'help --lookup ${currentCommand[0]}\' for more information.`);
    }
    this.history.push(this.current);
    this.historyCounter = this.history.length;
    this.output.newLine();
    this.output.resetLinesToCheck();
    this.current = '';
    this.update();
  }

  public helpCommand(output: OutputTerminal, args: CommandArguments[]): number {
    if (args.length === 0) {
      output.writeln('COMMAND HELP');
      output.writeln('------------')
      for (let i: number = 0; i < this.commands.length; i++) {
        output.writeln(`Command: ${this.commands[i].name}`);
        output.writeln(`Description: ${this.commands[i].description}`);
      }
      output.writeln('Use \'help --lookup command-name\' for more info on specific commands.')
      return 0;
    }
    const argIndexes: number[] = CommandTracker.indexOfCommandArguments(['lookup'], args);
    if (argIndexes[0] !== -1) { // lookup
      const currentArg: CommandArguments = args[argIndexes[0]];
      if (typeof currentArg.parameters === 'undefined' || currentArg.parameters.length !== 1) {
        output.writeln('Invalid number of arguments for help --lookup. Example: \'help --lookup command-name\'');
        return -2;
      } else {
        let command: Command | null = null;
        for (let i: number = 0; i < this.commands.length; i++) {
          if (this.commands[i].name === currentArg.parameters[0]) {
            command = this.commands[i];
          }
        }
        if (command === null) {
          output.writeln(`${currentArg.parameters[0]} is not a command. Use \'help\' to list commands.`);
          return -2;
        }
        output.writeln(`HELP for ${command.name}`);
        output.writeln(`Description: ${command.description}`);
        output.writeln('OPTIONAL ARGUMENTS');
        if (typeof command.options !== 'undefined') {
          output.writeln('Single letter optional arguments should be prefaced with \'-\' and multi-letter arguments should be prefaced with \'--\'.')
          for (let i: number = 0; i < command.options.length; i++) {
            output.writeln(`  arg: ${command.options[i].argument}`);
            output.writeln(`  description: ${command.options[i].description}`);
          }
        } else {
          output.writeln('No optional arguments defined.');
        }
        output.writeln('EXIT CODES');
        if (typeof command.exitCodes !== 'undefined') {
          for (let i: number = 0; i < command.exitCodes.length; i++) {
            output.writeln(`  exit code: ${command.exitCodes[i].code}`);
            output.writeln(`  description: ${command.exitCodes[i].description}`);
          }
        } else {
          output.writeln('No exit codes defined.')
        }
        return 0;
      }
    }
    output.writeln('Invalid help command! Use \'help --lookup help\' for more info.')
    return -2;
  }

  public registerCommand(command: Command): void {
    // TODO check if name is already used or override if so
    this.commands.push(command);
  }

  public update(): void {
    this.output.overwrite('$ ' + this.current);
  }

  protected addToCurrent(key: string): void {
    this.current = this.current + key;
    this.update();
  }

  protected backspaceCurrent(key: string): void {
    this.current = this.current.substring(0, this.current.length - 1);
    this.update();
  }

  protected historyBack(key: string): void {
    if (this.history.length > 0) {
      if (this.historyCounter > 0) {
        this.historyCounter--;
      }
      this.current = this.history[this.historyCounter];
      this.update();
    }
  }

  protected historyForwards(key: string): void {
    if (this.history.length > 0) {
      if (this.historyCounter < this.history.length - 1) {
        this.historyCounter++;
      }
      this.current = this.history[this.historyCounter];
      this.update();
    }
  }

  protected parseArguments(commandInput: string[]): CommandArguments[] {
    const args: CommandArguments[] = [];
    let parseCounter: number = 1;
    while(parseCounter < commandInput.length) {
      if (commandInput[parseCounter].substring(0, 2) === '--') {
        let arg: string;
        const parameters: string[] = [];
        arg = commandInput[parseCounter].substring(2);
        parseCounter++;
        while(parseCounter < commandInput.length && commandInput[parseCounter].substring(0, 1) !== '-') { // TODO refactor this mess
          parameters.push(commandInput[parseCounter]);
          parseCounter++;
        }
        parseCounter--;
        args.push({
          argument: arg,
          parameters: parameters,
        } as CommandArguments);
      } else if (commandInput[parseCounter].substring(0, 1) === '-') {
        for (let i: number = 1; i < commandInput[parseCounter].length; i++) {
          args.push({
            argument: commandInput[parseCounter].substring(i, i + 1),
          } as CommandArguments);
        }
      }
      parseCounter++;
    }
    return args;
  }

  protected setupInput(): void {
    this.input.addAction({
      keys: ['Backspace'],
      action: this.backspaceCurrent,
      keyEventType: KeyEventType.KEYUP,
    } as KeyAction);

    this.input.addAction({
      keys: ['Enter'],
      action: this.finalizeCurrent,
      keyEventType: KeyEventType.KEYPRESS,
    } as KeyAction);

    this.input.addAction({
      keys: [' ', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      action: this.addToCurrent,
      keyEventType: KeyEventType.KEYPRESS,
    } as KeyAction);

    this.input.addAction({
      keys: ['ArrowUp'],
      action: this.historyBack,
      keyEventType: KeyEventType.KEYUP,
    } as KeyAction);

    this.input.addAction({
      keys: ['ArrowDown'],
      action: this.historyForwards,
      keyEventType: KeyEventType.KEYUP,
    } as KeyAction);
  }

}