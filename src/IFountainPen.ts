
export interface IInArray<T> {
    forEach(callback: (element: T) => void): void
}

export interface IInlineParts extends IInArray<InlinePart> { }

export class IInlineSection {
    public readonly isParts: IInArray<InlinePart>
    constructor(parts: IInArray<InlinePart>) {
        this.isParts = parts
    }
}

export type ParagraphPart =
    | string
    | IInlineSection
    | (() => IParagraph) //indent
    | IParagraph

export interface IParagraph extends IInArray<ParagraphPart> { }

export type InlinePart =
    | string
    | (() => IParagraph) //indent
    | IInlineSection

/**
 * writes the array of 3 kinds of arguments and ends in a newline
 * @param args variadic array of 3 kinds of arguments
 * 1) a text snippet
 * 2) an indentation instruction (a closure where everything that is written in the closure is indented one level more than the current level)
 * 3) an anonymous function call (a closure where everything that is written in the closure is still on the same level)
 */
export function paragraph(args: IParagraph): IParagraph {
    return args
}

/**
 * same as 'write' but without a line ending for the last argument
 * @param args
 */
export function line(args: IInlineParts): IInlineSection {
    return new IInlineSection(args)
}

export function token(tok: InlinePart): IInlineSection {
    return new IInlineSection([tok])
}
