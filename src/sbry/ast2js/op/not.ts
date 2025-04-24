import { firstChild, NODE_ID } from "@SBrython/sbry/dop";
import { Int2Number } from "@SBrython/sbry/structs/Converters";
import { OP_BOOL_NOT } from "@SBrython/sbry/structs/operators";
import { w_JSUnrOp } from "@SBrython/sbry/structs/operators/unary";
import { TYPEID_jsint } from "@SBrython/sbry/types/list";

export default function(node: NODE_ID) {
    w_JSUnrOp(node, OP_BOOL_NOT, Int2Number( firstChild(node), TYPEID_jsint) );
}