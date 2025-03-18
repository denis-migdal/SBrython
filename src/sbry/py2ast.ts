import dop_reset, {ASTNODES, CODE_BEG_COL, CODE_BEG_LINE, CODE_END_COL, CODE_END_LINE, CODE_LINE, createASTNode, PY_CODE, resultType, type, VALUES} from "@SBrython/sbry/dop";
import Body from "./bry2sbry/Body";
import Types from "@SBrython/sbry/types/list";
import { id2name } from "./ast2js/list";
import { set_py_code_from_list } from "./bry2sbry/utils";

export type AST = {
    nodes   : typeof ASTNODES,
    filename: string
}

export function printNode(id: number) {
    console.warn({
        type     : id2name[type(id)],
        ret_type : Types[resultType(id)].__name__,
        value    : VALUES[id],
    });
}

export function buildPyCode(id: number) {
    const offset = 4*id;

    return {
        start: {
            line: PY_CODE[ offset + CODE_BEG_LINE ],
            col : PY_CODE[ offset + CODE_BEG_COL  ]
        },
        end  : {
            line: PY_CODE[ offset + CODE_END_LINE ],
            col : PY_CODE[ offset + CODE_END_COL  ]
        }
    };
}

export function py2ast(code: string, filename: string): AST {

    const parser = new $B.Parser(code, filename, 'file');
	const _ast   = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    
    const nodes = convert_ast(_ast)

	return {
        nodes, //TODO: slice
        filename
    }
}

import "@SBrython/sbry/bry2sbry/list"; 
import builtins from "./types/builtins";

export function convert_ast(ast: any) {

    dop_reset();

    const id = createASTNode();
    Body(id, ast.body, new Context() );
    if(__DEBUG__) set_py_code_from_list(id, ast.body);

    return ASTNODES;

    /*function count(node: ASTNode) {

        let sum = 1; // count myself
        for(let i = 0; i < node.children.length; ++i )
            sum += count(node.children[i]);
        return sum;
    }
    console.warn( count(result) );*/
}

export class Context {
    constructor(type: "?"|"class"|"fct" = "?", symbols: Record<string, number> = builtins) {
        this.type = type; //TODO: remove
        this.local_symbols = {...symbols};
    }

    createSubContext(type: "?"|"class"|"fct" = "?") {
        return new Context(type, this.local_symbols);
    }

    local_symbols: Record<string, number>;
    parent_node_context?: number; // is it used ?
    type; //TODO: remove
}