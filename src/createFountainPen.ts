import { IFountainPen } from "./IFountainPen"

function trimRight(str: string) {
    let index = str.length
    while (str[index - 1] === " " || str[index - 1] === "\t") {
        index -= 1
    }
    return str.substring(0, index)
}

class FountainPen implements IFountainPen {
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
    /*publics*/
    public snippet(...args: Array<string | ((writer: IFountainPen) => void) | [(writer: IFountainPen) => void]>) {
        this.multiWrite(args, false)
    }
    public write(...args: Array<string | ((writer: IFountainPen) => void) | [(writer: IFountainPen) => void]>) {
        this.multiWrite(args, true)
    }
    /*privates*/
    private multiWrite(args: Array<string | ((writer: IFountainPen) => void) | [(writer: IFountainPen) => void]>, endline: boolean) {
        args.forEach((arg, index) => {
            if (index !== 0) {
                //do not flush before if this is the first argument. This allows continuation on the same line from previous input
                //if this is not desired, a newline can be forced by making the first argument ``
                this.flush()
            }
            if (typeof arg === "string") {
                //option 1: string
                if (this.buffer === null) {
                    //nothing has been written yet
                    this.buffer = ""
                    //initialize and indent
                    for (let i = 0; i !== this.depth; i += 1) {
                        this.buffer += this.indentation
                    }
                }
                this.buffer += arg
                return
            }
            if (arg instanceof Array) {
                //option 2 : nested function
                arg[0](this)
                return
            }
            // option 3: indent callback
            this.flush()
            this.depth += 1
            arg(this)
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

/**
 *
 * @param indentation typically several spaces or a tab character
 * @param trimEndWhiteSpace if true, tabs and characters at the end of the line will be removed
 * @param lineWriter the callback to which the output will be sent, one line at the time
 */
export function createFountainPen(indentation: string, trimEndWhiteSpace: boolean, lineWriter: (string: string) => void): IFountainPen {
    return new FountainPen(indentation, trimEndWhiteSpace, lineWriter)
}
