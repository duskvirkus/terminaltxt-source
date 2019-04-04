import { add } from '../math/math';

export function sayHello(text: string): void {
  console.log("Hello " + text);
}

export function addHello(firstNumber: number, secondNumber: number): void {
  sayHello(add(firstNumber, secondNumber).toString());
}