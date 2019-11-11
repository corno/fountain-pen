export interface IWriter {
    /**
     * writes the array of 3 kinds of arguments and ends in a newline
     * @param args variadic array of 3 kinds of arguments
     * 1) a text snippet
     * 2) an indentation instruction (a closure where everything that is written in the closure is indented one level more than the current level)
     * 3) an anonymous function call
     */
    write(...args: Array<string | (() => void) | [() => void]>): void
    /**
     * same as 'write' but without a line ending for the last line
     * @param args
     */
    snippet(...args: Array<string | (() => void) | [() => void]>): void
}

function trimRight(str: string) {
    let index = str.length
    while (str[index - 1] === " " || str[index - 1] === "\t") {
        index -= 1
    }
    return str.substring(0, index)
}

class Writer implements IWriter {
    private depth = 0
    private buffer: string | null = null
    private readonly indentation: string
    private readonly trimEndWhitespace: boolean
    private readonly lineWriter: (string: string) => void
    constructor(indentation: string, trimEndWhiteSpace: boolean, lineWriter: (string: string) => void) {
        this.indentation = indentation
        this.trimEndWhitespace = trimEndWhiteSpace
        this.lineWriter = lineWriter
    }
    public snippet(...args: Array<string | (() => void) | [() => void]>) {
        this.multiWrite(args, false)
    }
    public write(...args: Array<string | (() => void) | [() => void]>) {
        this.multiWrite(args, true)
    }
    private multiWrite(args: Array<string | (() => void) | [() => void]>, endline: boolean) {
        args.forEach((arg, index) => {
            if (index !== 0) {
                this.flush()
            }
            //option 1: string
            if (typeof arg === "string") {
                if (this.buffer === null) {
                    this.buffer = ""
                    for (let i = 0; i !== this.depth; i += 1) {
                        this.buffer += this.indentation
                    }
                }
                this.buffer += arg
                return
            }
            //option 2 : nested function
            if (arg instanceof Array) {
                arg[0]()
                return
            }
            // option 3: indent callback
            this.flush()
            this.depth += 1
            arg()
            this.flush()
            this.depth -= 1
        })
        if (endline) {
            this.flush()
        }
    }
    private flush() {
        if (this.buffer !== null) {
            const out = this.trimEndWhitespace ? trimRight(this.buffer) : this.buffer
            this.lineWriter(out)
        }
        this.buffer = null
    }
}

export function createWriter(indentation: string, trimEndWhiteSpace: boolean, lineWriter: (string: string) => void) {
    return new Writer(indentation, trimEndWhiteSpace, lineWriter)
}
