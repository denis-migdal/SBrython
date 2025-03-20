import { w_NL, w_sns, w_str } from "@SBrython/sbry/ast2js/utils";
import { firstChild, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: number) {

    const [name, kname] = VALUES[node];
    const coffset = firstChild(node);

    w_sns(`static ${name}(`, coffset, "){", coffset+1, "}");

    w_NL();

    w_str(`${name}(...args){ ${kname}.${name}(this, ...args) }`);
}