import { firstChild, nextSibling, NODE_ID, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { buildJSCode } from "@SBrython/sbry/ast2js/utils";
import { buildPyCode } from "@SBrython/sbry/py2ast";

import Types from "@SBrython/sbry/types/list";
import { id2name } from "@SBrython/sbry/ast2js";
import { id2name as id2typename } from "@SBrython/sbry/types";

type CodePos = {
    line: number,
    col : number
}

type CodeRange = {
    start: CodePos,
    end  : CodePos
}

export type NODE = {
    type    : string,
    result_type :string,
    value       : any,
    jscode  : CodeRange,
    pycode  : CodeRange,
    children: NODE[];
}

export default function astnode2tree(id: NODE_ID = 0): NODE {

    const typeID = resultType(id);
    const result_type = id2typename[typeID];

    const children = [];

    let cur = firstChild(id);
    while(cur !== 0) {
        children.push( astnode2tree(cur) );
        cur = nextSibling(cur);
    }

    return {
        type       : id2name[type(id)], // TODO convert
        result_type,
        value      : VALUES[id],
        jscode  : buildJSCode(id),
        pycode  : buildPyCode(id),
        children
    };
}