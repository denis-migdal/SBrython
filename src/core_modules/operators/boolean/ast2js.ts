import { wr } from "ast2js";
import { VALUES } from "dop";
import { ASTNode } from "structs/ASTNode";
import { multi_jsop } from "structs/BinaryOperators";

export default function ast2js(node: ASTNode) {
    wr( multi_jsop(node, VALUES[node.id], ...node.children) );
}