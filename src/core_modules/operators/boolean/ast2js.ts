import { wr } from "ast2js";
import { VALUES } from "dop";
import { multi_jsop } from "structs/BinaryOperators";

export default function ast2js(node: number) {
    wr( multi_jsop(node, VALUES[node]) );
}