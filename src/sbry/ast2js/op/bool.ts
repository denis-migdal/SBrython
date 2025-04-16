// @ts-nocheck

import { NODE_ID, VALUES } from "@SBrython/sbry/dop";

export default function ast2js(node: NODE_ID) {
    write_multi_jsop(node, VALUES[node]);
}