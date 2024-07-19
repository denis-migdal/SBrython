/******/ var __webpack_modules__ = ({

/***/ "./src/ast2js.ts":
/*!***********************!*\
  !*** ./src/ast2js.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arg2js: () => (/* binding */ arg2js),
/* harmony export */   args2js: () => (/* binding */ args2js),
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
//TODO: move2core_modules ?
function args2js(node, cursor) {
    const start = {
        ...cursor
    };
    let js = "(";
    cursor.col += 1;
    const args = node.children[0];
    for(let i = 0; i < args.children.length; ++i){
        if (i !== 0) {
            js += ",";
            ++cursor.col;
        }
        js += arg2js(args.children[i], cursor);
    }
    js += ")";
    cursor.col += 1;
    args.jscode = {
        start: start,
        end: {
            ...cursor
        }
    };
    return js;
}
function arg2js(node, cursor) {
    const start = {
        ...cursor
    };
    let js = node.value;
    cursor.col += js.length;
    node.jscode = {
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

/***/ "./src/core_modules/controlflows/for/ast2js.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/controlflows/for/ast2js.ts ***!
  \*****************************************************/
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
    if (this.type === "controlflows.for(range)") {
        let js = `for(var ${this.value}=`;
        cursor.col += js.length;
        if (this.children.length >= 3) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
        else {
            js += `0n`;
            cursor.col += 2;
        }
        js += `; ${this.value} < `;
        cursor.col += this.value.length + 5;
        let end_idx = 0;
        if (this.children.length > 2) end_idx = 1;
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[end_idx], cursor);
        if (this.children.length < 4) {
            js += `; ++${this.value})`;
            cursor.col += this.value.length + 5;
        } else {
            js += `; ${this.value}+=`;
            cursor.col += this.value.length + 4;
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[2], cursor);
            js += ")";
            ++cursor.col;
        }
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, this.children.length - 1);
        this.jscode.end = {
            ...cursor
        };
        return js;
    }
    let js = `for(var ${this.value} of `;
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

/***/ "./src/core_modules/controlflows/for/astconvert.ts":
/*!*********************************************************!*\
  !*** ./src/core_modules/controlflows/for/astconvert.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const target = node.target.id;
    context.local_variables[target] = null; //TODO
    if (node.iter.constructor.$name === "Call" && node.iter.func.id === "range") {
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.for(range)", null, target, [
            ...node.iter.args.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context)),
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ]);
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.for", null, target, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.iter, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ]);
}
convert.brython_name = "For";


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
    let js = `while(`;
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

/***/ "./src/core_modules/fctdef/ast2js.ts":
/*!*******************************************!*\
  !*** ./src/core_modules/fctdef/ast2js.ts ***!
  \*******************************************/
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
    let js = `function ${this.value}`;
    cursor.col += js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.args2js)(this, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
    return js;
}


/***/ }),

/***/ "./src/core_modules/fctdef/astconvert.ts":
/*!***********************************************!*\
  !*** ./src/core_modules/fctdef/astconvert.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const args = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_args)(node, context);
    // new context for the function local variables
    context = {
        ...context
    };
    context.local_variables = {
        ...context.local_variables
    };
    for (let arg of args.children)context.local_variables[arg.value] = arg.result_type;
    // return type... node.returns.id
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "fctdev", null, node.name, [
        args,
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ]);
}
convert.brython_name = "FunctionDef";


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
/* harmony import */ var _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./return/astconvert.ts */ "./src/core_modules/return/astconvert.ts");
/* harmony import */ var _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./return/ast2js.ts */ "./src/core_modules/return/ast2js.ts");
/* harmony import */ var _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pass/astconvert.ts */ "./src/core_modules/pass/astconvert.ts");
/* harmony import */ var _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pass/ast2js.ts */ "./src/core_modules/pass/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./operators/==/astconvert.ts */ "./src/core_modules/operators/==/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./operators/==/ast2js.ts */ "./src/core_modules/operators/==/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./operators/+/astconvert.ts */ "./src/core_modules/operators/+/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./operators/+/ast2js.ts */ "./src/core_modules/operators/+/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _fctdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./fctdef/astconvert.ts */ "./src/core_modules/fctdef/astconvert.ts");
/* harmony import */ var _fctdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./fctdef/ast2js.ts */ "./src/core_modules/fctdef/ast2js.ts");
/* harmony import */ var _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./fctcall/astconvert.ts */ "./src/core_modules/fctcall/astconvert.ts");
/* harmony import */ var _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./fctcall/ast2js.ts */ "./src/core_modules/fctcall/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");


































const MODULES = {
    "symbol": {
        AST_CONVERT: _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
        AST2JS: _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    "return": {
        AST_CONVERT: _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
        AST2JS: _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    "pass": {
        AST_CONVERT: _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
        AST2JS: _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    "operators.==": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    "operators.+": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    "literals.str": {
        AST_CONVERT: _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "literals.float": {
        AST_CONVERT: _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__["default"]
    },
    "fctdef": {
        AST_CONVERT: _fctdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _fctdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "fctcall": {
        AST_CONVERT: _fctcall_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _fctcall_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_28__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_29__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_30__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_31__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_32__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_33__["default"]
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

/***/ "./src/core_modules/return/ast2js.ts":
/*!*******************************************!*\
  !*** ./src/core_modules/return/ast2js.ts ***!
  \*******************************************/
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
    let js = `return `;
    cursor.col += 7;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    this.jscode.end = {
        ...cursor
    };
    return js;
}


/***/ }),

/***/ "./src/core_modules/return/astconvert.ts":
/*!***********************************************!*\
  !*** ./src/core_modules/return/astconvert.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const expr = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "return", expr.result_type, null, [
        expr
    ]);
}
convert.brython_name = "Return";


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
/* harmony export */   convert_arg: () => (/* binding */ convert_arg),
/* harmony export */   convert_args: () => (/* binding */ convert_args),
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
//TODO: move2core_modules ?
function convert_args(node, context) {
    const args = node.args.args.map((m)=>convert_arg(m, context)); //TODO...
    const first = node.args.args[0];
    const last = node.args.args[node.args.args.length - 1];
    const virt_node = {
        lineno: first.lineno,
        col_offset: first.col_offset,
        end_lineno: last.end_lineno,
        end_col_offset: last.end_col_offset
    };
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(virt_node, "args", null, null, args);
}
function convert_arg(node, context) {
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "arg", node.annotation.id, node.arg);
}
function convert_line(line, context) {
    let node = line;
    if (line.constructor.$name === "Expr") node = line.value;
    /*
    if( "value" in line && ! ("targets" in line) && ! ("target" in line) )
        node = line.value;*/ return convert_node(node, context);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTdFLE1BQU07Z0JBQ3pCdEQsS0FBS21JLGFBQWE1RSxVQUFVO1lBQzdCO1lBQ0ExQyxLQUFLO2dCQUNKZCxNQUFNb0ksYUFBYTNFLFVBQVU7Z0JBQzdCeEQsS0FBS21JLGFBQWExRSxjQUFjO1lBQ2pDO1FBQ0Q7SUFDRDtBQUNEOzs7Ozs7O1NDdkNBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0Y2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ZjdGNhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0ZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZmN0ZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89PS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89PS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1ROb2RlW10pIHtcblxuXHRsZXQganMgPSBcIlwiO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMSwgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdCkge1xuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuXHRyZXR1cm4ganM7XG59XG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGJvZHkyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpZHggPSAwKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICAvLyBoNGNrIGR1ZSB0byB9IGVsc2UvZWxpZiB7XG4gICAgaWYobm9kZS50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIgfHwgbm9kZS50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIC0tbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgLy8gaDRjayBkdWUgdG8gfSBlbHNlL2VsaWYge1xuICAgIGlmKG5vZGUudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiIHx8IG5vZGUudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICArK25vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAganMgKz0gXCJ9XCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfZW5kKG5vZGU6IEFTVE5vZGUsIGpzOiBzdHJpbmcpIHtcblxuICAgIGlmKCBub2RlLmpzY29kZSEuZW5kICE9PSBudWxsKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBzdGFydCA9IG5vZGUuanNjb2RlIS5zdGFydDtcblxuICAgIGxldCBsaW5lX2NvdW50ICAgID0gMDtcbiAgICBsZXQgbGFzdF9saW5lX2lkeCA9IDA7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwganMubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKGpzW2ldID09PSAnXFxuJykge1xuICAgICAgICAgICAgKytsaW5lX2NvdW50O1xuICAgICAgICAgICAgbGFzdF9saW5lX2lkeCA9IGk7XG4gICAgICAgIH1cblxuICAgIGlmKGxpbmVfY291bnQgPT09IDApIHtcbiAgICAgICAgbm9kZS5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBzdGFydC5jb2wgKyBqcy5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbm9kZS5qc2NvZGUhLmVuZCA9IHtcbiAgICAgICAgbGluZTogc3RhcnQubGluZSArIGxpbmVfY291bnQsXG4gICAgICAgIGNvbCA6IGpzLmxlbmd0aCAtIGxhc3RfbGluZV9pZHhcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdsaW5lKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaW5kZW50X2xldmVsOiBudW1iZXIgPSAwKSB7XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICArK2N1cnNvci5saW5lO1xuICAgIGN1cnNvci5jb2wgPSBpbmRlbnQ7XG4gICAgcmV0dXJuIFwiXFxuXCIgKyBcIlwiLnBhZFN0YXJ0KGluZGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3Rub2RlMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgZW5kICA6IG51bGwgYXMgYW55XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS50b0pTISgpO1xuXG4gICAgdXBkYXRlX2VuZChub2RlLCBqcyk7XG5cbiAgICBjdXJzb3IubGluZSA9IG5vZGUuanNjb2RlIS5lbmQubGluZTtcbiAgICBjdXJzb3IuY29sICA9IG5vZGUuanNjb2RlIS5lbmQuY29sO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIGJvZHkyanMsIG5ld2xpbmUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGpzID0gYGZvcih2YXIgJHt0aGlzLnZhbHVlfT1gO1xuICAgICAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+PSAzKVxuICAgICAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGpzICs9IGAwbmA7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBqcyArPSBgOyAke3RoaXMudmFsdWV9IDwgYDtcbiAgICAgICAgY3Vyc29yLmNvbCArPSB0aGlzLnZhbHVlLmxlbmd0aCArIDU7XG5cbiAgICAgICAgbGV0IGVuZF9pZHggPSAwO1xuICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpXG4gICAgICAgICAgICBlbmRfaWR4ID0gMTtcblxuICAgICAgICBqcys9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltlbmRfaWR4XSwgY3Vyc29yKTtcblxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICBqcys9IGA7ICsrJHt0aGlzLnZhbHVlfSlgO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSB0aGlzLnZhbHVlLmxlbmd0aCArIDU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqcys9IGA7ICR7dGhpcy52YWx1ZX0rPWA7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IHRoaXMudmFsdWUubGVuZ3RoICsgNDtcbiAgICAgICAgICAgIGpzKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzJdLCBjdXJzb3IpO1xuICAgICAgICAgICAganMrPSBcIilcIlxuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSBgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIGA7XG4gICAgY3Vyc29yLmNvbCArPSBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGpzICs9ICcpJztcbiAgICArK2N1cnNvci5jb2w7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgICAgIC4uLiBub2RlLml0ZXIuYXJncy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICksXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBhc3Rub2RlMmpzLCBib2R5MmpzLCBuZXdsaW5lIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vaWZcbiAgICBsZXQga2V5d29yZCA9IFwiaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2UgaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2VcIjtcblxuICAgIGxldCBqcyA9IGAke2tleXdvcmR9YDtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBpZigga2V5d29yZCAhPT0gXCJlbHNlXCIpIHtcbiAgICAgICAganMgKz0gXCIoXCI7XG4gICAgICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgICsrb2Zmc2V0O1xuICAgICAgICBqcyArPSBcIilcIjtcbiAgICAgICAgKytjdXJzb3IuY29sO1xuICAgIH1cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgbGV0IGJlZyA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGxldCBlbmQgPSBjdXIub3JlbHNlW2N1ci5vcmVsc2UubGVuZ3RoLTFdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgYm9keTJqcywgbmV3bGluZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBgd2hpbGUoYDtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gJyknO1xuICAgICsrY3Vyc29yLmNvbDtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyBhc3Rub2RlMmpzIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIGxldCBqcyA9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSAnKCc7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSkge1xuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBcIilcIjtcblxuICAgIHRoaXMuanNjb2RlIS5lbmQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3IuY29sICsgMSxcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmY3RjYWxsXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDYWxsXCI7IiwiaW1wb3J0IHsgYXJnczJqcywgYm9keTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBgZnVuY3Rpb24gJHt0aGlzLnZhbHVlfWA7XG4gICAgY3Vyc29yLmNvbCArPSBqcy5sZW5ndGg7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYXJncywgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IHtcbiAgICAgICAgLi4uY29udGV4dFxuICAgIH1cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcyA9IHsuLi5jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc307XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIC8vIHJldHVybiB0eXBlLi4uIG5vZGUucmV0dXJucy5pZFxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZmN0ZGV2XCIsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9mY3RkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL2ZjdGRlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9mY3RjYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9mY3RjYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2NvbW1lbnRzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9jb21tZW50cy9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJvcGVyYXRvcnMuPT1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwib3BlcmF0b3JzLitcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJmY3RkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJmY3RjYWxsXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLndoaWxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTZcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcbiIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICByZXR1cm4gYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBcImZsb2F0XCIsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfW5gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCBcImludFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICByZXR1cm4gYFwiJHt0aGlzLnZhbHVlfVwiYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBcInN0clwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG4gICAgY29uc3Qgc3RhcnRfY29sID0gY3Vyc29yLmNvbDtcblxuICAgIC8vVE9ETzogY2hlY2sgY2hpbGRyZW4gdHlwZS4uLlxuICAgIC8vVE9ETzogcHJpb3JpdHkgY2hlY2tzXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBcbiAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiK1wiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIlwiO1xuXG4gICAgLypcbiAgICBsZXQganMgPSBcIm9wKFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIiwgJysnLCBcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIpXCI7Ki9cblxuICAgIC8qbGV0IGpzID0gYCR7dGhpcy52YWx1ZX0oYDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICBjdXJzb3IuY29sID0gc3RhcnRfY29sICsganMubGVuZ3RoO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuICAgIGpzICs9IFwiKVwiOyovXG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChcIm9wXCIgaW4gbm9kZSkgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBsZXQgb3AgPSBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lO1xuICAgIGlmKCBvcCA9PT0gXCJBZGRcIilcbiAgICAgICAgb3AgPSBcIitcIjtcblxuICAgIGlmKCBvcCA9PT0gXCJFcVwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuK1wiLCBudWxsLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KSxcbiAgICAgICAgXVxuICAgICk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpICkge1xuICAgICAgICBqcyArPSBcInZhciBcIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSA0O1xuICAgIH1cblxuICAgIGpzICs9IGFzdG5vZGUyanModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBqcyArPSBcIj1cIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAgdGhpcy5qc2NvZGUhLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdGFyZ2V0ID0gbm9kZS50YXJnZXQ7XG4gICAgaWYoIFwidGFyZ2V0c1wiIGluIG5vZGUpXG4gICAgICAgIHRhcmdldCA9IG5vZGUudGFyZ2V0c1swXTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKHRhcmdldCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsICAgICAgY29udGV4dCk7XG5cbiAgICBsZXQgcmlnaHRfdHlwZTogc3RyaW5nfG51bGwgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBpZiggXCJhbm5vdGF0aW9uXCIgaW4gbm9kZSkge1xuICAgICAgICByaWdodF90eXBlID0gbm9kZS5hbm5vdGF0aW9uLmlkID8/IFwiTm9uZVwiO1xuICAgICAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHQucmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcblxuICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcblxuICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCBjdXJzb3IgPSB7Li4udGhpcy5qc2NvZGUhLnN0YXJ0fTtcblxuICAgIC8vVE9ETyBOb25lIHR5cGUuLi5cbiAgICAvL1RPRE8gc3RyXG5cbiAgICBsZXQganMgPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAganMgKz0gXCI9PVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMjtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMV0sIGN1cnNvcik7XG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUuY29tcGFyYXRvcnNbMF0sIGNvbnRleHQpO1xuXG4gICAgaWYobGVmdC5yZXN1bHRfdHlwZSA9PT0gbnVsbCB8fCByaWdodC5yZXN1bHRfdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAvL1RPRE86IG9iamVjdCByZXN1bHRfdHlwZSB0b28uLi5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy49PVwiLCBcImJvb2xcIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG5cbiAgICBsZXQganMgPSBgcmV0dXJuIGA7XG4gICAgY3Vyc29yLmNvbCArPSA3O1xuXG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuXG5cbiAgICB0aGlzLmpzY29kZSEuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBjb25zdCBleHByID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlOyAvL1RPRE9cbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgaWYoIG5vZGUuaWQgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5pZF07XG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgbm9kZS5pZCk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBicnl0aG9uX25vZGUuc2JyeXRob25fdHlwZSA/PyBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlIClcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkXCIsIG5hbWUpO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBtb2R1bGUuQVNUMkpTO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgbm9kZVwiKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuYXJncy5hcmdzLm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2FyZyhtLCBjb250ZXh0KSApOyAvL1RPRE8uLi5cbiAgICBcbiAgICBjb25zdCBmaXJzdD0gbm9kZS5hcmdzLmFyZ3NbMF07XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYXJncy5hcmdzW25vZGUuYXJncy5hcmdzLmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiYXJnXCIsIG5vZGUuYW5ub3RhdGlvbi5pZCwgbm9kZS5hcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IHR5cGUgQ29udGV4dCA9IHtcbiAgICBsb2NhbF92YXJpYWJsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ3xudWxsPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgbG9jYWxfdmFyaWFibGVzOiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5KGFzdC5ib2R5Lmxlbmd0aCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdC5ib2R5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzXG4gICAgICAgIHJlc3VsdFtpXSA9IGNvbnZlcnRfbGluZShhc3QuYm9keVtpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSkgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiOyJdLCJuYW1lcyI6WyJhc3QyanMiLCJhc3QiLCJqcyIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwiYXN0bm9kZTJqcyIsIm5ld2xpbmUiLCJib2R5MmpzIiwiaWR4Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJ0eXBlIiwianNjb2RlIiwiaSIsImxlbmd0aCIsImVuZCIsImFyZ3MyanMiLCJhcmdzIiwiYXJnMmpzIiwidmFsdWUiLCJ1cGRhdGVfZW5kIiwibGluZV9jb3VudCIsImxhc3RfbGluZV9pZHgiLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsInRvSlMiLCJjb252ZXJ0IiwiX2NvbnRleHQiLCJlbmRfaWR4IiwiY29udmVydF9ib2R5IiwiY29udmVydF9ub2RlIiwiQVNUTm9kZSIsImNvbnRleHQiLCJ0YXJnZXQiLCJpZCIsImxvY2FsX3ZhcmlhYmxlcyIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsIm1hcCIsIm4iLCJicnl0aG9uX25hbWUiLCJrZXl3b3JkIiwib2Zmc2V0IiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0IiwicmVzdWx0X3R5cGUiLCJFcnJvciIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJwdXNoIiwiYmVnIiwibGluZW5vIiwiY29sX29mZnNldCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsImFzdG5vZGUiLCJjYyIsInB5Y29kZSIsImUiLCJjb252ZXJ0X2FyZ3MiLCJhcmciLCJuYW1lIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJPYmplY3QiLCJzdGFydF9jb2wiLCJvcCIsImxlZnQiLCJyaWdodCIsImVuZHNXaXRoIiwidGFyZ2V0cyIsInJpZ2h0X3R5cGUiLCJhbm5vdGF0aW9uIiwiY29tcGFyYXRvcnMiLCJleHByIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwibW9kdWxlIiwibmFtZXMiLCJBcnJheSIsImlzQXJyYXkiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJjb25zb2xlIiwibG9nIiwid2FybiIsInJlc3VsdCIsInVuZGVmaW5lZCIsImVycm9yIiwibGluZXMiLCJtIiwiY29udmVydF9saW5lIiwibGFzdCIsInZpcnRfbm9kZSIsImNvbnZlcnRfYXJnIiwiZmlyc3QiLCJjcmVhdGUiLCJfdmFsdWUiXSwic291cmNlUm9vdCI6IiJ9