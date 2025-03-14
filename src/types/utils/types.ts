import { Context } from "@SBrython/py2ast";

export const RETURN_TYPE = Symbol();
export const WRITE_CALL  = Symbol();
export const ARGS_INFO   = Symbol();

export type Fct<T extends any[] = unknown[]> = {
    [RETURN_TYPE]: (o?: number) => number,
    [WRITE_CALL] : (node: number, ...args: T) => void
}

export type Callable<T extends any[] = unknown[]> = {
    __name__?: string,
    __call__: Fct<T> & {
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