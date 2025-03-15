import { firstChild, resultType, VALUES } from "@SBrython/sbry/dop";
import { Int2Number } from "@SBrython/sbry/structs/Converters";
import { write_unary_jsop } from "@SBrython/sbry/structs/operators/unary";
import { TYPEID_jsint } from "@SBrython/sbry/types";
import { Fct, WRITE_CALL } from "@SBrython/sbry/types/utils/types";

import Types from "@SBrython/sbry/types/list";

export default function ast2js(node: number) {

    const left  = firstChild(node);
    const value = VALUES[node];

    if( value === 'not') {
        write_unary_jsop(node, '!', Int2Number(left, TYPEID_jsint) );
        return;
    }

    const method = Types[resultType(left)!][value] as Fct<[number]>;

    method[WRITE_CALL]!(node, left);
}