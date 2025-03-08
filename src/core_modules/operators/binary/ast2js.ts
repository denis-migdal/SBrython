import { wr } from "@SBrython/ast2js";
import { firstChild, resultType, VALUES } from "@SBrython/dop";
import { STypeFctSubs } from "@SBrython/structs/SType";
import { STypes } from "@SBrython/structs/STypes";

export default function ast2js(node: number) {

    const coffset = firstChild(node);
    
    const method = STypes[resultType(coffset)]![VALUES[node]] as STypeFctSubs;
    wr( method.substitute_call!(node, coffset, coffset+1) );
}