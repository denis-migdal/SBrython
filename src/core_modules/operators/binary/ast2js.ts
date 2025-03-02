import { wr } from "ast2js";
import { firstChild, resultType, VALUES } from "dop";
import { STypeFctSubs } from "structs/SType";
import { STypes } from "structs/STypes";

export default function ast2js(node: number) {

    const coffset = firstChild(node);
    
    const method = STypes[resultType(coffset)]![VALUES[node]] as STypeFctSubs;
    wr( method.substitute_call!(node, coffset, coffset+1) );
}