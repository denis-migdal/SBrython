import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFct, STypeObj } from "structs/SType";
import { getSTypeID, STypes } from "structs/STypes";
import { default_call } from "../call/ast2js";
import { convert_args } from "../args/astconvert";
import { set_py_code } from "ast2js";
import { FUNCTIONS_DEF } from "core_modules/lists";
import { VALUES } from "dop";

// required as some symbols may have been declared out of order
// (not only for return type computation)
function generate(node: any, astnode: ASTNode, context: Context) {

    // fuck...
    const stype   = STypes[astnode.result_type] as STypeFct;
    const meta    = stype.__call__;

    // new context for the function local variables
    context = new Context("fct", context);
    context.parent_node_context = astnode; // <- here

    // fake the node... => better doing here to not have context issues.
    const args = convert_args(node, stype, context);
    for(let arg of args.children)
        context.local_symbols[VALUES[arg.id]] = arg.result_type;

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

    // convert body
    astnode.children = [
        args,
        convert_node(node.body, context)
    ];
}

export default function convert(node: any, context: Context) {

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
                generate(node, ast, context); // should be the new context
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

    const ast = new ASTNode(FUNCTIONS_DEF, STypeID);

    VALUES[ast.id] = node.name;

    set_py_code(4*ast.id, node);
    
    return ast;
}

convert.brython_name = "FunctionDef";