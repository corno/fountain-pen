import { InlinePart } from "./InlineSection"
import { Line } from "./Line"
import { IParagraph } from "./Paragraph"

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
export function serialize(p: IParagraph, indentation: string, trimEndWhitespace: boolean, lineWriter: (string: string) => void) {
    const settings: Settings = {
        lineWriter: lineWriter,
        trimEndWhitespace: trimEndWhitespace,
        indentation: indentation,
    }
    serializeParagraph(p, settings, 0)
}

function serializeParagraph(paragraph: IParagraph, settings: Settings, depth: number) {
    paragraph.forEach(arg => {
        if (typeof arg === "string") {
            const buffer: Buffer = new Buffer(settings, depth)
            buffer.add(arg)
            buffer.flush()
        } else if (arg instanceof Function) {
            // option 2: indent callback
            const subtokens = arg()
            serializeParagraph(subtokens, settings, depth + 1)
        } else if (arg instanceof Line) {
            //option 3 : nested section
            const buffer: Buffer = new Buffer(settings, depth)
            serializeInlineSection(arg, settings, buffer)
            buffer.flush()
        } else {
            //option 3 : nested section
            serializeParagraph(arg, settings, depth)
        }
    })
}


function serializeInlinePart(part: InlinePart, settings: Settings, buffer: Buffer) {
    if (typeof part === "string") {
        buffer.add(part)
    } else if (part instanceof Function) {
        // option 2: indent callback
        buffer.flush()
        const subtokens = part()
        serializeParagraph(subtokens, settings, buffer.depth + 1)
    } else {
        part.forEach(arg => {
            serializeInlinePart(arg, settings, buffer)
        })
    }
}


function serializeInlineSection(inlineSection: Line, settings: Settings, buffer: Buffer) {
    inlineSection.isParts.forEach(arg => {
        serializeInlinePart(arg, settings, buffer)
    })
}
