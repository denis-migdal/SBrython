import { Context, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";
import { default_call } from "@SBrython/sbry/ast2js/fct/call";
import { convert_args } from "./Args";
import { AST_FCT_DEF, AST_FCT_DEF_METH } from "@SBrython/sbry/ast2js/";
import { addChild, resultType, setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import Body from "@SBrython/sbry/bry2sbry/Body";

import Types from "@SBrython/sbry/types/list";
import { ARGS_INFO, Callable, RETURN_TYPE, WRITE_CALL } from "@SBrython/sbry/types/utils/types";
import { addType } from "@SBrython/sbry/types/utils/addType";

const FAKE_RETURN_NODE = {
    constructor: {
        $name: "Return"
    }
};

// required as some symbols may have been declared out of order
// (not only for return type computation)
function generate(dst: number, node: any, context: Context) {

    const rtype   = resultType(dst);
    const coffset = addChild(dst, 2);

    // fuck...
    const stype   = Types[rtype] as Callable;
    const call    = stype.__call__;
    const meta    = call[ARGS_INFO];

    // new context for the function local variables
    context = context.createSubContext("fct");
    context.parentTypeID = dst; // <- here

    // fake the node... => better doing here to not have context issues.
    convert_args(coffset, node, stype, context);
    // already done in convert_args
    /* const c_offset  = firstChild(coffset);
    const c_end     = c_offset + nbChild(coffset);
    for(let i = c_offset; i < c_end; ++i)
        context.local_symbols[VALUES[i]] = resultType(i);*/

    // tell body this function has been generated.
    meta.generate = undefined;
    // prevents recursive calls or reaffectation.
    call[RETURN_TYPE] = undefined as any;

    const annotation = node.returns?.id;
    if( annotation !== undefined ) {
        let fct_return_type = context.local_symbols[annotation]; // ?
        // force the type.
        call[RETURN_TYPE] = () => fct_return_type!;
    }

    // implicit return...
    const last_type   = node.body[node.body.length-1].constructor.$name;
    if( last_type !== "Return" && last_type !== "Raise" ) {

        if( __DEBUG__ ) {
            const fake_node = {
                constructor: {
                    $name: "Return"
                },
                    lineno: node.end_lineno,
                end_lineno: node.end_lineno,
                    col_offset: node.end_col_offset,
                end_col_offset: node.end_col_offset,
            }
            node.body.push( fake_node );
        } else {
            node.body.push( FAKE_RETURN_NODE );
        }
    }

    Body(coffset+1, node.body, context);
    if(__DEBUG__) set_py_code_from_list(coffset+1, node.body);
}

export default function convert(dst: number, node: any, context: Context) {

    const SType_fct: Callable = {
        __name__: "function",
        __call__: {
            __name__: "__call__",
            [RETURN_TYPE]: () => {
                generate(dst, node, context); // should be the new context
                return SType_fct.__call__[RETURN_TYPE]();
            },
            [WRITE_CALL]: default_call,
            [ARGS_INFO]: {
                //TODO...
                args_names     : new Array(node.args.args.length+node.args.posonlyargs.length),
                args_pos       : {},
                idx_end_pos    : -1,
                idx_vararg     : -1,
                has_kw         : false,
                generate,
            }
        }
    }

    const STypeID = Types.length;
    Types[STypeID] = SType_fct;

    context.local_symbols[node.name] = STypeID;

    let type = AST_FCT_DEF;
    if( context.type === "class") {
        type = AST_FCT_DEF_METH;
        const klass = Types[context.parentTypeID];
        VALUES[dst] = [node.name, klass.__name__];

        const method_name = node.name;
        
        Types[context.parentTypeID  ][method_name] = SType_fct;

        const gen = SType_fct.__call__[ARGS_INFO].generate!;
        SType_fct.__call__[ARGS_INFO].generate = (...args) => {
            gen(...args);

            //@ts-ignore
            instanceType.__call__ = {...SType_fct.__call__};
            instanceType.__call__[ARGS_INFO] = {...SType_fct.__call__[ARGS_INFO]};

            //TODO: update ARGS_INFO...
            console.warn( instanceType.__call__[ARGS_INFO] );
            // WRITE_CALL => no issues as it uses ARGS_INFO...
        }
        const instanceTypeID = addType(SType_fct);
        const instanceType = Types[instanceTypeID];

        Types[context.parentTypeID-1][method_name] = instanceType;

    } else {
        VALUES[dst] = node.name;
    }

    setType      (dst, type);
    setResultType(dst, STypeID);
}