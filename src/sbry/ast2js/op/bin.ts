import { firstChild, resultType, VALUES } from "@SBrython/sbry/dop";
import Types from "@SBrython/sbry/types/list";
import { Fct, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

export default function ast2js(node: number) {

    const coffset = firstChild(node);
    
    const method = Types[resultType(coffset)]![VALUES[node]] as Fct<[number, number]>;
    method[WRITE_CALL]!(node, coffset, coffset+1);
}