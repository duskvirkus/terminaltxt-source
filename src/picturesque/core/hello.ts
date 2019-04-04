import { add } from '../math/math';

/**
 * Logs hello message to the console.
 * 
 * @param text Will be output after "Hello "
 */
export function sayHello(text: string): void {
  console.log("Hello " + text);
}

/**
 * Adds firstNumber and secondNumber using [[add]] then will output the result 
 * to console with the form "Hello (added number)".
 * 
 * @param firstNumber 
 * @param secondNumber 
 */
export function addHello(firstNumber: number, secondNumber: number): void {
  sayHello(add(firstNumber, secondNumber).toString());
}