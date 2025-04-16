import { NODE_ID, TYPE_ID } from "../dop";

export type Context = {
    local_symbols: Record<string, TYPE_ID>;
    parentTypeID  : number; 
    type: "?"|"class"|"fct" //TODO: remove???

    createSubContext(type: "?"|"class"|"fct"): Context;
    createClassContext(type: number): Context;
}

declare const _default: Record<string, (dst: NODE_ID, node: any, context: Context) => void>;
export default _default;