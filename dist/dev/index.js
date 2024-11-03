/******/ var __webpack_modules__ = ({

/***/ "./src/ast2js.ts":
/*!***********************!*\
  !*** ./src/ast2js.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BB: () => (/* binding */ BB),
/* harmony export */   BE: () => (/* binding */ BE),
/* harmony export */   NL: () => (/* binding */ NL),
/* harmony export */   ast2js: () => (/* binding */ ast2js),
/* harmony export */   jscode_cursor: () => (/* binding */ jscode_cursor),
/* harmony export */   r: () => (/* binding */ r),
/* harmony export */   w: () => (/* binding */ w),
/* harmony export */   wr: () => (/* binding */ wr),
/* harmony export */   wt: () => (/* binding */ wt)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

const cursor = {
    line: 0,
    line_offset: 0
};
let jscode;
function jscode_cursor() {
    return {
        line: cursor.line,
        col: jscode.length - cursor.line_offset
    };
}
function new_jscode(filename) {
    jscode = `//# sourceURL=${filename}\n`;
    jscode += `const {_r_, _b_} = __SBRYTHON__;\n`;
    cursor.line = 3;
    cursor.line_offset = jscode.length;
}
let indent = "    ";
let cur_indent_level = -1;
let cur_indent = "";
const NL = {
    toString: function() {
        ++cursor.line;
        cursor.line_offset = jscode.length + 1;
        return "\n" + cur_indent;
    }
};
const BB = {
    toString: function() {
        if (++cur_indent_level > 0) cur_indent += indent;
        return "";
    }
};
const BE = {
    toString: function() {
        --cur_indent_level;
        cur_indent = cur_indent.slice(0, -4);
        return "";
    }
};
function r(...args) {
    return args;
}
function wr(args) {
    if (typeof args === "string") return w(args);
    return wt(...args);
}
function wt(str, ...args) {
    for(let i = 0; i < args.length; ++i){
        jscode += str[i];
        w(args[i]);
    }
    jscode += str[args.length];
}
function w(...args) {
    for(let i = 0; i < args.length; ++i){
        let arg = args[i];
        if (Array.isArray(arg)) {
            wr(arg);
            continue;
        }
        if (!(arg instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode)) {
            if (arg === undefined) arg = "undefined";
            if (arg === null) arg = "null";
            jscode += arg.toString();
            continue;
        }
        const start = jscode_cursor();
        arg.write();
        arg.jscode = {
            start,
            end: jscode_cursor()
        };
    }
}
function ast2js(ast) {
    new_jscode(ast.filename);
    w(ast.body);
    // TODO: better export strategy (?)
    jscode += `\nconst __exported__ = {};\n`;
    /**
    const lines = ast.body.children;
    const exported = new Array(lines.length);
    let offset = 0;
    for(let i = 0; i < lines.length; ++i) {
        if( lines[i].type === "functions.def")
        exported[i] = lines[i].value;
    }
    exported.length = offset;

    jscode += `\nconst __exported__ = {${exported.join(', ')}};\n`;
    /**/ return jscode;
}


/***/ }),

/***/ "./src/core_modules/body/ast2js.ts":
/*!*****************************************!*\
  !*** ./src/core_modules/body/ast2js.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.BB);
    for(let i = 0; i < this.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, this.children[i]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.BE);
}


/***/ }),

/***/ "./src/core_modules/body/astconvert.ts":
/*!*********************************************!*\
  !*** ./src/core_modules/body/astconvert.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const lines = new Array(node.length);
    for(let i = 0; i < node.length; ++i)lines[i] = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node[i], context);
    for(let i = 0; i < lines.length; ++i){
        if (lines[i].type !== "functions.def") continue;
        const meta = lines[i].result_type.__call__;
        if (meta.generate !== undefined) meta.return_type(); // meh.
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode((0,py2ast__WEBPACK_IMPORTED_MODULE_0__.list2astnode)(node), "body", null, null, lines);
}
convert.brython_name = "Body";


/***/ }),

/***/ "./src/core_modules/class/classdef/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/class/classdef/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    let base = "_r_.object";
    let body = this.children[0];
    if (this.children.length === 2) {
        base = this.children[0];
        body = this.children[1];
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`class ${this.value} extends ${base} {${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
}


/***/ }),

/***/ "./src/core_modules/class/classdef/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/class/classdef/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    context.local_symbols[node.name] = {
        __name__: node.name
    };
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("class", context);
    if (node.bases.length > 1) throw new Error('Not implemented');
    let children = node.bases.length === 1 ? [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.bases[0], context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
    ] : [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
    ];
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "class.classdef", null, node.name, children);
}
convert.brython_name = "ClassDef";


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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");


function ast2js() {
    const idx = this.value;
    const body = this.children[this.children.length - 1];
    if (this.type === "controlflows.for(range)") {
        let beg = "0n";
        let incr = "1n";
        let end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[0]);
        if (this.children.length > 2) {
            beg = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[0]);
            end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[1]);
        }
        if (this.children.length > 3) incr = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[2]);
        return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`for(var ${idx} = ${beg}; ${idx} < ${end}; ${idx} += ${incr}){${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    }
    const list = this.children[0];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`for(var ${idx} of ${list}){${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    const target = node.target.id;
    context.local_symbols[target] = null; //TODO
    if (node.iter.constructor.$name === "Call" && node.iter.func.id === "range") {
        // TODO: jsint opti if this.value not used...
        context.local_symbols[node.value] = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int;
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.for(range)", null, target, [
            ...node.iter.args.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context)),
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
        ]);
    }
    //TODO: get type...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.for", null, target, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.iter, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
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
    // if
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`if(${this.children[0]}){${this.children[1]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    // else if
    let i;
    for(i = 2; i < this.children.length - 1; i += 2){
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`else if(${this.children[i]}){${this.children[i + 1]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    }
    // else
    if (i === this.children.length - 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`else {${this.children[i]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
    // if
    const children = [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
    ];
    // else if
    let cur = node;
    while("orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]){
        cur = cur.orelse[0];
        children.push((0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(cur.test, context), (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(cur.body, context));
    }
    // else
    if ("orelse" in cur && cur.orelse.length !== 0) children.push((0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(cur.orelse, context));
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.ifblock", null, null, children);
}
convert.brython_name = "If";


/***/ }),

/***/ "./src/core_modules/controlflows/ternary/ast2js.ts":
/*!*********************************************************!*\
  !*** ./src/core_modules/controlflows/ternary/ast2js.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    const cond = this.children[0];
    const if_true = this.children[1];
    const if_false = this.children[2];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`(${cond} ? ${if_true} : ${if_false})`;
}


/***/ }),

/***/ "./src/core_modules/controlflows/ternary/astconvert.ts":
/*!*************************************************************!*\
  !*** ./src/core_modules/controlflows/ternary/astconvert.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context);
    const body_true = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context);
    const body_false = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.orelse, context);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.ternary", body_true.result_type, null, [
        cond,
        body_true,
        body_false
    ]);
}
convert.brython_name = "IfExp";


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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`try {${this.children[0]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`catch(_raw_err_){${ast2js__WEBPACK_IMPORTED_MODULE_0__.BB}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");
    if (this.children.length > 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.children[1]);
    for(let i = 2; i < this.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, "else ", this.children[i]);
    // not a catch all...
    if (this.children[this.children.length - 1].children.length !== 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, "else { throw _raw_err_ }");
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.BE, ast2js__WEBPACK_IMPORTED_MODULE_0__.NL);
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
    const children = new Array(node.handlers.length + 1);
    // try body
    children[0] = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context);
    for(let i = 0; i < node.handlers; ++i)children[i + 1] = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.handlers[i], context);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.tryblock", null, null, children);
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

function ast2js() {
    // else is handled by tryblock
    if (this.children.length === 1) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`{${this.children[0]},${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`if(${this.children[0]}){${this.children[1]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
    let children;
    if (node.type !== undefined) {
        children = [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.type, context),
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
        ];
    } else {
        children = [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
        ];
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.catch`, null, node.name, children);
}
convert.brython_name = "ExceptHandler";


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
//TODO: use ~=sourcemap...
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
    return find_astnode_from_jscode_pos(ast.body.children, stackline[1], stackline[2]);
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
            const node = find_astnode_from_jscode_pos(ast.body.children, line, col);
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
function get_py_exception(_raw_err_, __SBRYTHON__) {
    // @ts-ignore
    const _err_ = _raw_err_ instanceof _b_.PythonError ? _raw_err_.python_exception : new _r_.JSException(_raw_err_);
    debug_print_exception(_err_, __SBRYTHON__);
    return _err_;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    debug_print_exception,
    get_py_exception
});


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
    const cond = this.children[0];
    const body = this.children[1];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`while(${cond}){${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}}`;
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
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
    ]);
}
convert.brython_name = "While";


/***/ }),

/***/ "./src/core_modules/functions/args/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/functions/args/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js() {
    const args = this;
    const _args = args.children;
    const SType_fct = args.value;
    const meta = SType_fct.__call__;
    let kw_start = meta.idx_end_pos;
    if (kw_start === Number.POSITIVE_INFINITY) kw_start = meta.idx_vararg + 1;
    if (meta.kwargs !== undefined && kw_start === _args.length - 1) ++kw_start;
    for(let i = 0; i < _args.length; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ");
        if (kw_start === i) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("{");
        if (i === meta.idx_vararg && i === _args.length - 1) _args[i].last = true;
        write_arg(_args[i]);
    }
    if (kw_start < _args.length) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('} = {}');
}
function write_arg(node) {
    const start = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.jscode_cursor)();
    if (node.type === "arg.vararg") {
        if (node.last) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`...${node.value}`;
        else (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', "[]"));
    } else if (node.type === "arg.kwarg") {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', "{}"));
    } else if (node.children.length === 1) {
        let value = node.children[0];
        if (value.result_type === 'jsint' && node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) value = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(value);
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', value));
    } else {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.value);
    }
    node.jscode = {
        start: start,
        end: (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.jscode_cursor)()
    };
}


/***/ }),

/***/ "./src/core_modules/functions/args/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/functions/args/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convert_arg: () => (/* binding */ convert_arg),
/* harmony export */   convert_args: () => (/* binding */ convert_args),
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ast2js */ "./src/core_modules/functions/args/ast2js.ts");



//TODO: fake node...
function convert() {
    // args node doesn't exist...
    return;
}
convert.brython_name = "arguments";
function convert_args(node, SType_fct, context) {
    const meta = SType_fct.__call__;
    const _args = node.args;
    const has_vararg = _args.vararg !== undefined;
    const has_kwarg = _args.kwarg !== undefined;
    const args_pos = meta.args_pos;
    const args_names = meta.args_names;
    const total_args = _args.posonlyargs.length + _args.args.length + +has_vararg + _args.kwonlyargs.length + +has_kwarg;
    const args = new Array(total_args);
    const pos_defaults = node.args.defaults;
    const posonly = _args.posonlyargs;
    const pos = _args.args;
    // posonly
    let doffset = pos_defaults.length - posonly.length - pos.length;
    for(let i = 0; i < posonly.length; ++i){
        const arg = convert_arg(posonly[i], pos_defaults[i - doffset], "posonly", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[i] = arg;
    }
    // pos
    let offset = posonly.length;
    doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i){
        const arg = convert_arg(pos[i], pos_defaults[i - doffset], "pos", context);
        context.local_symbols[arg.value] = arg.result_type;
        args_names[offset] = arg.value;
        args[offset++] = arg;
    }
    meta.idx_vararg = offset;
    // vararg
    if (has_vararg) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;
        const arg = convert_arg(_args.vararg, undefined, "vararg", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
    } else {
        meta.idx_end_pos = offset;
        const nb_pos_defaults = Math.min(pos_defaults.length, pos.length);
        const has_others = pos_defaults.length > pos.length || args.length !== offset;
        if (nb_pos_defaults > 1 || nb_pos_defaults === 1 && has_others) meta.idx_end_pos -= nb_pos_defaults;
    }
    let cut_off = meta.idx_end_pos;
    if (cut_off === Number.POSITIVE_INFINITY) cut_off = meta.idx_vararg;
    for(let i = posonly.length; i < cut_off; ++i)args_pos[args[i].value] = i;
    for(let i = cut_off; i < meta.idx_vararg; ++i)args_pos[args[i].value] = -1;
    //TODO: idx_end_pos (if default and no idx_vararg)
    // kwonly
    const kwonly = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;
    meta.has_kw = meta.idx_vararg !== cut_off || kwonly.length !== 0;
    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i){
        const arg = convert_arg(kwonly[i], kw_defaults[i], "kwonly", context);
        context.local_symbols[arg.value] = arg.result_type;
        args_pos[arg.value] = -1;
        args[offset++] = arg;
    }
    // kwarg
    if (has_kwarg) {
        const arg = convert_arg(_args.kwarg, undefined, "kwarg", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
        meta.kwargs = arg.value;
    }
    //TODO...
    /*
    if( context.type === "class")
        _args = _args.slice(1);
    */ let virt_node;
    if (args.length !== 0) {
        const start = args[0].pycode.start;
        const end = args[args.length - 1].pycode.end;
        virt_node = {
            lineno: start.line,
            col_offset: start.col,
            end_lineno: end.line,
            end_col_offset: end.col
        };
    } else {
        // an estimation...
        const col = node.col_offset + 4 + node.name.length + 1;
        virt_node = {
            lineno: node.lineno,
            end_lineno: node.lineno,
            col_offset: col,
            end_col_offset: col
        };
    }
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(virt_node, "args", null, SType_fct, args);
    astnode.write = _ast2js__WEBPACK_IMPORTED_MODULE_2__["default"];
    return astnode;
}
function convert_arg(node, defval, type, context) {
    let result_type = node.annotation?.id;
    let children = new Array();
    if (defval !== undefined) {
        const child = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(defval, context);
        children.push(child);
        if (result_type === undefined) {
            result_type = child.result_type;
            if (result_type === 'jsint') result_type = 'int';
        }
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `arg.${type}`, result_type, node.arg, children);
}


/***/ }),

/***/ "./src/core_modules/functions/call/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/functions/call/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js),
/* harmony export */   default_call: () => (/* binding */ default_call)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function print_obj(obj) {
    const keys = Object.keys(obj);
    if (keys.length === 0) return [
        []
    ];
    const str = new Array(keys.length + 1);
    str[0] = `{${keys[0]}: `;
    let i;
    for(i = 1; i < keys.length; ++i)str[i] = `, ${keys[i]}: `;
    str[i] = "}";
    return [
        str,
        ...Object.values(obj)
    ];
}
function join(data, sep = ", ") {
    if (data.length === 0) return [
        [
            ""
        ]
    ];
    const str = new Array(data.length + 1);
    str[0] = "";
    let i;
    for(i = 1; i < data.length; ++i)str[i] = sep;
    str[i] = "";
    return [
        str,
        ...data
    ];
}
function default_call(node) {
    const meta = node.value.__call__;
    let kw_pos = node.children.length;
    for(let i = 1; i < node.children.length; ++i)if (node.children[i].type === "functions.keyword") {
        kw_pos = i;
        break;
    }
    let nb_pos = meta.idx_end_pos;
    if (nb_pos === Number.POSITIVE_INFINITY) nb_pos = Math.max(meta.idx_vararg, kw_pos - 1);
    let pos_size = nb_pos + 1;
    if (meta.has_kw && meta.idx_end_pos === Number.POSITIVE_INFINITY) pos_size = meta.idx_vararg + 2;
    let pos = new Array(pos_size);
    const kw = {};
    const kwargs = {};
    let has_kw = false;
    if (meta.has_kw && meta.idx_end_pos === Number.POSITIVE_INFINITY) {
        const cutoff = Math.min(kw_pos, meta.idx_vararg);
        for(let i = 1; i < cutoff; ++i)pos[i - 1] = node.children[i];
        if (meta.idx_vararg + 1 !== kw_pos) pos[meta.idx_vararg] = join([
            "[",
            join(node.children.slice(meta.idx_vararg + 1, kw_pos)),
            "]"
        ], "");
    } else {
        const cutoff = Math.min(kw_pos, nb_pos + 1);
        for(let i = 1; i < cutoff; ++i)pos[i - 1] = node.children[i];
        const args_names = meta.args_names;
        for(let i = cutoff; i < kw_pos; ++i)kw[args_names[i - 1]] = node.children[i];
        has_kw = cutoff !== kw_pos;
    }
    let has_kwargs = false;
    const args_pos = meta.args_pos;
    for(let i = kw_pos; i < node.children.length; ++i){
        const arg = node.children[i];
        const name = arg.value;
        const idx = args_pos[name];
        if (idx >= 0) {
            pos[idx] = arg;
            continue;
        }
        has_kw = true;
        if (idx === -1) kw[name] = arg;
        else {
            kwargs[name] = arg;
            has_kwargs = true;
        }
    }
    let obj = kw;
    //TODO: only the ones at -1...
    if (has_kwargs && !meta.has_kw) {
        obj = kwargs;
    } else if (has_kwargs) {
        obj[meta.kwargs] = print_obj(kwargs);
    }
    if (has_kw) pos[pos.length - 1] = print_obj(obj);
    else {
        while(pos.length > 0 && pos[pos.length - 1] === undefined)--pos.length;
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${node.children[0]}(${join(pos)})`; // args ?
}
function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(this.value.__call__.substitute_call(this));
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
    const name = node.func.id;
    const fct_type = context.local_symbols[name];
    const ret_type = fct_type.__call__.return_type();
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.call", ret_type, fct_type, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.func, context),
        ...node.args.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e, context)),
        ...node.keywords.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(e, context))
    ]);
}
convert.brython_name = "Call";


/***/ }),

/***/ "./src/core_modules/functions/call/keyword/ast2js.ts":
/*!***********************************************************!*\
  !*** ./src/core_modules/functions/call/keyword/ast2js.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.children[0]);
}


/***/ }),

/***/ "./src/core_modules/functions/call/keyword/astconvert.ts":
/*!***************************************************************!*\
  !*** ./src/core_modules/functions/call/keyword/astconvert.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const value = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    const ret_type = value.result_type;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.keyword", ret_type, node.arg, [
        value
    ]);
}
convert.brython_name = "keyword";


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

function ast2js() {
    const name = this.value;
    const args = this.children[0];
    const body = this.children[1];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`function ${name}(${args}){${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
//w('function ', name, '(', args, '){', body, NL, '}');
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var _call_ast2js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../call/ast2js */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _args_astconvert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../args/astconvert */ "./src/core_modules/functions/args/astconvert.ts");





// required as some symbols may have been declared out of order
// (not only for return type computation)
function generate(node, astnode, context) {
    // fuck...
    const stype = astnode.result_type;
    const meta = stype.__call__;
    // new context for the function local variables
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    context.parent_node_context = astnode; // <- here
    // fake the node... => better doing here to not have context issues.
    const args = (0,_args_astconvert__WEBPACK_IMPORTED_MODULE_4__.convert_args)(node, stype, context);
    for (let arg of args.children)context.local_symbols[arg.value] = arg.result_type;
    // tell body this function has been generated.
    meta.generate = undefined;
    // prevents recursive calls or reaffectation.
    meta.return_type = undefined;
    const annotation = node.returns?.id;
    if (annotation !== undefined) {
        let fct_return_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.getSType)(annotation);
        // force the type.
        meta.return_type = ()=>fct_return_type;
    }
    // convert body
    astnode.children = [
        args,
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context)
    ];
}
function convert(node, context) {
    //const isMethod = context.type === "class";
    const SType_fct = {
        __name__: "function",
        __call__: {
            args_names: new Array(node.args.args.length + node.args.posonlyargs.length),
            args_pos: {},
            idx_end_pos: -1,
            idx_vararg: -1,
            has_kw: false,
            generate,
            return_type: ()=>{
                generate(node, astnode, context); // should be the new context
                return SType_fct.__call__.return_type();
            },
            substitute_call: _call_ast2js__WEBPACK_IMPORTED_MODULE_3__.default_call
        }
    };
    //if( ! isMethod ) {
    // if method add to self_context.symbols ?
    context.local_symbols[node.name] = SType_fct;
    // implicit return...
    const last_type = node.body[node.body.length - 1].constructor.$name;
    if (last_type !== "Return" && last_type !== "Raise") {
        const fake_node = {
            constructor: {
                $name: "Return"
            },
            lineno: node.end_lineno,
            end_lineno: node.end_lineno,
            col_offset: node.end_col_offset,
            end_col_offset: node.end_col_offset
        };
        node.body.push(fake_node);
    }
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.def", SType_fct, node.name);
    return astnode;
}
convert.brython_name = "FunctionDef";


/***/ }),

/***/ "./src/core_modules/keywords/assert/ast2js.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/keywords/assert/ast2js.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`_b_.assert(${this.children[0]})`;
}


/***/ }),

/***/ "./src/core_modules/keywords/assert/astconvert.ts":
/*!********************************************************!*\
  !*** ./src/core_modules/keywords/assert/astconvert.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Assert", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context)
    ]);
}
convert.brython_name = "Assert";


/***/ }),

/***/ "./src/core_modules/keywords/assert/runtime.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/keywords/assert/runtime.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function assert(cond) {
    if (cond) return;
    throw new Error('Assertion failed');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    assert
});


/***/ }),

/***/ "./src/core_modules/keywords/break/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/keywords/break/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("break");
}


/***/ }),

/***/ "./src/core_modules/keywords/break/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/keywords/break/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "keywords.break", null);
}
convert.brython_name = "Break";


/***/ }),

/***/ "./src/core_modules/keywords/continue/ast2js.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/keywords/continue/ast2js.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("continue");
}


/***/ }),

/***/ "./src/core_modules/keywords/continue/astconvert.ts":
/*!**********************************************************!*\
  !*** ./src/core_modules/keywords/continue/astconvert.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "keywords.continue", null);
}
convert.brython_name = "Continue";


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

function ast2js() {
    if (this.value[1] === undefined) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.value[0]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${this.value[0]}: ${this.value[1]}`;
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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("const {");
    for(let i = 0; i < this.children.length; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ");
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.children[i]);
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('} = ');
    if (this.value === null) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("__SBRYTHON__.getModules()");
    else (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`__SBRYTHON__.getModule("${this.value}")`;
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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`throw new _b_.PythonError(${this.children[0]})`;
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
/* harmony import */ var _structs_tuple_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structs/tuple/astconvert.ts */ "./src/core_modules/structs/tuple/astconvert.ts");
/* harmony import */ var _structs_tuple_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structs/tuple/ast2js.ts */ "./src/core_modules/structs/tuple/ast2js.ts");
/* harmony import */ var _structs_list_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./structs/list/astconvert.ts */ "./src/core_modules/structs/list/astconvert.ts");
/* harmony import */ var _structs_list_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./structs/list/ast2js.ts */ "./src/core_modules/structs/list/ast2js.ts");
/* harmony import */ var _structs_dict_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./structs/dict/astconvert.ts */ "./src/core_modules/structs/dict/astconvert.ts");
/* harmony import */ var _structs_dict_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./structs/dict/ast2js.ts */ "./src/core_modules/structs/dict/ast2js.ts");
/* harmony import */ var _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./return/astconvert.ts */ "./src/core_modules/return/astconvert.ts");
/* harmony import */ var _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./return/ast2js.ts */ "./src/core_modules/return/ast2js.ts");
/* harmony import */ var _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pass/astconvert.ts */ "./src/core_modules/pass/astconvert.ts");
/* harmony import */ var _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pass/ast2js.ts */ "./src/core_modules/pass/ast2js.ts");
/* harmony import */ var _operators_unary_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./operators/unary/astconvert.ts */ "./src/core_modules/operators/unary/astconvert.ts");
/* harmony import */ var _operators_unary_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./operators/unary/ast2js.ts */ "./src/core_modules/operators/unary/ast2js.ts");
/* harmony import */ var _operators_compare_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./operators/compare/astconvert.ts */ "./src/core_modules/operators/compare/astconvert.ts");
/* harmony import */ var _operators_compare_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./operators/compare/ast2js.ts */ "./src/core_modules/operators/compare/ast2js.ts");
/* harmony import */ var _operators_boolean_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./operators/boolean/astconvert.ts */ "./src/core_modules/operators/boolean/astconvert.ts");
/* harmony import */ var _operators_boolean_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./operators/boolean/ast2js.ts */ "./src/core_modules/operators/boolean/ast2js.ts");
/* harmony import */ var _operators_binary_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./operators/binary/astconvert.ts */ "./src/core_modules/operators/binary/astconvert.ts");
/* harmony import */ var _operators_binary_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./operators/binary/ast2js.ts */ "./src/core_modules/operators/binary/ast2js.ts");
/* harmony import */ var _operators_binary_runtime_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./operators/binary/runtime.ts */ "./src/core_modules/operators/binary/runtime.ts");
/* harmony import */ var _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./operators/attr/astconvert.ts */ "./src/core_modules/operators/attr/astconvert.ts");
/* harmony import */ var _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./operators/attr/ast2js.ts */ "./src/core_modules/operators/attr/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./operators/[]/astconvert.ts */ "./src/core_modules/operators/[]/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./operators/[]/ast2js.ts */ "./src/core_modules/operators/[]/ast2js.ts");
/* harmony import */ var _operators_AssignOp_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./operators/AssignOp/astconvert.ts */ "./src/core_modules/operators/AssignOp/astconvert.ts");
/* harmony import */ var _operators_AssignOp_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./operators/AssignOp/ast2js.ts */ "./src/core_modules/operators/AssignOp/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
/* harmony import */ var _literals_float_runtime_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./literals/float/runtime.ts */ "./src/core_modules/literals/float/runtime.ts");
/* harmony import */ var _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./literals/f-string/astconvert.ts */ "./src/core_modules/literals/f-string/astconvert.ts");
/* harmony import */ var _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./literals/f-string/ast2js.ts */ "./src/core_modules/literals/f-string/ast2js.ts");
/* harmony import */ var _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/astconvert.ts */ "./src/core_modules/literals/f-string/FormattedValue/astconvert.ts");
/* harmony import */ var _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/ast2js.ts */ "./src/core_modules/literals/f-string/FormattedValue/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./keywords/import/astconvert.ts */ "./src/core_modules/keywords/import/astconvert.ts");
/* harmony import */ var _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./keywords/import/ast2js.ts */ "./src/core_modules/keywords/import/ast2js.ts");
/* harmony import */ var _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./keywords/import/alias/astconvert.ts */ "./src/core_modules/keywords/import/alias/astconvert.ts");
/* harmony import */ var _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./keywords/import/alias/ast2js.ts */ "./src/core_modules/keywords/import/alias/ast2js.ts");
/* harmony import */ var _keywords_continue_astconvert_ts__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./keywords/continue/astconvert.ts */ "./src/core_modules/keywords/continue/astconvert.ts");
/* harmony import */ var _keywords_continue_ast2js_ts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./keywords/continue/ast2js.ts */ "./src/core_modules/keywords/continue/ast2js.ts");
/* harmony import */ var _keywords_break_astconvert_ts__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./keywords/break/astconvert.ts */ "./src/core_modules/keywords/break/astconvert.ts");
/* harmony import */ var _keywords_break_ast2js_ts__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./keywords/break/ast2js.ts */ "./src/core_modules/keywords/break/ast2js.ts");
/* harmony import */ var _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./keywords/assert/astconvert.ts */ "./src/core_modules/keywords/assert/astconvert.ts");
/* harmony import */ var _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./keywords/assert/ast2js.ts */ "./src/core_modules/keywords/assert/ast2js.ts");
/* harmony import */ var _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./keywords/assert/runtime.ts */ "./src/core_modules/keywords/assert/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _functions_call_keyword_astconvert_ts__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./functions/call/keyword/astconvert.ts */ "./src/core_modules/functions/call/keyword/astconvert.ts");
/* harmony import */ var _functions_call_keyword_ast2js_ts__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./functions/call/keyword/ast2js.ts */ "./src/core_modules/functions/call/keyword/ast2js.ts");
/* harmony import */ var _functions_args_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./functions/args/astconvert.ts */ "./src/core_modules/functions/args/astconvert.ts");
/* harmony import */ var _functions_args_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./functions/args/ast2js.ts */ "./src/core_modules/functions/args/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ternary_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./controlflows/ternary/astconvert.ts */ "./src/core_modules/controlflows/ternary/astconvert.ts");
/* harmony import */ var _controlflows_ternary_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./controlflows/ternary/ast2js.ts */ "./src/core_modules/controlflows/ternary/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");
/* harmony import */ var _body_astconvert_ts__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./body/astconvert.ts */ "./src/core_modules/body/astconvert.ts");
/* harmony import */ var _body_ast2js_ts__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./body/ast2js.ts */ "./src/core_modules/body/ast2js.ts");





















































































const MODULES = {
    "symbol": {
        AST_CONVERT: _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
        AST2JS: _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    "structs.tuple": {
        AST_CONVERT: _structs_tuple_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
        AST2JS: _structs_tuple_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    "structs.list": {
        AST_CONVERT: _structs_list_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
        AST2JS: _structs_list_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    "structs.dict": {
        AST_CONVERT: _structs_dict_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
        AST2JS: _structs_dict_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    "return": {
        AST_CONVERT: _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
        AST2JS: _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    "pass": {
        AST_CONVERT: _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
        AST2JS: _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    "operators.unary": {
        AST_CONVERT: _operators_unary_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _operators_unary_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "operators.compare": {
        AST_CONVERT: _operators_compare_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _operators_compare_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "operators.boolean": {
        AST_CONVERT: _operators_boolean_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _operators_boolean_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    },
    "operators.binary": {
        AST_CONVERT: _operators_binary_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _operators_binary_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "operators.attr": {
        AST_CONVERT: _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_21__["default"],
        AST2JS: _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_22__["default"]
    },
    "operators.[]": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_23__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_24__["default"]
    },
    "operators.AssignOp": {
        AST_CONVERT: _operators_AssignOp_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__["default"],
        AST2JS: _operators_AssignOp_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__["default"]
    },
    "literals.str": {
        AST_CONVERT: _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__["default"],
        AST2JS: _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__["default"]
    },
    "literals.float": {
        AST_CONVERT: _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__["default"],
        AST2JS: _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__["default"]
    },
    "literals.f-string": {
        AST_CONVERT: _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_36__["default"],
        AST2JS: _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_37__["default"]
    },
    "literals.f-string/FormattedValue": {
        AST_CONVERT: _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_38__["default"],
        AST2JS: _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_39__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_40__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_41__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__["default"]
    },
    "keywords.raise": {
        AST_CONVERT: _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__["default"],
        AST2JS: _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__["default"]
    },
    "keywords.import": {
        AST_CONVERT: _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_47__["default"],
        AST2JS: _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_48__["default"]
    },
    "keywords.import/alias": {
        AST_CONVERT: _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_49__["default"],
        AST2JS: _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_50__["default"]
    },
    "keywords.continue": {
        AST_CONVERT: _keywords_continue_astconvert_ts__WEBPACK_IMPORTED_MODULE_51__["default"],
        AST2JS: _keywords_continue_ast2js_ts__WEBPACK_IMPORTED_MODULE_52__["default"]
    },
    "keywords.break": {
        AST_CONVERT: _keywords_break_astconvert_ts__WEBPACK_IMPORTED_MODULE_53__["default"],
        AST2JS: _keywords_break_ast2js_ts__WEBPACK_IMPORTED_MODULE_54__["default"]
    },
    "keywords.assert": {
        AST_CONVERT: _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__["default"],
        AST2JS: _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_58__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_59__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_60__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_61__["default"]
    },
    "functions.call/keyword": {
        AST_CONVERT: _functions_call_keyword_astconvert_ts__WEBPACK_IMPORTED_MODULE_62__["default"],
        AST2JS: _functions_call_keyword_ast2js_ts__WEBPACK_IMPORTED_MODULE_63__["default"]
    },
    "functions.args": {
        AST_CONVERT: _functions_args_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__["default"],
        AST2JS: _functions_args_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_71__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_72__["default"]
    },
    "controlflows.ternary": {
        AST_CONVERT: _controlflows_ternary_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__["default"],
        AST2JS: _controlflows_ternary_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__["default"]
    },
    "class.classdef": {
        AST_CONVERT: _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__["default"],
        AST2JS: _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__["default"]
    },
    "body": {
        AST_CONVERT: _body_astconvert_ts__WEBPACK_IMPORTED_MODULE_83__["default"],
        AST2JS: _body_ast2js_ts__WEBPACK_IMPORTED_MODULE_84__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _operators_binary_runtime_ts__WEBPACK_IMPORTED_MODULE_20__["default"]);
Object.assign(RUNTIME, _literals_float_runtime_ts__WEBPACK_IMPORTED_MODULE_35__["default"]);
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_46__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_57__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_70__["default"]);
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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("null");
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function convert(node, _context) {
    if (!(typeof node.value === "object") || !("__class__" in node.value) || node.value.__class__.__qualname__ !== "NoneType") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.None", structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_NoneType, null);
}
convert.brython_name = "Constant";


/***/ }),

/***/ "./src/core_modules/literals/None/stype.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/literals/None/stype.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");

(0,structs_STypes__WEBPACK_IMPORTED_MODULE_0__.addSType)('NoneType', {});


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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.value);
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function convert(node, _context) {
    if (typeof node.value !== "boolean") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.bool", structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_bool, node.value);
}
convert.brython_name = "Constant";


/***/ }),

/***/ "./src/core_modules/literals/bool/stype.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/literals/bool/stype.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


(0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.addSType)('bool', {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.CMPOPS_LIST, [
        structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_bool,
        structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_jsint
    ])
});


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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("${", this.children[0], "}");
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("`");
    for (let child of this.children){
        if (child.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_str) {
            const start = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.jscode_cursor)();
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(child.value);
            child.jscode = {
                start,
                end: (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.jscode_cursor)()
            };
        } else if (child.type === "literals.f-string.FormattedValue") {
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(child);
        } else throw new Error("unsupported");
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("`");
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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.value);
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function convert(node, _context) {
    if (!(node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.float", structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_float, node.value.value);
}
convert.brython_name = "Constant";


/***/ }),

/***/ "./src/core_modules/literals/float/runtime.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/literals/float/runtime.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    float2str: (f)=>{
        if (f <= 1e-5 || f >= 1e16) {
            let str = f.toExponential();
            const sign_idx = str.length - 2;
            if (str[sign_idx] === '-' || str[sign_idx] === '+') str = str.slice(0, sign_idx + 1) + '0' + str.slice(sign_idx + 1);
            return str;
        }
        let str = f.toString();
        if (!str.includes('.')) str += ".0";
        return str;
    }
});


/***/ }),

/***/ "./src/core_modules/literals/float/stype.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/literals/float/stype.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



const SType_type_float = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('type[float]', {
    __call__: {
        //TODO...
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        substitute_call: (node)=>{
            const other = node.children[1];
            const other_type = other.result_type;
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(other);
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float || other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint) return other_type;
            //TODO: power...
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str) {
                if (other.type === "literals.str") {
                    if (other.value === "inf" || other.value === "infinity") return "Number.POSITIVE_INFINITY";
                    if (other.value === "-inf" || other.value === "-infinity") return "Number.NEGATIVE_INFINITY";
                }
                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;
                //TODO: optimize if other is string litteral...
                return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`parseFloat(${other})`; //, ${node.children[2]}))`; 
            }
            const method = other.result_type?.__int__;
            if (method === undefined) throw new Error(`${other.result_type.__name__}.__int__ not defined`);
            return method.substitute_call(node, other);
        }
    }
});
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('float', {
    // @ts-ignore
    __class__: SType_type_float,
    __str__: {
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str,
        substitute_call (node) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.float2str(${node})`;
        }
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float, [
        '**',
        '*',
        '/',
        '+',
        '-'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool
    ], {
        convert_other: {
            'int': 'float'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float, [
        '//'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool
    ], {
        convert_other: {
            'int': 'float'
        },
        substitute_call (node, self, other) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float, [
        '%'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool
    ], {
        convert_other: {
            'int': 'float'
        },
        substitute_call (node, self, other) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float, [
        'u.-'
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool
    ])
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float);


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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function ast2js() {
    let suffix = "";
    let target = this.as;
    let value = this.value;
    if (target === "float") {
        if (this.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int) value = Number(value); // remove useless precision.
    } else if (target === "int" || this.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int) // if already bigint do not cast into jsint (loss of precision).
    suffix = "n";
    // 1e+54 should had be stored as bigint.
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${value}${suffix}`;
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function convert(node, _context) {
    let value = node.value;
    if (value.__class__?.__qualname__ === "int") value = value.value;
    if (typeof value !== "number" && typeof value !== "bigint") return;
    const real_type = typeof value !== "number" ? structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int : structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_jsint;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.int", real_type, value);
}
convert.brython_name = "Constant";


/***/ }),

/***/ "./src/core_modules/literals/int/stype.ts":
/*!************************************************!*\
  !*** ./src/core_modules/literals/int/stype.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



const SType_type_int = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('type[int]', {
    __call__: {
        //TODO...
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        substitute_call: (node)=>{
            const other = node.children[1];
            const other_type = other.result_type;
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) return other;
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(other);
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(Math.trunc(${other}))`;
            //TODO: power...
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str) {
                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;
                //TODO: optimize if other is string litteral...
                return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(${other})`; //, ${node.children[2]}))`; 
            }
            const method = other.result_type?.__int__;
            if (method === undefined) throw new Error(`${other.result_type.__name__}.__int__ not defined`);
            return method.substitute_call(node, other);
        }
    }
});
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('int', {
    //TODO: fix type...
    // @ts-ignore
    __class__: SType_type_int,
    __str__: {
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str,
        substitute_call (node) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${node}.toString()`;
        }
    },
    __int__: {
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        substitute_call (node, self) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.id_jsop)(node, self);
        }
    },
    /* */ ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        // '**' => if "as float" could accept loss of precision.
        '**',
        '+',
        '-',
        '&',
        '|',
        '^',
        '>>',
        '<<'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        convert_other: {
            'jsint': 'int'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        '*'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int
    ], {
        substitute_call (node, a, b) {
            const opti = node.as === 'float';
            if (opti) {
                // TODO: check if really interesting...
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(b));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float, [
        '/'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float
    ], {
        convert_self: (s)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(s, 'float'),
        convert_other: {
            'int': 'float'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        '//'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        convert_other: {
            "jsint": "int"
        },
        substitute_call: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        '%'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        convert_other: {
            "jsint": "int"
        },
        substitute_call: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        'u.-'
    ], {
        substitute_call: (node, a)=>{
            const opti = node.as === 'real';
            if (opti) {
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        '~'
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool
    ])
});


/***/ }),

/***/ "./src/core_modules/literals/int/stype_jsint.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/literals/int/stype_jsint.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('jsint', {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, // '**' and '*' => if "as float" could accept loss of precision.
    [
        '**',
        '+',
        '-',
        '&',
        '|',
        '^',
        '>>',
        '<<' // in JS bit operations are on 32bits
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        convert_self: (self)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(self),
        convert_other: {
            'jsint': 'int'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        '*'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        substitute_call: (node, a, b)=>{
            const opti = node.as === 'float';
            if (opti) {
                // TODO: check if really interesting...
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(b));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(b));
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float, [
        '/'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float
    ], {
        convert_other: {
            'int': 'float'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint, [
        '//'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        substitute_call: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint, [
        '%'
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        substitute_call: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint, [
        'u.-'
    ], {
        substitute_call: (node, a)=>{
            const opti = node.as === 'int';
            if (opti) {
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(a));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int, [
        '~'
    ], {
        convert_self: (self)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(self)
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool
    ])
});


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

function ast2js() {
    if (this.value[0] === '"') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.value);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`"${this.value}"`;
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function convert(node, _context) {
    if (typeof node.value !== "string") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.str", structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_str, node.value);
}
convert.brython_name = "Constant";


/***/ }),

/***/ "./src/core_modules/literals/str/stype.ts":
/*!************************************************!*\
  !*** ./src/core_modules/literals/str/stype.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



const SType_type_str = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('type[str]', {
    __call__: {
        //TODO...
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str,
        substitute_call: (node)=>{
            const other = node.children[1];
            const other_type = other.result_type;
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str) return other;
            const method = other.result_type?.__str__;
            if (method === undefined) throw new Error(`${other.result_type.__name__}.__str__ not defined`);
            return method.substitute_call(other);
        }
    }
});
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('str', {
    // @ts-ignore
    __class__: SType_type_str,
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str, [
        "+"
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str, [
        "*"
    ], [
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint
    ], {
        convert_other: {
            "int": "float"
        },
        substitute_call: (node, a, b)=>{
            if (a.result_type !== structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str) [a, b] = [
                b,
                a
            ];
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}.repeat(${b})`;
        }
    })
});


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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js() {
    if (this.type.endsWith("(init)")) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("var ");
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.children[0]);
    for(let i = 1; i < this.children.length - 1; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)` = ${this.children[i]}`;
    const right_node = this.children[this.children.length - 1];
    let rchild = right_node;
    if (right_node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint && this.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) rchild = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(right_node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)` = ${rchild}`;
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    let type = "operators.=";
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    let right_type = right.result_type;
    let result_type = null;
    const annotation = node?.annotation?.id;
    if (annotation !== undefined) result_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.getSType)(annotation);
    if (result_type !== null && result_type !== right_type) {
        console.warn("Wrong result_type");
    }
    if (result_type === null) {
        result_type = right_type;
        if (right_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint) result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int; // prevents issues.
    //TODO: only if assign...
    }
    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [
        node.target
    ];
    const lefts = targets.map((n)=>{
        const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context);
        // could be improved I guess.
        if (left.type === "symbol") {
            // if exists, ensure type.
            if (left.value in context.local_symbols) {
                const left_type = context.local_symbols[left.value];
                if (left_type !== null && right_type !== left_type) {} //console.warn("Wrong result_type");
            // annotation_type
            } else if (context.type !== "class") {
                context.local_symbols[left.value] = result_type;
                type += "(init)";
            }
        }
        return left;
    });
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, result_type, null, [
        ...lefts,
        right
    ]);
}
convert.brython_name = [
    "Assign",
    "AnnAssign"
];


/***/ }),

/***/ "./src/core_modules/operators/AssignOp/ast2js.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/operators/AssignOp/ast2js.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js() {
    let left = this.children[0];
    let right = this.children[1];
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.AssignOperators[this.value];
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType;
    let method = left.result_type?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try a = a + b
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType) {
        throw new Error(`${right.result_type} ${op}= ${left.result_type} NOT IMPLEMENTED!`);
    /*
        op     = reversed_operator(op);
        method = name2SType(right.result_type as STypeName)?.[op];
        if( method !== undefined)
            type   = method.return_type(left.result_type);

        if( type === SType_NOT_IMPLEMENTED)
            throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);

        [left, right] = [right, left];
        */ }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(this, left, right));
}


/***/ }),

/***/ "./src/core_modules/operators/AssignOp/astconvert.ts":
/*!***********************************************************!*\
  !*** ./src/core_modules/operators/AssignOp/astconvert.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");



function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.target, context);
    let right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.binary", left.result_type, op, [
        left,
        right
    ]);
}
convert.brython_name = [
    "AugAssign"
];


/***/ }),

/***/ "./src/core_modules/operators/[]/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/operators/[]/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${this.children[0]}[${this.children[1]}]`;
}


/***/ }),

/***/ "./src/core_modules/operators/[]/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/operators/[]/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.[]", null, null, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.slice, context)
    ]);
}
convert.brython_name = [
    "Subscript"
];


/***/ }),

/***/ "./src/core_modules/operators/attr/ast2js.ts":
/*!***************************************************!*\
  !*** ./src/core_modules/operators/attr/ast2js.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${this.children[0]}.${this.value}`;
}


/***/ }),

/***/ "./src/core_modules/operators/attr/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/operators/attr/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.attr", null, node.attr, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context)
    ]);
}
convert.brython_name = [
    "Attribute"
];


/***/ }),

/***/ "./src/core_modules/operators/binary/ast2js.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/operators/binary/ast2js.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    let left = this.children[0];
    let right = this.children[1];
    const method = left.result_type[this.value];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(this, left, right));
}


/***/ }),

/***/ "./src/core_modules/operators/binary/astconvert.ts":
/*!*********************************************************!*\
  !*** ./src/core_modules/operators/binary/astconvert.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    let right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_NotImplementedType;
    let method = left.result_type?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try reversed operator
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_NotImplementedType) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.reversed_operator)(op);
        method = right.result_type?.[op];
        if (method !== undefined) type = method.return_type(left.result_type);
        if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_NotImplementedType) throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);
        [left, right] = [
            right,
            left
        ];
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.binary", type, op, [
        left,
        right
    ]);
}
convert.brython_name = [
    "BinOp"
];


/***/ }),

/***/ "./src/core_modules/operators/binary/runtime.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/operators/binary/runtime.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    floordiv_float: (a, b)=>{
        return Math.floor(a / b);
    },
    floordiv_int: (a, b)=>{
        let result = a / b;
        if (result > 0 || a % b === 0n) return result;
        return --result;
    },
    mod_float: (a, b)=>{
        const mod = (a % b + b) % b;
        if (mod === 0 && b < 0) return -0;
        return mod;
    },
    mod_int: (a, b)=>{
        return (a % b + b) % b;
    }
});


/***/ }),

/***/ "./src/core_modules/operators/boolean/ast2js.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/operators/boolean/ast2js.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");


function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.multi_jsop)(this, this.value, ...this.children));
}


/***/ }),

/***/ "./src/core_modules/operators/boolean/astconvert.ts":
/*!**********************************************************!*\
  !*** ./src/core_modules/operators/boolean/astconvert.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


const bname2jsop = {
    'And': '&&',
    'Or': '||'
};
function convert(node, context) {
    let children = node.values.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context));
    const op = bname2jsop[node.op.constructor.$name];
    const type = children[0].result_type;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.boolean", type, op, children);
}
convert.brython_name = [
    "BoolOp"
];


/***/ }),

/***/ "./src/core_modules/operators/compare/ast2js.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/operators/compare/ast2js.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function find_and_call_substitute(node, left, op, right) {
    let reversed = false;
    const rtype = right.result_type;
    const ltype = left.result_type;
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType;
    let method = left.result_type?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.reversed_operator)(op);
        method = right.result_type?.[op];
        if (method !== undefined) type = method.return_type(left.result_type);
        if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType) {
            if (op !== '__eq__' && op !== '__ne__') throw new Error(`${ltype} ${op} ${rtype} not implemented!`);
            const jsop = op === '__eq__' ? '===' : '!==';
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, left, jsop, right);
        }
        reversed = true;
        [left, right] = [
            right,
            left
        ];
    }
    return method.substitute_call(node, left, right, reversed);
}
function ast2js() {
    for(let i = 0; i < this.value.length; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(' && ');
        const op = this.value[i];
        const left = this.children[i];
        const right = this.children[i + 1];
        if (op === 'is') {
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(this, left, '===', right));
            continue;
        }
        if (op === 'is not') {
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(this, left, '!==', right));
            continue;
        }
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(find_and_call_substitute(this, left, op, right));
    }
}


/***/ }),

/***/ "./src/core_modules/operators/compare/astconvert.ts":
/*!**********************************************************!*\
  !*** ./src/core_modules/operators/compare/astconvert.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(node, context) {
    const ops = node.ops.map((e)=>{
        const op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[e.constructor.$name];
        if (op === undefined) throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const rights = node.comparators.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context));
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `operators.compare`, structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_bool, ops, [
        left,
        ...rights
    ]);
}
convert.brython_name = "Compare";


/***/ }),

/***/ "./src/core_modules/operators/unary/ast2js.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/operators/unary/ast2js.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");


function ast2js() {
    let left = this.children[0];
    if (this.value === 'not') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(this, '!', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(left, 'jsint')));
    const method = left.result_type[this.value];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(this, left));
}


/***/ }),

/***/ "./src/core_modules/operators/unary/astconvert.ts":
/*!********************************************************!*\
  !*** ./src/core_modules/operators/unary/astconvert.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.operand, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    if (op === 'not') return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.unary", structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_bool, "not", [
        left
    ]);
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_NotImplementedType;
    let method = left.result_type?.[op];
    if (method !== undefined) type = method.return_type();
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_NotImplementedType) throw new Error(`${op} ${left.result_type} NOT IMPLEMENTED!`);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.unary", type, op, [
        left
    ]);
}
convert.brython_name = [
    "UnaryOp"
];


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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("/* not implemented */");
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
    if (this.children.length === 0) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("return null");
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`return ${this.children[0]}`;
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    // context.parent_node_context
    let result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NoneType;
    let children = undefined;
    if (node.value !== undefined) {
        const expr = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
        result_type = expr.result_type;
        children = [
            expr
        ];
    }
    const meta = context.parent_node_context.result_type.__call__;
    if (meta.return_type === undefined) meta.return_type = ()=>result_type;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.return", result_type, null, children);
}
convert.brython_name = "Return";


/***/ }),

/***/ "./src/core_modules/structs/dict/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/structs/dict/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('{');
    if (this.children.length > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${this.children[0]}: ${this.children[1]}`;
    for(let i = 2; i < this.children.length; i += 2)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`, ${this.children[i]}: ${this.children[i + 1]}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('}');
}


/***/ }),

/***/ "./src/core_modules/structs/dict/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/structs/dict/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    let children = new Array(node.keys.length * 2);
    for(let i = 0; i < node.keys.length; ++i){
        children[2 * i] = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.keys[i], context);
        children[2 * i + 1] = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.values[i], context);
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "structs.dict", null, null, children);
}
convert.brython_name = "Dict";


/***/ }),

/***/ "./src/core_modules/structs/list/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/structs/list/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("[");
    if (this.children.length > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.children[0]);
    for(let i = 1; i < this.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ", this.children[i]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("])");
}


/***/ }),

/***/ "./src/core_modules/structs/list/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/structs/list/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "structs.list", null, null, node.elts.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context)));
}
convert.brython_name = "List";


/***/ }),

/***/ "./src/core_modules/structs/tuple/ast2js.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/structs/tuple/ast2js.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("Object.freeze([");
    if (this.children.length > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.children[0]);
    for(let i = 1; i < this.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ", this.children[i]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("])");
}


/***/ }),

/***/ "./src/core_modules/structs/tuple/astconvert.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/structs/tuple/astconvert.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "structs.list", null, null, node.elts.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context)));
}
convert.brython_name = "Tuple";


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

function ast2js() {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(this.value);
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

function isClass(_) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}
function convert(node, context) {
    let result_type = null;
    let value = node.id;
    if (value === 'self') value = 'this'; //TODO type of current context ! -> self in local_symbols ?
    else if (value in context.local_symbols) result_type = context.local_symbols[value];
    /*
        //TODO globalSymbols
    else if(value in _r_) {
        if( isClass(_r_[value as keyof typeof _r_]) )
            result_type = `class.${value}`;

        value = `_r_.${value}`;
    }
    */ return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "symbol", result_type, value);
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
/* harmony export */   Context: () => (/* binding */ Context),
/* harmony export */   convert_ast: () => (/* binding */ convert_ast),
/* harmony export */   convert_node: () => (/* binding */ convert_node),
/* harmony export */   list2astnode: () => (/* binding */ list2astnode),
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
// Brython must be imported before.


const modules = {};
for(let module_name in _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__["default"]){
    const module = _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__["default"][module_name];
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
        body: convert_ast(_ast),
        filename
    };
}
function convert_ast(ast) {
    const context = new Context();
    //TODO: builtin_symbols
    //TODO: fix types...
    //@ts-ignore
    context.local_symbols['int'] = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int.__class__;
    //@ts-ignore
    context.local_symbols['str'] = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_str.__class__;
    //@ts-ignore
    context.local_symbols['float'] = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_float.__class__;
    return convert_node(ast.body, context);
}
function getNodeType(brython_node) {
    // likely a body.
    if (Array.isArray(brython_node)) return "Body";
    return brython_node.constructor.$name;
}
function convert_node(brython_node, context) {
    let name = getNodeType(brython_node);
    if (name === "Expr") {
        brython_node = brython_node.value;
        name = getNodeType(brython_node);
    }
    if (!(name in modules)) {
        console.warn("Module not registered:", name);
        console.warn(`at ${brython_node.lineno}:${brython_node.col_offset}`);
        console.log(brython_node);
        name = "null";
    }
    // we may have many modules for the same node type.
    for (let module of modules[name]){
        const result = module.AST_CONVERT(brython_node, context);
        if (result !== undefined) {
            result.write = module.AST2JS;
            return result;
        }
    }
    console.error(brython_node);
    throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
}
function list2astnode(node) {
    const beg = node[0];
    const end = node[node.length - 1];
    return {
        lineno: beg.lineno,
        col_offset: beg.col_offset,
        end_lineno: end.end_lineno,
        end_col_offset: end.end_col_offset
    };
}
class Context {
    constructor(type = "?", parent_context = null){
        this.type = type;
        this.local_symbols = parent_context === null ? Object.create(null) : {
            ...parent_context.local_symbols
        };
    }
    type;
    parent_node_context;
    local_symbols;
}


/***/ }),

/***/ "./src/py2ast_fast.ts":
/*!****************************!*\
  !*** ./src/py2ast_fast.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/symbol/ast2js */ "./src/core_modules/symbol/ast2js.ts");
/* harmony import */ var _core_modules_literals_int_ast2js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core_modules/literals/int/ast2js */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _core_modules_literals_str_ast2js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/literals/str/ast2js */ "./src/core_modules/literals/str/ast2js.ts");
// @ts-nocheck

function py2ast(code, filename) {
    const nodes = new Array();
    let cursor = {
        offset: 0,
        line: 1,
        line_offset: 0
    };
    let char;
    do {
        nodes.push(parseExpression(code, cursor));
        char = code[cursor.offset];
        while(char === '\n'){
            char = code[++cursor.offset];
            ++cursor.line;
        }
        cursor.line_offset = cursor.offset;
    }while (char !== undefined)
    //const parser = new $B.Parser(code, filename, 'file');
    //const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    return {
        nodes,
        filename
    };
}

function parseSymbol(code, cursor) {
    const begin_str = cursor.offset;
    let car = code[cursor.offset];
    while(car >= 'a' && car <= 'z' || car >= 'A' && car <= 'Z' || car >= '0' && car <= '9' || car == '_')car = code[++cursor.offset];
    const symbol = code.slice(begin_str, cursor.offset);
    //TODO: if keyword...
    return {
        type: "symbol",
        value: symbol,
        children: [],
        result_type: null,
        toJS: _core_modules_symbol_ast2js__WEBPACK_IMPORTED_MODULE_1__["default"]
    };
}

function parseNumber(code, cursor) {
    const begin_str = cursor.offset;
    //TODO: real...
    let car = code[cursor.offset];
    while(car >= '0' && car <= '9')car = code[++cursor.offset];
    return {
        type: "literals.int",
        value: code.slice(begin_str, cursor.offset),
        children: [],
        result_type: null,
        toJS: _core_modules_literals_int_ast2js__WEBPACK_IMPORTED_MODULE_2__["default"]
    };
}

function parseString(code, cursor) {
    const begin_str = cursor.offset;
    let car = code[++cursor.offset];
    while(car !== undefined && car !== '"' && code[cursor.offset - 1] !== '\\')car = code[++cursor.offset];
    ++cursor.offset;
    return {
        type: "literals.string",
        value: code.slice(begin_str, cursor.offset),
        children: [],
        result_type: null,
        toJS: _core_modules_literals_str_ast2js__WEBPACK_IMPORTED_MODULE_3__["default"]
    };
}
function parseExpression(code, cursor) {
    let char = code[cursor.offset];
    let left = parseToken(code, cursor);
    char = code[cursor.offset];
    if (char === '\n') return left;
    let op = parseToken(code, cursor);
    op.children[0] = left;
    op.pycode.start = left.pycode.start;
    let values = [
        op,
        parseToken(code, cursor)
    ];
    char = code[cursor.offset];
    while(char !== '\n'){
        let op2 = parseToken(code, cursor);
        let right = parseToken(code, cursor);
        let op1 = values[values.length - 2];
        let left = values[values.length - 1];
        //TODO: handle op priority...
        // (a+b)+c
        // (a+b)
        op1.children[1] = left;
        op1.pycode.end = left.pycode.end;
        // ()+c
        op2.children[0] = op1;
        op2.pycode.start = op1.pycode.start;
        values[values.length - 2] = op2;
        values[values.length - 1] = right;
        char = code[cursor.offset];
    }
    values[0].children[1] = values[1];
    values[0].pycode.end = values[1].pycode.end;
    return values[0];
}
function parseOperator(code, cursor) {
    const begin_str = cursor.offset;
    let char = code[cursor.offset++];
    /*
    while( car !== undefined && car !== '' && code[cursor.offset-1] !== '\\' )
        car = code[++cursor.offset];*/ return {
        type: "operators." + char,
        value: null,
        children: [
            undefined,
            undefined
        ],
        result_type: null,
        toJS: _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__["default"]["operators." + char].AST2JS
    };
}
function parseToken(code, cursor) {
    // ignore whitespace
    let char = code[cursor.offset];
    while(char === ' ' || char === '\t')char = code[++cursor.offset];
    // ignore char
    if (char === undefined) return null;
    const start = {
        line: cursor.line,
        col: cursor.offset - cursor.line_offset
    };
    let node = null;
    if (char === '"') node = parseString(code, cursor);
    else if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char == '_') node = parseSymbol(code, cursor);
    else if (char >= '0' && char <= '9') node = parseNumber(code, cursor);
    else node = parseOperator(code, cursor);
    //; throw new Error(`Error when parsing ${char} at ${cursor.line}:${cursor.offset - cursor.line_offset} (${cursor.offset})`);
    node.pycode = {
        start,
        end: {
            line: cursor.line,
            col: cursor.offset - cursor.line_offset
        }
    };
    //TODO: is next an operator ? -> construire arbre...
    //TODO handle operators ?
    return node;
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
    buildModule(jscode, ast) {
        if (ast.filename in this.#registered_AST) throw new Error(`AST ${ast.filename} already registered!`);
        //TODO: filename 2 modulename.
        this.#registered_AST[ast.filename] = ast;
        //console.log(jscode);
        return new Function("__SBRYTHON__", `${jscode}\nreturn __exported__;`);
    }
    runJSCode(jscode, ast) {
        this.#exported[ast.filename] = this.buildModule(jscode, ast)(this);
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
    write;
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


/***/ }),

/***/ "./src/structs/BinaryOperators.ts":
/*!****************************************!*\
  !*** ./src/structs/BinaryOperators.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssignOperators: () => (/* binding */ AssignOperators),
/* harmony export */   BinaryOperators: () => (/* binding */ BinaryOperators),
/* harmony export */   CMPOPS_LIST: () => (/* binding */ CMPOPS_LIST),
/* harmony export */   Int2Number: () => (/* binding */ Int2Number),
/* harmony export */   JSOperators: () => (/* binding */ JSOperators),
/* harmony export */   Number2Int: () => (/* binding */ Number2Int),
/* harmony export */   binary_jsop: () => (/* binding */ binary_jsop),
/* harmony export */   bname2pyname: () => (/* binding */ bname2pyname),
/* harmony export */   genBinaryOps: () => (/* binding */ genBinaryOps),
/* harmony export */   genCmpOps: () => (/* binding */ genCmpOps),
/* harmony export */   genUnaryOps: () => (/* binding */ genUnaryOps),
/* harmony export */   id_jsop: () => (/* binding */ id_jsop),
/* harmony export */   jsop2pyop: () => (/* binding */ jsop2pyop),
/* harmony export */   multi_jsop: () => (/* binding */ multi_jsop),
/* harmony export */   reversed_operator: () => (/* binding */ reversed_operator),
/* harmony export */   unary_jsop: () => (/* binding */ unary_jsop)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var _ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var _STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./STypes */ "./src/structs/STypes.ts");



const bname2pyname = {
    "USub": "__neg__",
    "Not": "not",
    "Pow": "__pow__",
    "Mult": "__mul__",
    "Div": "__truediv__",
    "FloorDiv": "__floordiv__",
    "Mod": "__mod__",
    "Add": "__add__",
    "Sub": "__sub__",
    "Is": "is",
    "IsNot": "is not",
    "Eq": "__eq__",
    "NotEq": "__ne__",
    "Gt": "__gt__",
    "GtE": "__ge__",
    "Lt": "__lt__",
    "LtE": "__le__",
    "Invert": "__not__",
    "BitOr": "__or__",
    "BitXor": "__xor__",
    "BitAnd": "__and__",
    "RShift": "__rshift__",
    "LShift": "__lshift__"
};
const BinaryOperators = {
    '__pow__': '__rpow__',
    '__mul__': '__rmul__',
    '__truediv__': '__rtruediv__',
    '__floordiv__': '__rfloordiv__',
    '__mod__': '__rmod__',
    '__add__': '__radd__',
    '__sub__': '__rsub__',
    '__eq__': '__eq__',
    '__ne__': '__ne__',
    '__lt__': '__gt__',
    '__gt__': '__lt__',
    '__le__': '__ge__',
    '__ge__': '__le__',
    '__not__': '__rnot__',
    '__or__': '__ror__',
    '__and__': '__rand__',
    '__xor__': '__rxor__',
    '__lshift__': '__rlshift__',
    '__rshift__': '__rrshift__'
};
const AssignOperators = {
    '__pow__': '__ipow__',
    '__mul__': '__imul__',
    '__truediv__': '__itruediv__',
    '__floordiv__': '__ifloordiv__',
    '__mod__': '__imod__',
    '__add__': '__iadd__',
    '__sub__': '__isub__',
    '__or__': '__ior__',
    '__and__': '__iand__',
    '__xor__': '__ixor__',
    '__lshift__': '__ilshift__',
    '__rshift__': '__irshift__'
};
const jsop2pyop = {
    '**': 'pow',
    '*': 'mul',
    '/': 'truediv',
    '//': 'floordiv',
    '%': 'mod',
    '+': 'add',
    '-': 'sub',
    'u.-': 'neg',
    '==': 'eq',
    '!=': 'ne',
    '<': 'lt',
    '<=': 'le',
    '>=': 'ge',
    '>': 'gt',
    '~': 'not',
    '|': 'or',
    '&': 'and',
    '^': 'xor',
    '<<': 'lshift',
    '>>': 'rshift'
};
// TODO: unary op too...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
const JSOperators = [
    [
        '!',
        '++',
        '--',
        '~',
        'u.-'
    ],
    [
        '**'
    ],
    [
        '*',
        '/',
        '%'
    ],
    [
        '+',
        '-'
    ],
    [
        '<<',
        '>>',
        '>>>'
    ],
    [
        '<',
        '<=',
        '>=',
        '>'
    ],
    [
        '==',
        '!=',
        '===',
        '!=='
    ],
    [
        '&'
    ],
    [
        '^'
    ],
    [
        '|'
    ],
    [
        '&&'
    ],
    [
        '||',
        '??'
    ],
    [
        '='
    ] // right to left !
];
/*
https://docs.python.org/3/library/functions.html#callable

-> classes
bool()
float()
int()
str()
bytearray() [Uint8Array] (RW)
bytes()     [?]          (RO) <- no types in JS...
                              <- Uint8Array with flag ? freeze() [JS unsafe]
            b"e\xFF" instead of [101,101], etc. (32 <= byt <= 126)
type()
list()      [Array]
tuple()     [Object.frozen(Array)]

set()       // relies on hash()... => set[literals]
                            => set() / <- JS set.
                       => bytes/bytearray/etc.
                            => inherit Set()
                                => Internal keys() set [recompute hash when add/remove]
                                  or
                                => internally stored as Map(hash, value) (?)
frozenset()            => extends set to replace modifiers.

dict()
                        dict[str] as Object.create(null) + (and pure JSObj as dict[str] )
                        => inherit Map()
                            => Set(hash) / Map(hash, key) / Map(key, hash) ???
                                // get/set.
                            => Map(key, value)

object()
complex()
memoryview()            => ArrayBuffer ?

-> print
ascii()
bin()
hex()
oct()
repr()
hash()

-> maths
abs()
divmod()
pow()
round()

-> lists
all()
any()
filter()
map()
max()
min()
sum()
len()
enumerate()
reversed()
slice()
sorted()
zip()

-> iter
range()
aiter()
iter()
anext()
next()

-> str
ord()
chr()
format()
print()
f""

callable()
classmethod()
staticmethod()
property()
super()
isinstance()
issubclass()
delattr()
getattr()
hasattr()
setattr()
dir()

eval()
exec()
compile()
breakpoint()

globals()
locals()
vars()
__import__()

id()
    -> on-demand weakref ?

help()
input()
open()

*/ /*
unary
- pos (unary +)

- bool
- float
- int
- str
- repr

- abs
- ceil
- floor
- round
- trunc

binary
- pow/rpow
- divmod/rdivmod

class
- class
- new
- init
- init_subclass

- subclasshook // __isinstancecheck__ 

- dir
- delattr
- setattr
- getattribute

- doc
- format
- getnewargs
- hash
- index (?)
- sizeof
*/ function Int2Number(a, target = "float") {
    if (a.result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint) return a;
    if (a.type === 'literals.int') {
        a.as = target;
        return a;
    }
    if (a.value === '__mul__' || a.value === '__rmul__') {
        const ltype = a.children[0].result_type;
        const rtype = a.children[1].result_type;
        if ((ltype === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int || ltype === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint) && (rtype === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int || rtype === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint)) {
            a.as = target;
            return a;
        }
    }
    if (a.value === '__neg__' && a.children[0].result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) {
        a.as = target;
        return a;
    }
    if (target === "float") return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${a})`;
    // int -> jsint cast is facultative...
    return a;
}
function Number2Int(a) {
    if (a.result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) return a;
    if (a.type === 'literals.int') {
        a.as = 'int';
        return a;
    }
    if (a.value === '__neg__' && a.children[0].result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint) {
        a.as = "int";
        return a;
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(${a})`;
}
let JSOperatorsPriority = {};
for(let i = 0; i < JSOperators.length; ++i){
    const priority = JSOperators.length - i;
    for (let op of JSOperators[i])JSOperatorsPriority[op] = priority;
}
function reversed_operator(op) {
    return BinaryOperators[op];
}
const LEFT = 1;
const RIGHT = 2;
function multi_jsop(node, op, ...values) {
    const first = values[0];
    if (first instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        first.parent_op = op;
        first.parent_op_dir = LEFT;
    }
    for(let i = 1; i < values.length - 1; ++i){
        const value = values[i];
        if (value instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
            value.parent_op = op;
            value.parent_op_dir = LEFT | RIGHT;
        }
    }
    const last = values[values.length - 1];
    if (last instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        last.parent_op = op;
        last.parent_op_dir = RIGHT;
    }
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${first}`;
    for(let i = 1; i < values.length; ++i)result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${result} && ${values[i]}`;
    if ("parent_op" in node) {
        let direction = node.parent_op_dir;
        let cur_priority = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op];
        if (parent_priority > cur_priority || parent_priority === cur_priority && direction & RIGHT) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    }
    return result;
}
function id_jsop(node, a) {
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        a.parent_op = node.parent_op;
        a.parent_op_dir = node.parent_op_dir;
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}`;
}
function binary_jsop(node, a, op, b, check_priority = true) {
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        a.parent_op = op;
        a.parent_op_dir = LEFT;
    }
    if (b instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        b.parent_op = op;
        b.parent_op_dir = RIGHT;
    }
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}${op}${b}`;
    if (check_priority && "parent_op" in node) {
        let direction = node.parent_op_dir;
        let cur_priority = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op];
        if (parent_priority > cur_priority || parent_priority === cur_priority && direction & RIGHT) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    }
    return result;
}
function unary_jsop(node, op, a, check_priority = true) {
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${op}${a}`;
    if (op === '-') op = 'u.-';
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        a.parent_op = op;
        a.parent_op_dir = RIGHT;
    }
    if (check_priority && "parent_op" in node) {
        let direction = node.parent_op_dir;
        let cur_priority = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op];
        if (direction & LEFT && parent_priority > cur_priority) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    }
    return result;
}
function genUnaryOps(ret_type, ops, { convert_self = (a)=>a, substitute_call } = {}) {
    let result = {};
    const return_type = (o)=>ret_type;
    for (let op of ops){
        const pyop = jsop2pyop[op];
        if (op === 'u.-') op = '-';
        substitute_call ??= (node, self)=>{
            return unary_jsop(node, op, convert_self(self));
        };
        result[`__${pyop}__`] = {
            return_type,
            substitute_call
        };
    }
    return result;
}
function generateConvert(convert) {
    return (node)=>{
        const src = node.result_type.__name__;
        const target = convert[src];
        if (target === undefined) return node;
        //TODO: improve:
        if (src === "int") return Int2Number(node, target);
        if (target === "int") return Number2Int(node);
        throw new Error("Unfound conversion");
    };
}
const idFct = (a)=>a;
function genBinaryOps(ret_type, ops, other_type, { convert_other = {}, convert_self = idFct, substitute_call } = {}) {
    let result = {};
    const return_type = (o)=>other_type.includes(o) ? ret_type : _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType;
    const conv_other = generateConvert(convert_other);
    for (let op of ops){
        const pyop = jsop2pyop[op];
        if (op === '//') op = '/';
        let cs = (node, self, other)=>{
            return binary_jsop(node, convert_self(self), op, conv_other(other));
        };
        let rcs = (node, self, other)=>{
            return binary_jsop(node, conv_other(other), op, convert_self(self));
        };
        if (substitute_call !== undefined) {
            cs = (node, self, o)=>{
                return substitute_call(node, convert_self(self), conv_other(o));
            };
            // same_order ? fct : 
            rcs = (node, self, o)=>{
                return substitute_call(node, conv_other(o), convert_self(self));
            };
        }
        result[`__${pyop}__`] = {
            return_type,
            substitute_call: cs
        };
        result[`__r${pyop}__`] = {
            return_type,
            substitute_call: rcs
        };
        if (convert_self === idFct && substitute_call === undefined) result[`__i${pyop}__`] = {
            return_type,
            substitute_call: (node, self, other)=>{
                if (op === '+' && other.value === 1) return unary_jsop(node, '++', self);
                if (op === '-' && other.value === 1) return unary_jsop(node, '--', self);
                return binary_jsop(node, self, op + '=', conv_other(other));
            }
        };
    }
    return result;
}
const CMPOPS_LIST = [
    '==',
    '!=',
    '>',
    '<',
    '>=',
    '<='
];
const reverse = {
    "==": "==",
    "!=": "!=",
    ">": "<",
    "<": ">",
    ">=": "<=",
    "<=": ">="
};
function genCmpOps(ops, other_type, { convert_other = {}, convert_self = idFct, substitute_call } = {}) {
    let result = {};
    const return_type = (o)=>other_type.includes(o) ? _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool : _STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NotImplementedType;
    const conv_other = generateConvert(convert_other);
    for (let op of ops){
        const pyop = jsop2pyop[op];
        let cs = (node, self, other, reversed)=>{
            let cop = op;
            let a = convert_self(self);
            let b = conv_other(other);
            if (reversed) {
                [a, b] = [
                    b,
                    a
                ];
                cop = reverse[cop];
            }
            if (cop[0] === '=' || cop[0] === '!') {
                if (self.result_type === other.result_type) cop = cop + '=';
            }
            return binary_jsop(node, a, cop, b);
        };
        if (substitute_call !== undefined) {
            cs = (node, self, o, reversed)=>{
                return substitute_call(node, convert_self(self), conv_other(o)); //TODO...
            };
        }
        result[`__${pyop}__`] = {
            return_type,
            substitute_call: cs
        };
    }
    return result;
}


/***/ }),

/***/ "./src/structs/STypeBuiltin.ts":
/*!*************************************!*\
  !*** ./src/structs/STypeBuiltin.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_modules_literals_None_stype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../core_modules/literals/None/stype */ "./src/core_modules/literals/None/stype.ts");
/* harmony import */ var _core_modules_literals_int_stype_jsint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../core_modules/literals/int/stype_jsint */ "./src/core_modules/literals/int/stype_jsint.ts");
/* harmony import */ var _core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../core_modules/literals/int/stype */ "./src/core_modules/literals/int/stype.ts");
/* harmony import */ var _core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../core_modules/literals/float/stype */ "./src/core_modules/literals/float/stype.ts");
/* harmony import */ var _core_modules_literals_bool_stype__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../core_modules/literals/bool/stype */ "./src/core_modules/literals/bool/stype.ts");
/* harmony import */ var _core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../core_modules/literals/str/stype */ "./src/core_modules/literals/str/stype.ts");








/***/ }),

/***/ "./src/structs/STypes.ts":
/*!*******************************!*\
  !*** ./src/structs/STypes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SType_NoneType: () => (/* binding */ SType_NoneType),
/* harmony export */   SType_NotImplementedType: () => (/* binding */ SType_NotImplementedType),
/* harmony export */   SType_bool: () => (/* binding */ SType_bool),
/* harmony export */   SType_float: () => (/* binding */ SType_float),
/* harmony export */   SType_int: () => (/* binding */ SType_int),
/* harmony export */   SType_jsint: () => (/* binding */ SType_jsint),
/* harmony export */   SType_str: () => (/* binding */ SType_str),
/* harmony export */   addSType: () => (/* binding */ addSType),
/* harmony export */   getSType: () => (/* binding */ getSType)
/* harmony export */ });
const _name2SType = {};
function getSType(name) {
    return _name2SType[name] ??= {
        __name__: name
    };
}
function addSType(name, type) {
    return Object.assign(getSType(name), type);
}
const SType_int = getSType("int");
const SType_jsint = getSType("jsint");
const SType_float = getSType("float");
const SType_bool = getSType("bool");
const SType_str = getSType("str");
const SType_NoneType = getSType("NoneType");
const SType_NotImplementedType = getSType("NotImplementedType");


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
/* harmony export */   SBrython: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_3__.SBrython),
/* harmony export */   _b_: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_3__._b_),
/* harmony export */   _r_: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_3__._r_),
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   convert_ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_ast),
/* harmony export */   parse_stack: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_5__.parse_stack),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast),
/* harmony export */   py2ast_fast: () => (/* reexport safe */ _py2ast_fast__WEBPACK_IMPORTED_MODULE_2__.py2ast),
/* harmony export */   stackline2astnode: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_5__.stackline2astnode)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");
/* harmony import */ var _py2ast_fast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./py2ast_fast */ "./src/py2ast_fast.ts");
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runtime */ "./src/runtime.ts");
/* harmony import */ var _structs_STypeBuiltin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./structs/STypeBuiltin */ "./src/structs/STypeBuiltin.ts");
/* harmony import */ var _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core_modules/controlflows/tryblock/runtime */ "./src/core_modules/controlflows/tryblock/runtime.ts");




// declare all builtin types...



var __webpack_exports__SBrython = __webpack_exports__.SBrython;
var __webpack_exports___b_ = __webpack_exports__._b_;
var __webpack_exports___r_ = __webpack_exports__._r_;
var __webpack_exports__ast2js = __webpack_exports__.ast2js;
var __webpack_exports__convert_ast = __webpack_exports__.convert_ast;
var __webpack_exports__parse_stack = __webpack_exports__.parse_stack;
var __webpack_exports__py2ast = __webpack_exports__.py2ast;
var __webpack_exports__py2ast_fast = __webpack_exports__.py2ast_fast;
var __webpack_exports__stackline2astnode = __webpack_exports__.stackline2astnode;
export { __webpack_exports__SBrython as SBrython, __webpack_exports___b_ as _b_, __webpack_exports___r_ as _r_, __webpack_exports__ast2js as ast2js, __webpack_exports__convert_ast as convert_ast, __webpack_exports__parse_stack as parse_stack, __webpack_exports__py2ast as py2ast, __webpack_exports__py2ast_fast as py2ast_fast, __webpack_exports__stackline2astnode as stackline2astnode };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNQO0FBRTdDLCtCQUErQjtBQUNDO0FBRTREIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib2R5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvYm9keS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdGVybmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvYXJncy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9hcmdzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9icmVhay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2NvbnRpbnVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvb2JqZWN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JpbmFyeU9wZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlQnVpbHRpbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmNvbnN0IGN1cnNvcjogeyBsaW5lOiBudW1iZXIsIGxpbmVfb2Zmc2V0OiBudW1iZXJ9ID0ge1xuICAgIGxpbmUgICAgICAgOiAwLFxuICAgIGxpbmVfb2Zmc2V0OiAwXG59O1xubGV0IGpzY29kZTogc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24ganNjb2RlX2N1cnNvcigpOiBDb2RlUG9zIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDoganNjb2RlLmxlbmd0aCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH1cbn1cblxuZnVuY3Rpb24gbmV3X2pzY29kZShmaWxlbmFtZTogc3RyaW5nKSB7XG5cbiAgICBqc2NvZGUgID0gYC8vIyBzb3VyY2VVUkw9JHtmaWxlbmFtZX1cXG5gO1xuICAgIGpzY29kZSArPSBgY29uc3Qge19yXywgX2JffSA9IF9fU0JSWVRIT05fXztcXG5gO1xuXG4gICAgY3Vyc29yLmxpbmUgPSAzO1xuICAgIGN1cnNvci5saW5lX29mZnNldCA9IGpzY29kZS5sZW5ndGg7XG59XG5cbnR5cGUgUHJpbnRhYmxlID0ge3RvU3RyaW5nKCk6IHN0cmluZ307XG5cbmxldCBpbmRlbnQgPSBcIiAgICBcIjtcbmxldCBjdXJfaW5kZW50X2xldmVsID0gLTE7XG5sZXQgY3VyX2luZGVudCA9IFwiXCI7XG5cbmV4cG9ydCBjb25zdCBOTCA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0ganNjb2RlLmxlbmd0aCArIDE7XG5cbiAgICAgICAgcmV0dXJuIFwiXFxuXCIgKyBjdXJfaW5kZW50O1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBCQiA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCArK2N1cl9pbmRlbnRfbGV2ZWwgPiAwKVxuICAgICAgICAgICAgY3VyX2luZGVudCArPSBpbmRlbnQ7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBCRSA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIC0tY3VyX2luZGVudF9sZXZlbDtcbiAgICAgICAgY3VyX2luZGVudCA9IGN1cl9pbmRlbnQuc2xpY2UoMCwtNCk7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gciguLi5hcmdzOiBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLihQcmludGFibGV8QVNUTm9kZSlbXV0pIHtcbiAgICByZXR1cm4gYXJncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyKGFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxBU1ROb2RlKVtdXSkge1xuICAgIGlmKCB0eXBlb2YgYXJncyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIHcoYXJncyk7XG4gICAgcmV0dXJuIHd0KC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3Qoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczogKFByaW50YWJsZXxBU1ROb2RlKVtdKSB7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAganNjb2RlICs9IHN0cltpXTtcbiAgICAgICAgdyhhcmdzW2ldKTtcbiAgICB9XG5cbiAgICBqc2NvZGUgKz0gc3RyW2FyZ3MubGVuZ3RoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHcoLi4uYXJnczogKFByaW50YWJsZXxBU1ROb2RlKVtdKSB7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGxldCBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KGFyZykgKSB7IC8vIGxpa2VseSBhIHJgYFxuICAgICAgICAgICAgd3IoYXJnIGFzIGFueSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCAhIChhcmcgaW5zdGFuY2VvZiBBU1ROb2RlKSApIHtcblxuICAgICAgICAgICAgaWYoIGFyZyA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICBhcmcgPSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgaWYoIGFyZyA9PT0gbnVsbCApXG4gICAgICAgICAgICAgICAgYXJnID0gXCJudWxsXCI7XG5cbiAgICAgICAgICAgIGpzY29kZSArPSBhcmcudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBqc2NvZGVfY3Vyc29yKCk7XG5cbiAgICAgICAgYXJnLndyaXRlISgpO1xuXG4gICAgICAgIGFyZy5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZDoganNjb2RlX2N1cnNvcigpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1QpIHtcblxuICAgIG5ld19qc2NvZGUoYXN0LmZpbGVuYW1lKTtcblxuICAgIHcoYXN0LmJvZHkpO1xuXG4gICAgLy8gVE9ETzogYmV0dGVyIGV4cG9ydCBzdHJhdGVneSAoPylcbiAgICBqc2NvZGUgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHt9O1xcbmA7XG5cbiAgICAvKipcbiAgICBjb25zdCBsaW5lcyA9IGFzdC5ib2R5LmNoaWxkcmVuO1xuICAgIGNvbnN0IGV4cG9ydGVkID0gbmV3IEFycmF5KGxpbmVzLmxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBsaW5lc1tpXS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgZXhwb3J0ZWRbaV0gPSBsaW5lc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgZXhwb3J0ZWQubGVuZ3RoID0gb2Zmc2V0O1xuXG4gICAganNjb2RlICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcbiAgICAvKiovXG5cblx0cmV0dXJuIGpzY29kZTtcbn0iLCJpbXBvcnQgeyBCQiwgQkUsIE5MLCB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoQkIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoTkwsIHRoaXMuY2hpbGRyZW5baV0pO1xuXG4gICAgdyhCRSk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlLCBsaXN0MmFzdG5vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBuZXcgQXJyYXkobm9kZS5sZW5ndGgpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyArK2kpXG4gICAgICAgIGxpbmVzW2ldID0gY29udmVydF9ub2RlKG5vZGVbaV0sIGNvbnRleHQpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBsaW5lc1tpXS50eXBlICE9PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IG1ldGEgPSAobGluZXNbaV0ucmVzdWx0X3R5cGUhIGFzIFNUeXBlRmN0ICkuX19jYWxsX187XG4gICAgICAgIGlmKCBtZXRhLmdlbmVyYXRlICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSgpOyAvLyBtZWguXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKGxpc3QyYXN0bm9kZShub2RlKSwgXCJib2R5XCIsIG51bGwsIG51bGwsIGxpbmVzKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJvZHlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgbGV0IGJvZHkgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgfVxuXG4gICAgd3RgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0geyR7Ym9keX0ke05MfX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgX19uYW1lX186IG5vZGUubmFtZSxcbiAgICAgICAgLy9UT0RPIF9fY2FsbF9fXG4gICAgfVxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXVxuICAgICAgICA6IFtjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgaWR4ICA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGV8YW55ICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlfGFueSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IE51bWJlcjJJbnQodGhpcy5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICBlbmQgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gTnVtYmVyMkludCh0aGlzLmNoaWxkcmVuWzJdKTtcblxuICAgICAgICByZXR1cm4gd3RgZm9yKHZhciAke2lkeH0gPSAke2JlZ307ICR7aWR4fSA8ICR7ZW5kfTsgJHtpZHh9ICs9ICR7aW5jcn0peyR7Ym9keX0ke05MfX1gO1xuICAgIH1cblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgd3RgZm9yKHZhciAke2lkeH0gb2YgJHtsaXN0fSl7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICAvLyBUT0RPOiBqc2ludCBvcHRpIGlmIHRoaXMudmFsdWUgbm90IHVzZWQuLi5cbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUudmFsdWVdID0gU1R5cGVfaW50O1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgICAgIF0pO1xuXG4gICAgfVxuXG4gICAgLy9UT0RPOiBnZXQgdHlwZS4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIC8vIGlmXG4gICAgd3RgaWYoJHt0aGlzLmNoaWxkcmVuWzBdfSl7JHt0aGlzLmNoaWxkcmVuWzFdfSR7Tkx9fWA7XG5cbiAgICAvLyBlbHNlIGlmXG4gICAgbGV0IGk7XG4gICAgZm9yKGkgPSAyOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICAgICAgd3RgZWxzZSBpZigke3RoaXMuY2hpbGRyZW5baV19KXske3RoaXMuY2hpbGRyZW5baSsxXX0ke05MfX1gO1xuICAgIH1cblxuICAgIC8vIGVsc2VcbiAgICBpZiggaSA9PT0gdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxIClcbiAgICAgICAgd3RgZWxzZSB7JHt0aGlzLmNoaWxkcmVuW2ldfSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGlmXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF07XG5cbiAgICAvLyBlbHNlIGlmXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgY29udmVydF9ub2RlKGN1ci50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShjdXIuYm9keSwgY29udGV4dClcbiAgICAgICAgKVxuICAgIH1cbiAgICAvLyBlbHNlXG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwIClcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY29udmVydF9ub2RlKGN1ci5vcmVsc2UsIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbmQgICAgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBjb25zdCBpZl90cnVlICA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgY29uc3QgaWZfZmFsc2UgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgd3RgKCR7Y29uZH0gPyAke2lmX3RydWV9IDogJHtpZl9mYWxzZX0pYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY29uZCAgICAgICA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgIGNvbnN0IGJvZHlfdHJ1ZSAgPSBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KTtcbiAgICBjb25zdCBib2R5X2ZhbHNlID0gY29udmVydF9ub2RlKG5vZGUub3JlbHNlLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50ZXJuYXJ5XCIsIGJvZHlfdHJ1ZS5yZXN1bHRfdHlwZSwgbnVsbCwgW1xuICAgICAgICBjb25kLFxuICAgICAgICBib2R5X3RydWUsXG4gICAgICAgIGJvZHlfZmFsc2VcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmRXhwXCI7IiwiaW1wb3J0IHsgQkIsIEJFLCBOTCwgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgd3RgdHJ5IHske3RoaXMuY2hpbGRyZW5bMF19JHtOTH19YDtcbiAgICB3dGBjYXRjaChfcmF3X2Vycl8peyR7QkJ9JHtOTH1gO1xuXG4gICAgICAgIHcoXCJjb25zdCBfZXJyXyA9IF9iXy5nZXRfcHlfZXhjZXB0aW9uKF9yYXdfZXJyXywgX19TQlJZVEhPTl9fKVwiKTtcblxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAxKVxuICAgICAgICAgICAgdyggdGhpcy5jaGlsZHJlblsxXSApO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDI7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgdyhOTCwgXCJlbHNlIFwiLCB0aGlzLmNoaWxkcmVuW2ldICk7XG5cbiAgICAgICAgLy8gbm90IGEgY2F0Y2ggYWxsLi4uXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdLmNoaWxkcmVuLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgICAgIHcoTkwsIFwiZWxzZSB7IHRocm93IF9yYXdfZXJyXyB9XCIpO1xuXG4gICAgdyhCRSwgTkwpO1xuXG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gbmV3IEFycmF5PEFTVE5vZGU+KG5vZGUuaGFuZGxlcnMubGVuZ3RoKzEpO1xuXG4gICAgLy8gdHJ5IGJvZHlcbiAgICBjaGlsZHJlblswXSA9IGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuaGFuZGxlcnM7ICsraSlcbiAgICAgICAgY2hpbGRyZW5baSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLmhhbmRsZXJzW2ldLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgLy8gZWxzZSBpcyBoYW5kbGVkIGJ5IHRyeWJsb2NrXG5cbiAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIHd0YHske3RoaXMuY2hpbGRyZW5bMF19LCR7Tkx9fWA7XG5cbiAgICB3dGBpZigke3RoaXMuY2hpbGRyZW5bMF19KXske3RoaXMuY2hpbGRyZW5bMV19JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuO1xuICAgIGlmKCBub2RlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGlsZHJlbiA9IFtjb252ZXJ0X25vZGUobm9kZS50eXBlLCBjb250ZXh0KSwgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCldXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRyZW4gPSBbIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hgLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG4vL1RPRE86IHVzZSB+PXNvdXJjZW1hcC4uLlxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogQVNUTm9kZVtdLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxBU1ROb2RlIHtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0LmJvZHkuY2hpbGRyZW4sIHN0YWNrbGluZVsxXSwgc3RhY2tsaW5lWzJdKSE7XG59XG5cbmV4cG9ydCB0eXBlIFN0YWNrTGluZSA9IFtzdHJpbmcsIG51bWJlciwgbnVtYmVyXTtcblxuLy9UT0RPOiBjb252ZXJ0XG5leHBvcnQgZnVuY3Rpb24gc3RhY2syYXN0bm9kZXMoc3RhY2s6IFN0YWNrTGluZVtdLCBzYjogU0JyeXRob24pOiBBU1ROb2RlW10ge1xuICByZXR1cm4gc3RhY2subWFwKCBlID0+IHN0YWNrbGluZTJhc3Rub2RlKGUsIHNiKSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgc2I6IFNCcnl0aG9uKTogU3RhY2tMaW5lW10ge1xuXG5cbiAgXG4gICAgc3RhY2sgPSBzdGFjay5zcGxpdChcIlxcblwiKTtcblxuICAgIGNvbnN0IGlzVjggPSBzdGFja1swXT09PSBcIkVycm9yXCI7IFxuXG4gICAgcmV0dXJuIGZpbHRlcl9zdGFjayhzdGFjaykubWFwKCBsID0+IHtcblxuICAgICAgbGV0IFtfLCBfbGluZSwgX2NvbF0gPSBsLnNwbGl0KCc6Jyk7XG4gIFxuICAgICAgaWYoIF9jb2xbX2NvbC5sZW5ndGgtMV0gPT09ICcpJykgLy8gVjhcbiAgICAgICAgX2NvbCA9IF9jb2wuc2xpY2UoMCwtMSk7XG4gIFxuICAgICAgbGV0IGxpbmUgPSArX2xpbmUgLSAyO1xuICAgICAgbGV0IGNvbCAgPSArX2NvbDtcblxuICAgICAgLS1jb2w7IC8vc3RhcnRzIGF0IDEuXG5cbiAgICAgIGxldCBmY3RfbmFtZSE6IHN0cmluZztcbiAgICAgIGlmKCBpc1Y4ICkge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKFwiIFwiLCA3KTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDcsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJldmFsXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG5cbiAgICAgICAgLy9UT0RPOiBleHRyYWN0IGZpbGVuYW1lLlxuICAgICAgICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ib2R5LmNoaWxkcmVuLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmZ1bmN0aW9uIGdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfOiBhbnksIF9fU0JSWVRIT05fXzogYW55KSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcbiAgICAgICAgICAgICAgPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIDogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1xuXG4gIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKTtcbiAgXG4gIHJldHVybiBfZXJyXztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvbixcbiAgICBnZXRfcHlfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBjb25kID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIHd0YHdoaWxlKCR7Y29uZH0peyR7Ym9keX0ke05MfX19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IGpzY29kZV9jdXJzb3IsIHcsIHdyLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3QgYXJncyAgICAgID0gdGhpcztcbiAgICBjb25zdCBfYXJncyAgICAgPSBhcmdzLmNoaWxkcmVuO1xuICAgIGNvbnN0IFNUeXBlX2ZjdCA9IGFyZ3MudmFsdWUhIGFzIFNUeXBlRmN0O1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGxldCBrd19zdGFydCA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGt3X3N0YXJ0ID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKVxuICAgICAgICBrd19zdGFydCA9IG1ldGEuaWR4X3ZhcmFyZyArIDE7XG5cbiAgICBpZiggbWV0YS5rd2FyZ3MgIT09IHVuZGVmaW5lZCAmJiBrd19zdGFydCA9PT0gX2FyZ3MubGVuZ3RoLTEpXG4gICAgICAgICsra3dfc3RhcnQ7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBfYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIHcoXCIsIFwiKTtcblxuICAgICAgICBpZigga3dfc3RhcnQgPT09IGkpXG4gICAgICAgICAgICB3KFwie1wiKTtcbiAgICAgICAgaWYoIGkgPT09IG1ldGEuaWR4X3ZhcmFyZyAmJiBpID09PSBfYXJncy5sZW5ndGgtMSApXG4gICAgICAgICAgICAoX2FyZ3NbaV0gYXMgYW55KS5sYXN0ID0gdHJ1ZTtcblxuICAgICAgICB3cml0ZV9hcmcoX2FyZ3NbaV0pO1xuICAgIH1cblxuICAgIGlmKCBrd19zdGFydCA8IF9hcmdzLmxlbmd0aClcbiAgICAgICAgdygnfSA9IHt9Jyk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlX2FyZyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSBqc2NvZGVfY3Vyc29yKCk7XG5cbiAgICBpZiggbm9kZS50eXBlID09PSBcImFyZy52YXJhcmdcIiApIHtcbiAgICAgICAgaWYoIChub2RlIGFzIGFueSkubGFzdClcbiAgICAgICAgICAgIHd0YC4uLiR7bm9kZS52YWx1ZX1gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCBcIltdXCIpICk7XG4gICAgfSBlbHNlIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLmt3YXJnXCIgKSB7XG4gICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwie31cIikgKTtcbiAgICB9IGVsc2UgaWYobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICBpZiggdmFsdWUucmVzdWx0X3R5cGUgPT09ICdqc2ludCcgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIySW50KHZhbHVlKTtcblxuICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCB2YWx1ZSkgKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIHcobm9kZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IGpzY29kZV9jdXJzb3IoKVxuICAgIH1cbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IGFzdDJqcyBmcm9tIFwiLi9hc3QyanNcIjtcblxuLy9UT0RPOiBmYWtlIG5vZGUuLi5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoKSB7XG4gICAgLy8gYXJncyBub2RlIGRvZXNuJ3QgZXhpc3QuLi5cbiAgICByZXR1cm47XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJhcmd1bWVudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJncyhub2RlOiBhbnksIFNUeXBlX2ZjdDogU1R5cGVGY3QsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBjb25zdCBfYXJncyA9IG5vZGUuYXJncztcbiAgICBjb25zdCBoYXNfdmFyYXJnID0gX2FyZ3MudmFyYXJnICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzX2t3YXJnICA9IF9hcmdzLmt3YXJnICAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFyZ3NfcG9zICAgPSBtZXRhLmFyZ3NfcG9zO1xuICAgIGNvbnN0IGFyZ3NfbmFtZXMgPSBtZXRhLmFyZ3NfbmFtZXM7XG5cbiAgICBjb25zdCB0b3RhbF9hcmdzID0gX2FyZ3MucG9zb25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfdmFyYXJnXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmt3b25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfa3dhcmc7XG5cbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5PEFTVE5vZGU+KHRvdGFsX2FyZ3MpO1xuXG4gICAgY29uc3QgcG9zX2RlZmF1bHRzID0gbm9kZS5hcmdzLmRlZmF1bHRzO1xuICAgIGNvbnN0IHBvc29ubHkgPSBfYXJncy5wb3Nvbmx5YXJncztcbiAgICBjb25zdCBwb3MgICAgID0gX2FyZ3MuYXJncztcblxuICAgIC8vIHBvc29ubHlcbiAgICBsZXQgZG9mZnNldCA9IHBvc19kZWZhdWx0cy5sZW5ndGggLSBwb3Nvbmx5Lmxlbmd0aCAtIHBvcy5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvc29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc29ubHlbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIFwicG9zb25seVwiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3NbaV0gPSBhcmc7XG4gICAgfVxuXG4gICAgLy8gcG9zXG4gICAgbGV0IG9mZnNldCA9IHBvc29ubHkubGVuZ3RoO1xuICAgICAgZG9mZnNldCAtPSBwb3Nvbmx5Lmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhwb3NbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIFwicG9zXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgICAgICBhcmdzX25hbWVzW29mZnNldF0gPSBhcmcudmFsdWU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH1cblxuICAgIG1ldGEuaWR4X3ZhcmFyZyA9IG9mZnNldDtcblxuICAgIC8vIHZhcmFyZ1xuICAgIGlmKCBoYXNfdmFyYXJnICkge1xuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKF9hcmdzLnZhcmFyZywgdW5kZWZpbmVkLCBcInZhcmFyZ1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG5iX3Bvc19kZWZhdWx0cyA9IE1hdGgubWluKHBvc19kZWZhdWx0cy5sZW5ndGgsIHBvcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBoYXNfb3RoZXJzID0gcG9zX2RlZmF1bHRzLmxlbmd0aCA+IHBvcy5sZW5ndGggfHwgYXJncy5sZW5ndGggIT09IG9mZnNldDtcblxuICAgICAgICBpZiggbmJfcG9zX2RlZmF1bHRzID4gMSB8fCBuYl9wb3NfZGVmYXVsdHMgPT09IDEgJiYgaGFzX290aGVycylcbiAgICAgICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgLT0gbmJfcG9zX2RlZmF1bHRzO1xuICAgIH1cblxuICAgIGxldCBjdXRfb2ZmICAgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBjdXRfb2ZmID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIGN1dF9vZmYgPSBtZXRhLmlkeF92YXJhcmc7XG4gICAgZm9yKGxldCBpID0gcG9zb25seS5sZW5ndGg7IGkgPCBjdXRfb2ZmOyArK2kpXG4gICAgICAgIGFyZ3NfcG9zW2FyZ3NbaV0udmFsdWVdID0gaTtcblxuICAgIGZvcihsZXQgaSA9IGN1dF9vZmY7IGkgPCBtZXRhLmlkeF92YXJhcmc7ICsraSlcbiAgICAgICAgYXJnc19wb3NbYXJnc1tpXS52YWx1ZV0gPSAtMTtcblxuICAgIC8vVE9ETzogaWR4X2VuZF9wb3MgKGlmIGRlZmF1bHQgYW5kIG5vIGlkeF92YXJhcmcpXG5cbiAgICAvLyBrd29ubHlcbiAgICBjb25zdCBrd29ubHkgICAgICA9IF9hcmdzLmt3b25seWFyZ3M7XG4gICAgY29uc3Qga3dfZGVmYXVsdHMgPSBfYXJncy5rd19kZWZhdWx0cztcblxuICAgIG1ldGEuaGFzX2t3ID0gbWV0YS5pZHhfdmFyYXJnICE9PSBjdXRfb2ZmIHx8IGt3b25seS5sZW5ndGggIT09IDA7XG5cbiAgICBkb2Zmc2V0ID0ga3dfZGVmYXVsdHMubGVuZ3RoIC0ga3dvbmx5Lmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwga3dvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhrd29ubHlbaV0sIGt3X2RlZmF1bHRzW2ldLCBcImt3b25seVwiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAgICAgYXJnc19wb3NbYXJnLnZhbHVlXSA9IC0xO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBrd2FyZ1xuICAgIGlmKCBoYXNfa3dhcmcgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKF9hcmdzLmt3YXJnLCB1bmRlZmluZWQsIFwia3dhcmdcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcblxuICAgICAgICBtZXRhLmt3YXJncyA9IGFyZy52YWx1ZTtcbiAgICB9XG5cbiAgICAvL1RPRE8uLi5cbiAgICAvKlxuICAgIGlmKCBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIilcbiAgICAgICAgX2FyZ3MgPSBfYXJncy5zbGljZSgxKTtcbiAgICAqL1xuXG4gICAgbGV0IHZpcnRfbm9kZTogYW55O1xuICAgIGlmKCBhcmdzLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gYXJnc1swXSAgICAgICAgICAgIC5weWNvZGUuc3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCAgID0gYXJnc1thcmdzLmxlbmd0aC0xXS5weWNvZGUuZW5kO1xuXG4gICAgICAgIHZpcnRfbm9kZSA9IHtcbiAgICAgICAgICAgIGxpbmVubyAgICAgICAgOiBzdGFydC5saW5lLFxuICAgICAgICAgICAgY29sX29mZnNldCAgICA6IHN0YXJ0LmNvbCxcbiAgICAgICAgICAgIGVuZF9saW5lbm8gICAgOiBlbmQubGluZSxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuY29sXG4gICAgICAgIH07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICB2aXJ0X25vZGUgPSB7XG4gICAgICAgICAgICAgICAgbGluZW5vICAgIDogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vICAgIDogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sX29mZnNldDogY29sLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGNvbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIFNUeXBlX2ZjdCwgYXJncyk7XG4gICAgYXN0bm9kZS53cml0ZSA9IGFzdDJqcztcbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGRlZnZhbDogYW55LCB0eXBlOnN0cmluZywgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZS5hbm5vdGF0aW9uPy5pZDtcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcbiAgICBpZiggZGVmdmFsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSBjb252ZXJ0X25vZGUoIGRlZnZhbCxjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY2hpbGQgKTtcblxuICAgICAgICBpZiggcmVzdWx0X3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gY2hpbGQucmVzdWx0X3R5cGU7XG4gICAgICAgICAgICBpZihyZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgICAgICAgICByZXN1bHRfdHlwZSA9ICdpbnQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBhcmcuJHt0eXBlfWAsIHJlc3VsdF90eXBlLCBub2RlLmFyZywgY2hpbGRyZW4pO1xufSIsImltcG9ydCB7IHIsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZnVuY3Rpb24gcHJpbnRfb2JqKG9iajogUmVjb3JkPHN0cmluZywgYW55Pikge1xuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgaWYoa2V5cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW11dO1xuXG4gICAgY29uc3Qgc3RyID0gbmV3IEFycmF5KGtleXMubGVuZ3RoKzEpO1xuICAgIHN0clswXSA9IGB7JHtrZXlzWzBdfTogYDtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gID0gYCwgJHtrZXlzW2ldfTogYDtcblxuICAgIHN0cltpXSA9IFwifVwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLk9iamVjdC52YWx1ZXMob2JqKV07XG59XG5cbmZ1bmN0aW9uIGpvaW4oZGF0YTogYW55W10sIHNlcD1cIiwgXCIpIHtcblxuICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gW1tcIlwiXV07XG5cbiAgICBjb25zdCBzdHIgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgrMSk7XG4gICAgc3RyWzBdID0gXCJcIjtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gPSBzZXA7XG4gICAgc3RyW2ldID0gXCJcIjtcblxuICAgIHJldHVybiBbc3RyLCAuLi5kYXRhXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRfY2FsbChub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBtZXRhID0gKG5vZGUudmFsdWUgYXMgU1R5cGVGY3QpLl9fY2FsbF9fO1xuXG4gICAgbGV0IGt3X3BvcyA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICBpZihub2RlLmNoaWxkcmVuW2ldLnR5cGUgPT09IFwiZnVuY3Rpb25zLmtleXdvcmRcIikge1xuICAgICAgICAgICAga3dfcG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICBsZXQgbmJfcG9zID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZiggbmJfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIG5iX3BvcyA9IE1hdGgubWF4KG1ldGEuaWR4X3ZhcmFyZywga3dfcG9zLTEpO1xuXG4gICAgbGV0IHBvc19zaXplID0gbmJfcG9zKzE7XG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApXG4gICAgICAgIHBvc19zaXplID0gbWV0YS5pZHhfdmFyYXJnKzI7XG4gICAgbGV0IHBvcyA9IG5ldyBBcnJheShwb3Nfc2l6ZSk7XG4gICAgXG4gICAgY29uc3Qga3cgICAgOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuICAgIGNvbnN0IGt3YXJnczogUmVjb3JkPHN0cmluZywgQVNUTm9kZT4gPSB7fTtcblxuICAgIGxldCBoYXNfa3cgPSBmYWxzZTtcblxuICAgIGlmKCBtZXRhLmhhc19rdyAmJiBtZXRhLmlkeF9lbmRfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKSB7XG5cbiAgICAgICAgY29uc3QgY3V0b2ZmID0gTWF0aC5taW4oa3dfcG9zLCBtZXRhLmlkeF92YXJhcmcpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBpZiggbWV0YS5pZHhfdmFyYXJnKzEgIT09IGt3X3BvcyApXG4gICAgICAgICAgICBwb3NbbWV0YS5pZHhfdmFyYXJnXSA9IGpvaW4oW1wiW1wiLCBqb2luKG5vZGUuY2hpbGRyZW4uc2xpY2UobWV0YS5pZHhfdmFyYXJnKzEsa3dfcG9zKSksIFwiXVwiXSwgXCJcIik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG5iX3BvcysxKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgY3V0b2ZmOyArK2kpXG4gICAgICAgICAgICBwb3NbaS0xXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgY29uc3QgYXJnc19uYW1lcyA9IG1ldGEuYXJnc19uYW1lcztcbiAgICAgICAgZm9yKGxldCBpID0gY3V0b2ZmOyBpIDwga3dfcG9zOyArK2kpXG4gICAgICAgICAgICBrd1sgYXJnc19uYW1lc1tpLTFdIF0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGhhc19rdyA9IGN1dG9mZiAhPT0ga3dfcG9zO1xuICAgIH1cblxuICAgIGxldCBoYXNfa3dhcmdzID0gZmFsc2U7XG5cbiAgICBjb25zdCBhcmdzX3BvcyA9IG1ldGEuYXJnc19wb3M7XG4gICAgXG5cbiAgICBmb3IobGV0IGkgPSBrd19wb3M7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgY29uc3QgYXJnICA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IG5hbWUgPSBhcmcudmFsdWU7XG4gICAgICAgIGNvbnN0IGlkeCAgPSBhcmdzX3Bvc1sgbmFtZSBdO1xuXG4gICAgICAgIGlmKCBpZHggPj0gMCApIHtcbiAgICAgICAgICAgIHBvc1tpZHhdID0gYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNfa3cgPSB0cnVlO1xuXG4gICAgICAgIGlmKCBpZHggPT09IC0xKVxuICAgICAgICAgICAga3dbbmFtZV0gPSBhcmc7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAga3dhcmdzW25hbWVdID0gYXJnO1xuICAgICAgICAgICAgaGFzX2t3YXJncyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgb2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ga3c7XG4gICAgLy9UT0RPOiBvbmx5IHRoZSBvbmVzIGF0IC0xLi4uXG4gICAgaWYoIGhhc19rd2FyZ3MgJiYgISBtZXRhLmhhc19rdyApe1xuICAgICAgICBvYmogPSBrd2FyZ3M7XG4gICAgfSBlbHNlIGlmKCBoYXNfa3dhcmdzICkge1xuICAgICAgICBvYmpbbWV0YS5rd2FyZ3MhXSA9IHByaW50X29iaihrd2FyZ3MpO1xuICAgIH1cblxuICAgIGlmKCBoYXNfa3cgKVxuICAgICAgICBwb3NbcG9zLmxlbmd0aC0xXSA9IHByaW50X29iaihvYmopO1xuICAgIGVsc2Uge1xuICAgICAgICB3aGlsZShwb3MubGVuZ3RoID4gMCAmJiBwb3NbcG9zLmxlbmd0aC0xXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLS1wb3MubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiByYCR7bm9kZS5jaGlsZHJlblswXX0oJHtqb2luKHBvcyl9KWA7IC8vIGFyZ3MgP1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgd3IoICh0aGlzLnZhbHVlIGFzIFNUeXBlRmN0KS5fX2NhbGxfXy5zdWJzdGl0dXRlX2NhbGwhKHRoaXMpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBuYW1lID0gbm9kZS5mdW5jLmlkO1xuICAgIGNvbnN0IGZjdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW25hbWVdITtcbiAgICBjb25zdCByZXRfdHlwZSA9IChmY3RfdHlwZS5fX2NhbGxfXyBhcyBTVHlwZUZjdFN1YnMpLnJldHVybl90eXBlKCk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCByZXRfdHlwZSwgZmN0X3R5cGUsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MgICAgLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKSxcbiAgICAgICAgLi4ubm9kZS5rZXl3b3Jkcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGtleXdvcmQgbm9kZS4uLlxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyh0aGlzLmNoaWxkcmVuWzBdKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdmFsdWUgICAgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCApXG4gICAgY29uc3QgcmV0X3R5cGUgPSB2YWx1ZS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZ1bmN0aW9ucy5rZXl3b3JkXCIsIHJldF90eXBlLCBub2RlLmFyZywgW1xuICAgICAgICB2YWx1ZVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwia2V5d29yZFwiOyIsImltcG9ydCB7IE5MLCB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBuYW1lID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCBhcmdzID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIHd0YGZ1bmN0aW9uICR7bmFtZX0oJHthcmdzfSl7JHtib2R5fSR7Tkx9fWA7XG4gICAgLy93KCdmdW5jdGlvbiAnLCBuYW1lLCAnKCcsIGFyZ3MsICcpeycsIGJvZHksIE5MLCAnfScpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCwgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IGRlZmF1bHRfY2FsbCB9IGZyb20gXCIuLi9jYWxsL2FzdDJqc1wiO1xuaW1wb3J0IHsgY29udmVydF9hcmdzIH0gZnJvbSBcIi4uL2FyZ3MvYXN0Y29udmVydFwiO1xuXG4vLyByZXF1aXJlZCBhcyBzb21lIHN5bWJvbHMgbWF5IGhhdmUgYmVlbiBkZWNsYXJlZCBvdXQgb2Ygb3JkZXJcbi8vIChub3Qgb25seSBmb3IgcmV0dXJuIHR5cGUgY29tcHV0YXRpb24pXG5mdW5jdGlvbiBnZW5lcmF0ZShub2RlOiBhbnksIGFzdG5vZGU6IEFTVE5vZGUsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGZ1Y2suLi5cbiAgICBjb25zdCBzdHlwZSAgID0gYXN0bm9kZS5yZXN1bHRfdHlwZSEgYXMgU1R5cGVGY3Q7XG4gICAgY29uc3QgbWV0YSAgICA9IHN0eXBlLl9fY2FsbF9fO1xuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG4gICAgY29udGV4dC5wYXJlbnRfbm9kZV9jb250ZXh0ID0gYXN0bm9kZTsgLy8gPC0gaGVyZVxuXG4gICAgLy8gZmFrZSB0aGUgbm9kZS4uLiA9PiBiZXR0ZXIgZG9pbmcgaGVyZSB0byBub3QgaGF2ZSBjb250ZXh0IGlzc3Vlcy5cbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIHN0eXBlLCBjb250ZXh0KTtcbiAgICBmb3IobGV0IGFyZyBvZiBhcmdzLmNoaWxkcmVuKVxuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIC8vIHRlbGwgYm9keSB0aGlzIGZ1bmN0aW9uIGhhcyBiZWVuIGdlbmVyYXRlZC5cbiAgICBtZXRhLmdlbmVyYXRlID0gdW5kZWZpbmVkO1xuICAgIC8vIHByZXZlbnRzIHJlY3Vyc2l2ZSBjYWxscyBvciByZWFmZmVjdGF0aW9uLlxuICAgIG1ldGEucmV0dXJuX3R5cGUgPSB1bmRlZmluZWQgYXMgYW55O1xuXG4gICAgY29uc3QgYW5ub3RhdGlvbiA9IG5vZGUucmV0dXJucz8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgbGV0IGZjdF9yZXR1cm5fdHlwZTogU1R5cGVPYmogPSBnZXRTVHlwZShhbm5vdGF0aW9uKTtcbiAgICAgICAgLy8gZm9yY2UgdGhlIHR5cGUuXG4gICAgICAgIG1ldGEucmV0dXJuX3R5cGUgPSAoKSA9PiBmY3RfcmV0dXJuX3R5cGUhO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYm9keVxuICAgIGFzdG5vZGUuY2hpbGRyZW4gPSBbXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vY29uc3QgaXNNZXRob2QgPSBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIjtcblxuICAgIGNvbnN0IFNUeXBlX2ZjdDogU1R5cGVGY3QgPSB7XG4gICAgICAgIF9fbmFtZV9fOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIF9fY2FsbF9fOiB7XG4gICAgICAgICAgICBhcmdzX25hbWVzICAgICA6IG5ldyBBcnJheShub2RlLmFyZ3MuYXJncy5sZW5ndGgrbm9kZS5hcmdzLnBvc29ubHlhcmdzLmxlbmd0aCksXG4gICAgICAgICAgICBhcmdzX3BvcyAgICAgICA6IHt9LFxuICAgICAgICAgICAgaWR4X2VuZF9wb3MgICAgOiAtMSxcbiAgICAgICAgICAgIGlkeF92YXJhcmcgICAgIDogLTEsXG4gICAgICAgICAgICBoYXNfa3cgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgZ2VuZXJhdGUsXG4gICAgICAgICAgICByZXR1cm5fdHlwZSAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZShub2RlLCBhc3Rub2RlLCBjb250ZXh0KTsgLy8gc2hvdWxkIGJlIHRoZSBuZXcgY29udGV4dFxuICAgICAgICAgICAgICAgIHJldHVybiBTVHlwZV9mY3QuX19jYWxsX18ucmV0dXJuX3R5cGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IGRlZmF1bHRfY2FsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9pZiggISBpc01ldGhvZCApIHtcbiAgICAvLyBpZiBtZXRob2QgYWRkIHRvIHNlbGZfY29udGV4dC5zeW1ib2xzID9cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IFNUeXBlX2ZjdDtcblxuXG4gICAgLy8gaW1wbGljaXQgcmV0dXJuLi4uXG4gICAgY29uc3QgbGFzdF90eXBlICAgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXS5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggbGFzdF90eXBlICE9PSBcIlJldHVyblwiICYmIGxhc3RfdHlwZSAhPT0gXCJSYWlzZVwiICkge1xuXG4gICAgICAgIGNvbnN0IGZha2Vfbm9kZSA9IHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgICAgICAgJG5hbWU6IFwiUmV0dXJuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGluZW5vOiBub2RlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBub2RlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5lbmRfY29sX29mZnNldCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBub2RlLmVuZF9jb2xfb2Zmc2V0LFxuICAgICAgICB9XG4gICAgICAgIG5vZGUuYm9keS5wdXNoKCBmYWtlX25vZGUgKTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuZGVmXCIsIFNUeXBlX2ZjdCwgbm9kZS5uYW1lKTtcbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgcmV0dXJuIHd0YF9iXy5hc3NlcnQoJHt0aGlzLmNoaWxkcmVuWzBdfSlgO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJBc3NlcnRcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiYnJlYWtcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuYnJlYWtcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJCcmVha1wiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcImNvbnRpbnVlXCIpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuY29udGludWVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb250aW51ZVwiOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGlmKCB0aGlzLnZhbHVlWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB3KHRoaXMudmFsdWVbMF0pO1xuXG4gICAgd3RgJHt0aGlzLnZhbHVlWzBdfTogJHt0aGlzLnZhbHVlWzFdfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnQuYWxpYXNcIiwgbnVsbCwgW25vZGUubmFtZSwgbm9kZS5hc25hbWVdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiY29uc3Qge1wiKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAgdyhcIiwgXCIpO1xuICAgICAgICB3KHRoaXMuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIHcoJ30gPSAnKTtcbiAgICBcbiAgICBpZih0aGlzLnZhbHVlID09PSBudWxsKVxuICAgICAgICB3KFwiX19TQlJZVEhPTl9fLmdldE1vZHVsZXMoKVwiKTtcbiAgICBlbHNlXG4gICAgICAgIHd0YF9fU0JSWVRIT05fXy5nZXRNb2R1bGUoXCIke3RoaXMudmFsdWV9XCIpYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0XCIsIG51bGwsIG5vZGUubW9kdWxlLFxuICAgICAgICBub2RlLm5hbWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiSW1wb3J0XCIsIFwiSW1wb3J0RnJvbVwiXTsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgd3RgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjUgZnJvbSBcIi4va2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI1IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI2IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI2IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOCBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMCBmcm9tIFwiLi9mdW5jdGlvbnMvYXJncy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vZnVuY3Rpb25zL2FyZ3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMSBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdGVybmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM2IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM2IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzcgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM3IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM4IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zOCBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zOSBmcm9tIFwiLi9ib2R5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zOSBmcm9tIFwiLi9ib2R5L2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInN0cnVjdHMudHVwbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwic3RydWN0cy5saXN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcInN0cnVjdHMuZGljdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJvcGVyYXRvcnMudW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwib3BlcmF0b3JzLmNvbXBhcmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJvb2xlYW5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF84LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU184XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJpbmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzlcblx0fSxcblx0XCJvcGVyYXRvcnMuYXR0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5bXVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzExLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5Bc3NpZ25PcFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTZcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xN1xuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nL0Zvcm1hdHRlZFZhbHVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE4XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOVxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjBcblx0fSxcblx0XCJrZXl3b3Jkcy5yYWlzZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMVxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMlxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydC9hbGlhc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImtleXdvcmRzLmNvbnRpbnVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI0XG5cdH0sXG5cdFwia2V5d29yZHMuYnJlYWtcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjVcblx0fSxcblx0XCJrZXl3b3Jkcy5hc3NlcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjZcblx0fSxcblx0XCJmdW5jdGlvbnMuZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI3XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjhcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbC9rZXl3b3JkXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI5XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmFyZ3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzBcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzFcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzJcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzNcblx0fSxcblx0XCJjb250cm9sZmxvd3MudGVybmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM1XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNlxuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM3XG5cdH0sXG5cdFwiY2xhc3MuY2xhc3NkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzhcblx0fSxcblx0XCJib2R5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM5XG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG5cblxuY29uc3QgUlVOVElNRSA9IHt9O1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzkpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzE2KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yMSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjYpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzMyKTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHcoXCJudWxsXCIpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBTVHlwZV9Ob25lVHlwZSwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IGFkZFNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdOb25lVHlwZScsIHt9KTsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcodGhpcy52YWx1ZSk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgU1R5cGVfYm9vbCwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IENNUE9QU19MSVNULCBnZW5DbXBPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnYm9vbCcsIHtcbiAgICBcbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9ib29sLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSksXG4gICAgXG59KTsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCIke1wiLCB0aGlzLmNoaWxkcmVuWzBdLCBcIn1cIilcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvcm1hdHRlZFZhbHVlXCI7IiwiaW1wb3J0IHsganNjb2RlX2N1cnNvciwgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJgXCIpO1xuXG4gICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgaWYoIGNoaWxkLnJlc3VsdF90eXBlID09PSBTVHlwZV9zdHIpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBqc2NvZGVfY3Vyc29yKCk7XG5cbiAgICAgICAgICAgIHcoY2hpbGQudmFsdWUpO1xuXG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBqc2NvZGVfY3Vyc29yKClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmKGNoaWxkLnR5cGUgPT09IFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIikge1xuICAgICAgICAgICAgdyhjaGlsZCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgdyhcImBcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZ1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLm5vZGUudmFsdWVzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSm9pbmVkU3RyXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KHRoaXMudmFsdWUpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfZmxvYXQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBTVHlwZV9mbG9hdCwgbm9kZS52YWx1ZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9hdDJzdHI6IChmOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYoIGYgPD0gMWUtNSB8fCBmID49IDFlMTYpIHtcblxuICAgICAgICAgICAgbGV0IHN0ciA9IGYudG9FeHBvbmVudGlhbCgpO1xuICAgICAgICAgICAgY29uc3Qgc2lnbl9pZHggPSBzdHIubGVuZ3RoLTI7XG4gICAgICAgICAgICBpZihzdHJbc2lnbl9pZHhdID09PSAnLScgfHwgc3RyW3NpZ25faWR4XSA9PT0gJysnKVxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLHNpZ25faWR4KzEpICsgJzAnICsgc3RyLnNsaWNlKHNpZ25faWR4KzEpO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHIgPSBmLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKCAhIHN0ci5pbmNsdWRlcygnLicpKVxuICAgICAgICAgICAgc3RyICs9IFwiLjBcIjtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIEludDJOdW1iZXIgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmNvbnN0IFNUeXBlX3R5cGVfZmxvYXQgPSBhZGRTVHlwZSgndHlwZVtmbG9hdF0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9mbG9hdCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9mbG9hdCB8fCBvdGhlcl90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXJfdHlwZTtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApIHtcblxuICAgICAgICAgICAgICAgIGlmKCBvdGhlci50eXBlID09PSBcImxpdGVyYWxzLnN0clwiICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXIudmFsdWUgPT09IFwiaW5mXCIgfHwgb3RoZXIudmFsdWUgPT09IFwiaW5maW5pdHlcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG90aGVyLnZhbHVlID09PSBcIi1pbmZcInx8IG90aGVyLnZhbHVlID09PSBcIi1pbmZpbml0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBwYXJzZUZsb2F0KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ2Zsb2F0Jywge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9mbG9hdCxcblxuICAgIF9fc3RyX186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX3N0cixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9hdDJzdHIoJHtub2RlfSlgO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsXG4gICAgICAgICAgICAgICAgICAgIFsnKionLCAnKicsICcvJywgJysnLCAnLSddLFxuICAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgWycvLyddLFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsXG4gICAgICAgIFsnJSddLFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfZmxvYXQsIFsndS4tJ10pLFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0pLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2Zsb2F0OyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IHN1ZmZpeCA9IFwiXCI7XG4gICAgbGV0IHRhcmdldCA9ICh0aGlzIGFzIGFueSkuYXM7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYodGFyZ2V0ID09PSBcImZsb2F0XCIpIHtcbiAgICAgICAgaWYoIHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7IC8vIHJlbW92ZSB1c2VsZXNzIHByZWNpc2lvbi5cbiAgICB9XG4gICAgZWxzZSBpZiggdGFyZ2V0ID09PSBcImludFwiIHx8IHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgIC8vIGlmIGFscmVhZHkgYmlnaW50IGRvIG5vdCBjYXN0IGludG8ganNpbnQgKGxvc3Mgb2YgcHJlY2lzaW9uKS5cbiAgICAgICAgc3VmZml4ID0gXCJuXCI7XG5cbiAgICAvLyAxZSs1NCBzaG91bGQgaGFkIGJlIHN0b3JlZCBhcyBiaWdpbnQuXG4gICAgd3RgJHt2YWx1ZX0ke3N1ZmZpeH1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB2YWx1ZSA9IG5vZGUudmFsdWU7XG5cbiAgICBpZih2YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyA9PT0gXCJpbnRcIilcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZTtcblxuICAgIGlmKCB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImJpZ2ludFwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVhbF90eXBlID0gdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiID8gU1R5cGVfaW50IDogU1R5cGVfanNpbnQ7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgcmVhbF90eXBlLCB2YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIGlkX2pzb3AsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5jb25zdCBTVHlwZV90eXBlX2ludCA9IGFkZFNUeXBlKCd0eXBlW2ludF0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IG90aGVyLnJlc3VsdF90eXBlXG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2Zsb2F0IClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoTWF0aC50cnVuYygke290aGVyfSkpYDtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApIHtcblxuICAgICAgICAgICAgICAgIC8vaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAzKVxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByYEJpZ0ludChwYXJzZUludCgke290aGVyfSwgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDtcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogb3B0aW1pemUgaWYgb3RoZXIgaXMgc3RyaW5nIGxpdHRlcmFsLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgQmlnSW50KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ2ludCcsIHtcblxuICAgIC8vVE9ETzogZml4IHR5cGUuLi5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2ludCxcblxuICAgIF9fc3RyX186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX3N0cixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYCR7bm9kZX0udG9TdHJpbmcoKWA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfaW50LFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qICovXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgW1xuICAgICAgICAgICAgLy8gJyoqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICAgICAgJyoqJywgJysnLCAnLScsXG4gICAgICAgICAgICAnJicsICd8JywgJ14nLCAnPj4nLCAnPDwnXG4gICAgICAgIF0sXG4gICAgICAgIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyonXSwgW1NUeXBlX2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBhLCBiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqJywgYik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsIFsnLyddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfZmxvYXRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAocykgPT4gSW50Mk51bWJlcihzLCAnZmxvYXQnKSxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWycvLyddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyUnXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7XCJqc2ludFwiOiBcImludFwifSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgWyd1Li0nXSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAncmVhbCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBJbnQyTnVtYmVyKGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ34nXSxcbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0gKVxuICAgIC8qICovXG5cbn0pOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnanNpbnQnLCB7XG5cbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICAvLyAnKionIGFuZCAnKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgW1xuICAgICAgICAgICAgJyoqJywgJysnLCAnLScsXG4gICAgICAgICAgICAnJicsICd8JywgJ14nLCAnPj4nLCAnPDwnIC8vIGluIEpTIGJpdCBvcGVyYXRpb25zIGFyZSBvbiAzMmJpdHNcbiAgICAgICAgXSxcbiAgICAgICAgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKSxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnanNpbnQnOiAnaW50J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWycqJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnZmxvYXQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBOdW1iZXIySW50KGEpLCAnKicsIE51bWJlcjJJbnQoYikgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCwgWycvJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9mbG9hdF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2pzaW50LCBbJy8vJ10sIFtTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfanNpbnQsIFsnJSddLCBbU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9qc2ludCxcbiAgICAgICAgWyd1Li0nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdpbnQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgTnVtYmVyMkludChhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgWyd+J10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHNlbGYpID0+IE51bWJlcjJJbnQoc2VsZilcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSApXG4gICAgLypcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSwqL1xufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGlmKCB0aGlzLnZhbHVlWzBdID09PSAnXCInKVxuICAgICAgICByZXR1cm4gdyh0aGlzLnZhbHVlKTtcbiAgICBcbiAgICB3dGBcIiR7dGhpcy52YWx1ZX1cImA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBTVHlwZV9zdHIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wc30gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuY29uc3QgU1R5cGVfdHlwZV9zdHIgPSBhZGRTVHlwZSgndHlwZVtzdHJdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyO1xuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19zdHJfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19zdHJfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnc3RyJywge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9zdHIsXG5cbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgW1NUeXBlX3N0cl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9zdHIsIFtcIitcIl0sIFtTVHlwZV9zdHJdKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfc3RyLCBbXCIqXCJdLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDoge1wiaW50XCI6IFwiZmxvYXRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGEucmVzdWx0X3R5cGUgIT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmAke2F9LnJlcGVhdCgke2J9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKVxuICAgICAgICB3KFwidmFyIFwiKTtcblxuICAgIHcodGhpcy5jaGlsZHJlblswXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgKytpKVxuICAgICAgICB3dGAgPSAke3RoaXMuY2hpbGRyZW5baV19YDtcblxuICAgIGNvbnN0IHJpZ2h0X25vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuICAgIGxldCByY2hpbGQ6IGFueSA9IHJpZ2h0X25vZGU7XG5cbiAgICBpZiggcmlnaHRfbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQgJiYgdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChyaWdodF9ub2RlKTtcblxuICAgIHd0YCA9ICR7cmNoaWxkfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuXG4gICAgY29uc3QgYW5ub3RhdGlvbiA9IG5vZGU/LmFubm90YXRpb24/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJlc3VsdF90eXBlID0gZ2V0U1R5cGUoYW5ub3RhdGlvbik7XG5cblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVHlwZV9pbnQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgLy8gY291bGQgYmUgaW1wcm92ZWQgSSBndWVzcy5cbiAgICAgICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiggbGVmdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IGxlZnRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXSA9IHJlc3VsdF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJlc3VsdF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICAuLi5sZWZ0cyxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQXNzaWduT3BlcmF0b3JzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBsZXQgb3AgPSAoQXNzaWduT3BlcmF0b3JzIGFzIGFueSlbdGhpcy52YWx1ZV07XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgYSA9IGEgKyBiXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9PSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcbiAgICAgICAgLypcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICB3ciggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEodGhpcywgbGVmdCwgcmlnaHQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUudGFyZ2V0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIGxlZnQucmVzdWx0X3R5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICB3dGAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHd0YCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LCByaWdodCkgKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcFwiXTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvb3JkaXZfZmxvYXQ6IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vciggYS9iICk7XG4gICAgfSxcbiAgICBmbG9vcmRpdl9pbnQ6IChhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhL2I7XG4gICAgICAgIGlmKCByZXN1bHQgPiAwIHx8IGElYiA9PT0gMG4pXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIHJldHVybiAtLXJlc3VsdDtcbiAgICB9LFxuICAgIG1vZF9mbG9hdDogPFQ+KGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbW9kID0gKGEgJSBiICsgYikgJSBiO1xuICAgICAgICBpZiggbW9kID09PSAwICYmIGIgPCAwIClcbiAgICAgICAgICAgIHJldHVybiAtMDtcbiAgICAgICAgcmV0dXJuIG1vZDtcbiAgICB9LFxuICAgIG1vZF9pbnQ6IDxUPihhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAoYSAlIGIgKyBiKSAlIGI7XG4gICAgfVxufSIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICB3ciggbXVsdGlfanNvcCh0aGlzLCB0aGlzLnZhbHVlLCAuLi50aGlzLmNoaWxkcmVuKSApO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmNvbnN0IGJuYW1lMmpzb3AgPSB7XG4gICAgJ0FuZCc6ICcmJicsXG4gICAgJ09yJyA6ICd8fCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLnZhbHVlcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKSApO1xuXG4gICAgY29uc3Qgb3AgICA9IChibmFtZTJqc29wIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJvb2xlYW5cIiwgdHlwZSwgb3AsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCb29sT3BcIl07IiwiaW1wb3J0IHsgdywgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3AgYXMgYW55KTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgICAgIGlmKCBvcCAhPT0gJ19fZXFfXycgJiYgb3AgIT09ICdfX25lX18nIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bHR5cGV9ICR7b3B9ICR7cnR5cGV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcblxuICAgICAgICAgICAgY29uc3QganNvcCA9IG9wID09PSAnX19lcV9fJyA/ICc9PT0nIDogJyE9PSc7XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBqc29wLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZlcnNlZCA9IHRydWU7XG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBsZWZ0LCByaWdodCwgcmV2ZXJzZWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwIClcbiAgICAgICAgICAgIHcoJyAmJiAnKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAgd3IoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICc9PT0nLCByaWdodCkgKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJyE9PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdyKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgb3AsIHJpZ2h0KSApO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBvcHMgPSBub2RlLm9wcy5tYXAoIChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbZS5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UuY29uc3RydWN0b3IuJG5hbWV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVmdCAgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0cyA9IG5vZGUuY29tcGFyYXRvcnMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBvcGVyYXRvcnMuY29tcGFyZWAsIFNUeXBlX2Jvb2wsIG9wcyxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIC4uLnJpZ2h0cyxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdywgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIGlmKCB0aGlzLnZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHdyKCB1bmFyeV9qc29wKHRoaXMsICchJywgSW50Mk51bWJlcihsZWZ0LCAnanNpbnQnKSApICk7XG5cbiAgICBjb25zdCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlIVt0aGlzLnZhbHVlXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICB3ciggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEodGhpcywgbGVmdCkgKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCwgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiggb3AgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgU1R5cGVfYm9vbCwgXCJub3RcIiwgWyBsZWZ0IF0gKTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUoKTtcblxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgdHlwZSwgb3AsIFsgbGVmdCBdICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiVW5hcnlPcFwiXTsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICB3KFwiLyogbm90IGltcGxlbWVudGVkICovXCIpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdyhcInJldHVybiBudWxsXCIpO1xuXG4gICAgcmV0dXJuIHd0YHJldHVybiAke3RoaXMuY2hpbGRyZW5bMF19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGNvbnRleHQucGFyZW50X25vZGVfY29udGV4dFxuICAgIGxldCByZXN1bHRfdHlwZSA9IFNUeXBlX05vbmVUeXBlO1xuICAgIGxldCBjaGlsZHJlbiAgICA9IHVuZGVmaW5lZDtcbiAgICBcbiAgICBpZihub2RlLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBleHByLnJlc3VsdF90eXBlITtcbiAgICAgICAgY2hpbGRyZW4gICAgPSBbZXhwcl07XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YSA9IChjb250ZXh0LnBhcmVudF9ub2RlX2NvbnRleHQhLnJlc3VsdF90eXBlISBhcyBTVHlwZUZjdCApLl9fY2FsbF9fO1xuICAgIGlmKCBtZXRhLnJldHVybl90eXBlID09PSB1bmRlZmluZWQgKVxuICAgICAgICBtZXRhLnJldHVybl90eXBlID0gKCkgPT4gcmVzdWx0X3R5cGU7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIHJlc3VsdF90eXBlLCBudWxsLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KCd7Jyk7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwIClcbiAgICAgICAgd3RgJHt0aGlzLmNoaWxkcmVuWzBdfTogJHt0aGlzLmNoaWxkcmVuWzFdfWA7XG5cbiAgICBmb3IobGV0IGkgPSAyOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrPTIpXG4gICAgICAgIHd0YCwgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YDtcblxuICAgIHcoJ30nKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheShub2RlLmtleXMubGVuZ3RoICogMik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjaGlsZHJlblsyKmldICAgPSBjb252ZXJ0X25vZGUobm9kZS4gIGtleXNbaV0sIGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlblsyKmkrMV0gPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZXNbaV0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMuZGljdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgY2hpbGRyZW5cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRGljdFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcIltcIik7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwIClcbiAgICAgICAgdyh0aGlzLmNoaWxkcmVuWzBdKTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICB3KFwiLCBcIiwgdGhpcy5jaGlsZHJlbltpXSk7XG5cbiAgICB3KFwiXSlcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJPYmplY3QuZnJlZXplKFtcIik7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwIClcbiAgICAgICAgdyh0aGlzLmNoaWxkcmVuWzBdKTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICB3KFwiLCBcIiwgdGhpcy5jaGlsZHJlbltpXSk7XG5cbiAgICB3KFwiXSlcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlR1cGxlXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KHRoaXMudmFsdWUpO1xufSIsImltcG9ydCBfcl8gZnJvbSBcIi4uLy4uL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuICAgIGxldCB2YWx1ZSA9IG5vZGUuaWQ7XG5cbiAgICBpZiggdmFsdWUgPT09ICdzZWxmJylcbiAgICAgICAgdmFsdWUgPSAndGhpcyc7IC8vVE9ETyB0eXBlIG9mIGN1cnJlbnQgY29udGV4dCAhIC0+IHNlbGYgaW4gbG9jYWxfc3ltYm9scyA/XG4gICAgZWxzZSBpZiggdmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1t2YWx1ZV07XG5cbiAgICAvKlxuICAgICAgICAvL1RPRE8gZ2xvYmFsU3ltYm9sc1xuICAgIGVsc2UgaWYodmFsdWUgaW4gX3JfKSB7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgX3JfXSkgKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBgY2xhc3MuJHt2YWx1ZX1gO1xuXG4gICAgICAgIHZhbHVlID0gYF9yXy4ke3ZhbHVlfWA7XG4gICAgfVxuICAgICovXG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59XG5cblxuLy8gX190cmFjZWJhY2tfX1xuICAgIC8vIHRiX25leHRcbiAgICAvLyB0Yl9mcmFtZVxuICAgICAgICAvLyBmX2JhY2sgP1xuICAgICAgICAvLyBmX2xvY2FsIDogZW5hYmxlIG9ubHkgaW4gY29tcGF0IG1vZGUuXG4gICAgICAgIC8vIGZfbGluZW5vIChsaW5lKVxuICAgICAgICAvLyBmX2NvZGVcbiAgICAgICAgICAgIC8vIGNvX25hbWUgKGZjdCBuYW1lID8pXG4gICAgICAgICAgICAvLyBjb19maWxlbmFtZSIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcIi4vRXhjZXB0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0pTRXhjZXB0aW9uIGV4dGVuZHMgUHlfRXhjZXB0aW9uIHtcblxufSIsImltcG9ydCBSVU5USU1FXzAgZnJvbSBcIi4vb2JqZWN0LnRzXCI7XG5pbXBvcnQgUlVOVElNRV8xIGZyb20gXCIuL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHNcIjtcbmltcG9ydCBSVU5USU1FXzIgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiSlNFeGNlcHRpb25cIjogUlVOVElNRV8xLFxuXHRcIkV4Y2VwdGlvblwiOiBSVU5USU1FXzIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJVTlRJTUU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9vYmplY3Qge1xuXG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgYm9keSAgICA6IEFTVE5vZGUsXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIHtcbiAgICAgICAgYm9keTogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gICAgLy9UT0RPOiBidWlsdGluX3N5bWJvbHNcbiAgICAvL1RPRE86IGZpeCB0eXBlcy4uLlxuXG4gICAgLy9AdHMtaWdub3JlXG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzWydpbnQnXSAgID0gU1R5cGVfaW50ICAuX19jbGFzc19fO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1snc3RyJ10gICA9IFNUeXBlX3N0ciAgLl9fY2xhc3NfXztcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbJ2Zsb2F0J10gPSBTVHlwZV9mbG9hdC5fX2NsYXNzX187XG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKGFzdC5ib2R5LCBjb250ZXh0KTtcbn1cblxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG5cbiAgICAvLyBsaWtlbHkgYSBib2R5LlxuICAgIGlmKCBBcnJheS5pc0FycmF5KGJyeXRob25fbm9kZSkgKVxuICAgICAgICByZXR1cm4gXCJCb2R5XCI7XG5cbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZihuYW1lID09PSBcIkV4cHJcIikge1xuICAgICAgICBicnl0aG9uX25vZGUgPSBicnl0aG9uX25vZGUudmFsdWU7XG4gICAgICAgIG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuICAgIH1cblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk1vZHVsZSBub3QgcmVnaXN0ZXJlZDpcIiwgbmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlICk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIC8vIHdlIG1heSBoYXZlIG1hbnkgbW9kdWxlcyBmb3IgdGhlIHNhbWUgbm9kZSB0eXBlLlxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHsgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LndyaXRlID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdDJhc3Rub2RlKG5vZGU6IGFueVtdKSB7XG5cbiAgICBjb25zdCBiZWcgPSBub2RlWzBdO1xuICAgIGNvbnN0IGVuZCA9IG5vZGVbbm9kZS5sZW5ndGgtMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lbm8gICAgICAgIDogYmVnLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldCAgICA6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vICAgIDogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3N5bWJvbHMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfc3ltYm9sc31cbiAgICB9XG4gICAgdHlwZTtcblxuICAgIHBhcmVudF9ub2RlX2NvbnRleHQ/OiBBU1ROb2RlOyBcblxuICAgIGxvY2FsX3N5bWJvbHM6IFJlY29yZDxzdHJpbmcsIFNUeXBlT2JqfG51bGw+O1xufSIsIi8vIEB0cy1ub2NoZWNrXG5cbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgYnVpbGRNb2R1bGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiX19TQlJZVEhPTl9fXCIsIGAke2pzY29kZX1cXG5yZXR1cm4gX19leHBvcnRlZF9fO2ApO1xuICAgIH1cblxuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IHRoaXMuYnVpbGRNb2R1bGUoanNjb2RlLCBhc3QpKHRoaXMpO1xuICAgIH1cblxuICAgIGdldE1vZHVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWRbbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0QVNURm9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2ZpbGVuYW1lXTsgLy9UT0RPIG1vZHVsZW5hbWU/XG4gICAgfVxuXG4gICAgZ2V0IF9yXygpIHtcbiAgICAgICAgcmV0dXJuIF9yXztcbiAgICB9XG4gICAgZ2V0IF9iXygpIHtcbiAgICAgICAgcmV0dXJuIF9iXztcbiAgICB9XG59XG5cbiIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0d3JpdGU/OiAodGhpczogQVNUTm9kZSkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCByZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbCA6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2wgOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicywgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBibmFtZTJweW5hbWUgPSB7XG4gICAgXCJVU3ViXCI6IFwiX19uZWdfX1wiLFxuICAgIFwiTm90XCIgOiBcIm5vdFwiLFxuXG4gICAgXCJQb3dcIiA6IFwiX19wb3dfX1wiLFxuXG4gICAgXCJNdWx0XCIgICAgOiBcIl9fbXVsX19cIixcbiAgICBcIkRpdlwiICAgICA6IFwiX190cnVlZGl2X19cIixcbiAgICBcIkZsb29yRGl2XCI6IFwiX19mbG9vcmRpdl9fXCIsXG4gICAgXCJNb2RcIiAgICAgOiBcIl9fbW9kX19cIixcblxuICAgIFwiQWRkXCIgICAgIDogXCJfX2FkZF9fXCIsXG4gICAgXCJTdWJcIiAgICAgOiBcIl9fc3ViX19cIixcblxuICAgIFwiSXNcIiAgICAgIDogXCJpc1wiLFxuICAgIFwiSXNOb3RcIiAgIDogXCJpcyBub3RcIixcbiAgICBcIkVxXCIgICAgICA6IFwiX19lcV9fXCIsXG4gICAgXCJOb3RFcVwiICAgOiBcIl9fbmVfX1wiLFxuXG4gICAgXCJHdFwiICAgICAgOiBcIl9fZ3RfX1wiLFxuICAgIFwiR3RFXCIgICAgIDogXCJfX2dlX19cIixcbiAgICBcIkx0XCIgICAgICA6IFwiX19sdF9fXCIsXG4gICAgXCJMdEVcIiAgICAgOiBcIl9fbGVfX1wiLFxuXG4gICAgXCJJbnZlcnRcIiAgOiBcIl9fbm90X19cIixcblxuICAgIFwiQml0T3JcIiAgIDogXCJfX29yX19cIixcbiAgICBcIkJpdFhvclwiICA6IFwiX194b3JfX1wiLFxuICAgIFwiQml0QW5kXCIgIDogXCJfX2FuZF9fXCIsXG4gICAgXCJSU2hpZnRcIiAgOiBcIl9fcnNoaWZ0X19cIixcbiAgICBcIkxTaGlmdFwiICA6IFwiX19sc2hpZnRfX1wiLFxufVxuXG5leHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19ycG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19ybXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19ydHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19fcmZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19ybW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19fcmFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19yc3ViX18nLFxuXG4gICAgJ19fZXFfXycgICAgIDogJ19fZXFfXycsXG4gICAgJ19fbmVfXycgICAgIDogJ19fbmVfXycsXG5cbiAgICAnX19sdF9fJyAgICAgOiAnX19ndF9fJyxcbiAgICAnX19ndF9fJyAgICAgOiAnX19sdF9fJyxcbiAgICAnX19sZV9fJyAgICAgOiAnX19nZV9fJyxcbiAgICAnX19nZV9fJyAgICAgOiAnX19sZV9fJyxcblxuICAgICdfX25vdF9fJyAgICA6ICdfX3Jub3RfXycsXG4gICAgJ19fb3JfXycgICAgIDogJ19fcm9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX3JhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19fcnhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19ybHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX3Jyc2hpZnRfXycsXG59XG5cbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbmV4cG9ydCBjb25zdCBKU09wZXJhdG9ycyA9IFtcbiAgICBbJyEnLCAnKysnLCAnLS0nLCAnficsICd1Li0nXSxcbiAgICBbJyoqJ10sIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnKicsICcvJywgJyUnXSwgLy8gUHl0aG9uIGFsc28gaGFzIC8vXG4gICAgWycrJywgJy0nXSxcbiAgICBbJzw8JywgJz4+JywgJz4+PiddLCAvL1RPRE9cbiAgICBbJzwnLCAnPD0nLCAnPj0nLCAnPiddLFxuICAgIFsnPT0nLCAnIT0nLCAnPT09JywgJyE9PSddLFxuICAgIFsnJiddLCAgLy9UT0RPXG4gICAgWydeJ10sICAvL1RPRE9cbiAgICBbJ3wnXSwgIC8vVE9ET1xuICAgIFsnJiYnXSwgLy9UT0RPXG4gICAgWyd8fCcsICc/PyddLFxuICAgIFsnPSddIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICAvLyBldGMuXG5dO1xuXG4vKlxuaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI2NhbGxhYmxlXG5cbi0+IGNsYXNzZXNcbmJvb2woKVxuZmxvYXQoKVxuaW50KClcbnN0cigpXG5ieXRlYXJyYXkoKSBbVWludDhBcnJheV0gKFJXKVxuYnl0ZXMoKSAgICAgWz9dICAgICAgICAgIChSTykgPC0gbm8gdHlwZXMgaW4gSlMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtIFVpbnQ4QXJyYXkgd2l0aCBmbGFnID8gZnJlZXplKCkgW0pTIHVuc2FmZV1cbiAgICAgICAgICAgIGJcImVcXHhGRlwiIGluc3RlYWQgb2YgWzEwMSwxMDFdLCBldGMuICgzMiA8PSBieXQgPD0gMTI2KVxudHlwZSgpXG5saXN0KCkgICAgICBbQXJyYXldXG50dXBsZSgpICAgICBbT2JqZWN0LmZyb3plbihBcnJheSldXG5cbnNldCgpICAgICAgIC8vIHJlbGllcyBvbiBoYXNoKCkuLi4gPT4gc2V0W2xpdGVyYWxzXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHNldCgpIC8gPC0gSlMgc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICA9PiBieXRlcy9ieXRlYXJyYXkvZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgU2V0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gSW50ZXJuYWwga2V5cygpIHNldCBbcmVjb21wdXRlIGhhc2ggd2hlbiBhZGQvcmVtb3ZlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGludGVybmFsbHkgc3RvcmVkIGFzIE1hcChoYXNoLCB2YWx1ZSkgKD8pXG5mcm96ZW5zZXQoKSAgICAgICAgICAgID0+IGV4dGVuZHMgc2V0IHRvIHJlcGxhY2UgbW9kaWZpZXJzLlxuXG5kaWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc3RyXSBhcyBPYmplY3QuY3JlYXRlKG51bGwpICsgKGFuZCBwdXJlIEpTT2JqIGFzIGRpY3Rbc3RyXSApXG4gICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IE1hcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gU2V0KGhhc2gpIC8gTWFwKGhhc2gsIGtleSkgLyBNYXAoa2V5LCBoYXNoKSA/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0L3NldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBNYXAoa2V5LCB2YWx1ZSlcblxub2JqZWN0KClcbmNvbXBsZXgoKVxubWVtb3J5dmlldygpICAgICAgICAgICAgPT4gQXJyYXlCdWZmZXIgP1xuXG4tPiBwcmludFxuYXNjaWkoKVxuYmluKClcbmhleCgpXG5vY3QoKVxucmVwcigpXG5oYXNoKClcblxuLT4gbWF0aHNcbmFicygpXG5kaXZtb2QoKVxucG93KClcbnJvdW5kKClcblxuLT4gbGlzdHNcbmFsbCgpXG5hbnkoKVxuZmlsdGVyKClcbm1hcCgpXG5tYXgoKVxubWluKClcbnN1bSgpXG5sZW4oKVxuZW51bWVyYXRlKClcbnJldmVyc2VkKClcbnNsaWNlKClcbnNvcnRlZCgpXG56aXAoKVxuXG4tPiBpdGVyXG5yYW5nZSgpXG5haXRlcigpXG5pdGVyKClcbmFuZXh0KClcbm5leHQoKVxuXG4tPiBzdHJcbm9yZCgpXG5jaHIoKVxuZm9ybWF0KClcbnByaW50KClcbmZcIlwiXG5cbmNhbGxhYmxlKClcbmNsYXNzbWV0aG9kKClcbnN0YXRpY21ldGhvZCgpXG5wcm9wZXJ0eSgpXG5zdXBlcigpXG5pc2luc3RhbmNlKClcbmlzc3ViY2xhc3MoKVxuZGVsYXR0cigpXG5nZXRhdHRyKClcbmhhc2F0dHIoKVxuc2V0YXR0cigpXG5kaXIoKVxuXG5ldmFsKClcbmV4ZWMoKVxuY29tcGlsZSgpXG5icmVha3BvaW50KClcblxuZ2xvYmFscygpXG5sb2NhbHMoKVxudmFycygpXG5fX2ltcG9ydF9fKClcblxuaWQoKVxuICAgIC0+IG9uLWRlbWFuZCB3ZWFrcmVmID9cblxuaGVscCgpXG5pbnB1dCgpXG5vcGVuKClcblxuKi9cblxuLypcbnVuYXJ5XG4tIHBvcyAodW5hcnkgKylcblxuLSBib29sXG4tIGZsb2F0XG4tIGludFxuLSBzdHJcbi0gcmVwclxuXG4tIGFic1xuLSBjZWlsXG4tIGZsb29yXG4tIHJvdW5kXG4tIHRydW5jXG5cbmJpbmFyeVxuLSBwb3cvcnBvd1xuLSBkaXZtb2QvcmRpdm1vZFxuXG5jbGFzc1xuLSBjbGFzc1xuLSBuZXdcbi0gaW5pdFxuLSBpbml0X3N1YmNsYXNzXG5cbi0gc3ViY2xhc3Nob29rIC8vIF9faXNpbnN0YW5jZWNoZWNrX18gXG5cbi0gZGlyXG4tIGRlbGF0dHJcbi0gc2V0YXR0clxuLSBnZXRhdHRyaWJ1dGVcblxuLSBkb2Ncbi0gZm9ybWF0XG4tIGdldG5ld2FyZ3Ncbi0gaGFzaFxuLSBpbmRleCAoPylcbi0gc2l6ZW9mXG4qL1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnQyTnVtYmVyKGE6IEFTVE5vZGUsIHRhcmdldCA9IFwiZmxvYXRcIikge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbXVsX18nIHx8IGEudmFsdWUgPT09ICdfX3JtdWxfXycgKSB7XG4gICAgICAgIGNvbnN0IGx0eXBlID0gYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgY29uc3QgcnR5cGUgPSBhLmNoaWxkcmVuWzFdLnJlc3VsdF90eXBlO1xuICAgICAgICBpZiggICAgKGx0eXBlID09PSBTVHlwZV9pbnQgfHwgbHR5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgJiYgKHJ0eXBlID09PSBTVHlwZV9pbnQgfHwgcnR5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCkge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIHRhcmdldCA9PT0gXCJmbG9hdFwiIClcbiAgICAgICAgcmV0dXJuIHJgTnVtYmVyKCR7YX0pYDtcblxuICAgIC8vIGludCAtPiBqc2ludCBjYXN0IGlzIGZhY3VsdGF0aXZlLi4uXG4gICAgcmV0dXJuIGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOdW1iZXIySW50KGE6IEFTVE5vZGUpIHtcblxuICAgIGlmKCBhLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpXG4gICAgICAgIHJldHVybiBhO1xuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9ICdpbnQnO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX25lZ19fJyAmJiBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludCkge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gXCJpbnRcIjtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgQmlnSW50KCR7YX0pYDtcbn1cblxubGV0IEpTT3BlcmF0b3JzUHJpb3JpdHk6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbmZvcihsZXQgaSA9IDA7IGkgPCBKU09wZXJhdG9ycy5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBKU09wZXJhdG9ycy5sZW5ndGggLSBpO1xuICAgIGZvcihsZXQgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIC4uLnZhbHVlczogQVNUTm9kZVtdKSB7XG5cbiAgICBjb25zdCBmaXJzdCA9IHZhbHVlc1swXTtcbiAgICBpZihmaXJzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUfFJJR0hUO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmKGxhc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7Zmlyc3R9YDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKVxuICAgICAgICByZXN1bHQgPSByYCR7cmVzdWx0fSAmJiAke3ZhbHVlc1tpXX1gO1xuXG4gICAgaWYoIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHthfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlfGFueSwgb3A6IHN0cmluZywgYjogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtvcH0ke2F9YDtcblxuICAgIGlmKG9wID09PSAnLScpXG4gICAgICAgIG9wID0gJ3UuLSc7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCAoZGlyZWN0aW9uICYgTEVGVCkgJiYgcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkgPT4gYW55XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5VbmFyeU9wcyhyZXRfdHlwZSAgOiBTVHlwZU9iaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHMgICAgICAgOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA9IChhKSA9PiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5VbmFyeU9wc19PcHRzID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IHJldF90eXBlO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcbiAgICAgICAgaWYoIG9wID09PSAndS4tJylcbiAgICAgICAgICAgIG9wID0gJy0nO1xuXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbCA/Pz0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsIG9wLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG50eXBlIEdlbkJpbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfb3RoZXIgICA/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgIGNvbnZlcnRfc2VsZiAgICA/OiAoczogYW55KSA9PiBhbnksXG4gICAgc3Vic3RpdHV0ZV9jYWxsID86IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlfGFueSwgb3RoZXI6IEFTVE5vZGV8YW55KSA9PiBhbnlcbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICByZXR1cm4gKG5vZGU6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3JjICAgID0gbm9kZS5yZXN1bHRfdHlwZSEuX19uYW1lX187XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGNvbnZlcnRbc3JjXTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICAgIC8vVE9ETzogaW1wcm92ZTpcbiAgICAgICAgaWYoIHNyYyA9PT0gXCJpbnRcIilcbiAgICAgICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG5vZGUsIHRhcmdldCk7XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgKVxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQobm9kZSk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5mb3VuZCBjb252ZXJzaW9uXCIpO1xuICAgIH07XG59XG5cbmNvbnN0IGlkRmN0ID0gPFQ+KGE6IFQpID0+IGE7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5CaW5hcnlPcHMocmV0X3R5cGU6IFNUeXBlT2JqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wczogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdHlwZTogU1R5cGVPYmpbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBTVHlwZU9iaikgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IHJldF90eXBlIDogU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcbiAgICAgICAgaWYoIG9wID09PSAnLy8nKVxuICAgICAgICAgICAgb3AgPSAnLyc7XG5cbiAgICAgICAgbGV0IGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgb3AsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgY29udl9vdGhlcihvdGhlciksIG9wLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBzdWJzdGl0dXRlX2NhbGwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udl9vdGhlcihvKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzYW1lX29yZGVyID8gZmN0IDogXG4gICAgICAgICAgICByY3MgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udl9vdGhlcihvKSwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IGNzLFxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRbYF9fciR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IHJjcyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYoIGNvbnZlcnRfc2VsZiA9PT0gaWRGY3QgJiYgc3Vic3RpdHV0ZV9jYWxsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHRbYF9faSR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICcrJyAmJiBvdGhlci52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICcrKycsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICctJyAmJiBvdGhlci52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctLScsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIHNlbGYsIG9wKyc9JywgY29udl9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IENNUE9QU19MSVNUID0gWyc9PScsICchPScsICc+JywgJzwnLCAnPj0nLCAnPD0nXSBhcyBjb25zdDtcblxuY29uc3QgcmV2ZXJzZSA9IHtcbiAgICBcIj09XCI6IFwiPT1cIixcbiAgICBcIiE9XCI6IFwiIT1cIixcbiAgICBcIj5cIjogXCI8XCIsXG4gICAgXCI8XCI6IFwiPlwiLFxuICAgIFwiPj1cIjogXCI8PVwiLFxuICAgIFwiPD1cIjogXCI+PVwiLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkNtcE9wcyggIG9wcyAgICAgICA6IHJlYWRvbmx5IChrZXlvZiB0eXBlb2YgcmV2ZXJzZSlbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiByZWFkb25seSBTVHlwZU9ialtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlciAgID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30gKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBTVHlwZU9iaikgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IFNUeXBlX2Jvb2wgOiBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgY29uc3QgY29udl9vdGhlciAgPSBnZW5lcmF0ZUNvbnZlcnQoY29udmVydF9vdGhlcik7XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb3AgPSBvcDtcblxuICAgICAgICAgICAgbGV0IGEgPSBjb252ZXJ0X3NlbGYoc2VsZik7XG4gICAgICAgICAgICBsZXQgYiA9IGNvbnZfb3RoZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIHJldmVyc2VkICkge1xuICAgICAgICAgICAgICAgIFthLGJdwqA9IFtiLGFdO1xuICAgICAgICAgICAgICAgIGNvcCA9IHJldmVyc2VbY29wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIGNvcFswXSA9PT0gJz0nIHx8IGNvcFswXSA9PT0gJyEnICkge1xuICAgICAgICAgICAgICAgIGlmKCBzZWxmLnJlc3VsdF90eXBlID09PSBvdGhlci5yZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgY29wID0gY29wICsgJz0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgY29wLCBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBzdWJzdGl0dXRlX2NhbGwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTsgLy9UT0RPLi4uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IGNzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufSIsIlxuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50JztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlJzsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmNvbnN0IF9uYW1lMlNUeXBlOiBSZWNvcmQ8c3RyaW5nLFNUeXBlT2JqPiA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTVHlwZTxUIGV4dGVuZHMgU1R5cGVPYmo+KG5hbWU6IHN0cmluZyk6IFQge1xuICAgIHJldHVybiAoX25hbWUyU1R5cGVbbmFtZV0gPz89IHtfX25hbWVfXzogbmFtZX0pIGFzIFQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTVHlwZShuYW1lOiBzdHJpbmcsIHR5cGU6IE9taXQ8U1R5cGVPYmosICdfX25hbWVfXyc+KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIGdldFNUeXBlKG5hbWUpLCB0eXBlICk7XG59XG5cbmV4cG9ydCBjb25zdCBTVHlwZV9pbnQgICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImludFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9qc2ludCAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImpzaW50XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2Zsb2F0ICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiZmxvYXRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfYm9vbCAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJib29sXCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX3N0ciAgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwic3RyXCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX05vbmVUeXBlICAgICAgICAgICA9IGdldFNUeXBlKFwiTm9uZVR5cGVcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlID0gZ2V0U1R5cGUoXCJOb3RJbXBsZW1lbnRlZFR5cGVcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiO1xuZXhwb3J0IHtweTJhc3QgYXMgcHkyYXN0X2Zhc3R9IGZyb20gXCIuL3B5MmFzdF9mYXN0XCI7XG5leHBvcnQge1NCcnl0aG9uLCBfYl8sIF9yX30gZnJvbSBcIi4vcnVudGltZVwiO1xuXG4vLyBkZWNsYXJlIGFsbCBidWlsdGluIHR5cGVzLi4uXG5pbXBvcnQgJy4vc3RydWN0cy9TVHlwZUJ1aWx0aW4nO1xuXG5leHBvcnQge3BhcnNlX3N0YWNrLCBzdGFja2xpbmUyYXN0bm9kZX0gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lXCI7Il0sIm5hbWVzIjpbIkFTVE5vZGUiLCJjdXJzb3IiLCJsaW5lIiwibGluZV9vZmZzZXQiLCJqc2NvZGUiLCJqc2NvZGVfY3Vyc29yIiwiY29sIiwibGVuZ3RoIiwibmV3X2pzY29kZSIsImZpbGVuYW1lIiwiaW5kZW50IiwiY3VyX2luZGVudF9sZXZlbCIsImN1cl9pbmRlbnQiLCJOTCIsInRvU3RyaW5nIiwiQkIiLCJCRSIsInNsaWNlIiwiciIsImFyZ3MiLCJ3ciIsInciLCJ3dCIsInN0ciIsImkiLCJhcmciLCJBcnJheSIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJzdGFydCIsIndyaXRlIiwiZW5kIiwiYXN0MmpzIiwiYXN0IiwiYm9keSIsImNoaWxkcmVuIiwiY29udmVydF9ub2RlIiwibGlzdDJhc3Rub2RlIiwiY29udmVydCIsIm5vZGUiLCJjb250ZXh0IiwibGluZXMiLCJ0eXBlIiwibWV0YSIsInJlc3VsdF90eXBlIiwiX19jYWxsX18iLCJnZW5lcmF0ZSIsInJldHVybl90eXBlIiwiYnJ5dGhvbl9uYW1lIiwiYmFzZSIsInZhbHVlIiwiQ29udGV4dCIsImxvY2FsX3N5bWJvbHMiLCJuYW1lIiwiX19uYW1lX18iLCJiYXNlcyIsIkVycm9yIiwiX2NvbnRleHQiLCJOdW1iZXIySW50IiwiaWR4IiwiYmVnIiwiaW5jciIsImxpc3QiLCJTVHlwZV9pbnQiLCJ0YXJnZXQiLCJpZCIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsIm1hcCIsIm4iLCJ0ZXN0IiwiY3VyIiwib3JlbHNlIiwicHVzaCIsImNvbmQiLCJpZl90cnVlIiwiaWZfZmFsc2UiLCJib2R5X3RydWUiLCJib2R5X2ZhbHNlIiwiaGFuZGxlcnMiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImUiLCJpbmNsdWRlcyIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJub2RlcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9yYXdfZXJyXyIsInN0YWNrX3N0ciIsInB5Y29kZSIsImV4Y2VwdGlvbl9zdHIiLCJqb2luIiwibG9nIiwiZ2V0X3B5X2V4Y2VwdGlvbiIsIl9fU0JSWVRIT05fXyIsIl9lcnJfIiwiX2JfIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiX3JfIiwiSlNFeGNlcHRpb24iLCJiaW5hcnlfanNvcCIsIl9hcmdzIiwiU1R5cGVfZmN0Iiwia3dfc3RhcnQiLCJpZHhfZW5kX3BvcyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwiaWR4X3ZhcmFyZyIsImt3YXJncyIsImxhc3QiLCJ3cml0ZV9hcmciLCJjb252ZXJ0X2FyZ3MiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJhcmdzX3BvcyIsImFyZ3NfbmFtZXMiLCJ0b3RhbF9hcmdzIiwicG9zb25seWFyZ3MiLCJrd29ubHlhcmdzIiwicG9zX2RlZmF1bHRzIiwiZGVmYXVsdHMiLCJwb3Nvbmx5IiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwib2Zmc2V0IiwibmJfcG9zX2RlZmF1bHRzIiwiTWF0aCIsIm1pbiIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJoYXNfa3ciLCJ2aXJ0X25vZGUiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImRlZnZhbCIsImFubm90YXRpb24iLCJjaGlsZCIsInByaW50X29iaiIsIm9iaiIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJkYXRhIiwic2VwIiwiZGVmYXVsdF9jYWxsIiwia3dfcG9zIiwibmJfcG9zIiwibWF4IiwicG9zX3NpemUiLCJrdyIsImN1dG9mZiIsImhhc19rd2FyZ3MiLCJzdWJzdGl0dXRlX2NhbGwiLCJmY3RfdHlwZSIsInJldF90eXBlIiwia2V5d29yZHMiLCJnZXRTVHlwZSIsInN0eXBlIiwicGFyZW50X25vZGVfY29udGV4dCIsInJldHVybnMiLCJmY3RfcmV0dXJuX3R5cGUiLCJsYXN0X3R5cGUiLCJmYWtlX25vZGUiLCJhc3NlcnQiLCJhc25hbWUiLCJtb2R1bGUiLCJuYW1lcyIsImV4YyIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIlJVTlRJTUVfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiUlVOVElNRV8xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJSVU5USU1FXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJBU1RfQ09OVkVSVF8yNiIsIkFTVDJKU18yNiIsIlJVTlRJTUVfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJBU1RfQ09OVkVSVF8zMCIsIkFTVDJKU18zMCIsIkFTVF9DT05WRVJUXzMxIiwiQVNUMkpTXzMxIiwiQVNUX0NPTlZFUlRfMzIiLCJBU1QySlNfMzIiLCJSVU5USU1FXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiQVNUX0NPTlZFUlRfMzYiLCJBU1QySlNfMzYiLCJBU1RfQ09OVkVSVF8zNyIsIkFTVDJKU18zNyIsIkFTVF9DT05WRVJUXzM4IiwiQVNUMkpTXzM4IiwiQVNUX0NPTlZFUlRfMzkiLCJBU1QySlNfMzkiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJSVU5USU1FIiwiYXNzaWduIiwiU1R5cGVfTm9uZVR5cGUiLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJhZGRTVHlwZSIsIlNUeXBlX2Jvb2wiLCJDTVBPUFNfTElTVCIsImdlbkNtcE9wcyIsIlNUeXBlX2Zsb2F0IiwiU1R5cGVfanNpbnQiLCJTVHlwZV9zdHIiLCJmbG9hdDJzdHIiLCJmIiwidG9FeHBvbmVudGlhbCIsInNpZ25faWR4IiwiZ2VuQmluYXJ5T3BzIiwiZ2VuVW5hcnlPcHMiLCJJbnQyTnVtYmVyIiwiU1R5cGVfdHlwZV9mbG9hdCIsIm90aGVyIiwib3RoZXJfdHlwZSIsIm1ldGhvZCIsIl9faW50X18iLCJfX3N0cl9fIiwiY29udmVydF9vdGhlciIsInNlbGYiLCJzdWZmaXgiLCJhcyIsInJlYWxfdHlwZSIsImlkX2pzb3AiLCJ1bmFyeV9qc29wIiwiU1R5cGVfdHlwZV9pbnQiLCJhIiwiYiIsIm9wdGkiLCJjb252ZXJ0X3NlbGYiLCJzIiwiU1R5cGVfdHlwZV9zdHIiLCJlbmRzV2l0aCIsInJpZ2h0X25vZGUiLCJyY2hpbGQiLCJyaWdodCIsInJpZ2h0X3R5cGUiLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsImxlZnRzIiwibGVmdCIsImxlZnRfdHlwZSIsIkFzc2lnbk9wZXJhdG9ycyIsIlNUeXBlX05vdEltcGxlbWVudGVkVHlwZSIsIm9wIiwiYm5hbWUycHluYW1lIiwiYXR0ciIsInJldmVyc2VkX29wZXJhdG9yIiwiZmxvb3JkaXZfZmxvYXQiLCJmbG9vciIsImZsb29yZGl2X2ludCIsInJlc3VsdCIsIm1vZF9mbG9hdCIsIm1vZCIsIm1vZF9pbnQiLCJtdWx0aV9qc29wIiwiYm5hbWUyanNvcCIsImZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSIsInJldmVyc2VkIiwicnR5cGUiLCJsdHlwZSIsImpzb3AiLCJvcHMiLCJyaWdodHMiLCJjb21wYXJhdG9ycyIsIm9wZXJhbmQiLCJleHByIiwiZWx0cyIsImlzQ2xhc3MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicHJvdG90eXBlIiwid3JpdGFibGUiLCJQeV9vYmplY3QiLCJQeV9FeGNlcHRpb24iLCJQeV9KU0V4Y2VwdGlvbiIsIlJVTlRJTUVfMCIsIlJVTlRJTUVfMSIsIlJVTlRJTUVfMiIsIkNPUkVfTU9EVUxFUyIsIm1vZHVsZXMiLCJtb2R1bGVfbmFtZSIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiYnJ5dGhvbl9ub2RlIiwiZXJyb3IiLCJwYXJlbnRfY29udGV4dCIsImNyZWF0ZSIsImNoYXIiLCJwYXJzZUV4cHJlc3Npb24iLCJhc3QyanNfY29udmVydCIsInBhcnNlU3ltYm9sIiwiYmVnaW5fc3RyIiwiY2FyIiwic3ltYm9sIiwidG9KUyIsImFzdDJqc19saXRlcmFsc19pbnQiLCJwYXJzZU51bWJlciIsImFzdDJqc19saXRlcmFsc19zdHIiLCJwYXJzZVN0cmluZyIsInBhcnNlVG9rZW4iLCJvcDIiLCJvcDEiLCJwYXJzZU9wZXJhdG9yIiwiZGVmYXVsdCIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJleHBvcnRlZCIsImJyb3dzZXIiLCJnbG9iYWxUaGlzIiwiYnVpbGRNb2R1bGUiLCJGdW5jdGlvbiIsInJ1bkpTQ29kZSIsImdldE1vZHVsZXMiLCJnZXRNb2R1bGUiLCJfdmFsdWUiLCJCaW5hcnlPcGVyYXRvcnMiLCJqc29wMnB5b3AiLCJKU09wZXJhdG9ycyIsIkpTT3BlcmF0b3JzUHJpb3JpdHkiLCJwcmlvcml0eSIsIkxFRlQiLCJSSUdIVCIsImZpcnN0IiwicGFyZW50X29wIiwicGFyZW50X29wX2RpciIsImRpcmVjdGlvbiIsImN1cl9wcmlvcml0eSIsInBhcmVudF9wcmlvcml0eSIsImNoZWNrX3ByaW9yaXR5IiwibyIsInB5b3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJzcmMiLCJpZEZjdCIsImNvbnZfb3RoZXIiLCJjcyIsInJjcyIsInJldmVyc2UiLCJjb3AiLCJfbmFtZTJTVHlwZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==