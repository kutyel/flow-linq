// @flow

import List from '../src/OrderedList';

describe('OrderedList class', () => {

    test('should instanciate whithout crashing', () => {
        expect(new List([], (a, b) => a > b ? 1 : 0)).toBeTruthy();
    });

});
