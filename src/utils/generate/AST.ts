import { py2ast } from "@SBrython/sbry/py2ast_fast";
import { Results } from "../results";

declare const $B: any;

export default function buildAST(code: string, results: Results, use_parser: boolean) {

    const _ast: {bry: any, sbry:any} = {
         bry: null,
        sbry: null
    }

    $B.imported["JS"] = $B.jsobj2pyobj( globalThis );

    const beg = performance.now();

    const parser = new $B.Parser(code, "_", 'file');
    _ast.bry = $B._PyPegen.run_parser(parser);

    const t0 = performance.now();

    // tokens count
    const tokens = $B.tokenizer(code, '_');
    results.nb_tokens += tokens.length;

    console.warn(tokens);

    results.bry .times[results.bry .offset++] += t0 - beg;

    if( ! use_parser ) {
        results.sbry.times[results.sbry.offset++] += t0 - beg;
    } else {

        const beg = performance.now();
        _ast.sbry = py2ast(code, "_");
        const t0 = performance.now();

        results.sbry.times[results.sbry.offset++] += t0 - beg;
    }


    return _ast;
}