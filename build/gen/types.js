import {glob} from 'glob';
import save from "../save.js";

async function getModules(path) {

    let files = await glob("**/*.ts", {cwd: path});

    const modules = {};

    for(let i = 0; i < files.length; ++i) {
        const filepath = files[i];

        if(filepath === "list.ts"
            || filepath === "index.ts"
            || filepath === "bases.ts"
            || filepath === "utils.ts")
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

    let result = "export default [\n";

    let keys = Object.keys(TYPES);
    const order = new Array(keys.length);
    for(let i = 0; i < keys.length; ++i)
        order[TYPES[keys[i]]] = keys[i].slice(7);

    for(let i = 0; i < order.length; ++i) {
        const file = modules[order[i]];
        if( file === undefined )
            throw new Error(`${order[i]} not found!`);
        result += `\trequire("${file}").default,\n`;
    }

    result += "]";

    return result;
}

export function generateBases(modules) {

    let result = "";

    for(let key in modules)
        result += `export const TYPE_${key}\t= Object.create(null);\n`;

    return result;
}

async function generateList(path) {

    const modules = await getModules(path);

    await Promise.all([
        save(`${path}/list.ts` , importModules(modules) ),
        save(`${path}/bases.ts`, generateBases(modules) )
    ]);
}

export default async function genTypes() {

    await generateList("./src/sbry/types/");
}