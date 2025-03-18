import { Results } from "../results";
import executeBrython from "./Brython";
import executeSBrython from "./SBrython";

export default function execute(results: Results, sbry_print: (...args: any[]) => void) {

    const offset = results.bry.offset;

    executeSBrython(results.sbry, sbry_print);
     executeBrython(results.bry );

    // a little hackie
    results. bry.times[0] += results. bry.times[offset];
    results.sbry.times[0] += results.sbry.times[offset];
}