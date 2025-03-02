import { Context } from "py2ast";

/**/

export type STypeSubs = {
    //type       ?: string,
    substitute ?: (...args: any[]) => any
};
export type STypeFctSubs = {
    // + one version with __call__ ?
    // type desc vs type content...
    substitute_call ?: (...args: any[]) => any,
    return_type      : (...args: number[]) => number // for methods/functions...
};
export type STypeFct = {

    __name__: string;
    __call__: {
        args_names : string[],
        args_pos   : Record<string, number>,
        idx_end_pos: number;
        idx_vararg : number;
        has_kw     : boolean;
        kwargs    ?: string;

        // used to delay function body parsing in order to handle out of order decl.
        generate   : undefined|( (node: any, astnode: number, context: Context) => void );
    } & STypeFctSubs;
};

//TODO: fix type system...
export type SType    = string | STypeSubs | STypeFctSubs;
export type STypeObj = Record<string, SType> & {__name__: string}; //TODO make circular...