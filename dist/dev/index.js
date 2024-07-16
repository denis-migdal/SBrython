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

/***/ "./src/core_modules/controlflows/ifblock/ast2js.ts":
/*!*********************************************************!*\
  !*** ./src/core_modules/controlflows/ifblock/ast2js.ts ***!
  \*********************************************************/
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
    if (this.type === "controlflows.ifblock") return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
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

/***/ "./src/core_modules/controlflows/ifblock/astconvert.ts":
/*!*************************************************************!*\
  !*** ./src/core_modules/controlflows/ifblock/astconvert.ts ***!
  \*************************************************************/
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
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.if", null, [
            cond,
            ...node.body.map((m)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_line)(m, context))
        ]);
    }
    is_if = true;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.ifblock", null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node, context)
    ]);
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
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operators/==/astconvert.ts */ "./src/core_modules/operators/==/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operators/==/ast2js.ts */ "./src/core_modules/operators/==/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./operators/+/astconvert.ts */ "./src/core_modules/operators/+/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./operators/+/ast2js.ts */ "./src/core_modules/operators/+/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fctcall/astconvert.ts */ "./src/core_modules/fctcall/astconvert.ts");
/* harmony import */ var _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./fctcall/ast2js.ts */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");


















const MODULES = {
    "symbol": {
        AST_CONVERT: _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
        AST2JS: _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    "operators.==": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    "operators.+": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "fctcall": {
        AST_CONVERT: _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);


/***/ }),

/***/ "./src/core_modules/literals/None/ast2js.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/literals/None/ast2js.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}`;
}


/***/ }),

/***/ "./src/core_modules/literals/None/astconvert.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/literals/None/astconvert.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (!(typeof node.value === "object") || !("__class__" in node.value) || node.value.__class__.__qualname__ !== "NoneType") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.None", null);
    astnode.result_type = "None";
    return astnode;
}


/***/ }),

/***/ "./src/core_modules/literals/bool/ast2js.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/literals/bool/ast2js.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}`;
}


/***/ }),

/***/ "./src/core_modules/literals/bool/astconvert.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/literals/bool/astconvert.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (typeof node.value !== "boolean") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.bool", node.value);
    astnode.result_type = "bool";
    return astnode;
}


/***/ }),

/***/ "./src/core_modules/literals/int/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/literals/int/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}n`;
}


/***/ }),

/***/ "./src/core_modules/literals/int/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/literals/int/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (typeof node.value !== "number") return false;
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.int", node.value);
    astnode.result_type = "int";
    return astnode;
}


/***/ }),

/***/ "./src/core_modules/operators/+/ast2js.ts":
/*!************************************************!*\
  !*** ./src/core_modules/operators/+/ast2js.ts ***!
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

/***/ "./src/core_modules/operators/+/astconvert.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/operators/+/astconvert.ts ***!
  \****************************************************/
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.+", op, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context)
    ]);
}


/***/ }),

/***/ "./src/core_modules/operators/=/ast2js.ts":
/*!************************************************!*\
  !*** ./src/core_modules/operators/=/ast2js.ts ***!
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

/***/ "./src/core_modules/operators/=/astconvert.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/operators/=/astconvert.ts ***!
  \****************************************************/
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
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.=", null, [
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

/***/ "./src/core_modules/operators/==/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/operators/==/ast2js.ts ***!
  \*************************************************/
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

/***/ "./src/core_modules/operators/==/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/operators/==/astconvert.ts ***!
  \*****************************************************/
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
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.==", null, [
        left,
        right
    ]);
    astnode.result_type = "bool";
    return astnode;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89PS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89PS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVE5vZGVbXSkge1xuXG5cdGxldCBqcyA9IFwiXCI7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAxLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0KSB7XG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG5cdHJldHVybiBqcztcbn1cblxuZnVuY3Rpb24gdXBkYXRlX2VuZChub2RlOiBBU1ROb2RlLCBqczogc3RyaW5nKSB7XG5cbiAgICBpZiggbm9kZS5qc2NvZGUhLmVuZCAhPT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBub2RlLmpzY29kZSEuc3RhcnQ7XG5cbiAgICBsZXQgbGluZV9jb3VudCAgICA9IDA7XG4gICAgbGV0IGxhc3RfbGluZV9pZHggPSAwO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGpzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZihqc1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICsrbGluZV9jb3VudDtcbiAgICAgICAgICAgIGxhc3RfbGluZV9pZHggPSBpO1xuICAgICAgICB9XG5cbiAgICBpZihsaW5lX2NvdW50ID09PSAwKSB7XG4gICAgICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICAgICAgY29sIDogc3RhcnQuY29sICsganMubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUgKyBsaW5lX2NvdW50LFxuICAgICAgICBjb2wgOiBqcy5sZW5ndGggLSBsYXN0X2xpbmVfaWR4XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoKTtcblxuICAgIHVwZGF0ZV9lbmQobm9kZSwganMpO1xuXG4gICAgY3Vyc29yLmxpbmUgPSBub2RlLmpzY29kZSEuZW5kLmxpbmU7XG4gICAgY3Vyc29yLmNvbCAgPSBub2RlLmpzY29kZSEuZW5kLmNvbDtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpXG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICAvL2lmXG4gICAgbGV0IGpzID0gXCJpZihcIjtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCIpe1wiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDI7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgfVxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSBcIn1cIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2w6IDIsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiBiZXR0ZXIgc3lzdGVtLi4uXG5sZXQgaXNfaWYgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcInRlc3RcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCBpc19pZiApIHtcbiAgICAgICAgaXNfaWYgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG5cbiAgICAgICAgaWYoIG5vZGUub3JlbHNlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVsc2UvZWxpZiBub3QgeWV0IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmXCIsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICAuLi5ub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGlzX2lmID0gdHJ1ZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSAnKCc7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSkge1xuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBcIilcIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3IuY29sICsgMSxcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcImZ1bmNcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmY3RjYWxsXCIsIHVuZGVmaW5lZCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5mdW5jLCBjb250ZXh0ICksXG4gICAgICAgIC4uLm5vZGUuYXJncy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn0iLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL29wZXJhdG9ycy89PS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vZmN0Y2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9mY3RjYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5cblxuY29uc3QgTU9EVUxFUyA9IHtcblx0XCJzeW1ib2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8wLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18wXG5cdH0sXG5cdFwib3BlcmF0b3JzLj09XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy4rXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwiZmN0Y2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcbiIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBudWxsKTtcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gXCJOb25lXCJcbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1uYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgbm9kZS52YWx1ZSk7XG4gICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiaW50XCJcbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcbiAgICBjb25zdCBzdGFydF9jb2wgPSBjdXJzb3IuY29sO1xuXG4gICAgLy9UT0RPOiBjaGVjayBjaGlsZHJlbiB0eXBlLi4uXG4gICAgLy9UT0RPOiBwcmlvcml0eSBjaGVja3NcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIFxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIrXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiXCI7XG5cbiAgICAvKlxuICAgIGxldCBqcyA9IFwib3AoXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiLCAnKycsIFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgLypsZXQganMgPSBgJHt0aGlzLnZhbHVlfShgO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG4gICAganMgKz0gXCIpXCI7Ki9cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBvcCA9IG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWU7XG4gICAgaWYoIG9wID09PSBcIkFkZFwiKVxuICAgICAgICBvcCA9IFwiK1wiO1xuXG4gICAgaWYoIG9wID09PSBcIkVxXCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4rXCIsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCAodGhpcyBhcyBhbnkpLmlzX2luaXQgKSB7XG4gICAgICAgIGpzICs9IFwidmFyIFwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDQ7XG4gICAgfVxuXG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGpzICs9IFwiPVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcInRhcmdldHNcIiBpbiBub2RlKSAmJiAhIChcInRhcmdldFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHRhcmdldCA9IG5vZGUudGFyZ2V0O1xuICAgIGlmKCBcInRhcmdldHNcIiBpbiBub2RlKVxuICAgICAgICB0YXJnZXQgPSBub2RlLnRhcmdldHNbMF07XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZSh0YXJnZXQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCAgICAgIGNvbnRleHQpO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLj1cIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcblxuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBhc3Rub2RlLnJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcblxuICAgIGNvbnNvbGUud2Fybihub2RlLCByaWdodF90eXBlKVxuXG4gICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuXG4gICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IHJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdID0gcmlnaHRfdHlwZTtcbiAgICAgICAgICAgIChhc3Rub2RlIGFzIGFueSkuaXNfaW5pdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj09XCI7XG4gICAgY3Vyc29yLmNvbCArPSAyO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BzXCIgaW4gbm9kZSkgfHwgbm9kZS5vcHNbMF0uY29uc3RydWN0b3IuJG5hbWUgIT09IFwiRXFcIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUuY29tcGFyYXRvcnNbMF0sIGNvbnRleHQpO1xuXG4gICAgaWYobGVmdC5yZXN1bHRfdHlwZSA9PT0gbnVsbCB8fCByaWdodC5yZXN1bHRfdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAvL1RPRE86IG9iamVjdCByZXN1bHRfdHlwZSB0b28uLi5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy49PVwiLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xuICAgIFxuICAgIGFzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlOyAvL1RPRE9cbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcImlkXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJzeW1ib2xcIiwgbm9kZS5pZCk7XG5cbiAgICBpZiggbm9kZS5pZCBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcylcbiAgICAgICAgYXN0bm9kZS5yZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUuaWRdO1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIk5cIiwgYnJ5dGhvbl9ub2RlKTtcblxuICAgIGZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IENPUkVfTU9EVUxFU1ttb2R1bGVfbmFtZSBhcyBrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgLy9UT0RPOiBsaW5lIEFTVE5vZGUgPz8/XG5cbiAgICBsZXQgbm9kZSA9IGxpbmU7XG4gICAgaWYoIFwidmFsdWVcIiBpbiBsaW5lICYmICEgKFwidGFyZ2V0c1wiIGluIGxpbmUpICYmICEgKFwidGFyZ2V0XCIgaW4gbGluZSkgKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IHR5cGUgQ29udGV4dCA9IHtcbiAgICBsb2NhbF92YXJpYWJsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ3xudWxsPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgbG9jYWxfdmFyaWFibGVzOiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgfVxuXG5cdHJldHVybiBhc3QuYm9keS5tYXAoIChsaW5lOmFueSkgPT4gY29udmVydF9saW5lKGxpbmUsY29udGV4dCkgKTtcbn0iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgX3ZhbHVlPzogYW55LCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG4vKlxuXHRcdGNvbnN0IHZhbHVlID0gbGluZS52YWx1ZTtcblxuXHRcdGlmKCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcInBhc3NcIjtcblx0XHRcdHRoaXMudmFsdWUgPSBcIlwiO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKCBcImNvbXBhcmF0b3JzXCIgaW4gdmFsdWUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJPcGVyYXRvclwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiRXF1YWxzXCI7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW1xuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmxlZnR9KSxcblx0XHRcdFx0bmV3IEFTVE5vZGUoe3ZhbHVlOiB2YWx1ZS5jb21wYXJhdG9yc1swXX0pXG5cdFx0XHRdO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIHZhbHVlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIFwidmFsdWVcIiBpbiB2YWx1ZS52YWx1ZSkge1xuXHRcdFx0dGhpcy50eXBlID0gXCJmbG9hdFwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlLnZhbHVlO1xuXHRcdH0qL1xuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiOyJdLCJuYW1lcyI6WyJhc3QyanMiLCJhc3QiLCJqcyIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwiYXN0bm9kZTJqcyIsIm5ld2xpbmUiLCJ1cGRhdGVfZW5kIiwianNjb2RlIiwiZW5kIiwic3RhcnQiLCJsaW5lX2NvdW50IiwibGFzdF9saW5lX2lkeCIsImkiLCJsZW5ndGgiLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsInRvSlMiLCJ0eXBlIiwiY2hpbGRyZW4iLCJjb252ZXJ0X2xpbmUiLCJjb252ZXJ0X25vZGUiLCJBU1ROb2RlIiwiaXNfaWYiLCJjb252ZXJ0IiwiY29udGV4dCIsImNvbmQiLCJ0ZXN0Iiwib3JlbHNlIiwiRXJyb3IiLCJyZXN1bHRfdHlwZSIsImJvZHkiLCJtYXAiLCJtIiwidW5kZWZpbmVkIiwiZnVuYyIsImFyZ3MiLCJlIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwidmFsdWUiLCJfY29udGV4dCIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImFzdG5vZGUiLCJzdGFydF9jb2wiLCJvcCIsImNvbnN0cnVjdG9yIiwiJG5hbWUiLCJsZWZ0IiwicmlnaHQiLCJpc19pbml0IiwidGFyZ2V0IiwidGFyZ2V0cyIsInJpZ2h0X3R5cGUiLCJhbm5vdGF0aW9uIiwiaWQiLCJjb25zb2xlIiwid2FybiIsImxvY2FsX3ZhcmlhYmxlcyIsIm9wcyIsImNvbXBhcmF0b3JzIiwiQ09SRV9NT0RVTEVTIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiYnJ5dGhvbl9ub2RlIiwibW9kdWxlX25hbWUiLCJtb2R1bGUiLCJyZXN1bHQiLCJlcnJvciIsIk9iamVjdCIsImNyZWF0ZSIsInB5Y29kZSIsIl92YWx1ZSIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiXSwic291cmNlUm9vdCI6IiJ9