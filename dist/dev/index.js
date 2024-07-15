/******/ var __webpack_modules__ = ({

/***/ "./src/ast2js.ts":
/*!***********************!*\
  !*** ./src/ast2js.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ast2js: () => (/* binding */ ast2js),
/* harmony export */   astnode2js: () => (/* binding */ astnode2js),
/* harmony export */   newline: () => (/* binding */ newline)
/* harmony export */ });
function ast2js(ast) {
    let js = "";
    let cursor = {
        line: 1,
        col: 0
    };
    for (let node of ast){
        js += astnode2js(node, cursor);
        js += newline(node, cursor);
    }
    return js;
}
function update_end(node, js) {
    if (node.jscode.end !== null) return;
    const start = node.jscode.start;
    let line_count = 0;
    let last_line_idx = 0;
    for(let i = 0; i < js.length; ++i)if (js[i] === '\n') {
        ++line_count;
        last_line_idx = i;
    }
    console.log(line_count, js.length);
    if (line_count === 0) {
        node.jscode.end = {
            line: start.line,
            col: start.col + js.length
        };
        return;
    }
    node.jscode.end = {
        line: start.line + line_count,
        col: js.length - last_line_idx
    };
}
function newline(node, cursor, indent_level = 0) {
    const indent = indent_level * 4 + node.jscode.start.col;
    ++cursor.line;
    cursor.col = indent;
    return "\n" + "".padStart(indent);
}
function astnode2js(node, cursor) {
    node.jscode = {
        start: {
            ...cursor
        },
        end: null
    };
    let js = node.toJS();
    update_end(node, js);
    cursor.line = node.jscode.end.line;
    cursor.col = node.jscode.end.col;
    return js;
}


/***/ }),

/***/ "./src/core_modules/bool/ast2js.ts":
/*!*****************************************!*\
  !*** ./src/core_modules/bool/ast2js.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}`;
}


/***/ }),

/***/ "./src/core_modules/bool/astconvert.ts":
/*!*********************************************!*\
  !*** ./src/core_modules/bool/astconvert.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node) {
    if (typeof node.value !== "boolean") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literal.bool", node.value);
    astnode.result_type = "bool";
    return astnode;
}


/***/ }),

/***/ "./src/core_modules/fctcall/ast2js.ts":
/*!********************************************!*\
  !*** ./src/core_modules/fctcall/ast2js.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    let cursor = {
        ...this.jscode.start
    };
    const start_col = cursor.col;
    let js = `${(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor)}(`;
    for(let i = 1; i < this.children.length; ++i){
        if (i !== 1) js += ",";
        cursor.col = start_col + js.length;
        js += `${(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[i], cursor)}`;
    }
    js += ")";
    return js;
}


/***/ }),

/***/ "./src/core_modules/fctcall/astconvert.ts":
/*!************************************************!*\
  !*** ./src/core_modules/fctcall/astconvert.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node) {
    if (!("func" in node)) return false;
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "fctcall", undefined, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.func),
        ...node.args.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e))
    ]);
}


/***/ }),

/***/ "./src/core_modules/ifblock/ast2js.ts":
/*!********************************************!*\
  !*** ./src/core_modules/ifblock/ast2js.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    let cursor = {
        ...this.jscode.start
    };
    if (this.type === "ifblock") return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    //if
    const start_col = cursor.col;
    let js = "if(";
    cursor.col = start_col + js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += "){";
    cursor.col += 2;
    for(let i = 1; i < this.children.length; ++i){
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[i], cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor);
    js += "}";
    this.jscode.end = {
        line: cursor.line,
        col: 2
    };
    return js;
}


/***/ }),

/***/ "./src/core_modules/ifblock/astconvert.ts":
/*!************************************************!*\
  !*** ./src/core_modules/ifblock/astconvert.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


//TODO: better system...
let is_if = false;
function convert(node) {
    if (!("test" in node)) return false;
    if (is_if) {
        is_if = false;
        const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test);
        if (cond.result_type !== "bool") throw new Error(`Type ${cond.result_type} not yet supported as if condition`);
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "if", null, [
            cond,
            ...node.body.map((m)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_line)(m))
        ]);
    }
    is_if = true;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "ifblock", null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node)
    ]);
}


/***/ }),

/***/ "./src/core_modules/integer/ast2js.ts":
/*!********************************************!*\
  !*** ./src/core_modules/integer/ast2js.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}n`;
}


/***/ }),

/***/ "./src/core_modules/integer/astconvert.ts":
/*!************************************************!*\
  !*** ./src/core_modules/integer/astconvert.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node) {
    if (typeof node.value !== "number") return false;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "integer", node.value);
}


/***/ }),

/***/ "./src/core_modules/operators/ast2js.ts":
/*!**********************************************!*\
  !*** ./src/core_modules/operators/ast2js.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    let cursor = {
        ...this.jscode.start
    };
    const start_col = cursor.col;
    //TODO: check children type...
    //TODO: priority checks
    let js = "";
    cursor.col = start_col + js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += "+";
    cursor.col = start_col + js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[1], cursor);
    js += "";
    /*
    let js = "op(";

    cursor.col = start_col + js.length;
    js += astnode2js(this.children[0], cursor);

    js += ", '+', ";

    cursor.col = start_col + js.length;
    js += astnode2js(this.children[1], cursor);

    js += ")";*/ /*let js = `${this.value}(`;
    for(let i = 0; i < this.children.length; ++i) {
        if( i !== 0)
            js += ",";
        cursor.col = start_col + js.length;
        js += astnode2js(this.children[i], cursor);
    }
    js += ")";*/ return js;
}


/***/ }),

/***/ "./src/core_modules/operators/astconvert.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/operators/astconvert.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node) {
    if (!("op" in node)) return false;
    let op = node.op.constructor.$name;
    if (op === "Add") op = "+";
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator", op, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right)
    ]);
}


/***/ }),

/***/ "./src/core_modules/symbol/ast2js.ts":
/*!*******************************************!*\
  !*** ./src/core_modules/symbol/ast2js.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return this.value; //TODO
}


/***/ }),

/***/ "./src/core_modules/symbol/astconvert.ts":
/*!***********************************************!*\
  !*** ./src/core_modules/symbol/astconvert.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node) {
    if (!("id" in node)) return false;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "symbol", node.id);
}


/***/ }),

/***/ "./src/py2ast.ts":
/*!***********************!*\
  !*** ./src/py2ast.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convert_ast: () => (/* binding */ convert_ast),
/* harmony export */   convert_line: () => (/* binding */ convert_line),
/* harmony export */   convert_node: () => (/* binding */ convert_node),
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_modules/operators/astconvert */ "./src/core_modules/operators/astconvert.ts");
/* harmony import */ var _core_modules_integer_astconvert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/integer/astconvert */ "./src/core_modules/integer/astconvert.ts");
/* harmony import */ var _core_modules_fctcall_astconvert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core_modules/fctcall/astconvert */ "./src/core_modules/fctcall/astconvert.ts");
/* harmony import */ var _core_modules_symbol_astconvert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/symbol/astconvert */ "./src/core_modules/symbol/astconvert.ts");
/* harmony import */ var _core_modules_ifblock_astconvert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_modules/ifblock/astconvert */ "./src/core_modules/ifblock/astconvert.ts");
/* harmony import */ var _core_modules_bool_astconvert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core_modules/bool/astconvert */ "./src/core_modules/bool/astconvert.ts");
/* harmony import */ var _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core_modules/operators/ast2js */ "./src/core_modules/operators/ast2js.ts");
/* harmony import */ var _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_modules/integer/ast2js */ "./src/core_modules/integer/ast2js.ts");
/* harmony import */ var _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core_modules/fctcall/ast2js */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core_modules/symbol/ast2js */ "./src/core_modules/symbol/ast2js.ts");
/* harmony import */ var _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core_modules/ifblock/ast2js */ "./src/core_modules/ifblock/ast2js.ts");
/* harmony import */ var _core_modules_bool_ast2js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core_modules/bool/ast2js */ "./src/core_modules/bool/ast2js.ts");
// Brython must be imported before.
//TODO: use genlist






const AST_CONVERT = [
    _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_0__["default"],
    _core_modules_integer_astconvert__WEBPACK_IMPORTED_MODULE_1__["default"],
    _core_modules_fctcall_astconvert__WEBPACK_IMPORTED_MODULE_2__["default"],
    _core_modules_symbol_astconvert__WEBPACK_IMPORTED_MODULE_3__["default"],
    _core_modules_ifblock_astconvert__WEBPACK_IMPORTED_MODULE_4__["default"],
    _core_modules_bool_astconvert__WEBPACK_IMPORTED_MODULE_5__["default"]
];
//TODO: use genlist






const AST2JS = [
    _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_6__["default"],
    _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_7__["default"],
    _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_8__["default"],
    _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_9__["default"],
    _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_10__["default"],
    _core_modules_bool_ast2js__WEBPACK_IMPORTED_MODULE_11__["default"]
];
function py2ast(code) {
    const parser = new $B.Parser(code, "filename", 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    return convert_ast(_ast);
}
function convert_node(brython_node) {
    //console.log("N", brython_node);
    for(let i = 0; i < AST_CONVERT.length; ++i){
        let result = AST_CONVERT[i](brython_node);
        if (result !== false) {
            result.toJS = AST2JS[i];
            return result;
        }
    }
    console.error(brython_node);
    throw new Error("Unsupported node");
}
function convert_line(line) {
    let node = line;
    if ("value" in line) node = line.value;
    return convert_node(node);
}
function convert_ast(ast) {
    return ast.body.map(convert_line);
}


/***/ }),

/***/ "./src/structs/ASTNode.ts":
/*!********************************!*\
  !*** ./src/structs/ASTNode.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ASTNode: () => (/* binding */ ASTNode)
/* harmony export */ });
class ASTNode {
    type;
    value;
    children = [];
    result_type = null;
    pycode;
    jscode;
    toJS;
    constructor(brython_node, type, _value, children = []){
        this.type = type;
        this.value = _value;
        this.children = children;
        this.pycode = {
            start: {
                line: brython_node.lineno,
                col: brython_node.col_offset
            },
            end: {
                line: brython_node.end_lineno,
                col: brython_node.end_col_offset
            }
        };
    /*
		const value = line.value;

		if( value === undefined) {
			this.type = "pass";
			this.value = "";
			return;
		}

		if( "comparators" in value) {

			this.type = "Operator";
			this.value = "Equals";
			this.children = [
				new ASTNode({value: value.left}),
				new ASTNode({value: value.comparators[0]})
			];

			return;
		}

		if( value.value instanceof Object && "value" in value.value) {
			this.type = "float";
			this.value = value.value.value;
		}*/ }
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   convert_ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_ast),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");



var __webpack_exports__ast2js = __webpack_exports__.ast2js;
var __webpack_exports__convert_ast = __webpack_exports__.convert_ast;
var __webpack_exports__py2ast = __webpack_exports__.py2ast;
export { __webpack_exports__ast2js as ast2js, __webpack_exports__convert_ast as convert_ast, __webpack_exports__py2ast as py2ast };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVE5vZGVbXSkge1xuXG5cdGxldCBqcyA9IFwiXCI7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAxLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0KSB7XG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG5cdHJldHVybiBqcztcbn1cblxuZnVuY3Rpb24gdXBkYXRlX2VuZChub2RlOiBBU1ROb2RlLCBqczogc3RyaW5nKSB7XG5cbiAgICBpZiggbm9kZS5qc2NvZGUhLmVuZCAhPT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBub2RlLmpzY29kZSEuc3RhcnQ7XG5cbiAgICBsZXQgbGluZV9jb3VudCAgICA9IDA7XG4gICAgbGV0IGxhc3RfbGluZV9pZHggPSAwO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGpzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZihqc1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICsrbGluZV9jb3VudDtcbiAgICAgICAgICAgIGxhc3RfbGluZV9pZHggPSBpO1xuICAgICAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsaW5lX2NvdW50LCBqcy5sZW5ndGgpO1xuXG4gICAgaWYobGluZV9jb3VudCA9PT0gMCkge1xuICAgICAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICAgICAgbGluZTogc3RhcnQubGluZSxcbiAgICAgICAgICAgIGNvbCA6IHN0YXJ0LmNvbCArIGpzLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBzdGFydC5saW5lICsgbGluZV9jb3VudCxcbiAgICAgICAgY29sIDoganMubGVuZ3RoIC0gbGFzdF9saW5lX2lkeFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGNvbnN0IGluZGVudCA9IGluZGVudF9sZXZlbCo0ICsgbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKCk7XG5cbiAgICB1cGRhdGVfZW5kKG5vZGUsIGpzKTtcblxuICAgIGN1cnNvci5saW5lID0gbm9kZS5qc2NvZGUhLmVuZC5saW5lO1xuICAgIGN1cnNvci5jb2wgID0gbm9kZS5qc2NvZGUhLmVuZC5jb2w7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbC5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIGFzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcbiAgICBjb25zdCBzdGFydF9jb2wgPSBjdXJzb3IuY29sO1xuXG4gICAgbGV0IGpzID0gYCR7IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKX0oYDtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgXG4gICAgICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAgICAgIGpzICs9IGAkeyBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcil9YDtcbiAgICB9XG5cbiAgICBqcyArPSBcIilcIjtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwiZnVuY1wiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gVE9ETzogbm9kZS5hcmdzIC8vIGZjdCBjYWxsIGFyZ3VtZW50LlxuICAgIC8vIFRPRE86IHRoaXMgP1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZjdGNhbGxcIiwgdW5kZWZpbmVkLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSkgKVxuICAgIF0pO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJpZmJsb2NrXCIpXG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICAvL2lmXG4gICAgY29uc3Qgc3RhcnRfY29sID0gY3Vyc29yLmNvbDtcblxuICAgIGxldCBqcyA9IFwiaWYoXCI7XG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCIpe1wiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDI7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgfVxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSBcIn1cIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2w6IDIsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiBiZXR0ZXIgc3lzdGVtLi4uXG5sZXQgaXNfaWYgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCAhIChcInRlc3RcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCBpc19pZiApIHtcbiAgICAgICAgaXNfaWYgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCk7XG4gICAgICAgIFxuICAgICAgICBpZihjb25kLnJlc3VsdF90eXBlICE9PSBcImJvb2xcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke2NvbmQucmVzdWx0X3R5cGV9IG5vdCB5ZXQgc3VwcG9ydGVkIGFzIGlmIGNvbmRpdGlvbmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImlmXCIsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICAuLi5ub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtKSApXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGlzX2lmID0gdHJ1ZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImlmYmxvY2tcIiwgbnVsbCwgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUpXG4gICAgICAgIF0pO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9bmA7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImludGVnZXJcIiwgbm9kZS52YWx1ZSk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG4gICAgY29uc3Qgc3RhcnRfY29sID0gY3Vyc29yLmNvbDtcblxuICAgIC8vVE9ETzogY2hlY2sgY2hpbGRyZW4gdHlwZS4uLlxuICAgIC8vVE9ETzogcHJpb3JpdHkgY2hlY2tzXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBcbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiK1wiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIlwiO1xuXG4gICAgLypcbiAgICBsZXQganMgPSBcIm9wKFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIiwgJysnLCBcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIpXCI7Ki9cblxuICAgIC8qbGV0IGpzID0gYCR7dGhpcy52YWx1ZX0oYDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCAhIChcIm9wXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgb3AgPSBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lO1xuICAgIGlmKCBvcCA9PT0gXCJBZGRcIilcbiAgICAgICAgb3AgPSBcIitcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yXCIsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7IC8vVE9ET1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJpZFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIG5vZGUuaWQpO1xufSIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG4vL1RPRE86IHVzZSBnZW5saXN0XG5pbXBvcnQgQzEgZnJvbSBcIi4vY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0Y29udmVydFwiO1xuaW1wb3J0IEMzIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDNCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDNSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaWZibG9jay9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzYgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2Jvb2wvYXN0Y29udmVydFwiO1xuXG5jb25zdCBBU1RfQ09OVkVSVCA9IFtcbiAgICBDMSxcbiAgICBDMixcbiAgICBDMyxcbiAgICBDNCxcbiAgICBDNSxcbiAgICBDNlxuXVxuLy9UT0RPOiB1c2UgZ2VubGlzdFxuaW1wb3J0IEExIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0MmpzXCI7XG5pbXBvcnQgQTIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzXCI7XG5pbXBvcnQgQTMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzXCI7XG5pbXBvcnQgQTQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcbmltcG9ydCBBNSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaWZibG9jay9hc3QyanNcIjtcbmltcG9ydCBBNiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvYm9vbC9hc3QyanNcIjtcblxuY29uc3QgQVNUMkpTID0gW1xuICAgIEExLFxuICAgIEEyLFxuICAgIEEzLFxuICAgIEE0LFxuICAgIEE1LFxuICAgIEE2XG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIk5cIiwgYnJ5dGhvbl9ub2RlKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBBU1RfQ09OVkVSVC5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gQVNUX0NPTlZFUlRbaV0oYnJ5dGhvbl9ub2RlKTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBBU1QySlNbaV07XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSlcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cdHJldHVybiBhc3QuYm9keS5tYXAoIGNvbnZlcnRfbGluZSApO1xufSIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCBfdmFsdWU/OiBhbnksIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cbi8qXG5cdFx0Y29uc3QgdmFsdWUgPSBsaW5lLnZhbHVlO1xuXG5cdFx0aWYoIHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwicGFzc1wiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiXCI7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIFwiY29tcGFyYXRvcnNcIiBpbiB2YWx1ZSkge1xuXG5cdFx0XHR0aGlzLnR5cGUgPSBcIk9wZXJhdG9yXCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gXCJFcXVhbHNcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdG5ldyBBU1ROb2RlKHt2YWx1ZTogdmFsdWUubGVmdH0pLFxuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmNvbXBhcmF0b3JzWzBdfSlcblx0XHRcdF07XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiggdmFsdWUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgJiYgXCJ2YWx1ZVwiIGluIHZhbHVlLnZhbHVlKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcImZsb2F0XCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWUudmFsdWUudmFsdWU7XG5cdFx0fSovXG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7Il0sIm5hbWVzIjpbImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsInVwZGF0ZV9lbmQiLCJqc2NvZGUiLCJlbmQiLCJzdGFydCIsImxpbmVfY291bnQiLCJsYXN0X2xpbmVfaWR4IiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsInRvSlMiLCJ2YWx1ZSIsIkFTVE5vZGUiLCJjb252ZXJ0IiwiYXN0bm9kZSIsInJlc3VsdF90eXBlIiwic3RhcnRfY29sIiwiY2hpbGRyZW4iLCJjb252ZXJ0X25vZGUiLCJ1bmRlZmluZWQiLCJmdW5jIiwiYXJncyIsIm1hcCIsImUiLCJ0eXBlIiwiY29udmVydF9saW5lIiwiaXNfaWYiLCJjb25kIiwidGVzdCIsIkVycm9yIiwiYm9keSIsIm0iLCJvcCIsImNvbnN0cnVjdG9yIiwiJG5hbWUiLCJsZWZ0IiwicmlnaHQiLCJpZCIsIkMxIiwiQzIiLCJDMyIsIkM0IiwiQzUiLCJDNiIsIkFTVF9DT05WRVJUIiwiQTEiLCJBMiIsIkEzIiwiQTQiLCJBNSIsIkE2IiwiQVNUMkpTIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiYnJ5dGhvbl9ub2RlIiwicmVzdWx0IiwiZXJyb3IiLCJweWNvZGUiLCJfdmFsdWUiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==