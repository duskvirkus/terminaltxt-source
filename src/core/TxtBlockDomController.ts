export class TxtBlockDomController {

  // TODO docs

  public container: HTMLDivElement;

  public pre: HTMLPreElement;

  public code: HTMLElement;

  public mainSpan: HTMLSpanElement;

  public spanBlock: HTMLSpanElement[] = [];

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.pre = document.createElement('pre');
    this.code = document.createElement('code');
    this.mainSpan = document.createElement('span');

    this.container.appendChild(this.pre);
    this.pre.appendChild(this.code);
    this.code.appendChild(this.mainSpan);
  }

}