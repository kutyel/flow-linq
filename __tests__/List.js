// @flow

import List from '../src/List';

type Package = {
    company: string;
    weight: number;
    trackingNumber: number;
};

type Person = {
    name: string;
    age?: number;
};

type Pet = {
    name: string;
    age?: number;
    owner?: Person;
    vaccinated?: boolean;
}

type Product = {
    name: string;
    code: number;
};

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

    it('aggregate', () => {
        const sentence = 'the quick brown fox jumps over the lazy dog';
        const reversed = 'dog lazy the over jumps fox brown quick the ';
        const words: List<string> = new List(sentence.split(' '));
        expect(
            words.aggregate((workingSentence, next) =>
            `${next} ${workingSentence}`, '')).toEqual(reversed);
    });

    it('all', () => {
        const pets: List<Pet> = new List([
            { age: 10, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 6, name: 'Whiskers' }
        ]);
        expect(pets.all(pet => pet.name.startsWith('B'))).toBe(false);
    });

});
