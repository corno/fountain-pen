export interface IFountainPen {
    /**
     * writes the array of 3 kinds of arguments and ends in a newline
     * @param args variadic array of 3 kinds of arguments
     * 1) a text snippet
     * 2) an indentation instruction (a closure where everything that is written in the closure is indented one level more than the current level)
     * 3) an anonymous function call (a closure where everything that is written in the closure is still on the same level)
     */
    write(...args: Array<string | ((writer: IFountainPen) => void) | [(writer: IFountainPen) => void]>): void
    /**
     * same as 'write' but without a line ending for the last argument
     * @param args
     */
    snippet(...args: Array<string | ((writer: IFountainPen) => void) | [(writer: IFountainPen) => void]>): void
}
