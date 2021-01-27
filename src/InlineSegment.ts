import { Block } from "./Block"
import { IInArray } from "./IInArray"


export type InlineSegment =
    | string
    | (() => Block) //indent
    | IInArray<InlineSegment>
