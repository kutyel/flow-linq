// @flow

import List from '../src/List';

type Package = {
    company: string;
    weight: number;
    trackingNumber: number;
};

type Person = {
    name: string;
    age: number;
};

type Pet = {
    name: string;
    age: number;
    owner?: Person;
    vaccinated?: boolean;
};

type PetOwner = {
    name: string;
    pets: List<Pet>
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
        expect(list.toArray()).toEqual([1, 2, 3, 4, 5]);
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
        expect(
            pets.any(pet => !!pet.age && pet.age > 1 && !pet.vaccinated)
        ).toBe(true);
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

    test('concat', () => {
        const cats: List<Pet> = new List([
            { age: 8, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 1, name: 'Whiskers' }
        ]);
        const dogs: List<Pet> = new List([
            { age: 3, name: 'Bounder' },
            { age: 14, name: 'Snoopy' },
            { age: 9, name: 'Fido' }
        ]);
        expect(cats.select(cat => cat.name)
            .concat(dogs.select(dog => dog.name)).toArray())
            .toEqual([
                'Barley',
                'Boots',
                'Whiskers',
                'Bounder',
                'Snoopy',
                'Fido'
            ]);
    });

    test('contains', () => {
        const fruits: List<string> = new List([
            'apple',
            'banana',
            'mango',
            'orange',
            'passionfruit',
            'grape'
        ]);
        expect(fruits.contains('mango')).toBe(true);
    });

    test('count', () => {
        const fruits: List<string> = new List([
            'apple',
            'banana',
            'mango',
            'orange',
            'passionfruit',
            'grape'
        ]);
        expect(fruits.count()).toBe(6);
        expect(fruits.count(x => x.length > 5)).toBe(3);
    });

    test('defaultIfEmpty', () => {
        const defaultPet: Pet = { age: 0, name: 'Default Pet' };
        const pets: List<Pet> = new List([
            { age: 8, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 1, name: 'Whiskers' }
        ]);
        expect(pets
            .defaultIfEmpty(defaultPet)
            .select(pet => pet.name)
            .toArray()
        ).toEqual(['Barley', 'Boots', 'Whiskers']);
        const pets2: List<Pet> = new List();
        expect(pets2.defaultIfEmpty(defaultPet).first()).toEqual(defaultPet);
    });

    test('distinct', () => {
        const ages: List<number> = new List([21, 46, 46, 55, 17, 21, 55, 55]);
        expect(ages.distinct().toArray()).toEqual([21, 46, 55, 17]);
    });

    test('elementAt', () => {
        const names: List<string> = new List(['Hartono', 'Adams', 'Andersen']);
        expect(names.elementAt(0)).toBe('Hartono');
        expect(names.elementAt(3)).toThrowError();
    });

    test('elementAtOrDefault', () => {
        const names: List<string> = new List(['Hartono', 'Adams', 'Andersen']);
        expect(names.elementAtOrDefault(0)).toBe('Hartono');
        expect(names.elementAtOrDefault(3)).toBeUndefined();
    });

    test('except', () => {
        const numbers: List<number> = new List([2.0, 2.1, 2.2, 2.3, 2.4, 2.5]);
        const numbers2: List<number> = new List([2.2, 2.3]);
        expect(numbers.except(numbers2).toArray()).toEqual([2, 2.1, 2.4, 2.5]);
    });

    test('first', () => {
        expect(new List(['hey', 'whats', 'is', 'up']).first()).toBe('hey');
        expect(new List([1, 2, 3, 4, 5]).first(x => x > 2)).toBe(3);
        expect(new List().first()).toBeUndefined();
    });

    test('firstOrDefault', () => {
        expect(new List([1, 2, 3, 4, 5]).firstOrDefault()).toBe(1);
        expect(new List().firstOrDefault()).toBeUndefined;
    });

    test('forEach', () => {
        const names: List<string> = new List(['Bruce', 'Alfred', 'Richard']);
        names.forEach((name, i) => expect(name).toBe(names.elementAt(i)));
    });

    test('groupBy', () => {
        const pets: List<Pet> = new List([
            { age: 8, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 1, name: 'Whiskers' },
            { age: 4, name: 'Daisy' }
        ]);
        const result = {
            '1': ['Whiskers'],
            '4': ['Boots', 'Daisy'],
            '8': ['Barley']
        };
        expect(pets.groupBy(pet => pet.age, pet => pet.name)).toEqual(result);
    });

    test('groupJoin', () => {
        const magnus: Person = { age: 22, name: 'Hedlund, Magnus' };
        const terry: Person = { age: 23, name: 'Adams, Terry' };
        const charlotte: Person = { age: 24, name: 'Weiss, Charlotte' };

        const barley: Pet = { age: 8, name: 'Barley', owner: terry };
        const boots: Pet = { age: 4, name: 'Boots', owner: terry };
        const whiskers: Pet = { age: 1, name: 'Whiskers', owner: charlotte };
        const daisy: Pet = { age: 4, name: 'Daisy', owner: magnus };

        const people: List<Person> = new List([magnus, terry, charlotte]);
        const pets: List<Pet> = new List([barley, boots, whiskers, daisy]);

        // create a list where each element is an anonymous
        // type that contains a person's name and
        // a collection of names of the pets they own.
        const query = people.groupJoin(
            pets, person => person,
            pet => pet.owner,
            (person, petCollection) => ({
                ownerName: person.name,
                pets: petCollection.select(pet => pet.name)
            })
        );
        const result = [
            'Hedlund, Magnus: Daisy',
            'Adams, Terry: Barley,Boots',
            'Weiss, Charlotte: Whiskers'
        ];
        expect(query
            .select(obj => `${obj.ownerName}: ${obj.pets.toArray()}`).toArray()
        ).toEqual(result);
    });

    test('indexOf', () => {
        const fruits: List<string> = new List([
            'apple',
            'banana',
            'mango',
            'orange',
            'passionfruit',
            'grape'
        ]);
        const barley: Pet = { age: 8, name: 'Barley', vaccinated: true };
        const boots: Pet = { age: 4, name: 'Boots', vaccinated: false };
        const whiskers: Pet = { age: 1, name: 'Whiskers', vaccinated: false };
        const pets: List<Pet> = new List([barley, boots, whiskers]);

        expect(fruits.indexOf('orange')).toBe(3);
        expect(fruits.indexOf('strawberry')).toBe(-1);
        expect(pets.indexOf(boots)).toBe(1);
    });

    test('insert', () => {
        const ERROR = /Index is out of range./;
        const pets: List<Pet> = new List([
            { age: 10, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 6, name: 'Whiskers' }
        ]);
        const newPet: Pet = { age: 12, name: 'Max' };

        pets.insert(0, newPet);
        pets.insert(pets.count(), newPet);

        expect(pets.first()).toEqual(newPet);
        expect(pets.last()).toEqual(newPet);
        expect(() => pets.insert(-1, newPet)).toThrowError(ERROR);
        expect(
            () => pets.insert(pets.count() + 1, newPet)
        ).toThrowError(ERROR);
    });

    test('intersect', () => {
        const id1: List<number> = new List([44, 26, 92, 30, 71, 38]);
        const id2: List<number> = new List([39, 59, 83, 47, 26, 4, 30]);
        expect(id1.intersect(id2).toArray()).toEqual([26, 30]);
    });

    test('join', () => {
        const magnus: Person = { age: 22, name: 'Hedlund, Magnus' };
        const terry: Person = { age: 23, name: 'Adams, Terry' };
        const charlotte: Person = { age: 24, name: 'Weiss, Charlotte' };

        const barley: Pet = { age: 8, name: 'Barley', owner: terry };
        const boots: Pet = { age: 4, name: 'Boots', owner: terry };
        const whiskers: Pet = { age: 1, name: 'Whiskers', owner: charlotte };
        const daisy: Pet = { age: 4, name: 'Daisy', owner: magnus };

        const people: List<Person> = new List([magnus, terry, charlotte]);
        const pets: List<Pet> = new List([barley, boots, whiskers, daisy]);

        // create a list of Person-Pet pairs where
        // each element is an anonymous type that contains a
        // pet's name and the name of the Person that owns the Pet.
        const query = people.join(
            pets,
            person => person,
            pet => pet.owner,
            (person, pet) =>
                ({ ownerName: person.name, pet: pet.name })
        );
        const result = [
            'Hedlund, Magnus - Daisy',
            'Adams, Terry - Barley',
            'Adams, Terry - Boots',
            'Weiss, Charlotte - Whiskers'
        ];
        expect(
            query.select(obj => `${obj.ownerName} - ${obj.pet}`).toArray()
        ).toEqual(result);
    });

    test('last', () => {
        expect(new List(['what', 'is', 'up']).last()).toBe('up');
        expect(new List([1, 2, 3, 4, 5]).last(x => x > 2)).toBe(5);
        expect(new List().last()).toThrowError();
    });

    test('lastOrDefault', () => {
        expect(new List(['what', 'is', 'up']).lastOrDefault()).toBe('up');
        expect(new List().lastOrDefault()).toBeUndefined();
    });

    test('max', () => {
        const pets: List<Pet> = new List([
            { age: 8, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 1, name: 'Whiskers' },
            { age: 4, name: 'Daisy' }
        ]);
        expect(new List([1, 2, 3, 4, 5]).max()).toBe(5);
        expect(pets.max(pet => pet.age).name).toBe('Barley');
    });

    test('min', () => {
        const pets: List<Pet> = new List([
            { age: 8, name: 'Barley' },
            { age: 4, name: 'Boots' },
            { age: 1, name: 'Whiskers' },
            { age: 4, name: 'Daisy' }
        ]);
        expect(new List([1, 2, 3, 4, 5]).min()).toBe(1);
        expect(pets.min(pet => pet.age).name).toBe('Whiskers');
    });

    test('orderBy', () => {
        expect(
            new List([4, 5, 6, 3, 2, 1]).orderBy(x => x).toArray()
        ).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('orderByDescending', () => {
        expect(
            new List([4, 5, 6, 3, 2, 1]).orderByDescending(x => x).toArray()
        ).toEqual([6, 5, 4, 3, 2, 1]);
    });

    test('thenBy', () => {
        const fruits: List<string> = new List([
            'grape',
            'passionfruit',
            'banana',
            'mango',
            'orange',
            'raspberry',
            'apple',
            'blueberry'
        ]);
        // sort the strings first by their length and then
        // alphabetically by passing the identity selector function.
        const result: string[] = [
            'apple',
            'grape',
            'mango',
            'banana',
            'orange',
            'blueberry',
            'raspberry',
            'passionfruit'
        ];
        expect(fruits
            .orderBy(fruit => fruit.length)
            .thenBy(fruit => fruit)
            .toArray()
        ).toEqual(result);
        // test omission of OrderBy
        expect(
            new List([4, 5, 6, 3, 2, 1]).thenBy(x => x).toArray()
        ).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('thenByMultiple', () => {
        const x = { a: 2, b: 1, c: 1 };
        const y = { a: 1, b: 2, c: 2 };
        const z = { a: 1, b: 1, c: 3 };
        const unsorted = new List([x, y, z]);
        const sorted = unsorted.orderBy(u => u.a)
            .thenBy(u => u.b)
            .thenBy(u => u.c)
            .toArray();

        expect(sorted[0]).toEqual(z);
        expect(sorted[1]).toEqual(y);
        expect(sorted[2]).toEqual(x);
    });

    test('thenByDescending', () => {
        const fruits: List<string> = new List([
            'grape',
            'passionfruit',
            'banana',
            'mango',
            'orange',
            'raspberry',
            'apple',
            'blueberry'
        ]);
        // sort the strings first by their length and then
        // alphabetically descending by passing the identity selector function.
        const result: string[] = [
            'mango',
            'grape',
            'apple',
            'orange',
            'banana',
            'raspberry',
            'blueberry',
            'passionfruit'
        ];
        expect(fruits
            .orderBy(fruit => fruit.length)
            .thenByDescending(fruit => fruit)
            .toArray()
        ).toEqual(result);
        expect(
            new List([4, 5, 6, 3, 2, 1]).thenByDescending(x => x).toArray()
        ).toEqual([6, 5, 4, 3, 2, 1]);
    });

    test('remove', () => {
        const fruits: List<string> = new List([
            'apple',
            'banana',
            'mango',
            'orange',
            'passionfruit',
            'grape'
        ]);

        const barley: Pet = { age: 8, name: 'Barley', vaccinated: true };
        const boots: Pet = { age: 4, name: 'Boots', vaccinated: false };
        const whiskers: Pet = { age: 1, name: 'Whiskers', vaccinated: false };
        const pets: List<Pet> = new List([barley, boots, whiskers]);
        const lessPets: List<Pet> = new List([barley, whiskers]);

        expect(fruits.remove('orange')).toBe(true);
        expect(fruits.remove('strawberry')).toBe(false);
        expect(pets.remove(boots)).toBe(true);
        expect(pets).toEqual(lessPets);
    });

    test('removeAll', () => {
        const dinosaurs: List<string> = new List([
            'Compsognathus',
            'Amargasaurus',
            'Oviraptor',
            'Velociraptor',
            'Deinonychus',
            'Dilophosaurus',
            'Gallimimus',
            'Triceratops'
        ]);
        const lessDinosaurs: List<string> = new List([
            'Compsognathus',
            'Oviraptor',
            'Velociraptor',
            'Deinonychus',
            'Gallimimus',
            'Triceratops'
        ]);
        expect(
            dinosaurs.removeAll(x => x.endsWith('saurus'))
        ).toEqual(lessDinosaurs);
    });

    test('removeAt', () => {
        const dinosaurs: List<string> = new List([
            'Compsognathus',
            'Amargasaurus',
            'Oviraptor',
            'Velociraptor',
            'Deinonychus',
            'Dilophosaurus',
            'Gallimimus',
            'Triceratops'
        ]);
        const lessDinosaurs: List<string> = new List([
            'Compsognathus',
            'Amargasaurus',
            'Oviraptor',
            'Deinonychus',
            'Dilophosaurus',
            'Gallimimus',
            'Triceratops'
        ]);
        dinosaurs.removeAt(3);
        expect(dinosaurs).toEqual(lessDinosaurs);
    });

    test('reverse', () => {
        expect(new List([1, 2, 3, 4, 5]).reverse().toArray(), [5, 4, 3, 2, 1]);
    });

    test('select', () => {
        expect(new List([1, 2, 3]).select(x => x * 2).toArray(), [2, 4, 6]);
    });

    test('selectMany', () => {
        const pets: List<Pet> = new List([
            { age: 1, name: 'Scruffy' },
            { age: 2, name: 'Sam' }
        ]);
        const morePets: List<Pet> = new List([
            { age: 3, name: 'Walker' },
            { age: 4, name: 'Sugar' }
        ]);
        const evenMorePets: List<Pet> = new List([
            { age: 5, name: 'Scratches' },
            { age: 6, name: 'Diesel' }
        ]);
        const petOwners: List<PetOwner> = new List([
            { name: 'Higa, Sidney', pets },
            { name: 'Ashkenazi, Ronen', pets: morePets },
            { name: 'Price, Vernette', pets: evenMorePets }
        ]);
        const result = [
            'Scruffy',
            'Sam',
            'Walker',
            'Sugar',
            'Scratches',
            'Diesel'
        ];
        expect(petOwners
            .selectMany(petOwner => petOwner.pets)
            .select(pet => pet.name)
            .toArray()
        ).toEqual(result);
    });

    test('sequenceEqual', () => {
        const pet1: Pet = { age: 2, name: 'Turbo' };
        const pet2: Pet = { age: 8, name: 'Peanut' };

        // create three lists of pets.
        const pets1: List<Pet> = new List([pet1, pet2]);
        const pets2: List<Pet> = new List([pet1, pet2]);
        const pets3: List<Pet> = new List([pet1]);

        expect(pets1.sequenceEqual(pets2)).toBe(true);
        expect(pets1.sequenceEqual(pets3)).toBe(false);
    });

    test('single', () => {
        const reg = /The collection does not contain exactly one element./;
        const fruits1: List<string> = new List();
        const fruits2: List<string> = new List(['orange']);
        const fruits3: List<string> = new List(['orange', 'apple']);
        expect(fruits2.single()).toBe('orange');
        expect(() => fruits1.single()).toThrowError(reg);
        expect(() => fruits3.single()).toThrowError(reg);
    });

    test('singleOrDefault', () => {
        const reg = /The collection does not contain exactly one element./;
        const fruits1: List<string> = new List();
        const fruits2: List<string> = new List(['orange']);
        const fruits3: List<string> = new List(['orange', 'apple']);
        expect(fruits1.singleOrDefault()).toBeUndefined();
        expect(fruits2.singleOrDefault()).toBe('orange');
        expect(() => fruits3.singleOrDefault()).toThrowError(reg);
    });

    test('skip', () => {
        const grades: List<number> = new List([59, 82, 70, 56, 92, 98, 85]);
        expect(grades
            .orderByDescending(x => x)
            .skip(3)
            .toArray()
        ).toEqual([82, 70, 59, 56]);
    });

    test('skipWhile', () => {
        const grades: List<number> = new List([59, 82, 70, 56, 92, 98, 85]);
        expect(grades
            .orderByDescending(x => x)
            .skipWhile(g => g >= 80)
            .toArray()
        ).toEqual([70, 59, 56]);
    });

    test('sum', () => {
        const people: List<Person> = new List([
            { age: 15, name: 'Cathy' },
            { age: 25, name: 'Alice' },
            { age: 50, name: 'Bob' }
        ]);
        expect(new List([2, 3, 5]).sum()).toBe(10);
        expect(people.sum(x => x.age)).toBe(90);
    });

    test('take', () => {
        const grades: List<number> = new List([59, 82, 70, 56, 92, 98, 85]);
        expect(grades
            .orderByDescending(x => x)
            .take(3)
            .toArray()
        ).toEqual([98, 92, 85]);
    });

    test('takeWhile', () => {
        const fruits: List<string> = new List([
            'apple',
            'banana',
            'mango',
            'orange',
            'passionfruit',
            'grape'
        ]);
        expect(
            fruits.takeWhile(fruit => fruit !== 'orange').toArray()
        ).toEqual(['apple', 'banana', 'mango']);
    });

    test('toArray', () => {
        expect(new List([1, 2, 3, 4, 5]).toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    test('toDictionary', () => {
        const people: List<Person> = new List([
            { age: 15, name: 'Cathy' },
            { age: 25, name: 'Alice' },
            { age: 50, name: 'Bob' }
        ]);
        const dictionary = people.toDictionary(x => x.name);
        expect(dictionary.Bob).toEqual({ age: 50, name: 'Bob' });
        const dictionary2 = people.toDictionary(x => x.name, y => y.age);
        expect(dictionary2.Alice).toBe(25);
    });

    test('toList', () => {
        expect(new List([1, 2, 3]).toList().toArray()).toEqual([1, 2, 3]);
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
        const expected = [5, 3, 9, 7, 8, 6, 4, 1, 0];
        const ints1: List<number> = new List([5, 3, 9, 7, 5, 9, 3, 7]);
        const ints2: List<number> = new List([8, 3, 6, 4, 4, 9, 1, 0]);
        expect(ints1.union(ints2).toArray()).toEqual(expected);

        // TODO: give default equality comparer for objects
        // expect(store1.union(store2).toArray()).toEqual(result);
    });

    test('where', () => {
        const fruits: List<string> = new List([
            'apple',
            'passionfruit',
            'banana',
            'mango',
            'orange',
            'blueberry',
            'grape',
            'strawberry'
        ]);
        expect(fruits.where(fruit => fruit.length < 6).toArray())
            .toEqual(['apple', 'mango', 'grape']);
    });

    test('zip', () => {
        const numbers: List<number> = new List([1, 2, 3, 4]);
        const words: List<string> = new List(['one', 'two', 'three']);
        expect(numbers
            .zip(words, (first, second) => `${first} ${second}`).toArray()
        ).toEqual(['1 one', '2 two', '3 three']);

        // larger second array
        const numbers2: List<number> = new List([1, 2, 3, 4]);
        const words2: List<string> = new List(['one', 'two', 'three']);
        expect(words2
            .zip(numbers2, (first, second) => `${first} ${second}`).toArray()
        ).toEqual(['one 1', 'two 2', 'three 3']);
    });

    test('where().select()', () => {
        expect(new List([1, 2, 3, 4, 5])
            .where(x => x > 3)
            .select(y => y * 2)
            .toArray()
        ).toEqual([8, 10]);
        expect(new List([1, 2, 3, 4, 5])
            .where(x => x > 3)
            .select(y => y + 'a')
            .toArray()
        ).toEqual(['4a', '5a']);
    });

});
