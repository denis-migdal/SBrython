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
    let js = `${(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor)}(`;
    cursor.col += 1;
    for(let i = 1; i < this.children.length; ++i){
        if (i !== 1) {
            js += ",";
            cursor.col += 1;
        }
        js += `${(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[i], cursor)}`;
    }
    js += ")";
    this.jscode.end = {
        line: cursor.line,
        col: cursor.col + 1
    };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9yLj09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cblx0cmV0dXJuIGpzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfZW5kKG5vZGU6IEFTVE5vZGUsIGpzOiBzdHJpbmcpIHtcblxuICAgIGlmKCBub2RlLmpzY29kZSEuZW5kICE9PSBudWxsKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBzdGFydCA9IG5vZGUuanNjb2RlIS5zdGFydDtcblxuICAgIGxldCBsaW5lX2NvdW50ICAgID0gMDtcbiAgICBsZXQgbGFzdF9saW5lX2lkeCA9IDA7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwganMubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKGpzW2ldID09PSAnXFxuJykge1xuICAgICAgICAgICAgKytsaW5lX2NvdW50O1xuICAgICAgICAgICAgbGFzdF9saW5lX2lkeCA9IGk7XG4gICAgICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxpbmVfY291bnQsIGpzLmxlbmd0aCk7XG5cbiAgICBpZihsaW5lX2NvdW50ID09PSAwKSB7XG4gICAgICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICAgICAgY29sIDogc3RhcnQuY29sICsganMubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUgKyBsaW5lX2NvdW50LFxuICAgICAgICBjb2wgOiBqcy5sZW5ndGggLSBsYXN0X2xpbmVfaWR4XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoKTtcblxuICAgIHVwZGF0ZV9lbmQobm9kZSwganMpO1xuXG4gICAgY3Vyc29yLmxpbmUgPSBub2RlLmpzY29kZSEuZW5kLmxpbmU7XG4gICAgY3Vyc29yLmNvbCAgPSBub2RlLmpzY29kZSEuZW5kLmNvbDtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFsLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgbGV0IGpzID0gYCR7IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKX0oYDtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKSB7XG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAganMgKz0gYCR7IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKX1gO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5jb2wgKyAxLFxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwiZnVuY1wiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gVE9ETzogbm9kZS5hcmdzIC8vIGZjdCBjYWxsIGFyZ3VtZW50LlxuICAgIC8vIFRPRE86IHRoaXMgP1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZjdGNhbGxcIiwgdW5kZWZpbmVkLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSkgKVxuICAgIF0pO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJpZmJsb2NrXCIpXG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICAvL2lmXG4gICAgbGV0IGpzID0gXCJpZihcIjtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCIpe1wiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDI7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgfVxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSBcIn1cIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2w6IDIsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiBiZXR0ZXIgc3lzdGVtLi4uXG5sZXQgaXNfaWYgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCAhIChcInRlc3RcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCBpc19pZiApIHtcbiAgICAgICAgaXNfaWYgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCk7XG5cbiAgICAgICAgaWYoIG5vZGUub3JlbHNlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVsc2UvZWxpZiBub3QgeWV0IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiaWZcIiwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIC4uLm5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0pIClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgaXNfaWYgPSB0cnVlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiaWZibG9ja1wiLCBudWxsLCBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZSlcbiAgICAgICAgXSk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1uYDtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcIm51bWJlclwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiaW50ZWdlclwiLCBub2RlLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICAvL1RPRE8gTm9uZSB0eXBlLi4uXG5cbiAgICBsZXQganMgPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCI9PT1cIjtcbiAgICBjdXJzb3IuY29sICs9IDM7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJvcHNcIiBpbiBub2RlKSAmJiBub2RlLm9wc1swXS5jb25zdHJ1Y3Rvci4kbmFtZSAhPT0gXCJFcVwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5jb21wYXJhdG9yc1swXSk7XG5cbiAgICBpZihsZWZ0LnJlc3VsdF90eXBlID09PSBudWxsIHx8IHJpZ2h0LnJlc3VsdF90eXBlID09PSBudWxsKSB7XG4gICAgICAgIC8vVE9ETzogb2JqZWN0IHJlc3VsdF90eXBlIHRvby4uLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiT3BlcmF0b3IuPT1cIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbiAgICBcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG4gICAgY29uc3Qgc3RhcnRfY29sID0gY3Vyc29yLmNvbDtcblxuICAgIC8vVE9ETzogY2hlY2sgY2hpbGRyZW4gdHlwZS4uLlxuICAgIC8vVE9ETzogcHJpb3JpdHkgY2hlY2tzXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBcbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiK1wiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIlwiO1xuXG4gICAgLypcbiAgICBsZXQganMgPSBcIm9wKFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIiwgJysnLCBcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIpXCI7Ki9cblxuICAgIC8qbGV0IGpzID0gYCR7dGhpcy52YWx1ZX0oYDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCAhIChcIm9wXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgb3AgPSBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lO1xuICAgIGlmKCBvcCA9PT0gXCJBZGRcIilcbiAgICAgICAgb3AgPSBcIitcIjtcblxuICAgIGlmKCBvcCA9PT0gXCJFcVwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJPcGVyYXRvclwiLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUubGVmdCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlOyAvL1RPRE9cbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwiaWRcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCBub2RlLmlkKTtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiB1c2UgZ2VubGlzdFxuaW1wb3J0IEMxIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0Y29udmVydFwiO1xuaW1wb3J0IEMyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDMyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzUgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0Y29udmVydFwiO1xuaW1wb3J0IEM2IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9ib29sL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDNyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0Y29udmVydFwiO1xuXG5jb25zdCBBU1RfQ09OVkVSVCA9IFtcbiAgICBDMSxcbiAgICBDMixcbiAgICBDMyxcbiAgICBDNCxcbiAgICBDNSxcbiAgICBDNixcbiAgICBDN1xuXVxuLy9UT0RPOiB1c2UgZ2VubGlzdFxuaW1wb3J0IEExIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0MmpzXCI7XG5pbXBvcnQgQTIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzXCI7XG5pbXBvcnQgQTMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzXCI7XG5pbXBvcnQgQTQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcbmltcG9ydCBBNSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaWZibG9jay9hc3QyanNcIjtcbmltcG9ydCBBNiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvYm9vbC9hc3QyanNcIjtcbmltcG9ydCBBNyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0MmpzXCI7XG5cbmNvbnN0IEFTVDJKUyA9IFtcbiAgICBBMSxcbiAgICBBMixcbiAgICBBMyxcbiAgICBBNCxcbiAgICBBNSxcbiAgICBBNixcbiAgICBBN1xuXVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZykge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBcImZpbGVuYW1lXCIsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblxuXHRyZXR1cm4gY29udmVydF9hc3QoX2FzdCk7ICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X25vZGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBBU1ROb2RlIHtcblxuICAgIC8vY29uc29sZS5sb2coXCJOXCIsIGJyeXRob25fbm9kZSk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgQVNUX0NPTlZFUlQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEFTVF9DT05WRVJUW2ldKGJyeXRob25fbm9kZSk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gQVNUMkpTW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgbm9kZVwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnkpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUpXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXHRyZXR1cm4gYXN0LmJvZHkubWFwKCBjb252ZXJ0X2xpbmUgKTtcbn0iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgX3ZhbHVlPzogYW55LCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG4vKlxuXHRcdGNvbnN0IHZhbHVlID0gbGluZS52YWx1ZTtcblxuXHRcdGlmKCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcInBhc3NcIjtcblx0XHRcdHRoaXMudmFsdWUgPSBcIlwiO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKCBcImNvbXBhcmF0b3JzXCIgaW4gdmFsdWUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJPcGVyYXRvclwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiRXF1YWxzXCI7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW1xuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmxlZnR9KSxcblx0XHRcdFx0bmV3IEFTVE5vZGUoe3ZhbHVlOiB2YWx1ZS5jb21wYXJhdG9yc1swXX0pXG5cdFx0XHRdO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIHZhbHVlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIFwidmFsdWVcIiBpbiB2YWx1ZS52YWx1ZSkge1xuXHRcdFx0dGhpcy50eXBlID0gXCJmbG9hdFwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlLnZhbHVlO1xuXHRcdH0qL1xuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiOyJdLCJuYW1lcyI6WyJhc3QyanMiLCJhc3QiLCJqcyIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwiYXN0bm9kZTJqcyIsIm5ld2xpbmUiLCJ1cGRhdGVfZW5kIiwianNjb2RlIiwiZW5kIiwic3RhcnQiLCJsaW5lX2NvdW50IiwibGFzdF9saW5lX2lkeCIsImkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiaW5kZW50X2xldmVsIiwiaW5kZW50IiwicGFkU3RhcnQiLCJ0b0pTIiwidmFsdWUiLCJBU1ROb2RlIiwiY29udmVydCIsImFzdG5vZGUiLCJyZXN1bHRfdHlwZSIsImNoaWxkcmVuIiwiY29udmVydF9ub2RlIiwidW5kZWZpbmVkIiwiZnVuYyIsImFyZ3MiLCJtYXAiLCJlIiwidHlwZSIsImNvbnZlcnRfbGluZSIsImlzX2lmIiwiY29uZCIsInRlc3QiLCJvcmVsc2UiLCJFcnJvciIsImJvZHkiLCJtIiwib3BzIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImxlZnQiLCJyaWdodCIsImNvbXBhcmF0b3JzIiwic3RhcnRfY29sIiwib3AiLCJpZCIsIkMxIiwiQzIiLCJDMyIsIkM0IiwiQzUiLCJDNiIsIkM3IiwiQVNUX0NPTlZFUlQiLCJBMSIsIkEyIiwiQTMiLCJBNCIsIkE1IiwiQTYiLCJBNyIsIkFTVDJKUyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImJyeXRob25fbm9kZSIsInJlc3VsdCIsImVycm9yIiwicHljb2RlIiwiX3ZhbHVlIiwibGluZW5vIiwiY29sX29mZnNldCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCJdLCJzb3VyY2VSb290IjoiIn0=