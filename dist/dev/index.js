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
        // @ts-ignore
        arg.jscode = {
            start: {
                line: cursor.line,
                col: jscode.length - cursor.line_offset
            }
        };
        arg.write();
        arg.jscode.end = {
            line: cursor.line,
            col: jscode.length - cursor.line_offset
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
        []
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





function convert(node, context) {
    //const isMethod = context.type === "class";
    let fct_return_type = null;
    const SType_fct = {
        __name__: "function",
        __call__: {
            args_names: new Array(node.args.args.length + node.args.posonlyargs.length),
            args_pos: {},
            idx_end_pos: -1,
            idx_vararg: -1,
            has_kw: false,
            return_type: ()=>fct_return_type,
            substitute_call: _call_ast2js__WEBPACK_IMPORTED_MODULE_3__.default_call
        }
    };
    //if( ! isMethod ) {
    // if method add to self_context.symbols ?
    context.local_symbols[node.name] = SType_fct;
    //}
    const last_type = node.body[node.body.length - 1].constructor.$name;
    const impl_return = last_type !== "Return" && last_type !== "Raise";
    const annotation = node.returns?.id;
    if (annotation !== undefined) fct_return_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.getSType)(annotation);
    else if (impl_return) fct_return_type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NoneType;
    // new context for the function local variables
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    // fake the node...
    const args = (0,_args_astconvert__WEBPACK_IMPORTED_MODULE_4__.convert_args)(node, SType_fct, context);
    for (let arg of args.children)context.local_symbols[arg.value] = arg.result_type;
    const body = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.body, context);
    if (impl_return) {
        const fake_node = {
            constructor: {
                $name: "Return"
            },
            lineno: node.end_lineno,
            end_lineno: node.end_lineno,
            col_offset: node.end_col_offset,
            end_col_offset: node.end_col_offset
        };
        body.children.push((0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(fake_node, context));
    }
    // recursive.
    if (fct_return_type === null) {
        //TODO: loop, if, try
        let ret = body.children.filter((n)=>n.type === "keywords.return");
        fct_return_type = ret[0].result_type;
    }
    let type = "functions.def";
    //if(isMethod)
    //    type += "(meth)";
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, null, node.name, [
        args,
        body
    ]);
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
    if (node.value === undefined) return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.return", structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NoneType, null);
    const expr = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.return", expr.result_type, null, [
        expr
    ]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RXRHLFNBQVN6SSxPQUFPTztBQUMxQztBQUVPLE1BQU1JLFlBQTJCOEgsU0FBUyxPQUFPO0FBQ2pELE1BQU04RyxjQUEyQjlHLFNBQVMsU0FBUztBQUNuRCxNQUFNNkcsY0FBMkI3RyxTQUFTLFNBQVM7QUFDbkQsTUFBTTBHLGFBQTJCMUcsU0FBUyxRQUFRO0FBQ2xELE1BQU0rRyxZQUEyQi9HLFNBQVMsT0FBTztBQUNqRCxNQUFNQyxpQkFBMkJELFNBQVMsWUFBWTtBQUN0RCxNQUFNc0osMkJBQTJCdEosU0FBUyxzQkFBc0I7Ozs7Ozs7U0NsQnZFO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFN0MsK0JBQStCO0FBQ0M7QUFFNEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2JvZHkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib2R5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVCdWlsdGluLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuY29uc3QgY3Vyc29yOiB7IGxpbmU6IG51bWJlciwgbGluZV9vZmZzZXQ6IG51bWJlcn0gPSB7XG4gICAgbGluZSAgICAgICA6IDAsXG4gICAgbGluZV9vZmZzZXQ6IDBcbn07XG5sZXQganNjb2RlOiBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc2NvZGVfY3Vyc29yKCk6IENvZGVQb3Mge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBqc2NvZGUubGVuZ3RoIC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfVxufVxuXG5mdW5jdGlvbiBuZXdfanNjb2RlKGZpbGVuYW1lOiBzdHJpbmcpIHtcblxuICAgIGpzY29kZSAgPSBgLy8jIHNvdXJjZVVSTD0ke2ZpbGVuYW1lfVxcbmA7XG4gICAganNjb2RlICs9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG5cbiAgICBjdXJzb3IubGluZSA9IDM7XG4gICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0ganNjb2RlLmxlbmd0aDtcbn1cblxudHlwZSBQcmludGFibGUgPSB7dG9TdHJpbmcoKTogc3RyaW5nfTtcblxubGV0IGluZGVudCA9IFwiICAgIFwiO1xubGV0IGN1cl9pbmRlbnRfbGV2ZWwgPSAtMTtcbmxldCBjdXJfaW5kZW50ID0gXCJcIjtcblxuZXhwb3J0IGNvbnN0IE5MID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcblxuICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBqc2NvZGUubGVuZ3RoICsgMTtcblxuICAgICAgICByZXR1cm4gXCJcXG5cIiArIGN1cl9pbmRlbnQ7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEJCID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoICsrY3VyX2luZGVudF9sZXZlbCA+IDApXG4gICAgICAgICAgICBjdXJfaW5kZW50ICs9IGluZGVudDtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEJFID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLS1jdXJfaW5kZW50X2xldmVsO1xuICAgICAgICBjdXJfaW5kZW50ID0gY3VyX2luZGVudC5zbGljZSgwLC00KTtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByKC4uLmFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxBU1ROb2RlKVtdXSkge1xuICAgIHJldHVybiBhcmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3IoYXJnczogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi4oUHJpbnRhYmxlfEFTVE5vZGUpW11dKSB7XG4gICAgaWYoIHR5cGVvZiBhcmdzID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gdyhhcmdzKTtcbiAgICByZXR1cm4gd3QoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOiAoUHJpbnRhYmxlfEFTVE5vZGUpW10pIHtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBqc2NvZGUgKz0gc3RyW2ldO1xuICAgICAgICB3KGFyZ3NbaV0pO1xuICAgIH1cblxuICAgIGpzY29kZSArPSBzdHJbYXJncy5sZW5ndGhdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdyguLi5hcmdzOiAoUHJpbnRhYmxlfEFTVE5vZGUpW10pIHtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgbGV0IGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoYXJnKSApIHsgLy8gbGlrZWx5IGEgcmBgXG4gICAgICAgICAgICB3cihhcmcgYXMgYW55KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoICEgKGFyZyBpbnN0YW5jZW9mIEFTVE5vZGUpICkge1xuXG4gICAgICAgICAgICBpZiggYXJnID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIGFyZyA9IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICBpZiggYXJnID09PSBudWxsIClcbiAgICAgICAgICAgICAgICBhcmcgPSBcIm51bGxcIjtcblxuICAgICAgICAgICAganNjb2RlICs9IGFyZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGFyZy5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgICAgIGNvbCA6IGpzY29kZS5sZW5ndGggLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhcmcud3JpdGUhKCk7XG5cbiAgICAgICAgYXJnLmpzY29kZSEuZW5kID0ge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBqc2NvZGUubGVuZ3RoIC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1QpIHtcblxuICAgIG5ld19qc2NvZGUoYXN0LmZpbGVuYW1lKTtcblxuICAgIHcoYXN0LmJvZHkpO1xuXG4gICAgLy8gVE9ETzogYmV0dGVyIGV4cG9ydCBzdHJhdGVneSAoPylcbiAgICBqc2NvZGUgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHt9O1xcbmA7XG5cbiAgICAvKipcbiAgICBjb25zdCBsaW5lcyA9IGFzdC5ib2R5LmNoaWxkcmVuO1xuICAgIGNvbnN0IGV4cG9ydGVkID0gbmV3IEFycmF5KGxpbmVzLmxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBsaW5lc1tpXS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgZXhwb3J0ZWRbaV0gPSBsaW5lc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgZXhwb3J0ZWQubGVuZ3RoID0gb2Zmc2V0O1xuXG4gICAganNjb2RlICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcbiAgICAvKiovXG5cblx0cmV0dXJuIGpzY29kZTtcbn0iLCJpbXBvcnQgeyBCQiwgQkUsIE5MLCB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoQkIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoTkwsIHRoaXMuY2hpbGRyZW5baV0pO1xuXG4gICAgdyhCRSk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlLCBsaXN0MmFzdG5vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBuZXcgQXJyYXkobm9kZS5sZW5ndGgpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyArK2kpXG4gICAgICAgIGxpbmVzW2ldID0gY29udmVydF9ub2RlKG5vZGVbaV0sIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKGxpc3QyYXN0bm9kZShub2RlKSwgXCJib2R5XCIsIG51bGwsIG51bGwsIGxpbmVzKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJvZHlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgbGV0IGJvZHkgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgfVxuXG4gICAgd3RgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0geyR7Ym9keX0ke05MfX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgX19uYW1lX186IG5vZGUubmFtZSxcbiAgICAgICAgLy9UT0RPIF9fY2FsbF9fXG4gICAgfVxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXVxuICAgICAgICA6IFtjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgaWR4ICA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV07XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGV8YW55ICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlfGFueSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IE51bWJlcjJJbnQodGhpcy5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICBlbmQgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gTnVtYmVyMkludCh0aGlzLmNoaWxkcmVuWzJdKTtcblxuICAgICAgICByZXR1cm4gd3RgZm9yKHZhciAke2lkeH0gPSAke2JlZ307ICR7aWR4fSA8ICR7ZW5kfTsgJHtpZHh9ICs9ICR7aW5jcn0peyR7Ym9keX0ke05MfX1gO1xuICAgIH1cblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgd3RgZm9yKHZhciAke2lkeH0gb2YgJHtsaXN0fSl7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICAvLyBUT0RPOiBqc2ludCBvcHRpIGlmIHRoaXMudmFsdWUgbm90IHVzZWQuLi5cbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUudmFsdWVdID0gU1R5cGVfaW50O1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgICAgIF0pO1xuXG4gICAgfVxuXG4gICAgLy9UT0RPOiBnZXQgdHlwZS4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIC8vIGlmXG4gICAgd3RgaWYoJHt0aGlzLmNoaWxkcmVuWzBdfSl7JHt0aGlzLmNoaWxkcmVuWzFdfSR7Tkx9fWA7XG5cbiAgICAvLyBlbHNlIGlmXG4gICAgbGV0IGk7XG4gICAgZm9yKGkgPSAyOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICAgICAgd3RgZWxzZSBpZigke3RoaXMuY2hpbGRyZW5baV19KXske3RoaXMuY2hpbGRyZW5baSsxXX0ke05MfX1gO1xuICAgIH1cblxuICAgIC8vIGVsc2VcbiAgICBpZiggaSA9PT0gdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxIClcbiAgICAgICAgd3RgZWxzZSB7JHt0aGlzLmNoaWxkcmVuW2ldfSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGlmXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF07XG5cbiAgICAvLyBlbHNlIGlmXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgY29udmVydF9ub2RlKGN1ci50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShjdXIuYm9keSwgY29udGV4dClcbiAgICAgICAgKVxuICAgIH1cbiAgICAvLyBlbHNlXG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwIClcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY29udmVydF9ub2RlKGN1ci5vcmVsc2UsIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbmQgICAgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBjb25zdCBpZl90cnVlICA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgY29uc3QgaWZfZmFsc2UgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgd3RgKCR7Y29uZH0gPyAke2lmX3RydWV9IDogJHtpZl9mYWxzZX0pYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY29uZCAgICAgICA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgIGNvbnN0IGJvZHlfdHJ1ZSAgPSBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KTtcbiAgICBjb25zdCBib2R5X2ZhbHNlID0gY29udmVydF9ub2RlKG5vZGUub3JlbHNlLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50ZXJuYXJ5XCIsIGJvZHlfdHJ1ZS5yZXN1bHRfdHlwZSwgbnVsbCwgW1xuICAgICAgICBjb25kLFxuICAgICAgICBib2R5X3RydWUsXG4gICAgICAgIGJvZHlfZmFsc2VcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmRXhwXCI7IiwiaW1wb3J0IHsgQkIsIEJFLCBOTCwgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgd3RgdHJ5IHske3RoaXMuY2hpbGRyZW5bMF19JHtOTH19YDtcbiAgICB3dGBjYXRjaChfcmF3X2Vycl8peyR7QkJ9JHtOTH1gO1xuXG4gICAgICAgIHcoXCJjb25zdCBfZXJyXyA9IF9iXy5nZXRfcHlfZXhjZXB0aW9uKF9yYXdfZXJyXywgX19TQlJZVEhPTl9fKVwiKTtcblxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAxKVxuICAgICAgICAgICAgdyggdGhpcy5jaGlsZHJlblsxXSApO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDI7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgdyhOTCwgXCJlbHNlIFwiLCB0aGlzLmNoaWxkcmVuW2ldICk7XG5cbiAgICAgICAgLy8gbm90IGEgY2F0Y2ggYWxsLi4uXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdLmNoaWxkcmVuLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgICAgIHcoTkwsIFwiZWxzZSB7IHRocm93IF9yYXdfZXJyXyB9XCIpO1xuXG4gICAgdyhCRSwgTkwpO1xuXG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gbmV3IEFycmF5PEFTVE5vZGU+KG5vZGUuaGFuZGxlcnMubGVuZ3RoKzEpO1xuXG4gICAgLy8gdHJ5IGJvZHlcbiAgICBjaGlsZHJlblswXSA9IGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuaGFuZGxlcnM7ICsraSlcbiAgICAgICAgY2hpbGRyZW5baSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLmhhbmRsZXJzW2ldLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgLy8gZWxzZSBpcyBoYW5kbGVkIGJ5IHRyeWJsb2NrXG5cbiAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIHd0YHske3RoaXMuY2hpbGRyZW5bMF19LCR7Tkx9fWA7XG5cbiAgICB3dGBpZigke3RoaXMuY2hpbGRyZW5bMF19KXske3RoaXMuY2hpbGRyZW5bMV19JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuO1xuICAgIGlmKCBub2RlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGlsZHJlbiA9IFtjb252ZXJ0X25vZGUobm9kZS50eXBlLCBjb250ZXh0KSwgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCldXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRyZW4gPSBbIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hgLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG4vL1RPRE86IHVzZSB+PXNvdXJjZW1hcC4uLlxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogQVNUTm9kZVtdLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxBU1ROb2RlIHtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0LmJvZHkuY2hpbGRyZW4sIHN0YWNrbGluZVsxXSwgc3RhY2tsaW5lWzJdKSE7XG59XG5cbmV4cG9ydCB0eXBlIFN0YWNrTGluZSA9IFtzdHJpbmcsIG51bWJlciwgbnVtYmVyXTtcblxuLy9UT0RPOiBjb252ZXJ0XG5leHBvcnQgZnVuY3Rpb24gc3RhY2syYXN0bm9kZXMoc3RhY2s6IFN0YWNrTGluZVtdLCBzYjogU0JyeXRob24pOiBBU1ROb2RlW10ge1xuICByZXR1cm4gc3RhY2subWFwKCBlID0+IHN0YWNrbGluZTJhc3Rub2RlKGUsIHNiKSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgc2I6IFNCcnl0aG9uKTogU3RhY2tMaW5lW10ge1xuXG5cbiAgXG4gICAgc3RhY2sgPSBzdGFjay5zcGxpdChcIlxcblwiKTtcblxuICAgIGNvbnN0IGlzVjggPSBzdGFja1swXT09PSBcIkVycm9yXCI7IFxuXG4gICAgcmV0dXJuIGZpbHRlcl9zdGFjayhzdGFjaykubWFwKCBsID0+IHtcblxuICAgICAgbGV0IFtfLCBfbGluZSwgX2NvbF0gPSBsLnNwbGl0KCc6Jyk7XG4gIFxuICAgICAgaWYoIF9jb2xbX2NvbC5sZW5ndGgtMV0gPT09ICcpJykgLy8gVjhcbiAgICAgICAgX2NvbCA9IF9jb2wuc2xpY2UoMCwtMSk7XG4gIFxuICAgICAgbGV0IGxpbmUgPSArX2xpbmUgLSAyO1xuICAgICAgbGV0IGNvbCAgPSArX2NvbDtcblxuICAgICAgLS1jb2w7IC8vc3RhcnRzIGF0IDEuXG5cbiAgICAgIGxldCBmY3RfbmFtZSE6IHN0cmluZztcbiAgICAgIGlmKCBpc1Y4ICkge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKFwiIFwiLCA3KTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDcsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJldmFsXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG5cbiAgICAgICAgLy9UT0RPOiBleHRyYWN0IGZpbGVuYW1lLlxuICAgICAgICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ib2R5LmNoaWxkcmVuLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmZ1bmN0aW9uIGdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfOiBhbnksIF9fU0JSWVRIT05fXzogYW55KSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcbiAgICAgICAgICAgICAgPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIDogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1xuXG4gIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKTtcbiAgXG4gIHJldHVybiBfZXJyXztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvbixcbiAgICBnZXRfcHlfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBjb25kID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIHd0YHdoaWxlKCR7Y29uZH0peyR7Ym9keX0ke05MfX19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IGpzY29kZV9jdXJzb3IsIHcsIHdyLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3QgYXJncyAgICAgID0gdGhpcztcbiAgICBjb25zdCBfYXJncyAgICAgPSBhcmdzLmNoaWxkcmVuO1xuICAgIGNvbnN0IFNUeXBlX2ZjdCA9IGFyZ3MudmFsdWUhIGFzIFNUeXBlRmN0O1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGxldCBrd19zdGFydCA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGt3X3N0YXJ0ID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKVxuICAgICAgICBrd19zdGFydCA9IG1ldGEuaWR4X3ZhcmFyZyArIDE7XG5cbiAgICBpZiggbWV0YS5rd2FyZ3MgIT09IHVuZGVmaW5lZCAmJiBrd19zdGFydCA9PT0gX2FyZ3MubGVuZ3RoLTEpXG4gICAgICAgICsra3dfc3RhcnQ7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBfYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIHcoXCIsIFwiKTtcblxuICAgICAgICBpZigga3dfc3RhcnQgPT09IGkpXG4gICAgICAgICAgICB3KFwie1wiKTtcbiAgICAgICAgaWYoIGkgPT09IG1ldGEuaWR4X3ZhcmFyZyAmJiBpID09PSBfYXJncy5sZW5ndGgtMSApXG4gICAgICAgICAgICAoX2FyZ3NbaV0gYXMgYW55KS5sYXN0ID0gdHJ1ZTtcblxuICAgICAgICB3cml0ZV9hcmcoX2FyZ3NbaV0pO1xuICAgIH1cblxuICAgIGlmKCBrd19zdGFydCA8IF9hcmdzLmxlbmd0aClcbiAgICAgICAgdygnfSA9IHt9Jyk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlX2FyZyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSBqc2NvZGVfY3Vyc29yKCk7XG5cbiAgICBpZiggbm9kZS50eXBlID09PSBcImFyZy52YXJhcmdcIiApIHtcbiAgICAgICAgaWYoIChub2RlIGFzIGFueSkubGFzdClcbiAgICAgICAgICAgIHd0YC4uLiR7bm9kZS52YWx1ZX1gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCBcIltdXCIpICk7XG4gICAgfSBlbHNlIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLmt3YXJnXCIgKSB7XG4gICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwie31cIikgKTtcbiAgICB9IGVsc2UgaWYobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICBpZiggdmFsdWUucmVzdWx0X3R5cGUgPT09ICdqc2ludCcgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIySW50KHZhbHVlKTtcblxuICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCB2YWx1ZSkgKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIHcobm9kZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IGpzY29kZV9jdXJzb3IoKVxuICAgIH1cbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IGFzdDJqcyBmcm9tIFwiLi9hc3QyanNcIjtcblxuLy9UT0RPOiBmYWtlIG5vZGUuLi5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoKSB7XG4gICAgLy8gYXJncyBub2RlIGRvZXNuJ3QgZXhpc3QuLi5cbiAgICByZXR1cm47XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJhcmd1bWVudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJncyhub2RlOiBhbnksIFNUeXBlX2ZjdDogU1R5cGVGY3QsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBjb25zdCBfYXJncyA9IG5vZGUuYXJncztcbiAgICBjb25zdCBoYXNfdmFyYXJnID0gX2FyZ3MudmFyYXJnICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzX2t3YXJnICA9IF9hcmdzLmt3YXJnICAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFyZ3NfcG9zICAgPSBtZXRhLmFyZ3NfcG9zO1xuICAgIGNvbnN0IGFyZ3NfbmFtZXMgPSBtZXRhLmFyZ3NfbmFtZXM7XG5cbiAgICBjb25zdCB0b3RhbF9hcmdzID0gX2FyZ3MucG9zb25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfdmFyYXJnXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmt3b25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfa3dhcmc7XG5cbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5PEFTVE5vZGU+KHRvdGFsX2FyZ3MpO1xuXG4gICAgY29uc3QgcG9zX2RlZmF1bHRzID0gbm9kZS5hcmdzLmRlZmF1bHRzO1xuICAgIGNvbnN0IHBvc29ubHkgPSBfYXJncy5wb3Nvbmx5YXJncztcbiAgICBjb25zdCBwb3MgICAgID0gX2FyZ3MuYXJncztcblxuICAgIC8vIHBvc29ubHlcbiAgICBsZXQgZG9mZnNldCA9IHBvc19kZWZhdWx0cy5sZW5ndGggLSBwb3Nvbmx5Lmxlbmd0aCAtIHBvcy5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvc29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc29ubHlbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIFwicG9zb25seVwiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3NbaV0gPSBhcmc7XG4gICAgfVxuXG4gICAgLy8gcG9zXG4gICAgbGV0IG9mZnNldCA9IHBvc29ubHkubGVuZ3RoO1xuICAgICAgZG9mZnNldCAtPSBwb3Nvbmx5Lmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhwb3NbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIFwicG9zXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgICAgICBhcmdzX25hbWVzW29mZnNldF0gPSBhcmcudmFsdWU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH1cblxuICAgIG1ldGEuaWR4X3ZhcmFyZyA9IG9mZnNldDtcblxuICAgIC8vIHZhcmFyZ1xuICAgIGlmKCBoYXNfdmFyYXJnICkge1xuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKF9hcmdzLnZhcmFyZywgdW5kZWZpbmVkLCBcInZhcmFyZ1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG5iX3Bvc19kZWZhdWx0cyA9IE1hdGgubWluKHBvc19kZWZhdWx0cy5sZW5ndGgsIHBvcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBoYXNfb3RoZXJzID0gcG9zX2RlZmF1bHRzLmxlbmd0aCA+IHBvcy5sZW5ndGggfHwgYXJncy5sZW5ndGggIT09IG9mZnNldDtcblxuICAgICAgICBpZiggbmJfcG9zX2RlZmF1bHRzID4gMSB8fCBuYl9wb3NfZGVmYXVsdHMgPT09IDEgJiYgaGFzX290aGVycylcbiAgICAgICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgLT0gbmJfcG9zX2RlZmF1bHRzO1xuICAgIH1cblxuICAgIGxldCBjdXRfb2ZmICAgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBjdXRfb2ZmID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIGN1dF9vZmYgPSBtZXRhLmlkeF92YXJhcmc7XG4gICAgZm9yKGxldCBpID0gcG9zb25seS5sZW5ndGg7IGkgPCBjdXRfb2ZmOyArK2kpXG4gICAgICAgIGFyZ3NfcG9zW2FyZ3NbaV0udmFsdWVdID0gaTtcblxuICAgIGZvcihsZXQgaSA9IGN1dF9vZmY7IGkgPCBtZXRhLmlkeF92YXJhcmc7ICsraSlcbiAgICAgICAgYXJnc19wb3NbYXJnc1tpXS52YWx1ZV0gPSAtMTtcblxuICAgIC8vVE9ETzogaWR4X2VuZF9wb3MgKGlmIGRlZmF1bHQgYW5kIG5vIGlkeF92YXJhcmcpXG5cbiAgICAvLyBrd29ubHlcbiAgICBjb25zdCBrd29ubHkgICAgICA9IF9hcmdzLmt3b25seWFyZ3M7XG4gICAgY29uc3Qga3dfZGVmYXVsdHMgPSBfYXJncy5rd19kZWZhdWx0cztcblxuICAgIG1ldGEuaGFzX2t3ID0gbWV0YS5pZHhfdmFyYXJnICE9PSBjdXRfb2ZmIHx8IGt3b25seS5sZW5ndGggIT09IDA7XG5cbiAgICBkb2Zmc2V0ID0ga3dfZGVmYXVsdHMubGVuZ3RoIC0ga3dvbmx5Lmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwga3dvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhrd29ubHlbaV0sIGt3X2RlZmF1bHRzW2ldLCBcImt3b25seVwiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAgICAgYXJnc19wb3NbYXJnLnZhbHVlXSA9IC0xO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBrd2FyZ1xuICAgIGlmKCBoYXNfa3dhcmcgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKF9hcmdzLmt3YXJnLCB1bmRlZmluZWQsIFwia3dhcmdcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcblxuICAgICAgICBtZXRhLmt3YXJncyA9IGFyZy52YWx1ZTtcbiAgICB9XG5cbiAgICAvL1RPRE8uLi5cbiAgICAvKlxuICAgIGlmKCBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIilcbiAgICAgICAgX2FyZ3MgPSBfYXJncy5zbGljZSgxKTtcbiAgICAqL1xuXG4gICAgbGV0IHZpcnRfbm9kZTogYW55O1xuICAgIGlmKCBhcmdzLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gYXJnc1swXSAgICAgICAgICAgIC5weWNvZGUuc3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCAgID0gYXJnc1thcmdzLmxlbmd0aC0xXS5weWNvZGUuZW5kO1xuXG4gICAgICAgIHZpcnRfbm9kZSA9IHtcbiAgICAgICAgICAgIGxpbmVubyAgICAgICAgOiBzdGFydC5saW5lLFxuICAgICAgICAgICAgY29sX29mZnNldCAgICA6IHN0YXJ0LmNvbCxcbiAgICAgICAgICAgIGVuZF9saW5lbm8gICAgOiBlbmQubGluZSxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuY29sXG4gICAgICAgIH07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICB2aXJ0X25vZGUgPSB7XG4gICAgICAgICAgICAgICAgbGluZW5vICAgIDogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vICAgIDogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sX29mZnNldDogY29sLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGNvbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIFNUeXBlX2ZjdCwgYXJncyk7XG4gICAgYXN0bm9kZS53cml0ZSA9IGFzdDJqcztcbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGRlZnZhbDogYW55LCB0eXBlOnN0cmluZywgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZS5hbm5vdGF0aW9uPy5pZDtcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcbiAgICBpZiggZGVmdmFsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSBjb252ZXJ0X25vZGUoIGRlZnZhbCxjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY2hpbGQgKTtcblxuICAgICAgICBpZiggcmVzdWx0X3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gY2hpbGQucmVzdWx0X3R5cGU7XG4gICAgICAgICAgICBpZihyZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgICAgICAgICByZXN1bHRfdHlwZSA9ICdpbnQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBhcmcuJHt0eXBlfWAsIHJlc3VsdF90eXBlLCBub2RlLmFyZywgY2hpbGRyZW4pO1xufSIsImltcG9ydCB7IHIsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZnVuY3Rpb24gcHJpbnRfb2JqKG9iajogUmVjb3JkPHN0cmluZywgYW55Pikge1xuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgaWYoa2V5cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW11dO1xuXG4gICAgY29uc3Qgc3RyID0gbmV3IEFycmF5KGtleXMubGVuZ3RoKzEpO1xuICAgIHN0clswXSA9IGB7JHtrZXlzWzBdfTogYDtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gID0gYCwgJHtrZXlzW2ldfTogYDtcblxuICAgIHN0cltpXSA9IFwifVwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLk9iamVjdC52YWx1ZXMob2JqKV07XG59XG5cbmZ1bmN0aW9uIGpvaW4oZGF0YTogYW55W10sIHNlcD1cIiwgXCIpIHtcblxuICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gW1tdXTtcblxuICAgIGNvbnN0IHN0ciA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCsxKTtcbiAgICBzdHJbMF0gPSBcIlwiO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSA9IHNlcDtcbiAgICBzdHJbaV0gPSBcIlwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLmRhdGFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdF9jYWxsKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IG1ldGEgPSAobm9kZS52YWx1ZSBhcyBTVHlwZUZjdCkuX19jYWxsX187XG5cbiAgICBsZXQga3dfcG9zID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKG5vZGUuY2hpbGRyZW5baV0udHlwZSA9PT0gXCJmdW5jdGlvbnMua2V5d29yZFwiKSB7XG4gICAgICAgICAgICBrd19wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIGxldCBuYl9wb3MgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBuYl9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgbmJfcG9zID0gTWF0aC5tYXgobWV0YS5pZHhfdmFyYXJnLCBrd19wb3MtMSk7XG5cbiAgICBsZXQgcG9zX3NpemUgPSBuYl9wb3MrMTtcbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAgcG9zX3NpemUgPSBtZXRhLmlkeF92YXJhcmcrMjtcbiAgICBsZXQgcG9zID0gbmV3IEFycmF5KHBvc19zaXplKTtcbiAgICBcbiAgICBjb25zdCBrdyAgICA6IFJlY29yZDxzdHJpbmcsIEFTVE5vZGU+ID0ge307XG4gICAgY29uc3Qga3dhcmdzOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuXG4gICAgbGV0IGhhc19rdyA9IGZhbHNlO1xuXG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG1ldGEuaWR4X3ZhcmFyZyk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGN1dG9mZjsgKytpKVxuICAgICAgICAgICAgcG9zW2ktMV0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGlmKCBtZXRhLmlkeF92YXJhcmcrMSAhPT0ga3dfcG9zIClcbiAgICAgICAgICAgIHBvc1ttZXRhLmlkeF92YXJhcmddID0gam9pbihbXCJbXCIsIGpvaW4obm9kZS5jaGlsZHJlbi5zbGljZShtZXRhLmlkeF92YXJhcmcrMSxrd19wb3MpKSwgXCJdXCJdLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbmJfcG9zKzEpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuICAgICAgICBmb3IobGV0IGkgPSBjdXRvZmY7IGkgPCBrd19wb3M7ICsraSlcbiAgICAgICAgICAgIGt3WyBhcmdzX25hbWVzW2ktMV0gXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgaGFzX2t3ID0gY3V0b2ZmICE9PSBrd19wb3M7XG4gICAgfVxuXG4gICAgbGV0IGhhc19rd2FyZ3MgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFyZ3NfcG9zID0gbWV0YS5hcmdzX3BvcztcbiAgICBcblxuICAgIGZvcihsZXQgaSA9IGt3X3BvczsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBjb25zdCBhcmcgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGFyZy52YWx1ZTtcbiAgICAgICAgY29uc3QgaWR4ICA9IGFyZ3NfcG9zWyBuYW1lIF07XG5cbiAgICAgICAgaWYoIGlkeCA+PSAwICkge1xuICAgICAgICAgICAgcG9zW2lkeF0gPSBhcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc19rdyA9IHRydWU7XG5cbiAgICAgICAgaWYoIGlkeCA9PT0gLTEpXG4gICAgICAgICAgICBrd1tuYW1lXSA9IGFyZztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrd2FyZ3NbbmFtZV0gPSBhcmc7XG4gICAgICAgICAgICBoYXNfa3dhcmdzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4gPSBrdztcbiAgICAvL1RPRE86IG9ubHkgdGhlIG9uZXMgYXQgLTEuLi5cbiAgICBpZiggaGFzX2t3YXJncyAmJiAhIG1ldGEuaGFzX2t3ICl7XG4gICAgICAgIG9iaiA9IGt3YXJncztcbiAgICB9IGVsc2UgaWYoIGhhc19rd2FyZ3MgKSB7XG4gICAgICAgIG9ialttZXRhLmt3YXJncyFdID0gcHJpbnRfb2JqKGt3YXJncyk7XG4gICAgfVxuXG4gICAgaWYoIGhhc19rdyApXG4gICAgICAgIHBvc1twb3MubGVuZ3RoLTFdID0gcHJpbnRfb2JqKG9iaik7XG4gICAgZWxzZSB7XG4gICAgICAgIHdoaWxlKHBvcy5sZW5ndGggPiAwICYmIHBvc1twb3MubGVuZ3RoLTFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAtLXBvcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHtub2RlLmNoaWxkcmVuWzBdfSgke2pvaW4ocG9zKX0pYDsgLy8gYXJncyA/XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3ciggKHRoaXMudmFsdWUgYXMgU1R5cGVGY3QpLl9fY2FsbF9fLnN1YnN0aXR1dGVfY2FsbCEodGhpcykgKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG5cbiAgICBjb25zdCBmY3RfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSE7XG4gICAgY29uc3QgcmV0X3R5cGUgPSAoZmN0X3R5cGUuX19jYWxsX18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgcmV0X3R5cGUsIGZjdF90eXBlLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzICAgIC5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpICksXG4gICAgICAgIC4uLm5vZGUua2V5d29yZHMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBrZXl3b3JkIG5vZGUuLi5cbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcodGhpcy5jaGlsZHJlblswXSk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHZhbHVlICAgID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQgKVxuICAgIGNvbnN0IHJldF90eXBlID0gdmFsdWUucmVzdWx0X3R5cGU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMua2V5d29yZFwiLCByZXRfdHlwZSwgbm9kZS5hcmcsIFtcbiAgICAgICAgdmFsdWVcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImtleXdvcmRcIjsiLCJpbXBvcnQgeyBOTCwgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgYXJncyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICB3dGBmdW5jdGlvbiAke25hbWV9KCR7YXJnc30peyR7Ym9keX0ke05MfX1gO1xuICAgIC8vdygnZnVuY3Rpb24gJywgbmFtZSwgJygnLCBhcmdzLCAnKXsnLCBib2R5LCBOTCwgJ30nKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGdldFNUeXBlLCBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IHsgZGVmYXVsdF9jYWxsIH0gZnJvbSBcIi4uL2NhbGwvYXN0MmpzXCI7XG5pbXBvcnQgeyBjb252ZXJ0X2FyZ3MgfSBmcm9tIFwiLi4vYXJncy9hc3Rjb252ZXJ0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvL2NvbnN0IGlzTWV0aG9kID0gY29udGV4dC50eXBlID09PSBcImNsYXNzXCI7XG4gICAgbGV0IGZjdF9yZXR1cm5fdHlwZTogbnVsbHxTVHlwZU9iaiA9IG51bGw7XG5cbiAgICBjb25zdCBTVHlwZV9mY3Q6IFNUeXBlRmN0ID0ge1xuICAgICAgICBfX25hbWVfXzogXCJmdW5jdGlvblwiLFxuICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgYXJnc19uYW1lcyAgICAgOiBuZXcgQXJyYXkobm9kZS5hcmdzLmFyZ3MubGVuZ3RoK25vZGUuYXJncy5wb3Nvbmx5YXJncy5sZW5ndGgpLFxuICAgICAgICAgICAgYXJnc19wb3MgICAgICAgOiB7fSxcbiAgICAgICAgICAgIGlkeF9lbmRfcG9zICAgIDogLTEsXG4gICAgICAgICAgICBpZHhfdmFyYXJnICAgICA6IC0xLFxuICAgICAgICAgICAgaGFzX2t3ICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHJldHVybl90eXBlICAgIDogKCkgPT4gZmN0X3JldHVybl90eXBlISwgLy8gP1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBkZWZhdWx0X2NhbGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaWYoICEgaXNNZXRob2QgKSB7XG4gICAgICAgIC8vIGlmIG1ldGhvZCBhZGQgdG8gc2VsZl9jb250ZXh0LnN5bWJvbHMgP1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IFNUeXBlX2ZjdDtcbiAgICAvL31cblxuICAgIGNvbnN0IGxhc3RfdHlwZSAgID0gbm9kZS5ib2R5W25vZGUuYm9keS5sZW5ndGgtMV0uY29uc3RydWN0b3IuJG5hbWU7XG4gICAgY29uc3QgaW1wbF9yZXR1cm4gPSBsYXN0X3R5cGUgIT09IFwiUmV0dXJuXCIgJiYgbGFzdF90eXBlICE9PSBcIlJhaXNlXCI7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZS5yZXR1cm5zPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBmY3RfcmV0dXJuX3R5cGUgPSBnZXRTVHlwZShhbm5vdGF0aW9uKTtcbiAgICBlbHNlIGlmKCBpbXBsX3JldHVybiApXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IFNUeXBlX05vbmVUeXBlO1xuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG5cbiAgICAvLyBmYWtlIHRoZSBub2RlLi4uXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBTVHlwZV9mY3QsIGNvbnRleHQpO1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgY29uc3QgYm9keSA9IGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpO1xuXG4gICAgaWYoIGltcGxfcmV0dXJuICkge1xuICAgICAgICBjb25zdCBmYWtlX25vZGUgPSB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgICRuYW1lOiBcIlJldHVyblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxpbmVubzogbm9kZS5lbmRfbGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5lbmRfbGluZW5vLFxuICAgICAgICAgICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogbm9kZS5lbmRfY29sX29mZnNldCxcbiAgICAgICAgfVxuICAgICAgICBib2R5LmNoaWxkcmVuLnB1c2goIGNvbnZlcnRfbm9kZShmYWtlX25vZGUsIGNvbnRleHQpICk7XG4gICAgfVxuICAgIC8vIHJlY3Vyc2l2ZS5cbiAgICBpZiggZmN0X3JldHVybl90eXBlID09PSBudWxsICkge1xuICAgICAgICAvL1RPRE86IGxvb3AsIGlmLCB0cnlcbiAgICAgICAgbGV0IHJldCA9IGJvZHkuY2hpbGRyZW4uZmlsdGVyKCBuID0+IG4udHlwZSA9PT0gXCJrZXl3b3Jkcy5yZXR1cm5cIik7XG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IHJldFswXS5yZXN1bHRfdHlwZSE7XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBcImZ1bmN0aW9ucy5kZWZcIjtcbiAgICAvL2lmKGlzTWV0aG9kKVxuICAgIC8vICAgIHR5cGUgKz0gXCIobWV0aClcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgYm9keVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRnVuY3Rpb25EZWZcIjsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICByZXR1cm4gd3RgX2JfLmFzc2VydCgke3RoaXMuY2hpbGRyZW5bMF19KWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIkFzc2VydFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJicmVha1wiKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5icmVha1wiLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJyZWFrXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiY29udGludWVcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5jb250aW51ZVwiLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnRpbnVlXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgaWYoIHRoaXMudmFsdWVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHcodGhpcy52YWx1ZVswXSk7XG5cbiAgICB3dGAke3RoaXMudmFsdWVbMF19OiAke3RoaXMudmFsdWVbMV19YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydC5hbGlhc1wiLCBudWxsLCBbbm9kZS5uYW1lLCBub2RlLmFzbmFtZV0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJjb25zdCB7XCIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICB3KFwiLCBcIik7XG4gICAgICAgIHcodGhpcy5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgdygnfSA9ICcpO1xuICAgIFxuICAgIGlmKHRoaXMudmFsdWUgPT09IG51bGwpXG4gICAgICAgIHcoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIpO1xuICAgIGVsc2VcbiAgICAgICAgd3RgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dGhpcy52YWx1ZX1cIilgO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnRcIiwgbnVsbCwgbm9kZS5tb2R1bGUsXG4gICAgICAgIG5vZGUubmFtZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJJbXBvcnRcIiwgXCJJbXBvcnRGcm9tXCJdOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICB3dGB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yYWlzZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmV4YywgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJhaXNlXCI7IiwiZXhwb3J0IGNsYXNzIFB5dGhvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgcmVhZG9ubHkgcHl0aG9uX2V4Y2VwdGlvbjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHl0aG9uX2V4Y2VwdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHB5dGhvbl9leGNlcHRpb24uX3Jhd19lcnJfID0gdGhpcztcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2tleXdvcmRzL2NvbnRpbnVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNCBmcm9tIFwiLi9rZXl3b3Jkcy9jb250aW51ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNSBmcm9tIFwiLi9rZXl3b3Jkcy9icmVhay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4va2V5d29yZHMvYnJlYWsvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNiBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjYgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNyBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNyBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI4IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOSBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOSBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMwIGZyb20gXCIuL2Z1bmN0aW9ucy9hcmdzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9mdW5jdGlvbnMvYXJncy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdGVybmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzUgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNyBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzcgZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzggZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM4IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM5IGZyb20gXCIuL2JvZHkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM5IGZyb20gXCIuL2JvZHkvYXN0MmpzLnRzXCI7XG5cblxuY29uc3QgTU9EVUxFUyA9IHtcblx0XCJzeW1ib2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8wLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18wXG5cdH0sXG5cdFwic3RydWN0cy50dXBsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJzdHJ1Y3RzLmxpc3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yXG5cdH0sXG5cdFwic3RydWN0cy5kaWN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcInJldHVyblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJwYXNzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcIm9wZXJhdG9ycy51bmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJvcGVyYXRvcnMuY29tcGFyZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJvcGVyYXRvcnMuYm9vbGVhblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJvcGVyYXRvcnMuYmluYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5hdHRyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEwXG5cdH0sXG5cdFwib3BlcmF0b3JzLltdXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwib3BlcmF0b3JzLkFzc2lnbk9wXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTNcblx0fSxcblx0XCJsaXRlcmFscy5zdHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTVcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNlxuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE3XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMThcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE5XG5cdH0sXG5cdFwibGl0ZXJhbHMuTm9uZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMFxuXHR9LFxuXHRcImtleXdvcmRzLnJhaXNlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIxXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIyXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0L2FsaWFzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIzXG5cdH0sXG5cdFwia2V5d29yZHMuY29udGludWVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjRcblx0fSxcblx0XCJrZXl3b3Jkcy5icmVha1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNVxuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNlxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjdcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsL2tleXdvcmRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjlcblx0fSxcblx0XCJmdW5jdGlvbnMuYXJnc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zM1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50ZXJuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM0XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzVcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM2XG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzdcblx0fSxcblx0XCJjbGFzcy5jbGFzc2RlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zOFxuXHR9LFxuXHRcImJvZHlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzlcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfOSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMTYpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzIxKTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yNik7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMzIpO1xuXG5cbmV4cG9ydCBjb25zdCBfYl8gPSBSVU5USU1FO1xuIiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgdyhcIm51bGxcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHx8ICEoXCJfX2NsYXNzX19cIiBpbiBub2RlLnZhbHVlKVxuICAgICAgICAgICAgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18uX19xdWFsbmFtZV9fICE9PSBcIk5vbmVUeXBlXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5Ob25lXCIsIFNUeXBlX05vbmVUeXBlLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgYWRkU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ05vbmVUeXBlJywge30pOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyh0aGlzLnZhbHVlKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBTVHlwZV9ib29sLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkNtcE9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdib29sJywge1xuICAgIFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnRdKSxcbiAgICBcbn0pOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcIiR7XCIsIHRoaXMuY2hpbGRyZW5bMF0sIFwifVwiKVxufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9ybWF0dGVkVmFsdWVcIjsiLCJpbXBvcnQgeyBqc2NvZGVfY3Vyc29yLCB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcImBcIik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFNUeXBlX3N0cikge1xuXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGpzY29kZV9jdXJzb3IoKTtcblxuICAgICAgICAgICAgdyhjaGlsZC52YWx1ZSk7XG5cbiAgICAgICAgICAgIGNoaWxkLmpzY29kZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IGpzY29kZV9jdXJzb3IoKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYoY2hpbGQudHlwZSA9PT0gXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiKSB7XG4gICAgICAgICAgICB3KGNoaWxkKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICB3KFwiYFwiKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcodGhpcy52YWx1ZSk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9mbG9hdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChub2RlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fICE9PSBcImZsb2F0XCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmZsb2F0XCIsIFNUeXBlX2Zsb2F0LCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb2F0MnN0cjogKGY6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiggZiA8PSAxZS01IHx8IGYgPj0gMWUxNikge1xuXG4gICAgICAgICAgICBsZXQgc3RyID0gZi50b0V4cG9uZW50aWFsKCk7XG4gICAgICAgICAgICBjb25zdCBzaWduX2lkeCA9IHN0ci5sZW5ndGgtMjtcbiAgICAgICAgICAgIGlmKHN0cltzaWduX2lkeF0gPT09ICctJyB8fCBzdHJbc2lnbl9pZHhdID09PSAnKycpXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsc2lnbl9pZHgrMSkgKyAnMCcgKyBzdHIuc2xpY2Uoc2lnbl9pZHgrMSk7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0ciA9IGYudG9TdHJpbmcoKTtcbiAgICAgICAgaWYoICEgc3RyLmluY2x1ZGVzKCcuJykpXG4gICAgICAgICAgICBzdHIgKz0gXCIuMFwiO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuY29uc3QgU1R5cGVfdHlwZV9mbG9hdCA9IGFkZFNUeXBlKCd0eXBlW2Zsb2F0XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2Zsb2F0LFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2Zsb2F0IHx8IG90aGVyX3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlcl90eXBlO1xuXG4gICAgICAgICAgICAvL1RPRE86IHBvd2VyLi4uXG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfc3RyICkge1xuXG4gICAgICAgICAgICAgICAgaWYoIG90aGVyLnR5cGUgPT09IFwibGl0ZXJhbHMuc3RyXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvdGhlci52YWx1ZSA9PT0gXCJpbmZcIiB8fCBvdGhlci52YWx1ZSA9PT0gXCJpbmZpbml0eVwiIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk51bWJlci5QT1NJVElWRV9JTkZJTklUWVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXIudmFsdWUgPT09IFwiLWluZlwifHwgb3RoZXIudmFsdWUgPT09IFwiLWluZmluaXR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2lmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMylcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gcmBCaWdJbnQocGFyc2VJbnQoJHtvdGhlcn0sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE86IG9wdGltaXplIGlmIG90aGVyIGlzIHN0cmluZyBsaXR0ZXJhbC4uLlxuICAgICAgICAgICAgICAgIHJldHVybiByYHBhcnNlRmxvYXQoJHtvdGhlcn0pYDsgLy8sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnZmxvYXQnLCB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2Zsb2F0LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb2F0MnN0cigke25vZGV9KWA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgICAgICAgICAgICAgWycqKicsICcqJywgJy8nLCAnKycsICctJ10sXG4gICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LFxuICAgICAgICBbJy8vJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgWyclJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9mbG9hdCwgWyd1Li0nXSksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgc3VmZml4ID0gXCJcIjtcbiAgICBsZXQgdGFyZ2V0ID0gKHRoaXMgYXMgYW55KS5hcztcblxuICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICBpZih0YXJnZXQgPT09IFwiZmxvYXRcIikge1xuICAgICAgICBpZiggdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuICAgIH1cbiAgICBlbHNlIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgfHwgdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBiaWdpbnQgZG8gbm90IGNhc3QgaW50byBqc2ludCAobG9zcyBvZiBwcmVjaXNpb24pLlxuICAgICAgICBzdWZmaXggPSBcIm5cIjtcblxuICAgIC8vIDFlKzU0IHNob3VsZCBoYWQgYmUgc3RvcmVkIGFzIGJpZ2ludC5cbiAgICB3dGAke3ZhbHVlfSR7c3VmZml4fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVHlwZV9pbnQgOiBTVHlwZV9qc2ludDtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCByZWFsX3R5cGUsIHZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgaWRfanNvcCwgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmNvbnN0IFNUeXBlX3R5cGVfaW50ID0gYWRkU1R5cGUoJ3R5cGVbaW50XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2ludCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlcjtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyMkludChvdGhlcik7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfZmxvYXQgKVxuICAgICAgICAgICAgICAgIHJldHVybiByYEJpZ0ludChNYXRoLnRydW5jKCR7b3RoZXJ9KSlgO1xuXG4gICAgICAgICAgICAvL1RPRE86IHBvd2VyLi4uXG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfc3RyICkge1xuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoJHtvdGhlcn0pYDsgLy8sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnaW50Jywge1xuXG4gICAgLy9UT0RPOiBmaXggdHlwZS4uLlxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfaW50LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHtub2RlfS50b1N0cmluZygpYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyogKi9cbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnKiddLCBbU1R5cGVfaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGEsIGIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyonLCBiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCwgWycvJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9mbG9hdF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzKSA9PiBJbnQyTnVtYmVyKHMsICdmbG9hdCcpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJy8vJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnJSddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ3UuLSddLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdyZWFsJztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsnfiddLFxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSApXG4gICAgLyogKi9cblxufSk7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdqc2ludCcsIHtcblxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyonXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIE51bWJlcjJJbnQoYSksICcqJywgTnVtYmVyMkludChiKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LCBbJy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Zsb2F0XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfanNpbnQsIFsnLy8nXSwgW1NUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9qc2ludCwgWyclJ10sIFtTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2pzaW50LFxuICAgICAgICBbJ3UuLSddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2ludCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBOdW1iZXIySW50KGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ34nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdIClcbiAgICAvKlxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LCovXG59KTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB3KHRoaXMudmFsdWUpO1xuICAgIFxuICAgIHd0YFwiJHt0aGlzLnZhbHVlfVwiYDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuc3RyXCIsIFNUeXBlX3N0ciwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicywgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5jb25zdCBTVHlwZV90eXBlX3N0ciA9IGFkZFNUeXBlKCd0eXBlW3N0cl0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9zdHIsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IG90aGVyLnJlc3VsdF90eXBlXG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfc3RyIClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG5cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG90aGVyLnJlc3VsdF90eXBlPy5fX3N0cl9fIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgICAgIGlmKCBtZXRob2QgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke290aGVyLnJlc3VsdF90eXBlLl9fbmFtZV9ffS5fX3N0cl9fIG5vdCBkZWZpbmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEob3RoZXIpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmFkZFNUeXBlKCdzdHInLCB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX3N0cixcblxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbU1R5cGVfc3RyXSksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX3N0ciwgW1wiK1wiXSwgW1NUeXBlX3N0cl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9zdHIsIFtcIipcIl0sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlciAgOiB7XCJpbnRcIjogXCJmbG9hdFwifSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggYS5yZXN1bHRfdHlwZSAhPT0gU1R5cGVfc3RyIClcbiAgICAgICAgICAgICAgICAgICAgW2EsYl0gPSBbYixhXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByYCR7YX0ucmVwZWF0KCR7Yn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG59KTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApXG4gICAgICAgIHcoXCJ2YXIgXCIpO1xuXG4gICAgdyh0aGlzLmNoaWxkcmVuWzBdKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxOyArK2kpXG4gICAgICAgIHd0YCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gO1xuXG4gICAgY29uc3QgcmlnaHRfbm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV07XG4gICAgbGV0IHJjaGlsZDogYW55ID0gcmlnaHRfbm9kZTtcblxuICAgIGlmKCByaWdodF9ub2RlLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludCAmJiB0aGlzLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICByY2hpbGQgPSBOdW1iZXIySW50KHJpZ2h0X25vZGUpO1xuXG4gICAgd3RgID0gJHtyY2hpbGR9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGUsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB0eXBlID0gXCJvcGVyYXRvcnMuPVwiO1xuXG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgbGV0IHJpZ2h0X3R5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZShhbm5vdGF0aW9uKTtcblxuXG4gICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJlc3VsdF90eXBlICE9PSByaWdodF90eXBlICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgfVxuICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gbnVsbCApIHtcbiAgICAgICAgcmVzdWx0X3R5cGUgPSByaWdodF90eXBlO1xuICAgICAgICBpZiggcmlnaHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IFNUeXBlX2ludDsgLy8gcHJldmVudHMgaXNzdWVzLlxuICAgICAgICAgICAgLy9UT0RPOiBvbmx5IGlmIGFzc2lnbi4uLlxuICAgIH1cblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGNvbnN0IGxlZnRzID0gdGFyZ2V0cy5tYXAoIChuOmFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKTtcblxuICAgICAgICAvLyBjb3VsZCBiZSBpbXByb3ZlZCBJIGd1ZXNzLlxuICAgICAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmKCBsZWZ0X3R5cGUgIT09IG51bGwgJiYgcmlnaHRfdHlwZSAhPT0gbGVmdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICB7fS8vY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2xlZnQudmFsdWVdID0gcmVzdWx0X3R5cGU7XG4gICAgICAgICAgICAgICAgdHlwZSArPSBcIihpbml0KVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgcmVzdWx0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBBc3NpZ25PcGVyYXRvcnMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGxldCBvcCA9IChBc3NpZ25PcGVyYXRvcnMgYXMgYW55KVt0aGlzLnZhbHVlXTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSBhID0gYSArIGJcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH09ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuICAgICAgICAvKlxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LCByaWdodCkgKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS50YXJnZXQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgbGVmdC5yZXN1bHRfdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdWdBc3NpZ25cIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIFxuICAgIHd0YCR7dGhpcy5jaGlsZHJlblswXX1bJHt0aGlzLmNoaWxkcmVuWzFdfV1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuW11cIiwgbnVsbCwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUuc2xpY2UsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlN1YnNjcmlwdFwiXTsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgd3RgJHt0aGlzLmNoaWxkcmVuWzBdfS4ke3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5hdHRyXCIsIG51bGwsIG5vZGUuYXR0cixcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF0dHJpYnV0ZVwiXTsiLCJpbXBvcnQgeyB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgY29uc3QgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZSFbdGhpcy52YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgd3IoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKHRoaXMsIGxlZnQsIHJpZ2h0KSApO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSByZXZlcnNlZCBvcGVyYXRvclxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSByaWdodC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlISk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCB0eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9mbG9hdDogKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCBhL2IgKTtcbiAgICB9LFxuICAgIGZsb29yZGl2X2ludDogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIC0tcmVzdWx0O1xuICAgIH0sXG4gICAgbW9kX2Zsb2F0OiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcblxuICAgICAgICBjb25zdCBtb2QgPSAoYSAlIGIgKyBiKSAlIGI7XG4gICAgICAgIGlmKCBtb2QgPT09IDAgJiYgYiA8IDAgKVxuICAgICAgICAgICAgcmV0dXJuIC0wO1xuICAgICAgICByZXR1cm4gbW9kO1xuICAgIH0sXG4gICAgbW9kX2ludDogPFQ+KGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChhICUgYiArIGIpICUgYjtcbiAgICB9XG59IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbXVsdGlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHdyKCBtdWx0aV9qc29wKHRoaXMsIHRoaXMudmFsdWUsIC4uLnRoaXMuY2hpbGRyZW4pICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuY29uc3QgYm5hbWUyanNvcCA9IHtcbiAgICAnQW5kJzogJyYmJyxcbiAgICAnT3InIDogJ3x8J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUudmFsdWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCApICk7XG5cbiAgICBjb25zdCBvcCAgID0gKGJuYW1lMmpzb3AgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICBjb25zdCB0eXBlID0gY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYm9vbGVhblwiLCB0eXBlLCBvcCwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJvb2xPcFwiXTsiLCJpbXBvcnQgeyB3LCB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5mdW5jdGlvbiBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZTogQVNUTm9kZSwgbGVmdDpBU1ROb2RlLCBvcDogc3RyaW5nLCByaWdodDogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCByZXZlcnNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJ0eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgY29uc3QgbHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcblxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBhbnkpO1xuICAgICAgICBtZXRob2QgPSByaWdodC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDAgKVxuICAgICAgICAgICAgdygnICYmICcpO1xuXG4gICAgICAgIGNvbnN0IG9wICAgID0gdGhpcy52YWx1ZVtpXTtcbiAgICAgICAgY29uc3QgbGVmdCAgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuY2hpbGRyZW5baSsxXTtcblxuICAgICAgICBpZiggb3AgPT09ICdpcycgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJz09PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9wID09PSAnaXMgbm90JyApIHtcbiAgICAgICAgICAgIHdyKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnIT09JywgcmlnaHQpICk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd3IoIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LCBvcCwgcmlnaHQpICk7XG4gICAgfVxufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtlLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICAgICAgaWYoIG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5jb25zdHJ1Y3Rvci4kbmFtZX0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZWZ0ICAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHRzID0gbm9kZS5jb21wYXJhdG9ycy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy5jb21wYXJlYCwgU1R5cGVfYm9vbCwgb3BzLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgLi4ucmlnaHRzLFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyB3LCB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgaWYoIHRoaXMudmFsdWUgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gd3IoIHVuYXJ5X2pzb3AodGhpcywgJyEnLCBJbnQyTnVtYmVyKGxlZnQsICdqc2ludCcpICkgKTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0KSApO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sLCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLm9wZXJhbmQgLCBjb250ZXh0ICk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmKCBvcCA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCBTVHlwZV9ib29sLCBcIm5vdFwiLCBbIGxlZnQgXSApO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHcoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInBhc3NcIiwgbnVsbCk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlBhc3NcIjsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB3KFwicmV0dXJuIG51bGxcIik7XG5cbiAgICByZXR1cm4gd3RgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIFNUeXBlX05vbmVUeXBlLCBudWxsKTtcblxuICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KCd7Jyk7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwIClcbiAgICAgICAgd3RgJHt0aGlzLmNoaWxkcmVuWzBdfTogJHt0aGlzLmNoaWxkcmVuWzFdfWA7XG5cbiAgICBmb3IobGV0IGkgPSAyOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrPTIpXG4gICAgICAgIHd0YCwgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YDtcblxuICAgIHcoJ30nKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheShub2RlLmtleXMubGVuZ3RoICogMik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjaGlsZHJlblsyKmldICAgPSBjb252ZXJ0X25vZGUobm9kZS4gIGtleXNbaV0sIGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlblsyKmkrMV0gPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZXNbaV0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMuZGljdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgY2hpbGRyZW5cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRGljdFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgdyhcIltcIik7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwIClcbiAgICAgICAgdyh0aGlzLmNoaWxkcmVuWzBdKTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICB3KFwiLCBcIiwgdGhpcy5jaGlsZHJlbltpXSk7XG5cbiAgICB3KFwiXSlcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJPYmplY3QuZnJlZXplKFtcIik7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwIClcbiAgICAgICAgdyh0aGlzLmNoaWxkcmVuWzBdKTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICB3KFwiLCBcIiwgdGhpcy5jaGlsZHJlbltpXSk7XG5cbiAgICB3KFwiXSlcIik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlR1cGxlXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICB3KHRoaXMudmFsdWUpO1xufSIsImltcG9ydCBfcl8gZnJvbSBcIi4uLy4uL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuICAgIGxldCB2YWx1ZSA9IG5vZGUuaWQ7XG5cbiAgICBpZiggdmFsdWUgPT09ICdzZWxmJylcbiAgICAgICAgdmFsdWUgPSAndGhpcyc7IC8vVE9ETyB0eXBlIG9mIGN1cnJlbnQgY29udGV4dCAhIC0+IHNlbGYgaW4gbG9jYWxfc3ltYm9scyA/XG4gICAgZWxzZSBpZiggdmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1t2YWx1ZV07XG5cbiAgICAvKlxuICAgICAgICAvL1RPRE8gZ2xvYmFsU3ltYm9sc1xuICAgIGVsc2UgaWYodmFsdWUgaW4gX3JfKSB7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgX3JfXSkgKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBgY2xhc3MuJHt2YWx1ZX1gO1xuXG4gICAgICAgIHZhbHVlID0gYF9yXy4ke3ZhbHVlfWA7XG4gICAgfVxuICAgICovXG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59XG5cblxuLy8gX190cmFjZWJhY2tfX1xuICAgIC8vIHRiX25leHRcbiAgICAvLyB0Yl9mcmFtZVxuICAgICAgICAvLyBmX2JhY2sgP1xuICAgICAgICAvLyBmX2xvY2FsIDogZW5hYmxlIG9ubHkgaW4gY29tcGF0IG1vZGUuXG4gICAgICAgIC8vIGZfbGluZW5vIChsaW5lKVxuICAgICAgICAvLyBmX2NvZGVcbiAgICAgICAgICAgIC8vIGNvX25hbWUgKGZjdCBuYW1lID8pXG4gICAgICAgICAgICAvLyBjb19maWxlbmFtZSIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcIi4vRXhjZXB0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0pTRXhjZXB0aW9uIGV4dGVuZHMgUHlfRXhjZXB0aW9uIHtcblxufSIsImltcG9ydCBSVU5USU1FXzAgZnJvbSBcIi4vb2JqZWN0LnRzXCI7XG5pbXBvcnQgUlVOVElNRV8xIGZyb20gXCIuL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHNcIjtcbmltcG9ydCBSVU5USU1FXzIgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiSlNFeGNlcHRpb25cIjogUlVOVElNRV8xLFxuXHRcIkV4Y2VwdGlvblwiOiBSVU5USU1FXzIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJVTlRJTUU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9vYmplY3Qge1xuXG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgYm9keSAgICA6IEFTVE5vZGUsXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIHtcbiAgICAgICAgYm9keTogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gICAgLy9UT0RPOiBidWlsdGluX3N5bWJvbHNcbiAgICAvL1RPRE86IGZpeCB0eXBlcy4uLlxuXG4gICAgLy9AdHMtaWdub3JlXG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzWydpbnQnXSAgID0gU1R5cGVfaW50ICAuX19jbGFzc19fO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1snc3RyJ10gICA9IFNUeXBlX3N0ciAgLl9fY2xhc3NfXztcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbJ2Zsb2F0J10gPSBTVHlwZV9mbG9hdC5fX2NsYXNzX187XG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKGFzdC5ib2R5LCBjb250ZXh0KTtcbn1cblxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG5cbiAgICAvLyBsaWtlbHkgYSBib2R5LlxuICAgIGlmKCBBcnJheS5pc0FycmF5KGJyeXRob25fbm9kZSkgKVxuICAgICAgICByZXR1cm4gXCJCb2R5XCI7XG5cbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZihuYW1lID09PSBcIkV4cHJcIikge1xuICAgICAgICBicnl0aG9uX25vZGUgPSBicnl0aG9uX25vZGUudmFsdWU7XG4gICAgICAgIG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuICAgIH1cblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk1vZHVsZSBub3QgcmVnaXN0ZXJlZDpcIiwgbmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlICk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIC8vIHdlIG1heSBoYXZlIG1hbnkgbW9kdWxlcyBmb3IgdGhlIHNhbWUgbm9kZSB0eXBlLlxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHsgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LndyaXRlID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdDJhc3Rub2RlKG5vZGU6IGFueVtdKSB7XG5cbiAgICBjb25zdCBiZWcgPSBub2RlWzBdO1xuICAgIGNvbnN0IGVuZCA9IG5vZGVbbm9kZS5sZW5ndGgtMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lbm8gICAgICAgIDogYmVnLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldCAgICA6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vICAgIDogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3N5bWJvbHMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfc3ltYm9sc31cbiAgICB9XG4gICAgdHlwZTtcbiAgICBsb2NhbF9zeW1ib2xzOiBSZWNvcmQ8c3RyaW5nLCBTVHlwZU9ianxudWxsPjtcbn0iLCIvLyBAdHMtbm9jaGVja1xuXG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGluZSAgOiBudW1iZXIsXG4gICAgbGluZV9vZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBub2RlcyA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuXG4gICAgbGV0IGN1cnNvciA9IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBsaW5lX29mZnNldCA6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNoYXI7XG4gICAgZG8ge1xuICAgICAgICBub2Rlcy5wdXNoKCBwYXJzZUV4cHJlc3Npb24oY29kZSwgY3Vyc29yKSBhcyBhbnkpO1xuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgd2hpbGUoIGNoYXIgPT09ICdcXG4nICkge1xuICAgICAgICAgICAgY2hhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgfSB3aGlsZSggY2hhciAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdC8vY29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlcyxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfY29udmVydCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN5bWJvbChjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnYScgJiYgY2FyIDw9ICd6JyB8fCBjYXIgPj0gJ0EnICYmIGNhciA8PSAnWicgfHwgY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIHx8IGNhciA9PSAnXycgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgY29uc3Qgc3ltYm9sID0gY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpO1xuXG4gICAgLy9UT0RPOiBpZiBrZXl3b3JkLi4uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJzeW1ib2xcIixcbiAgICAgICAgdmFsdWUgICA6IHN5bWJvbCwgLy9UT0RPOiBjZiBjb252ZXJ0IChzZWFyY2ggaW4gbG9jYWwgdmFyaWFibGVzL0NvbnRleHQuLi4pXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2NvbnZlcnRcbiAgICB9O1xufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX2ludCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU51bWJlcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgLy9UT0RPOiByZWFsLi4uXG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLmludFwiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19pbnQsXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX3N0ciBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnXCInICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgKytjdXJzb3Iub2Zmc2V0O1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLnN0cmluZ1wiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19zdHIsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGxldCBsZWZ0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIGlmKCBjaGFyID09PSAnXFxuJylcbiAgICAgICAgcmV0dXJuIGxlZnQ7XG5cbiAgICBsZXQgb3AgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgb3AhLmNoaWxkcmVuWzBdID0gbGVmdDtcbiAgICBvcC5weWNvZGUuc3RhcnQgPSBsZWZ0LnB5Y29kZS5zdGFydDtcblxuICAgIGxldCB2YWx1ZXMgPSBbb3AsIHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKV07XG5cbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciAhPT0gJ1xcbicgKSB7XG5cbiAgICAgICAgbGV0IG9wMiAgID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG5cbiAgICAgICAgbGV0IG9wMSAgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXTtcbiAgICAgICAgbGV0IGxlZnQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcblxuICAgICAgICAvL1RPRE86IGhhbmRsZSBvcCBwcmlvcml0eS4uLlxuICAgICAgICAvLyAoYStiKStjXG5cbiAgICAgICAgLy8gKGErYilcbiAgICAgICAgb3AxIS5jaGlsZHJlblsxXSA9IGxlZnQ7XG4gICAgICAgIG9wMSEucHljb2RlLmVuZCAgPSBsZWZ0LnB5Y29kZS5lbmQ7IFxuXG4gICAgICAgIC8vICgpK2NcbiAgICAgICAgb3AyIS5jaGlsZHJlblswXSA9IG9wMTtcbiAgICAgICAgb3AyLnB5Y29kZS5zdGFydCA9IG9wMS5weWNvZGUuc3RhcnQ7XG5cbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl0gPSBvcDI7XG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdID0gcmlnaHQ7XG5cbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgfVxuXG4gICAgdmFsdWVzWzBdIS5jaGlsZHJlblsxXSA9IHZhbHVlc1sxXTtcbiAgICB2YWx1ZXNbMF0hLnB5Y29kZS5lbmQgID0gdmFsdWVzWzFdLnB5Y29kZS5lbmQ7XG5cbiAgICByZXR1cm4gdmFsdWVzWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdG9yKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldCsrXTtcbiAgICAvKlxuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICcnICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdOyovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJvcGVyYXRvcnMuXCIgKyBjaGFyLFxuICAgICAgICB2YWx1ZSAgIDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IENPUkVfTU9EVUxFU1tcIm9wZXJhdG9ycy5cIiArIGNoYXJdLkFTVDJKUyxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgLy8gaWdub3JlIHdoaXRlc3BhY2VcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgPT09ICcgJyB8fCBjaGFyID09PSAnXFx0JyApXG4gICAgICAgIGNoYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgLy8gaWdub3JlIGNoYXJcbiAgICBpZiggY2hhciA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSBudWxsXG4gICAgaWYoIGNoYXIgPT09ICdcIicpXG4gICAgICAgIG5vZGUgPSBwYXJzZVN0cmluZyhjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ3onIHx8IGNoYXIgPj0gJ0EnICYmIGNoYXIgPD0gJ1onIHx8IGNoYXIgPT0gJ18nIClcbiAgICAgICAgbm9kZSA9IHBhcnNlU3ltYm9sKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIG5vZGUgPSBwYXJzZU51bWJlcihjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZSA9IHBhcnNlT3BlcmF0b3IoY29kZSwgY3Vyc29yKTtcbiAgICAgICAgLy87IHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hlbiBwYXJzaW5nICR7Y2hhcn0gYXQgJHtjdXJzb3IubGluZX06JHtjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0fSAoJHtjdXJzb3Iub2Zmc2V0fSlgKTtcblxuICAgIG5vZGUucHljb2RlID0ge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RPRE86IGlzIG5leHQgYW4gb3BlcmF0b3IgPyAtPiBjb25zdHJ1aXJlIGFyYnJlLi4uXG4gICAgLy9UT0RPIGhhbmRsZSBvcGVyYXRvcnMgP1xuXG4gICAgcmV0dXJuIG5vZGU7XG5cbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBfcl99IGZyb20gXCIuL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHtfYl99IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5leHBvcnQge19iXywgX3JffTtcblxuLy8gY2xhc3NlID9cblxuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIGJ1aWxkTW9kdWxlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coanNjb2RlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICB9XG5cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSB0aGlzLmJ1aWxkTW9kdWxlKGpzY29kZSwgYXN0KSh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHdyaXRlPzogKHRoaXM6IEFTVE5vZGUpID0+IHZvaWQ7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGwsIF92YWx1ZTogYW55ID0gbnVsbCwgY2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdKSB7XG5cblx0XHR0aGlzLnR5cGUgICA9IHR5cGU7XG5cdFx0dGhpcy5yZXN1bHRfdHlwZSA9IHJlc3VsdF90eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2wgOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sIDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG5leHBvcnQgY29uc3QgQXNzaWduT3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19pcG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19pbXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19pdHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19faWZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19pbW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19faWFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19pc3ViX18nLFxuXG4gICAgJ19fb3JfXycgICAgIDogJ19faW9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX2lhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19faXhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19pbHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX2lyc2hpZnRfXycsXG59XG5cblxuZXhwb3J0IGNvbnN0IGpzb3AycHlvcCA9IHtcbiAgICAnKionOiAncG93JyxcbiAgICAnKicgOiAnbXVsJyxcbiAgICAnLycgOiAndHJ1ZWRpdicsXG4gICAgJy8vJzogJ2Zsb29yZGl2JyxcbiAgICAnJScgOiAnbW9kJyxcbiAgICBcbiAgICAnKycgIDogJ2FkZCcsXG4gICAgJy0nICA6ICdzdWInLFxuICAgICd1Li0nOiAnbmVnJyxcblxuICAgICc9PScgOiAnZXEnLFxuICAgICchPScgOiAnbmUnLFxuICAgICc8JyAgOiAnbHQnLFxuICAgICc8PScgOiAnbGUnLFxuICAgICc+PScgOiAnZ2UnLFxuICAgICc+JyAgOiAnZ3QnLFxuXG4gICAgJ34nIDogJ25vdCcsXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWychJywgJysrJywgJy0tJywgJ34nLCAndS4tJ10sXG4gICAgWycqKiddLCAvLyByaWdodCB0byBsZWZ0ICFcbiAgICBbJyonLCAnLycsICclJ10sIC8vIFB5dGhvbiBhbHNvIGhhcyAvL1xuICAgIFsnKycsICctJ10sXG4gICAgWyc8PCcsICc+PicsICc+Pj4nXSwgLy9UT0RPXG4gICAgWyc8JywgJzw9JywgJz49JywgJz4nXSxcbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJyYnXSwgIC8vVE9ET1xuICAgIFsnXiddLCAgLy9UT0RPXG4gICAgWyd8J10sICAvL1RPRE9cbiAgICBbJyYmJ10sIC8vVE9ET1xuICAgIFsnfHwnLCAnPz8nXSxcbiAgICBbJz0nXSAvKiBldCB0b3VzIGxlcyBkw6lyaXbDqXMgKi8gLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgLy8gZXRjLlxuXTtcblxuLypcbmh0dHBzOi8vZG9jcy5weXRob24ub3JnLzMvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNjYWxsYWJsZVxuXG4tPiBjbGFzc2VzXG5ib29sKClcbmZsb2F0KClcbmludCgpXG5zdHIoKVxuYnl0ZWFycmF5KCkgW1VpbnQ4QXJyYXldIChSVylcbmJ5dGVzKCkgICAgIFs/XSAgICAgICAgICAoUk8pIDwtIG5vIHR5cGVzIGluIEpTLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LSBVaW50OEFycmF5IHdpdGggZmxhZyA/IGZyZWV6ZSgpIFtKUyB1bnNhZmVdXG4gICAgICAgICAgICBiXCJlXFx4RkZcIiBpbnN0ZWFkIG9mIFsxMDEsMTAxXSwgZXRjLiAoMzIgPD0gYnl0IDw9IDEyNilcbnR5cGUoKVxubGlzdCgpICAgICAgW0FycmF5XVxudHVwbGUoKSAgICAgW09iamVjdC5mcm96ZW4oQXJyYXkpXVxuXG5zZXQoKSAgICAgICAvLyByZWxpZXMgb24gaGFzaCgpLi4uID0+IHNldFtsaXRlcmFsc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBzZXQoKSAvIDwtIEpTIHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgPT4gYnl0ZXMvYnl0ZWFycmF5L2V0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IFNldCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IEludGVybmFsIGtleXMoKSBzZXQgW3JlY29tcHV0ZSBoYXNoIHdoZW4gYWRkL3JlbW92ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbnRlcm5hbGx5IHN0b3JlZCBhcyBNYXAoaGFzaCwgdmFsdWUpICg/KVxuZnJvemVuc2V0KCkgICAgICAgICAgICA9PiBleHRlbmRzIHNldCB0byByZXBsYWNlIG1vZGlmaWVycy5cblxuZGljdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3N0cl0gYXMgT2JqZWN0LmNyZWF0ZShudWxsKSArIChhbmQgcHVyZSBKU09iaiBhcyBkaWN0W3N0cl0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBNYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IFNldChoYXNoKSAvIE1hcChoYXNoLCBrZXkpIC8gTWFwKGtleSwgaGFzaCkgPz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldC9zZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gTWFwKGtleSwgdmFsdWUpXG5cbm9iamVjdCgpXG5jb21wbGV4KClcbm1lbW9yeXZpZXcoKSAgICAgICAgICAgID0+IEFycmF5QnVmZmVyID9cblxuLT4gcHJpbnRcbmFzY2lpKClcbmJpbigpXG5oZXgoKVxub2N0KClcbnJlcHIoKVxuaGFzaCgpXG5cbi0+IG1hdGhzXG5hYnMoKVxuZGl2bW9kKClcbnBvdygpXG5yb3VuZCgpXG5cbi0+IGxpc3RzXG5hbGwoKVxuYW55KClcbmZpbHRlcigpXG5tYXAoKVxubWF4KClcbm1pbigpXG5zdW0oKVxubGVuKClcbmVudW1lcmF0ZSgpXG5yZXZlcnNlZCgpXG5zbGljZSgpXG5zb3J0ZWQoKVxuemlwKClcblxuLT4gaXRlclxucmFuZ2UoKVxuYWl0ZXIoKVxuaXRlcigpXG5hbmV4dCgpXG5uZXh0KClcblxuLT4gc3RyXG5vcmQoKVxuY2hyKClcbmZvcm1hdCgpXG5wcmludCgpXG5mXCJcIlxuXG5jYWxsYWJsZSgpXG5jbGFzc21ldGhvZCgpXG5zdGF0aWNtZXRob2QoKVxucHJvcGVydHkoKVxuc3VwZXIoKVxuaXNpbnN0YW5jZSgpXG5pc3N1YmNsYXNzKClcbmRlbGF0dHIoKVxuZ2V0YXR0cigpXG5oYXNhdHRyKClcbnNldGF0dHIoKVxuZGlyKClcblxuZXZhbCgpXG5leGVjKClcbmNvbXBpbGUoKVxuYnJlYWtwb2ludCgpXG5cbmdsb2JhbHMoKVxubG9jYWxzKClcbnZhcnMoKVxuX19pbXBvcnRfXygpXG5cbmlkKClcbiAgICAtPiBvbi1kZW1hbmQgd2Vha3JlZiA/XG5cbmhlbHAoKVxuaW5wdXQoKVxub3BlbigpXG5cbiovXG5cbi8qXG51bmFyeVxuLSBwb3MgKHVuYXJ5ICspXG5cbi0gYm9vbFxuLSBmbG9hdFxuLSBpbnRcbi0gc3RyXG4tIHJlcHJcblxuLSBhYnNcbi0gY2VpbFxuLSBmbG9vclxuLSByb3VuZFxuLSB0cnVuY1xuXG5iaW5hcnlcbi0gcG93L3Jwb3dcbi0gZGl2bW9kL3JkaXZtb2RcblxuY2xhc3Ncbi0gY2xhc3Ncbi0gbmV3XG4tIGluaXRcbi0gaW5pdF9zdWJjbGFzc1xuXG4tIHN1YmNsYXNzaG9vayAvLyBfX2lzaW5zdGFuY2VjaGVja19fIFxuXG4tIGRpclxuLSBkZWxhdHRyXG4tIHNldGF0dHJcbi0gZ2V0YXR0cmlidXRlXG5cbi0gZG9jXG4tIGZvcm1hdFxuLSBnZXRuZXdhcmdzXG4tIGhhc2hcbi0gaW5kZXggKD8pXG4tIHNpemVvZlxuKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gSW50Mk51bWJlcihhOiBBU1ROb2RlLCB0YXJnZXQgPSBcImZsb2F0XCIpIHtcblxuICAgIGlmKCBhLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX211bF9fJyB8fCBhLnZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gYS5jaGlsZHJlblsxXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgaWYoICAgIChsdHlwZSA9PT0gU1R5cGVfaW50IHx8IGx0eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICYmIChydHlwZSA9PT0gU1R5cGVfaW50IHx8IHJ0eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX25lZ19fJyAmJiBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCB0YXJnZXQgPT09IFwiZmxvYXRcIiApXG4gICAgICAgIHJldHVybiByYE51bWJlcigke2F9KWA7XG5cbiAgICAvLyBpbnQgLT4ganNpbnQgY2FzdCBpcyBmYWN1bHRhdGl2ZS4uLlxuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTnVtYmVyMkludChhOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSAnaW50JztcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IFwiaW50XCI7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gSlNPcGVyYXRvcnMubGVuZ3RoIC0gaTtcbiAgICBmb3IobGV0IG9wIG9mIEpTT3BlcmF0b3JzW2ldKVxuICAgICAgICBKU09wZXJhdG9yc1ByaW9yaXR5W29wXSA9IHByaW9yaXR5O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlZF9vcGVyYXRvcjxUIGV4dGVuZHMga2V5b2YgdHlwZW9mIEJpbmFyeU9wZXJhdG9ycz4ob3A6IFQpIHtcbiAgICByZXR1cm4gQmluYXJ5T3BlcmF0b3JzW29wXTtcbn1cblxuY29uc3QgTEVGVCAgPSAxO1xuY29uc3QgUklHSFQgPSAyO1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCAuLi52YWx1ZXM6IEFTVE5vZGVbXSkge1xuXG4gICAgY29uc3QgZmlyc3QgPSB2YWx1ZXNbMF07XG4gICAgaWYoZmlyc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVHxSSUdIVDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICBpZihsYXN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2ZpcnN0fWA7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGg7ICsraSlcbiAgICAgICAgcmVzdWx0ID0gcmAke3Jlc3VsdH0gJiYgJHt2YWx1ZXNbaV19YDtcblxuICAgIGlmKCBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZF9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpIHtcbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgIH1cblxuICAgIHJldHVybiByYCR7YX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZXxhbnksIG9wOiBzdHJpbmcsIGI6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgaWYoYiBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGIgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGIgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHthfSR7b3B9JHtifWA7XG5cbiAgICBpZiggY2hlY2tfcHJpb3JpdHkgJiYgXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB1bmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIGE6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGxldCByZXN1bHQgPSByYCR7b3B9JHthfWA7XG5cbiAgICBpZihvcCA9PT0gJy0nKVxuICAgICAgICBvcCA9ICd1Li0nO1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG5cbiAgICBpZiggY2hlY2tfcHJpb3JpdHkgJiYgXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggKGRpcmVjdGlvbiAmIExFRlQpICYmIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxudHlwZSBHZW5VbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfc2VsZiAgID86IChzOiBhbnkpID0+IGFueSxcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMocmV0X3R5cGUgIDogU1R5cGVPYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzICAgICAgIDogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSAoYSkgPT4gYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuVW5hcnlPcHNfT3B0cyA9IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiByZXRfdHlwZTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJ3UuLScpXG4gICAgICAgICAgICBvcCA9ICctJztcblxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwgPz89IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5CaW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X290aGVyICAgPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIChub2RlOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyAgICA9IG5vZGUucmVzdWx0X3R5cGUhLl9fbmFtZV9fO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb252ZXJ0W3NyY107XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IGltcHJvdmU6XG4gICAgICAgIGlmKCBzcmMgPT09IFwiaW50XCIpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBcImludFwiIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufVxuXG5jb25zdCBpZEZjdCA9IDxUPihhOiBUKSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKHJldF90eXBlOiBTVHlwZU9iaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IFNUeXBlT2JqW10sIFxuICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBpZEZjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuQmluYXJ5T3BzX09wdHMgPSB7fSkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyByZXRfdHlwZSA6IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IGlkRmN0ICYmIHN1YnN0aXR1dGVfY2FsbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5DbXBPcHMoICBvcHMgICAgICAgOiByZWFkb25seSAoa2V5b2YgdHlwZW9mIHJldmVyc2UpW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdHlwZTogcmVhZG9ubHkgU1R5cGVPYmpbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBpZEZjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9ICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyBTVHlwZV9ib29sIDogU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY29wID0gb3A7XG5cbiAgICAgICAgICAgIGxldCBhID0gY29udmVydF9zZWxmKHNlbGYpO1xuICAgICAgICAgICAgbGV0IGIgPSBjb252X290aGVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCByZXZlcnNlZCApIHtcbiAgICAgICAgICAgICAgICBbYSxiXcKgPSBbYixhXTtcbiAgICAgICAgICAgICAgICBjb3AgPSByZXZlcnNlW2NvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBjb3BbMF0gPT09ICc9JyB8fCBjb3BbMF0gPT09ICchJyApIHtcbiAgICAgICAgICAgICAgICBpZiggc2VsZi5yZXN1bHRfdHlwZSA9PT0gb3RoZXIucmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIGNvcCA9IGNvcCArICc9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsIGNvcCwgYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252X290aGVyKG8pICk7IC8vVE9ETy4uLlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludCc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZSc7IiwiaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG5jb25zdCBfbmFtZTJTVHlwZTogUmVjb3JkPHN0cmluZyxTVHlwZU9iaj4gPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1R5cGU8VCBleHRlbmRzIFNUeXBlT2JqPihuYW1lOiBzdHJpbmcpOiBUIHtcbiAgICByZXR1cm4gKF9uYW1lMlNUeXBlW25hbWVdID8/PSB7X19uYW1lX186IG5hbWV9KSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU1R5cGUobmFtZTogc3RyaW5nLCB0eXBlOiBPbWl0PFNUeXBlT2JqLCAnX19uYW1lX18nPikge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBnZXRTVHlwZShuYW1lKSwgdHlwZSApO1xufVxuXG5leHBvcnQgY29uc3QgU1R5cGVfaW50ICAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJpbnRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfanNpbnQgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJqc2ludFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9mbG9hdCAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImZsb2F0XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2Jvb2wgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiYm9vbFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9zdHIgICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcInN0clwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9Ob25lVHlwZSAgICAgICAgICAgPSBnZXRTVHlwZShcIk5vbmVUeXBlXCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSA9IGdldFNUeXBlKFwiTm90SW1wbGVtZW50ZWRUeXBlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuLy8gZGVjbGFyZSBhbGwgYnVpbHRpbiB0eXBlcy4uLlxuaW1wb3J0ICcuL3N0cnVjdHMvU1R5cGVCdWlsdGluJztcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiY3Vyc29yIiwibGluZSIsImxpbmVfb2Zmc2V0IiwianNjb2RlIiwianNjb2RlX2N1cnNvciIsImNvbCIsImxlbmd0aCIsIm5ld19qc2NvZGUiLCJmaWxlbmFtZSIsImluZGVudCIsImN1cl9pbmRlbnRfbGV2ZWwiLCJjdXJfaW5kZW50IiwiTkwiLCJ0b1N0cmluZyIsIkJCIiwiQkUiLCJzbGljZSIsInIiLCJhcmdzIiwid3IiLCJ3Iiwid3QiLCJzdHIiLCJpIiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwic3RhcnQiLCJ3cml0ZSIsImVuZCIsImFzdDJqcyIsImFzdCIsImJvZHkiLCJjaGlsZHJlbiIsImNvbnZlcnRfbm9kZSIsImxpc3QyYXN0bm9kZSIsImNvbnZlcnQiLCJub2RlIiwiY29udGV4dCIsImxpbmVzIiwiYnJ5dGhvbl9uYW1lIiwiYmFzZSIsInZhbHVlIiwiQ29udGV4dCIsImxvY2FsX3N5bWJvbHMiLCJuYW1lIiwiX19uYW1lX18iLCJiYXNlcyIsIkVycm9yIiwiX2NvbnRleHQiLCJOdW1iZXIySW50IiwiaWR4IiwidHlwZSIsImJlZyIsImluY3IiLCJsaXN0IiwiU1R5cGVfaW50IiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwidGVzdCIsImN1ciIsIm9yZWxzZSIsInB1c2giLCJjb25kIiwiaWZfdHJ1ZSIsImlmX2ZhbHNlIiwiYm9keV90cnVlIiwiYm9keV9mYWxzZSIsInJlc3VsdF90eXBlIiwiaGFuZGxlcnMiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImUiLCJpbmNsdWRlcyIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJub2RlcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9yYXdfZXJyXyIsInN0YWNrX3N0ciIsInB5Y29kZSIsImV4Y2VwdGlvbl9zdHIiLCJqb2luIiwibG9nIiwiZ2V0X3B5X2V4Y2VwdGlvbiIsIl9fU0JSWVRIT05fXyIsIl9lcnJfIiwiX2JfIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiX3JfIiwiSlNFeGNlcHRpb24iLCJiaW5hcnlfanNvcCIsIl9hcmdzIiwiU1R5cGVfZmN0IiwibWV0YSIsIl9fY2FsbF9fIiwia3dfc3RhcnQiLCJpZHhfZW5kX3BvcyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwiaWR4X3ZhcmFyZyIsImt3YXJncyIsImxhc3QiLCJ3cml0ZV9hcmciLCJjb252ZXJ0X2FyZ3MiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJhcmdzX3BvcyIsImFyZ3NfbmFtZXMiLCJ0b3RhbF9hcmdzIiwicG9zb25seWFyZ3MiLCJrd29ubHlhcmdzIiwicG9zX2RlZmF1bHRzIiwiZGVmYXVsdHMiLCJwb3Nvbmx5IiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwib2Zmc2V0IiwibmJfcG9zX2RlZmF1bHRzIiwiTWF0aCIsIm1pbiIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJoYXNfa3ciLCJ2aXJ0X25vZGUiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImRlZnZhbCIsImFubm90YXRpb24iLCJjaGlsZCIsInByaW50X29iaiIsIm9iaiIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJkYXRhIiwic2VwIiwiZGVmYXVsdF9jYWxsIiwia3dfcG9zIiwibmJfcG9zIiwibWF4IiwicG9zX3NpemUiLCJrdyIsImN1dG9mZiIsImhhc19rd2FyZ3MiLCJzdWJzdGl0dXRlX2NhbGwiLCJmY3RfdHlwZSIsInJldF90eXBlIiwicmV0dXJuX3R5cGUiLCJrZXl3b3JkcyIsImdldFNUeXBlIiwiU1R5cGVfTm9uZVR5cGUiLCJmY3RfcmV0dXJuX3R5cGUiLCJsYXN0X3R5cGUiLCJpbXBsX3JldHVybiIsInJldHVybnMiLCJmYWtlX25vZGUiLCJyZXQiLCJhc3NlcnQiLCJhc25hbWUiLCJtb2R1bGUiLCJuYW1lcyIsImV4YyIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIlJVTlRJTUVfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiUlVOVElNRV8xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJSVU5USU1FXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJBU1RfQ09OVkVSVF8yNiIsIkFTVDJKU18yNiIsIlJVTlRJTUVfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJBU1RfQ09OVkVSVF8zMCIsIkFTVDJKU18zMCIsIkFTVF9DT05WRVJUXzMxIiwiQVNUMkpTXzMxIiwiQVNUX0NPTlZFUlRfMzIiLCJBU1QySlNfMzIiLCJSVU5USU1FXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiQVNUX0NPTlZFUlRfMzYiLCJBU1QySlNfMzYiLCJBU1RfQ09OVkVSVF8zNyIsIkFTVDJKU18zNyIsIkFTVF9DT05WRVJUXzM4IiwiQVNUMkpTXzM4IiwiQVNUX0NPTlZFUlRfMzkiLCJBU1QySlNfMzkiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJSVU5USU1FIiwiYXNzaWduIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiYWRkU1R5cGUiLCJTVHlwZV9ib29sIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJTVHlwZV9mbG9hdCIsIlNUeXBlX2pzaW50IiwiU1R5cGVfc3RyIiwiZmxvYXQyc3RyIiwiZiIsInRvRXhwb25lbnRpYWwiLCJzaWduX2lkeCIsImdlbkJpbmFyeU9wcyIsImdlblVuYXJ5T3BzIiwiSW50Mk51bWJlciIsIlNUeXBlX3R5cGVfZmxvYXQiLCJvdGhlciIsIm90aGVyX3R5cGUiLCJtZXRob2QiLCJfX2ludF9fIiwiX19zdHJfXyIsImNvbnZlcnRfb3RoZXIiLCJzZWxmIiwic3VmZml4IiwiYXMiLCJyZWFsX3R5cGUiLCJpZF9qc29wIiwidW5hcnlfanNvcCIsIlNUeXBlX3R5cGVfaW50IiwiYSIsImIiLCJvcHRpIiwiY29udmVydF9zZWxmIiwicyIsIlNUeXBlX3R5cGVfc3RyIiwiZW5kc1dpdGgiLCJyaWdodF9ub2RlIiwicmNoaWxkIiwicmlnaHQiLCJyaWdodF90eXBlIiwiaXNNdWx0aVRhcmdldCIsInRhcmdldHMiLCJsZWZ0cyIsImxlZnQiLCJsZWZ0X3R5cGUiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUiLCJvcCIsImJuYW1lMnB5bmFtZSIsImF0dHIiLCJyZXZlcnNlZF9vcGVyYXRvciIsImZsb29yZGl2X2Zsb2F0IiwiZmxvb3IiLCJmbG9vcmRpdl9pbnQiLCJyZXN1bHQiLCJtb2RfZmxvYXQiLCJtb2QiLCJtb2RfaW50IiwibXVsdGlfanNvcCIsImJuYW1lMmpzb3AiLCJmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUiLCJyZXZlcnNlZCIsInJ0eXBlIiwibHR5cGUiLCJqc29wIiwib3BzIiwicmlnaHRzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZXhwciIsImVsdHMiLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImJyeXRob25fbm9kZSIsImVycm9yIiwicGFyZW50X2NvbnRleHQiLCJjcmVhdGUiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsInRvSlMiLCJhc3QyanNfbGl0ZXJhbHNfaW50IiwicGFyc2VOdW1iZXIiLCJhc3QyanNfbGl0ZXJhbHNfc3RyIiwicGFyc2VTdHJpbmciLCJwYXJzZVRva2VuIiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiZXhwb3J0ZWQiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJKU09wZXJhdG9yc1ByaW9yaXR5IiwicHJpb3JpdHkiLCJMRUZUIiwiUklHSFQiLCJmaXJzdCIsInBhcmVudF9vcCIsInBhcmVudF9vcF9kaXIiLCJkaXJlY3Rpb24iLCJjdXJfcHJpb3JpdHkiLCJwYXJlbnRfcHJpb3JpdHkiLCJjaGVja19wcmlvcml0eSIsIm8iLCJweW9wIiwiZ2VuZXJhdGVDb252ZXJ0Iiwic3JjIiwiaWRGY3QiLCJjb252X290aGVyIiwiY3MiLCJyY3MiLCJyZXZlcnNlIiwiY29wIiwiX25hbWUyU1R5cGUiLCJweTJhc3RfZmFzdCJdLCJzb3VyY2VSb290IjoiIn0=