import { set_js_cursor, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { CODE_BEG, CODE_END, firstChild, nextSibling, NODE_ID, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { AST_DEF_ARG_KWONLY, AST_DEF_ARG_POS, AST_DEF_ARG_POSONLY, AST_DEF_ARG_VARARGS } from "../list";

import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { TYPEID_jsint } from "@SBrython/sbry/types/list";

function write_arg(node: NODE_ID) {

    if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(node as number) + CODE_BEG);

    w_str( VALUES[node] ); // arg name

    if( firstChild(node) !== 0 ) {

        let defval: any = firstChild(node);
        if( resultType(defval) === TYPEID_jsint )
            defval = Number2Int(defval);

        w_str(" = ");
        w_node(defval);
    }
    if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(node as number) + CODE_END);

    w_str(", ");
}

function write_posarg(node: NODE_ID) {

    if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(node as number) + CODE_BEG);

    w_str(`_${VALUES[node]}`); // arg name

    if( firstChild(node) !== 0 ) {

        let defval: any = firstChild(node);
        if( resultType(defval) === TYPEID_jsint )
            defval = Number2Int(defval);

        w_str(" = ");
        w_node(defval);
    }
    if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(node as number) + CODE_END);

    w_str(", ");
}

export default function ast2js(node: NODE_ID) {
    
    let cur = firstChild(node);

    while( type(cur) === AST_DEF_ARG_POSONLY) {
        write_arg(cur);
        cur = nextSibling(cur);
    }

    let start: NODE_ID = 0;
    if( type(cur) === AST_DEF_ARG_POS ) {
        start = cur;
        do {
            write_posarg(cur);
            cur = nextSibling(cur);
        } while( type(cur) === AST_DEF_ARG_POS );
    }

    if( type(cur) === AST_DEF_ARG_VARARGS ) {
        
        if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(cur as number) + CODE_BEG);
        w_str(`...${VALUES[node]}`);
        if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(cur as number) + CODE_END);

        cur = nextSibling(cur);
    }

    if( __SBRY_COMPAT__ === "NONE" )
        return;

    //TODO: if has varargs...
    if( type(cur) === 0 || start !== 0 ) {

        w_str(" {");

        while( type(start) === AST_DEF_ARG_POS) {
            
            const name = VALUES[start];
            w_str(`${name} = _${name},`);

            start = nextSibling(start);
        }

        while( type(cur) === AST_DEF_ARG_KWONLY ) {

            write_arg(cur);
            cur = nextSibling(cur);
        }

        if( cur !== 0 ) { // kwargs...
            // @ts-ignore
            if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(cur as number) + CODE_BEG);
            w_str(`...${VALUES[cur]} `);
            // @ts-ignore
            if( __SBRY_MODE__ === "dev" ) set_js_cursor(4*(cur as number) + CODE_END);
        }

        w_str("} = _sb_.getKW() ");

    }
}