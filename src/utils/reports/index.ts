import { Results, SubResults } from "../results";

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

export function generate_report(results: Results, a: "bry"|"sbry", b: "bry"|"sbry") {

    const nb_tokens = results.nb_tokens;
    const A = results[a];
    const B = results[b];
    
    let report = "";

    /*
    `Status         : ${error ? 'FAILED' : 'SUCCESS'}
    Tested         : ${total-excluded_count}/${total} (${excluded_count} excluded) [${nb_suites}]`
    */

    const nb_lines    = results.total_lines;
    const nb_excluded = results.nb_excluded_lines;
    const nb_done     = nb_lines - nb_excluded;

    report += "Status         : SUCCESS\n";
    report += `Tested         : ${nb_done}/${nb_lines} (${(nb_done/nb_lines*100).toFixed(2)}%)\n`;
    report += `Py code        : ${nb_tokens} tokens (${results.nb_files} file)\n`;
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