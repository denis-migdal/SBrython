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
/* harmony export */   newline: () => (/* binding */ newline),
/* harmony export */   r: () => (/* binding */ r),
/* harmony export */   toJS: () => (/* binding */ toJS)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

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
function r(str, ...args) {
    return [
        str,
        args
    ];
}
function toJS(str, cursor) {
    if (typeof str === "string") {
        cursor.col += str.length;
        return str;
    }
    if (str instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode) {
        return astnode2js(str, cursor);
    }
    let js = "";
    let e;
    let s = "";
    for(let i = 0; i < str[1].length; ++i){
        s = str[0][i];
        js += s;
        cursor.col += s.length;
        e = str[1][i];
        if (e instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode) {
            js += astnode2js(e, cursor);
        } else {
            s = `${e}`;
            js += s;
            cursor.col += s.length;
        }
    }
    s = str[0][str[1].length];
    js += s;
    cursor.col += s.length;
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
    let js = node.toJS(cursor);
    node.jscode.end = {
        ...cursor
    };
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
function ast2js(_cursor) {
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

function ast2js(cursor) {
    if (this.type === "controlflows.for(range)") {
        let beg = "0n";
        let incr = "1n";
        let end = this.children[0];
        if (this.children.length > 2) {
            beg = this.children[0];
            end = this.children[1];
        }
        if (this.children.length > 3) incr = this.children[2];
        let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`for(var ${this.value} = ${beg}; ${this.value} < ${end}; ${this.value} += ${incr})`, cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, this.children.length - 1);
        return js;
    }
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`for(var ${this.value} of this.children[0])`, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
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

function ast2js(cursor) {
    if (this.type === "controlflows.ifblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
        return js;
    }
    //if
    let keyword = "if";
    if (this.type === "controlflows.elif") keyword = "else if";
    if (this.type === "controlflows.else") keyword = "else";
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(keyword, cursor);
    let offset = 0;
    if (keyword !== "else") {
        offset = 1;
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${this.children[0]})`, cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, offset);
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

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`while(${this.children[0]})`, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
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

/***/ "./src/core_modules/functions/call/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/functions/call/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]}(`, cursor);
    //TODO: args node...
    for(let i = 1; i < this.children.length; ++i){
        if (i !== 1) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(", ", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(")", cursor);
    return js;
}


/***/ }),

/***/ "./src/core_modules/functions/call/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/functions/call/astconvert.ts ***!
  \*******************************************************/
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.call", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.func, context),
        ...node.args.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e, context))
    ]);
}
convert.brython_name = "Call";


/***/ }),

/***/ "./src/core_modules/functions/def/ast2js.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/functions/def/ast2js.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`function ${this.value}`, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.args2js)(this, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
    return js;
}


/***/ }),

/***/ "./src/core_modules/functions/def/astconvert.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/functions/def/astconvert.ts ***!
  \******************************************************/
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.def", null, node.name, [
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
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
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
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}n`, cursor);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`"${this.value}"`, cursor);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} + ${this.children[1]}`, cursor);
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

function ast2js(cursor) {
    let js = "";
    if (this.type.endsWith("(init)")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("var ", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} = ${this.children[1]}`, cursor);
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

function ast2js(cursor) {
    //TODO None type...
    //TODO str
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} == ${this.children[1]}`, cursor);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("/* not implemented */", cursor);
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

function ast2js(cursor) {
    if (this.children.length === 0) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("return", cursor);
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`return ${this.children[0]}`, cursor);
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
    if (node.value === undefined) return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "return", "None", null);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.value, cursor); //TODO
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
    console.warn(node);
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
    let first;
    let last;
    if (args.length !== 0) {
        first = node.args.args[0];
        last = node.args.args[node.args.args.length - 1];
    } else {
        // an estimation...
        const col = node.col_offset + 4 + node.name.length + 1;
        first = last = {
            lineno: node.lineno,
            end_lineno: node.lineno,
            col_offset: col,
            end_col_offset: col
        };
    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtRQUNoQixJQUFJLENBQUM2QyxNQUFNLEdBQUc7WUFDYi9DLE9BQU87Z0JBQ05mLE1BQU1vSSxhQUFhNUUsTUFBTTtnQkFDekJ2RCxLQUFLbUksYUFBYTNFLFVBQVU7WUFDN0I7WUFDQXJDLEtBQUs7Z0JBQ0pwQixNQUFNb0ksYUFBYTFFLFVBQVU7Z0JBQzdCekQsS0FBS21JLGFBQWF6RSxjQUFjO1lBQ2pDO1FBQ0Q7SUFDRDtBQUNEOzs7Ozs7O1NDdkNBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cblx0cmV0dXJuIGpzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByKHN0cjogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmFyZ3M6YW55W10pIHtcbiAgICByZXR1cm4gW3N0ciwgYXJnc107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pTKCBzdHI6IFJldHVyblR5cGU8dHlwZW9mIHI+fHN0cmluZ3xBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAgICAganMgKz0gYXN0bm9kZTJqcyhlLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IGAke2V9YDtcbiAgICAgICAgICAgIGpzICs9IHM7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcyA9IHN0clswXVtzdHJbMV0ubGVuZ3RoXTtcbiAgICBqcyArPSBzO1xuICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICByZXR1cm4ganM7XG59XG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGJvZHkyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpZHggPSAwKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICAvLyBoNGNrIGR1ZSB0byB9IGVsc2UvZWxpZiB7XG4gICAgaWYobm9kZS50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIgfHwgbm9kZS50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIC0tbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgLy8gaDRjayBkdWUgdG8gfSBlbHNlL2VsaWYge1xuICAgIGlmKG5vZGUudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiIHx8IG5vZGUudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICArK25vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAganMgKz0gXCJ9XCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBfY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIikge1xuXG4gICAgICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZSAgPSBcIjBuXCI7XG4gICAgICAgIGxldCBpbmNyOiBzdHJpbmd8QVNUTm9kZSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBlbmQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gdGhpcy5jaGlsZHJlblsyXTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgICAgIC4uLiBub2RlLml0ZXIuYXJncy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICksXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuaWZibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy9pZlxuICAgIGxldCBrZXl3b3JkID0gXCJpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZSBpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZVwiO1xuXG4gICAgbGV0IGpzID0gdG9KUyhrZXl3b3JkLCBjdXJzb3IpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGlmKCBrZXl3b3JkICE9PSBcImVsc2VcIikge1xuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgbGV0IGJlZyA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGxldCBlbmQgPSBjdXIub3JlbHNlW2N1ci5vcmVsc2UubGVuZ3RoLTFdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmB3aGlsZSgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0oYCwgY3Vyc29yKTtcblxuICAgIC8vVE9ETzogYXJncyBub2RlLi4uXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSlcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCIpXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IGFyZ3MyanMsIGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZnVuY3Rpb24gJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYXJncywgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IHtcbiAgICAgICAgLi4uY29udGV4dFxuICAgIH1cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcyA9IHsuLi5jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc307XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIC8vIHJldHVybiB0eXBlLi4uIG5vZGUucmV0dXJucy5pZFxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmRlZlwiLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL29wZXJhdG9ycy89PS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTYgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE2IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInJldHVyblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJwYXNzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49PVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJvcGVyYXRvcnMuK1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJsaXRlcmFscy5zdHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwibGl0ZXJhbHMuTm9uZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNVxuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1uYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgXCJpbnRcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0gKyAke3RoaXMuY2hpbGRyZW5bMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIGxldCBvcCA9IG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWU7XG4gICAgaWYoIG9wID09PSBcIkFkZFwiKVxuICAgICAgICBvcCA9IFwiK1wiO1xuXG4gICAgaWYoIG9wID09PSBcIkVxXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4rXCIsIG51bGwsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoXCJ2YXIgXCIsIGN1cnNvcik7XG5cbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSA9ICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdGFyZ2V0ID0gbm9kZS50YXJnZXQ7XG4gICAgaWYoIFwidGFyZ2V0c1wiIGluIG5vZGUpXG4gICAgICAgIHRhcmdldCA9IG5vZGUudGFyZ2V0c1swXTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKHRhcmdldCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsICAgICAgY29udGV4dCk7XG5cbiAgICBsZXQgcmlnaHRfdHlwZTogc3RyaW5nfG51bGwgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBpZiggXCJhbm5vdGF0aW9uXCIgaW4gbm9kZSkge1xuICAgICAgICByaWdodF90eXBlID0gbm9kZS5hbm5vdGF0aW9uLmlkID8/IFwiTm9uZVwiO1xuICAgICAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHQucmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcblxuICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcblxuICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSA9PSAke3RoaXMuY2hpbGRyZW5bMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5jb21wYXJhdG9yc1swXSwgY29udGV4dCk7XG5cbiAgICBpZihsZWZ0LnJlc3VsdF90eXBlID09PSBudWxsIHx8IHJpZ2h0LnJlc3VsdF90eXBlID09PSBudWxsKSB7XG4gICAgICAgIC8vVE9ETzogb2JqZWN0IHJlc3VsdF90eXBlIHRvby4uLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLj09XCIsIFwiYm9vbFwiLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29tcGFyZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhyYHJldHVybiAke3RoaXMuY2hpbGRyZW5bMF19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicmV0dXJuXCIsIFwiTm9uZVwiLCBudWxsKTtcblxuICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUsIGN1cnNvcik7IC8vVE9ET1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBpZiggbm9kZS5pZCBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLmlkXTtcblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCBub2RlLmlkKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgXCJmaWxlbmFtZVwiLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIGNvbnZlcnRfYXN0KF9hc3QpOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKVxuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWRcIiwgbmFtZSk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBmb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuICAgICAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG4gICAgICAgIGxldCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zb2xlLndhcm4obm9kZSk7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZ3Mobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5hcmdzLmFyZ3MubWFwKCAobTphbnkpID0+IGNvbnZlcnRfYXJnKG0sIGNvbnRleHQpICk7IC8vVE9ETy4uLlxuICAgIFxuICAgIGxldCBmaXJzdDogYW55O1xuICAgIGxldCBsYXN0IDogYW55O1xuICAgIGlmKCBhcmdzLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGZpcnN0PSBub2RlLmFyZ3MuYXJnc1swXTtcbiAgICAgICAgbGFzdCA9IG5vZGUuYXJncy5hcmdzW25vZGUuYXJncy5hcmdzLmxlbmd0aC0xXTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIGZpcnN0ID0gbGFzdCA9IHtcbiAgICAgICAgICAgIGxpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IGNvbCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBjb2xcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBmaXJzdC5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGZpcnN0LmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImFyZ3NcIiwgbnVsbCwgbnVsbCwgYXJncyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmcobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJhcmdcIiwgbm9kZS5hbm5vdGF0aW9uLmlkLCBub2RlLmFyZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbm9kZSA9IGxpbmU7XG5cbiAgICBpZiggbGluZS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJFeHByXCIpXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuICAgIC8qXG4gICAgaWYoIFwidmFsdWVcIiBpbiBsaW5lICYmICEgKFwidGFyZ2V0c1wiIGluIGxpbmUpICYmICEgKFwidGFyZ2V0XCIgaW4gbGluZSkgKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTsqL1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgdHlwZSBDb250ZXh0ID0ge1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBsb2NhbF92YXJpYWJsZXM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvL1RPRE86IGRldGVjdCBjb21tZW50cy4uLlxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCByZXN1bHRfdHlwZTogc3RyaW5nfG51bGwsIF92YWx1ZTogYW55ID0gbnVsbCwgY2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdKSB7XG5cblx0XHR0aGlzLnR5cGUgICA9IHR5cGU7XG5cdFx0dGhpcy5yZXN1bHRfdHlwZSA9IHJlc3VsdF90eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsInIiLCJzdHIiLCJhcmdzIiwidG9KUyIsImxlbmd0aCIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsInR5cGUiLCJqc2NvZGUiLCJlbmQiLCJhcmdzMmpzIiwiYXJnMmpzIiwidmFsdWUiLCJpbmRlbnRfbGV2ZWwiLCJpbmRlbnQiLCJwYWRTdGFydCIsIl9jdXJzb3IiLCJjb252ZXJ0IiwiX2NvbnRleHQiLCJiZWciLCJpbmNyIiwiY29udmVydF9ib2R5IiwiY29udmVydF9ub2RlIiwiY29udGV4dCIsInRhcmdldCIsImlkIiwibG9jYWxfdmFyaWFibGVzIiwiaXRlciIsImNvbnN0cnVjdG9yIiwiJG5hbWUiLCJmdW5jIiwibWFwIiwibiIsImJyeXRob25fbmFtZSIsImtleXdvcmQiLCJvZmZzZXQiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJyZXN1bHRfdHlwZSIsIkVycm9yIiwic2JyeXRob25fdHlwZSIsImN1ciIsIm9yZWxzZSIsInB1c2giLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiY29udmVydF9hcmdzIiwiYXJnIiwibmFtZSIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiT2JqZWN0Iiwib3AiLCJsZWZ0IiwicmlnaHQiLCJlbmRzV2l0aCIsInRhcmdldHMiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImNvbXBhcmF0b3JzIiwidW5kZWZpbmVkIiwiZXhwciIsIkNPUkVfTU9EVUxFUyIsIm1vZHVsZXMiLCJtb2R1bGVfbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiQXJyYXkiLCJpc0FycmF5IiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiYnJ5dGhvbl9ub2RlIiwiY29uc29sZSIsImxvZyIsIndhcm4iLCJyZXN1bHQiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsImxhc3QiLCJ2aXJ0X25vZGUiLCJjb252ZXJ0X2FyZyIsImZpcnN0IiwiY3JlYXRlIiwiX3ZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==