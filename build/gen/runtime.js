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
            || filepath === "utils.ts"
            || filepath === "ast2js.ts")
            continue;

        const beg = filepath.indexOf("/");
        const end = filepath.indexOf(".", beg);
        const type_name = filepath.slice(beg+1, end);

        modules[type_name] = `./${filepath.slice(0,end)}`;
    }

    return modules;
}

function importModules(modules) {

    let result = "export default {\n";

    for(let key in modules) {
        result += `\t"${key}": require("${modules[key]}").default,\n`;
    }

    result += "}\n";

    return result;
}

function importSBModules(modules) {

    let result = "export default {\n";

    for(let key in modules) {
        result += `\t...require("${modules[key]}").default,\n`;
    }

    result += "}\n";

    return result;
}


async function generateList(path) {

    await Promise.all([
        save(`${path}/_r_/list.ts` , importModules( await getModules(path + "_r_") ) ),
        save(`${path}/_sb_/list.ts` , importSBModules( await getModules(path + "_sb_") ) ),
    ]);
}

export default async function genAST2JS() {

    await generateList("./src/runtime/");
}