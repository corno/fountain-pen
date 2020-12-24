/* eslint
    "no-console": "off"
*/

import * as fp from "../src"

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
