import { BB, BE, NL, w, wt } from "ast2js";
import { ASTNode } from "structs/ASTNode";

export default function ast2js(node: ASTNode) {

    wt`try {${node.children[0]}${NL}}`;
    wt`catch(_raw_err_){${BB}${NL}`;

        w("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");

        if( node.children.length > 1)
            w( node.children[1] );

        for(let i = 2; i < node.children.length; ++i)
            w(NL, "else ", node.children[i] );

        // not a catch all...
        if( node.children[node.children.length-1].children.length !== 1)
            w(NL, "else { throw _raw_err_ }");

    w(BE, NL);

}