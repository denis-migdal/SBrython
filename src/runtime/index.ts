import type { AST } from "@SBrython/sbry/py2ast";

import _r_  from "./_r_/list";
import _sb_ from "./_sb_/list";

export {_sb_, _r_};

// classe ?

export class SBrython {

    #registered_AST: Record<string, AST> = {};
    #exported: Record<string, Record<string, any>> = {
        browser: globalThis
    };

    //TODO: runAST() ?
    //TODO: runPythonCode() ?

    //TODO: somehow, remove AST arg ???
    buildModule(jscode: string, ast: AST) {
        if(ast.filename in this.#registered_AST)
            throw new Error(`AST ${ast.filename} already registered!`);

        //TODO: filename 2 modulename.
        this.#registered_AST[ast.filename] = ast;

        //console.log(jscode);
        return new Function("__SB__", jscode);
    }

    runJSCode(jscode: string, ast: AST) {
        this.#exported[ast.filename] = this.buildModule(jscode, ast)(this);
    }

    getModules() {
        return this.#exported;
    }
    getModule(name: string) {
        return this.#exported[name];
    }

    getASTFor(filename: string) {
        return this.#registered_AST[filename]; //TODO modulename?
    }

    print(...args: []) {
        console.log(...args);
    }

    get _r_() {
        return __COMPAT_LEVEL__ === "JS" ? null : _r_;
    }
    get _sb_() {
        //TODO...
        return __COMPAT_LEVEL__ === "JS" ? {assert: _sb_.assert} : _sb_;
    }
}

