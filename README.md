Fountain-pen
===============

[![npm package][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Coverage Status][coveralls-image]][coveralls-url] 
[![Dependencies Status][david-image]][david-url]

Fountain-pen is a simple package that helps to create templates that need to be serialized to text

there are 3 types
* *Block*. this is the topmost type and is the only one that can be directly serialized. A block can be 1 of 4 things: a Line, a literal string (which will be interpreted as a line), an Array of Blocks (which will be flattened), or a indented Block (indicated by a callback)
* *Line*. created with fp.line(...). This wraps an InlineSegment so that it can be used in a Block
* *InlineSegment*. this is the bottommost type. An InlineSegment can be 1 of 3 things: a string (which will be concatenated on the same line to the other InlineSegments, if present), an Array of Inline Segments (which will be flattened), an indented Block (indicated by a callback). This might be counter intuitive at first; How can a InlineSegment contain a full Block. The rationale is that a line can virtually continue after a block is finished, the most common ocurrence of this is when there is a block of code where the opening bracket/parenthesis is not literally on same line, but conceptually they are tied together. See the 'myFunction' example below


Usage example (see the examples directory):
```typescript
import * as fp from "fountain-pen"
const myLine = fp.line([ //the fp.line function concatenates all content on one line, except for indented content
    "Foo",
    "Bar", //this will be concatenated to the previous snippet
    [ //the elements in this nested array will be treated as elements in the outer array (this inner array will be flattened)
        "a nested array element",
    ],
    () => {
        return [
            "indented",
        ]
    },
])

const myBlock = [
    myLine,
    "another line",
    '',
    fp.line([
        'myFunction (',
        () => {
            return "//indented arguments"
        },
        ') {',
        () => {
            return "//indented statements"
        },
        '}',
    ]),
]

fp.serialize(
    myBlock, //the paragraph to serialize
    "   ",  //the indentation (usually 4 spaces or a tab)
    true, //trim whitespace at the end of a line?
    lineOut => { //callback which is called for each individual generated line
        console.log(lineOut)
    }
)

/*
output:
FooBara nested array element
   indented
another line

myFunction (
   //indented arguments
) {
   //indented statements
}
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