// used by ast2js & types

import save from "../save.js";

export async function generateList({
                                path,
                                prefix,
                                list_type,
                                brand,
                                list_imports,
                                index_exports = "",
                                add,
                            }) {
    
    const data = await import("../../" + path + "/list.js");
    const keys = [...Object.keys(data)].slice(0,-1)
                                       .sort( (a,b) => data[a] - data[b] );

    await save(`${path}/index.ts` , await generateIndex(path, prefix, keys, add, index_exports) );
    await save(`${path}/list.d.ts` , await generateTypes(brand, data, keys, list_type, list_imports) );
}

async function generateIndex(path, prefix, keys, add, index_exports) {

    const modules = await getModules(path);

    let result = "import LIST from './list';\nexport default LIST;\n";
    result += index_exports;

    result += "\n"

    for(let i = 0; i < keys.length; ++i) {
        const file = modules[keys[i].slice(prefix.length).toUpperCase()];
        
        result += add(i, file);
    }


    result += "\nconst _id2name = __SBRY_MODE__ !== 'dev' ? [] : [\n";

    for(let key of keys)
        result += `\t"${key.slice(prefix.length)}",\n`;

    result += "];\n";
    result += "export const id2name = _id2name;\n";

    return result;
}

async function generateTypes(brand, data, keys, list_type, list_imports) {

    const pad = Math.max(...keys.map( k => k.length));

    let result = `${list_imports}\n//@ts-ignore\nimport {BRAND} from '@SBrython/dop';\n\n`;
    result += `\ndeclare const LIST: ${list_type};\nexport default LIST;\n\n`;

    for(let key of keys)
        result += `export declare const ${key.padEnd(pad)}: BRAND<${data[key].toString().padEnd(3)}, "${brand}">;\n`;

    return result;
}


import {glob} from 'glob';

async function getModules(path) {

    let files = await glob("**/*.ts", {cwd: path});

    const modules = {};

    for(let i = 0; i < files.length; ++i) {
        const filepath = files[i];

        if(    filepath === "list.js"
            || filepath === "list.d.ts"
            || filepath === "utils.ts"
            || filepath === "index.ts") // generated
            continue;

        const end = filepath.indexOf(".", 0);
        const type_name = filepath.slice(0, end)
                                  .replace(/\/index$/, '')
                                  .replaceAll('/', '_')
                                  .replace('[', '_')
                                  .replace(']', '_')
                                  .toUpperCase();

        modules[type_name] = `./${filepath.slice(0,end)}`;
    }

    return modules;
}