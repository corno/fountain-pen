// tslint:disable: no-console no-unused-expression no-shadowed-variable

import { assert } from "chai"
import { Block, line } from "../src"
import { serialize } from "../src/serialize"

function defSerialize(block: Block, trim = false) {
    const out: string[] = []
    serialize(block, "    ", trim, str => out.push(str))
    return out
}

describe("fountain pen", () => {
    it("paragraph behaviour", () => {
        assert.deepEqual(defSerialize(["A"]), ["A"])
    })
    it("line behaviour", () => {
        const para = [
            line([
                `X`,
                [`Z`],
                `Y`,
            ]),
        ]
        assert.deepEqual(defSerialize(para), ["XZY"])
    })
    it("indentation behaviour", () => {
        const para = [
            "BEFORE",
            () => {
                return ["B"]
            },
            "AFTER",
        ]
        assert.deepEqual(defSerialize(para), ["BEFORE", "    B", "AFTER"])
    })
    it("subfunction behaviour", () => {
        const para = [
            "A",
            ["B"],
            "C",
        ]
        assert.deepEqual(defSerialize(para), ["A", "B", "C"])
    })
    it("trimming", () => {
        const para = ["line ending with spaces     "]
        assert.deepEqual(defSerialize(para, true), ["line ending with spaces"])
    })
    it("non-trimming", () => {
        const para = ["line ending with spaces     "]
        assert.deepEqual(defSerialize(para), ["line ending with spaces     "])
    })
    it("multiline", () => {
        const para = ["A", "B"]
        assert.deepEqual(defSerialize(para), ["A", "B"])
    })
})
