import { type Context } from "@SBrython/sbry/bry2sbry/utils";
import { NODE_ID, TYPE_ID } from "@SBrython/sbry/dop";

export const RETURN_TYPE = Symbol("RETURN_TYPE");
export const TYPEID      = Symbol("TYPEID");
export const WRITE_CALL  = Symbol("WRITE_CALL");
export const JS_NAME     = Symbol("JS_NAME");
export const ARGS_INFO   = Symbol("ARGS_INFO");

export type Type = {
    [key: string]: string|Type,
    [key: symbol]: unknown,
    __class__?: Type,
    __name__ ?: string,
    __str__  ?: Fct,
    __int__  ?: Fct,
    [JS_NAME]?: string,
    [TYPEID ]?: number,
}

export type Fct = Type & {
    [RETURN_TYPE]: (o?: number) => TYPE_ID,
    [WRITE_CALL] : (node: NODE_ID) => void
}

export type Callable = Type & {
    __name__?: string,
    __call__: Fct & {
        __name__: "__call__",
        [ARGS_INFO]?: { //TODO: bry2sbry
            
            args_names : string[],
            args_pos   : Record<string, number>,
            idx_end_pos: number;
            idx_vararg : number;
            has_kw     : boolean;
            kwargs    ?: string;
    
            // used to delay function body parsing in order to handle out of order decl.
            generate   : undefined|( (node: any, astnode: NODE_ID, context: Context) => void );
        }
    }
}