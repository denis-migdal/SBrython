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
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += '(';
    cursor.col += 1;
    for(let i = 1; i < this.children.length; ++i){
        if (i !== 1) {
            js += ",";
            cursor.col += 1;
        }
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[i], cursor);
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

/***/ "./src/core_modules/int/ast2js.ts":
/*!****************************************!*\
  !*** ./src/core_modules/int/ast2js.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}n`;
}


/***/ }),

/***/ "./src/core_modules/int/astconvert.ts":
/*!********************************************!*\
  !*** ./src/core_modules/int/astconvert.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node) {
    if (typeof node.value !== "number") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literal.int", node.value);
    astnode.result_type = "int";
    return astnode;
}


/***/ }),

/***/ "./src/core_modules/operator.=/ast2js.ts":
/*!***********************************************!*\
  !*** ./src/core_modules/operator.=/ast2js.ts ***!
  \***********************************************/
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
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += "=";
    cursor.col += 1;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[1], cursor);
    this.jscode.end = {
        ...cursor
    };
    return js;
}


/***/ }),

/***/ "./src/core_modules/operator.=/astconvert.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/operator.=/astconvert.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node) {
    if (!("targets" in node)) return false;
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.targets[0]);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value);
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator.=", null, [
        left,
        right
    ]);
    astnode.result_type = right.result_type;
    return astnode;
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
    //TODO str
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += "==";
    cursor.col += 2;
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
    if (!("ops" in node) || node.ops[0].constructor.$name !== "Eq") return false;
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
/* harmony import */ var _core_modules_int_astconvert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/int/astconvert */ "./src/core_modules/int/astconvert.ts");
/* harmony import */ var _core_modules_fctcall_astconvert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core_modules/fctcall/astconvert */ "./src/core_modules/fctcall/astconvert.ts");
/* harmony import */ var _core_modules_symbol_astconvert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/symbol/astconvert */ "./src/core_modules/symbol/astconvert.ts");
/* harmony import */ var _core_modules_ifblock_astconvert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_modules/ifblock/astconvert */ "./src/core_modules/ifblock/astconvert.ts");
/* harmony import */ var _core_modules_bool_astconvert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core_modules/bool/astconvert */ "./src/core_modules/bool/astconvert.ts");
/* harmony import */ var _core_modules_operator_astconvert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core_modules/operator.==/astconvert */ "./src/core_modules/operator.==/astconvert.ts");
/* harmony import */ var _core_modules_operator_astconvert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_modules/operator.=/astconvert */ "./src/core_modules/operator.=/astconvert.ts");
/* harmony import */ var _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core_modules/operators/ast2js */ "./src/core_modules/operators/ast2js.ts");
/* harmony import */ var _core_modules_int_ast2js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core_modules/int/ast2js */ "./src/core_modules/int/ast2js.ts");
/* harmony import */ var _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core_modules/fctcall/ast2js */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core_modules/symbol/ast2js */ "./src/core_modules/symbol/ast2js.ts");
/* harmony import */ var _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core_modules/ifblock/ast2js */ "./src/core_modules/ifblock/ast2js.ts");
/* harmony import */ var _core_modules_bool_ast2js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core_modules/bool/ast2js */ "./src/core_modules/bool/ast2js.ts");
/* harmony import */ var _core_modules_operator_ast2js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./core_modules/operator.==/ast2js */ "./src/core_modules/operator.==/ast2js.ts");
/* harmony import */ var _core_modules_operator_ast2js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./core_modules/operator.=/ast2js */ "./src/core_modules/operator.=/ast2js.ts");
// Brython must be imported before.
//TODO: use genlist








const AST_CONVERT = [
    _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_0__["default"],
    _core_modules_int_astconvert__WEBPACK_IMPORTED_MODULE_1__["default"],
    _core_modules_fctcall_astconvert__WEBPACK_IMPORTED_MODULE_2__["default"],
    _core_modules_symbol_astconvert__WEBPACK_IMPORTED_MODULE_3__["default"],
    _core_modules_ifblock_astconvert__WEBPACK_IMPORTED_MODULE_4__["default"],
    _core_modules_bool_astconvert__WEBPACK_IMPORTED_MODULE_5__["default"],
    _core_modules_operator_astconvert__WEBPACK_IMPORTED_MODULE_6__["default"],
    _core_modules_operator_astconvert__WEBPACK_IMPORTED_MODULE_7__["default"]
];
//TODO: use genlist








const AST2JS = [
    _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_8__["default"],
    _core_modules_int_ast2js__WEBPACK_IMPORTED_MODULE_9__["default"],
    _core_modules_fctcall_ast2js__WEBPACK_IMPORTED_MODULE_10__["default"],
    _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_11__["default"],
    _core_modules_ifblock_ast2js__WEBPACK_IMPORTED_MODULE_12__["default"],
    _core_modules_bool_ast2js__WEBPACK_IMPORTED_MODULE_13__["default"],
    _core_modules_operator_ast2js__WEBPACK_IMPORTED_MODULE_14__["default"],
    _core_modules_operator_ast2js__WEBPACK_IMPORTED_MODULE_15__["default"]
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
    //TODO: line ASTNode ???
    let node = line;
    if ("value" in line && !("targets" in line)) node = line.value;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZN0UsR0FBUTtJQUNuQyxPQUFPQSxJQUFJdUMsSUFBSSxDQUFDVCxHQUFHLENBQUVHO0FBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7QUMxRU8sTUFBTVo7SUFFWlcsS0FBaUI7SUFDakJaLE1BQWM7SUFDZEssV0FBc0IsRUFBRSxDQUFDO0lBQ3pCRCxjQUEyQixLQUFLO0lBRTdCMEQsT0FBa0I7SUFDbEJ6RSxPQUFtQjtJQUV0QlUsS0FBaUM7SUFFakMwQixZQUFZaUMsWUFBaUIsRUFBRTlDLElBQVksRUFBRW1ELE1BQVksRUFBRTFELFdBQXNCLEVBQUUsQ0FBRTtRQUVwRixJQUFJLENBQUNPLElBQUksR0FBS0E7UUFDZCxJQUFJLENBQUNaLEtBQUssR0FBSStEO1FBQ2QsSUFBSSxDQUFDMUQsUUFBUSxHQUFHQTtRQUNoQixJQUFJLENBQUN5RCxNQUFNLEdBQUc7WUFDYnZFLE9BQU87Z0JBQ05SLE1BQU0yRSxhQUFhTSxNQUFNO2dCQUN6QmhGLEtBQUswRSxhQUFhTyxVQUFVO1lBQzdCO1lBQ0EzRSxLQUFLO2dCQUNKUCxNQUFNMkUsYUFBYVEsVUFBVTtnQkFDN0JsRixLQUFLMEUsYUFBYVMsY0FBYztZQUNqQztRQUNEO0lBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRyxHQUNGO0FBQ0Q7Ozs7Ozs7U0MvREE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYiIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9yLj0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvci49L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9yLj09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cblx0cmV0dXJuIGpzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfZW5kKG5vZGU6IEFTVE5vZGUsIGpzOiBzdHJpbmcpIHtcblxuICAgIGlmKCBub2RlLmpzY29kZSEuZW5kICE9PSBudWxsKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBzdGFydCA9IG5vZGUuanNjb2RlIS5zdGFydDtcblxuICAgIGxldCBsaW5lX2NvdW50ICAgID0gMDtcbiAgICBsZXQgbGFzdF9saW5lX2lkeCA9IDA7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwganMubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKGpzW2ldID09PSAnXFxuJykge1xuICAgICAgICAgICAgKytsaW5lX2NvdW50O1xuICAgICAgICAgICAgbGFzdF9saW5lX2lkeCA9IGk7XG4gICAgICAgIH1cblxuICAgIGlmKGxpbmVfY291bnQgPT09IDApIHtcbiAgICAgICAgbm9kZS5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBzdGFydC5jb2wgKyBqcy5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbm9kZS5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgbGluZTogc3RhcnQubGluZSArIGxpbmVfY291bnQsXG4gICAgICAgIGNvbCA6IGpzLmxlbmd0aCAtIGxhc3RfbGluZV9pZHhcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdsaW5lKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaW5kZW50X2xldmVsOiBudW1iZXIgPSAwKSB7XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICArK2N1cnNvci5saW5lO1xuICAgIGN1cnNvci5jb2wgPSBpbmRlbnQ7XG4gICAgcmV0dXJuIFwiXFxuXCIgKyBcIlwiLnBhZFN0YXJ0KGluZGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3Rub2RlMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgZW5kICA6IG51bGwgYXMgYW55XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS50b0pTISgpO1xuXG4gICAgdXBkYXRlX2VuZChub2RlLCBqcyk7XG5cbiAgICBjdXJzb3IubGluZSA9IG5vZGUuanNjb2RlIS5lbmQubGluZTtcbiAgICBjdXJzb3IuY29sICA9IG5vZGUuanNjb2RlIS5lbmQuY29sO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWwuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gJygnO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLmNvbCArIDEsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJmdW5jXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZmN0Y2FsbFwiLCB1bmRlZmluZWQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYyApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlKSApXG4gICAgXSk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImlmYmxvY2tcIilcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIC8vaWZcbiAgICBsZXQganMgPSBcImlmKFwiO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIil7XCI7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gMjtcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgICAgICB9XG4gICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IpO1xuICAgIGpzICs9IFwifVwiO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbDogMixcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG4vL1RPRE86IGJldHRlciBzeXN0ZW0uLi5cbmxldCBpc19pZiA9IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwidGVzdFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYoIGlzX2lmICkge1xuICAgICAgICBpc19pZiA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0KTtcblxuICAgICAgICBpZiggbm9kZS5vcmVsc2UubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZWxzZS9lbGlmIG5vdCB5ZXQgc3VwcG9ydGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpZlwiLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgLi4ubm9kZS5ib2R5Lm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2xpbmUobSkgKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBpc19pZiA9IHRydWU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpZmJsb2NrXCIsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlKVxuICAgICAgICBdKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfW5gO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFsLmludFwiLCBub2RlLnZhbHVlKTtcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gXCJpbnRcIlxuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj1cIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJ0YXJnZXRzXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLnRhcmdldHNbMF0gKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlKTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yLj1cIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbiAgICBcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj09XCI7XG4gICAgY3Vyc29yLmNvbCArPSAyO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwib3BzXCIgaW4gbm9kZSkgfHwgbm9kZS5vcHNbMF0uY29uc3RydWN0b3IuJG5hbWUgIT09IFwiRXFcIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUuY29tcGFyYXRvcnNbMF0pO1xuXG4gICAgaWYobGVmdC5yZXN1bHRfdHlwZSA9PT0gbnVsbCB8fCByaWdodC5yZXN1bHRfdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAvL1RPRE86IG9iamVjdCByZXN1bHRfdHlwZSB0b28uLi5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yLj09XCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG4gICAgXG4gICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICAvL1RPRE86IGNoZWNrIGNoaWxkcmVuIHR5cGUuLi5cbiAgICAvL1RPRE86IHByaW9yaXR5IGNoZWNrc1xuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIitcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCJcIjtcblxuICAgIC8qXG4gICAgbGV0IGpzID0gXCJvcChcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIsICcrJywgXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICAvKmxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICBpZiggb3AgPT09IFwiRXFcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiT3BlcmF0b3JcIiwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0KSxcbiAgICAgICAgXVxuICAgICk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTsgLy9UT0RPXG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCAhIChcImlkXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzeW1ib2xcIiwgbm9kZS5pZCk7XG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbi8vVE9ETzogdXNlIGdlbmxpc3RcbmltcG9ydCBDMSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDMiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaW50L2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDMyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgQzUgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0Y29udmVydFwiO1xuaW1wb3J0IEM2IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9ib29sL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDNyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0Y29udmVydFwiO1xuaW1wb3J0IEM4IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvci49L2FzdGNvbnZlcnRcIjtcblxuY29uc3QgQVNUX0NPTlZFUlQgPSBbXG4gICAgQzEsXG4gICAgQzIsXG4gICAgQzMsXG4gICAgQzQsXG4gICAgQzUsXG4gICAgQzYsXG4gICAgQzcsXG4gICAgQzhcbl1cbi8vVE9ETzogdXNlIGdlbmxpc3RcbmltcG9ydCBBMSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdDJqc1wiO1xuaW1wb3J0IEEyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9pbnQvYXN0MmpzXCI7XG5pbXBvcnQgQTMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzXCI7XG5pbXBvcnQgQTQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcbmltcG9ydCBBNSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaWZibG9jay9hc3QyanNcIjtcbmltcG9ydCBBNiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvYm9vbC9hc3QyanNcIjtcbmltcG9ydCBBNyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0MmpzXCI7XG5pbXBvcnQgQTggZnJvbSBcIi4vY29yZV9tb2R1bGVzL29wZXJhdG9yLj0vYXN0MmpzXCI7XG5cbmNvbnN0IEFTVDJKUyA9IFtcbiAgICBBMSxcbiAgICBBMixcbiAgICBBMyxcbiAgICBBNCxcbiAgICBBNSxcbiAgICBBNixcbiAgICBBNyxcbiAgICBBOFxuXVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZykge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBcImZpbGVuYW1lXCIsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblxuXHRyZXR1cm4gY29udmVydF9hc3QoX2FzdCk7ICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X25vZGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBBU1ROb2RlIHtcblxuICAgIC8vY29uc29sZS5sb2coXCJOXCIsIGJyeXRob25fbm9kZSk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgQVNUX0NPTlZFUlQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEFTVF9DT05WRVJUW2ldKGJyeXRob25fbm9kZSk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gQVNUMkpTW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgbm9kZVwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnkpOiBBU1ROb2RlIHtcblxuICAgIC8vVE9ETzogbGluZSBBU1ROb2RlID8/P1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXHRyZXR1cm4gYXN0LmJvZHkubWFwKCBjb252ZXJ0X2xpbmUgKTtcbn0iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgX3ZhbHVlPzogYW55LCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG4vKlxuXHRcdGNvbnN0IHZhbHVlID0gbGluZS52YWx1ZTtcblxuXHRcdGlmKCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcInBhc3NcIjtcblx0XHRcdHRoaXMudmFsdWUgPSBcIlwiO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKCBcImNvbXBhcmF0b3JzXCIgaW4gdmFsdWUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJPcGVyYXRvclwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiRXF1YWxzXCI7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW1xuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmxlZnR9KSxcblx0XHRcdFx0bmV3IEFTVE5vZGUoe3ZhbHVlOiB2YWx1ZS5jb21wYXJhdG9yc1swXX0pXG5cdFx0XHRdO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIHZhbHVlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIFwidmFsdWVcIiBpbiB2YWx1ZS52YWx1ZSkge1xuXHRcdFx0dGhpcy50eXBlID0gXCJmbG9hdFwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlLnZhbHVlO1xuXHRcdH0qL1xuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiOyJdLCJuYW1lcyI6WyJhc3QyanMiLCJhc3QiLCJqcyIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwiYXN0bm9kZTJqcyIsIm5ld2xpbmUiLCJ1cGRhdGVfZW5kIiwianNjb2RlIiwiZW5kIiwic3RhcnQiLCJsaW5lX2NvdW50IiwibGFzdF9saW5lX2lkeCIsImkiLCJsZW5ndGgiLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsInRvSlMiLCJ2YWx1ZSIsIkFTVE5vZGUiLCJjb252ZXJ0IiwiYXN0bm9kZSIsInJlc3VsdF90eXBlIiwiY2hpbGRyZW4iLCJjb252ZXJ0X25vZGUiLCJ1bmRlZmluZWQiLCJmdW5jIiwiYXJncyIsIm1hcCIsImUiLCJ0eXBlIiwiY29udmVydF9saW5lIiwiaXNfaWYiLCJjb25kIiwidGVzdCIsIm9yZWxzZSIsIkVycm9yIiwiYm9keSIsIm0iLCJsZWZ0IiwidGFyZ2V0cyIsInJpZ2h0Iiwib3BzIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImNvbXBhcmF0b3JzIiwic3RhcnRfY29sIiwib3AiLCJpZCIsIkMxIiwiQzIiLCJDMyIsIkM0IiwiQzUiLCJDNiIsIkM3IiwiQzgiLCJBU1RfQ09OVkVSVCIsIkExIiwiQTIiLCJBMyIsIkE0IiwiQTUiLCJBNiIsIkE3IiwiQTgiLCJBU1QySlMiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJyZXN1bHQiLCJjb25zb2xlIiwiZXJyb3IiLCJweWNvZGUiLCJfdmFsdWUiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==