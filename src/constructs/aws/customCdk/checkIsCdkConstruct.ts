import type { CdKConstructClass } from "./types";

export function checkIsCdkConstruct(cdkConstruct: unknown): asserts cdkConstruct is CdKConstructClass {
    return;
}
