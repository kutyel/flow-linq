// @flow

import List from '../src/List';

describe('List class', () => {

    it('add', () => {
        const string = 'string';
        const list: List<string> = new List();
        list.add(string);
        expect(list.first()).toBe(string);
    });

    it('addRange', () => {
        const list: List<number> = new List();
        list.addRange([1, 2, 3, 4, 5]);
        expect(list.toArray().toString()).toBe('1,2,3,4,5');
    });

});
