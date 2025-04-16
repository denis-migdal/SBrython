import { w_node } from "@SBrython/sbry/ast2js/utils";
import { NODE_ID, parentOPPrio, setParentOPPrio } from "@SBrython/sbry/dop";

export function w_subs(call: NODE_ID, to_write: NODE_ID) {

    setParentOPPrio( to_write, parentOPPrio(call) );

    w_node(to_write);
}