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
    let js = `//# sourceURL=${ast.filename}\n`;
    let cursor = {
        line: 2,
        col: 0
    };
    for (let node of ast.nodes){
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
    for(let i = 0; i < body.children.length; ++i){
        js += newline(node, cursor, 1);
        js += astnode2js(body.children[i], cursor);
    }
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
    let base_indent = node.jscode.start.col;
    if ([
        "controlflows.else",
        "controlflows.elif",
        "controlflows.catchblock"
    ].includes(node.type)) {
        --base_indent;
    }
    const indent = indent_level * 4 + base_indent;
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
        children.push({
            sbrython_type: "If",
            ifblock: "else",
            body: cur.orelse,
            ...(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.listpos)(cur.orelse),
            // because reasons...
            lineno: cur.orelse[0].lineno - 1,
            col_offset: node.col_offset
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

/***/ "./src/core_modules/controlflows/tryblock/ast2js.ts":
/*!**********************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/ast2js.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let js = "";
    for(let i = 0; i < this.children.length; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
    return js;
}


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/astconvert.ts":
/*!**************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/astconvert.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const children = [
        {
            sbrython_type: "Try.try",
            ...node
        },
        {
            sbrython_type: "Try.catchblock",
            ...(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.listpos)(node.handlers),
            handlers: node.handlers
        }
    ];
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.tryblock", null, null, [
        ...children.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context))
    ]);
    //fix pycode.
    astnode.children[0].pycode.end = astnode.children[1].pycode.start;
    return astnode;
}
convert.brython_name = "Try";


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts":
/*!****************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/catch/ast2js.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("if(true)", cursor); //TODO...
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 0);
    return js;
}


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts":
/*!********************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/catch/astconvert.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    //TODO: condition...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.catch`, null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ]);
}
convert.brython_name = "ExceptHandler";


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts":
/*!*********************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    console.log("catch", {
        ...cursor
    });
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("catch(_raw_err_){", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("const _err_ = _raw_err_ instanceof _b_.PythonError", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 4);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("? _raw_err_.python_exception", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 4);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(": new _r_.JSException(_raw_err_);", cursor);
    // debug
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("_b_.debug_print_exception(_err_, _ast_)", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    for (let handler of this.children)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(handler, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("else { throw _raw_err_ }", cursor); //TODO...
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 0);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
    return js;
}


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts":
/*!*************************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.catchblock`, null, null, node.handlers.map((h)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(h, context)));
}
convert.brython_name = "Try.catchblock";


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/runtime.ts":
/*!***********************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/runtime.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parse_stack: () => (/* binding */ parse_stack),
/* harmony export */   stack2astnodes: () => (/* binding */ stack2astnodes),
/* harmony export */   stackline2astnode: () => (/* binding */ stackline2astnode)
/* harmony export */ });
function filter_stack(stack) {
    return stack.filter((e)=>e.includes('brython_')); //TODO improves...
}
function find_astnode_from_jscode_pos(nodes, line, col) {
    for(let i = 0; i < nodes.length; ++i){
        if (nodes[i].jscode.start.line > line || nodes[i].jscode.start.line === line && nodes[i].jscode.start.col > col) return null;
        if (nodes[i].jscode.end.line > line || nodes[i].jscode.end.line === line && nodes[i].jscode.end.col > col) {
            let node = find_astnode_from_jscode_pos(nodes[i].children, line, col);
            if (node !== null) return node;
            return nodes[i];
        }
    }
    return null; //throw new Error("node not found");
}
function stackline2astnode(stackline, ast) {
    return find_astnode_from_jscode_pos(ast.nodes, stackline[1], stackline[2]);
}
//TODO: convert
function stack2astnodes(stack, ast) {
    return stack.map((e)=>stackline2astnode(e, ast));
}
//TODO: add file...
function parse_stack(stack, ast) {
    stack = stack.split("\n");
    const isV8 = stack[0] === "Error";
    return filter_stack(stack).map((l)=>{
        let [_, _line, _col] = l.split(':');
        if (_col[_col.length - 1] === ')') _col = _col.slice(0, -1);
        let line = +_line - 2;
        let col = +_col;
        --col; //starts at 1.
        let fct_name;
        if (isV8) {
            let pos = _.indexOf(" ", 7);
            fct_name = _.slice(7, pos);
            if (fct_name === "eval") fct_name = "<module>";
            const node = find_astnode_from_jscode_pos(ast.nodes, line, col);
            if (node.type === "symbol") col += node.value.length; // V8 gives first character of the symbol name when FF gives "("...
        } else {
            let pos = _.indexOf('@');
            fct_name = _.slice(0, pos);
            if (fct_name === "anonymous") fct_name = "<module>";
        }
        return [
            fct_name,
            line,
            col
        ];
    });
}
function debug_print_exception(err, ast) {
    //TODO: many ast/files.
    console.warn("Exception", err);
    const stack = parse_stack(err._raw_err_.stack, ast);
    const nodes = stack2astnodes(stack, ast);
    //TODO: convert stack...
    const stack_str = stack.map((l, i)=>`File "[file]", line ${nodes[i].pycode.start.line}, in ${stack[i][0]}`);
    let exception_str = `Traceback (most recent call last):
  ${stack_str.join(`\n  `)}
Exception: [msg]`;
    console.log(exception_str);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    debug_print_exception
});


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/try/ast2js.ts":
/*!**************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/try/ast2js.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    console.log("try", {
        ...cursor
    });
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("try", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor);
    console.log("try", {
        ...cursor
    });
    return js;
}


/***/ }),

/***/ "./src/core_modules/controlflows/tryblock/try/astconvert.ts":
/*!******************************************************************!*\
  !*** ./src/core_modules/controlflows/tryblock/try/astconvert.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.try`, null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ]);
}
convert.brython_name = "Try.try";


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
    let js = "";
    if (this.children[0].result_type?.startsWith("class.")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("new ", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]}(`, cursor);
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

/***/ "./src/core_modules/keywords/raise/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/keywords/raise/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`throw new _b_.PythonError(${this.children[0]});`, cursor);
}


/***/ }),

/***/ "./src/core_modules/keywords/raise/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/keywords/raise/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.raise", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.exc, context)
    ]);
}
convert.brython_name = "Raise";


/***/ }),

/***/ "./src/core_modules/keywords/raise/runtime.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/keywords/raise/runtime.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PythonError: () => (/* binding */ PythonError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class PythonError extends Error {
    python_exception;
    constructor(python_exception){
        super();
        python_exception._raw_err_ = this;
        this.python_exception = python_exception;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    PythonError
});


/***/ }),

/***/ "./src/core_modules/lists.ts":
/*!***********************************!*\
  !*** ./src/core_modules/lists.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _b_: () => (/* binding */ _b_),
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
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");














































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
    "keywords.raise": {
        AST_CONVERT: _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_34__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_35__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_36__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_37__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_38__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_39__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_40__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_41__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_24__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_33__["default"]);
const _b_ = RUNTIME;


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
/* harmony import */ var _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core_runtime/lists */ "./src/core_runtime/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function isClass(_) {
    return true;
}
function convert(node, context) {
    let result_type = null;
    let value = node.id;
    if (node.id in context.local_variables) result_type = context.local_variables[node.id];
    else if (node.id in _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        value = `_r_.${node.id}`;
        if (isClass(_core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"][node.id])) result_type = `class.${node.id}`;
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "symbol", result_type, value);
}
convert.brython_name = "Name";


/***/ }),

/***/ "./src/core_runtime/Exceptions/Exception.ts":
/*!**************************************************!*\
  !*** ./src/core_runtime/Exceptions/Exception.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Py_Exception)
/* harmony export */ });
/* harmony import */ var core_runtime_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_runtime/object */ "./src/core_runtime/object.ts");

class Py_Exception extends core_runtime_object__WEBPACK_IMPORTED_MODULE_0__["default"] {
} // __traceback__
 // tb_next
 // tb_frame
 // f_back ?
 // f_local : enable only in compat mode.
 // f_lineno (line)
 // f_code
 // co_name (fct name ?)
 // co_filename


/***/ }),

/***/ "./src/core_runtime/Exceptions/JSException.ts":
/*!****************************************************!*\
  !*** ./src/core_runtime/Exceptions/JSException.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Py_JSException)
/* harmony export */ });
/* harmony import */ var _Exception__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Exception */ "./src/core_runtime/Exceptions/Exception.ts");

class Py_JSException extends _Exception__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/core_runtime/lists.ts":
/*!***********************************!*\
  !*** ./src/core_runtime/lists.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _object_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.ts */ "./src/core_runtime/object.ts");
/* harmony import */ var _Exceptions_JSException_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Exceptions/JSException.ts */ "./src/core_runtime/Exceptions/JSException.ts");
/* harmony import */ var _Exceptions_Exception_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Exceptions/Exception.ts */ "./src/core_runtime/Exceptions/Exception.ts");



const RUNTIME = {
    "object": _object_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
    "JSException": _Exceptions_JSException_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
    "Exception": _Exceptions_Exception_ts__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RUNTIME);


/***/ }),

/***/ "./src/core_runtime/object.ts":
/*!************************************!*\
  !*** ./src/core_runtime/object.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Py_object)
/* harmony export */ });
class Py_object {
}


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
/* harmony export */   listpos: () => (/* binding */ listpos),
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
function py2ast(code, filename) {
    const parser = new $B.Parser(code, filename, 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    return {
        nodes: convert_ast(_ast),
        filename
    };
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
function listpos(node) {
    let beg = node[0];
    let end = node[node.length - 1];
    return {
        //lineno : beg.lineno - 1,
        //col_offset: node.col_offset,
        lineno: beg.lineno,
        col_offset: beg.col_offset,
        end_lineno: end.end_lineno,
        end_col_offset: end.end_col_offset
    };
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
/* harmony export */   _b_: () => (/* reexport safe */ _core_modules_lists__WEBPACK_IMPORTED_MODULE_3__._b_),
/* harmony export */   _r_: () => (/* reexport safe */ _core_runtime_lists__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   convert_ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_ast),
/* harmony export */   parse_stack: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_4__.parse_stack),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast),
/* harmony export */   stackline2astnode: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_4__.stackline2astnode)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");
/* harmony import */ var _core_runtime_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core_runtime/lists */ "./src/core_runtime/lists.ts");
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_modules/controlflows/tryblock/runtime */ "./src/core_modules/controlflows/tryblock/runtime.ts");






var __webpack_exports___b_ = __webpack_exports__._b_;
var __webpack_exports___r_ = __webpack_exports__._r_;
var __webpack_exports__ast2js = __webpack_exports__.ast2js;
var __webpack_exports__convert_ast = __webpack_exports__.convert_ast;
var __webpack_exports__parse_stack = __webpack_exports__.parse_stack;
var __webpack_exports__py2ast = __webpack_exports__.py2ast;
var __webpack_exports__stackline2astnode = __webpack_exports__.stackline2astnode;
export { __webpack_exports___b_ as _b_, __webpack_exports___r_ as _r_, __webpack_exports__ast2js as ast2js, __webpack_exports__convert_ast as convert_ast, __webpack_exports__parse_stack as parse_stack, __webpack_exports__py2ast as py2ast, __webpack_exports__stackline2astnode as stackline2astnode };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbUQ7QUFFNUMsU0FBU0MsT0FBT0MsR0FBUTtJQUU5QixJQUFJQyxLQUFLLENBQUMsY0FBYyxFQUFFRCxJQUFJRSxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLElBQUlDLFNBQVM7UUFBQ0MsTUFBTTtRQUFHQyxLQUFLO0lBQUM7SUFDaEMsS0FBSSxJQUFJQyxRQUFRTixJQUFJTyxLQUFLLENBQUU7UUFDMUJOLE1BQU1PLFdBQVdGLE1BQU1IO1FBQ2pCRixNQUFTUSxRQUFRSCxNQUFNSDtJQUMzQjtJQUVILE9BQU9GO0FBQ1I7QUFHTyxTQUFTUyxFQUFFQyxHQUF5QixFQUFFLEdBQUdDLElBQVU7SUFDdEQsT0FBTztRQUFDRDtRQUFLQztLQUFLO0FBQ3RCO0FBRU8sU0FBU0MsS0FBTUYsR0FBd0MsRUFBRVIsTUFBZTtJQUUzRSxJQUFJLE9BQU9RLFFBQVEsVUFBVTtRQUN6QlIsT0FBT0UsR0FBRyxJQUFJTSxJQUFJRyxNQUFNO1FBQ3hCLE9BQU9IO0lBQ1g7SUFDQSxJQUFJQSxlQUFlYixvREFBT0EsRUFBRTtRQUN4QixPQUFPVSxXQUFXRyxLQUFLUjtJQUMzQjtJQUVBLElBQUlGLEtBQUs7SUFFVCxJQUFJYztJQUNKLElBQUlDLElBQVk7SUFFaEIsSUFBSSxJQUFJQyxJQUFJLEdBQUdBLElBQUlOLEdBQUcsQ0FBQyxFQUFFLENBQUNHLE1BQU0sRUFBRSxFQUFFRyxFQUFHO1FBRW5DRCxJQUFJTCxHQUFHLENBQUMsRUFBRSxDQUFDTSxFQUFFO1FBQ2JoQixNQUFNZTtRQUNOYixPQUFPRSxHQUFHLElBQUlXLEVBQUVGLE1BQU07UUFFdEJDLElBQUlKLEdBQUcsQ0FBQyxFQUFFLENBQUNNLEVBQUU7UUFDYixJQUFJRixhQUFhakIsb0RBQU9BLEVBQUU7WUFDdEJHLE1BQU1PLFdBQVdPLEdBQUdaO1FBQ3hCLE9BQU87WUFDSGEsSUFBSSxDQUFDLEVBQUVELEVBQUUsQ0FBQztZQUNWZCxNQUFNZTtZQUNOYixPQUFPRSxHQUFHLElBQUlXLEVBQUVGLE1BQU07UUFDMUI7SUFDSjtJQUVBRSxJQUFJTCxHQUFHLENBQUMsRUFBRSxDQUFDQSxHQUFHLENBQUMsRUFBRSxDQUFDRyxNQUFNLENBQUM7SUFDekJiLE1BQU1lO0lBQ05iLE9BQU9FLEdBQUcsSUFBSVcsRUFBRUYsTUFBTTtJQUV0QixPQUFPYjtBQUNYO0FBRUEsMkJBQTJCO0FBQ3BCLFNBQVNpQixRQUFRWixJQUFhLEVBQUVILE1BQWUsRUFBRWdCLE1BQU0sQ0FBQztJQUUzRCxNQUFNQyxRQUFRO1FBQUMsR0FBR2pCLE1BQU07SUFBQTtJQUV4QixJQUFJRixLQUFLO0lBQ1QsTUFBTW9CLE9BQU9mLEtBQUtnQixRQUFRLENBQUNILElBQUksRUFBQyxrQkFBa0I7SUFFbEQsSUFBSSxJQUFJRixJQUFJLEdBQUdBLElBQUlJLEtBQUtDLFFBQVEsQ0FBQ1IsTUFBTSxFQUFFLEVBQUVHLEVBQUc7UUFDMUNoQixNQUFNUSxRQUFRSCxNQUFNSCxRQUFRO1FBQzVCRixNQUFNTyxXQUFXYSxLQUFLQyxRQUFRLENBQUNMLEVBQUUsRUFBRWQ7SUFDdkM7SUFFQUYsTUFBTVEsUUFBUUgsTUFBTUg7SUFDcEJGLE1BQU07SUFDTkUsT0FBT0UsR0FBRyxJQUFJO0lBRWRnQixLQUFLRSxNQUFNLEdBQUc7UUFDVkgsT0FBT0E7UUFDUEksS0FBTztZQUFDLEdBQUdyQixNQUFNO1FBQUE7SUFDckI7SUFFQSxPQUFPRjtBQUNYO0FBRUEsMkJBQTJCO0FBQ3BCLFNBQVN3QixRQUFRbkIsSUFBYSxFQUFFSCxNQUFlO0lBRWxELE1BQU1pQixRQUFRO1FBQUMsR0FBR2pCLE1BQU07SUFBQTtJQUV4QixJQUFJRixLQUFLO0lBQ1RFLE9BQU9FLEdBQUcsSUFBSTtJQUVkLE1BQU1PLE9BQU9OLEtBQUtnQixRQUFRLENBQUMsRUFBRTtJQUU3QixJQUFJLElBQUlMLElBQUksR0FBSUEsSUFBSUwsS0FBS1UsUUFBUSxDQUFDUixNQUFNLEVBQUUsRUFBRUcsRUFBRztRQUMzQyxJQUFJQSxNQUFNLEdBQUc7WUFDVGhCLE1BQU07WUFDTixFQUFFRSxPQUFPRSxHQUFHO1FBQ2hCO1FBRUFKLE1BQU15QixPQUFPZCxLQUFLVSxRQUFRLENBQUNMLEVBQUUsRUFBRWQ7SUFDbkM7SUFFQUYsTUFBTTtJQUNORSxPQUFPRSxHQUFHLElBQUk7SUFFZE8sS0FBS1csTUFBTSxHQUFHO1FBQ1ZILE9BQU9BO1FBQ1BJLEtBQU87WUFBQyxHQUFHckIsTUFBTTtRQUFBO0lBQ3JCO0lBRUEsT0FBT0Y7QUFDWDtBQUVPLFNBQVN5QixPQUFPcEIsSUFBYSxFQUFFSCxNQUFlO0lBRWpELE1BQU1pQixRQUFRO1FBQUMsR0FBR2pCLE1BQU07SUFBQTtJQUV4QixJQUFJRixLQUFLSyxLQUFLcUIsS0FBSztJQUNuQnhCLE9BQU9FLEdBQUcsSUFBSUosR0FBR2EsTUFBTTtJQUV2QlIsS0FBS2lCLE1BQU0sR0FBRztRQUNWSCxPQUFPQTtRQUNQSSxLQUFPO1lBQUMsR0FBR3JCLE1BQU07UUFBQTtJQUNyQjtJQUVBLE9BQU9GO0FBQ1g7QUFFTyxTQUFTUSxRQUFRSCxJQUFhLEVBQUVILE1BQWUsRUFBRXlCLGVBQXVCLENBQUM7SUFFNUUsSUFBSUMsY0FBY3ZCLEtBQUtpQixNQUFNLENBQUVILEtBQUssQ0FBQ2YsR0FBRztJQUN4QyxJQUFJO1FBQUM7UUFBcUI7UUFBcUI7S0FBMEIsQ0FBQ3lCLFFBQVEsQ0FBQ3hCLEtBQUt5QixJQUFJLEdBQUk7UUFDN0YsRUFBRUY7SUFDTDtJQUVBLE1BQU1HLFNBQVNKLGVBQWEsSUFBSUM7SUFFaEMsRUFBRTFCLE9BQU9DLElBQUk7SUFDYkQsT0FBT0UsR0FBRyxHQUFHMkI7SUFDYixPQUFPLE9BQU8sR0FBR0MsUUFBUSxDQUFDRDtBQUM5QjtBQUVPLFNBQVN4QixXQUFXRixJQUFhLEVBQUVILE1BQWU7SUFFckRHLEtBQUtpQixNQUFNLEdBQUc7UUFDVkgsT0FBTztZQUFDLEdBQUdqQixNQUFNO1FBQUE7UUFDakJxQixLQUFPO0lBQ1g7SUFFQSxJQUFJdkIsS0FBS0ssS0FBS08sSUFBSSxDQUFFVjtJQUVwQkcsS0FBS2lCLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHO1FBQUMsR0FBR3JCLE1BQU07SUFBQTtJQUU1QixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUN4SmUsU0FBU0YsT0FBc0JtQyxPQUFnQjtJQUUxRCxTQUFTO0lBQ1QsT0FBTyxJQUFJLGtCQUFrQjtBQUNqQzs7Ozs7Ozs7Ozs7Ozs7O0FDSmUsU0FBU0MsUUFBUTdCLElBQVMsRUFBRThCLFFBQWlCO0lBRXhELFFBQVEsc0RBQXNEO0FBRTlELGlFQUFpRTtBQUNqRSwrQkFBK0I7QUFDL0IsaUJBQWlCO0FBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7O0FDVDBDO0FBRzNCLFNBQVNyQyxPQUFzQkksTUFBZTtJQUV6RCxJQUFJLElBQUksQ0FBQzRCLElBQUksS0FBSywyQkFBMkI7UUFFekMsSUFBSU0sTUFBd0I7UUFDNUIsSUFBSUMsT0FBdUI7UUFDM0IsSUFBSWQsTUFBTyxJQUFJLENBQUNGLFFBQVEsQ0FBQyxFQUFFO1FBRTNCLElBQUksSUFBSSxDQUFDQSxRQUFRLENBQUNSLE1BQU0sR0FBRyxHQUFHO1lBQzFCdUIsTUFBTSxJQUFJLENBQUNmLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCRSxNQUFNLElBQUksQ0FBQ0YsUUFBUSxDQUFDLEVBQUU7UUFDMUI7UUFDQSxJQUFJLElBQUksQ0FBQ0EsUUFBUSxDQUFDUixNQUFNLEdBQUcsR0FDdkJ3QixPQUFPLElBQUksQ0FBQ2hCLFFBQVEsQ0FBQyxFQUFFO1FBRTNCLElBQUlyQixLQUFLWSw0Q0FBSUEsQ0FBQ0gseUNBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDaUIsS0FBSyxDQUFDLEdBQUcsRUFBRVUsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDVixLQUFLLENBQUMsR0FBRyxFQUFFSCxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUNHLEtBQUssQ0FBQyxJQUFJLEVBQUVXLEtBQUssQ0FBQyxDQUFDLEVBQUVuQztRQUNwR0YsTUFBTWlCLCtDQUFPQSxDQUFDLElBQUksRUFBRWYsUUFBUSxJQUFJLENBQUNtQixRQUFRLENBQUNSLE1BQU0sR0FBQztRQUVqRCxPQUFPYjtJQUNYO0lBRUEsSUFBSUEsS0FBS1ksNENBQUlBLENBQUNILHlDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ2lCLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFeEI7SUFDekRGLE1BQU1pQiwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVmLFFBQVE7SUFFaEMsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QjJFO0FBQ2pDO0FBRTNCLFNBQVNrQyxRQUFRN0IsSUFBUyxFQUFFbUMsT0FBZ0I7SUFFdkQsTUFBTUMsU0FBU3BDLEtBQUtvQyxNQUFNLENBQUNDLEVBQUU7SUFDN0JGLFFBQVFHLGVBQWUsQ0FBQ0YsT0FBTyxHQUFHLE1BQU0sTUFBTTtJQUU5QyxJQUFJcEMsS0FBS3VDLElBQUksQ0FBQ0MsV0FBVyxDQUFDQyxLQUFLLEtBQUssVUFBVXpDLEtBQUt1QyxJQUFJLENBQUNHLElBQUksQ0FBQ0wsRUFBRSxLQUFLLFNBQVM7UUFFekUsT0FBTyxJQUFJN0Msb0RBQU9BLENBQUNRLE1BQU0sMkJBQTJCLE1BQU1vQyxRQUFRO2VBQzFEcEMsS0FBS3VDLElBQUksQ0FBQ2pDLElBQUksQ0FBQ3FDLEdBQUcsQ0FBRSxDQUFDQyxJQUFVVixvREFBWUEsQ0FBQ1UsR0FBR1Q7WUFDbkRGLG9EQUFZQSxDQUFDakMsTUFBTW1DO1NBQ3RCO0lBRUw7SUFFQSxPQUFPLElBQUkzQyxvREFBT0EsQ0FBQ1EsTUFBTSxvQkFBb0IsTUFBTW9DLFFBQVE7UUFDdkRGLG9EQUFZQSxDQUFDbEMsS0FBS3VDLElBQUksRUFBRUo7UUFDeEJGLG9EQUFZQSxDQUFDakMsTUFBTW1DO0tBQ3RCO0FBQ0w7QUFFQU4sUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCbUI7QUFHM0IsU0FBU3BELE9BQXNCSSxNQUFlO0lBRXpELElBQUksSUFBSSxDQUFDNEIsSUFBSSxLQUFLLHdCQUF3QjtRQUN0QyxJQUFJOUIsS0FBSztRQUNULElBQUksSUFBSWdCLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNLLFFBQVEsQ0FBQ1IsTUFBTSxFQUFFLEVBQUVHLEVBQ3ZDaEIsTUFBTVksNENBQUlBLENBQUMsSUFBSSxDQUFDUyxRQUFRLENBQUNMLEVBQUUsRUFBRWQ7UUFDakMsT0FBT0Y7SUFDWDtJQUVBLElBQUk7SUFDSixJQUFJbUQsVUFBVTtJQUNkLElBQUksSUFBSSxDQUFDckIsSUFBSSxLQUFLLHFCQUNkcUIsVUFBVTtJQUNkLElBQUksSUFBSSxDQUFDckIsSUFBSSxLQUFLLHFCQUNkcUIsVUFBVTtJQUVkLElBQUluRCxLQUFLWSw0Q0FBSUEsQ0FBQ3VDLFNBQVNqRDtJQUN2QixJQUFJa0QsU0FBUztJQUNiLElBQUlELFlBQVksUUFBUTtRQUNwQkMsU0FBUztRQUNUcEQsTUFBTVksNENBQUlBLENBQUNILHlDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ1ksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRW5CO0lBQ3pDO0lBRUFGLE1BQU1pQiwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVmLFFBQVFrRDtJQUU1QixPQUFPcEQ7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Qm9GO0FBQzFDO0FBRTNCLFNBQVNrQyxRQUFRN0IsSUFBUyxFQUFFbUMsT0FBZ0I7SUFFdkQsSUFBSSxhQUFhbkMsTUFBTztRQUVwQixJQUFJQSxLQUFLaUQsT0FBTyxLQUFLLFFBQVE7WUFDekIsT0FBTyxJQUFJekQsb0RBQU9BLENBQUNRLE1BQU0sQ0FBQyxhQUFhLEVBQUVBLEtBQUtpRCxPQUFPLENBQUMsQ0FBQyxFQUFFLE1BQU0sTUFBTTtnQkFDakVoQixvREFBWUEsQ0FBQ2pDLE1BQU1tQzthQUN0QjtRQUNMO1FBRUEsTUFBTWUsT0FBT2hCLG9EQUFZQSxDQUFDbEMsS0FBS21ELElBQUksRUFBRWhCO1FBRXJDLElBQUdlLEtBQUtFLFdBQVcsS0FBSyxRQUNwQixNQUFNLElBQUlDLE1BQU0sQ0FBQyxLQUFLLEVBQUVILEtBQUtFLFdBQVcsQ0FBQyxrQ0FBa0MsQ0FBQztRQUVoRixPQUFPLElBQUk1RCxvREFBT0EsQ0FBQ1EsTUFBTSxDQUFDLGFBQWEsRUFBRUEsS0FBS2lELE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxNQUFNO1lBQ2pFQztZQUNBakIsb0RBQVlBLENBQUNqQyxNQUFNbUM7U0FDdEI7SUFDTDtJQUVBbkMsS0FBS3NELGFBQWEsR0FBRztJQUNyQnRELEtBQUtpRCxPQUFPLEdBQUc7SUFFZixNQUFNakMsV0FBVztRQUNiaEI7S0FDSDtJQUVELElBQUl1RCxNQUFNdkQ7SUFDVixNQUFPLFlBQVl1RCxPQUFPQSxJQUFJQyxNQUFNLENBQUNoRCxNQUFNLEtBQUssS0FBSyxVQUFVK0MsSUFBSUMsTUFBTSxDQUFDLEVBQUUsQ0FBRTtRQUMxRUQsTUFBTUEsSUFBSUMsTUFBTSxDQUFDLEVBQUU7UUFDbkJELElBQUlELGFBQWEsR0FBRztRQUNwQkMsSUFBSU4sT0FBTyxHQUFHO1FBQ2RqQyxTQUFTeUMsSUFBSSxDQUFDRjtJQUNsQjtJQUNBLElBQUksWUFBWUEsT0FBT0EsSUFBSUMsTUFBTSxDQUFDaEQsTUFBTSxLQUFLLEdBQUk7UUFFN0NRLFNBQVN5QyxJQUFJLENBQUM7WUFDVkgsZUFBZTtZQUNmTCxTQUFTO1lBQ1RsQyxNQUFTd0MsSUFBSUMsTUFBTTtZQUNuQixHQUFHUiwrQ0FBT0EsQ0FBQ08sSUFBSUMsTUFBTSxDQUFDO1lBQ3RCLHFCQUFxQjtZQUNyQkUsUUFBWUgsSUFBSUMsTUFBTSxDQUFDLEVBQUUsQ0FBQ0UsTUFBTSxHQUFHO1lBQ25DQyxZQUFZM0QsS0FBSzJELFVBQVU7UUFDL0I7SUFDSjtJQUVBLE1BQU1DLFVBQVUsSUFBSXBFLG9EQUFPQSxDQUFDUSxNQUFNLHdCQUF3QixNQUFNLE1BQU07V0FDM0RnQixTQUFTMkIsR0FBRyxDQUFFQyxDQUFBQSxJQUFLVixvREFBWUEsQ0FBQ1UsR0FBR1Q7S0FDekM7SUFFTCxJQUFJLElBQUl4QixJQUFJLEdBQUdBLElBQUlpRCxRQUFRNUMsUUFBUSxDQUFDUixNQUFNLEdBQUMsR0FBRyxFQUFFRyxFQUFHO1FBQy9DLE1BQU1rRCxLQUFLRCxRQUFRNUMsUUFBUSxDQUFDTCxFQUFFLENBQUNLLFFBQVE7UUFDdkM0QyxRQUFRNUMsUUFBUSxDQUFDTCxFQUFFLENBQUNtRCxNQUFNLENBQUM1QyxHQUFHLEdBQUcyQyxFQUFFLENBQUNBLEdBQUdyRCxNQUFNLEdBQUMsRUFBRSxDQUFDc0QsTUFBTSxDQUFDNUMsR0FBRztJQUMvRDtJQUVBLE9BQU8wQztBQUNYO0FBRUEvQixRQUFRZ0IsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0Q0QjtBQUdwQyxTQUFTcEQsT0FBc0JJLE1BQWU7SUFFekQsSUFBSUYsS0FBSztJQUNULElBQUksSUFBSWdCLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNLLFFBQVEsQ0FBQ1IsTUFBTSxFQUFFLEVBQUVHLEVBQ3ZDaEIsTUFBTVksNENBQUlBLENBQUMsSUFBSSxDQUFDUyxRQUFRLENBQUNMLEVBQUUsRUFBRWQ7SUFDakMsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUb0Y7QUFDMUM7QUFFM0IsU0FBU2tDLFFBQVE3QixJQUFTLEVBQUVtQyxPQUFnQjtJQUV2RCxNQUFNbkIsV0FBVztRQUNiO1lBQ0lzQyxlQUFlO1lBQ2YsR0FBR3RELElBQUk7UUFDWDtRQUNBO1lBQ0lzRCxlQUFlO1lBQ2YsR0FBR04sK0NBQU9BLENBQUNoRCxLQUFLK0QsUUFBUSxDQUFDO1lBQ3pCQSxVQUFVL0QsS0FBSytELFFBQVE7UUFDM0I7S0FDSDtJQUVELE1BQU1ILFVBQVUsSUFBSXBFLG9EQUFPQSxDQUFDUSxNQUFNLHlCQUF5QixNQUFNLE1BQU07V0FDaEVnQixTQUFTMkIsR0FBRyxDQUFFQyxDQUFBQSxJQUFLVixvREFBWUEsQ0FBQ1UsR0FBR1Q7S0FDekM7SUFFRCxhQUFhO0lBQ2J5QixRQUFRNUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzhDLE1BQU0sQ0FBQzVDLEdBQUcsR0FBRzBDLFFBQVE1QyxRQUFRLENBQUMsRUFBRSxDQUFDOEMsTUFBTSxDQUFDaEQsS0FBSztJQUVqRSxPQUFPOEM7QUFDWDtBQUVBL0IsUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQzNCNEI7QUFHcEMsU0FBU3BELE9BQXNCSSxNQUFlO0lBRXpELElBQUlGLEtBQUtZLDRDQUFJQSxDQUFDLFlBQVlWLFNBQVMsU0FBUztJQUN4Q0YsTUFBS2lCLCtDQUFPQSxDQUFDLElBQUksRUFBRWYsUUFBUTtJQUUvQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1QyRTtBQUNqQztBQUUzQixTQUFTa0MsUUFBUTdCLElBQVMsRUFBRW1DLE9BQWdCO0lBRXZELG9CQUFvQjtJQUNwQixPQUFPLElBQUkzQyxvREFBT0EsQ0FBQ1EsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxNQUFNO1FBQ3ZEaUMsb0RBQVlBLENBQUNqQyxNQUFNbUM7S0FDdEI7QUFDTDtBQUVBTixRQUFRZ0IsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDWDRCO0FBR3BDLFNBQVNwRCxPQUFzQkksTUFBZTtJQUV6RG1FLFFBQVFDLEdBQUcsQ0FBQyxTQUFTO1FBQUMsR0FBR3BFLE1BQU07SUFBQTtJQUUvQixJQUFJRixLQUFLWSw0Q0FBSUEsQ0FBQyxxQkFBcUJWO0lBQ25DRixNQUFLUSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVOLFFBQVE7SUFDM0JGLE1BQUtZLDRDQUFJQSxDQUFDLHNEQUFzRFY7SUFDaEVGLE1BQUtRLCtDQUFPQSxDQUFDLElBQUksRUFBRU4sUUFBUTtJQUMzQkYsTUFBS1ksNENBQUlBLENBQUMsZ0NBQWdDVjtJQUMxQ0YsTUFBS1EsK0NBQU9BLENBQUMsSUFBSSxFQUFFTixRQUFRO0lBQzNCRixNQUFLWSw0Q0FBSUEsQ0FBQyxxQ0FBcUNWO0lBQzNDLFFBQVE7SUFDUkYsTUFBS1EsK0NBQU9BLENBQUMsSUFBSSxFQUFFTixRQUFRO0lBQzNCRixNQUFNWSw0Q0FBSUEsQ0FBQywyQ0FBMkNWO0lBQzFERixNQUFLUSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVOLFFBQVE7SUFFM0JGLE1BQUtRLCtDQUFPQSxDQUFDLElBQUksRUFBRU4sUUFBUTtJQUMzQixLQUFJLElBQUlxRSxXQUFXLElBQUksQ0FBQ2xELFFBQVEsQ0FDNUJyQixNQUFLWSw0Q0FBSUEsQ0FBQzJELFNBQVNyRTtJQUV2QkYsTUFBS1ksNENBQUlBLENBQUMsNEJBQTRCVixTQUFTLFNBQVM7SUFFeERGLE1BQUtRLCtDQUFPQSxDQUFDLElBQUksRUFBRU4sUUFBUTtJQUMzQkYsTUFBS1ksNENBQUlBLENBQUMsS0FBS1Y7SUFDZixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCMkU7QUFDakM7QUFFM0IsU0FBU2tDLFFBQVE3QixJQUFTLEVBQUVtQyxPQUFnQjtJQUV2RCxPQUFPLElBQUkzQyxvREFBT0EsQ0FBQ1EsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsTUFBTSxNQUN0REEsS0FBSytELFFBQVEsQ0FBQ3BCLEdBQUcsQ0FBRSxDQUFDd0IsSUFBVWpDLG9EQUFZQSxDQUFDaUMsR0FBR2hDO0FBRXREO0FBRUFOLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ052QixTQUFTdUIsYUFBYUMsS0FBZTtJQUNuQyxPQUFPQSxNQUFNQyxNQUFNLENBQUU3RCxDQUFBQSxJQUFLQSxFQUFFZSxRQUFRLENBQUMsY0FBZSxrQkFBa0I7QUFDeEU7QUFHQSxTQUFTK0MsNkJBQTZCdEUsS0FBZ0IsRUFBRUgsSUFBWSxFQUFFQyxHQUFXO0lBRS9FLElBQUksSUFBSVksSUFBSSxHQUFHQSxJQUFJVixNQUFNTyxNQUFNLEVBQUUsRUFBRUcsRUFBRztRQUVsQyxJQUFJVixLQUFLLENBQUNVLEVBQUUsQ0FBQ00sTUFBTSxDQUFFSCxLQUFLLENBQUNoQixJQUFJLEdBQUdBLFFBQy9CRyxLQUFLLENBQUNVLEVBQUUsQ0FBQ00sTUFBTSxDQUFFSCxLQUFLLENBQUNoQixJQUFJLEtBQUtBLFFBQVFHLEtBQUssQ0FBQ1UsRUFBRSxDQUFDTSxNQUFNLENBQUVILEtBQUssQ0FBQ2YsR0FBRyxHQUFHQSxLQUNwRSxPQUFPO1FBRVgsSUFBT0UsS0FBSyxDQUFDVSxFQUFFLENBQUNNLE1BQU0sQ0FBRUMsR0FBRyxDQUFDcEIsSUFBSSxHQUFHQSxRQUM1QkcsS0FBSyxDQUFDVSxFQUFFLENBQUNNLE1BQU0sQ0FBRUMsR0FBRyxDQUFDcEIsSUFBSSxLQUFLQSxRQUFRRyxLQUFLLENBQUNVLEVBQUUsQ0FBQ00sTUFBTSxDQUFFQyxHQUFHLENBQUNuQixHQUFHLEdBQUdBLEtBQ3RFO1lBQ0UsSUFBSUMsT0FBT3VFLDZCQUE2QnRFLEtBQUssQ0FBQ1UsRUFBRSxDQUFDSyxRQUFRLEVBQUVsQixNQUFNQztZQUNqRSxJQUFJQyxTQUFTLE1BQ1QsT0FBT0E7WUFDWCxPQUFPQyxLQUFLLENBQUNVLEVBQUU7UUFDbkI7SUFDSjtJQUVBLE9BQU8sTUFBTSxvQ0FBb0M7QUFDbkQ7QUFFTyxTQUFTNkQsa0JBQWtCQyxTQUFvQixFQUFFL0UsR0FBUTtJQUM5RCxPQUFPNkUsNkJBQTZCN0UsSUFBSU8sS0FBSyxFQUFFd0UsU0FBUyxDQUFDLEVBQUUsRUFBRUEsU0FBUyxDQUFDLEVBQUU7QUFDM0U7QUFJQSxlQUFlO0FBQ1IsU0FBU0MsZUFBZUwsS0FBa0IsRUFBRTNFLEdBQVE7SUFDekQsT0FBTzJFLE1BQU0xQixHQUFHLENBQUVsQyxDQUFBQSxJQUFLK0Qsa0JBQWtCL0QsR0FBR2Y7QUFDOUM7QUFFQSxtQkFBbUI7QUFDWixTQUFTaUYsWUFBWU4sS0FBVSxFQUFFM0UsR0FBUTtJQUU1QzJFLFFBQVFBLE1BQU1PLEtBQUssQ0FBQztJQUVwQixNQUFNQyxPQUFPUixLQUFLLENBQUMsRUFBRSxLQUFJO0lBRXpCLE9BQU9ELGFBQWFDLE9BQU8xQixHQUFHLENBQUVtQyxDQUFBQTtRQUU5QixJQUFJLENBQUNDLEdBQUdDLE9BQU9DLEtBQUssR0FBR0gsRUFBRUYsS0FBSyxDQUFDO1FBRS9CLElBQUlLLElBQUksQ0FBQ0EsS0FBS3pFLE1BQU0sR0FBQyxFQUFFLEtBQUssS0FDMUJ5RSxPQUFPQSxLQUFLQyxLQUFLLENBQUMsR0FBRSxDQUFDO1FBRXZCLElBQUlwRixPQUFPLENBQUNrRixRQUFRO1FBQ3BCLElBQUlqRixNQUFPLENBQUNrRjtRQUVaLEVBQUVsRixLQUFLLGNBQWM7UUFFckIsSUFBSW9GO1FBQ0osSUFBSU4sTUFBTztZQUNULElBQUlPLE1BQU1MLEVBQUVNLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCRixXQUFXSixFQUFFRyxLQUFLLENBQUMsR0FBR0U7WUFDdEIsSUFBSUQsYUFBYSxRQUNmQSxXQUFXO1lBRWIsTUFBTW5GLE9BQU91RSw2QkFBNkI3RSxJQUFJTyxLQUFLLEVBQUVILE1BQU1DO1lBQzNELElBQUdDLEtBQUt5QixJQUFJLEtBQUssVUFDZjFCLE9BQU9DLEtBQUtxQixLQUFLLENBQUNiLE1BQU0sRUFBRSxtRUFBbUU7UUFFakcsT0FBTztZQUNMLElBQUk0RSxNQUFNTCxFQUFFTSxPQUFPLENBQUM7WUFDcEJGLFdBQVdKLEVBQUVHLEtBQUssQ0FBQyxHQUFHRTtZQUN0QixJQUFJRCxhQUFhLGFBQ2ZBLFdBQVc7UUFDZjtRQUVBLE9BQU87WUFBQ0E7WUFBVXJGO1lBQU1DO1NBQUk7SUFDOUI7QUFDSjtBQUVBLFNBQVN1RixzQkFBc0JDLEdBQWlCLEVBQUU3RixHQUFRO0lBRXRELHVCQUF1QjtJQUV2QnNFLFFBQVF3QixJQUFJLENBQUMsYUFBYUQ7SUFFMUIsTUFBTWxCLFFBQVFNLFlBQWEsSUFBYWMsU0FBUyxDQUFDcEIsS0FBSyxFQUFFM0U7SUFDekQsTUFBTU8sUUFBUXlFLGVBQWVMLE9BQU8zRTtJQUNwQyx3QkFBd0I7SUFDeEIsTUFBTWdHLFlBQVlyQixNQUFNMUIsR0FBRyxDQUFFLENBQUNtQyxHQUFFbkUsSUFBTSxDQUFDLG9CQUFvQixFQUFFVixLQUFLLENBQUNVLEVBQUUsQ0FBQ21ELE1BQU0sQ0FBQ2hELEtBQUssQ0FBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUV1RSxLQUFLLENBQUMxRCxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUcsSUFBSWdGLGdCQUNSLENBQUM7RUFDQyxFQUFFRCxVQUFVRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDWCxDQUFDO0lBRWI1QixRQUFRQyxHQUFHLENBQUMwQjtBQUNoQjtBQUVBLGlFQUFlO0lBQ1hMO0FBQ0osQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkdpRDtBQUdwQyxTQUFTN0YsT0FBc0JJLE1BQWU7SUFFekRtRSxRQUFRQyxHQUFHLENBQUMsT0FBTztRQUFDLEdBQUdwRSxNQUFNO0lBQUE7SUFFN0IsSUFBSUYsS0FBS1ksNENBQUlBLENBQUMsT0FBT1Y7SUFDakJGLE1BQUtpQiwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVmO0lBRXZCbUUsUUFBUUMsR0FBRyxDQUFDLE9BQU87UUFBQyxHQUFHcEUsTUFBTTtJQUFBO0lBRTdCLE9BQU9GO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYjJFO0FBQ2pDO0FBRTNCLFNBQVNrQyxRQUFRN0IsSUFBUyxFQUFFbUMsT0FBZ0I7SUFFdkQsT0FBTyxJQUFJM0Msb0RBQU9BLENBQUNRLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sTUFBTTtRQUNyRGlDLG9EQUFZQSxDQUFDakMsTUFBTW1DO0tBQ3RCO0FBQ0w7QUFFQU4sUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZtQjtBQUczQixTQUFTcEQsT0FBc0JJLE1BQWU7SUFFekQsSUFBSUYsS0FBS1ksNENBQUlBLENBQUNILHlDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQ1ksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRW5CO0lBQzdDRixNQUFNaUIsK0NBQU9BLENBQUMsSUFBSSxFQUFFZixRQUFRO0lBRTVCLE9BQU9GO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVDJFO0FBQ2pDO0FBRTNCLFNBQVNrQyxRQUFRN0IsSUFBUyxFQUFFbUMsT0FBZ0I7SUFFdkQsT0FBTyxJQUFJM0Msb0RBQU9BLENBQUNRLE1BQU0sc0JBQXNCLE1BQU0sTUFBTTtRQUN2RGtDLG9EQUFZQSxDQUFDbEMsS0FBS21ELElBQUksRUFBRWhCO1FBQ3hCRixvREFBWUEsQ0FBQ2pDLE1BQU1tQztLQUN0QjtBQUNMO0FBRUFOLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYVTtBQUdsQixTQUFTcEQsT0FBc0JJLE1BQWU7SUFFekQsSUFBSUYsS0FBSztJQUNULElBQUksSUFBSSxDQUFDcUIsUUFBUSxDQUFDLEVBQUUsQ0FBQ29DLFdBQVcsRUFBRXlDLFdBQVcsV0FDekNsRyxNQUFLWSw0Q0FBSUEsQ0FBQyxRQUFRVjtJQUV0QkYsTUFBTVksNENBQUlBLENBQUNILHlDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNZLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUVuQjtJQUVwQyxvQkFBb0I7SUFDcEIsSUFBSSxJQUFJYyxJQUFJLEdBQUdBLElBQUksSUFBSSxDQUFDSyxRQUFRLENBQUNSLE1BQU0sRUFBRSxFQUFFRyxFQUFHO1FBRTFDLElBQUlBLE1BQU0sR0FDTmhCLE1BQU1ZLDRDQUFJQSxDQUFDLE1BQU1WO1FBRXJCRixNQUFNWSw0Q0FBSUEsQ0FBQyxJQUFJLENBQUNTLFFBQVEsQ0FBQ0wsRUFBRSxFQUFFZDtJQUNqQztJQUVBRixNQUFNWSw0Q0FBSUEsQ0FBQyxLQUFLVjtJQUVoQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCK0M7QUFDTDtBQUUzQixTQUFTa0MsUUFBUTdCLElBQVMsRUFBRW1DLE9BQWdCO0lBRXZELHdDQUF3QztJQUN4QyxlQUFlO0lBQ2YsT0FBTyxJQUFJM0Msb0RBQU9BLENBQUNRLE1BQU0sa0JBQWtCLE1BQU0sTUFBTTtRQUNuRGtDLG9EQUFZQSxDQUFDbEMsS0FBSzBDLElBQUksRUFBRVA7V0FDckJuQyxLQUFLTSxJQUFJLENBQUNxQyxHQUFHLENBQUUsQ0FBQ2xDLElBQVV5QixvREFBWUEsQ0FBQ3pCLEdBQUcwQjtLQUNoRDtBQUNMO0FBRUFOLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiNEI7QUFHcEMsU0FBU3BELE9BQXNCSSxNQUFlO0lBRXpELElBQUlGLEtBQUtZLDRDQUFJQSxDQUFDSCx5Q0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUNpQixLQUFLLENBQUMsQ0FBQyxFQUFFeEI7SUFFekNGLE1BQU13QiwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUV0QjtJQUNwQkYsTUFBTWlCLCtDQUFPQSxDQUFDLElBQUksRUFBRWYsUUFBUTtJQUU1QixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1gyRTtBQUNqQztBQUUzQixTQUFTa0MsUUFBUTdCLElBQVMsRUFBRW1DLE9BQWdCO0lBRXZELE1BQU03QixPQUFPd0Ysb0RBQVlBLENBQUM5RixNQUFNbUM7SUFFaEMsK0NBQStDO0lBQy9DQSxVQUFVO1FBQ04sR0FBR0EsT0FBTztJQUNkO0lBQ0FBLFFBQVFHLGVBQWUsR0FBRztRQUFDLEdBQUdILFFBQVFHLGVBQWU7SUFBQTtJQUNyRCxLQUFJLElBQUl5RCxPQUFPekYsS0FBS1UsUUFBUSxDQUN4Qm1CLFFBQVFHLGVBQWUsQ0FBQ3lELElBQUkxRSxLQUFLLENBQUMsR0FBRzBFLElBQUkzQyxXQUFXO0lBRXhELGlDQUFpQztJQUVqQyxPQUFPLElBQUk1RCxvREFBT0EsQ0FBQ1EsTUFBTSxpQkFBaUIsTUFBTUEsS0FBS2dHLElBQUksRUFBRTtRQUN2RDFGO1FBQ0EyQixvREFBWUEsQ0FBQ2pDLE1BQU1tQztLQUN0QjtBQUNMO0FBRUFOLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QlU7QUFHbEIsU0FBU3BELE9BQXNCSSxNQUFlO0lBRXpELE9BQU9VLDRDQUFJQSxDQUFDSCx5Q0FBQyxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQ1ksUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRW5CO0FBQ3BFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNMO0FBRTNCLFNBQVNnQyxRQUFRN0IsSUFBUyxFQUFFbUMsT0FBZ0I7SUFHdkQsT0FBTyxJQUFJM0Msb0RBQU9BLENBQUNRLE1BQU0sa0JBQWtCLE1BQU0sTUFBTTtRQUNuRGtDLG9EQUFZQSxDQUFDbEMsS0FBS2lHLEdBQUcsRUFBRTlEO0tBQzFCO0FBQ0w7QUFFQU4sUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hoQixNQUFNcUQsb0JBQW9CN0M7SUFFcEI4QyxpQkFBc0I7SUFFL0IzRCxZQUFZMkQsZ0JBQXFCLENBQUU7UUFDL0IsS0FBSztRQUNMQSxpQkFBaUJWLFNBQVMsR0FBRyxJQUFJO1FBQ2pDLElBQUksQ0FBQ1UsZ0JBQWdCLEdBQUdBO0lBQzVCO0FBQ0o7QUFHQSxpRUFBZTtJQUNYRDtBQUNKLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkaUQ7QUFDSjtBQUNJO0FBQ0o7QUFDRTtBQUNKO0FBQ1k7QUFDSjtBQUNHO0FBQ0o7QUFDSTtBQUNKO0FBQ0s7QUFDSjtBQUNJO0FBQ0o7QUFDTTtBQUNKO0FBQ0c7QUFDSjtBQUNLO0FBQ0o7QUFDSztBQUNKO0FBQ0M7QUFDRTtBQUNKO0FBQ0s7QUFDSjtBQUNRO0FBQ0o7QUFDTztBQUNKO0FBQ0M7QUFDTztBQUNKO0FBQ1c7QUFDSjtBQUNEO0FBQ0o7QUFDSDtBQUNKO0FBQ0E7QUFDSjtBQUNKO0FBQ0o7QUFHbEQsTUFBTWdELFVBQVU7SUFDZixVQUFVO1FBQ1RDLGFBQWEvQyw2REFBYUE7UUFDckJnRCxRQUFhL0MseURBQVFBO0lBQzNCO0lBQ0EsVUFBVTtRQUNUOEMsYUFBYTdDLDZEQUFhQTtRQUNyQjhDLFFBQWE3Qyx5REFBUUE7SUFDM0I7SUFDQSxRQUFRO1FBQ1A0QyxhQUFhM0MsMkRBQWFBO1FBQ3JCNEMsUUFBYTNDLHVEQUFRQTtJQUMzQjtJQUNBLGdCQUFnQjtRQUNmMEMsYUFBYXpDLGdFQUFhQTtRQUNyQjBDLFFBQWF6Qyw0REFBUUE7SUFDM0I7SUFDQSxlQUFlO1FBQ2R3QyxhQUFhdkMsZ0VBQWFBO1FBQ3JCd0MsUUFBYXZDLDREQUFRQTtJQUMzQjtJQUNBLGVBQWU7UUFDZHNDLGFBQWFyQyxpRUFBYUE7UUFDckJzQyxRQUFhckMsNkRBQVFBO0lBQzNCO0lBQ0EsZ0JBQWdCO1FBQ2ZvQyxhQUFhbkMsb0VBQWFBO1FBQ3JCb0MsUUFBYW5DLGdFQUFRQTtJQUMzQjtJQUNBLGdCQUFnQjtRQUNma0MsYUFBYWpDLG9FQUFhQTtRQUNyQmtDLFFBQWFqQyxnRUFBUUE7SUFDM0I7SUFDQSxrQkFBa0I7UUFDakJnQyxhQUFhL0Isc0VBQWFBO1FBQ3JCZ0MsUUFBYS9CLGtFQUFRQTtJQUMzQjtJQUNBLGlCQUFpQjtRQUNoQjhCLGFBQWE3QixxRUFBYUE7UUFDckI4QixRQUFhN0IsaUVBQVFBO0lBQzNCO0lBQ0EsaUJBQWlCO1FBQ2hCNEIsYUFBYTNCLHFFQUFjQTtRQUN0QjRCLFFBQWEzQixpRUFBU0E7SUFDNUI7SUFDQSxrQkFBa0I7UUFDakIwQixhQUFhekIsc0VBQWNBO1FBQ3RCMEIsUUFBYXpCLGtFQUFTQTtJQUM1QjtJQUNBLGlCQUFpQjtRQUNoQndCLGFBQWF0QixxRUFBY0E7UUFDdEJ1QixRQUFhdEIsaUVBQVNBO0lBQzVCO0lBQ0Esa0JBQWtCO1FBQ2pCcUIsYUFBYXBCLHNFQUFjQTtRQUN0QnFCLFFBQWFwQixrRUFBU0E7SUFDNUI7SUFDQSxzQkFBc0I7UUFDckJtQixhQUFhbEIsMEVBQWNBO1FBQ3RCbUIsUUFBYWxCLHNFQUFTQTtJQUM1QjtJQUNBLHlCQUF5QjtRQUN4QmlCLGFBQWFoQiw2RUFBY0E7UUFDdEJpQixRQUFhaEIseUVBQVNBO0lBQzVCO0lBQ0EsNkJBQTZCO1FBQzVCZSxhQUFhYixpRkFBY0E7UUFDdEJjLFFBQWFiLDZFQUFTQTtJQUM1QjtJQUNBLG9DQUFvQztRQUNuQ1ksYUFBYVgsd0ZBQWNBO1FBQ3RCWSxRQUFhWCxvRkFBU0E7SUFDNUI7SUFDQSwrQkFBK0I7UUFDOUJVLGFBQWFULG1GQUFjQTtRQUN0QlUsUUFBYVQsK0VBQVNBO0lBQzVCO0lBQ0Esd0JBQXdCO1FBQ3ZCUSxhQUFhUCw0RUFBY0E7UUFDdEJRLFFBQWFQLHdFQUFTQTtJQUM1QjtJQUNBLG9CQUFvQjtRQUNuQk0sYUFBYUwsd0VBQWNBO1FBQ3RCTSxRQUFhTCxvRUFBU0E7SUFDNUI7SUFDQSxZQUFZO1FBQ1hJLGFBQWFILGdFQUFjQTtRQUN0QkksUUFBYUgsNERBQVNBO0lBQzVCO0FBQ0Q7QUFFQSxpRUFBZUMsT0FBT0EsRUFBQztBQUd2QixNQUFNRyxVQUFVLENBQUM7QUFDakJDLE9BQU9DLE1BQU0sQ0FBQ0YsU0FBU3pCLG1FQUFVQTtBQUNqQzBCLE9BQU9DLE1BQU0sQ0FBQ0YsU0FBU2hCLDBFQUFVQTtBQUcxQixNQUFNbUIsTUFBTUgsUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztBQ25KTTtBQUdsQixTQUFTNUosT0FBcUJJLE1BQWU7SUFDeEQsT0FBT1UsNENBQUlBLENBQUNILHlDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNpQixLQUFLLENBQUMsQ0FBQyxFQUFFeEI7QUFDbEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKMEM7QUFFM0IsU0FBU2dDLFFBQVE3QixJQUFTLEVBQUU4QixRQUFpQjtJQUV4RCxJQUFJLENBQUcsUUFBTzlCLEtBQUtxQixLQUFLLEtBQUssUUFBTyxLQUN6QixDQUFFLGdCQUFlckIsS0FBS3FCLEtBQUssS0FDM0JyQixLQUFLcUIsS0FBSyxDQUFDb0ksU0FBUyxDQUFDQyxZQUFZLEtBQUssWUFDN0M7SUFFSixPQUFPLElBQUlsSyxvREFBT0EsQ0FBQ1EsTUFBTSxpQkFBaUIsUUFBUTtBQUN0RDtBQUVBNkIsUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ2JVO0FBR2xCLFNBQVNwRCxPQUFzQkksTUFBZTtJQUV6RCxPQUFPVSw0Q0FBSUEsQ0FBQ0gseUNBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ2lCLEtBQUssQ0FBQyxDQUFDLEVBQUV4QjtBQUNsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0wwQztBQUUzQixTQUFTZ0MsUUFBUTdCLElBQVMsRUFBRThCLFFBQWlCO0lBRXhELElBQUksT0FBTzlCLEtBQUtxQixLQUFLLEtBQUssV0FDdEI7SUFFSixPQUFPLElBQUk3QixvREFBT0EsQ0FBQ1EsTUFBTSxpQkFBaUIsUUFBUUEsS0FBS3FCLEtBQUs7QUFDaEU7QUFFQVEsUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hVO0FBR2xCLFNBQVNwRCxPQUFzQkksTUFBZTtJQUV6RCxPQUFPVSw0Q0FBSUEsQ0FBQ0gseUNBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ2lCLEtBQUssQ0FBQyxDQUFDLEVBQUV4QjtBQUNsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0wwQztBQUUzQixTQUFTZ0MsUUFBUTdCLElBQVMsRUFBRThCLFFBQWlCO0lBRXhELElBQUksQ0FBRzlCLENBQUFBLEtBQUtxQixLQUFLLFlBQVlpSSxNQUFLLEtBQU10SixLQUFLcUIsS0FBSyxDQUFDb0ksU0FBUyxFQUFFQyxpQkFBaUIsU0FDM0U7SUFFSixPQUFPLElBQUlsSyxvREFBT0EsQ0FBQ1EsTUFBTSxrQkFBa0IsU0FBU0EsS0FBS3FCLEtBQUssQ0FBQ0EsS0FBSztBQUN4RTtBQUVBUSxRQUFRZ0IsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDWFU7QUFHbEIsU0FBU3BELE9BQXNCSSxNQUFlO0lBQ3pELE9BQU9VLDRDQUFJQSxDQUFDSCx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDaUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFeEI7QUFDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKMEM7QUFFM0IsU0FBU2dDLFFBQVE3QixJQUFTLEVBQUU4QixRQUFpQjtJQUV4RCxJQUFJLE9BQU85QixLQUFLcUIsS0FBSyxLQUFLLFVBQ3RCO0lBRUosT0FBTyxJQUFJN0Isb0RBQU9BLENBQUNRLE1BQU0sZ0JBQWdCLE9BQU9BLEtBQUtxQixLQUFLO0FBQzlEO0FBRUFRLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYVTtBQUdsQixTQUFTcEQsT0FBc0JJLE1BQWU7SUFDekQsT0FBT1UsNENBQUlBLENBQUNILHlDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ2lCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRXhCO0FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSjBDO0FBRTNCLFNBQVNnQyxRQUFRN0IsSUFBUyxFQUFFOEIsUUFBaUI7SUFFeEQsSUFBSSxPQUFPOUIsS0FBS3FCLEtBQUssS0FBSyxVQUN0QjtJQUVKLE9BQU8sSUFBSTdCLG9EQUFPQSxDQUFDUSxNQUFNLGdCQUFnQixPQUFPQSxLQUFLcUIsS0FBSztBQUM5RDtBQUVBUSxRQUFRZ0IsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDWFU7QUFHbEIsU0FBU3BELE9BQXNCSSxNQUFlO0lBRXpELE9BQU9VLDRDQUFJQSxDQUFDSCx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDWSxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUNBLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFbkI7QUFDOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ0w7QUFFM0IsU0FBU2dDLFFBQVE3QixJQUFTLEVBQUVtQyxPQUFnQjtJQUV2RCxJQUFJLENBQUcsU0FBUW5DLElBQUcsR0FDZDtJQUVKLElBQUkySixLQUFLM0osS0FBSzJKLEVBQUUsQ0FBQ25ILFdBQVcsQ0FBQ0MsS0FBSztJQUNsQyxJQUFJa0gsT0FBTyxPQUNQQSxLQUFLO0lBRVQsSUFBSUEsT0FBTyxNQUNQO0lBRUosU0FBUztJQUNULE9BQU8sSUFBSW5LLG9EQUFPQSxDQUFDUSxNQUFNLGVBQWUsTUFBTTJKLElBQzFDO1FBQ0l6SCxvREFBWUEsQ0FBQ2xDLEtBQUs0SixJQUFJLEVBQUd6SDtRQUN6QkQsb0RBQVlBLENBQUNsQyxLQUFLNkosS0FBSyxFQUFFMUg7S0FDNUI7QUFFVDs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCaUM7QUFHbEIsU0FBUzFDLE9BQXNCSSxNQUFlO0lBRXpELElBQUlGLEtBQUs7SUFDVCxJQUFJLElBQUksQ0FBQzhCLElBQUksQ0FBQ3FJLFFBQVEsQ0FBQyxXQUNuQm5LLE1BQU1ZLDRDQUFJQSxDQUFDLFFBQVFWO0lBRXZCRixNQUFNWSw0Q0FBSUEsQ0FBQ0gseUNBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ1ksUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDQSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRW5CO0lBRXpELE9BQU9GO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWitDO0FBQ0w7QUFFM0IsU0FBU2tDLFFBQVE3QixJQUFTLEVBQUVtQyxPQUFnQjtJQUV2RCxJQUFJQyxTQUFTcEMsS0FBS29DLE1BQU07SUFDeEIsSUFBSSxhQUFhcEMsTUFDYm9DLFNBQVNwQyxLQUFLK0osT0FBTyxDQUFDLEVBQUU7SUFFNUIsTUFBTUgsT0FBUTFILG9EQUFZQSxDQUFDRSxRQUFRRDtJQUNuQyxNQUFNMEgsUUFBUTNILG9EQUFZQSxDQUFDbEMsS0FBS3FCLEtBQUssRUFBT2M7SUFFNUMsSUFBSTZILGFBQTBCSCxNQUFNekcsV0FBVztJQUMvQyxJQUFJLGdCQUFnQnBELE1BQU07UUFDdEJnSyxhQUFhaEssS0FBS2lLLFVBQVUsQ0FBQzVILEVBQUUsSUFBSTtRQUNuQyxJQUFJd0gsTUFBTXpHLFdBQVcsS0FBSyxRQUFReUcsTUFBTXpHLFdBQVcsS0FBSzRHLFlBQ3BELE1BQU0sSUFBSTNHLE1BQU07SUFDeEI7SUFFQSxJQUFJNUIsT0FBTztJQUVYLElBQUltSSxLQUFLbkksSUFBSSxLQUFLLFVBQVU7UUFFeEIsMEJBQTBCO1FBQzFCLElBQUltSSxLQUFLdkksS0FBSyxJQUFJYyxRQUFRRyxlQUFlLEVBQUU7WUFDdkMsTUFBTWMsY0FBY2pCLFFBQVFHLGVBQWUsQ0FBQ3NILEtBQUt2SSxLQUFLLENBQUM7WUFDdkQsSUFBSStCLGdCQUFnQixRQUFRNEcsZUFBZTVHLGFBQ3ZDLE1BQU0sSUFBSUMsTUFBTTtRQUVwQixrQkFBa0I7UUFDdEIsT0FBTztZQUNIbEIsUUFBUUcsZUFBZSxDQUFDc0gsS0FBS3ZJLEtBQUssQ0FBQyxHQUFHMkk7WUFDdEN2SSxRQUFRO1FBQ1o7SUFDSjtJQUVBLE9BQU8sSUFBSWpDLG9EQUFPQSxDQUFDUSxNQUFNeUIsTUFBTXVJLFlBQVksTUFDdkM7UUFDSUo7UUFDQUM7S0FDSDtBQUVUO0FBRUFoSSxRQUFRZ0IsWUFBWSxHQUFHO0lBQUM7SUFBVTtDQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUNiO0FBR2xCLFNBQVNwRCxPQUFzQkksTUFBZTtJQUV6RCxtQkFBbUI7SUFDbkIsVUFBVTtJQUVWLE9BQU9VLDRDQUFJQSxDQUFDSCx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDWSxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUNBLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFbkI7QUFDL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVCtDO0FBQ0w7QUFFM0IsU0FBU2dDLFFBQVE3QixJQUFTLEVBQUVtQyxPQUFnQjtJQUV2RCxNQUFNeUgsT0FBUTFILG9EQUFZQSxDQUFDbEMsS0FBSzRKLElBQUksRUFBRXpIO0lBQ3RDLE1BQU0wSCxRQUFRM0gsb0RBQVlBLENBQUNsQyxLQUFLa0ssV0FBVyxDQUFDLEVBQUUsRUFBRS9IO0lBRWhELElBQUd5SCxLQUFLeEcsV0FBVyxLQUFLLFFBQVF5RyxNQUFNekcsV0FBVyxLQUFLLE1BQU07UUFDeEQsaUNBQWlDO1FBQ2pDLE1BQU0sSUFBSUMsTUFBTTtJQUNwQjtJQUVBLE9BQU8sSUFBSTdELG9EQUFPQSxDQUFDUSxNQUFNLGdCQUFnQixRQUFRLE1BQzdDO1FBQ0k0SjtRQUNBQztLQUNIO0FBRVQ7QUFFQWhJLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQk87QUFHZixTQUFTcEQsT0FBc0JJLE1BQWU7SUFDekQsT0FBT1UsNENBQUlBLENBQUMseUJBQXlCVjtBQUN6Qzs7Ozs7Ozs7Ozs7Ozs7OztBQ0owQztBQUUzQixTQUFTZ0MsUUFBUTdCLElBQVMsRUFBRThCLFFBQWlCO0lBQ3hELE9BQU8sSUFBSXRDLG9EQUFPQSxDQUFDUSxNQUFNLFFBQVE7QUFDckM7QUFHQTZCLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSVTtBQUdsQixTQUFTcEQsT0FBc0JJLE1BQWU7SUFFekQsSUFBSSxJQUFJLENBQUNtQixRQUFRLENBQUNSLE1BQU0sS0FBSyxHQUN6QixPQUFPRCw0Q0FBSUEsQ0FBQyxVQUFVVjtJQUUxQixPQUFPVSw0Q0FBSUEsQ0FBQ0gseUNBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDWSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRW5CO0FBQy9DOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1QrQztBQUNMO0FBRTNCLFNBQVNnQyxRQUFRN0IsSUFBUyxFQUFFbUMsT0FBZ0I7SUFFdkQsSUFBR25DLEtBQUtxQixLQUFLLEtBQUs4SSxXQUNkLE9BQU8sSUFBSTNLLG9EQUFPQSxDQUFDUSxNQUFNLFVBQVUsUUFBUTtJQUUvQyxNQUFNb0ssT0FBT2xJLG9EQUFZQSxDQUFDbEMsS0FBS3FCLEtBQUssRUFBRWM7SUFDdEMsT0FBTyxJQUFJM0Msb0RBQU9BLENBQUNRLE1BQU0sVUFBVW9LLEtBQUtoSCxXQUFXLEVBQUUsTUFBTTtRQUFDZ0g7S0FBSztBQUNyRTtBQUVBdkksUUFBUWdCLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pPO0FBR2YsU0FBU3BELE9BQXNCSSxNQUFlO0lBQ3pELE9BQU9VLDRDQUFJQSxDQUFDLElBQUksQ0FBQ2MsS0FBSyxFQUFFeEIsU0FBUyxNQUFNO0FBQzNDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0wyQztBQUVEO0FBRTFDLFNBQVN5SyxRQUFRdkYsQ0FBVTtJQUN2QixPQUFPO0FBQ1g7QUFFZSxTQUFTbEQsUUFBUTdCLElBQVMsRUFBRW1DLE9BQWdCO0lBRXZELElBQUlpQixjQUFjO0lBQ2xCLElBQUkvQixRQUFRckIsS0FBS3FDLEVBQUU7SUFFbkIsSUFBSXJDLEtBQUtxQyxFQUFFLElBQUlGLFFBQVFHLGVBQWUsRUFDbENjLGNBQWNqQixRQUFRRyxlQUFlLENBQUN0QyxLQUFLcUMsRUFBRSxDQUFDO1NBQzdDLElBQUdyQyxLQUFLcUMsRUFBRSxJQUFJZ0ksMkRBQUdBLEVBQUU7UUFDcEJoSixRQUFRLENBQUMsSUFBSSxFQUFFckIsS0FBS3FDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUlpSSxRQUFRRCwyREFBRyxDQUFDckssS0FBS3FDLEVBQUUsQ0FBcUIsR0FDeENlLGNBQWMsQ0FBQyxNQUFNLEVBQUVwRCxLQUFLcUMsRUFBRSxDQUFDLENBQUM7SUFDeEM7SUFFRCxPQUFPLElBQUk3QyxvREFBT0EsQ0FBQ1EsTUFBTSxVQUFVb0QsYUFBYS9CO0FBQ25EO0FBR0FRLFFBQVFnQixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QnFCO0FBRTdCLE1BQU0ySCxxQkFBcUJELDJEQUFTQTtBQUVuRCxFQUdBLGdCQUFnQjtDQUNaLFVBQVU7Q0FDVixXQUFXO0NBQ1AsV0FBVztDQUNYLHdDQUF3QztDQUN4QyxrQkFBa0I7Q0FDbEIsU0FBUztDQUNMLHVCQUF1QjtDQUN2QixjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FDZmE7QUFFeEIsTUFBTUUsdUJBQXVCRCxrREFBWUE7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pvQztBQUNnQjtBQUNGO0FBR2xELE1BQU1uQixVQUFVO0lBQ2YsVUFBVXFCLGtEQUFTQTtJQUNuQixlQUFlQyxrRUFBU0E7SUFDeEIsYUFBYUMsZ0VBQVNBO0FBQ3ZCO0FBRUEsaUVBQWV2QixPQUFPQSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNYUixNQUFNa0I7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBLG1DQUFtQztBQUdPO0FBRU07QUFRaEQsTUFBTU8sVUFBOEUsQ0FBQztBQUVyRixJQUFJLElBQUlDLGVBQWVGLDJEQUFZQSxDQUFFO0lBRWpDLE1BQU1HLFNBQVNILDJEQUFZLENBQUNFLFlBQXlDO0lBRXJFLElBQUlFLFFBQVE7UUFBQztLQUFPO0lBQ3BCLElBQUksa0JBQWtCRCxPQUFPN0IsV0FBVyxFQUFFO1FBRXRDLElBQUkrQixNQUFNQyxPQUFPLENBQUNILE9BQU83QixXQUFXLENBQUN0RyxZQUFZLEdBQUk7WUFDakRvSSxRQUFRRCxPQUFPN0IsV0FBVyxDQUFDdEcsWUFBWTtRQUMzQyxPQUFPO1lBQ0hvSSxRQUFRO2dCQUFDRCxPQUFPN0IsV0FBVyxDQUFDdEcsWUFBWTthQUFDO1FBQzdDO0lBQ0o7SUFFQSxLQUFJLElBQUltRCxRQUFRaUYsTUFDWixDQUFDSCxPQUFPLENBQUM5RSxLQUFLLEtBQUssRUFBRSxFQUFFdkMsSUFBSSxDQUFDdUg7QUFDcEM7QUFHTyxTQUFTSSxPQUFPQyxJQUFZLEVBQUV6TCxRQUFnQjtJQUVqRCxNQUFNMEwsU0FBUyxJQUFJQyxHQUFHQyxNQUFNLENBQUNILE1BQU16TCxVQUFVO0lBQ2hELE1BQU02TCxPQUFPRixHQUFHRyxRQUFRLENBQUNDLFVBQVUsQ0FBQ0w7SUFDakMsMkJBQTJCO0lBQzlCLE9BQU87UUFDQXJMLE9BQU8yTCxZQUFZSDtRQUNuQjdMO0lBQ0o7QUFDSjtBQUVPLFNBQVNzQyxhQUFhMkosWUFBaUIsRUFBRTFKLE9BQWdCO0lBRTVELElBQUk2RCxPQUFPNkYsYUFBYXZJLGFBQWEsSUFBSXVJLGFBQWFySixXQUFXLENBQUNDLEtBQUs7SUFFdkUsSUFBSSxDQUFFdUQsQ0FBQUEsUUFBUThFLE9BQU0sR0FBSztRQUNyQjlHLFFBQVFDLEdBQUcsQ0FBRTRIO1FBQ2I3SCxRQUFRd0IsSUFBSSxDQUFDLHlCQUF5QlE7UUFDdENBLE9BQU87SUFDWDtJQUVBLEtBQUksSUFBSWdGLFVBQVVGLE9BQU8sQ0FBQzlFLEtBQUssQ0FBRTtRQUM3QixNQUFNOEYsU0FBU2QsT0FBTzdCLFdBQVcsQ0FBQzBDLGNBQWMxSjtRQUNoRCxJQUFHMkosV0FBVzNCLFdBQVc7WUFDckIyQixPQUFPdkwsSUFBSSxHQUFHeUssT0FBTzVCLE1BQU07WUFDM0IsT0FBTzBDO1FBQ1g7SUFDSjtJQUVBOzs7Ozs7Ozs7SUFTQSxHQUVBOUgsUUFBUStILEtBQUssQ0FBQ0Y7SUFDZCxNQUFNLElBQUl4SSxNQUFNO0FBQ3BCO0FBRUEsMkJBQTJCO0FBQ3BCLFNBQVNwQixhQUFhakMsSUFBUyxFQUFFbUMsT0FBZ0I7SUFFcEQsTUFBTTZKLFFBQVFoTSxLQUFLZSxJQUFJLENBQUM0QixHQUFHLENBQUUsQ0FBQ3NKLElBQVVDLGFBQWFELEdBQUc5SjtJQUN4RCxNQUFNZ0ssT0FBT25NLEtBQUtlLElBQUksQ0FBQ2YsS0FBS2UsSUFBSSxDQUFDUCxNQUFNLEdBQUMsRUFBRTtJQUUxQyxNQUFNNEwsWUFBWTtRQUNkMUksUUFBWTFELEtBQUtlLElBQUksQ0FBQyxFQUFFLENBQUMyQyxNQUFNO1FBQy9CQyxZQUFZM0QsS0FBS2UsSUFBSSxDQUFDLEVBQUUsQ0FBQzRDLFVBQVU7UUFFbkMwSSxZQUFnQkYsS0FBS0UsVUFBVTtRQUMvQkMsZ0JBQWdCSCxLQUFLRyxjQUFjO0lBQ3ZDO0lBRUEsT0FBTyxJQUFJOU0scURBQU9BLENBQUM0TSxXQUFXLFFBQVEsTUFBTSxNQUFNSjtBQUN0RDtBQUNBLDJCQUEyQjtBQUNwQixTQUFTbEcsYUFBYTlGLElBQVMsRUFBRW1DLE9BQWdCO0lBRXBELE1BQU03QixPQUFPTixLQUFLTSxJQUFJLENBQUNBLElBQUksQ0FBQ3FDLEdBQUcsQ0FBRSxDQUFDc0osSUFBVU0sWUFBWU4sR0FBRzlKLFdBQVksU0FBUztJQUVoRixJQUFJcUs7SUFDSixJQUFJTDtJQUNKLElBQUk3TCxLQUFLRSxNQUFNLEtBQUssR0FBRztRQUVuQmdNLFFBQU94TSxLQUFLTSxJQUFJLENBQUNBLElBQUksQ0FBQyxFQUFFO1FBQ3hCNkwsT0FBT25NLEtBQUtNLElBQUksQ0FBQ0EsSUFBSSxDQUFDTixLQUFLTSxJQUFJLENBQUNBLElBQUksQ0FBQ0UsTUFBTSxHQUFDLEVBQUU7SUFFbEQsT0FBTztRQUNILG1CQUFtQjtRQUNuQixNQUFNVCxNQUFNQyxLQUFLMkQsVUFBVSxHQUFHLElBQUkzRCxLQUFLZ0csSUFBSSxDQUFDeEYsTUFBTSxHQUFHO1FBRXJEZ00sUUFBUUwsT0FBTztZQUNYekksUUFBUTFELEtBQUswRCxNQUFNO1lBQ25CMkksWUFBWXJNLEtBQUswRCxNQUFNO1lBQ3ZCQyxZQUFZNUQ7WUFDWnVNLGdCQUFnQnZNO1FBQ3BCO0lBQ0o7SUFHQSxNQUFNcU0sWUFBWTtRQUNkMUksUUFBWThJLE1BQU05SSxNQUFNO1FBQ3hCQyxZQUFZNkksTUFBTTdJLFVBQVU7UUFFNUIwSSxZQUFnQkYsS0FBS0UsVUFBVTtRQUMvQkMsZ0JBQWdCSCxLQUFLRyxjQUFjO0lBQ3ZDO0lBRUEsT0FBTyxJQUFJOU0scURBQU9BLENBQUM0TSxXQUFXLFFBQVEsTUFBTSxNQUFNOUw7QUFDdEQ7QUFDTyxTQUFTaU0sWUFBWXZNLElBQVMsRUFBRW1DLE9BQWdCO0lBRW5ELE9BQU8sSUFBSTNDLHFEQUFPQSxDQUFDUSxNQUFNLE9BQU9BLEtBQUtpSyxVQUFVLENBQUM1SCxFQUFFLEVBQUVyQyxLQUFLK0YsR0FBRztBQUNoRTtBQUVPLFNBQVMvQyxRQUFRaEQsSUFBVztJQUUvQixJQUFJK0IsTUFBTS9CLElBQUksQ0FBQyxFQUFFO0lBQ2pCLElBQUlrQixNQUFNbEIsSUFBSSxDQUFDQSxLQUFLUSxNQUFNLEdBQUMsRUFBRTtJQUU3QixPQUFPO1FBQ0gsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUM5QmtELFFBQVMzQixJQUFJMkIsTUFBTTtRQUNuQkMsWUFBWTVCLElBQUk0QixVQUFVO1FBQzFCMEksWUFBWW5MLElBQUltTCxVQUFVO1FBQzFCQyxnQkFBZ0JwTCxJQUFJb0wsY0FBYztJQUN0QztBQUNKO0FBRU8sU0FBU0osYUFBYXBNLElBQVMsRUFBRXFDLE9BQWdCO0lBRXBELElBQUluQyxPQUFPRjtJQUVYLElBQUlBLEtBQUswQyxXQUFXLENBQUNDLEtBQUssS0FBSyxRQUMzQnpDLE9BQU9GLEtBQUt1QixLQUFLO0lBQ3JCOzswQkFFc0IsR0FFdEIsT0FBT2EsYUFBY2xDLE1BQU1tQztBQUMvQjtBQU1PLFNBQVN5SixZQUFZbE0sR0FBUTtJQUVoQyxNQUFNeUMsVUFBVTtRQUNaRyxpQkFBaUJnSCxPQUFPbUQsTUFBTSxDQUFDO0lBQ25DO0lBRUEsTUFBTVgsU0FBUyxJQUFJWixNQUFNeEwsSUFBSXFCLElBQUksQ0FBQ1AsTUFBTTtJQUN4QyxJQUFJLElBQUlHLElBQUksR0FBR0EsSUFBSWpCLElBQUlxQixJQUFJLENBQUNQLE1BQU0sRUFBRSxFQUFFRyxFQUFHO1FBQ3JDLHVCQUF1QjtRQUN2Qm1MLE1BQU0sQ0FBQ25MLEVBQUUsR0FBR3VMLGFBQWF4TSxJQUFJcUIsSUFBSSxDQUFDSixFQUFFLEVBQUV3QjtJQUMxQztJQUVBLDBCQUEwQjtJQUUxQixPQUFPMko7QUFDWDs7Ozs7Ozs7Ozs7Ozs7O0FDM0tPLE1BQU10TTtJQUVaaUMsS0FBaUI7SUFDakJKLE1BQWM7SUFDZEwsV0FBc0IsRUFBRSxDQUFDO0lBQ3pCb0MsY0FBMkIsS0FBSztJQUU3QlUsT0FBa0I7SUFDbEI3QyxPQUFtQjtJQUV0QlYsS0FBa0Q7SUFFbERpQyxZQUFZcUosWUFBaUIsRUFBRXBLLElBQVksRUFBRTJCLFdBQXdCLEVBQUVzSixTQUFjLElBQUksRUFBRTFMLFdBQXNCLEVBQUUsQ0FBRTtRQUVwSCxJQUFJLENBQUNTLElBQUksR0FBS0E7UUFDZCxJQUFJLENBQUMyQixXQUFXLEdBQUdBO1FBQ25CLElBQUksQ0FBQy9CLEtBQUssR0FBSXFMO1FBQ2QsSUFBSSxDQUFDMUwsUUFBUSxHQUFHQTtRQUNoQixJQUFJLENBQUM4QyxNQUFNLEdBQUc7WUFDYmhELE9BQU87Z0JBQ05oQixNQUFNK0wsYUFBYW5JLE1BQU07Z0JBQ3pCM0QsS0FBSzhMLGFBQWFsSSxVQUFVO1lBQzdCO1lBQ0F6QyxLQUFLO2dCQUNKcEIsTUFBTStMLGFBQWFRLFVBQVU7Z0JBQzdCdE0sS0FBSzhMLGFBQWFTLGNBQWM7WUFDakM7UUFDRDtJQUNEO0FBQ0Q7Ozs7Ozs7U0N2Q0E7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2I7QUFDb0I7QUFDWDtBQUVtRCIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL29iamVjdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAyLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zICkge1xuXG4gICAgaWYoIHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY3Vyc29yLmNvbCArPSBzdHIubGVuZ3RoO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICByZXR1cm4gYXN0bm9kZTJqcyhzdHIsIGN1cnNvcik7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gXCJcIjtcblxuICAgIGxldCBlOiBhbnk7XG4gICAgbGV0IHM6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RyWzFdLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgcyA9IHN0clswXVtpXTtcbiAgICAgICAganMgKz0gcztcbiAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgICAgICBlID0gc3RyWzFdW2ldO1xuICAgICAgICBpZiggZSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCkge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIntcIjtcbiAgICBjb25zdCBib2R5ID0gbm9kZS5jaGlsZHJlbltpZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGJvZHkuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAganMgKz0gXCJ9XCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBfY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIikge1xuXG4gICAgICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZSAgPSBcIjBuXCI7XG4gICAgICAgIGxldCBpbmNyOiBzdHJpbmd8QVNUTm9kZSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBlbmQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gdGhpcy5jaGlsZHJlblsyXTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgICAgIC4uLiBub2RlLml0ZXIuYXJncy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICksXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuaWZibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy9pZlxuICAgIGxldCBrZXl3b3JkID0gXCJpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZSBpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZVwiO1xuXG4gICAgbGV0IGpzID0gdG9KUyhrZXl3b3JkLCBjdXJzb3IpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGlmKCBrZXl3b3JkICE9PSBcImVsc2VcIikge1xuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImlmKHRydWUpXCIsIGN1cnNvcik7IC8vVE9ETy4uLlxuICAgICAgICBqcys9IGJvZHkyanModGhpcywgY3Vyc29yLCAwKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vVE9ETzogY29uZGl0aW9uLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hgLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcImNhdGNoXCIsIHsuLi5jdXJzb3J9KTtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJjYXRjaChfcmF3X2Vycl8pe1wiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIGpzKz0gdG9KUyhcImNvbnN0IF9lcnJfID0gX3Jhd19lcnJfIGluc3RhbmNlb2YgX2JfLlB5dGhvbkVycm9yXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIjogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1wiLCBjdXJzb3IpO1xuICAgICAgICAvLyBkZWJ1Z1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gdG9KUyhcIl9iXy5kZWJ1Z19wcmludF9leGNlcHRpb24oX2Vycl8sIF9hc3RfKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZSB7IHRocm93IF9yYXdfZXJyXyB9XCIsIGN1cnNvcik7IC8vVE9ETy4uLlxuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCk7XG4gICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYmxvY2tgLCBudWxsLCBudWxsLFxuICAgICAgICBub2RlLmhhbmRsZXJzLm1hcCggKGg6YW55KSA9PiBjb252ZXJ0X25vZGUoaCwgY29udGV4dCkpXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS5jYXRjaGJsb2NrXCI7IiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBmaWx0ZXJfc3RhY2soc3RhY2s6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBzdGFjay5maWx0ZXIoIGUgPT4gZS5pbmNsdWRlcygnYnJ5dGhvbl8nKSApOyAvL1RPRE8gaW1wcm92ZXMuLi5cbn1cblxuXG5mdW5jdGlvbiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzOiBBU1ROb2RlW10sIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIpOiBudWxsfEFTVE5vZGUge1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICBpZiggbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID4gbGluZVxuICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQuY29sID4gY29sKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiggICAgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA+IGxpbmVcbiAgICAgICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuZW5kLmNvbCA+IGNvbFxuICAgICAgKSB7XG4gICAgICAgICAgbGV0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzW2ldLmNoaWxkcmVuLCBsaW5lLCBjb2wpO1xuICAgICAgICAgIGlmKCBub2RlICE9PSBudWxsKVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV07XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDsgLy90aHJvdyBuZXcgRXJyb3IoXCJub2RlIG5vdCBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrbGluZTJhc3Rub2RlKHN0YWNrbGluZTogU3RhY2tMaW5lLCBhc3Q6IEFTVCk6IEFTVE5vZGUge1xuICByZXR1cm4gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIHN0YWNrbGluZVsxXSwgc3RhY2tsaW5lWzJdKSE7XG59XG5cbmV4cG9ydCB0eXBlIFN0YWNrTGluZSA9IFtzdHJpbmcsIG51bWJlciwgbnVtYmVyXTtcblxuLy9UT0RPOiBjb252ZXJ0XG5leHBvcnQgZnVuY3Rpb24gc3RhY2syYXN0bm9kZXMoc3RhY2s6IFN0YWNrTGluZVtdLCBhc3Q6IEFTVCk6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgYXN0KSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgYXN0OiBBU1QpOiBTdGFja0xpbmVbXSB7XG5cbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgICAgY29sICs9IG5vZGUudmFsdWUubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIGFzdDogQVNUKSB7XG5cbiAgICAvL1RPRE86IG1hbnkgYXN0L2ZpbGVzLlxuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBhc3QpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIGFzdCk7XG4gICAgLy9UT0RPOiBjb252ZXJ0IHN0YWNrLi4uXG4gICAgY29uc3Qgc3RhY2tfc3RyID0gc3RhY2subWFwKCAobCxpKSA9PiBgRmlsZSBcIltmaWxlXVwiLCBsaW5lICR7bm9kZXNbaV0ucHljb2RlLnN0YXJ0LmxpbmV9LCBpbiAke3N0YWNrW2ldWzBdfWApO1xuXG4gICAgbGV0IGV4Y2VwdGlvbl9zdHIgPSBcbmBUcmFjZWJhY2sgKG1vc3QgcmVjZW50IGNhbGwgbGFzdCk6XG4gICR7c3RhY2tfc3RyLmpvaW4oYFxcbiAgYCl9XG5FeGNlcHRpb246IFttc2ddYDtcblxuICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbl9zdHIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVidWdfcHJpbnRfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcInRyeVwiLCB7Li4uY3Vyc29yfSk7XG4gICAgXG4gICAgbGV0IGpzID0gdG9KUyhcInRyeVwiLCBjdXJzb3IpO1xuICAgICAgICBqcys9IGJvZHkyanModGhpcywgY3Vyc29yKTtcblxuICAgIGNvbnNvbGUubG9nKFwidHJ5XCIsIHsuLi5jdXJzb3J9KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLnRyeWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkudHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmB3aGlsZSgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy5jaGlsZHJlblswXS5yZXN1bHRfdHlwZT8uc3RhcnRzV2l0aChcImNsYXNzLlwiKSApXG4gICAgICAgIGpzKz0gdG9KUyhcIm5ldyBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfShgLCBjdXJzb3IpO1xuXG4gICAgLy9UT0RPOiBhcmdzIG5vZGUuLi5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcIilcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8gVE9ETzogbm9kZS5hcmdzIC8vIGZjdCBjYWxsIGFyZ3VtZW50LlxuICAgIC8vIFRPRE86IHRoaXMgP1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZ1bmN0aW9ucy5jYWxsXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDYWxsXCI7IiwiaW1wb3J0IHsgYXJnczJqcywgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmBmdW5jdGlvbiAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcblxuICAgIGpzICs9IGFyZ3MyanModGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9hcmdzLCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIGNvbnRleHQpO1xuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0ge1xuICAgICAgICAuLi5jb250ZXh0XG4gICAgfVxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzID0gey4uLmNvbnRleHQubG9jYWxfdmFyaWFibGVzfTtcbiAgICBmb3IobGV0IGFyZyBvZiBhcmdzLmNoaWxkcmVuKVxuICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgLy8gcmV0dXJuIHR5cGUuLi4gbm9kZS5yZXR1cm5zLmlkXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuZGVmXCIsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KTtgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJhaXNlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMTEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzE1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTYgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInJldHVyblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJwYXNzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49PVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJvcGVyYXRvcnMuK1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJsaXRlcmFscy5zdHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwibGl0ZXJhbHMuTm9uZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcImtleXdvcmRzLnJhaXNlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwiZnVuY3Rpb25zLmRlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLndoaWxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL3RyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaGJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE3XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE4XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMTEpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzE1KTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSxjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHx8ICEoXCJfX2NsYXNzX19cIiBpbiBub2RlLnZhbHVlKVxuICAgICAgICAgICAgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18uX19xdWFsbmFtZV9fICE9PSBcIk5vbmVUeXBlXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5Ob25lXCIsIFwiTm9uZVwiLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgXCJib29sXCIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBcImZsb2F0XCIsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfW5gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCBcImludFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYFwiJHt0aGlzLnZhbHVlfVwiYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBcInN0clwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSArICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICBpZiggb3AgPT09IFwiRXFcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLitcIiwgbnVsbCwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19ID0gJHt0aGlzLmNoaWxkcmVuWzFdfWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB0YXJnZXQgPSBub2RlLnRhcmdldDtcbiAgICBpZiggXCJ0YXJnZXRzXCIgaW4gbm9kZSlcbiAgICAgICAgdGFyZ2V0ID0gbm9kZS50YXJnZXRzWzBdO1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUodGFyZ2V0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgICAgICBjb250ZXh0KTtcblxuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gXCJvcGVyYXRvcnMuPVwiO1xuXG4gICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuXG4gICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IHJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdID0gcmlnaHRfdHlwZTtcbiAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgcmlnaHRfdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICAvL1RPRE8gTm9uZSB0eXBlLi4uXG4gICAgLy9UT0RPIHN0clxuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19ID09ICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLmNvbXBhcmF0b3JzWzBdLCBjb250ZXh0KTtcblxuICAgIGlmKGxlZnQucmVzdWx0X3R5cGUgPT09IG51bGwgfHwgcmlnaHQucmVzdWx0X3R5cGUgPT09IG51bGwpIHtcbiAgICAgICAgLy9UT0RPOiBvYmplY3QgcmVzdWx0X3R5cGUgdG9vLi4uXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuPT1cIiwgXCJib29sXCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRvSlMoXCJyZXR1cm5cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJyZXR1cm5cIiwgXCJOb25lXCIsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJyZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuICAgIGxldCB2YWx1ZSA9IG5vZGUuaWQ7XG5cbiAgICBpZiggbm9kZS5pZCBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLmlkXTtcbiAgICBlbHNlIGlmKG5vZGUuaWQgaW4gX3JfKSB7XG4gICAgICAgIHZhbHVlID0gYF9yXy4ke25vZGUuaWR9YDtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW25vZGUuaWQgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7bm9kZS5pZH1gO1xuICAgIH1cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKVxuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWRcIiwgbmFtZSk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBmb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuICAgICAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG4gICAgICAgIGxldCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBub2RlXCIpO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZ3Mobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5hcmdzLmFyZ3MubWFwKCAobTphbnkpID0+IGNvbnZlcnRfYXJnKG0sIGNvbnRleHQpICk7IC8vVE9ETy4uLlxuICAgIFxuICAgIGxldCBmaXJzdDogYW55O1xuICAgIGxldCBsYXN0IDogYW55O1xuICAgIGlmKCBhcmdzLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGZpcnN0PSBub2RlLmFyZ3MuYXJnc1swXTtcbiAgICAgICAgbGFzdCA9IG5vZGUuYXJncy5hcmdzW25vZGUuYXJncy5hcmdzLmxlbmd0aC0xXTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIGZpcnN0ID0gbGFzdCA9IHtcbiAgICAgICAgICAgIGxpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IGNvbCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBjb2xcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBmaXJzdC5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGZpcnN0LmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImFyZ3NcIiwgbnVsbCwgbnVsbCwgYXJncyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmcobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJhcmdcIiwgbm9kZS5hbm5vdGF0aW9uLmlkLCBub2RlLmFyZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0cG9zKG5vZGU6IGFueVtdKSB7XG5cbiAgICBsZXQgYmVnID0gbm9kZVswXTtcbiAgICBsZXQgZW5kID0gbm9kZVtub2RlLmxlbmd0aC0xXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgIC8vY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubzogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcblxuICAgIGlmKCBsaW5lLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkV4cHJcIilcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG4gICAgLypcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlOyovXG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCB0eXBlIENvbnRleHQgPSB7XG4gICAgbG9jYWxfdmFyaWFibGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmd8bnVsbD5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXN0KGFzdDogYW55KTogQVNUTm9kZVtdIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgIGxvY2FsX3ZhcmlhYmxlczogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheShhc3QuYm9keS5sZW5ndGgpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3QuYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICAvL1RPRE86IGRldGVjdCBjb21tZW50c1xuICAgICAgICByZXN1bHRbaV0gPSBjb252ZXJ0X2xpbmUoYXN0LmJvZHlbaV0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5leHBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsImFzdDJqcyIsImFzdCIsImpzIiwiZmlsZW5hbWUiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsIm5vZGVzIiwiYXN0bm9kZTJqcyIsIm5ld2xpbmUiLCJyIiwic3RyIiwiYXJncyIsInRvSlMiLCJsZW5ndGgiLCJlIiwicyIsImkiLCJib2R5MmpzIiwiaWR4Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJqc2NvZGUiLCJlbmQiLCJhcmdzMmpzIiwiYXJnMmpzIiwidmFsdWUiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwidHlwZSIsImluZGVudCIsInBhZFN0YXJ0IiwiX2N1cnNvciIsImNvbnZlcnQiLCJfY29udGV4dCIsImJlZyIsImluY3IiLCJjb252ZXJ0X2JvZHkiLCJjb252ZXJ0X25vZGUiLCJjb250ZXh0IiwidGFyZ2V0IiwiaWQiLCJsb2NhbF92YXJpYWJsZXMiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwiYnJ5dGhvbl9uYW1lIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJyZXN1bHRfdHlwZSIsIkVycm9yIiwic2JyeXRob25fdHlwZSIsImN1ciIsIm9yZWxzZSIsInB1c2giLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiaGFuZGxlcnMiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlciIsImgiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInN0YWNrMmFzdG5vZGVzIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwid2FybiIsIl9yYXdfZXJyXyIsInN0YWNrX3N0ciIsImV4Y2VwdGlvbl9zdHIiLCJqb2luIiwic3RhcnRzV2l0aCIsImNvbnZlcnRfYXJncyIsImFyZyIsIm5hbWUiLCJleGMiLCJQeXRob25FcnJvciIsInB5dGhvbl9leGNlcHRpb24iLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiUlVOVElNRV8xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiUlVOVElNRV8xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiQVNUX0NPTlZFUlRfMTciLCJBU1QySlNfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIkFTVF9DT05WRVJUXzE5IiwiQVNUMkpTXzE5IiwiQVNUX0NPTlZFUlRfMjAiLCJBU1QySlNfMjAiLCJBU1RfQ09OVkVSVF8yMSIsIkFTVDJKU18yMSIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsIlJVTlRJTUUiLCJPYmplY3QiLCJhc3NpZ24iLCJfYl8iLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJvcCIsImxlZnQiLCJyaWdodCIsImVuZHNXaXRoIiwidGFyZ2V0cyIsInJpZ2h0X3R5cGUiLCJhbm5vdGF0aW9uIiwiY29tcGFyYXRvcnMiLCJ1bmRlZmluZWQiLCJleHByIiwiX3JfIiwiaXNDbGFzcyIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwibW9kdWxlIiwibmFtZXMiLCJBcnJheSIsImlzQXJyYXkiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJyZXN1bHQiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsImxhc3QiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJjb252ZXJ0X2FyZyIsImZpcnN0IiwiY3JlYXRlIiwiX3ZhbHVlIiwiZGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=