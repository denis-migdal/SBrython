import { SType_type } from "./type";
import { Symbol_Callable } from "./callable";
import { SType_function_type } from "./function_type";
import { Symbol_Callable_function } from "./function";

export interface SType {
    [key: string]: Symbl<SType>

    __class__: Symbl<SType>
}

// avoid name collision with Symbol
export interface Symbl<T extends SType> {
    stype       : T;
    write_symbol: (node: number) => void;
}

/** helpers **/

export type SType_Unknown = SType;

export function define<T extends Object>(target: T, definition: T) {
    Object.assign(target, definition);
}

export const NOT_IMPLEMENTED: (call: number) => any = (call: number) => {
    console.warn(call);
    throw new Error('Not implemented');
};

export const Symbol_NOT_IMPLEMENTED = {

    stype: {} as any,
    getCallType : NOT_IMPLEMENTED,
    write_call  : NOT_IMPLEMENTED,
    write_symbol: NOT_IMPLEMENTED

} satisfies Symbol_Callable<any>;

/** builtin **/

export const Symbol_type          = {} as unknown as Symbol_Callable<SType_type>;
export const Symbol_function      = {} as unknown as Symbol_Callable_function;
export const Symbol_function_type = {} as unknown as Symbl<SType_function_type>;