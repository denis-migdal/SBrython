import {generateList} from "./index.js";

export default async function genAST2JS() {
    await generateList({
        brand : "TYPE_ID",
        path  : "./src/sbry/types/",
        prefix: "TYPEID_",
        list_type: "Type[]",
        list_imports: "import type {Type} from './utils/types';\n",
        add: (i, file) => file === undefined ? "" : `require("${file}");\n`,
    });
}

/*

async function getModules(path) {

    let files = await glob("**//*.ts", {cwd: path});

    const modules = {};

    for(let i = 0; i < files.length; ++i) {
        const filepath = files[i];

        if(filepath === "list.ts"
            || filepath === "index.ts"
            || filepath === "bases.ts"
            || filepath === "builtins.ts"
            || filepath.startsWith("utils") )
            continue;

        const pos = filepath.lastIndexOf("/");
        const end = filepath.indexOf(".", pos);

        const type_name = filepath.slice(pos+1, end)
                                  .replace('[', '_')
                                  .replace(']', '_');

        modules[type_name] = `./${filepath.slice(0,end)}`;
    }

    return modules;
}

import * as TYPES from "../../src/sbry/types/index.js";

function importModules(modules) {

    let result = "import LIST from './index';\n\n";

    let keys = Object.keys(TYPES);
    --keys.length; // remove default export
    const order = new Array(keys.length);
    for(let i = 0; i < keys.length; ++i)
        order[TYPES[keys[i]]] = keys[i].slice(7);

    for(let i = 0; i < order.length; ++i) {
        const file = modules[order[i]];
        if( file === undefined )
            throw new Error(`${order[i]} not found!`);
        result += `require("${file}");\n`;
    }

    result += "\nexport default LIST;\n";

    return result;
}

async function generateList(path) {

    const modules = await getModules(path);

    await save(`${path}/list.ts` , importModules(modules) );
}

export default async function genTypes() {

    await generateList("./src/sbry/types/");
}*/