export class Loop {

  /**
   * Initialization function defined by user.
   */
  public init: Function;
  
  /**
   * Update function defined by user.
   */
  public update: Function;

  /**
   * Keeps track of current frame rate.
   */
  protected currentFrameRate: number;

  /**
   * Last time that update was called.
   */
  protected lastUpdateTime: number;

  /**
   * Keeps track of whether the loop is running. Use [[running]] method to set. Defaults to true if update is defined in constructor. Otherwise false.
   */
  protected loopRunning: boolean;

  /**
   * The target time between update being called. Milliseconds.
   */
  protected targetLoopTime: number;

  /**
   * @param init 
   */
  constructor(init: Function)
  /**
   * @param init 
   * @param update 
   */
  constructor(init: Function, update: Function)
  constructor(init: Function, update?: Function) {

    this.init = init;
    if (update) {
      this.update = update;
      this.loopRunning = true;
    } else {
      this.update = (): void => {};
      this.loopRunning = false;
    }

    this.lastUpdateTime = window.performance.now();

    this.currentFrameRate = 0;
    this.targetLoopTime = 0;
    this.frameRate(30);

    this.runInit = this.runInit.bind(this);
    this.loop = this.loop.bind(this);

    if (document.readyState === 'complete') {
      this.runInit();
    } else {
      window.addEventListener('load', this.runInit, false);
    }

  }

  /**
   * @returns [[currentFrameRate]]
   */
  public frameRate(): number
  /**
   * Use to set a target frame rate.
   * 
   * @param targetFrameRate 
   * @returns [[currentFrameRate]]
   */
  public frameRate(targetFrameRate: number): number
  public frameRate(targetFrameRate?: number): number {
    if (targetFrameRate) {
      this.targetLoopTime = 1000 / targetFrameRate;
    }
    return this.currentFrameRate;
  }

  /**
   * Sets the [[loopRunning]] variable and restarts loop if it was stopped.
   * 
   * @param loopRunning 
   */
  public running(loopRunning: boolean): void {
    this.loopRunning = loopRunning;
    if (this.loopRunning) {
      this.runLoop();
    }
  }

  /**
   * Used to set [[update]] function if not set in the constructor.
   * 
   * @param update 
   */
  public setUpdate(update: Function): void {
    this.update = update;
  }

  /**
   * Internal method that runs [[update]] and starts the next loop.
   */
  protected loop(): void {
    this.update();
    this.currentFrameRate = 1000 / window.performance.now() - this.lastUpdateTime;
    this.lastUpdateTime = window.performance.now();
    this.runLoop();
  }

  /**
   * Internal method to run [[init]] and start the update loop.
   */
  protected runInit(): void {
    this.init();
    this.runLoop();
  }

  /**
   * Internal method that deals with timing the [[loop]] method.
   */
  protected runLoop(): void {
    if (this.loopRunning) {
      const timeSinceLast: number = window.performance.now() - this.lastUpdateTime;
      if (timeSinceLast > this.targetLoopTime) {
        setTimeout(this.loop, 1);
      } else {
        setTimeout(this.loop, this.targetLoopTime - timeSinceLast);
      }
    }
  }

}