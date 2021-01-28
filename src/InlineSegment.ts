import { Block } from "./Block"
import { IInArray } from "./IInArray"


export type InlineSegment =
    | string
    | (() => Block) //indent
    | IInArray<InlineSegment>
    | null //this will be ignored, it is helpful for when you want to conditionally write an inline segment: condition ? `my output` : null
