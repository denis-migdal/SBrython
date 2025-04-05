import { NODE_ID, VALUES } from "@SBrython/sbry/dop";
import { write_multi_jsop } from "@SBrython/sbry/structs/BinaryOperators";

export default function ast2js(node: NODE_ID) {
    write_multi_jsop(node, VALUES[node]);
}