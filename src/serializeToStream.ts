import { Block } from "./Block"
import * as p from "pareto"
import * as p20 from "pareto-20"
import { serialize } from "./serialize"

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