import { w } from "ast2js";
import { firstChild } from "dop";

export default function ast2js(node: number) {

    w("${", firstChild(node), "}")
}