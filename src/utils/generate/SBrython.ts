import {py2ast, convert_ast} from "@SBrython/sbry/py2ast";
import {ast2js} from "@SBrython/sbry/ast2js/ast2js";
import {SBrython, _sb_, _r_} from "@SBrython/runtime";

// declare all builtin types...
//import '@SBrython/sbry/structs/STypeBuiltin';

// ^ TODO: move out...

import { SubResults } from "../results";

export default function generateSBrython(_ast: string, results: SubResults) {

    const beg = performance.now();

    const filename = "_";

    const ast = {
        nodes: convert_ast(_ast),
        filename
    }

    const t0 = performance.now();

    const jscode = ast2js(ast);

    const t1 = performance.now();

    results.code += jscode;
    results.ast   = ast;

    //results.times[results.offset++] += t1 - beg; // total
    results.times[results.offset++] += t0 - beg;
    results.times[results.offset++] += t1 - t0;

    return jscode;
}