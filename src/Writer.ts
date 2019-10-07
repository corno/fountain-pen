
export class Writer {
    private depth = 0
    private buffer: string | null = null
    private readonly indentation: string
    private readonly trimEndWhitespace: boolean
    private readonly lineWriter: (string: string) => void
    constructor(indentation: string, trimEndWhitspace: boolean, lineWriter: (string: string) => void) {
        this.indentation = indentation
        this.trimEndWhitespace = trimEndWhitspace
        this.lineWriter = lineWriter
    }
    public snippet(str: string) {
        this.add(str)
    }
    public write(...args: Array<string | (() => void) | [() => void]>) {
        args.forEach(arg => {
            if (typeof arg === "string") {
                this.line(arg)
                return
            }
            if (arg instanceof Array) {
                arg[0]()
                return
            }
            this.indent(arg)
        })
    }
    private add(str: string) {
        if (this.buffer === null) {
            this.buffer = ""
            for (let i = 0; i !== this.depth; i += 1) { this.buffer += this.indentation }
        }
        this.buffer += str
    }
    private flush() {
        if (this.buffer !== null) {
            const out = this.trimEndWhitespace ? this.buffer.trimRight() : this.buffer
            this.lineWriter(out)
        }
        this.buffer = null
    }
    private line(string: string) {
        this.add(string)
        this.flush()
    }
    private indent(callback: () => void) {
        this.flush()
        this.depth += 1
        callback()
        this.flush()
        this.depth -= 1
    }
}

export function createWriter(indentation: string, trimEndWhitspace: boolean, lineWriter: (string: string) => void) {
    return new Writer(indentation, trimEndWhitspace, lineWriter)
}
