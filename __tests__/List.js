import List from '../src/List';

describe('List class', () => {

    it('should create a List object without crashing', () => {
        expect(new List()).toBeTruthy();
    });

});
