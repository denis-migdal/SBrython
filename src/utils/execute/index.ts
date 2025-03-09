import { Results } from "../results";
import executeBrython from "./Brython";
import executeSBrython from "./SBrython";

export default function execute(results: Results) {

    const offset = results.bry.offset;

    executeSBrython(results.sbry);
     executeBrython(results.bry );

    results. bry.times[0] += results. bry.times[offset];
    results.sbry.times[0] += results.sbry.times[offset];
}