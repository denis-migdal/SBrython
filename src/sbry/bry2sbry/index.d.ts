import { NODE_ID } from "../dop";

export type Context = {
    local_symbols: Record<string, number>;
    parentTypeID  : number; 
    type: "?"|"class"|"fct" //TODO: remove???

    createSubContext(type: "?"|"class"|"fct"): Context;
    createClassContext(type: number): Context;
}

declare const _default: Record<string, (dst: NODE_ID, node: any, context: Context) => void>;
export default _default;