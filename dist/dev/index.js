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
//TODO: move2core_modules ?
function body2js(node, cursor, idx = 0) {
    const start = {
        ...cursor
    };
    let js = "{";
    const body = node.children[idx]; //body: ASTNode[];
    // h4ck due to } else/elif {
    if (node.type === "controlflows.else" || node.type === "controlflows.elif") --node.jscode.start.col;
    for(let i = 0; i < body.children.length; ++i){
        js += newline(node, cursor, 1);
        js += astnode2js(body.children[i], cursor);
    }
    // h4ck due to } else/elif {
    if (node.type === "controlflows.else" || node.type === "controlflows.elif") ++node.jscode.start.col;
    js += newline(node, cursor);
    js += "}";
    cursor.col += 1;
    body.jscode = {
        start: start,
        end: {
            ...cursor
        }
    };
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
        ++cursor.col;
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, offset);
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
                (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
            ]);
        }
        const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context);
        if (cond.result_type !== "bool") throw new Error(`Type ${cond.result_type} not yet supported as if condition`);
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
            cond,
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ]);
    }
    node.sbrython_type = "If";
    node.ifblock = "if";
    const children = [
        node
    ];
    let cur = node;
    while("orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]){
        cur = cur.orelse[0];
        cur.sbrython_type = "If";
        cur.ifblock = "elif";
        children.push(cur);
    }
    if ("orelse" in cur && cur.orelse.length !== 0) {
        let beg = cur.orelse[0];
        let end = cur.orelse[cur.orelse.length - 1];
        children.push({
            sbrython_type: "If",
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
convert.brython_name = "If";


/***/ }),

/***/ "./src/core_modules/controlflows/while/ast2js.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/controlflows/while/ast2js.ts ***!
  \*******************************************************/
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
    /*
    if( this.type === "controlflows.ifblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)
            js += astnode2js(this.children[i], cursor);
        return js;
    }*/ let js = `while(`;
    cursor.col += js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += ')';
    ++cursor.col;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
    this.jscode.end = {
        ...cursor
    };
    return js;
}


/***/ }),

/***/ "./src/core_modules/controlflows/while/astconvert.ts":
/*!***********************************************************!*\
  !*** ./src/core_modules/controlflows/while/astconvert.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.while", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ]);
}
convert.brython_name = "While";


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
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "fctcall", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.func, context),
        ...node.args.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e, context))
    ]);
}
convert.brython_name = "Call";


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
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");




























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
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__["default"]
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
convert.brython_name = "Constant";


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
convert.brython_name = "Constant";


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
convert.brython_name = "Constant";


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
convert.brython_name = "Constant";


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
convert.brython_name = "Constant";


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
convert.brython_name = [
    "Assign",
    "AnnAssign"
];


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
convert.brython_name = "Compare";


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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "pass", null);
}
convert.brython_name = "Pass";


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
    let result_type = null;
    if (node.id in context.local_variables) result_type = context.local_variables[node.id];
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "symbol", result_type, node.id);
}
convert.brython_name = "Name";


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
/* harmony import */ var _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
// Brython must be imported before.


const modules = {};
for(let module_name in _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__["default"]){
    const module = _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__["default"][module_name];
    let names = [
        "null"
    ];
    if ("brython_name" in module.AST_CONVERT) {
        if (Array.isArray(module.AST_CONVERT.brython_name)) {
            names = module.AST_CONVERT.brython_name;
        } else {
            names = [
                module.AST_CONVERT.brython_name
            ];
        }
    }
    for (let name of names)(modules[name] ??= []).push(module);
}
function py2ast(code) {
    const parser = new $B.Parser(code, "filename", 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    return convert_ast(_ast);
}
function convert_node(brython_node, context) {
    let name = brython_node.sbrython_type ?? brython_node.constructor.$name;
    if (!(name in modules)) {
        console.log(brython_node);
        console.warn("Module not registered", name);
        name = "null";
    }
    for (let module of modules[name]){
        const result = module.AST_CONVERT(brython_node, context);
        if (result !== undefined) {
            result.toJS = module.AST2JS;
            return result;
        }
    }
    /*
    for(let module_name in CORE_MODULES) {
        const module = CORE_MODULES[module_name as keyof typeof CORE_MODULES];
        let result = module.AST_CONVERT(brython_node, context);
        if(result !== undefined) {
            result.toJS = module.AST2JS;
            return result;
        }
    }
    */ console.error(brython_node);
    throw new Error("Unsupported node");
}
//TODO: move2core_modules ?
function convert_body(node, context) {
    const lines = node.body.map((m)=>convert_line(m, context));
    const last = node.body[node.body.length - 1];
    const virt_node = {
        lineno: node.body[0].lineno,
        col_offset: node.body[0].col_offset,
        end_lineno: last.end_lineno,
        end_col_offset: last.end_col_offset
    };
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(virt_node, "body", null, null, lines);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cblx0cmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCkge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIntcIjtcbiAgICBjb25zdCBib2R5ID0gbm9kZS5jaGlsZHJlbltpZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuXG4gICAgLy8gaDRjayBkdWUgdG8gfSBlbHNlL2VsaWYge1xuICAgIGlmKG5vZGUudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiIHx8IG5vZGUudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICAtLW5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIC8vIGg0Y2sgZHVlIHRvIH0gZWxzZS9lbGlmIHtcbiAgICBpZihub2RlLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIiB8fCBub2RlLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAgKytub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIGpzICs9IFwifVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZnVuY3Rpb24gdXBkYXRlX2VuZChub2RlOiBBU1ROb2RlLCBqczogc3RyaW5nKSB7XG5cbiAgICBpZiggbm9kZS5qc2NvZGUhLmVuZCAhPT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBub2RlLmpzY29kZSEuc3RhcnQ7XG5cbiAgICBsZXQgbGluZV9jb3VudCAgICA9IDA7XG4gICAgbGV0IGxhc3RfbGluZV9pZHggPSAwO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGpzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZihqc1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICsrbGluZV9jb3VudDtcbiAgICAgICAgICAgIGxhc3RfbGluZV9pZHggPSBpO1xuICAgICAgICB9XG5cbiAgICBpZihsaW5lX2NvdW50ID09PSAwKSB7XG4gICAgICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICAgICAgY29sIDogc3RhcnQuY29sICsganMubGVuZ3RoXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vZGUuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUgKyBsaW5lX2NvdW50LFxuICAgICAgICBjb2wgOiBqcy5sZW5ndGggLSBsYXN0X2xpbmVfaWR4XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoKTtcblxuICAgIHVwZGF0ZV9lbmQobm9kZSwganMpO1xuXG4gICAgY3Vyc29yLmxpbmUgPSBub2RlLmpzY29kZSEuZW5kLmxpbmU7XG4gICAgY3Vyc29yLmNvbCAgPSBub2RlLmpzY29kZSEuZW5kLmNvbDtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzLCBib2R5MmpzLCBuZXdsaW5lIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vaWZcbiAgICBsZXQga2V5d29yZCA9IFwiaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2UgaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2VcIjtcblxuICAgIGxldCBqcyA9IGAke2tleXdvcmR9YDtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBpZigga2V5d29yZCAhPT0gXCJlbHNlXCIpIHtcbiAgICAgICAganMgKz0gXCIoXCI7XG4gICAgICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgICsrb2Zmc2V0O1xuICAgICAgICBqcyArPSBcIilcIjtcbiAgICAgICAgKytjdXJzb3IuY29sO1xuICAgIH1cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgbGV0IGJlZyA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGxldCBlbmQgPSBjdXIub3JlbHNlW2N1ci5vcmVsc2UubGVuZ3RoLTFdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgYm9keTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG4vKlxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH0qL1xuXG4gICAgbGV0IGpzID0gYHdoaWxlKGA7XG4gICAgY3Vyc29yLmNvbCArPSBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGpzICs9ICcpJztcbiAgICArK2N1cnNvci5jb2w7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy53aGlsZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gJygnO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLmNvbCArIDEsXG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZmN0Y2FsbFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vZmN0Y2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vZmN0Y2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwib3BlcmF0b3JzLj09XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcIm9wZXJhdG9ycy4rXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcImZjdGNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG4iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLk5vbmVcIiwgXCJOb25lXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBcImJvb2xcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1uYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgXCJpbnRcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGBcIiR7dGhpcy52YWx1ZX1cImA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICAvL1RPRE86IGNoZWNrIGNoaWxkcmVuIHR5cGUuLi5cbiAgICAvL1RPRE86IHByaW9yaXR5IGNoZWNrc1xuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIitcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCJcIjtcblxuICAgIC8qXG4gICAgbGV0IGpzID0gXCJvcChcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIsICcrJywgXCI7XG5cbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICAvKmxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICBpZiggb3AgPT09IFwiRXFcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLitcIiwgbnVsbCwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApIHtcbiAgICAgICAganMgKz0gXCJ2YXIgXCI7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gNDtcbiAgICB9XG5cbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCI9XCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblsxXSwgY3Vyc29yKTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHRhcmdldCA9IG5vZGUudGFyZ2V0O1xuICAgIGlmKCBcInRhcmdldHNcIiBpbiBub2RlKVxuICAgICAgICB0YXJnZXQgPSBub2RlLnRhcmdldHNbMF07XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZSh0YXJnZXQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCAgICAgIGNvbnRleHQpO1xuXG4gICAgbGV0IHJpZ2h0X3R5cGU6IHN0cmluZ3xudWxsID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgaWYoIFwiYW5ub3RhdGlvblwiIGluIG5vZGUpIHtcbiAgICAgICAgcmlnaHRfdHlwZSA9IG5vZGUuYW5ub3RhdGlvbi5pZCA/PyBcIk5vbmVcIjtcbiAgICAgICAgaWYoIHJpZ2h0LnJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0LnJlc3VsdF90eXBlICE9PSByaWdodF90eXBlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBcIm9wZXJhdG9ycy49XCI7XG5cbiAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG5cbiAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV07XG4gICAgICAgICAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHRfdHlwZSAhPT0gcmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG5cbiAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV0gPSByaWdodF90eXBlO1xuICAgICAgICAgICAgdHlwZSArPSBcIihpbml0KVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCByaWdodF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICAvL1RPRE8gTm9uZSB0eXBlLi4uXG4gICAgLy9UT0RPIHN0clxuXG4gICAgbGV0IGpzID0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGpzICs9IFwiPT1cIjtcbiAgICBjdXJzb3IuY29sICs9IDI7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLmNvbXBhcmF0b3JzWzBdLCBjb250ZXh0KTtcblxuICAgIGlmKGxlZnQucmVzdWx0X3R5cGUgPT09IG51bGwgfHwgcmlnaHQucmVzdWx0X3R5cGUgPT09IG51bGwpIHtcbiAgICAgICAgLy9UT0RPOiBvYmplY3QgcmVzdWx0X3R5cGUgdG9vLi4uXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuPT1cIiwgXCJib29sXCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIjtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7IC8vVE9ET1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBpZiggbm9kZS5pZCBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLmlkXTtcblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCBub2RlLmlkKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgXCJmaWxlbmFtZVwiLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIGNvbnZlcnRfYXN0KF9hc3QpOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKVxuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWRcIiwgbmFtZSk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBmb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuICAgICAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG4gICAgICAgIGxldCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICAvL1RPRE86IGxpbmUgQVNUTm9kZSA/Pz9cblxuICAgIGxldCBub2RlID0gbGluZTtcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgdHlwZSBDb250ZXh0ID0ge1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBsb2NhbF92YXJpYWJsZXM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvL1RPRE86IGRldGVjdCBjb21tZW50cy4uLlxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7Il0sIm5hbWVzIjpbImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsImJvZHkyanMiLCJpZHgiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsInR5cGUiLCJqc2NvZGUiLCJpIiwibGVuZ3RoIiwiZW5kIiwidXBkYXRlX2VuZCIsImxpbmVfY291bnQiLCJsYXN0X2xpbmVfaWR4IiwiaW5kZW50X2xldmVsIiwiaW5kZW50IiwicGFkU3RhcnQiLCJ0b0pTIiwiY29udmVydCIsIl9jb250ZXh0Iiwia2V5d29yZCIsIm9mZnNldCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsIkFTVE5vZGUiLCJjb250ZXh0IiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0IiwicmVzdWx0X3R5cGUiLCJFcnJvciIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJwdXNoIiwiYmVnIiwibGluZW5vIiwiY29sX29mZnNldCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsImFzdG5vZGUiLCJtYXAiLCJuIiwiY2MiLCJweWNvZGUiLCJicnl0aG9uX25hbWUiLCJmdW5jIiwiYXJncyIsImUiLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsInZhbHVlIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiT2JqZWN0Iiwic3RhcnRfY29sIiwib3AiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwibGVmdCIsInJpZ2h0IiwiZW5kc1dpdGgiLCJ0YXJnZXQiLCJ0YXJnZXRzIiwicmlnaHRfdHlwZSIsImFubm90YXRpb24iLCJpZCIsImxvY2FsX3ZhcmlhYmxlcyIsImNvbXBhcmF0b3JzIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwibW9kdWxlIiwibmFtZXMiLCJBcnJheSIsImlzQXJyYXkiLCJuYW1lIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiYnJ5dGhvbl9ub2RlIiwiY29uc29sZSIsImxvZyIsIndhcm4iLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsImxhc3QiLCJ2aXJ0X25vZGUiLCJjcmVhdGUiLCJfdmFsdWUiXSwic291cmNlUm9vdCI6IiJ9