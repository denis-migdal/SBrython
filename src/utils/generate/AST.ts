import { Results } from "../results";

declare const $B: any;

export default function buildAST(code: string, results: Results) {

    const beg = performance.now();

    const parser = new $B.Parser(code, "_", 'file');
    const _ast   = $B._PyPegen.run_parser(parser);

    const t0 = performance.now();

    results.bry .times[results.bry .offset++] += t0 - beg;
    results.sbry.times[results.sbry.offset++] += t0 - beg;

    // tokens count
    const tokens = $B.tokenizer(code, '_');
    
    results.nb_tokens += tokens.length;

    return _ast;
}