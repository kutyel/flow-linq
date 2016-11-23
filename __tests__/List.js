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
        const magnus: Person = { name: 'Hedlund, Magnus' };
        const terry: Person = { name: 'Adams, Terry' };
        const charlotte: Person = { name: 'Weiss, Charlotte' };

        const barley: Pet = { name: 'Barley', owner: terry };
        const boots: Pet = { name: 'Boots', owner: terry };
        const whiskers: Pet = { name: 'Whiskers', owner: charlotte };
        const daisy: Pet = { name: 'Daisy', owner: magnus };

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

    // test('IndexOf', () => {
    //     const fruits = new List<string>(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

    //     const barley = new Pet({ Age: 8, Name: 'Barley', Vaccinated: true });
    //     const boots = new Pet({ Age: 4, Name: 'Boots', Vaccinated: false });
    //     const whiskers = new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false });
    //     const pets = new List<Pet>([barley, boots, whiskers]);

    //     t.is(fruits.IndexOf('orange'), 3);
    //     t.is(fruits.IndexOf('strawberry'), -1);
    //     t.is(pets.IndexOf(boots), 1);
    // });

    // test('Intersect', () => {
    //     const id1 = new List<number>([44, 26, 92, 30, 71, 38]);
    //     const id2 = new List<number>([39, 59, 83, 47, 26, 4, 30]);
    //     t.is(id1.Intersect(id2).Sum(x => x), 56);
    // });

    // test('Join', () => {
    //     const magnus = new Person({ Name: 'Hedlund, Magnus' });
    //     const terry = new Person({ Name: 'Adams, Terry' });
    //     const charlotte = new Person({ Name: 'Weiss, Charlotte' });

    //     const barley = new Pet({ Name: 'Barley', Owner: terry });
    //     const boots = new Pet({ Name: 'Boots', Owner: terry });
    //     const whiskers = new Pet({ Name: 'Whiskers', Owner: charlotte });
    //     const daisy = new Pet({ Name: 'Daisy', Owner: magnus });

    //     const people = new List<Person>([magnus, terry, charlotte]);
    //     const pets = new List<Pet>([barley, boots, whiskers, daisy]);

    //     // create a list of Person-Pet pairs where
    //     // each element is an anonymous type that contains a
    //     // pet's name and the name of the Person that owns the Pet.
    //     const query = people.Join(pets, person => person, pet => pet.Owner, (person, pet) =>
    //         ({ OwnerName: person.Name, Pet: pet.Name }));
    //     const result = 'Hedlund, Magnus - Daisy,Adams, Terry - Barley,Adams, Terry - Boots,Weiss, Charlotte - Whiskers';
    //     t.is(query.Select(obj => `${obj.OwnerName} - ${obj.Pet}`).toArray(), result);
    // });

    // test('Last', () => {
    //     t.is(new List<string>(['hey', 'hola', 'que', 'tal']).Last(), 'tal');
    //     t.is(new List<number>([1, 2, 3, 4, 5]).Last(x => x > 2), 5);
    //     t.falsy(new List<string>().Last());
    // });

    // test('LastOrDefault', () => {
    //     t.is(new List<string>(['hey', 'hola', 'que', 'tal']).LastOrDefault(), 'tal');
    //     t.is(new List<string>().LastOrDefault(), undefined);
    // });

    // test('Max', () => {
    //     t.is(new List<number>([1, 2, 3, 4, 5]).Max(), 5);
    // });

    // test('Min', () => {
    //     t.is(new List<number>([1, 2, 3, 4, 5]).Min(), 1);
    // });

    // test('OrderBy', () => {
    //     t.is(new List<number>([4, 5, 6, 3, 2, 1]).OrderBy(x => x).toArray(), '1,2,3,4,5,6');
    // });

    // test('OrderByDescending', () => {
    //     t.is(new List<number>([4, 5, 6, 3, 2, 1]).OrderByDescending(x => x).toArray(), '6,5,4,3,2,1');
    // });

    // test('ThenBy', () => {
    //     const fruits = new List<string>(['grape', 'passionfruit', 'banana', 'mango', 'orange', 'raspberry', 'apple', 'blueberry']);

    //     // sort the strings first by their length and then
    //     // alphabetically by passing the identity selector function.
    //     const result = 'apple,grape,mango,banana,orange,blueberry,raspberry,passionfruit';
    //     t.is(fruits.OrderBy(fruit => fruit.length).ThenBy(fruit => fruit).toArray(), result);

    //     // test omission of OrderBy
    //     t.is(new List<number>([4, 5, 6, 3, 2, 1]).ThenBy(x => x).toArray(), '1,2,3,4,5,6');
    // });

    // // see https://github.com/kutyel/linq.ts/issues/23
    // test('ThenByMultiple', () => {
    //     let x = { a: 2, b: 1, c: 1 };
    //     let y = { a: 1, b: 2, c: 2 };
    //     let z = { a: 1, b: 1, c: 3 };
    //     let unsorted = new List([x, y, z]);
    //     let sorted = unsorted.OrderBy(u => u.a)
    //         .ThenBy(u => u.b)
    //         .ThenBy(u => u.c)
    //         .ToArray();

    //     t.is(sorted[0], z);
    //     t.is(sorted[1], y);
    //     t.is(sorted[2], x);
    // });

    // test('ThenByDescending', () => {
    //     const fruits = new List<string>(['grape', 'passionfruit', 'banana', 'mango', 'orange', 'raspberry', 'apple', 'blueberry']);

    //     // sort the strings first by their length and then
    //     // alphabetically descending by passing the identity selector function.
    //     const result = 'mango,grape,apple,orange,banana,raspberry,blueberry,passionfruit';
    //     t.is(fruits.OrderBy(fruit => fruit.length).ThenByDescending(fruit => fruit).toArray(), result);
    //     t.is(new List<number>([4, 5, 6, 3, 2, 1]).ThenByDescending(x => x).toArray(), '6,5,4,3,2,1');
    // });

    // test('Remove', () => {
    //     const fruits = new List<string>(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

    //     const barley = new Pet({ Age: 8, Name: 'Barley', Vaccinated: true });
    //     const boots = new Pet({ Age: 4, Name: 'Boots', Vaccinated: false });
    //     const whiskers = new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false });
    //     const pets = new List<Pet>([barley, boots, whiskers]);
    //     const lessPets = new List<Pet>([barley, whiskers]);

    //     t.true(fruits.Remove('orange'));
    //     t.false(fruits.Remove('strawberry'));
    //     t.true(pets.Remove(boots));
    //     t.deepEqual(pets, lessPets);
    // });

    // test('RemoveAll', () => {
    //     const dinosaurs = new List<string>([
    //         'Compsognathus',
    //         'Amargasaurus',
    //         'Oviraptor',
    //         'Velociraptor',
    //         'Deinonychus',
    //         'Dilophosaurus',
    //         'Gallimimus',
    //         'Triceratops'
    //     ]);
    //     const lessDinosaurs = new List<string>([
    //         'Compsognathus',
    //         'Oviraptor',
    //         'Velociraptor',
    //         'Deinonychus',
    //         'Gallimimus',
    //         'Triceratops'
    //     ]);
    //     t.deepEqual(dinosaurs.RemoveAll(x => x.endsWith('saurus')), lessDinosaurs);
    // });

    // test('RemoveAt', () => {
    //     const dinosaurs = new List<string>([
    //         'Compsognathus',
    //         'Amargasaurus',
    //         'Oviraptor',
    //         'Velociraptor',
    //         'Deinonychus',
    //         'Dilophosaurus',
    //         'Gallimimus',
    //         'Triceratops'
    //     ]);
    //     const lessDinosaurs = new List<string>([
    //         'Compsognathus',
    //         'Amargasaurus',
    //         'Oviraptor',
    //         'Deinonychus',
    //         'Dilophosaurus',
    //         'Gallimimus',
    //         'Triceratops'
    //     ]);
    //     dinosaurs.RemoveAt(3);
    //     t.deepEqual(dinosaurs, lessDinosaurs);
    // });

    // test('Reverse', () => {
    //     t.is(new List<number>([1, 2, 3, 4, 5]).Reverse().toArray(), '5,4,3,2,1');
    // });

    // test('Select', () => {
    //     t.is(new List<number>([1, 2, 3]).Select(x => x * 2).toArray(), '2,4,6');
    // });

    // test('SelectMany', () => {
    //     const petOwners = new List<PetOwner>([
    //         new PetOwner('Higa, Sidney', new List<Pet>([new Pet({ Name: 'Scruffy' }), new Pet({ Name: 'Sam' })])),
    //         new PetOwner('Ashkenazi, Ronen', new List<Pet>([new Pet({ Name: 'Walker' }), new Pet({ Name: 'Sugar' })])),
    //         new PetOwner('Price, Vernette', new List<Pet>([new Pet({ Name: 'Scratches' }), new Pet({ Name: 'Diesel' })]))
    //     ]);
    //     const result = 'Scruffy,Sam,Walker,Sugar,Scratches,Diesel';
    //     t.is(petOwners.SelectMany(petOwner => petOwner.Pets).Select(pet => pet.Name).toArray(), result);
    // });

    // test('SequenceEqual', () => {
    //     const pet1 = new Pet({ Age: 2, Name: 'Turbo' });
    //     const pet2 = new Pet({ Age: 8, Name: 'Peanut' });

    //     // create three lists of pets.
    //     const pets1 = new List<Pet>([pet1, pet2]);
    //     const pets2 = new List<Pet>([pet1, pet2]);
    //     const pets3 = new List<Pet>([pet1]);

    //     t.true(pets1.SequenceEqual(pets2));
    //     t.false(pets1.SequenceEqual(pets3));
    // });

    // test('Single', () => {
    //     const fruits1 = new List<string>();
    //     const fruits2 = new List<string>(['orange']);
    //     const fruits3 = new List<string>(['orange', 'apple']);
    //     t.is(fruits2.Single(), 'orange');
    //     t.throws(() => fruits1.Single(), /The collection does not contain exactly one element./);
    //     t.throws(() => fruits3.Single(), /The collection does not contain exactly one element./);
    // });

    // test('SingleOrDefault', () => {
    //     const fruits1 = new List<string>();
    //     const fruits2 = new List<string>(['orange']);
    //     const fruits3 = new List<string>(['orange', 'apple']);
    //     t.is(fruits1.SingleOrDefault(), undefined);
    //     t.is(fruits2.SingleOrDefault(), 'orange');
    //     t.throws(() => fruits3.SingleOrDefault(), /The collection does not contain exactly one element./);
    // });

    // test('Skip', () => {
    //     const grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    //     t.is(grades.OrderByDescending(x => x).Skip(3).toArray(), '82,70,59,56');
    // });

    // test('SkipWhile', () => {
    //     const grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    //     t.is(grades.OrderByDescending(x => x).SkipWhile(grade => grade >= 80).toArray(), '70,59,56');
    // });

    // test('Sum', () => {
    //     const people = new List<IPerson>([
    //         { Age: 15, Name: 'Cathy' },
    //         { Age: 25, Name: 'Alice' },
    //         { Age: 50, Name: 'Bob' }
    //     ]);
    //     t.is(new List<number>([2, 3, 5]).Sum(), 10);
    //     t.is(people.Sum(x => x.Age), 90);
    // });

    // test('Take', () => {
    //     const grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    //     t.is(grades.OrderByDescending(x => x).Take(3).toArray(), '98,92,85');
    // });

    // test('TakeWhile', () => {
    //     const fruits = new List<string>(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
    //     t.is(fruits.TakeWhile(fruit => fruit !== 'orange').toArray(), 'apple,banana,mango');
    // });

    // test('ToArray', () => {
    //     t.is(new List<number>([1, 2, 3, 4, 5]).toArray(), '1,2,3,4,5');
    // });

    // test('ToDictionary', () => {
    //     const people = new List<IPerson>([
    //         { Age: 15, Name: 'Cathy' },
    //         { Age: 25, Name: 'Alice' },
    //         { Age: 50, Name: 'Bob' }
    //     ]);
    //     const dictionary = people.ToDictionary(x => x.Name);
    //     t.deepEqual(dictionary['Bob'], { Age: 50, Name: 'Bob' });
    //     const dictionary2 = people.ToDictionary(x => x.Name, y => y.Age);
    //     t.is(dictionary2['Alice'], 25);
    // });

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
