import Types, { TYPEID_type, TYPEID_type_float_, TYPEID_type_int_, TYPEID_type_str_ } from "./list";
import { w_node, w_str } from "../ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType, TYPE_ID } from "../dop";
import { RET_INT, RET_None, RETURN_TYPE_FCT } from "../structs/ReturnTypeFcts";
import { create_function } from "./utils/methods";
import { Callable, WRITE_CALL } from "./utils/types";

const builtins: [string, TYPE_ID][] = [
    //TODO: true/false... => issues true/false... if=== (?)
    ["int"  , TYPEID_type_int_],
    ["str"  , TYPEID_type_str_],
    ["float", TYPEID_type_float_],
    ["type" , TYPEID_type     ],
    genOpFct("len", RET_INT),
    genOpFct("abs", RET_INT),
    genFct("print", RET_None, (call: NODE_ID) => {

        w_str("__SB__.print(");
        let cur = nextSibling(firstChild(call));
        while(cur !== 0) {
            w_node(cur);
            w_str(", ");
            cur = nextSibling(cur);
        }
        w_str(")");
    })
];

const nbBuiltins = builtins.length;

export function resetSymbols() {
    builtins.length = nbBuiltins;
}

export function addSymbol(name: string, type: TYPE_ID) {
    builtins[builtins.length] = [name, type];
}

export function getSymbol(name: string): TYPE_ID {

    for(let i = builtins.length - 1; i >= 0; --i)
        if(builtins[i][0] === name)
            return builtins[i][1];

    return 0;
}

export default builtins;

function genOpFct(name: string, return_type: RETURN_TYPE_FCT): [string, TYPE_ID] {

    const opname = `__${name}__`;

    const id = create_function(name, return_type, (call: NODE_ID) => {
        const a      = nextSibling(firstChild(call));
        // @ts-ignore
        const method = Types[resultType(a)]!.__class__![opname] as Callable;

        return method.__call__[WRITE_CALL](call);
    });

    return [name, id] as const;
}

function genFct(name: string,
                return_type: RETURN_TYPE_FCT,
                w_call: (call: NODE_ID) => void ): [string, TYPE_ID] {

    return [name, create_function(name, return_type, w_call)] as const;
}