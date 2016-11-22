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
    age: number;
    owner?: Person;
    vaccinated?: boolean;
}

type Product = {
    name: string;
    code: number;
};

describe('List class', () => {

    test('add', () => {
        const string = 'string';
        const list: List<string> = new List();
        list.add(string);
        expect(list.first()).toBe(string);
    });

    test('addRange', () => {
        const list: List<number> = new List();
        list.addRange([1, 2, 3, 4, 5]);
        expect(list.toArray().toString()).toBe('1,2,3,4,5');
    });

    test('aggregate', () => {
        const sentence = 'the quick brown fox jumps over the lazy dog';
        const reversed = 'dog lazy the over jumps fox brown quick the ';
        const words: List<string> = new List(sentence.split(' '));
        expect(
            words.aggregate((workingSentence, next) =>
            `${next} ${workingSentence}`, '')).toEqual(reversed);
    });

    test('all', () => {
        const pets: List<Pet> = new List([
            { age: 10, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 6, name: 'Whiskers' }
        ]);
        // determine whether all pet names in the array start with 'B'.
        expect(pets.all(pet => pet.name.startsWith('B'))).toBe(false);
    });

    test('any', () => {
        const pets: List<Pet> = new List([
            { age: 10, name: 'Barley', vaccinated: true },
            { age: 4, name: 'Boots', vaccinated: false },
            { age: 6, name: 'Whiskers', vaccinated: false }
        ]);
        // determine whether any pets over age 1 are also unvaccinated.
        expect(pets.any(pet => pet.age > 1 && !pet.vaccinated)).toBe(true);
    });

    test('average', () => {
        const grades: List<number> = new List([78, 92, 100, 37, 81]);
        const people: List<Person> = new List([
            { age: 15, name: 'Cathy' },
            { age: 25, name: 'Alice' },
            { age: 50, name: 'Bob' }
        ]);
        expect(grades.average()).toEqual(77.6);
        expect(people.average(x => x.age)).toEqual(30);
    });

});
