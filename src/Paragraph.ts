/* eslint
    "@typescript-eslint/no-empty-interface": off,
*/

import { Line } from "./Line"

interface IInArray<T> {
    forEach(callback: (element: T) => void): void
}

export type ParagraphPart =
    | string
    | Line
    | (() => IParagraph) //indent
    | IParagraph

export interface IParagraph extends IInArray<ParagraphPart> { }
