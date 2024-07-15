/******/ var __webpack_modules__ = ({

/***/ "./src/ast2js.ts":
/*!***********************!*\
  !*** ./src/ast2js.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ast2js: () => (/* binding */ ast2js),
/* harmony export */   astnode2js: () => (/* binding */ astnode2js)
/* harmony export */ });
function ast2js(ast) {
    let js = "";
    let cursor = {
        line: 1,
        col: 0
    };
    for (let node of ast){
        js += astnode2js(node, cursor) + "\n";
        ++cursor.line;
    }
    return js;
}
function astnode2js(node, start) {
    node.jscode = {
        start: {
            ...start
        },
        end: null
    };
    let js = node.toJS();
    /*else if(node.type === "float")
        js = node.value;
    else if(node.type === "if") //TODO...
        js = `if( ${convert_astnode2js(node.children[0])} ) {
    ${node.children.slice(1).map( e => convert_astnode2js(e)).join("\n")}    
    }`;
    else
        js = "";*/ node.jscode.end = {
        line: start.line,
        col: start.col + js.length
    };
    return js;
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


function convert(node) {
    if (!("test" in node)) return false;
    //TODO: check condition type...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "ifblock", "ifblock", [
        new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "ifblock", "if", [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test),
            ...node.body.map((m)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_line)(m))
        ])
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
/* harmony import */ var _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core_modules/operators/ast2js */ "./src/core_modules/operators/ast2js.ts");
/* harmony import */ var _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core_modules/integer/ast2js */ "./src/core_modules/integer/ast2js.ts");
/* harmony import */ var _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_modules/fctcall/ast2js */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core_modules/symbol/ast2js */ "./src/core_modules/symbol/ast2js.ts");
/* harmony import */ var _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core_modules/ifblock/ast2js */ "./src/core_modules/ifblock/ast2js.ts");
// Brython must be imported before.
//TODO: use genlist





const AST_CONVERT = [
    _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_0__["default"],
    _core_modules_integer_astconvert__WEBPACK_IMPORTED_MODULE_1__["default"],
    _core_modules_fctcall_astconvert__WEBPACK_IMPORTED_MODULE_2__["default"],
    _core_modules_symbol_astconvert__WEBPACK_IMPORTED_MODULE_3__["default"],
    _core_modules_ifblock_astconvert__WEBPACK_IMPORTED_MODULE_4__["default"]
];
//TODO: use genlist





const AST2JS = [
    _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_5__["default"],
    _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_6__["default"],
    _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_7__["default"],
    _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_8__["default"],
    _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_9__["default"]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqQztRQUNEO0lBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRyxHQUNGO0FBQ0Q7Ozs7Ozs7U0M5REE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYiIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvaW50ZWdlci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcikgKyBcIlxcblwiXG4gICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgfVxuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBzdGFydDogQ29kZVBvcykge1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7Li4uc3RhcnR9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKCk7XG4gICAgXG4gICAgLyplbHNlIGlmKG5vZGUudHlwZSA9PT0gXCJmbG9hdFwiKVxuICAgICAgICBqcyA9IG5vZGUudmFsdWU7XG4gICAgZWxzZSBpZihub2RlLnR5cGUgPT09IFwiaWZcIikgLy9UT0RPLi4uXG4gICAgICAgIGpzID0gYGlmKCAke2NvbnZlcnRfYXN0bm9kZTJqcyhub2RlLmNoaWxkcmVuWzBdKX0gKSB7XG4gICAgJHtub2RlLmNoaWxkcmVuLnNsaWNlKDEpLm1hcCggZSA9PiBjb252ZXJ0X2FzdG5vZGUyanMoZSkpLmpvaW4oXCJcXG5cIil9ICAgIFxuICAgIH1gO1xuICAgIGVsc2VcbiAgICAgICAganMgPSBcIlwiOyovXG4gICAgXG4gICAgbm9kZS5qc2NvZGUuZW5kID0ge1xuICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICBjb2wgOiBzdGFydC5jb2wgKyBqcy5sZW5ndGhcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICBsZXQganMgPSBgJHsgYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpfShgO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSlcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICBcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYCR7IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKX1gO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJmdW5jXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZmN0Y2FsbFwiLCB1bmRlZmluZWQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYyApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlKSApXG4gICAgXSk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG4gICAgY29uc3Qgc3RhcnRfY29sID0gY3Vyc29yLmNvbDtcblxuICAgIGxldCBqcyA9IGAkeyBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcil9KGA7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKVxuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgIFxuICAgICAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgICAgICBqcyArPSBgJHsgYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpfWA7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwidGVzdFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy9UT0RPOiBjaGVjayBjb25kaXRpb24gdHlwZS4uLlxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiaWZibG9ja1wiLCBcImlmYmxvY2tcIiwgW1xuICAgICAgICBuZXcgQVNUTm9kZShub2RlLCBcImlmYmxvY2tcIiwgXCJpZlwiLCBbIC8vVE9ETzogcHljb2RlID8/P1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCksXG4gICAgICAgICAgICAuLi5ub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtKSApXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfW5gO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpbnRlZ2VyXCIsIG5vZGUudmFsdWUpO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICAvL1RPRE86IGNoZWNrIGNoaWxkcmVuIHR5cGUuLi5cbiAgICAvL1RPRE86IHByaW9yaXR5IGNoZWNrc1xuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIitcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCJcIjtcblxuICAgIC8qXG4gICAgbGV0IGpzID0gXCJvcChcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIsICcrJywgXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICAvKmxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJPcGVyYXRvclwiLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUubGVmdCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlOyAvL1RPRE9cbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwiaWRcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCBub2RlLmlkKTtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiB1c2UgZ2VubGlzdFxuaW1wb3J0IEMxIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0Y29udmVydFwiO1xuaW1wb3J0IEMyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDMyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzUgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0Y29udmVydFwiO1xuXG5jb25zdCBBU1RfQ09OVkVSVCA9IFtcbiAgICBDMSxcbiAgICBDMixcbiAgICBDMyxcbiAgICBDNCxcbiAgICBDNVxuXVxuLy9UT0RPOiB1c2UgZ2VubGlzdFxuaW1wb3J0IEExIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0MmpzXCI7XG5pbXBvcnQgQTIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzXCI7XG5pbXBvcnQgQTMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzXCI7XG5pbXBvcnQgQTQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcbmltcG9ydCBBNSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaWZibG9jay9hc3QyanNcIjtcblxuY29uc3QgQVNUMkpTID0gW1xuICAgIEExLFxuICAgIEEyLFxuICAgIEEzLFxuICAgIEE0LFxuICAgIEE1XG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIk5cIiwgYnJ5dGhvbl9ub2RlKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBBU1RfQ09OVkVSVC5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gQVNUX0NPTlZFUlRbaV0oYnJ5dGhvbl9ub2RlKTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBBU1QySlNbaV07XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSlcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cdHJldHVybiBhc3QuYm9keS5tYXAoIGNvbnZlcnRfbGluZSApO1xufSIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCBfdmFsdWU/OiBhbnksIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cbi8qXG5cdFx0Y29uc3QgdmFsdWUgPSBsaW5lLnZhbHVlO1xuXG5cdFx0aWYoIHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwicGFzc1wiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiXCI7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIFwiY29tcGFyYXRvcnNcIiBpbiB2YWx1ZSkge1xuXG5cdFx0XHR0aGlzLnR5cGUgPSBcIk9wZXJhdG9yXCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gXCJFcXVhbHNcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdG5ldyBBU1ROb2RlKHt2YWx1ZTogdmFsdWUubGVmdH0pLFxuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmNvbXBhcmF0b3JzWzBdfSlcblx0XHRcdF07XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiggdmFsdWUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgJiYgXCJ2YWx1ZVwiIGluIHZhbHVlLnZhbHVlKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcImZsb2F0XCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWUudmFsdWUudmFsdWU7XG5cdFx0fSovXG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7Il0sIm5hbWVzIjpbImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwic3RhcnQiLCJqc2NvZGUiLCJlbmQiLCJ0b0pTIiwibGVuZ3RoIiwic3RhcnRfY29sIiwiY2hpbGRyZW4iLCJpIiwiY29udmVydF9ub2RlIiwiQVNUTm9kZSIsImNvbnZlcnQiLCJ1bmRlZmluZWQiLCJmdW5jIiwiYXJncyIsIm1hcCIsImUiLCJjb252ZXJ0X2xpbmUiLCJ0ZXN0IiwiYm9keSIsIm0iLCJ2YWx1ZSIsIm9wIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImxlZnQiLCJyaWdodCIsImlkIiwiQzEiLCJDMiIsIkMzIiwiQzQiLCJDNSIsIkFTVF9DT05WRVJUIiwiQTEiLCJBMiIsIkEzIiwiQTQiLCJBNSIsIkFTVDJKUyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImJyeXRob25fbm9kZSIsInJlc3VsdCIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwidHlwZSIsInB5Y29kZSIsIl92YWx1ZSIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiXSwic291cmNlUm9vdCI6IiJ9