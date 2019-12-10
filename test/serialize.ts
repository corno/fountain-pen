// tslint:disable: no-console no-unused-expression no-shadowed-variable

import { assert } from "chai"
import { IParagraph, line, paragraph } from "../src"
import { serialize } from "../src/serialize"

function defSerialize(paragraph: IParagraph, trim: boolean = false) {
    const out: string[] = []
    serialize(paragraph, "    ", trim, str => out.push(str))
    return out
}

describe("fountain pen", () => {
    it("paragraph behaviour", () => {
        assert.deepEqual(defSerialize(paragraph(["A"])), ["A"])
    })
    it("line behaviour", () => {
        const para = paragraph([
            line([
                `X`,
                line([`Z`]),
                `Y`,
            ]),
        ])
        assert.deepEqual(defSerialize(para), ["XZY"])
    })
    it("indentation behaviour", () => {
        const para = paragraph([
            "BEFORE",
            () => {
                return ["B"]
            },
            "AFTER",
        ])
        assert.deepEqual(defSerialize(para), ["BEFORE", "    B", "AFTER"])
    })
    it("subfunction behaviour", () => {
        const para = paragraph([
            "A",
            paragraph(["B"]),
            "C",
        ])
        assert.deepEqual(defSerialize(para), ["A", "B", "C"])
    })
    it("trimming", () => {
        const para = paragraph(["line ending with spaces     "])
        assert.deepEqual(defSerialize(para, true), ["line ending with spaces"])
    })
    it("non-trimming", () => {
        const para = paragraph(["line ending with spaces     "])
        assert.deepEqual(defSerialize(para), ["line ending with spaces     "])
    })
    it("multiline", () => {
        const para = paragraph(["A", "B"])
        assert.deepEqual(defSerialize(para), ["A", "B"])
    })
})
