import { Context, convert_body, convert_node } from "py2ast";
import { STypeFct } from "structs/SType";
import { getSTypeID, STypes } from "structs/STypes";
import { default_call } from "../call/ast2js";
import { convert_args } from "../args/astconvert";
import { FUNCTIONS_DEF } from "core_modules/lists";
import { addChild, resultType, setResultType, setType, VALUES } from "dop";

// required as some symbols may have been declared out of order
// (not only for return type computation)
function generate(dst: number, node: any, context: Context) {

    const rtype   = resultType(dst);
    const coffset = addChild(dst, 2);

    // fuck...
    const stype   = STypes[rtype] as STypeFct;
    const meta    = stype.__call__;

    // new context for the function local variables
    context = new Context("fct", context);
    context.parent_node_context = dst; // <- here

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
    meta.return_type = undefined as any;

    const annotation = node.returns?.id;
    if( annotation !== undefined ) {
        let fct_return_type = getSTypeID(annotation);
        // force the type.
        meta.return_type = () => fct_return_type!;
    }

    convert_body(coffset+1, node.body, context);
}

export default function convert(dst: number, node: any, context: Context) {

    //const isMethod = context.type === "class";

    const SType_fct: STypeFct = {
        __name__: "function",
        __call__: {
            args_names     : new Array(node.args.args.length+node.args.posonlyargs.length),
            args_pos       : {},
            idx_end_pos    : -1,
            idx_vararg     : -1,
            has_kw         : false,
            generate,
            return_type    : () => {
                generate(dst, node, context); // should be the new context
                return SType_fct.__call__.return_type();
            },
            substitute_call: default_call
        }
    }

    const STypeID = STypes.length;
    STypes[STypeID] = SType_fct;

    //if( ! isMethod ) {
    // if method add to self_context.symbols ?
    context.local_symbols[node.name] = STypeID;

    // implicit return...
    const last_type   = node.body[node.body.length-1].constructor.$name;
    if( last_type !== "Return" && last_type !== "Raise" ) {

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
    }

    setType      (dst, FUNCTIONS_DEF);
    setResultType(dst, STypeID);

    VALUES[dst] = node.name;
}

convert.brython_name = "FunctionDef";