import Enumerable from '../src/Enumerable';

describe('Enumerable class', () => {

    it('Range', () => {
        expect(Enumerable.range(1, 10).toArray().toString()).toEqual('1,2,3,4,5,6,7,8,9,10');
    });

    it('Repeat', () => {
        const test = Enumerable.repeat('I like programming', 3);
        expect(test.elementAt(0)).toBe('I like programming');
        expect(test.elementAt(1)).toBe('I like programming');
        expect(test.elementAt(2)).toBe('I like programming');
        expect(test.elementAt(3)).toBeUndefined();
    })

});
