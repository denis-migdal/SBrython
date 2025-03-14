import { firstChild, resultType, VALUES } from "@SBrython/dop";
import Types from "@SBrython/types/list";
import { WRITE_CALL } from "@SBrython/types/utils/types";

export default function ast2js(node: number) {

    const coffset = firstChild(node);
    
    const method = Types[resultType(coffset)]![VALUES[node]];
    method[WRITE_CALL]!(node, coffset, coffset+1);
}