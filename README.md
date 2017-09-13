# flow-linq

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Node version](https://img.shields.io/node/v/flow-linq.svg?style=flat-square)](https://www.npmjs.org/package/flow-linq)
[![Build Status](https://img.shields.io/travis/kutyel/flow-linq/master.svg?style=flat-square)](https://travis-ci.org/kutyel/flow-linq)
[![Coverage Status](https://img.shields.io/coveralls/kutyel/flow-linq.svg?style=flat-square)](https://coveralls.io/github/kutyel/flow-linq)
[![Dependency status](https://img.shields.io/david/kutyel/flow-linq.svg?style=flat-square)](https://david-dm.org/kutyel/flow-linq)
[![Dev Dependencies Status](https://img.shields.io/david/dev/kutyel/flow-linq.svg?style=flat-square)](https://david-dm.org/kutyel/flow-linq#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/flow-linq.svg?style=flat-square)](https://www.npmjs.org/package/flow-linq)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/flaviocorpa)

Another LINQ implementation in JavaScript, but with Flow annotations!

[![flow-linq](https://raw.githubusercontent.com/kutyel/flow-linq/master/flow-linq.png)](https://flow.org/en/)

## Install
```sh
$ npm install --save flow-linq
```
## Usage
```ts
import { List } from 'flow-linq'

const cats: List<Pet> = new List([
  { age: 8, name: 'Barley' },
  { age: 4, name: 'Boots' },
  { age: 1, name: 'Whiskers' },
])

cats
  .where(cat => cat.age > 3)
  .select(cat => cat.name)
  .toArray() // > ['Barley', 'Boots']
```
## Demo
```ts
// TODO: fancy gif here 😎
```
## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
