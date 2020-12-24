/* eslint
    "@typescript-eslint/no-empty-interface": off,
*/

import { Line } from "./Line"

interface IInArray<T> {
    forEach(callback: (element: T) => void): void
}

export type Block =
    | string
    | Line
    | (() => Block) //indented block
    | IInArray<Block> //nested block (will be flattened)
