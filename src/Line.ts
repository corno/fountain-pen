import { InlinePart } from "./InlinePart"

interface IInArray<T> {
    forEach(callback: (element: T) => void): void
}

export class Line {
    public readonly isParts: IInArray<InlinePart>
    constructor(parts: IInArray<InlinePart>) {
        this.isParts = parts
    }
}

export function line(args: IInArray<InlinePart>): Line {
    return new Line(args)
}
