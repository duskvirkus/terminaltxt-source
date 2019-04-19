import { KeyAction } from "./KeyAction";
import { KeyEventType } from "./KeyEventType";

/**
 * Tracks Keyboard Input from User and executes actions that have been added to [[actions]].
 */
export class InputTracker {

  /**
   * List of [[KeyAction]] to execute if certain keys have ben pressed.
   */
  protected actions: KeyAction[] = [];

  /**
   * Will log keyboard presses to console to assist with designing.
   */
  protected logKeys: boolean = false;

  /**
   * 
   */
  constructor() {
    this.handleKey = this.handleKey.bind(this);
    document.addEventListener('keydown', this.handleKey);
    document.addEventListener('keyup', this.handleKey);
    document.addEventListener('keypress', this.handleKey);
  }

  /**
   * Will add a [[KeyAction]] to [[actions]].
   * 
   * @param action 
   */
  public addAction(action: KeyAction): void {
    this.actions.push(action);
  }

  /**
   * Sets [[logKeys]].
   * 
   * @param logKeys 
   */
  public setLogKeys(logKeys: boolean): void {
    this.logKeys = logKeys;
  }

  /**
   * Connected to event listeners and will call [[actions]] if [[KeyAction]].keys show up in an event.
   * 
   * @param event 
   */
  protected handleKey(event: KeyboardEvent): void {
    if (this.logKeys) {
      console.log(`InputTracker Key Log: \'${event.key}\', type: ${event.type}`);
    }
    for (let i: number = 0; i < this.actions.length; i++) {
      if (this.actions[i].keys.indexOf(event.key) !== -1) {
        if (event.type === 'keydown' && this.actions[i].keyEventType === KeyEventType.KEYDOWN) {
          this.actions[i].action();
        } else if (event.type === 'keyup' && this.actions[i].keyEventType === KeyEventType.KEYUP) {
          this.actions[i].action();
        } else if (event.type === 'keypress' && this.actions[i].keyEventType === KeyEventType.KEYPRESS) {
          this.actions[i].action();
        }
      }
    }
  }

}