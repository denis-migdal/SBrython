
export type STypeSubs = {
    //type       ?: string,
    substitute ?: (...args: any[]) => any
};
export type STypeFctSubs = {
    // + one version with __call__ ?
    // type desc vs type content...
    substitute_call ?: (...args: any[]) => any,
    return_type      : (...args: STypeObj[]) => STypeObj // for methods/functions...
};
export type SType    = string | STypeSubs | STypeFctSubs;
export type STypeObj = Record<string, SType> & {__name__: string}; //TODO make circular...