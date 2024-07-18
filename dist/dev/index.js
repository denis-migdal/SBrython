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
/* harmony export */   body2js: () => (/* binding */ body2js),
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
function body2js(node, cursor, offset = 0) {
    let js = "{";
    const body = node.children; //body: ASTNode[];
    for(let i = offset; i < body.length; ++i){
        js += newline(node, cursor, 1);
        js += astnode2js(body[i], cursor);
    }
    js += newline(node, cursor);
    js += "}";
    cursor.col += 1;
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

/***/ "./src/core_modules/comments/ast2js.ts":
/*!*********************************************!*\
  !*** ./src/core_modules/comments/ast2js.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    //TODO...
    return ""; //`${this.value}`;
}


/***/ }),

/***/ "./src/core_modules/comments/astconvert.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/comments/astconvert.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
function convert(node, _context) {
    return; // currently comments aren't included in Brython's AST
//const astnode = new ASTNode(node, "literals.bool", node.value);
//astnode.result_type = "bool";
//return astnode;
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
    js += ")";
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
    this.jscode.end = {
        ...cursor
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
    if (!("test" in node)) return;
    if (is_if) {
        is_if = false;
        const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context);
        if (node.orelse.length !== 0) throw new Error("else/elif not yet supported");
        if (cond.result_type !== "bool") throw new Error(`Type ${cond.result_type} not yet supported as if condition`);
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.if", null, null, [
            cond,
            ...(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ]);
    }
    is_if = true;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.ifblock", null, null, [
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
    if (!("func" in node)) return;
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "fctcall", null, null, [
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
/* harmony import */ var _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pass/astconvert.ts */ "./src/core_modules/pass/astconvert.ts");
/* harmony import */ var _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pass/ast2js.ts */ "./src/core_modules/pass/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./operators/==/astconvert.ts */ "./src/core_modules/operators/==/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./operators/==/ast2js.ts */ "./src/core_modules/operators/==/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./operators/+/astconvert.ts */ "./src/core_modules/operators/+/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./operators/+/ast2js.ts */ "./src/core_modules/operators/+/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./fctcall/astconvert.ts */ "./src/core_modules/fctcall/astconvert.ts");
/* harmony import */ var _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./fctcall/ast2js.ts */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");


























const MODULES = {
    "symbol": {
        AST_CONVERT: _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
        AST2JS: _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    "pass": {
        AST_CONVERT: _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
        AST2JS: _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    "operators.==": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    "operators.+": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    "literals.str": {
        AST_CONVERT: _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
        AST2JS: _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "literals.float": {
        AST_CONVERT: _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "fctcall": {
        AST_CONVERT: _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__["default"],
        AST2JS: _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
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
    if (!(typeof node.value === "object") || !("__class__" in node.value) || node.value.__class__.__qualname__ !== "NoneType") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.None", "None", null);
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
    if (typeof node.value !== "boolean") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.bool", "bool", node.value);
}


/***/ }),

/***/ "./src/core_modules/literals/float/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/literals/float/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return this.value;
}


/***/ }),

/***/ "./src/core_modules/literals/float/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/literals/float/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (!(node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.float", "float", node.value.value);
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
    if (typeof node.value !== "number") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.int", "int", node.value);
}


/***/ }),

/***/ "./src/core_modules/literals/str/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/literals/str/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `"${this.value}"`;
}


/***/ }),

/***/ "./src/core_modules/literals/str/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/literals/str/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (typeof node.value !== "string") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.str", "str", node.value);
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
    if (!("op" in node)) return;
    let op = node.op.constructor.$name;
    if (op === "Add") op = "+";
    if (op === "Eq") return;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.+", null, op, [
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
    if (this.type.endsWith("(init)")) {
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
    if (!("targets" in node) && !("target" in node)) return;
    let target = node.target;
    if ("targets" in node) target = node.targets[0];
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(target, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    let right_type = right.result_type;
    if ("annotation" in node) {
        right_type = node.annotation.id ?? "None";
        if (right.result_type !== null && right.result_type !== right_type) throw new Error("Wrong result_type");
    }
    let type = "operators.=";
    if (left.type === "symbol") {
        // if exists, ensure type.
        if (left.value in context.local_variables) {
            const result_type = context.local_variables[left.value];
            if (result_type !== null && right_type !== result_type) throw new Error("Wrong result_type");
        // annotation_type
        } else {
            context.local_variables[left.value] = right_type;
            type += "(init)";
        }
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, right_type, null, [
        left,
        right
    ]);
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
    if (!("ops" in node) || node.ops[0].constructor.$name !== "Eq") return;
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.comparators[0], context);
    if (left.result_type === null || right.result_type === null) {
        //TODO: object result_type too...
        throw new Error("Not implemented");
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.==", "bool", null, [
        left,
        right
    ]);
}


/***/ }),

/***/ "./src/core_modules/pass/ast2js.ts":
/*!*****************************************!*\
  !*** ./src/core_modules/pass/ast2js.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return "/* not implemented */";
}


/***/ }),

/***/ "./src/core_modules/pass/astconvert.ts":
/*!*********************************************!*\
  !*** ./src/core_modules/pass/astconvert.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, _context) {
    if (Object.keys(node).length !== 4) return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "pass", null);
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
    if (!("id" in node)) return;
    let result_type = null;
    if (node.id in context.local_variables) result_type = context.local_variables[node.id];
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "symbol", result_type, node.id);
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
/* harmony export */   convert_body: () => (/* binding */ convert_body),
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
        if (result !== undefined) {
            result.toJS = module.AST2JS;
            return result;
        }
    }
    console.error(brython_node);
    throw new Error("Unsupported node");
}
function convert_body(node, context) {
    return node.body.map((m)=>convert_line(m, context));
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
    const result = new Array(ast.body.length);
    for(let i = 0; i < ast.body.length; ++i){
        //TODO: detect comments
        result[i] = convert_line(ast.body[i], context);
    }
    //TODO: detect comments...
    return result;
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
    constructor(brython_node, type, result_type, _value = null, children = []){
        this.type = type;
        this.result_type = result_type;
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
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZCxNQUFNaUcsYUFBYWEsTUFBTTtnQkFDekI3RyxLQUFLZ0csYUFBYWMsVUFBVTtZQUM3QjtZQUNBbEcsS0FBSztnQkFDSmIsTUFBTWlHLGFBQWFlLFVBQVU7Z0JBQzdCL0csS0FBS2dHLGFBQWFnQixjQUFjO1lBQ2pDO1FBQ0Q7SUFDRDtBQUNEOzs7Ozs7O1NDdkNBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1ROb2RlW10pIHtcblxuXHRsZXQganMgPSBcIlwiO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMSwgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdCkge1xuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuXHRyZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgb2Zmc2V0ID0gMCkge1xuICAgIFxuICAgIGxldCBqcyA9IFwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuOy8vYm9keTogQVNUTm9kZVtdO1xuXG4gICAgZm9yKGxldCBpID0gb2Zmc2V0OyBpIDwgYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keVtpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIn1cIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9lbmQobm9kZTogQVNUTm9kZSwganM6IHN0cmluZykge1xuXG4gICAgaWYoIG5vZGUuanNjb2RlIS5lbmQgIT09IG51bGwpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHN0YXJ0ID0gbm9kZS5qc2NvZGUhLnN0YXJ0O1xuXG4gICAgbGV0IGxpbmVfY291bnQgICAgPSAwO1xuICAgIGxldCBsYXN0X2xpbmVfaWR4ID0gMDtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBqcy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYoanNbaV0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICArK2xpbmVfY291bnQ7XG4gICAgICAgICAgICBsYXN0X2xpbmVfaWR4ID0gaTtcbiAgICAgICAgfVxuXG4gICAgaWYobGluZV9jb3VudCA9PT0gMCkge1xuICAgICAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICAgICAgbGluZTogc3RhcnQubGluZSxcbiAgICAgICAgICAgIGNvbCA6IHN0YXJ0LmNvbCArIGpzLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBzdGFydC5saW5lICsgbGluZV9jb3VudCxcbiAgICAgICAgY29sIDoganMubGVuZ3RoIC0gbGFzdF9saW5lX2lkeFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGNvbnN0IGluZGVudCA9IGluZGVudF9sZXZlbCo0ICsgbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKCk7XG5cbiAgICB1cGRhdGVfZW5kKG5vZGUsIGpzKTtcblxuICAgIGN1cnNvci5saW5lID0gbm9kZS5qc2NvZGUhLmVuZC5saW5lO1xuICAgIGN1cnNvci5jb2wgID0gbm9kZS5qc2NvZGUhLmVuZC5jb2w7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgYm9keTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpXG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICAvL2lmXG4gICAgbGV0IGpzID0gXCJpZihcIjtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCIpXCI7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG4vL1RPRE86IGJldHRlciBzeXN0ZW0uLi5cbmxldCBpc19pZiA9IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwidGVzdFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgaWYoIGlzX2lmICkge1xuICAgICAgICBpc19pZiA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcblxuICAgICAgICBpZiggbm9kZS5vcmVsc2UubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZWxzZS9lbGlmIG5vdCB5ZXQgc3VwcG9ydGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIC4uLmNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBpc19pZiA9IHRydWU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gJygnO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLmNvbCArIDEsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJmdW5jXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm47XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZmN0Y2FsbFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufSIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vZmN0Y2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vZmN0Y2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwib3BlcmF0b3JzLj09XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcIm9wZXJhdG9ycy4rXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcImZjdGNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzExLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMVxuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG4iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLk5vbmVcIiwgXCJOb25lXCIsIG51bGwpO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChub2RlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fICE9PSBcImZsb2F0XCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmZsb2F0XCIsIFwiZmxvYXRcIiwgbm9kZS52YWx1ZS52YWx1ZSk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1uYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgXCJpbnRcIiwgbm9kZS52YWx1ZSk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYFwiJHt0aGlzLnZhbHVlfVwiYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBcInN0clwiLCBub2RlLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcbiAgICBjb25zdCBzdGFydF9jb2wgPSBjdXJzb3IuY29sO1xuXG4gICAgLy9UT0RPOiBjaGVjayBjaGlsZHJlbiB0eXBlLi4uXG4gICAgLy9UT0RPOiBwcmlvcml0eSBjaGVja3NcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIFxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIrXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiXCI7XG5cbiAgICAvKlxuICAgIGxldCBqcyA9IFwib3AoXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiLCAnKycsIFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgLypsZXQganMgPSBgJHt0aGlzLnZhbHVlfShgO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG4gICAganMgKz0gXCIpXCI7Ki9cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIGxldCBvcCA9IG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWU7XG4gICAgaWYoIG9wID09PSBcIkFkZFwiKVxuICAgICAgICBvcCA9IFwiK1wiO1xuXG4gICAgaWYoIG9wID09PSBcIkVxXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4rXCIsIG51bGwsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKSB7XG4gICAgICAgIGpzICs9IFwidmFyIFwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDQ7XG4gICAgfVxuXG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGpzICs9IFwiPVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcInRhcmdldHNcIiBpbiBub2RlKSAmJiAhIChcInRhcmdldFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IHRhcmdldCA9IG5vZGUudGFyZ2V0O1xuICAgIGlmKCBcInRhcmdldHNcIiBpbiBub2RlKVxuICAgICAgICB0YXJnZXQgPSBub2RlLnRhcmdldHNbMF07XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZSh0YXJnZXQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCAgICAgIGNvbnRleHQpO1xuXG4gICAgbGV0IHJpZ2h0X3R5cGU6IHN0cmluZ3xudWxsID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgaWYoIFwiYW5ub3RhdGlvblwiIGluIG5vZGUpIHtcbiAgICAgICAgcmlnaHRfdHlwZSA9IG5vZGUuYW5ub3RhdGlvbi5pZCA/PyBcIk5vbmVcIjtcbiAgICAgICAgaWYoIHJpZ2h0LnJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0LnJlc3VsdF90eXBlICE9PSByaWdodF90eXBlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBcIm9wZXJhdG9ycy49XCI7XG5cbiAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG5cbiAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV07XG4gICAgICAgICAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHRfdHlwZSAhPT0gcmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG5cbiAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV0gPSByaWdodF90eXBlO1xuICAgICAgICAgICAgdHlwZSArPSBcIihpbml0KVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCByaWdodF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIC8vVE9ETyBOb25lIHR5cGUuLi5cbiAgICAvL1RPRE8gc3RyXG5cbiAgICBsZXQganMgPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCI9PVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMjtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcIm9wc1wiIGluIG5vZGUpIHx8IG5vZGUub3BzWzBdLmNvbnN0cnVjdG9yLiRuYW1lICE9PSBcIkVxXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLmNvbXBhcmF0b3JzWzBdLCBjb250ZXh0KTtcblxuICAgIGlmKGxlZnQucmVzdWx0X3R5cGUgPT09IG51bGwgfHwgcmlnaHQucmVzdWx0X3R5cGUgPT09IG51bGwpIHtcbiAgICAgICAgLy9UT0RPOiBvYmplY3QgcmVzdWx0X3R5cGUgdG9vLi4uXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuPT1cIiwgXCJib29sXCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIjtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggT2JqZWN0LmtleXMobm9kZSkubGVuZ3RoICE9PSA0KVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7IC8vVE9ET1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwiaWRcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgaWYoIG5vZGUuaWQgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5pZF07XG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgbm9kZS5pZCk7XG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIk5cIiwgYnJ5dGhvbl9ub2RlKTtcblxuICAgIGZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IENPUkVfTU9EVUxFU1ttb2R1bGVfbmFtZSBhcyBrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBtb2R1bGUuQVNUMkpTO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICAvL1RPRE86IGxpbmUgQVNUTm9kZSA/Pz9cblxuICAgIGxldCBub2RlID0gbGluZTtcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgdHlwZSBDb250ZXh0ID0ge1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBsb2NhbF92YXJpYWJsZXM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICAvL1RPRE86IGRldGVjdCBjb21tZW50c1xuXG4gICAgICAgIHJlc3VsdFtpXSA9IGNvbnZlcnRfbGluZShhc3QuYm9keVtpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSkgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiOyJdLCJuYW1lcyI6WyJhc3QyanMiLCJhc3QiLCJqcyIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwiYXN0bm9kZTJqcyIsIm5ld2xpbmUiLCJib2R5MmpzIiwib2Zmc2V0IiwiYm9keSIsImNoaWxkcmVuIiwiaSIsImxlbmd0aCIsInVwZGF0ZV9lbmQiLCJqc2NvZGUiLCJlbmQiLCJzdGFydCIsImxpbmVfY291bnQiLCJsYXN0X2xpbmVfaWR4IiwiaW5kZW50X2xldmVsIiwiaW5kZW50IiwicGFkU3RhcnQiLCJ0b0pTIiwiY29udmVydCIsIl9jb250ZXh0IiwidHlwZSIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsIkFTVE5vZGUiLCJpc19pZiIsImNvbnRleHQiLCJjb25kIiwidGVzdCIsIm9yZWxzZSIsIkVycm9yIiwicmVzdWx0X3R5cGUiLCJmdW5jIiwiYXJncyIsIm1hcCIsImUiLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJ2YWx1ZSIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsIk9iamVjdCIsInN0YXJ0X2NvbCIsIm9wIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImxlZnQiLCJyaWdodCIsImVuZHNXaXRoIiwidGFyZ2V0IiwidGFyZ2V0cyIsInJpZ2h0X3R5cGUiLCJhbm5vdGF0aW9uIiwiaWQiLCJsb2NhbF92YXJpYWJsZXMiLCJvcHMiLCJjb21wYXJhdG9ycyIsImtleXMiLCJDT1JFX01PRFVMRVMiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJtb2R1bGVfbmFtZSIsIm1vZHVsZSIsInJlc3VsdCIsInVuZGVmaW5lZCIsImNvbnNvbGUiLCJlcnJvciIsIm0iLCJjb252ZXJ0X2xpbmUiLCJjcmVhdGUiLCJBcnJheSIsInB5Y29kZSIsIl92YWx1ZSIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiXSwic291cmNlUm9vdCI6IiJ9