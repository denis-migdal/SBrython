import { firstChild, nextSibling, NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import Types from "@SBrython/sbry/types/list";
import { Fct, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

export default function ast2js(node: NODE_ID) {

    const coffset = firstChild(node);
    
    const method = Types[resultType(coffset)]![VALUES[node]] as Fct<[NODE_ID, NODE_ID]>;
    method[WRITE_CALL]!(node, coffset, nextSibling(coffset) );
}