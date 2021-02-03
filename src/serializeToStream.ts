import { Block } from "./Block"
import * as p from "pareto"
import * as p20 from "pareto-20"
import { serialize } from "./serialize"

/**
 *
 * @param block
 * @param indentation tabs or spaces?
 * @param trimEndWhitespace if a line has whitespace at the end, should it be trimmed?
 * @param newline every chunk of data is a line. The newline that is specified with this parameter will be appended to every line.
 */
export function serializeToStream(
    block: Block,
    indentation: string,
    trimEndWhitespace: boolean,
    newline: string,
): p.IStream<string, null> {
    return p20.createStream((limiter, consumer) => {
        let count = 0
        let aborted = false
        serialize(
            block,
            indentation,
            trimEndWhitespace,
            line => {
                count += 1
                if (limiter === null || count <= limiter.maximum) {
                    consumer.onData(line + newline)
                } else {
                    aborted = true
                }
            }
        )
        consumer.onEnd(aborted, null)
    })
}