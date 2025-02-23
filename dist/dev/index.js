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
    if (fct_type === undefined) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }
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
/* harmony export */   SType_type_float: () => (/* binding */ SType_type_float),
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SType_type_int: () => (/* binding */ SType_type_int)
/* harmony export */ });
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`'${this.value}'`;
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SType_type_str: () => (/* binding */ SType_type_str)
/* harmony export */ });
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
    __len__: {
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        substitute_call: (_)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${_.children[1]}.length`;
        }
    },
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
    const left = this.children[0];
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
/* harmony import */ var core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/literals/int/stype */ "./src/core_modules/literals/int/stype.ts");
/* harmony import */ var core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/literals/str/stype */ "./src/core_modules/literals/str/stype.ts");
/* harmony import */ var core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core_modules/literals/float/stype */ "./src/core_modules/literals/float/stype.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
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
    return convert_node(ast.body, new Context());
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
    constructor(type = "?", parent_context = RootContext){
        this.type = type; //TODO: remove
        this.local_symbols = {
            ...parent_context.local_symbols
        };
    }
    type;
    parent_node_context;
    local_symbols;
}
const type_fct = {} /* fct class => type class */ ;
//TODO: move...
//TODO: binary/unary
//TODO: remove return_type (get from the __{name}__)
function genUnaryOpFct(name, return_type) {
    const opname = `__${name}__`;
    return {
        [name]: {
            __class__: type_fct,
            __name__: name,
            __call__: {
                //TODO: I need a self...
                return_type: ()=>return_type,
                // not really :?
                substitute_call: (call)=>{
                    const left = call.children[1];
                    const method = left.result_type[opname];
                    return method.substitute_call(call);
                }
            }
        }
    };
}
// builtin symbols.
// @ts-ignore
const RootContext = {
    type: "?",
    local_symbols: {
        int: core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__.SType_type_int,
        str: core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_2__.SType_type_str,
        float: core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_3__.SType_type_float,
        ...genUnaryOpFct("len", structs_STypes__WEBPACK_IMPORTED_MODULE_4__.SType_int)
    }
};


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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NkJwSSxJQUFZO0lBQ3JELE9BQVF5WSxXQUFXLENBQUN6WSxLQUFLLEtBQUs7UUFBQ0MsVUFBVUQ7SUFBSTtBQUNqRDtBQUVPLFNBQVM2TyxTQUFTN08sSUFBWSxFQUFFWCxJQUFnQztJQUNuRSxPQUFPK0gsT0FBT3FILE1BQU0sQ0FBRXJHLFNBQVNwSSxPQUFPWDtBQUMxQztBQUVPLE1BQU1xQixZQUEyQjBILFNBQVMsT0FBTztBQUNqRCxNQUFNOEcsY0FBMkI5RyxTQUFTLFNBQVM7QUFDbkQsTUFBTTZHLGNBQTJCN0csU0FBUyxTQUFTO0FBQ25ELE1BQU0wRyxhQUEyQjFHLFNBQVMsUUFBUTtBQUNsRCxNQUFNK0csWUFBMkIvRyxTQUFTLE9BQU87QUFDakQsTUFBTXNHLGlCQUEyQnRHLFNBQVMsWUFBWTtBQUN0RCxNQUFNdUosMkJBQTJCdkosU0FBUyxzQkFBc0I7Ozs7Ozs7U0NsQnZFO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFN0MsK0JBQStCO0FBQ0M7QUFFNEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2JvZHkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib2R5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVCdWlsdGluLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuY29uc3QgY3Vyc29yOiB7IGxpbmU6IG51bWJlciwgbGluZV9vZmZzZXQ6IG51bWJlcn0gPSB7XG4gICAgbGluZSAgICAgICA6IDAsXG4gICAgbGluZV9vZmZzZXQ6IDBcbn07XG5sZXQganNjb2RlOiBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc2NvZGVfY3Vyc29yKCk6IENvZGVQb3Mge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBqc2NvZGUubGVuZ3RoIC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfVxufVxuXG5mdW5jdGlvbiBuZXdfanNjb2RlKGZpbGVuYW1lOiBzdHJpbmcpIHtcblxuICAgIGpzY29kZSAgPSBgLy8jIHNvdXJjZVVSTD0ke2ZpbGVuYW1lfVxcbmA7XG4gICAganNjb2RlICs9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG5cbiAgICBjdXJzb3IubGluZSA9IDM7XG4gICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0ganNjb2RlLmxlbmd0aDtcbn1cblxudHlwZSBQcmludGFibGUgPSB7dG9TdHJpbmcoKTogc3RyaW5nfTtcblxubGV0IGluZGVudCA9IFwiICAgIFwiO1xubGV0IGN1cl9pbmRlbnRfbGV2ZWwgPSAtMTtcbmxldCBjdXJfaW5kZW50ID0gXCJcIjtcblxuZXhwb3J0IGNvbnN0IE5MID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcblxuICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBqc2NvZGUubGVuZ3RoICsgMTtcblxuICAgICAgICByZXR1cm4gXCJcXG5cIiArIGN1cl9pbmRlbnQ7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEJCID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoICsrY3VyX2luZGVudF9sZXZlbCA+IDApXG4gICAgICAgICAgICBjdXJfaW5kZW50ICs9IGluZGVudDtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEJFID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLS1jdXJfaW5kZW50X2xldmVsO1xuICAgICAgICBjdXJfaW5kZW50ID0gY3VyX2luZGVudC5zbGljZSgwLC00KTtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByKC4uLmFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxBU1ROb2RlKVtdXSkge1xuICAgIHJldHVybiBhcmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3IoYXJnczogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi4oUHJpbnRhYmxlfEFTVE5vZGUpW11dKSB7XG4gICAgaWYoIHR5cGVvZiBhcmdzID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gdyhhcmdzKTtcbiAgICByZXR1cm4gd3QoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOiAoUHJpbnRhYmxlfEFTVE5vZGUpW10pIHtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBqc2NvZGUgKz0gc3RyW2ldO1xuICAgICAgICB3KGFyZ3NbaV0pO1xuICAgIH1cblxuICAgIGpzY29kZSArPSBzdHJbYXJncy5sZW5ndGhdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdyguLi5hcmdzOiAoUHJpbnRhYmxlfEFTVE5vZGUpW10pIHtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgbGV0IGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoYXJnKSApIHsgLy8gbGlrZWx5IGEgcmBgXG4gICAgICAgICAgICB3cihhcmcgYXMgYW55KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoICEgKGFyZyBpbnN0YW5jZW9mIEFTVE5vZGUpICkge1xuXG4gICAgICAgICAgICBpZiggYXJnID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIGFyZyA9IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICBpZiggYXJnID09PSBudWxsIClcbiAgICAgICAgICAgICAgICBhcmcgPSBcIm51bGxcIjtcblxuICAgICAgICAgICAganNjb2RlICs9IGFyZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGFydCA9IGpzY29kZV9jdXJzb3IoKTtcblxuICAgICAgICBhcmcud3JpdGUhKCk7XG5cbiAgICAgICAgYXJnLmpzY29kZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBqc2NvZGVfY3Vyc29yKClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG4gICAgbmV3X2pzY29kZShhc3QuZmlsZW5hbWUpO1xuXG4gICAgdyhhc3QuYm9keSk7XG5cbiAgICAvLyBUT0RPOiBiZXR0ZXIgZXhwb3J0IHN0cmF0ZWd5ICg/KVxuICAgIGpzY29kZSArPSBgXFxuY29uc3QgX19leHBvcnRlZF9fID0ge307XFxuYDtcblxuICAgIC8qKlxuICAgIGNvbnN0IGxpbmVzID0gYXN0LmJvZHkuY2hpbGRyZW47XG4gICAgY29uc3QgZXhwb3J0ZWQgPSBuZXcgQXJyYXkobGluZXMubGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGxpbmVzW2ldLnR5cGUgPT09IFwiZnVuY3Rpb25zLmRlZlwiKVxuICAgICAgICBleHBvcnRlZFtpXSA9IGxpbmVzW2ldLnZhbHVlO1xuICAgIH1cbiAgICBleHBvcnRlZC5sZW5ndGggPSBvZmZzZXQ7XG5cbiAgICBqc2NvZGUgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuICAgIC8qKi9cblxuXHRyZXR1cm4ganNjb2RlO1xufSIsImltcG9ydCB7IEJCLCBCRSwgTkwsIHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhCQik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgdyhOTCwgdGhpcy5jaGlsZHJlbltpXSk7XG5cbiAgICB3KEJFKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUsIGxpc3QyYXN0bm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5ldyBBcnJheShub2RlLmxlbmd0aClcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7ICsraSlcbiAgICAgICAgbGluZXNbaV0gPSBjb252ZXJ0X25vZGUobm9kZVtpXSwgY29udGV4dCk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGxpbmVzW2ldLnR5cGUgIT09IFwiZnVuY3Rpb25zLmRlZlwiKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgbWV0YSA9IChsaW5lc1tpXS5yZXN1bHRfdHlwZSEgYXMgU1R5cGVGY3QgKS5fX2NhbGxfXztcbiAgICAgICAgaWYoIG1ldGEuZ2VuZXJhdGUgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICBtZXRhLnJldHVybl90eXBlKCk7IC8vIG1laC5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobGlzdDJhc3Rub2RlKG5vZGUpLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQm9keVwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgYmFzZTogc3RyaW5nfEFTVE5vZGUgPSBcIl9yXy5vYmplY3RcIjtcbiAgICBsZXQgYm9keSA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGJhc2UgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgICAgICBib2R5ID0gdGhpcy5jaGlsZHJlblsxXTtcbiAgICB9XG5cbiAgICB3dGBjbGFzcyAke3RoaXMudmFsdWV9IGV4dGVuZHMgJHtiYXNlfSB7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0ge1xuICAgICAgICBfX25hbWVfXzogbm9kZS5uYW1lLFxuICAgICAgICAvL1RPRE8gX19jYWxsX19cbiAgICB9XG5cbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJjbGFzc1wiLCBjb250ZXh0KTtcblxuICAgIGlmKCBub2RlLmJhc2VzLmxlbmd0aCA+IDEpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmJhc2VzLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgW2NvbnZlcnRfbm9kZShub2RlLmJhc2VzWzBdLCBjb250ZXh0KSwgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCldXG4gICAgICAgIDogW2NvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNsYXNzLmNsYXNzZGVmXCIsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2xhc3NEZWZcIjsiLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBpZHggID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aC0xXTtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIikge1xuXG4gICAgICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZXxhbnkgID0gXCIwblwiO1xuICAgICAgICBsZXQgaW5jcjogc3RyaW5nfEFTVE5vZGV8YW55ID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IE51bWJlcjJJbnQodGhpcy5jaGlsZHJlblswXSk7XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gTnVtYmVyMkludCh0aGlzLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgIGVuZCA9IE51bWJlcjJJbnQodGhpcy5jaGlsZHJlblsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMl0pO1xuXG4gICAgICAgIHJldHVybiB3dGBmb3IodmFyICR7aWR4fSA9ICR7YmVnfTsgJHtpZHh9IDwgJHtlbmR9OyAke2lkeH0gKz0gJHtpbmNyfSl7JHtib2R5fSR7Tkx9fWA7XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICB3dGBmb3IodmFyICR7aWR4fSBvZiAke2xpc3R9KXske2JvZHl9JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIC8vIFRPRE86IGpzaW50IG9wdGkgaWYgdGhpcy52YWx1ZSBub3QgdXNlZC4uLlxuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS52YWx1ZV0gPSBTVHlwZV9pbnQ7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgICAgICAuLi4gbm9kZS5pdGVyLmFyZ3MubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dClcbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICAvL1RPRE86IGdldCB0eXBlLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvclwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuaXRlciwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgLy8gaWZcbiAgICB3dGBpZigke3RoaXMuY2hpbGRyZW5bMF19KXske3RoaXMuY2hpbGRyZW5bMV19JHtOTH19YDtcblxuICAgIC8vIGVsc2UgaWZcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDI7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgICAgICB3dGBlbHNlIGlmKCR7dGhpcy5jaGlsZHJlbltpXX0peyR7dGhpcy5jaGlsZHJlbltpKzFdfSR7Tkx9fWA7XG4gICAgfVxuXG4gICAgLy8gZWxzZVxuICAgIGlmKCBpID09PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEgKVxuICAgICAgICB3dGBlbHNlIHske3RoaXMuY2hpbGRyZW5baV19JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8gaWZcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXTtcblxuICAgIC8vIGVsc2UgaWZcbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgJiYgXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkge1xuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUoY3VyLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKGN1ci5ib2R5LCBjb250ZXh0KVxuICAgICAgICApXG4gICAgfVxuICAgIC8vIGVsc2VcbiAgICBpZiggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggIT09IDAgKVxuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjb252ZXJ0X25vZGUoY3VyLm9yZWxzZSwgY29udGV4dCkgKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIG51bGwsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgY29uZCAgICAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IGlmX3RydWUgID0gdGhpcy5jaGlsZHJlblsxXTtcbiAgICBjb25zdCBpZl9mYWxzZSA9IHRoaXMuY2hpbGRyZW5bMl07XG5cbiAgICB3dGAoJHtjb25kfSA/ICR7aWZfdHJ1ZX0gOiAke2lmX2ZhbHNlfSlgO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjb25kICAgICAgID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgY29uc3QgYm9keV90cnVlICA9IGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpO1xuICAgIGNvbnN0IGJvZHlfZmFsc2UgPSBjb252ZXJ0X25vZGUobm9kZS5vcmVsc2UsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLnRlcm5hcnlcIiwgYm9keV90cnVlLnJlc3VsdF90eXBlLCBudWxsLCBbXG4gICAgICAgIGNvbmQsXG4gICAgICAgIGJvZHlfdHJ1ZSxcbiAgICAgICAgYm9keV9mYWxzZVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZFeHBcIjsiLCJpbXBvcnQgeyBCQiwgQkUsIE5MLCB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3dGB0cnkgeyR7dGhpcy5jaGlsZHJlblswXX0ke05MfX1gO1xuICAgIHd0YGNhdGNoKF9yYXdfZXJyXyl7JHtCQn0ke05MfWA7XG5cbiAgICAgICAgdyhcImNvbnN0IF9lcnJfID0gX2JfLmdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfLCBfX1NCUllUSE9OX18pXCIpO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICB3KCB0aGlzLmNoaWxkcmVuWzFdICk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMjsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB3KE5MLCBcImVsc2UgXCIsIHRoaXMuY2hpbGRyZW5baV0gKTtcblxuICAgICAgICAvLyBub3QgYSBjYXRjaCBhbGwuLi5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV0uY2hpbGRyZW4ubGVuZ3RoICE9PSAxKVxuICAgICAgICAgICAgdyhOTCwgXCJlbHNlIHsgdGhyb3cgX3Jhd19lcnJfIH1cIik7XG5cbiAgICB3KEJFLCBOTCk7XG5cbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBuZXcgQXJyYXk8QVNUTm9kZT4obm9kZS5oYW5kbGVycy5sZW5ndGgrMSk7XG5cbiAgICAvLyB0cnkgYm9keVxuICAgIGNoaWxkcmVuWzBdID0gY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5oYW5kbGVyczsgKytpKVxuICAgICAgICBjaGlsZHJlbltpKzFdID0gY29udmVydF9ub2RlKG5vZGUuaGFuZGxlcnNbaV0sIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCIsIG51bGwsIG51bGwsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeVwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICAvLyBlbHNlIGlzIGhhbmRsZWQgYnkgdHJ5YmxvY2tcblxuICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gd3RgeyR7dGhpcy5jaGlsZHJlblswXX0sJHtOTH19YDtcblxuICAgIHd0YGlmKCR7dGhpcy5jaGlsZHJlblswXX0peyR7dGhpcy5jaGlsZHJlblsxXX0ke05MfX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW47XG4gICAgaWYoIG5vZGUudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNoaWxkcmVuID0gW2NvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLCBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZHJlbiA9IFsgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCkgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGAsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gZmlsdGVyX3N0YWNrKHN0YWNrOiBzdHJpbmdbXSkge1xuICByZXR1cm4gc3RhY2suZmlsdGVyKCBlID0+IGUuaW5jbHVkZXMoJ2JyeXRob25fJykgKTsgLy9UT0RPIGltcHJvdmVzLi4uXG59XG5cbi8vVE9ETzogdXNlIH49c291cmNlbWFwLi4uXG5mdW5jdGlvbiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzOiBBU1ROb2RlW10sIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIpOiBudWxsfEFTVE5vZGUge1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICBpZiggbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID4gbGluZVxuICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQuY29sID4gY29sKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiggICAgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA+IGxpbmVcbiAgICAgICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuZW5kLmNvbCA+IGNvbFxuICAgICAgKSB7XG4gICAgICAgICAgbGV0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzW2ldLmNoaWxkcmVuLCBsaW5lLCBjb2wpO1xuICAgICAgICAgIGlmKCBub2RlICE9PSBudWxsKVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV07XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDsgLy90aHJvdyBuZXcgRXJyb3IoXCJub2RlIG5vdCBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrbGluZTJhc3Rub2RlKHN0YWNrbGluZTogU3RhY2tMaW5lLCBzYjogU0JyeXRob24pOiBBU1ROb2RlIHtcbiAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICByZXR1cm4gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3QuYm9keS5jaGlsZHJlbiwgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0LmJvZHkuY2hpbGRyZW4sIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgICAgY29sICs9IG5vZGUudmFsdWUubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIGNvbnN0IHN0YWNrX3N0ciA9IHN0YWNrLm1hcCggKGwsaSkgPT4gYEZpbGUgXCJbZmlsZV1cIiwgbGluZSAke25vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZnVuY3Rpb24gZ2V0X3B5X2V4Y2VwdGlvbihfcmF3X2Vycl86IGFueSwgX19TQlJZVEhPTl9fOiBhbnkpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclxuICAgICAgICAgICAgICA/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XG5cbiAgZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pO1xuICBcbiAgcmV0dXJuIF9lcnJfO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVidWdfcHJpbnRfZXhjZXB0aW9uLFxuICAgIGdldF9weV9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbmQgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgd3Rgd2hpbGUoJHtjb25kfSl7JHtib2R5fSR7Tkx9fX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsganNjb2RlX2N1cnNvciwgdywgd3IsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBjb25zdCBhcmdzICAgICAgPSB0aGlzO1xuICAgIGNvbnN0IF9hcmdzICAgICA9IGFyZ3MuY2hpbGRyZW47XG4gICAgY29uc3QgU1R5cGVfZmN0ID0gYXJncy52YWx1ZSEgYXMgU1R5cGVGY3Q7XG5cbiAgICBjb25zdCBtZXRhID0gU1R5cGVfZmN0Ll9fY2FsbF9fO1xuXG4gICAgbGV0IGt3X3N0YXJ0ID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZigga3dfc3RhcnQgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApXG4gICAgICAgIGt3X3N0YXJ0ID0gbWV0YS5pZHhfdmFyYXJnICsgMTtcblxuICAgIGlmKCBtZXRhLmt3YXJncyAhPT0gdW5kZWZpbmVkICYmIGt3X3N0YXJ0ID09PSBfYXJncy5sZW5ndGgtMSlcbiAgICAgICAgKytrd19zdGFydDtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IF9hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAgdyhcIiwgXCIpO1xuXG4gICAgICAgIGlmKCBrd19zdGFydCA9PT0gaSlcbiAgICAgICAgICAgIHcoXCJ7XCIpO1xuICAgICAgICBpZiggaSA9PT0gbWV0YS5pZHhfdmFyYXJnICYmIGkgPT09IF9hcmdzLmxlbmd0aC0xIClcbiAgICAgICAgICAgIChfYXJnc1tpXSBhcyBhbnkpLmxhc3QgPSB0cnVlO1xuXG4gICAgICAgIHdyaXRlX2FyZyhfYXJnc1tpXSk7XG4gICAgfVxuXG4gICAgaWYoIGt3X3N0YXJ0IDwgX2FyZ3MubGVuZ3RoKVxuICAgICAgICB3KCd9ID0ge30nKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVfYXJnKG5vZGU6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IGpzY29kZV9jdXJzb3IoKTtcblxuICAgIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLnZhcmFyZ1wiICkge1xuICAgICAgICBpZiggKG5vZGUgYXMgYW55KS5sYXN0KVxuICAgICAgICAgICAgd3RgLi4uJHtub2RlLnZhbHVlfWA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwiW11cIikgKTtcbiAgICB9IGVsc2UgaWYoIG5vZGUudHlwZSA9PT0gXCJhcmcua3dhcmdcIiApIHtcbiAgICAgICAgd3IoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgXCJ7fVwiKSApO1xuICAgIH0gZWxzZSBpZihub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSApIHtcblxuICAgICAgICBsZXQgdmFsdWU6IGFueSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgIGlmKCB2YWx1ZS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JyAmJiBub2RlLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcjJJbnQodmFsdWUpO1xuXG4gICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIHZhbHVlKSApO1xuICAgIH1lbHNlIHtcbiAgICAgICAgdyhub2RlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDoganNjb2RlX2N1cnNvcigpXG4gICAgfVxufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgYXN0MmpzIGZyb20gXCIuL2FzdDJqc1wiO1xuXG4vL1RPRE86IGZha2Ugbm9kZS4uLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydCgpIHtcbiAgICAvLyBhcmdzIG5vZGUgZG9lc24ndCBleGlzdC4uLlxuICAgIHJldHVybjtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImFyZ3VtZW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgU1R5cGVfZmN0OiBTVHlwZUZjdCwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGNvbnN0IF9hcmdzID0gbm9kZS5hcmdzO1xuICAgIGNvbnN0IGhhc192YXJhcmcgPSBfYXJncy52YXJhcmcgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoYXNfa3dhcmcgID0gX2FyZ3Mua3dhcmcgICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgYXJnc19wb3MgICA9IG1ldGEuYXJnc19wb3M7XG4gICAgY29uc3QgYXJnc19uYW1lcyA9IG1ldGEuYXJnc19uYW1lcztcblxuICAgIGNvbnN0IHRvdGFsX2FyZ3MgPSBfYXJncy5wb3Nvbmx5YXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgX2FyZ3MuYXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgK2hhc192YXJhcmdcbiAgICAgICAgICAgICAgICAgICAgICsgX2FyZ3Mua3dvbmx5YXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgK2hhc19rd2FyZztcblxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXk8QVNUTm9kZT4odG90YWxfYXJncyk7XG5cbiAgICBjb25zdCBwb3NfZGVmYXVsdHMgPSBub2RlLmFyZ3MuZGVmYXVsdHM7XG4gICAgY29uc3QgcG9zb25seSA9IF9hcmdzLnBvc29ubHlhcmdzO1xuICAgIGNvbnN0IHBvcyAgICAgPSBfYXJncy5hcmdzO1xuXG4gICAgLy8gcG9zb25seVxuICAgIGxldCBkb2Zmc2V0ID0gcG9zX2RlZmF1bHRzLmxlbmd0aCAtIHBvc29ubHkubGVuZ3RoIC0gcG9zLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zb25seS5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcocG9zb25seVtpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgXCJwb3Nvbmx5XCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tpXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBwb3NcbiAgICBsZXQgb2Zmc2V0ID0gcG9zb25seS5sZW5ndGg7XG4gICAgICBkb2Zmc2V0IC09IHBvc29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc1tpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgXCJwb3NcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgICAgIGFyZ3NfbmFtZXNbb2Zmc2V0XSA9IGFyZy52YWx1ZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgbWV0YS5pZHhfdmFyYXJnID0gb2Zmc2V0O1xuXG4gICAgLy8gdmFyYXJnXG4gICAgaWYoIGhhc192YXJhcmcgKSB7XG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3MudmFyYXJnLCB1bmRlZmluZWQsIFwidmFyYXJnXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbmJfcG9zX2RlZmF1bHRzID0gTWF0aC5taW4ocG9zX2RlZmF1bHRzLmxlbmd0aCwgcG9zLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGhhc19vdGhlcnMgPSBwb3NfZGVmYXVsdHMubGVuZ3RoID4gcG9zLmxlbmd0aCB8fCBhcmdzLmxlbmd0aCAhPT0gb2Zmc2V0O1xuXG4gICAgICAgIGlmKCBuYl9wb3NfZGVmYXVsdHMgPiAxIHx8IG5iX3Bvc19kZWZhdWx0cyA9PT0gMSAmJiBoYXNfb3RoZXJzKVxuICAgICAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyAtPSBuYl9wb3NfZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgbGV0IGN1dF9vZmYgICA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGN1dF9vZmYgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgY3V0X29mZiA9IG1ldGEuaWR4X3ZhcmFyZztcbiAgICBmb3IobGV0IGkgPSBwb3Nvbmx5Lmxlbmd0aDsgaSA8IGN1dF9vZmY7ICsraSlcbiAgICAgICAgYXJnc19wb3NbYXJnc1tpXS52YWx1ZV0gPSBpO1xuXG4gICAgZm9yKGxldCBpID0gY3V0X29mZjsgaSA8IG1ldGEuaWR4X3ZhcmFyZzsgKytpKVxuICAgICAgICBhcmdzX3Bvc1thcmdzW2ldLnZhbHVlXSA9IC0xO1xuXG4gICAgLy9UT0RPOiBpZHhfZW5kX3BvcyAoaWYgZGVmYXVsdCBhbmQgbm8gaWR4X3ZhcmFyZylcblxuICAgIC8vIGt3b25seVxuICAgIGNvbnN0IGt3b25seSAgICAgID0gX2FyZ3Mua3dvbmx5YXJncztcbiAgICBjb25zdCBrd19kZWZhdWx0cyA9IF9hcmdzLmt3X2RlZmF1bHRzO1xuXG4gICAgbWV0YS5oYXNfa3cgPSBtZXRhLmlkeF92YXJhcmcgIT09IGN1dF9vZmYgfHwga3dvbmx5Lmxlbmd0aCAhPT0gMDtcblxuICAgIGRvZmZzZXQgPSBrd19kZWZhdWx0cy5sZW5ndGggLSBrd29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrd29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKGt3b25seVtpXSwga3dfZGVmYXVsdHNbaV0sIFwia3dvbmx5XCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgICAgICBhcmdzX3Bvc1thcmcudmFsdWVdID0gLTE7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH1cblxuICAgIC8vIGt3YXJnXG4gICAgaWYoIGhhc19rd2FyZyApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3Mua3dhcmcsIHVuZGVmaW5lZCwgXCJrd2FyZ1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuXG4gICAgICAgIG1ldGEua3dhcmdzID0gYXJnLnZhbHVlO1xuICAgIH1cblxuICAgIC8vVE9ETy4uLlxuICAgIC8qXG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuICAgICovXG5cbiAgICBsZXQgdmlydF9ub2RlOiBhbnk7XG4gICAgaWYoIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBhcmdzWzBdICAgICAgICAgICAgLnB5Y29kZS5zdGFydDtcbiAgICAgICAgY29uc3QgZW5kICAgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG5cbiAgICAgICAgdmlydF9ub2RlID0ge1xuICAgICAgICAgICAgbGluZW5vICAgICAgICA6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0ICAgIDogc3RhcnQuY29sLFxuICAgICAgICAgICAgZW5kX2xpbmVubyAgICA6IGVuZC5saW5lLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5jb2xcbiAgICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIHZpcnRfbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBsaW5lbm8gICAgOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm8gICAgOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImFyZ3NcIiwgbnVsbCwgU1R5cGVfZmN0LCBhcmdzKTtcbiAgICBhc3Rub2RlLndyaXRlID0gYXN0MmpzO1xuICAgIHJldHVybiBhc3Rub2RlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6c3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGFyZy4ke3R5cGV9YCwgcmVzdWx0X3R5cGUsIG5vZGUuYXJnLCBjaGlsZHJlbik7XG59IiwiaW1wb3J0IHsgciwgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5mdW5jdGlvbiBwcmludF9vYmoob2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBpZihrZXlzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIFtbXV07XG5cbiAgICBjb25zdCBzdHIgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgrMSk7XG4gICAgc3RyWzBdID0gYHske2tleXNbMF19OiBgO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSAgPSBgLCAke2tleXNbaV19OiBgO1xuXG4gICAgc3RyW2ldID0gXCJ9XCI7XG5cbiAgICByZXR1cm4gW3N0ciwgLi4uT2JqZWN0LnZhbHVlcyhvYmopXTtcbn1cblxuZnVuY3Rpb24gam9pbihkYXRhOiBhbnlbXSwgc2VwPVwiLCBcIikge1xuXG4gICAgaWYoZGF0YS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW1wiXCJdXTtcblxuICAgIGNvbnN0IHN0ciA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCsxKTtcbiAgICBzdHJbMF0gPSBcIlwiO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSA9IHNlcDtcbiAgICBzdHJbaV0gPSBcIlwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLmRhdGFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdF9jYWxsKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IG1ldGEgPSAobm9kZS52YWx1ZSBhcyBTVHlwZUZjdCkuX19jYWxsX187XG5cbiAgICBsZXQga3dfcG9zID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKG5vZGUuY2hpbGRyZW5baV0udHlwZSA9PT0gXCJmdW5jdGlvbnMua2V5d29yZFwiKSB7XG4gICAgICAgICAgICBrd19wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIGxldCBuYl9wb3MgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBuYl9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgbmJfcG9zID0gTWF0aC5tYXgobWV0YS5pZHhfdmFyYXJnLCBrd19wb3MtMSk7XG5cbiAgICBsZXQgcG9zX3NpemUgPSBuYl9wb3MrMTtcbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAgcG9zX3NpemUgPSBtZXRhLmlkeF92YXJhcmcrMjtcbiAgICBsZXQgcG9zID0gbmV3IEFycmF5KHBvc19zaXplKTtcbiAgICBcbiAgICBjb25zdCBrdyAgICA6IFJlY29yZDxzdHJpbmcsIEFTVE5vZGU+ID0ge307XG4gICAgY29uc3Qga3dhcmdzOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuXG4gICAgbGV0IGhhc19rdyA9IGZhbHNlO1xuXG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG1ldGEuaWR4X3ZhcmFyZyk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGN1dG9mZjsgKytpKVxuICAgICAgICAgICAgcG9zW2ktMV0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGlmKCBtZXRhLmlkeF92YXJhcmcrMSAhPT0ga3dfcG9zIClcbiAgICAgICAgICAgIHBvc1ttZXRhLmlkeF92YXJhcmddID0gam9pbihbXCJbXCIsIGpvaW4obm9kZS5jaGlsZHJlbi5zbGljZShtZXRhLmlkeF92YXJhcmcrMSxrd19wb3MpKSwgXCJdXCJdLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbmJfcG9zKzEpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuICAgICAgICBmb3IobGV0IGkgPSBjdXRvZmY7IGkgPCBrd19wb3M7ICsraSlcbiAgICAgICAgICAgIGt3WyBhcmdzX25hbWVzW2ktMV0gXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgaGFzX2t3ID0gY3V0b2ZmICE9PSBrd19wb3M7XG4gICAgfVxuXG4gICAgbGV0IGhhc19rd2FyZ3MgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFyZ3NfcG9zID0gbWV0YS5hcmdzX3BvcztcbiAgICBcblxuICAgIGZvcihsZXQgaSA9IGt3X3BvczsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBjb25zdCBhcmcgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGFyZy52YWx1ZTtcbiAgICAgICAgY29uc3QgaWR4ICA9IGFyZ3NfcG9zWyBuYW1lIF07XG5cbiAgICAgICAgaWYoIGlkeCA+PSAwICkge1xuICAgICAgICAgICAgcG9zW2lkeF0gPSBhcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc19rdyA9IHRydWU7XG5cbiAgICAgICAgaWYoIGlkeCA9PT0gLTEpXG4gICAgICAgICAgICBrd1tuYW1lXSA9IGFyZztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrd2FyZ3NbbmFtZV0gPSBhcmc7XG4gICAgICAgICAgICBoYXNfa3dhcmdzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4gPSBrdztcbiAgICAvL1RPRE86IG9ubHkgdGhlIG9uZXMgYXQgLTEuLi5cbiAgICBpZiggaGFzX2t3YXJncyAmJiAhIG1ldGEuaGFzX2t3ICl7XG4gICAgICAgIG9iaiA9IGt3YXJncztcbiAgICB9IGVsc2UgaWYoIGhhc19rd2FyZ3MgKSB7XG4gICAgICAgIG9ialttZXRhLmt3YXJncyFdID0gcHJpbnRfb2JqKGt3YXJncyk7XG4gICAgfVxuXG4gICAgaWYoIGhhc19rdyApXG4gICAgICAgIHBvc1twb3MubGVuZ3RoLTFdID0gcHJpbnRfb2JqKG9iaik7XG4gICAgZWxzZSB7XG4gICAgICAgIHdoaWxlKHBvcy5sZW5ndGggPiAwICYmIHBvc1twb3MubGVuZ3RoLTFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAtLXBvcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHtub2RlLmNoaWxkcmVuWzBdfSgke2pvaW4ocG9zKX0pYDsgLy8gYXJncyA/XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3ciggKHRoaXMudmFsdWUgYXMgU1R5cGVGY3QpLl9fY2FsbF9fLnN1YnN0aXR1dGVfY2FsbCEodGhpcykgKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG4gICAgY29uc3QgZmN0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0hO1xuICAgIGlmKCBmY3RfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBjb25zb2xlLndhcm4obm9kZSk7XG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZXh0LmxvY2FsX3N5bWJvbHMpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uICR7bmFtZX0gbm90IGRlZmluZWRgKTtcbiAgICB9XG4gICAgY29uc3QgcmV0X3R5cGUgPSAoZmN0X3R5cGUuX19jYWxsX18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgcmV0X3R5cGUsIGZjdF90eXBlLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzICAgIC5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpICksXG4gICAgICAgIC4uLm5vZGUua2V5d29yZHMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBrZXl3b3JkIG5vZGUuLi5cbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcodGhpcy5jaGlsZHJlblswXSk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHZhbHVlICAgID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQgKVxuICAgIGNvbnN0IHJldF90eXBlID0gdmFsdWUucmVzdWx0X3R5cGU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMua2V5d29yZFwiLCByZXRfdHlwZSwgbm9kZS5hcmcsIFtcbiAgICAgICAgdmFsdWVcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImtleXdvcmRcIjsiLCJpbXBvcnQgeyBOTCwgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgYXJncyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICB3dGBmdW5jdGlvbiAke25hbWV9KCR7YXJnc30peyR7Ym9keX0ke05MfX1gO1xuICAgIC8vdygnZnVuY3Rpb24gJywgbmFtZSwgJygnLCBhcmdzLCAnKXsnLCBib2R5LCBOTCwgJ30nKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGdldFNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBkZWZhdWx0X2NhbGwgfSBmcm9tIFwiLi4vY2FsbC9hc3QyanNcIjtcbmltcG9ydCB7IGNvbnZlcnRfYXJncyB9IGZyb20gXCIuLi9hcmdzL2FzdGNvbnZlcnRcIjtcblxuLy8gcmVxdWlyZWQgYXMgc29tZSBzeW1ib2xzIG1heSBoYXZlIGJlZW4gZGVjbGFyZWQgb3V0IG9mIG9yZGVyXG4vLyAobm90IG9ubHkgZm9yIHJldHVybiB0eXBlIGNvbXB1dGF0aW9uKVxuZnVuY3Rpb24gZ2VuZXJhdGUobm9kZTogYW55LCBhc3Rub2RlOiBBU1ROb2RlLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBmdWNrLi4uXG4gICAgY29uc3Qgc3R5cGUgICA9IGFzdG5vZGUucmVzdWx0X3R5cGUhIGFzIFNUeXBlRmN0O1xuICAgIGNvbnN0IG1ldGEgICAgPSBzdHlwZS5fX2NhbGxfXztcblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiZmN0XCIsIGNvbnRleHQpO1xuICAgIGNvbnRleHQucGFyZW50X25vZGVfY29udGV4dCA9IGFzdG5vZGU7IC8vIDwtIGhlcmVcblxuICAgIC8vIGZha2UgdGhlIG5vZGUuLi4gPT4gYmV0dGVyIGRvaW5nIGhlcmUgdG8gbm90IGhhdmUgY29udGV4dCBpc3N1ZXMuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBzdHlwZSwgY29udGV4dCk7XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAvLyB0ZWxsIGJvZHkgdGhpcyBmdW5jdGlvbiBoYXMgYmVlbiBnZW5lcmF0ZWQuXG4gICAgbWV0YS5nZW5lcmF0ZSA9IHVuZGVmaW5lZDtcbiAgICAvLyBwcmV2ZW50cyByZWN1cnNpdmUgY2FsbHMgb3IgcmVhZmZlY3RhdGlvbi5cbiAgICBtZXRhLnJldHVybl90eXBlID0gdW5kZWZpbmVkIGFzIGFueTtcblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlLnJldHVybnM/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGxldCBmY3RfcmV0dXJuX3R5cGU6IFNUeXBlT2JqID0gZ2V0U1R5cGUoYW5ub3RhdGlvbik7XG4gICAgICAgIC8vIGZvcmNlIHRoZSB0eXBlLlxuICAgICAgICBtZXRhLnJldHVybl90eXBlID0gKCkgPT4gZmN0X3JldHVybl90eXBlITtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IGJvZHlcbiAgICBhc3Rub2RlLmNoaWxkcmVuID0gW1xuICAgICAgICBhcmdzLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvL2NvbnN0IGlzTWV0aG9kID0gY29udGV4dC50eXBlID09PSBcImNsYXNzXCI7XG5cbiAgICBjb25zdCBTVHlwZV9mY3Q6IFNUeXBlRmN0ID0ge1xuICAgICAgICBfX25hbWVfXzogXCJmdW5jdGlvblwiLFxuICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgYXJnc19uYW1lcyAgICAgOiBuZXcgQXJyYXkobm9kZS5hcmdzLmFyZ3MubGVuZ3RoK25vZGUuYXJncy5wb3Nvbmx5YXJncy5sZW5ndGgpLFxuICAgICAgICAgICAgYXJnc19wb3MgICAgICAgOiB7fSxcbiAgICAgICAgICAgIGlkeF9lbmRfcG9zICAgIDogLTEsXG4gICAgICAgICAgICBpZHhfdmFyYXJnICAgICA6IC0xLFxuICAgICAgICAgICAgaGFzX2t3ICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIGdlbmVyYXRlLFxuICAgICAgICAgICAgcmV0dXJuX3R5cGUgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGUobm9kZSwgYXN0bm9kZSwgY29udGV4dCk7IC8vIHNob3VsZCBiZSB0aGUgbmV3IGNvbnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gU1R5cGVfZmN0Ll9fY2FsbF9fLnJldHVybl90eXBlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBkZWZhdWx0X2NhbGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaWYoICEgaXNNZXRob2QgKSB7XG4gICAgLy8gaWYgbWV0aG9kIGFkZCB0byBzZWxmX2NvbnRleHQuc3ltYm9scyA/XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUubmFtZV0gPSBTVHlwZV9mY3Q7XG5cblxuICAgIC8vIGltcGxpY2l0IHJldHVybi4uLlxuICAgIGNvbnN0IGxhc3RfdHlwZSAgID0gbm9kZS5ib2R5W25vZGUuYm9keS5sZW5ndGgtMV0uY29uc3RydWN0b3IuJG5hbWU7XG4gICAgaWYoIGxhc3RfdHlwZSAhPT0gXCJSZXR1cm5cIiAmJiBsYXN0X3R5cGUgIT09IFwiUmFpc2VcIiApIHtcblxuICAgICAgICBjb25zdCBmYWtlX25vZGUgPSB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgICRuYW1lOiBcIlJldHVyblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxpbmVubzogbm9kZS5lbmRfbGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5lbmRfbGluZW5vLFxuICAgICAgICAgICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogbm9kZS5lbmRfY29sX29mZnNldCxcbiAgICAgICAgfVxuICAgICAgICBub2RlLmJvZHkucHVzaCggZmFrZV9ub2RlICk7XG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmRlZlwiLCBTVHlwZV9mY3QsIG5vZGUubmFtZSk7XG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHJldHVybiB3dGBfYl8uYXNzZXJ0KCR7dGhpcy5jaGlsZHJlblswXX0pYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiQXNzZXJ0XCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkFzc2VydFwiOyIsImZ1bmN0aW9uIGFzc2VydChjb25kOiBib29sZWFuKSB7XG4gICAgaWYoIGNvbmQgKVxuICAgICAgICByZXR1cm47XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXNzZXJ0XG59OyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcImJyZWFrXCIpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmJyZWFrXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQnJlYWtcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJjb250aW51ZVwiKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmNvbnRpbnVlXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29udGludWVcIjsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggdGhpcy52YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdyh0aGlzLnZhbHVlWzBdKTtcblxuICAgIHd0YCR7dGhpcy52YWx1ZVswXX06ICR7dGhpcy52YWx1ZVsxXX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0LmFsaWFzXCIsIG51bGwsIFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiYWxpYXNcIl07IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcImNvbnN0IHtcIik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIHcoXCIsIFwiKTtcbiAgICAgICAgdyh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICB3KCd9ID0gJyk7XG4gICAgXG4gICAgaWYodGhpcy52YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgdyhcIl9fU0JSWVRIT05fXy5nZXRNb2R1bGVzKClcIik7XG4gICAgZWxzZVxuICAgICAgICB3dGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt0aGlzLnZhbHVlfVwiKWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydFwiLCBudWxsLCBub2RlLm1vZHVsZSxcbiAgICAgICAgbm9kZS5uYW1lcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHd0YHRocm93IG5ldyBfYl8uUHl0aG9uRXJyb3IoJHt0aGlzLmNoaWxkcmVuWzBdfSlgO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJhaXNlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjQgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2NvbnRpbnVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNSBmcm9tIFwiLi9rZXl3b3Jkcy9icmVhay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNiBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yNiBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI3IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI3IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI4IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI5IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI5IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMwIGZyb20gXCIuL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM1IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM3IGZyb20gXCIuL2NvbW1lbnRzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNyBmcm9tIFwiLi9jb21tZW50cy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zOCBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzggZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzkgZnJvbSBcIi4vYm9keS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzkgZnJvbSBcIi4vYm9keS9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLnVuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcIm9wZXJhdG9ycy5jb21wYXJlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcIm9wZXJhdG9ycy5ib29sZWFuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5iaW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwib3BlcmF0b3JzLmF0dHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJvcGVyYXRvcnMuQXNzaWduT3BcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNFxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNVxuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmdcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnQvYWxpYXNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjNcblx0fSxcblx0XCJrZXl3b3Jkcy5jb250aW51ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImtleXdvcmRzLmJyZWFrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI1XG5cdH0sXG5cdFwia2V5d29yZHMuYXNzZXJ0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI2XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmRlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI4XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGwva2V5d29yZFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOVxuXHR9LFxuXHRcImZ1bmN0aW9ucy5hcmdzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMwXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLndoaWxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMxXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMzXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRlcm5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzRcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5mb3JcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzZcblx0fSxcblx0XCJjb21tZW50c1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zN1xuXHR9LFxuXHRcImNsYXNzLmNsYXNzZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM4XG5cdH0sXG5cdFwiYm9keVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zOVxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV85KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8xNik7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjEpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI2KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8zMik7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICB3KFwibnVsbFwiKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05vbmVUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLk5vbmVcIiwgU1R5cGVfTm9uZVR5cGUsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBhZGRTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnTm9uZVR5cGUnLCB7fSk7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KHRoaXMudmFsdWUpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFNUeXBlX2Jvb2wsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQ21wT3BzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2Jvb2wnLCB7XG4gICAgXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfYm9vbCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludF0pLFxuICAgIFxufSk7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiJHtcIiwgdGhpcy5jaGlsZHJlblswXSwgXCJ9XCIpXG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IGpzY29kZV9jdXJzb3IsIHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiYFwiKTtcblxuICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuXG4gICAgICAgIGlmKCBjaGlsZC5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfc3RyKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0ganNjb2RlX2N1cnNvcigpO1xuXG4gICAgICAgICAgICB3KGNoaWxkLnZhbHVlKTtcblxuICAgICAgICAgICAgY2hpbGQuanNjb2RlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDoganNjb2RlX2N1cnNvcigpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlID09PSBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIpIHtcbiAgICAgICAgICAgIHcoY2hpbGQpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIHcoXCJgXCIpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmdcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5ub2RlLnZhbHVlcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkpvaW5lZFN0clwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyh0aGlzLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Zsb2F0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgU1R5cGVfZmxvYXQsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvYXQyc3RyOiAoZjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmKCBmIDw9IDFlLTUgfHwgZiA+PSAxZTE2KSB7XG5cbiAgICAgICAgICAgIGxldCBzdHIgPSBmLnRvRXhwb25lbnRpYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHNpZ25faWR4ID0gc3RyLmxlbmd0aC0yO1xuICAgICAgICAgICAgaWYoc3RyW3NpZ25faWR4XSA9PT0gJy0nIHx8IHN0cltzaWduX2lkeF0gPT09ICcrJylcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCxzaWduX2lkeCsxKSArICcwJyArIHN0ci5zbGljZShzaWduX2lkeCsxKTtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RyID0gZi50b1N0cmluZygpO1xuICAgICAgICBpZiggISBzdHIuaW5jbHVkZXMoJy4nKSlcbiAgICAgICAgICAgIHN0ciArPSBcIi4wXCI7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufSIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9mbG9hdCA9IGFkZFNUeXBlKCd0eXBlW2Zsb2F0XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2Zsb2F0LFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2Zsb2F0IHx8IG90aGVyX3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlcl90eXBlO1xuXG4gICAgICAgICAgICAvL1RPRE86IHBvd2VyLi4uXG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfc3RyICkge1xuXG4gICAgICAgICAgICAgICAgaWYoIG90aGVyLnR5cGUgPT09IFwibGl0ZXJhbHMuc3RyXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvdGhlci52YWx1ZSA9PT0gXCJpbmZcIiB8fCBvdGhlci52YWx1ZSA9PT0gXCJpbmZpbml0eVwiIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk51bWJlci5QT1NJVElWRV9JTkZJTklUWVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXIudmFsdWUgPT09IFwiLWluZlwifHwgb3RoZXIudmFsdWUgPT09IFwiLWluZmluaXR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2lmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMylcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gcmBCaWdJbnQocGFyc2VJbnQoJHtvdGhlcn0sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE86IG9wdGltaXplIGlmIG90aGVyIGlzIHN0cmluZyBsaXR0ZXJhbC4uLlxuICAgICAgICAgICAgICAgIHJldHVybiByYHBhcnNlRmxvYXQoJHtvdGhlcn0pYDsgLy8sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnZmxvYXQnLCB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2Zsb2F0LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb2F0MnN0cigke25vZGV9KWA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgICAgICAgICAgICAgWycqKicsICcqJywgJy8nLCAnKycsICctJ10sXG4gICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LFxuICAgICAgICBbJy8vJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgWyclJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9mbG9hdCwgWyd1Li0nXSksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgc3VmZml4ID0gXCJcIjtcbiAgICBsZXQgdGFyZ2V0ID0gKHRoaXMgYXMgYW55KS5hcztcblxuICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICBpZih0YXJnZXQgPT09IFwiZmxvYXRcIikge1xuICAgICAgICBpZiggdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuICAgIH1cbiAgICBlbHNlIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgfHwgdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBiaWdpbnQgZG8gbm90IGNhc3QgaW50byBqc2ludCAobG9zcyBvZiBwcmVjaXNpb24pLlxuICAgICAgICBzdWZmaXggPSBcIm5cIjtcblxuICAgIC8vIDFlKzU0IHNob3VsZCBoYWQgYmUgc3RvcmVkIGFzIGJpZ2ludC5cbiAgICB3dGAke3ZhbHVlfSR7c3VmZml4fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVHlwZV9pbnQgOiBTVHlwZV9qc2ludDtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCByZWFsX3R5cGUsIHZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgaWRfanNvcCwgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBTVHlwZV90eXBlX2ludCA9IGFkZFNUeXBlKCd0eXBlW2ludF0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IG90aGVyLnJlc3VsdF90eXBlXG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2Zsb2F0IClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoTWF0aC50cnVuYygke290aGVyfSkpYDtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApIHtcblxuICAgICAgICAgICAgICAgIC8vaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAzKVxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByYEJpZ0ludChwYXJzZUludCgke290aGVyfSwgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDtcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogb3B0aW1pemUgaWYgb3RoZXIgaXMgc3RyaW5nIGxpdHRlcmFsLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgQmlnSW50KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ2ludCcsIHtcblxuICAgIC8vVE9ETzogZml4IHR5cGUuLi5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2ludCxcblxuICAgIF9fc3RyX186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX3N0cixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYCR7bm9kZX0udG9TdHJpbmcoKWA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfaW50LFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qICovXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgW1xuICAgICAgICAgICAgLy8gJyoqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICAgICAgJyoqJywgJysnLCAnLScsXG4gICAgICAgICAgICAnJicsICd8JywgJ14nLCAnPj4nLCAnPDwnXG4gICAgICAgIF0sXG4gICAgICAgIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyonXSwgW1NUeXBlX2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBhLCBiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqJywgYik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsIFsnLyddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfZmxvYXRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAocykgPT4gSW50Mk51bWJlcihzLCAnZmxvYXQnKSxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWycvLyddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyUnXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7XCJqc2ludFwiOiBcImludFwifSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgWyd1Li0nXSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAncmVhbCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBJbnQyTnVtYmVyKGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ34nXSxcbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0gKVxuICAgIC8qICovXG5cbn0pOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnanNpbnQnLCB7XG5cbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICAvLyAnKionIGFuZCAnKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgW1xuICAgICAgICAgICAgJyoqJywgJysnLCAnLScsXG4gICAgICAgICAgICAnJicsICd8JywgJ14nLCAnPj4nLCAnPDwnIC8vIGluIEpTIGJpdCBvcGVyYXRpb25zIGFyZSBvbiAzMmJpdHNcbiAgICAgICAgXSxcbiAgICAgICAgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKSxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnanNpbnQnOiAnaW50J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWycqJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnZmxvYXQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBOdW1iZXIySW50KGEpLCAnKicsIE51bWJlcjJJbnQoYikgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCwgWycvJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9mbG9hdF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2pzaW50LCBbJy8vJ10sIFtTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfanNpbnQsIFsnJSddLCBbU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9qc2ludCxcbiAgICAgICAgWyd1Li0nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdpbnQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgTnVtYmVyMkludChhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgWyd+J10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHNlbGYpID0+IE51bWJlcjJJbnQoc2VsZilcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSApXG4gICAgLypcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSwqL1xufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHd0YCcke3RoaXMudmFsdWV9J2A7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBTVHlwZV9zdHIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wc30gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9zdHIgPSBhZGRTVHlwZSgndHlwZVtzdHJdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyO1xuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19zdHJfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19zdHJfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnc3RyJywge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9zdHIsXG5cbiAgICBfX2xlbl9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKF8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiByYCR7Xy5jaGlsZHJlblsxXX0ubGVuZ3RoYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgW1NUeXBlX3N0cl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9zdHIsIFtcIitcIl0sIFtTVHlwZV9zdHJdKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfc3RyLCBbXCIqXCJdLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDoge1wiaW50XCI6IFwiZmxvYXRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGEucmVzdWx0X3R5cGUgIT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmAke2F9LnJlcGVhdCgke2J9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKVxuICAgICAgICB3KFwidmFyIFwiKTtcblxuICAgIHcodGhpcy5jaGlsZHJlblswXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgKytpKVxuICAgICAgICB3dGAgPSAke3RoaXMuY2hpbGRyZW5baV19YDtcblxuICAgIGNvbnN0IHJpZ2h0X25vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuICAgIGxldCByY2hpbGQ6IGFueSA9IHJpZ2h0X25vZGU7XG5cbiAgICBpZiggcmlnaHRfbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQgJiYgdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChyaWdodF9ub2RlKTtcblxuICAgIHd0YCA9ICR7cmNoaWxkfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuXG4gICAgY29uc3QgYW5ub3RhdGlvbiA9IG5vZGU/LmFubm90YXRpb24/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJlc3VsdF90eXBlID0gZ2V0U1R5cGUoYW5ub3RhdGlvbik7XG5cblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVHlwZV9pbnQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgLy8gY291bGQgYmUgaW1wcm92ZWQgSSBndWVzcy5cbiAgICAgICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiggbGVmdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IGxlZnRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXSA9IHJlc3VsdF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJlc3VsdF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICAuLi5sZWZ0cyxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQXNzaWduT3BlcmF0b3JzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBsZXQgb3AgPSAoQXNzaWduT3BlcmF0b3JzIGFzIGFueSlbdGhpcy52YWx1ZV07XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgYSA9IGEgKyBiXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9PSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcbiAgICAgICAgLypcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICB3ciggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEodGhpcywgbGVmdCwgcmlnaHQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUudGFyZ2V0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIGxlZnQucmVzdWx0X3R5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICBcbiAgICB3dGAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHd0YCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LCByaWdodCkgKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcFwiXTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvb3JkaXZfZmxvYXQ6IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vciggYS9iICk7XG4gICAgfSxcbiAgICBmbG9vcmRpdl9pbnQ6IChhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhL2I7XG4gICAgICAgIGlmKCByZXN1bHQgPiAwIHx8IGElYiA9PT0gMG4pXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIHJldHVybiAtLXJlc3VsdDtcbiAgICB9LFxuICAgIG1vZF9mbG9hdDogPFQ+KGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbW9kID0gKGEgJSBiICsgYikgJSBiO1xuICAgICAgICBpZiggbW9kID09PSAwICYmIGIgPCAwIClcbiAgICAgICAgICAgIHJldHVybiAtMDtcbiAgICAgICAgcmV0dXJuIG1vZDtcbiAgICB9LFxuICAgIG1vZF9pbnQ6IDxUPihhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAoYSAlIGIgKyBiKSAlIGI7XG4gICAgfVxufSIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICB3ciggbXVsdGlfanNvcCh0aGlzLCB0aGlzLnZhbHVlLCAuLi50aGlzLmNoaWxkcmVuKSApO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmNvbnN0IGJuYW1lMmpzb3AgPSB7XG4gICAgJ0FuZCc6ICcmJicsXG4gICAgJ09yJyA6ICd8fCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLnZhbHVlcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKSApO1xuXG4gICAgY29uc3Qgb3AgICA9IChibmFtZTJqc29wIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJvb2xlYW5cIiwgdHlwZSwgb3AsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCb29sT3BcIl07IiwiaW1wb3J0IHsgdywgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3AgYXMgYW55KTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgICAgIGlmKCBvcCAhPT0gJ19fZXFfXycgJiYgb3AgIT09ICdfX25lX18nIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bHR5cGV9ICR7b3B9ICR7cnR5cGV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcblxuICAgICAgICAgICAgY29uc3QganNvcCA9IG9wID09PSAnX19lcV9fJyA/ICc9PT0nIDogJyE9PSc7XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBqc29wLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZlcnNlZCA9IHRydWU7XG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBsZWZ0LCByaWdodCwgcmV2ZXJzZWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwIClcbiAgICAgICAgICAgIHcoJyAmJiAnKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAgd3IoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICc9PT0nLCByaWdodCkgKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJyE9PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdyKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgb3AsIHJpZ2h0KSApO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBvcHMgPSBub2RlLm9wcy5tYXAoIChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbZS5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UuY29uc3RydWN0b3IuJG5hbWV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVmdCAgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0cyA9IG5vZGUuY29tcGFyYXRvcnMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBvcGVyYXRvcnMuY29tcGFyZWAsIFNUeXBlX2Jvb2wsIG9wcyxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIC4uLnJpZ2h0cyxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdywgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgaWYoIHRoaXMudmFsdWUgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gd3IoIHVuYXJ5X2pzb3AodGhpcywgJyEnLCBJbnQyTnVtYmVyKGxlZnQsICdqc2ludCcpICkgKTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0KSApO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sLCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLm9wZXJhbmQgLCBjb250ZXh0ICk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmKCBvcCA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCBTVHlwZV9ib29sLCBcIm5vdFwiLCBbIGxlZnQgXSApO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHcoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInBhc3NcIiwgbnVsbCk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlBhc3NcIjsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB3KFwicmV0dXJuIG51bGxcIik7XG5cbiAgICByZXR1cm4gd3RgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8gY29udGV4dC5wYXJlbnRfbm9kZV9jb250ZXh0XG4gICAgbGV0IHJlc3VsdF90eXBlID0gU1R5cGVfTm9uZVR5cGU7XG4gICAgbGV0IGNoaWxkcmVuICAgID0gdW5kZWZpbmVkO1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBleHByID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgICAgICByZXN1bHRfdHlwZSA9IGV4cHIucmVzdWx0X3R5cGUhO1xuICAgICAgICBjaGlsZHJlbiAgICA9IFtleHByXTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXRhID0gKGNvbnRleHQucGFyZW50X25vZGVfY29udGV4dCEucmVzdWx0X3R5cGUhIGFzIFNUeXBlRmN0ICkuX19jYWxsX187XG4gICAgaWYoIG1ldGEucmV0dXJuX3R5cGUgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIG1ldGEucmV0dXJuX3R5cGUgPSAoKSA9PiByZXN1bHRfdHlwZTtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgcmVzdWx0X3R5cGUsIG51bGwsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoJ3snKTtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3dGAke3RoaXMuY2hpbGRyZW5bMF19OiAke3RoaXMuY2hpbGRyZW5bMV19YDtcblxuICAgIGZvcihsZXQgaSA9IDI7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSs9MilcbiAgICAgICAgd3RgLCAke3RoaXMuY2hpbGRyZW5baV19OiAke3RoaXMuY2hpbGRyZW5baSsxXX1gO1xuXG4gICAgdygnfScpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiW1wiKTtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3KHRoaXMuY2hpbGRyZW5bMF0pO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCB0aGlzLmNoaWxkcmVuW2ldKTtcblxuICAgIHcoXCJdKVwiKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTGlzdFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcIk9iamVjdC5mcmVlemUoW1wiKTtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3KHRoaXMuY2hpbGRyZW5bMF0pO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCB0aGlzLmNoaWxkcmVuW2ldKTtcblxuICAgIHcoXCJdKVwiKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcodGhpcy52YWx1ZSk7XG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJzsgLy9UT0RPIHR5cGUgb2YgY3VycmVudCBjb250ZXh0ICEgLT4gc2VsZiBpbiBsb2NhbF9zeW1ib2xzID9cbiAgICBlbHNlIGlmKCB2YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW3ZhbHVlXTtcblxuICAgIC8qXG4gICAgICAgIC8vVE9ETyBnbG9iYWxTeW1ib2xzXG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG4gICAgKi9cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFNUeXBlLCBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX3R5cGVfaW50IH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX3R5cGVfc3RyIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX3R5cGVfZmxvYXQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IHcsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgYm9keSAgICA6IEFTVE5vZGUsXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIHtcbiAgICAgICAgYm9keTogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlIHtcbiAgICByZXR1cm4gY29udmVydF9ub2RlKGFzdC5ib2R5LCBuZXcgQ29udGV4dCgpICk7XG59XG5cblxuZnVuY3Rpb24gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBzdHJpbmcge1xuXG4gICAgLy8gbGlrZWx5IGEgYm9keS5cbiAgICBpZiggQXJyYXkuaXNBcnJheShicnl0aG9uX25vZGUpIClcbiAgICAgICAgcmV0dXJuIFwiQm9keVwiO1xuXG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYobmFtZSA9PT0gXCJFeHByXCIpIHtcbiAgICAgICAgYnJ5dGhvbl9ub2RlID0gYnJ5dGhvbl9ub2RlLnZhbHVlO1xuICAgICAgICBuYW1lID0gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlKTtcbiAgICB9XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWQ6XCIsIG5hbWUpO1xuICAgICAgICBjb25zb2xlLndhcm4oYGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coIGJyeXRob25fbm9kZSApO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgaGF2ZSBtYW55IG1vZHVsZXMgZm9yIHRoZSBzYW1lIG5vZGUgdHlwZS5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7IFxuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC53cml0ZSA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3QyYXN0bm9kZShub2RlOiBhbnlbXSkge1xuXG4gICAgY29uc3QgYmVnID0gbm9kZVswXTtcbiAgICBjb25zdCBlbmQgPSBub2RlW25vZGUubGVuZ3RoLTFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGluZW5vICAgICAgICA6IGJlZy5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQgICAgOiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGVuZC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogZW5kLmVuZF9jb2xfb2Zmc2V0LFxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dCA9IFJvb3RDb250ZXh0KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7IC8vVE9ETzogcmVtb3ZlXG4gICAgICAgIHRoaXMubG9jYWxfc3ltYm9scyA9IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF9zeW1ib2xzfTtcbiAgICB9XG4gICAgdHlwZTsgLy9UT0RPOiByZW1vdmVcblxuICAgIHBhcmVudF9ub2RlX2NvbnRleHQ/OiBBU1ROb2RlOyBcblxuICAgIGxvY2FsX3N5bWJvbHM6IFJlY29yZDxzdHJpbmcsIFNUeXBlT2JqfG51bGw+O1xufVxuXG5jb25zdCB0eXBlX2ZjdCA9IHt9IC8qIGZjdCBjbGFzcyA9PiB0eXBlIGNsYXNzICovXG5cbi8vVE9ETzogbW92ZS4uLlxuLy9UT0RPOiBiaW5hcnkvdW5hcnlcbi8vVE9ETzogcmVtb3ZlIHJldHVybl90eXBlIChnZXQgZnJvbSB0aGUgX197bmFtZX1fXylcbmZ1bmN0aW9uIGdlblVuYXJ5T3BGY3QobmFtZTogc3RyaW5nLCByZXR1cm5fdHlwZTogU1R5cGVPYmopIHtcbiAgICBjb25zdCBvcG5hbWUgPSBgX18ke25hbWV9X19gO1xuICAgIHJldHVybiB7XG4gICAgICAgIFtuYW1lXToge1xuICAgICAgICAgICAgX19jbGFzc19fOiB0eXBlX2ZjdCxcbiAgICAgICAgICAgIF9fbmFtZV9fIDogbmFtZSxcbiAgICAgICAgICAgIF9fY2FsbF9fIDoge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogSSBuZWVkIGEgc2VsZi4uLlxuICAgICAgICAgICAgICAgIHJldHVybl90eXBlICAgIDogKCkgPT4gcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgLy8gbm90IHJlYWxseSA6P1xuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKGNhbGw6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IGNhbGwuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW29wbmFtZV0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEoY2FsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBidWlsdGluIHN5bWJvbHMuXG4vLyBAdHMtaWdub3JlXG5jb25zdCBSb290Q29udGV4dDogQ29udGV4dCA9IHtcbiAgICB0eXBlOiBcIj9cIiBhcyBjb25zdCxcbiAgICBsb2NhbF9zeW1ib2xzOiB7XG4gICAgICAgIGludCAgOiBTVHlwZV90eXBlX2ludCxcbiAgICAgICAgc3RyICA6IFNUeXBlX3R5cGVfc3RyLFxuICAgICAgICBmbG9hdDogU1R5cGVfdHlwZV9mbG9hdCxcbiAgICAgICAgLi4uZ2VuVW5hcnlPcEZjdChcImxlblwiLCBTVHlwZV9pbnQpXG5cbiAgICAgICAgLy8gYWRkIGZ1bmN0aW9ucyBsaWtlIGxlbigpIC8gcG93KCkgLyBkaXZtb2QoKVxuICAgIH1cbn0gc2F0aXNmaWVzIENvbnRleHQ7XG4iLCIvLyBAdHMtbm9jaGVja1xuXG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGluZSAgOiBudW1iZXIsXG4gICAgbGluZV9vZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBub2RlcyA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuXG4gICAgbGV0IGN1cnNvciA9IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBsaW5lX29mZnNldCA6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNoYXI7XG4gICAgZG8ge1xuICAgICAgICBub2Rlcy5wdXNoKCBwYXJzZUV4cHJlc3Npb24oY29kZSwgY3Vyc29yKSBhcyBhbnkpO1xuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgd2hpbGUoIGNoYXIgPT09ICdcXG4nICkge1xuICAgICAgICAgICAgY2hhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgfSB3aGlsZSggY2hhciAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdC8vY29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlcyxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfY29udmVydCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN5bWJvbChjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnYScgJiYgY2FyIDw9ICd6JyB8fCBjYXIgPj0gJ0EnICYmIGNhciA8PSAnWicgfHwgY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIHx8IGNhciA9PSAnXycgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgY29uc3Qgc3ltYm9sID0gY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpO1xuXG4gICAgLy9UT0RPOiBpZiBrZXl3b3JkLi4uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJzeW1ib2xcIixcbiAgICAgICAgdmFsdWUgICA6IHN5bWJvbCwgLy9UT0RPOiBjZiBjb252ZXJ0IChzZWFyY2ggaW4gbG9jYWwgdmFyaWFibGVzL0NvbnRleHQuLi4pXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2NvbnZlcnRcbiAgICB9O1xufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX2ludCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU51bWJlcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgLy9UT0RPOiByZWFsLi4uXG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLmludFwiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19pbnQsXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX3N0ciBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnXCInICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgKytjdXJzb3Iub2Zmc2V0O1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLnN0cmluZ1wiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19zdHIsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGxldCBsZWZ0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIGlmKCBjaGFyID09PSAnXFxuJylcbiAgICAgICAgcmV0dXJuIGxlZnQ7XG5cbiAgICBsZXQgb3AgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgb3AhLmNoaWxkcmVuWzBdID0gbGVmdDtcbiAgICBvcC5weWNvZGUuc3RhcnQgPSBsZWZ0LnB5Y29kZS5zdGFydDtcblxuICAgIGxldCB2YWx1ZXMgPSBbb3AsIHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKV07XG5cbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciAhPT0gJ1xcbicgKSB7XG5cbiAgICAgICAgbGV0IG9wMiAgID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG5cbiAgICAgICAgbGV0IG9wMSAgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXTtcbiAgICAgICAgbGV0IGxlZnQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcblxuICAgICAgICAvL1RPRE86IGhhbmRsZSBvcCBwcmlvcml0eS4uLlxuICAgICAgICAvLyAoYStiKStjXG5cbiAgICAgICAgLy8gKGErYilcbiAgICAgICAgb3AxIS5jaGlsZHJlblsxXSA9IGxlZnQ7XG4gICAgICAgIG9wMSEucHljb2RlLmVuZCAgPSBsZWZ0LnB5Y29kZS5lbmQ7IFxuXG4gICAgICAgIC8vICgpK2NcbiAgICAgICAgb3AyIS5jaGlsZHJlblswXSA9IG9wMTtcbiAgICAgICAgb3AyLnB5Y29kZS5zdGFydCA9IG9wMS5weWNvZGUuc3RhcnQ7XG5cbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl0gPSBvcDI7XG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdID0gcmlnaHQ7XG5cbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgfVxuXG4gICAgdmFsdWVzWzBdIS5jaGlsZHJlblsxXSA9IHZhbHVlc1sxXTtcbiAgICB2YWx1ZXNbMF0hLnB5Y29kZS5lbmQgID0gdmFsdWVzWzFdLnB5Y29kZS5lbmQ7XG5cbiAgICByZXR1cm4gdmFsdWVzWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdG9yKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldCsrXTtcbiAgICAvKlxuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICcnICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdOyovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJvcGVyYXRvcnMuXCIgKyBjaGFyLFxuICAgICAgICB2YWx1ZSAgIDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IENPUkVfTU9EVUxFU1tcIm9wZXJhdG9ycy5cIiArIGNoYXJdLkFTVDJKUyxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgLy8gaWdub3JlIHdoaXRlc3BhY2VcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgPT09ICcgJyB8fCBjaGFyID09PSAnXFx0JyApXG4gICAgICAgIGNoYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgLy8gaWdub3JlIGNoYXJcbiAgICBpZiggY2hhciA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSBudWxsXG4gICAgaWYoIGNoYXIgPT09ICdcIicpXG4gICAgICAgIG5vZGUgPSBwYXJzZVN0cmluZyhjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ3onIHx8IGNoYXIgPj0gJ0EnICYmIGNoYXIgPD0gJ1onIHx8IGNoYXIgPT0gJ18nIClcbiAgICAgICAgbm9kZSA9IHBhcnNlU3ltYm9sKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIG5vZGUgPSBwYXJzZU51bWJlcihjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZSA9IHBhcnNlT3BlcmF0b3IoY29kZSwgY3Vyc29yKTtcbiAgICAgICAgLy87IHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hlbiBwYXJzaW5nICR7Y2hhcn0gYXQgJHtjdXJzb3IubGluZX06JHtjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0fSAoJHtjdXJzb3Iub2Zmc2V0fSlgKTtcblxuICAgIG5vZGUucHljb2RlID0ge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RPRE86IGlzIG5leHQgYW4gb3BlcmF0b3IgPyAtPiBjb25zdHJ1aXJlIGFyYnJlLi4uXG4gICAgLy9UT0RPIGhhbmRsZSBvcGVyYXRvcnMgP1xuXG4gICAgcmV0dXJuIG5vZGU7XG5cbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBfcl99IGZyb20gXCIuL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHtfYl99IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5leHBvcnQge19iXywgX3JffTtcblxuLy8gY2xhc3NlID9cblxuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIGJ1aWxkTW9kdWxlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coanNjb2RlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICB9XG5cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSB0aGlzLmJ1aWxkTW9kdWxlKGpzY29kZSwgYXN0KSh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHdyaXRlPzogKHRoaXM6IEFTVE5vZGUpID0+IHZvaWQ7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGwsIF92YWx1ZTogYW55ID0gbnVsbCwgY2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdKSB7XG5cblx0XHR0aGlzLnR5cGUgICA9IHR5cGU7XG5cdFx0dGhpcy5yZXN1bHRfdHlwZSA9IHJlc3VsdF90eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2wgOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sIDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG5leHBvcnQgY29uc3QgQXNzaWduT3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19pcG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19pbXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19pdHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19faWZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19pbW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19faWFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19pc3ViX18nLFxuXG4gICAgJ19fb3JfXycgICAgIDogJ19faW9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX2lhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19faXhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19pbHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX2lyc2hpZnRfXycsXG59XG5cblxuZXhwb3J0IGNvbnN0IGpzb3AycHlvcCA9IHtcbiAgICAnKionOiAncG93JyxcbiAgICAnKicgOiAnbXVsJyxcbiAgICAnLycgOiAndHJ1ZWRpdicsXG4gICAgJy8vJzogJ2Zsb29yZGl2JyxcbiAgICAnJScgOiAnbW9kJyxcbiAgICBcbiAgICAnKycgIDogJ2FkZCcsXG4gICAgJy0nICA6ICdzdWInLFxuICAgICd1Li0nOiAnbmVnJyxcblxuICAgICc9PScgOiAnZXEnLFxuICAgICchPScgOiAnbmUnLFxuICAgICc8JyAgOiAnbHQnLFxuICAgICc8PScgOiAnbGUnLFxuICAgICc+PScgOiAnZ2UnLFxuICAgICc+JyAgOiAnZ3QnLFxuXG4gICAgJ34nIDogJ25vdCcsXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWychJywgJysrJywgJy0tJywgJ34nLCAndS4tJ10sXG4gICAgWycqKiddLCAvLyByaWdodCB0byBsZWZ0ICFcbiAgICBbJyonLCAnLycsICclJ10sIC8vIFB5dGhvbiBhbHNvIGhhcyAvL1xuICAgIFsnKycsICctJ10sXG4gICAgWyc8PCcsICc+PicsICc+Pj4nXSwgLy9UT0RPXG4gICAgWyc8JywgJzw9JywgJz49JywgJz4nXSxcbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJyYnXSwgIC8vVE9ET1xuICAgIFsnXiddLCAgLy9UT0RPXG4gICAgWyd8J10sICAvL1RPRE9cbiAgICBbJyYmJ10sIC8vVE9ET1xuICAgIFsnfHwnLCAnPz8nXSxcbiAgICBbJz0nXSAvKiBldCB0b3VzIGxlcyBkw6lyaXbDqXMgKi8gLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgLy8gZXRjLlxuXTtcblxuLypcbmh0dHBzOi8vZG9jcy5weXRob24ub3JnLzMvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNjYWxsYWJsZVxuXG4tPiBjbGFzc2VzXG5ib29sKClcbmZsb2F0KClcbmludCgpXG5zdHIoKVxuYnl0ZWFycmF5KCkgW1VpbnQ4QXJyYXldIChSVylcbmJ5dGVzKCkgICAgIFs/XSAgICAgICAgICAoUk8pIDwtIG5vIHR5cGVzIGluIEpTLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LSBVaW50OEFycmF5IHdpdGggZmxhZyA/IGZyZWV6ZSgpIFtKUyB1bnNhZmVdXG4gICAgICAgICAgICBiXCJlXFx4RkZcIiBpbnN0ZWFkIG9mIFsxMDEsMTAxXSwgZXRjLiAoMzIgPD0gYnl0IDw9IDEyNilcbnR5cGUoKVxubGlzdCgpICAgICAgW0FycmF5XVxudHVwbGUoKSAgICAgW09iamVjdC5mcm96ZW4oQXJyYXkpXVxuXG5zZXQoKSAgICAgICAvLyByZWxpZXMgb24gaGFzaCgpLi4uID0+IHNldFtsaXRlcmFsc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBzZXQoKSAvIDwtIEpTIHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgPT4gYnl0ZXMvYnl0ZWFycmF5L2V0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IFNldCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IEludGVybmFsIGtleXMoKSBzZXQgW3JlY29tcHV0ZSBoYXNoIHdoZW4gYWRkL3JlbW92ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbnRlcm5hbGx5IHN0b3JlZCBhcyBNYXAoaGFzaCwgdmFsdWUpICg/KVxuZnJvemVuc2V0KCkgICAgICAgICAgICA9PiBleHRlbmRzIHNldCB0byByZXBsYWNlIG1vZGlmaWVycy5cblxuZGljdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3N0cl0gYXMgT2JqZWN0LmNyZWF0ZShudWxsKSArIChhbmQgcHVyZSBKU09iaiBhcyBkaWN0W3N0cl0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBNYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IFNldChoYXNoKSAvIE1hcChoYXNoLCBrZXkpIC8gTWFwKGtleSwgaGFzaCkgPz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldC9zZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gTWFwKGtleSwgdmFsdWUpXG5cbm9iamVjdCgpXG5jb21wbGV4KClcbm1lbW9yeXZpZXcoKSAgICAgICAgICAgID0+IEFycmF5QnVmZmVyID9cblxuLT4gcHJpbnRcbmFzY2lpKClcbmJpbigpXG5oZXgoKVxub2N0KClcbnJlcHIoKVxuaGFzaCgpXG5cbi0+IG1hdGhzXG5hYnMoKVxuZGl2bW9kKClcbnBvdygpXG5yb3VuZCgpXG5cbi0+IGxpc3RzXG5hbGwoKVxuYW55KClcbmZpbHRlcigpXG5tYXAoKVxubWF4KClcbm1pbigpXG5zdW0oKVxubGVuKClcbmVudW1lcmF0ZSgpXG5yZXZlcnNlZCgpXG5zbGljZSgpXG5zb3J0ZWQoKVxuemlwKClcblxuLT4gaXRlclxucmFuZ2UoKVxuYWl0ZXIoKVxuaXRlcigpXG5hbmV4dCgpXG5uZXh0KClcblxuLT4gc3RyXG5vcmQoKVxuY2hyKClcbmZvcm1hdCgpXG5wcmludCgpXG5mXCJcIlxuXG5jYWxsYWJsZSgpXG5jbGFzc21ldGhvZCgpXG5zdGF0aWNtZXRob2QoKVxucHJvcGVydHkoKVxuc3VwZXIoKVxuaXNpbnN0YW5jZSgpXG5pc3N1YmNsYXNzKClcbmRlbGF0dHIoKVxuZ2V0YXR0cigpXG5oYXNhdHRyKClcbnNldGF0dHIoKVxuZGlyKClcblxuZXZhbCgpXG5leGVjKClcbmNvbXBpbGUoKVxuYnJlYWtwb2ludCgpXG5cbmdsb2JhbHMoKVxubG9jYWxzKClcbnZhcnMoKVxuX19pbXBvcnRfXygpXG5cbmlkKClcbiAgICAtPiBvbi1kZW1hbmQgd2Vha3JlZiA/XG5cbmhlbHAoKVxuaW5wdXQoKVxub3BlbigpXG5cbiovXG5cbi8qXG51bmFyeVxuLSBwb3MgKHVuYXJ5ICspXG5cbi0gYm9vbFxuLSBmbG9hdFxuLSBpbnRcbi0gc3RyXG4tIHJlcHJcblxuLSBhYnNcbi0gY2VpbFxuLSBmbG9vclxuLSByb3VuZFxuLSB0cnVuY1xuXG5iaW5hcnlcbi0gcG93L3Jwb3dcbi0gZGl2bW9kL3JkaXZtb2RcblxuY2xhc3Ncbi0gY2xhc3Ncbi0gbmV3XG4tIGluaXRcbi0gaW5pdF9zdWJjbGFzc1xuXG4tIHN1YmNsYXNzaG9vayAvLyBfX2lzaW5zdGFuY2VjaGVja19fIFxuXG4tIGRpclxuLSBkZWxhdHRyXG4tIHNldGF0dHJcbi0gZ2V0YXR0cmlidXRlXG5cbi0gZG9jXG4tIGZvcm1hdFxuLSBnZXRuZXdhcmdzXG4tIGhhc2hcbi0gaW5kZXggKD8pXG4tIHNpemVvZlxuKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gSW50Mk51bWJlcihhOiBBU1ROb2RlLCB0YXJnZXQgPSBcImZsb2F0XCIpIHtcblxuICAgIGlmKCBhLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX211bF9fJyB8fCBhLnZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gYS5jaGlsZHJlblsxXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgaWYoICAgIChsdHlwZSA9PT0gU1R5cGVfaW50IHx8IGx0eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICYmIChydHlwZSA9PT0gU1R5cGVfaW50IHx8IHJ0eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX25lZ19fJyAmJiBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCB0YXJnZXQgPT09IFwiZmxvYXRcIiApXG4gICAgICAgIHJldHVybiByYE51bWJlcigke2F9KWA7XG5cbiAgICAvLyBpbnQgLT4ganNpbnQgY2FzdCBpcyBmYWN1bHRhdGl2ZS4uLlxuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTnVtYmVyMkludChhOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSAnaW50JztcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IFwiaW50XCI7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gSlNPcGVyYXRvcnMubGVuZ3RoIC0gaTtcbiAgICBmb3IobGV0IG9wIG9mIEpTT3BlcmF0b3JzW2ldKVxuICAgICAgICBKU09wZXJhdG9yc1ByaW9yaXR5W29wXSA9IHByaW9yaXR5O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlZF9vcGVyYXRvcjxUIGV4dGVuZHMga2V5b2YgdHlwZW9mIEJpbmFyeU9wZXJhdG9ycz4ob3A6IFQpIHtcbiAgICByZXR1cm4gQmluYXJ5T3BlcmF0b3JzW29wXTtcbn1cblxuY29uc3QgTEVGVCAgPSAxO1xuY29uc3QgUklHSFQgPSAyO1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCAuLi52YWx1ZXM6IEFTVE5vZGVbXSkge1xuXG4gICAgY29uc3QgZmlyc3QgPSB2YWx1ZXNbMF07XG4gICAgaWYoZmlyc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVHxSSUdIVDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICBpZihsYXN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2ZpcnN0fWA7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGg7ICsraSlcbiAgICAgICAgcmVzdWx0ID0gcmAke3Jlc3VsdH0gJiYgJHt2YWx1ZXNbaV19YDtcblxuICAgIGlmKCBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZF9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpIHtcbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgIH1cblxuICAgIHJldHVybiByYCR7YX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZXxhbnksIG9wOiBzdHJpbmcsIGI6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgaWYoYiBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGIgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGIgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHthfSR7b3B9JHtifWA7XG5cbiAgICBpZiggY2hlY2tfcHJpb3JpdHkgJiYgXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB1bmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIGE6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGxldCByZXN1bHQgPSByYCR7b3B9JHthfWA7XG5cbiAgICBpZihvcCA9PT0gJy0nKVxuICAgICAgICBvcCA9ICd1Li0nO1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG5cbiAgICBpZiggY2hlY2tfcHJpb3JpdHkgJiYgXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggKGRpcmVjdGlvbiAmIExFRlQpICYmIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxudHlwZSBHZW5VbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfc2VsZiAgID86IChzOiBhbnkpID0+IGFueSxcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMocmV0X3R5cGUgIDogU1R5cGVPYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzICAgICAgIDogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSAoYSkgPT4gYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuVW5hcnlPcHNfT3B0cyA9IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiByZXRfdHlwZTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJ3UuLScpXG4gICAgICAgICAgICBvcCA9ICctJztcblxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwgPz89IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5CaW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X290aGVyICAgPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIChub2RlOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyAgICA9IG5vZGUucmVzdWx0X3R5cGUhLl9fbmFtZV9fO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb252ZXJ0W3NyY107XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IGltcHJvdmU6XG4gICAgICAgIGlmKCBzcmMgPT09IFwiaW50XCIpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBcImludFwiIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufVxuXG5jb25zdCBpZEZjdCA9IDxUPihhOiBUKSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKHJldF90eXBlOiBTVHlwZU9iaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IFNUeXBlT2JqW10sIFxuICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBpZEZjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuQmluYXJ5T3BzX09wdHMgPSB7fSkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyByZXRfdHlwZSA6IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IGlkRmN0ICYmIHN1YnN0aXR1dGVfY2FsbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5DbXBPcHMoICBvcHMgICAgICAgOiByZWFkb25seSAoa2V5b2YgdHlwZW9mIHJldmVyc2UpW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdHlwZTogcmVhZG9ubHkgU1R5cGVPYmpbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBpZEZjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9ICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyBTVHlwZV9ib29sIDogU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY29wID0gb3A7XG5cbiAgICAgICAgICAgIGxldCBhID0gY29udmVydF9zZWxmKHNlbGYpO1xuICAgICAgICAgICAgbGV0IGIgPSBjb252X290aGVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCByZXZlcnNlZCApIHtcbiAgICAgICAgICAgICAgICBbYSxiXcKgPSBbYixhXTtcbiAgICAgICAgICAgICAgICBjb3AgPSByZXZlcnNlW2NvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBjb3BbMF0gPT09ICc9JyB8fCBjb3BbMF0gPT09ICchJyApIHtcbiAgICAgICAgICAgICAgICBpZiggc2VsZi5yZXN1bHRfdHlwZSA9PT0gb3RoZXIucmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIGNvcCA9IGNvcCArICc9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsIGNvcCwgYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252X290aGVyKG8pICk7IC8vVE9ETy4uLlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludCc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZSc7IiwiaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG5jb25zdCBfbmFtZTJTVHlwZTogUmVjb3JkPHN0cmluZyxTVHlwZU9iaj4gPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1R5cGU8VCBleHRlbmRzIFNUeXBlT2JqPihuYW1lOiBzdHJpbmcpOiBUIHtcbiAgICByZXR1cm4gKF9uYW1lMlNUeXBlW25hbWVdID8/PSB7X19uYW1lX186IG5hbWV9KSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU1R5cGUobmFtZTogc3RyaW5nLCB0eXBlOiBPbWl0PFNUeXBlT2JqLCAnX19uYW1lX18nPikge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBnZXRTVHlwZShuYW1lKSwgdHlwZSApO1xufVxuXG5leHBvcnQgY29uc3QgU1R5cGVfaW50ICAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJpbnRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfanNpbnQgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJqc2ludFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9mbG9hdCAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImZsb2F0XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2Jvb2wgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiYm9vbFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9zdHIgICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcInN0clwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9Ob25lVHlwZSAgICAgICAgICAgPSBnZXRTVHlwZShcIk5vbmVUeXBlXCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSA9IGdldFNUeXBlKFwiTm90SW1wbGVtZW50ZWRUeXBlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuLy8gZGVjbGFyZSBhbGwgYnVpbHRpbiB0eXBlcy4uLlxuaW1wb3J0ICcuL3N0cnVjdHMvU1R5cGVCdWlsdGluJztcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiY3Vyc29yIiwibGluZSIsImxpbmVfb2Zmc2V0IiwianNjb2RlIiwianNjb2RlX2N1cnNvciIsImNvbCIsImxlbmd0aCIsIm5ld19qc2NvZGUiLCJmaWxlbmFtZSIsImluZGVudCIsImN1cl9pbmRlbnRfbGV2ZWwiLCJjdXJfaW5kZW50IiwiTkwiLCJ0b1N0cmluZyIsIkJCIiwiQkUiLCJzbGljZSIsInIiLCJhcmdzIiwid3IiLCJ3Iiwid3QiLCJzdHIiLCJpIiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwic3RhcnQiLCJ3cml0ZSIsImVuZCIsImFzdDJqcyIsImFzdCIsImJvZHkiLCJjaGlsZHJlbiIsImNvbnZlcnRfbm9kZSIsImxpc3QyYXN0bm9kZSIsImNvbnZlcnQiLCJub2RlIiwiY29udGV4dCIsImxpbmVzIiwidHlwZSIsIm1ldGEiLCJyZXN1bHRfdHlwZSIsIl9fY2FsbF9fIiwiZ2VuZXJhdGUiLCJyZXR1cm5fdHlwZSIsImJyeXRob25fbmFtZSIsImJhc2UiLCJ2YWx1ZSIsIkNvbnRleHQiLCJsb2NhbF9zeW1ib2xzIiwibmFtZSIsIl9fbmFtZV9fIiwiYmFzZXMiLCJFcnJvciIsIl9jb250ZXh0IiwiTnVtYmVyMkludCIsImlkeCIsImJlZyIsImluY3IiLCJsaXN0IiwiU1R5cGVfaW50IiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwidGVzdCIsImN1ciIsIm9yZWxzZSIsInB1c2giLCJjb25kIiwiaWZfdHJ1ZSIsImlmX2ZhbHNlIiwiYm9keV90cnVlIiwiYm9keV9mYWxzZSIsImhhbmRsZXJzIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJlIiwiaW5jbHVkZXMiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwibm9kZXMiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInNiIiwiZ2V0QVNURm9yIiwic3RhY2syYXN0bm9kZXMiLCJwYXJzZV9zdGFjayIsInNwbGl0IiwiaXNWOCIsImwiLCJfIiwiX2xpbmUiLCJfY29sIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJweWNvZGUiLCJleGNlcHRpb25fc3RyIiwiam9pbiIsImxvZyIsImdldF9weV9leGNlcHRpb24iLCJfX1NCUllUSE9OX18iLCJfZXJyXyIsIl9iXyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIl9yXyIsIkpTRXhjZXB0aW9uIiwiYmluYXJ5X2pzb3AiLCJfYXJncyIsIlNUeXBlX2ZjdCIsImt3X3N0YXJ0IiwiaWR4X2VuZF9wb3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImlkeF92YXJhcmciLCJrd2FyZ3MiLCJsYXN0Iiwid3JpdGVfYXJnIiwiY29udmVydF9hcmdzIiwiaGFzX3ZhcmFyZyIsInZhcmFyZyIsImhhc19rd2FyZyIsImt3YXJnIiwiYXJnc19wb3MiLCJhcmdzX25hbWVzIiwidG90YWxfYXJncyIsInBvc29ubHlhcmdzIiwia3dvbmx5YXJncyIsInBvc19kZWZhdWx0cyIsImRlZmF1bHRzIiwicG9zb25seSIsImRvZmZzZXQiLCJjb252ZXJ0X2FyZyIsIm9mZnNldCIsIm5iX3Bvc19kZWZhdWx0cyIsIk1hdGgiLCJtaW4iLCJoYXNfb3RoZXJzIiwiY3V0X29mZiIsImt3b25seSIsImt3X2RlZmF1bHRzIiwiaGFzX2t3IiwidmlydF9ub2RlIiwibGluZW5vIiwiY29sX29mZnNldCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsImFzdG5vZGUiLCJkZWZ2YWwiLCJhbm5vdGF0aW9uIiwiY2hpbGQiLCJwcmludF9vYmoiLCJvYmoiLCJrZXlzIiwiT2JqZWN0IiwidmFsdWVzIiwiZGF0YSIsInNlcCIsImRlZmF1bHRfY2FsbCIsImt3X3BvcyIsIm5iX3BvcyIsIm1heCIsInBvc19zaXplIiwia3ciLCJjdXRvZmYiLCJoYXNfa3dhcmdzIiwic3Vic3RpdHV0ZV9jYWxsIiwiZmN0X3R5cGUiLCJyZXRfdHlwZSIsImtleXdvcmRzIiwiZ2V0U1R5cGUiLCJzdHlwZSIsInBhcmVudF9ub2RlX2NvbnRleHQiLCJyZXR1cm5zIiwiZmN0X3JldHVybl90eXBlIiwibGFzdF90eXBlIiwiZmFrZV9ub2RlIiwiYXNzZXJ0IiwiYXNuYW1lIiwibW9kdWxlIiwibmFtZXMiLCJleGMiLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJSVU5USU1FXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIkFTVF9DT05WRVJUXzE0IiwiQVNUMkpTXzE0IiwiQVNUX0NPTlZFUlRfMTUiLCJBU1QySlNfMTUiLCJBU1RfQ09OVkVSVF8xNiIsIkFTVDJKU18xNiIsIlJVTlRJTUVfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiUlVOVElNRV8yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIkFTVF9DT05WRVJUXzI1IiwiQVNUMkpTXzI1IiwiQVNUX0NPTlZFUlRfMjYiLCJBU1QySlNfMjYiLCJSVU5USU1FXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIkFTVF9DT05WRVJUXzI5IiwiQVNUMkpTXzI5IiwiQVNUX0NPTlZFUlRfMzAiLCJBU1QySlNfMzAiLCJBU1RfQ09OVkVSVF8zMSIsIkFTVDJKU18zMSIsIkFTVF9DT05WRVJUXzMyIiwiQVNUMkpTXzMyIiwiUlVOVElNRV8zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIkFTVF9DT05WRVJUXzM2IiwiQVNUMkpTXzM2IiwiQVNUX0NPTlZFUlRfMzciLCJBU1QySlNfMzciLCJBU1RfQ09OVkVSVF8zOCIsIkFTVDJKU18zOCIsIkFTVF9DT05WRVJUXzM5IiwiQVNUMkpTXzM5IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiUlVOVElNRSIsImFzc2lnbiIsIlNUeXBlX05vbmVUeXBlIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiYWRkU1R5cGUiLCJTVHlwZV9ib29sIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJTVHlwZV9mbG9hdCIsIlNUeXBlX2pzaW50IiwiU1R5cGVfc3RyIiwiZmxvYXQyc3RyIiwiZiIsInRvRXhwb25lbnRpYWwiLCJzaWduX2lkeCIsImdlbkJpbmFyeU9wcyIsImdlblVuYXJ5T3BzIiwiSW50Mk51bWJlciIsIlNUeXBlX3R5cGVfZmxvYXQiLCJvdGhlciIsIm90aGVyX3R5cGUiLCJtZXRob2QiLCJfX2ludF9fIiwiX19zdHJfXyIsImNvbnZlcnRfb3RoZXIiLCJzZWxmIiwic3VmZml4IiwiYXMiLCJyZWFsX3R5cGUiLCJpZF9qc29wIiwidW5hcnlfanNvcCIsIlNUeXBlX3R5cGVfaW50IiwiYSIsImIiLCJvcHRpIiwiY29udmVydF9zZWxmIiwicyIsIlNUeXBlX3R5cGVfc3RyIiwiX19sZW5fXyIsImVuZHNXaXRoIiwicmlnaHRfbm9kZSIsInJjaGlsZCIsInJpZ2h0IiwicmlnaHRfdHlwZSIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJsZWZ0IiwibGVmdF90eXBlIiwiQXNzaWduT3BlcmF0b3JzIiwiU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIiwib3AiLCJibmFtZTJweW5hbWUiLCJhdHRyIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJmbG9vcmRpdl9mbG9hdCIsImZsb29yIiwiZmxvb3JkaXZfaW50IiwicmVzdWx0IiwibW9kX2Zsb2F0IiwibW9kIiwibW9kX2ludCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJydHlwZSIsImx0eXBlIiwianNvcCIsIm9wcyIsInJpZ2h0cyIsImNvbXBhcmF0b3JzIiwib3BlcmFuZCIsImV4cHIiLCJlbHRzIiwiaXNDbGFzcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJwcm90b3R5cGUiLCJ3cml0YWJsZSIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiZ2V0Tm9kZVR5cGUiLCJicnl0aG9uX25vZGUiLCJlcnJvciIsInBhcmVudF9jb250ZXh0IiwiUm9vdENvbnRleHQiLCJ0eXBlX2ZjdCIsImdlblVuYXJ5T3BGY3QiLCJvcG5hbWUiLCJjYWxsIiwiaW50IiwiZmxvYXQiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsInRvSlMiLCJhc3QyanNfbGl0ZXJhbHNfaW50IiwicGFyc2VOdW1iZXIiLCJhc3QyanNfbGl0ZXJhbHNfc3RyIiwicGFyc2VTdHJpbmciLCJwYXJzZVRva2VuIiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiZXhwb3J0ZWQiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJKU09wZXJhdG9yc1ByaW9yaXR5IiwicHJpb3JpdHkiLCJMRUZUIiwiUklHSFQiLCJmaXJzdCIsInBhcmVudF9vcCIsInBhcmVudF9vcF9kaXIiLCJkaXJlY3Rpb24iLCJjdXJfcHJpb3JpdHkiLCJwYXJlbnRfcHJpb3JpdHkiLCJjaGVja19wcmlvcml0eSIsIm8iLCJweW9wIiwiZ2VuZXJhdGVDb252ZXJ0Iiwic3JjIiwiaWRGY3QiLCJjb252X290aGVyIiwiY3MiLCJyY3MiLCJyZXZlcnNlIiwiY29wIiwiX25hbWUyU1R5cGUiLCJweTJhc3RfZmFzdCJdLCJzb3VyY2VSb290IjoiIn0=