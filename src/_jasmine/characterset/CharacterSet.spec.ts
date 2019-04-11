import { CharacterSet } from '../../characterset/CharacterSet';

describe('CharacterSet Units: ', () => {
  
  it('good string constructor unit', () => {
    const test: string = 'abc'; // no duplicates
    const charSet: CharacterSet = new CharacterSet(test);
    expect(charSet.set.length).toEqual(test.length);
    for (let i = 0; i < test.length; i++) {
      expect(charSet.set[i]).toEqual(test.charCodeAt(i));
    }
  });

  it('duplicate string constructor test', () => {
    const duplicates: string = 'aabbbcCdee';
    const noDuplicates: string = 'abcCde';
    const charSet: CharacterSet = new CharacterSet(duplicates);
    expect(charSet.set.length).toEqual(noDuplicates.length);
    for (let i = 0; i < noDuplicates.length; i++) {
      expect(charSet.set[i]).toEqual(noDuplicates.charCodeAt(i));
    }
  });

  it('array constructor test', () => {
    let array: number[] = [];
    for (let i = 0; i < 10; i++) {
      array.push((i + 32));
    }
    const charSet: CharacterSet = new CharacterSet(array);
    expect(charSet.set.length).toEqual(array.length);
    for (let i = 0; i < array.length; i++) {
      expect(charSet.set[i]).toEqual(array[i]);
    }
  });

  it('unknown unit', () => {
    let charSet: CharacterSet;

    charSet = new CharacterSet([]);
    expect(charSet.unknown).toEqual('�'.charCodeAt(0));

    charSet = new CharacterSet([], 63);
    expect(charSet.unknown).toEqual('?'.charCodeAt(0));

    charSet = new CharacterSet([], '?');
    expect(charSet.unknown).toEqual('?'.charCodeAt(0));

    charSet = new CharacterSet('');
    expect(charSet.unknown).toEqual('�'.charCodeAt(0));

    charSet = new CharacterSet('', 63);
    expect(charSet.unknown).toEqual('?'.charCodeAt(0));

    charSet = new CharacterSet('', '?');
    expect(charSet.unknown).toEqual('?'.charCodeAt(0));
  });

});