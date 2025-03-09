import { SubResults } from "../results";

const labels = [
    "Executed in    :",
    "    PY2JS      :",
    "        py2ast :",
    "        astProc:",
    "        ast2js :",
    "    RUNTIME    :",
    "        genFct :",
    "        exeFct :"
];

function tformat(time: number, unit: string) {
    return time.toFixed(3).padStart(7) + unit;
}

function tdiff(a: number, b: number) {

    const c = a/b;

    if( c === 1)
        return "   =   ";

    if( c > 1 )
        return "x" + c.toFixed(2).padStart(6);

    return "-" + (-(100*a/b - 100)).toFixed(2).padStart(5) + "%";
}

export function generate_report(nb_tokens: number, A: SubResults, B: SubResults) {

    let report = "";

    /*
    `Status         : ${error ? 'FAILED' : 'SUCCESS'}
    Tested         : ${total-excluded_count}/${total} (${excluded_count} excluded) [${nb_suites}]`
    */

    report += "Status         : SUCCESS\n";
    report += "Tested         : 194/1866 (1672 excluded)\n";
    report += "Py code        : " + nb_tokens + " tokens (1 file)\n";
    report += "JS code        : " + tdiff(A.code.length, B.code.length) + "\n";
    report += "\n"

    const tcoef = 100_000 / nb_tokens / 1000;

    for(let i = 0; i < labels.length; ++i) {

        report += labels[i]
                    + tformat(A.times[i] * tcoef, "s")
                    + " ["
                    + tdiff(A.times[i], B.times[i])
                    + "] "
                    + tformat(A.times[i], "ms")
                    + "\n";

    }


    return report;
}