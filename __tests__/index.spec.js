import fromIter from 'callbag-from-iter';
import forEach from 'callbag-for-each';
import subject from 'callbag-subject';

import replay from '../';

describe('replay-all', () => {
  it('should remember all values', () => {
    const list = [10, 20, 30, 40];
    const mock = subject();
    const source$ = replay(0)(mock);

    list.forEach(n => mock(1, n));

    let actual = [];
    forEach(x => actual.push(x))(source$);

    expect(actual).toEqual(list);
  });

  it('should emit values after subscription of sink', () => {
    const list = [10];
    const mock = subject();
    const source$ = replay(0)(mock);

    list.forEach(n => mock(1, n));

    let actual = [];
    forEach(x => actual.push(x))(source$);

    mock(1, 20);

    expect(actual).toEqual([10, 20]);
  });

  it('should remember passed number of values', () => {
    const list = [10, 20, 30];
    const mock = subject();
    const source$ = replay(1 /* just remember one value*/)(mock);

    list.forEach(n => mock(1, n));

    let actual = [];
    forEach(x => actual.push(x))(source$);

    expect(actual).toEqual([30]);
  });
});
