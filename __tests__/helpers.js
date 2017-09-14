// @flow

import { compare } from '../src/helpers'

describe('helper functions', () => {
  test('compare', () => {
    expect(compare(0, 1, x => x)).toBe(-1)
  })

  test('compare with descending parameter', () => {
    expect(compare(0, 1, x => x, true)).toBe(1)
  })
})
