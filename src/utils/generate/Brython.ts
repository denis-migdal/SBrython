import { SubResults } from "../results";

declare const $B: any;

// jscode = $B.pythonToJS(code);

export default function generateBrython(_ast: any, src:string, results: SubResults) {

    const ast = _ast.bry;

    $B.debug = 0;

    const beg = performance.now();

    const filename = "_";
    const future = $B.future_features(ast, filename)

    //times[1] += performance.now();

    var symtable = $B._PySymtable_Build(ast, filename, future)

    const t0 = performance.now();

    let imported:any;
    const jscode  = $B.js_from_root({ast,
                                  symtable,
                                  filename,
                                  src,
                                  imported}).js

    const t1 = performance.now();
    
    results.code = jscode;

    //results.times[results.offset++] += t1 - beg; // total
    results.times[results.offset++] += t0 - beg;
    results.times[results.offset++] += t1 - t0;

    return jscode;
}

// try-catch to get errors...