import fs   from 'fs/promises';
import {glob} from 'glob';

const encoder = new TextEncoder();

async function getModules(path) {

    let files = await glob("**/*.ts", {cwd: path});

    const modules = {};

    for(let i = 0; i < files.length; ++i) {
        const filepath = files[i];

        if(filepath === "list.ts")
            continue;

        const pos = filepath.lastIndexOf("/");
        const end = filepath.indexOf(".", pos);

        const bry_name = filepath.slice(pos+1, end);

        modules[bry_name] = `./${filepath.slice(0,end)}`;
    }

    return modules;
}

function importModules(modules) {

    let result = "";

    result += "export default {\n";

    for(let key in modules)
        result += `\t${key}: require("${modules[key]}").default,\n`;

    result += "}";

    return result;
}

async function save(dirpath, content) {
    const path = `${dirpath}/list.ts`;

    const file = await fs.open(path, "a+");

    const size = (await file.stat()).size;
    const file_changed = size !== content.length;

    if( file_changed ) {
        if( size )
            await file.truncate();
        await file.write( encoder.encode(content), {position: 0}); // ftruncate doesn't reset position...
    }
    await file.close();
}

async function generateList(path) {

    await save(path, importModules( await getModules(path) ));
}

export default async function genBry2SBry() {

    //console.time("Building bry2sbry list");

    await generateList("./src/bry2sbry/");

    //console.timeEnd("Building bry2sbry list");
}