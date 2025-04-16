import { BB, BE, w_NL, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types/list";
import Types from "@SBrython/sbry/types/";

export default function ast2js(node: NODE_ID) {
    
    const kname = Types[VALUES[node]].__name__;

    w_str("static ");

    let rchild    = firstChild(node);
    let cur = nextSibling(rchild);
    const name = VALUES[cur];
    
    do {

        w_node(cur);
        w_str(" = ");

        cur = nextSibling(rchild);
    } while(cur !== 0);

    if( resultType(rchild) === TYPEID_jsint && resultType(node) === TYPEID_int )
        rchild = Number2Int(rchild);

    w_node(rchild);

    w_NL();
    w_str(`get ${name}(){`);
    BB(); w_NL();
    w_str(`let v = this._${name};`); w_NL();
    w_str(`if(v === undefined) v = ${kname}.${name};`); w_NL();
    w_str("return v;");
    BE(); w_NL();

    w_str("}");

    w_NL();
    w_str(`set ${name}(value){ this._${name} = value; }`);
}