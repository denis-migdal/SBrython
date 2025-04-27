import { w_NL, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, nextSibling, NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {

    const name = VALUES[node];
    const coffset = firstChild(node);

    w_sns(`static ${name}(`, coffset, "){", nextSibling(coffset), "}");

    w_NL();

    w_str(`${name}(...args){ return this.constructor.${name}(this, ...args) }`);
}