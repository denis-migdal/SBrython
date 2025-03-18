export type SubResults = {
    offset: number,
    times : number[],
    code  : string,
    ast   : any
};

const results = {

    code: "",

    nb_tokens: 0,

    total_lines      : 0,
    nb_excluded_lines: 0,
    nb_files         : 0,

    bry: {
        offset: 0,
        times : new Array(8),
        code  : "",
    } as SubResults,
    sbry: {
        offset: 0,
        times : new Array(8),
        code  : "",
        ast   : null
    } as SubResults,
};

export type Results = typeof results;

export default function resetResults() {

    results.code = "";
    results.total_lines      = 0,
    results.nb_excluded_lines= 0,
    results.nb_files         = 0,

    results.nb_tokens = 0;

    results.bry.offset = 0;
    results.bry.times.fill(0);
    results.bry.code = "";

    results.sbry.offset = 0;
    results.sbry.times.fill(0);
    results.sbry.code = "";

    results.sbry.ast = null;

    return results;
}