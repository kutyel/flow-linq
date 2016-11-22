// @flow

import type List from '../src/List';
import Enumerable from '../src/Enumerable';

describe('Enumerable class', () => {

    test('range', () => {
        const expected = '1,2,3,4,5,6,7,8,9,10';
        expect(Enumerable.range(1, 10).toArray().toString()).toEqual(expected);
    });

    test('repeat', () => {
        const test: List<string> = Enumerable.repeat('I like programming', 3);
        expect(test.elementAt(0)).toBe('I like programming');
        expect(test.elementAt(1)).toBe('I like programming');
        expect(test.elementAt(2)).toBe('I like programming');
        expect(test.elementAt(3)).toBeUndefined();
    });

});
