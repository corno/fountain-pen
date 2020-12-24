import { Block } from "./Block"

interface IInArray<T> {
    forEach(callback: (element: T) => void): void
}

export type InlineSegment =
    | string
    | (() => Block) //indent
    | IInArray<InlineSegment>
