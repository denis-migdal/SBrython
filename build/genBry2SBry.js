import save from "./save.js";
import {glob} from 'glob';

async function getModules(path) {

    let files = await glob("**/*.ts", {cwd: path});

    const modules = {};

    for(let i = 0; i < files.length; ++i) {
        const filepath = files[i];

        if(filepath === "list.ts" || filepath === "index.ts" || filepath === "index.js")
            continue;

        const pos = filepath.lastIndexOf("/");
        const end = filepath.indexOf(".", pos);

        const bry_name = filepath.slice(pos+1, end);

        modules[bry_name] = `./${filepath.slice(0,end)}`;
    }

    return modules;
}

function importModules(modules) {

    let result = "export default {\n";

    for(let key in modules)
        result += `\t${key}: require("${modules[key]}").default,\n`;

    result += "}";

    return result;
}

async function generateList(path) {

    await save(`${path}/list.ts`, importModules( await getModules(path) ));
}

export default async function genBry2SBry() {

    //console.time("Building bry2sbry list");

    await generateList("./src/bry2sbry/");

    //console.timeEnd("Building bry2sbry list");
}