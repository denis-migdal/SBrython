import { VALUES } from "@SBrython/dop";
import { write_multi_jsop } from "@SBrython/structs/BinaryOperators";

export default function ast2js(node: number) {
    write_multi_jsop(node, VALUES[node]);
}