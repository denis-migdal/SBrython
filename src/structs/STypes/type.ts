import { define, NOT_IMPLEMENTED, Symbol_NOT_IMPLEMENTED, Symbol_type, type SType_Unknown, type Symbl } from "./";
import { SType_Callable } from "./callable";

// type is its own class
export interface SType_type extends SType_Callable {
    __class__: Symbl<SType_type>
    __name__ : Symbl<SType_Unknown>
}

define(Symbol_type, {

    stype: {
        __class__: Symbol_type,
        __name__ : Symbol_NOT_IMPLEMENTED,
        __call__ : Symbol_NOT_IMPLEMENTED,
    },

    getCallType  : NOT_IMPLEMENTED,
    write_symbol : NOT_IMPLEMENTED,
    write_call   : NOT_IMPLEMENTED,
});
