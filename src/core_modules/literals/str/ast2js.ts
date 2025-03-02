import { wt } from "ast2js";
import { VALUES } from "dop";

export default function ast2js(node: number) {
    wt`'${VALUES[node]}'`;
}