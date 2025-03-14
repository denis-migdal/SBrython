import { firstChild, resultType, VALUES } from "@SBrython/dop";
import { Int2Number } from "@SBrython/structs/Converters";
import { write_unary_jsop } from "@SBrython/structs/operators/unary";
import { TYPEID_jsint } from "@SBrython/types";
import { WRITE_CALL } from "@SBrython/types/utils/types";

import Types from "@SBrython/types/list";

export default function ast2js(node: number) {

    const left  = firstChild(node);
    const value = VALUES[node];

    if( value === 'not') {
        write_unary_jsop(node, '!', Int2Number(left, TYPEID_jsint) );
        return;
    }

    const method = Types[resultType(left)!][value];

    method[WRITE_CALL]!(node, left);
}