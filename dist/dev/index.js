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
    const exported = []; // move2ast gen ?
    let js = `//# sourceURL=${ast.filename}\n`;
    js += `const {_r_, _b_} = __SBRYTHON__;\n`;
    let cursor = {
        line: 3,
        col: 0
    };
    for (let node of ast.nodes){
        js += astnode2js(node, cursor);
        if (node.type === "functions.def") exported.push(node.value);
        else js += toJS(";", cursor);
        js += newline(node, cursor);
    }
    js += `\nconst __exported__ = {${exported.join(', ')}};\n`;
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
function body2js(node, cursor, idx = 0, print_bracket = true) {
    const start = {
        ...cursor
    };
    let js = "";
    if (print_bracket) js += "{";
    const body = node.children[idx]; //body: ASTNode[];
    for(let i = 0; i < body.children.length; ++i){
        js += newline(node, cursor, 1);
        js += astnode2js(body.children[i], cursor);
        js += toJS(";", cursor);
    }
    if (print_bracket) {
        js += newline(node, cursor);
        js += "}";
        cursor.col += 1;
    }
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
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`if(_err_ instanceof ${this.children[0]}){`, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    js += `let ${this.value} = _err_;`;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1, false);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.catch`, null, node.name, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.type, context),
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
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("_b_.debug_print_exception(_err_, __SBRYTHON__)", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
    for (let handler of this.children)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(handler, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("else{ throw _raw_err_ }", cursor); //TODO...
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
function stackline2astnode(stackline, sb) {
    const ast = sb.getASTFor("sbrython_editor.js");
    return find_astnode_from_jscode_pos(ast.nodes, stackline[1], stackline[2]);
}
//TODO: convert
function stack2astnodes(stack, sb) {
    return stack.map((e)=>stackline2astnode(e, sb));
}
//TODO: add file...
function parse_stack(stack, sb) {
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
            //TODO: extract filename.
            const ast = sb.getASTFor("sbrython_editor.js");
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
function debug_print_exception(err, sb) {
    console.warn("Exception", err);
    const stack = parse_stack(err._raw_err_.stack, sb);
    const nodes = stack2astnodes(stack, sb);
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
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("try", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor);
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
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("{", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1, false);
    const body = this.children[1].children;
    if (body[body.length - 1].type !== "keywords.return") {
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
        js += "return null;";
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 0) + (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
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

/***/ "./src/core_modules/keywords/import/alias/ast2js.ts":
/*!**********************************************************!*\
  !*** ./src/core_modules/keywords/import/alias/ast2js.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    if (this.value[1] === undefined) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.value[0], cursor);
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(`${this.value[0]}: ${this.value[1]}`, cursor);
}


/***/ }),

/***/ "./src/core_modules/keywords/import/alias/astconvert.ts":
/*!**************************************************************!*\
  !*** ./src/core_modules/keywords/import/alias/astconvert.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "keywords.import.alias", null, [
        node.name,
        node.asname
    ]);
}
convert.brython_name = [
    "alias"
];


/***/ }),

/***/ "./src/core_modules/keywords/import/ast2js.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/keywords/import/ast2js.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let js = "";
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("const {", cursor);
    for(let i = 0; i < this.children.length; ++i){
        if (i !== 0) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(", ", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("} = ", cursor);
    if (this.value === null) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("__SBRYTHON__.getModules()", cursor);
    else js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(`__SBRYTHON__.getModule("${this.value}")`, cursor);
    return js;
}


/***/ }),

/***/ "./src/core_modules/keywords/import/astconvert.ts":
/*!********************************************************!*\
  !*** ./src/core_modules/keywords/import/astconvert.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.import", null, node.module, node.names.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context)));
}
convert.brython_name = [
    "Import",
    "ImportFrom"
];


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
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`throw new _b_.PythonError(${this.children[0]})`, cursor);
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
/* harmony import */ var _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./literals/f-string/astconvert.ts */ "./src/core_modules/literals/f-string/astconvert.ts");
/* harmony import */ var _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./literals/f-string/ast2js.ts */ "./src/core_modules/literals/f-string/ast2js.ts");
/* harmony import */ var _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/astconvert.ts */ "./src/core_modules/literals/f-string/FormattedValue/astconvert.ts");
/* harmony import */ var _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/ast2js.ts */ "./src/core_modules/literals/f-string/FormattedValue/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./keywords/import/astconvert.ts */ "./src/core_modules/keywords/import/astconvert.ts");
/* harmony import */ var _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./keywords/import/ast2js.ts */ "./src/core_modules/keywords/import/ast2js.ts");
/* harmony import */ var _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./keywords/import/alias/astconvert.ts */ "./src/core_modules/keywords/import/alias/astconvert.ts");
/* harmony import */ var _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./keywords/import/alias/ast2js.ts */ "./src/core_modules/keywords/import/alias/ast2js.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");






















































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
    "literals.f-string": {
        AST_CONVERT: _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "literals.f-string/FormattedValue": {
        AST_CONVERT: _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__["default"],
        AST2JS: _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
    },
    "keywords.raise": {
        AST_CONVERT: _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__["default"],
        AST2JS: _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__["default"]
    },
    "keywords.import": {
        AST_CONVERT: _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__["default"],
        AST2JS: _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__["default"]
    },
    "keywords.import/alias": {
        AST_CONVERT: _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__["default"],
        AST2JS: _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_37__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_38__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_39__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_40__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_48__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_49__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_50__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_51__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_52__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_53__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_28__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_41__["default"]);
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

/***/ "./src/core_modules/literals/f-string/FormattedValue/ast2js.ts":
/*!*********************************************************************!*\
  !*** ./src/core_modules/literals/f-string/FormattedValue/ast2js.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[0], cursor);
}


/***/ }),

/***/ "./src/core_modules/literals/f-string/FormattedValue/astconvert.ts":
/*!*************************************************************************!*\
  !*** ./src/core_modules/literals/f-string/FormattedValue/astconvert.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    console.warn('e', node);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "literals.f-string.FormattedValue", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context)
    ]);
}
convert.brython_name = "FormattedValue";


/***/ }),

/***/ "./src/core_modules/literals/f-string/ast2js.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/literals/f-string/ast2js.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("`", cursor);
    for (let child of this.children){
        if (child.result_type === "str") js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(child, cursor);
        else if (child.type === "literals.f-string.FormattedValue") {
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("${", cursor);
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(child, cursor);
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
        } else throw new Error("unsupported");
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("`", cursor);
    return js;
}


/***/ }),

/***/ "./src/core_modules/literals/f-string/astconvert.ts":
/*!**********************************************************!*\
  !*** ./src/core_modules/literals/f-string/astconvert.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "literals.f-string", null, null, [
        ...node.values.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e, context))
    ]);
}
convert.brython_name = "JoinedStr";


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
    if (this.children.length === 0) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("return null", cursor);
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
    if (node.value === undefined) return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.return", "None", null);
    const expr = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.return", expr.result_type, null, [
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
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
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
    //console.log(result[i].type);
    }
    //TODO: detect comments...
    return result;
}


/***/ }),

/***/ "./src/runtime.ts":
/*!************************!*\
  !*** ./src/runtime.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SBrython: () => (/* binding */ SBrython),
/* harmony export */   _b_: () => (/* reexport safe */ _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__._b_),
/* harmony export */   _r_: () => (/* reexport safe */ _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_runtime/lists */ "./src/core_runtime/lists.ts");
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");



// classe ?
class SBrython {
    #registered_AST = {};
    #exported = {
        browser: globalThis
    };
    //TODO: runAST() ?
    //TODO: runPythonCode() ?
    //TODO: somehow, remove AST arg ???
    runJSCode(jscode, ast) {
        if (ast.filename in this.#registered_AST) throw new Error(`AST ${ast.filename} already registered!`);
        //TODO: filename 2 modulename.
        this.#registered_AST[ast.filename] = ast;
        const js_fct = new Function("__SBRYTHON__", `${jscode}\nreturn __exported__;`);
        this.#exported[ast.filename] = js_fct(this);
    }
    getModules() {
        return this.#exported;
    }
    getModule(name) {
        return this.#exported[name];
    }
    getASTFor(filename) {
        return this.#registered_AST[filename]; //TODO modulename?
    }
    get _r_() {
        return _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
    get _b_() {
        return _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__._b_;
    }
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
/* harmony export */   SBrython: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_2__.SBrython),
/* harmony export */   _b_: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_2__._b_),
/* harmony export */   _r_: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_2__._r_),
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   convert_ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_ast),
/* harmony export */   parse_stack: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_3__.parse_stack),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast),
/* harmony export */   stackline2astnode: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_3__.stackline2astnode)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime */ "./src/runtime.ts");
/* harmony import */ var _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/controlflows/tryblock/runtime */ "./src/core_modules/controlflows/tryblock/runtime.ts");





var __webpack_exports__SBrython = __webpack_exports__.SBrython;
var __webpack_exports___b_ = __webpack_exports__._b_;
var __webpack_exports___r_ = __webpack_exports__._r_;
var __webpack_exports__ast2js = __webpack_exports__.ast2js;
var __webpack_exports__convert_ast = __webpack_exports__.convert_ast;
var __webpack_exports__parse_stack = __webpack_exports__.parse_stack;
var __webpack_exports__py2ast = __webpack_exports__.py2ast;
var __webpack_exports__stackline2astnode = __webpack_exports__.stackline2astnode;
export { __webpack_exports__SBrython as SBrython, __webpack_exports___b_ as _b_, __webpack_exports___r_ as _r_, __webpack_exports__ast2js as ast2js, __webpack_exports__convert_ast as convert_ast, __webpack_exports__parse_stack as parse_stack, __webpack_exports__py2ast as py2ast, __webpack_exports__stackline2astnode as stackline2astnode };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2QsSUFBSSxDQUFDb0QsV0FBVyxHQUFHQTtRQUNuQixJQUFJLENBQUNsRCxLQUFLLEdBQUlnTztRQUNkLElBQUksQ0FBQ2hOLFFBQVEsR0FBR0E7UUFDaEIsSUFBSSxDQUFDMkMsTUFBTSxHQUFHO1lBQ2I3QyxPQUFPO2dCQUNOckIsTUFBTWdOLGFBQWFsSixNQUFNO2dCQUN6QjdELEtBQUsrTSxhQUFhakosVUFBVTtZQUM3QjtZQUNBdEMsS0FBSztnQkFDSnpCLE1BQU1nTixhQUFhUSxVQUFVO2dCQUM3QnZOLEtBQUsrTSxhQUFhUyxjQUFjO1lBQ2pDO1FBQ0Q7SUFDRDtBQUNEOzs7Ozs7O1NDdkNBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ2E7QUFFK0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG4gICAgY29uc3QgZXhwb3J0ZWQgPSBbXTsgLy8gbW92ZTJhc3QgZ2VuID9cblxuXHRsZXQganMgPSBgLy8jIHNvdXJjZVVSTD0ke2FzdC5maWxlbmFtZX1cXG5gO1xuXHQgICAganMrPSBgY29uc3Qge19yXywgX2JffSA9IF9fU0JSWVRIT05fXztcXG5gO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMywgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdC5ub2Rlcykge1xuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcblxuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwiZnVuY3Rpb25zLmRlZlwiKVxuICAgICAgICAgICAgZXhwb3J0ZWQucHVzaChub2RlLnZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuXG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBgXFxuY29uc3QgX19leHBvcnRlZF9fID0geyR7ZXhwb3J0ZWQuam9pbignLCAnKX19O1xcbmA7XG5cblx0cmV0dXJuIGpzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByKHN0cjogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmFyZ3M6YW55W10pIHtcbiAgICByZXR1cm4gW3N0ciwgYXJnc107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pTKCBzdHI6IFJldHVyblR5cGU8dHlwZW9mIHI+fHN0cmluZ3xBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAgICAganMgKz0gYXN0bm9kZTJqcyhlLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IGAke2V9YDtcbiAgICAgICAgICAgIGpzICs9IHM7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcyA9IHN0clswXVtzdHJbMV0ubGVuZ3RoXTtcbiAgICBqcyArPSBzO1xuICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICByZXR1cm4ganM7XG59XG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGJvZHkyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpZHggPSAwLCBwcmludF9icmFja2V0ID0gdHJ1ZSkge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKHByaW50X2JyYWNrZXQpXG4gICAgICAgIGpzKz1cIntcIjtcbiAgICBjb25zdCBib2R5ID0gbm9kZS5jaGlsZHJlbltpZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGJvZHkuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYXJnczJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCIoXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBhcmdzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKSB7XG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgICAgICsrY3Vyc29yLmNvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGpzICs9IGFyZzJqcyhhcmdzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGFyZ3MuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZzJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gbm9kZS52YWx1ZTtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBiYXNlX2luZGVudCA9IG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgaWYoIFtcImNvbnRyb2xmbG93cy5lbHNlXCIsIFwiY29udHJvbGZsb3dzLmVsaWZcIiwgXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiXS5pbmNsdWRlcyhub2RlLnR5cGUpICkge1xuICAgICAgIC0tYmFzZV9pbmRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBiYXNlX2luZGVudDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKGN1cnNvcik7XG5cbiAgICBub2RlLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgX2N1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGUgID0gXCIwblwiO1xuICAgICAgICBsZXQgaW5jcjogc3RyaW5nfEFTVE5vZGUgPSBcIjFuXCI7XG4gICAgICAgIGxldCBlbmQgID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBiZWcgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgZW5kID0gdGhpcy5jaGlsZHJlblsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAzKVxuICAgICAgICAgICAgaW5jciA9IHRoaXMuY2hpbGRyZW5bMl07XG5cbiAgICAgICAgbGV0IGpzID0gdG9KUyhyYGZvcih2YXIgJHt0aGlzLnZhbHVlfSA9ICR7YmVnfTsgJHt0aGlzLnZhbHVlfSA8ICR7ZW5kfTsgJHt0aGlzLnZhbHVlfSArPSAke2luY3J9KWAsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aC0xKTtcblxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gdG9KUyhyYGZvcih2YXIgJHt0aGlzLnZhbHVlfSBvZiB0aGlzLmNoaWxkcmVuWzBdKWAsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1t0YXJnZXRdID0gbnVsbDsgLy9UT0RPXG5cbiAgICBpZiggbm9kZS5pdGVyLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkNhbGxcIiAmJiBub2RlLml0ZXIuZnVuYy5pZCA9PT0gXCJyYW5nZVwiKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgICAgICAuLi4gbm9kZS5pdGVyLmFyZ3MubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvclwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuaXRlciwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vaWZcbiAgICBsZXQga2V5d29yZCA9IFwiaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2UgaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2VcIjtcblxuICAgIGxldCBqcyA9IHRvSlMoa2V5d29yZCwgY3Vyc29yKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBpZigga2V5d29yZCAhPT0gXCJlbHNlXCIpIHtcbiAgICAgICAgb2Zmc2V0ID0gMTtcbiAgICAgICAganMgKz0gdG9KUyhyYCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIG9mZnNldCk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggXCJpZmJsb2NrXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBpZiggbm9kZS5pZmJsb2NrID09PSBcImVsc2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBpZihjb25kLnJlc3VsdF90eXBlICE9PSBcImJvb2xcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke2NvbmQucmVzdWx0X3R5cGV9IG5vdCB5ZXQgc3VwcG9ydGVkIGFzIGlmIGNvbmRpdGlvbmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgbm9kZS5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgIG5vZGUuaWZibG9jayA9IFwiaWZcIjtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICBub2RlXG4gICAgXTtcblxuICAgIGxldCBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSAmJiBcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSB7XG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGN1ci5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgICAgICBjdXIuaWZibG9jayA9IFwiZWxpZlwiO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGN1cik7XG4gICAgfVxuICAgIGlmKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCAhPT0gMCApIHsgLy8gZWxzZVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhjdXIub3JlbHNlKSxcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgcmVhc29ucy4uLlxuICAgICAgICAgICAgbGluZW5vICAgIDogY3VyLm9yZWxzZVswXS5saW5lbm8gLSAxLFxuICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICAgICBdKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0bm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGNjID0gYXN0bm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgYXN0bm9kZS5jaGlsZHJlbltpXS5weWNvZGUuZW5kID0gY2NbY2MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LnRyeVwiLFxuICAgICAgICAgICAgLi4ubm9kZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS5jYXRjaGJsb2NrXCIsXG4gICAgICAgICAgICAuLi5saXN0cG9zKG5vZGUuaGFuZGxlcnMpLFxuICAgICAgICAgICAgaGFuZGxlcnM6IG5vZGUuaGFuZGxlcnNcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICBdKTtcblxuICAgIC8vZml4IHB5Y29kZS5cbiAgICBhc3Rub2RlLmNoaWxkcmVuWzBdLnB5Y29kZS5lbmQgPSBhc3Rub2RlLmNoaWxkcmVuWzFdLnB5Y29kZS5zdGFydDtcblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmBpZihfZXJyXyBpbnN0YW5jZW9mICR7dGhpcy5jaGlsZHJlblswXX0pe2AsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcys9IGBsZXQgJHt0aGlzLnZhbHVlfSA9IF9lcnJfO2A7XG4gICAgICAgIGpzKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEsIGZhbHNlKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGAsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50eXBlLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJFeGNlcHRIYW5kbGVyXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiY2F0Y2hcIiwgey4uLmN1cnNvcn0pO1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJ0cnlcIiwgY3Vyc29yKTtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy50cnlgLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LnRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgd2hpbGUoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy53aGlsZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU/LnN0YXJ0c1dpdGgoXCJjbGFzcy5cIikgKVxuICAgICAgICBqcys9IHRvSlMoXCJuZXcgXCIsIGN1cnNvcik7XG4gICAgXG4gICAganMgKz0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0oYCwgY3Vyc29yKTtcblxuICAgIC8vVE9ETzogYXJncyBub2RlLi4uXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSlcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCIpXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IGFyZ3MyanMsIGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZnVuY3Rpb24gJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhcIntcIiwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgaWYoIGJvZHlbYm9keS5sZW5ndGggLSAxXS50eXBlICE9PSBcImtleXdvcmRzLnJldHVyblwiICkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IFwicmV0dXJuIG51bGw7XCJcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCkgKyB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYXJncywgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IHtcbiAgICAgICAgLi4uY29udGV4dFxuICAgIH1cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcyA9IHsuLi5jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc307XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIC8vIHJldHVybiB0eXBlLi4uIG5vZGUucmV0dXJucy5pZFxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmRlZlwiLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy52YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlWzBdLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMoYCR7dGhpcy52YWx1ZVswXX06ICR7dGhpcy52YWx1ZVsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnQuYWxpYXNcIiwgbnVsbCwgW25vZGUubmFtZSwgbm9kZS5hc25hbWVdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcblxuICAgIGpzICs9IHRvSlMoXCJjb25zdCB7XCIsIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yICk7XG4gICAgICAgIGpzICs9IHRvSlMoIHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvciApO1xuICAgIH1cbiAgICBqcyArPSB0b0pTKFwifSA9IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGlmKHRoaXMudmFsdWUgPT09IG51bGwpXG4gICAgICAgIGpzICs9IHRvSlMoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBqcyArPSB0b0pTKGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt0aGlzLnZhbHVlfVwiKWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydFwiLCBudWxsLCBub2RlLm1vZHVsZSxcbiAgICAgICAgbm9kZS5uYW1lcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL29wZXJhdG9ycy89PS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL29wZXJhdG9ycy8rL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL29wZXJhdG9ycy8rL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF85IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzEzIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8xOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2NvbW1lbnRzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNSBmcm9tIFwiLi9jb21tZW50cy9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJvcGVyYXRvcnMuPT1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwib3BlcmF0b3JzLitcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzlcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTNcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnQvYWxpYXNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTVcblx0fSxcblx0XCJmdW5jdGlvbnMuZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMThcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svdHJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5mb3JcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjRcblx0fSxcblx0XCJjb21tZW50c1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNVxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8xMyk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMTkpO1xuXG5cbmV4cG9ydCBjb25zdCBfYl8gPSBSVU5USU1FO1xuIiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLk5vbmVcIiwgXCJOb25lXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBcImJvb2xcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc29sZS53YXJuKCdlJywgbm9kZSk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9ybWF0dGVkVmFsdWVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuXG4gICAgICAgIGlmKCBjaGlsZC5yZXN1bHRfdHlwZSA9PT0gXCJzdHJcIilcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgIGVsc2UgaWYoY2hpbGQudHlwZSA9PT0gXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiJHtcIiwgY3Vyc29yKTtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgICAgICBqcyArPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBcImZsb2F0XCIsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfW5gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCBcImludFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYFwiJHt0aGlzLnZhbHVlfVwiYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBcInN0clwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSArICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICBpZiggb3AgPT09IFwiRXFcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLitcIiwgbnVsbCwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCksXG4gICAgICAgIF1cbiAgICApO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19ID0gJHt0aGlzLmNoaWxkcmVuWzFdfWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB0YXJnZXQgPSBub2RlLnRhcmdldDtcbiAgICBpZiggXCJ0YXJnZXRzXCIgaW4gbm9kZSlcbiAgICAgICAgdGFyZ2V0ID0gbm9kZS50YXJnZXRzWzBdO1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUodGFyZ2V0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgICAgICBjb250ZXh0KTtcblxuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gXCJvcGVyYXRvcnMuPVwiO1xuXG4gICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuXG4gICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IHJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdID0gcmlnaHRfdHlwZTtcbiAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgcmlnaHRfdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICAvL1RPRE8gTm9uZSB0eXBlLi4uXG4gICAgLy9UT0RPIHN0clxuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19ID09ICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLmNvbXBhcmF0b3JzWzBdLCBjb250ZXh0KTtcblxuICAgIGlmKGxlZnQucmVzdWx0X3R5cGUgPT09IG51bGwgfHwgcmlnaHQucmVzdWx0X3R5cGUgPT09IG51bGwpIHtcbiAgICAgICAgLy9UT0RPOiBvYmplY3QgcmVzdWx0X3R5cGUgdG9vLi4uXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuPT1cIiwgXCJib29sXCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRvSlMoXCJyZXR1cm4gbnVsbFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMocmByZXR1cm4gJHt0aGlzLmNoaWxkcmVuWzBdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBpZihub2RlLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBcIk5vbmVcIiwgbnVsbCk7XG5cbiAgICBjb25zdCBleHByID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBleHByLnJlc3VsdF90eXBlLCBudWxsLCBbZXhwcl0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmV0dXJuXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlLCBjdXJzb3IpOyAvL1RPRE9cbn0iLCJpbXBvcnQgX3JfIGZyb20gXCIuLi8uLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBpc0NsYXNzKF86IHVua25vd24pIHtcbiAgICAvLyBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUyNjU1OS90ZXN0aW5nLWlmLXNvbWV0aGluZy1pcy1hLWNsYXNzLWluLWphdmFzY3JpcHRcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoXyk/LnByb3RvdHlwZT8ud3JpdGFibGUgPT09IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIG5vZGUuaWQgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5pZF07XG4gICAgZWxzZSBpZihub2RlLmlkIGluIF9yXykge1xuICAgICAgICB2YWx1ZSA9IGBfcl8uJHtub2RlLmlkfWA7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1tub2RlLmlkIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke25vZGUuaWR9YDtcbiAgICB9XG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59XG5cblxuLy8gX190cmFjZWJhY2tfX1xuICAgIC8vIHRiX25leHRcbiAgICAvLyB0Yl9mcmFtZVxuICAgICAgICAvLyBmX2JhY2sgP1xuICAgICAgICAvLyBmX2xvY2FsIDogZW5hYmxlIG9ubHkgaW4gY29tcGF0IG1vZGUuXG4gICAgICAgIC8vIGZfbGluZW5vIChsaW5lKVxuICAgICAgICAvLyBmX2NvZGVcbiAgICAgICAgICAgIC8vIGNvX25hbWUgKGZjdCBuYW1lID8pXG4gICAgICAgICAgICAvLyBjb19maWxlbmFtZSIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcIi4vRXhjZXB0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0pTRXhjZXB0aW9uIGV4dGVuZHMgUHlfRXhjZXB0aW9uIHtcblxufSIsImltcG9ydCBSVU5USU1FXzAgZnJvbSBcIi4vb2JqZWN0LnRzXCI7XG5pbXBvcnQgUlVOVElNRV8xIGZyb20gXCIuL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHNcIjtcbmltcG9ydCBSVU5USU1FXzIgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiSlNFeGNlcHRpb25cIjogUlVOVElNRV8xLFxuXHRcIkV4Y2VwdGlvblwiOiBSVU5USU1FXzIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJVTlRJTUU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9vYmplY3Qge1xuXG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cblxuZXhwb3J0IHR5cGUgQVNUID0ge1xuICAgIG5vZGVzOiBBU1ROb2RlW10sXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXM6IGNvbnZlcnRfYXN0KF9hc3QpLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBicnl0aG9uX25vZGUuc2JyeXRob25fdHlwZSA/PyBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlIClcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkXCIsIG5hbWUpO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBtb2R1bGUuQVNUMkpTO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgbm9kZVwiKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuYXJncy5hcmdzLm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2FyZyhtLCBjb250ZXh0KSApOyAvL1RPRE8uLi5cbiAgICBcbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gbm9kZS5hcmdzLmFyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBub2RlLmFyZ3MuYXJnc1tub2RlLmFyZ3MuYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiYXJnXCIsIG5vZGUuYW5ub3RhdGlvbi5pZCwgbm9kZS5hcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdHBvcyhub2RlOiBhbnlbXSkge1xuXG4gICAgbGV0IGJlZyA9IG5vZGVbMF07XG4gICAgbGV0IGVuZCA9IG5vZGVbbm9kZS5sZW5ndGgtMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvL2xpbmVubyA6IGJlZy5saW5lbm8gLSAxLFxuICAgICAgICAvL2NvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogYmVnLmNvbF9vZmZzZXQsXG4gICAgICAgIGVuZF9saW5lbm86IGVuZC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogZW5kLmVuZF9jb2xfb2Zmc2V0LFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbm9kZSA9IGxpbmU7XG5cbiAgICBpZiggbGluZS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJFeHByXCIpXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuICAgIC8qXG4gICAgaWYoIFwidmFsdWVcIiBpbiBsaW5lICYmICEgKFwidGFyZ2V0c1wiIGluIGxpbmUpICYmICEgKFwidGFyZ2V0XCIgaW4gbGluZSkgKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTsqL1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgdHlwZSBDb250ZXh0ID0ge1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBsb2NhbF92YXJpYWJsZXM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0W2ldLnR5cGUpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcblxuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIGNvbnN0IGpzX2ZjdCA9IG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IGpzX2ZjdCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCByZXN1bHRfdHlwZTogc3RyaW5nfG51bGwsIF92YWx1ZTogYW55ID0gbnVsbCwgY2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdKSB7XG5cblx0XHR0aGlzLnR5cGUgICA9IHR5cGU7XG5cdFx0dGhpcy5yZXN1bHRfdHlwZSA9IHJlc3VsdF90eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImFyZ3MyanMiLCJhcmcyanMiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJfY3Vyc29yIiwiY29udmVydCIsIl9jb250ZXh0IiwiYmVnIiwiaW5jciIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnRleHQiLCJ0YXJnZXQiLCJpZCIsImxvY2FsX3ZhcmlhYmxlcyIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsIm1hcCIsIm4iLCJicnl0aG9uX25hbWUiLCJrZXl3b3JkIiwib2Zmc2V0IiwibGlzdHBvcyIsImlmYmxvY2siLCJjb25kIiwidGVzdCIsInJlc3VsdF90eXBlIiwiRXJyb3IiLCJzYnJ5dGhvbl90eXBlIiwiY3VyIiwib3JlbHNlIiwibGluZW5vIiwiY29sX29mZnNldCIsImFzdG5vZGUiLCJjYyIsInB5Y29kZSIsImhhbmRsZXJzIiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVyIiwiaCIsImZpbHRlcl9zdGFjayIsInN0YWNrIiwiZmlsdGVyIiwiZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3BvcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJzbGljZSIsImZjdF9uYW1lIiwicG9zIiwiaW5kZXhPZiIsImRlYnVnX3ByaW50X2V4Y2VwdGlvbiIsImVyciIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwic3RhcnRzV2l0aCIsImNvbnZlcnRfYXJncyIsImFyZyIsInVuZGVmaW5lZCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJSVU5USU1FXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiQVNUX0NPTlZFUlRfMTciLCJBU1QySlNfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIkFTVF9DT05WRVJUXzE5IiwiQVNUMkpTXzE5IiwiUlVOVElNRV8xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJBU1RfQ09OVkVSVF8yMiIsIkFTVDJKU18yMiIsIkFTVF9DT05WRVJUXzIzIiwiQVNUMkpTXzIzIiwiQVNUX0NPTlZFUlRfMjQiLCJBU1QySlNfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsIlJVTlRJTUUiLCJPYmplY3QiLCJhc3NpZ24iLCJfYl8iLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJjaGlsZCIsInZhbHVlcyIsIm9wIiwibGVmdCIsInJpZ2h0IiwiZW5kc1dpdGgiLCJ0YXJnZXRzIiwicmlnaHRfdHlwZSIsImFubm90YXRpb24iLCJjb21wYXJhdG9ycyIsImV4cHIiLCJfcl8iLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJBcnJheSIsImlzQXJyYXkiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJyZXN1bHQiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsImxhc3QiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJjb252ZXJ0X2FyZyIsImZpcnN0IiwiY3JlYXRlIiwiZGVmYXVsdCIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsInJ1bkpTQ29kZSIsImpzX2ZjdCIsIkZ1bmN0aW9uIiwiZ2V0TW9kdWxlcyIsImdldE1vZHVsZSIsIl92YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=