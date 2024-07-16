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

/***/ "./src/core_modules/None/ast2js.ts":
/*!*****************************************!*\
  !*** ./src/core_modules/None/ast2js.ts ***!
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

/***/ "./src/core_modules/None/astconvert.ts":
/*!*********************************************!*\
  !*** ./src/core_modules/None/astconvert.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (!(typeof node.value === "object") || !("__class__" in node.value) || node.value.__class__.__qualname__ !== "NoneType") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literal.None", null);
    astnode.result_type = "None";
    return astnode;
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

function convert(node, _context) {
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


function convert(node, context) {
    if (!("func" in node)) return false;
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "fctcall", undefined, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.func, context),
        ...node.args.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e, context))
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
function convert(node, context) {
    if (!("test" in node)) return false;
    if (is_if) {
        is_if = false;
        const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context);
        if (node.orelse.length !== 0) throw new Error("else/elif not yet supported");
        if (cond.result_type !== "bool") throw new Error(`Type ${cond.result_type} not yet supported as if condition`);
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "if", null, [
            cond,
            ...node.body.map((m)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_line)(m, context))
        ]);
    }
    is_if = true;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "ifblock", null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node, context)
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

function convert(node, _context) {
    if (typeof node.value !== "number") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literal.int", node.value);
    astnode.result_type = "int";
    return astnode;
}


/***/ }),

/***/ "./src/core_modules/lists.ts":
/*!***********************************!*\
  !*** ./src/core_modules/lists.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./symbol/astconvert.ts */ "./src/core_modules/symbol/astconvert.ts");
/* harmony import */ var _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol/ast2js.ts */ "./src/core_modules/symbol/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operators/astconvert.ts */ "./src/core_modules/operators/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operators/ast2js.ts */ "./src/core_modules/operators/ast2js.ts");
/* harmony import */ var _operator_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./operator.==/astconvert.ts */ "./src/core_modules/operator.==/astconvert.ts");
/* harmony import */ var _operator_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./operator.==/ast2js.ts */ "./src/core_modules/operator.==/ast2js.ts");
/* harmony import */ var _operator_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./operator.=/astconvert.ts */ "./src/core_modules/operator.=/astconvert.ts");
/* harmony import */ var _operator_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./operator.=/ast2js.ts */ "./src/core_modules/operator.=/ast2js.ts");
/* harmony import */ var _int_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./int/astconvert.ts */ "./src/core_modules/int/astconvert.ts");
/* harmony import */ var _int_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./int/ast2js.ts */ "./src/core_modules/int/ast2js.ts");
/* harmony import */ var _ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ifblock/astconvert.ts */ "./src/core_modules/ifblock/astconvert.ts");
/* harmony import */ var _ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ifblock/ast2js.ts */ "./src/core_modules/ifblock/ast2js.ts");
/* harmony import */ var _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fctcall/astconvert.ts */ "./src/core_modules/fctcall/astconvert.ts");
/* harmony import */ var _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fctcall/ast2js.ts */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bool/astconvert.ts */ "./src/core_modules/bool/astconvert.ts");
/* harmony import */ var _bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./bool/ast2js.ts */ "./src/core_modules/bool/ast2js.ts");
/* harmony import */ var _None_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./None/astconvert.ts */ "./src/core_modules/None/astconvert.ts");
/* harmony import */ var _None_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./None/ast2js.ts */ "./src/core_modules/None/ast2js.ts");


















const MODULES = {
    "symbol": {
        AST_CONVERT: _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
        AST2JS: _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    "operators": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    "operator.==": {
        AST_CONVERT: _operator_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
        AST2JS: _operator_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    "operator.=": {
        AST_CONVERT: _operator_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
        AST2JS: _operator_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    "int": {
        AST_CONVERT: _int_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
        AST2JS: _int_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    "ifblock": {
        AST_CONVERT: _ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
        AST2JS: _ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    "fctcall": {
        AST_CONVERT: _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "bool": {
        AST_CONVERT: _bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "None": {
        AST_CONVERT: _None_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _None_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);


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
    let js = "";
    if (this.is_init) {
        js += "var ";
        cursor.col += 4;
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
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


function convert(node, context) {
    if (!("targets" in node) && !("target" in node)) return false;
    let target = node.target;
    if ("targets" in node) target = node.targets[0];
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(target, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator.=", null, [
        left,
        right
    ]);
    let right_type = right.result_type;
    if ("annotation" in node) {
        right_type = node.annotation.id ?? "None";
        if (right.result_type !== null && right.result_type !== right_type) throw new Error("Wrong result_type");
    }
    astnode.result_type = right_type;
    console.warn(node, right_type);
    if (left.type === "symbol") {
        // if exists, ensure type.
        if (left.value in context.local_variables) {
            const result_type = context.local_variables[left.value];
            if (result_type !== null && right_type !== result_type) throw new Error("Wrong result_type");
        // annotation_type
        } else {
            context.local_variables[left.value] = right_type;
            astnode.is_init = true;
        }
    }
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


function convert(node, context) {
    if (!("ops" in node) || node.ops[0].constructor.$name !== "Eq") return false;
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.comparators[0], context);
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


function convert(node, context) {
    if (!("op" in node)) return false;
    let op = node.op.constructor.$name;
    if (op === "Add") op = "+";
    if (op === "Eq") return false;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator", op, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context)
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

function convert(node, context) {
    if (!("id" in node)) return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "symbol", node.id);
    if (node.id in context.local_variables) astnode.result_type = context.local_variables[node.id];
    return astnode;
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
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
// Brython must be imported before.

function py2ast(code) {
    const parser = new $B.Parser(code, "filename", 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    return convert_ast(_ast);
}
function convert_node(brython_node, context) {
    //console.log("N", brython_node);
    for(let module_name in _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__["default"]){
        const module = _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__["default"][module_name];
        let result = module.AST_CONVERT(brython_node, context);
        if (result !== false) {
            result.toJS = module.AST2JS;
            return result;
        }
    }
    console.error(brython_node);
    throw new Error("Unsupported node");
}
function convert_line(line, context) {
    //TODO: line ASTNode ???
    let node = line;
    if ("value" in line && !("targets" in line) && !("target" in line)) node = line.value;
    return convert_node(node, context);
}
function convert_ast(ast) {
    const context = {
        local_variables: Object.create(null)
    };
    return ast.body.map((line)=>convert_line(line, context));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9yLj0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3IuPT0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvci49PS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1ROb2RlW10pIHtcblxuXHRsZXQganMgPSBcIlwiO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMSwgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdCkge1xuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuXHRyZXR1cm4ganM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9lbmQobm9kZTogQVNUTm9kZSwganM6IHN0cmluZykge1xuXG4gICAgaWYoIG5vZGUuanNjb2RlIS5lbmQgIT09IG51bGwpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHN0YXJ0ID0gbm9kZS5qc2NvZGUhLnN0YXJ0O1xuXG4gICAgbGV0IGxpbmVfY291bnQgICAgPSAwO1xuICAgIGxldCBsYXN0X2xpbmVfaWR4ID0gMDtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBqcy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYoanNbaV0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICArK2xpbmVfY291bnQ7XG4gICAgICAgICAgICBsYXN0X2xpbmVfaWR4ID0gaTtcbiAgICAgICAgfVxuXG4gICAgaWYobGluZV9jb3VudCA9PT0gMCkge1xuICAgICAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICAgICAgbGluZTogc3RhcnQubGluZSxcbiAgICAgICAgICAgIGNvbCA6IHN0YXJ0LmNvbCArIGpzLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBzdGFydC5saW5lICsgbGluZV9jb3VudCxcbiAgICAgICAgY29sIDoganMubGVuZ3RoIC0gbGFzdF9saW5lX2lkeFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGNvbnN0IGluZGVudCA9IGluZGVudF9sZXZlbCo0ICsgbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKCk7XG5cbiAgICB1cGRhdGVfZW5kKG5vZGUsIGpzKTtcblxuICAgIGN1cnNvci5saW5lID0gbm9kZS5qc2NvZGUhLmVuZC5saW5lO1xuICAgIGN1cnNvci5jb2wgID0gbm9kZS5qc2NvZGUhLmVuZC5jb2w7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbC5Ob25lXCIsIG51bGwpO1xuICAgIGFzdG5vZGUucmVzdWx0X3R5cGUgPSBcIk5vbmVcIlxuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFsLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgbGV0IGpzID0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGpzICs9ICcoJztcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKSB7XG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5jb2wgKyAxLFxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwiZnVuY1wiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gVE9ETzogbm9kZS5hcmdzIC8vIGZjdCBjYWxsIGFyZ3VtZW50LlxuICAgIC8vIFRPRE86IHRoaXMgP1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZjdGNhbGxcIiwgdW5kZWZpbmVkLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJpZmJsb2NrXCIpXG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICAvL2lmXG4gICAgbGV0IGpzID0gXCJpZihcIjtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCIpe1wiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDI7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgfVxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSBcIn1cIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2w6IDIsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiBiZXR0ZXIgc3lzdGVtLi4uXG5sZXQgaXNfaWYgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcInRlc3RcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCBpc19pZiApIHtcbiAgICAgICAgaXNfaWYgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG5cbiAgICAgICAgaWYoIG5vZGUub3JlbHNlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVsc2UvZWxpZiBub3QgeWV0IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiaWZcIiwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIC4uLm5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpIClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgaXNfaWYgPSB0cnVlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiaWZibG9ja1wiLCBudWxsLCBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1uYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFsLmludFwiLCBub2RlLnZhbHVlKTtcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gXCJpbnRcIlxuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9vcGVyYXRvcnMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vb3BlcmF0b3JzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vb3BlcmF0b3IuPT0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vb3BlcmF0b3IuPT0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9vcGVyYXRvci49L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL29wZXJhdG9yLj0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vZmN0Y2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9mY3RjYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9Ob25lL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcIm9wZXJhdG9yc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJvcGVyYXRvci49PVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJvcGVyYXRvci49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcImludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJpZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcImZjdGNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwiYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJOb25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuIiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggKHRoaXMgYXMgYW55KS5pc19pbml0ICkge1xuICAgICAgICBqcyArPSBcInZhciBcIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSA0O1xuICAgIH1cblxuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj1cIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJ0YXJnZXRzXCIgaW4gbm9kZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCB0YXJnZXQgPSBub2RlLnRhcmdldDtcbiAgICBpZiggXCJ0YXJnZXRzXCIgaW4gbm9kZSlcbiAgICAgICAgdGFyZ2V0ID0gbm9kZS50YXJnZXRzWzBdO1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUodGFyZ2V0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgICAgICBjb250ZXh0KTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yLj1cIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcblxuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcblxuICAgIGNvbnNvbGUud2Fybihub2RlLCByaWdodF90eXBlKVxuXG4gICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuXG4gICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IHJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdID0gcmlnaHRfdHlwZTtcbiAgICAgICAgICAgIChhc3Rub2RlIGFzIGFueSkuaXNfaW5pdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj09XCI7XG4gICAgY3Vyc29yLmNvbCArPSAyO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BzXCIgaW4gbm9kZSkgfHwgbm9kZS5vcHNbMF0uY29uc3RydWN0b3IuJG5hbWUgIT09IFwiRXFcIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUuY29tcGFyYXRvcnNbMF0sIGNvbnRleHQpO1xuXG4gICAgaWYobGVmdC5yZXN1bHRfdHlwZSA9PT0gbnVsbCB8fCByaWdodC5yZXN1bHRfdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAvL1RPRE86IG9iamVjdCByZXN1bHRfdHlwZSB0b28uLi5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yLj09XCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG4gICAgXG4gICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIHJldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICAvL1RPRE86IGNoZWNrIGNoaWxkcmVuIHR5cGUuLi5cbiAgICAvL1RPRE86IHByaW9yaXR5IGNoZWNrc1xuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIitcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCJcIjtcblxuICAgIC8qXG4gICAgbGV0IGpzID0gXCJvcChcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIsICcrJywgXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICAvKmxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICBpZiggb3AgPT09IFwiRXFcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiT3BlcmF0b3JcIiwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7IC8vVE9ET1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwiaWRcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCBub2RlLmlkKTtcblxuICAgIGlmKCBub2RlLmlkIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKVxuICAgICAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5pZF07XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgXCJmaWxlbmFtZVwiLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIGNvbnZlcnRfYXN0KF9hc3QpOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiTlwiLCBicnl0aG9uX25vZGUpO1xuXG4gICAgZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIG5vZGVcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICAvL1RPRE86IGxpbmUgQVNUTm9kZSA/Pz9cblxuICAgIGxldCBub2RlID0gbGluZTtcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgdHlwZSBDb250ZXh0ID0ge1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBsb2NhbF92YXJpYWJsZXM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cblx0cmV0dXJuIGFzdC5ib2R5Lm1hcCggKGxpbmU6YW55KSA9PiBjb252ZXJ0X2xpbmUobGluZSxjb250ZXh0KSApO1xufSIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCBfdmFsdWU/OiBhbnksIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cbi8qXG5cdFx0Y29uc3QgdmFsdWUgPSBsaW5lLnZhbHVlO1xuXG5cdFx0aWYoIHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwicGFzc1wiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiXCI7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIFwiY29tcGFyYXRvcnNcIiBpbiB2YWx1ZSkge1xuXG5cdFx0XHR0aGlzLnR5cGUgPSBcIk9wZXJhdG9yXCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gXCJFcXVhbHNcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdG5ldyBBU1ROb2RlKHt2YWx1ZTogdmFsdWUubGVmdH0pLFxuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmNvbXBhcmF0b3JzWzBdfSlcblx0XHRcdF07XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiggdmFsdWUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgJiYgXCJ2YWx1ZVwiIGluIHZhbHVlLnZhbHVlKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcImZsb2F0XCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gdmFsdWUudmFsdWUudmFsdWU7XG5cdFx0fSovXG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7Il0sIm5hbWVzIjpbImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsInVwZGF0ZV9lbmQiLCJqc2NvZGUiLCJlbmQiLCJzdGFydCIsImxpbmVfY291bnQiLCJsYXN0X2xpbmVfaWR4IiwiaSIsImxlbmd0aCIsImluZGVudF9sZXZlbCIsImluZGVudCIsInBhZFN0YXJ0IiwidG9KUyIsInZhbHVlIiwiQVNUTm9kZSIsImNvbnZlcnQiLCJfY29udGV4dCIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImFzdG5vZGUiLCJyZXN1bHRfdHlwZSIsImNoaWxkcmVuIiwiY29udmVydF9ub2RlIiwiY29udGV4dCIsInVuZGVmaW5lZCIsImZ1bmMiLCJhcmdzIiwibWFwIiwiZSIsInR5cGUiLCJjb252ZXJ0X2xpbmUiLCJpc19pZiIsImNvbmQiLCJ0ZXN0Iiwib3JlbHNlIiwiRXJyb3IiLCJib2R5IiwibSIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsImlzX2luaXQiLCJ0YXJnZXQiLCJ0YXJnZXRzIiwibGVmdCIsInJpZ2h0IiwicmlnaHRfdHlwZSIsImFubm90YXRpb24iLCJpZCIsImNvbnNvbGUiLCJ3YXJuIiwibG9jYWxfdmFyaWFibGVzIiwib3BzIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImNvbXBhcmF0b3JzIiwic3RhcnRfY29sIiwib3AiLCJDT1JFX01PRFVMRVMiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJtb2R1bGVfbmFtZSIsIm1vZHVsZSIsInJlc3VsdCIsImVycm9yIiwiT2JqZWN0IiwiY3JlYXRlIiwicHljb2RlIiwiX3ZhbHVlIiwibGluZW5vIiwiY29sX29mZnNldCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCJdLCJzb3VyY2VSb290IjoiIn0=