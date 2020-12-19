Fountain-pen
===============

[![npm package][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Coverage Status][coveralls-image]][coveralls-url] 
[![Dependencies Status][david-image]][david-url]

Fountain-pen is a simple package that helps to create templates that need to be serialized to text


Usage example (see the examples directory):
```typescript
import * as fp from "fountain-pen"

const myLine = fp.line([ //the fp.line function concatenates all content on one line, except for indented content
    "Foo",
    "Bar", //this will be concatenated to the previous part ("Foo")
    [ //the elements in this nested array will be treated as elements in the outer array (this inner array will be flattened)
        "a nested array element",
    ],
    () => { //a callback is interpreted as an indented block of code
        return [
            "indented",
        ]
    },
])

const myParagraph = [
    myLine,
    "another line",
]

fp.serialize(
    myParagraph, //the paragraph to serialize
    "   ",  //the indentation (usually 4 spaces or a tab)
    true, //trim whitespace at the end of a line?
    lineOut => { //callback which is called for each individual generated line
        console.log(lineOut)
    }
)


/*
output:
FooBara nested array of inline parts
   indented
another line
*/
```

## Installation
Install locally:
```
npm install fountain-pen
```
Or install globally:
```
npm install -g fountain-pen
```

**Note**: Node 10 or higher runtime required.

[npm-image]:https://img.shields.io/npm/v/fountain-pen.svg
[npm-url]:http://npmjs.org/package/fountain-pen
[travis-image]:https://travis-ci.org/corno/fountain-pen.svg?branch=master
[travis-url]:https://travis-ci.org/corno/fountain-pen
[david-image]:https://david-dm.org/corno/fountain-pen/status.svg
[david-url]:https://david-dm.org/corno/fountain-pen
[coveralls-image]:https://coveralls.io/repos/github/corno/fountain-pen/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/corno/fountain-pen?branch=master