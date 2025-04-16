import {generateList} from "./index.js";

export default async function genAST2JS() {
    await generateList({
        brand : "NODE_TYPE",
        path  : "./src/sbry/ast2js/",
        prefix: "AST_",
        list_type: "((node: NODE_ID) => void)[]",
        list_imports: "import type {NODE_ID} from '../dop';\n",
        add: (i, file) => {
            if( file === undefined )
                throw new Error(`${keys[i]} not found!`);
            return `LIST[${i.toString().padEnd(3)}] = require("${file}").default;\n`
        },
        index_exports: "export {ast2js} from './utils';\n",
    });
}