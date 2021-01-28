/* eslint
    "@typescript-eslint/no-empty-interface": off,
*/

import { Line } from "./Line"
import { IInArray } from "./IInArray"

export type Block =
    | string
    | Line
    | (() => Block) //indented block
    | IInArray<Block> //nested block (will be flattened)
    | null //this will be ignored, it is helpful for when you want to conditionally write a line: condition ? `my output` : null
