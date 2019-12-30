export * from "./serialize"
export * from "./Line"
export * from "./Paragraph"
export * from "./InlineSection"

export function assertUnreachable<T>(_x: never): T {
    throw new Error("Unreachable")
}
