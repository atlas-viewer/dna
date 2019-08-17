import {compose} from "./compose";
import {translate} from "./translate";
import {scale} from "./scale";

export const scaleAtOrigin = (factor: number, x: number, y: number) =>
    compose(
        // This is right.
        translate((1 - factor) * x, (1 - factor) * y),
        scale(factor)
    );
