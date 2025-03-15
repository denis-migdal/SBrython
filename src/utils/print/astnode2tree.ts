import { firstChild, nbChild, resultType, type, VALUES } from "@SBrython/sbry/dop";
import { buildJSCode } from "@SBrython/sbry/ast2js/utils";
import { buildPyCode } from "@SBrython/sbry/py2ast";

import Types from "@SBrython/sbry/types/list";
import { id2name } from "@SBrython/sbry/ast2js/list";

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

export default function astnode2tree(id = 0): NODE {

    const coffset    = firstChild(id);

    return {
        type       : id2name[type(id)], // TODO convert
        result_type: Types[resultType(id)]?.__name__,
        value      : VALUES[id],
        jscode  : buildJSCode(id),
        pycode  : buildPyCode(id),
        children: Array.from({length: nbChild(id)}, (_,i) => astnode2tree(coffset+i) )
    };
}