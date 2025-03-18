import { type Context } from "@SBrython/sbry/bry2sbry/utils";

export const RETURN_TYPE = Symbol();
export const WRITE_CALL  = Symbol();
export const JS_NAME     = Symbol();
export const ARGS_INFO   = Symbol();

export type Type = {
    [key: string]: string|Type,
    [key: symbol]: unknown,
    __class__?: Type,
    __name__ ?: string,
    __str__  ?: Fct<[number]>,
    __int__  ?: Fct<[number]>,
    [JS_NAME]?: string
}

export type Fct<T extends any[] = unknown[]> = Type & {
    [RETURN_TYPE]: (o?: number) => number,
    [WRITE_CALL] : (node: number, ...args: T) => void
}

export type Callable<T extends any[] = unknown[]> = Type & {
    __name__?: string,
    __call__: Fct<T> & {
        __name__: "__call__",
        [ARGS_INFO]: {
            
            args_names : string[],
            args_pos   : Record<string, number>,
            idx_end_pos: number;
            idx_vararg : number;
            has_kw     : boolean;
            kwargs    ?: string;
    
            // used to delay function body parsing in order to handle out of order decl.
            generate   : undefined|( (node: any, astnode: number, context: Context) => void );
        }
    }
}