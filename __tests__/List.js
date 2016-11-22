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

    test('toLookup', () => {
        // create a list of Packages
        const packages: List<Package> = new List([
            {
                company: 'Coho Vineyard',
                trackingNumber: 89453312,
                weight: 25.2
            },
            {
                company: 'Lucerne Publishing',
                trackingNumber: 89112755,
                weight: 18.7
            },
            {
                company: 'Wingtip Toys',
                trackingNumber: 299456122,
                weight: 6.0
            },
            {
                company: 'Contoso Pharmaceuticals',
                trackingNumber: 670053128,
                weight: 9.3
            },
            {
                company: 'Wide World Importers',
                trackingNumber: 4665518773,
                weight: 33.8
            }
        ]);

        // create a Lookup to organize the packages.
        // use the first character of Company as the key value.
        // select Company appended to TrackingNumber
        // as the element values of the Lookup.
        const lookup = packages
            .toLookup(p => p.company.substring(0, 1),
            p => `${p.company} ${p.trackingNumber}`);
        const result = {
            'C': [
                'Coho Vineyard 89453312',
                'Contoso Pharmaceuticals 670053128'
            ],
            'L': [
                'Lucerne Publishing 89112755'
            ],
            'W': [
                'Wingtip Toys 299456122',
                'Wide World Importers 4665518773'
            ]
        };
        expect(lookup).toEqual(result);
    });

    test('union', () => {
        const expected = '5,3,9,7,8,6,4,1,0';
        const ints1: List<number> = new List([5, 3, 9, 7, 5, 9, 3, 7]);
        const ints2: List<number> = new List([8, 3, 6, 4, 4, 9, 1, 0]);
        expect(ints1.union(ints2).toArray().toString()).toBe(expected);

        // TODO: give default equality comparer for objects
        // expect(store1.union(store2).toArray()).toEqual(result);
    });

});
