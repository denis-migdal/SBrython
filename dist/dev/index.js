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
    if (this.type === "controlflows.ifblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[i], cursor);
        return js;
    }
    //if
    let keyword = "if";
    if (this.type === "controlflows.elif") keyword = "else if";
    if (this.type === "controlflows.else") keyword = "else";
    let js = `${keyword}`;
    let offset = 0;
    if (keyword !== "else") {
        js += "(";
        cursor.col += js.length;
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
        ++offset;
        js += ")";
    }
    if (keyword !== "if") {
        --this.jscode.start.col;
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, offset);
    if (keyword !== "if") {
        ++this.jscode.start.col;
    }
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


function convert(node, context) {
    if ("ifblock" in node) {
        if (node.ifblock === "else") {
            return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
                ...(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
            ]);
        }
        const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context);
        if (cond.result_type !== "bool") throw new Error(`Type ${cond.result_type} not yet supported as if condition`);
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
            cond,
            ...(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ]);
    }
    if (!("test" in node)) return;
    node.ifblock = "if";
    const children = [
        node
    ];
    let cur = node;
    while("orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]){
        cur = cur.orelse[0];
        cur.ifblock = "elif";
        children.push(cur);
    }
    if ("orelse" in cur && cur.orelse.length !== 0) {
        let beg = cur.orelse[0];
        let end = cur.orelse[cur.orelse.length - 1];
        children.push({
            ifblock: "else",
            body: cur.orelse,
            lineno: beg.lineno - 1,
            col_offset: node.col_offset,
            end_lineno: end.end_lineno,
            end_col_offset: end.end_col_offset
        });
    }
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.ifblock", null, null, [
        ...children.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context))
    ]);
    for(let i = 0; i < astnode.children.length - 1; ++i){
        const cc = astnode.children[i].children;
        astnode.children[i].pycode.end = cc[cc.length - 1].pycode.end;
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sU0FBU0EsT0FBT0MsR0FBYztJQUVwQyxJQUFJQyxLQUFLO0lBQ04sSUFBSUMsU0FBUztRQUFDQyxNQUFNO1FBQUdDLEtBQUs7SUFBQztJQUNoQyxLQUFJLElBQUlDLFFBQVFMLElBQUs7UUFDcEJDLE1BQU1LLFdBQVdELE1BQU1IO1FBQ2pCRCxNQUFTTSxRQUFRRixNQUFNSDtJQUMzQjtJQUVILE9BQU9EO0FBQ1I7QUFFTyxTQUFTTyxRQUFRSCxJQUFhLEVBQUVILE1BQWUsRUFBRU8sU0FBUyxDQUFDO0lBRTlELElBQUlSLEtBQUs7SUFDVCxNQUFNUyxPQUFPTCxLQUFLTSxRQUFRLEVBQUMsa0JBQWtCO0lBRTdDLElBQUksSUFBSUMsSUFBSUgsUUFBUUcsSUFBSUYsS0FBS0csTUFBTSxFQUFFLEVBQUVELEVBQUc7UUFDdENYLE1BQU1NLFFBQVFGLE1BQU1ILFFBQVE7UUFDNUJELE1BQU1LLFdBQVdJLElBQUksQ0FBQ0UsRUFBRSxFQUFFVjtJQUM5QjtJQUVBRCxNQUFNTSxRQUFRRixNQUFNSDtJQUNwQkQsTUFBTTtJQUNOQyxPQUFPRSxHQUFHLElBQUk7SUFFZCxPQUFPSDtBQUNYO0FBRUEsU0FBU2EsV0FBV1QsSUFBYSxFQUFFSixFQUFVO0lBRXpDLElBQUlJLEtBQUtVLE1BQU0sQ0FBRUMsR0FBRyxLQUFLLE1BQ3JCO0lBRUosTUFBTUMsUUFBUVosS0FBS1UsTUFBTSxDQUFFRSxLQUFLO0lBRWhDLElBQUlDLGFBQWdCO0lBQ3BCLElBQUlDLGdCQUFnQjtJQUVwQixJQUFJLElBQUlQLElBQUksR0FBR0EsSUFBSVgsR0FBR1ksTUFBTSxFQUFFLEVBQUVELEVBQzVCLElBQUdYLEVBQUUsQ0FBQ1csRUFBRSxLQUFLLE1BQU07UUFDZixFQUFFTTtRQUNGQyxnQkFBZ0JQO0lBQ3BCO0lBRUosSUFBR00sZUFBZSxHQUFHO1FBQ2pCYixLQUFLVSxNQUFNLENBQUVDLEdBQUcsR0FBRztZQUNmYixNQUFNYyxNQUFNZCxJQUFJO1lBQ2hCQyxLQUFNYSxNQUFNYixHQUFHLEdBQUdILEdBQUdZLE1BQU07UUFDL0I7UUFDQTtJQUNKO0lBRUFSLEtBQUtVLE1BQU0sQ0FBRUMsR0FBRyxHQUFHO1FBQ2ZiLE1BQU1jLE1BQU1kLElBQUksR0FBR2U7UUFDbkJkLEtBQU1ILEdBQUdZLE1BQU0sR0FBR007SUFDdEI7QUFDSjtBQUVPLFNBQVNaLFFBQVFGLElBQWEsRUFBRUgsTUFBZSxFQUFFa0IsZUFBdUIsQ0FBQztJQUU1RSxNQUFNQyxTQUFTRCxlQUFhLElBQUlmLEtBQUtVLE1BQU0sQ0FBRUUsS0FBSyxDQUFDYixHQUFHO0lBRXRELEVBQUVGLE9BQU9DLElBQUk7SUFDYkQsT0FBT0UsR0FBRyxHQUFHaUI7SUFDYixPQUFPLE9BQU8sR0FBR0MsUUFBUSxDQUFDRDtBQUM5QjtBQUVPLFNBQVNmLFdBQVdELElBQWEsRUFBRUgsTUFBZTtJQUVyREcsS0FBS1UsTUFBTSxHQUFHO1FBQ1ZFLE9BQU87WUFBQyxHQUFHZixNQUFNO1FBQUE7UUFDakJjLEtBQU87SUFDWDtJQUVBLElBQUlmLEtBQUtJLEtBQUtrQixJQUFJO0lBRWxCVCxXQUFXVCxNQUFNSjtJQUVqQkMsT0FBT0MsSUFBSSxHQUFHRSxLQUFLVSxNQUFNLENBQUVDLEdBQUcsQ0FBQ2IsSUFBSTtJQUNuQ0QsT0FBT0UsR0FBRyxHQUFJQyxLQUFLVSxNQUFNLENBQUVDLEdBQUcsQ0FBQ1osR0FBRztJQUVsQyxPQUFPSDtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUNuRmUsU0FBU0Y7SUFFcEIsU0FBUztJQUNULE9BQU8sSUFBSSxrQkFBa0I7QUFDakM7Ozs7Ozs7Ozs7Ozs7OztBQ0plLFNBQVN5QixRQUFRbkIsSUFBUyxFQUFFb0IsUUFBaUI7SUFFeEQsUUFBUSxzREFBc0Q7QUFFOUQsaUVBQWlFO0FBQ2pFLCtCQUErQjtBQUMvQixpQkFBaUI7QUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUc0Q7QUFHdkMsU0FBUzFCO0lBRXBCLElBQUlHLFNBQVM7UUFBQyxHQUFHLElBQUksQ0FBQ2EsTUFBTSxDQUFFRSxLQUFLO0lBQUE7SUFFbkMsSUFBSSxJQUFJLENBQUNTLElBQUksS0FBSyx3QkFBd0I7UUFDdEMsSUFBSXpCLEtBQUs7UUFDVCxJQUFJLElBQUlXLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNELFFBQVEsQ0FBQ0UsTUFBTSxFQUFFLEVBQUVELEVBQ3ZDWCxNQUFNSyxrREFBVUEsQ0FBQyxJQUFJLENBQUNLLFFBQVEsQ0FBQ0MsRUFBRSxFQUFFVjtRQUN2QyxPQUFPRDtJQUNYO0lBRUEsSUFBSTtJQUNKLElBQUkwQixVQUFVO0lBQ2QsSUFBSSxJQUFJLENBQUNELElBQUksS0FBSyxxQkFDZEMsVUFBVTtJQUNkLElBQUksSUFBSSxDQUFDRCxJQUFJLEtBQUsscUJBQ2RDLFVBQVU7SUFFZCxJQUFJMUIsS0FBSyxDQUFDLEVBQUUwQixRQUFRLENBQUM7SUFDckIsSUFBSWxCLFNBQVM7SUFDYixJQUFJa0IsWUFBWSxRQUFRO1FBQ3BCMUIsTUFBTTtRQUNOQyxPQUFPRSxHQUFHLElBQUlILEdBQUdZLE1BQU07UUFDdkJaLE1BQU1LLGtEQUFVQSxDQUFDLElBQUksQ0FBQ0ssUUFBUSxDQUFDLEVBQUUsRUFBRVQ7UUFDbkMsRUFBRU87UUFDRlIsTUFBTTtJQUNWO0lBQ0EsSUFBRzBCLFlBQVksTUFBTTtRQUNqQixFQUFFLElBQUksQ0FBQ1osTUFBTSxDQUFFRSxLQUFLLENBQUNiLEdBQUc7SUFDNUI7SUFDQUgsTUFBTU8sK0NBQU9BLENBQUMsSUFBSSxFQUFFTixRQUFRTztJQUM1QixJQUFHa0IsWUFBWSxNQUFNO1FBQ2pCLEVBQUUsSUFBSSxDQUFDWixNQUFNLENBQUVFLEtBQUssQ0FBQ2IsR0FBRztJQUM1QjtJQUVBLElBQUksQ0FBQ1csTUFBTSxDQUFFQyxHQUFHLEdBQUc7UUFBQyxHQUFHZCxNQUFNO0lBQUE7SUFFN0IsT0FBT0Q7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QzJFO0FBQ2pDO0FBRTNCLFNBQVN1QixRQUFRbkIsSUFBUyxFQUFFMEIsT0FBZ0I7SUFFdkQsSUFBSSxhQUFhMUIsTUFBTztRQUVwQixJQUFJQSxLQUFLMkIsT0FBTyxLQUFLLFFBQVE7WUFDekIsT0FBTyxJQUFJRixvREFBT0EsQ0FBQ3pCLE1BQU0sQ0FBQyxhQUFhLEVBQUVBLEtBQUsyQixPQUFPLENBQUMsQ0FBQyxFQUFFLE1BQU0sTUFBTTttQkFDOURKLG9EQUFZQSxDQUFDdkIsTUFBTTBCO2FBQ3pCO1FBQ0w7UUFFQSxNQUFNRSxPQUFPSixvREFBWUEsQ0FBQ3hCLEtBQUs2QixJQUFJLEVBQUVIO1FBRXJDLElBQUdFLEtBQUtFLFdBQVcsS0FBSyxRQUNwQixNQUFNLElBQUlDLE1BQU0sQ0FBQyxLQUFLLEVBQUVILEtBQUtFLFdBQVcsQ0FBQyxrQ0FBa0MsQ0FBQztRQUVoRixPQUFPLElBQUlMLG9EQUFPQSxDQUFDekIsTUFBTSxDQUFDLGFBQWEsRUFBRUEsS0FBSzJCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxNQUFNO1lBQ2pFQztlQUNHTCxvREFBWUEsQ0FBQ3ZCLE1BQU0wQjtTQUN6QjtJQUNMO0lBRUEsSUFBSSxDQUFHLFdBQVUxQixJQUFHLEdBQ2hCO0lBRUpBLEtBQUsyQixPQUFPLEdBQUc7SUFFZixNQUFNckIsV0FBVztRQUNiTjtLQUNIO0lBRUQsSUFBSWdDLE1BQU1oQztJQUNWLE1BQU8sWUFBWWdDLE9BQU9BLElBQUlDLE1BQU0sQ0FBQ3pCLE1BQU0sS0FBSyxLQUFLLFVBQVV3QixJQUFJQyxNQUFNLENBQUMsRUFBRSxDQUFFO1FBQzFFRCxNQUFNQSxJQUFJQyxNQUFNLENBQUMsRUFBRTtRQUNuQkQsSUFBSUwsT0FBTyxHQUFHO1FBQ2RyQixTQUFTNEIsSUFBSSxDQUFDRjtJQUNsQjtJQUNBLElBQUksWUFBWUEsT0FBT0EsSUFBSUMsTUFBTSxDQUFDekIsTUFBTSxLQUFLLEdBQUk7UUFFN0MsSUFBSTJCLE1BQU1ILElBQUlDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLElBQUl0QixNQUFNcUIsSUFBSUMsTUFBTSxDQUFDRCxJQUFJQyxNQUFNLENBQUN6QixNQUFNLEdBQUMsRUFBRTtRQUV6Q0YsU0FBUzRCLElBQUksQ0FBQztZQUNWUCxTQUFTO1lBQ1R0QixNQUFTMkIsSUFBSUMsTUFBTTtZQUNuQkcsUUFBU0QsSUFBSUMsTUFBTSxHQUFHO1lBQ3RCQyxZQUFZckMsS0FBS3FDLFVBQVU7WUFDM0JDLFlBQVkzQixJQUFJMkIsVUFBVTtZQUMxQkMsZ0JBQWdCNUIsSUFBSTRCLGNBQWM7UUFDdEM7SUFDSjtJQUVBLE1BQU1DLFVBQVUsSUFBSWYsb0RBQU9BLENBQUN6QixNQUFNLHdCQUF3QixNQUFNLE1BQU07V0FDM0RNLFNBQVNtQyxHQUFHLENBQUVDLENBQUFBLElBQUtsQixvREFBWUEsQ0FBQ2tCLEdBQUdoQjtLQUN6QztJQUVMLElBQUksSUFBSW5CLElBQUksR0FBR0EsSUFBSWlDLFFBQVFsQyxRQUFRLENBQUNFLE1BQU0sR0FBQyxHQUFHLEVBQUVELEVBQUc7UUFDL0MsTUFBTW9DLEtBQUtILFFBQVFsQyxRQUFRLENBQUNDLEVBQUUsQ0FBQ0QsUUFBUTtRQUN2Q2tDLFFBQVFsQyxRQUFRLENBQUNDLEVBQUUsQ0FBQ3FDLE1BQU0sQ0FBQ2pDLEdBQUcsR0FBR2dDLEVBQUUsQ0FBQ0EsR0FBR25DLE1BQU0sR0FBQyxFQUFFLENBQUNvQyxNQUFNLENBQUNqQyxHQUFHO0lBQy9EO0lBRUEsT0FBTzZCO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRW9DO0FBR3JCLFNBQVM5QztJQUVwQixJQUFJRyxTQUFTO1FBQUMsR0FBRyxJQUFJLENBQUNhLE1BQU0sQ0FBRUUsS0FBSztJQUFBO0lBRW5DLElBQUloQixLQUFLSyxrREFBVUEsQ0FBQyxJQUFJLENBQUNLLFFBQVEsQ0FBQyxFQUFFLEVBQUVUO0lBQ3RDRCxNQUFNO0lBQ05DLE9BQU9FLEdBQUcsSUFBSTtJQUVkLElBQUksSUFBSVEsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ0QsUUFBUSxDQUFDRSxNQUFNLEVBQUUsRUFBRUQsRUFBRztRQUUxQyxJQUFJQSxNQUFNLEdBQUc7WUFDVFgsTUFBTTtZQUNOQyxPQUFPRSxHQUFHLElBQUk7UUFDbEI7UUFFQUgsTUFBTUssa0RBQVVBLENBQUMsSUFBSSxDQUFDSyxRQUFRLENBQUNDLEVBQUUsRUFBRVY7SUFDdkM7SUFFQUQsTUFBTTtJQUVOLElBQUksQ0FBQ2MsTUFBTSxDQUFFQyxHQUFHLEdBQUc7UUFDZmIsTUFBTUQsT0FBT0MsSUFBSTtRQUNqQkMsS0FBTUYsT0FBT0UsR0FBRyxHQUFHO0lBQ3ZCO0lBRUEsT0FBT0g7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QitDO0FBQ0w7QUFFM0IsU0FBU3VCLFFBQVFuQixJQUFTLEVBQUUwQixPQUFnQjtJQUV2RCxJQUFJLENBQUcsV0FBVTFCLElBQUcsR0FDaEI7SUFFSix3Q0FBd0M7SUFDeEMsZUFBZTtJQUNmLE9BQU8sSUFBSXlCLG9EQUFPQSxDQUFDekIsTUFBTSxXQUFXLE1BQU0sTUFBTTtRQUM1Q3dCLG9EQUFZQSxDQUFDeEIsS0FBSzZDLElBQUksRUFBRW5CO1dBQ3JCMUIsS0FBSzhDLElBQUksQ0FBQ0wsR0FBRyxDQUFFLENBQUNNLElBQVV2QixvREFBWUEsQ0FBQ3VCLEdBQUdyQjtLQUNoRDtBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RtRDtBQUNKO0FBQ0U7QUFDSjtBQUNZO0FBQ0o7QUFDRztBQUNKO0FBQ0k7QUFDSjtBQUNLO0FBQ0o7QUFDSTtBQUNKO0FBQ007QUFDSjtBQUNHO0FBQ0o7QUFDSTtBQUNKO0FBQ0Q7QUFDSjtBQUNpQjtBQUNKO0FBQ1I7QUFDSjtBQUdsRCxNQUFNZ0QsVUFBVTtJQUNmLFVBQVU7UUFDVEMsYUFBYTNCLDZEQUFhQTtRQUNyQjRCLFFBQWEzQix5REFBUUE7SUFDM0I7SUFDQSxRQUFRO1FBQ1AwQixhQUFhekIsMkRBQWFBO1FBQ3JCMEIsUUFBYXpCLHVEQUFRQTtJQUMzQjtJQUNBLGdCQUFnQjtRQUNmd0IsYUFBYXZCLGdFQUFhQTtRQUNyQndCLFFBQWF2Qiw0REFBUUE7SUFDM0I7SUFDQSxlQUFlO1FBQ2RzQixhQUFhckIsZ0VBQWFBO1FBQ3JCc0IsUUFBYXJCLDREQUFRQTtJQUMzQjtJQUNBLGVBQWU7UUFDZG9CLGFBQWFuQixnRUFBYUE7UUFDckJvQixRQUFhbkIsNERBQVFBO0lBQzNCO0lBQ0EsZ0JBQWdCO1FBQ2ZrQixhQUFhakIsb0VBQWFBO1FBQ3JCa0IsUUFBYWpCLGdFQUFRQTtJQUMzQjtJQUNBLGdCQUFnQjtRQUNmZ0IsYUFBYWYsb0VBQWFBO1FBQ3JCZ0IsUUFBYWYsZ0VBQVFBO0lBQzNCO0lBQ0Esa0JBQWtCO1FBQ2pCYyxhQUFhYixzRUFBYUE7UUFDckJjLFFBQWFiLGtFQUFRQTtJQUMzQjtJQUNBLGlCQUFpQjtRQUNoQlksYUFBYVgscUVBQWFBO1FBQ3JCWSxRQUFhWCxpRUFBUUE7SUFDM0I7SUFDQSxpQkFBaUI7UUFDaEJVLGFBQWFULHFFQUFhQTtRQUNyQlUsUUFBYVQsaUVBQVFBO0lBQzNCO0lBQ0EsV0FBVztRQUNWUSxhQUFhUCwrREFBY0E7UUFDdEJRLFFBQWFQLDJEQUFTQTtJQUM1QjtJQUNBLHdCQUF3QjtRQUN2Qk0sYUFBYUwsNEVBQWNBO1FBQ3RCTSxRQUFhTCx3RUFBU0E7SUFDNUI7SUFDQSxZQUFZO1FBQ1hJLGFBQWFILGdFQUFjQTtRQUN0QkksUUFBYUgsNERBQVNBO0lBQzVCO0FBQ0Q7QUFFQSxpRUFBZUMsT0FBT0EsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDakZSLFNBQVNoRjtJQUNwQixPQUFPLENBQUMsRUFBRSxJQUFJLENBQUNtRixLQUFLLENBQUMsQ0FBQztBQUMxQjs7Ozs7Ozs7Ozs7Ozs7OztBQ0gwQztBQUUzQixTQUFTMUQsUUFBUW5CLElBQVMsRUFBRW9CLFFBQWlCO0lBRXhELElBQUksQ0FBRyxRQUFPcEIsS0FBSzZFLEtBQUssS0FBSyxRQUFPLEtBQ3pCLENBQUUsZ0JBQWU3RSxLQUFLNkUsS0FBSyxLQUMzQjdFLEtBQUs2RSxLQUFLLENBQUNDLFNBQVMsQ0FBQ0MsWUFBWSxLQUFLLFlBQzdDO0lBRUosT0FBTyxJQUFJdEQsb0RBQU9BLENBQUN6QixNQUFNLGlCQUFpQixRQUFRO0FBQ3REOzs7Ozs7Ozs7Ozs7Ozs7QUNUZSxTQUFTTjtJQUVwQixPQUFPLENBQUMsRUFBRSxJQUFJLENBQUNtRixLQUFLLENBQUMsQ0FBQztBQUMxQjs7Ozs7Ozs7Ozs7Ozs7OztBQ0owQztBQUUzQixTQUFTMUQsUUFBUW5CLElBQVMsRUFBRW9CLFFBQWlCO0lBRXhELElBQUksT0FBT3BCLEtBQUs2RSxLQUFLLEtBQUssV0FDdEI7SUFFSixPQUFPLElBQUlwRCxvREFBT0EsQ0FBQ3pCLE1BQU0saUJBQWlCLFFBQVFBLEtBQUs2RSxLQUFLO0FBQ2hFOzs7Ozs7Ozs7Ozs7Ozs7QUNQZSxTQUFTbkY7SUFDcEIsT0FBTyxJQUFJLENBQUNtRixLQUFLO0FBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7O0FDSDBDO0FBRTNCLFNBQVMxRCxRQUFRbkIsSUFBUyxFQUFFb0IsUUFBaUI7SUFFeEQsSUFBSSxDQUFHcEIsQ0FBQUEsS0FBSzZFLEtBQUssWUFBWUcsTUFBSyxLQUFNaEYsS0FBSzZFLEtBQUssQ0FBQ0MsU0FBUyxFQUFFQyxpQkFBaUIsU0FDM0U7SUFFSixPQUFPLElBQUl0RCxvREFBT0EsQ0FBQ3pCLE1BQU0sa0JBQWtCLFNBQVNBLEtBQUs2RSxLQUFLLENBQUNBLEtBQUs7QUFDeEU7Ozs7Ozs7Ozs7Ozs7OztBQ1BlLFNBQVNuRjtJQUNwQixPQUFPLENBQUMsRUFBRSxJQUFJLENBQUNtRixLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzNCOzs7Ozs7Ozs7Ozs7Ozs7O0FDSDBDO0FBRTNCLFNBQVMxRCxRQUFRbkIsSUFBUyxFQUFFb0IsUUFBaUI7SUFFeEQsSUFBSSxPQUFPcEIsS0FBSzZFLEtBQUssS0FBSyxVQUN0QjtJQUVKLE9BQU8sSUFBSXBELG9EQUFPQSxDQUFDekIsTUFBTSxnQkFBZ0IsT0FBT0EsS0FBSzZFLEtBQUs7QUFDOUQ7Ozs7Ozs7Ozs7Ozs7OztBQ1BlLFNBQVNuRjtJQUNwQixPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ21GLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIMEM7QUFFM0IsU0FBUzFELFFBQVFuQixJQUFTLEVBQUVvQixRQUFpQjtJQUV4RCxJQUFJLE9BQU9wQixLQUFLNkUsS0FBSyxLQUFLLFVBQ3RCO0lBRUosT0FBTyxJQUFJcEQsb0RBQU9BLENBQUN6QixNQUFNLGdCQUFnQixPQUFPQSxLQUFLNkUsS0FBSztBQUM5RDs7Ozs7Ozs7Ozs7Ozs7OztBQ1RvQztBQUdyQixTQUFTbkY7SUFFcEIsSUFBSUcsU0FBUztRQUFDLEdBQUcsSUFBSSxDQUFDYSxNQUFNLENBQUVFLEtBQUs7SUFBQTtJQUNuQyxNQUFNcUUsWUFBWXBGLE9BQU9FLEdBQUc7SUFFNUIsOEJBQThCO0lBQzlCLHVCQUF1QjtJQUN2QixJQUFJSCxLQUFLO0lBRVRDLE9BQU9FLEdBQUcsR0FBR2tGLFlBQVlyRixHQUFHWSxNQUFNO0lBQ2xDWixNQUFNSyxrREFBVUEsQ0FBQyxJQUFJLENBQUNLLFFBQVEsQ0FBQyxFQUFFLEVBQUVUO0lBRW5DRCxNQUFNO0lBRU5DLE9BQU9FLEdBQUcsR0FBR2tGLFlBQVlyRixHQUFHWSxNQUFNO0lBQ2xDWixNQUFNSyxrREFBVUEsQ0FBQyxJQUFJLENBQUNLLFFBQVEsQ0FBQyxFQUFFLEVBQUVUO0lBRW5DRCxNQUFNO0lBRU47Ozs7Ozs7Ozs7O2NBV1UsR0FFVjs7Ozs7OztjQU9VLEdBRVYsT0FBT0E7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QytDO0FBQ0w7QUFFM0IsU0FBU3VCLFFBQVFuQixJQUFTLEVBQUUwQixPQUFnQjtJQUV2RCxJQUFJLENBQUcsU0FBUTFCLElBQUcsR0FDZDtJQUVKLElBQUlrRixLQUFLbEYsS0FBS2tGLEVBQUUsQ0FBQ0MsV0FBVyxDQUFDQyxLQUFLO0lBQ2xDLElBQUlGLE9BQU8sT0FDUEEsS0FBSztJQUVULElBQUlBLE9BQU8sTUFDUDtJQUVKLFNBQVM7SUFDVCxPQUFPLElBQUl6RCxvREFBT0EsQ0FBQ3pCLE1BQU0sZUFBZSxNQUFNa0YsSUFDMUM7UUFDSTFELG9EQUFZQSxDQUFDeEIsS0FBS3FGLElBQUksRUFBRzNEO1FBQ3pCRixvREFBWUEsQ0FBQ3hCLEtBQUtzRixLQUFLLEVBQUU1RDtLQUM1QjtBQUVUOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJvQztBQUdyQixTQUFTaEM7SUFFcEIsSUFBSUcsU0FBUztRQUFDLEdBQUcsSUFBSSxDQUFDYSxNQUFNLENBQUVFLEtBQUs7SUFBQTtJQUVuQyxJQUFJaEIsS0FBSztJQUNULElBQUksSUFBSSxDQUFDeUIsSUFBSSxDQUFDa0UsUUFBUSxDQUFDLFdBQVk7UUFDL0IzRixNQUFNO1FBQ05DLE9BQU9FLEdBQUcsSUFBSTtJQUNsQjtJQUVBSCxNQUFNSyxrREFBVUEsQ0FBQyxJQUFJLENBQUNLLFFBQVEsQ0FBQyxFQUFFLEVBQUVUO0lBQ25DRCxNQUFNO0lBQ05DLE9BQU9FLEdBQUcsSUFBSTtJQUNkSCxNQUFNSyxrREFBVUEsQ0FBQyxJQUFJLENBQUNLLFFBQVEsQ0FBQyxFQUFFLEVBQUVUO0lBRW5DLElBQUksQ0FBQ2EsTUFBTSxDQUFFQyxHQUFHLEdBQUc7UUFBQyxHQUFHZCxNQUFNO0lBQUE7SUFFN0IsT0FBT0Q7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQitDO0FBQ0w7QUFFM0IsU0FBU3VCLFFBQVFuQixJQUFTLEVBQUUwQixPQUFnQjtJQUV2RCxJQUFJLENBQUcsY0FBYTFCLElBQUcsS0FBTSxDQUFHLGFBQVlBLElBQUcsR0FDM0M7SUFFSixJQUFJd0YsU0FBU3hGLEtBQUt3RixNQUFNO0lBQ3hCLElBQUksYUFBYXhGLE1BQ2J3RixTQUFTeEYsS0FBS3lGLE9BQU8sQ0FBQyxFQUFFO0lBRTVCLE1BQU1KLE9BQVE3RCxvREFBWUEsQ0FBQ2dFLFFBQVE5RDtJQUNuQyxNQUFNNEQsUUFBUTlELG9EQUFZQSxDQUFDeEIsS0FBSzZFLEtBQUssRUFBT25EO0lBRTVDLElBQUlnRSxhQUEwQkosTUFBTXhELFdBQVc7SUFDL0MsSUFBSSxnQkFBZ0I5QixNQUFNO1FBQ3RCMEYsYUFBYTFGLEtBQUsyRixVQUFVLENBQUNDLEVBQUUsSUFBSTtRQUNuQyxJQUFJTixNQUFNeEQsV0FBVyxLQUFLLFFBQVF3RCxNQUFNeEQsV0FBVyxLQUFLNEQsWUFDcEQsTUFBTSxJQUFJM0QsTUFBTTtJQUN4QjtJQUVBLElBQUlWLE9BQU87SUFFWCxJQUFJZ0UsS0FBS2hFLElBQUksS0FBSyxVQUFVO1FBRXhCLDBCQUEwQjtRQUMxQixJQUFJZ0UsS0FBS1IsS0FBSyxJQUFJbkQsUUFBUW1FLGVBQWUsRUFBRTtZQUN2QyxNQUFNL0QsY0FBY0osUUFBUW1FLGVBQWUsQ0FBQ1IsS0FBS1IsS0FBSyxDQUFDO1lBQ3ZELElBQUkvQyxnQkFBZ0IsUUFBUTRELGVBQWU1RCxhQUN2QyxNQUFNLElBQUlDLE1BQU07UUFFcEIsa0JBQWtCO1FBQ3RCLE9BQU87WUFDSEwsUUFBUW1FLGVBQWUsQ0FBQ1IsS0FBS1IsS0FBSyxDQUFDLEdBQUdhO1lBQ3RDckUsUUFBUTtRQUNaO0lBQ0o7SUFFQSxPQUFPLElBQUlJLG9EQUFPQSxDQUFDekIsTUFBTXFCLE1BQU1xRSxZQUFZLE1BQ3ZDO1FBQ0lMO1FBQ0FDO0tBQ0g7QUFFVDs7Ozs7Ozs7Ozs7Ozs7OztBQzdDb0M7QUFHckIsU0FBUzVGO0lBRXBCLElBQUlHLFNBQVM7UUFBQyxHQUFHLElBQUksQ0FBQ2EsTUFBTSxDQUFFRSxLQUFLO0lBQUE7SUFFbkMsbUJBQW1CO0lBQ25CLFVBQVU7SUFFVixJQUFJaEIsS0FBS0ssa0RBQVVBLENBQUMsSUFBSSxDQUFDSyxRQUFRLENBQUMsRUFBRSxFQUFFVDtJQUN0Q0QsTUFBTTtJQUNOQyxPQUFPRSxHQUFHLElBQUk7SUFDZEgsTUFBTUssa0RBQVVBLENBQUMsSUFBSSxDQUFDSyxRQUFRLENBQUMsRUFBRSxFQUFFVDtJQUVuQyxJQUFJLENBQUNhLE1BQU0sQ0FBRUMsR0FBRyxHQUFHO1FBQUMsR0FBR2QsTUFBTTtJQUFBO0lBRTdCLE9BQU9EO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEIrQztBQUNMO0FBRTNCLFNBQVN1QixRQUFRbkIsSUFBUyxFQUFFMEIsT0FBZ0I7SUFFdkQsSUFBSSxDQUFHLFVBQVMxQixJQUFHLEtBQU1BLEtBQUs4RixHQUFHLENBQUMsRUFBRSxDQUFDWCxXQUFXLENBQUNDLEtBQUssS0FBSyxNQUN2RDtJQUVKLE1BQU1DLE9BQVE3RCxvREFBWUEsQ0FBQ3hCLEtBQUtxRixJQUFJLEVBQUUzRDtJQUN0QyxNQUFNNEQsUUFBUTlELG9EQUFZQSxDQUFDeEIsS0FBSytGLFdBQVcsQ0FBQyxFQUFFLEVBQUVyRTtJQUVoRCxJQUFHMkQsS0FBS3ZELFdBQVcsS0FBSyxRQUFRd0QsTUFBTXhELFdBQVcsS0FBSyxNQUFNO1FBQ3hELGlDQUFpQztRQUNqQyxNQUFNLElBQUlDLE1BQU07SUFDcEI7SUFFQSxPQUFPLElBQUlOLG9EQUFPQSxDQUFDekIsTUFBTSxnQkFBZ0IsUUFBUSxNQUM3QztRQUNJcUY7UUFDQUM7S0FDSDtBQUVUOzs7Ozs7Ozs7Ozs7Ozs7QUNwQmUsU0FBUzVGO0lBQ3BCLE9BQU87QUFDWDs7Ozs7Ozs7Ozs7Ozs7OztBQ0gwQztBQUUzQixTQUFTeUIsUUFBUW5CLElBQVMsRUFBRW9CLFFBQWlCO0lBRXhELElBQUk0RCxPQUFPZ0IsSUFBSSxDQUFDaEcsTUFBTVEsTUFBTSxLQUFLLEdBQzdCO0lBRUosT0FBTyxJQUFJaUIsb0RBQU9BLENBQUN6QixNQUFNLFFBQVE7QUFDckM7Ozs7Ozs7Ozs7Ozs7OztBQ1BlLFNBQVNOO0lBQ3BCLE9BQU8sSUFBSSxDQUFDbUYsS0FBSyxFQUFFLE1BQU07QUFDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIMEM7QUFFM0IsU0FBUzFELFFBQVFuQixJQUFTLEVBQUUwQixPQUFnQjtJQUV2RCxJQUFJLENBQUcsU0FBUTFCLElBQUcsR0FDZDtJQUVKLElBQUk4QixjQUFjO0lBQ2xCLElBQUk5QixLQUFLNEYsRUFBRSxJQUFJbEUsUUFBUW1FLGVBQWUsRUFDbEMvRCxjQUFjSixRQUFRbUUsZUFBZSxDQUFDN0YsS0FBSzRGLEVBQUUsQ0FBQztJQUVuRCxPQUFPLElBQUluRSxvREFBT0EsQ0FBQ3pCLE1BQU0sVUFBVThCLGFBQWE5QixLQUFLNEYsRUFBRTtBQUMxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQSxtQ0FBbUM7QUFLYTtBQUV6QyxTQUFTTSxPQUFPQyxJQUFZO0lBRS9CLE1BQU1DLFNBQVMsSUFBSUMsR0FBR0MsTUFBTSxDQUFDSCxNQUFNLFlBQVk7SUFDbEQsTUFBTUksT0FBT0YsR0FBR0csUUFBUSxDQUFDQyxVQUFVLENBQUNMO0lBQ2pDLDJCQUEyQjtJQUU5QixPQUFPTSxZQUFZSDtBQUNwQjtBQUVPLFNBQVMvRSxhQUFhbUYsWUFBaUIsRUFBRWpGLE9BQWdCO0lBRTVELGlDQUFpQztJQUVqQyxJQUFJLElBQUlrRixlQUFlWCwyREFBWUEsQ0FBRTtRQUNqQyxNQUFNWSxTQUFTWiwyREFBWSxDQUFDVyxZQUF5QztRQUNyRSxJQUFJRSxTQUFTRCxPQUFPbEMsV0FBVyxDQUFDZ0MsY0FBY2pGO1FBQzlDLElBQUdvRixXQUFXQyxXQUFXO1lBQ3JCRCxPQUFPNUYsSUFBSSxHQUFHMkYsT0FBT2pDLE1BQU07WUFDM0IsT0FBT2tDO1FBQ1g7SUFDSjtJQUVBRSxRQUFRQyxLQUFLLENBQUNOO0lBQ2QsTUFBTSxJQUFJNUUsTUFBTTtBQUNwQjtBQUVPLFNBQVNSLGFBQWF2QixJQUFTLEVBQUUwQixPQUFnQjtJQUNwRCxPQUFPMUIsS0FBS0ssSUFBSSxDQUFDb0MsR0FBRyxDQUFFLENBQUN5RSxJQUFVQyxhQUFhRCxHQUFHeEY7QUFDckQ7QUFFTyxTQUFTeUYsYUFBYXJILElBQVMsRUFBRTRCLE9BQWdCO0lBRXBELHdCQUF3QjtJQUV4QixJQUFJMUIsT0FBT0Y7SUFDWCxJQUFJLFdBQVdBLFFBQVEsQ0FBRyxjQUFhQSxJQUFHLEtBQU0sQ0FBRyxhQUFZQSxJQUFHLEdBQzlERSxPQUFPRixLQUFLK0UsS0FBSztJQUVyQixPQUFPckQsYUFBY3hCLE1BQU0wQjtBQUMvQjtBQU1PLFNBQVNnRixZQUFZL0csR0FBUTtJQUVoQyxNQUFNK0IsVUFBVTtRQUNabUUsaUJBQWlCYixPQUFPb0MsTUFBTSxDQUFDO0lBQ25DO0lBRUEsTUFBTU4sU0FBUyxJQUFJTyxNQUFNMUgsSUFBSVUsSUFBSSxDQUFDRyxNQUFNO0lBQ3hDLElBQUksSUFBSUQsSUFBSSxHQUFHQSxJQUFJWixJQUFJVSxJQUFJLENBQUNHLE1BQU0sRUFBRSxFQUFFRCxFQUFHO1FBRXJDLHVCQUF1QjtRQUV2QnVHLE1BQU0sQ0FBQ3ZHLEVBQUUsR0FBRzRHLGFBQWF4SCxJQUFJVSxJQUFJLENBQUNFLEVBQUUsRUFBRW1CO0lBQzFDO0lBRUEsMEJBQTBCO0lBRTFCLE9BQU9vRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUMzRE8sTUFBTXJGO0lBRVpKLEtBQWlCO0lBQ2pCd0QsTUFBYztJQUNkdkUsV0FBc0IsRUFBRSxDQUFDO0lBQ3pCd0IsY0FBMkIsS0FBSztJQUU3QmMsT0FBa0I7SUFDbEJsQyxPQUFtQjtJQUV0QlEsS0FBaUM7SUFFakNpRSxZQUFZd0IsWUFBaUIsRUFBRXRGLElBQVksRUFBRVMsV0FBd0IsRUFBRXdGLFNBQWMsSUFBSSxFQUFFaEgsV0FBc0IsRUFBRSxDQUFFO1FBRXBILElBQUksQ0FBQ2UsSUFBSSxHQUFLQTtRQUNkLElBQUksQ0FBQ1MsV0FBVyxHQUFHQTtRQUNuQixJQUFJLENBQUMrQyxLQUFLLEdBQUl5QztRQUNkLElBQUksQ0FBQ2hILFFBQVEsR0FBR0E7UUFDaEIsSUFBSSxDQUFDc0MsTUFBTSxHQUFHO1lBQ2JoQyxPQUFPO2dCQUNOZCxNQUFNNkcsYUFBYXZFLE1BQU07Z0JBQ3pCckMsS0FBSzRHLGFBQWF0RSxVQUFVO1lBQzdCO1lBQ0ExQixLQUFLO2dCQUNKYixNQUFNNkcsYUFBYXJFLFVBQVU7Z0JBQzdCdkMsS0FBSzRHLGFBQWFwRSxjQUFjO1lBQ2pDO1FBQ0Q7SUFDRDtBQUNEOzs7Ozs7O1NDdkNBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mY3RjYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1ROb2RlW10pIHtcblxuXHRsZXQganMgPSBcIlwiO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMSwgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdCkge1xuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuXHRyZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgb2Zmc2V0ID0gMCkge1xuICAgIFxuICAgIGxldCBqcyA9IFwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuOy8vYm9keTogQVNUTm9kZVtdO1xuXG4gICAgZm9yKGxldCBpID0gb2Zmc2V0OyBpIDwgYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keVtpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIn1cIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9lbmQobm9kZTogQVNUTm9kZSwganM6IHN0cmluZykge1xuXG4gICAgaWYoIG5vZGUuanNjb2RlIS5lbmQgIT09IG51bGwpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHN0YXJ0ID0gbm9kZS5qc2NvZGUhLnN0YXJ0O1xuXG4gICAgbGV0IGxpbmVfY291bnQgICAgPSAwO1xuICAgIGxldCBsYXN0X2xpbmVfaWR4ID0gMDtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBqcy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYoanNbaV0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICArK2xpbmVfY291bnQ7XG4gICAgICAgICAgICBsYXN0X2xpbmVfaWR4ID0gaTtcbiAgICAgICAgfVxuXG4gICAgaWYobGluZV9jb3VudCA9PT0gMCkge1xuICAgICAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICAgICAgbGluZTogc3RhcnQubGluZSxcbiAgICAgICAgICAgIGNvbCA6IHN0YXJ0LmNvbCArIGpzLmxlbmd0aFxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub2RlLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBzdGFydC5saW5lICsgbGluZV9jb3VudCxcbiAgICAgICAgY29sIDoganMubGVuZ3RoIC0gbGFzdF9saW5lX2lkeFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGNvbnN0IGluZGVudCA9IGluZGVudF9sZXZlbCo0ICsgbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKCk7XG5cbiAgICB1cGRhdGVfZW5kKG5vZGUsIGpzKTtcblxuICAgIGN1cnNvci5saW5lID0gbm9kZS5qc2NvZGUhLmVuZC5saW5lO1xuICAgIGN1cnNvci5jb2wgID0gbm9kZS5qc2NvZGUhLmVuZC5jb2w7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgYm9keTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSBgJHtrZXl3b3JkfWA7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7XG4gICAgICAgIGpzICs9IFwiKFwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgICAgICArK29mZnNldDtcbiAgICAgICAganMgKz0gXCIpXCI7XG4gICAgfVxuICAgIGlmKGtleXdvcmQgIT09IFwiaWZcIikgeyAgLy8gaDRja1xuICAgICAgICAtLXRoaXMuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgfVxuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCBvZmZzZXQpO1xuICAgIGlmKGtleXdvcmQgIT09IFwiaWZcIikgeyAgLy8gaDRja1xuICAgICAgICArK3RoaXMuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgfVxuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIFwiaWZibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUuaWZibG9jayA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgICAgICAuLi5jb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZCA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgLi4uY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGlmKCAhIChcInRlc3RcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIG5vZGUuaWZibG9jayA9IFwiaWZcIjtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICBub2RlXG4gICAgXTtcblxuICAgIGxldCBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSAmJiBcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSB7XG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgbGV0IGJlZyA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGxldCBlbmQgPSBjdXIub3JlbHNlW2N1ci5vcmVsc2UubGVuZ3RoLTFdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSAnKCc7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSkge1xuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBcIilcIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3IuY29sICsgMSxcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcImZ1bmNcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmY3RjYWxsXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL29wZXJhdG9ycy89PS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL29wZXJhdG9ycy8rL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL29wZXJhdG9ycy8rL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF85IGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzkgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9mY3RjYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9mY3RjYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5cblxuY29uc3QgTU9EVUxFUyA9IHtcblx0XCJzeW1ib2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8wLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18wXG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJvcGVyYXRvcnMuPT1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwib3BlcmF0b3JzLitcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwiZmN0Y2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcbiIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVcIiwgbnVsbCk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgXCJib29sXCIsIG5vZGUudmFsdWUpO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfW5gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCBcImludFwiLCBub2RlLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgXCIke3RoaXMudmFsdWV9XCJgO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuc3RyXCIsIFwic3RyXCIsIG5vZGUudmFsdWUpO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICAvL1RPRE86IGNoZWNrIGNoaWxkcmVuIHR5cGUuLi5cbiAgICAvL1RPRE86IHByaW9yaXR5IGNoZWNrc1xuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIitcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCJcIjtcblxuICAgIC8qXG4gICAgbGV0IGpzID0gXCJvcChcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIsICcrJywgXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICAvKmxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICBpZiggb3AgPT09IFwiRXFcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLitcIiwgbnVsbCwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApIHtcbiAgICAgICAganMgKz0gXCJ2YXIgXCI7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gNDtcbiAgICB9XG5cbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCI9XCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwidGFyZ2V0c1wiIGluIG5vZGUpICYmICEgKFwidGFyZ2V0XCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBsZXQgdGFyZ2V0ID0gbm9kZS50YXJnZXQ7XG4gICAgaWYoIFwidGFyZ2V0c1wiIGluIG5vZGUpXG4gICAgICAgIHRhcmdldCA9IG5vZGUudGFyZ2V0c1swXTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKHRhcmdldCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsICAgICAgY29udGV4dCk7XG5cbiAgICBsZXQgcmlnaHRfdHlwZTogc3RyaW5nfG51bGwgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBpZiggXCJhbm5vdGF0aW9uXCIgaW4gbm9kZSkge1xuICAgICAgICByaWdodF90eXBlID0gbm9kZS5hbm5vdGF0aW9uLmlkID8/IFwiTm9uZVwiO1xuICAgICAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHQucmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcblxuICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcblxuICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj09XCI7XG4gICAgY3Vyc29yLmNvbCArPSAyO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BzXCIgaW4gbm9kZSkgfHwgbm9kZS5vcHNbMF0uY29uc3RydWN0b3IuJG5hbWUgIT09IFwiRXFcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUuY29tcGFyYXRvcnNbMF0sIGNvbnRleHQpO1xuXG4gICAgaWYobGVmdC5yZXN1bHRfdHlwZSA9PT0gbnVsbCB8fCByaWdodC5yZXN1bHRfdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAvL1RPRE86IG9iamVjdCByZXN1bHRfdHlwZSB0b28uLi5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy49PVwiLCBcImJvb2xcIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBPYmplY3Qua2V5cyhub2RlKS5sZW5ndGggIT09IDQpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInBhc3NcIiwgbnVsbCk7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTsgLy9UT0RPXG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJpZFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBpZiggbm9kZS5pZCBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLmlkXTtcblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCBub2RlLmlkKTtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgXCJmaWxlbmFtZVwiLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIGNvbnZlcnRfYXN0KF9hc3QpOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiTlwiLCBicnl0aG9uX25vZGUpO1xuXG4gICAgZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIG5vZGVcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIC8vVE9ETzogbGluZSBBU1ROb2RlID8/P1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCB0eXBlIENvbnRleHQgPSB7XG4gICAgbG9jYWxfdmFyaWFibGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmd8bnVsbD5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXN0KGFzdDogYW55KTogQVNUTm9kZVtdIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgIGxvY2FsX3ZhcmlhYmxlczogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheShhc3QuYm9keS5sZW5ndGgpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3QuYm9keS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzXG5cbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvL1RPRE86IGRldGVjdCBjb21tZW50cy4uLlxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7Il0sIm5hbWVzIjpbImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsImJvZHkyanMiLCJvZmZzZXQiLCJib2R5IiwiY2hpbGRyZW4iLCJpIiwibGVuZ3RoIiwidXBkYXRlX2VuZCIsImpzY29kZSIsImVuZCIsInN0YXJ0IiwibGluZV9jb3VudCIsImxhc3RfbGluZV9pZHgiLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsInRvSlMiLCJjb252ZXJ0IiwiX2NvbnRleHQiLCJ0eXBlIiwia2V5d29yZCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsIkFTVE5vZGUiLCJjb250ZXh0IiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0IiwicmVzdWx0X3R5cGUiLCJFcnJvciIsImN1ciIsIm9yZWxzZSIsInB1c2giLCJiZWciLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiYXN0bm9kZSIsIm1hcCIsIm4iLCJjYyIsInB5Y29kZSIsImZ1bmMiLCJhcmdzIiwiZSIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsInZhbHVlIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiT2JqZWN0Iiwic3RhcnRfY29sIiwib3AiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwibGVmdCIsInJpZ2h0IiwiZW5kc1dpdGgiLCJ0YXJnZXQiLCJ0YXJnZXRzIiwicmlnaHRfdHlwZSIsImFubm90YXRpb24iLCJpZCIsImxvY2FsX3ZhcmlhYmxlcyIsIm9wcyIsImNvbXBhcmF0b3JzIiwia2V5cyIsIkNPUkVfTU9EVUxFUyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImJyeXRob25fbm9kZSIsIm1vZHVsZV9uYW1lIiwibW9kdWxlIiwicmVzdWx0IiwidW5kZWZpbmVkIiwiY29uc29sZSIsImVycm9yIiwibSIsImNvbnZlcnRfbGluZSIsImNyZWF0ZSIsIkFycmF5IiwiX3ZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==