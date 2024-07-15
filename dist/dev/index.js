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
    let js = "if(";
    cursor.col += js.length;
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
        if (node.orelse.length !== 0) throw new Error("else/elif not yet supported");
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

/***/ "./src/core_modules/operator.==/ast2js.ts":
/*!************************************************!*\
  !*** ./src/core_modules/operator.==/ast2js.ts ***!
  \************************************************/
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
    //TODO None type...
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += "===";
    cursor.col += 3;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[1], cursor);
    this.jscode.end = {
        ...cursor
    };
    return js;
}


/***/ }),

/***/ "./src/core_modules/operator.==/astconvert.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/operator.==/astconvert.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node) {
    if (!("ops" in node) && node.ops[0].constructor.$name !== "Eq") return false;
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.comparators[0]);
    if (left.result_type === null || right.result_type === null) {
        //TODO: object result_type too...
        throw new Error("Not implemented");
    }
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator.==", null, [
        left,
        right
    ]);
    astnode.result_type = "bool";
    return astnode;
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
    if (op === "Eq") return false;
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
/* harmony import */ var _core_modules_operator_astconvert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core_modules/operator.==/astconvert */ "./src/core_modules/operator.==/astconvert.ts");
/* harmony import */ var _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_modules/operators/ast2js */ "./src/core_modules/operators/ast2js.ts");
/* harmony import */ var _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core_modules/integer/ast2js */ "./src/core_modules/integer/ast2js.ts");
/* harmony import */ var _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core_modules/fctcall/ast2js */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core_modules/symbol/ast2js */ "./src/core_modules/symbol/ast2js.ts");
/* harmony import */ var _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core_modules/ifblock/ast2js */ "./src/core_modules/ifblock/ast2js.ts");
/* harmony import */ var _core_modules_bool_ast2js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core_modules/bool/ast2js */ "./src/core_modules/bool/ast2js.ts");
/* harmony import */ var _core_modules_operator_ast2js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core_modules/operator.==/ast2js */ "./src/core_modules/operator.==/ast2js.ts");
// Brython must be imported before.
//TODO: use genlist







const AST_CONVERT = [
    _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_0__["default"],
    _core_modules_integer_astconvert__WEBPACK_IMPORTED_MODULE_1__["default"],
    _core_modules_fctcall_astconvert__WEBPACK_IMPORTED_MODULE_2__["default"],
    _core_modules_symbol_astconvert__WEBPACK_IMPORTED_MODULE_3__["default"],
    _core_modules_ifblock_astconvert__WEBPACK_IMPORTED_MODULE_4__["default"],
    _core_modules_bool_astconvert__WEBPACK_IMPORTED_MODULE_5__["default"],
    _core_modules_operator_astconvert__WEBPACK_IMPORTED_MODULE_6__["default"]
];
//TODO: use genlist







const AST2JS = [
    _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_7__["default"],
    _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_8__["default"],
    _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_9__["default"],
    _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_10__["default"],
    _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_11__["default"],
    _core_modules_bool_ast2js__WEBPACK_IMPORTED_MODULE_12__["default"],
    _core_modules_operator_ast2js__WEBPACK_IMPORTED_MODULE_13__["default"]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9yLj09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cblx0cmV0dXJuIGpzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfZW5kKG5vZGU6IEFTVE5vZGUsIGpzOiBzdHJpbmcpIHtcblxuICAgIGlmKCBub2RlLmpzY29kZSEuZW5kICE9PSBudWxsKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBzdGFydCA9IG5vZGUuanNjb2RlIS5zdGFydDtcblxuICAgIGxldCBsaW5lX2NvdW50ICAgID0gMDtcbiAgICBsZXQgbGFzdF9saW5lX2lkeCA9IDA7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwganMubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKGpzW2ldID09PSAnXFxuJykge1xuICAgICAgICAgICAgKytsaW5lX2NvdW50O1xuICAgICAgICAgICAgbGFzdF9saW5lX2lkeCA9IGk7XG4gICAgICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxpbmVfY291bnQsIGpzLmxlbmd0aCk7XG5cbiAgICBpZihsaW5lX2NvdW50ID09PSAwKSB7XG4gICAgICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICAgICAgY29sIDogc3RhcnQuY29sICsganMubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUgKyBsaW5lX2NvdW50LFxuICAgICAgICBjb2wgOiBqcy5sZW5ndGggLSBsYXN0X2xpbmVfaWR4XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoKTtcblxuICAgIHVwZGF0ZV9lbmQobm9kZSwganMpO1xuXG4gICAgY3Vyc29yLmxpbmUgPSBub2RlLmpzY29kZSEuZW5kLmxpbmU7XG4gICAgY3Vyc29yLmNvbCAgPSBub2RlLmpzY29kZSEuZW5kLmNvbDtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFsLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICBsZXQganMgPSBgJHsgYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpfShgO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSlcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICBcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYCR7IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKX1gO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJmdW5jXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZmN0Y2FsbFwiLCB1bmRlZmluZWQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYyApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlKSApXG4gICAgXSk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImlmYmxvY2tcIilcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIC8vaWZcbiAgICBsZXQganMgPSBcImlmKFwiO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIil7XCI7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gMjtcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgICAgICB9XG4gICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IpO1xuICAgIGpzICs9IFwifVwiO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbDogMixcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG4vL1RPRE86IGJldHRlciBzeXN0ZW0uLi5cbmxldCBpc19pZiA9IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwidGVzdFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYoIGlzX2lmICkge1xuICAgICAgICBpc19pZiA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0KTtcblxuICAgICAgICBpZiggbm9kZS5vcmVsc2UubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZWxzZS9lbGlmIG5vdCB5ZXQgc3VwcG9ydGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpZlwiLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgLi4ubm9kZS5ib2R5Lm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2xpbmUobSkgKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBpc19pZiA9IHRydWU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpZmJsb2NrXCIsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlKVxuICAgICAgICBdKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfW5gO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpbnRlZ2VyXCIsIG5vZGUudmFsdWUpO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIC8vVE9ETyBOb25lIHR5cGUuLi5cblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj09PVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMztcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCAhIChcIm9wc1wiIGluIG5vZGUpICYmIG5vZGUub3BzWzBdLmNvbnN0cnVjdG9yLiRuYW1lICE9PSBcIkVxXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLmNvbXBhcmF0b3JzWzBdKTtcblxuICAgIGlmKGxlZnQucmVzdWx0X3R5cGUgPT09IG51bGwgfHwgcmlnaHQucmVzdWx0X3R5cGUgPT09IG51bGwpIHtcbiAgICAgICAgLy9UT0RPOiBvYmplY3QgcmVzdWx0X3R5cGUgdG9vLi4uXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJPcGVyYXRvci49PVwiLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xuICAgIFxuICAgIGFzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcbiAgICBjb25zdCBzdGFydF9jb2wgPSBjdXJzb3IuY29sO1xuXG4gICAgLy9UT0RPOiBjaGVjayBjaGlsZHJlbiB0eXBlLi4uXG4gICAgLy9UT0RPOiBwcmlvcml0eSBjaGVja3NcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIFxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIrXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiXCI7XG5cbiAgICAvKlxuICAgIGxldCBqcyA9IFwib3AoXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiLCAnKycsIFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgLypsZXQganMgPSBgJHt0aGlzLnZhbHVlfShgO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG4gICAganMgKz0gXCIpXCI7Ki9cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwib3BcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBvcCA9IG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWU7XG4gICAgaWYoIG9wID09PSBcIkFkZFwiKVxuICAgICAgICBvcCA9IFwiK1wiO1xuXG4gICAgaWYoIG9wID09PSBcIkVxXCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yXCIsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7IC8vVE9ET1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJpZFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIG5vZGUuaWQpO1xufSIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG4vL1RPRE86IHVzZSBnZW5saXN0XG5pbXBvcnQgQzEgZnJvbSBcIi4vY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0Y29udmVydFwiO1xuaW1wb3J0IEMzIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDNCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDNSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaWZibG9jay9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzYgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2Jvb2wvYXN0Y29udmVydFwiO1xuaW1wb3J0IEM3IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvci49PS9hc3Rjb252ZXJ0XCI7XG5cbmNvbnN0IEFTVF9DT05WRVJUID0gW1xuICAgIEMxLFxuICAgIEMyLFxuICAgIEMzLFxuICAgIEM0LFxuICAgIEM1LFxuICAgIEM2LFxuICAgIEM3XG5dXG4vL1RPRE86IHVzZSBnZW5saXN0XG5pbXBvcnQgQTEgZnJvbSBcIi4vY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3QyanNcIjtcbmltcG9ydCBBMiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaW50ZWdlci9hc3QyanNcIjtcbmltcG9ydCBBMyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3QyanNcIjtcbmltcG9ydCBBNCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuaW1wb3J0IEE1IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9pZmJsb2NrL2FzdDJqc1wiO1xuaW1wb3J0IEE2IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9ib29sL2FzdDJqc1wiO1xuaW1wb3J0IEE3IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvci49PS9hc3QyanNcIjtcblxuY29uc3QgQVNUMkpTID0gW1xuICAgIEExLFxuICAgIEEyLFxuICAgIEEzLFxuICAgIEE0LFxuICAgIEE1LFxuICAgIEE2LFxuICAgIEE3XG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIk5cIiwgYnJ5dGhvbl9ub2RlKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBBU1RfQ09OVkVSVC5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gQVNUX0NPTlZFUlRbaV0oYnJ5dGhvbl9ub2RlKTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBBU1QySlNbaV07XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSlcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cdHJldHVybiBhc3QuYm9keS5tYXAoIGNvbnZlcnRfbGluZSApO1xufSIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCBfdmFsdWU/OiBhbnksIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cbi8qXG5cdFx0Y29uc3QgdmFsdWUgPSBsaW5lLnZhbHVlO1xuXG5cdFx0aWYoIHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwicGFzc1wiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiXCI7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIFwiY29tcGFyYXRvcnNcIiBpbiB2YWx1ZSkge1xuXG5cdFx0XHR0aGlzLnR5cGUgPSBcIk9wZXJhdG9yXCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gXCJFcXVhbHNcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdG5ldyBBU1ROb2RlKHt2YWx1ZTogdmFsdWUubGVmdH0pLFxuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmNvbXBhcmF0b3JzWzBdfSlcblx0XHRcdF07XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiggdmFsdWUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgJiYgXCJ2YWx1ZVwiIGluIHZhbHVlLnZhbHVlKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcImZsb2F0XCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWUudmFsdWUudmFsdWU7XG5cdFx0fSovXG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7Il0sIm5hbWVzIjpbImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsInVwZGF0ZV9lbmQiLCJqc2NvZGUiLCJlbmQiLCJzdGFydCIsImxpbmVfY291bnQiLCJsYXN0X2xpbmVfaWR4IiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsInRvSlMiLCJ2YWx1ZSIsIkFTVE5vZGUiLCJjb252ZXJ0IiwiYXN0bm9kZSIsInJlc3VsdF90eXBlIiwic3RhcnRfY29sIiwiY2hpbGRyZW4iLCJjb252ZXJ0X25vZGUiLCJ1bmRlZmluZWQiLCJmdW5jIiwiYXJncyIsIm1hcCIsImUiLCJ0eXBlIiwiY29udmVydF9saW5lIiwiaXNfaWYiLCJjb25kIiwidGVzdCIsIm9yZWxzZSIsIkVycm9yIiwiYm9keSIsIm0iLCJvcHMiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwibGVmdCIsInJpZ2h0IiwiY29tcGFyYXRvcnMiLCJvcCIsImlkIiwiQzEiLCJDMiIsIkMzIiwiQzQiLCJDNSIsIkM2IiwiQzciLCJBU1RfQ09OVkVSVCIsIkExIiwiQTIiLCJBMyIsIkE0IiwiQTUiLCJBNiIsIkE3IiwiQVNUMkpTIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiYnJ5dGhvbl9ub2RlIiwicmVzdWx0IiwiZXJyb3IiLCJweWNvZGUiLCJfdmFsdWUiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==