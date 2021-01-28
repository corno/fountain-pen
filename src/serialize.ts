import { InlineSegment } from "./InlineSegment"
import { Line } from "./Line"
import { Block } from "./Block"

function trimRight(str: string) {
    let index = str.length
    while (str[index - 1] === " " || str[index - 1] === "\t") {
        index -= 1
    }
    return str.substring(0, index)
}

type Settings = {
    trimEndWhitespace: boolean
    lineWriter: (string: string) => void
    indentation: string
}

class Buffer {
    public readonly depth: number
    private buffer: string | null = null
    private readonly settings: Settings
    constructor(settings: Settings, depth: number) {
        this.settings = settings
        this.depth = depth
    }
    public flush() {
        if (this.buffer !== null) {
            const out = this.settings.trimEndWhitespace ? trimRight(this.buffer) : this.buffer
            this.settings.lineWriter(out)
        }
        this.buffer = null
    }
    public add(str: string) {
        if (this.buffer === null) {
            //nothing has been written yet
            this.buffer = ""
            //initialize and indent
            for (let i = 0; i !== this.depth; i += 1) {
                this.buffer += this.settings.indentation
            }
        }
        this.buffer += str
    }
}


/**
 *
 * @param indentation typically several spaces or a tab character
 * @param trimEndWhiteSpace if true, tabs and characters at the end of the line will be removed
 * @param lineWriter the callback to which the output will be sent, one line at the time
 */
export function serialize(
    p: Block,
    indentation: string,
    trimEndWhitespace: boolean,
    lineWriter: (string: string) => void
): void {
    const settings: Settings = {
        lineWriter: lineWriter,
        trimEndWhitespace: trimEndWhitespace,
        indentation: indentation,
    }
    serializeBlock(p, settings, 0)
}

function serializeBlock(block: Block, settings: Settings, depth: number) {
    if (block === null) {
        //do nothing
    } else if (typeof block === "string") {
        const buffer: Buffer = new Buffer(settings, depth)
        buffer.add(block)
        buffer.flush()
    } else if (block instanceof Function) {
        // option 2: indent callback
        const subtokens = block()
        serializeBlock(subtokens, settings, depth + 1)
    } else if (block instanceof Line) {
        //option 3 : nested section
        const buffer: Buffer = new Buffer(settings, depth)
        serializeInlineSegment(block.segment, settings, buffer)
        buffer.flush()
    } else {
        //option 3 : nested section

        block.forEach(sub => {
            serializeBlock(sub, settings, depth)
        })
    }
}


function serializeInlineSegment(inlineSegment: InlineSegment, settings: Settings, buffer: Buffer) {
    if (inlineSegment === null) {
        //do nothing
    } else if (typeof inlineSegment === "string") {
        buffer.add(inlineSegment)
    } else if (inlineSegment instanceof Function) {
        // option 2: indent callback
        buffer.flush()
        const subtokens = inlineSegment()
        serializeBlock(subtokens, settings, buffer.depth + 1)
    } else {
        inlineSegment.forEach(arg => {
            serializeInlineSegment(arg, settings, buffer)
        })
    }
}
