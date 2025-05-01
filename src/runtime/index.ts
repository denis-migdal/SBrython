import type { AST } from "@SBrython/sbry/py2ast";

import _r_  from "./_r_/list";
import _sb_ from "./_sb_/list";

export {_sb_, _r_};

// classe ?

export class SBrython {

    #registered: Record<string, Record<string, any>> = {};

    register(name: string, exported: Record<string, any>) {
        this.#registered[name] = exported;
    }

    //TODO...
    // executeModule -> ObjectURL + get exports if possible...
    // jscode  = `//# sourceURL=${filename}\n`;

    // for AST...
    #registered_AST: Record<string, AST> = {};

    //TODO: runAST() ?
    //TODO: runPythonCode() ?

    //TODO: somehow, remove AST arg ???
    buildModule(jscode: string, ast: AST) {
        if(ast.filename in this.#registered_AST)
            throw new Error(`AST ${ast.filename} already registered!`);

        //TODO: filename 2 modulename.
        this.#registered_AST[ast.filename] = ast;

        //console.log(jscode);
        return new Function("__SBRY__", jscode); //TODO...
    }

    runJSCode(jscode: string, ast: AST) {
        this.#registered[ast.filename] = this.buildModule(jscode, ast)(this);
    }

    getModules() {
        return this.#registered;
    }
    getModule(name: string) {
        return this.#registered[name];
    }

    getASTFor(filename: string) {
        return this.#registered_AST[filename]; //TODO modulename?
    }

    print(...args: []) {
        console.log(...args);
    }

    get _r_() {
        return __SBRY_COMPAT__ === "NONE" ? null : _r_;
    }
    get _sb_() {
        return __SBRY_COMPAT__ === "NONE" ? null : _sb_;
    }
}

// give options here ? factory ?
export default globalThis.__SBRY__ = new SBrython();