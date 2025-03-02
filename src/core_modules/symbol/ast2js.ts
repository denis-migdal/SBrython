import { w } from "ast2js";
import { VALUES } from "dop";

export default function ast2js(node: number) {
    w( VALUES[node] );
}