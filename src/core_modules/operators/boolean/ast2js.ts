import { wr } from "@SBrython/ast2js";
import { VALUES } from "@SBrython/dop";
import { multi_jsop } from "@SBrython/structs/BinaryOperators";

export default function ast2js(node: number) {
    wr( multi_jsop(node, VALUES[node]) );
}