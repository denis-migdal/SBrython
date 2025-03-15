export type Context = {
    local_symbols: Record<string, number>;
    parent_node_context?: number; 
    type: "?"|"class"|"fct" //TODO: remove???

    createSubContext(type: "?"|"class"|"fct"): Context
}

declare const _default: Record<string, (dst: number, node: any, context: Context) => void>;
export default _default;