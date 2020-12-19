import { IParagraph } from "./Paragraph"

interface IInArray<T> {
    forEach(callback: (element: T) => void): void
}

export type InlinePart =
    | string
    | (() => IParagraph) //indent
    | IInArray<InlinePart>
