import { BB, BE, NL, w, wt } from "@SBrython/ast2js";
import { firstChild, nbChild } from "@SBrython/dop";

export default function ast2js(node: number) {

    const coffset    = firstChild(node);
    const nbChildren = nbChild(node);

    wt`try {${coffset}${NL}}`;
    wt`catch(_raw_err_){${BB}${NL}`;

        w("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");

        if( nbChildren > 1)
            w( 1+coffset );

        for(let i = 2; i < nbChildren; ++i)
            w(NL, "else ", i + coffset );

        // not a catch all...
        if( nbChild(coffset + nbChildren-1) !== 1)
            w(NL, "else { throw _raw_err_ }");

    w(BE, NL);

}