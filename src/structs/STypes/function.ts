import { ASTNode } from "structs/ASTNode";
import { define, NOT_IMPLEMENTED, SType_Unknown, Symbl, Symbol_function, Symbol_function_type, Symbol_NOT_IMPLEMENTED } from ".";
import { SType_Callable, Symbol_Callable } from "./callable";
import { SType_function_type } from "./function_type";
import { STypes } from "structs/STypes";

export interface SType_function extends SType_Callable {
    __name__ : Symbl<SType_Unknown>
    __class__: Symbl<SType_function_type>
}

export interface Symbol_Callable_function extends Symbol_Callable<SType_function> {
    /*
        args informations
    */
}

// in fact doesn't truly exists...
define(Symbol_function, {

    stype: {
        __class__: Symbol_function_type,
        __name__ : Symbol_NOT_IMPLEMENTED,
        __call__ : Symbol_NOT_IMPLEMENTED,
    },

    // used to fetch the appropriate magic operators.
    getCallType  : NOT_IMPLEMENTED,
    write_symbol : NOT_IMPLEMENTED,
    write_call   : NOT_IMPLEMENTED,
});

// not a function but unary_op_function...
//TODO: add name + update search method...
type FctUnaryOp = typeof Symbol_function;

//TODO: may have more things...
function genFctUnaryOp<T extends string[]>(...names: T): Record<T[number], FctUnaryOp> {
    let result = {} as Record<T[number], FctUnaryOp>;

    for(let name of names) {
        result[name as T[number]] = {
            stype       : {
                __name__ : Symbol_NOT_IMPLEMENTED, // constant, equal name...
                __class__: Symbol_function_type,
                __call__ : Symbol_NOT_IMPLEMENTED
            },

            getCallType : function (this: any, call: ASTNode) {
                //TODO: .stype.
                //TODO: reverse order... => no need for return, we can detect it.
                //TODO: return_type ?    => may need to call twice when binary_op ?
                return STypes[call.children[1].result_type]![`__${name}__`] as any;
            },
            write_symbol: NOT_IMPLEMENTED,
            write_call  : NOT_IMPLEMENTED
        }
    }

    return result;
}

//TODO: fallbacks + conditions ?
let a = genFctUnaryOp('len', 'abs', 'trunc', 'round', 'ceil',  'floor', 'repr', 'hash', 'index', 'sizeof');

// binary fct op : divmod/pow
// divmod/rdivmod
// pow/rpow