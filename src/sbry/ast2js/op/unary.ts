import { firstChild, NODE_ID, resultType, VALUES } from "@SBrython/sbry/dop";
import { Int2Number } from "@SBrython/sbry/structs/Converters";
import { TYPEID_jsint } from "@SBrython/sbry/types/list";
import { Fct, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

import Types from "@SBrython/sbry/types/list";
import { w_JSUnrOp } from "@SBrython/sbry/structs/operators/unary";
import { OP_BOOL_NOT } from "@SBrython/sbry/structs/operators";

export default function ast2js(node: NODE_ID) {

    const left  = firstChild(node);
    const value = VALUES[node];

    if( value === 'not') {
        w_JSUnrOp(node, OP_BOOL_NOT, Int2Number(left, TYPEID_jsint) );
        return;
    }

    const method = Types[resultType(left)!][value] as Fct;

    method[WRITE_CALL]!(node);
}