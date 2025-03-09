import { SubResults } from "../results";

declare const $B: any;

export default function executeBrython(results: SubResults) {

    const beg = performance.now();

    const fct = new Function(results.code);

    const t0 = performance.now();
    
    $B.imported["_"] = {};
    fct();
    
    const t1 = performance.now();

    results.times[results.offset++] += t1 - beg; // total
    results.times[results.offset++] += t0 - beg;
    results.times[results.offset++] += t1 - t0;
}