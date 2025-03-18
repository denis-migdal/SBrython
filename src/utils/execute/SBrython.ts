import { SBrython } from "@SBrython/runtime";
import { SubResults } from "../results";

export default function executeSBrython(results: SubResults, print: (...args: any[]) => void) {

    const beg = performance.now();

    const sb = new SBrython();
    sb.print = print;
    const fct = sb.buildModule(results.code, {filename: "_"} as any);

    const t0 = performance.now();

    fct(sb);

    const t1 = performance.now();

    results.times[results.offset++] += t1 - beg; // total
    results.times[results.offset++] += t0 - beg;
    results.times[results.offset++] += t1 - t0;
}

/*

sb._sb_.assert = (cond) => { if( ! cond ) {

    console.warn("Assertion failed");

    const stack = new Error().stack;

    const stackline = parse_stack(stack, sb)[0];
    const node = stackline2astnode(stackline, sb);

    output.push([`[Assertion failed as line ${node.pycode.start.line}]`, stack]);
} };

*/