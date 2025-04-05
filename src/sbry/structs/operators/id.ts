import { w_node } from "@SBrython/sbry/ast2js/utils";
import { NODE_ID, parentOPPrio, setParentOPPrio } from "@SBrython/sbry/dop";

export function write_id_jsop(node: NODE_ID, a: NODE_ID) {

    setParentOPPrio( a, parentOPPrio(node) );

    w_node(a);
}