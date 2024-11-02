import { BB, BE, NL, w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(this: ASTNode) {

    wt`try {${this.children[0]}${NL}}`;
    wt`catch(_raw_err_){${BB}${NL}`;

        w("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");

        if( this.children.length > 1)
            w( this.children[1] );

        for(let i = 2; i < this.children.length; ++i)
            w(NL, "else ", this.children[i] );

        // not a catch all...
        if( this.children[this.children.length-1].children.length !== 1)
            w(NL, "else { throw _raw_err_ }");

    w(BE, NL);

}