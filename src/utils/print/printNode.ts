import { NODE_ID, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { id2name } from "@SBrython/sbry/types";
import TYPES from "@SBrython/sbry/types/list";

export function printNode(id: NODE_ID) {
    console.warn({
        id,
        typeID   : type(id),
        type     : id2name[type(id)],
        ret_typeID: resultType(id),
        ret_type : TYPES[resultType(id)]?.__name__,
        value    : VALUES[id],
    });
}