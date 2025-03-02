import { NL, wt } from "ast2js";
import { firstChild, nbChild, VALUES } from "dop";

export default function ast2js(node: number) {

    let base: string|number = "_r_.object";

    const body       = firstChild(node);
    const nbChildren = nbChild(node);

    if( nbChildren === 2)
        base = body+1;

    wt`class ${VALUES[node]} extends ${base} {${body}${NL}}`;
}