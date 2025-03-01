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
/* harmony export */   CURSOR: () => (/* binding */ CURSOR),
/* harmony export */   NL: () => (/* binding */ NL),
/* harmony export */   ast2js: () => (/* binding */ ast2js),
/* harmony export */   jscode: () => (/* binding */ jscode),
/* harmony export */   r: () => (/* binding */ r),
/* harmony export */   set_js_cursor: () => (/* binding */ set_js_cursor),
/* harmony export */   set_py_code: () => (/* binding */ set_py_code),
/* harmony export */   set_py_code_from_list: () => (/* binding */ set_py_code_from_list),
/* harmony export */   set_py_from_beg: () => (/* binding */ set_py_from_beg),
/* harmony export */   set_py_from_end: () => (/* binding */ set_py_from_end),
/* harmony export */   w: () => (/* binding */ w),
/* harmony export */   wr: () => (/* binding */ wr),
/* harmony export */   wt: () => (/* binding */ wt)
/* harmony export */ });
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");



const CURSOR = new dop__WEBPACK_IMPORTED_MODULE_1__.ARRAY_TYPE(2);
let jscode;
function set_js_cursor(idx) {
    dop__WEBPACK_IMPORTED_MODULE_1__.JS_CODE[idx + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_LINE] = CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_LINE];
    dop__WEBPACK_IMPORTED_MODULE_1__.JS_CODE[idx + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_COL] = jscode.length - CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_COL];
}
function set_py_code_from_list(offset, brython_node) {
    const beg = brython_node[0];
    const end = brython_node[brython_node.length - 1];
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_LINE] = beg.lineno;
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_COL] = beg.col_offset;
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_LINE] = end.end_lineno;
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_COL] = end.end_col_offset;
}
function set_py_from_beg(src_offset, dst_offset) {
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_LINE] = dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[dst_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_LINE];
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_COL] = dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[dst_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_COL];
}
function set_py_from_end(src_offset, dst_offset) {
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_LINE] = dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[dst_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_LINE];
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_COL] = dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[dst_offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_COL];
}
function set_py_code(offset, brython_node) {
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_LINE] = brython_node.lineno;
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG_COL] = brython_node.col_offset;
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_LINE] = brython_node.end_lineno;
    dop__WEBPACK_IMPORTED_MODULE_1__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END_COL] = brython_node.end_col_offset;
}
function new_jscode(filename) {
    jscode = `//# sourceURL=${filename}\n`;
    jscode += `const {_r_, _b_} = __SBRYTHON__;\n`;
    CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_LINE] = 3;
    CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_COL] = jscode.length;
}
let indent = "    ";
let cur_indent_level = 0;
//let cur_indent = "";
const indents = [
    "",
    "",
    indent,
    indent += indent,
    indent += indent,
    indent += indent,
    indent += indent,
    indent += indent,
    indent += indent,
    indent += indent,
    indent += indent,
    indent += indent
];
const NL = {
    toString: function() {
        ++CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_LINE];
        CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_COL] = jscode.length + 1;
        return "\n" + indents[cur_indent_level];
    }
};
const BB = {
    toString: function() {
        return indents[++cur_indent_level];
    }
};
const BE = {
    toString: function() {
        return indents[--cur_indent_level];
    }
};
// transforms into a template string
function r(...args) {
    return args;
}
// write a template string
function wr(args) {
    if (typeof args === "string") return w(args);
    return wt(...args);
}
// write with template string wt``
function wt(str, ...args) {
    for(let i = 0; i < args.length; ++i){
        jscode += str[i];
        w(args[i]);
    }
    jscode += str[args.length];
}
// generic write ?
function w(...args) {
    for(let i = 0; i < args.length; ++i){
        let arg = args[i];
        if (Array.isArray(arg)) {
            wr(arg);
            continue;
        }
        if (!(arg instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__.ASTNode)) {
            if (arg === undefined) arg = "undefined";
            if (arg === null) arg = "null";
            jscode += arg.toString();
            continue;
        }
        const offset = 4 * arg.id;
        set_js_cursor(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG);
        core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST2JS[arg.type_id](arg);
        set_js_cursor(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END);
    }
}
function ast2js(ast) {
    new_jscode(ast.filename);
    w(ast.body);
    // TODO: better export strategy (?)
    jscode += `\nconst __exported__ = {};\n`;
    //console.warn(jscode);
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.BB);
    for(let i = 0; i < node.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, node.children[i]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const lines = new Array(node.length);
    for(let i = 0; i < node.length; ++i)lines[i] = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node[i], context);
    for(let i = 0; i < lines.length; ++i){
        if (lines[i].type !== "functions.def") continue;
        const meta = lines[i].result_type.__call__;
        if (meta.generate !== undefined) meta.return_type(); // meh.
    }
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.BODY, 0, lines);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code_from_list)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    let base = "_r_.object";
    let body = node.children[0];
    if (node.children.length === 2) {
        base = node.children[0];
        body = node.children[1];
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`class ${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]} extends ${base} {${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");






function convert(node, context) {
    context.local_symbols[node.name] = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_5__.getSTypeID)(node.name);
    context = new py2ast__WEBPACK_IMPORTED_MODULE_3__.Context("class", context);
    if (node.bases.length > 1) throw new Error('Not implemented');
    let children = node.bases.length === 1 ? [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.bases[0], context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.body, context)
    ] : [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.body, context)
    ];
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CLASS_CLASSDEF, 0, children);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.name;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
}
convert.brython_name = "ClassDef";


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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const idx = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    const body = node.children[node.children.length - 1];
    const list = node.children[0];
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");





function convert(node, context) {
    if (node.iter.constructor.$name === "Call" && node.iter.func.id === "range") return;
    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_FOR, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.iter, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.body, context)
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = target;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
}
convert.brython_name = "For";


/***/ }),

/***/ "./src/core_modules/controlflows/for_range/ast2js.ts":
/*!***********************************************************!*\
  !*** ./src/core_modules/controlflows/for_range/ast2js.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");



function ast2js(node) {
    const idx = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    const body = node.children[node.children.length - 1];
    let beg = "0n";
    let incr = "1n";
    let end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(node.children[0]);
    if (node.children.length > 2) {
        beg = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(node.children[0]);
        end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(node.children[1]);
    }
    if (node.children.length > 3) incr = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(node.children[2]);
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`for(var ${idx} = ${beg}; ${idx} < ${end}; ${idx} += ${incr}){${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
}


/***/ }),

/***/ "./src/core_modules/controlflows/for_range/astconvert.ts":
/*!***************************************************************!*\
  !*** ./src/core_modules/controlflows/for_range/astconvert.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");






function convert(node, context) {
    if (node.iter.constructor.$name !== "Call" || node.iter.func.id !== "range") return undefined;
    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO
    // TODO: jsint opti if this.value not used...
    context.local_symbols[node.value] = structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_INT;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_FOR_RANGE, 0, [
        ...node.iter.args.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(n, context)),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.body, context)
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = target;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    // if
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`if(${node.children[0]}){${node.children[1]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    // else if
    let i;
    for(i = 2; i < node.children.length - 1; i += 2){
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`else if(${node.children[i]}){${node.children[i + 1]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    }
    // else
    if (i === node.children.length - 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`else {${node.children[i]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    // if
    const children = [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.test, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.body, context)
    ];
    // else if
    let cur = node;
    while("orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]){
        cur = cur.orelse[0];
        children.push((0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(cur.test, context), (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(cur.body, context));
    }
    // else
    if ("orelse" in cur && cur.orelse.length !== 0) children.push((0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(cur.orelse, context));
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_IFBLOCK, 0, children);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    const cond = node.children[0];
    const if_true = node.children[1];
    const if_false = node.children[2];
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.test, context);
    const body_true = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.body, context);
    const body_false = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.orelse, context);
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_TERNARY, body_true.result_type, [
        cond,
        body_true,
        body_false
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`try {${node.children[0]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`catch(_raw_err_){${ast2js__WEBPACK_IMPORTED_MODULE_0__.BB}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");
    if (node.children.length > 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[1]);
    for(let i = 2; i < node.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, "else ", node.children[i]);
    // not a catch all...
    if (node.children[node.children.length - 1].children.length !== 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, "else { throw _raw_err_ }");
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const children = new Array(node.handlers.length + 1);
    // try body
    children[0] = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.body, context);
    for(let i = 0; i < node.handlers; ++i)children[i + 1] = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.handlers[i], context);
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_TRYBLOCK, 0, children);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    // else is handled by tryblock
    if (node.children.length === 1) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`{${node.children[0]},${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`if(${node.children[0]}){${node.children[1]}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");





function convert(node, context) {
    let children;
    if (node.type !== undefined) {
        children = [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.type, context),
            (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.body, context)
        ];
    } else {
        children = [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.body, context)
        ];
    }
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_TRYBLOCK_CATCH, 0, children);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.name;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function filter_stack(stack) {
    return stack.filter((e)=>e.includes('brython_')); //TODO improves...
}
//TODO: use ~=sourcemap...
function find_astnode_from_jscode_pos(nodes, line, col) {
    //TODO...
    /*
  for(let i = 0; i < nodes.length; ++i) {

      if( nodes[i].jscode!.start.line > line
      || nodes[i].jscode!.start.line === line && nodes[i].jscode!.start.col > col)
          return null;

      if(    nodes[i].jscode!.end.line > line
          || nodes[i].jscode!.end.line === line && nodes[i].jscode!.end.col > col
      ) {
          let node = find_astnode_from_jscode_pos(nodes[i].children, line, col);
          if( node !== null)
              return node;
          return nodes[i];
      }
  }
*/ return null; //throw new Error("node not found");
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
            if (node.type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.SYMBOL) col += dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id].length; // V8 gives first character of the symbol name when FF gives "("...
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
    // nodes[i].pycode.start.line
    const stack_str = stack.map((l, i)=>`File "[file]", line ${0}, in ${stack[i][0]}`);
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

function ast2js(node) {
    const cond = node.children[0];
    const body = node.children[1];
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.CONTROLFLOWS_WHILE, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.test, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.body, context)
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var _astconvert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./astconvert */ "./src/core_modules/functions/args/astconvert.ts");





function ast2js(node) {
    const args = node;
    const _args = args.children;
    const SType_fct = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[args.id];
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
    const offset = 4 * node.id;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END);
    const name = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    if (node.type_id === _astconvert__WEBPACK_IMPORTED_MODULE_4__.FUNCTIONS_ARGS_VARG) {
        if (node.last) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`...${name}`;
        else (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, name, '=', "[]"));
    } else if (node.type_id === _astconvert__WEBPACK_IMPORTED_MODULE_4__.FUNCTIONS_ARGS_KWARG) {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, name, '=', "{}"));
    } else if (node.children.length === 1) {
        let value = node.children[0];
        if (value.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT && node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT) value = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(value);
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, name, '=', value));
    } else {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(name);
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END);
}


/***/ }),

/***/ "./src/core_modules/functions/args/astconvert.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/functions/args/astconvert.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FUNCTIONS_ARGS_KWARG: () => (/* binding */ FUNCTIONS_ARGS_KWARG),
/* harmony export */   FUNCTIONS_ARGS_KWONLY: () => (/* binding */ FUNCTIONS_ARGS_KWONLY),
/* harmony export */   FUNCTIONS_ARGS_POS: () => (/* binding */ FUNCTIONS_ARGS_POS),
/* harmony export */   FUNCTIONS_ARGS_POSONLY: () => (/* binding */ FUNCTIONS_ARGS_POSONLY),
/* harmony export */   FUNCTIONS_ARGS_VARG: () => (/* binding */ FUNCTIONS_ARGS_VARG),
/* harmony export */   convert_arg: () => (/* binding */ convert_arg),
/* harmony export */   convert_args: () => (/* binding */ convert_args),
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dop */ "./src/dop.ts");





//TODO: fake node...
function convert() {
    // args node doesn't exist...
    return;
}
const FUNCTIONS_ARGS_POSONLY = 0;
const FUNCTIONS_ARGS_KWARG = 1;
const FUNCTIONS_ARGS_KWONLY = 2;
const FUNCTIONS_ARGS_VARG = 3;
const FUNCTIONS_ARGS_POS = 4;
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
        const arg = convert_arg(posonly[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POSONLY, context);
        context.local_symbols[posonly[i].arg] = arg.result_type;
        args[i] = arg;
    }
    // pos
    let offset = posonly.length;
    doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i){
        const arg = convert_arg(pos[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POS, context);
        const name = pos[i].arg;
        context.local_symbols[name] = arg.result_type;
        args_names[offset] = name;
        args[offset++] = arg;
    }
    meta.idx_vararg = offset;
    // vararg
    if (has_vararg) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;
        const arg = convert_arg(_args.vararg, undefined, FUNCTIONS_ARGS_VARG, context);
        context.local_symbols[_args.vararg.arg] = arg.result_type;
        args[offset++] = arg;
    } else {
        meta.idx_end_pos = offset;
        const nb_pos_defaults = Math.min(pos_defaults.length, pos.length);
        const has_others = pos_defaults.length > pos.length || args.length !== offset;
        if (nb_pos_defaults > 1 || nb_pos_defaults === 1 && has_others) meta.idx_end_pos -= nb_pos_defaults;
    }
    let cut_off = meta.idx_end_pos;
    if (cut_off === Number.POSITIVE_INFINITY) cut_off = meta.idx_vararg;
    for(let i = posonly.length; i < cut_off; ++i)args_pos[dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[args[i].id]] = i;
    const end = meta.idx_vararg - cut_off;
    for(let i = 0; i < end; ++i)args_pos[dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[args[i].id]] = -1;
    //TODO: idx_end_pos (if default and no idx_vararg)
    // kwonly
    const kwonly = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;
    meta.has_kw = meta.idx_vararg !== cut_off || kwonly.length !== 0;
    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i){
        const arg = convert_arg(kwonly[i], kw_defaults[i], FUNCTIONS_ARGS_KWONLY, context);
        const name = kwonly[i].arg;
        context.local_symbols[name] = arg.result_type;
        args_pos[name] = -1;
        args[offset++] = arg;
    }
    // kwarg
    if (has_kwarg) {
        const arg = convert_arg(_args.kwarg, undefined, FUNCTIONS_ARGS_KWARG, context);
        const name = _args.kwarg.arg;
        context.local_symbols[name] = arg.result_type;
        args[offset++] = arg;
        meta.kwargs = name;
    }
    //TODO...
    /*
    if( context.type === "class")
        _args = _args.slice(1);
    */ //TODO...
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_2__.FUNCTIONS_ARGS, 0, args);
    ast.type_id = core_modules_lists__WEBPACK_IMPORTED_MODULE_2__.FUNCTIONS_ARGS;
    dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[ast.id] = SType_fct;
    const py_offset = 4 * ast.id;
    if (args.length !== 0) {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_3__.set_py_from_beg)(4 * args[0].id, py_offset);
        (0,ast2js__WEBPACK_IMPORTED_MODULE_3__.set_py_from_end)(4 * args[args.length - 1].id, py_offset);
    } else {
        // an estimation...
        const col = node.col_offset + 4 + node.name.length + 1;
        dop__WEBPACK_IMPORTED_MODULE_4__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_4__.CODE_BEG_LINE] = dop__WEBPACK_IMPORTED_MODULE_4__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_4__.CODE_END_LINE] = node.lineno;
        dop__WEBPACK_IMPORTED_MODULE_4__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_4__.CODE_BEG_COL] = dop__WEBPACK_IMPORTED_MODULE_4__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_4__.CODE_END_COL] = col;
    }
    return ast;
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
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(type, result_type, children);
    dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[ast.id] = node.arg;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_3__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");



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
    const meta = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[node.id].__call__;
    let kw_pos = node.children.length;
    for(let i = 1; i < node.children.length; ++i)if (node.children[i].type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.FUNCTIONS_CALL_KEYWORD) {
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
        const name = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[arg.id];
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
function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[node.id].__call__.substitute_call(node));
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");






function convert(node, context) {
    const name = node.func.id;
    const fct_type = context.local_symbols[name];
    if (fct_type === undefined) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }
    const fct = structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STypes[fct_type];
    const ret_type = fct.__call__.return_type();
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.FUNCTIONS_CALL, ret_type, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.func, context),
        ...node.args.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(e, context)),
        ...node.keywords.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(e, context))
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = fct;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[0]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");





function convert(node, context) {
    const value = (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.value, context);
    const ret_type = value.result_type;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.FUNCTIONS_CALL_KEYWORD, ret_type, [
        value
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.arg;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const name = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    const args = node.children[0];
    const body = node.children[1];
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dop */ "./src/dop.ts");








// required as some symbols may have been declared out of order
// (not only for return type computation)
function generate(node, astnode, context) {
    // fuck...
    const stype = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[astnode.result_type];
    const meta = stype.__call__;
    // new context for the function local variables
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    context.parent_node_context = astnode; // <- here
    // fake the node... => better doing here to not have context issues.
    const args = (0,_args_astconvert__WEBPACK_IMPORTED_MODULE_4__.convert_args)(node, stype, context);
    for (let arg of args.children)context.local_symbols[dop__WEBPACK_IMPORTED_MODULE_7__.VALUES[arg.id]] = arg.result_type;
    // tell body this function has been generated.
    meta.generate = undefined;
    // prevents recursive calls or reaffectation.
    meta.return_type = undefined;
    const annotation = node.returns?.id;
    if (annotation !== undefined) {
        let fct_return_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.getSTypeID)(annotation);
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
                generate(node, ast, context); // should be the new context
                return SType_fct.__call__.return_type();
            },
            substitute_call: _call_ast2js__WEBPACK_IMPORTED_MODULE_3__.default_call
        }
    };
    const STypeID = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes.length;
    structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[STypeID] = SType_fct;
    //if( ! isMethod ) {
    // if method add to self_context.symbols ?
    context.local_symbols[node.name] = STypeID;
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
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_6__.FUNCTIONS_DEF, STypeID);
    dop__WEBPACK_IMPORTED_MODULE_7__.VALUES[ast.id] = node.name;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_5__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`_b_.assert(${node.children[0]})`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.KEYWORDS_ASSERT, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.test, context)
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");



function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.KEYWORDS_BREAK, 0);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");



function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.KEYWORDS_CONTINUE, 0);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    if (value[1] === undefined) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(value[0]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${value[0]}: ${value[1]}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");



function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.KEYWORDS_IMPORT_ALIAS, 0, [
        node.name,
        node.asname
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("const {");
    for(let i = 0; i < node.children.length; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ");
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[i]);
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('} = ');
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    if (value === null) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("__SBRYTHON__.getModules()");
    else (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`__SBRYTHON__.getModule("${value}")`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");





function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.KEYWORDS_IMPORT, 0, node.names.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(n, context)));
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id = node.module];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.KEYWORDS_RAISE, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.exc, context)
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony export */   AST2JS: () => (/* binding */ AST2JS),
/* harmony export */   AST_CONVERT: () => (/* binding */ AST_CONVERT),
/* harmony export */   BODY: () => (/* binding */ BODY),
/* harmony export */   CLASS_CLASSDEF: () => (/* binding */ CLASS_CLASSDEF),
/* harmony export */   CONTROLFLOWS_FOR: () => (/* binding */ CONTROLFLOWS_FOR),
/* harmony export */   CONTROLFLOWS_FOR_RANGE: () => (/* binding */ CONTROLFLOWS_FOR_RANGE),
/* harmony export */   CONTROLFLOWS_IFBLOCK: () => (/* binding */ CONTROLFLOWS_IFBLOCK),
/* harmony export */   CONTROLFLOWS_TERNARY: () => (/* binding */ CONTROLFLOWS_TERNARY),
/* harmony export */   CONTROLFLOWS_TRYBLOCK: () => (/* binding */ CONTROLFLOWS_TRYBLOCK),
/* harmony export */   CONTROLFLOWS_TRYBLOCK_CATCH: () => (/* binding */ CONTROLFLOWS_TRYBLOCK_CATCH),
/* harmony export */   CONTROLFLOWS_WHILE: () => (/* binding */ CONTROLFLOWS_WHILE),
/* harmony export */   FUNCTIONS_ARGS: () => (/* binding */ FUNCTIONS_ARGS),
/* harmony export */   FUNCTIONS_CALL: () => (/* binding */ FUNCTIONS_CALL),
/* harmony export */   FUNCTIONS_CALL_KEYWORD: () => (/* binding */ FUNCTIONS_CALL_KEYWORD),
/* harmony export */   FUNCTIONS_DEF: () => (/* binding */ FUNCTIONS_DEF),
/* harmony export */   KEYWORDS_ASSERT: () => (/* binding */ KEYWORDS_ASSERT),
/* harmony export */   KEYWORDS_BREAK: () => (/* binding */ KEYWORDS_BREAK),
/* harmony export */   KEYWORDS_CONTINUE: () => (/* binding */ KEYWORDS_CONTINUE),
/* harmony export */   KEYWORDS_IMPORT: () => (/* binding */ KEYWORDS_IMPORT),
/* harmony export */   KEYWORDS_IMPORT_ALIAS: () => (/* binding */ KEYWORDS_IMPORT_ALIAS),
/* harmony export */   KEYWORDS_RAISE: () => (/* binding */ KEYWORDS_RAISE),
/* harmony export */   LITERALS_BOOL: () => (/* binding */ LITERALS_BOOL),
/* harmony export */   LITERALS_FLOAT: () => (/* binding */ LITERALS_FLOAT),
/* harmony export */   LITERALS_F_STRING: () => (/* binding */ LITERALS_F_STRING),
/* harmony export */   LITERALS_F_STRING_FORMATTEDVALUE: () => (/* binding */ LITERALS_F_STRING_FORMATTEDVALUE),
/* harmony export */   LITERALS_INT: () => (/* binding */ LITERALS_INT),
/* harmony export */   LITERALS_NONE: () => (/* binding */ LITERALS_NONE),
/* harmony export */   LITERALS_STR: () => (/* binding */ LITERALS_STR),
/* harmony export */   OPERATORS_ASSIGNOP: () => (/* binding */ OPERATORS_ASSIGNOP),
/* harmony export */   OPERATORS_ATTR: () => (/* binding */ OPERATORS_ATTR),
/* harmony export */   OPERATORS_BINARY: () => (/* binding */ OPERATORS_BINARY),
/* harmony export */   OPERATORS_BOOLEAN: () => (/* binding */ OPERATORS_BOOLEAN),
/* harmony export */   OPERATORS_COMPARE: () => (/* binding */ OPERATORS_COMPARE),
/* harmony export */   OPERATORS_UNARY: () => (/* binding */ OPERATORS_UNARY),
/* harmony export */   OPERATORS__BRACKETS: () => (/* binding */ OPERATORS__BRACKETS),
/* harmony export */   OPERATORS__EQ: () => (/* binding */ OPERATORS__EQ),
/* harmony export */   OPERATORS__EQ_INIT: () => (/* binding */ OPERATORS__EQ_INIT),
/* harmony export */   PASS: () => (/* binding */ PASS),
/* harmony export */   RETURN: () => (/* binding */ RETURN),
/* harmony export */   STRUCTS_DICT: () => (/* binding */ STRUCTS_DICT),
/* harmony export */   STRUCTS_LIST: () => (/* binding */ STRUCTS_LIST),
/* harmony export */   STRUCTS_TUPLE: () => (/* binding */ STRUCTS_TUPLE),
/* harmony export */   SYMBOL: () => (/* binding */ SYMBOL),
/* harmony export */   _b_: () => (/* binding */ _b_)
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
/* harmony import */ var _operators_init_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./operators/=_init/astconvert.ts */ "./src/core_modules/operators/=_init/astconvert.ts");
/* harmony import */ var _operators_init_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./operators/=_init/ast2js.ts */ "./src/core_modules/operators/=_init/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
/* harmony import */ var _literals_float_runtime_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./literals/float/runtime.ts */ "./src/core_modules/literals/float/runtime.ts");
/* harmony import */ var _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./literals/f-string/astconvert.ts */ "./src/core_modules/literals/f-string/astconvert.ts");
/* harmony import */ var _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./literals/f-string/ast2js.ts */ "./src/core_modules/literals/f-string/ast2js.ts");
/* harmony import */ var _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/astconvert.ts */ "./src/core_modules/literals/f-string/FormattedValue/astconvert.ts");
/* harmony import */ var _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/ast2js.ts */ "./src/core_modules/literals/f-string/FormattedValue/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./keywords/import/astconvert.ts */ "./src/core_modules/keywords/import/astconvert.ts");
/* harmony import */ var _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./keywords/import/ast2js.ts */ "./src/core_modules/keywords/import/ast2js.ts");
/* harmony import */ var _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./keywords/import/alias/astconvert.ts */ "./src/core_modules/keywords/import/alias/astconvert.ts");
/* harmony import */ var _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./keywords/import/alias/ast2js.ts */ "./src/core_modules/keywords/import/alias/ast2js.ts");
/* harmony import */ var _keywords_continue_astconvert_ts__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./keywords/continue/astconvert.ts */ "./src/core_modules/keywords/continue/astconvert.ts");
/* harmony import */ var _keywords_continue_ast2js_ts__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./keywords/continue/ast2js.ts */ "./src/core_modules/keywords/continue/ast2js.ts");
/* harmony import */ var _keywords_break_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./keywords/break/astconvert.ts */ "./src/core_modules/keywords/break/astconvert.ts");
/* harmony import */ var _keywords_break_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./keywords/break/ast2js.ts */ "./src/core_modules/keywords/break/ast2js.ts");
/* harmony import */ var _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./keywords/assert/astconvert.ts */ "./src/core_modules/keywords/assert/astconvert.ts");
/* harmony import */ var _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./keywords/assert/ast2js.ts */ "./src/core_modules/keywords/assert/ast2js.ts");
/* harmony import */ var _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./keywords/assert/runtime.ts */ "./src/core_modules/keywords/assert/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _functions_call_keyword_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./functions/call/keyword/astconvert.ts */ "./src/core_modules/functions/call/keyword/astconvert.ts");
/* harmony import */ var _functions_call_keyword_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./functions/call/keyword/ast2js.ts */ "./src/core_modules/functions/call/keyword/ast2js.ts");
/* harmony import */ var _functions_args_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./functions/args/astconvert.ts */ "./src/core_modules/functions/args/astconvert.ts");
/* harmony import */ var _functions_args_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./functions/args/ast2js.ts */ "./src/core_modules/functions/args/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ternary_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./controlflows/ternary/astconvert.ts */ "./src/core_modules/controlflows/ternary/astconvert.ts");
/* harmony import */ var _controlflows_ternary_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./controlflows/ternary/ast2js.ts */ "./src/core_modules/controlflows/ternary/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_range_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./controlflows/for_range/astconvert.ts */ "./src/core_modules/controlflows/for_range/astconvert.ts");
/* harmony import */ var _controlflows_for_range_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./controlflows/for_range/ast2js.ts */ "./src/core_modules/controlflows/for_range/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");
/* harmony import */ var _body_astconvert_ts__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./body/astconvert.ts */ "./src/core_modules/body/astconvert.ts");
/* harmony import */ var _body_ast2js_ts__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./body/ast2js.ts */ "./src/core_modules/body/ast2js.ts");























































































const SYMBOL = 0;
const STRUCTS_TUPLE = 1;
const STRUCTS_LIST = 2;
const STRUCTS_DICT = 3;
const RETURN = 4;
const PASS = 5;
const OPERATORS_UNARY = 6;
const OPERATORS_COMPARE = 7;
const OPERATORS_BOOLEAN = 8;
const OPERATORS_BINARY = 9;
const OPERATORS_ATTR = 10;
const OPERATORS__BRACKETS = 11;
const OPERATORS_ASSIGNOP = 12;
const OPERATORS__EQ_INIT = 13;
const OPERATORS__EQ = 14;
const LITERALS_STR = 15;
const LITERALS_INT = 16;
const LITERALS_FLOAT = 17;
const LITERALS_F_STRING = 18;
const LITERALS_F_STRING_FORMATTEDVALUE = 19;
const LITERALS_BOOL = 20;
const LITERALS_NONE = 21;
const KEYWORDS_RAISE = 22;
const KEYWORDS_IMPORT = 23;
const KEYWORDS_IMPORT_ALIAS = 24;
const KEYWORDS_CONTINUE = 25;
const KEYWORDS_BREAK = 26;
const KEYWORDS_ASSERT = 27;
const FUNCTIONS_DEF = 28;
const FUNCTIONS_CALL = 29;
const FUNCTIONS_CALL_KEYWORD = 30;
const FUNCTIONS_ARGS = 31;
const CONTROLFLOWS_WHILE = 32;
const CONTROLFLOWS_TRYBLOCK = 33;
const CONTROLFLOWS_TRYBLOCK_CATCH = 34;
const CONTROLFLOWS_TERNARY = 35;
const CONTROLFLOWS_IFBLOCK = 36;
const CONTROLFLOWS_FOR_RANGE = 37;
const CONTROLFLOWS_FOR = 38;
const CLASS_CLASSDEF = 39;
const BODY = 40;
const AST_CONVERT = [
    _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
    _structs_tuple_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
    _structs_list_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
    _structs_dict_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
    _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
    _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
    _operators_unary_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
    _operators_compare_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
    _operators_boolean_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
    _operators_binary_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
    _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_21__["default"],
    _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_23__["default"],
    _operators_AssignOp_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__["default"],
    _operators_init_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__["default"],
    _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__["default"],
    _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__["default"],
    _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__["default"],
    _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__["default"],
    _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_38__["default"],
    _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_40__["default"],
    _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_42__["default"],
    _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_44__["default"],
    _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__["default"],
    _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_49__["default"],
    _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_51__["default"],
    _keywords_continue_astconvert_ts__WEBPACK_IMPORTED_MODULE_53__["default"],
    _keywords_break_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__["default"],
    _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__["default"],
    _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_60__["default"],
    _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_62__["default"],
    _functions_call_keyword_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__["default"],
    _functions_args_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__["default"],
    _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__["default"],
    _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_70__["default"],
    _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__["default"],
    _controlflows_ternary_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__["default"],
    _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__["default"],
    _controlflows_for_range_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__["default"],
    _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__["default"],
    _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_83__["default"],
    _body_astconvert_ts__WEBPACK_IMPORTED_MODULE_85__["default"]
];
const AST2JS = [
    _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
    _structs_tuple_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"],
    _structs_list_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"],
    _structs_dict_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"],
    _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"],
    _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"],
    _operators_unary_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"],
    _operators_compare_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"],
    _operators_boolean_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"],
    _operators_binary_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"],
    _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
    _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
    _operators_AssignOp_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__["default"],
    _operators_init_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__["default"],
    _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__["default"],
    _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__["default"],
    _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__["default"],
    _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__["default"],
    _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_39__["default"],
    _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_41__["default"],
    _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_43__["default"],
    _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_45__["default"],
    _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__["default"],
    _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_50__["default"],
    _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_52__["default"],
    _keywords_continue_ast2js_ts__WEBPACK_IMPORTED_MODULE_54__["default"],
    _keywords_break_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__["default"],
    _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__["default"],
    _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_61__["default"],
    _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_63__["default"],
    _functions_call_keyword_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__["default"],
    _functions_args_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__["default"],
    _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__["default"],
    _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_71__["default"],
    _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__["default"],
    _controlflows_ternary_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__["default"],
    _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__["default"],
    _controlflows_for_range_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__["default"],
    _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__["default"],
    _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_84__["default"],
    _body_ast2js_ts__WEBPACK_IMPORTED_MODULE_86__["default"]
];
const RUNTIME = {};
Object.assign(RUNTIME, _operators_binary_runtime_ts__WEBPACK_IMPORTED_MODULE_20__["default"]);
Object.assign(RUNTIME, _literals_float_runtime_ts__WEBPACK_IMPORTED_MODULE_37__["default"]);
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_48__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_59__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_72__["default"]);
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

function ast2js(node) {
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(node, _context) {
    if (!(typeof node.value === "object") || !("__class__" in node.value) || node.value.__class__.__qualname__ !== "NoneType") return;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_NONE, structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NONETYPE);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, _context) {
    if (typeof node.value !== "boolean") return;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_BOOL, structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_BOOL);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.value;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('bool', {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_1__.RET_IJBF2BOOL)
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("${", node.children[0], "}");
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_F_STRING_FORMATTEDVALUE, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.value, context)
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("`");
    for (let child of node.children){
        if (child.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_STR) {
            const offset = 4 * child.id;
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG);
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[child.id]);
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END);
        } else if (child.type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_F_STRING_FORMATTEDVALUE) {
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_F_STRING, 0, [
        ...node.values.map((e)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(e, context))
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, _context) {
    if (!(node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float") return;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_FLOAT, structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_FLOAT);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.value.value;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony export */   SType_type_float: () => (/* binding */ SType_type_float)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");







const SType_type_float = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_6__.addSType)('type[float]', {
    __call__: {
        //TODO...
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_FLOAT,
        substitute_call: (node)=>{
            const other = node.children[1];
            const other_type = other.result_type;
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_INT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.Int2Number)(other);
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_FLOAT || other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_INT) return other_type;
            //TODO: power...
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_STR) {
                const other_value = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[other.id];
                if (other.type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_STR) {
                    if (other_value === "inf" || other_value === "infinity") return "Number.POSITIVE_INFINITY";
                    if (other_value === "-inf" || other_value === "-infinity") return "Number.NEGATIVE_INFINITY";
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
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_6__.addSType)('float', {
    // @ts-ignore
    __class__: SType_type_float,
    __str__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_STR,
        substitute_call (node) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.float2str(${node})`;
        }
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.genBinaryOps)([
        '**',
        '*',
        '/',
        '+',
        '-'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_IJBF2FLOAT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_4__.CONVERT_INT2FLOAT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.genBinaryOps)([
        '//'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_IJBF2FLOAT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_4__.CONVERT_INT2FLOAT,
        substitute_call (node, self, other) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.genBinaryOps)([
        '%'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_IJBF2FLOAT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_4__.CONVERT_INT2FLOAT,
        substitute_call (node, self, other) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.genUnaryOps)([
        'u.-'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_FLOAT),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_5__.RET_IJBF2BOOL)
});


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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js(node) {
    let value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    if (node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${value}n`;
        return;
    }
    if (typeof value === "bigint") value = Number(value); // remove useless precision.
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(value);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, _context) {
    let value = node.value;
    if (value.__class__?.__qualname__ === "int") value = value.value;
    if (typeof value !== "number" && typeof value !== "bigint") return;
    const real_type = typeof value !== "number" ? structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_INT : structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_JSINT;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_INT, real_type);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = value;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





const SType_type_int = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.addSType)('type[int]', {
    __call__: {
        //TODO...
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT,
        substitute_call: (node)=>{
            const other = node.children[1];
            const other_type = other.result_type;
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_INT) return other;
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_JSINT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(other);
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_FLOAT) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(Math.trunc(${other}))`;
            //TODO: power...
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_STR) {
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
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.addSType)('int', {
    //TODO: fix type...
    // @ts-ignore
    __class__: SType_type_int,
    __str__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_STR,
        substitute_call (node) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${node}.toString()`;
        }
    },
    __int__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT,
        substitute_call (node, self) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.id_jsop)(node, self);
        }
    },
    /* */ ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        // '**' => if "as float" could accept loss of precision.
        '**',
        '+',
        '-',
        '&',
        '|',
        '^',
        '>>',
        '<<'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJ2INT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_2INT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '*'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT2INT, {
        substitute_call (node, a, b) {
            if (node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_FLOAT) // TODO: check if really interesting...
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(b));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '/'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJBF2FLOAT, {
        convert_self: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_INT2FLOAT,
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_INT2FLOAT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '//'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJ2INT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_2INT,
        substitute_call: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '%'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJ2INT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_2INT,
        substitute_call: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)([
        'u.-'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT, {
        substitute_call: (node, a)=>{
            if (node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_FLOAT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)([
        '~'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJBF2BOOL)
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
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





(0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.addSType)('jsint', {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)(// '**' and '*' => if "as float" could accept loss of precision.
    [
        '**',
        '+',
        '-',
        '&',
        '|',
        '^',
        '>>',
        '<<' // in JS bit operations are on 32bits
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJ2INT, {
        convert_self: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_2INT,
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_2INT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '*'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJ2INT, {
        substitute_call: (node, a, b)=>{
            if (node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_FLOAT) // TODO: check if really interesting...
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(b));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(b));
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '/'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJBF2FLOAT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_INT2FLOAT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '//'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_JSINT2JSINT, {
        substitute_call: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        '%'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_JSINT2JSINT, {
        substitute_call: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)([
        'u.-'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_JSINT, {
        substitute_call: (node, a)=>{
            if (node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_INT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(a));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)([
        '~'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT, {
        convert_self: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_2INT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJBF2BOOL)
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`'${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]}'`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, _context) {
    if (typeof node.value !== "string") return;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_STR, structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_STR);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.value;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





const SType_type_str = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.addSType)('type[str]', {
    __call__: {
        //TODO...
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_STR,
        substitute_call: (node)=>{
            const other = node.children[1];
            const other_type = other.result_type;
            //TODO use their __int__ ?
            if (other_type === structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_STR) return other;
            const method = structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STypes[other.result_type]?.__str__;
            if (method === undefined) throw new Error(`${structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STypes[other.result_type].__name__}.__str__ not defined`);
            return method.substitute_call(other);
        }
    }
});
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.addSType)('str', {
    // @ts-ignore
    __class__: SType_type_str,
    __len__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT,
        substitute_call: (_)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${_.children[1]}.length`;
        }
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_STR2BOOL),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        "+"
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_STR2STR),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)([
        "*"
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_IJ2STR, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_2__.CONVERT_INT2FLOAT,
        substitute_call: (node, a, b)=>{
            if (a.result_type !== structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_STR) [a, b] = [
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



function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[0]);
    for(let i = 1; i < node.children.length - 1; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)` = ${node.children[i]}`;
    const right_node = node.children[node.children.length - 1];
    let rchild = right_node;
    if (right_node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT && node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) rchild = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(right_node);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, context) {
    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [
        node.target
    ];
    if (context.type !== "class" && targets[0].constructor.$name === "Name" && !(targets[0].value in context.local_symbols)) return;
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.value, context);
    let right_type = right.result_type;
    let result_type = null;
    const annotation = node?.annotation?.id;
    if (annotation !== undefined) result_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.getSTypeID)(annotation);
    if (result_type !== null && result_type !== right_type) {
        console.warn("Wrong result_type");
    }
    if (result_type === null) {
        result_type = right_type;
        if (right_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_JSINT) result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_INT; // prevents issues.
    //TODO: only if assign...
    }
    const lefts = targets.map((n)=>{
        const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(n, context);
        // could be improved I guess.
        if (left.type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.SYMBOL) {
            // if exists, ensure type.
            const lsym = context.local_symbols[n.id];
            if (lsym !== undefined) {
                const left_type = lsym;
                if (left_type !== null && right_type !== left_type) {} //console.warn("Wrong result_type");
            // annotation_type
            }
        }
        return left;
    });
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS__EQ, result_type, [
        ...lefts,
        right
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
}
convert.brython_name = [
    "Assign",
    "AnnAssign"
];


/***/ }),

/***/ "./src/core_modules/operators/=_init/ast2js.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/operators/=_init/ast2js.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("var ");
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[0]);
    for(let i = 1; i < node.children.length - 1; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)` = ${node.children[i]}`;
    const right_node = node.children[node.children.length - 1];
    let rchild = right_node;
    if (right_node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT && node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) rchild = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(right_node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)` = ${rchild}`;
}


/***/ }),

/***/ "./src/core_modules/operators/=_init/astconvert.ts":
/*!*********************************************************!*\
  !*** ./src/core_modules/operators/=_init/astconvert.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, context) {
    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [
        node.target
    ];
    if (context.type === "class" || targets[0].constructor.$name !== "Name" || targets[0].value in context.local_symbols) return;
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.value, context);
    let right_type = right.result_type;
    let result_type = null;
    const annotation = node?.annotation?.id;
    if (annotation !== undefined) result_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.getSTypeID)(annotation);
    if (result_type !== null && result_type !== right_type) {
        console.warn("Wrong result_type");
    }
    if (result_type === null) {
        result_type = right_type;
        if (right_type === structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_JSINT) result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_INT; // prevents issues.
    //TODO: only if assign...
    }
    const lefts = targets.map((n)=>{
        const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(n, context);
        context.local_symbols[n.id] = result_type;
        return left;
    });
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS__EQ_INIT, result_type, [
        ...lefts,
        right
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function ast2js(node) {
    let left = node.children[0];
    let right = node.children[1];
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.AssignOperators[dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]];
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[left.result_type]?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try a = a + b
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) {
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(node, left, right));
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");






function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.target, context);
    let right = (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.value, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_5__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS_BINARY, left.result_type, [
        left,
        right
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = op;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${node.children[0]}[${node.children[1]}]`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS__BRACKETS, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.value, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.slice, context)
    ]);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${node.children[0]}.${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");





function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS_ATTR, 0, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.value, context)
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = node.attr;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js(node) {
    let left = node.children[0];
    let right = node.children[1];
    const method = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[left.result_type][dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(node, left, right));
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dop */ "./src/dop.ts");







function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    let right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[left.result_type]?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try reversed operator
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.reversed_operator)(op);
        method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[right.result_type]?.[op];
        if (method !== undefined) type = method.return_type(left.result_type);
        if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);
        [left, right] = [
            right,
            left
        ];
    }
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_5__.OPERATORS_BINARY, type, [
        left,
        right
    ]);
    dop__WEBPACK_IMPORTED_MODULE_6__.VALUES[ast.id] = op;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_4__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");



function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.multi_jsop)(node, dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id], ...node.children));
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");





const bname2jsop = {
    'And': '&&',
    'Or': '||'
};
function convert(node, context) {
    let children = node.values.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(n, context));
    const op = bname2jsop[node.op.constructor.$name];
    const type = children[0].result_type;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS_BOOLEAN, type, children);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = op;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function find_and_call_substitute(node, left, op, right) {
    let reversed = false;
    const rtype = right.result_type;
    const ltype = left.result_type;
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[left.result_type]?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.reversed_operator)(op);
        method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[right.result_type]?.[op];
        if (method !== undefined) type = method.return_type(left.result_type);
        if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) {
            if (op !== '__eq__' && op !== '__ne__') throw new Error(`${ltype} ${op} ${rtype} not implemented!`);
            const jsop = op === '__eq__' ? '===' : '!==';
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, left, jsop, right);
        }
        reversed = true;
        [left, right] = [
            right,
            left
        ];
    }
    return method.substitute_call(node, left, right, reversed);
}
function ast2js(node) {
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    for(let i = 0; i < value.length; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(' && ');
        const op = value[i];
        const left = node.children[i];
        const right = node.children[i + 1];
        if (op === 'is') {
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, left, '===', right));
            continue;
        }
        if (op === 'is not') {
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, left, '!==', right));
            continue;
        }
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(find_and_call_substitute(node, left, op, right));
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");







function convert(node, context) {
    const ops = node.ops.map((e)=>{
        const op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_5__.bname2pyname[e.constructor.$name];
        if (op === undefined) throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(node.left, context);
    const rights = node.comparators.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_3__.convert_node)(n, context));
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS_COMPARE, structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_BOOL, [
        left,
        ...rights
    ]);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[ast.id] = ops;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function ast2js(node) {
    const left = node.children[0];
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    if (value === 'not') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.unary_jsop)(node, '!', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(left, structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT)));
    const method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[left.result_type][value];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(node, left));
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dop */ "./src/dop.ts");







function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.operand, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    if (op === 'not') {
        const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_5__.OPERATORS_UNARY, structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_BOOL, [
            left
        ]);
        dop__WEBPACK_IMPORTED_MODULE_6__.VALUES[ast.id] = "not";
        (0,ast2js__WEBPACK_IMPORTED_MODULE_4__.set_py_code)(4 * ast.id, node);
        return ast;
    }
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[left.result_type]?.[op];
    if (method !== undefined) type = method.return_type();
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) throw new Error(`${op} ${left.result_type} NOT IMPLEMENTED!`);
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_5__.OPERATORS_UNARY, type, [
        left
    ]);
    dop__WEBPACK_IMPORTED_MODULE_6__.VALUES[ast.id] = op;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_4__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");



function convert(node, _context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_2__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.PASS);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    if (node.children.length === 0) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("return null");
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`return ${node.children[0]}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, context) {
    // context.parent_node_context
    let result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_NONETYPE;
    let children = undefined;
    if (node.value !== undefined) {
        const expr = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.value, context);
        result_type = expr.result_type;
        children = [
            expr
        ];
    }
    const meta = structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STypes[context.parent_node_context.result_type].__call__;
    if (meta.return_type === undefined) meta.return_type = ()=>result_type;
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.RETURN, result_type, children);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('{');
    if (node.children.length > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${node.children[0]}: ${node.children[1]}`;
    for(let i = 2; i < node.children.length; i += 2)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`, ${node.children[i]}: ${node.children[i + 1]}`;
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    let children = new Array(node.keys.length * 2);
    for(let i = 0; i < node.keys.length; ++i){
        children[2 * i] = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.keys[i], context);
        children[2 * i + 1] = (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(node.values[i], context);
    }
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.STRUCTS_DICT, 0, children);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("[");
    if (node.children.length > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[0]);
    for(let i = 1; i < node.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ", node.children[i]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.STRUCTS_LIST, 0, node.elts.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(n, context)));
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("Object.freeze([");
    if (node.children.length > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(node.children[0]);
    for(let i = 1; i < node.children.length; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ", node.children[i]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");




function convert(node, context) {
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_3__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.STRUCTS_TUPLE, 0, node.elts.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(n, context)));
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id]);
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
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dop */ "./src/dop.ts");




function isClass(_) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}
function convert(node, context) {
    let result_type = 0;
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
    */ const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_2__.SYMBOL, result_type);
    dop__WEBPACK_IMPORTED_MODULE_3__.VALUES[ast.id] = value;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(4 * ast.id, node);
    return ast;
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

/***/ "./src/dop.ts":
/*!********************!*\
  !*** ./src/dop.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ARRAY_TYPE: () => (/* binding */ ARRAY_TYPE),
/* harmony export */   CODE_BEG: () => (/* binding */ CODE_BEG),
/* harmony export */   CODE_BEG_COL: () => (/* binding */ CODE_BEG_COL),
/* harmony export */   CODE_BEG_LINE: () => (/* binding */ CODE_BEG_LINE),
/* harmony export */   CODE_COL: () => (/* binding */ CODE_COL),
/* harmony export */   CODE_END: () => (/* binding */ CODE_END),
/* harmony export */   CODE_END_COL: () => (/* binding */ CODE_END_COL),
/* harmony export */   CODE_END_LINE: () => (/* binding */ CODE_END_LINE),
/* harmony export */   CODE_LINE: () => (/* binding */ CODE_LINE),
/* harmony export */   JS_CODE: () => (/* binding */ JS_CODE),
/* harmony export */   PY_CODE: () => (/* binding */ PY_CODE),
/* harmony export */   VALUES: () => (/* binding */ VALUES),
/* harmony export */   "default": () => (/* binding */ dop_reset)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

const ARRAY_TYPE = Float64Array;
const MAX_NB_TOKEN = 105;
const CODE_LINE = 0;
const CODE_COL = 1;
const CODE_BEG = 0;
const CODE_END = 2;
const CODE_BEG_LINE = CODE_BEG + CODE_LINE;
const CODE_BEG_COL = CODE_BEG + CODE_COL;
const CODE_END_LINE = CODE_END + CODE_LINE;
const CODE_END_COL = CODE_END + CODE_COL;
const PY_CODE = new ARRAY_TYPE(4 * MAX_NB_TOKEN);
const JS_CODE = new ARRAY_TYPE(4 * MAX_NB_TOKEN);
//TODO: indirection ou par ID...
const VALUES = new Array();
function dop_reset() {
    VALUES.length = 0;
    structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode.NEXT_AST_NODE_ID = 0;
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
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
// Brython must be imported before.




const modules = {};
for(let i = 0; i < _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST_CONVERT.length; ++i){
    const module = _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST_CONVERT[i];
    let names = [
        "null"
    ];
    if ("brython_name" in module) {
        if (Array.isArray(module.brython_name)) names = module.brython_name;
        else names = [
            module.brython_name
        ];
    }
    for (let name of names)(modules[name] ??= []).push(i);
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
    (0,dop__WEBPACK_IMPORTED_MODULE_2__["default"])();
    const result = convert_node(ast.body, new Context());
    /*function count(node: ASTNode) {

        let sum = 1; // count myself
        for(let i = 0; i < node.children.length; ++i )
            sum += count(node.children[i]);
        return sum;
    }
    console.warn( count(result) );*/ return result;
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
    const candidates = modules[name];
    if (candidates === undefined) {
        console.warn("Module not registered:", name);
        console.warn(`at ${brython_node.lineno}:${brython_node.col_offset}`);
        console.log(brython_node);
        name = "null";
    }
    // we may have many modules for the same node type.
    for(let i = 0; i < candidates.length; ++i){
        const result = _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST_CONVERT[candidates[i]](brython_node, context);
        if (result !== undefined) {
            const ID = candidates[i];
            result.type_id = ID;
            return result;
        }
    }
    console.error(brython_node);
    throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
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
        __class__: type_fct,
        __name__: name,
        __call__: {
            //TODO: I need a self...
            return_type: return_type,
            // not really :?
            substitute_call: (call)=>{
                const left = call.children[1];
                const method = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.STypes[left.result_type][opname];
                return method.substitute_call(call);
            }
        }
    };
}
//TODO: not a type !!!
const len = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.addSType)("len", genUnaryOpFct("len", structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__.RET_INT));
// builtin symbols.
// @ts-ignore
const RootContext = {
    type: "?",
    local_symbols: {
        int: (0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.getSTypeID)('type[int]'),
        str: (0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.getSTypeID)('type[str]'),
        float: (0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.getSTypeID)('type[float]'),
        len
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
    static NEXT_AST_NODE_ID = 0;
    id;
    type_id;
    result_type = 0;
    // soon ^^
    children = [];
    constructor(type_id, result_type = 0, children = []){
        this.id = ASTNode.NEXT_AST_NODE_ID++;
        this.type_id = type_id;
        this.result_type = result_type;
        this.children = children;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var _Converters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Converters */ "./src/structs/Converters.ts");






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
*/ function Int2Number(a, target = _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_FLOAT) {
    if (a.result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT) return a;
    if (a.type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_3__.LITERALS_INT) {
        // if bigint can't safely convert to JSINT.
        if (target === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_FLOAT) a.result_type = _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT;
        return a;
    }
    const a_value = dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[a.id];
    if (a_value === '__mul__' || a_value === '__rmul__') {
        const ltype = a.children[0].result_type;
        const rtype = a.children[1].result_type;
        if ((ltype === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT || ltype === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT) && (rtype === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT || rtype === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT)) {
            a.result_type = target;
            return a;
        }
    }
    if (a_value === '__neg__' && a.children[0].result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) {
        a.result_type = target;
        return a;
    }
    if (target === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_FLOAT) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${a})`;
    // int -> jsint cast is facultative...
    return a;
}
function Number2Int(a) {
    if (a.result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) return a;
    if (a.type_id === core_modules_lists__WEBPACK_IMPORTED_MODULE_3__.LITERALS_INT) {
        a.result_type = _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT; // force bigint convertion
        return a;
    }
    if (dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[a.id] === '__neg__' && a.children[0].result_type === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT) {
        a.result_type = _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT;
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
// null operation, the node has the same priority as his father.
// 2*int(1+1) => 2*(1+1)
function id_jsop(node, a) {
    //if(a instanceof ASTNode) {
    a.parent_op = node.parent_op;
    a.parent_op_dir = node.parent_op_dir;
    //}
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
function genUnaryOps(ops, return_type, { convert_self = _Converters__WEBPACK_IMPORTED_MODULE_5__.NOCONVERT, substitute_call } = {}) {
    let result = {};
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
function genBinaryOps(ops, return_type, { convert_other = _Converters__WEBPACK_IMPORTED_MODULE_5__.NOCONVERT, convert_self = _Converters__WEBPACK_IMPORTED_MODULE_5__.NOCONVERT, substitute_call } = {}) {
    let result = {};
    for (let op of ops){
        const pyop = jsop2pyop[op];
        if (op === '//') op = '/';
        let cs = (node, self, other)=>{
            return binary_jsop(node, convert_self(self), op, convert_other(other));
        };
        let rcs = (node, self, other)=>{
            return binary_jsop(node, convert_other(other), op, convert_self(self));
        };
        if (substitute_call !== undefined) {
            cs = (node, self, o)=>{
                return substitute_call(node, convert_self(self), convert_other(o));
            };
            // same_order ? fct : 
            rcs = (node, self, o)=>{
                return substitute_call(node, convert_other(o), convert_self(self));
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
        if (convert_self === _Converters__WEBPACK_IMPORTED_MODULE_5__.NOCONVERT && substitute_call === undefined) result[`__i${pyop}__`] = {
            return_type,
            substitute_call: (node, self, other)=>{
                const other_value = dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[other.id];
                if (op === '+' && other_value === 1) return unary_jsop(node, '++', self);
                if (op === '-' && other_value === 1) return unary_jsop(node, '--', self);
                return binary_jsop(node, self, op + '=', convert_other(other));
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
function genCmpOps(ops, return_type, { convert_other = _Converters__WEBPACK_IMPORTED_MODULE_5__.NOCONVERT, convert_self = _Converters__WEBPACK_IMPORTED_MODULE_5__.NOCONVERT, substitute_call } = {}) {
    let result = {};
    for (let op of ops){
        const pyop = jsop2pyop[op];
        let cs = (node, self, other, reversed)=>{
            let cop = op;
            let a = convert_self(self);
            let b = convert_other(other);
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
                return substitute_call(node, convert_self(self), convert_other(o)); //TODO...
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

/***/ "./src/structs/Converters.ts":
/*!***********************************!*\
  !*** ./src/structs/Converters.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONVERT_2INT: () => (/* binding */ CONVERT_2INT),
/* harmony export */   CONVERT_INT2FLOAT: () => (/* binding */ CONVERT_INT2FLOAT),
/* harmony export */   NOCONVERT: () => (/* binding */ NOCONVERT),
/* harmony export */   generateConvert: () => (/* binding */ generateConvert)
/* harmony export */ });
/* harmony import */ var _BinaryOperators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var _STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./STypes */ "./src/structs/STypes.ts");


const NOCONVERT = (node)=>node;
const CONVERT_INT2FLOAT = (node)=>{
    if (node.result_type === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT) return (0,_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.Int2Number)(node, _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_FLOAT);
    return node; // already a number...
};
const CONVERT_2INT = (node)=>{
    //if( node.result_type === STYPE_INT )
    //    return node;
    return (0,_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.Number2Int)(node);
};
function generateConvert(convert) {
    const table = new Array();
    for(let i = 0; i < convert.length; i += 2)table[convert[i]] = convert[i + 1];
    return (node)=>{
        const src = node.result_type;
        const target = table[src];
        if (target === undefined) return node;
        //TODO: improve:
        if (src === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT) return (0,_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.Int2Number)(node, target);
        if (target === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT) return (0,_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.Number2Int)(node);
        throw new Error("Unfound conversion");
    };
}


/***/ }),

/***/ "./src/structs/ReturnTypeFcts.ts":
/*!***************************************!*\
  !*** ./src/structs/ReturnTypeFcts.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RET_FLOAT: () => (/* binding */ RET_FLOAT),
/* harmony export */   RET_IJ2INT: () => (/* binding */ RET_IJ2INT),
/* harmony export */   RET_IJ2STR: () => (/* binding */ RET_IJ2STR),
/* harmony export */   RET_IJBF2BOOL: () => (/* binding */ RET_IJBF2BOOL),
/* harmony export */   RET_IJBF2FLOAT: () => (/* binding */ RET_IJBF2FLOAT),
/* harmony export */   RET_INT: () => (/* binding */ RET_INT),
/* harmony export */   RET_INT2INT: () => (/* binding */ RET_INT2INT),
/* harmony export */   RET_JSINT: () => (/* binding */ RET_JSINT),
/* harmony export */   RET_JSINT2JSINT: () => (/* binding */ RET_JSINT2JSINT),
/* harmony export */   RET_STR: () => (/* binding */ RET_STR),
/* harmony export */   RET_STR2BOOL: () => (/* binding */ RET_STR2BOOL),
/* harmony export */   RET_STR2STR: () => (/* binding */ RET_STR2STR),
/* harmony export */   generate_return_type: () => (/* binding */ generate_return_type)
/* harmony export */ });
/* harmony import */ var _STypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./STypes */ "./src/structs/STypes.ts");

function RET_IJBF2BOOL(o) {
    if (_STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT <= o && o <= _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_FLOAT) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_BOOL;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_IJBF2FLOAT(o) {
    if (_STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT <= o && o <= _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_FLOAT) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_FLOAT;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_JSINT2JSINT(o) {
    if (o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_JSINT) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_JSINT;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_IJ2INT(o) {
    if (o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT || o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_JSINT) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_INT2INT(o) {
    if (o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_STR2BOOL(o) {
    if (o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_STR) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_BOOL;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_STR2STR(o) {
    if (o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_STR) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_STR;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_IJ2STR(o) {
    if (o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT || o === _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_JSINT) return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_STR;
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_NOT_IMPLEMENTED;
}
function RET_FLOAT(_) {
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_FLOAT;
}
function RET_INT(_) {
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_INT;
}
function RET_JSINT(_) {
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_JSINT;
}
function RET_STR(_) {
    return _STypes__WEBPACK_IMPORTED_MODULE_0__.STYPE_STR;
}
//TODO...
function generate_return_type() {}


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
/* harmony export */   STYPE_BOOL: () => (/* binding */ STYPE_BOOL),
/* harmony export */   STYPE_FLOAT: () => (/* binding */ STYPE_FLOAT),
/* harmony export */   STYPE_INT: () => (/* binding */ STYPE_INT),
/* harmony export */   STYPE_JSINT: () => (/* binding */ STYPE_JSINT),
/* harmony export */   STYPE_NONETYPE: () => (/* binding */ STYPE_NONETYPE),
/* harmony export */   STYPE_NOT_IMPLEMENTED: () => (/* binding */ STYPE_NOT_IMPLEMENTED),
/* harmony export */   STYPE_STR: () => (/* binding */ STYPE_STR),
/* harmony export */   STypes: () => (/* binding */ STypes),
/* harmony export */   addSType: () => (/* binding */ addSType),
/* harmony export */   getSTypeFromName: () => (/* binding */ getSTypeFromName),
/* harmony export */   getSTypeID: () => (/* binding */ getSTypeID)
/* harmony export */ });
const STypes = new Array();
const STypename2id = {};
function getSTypeFromName(name) {
    return STypes[getSTypeID(name)];
}
function getSTypeID(name) {
    let id = STypename2id[name];
    if (id === undefined) {
        id = STypename2id[name] = STypes.length;
        STypes[id] = {
            __name__: name
        };
    }
    return id;
}
function addSType(name, type) {
    const id = getSTypeID(name);
    Object.assign(STypes[id], type);
    return id;
}
const STYPE_NONETYPE = getSTypeID("NoneType"); // 0...
const STYPE_INT = getSTypeID("int");
const STYPE_JSINT = getSTypeID("jsint");
const STYPE_BOOL = getSTypeID("bool");
const STYPE_FLOAT = getSTypeID("float");
const STYPE_STR = getSTypeID("str");
const STYPE_NOT_IMPLEMENTED = getSTypeID("NotImplementedType");


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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDMEc7QUFFNUc7QUFFbkMsTUFBTWEsU0FBUyxJQUFJWiwyQ0FBVUEsQ0FBQyxHQUFHO0FBRWpDLElBQUlhLE9BQWU7QUFFbkIsU0FBU0MsY0FBY0MsR0FBVztJQUNyQ04sd0NBQU8sQ0FBQ00sTUFBTVAsMENBQVNBLENBQUMsR0FBR0ksTUFBTSxDQUFDSiwwQ0FBU0EsQ0FBQztJQUM1Q0Msd0NBQU8sQ0FBQ00sTUFBTVgseUNBQVFBLENBQUUsR0FBR1MsT0FBUUcsTUFBTSxHQUFHSixNQUFNLENBQUNSLHlDQUFRQSxDQUFDO0FBQ2hFO0FBRU8sU0FBU2Esc0JBQXNCQyxNQUFjLEVBQUVDLFlBQWlCO0lBRW5FLE1BQU1DLE1BQU1ELFlBQVksQ0FBQyxFQUFFO0lBQzNCLE1BQU1FLE1BQU1GLFlBQVksQ0FBQ0EsYUFBYUgsTUFBTSxHQUFDLEVBQUU7SUFFL0NOLHdDQUFPLENBQUVRLFNBQVNmLDhDQUFhQSxDQUFFLEdBQUdpQixJQUFJRSxNQUFNO0lBQzlDWix3Q0FBTyxDQUFFUSxTQUFTaEIsNkNBQVlBLENBQUcsR0FBR2tCLElBQUlHLFVBQVU7SUFDbERiLHdDQUFPLENBQUVRLFNBQVNYLDhDQUFhQSxDQUFFLEdBQUdjLElBQUlHLFVBQVU7SUFDbERkLHdDQUFPLENBQUVRLFNBQVNaLDZDQUFZQSxDQUFHLEdBQUdlLElBQUlJLGNBQWM7QUFDMUQ7QUFHTyxTQUFTQyxnQkFBaUJDLFVBQWtCLEVBQUVDLFVBQWtCO0lBRW5FbEIsd0NBQU8sQ0FBRWlCLGFBQWF4Qiw4Q0FBYUEsQ0FBRSxHQUFHTyx3Q0FBTyxDQUFFa0IsYUFBYXpCLDhDQUFhQSxDQUFFO0lBQzdFTyx3Q0FBTyxDQUFFaUIsYUFBYXpCLDZDQUFZQSxDQUFHLEdBQUdRLHdDQUFPLENBQUVrQixhQUFhMUIsNkNBQVlBLENBQUc7QUFDakY7QUFDTyxTQUFTMkIsZ0JBQWlCRixVQUFrQixFQUFFQyxVQUFrQjtJQUVuRWxCLHdDQUFPLENBQUVpQixhQUFhcEIsOENBQWFBLENBQUUsR0FBR0csd0NBQU8sQ0FBRWtCLGFBQWFyQiw4Q0FBYUEsQ0FBRTtJQUM3RUcsd0NBQU8sQ0FBRWlCLGFBQWFyQiw2Q0FBWUEsQ0FBRyxHQUFHSSx3Q0FBTyxDQUFFa0IsYUFBYXRCLDZDQUFZQSxDQUFHO0FBQ2pGO0FBRU8sU0FBU3dCLFlBQVlaLE1BQWMsRUFBRUMsWUFBaUI7SUFFekRULHdDQUFPLENBQUVRLFNBQVNmLDhDQUFhQSxDQUFFLEdBQUdnQixhQUFhRyxNQUFNO0lBQ3ZEWix3Q0FBTyxDQUFFUSxTQUFTaEIsNkNBQVlBLENBQUcsR0FBR2lCLGFBQWFJLFVBQVU7SUFDM0RiLHdDQUFPLENBQUVRLFNBQVNYLDhDQUFhQSxDQUFFLEdBQUdZLGFBQWFLLFVBQVU7SUFDM0RkLHdDQUFPLENBQUVRLFNBQVNaLDZDQUFZQSxDQUFHLEdBQUdhLGFBQWFNLGNBQWM7QUFDbkU7QUFFQSxTQUFTTSxXQUFXQyxRQUFnQjtJQUVoQ25CLFNBQVUsQ0FBQyxjQUFjLEVBQUVtQixTQUFTLEVBQUUsQ0FBQztJQUN2Q25CLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQztJQUU5Q0QsTUFBTSxDQUFDSiwwQ0FBU0EsQ0FBQyxHQUFHO0lBQ3BCSSxNQUFNLENBQUNSLHlDQUFRQSxDQUFDLEdBQUdTLE9BQU9HLE1BQU07QUFDcEM7QUFJQSxJQUFJaUIsU0FBUztBQUNiLElBQUlDLG1CQUFtQjtBQUN2QixzQkFBc0I7QUFFdEIsTUFBTUMsVUFBVTtJQUNaO0lBQ0E7SUFDQUY7SUFDQUEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7SUFDUkEsVUFBUUE7Q0FDWDtBQUVNLE1BQU1HLEtBQUs7SUFDZEMsVUFBVTtRQUVOLEVBQUV6QixNQUFNLENBQUNKLDBDQUFTQSxDQUFDO1FBQ25CSSxNQUFNLENBQUNSLHlDQUFRQSxDQUFDLEdBQUdTLE9BQU9HLE1BQU0sR0FBRztRQUVuQyxPQUFPLE9BQU9tQixPQUFPLENBQUNELGlCQUFpQjtJQUMzQztBQUNKLEVBQUM7QUFDTSxNQUFNSSxLQUFLO0lBQ2RELFVBQVU7UUFDTixPQUFPRixPQUFPLENBQUMsRUFBRUQsaUJBQWlCO0lBQ3RDO0FBQ0osRUFBQztBQUNNLE1BQU1LLEtBQUs7SUFDZEYsVUFBVTtRQUNOLE9BQU9GLE9BQU8sQ0FBQyxFQUFFRCxpQkFBaUI7SUFDdEM7QUFDSixFQUFDO0FBRUQsb0NBQW9DO0FBQzdCLFNBQVNNLEVBQUUsR0FBR0MsSUFBc0Q7SUFDdkUsT0FBT0E7QUFDWDtBQUVBLDBCQUEwQjtBQUNuQixTQUFTQyxHQUFHRCxJQUFzRDtJQUNyRSxJQUFJLE9BQU9BLFNBQVMsVUFDaEIsT0FBT0UsRUFBRUY7SUFDYixPQUFPRyxNQUFNSDtBQUNqQjtBQUVBLGtDQUFrQztBQUMzQixTQUFTRyxHQUFHQyxHQUF5QixFQUFFLEdBQUdKLElBQTJCO0lBRXhFLElBQUksSUFBSUssSUFBSSxHQUFHQSxJQUFJTCxLQUFLekIsTUFBTSxFQUFFLEVBQUU4QixFQUFHO1FBQ2pDakMsVUFBVWdDLEdBQUcsQ0FBQ0MsRUFBRTtRQUNoQkgsRUFBRUYsSUFBSSxDQUFDSyxFQUFFO0lBQ2I7SUFFQWpDLFVBQVVnQyxHQUFHLENBQUNKLEtBQUt6QixNQUFNLENBQUM7QUFDOUI7QUFFQSxrQkFBa0I7QUFDWCxTQUFTMkIsRUFBRSxHQUFHRixJQUEyQjtJQUU1QyxJQUFJLElBQUlLLElBQUksR0FBR0EsSUFBSUwsS0FBS3pCLE1BQU0sRUFBRSxFQUFFOEIsRUFBRztRQUVqQyxJQUFJQyxNQUFNTixJQUFJLENBQUNLLEVBQUU7UUFFakIsSUFBSUUsTUFBTUMsT0FBTyxDQUFDRixNQUFPO1lBQ3JCTCxHQUFHSztZQUNIO1FBQ0o7UUFFQSxJQUFJLENBQUdBLENBQUFBLGVBQWVwQyxvREFBTSxHQUFLO1lBRTdCLElBQUlvQyxRQUFRRyxXQUNSSCxNQUFNO1lBQ1YsSUFBSUEsUUFBUSxNQUNSQSxNQUFNO1lBRVZsQyxVQUFVa0MsSUFBSVYsUUFBUTtZQUN0QjtRQUNKO1FBRUEsTUFBTW5CLFNBQVMsSUFBRTZCLElBQUlJLEVBQUU7UUFFdkJyQyxjQUFjSSxTQUFTakIseUNBQVFBO1FBQy9CRixzREFBTSxDQUFDZ0QsSUFBSUssT0FBTyxDQUFFLENBQUNMO1FBQ3JCakMsY0FBY0ksU0FBU2IseUNBQVFBO0lBQ25DO0FBQ0o7QUFFTyxTQUFTZ0QsT0FBT0MsR0FBUTtJQUUzQnZCLFdBQVd1QixJQUFJdEIsUUFBUTtJQUV2QlcsRUFBRVcsSUFBSUMsSUFBSTtJQUVWLG1DQUFtQztJQUNuQzFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQztJQUV4Qyx1QkFBdUI7SUFFdkI7Ozs7Ozs7Ozs7O01BV0UsR0FFTCxPQUFPQTtBQUNSOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUt1QztBQUd4QixTQUFTd0MsT0FBT0csSUFBYTtJQUV4Q2IseUNBQUNBLENBQUNMLHNDQUFFQTtJQUVKLElBQUksSUFBSVEsSUFBSSxHQUFHQSxJQUFJVSxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEVBQUUsRUFBRThCLEVBQ3ZDSCx5Q0FBQ0EsQ0FBQ1Asc0NBQUVBLEVBQUVvQixLQUFLQyxRQUFRLENBQUNYLEVBQUU7SUFFMUJILHlDQUFDQSxDQUFDSixzQ0FBRUE7QUFDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1grQztBQUNMO0FBQ0s7QUFDTDtBQUczQixTQUFTcUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNQyxRQUFRLElBQUlkLE1BQU1RLEtBQUt4QyxNQUFNO0lBQ25DLElBQUksSUFBSThCLElBQUksR0FBR0EsSUFBSVUsS0FBS3hDLE1BQU0sRUFBRSxFQUFFOEIsRUFDOUJnQixLQUFLLENBQUNoQixFQUFFLEdBQUdhLG9EQUFZQSxDQUFDSCxJQUFJLENBQUNWLEVBQUUsRUFBRWU7SUFFckMsSUFBSSxJQUFJZixJQUFJLEdBQUdBLElBQUlnQixNQUFNOUMsTUFBTSxFQUFFLEVBQUU4QixFQUFHO1FBQ2xDLElBQUlnQixLQUFLLENBQUNoQixFQUFFLENBQUNpQixJQUFJLEtBQUssaUJBQ2xCO1FBRUosTUFBTUMsT0FBTyxLQUFNLENBQUNsQixFQUFFLENBQUNtQixXQUFXLENBQWdCQyxRQUFRO1FBQzFELElBQUlGLEtBQUtHLFFBQVEsS0FBS2pCLFdBQ2xCYyxLQUFLSSxXQUFXLElBQUksT0FBTztJQUNuQztJQUVBLE1BQU1kLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDK0Msb0RBQUlBLEVBQUUsR0FBR0k7SUFFakM3Qyw2REFBcUJBLENBQUMsSUFBRXFDLElBQUlILEVBQUUsRUFBRUs7SUFFaEMsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJTO0FBQ0g7QUFHZCxTQUFTaEIsT0FBT0csSUFBYTtJQUV4QyxJQUFJZSxPQUF1QjtJQUMzQixJQUFJaEIsT0FBT0MsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFDM0IsSUFBSUQsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxLQUFLLEdBQUc7UUFDNUJ1RCxPQUFPZixLQUFLQyxRQUFRLENBQUMsRUFBRTtRQUN2QkYsT0FBT0MsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFDM0I7SUFFQWIsMENBQUUsQ0FBQyxNQUFNLEVBQUUwQix1Q0FBTSxDQUFDZCxLQUFLTCxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUVvQixLQUFLLEVBQUUsRUFBRWhCLEtBQUssRUFBRW5CLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztBQUMvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZHFDO0FBQ2U7QUFDdkI7QUFDa0I7QUFDTDtBQUNFO0FBRTdCLFNBQVN3QixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZEQSxRQUFRYyxhQUFhLENBQUNuQixLQUFLb0IsSUFBSSxDQUFDLEdBQUdGLDBEQUFVQSxDQUFDbEIsS0FBS29CLElBQUk7SUFFdkRmLFVBQVUsSUFBSVksMkNBQU9BLENBQUMsU0FBU1o7SUFFL0IsSUFBSUwsS0FBS3FCLEtBQUssQ0FBQzdELE1BQU0sR0FBRyxHQUNwQixNQUFNLElBQUk4RCxNQUFNO0lBRXBCLElBQUlyQixXQUFXRCxLQUFLcUIsS0FBSyxDQUFDN0QsTUFBTSxLQUFLLElBQy9CO1FBQUMyQyxvREFBWUEsQ0FBQ0gsS0FBS3FCLEtBQUssQ0FBQyxFQUFFLEVBQUVoQjtRQUFVRixvREFBWUEsQ0FBQ0gsS0FBS0QsSUFBSSxFQUFFTTtLQUFTLEdBQ3hFO1FBQUNGLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO0tBQVM7SUFFeEMsTUFBTVAsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUM2RCw4REFBY0EsRUFBRSxHQUFHZjtJQUUzQ2EsdUNBQU0sQ0FBQ2hCLElBQUlILEVBQUUsQ0FBQyxHQUFHSyxLQUFLb0IsSUFBSTtJQUMxQjlDLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCUztBQUNIO0FBR2QsU0FBU2hCLE9BQU9HLElBQWE7SUFFeEMsTUFBTXpDLE1BQU91RCx1Q0FBTSxDQUFDZCxLQUFLTCxFQUFFLENBQUM7SUFDNUIsTUFBTUksT0FBT0MsS0FBS0MsUUFBUSxDQUFDRCxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEdBQUMsRUFBRTtJQUNsRCxNQUFNK0QsT0FBT3ZCLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0lBRTdCYiwwQ0FBRSxDQUFDLFFBQVEsRUFBRTdCLElBQUksSUFBSSxFQUFFZ0UsS0FBSyxFQUFFLEVBQUV4QixLQUFLLEVBQUVuQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWHFDO0FBQ2lCO0FBQ3pCO0FBQ2tCO0FBQ0w7QUFFM0IsU0FBU3dCLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsSUFBSUwsS0FBS3lCLElBQUksQ0FBQ0MsV0FBVyxDQUFDQyxLQUFLLEtBQUssVUFBVTNCLEtBQUt5QixJQUFJLENBQUNHLElBQUksQ0FBQ2pDLEVBQUUsS0FBSyxTQUNoRTtJQUVKLE1BQU1rQyxTQUFTN0IsS0FBSzZCLE1BQU0sQ0FBQ2xDLEVBQUU7SUFDN0JVLFFBQVFjLGFBQWEsQ0FBQ1UsT0FBTyxHQUFHLEdBQUcsTUFBTTtJQUV6QyxNQUFNL0IsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNxRSxnRUFBZ0JBLEVBQUUsR0FBRztRQUN6Q3JCLG9EQUFZQSxDQUFDSCxLQUFLeUIsSUFBSSxFQUFFcEI7UUFDeEJGLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO0tBQzNCO0lBRURTLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR2tDO0lBRWpCdkQsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCUztBQUNIO0FBRXdCO0FBRXRDLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDLE1BQU16QyxNQUFPdUQsdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDO0lBQzVCLE1BQU1JLE9BQU9DLEtBQUtDLFFBQVEsQ0FBQ0QsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxHQUFDLEVBQUU7SUFFbEQsSUFBSUksTUFBNEI7SUFDaEMsSUFBSW1FLE9BQTRCO0lBQ2hDLElBQUlsRSxNQUFPaUUsbUVBQVVBLENBQUM5QixLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUV0QyxJQUFJRCxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEdBQUcsR0FBRztRQUMxQkksTUFBTWtFLG1FQUFVQSxDQUFDOUIsS0FBS0MsUUFBUSxDQUFDLEVBQUU7UUFDakNwQyxNQUFNaUUsbUVBQVVBLENBQUM5QixLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUNyQztJQUNBLElBQUlELEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sR0FBRyxHQUN2QnVFLE9BQU9ELG1FQUFVQSxDQUFDOUIsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFFdEMsT0FBT2IsMENBQUUsQ0FBQyxRQUFRLEVBQUU3QixJQUFJLEdBQUcsRUFBRUssSUFBSSxFQUFFLEVBQUVMLElBQUksR0FBRyxFQUFFTSxJQUFJLEVBQUUsRUFBRU4sSUFBSSxJQUFJLEVBQUV3RSxLQUFLLEVBQUUsRUFBRWhDLEtBQUssRUFBRW5CLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztBQUN6Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJxQztBQUN1QjtBQUMvQjtBQUNrQjtBQUNMO0FBQ0M7QUFFNUIsU0FBU3dCLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsSUFBSUwsS0FBS3lCLElBQUksQ0FBQ0MsV0FBVyxDQUFDQyxLQUFLLEtBQUssVUFBVTNCLEtBQUt5QixJQUFJLENBQUNHLElBQUksQ0FBQ2pDLEVBQUUsS0FBSyxTQUNoRSxPQUFPRDtJQUVYLE1BQU1tQyxTQUFTN0IsS0FBSzZCLE1BQU0sQ0FBQ2xDLEVBQUU7SUFDN0JVLFFBQVFjLGFBQWEsQ0FBQ1UsT0FBTyxHQUFHLEdBQUcsTUFBTTtJQUN6Qyw2Q0FBNkM7SUFDN0N4QixRQUFRYyxhQUFhLENBQUNuQixLQUFLa0MsS0FBSyxDQUFDLEdBQUdELHFEQUFTQTtJQUU3QyxNQUFNbkMsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUM2RSxzRUFBc0JBLEVBQUUsR0FBRztXQUMzQ2hDLEtBQUt5QixJQUFJLENBQUN4QyxJQUFJLENBQUNrRCxHQUFHLENBQUUsQ0FBQ0MsSUFBVWpDLG9EQUFZQSxDQUFDaUMsR0FBRy9CO1FBQ25ERixvREFBWUEsQ0FBQ0gsS0FBS0QsSUFBSSxFQUFFTTtLQUMzQjtJQUVEUyx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUdrQztJQUVqQnZELG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JTO0FBR2pCLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDLEtBQUs7SUFDTFosMENBQUUsQ0FBQyxHQUFHLEVBQUVZLEtBQUtDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFRCxLQUFLQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUVyQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7SUFFckQsVUFBVTtJQUNWLElBQUlVO0lBQ0osSUFBSUEsSUFBSSxHQUFHQSxJQUFJVSxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEdBQUcsR0FBRzhCLEtBQUssRUFBRztRQUM3Q0YsMENBQUUsQ0FBQyxRQUFRLEVBQUVZLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRSxDQUFDLEVBQUUsRUFBRVUsS0FBS0MsUUFBUSxDQUFDWCxJQUFFLEVBQUUsQ0FBQyxFQUFFVixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7SUFDaEU7SUFFQSxPQUFPO0lBQ1AsSUFBSVUsTUFBTVUsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxHQUFHLEdBQzdCNEIsMENBQUUsQ0FBQyxNQUFNLEVBQUVZLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRSxDQUFDLEVBQUVWLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztBQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCcUM7QUFDcUI7QUFDWDtBQUNMO0FBRTNCLFNBQVN3QixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELEtBQUs7SUFDTCxNQUFNSixXQUFXO1FBQ2JFLG9EQUFZQSxDQUFDSCxLQUFLc0MsSUFBSSxFQUFFakM7UUFDeEJGLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO0tBQzNCO0lBRUQsVUFBVTtJQUNWLElBQUlrQyxNQUFNdkM7SUFDVixNQUFPLFlBQVl1QyxPQUFPQSxJQUFJQyxNQUFNLENBQUNoRixNQUFNLEtBQUssS0FBSyxVQUFVK0UsSUFBSUMsTUFBTSxDQUFDLEVBQUUsQ0FBRTtRQUMxRUQsTUFBTUEsSUFBSUMsTUFBTSxDQUFDLEVBQUU7UUFFbkJ2QyxTQUFTd0MsSUFBSSxDQUNUdEMsb0RBQVlBLENBQUNvQyxJQUFJRCxJQUFJLEVBQUVqQyxVQUN2QkYsb0RBQVlBLENBQUNvQyxJQUFJeEMsSUFBSSxFQUFFTTtJQUUvQjtJQUNBLE9BQU87SUFDUCxJQUFJLFlBQVlrQyxPQUFPQSxJQUFJQyxNQUFNLENBQUNoRixNQUFNLEtBQUssR0FDekN5QyxTQUFTd0MsSUFBSSxDQUFFdEMsb0RBQVlBLENBQUNvQyxJQUFJQyxNQUFNLEVBQUVuQztJQUU1QyxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ2tGLG9FQUFvQkEsRUFBRSxHQUFHcEM7SUFFakQzQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDSztBQUdiLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDLE1BQU0wQyxPQUFXMUMsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFDakMsTUFBTTBDLFVBQVczQyxLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUNqQyxNQUFNMkMsV0FBVzVDLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0lBRWpDYiwwQ0FBRSxDQUFDLENBQUMsRUFBRXNELEtBQUssR0FBRyxFQUFFQyxRQUFRLEdBQUcsRUFBRUMsU0FBUyxDQUFDLENBQUM7QUFDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWcUM7QUFDcUI7QUFDWDtBQUNMO0FBRTNCLFNBQVN4QyxRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1xQyxPQUFhdkMsb0RBQVlBLENBQUNILEtBQUtzQyxJQUFJLEVBQUVqQztJQUMzQyxNQUFNeUMsWUFBYTNDLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO0lBQzNDLE1BQU0wQyxhQUFhNUMsb0RBQVlBLENBQUNILEtBQUt3QyxNQUFNLEVBQUVuQztJQUU3QyxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzBGLG9FQUFvQkEsRUFBRUMsVUFBVXJDLFdBQVcsRUFBRTtRQUNqRWlDO1FBQ0FJO1FBQ0FDO0tBQ0g7SUFFRHpFLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJvQjtBQUc1QixTQUFTaEIsT0FBT0csSUFBYTtJQUV4Q1osMENBQUUsQ0FBQyxLQUFLLEVBQUVZLEtBQUtDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRXJCLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztJQUNsQ1EsMENBQUUsQ0FBQyxpQkFBaUIsRUFBRU4sc0NBQUVBLENBQUMsRUFBRUYsc0NBQUVBLENBQUMsQ0FBQztJQUUzQk8seUNBQUNBLENBQUM7SUFFRixJQUFJYSxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEdBQUcsR0FDdkIyQix5Q0FBQ0EsQ0FBRWEsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFFdkIsSUFBSSxJQUFJWCxJQUFJLEdBQUdBLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sRUFBRSxFQUFFOEIsRUFDdkNILHlDQUFDQSxDQUFDUCxzQ0FBRUEsRUFBRSxTQUFTb0IsS0FBS0MsUUFBUSxDQUFDWCxFQUFFO0lBRW5DLHFCQUFxQjtJQUNyQixJQUFJVSxLQUFLQyxRQUFRLENBQUNELEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sR0FBQyxFQUFFLENBQUN5QyxRQUFRLENBQUN6QyxNQUFNLEtBQUssR0FDMUQyQix5Q0FBQ0EsQ0FBQ1Asc0NBQUVBLEVBQUU7SUFFZE8seUNBQUNBLENBQUNKLHNDQUFFQSxFQUFFSCxzQ0FBRUE7QUFFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCcUM7QUFDc0I7QUFDWjtBQUNMO0FBRTNCLFNBQVN3QixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1KLFdBQVcsSUFBSVQsTUFBZVEsS0FBS2lELFFBQVEsQ0FBQ3pGLE1BQU0sR0FBQztJQUV6RCxXQUFXO0lBQ1h5QyxRQUFRLENBQUMsRUFBRSxHQUFHRSxvREFBWUEsQ0FBQ0gsS0FBS0QsSUFBSSxFQUFFTTtJQUV0QyxJQUFJLElBQUlmLElBQUksR0FBR0EsSUFBSVUsS0FBS2lELFFBQVEsRUFBRSxFQUFFM0QsRUFDaENXLFFBQVEsQ0FBQ1gsSUFBRSxFQUFFLEdBQUdhLG9EQUFZQSxDQUFDSCxLQUFLaUQsUUFBUSxDQUFDM0QsRUFBRSxFQUFFZTtJQUVuRCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzZGLHFFQUFxQkEsRUFBRSxHQUFHL0M7SUFFbEQzQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCUztBQUdqQixTQUFTaEIsT0FBT0csSUFBYTtJQUV4Qyw4QkFBOEI7SUFFOUIsSUFBR0EsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxLQUFLLEdBQ3hCLE9BQU80QiwwQ0FBRSxDQUFDLENBQUMsRUFBRVksS0FBS0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVyQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7SUFFMUNRLDBDQUFFLENBQUMsR0FBRyxFQUFFWSxLQUFLQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRUQsS0FBS0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0FBQ3pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hxQztBQUM0QjtBQUNwQztBQUNrQjtBQUNMO0FBRTNCLFNBQVN3QixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELElBQUlKO0lBQ0osSUFBSUQsS0FBS08sSUFBSSxLQUFLYixXQUFXO1FBQ3pCTyxXQUFXO1lBQUNFLG9EQUFZQSxDQUFDSCxLQUFLTyxJQUFJLEVBQUVGO1lBQVVGLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO1NBQVM7SUFDbkYsT0FBTztRQUNISixXQUFXO1lBQUVFLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO1NBQVU7SUFDbkQ7SUFFQSxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQytGLDJFQUEyQkEsRUFBRSxHQUFHakQ7SUFFeERhLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR0ssS0FBS29CLElBQUk7SUFDMUI5QyxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QnFCO0FBRWY7QUFJN0IsU0FBU3VDLGFBQWFDLEtBQWU7SUFDbkMsT0FBT0EsTUFBTUMsTUFBTSxDQUFFQyxDQUFBQSxJQUFLQSxFQUFFQyxRQUFRLENBQUMsY0FBZSxrQkFBa0I7QUFDeEU7QUFFQSwwQkFBMEI7QUFDMUIsU0FBU0MsNkJBQTZCQyxLQUFnQixFQUFFQyxJQUFZLEVBQUVDLEdBQVc7SUFFL0UsU0FBUztJQUNUOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JGLEdBRUUsT0FBTyxNQUFNLG9DQUFvQztBQUNuRDtBQUVPLFNBQVNDLGtCQUFrQkMsU0FBb0IsRUFBRUMsRUFBWTtJQUNsRSxNQUFNakUsTUFBTWlFLEdBQUdDLFNBQVMsQ0FBQztJQUN6QixPQUFPUCw2QkFBNkIzRCxJQUFJQyxJQUFJLENBQUNFLFFBQVEsRUFBRTZELFNBQVMsQ0FBQyxFQUFFLEVBQUVBLFNBQVMsQ0FBQyxFQUFFO0FBQ25GO0FBSUEsZUFBZTtBQUNSLFNBQVNHLGVBQWVaLEtBQWtCLEVBQUVVLEVBQVk7SUFDN0QsT0FBT1YsTUFBTWxCLEdBQUcsQ0FBRW9CLENBQUFBLElBQUtNLGtCQUFrQk4sR0FBR1E7QUFDOUM7QUFFQSxtQkFBbUI7QUFDWixTQUFTRyxZQUFZYixLQUFVLEVBQUVVLEVBQVk7SUFJaERWLFFBQVFBLE1BQU1jLEtBQUssQ0FBQztJQUVwQixNQUFNQyxPQUFPZixLQUFLLENBQUMsRUFBRSxLQUFJO0lBRXpCLE9BQU9ELGFBQWFDLE9BQU9sQixHQUFHLENBQUVrQyxDQUFBQTtRQUU5QixJQUFJLENBQUNDLEdBQUdDLE9BQU9DLEtBQUssR0FBR0gsRUFBRUYsS0FBSyxDQUFDO1FBRS9CLElBQUlLLElBQUksQ0FBQ0EsS0FBS2hILE1BQU0sR0FBQyxFQUFFLEtBQUssS0FDMUJnSCxPQUFPQSxLQUFLQyxLQUFLLENBQUMsR0FBRSxDQUFDO1FBRXZCLElBQUlkLE9BQU8sQ0FBQ1ksUUFBUTtRQUNwQixJQUFJWCxNQUFPLENBQUNZO1FBRVosRUFBRVosS0FBSyxjQUFjO1FBRXJCLElBQUljO1FBQ0osSUFBSU4sTUFBTztZQUNULElBQUlPLE1BQU1MLEVBQUVNLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCRixXQUFXSixFQUFFRyxLQUFLLENBQUMsR0FBR0U7WUFDdEIsSUFBSUQsYUFBYSxRQUNmQSxXQUFXO1lBRWIseUJBQXlCO1lBQ3pCLE1BQU01RSxNQUFNaUUsR0FBR0MsU0FBUyxDQUFDO1lBQ3pCLE1BQU1oRSxPQUFPeUQsNkJBQTZCM0QsSUFBSUMsSUFBSSxDQUFDRSxRQUFRLEVBQUUwRCxNQUFNQztZQUNuRSxJQUFHNUQsS0FBS0osT0FBTyxLQUFLdUQsc0RBQU1BLEVBQ3hCUyxPQUFPOUMsdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDLENBQUNuQyxNQUFNLEVBQUUsbUVBQW1FO1FBRXRHLE9BQU87WUFDTCxJQUFJbUgsTUFBTUwsRUFBRU0sT0FBTyxDQUFDO1lBQ3BCRixXQUFXSixFQUFFRyxLQUFLLENBQUMsR0FBR0U7WUFDdEIsSUFBSUQsYUFBYSxhQUNmQSxXQUFXO1FBQ2Y7UUFFQSxPQUFPO1lBQUNBO1lBQVVmO1lBQU1DO1NBQUk7SUFDOUI7QUFDSjtBQUVBLFNBQVNpQixzQkFBc0JDLEdBQWlCLEVBQUVmLEVBQVk7SUFFMURnQixRQUFRQyxJQUFJLENBQUMsYUFBYUY7SUFFMUIsTUFBTXpCLFFBQVFhLFlBQWEsSUFBYWUsU0FBUyxDQUFDNUIsS0FBSyxFQUFFVTtJQUN6RCxNQUFNTCxRQUFRTyxlQUFlWixPQUFPVTtJQUNwQyx3QkFBd0I7SUFDeEIsNkJBQTZCO0lBQzdCLE1BQU1tQixZQUFZN0IsTUFBTWxCLEdBQUcsQ0FBRSxDQUFDa0MsR0FBRS9FLElBQU0sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEtBQUssRUFBRStELEtBQUssQ0FBQy9ELEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVuRixJQUFJNkYsZ0JBQ1IsQ0FBQztFQUNDLEVBQUVELFVBQVVFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNYLENBQUM7SUFFYkwsUUFBUU0sR0FBRyxDQUFDRjtBQUNoQjtBQUVBLFNBQVNHLGlCQUFpQkwsU0FBYyxFQUFFTSxZQUFpQjtJQUN6RCxhQUFhO0lBQ2IsTUFBTUMsUUFBUVAscUJBQXFCUSxJQUFJQyxXQUFXLEdBQ3BDVCxVQUFVVSxnQkFBZ0IsR0FFMUIsSUFBSUMsSUFBSUMsV0FBVyxDQUFDWjtJQUVsQ0osc0JBQXNCVyxPQUFPRDtJQUU3QixPQUFPQztBQUNUO0FBRUEsaUVBQWU7SUFDWFg7SUFDQVM7QUFDSixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SDhCO0FBR2pCLFNBQVN6RixPQUFPRyxJQUFhO0lBRXhDLE1BQU0wQyxPQUFPMUMsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFDN0IsTUFBTUYsT0FBT0MsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFFN0JiLDBDQUFFLENBQUMsTUFBTSxFQUFFc0QsS0FBSyxFQUFFLEVBQUUzQyxLQUFLLEVBQUVuQixzQ0FBRUEsQ0FBQyxFQUFFLENBQUM7QUFDckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUcUM7QUFDbUI7QUFDVDtBQUNMO0FBRTNCLFNBQVN3QixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1QLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDMkksa0VBQWtCQSxFQUFFLEdBQUc7UUFDM0MzRixvREFBWUEsQ0FBQ0gsS0FBS3NDLElBQUksRUFBRWpDO1FBQ3hCRixvREFBWUEsQ0FBQ0gsS0FBS0QsSUFBSSxFQUFFTTtLQUMzQjtJQUVEL0IsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakIyQjtBQUNYO0FBRTJCO0FBRVY7QUFDaUI7QUFFMUQsU0FBU2hCLE9BQU9HLElBQWE7SUFFeEMsTUFBTWYsT0FBWWU7SUFDbEIsTUFBTW1HLFFBQVlsSCxLQUFLZ0IsUUFBUTtJQUMvQixNQUFNbUcsWUFBWXRGLHVDQUFNLENBQUM3QixLQUFLVSxFQUFFLENBQUM7SUFFakMsTUFBTWEsT0FBTzRGLFVBQVUxRixRQUFRO0lBRS9CLElBQUkyRixXQUFXN0YsS0FBSzhGLFdBQVc7SUFDL0IsSUFBSUQsYUFBYUUsT0FBT0MsaUJBQWlCLEVBQ3JDSCxXQUFXN0YsS0FBS2lHLFVBQVUsR0FBRztJQUVqQyxJQUFJakcsS0FBS2tHLE1BQU0sS0FBS2hILGFBQWEyRyxhQUFhRixNQUFNM0ksTUFBTSxHQUFDLEdBQ3ZELEVBQUU2STtJQUVOLElBQUksSUFBSS9HLElBQUksR0FBSUEsSUFBSTZHLE1BQU0zSSxNQUFNLEVBQUUsRUFBRThCLEVBQUc7UUFDbkMsSUFBSUEsTUFBTSxHQUNOSCx5Q0FBQ0EsQ0FBQztRQUVOLElBQUlrSCxhQUFhL0csR0FDYkgseUNBQUNBLENBQUM7UUFDTixJQUFJRyxNQUFNa0IsS0FBS2lHLFVBQVUsSUFBSW5ILE1BQU02RyxNQUFNM0ksTUFBTSxHQUFDLEdBQzVDLEtBQU0sQ0FBQzhCLEVBQUUsQ0FBU3FILElBQUksR0FBRztRQUU3QkMsVUFBVVQsS0FBSyxDQUFDN0csRUFBRTtJQUN0QjtJQUVBLElBQUkrRyxXQUFXRixNQUFNM0ksTUFBTSxFQUN2QjJCLHlDQUFDQSxDQUFDO0FBQ1Y7QUFFQSxTQUFTeUgsVUFBVTVHLElBQWE7SUFFNUIsTUFBTXRDLFNBQVMsSUFBRXNDLEtBQUtMLEVBQUU7SUFDeEJyQyxxREFBYUEsQ0FBQ0ksU0FBU2IseUNBQVFBO0lBRS9CLE1BQU11RSxPQUFPTix1Q0FBTSxDQUFDZCxLQUFLTCxFQUFFLENBQUM7SUFFNUIsSUFBSUssS0FBS0osT0FBTyxLQUFLc0csNERBQW1CQSxFQUFHO1FBQ3ZDLElBQUksS0FBY1MsSUFBSSxFQUNsQnZILDBDQUFFLENBQUMsR0FBRyxFQUFFZ0MsS0FBSyxDQUFDO2FBRWRsQywwQ0FBRUEsQ0FBRTZHLG9FQUFXQSxDQUFDL0YsTUFBTW9CLE1BQU0sS0FBSztJQUN6QyxPQUFPLElBQUlwQixLQUFLSixPQUFPLEtBQUtxRyw2REFBb0JBLEVBQUc7UUFDL0MvRywwQ0FBRUEsQ0FBRTZHLG9FQUFXQSxDQUFDL0YsTUFBTW9CLE1BQU0sS0FBSztJQUNyQyxPQUFPLElBQUdwQixLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEtBQUssR0FBSTtRQUVuQyxJQUFJMEUsUUFBYWxDLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pDLElBQUlpQyxNQUFNekIsV0FBVyxLQUFLdUYsdURBQVdBLElBQUloRyxLQUFLUyxXQUFXLEtBQUt3QixxREFBU0EsRUFDbkVDLFFBQVFKLG1FQUFVQSxDQUFDSTtRQUV2QmhELDBDQUFFQSxDQUFFNkcsb0VBQVdBLENBQUMvRixNQUFNb0IsTUFBTSxLQUFLYztJQUNyQyxPQUFNO1FBQ0YvQyx5Q0FBQ0EsQ0FBQ2lDO0lBQ047SUFFQTlELHFEQUFhQSxDQUFDSSxTQUFTYix5Q0FBUUE7QUFDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFK0M7QUFDTDtBQUVVO0FBQ21CO0FBQ3lCO0FBRWhHLG9CQUFvQjtBQUNMLFNBQVN1RDtJQUNwQiw2QkFBNkI7SUFDN0I7QUFDSjtBQUVPLE1BQU0wRyx5QkFBeUIsRUFBRTtBQUNqQyxNQUFNYix1QkFBeUIsRUFBRTtBQUNqQyxNQUFNYyx3QkFBeUIsRUFBRTtBQUNqQyxNQUFNYixzQkFBeUIsRUFBRTtBQUNqQyxNQUFNYyxxQkFBeUIsRUFBRTtBQUd4QzVHLFFBQVFTLFlBQVksR0FBRztBQUVoQixTQUFTb0csYUFBYWpILElBQVMsRUFBRW9HLFNBQW1CLEVBQUUvRixPQUFnQjtJQUV6RSxNQUFNRyxPQUFPNEYsVUFBVTFGLFFBQVE7SUFFL0IsTUFBTXlGLFFBQVFuRyxLQUFLZixJQUFJO0lBQ3ZCLE1BQU1pSSxhQUFhZixNQUFNZ0IsTUFBTSxLQUFLekg7SUFDcEMsTUFBTTBILFlBQWFqQixNQUFNa0IsS0FBSyxLQUFNM0g7SUFDcEMsTUFBTTRILFdBQWE5RyxLQUFLOEcsUUFBUTtJQUNoQyxNQUFNQyxhQUFhL0csS0FBSytHLFVBQVU7SUFFbEMsTUFBTUMsYUFBYXJCLE1BQU1zQixXQUFXLENBQUNqSyxNQUFNLEdBQ3hCMkksTUFBTWxILElBQUksQ0FBQ3pCLE1BQU0sR0FDakIsQ0FBQzBKLGFBQ0RmLE1BQU11QixVQUFVLENBQUNsSyxNQUFNLEdBQ3ZCLENBQUM0SjtJQUVwQixNQUFNbkksT0FBTyxJQUFJTyxNQUFlZ0k7SUFFaEMsTUFBTUcsZUFBZTNILEtBQUtmLElBQUksQ0FBQzJJLFFBQVE7SUFDdkMsTUFBTUMsVUFBVTFCLE1BQU1zQixXQUFXO0lBQ2pDLE1BQU05QyxNQUFVd0IsTUFBTWxILElBQUk7SUFFMUIsVUFBVTtJQUNWLElBQUk2SSxVQUFVSCxhQUFhbkssTUFBTSxHQUFHcUssUUFBUXJLLE1BQU0sR0FBR21ILElBQUluSCxNQUFNO0lBQy9ELElBQUksSUFBSThCLElBQUksR0FBR0EsSUFBSXVJLFFBQVFySyxNQUFNLEVBQUUsRUFBRThCLEVBQUk7UUFDckMsTUFBTUMsTUFBTXdJLFlBQVlGLE9BQU8sQ0FBQ3ZJLEVBQUUsRUFBRXFJLFlBQVksQ0FBQ3JJLElBQUl3SSxRQUFRLEVBQUVoQix3QkFBd0J6RztRQUN2RkEsUUFBUWMsYUFBYSxDQUFDMEcsT0FBTyxDQUFDdkksRUFBRSxDQUFDQyxHQUFHLENBQUMsR0FBR0EsSUFBSWtCLFdBQVc7UUFDdkR4QixJQUFJLENBQUNLLEVBQUUsR0FBR0M7SUFDZDtJQUVBLE1BQU07SUFDTixJQUFJN0IsU0FBU21LLFFBQVFySyxNQUFNO0lBQ3pCc0ssV0FBV0QsUUFBUXJLLE1BQU07SUFDM0IsSUFBSSxJQUFJOEIsSUFBSSxHQUFHQSxJQUFJcUYsSUFBSW5ILE1BQU0sRUFBRSxFQUFFOEIsRUFBSTtRQUNqQyxNQUFNQyxNQUFNd0ksWUFBWXBELEdBQUcsQ0FBQ3JGLEVBQUUsRUFBRXFJLFlBQVksQ0FBQ3JJLElBQUl3SSxRQUFRLEVBQUVkLG9CQUFvQjNHO1FBRS9FLE1BQU1lLE9BQU91RCxHQUFHLENBQUNyRixFQUFFLENBQUNDLEdBQUc7UUFDdkJjLFFBQVFjLGFBQWEsQ0FBQ0MsS0FBSyxHQUFHN0IsSUFBSWtCLFdBQVc7UUFDN0M4RyxVQUFVLENBQUM3SixPQUFPLEdBQUcwRDtRQUVyQm5DLElBQUksQ0FBQ3ZCLFNBQVMsR0FBRzZCO0lBQ3JCO0lBRUFpQixLQUFLaUcsVUFBVSxHQUFHL0k7SUFFbEIsU0FBUztJQUNULElBQUl3SixZQUFhO1FBQ2IxRyxLQUFLOEYsV0FBVyxHQUFHQyxPQUFPQyxpQkFBaUI7UUFFM0MsTUFBTWpILE1BQU13SSxZQUFZNUIsTUFBTWdCLE1BQU0sRUFBRXpILFdBQVd3RyxxQkFBcUI3RjtRQUN0RUEsUUFBUWMsYUFBYSxDQUFDZ0YsTUFBTWdCLE1BQU0sQ0FBQzVILEdBQUcsQ0FBQyxHQUFHQSxJQUFJa0IsV0FBVztRQUN6RHhCLElBQUksQ0FBQ3ZCLFNBQVMsR0FBRzZCO0lBQ3JCLE9BQU87UUFFSGlCLEtBQUs4RixXQUFXLEdBQUc1STtRQUVuQixNQUFNc0ssa0JBQWtCQyxLQUFLQyxHQUFHLENBQUNQLGFBQWFuSyxNQUFNLEVBQUVtSCxJQUFJbkgsTUFBTTtRQUNoRSxNQUFNMkssYUFBYVIsYUFBYW5LLE1BQU0sR0FBR21ILElBQUluSCxNQUFNLElBQUl5QixLQUFLekIsTUFBTSxLQUFLRTtRQUV2RSxJQUFJc0ssa0JBQWtCLEtBQUtBLG9CQUFvQixLQUFLRyxZQUNoRDNILEtBQUs4RixXQUFXLElBQUkwQjtJQUM1QjtJQUVBLElBQUlJLFVBQVk1SCxLQUFLOEYsV0FBVztJQUNoQyxJQUFJOEIsWUFBWTdCLE9BQU9DLGlCQUFpQixFQUNwQzRCLFVBQVU1SCxLQUFLaUcsVUFBVTtJQUM3QixJQUFJLElBQUluSCxJQUFJdUksUUFBUXJLLE1BQU0sRUFBRThCLElBQUk4SSxTQUFTLEVBQUU5SSxFQUN2Q2dJLFFBQVEsQ0FBQ3hHLHVDQUFNLENBQUM3QixJQUFJLENBQUNLLEVBQUUsQ0FBQ0ssRUFBRSxDQUFDLENBQUMsR0FBR0w7SUFFbkMsTUFBTXpCLE1BQU0yQyxLQUFLaUcsVUFBVSxHQUFHMkI7SUFDOUIsSUFBSSxJQUFJOUksSUFBSSxHQUFHQSxJQUFJekIsS0FBSyxFQUFFeUIsRUFDdEJnSSxRQUFRLENBQUN4Ryx1Q0FBTSxDQUFDN0IsSUFBSSxDQUFDSyxFQUFFLENBQUNLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUVwQyxrREFBa0Q7SUFFbEQsU0FBUztJQUNULE1BQU0wSSxTQUFjbEMsTUFBTXVCLFVBQVU7SUFDcEMsTUFBTVksY0FBY25DLE1BQU1tQyxXQUFXO0lBRXJDOUgsS0FBSytILE1BQU0sR0FBRy9ILEtBQUtpRyxVQUFVLEtBQUsyQixXQUFXQyxPQUFPN0ssTUFBTSxLQUFLO0lBRS9Ec0ssVUFBVVEsWUFBWTlLLE1BQU0sR0FBRzZLLE9BQU83SyxNQUFNO0lBQzVDLElBQUksSUFBSThCLElBQUksR0FBR0EsSUFBSStJLE9BQU83SyxNQUFNLEVBQUUsRUFBRThCLEVBQUk7UUFDcEMsTUFBTUMsTUFBTXdJLFlBQVlNLE1BQU0sQ0FBQy9JLEVBQUUsRUFBRWdKLFdBQVcsQ0FBQ2hKLEVBQUUsRUFBRXlILHVCQUF1QjFHO1FBQzFFLE1BQU1lLE9BQU9pSCxNQUFNLENBQUMvSSxFQUFFLENBQUNDLEdBQUc7UUFFMUJjLFFBQVFjLGFBQWEsQ0FBQ0MsS0FBSyxHQUFHN0IsSUFBSWtCLFdBQVc7UUFDN0M2RyxRQUFRLENBQUNsRyxLQUFLLEdBQUcsQ0FBQztRQUVsQm5DLElBQUksQ0FBQ3ZCLFNBQVMsR0FBRzZCO0lBQ3JCO0lBRUEsUUFBUTtJQUNSLElBQUk2SCxXQUFZO1FBQ1osTUFBTTdILE1BQU13SSxZQUFZNUIsTUFBTWtCLEtBQUssRUFBRTNILFdBQVd1RyxzQkFBc0I1RjtRQUN0RSxNQUFNZSxPQUFPK0UsTUFBTWtCLEtBQUssQ0FBQzlILEdBQUc7UUFFNUJjLFFBQVFjLGFBQWEsQ0FBQ0MsS0FBSyxHQUFHN0IsSUFBSWtCLFdBQVc7UUFDN0N4QixJQUFJLENBQUN2QixTQUFTLEdBQUc2QjtRQUVqQmlCLEtBQUtrRyxNQUFNLEdBQUd0RjtJQUNsQjtJQUVBLFNBQVM7SUFDVDs7O0lBR0EsR0FFQSxTQUFTO0lBRVQsTUFBTXRCLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDMEosOERBQWNBLEVBQUUsR0FBRzVIO0lBRTNDYSxJQUFJRixPQUFPLEdBQUdpSCw4REFBY0E7SUFDNUIvRix1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUd5RztJQUVqQixNQUFNb0MsWUFBWSxJQUFFMUksSUFBSUgsRUFBRTtJQUUxQixJQUFJVixLQUFLekIsTUFBTSxLQUFLLEdBQUc7UUFFbkJVLHVEQUFlQSxDQUFFLElBQUVlLElBQUksQ0FBQyxFQUFFLENBQUNVLEVBQUUsRUFBYzZJO1FBQzNDbkssdURBQWVBLENBQUUsSUFBRVksSUFBSSxDQUFDQSxLQUFLekIsTUFBTSxHQUFDLEVBQUUsQ0FBQ21DLEVBQUUsRUFBRTZJO0lBRS9DLE9BQU87UUFDSCxtQkFBbUI7UUFDbkIsTUFBTTVFLE1BQU01RCxLQUFLakMsVUFBVSxHQUFHLElBQUlpQyxLQUFLb0IsSUFBSSxDQUFDNUQsTUFBTSxHQUFHO1FBRXJETix3Q0FBTyxDQUFFc0wsWUFBWTdMLDhDQUFhQSxDQUFFLEdBQUdPLHdDQUFPLENBQUVzTCxZQUFZekwsOENBQWFBLENBQUUsR0FBR2lELEtBQUtsQyxNQUFNO1FBQ3pGWix3Q0FBTyxDQUFFc0wsWUFBWTlMLDZDQUFZQSxDQUFHLEdBQUdRLHdDQUFPLENBQUVzTCxZQUFZMUwsNkNBQVlBLENBQUcsR0FBRzhHO0lBQ2xGO0lBRUEsT0FBTzlEO0FBQ1g7QUFDTyxTQUFTaUksWUFBWS9ILElBQVMsRUFBRXlJLE1BQVcsRUFBRWxJLElBQVcsRUFBRUYsT0FBZ0I7SUFFN0UsSUFBSUksY0FBY1QsS0FBSzBJLFVBQVUsRUFBRS9JO0lBQ25DLElBQUlNLFdBQVcsSUFBSVQ7SUFDbkIsSUFBSWlKLFdBQVcvSSxXQUFZO1FBRXZCLE1BQU1pSixRQUFReEksb0RBQVlBLENBQUVzSSxRQUFPcEk7UUFDbkNKLFNBQVN3QyxJQUFJLENBQUVrRztRQUVmLElBQUlsSSxnQkFBZ0JmLFdBQVk7WUFDNUJlLGNBQWNrSSxNQUFNbEksV0FBVztZQUMvQixJQUFHQSxnQkFBZ0IsU0FDZkEsY0FBYztRQUN0QjtJQUNKO0lBRUEsTUFBTVgsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNvRCxNQUFNRSxhQUFhUjtJQUUzQ2EsdUNBQU0sQ0FBQ2hCLElBQUlILEVBQUUsQ0FBQyxHQUFHSyxLQUFLVCxHQUFHO0lBRXpCakIsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xMK0I7QUFDNkI7QUFDL0I7QUFLN0IsU0FBUytJLFVBQVVDLEdBQXdCO0lBRXZDLE1BQU1DLE9BQU9DLE9BQU9ELElBQUksQ0FBQ0Q7SUFDekIsSUFBR0MsS0FBS3ZMLE1BQU0sS0FBSyxHQUNmLE9BQU87UUFBQyxFQUFFO0tBQUM7SUFFZixNQUFNNkIsTUFBTSxJQUFJRyxNQUFNdUosS0FBS3ZMLE1BQU0sR0FBQztJQUNsQzZCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUwSixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN4QixJQUFJeko7SUFDSixJQUFJQSxJQUFJLEdBQUdBLElBQUl5SixLQUFLdkwsTUFBTSxFQUFFLEVBQUU4QixFQUMxQkQsR0FBRyxDQUFDQyxFQUFFLEdBQUksQ0FBQyxFQUFFLEVBQUV5SixJQUFJLENBQUN6SixFQUFFLENBQUMsRUFBRSxDQUFDO0lBRTlCRCxHQUFHLENBQUNDLEVBQUUsR0FBRztJQUVULE9BQU87UUFBQ0Q7V0FBUTJKLE9BQU9DLE1BQU0sQ0FBQ0g7S0FBSztBQUN2QztBQUVBLFNBQVMxRCxLQUFLOEQsSUFBVyxFQUFFQyxNQUFJLElBQUk7SUFFL0IsSUFBR0QsS0FBSzFMLE1BQU0sS0FBSyxHQUNmLE9BQU87UUFBQztZQUFDO1NBQUc7S0FBQztJQUVqQixNQUFNNkIsTUFBTSxJQUFJRyxNQUFNMEosS0FBSzFMLE1BQU0sR0FBQztJQUNsQzZCLEdBQUcsQ0FBQyxFQUFFLEdBQUc7SUFDVCxJQUFJQztJQUNKLElBQUlBLElBQUksR0FBR0EsSUFBSTRKLEtBQUsxTCxNQUFNLEVBQUUsRUFBRThCLEVBQzFCRCxHQUFHLENBQUNDLEVBQUUsR0FBRzZKO0lBQ2I5SixHQUFHLENBQUNDLEVBQUUsR0FBRztJQUVULE9BQU87UUFBQ0Q7V0FBUTZKO0tBQUs7QUFDekI7QUFFTyxTQUFTRSxhQUFhcEosSUFBYTtJQUV0QyxNQUFNUSxPQUFPLHVDQUFPLENBQUNSLEtBQUtMLEVBQUUsQ0FBQyxDQUFjZSxRQUFRO0lBRW5ELElBQUkySSxTQUFTckosS0FBS0MsUUFBUSxDQUFDekMsTUFBTTtJQUNqQyxJQUFJLElBQUk4QixJQUFJLEdBQUdBLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sRUFBRSxFQUFFOEIsRUFDdkMsSUFBR1UsS0FBS0MsUUFBUSxDQUFDWCxFQUFFLENBQUNNLE9BQU8sS0FBS2dKLHNFQUFzQkEsRUFBRTtRQUNwRFMsU0FBUy9KO1FBQ1Q7SUFDSjtJQUVKLElBQUlnSyxTQUFTOUksS0FBSzhGLFdBQVc7SUFDN0IsSUFBSWdELFdBQVcvQyxPQUFPQyxpQkFBaUIsRUFDbkM4QyxTQUFTckIsS0FBS3NCLEdBQUcsQ0FBQy9JLEtBQUtpRyxVQUFVLEVBQUU0QyxTQUFPO0lBRTlDLElBQUlHLFdBQVdGLFNBQU87SUFDdEIsSUFBSTlJLEtBQUsrSCxNQUFNLElBQUkvSCxLQUFLOEYsV0FBVyxLQUFLQyxPQUFPQyxpQkFBaUIsRUFDNURnRCxXQUFXaEosS0FBS2lHLFVBQVUsR0FBQztJQUMvQixJQUFJOUIsTUFBTSxJQUFJbkYsTUFBTWdLO0lBRXBCLE1BQU1DLEtBQWtDLENBQUM7SUFDekMsTUFBTS9DLFNBQWtDLENBQUM7SUFFekMsSUFBSTZCLFNBQVM7SUFFYixJQUFJL0gsS0FBSytILE1BQU0sSUFBSS9ILEtBQUs4RixXQUFXLEtBQUtDLE9BQU9DLGlCQUFpQixFQUFHO1FBRS9ELE1BQU1rRCxTQUFTekIsS0FBS0MsR0FBRyxDQUFDbUIsUUFBUTdJLEtBQUtpRyxVQUFVO1FBRS9DLElBQUksSUFBSW5ILElBQUksR0FBR0EsSUFBSW9LLFFBQVEsRUFBRXBLLEVBQ3pCcUYsR0FBRyxDQUFDckYsSUFBRSxFQUFFLEdBQUdVLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRTtRQUUvQixJQUFJa0IsS0FBS2lHLFVBQVUsR0FBQyxNQUFNNEMsUUFDdEIxRSxHQUFHLENBQUNuRSxLQUFLaUcsVUFBVSxDQUFDLEdBQUdyQixLQUFLO1lBQUM7WUFBS0EsS0FBS3BGLEtBQUtDLFFBQVEsQ0FBQ3dFLEtBQUssQ0FBQ2pFLEtBQUtpRyxVQUFVLEdBQUMsR0FBRTRDO1lBQVU7U0FBSSxFQUFFO0lBQ3JHLE9BQU87UUFFSCxNQUFNSyxTQUFTekIsS0FBS0MsR0FBRyxDQUFDbUIsUUFBUUMsU0FBTztRQUV2QyxJQUFJLElBQUloSyxJQUFJLEdBQUdBLElBQUlvSyxRQUFRLEVBQUVwSyxFQUN6QnFGLEdBQUcsQ0FBQ3JGLElBQUUsRUFBRSxHQUFHVSxLQUFLQyxRQUFRLENBQUNYLEVBQUU7UUFFL0IsTUFBTWlJLGFBQWEvRyxLQUFLK0csVUFBVTtRQUNsQyxJQUFJLElBQUlqSSxJQUFJb0ssUUFBUXBLLElBQUkrSixRQUFRLEVBQUUvSixFQUM5Qm1LLEVBQUUsQ0FBRWxDLFVBQVUsQ0FBQ2pJLElBQUUsRUFBRSxDQUFFLEdBQUdVLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRTtRQUU1Q2lKLFNBQVNtQixXQUFXTDtJQUN4QjtJQUVBLElBQUlNLGFBQWE7SUFFakIsTUFBTXJDLFdBQVc5RyxLQUFLOEcsUUFBUTtJQUc5QixJQUFJLElBQUloSSxJQUFJK0osUUFBUS9KLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sRUFBRSxFQUFFOEIsRUFBRztRQUUvQyxNQUFNQyxNQUFPUyxLQUFLQyxRQUFRLENBQUNYLEVBQUU7UUFDN0IsTUFBTThCLE9BQU9OLHVDQUFNLENBQUN2QixJQUFJSSxFQUFFLENBQUM7UUFDM0IsTUFBTXBDLE1BQU8rSixRQUFRLENBQUVsRyxLQUFNO1FBRTdCLElBQUk3RCxPQUFPLEdBQUk7WUFDWG9ILEdBQUcsQ0FBQ3BILElBQUksR0FBR2dDO1lBQ1g7UUFDSjtRQUVBZ0osU0FBUztRQUVULElBQUloTCxRQUFRLENBQUMsR0FDVGtNLEVBQUUsQ0FBQ3JJLEtBQUssR0FBRzdCO2FBQ1Y7WUFDRG1ILE1BQU0sQ0FBQ3RGLEtBQUssR0FBRzdCO1lBQ2ZvSyxhQUFhO1FBQ2pCO0lBQ0o7SUFFQSxJQUFJYixNQUEyQlc7SUFDL0IsOEJBQThCO0lBQzlCLElBQUlFLGNBQWMsQ0FBRW5KLEtBQUsrSCxNQUFNLEVBQUU7UUFDN0JPLE1BQU1wQztJQUNWLE9BQU8sSUFBSWlELFlBQWE7UUFDcEJiLEdBQUcsQ0FBQ3RJLEtBQUtrRyxNQUFNLENBQUUsR0FBR21DLFVBQVVuQztJQUNsQztJQUVBLElBQUk2QixRQUNBNUQsR0FBRyxDQUFDQSxJQUFJbkgsTUFBTSxHQUFDLEVBQUUsR0FBR3FMLFVBQVVDO1NBQzdCO1FBQ0QsTUFBTW5FLElBQUluSCxNQUFNLEdBQUcsS0FBS21ILEdBQUcsQ0FBQ0EsSUFBSW5ILE1BQU0sR0FBQyxFQUFFLEtBQUtrQyxVQUMxQyxFQUFFaUYsSUFBSW5ILE1BQU07SUFDcEI7SUFFQSxPQUFPd0IseUNBQUMsQ0FBQyxFQUFFZ0IsS0FBS0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVtRixLQUFLVCxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVM7QUFDMUQ7QUFFZSxTQUFTOUUsT0FBT0csSUFBYTtJQUN4Q2QsMENBQUVBLENBQUUsdUNBQU8sQ0FBQ2MsS0FBS0wsRUFBRSxDQUFDLENBQWNlLFFBQVEsQ0FBQ2tKLGVBQWUsQ0FBRTVKO0FBQ2hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySXFDO0FBQ2U7QUFDdkI7QUFDa0I7QUFDTDtBQUVGO0FBRXpCLFNBQVNJLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsTUFBTWUsT0FBT3BCLEtBQUs0QixJQUFJLENBQUNqQyxFQUFFO0lBQ3pCLE1BQU1vSyxXQUFXMUosUUFBUWMsYUFBYSxDQUFDQyxLQUFLO0lBQzVDLElBQUkySSxhQUFhckssV0FBWTtRQUN6QnFGLFFBQVFDLElBQUksQ0FBQ2hGO1FBQ2IrRSxRQUFRQyxJQUFJLENBQUMzRSxRQUFRYyxhQUFhO1FBQ2xDLE1BQU0sSUFBSUcsTUFBTSxDQUFDLFNBQVMsRUFBRUYsS0FBSyxZQUFZLENBQUM7SUFDbEQ7SUFFQSxNQUFNNEksTUFBTUYsa0RBQU0sQ0FBQ0MsU0FBUztJQUM1QixNQUFNRSxXQUFXLElBQUt2SixRQUFRLENBQWtCRSxXQUFXO0lBRTNELE1BQU1kLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFFME0sOERBQWNBLEVBQUVJLFVBQVU7UUFDL0M5SixvREFBWUEsQ0FBQ0gsS0FBSzRCLElBQUksRUFBRXZCO1dBQ3JCTCxLQUFLZixJQUFJLENBQUtrRCxHQUFHLENBQUUsQ0FBQ29CLElBQVVwRCxvREFBWUEsQ0FBQ29ELEdBQUdsRDtXQUM5Q0wsS0FBS2tLLFFBQVEsQ0FBQy9ILEdBQUcsQ0FBRSxDQUFDb0IsSUFBVXBELG9EQUFZQSxDQUFDb0QsR0FBR2xEO0tBRXBEO0lBRURTLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR3FLO0lBRWpCMUwsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0k7QUFHWixTQUFTaEIsT0FBT0csSUFBYTtJQUV4Q2IseUNBQUNBLENBQUNhLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0FBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xQztBQUN1QjtBQUMvQjtBQUNrQjtBQUNMO0FBRTNCLFNBQVNHLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsTUFBTTZCLFFBQVcvQixvREFBWUEsQ0FBQ0gsS0FBS2tDLEtBQUssRUFBRTdCO0lBQzFDLE1BQU00SixXQUFXL0gsTUFBTXpCLFdBQVc7SUFFbEMsTUFBTVgsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUN5TCxzRUFBc0JBLEVBQUVxQixVQUFVO1FBQ3REL0g7S0FDSDtJQUVEcEIsdUNBQU0sQ0FBQ2hCLElBQUlILEVBQUUsQ0FBQyxHQUFHSyxLQUFLVCxHQUFHO0lBRXpCakIsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJZO0FBQ047QUFHZCxTQUFTaEIsT0FBT0csSUFBYTtJQUV4QyxNQUFNb0IsT0FBT04sdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDO0lBQzVCLE1BQU1WLE9BQU9lLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0lBQzdCLE1BQU1GLE9BQU9DLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0lBRTdCYiwwQ0FBRSxDQUFDLFNBQVMsRUFBRWdDLEtBQUssQ0FBQyxFQUFFbkMsS0FBSyxFQUFFLEVBQUVjLEtBQUssRUFBRW5CLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztBQUMzQyx1REFBdUQ7QUFDM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWitDO0FBQ0w7QUFFVTtBQUNOO0FBQ0k7QUFDYjtBQUNjO0FBQ3RCO0FBRTdCLCtEQUErRDtBQUMvRCx5Q0FBeUM7QUFDekMsU0FBUytCLFNBQVNYLElBQVMsRUFBRW9LLE9BQWdCLEVBQUUvSixPQUFnQjtJQUUzRCxVQUFVO0lBQ1YsTUFBTWdLLFFBQVVQLGtEQUFNLENBQUNNLFFBQVEzSixXQUFXLENBQUM7SUFDM0MsTUFBTUQsT0FBVTZKLE1BQU0zSixRQUFRO0lBRTlCLCtDQUErQztJQUMvQ0wsVUFBVSxJQUFJWSwyQ0FBT0EsQ0FBQyxPQUFPWjtJQUM3QkEsUUFBUWlLLG1CQUFtQixHQUFHRixTQUFTLFVBQVU7SUFFakQsb0VBQW9FO0lBQ3BFLE1BQU1uTCxPQUFPZ0ksOERBQVlBLENBQUNqSCxNQUFNcUssT0FBT2hLO0lBQ3ZDLEtBQUksSUFBSWQsT0FBT04sS0FBS2dCLFFBQVEsQ0FDeEJJLFFBQVFjLGFBQWEsQ0FBQ0wsdUNBQU0sQ0FBQ3ZCLElBQUlJLEVBQUUsQ0FBQyxDQUFDLEdBQUdKLElBQUlrQixXQUFXO0lBRTNELDhDQUE4QztJQUM5Q0QsS0FBS0csUUFBUSxHQUFHakI7SUFDaEIsNkNBQTZDO0lBQzdDYyxLQUFLSSxXQUFXLEdBQUdsQjtJQUVuQixNQUFNZ0osYUFBYTFJLEtBQUt1SyxPQUFPLEVBQUU1SztJQUNqQyxJQUFJK0ksZUFBZWhKLFdBQVk7UUFDM0IsSUFBSThLLGtCQUFrQnRKLDBEQUFVQSxDQUFDd0g7UUFDakMsa0JBQWtCO1FBQ2xCbEksS0FBS0ksV0FBVyxHQUFHLElBQU00SjtJQUM3QjtJQUVBLGVBQWU7SUFDZkosUUFBUW5LLFFBQVEsR0FBRztRQUNmaEI7UUFDQWtCLG9EQUFZQSxDQUFDSCxLQUFLRCxJQUFJLEVBQUVNO0tBQzNCO0FBQ0w7QUFFZSxTQUFTRCxRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELDRDQUE0QztJQUU1QyxNQUFNK0YsWUFBc0I7UUFDeEJxRSxVQUFVO1FBQ1YvSixVQUFVO1lBQ042RyxZQUFpQixJQUFJL0gsTUFBTVEsS0FBS2YsSUFBSSxDQUFDQSxJQUFJLENBQUN6QixNQUFNLEdBQUN3QyxLQUFLZixJQUFJLENBQUN3SSxXQUFXLENBQUNqSyxNQUFNO1lBQzdFOEosVUFBaUIsQ0FBQztZQUNsQmhCLGFBQWlCLENBQUM7WUFDbEJHLFlBQWlCLENBQUM7WUFDbEI4QixRQUFpQjtZQUNqQjVIO1lBQ0FDLGFBQWlCO2dCQUNiRCxTQUFTWCxNQUFNRixLQUFLTyxVQUFVLDRCQUE0QjtnQkFDMUQsT0FBTytGLFVBQVUxRixRQUFRLENBQUNFLFdBQVc7WUFDekM7WUFDQWdKLGlCQUFpQlIsc0RBQVlBO1FBQ2pDO0lBQ0o7SUFFQSxNQUFNc0IsVUFBVVosa0RBQU1BLENBQUN0TSxNQUFNO0lBQzdCc00sa0RBQU0sQ0FBQ1ksUUFBUSxHQUFHdEU7SUFFbEIsb0JBQW9CO0lBQ3BCLDBDQUEwQztJQUMxQy9GLFFBQVFjLGFBQWEsQ0FBQ25CLEtBQUtvQixJQUFJLENBQUMsR0FBR3NKO0lBR25DLHFCQUFxQjtJQUNyQixNQUFNQyxZQUFjM0ssS0FBS0QsSUFBSSxDQUFDQyxLQUFLRCxJQUFJLENBQUN2QyxNQUFNLEdBQUMsRUFBRSxDQUFDa0UsV0FBVyxDQUFDQyxLQUFLO0lBQ25FLElBQUlnSixjQUFjLFlBQVlBLGNBQWMsU0FBVTtRQUVsRCxNQUFNQyxZQUFZO1lBQ2RsSixhQUFhO2dCQUNUQyxPQUFPO1lBQ1g7WUFDSTdELFFBQVFrQyxLQUFLaEMsVUFBVTtZQUMzQkEsWUFBWWdDLEtBQUtoQyxVQUFVO1lBQ3ZCRCxZQUFZaUMsS0FBSy9CLGNBQWM7WUFDbkNBLGdCQUFnQitCLEtBQUsvQixjQUFjO1FBQ3ZDO1FBQ0ErQixLQUFLRCxJQUFJLENBQUMwQyxJQUFJLENBQUVtSTtJQUNwQjtJQUVBLE1BQU05SyxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ2dOLDZEQUFhQSxFQUFFTztJQUV2QzVKLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR0ssS0FBS29CLElBQUk7SUFFMUI5QyxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHSztBQUdiLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDLE9BQU9aLDBDQUFFLENBQUMsV0FBVyxFQUFFWSxLQUFLQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNnQjtBQUNOO0FBQ0w7QUFFM0IsU0FBU0csUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzBOLCtEQUFlQSxFQUFFLEdBQUc7UUFDeEMxSyxvREFBWUEsQ0FBQ0gsS0FBS3NDLElBQUksRUFBRWpDO0tBQzNCO0lBRUQvQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJ2QixTQUFTaUssT0FBT3BJLElBQWE7SUFDekIsSUFBSUEsTUFDQTtJQUVKLE1BQU0sSUFBSXBCLE1BQU07QUFDcEI7QUFHQSxpRUFBZTtJQUNYd0o7QUFDSixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWeUI7QUFHWixTQUFTakwsT0FBT0csSUFBYTtJQUV4Q2IseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ2U7QUFFVjtBQUUzQixTQUFTaUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzROLDhEQUFjQSxFQUFFO0lBRXhDek0sbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkSTtBQUdaLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDa0I7QUFFYjtBQUUzQixTQUFTaUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzZOLGlFQUFpQkEsRUFBRTtJQUUzQzFNLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RRO0FBQ0Y7QUFHZCxTQUFTaEIsT0FBT0csSUFBYTtJQUV4QyxNQUFNa0MsUUFBUXBCLHVDQUFNLENBQUNkLEtBQUtMLEVBQUUsQ0FBQztJQUU3QixJQUFJdUMsS0FBSyxDQUFDLEVBQUUsS0FBS3hDLFdBQ2IsT0FBT1AseUNBQUNBLENBQUMrQyxLQUFLLENBQUMsRUFBRTtJQUVyQjlDLDBDQUFFLENBQUMsRUFBRThDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFQSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pxQztBQUNzQjtBQUVqQjtBQUUzQixTQUFTOUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzhOLHFFQUFxQkEsRUFBRSxHQUFHO1FBQUNqTCxLQUFLb0IsSUFBSTtRQUFFcEIsS0FBS2tMLE1BQU07S0FBQztJQUUxRTVNLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHO0lBQUM7Q0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkRDtBQUNGO0FBR2QsU0FBU2hCLE9BQU9HLElBQWE7SUFFeENiLHlDQUFDQSxDQUFDO0lBRUYsSUFBSSxJQUFJRyxJQUFJLEdBQUdBLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sRUFBRSxFQUFFOEIsRUFBRztRQUMxQyxJQUFJQSxNQUFNLEdBQ05ILHlDQUFDQSxDQUFDO1FBQ05BLHlDQUFDQSxDQUFDYSxLQUFLQyxRQUFRLENBQUNYLEVBQUU7SUFDdEI7SUFFQUgseUNBQUNBLENBQUM7SUFFRixNQUFNK0MsUUFBUXBCLHVDQUFNLENBQUNkLEtBQUtMLEVBQUUsQ0FBQztJQUU3QixJQUFHdUMsVUFBVSxNQUNUL0MseUNBQUNBLENBQUM7U0FFRkMsMENBQUUsQ0FBQyx3QkFBd0IsRUFBRThDLE1BQU0sRUFBRSxDQUFDO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCcUM7QUFDZ0I7QUFDeEI7QUFDa0I7QUFDTDtBQUUzQixTQUFTOUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ2dPLCtEQUFlQSxFQUFFLEdBQ3JDbkwsS0FBS29MLEtBQUssQ0FBQ2pKLEdBQUcsQ0FBRSxDQUFDQyxJQUFVakMsb0RBQVlBLENBQUNpQyxHQUFHL0I7SUFHL0NTLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLEdBQUdLLEtBQUtxTCxNQUFNLENBQUM7SUFFNUIvTSxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRztJQUFDO0lBQVU7Q0FBYTs7Ozs7Ozs7Ozs7Ozs7OztBQ25CbkI7QUFHYixTQUFTaEI7SUFDcEJULDBDQUFFLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDYSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xxQztBQUNlO0FBQ0w7QUFDTDtBQUUzQixTQUFTRyxRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1QLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDbU8sOERBQWNBLEVBQUUsR0FBRztRQUN2Q25MLG9EQUFZQSxDQUFDSCxLQUFLdUwsR0FBRyxFQUFFbEw7S0FDMUI7SUFFRC9CLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJoQixNQUFNNkUsb0JBQW9CcEU7SUFFcEJxRSxpQkFBc0I7SUFFL0JqRSxZQUFZaUUsZ0JBQXFCLENBQUU7UUFDL0IsS0FBSztRQUNMQSxpQkFBaUJWLFNBQVMsR0FBRyxJQUFJO1FBQ2pDLElBQUksQ0FBQ1UsZ0JBQWdCLEdBQUdBO0lBQzVCO0FBQ0o7QUFHQSxpRUFBZTtJQUNYRDtBQUNKLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RpRDtBQUNKO0FBQ1c7QUFDSjtBQUNHO0FBQ0o7QUFDSTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDZTtBQUNKO0FBQ007QUFDSjtBQUNJO0FBQ0o7QUFDRztBQUNKO0FBQ0M7QUFDRTtBQUNKO0FBQ0U7QUFDSjtBQUNVO0FBQ0o7QUFDRTtBQUNKO0FBQ0Q7QUFDSjtBQUNLO0FBQ0o7QUFDSTtBQUNKO0FBQ007QUFDSjtBQUNDO0FBQ007QUFDSjtBQUNtQjtBQUNKO0FBQ2Y7QUFDSjtBQUNJO0FBQ0o7QUFDSztBQUNKO0FBQ0M7QUFDSTtBQUNKO0FBQ1U7QUFDSjtBQUNBO0FBQ0o7QUFDQztBQUNKO0FBQ0s7QUFDSjtBQUNDO0FBQ0M7QUFDSjtBQUNLO0FBQ0o7QUFDWTtBQUNKO0FBQ0o7QUFDSjtBQUNRO0FBQ0o7QUFDTztBQUNKO0FBQ0M7QUFDUztBQUNKO0FBQ0g7QUFDSjtBQUNJO0FBQ0o7QUFDTTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDTjtBQUNKO0FBR3ZDLE1BQU12QyxTQUFTLEVBQUU7QUFDakIsTUFBTTROLGdCQUFnQixFQUFFO0FBQ3hCLE1BQU1DLGVBQWUsRUFBRTtBQUN2QixNQUFNQyxlQUFlLEVBQUU7QUFDdkIsTUFBTUMsU0FBUyxFQUFFO0FBQ2pCLE1BQU1DLE9BQU8sRUFBRTtBQUNmLE1BQU1DLGtCQUFrQixFQUFFO0FBQzFCLE1BQU1DLG9CQUFvQixFQUFFO0FBQzVCLE1BQU1DLG9CQUFvQixFQUFFO0FBQzVCLE1BQU1DLG1CQUFtQixFQUFFO0FBQzNCLE1BQU1DLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1DLHNCQUFzQixHQUFHO0FBQy9CLE1BQU1DLHFCQUFxQixHQUFHO0FBQzlCLE1BQU1DLHFCQUFxQixHQUFHO0FBQzlCLE1BQU1DLGdCQUFnQixHQUFHO0FBQ3pCLE1BQU1DLGVBQWUsR0FBRztBQUN4QixNQUFNQyxlQUFlLEdBQUc7QUFDeEIsTUFBTUMsaUJBQWlCLEdBQUc7QUFDMUIsTUFBTUMsb0JBQW9CLEdBQUc7QUFDN0IsTUFBTUMsbUNBQW1DLEdBQUc7QUFDNUMsTUFBTUMsZ0JBQWdCLEdBQUc7QUFDekIsTUFBTUMsZ0JBQWdCLEdBQUc7QUFDekIsTUFBTTdHLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1ILGtCQUFrQixHQUFHO0FBQzNCLE1BQU1GLHdCQUF3QixHQUFHO0FBQ2pDLE1BQU1ELG9CQUFvQixHQUFHO0FBQzdCLE1BQU1ELGlCQUFpQixHQUFHO0FBQzFCLE1BQU1GLGtCQUFrQixHQUFHO0FBQzNCLE1BQU1WLGdCQUFnQixHQUFHO0FBQ3pCLE1BQU1OLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1qQix5QkFBeUIsR0FBRztBQUNsQyxNQUFNL0IsaUJBQWlCLEdBQUc7QUFDMUIsTUFBTWYscUJBQXFCLEdBQUc7QUFDOUIsTUFBTTlDLHdCQUF3QixHQUFHO0FBQ2pDLE1BQU1FLDhCQUE4QixHQUFHO0FBQ3ZDLE1BQU1MLHVCQUF1QixHQUFHO0FBQ2hDLE1BQU1SLHVCQUF1QixHQUFHO0FBQ2hDLE1BQU1MLHlCQUF5QixHQUFHO0FBQ2xDLE1BQU1SLG1CQUFtQixHQUFHO0FBQzVCLE1BQU1SLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1kLE9BQU8sR0FBRztBQUVoQixNQUFNa1MsY0FBYztJQUMxQjVHLDZEQUFhQTtJQUNiRSxvRUFBYUE7SUFDYkUsbUVBQWFBO0lBQ2JFLG1FQUFhQTtJQUNiRSw2REFBYUE7SUFDYkUsNERBQWFBO0lBQ2JFLHVFQUFhQTtJQUNiRSx5RUFBYUE7SUFDYkUseUVBQWFBO0lBQ2JFLHdFQUFhQTtJQUNiRyxzRUFBY0E7SUFDZEUsaUVBQWNBO0lBQ2RFLDBFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEUsaUVBQWNBO0lBQ2RFLG9FQUFjQTtJQUNkRSxvRUFBY0E7SUFDZEUsc0VBQWNBO0lBQ2RHLHlFQUFjQTtJQUNkRSx3RkFBY0E7SUFDZEUscUVBQWNBO0lBQ2RFLHFFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEcsdUVBQWNBO0lBQ2RFLDZFQUFjQTtJQUNkRSx5RUFBY0E7SUFDZEUsc0VBQWNBO0lBQ2RFLHVFQUFjQTtJQUNkRyxxRUFBY0E7SUFDZEUsc0VBQWNBO0lBQ2RFLDhFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEUsMEVBQWNBO0lBQ2RFLDZFQUFjQTtJQUNkRyxtRkFBY0E7SUFDZEUsNEVBQWNBO0lBQ2RFLDRFQUFjQTtJQUNkRSw4RUFBY0E7SUFDZEUsd0VBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRSw0REFBY0E7Q0FDZDtBQUVNLE1BQU10VSxTQUFTO0lBQ3JCa1AseURBQVFBO0lBQ1JFLGdFQUFRQTtJQUNSRSwrREFBUUE7SUFDUkUsK0RBQVFBO0lBQ1JFLHlEQUFRQTtJQUNSRSx3REFBUUE7SUFDUkUsbUVBQVFBO0lBQ1JFLHFFQUFRQTtJQUNSRSxxRUFBUUE7SUFDUkUsb0VBQVFBO0lBQ1JHLGtFQUFTQTtJQUNURSw2REFBU0E7SUFDVEUsc0VBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURSw2REFBU0E7SUFDVEUsZ0VBQVNBO0lBQ1RFLGdFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEcscUVBQVNBO0lBQ1RFLG9GQUFTQTtJQUNURSxpRUFBU0E7SUFDVEUsaUVBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURyxtRUFBU0E7SUFDVEUseUVBQVNBO0lBQ1RFLHFFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEUsbUVBQVNBO0lBQ1RHLGlFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEUsMEVBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURSxzRUFBU0E7SUFDVEUseUVBQVNBO0lBQ1RHLCtFQUFTQTtJQUNURSx3RUFBU0E7SUFDVEUsd0VBQVNBO0lBQ1RFLDBFQUFTQTtJQUNURSxvRUFBU0E7SUFDVEUsa0VBQVNBO0lBQ1RFLHdEQUFTQTtDQUNUO0FBRUQsTUFBTXVCLFVBQVUsQ0FBQztBQUNqQnJKLE9BQU9zSixNQUFNLENBQUNELFNBQVN6RixxRUFBU0E7QUFDaEM1RCxPQUFPc0osTUFBTSxDQUFDRCxTQUFTeEUsbUVBQVVBO0FBQ2pDN0UsT0FBT3NKLE1BQU0sQ0FBQ0QsU0FBUzdELG1FQUFVQTtBQUNqQ3hGLE9BQU9zSixNQUFNLENBQUNELFNBQVNsRCxvRUFBVUE7QUFDakNuRyxPQUFPc0osTUFBTSxDQUFDRCxTQUFTckMsMEVBQVVBO0FBRzFCLE1BQU12SyxNQUFNNE0sUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztBQ25PQTtBQUdaLFNBQVN4UyxPQUFPRyxJQUFhO0lBQ3hDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHFDO0FBQ2M7QUFFVDtBQUNNO0FBRWpDLFNBQVNpQixRQUFRSixJQUFTLEVBQUV3UyxRQUFpQjtJQUV4RCxJQUFJLENBQUcsUUFBT3hTLEtBQUtrQyxLQUFLLEtBQUssUUFBTyxLQUN6QixDQUFFLGdCQUFlbEMsS0FBS2tDLEtBQUssS0FDM0JsQyxLQUFLa0MsS0FBSyxDQUFDdVEsU0FBUyxDQUFDQyxZQUFZLEtBQUssWUFDN0M7SUFFSixNQUFNNVMsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNnViw2REFBYUEsRUFBRUksMERBQWNBO0lBRXJEalUsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7QUNwQm1CO0FBRTFDOFIsd0RBQVFBLENBQUMsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZLO0FBQ0U7QUFHZCxTQUFTOVMsT0FBT0csSUFBYTtJQUN4Q2IseUNBQUNBLENBQUUyQix1Q0FBTSxDQUFDZCxLQUFLTCxFQUFFLENBQUM7QUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ2M7QUFDdEI7QUFFYTtBQUNFO0FBRTdCLFNBQVNTLFFBQVFKLElBQVMsRUFBRXdTLFFBQWlCO0lBRXhELElBQUksT0FBT3hTLEtBQUtrQyxLQUFLLEtBQUssV0FDdEI7SUFFSixNQUFNcEMsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUMrVSw2REFBYUEsRUFBRVUsc0RBQVVBO0lBRWpEOVIsdUNBQU0sQ0FBQ2hCLElBQUlILEVBQUUsQ0FBQyxHQUFHSyxLQUFLa0MsS0FBSztJQUMzQjVELG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNwQjBDO0FBQ1Y7QUFDWjtBQUUzQzhSLHdEQUFRQSxDQUFDLFFBQVE7SUFDYixHQUFHRyxrRUFBU0EsQ0FBQ0QsZ0VBQVdBLEVBQUVFLGlFQUFhQSxDQUFDO0FBQzVDOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjJCO0FBR1osU0FBU2xULE9BQU9HLElBQWE7SUFFeENiLHlDQUFDQSxDQUFDLE1BQU1hLEtBQUtDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7QUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDaUM7QUFDdkI7QUFDTDtBQUUzQixTQUFTRyxRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1QLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDOFUsZ0ZBQWdDQSxFQUFFLEdBQUc7UUFDekQ5UixvREFBWUEsQ0FBQ0gsS0FBS2tDLEtBQUssRUFBRTdCO0tBQzVCO0lBRUQvQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCbUI7QUFDNEI7QUFDckI7QUFFTjtBQUU1QixTQUFTaEIsT0FBT0csSUFBYTtJQUV4Q2IseUNBQUNBLENBQUM7SUFFRixLQUFJLElBQUl3SixTQUFTM0ksS0FBS0MsUUFBUSxDQUFFO1FBRTVCLElBQUkwSSxNQUFNbEksV0FBVyxLQUFLdVMscURBQVNBLEVBQUU7WUFFakMsTUFBTXRWLFNBQVMsSUFBRWlMLE1BQU1oSixFQUFFO1lBQ3pCckMscURBQWFBLENBQUNJLFNBQVNqQix5Q0FBUUE7WUFFL0IwQyx5Q0FBQ0EsQ0FBQzJCLHVDQUFNLENBQUM2SCxNQUFNaEosRUFBRSxDQUFDO1lBRWxCckMscURBQWFBLENBQUNJLFNBQVNiLHlDQUFRQTtRQUVuQyxPQUFPLElBQUc4TCxNQUFNL0ksT0FBTyxLQUFLcVMsZ0ZBQWdDQSxFQUFFO1lBQzFEOVMseUNBQUNBLENBQUN3SjtRQUNOLE9BQ0ksTUFBTSxJQUFJckgsTUFBTTtJQUN4QjtJQUVBbkMseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCcUM7QUFDa0I7QUFDUjtBQUNMO0FBRTNCLFNBQVNpQixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1QLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDNlUsaUVBQWlCQSxFQUFFLEdBQUc7V0FDdkNoUyxLQUFLaUosTUFBTSxDQUFDOUcsR0FBRyxDQUFFLENBQUNvQixJQUFVcEQsb0RBQVlBLENBQUNvRCxHQUFHbEQ7S0FDbEQ7SUFFRC9CLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCSTtBQUNFO0FBR2QsU0FBU2hCLE9BQU9HLElBQWE7SUFDeENiLHlDQUFDQSxDQUFDMkIsdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDO0FBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNlO0FBQ3ZCO0FBRWE7QUFDRztBQUU5QixTQUFTUyxRQUFRSixJQUFTLEVBQUV3UyxRQUFpQjtJQUV4RCxJQUFJLENBQUd4UyxDQUFBQSxLQUFLa0MsS0FBSyxZQUFZOEcsTUFBSyxLQUFNaEosS0FBS2tDLEtBQUssQ0FBQ3VRLFNBQVMsRUFBRUMsaUJBQWlCLFNBQzNFO0lBRUosTUFBTTVTLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDNFUsOERBQWNBLEVBQUVrQix1REFBV0E7SUFFbkRuUyx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUdLLEtBQUtrQyxLQUFLLENBQUNBLEtBQUs7SUFDakM1RCxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJ2QixpRUFBZTtJQUNYcVMsV0FBVyxDQUFDQztRQUNSLElBQUlBLEtBQUssUUFBUUEsS0FBSyxNQUFNO1lBRXhCLElBQUk5VCxNQUFNOFQsRUFBRUMsYUFBYTtZQUN6QixNQUFNQyxXQUFXaFUsSUFBSTdCLE1BQU0sR0FBQztZQUM1QixJQUFHNkIsR0FBRyxDQUFDZ1UsU0FBUyxLQUFLLE9BQU9oVSxHQUFHLENBQUNnVSxTQUFTLEtBQUssS0FDMUNoVSxNQUFNQSxJQUFJb0YsS0FBSyxDQUFDLEdBQUU0TyxXQUFTLEtBQUssTUFBTWhVLElBQUlvRixLQUFLLENBQUM0TyxXQUFTO1lBQzdELE9BQU9oVTtRQUNYO1FBRUEsSUFBSUEsTUFBTThULEVBQUV0VSxRQUFRO1FBQ3BCLElBQUksQ0FBRVEsSUFBSW1FLFFBQVEsQ0FBQyxNQUNmbkUsT0FBTztRQUNYLE9BQU9BO0lBQ1g7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEIwQjtBQUN1QjtBQUNyQjtBQUMyRTtBQUNqRDtBQUNvQztBQUVkO0FBR3RFLE1BQU13VSxtQkFBbUJsQix3REFBUUEsQ0FBQyxlQUFlO0lBQ3BEalMsVUFBVTtRQUNOLFNBQVM7UUFDVEUsYUFBYStTLDZEQUFTQTtRQUN0Qi9KLGlCQUFpQixDQUFDNUo7WUFFZCxNQUFNOFQsUUFBUTlULEtBQUtDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLE1BQU04VCxhQUFhRCxNQUFNclQsV0FBVztZQUVwQywwQkFBMEI7WUFDMUIsSUFBSXNULGVBQWU5UixxREFBU0EsRUFDeEIsT0FBT3VSLG1FQUFVQSxDQUFDTTtZQUN0QixJQUFJQyxlQUFlZCx1REFBV0EsSUFBSWMsZUFBZTlSLHFEQUFTQSxFQUN0RCxPQUFPOFI7WUFFWCxnQkFBZ0I7WUFDaEIsSUFBSUEsZUFBZWYscURBQVNBLEVBQUc7Z0JBRTNCLE1BQU1nQixjQUFjbFQsdUNBQU0sQ0FBQ2dULE1BQU1uVSxFQUFFLENBQUM7Z0JBRXBDLElBQUltVSxNQUFNbFUsT0FBTyxLQUFLaVMsNERBQVlBLEVBQUc7b0JBQ2pDLElBQUltQyxnQkFBZ0IsU0FBU0EsZ0JBQWdCLFlBQ3pDLE9BQU87b0JBQ1gsSUFBSUEsZ0JBQWdCLFVBQVNBLGdCQUFnQixhQUN6QyxPQUFPO2dCQUNmO2dCQUVBLGlDQUFpQztnQkFDakMsZ0VBQWdFO2dCQUVoRSwrQ0FBK0M7Z0JBQy9DLE9BQU9oVix5Q0FBQyxDQUFDLFdBQVcsRUFBRThVLE1BQU0sQ0FBQyxDQUFDLEVBQUUsNEJBQTRCO1lBQ2hFO1lBRUEsTUFBTUcsU0FBU0gsTUFBTXJULFdBQVcsRUFBRXlUO1lBQ2xDLElBQUlELFdBQVd2VSxXQUNYLE1BQU0sSUFBSTRCLE1BQU0sQ0FBQyxFQUFFd1MsTUFBTXJULFdBQVcsQ0FBQ2dLLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztZQUN2RSxPQUFPd0osT0FBT3JLLGVBQWUsQ0FBRTVKLE1BQU04VDtRQUN6QztJQUNKO0FBQ0osR0FBRztBQUVIbkIsd0RBQVFBLENBQUMsU0FBUztJQUVkLGFBQWE7SUFDYkYsV0FBV29CO0lBRVhNLFNBQVM7UUFDTHZULGFBQWFnVCwyREFBT0E7UUFDcEJoSyxpQkFBZ0I1SixJQUFJO1lBQ2hCLE9BQU9oQix5Q0FBQyxDQUFDLGNBQWMsRUFBRWdCLEtBQUssQ0FBQyxDQUFDO1FBQ3BDO0lBQ0o7SUFFQSxHQUFHc1QscUVBQVlBLENBQUM7UUFBQztRQUFNO1FBQUs7UUFBSztRQUFLO0tBQUksRUFBRUksa0VBQWNBLEVBQzFDO1FBQ0lVLGVBQWVYLGlFQUFpQkE7SUFDcEMsRUFDZjtJQUNELEdBQUdILHFFQUFZQSxDQUFDO1FBQUM7S0FBSyxFQUFFSSxrRUFBY0EsRUFDbEM7UUFDSVUsZUFBZVgsaUVBQWlCQTtRQUNoQzdKLGlCQUFnQjVKLElBQUksRUFBRXFVLElBQUksRUFBRVAsS0FBSztZQUM3QixPQUFPOVUseUNBQUMsQ0FBQyxtQkFBbUIsRUFBRXFWLEtBQUssRUFBRSxFQUFFUCxNQUFNLENBQUMsQ0FBQztRQUNuRDtJQUNKLEVBQ0g7SUFDRCxHQUFHUixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBRUksa0VBQWNBLEVBQ2pDO1FBQ0lVLGVBQWVYLGlFQUFpQkE7UUFDaEM3SixpQkFBZ0I1SixJQUFJLEVBQUVxVSxJQUFJLEVBQUVQLEtBQUs7WUFDN0IsT0FBTzlVLHlDQUFDLENBQUMsY0FBYyxFQUFFcVYsS0FBSyxFQUFFLEVBQUVQLE1BQU0sQ0FBQyxDQUFDO1FBQzlDO0lBQ0osRUFDSDtJQUNELEdBQUdQLG9FQUFXQSxDQUFDO1FBQUM7S0FBTSxFQUFNSSw2REFBU0EsQ0FBQztJQUN0QyxHQUFHYixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQUVFLGlFQUFhQSxDQUFDO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RitCO0FBQ0Y7QUFFYztBQUU1QixTQUFTbFQsT0FBT0csSUFBYTtJQUV4QyxJQUFJa0MsUUFBUXBCLHVDQUFNLENBQUNkLEtBQUtMLEVBQUUsQ0FBQztJQUUzQixJQUFJSyxLQUFLUyxXQUFXLEtBQUt3QixxREFBU0EsRUFBRztRQUNqQzdDLDBDQUFFLENBQUMsRUFBRThDLE1BQU0sQ0FBQyxDQUFDO1FBQ2I7SUFDSjtJQUNBLElBQUksT0FBT0EsVUFBVSxVQUNqQkEsUUFBUXFFLE9BQU9yRSxRQUFRLDRCQUE0QjtJQUV2RC9DLHlDQUFDQSxDQUFDK0M7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQnFDO0FBQ2E7QUFDckI7QUFFYTtBQUNjO0FBRXpDLFNBQVM5QixRQUFRSixJQUFTLEVBQUV3UyxRQUFpQjtJQUV4RCxJQUFJdFEsUUFBUWxDLEtBQUtrQyxLQUFLO0lBRXRCLElBQUdBLE1BQU11USxTQUFTLEVBQUVDLGlCQUFpQixPQUNqQ3hRLFFBQVFBLE1BQU1BLEtBQUs7SUFFdkIsSUFBSSxPQUFPQSxVQUFVLFlBQVksT0FBT0EsVUFBVSxVQUM5QztJQUVKLE1BQU1vUyxZQUFZLE9BQU9wUyxVQUFVLFdBQVdELHFEQUFTQSxHQUFHK0QsdURBQVdBO0lBRXJFLE1BQU1sRyxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzJVLDREQUFZQSxFQUFFd0M7SUFFdEN4VCx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUd1QztJQUNqQjVELG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCSTtBQUUySDtBQUNqRjtBQUM2QztBQUV4QjtBQUVuRixNQUFNZ1UsaUJBQWlCbEMsd0RBQVFBLENBQUMsYUFBYTtJQUNoRGpTLFVBQVU7UUFDTixTQUFTO1FBQ1RFLGFBQWErVCwyREFBT0E7UUFDcEIvSyxpQkFBaUIsQ0FBQzVKO1lBRWQsTUFBTThULFFBQVE5VCxLQUFLQyxRQUFRLENBQUMsRUFBRTtZQUM5QixNQUFNOFQsYUFBYUQsTUFBTXJULFdBQVc7WUFFcEMsMEJBQTBCO1lBQzFCLElBQUlzVCxlQUFlOVIscURBQVNBLEVBQ3hCLE9BQU82UjtZQUNYLElBQUlDLGVBQWUvTix1REFBV0EsRUFDMUIsT0FBT2xFLG1FQUFVQSxDQUFDZ1M7WUFDdEIsSUFBSUMsZUFBZWQsdURBQVdBLEVBQzFCLE9BQU9qVSx5Q0FBQyxDQUFDLGtCQUFrQixFQUFFOFUsTUFBTSxFQUFFLENBQUM7WUFFMUMsZ0JBQWdCO1lBQ2hCLElBQUlDLGVBQWVmLHFEQUFTQSxFQUFHO2dCQUUzQixpQ0FBaUM7Z0JBQ2pDLGdFQUFnRTtnQkFFaEUsK0NBQStDO2dCQUMvQyxPQUFPaFUseUNBQUMsQ0FBQyxPQUFPLEVBQUU4VSxNQUFNLENBQUMsQ0FBQyxFQUFFLDRCQUE0QjtZQUM1RDtZQUVBLE1BQU1HLFNBQVNILE1BQU1yVCxXQUFXLEVBQUV5VDtZQUNsQyxJQUFJRCxXQUFXdlUsV0FDWCxNQUFNLElBQUk0QixNQUFNLENBQUMsRUFBRXdTLE1BQU1yVCxXQUFXLENBQUNnSyxRQUFRLENBQUMsb0JBQW9CLENBQUM7WUFDdkUsT0FBT3dKLE9BQU9ySyxlQUFlLENBQUU1SixNQUFNOFQ7UUFDekM7SUFDSjtBQUNKLEdBQUc7QUFFSG5CLHdEQUFRQSxDQUFDLE9BQU87SUFFWixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiRixXQUFXb0M7SUFFWFYsU0FBUztRQUNMdlQsYUFBYWdULDJEQUFPQTtRQUNwQmhLLGlCQUFnQjVKLElBQUk7WUFDaEIsT0FBT2hCLHlDQUFDLENBQUMsRUFBRWdCLEtBQUssV0FBVyxDQUFDO1FBQ2hDO0lBQ0o7SUFFQWtVLFNBQVM7UUFDTHRULGFBQWErVCwyREFBT0E7UUFDcEIvSyxpQkFBZ0I1SixJQUFJLEVBQUVxVSxJQUFJO1lBQ3RCLE9BQU9FLGdFQUFPQSxDQUFDdlUsTUFBTXFVO1FBQ3pCO0lBQ0o7SUFDQSxHQUFHLEdBQ0gsR0FBR2YscUVBQVlBLENBQUM7UUFDUix3REFBd0Q7UUFDeEQ7UUFBTTtRQUFLO1FBQ1g7UUFBSztRQUFLO1FBQUs7UUFBTTtLQUN4QixFQUNEb0IsOERBQVVBLEVBQ1Y7UUFDSU4sZUFBZUssNERBQVlBO0lBQy9CLEVBQ0g7SUFDRCxHQUFHbkIscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUVzQiwrREFBV0EsRUFDOUI7UUFDSWhMLGlCQUFnQjVKLElBQUksRUFBRThVLENBQUMsRUFBRUMsQ0FBQztZQUV0QixJQUFJL1UsS0FBS1MsV0FBVyxLQUFLd1MsdURBQVdBLEVBQ2hDLHVDQUF1QztZQUN2QyxPQUFPbE4sb0VBQVdBLENBQUMvRixNQUFNd1QsbUVBQVVBLENBQUNzQixJQUFJLEtBQUt0QixtRUFBVUEsQ0FBQ3VCO1lBRTVELE9BQU9oUCxvRUFBV0EsQ0FBQy9GLE1BQU04VSxHQUFHLEtBQUtDO1FBQ3JDO0lBQ0osRUFDSDtJQUNELEdBQUd6QixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBRUksa0VBQWNBLEVBQ2pDO1FBQ0lzQixjQUFldkIsaUVBQWlCQTtRQUNoQ1csZUFBZVgsaUVBQWlCQTtJQUNwQyxFQUNIO0lBQ0QsR0FBR0gscUVBQVlBLENBQUM7UUFBQztLQUFLLEVBQUVvQiw4REFBVUEsRUFDOUI7UUFDSU4sZUFBaUJLLDREQUFZQTtRQUM3QjdLLGlCQUFpQixDQUFDNUosTUFBZXFVLE1BQWVQO1lBQzVDLE9BQU85VSx5Q0FBQyxDQUFDLGlCQUFpQixFQUFFcVYsS0FBSyxFQUFFLEVBQUVQLE1BQU0sQ0FBQyxDQUFDO1FBQ2pEO0lBQ0osRUFDSDtJQUNELEdBQUdSLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFb0IsOERBQVVBLEVBQzdCO1FBQ0lOLGVBQWVLLDREQUFZQTtRQUMzQjdLLGlCQUFpQixDQUFDNUosTUFBZXFVLE1BQWVQO1lBQzVDLG1CQUFtQjtZQUNuQixPQUFPOVUseUNBQUMsQ0FBQyxZQUFZLEVBQUVxVixLQUFLLEVBQUUsRUFBRVAsTUFBTSxDQUFDLENBQUM7UUFDNUM7SUFDSixFQUNIO0lBRUQsR0FBR1Asb0VBQVdBLENBQUM7UUFBQztLQUFNLEVBQUVvQiwyREFBT0EsRUFDM0I7UUFDSS9LLGlCQUFpQixDQUFDNUosTUFBTThVO1lBRXBCLElBQUk5VSxLQUFLUyxXQUFXLEtBQUt3Uyx1REFBV0EsRUFDaEMsT0FBT3VCLG1FQUFVQSxDQUFDeFUsTUFBTSxLQUFLd1QsbUVBQVVBLENBQUNzQjtZQUU1QyxPQUFPTixtRUFBVUEsQ0FBQ3hVLE1BQU0sS0FBSzhVO1FBQ2pDO0lBQ0osRUFDSDtJQUNELEdBQUd2QixvRUFBV0EsQ0FBRTtRQUFDO0tBQUksRUFBRW9CLDJEQUFPQSxDQUFDO0lBQy9CLEdBQUc3QixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQUVFLGlFQUFhQSxDQUFDO0FBRzlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVIMkI7QUFFa0g7QUFDeEU7QUFDbUQ7QUFDdEQ7QUFFbEVKLHdEQUFRQSxDQUFDLFNBQVM7SUFFZCxHQUFHVyxxRUFBWUEsQ0FDWCxnRUFBZ0U7SUFDaEU7UUFDSTtRQUFNO1FBQUs7UUFDWDtRQUFLO1FBQUs7UUFBSztRQUFNLEtBQUsscUNBQXFDO0tBQ2xFLEVBQ0RvQiw4REFBVUEsRUFDVjtRQUNJTSxjQUFlUCw0REFBWUE7UUFDM0JMLGVBQWVLLDREQUFZQTtJQUMvQixFQUNIO0lBQ0QsR0FBR25CLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFb0IsOERBQVVBLEVBQzdCO1FBQ0k5SyxpQkFBaUIsQ0FBQzVKLE1BQU04VSxHQUFHQztZQUV2QixJQUFJL1UsS0FBS1MsV0FBVyxLQUFLd1MsdURBQVdBLEVBQ2hDLHVDQUF1QztZQUN2QyxPQUFPbE4sb0VBQVdBLENBQUMvRixNQUFNd1QsbUVBQVVBLENBQUNzQixJQUFJLEtBQUt0QixtRUFBVUEsQ0FBQ3VCO1lBRTVELE9BQU9oUCxvRUFBV0EsQ0FBQy9GLE1BQU04QixtRUFBVUEsQ0FBQ2dULElBQUksS0FBS2hULG1FQUFVQSxDQUFDaVQ7UUFDNUQ7SUFDSixFQUNIO0lBQ0QsR0FBR3pCLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFSSxrRUFBY0EsRUFDakM7UUFDSVUsZUFBZVgsaUVBQWlCQTtJQUNwQyxFQUNIO0lBQ0QsR0FBR0gscUVBQVlBLENBQUM7UUFBQztLQUFLLEVBQUU0QixtRUFBZUEsRUFDbkM7UUFDSXRMLGlCQUFpQixDQUFDNUosTUFBZXFVLE1BQWVQO1lBQzVDLE9BQU85VSx5Q0FBQyxDQUFDLG1CQUFtQixFQUFFcVYsS0FBSyxFQUFFLEVBQUVQLE1BQU0sQ0FBQyxDQUFDO1FBQ25EO0lBQ0osRUFDSDtJQUNELEdBQUdSLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFNEIsbUVBQWVBLEVBQ2xDO1FBQ0l0TCxpQkFBaUIsQ0FBQzVKLE1BQWVxVSxNQUFlUDtZQUM1QyxtQkFBbUI7WUFDbkIsT0FBTzlVLHlDQUFDLENBQUMsWUFBWSxFQUFFcVYsS0FBSyxFQUFFLEVBQUVQLE1BQU0sQ0FBQyxDQUFDO1FBQzVDO0lBQ0osRUFDSDtJQUVELEdBQUdQLG9FQUFXQSxDQUFDO1FBQUM7S0FBTSxFQUFFMEIsNkRBQVNBLEVBQzdCO1FBQ0lyTCxpQkFBaUIsQ0FBQzVKLE1BQU04VTtZQUVwQixJQUFJOVUsS0FBS1MsV0FBVyxLQUFLd0IscURBQVNBLEVBQzlCLE9BQU91UyxtRUFBVUEsQ0FBQ3hVLE1BQU0sS0FBSzhCLG1FQUFVQSxDQUFDZ1Q7WUFFNUMsT0FBT04sbUVBQVVBLENBQUN4VSxNQUFNLEtBQUs4VTtRQUNqQztJQUNKLEVBQ0g7SUFDRCxHQUFHdkIsb0VBQVdBLENBQUM7UUFBQztLQUFJLEVBQ2hCb0IsMkRBQU9BLEVBQ1A7UUFDSUssY0FBZVAsNERBQVlBO0lBQy9CLEVBQ0g7SUFDRCxHQUFHM0Isa0VBQVNBLENBQUdELGdFQUFXQSxFQUFFRSxpRUFBYUEsQ0FBQztBQVE5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRStCO0FBQ0Y7QUFHZCxTQUFTbFQsT0FBT0csSUFBYTtJQUN4Q1osMENBQUUsQ0FBQyxDQUFDLEVBQUUwQix1Q0FBTSxDQUFDZCxLQUFLTCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ2E7QUFDckI7QUFFYTtBQUNDO0FBRTVCLFNBQVNTLFFBQVFKLElBQVMsRUFBRXdTLFFBQWlCO0lBRXhELElBQUksT0FBT3hTLEtBQUtrQyxLQUFLLEtBQUssVUFDdEI7SUFFSixNQUFNcEMsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUMwVSw0REFBWUEsRUFBRW1CLHFEQUFTQTtJQUUvQ2xTLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR0ssS0FBS2tDLEtBQUs7SUFFM0I1RCxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkk7QUFFbUQ7QUFDdkI7QUFDMEM7QUFFcEM7QUFFdEQsTUFBTXlVLGlCQUFpQjNDLHdEQUFRQSxDQUFDLGFBQWE7SUFDaERqUyxVQUFVO1FBQ04sU0FBUztRQUNURSxhQUFhZ1QsMkRBQU9BO1FBQ3BCaEssaUJBQWlCLENBQUM1SjtZQUVkLE1BQU04VCxRQUFROVQsS0FBS0MsUUFBUSxDQUFDLEVBQUU7WUFDOUIsTUFBTThULGFBQWFELE1BQU1yVCxXQUFXO1lBRXBDLDBCQUEwQjtZQUMxQixJQUFJc1QsZUFBZUgsMkRBQU9BLEVBQ3RCLE9BQU9FO1lBRVgsTUFBTUcsU0FBU25LLGtEQUFNLENBQUNnSyxNQUFNclQsV0FBVyxDQUFDLEVBQUUwVDtZQUMxQyxJQUFJRixXQUFXdlUsV0FDWCxNQUFNLElBQUk0QixNQUFNLENBQUMsRUFBRXdJLGtEQUFNLENBQUNnSyxNQUFNclQsV0FBVyxDQUFDLENBQUNnSyxRQUFRLENBQUMsb0JBQW9CLENBQUM7WUFDL0UsT0FBT3dKLE9BQU9ySyxlQUFlLENBQUVrSztRQUNuQztJQUNKO0FBQ0osR0FBRztBQUVIbkIsd0RBQVFBLENBQUMsT0FBTztJQUVaLGFBQWE7SUFDYkYsV0FBVzZDO0lBRVhDLFNBQVM7UUFDTDNVLGFBQWErVCwyREFBT0E7UUFDcEIvSyxpQkFBaUIsQ0FBQ3RGO1lBQ2QsT0FBT3RGLHlDQUFDLENBQUMsRUFBRXNGLEVBQUVyRSxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNyQztJQUNKO0lBRUEsR0FBRzZTLGtFQUFTQSxDQUFJRCxnRUFBV0EsRUFBRXVDLGdFQUFZQSxDQUFDO0lBQzFDLEdBQUc5QixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBUStCLCtEQUFXQSxDQUFDO0lBQ3pDLEdBQUcvQixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBUTZCLDhEQUFVQSxFQUNuQztRQUNJZixlQUFpQlgsaUVBQWlCQTtRQUNsQzdKLGlCQUFpQixDQUFDNUosTUFBZThVLEdBQVlDO1lBRXpDLElBQUlELEVBQUVyVSxXQUFXLEtBQUt1UyxxREFBU0EsRUFDM0IsQ0FBQzhCLEdBQUVDLEVBQUUsR0FBRztnQkFBQ0E7Z0JBQUVEO2FBQUU7WUFFakIsT0FBTzlWLHlDQUFDLENBQUMsRUFBRThWLEVBQUUsUUFBUSxFQUFFQyxFQUFFLENBQUMsQ0FBQztRQUMvQjtJQUNKLEVBQUU7QUFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEQrQjtBQUVzQjtBQUNHO0FBRXpDLFNBQVNsVixPQUFPRyxJQUFhO0lBRXhDYix5Q0FBQ0EsQ0FBQ2EsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFFbEIsSUFBSSxJQUFJWCxJQUFJLEdBQUdBLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sR0FBRyxHQUFHLEVBQUU4QixFQUMzQ0YsMENBQUUsQ0FBQyxHQUFHLEVBQUVZLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRSxDQUFDLENBQUM7SUFFOUIsTUFBTWtXLGFBQWF4VixLQUFLQyxRQUFRLENBQUNELEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sR0FBQyxFQUFFO0lBQ3hELElBQUlpWSxTQUFjRDtJQUVsQixJQUFJQSxXQUFXL1UsV0FBVyxLQUFLdUYsdURBQVdBLElBQUloRyxLQUFLUyxXQUFXLEtBQUt3QixxREFBU0EsRUFDeEV3VCxTQUFTM1QsbUVBQVVBLENBQUMwVDtJQUV4QnBXLDBDQUFFLENBQUMsR0FBRyxFQUFFcVcsT0FBTyxDQUFDO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CcUM7QUFDc0I7QUFDWjtBQUNMO0FBQzBCO0FBRXJELFNBQVNyVixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1xVixnQkFBZ0IsYUFBYTFWO0lBQ25DLE1BQU0yVixVQUFVRCxnQkFBZ0IxVixLQUFLMlYsT0FBTyxHQUFHO1FBQUMzVixLQUFLNkIsTUFBTTtLQUFDO0lBRTVELElBQU94QixRQUFRRSxJQUFJLEtBQUssV0FDakJvVixPQUFPLENBQUMsRUFBRSxDQUFDalUsV0FBVyxDQUFDQyxLQUFLLEtBQUssVUFDakMsQ0FBRWdVLENBQUFBLE9BQU8sQ0FBQyxFQUFFLENBQUN6VCxLQUFLLElBQUk3QixRQUFRYyxhQUFhLEdBRTlDO0lBRUosTUFBTXlVLFFBQVF6VixvREFBWUEsQ0FBQ0gsS0FBS2tDLEtBQUssRUFBRTdCO0lBQ3ZDLElBQUl3VixhQUFhRCxNQUFNblYsV0FBVztJQUVsQyxJQUFJQSxjQUFjO0lBRWxCLE1BQU1pSSxhQUFhMUksTUFBTTBJLFlBQVkvSTtJQUNyQyxJQUFJK0ksZUFBZWhKLFdBQ2ZlLGNBQWNTLDBEQUFVQSxDQUFDd0g7SUFHN0IsSUFBSWpJLGdCQUFnQixRQUFRQSxnQkFBZ0JvVixZQUFhO1FBQ2pEOVEsUUFBUUMsSUFBSSxDQUFDO0lBQ3JCO0lBQ0EsSUFBSXZFLGdCQUFnQixNQUFPO1FBQ3ZCQSxjQUFjb1Y7UUFDZCxJQUFJQSxlQUFlN1AsdURBQVdBLEVBQzFCdkYsY0FBY3dCLHFEQUFTQSxFQUFFLG1CQUFtQjtJQUM1Qyx5QkFBeUI7SUFDakM7SUFFQSxNQUFNNlQsUUFBUUgsUUFBUXhULEdBQUcsQ0FBRSxDQUFDQztRQUV4QixNQUFNMlQsT0FBUTVWLG9EQUFZQSxDQUFDaUMsR0FBRy9CO1FBRTlCLDZCQUE2QjtRQUM3QixJQUFJMFYsS0FBS25XLE9BQU8sS0FBS3VELHNEQUFNQSxFQUFFO1lBRXpCLDBCQUEwQjtZQUMxQixNQUFNNlMsT0FBTzNWLFFBQVFjLGFBQWEsQ0FBQ2lCLEVBQUV6QyxFQUFFLENBQUM7WUFDeEMsSUFBSXFXLFNBQVN0VyxXQUFZO2dCQUNyQixNQUFNdVcsWUFBWUQ7Z0JBQ2xCLElBQUlDLGNBQWMsUUFBUUosZUFBZUksV0FDckMsQ0FBQyxFQUFDLG9DQUFvQztZQUUxQyxrQkFBa0I7WUFDdEI7UUFDSjtRQUVBLE9BQU9GO0lBQ1g7SUFFQSxNQUFNalcsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUN5VSw2REFBYUEsRUFBRW5SLGFBQ25DO1dBQ09xVjtRQUNIRjtLQUNIO0lBRUx0WCxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRztJQUFDO0lBQVU7Q0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVmO0FBRXNCO0FBQ0c7QUFFekMsU0FBU2hCLE9BQU9HLElBQWE7SUFFeENiLHlDQUFDQSxDQUFDO0lBRUZBLHlDQUFDQSxDQUFDYSxLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUVsQixJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVUsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxHQUFHLEdBQUcsRUFBRThCLEVBQzNDRiwwQ0FBRSxDQUFDLEdBQUcsRUFBRVksS0FBS0MsUUFBUSxDQUFDWCxFQUFFLENBQUMsQ0FBQztJQUU5QixNQUFNa1csYUFBYXhWLEtBQUtDLFFBQVEsQ0FBQ0QsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxHQUFDLEVBQUU7SUFDeEQsSUFBSWlZLFNBQWNEO0lBRWxCLElBQUlBLFdBQVcvVSxXQUFXLEtBQUt1Rix1REFBV0EsSUFBSWhHLEtBQUtTLFdBQVcsS0FBS3dCLHFEQUFTQSxFQUN4RXdULFNBQVMzVCxtRUFBVUEsQ0FBQzBUO0lBRXhCcFcsMENBQUUsQ0FBQyxHQUFHLEVBQUVxVyxPQUFPLENBQUM7QUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJxQztBQUNtQjtBQUNUO0FBQ0w7QUFDMEI7QUFFckQsU0FBU3JWLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsTUFBTXFWLGdCQUFnQixhQUFhMVY7SUFDbkMsTUFBTTJWLFVBQVVELGdCQUFnQjFWLEtBQUsyVixPQUFPLEdBQUc7UUFBQzNWLEtBQUs2QixNQUFNO0tBQUM7SUFFNUQsSUFBT3hCLFFBQVFFLElBQUksS0FBSyxXQUNqQm9WLE9BQU8sQ0FBQyxFQUFFLENBQUNqVSxXQUFXLENBQUNDLEtBQUssS0FBSyxVQUNqQ2dVLE9BQU8sQ0FBQyxFQUFFLENBQUN6VCxLQUFLLElBQUk3QixRQUFRYyxhQUFhLEVBRTVDO0lBRUosTUFBTXlVLFFBQVF6VixvREFBWUEsQ0FBQ0gsS0FBS2tDLEtBQUssRUFBRTdCO0lBQ3ZDLElBQUl3VixhQUFhRCxNQUFNblYsV0FBVztJQUVsQyxJQUFJQSxjQUFjO0lBRWxCLE1BQU1pSSxhQUFhMUksTUFBTTBJLFlBQVkvSTtJQUNyQyxJQUFJK0ksZUFBZWhKLFdBQ2ZlLGNBQWNTLDBEQUFVQSxDQUFDd0g7SUFHN0IsSUFBSWpJLGdCQUFnQixRQUFRQSxnQkFBZ0JvVixZQUFhO1FBQ2pEOVEsUUFBUUMsSUFBSSxDQUFDO0lBQ3JCO0lBQ0EsSUFBSXZFLGdCQUFnQixNQUFPO1FBQ3ZCQSxjQUFjb1Y7UUFDZCxJQUFJQSxlQUFlN1AsdURBQVdBLEVBQzFCdkYsY0FBY3dCLHFEQUFTQSxFQUFFLG1CQUFtQjtJQUM1Qyx5QkFBeUI7SUFDakM7SUFFQSxNQUFNNlQsUUFBUUgsUUFBUXhULEdBQUcsQ0FBRSxDQUFDQztRQUV4QixNQUFNMlQsT0FBUTVWLG9EQUFZQSxDQUFDaUMsR0FBRy9CO1FBQzlCQSxRQUFRYyxhQUFhLENBQUNpQixFQUFFekMsRUFBRSxDQUFDLEdBQUdjO1FBRTlCLE9BQU9zVjtJQUNYO0lBRUEsTUFBTWpXLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDd1Usa0VBQWtCQSxFQUFFbFIsYUFDeEM7V0FDT3FWO1FBQ0hGO0tBQ0g7SUFFTHRYLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHO0lBQUM7SUFBVTtDQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERsQjtBQUNDO0FBRTZCO0FBRUs7QUFFaEQsU0FBU2hCLE9BQU9HLElBQWE7SUFFeEMsSUFBSStWLE9BQVEvVixLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUM1QixJQUFJMlYsUUFBUTVWLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0lBRTVCLElBQUltVyxLQUFLRixvRUFBZSxDQUFDcFYsdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDLENBQWlDO0lBRXpFLElBQUlZLE9BQU80VixpRUFBcUJBO0lBQ2hDLElBQUlsQyxTQUFTbkssa0RBQU0sQ0FBQ2lNLEtBQUt0VixXQUFXLENBQUMsRUFBRSxDQUFDMlYsR0FBRztJQUUzQyxJQUFJbkMsV0FBV3ZVLFdBQ1hhLE9BQU8wVCxPQUFPclQsV0FBVyxDQUFDZ1YsTUFBTW5WLFdBQVc7SUFFL0MsZ0JBQWdCO0lBQ2hCLElBQUlGLFNBQVM0VixpRUFBcUJBLEVBQUU7UUFDaEMsTUFBTSxJQUFJN1UsTUFBTSxDQUFDLEVBQUVzVSxNQUFNblYsV0FBVyxDQUFDLENBQUMsRUFBRTJWLEdBQUcsRUFBRSxFQUFFTCxLQUFLdFYsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0lBQ2xGOzs7Ozs7Ozs7O1FBVUEsR0FDSjtJQUVBdkIsMENBQUVBLENBQUUrVSxPQUFPckssZUFBZSxDQUFFNUosTUFBTStWLE1BQU1IO0FBQzVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ3FDO0FBQ2lCO0FBQ3pCO0FBQ2tCO0FBQ0w7QUFDYTtBQUV4QyxTQUFTeFYsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxJQUFJMFYsT0FBUTVWLG9EQUFZQSxDQUFDSCxLQUFLNkIsTUFBTSxFQUFHeEI7SUFDdkMsSUFBSXVWLFFBQVF6VixvREFBWUEsQ0FBQ0gsS0FBS2tDLEtBQUssRUFBRTdCO0lBRXJDLElBQUkrVixLQUFLQyxpRUFBWSxDQUFDclcsS0FBS29XLEVBQUUsQ0FBQzFVLFdBQVcsQ0FBQ0MsS0FBSyxDQUE4QjtJQUU3RSxJQUFJeVUsT0FBTzFXLFdBQVc7UUFDbEJxRixRQUFRQyxJQUFJLENBQUMsTUFBTWhGLEtBQUtvVyxFQUFFLENBQUMxVSxXQUFXLENBQUNDLEtBQUs7UUFDNUMsTUFBTSxJQUFJTCxNQUFNO0lBQ3BCO0lBRUEsTUFBTXhCLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDb1UsZ0VBQWdCQSxFQUFFd0UsS0FBS3RWLFdBQVcsRUFDdEQ7UUFDSXNWO1FBQ0FIO0tBQ0g7SUFHTDlVLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR3lXO0lBRWpCOVgsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDakNSO0FBR2IsU0FBU2hCLE9BQU9HLElBQWE7SUFFeENaLDBDQUFFLENBQUMsRUFBRVksS0FBS0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVELEtBQUtDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ29CO0FBQ1Y7QUFDTDtBQUUzQixTQUFTRyxRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1QLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDc1UsbUVBQW1CQSxFQUFFLEdBQ3pDO1FBQ0l0UixvREFBWUEsQ0FBQ0gsS0FBS2tDLEtBQUssRUFBRTdCO1FBQ3pCRixvREFBWUEsQ0FBQ0gsS0FBS3lFLEtBQUssRUFBRXBFO0tBQzVCO0lBR0wvQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRztJQUFDO0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJSO0FBQ0M7QUFHZCxTQUFTaEIsT0FBT0csSUFBYTtJQUN4Q1osMENBQUUsQ0FBQyxFQUFFWSxLQUFLQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRWEsdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDZTtBQUN2QjtBQUNrQjtBQUNMO0FBRTNCLFNBQVNTLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsTUFBTVAsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNxVSw4REFBY0EsRUFBRSxHQUNwQztRQUNJclIsb0RBQVlBLENBQUNILEtBQUtrQyxLQUFLLEVBQUU3QjtLQUM1QjtJQUdMUyx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUdLLEtBQUtzVyxJQUFJO0lBRTFCaFksbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUVBTSxRQUFRUyxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQlI7QUFDQztBQUdXO0FBRXpCLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDLElBQUkrVixPQUFRL1YsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFDNUIsSUFBSTJWLFFBQVE1VixLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUU1QixNQUFNZ1UsU0FBU25LLGtEQUFNLENBQUNpTSxLQUFLdFYsV0FBVyxDQUFDLENBQUVLLHVDQUFNLENBQUNkLEtBQUtMLEVBQUUsQ0FBQyxDQUFDO0lBRXpEVCwwQ0FBRUEsQ0FBRStVLE9BQU9ySyxlQUFlLENBQUU1SixNQUFNK1YsTUFBTUg7QUFDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkK0M7QUFDTDtBQUVnQztBQUNYO0FBQzFCO0FBQ2lCO0FBQ3pCO0FBRWQsU0FBU3hWLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsSUFBSTBWLE9BQVE1VixvREFBWUEsQ0FBQ0gsS0FBSytWLElBQUksRUFBRzFWO0lBQ3JDLElBQUl1VixRQUFRelYsb0RBQVlBLENBQUNILEtBQUs0VixLQUFLLEVBQUV2VjtJQUVyQyxJQUFJK1YsS0FBS0MsaUVBQVksQ0FBQ3JXLEtBQUtvVyxFQUFFLENBQUMxVSxXQUFXLENBQUNDLEtBQUssQ0FBOEI7SUFFN0UsSUFBSXlVLE9BQU8xVyxXQUFXO1FBQ2xCcUYsUUFBUUMsSUFBSSxDQUFDLE1BQU1oRixLQUFLb1csRUFBRSxDQUFDMVUsV0FBVyxDQUFDQyxLQUFLO1FBQzVDLE1BQU0sSUFBSUwsTUFBTTtJQUNwQjtJQUdBLElBQUlmLE9BQU80VixpRUFBcUJBO0lBQ2hDLElBQUlsQyxTQUFTbkssa0RBQU0sQ0FBQ2lNLEtBQUt0VixXQUFXLENBQUMsRUFBRSxDQUFDMlYsR0FBRztJQUUzQyxJQUFJbkMsV0FBV3ZVLFdBQ1hhLE9BQU8wVCxPQUFPclQsV0FBVyxDQUFDZ1YsTUFBTW5WLFdBQVc7SUFFL0Msd0JBQXdCO0lBQ3hCLElBQUlGLFNBQVM0VixpRUFBcUJBLEVBQUU7UUFDaENDLEtBQVNHLDBFQUFpQkEsQ0FBQ0g7UUFDM0JuQyxTQUFTbkssa0RBQU0sQ0FBQzhMLE1BQU1uVixXQUFXLENBQUMsRUFBRSxDQUFDMlYsR0FBRztRQUN4QyxJQUFJbkMsV0FBV3ZVLFdBQ1hhLE9BQVMwVCxPQUFPclQsV0FBVyxDQUFDbVYsS0FBS3RWLFdBQVc7UUFFaEQsSUFBSUYsU0FBUzRWLGlFQUFxQkEsRUFDOUIsTUFBTSxJQUFJN1UsTUFBTSxDQUFDLEVBQUVzVSxNQUFNblYsV0FBVyxDQUFDLENBQUMsRUFBRTJWLEdBQUcsQ0FBQyxFQUFFTCxLQUFLdFYsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBRXJGLENBQUNzVixNQUFNSCxNQUFNLEdBQUc7WUFBQ0E7WUFBT0c7U0FBSztJQUNqQztJQUVBLE1BQU1qVyxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ29VLGdFQUFnQkEsRUFBRWhSLE1BQ3RDO1FBQ0l3VjtRQUNBSDtLQUNIO0lBR0w5VSx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUd5VztJQUVqQjlYLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHO0lBQUM7Q0FBUTs7Ozs7Ozs7Ozs7Ozs7O0FDdkRoQyxpRUFBZTtJQUNYMlYsZ0JBQWdCLENBQUMxQixHQUFXQztRQUN4QixPQUFPOU0sS0FBS3dPLEtBQUssQ0FBRTNCLElBQUVDO0lBQ3pCO0lBQ0EyQixjQUFjLENBQUM1QixHQUFXQztRQUV0QixJQUFJNEIsU0FBUzdCLElBQUVDO1FBQ2YsSUFBSTRCLFNBQVMsS0FBSzdCLElBQUVDLE1BQU0sRUFBRSxFQUN4QixPQUFPNEI7UUFFWCxPQUFPLEVBQUVBO0lBQ2I7SUFDQUMsV0FBVyxDQUFJOUIsR0FBV0M7UUFFdEIsTUFBTThCLE1BQU0sQ0FBQy9CLElBQUlDLElBQUlBLENBQUFBLElBQUtBO1FBQzFCLElBQUk4QixRQUFRLEtBQUs5QixJQUFJLEdBQ2pCLE9BQU8sQ0FBQztRQUNaLE9BQU84QjtJQUNYO0lBQ0FDLFNBQVMsQ0FBSWhDLEdBQVdDO1FBRXBCLE9BQU8sQ0FBQ0QsSUFBSUMsSUFBSUEsQ0FBQUEsSUFBS0E7SUFDekI7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QjJCO0FBQ0M7QUFFd0I7QUFFdEMsU0FBU2xWLE9BQU9HLElBQWE7SUFDeENkLDBDQUFFQSxDQUFFNlgsbUVBQVVBLENBQUMvVyxNQUFNYyx1Q0FBTSxDQUFDZCxLQUFLTCxFQUFFLENBQUMsS0FBS0ssS0FBS0MsUUFBUTtBQUMxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQcUM7QUFDa0I7QUFDMUI7QUFDa0I7QUFDTDtBQUUxQyxNQUFNK1csYUFBYTtJQUNmLE9BQU87SUFDUCxNQUFPO0FBQ1g7QUFFZSxTQUFTNVcsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxJQUFJSixXQUFXRCxLQUFLaUosTUFBTSxDQUFDOUcsR0FBRyxDQUFFLENBQUNDLElBQVVqQyxvREFBWUEsQ0FBQ2lDLEdBQUcvQjtJQUUzRCxNQUFNK1YsS0FBT1ksVUFBVSxDQUFDaFgsS0FBS29XLEVBQUUsQ0FBQzFVLFdBQVcsQ0FBQ0MsS0FBSyxDQUE0QjtJQUM3RSxNQUFNcEIsT0FBT04sUUFBUSxDQUFDLEVBQUUsQ0FBQ1EsV0FBVztJQUVwQyxNQUFNWCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ21VLGlFQUFpQkEsRUFBRS9RLE1BQU1OO0lBRWpEYSx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUd5VztJQUVqQjlYLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHO0lBQUM7Q0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCRjtBQUNGO0FBRTRDO0FBRVY7QUFHL0QsU0FBU29XLHlCQUF5QmpYLElBQWEsRUFBRStWLElBQVksRUFBRUssRUFBVSxFQUFFUixLQUFjO0lBRXJGLElBQUlzQixXQUFXO0lBQ2YsTUFBTUMsUUFBUXZCLE1BQU1uVixXQUFXO0lBQy9CLE1BQU0yVyxRQUFRckIsS0FBS3RWLFdBQVc7SUFFOUIsSUFBSUYsT0FBTzRWLGlFQUFxQkE7SUFDaEMsSUFBSWxDLFNBQVNuSyxrREFBTSxDQUFDaU0sS0FBS3RWLFdBQVcsQ0FBQyxFQUFFLENBQUMyVixHQUFHO0lBQzNDLElBQUluQyxXQUFXdlUsV0FDWGEsT0FBTzBULE9BQU9yVCxXQUFXLENBQUNnVixNQUFNblYsV0FBVztJQUUvQyxJQUFJRixTQUFTNFYsaUVBQXFCQSxFQUFFO1FBRWhDQyxLQUFTRywwRUFBaUJBLENBQUNIO1FBQzNCbkMsU0FBU25LLGtEQUFNLENBQUM4TCxNQUFNblYsV0FBVyxDQUFDLEVBQUUsQ0FBQzJWLEdBQUc7UUFDeEMsSUFBSW5DLFdBQVd2VSxXQUNYYSxPQUFTMFQsT0FBT3JULFdBQVcsQ0FBQ21WLEtBQUt0VixXQUFXO1FBRWhELElBQUlGLFNBQVM0VixpRUFBcUJBLEVBQUU7WUFDaEMsSUFBSUMsT0FBTyxZQUFZQSxPQUFPLFVBQzFCLE1BQU0sSUFBSTlVLE1BQU0sQ0FBQyxFQUFFOFYsTUFBTSxDQUFDLEVBQUVoQixHQUFHLENBQUMsRUFBRWUsTUFBTSxpQkFBaUIsQ0FBQztZQUU5RCxNQUFNRSxPQUFPakIsT0FBTyxXQUFXLFFBQVE7WUFFdkMsT0FBT3JRLG9FQUFXQSxDQUFDL0YsTUFBTStWLE1BQU1zQixNQUFNekI7UUFDekM7UUFFQXNCLFdBQVc7UUFDWCxDQUFDbkIsTUFBTUgsTUFBTSxHQUFHO1lBQUNBO1lBQU9HO1NBQUs7SUFDakM7SUFFQSxPQUFPOUIsT0FBT3JLLGVBQWUsQ0FBRTVKLE1BQU0rVixNQUFNSCxPQUFPc0I7QUFDdEQ7QUFFZSxTQUFTclgsT0FBT0csSUFBYTtJQUV4QyxNQUFNa0MsUUFBUXBCLHVDQUFNLENBQUNkLEtBQUtMLEVBQUUsQ0FBQztJQUU3QixJQUFJLElBQUlMLElBQUksR0FBR0EsSUFBSTRDLE1BQU0xRSxNQUFNLEVBQUUsRUFBRThCLEVBQUc7UUFDbEMsSUFBSUEsTUFBTSxHQUNOSCx5Q0FBQ0EsQ0FBQztRQUVOLE1BQU1pWCxLQUFRbFUsS0FBSyxDQUFDNUMsRUFBRTtRQUN0QixNQUFNeVcsT0FBUS9WLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRTtRQUM5QixNQUFNc1csUUFBUTVWLEtBQUtDLFFBQVEsQ0FBQ1gsSUFBRSxFQUFFO1FBRWhDLElBQUk4VyxPQUFPLE1BQU87WUFDZGxYLDBDQUFFQSxDQUFFNkcsb0VBQVdBLENBQUMvRixNQUFNK1YsTUFBTSxPQUFPSDtZQUNuQztRQUNKO1FBQ0EsSUFBSVEsT0FBTyxVQUFXO1lBQ2xCbFgsMENBQUVBLENBQUU2RyxvRUFBV0EsQ0FBQy9GLE1BQU0rVixNQUFNLE9BQU9IO1lBQ25DO1FBQ0o7UUFFQTFXLDBDQUFFQSxDQUFFK1gseUJBQXlCalgsTUFBTStWLE1BQU1LLElBQUlSO0lBQ2pEO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRXFDO0FBQ2tCO0FBQzFCO0FBQ2tCO0FBQ0w7QUFDYTtBQUNYO0FBRTdCLFNBQVN4VixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1pWCxNQUFNdFgsS0FBS3NYLEdBQUcsQ0FBQ25WLEdBQUcsQ0FBRSxDQUFDb0I7UUFDdkIsTUFBTTZTLEtBQUtDLGlFQUFZLENBQUM5UyxFQUFFN0IsV0FBVyxDQUFDQyxLQUFLLENBQThCO1FBQ3pFLElBQUl5VSxPQUFPMVcsV0FDUCxNQUFNLElBQUk0QixNQUFNLENBQUMsRUFBRWlDLEVBQUU3QixXQUFXLENBQUNDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztRQUM3RCxPQUFPeVU7SUFDWDtJQUVBLE1BQU1MLE9BQVM1VixvREFBWUEsQ0FBQ0gsS0FBSytWLElBQUksRUFBRTFWO0lBQ3ZDLE1BQU1rWCxTQUFTdlgsS0FBS3dYLFdBQVcsQ0FBQ3JWLEdBQUcsQ0FBRSxDQUFDQyxJQUFVakMsb0RBQVlBLENBQUNpQyxHQUFHL0I7SUFFaEUsTUFBTVAsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNrVSxpRUFBaUJBLEVBQUV1QixzREFBVUEsRUFDakQ7UUFDSW1EO1dBQ0d3QjtLQUNOO0lBR0x6Vyx1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUcyWDtJQUVqQmhaLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENLO0FBQ0M7QUFFb0M7QUFFWjtBQUd0QyxTQUFTaEIsT0FBT0csSUFBYTtJQUV4QyxNQUFNK1YsT0FBUS9WLEtBQUtDLFFBQVEsQ0FBQyxFQUFFO0lBQzlCLE1BQU1pQyxRQUFRcEIsdUNBQU0sQ0FBQ2QsS0FBS0wsRUFBRSxDQUFDO0lBRTdCLElBQUl1QyxVQUFVLE9BQ1YsT0FBT2hELDBDQUFFQSxDQUFFc1YsbUVBQVVBLENBQUN4VSxNQUFNLEtBQUt3VCxtRUFBVUEsQ0FBQ3VDLE1BQU0vUCx1REFBV0E7SUFFakUsTUFBTWlPLFNBQVNuSyxrREFBTSxDQUFDaU0sS0FBS3RWLFdBQVcsQ0FBRSxDQUFDeUIsTUFBTTtJQUUvQ2hELDBDQUFFQSxDQUFFK1UsT0FBT3JLLGVBQWUsQ0FBRTVKLE1BQU0rVjtBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CK0M7QUFDTDtBQUVhO0FBQ29CO0FBQ3RDO0FBQ2dCO0FBQ3hCO0FBRWQsU0FBUzNWLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsSUFBSTBWLE9BQVE1VixvREFBWUEsQ0FBQ0gsS0FBS3lYLE9BQU8sRUFBR3BYO0lBRXhDLElBQUkrVixLQUFLQyxpRUFBWSxDQUFDclcsS0FBS29XLEVBQUUsQ0FBQzFVLFdBQVcsQ0FBQ0MsS0FBSyxDQUE4QjtJQUU3RSxJQUFJeVUsT0FBTzFXLFdBQVc7UUFDbEJxRixRQUFRQyxJQUFJLENBQUMsTUFBTWhGLEtBQUtvVyxFQUFFLENBQUMxVSxXQUFXLENBQUNDLEtBQUs7UUFDNUMsTUFBTSxJQUFJTCxNQUFNO0lBQ3BCO0lBRUEsSUFBSThVLE9BQU8sT0FBTztRQUNkLE1BQU10VyxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ2lVLCtEQUFlQSxFQUFFd0Isc0RBQVVBLEVBQUU7WUFBRW1EO1NBQU07UUFFN0RqVix1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUc7UUFDakJyQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztRQUV0QixPQUFPRjtJQUNYO0lBRUEsSUFBSVMsT0FBTzRWLGlFQUFxQkE7SUFDaEMsSUFBSWxDLFNBQVNuSyxrREFBTSxDQUFDaU0sS0FBS3RWLFdBQVcsQ0FBQyxFQUFFLENBQUMyVixHQUFHO0lBRTNDLElBQUluQyxXQUFXdlUsV0FDWGEsT0FBTzBULE9BQU9yVCxXQUFXO0lBRTdCLElBQUlMLFNBQVM0VixpRUFBcUJBLEVBQzlCLE1BQU0sSUFBSTdVLE1BQU0sQ0FBQyxFQUFFOFUsR0FBRyxDQUFDLEVBQUVMLEtBQUt0VixXQUFXLENBQUMsaUJBQWlCLENBQUM7SUFFaEUsTUFBTVgsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNpVSwrREFBZUEsRUFBRTdRLE1BQU07UUFBRXdWO0tBQU07SUFDdkRqVix1Q0FBTSxDQUFDaEIsSUFBSUgsRUFBRSxDQUFDLEdBQUd5VztJQUVqQjlYLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHO0lBQUM7Q0FBVTs7Ozs7Ozs7Ozs7Ozs7OztBQzlDUDtBQUdaLFNBQVNoQixPQUFPRyxJQUFhO0lBQ3hDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMcUM7QUFDSztBQUVBO0FBRTNCLFNBQVNpQixRQUFRSixJQUFTLEVBQUV3UyxRQUFpQjtJQUV4RCxNQUFNMVMsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUNnVSxvREFBSUE7SUFFNUI3UyxtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBR0FNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZRO0FBR2hCLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDLElBQUlBLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sS0FBSyxHQUN6QixPQUFPMkIseUNBQUNBLENBQUM7SUFFYixPQUFPQywwQ0FBRSxDQUFDLE9BQU8sRUFBRVksS0FBS0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RxQztBQUNPO0FBQ0c7QUFDTDtBQUVjO0FBRXpDLFNBQVNHLFFBQVFKLElBQVMsRUFBRUssT0FBZ0I7SUFFdkQsOEJBQThCO0lBQzlCLElBQUlJLGNBQWM4UiwwREFBY0E7SUFDaEMsSUFBSXRTLFdBQWNQO0lBRWxCLElBQUdNLEtBQUtrQyxLQUFLLEtBQUt4QyxXQUFXO1FBQ3pCLE1BQU1nWSxPQUFPdlgsb0RBQVlBLENBQUNILEtBQUtrQyxLQUFLLEVBQUU3QjtRQUN0Q0ksY0FBY2lYLEtBQUtqWCxXQUFXO1FBQzlCUixXQUFjO1lBQUN5WDtTQUFLO0lBQ3hCO0lBRUEsTUFBTWxYLE9BQU8sa0RBQU8sQ0FBQ0gsUUFBUWlLLG1CQUFtQixDQUFFN0osV0FBVyxDQUFDLENBQWNDLFFBQVE7SUFDcEYsSUFBSUYsS0FBS0ksV0FBVyxLQUFLbEIsV0FDckJjLEtBQUtJLFdBQVcsR0FBRyxJQUFNSDtJQUU3QixNQUFNWCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQytULHNEQUFNQSxFQUFFelEsYUFBYVI7SUFFN0MzQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQzlCUTtBQUdoQixTQUFTaEIsT0FBT0csSUFBYTtJQUV4Q2IseUNBQUNBLENBQUM7SUFFRixJQUFJYSxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEdBQUcsR0FDdkI0QiwwQ0FBRSxDQUFDLEVBQUVZLEtBQUtDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFRCxLQUFLQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFaEQsSUFBSSxJQUFJWCxJQUFJLEdBQUdBLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sRUFBRThCLEtBQUcsRUFDeENGLDBDQUFFLENBQUMsRUFBRSxFQUFFWSxLQUFLQyxRQUFRLENBQUNYLEVBQUUsQ0FBQyxFQUFFLEVBQUVVLEtBQUtDLFFBQVEsQ0FBQ1gsSUFBRSxFQUFFLENBQUMsQ0FBQztJQUVwREgseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RxQztBQUNhO0FBQ0g7QUFDTDtBQUUzQixTQUFTaUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxJQUFJSixXQUFXLElBQUlULE1BQU1RLEtBQUsrSSxJQUFJLENBQUN2TCxNQUFNLEdBQUc7SUFDNUMsSUFBSSxJQUFJOEIsSUFBSSxHQUFHQSxJQUFJVSxLQUFLK0ksSUFBSSxDQUFDdkwsTUFBTSxFQUFFLEVBQUU4QixFQUFHO1FBQ3RDVyxRQUFRLENBQUMsSUFBRVgsRUFBRSxHQUFLYSxvREFBWUEsQ0FBQ0gsS0FBTytJLElBQUksQ0FBQ3pKLEVBQUUsRUFBRWU7UUFDL0NKLFFBQVEsQ0FBQyxJQUFFWCxJQUFFLEVBQUUsR0FBR2Esb0RBQVlBLENBQUNILEtBQUtpSixNQUFNLENBQUMzSixFQUFFLEVBQUVlO0lBQ25EO0lBRUEsTUFBTVAsTUFBTSxJQUFJM0Msb0RBQU9BLENBQUM4VCw0REFBWUEsRUFBRSxHQUFHaFI7SUFFekMzQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCSTtBQUdaLFNBQVNoQixPQUFPRyxJQUFhO0lBRXhDYix5Q0FBQ0EsQ0FBQztJQUVGLElBQUlhLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sR0FBRyxHQUN2QjJCLHlDQUFDQSxDQUFDYSxLQUFLQyxRQUFRLENBQUMsRUFBRTtJQUV0QixJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVUsS0FBS0MsUUFBUSxDQUFDekMsTUFBTSxFQUFFLEVBQUU4QixFQUN2Q0gseUNBQUNBLENBQUMsTUFBTWEsS0FBS0MsUUFBUSxDQUFDWCxFQUFFO0lBRTVCSCx5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZHFDO0FBQ2E7QUFDSDtBQUNMO0FBRTNCLFNBQVNpQixRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELE1BQU1QLE1BQU0sSUFBSTNDLG9EQUFPQSxDQUFDNlQsNERBQVlBLEVBQUUsR0FDbENoUixLQUFLMlgsSUFBSSxDQUFDeFYsR0FBRyxDQUFFLENBQUNDLElBQVdqQyxvREFBWUEsQ0FBQ2lDLEdBQUcvQjtJQUUvQy9CLG1EQUFXQSxDQUFDLElBQUV3QixJQUFJSCxFQUFFLEVBQUVLO0lBRXRCLE9BQU9GO0FBQ1g7QUFFQU0sUUFBUVMsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDZkk7QUFHWixTQUFTaEIsT0FBT0csSUFBYTtJQUV4Q2IseUNBQUNBLENBQUM7SUFFRixJQUFJYSxLQUFLQyxRQUFRLENBQUN6QyxNQUFNLEdBQUcsR0FDdkIyQix5Q0FBQ0EsQ0FBQ2EsS0FBS0MsUUFBUSxDQUFDLEVBQUU7SUFFdEIsSUFBSSxJQUFJWCxJQUFJLEdBQUdBLElBQUlVLEtBQUtDLFFBQVEsQ0FBQ3pDLE1BQU0sRUFBRSxFQUFFOEIsRUFDdkNILHlDQUFDQSxDQUFDLE1BQU1hLEtBQUtDLFFBQVEsQ0FBQ1gsRUFBRTtJQUU1QkgseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RxQztBQUNjO0FBQ0o7QUFDTDtBQUUzQixTQUFTaUIsUUFBUUosSUFBUyxFQUFFSyxPQUFnQjtJQUV2RCxNQUFNUCxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQzRULDZEQUFhQSxFQUFFLEdBQ25DL1EsS0FBSzJYLElBQUksQ0FBQ3hWLEdBQUcsQ0FBRSxDQUFDQyxJQUFXakMsb0RBQVlBLENBQUNpQyxHQUFHL0I7SUFHL0MvQixtREFBV0EsQ0FBQyxJQUFFd0IsSUFBSUgsRUFBRSxFQUFFSztJQUV0QixPQUFPRjtBQUNYO0FBRUFNLFFBQVFTLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkk7QUFDRTtBQUdkLFNBQVNoQixPQUFPRyxJQUFhO0lBQ3hDYix5Q0FBQ0EsQ0FBRTJCLHVDQUFNLENBQUNkLEtBQUtMLEVBQUUsQ0FBQztBQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xQztBQUdLO0FBQ0U7QUFDZjtBQUU3QixTQUFTaVksUUFBUXRULENBQVU7SUFDdkIsZ0dBQWdHO0lBQ2hHLE9BQU8wRSxPQUFPNk8seUJBQXlCLENBQUN2VCxJQUFJd1QsV0FBV0MsYUFBYTtBQUN4RTtBQUVlLFNBQVMzWCxRQUFRSixJQUFTLEVBQUVLLE9BQWdCO0lBRXZELElBQUlJLGNBQWM7SUFDbEIsSUFBSXlCLFFBQVFsQyxLQUFLTCxFQUFFO0lBRW5CLElBQUl1QyxVQUFVLFFBQ1ZBLFFBQVEsUUFBUSwyREFBMkQ7U0FDMUUsSUFBSUEsU0FBUzdCLFFBQVFjLGFBQWEsRUFDbkNWLGNBQWNKLFFBQVFjLGFBQWEsQ0FBQ2UsTUFBTTtJQUU5Qzs7Ozs7Ozs7SUFRQSxHQUVBLE1BQU1wQyxNQUFNLElBQUkzQyxvREFBT0EsQ0FBQ2dHLHNEQUFNQSxFQUFFMUM7SUFFaENLLHVDQUFNLENBQUNoQixJQUFJSCxFQUFFLENBQUMsR0FBR3VDO0lBQ2pCNUQsbURBQVdBLENBQUMsSUFBRXdCLElBQUlILEVBQUUsRUFBRUs7SUFFdEIsT0FBT0Y7QUFDWDtBQUdBTSxRQUFRUyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q3FCO0FBRTdCLE1BQU1vWCxxQkFBcUJELDJEQUFTQTtBQUVuRCxFQUdBLGdCQUFnQjtDQUNaLFVBQVU7Q0FDVixXQUFXO0NBQ1AsV0FBVztDQUNYLHdDQUF3QztDQUN4QyxrQkFBa0I7Q0FDbEIsU0FBUztDQUNMLHVCQUF1QjtDQUN2QixjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FDZmE7QUFFeEIsTUFBTUUsdUJBQXVCRCxrREFBWUE7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pvQztBQUNnQjtBQUNGO0FBR2xELE1BQU01RixVQUFVO0lBQ2YsVUFBVThGLGtEQUFTQTtJQUNuQixlQUFlQyxrRUFBU0E7SUFDeEIsYUFBYUMsZ0VBQVNBO0FBQ3ZCO0FBRUEsaUVBQWVoRyxPQUFPQSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNYUixNQUFNMkY7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGMEM7QUFFbkMsTUFBTXhiLGFBQWU4YixhQUFhO0FBQ3pDLE1BQU1DLGVBQWU7QUFFZCxNQUFNdmIsWUFBWSxFQUFFO0FBQ3BCLE1BQU1KLFdBQVksRUFBRTtBQUNwQixNQUFNSCxXQUFZLEVBQUU7QUFDcEIsTUFBTUksV0FBWSxFQUFFO0FBQ3BCLE1BQU1GLGdCQUFnQkYsV0FBV08sVUFBVTtBQUMzQyxNQUFNTixlQUFnQkQsV0FBV0csU0FBUztBQUMxQyxNQUFNRyxnQkFBZ0JGLFdBQVdHLFVBQVU7QUFDM0MsTUFBTUYsZUFBZ0JELFdBQVdELFNBQVM7QUFFMUMsTUFBTU0sVUFBVSxJQUFJVixXQUFXLElBQUUrYixjQUFjO0FBQy9DLE1BQU10YixVQUFVLElBQUlULFdBQVcsSUFBRStiLGNBQWM7QUFFdEQsZ0NBQWdDO0FBQ3pCLE1BQU16WCxTQUFTLElBQUl0QixRQUFhO0FBR3hCLFNBQVNnWjtJQUNwQjFYLE9BQU90RCxNQUFNLEdBQUc7SUFDaEJMLG9EQUFPQSxDQUFDc2IsZ0JBQWdCLEdBQUc7QUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkEsbUNBQW1DO0FBS2dCO0FBRThDO0FBQ3JFO0FBQ3NDO0FBT2xFLE1BQU1DLFVBQW9DLENBQUM7QUFFM0MsSUFBSSxJQUFJcFosSUFBSSxHQUFJQSxJQUFJOFMsNERBQVdBLENBQUM1VSxNQUFNLEVBQUUsRUFBRThCLEVBQUc7SUFFekMsTUFBTStMLFNBQVMrRyw0REFBVyxDQUFDOVMsRUFBRTtJQUU3QixJQUFJOEwsUUFBUTtRQUFDO0tBQU87SUFDcEIsSUFBSSxrQkFBa0JDLFFBQVE7UUFFMUIsSUFBSTdMLE1BQU1DLE9BQU8sQ0FBQzRMLE9BQU94SyxZQUFZLEdBQ2pDdUssUUFBUUMsT0FBT3hLLFlBQVk7YUFFM0J1SyxRQUFRO1lBQUNDLE9BQU94SyxZQUFZO1NBQVc7SUFDL0M7SUFFQSxLQUFJLElBQUlPLFFBQVFnSyxNQUNaLENBQUNzTixPQUFPLENBQUN0WCxLQUFLLEtBQUssRUFBRSxFQUFFcUIsSUFBSSxDQUFDbkQ7QUFDcEM7QUFFTyxTQUFTcVosT0FBT0MsSUFBWSxFQUFFcGEsUUFBZ0I7SUFFakQsTUFBTXFhLFNBQVMsSUFBSUMsR0FBR0MsTUFBTSxDQUFDSCxNQUFNcGEsVUFBVTtJQUNoRCxNQUFNd2EsT0FBT0YsR0FBR0csUUFBUSxDQUFDQyxVQUFVLENBQUNMO0lBQ2pDLDJCQUEyQjtJQUU5QixPQUFPO1FBQ0E5WSxNQUFNb1osWUFBWUg7UUFDbEJ4YTtJQUNKO0FBQ0o7QUFFTyxTQUFTMmEsWUFBWXJaLEdBQVE7SUFFaEMwWSwrQ0FBU0E7SUFFVCxNQUFNN0IsU0FBU3hXLGFBQWFMLElBQUlDLElBQUksRUFBRSxJQUFJa0I7SUFFMUM7Ozs7Ozs7a0NBTzhCLEdBRTlCLE9BQU8wVjtBQUNYO0FBR0EsU0FBU3lDLFlBQVl6YixZQUFpQjtJQUVsQyxpQkFBaUI7SUFDakIsSUFBSTZCLE1BQU1DLE9BQU8sQ0FBQzlCLGVBQ2QsT0FBTztJQUVYLE9BQU9BLGFBQWErRCxXQUFXLENBQUNDLEtBQUs7QUFDekM7QUFFTyxTQUFTeEIsYUFBYXhDLFlBQWlCLEVBQUUwQyxPQUFnQjtJQUU1RCxJQUFJZSxPQUFPZ1ksWUFBWXpiO0lBRXZCLElBQUd5RCxTQUFTLFFBQVE7UUFDaEJ6RCxlQUFlQSxhQUFhdUUsS0FBSztRQUNqQ2QsT0FBT2dZLFlBQVl6YjtJQUN2QjtJQUVBLE1BQU0wYixhQUFhWCxPQUFPLENBQUN0WCxLQUFLO0lBRWhDLElBQUlpWSxlQUFlM1osV0FBWTtRQUMzQnFGLFFBQVFDLElBQUksQ0FBQywwQkFBMEI1RDtRQUN2QzJELFFBQVFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRXJILGFBQWFHLE1BQU0sQ0FBQyxDQUFDLEVBQUVILGFBQWFJLFVBQVUsQ0FBQyxDQUFDO1FBQ25FZ0gsUUFBUU0sR0FBRyxDQUFFMUg7UUFDYnlELE9BQU87SUFDWDtJQUVBLG1EQUFtRDtJQUNuRCxJQUFJLElBQUk5QixJQUFJLEdBQUdBLElBQUkrWixXQUFXN2IsTUFBTSxFQUFFLEVBQUU4QixFQUFHO1FBQ3ZDLE1BQU1xWCxTQUFTdkUsNERBQVcsQ0FBQ2lILFVBQVUsQ0FBQy9aLEVBQUUsQ0FBQyxDQUFDM0IsY0FBYzBDO1FBQ3hELElBQUdzVyxXQUFXalgsV0FBVztZQUNyQixNQUFNNFosS0FBS0QsVUFBVSxDQUFDL1osRUFBRTtZQUN4QnFYLE9BQU8vVyxPQUFPLEdBQUcwWjtZQUNqQixPQUFPM0M7UUFDWDtJQUNKO0lBRUE1UixRQUFRd1UsS0FBSyxDQUFDNWI7SUFDZCxNQUFNLElBQUkyRCxNQUFNLENBQUMsaUJBQWlCLEVBQUVGLEtBQUssSUFBSSxFQUFFekQsYUFBYUcsTUFBTSxDQUFDLENBQUMsRUFBRUgsYUFBYUksVUFBVSxDQUFDLENBQUM7QUFDbkc7QUFFTyxNQUFNa0Q7SUFDVFMsWUFBWW5CLE9BQTBCLEdBQUcsRUFBRWlaLGlCQUEwQkMsV0FBVyxDQUFFO1FBQzlFLElBQUksQ0FBQ2xaLElBQUksR0FBR0EsTUFBTSxjQUFjO1FBQ2hDLElBQUksQ0FBQ1ksYUFBYSxHQUFHO1lBQUMsR0FBR3FZLGVBQWVyWSxhQUFhO1FBQUE7SUFDekQ7SUFFQVosS0FBSztJQUVMK0osb0JBQThCO0lBRTlCbkosY0FBc0M7QUFDMUM7QUFFQSxNQUFNdVksV0FBVyxDQUFDLEVBQUUsMkJBQTJCO0FBRS9DLGVBQWU7QUFDZixvQkFBb0I7QUFDcEIsb0RBQW9EO0FBQ3BELFNBQVNDLGNBQWN2WSxJQUFZLEVBQUVSLFdBQTRCO0lBQzdELE1BQU1nWixTQUFTLENBQUMsRUFBRSxFQUFFeFksS0FBSyxFQUFFLENBQUM7SUFDNUIsT0FBTztRQUNIcVIsV0FBV2lIO1FBQ1hqUCxVQUFXcko7UUFDWFYsVUFBVztZQUNQLHdCQUF3QjtZQUN4QkUsYUFBaUJBO1lBQ2pCLGdCQUFnQjtZQUNoQmdKLGlCQUFpQixDQUFDaVE7Z0JBQ2QsTUFBTTlELE9BQU84RCxLQUFLNVosUUFBUSxDQUFDLEVBQUU7Z0JBQzdCLE1BQU1nVSxTQUFTbkssa0RBQU0sQ0FBQ2lNLEtBQUt0VixXQUFXLENBQUMsQ0FBRW1aLE9BQU87Z0JBQ2hELE9BQU8zRixPQUFPckssZUFBZSxDQUFFaVE7WUFDbkM7UUFDSjtJQUNKO0FBQ0o7QUFFQSxzQkFBc0I7QUFDdEIsTUFBTUMsTUFBTW5ILHdEQUFRQSxDQUFDLE9BQU9nSCxjQUFjLE9BQU9oRiwyREFBT0E7QUFFeEQsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNOEUsY0FBdUI7SUFDekJsWixNQUFNO0lBQ05ZLGVBQWU7UUFDWDRZLEtBQU83WSwwREFBVUEsQ0FBQztRQUNsQjdCLEtBQU82QiwwREFBVUEsQ0FBQztRQUNsQjhZLE9BQU85WSwwREFBVUEsQ0FBQztRQUNsQjRZO0lBR0o7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlKQSxjQUFjO0FBSWtDO0FBUXpDLFNBQVNuQixPQUFPQyxJQUFZLEVBQUVwYSxRQUFnQjtJQUVqRCxNQUFNa0YsUUFBUSxJQUFJbEU7SUFFbEIsSUFBSTBhLFNBQVM7UUFDVHhjLFFBQVE7UUFDUmlHLE1BQU07UUFDTndXLGFBQWM7SUFDbEI7SUFFQSxJQUFJQztJQUNKLEdBQUc7UUFDQzFXLE1BQU1qQixJQUFJLENBQUU0WCxnQkFBZ0J6QixNQUFNc0I7UUFDbENFLE9BQU94QixJQUFJLENBQUNzQixPQUFPeGMsTUFBTSxDQUFDO1FBQzFCLE1BQU8wYyxTQUFTLEtBQU87WUFDbkJBLE9BQU94QixJQUFJLENBQUMsRUFBRXNCLE9BQU94YyxNQUFNLENBQUM7WUFDNUIsRUFBRXdjLE9BQU92VyxJQUFJO1FBQ2pCO1FBRUF1VyxPQUFPQyxXQUFXLEdBQUdELE9BQU94YyxNQUFNO0lBRXRDLFFBQVMwYyxTQUFTMWEsVUFBWTtJQUU5Qix1REFBdUQ7SUFDMUQsOENBQThDO0lBQzNDLDJCQUEyQjtJQUM5QixPQUFPO1FBQ0FnRTtRQUNBbEY7SUFDSjtBQUNKO0FBRTBEO0FBRTFELFNBQVMrYixZQUFZM0IsSUFBWSxFQUFFc0IsTUFBYztJQUU3QyxNQUFNTSxZQUFZTixPQUFPeGMsTUFBTTtJQUUvQixJQUFJK2MsTUFBTTdCLElBQUksQ0FBQ3NCLE9BQU94YyxNQUFNLENBQUM7SUFDN0IsTUFBTytjLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLE9BQU9BLE9BQU8sSUFDOUZBLE1BQU83QixJQUFJLENBQUMsRUFBRXNCLE9BQU94YyxNQUFNLENBQUM7SUFFaEMsTUFBTWdkLFNBQVM5QixLQUFLblUsS0FBSyxDQUFDK1YsV0FBV04sT0FBT3hjLE1BQU07SUFFbEQscUJBQXFCO0lBRXJCLE9BQU87UUFDSDZDLE1BQVU7UUFDVjJCLE9BQVV3WTtRQUNWemEsVUFBVSxFQUFFO1FBQ1pRLGFBQWE7UUFFYmthLE1BQU1MLG1FQUFjQTtJQUN4QjtBQUNKO0FBRXFFO0FBRXJFLFNBQVNPLFlBQVlqQyxJQUFZLEVBQUVzQixNQUFjO0lBRTdDLE1BQU1NLFlBQVlOLE9BQU94YyxNQUFNO0lBRS9CLGVBQWU7SUFFZixJQUFJK2MsTUFBTTdCLElBQUksQ0FBQ3NCLE9BQU94YyxNQUFNLENBQUM7SUFDN0IsTUFBTytjLE9BQU8sT0FBT0EsT0FBTyxJQUN4QkEsTUFBTzdCLElBQUksQ0FBQyxFQUFFc0IsT0FBT3hjLE1BQU0sQ0FBQztJQUVoQyxPQUFPO1FBQ0g2QyxNQUFVO1FBQ1YyQixPQUFVMFcsS0FBS25VLEtBQUssQ0FBQytWLFdBQVdOLE9BQU94YyxNQUFNO1FBQzdDdUMsVUFBVSxFQUFFO1FBQ1pRLGFBQWE7UUFFYmthLE1BQU1DLHlFQUFtQkE7SUFDN0I7QUFDSjtBQUVxRTtBQUVyRSxTQUFTRyxZQUFZbkMsSUFBWSxFQUFFc0IsTUFBYztJQUU3QyxNQUFNTSxZQUFZTixPQUFPeGMsTUFBTTtJQUUvQixJQUFJK2MsTUFBTTdCLElBQUksQ0FBQyxFQUFFc0IsT0FBT3hjLE1BQU0sQ0FBQztJQUMvQixNQUFPK2MsUUFBUS9hLGFBQWErYSxRQUFRLE9BQU83QixJQUFJLENBQUNzQixPQUFPeGMsTUFBTSxHQUFDLEVBQUUsS0FBSyxLQUNqRStjLE1BQU03QixJQUFJLENBQUMsRUFBRXNCLE9BQU94YyxNQUFNLENBQUM7SUFFL0IsRUFBRXdjLE9BQU94YyxNQUFNO0lBRWYsT0FBTztRQUNINkMsTUFBVTtRQUNWMkIsT0FBVTBXLEtBQUtuVSxLQUFLLENBQUMrVixXQUFXTixPQUFPeGMsTUFBTTtRQUM3Q3VDLFVBQVUsRUFBRTtRQUNaUSxhQUFhO1FBRWJrYSxNQUFNRyx5RUFBbUJBO0lBQzdCO0FBQ0o7QUFFQSxTQUFTVCxnQkFBZ0J6QixJQUFZLEVBQUVzQixNQUFjO0lBQ2pELElBQUlFLE9BQU94QixJQUFJLENBQUNzQixPQUFPeGMsTUFBTSxDQUFDO0lBRTlCLElBQUlxWSxPQUFPaUYsV0FBV3BDLE1BQU1zQjtJQUM1QkUsT0FBT3hCLElBQUksQ0FBQ3NCLE9BQU94YyxNQUFNLENBQUM7SUFDMUIsSUFBSTBjLFNBQVMsTUFDVCxPQUFPckU7SUFFWCxJQUFJSyxLQUFLNEUsV0FBV3BDLE1BQU1zQjtJQUMxQjlELEdBQUluVyxRQUFRLENBQUMsRUFBRSxHQUFHOFY7SUFDbEJLLEdBQUc2RSxNQUFNLENBQUNDLEtBQUssR0FBR25GLEtBQUtrRixNQUFNLENBQUNDLEtBQUs7SUFFbkMsSUFBSWpTLFNBQVM7UUFBQ21OO1FBQUk0RSxXQUFXcEMsTUFBTXNCO0tBQVE7SUFFM0NFLE9BQU94QixJQUFJLENBQUNzQixPQUFPeGMsTUFBTSxDQUFDO0lBQzFCLE1BQU8wYyxTQUFTLEtBQU87UUFFbkIsSUFBSWUsTUFBUUgsV0FBV3BDLE1BQU1zQjtRQUM3QixJQUFJdEUsUUFBUW9GLFdBQVdwQyxNQUFNc0I7UUFFN0IsSUFBSWtCLE1BQU9uUyxNQUFNLENBQUNBLE9BQU96TCxNQUFNLEdBQUMsRUFBRTtRQUNsQyxJQUFJdVksT0FBTzlNLE1BQU0sQ0FBQ0EsT0FBT3pMLE1BQU0sR0FBQyxFQUFFO1FBRWxDLDZCQUE2QjtRQUM3QixVQUFVO1FBRVYsUUFBUTtRQUNSNGQsSUFBS25iLFFBQVEsQ0FBQyxFQUFFLEdBQUc4VjtRQUNuQnFGLElBQUtILE1BQU0sQ0FBQ3BkLEdBQUcsR0FBSWtZLEtBQUtrRixNQUFNLENBQUNwZCxHQUFHO1FBRWxDLE9BQU87UUFDUHNkLElBQUtsYixRQUFRLENBQUMsRUFBRSxHQUFHbWI7UUFDbkJELElBQUlGLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHRSxJQUFJSCxNQUFNLENBQUNDLEtBQUs7UUFFbkNqUyxNQUFNLENBQUNBLE9BQU96TCxNQUFNLEdBQUMsRUFBRSxHQUFHMmQ7UUFDMUJsUyxNQUFNLENBQUNBLE9BQU96TCxNQUFNLEdBQUMsRUFBRSxHQUFHb1k7UUFFMUJ3RSxPQUFPeEIsSUFBSSxDQUFDc0IsT0FBT3hjLE1BQU0sQ0FBQztJQUM5QjtJQUVBdUwsTUFBTSxDQUFDLEVBQUUsQ0FBRWhKLFFBQVEsQ0FBQyxFQUFFLEdBQUdnSixNQUFNLENBQUMsRUFBRTtJQUNsQ0EsTUFBTSxDQUFDLEVBQUUsQ0FBRWdTLE1BQU0sQ0FBQ3BkLEdBQUcsR0FBSW9MLE1BQU0sQ0FBQyxFQUFFLENBQUNnUyxNQUFNLENBQUNwZCxHQUFHO0lBRTdDLE9BQU9vTCxNQUFNLENBQUMsRUFBRTtBQUNwQjtBQUVBLFNBQVNvUyxjQUFjekMsSUFBWSxFQUFFc0IsTUFBYztJQUUvQyxNQUFNTSxZQUFZTixPQUFPeGMsTUFBTTtJQUUvQixJQUFJMGMsT0FBT3hCLElBQUksQ0FBQ3NCLE9BQU94YyxNQUFNLEdBQUc7SUFDaEM7O29DQUVnQyxHQUVoQyxPQUFPO1FBQ0g2QyxNQUFVLGVBQWU2WjtRQUN6QmxZLE9BQVU7UUFDVmpDLFVBQVU7WUFBQ1A7WUFBV0E7U0FBVTtRQUNoQ2UsYUFBYTtRQUVia2EsTUFBTVYsMkRBQVksQ0FBQyxlQUFlRyxLQUFLLENBQUM3ZCxNQUFNO0lBQ2xEO0FBQ0o7QUFFQSxTQUFTeWUsV0FBV3BDLElBQVksRUFBRXNCLE1BQWM7SUFFNUMsb0JBQW9CO0lBQ3BCLElBQUlFLE9BQU94QixJQUFJLENBQUNzQixPQUFPeGMsTUFBTSxDQUFDO0lBQzlCLE1BQU8wYyxTQUFTLE9BQU9BLFNBQVMsS0FDNUJBLE9BQVF4QixJQUFJLENBQUMsRUFBRXNCLE9BQU94YyxNQUFNLENBQUM7SUFFakMsY0FBYztJQUNkLElBQUkwYyxTQUFTMWEsV0FDVCxPQUFPO0lBRVgsTUFBTXdiLFFBQVE7UUFDVnZYLE1BQU11VyxPQUFPdlcsSUFBSTtRQUNqQkMsS0FBTXNXLE9BQU94YyxNQUFNLEdBQUd3YyxPQUFPQyxXQUFXO0lBQzVDO0lBRUEsSUFBSW5hLE9BQU87SUFDWCxJQUFJb2EsU0FBUyxLQUNUcGEsT0FBTythLFlBQVluQyxNQUFNc0I7U0FDeEIsSUFBSUUsUUFBUSxPQUFPQSxRQUFRLE9BQU9BLFFBQVEsT0FBT0EsUUFBUSxPQUFPQSxRQUFRLEtBQ3pFcGEsT0FBT3VhLFlBQVkzQixNQUFNc0I7U0FDeEIsSUFBSUUsUUFBUSxPQUFPQSxRQUFRLEtBQzVCcGEsT0FBTzZhLFlBQVlqQyxNQUFNc0I7U0FFekJsYSxPQUFPcWIsY0FBY3pDLE1BQU1zQjtJQUMzQiw2SEFBNkg7SUFFaklsYSxLQUFLaWIsTUFBTSxHQUFHO1FBQ1ZDO1FBQ0FyZCxLQUFLO1lBQ0Q4RixNQUFNdVcsT0FBT3ZXLElBQUk7WUFDakJDLEtBQU1zVyxPQUFPeGMsTUFBTSxHQUFHd2MsT0FBT0MsV0FBVztRQUM1QztJQUNKO0lBRUEsb0RBQW9EO0lBQ3BELHlCQUF5QjtJQUV6QixPQUFPbmE7QUFFWDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZOb0Q7QUFDWDtBQUV2QjtBQUVsQixXQUFXO0FBR0osTUFBTXViO0lBRVQsQ0FBQ0MsY0FBYyxHQUF3QixDQUFDLEVBQUU7SUFDMUMsQ0FBQ0MsUUFBUSxHQUF3QztRQUM3Q0MsU0FBU0M7SUFDYixFQUFFO0lBRUYsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUV6QixtQ0FBbUM7SUFDbkNDLFlBQVl2ZSxNQUFjLEVBQUV5QyxHQUFRLEVBQUU7UUFDbEMsSUFBR0EsSUFBSXRCLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQ2dkLGNBQWMsRUFDbkMsTUFBTSxJQUFJbGEsTUFBTSxDQUFDLElBQUksRUFBRXhCLElBQUl0QixRQUFRLENBQUMsb0JBQW9CLENBQUM7UUFFN0QsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxDQUFDZ2QsY0FBYyxDQUFDMWIsSUFBSXRCLFFBQVEsQ0FBQyxHQUFHc0I7UUFFckMsc0JBQXNCO1FBQ3RCLE9BQU8sSUFBSStiLFNBQVMsZ0JBQWdCLENBQUMsRUFBRXhlLE9BQU8sc0JBQXNCLENBQUM7SUFDekU7SUFFQXllLFVBQVV6ZSxNQUFjLEVBQUV5QyxHQUFRLEVBQUU7UUFDaEMsSUFBSSxDQUFDLENBQUMyYixRQUFRLENBQUMzYixJQUFJdEIsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDb2QsV0FBVyxDQUFDdmUsUUFBUXlDLEtBQUssSUFBSTtJQUNyRTtJQUVBaWMsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLENBQUNOLFFBQVE7SUFDekI7SUFDQU8sVUFBVTVhLElBQVksRUFBRTtRQUNwQixPQUFPLElBQUksQ0FBQyxDQUFDcWEsUUFBUSxDQUFDcmEsS0FBSztJQUMvQjtJQUVBNEMsVUFBVXhGLFFBQWdCLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUMsQ0FBQ2dkLGNBQWMsQ0FBQ2hkLFNBQVMsRUFBRSxrQkFBa0I7SUFDN0Q7SUFFQSxJQUFJb0gsTUFBTTtRQUNOLE9BQU9BLDJEQUFHQTtJQUNkO0lBQ0EsSUFBSUgsTUFBTTtRQUNOLE9BQU9BLG9EQUFHQTtJQUNkO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ25ETyxNQUFNdEk7SUFFWixPQUFPc2IsbUJBQW1CLEVBQUU7SUFFNUI5WSxHQUFvQjtJQUNwQkMsUUFBb0I7SUFDcEJhLGNBQXNCLEVBQUU7SUFFeEIsVUFBVTtJQUNWUixXQUFzQixFQUFFLENBQUM7SUFFekJ5QixZQUFZOUIsT0FBZSxFQUFFYSxjQUFzQixDQUFDLEVBQUVSLFdBQXNCLEVBQUUsQ0FBRTtRQUUvRSxJQUFJLENBQUNOLEVBQUUsR0FBR3hDLFFBQVFzYixnQkFBZ0I7UUFDbEMsSUFBSSxDQUFDN1ksT0FBTyxHQUFHQTtRQUNmLElBQUksQ0FBQ2EsV0FBVyxHQUFHQTtRQUVuQixJQUFJLENBQUNSLFFBQVEsR0FBR0E7SUFDakI7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckIyQjtBQUNTO0FBRTBCO0FBQ1o7QUFDckI7QUFDdUI7QUFHN0MsTUFBTW9XLGVBQWU7SUFDeEIsUUFBUTtJQUNSLE9BQVE7SUFFUixPQUFRO0lBRVIsUUFBWTtJQUNaLE9BQVk7SUFDWixZQUFZO0lBQ1osT0FBWTtJQUVaLE9BQVk7SUFDWixPQUFZO0lBRVosTUFBWTtJQUNaLFNBQVk7SUFDWixNQUFZO0lBQ1osU0FBWTtJQUVaLE1BQVk7SUFDWixPQUFZO0lBQ1osTUFBWTtJQUNaLE9BQVk7SUFFWixVQUFZO0lBRVosU0FBWTtJQUNaLFVBQVk7SUFDWixVQUFZO0lBQ1osVUFBWTtJQUNaLFVBQVk7QUFDaEIsRUFBQztBQUVNLE1BQU02RixrQkFBa0I7SUFDM0IsV0FBZ0I7SUFDaEIsV0FBZ0I7SUFDaEIsZUFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQWdCO0lBRWhCLFdBQWU7SUFDZixXQUFlO0lBRWYsVUFBZTtJQUNmLFVBQWU7SUFFZixVQUFlO0lBQ2YsVUFBZTtJQUNmLFVBQWU7SUFDZixVQUFlO0lBRWYsV0FBZTtJQUNmLFVBQWU7SUFDZixXQUFlO0lBQ2YsV0FBZTtJQUNmLGNBQWU7SUFDZixjQUFlO0FBQ25CLEVBQUM7QUFFTSxNQUFNaEcsa0JBQWtCO0lBQzNCLFdBQWdCO0lBQ2hCLFdBQWdCO0lBQ2hCLGVBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixXQUFnQjtJQUVoQixXQUFlO0lBQ2YsV0FBZTtJQUVmLFVBQWU7SUFDZixXQUFlO0lBQ2YsV0FBZTtJQUNmLGNBQWU7SUFDZixjQUFlO0FBQ25CLEVBQUM7QUFHTSxNQUFNaUcsWUFBWTtJQUNyQixNQUFNO0lBQ04sS0FBTTtJQUNOLEtBQU07SUFDTixNQUFNO0lBQ04sS0FBTTtJQUVOLEtBQU87SUFDUCxLQUFPO0lBQ1AsT0FBTztJQUVQLE1BQU87SUFDUCxNQUFPO0lBQ1AsS0FBTztJQUNQLE1BQU87SUFDUCxNQUFPO0lBQ1AsS0FBTztJQUVQLEtBQU07SUFDTixLQUFNO0lBQ04sS0FBTTtJQUNOLEtBQU07SUFDTixNQUFNO0lBQ04sTUFBTTtBQUNWLEVBQUU7QUFFRix3QkFBd0I7QUFFeEIsd0dBQXdHO0FBQ2pHLE1BQU1DLGNBQWM7SUFDdkI7UUFBQztRQUFLO1FBQU07UUFBTTtRQUFLO0tBQU07SUFDN0I7UUFBQztLQUFLO0lBQ047UUFBQztRQUFLO1FBQUs7S0FBSTtJQUNmO1FBQUM7UUFBSztLQUFJO0lBQ1Y7UUFBQztRQUFNO1FBQU07S0FBTTtJQUNuQjtRQUFDO1FBQUs7UUFBTTtRQUFNO0tBQUk7SUFDdEI7UUFBQztRQUFNO1FBQU07UUFBTztLQUFNO0lBQzFCO1FBQUM7S0FBSTtJQUNMO1FBQUM7S0FBSTtJQUNMO1FBQUM7S0FBSTtJQUNMO1FBQUM7S0FBSztJQUNOO1FBQUM7UUFBTTtLQUFLO0lBQ1o7UUFBQztLQUFJLENBQTJCLGtCQUFrQjtDQUVyRCxDQUFDO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2R0EsR0FFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUNBLEdBR08sU0FBUzVJLFdBQVdzQixDQUFVLEVBQUVqVCxTQUFTb1IsZ0RBQVc7SUFFdkQsSUFBSTZCLEVBQUVyVSxXQUFXLEtBQUt1RixnREFBV0EsRUFDN0IsT0FBTzhPO0lBRVgsSUFBSUEsRUFBRWxWLE9BQU8sS0FBS2tTLDREQUFZQSxFQUFFO1FBQzVCLDJDQUEyQztRQUMzQyxJQUFJalEsV0FBV29SLGdEQUFXQSxFQUN0QjZCLEVBQUVyVSxXQUFXLEdBQUd1RixnREFBV0E7UUFDL0IsT0FBTzhPO0lBQ1g7SUFFQSxNQUFNdUgsVUFBVXZiLHVDQUFNLENBQUNnVSxFQUFFblYsRUFBRSxDQUFDO0lBRTVCLElBQUkwYyxZQUFZLGFBQWFBLFlBQVksWUFBYTtRQUNsRCxNQUFNakYsUUFBUXRDLEVBQUU3VSxRQUFRLENBQUMsRUFBRSxDQUFDUSxXQUFXO1FBQ3ZDLE1BQU0wVyxRQUFRckMsRUFBRTdVLFFBQVEsQ0FBQyxFQUFFLENBQUNRLFdBQVc7UUFDdkMsSUFBTyxDQUFDMlcsVUFBVW5WLDhDQUFTQSxJQUFJbVYsVUFBVXBSLGdEQUFVLEtBQzNDbVIsQ0FBQUEsVUFBVWxWLDhDQUFTQSxJQUFJa1YsVUFBVW5SLGdEQUFVLEdBQ2pEO1lBQ0U4TyxFQUFFclUsV0FBVyxHQUFHb0I7WUFDaEIsT0FBT2lUO1FBQ1g7SUFDSjtJQUNBLElBQUl1SCxZQUFZLGFBQWF2SCxFQUFFN1UsUUFBUSxDQUFDLEVBQUUsQ0FBQ1EsV0FBVyxLQUFLd0IsOENBQVNBLEVBQUU7UUFDbEU2UyxFQUFFclUsV0FBVyxHQUFHb0I7UUFDaEIsT0FBT2lUO0lBQ1g7SUFDQSxJQUFJalQsV0FBV29SLGdEQUFXQSxFQUN0QixPQUFPalUseUNBQUMsQ0FBQyxPQUFPLEVBQUU4VixFQUFFLENBQUMsQ0FBQztJQUUxQixzQ0FBc0M7SUFDdEMsT0FBT0E7QUFDWDtBQUVPLFNBQVNoVCxXQUFXZ1QsQ0FBVTtJQUVqQyxJQUFJQSxFQUFFclUsV0FBVyxLQUFLd0IsOENBQVNBLEVBQzNCLE9BQU82UztJQUVYLElBQUlBLEVBQUVsVixPQUFPLEtBQUtrUyw0REFBWUEsRUFBRTtRQUM1QmdELEVBQUVyVSxXQUFXLEdBQUd3Qiw4Q0FBU0EsRUFBRSwwQkFBMEI7UUFDckQsT0FBTzZTO0lBQ1g7SUFDQSxJQUFJaFUsdUNBQU0sQ0FBQ2dVLEVBQUVuVixFQUFFLENBQUMsS0FBSyxhQUFhbVYsRUFBRTdVLFFBQVEsQ0FBQyxFQUFFLENBQUNRLFdBQVcsS0FBS3VGLGdEQUFXQSxFQUFFO1FBQ3pFOE8sRUFBRXJVLFdBQVcsR0FBR3dCLDhDQUFTQTtRQUN6QixPQUFPNlM7SUFDWDtJQUVBLE9BQU85Vix5Q0FBQyxDQUFDLE9BQU8sRUFBRThWLEVBQUUsQ0FBQyxDQUFDO0FBQzFCO0FBRUEsSUFBSXdILHNCQUE4QyxDQUFDO0FBQ25ELElBQUksSUFBSWhkLElBQUksR0FBR0EsSUFBSThjLFlBQVk1ZSxNQUFNLEVBQUUsRUFBRThCLEVBQUc7SUFFeEMsTUFBTWlkLFdBQVdILFlBQVk1ZSxNQUFNLEdBQUc4QjtJQUN0QyxLQUFJLElBQUk4VyxNQUFNZ0csV0FBVyxDQUFDOWMsRUFBRSxDQUN4QmdkLG1CQUFtQixDQUFDbEcsR0FBRyxHQUFHbUc7QUFFbEM7QUFFTyxTQUFTaEcsa0JBQTBESCxFQUFLO0lBQzNFLE9BQU84RixlQUFlLENBQUM5RixHQUFHO0FBQzlCO0FBRUEsTUFBTW9HLE9BQVE7QUFDZCxNQUFNQyxRQUFRO0FBRVAsU0FBUzFGLFdBQVcvVyxJQUFhLEVBQUVvVyxFQUFVLEVBQUUsR0FBR25OLE1BQWlCO0lBRXRFLE1BQU15VCxRQUFRelQsTUFBTSxDQUFDLEVBQUU7SUFDdkIsSUFBR3lULGlCQUFpQnZmLDZDQUFPQSxFQUFFO1FBQ3hCdWYsTUFBY0MsU0FBUyxHQUFHdkc7UUFDMUJzRyxNQUFjRSxhQUFhLEdBQUdKO0lBQ25DO0lBRUEsSUFBSSxJQUFJbGQsSUFBSSxHQUFHQSxJQUFJMkosT0FBT3pMLE1BQU0sR0FBQyxHQUFHLEVBQUU4QixFQUFHO1FBQ3JDLE1BQU00QyxRQUFRK0csTUFBTSxDQUFDM0osRUFBRTtRQUN2QixJQUFHNEMsaUJBQWlCL0UsNkNBQU9BLEVBQUU7WUFDeEIrRSxNQUFjeWEsU0FBUyxHQUFHdkc7WUFDMUJsVSxNQUFjMGEsYUFBYSxHQUFHSixPQUFLQztRQUN4QztJQUNKO0lBRUEsTUFBTTlWLE9BQU9zQyxNQUFNLENBQUNBLE9BQU96TCxNQUFNLEdBQUMsRUFBRTtJQUNwQyxJQUFHbUosZ0JBQWdCeEosNkNBQU9BLEVBQUU7UUFDdkJ3SixLQUFhZ1csU0FBUyxHQUFHdkc7UUFDekJ6UCxLQUFhaVcsYUFBYSxHQUFHSDtJQUNsQztJQUVBLElBQUk5RixTQUFTM1gseUNBQUMsQ0FBQyxFQUFFMGQsTUFBTSxDQUFDO0lBQ3hCLElBQUksSUFBSXBkLElBQUksR0FBR0EsSUFBSTJKLE9BQU96TCxNQUFNLEVBQUUsRUFBRThCLEVBQ2hDcVgsU0FBUzNYLHlDQUFDLENBQUMsRUFBRTJYLE9BQU8sSUFBSSxFQUFFMU4sTUFBTSxDQUFDM0osRUFBRSxDQUFDLENBQUM7SUFFekMsSUFBSSxlQUFlVSxNQUFPO1FBRXRCLElBQUk2YyxZQUFrQixLQUFjRCxhQUFhO1FBQ2pELElBQUlFLGVBQWtCUixtQkFBbUIsQ0FBQ2xHLEdBQUc7UUFDN0MsSUFBSTJHLGtCQUFrQlQsbUJBQW1CLENBQUN0YyxLQUFLMmMsU0FBUyxDQUFRO1FBRWhFLElBQUlJLGtCQUFrQkQsZ0JBQ2RDLG9CQUFvQkQsZ0JBQWlCRCxZQUFZSixPQUVyRDlGLFNBQVMzWCx5Q0FBQyxDQUFDLENBQUMsRUFBRTJYLE9BQU8sQ0FBQyxDQUFDO0lBQy9CO0lBRUEsT0FBT0E7QUFDWDtBQUVBLGdFQUFnRTtBQUNoRSx3QkFBd0I7QUFDakIsU0FBU3BDLFFBQVF2VSxJQUFhLEVBQUU4VSxDQUFVO0lBRTdDLDRCQUE0QjtJQUN2QkEsRUFBVTZILFNBQVMsR0FBTyxLQUFjQSxTQUFTO0lBQ2pEN0gsRUFBVThILGFBQWEsR0FBRyxLQUFjQSxhQUFhO0lBQzFELEdBQUc7SUFFSCxPQUFPNWQseUNBQUMsQ0FBQyxFQUFFOFYsRUFBRSxDQUFDO0FBQ2xCO0FBRU8sU0FBUy9PLFlBQVkvRixJQUFhLEVBQUU4VSxDQUFjLEVBQUVzQixFQUFVLEVBQUVyQixDQUFjLEVBQUVpSSxpQkFBaUIsSUFBSTtJQUV4RyxJQUFHbEksYUFBYTNYLDZDQUFPQSxFQUFFO1FBQ3BCMlgsRUFBVTZILFNBQVMsR0FBR3ZHO1FBQ3RCdEIsRUFBVThILGFBQWEsR0FBR0o7SUFDL0I7SUFFQSxJQUFHekgsYUFBYTVYLDZDQUFPQSxFQUFFO1FBQ3BCNFgsRUFBVTRILFNBQVMsR0FBR3ZHO1FBQ3RCckIsRUFBVTZILGFBQWEsR0FBR0g7SUFDL0I7SUFFQSxJQUFJOUYsU0FBUzNYLHlDQUFDLENBQUMsRUFBRThWLEVBQUUsRUFBRXNCLEdBQUcsRUFBRXJCLEVBQUUsQ0FBQztJQUU3QixJQUFJaUksa0JBQWtCLGVBQWVoZCxNQUFPO1FBRXhDLElBQUk2YyxZQUFrQixLQUFjRCxhQUFhO1FBQ2pELElBQUlFLGVBQWtCUixtQkFBbUIsQ0FBQ2xHLEdBQUc7UUFDN0MsSUFBSTJHLGtCQUFrQlQsbUJBQW1CLENBQUN0YyxLQUFLMmMsU0FBUyxDQUFRO1FBRWhFLElBQUlJLGtCQUFrQkQsZ0JBQ2RDLG9CQUFvQkQsZ0JBQWlCRCxZQUFZSixPQUVyRDlGLFNBQVMzWCx5Q0FBQyxDQUFDLENBQUMsRUFBRTJYLE9BQU8sQ0FBQyxDQUFDO0lBQy9CO0lBRUEsT0FBT0E7QUFDWDtBQUdPLFNBQVNuQyxXQUFXeFUsSUFBYSxFQUFFb1csRUFBVSxFQUFFdEIsQ0FBYyxFQUFFa0ksaUJBQWlCLElBQUk7SUFFdkYsSUFBSXJHLFNBQVMzWCx5Q0FBQyxDQUFDLEVBQUVvWCxHQUFHLEVBQUV0QixFQUFFLENBQUM7SUFFekIsSUFBR3NCLE9BQU8sS0FDTkEsS0FBSztJQUVULElBQUd0QixhQUFhM1gsNkNBQU9BLEVBQUU7UUFDcEIyWCxFQUFVNkgsU0FBUyxHQUFHdkc7UUFDdEJ0QixFQUFVOEgsYUFBYSxHQUFHSDtJQUMvQjtJQUdBLElBQUlPLGtCQUFrQixlQUFlaGQsTUFBTztRQUV4QyxJQUFJNmMsWUFBa0IsS0FBY0QsYUFBYTtRQUNqRCxJQUFJRSxlQUFrQlIsbUJBQW1CLENBQUNsRyxHQUFHO1FBQzdDLElBQUkyRyxrQkFBa0JULG1CQUFtQixDQUFDdGMsS0FBSzJjLFNBQVMsQ0FBUTtRQUVoRSxJQUFJLFlBQWFILFFBQVNPLGtCQUFrQkQsY0FDeENuRyxTQUFTM1gseUNBQUMsQ0FBQyxDQUFDLEVBQUUyWCxPQUFPLENBQUMsQ0FBQztJQUMvQjtJQUVBLE9BQU9BO0FBQ1g7QUFVTyxTQUFTcEQsWUFBWStELEdBQXVDLEVBQ3ZDMVcsV0FBNEIsRUFDNUIsRUFDSW9VLGVBQWVpSCxrREFBUyxFQUN4QnJTLGVBQWUsRUFDQSxHQUFHLENBQUMsQ0FBQztJQUdoRCxJQUFJK00sU0FBdUMsQ0FBQztJQUU1QyxLQUFJLElBQUlQLE1BQU1rQixJQUFLO1FBRWYsTUFBTTJGLE9BQU9kLFNBQVMsQ0FBQy9GLEdBQUc7UUFDMUIsSUFBSUEsT0FBTyxPQUNQQSxLQUFLO1FBRVR4TSxvQkFBb0IsQ0FBQzVKLE1BQWVxVTtZQUNoQyxPQUFPRyxXQUFXeFUsTUFBTW9XLElBQUlwQixhQUFhWDtRQUM3QztRQUVBc0MsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFc0csS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHO1lBQ3BCcmM7WUFDQWdKO1FBQ0o7SUFDSjtJQUVBLE9BQU8rTTtBQUNYO0FBUU8sU0FBU3JELGFBQWFnRSxHQUErQixFQUNoQzFXLFdBQTRCLEVBQy9CLEVBQ0d3VCxnQkFBa0I2SCxrREFBUyxFQUMzQmpILGVBQWtCaUgsa0RBQVMsRUFDM0JyUyxlQUFlLEVBQ0UsR0FBRyxDQUFDLENBQUM7SUFFOUMsSUFBSStNLFNBQXVDLENBQUM7SUFFNUMsS0FBSSxJQUFJUCxNQUFNa0IsSUFBSztRQUVmLE1BQU0yRixPQUFPZCxTQUFTLENBQUMvRixHQUFHO1FBQzFCLElBQUlBLE9BQU8sTUFDUEEsS0FBSztRQUVULElBQUk4RyxLQUFNLENBQUNsZCxNQUFlcVUsTUFBZVA7WUFDckMsT0FBTy9OLFlBQVkvRixNQUFNZ1YsYUFBYVgsT0FBTytCLElBQUloQyxjQUFjTjtRQUNuRTtRQUVBLElBQUlxSixNQUFNLENBQUNuZCxNQUFlcVUsTUFBZVA7WUFDckMsT0FBTy9OLFlBQVkvRixNQUFNb1UsY0FBY04sUUFBUXNDLElBQUlwQixhQUFhWDtRQUNwRTtRQUVBLElBQUl6SyxvQkFBb0JsSyxXQUFZO1lBRWhDd2QsS0FBTSxDQUFDbGQsTUFBZXFVLE1BQWUrSTtnQkFDakMsT0FBT3hULGdCQUFnQjVKLE1BQU1nVixhQUFhWCxPQUFPRCxjQUFjZ0o7WUFDbkU7WUFFQSxzQkFBc0I7WUFDdEJELE1BQU0sQ0FBQ25kLE1BQWVxVSxNQUFlK0k7Z0JBQ2pDLE9BQU94VCxnQkFBZ0I1SixNQUFNb1UsY0FBY2dKLElBQUlwSSxhQUFhWDtZQUNoRTtRQUNKO1FBRUFzQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUVzRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDcEJyYztZQUNBZ0osaUJBQWlCc1Q7UUFDckI7UUFDQXZHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRXNHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNyQnJjO1lBQ0FnSixpQkFBaUJ1VDtRQUNyQjtRQUNBLElBQUluSSxpQkFBaUJpSCxrREFBU0EsSUFBSXJTLG9CQUFvQmxLLFdBQ2xEaVgsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFc0csS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHO1lBQ3JCcmM7WUFDQWdKLGlCQUFpQixDQUFDNUosTUFBZXFVLE1BQWVQO2dCQUU1QyxNQUFNRSxjQUFjbFQsdUNBQU0sQ0FBQ2dULE1BQU1uVSxFQUFFLENBQUM7Z0JBRXBDLElBQUl5VyxPQUFPLE9BQU9wQyxnQkFBZ0IsR0FDOUIsT0FBT1EsV0FBV3hVLE1BQU0sTUFBTXFVO2dCQUNsQyxJQUFJK0IsT0FBTyxPQUFPcEMsZ0JBQWdCLEdBQzlCLE9BQU9RLFdBQVd4VSxNQUFNLE1BQU1xVTtnQkFFbEMsT0FBT3RPLFlBQVkvRixNQUFNcVUsTUFBTStCLEtBQUcsS0FBS2hDLGNBQWNOO1lBQ3pEO1FBQ0o7SUFDUjtJQUVBLE9BQU82QztBQUNYO0FBRU8sTUFBTTlELGNBQWM7SUFBQztJQUFNO0lBQU07SUFBSztJQUFLO0lBQU07Q0FBSyxDQUFVO0FBRXZFLE1BQU13SyxVQUFVO0lBQ1osTUFBTTtJQUNOLE1BQU07SUFDTixLQUFLO0lBQ0wsS0FBSztJQUNMLE1BQU07SUFDTixNQUFNO0FBQ1Y7QUFFTyxTQUFTdkssVUFBWXdFLEdBQThDLEVBQzlDMVcsV0FBNEIsRUFDNUIsRUFDSXdULGdCQUFrQjZILGtEQUFTLEVBQzNCakgsZUFBa0JpSCxrREFBUyxFQUMzQnJTLGVBQWUsRUFDRSxHQUFHLENBQUMsQ0FBQztJQUVsRCxJQUFJK00sU0FBdUMsQ0FBQztJQUU1QyxLQUFJLElBQUlQLE1BQU1rQixJQUFLO1FBRWYsTUFBTTJGLE9BQU9kLFNBQVMsQ0FBQy9GLEdBQUc7UUFFMUIsSUFBSThHLEtBQU0sQ0FBQ2xkLE1BQWVxVSxNQUFlUCxPQUFnQm9EO1lBRXJELElBQUlvRyxNQUFNbEg7WUFFVixJQUFJdEIsSUFBSUUsYUFBYVg7WUFDckIsSUFBSVUsSUFBSVgsY0FBY047WUFDdEIsSUFBSW9ELFVBQVc7Z0JBQ1gsQ0FBQ3BDLEdBQUVDLEVBQUUsR0FBRztvQkFBQ0E7b0JBQUVEO2lCQUFFO2dCQUNid0ksTUFBTUQsT0FBTyxDQUFDQyxJQUFJO1lBQ3RCO1lBRUEsSUFBSUEsR0FBRyxDQUFDLEVBQUUsS0FBSyxPQUFPQSxHQUFHLENBQUMsRUFBRSxLQUFLLEtBQU07Z0JBQ25DLElBQUlqSixLQUFLNVQsV0FBVyxLQUFLcVQsTUFBTXJULFdBQVcsRUFDdEM2YyxNQUFNQSxNQUFNO1lBQ3BCO1lBRUEsT0FBT3ZYLFlBQVkvRixNQUFNOFUsR0FBR3dJLEtBQUt2STtRQUNyQztRQUVBLElBQUluTCxvQkFBb0JsSyxXQUFZO1lBRWhDd2QsS0FBTSxDQUFDbGQsTUFBZXFVLE1BQWUrSSxHQUFZbEc7Z0JBQzdDLE9BQU90TixnQkFBZ0I1SixNQUFNZ1YsYUFBYVgsT0FBT0QsY0FBY2dKLEtBQU0sU0FBUztZQUNsRjtRQUNKO1FBRUF6RyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUVzRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDcEJyYztZQUNBZ0osaUJBQWlCc1Q7UUFDckI7SUFDSjtJQUVBLE9BQU92RztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2puQjJEO0FBQ0k7QUFNeEQsTUFBTXNGLFlBQVksQ0FBQ2pjLE9BQWtCQSxLQUFLO0FBRTFDLE1BQU15VCxvQkFBb0IsQ0FBQ3pUO0lBRTlCLElBQUlBLEtBQUtTLFdBQVcsS0FBS3dCLDhDQUFTQSxFQUM5QixPQUFPdVIsNERBQVVBLENBQUN4VCxNQUFNaVQsZ0RBQVdBO0lBRXZDLE9BQU9qVCxNQUFNLHNCQUFzQjtBQUN2QyxFQUFDO0FBRU0sTUFBTXlVLGVBQWUsQ0FBQ3pVO0lBQ3pCLHNDQUFzQztJQUN0QyxrQkFBa0I7SUFFbEIsT0FBTzhCLDREQUFVQSxDQUFDOUI7QUFDdEIsRUFBQztBQUVNLFNBQVN1ZCxnQkFBZ0JuZCxPQUFpQjtJQUU3QyxNQUFNb2QsUUFBUSxJQUFJaGU7SUFDbEIsSUFBSSxJQUFJRixJQUFJLEdBQUdBLElBQUljLFFBQVE1QyxNQUFNLEVBQUU4QixLQUFHLEVBQ2xDa2UsS0FBSyxDQUFDcGQsT0FBTyxDQUFDZCxFQUFFLENBQUMsR0FBR2MsT0FBTyxDQUFDZCxJQUFFLEVBQUU7SUFFcEMsT0FBTyxDQUFDVTtRQUNKLE1BQU15ZCxNQUFTemQsS0FBS1MsV0FBVztRQUMvQixNQUFNb0IsU0FBUzJiLEtBQUssQ0FBQ0MsSUFBSTtRQUN6QixJQUFJNWIsV0FBV25DLFdBQ1gsT0FBT007UUFFWCxnQkFBZ0I7UUFDaEIsSUFBSXlkLFFBQVF4Yiw4Q0FBU0EsRUFDakIsT0FBT3VSLDREQUFVQSxDQUFDeFQsTUFBTTZCO1FBQzVCLElBQUlBLFdBQVdJLDhDQUFTQSxFQUNwQixPQUFPSCw0REFBVUEsQ0FBQzlCO1FBRXRCLE1BQU0sSUFBSXNCLE1BQU07SUFDcEI7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlDNkc7QUFJdEcsU0FBU3lSLGNBQWNxSyxDQUFTO0lBQ25DLElBQUluYiw4Q0FBU0EsSUFBSW1iLEtBQUtBLEtBQUtuSyxnREFBV0EsRUFDbEMsT0FBT0wsK0NBQVVBO0lBQ3JCLE9BQU91RCwwREFBcUJBO0FBQ2hDO0FBRU8sU0FBU3pDLGVBQWUwSixDQUFTO0lBQ3BDLElBQUluYiw4Q0FBU0EsSUFBSW1iLEtBQUtBLEtBQUtuSyxnREFBV0EsRUFDbEMsT0FBT0EsZ0RBQVdBO0lBQ3RCLE9BQU9rRCwwREFBcUJBO0FBQ2hDO0FBRU8sU0FBU2pCLGdCQUFnQmtJLENBQVM7SUFDckMsSUFBSUEsTUFBTXBYLGdEQUFXQSxFQUNqQixPQUFPQSxnREFBV0E7SUFDdEIsT0FBT21RLDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTekIsV0FBVzBJLENBQVM7SUFDaEMsSUFBSUEsTUFBTW5iLDhDQUFTQSxJQUFJbWIsTUFBTXBYLGdEQUFXQSxFQUNwQyxPQUFPL0QsOENBQVNBO0lBQ3BCLE9BQU9rVSwwREFBcUJBO0FBQ2hDO0FBQ08sU0FBU3ZCLFlBQVl3SSxDQUFTO0lBQ2pDLElBQUlBLE1BQU1uYiw4Q0FBU0EsRUFDZixPQUFPQSw4Q0FBU0E7SUFDcEIsT0FBT2tVLDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTZixhQUFhZ0ksQ0FBUztJQUNsQyxJQUFJQSxNQUFNcEssOENBQVNBLEVBQ2YsT0FBT0osK0NBQVVBO0lBQ3JCLE9BQU91RCwwREFBcUJBO0FBQ2hDO0FBQ08sU0FBU2QsWUFBWStILENBQVM7SUFDakMsSUFBSUEsTUFBTXBLLDhDQUFTQSxFQUNmLE9BQU9BLDhDQUFTQTtJQUNwQixPQUFPbUQsMERBQXFCQTtBQUNoQztBQUNPLFNBQVNoQixXQUFXaUksQ0FBUztJQUNoQyxJQUFJQSxNQUFNbmIsOENBQVNBLElBQUltYixNQUFNcFgsZ0RBQVdBLEVBQ3BDLE9BQU9nTiw4Q0FBU0E7SUFDcEIsT0FBT21ELDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTeEMsVUFBVXJQLENBQVM7SUFBSSxPQUFPMk8sZ0RBQVdBO0FBQUU7QUFDcEQsU0FBUzBCLFFBQVVyUSxDQUFTO0lBQUksT0FBT3JDLDhDQUFTQTtBQUFJO0FBQ3BELFNBQVNnVCxVQUFVM1EsQ0FBUztJQUFJLE9BQU8wQixnREFBV0E7QUFBRTtBQUNwRCxTQUFTNE4sUUFBVXRQLENBQVM7SUFBSSxPQUFPME8sOENBQVNBO0FBQUk7QUFFM0QsU0FBUztBQUNGLFNBQVMwSyx3QkFFaEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEK0M7QUFDSztBQUNOO0FBQ0U7QUFDRDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnZDLE1BQU01VCxTQUFVLElBQUl0SyxRQUFrQjtBQUM3QyxNQUFNbWUsZUFBdUMsQ0FBQztBQUV2QyxTQUFTQyxpQkFBcUN4YyxJQUFZO0lBQzdELE9BQU8wSSxNQUFNLENBQUM1SSxXQUFXRSxNQUFNO0FBQ25DO0FBRU8sU0FBU0YsV0FBV0UsSUFBWTtJQUVuQyxJQUFJekIsS0FBS2dlLFlBQVksQ0FBQ3ZjLEtBQUs7SUFDM0IsSUFBSXpCLE9BQU9ELFdBQVk7UUFDbkJDLEtBQUtnZSxZQUFZLENBQUN2YyxLQUFLLEdBQUcwSSxPQUFPdE0sTUFBTTtRQUN2Q3NNLE1BQU0sQ0FBQ25LLEdBQUcsR0FBRztZQUFDOEssVUFBVXJKO1FBQUk7SUFDaEM7SUFFQSxPQUFPekI7QUFDWDtBQUVPLFNBQVNnVCxTQUFTdlIsSUFBWSxFQUFFYixJQUFnQztJQUVuRSxNQUFNWixLQUFLdUIsV0FBV0U7SUFDdEI0SCxPQUFPc0osTUFBTSxDQUFFeEksTUFBTSxDQUFDbkssR0FBRyxFQUFFWTtJQUMzQixPQUFPWjtBQUNYO0FBRU8sTUFBTTRTLGlCQUEyQnJSLFdBQVcsWUFBWSxDQUFDLE9BQU87QUFDaEUsTUFBTWUsWUFBMkJmLFdBQVcsT0FBTztBQUNuRCxNQUFNOEUsY0FBMkI5RSxXQUFXLFNBQVM7QUFDckQsTUFBTTBSLGFBQTJCMVIsV0FBVyxRQUFRO0FBQ3BELE1BQU0rUixjQUEyQi9SLFdBQVcsU0FBUztBQUNyRCxNQUFNOFIsWUFBMkI5UixXQUFXLE9BQU87QUFDbkQsTUFBTWlWLHdCQUEyQmpWLFdBQVcsc0JBQXNCOzs7Ozs7O1NDakN6RTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNQO0FBRTdDLCtCQUErQjtBQUNDO0FBRTREIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9ib2R5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvYm9keS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3JfcmFuZ2UvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yX3JhbmdlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdGVybmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2FyZ3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvYXJncy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9icmVhay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2NvbnRpbnVlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPV9pbml0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz1faW5pdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9saXN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL29iamVjdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9kb3AudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQ29udmVydGVycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1JldHVyblR5cGVGY3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVCdWlsdGluLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUMkpTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQVJSQVlfVFlQRSwgQ09ERV9CRUcsIENPREVfQkVHX0NPTCwgQ09ERV9CRUdfTElORSwgQ09ERV9DT0wsIENPREVfRU5ELCBDT0RFX0VORF9DT0wsIENPREVfRU5EX0xJTkUsIENPREVfTElORSwgSlNfQ09ERSwgUFlfQ09ERSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBjb25zdCBDVVJTT1IgPSBuZXcgQVJSQVlfVFlQRSgyKTtcblxuZXhwb3J0IGxldCBqc2NvZGU6IHN0cmluZztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9qc19jdXJzb3IoaWR4OiBudW1iZXIpIHtcbiAgICBKU19DT0RFW2lkeCArIENPREVfTElORV0gPSBDVVJTT1JbQ09ERV9MSU5FXTtcbiAgICBKU19DT0RFW2lkeCArIENPREVfQ09MIF0gPSBqc2NvZGUhLmxlbmd0aCAtIENVUlNPUltDT0RFX0NPTF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfcHlfY29kZV9mcm9tX2xpc3Qob2Zmc2V0OiBudW1iZXIsIGJyeXRob25fbm9kZTogYW55KSB7XG5cbiAgICBjb25zdCBiZWcgPSBicnl0aG9uX25vZGVbMF07XG4gICAgY29uc3QgZW5kID0gYnJ5dGhvbl9ub2RlW2JyeXRob25fbm9kZS5sZW5ndGgtMV07XG5cbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0JFR19MSU5FIF0gPSBiZWcubGluZW5vO1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfQkVHX0NPTCAgXSA9IGJlZy5jb2xfb2Zmc2V0O1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfRU5EX0xJTkUgXSA9IGVuZC5lbmRfbGluZW5vO1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfRU5EX0NPTCAgXSA9IGVuZC5lbmRfY29sX29mZnNldDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X3B5X2Zyb21fYmVnKCBzcmNfb2Zmc2V0OiBudW1iZXIsIGRzdF9vZmZzZXQ6IG51bWJlciApIHtcblxuICAgIFBZX0NPREVbIHNyY19vZmZzZXQgKyBDT0RFX0JFR19MSU5FIF0gPSBQWV9DT0RFWyBkc3Rfb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdO1xuICAgIFBZX0NPREVbIHNyY19vZmZzZXQgKyBDT0RFX0JFR19DT0wgIF0gPSBQWV9DT0RFWyBkc3Rfb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldF9weV9mcm9tX2VuZCggc3JjX29mZnNldDogbnVtYmVyLCBkc3Rfb2Zmc2V0OiBudW1iZXIgKSB7XG5cbiAgICBQWV9DT0RFWyBzcmNfb2Zmc2V0ICsgQ09ERV9FTkRfTElORSBdID0gUFlfQ09ERVsgZHN0X29mZnNldCArIENPREVfRU5EX0xJTkUgXTtcbiAgICBQWV9DT0RFWyBzcmNfb2Zmc2V0ICsgQ09ERV9FTkRfQ09MICBdID0gUFlfQ09ERVsgZHN0X29mZnNldCArIENPREVfRU5EX0NPTCAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9weV9jb2RlKG9mZnNldDogbnVtYmVyLCBicnl0aG9uX25vZGU6IGFueSkge1xuXG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdID0gYnJ5dGhvbl9ub2RlLmxpbmVubztcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0JFR19DT0wgIF0gPSBicnl0aG9uX25vZGUuY29sX29mZnNldDtcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0VORF9MSU5FIF0gPSBicnl0aG9uX25vZGUuZW5kX2xpbmVubztcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0VORF9DT0wgIF0gPSBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXQ7XG59XG5cbmZ1bmN0aW9uIG5ld19qc2NvZGUoZmlsZW5hbWU6IHN0cmluZykge1xuXG4gICAganNjb2RlICA9IGAvLyMgc291cmNlVVJMPSR7ZmlsZW5hbWV9XFxuYDtcbiAgICBqc2NvZGUgKz0gYGNvbnN0IHtfcl8sIF9iX30gPSBfX1NCUllUSE9OX187XFxuYDtcblxuICAgIENVUlNPUltDT0RFX0xJTkVdID0gMztcbiAgICBDVVJTT1JbQ09ERV9DT0xdID0ganNjb2RlLmxlbmd0aDtcbn1cblxudHlwZSBQcmludGFibGUgPSB7dG9TdHJpbmcoKTogc3RyaW5nfTtcblxubGV0IGluZGVudCA9IFwiICAgIFwiO1xubGV0IGN1cl9pbmRlbnRfbGV2ZWwgPSAwO1xuLy9sZXQgY3VyX2luZGVudCA9IFwiXCI7XG5cbmNvbnN0IGluZGVudHMgPSBbXG4gICAgXCJcIixcbiAgICBcIlwiLFxuICAgIGluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbiAgICBpbmRlbnQrPWluZGVudCxcbl1cblxuZXhwb3J0IGNvbnN0IE5MID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcblxuICAgICAgICArK0NVUlNPUltDT0RFX0xJTkVdO1xuICAgICAgICBDVVJTT1JbQ09ERV9DT0xdID0ganNjb2RlLmxlbmd0aCArIDE7XG5cbiAgICAgICAgcmV0dXJuIFwiXFxuXCIgKyBpbmRlbnRzW2N1cl9pbmRlbnRfbGV2ZWxdO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBCQiA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpbmRlbnRzWysrY3VyX2luZGVudF9sZXZlbF07XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEJFID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGluZGVudHNbLS1jdXJfaW5kZW50X2xldmVsXTtcbiAgICB9XG59XG5cbi8vIHRyYW5zZm9ybXMgaW50byBhIHRlbXBsYXRlIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIHIoLi4uYXJnczogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi4oUHJpbnRhYmxlfEFTVE5vZGUpW11dKSB7XG4gICAgcmV0dXJuIGFyZ3M7XG59XG5cbi8vIHdyaXRlIGEgdGVtcGxhdGUgc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gd3IoYXJnczogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi4oUHJpbnRhYmxlfEFTVE5vZGUpW11dKSB7XG4gICAgaWYoIHR5cGVvZiBhcmdzID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gdyhhcmdzKTtcbiAgICByZXR1cm4gd3QoLi4uYXJncyk7XG59XG5cbi8vIHdyaXRlIHdpdGggdGVtcGxhdGUgc3RyaW5nIHd0YGBcbmV4cG9ydCBmdW5jdGlvbiB3dChzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOiAoUHJpbnRhYmxlfEFTVE5vZGUpW10pIHtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBqc2NvZGUgKz0gc3RyW2ldO1xuICAgICAgICB3KGFyZ3NbaV0pO1xuICAgIH1cblxuICAgIGpzY29kZSArPSBzdHJbYXJncy5sZW5ndGhdO1xufVxuXG4vLyBnZW5lcmljIHdyaXRlID9cbmV4cG9ydCBmdW5jdGlvbiB3KC4uLmFyZ3M6IChQcmludGFibGV8QVNUTm9kZSlbXSkge1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBsZXQgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShhcmcpICkgeyAvLyBsaWtlbHkgYSByYGBcbiAgICAgICAgICAgIHdyKGFyZyBhcyBQYXJhbWV0ZXJzPHR5cGVvZiB3cj5bMF0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggISAoYXJnIGluc3RhbmNlb2YgQVNUTm9kZSkgKSB7XG5cbiAgICAgICAgICAgIGlmKCBhcmcgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgYXJnID0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgICAgIGlmKCBhcmcgPT09IG51bGwgKVxuICAgICAgICAgICAgICAgIGFyZyA9IFwibnVsbFwiO1xuXG4gICAgICAgICAgICBqc2NvZGUgKz0gYXJnLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDQqYXJnLmlkO1xuICAgICAgICBcbiAgICAgICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0JFRyk7XG4gICAgICAgIEFTVDJKU1thcmcudHlwZV9pZCFdKGFyZyk7XG4gICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9FTkQpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBuZXdfanNjb2RlKGFzdC5maWxlbmFtZSk7XG5cbiAgICB3KGFzdC5ib2R5KTtcblxuICAgIC8vIFRPRE86IGJldHRlciBleHBvcnQgc3RyYXRlZ3kgKD8pXG4gICAganNjb2RlICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7fTtcXG5gO1xuXG4gICAgLy9jb25zb2xlLndhcm4oanNjb2RlKTtcblxuICAgIC8qKlxuICAgIGNvbnN0IGxpbmVzID0gYXN0LmJvZHkuY2hpbGRyZW47XG4gICAgY29uc3QgZXhwb3J0ZWQgPSBuZXcgQXJyYXkobGluZXMubGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGxpbmVzW2ldLnR5cGUgPT09IFwiZnVuY3Rpb25zLmRlZlwiKVxuICAgICAgICBleHBvcnRlZFtpXSA9IGxpbmVzW2ldLnZhbHVlO1xuICAgIH1cbiAgICBleHBvcnRlZC5sZW5ndGggPSBvZmZzZXQ7XG5cbiAgICBqc2NvZGUgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuICAgIC8qKi9cblxuXHRyZXR1cm4ganNjb2RlO1xufSIsImltcG9ydCB7IEJCLCBCRSwgTkwsIHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhCQik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgdyhOTCwgbm9kZS5jaGlsZHJlbltpXSk7XG5cbiAgICB3KEJFKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZV9mcm9tX2xpc3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBCT0RZIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxpbmVzID0gbmV3IEFycmF5KG5vZGUubGVuZ3RoKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgKytpKVxuICAgICAgICBsaW5lc1tpXSA9IGNvbnZlcnRfbm9kZShub2RlW2ldLCBjb250ZXh0KTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggbGluZXNbaV0udHlwZSAhPT0gXCJmdW5jdGlvbnMuZGVmXCIpXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBtZXRhID0gKGxpbmVzW2ldLnJlc3VsdF90eXBlISBhcyBTVHlwZUZjdCApLl9fY2FsbF9fO1xuICAgICAgICBpZiggbWV0YS5nZW5lcmF0ZSAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIG1ldGEucmV0dXJuX3R5cGUoKTsgLy8gbWVoLlxuICAgIH1cblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKEJPRFksIDAsIGxpbmVzKTtcblxuICAgIHNldF9weV9jb2RlX2Zyb21fbGlzdCg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQm9keVwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgYmFzZTogc3RyaW5nfEFTVE5vZGUgPSBcIl9yXy5vYmplY3RcIjtcbiAgICBsZXQgYm9keSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGJhc2UgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICBib2R5ID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICB9XG5cbiAgICB3dGBjbGFzcyAke1ZBTFVFU1tub2RlLmlkXX0gZXh0ZW5kcyAke2Jhc2V9IHske2JvZHl9JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENMQVNTX0NMQVNTREVGIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0gZ2V0U1R5cGVJRChub2RlLm5hbWUpO1xuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXVxuICAgICAgICA6IFtjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KV07XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDTEFTU19DTEFTU0RFRiwgMCwgY2hpbGRyZW4pO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLm5hbWU7XG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IGlkeCAgPSBWQUxVRVNbbm9kZS5pZF07XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5bbm9kZS5jaGlsZHJlbi5sZW5ndGgtMV07XG4gICAgY29uc3QgbGlzdCA9IG5vZGUuY2hpbGRyZW5bMF07XG5cbiAgICB3dGBmb3IodmFyICR7aWR4fSBvZiAke2xpc3R9KXske2JvZHl9JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPTlRST0xGTE9XU19GT1IgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldF0gPSAwOyAvL1RPRE9cblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19GT1IsIDAsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuaXRlciwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXSk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IHRhcmdldDtcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgaWR4ICA9IFZBTFVFU1tub2RlLmlkXTtcbiAgICBjb25zdCBib2R5ID0gbm9kZS5jaGlsZHJlbltub2RlLmNoaWxkcmVuLmxlbmd0aC0xXTtcblxuICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZXxhbnkgID0gXCIwblwiO1xuICAgIGxldCBpbmNyOiBzdHJpbmd8QVNUTm9kZXxhbnkgID0gXCIxblwiO1xuICAgIGxldCBlbmQgID0gTnVtYmVyMkludChub2RlLmNoaWxkcmVuWzBdKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgYmVnID0gTnVtYmVyMkludChub2RlLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgZW5kID0gTnVtYmVyMkludChub2RlLmNoaWxkcmVuWzFdKTtcbiAgICB9XG4gICAgaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgaW5jciA9IE51bWJlcjJJbnQobm9kZS5jaGlsZHJlblsyXSk7XG5cbiAgICByZXR1cm4gd3RgZm9yKHZhciAke2lkeH0gPSAke2JlZ307ICR7aWR4fSA8ICR7ZW5kfTsgJHtpZHh9ICs9ICR7aW5jcn0peyR7Ym9keX0ke05MfX1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09OVFJPTEZMT1dTX0ZPUl9SQU5HRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgIT09IFwiQ2FsbFwiIHx8IG5vZGUuaXRlci5mdW5jLmlkICE9PSBcInJhbmdlXCIpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0XSA9IDA7IC8vVE9ET1xuICAgIC8vIFRPRE86IGpzaW50IG9wdGkgaWYgdGhpcy52YWx1ZSBub3QgdXNlZC4uLlxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLnZhbHVlXSA9IFNUWVBFX0lOVDtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19GT1JfUkFOR0UsIDAsIFtcbiAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dClcbiAgICBdKTtcblxuICAgIFZBTFVFU1thc3QuaWRdID0gdGFyZ2V0O1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICAvLyBpZlxuICAgIHd0YGlmKCR7bm9kZS5jaGlsZHJlblswXX0peyR7bm9kZS5jaGlsZHJlblsxXX0ke05MfX1gO1xuXG4gICAgLy8gZWxzZSBpZlxuICAgIGxldCBpO1xuICAgIGZvcihpID0gMjsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSArPSAyKSB7XG4gICAgICAgIHd0YGVsc2UgaWYoJHtub2RlLmNoaWxkcmVuW2ldfSl7JHtub2RlLmNoaWxkcmVuW2krMV19JHtOTH19YDtcbiAgICB9XG5cbiAgICAvLyBlbHNlXG4gICAgaWYoIGkgPT09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMSApXG4gICAgICAgIHd0YGVsc2UgeyR7bm9kZS5jaGlsZHJlbltpXX0ke05MfX1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09OVFJPTEZMT1dTX0lGQkxPQ0sgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8gaWZcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXTtcblxuICAgIC8vIGVsc2UgaWZcbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgJiYgXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkge1xuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUoY3VyLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKGN1ci5ib2R5LCBjb250ZXh0KVxuICAgICAgICApXG4gICAgfVxuICAgIC8vIGVsc2VcbiAgICBpZiggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggIT09IDAgKVxuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjb252ZXJ0X25vZGUoY3VyLm9yZWxzZSwgY29udGV4dCkgKTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19JRkJMT0NLLCAwLCBjaGlsZHJlbik7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZcIjsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBjb25kICAgICA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgaWZfdHJ1ZSAgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgIGNvbnN0IGlmX2ZhbHNlID0gbm9kZS5jaGlsZHJlblsyXTtcblxuICAgIHd0YCgke2NvbmR9ID8gJHtpZl90cnVlfSA6ICR7aWZfZmFsc2V9KWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDT05UUk9MRkxPV1NfVEVSTkFSWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjb25kICAgICAgID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgY29uc3QgYm9keV90cnVlICA9IGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpO1xuICAgIGNvbnN0IGJvZHlfZmFsc2UgPSBjb252ZXJ0X25vZGUobm9kZS5vcmVsc2UsIGNvbnRleHQpO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoQ09OVFJPTEZMT1dTX1RFUk5BUlksIGJvZHlfdHJ1ZS5yZXN1bHRfdHlwZSwgW1xuICAgICAgICBjb25kLFxuICAgICAgICBib2R5X3RydWUsXG4gICAgICAgIGJvZHlfZmFsc2VcbiAgICBdKTtcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZkV4cFwiOyIsImltcG9ydCB7IEJCLCBCRSwgTkwsIHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHd0YHRyeSB7JHtub2RlLmNoaWxkcmVuWzBdfSR7Tkx9fWA7XG4gICAgd3RgY2F0Y2goX3Jhd19lcnJfKXske0JCfSR7Tkx9YDtcblxuICAgICAgICB3KFwiY29uc3QgX2Vycl8gPSBfYl8uZ2V0X3B5X2V4Y2VwdGlvbihfcmF3X2Vycl8sIF9fU0JSWVRIT05fXylcIik7XG5cbiAgICAgICAgaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHcoIG5vZGUuY2hpbGRyZW5bMV0gKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAyOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIHcoTkwsIFwiZWxzZSBcIiwgbm9kZS5jaGlsZHJlbltpXSApO1xuXG4gICAgICAgIC8vIG5vdCBhIGNhdGNoIGFsbC4uLlxuICAgICAgICBpZiggbm9kZS5jaGlsZHJlbltub2RlLmNoaWxkcmVuLmxlbmd0aC0xXS5jaGlsZHJlbi5sZW5ndGggIT09IDEpXG4gICAgICAgICAgICB3KE5MLCBcImVsc2UgeyB0aHJvdyBfcmF3X2Vycl8gfVwiKTtcblxuICAgIHcoQkUsIE5MKTtcblxufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1RSWUJMT0NLIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gbmV3IEFycmF5PEFTVE5vZGU+KG5vZGUuaGFuZGxlcnMubGVuZ3RoKzEpO1xuXG4gICAgLy8gdHJ5IGJvZHlcbiAgICBjaGlsZHJlblswXSA9IGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuaGFuZGxlcnM7ICsraSlcbiAgICAgICAgY2hpbGRyZW5baSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLmhhbmRsZXJzW2ldLCBjb250ZXh0KTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19UUllCTE9DSywgMCwgY2hpbGRyZW4pO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeVwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICAvLyBlbHNlIGlzIGhhbmRsZWQgYnkgdHJ5YmxvY2tcblxuICAgIGlmKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gd3RgeyR7bm9kZS5jaGlsZHJlblswXX0sJHtOTH19YDtcblxuICAgIHd0YGlmKCR7bm9kZS5jaGlsZHJlblswXX0peyR7bm9kZS5jaGlsZHJlblsxXX0ke05MfX1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBjaGlsZHJlbjtcbiAgICBpZiggbm9kZS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBbY29udmVydF9ub2RlKG5vZGUudHlwZSwgY29udGV4dCksIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkcmVuID0gWyBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KSBdO1xuICAgIH1cblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19UUllCTE9DS19DQVRDSCwgMCwgY2hpbGRyZW4pO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gbm9kZS5uYW1lO1xuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJFeGNlcHRIYW5kbGVyXCI7IiwiaW1wb3J0IHsgU1lNQk9MIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBTQnJ5dGhvbiB9IGZyb20gXCJydW50aW1lXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBmaWx0ZXJfc3RhY2soc3RhY2s6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBzdGFjay5maWx0ZXIoIGUgPT4gZS5pbmNsdWRlcygnYnJ5dGhvbl8nKSApOyAvL1RPRE8gaW1wcm92ZXMuLi5cbn1cblxuLy9UT0RPOiB1c2Ugfj1zb3VyY2VtYXAuLi5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgLy9UT0RPLi4uXG4gIC8qXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICBpZiggbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID4gbGluZVxuICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQuY29sID4gY29sKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiggICAgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA+IGxpbmVcbiAgICAgICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuZW5kLmNvbCA+IGNvbFxuICAgICAgKSB7XG4gICAgICAgICAgbGV0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzW2ldLmNoaWxkcmVuLCBsaW5lLCBjb2wpO1xuICAgICAgICAgIGlmKCBub2RlICE9PSBudWxsKVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV07XG4gICAgICB9XG4gIH1cbiovXG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0LmJvZHkuY2hpbGRyZW4sIHN0YWNrbGluZVsxXSwgc3RhY2tsaW5lWzJdKSE7XG59XG5cbmV4cG9ydCB0eXBlIFN0YWNrTGluZSA9IFtzdHJpbmcsIG51bWJlciwgbnVtYmVyXTtcblxuLy9UT0RPOiBjb252ZXJ0XG5leHBvcnQgZnVuY3Rpb24gc3RhY2syYXN0bm9kZXMoc3RhY2s6IFN0YWNrTGluZVtdLCBzYjogU0JyeXRob24pOiBBU1ROb2RlW10ge1xuICByZXR1cm4gc3RhY2subWFwKCBlID0+IHN0YWNrbGluZTJhc3Rub2RlKGUsIHNiKSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgc2I6IFNCcnl0aG9uKTogU3RhY2tMaW5lW10ge1xuXG5cbiAgXG4gICAgc3RhY2sgPSBzdGFjay5zcGxpdChcIlxcblwiKTtcblxuICAgIGNvbnN0IGlzVjggPSBzdGFja1swXT09PSBcIkVycm9yXCI7IFxuXG4gICAgcmV0dXJuIGZpbHRlcl9zdGFjayhzdGFjaykubWFwKCBsID0+IHtcblxuICAgICAgbGV0IFtfLCBfbGluZSwgX2NvbF0gPSBsLnNwbGl0KCc6Jyk7XG4gIFxuICAgICAgaWYoIF9jb2xbX2NvbC5sZW5ndGgtMV0gPT09ICcpJykgLy8gVjhcbiAgICAgICAgX2NvbCA9IF9jb2wuc2xpY2UoMCwtMSk7XG4gIFxuICAgICAgbGV0IGxpbmUgPSArX2xpbmUgLSAyO1xuICAgICAgbGV0IGNvbCAgPSArX2NvbDtcblxuICAgICAgLS1jb2w7IC8vc3RhcnRzIGF0IDEuXG5cbiAgICAgIGxldCBmY3RfbmFtZSE6IHN0cmluZztcbiAgICAgIGlmKCBpc1Y4ICkge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKFwiIFwiLCA3KTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDcsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJldmFsXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG5cbiAgICAgICAgLy9UT0RPOiBleHRyYWN0IGZpbGVuYW1lLlxuICAgICAgICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ib2R5LmNoaWxkcmVuLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlX2lkID09PSBTWU1CT0wpXG4gICAgICAgICAgY29sICs9IFZBTFVFU1tub2RlLmlkXS5sZW5ndGg7IC8vIFY4IGdpdmVzIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgc3ltYm9sIG5hbWUgd2hlbiBGRiBnaXZlcyBcIihcIi4uLlxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKCdAJyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSgwLCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiYW5vbnltb3VzXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbZmN0X25hbWUsIGxpbmUsIGNvbF0gYXMgY29uc3Q7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihlcnI6IFB5X0V4Y2VwdGlvbiwgc2I6IFNCcnl0aG9uKSB7XG5cbiAgICBjb25zb2xlLndhcm4oXCJFeGNlcHRpb25cIiwgZXJyKTtcblxuICAgIGNvbnN0IHN0YWNrID0gcGFyc2Vfc3RhY2soIChlcnIgYXMgYW55KS5fcmF3X2Vycl8uc3RhY2ssIHNiKTtcbiAgICBjb25zdCBub2RlcyA9IHN0YWNrMmFzdG5vZGVzKHN0YWNrLCBzYik7XG4gICAgLy9UT0RPOiBjb252ZXJ0IHN0YWNrLi4uXG4gICAgLy8gbm9kZXNbaV0ucHljb2RlLnN0YXJ0LmxpbmVcbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHswfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZnVuY3Rpb24gZ2V0X3B5X2V4Y2VwdGlvbihfcmF3X2Vycl86IGFueSwgX19TQlJZVEhPTl9fOiBhbnkpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclxuICAgICAgICAgICAgICA/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XG5cbiAgZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pO1xuICBcbiAgcmV0dXJuIF9lcnJfO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVidWdfcHJpbnRfZXhjZXB0aW9uLFxuICAgIGdldF9weV9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IGNvbmQgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuWzFdO1xuXG4gICAgd3Rgd2hpbGUoJHtjb25kfSl7JHtib2R5fSR7Tkx9fX1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1dISUxFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19XSElMRSwgMCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dClcbiAgICBdKTtcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHNldF9qc19jdXJzb3IsIHcsIHdyLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPREVfRU5ELCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19BUkdTX0tXQVJHLCBGVU5DVElPTlNfQVJHU19WQVJHIH0gZnJvbSBcIi4vYXN0Y29udmVydFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIFxuICAgIGNvbnN0IGFyZ3MgICAgICA9IG5vZGU7XG4gICAgY29uc3QgX2FyZ3MgICAgID0gYXJncy5jaGlsZHJlbjtcbiAgICBjb25zdCBTVHlwZV9mY3QgPSBWQUxVRVNbYXJncy5pZF0hIGFzIFNUeXBlRmN0O1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGxldCBrd19zdGFydCA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGt3X3N0YXJ0ID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKVxuICAgICAgICBrd19zdGFydCA9IG1ldGEuaWR4X3ZhcmFyZyArIDE7XG5cbiAgICBpZiggbWV0YS5rd2FyZ3MgIT09IHVuZGVmaW5lZCAmJiBrd19zdGFydCA9PT0gX2FyZ3MubGVuZ3RoLTEpXG4gICAgICAgICsra3dfc3RhcnQ7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBfYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIHcoXCIsIFwiKTtcblxuICAgICAgICBpZigga3dfc3RhcnQgPT09IGkpXG4gICAgICAgICAgICB3KFwie1wiKTtcbiAgICAgICAgaWYoIGkgPT09IG1ldGEuaWR4X3ZhcmFyZyAmJiBpID09PSBfYXJncy5sZW5ndGgtMSApXG4gICAgICAgICAgICAoX2FyZ3NbaV0gYXMgYW55KS5sYXN0ID0gdHJ1ZTtcblxuICAgICAgICB3cml0ZV9hcmcoX2FyZ3NbaV0pO1xuICAgIH1cblxuICAgIGlmKCBrd19zdGFydCA8IF9hcmdzLmxlbmd0aClcbiAgICAgICAgdygnfSA9IHt9Jyk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlX2FyZyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3Qgb2Zmc2V0ID0gNCpub2RlLmlkO1xuICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9FTkQpO1xuXG4gICAgY29uc3QgbmFtZSA9IFZBTFVFU1tub2RlLmlkXTtcblxuICAgIGlmKCBub2RlLnR5cGVfaWQgPT09IEZVTkNUSU9OU19BUkdTX1ZBUkcgKSB7XG4gICAgICAgIGlmKCAobm9kZSBhcyBhbnkpLmxhc3QpXG4gICAgICAgICAgICB3dGAuLi4ke25hbWV9YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd3IoIGJpbmFyeV9qc29wKG5vZGUsIG5hbWUsICc9JywgXCJbXVwiKSApO1xuICAgIH0gZWxzZSBpZiggbm9kZS50eXBlX2lkID09PSBGVU5DVElPTlNfQVJHU19LV0FSRyApIHtcbiAgICAgICAgd3IoIGJpbmFyeV9qc29wKG5vZGUsIG5hbWUsICc9JywgXCJ7fVwiKSApO1xuICAgIH0gZWxzZSBpZihub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSApIHtcblxuICAgICAgICBsZXQgdmFsdWU6IGFueSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgIGlmKCB2YWx1ZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSlNJTlQgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UKVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIySW50KHZhbHVlKTtcblxuICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbmFtZSwgJz0nLCB2YWx1ZSkgKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIHcobmFtZSk7XG4gICAgfVxuXG4gICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0VORCk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19BUkdTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgc2V0X3B5X2NvZGUsIHNldF9weV9mcm9tX2JlZywgc2V0X3B5X2Zyb21fZW5kIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09ERV9CRUdfQ09MLCBDT0RFX0JFR19MSU5FLCBDT0RFX0VORF9DT0wsIENPREVfRU5EX0xJTkUsIFBZX0NPREUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuLy9UT0RPOiBmYWtlIG5vZGUuLi5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoKSB7XG4gICAgLy8gYXJncyBub2RlIGRvZXNuJ3QgZXhpc3QuLi5cbiAgICByZXR1cm47XG59XG5cbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQVJHU19QT1NPTkxZID0gMDtcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQVJHU19LV0FSRyAgID0gMTtcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQVJHU19LV09OTFkgID0gMjtcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQVJHU19WQVJHICAgID0gMztcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQVJHU19QT1MgICAgID0gNDtcblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiYXJndW1lbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZ3Mobm9kZTogYW55LCBTVHlwZV9mY3Q6IFNUeXBlRmN0LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBtZXRhID0gU1R5cGVfZmN0Ll9fY2FsbF9fO1xuXG4gICAgY29uc3QgX2FyZ3MgPSBub2RlLmFyZ3M7XG4gICAgY29uc3QgaGFzX3ZhcmFyZyA9IF9hcmdzLnZhcmFyZyAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGhhc19rd2FyZyAgPSBfYXJncy5rd2FyZyAgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBhcmdzX3BvcyAgID0gbWV0YS5hcmdzX3BvcztcbiAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuXG4gICAgY29uc3QgdG90YWxfYXJncyA9IF9hcmdzLnBvc29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5hcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX3ZhcmFyZ1xuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5rd29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX2t3YXJnO1xuXG4gICAgY29uc3QgYXJncyA9IG5ldyBBcnJheTxBU1ROb2RlPih0b3RhbF9hcmdzKTtcblxuICAgIGNvbnN0IHBvc19kZWZhdWx0cyA9IG5vZGUuYXJncy5kZWZhdWx0cztcbiAgICBjb25zdCBwb3Nvbmx5ID0gX2FyZ3MucG9zb25seWFyZ3M7XG4gICAgY29uc3QgcG9zICAgICA9IF9hcmdzLmFyZ3M7XG5cbiAgICAvLyBwb3Nvbmx5XG4gICAgbGV0IGRvZmZzZXQgPSBwb3NfZGVmYXVsdHMubGVuZ3RoIC0gcG9zb25seS5sZW5ndGggLSBwb3MubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3Nvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhwb3Nvbmx5W2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBGVU5DVElPTlNfQVJHU19QT1NPTkxZLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3Bvc29ubHlbaV0uYXJnXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tpXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBwb3NcbiAgICBsZXQgb2Zmc2V0ID0gcG9zb25seS5sZW5ndGg7XG4gICAgICBkb2Zmc2V0IC09IHBvc29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc1tpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgRlVOQ1RJT05TX0FSR1NfUE9TLCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5hbWUgPSBwb3NbaV0uYXJnO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3NfbmFtZXNbb2Zmc2V0XSA9IG5hbWU7XG5cbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgbWV0YS5pZHhfdmFyYXJnID0gb2Zmc2V0O1xuXG4gICAgLy8gdmFyYXJnXG4gICAgaWYoIGhhc192YXJhcmcgKSB7XG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3MudmFyYXJnLCB1bmRlZmluZWQsIEZVTkNUSU9OU19BUkdTX1ZBUkcsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbX2FyZ3MudmFyYXJnLmFyZ10gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG5iX3Bvc19kZWZhdWx0cyA9IE1hdGgubWluKHBvc19kZWZhdWx0cy5sZW5ndGgsIHBvcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBoYXNfb3RoZXJzID0gcG9zX2RlZmF1bHRzLmxlbmd0aCA+IHBvcy5sZW5ndGggfHwgYXJncy5sZW5ndGggIT09IG9mZnNldDtcblxuICAgICAgICBpZiggbmJfcG9zX2RlZmF1bHRzID4gMSB8fCBuYl9wb3NfZGVmYXVsdHMgPT09IDEgJiYgaGFzX290aGVycylcbiAgICAgICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgLT0gbmJfcG9zX2RlZmF1bHRzO1xuICAgIH1cblxuICAgIGxldCBjdXRfb2ZmICAgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBjdXRfb2ZmID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIGN1dF9vZmYgPSBtZXRhLmlkeF92YXJhcmc7XG4gICAgZm9yKGxldCBpID0gcG9zb25seS5sZW5ndGg7IGkgPCBjdXRfb2ZmOyArK2kpXG4gICAgICAgIGFyZ3NfcG9zW1ZBTFVFU1thcmdzW2ldLmlkXV0gPSBpO1xuXG4gICAgY29uc3QgZW5kID0gbWV0YS5pZHhfdmFyYXJnIC0gY3V0X29mZjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5kOyArK2kpXG4gICAgICAgIGFyZ3NfcG9zW1ZBTFVFU1thcmdzW2ldLmlkXV0gPSAtMTtcblxuICAgIC8vVE9ETzogaWR4X2VuZF9wb3MgKGlmIGRlZmF1bHQgYW5kIG5vIGlkeF92YXJhcmcpXG5cbiAgICAvLyBrd29ubHlcbiAgICBjb25zdCBrd29ubHkgICAgICA9IF9hcmdzLmt3b25seWFyZ3M7XG4gICAgY29uc3Qga3dfZGVmYXVsdHMgPSBfYXJncy5rd19kZWZhdWx0cztcblxuICAgIG1ldGEuaGFzX2t3ID0gbWV0YS5pZHhfdmFyYXJnICE9PSBjdXRfb2ZmIHx8IGt3b25seS5sZW5ndGggIT09IDA7XG5cbiAgICBkb2Zmc2V0ID0ga3dfZGVmYXVsdHMubGVuZ3RoIC0ga3dvbmx5Lmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwga3dvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhrd29ubHlbaV0sIGt3X2RlZmF1bHRzW2ldLCBGVU5DVElPTlNfQVJHU19LV09OTFksIGNvbnRleHQpO1xuICAgICAgICBjb25zdCBuYW1lID0ga3dvbmx5W2ldLmFyZztcblxuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3NfcG9zW25hbWVdID0gLTE7XG5cbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgLy8ga3dhcmdcbiAgICBpZiggaGFzX2t3YXJnICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhfYXJncy5rd2FyZywgdW5kZWZpbmVkLCBGVU5DVElPTlNfQVJHU19LV0FSRywgY29udGV4dCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBfYXJncy5rd2FyZy5hcmc7XG5cbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25hbWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcblxuICAgICAgICBtZXRhLmt3YXJncyA9IG5hbWU7XG4gICAgfVxuXG4gICAgLy9UT0RPLi4uXG4gICAgLypcbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG4gICAgKi9cblxuICAgIC8vVE9ETy4uLlxuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoRlVOQ1RJT05TX0FSR1MsIDAsIGFyZ3MpO1xuICAgIFxuICAgIGFzdC50eXBlX2lkID0gRlVOQ1RJT05TX0FSR1M7XG4gICAgVkFMVUVTW2FzdC5pZF0gPSBTVHlwZV9mY3Q7XG4gICAgXG4gICAgY29uc3QgcHlfb2Zmc2V0ID0gNCphc3QuaWQ7XG5cbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBzZXRfcHlfZnJvbV9iZWcoIDQqYXJnc1swXS5pZCAgICAgICAgICAgICwgcHlfb2Zmc2V0ICk7XG4gICAgICAgIHNldF9weV9mcm9tX2VuZCggNCphcmdzW2FyZ3MubGVuZ3RoLTFdLmlkLCBweV9vZmZzZXQgKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIFBZX0NPREVbIHB5X29mZnNldCArIENPREVfQkVHX0xJTkUgXSA9IFBZX0NPREVbIHB5X29mZnNldCArIENPREVfRU5EX0xJTkUgXSA9IG5vZGUubGluZW5vO1xuICAgICAgICBQWV9DT0RFWyBweV9vZmZzZXQgKyBDT0RFX0JFR19DT0wgIF0gPSBQWV9DT0RFWyBweV9vZmZzZXQgKyBDT0RFX0VORF9DT0wgIF0gPSBjb2w7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGRlZnZhbDogYW55LCB0eXBlOm51bWJlciwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZS5hbm5vdGF0aW9uPy5pZDtcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcbiAgICBpZiggZGVmdmFsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSBjb252ZXJ0X25vZGUoIGRlZnZhbCxjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY2hpbGQgKTtcblxuICAgICAgICBpZiggcmVzdWx0X3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gY2hpbGQucmVzdWx0X3R5cGU7XG4gICAgICAgICAgICBpZihyZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgICAgICAgICByZXN1bHRfdHlwZSA9ICdpbnQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUodHlwZSwgcmVzdWx0X3R5cGUsIGNoaWxkcmVuKTtcblxuICAgIFZBTFVFU1thc3QuaWRdID0gbm9kZS5hcmc7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufSIsImltcG9ydCB7IHIsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0NBTExfS0VZV09SRCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZnVuY3Rpb24gcHJpbnRfb2JqKG9iajogUmVjb3JkPHN0cmluZywgYW55Pikge1xuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgaWYoa2V5cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW11dO1xuXG4gICAgY29uc3Qgc3RyID0gbmV3IEFycmF5KGtleXMubGVuZ3RoKzEpO1xuICAgIHN0clswXSA9IGB7JHtrZXlzWzBdfTogYDtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gID0gYCwgJHtrZXlzW2ldfTogYDtcblxuICAgIHN0cltpXSA9IFwifVwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLk9iamVjdC52YWx1ZXMob2JqKV07XG59XG5cbmZ1bmN0aW9uIGpvaW4oZGF0YTogYW55W10sIHNlcD1cIiwgXCIpIHtcblxuICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gW1tcIlwiXV07XG5cbiAgICBjb25zdCBzdHIgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgrMSk7XG4gICAgc3RyWzBdID0gXCJcIjtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gPSBzZXA7XG4gICAgc3RyW2ldID0gXCJcIjtcblxuICAgIHJldHVybiBbc3RyLCAuLi5kYXRhXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRfY2FsbChub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBtZXRhID0gKFZBTFVFU1tub2RlLmlkXSBhcyBTVHlwZUZjdCkuX19jYWxsX187XG5cbiAgICBsZXQga3dfcG9zID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKG5vZGUuY2hpbGRyZW5baV0udHlwZV9pZCA9PT0gRlVOQ1RJT05TX0NBTExfS0VZV09SRCkge1xuICAgICAgICAgICAga3dfcG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICBsZXQgbmJfcG9zID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZiggbmJfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIG5iX3BvcyA9IE1hdGgubWF4KG1ldGEuaWR4X3ZhcmFyZywga3dfcG9zLTEpO1xuXG4gICAgbGV0IHBvc19zaXplID0gbmJfcG9zKzE7XG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApXG4gICAgICAgIHBvc19zaXplID0gbWV0YS5pZHhfdmFyYXJnKzI7XG4gICAgbGV0IHBvcyA9IG5ldyBBcnJheShwb3Nfc2l6ZSk7XG4gICAgXG4gICAgY29uc3Qga3cgICAgOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuICAgIGNvbnN0IGt3YXJnczogUmVjb3JkPHN0cmluZywgQVNUTm9kZT4gPSB7fTtcblxuICAgIGxldCBoYXNfa3cgPSBmYWxzZTtcblxuICAgIGlmKCBtZXRhLmhhc19rdyAmJiBtZXRhLmlkeF9lbmRfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKSB7XG5cbiAgICAgICAgY29uc3QgY3V0b2ZmID0gTWF0aC5taW4oa3dfcG9zLCBtZXRhLmlkeF92YXJhcmcpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBpZiggbWV0YS5pZHhfdmFyYXJnKzEgIT09IGt3X3BvcyApXG4gICAgICAgICAgICBwb3NbbWV0YS5pZHhfdmFyYXJnXSA9IGpvaW4oW1wiW1wiLCBqb2luKG5vZGUuY2hpbGRyZW4uc2xpY2UobWV0YS5pZHhfdmFyYXJnKzEsa3dfcG9zKSksIFwiXVwiXSwgXCJcIik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG5iX3BvcysxKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgY3V0b2ZmOyArK2kpXG4gICAgICAgICAgICBwb3NbaS0xXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgY29uc3QgYXJnc19uYW1lcyA9IG1ldGEuYXJnc19uYW1lcztcbiAgICAgICAgZm9yKGxldCBpID0gY3V0b2ZmOyBpIDwga3dfcG9zOyArK2kpXG4gICAgICAgICAgICBrd1sgYXJnc19uYW1lc1tpLTFdIF0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGhhc19rdyA9IGN1dG9mZiAhPT0ga3dfcG9zO1xuICAgIH1cblxuICAgIGxldCBoYXNfa3dhcmdzID0gZmFsc2U7XG5cbiAgICBjb25zdCBhcmdzX3BvcyA9IG1ldGEuYXJnc19wb3M7XG4gICAgXG5cbiAgICBmb3IobGV0IGkgPSBrd19wb3M7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgY29uc3QgYXJnICA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IG5hbWUgPSBWQUxVRVNbYXJnLmlkXTtcbiAgICAgICAgY29uc3QgaWR4ICA9IGFyZ3NfcG9zWyBuYW1lIF07XG5cbiAgICAgICAgaWYoIGlkeCA+PSAwICkge1xuICAgICAgICAgICAgcG9zW2lkeF0gPSBhcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc19rdyA9IHRydWU7XG5cbiAgICAgICAgaWYoIGlkeCA9PT0gLTEpXG4gICAgICAgICAgICBrd1tuYW1lXSA9IGFyZztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrd2FyZ3NbbmFtZV0gPSBhcmc7XG4gICAgICAgICAgICBoYXNfa3dhcmdzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4gPSBrdztcbiAgICAvL1RPRE86IG9ubHkgdGhlIG9uZXMgYXQgLTEuLi5cbiAgICBpZiggaGFzX2t3YXJncyAmJiAhIG1ldGEuaGFzX2t3ICl7XG4gICAgICAgIG9iaiA9IGt3YXJncztcbiAgICB9IGVsc2UgaWYoIGhhc19rd2FyZ3MgKSB7XG4gICAgICAgIG9ialttZXRhLmt3YXJncyFdID0gcHJpbnRfb2JqKGt3YXJncyk7XG4gICAgfVxuXG4gICAgaWYoIGhhc19rdyApXG4gICAgICAgIHBvc1twb3MubGVuZ3RoLTFdID0gcHJpbnRfb2JqKG9iaik7XG4gICAgZWxzZSB7XG4gICAgICAgIHdoaWxlKHBvcy5sZW5ndGggPiAwICYmIHBvc1twb3MubGVuZ3RoLTFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAtLXBvcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHtub2RlLmNoaWxkcmVuWzBdfSgke2pvaW4ocG9zKX0pYDsgLy8gYXJncyA/XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgd3IoIChWQUxVRVNbbm9kZS5pZF0gYXMgU1R5cGVGY3QpLl9fY2FsbF9fLnN1YnN0aXR1dGVfY2FsbCEobm9kZSkgKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19DQUxMIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG4gICAgY29uc3QgZmN0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0hO1xuICAgIGlmKCBmY3RfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBjb25zb2xlLndhcm4obm9kZSk7XG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZXh0LmxvY2FsX3N5bWJvbHMpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uICR7bmFtZX0gbm90IGRlZmluZWRgKTtcbiAgICB9XG5cbiAgICBjb25zdCBmY3QgPSBTVHlwZXNbZmN0X3R5cGVdO1xuICAgIGNvbnN0IHJldF90eXBlID0gKGZjdC5fX2NhbGxfXyBhcyBTVHlwZUZjdFN1YnMpLnJldHVybl90eXBlKCk7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZSggRlVOQ1RJT05TX0NBTEwsIHJldF90eXBlLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzICAgIC5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpICksXG4gICAgICAgIC4uLm5vZGUua2V5d29yZHMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBrZXl3b3JkIG5vZGUuLi5cbiAgICBdKTtcblxuICAgIFZBTFVFU1thc3QuaWRdID0gZmN0O1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcobm9kZS5jaGlsZHJlblswXSk7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHZhbHVlICAgID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQgKVxuICAgIGNvbnN0IHJldF90eXBlID0gdmFsdWUucmVzdWx0X3R5cGU7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShGVU5DVElPTlNfQ0FMTF9LRVlXT1JELCByZXRfdHlwZSwgW1xuICAgICAgICB2YWx1ZVxuICAgIF0pO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLmFyZztcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJrZXl3b3JkXCI7IiwiaW1wb3J0IHsgTkwsIHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBWQUxVRVNbbm9kZS5pZF07XG4gICAgY29uc3QgYXJncyA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5bMV07XG5cbiAgICB3dGBmdW5jdGlvbiAke25hbWV9KCR7YXJnc30peyR7Ym9keX0ke05MfX1gO1xuICAgIC8vdygnZnVuY3Rpb24gJywgbmFtZSwgJygnLCBhcmdzLCAnKXsnLCBib2R5LCBOTCwgJ30nKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IHsgZGVmYXVsdF9jYWxsIH0gZnJvbSBcIi4uL2NhbGwvYXN0MmpzXCI7XG5pbXBvcnQgeyBjb252ZXJ0X2FyZ3MgfSBmcm9tIFwiLi4vYXJncy9hc3Rjb252ZXJ0XCI7XG5pbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19ERUYgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbi8vIHJlcXVpcmVkIGFzIHNvbWUgc3ltYm9scyBtYXkgaGF2ZSBiZWVuIGRlY2xhcmVkIG91dCBvZiBvcmRlclxuLy8gKG5vdCBvbmx5IGZvciByZXR1cm4gdHlwZSBjb21wdXRhdGlvbilcbmZ1bmN0aW9uIGdlbmVyYXRlKG5vZGU6IGFueSwgYXN0bm9kZTogQVNUTm9kZSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8gZnVjay4uLlxuICAgIGNvbnN0IHN0eXBlICAgPSBTVHlwZXNbYXN0bm9kZS5yZXN1bHRfdHlwZV0gYXMgU1R5cGVGY3Q7XG4gICAgY29uc3QgbWV0YSAgICA9IHN0eXBlLl9fY2FsbF9fO1xuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG4gICAgY29udGV4dC5wYXJlbnRfbm9kZV9jb250ZXh0ID0gYXN0bm9kZTsgLy8gPC0gaGVyZVxuXG4gICAgLy8gZmFrZSB0aGUgbm9kZS4uLiA9PiBiZXR0ZXIgZG9pbmcgaGVyZSB0byBub3QgaGF2ZSBjb250ZXh0IGlzc3Vlcy5cbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIHN0eXBlLCBjb250ZXh0KTtcbiAgICBmb3IobGV0IGFyZyBvZiBhcmdzLmNoaWxkcmVuKVxuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbVkFMVUVTW2FyZy5pZF1dID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgLy8gdGVsbCBib2R5IHRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gZ2VuZXJhdGVkLlxuICAgIG1ldGEuZ2VuZXJhdGUgPSB1bmRlZmluZWQ7XG4gICAgLy8gcHJldmVudHMgcmVjdXJzaXZlIGNhbGxzIG9yIHJlYWZmZWN0YXRpb24uXG4gICAgbWV0YS5yZXR1cm5fdHlwZSA9IHVuZGVmaW5lZCBhcyBhbnk7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZS5yZXR1cm5zPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICBsZXQgZmN0X3JldHVybl90eXBlID0gZ2V0U1R5cGVJRChhbm5vdGF0aW9uKTtcbiAgICAgICAgLy8gZm9yY2UgdGhlIHR5cGUuXG4gICAgICAgIG1ldGEucmV0dXJuX3R5cGUgPSAoKSA9PiBmY3RfcmV0dXJuX3R5cGUhO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYm9keVxuICAgIGFzdG5vZGUuY2hpbGRyZW4gPSBbXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vY29uc3QgaXNNZXRob2QgPSBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIjtcblxuICAgIGNvbnN0IFNUeXBlX2ZjdDogU1R5cGVGY3QgPSB7XG4gICAgICAgIF9fbmFtZV9fOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIF9fY2FsbF9fOiB7XG4gICAgICAgICAgICBhcmdzX25hbWVzICAgICA6IG5ldyBBcnJheShub2RlLmFyZ3MuYXJncy5sZW5ndGgrbm9kZS5hcmdzLnBvc29ubHlhcmdzLmxlbmd0aCksXG4gICAgICAgICAgICBhcmdzX3BvcyAgICAgICA6IHt9LFxuICAgICAgICAgICAgaWR4X2VuZF9wb3MgICAgOiAtMSxcbiAgICAgICAgICAgIGlkeF92YXJhcmcgICAgIDogLTEsXG4gICAgICAgICAgICBoYXNfa3cgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgZ2VuZXJhdGUsXG4gICAgICAgICAgICByZXR1cm5fdHlwZSAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZShub2RlLCBhc3QsIGNvbnRleHQpOyAvLyBzaG91bGQgYmUgdGhlIG5ldyBjb250ZXh0XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUeXBlX2ZjdC5fX2NhbGxfXy5yZXR1cm5fdHlwZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogZGVmYXVsdF9jYWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBTVHlwZUlEID0gU1R5cGVzLmxlbmd0aDtcbiAgICBTVHlwZXNbU1R5cGVJRF0gPSBTVHlwZV9mY3Q7XG5cbiAgICAvL2lmKCAhIGlzTWV0aG9kICkge1xuICAgIC8vIGlmIG1ldGhvZCBhZGQgdG8gc2VsZl9jb250ZXh0LnN5bWJvbHMgP1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0gU1R5cGVJRDtcblxuXG4gICAgLy8gaW1wbGljaXQgcmV0dXJuLi4uXG4gICAgY29uc3QgbGFzdF90eXBlICAgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXS5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggbGFzdF90eXBlICE9PSBcIlJldHVyblwiICYmIGxhc3RfdHlwZSAhPT0gXCJSYWlzZVwiICkge1xuXG4gICAgICAgIGNvbnN0IGZha2Vfbm9kZSA9IHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgICAgICAgJG5hbWU6IFwiUmV0dXJuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGluZW5vOiBub2RlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBub2RlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5lbmRfY29sX29mZnNldCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBub2RlLmVuZF9jb2xfb2Zmc2V0LFxuICAgICAgICB9XG4gICAgICAgIG5vZGUuYm9keS5wdXNoKCBmYWtlX25vZGUgKTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShGVU5DVElPTlNfREVGLCBTVHlwZUlEKTtcblxuICAgIFZBTFVFU1thc3QuaWRdID0gbm9kZS5uYW1lO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuICAgIFxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHJldHVybiB3dGBfYl8uYXNzZXJ0KCR7bm9kZS5jaGlsZHJlblswXX0pYDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEtFWVdPUkRTX0FTU0VSVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShLRVlXT1JEU19BU1NFUlQsIDAsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dClcbiAgICBdKTtcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJicmVha1wiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEtFWVdPUkRTX0JSRUFLIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoS0VZV09SRFNfQlJFQUssIDApO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJyZWFrXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiY29udGludWVcIik7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBLRVlXT1JEU19DT05USU5VRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoS0VZV09SRFNfQ09OVElOVUUsIDApO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnRpbnVlXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgdmFsdWUgPSBWQUxVRVNbbm9kZS5pZF07XG5cbiAgICBpZiggdmFsdWVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHcodmFsdWVbMF0pO1xuXG4gICAgd3RgJHt2YWx1ZVswXX06ICR7dmFsdWVbMV19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEtFWVdPUkRTX0lNUE9SVF9BTElBUyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoS0VZV09SRFNfSU1QT1JUX0FMSUFTLCAwLCBbbm9kZS5uYW1lLCBub2RlLmFzbmFtZV0pO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiY29uc3Qge1wiKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAgdyhcIiwgXCIpO1xuICAgICAgICB3KG5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIHcoJ30gPSAnKTtcblxuICAgIGNvbnN0IHZhbHVlID0gVkFMVUVTW25vZGUuaWRdO1xuICAgIFxuICAgIGlmKHZhbHVlID09PSBudWxsKVxuICAgICAgICB3KFwiX19TQlJZVEhPTl9fLmdldE1vZHVsZXMoKVwiKTtcbiAgICBlbHNlXG4gICAgICAgIHd0YF9fU0JSWVRIT05fXy5nZXRNb2R1bGUoXCIke3ZhbHVlfVwiKWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBLRVlXT1JEU19JTVBPUlQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoS0VZV09SRFNfSU1QT1JULCAwLFxuICAgICAgICBub2RlLm5hbWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG5cbiAgICBWQUxVRVNbYXN0LmlkID0gbm9kZS5tb2R1bGVdO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJJbXBvcnRcIiwgXCJJbXBvcnRGcm9tXCJdOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUpIHtcbiAgICB3dGB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pYDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEtFWVdPUkRTX1JBSVNFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKEtFWVdPUkRTX1JBSVNFLCAwLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmV4YywgY29udGV4dClcbiAgICBdKTtcbiAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL29wZXJhdG9ycy89X2luaXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89X2luaXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNSBmcm9tIFwiLi9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4va2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI3IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI3IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOSBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9mdW5jdGlvbnMvYXJncy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzEgZnJvbSBcIi4vZnVuY3Rpb25zL2FyZ3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdGVybmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzUgZnJvbSBcIi4vY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM2IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM3IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3JfcmFuZ2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM3IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3JfcmFuZ2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzggZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzggZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zOSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzkgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNDAgZnJvbSBcIi4vYm9keS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNDAgZnJvbSBcIi4vYm9keS9hc3QyanMudHNcIjtcblxuXG5leHBvcnQgY29uc3QgU1lNQk9MID0gMDtcbmV4cG9ydCBjb25zdCBTVFJVQ1RTX1RVUExFID0gMTtcbmV4cG9ydCBjb25zdCBTVFJVQ1RTX0xJU1QgPSAyO1xuZXhwb3J0IGNvbnN0IFNUUlVDVFNfRElDVCA9IDM7XG5leHBvcnQgY29uc3QgUkVUVVJOID0gNDtcbmV4cG9ydCBjb25zdCBQQVNTID0gNTtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfVU5BUlkgPSA2O1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19DT01QQVJFID0gNztcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfQk9PTEVBTiA9IDg7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0JJTkFSWSA9IDk7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0FUVFIgPSAxMDtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfX0JSQUNLRVRTID0gMTE7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0FTU0lHTk9QID0gMTI7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX19FUV9JTklUID0gMTM7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX19FUSA9IDE0O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX1NUUiA9IDE1O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0lOVCA9IDE2O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0ZMT0FUID0gMTc7XG5leHBvcnQgY29uc3QgTElURVJBTFNfRl9TVFJJTkcgPSAxODtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSA9IDE5O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0JPT0wgPSAyMDtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19OT05FID0gMjE7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfUkFJU0UgPSAyMjtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19JTVBPUlQgPSAyMztcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19JTVBPUlRfQUxJQVMgPSAyNDtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19DT05USU5VRSA9IDI1O1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX0JSRUFLID0gMjY7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfQVNTRVJUID0gMjc7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0RFRiA9IDI4O1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19DQUxMID0gMjk7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0NBTExfS0VZV09SRCA9IDMwO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTID0gMzE7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1dISUxFID0gMzI7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1RSWUJMT0NLID0gMzM7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIID0gMzQ7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1RFUk5BUlkgPSAzNTtcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfSUZCTE9DSyA9IDM2O1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19GT1JfUkFOR0UgPSAzNztcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfRk9SID0gMzg7XG5leHBvcnQgY29uc3QgQ0xBU1NfQ0xBU1NERUYgPSAzOTtcbmV4cG9ydCBjb25zdCBCT0RZID0gNDA7XG5cbmV4cG9ydCBjb25zdCBBU1RfQ09OVkVSVCA9IFtcblx0QVNUX0NPTlZFUlRfMCxcblx0QVNUX0NPTlZFUlRfMSxcblx0QVNUX0NPTlZFUlRfMixcblx0QVNUX0NPTlZFUlRfMyxcblx0QVNUX0NPTlZFUlRfNCxcblx0QVNUX0NPTlZFUlRfNSxcblx0QVNUX0NPTlZFUlRfNixcblx0QVNUX0NPTlZFUlRfNyxcblx0QVNUX0NPTlZFUlRfOCxcblx0QVNUX0NPTlZFUlRfOSxcblx0QVNUX0NPTlZFUlRfMTAsXG5cdEFTVF9DT05WRVJUXzExLFxuXHRBU1RfQ09OVkVSVF8xMixcblx0QVNUX0NPTlZFUlRfMTMsXG5cdEFTVF9DT05WRVJUXzE0LFxuXHRBU1RfQ09OVkVSVF8xNSxcblx0QVNUX0NPTlZFUlRfMTYsXG5cdEFTVF9DT05WRVJUXzE3LFxuXHRBU1RfQ09OVkVSVF8xOCxcblx0QVNUX0NPTlZFUlRfMTksXG5cdEFTVF9DT05WRVJUXzIwLFxuXHRBU1RfQ09OVkVSVF8yMSxcblx0QVNUX0NPTlZFUlRfMjIsXG5cdEFTVF9DT05WRVJUXzIzLFxuXHRBU1RfQ09OVkVSVF8yNCxcblx0QVNUX0NPTlZFUlRfMjUsXG5cdEFTVF9DT05WRVJUXzI2LFxuXHRBU1RfQ09OVkVSVF8yNyxcblx0QVNUX0NPTlZFUlRfMjgsXG5cdEFTVF9DT05WRVJUXzI5LFxuXHRBU1RfQ09OVkVSVF8zMCxcblx0QVNUX0NPTlZFUlRfMzEsXG5cdEFTVF9DT05WRVJUXzMyLFxuXHRBU1RfQ09OVkVSVF8zMyxcblx0QVNUX0NPTlZFUlRfMzQsXG5cdEFTVF9DT05WRVJUXzM1LFxuXHRBU1RfQ09OVkVSVF8zNixcblx0QVNUX0NPTlZFUlRfMzcsXG5cdEFTVF9DT05WRVJUXzM4LFxuXHRBU1RfQ09OVkVSVF8zOSxcblx0QVNUX0NPTlZFUlRfNDAsXG5dXG5cbmV4cG9ydCBjb25zdCBBU1QySlMgPSBbXG5cdEFTVDJKU18wLFxuXHRBU1QySlNfMSxcblx0QVNUMkpTXzIsXG5cdEFTVDJKU18zLFxuXHRBU1QySlNfNCxcblx0QVNUMkpTXzUsXG5cdEFTVDJKU182LFxuXHRBU1QySlNfNyxcblx0QVNUMkpTXzgsXG5cdEFTVDJKU185LFxuXHRBU1QySlNfMTAsXG5cdEFTVDJKU18xMSxcblx0QVNUMkpTXzEyLFxuXHRBU1QySlNfMTMsXG5cdEFTVDJKU18xNCxcblx0QVNUMkpTXzE1LFxuXHRBU1QySlNfMTYsXG5cdEFTVDJKU18xNyxcblx0QVNUMkpTXzE4LFxuXHRBU1QySlNfMTksXG5cdEFTVDJKU18yMCxcblx0QVNUMkpTXzIxLFxuXHRBU1QySlNfMjIsXG5cdEFTVDJKU18yMyxcblx0QVNUMkpTXzI0LFxuXHRBU1QySlNfMjUsXG5cdEFTVDJKU18yNixcblx0QVNUMkpTXzI3LFxuXHRBU1QySlNfMjgsXG5cdEFTVDJKU18yOSxcblx0QVNUMkpTXzMwLFxuXHRBU1QySlNfMzEsXG5cdEFTVDJKU18zMixcblx0QVNUMkpTXzMzLFxuXHRBU1QySlNfMzQsXG5cdEFTVDJKU18zNSxcblx0QVNUMkpTXzM2LFxuXHRBU1QySlNfMzcsXG5cdEFTVDJKU18zOCxcblx0QVNUMkpTXzM5LFxuXHRBU1QySlNfNDAsXG5dXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV85KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8xNyk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjIpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI3KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8zMyk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICB3KFwibnVsbFwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX05PTkUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUWVBFX05PTkVUWVBFIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKExJVEVSQUxTX05PTkUsIFNUWVBFX05PTkVUWVBFKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgYWRkU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ05vbmVUeXBlJywge30pOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoIFZBTFVFU1tub2RlLmlkXSApO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfQk9PTCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShMSVRFUkFMU19CT09MLCBTVFlQRV9CT09MKTtcbiAgICBcbiAgICBWQUxVRVNbYXN0LmlkXSA9IG5vZGUudmFsdWU7XG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkNtcE9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgUkVUX0lKQkYyQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1JldHVyblR5cGVGY3RzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSAgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2Jvb2wnLCB7XG4gICAgLi4uZ2VuQ21wT3BzKENNUE9QU19MSVNULCBSRVRfSUpCRjJCT09MKSxcbn0pOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhcIiR7XCIsIG5vZGUuY2hpbGRyZW5bMF0sIFwifVwiKVxufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUsIDAsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHNldF9qc19jdXJzb3IsIHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENPREVfQkVHLCBDT0RFX0VORCwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUWVBFX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhcImBcIik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFNUWVBFX1NUUikge1xuXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSA0KmNoaWxkLmlkO1xuICAgICAgICAgICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0JFRyk7XG5cbiAgICAgICAgICAgIHcoVkFMVUVTW2NoaWxkLmlkXSk7XG5cbiAgICAgICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9FTkQpO1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlX2lkID09PSBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSkge1xuICAgICAgICAgICAgdyhjaGlsZCk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgdyhcImBcIik7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19GX1NUUklORyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoTElURVJBTFNfRl9TVFJJTkcsIDAsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICB3KFZBTFVFU1tub2RlLmlkXSk7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19GTE9BVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfRkxPQVQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShMSVRFUkFMU19GTE9BVCwgU1RZUEVfRkxPQVQpO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gbm9kZS52YWx1ZS52YWx1ZTtcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvYXQyc3RyOiAoZjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmKCBmIDw9IDFlLTUgfHwgZiA+PSAxZTE2KSB7XG5cbiAgICAgICAgICAgIGxldCBzdHIgPSBmLnRvRXhwb25lbnRpYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHNpZ25faWR4ID0gc3RyLmxlbmd0aC0yO1xuICAgICAgICAgICAgaWYoc3RyW3NpZ25faWR4XSA9PT0gJy0nIHx8IHN0cltzaWduX2lkeF0gPT09ICcrJylcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCxzaWduX2lkeCsxKSArICcwJyArIHN0ci5zbGljZShzaWduX2lkeCsxKTtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RyID0gZi50b1N0cmluZygpO1xuICAgICAgICBpZiggISBzdHIuaW5jbHVkZXMoJy4nKSlcbiAgICAgICAgICAgIHN0ciArPSBcIi4wXCI7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufSIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19TVFIgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBDT05WRVJUX0lOVDJGTE9BVCB9IGZyb20gXCJzdHJ1Y3RzL0NvbnZlcnRlcnNcIjtcbmltcG9ydCB7IFJFVF9JSkJGMkJPT0wsIFJFVF9JSkJGMkZMT0FULCBSRVRfRkxPQVQsIFJFVF9TVFIgfSBmcm9tIFwic3RydWN0cy9SZXR1cm5UeXBlRmN0c1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9TVFIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9mbG9hdCA9IGFkZFNUeXBlKCd0eXBlW2Zsb2F0XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9GTE9BVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9JTlQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9GTE9BVCB8fCBvdGhlcl90eXBlID09PSBTVFlQRV9JTlQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyX3R5cGU7XG5cbiAgICAgICAgICAgIC8vVE9ETzogcG93ZXIuLi5cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9TVFIgKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcl92YWx1ZSA9IFZBTFVFU1tvdGhlci5pZF07XG5cbiAgICAgICAgICAgICAgICBpZiggb3RoZXIudHlwZV9pZCA9PT0gTElURVJBTFNfU1RSICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXJfdmFsdWUgPT09IFwiaW5mXCIgfHwgb3RoZXJfdmFsdWUgPT09IFwiaW5maW5pdHlcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG90aGVyX3ZhbHVlID09PSBcIi1pbmZcInx8IG90aGVyX3ZhbHVlID09PSBcIi1pbmZpbml0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBwYXJzZUZsb2F0KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ2Zsb2F0Jywge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9mbG9hdCxcblxuICAgIF9fc3RyX186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9TVFIsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvYXQyc3RyKCR7bm9kZX0pYDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnKionLCAnKicsICcvJywgJysnLCAnLSddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF9JTlQyRkxPQVRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnLy8nXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FULFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWyclJ10sIFJFVF9JSkJGMkZMT0FULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBzZWxmLCBvdGhlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKFsndS4tJ10gICAgLCBSRVRfRkxPQVQpLFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULCBSRVRfSUpCRjJCT09MKSxcbn0pOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgbGV0IHZhbHVlID0gVkFMVUVTW25vZGUuaWRdO1xuXG4gICAgaWYoIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApIHtcbiAgICAgICAgd3RgJHt2YWx1ZX1uYDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiggdHlwZW9mIHZhbHVlID09PSBcImJpZ2ludFwiIClcbiAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpOyAvLyByZW1vdmUgdXNlbGVzcyBwcmVjaXNpb24uXG5cbiAgICB3KHZhbHVlKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX0lOVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB2YWx1ZSA9IG5vZGUudmFsdWU7XG5cbiAgICBpZih2YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyA9PT0gXCJpbnRcIilcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZTtcblxuICAgIGlmKCB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImJpZ2ludFwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVhbF90eXBlID0gdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiID8gU1RZUEVfSU5UIDogU1RZUEVfSlNJTlQ7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShMSVRFUkFMU19JTlQsIHJlYWxfdHlwZSk7XG4gICAgXG4gICAgVkFMVUVTW2FzdC5pZF0gPSB2YWx1ZTtcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBpZF9qc29wLCBJbnQyTnVtYmVyLCBOdW1iZXIySW50LCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBDT05WRVJUXzJJTlQsIENPTlZFUlRfSU5UMkZMT0FUIH0gZnJvbSBcInN0cnVjdHMvQ29udmVydGVyc1wiO1xuaW1wb3J0IHsgUkVUX0lKQkYyQk9PTCwgUkVUX0lKQkYyRkxPQVQsIFJFVF9JSjJJTlQsIFJFVF9JTlQsIFJFVF9JTlQySU5ULCBSRVRfU1RSIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQsIFNUWVBFX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9pbnQgPSBhZGRTVHlwZSgndHlwZVtpbnRdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9JTlQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlcjtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyMkludChvdGhlcik7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgIHJldHVybiByYEJpZ0ludChNYXRoLnRydW5jKCR7b3RoZXJ9KSlgO1xuXG4gICAgICAgICAgICAvL1RPRE86IHBvd2VyLi4uXG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfU1RSICkge1xuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoJHtvdGhlcn0pYDsgLy8sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnaW50Jywge1xuXG4gICAgLy9UT0RPOiBmaXggdHlwZS4uLlxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfaW50LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYCR7bm9kZX0udG9TdHJpbmcoKWA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKiAqL1xuICAgIC4uLmdlbkJpbmFyeU9wcyhbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgUkVUX0lKMklOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF8ySU5UXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyonXSwgUkVUX0lOVDJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBhLCBiKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvLyddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyICA6IENPTlZFUlRfMklOVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnJSddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhbJ3UuLSddLCBSRVRfSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCBbJ34nXSwgUkVUX0lOVCksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpXG4gICAgLyogKi9cblxufSk7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF8ySU5ULCBDT05WRVJUX0lOVDJGTE9BVCB9IGZyb20gXCJzdHJ1Y3RzL0NvbnZlcnRlcnNcIjtcbmltcG9ydCB7IFJFVF9JSjJJTlQsIFJFVF9JSkJGMkJPT0wsIFJFVF9JSkJGMkZMT0FULCBSRVRfSU5ULCBSRVRfSlNJTlQsIFJFVF9KU0lOVDJKU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1JldHVyblR5cGVGY3RzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnanNpbnQnLCB7XG5cbiAgICAuLi5nZW5CaW5hcnlPcHMoXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiBDT05WRVJUXzJJTlQsXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlRcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnKiddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhLCBiKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBOdW1iZXIySW50KGEpLCAnKicsIE51bWJlcjJJbnQoYikgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8nXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FUXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8vJ10sIFJFVF9KU0lOVDJKU0lOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyUnXSwgUkVUX0pTSU5UMkpTSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhbJ3UuLSddLCBSRVRfSlNJTlQsIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgTnVtYmVyMkludChhKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoWyd+J10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAgUkVUX0lOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogQ09OVkVSVF8ySU5UXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULCBSRVRfSUpCRjJCT09MKVxuICAgIC8qXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sKi9cbn0pOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICB3dGAnJHtWQUxVRVNbbm9kZS5pZF19J2A7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19TVFIgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUWVBFX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoTElURVJBTFNfU1RSLCBTVFlQRV9TVFIpO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLnZhbHVlO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHN9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUoyU1RSLCBSRVRfSU5ULCBSRVRfU1RSLCBSRVRfU1RSMkJPT0wsIFJFVF9TVFIyU1RSIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX3R5cGVfc3RyID0gYWRkU1R5cGUoJ3R5cGVbc3RyXScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9TVFIsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IG90aGVyLnJlc3VsdF90eXBlXG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gUkVUX1NUUiApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyO1xuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBTVHlwZXNbb3RoZXIucmVzdWx0X3R5cGVdPy5fX3N0cl9fIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgICAgIGlmKCBtZXRob2QgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1NUeXBlc1tvdGhlci5yZXN1bHRfdHlwZV0uX19uYW1lX199Ll9fc3RyX18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ3N0cicsIHtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfc3RyLFxuXG4gICAgX19sZW5fXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAoXykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHtfLmNoaWxkcmVuWzFdfS5sZW5ndGhgO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC4uLmdlbkNtcE9wcyAgIChDTVBPUFNfTElTVCwgUkVUX1NUUjJCT09MKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoW1wiK1wiXSAgICAgICwgUkVUX1NUUjJTVFIpLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbXCIqXCJdICAgICAgLCBSRVRfSUoyU1RSLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyICA6IENPTlZFUlRfSU5UMkZMT0FULFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCBhLnJlc3VsdF90eXBlICE9PSBTVFlQRV9TVFIgKVxuICAgICAgICAgICAgICAgICAgICBbYSxiXSA9IFtiLGFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgJHthfS5yZXBlYXQoJHtifSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbn0pOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICBcbiAgICB3KG5vZGUuY2hpbGRyZW5bMF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDE7ICsraSlcbiAgICAgICAgd3RgID0gJHtub2RlLmNoaWxkcmVuW2ldfWA7XG5cbiAgICBjb25zdCByaWdodF9ub2RlID0gbm9kZS5jaGlsZHJlbltub2RlLmNoaWxkcmVuLmxlbmd0aC0xXTtcbiAgICBsZXQgcmNoaWxkOiBhbnkgPSByaWdodF9ub2RlO1xuXG4gICAgaWYoIHJpZ2h0X25vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UICYmIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgIHJjaGlsZCA9IE51bWJlcjJJbnQocmlnaHRfbm9kZSk7XG5cbiAgICB3dGAgPSAke3JjaGlsZH1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgT1BFUkFUT1JTX19FUSwgU1lNQk9MIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGlmKCAgICBjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIlxuICAgICAgICAmJiB0YXJnZXRzWzBdLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIk5hbWVcIlxuICAgICAgICAmJiAhKHRhcmdldHNbMF0udmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKVxuICAgIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgbGV0IHJpZ2h0X3R5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuXG5cbiAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgIGlmKCByaWdodF90eXBlID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gU1RZUEVfSU5UOyAvLyBwcmV2ZW50cyBpc3N1ZXMuXG4gICAgICAgICAgICAvL1RPRE86IG9ubHkgaWYgYXNzaWduLi4uXG4gICAgfVxuXG4gICAgY29uc3QgbGVmdHMgPSB0YXJnZXRzLm1hcCggKG46YW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobiwgY29udGV4dCApO1xuXG4gICAgICAgIC8vIGNvdWxkIGJlIGltcHJvdmVkIEkgZ3Vlc3MuXG4gICAgICAgIGlmKCBsZWZ0LnR5cGVfaWQgPT09IFNZTUJPTCkge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGNvbnN0IGxzeW0gPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbi5pZF07XG4gICAgICAgICAgICBpZiggbHN5bSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRfdHlwZSA9IGxzeW07XG4gICAgICAgICAgICAgICAgaWYoIGxlZnRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSBsZWZ0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIHt9Ly9jb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoT1BFUkFUT1JTX19FUSwgcmVzdWx0X3R5cGUsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApOyAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgdyhcInZhciBcIik7XG5cbiAgICB3KG5vZGUuY2hpbGRyZW5bMF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDE7ICsraSlcbiAgICAgICAgd3RgID0gJHtub2RlLmNoaWxkcmVuW2ldfWA7XG5cbiAgICBjb25zdCByaWdodF9ub2RlID0gbm9kZS5jaGlsZHJlbltub2RlLmNoaWxkcmVuLmxlbmd0aC0xXTtcbiAgICBsZXQgcmNoaWxkOiBhbnkgPSByaWdodF9ub2RlO1xuXG4gICAgaWYoIHJpZ2h0X25vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UICYmIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgIHJjaGlsZCA9IE51bWJlcjJJbnQocmlnaHRfbm9kZSk7XG5cbiAgICB3dGAgPSAke3JjaGlsZH1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgT1BFUkFUT1JTX19FUV9JTklUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGlmKCAgICBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIlxuICAgICAgICB8fCB0YXJnZXRzWzBdLmNvbnN0cnVjdG9yLiRuYW1lICE9PSBcIk5hbWVcIlxuICAgICAgICB8fCB0YXJnZXRzWzBdLnZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9sc1xuICAgIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgbGV0IHJpZ2h0X3R5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuXG5cbiAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgIGlmKCByaWdodF90eXBlID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gU1RZUEVfSU5UOyAvLyBwcmV2ZW50cyBpc3N1ZXMuXG4gICAgICAgICAgICAvL1RPRE86IG9ubHkgaWYgYXNzaWduLi4uXG4gICAgfVxuXG4gICAgY29uc3QgbGVmdHMgPSB0YXJnZXRzLm1hcCggKG46YW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobiwgY29udGV4dCApO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbi5pZF0gPSByZXN1bHRfdHlwZTtcblxuICAgICAgICByZXR1cm4gbGVmdDtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKE9QRVJBVE9SU19fRVFfSU5JVCwgcmVzdWx0X3R5cGUsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApOyAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBBc3NpZ25PcGVyYXRvcnMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgbGV0IGxlZnQgID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSBub2RlLmNoaWxkcmVuWzFdO1xuXG4gICAgbGV0IG9wID0gQXNzaWduT3BlcmF0b3JzW1ZBTFVFU1tub2RlLmlkXSBhcyBrZXlvZiB0eXBlb2YgQXNzaWduT3BlcmF0b3JzXTtcblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbGVmdC5yZXN1bHRfdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVFlQRV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfT0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG4gICAgICAgIC8qXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgd3IoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0KSApO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgT1BFUkFUT1JTX0JJTkFSWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLnRhcmdldCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUycHluYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQklOQVJZLCBsZWZ0LnJlc3VsdF90eXBlLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IG9wO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF1Z0Fzc2lnblwiXTsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgd3RgJHtub2RlLmNoaWxkcmVuWzBdfVske25vZGUuY2hpbGRyZW5bMV19XWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfX0JSQUNLRVRTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKE9QRVJBVE9SU19fQlJBQ0tFVFMsIDAsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHd0YCR7bm9kZS5jaGlsZHJlblswXX0uJHtWQUxVRVNbbm9kZS5pZF19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19BVFRSIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQVRUUiwgMCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLmF0dHI7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGxldCBsZWZ0ICA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gbm9kZS5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IFNUeXBlc1tsZWZ0LnJlc3VsdF90eXBlXSFbVkFMVUVTW25vZGUuaWRdXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICB3ciggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgbGVmdCwgcmlnaHQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVFlQRV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfQklOQVJZIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUycHluYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbGVmdC5yZXN1bHRfdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBQYXJhbWV0ZXJzPHR5cGVvZiByZXZlcnNlZF9vcGVyYXRvcj5bMF0pO1xuICAgICAgICBtZXRob2QgPSBTVHlwZXNbcmlnaHQucmVzdWx0X3R5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1RZUEVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQklOQVJZLCB0eXBlLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IG9wO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9mbG9hdDogKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCBhL2IgKTtcbiAgICB9LFxuICAgIGZsb29yZGl2X2ludDogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIC0tcmVzdWx0O1xuICAgIH0sXG4gICAgbW9kX2Zsb2F0OiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcblxuICAgICAgICBjb25zdCBtb2QgPSAoYSAlIGIgKyBiKSAlIGI7XG4gICAgICAgIGlmKCBtb2QgPT09IDAgJiYgYiA8IDAgKVxuICAgICAgICAgICAgcmV0dXJuIC0wO1xuICAgICAgICByZXR1cm4gbW9kO1xuICAgIH0sXG4gICAgbW9kX2ludDogPFQ+KGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChhICUgYiArIGIpICUgYjtcbiAgICB9XG59IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbXVsdGlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHdyKCBtdWx0aV9qc29wKG5vZGUsIFZBTFVFU1tub2RlLmlkXSwgLi4ubm9kZS5jaGlsZHJlbikgKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19CT09MRUFOIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuY29uc3QgYm5hbWUyanNvcCA9IHtcbiAgICAnQW5kJzogJyYmJyxcbiAgICAnT3InIDogJ3x8J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUudmFsdWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCApICk7XG5cbiAgICBjb25zdCBvcCAgID0gYm5hbWUyanNvcFtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJqc29wXTtcbiAgICBjb25zdCB0eXBlID0gY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQk9PTEVBTiwgdHlwZSwgY2hpbGRyZW4pO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gb3A7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJvb2xPcFwiXTsiLCJpbXBvcnQgeyB3LCB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmZ1bmN0aW9uIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZShub2RlOiBBU1ROb2RlLCBsZWZ0OkFTVE5vZGUsIG9wOiBzdHJpbmcsIHJpZ2h0OiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IHJldmVyc2VkID0gZmFsc2U7XG4gICAgY29uc3QgcnR5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBjb25zdCBsdHlwZSA9IGxlZnQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgdHlwZSA9IFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gU1R5cGVzW2xlZnQucmVzdWx0X3R5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1RZUEVfTk9UX0lNUExFTUVOVEVEKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3AgYXMgUGFyYW1ldGVyczx0eXBlb2YgcmV2ZXJzZWRfb3BlcmF0b3I+WzBdKTtcbiAgICAgICAgbWV0aG9kID0gU1R5cGVzW3JpZ2h0LnJlc3VsdF90eXBlXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3QgdmFsdWUgPSBWQUxVRVNbbm9kZS5pZF07XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDAgKVxuICAgICAgICAgICAgdygnICYmICcpO1xuXG4gICAgICAgIGNvbnN0IG9wICAgID0gdmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBub2RlLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAgd3IoIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsICc9PT0nLCByaWdodCkgKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwgJyE9PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdyKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgb3AsIHJpZ2h0KSApO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19DT01QQVJFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3Qgb3BzID0gbm9kZS5vcHMubWFwKCAoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wID0gYm5hbWUycHluYW1lW2UuY29uc3RydWN0b3IuJG5hbWUgYXMga2V5b2YgdHlwZW9mIGJuYW1lMnB5bmFtZV07XG4gICAgICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UuY29uc3RydWN0b3IuJG5hbWV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVmdCAgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0cyA9IG5vZGUuY29tcGFyYXRvcnMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoT1BFUkFUT1JTX0NPTVBBUkUsIFNUWVBFX0JPT0wsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAuLi5yaWdodHMsXG4gICAgICAgIF1cbiAgICApO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBvcHM7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX0pTSU5ULCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbGVmdCAgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IHZhbHVlID0gVkFMVUVTW25vZGUuaWRdO1xuXG4gICAgaWYoIHZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHdyKCB1bmFyeV9qc29wKG5vZGUsICchJywgSW50Mk51bWJlcihsZWZ0LCBTVFlQRV9KU0lOVCkgKSApO1xuXG4gICAgY29uc3QgbWV0aG9kID0gU1R5cGVzW2xlZnQucmVzdWx0X3R5cGUhXVt2YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgd3IoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0JPT0wsIFNUWVBFX05PVF9JTVBMRU1FTlRFRCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19VTkFSWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLm9wZXJhbmQgLCBjb250ZXh0ICk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUycHluYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgaWYoIG9wID09PSAnbm90Jykge1xuICAgICAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfVU5BUlksIFNUWVBFX0JPT0wsIFsgbGVmdCBdICk7XG4gICAgICAgIFxuICAgICAgICBWQUxVRVNbYXN0LmlkXSA9IFwibm90XCI7XG4gICAgICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgICAgICByZXR1cm4gYXN0O1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbGVmdC5yZXN1bHRfdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKE9QRVJBVE9SU19VTkFSWSwgdHlwZSwgWyBsZWZ0IF0gKTtcbiAgICBWQUxVRVNbYXN0LmlkXSA9IG9wO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIik7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBQQVNTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFBBU1MpO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdyhcInJldHVybiBudWxsXCIpO1xuXG4gICAgcmV0dXJuIHd0YHJldHVybiAke25vZGUuY2hpbGRyZW5bMF19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFJFVFVSTiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9OT05FVFlQRSwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBjb250ZXh0LnBhcmVudF9ub2RlX2NvbnRleHRcbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBTVFlQRV9OT05FVFlQRTtcbiAgICBsZXQgY2hpbGRyZW4gICAgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgICAgIHJlc3VsdF90eXBlID0gZXhwci5yZXN1bHRfdHlwZSE7XG4gICAgICAgIGNoaWxkcmVuICAgID0gW2V4cHJdO1xuICAgIH1cblxuICAgIGNvbnN0IG1ldGEgPSAoU1R5cGVzW2NvbnRleHQucGFyZW50X25vZGVfY29udGV4dCEucmVzdWx0X3R5cGVdIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcbiAgICBpZiggbWV0YS5yZXR1cm5fdHlwZSA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSA9ICgpID0+IHJlc3VsdF90eXBlO1xuICAgIFxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFJFVFVSTiwgcmVzdWx0X3R5cGUsIGNoaWxkcmVuKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcoJ3snKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3dGAke25vZGUuY2hpbGRyZW5bMF19OiAke25vZGUuY2hpbGRyZW5bMV19YDtcblxuICAgIGZvcihsZXQgaSA9IDI7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSs9MilcbiAgICAgICAgd3RgLCAke25vZGUuY2hpbGRyZW5baV19OiAke25vZGUuY2hpbGRyZW5baSsxXX1gO1xuXG4gICAgdygnfScpO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgU1RSVUNUU19ESUNUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXkobm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGRyZW5bMippXSAgID0gY29udmVydF9ub2RlKG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW5bMippKzFdID0gY29udmVydF9ub2RlKG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShTVFJVQ1RTX0RJQ1QsIDAsIGNoaWxkcmVuICk7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiW1wiKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3KG5vZGUuY2hpbGRyZW5bMF0pO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCBub2RlLmNoaWxkcmVuW2ldKTtcblxuICAgIHcoXCJdKVwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFNUUlVDVFNfTElTVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoU1RSVUNUU19MSVNULCAwLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApOyAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTGlzdFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhcIk9iamVjdC5mcmVlemUoW1wiKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3KG5vZGUuY2hpbGRyZW5bMF0pO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCBub2RlLmNoaWxkcmVuW2ldKTtcblxuICAgIHcoXCJdKVwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFNUUlVDVFNfVFVQTEUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFNUUlVDVFNfVFVQTEUsIDAsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoIFZBTFVFU1tub2RlLmlkXSApO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNZTUJPTCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IDA7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJzsgLy9UT0RPIHR5cGUgb2YgY3VycmVudCBjb250ZXh0ICEgLT4gc2VsZiBpbiBsb2NhbF9zeW1ib2xzID9cbiAgICBlbHNlIGlmKCB2YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW3ZhbHVlXTtcblxuICAgIC8qXG4gICAgICAgIC8vVE9ETyBnbG9iYWxTeW1ib2xzXG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG4gICAgKi9cblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFNZTUJPTCwgcmVzdWx0X3R5cGUpO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gdmFsdWU7XG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBjb25zdCBBUlJBWV9UWVBFICAgPSBGbG9hdDY0QXJyYXk7XG5jb25zdCBNQVhfTkJfVE9LRU4gPSAxMDU7XG5cbmV4cG9ydCBjb25zdCBDT0RFX0xJTkUgPSAwO1xuZXhwb3J0IGNvbnN0IENPREVfQ09MICA9IDE7XG5leHBvcnQgY29uc3QgQ09ERV9CRUcgID0gMDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORCAgPSAyO1xuZXhwb3J0IGNvbnN0IENPREVfQkVHX0xJTkUgPSBDT0RFX0JFRyArIENPREVfTElORTtcbmV4cG9ydCBjb25zdCBDT0RFX0JFR19DT0wgID0gQ09ERV9CRUcgKyBDT0RFX0NPTDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORF9MSU5FID0gQ09ERV9FTkQgKyBDT0RFX0xJTkU7XG5leHBvcnQgY29uc3QgQ09ERV9FTkRfQ09MICA9IENPREVfRU5EICsgQ09ERV9DT0w7XG5cbmV4cG9ydCBjb25zdCBQWV9DT0RFID0gbmV3IEFSUkFZX1RZUEUoNCpNQVhfTkJfVE9LRU4pO1xuZXhwb3J0IGNvbnN0IEpTX0NPREUgPSBuZXcgQVJSQVlfVFlQRSg0Kk1BWF9OQl9UT0tFTik7XG5cbi8vVE9ETzogaW5kaXJlY3Rpb24gb3UgcGFyIElELi4uXG5leHBvcnQgY29uc3QgVkFMVUVTID0gbmV3IEFycmF5PGFueT4oKTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb3BfcmVzZXQoKSB7XG4gICAgVkFMVUVTLmxlbmd0aCA9IDA7XG4gICAgQVNUTm9kZS5ORVhUX0FTVF9OT0RFX0lEID0gMDtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IHsgQVNUX0NPTlZFUlQgfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgZ2V0U1R5cGVJRCwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCBkb3BfcmVzZXQgZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgUkVUX0lOVCwgUkVUVVJOX1RZUEVfRkNUIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcblxuZXhwb3J0IHR5cGUgQVNUID0ge1xuICAgIGJvZHkgICAgOiBBU1ROb2RlLFxuICAgIGZpbGVuYW1lOiBzdHJpbmdcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgbnVtYmVyW10+ID0ge31cblxuZm9yKGxldCBpID0gMCA7IGkgPCBBU1RfQ09OVkVSVC5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQVNUX0NPTlZFUlRbaV07XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZSkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5icnl0aG9uX25hbWUpIClcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLmJyeXRob25fbmFtZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLmJyeXRob25fbmFtZSBhcyBzdHJpbmddXG4gICAgfVxuXG4gICAgZm9yKGxldCBuYW1lIG9mIG5hbWVzKVxuICAgICAgICAobW9kdWxlc1tuYW1lXSA/Pz0gW10pLnB1c2goaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblxuXHRyZXR1cm4ge1xuICAgICAgICBib2R5OiBjb252ZXJ0X2FzdChfYXN0KSxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgZG9wX3Jlc2V0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBjb252ZXJ0X25vZGUoYXN0LmJvZHksIG5ldyBDb250ZXh0KCkgKTtcblxuICAgIC8qZnVuY3Rpb24gY291bnQobm9kZTogQVNUTm9kZSkge1xuXG4gICAgICAgIGxldCBzdW0gPSAxOyAvLyBjb3VudCBteXNlbGZcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kgKVxuICAgICAgICAgICAgc3VtICs9IGNvdW50KG5vZGUuY2hpbGRyZW5baV0pO1xuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4oIGNvdW50KHJlc3VsdCkgKTsqL1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG5cbiAgICAvLyBsaWtlbHkgYSBib2R5LlxuICAgIGlmKCBBcnJheS5pc0FycmF5KGJyeXRob25fbm9kZSkgKVxuICAgICAgICByZXR1cm4gXCJCb2R5XCI7XG5cbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZihuYW1lID09PSBcIkV4cHJcIikge1xuICAgICAgICBicnl0aG9uX25vZGUgPSBicnl0aG9uX25vZGUudmFsdWU7XG4gICAgICAgIG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBtb2R1bGVzW25hbWVdO1xuXG4gICAgaWYoIGNhbmRpZGF0ZXMgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gQVNUX0NPTlZFUlRbY2FuZGlkYXRlc1tpXV0oYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IElEID0gY2FuZGlkYXRlc1tpXTtcbiAgICAgICAgICAgIHJlc3VsdC50eXBlX2lkID0gSUQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0ID0gUm9vdENvbnRleHQpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTsgLy9UT0RPOiByZW1vdmVcbiAgICAgICAgdGhpcy5sb2NhbF9zeW1ib2xzID0gey4uLnBhcmVudF9jb250ZXh0LmxvY2FsX3N5bWJvbHN9O1xuICAgIH1cblxuICAgIHR5cGU7IC8vVE9ETzogcmVtb3ZlXG5cbiAgICBwYXJlbnRfbm9kZV9jb250ZXh0PzogQVNUTm9kZTsgXG5cbiAgICBsb2NhbF9zeW1ib2xzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xufVxuXG5jb25zdCB0eXBlX2ZjdCA9IHt9IC8qIGZjdCBjbGFzcyA9PiB0eXBlIGNsYXNzICovXG5cbi8vVE9ETzogbW92ZS4uLlxuLy9UT0RPOiBiaW5hcnkvdW5hcnlcbi8vVE9ETzogcmVtb3ZlIHJldHVybl90eXBlIChnZXQgZnJvbSB0aGUgX197bmFtZX1fXylcbmZ1bmN0aW9uIGdlblVuYXJ5T3BGY3QobmFtZTogc3RyaW5nLCByZXR1cm5fdHlwZTogUkVUVVJOX1RZUEVfRkNUKSB7XG4gICAgY29uc3Qgb3BuYW1lID0gYF9fJHtuYW1lfV9fYDtcbiAgICByZXR1cm4ge1xuICAgICAgICBfX2NsYXNzX186IHR5cGVfZmN0LFxuICAgICAgICBfX25hbWVfXyA6IG5hbWUsXG4gICAgICAgIF9fY2FsbF9fIDoge1xuICAgICAgICAgICAgLy9UT0RPOiBJIG5lZWQgYSBzZWxmLi4uXG4gICAgICAgICAgICByZXR1cm5fdHlwZSAgICA6IHJldHVybl90eXBlLFxuICAgICAgICAgICAgLy8gbm90IHJlYWxseSA6P1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAoY2FsbDogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBjYWxsLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IFNUeXBlc1tsZWZ0LnJlc3VsdF90eXBlXSFbb3BuYW1lXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKGNhbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vL1RPRE86IG5vdCBhIHR5cGUgISEhXG5jb25zdCBsZW4gPSBhZGRTVHlwZShcImxlblwiLCBnZW5VbmFyeU9wRmN0KFwibGVuXCIsIFJFVF9JTlQpKTtcblxuLy8gYnVpbHRpbiBzeW1ib2xzLlxuLy8gQHRzLWlnbm9yZVxuY29uc3QgUm9vdENvbnRleHQ6IENvbnRleHQgPSB7XG4gICAgdHlwZTogXCI/XCIgYXMgY29uc3QsXG4gICAgbG9jYWxfc3ltYm9sczoge1xuICAgICAgICBpbnQgIDogZ2V0U1R5cGVJRCgndHlwZVtpbnRdJyksXG4gICAgICAgIHN0ciAgOiBnZXRTVHlwZUlEKCd0eXBlW3N0cl0nKSxcbiAgICAgICAgZmxvYXQ6IGdldFNUeXBlSUQoJ3R5cGVbZmxvYXRdJyksXG4gICAgICAgIGxlbixcblxuICAgICAgICAvLyBhZGQgZnVuY3Rpb25zIGxpa2UgbGVuKCkgLyBwb3coKSAvIGRpdm1vZCgpXG4gICAgfVxufSBzYXRpc2ZpZXMgQ29udGV4dDsiLCIvLyBAdHMtbm9jaGVja1xuXG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGluZSAgOiBudW1iZXIsXG4gICAgbGluZV9vZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBub2RlcyA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuXG4gICAgbGV0IGN1cnNvciA9IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBsaW5lX29mZnNldCA6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNoYXI7XG4gICAgZG8ge1xuICAgICAgICBub2Rlcy5wdXNoKCBwYXJzZUV4cHJlc3Npb24oY29kZSwgY3Vyc29yKSBhcyBhbnkpO1xuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgd2hpbGUoIGNoYXIgPT09ICdcXG4nICkge1xuICAgICAgICAgICAgY2hhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgfSB3aGlsZSggY2hhciAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdC8vY29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlcyxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfY29udmVydCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN5bWJvbChjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnYScgJiYgY2FyIDw9ICd6JyB8fCBjYXIgPj0gJ0EnICYmIGNhciA8PSAnWicgfHwgY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIHx8IGNhciA9PSAnXycgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgY29uc3Qgc3ltYm9sID0gY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpO1xuXG4gICAgLy9UT0RPOiBpZiBrZXl3b3JkLi4uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJzeW1ib2xcIixcbiAgICAgICAgdmFsdWUgICA6IHN5bWJvbCwgLy9UT0RPOiBjZiBjb252ZXJ0IChzZWFyY2ggaW4gbG9jYWwgdmFyaWFibGVzL0NvbnRleHQuLi4pXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2NvbnZlcnRcbiAgICB9O1xufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX2ludCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU51bWJlcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgLy9UT0RPOiByZWFsLi4uXG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLmludFwiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19pbnQsXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX3N0ciBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnXCInICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgKytjdXJzb3Iub2Zmc2V0O1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLnN0cmluZ1wiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19zdHIsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGxldCBsZWZ0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIGlmKCBjaGFyID09PSAnXFxuJylcbiAgICAgICAgcmV0dXJuIGxlZnQ7XG5cbiAgICBsZXQgb3AgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgb3AhLmNoaWxkcmVuWzBdID0gbGVmdDtcbiAgICBvcC5weWNvZGUuc3RhcnQgPSBsZWZ0LnB5Y29kZS5zdGFydDtcblxuICAgIGxldCB2YWx1ZXMgPSBbb3AsIHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKV07XG5cbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciAhPT0gJ1xcbicgKSB7XG5cbiAgICAgICAgbGV0IG9wMiAgID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG5cbiAgICAgICAgbGV0IG9wMSAgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXTtcbiAgICAgICAgbGV0IGxlZnQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcblxuICAgICAgICAvL1RPRE86IGhhbmRsZSBvcCBwcmlvcml0eS4uLlxuICAgICAgICAvLyAoYStiKStjXG5cbiAgICAgICAgLy8gKGErYilcbiAgICAgICAgb3AxIS5jaGlsZHJlblsxXSA9IGxlZnQ7XG4gICAgICAgIG9wMSEucHljb2RlLmVuZCAgPSBsZWZ0LnB5Y29kZS5lbmQ7IFxuXG4gICAgICAgIC8vICgpK2NcbiAgICAgICAgb3AyIS5jaGlsZHJlblswXSA9IG9wMTtcbiAgICAgICAgb3AyLnB5Y29kZS5zdGFydCA9IG9wMS5weWNvZGUuc3RhcnQ7XG5cbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl0gPSBvcDI7XG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdID0gcmlnaHQ7XG5cbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgfVxuXG4gICAgdmFsdWVzWzBdIS5jaGlsZHJlblsxXSA9IHZhbHVlc1sxXTtcbiAgICB2YWx1ZXNbMF0hLnB5Y29kZS5lbmQgID0gdmFsdWVzWzFdLnB5Y29kZS5lbmQ7XG5cbiAgICByZXR1cm4gdmFsdWVzWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdG9yKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldCsrXTtcbiAgICAvKlxuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICcnICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdOyovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJvcGVyYXRvcnMuXCIgKyBjaGFyLFxuICAgICAgICB2YWx1ZSAgIDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IENPUkVfTU9EVUxFU1tcIm9wZXJhdG9ycy5cIiArIGNoYXJdLkFTVDJKUyxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgLy8gaWdub3JlIHdoaXRlc3BhY2VcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgPT09ICcgJyB8fCBjaGFyID09PSAnXFx0JyApXG4gICAgICAgIGNoYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgLy8gaWdub3JlIGNoYXJcbiAgICBpZiggY2hhciA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSBudWxsXG4gICAgaWYoIGNoYXIgPT09ICdcIicpXG4gICAgICAgIG5vZGUgPSBwYXJzZVN0cmluZyhjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ3onIHx8IGNoYXIgPj0gJ0EnICYmIGNoYXIgPD0gJ1onIHx8IGNoYXIgPT0gJ18nIClcbiAgICAgICAgbm9kZSA9IHBhcnNlU3ltYm9sKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIG5vZGUgPSBwYXJzZU51bWJlcihjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZSA9IHBhcnNlT3BlcmF0b3IoY29kZSwgY3Vyc29yKTtcbiAgICAgICAgLy87IHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hlbiBwYXJzaW5nICR7Y2hhcn0gYXQgJHtjdXJzb3IubGluZX06JHtjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0fSAoJHtjdXJzb3Iub2Zmc2V0fSlgKTtcblxuICAgIG5vZGUucHljb2RlID0ge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RPRE86IGlzIG5leHQgYW4gb3BlcmF0b3IgPyAtPiBjb25zdHJ1aXJlIGFyYnJlLi4uXG4gICAgLy9UT0RPIGhhbmRsZSBvcGVyYXRvcnMgP1xuXG4gICAgcmV0dXJuIG5vZGU7XG5cbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBfcl99IGZyb20gXCIuL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHtfYl99IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5leHBvcnQge19iXywgX3JffTtcblxuLy8gY2xhc3NlID9cblxuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIGJ1aWxkTW9kdWxlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coanNjb2RlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICB9XG5cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSB0aGlzLmJ1aWxkTW9kdWxlKGpzY29kZSwgYXN0KSh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIHtcblxuXHRzdGF0aWMgTkVYVF9BU1RfTk9ERV9JRCA9IDA7XG5cblx0aWQgICAgICAgICA6IG51bWJlcjtcblx0dHlwZV9pZCAgICA6IG51bWJlcjsgLy8gbm9kZV90eXBlX2lkICghISEpXG5cdHJlc3VsdF90eXBlOiBudW1iZXIgPSAwOyAvL1RPRE86IG51bWJlciB0aGVuIHR5cGUgc3lzdGVtLi4uXG5cblx0Ly8gc29vbiBeXlxuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107IC8vIHVzZSBpZC4uLi5cblxuXHRjb25zdHJ1Y3Rvcih0eXBlX2lkOiBudW1iZXIsIHJlc3VsdF90eXBlOiBudW1iZXIgPSAwLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMuaWQgPSBBU1ROb2RlLk5FWFRfQVNUX05PREVfSUQrKztcblx0XHR0aGlzLnR5cGVfaWQgPSB0eXBlX2lkO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHRcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwiLi9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlR9IGZyb20gXCIuL1NUeXBlc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfSU5UIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udmVydGVyLCBOT0NPTlZFUlQgfSBmcm9tIFwiLi9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRVUk5fVFlQRV9GQ1QgfSBmcm9tIFwiLi9SZXR1cm5UeXBlRmN0c1wiO1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG5leHBvcnQgY29uc3QgQXNzaWduT3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19pcG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19pbXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19pdHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19faWZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19pbW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19faWFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19pc3ViX18nLFxuXG4gICAgJ19fb3JfXycgICAgIDogJ19faW9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX2lhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19faXhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19pbHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX2lyc2hpZnRfXycsXG59XG5cblxuZXhwb3J0IGNvbnN0IGpzb3AycHlvcCA9IHtcbiAgICAnKionOiAncG93JyxcbiAgICAnKicgOiAnbXVsJyxcbiAgICAnLycgOiAndHJ1ZWRpdicsXG4gICAgJy8vJzogJ2Zsb29yZGl2JyxcbiAgICAnJScgOiAnbW9kJyxcbiAgICBcbiAgICAnKycgIDogJ2FkZCcsXG4gICAgJy0nICA6ICdzdWInLFxuICAgICd1Li0nOiAnbmVnJyxcblxuICAgICc9PScgOiAnZXEnLFxuICAgICchPScgOiAnbmUnLFxuICAgICc8JyAgOiAnbHQnLFxuICAgICc8PScgOiAnbGUnLFxuICAgICc+PScgOiAnZ2UnLFxuICAgICc+JyAgOiAnZ3QnLFxuXG4gICAgJ34nIDogJ25vdCcsXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWychJywgJysrJywgJy0tJywgJ34nLCAndS4tJ10sXG4gICAgWycqKiddLCAvLyByaWdodCB0byBsZWZ0ICFcbiAgICBbJyonLCAnLycsICclJ10sIC8vIFB5dGhvbiBhbHNvIGhhcyAvL1xuICAgIFsnKycsICctJ10sXG4gICAgWyc8PCcsICc+PicsICc+Pj4nXSwgLy9UT0RPXG4gICAgWyc8JywgJzw9JywgJz49JywgJz4nXSxcbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJyYnXSwgIC8vVE9ET1xuICAgIFsnXiddLCAgLy9UT0RPXG4gICAgWyd8J10sICAvL1RPRE9cbiAgICBbJyYmJ10sIC8vVE9ET1xuICAgIFsnfHwnLCAnPz8nXSxcbiAgICBbJz0nXSAvKiBldCB0b3VzIGxlcyBkw6lyaXbDqXMgKi8gLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgLy8gZXRjLlxuXTtcblxuLypcbmh0dHBzOi8vZG9jcy5weXRob24ub3JnLzMvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNjYWxsYWJsZVxuXG4tPiBjbGFzc2VzXG5ib29sKClcbmZsb2F0KClcbmludCgpXG5zdHIoKVxuYnl0ZWFycmF5KCkgW1VpbnQ4QXJyYXldIChSVylcbmJ5dGVzKCkgICAgIFs/XSAgICAgICAgICAoUk8pIDwtIG5vIHR5cGVzIGluIEpTLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LSBVaW50OEFycmF5IHdpdGggZmxhZyA/IGZyZWV6ZSgpIFtKUyB1bnNhZmVdXG4gICAgICAgICAgICBiXCJlXFx4RkZcIiBpbnN0ZWFkIG9mIFsxMDEsMTAxXSwgZXRjLiAoMzIgPD0gYnl0IDw9IDEyNilcbnR5cGUoKVxubGlzdCgpICAgICAgW0FycmF5XVxudHVwbGUoKSAgICAgW09iamVjdC5mcm96ZW4oQXJyYXkpXVxuXG5zZXQoKSAgICAgICAvLyByZWxpZXMgb24gaGFzaCgpLi4uID0+IHNldFtsaXRlcmFsc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBzZXQoKSAvIDwtIEpTIHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgPT4gYnl0ZXMvYnl0ZWFycmF5L2V0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IFNldCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IEludGVybmFsIGtleXMoKSBzZXQgW3JlY29tcHV0ZSBoYXNoIHdoZW4gYWRkL3JlbW92ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbnRlcm5hbGx5IHN0b3JlZCBhcyBNYXAoaGFzaCwgdmFsdWUpICg/KVxuZnJvemVuc2V0KCkgICAgICAgICAgICA9PiBleHRlbmRzIHNldCB0byByZXBsYWNlIG1vZGlmaWVycy5cblxuZGljdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3N0cl0gYXMgT2JqZWN0LmNyZWF0ZShudWxsKSArIChhbmQgcHVyZSBKU09iaiBhcyBkaWN0W3N0cl0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBNYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IFNldChoYXNoKSAvIE1hcChoYXNoLCBrZXkpIC8gTWFwKGtleSwgaGFzaCkgPz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldC9zZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gTWFwKGtleSwgdmFsdWUpXG5cbm9iamVjdCgpXG5jb21wbGV4KClcbm1lbW9yeXZpZXcoKSAgICAgICAgICAgID0+IEFycmF5QnVmZmVyID9cblxuLT4gcHJpbnRcbmFzY2lpKClcbmJpbigpXG5oZXgoKVxub2N0KClcbnJlcHIoKVxuaGFzaCgpXG5cbi0+IG1hdGhzXG5hYnMoKVxuZGl2bW9kKClcbnBvdygpXG5yb3VuZCgpXG5cbi0+IGxpc3RzXG5hbGwoKVxuYW55KClcbmZpbHRlcigpXG5tYXAoKVxubWF4KClcbm1pbigpXG5zdW0oKVxubGVuKClcbmVudW1lcmF0ZSgpXG5yZXZlcnNlZCgpXG5zbGljZSgpXG5zb3J0ZWQoKVxuemlwKClcblxuLT4gaXRlclxucmFuZ2UoKVxuYWl0ZXIoKVxuaXRlcigpXG5hbmV4dCgpXG5uZXh0KClcblxuLT4gc3RyXG5vcmQoKVxuY2hyKClcbmZvcm1hdCgpXG5wcmludCgpXG5mXCJcIlxuXG5jYWxsYWJsZSgpXG5jbGFzc21ldGhvZCgpXG5zdGF0aWNtZXRob2QoKVxucHJvcGVydHkoKVxuc3VwZXIoKVxuaXNpbnN0YW5jZSgpXG5pc3N1YmNsYXNzKClcbmRlbGF0dHIoKVxuZ2V0YXR0cigpXG5oYXNhdHRyKClcbnNldGF0dHIoKVxuZGlyKClcblxuZXZhbCgpXG5leGVjKClcbmNvbXBpbGUoKVxuYnJlYWtwb2ludCgpXG5cbmdsb2JhbHMoKVxubG9jYWxzKClcbnZhcnMoKVxuX19pbXBvcnRfXygpXG5cbmlkKClcbiAgICAtPiBvbi1kZW1hbmQgd2Vha3JlZiA/XG5cbmhlbHAoKVxuaW5wdXQoKVxub3BlbigpXG5cbiovXG5cbi8qXG51bmFyeVxuLSBwb3MgKHVuYXJ5ICspXG5cbi0gYm9vbFxuLSBmbG9hdFxuLSBpbnRcbi0gc3RyXG4tIHJlcHJcblxuLSBhYnNcbi0gY2VpbFxuLSBmbG9vclxuLSByb3VuZFxuLSB0cnVuY1xuXG5iaW5hcnlcbi0gcG93L3Jwb3dcbi0gZGl2bW9kL3JkaXZtb2RcblxuY2xhc3Ncbi0gY2xhc3Ncbi0gbmV3XG4tIGluaXRcbi0gaW5pdF9zdWJjbGFzc1xuXG4tIHN1YmNsYXNzaG9vayAvLyBfX2lzaW5zdGFuY2VjaGVja19fIFxuXG4tIGRpclxuLSBkZWxhdHRyXG4tIHNldGF0dHJcbi0gZ2V0YXR0cmlidXRlXG5cbi0gZG9jXG4tIGZvcm1hdFxuLSBnZXRuZXdhcmdzXG4tIGhhc2hcbi0gaW5kZXggKD8pXG4tIHNpemVvZlxuKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gSW50Mk51bWJlcihhOiBBU1ROb2RlLCB0YXJnZXQgPSBTVFlQRV9GTE9BVCkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGVfaWQgPT09IExJVEVSQUxTX0lOVCkge1xuICAgICAgICAvLyBpZiBiaWdpbnQgY2FuJ3Qgc2FmZWx5IGNvbnZlcnQgdG8gSlNJTlQuXG4gICAgICAgIGlmKCB0YXJnZXQgPT09IFNUWVBFX0ZMT0FUIClcbiAgICAgICAgICAgIGEucmVzdWx0X3R5cGUgPSBTVFlQRV9KU0lOVDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgY29uc3QgYV92YWx1ZSA9IFZBTFVFU1thLmlkXTtcblxuICAgIGlmKCBhX3ZhbHVlID09PSAnX19tdWxfXycgfHwgYV92YWx1ZSA9PT0gJ19fcm11bF9fJyApIHtcbiAgICAgICAgY29uc3QgbHR5cGUgPSBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuICAgICAgICBjb25zdCBydHlwZSA9IGEuY2hpbGRyZW5bMV0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGlmKCAgICAobHR5cGUgPT09IFNUWVBFX0lOVCB8fCBsdHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09IFNUWVBFX0lOVCB8fCBydHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgYS5yZXN1bHRfdHlwZSA9IHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCBhX3ZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UKSB7XG4gICAgICAgIGEucmVzdWx0X3R5cGUgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgIHJldHVybiByYE51bWJlcigke2F9KWA7XG5cbiAgICAvLyBpbnQgLT4ganNpbnQgY2FzdCBpcyBmYWN1bHRhdGl2ZS4uLlxuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTnVtYmVyMkludChhOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGVfaWQgPT09IExJVEVSQUxTX0lOVCkge1xuICAgICAgICBhLnJlc3VsdF90eXBlID0gU1RZUEVfSU5UOyAvLyBmb3JjZSBiaWdpbnQgY29udmVydGlvblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIFZBTFVFU1thLmlkXSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UKSB7XG4gICAgICAgIGEucmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gSlNPcGVyYXRvcnMubGVuZ3RoIC0gaTtcbiAgICBmb3IobGV0IG9wIG9mIEpTT3BlcmF0b3JzW2ldKVxuICAgICAgICBKU09wZXJhdG9yc1ByaW9yaXR5W29wXSA9IHByaW9yaXR5O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlZF9vcGVyYXRvcjxUIGV4dGVuZHMga2V5b2YgdHlwZW9mIEJpbmFyeU9wZXJhdG9ycz4ob3A6IFQpIHtcbiAgICByZXR1cm4gQmluYXJ5T3BlcmF0b3JzW29wXTtcbn1cblxuY29uc3QgTEVGVCAgPSAxO1xuY29uc3QgUklHSFQgPSAyO1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCAuLi52YWx1ZXM6IEFTVE5vZGVbXSkge1xuXG4gICAgY29uc3QgZmlyc3QgPSB2YWx1ZXNbMF07XG4gICAgaWYoZmlyc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVHxSSUdIVDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICBpZihsYXN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2ZpcnN0fWA7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGg7ICsraSlcbiAgICAgICAgcmVzdWx0ID0gcmAke3Jlc3VsdH0gJiYgJHt2YWx1ZXNbaV19YDtcblxuICAgIGlmKCBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIG51bGwgb3BlcmF0aW9uLCB0aGUgbm9kZSBoYXMgdGhlIHNhbWUgcHJpb3JpdHkgYXMgaGlzIGZhdGhlci5cbi8vIDIqaW50KDErMSkgPT4gMiooMSsxKVxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuXG4gICAgLy9pZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgIC8vfVxuXG4gICAgcmV0dXJuIHJgJHthfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlfGFueSwgb3A6IHN0cmluZywgYjogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtvcH0ke2F9YDtcblxuICAgIGlmKG9wID09PSAnLScpXG4gICAgICAgIG9wID0gJ3UuLSc7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCAoZGlyZWN0aW9uICYgTEVGVCkgJiYgcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgID86IENvbnZlcnRlcixcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMob3BzICAgICAgICA6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlblVuYXJ5T3BzX09wdHMgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICd1Li0nKVxuICAgICAgICAgICAgb3AgPSAnLSc7XG5cbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsID8/PSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbnR5cGUgR2VuQmluYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9vdGhlciAgID86IENvbnZlcnRlcixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogQ29udmVydGVyLFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKG9wczogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3R5cGU6IFJFVFVSTl9UWVBFX0ZDVCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IE5PQ09OVkVSVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30pIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252ZXJ0X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZlcnRfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZlcnRfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IE5PQ09OVkVSVCAmJiBzdWJzdGl0dXRlX2NhbGwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlc3VsdFtgX19pJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyX3ZhbHVlID0gVkFMVUVTW290aGVyLmlkXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICcrJyAmJiBvdGhlcl92YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICcrKycsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICctJyAmJiBvdGhlcl92YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctLScsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIHNlbGYsIG9wKyc9JywgY29udmVydF9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IENNUE9QU19MSVNUID0gWyc9PScsICchPScsICc+JywgJzwnLCAnPj0nLCAnPD0nXSBhcyBjb25zdDtcblxuY29uc3QgcmV2ZXJzZSA9IHtcbiAgICBcIj09XCI6IFwiPT1cIixcbiAgICBcIiE9XCI6IFwiIT1cIixcbiAgICBcIj5cIjogXCI8XCIsXG4gICAgXCI8XCI6IFwiPlwiLFxuICAgIFwiPj1cIjogXCI8PVwiLFxuICAgIFwiPD1cIjogXCI+PVwiLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkNtcE9wcyggIG9wcyAgICAgICAgOiByZWFkb25seSAoa2V5b2YgdHlwZW9mIHJldmVyc2UpW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3R5cGU6IFJFVFVSTl9UWVBFX0ZDVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IE5PQ09OVkVSVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gTk9DT05WRVJULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30gKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb3AgPSBvcDtcblxuICAgICAgICAgICAgbGV0IGEgPSBjb252ZXJ0X3NlbGYoc2VsZik7XG4gICAgICAgICAgICBsZXQgYiA9IGNvbnZlcnRfb3RoZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIHJldmVyc2VkICkge1xuICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYucmVzdWx0X3R5cGUgPT09IG90aGVyLnJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb3AgPSBjb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCBjb3AsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udmVydF9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIE51bWJlcjJJbnQgfSBmcm9tIFwiLi9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0ZMT0FULCBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5cbnR5cGUgUHJpbnRhYmxlID0geyB0b1N0cmluZygpOiBzdHJpbmcgfTtcblxuZXhwb3J0IHR5cGUgQ29udmVydGVyID0gKG5vZGU6IEFTVE5vZGUpID0+IEFTVE5vZGUgfCBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLihBU1ROb2RlIHwgUHJpbnRhYmxlKVtdXTtcblxuZXhwb3J0IGNvbnN0IE5PQ09OVkVSVCA9IChub2RlOiBBU1ROb2RlKSA9PiBub2RlO1xuXG5leHBvcnQgY29uc3QgQ09OVkVSVF9JTlQyRkxPQVQgPSAobm9kZTogQVNUTm9kZSkgPT4ge1xuXG4gICAgaWYoIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG5vZGUsIFNUWVBFX0ZMT0FUKTtcblxuICAgIHJldHVybiBub2RlOyAvLyBhbHJlYWR5IGEgbnVtYmVyLi4uXG59XG5cbmV4cG9ydCBjb25zdCBDT05WRVJUXzJJTlQgPSAobm9kZTogQVNUTm9kZSkgPT4ge1xuICAgIC8vaWYoIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgLy8gICAgcmV0dXJuIG5vZGU7XG5cbiAgICByZXR1cm4gTnVtYmVyMkludChub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBudW1iZXJbXSkge1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb252ZXJ0Lmxlbmd0aDsgaSs9MilcbiAgICAgICAgdGFibGVbY29udmVydFtpXV0gPSBjb252ZXJ0W2krMV07XG5cbiAgICByZXR1cm4gKG5vZGU6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3JjICAgID0gbm9kZS5yZXN1bHRfdHlwZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGFibGVbc3JjXTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICAgIC8vVE9ETzogaW1wcm92ZTpcbiAgICAgICAgaWYoIHNyYyA9PT0gU1RZUEVfSU5UKVxuICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIobm9kZSwgdGFyZ2V0KTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufSIsImltcG9ydCB7IFNUWVBFX05PVF9JTVBMRU1FTlRFRCwgU1RZUEVfQk9PTCwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfU1RSLCBTVFlQRV9KU0lOVCB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG5leHBvcnQgdHlwZSBSRVRVUk5fVFlQRV9GQ1QgPSAobzogbnVtYmVyKSA9PiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUpCRjJCT09MKG86IG51bWJlcikge1xuICAgIGlmKCBTVFlQRV9JTlQgPD0gbyAmJiBvIDw9IFNUWVBFX0ZMT0FUKVxuICAgICAgICByZXR1cm4gU1RZUEVfQk9PTDtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUkVUX0lKQkYyRkxPQVQobzogbnVtYmVyKSB7XG4gICAgaWYoIFNUWVBFX0lOVCA8PSBvICYmIG8gPD0gU1RZUEVfRkxPQVQpXG4gICAgICAgIHJldHVybiBTVFlQRV9GTE9BVDtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUkVUX0pTSU5UMkpTSU5UKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0pTSU5UO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUoySU5UKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9JTlQgfHwgbyA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgIHJldHVybiBTVFlQRV9JTlQ7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSU5UMklOVChvOiBudW1iZXIpIHtcbiAgICBpZiggbyA9PT0gU1RZUEVfSU5UKVxuICAgICAgICByZXR1cm4gU1RZUEVfSU5UO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfU1RSMkJPT0wobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX1NUUiApXG4gICAgICAgIHJldHVybiBTVFlQRV9CT09MO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5leHBvcnQgZnVuY3Rpb24gUkVUX1NUUjJTVFIobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX1NUUiApXG4gICAgICAgIHJldHVybiBTVFlQRV9TVFI7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUoyU1RSKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9JTlQgfHwgbyA9PT0gU1RZUEVfSlNJTlQgKVxuICAgICAgICByZXR1cm4gU1RZUEVfU1RSO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfRkxPQVQoXzogbnVtYmVyKSB7IHJldHVybiBTVFlQRV9GTE9BVDsgfVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JTlQgIChfOiBudW1iZXIpIHsgcmV0dXJuIFNUWVBFX0lOVDsgICB9XG5leHBvcnQgZnVuY3Rpb24gUkVUX0pTSU5UKF86IG51bWJlcikgeyByZXR1cm4gU1RZUEVfSlNJTlQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfU1RSICAoXzogbnVtYmVyKSB7IHJldHVybiBTVFlQRV9TVFI7ICAgfVxuXG4vL1RPRE8uLi5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZV9yZXR1cm5fdHlwZSgpIHtcblxufSIsIlxuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50JztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlJzsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCBjb25zdCBTVHlwZXMgID0gbmV3IEFycmF5PFNUeXBlT2JqPigpO1xuY29uc3QgU1R5cGVuYW1lMmlkOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTVHlwZUZyb21OYW1lPFQgZXh0ZW5kcyBTVHlwZU9iaj4obmFtZTogc3RyaW5nKTogVCB7XG4gICAgcmV0dXJuIFNUeXBlc1tnZXRTVHlwZUlEKG5hbWUpXSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1R5cGVJRChuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuXG4gICAgbGV0IGlkID0gU1R5cGVuYW1lMmlkW25hbWVdO1xuICAgIGlmKCBpZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBpZCA9IFNUeXBlbmFtZTJpZFtuYW1lXSA9IFNUeXBlcy5sZW5ndGg7XG4gICAgICAgIFNUeXBlc1tpZF0gPSB7X19uYW1lX186IG5hbWV9O1xuICAgIH1cblxuICAgIHJldHVybiBpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNUeXBlKG5hbWU6IHN0cmluZywgdHlwZTogT21pdDxTVHlwZU9iaiwgJ19fbmFtZV9fJz4pIHtcblxuICAgIGNvbnN0IGlkID0gZ2V0U1R5cGVJRChuYW1lKTtcbiAgICBPYmplY3QuYXNzaWduKCBTVHlwZXNbaWRdLCB0eXBlICk7XG4gICAgcmV0dXJuIGlkO1xufVxuXG5leHBvcnQgY29uc3QgU1RZUEVfTk9ORVRZUEUgICAgICAgICAgID0gZ2V0U1R5cGVJRChcIk5vbmVUeXBlXCIpOyAvLyAwLi4uXG5leHBvcnQgY29uc3QgU1RZUEVfSU5UICAgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcImludFwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9KU0lOVCAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwianNpbnRcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfQk9PTCAgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcImJvb2xcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfRkxPQVQgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcImZsb2F0XCIpO1xuZXhwb3J0IGNvbnN0IFNUWVBFX1NUUiAgICAgICAgICAgICAgICA9IGdldFNUeXBlSUQoXCJzdHJcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfTk9UX0lNUExFTUVOVEVEICAgID0gZ2V0U1R5cGVJRChcIk5vdEltcGxlbWVudGVkVHlwZVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbi8vIGRlY2xhcmUgYWxsIGJ1aWx0aW4gdHlwZXMuLi5cbmltcG9ydCAnLi9zdHJ1Y3RzL1NUeXBlQnVpbHRpbic7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUMkpTIiwiQVJSQVlfVFlQRSIsIkNPREVfQkVHIiwiQ09ERV9CRUdfQ09MIiwiQ09ERV9CRUdfTElORSIsIkNPREVfQ09MIiwiQ09ERV9FTkQiLCJDT0RFX0VORF9DT0wiLCJDT0RFX0VORF9MSU5FIiwiQ09ERV9MSU5FIiwiSlNfQ09ERSIsIlBZX0NPREUiLCJBU1ROb2RlIiwiQ1VSU09SIiwianNjb2RlIiwic2V0X2pzX2N1cnNvciIsImlkeCIsImxlbmd0aCIsInNldF9weV9jb2RlX2Zyb21fbGlzdCIsIm9mZnNldCIsImJyeXRob25fbm9kZSIsImJlZyIsImVuZCIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJzZXRfcHlfZnJvbV9iZWciLCJzcmNfb2Zmc2V0IiwiZHN0X29mZnNldCIsInNldF9weV9mcm9tX2VuZCIsInNldF9weV9jb2RlIiwibmV3X2pzY29kZSIsImZpbGVuYW1lIiwiaW5kZW50IiwiY3VyX2luZGVudF9sZXZlbCIsImluZGVudHMiLCJOTCIsInRvU3RyaW5nIiwiQkIiLCJCRSIsInIiLCJhcmdzIiwid3IiLCJ3Iiwid3QiLCJzdHIiLCJpIiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiaWQiLCJ0eXBlX2lkIiwiYXN0MmpzIiwiYXN0IiwiYm9keSIsIm5vZGUiLCJjaGlsZHJlbiIsIkJPRFkiLCJjb252ZXJ0X25vZGUiLCJjb252ZXJ0IiwiY29udGV4dCIsImxpbmVzIiwidHlwZSIsIm1ldGEiLCJyZXN1bHRfdHlwZSIsIl9fY2FsbF9fIiwiZ2VuZXJhdGUiLCJyZXR1cm5fdHlwZSIsImJyeXRob25fbmFtZSIsIlZBTFVFUyIsImJhc2UiLCJDTEFTU19DTEFTU0RFRiIsIkNvbnRleHQiLCJnZXRTVHlwZUlEIiwibG9jYWxfc3ltYm9scyIsIm5hbWUiLCJiYXNlcyIsIkVycm9yIiwibGlzdCIsIkNPTlRST0xGTE9XU19GT1IiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJ0YXJnZXQiLCJOdW1iZXIySW50IiwiaW5jciIsIkNPTlRST0xGTE9XU19GT1JfUkFOR0UiLCJTVFlQRV9JTlQiLCJ2YWx1ZSIsIm1hcCIsIm4iLCJDT05UUk9MRkxPV1NfSUZCTE9DSyIsInRlc3QiLCJjdXIiLCJvcmVsc2UiLCJwdXNoIiwiY29uZCIsImlmX3RydWUiLCJpZl9mYWxzZSIsIkNPTlRST0xGTE9XU19URVJOQVJZIiwiYm9keV90cnVlIiwiYm9keV9mYWxzZSIsIkNPTlRST0xGTE9XU19UUllCTE9DSyIsImhhbmRsZXJzIiwiQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIIiwiU1lNQk9MIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJlIiwiaW5jbHVkZXMiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwibm9kZXMiLCJsaW5lIiwiY29sIiwic3RhY2tsaW5lMmFzdG5vZGUiLCJzdGFja2xpbmUiLCJzYiIsImdldEFTVEZvciIsInN0YWNrMmFzdG5vZGVzIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwiam9pbiIsImxvZyIsImdldF9weV9leGNlcHRpb24iLCJfX1NCUllUSE9OX18iLCJfZXJyXyIsIl9iXyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIl9yXyIsIkpTRXhjZXB0aW9uIiwiQ09OVFJPTEZMT1dTX1dISUxFIiwiYmluYXJ5X2pzb3AiLCJTVFlQRV9KU0lOVCIsIkZVTkNUSU9OU19BUkdTX0tXQVJHIiwiRlVOQ1RJT05TX0FSR1NfVkFSRyIsIl9hcmdzIiwiU1R5cGVfZmN0Iiwia3dfc3RhcnQiLCJpZHhfZW5kX3BvcyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwiaWR4X3ZhcmFyZyIsImt3YXJncyIsImxhc3QiLCJ3cml0ZV9hcmciLCJGVU5DVElPTlNfQVJHUyIsIkZVTkNUSU9OU19BUkdTX1BPU09OTFkiLCJGVU5DVElPTlNfQVJHU19LV09OTFkiLCJGVU5DVElPTlNfQVJHU19QT1MiLCJjb252ZXJ0X2FyZ3MiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJhcmdzX3BvcyIsImFyZ3NfbmFtZXMiLCJ0b3RhbF9hcmdzIiwicG9zb25seWFyZ3MiLCJrd29ubHlhcmdzIiwicG9zX2RlZmF1bHRzIiwiZGVmYXVsdHMiLCJwb3Nvbmx5IiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwibmJfcG9zX2RlZmF1bHRzIiwiTWF0aCIsIm1pbiIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJoYXNfa3ciLCJweV9vZmZzZXQiLCJkZWZ2YWwiLCJhbm5vdGF0aW9uIiwiY2hpbGQiLCJGVU5DVElPTlNfQ0FMTF9LRVlXT1JEIiwicHJpbnRfb2JqIiwib2JqIiwia2V5cyIsIk9iamVjdCIsInZhbHVlcyIsImRhdGEiLCJzZXAiLCJkZWZhdWx0X2NhbGwiLCJrd19wb3MiLCJuYl9wb3MiLCJtYXgiLCJwb3Nfc2l6ZSIsImt3IiwiY3V0b2ZmIiwiaGFzX2t3YXJncyIsInN1YnN0aXR1dGVfY2FsbCIsIkZVTkNUSU9OU19DQUxMIiwiU1R5cGVzIiwiZmN0X3R5cGUiLCJmY3QiLCJyZXRfdHlwZSIsImtleXdvcmRzIiwiRlVOQ1RJT05TX0RFRiIsImFzdG5vZGUiLCJzdHlwZSIsInBhcmVudF9ub2RlX2NvbnRleHQiLCJyZXR1cm5zIiwiZmN0X3JldHVybl90eXBlIiwiX19uYW1lX18iLCJTVHlwZUlEIiwibGFzdF90eXBlIiwiZmFrZV9ub2RlIiwiS0VZV09SRFNfQVNTRVJUIiwiYXNzZXJ0IiwiS0VZV09SRFNfQlJFQUsiLCJLRVlXT1JEU19DT05USU5VRSIsIktFWVdPUkRTX0lNUE9SVF9BTElBUyIsImFzbmFtZSIsIktFWVdPUkRTX0lNUE9SVCIsIm5hbWVzIiwibW9kdWxlIiwiS0VZV09SRFNfUkFJU0UiLCJleGMiLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJSVU5USU1FXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIkFTVF9DT05WRVJUXzE0IiwiQVNUMkpTXzE0IiwiQVNUX0NPTlZFUlRfMTUiLCJBU1QySlNfMTUiLCJBU1RfQ09OVkVSVF8xNiIsIkFTVDJKU18xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiUlVOVElNRV8xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJSVU5USU1FXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIkFTVF9DT05WRVJUXzI1IiwiQVNUMkpTXzI1IiwiQVNUX0NPTlZFUlRfMjYiLCJBU1QySlNfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIlJVTlRJTUVfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIkFTVF9DT05WRVJUXzI5IiwiQVNUMkpTXzI5IiwiQVNUX0NPTlZFUlRfMzAiLCJBU1QySlNfMzAiLCJBU1RfQ09OVkVSVF8zMSIsIkFTVDJKU18zMSIsIkFTVF9DT05WRVJUXzMyIiwiQVNUMkpTXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJSVU5USU1FXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIkFTVF9DT05WRVJUXzM2IiwiQVNUMkpTXzM2IiwiQVNUX0NPTlZFUlRfMzciLCJBU1QySlNfMzciLCJBU1RfQ09OVkVSVF8zOCIsIkFTVDJKU18zOCIsIkFTVF9DT05WRVJUXzM5IiwiQVNUMkpTXzM5IiwiQVNUX0NPTlZFUlRfNDAiLCJBU1QySlNfNDAiLCJTVFJVQ1RTX1RVUExFIiwiU1RSVUNUU19MSVNUIiwiU1RSVUNUU19ESUNUIiwiUkVUVVJOIiwiUEFTUyIsIk9QRVJBVE9SU19VTkFSWSIsIk9QRVJBVE9SU19DT01QQVJFIiwiT1BFUkFUT1JTX0JPT0xFQU4iLCJPUEVSQVRPUlNfQklOQVJZIiwiT1BFUkFUT1JTX0FUVFIiLCJPUEVSQVRPUlNfX0JSQUNLRVRTIiwiT1BFUkFUT1JTX0FTU0lHTk9QIiwiT1BFUkFUT1JTX19FUV9JTklUIiwiT1BFUkFUT1JTX19FUSIsIkxJVEVSQUxTX1NUUiIsIkxJVEVSQUxTX0lOVCIsIkxJVEVSQUxTX0ZMT0FUIiwiTElURVJBTFNfRl9TVFJJTkciLCJMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSIsIkxJVEVSQUxTX0JPT0wiLCJMSVRFUkFMU19OT05FIiwiQVNUX0NPTlZFUlQiLCJSVU5USU1FIiwiYXNzaWduIiwiU1RZUEVfTk9ORVRZUEUiLCJfY29udGV4dCIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImFkZFNUeXBlIiwiU1RZUEVfQk9PTCIsIkNNUE9QU19MSVNUIiwiZ2VuQ21wT3BzIiwiUkVUX0lKQkYyQk9PTCIsIlNUWVBFX1NUUiIsIlNUWVBFX0ZMT0FUIiwiZmxvYXQyc3RyIiwiZiIsInRvRXhwb25lbnRpYWwiLCJzaWduX2lkeCIsImdlbkJpbmFyeU9wcyIsImdlblVuYXJ5T3BzIiwiSW50Mk51bWJlciIsIkNPTlZFUlRfSU5UMkZMT0FUIiwiUkVUX0lKQkYyRkxPQVQiLCJSRVRfRkxPQVQiLCJSRVRfU1RSIiwiU1R5cGVfdHlwZV9mbG9hdCIsIm90aGVyIiwib3RoZXJfdHlwZSIsIm90aGVyX3ZhbHVlIiwibWV0aG9kIiwiX19pbnRfXyIsIl9fc3RyX18iLCJjb252ZXJ0X290aGVyIiwic2VsZiIsInJlYWxfdHlwZSIsImlkX2pzb3AiLCJ1bmFyeV9qc29wIiwiQ09OVkVSVF8ySU5UIiwiUkVUX0lKMklOVCIsIlJFVF9JTlQiLCJSRVRfSU5UMklOVCIsIlNUeXBlX3R5cGVfaW50IiwiYSIsImIiLCJjb252ZXJ0X3NlbGYiLCJSRVRfSlNJTlQiLCJSRVRfSlNJTlQySlNJTlQiLCJSRVRfSUoyU1RSIiwiUkVUX1NUUjJCT09MIiwiUkVUX1NUUjJTVFIiLCJTVHlwZV90eXBlX3N0ciIsIl9fbGVuX18iLCJyaWdodF9ub2RlIiwicmNoaWxkIiwiaXNNdWx0aVRhcmdldCIsInRhcmdldHMiLCJyaWdodCIsInJpZ2h0X3R5cGUiLCJsZWZ0cyIsImxlZnQiLCJsc3ltIiwibGVmdF90eXBlIiwiQXNzaWduT3BlcmF0b3JzIiwiU1RZUEVfTk9UX0lNUExFTUVOVEVEIiwib3AiLCJibmFtZTJweW5hbWUiLCJhdHRyIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJmbG9vcmRpdl9mbG9hdCIsImZsb29yIiwiZmxvb3JkaXZfaW50IiwicmVzdWx0IiwibW9kX2Zsb2F0IiwibW9kIiwibW9kX2ludCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJydHlwZSIsImx0eXBlIiwianNvcCIsIm9wcyIsInJpZ2h0cyIsImNvbXBhcmF0b3JzIiwib3BlcmFuZCIsImV4cHIiLCJlbHRzIiwiaXNDbGFzcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJwcm90b3R5cGUiLCJ3cml0YWJsZSIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiRmxvYXQ2NEFycmF5IiwiTUFYX05CX1RPS0VOIiwiZG9wX3Jlc2V0IiwiTkVYVF9BU1RfTk9ERV9JRCIsIm1vZHVsZXMiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImNhbmRpZGF0ZXMiLCJJRCIsImVycm9yIiwicGFyZW50X2NvbnRleHQiLCJSb290Q29udGV4dCIsInR5cGVfZmN0IiwiZ2VuVW5hcnlPcEZjdCIsIm9wbmFtZSIsImNhbGwiLCJsZW4iLCJpbnQiLCJmbG9hdCIsIkNPUkVfTU9EVUxFUyIsImN1cnNvciIsImxpbmVfb2Zmc2V0IiwiY2hhciIsInBhcnNlRXhwcmVzc2lvbiIsImFzdDJqc19jb252ZXJ0IiwicGFyc2VTeW1ib2wiLCJiZWdpbl9zdHIiLCJjYXIiLCJzeW1ib2wiLCJ0b0pTIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsInB5Y29kZSIsInN0YXJ0Iiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiZXhwb3J0ZWQiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiTk9DT05WRVJUIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJhX3ZhbHVlIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwiZmlyc3QiLCJwYXJlbnRfb3AiLCJwYXJlbnRfb3BfZGlyIiwiZGlyZWN0aW9uIiwiY3VyX3ByaW9yaXR5IiwicGFyZW50X3ByaW9yaXR5IiwiY2hlY2tfcHJpb3JpdHkiLCJweW9wIiwiY3MiLCJyY3MiLCJvIiwicmV2ZXJzZSIsImNvcCIsImdlbmVyYXRlQ29udmVydCIsInRhYmxlIiwic3JjIiwiZ2VuZXJhdGVfcmV0dXJuX3R5cGUiLCJTVHlwZW5hbWUyaWQiLCJnZXRTVHlwZUZyb21OYW1lIiwicHkyYXN0X2Zhc3QiXSwic291cmNlUm9vdCI6IiJ9