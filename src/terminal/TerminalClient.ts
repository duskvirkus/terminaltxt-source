// import { InputTracker } from '../input/InputTracker';
// import { Command } from './Command';
// import { KeyAction } from '../input/KeyAction';
// import { KeyEventType } from '../input/KeyEventType';

// /**
//  * Used to track input and logic behind CommandTerminal.
//  */
// export class TerminalClient {

//   public history: string[];

//   public current: string;

//   protected input: InputTracker;

//   protected commands: Command[];

//   protected output: Output;

//   protected historyCounter: number;

//   constructor() {
//     this.history = [];
//     this.current = '';
//     this.input = new InputTracker();

//     // bindings
//     this.finalizeCurrent = this.finalizeCurrent.bind(this);
//     this.addToCurrent = this.addToCurrent.bind(this);
//     this.backspaceCurrent = this.backspaceCurrent.bind(this);
//     this.historyForwards = this.historyForwards.bind(this);
//     this.historyBack = this.historyBack.bind(this);

//     this.setupInput();

//     this.registerCommand({
//       name: 'help',
//       description: 'Provides help for commands that are available.',
//       command: () => {
//         console.log('you entered the help command'); // change to output
//       }
//     } as Command);
//   }

//   protected addToCurrent(key): void {
//     this.current = this.current + key;
//     this.update();
//   }

//   protected backspaceCurrent(key): void {
//     this.current = this.current.substring(0, this.current.length - 1);
//     this.update();
//   }

//   protected historyBack(key): void {
//     if (this.historyCounter > 0) {
//       this.historyCounter--;
//     }
//     this.current = this.history[this.historyCounter];
//     this.update();
//   }

//   protected historyForwards(key): void {
//     if (this.historyCounter < this.history.length - 1) {
//       this.historyCounter++;
//     }
//     this.current = this.history[this.historyCounter];
//     this.update();
//   }

//   public update(): void {
//     // TODO push current to output
//   }

//   protected setupInput(): void {
//     this.input.addAction({
//       keys: ['Backspace'],
//       action: this.backspaceCurrent,
//       keyEventType: KeyEventType.KEYPRESS,
//     } as KeyAction);

//     this.input.addAction({
//       keys: ['Enter'],
//       action: this.finalizeCurrent,
//       keyEventType: KeyEventType.KEYPRESS,
//     } as KeyAction);

//     this.input.addAction({
//       keys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
//       action: this.addToCurrent,
//       keyEventType: KeyEventType.KEYPRESS,
//     } as KeyAction);

//     this.input.addAction({
//       keys: ['ArrowUp'],
//       action: this.historyBack,
//       keyEventType: KeyEventType.KEYPRESS,
//     } as KeyAction);

//     this.input.addAction({
//       keys: ['ArrowDown'],
//       action: this.historyForwards,
//       keyEventType: KeyEventType.KEYPRESS,
//     } as KeyAction);
//   }

//   public registerCommand(command: Command): void {
//     // TODO check if name is already used or override if so
//     this.commands.push(command);
//   }

//   public finalizeCurrent() {
//     let successful: boolean = false;
//     for (let i: number = 0; i < this.commands.length; i++) {
//       if (this.commands[i].name === this.current) {
//         this.commands[i].command();
//         successful = true;
//         break;
//       }
//     }
//     if (!successful) {
//       console.log(`no \'${this.current}\' found, please try again or enter \'help\' for more information.`)
//     }
//     this.history.push(this.current);
//     this.historyCounter = this.history.length - 1;
//     this.current = '';
//     this.update();
//   }

// }