import { define, NOT_IMPLEMENTED, SType, SType_Unknown, Symbl, Symbol_function_type, Symbol_NOT_IMPLEMENTED, Symbol_type } from ".";
import { SType_type } from "./type";

// in fact is Callable but meh.
export interface SType_function_type extends SType {
    __name__ : Symbl<SType_Unknown> // constant "function"
    __class__: Symbl<SType_type>
}

define(Symbol_function_type, {

    stype: {
        __class__: Symbol_type,
        __name__ : Symbol_NOT_IMPLEMENTED,
    },

    write_symbol : NOT_IMPLEMENTED
});
