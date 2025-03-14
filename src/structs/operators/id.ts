import { w_node } from "@SBrython/ast2js";
import { parentOPPrio, setParentOPPrio } from "@SBrython/dop";

export function write_id_jsop(node: number, a: number) {

    setParentOPPrio( a, parentOPPrio(node) );

    w_node(a);
}