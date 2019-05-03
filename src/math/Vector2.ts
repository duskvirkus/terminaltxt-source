/**
 * Simple vector class with two elements, x and y.
 */
export class Vector2 {

  /**
   * First component of the vector.
   */
  public x: number;

  /**
   * Second component of the vector.
   */
  public y: number;

  /**
   * Defaults x and y as 0 if no values passed.
   * 
   * @param x 
   * @param y 
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param vector
   * @returns a copy of vector
   */
  public static copy(vector: Vector2): Vector2 {
    return new Vector2(vector.x, vector.y);
  }

  /**
   * Adds another vector element wise.
   * 
   * @param other 
   */
  public add(other: Vector2): void
  /**
   * Adds element wise, x and y as if they were another vector.
   * 
   * @param x 
   * @param y 
   */
  public add(x: number, y: number): void
  public add(xOrOther: number | Vector2, y?: number): void {
    if (typeof xOrOther === 'number' && y) {
      this.x += xOrOther;
      this.y += y;
    } else if (typeof xOrOther === 'object') {
      this.x += xOrOther.x;
      this.y += xOrOther.y;
    }
  }

  /** 
   * @param other 
   * @returns The dot product of this and the passed vector.
   */
  public dot(other: Vector2): number
  /**
   * @param x 
   * @param y 
   * @returns The dot product of this and the passed x and y as if they were another vector.
   */
  public dot(x: number, y: number): number
  public dot(xOrOther: number | Vector2, y?: number): number {
    let otherX: number = 0;
    let otherY: number = 0;
    if (typeof xOrOther === 'number' && y) {
      otherX = xOrOther;
      otherY = y;
    } else if (typeof xOrOther === 'object') {
      otherX = xOrOther.x;
      otherY = xOrOther.y;
    }
    return this.x * otherX + this.y * otherY;
  }

  /**
   * @returns The magnitude of the vector.
   */
  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Will normalize a non zero vector to a magnitude of 1.
   */
  public normalize(): void {
    const mag: number = this.magnitude();
    if (mag !== 0) {
      this.scale(1 / mag);
    }
  }

  /**
   * Scales vector based on scalar passed. Multiplication if you don't know linear algebra.
   * 
   * @param scalar 
   */
  public scale(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }

  /**
   * Subtracts another vector element wise.
   * 
   * @param other 
   */
  public subtract(other: Vector2): void
  /**
   * Subtracts element wise, x and y as if they were another vector.
   * 
   * @param x 
   * @param y 
   */
  public subtract(x: number, y: number): void
  public subtract(xOrOther: number | Vector2, y?: number): void {
    if (typeof xOrOther === 'number' && y) {
      this.x -= xOrOther;
      this.y -= y;
    } else if (typeof xOrOther === 'object') {
      this.x -= xOrOther.x;
      this.y -= xOrOther.y;
    }
  }

}