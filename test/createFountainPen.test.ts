// tslint:disable: no-console no-unused-expression no-shadowed-variable

import { assert } from "chai"
import { createFountainPen } from "../src/createFountainPen"

describe("createDictionary", () => {
    it("write behaviour", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", false, str => out.push(str))
        pf.write("A")
        assert.deepEqual(out, ["A"])
    })
    it("snippet behaviour", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", false, str => out.push(str))
        pf.snippet("A")
        assert.deepEqual(out, [])
        pf.write(``)
        assert.deepEqual(out, ["A"])
    })
    it("indentation behaviour", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", false, str => out.push(str))
        pf.write(
            "BEFORE",
            () => {
                pf.write("B")
            },
            "AFTER"
        )
        assert.deepEqual(out, ["BEFORE", "    B", "AFTER"])
    })
    it("subfunction behaviour", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", true, str => out.push(str))
        pf.write(
            "A",
            [() => { pf.write("B") }],
            "C"
        )
        assert.deepEqual(out, ["A", "B", "C"])
    })
    it("trimming", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", true, str => out.push(str))
        pf.write("line ending with spaces     ")
        assert.deepEqual(out, ["line ending with spaces"])
    })
    it("non-trimming", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", false, str => out.push(str))
        pf.write("line ending with spaces     ")
        assert.deepEqual(out, ["line ending with spaces     "])
    })
    it("multiline", () => {
        const out: string[] = []
        const pf = createFountainPen("    ", false, str => out.push(str))
        pf.write("A", "B")
        assert.deepEqual(out, ["A", "B"])
    })
})
