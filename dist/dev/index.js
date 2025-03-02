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
        const isLast = i === meta.idx_vararg && i === _args.length - 1;
        write_arg(_args[i], isLast);
    }
    if (kw_start < _args.length) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('} = {}');
}
function write_arg(node, isLast) {
    const offset = 4 * node.id;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END);
    const name = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node.id];
    if (node.type_id === _astconvert__WEBPACK_IMPORTED_MODULE_4__.FUNCTIONS_ARGS_VARG) {
        if (isLast) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`...${name}`;
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
    const ast = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_4__.ASTNode(core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.OPERATORS_ASSIGNOP, left.result_type, [
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
            //const ID = candidates[i];
            //result.type_id = ID;
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
    parent_op_priority = 0;
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
// adds r except eq/ne/(l/g)(t/e)
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
// adds i
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
// bigger = more priority (0 by default).
const JSOperators = [
    [],
    [
        '='
    ],
    /* et tous les dérivés */ [
        '||',
        '??'
    ],
    [
        '&&'
    ],
    [
        '|'
    ],
    [
        '^'
    ],
    [
        '&'
    ],
    [
        '==',
        '!=',
        '===',
        '!=='
    ],
    [
        '<',
        '<=',
        '>=',
        '>'
    ],
    [
        '<<',
        '>>',
        '>>>'
    ],
    [
        '+',
        '-'
    ],
    [
        '*',
        '/',
        '%'
    ],
    [
        '**'
    ],
    [
        '!',
        '++',
        '--',
        '~',
        'u.-'
    ]
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
    const priority = i;
    for (let op of JSOperators[i])JSOperatorsPriority[op] = priority;
}
function reversed_operator(op) {
    return BinaryOperators[op];
}
const LEFT = 1;
const RIGHT = 2;
function multi_jsop(node, op, ...values) {
    const first = values[0];
    const prio = JSOperatorsPriority[op];
    const p_prio = JSOperatorsPriority[op];
    if (first instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) first.parent_op_priority = prio;
    for(let i = 1; i < values.length; ++i)values[i].parent_op_priority = prio + 1;
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${first}`;
    for(let i = 1; i < values.length; ++i)result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${result} && ${values[i]}`; //TODO: better...
    if (p_prio < prio) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    return result;
}
// null operation, the node has the same priority as his father.
// 2*int(1+1) => 2*(1+1)
function id_jsop(node, a) {
    a.parent_op_priority = node.parent_op_priority;
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}`;
}
function binary_jsop(node, a, op, b) {
    const prio = JSOperatorsPriority[op];
    const p_prio = node.parent_op_priority;
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) a.parent_op_priority = prio;
    if (b instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) b.parent_op_priority = prio + 1;
    let cmp = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}${op}${b}`;
    // if father has more prio, add parenthesis.
    if (p_prio > prio) cmp = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${cmp})`;
    return cmp;
}
function unary_jsop(node, op, a) {
    let rop = op;
    if (rop === '-') rop = 'u.-';
    // unary JS Op prio list (?)
    const prio = JSOperatorsPriority[rop];
    const p_prio = node.parent_op_priority;
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) a.parent_op_priority = prio;
    let cmp = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${op}${a}`;
    // if father has more prio, add parenthesis.
    if (p_prio > prio) cmp = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${cmp})`;
    return cmp;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvYm9keS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2JvZHkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yX3JhbmdlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvcl9yYW5nZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz1faW5pdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89X2luaXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvZG9wLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JpbmFyeU9wZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0NvbnZlcnRlcnMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9SZXR1cm5UeXBlRmN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlQnVpbHRpbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVDJKUyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IEFSUkFZX1RZUEUsIENPREVfQkVHLCBDT0RFX0JFR19DT0wsIENPREVfQkVHX0xJTkUsIENPREVfQ09MLCBDT0RFX0VORCwgQ09ERV9FTkRfQ09MLCBDT0RFX0VORF9MSU5FLCBDT0RFX0xJTkUsIEpTX0NPREUsIFBZX0NPREUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgY29uc3QgQ1VSU09SID0gbmV3IEFSUkFZX1RZUEUoMik7XG5cbmV4cG9ydCBsZXQganNjb2RlOiBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfanNfY3Vyc29yKGlkeDogbnVtYmVyKSB7XG4gICAgSlNfQ09ERVtpZHggKyBDT0RFX0xJTkVdID0gQ1VSU09SW0NPREVfTElORV07XG4gICAgSlNfQ09ERVtpZHggKyBDT0RFX0NPTCBdID0ganNjb2RlIS5sZW5ndGggLSBDVVJTT1JbQ09ERV9DT0xdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X3B5X2NvZGVfZnJvbV9saXN0KG9mZnNldDogbnVtYmVyLCBicnl0aG9uX25vZGU6IGFueSkge1xuXG4gICAgY29uc3QgYmVnID0gYnJ5dGhvbl9ub2RlWzBdO1xuICAgIGNvbnN0IGVuZCA9IGJyeXRob25fbm9kZVticnl0aG9uX25vZGUubGVuZ3RoLTFdO1xuXG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdID0gYmVnLmxpbmVubztcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0JFR19DT0wgIF0gPSBiZWcuY29sX29mZnNldDtcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0VORF9MSU5FIF0gPSBlbmQuZW5kX2xpbmVubztcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0VORF9DT0wgIF0gPSBlbmQuZW5kX2NvbF9vZmZzZXQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9weV9mcm9tX2JlZyggc3JjX29mZnNldDogbnVtYmVyLCBkc3Rfb2Zmc2V0OiBudW1iZXIgKSB7XG5cbiAgICBQWV9DT0RFWyBzcmNfb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdID0gUFlfQ09ERVsgZHN0X29mZnNldCArIENPREVfQkVHX0xJTkUgXTtcbiAgICBQWV9DT0RFWyBzcmNfb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdID0gUFlfQ09ERVsgZHN0X29mZnNldCArIENPREVfQkVHX0NPTCAgXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRfcHlfZnJvbV9lbmQoIHNyY19vZmZzZXQ6IG51bWJlciwgZHN0X29mZnNldDogbnVtYmVyICkge1xuXG4gICAgUFlfQ09ERVsgc3JjX29mZnNldCArIENPREVfRU5EX0xJTkUgXSA9IFBZX0NPREVbIGRzdF9vZmZzZXQgKyBDT0RFX0VORF9MSU5FIF07XG4gICAgUFlfQ09ERVsgc3JjX29mZnNldCArIENPREVfRU5EX0NPTCAgXSA9IFBZX0NPREVbIGRzdF9vZmZzZXQgKyBDT0RFX0VORF9DT0wgIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfcHlfY29kZShvZmZzZXQ6IG51bWJlciwgYnJ5dGhvbl9ub2RlOiBhbnkpIHtcblxuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfQkVHX0xJTkUgXSA9IGJyeXRob25fbm9kZS5saW5lbm87XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdID0gYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXQ7XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9FTkRfTElORSBdID0gYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm87XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9FTkRfQ09MICBdID0gYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBuZXdfanNjb2RlKGZpbGVuYW1lOiBzdHJpbmcpIHtcblxuICAgIGpzY29kZSAgPSBgLy8jIHNvdXJjZVVSTD0ke2ZpbGVuYW1lfVxcbmA7XG4gICAganNjb2RlICs9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG5cbiAgICBDVVJTT1JbQ09ERV9MSU5FXSA9IDM7XG4gICAgQ1VSU09SW0NPREVfQ09MXSA9IGpzY29kZS5sZW5ndGg7XG59XG5cbnR5cGUgUHJpbnRhYmxlID0ge3RvU3RyaW5nKCk6IHN0cmluZ307XG5cbmxldCBpbmRlbnQgPSBcIiAgICBcIjtcbmxldCBjdXJfaW5kZW50X2xldmVsID0gMDtcbi8vbGV0IGN1cl9pbmRlbnQgPSBcIlwiO1xuXG5jb25zdCBpbmRlbnRzID0gW1xuICAgIFwiXCIsXG4gICAgXCJcIixcbiAgICBpbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG5dXG5cbmV4cG9ydCBjb25zdCBOTCA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgKytDVVJTT1JbQ09ERV9MSU5FXTtcbiAgICAgICAgQ1VSU09SW0NPREVfQ09MXSA9IGpzY29kZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIHJldHVybiBcIlxcblwiICsgaW5kZW50c1tjdXJfaW5kZW50X2xldmVsXTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgQkIgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaW5kZW50c1srK2N1cl9pbmRlbnRfbGV2ZWxdO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBCRSA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpbmRlbnRzWy0tY3VyX2luZGVudF9sZXZlbF07XG4gICAgfVxufVxuXG4vLyB0cmFuc2Zvcm1zIGludG8gYSB0ZW1wbGF0ZSBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiByKC4uLmFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxBU1ROb2RlKVtdXSkge1xuICAgIHJldHVybiBhcmdzO1xufVxuXG4vLyB3cml0ZSBhIHRlbXBsYXRlIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIHdyKGFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxBU1ROb2RlKVtdXSkge1xuICAgIGlmKCB0eXBlb2YgYXJncyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIHcoYXJncyk7XG4gICAgcmV0dXJuIHd0KC4uLmFyZ3MpO1xufVxuXG4vLyB3cml0ZSB3aXRoIHRlbXBsYXRlIHN0cmluZyB3dGBgXG5leHBvcnQgZnVuY3Rpb24gd3Qoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczogKFByaW50YWJsZXxBU1ROb2RlKVtdKSB7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAganNjb2RlICs9IHN0cltpXTtcbiAgICAgICAgdyhhcmdzW2ldKTtcbiAgICB9XG5cbiAgICBqc2NvZGUgKz0gc3RyW2FyZ3MubGVuZ3RoXTtcbn1cblxuLy8gZ2VuZXJpYyB3cml0ZSA/XG5leHBvcnQgZnVuY3Rpb24gdyguLi5hcmdzOiAoUHJpbnRhYmxlfEFTVE5vZGUpW10pIHtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgbGV0IGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoYXJnKSApIHsgLy8gbGlrZWx5IGEgcmBgXG4gICAgICAgICAgICB3cihhcmcgYXMgUGFyYW1ldGVyczx0eXBlb2Ygd3I+WzBdKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoICEgKGFyZyBpbnN0YW5jZW9mIEFTVE5vZGUpICkge1xuXG4gICAgICAgICAgICBpZiggYXJnID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIGFyZyA9IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICBpZiggYXJnID09PSBudWxsIClcbiAgICAgICAgICAgICAgICBhcmcgPSBcIm51bGxcIjtcblxuICAgICAgICAgICAganNjb2RlICs9IGFyZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSA0KmFyZy5pZDtcbiAgICAgICAgXG4gICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9CRUcpO1xuICAgICAgICBBU1QySlNbYXJnLnR5cGVfaWQhXShhcmcpO1xuICAgICAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfRU5EKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG4gICAgbmV3X2pzY29kZShhc3QuZmlsZW5hbWUpO1xuXG4gICAgdyhhc3QuYm9keSk7XG5cbiAgICAvLyBUT0RPOiBiZXR0ZXIgZXhwb3J0IHN0cmF0ZWd5ICg/KVxuICAgIGpzY29kZSArPSBgXFxuY29uc3QgX19leHBvcnRlZF9fID0ge307XFxuYDtcblxuICAgIC8vY29uc29sZS53YXJuKGpzY29kZSk7XG5cbiAgICAvKipcbiAgICBjb25zdCBsaW5lcyA9IGFzdC5ib2R5LmNoaWxkcmVuO1xuICAgIGNvbnN0IGV4cG9ydGVkID0gbmV3IEFycmF5KGxpbmVzLmxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBsaW5lc1tpXS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgZXhwb3J0ZWRbaV0gPSBsaW5lc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgZXhwb3J0ZWQubGVuZ3RoID0gb2Zmc2V0O1xuXG4gICAganNjb2RlICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcbiAgICAvKiovXG5cblx0cmV0dXJuIGpzY29kZTtcbn0iLCJpbXBvcnQgeyBCQiwgQkUsIE5MLCB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcoQkIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoTkwsIG5vZGUuY2hpbGRyZW5baV0pO1xuXG4gICAgdyhCRSk7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGVfZnJvbV9saXN0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQk9EWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5ldyBBcnJheShub2RlLmxlbmd0aClcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7ICsraSlcbiAgICAgICAgbGluZXNbaV0gPSBjb252ZXJ0X25vZGUobm9kZVtpXSwgY29udGV4dCk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGxpbmVzW2ldLnR5cGUgIT09IFwiZnVuY3Rpb25zLmRlZlwiKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgbWV0YSA9IChsaW5lc1tpXS5yZXN1bHRfdHlwZSEgYXMgU1R5cGVGY3QgKS5fX2NhbGxfXztcbiAgICAgICAgaWYoIG1ldGEuZ2VuZXJhdGUgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICBtZXRhLnJldHVybl90eXBlKCk7IC8vIG1laC5cbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShCT0RZLCAwLCBsaW5lcyk7XG5cbiAgICBzZXRfcHlfY29kZV9mcm9tX2xpc3QoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJvZHlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgbGV0IGJvZHkgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBiYXNlID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgYm9keSA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgfVxuXG4gICAgd3RgY2xhc3MgJHtWQUxVRVNbbm9kZS5pZF19IGV4dGVuZHMgJHtiYXNlfSB7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDTEFTU19DTEFTU0RFRiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBnZXRTVHlwZUlEIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IGdldFNUeXBlSUQobm9kZS5uYW1lKTtcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuYmFzZXMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICBbY29udmVydF9ub2RlKG5vZGUuYmFzZXNbMF0sIGNvbnRleHQpLCBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KV1cbiAgICAgICAgOiBbY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCldO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoQ0xBU1NfQ0xBU1NERUYsIDAsIGNoaWxkcmVuKTtcblxuICAgIFZBTFVFU1thc3QuaWRdID0gbm9kZS5uYW1lO1xuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDbGFzc0RlZlwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBpZHggID0gVkFMVUVTW25vZGUuaWRdO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW25vZGUuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuICAgIGNvbnN0IGxpc3QgPSBub2RlLmNoaWxkcmVuWzBdO1xuXG4gICAgd3RgZm9yKHZhciAke2lkeH0gb2YgJHtsaXN0fSl7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDT05UUk9MRkxPV1NfRk9SIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1t0YXJnZXRdID0gMDsgLy9UT0RPXG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDT05UUk9MRkxPV1NfRk9SLCAwLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF0pO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSB0YXJnZXQ7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IGlkeCAgPSBWQUxVRVNbbm9kZS5pZF07XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5bbm9kZS5jaGlsZHJlbi5sZW5ndGgtMV07XG5cbiAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGV8YW55ICA9IFwiMG5cIjtcbiAgICBsZXQgaW5jcjogc3RyaW5nfEFTVE5vZGV8YW55ICA9IFwiMW5cIjtcbiAgICBsZXQgZW5kICA9IE51bWJlcjJJbnQobm9kZS5jaGlsZHJlblswXSk7XG5cbiAgICBpZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAyKSB7XG4gICAgICAgIGJlZyA9IE51bWJlcjJJbnQobm9kZS5jaGlsZHJlblswXSk7XG4gICAgICAgIGVuZCA9IE51bWJlcjJJbnQobm9kZS5jaGlsZHJlblsxXSk7XG4gICAgfVxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgIGluY3IgPSBOdW1iZXIySW50KG5vZGUuY2hpbGRyZW5bMl0pO1xuXG4gICAgcmV0dXJuIHd0YGZvcih2YXIgJHtpZHh9ID0gJHtiZWd9OyAke2lkeH0gPCAke2VuZH07ICR7aWR4fSArPSAke2luY3J9KXske2JvZHl9JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPTlRST0xGTE9XU19GT1JfUkFOR0UgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggbm9kZS5pdGVyLmNvbnN0cnVjdG9yLiRuYW1lICE9PSBcIkNhbGxcIiB8fCBub2RlLml0ZXIuZnVuYy5pZCAhPT0gXCJyYW5nZVwiKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldF0gPSAwOyAvL1RPRE9cbiAgICAvLyBUT0RPOiBqc2ludCBvcHRpIGlmIHRoaXMudmFsdWUgbm90IHVzZWQuLi5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS52YWx1ZV0gPSBTVFlQRV9JTlQ7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDT05UUk9MRkxPV1NfRk9SX1JBTkdFLCAwLCBbXG4gICAgICAgIC4uLiBub2RlLml0ZXIuYXJncy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXSk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IHRhcmdldDtcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgLy8gaWZcbiAgICB3dGBpZigke25vZGUuY2hpbGRyZW5bMF19KXske25vZGUuY2hpbGRyZW5bMV19JHtOTH19YDtcblxuICAgIC8vIGVsc2UgaWZcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDI7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgICAgICB3dGBlbHNlIGlmKCR7bm9kZS5jaGlsZHJlbltpXX0peyR7bm9kZS5jaGlsZHJlbltpKzFdfSR7Tkx9fWA7XG4gICAgfVxuXG4gICAgLy8gZWxzZVxuICAgIGlmKCBpID09PSBub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDEgKVxuICAgICAgICB3dGBlbHNlIHske25vZGUuY2hpbGRyZW5baV19JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPTlRST0xGTE9XU19JRkJMT0NLIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGlmXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KVxuICAgIF07XG5cbiAgICAvLyBlbHNlIGlmXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgY29udmVydF9ub2RlKGN1ci50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShjdXIuYm9keSwgY29udGV4dClcbiAgICAgICAgKVxuICAgIH1cbiAgICAvLyBlbHNlXG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwIClcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY29udmVydF9ub2RlKGN1ci5vcmVsc2UsIGNvbnRleHQpICk7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDT05UUk9MRkxPV1NfSUZCTE9DSywgMCwgY2hpbGRyZW4pO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgY29uZCAgICAgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IGlmX3RydWUgID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICBjb25zdCBpZl9mYWxzZSA9IG5vZGUuY2hpbGRyZW5bMl07XG5cbiAgICB3dGAoJHtjb25kfSA/ICR7aWZfdHJ1ZX0gOiAke2lmX2ZhbHNlfSlgO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1RFUk5BUlkgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY29uZCAgICAgICA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgIGNvbnN0IGJvZHlfdHJ1ZSAgPSBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KTtcbiAgICBjb25zdCBib2R5X2ZhbHNlID0gY29udmVydF9ub2RlKG5vZGUub3JlbHNlLCBjb250ZXh0KTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKENPTlRST0xGTE9XU19URVJOQVJZLCBib2R5X3RydWUucmVzdWx0X3R5cGUsIFtcbiAgICAgICAgY29uZCxcbiAgICAgICAgYm9keV90cnVlLFxuICAgICAgICBib2R5X2ZhbHNlXG4gICAgXSk7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZFeHBcIjsiLCJpbXBvcnQgeyBCQiwgQkUsIE5MLCB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3dGB0cnkgeyR7bm9kZS5jaGlsZHJlblswXX0ke05MfX1gO1xuICAgIHd0YGNhdGNoKF9yYXdfZXJyXyl7JHtCQn0ke05MfWA7XG5cbiAgICAgICAgdyhcImNvbnN0IF9lcnJfID0gX2JfLmdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfLCBfX1NCUllUSE9OX18pXCIpO1xuXG4gICAgICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICB3KCBub2RlLmNoaWxkcmVuWzFdICk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMjsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB3KE5MLCBcImVsc2UgXCIsIG5vZGUuY2hpbGRyZW5baV0gKTtcblxuICAgICAgICAvLyBub3QgYSBjYXRjaCBhbGwuLi5cbiAgICAgICAgaWYoIG5vZGUuY2hpbGRyZW5bbm9kZS5jaGlsZHJlbi5sZW5ndGgtMV0uY2hpbGRyZW4ubGVuZ3RoICE9PSAxKVxuICAgICAgICAgICAgdyhOTCwgXCJlbHNlIHsgdGhyb3cgX3Jhd19lcnJfIH1cIik7XG5cbiAgICB3KEJFLCBOTCk7XG5cbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPTlRST0xGTE9XU19UUllCTE9DSyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPihub2RlLmhhbmRsZXJzLmxlbmd0aCsxKTtcblxuICAgIC8vIHRyeSBib2R5XG4gICAgY2hpbGRyZW5bMF0gPSBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmhhbmRsZXJzOyArK2kpXG4gICAgICAgIGNoaWxkcmVuW2krMV0gPSBjb252ZXJ0X25vZGUobm9kZS5oYW5kbGVyc1tpXSwgY29udGV4dCk7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDT05UUk9MRkxPV1NfVFJZQkxPQ0ssIDAsIGNoaWxkcmVuKTtcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgLy8gZWxzZSBpcyBoYW5kbGVkIGJ5IHRyeWJsb2NrXG5cbiAgICBpZihub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIHd0YHske25vZGUuY2hpbGRyZW5bMF19LCR7Tkx9fWA7XG5cbiAgICB3dGBpZigke25vZGUuY2hpbGRyZW5bMF19KXske25vZGUuY2hpbGRyZW5bMV19JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPTlRST0xGTE9XU19UUllCTE9DS19DQVRDSCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW47XG4gICAgaWYoIG5vZGUudHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNoaWxkcmVuID0gW2NvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLCBjb252ZXJ0X25vZGUobm9kZS5ib2R5LCBjb250ZXh0KV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZHJlbiA9IFsgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCkgXTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDT05UUk9MRkxPV1NfVFJZQkxPQ0tfQ0FUQ0gsIDAsIGNoaWxkcmVuKTtcbiAgICBcbiAgICBWQUxVRVNbYXN0LmlkXSA9IG5vZGUubmFtZTtcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCB7IFNZTUJPTCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gZmlsdGVyX3N0YWNrKHN0YWNrOiBzdHJpbmdbXSkge1xuICByZXR1cm4gc3RhY2suZmlsdGVyKCBlID0+IGUuaW5jbHVkZXMoJ2JyeXRob25fJykgKTsgLy9UT0RPIGltcHJvdmVzLi4uXG59XG5cbi8vVE9ETzogdXNlIH49c291cmNlbWFwLi4uXG5mdW5jdGlvbiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzOiBBU1ROb2RlW10sIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIpOiBudWxsfEFTVE5vZGUge1xuXG4gIC8vVE9ETy4uLlxuICAvKlxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG4qL1xuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ib2R5LmNoaWxkcmVuLCBzdGFja2xpbmVbMV0sIHN0YWNrbGluZVsyXSkhO1xufVxuXG5leHBvcnQgdHlwZSBTdGFja0xpbmUgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl07XG5cbi8vVE9ETzogY29udmVydFxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrMmFzdG5vZGVzKHN0YWNrOiBTdGFja0xpbmVbXSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZVtdIHtcbiAgcmV0dXJuIHN0YWNrLm1hcCggZSA9PiBzdGFja2xpbmUyYXN0bm9kZShlLCBzYikgKTtcbn1cblxuLy9UT0RPOiBhZGQgZmlsZS4uLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3N0YWNrKHN0YWNrOiBhbnksIHNiOiBTQnJ5dGhvbik6IFN0YWNrTGluZVtdIHtcblxuXG4gIFxuICAgIHN0YWNrID0gc3RhY2suc3BsaXQoXCJcXG5cIik7XG5cbiAgICBjb25zdCBpc1Y4ID0gc3RhY2tbMF09PT0gXCJFcnJvclwiOyBcblxuICAgIHJldHVybiBmaWx0ZXJfc3RhY2soc3RhY2spLm1hcCggbCA9PiB7XG5cbiAgICAgIGxldCBbXywgX2xpbmUsIF9jb2xdID0gbC5zcGxpdCgnOicpO1xuICBcbiAgICAgIGlmKCBfY29sW19jb2wubGVuZ3RoLTFdID09PSAnKScpIC8vIFY4XG4gICAgICAgIF9jb2wgPSBfY29sLnNsaWNlKDAsLTEpO1xuICBcbiAgICAgIGxldCBsaW5lID0gK19saW5lIC0gMjtcbiAgICAgIGxldCBjb2wgID0gK19jb2w7XG5cbiAgICAgIC0tY29sOyAvL3N0YXJ0cyBhdCAxLlxuXG4gICAgICBsZXQgZmN0X25hbWUhOiBzdHJpbmc7XG4gICAgICBpZiggaXNWOCApIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZihcIiBcIiwgNyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSg3LCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiZXZhbFwiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCBmaWxlbmFtZS5cbiAgICAgICAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3QuYm9keS5jaGlsZHJlbiwgbGluZSwgY29sKSE7XG4gICAgICAgIGlmKG5vZGUudHlwZV9pZCA9PT0gU1lNQk9MKVxuICAgICAgICAgIGNvbCArPSBWQUxVRVNbbm9kZS5pZF0ubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIC8vIG5vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lXG4gICAgY29uc3Qgc3RhY2tfc3RyID0gc3RhY2subWFwKCAobCxpKSA9PiBgRmlsZSBcIltmaWxlXVwiLCBsaW5lICR7MH0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmZ1bmN0aW9uIGdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfOiBhbnksIF9fU0JSWVRIT05fXzogYW55KSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcbiAgICAgICAgICAgICAgPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIDogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1xuXG4gIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKTtcbiAgXG4gIHJldHVybiBfZXJyXztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvbixcbiAgICBnZXRfcHlfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCBjb25kID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBjb25zdCBib2R5ID0gbm9kZS5jaGlsZHJlblsxXTtcblxuICAgIHd0YHdoaWxlKCR7Y29uZH0peyR7Ym9keX0ke05MfX19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPTlRST0xGTE9XU19XSElMRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShDT05UUk9MRkxPV1NfV0hJTEUsIDAsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmJvZHksIGNvbnRleHQpXG4gICAgXSk7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyBzZXRfanNfY3Vyc29yLCB3LCB3ciwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDT0RFX0VORCwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBGVU5DVElPTlNfQVJHU19LV0FSRywgRlVOQ1RJT05TX0FSR1NfVkFSRyB9IGZyb20gXCIuL2FzdGNvbnZlcnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBjb25zdCBhcmdzICAgICAgPSBub2RlO1xuICAgIGNvbnN0IF9hcmdzICAgICA9IGFyZ3MuY2hpbGRyZW47XG4gICAgY29uc3QgU1R5cGVfZmN0ID0gVkFMVUVTW2FyZ3MuaWRdISBhcyBTVHlwZUZjdDtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBsZXQga3dfc3RhcnQgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBrd19zdGFydCA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAga3dfc3RhcnQgPSBtZXRhLmlkeF92YXJhcmcgKyAxO1xuXG4gICAgaWYoIG1ldGEua3dhcmdzICE9PSB1bmRlZmluZWQgJiYga3dfc3RhcnQgPT09IF9hcmdzLmxlbmd0aC0xKVxuICAgICAgICArK2t3X3N0YXJ0O1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICB3KFwiLCBcIik7XG5cbiAgICAgICAgaWYoIGt3X3N0YXJ0ID09PSBpKVxuICAgICAgICAgICAgdyhcIntcIik7XG5cbiAgICAgICAgY29uc3QgaXNMYXN0ID0gaSA9PT0gbWV0YS5pZHhfdmFyYXJnICYmIGkgPT09IF9hcmdzLmxlbmd0aC0xO1xuICAgICAgICB3cml0ZV9hcmcoX2FyZ3NbaV0sIGlzTGFzdCk7XG4gICAgfVxuXG4gICAgaWYoIGt3X3N0YXJ0IDwgX2FyZ3MubGVuZ3RoKVxuICAgICAgICB3KCd9ID0ge30nKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVfYXJnKG5vZGU6IEFTVE5vZGUsIGlzTGFzdDogYm9vbGVhbikge1xuICAgIFxuICAgIGNvbnN0IG9mZnNldCA9IDQqbm9kZS5pZDtcbiAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfRU5EKTtcblxuICAgIGNvbnN0IG5hbWUgPSBWQUxVRVNbbm9kZS5pZF07XG5cbiAgICBpZiggbm9kZS50eXBlX2lkID09PSBGVU5DVElPTlNfQVJHU19WQVJHICkge1xuICAgICAgICBpZiggaXNMYXN0IClcbiAgICAgICAgICAgIHd0YC4uLiR7bmFtZX1gO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbmFtZSwgJz0nLCBcIltdXCIpICk7XG4gICAgfSBlbHNlIGlmKCBub2RlLnR5cGVfaWQgPT09IEZVTkNUSU9OU19BUkdTX0tXQVJHICkge1xuICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbmFtZSwgJz0nLCBcInt9XCIpICk7XG4gICAgfSBlbHNlIGlmKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxICkge1xuXG4gICAgICAgIGxldCB2YWx1ZTogYW55ID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgaWYoIHZhbHVlLnJlc3VsdF90eXBlID09PSBTVFlQRV9KU0lOVCAmJiBub2RlLnJlc3VsdF90eXBlID09PSBTVFlQRV9JTlQpXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcjJJbnQodmFsdWUpO1xuXG4gICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBuYW1lLCAnPScsIHZhbHVlKSApO1xuICAgIH1lbHNlIHtcbiAgICAgICAgdyhuYW1lKTtcbiAgICB9XG5cbiAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfRU5EKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0FSR1MgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRfcHlfY29kZSwgc2V0X3B5X2Zyb21fYmVnLCBzZXRfcHlfZnJvbV9lbmQgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDT0RFX0JFR19DT0wsIENPREVfQkVHX0xJTkUsIENPREVfRU5EX0NPTCwgQ09ERV9FTkRfTElORSwgUFlfQ09ERSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG4vL1RPRE86IGZha2Ugbm9kZS4uLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydCgpIHtcbiAgICAvLyBhcmdzIG5vZGUgZG9lc24ndCBleGlzdC4uLlxuICAgIHJldHVybjtcbn1cblxuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX1BPU09OTFkgPSAwO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX0tXQVJHICAgPSAxO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX0tXT05MWSAgPSAyO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX1ZBUkcgICAgPSAzO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX1BPUyAgICAgPSA0O1xuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJhcmd1bWVudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJncyhub2RlOiBhbnksIFNUeXBlX2ZjdDogU1R5cGVGY3QsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBjb25zdCBfYXJncyA9IG5vZGUuYXJncztcbiAgICBjb25zdCBoYXNfdmFyYXJnID0gX2FyZ3MudmFyYXJnICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzX2t3YXJnICA9IF9hcmdzLmt3YXJnICAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFyZ3NfcG9zICAgPSBtZXRhLmFyZ3NfcG9zO1xuICAgIGNvbnN0IGFyZ3NfbmFtZXMgPSBtZXRhLmFyZ3NfbmFtZXM7XG5cbiAgICBjb25zdCB0b3RhbF9hcmdzID0gX2FyZ3MucG9zb25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfdmFyYXJnXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmt3b25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfa3dhcmc7XG5cbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5PEFTVE5vZGU+KHRvdGFsX2FyZ3MpO1xuXG4gICAgY29uc3QgcG9zX2RlZmF1bHRzID0gbm9kZS5hcmdzLmRlZmF1bHRzO1xuICAgIGNvbnN0IHBvc29ubHkgPSBfYXJncy5wb3Nvbmx5YXJncztcbiAgICBjb25zdCBwb3MgICAgID0gX2FyZ3MuYXJncztcblxuICAgIC8vIHBvc29ubHlcbiAgICBsZXQgZG9mZnNldCA9IHBvc19kZWZhdWx0cy5sZW5ndGggLSBwb3Nvbmx5Lmxlbmd0aCAtIHBvcy5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvc29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc29ubHlbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIEZVTkNUSU9OU19BUkdTX1BPU09OTFksIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbcG9zb25seVtpXS5hcmddID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW2ldID0gYXJnO1xuICAgIH1cblxuICAgIC8vIHBvc1xuICAgIGxldCBvZmZzZXQgPSBwb3Nvbmx5Lmxlbmd0aDtcbiAgICAgIGRvZmZzZXQgLT0gcG9zb25seS5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvcy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcocG9zW2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBGVU5DVElPTlNfQVJHU19QT1MsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmFtZSA9IHBvc1tpXS5hcmc7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc19uYW1lc1tvZmZzZXRdID0gbmFtZTtcblxuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9XG5cbiAgICBtZXRhLmlkeF92YXJhcmcgPSBvZmZzZXQ7XG5cbiAgICAvLyB2YXJhcmdcbiAgICBpZiggaGFzX3ZhcmFyZyApIHtcbiAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhfYXJncy52YXJhcmcsIHVuZGVmaW5lZCwgRlVOQ1RJT05TX0FSR1NfVkFSRywgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tfYXJncy52YXJhcmcuYXJnXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbmJfcG9zX2RlZmF1bHRzID0gTWF0aC5taW4ocG9zX2RlZmF1bHRzLmxlbmd0aCwgcG9zLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGhhc19vdGhlcnMgPSBwb3NfZGVmYXVsdHMubGVuZ3RoID4gcG9zLmxlbmd0aCB8fCBhcmdzLmxlbmd0aCAhPT0gb2Zmc2V0O1xuXG4gICAgICAgIGlmKCBuYl9wb3NfZGVmYXVsdHMgPiAxIHx8IG5iX3Bvc19kZWZhdWx0cyA9PT0gMSAmJiBoYXNfb3RoZXJzKVxuICAgICAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyAtPSBuYl9wb3NfZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgbGV0IGN1dF9vZmYgICA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGN1dF9vZmYgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgY3V0X29mZiA9IG1ldGEuaWR4X3ZhcmFyZztcbiAgICBmb3IobGV0IGkgPSBwb3Nvbmx5Lmxlbmd0aDsgaSA8IGN1dF9vZmY7ICsraSlcbiAgICAgICAgYXJnc19wb3NbVkFMVUVTW2FyZ3NbaV0uaWRdXSA9IGk7XG5cbiAgICBjb25zdCBlbmQgPSBtZXRhLmlkeF92YXJhcmcgLSBjdXRfb2ZmO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmQ7ICsraSlcbiAgICAgICAgYXJnc19wb3NbVkFMVUVTW2FyZ3NbaV0uaWRdXSA9IC0xO1xuXG4gICAgLy9UT0RPOiBpZHhfZW5kX3BvcyAoaWYgZGVmYXVsdCBhbmQgbm8gaWR4X3ZhcmFyZylcblxuICAgIC8vIGt3b25seVxuICAgIGNvbnN0IGt3b25seSAgICAgID0gX2FyZ3Mua3dvbmx5YXJncztcbiAgICBjb25zdCBrd19kZWZhdWx0cyA9IF9hcmdzLmt3X2RlZmF1bHRzO1xuXG4gICAgbWV0YS5oYXNfa3cgPSBtZXRhLmlkeF92YXJhcmcgIT09IGN1dF9vZmYgfHwga3dvbmx5Lmxlbmd0aCAhPT0gMDtcblxuICAgIGRvZmZzZXQgPSBrd19kZWZhdWx0cy5sZW5ndGggLSBrd29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrd29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKGt3b25seVtpXSwga3dfZGVmYXVsdHNbaV0sIEZVTkNUSU9OU19BUkdTX0tXT05MWSwgY29udGV4dCk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBrd29ubHlbaV0uYXJnO1xuXG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc19wb3NbbmFtZV0gPSAtMTtcblxuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBrd2FyZ1xuICAgIGlmKCBoYXNfa3dhcmcgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKF9hcmdzLmt3YXJnLCB1bmRlZmluZWQsIEZVTkNUSU9OU19BUkdTX0tXQVJHLCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgbmFtZSA9IF9hcmdzLmt3YXJnLmFyZztcblxuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuXG4gICAgICAgIG1ldGEua3dhcmdzID0gbmFtZTtcbiAgICB9XG5cbiAgICAvL1RPRE8uLi5cbiAgICAvKlxuICAgIGlmKCBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIilcbiAgICAgICAgX2FyZ3MgPSBfYXJncy5zbGljZSgxKTtcbiAgICAqL1xuXG4gICAgLy9UT0RPLi4uXG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShGVU5DVElPTlNfQVJHUywgMCwgYXJncyk7XG4gICAgXG4gICAgYXN0LnR5cGVfaWQgPSBGVU5DVElPTlNfQVJHUztcbiAgICBWQUxVRVNbYXN0LmlkXSA9IFNUeXBlX2ZjdDtcbiAgICBcbiAgICBjb25zdCBweV9vZmZzZXQgPSA0KmFzdC5pZDtcblxuICAgIGlmKCBhcmdzLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIHNldF9weV9mcm9tX2JlZyggNCphcmdzWzBdLmlkICAgICAgICAgICAgLCBweV9vZmZzZXQgKTtcbiAgICAgICAgc2V0X3B5X2Zyb21fZW5kKCA0KmFyZ3NbYXJncy5sZW5ndGgtMV0uaWQsIHB5X29mZnNldCApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW4gZXN0aW1hdGlvbi4uLlxuICAgICAgICBjb25zdCBjb2wgPSBub2RlLmNvbF9vZmZzZXQgKyA0ICsgbm9kZS5uYW1lLmxlbmd0aCArIDE7XG5cbiAgICAgICAgUFlfQ09ERVsgcHlfb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdID0gUFlfQ09ERVsgcHlfb2Zmc2V0ICsgQ09ERV9FTkRfTElORSBdID0gbm9kZS5saW5lbm87XG4gICAgICAgIFBZX0NPREVbIHB5X29mZnNldCArIENPREVfQkVHX0NPTCAgXSA9IFBZX0NPREVbIHB5X29mZnNldCArIENPREVfRU5EX0NPTCAgXSA9IGNvbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6bnVtYmVyLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZSh0eXBlLCByZXN1bHRfdHlwZSwgY2hpbGRyZW4pO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLmFyZztcblxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59IiwiaW1wb3J0IHsgciwgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5mdW5jdGlvbiBwcmludF9vYmoob2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBpZihrZXlzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIFtbXV07XG5cbiAgICBjb25zdCBzdHIgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgrMSk7XG4gICAgc3RyWzBdID0gYHske2tleXNbMF19OiBgO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSAgPSBgLCAke2tleXNbaV19OiBgO1xuXG4gICAgc3RyW2ldID0gXCJ9XCI7XG5cbiAgICByZXR1cm4gW3N0ciwgLi4uT2JqZWN0LnZhbHVlcyhvYmopXTtcbn1cblxuZnVuY3Rpb24gam9pbihkYXRhOiBhbnlbXSwgc2VwPVwiLCBcIikge1xuXG4gICAgaWYoZGF0YS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW1wiXCJdXTtcblxuICAgIGNvbnN0IHN0ciA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCsxKTtcbiAgICBzdHJbMF0gPSBcIlwiO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSA9IHNlcDtcbiAgICBzdHJbaV0gPSBcIlwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLmRhdGFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdF9jYWxsKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IG1ldGEgPSAoVkFMVUVTW25vZGUuaWRdIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcblxuICAgIGxldCBrd19wb3MgPSBub2RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYobm9kZS5jaGlsZHJlbltpXS50eXBlX2lkID09PSBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEKSB7XG4gICAgICAgICAgICBrd19wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIGxldCBuYl9wb3MgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBuYl9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgbmJfcG9zID0gTWF0aC5tYXgobWV0YS5pZHhfdmFyYXJnLCBrd19wb3MtMSk7XG5cbiAgICBsZXQgcG9zX3NpemUgPSBuYl9wb3MrMTtcbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAgcG9zX3NpemUgPSBtZXRhLmlkeF92YXJhcmcrMjtcbiAgICBsZXQgcG9zID0gbmV3IEFycmF5KHBvc19zaXplKTtcbiAgICBcbiAgICBjb25zdCBrdyAgICA6IFJlY29yZDxzdHJpbmcsIEFTVE5vZGU+ID0ge307XG4gICAgY29uc3Qga3dhcmdzOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuXG4gICAgbGV0IGhhc19rdyA9IGZhbHNlO1xuXG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG1ldGEuaWR4X3ZhcmFyZyk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGN1dG9mZjsgKytpKVxuICAgICAgICAgICAgcG9zW2ktMV0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGlmKCBtZXRhLmlkeF92YXJhcmcrMSAhPT0ga3dfcG9zIClcbiAgICAgICAgICAgIHBvc1ttZXRhLmlkeF92YXJhcmddID0gam9pbihbXCJbXCIsIGpvaW4obm9kZS5jaGlsZHJlbi5zbGljZShtZXRhLmlkeF92YXJhcmcrMSxrd19wb3MpKSwgXCJdXCJdLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbmJfcG9zKzEpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuICAgICAgICBmb3IobGV0IGkgPSBjdXRvZmY7IGkgPCBrd19wb3M7ICsraSlcbiAgICAgICAgICAgIGt3WyBhcmdzX25hbWVzW2ktMV0gXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgaGFzX2t3ID0gY3V0b2ZmICE9PSBrd19wb3M7XG4gICAgfVxuXG4gICAgbGV0IGhhc19rd2FyZ3MgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFyZ3NfcG9zID0gbWV0YS5hcmdzX3BvcztcbiAgICBcblxuICAgIGZvcihsZXQgaSA9IGt3X3BvczsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBjb25zdCBhcmcgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgbmFtZSA9IFZBTFVFU1thcmcuaWRdO1xuICAgICAgICBjb25zdCBpZHggID0gYXJnc19wb3NbIG5hbWUgXTtcblxuICAgICAgICBpZiggaWR4ID49IDAgKSB7XG4gICAgICAgICAgICBwb3NbaWR4XSA9IGFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzX2t3ID0gdHJ1ZTtcblxuICAgICAgICBpZiggaWR4ID09PSAtMSlcbiAgICAgICAgICAgIGt3W25hbWVdID0gYXJnO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGt3YXJnc1tuYW1lXSA9IGFyZztcbiAgICAgICAgICAgIGhhc19rd2FyZ3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG9iajogUmVjb3JkPHN0cmluZywgYW55PiA9IGt3O1xuICAgIC8vVE9ETzogb25seSB0aGUgb25lcyBhdCAtMS4uLlxuICAgIGlmKCBoYXNfa3dhcmdzICYmICEgbWV0YS5oYXNfa3cgKXtcbiAgICAgICAgb2JqID0ga3dhcmdzO1xuICAgIH0gZWxzZSBpZiggaGFzX2t3YXJncyApIHtcbiAgICAgICAgb2JqW21ldGEua3dhcmdzIV0gPSBwcmludF9vYmooa3dhcmdzKTtcbiAgICB9XG5cbiAgICBpZiggaGFzX2t3IClcbiAgICAgICAgcG9zW3Bvcy5sZW5ndGgtMV0gPSBwcmludF9vYmoob2JqKTtcbiAgICBlbHNlIHtcbiAgICAgICAgd2hpbGUocG9zLmxlbmd0aCA+IDAgJiYgcG9zW3Bvcy5sZW5ndGgtMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC0tcG9zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke25vZGUuY2hpbGRyZW5bMF19KCR7am9pbihwb3MpfSlgOyAvLyBhcmdzID9cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICB3ciggKFZBTFVFU1tub2RlLmlkXSBhcyBTVHlwZUZjdCkuX19jYWxsX18uc3Vic3RpdHV0ZV9jYWxsIShub2RlKSApO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0NBTEwgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbmFtZSA9IG5vZGUuZnVuYy5pZDtcbiAgICBjb25zdCBmY3RfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSE7XG4gICAgaWYoIGZjdF90eXBlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihub2RlKTtcbiAgICAgICAgY29uc29sZS53YXJuKGNvbnRleHQubG9jYWxfc3ltYm9scyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gJHtuYW1lfSBub3QgZGVmaW5lZGApO1xuICAgIH1cblxuICAgIGNvbnN0IGZjdCA9IFNUeXBlc1tmY3RfdHlwZV07XG4gICAgY29uc3QgcmV0X3R5cGUgPSAoZmN0Ll9fY2FsbF9fIGFzIFNUeXBlRmN0U3VicykucmV0dXJuX3R5cGUoKTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKCBGVU5DVElPTlNfQ0FMTCwgcmV0X3R5cGUsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MgICAgLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKSxcbiAgICAgICAgLi4ubm9kZS5rZXl3b3Jkcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGtleXdvcmQgbm9kZS4uLlxuICAgIF0pO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBmY3Q7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhub2RlLmNoaWxkcmVuWzBdKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19DQUxMX0tFWVdPUkQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdmFsdWUgICAgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCApXG4gICAgY29uc3QgcmV0X3R5cGUgPSB2YWx1ZS5yZXN1bHRfdHlwZTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKEZVTkNUSU9OU19DQUxMX0tFWVdPUkQsIHJldF90eXBlLCBbXG4gICAgICAgIHZhbHVlXG4gICAgXSk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IG5vZGUuYXJnO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImtleXdvcmRcIjsiLCJpbXBvcnQgeyBOTCwgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbmFtZSA9IFZBTFVFU1tub2RlLmlkXTtcbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBjb25zdCBib2R5ID0gbm9kZS5jaGlsZHJlblsxXTtcblxuICAgIHd0YGZ1bmN0aW9uICR7bmFtZX0oJHthcmdzfSl7JHtib2R5fSR7Tkx9fWA7XG4gICAgLy93KCdmdW5jdGlvbiAnLCBuYW1lLCAnKCcsIGFyZ3MsICcpeycsIGJvZHksIE5MLCAnfScpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCwgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGVJRCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBkZWZhdWx0X2NhbGwgfSBmcm9tIFwiLi4vY2FsbC9hc3QyanNcIjtcbmltcG9ydCB7IGNvbnZlcnRfYXJncyB9IGZyb20gXCIuLi9hcmdzL2FzdGNvbnZlcnRcIjtcbmltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0RFRiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuLy8gcmVxdWlyZWQgYXMgc29tZSBzeW1ib2xzIG1heSBoYXZlIGJlZW4gZGVjbGFyZWQgb3V0IG9mIG9yZGVyXG4vLyAobm90IG9ubHkgZm9yIHJldHVybiB0eXBlIGNvbXB1dGF0aW9uKVxuZnVuY3Rpb24gZ2VuZXJhdGUobm9kZTogYW55LCBhc3Rub2RlOiBBU1ROb2RlLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBmdWNrLi4uXG4gICAgY29uc3Qgc3R5cGUgICA9IFNUeXBlc1thc3Rub2RlLnJlc3VsdF90eXBlXSBhcyBTVHlwZUZjdDtcbiAgICBjb25zdCBtZXRhICAgID0gc3R5cGUuX19jYWxsX187XG5cbiAgICAvLyBuZXcgY29udGV4dCBmb3IgdGhlIGZ1bmN0aW9uIGxvY2FsIHZhcmlhYmxlc1xuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImZjdFwiLCBjb250ZXh0KTtcbiAgICBjb250ZXh0LnBhcmVudF9ub2RlX2NvbnRleHQgPSBhc3Rub2RlOyAvLyA8LSBoZXJlXG5cbiAgICAvLyBmYWtlIHRoZSBub2RlLi4uID0+IGJldHRlciBkb2luZyBoZXJlIHRvIG5vdCBoYXZlIGNvbnRleHQgaXNzdWVzLlxuICAgIGNvbnN0IGFyZ3MgPSBjb252ZXJ0X2FyZ3Mobm9kZSwgc3R5cGUsIGNvbnRleHQpO1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tWQUxVRVNbYXJnLmlkXV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAvLyB0ZWxsIGJvZHkgdGhpcyBmdW5jdGlvbiBoYXMgYmVlbiBnZW5lcmF0ZWQuXG4gICAgbWV0YS5nZW5lcmF0ZSA9IHVuZGVmaW5lZDtcbiAgICAvLyBwcmV2ZW50cyByZWN1cnNpdmUgY2FsbHMgb3IgcmVhZmZlY3RhdGlvbi5cbiAgICBtZXRhLnJldHVybl90eXBlID0gdW5kZWZpbmVkIGFzIGFueTtcblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlLnJldHVybnM/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGxldCBmY3RfcmV0dXJuX3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuICAgICAgICAvLyBmb3JjZSB0aGUgdHlwZS5cbiAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSA9ICgpID0+IGZjdF9yZXR1cm5fdHlwZSE7XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBib2R5XG4gICAgYXN0bm9kZS5jaGlsZHJlbiA9IFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dClcbiAgICBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy9jb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiO1xuXG4gICAgY29uc3QgU1R5cGVfZmN0OiBTVHlwZUZjdCA9IHtcbiAgICAgICAgX19uYW1lX186IFwiZnVuY3Rpb25cIixcbiAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgIGFyZ3NfbmFtZXMgICAgIDogbmV3IEFycmF5KG5vZGUuYXJncy5hcmdzLmxlbmd0aCtub2RlLmFyZ3MucG9zb25seWFyZ3MubGVuZ3RoKSxcbiAgICAgICAgICAgIGFyZ3NfcG9zICAgICAgIDoge30sXG4gICAgICAgICAgICBpZHhfZW5kX3BvcyAgICA6IC0xLFxuICAgICAgICAgICAgaWR4X3ZhcmFyZyAgICAgOiAtMSxcbiAgICAgICAgICAgIGhhc19rdyAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBnZW5lcmF0ZSxcbiAgICAgICAgICAgIHJldHVybl90eXBlICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlKG5vZGUsIGFzdCwgY29udGV4dCk7IC8vIHNob3VsZCBiZSB0aGUgbmV3IGNvbnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gU1R5cGVfZmN0Ll9fY2FsbF9fLnJldHVybl90eXBlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBkZWZhdWx0X2NhbGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IFNUeXBlSUQgPSBTVHlwZXMubGVuZ3RoO1xuICAgIFNUeXBlc1tTVHlwZUlEXSA9IFNUeXBlX2ZjdDtcblxuICAgIC8vaWYoICEgaXNNZXRob2QgKSB7XG4gICAgLy8gaWYgbWV0aG9kIGFkZCB0byBzZWxmX2NvbnRleHQuc3ltYm9scyA/XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUubmFtZV0gPSBTVHlwZUlEO1xuXG5cbiAgICAvLyBpbXBsaWNpdCByZXR1cm4uLi5cbiAgICBjb25zdCBsYXN0X3R5cGUgICA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdLmNvbnN0cnVjdG9yLiRuYW1lO1xuICAgIGlmKCBsYXN0X3R5cGUgIT09IFwiUmV0dXJuXCIgJiYgbGFzdF90eXBlICE9PSBcIlJhaXNlXCIgKSB7XG5cbiAgICAgICAgY29uc3QgZmFrZV9ub2RlID0ge1xuICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICAkbmFtZTogXCJSZXR1cm5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lbm86IG5vZGUuZW5kX2xpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm86IG5vZGUuZW5kX2xpbmVubyxcbiAgICAgICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmVuZF9jb2xfb2Zmc2V0LFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IG5vZGUuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5ib2R5LnB1c2goIGZha2Vfbm9kZSApO1xuICAgIH1cblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKEZVTkNUSU9OU19ERUYsIFNUeXBlSUQpO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLm5hbWU7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG4gICAgXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgcmV0dXJuIHd0YF9iXy5hc3NlcnQoJHtub2RlLmNoaWxkcmVuWzBdfSlgO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgS0VZV09SRFNfQVNTRVJUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKEtFWVdPUkRTX0FTU0VSVCwgMCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkFzc2VydFwiOyIsImZ1bmN0aW9uIGFzc2VydChjb25kOiBib29sZWFuKSB7XG4gICAgaWYoIGNvbmQgKVxuICAgICAgICByZXR1cm47XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXNzZXJ0XG59OyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhcImJyZWFrXCIpO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgS0VZV09SRFNfQlJFQUsgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShLRVlXT1JEU19CUkVBSywgMCk7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQnJlYWtcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJjb250aW51ZVwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEtFWVdPUkRTX0NPTlRJTlVFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShLRVlXT1JEU19DT05USU5VRSwgMCk7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29udGludWVcIjsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBjb25zdCB2YWx1ZSA9IFZBTFVFU1tub2RlLmlkXTtcblxuICAgIGlmKCB2YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdyh2YWx1ZVswXSk7XG5cbiAgICB3dGAke3ZhbHVlWzBdfTogJHt2YWx1ZVsxXX1gO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgS0VZV09SRFNfSU1QT1JUX0FMSUFTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShLRVlXT1JEU19JTVBPUlRfQUxJQVMsIDAsIFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXSk7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcoXCJjb25zdCB7XCIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICB3KFwiLCBcIik7XG4gICAgICAgIHcobm9kZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgdygnfSA9ICcpO1xuXG4gICAgY29uc3QgdmFsdWUgPSBWQUxVRVNbbm9kZS5pZF07XG4gICAgXG4gICAgaWYodmFsdWUgPT09IG51bGwpXG4gICAgICAgIHcoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIpO1xuICAgIGVsc2VcbiAgICAgICAgd3RgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dmFsdWV9XCIpYDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEtFWVdPUkRTX0lNUE9SVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShLRVlXT1JEU19JTVBPUlQsIDAsXG4gICAgICAgIG5vZGUubmFtZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcblxuICAgIFZBTFVFU1thc3QuaWQgPSBub2RlLm1vZHVsZV07XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHd0YHRocm93IG5ldyBfYl8uUHl0aG9uRXJyb3IoJHt0aGlzLmNoaWxkcmVuWzBdfSlgO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgS0VZV09SRFNfUkFJU0UgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoS0VZV09SRFNfUkFJU0UsIDAsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xuICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz1faW5pdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz1faW5pdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNSBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjEgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2tleXdvcmRzL2NvbnRpbnVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNSBmcm9tIFwiLi9rZXl3b3Jkcy9jb250aW51ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNiBmcm9tIFwiLi9rZXl3b3Jkcy9icmVhay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4va2V5d29yZHMvYnJlYWsvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNyBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjcgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOCBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI5IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOSBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMCBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMxIGZyb20gXCIuL2Z1bmN0aW9ucy9hcmdzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMSBmcm9tIFwiLi9mdW5jdGlvbnMvYXJncy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdGVybmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzcgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvcl9yYW5nZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzcgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvcl9yYW5nZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM5IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zOSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80MCBmcm9tIFwiLi9ib2R5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180MCBmcm9tIFwiLi9ib2R5L2FzdDJqcy50c1wiO1xuXG5cbmV4cG9ydCBjb25zdCBTWU1CT0wgPSAwO1xuZXhwb3J0IGNvbnN0IFNUUlVDVFNfVFVQTEUgPSAxO1xuZXhwb3J0IGNvbnN0IFNUUlVDVFNfTElTVCA9IDI7XG5leHBvcnQgY29uc3QgU1RSVUNUU19ESUNUID0gMztcbmV4cG9ydCBjb25zdCBSRVRVUk4gPSA0O1xuZXhwb3J0IGNvbnN0IFBBU1MgPSA1O1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19VTkFSWSA9IDY7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0NPTVBBUkUgPSA3O1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19CT09MRUFOID0gODtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfQklOQVJZID0gOTtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfQVRUUiA9IDEwO1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19fQlJBQ0tFVFMgPSAxMTtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfQVNTSUdOT1AgPSAxMjtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfX0VRX0lOSVQgPSAxMztcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfX0VRID0gMTQ7XG5leHBvcnQgY29uc3QgTElURVJBTFNfU1RSID0gMTU7XG5leHBvcnQgY29uc3QgTElURVJBTFNfSU5UID0gMTY7XG5leHBvcnQgY29uc3QgTElURVJBTFNfRkxPQVQgPSAxNztcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19GX1NUUklORyA9IDE4O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0ZfU1RSSU5HX0ZPUk1BVFRFRFZBTFVFID0gMTk7XG5leHBvcnQgY29uc3QgTElURVJBTFNfQk9PTCA9IDIwO1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX05PTkUgPSAyMTtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19SQUlTRSA9IDIyO1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX0lNUE9SVCA9IDIzO1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX0lNUE9SVF9BTElBUyA9IDI0O1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX0NPTlRJTlVFID0gMjU7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfQlJFQUsgPSAyNjtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19BU1NFUlQgPSAyNztcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfREVGID0gMjg7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0NBTEwgPSAyOTtcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEID0gMzA7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0FSR1MgPSAzMTtcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfV0hJTEUgPSAzMjtcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfVFJZQkxPQ0sgPSAzMztcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfVFJZQkxPQ0tfQ0FUQ0ggPSAzNDtcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfVEVSTkFSWSA9IDM1O1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19JRkJMT0NLID0gMzY7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX0ZPUl9SQU5HRSA9IDM3O1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19GT1IgPSAzODtcbmV4cG9ydCBjb25zdCBDTEFTU19DTEFTU0RFRiA9IDM5O1xuZXhwb3J0IGNvbnN0IEJPRFkgPSA0MDtcblxuZXhwb3J0IGNvbnN0IEFTVF9DT05WRVJUID0gW1xuXHRBU1RfQ09OVkVSVF8wLFxuXHRBU1RfQ09OVkVSVF8xLFxuXHRBU1RfQ09OVkVSVF8yLFxuXHRBU1RfQ09OVkVSVF8zLFxuXHRBU1RfQ09OVkVSVF80LFxuXHRBU1RfQ09OVkVSVF81LFxuXHRBU1RfQ09OVkVSVF82LFxuXHRBU1RfQ09OVkVSVF83LFxuXHRBU1RfQ09OVkVSVF84LFxuXHRBU1RfQ09OVkVSVF85LFxuXHRBU1RfQ09OVkVSVF8xMCxcblx0QVNUX0NPTlZFUlRfMTEsXG5cdEFTVF9DT05WRVJUXzEyLFxuXHRBU1RfQ09OVkVSVF8xMyxcblx0QVNUX0NPTlZFUlRfMTQsXG5cdEFTVF9DT05WRVJUXzE1LFxuXHRBU1RfQ09OVkVSVF8xNixcblx0QVNUX0NPTlZFUlRfMTcsXG5cdEFTVF9DT05WRVJUXzE4LFxuXHRBU1RfQ09OVkVSVF8xOSxcblx0QVNUX0NPTlZFUlRfMjAsXG5cdEFTVF9DT05WRVJUXzIxLFxuXHRBU1RfQ09OVkVSVF8yMixcblx0QVNUX0NPTlZFUlRfMjMsXG5cdEFTVF9DT05WRVJUXzI0LFxuXHRBU1RfQ09OVkVSVF8yNSxcblx0QVNUX0NPTlZFUlRfMjYsXG5cdEFTVF9DT05WRVJUXzI3LFxuXHRBU1RfQ09OVkVSVF8yOCxcblx0QVNUX0NPTlZFUlRfMjksXG5cdEFTVF9DT05WRVJUXzMwLFxuXHRBU1RfQ09OVkVSVF8zMSxcblx0QVNUX0NPTlZFUlRfMzIsXG5cdEFTVF9DT05WRVJUXzMzLFxuXHRBU1RfQ09OVkVSVF8zNCxcblx0QVNUX0NPTlZFUlRfMzUsXG5cdEFTVF9DT05WRVJUXzM2LFxuXHRBU1RfQ09OVkVSVF8zNyxcblx0QVNUX0NPTlZFUlRfMzgsXG5cdEFTVF9DT05WRVJUXzM5LFxuXHRBU1RfQ09OVkVSVF80MCxcbl1cblxuZXhwb3J0IGNvbnN0IEFTVDJKUyA9IFtcblx0QVNUMkpTXzAsXG5cdEFTVDJKU18xLFxuXHRBU1QySlNfMixcblx0QVNUMkpTXzMsXG5cdEFTVDJKU180LFxuXHRBU1QySlNfNSxcblx0QVNUMkpTXzYsXG5cdEFTVDJKU183LFxuXHRBU1QySlNfOCxcblx0QVNUMkpTXzksXG5cdEFTVDJKU18xMCxcblx0QVNUMkpTXzExLFxuXHRBU1QySlNfMTIsXG5cdEFTVDJKU18xMyxcblx0QVNUMkpTXzE0LFxuXHRBU1QySlNfMTUsXG5cdEFTVDJKU18xNixcblx0QVNUMkpTXzE3LFxuXHRBU1QySlNfMTgsXG5cdEFTVDJKU18xOSxcblx0QVNUMkpTXzIwLFxuXHRBU1QySlNfMjEsXG5cdEFTVDJKU18yMixcblx0QVNUMkpTXzIzLFxuXHRBU1QySlNfMjQsXG5cdEFTVDJKU18yNSxcblx0QVNUMkpTXzI2LFxuXHRBU1QySlNfMjcsXG5cdEFTVDJKU18yOCxcblx0QVNUMkpTXzI5LFxuXHRBU1QySlNfMzAsXG5cdEFTVDJKU18zMSxcblx0QVNUMkpTXzMyLFxuXHRBU1QySlNfMzMsXG5cdEFTVDJKU18zNCxcblx0QVNUMkpTXzM1LFxuXHRBU1QySlNfMzYsXG5cdEFTVDJKU18zNyxcblx0QVNUMkpTXzM4LFxuXHRBU1QySlNfMzksXG5cdEFTVDJKU180MCxcbl1cblxuY29uc3QgUlVOVElNRSA9IHt9O1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzkpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzE3KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yMik7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjcpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzMzKTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoXCJudWxsXCIpO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfTk9ORSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfTk9ORVRZUEUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoTElURVJBTFNfTk9ORSwgU1RZUEVfTk9ORVRZUEUpO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBhZGRTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnTm9uZVR5cGUnLCB7fSk7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgdyggVkFMVUVTW25vZGUuaWRdICk7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19CT09MIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVFlQRV9CT09MIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKExJVEVSQUxTX0JPT0wsIFNUWVBFX0JPT0wpO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gbm9kZS52YWx1ZTtcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQ21wT3BzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IGFkZFNUeXBlICB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnYm9vbCcsIHtcbiAgICAuLi5nZW5DbXBPcHMoQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpLFxufSk7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiJHtcIiwgbm9kZS5jaGlsZHJlblswXSwgXCJ9XCIpXG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSwgMCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICBdKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvcm1hdHRlZFZhbHVlXCI7IiwiaW1wb3J0IHsgc2V0X2pzX2N1cnNvciwgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX0ZfU1RSSU5HX0ZPUk1BVFRFRFZBTFVFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ09ERV9CRUcsIENPREVfRU5ELCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfU1RSIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiYFwiKTtcblxuICAgIGZvcihsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuXG4gICAgICAgIGlmKCBjaGlsZC5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfU1RSKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDQqY2hpbGQuaWQ7XG4gICAgICAgICAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfQkVHKTtcblxuICAgICAgICAgICAgdyhWQUxVRVNbY2hpbGQuaWRdKTtcblxuICAgICAgICAgICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0VORCk7XG5cbiAgICAgICAgfSBlbHNlIGlmKGNoaWxkLnR5cGVfaWQgPT09IExJVEVSQUxTX0ZfU1RSSU5HX0ZPUk1BVFRFRFZBTFVFKSB7XG4gICAgICAgICAgICB3KGNoaWxkKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICB3KFwiYFwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX0ZfU1RSSU5HIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShMSVRFUkFMU19GX1NUUklORywgMCwgW1xuICAgICAgICAuLi5ub2RlLnZhbHVlcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkpvaW5lZFN0clwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoVkFMVUVTW25vZGUuaWRdKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX0ZMT0FUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVFlQRV9GTE9BVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChub2RlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fICE9PSBcImZsb2F0XCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKExJVEVSQUxTX0ZMT0FULCBTVFlQRV9GTE9BVCk7XG4gICAgXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLnZhbHVlLnZhbHVlO1xuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9hdDJzdHI6IChmOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYoIGYgPD0gMWUtNSB8fCBmID49IDFlMTYpIHtcblxuICAgICAgICAgICAgbGV0IHN0ciA9IGYudG9FeHBvbmVudGlhbCgpO1xuICAgICAgICAgICAgY29uc3Qgc2lnbl9pZHggPSBzdHIubGVuZ3RoLTI7XG4gICAgICAgICAgICBpZihzdHJbc2lnbl9pZHhdID09PSAnLScgfHwgc3RyW3NpZ25faWR4XSA9PT0gJysnKVxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLHNpZ25faWR4KzEpICsgJzAnICsgc3RyLnNsaWNlKHNpZ25faWR4KzEpO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHIgPSBmLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKCAhIHN0ci5pbmNsdWRlcygnLicpKVxuICAgICAgICAgICAgc3RyICs9IFwiLjBcIjtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX1NUUiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIEludDJOdW1iZXIgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IENPTlZFUlRfSU5UMkZMT0FUIH0gZnJvbSBcInN0cnVjdHMvQ29udmVydGVyc1wiO1xuaW1wb3J0IHsgUkVUX0lKQkYyQk9PTCwgUkVUX0lKQkYyRkxPQVQsIFJFVF9GTE9BVCwgUkVUX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1JldHVyblR5cGVGY3RzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUWVBFX0ZMT0FULCBTVFlQRV9JTlQsIFNUWVBFX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmV4cG9ydCBjb25zdCBTVHlwZV90eXBlX2Zsb2F0ID0gYWRkU1R5cGUoJ3R5cGVbZmxvYXRdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0ZMT0FULFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0ZMT0FUIHx8IG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXJfdHlwZTtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX1NUUiApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyX3ZhbHVlID0gVkFMVUVTW290aGVyLmlkXTtcblxuICAgICAgICAgICAgICAgIGlmKCBvdGhlci50eXBlX2lkID09PSBMSVRFUkFMU19TVFIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvdGhlcl92YWx1ZSA9PT0gXCJpbmZcIiB8fCBvdGhlcl92YWx1ZSA9PT0gXCJpbmZpbml0eVwiIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk51bWJlci5QT1NJVElWRV9JTkZJTklUWVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXJfdmFsdWUgPT09IFwiLWluZlwifHwgb3RoZXJfdmFsdWUgPT09IFwiLWluZmluaXR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2lmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMylcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gcmBCaWdJbnQocGFyc2VJbnQoJHtvdGhlcn0sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE86IG9wdGltaXplIGlmIG90aGVyIGlzIHN0cmluZyBsaXR0ZXJhbC4uLlxuICAgICAgICAgICAgICAgIHJldHVybiByYHBhcnNlRmxvYXQoJHtvdGhlcn0pYDsgLy8sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnZmxvYXQnLCB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2Zsb2F0LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9hdDJzdHIoJHtub2RlfSlgO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycqKicsICcqJywgJy8nLCAnKycsICctJ10sIFJFVF9JSkJGMkZMT0FULFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyUnXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FULFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoWyd1Li0nXSAgICAsIFJFVF9GTE9BVCksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpLFxufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgdmFsdWUgPSBWQUxVRVNbbm9kZS5pZF07XG5cbiAgICBpZiggbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UICkge1xuICAgICAgICB3dGAke3ZhbHVlfW5gO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKCB0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIgKVxuICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7IC8vIHJlbW92ZSB1c2VsZXNzIHByZWNpc2lvbi5cblxuICAgIHcodmFsdWUpO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfSU5UIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVFlQRV9JTlQgOiBTVFlQRV9KU0lOVDtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKExJVEVSQUxTX0lOVCwgcmVhbF90eXBlKTtcbiAgICBcbiAgICBWQUxVRVNbYXN0LmlkXSA9IHZhbHVlO1xuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIGlkX2pzb3AsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IENPTlZFUlRfMklOVCwgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MLCBSRVRfSUpCRjJGTE9BVCwgUkVUX0lKMklOVCwgUkVUX0lOVCwgUkVUX0lOVDJJTlQsIFJFVF9TVFIgfSBmcm9tIFwic3RydWN0cy9SZXR1cm5UeXBlRmN0c1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCwgU1RZUEVfU1RSIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBTVHlwZV90eXBlX2ludCA9IGFkZFNUeXBlKCd0eXBlW2ludF0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiBSRVRfSU5ULFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG90aGVyKTtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgQmlnSW50KE1hdGgudHJ1bmMoJHtvdGhlcn0pKWA7XG5cbiAgICAgICAgICAgIC8vVE9ETzogcG93ZXIuLi5cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVFlQRV9TVFIgKSB7XG5cbiAgICAgICAgICAgICAgICAvL2lmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMylcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gcmBCaWdJbnQocGFyc2VJbnQoJHtvdGhlcn0sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE86IG9wdGltaXplIGlmIG90aGVyIGlzIHN0cmluZyBsaXR0ZXJhbC4uLlxuICAgICAgICAgICAgICAgIHJldHVybiByYEJpZ0ludCgke290aGVyfSlgOyAvLywgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG90aGVyLnJlc3VsdF90eXBlPy5fX2ludF9fIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgICAgIGlmKCBtZXRob2QgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke290aGVyLnJlc3VsdF90eXBlLl9fbmFtZV9ffS5fX2ludF9fIG5vdCBkZWZpbmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgb3RoZXIpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmFkZFNUeXBlKCdpbnQnLCB7XG5cbiAgICAvL1RPRE86IGZpeCB0eXBlLi4uXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9pbnQsXG5cbiAgICBfX3N0cl9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiBSRVRfU1RSLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHtub2RlfS50b1N0cmluZygpYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiBSRVRfSU5ULFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qICovXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFtcbiAgICAgICAgICAgIC8vICcqKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8J1xuICAgICAgICBdLFxuICAgICAgICBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlRcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnKiddLCBSRVRfSU5UMklOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGEsIGIpIHtcblxuICAgICAgICAgICAgICAgIGlmKCBub2RlLnJlc3VsdF90eXBlID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqJywgYik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvJ10sIFJFVF9JSkJGMkZMT0FULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiBDT05WRVJUX0lOVDJGTE9BVCxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FUXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8vJ10sIFJFVF9JSjJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDogQ09OVkVSVF8ySU5ULFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWyclJ10sIFJFVF9JSjJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfMklOVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFsndS4tJ10sIFJFVF9JTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCBub2RlLnJlc3VsdF90eXBlID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgSW50Mk51bWJlcihhKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoIFsnfiddLCBSRVRfSU5UKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCwgUkVUX0lKQkYyQk9PTClcbiAgICAvKiAqL1xuXG59KTsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyLCBOdW1iZXIySW50LCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBDT05WRVJUXzJJTlQsIENPTlZFUlRfSU5UMkZMT0FUIH0gZnJvbSBcInN0cnVjdHMvQ29udmVydGVyc1wiO1xuaW1wb3J0IHsgUkVUX0lKMklOVCwgUkVUX0lKQkYyQk9PTCwgUkVUX0lKQkYyRkxPQVQsIFJFVF9JTlQsIFJFVF9KU0lOVCwgUkVUX0pTSU5UMkpTSU5UIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdqc2ludCcsIHtcblxuICAgIC4uLmdlbkJpbmFyeU9wcyhcbiAgICAgICAgLy8gJyoqJyBhbmQgJyonID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgIFtcbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8JyAvLyBpbiBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgb24gMzJiaXRzXG4gICAgICAgIF0sXG4gICAgICAgIFJFVF9JSjJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IENPTlZFUlRfMklOVCxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfMklOVFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycqJ10sIFJFVF9JSjJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEsIGIpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCBub2RlLnJlc3VsdF90eXBlID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIE51bWJlcjJJbnQoYSksICcqJywgTnVtYmVyMkludChiKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF9JTlQyRkxPQVRcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnLy8nXSwgUkVUX0pTSU5UMkpTSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnJSddLCBSRVRfSlNJTlQySlNJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFsndS4tJ10sIFJFVF9KU0lOVCwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBOdW1iZXIySW50KGEpICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhbJ34nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICBSRVRfSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiBDT05WRVJUXzJJTlRcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpXG4gICAgLypcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSwqL1xufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHd0YCcke1ZBTFVFU1tub2RlLmlkXX0nYDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IExJVEVSQUxTX1NUUiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1RZUEVfU1RSIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShMSVRFUkFMU19TVFIsIFNUWVBFX1NUUik7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IG5vZGUudmFsdWU7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wc30gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBDT05WRVJUX0lOVDJGTE9BVCB9IGZyb20gXCJzdHJ1Y3RzL0NvbnZlcnRlcnNcIjtcbmltcG9ydCB7IFJFVF9JSjJTVFIsIFJFVF9JTlQsIFJFVF9TVFIsIFJFVF9TVFIyQk9PTCwgUkVUX1NUUjJTVFIgfSBmcm9tIFwic3RydWN0cy9SZXR1cm5UeXBlRmN0c1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVFlQRV9TVFIsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9zdHIgPSBhZGRTVHlwZSgndHlwZVtzdHJdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBSRVRfU1RSIClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG5cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IFNUeXBlc1tvdGhlci5yZXN1bHRfdHlwZV0/Ll9fc3RyX18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7U1R5cGVzW290aGVyLnJlc3VsdF90eXBlXS5fX25hbWVfX30uX19zdHJfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnc3RyJywge1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9zdHIsXG5cbiAgICBfX2xlbl9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiBSRVRfSU5ULFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChfKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmAke18uY2hpbGRyZW5bMV19Lmxlbmd0aGA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLi4uZ2VuQ21wT3BzICAgKENNUE9QU19MSVNULCBSRVRfU1RSMkJPT0wpLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbXCIrXCJdICAgICAgLCBSRVRfU1RSMlNUUiksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFtcIipcIl0gICAgICAsIFJFVF9JSjJTVFIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGEucmVzdWx0X3R5cGUgIT09IFNUWVBFX1NUUiApXG4gICAgICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmAke2F9LnJlcGVhdCgke2J9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIFxuICAgIHcobm9kZS5jaGlsZHJlblswXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgKytpKVxuICAgICAgICB3dGAgPSAke25vZGUuY2hpbGRyZW5baV19YDtcblxuICAgIGNvbnN0IHJpZ2h0X25vZGUgPSBub2RlLmNoaWxkcmVuW25vZGUuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuICAgIGxldCByY2hpbGQ6IGFueSA9IHJpZ2h0X25vZGU7XG5cbiAgICBpZiggcmlnaHRfbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSlNJTlQgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChyaWdodF9ub2RlKTtcblxuICAgIHd0YCA9ICR7cmNoaWxkfWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfX0VRLCBTWU1CT0wgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGVJRCwgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgaXNNdWx0aVRhcmdldCA9IFwidGFyZ2V0c1wiIGluIG5vZGU7XG4gICAgY29uc3QgdGFyZ2V0cyA9IGlzTXVsdGlUYXJnZXQgPyBub2RlLnRhcmdldHMgOiBbbm9kZS50YXJnZXRdO1xuXG4gICAgaWYoICAgIGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiXG4gICAgICAgICYmIHRhcmdldHNbMF0uY29uc3RydWN0b3IuJG5hbWUgPT09IFwiTmFtZVwiXG4gICAgICAgICYmICEodGFyZ2V0c1swXS52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHMpXG4gICAgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICBsZXQgcmlnaHRfdHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlPy5hbm5vdGF0aW9uPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGdldFNUeXBlSUQoYW5ub3RhdGlvbik7XG5cblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgLy8gY291bGQgYmUgaW1wcm92ZWQgSSBndWVzcy5cbiAgICAgICAgaWYoIGxlZnQudHlwZV9pZCA9PT0gU1lNQk9MKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgY29uc3QgbHN5bSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tuLmlkXTtcbiAgICAgICAgICAgIGlmKCBsc3ltICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdF90eXBlID0gbHN5bTtcbiAgICAgICAgICAgICAgICBpZiggbGVmdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IGxlZnRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfX0VRLCByZXN1bHRfdHlwZSxcbiAgICAgICAgW1xuICAgICAgICAgICAgLi4ubGVmdHMsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7ICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcbiAgICBcbiAgICB3KFwidmFyIFwiKTtcblxuICAgIHcobm9kZS5jaGlsZHJlblswXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgKytpKVxuICAgICAgICB3dGAgPSAke25vZGUuY2hpbGRyZW5baV19YDtcblxuICAgIGNvbnN0IHJpZ2h0X25vZGUgPSBub2RlLmNoaWxkcmVuW25vZGUuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuICAgIGxldCByY2hpbGQ6IGFueSA9IHJpZ2h0X25vZGU7XG5cbiAgICBpZiggcmlnaHRfbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSlNJTlQgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChyaWdodF9ub2RlKTtcblxuICAgIHd0YCA9ICR7cmNoaWxkfWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfX0VRX0lOSVQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGVJRCwgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgaXNNdWx0aVRhcmdldCA9IFwidGFyZ2V0c1wiIGluIG5vZGU7XG4gICAgY29uc3QgdGFyZ2V0cyA9IGlzTXVsdGlUYXJnZXQgPyBub2RlLnRhcmdldHMgOiBbbm9kZS50YXJnZXRdO1xuXG4gICAgaWYoICAgIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiXG4gICAgICAgIHx8IHRhcmdldHNbMF0uY29uc3RydWN0b3IuJG5hbWUgIT09IFwiTmFtZVwiXG4gICAgICAgIHx8IHRhcmdldHNbMF0udmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzXG4gICAgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICBsZXQgcmlnaHRfdHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlPy5hbm5vdGF0aW9uPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGdldFNUeXBlSUQoYW5ub3RhdGlvbik7XG5cblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tuLmlkXSA9IHJlc3VsdF90eXBlO1xuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoT1BFUkFUT1JTX19FUV9JTklULCByZXN1bHRfdHlwZSxcbiAgICAgICAgW1xuICAgICAgICAgICAgLi4ubGVmdHMsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7ICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEFzc2lnbk9wZXJhdG9ycyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX05PVF9JTVBMRU1FTlRFRCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgbGVmdCAgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IG5vZGUuY2hpbGRyZW5bMV07XG5cbiAgICBsZXQgb3AgPSBBc3NpZ25PcGVyYXRvcnNbVkFMVUVTW25vZGUuaWRdIGFzIGtleW9mIHR5cGVvZiBBc3NpZ25PcGVyYXRvcnNdO1xuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tsZWZ0LnJlc3VsdF90eXBlXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgYSA9IGEgKyBiXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9PSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcbiAgICAgICAgLypcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICB3ciggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgbGVmdCwgcmlnaHQpICk7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfQVNTSUdOT1AsIE9QRVJBVE9SU19CSU5BUlkgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS50YXJnZXQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWUgYXMga2V5b2YgdHlwZW9mIGJuYW1lMnB5bmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoT1BFUkFUT1JTX0FTU0lHTk9QLCBsZWZ0LnJlc3VsdF90eXBlLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IG9wO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF1Z0Fzc2lnblwiXTsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgd3RgJHtub2RlLmNoaWxkcmVuWzBdfVske25vZGUuY2hpbGRyZW5bMV19XWA7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfX0JSQUNLRVRTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKE9QRVJBVE9SU19fQlJBQ0tFVFMsIDAsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHd0YCR7bm9kZS5jaGlsZHJlblswXX0uJHtWQUxVRVNbbm9kZS5pZF19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19BVFRSIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQVRUUiwgMCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBub2RlLmF0dHI7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGxldCBsZWZ0ICA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gbm9kZS5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IFNUeXBlc1tsZWZ0LnJlc3VsdF90eXBlXSFbVkFMVUVTW25vZGUuaWRdXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICB3ciggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgbGVmdCwgcmlnaHQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVFlQRV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBPUEVSQVRPUlNfQklOQVJZIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUycHluYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbGVmdC5yZXN1bHRfdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBQYXJhbWV0ZXJzPHR5cGVvZiByZXZlcnNlZF9vcGVyYXRvcj5bMF0pO1xuICAgICAgICBtZXRob2QgPSBTVHlwZXNbcmlnaHQucmVzdWx0X3R5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1RZUEVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQklOQVJZLCB0eXBlLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG5cbiAgICBWQUxVRVNbYXN0LmlkXSA9IG9wO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9mbG9hdDogKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCBhL2IgKTtcbiAgICB9LFxuICAgIGZsb29yZGl2X2ludDogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIC0tcmVzdWx0O1xuICAgIH0sXG4gICAgbW9kX2Zsb2F0OiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcblxuICAgICAgICBjb25zdCBtb2QgPSAoYSAlIGIgKyBiKSAlIGI7XG4gICAgICAgIGlmKCBtb2QgPT09IDAgJiYgYiA8IDAgKVxuICAgICAgICAgICAgcmV0dXJuIC0wO1xuICAgICAgICByZXR1cm4gbW9kO1xuICAgIH0sXG4gICAgbW9kX2ludDogPFQ+KGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChhICUgYiArIGIpICUgYjtcbiAgICB9XG59IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbXVsdGlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHdyKCBtdWx0aV9qc29wKG5vZGUsIFZBTFVFU1tub2RlLmlkXSwgLi4ubm9kZS5jaGlsZHJlbikgKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19CT09MRUFOIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuY29uc3QgYm5hbWUyanNvcCA9IHtcbiAgICAnQW5kJzogJyYmJyxcbiAgICAnT3InIDogJ3x8J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUudmFsdWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCApICk7XG5cbiAgICBjb25zdCBvcCAgID0gYm5hbWUyanNvcFtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJqc29wXTtcbiAgICBjb25zdCB0eXBlID0gY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfQk9PTEVBTiwgdHlwZSwgY2hpbGRyZW4pO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gb3A7XG5cbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJvb2xPcFwiXTsiLCJpbXBvcnQgeyB3LCB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmZ1bmN0aW9uIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZShub2RlOiBBU1ROb2RlLCBsZWZ0OkFTVE5vZGUsIG9wOiBzdHJpbmcsIHJpZ2h0OiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IHJldmVyc2VkID0gZmFsc2U7XG4gICAgY29uc3QgcnR5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBjb25zdCBsdHlwZSA9IGxlZnQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgdHlwZSA9IFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gU1R5cGVzW2xlZnQucmVzdWx0X3R5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1RZUEVfTk9UX0lNUExFTUVOVEVEKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3AgYXMgUGFyYW1ldGVyczx0eXBlb2YgcmV2ZXJzZWRfb3BlcmF0b3I+WzBdKTtcbiAgICAgICAgbWV0aG9kID0gU1R5cGVzW3JpZ2h0LnJlc3VsdF90eXBlXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG4gICAgXG4gICAgY29uc3QgdmFsdWUgPSBWQUxVRVNbbm9kZS5pZF07XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDAgKVxuICAgICAgICAgICAgdygnICYmICcpO1xuXG4gICAgICAgIGNvbnN0IG9wICAgID0gdmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBub2RlLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAgd3IoIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsICc9PT0nLCByaWdodCkgKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwgJyE9PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdyKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgb3AsIHJpZ2h0KSApO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19DT01QQVJFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3Qgb3BzID0gbm9kZS5vcHMubWFwKCAoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wID0gYm5hbWUycHluYW1lW2UuY29uc3RydWN0b3IuJG5hbWUgYXMga2V5b2YgdHlwZW9mIGJuYW1lMnB5bmFtZV07XG4gICAgICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UuY29uc3RydWN0b3IuJG5hbWV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVmdCAgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0cyA9IG5vZGUuY29tcGFyYXRvcnMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApO1xuXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoT1BFUkFUT1JTX0NPTVBBUkUsIFNUWVBFX0JPT0wsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAuLi5yaWdodHMsXG4gICAgICAgIF1cbiAgICApO1xuXG4gICAgVkFMVUVTW2FzdC5pZF0gPSBvcHM7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX0pTSU5ULCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbGVmdCAgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IHZhbHVlID0gVkFMVUVTW25vZGUuaWRdO1xuXG4gICAgaWYoIHZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHdyKCB1bmFyeV9qc29wKG5vZGUsICchJywgSW50Mk51bWJlcihsZWZ0LCBTVFlQRV9KU0lOVCkgKSApO1xuXG4gICAgY29uc3QgbWV0aG9kID0gU1R5cGVzW2xlZnQucmVzdWx0X3R5cGUhXVt2YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgd3IoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0JPT0wsIFNUWVBFX05PVF9JTVBMRU1FTlRFRCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19VTkFSWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLm9wZXJhbmQgLCBjb250ZXh0ICk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUycHluYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgaWYoIG9wID09PSAnbm90Jykge1xuICAgICAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShPUEVSQVRPUlNfVU5BUlksIFNUWVBFX0JPT0wsIFsgbGVmdCBdICk7XG4gICAgICAgIFxuICAgICAgICBWQUxVRVNbYXN0LmlkXSA9IFwibm90XCI7XG4gICAgICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgICAgICByZXR1cm4gYXN0O1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbGVmdC5yZXN1bHRfdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKE9QRVJBVE9SU19VTkFSWSwgdHlwZSwgWyBsZWZ0IF0gKTtcbiAgICBWQUxVRVNbYXN0LmlkXSA9IG9wO1xuXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIik7XG59IiwiaW1wb3J0IHsgc2V0X3B5X2NvZGUgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBQQVNTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFBBU1MpO1xuICAgICAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdyhcInJldHVybiBudWxsXCIpO1xuXG4gICAgcmV0dXJuIHd0YHJldHVybiAke25vZGUuY2hpbGRyZW5bMF19YDtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFJFVFVSTiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9OT05FVFlQRSwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBjb250ZXh0LnBhcmVudF9ub2RlX2NvbnRleHRcbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBTVFlQRV9OT05FVFlQRTtcbiAgICBsZXQgY2hpbGRyZW4gICAgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgICAgIHJlc3VsdF90eXBlID0gZXhwci5yZXN1bHRfdHlwZSE7XG4gICAgICAgIGNoaWxkcmVuICAgID0gW2V4cHJdO1xuICAgIH1cblxuICAgIGNvbnN0IG1ldGEgPSAoU1R5cGVzW2NvbnRleHQucGFyZW50X25vZGVfY29udGV4dCEucmVzdWx0X3R5cGVdIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcbiAgICBpZiggbWV0YS5yZXR1cm5fdHlwZSA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSA9ICgpID0+IHJlc3VsdF90eXBlO1xuICAgIFxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFJFVFVSTiwgcmVzdWx0X3R5cGUsIGNoaWxkcmVuKTtcbiAgICAgICAgXG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIHcoJ3snKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3dGAke25vZGUuY2hpbGRyZW5bMF19OiAke25vZGUuY2hpbGRyZW5bMV19YDtcblxuICAgIGZvcihsZXQgaSA9IDI7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSs9MilcbiAgICAgICAgd3RgLCAke25vZGUuY2hpbGRyZW5baV19OiAke25vZGUuY2hpbGRyZW5baSsxXX1gO1xuXG4gICAgdygnfScpO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgU1RSVUNUU19ESUNUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXkobm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGRyZW5bMippXSAgID0gY29udmVydF9ub2RlKG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW5bMippKzFdID0gY29udmVydF9ub2RlKG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3QgPSBuZXcgQVNUTm9kZShTVFJVQ1RTX0RJQ1QsIDAsIGNoaWxkcmVuICk7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBBU1ROb2RlKSB7XG5cbiAgICB3KFwiW1wiKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3KG5vZGUuY2hpbGRyZW5bMF0pO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCBub2RlLmNoaWxkcmVuW2ldKTtcblxuICAgIHcoXCJdKVwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFNUUlVDVFNfTElTVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgY29uc3QgYXN0ID0gbmV3IEFTVE5vZGUoU1RSVUNUU19MSVNULCAwLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApOyAgICBcbiAgICBzZXRfcHlfY29kZSg0KmFzdC5pZCwgbm9kZSk7XG5cbiAgICByZXR1cm4gYXN0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTGlzdFwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuXG4gICAgdyhcIk9iamVjdC5mcmVlemUoW1wiKTtcblxuICAgIGlmKCBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgKVxuICAgICAgICB3KG5vZGUuY2hpbGRyZW5bMF0pO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCBub2RlLmNoaWxkcmVuW2ldKTtcblxuICAgIHcoXCJdKVwiKTtcbn0iLCJpbXBvcnQgeyBzZXRfcHlfY29kZSB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFNUUlVDVFNfVFVQTEUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFNUUlVDVFNfVFVQTEUsIDAsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG4gICAgICAgIFxuICAgIHNldF9weV9jb2RlKDQqYXN0LmlkLCBub2RlKTtcblxuICAgIHJldHVybiBhc3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogQVNUTm9kZSkge1xuICAgIHcoIFZBTFVFU1tub2RlLmlkXSApO1xufSIsImltcG9ydCB7IHNldF9weV9jb2RlIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNZTUJPTCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IDA7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJzsgLy9UT0RPIHR5cGUgb2YgY3VycmVudCBjb250ZXh0ICEgLT4gc2VsZiBpbiBsb2NhbF9zeW1ib2xzID9cbiAgICBlbHNlIGlmKCB2YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW3ZhbHVlXTtcblxuICAgIC8qXG4gICAgICAgIC8vVE9ETyBnbG9iYWxTeW1ib2xzXG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG4gICAgKi9cblxuICAgIGNvbnN0IGFzdCA9IG5ldyBBU1ROb2RlKFNZTUJPTCwgcmVzdWx0X3R5cGUpO1xuICAgIFxuICAgIFZBTFVFU1thc3QuaWRdID0gdmFsdWU7XG4gICAgc2V0X3B5X2NvZGUoNCphc3QuaWQsIG5vZGUpO1xuXG4gICAgcmV0dXJuIGFzdDtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBjb25zdCBBUlJBWV9UWVBFICAgPSBGbG9hdDY0QXJyYXk7XG5jb25zdCBNQVhfTkJfVE9LRU4gPSAxMDU7XG5cbmV4cG9ydCBjb25zdCBDT0RFX0xJTkUgPSAwO1xuZXhwb3J0IGNvbnN0IENPREVfQ09MICA9IDE7XG5leHBvcnQgY29uc3QgQ09ERV9CRUcgID0gMDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORCAgPSAyO1xuZXhwb3J0IGNvbnN0IENPREVfQkVHX0xJTkUgPSBDT0RFX0JFRyArIENPREVfTElORTtcbmV4cG9ydCBjb25zdCBDT0RFX0JFR19DT0wgID0gQ09ERV9CRUcgKyBDT0RFX0NPTDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORF9MSU5FID0gQ09ERV9FTkQgKyBDT0RFX0xJTkU7XG5leHBvcnQgY29uc3QgQ09ERV9FTkRfQ09MICA9IENPREVfRU5EICsgQ09ERV9DT0w7XG5cbmV4cG9ydCBjb25zdCBQWV9DT0RFID0gbmV3IEFSUkFZX1RZUEUoNCpNQVhfTkJfVE9LRU4pO1xuZXhwb3J0IGNvbnN0IEpTX0NPREUgPSBuZXcgQVJSQVlfVFlQRSg0Kk1BWF9OQl9UT0tFTik7XG5cbi8vVE9ETzogaW5kaXJlY3Rpb24gb3UgcGFyIElELi4uXG5leHBvcnQgY29uc3QgVkFMVUVTID0gbmV3IEFycmF5PGFueT4oKTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb3BfcmVzZXQoKSB7XG4gICAgVkFMVUVTLmxlbmd0aCA9IDA7XG4gICAgQVNUTm9kZS5ORVhUX0FTVF9OT0RFX0lEID0gMDtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IHsgQVNUX0NPTlZFUlQgfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgZ2V0U1R5cGVJRCwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCBkb3BfcmVzZXQgZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgUkVUX0lOVCwgUkVUVVJOX1RZUEVfRkNUIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcblxuZXhwb3J0IHR5cGUgQVNUID0ge1xuICAgIGJvZHkgICAgOiBBU1ROb2RlLFxuICAgIGZpbGVuYW1lOiBzdHJpbmdcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgbnVtYmVyW10+ID0ge31cblxuZm9yKGxldCBpID0gMCA7IGkgPCBBU1RfQ09OVkVSVC5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQVNUX0NPTlZFUlRbaV07XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZSkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5icnl0aG9uX25hbWUpIClcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLmJyeXRob25fbmFtZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLmJyeXRob25fbmFtZSBhcyBzdHJpbmddXG4gICAgfVxuXG4gICAgZm9yKGxldCBuYW1lIG9mIG5hbWVzKVxuICAgICAgICAobW9kdWxlc1tuYW1lXSA/Pz0gW10pLnB1c2goaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblxuXHRyZXR1cm4ge1xuICAgICAgICBib2R5OiBjb252ZXJ0X2FzdChfYXN0KSxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGUge1xuXG4gICAgZG9wX3Jlc2V0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBjb252ZXJ0X25vZGUoYXN0LmJvZHksIG5ldyBDb250ZXh0KCkgKTtcblxuICAgIC8qZnVuY3Rpb24gY291bnQobm9kZTogQVNUTm9kZSkge1xuXG4gICAgICAgIGxldCBzdW0gPSAxOyAvLyBjb3VudCBteXNlbGZcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kgKVxuICAgICAgICAgICAgc3VtICs9IGNvdW50KG5vZGUuY2hpbGRyZW5baV0pO1xuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4oIGNvdW50KHJlc3VsdCkgKTsqL1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG5cbiAgICAvLyBsaWtlbHkgYSBib2R5LlxuICAgIGlmKCBBcnJheS5pc0FycmF5KGJyeXRob25fbm9kZSkgKVxuICAgICAgICByZXR1cm4gXCJCb2R5XCI7XG5cbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZihuYW1lID09PSBcIkV4cHJcIikge1xuICAgICAgICBicnl0aG9uX25vZGUgPSBicnl0aG9uX25vZGUudmFsdWU7XG4gICAgICAgIG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBtb2R1bGVzW25hbWVdO1xuXG4gICAgaWYoIGNhbmRpZGF0ZXMgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gQVNUX0NPTlZFUlRbY2FuZGlkYXRlc1tpXV0oYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vY29uc3QgSUQgPSBjYW5kaWRhdGVzW2ldO1xuICAgICAgICAgICAgLy9yZXN1bHQudHlwZV9pZCA9IElEO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG5vZGUgJHtuYW1lfSBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dCA9IFJvb3RDb250ZXh0KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7IC8vVE9ETzogcmVtb3ZlXG4gICAgICAgIHRoaXMubG9jYWxfc3ltYm9scyA9IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF9zeW1ib2xzfTtcbiAgICB9XG5cbiAgICB0eXBlOyAvL1RPRE86IHJlbW92ZVxuXG4gICAgcGFyZW50X25vZGVfY29udGV4dD86IEFTVE5vZGU7IFxuXG4gICAgbG9jYWxfc3ltYm9sczogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbn1cblxuY29uc3QgdHlwZV9mY3QgPSB7fSAvKiBmY3QgY2xhc3MgPT4gdHlwZSBjbGFzcyAqL1xuXG4vL1RPRE86IG1vdmUuLi5cbi8vVE9ETzogYmluYXJ5L3VuYXJ5XG4vL1RPRE86IHJlbW92ZSByZXR1cm5fdHlwZSAoZ2V0IGZyb20gdGhlIF9fe25hbWV9X18pXG5mdW5jdGlvbiBnZW5VbmFyeU9wRmN0KG5hbWU6IHN0cmluZywgcmV0dXJuX3R5cGU6IFJFVFVSTl9UWVBFX0ZDVCkge1xuICAgIGNvbnN0IG9wbmFtZSA9IGBfXyR7bmFtZX1fX2A7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX19jbGFzc19fOiB0eXBlX2ZjdCxcbiAgICAgICAgX19uYW1lX18gOiBuYW1lLFxuICAgICAgICBfX2NhbGxfXyA6IHtcbiAgICAgICAgICAgIC8vVE9ETzogSSBuZWVkIGEgc2VsZi4uLlxuICAgICAgICAgICAgcmV0dXJuX3R5cGUgICAgOiByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIC8vIG5vdCByZWFsbHkgOj9cbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKGNhbGw6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gY2FsbC5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSBTVHlwZXNbbGVmdC5yZXN1bHRfdHlwZV0hW29wbmFtZV0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShjYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy9UT0RPOiBub3QgYSB0eXBlICEhIVxuY29uc3QgbGVuID0gYWRkU1R5cGUoXCJsZW5cIiwgZ2VuVW5hcnlPcEZjdChcImxlblwiLCBSRVRfSU5UKSk7XG5cbi8vIGJ1aWx0aW4gc3ltYm9scy5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IFJvb3RDb250ZXh0OiBDb250ZXh0ID0ge1xuICAgIHR5cGU6IFwiP1wiIGFzIGNvbnN0LFxuICAgIGxvY2FsX3N5bWJvbHM6IHtcbiAgICAgICAgaW50ICA6IGdldFNUeXBlSUQoJ3R5cGVbaW50XScpLFxuICAgICAgICBzdHIgIDogZ2V0U1R5cGVJRCgndHlwZVtzdHJdJyksXG4gICAgICAgIGZsb2F0OiBnZXRTVHlwZUlEKCd0eXBlW2Zsb2F0XScpLFxuICAgICAgICBsZW4sXG5cbiAgICAgICAgLy8gYWRkIGZ1bmN0aW9ucyBsaWtlIGxlbigpIC8gcG93KCkgLyBkaXZtb2QoKVxuICAgIH1cbn0gc2F0aXNmaWVzIENvbnRleHQ7IiwiLy8gQHRzLW5vY2hlY2tcblxuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbnR5cGUgQ3Vyc29yID0ge1xuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGxpbmUgIDogbnVtYmVyLFxuICAgIGxpbmVfb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3Qgbm9kZXMgPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcblxuICAgIGxldCBjdXJzb3IgPSB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgbGluZV9vZmZzZXQgOiAwXG4gICAgfTtcblxuICAgIGxldCBjaGFyO1xuICAgIGRvIHtcbiAgICAgICAgbm9kZXMucHVzaCggcGFyc2VFeHByZXNzaW9uKGNvZGUsIGN1cnNvcikgYXMgYW55KTtcbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgICAgIHdoaWxlKCBjaGFyID09PSAnXFxuJyApIHtcbiAgICAgICAgICAgIGNoYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0gY3Vyc29yLm9mZnNldDtcblxuICAgIH0gd2hpbGUoIGNoYXIgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgLy9jb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHQvL2NvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2NvbnZlcnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTeW1ib2woY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJ2EnICYmIGNhciA8PSAneicgfHwgY2FyID49ICdBJyAmJiBjYXIgPD0gJ1onIHx8IGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyB8fCBjYXIgPT0gJ18nIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KTtcblxuICAgIC8vVE9ETzogaWYga2V5d29yZC4uLlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwic3ltYm9sXCIsXG4gICAgICAgIHZhbHVlICAgOiBzeW1ib2wsIC8vVE9ETzogY2YgY29udmVydCAoc2VhcmNoIGluIGxvY2FsIHZhcmlhYmxlcy9Db250ZXh0Li4uKVxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19jb252ZXJ0XG4gICAgfTtcbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19pbnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIC8vVE9ETzogcmVhbC4uLlxuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5pbnRcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfaW50LFxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19zdHIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJ1wiJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgICsrY3Vyc29yLm9mZnNldDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5zdHJpbmdcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfc3RyLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG5cbiAgICBsZXQgbGVmdCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICBpZiggY2hhciA9PT0gJ1xcbicpXG4gICAgICAgIHJldHVybiBsZWZ0O1xuXG4gICAgbGV0IG9wID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIG9wIS5jaGlsZHJlblswXSA9IGxlZnQ7XG4gICAgb3AucHljb2RlLnN0YXJ0ID0gbGVmdC5weWNvZGUuc3RhcnQ7XG5cbiAgICBsZXQgdmFsdWVzID0gW29wLCBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcildO1xuXG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgIT09ICdcXG4nICkge1xuXG4gICAgICAgIGxldCBvcDIgICA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGxldCBvcDEgID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl07XG4gICAgICAgIGxldCBsZWZ0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG5cbiAgICAgICAgLy9UT0RPOiBoYW5kbGUgb3AgcHJpb3JpdHkuLi5cbiAgICAgICAgLy8gKGErYikrY1xuXG4gICAgICAgIC8vIChhK2IpXG4gICAgICAgIG9wMSEuY2hpbGRyZW5bMV0gPSBsZWZ0O1xuICAgICAgICBvcDEhLnB5Y29kZS5lbmQgID0gbGVmdC5weWNvZGUuZW5kOyBcblxuICAgICAgICAvLyAoKStjXG4gICAgICAgIG9wMiEuY2hpbGRyZW5bMF0gPSBvcDE7XG4gICAgICAgIG9wMi5weWNvZGUuc3RhcnQgPSBvcDEucHljb2RlLnN0YXJ0O1xuXG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdID0gb3AyO1xuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXSA9IHJpZ2h0O1xuXG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIH1cblxuICAgIHZhbHVlc1swXSEuY2hpbGRyZW5bMV0gPSB2YWx1ZXNbMV07XG4gICAgdmFsdWVzWzBdIS5weWNvZGUuZW5kICA9IHZhbHVlc1sxXS5weWNvZGUuZW5kO1xuXG4gICAgcmV0dXJuIHZhbHVlc1swXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRvcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXQrK107XG4gICAgLypcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTsqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwib3BlcmF0b3JzLlwiICsgY2hhcixcbiAgICAgICAgdmFsdWUgICA6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBDT1JFX01PRFVMRVNbXCJvcGVyYXRvcnMuXCIgKyBjaGFyXS5BU1QySlMsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VuKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgKVxuICAgICAgICBjaGFyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIC8vIGlnbm9yZSBjaGFyXG4gICAgaWYoIGNoYXIgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gbnVsbFxuICAgIGlmKCBjaGFyID09PSAnXCInKVxuICAgICAgICBub2RlID0gcGFyc2VTdHJpbmcoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICdhJyAmJiBjaGFyIDw9ICd6JyB8fCBjaGFyID49ICdBJyAmJiBjaGFyIDw9ICdaJyB8fCBjaGFyID09ICdfJyApXG4gICAgICAgIG5vZGUgPSBwYXJzZVN5bWJvbChjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBub2RlID0gcGFyc2VOdW1iZXIoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUgPSBwYXJzZU9wZXJhdG9yKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIC8vOyB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoZW4gcGFyc2luZyAke2NoYXJ9IGF0ICR7Y3Vyc29yLmxpbmV9OiR7Y3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldH0gKCR7Y3Vyc29yLm9mZnNldH0pYCk7XG5cbiAgICBub2RlLnB5Y29kZSA9IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UT0RPOiBpcyBuZXh0IGFuIG9wZXJhdG9yID8gLT4gY29uc3RydWlyZSBhcmJyZS4uLlxuICAgIC8vVE9ETyBoYW5kbGUgb3BlcmF0b3JzID9cblxuICAgIHJldHVybiBub2RlO1xuXG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IHtfYl8sIF9yX307XG5cbi8vIGNsYXNzZSA/XG5cblxuZXhwb3J0IGNsYXNzIFNCcnl0aG9uIHtcblxuICAgICNyZWdpc3RlcmVkX0FTVDogUmVjb3JkPHN0cmluZywgQVNUPiA9IHt9O1xuICAgICNleHBvcnRlZDogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pj4gPSB7XG4gICAgICAgIGJyb3dzZXI6IGdsb2JhbFRoaXNcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBydW5BU1QoKSA/XG4gICAgLy9UT0RPOiBydW5QeXRob25Db2RlKCkgP1xuXG4gICAgLy9UT0RPOiBzb21laG93LCByZW1vdmUgQVNUIGFyZyA/Pz9cbiAgICBidWlsZE1vZHVsZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgaWYoYXN0LmZpbGVuYW1lIGluIHRoaXMuI3JlZ2lzdGVyZWRfQVNUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBU1QgJHthc3QuZmlsZW5hbWV9IGFscmVhZHkgcmVnaXN0ZXJlZCFgKTtcblxuICAgICAgICAvL1RPRE86IGZpbGVuYW1lIDIgbW9kdWxlbmFtZS5cbiAgICAgICAgdGhpcy4jcmVnaXN0ZXJlZF9BU1RbYXN0LmZpbGVuYW1lXSA9IGFzdDtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGpzY29kZSk7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgfVxuXG4gICAgcnVuSlNDb2RlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICB0aGlzLiNleHBvcnRlZFthc3QuZmlsZW5hbWVdID0gdGhpcy5idWlsZE1vZHVsZShqc2NvZGUsIGFzdCkodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0c3RhdGljIE5FWFRfQVNUX05PREVfSUQgPSAwO1xuXG5cdGlkICAgICAgICAgOiBudW1iZXI7XG5cdHR5cGVfaWQgICAgOiBudW1iZXI7IC8vIG5vZGVfdHlwZV9pZCAoISEhKVxuXHRyZXN1bHRfdHlwZTogbnVtYmVyID0gMDsgLy9UT0RPOiBudW1iZXIgdGhlbiB0eXBlIHN5c3RlbS4uLlxuXHRwYXJlbnRfb3BfcHJpb3JpdHk6IG51bWJlciA9IDA7XG5cblx0Ly8gc29vbiBeXlxuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107IC8vIHVzZSBpZC4uLi5cblxuXHRjb25zdHJ1Y3Rvcih0eXBlX2lkOiBudW1iZXIsIHJlc3VsdF90eXBlOiBudW1iZXIgPSAwLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMuaWQgPSBBU1ROb2RlLk5FWFRfQVNUX05PREVfSUQrKztcblx0XHR0aGlzLnR5cGVfaWQgPSB0eXBlX2lkO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHRcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwiLi9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlR9IGZyb20gXCIuL1NUeXBlc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfSU5UIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udmVydGVyLCBOT0NPTlZFUlQgfSBmcm9tIFwiLi9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRVUk5fVFlQRV9GQ1QgfSBmcm9tIFwiLi9SZXR1cm5UeXBlRmN0c1wiO1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuLy8gYWRkcyByIGV4Y2VwdCBlcS9uZS8obC9nKSh0L2UpXG5leHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19ycG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19ybXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19ydHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19fcmZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19ybW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19fcmFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19yc3ViX18nLFxuXG4gICAgJ19fZXFfXycgICAgIDogJ19fZXFfXycsXG4gICAgJ19fbmVfXycgICAgIDogJ19fbmVfXycsXG5cbiAgICAnX19sdF9fJyAgICAgOiAnX19ndF9fJyxcbiAgICAnX19ndF9fJyAgICAgOiAnX19sdF9fJyxcbiAgICAnX19sZV9fJyAgICAgOiAnX19nZV9fJyxcbiAgICAnX19nZV9fJyAgICAgOiAnX19sZV9fJyxcblxuICAgICdfX25vdF9fJyAgICA6ICdfX3Jub3RfXycsXG4gICAgJ19fb3JfXycgICAgIDogJ19fcm9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX3JhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19fcnhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19ybHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX3Jyc2hpZnRfXycsXG59XG5cbi8vIGFkZHMgaVxuZXhwb3J0IGNvbnN0IEFzc2lnbk9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19faXBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19faW11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19faXRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX2lmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19faW1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX2lhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19faXN1Yl9fJyxcblxuICAgICdfX29yX18nICAgICA6ICdfX2lvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19pYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX2l4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19faWxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19pcnNoaWZ0X18nLFxufVxuXG5cbmV4cG9ydCBjb25zdCBqc29wMnB5b3AgPSB7XG4gICAgJyoqJzogJ3BvdycsXG4gICAgJyonIDogJ211bCcsXG4gICAgJy8nIDogJ3RydWVkaXYnLFxuICAgICcvLyc6ICdmbG9vcmRpdicsXG4gICAgJyUnIDogJ21vZCcsXG4gICAgXG4gICAgJysnICA6ICdhZGQnLFxuICAgICctJyAgOiAnc3ViJyxcbiAgICAndS4tJzogJ25lZycsXG5cbiAgICAnPT0nIDogJ2VxJyxcbiAgICAnIT0nIDogJ25lJyxcbiAgICAnPCcgIDogJ2x0JyxcbiAgICAnPD0nIDogJ2xlJyxcbiAgICAnPj0nIDogJ2dlJyxcbiAgICAnPicgIDogJ2d0JyxcblxuICAgICd+JyA6ICdub3QnLFxuICAgICd8JyA6ICdvcicsXG4gICAgJyYnIDogJ2FuZCcsXG4gICAgJ14nIDogJ3hvcicsXG4gICAgJzw8JzogJ2xzaGlmdCcsXG4gICAgJz4+JzogJ3JzaGlmdCdcbn07XG5cbi8vIFRPRE86IHVuYXJ5IG9wIHRvby4uLlxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9PcGVyYXRvcnMvT3BlcmF0b3JfcHJlY2VkZW5jZSN0YWJsZVxuLy8gYmlnZ2VyID0gbW9yZSBwcmlvcml0eSAoMCBieSBkZWZhdWx0KS5cbmV4cG9ydCBjb25zdCBKU09wZXJhdG9ycyA9IFtcbiAgICBbXSxcbiAgICBbJz0nXSwgLyogZXQgdG91cyBsZXMgZMOpcml2w6lzICovIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnfHwnLCAnPz8nXSxcbiAgICBbJyYmJ10sIC8vVE9ET1xuICAgIFsnfCddLCAgLy9UT0RPXG4gICAgWydeJ10sICAvL1RPRE9cbiAgICBbJyYnXSwgIC8vVE9ET1xuICAgIFsnPT0nLCAnIT0nLCAnPT09JywgJyE9PSddLFxuICAgIFsnPCcsICc8PScsICc+PScsICc+J10sXG4gICAgWyc8PCcsICc+PicsICc+Pj4nXSwgLy9UT0RPXG4gICAgWycrJywgJy0nXSxcbiAgICBbJyonLCAnLycsICclJ10sIC8vIFB5dGhvbiBhbHNvIGhhcyAvL1xuICAgIFsnKionXSwgICAgICAgICAgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWychJywgJysrJywgJy0tJywgJ34nLCAndS4tJ10sXG5dO1xuXG4vKlxuaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI2NhbGxhYmxlXG5cbi0+IGNsYXNzZXNcbmJvb2woKVxuZmxvYXQoKVxuaW50KClcbnN0cigpXG5ieXRlYXJyYXkoKSBbVWludDhBcnJheV0gKFJXKVxuYnl0ZXMoKSAgICAgWz9dICAgICAgICAgIChSTykgPC0gbm8gdHlwZXMgaW4gSlMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtIFVpbnQ4QXJyYXkgd2l0aCBmbGFnID8gZnJlZXplKCkgW0pTIHVuc2FmZV1cbiAgICAgICAgICAgIGJcImVcXHhGRlwiIGluc3RlYWQgb2YgWzEwMSwxMDFdLCBldGMuICgzMiA8PSBieXQgPD0gMTI2KVxudHlwZSgpXG5saXN0KCkgICAgICBbQXJyYXldXG50dXBsZSgpICAgICBbT2JqZWN0LmZyb3plbihBcnJheSldXG5cbnNldCgpICAgICAgIC8vIHJlbGllcyBvbiBoYXNoKCkuLi4gPT4gc2V0W2xpdGVyYWxzXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHNldCgpIC8gPC0gSlMgc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICA9PiBieXRlcy9ieXRlYXJyYXkvZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgU2V0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gSW50ZXJuYWwga2V5cygpIHNldCBbcmVjb21wdXRlIGhhc2ggd2hlbiBhZGQvcmVtb3ZlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGludGVybmFsbHkgc3RvcmVkIGFzIE1hcChoYXNoLCB2YWx1ZSkgKD8pXG5mcm96ZW5zZXQoKSAgICAgICAgICAgID0+IGV4dGVuZHMgc2V0IHRvIHJlcGxhY2UgbW9kaWZpZXJzLlxuXG5kaWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc3RyXSBhcyBPYmplY3QuY3JlYXRlKG51bGwpICsgKGFuZCBwdXJlIEpTT2JqIGFzIGRpY3Rbc3RyXSApXG4gICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IE1hcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gU2V0KGhhc2gpIC8gTWFwKGhhc2gsIGtleSkgLyBNYXAoa2V5LCBoYXNoKSA/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0L3NldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBNYXAoa2V5LCB2YWx1ZSlcblxub2JqZWN0KClcbmNvbXBsZXgoKVxubWVtb3J5dmlldygpICAgICAgICAgICAgPT4gQXJyYXlCdWZmZXIgP1xuXG4tPiBwcmludFxuYXNjaWkoKVxuYmluKClcbmhleCgpXG5vY3QoKVxucmVwcigpXG5oYXNoKClcblxuLT4gbWF0aHNcbmFicygpXG5kaXZtb2QoKVxucG93KClcbnJvdW5kKClcblxuLT4gbGlzdHNcbmFsbCgpXG5hbnkoKVxuZmlsdGVyKClcbm1hcCgpXG5tYXgoKVxubWluKClcbnN1bSgpXG5sZW4oKVxuZW51bWVyYXRlKClcbnJldmVyc2VkKClcbnNsaWNlKClcbnNvcnRlZCgpXG56aXAoKVxuXG4tPiBpdGVyXG5yYW5nZSgpXG5haXRlcigpXG5pdGVyKClcbmFuZXh0KClcbm5leHQoKVxuXG4tPiBzdHJcbm9yZCgpXG5jaHIoKVxuZm9ybWF0KClcbnByaW50KClcbmZcIlwiXG5cbmNhbGxhYmxlKClcbmNsYXNzbWV0aG9kKClcbnN0YXRpY21ldGhvZCgpXG5wcm9wZXJ0eSgpXG5zdXBlcigpXG5pc2luc3RhbmNlKClcbmlzc3ViY2xhc3MoKVxuZGVsYXR0cigpXG5nZXRhdHRyKClcbmhhc2F0dHIoKVxuc2V0YXR0cigpXG5kaXIoKVxuXG5ldmFsKClcbmV4ZWMoKVxuY29tcGlsZSgpXG5icmVha3BvaW50KClcblxuZ2xvYmFscygpXG5sb2NhbHMoKVxudmFycygpXG5fX2ltcG9ydF9fKClcblxuaWQoKVxuICAgIC0+IG9uLWRlbWFuZCB3ZWFrcmVmID9cblxuaGVscCgpXG5pbnB1dCgpXG5vcGVuKClcblxuKi9cblxuLypcbnVuYXJ5XG4tIHBvcyAodW5hcnkgKylcblxuLSBib29sXG4tIGZsb2F0XG4tIGludFxuLSBzdHJcbi0gcmVwclxuXG4tIGFic1xuLSBjZWlsXG4tIGZsb29yXG4tIHJvdW5kXG4tIHRydW5jXG5cbmJpbmFyeVxuLSBwb3cvcnBvd1xuLSBkaXZtb2QvcmRpdm1vZFxuXG5jbGFzc1xuLSBjbGFzc1xuLSBuZXdcbi0gaW5pdFxuLSBpbml0X3N1YmNsYXNzXG5cbi0gc3ViY2xhc3Nob29rIC8vIF9faXNpbnN0YW5jZWNoZWNrX18gXG5cbi0gZGlyXG4tIGRlbGF0dHJcbi0gc2V0YXR0clxuLSBnZXRhdHRyaWJ1dGVcblxuLSBkb2Ncbi0gZm9ybWF0XG4tIGdldG5ld2FyZ3Ncbi0gaGFzaFxuLSBpbmRleCAoPylcbi0gc2l6ZW9mXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gSW50Mk51bWJlcihhOiBBU1ROb2RlLCB0YXJnZXQgPSBTVFlQRV9GTE9BVCkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGVfaWQgPT09IExJVEVSQUxTX0lOVCkge1xuICAgICAgICAvLyBpZiBiaWdpbnQgY2FuJ3Qgc2FmZWx5IGNvbnZlcnQgdG8gSlNJTlQuXG4gICAgICAgIGlmKCB0YXJnZXQgPT09IFNUWVBFX0ZMT0FUIClcbiAgICAgICAgICAgIGEucmVzdWx0X3R5cGUgPSBTVFlQRV9KU0lOVDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgY29uc3QgYV92YWx1ZSA9IFZBTFVFU1thLmlkXTtcblxuICAgIGlmKCBhX3ZhbHVlID09PSAnX19tdWxfXycgfHwgYV92YWx1ZSA9PT0gJ19fcm11bF9fJyApIHtcbiAgICAgICAgY29uc3QgbHR5cGUgPSBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuICAgICAgICBjb25zdCBydHlwZSA9IGEuY2hpbGRyZW5bMV0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGlmKCAgICAobHR5cGUgPT09IFNUWVBFX0lOVCB8fCBsdHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09IFNUWVBFX0lOVCB8fCBydHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgYS5yZXN1bHRfdHlwZSA9IHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCBhX3ZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UKSB7XG4gICAgICAgIGEucmVzdWx0X3R5cGUgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgIHJldHVybiByYE51bWJlcigke2F9KWA7XG5cbiAgICAvLyBpbnQgLT4ganNpbnQgY2FzdCBpcyBmYWN1bHRhdGl2ZS4uLlxuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTnVtYmVyMkludChhOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1RZUEVfSU5UKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGVfaWQgPT09IExJVEVSQUxTX0lOVCkge1xuICAgICAgICBhLnJlc3VsdF90eXBlID0gU1RZUEVfSU5UOyAvLyBmb3JjZSBiaWdpbnQgY29udmVydGlvblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIFZBTFVFU1thLmlkXSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UKSB7XG4gICAgICAgIGEucmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gaTtcbiAgICBmb3IobGV0IG9wIG9mIEpTT3BlcmF0b3JzW2ldKVxuICAgICAgICBKU09wZXJhdG9yc1ByaW9yaXR5W29wXSA9IHByaW9yaXR5O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlZF9vcGVyYXRvcjxUIGV4dGVuZHMga2V5b2YgdHlwZW9mIEJpbmFyeU9wZXJhdG9ycz4ob3A6IFQpIHtcbiAgICByZXR1cm4gQmluYXJ5T3BlcmF0b3JzW29wXTtcbn1cblxuY29uc3QgTEVGVCAgPSAxO1xuY29uc3QgUklHSFQgPSAyO1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCAuLi52YWx1ZXM6IEFTVE5vZGVbXSkge1xuXG4gICAgY29uc3QgZmlyc3QgICAgPSB2YWx1ZXNbMF07XG5cbiAgICBjb25zdCBwcmlvICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICBjb25zdCBwX3ByaW8gPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcblxuICAgIGlmKGZpcnN0IGluc3RhbmNlb2YgQVNUTm9kZSlcbiAgICAgICAgZmlyc3QucGFyZW50X29wX3ByaW9yaXR5ID0gcHJpbztcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHZhbHVlc1tpXS5wYXJlbnRfb3BfcHJpb3JpdHkgPSBwcmlvICsgMTtcblxuICAgIGxldCByZXN1bHQgPSByYCR7Zmlyc3R9YDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKVxuICAgICAgICByZXN1bHQgPSByYCR7cmVzdWx0fSAmJiAke3ZhbHVlc1tpXX1gOyAvL1RPRE86IGJldHRlci4uLlxuXG4gICAgaWYoIHBfcHJpbyA8IHByaW8gKVxuICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIG51bGwgb3BlcmF0aW9uLCB0aGUgbm9kZSBoYXMgdGhlIHNhbWUgcHJpb3JpdHkgYXMgaGlzIGZhdGhlci5cbi8vIDIqaW50KDErMSkgPT4gMiooMSsxKVxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuXG4gICAgYS5wYXJlbnRfb3BfcHJpb3JpdHkgPSBub2RlLnBhcmVudF9vcF9wcmlvcml0eTtcblxuICAgIHJldHVybiByYCR7YX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZXxhbnksIG9wOiBzdHJpbmcsIGI6IEFTVE5vZGV8YW55KSB7XG5cbiAgICBjb25zdCAgIHByaW8gPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICBjb25zdCBwX3ByaW8gPSBub2RlLnBhcmVudF9vcF9wcmlvcml0eTtcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKVxuICAgICAgICBhLnBhcmVudF9vcF9wcmlvcml0eSA9IHByaW87XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSlcbiAgICAgICAgYi5wYXJlbnRfb3BfcHJpb3JpdHkgPSBwcmlvICsgMTtcblxuICAgIGxldCBjbXAgPSByYCR7YX0ke29wfSR7Yn1gO1xuICAgIC8vIGlmIGZhdGhlciBoYXMgbW9yZSBwcmlvLCBhZGQgcGFyZW50aGVzaXMuXG4gICAgaWYoIHBfcHJpbyA+IHByaW8gKVxuICAgICAgICBjbXAgPSByYCgke2NtcH0pYDtcblxuICAgIHJldHVybiBjbXA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnkpIHtcblxuICAgIGxldCByb3AgPSBvcDtcbiAgICBpZiggcm9wID09PSAnLScpXG4gICAgICAgIHJvcCA9ICd1Li0nO1xuXG4gICAgLy8gdW5hcnkgSlMgT3AgcHJpbyBsaXN0ICg/KVxuICAgIGNvbnN0IHByaW8gICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbcm9wXTtcbiAgICBjb25zdCBwX3ByaW8gPSBub2RlLnBhcmVudF9vcF9wcmlvcml0eTtcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKVxuICAgICAgICBhLnBhcmVudF9vcF9wcmlvcml0eSA9IHByaW87XG5cbiAgICBsZXQgY21wID0gcmAke29wfSR7YX1gO1xuICAgIC8vIGlmIGZhdGhlciBoYXMgbW9yZSBwcmlvLCBhZGQgcGFyZW50aGVzaXMuXG4gICAgaWYoIHBfcHJpbyA+IHByaW8gKVxuICAgICAgICBjbXAgPSByYCgke2NtcH0pYDtcblxuICAgIHJldHVybiBjbXA7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgID86IENvbnZlcnRlcixcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMob3BzICAgICAgICA6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlblVuYXJ5T3BzX09wdHMgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICd1Li0nKVxuICAgICAgICAgICAgb3AgPSAnLSc7XG5cbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsID8/PSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbnR5cGUgR2VuQmluYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9vdGhlciAgID86IENvbnZlcnRlcixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogQ29udmVydGVyLFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKG9wczogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3R5cGU6IFJFVFVSTl9UWVBFX0ZDVCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IE5PQ09OVkVSVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30pIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252ZXJ0X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZlcnRfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZlcnRfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IE5PQ09OVkVSVCAmJiBzdWJzdGl0dXRlX2NhbGwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlc3VsdFtgX19pJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyX3ZhbHVlID0gVkFMVUVTW290aGVyLmlkXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICcrJyAmJiBvdGhlcl92YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICcrKycsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICctJyAmJiBvdGhlcl92YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctLScsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIHNlbGYsIG9wKyc9JywgY29udmVydF9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IENNUE9QU19MSVNUID0gWyc9PScsICchPScsICc+JywgJzwnLCAnPj0nLCAnPD0nXSBhcyBjb25zdDtcblxuY29uc3QgcmV2ZXJzZSA9IHtcbiAgICBcIj09XCI6IFwiPT1cIixcbiAgICBcIiE9XCI6IFwiIT1cIixcbiAgICBcIj5cIjogXCI8XCIsXG4gICAgXCI8XCI6IFwiPlwiLFxuICAgIFwiPj1cIjogXCI8PVwiLFxuICAgIFwiPD1cIjogXCI+PVwiLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkNtcE9wcyggIG9wcyAgICAgICAgOiByZWFkb25seSAoa2V5b2YgdHlwZW9mIHJldmVyc2UpW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3R5cGU6IFJFVFVSTl9UWVBFX0ZDVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IE5PQ09OVkVSVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gTk9DT05WRVJULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30gKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb3AgPSBvcDtcblxuICAgICAgICAgICAgbGV0IGEgPSBjb252ZXJ0X3NlbGYoc2VsZik7XG4gICAgICAgICAgICBsZXQgYiA9IGNvbnZlcnRfb3RoZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIHJldmVyc2VkICkge1xuICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYucmVzdWx0X3R5cGUgPT09IG90aGVyLnJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb3AgPSBjb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCBjb3AsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udmVydF9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIE51bWJlcjJJbnQgfSBmcm9tIFwiLi9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0ZMT0FULCBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5cbnR5cGUgUHJpbnRhYmxlID0geyB0b1N0cmluZygpOiBzdHJpbmcgfTtcblxuZXhwb3J0IHR5cGUgQ29udmVydGVyID0gKG5vZGU6IEFTVE5vZGUpID0+IEFTVE5vZGUgfCBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLihBU1ROb2RlIHwgUHJpbnRhYmxlKVtdXTtcblxuZXhwb3J0IGNvbnN0IE5PQ09OVkVSVCA9IChub2RlOiBBU1ROb2RlKSA9PiBub2RlO1xuXG5leHBvcnQgY29uc3QgQ09OVkVSVF9JTlQyRkxPQVQgPSAobm9kZTogQVNUTm9kZSkgPT4ge1xuXG4gICAgaWYoIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG5vZGUsIFNUWVBFX0ZMT0FUKTtcblxuICAgIHJldHVybiBub2RlOyAvLyBhbHJlYWR5IGEgbnVtYmVyLi4uXG59XG5cbmV4cG9ydCBjb25zdCBDT05WRVJUXzJJTlQgPSAobm9kZTogQVNUTm9kZSkgPT4ge1xuICAgIC8vaWYoIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgLy8gICAgcmV0dXJuIG5vZGU7XG5cbiAgICByZXR1cm4gTnVtYmVyMkludChub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBudW1iZXJbXSkge1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb252ZXJ0Lmxlbmd0aDsgaSs9MilcbiAgICAgICAgdGFibGVbY29udmVydFtpXV0gPSBjb252ZXJ0W2krMV07XG5cbiAgICByZXR1cm4gKG5vZGU6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3JjICAgID0gbm9kZS5yZXN1bHRfdHlwZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGFibGVbc3JjXTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICAgIC8vVE9ETzogaW1wcm92ZTpcbiAgICAgICAgaWYoIHNyYyA9PT0gU1RZUEVfSU5UKVxuICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIobm9kZSwgdGFyZ2V0KTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufSIsImltcG9ydCB7IFNUWVBFX05PVF9JTVBMRU1FTlRFRCwgU1RZUEVfQk9PTCwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfU1RSLCBTVFlQRV9KU0lOVCB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG5leHBvcnQgdHlwZSBSRVRVUk5fVFlQRV9GQ1QgPSAobzogbnVtYmVyKSA9PiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUpCRjJCT09MKG86IG51bWJlcikge1xuICAgIGlmKCBTVFlQRV9JTlQgPD0gbyAmJiBvIDw9IFNUWVBFX0ZMT0FUKVxuICAgICAgICByZXR1cm4gU1RZUEVfQk9PTDtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUkVUX0lKQkYyRkxPQVQobzogbnVtYmVyKSB7XG4gICAgaWYoIFNUWVBFX0lOVCA8PSBvICYmIG8gPD0gU1RZUEVfRkxPQVQpXG4gICAgICAgIHJldHVybiBTVFlQRV9GTE9BVDtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUkVUX0pTSU5UMkpTSU5UKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0pTSU5UO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUoySU5UKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9JTlQgfHwgbyA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgIHJldHVybiBTVFlQRV9JTlQ7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSU5UMklOVChvOiBudW1iZXIpIHtcbiAgICBpZiggbyA9PT0gU1RZUEVfSU5UKVxuICAgICAgICByZXR1cm4gU1RZUEVfSU5UO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfU1RSMkJPT0wobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX1NUUiApXG4gICAgICAgIHJldHVybiBTVFlQRV9CT09MO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5leHBvcnQgZnVuY3Rpb24gUkVUX1NUUjJTVFIobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX1NUUiApXG4gICAgICAgIHJldHVybiBTVFlQRV9TVFI7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUoyU1RSKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9JTlQgfHwgbyA9PT0gU1RZUEVfSlNJTlQgKVxuICAgICAgICByZXR1cm4gU1RZUEVfU1RSO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfRkxPQVQoXzogbnVtYmVyKSB7IHJldHVybiBTVFlQRV9GTE9BVDsgfVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JTlQgIChfOiBudW1iZXIpIHsgcmV0dXJuIFNUWVBFX0lOVDsgICB9XG5leHBvcnQgZnVuY3Rpb24gUkVUX0pTSU5UKF86IG51bWJlcikgeyByZXR1cm4gU1RZUEVfSlNJTlQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfU1RSICAoXzogbnVtYmVyKSB7IHJldHVybiBTVFlQRV9TVFI7ICAgfVxuXG4vL1RPRE8uLi5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZV9yZXR1cm5fdHlwZSgpIHtcblxufSIsIlxuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50JztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlJzsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCBjb25zdCBTVHlwZXMgID0gbmV3IEFycmF5PFNUeXBlT2JqPigpO1xuY29uc3QgU1R5cGVuYW1lMmlkOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTVHlwZUZyb21OYW1lPFQgZXh0ZW5kcyBTVHlwZU9iaj4obmFtZTogc3RyaW5nKTogVCB7XG4gICAgcmV0dXJuIFNUeXBlc1tnZXRTVHlwZUlEKG5hbWUpXSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1R5cGVJRChuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuXG4gICAgbGV0IGlkID0gU1R5cGVuYW1lMmlkW25hbWVdO1xuICAgIGlmKCBpZCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBpZCA9IFNUeXBlbmFtZTJpZFtuYW1lXSA9IFNUeXBlcy5sZW5ndGg7XG4gICAgICAgIFNUeXBlc1tpZF0gPSB7X19uYW1lX186IG5hbWV9O1xuICAgIH1cblxuICAgIHJldHVybiBpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNUeXBlKG5hbWU6IHN0cmluZywgdHlwZTogT21pdDxTVHlwZU9iaiwgJ19fbmFtZV9fJz4pIHtcblxuICAgIGNvbnN0IGlkID0gZ2V0U1R5cGVJRChuYW1lKTtcbiAgICBPYmplY3QuYXNzaWduKCBTVHlwZXNbaWRdLCB0eXBlICk7XG4gICAgcmV0dXJuIGlkO1xufVxuXG5leHBvcnQgY29uc3QgU1RZUEVfTk9ORVRZUEUgICAgICAgICAgID0gZ2V0U1R5cGVJRChcIk5vbmVUeXBlXCIpOyAvLyAwLi4uXG5leHBvcnQgY29uc3QgU1RZUEVfSU5UICAgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcImludFwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9KU0lOVCAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwianNpbnRcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfQk9PTCAgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcImJvb2xcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfRkxPQVQgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcImZsb2F0XCIpO1xuZXhwb3J0IGNvbnN0IFNUWVBFX1NUUiAgICAgICAgICAgICAgICA9IGdldFNUeXBlSUQoXCJzdHJcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfTk9UX0lNUExFTUVOVEVEICAgID0gZ2V0U1R5cGVJRChcIk5vdEltcGxlbWVudGVkVHlwZVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbi8vIGRlY2xhcmUgYWxsIGJ1aWx0aW4gdHlwZXMuLi5cbmltcG9ydCAnLi9zdHJ1Y3RzL1NUeXBlQnVpbHRpbic7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUMkpTIiwiQVJSQVlfVFlQRSIsIkNPREVfQkVHIiwiQ09ERV9CRUdfQ09MIiwiQ09ERV9CRUdfTElORSIsIkNPREVfQ09MIiwiQ09ERV9FTkQiLCJDT0RFX0VORF9DT0wiLCJDT0RFX0VORF9MSU5FIiwiQ09ERV9MSU5FIiwiSlNfQ09ERSIsIlBZX0NPREUiLCJBU1ROb2RlIiwiQ1VSU09SIiwianNjb2RlIiwic2V0X2pzX2N1cnNvciIsImlkeCIsImxlbmd0aCIsInNldF9weV9jb2RlX2Zyb21fbGlzdCIsIm9mZnNldCIsImJyeXRob25fbm9kZSIsImJlZyIsImVuZCIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJzZXRfcHlfZnJvbV9iZWciLCJzcmNfb2Zmc2V0IiwiZHN0X29mZnNldCIsInNldF9weV9mcm9tX2VuZCIsInNldF9weV9jb2RlIiwibmV3X2pzY29kZSIsImZpbGVuYW1lIiwiaW5kZW50IiwiY3VyX2luZGVudF9sZXZlbCIsImluZGVudHMiLCJOTCIsInRvU3RyaW5nIiwiQkIiLCJCRSIsInIiLCJhcmdzIiwid3IiLCJ3Iiwid3QiLCJzdHIiLCJpIiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiaWQiLCJ0eXBlX2lkIiwiYXN0MmpzIiwiYXN0IiwiYm9keSIsIm5vZGUiLCJjaGlsZHJlbiIsIkJPRFkiLCJjb252ZXJ0X25vZGUiLCJjb252ZXJ0IiwiY29udGV4dCIsImxpbmVzIiwidHlwZSIsIm1ldGEiLCJyZXN1bHRfdHlwZSIsIl9fY2FsbF9fIiwiZ2VuZXJhdGUiLCJyZXR1cm5fdHlwZSIsImJyeXRob25fbmFtZSIsIlZBTFVFUyIsImJhc2UiLCJDTEFTU19DTEFTU0RFRiIsIkNvbnRleHQiLCJnZXRTVHlwZUlEIiwibG9jYWxfc3ltYm9scyIsIm5hbWUiLCJiYXNlcyIsIkVycm9yIiwibGlzdCIsIkNPTlRST0xGTE9XU19GT1IiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJ0YXJnZXQiLCJOdW1iZXIySW50IiwiaW5jciIsIkNPTlRST0xGTE9XU19GT1JfUkFOR0UiLCJTVFlQRV9JTlQiLCJ2YWx1ZSIsIm1hcCIsIm4iLCJDT05UUk9MRkxPV1NfSUZCTE9DSyIsInRlc3QiLCJjdXIiLCJvcmVsc2UiLCJwdXNoIiwiY29uZCIsImlmX3RydWUiLCJpZl9mYWxzZSIsIkNPTlRST0xGTE9XU19URVJOQVJZIiwiYm9keV90cnVlIiwiYm9keV9mYWxzZSIsIkNPTlRST0xGTE9XU19UUllCTE9DSyIsImhhbmRsZXJzIiwiQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIIiwiU1lNQk9MIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJlIiwiaW5jbHVkZXMiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwibm9kZXMiLCJsaW5lIiwiY29sIiwic3RhY2tsaW5lMmFzdG5vZGUiLCJzdGFja2xpbmUiLCJzYiIsImdldEFTVEZvciIsInN0YWNrMmFzdG5vZGVzIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwiam9pbiIsImxvZyIsImdldF9weV9leGNlcHRpb24iLCJfX1NCUllUSE9OX18iLCJfZXJyXyIsIl9iXyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIl9yXyIsIkpTRXhjZXB0aW9uIiwiQ09OVFJPTEZMT1dTX1dISUxFIiwiYmluYXJ5X2pzb3AiLCJTVFlQRV9KU0lOVCIsIkZVTkNUSU9OU19BUkdTX0tXQVJHIiwiRlVOQ1RJT05TX0FSR1NfVkFSRyIsIl9hcmdzIiwiU1R5cGVfZmN0Iiwia3dfc3RhcnQiLCJpZHhfZW5kX3BvcyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwiaWR4X3ZhcmFyZyIsImt3YXJncyIsImlzTGFzdCIsIndyaXRlX2FyZyIsIkZVTkNUSU9OU19BUkdTIiwiRlVOQ1RJT05TX0FSR1NfUE9TT05MWSIsIkZVTkNUSU9OU19BUkdTX0tXT05MWSIsIkZVTkNUSU9OU19BUkdTX1BPUyIsImNvbnZlcnRfYXJncyIsImhhc192YXJhcmciLCJ2YXJhcmciLCJoYXNfa3dhcmciLCJrd2FyZyIsImFyZ3NfcG9zIiwiYXJnc19uYW1lcyIsInRvdGFsX2FyZ3MiLCJwb3Nvbmx5YXJncyIsImt3b25seWFyZ3MiLCJwb3NfZGVmYXVsdHMiLCJkZWZhdWx0cyIsInBvc29ubHkiLCJkb2Zmc2V0IiwiY29udmVydF9hcmciLCJuYl9wb3NfZGVmYXVsdHMiLCJNYXRoIiwibWluIiwiaGFzX290aGVycyIsImN1dF9vZmYiLCJrd29ubHkiLCJrd19kZWZhdWx0cyIsImhhc19rdyIsInB5X29mZnNldCIsImRlZnZhbCIsImFubm90YXRpb24iLCJjaGlsZCIsIkZVTkNUSU9OU19DQUxMX0tFWVdPUkQiLCJwcmludF9vYmoiLCJvYmoiLCJrZXlzIiwiT2JqZWN0IiwidmFsdWVzIiwiZGF0YSIsInNlcCIsImRlZmF1bHRfY2FsbCIsImt3X3BvcyIsIm5iX3BvcyIsIm1heCIsInBvc19zaXplIiwia3ciLCJjdXRvZmYiLCJoYXNfa3dhcmdzIiwic3Vic3RpdHV0ZV9jYWxsIiwiRlVOQ1RJT05TX0NBTEwiLCJTVHlwZXMiLCJmY3RfdHlwZSIsImZjdCIsInJldF90eXBlIiwia2V5d29yZHMiLCJGVU5DVElPTlNfREVGIiwiYXN0bm9kZSIsInN0eXBlIiwicGFyZW50X25vZGVfY29udGV4dCIsInJldHVybnMiLCJmY3RfcmV0dXJuX3R5cGUiLCJfX25hbWVfXyIsIlNUeXBlSUQiLCJsYXN0X3R5cGUiLCJmYWtlX25vZGUiLCJLRVlXT1JEU19BU1NFUlQiLCJhc3NlcnQiLCJLRVlXT1JEU19CUkVBSyIsIktFWVdPUkRTX0NPTlRJTlVFIiwiS0VZV09SRFNfSU1QT1JUX0FMSUFTIiwiYXNuYW1lIiwiS0VZV09SRFNfSU1QT1JUIiwibmFtZXMiLCJtb2R1bGUiLCJLRVlXT1JEU19SQUlTRSIsImV4YyIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIlJVTlRJTUVfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiQVNUX0NPTlZFUlRfMTciLCJBU1QySlNfMTciLCJSVU5USU1FXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJBU1RfQ09OVkVSVF8yMiIsIkFTVDJKU18yMiIsIlJVTlRJTUVfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJBU1RfQ09OVkVSVF8yNiIsIkFTVDJKU18yNiIsIkFTVF9DT05WRVJUXzI3IiwiQVNUMkpTXzI3IiwiUlVOVElNRV8yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJBU1RfQ09OVkVSVF8zMCIsIkFTVDJKU18zMCIsIkFTVF9DT05WRVJUXzMxIiwiQVNUMkpTXzMxIiwiQVNUX0NPTlZFUlRfMzIiLCJBU1QySlNfMzIiLCJBU1RfQ09OVkVSVF8zMyIsIkFTVDJKU18zMyIsIlJVTlRJTUVfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiQVNUX0NPTlZFUlRfMzYiLCJBU1QySlNfMzYiLCJBU1RfQ09OVkVSVF8zNyIsIkFTVDJKU18zNyIsIkFTVF9DT05WRVJUXzM4IiwiQVNUMkpTXzM4IiwiQVNUX0NPTlZFUlRfMzkiLCJBU1QySlNfMzkiLCJBU1RfQ09OVkVSVF80MCIsIkFTVDJKU180MCIsIlNUUlVDVFNfVFVQTEUiLCJTVFJVQ1RTX0xJU1QiLCJTVFJVQ1RTX0RJQ1QiLCJSRVRVUk4iLCJQQVNTIiwiT1BFUkFUT1JTX1VOQVJZIiwiT1BFUkFUT1JTX0NPTVBBUkUiLCJPUEVSQVRPUlNfQk9PTEVBTiIsIk9QRVJBVE9SU19CSU5BUlkiLCJPUEVSQVRPUlNfQVRUUiIsIk9QRVJBVE9SU19fQlJBQ0tFVFMiLCJPUEVSQVRPUlNfQVNTSUdOT1AiLCJPUEVSQVRPUlNfX0VRX0lOSVQiLCJPUEVSQVRPUlNfX0VRIiwiTElURVJBTFNfU1RSIiwiTElURVJBTFNfSU5UIiwiTElURVJBTFNfRkxPQVQiLCJMSVRFUkFMU19GX1NUUklORyIsIkxJVEVSQUxTX0ZfU1RSSU5HX0ZPUk1BVFRFRFZBTFVFIiwiTElURVJBTFNfQk9PTCIsIkxJVEVSQUxTX05PTkUiLCJBU1RfQ09OVkVSVCIsIlJVTlRJTUUiLCJhc3NpZ24iLCJTVFlQRV9OT05FVFlQRSIsIl9jb250ZXh0IiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiYWRkU1R5cGUiLCJTVFlQRV9CT09MIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJSRVRfSUpCRjJCT09MIiwiU1RZUEVfU1RSIiwiU1RZUEVfRkxPQVQiLCJmbG9hdDJzdHIiLCJmIiwidG9FeHBvbmVudGlhbCIsInNpZ25faWR4IiwiZ2VuQmluYXJ5T3BzIiwiZ2VuVW5hcnlPcHMiLCJJbnQyTnVtYmVyIiwiQ09OVkVSVF9JTlQyRkxPQVQiLCJSRVRfSUpCRjJGTE9BVCIsIlJFVF9GTE9BVCIsIlJFVF9TVFIiLCJTVHlwZV90eXBlX2Zsb2F0Iiwib3RoZXIiLCJvdGhlcl90eXBlIiwib3RoZXJfdmFsdWUiLCJtZXRob2QiLCJfX2ludF9fIiwiX19zdHJfXyIsImNvbnZlcnRfb3RoZXIiLCJzZWxmIiwicmVhbF90eXBlIiwiaWRfanNvcCIsInVuYXJ5X2pzb3AiLCJDT05WRVJUXzJJTlQiLCJSRVRfSUoySU5UIiwiUkVUX0lOVCIsIlJFVF9JTlQySU5UIiwiU1R5cGVfdHlwZV9pbnQiLCJhIiwiYiIsImNvbnZlcnRfc2VsZiIsIlJFVF9KU0lOVCIsIlJFVF9KU0lOVDJKU0lOVCIsIlJFVF9JSjJTVFIiLCJSRVRfU1RSMkJPT0wiLCJSRVRfU1RSMlNUUiIsIlNUeXBlX3R5cGVfc3RyIiwiX19sZW5fXyIsInJpZ2h0X25vZGUiLCJyY2hpbGQiLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsInJpZ2h0IiwicmlnaHRfdHlwZSIsImxlZnRzIiwibGVmdCIsImxzeW0iLCJsZWZ0X3R5cGUiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVFlQRV9OT1RfSU1QTEVNRU5URUQiLCJvcCIsImJuYW1lMnB5bmFtZSIsImF0dHIiLCJyZXZlcnNlZF9vcGVyYXRvciIsImZsb29yZGl2X2Zsb2F0IiwiZmxvb3IiLCJmbG9vcmRpdl9pbnQiLCJyZXN1bHQiLCJtb2RfZmxvYXQiLCJtb2QiLCJtb2RfaW50IiwibXVsdGlfanNvcCIsImJuYW1lMmpzb3AiLCJmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUiLCJyZXZlcnNlZCIsInJ0eXBlIiwibHR5cGUiLCJqc29wIiwib3BzIiwicmlnaHRzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZXhwciIsImVsdHMiLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJGbG9hdDY0QXJyYXkiLCJNQVhfTkJfVE9LRU4iLCJkb3BfcmVzZXQiLCJORVhUX0FTVF9OT0RFX0lEIiwibW9kdWxlcyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiY2FuZGlkYXRlcyIsImVycm9yIiwicGFyZW50X2NvbnRleHQiLCJSb290Q29udGV4dCIsInR5cGVfZmN0IiwiZ2VuVW5hcnlPcEZjdCIsIm9wbmFtZSIsImNhbGwiLCJsZW4iLCJpbnQiLCJmbG9hdCIsIkNPUkVfTU9EVUxFUyIsImN1cnNvciIsImxpbmVfb2Zmc2V0IiwiY2hhciIsInBhcnNlRXhwcmVzc2lvbiIsImFzdDJqc19jb252ZXJ0IiwicGFyc2VTeW1ib2wiLCJiZWdpbl9zdHIiLCJjYXIiLCJzeW1ib2wiLCJ0b0pTIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsInB5Y29kZSIsInN0YXJ0Iiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiZXhwb3J0ZWQiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwicGFyZW50X29wX3ByaW9yaXR5IiwiTk9DT05WRVJUIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJhX3ZhbHVlIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwiZmlyc3QiLCJwcmlvIiwicF9wcmlvIiwiY21wIiwicm9wIiwicHlvcCIsImNzIiwicmNzIiwibyIsInJldmVyc2UiLCJjb3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJ0YWJsZSIsInNyYyIsImdlbmVyYXRlX3JldHVybl90eXBlIiwiU1R5cGVuYW1lMmlkIiwiZ2V0U1R5cGVGcm9tTmFtZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==