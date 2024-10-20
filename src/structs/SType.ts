
export type STypeSubs = {
    type       ?: string,
    substitute ?: (...args: any[]) => any
};
export type STypeFctSubs = {
    type            ?: string, // or many types... []
    call_substitute ?: (...args: any[]) => any,
    return_type      : (...args: string[]) => string // for methods/functions...
};
export type SType = string | STypeSubs | STypeFctSubs;
export type STypeObj = Record<string, SType>;

export const SType_NOT_IMPLEMENTED = "NotImplementedType";