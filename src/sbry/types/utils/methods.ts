import { NODE_ID } from "@SBrython/sbry/dop";
import { Fct, RETURN_TYPE, WRITE_CALL } from "./types";

export function method_wrapper<T extends any[] = unknown[]>(
                                RET_TYPE: (o: number) => number,
                                write   : (call: NODE_ID, ...args: T) => void) {
    const r = Object.create(null);

    r[RETURN_TYPE] = RET_TYPE;
    r[WRITE_CALL]  = write;

    return r satisfies Fct<T>;
}