export interface Indexable {
  getWidth: () => number,
}

export function getIndex(column: number, row: number, indexable: Indexable): number {
  return column + (row * indexable.getWidth());
}
