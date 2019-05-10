/**
 * Interface to enforce a getWidth method for use in [[getIndex]].
 */
export interface Indexable {
  getWidth: () => number,
}

/**
 * Returns the index of 2D data into a 1D array.
 * 
 * @param column 
 * @param row 
 * @param indexable 
 */
export function getIndex(column: number, row: number, indexable: Indexable): number {
  return column + (row * indexable.getWidth());
}
