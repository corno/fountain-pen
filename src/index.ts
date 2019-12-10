export * from "./serialize"
export * from "./IFountainPen"


export function assertUnreachable<T>(_x: never): T {
    throw new Error("Unreachable")
}
