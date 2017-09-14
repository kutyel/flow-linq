// @flow

import type List from '../src/List'
import Enumerable from '../src/Enumerable'

describe('Enumerable class', () => {
  test('range', () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(Enumerable.range(1, 10).toArray()).toEqual(expected)
  })

  test('repeat', () => {
    const repeated: string = 'I like programming'
    const test: List<string> = Enumerable.repeat(repeated, 3)
    expect(test.elementAt(0)).toBe(repeated)
    expect(test.elementAt(1)).toBe(repeated)
    expect(test.elementAt(2)).toBe(repeated)
    expect(() => test.elementAt(3)).toThrowError(/ArgumentOutOfRangeException/)
  })
})
