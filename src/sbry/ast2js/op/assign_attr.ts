import { BB, BE, w_NL, w_node, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nbChild, resultType, VALUES } from "@SBrython/sbry/dop";
import { Number2Int } from "@SBrython/sbry/structs/Converters";
import { TYPEID_int, TYPEID_jsint } from "@SBrython/sbry/types";
import Types from "@SBrython/sbry/types/";

export default function ast2js(node: number) {
    
    const kname = Types[VALUES[node]].__name__;

    w_str("static ");

    const nbChildren = nbChild(node);
    const coffset    = firstChild(node);
    
    for(let i = 1; i < nbChildren; ++i) {
        w_node(i+coffset);
        w_str(" = ");
    }

    let rchild: number = coffset;
    if( resultType(coffset) === TYPEID_jsint && resultType(node) === TYPEID_int )
        rchild = Number2Int(coffset);

    w_node(rchild);

    w_NL();
    const name = VALUES[coffset+1];
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