import { InlineSegment } from "./InlineSegment"

export class Line {
    public readonly segment: InlineSegment
    constructor(segment: InlineSegment) {
        this.segment = segment
    }
}

export function line(args: InlineSegment): Line {
    return new Line(args)
}
