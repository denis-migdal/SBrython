import { Results } from "../results";
import buildAST from "./AST";
import generateBrython from "./Brython";
import generateSBrython from "./SBrython";

export default function generate(code: string, results: Results, use_parser: boolean) {

    results.bry.offset  = 0;
    results.sbry.offset = 0;

    results.code = code;

    const offset = results.bry.offset;
    results.bry.offset += 2;
    results.sbry.offset+= 2;

    ++results.nb_files;

    const ast = buildAST(code, results, use_parser);
    generateSBrython(ast      , results.sbry);
    generateBrython (ast, code, results.bry);

    // PY2JS
    results. bry.times[offset+1] = results. bry.times[offset+2] + results. bry.times[offset+3] + results. bry.times[offset+4];
    results.sbry.times[offset+1] = results.sbry.times[offset+2] + results.sbry.times[offset+3] + results.sbry.times[offset+4];

    // Total runtime.
    results. bry.times[offset] = results. bry.times[offset+1];
    results.sbry.times[offset] = results.sbry.times[offset+1];
    // a little h4cky
}