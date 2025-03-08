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
/* harmony export */   w: () => (/* binding */ w),
/* harmony export */   wr: () => (/* binding */ wr),
/* harmony export */   wt: () => (/* binding */ wt)
/* harmony export */ });
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


const CURSOR = new dop__WEBPACK_IMPORTED_MODULE_1__.ARRAY_TYPE(2);
let jscode;
function set_js_cursor(idx) {
    dop__WEBPACK_IMPORTED_MODULE_1__.JS_CODE[idx + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_LINE] = CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_LINE];
    dop__WEBPACK_IMPORTED_MODULE_1__.JS_CODE[idx + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_COL] = jscode.length - CURSOR[dop__WEBPACK_IMPORTED_MODULE_1__.CODE_COL];
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
        if (typeof arg !== "number") {
            if (arg === undefined) arg = "undefined";
            if (arg === null) arg = "null";
            jscode += arg.toString();
            continue;
        }
        const offset = 4 * arg;
        set_js_cursor(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG);
        core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST2JS[(0,dop__WEBPACK_IMPORTED_MODULE_1__.type)(arg)](arg);
        set_js_cursor(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_END);
    }
}
function ast2js(ast) {
    new_jscode(ast.filename);
    w(0);
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.BB);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    for(let i = coffset; i < nbChildren + coffset; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, i);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.BODY);
    const nbChildren = node.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    for(let i = 0; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node[i], context);
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
    const body = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    if (nbChildren === 2) base = body + 1;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`class ${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]} extends ${base} {${body}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    context.local_symbols[node.name] = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.getSTypeID)(node.name);
    context = new py2ast__WEBPACK_IMPORTED_MODULE_2__.Context("class", context);
    if (node.bases.length > 1) throw new Error('Not implemented');
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CLASS_CLASSDEF);
    const nbChildren = 1 + node.bases.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset, node.body, context);
    for(let i = 1; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.bases[i - 1], context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.name;
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
    const idx = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    const list = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const body = list + 1;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    if (node.iter.constructor.$name === "Call" && node.iter.func.id === "range") return false;
    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_FOR);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 2);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.iter, context);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset + 1, node.body, context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = target;
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
    const idx = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    const body = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    let beg = "0n";
    let incr = "1n";
    let end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(body + 1);
    if (nbChildren > 2) {
        beg = end;
        end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(body + 1);
    }
    if (nbChildren === 4) incr = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(body + 2);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    if (node.iter.constructor.$name !== "Call" || node.iter.func.id !== "range") return false;
    const target = node.target.id;
    context.local_symbols[target] = 0; //TODO
    context.local_symbols[node.value] = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT;
    // TODO: jsint opti if this.value not used...
    const args = node.iter.args;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_FOR_RANGE);
    const nbChildren = args.length + 1;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset, node.body, context);
    for(let i = 1; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, args[i - 1], context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = target;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    let coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    let nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    // if
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`if(${coffset++}){${coffset++}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    // else if
    let i;
    for(i = 2; i < nbChildren - 1; i += 2){
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`else if(${coffset++}){${coffset++}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    }
    // else
    if (i === nbChildren - 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`else {${coffset}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    let childCount = 2;
    let cur = node;
    while("orelse" in cur && cur.orelse.length === 1){
        if (!("test" in cur.orelse[0])) {
            ++childCount;
            break;
        }
        cur = cur.orelse[0];
        childCount += 2;
    }
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_IFBLOCK);
    let coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, childCount);
    // if
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset++, node.test, context);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset++, node.body, context);
    // else if
    cur = node;
    while("orelse" in cur && cur.orelse.length === 1){
        // cur.orelse[0] is the body
        if (!("test" in cur.orelse[0])) {
            (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, cur.orelse, context);
            break;
        }
        cur = cur.orelse[0];
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset++, cur.test, context);
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset++, cur.body, context);
        childCount += 2;
    }
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`(${coffset} ? ${coffset + 1} : ${coffset + 2})`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 3);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.test, context);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + 1, node.body, context); // true
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + 2, node.orelse, context); // false
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_TERNARY);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset + 1));
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`try {${coffset}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`catch(_raw_err_){${ast2js__WEBPACK_IMPORTED_MODULE_0__.BB}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("const _err_ = _b_.get_py_exception(_raw_err_, __SBRYTHON__)");
    if (nbChildren > 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(1 + coffset);
    for(let i = 2; i < nbChildren; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, "else ", i + coffset);
    // not a catch all...
    if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(coffset + nbChildren - 1) !== 1) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(ast2js__WEBPACK_IMPORTED_MODULE_0__.NL, "else { throw _raw_err_ }");
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    const nbChildren = node.handlers.length + 1;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_TRYBLOCK);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    // try body
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset, node.body, context);
    for(let i = 1; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.handlers[i - 1], context);
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    // else is handled by tryblock
    if (nbChildren === 1) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`{${coffset}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`if(${coffset + 1}){${coffset}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    let nbChildren = 1;
    if (node.type !== undefined) nbChildren = 2;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_TRYBLOCK_CATCH);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset, node.body, context);
    if (nbChildren === 2) (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + 1, node.type, context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.name;
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
            if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.type)(node) === core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.SYMBOL) col += dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node].length; // V8 gives first character of the symbol name when FF gives "("...
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`while(${coffset}){${coffset + 1}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.CONTROLFLOWS_WHILE);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 2);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.test, context);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_body)(coffset + 1, node.body, context);
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
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    const SType_fct = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    const meta = SType_fct.__call__;
    let kw_start = meta.idx_end_pos;
    if (kw_start === Number.POSITIVE_INFINITY) kw_start = meta.idx_vararg + 1;
    if (meta.kwargs !== undefined && kw_start === nbChildren - 1) ++kw_start;
    for(let i = 0; i < nbChildren; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ");
        if (kw_start === i) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("{");
        const isLast = i === meta.idx_vararg && i === nbChildren - 1;
        write_arg(i + coffset, isLast);
    }
    if (kw_start < nbChildren) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('} = {}');
}
function write_arg(node, isLast) {
    const offset = 4 * node;
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_1__.CODE_BEG);
    const name = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    const type_id = (0,dop__WEBPACK_IMPORTED_MODULE_1__.type)(node);
    if (type_id === _astconvert__WEBPACK_IMPORTED_MODULE_4__.FUNCTIONS_ARGS_VARG) {
        if (isLast) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`...${name}`;
        else (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, name, '=', "[]"));
    } else if (type_id === _astconvert__WEBPACK_IMPORTED_MODULE_4__.FUNCTIONS_ARGS_KWARG) {
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, name, '=', "{}"));
    } else if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node) === 1) {
        let defval = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
        if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(defval) === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT) defval = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(defval);
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, name, '=', defval));
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




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
function convert_args(dst, node, SType_fct, context) {
    const meta = SType_fct.__call__;
    // compute total args...
    const _args = node.args;
    const has_vararg = _args.vararg !== undefined;
    const has_kwarg = _args.kwarg !== undefined;
    const args_pos = meta.args_pos;
    const args_names = meta.args_names;
    const total_args = _args.posonlyargs.length + _args.args.length + +has_vararg + _args.kwonlyargs.length + +has_kwarg;
    (0,dop__WEBPACK_IMPORTED_MODULE_2__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.FUNCTIONS_ARGS);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_2__.addChild)(dst, total_args); // args
    const pos_defaults = node.args.defaults;
    const posonly = _args.posonlyargs;
    const pos = _args.args;
    // posonly
    let doffset = pos_defaults.length - posonly.length - pos.length;
    for(let i = 0; i < posonly.length; ++i){
        convert_arg(i + coffset, posonly[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POSONLY, context);
        context.local_symbols[posonly[i].arg] = (0,dop__WEBPACK_IMPORTED_MODULE_2__.resultType)(i + coffset);
    }
    // pos
    let offset = posonly.length;
    doffset -= posonly.length;
    for(let i = 0; i < pos.length; ++i){
        convert_arg(offset + coffset, pos[i], pos_defaults[i - doffset], FUNCTIONS_ARGS_POS, context);
        args_names[offset++] = pos[i].arg;
    }
    meta.idx_vararg = offset;
    // vararg
    if (has_vararg) {
        meta.idx_end_pos = Number.POSITIVE_INFINITY;
        convert_arg(offset + coffset, _args.vararg, undefined, FUNCTIONS_ARGS_VARG, context);
        ++offset;
    } else {
        meta.idx_end_pos = offset;
        const nb_pos_defaults = Math.min(pos_defaults.length, pos.length);
        const has_others = pos_defaults.length > pos.length || total_args !== offset;
        if (nb_pos_defaults > 1 || nb_pos_defaults === 1 && has_others) meta.idx_end_pos -= nb_pos_defaults;
    }
    let cut_off = meta.idx_end_pos;
    if (cut_off === Number.POSITIVE_INFINITY) cut_off = meta.idx_vararg;
    for(let i = posonly.length; i < cut_off; ++i)args_pos[dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[i + coffset]] = i;
    const end = meta.idx_vararg - cut_off;
    for(let i = 0; i < end; ++i)args_pos[dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[i + coffset]] = -1;
    //TODO: idx_end_pos (if default and no idx_vararg)
    // kwonly
    const kwonly = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;
    meta.has_kw = meta.idx_vararg !== cut_off || kwonly.length !== 0;
    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i){
        convert_arg(offset + coffset, kwonly[i], kw_defaults[i], FUNCTIONS_ARGS_KWONLY, context);
        args_pos[kwonly[i].arg] = -1;
        ++offset;
    }
    // kwarg
    if (has_kwarg) {
        convert_arg(offset + coffset, _args.kwarg, undefined, FUNCTIONS_ARGS_KWARG, context);
        meta.kwargs = _args.kwarg.arg;
        ++offset;
    }
    //TODO...
    /*
    if( context.type === "class")
        _args = _args.slice(1);
    */ //TODO...
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[dst] = SType_fct;
    if (total_args !== 0) {
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.set_py_from_beg_end)(dst, coffset, coffset + total_args - 1);
    } else {
        // an estimation...
        const col = node.col_offset + 4 + node.name.length + 1;
        const py_offset = 4 * dst;
        dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_LINE] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_LINE] = node.lineno;
        dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_COL] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[py_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_COL] = col;
    }
}
function convert_arg(dst, node, defval, type, context) {
    const name = node.arg;
    //TODO: convert annotation type...
    let result_type = node.annotation?.id;
    if (defval !== undefined) {
        const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_2__.addChild)(dst, 1);
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(coffset, defval, context);
        if (result_type === undefined) {
            result_type = (0,dop__WEBPACK_IMPORTED_MODULE_2__.resultType)(coffset);
            if (result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT) result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT;
        }
    }
    (0,dop__WEBPACK_IMPORTED_MODULE_2__.setType)(dst, type);
    (0,dop__WEBPACK_IMPORTED_MODULE_2__.setResultType)(dst, result_type);
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[dst] = name;
    context.local_symbols[name] = result_type;
    (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.set_py_code)(dst, node);
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
    const meta = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[node].__call__;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_2__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_2__.nbChild)(node);
    let kw_pos = nbChildren;
    for(let i = 1; i < nbChildren; ++i)if ((0,dop__WEBPACK_IMPORTED_MODULE_2__.type)(i + coffset) === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.FUNCTIONS_CALL_KEYWORD) {
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
        for(let i = 1; i < cutoff; ++i)pos[i - 1] = i + coffset;
        const varg_start = meta.idx_vararg + 1;
        const varg_nb = kw_pos - varg_start;
        if (varg_nb !== 0) {
            // template string... [ [..str], ...idx ]
            // => [ (a), (b), (c), (d) ] ...
            let str = new Array(varg_nb + 1);
            let idx = new Array(varg_nb + 1);
            str[0] = "[";
            idx[0] = str;
            idx[1] = coffset + varg_start;
            for(let i = 1; i < varg_nb; ++i){
                str[i] = ", ";
                idx[i + 1] = coffset + varg_start + i;
            }
            str[varg_nb] = "]"; // prevents sparse array ?
        }
    } else {
        const cutoff = Math.min(kw_pos, nb_pos + 1);
        for(let i = 1; i < cutoff; ++i)pos[i - 1] = i + coffset;
        const args_names = meta.args_names;
        for(let i = cutoff; i < kw_pos; ++i)kw[args_names[i - 1]] = i + coffset;
        has_kw = cutoff !== kw_pos;
    }
    let has_kwargs = false;
    const args_pos = meta.args_pos;
    for(let i = kw_pos; i < nbChildren; ++i){
        const arg = i + coffset;
        const name = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[arg];
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
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${coffset}(${join(pos)})`; // args ?
}
function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[node].__call__.substitute_call(node));
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    const name = node.func.id;
    const fct_type = context.local_symbols[name];
    if (fct_type === undefined) {
        console.warn(node);
        console.warn(context.local_symbols);
        throw new Error(`Function ${name} not defined`);
    }
    const fct = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[fct_type];
    const ret_type = fct.__call__.return_type();
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.FUNCTIONS_CALL);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, ret_type);
    let coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1 + node.args.length + node.keywords.length);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset++, node.func, context);
    for(let i = 0; i < node.args.length; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset++, node.args[i], context);
    for(let i = 0; i < node.keywords.length; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset++, node.keywords[i], context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = fct;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)((0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node));
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.FUNCTIONS_CALL_KEYWORD);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset));
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.arg;
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
    const name = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`function ${name}(${coffset}){${coffset + 1}${ast2js__WEBPACK_IMPORTED_MODULE_0__.NL}}`;
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var _call_ast2js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../call/ast2js */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _args_astconvert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../args/astconvert */ "./src/core_modules/functions/args/astconvert.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dop */ "./src/dop.ts");






// required as some symbols may have been declared out of order
// (not only for return type computation)
function generate(dst, node, context) {
    const rtype = (0,dop__WEBPACK_IMPORTED_MODULE_5__.resultType)(dst);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_5__.addChild)(dst, 2);
    // fuck...
    const stype = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.STypes[rtype];
    const meta = stype.__call__;
    // new context for the function local variables
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    context.parent_node_context = dst; // <- here
    // fake the node... => better doing here to not have context issues.
    (0,_args_astconvert__WEBPACK_IMPORTED_MODULE_3__.convert_args)(coffset, node, stype, context);
    // already done in convert_args
    /* const c_offset  = firstChild(coffset);
    const c_end     = c_offset + nbChild(coffset);
    for(let i = c_offset; i < c_end; ++i)
        context.local_symbols[VALUES[i]] = resultType(i);*/ // tell body this function has been generated.
    meta.generate = undefined;
    // prevents recursive calls or reaffectation.
    meta.return_type = undefined;
    const annotation = node.returns?.id;
    if (annotation !== undefined) {
        let fct_return_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.getSTypeID)(annotation);
        // force the type.
        meta.return_type = ()=>fct_return_type;
    }
    (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(coffset + 1, node.body, context);
}
function convert(dst, node, context) {
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
                generate(dst, node, context); // should be the new context
                return SType_fct.__call__.return_type();
            },
            substitute_call: _call_ast2js__WEBPACK_IMPORTED_MODULE_2__.default_call
        }
    };
    const STypeID = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.STypes.length;
    structs_STypes__WEBPACK_IMPORTED_MODULE_1__.STypes[STypeID] = SType_fct;
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
    (0,dop__WEBPACK_IMPORTED_MODULE_5__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_4__.FUNCTIONS_DEF);
    (0,dop__WEBPACK_IMPORTED_MODULE_5__.setResultType)(dst, STypeID);
    dop__WEBPACK_IMPORTED_MODULE_5__.VALUES[dst] = node.name;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`_b_.assert(${(0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node)})`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.KEYWORDS_ASSERT);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.test, context);
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

function ast2js(_) {
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.KEYWORDS_BREAK);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.KEYWORDS_CONTINUE);
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
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(value[0]);
    if (value[1] !== undefined) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(": ", value[1]);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.KEYWORDS_IMPORT_ALIAS);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = [
        node.name,
        node.asname
    ];
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
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    for(let i = 0; i < nbChildren; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ");
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(i + coffset);
    }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('} = ');
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.KEYWORDS_IMPORT);
    const nbChildren = node.names.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    for(let i = 0; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.names[i], context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.module;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`throw new _b_.PythonError(${(0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node)})`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.KEYWORDS_RAISE);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.exc, context);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(dst, node, _context) {
    if (!(typeof node.value === "object") || !("__class__" in node.value) || node.value.__class__.__qualname__ !== "NoneType") return false;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_NONE);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_NONETYPE);
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(dst, node, _context) {
    if (typeof node.value !== "boolean") return false;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_BOOL);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_BOOL);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.value; // TODO: 2 types instead of one ?
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("${", (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node), "}");
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_F_STRING_FORMATTEDVALUE);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context);
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
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_2__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_2__.nbChild)(node);
    for(let i = coffset; i < nbChildren + coffset; ++i){
        if ((0,dop__WEBPACK_IMPORTED_MODULE_2__.resultType)(i) === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_STR) {
            const offset = 4 * i;
            // we write the children directly...
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG);
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[i]);
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.set_js_cursor)(offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END);
            continue;
        }
        if ((0,dop__WEBPACK_IMPORTED_MODULE_2__.type)(i) === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_F_STRING_FORMATTEDVALUE) {
            (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(i);
            continue;
        }
        throw new Error("unsupported");
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_F_STRING);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_STR);
    const nbChildren = node.values.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    for(let i = 0; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.values[i], context);
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
    // force str write (else might assume this is an AST node ID)...
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(`${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]}`);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(dst, node, _context) {
    if (!(node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float") return false;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_FLOAT);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_FLOAT);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.value.value;
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
            const other = (0,dop__WEBPACK_IMPORTED_MODULE_2__.firstChild)(node) + 1;
            const other_type = (0,dop__WEBPACK_IMPORTED_MODULE_2__.resultType)(other);
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_INT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.Int2Number)(other);
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_FLOAT || other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_INT) return other_type;
            //TODO: power...
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STYPE_STR) {
                const other_value = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[other];
                if ((0,dop__WEBPACK_IMPORTED_MODULE_2__.type)(other) === core_modules_lists__WEBPACK_IMPORTED_MODULE_1__.LITERALS_STR) {
                    if (other_value === "inf" || other_value === "infinity") return "Number.POSITIVE_INFINITY";
                    if (other_value === "-inf" || other_value === "-infinity") return "Number.NEGATIVE_INFINITY";
                }
                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;
                //TODO: optimize if other is string litteral...
                return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`parseFloat(${other})`; //, ${node.children[2]}))`; 
            }
            const otype = structs_STypes__WEBPACK_IMPORTED_MODULE_6__.STypes[other_type];
            const method = otype?.__int__;
            if (method === undefined) throw new Error(`${otype.__name__}.__int__ not defined`);
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
    let value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) {
        // force str write (else might assume this is an AST node ID)...
        (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(`${value}n`);
        return;
    }
    if (typeof value === "bigint") value = Number(value); // remove useless precision.
    // force str write (else might assume this is an AST node ID)...
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(`${value}`);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(dst, node, _context) {
    let value = node.value;
    if (value.__class__?.__qualname__ === "int") value = value.value;
    if (typeof value !== "number" && typeof value !== "bigint") return false;
    const real_type = typeof value !== "number" ? structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT : structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_JSINT;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_INT);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, real_type);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = value;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");






const SType_type_int = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_5__.addSType)('type[int]', {
    __call__: {
        //TODO...
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT,
        substitute_call: (node)=>{
            const other = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node) + 1;
            const other_type = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(other);
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_INT) return other;
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_JSINT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(other);
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_FLOAT) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(Math.trunc(${other}))`;
            //TODO: power...
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_STR) {
                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;
                //TODO: optimize if other is string litteral...
                return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(${other})`; //, ${node.children[2]}))`; 
            }
            const otype = structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STypes[other_type];
            const method = otype?.__int__;
            if (method === undefined) throw new Error(`${otype.__name__}.__int__ not defined`);
            return method.substitute_call(node, other);
        }
    }
});
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_5__.addSType)('int', {
    //TODO: fix type...
    // @ts-ignore
    __class__: SType_type_int,
    __str__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_STR,
        substitute_call (node) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${node}.toString()`;
        }
    },
    __int__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT,
        substitute_call (node, self) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.id_jsop)(node, self);
        }
    },
    /* */ ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        // '**' => if "as float" could accept loss of precision.
        '**',
        '+',
        '-',
        '&',
        '|',
        '^',
        '>>',
        '<<'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJ2INT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_2INT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '*'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT2INT, {
        substitute_call (node, a, b) {
            if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_FLOAT) // TODO: check if really interesting...
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(b));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '/'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJBF2FLOAT, {
        convert_self: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_INT2FLOAT,
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_INT2FLOAT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '//'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJ2INT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_2INT,
        substitute_call: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '%'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJ2INT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_2INT,
        substitute_call: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genUnaryOps)([
        'u.-'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT, {
        substitute_call: (node, a)=>{
            if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_FLOAT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(a));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genUnaryOps)([
        '~'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJBF2BOOL)
});


/***/ }),

/***/ "./src/core_modules/literals/int/stype_jsint.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/literals/int/stype_jsint.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");






(0,structs_STypes__WEBPACK_IMPORTED_MODULE_5__.addSType)('jsint', {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)(// '**' and '*' => if "as float" could accept loss of precision.
    [
        '**',
        '+',
        '-',
        '&',
        '|',
        '^',
        '>>',
        '<<' // in JS bit operations are on 32bits
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJ2INT, {
        convert_self: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_2INT,
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_2INT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '*'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJ2INT, {
        substitute_call: (node, a, b)=>{
            if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_FLOAT) // TODO: check if really interesting...
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(b));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(b));
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '/'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJBF2FLOAT, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_INT2FLOAT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '//'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_JSINT2JSINT, {
        substitute_call: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        '%'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_JSINT2JSINT, {
        substitute_call: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genUnaryOps)([
        'u.-'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_JSINT, {
        substitute_call: (node, a)=>{
            if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_INT) return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(a));
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genUnaryOps)([
        '~'
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT, {
        convert_self: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_2INT
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJBF2BOOL)
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`'${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]}'`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(dst, node, _context) {
    if (typeof node.value !== "string") return false;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_STR);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_STR);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.value;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_Converters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/Converters */ "./src/structs/Converters.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");






const SType_type_str = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_5__.addSType)('type[str]', {
    __call__: {
        //TODO...
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_STR,
        substitute_call: (node)=>{
            const other = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node) + 1;
            const other_type = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(other);
            //TODO use their __int__ ?
            if (other_type === structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_STR) return other;
            const method = structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STypes[other_type]?.__str__;
            if (method === undefined) throw new Error(`${structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STypes[other_type].__name__}.__str__ not defined`);
            return method.substitute_call(other);
        }
    }
});
(0,structs_STypes__WEBPACK_IMPORTED_MODULE_5__.addSType)('str', {
    // @ts-ignore
    __class__: SType_type_str,
    __len__: {
        return_type: structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_INT,
        substitute_call: (_)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${(0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(_) + 1}.length`;
        }
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.CMPOPS_LIST, structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_STR2BOOL),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        "+"
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_STR2STR),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.genBinaryOps)([
        "*"
    ], structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_4__.RET_IJ2STR, {
        convert_other: structs_Converters__WEBPACK_IMPORTED_MODULE_3__.CONVERT_INT2FLOAT,
        substitute_call: (node, a, b)=>{
            if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(a) !== structs_STypes__WEBPACK_IMPORTED_MODULE_5__.STYPE_STR) [a, b] = [
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function ast2js(node) {
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    for(let i = 1; i < nbChildren; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${i + coffset} = `;
    let rchild = coffset;
    if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset) === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT && (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT) rchild = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(coffset);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(rchild);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [
        node.target
    ];
    if (context.type !== "class" && targets[0].constructor.$name === "Name" && !(targets[0].id in context.local_symbols)) return false;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS__EQ);
    const nbChildren = targets.length + 1;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context); // right
    let rtype = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset);
    let result_type = null;
    const annotation = node?.annotation?.id;
    if (annotation !== undefined) result_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.getSTypeID)(annotation);
    if (result_type !== null && result_type !== rtype) console.warn("Wrong result_type");
    if (result_type === null) {
        result_type = rtype;
        if (rtype === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT) result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT; // prevents issues.
    //TODO: only if assign...
    }
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, result_type);
    for(let i = 1; i < nbChildren; ++i){
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + i, targets[i - 1], context);
        context.local_symbols[targets[i - 1].id] = result_type;
    /*
        // could be improved I guess.
        if( type(i+coffset) === SYMBOL) {
    
            // if exists, ensure type.
            const ltype = context.local_symbols[i+coffset];
            if( ltype !== undefined ) {
                if( ltype !== 0 && rtype !== ltype)
                    {}//console.warn("Wrong result_type");
    
                // annotation_type
            }
        }
*/ }
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("var ");
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    for(let i = 1; i < nbChildren; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${i + coffset} = `;
    let rchild = coffset;
    if ((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset) === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT && (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(node) === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT) rchild = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Number2Int)(coffset);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(rchild);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [
        node.target
    ];
    if (context.type === "class" || targets[0].constructor.$name !== "Name" || targets[0].id in context.local_symbols) return false;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS__EQ_INIT);
    const nbChildren = targets.length + 1;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context); // right
    let rtype = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset);
    let result_type = null;
    const annotation = node?.annotation?.id;
    if (annotation !== undefined) result_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.getSTypeID)(annotation);
    if (result_type !== null && result_type !== rtype) console.warn("Wrong result_type");
    if (result_type === null) {
        result_type = rtype;
        if (rtype === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT) result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_INT; // prevents issues.
    //TODO: only if assign...
    }
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, result_type);
    for(let i = 1; i < nbChildren; ++i){
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + i, targets[i - 1], context);
        context.local_symbols[targets[i - 1].id] = result_type;
    }
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
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.AssignOperators[dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]];
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[(0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset)]?.[op];
    if (method !== undefined) type = method.return_type((0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset + 1));
    // try a = a + b
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) {
        throw new Error(`${(0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset + 1)} ${op}= ${(0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset)} NOT IMPLEMENTED!`);
    /*
        op     = reversed_operator(op);
        method = name2SType(right.result_type as STypeName)?.[op];
        if( method !== undefined)
            type   = method.return_type(left.result_type);

        if( type === SType_NOT_IMPLEMENTED)
            throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);

        [left, right] = [right, left];
        */ }
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(node, coffset, coffset + 1));
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");




function convert(dst, node, context) {
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = op;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS_ASSIGNOP);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 2);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.target, context);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + 1, node.value, context);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset));
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${coffset}[${coffset + 1}]`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS__BRACKETS);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 2);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context), (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset + 1, node.slice, context);
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${(0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node)}.${dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS_ATTR);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = node.attr;
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
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const method = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[(0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset)][dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]];
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)(method.substitute_call(node, coffset, coffset + 1));
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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dop */ "./src/dop.ts");





function convert(dst, node, context) {
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    (0,dop__WEBPACK_IMPORTED_MODULE_4__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_3__.OPERATORS_BINARY);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_4__.addChild)(dst, 2);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(coffset, node.left, context); // left
    (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(coffset + 1, node.right, context); // right
    const ltype = (0,dop__WEBPACK_IMPORTED_MODULE_4__.resultType)(coffset);
    const rtype = (0,dop__WEBPACK_IMPORTED_MODULE_4__.resultType)(coffset + 1);
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[ltype]?.[op];
    if (method !== undefined) type = method.return_type(rtype);
    // try reversed operator
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.reversed_operator)(op);
        method = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[rtype]?.[op];
        if (method !== undefined) type = method.return_type(ltype);
        if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_NOT_IMPLEMENTED) throw new Error(`${rtype} ${op} ${ltype} NOT IMPLEMENTED!`);
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.swapASTNodes)(coffset, coffset + 1); // costly, use 2 ast2js instead ?
    }
    dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[dst] = op;
    (0,dop__WEBPACK_IMPORTED_MODULE_4__.setResultType)(dst, type);
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.multi_jsop)(node, dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]));
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



const bname2jsop = {
    'And': '&&',
    'Or': '||'
};
function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS_BOOLEAN);
    const nbChildren = node.values.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    for(let i = 0; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.values[i], context);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset));
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = bname2jsop[node.op.constructor.$name];
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
    const rtype = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(right);
    const ltype = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(left);
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[ltype]?.[op];
    if (method !== undefined) type = method.return_type(rtype);
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.reversed_operator)(op);
        method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[rtype]?.[op];
        if (method !== undefined) type = method.return_type(ltype);
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
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    for(let i = 0; i < value.length; ++i){
        if (i !== 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(' && ');
        const op = value[i];
        const left = i + coffset;
        const right = i + 1 + coffset;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(dst, node, context) {
    const ops = node.ops.map((e)=>{
        const op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.bname2pyname[e.constructor.$name];
        if (op === undefined) throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = ops;
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.OPERATORS_COMPARE);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_4__.STYPE_BOOL);
    const nbChildren = node.comparators.length + 1;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.left, context);
    for(let i = 1; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.comparators[i - 1], context);
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
    const left = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    const value = dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node];
    if (value === 'not') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wr)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.unary_jsop)(node, '!', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.Int2Number)(left, structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_JSINT)));
    const method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[(0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(left)][value];
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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dop */ "./src/dop.ts");





function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_4__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_3__.OPERATORS_UNARY);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_4__.addChild)(dst, 1);
    (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(coffset, node.operand, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    dop__WEBPACK_IMPORTED_MODULE_4__.VALUES[dst] = op;
    if (op === 'not') {
        (0,dop__WEBPACK_IMPORTED_MODULE_4__.setResultType)(dst, structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_BOOL);
        return;
    }
    let type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_NOT_IMPLEMENTED;
    let method = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STypes[(0,dop__WEBPACK_IMPORTED_MODULE_4__.resultType)(coffset)]?.[op];
    if (method !== undefined) type = method.return_type();
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_NOT_IMPLEMENTED) throw new Error(`${op} ${(0,dop__WEBPACK_IMPORTED_MODULE_4__.resultType)(coffset)} NOT IMPLEMENTED!`);
    (0,dop__WEBPACK_IMPORTED_MODULE_4__.setResultType)(dst, type);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function convert(dst, node, _context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.PASS);
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    if (coffset === 0) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("return null");
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`return ${coffset}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function convert(dst, node, context) {
    // context.parent_node_context
    let result_type = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STYPE_NONETYPE;
    if (node.value !== undefined) {
        const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, 1);
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(coffset, node.value, context);
        result_type = (0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(coffset);
    }
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.RETURN);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, result_type);
    const meta = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.STypes[(0,dop__WEBPACK_IMPORTED_MODULE_1__.resultType)(context.parent_node_context)].__call__;
    if (meta.return_type === undefined) meta.return_type = ()=>result_type;
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)('{');
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    if (nbChildren > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`${coffset}: ${coffset + 1}`;
    for(let i = 2; i < nbChildren; i += 2)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.wt)`, ${i + coffset}: ${i + 1 + coffset}`;
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.STRUCTS_DICT);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, node.keys.length * 2);
    for(let i = 0; i < node.keys.length; ++i){
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(2 * i + coffset, node.keys[i], context);
        (0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(2 * i + 1 + coffset, node.values[i], context);
    }
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("[");
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    if (nbChildren > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(coffset);
    for(let i = 1; i < nbChildren; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ", i + coffset);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.STRUCTS_LIST);
    const nbChildren = node.elts.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    for(let i = 0; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.elts[i], context);
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function ast2js(node) {
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)("Object.freeze([");
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_1__.nbChild)(node);
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.firstChild)(node);
    if (nbChildren > 0) (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(coffset);
    for(let i = 1; i < nbChildren; ++i)(0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(", ", i + coffset);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.STRUCTS_TUPLE);
    const nbChildren = node.elts.length;
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_1__.addChild)(dst, nbChildren);
    for(let i = 0; i < nbChildren; ++i)(0,py2ast__WEBPACK_IMPORTED_MODULE_2__.convert_node)(i + coffset, node.elts[i], context);
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
    (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.w)(dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[node]);
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
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dop */ "./src/dop.ts");


function isClass(_) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}
function convert(dst, node, context) {
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
    */ (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.SYMBOL);
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setResultType)(dst, result_type);
    dop__WEBPACK_IMPORTED_MODULE_1__.VALUES[dst] = value;
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
/* harmony export */   ASTNODES: () => (/* binding */ ASTNODES),
/* harmony export */   ASTNODE_CHILDREN_START: () => (/* binding */ ASTNODE_CHILDREN_START),
/* harmony export */   ASTNODE_NB_CHILDREN: () => (/* binding */ ASTNODE_NB_CHILDREN),
/* harmony export */   ASTNODE_PARENT_OP_PRIORITY: () => (/* binding */ ASTNODE_PARENT_OP_PRIORITY),
/* harmony export */   ASTNODE_RESULT_TYPE: () => (/* binding */ ASTNODE_RESULT_TYPE),
/* harmony export */   ASTNODE_SIZE: () => (/* binding */ ASTNODE_SIZE),
/* harmony export */   ASTNODE_TYPE_ID: () => (/* binding */ ASTNODE_TYPE_ID),
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
/* harmony export */   addChild: () => (/* binding */ addChild),
/* harmony export */   createASTNode: () => (/* binding */ createASTNode),
/* harmony export */   createASTNodes: () => (/* binding */ createASTNodes),
/* harmony export */   "default": () => (/* binding */ dop_reset),
/* harmony export */   firstChild: () => (/* binding */ firstChild),
/* harmony export */   nbChild: () => (/* binding */ nbChild),
/* harmony export */   parentOPPrio: () => (/* binding */ parentOPPrio),
/* harmony export */   resultType: () => (/* binding */ resultType),
/* harmony export */   setParentOPPrio: () => (/* binding */ setParentOPPrio),
/* harmony export */   setResultType: () => (/* binding */ setResultType),
/* harmony export */   setType: () => (/* binding */ setType),
/* harmony export */   type: () => (/* binding */ type)
/* harmony export */ });
const ARRAY_TYPE = Float64Array;
const ELEM_SIZE = 8;
const MAX_NB_ASTNODES = 105 /** * 20 /**/ ; // when merged
const CODE_LINE = 0;
const CODE_COL = 1;
const CODE_BEG = 0;
const CODE_END = 2;
const CODE_BEG_LINE = CODE_BEG + CODE_LINE;
const CODE_BEG_COL = CODE_BEG + CODE_COL;
const CODE_END_LINE = CODE_END + CODE_LINE;
const CODE_END_COL = CODE_END + CODE_COL;
const PY_CODE = new ARRAY_TYPE(4 * MAX_NB_ASTNODES);
const JS_CODE = new ARRAY_TYPE(4 * MAX_NB_ASTNODES);
//TODO: indirection ou par ID...
const VALUES = new Array();
let NEXT_AST_NODE_ID = 0;
function addChild(parent, nbChild) {
    const offset = parent * ASTNODE_SIZE;
    ASTNODES[offset + ASTNODE_NB_CHILDREN] = nbChild;
    const id = ASTNODES[offset + ASTNODE_CHILDREN_START] = NEXT_AST_NODE_ID;
    NEXT_AST_NODE_ID += nbChild;
    return id;
}
function createASTNode() {
    return NEXT_AST_NODE_ID++;
}
function createASTNodes(nb) {
    NEXT_AST_NODE_ID += nb;
}
function dop_reset() {
    VALUES.length = 0;
    NEXT_AST_NODE_ID = 0;
    // @ts-ignore
    BUFFER.resize(0);
    // @ts-ignore
    BUFFER.resize(BUFFER_SIZE);
}
const ASTNODE_TYPE_ID = 0; // set initially
const ASTNODE_PARENT_OP_PRIORITY = 1;
const ASTNODE_CHILDREN_START = 2; // set if children
const ASTNODE_NB_CHILDREN = 3; // set if unknown nb children
const ASTNODE_RESULT_TYPE = 4; // set if expr.
const ASTNODE_SIZE = 5;
const BUFFER_SIZE = ASTNODE_SIZE * ELEM_SIZE * MAX_NB_ASTNODES;
// @ts-ignore
const BUFFER = new ArrayBuffer(BUFFER_SIZE, {
    maxByteLength: BUFFER_SIZE
});
const ASTNODES = new ARRAY_TYPE(BUFFER);
function type(node) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_TYPE_ID];
}
function nbChild(parent) {
    return ASTNODES[parent * ASTNODE_SIZE + ASTNODE_NB_CHILDREN];
}
function firstChild(parent) {
    return ASTNODES[parent * ASTNODE_SIZE + ASTNODE_CHILDREN_START];
}
function resultType(node) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_RESULT_TYPE];
}
function parentOPPrio(node) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_PARENT_OP_PRIORITY];
}
function setType(node, value) {
    return ASTNODES[node * ASTNODE_SIZE + ASTNODE_TYPE_ID] = value;
}
function setResultType(node, value) {
    ASTNODES[node * ASTNODE_SIZE + ASTNODE_RESULT_TYPE] = value;
}
function setParentOPPrio(node, value) {
    ASTNODES[node * ASTNODE_SIZE + ASTNODE_PARENT_OP_PRIORITY] = value;
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
/* harmony export */   convert_body: () => (/* binding */ convert_body),
/* harmony export */   convert_node: () => (/* binding */ convert_node),
/* harmony export */   printNode: () => (/* binding */ printNode),
/* harmony export */   py2ast: () => (/* binding */ py2ast),
/* harmony export */   set_py_code: () => (/* binding */ set_py_code),
/* harmony export */   set_py_code_from_list: () => (/* binding */ set_py_code_from_list),
/* harmony export */   set_py_from_beg_end: () => (/* binding */ set_py_from_beg_end),
/* harmony export */   swapASTNodes: () => (/* binding */ swapASTNodes)
/* harmony export */ });
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var structs_ReturnTypeFcts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/ReturnTypeFcts */ "./src/structs/ReturnTypeFcts.ts");
// Brython must be imported before.




function printNode(id) {
    console.warn({
        type: dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES[dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_SIZE * id + dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_TYPE_ID],
        ret_type: structs_STypes__WEBPACK_IMPORTED_MODULE_1__.STypes[dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES[dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_SIZE * id + dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_RESULT_TYPE]],
        value: dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[id]
    });
}
function set_py_code(id, brython_node) {
    const offset = 4 * id;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_LINE] = brython_node.lineno;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_COL] = brython_node.col_offset;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_LINE] = brython_node.end_lineno;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_COL] = brython_node.end_col_offset;
}
function set_py_code_from_list(id, brython_node) {
    const offset = 4 * id;
    const beg = brython_node[0];
    const end = brython_node[brython_node.length - 1];
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_LINE] = beg.lineno;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_COL] = beg.col_offset;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_LINE] = end.end_lineno;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_COL] = end.end_col_offset;
}
function set_py_from_beg_end(src, dst_beg, dst_end) {
    const src_offset = 4 * src;
    const beg_offset = 4 * dst_beg;
    const end_offset = 4 * dst_end + 2;
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_LINE] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[beg_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_LINE];
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_BEG_COL] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[beg_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_COL];
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_LINE] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[end_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_LINE];
    dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[src_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_END_COL] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[end_offset + dop__WEBPACK_IMPORTED_MODULE_2__.CODE_COL];
}
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
    for (const name of names)(modules[name] ??= []).push(i);
}
function py2ast(code, filename) {
    const parser = new $B.Parser(code, filename, 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    const nodes = convert_ast(_ast);
    return {
        nodes,
        filename
    };
}
function convert_ast(ast) {
    (0,dop__WEBPACK_IMPORTED_MODULE_2__["default"])();
    convert_body((0,dop__WEBPACK_IMPORTED_MODULE_2__.createASTNode)(), ast.body, new Context());
    return dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES;
/*function count(node: ASTNode) {

        let sum = 1; // count myself
        for(let i = 0; i < node.children.length; ++i )
            sum += count(node.children[i]);
        return sum;
    }
    console.warn( count(result) );*/ }
function getNodeType(brython_node) {
    // likely a body.
    if (Array.isArray(brython_node)) return "Body";
    return brython_node.constructor.$name;
}
function swapASTNodes(a, b) {
    const ao = dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_SIZE * a;
    const bo = dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_SIZE * b;
    let t;
    for(let i = 0; i < dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODE_SIZE; ++i){
        t = dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES[ao + i];
        dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES[ao + i] = dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES[bo + i];
        dop__WEBPACK_IMPORTED_MODULE_2__.ASTNODES[bo + i] = t;
    }
    const ap = 4 * a;
    const bp = 4 * b;
    for(let i = 0; i < 4; ++i){
        t = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[ap + i];
        dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[ap + i] = dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[bp + i];
        dop__WEBPACK_IMPORTED_MODULE_2__.PY_CODE[bp + i] = t;
    }
    t = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[a];
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[a] = dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[b];
    dop__WEBPACK_IMPORTED_MODULE_2__.VALUES[b] = t;
}
const body = modules.Body[0];
function convert_body(id, brython_node, context) {
    _core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST_CONVERT[body](id, brython_node, context);
    set_py_code_from_list(id, brython_node);
}
function convert_node(id, brython_node, context) {
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
    for(let i = 0; i < candidates.length; ++i)if (_core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.AST_CONVERT[candidates[i]](id, brython_node, context) !== false) {
        set_py_code(id, brython_node);
        return;
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
    local_symbols;
    parent_node_context;
    type;
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
                const left = (0,dop__WEBPACK_IMPORTED_MODULE_2__.firstChild)(call) + 1;
                const method = structs_STypes__WEBPACK_IMPORTED_MODULE_1__.STypes[(0,dop__WEBPACK_IMPORTED_MODULE_2__.resultType)(left)][opname];
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
/* harmony import */ var _STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./STypes */ "./src/structs/STypes.ts");
/* harmony import */ var core_modules_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var _Converters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Converters */ "./src/structs/Converters.ts");





// current
// astname => pyname (bname2pyname)
// pyname => r.pyname (BinaryOperators) - adds r except eq/ne/(l/g)(t/e)
// pyname => a.pyname (AssignOperators) - adds "i"
// jsname => pyname (jsop2pyop)
// astname => IDX => Py name (?) [needs py name as it is on its SType...]
// AST Type ID = OP_IDX + CSNTE ?
// reverse/assign/JS_OP_IDX = IDX + CSNTE ?
// remove jsname => pyname (use CSNTE + reuse lists).
// current
// a op b js cmp => b op a js cmp (reverse) [with the operator was reversed]
// js op => priority (JSOperatorsPriority) ! u.- (for unary -)
// use JSOP_IDX => get reversed + priority + jssymb ?
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
*/ function Int2Number(a, target = _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_FLOAT) {
    if ((0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(a) !== _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT) return a;
    if ((0,dop__WEBPACK_IMPORTED_MODULE_3__.type)(a) === core_modules_lists__WEBPACK_IMPORTED_MODULE_2__.LITERALS_INT) {
        // if bigint can't safely convert to JSINT.
        if (target === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_FLOAT) (0,dop__WEBPACK_IMPORTED_MODULE_3__.setResultType)(a, _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_JSINT);
        return a;
    }
    const a_value = dop__WEBPACK_IMPORTED_MODULE_3__.VALUES[a];
    const coffset = (0,dop__WEBPACK_IMPORTED_MODULE_3__.firstChild)(a);
    if (a_value === '__mul__' || a_value === '__rmul__') {
        const ltype = (0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(coffset);
        const rtype = (0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(coffset + 1);
        if ((ltype === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT || ltype === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_JSINT) && (rtype === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT || rtype === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_JSINT)) {
            (0,dop__WEBPACK_IMPORTED_MODULE_3__.setResultType)(a, target);
            return a;
        }
    }
    if (a_value === '__neg__' && (0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(coffset) === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT) {
        (0,dop__WEBPACK_IMPORTED_MODULE_3__.setResultType)(a, target);
        return a;
    }
    if (target === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_FLOAT) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${a})`;
    // int -> jsint cast is facultative...
    return a;
}
function Number2Int(a) {
    if ((0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(a) === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT) return a;
    if ((0,dop__WEBPACK_IMPORTED_MODULE_3__.type)(a) === core_modules_lists__WEBPACK_IMPORTED_MODULE_2__.LITERALS_INT) {
        (0,dop__WEBPACK_IMPORTED_MODULE_3__.setResultType)(a, _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT); // force bigint convertion
        return a;
    }
    if (dop__WEBPACK_IMPORTED_MODULE_3__.VALUES[a] === '__neg__' && (0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)((0,dop__WEBPACK_IMPORTED_MODULE_3__.firstChild)(a)) === _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_JSINT) {
        (0,dop__WEBPACK_IMPORTED_MODULE_3__.setResultType)(a, _STypes__WEBPACK_IMPORTED_MODULE_1__.STYPE_INT);
        return a;
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`BigInt(${a})`;
}
let JSOperatorsPriority = {};
for(let i = 0; i < JSOperators.length; ++i){
    const priority = i;
    for (const op of JSOperators[i])JSOperatorsPriority[op] = priority;
}
function reversed_operator(op) {
    return BinaryOperators[op];
}
const LEFT = 1;
const RIGHT = 2;
function multi_jsop(node, op) {
    const first = (0,dop__WEBPACK_IMPORTED_MODULE_3__.firstChild)(node);
    const nbChildren = (0,dop__WEBPACK_IMPORTED_MODULE_3__.nbChild)(node);
    const prio = JSOperatorsPriority[op];
    const p_prio = JSOperatorsPriority[op];
    (0,dop__WEBPACK_IMPORTED_MODULE_3__.setParentOPPrio)(first, prio);
    for(let i = 1; i < nbChildren; ++i)(0,dop__WEBPACK_IMPORTED_MODULE_3__.setParentOPPrio)(first + i, prio + 1);
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${first}`;
    for(let i = 1; i < nbChildren; ++i)result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${result} && ${first + i}`; //TODO: better...
    if (p_prio < prio) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    return result;
}
// null operation, the node has the same priority as his father.
// 2*int(1+1) => 2*(1+1)
function id_jsop(node, a) {
    (0,dop__WEBPACK_IMPORTED_MODULE_3__.setParentOPPrio)(a, (0,dop__WEBPACK_IMPORTED_MODULE_3__.parentOPPrio)(node));
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}`;
}
function binary_jsop(node, a, op, b) {
    const prio = JSOperatorsPriority[op];
    const p_prio = (0,dop__WEBPACK_IMPORTED_MODULE_3__.parentOPPrio)(node);
    if (typeof a === "number") (0,dop__WEBPACK_IMPORTED_MODULE_3__.setParentOPPrio)(a, prio);
    if (typeof b === "number") (0,dop__WEBPACK_IMPORTED_MODULE_3__.setParentOPPrio)(b, prio);
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
    const p_prio = (0,dop__WEBPACK_IMPORTED_MODULE_3__.parentOPPrio)(node);
    if (typeof a === "number") (0,dop__WEBPACK_IMPORTED_MODULE_3__.setParentOPPrio)(a, prio);
    let cmp = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${op}${a}`;
    // if father has more prio, add parenthesis.
    if (p_prio > prio) cmp = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${cmp})`;
    return cmp;
}
function genUnaryOps(ops, return_type, { convert_self = _Converters__WEBPACK_IMPORTED_MODULE_4__.NOCONVERT, substitute_call } = {}) {
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
function genBinaryOps(ops, return_type, { convert_other = _Converters__WEBPACK_IMPORTED_MODULE_4__.NOCONVERT, convert_self = _Converters__WEBPACK_IMPORTED_MODULE_4__.NOCONVERT, substitute_call } = {}) {
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
        if (convert_self === _Converters__WEBPACK_IMPORTED_MODULE_4__.NOCONVERT && substitute_call === undefined) result[`__i${pyop}__`] = {
            return_type,
            substitute_call: (node, self, other)=>{
                const other_value = dop__WEBPACK_IMPORTED_MODULE_3__.VALUES[other];
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
function genCmpOps(ops, return_type, { convert_other = _Converters__WEBPACK_IMPORTED_MODULE_4__.NOCONVERT, convert_self = _Converters__WEBPACK_IMPORTED_MODULE_4__.NOCONVERT, substitute_call } = {}) {
    let result = {};
    for (const op of ops){
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
                if ((0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(self) === (0,dop__WEBPACK_IMPORTED_MODULE_3__.resultType)(other)) cop = cop + '=';
            }
            return binary_jsop(node, a, cop, b);
        };
        if (substitute_call !== undefined) {
            cs = (node, self, o, _)=>{
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
/* harmony import */ var dop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dop */ "./src/dop.ts");
/* harmony import */ var _BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var _STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./STypes */ "./src/structs/STypes.ts");



const NOCONVERT = (node)=>node;
const CONVERT_INT2FLOAT = _BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number;
const CONVERT_2INT = _BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int;
function generateConvert(convert) {
    const table = new Array();
    for(let i = 0; i < convert.length; i += 2)table[convert[i]] = convert[i + 1];
    return (node)=>{
        const src = (0,dop__WEBPACK_IMPORTED_MODULE_0__.resultType)(node);
        const target = table[src];
        if (target === undefined) return node;
        //TODO: improve:
        if (src === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) return (0,_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(node, target);
        if (target === _STypes__WEBPACK_IMPORTED_MODULE_2__.STYPE_INT) return (0,_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(node);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ3VEO0FBRzVGLE1BQU1RLFNBQVMsSUFBSVAsMkNBQVVBLENBQUMsR0FBRztBQUVqQyxJQUFJUSxPQUFlO0FBRW5CLFNBQVNDLGNBQWNDLEdBQVc7SUFDckNMLHdDQUFPLENBQUNLLE1BQU1OLDBDQUFTQSxDQUFDLEdBQUdHLE1BQU0sQ0FBQ0gsMENBQVNBLENBQUM7SUFDNUNDLHdDQUFPLENBQUNLLE1BQU1SLHlDQUFRQSxDQUFFLEdBQUdNLE9BQVFHLE1BQU0sR0FBR0osTUFBTSxDQUFDTCx5Q0FBUUEsQ0FBQztBQUNoRTtBQUVBLFNBQVNVLFdBQVdDLFFBQWdCO0lBRWhDTCxTQUFVLENBQUMsY0FBYyxFQUFFSyxTQUFTLEVBQUUsQ0FBQztJQUN2Q0wsVUFBVSxDQUFDLGtDQUFrQyxDQUFDO0lBRTlDRCxNQUFNLENBQUNILDBDQUFTQSxDQUFDLEdBQUc7SUFDcEJHLE1BQU0sQ0FBQ0wseUNBQVFBLENBQUMsR0FBR00sT0FBT0csTUFBTTtBQUNwQztBQUlBLElBQUlHLFNBQVM7QUFDYixJQUFJQyxtQkFBbUI7QUFDdkIsc0JBQXNCO0FBRXRCLE1BQU1DLFVBQVU7SUFDWjtJQUNBO0lBQ0FGO0lBQ0FBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0NBQ1g7QUFFTSxNQUFNRyxLQUFLO0lBQ2RDLFVBQVU7UUFFTixFQUFFWCxNQUFNLENBQUNILDBDQUFTQSxDQUFDO1FBQ25CRyxNQUFNLENBQUNMLHlDQUFRQSxDQUFDLEdBQUdNLE9BQU9HLE1BQU0sR0FBRztRQUVuQyxPQUFPLE9BQU9LLE9BQU8sQ0FBQ0QsaUJBQWlCO0lBQzNDO0FBQ0osRUFBQztBQUNNLE1BQU1JLEtBQUs7SUFDZEQsVUFBVTtRQUNOLE9BQU9GLE9BQU8sQ0FBQyxFQUFFRCxpQkFBaUI7SUFDdEM7QUFDSixFQUFDO0FBQ00sTUFBTUssS0FBSztJQUNkRixVQUFVO1FBQ04sT0FBT0YsT0FBTyxDQUFDLEVBQUVELGlCQUFpQjtJQUN0QztBQUNKLEVBQUM7QUFFRCxvQ0FBb0M7QUFDN0IsU0FBU00sRUFBRSxHQUFHQyxJQUFxRDtJQUN0RSxPQUFPQTtBQUNYO0FBRUEsMEJBQTBCO0FBQ25CLFNBQVNDLEdBQUdELElBQXFEO0lBQ3BFLElBQUksT0FBT0EsU0FBUyxVQUNoQixPQUFPRSxFQUFFRjtJQUNiLE9BQU9HLE1BQU1IO0FBQ2pCO0FBR0Esa0NBQWtDO0FBQzNCLFNBQVNHLEdBQUdDLEdBQXlCLEVBQUUsR0FBR0osSUFBMEI7SUFFdkUsSUFBSSxJQUFJSyxJQUFJLEdBQUdBLElBQUlMLEtBQUtYLE1BQU0sRUFBRSxFQUFFZ0IsRUFBRztRQUNqQ25CLFVBQVVrQixHQUFHLENBQUNDLEVBQUU7UUFDaEJILEVBQUVGLElBQUksQ0FBQ0ssRUFBRTtJQUNiO0lBRUFuQixVQUFVa0IsR0FBRyxDQUFDSixLQUFLWCxNQUFNLENBQUM7QUFDOUI7QUFFQSxrQkFBa0I7QUFDWCxTQUFTYSxFQUFFLEdBQUdGLElBQTBCO0lBRTNDLElBQUksSUFBSUssSUFBSSxHQUFHQSxJQUFJTCxLQUFLWCxNQUFNLEVBQUUsRUFBRWdCLEVBQUc7UUFFakMsSUFBSUMsTUFBTU4sSUFBSSxDQUFDSyxFQUFFO1FBRWpCLElBQUlFLE1BQU1DLE9BQU8sQ0FBQ0YsTUFBTztZQUNyQkwsR0FBR0s7WUFDSDtRQUNKO1FBRUEsSUFBSSxPQUFPQSxRQUFRLFVBQVc7WUFFMUIsSUFBSUEsUUFBUUcsV0FDUkgsTUFBTTtZQUNWLElBQUlBLFFBQVEsTUFDUkEsTUFBTTtZQUVWcEIsVUFBVW9CLElBQUlWLFFBQVE7WUFDdEI7UUFDSjtRQUVBLE1BQU1jLFNBQVMsSUFBRUo7UUFFakJuQixjQUFjdUIsU0FBUy9CLHlDQUFRQTtRQUMvQkYsc0RBQU0sQ0FBQ08seUNBQUlBLENBQUNzQixLQUFNLENBQUNBO1FBQ25CbkIsY0FBY3VCLFNBQVM3Qix5Q0FBUUE7SUFDbkM7QUFDSjtBQUVPLFNBQVM4QixPQUFPQyxHQUFRO0lBRTNCdEIsV0FBV3NCLElBQUlyQixRQUFRO0lBRXZCVyxFQUFFO0lBRUYsbUNBQW1DO0lBQ25DaEIsVUFBVSxDQUFDLDRCQUE0QixDQUFDO0lBRXhDLHVCQUF1QjtJQUV2Qjs7Ozs7Ozs7Ozs7TUFXRSxHQUVMLE9BQU9BO0FBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0l1QztBQUNHO0FBRTNCLFNBQVN5QixPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQ0wsc0NBQUVBO0lBRUosTUFBTW1CLFVBQWFILCtDQUFVQSxDQUFDRTtJQUM5QixNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFM0IsSUFBSSxJQUFJVixJQUFJVyxTQUFTWCxJQUFJWSxhQUFXRCxTQUFTLEVBQUVYLEVBQzNDSCx5Q0FBQ0EsQ0FBQ1Asc0NBQUVBLEVBQUVVO0lBRVZILHlDQUFDQSxDQUFDSixzQ0FBRUE7QUFDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDBDO0FBQ0k7QUFDQztBQUVoQyxTQUFTd0IsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS0wsb0RBQUlBO0lBRWpCLE1BQU1ELGFBQWFGLEtBQUsxQixNQUFNO0lBQzlCLE1BQU0yQixVQUFhRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFakMsSUFBSSxJQUFJWixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JnQixvREFBWUEsQ0FBQ2hCLElBQUlXLFNBQVNELElBQUksQ0FBQ1YsRUFBRSxFQUFFbUI7QUFDM0M7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZTO0FBQ2tCO0FBRW5DLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsSUFBSVksT0FBc0I7SUFFMUIsTUFBTUMsT0FBYWYsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQixJQUFJRSxlQUFlLEdBQ2ZVLE9BQU9DLE9BQUs7SUFFaEJ6QiwwQ0FBRSxDQUFDLE1BQU0sRUFBRXVCLHVDQUFNLENBQUNYLEtBQUssQ0FBQyxTQUFTLEVBQUVZLEtBQUssRUFBRSxFQUFFQyxLQUFLLEVBQUVqQyxzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkb0Q7QUFDSjtBQUNhO0FBQ2pCO0FBRTdCLFNBQVMyQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVBLFFBQVFTLGFBQWEsQ0FBQ2xCLEtBQUttQixJQUFJLENBQUMsR0FBR0YsMERBQVVBLENBQUNqQixLQUFLbUIsSUFBSTtJQUN2RFYsVUFBVSxJQUFJTSwyQ0FBT0EsQ0FBQyxTQUFTTjtJQUUvQixJQUFJVCxLQUFLb0IsS0FBSyxDQUFDOUMsTUFBTSxHQUFHLEdBQ3BCLE1BQU0sSUFBSStDLE1BQU07SUFFcEJoQiw0Q0FBT0EsQ0FBQ0csS0FBTU0sOERBQWNBO0lBQzVCLE1BQU1aLGFBQWEsSUFBSUYsS0FBS29CLEtBQUssQ0FBQzlDLE1BQU07SUFDeEMsTUFBTTJCLFVBQWFHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUVqQ2Msb0RBQVlBLENBQUNmLFNBQVNELEtBQUthLElBQUksRUFBRUo7SUFDakMsSUFBSSxJQUFJbkIsSUFBSSxHQUFHQSxJQUFJWSxZQUFhLEVBQUVaLEVBQzlCZ0Isb0RBQVlBLENBQUNoQixJQUFFVyxTQUFTRCxLQUFLb0IsS0FBSyxDQUFDOUIsSUFBRSxFQUFFLEVBQUVtQjtJQUU3Q0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLbUIsSUFBSTtBQUMzQjtBQUVBWixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJTO0FBQ1M7QUFFMUIsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxNQUFNM0IsTUFBT3NDLHVDQUFNLENBQUNYLEtBQUs7SUFFekIsTUFBTXNCLE9BQU94QiwrQ0FBVUEsQ0FBQ0U7SUFDeEIsTUFBTWEsT0FBT1MsT0FBSztJQUVsQmxDLDBDQUFFLENBQUMsUUFBUSxFQUFFZixJQUFJLElBQUksRUFBRWlELEtBQUssRUFBRSxFQUFFVCxLQUFLLEVBQUVqQyxzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hzRDtBQUNOO0FBQ2E7QUFFOUMsU0FBUzJCLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxJQUFJVCxLQUFLd0IsSUFBSSxDQUFDQyxXQUFXLENBQUNDLEtBQUssS0FBSyxVQUFVMUIsS0FBS3dCLElBQUksQ0FBQ0csSUFBSSxDQUFDQyxFQUFFLEtBQUssU0FDaEUsT0FBTztJQUVYLE1BQU1DLFNBQVM3QixLQUFLNkIsTUFBTSxDQUFDRCxFQUFFO0lBQzdCbkIsUUFBUVMsYUFBYSxDQUFDVyxPQUFPLEdBQUcsR0FBRyxNQUFNO0lBRXpDeEIsNENBQU9BLENBQUNHLEtBQUtlLGdFQUFnQkE7SUFDN0IsTUFBTXRCLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBRTlCRixvREFBWUEsQ0FBQ0wsU0FBV0QsS0FBS3dCLElBQUksRUFBRWY7SUFDbkNPLG9EQUFZQSxDQUFDZixVQUFRLEdBQUdELEtBQUthLElBQUksRUFBRUo7SUFFbkNFLHVDQUFNLENBQUNILElBQUksR0FBR3FCO0FBQ2xCO0FBRUF0QixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCUztBQUNrQjtBQUNHO0FBRXRDLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTTNCLE1BQU9zQyx1Q0FBTSxDQUFDWCxLQUFLO0lBRXpCLE1BQU1hLE9BQWFmLCtDQUFVQSxDQUFDRTtJQUM5QixNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFM0IsSUFBSStCLE1BQTJCO0lBQy9CLElBQUlDLE9BQTJCO0lBRS9CLElBQUlDLE1BQU1ILG1FQUFVQSxDQUFDakIsT0FBSztJQUUxQixJQUFJWCxhQUFhLEdBQUc7UUFDaEI2QixNQUFNRTtRQUNOQSxNQUFNSCxtRUFBVUEsQ0FBQ2pCLE9BQUs7SUFDMUI7SUFFQSxJQUFJWCxlQUFlLEdBQ2Y4QixPQUFPRixtRUFBVUEsQ0FBQ2pCLE9BQUs7SUFFM0IsT0FBT3pCLDBDQUFFLENBQUMsUUFBUSxFQUFFZixJQUFJLEdBQUcsRUFBRTBELElBQUksRUFBRSxFQUFFMUQsSUFBSSxHQUFHLEVBQUU0RCxJQUFJLEVBQUUsRUFBRTVELElBQUksSUFBSSxFQUFFMkQsS0FBSyxFQUFFLEVBQUVuQixLQUFLLEVBQUVqQyxzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDekY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjREO0FBQ1o7QUFDYTtBQUNsQjtBQUU1QixTQUFTMkIsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLElBQUlULEtBQUt3QixJQUFJLENBQUNDLFdBQVcsQ0FBQ0MsS0FBSyxLQUFLLFVBQVUxQixLQUFLd0IsSUFBSSxDQUFDRyxJQUFJLENBQUNDLEVBQUUsS0FBSyxTQUNoRSxPQUFPO0lBRVgsTUFBTUMsU0FBUzdCLEtBQUs2QixNQUFNLENBQUNELEVBQUU7SUFDN0JuQixRQUFRUyxhQUFhLENBQUNXLE9BQU8sR0FBRyxHQUFHLE1BQU07SUFDekNwQixRQUFRUyxhQUFhLENBQUNsQixLQUFLb0MsS0FBSyxDQUFDLEdBQUdELHFEQUFTQTtJQUM3Qyw2Q0FBNkM7SUFFN0MsTUFBTWxELE9BQU9lLEtBQUt3QixJQUFJLENBQUN2QyxJQUFJO0lBRTNCb0IsNENBQU9BLENBQUNHLEtBQUswQixzRUFBc0JBO0lBQ25DLE1BQU1oQyxhQUFhakIsS0FBS1gsTUFBTSxHQUFHO0lBQ2pDLE1BQU0yQixVQUFhRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFakNjLG9EQUFZQSxDQUFDZixTQUFTRCxLQUFLYSxJQUFJLEVBQUVKO0lBQ2pDLElBQUksSUFBSW5CLElBQUksR0FBR0EsSUFBSVksWUFBYSxFQUFFWixFQUM5QmdCLG9EQUFZQSxDQUFDaEIsSUFBRVcsU0FBU2hCLElBQUksQ0FBQ0ssSUFBRSxFQUFFLEVBQUVtQjtJQUV2Q0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHcUI7QUFDbEI7QUFFQXRCLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QlM7QUFDVTtBQUUzQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLElBQUlDLFVBQWFILCtDQUFVQSxDQUFDRTtJQUM1QixJQUFJRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFekIsS0FBSztJQUNMWiwwQ0FBRSxDQUFDLEdBQUcsRUFBRWEsVUFBVSxFQUFFLEVBQUVBLFVBQVUsRUFBRXJCLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztJQUV2QyxVQUFVO0lBQ1YsSUFBSVU7SUFDSixJQUFJQSxJQUFJLEdBQUdBLElBQUlZLGFBQWEsR0FBR1osS0FBSyxFQUFHO1FBQ25DRiwwQ0FBRSxDQUFDLFFBQVEsRUFBRWEsVUFBVSxFQUFFLEVBQUVBLFVBQVUsRUFBRXJCLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztJQUNoRDtJQUVBLE9BQU87SUFDUCxJQUFJVSxNQUFNWSxhQUFhLEdBQ25CZCwwQ0FBRSxDQUFDLE1BQU0sRUFBRWEsUUFBUSxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0FBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQjBEO0FBQ2xCO0FBQ3FCO0FBRTlDLFNBQVMyQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsSUFBSTZCLGFBQWE7SUFFakIsSUFBSUMsTUFBTXZDO0lBQ1YsTUFBTyxZQUFZdUMsT0FBT0EsSUFBSUMsTUFBTSxDQUFDbEUsTUFBTSxLQUFLLEVBQUk7UUFFaEQsSUFBSSxDQUFHLFdBQVVpRSxJQUFJQyxNQUFNLENBQUMsRUFBRSxHQUFJO1lBQzlCLEVBQUVGO1lBQ0Y7UUFDSjtRQUNBQyxNQUFNQSxJQUFJQyxNQUFNLENBQUMsRUFBRTtRQUNuQkYsY0FBYztJQUNsQjtJQUVBakMsNENBQU9BLENBQUNHLEtBQUs2QixvRUFBb0JBO0lBQ2pDLElBQUlwQyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSzhCO0lBRTVCLEtBQUs7SUFDTGhDLG9EQUFZQSxDQUFDTCxXQUFXRCxLQUFLeUMsSUFBSSxFQUFFaEM7SUFDbkNPLG9EQUFZQSxDQUFDZixXQUFXRCxLQUFLYSxJQUFJLEVBQUVKO0lBRW5DLFVBQVU7SUFDVjhCLE1BQU12QztJQUNOLE1BQU8sWUFBWXVDLE9BQU9BLElBQUlDLE1BQU0sQ0FBQ2xFLE1BQU0sS0FBSyxFQUFJO1FBRWhELDRCQUE0QjtRQUM1QixJQUFJLENBQUcsV0FBVWlFLElBQUlDLE1BQU0sQ0FBQyxFQUFFLEdBQUk7WUFDOUJsQyxvREFBWUEsQ0FBQ0wsU0FBU3NDLElBQUlDLE1BQU0sRUFBRS9CO1lBQ2xDO1FBQ0o7UUFFQThCLE1BQU1BLElBQUlDLE1BQU0sQ0FBQyxFQUFFO1FBRW5CbEMsb0RBQVlBLENBQUNMLFdBQVdzQyxJQUFJRSxJQUFJLEVBQUVoQztRQUNsQ08sb0RBQVlBLENBQUNmLFdBQVdzQyxJQUFJMUIsSUFBSSxFQUFFSjtRQUVsQzZCLGNBQWM7SUFDbEI7QUFDSjtBQUVBL0IsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDSztBQUNLO0FBRWxCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLENBQUMsRUFBRWEsUUFBUSxHQUFHLEVBQUVBLFVBQVEsRUFBRSxHQUFHLEVBQUVBLFVBQVEsRUFBRSxDQUFDLENBQUM7QUFDbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1IwRDtBQUNTO0FBQ3BCO0FBRWhDLFNBQVNNLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxNQUFNUixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVdELEtBQUt5QyxJQUFJLEVBQUloQztJQUNyQ0gsb0RBQVlBLENBQUNMLFVBQVEsR0FBR0QsS0FBS2EsSUFBSSxFQUFJSixVQUFVLE9BQU87SUFDdERILG9EQUFZQSxDQUFDTCxVQUFRLEdBQUdELEtBQUt3QyxNQUFNLEVBQUUvQixVQUFVLFFBQVE7SUFFdkRKLDRDQUFPQSxDQUFDRyxLQUFNa0Msb0VBQW9CQTtJQUNsQ0Usa0RBQWFBLENBQUNwQyxLQUFLbUMsK0NBQVVBLENBQUMxQyxVQUFRO0FBQzFDO0FBRUFNLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQm9CO0FBQ0Q7QUFFM0IsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxNQUFNQyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFDOUIsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBRTNCWiwwQ0FBRSxDQUFDLEtBQUssRUFBRWEsUUFBUSxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0lBQ3pCUSwwQ0FBRSxDQUFDLGlCQUFpQixFQUFFTixzQ0FBRUEsQ0FBQyxFQUFFRixzQ0FBRUEsQ0FBQyxDQUFDO0lBRTNCTyx5Q0FBQ0EsQ0FBQztJQUVGLElBQUllLGFBQWEsR0FDYmYseUNBQUNBLENBQUUsSUFBRWM7SUFFVCxJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QkgseUNBQUNBLENBQUNQLHNDQUFFQSxFQUFFLFNBQVNVLElBQUlXO0lBRXZCLHFCQUFxQjtJQUNyQixJQUFJRiw0Q0FBT0EsQ0FBQ0UsVUFBVUMsYUFBVyxPQUFPLEdBQ3BDZix5Q0FBQ0EsQ0FBQ1Asc0NBQUVBLEVBQUU7SUFFZE8seUNBQUNBLENBQUNKLHNDQUFFQSxFQUFFSCxzQ0FBRUE7QUFFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekIyRDtBQUNuQjtBQUNxQjtBQUU5QyxTQUFTMkIsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLE1BQU1QLGFBQWFGLEtBQUs4QyxRQUFRLENBQUN4RSxNQUFNLEdBQUM7SUFFeEMrQiw0Q0FBT0EsQ0FBQ0csS0FBS3FDLHFFQUFxQkE7SUFDbEMsTUFBTTVDLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUU5QixXQUFXO0lBQ1hjLG9EQUFZQSxDQUFDZixTQUFTRCxLQUFLYSxJQUFJLEVBQUVKO0lBRWpDLElBQUksSUFBSW5CLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QmdCLG9EQUFZQSxDQUFDaEIsSUFBRVcsU0FBU0QsS0FBSzhDLFFBQVEsQ0FBQ3hELElBQUUsRUFBRSxFQUFFbUI7QUFFcEQ7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CUztBQUNVO0FBRTNCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQiw4QkFBOEI7SUFDOUIsSUFBR0UsZUFBZSxHQUNkLE9BQU9kLDBDQUFFLENBQUMsQ0FBQyxFQUFFYSxRQUFRLEVBQUVyQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7SUFFaENRLDBDQUFFLENBQUMsR0FBRyxFQUFFYSxVQUFRLEVBQUUsRUFBRSxFQUFFQSxRQUFRLEVBQUVyQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JpRTtBQUNqQjtBQUNhO0FBRTlDLFNBQVMyQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsSUFBSVAsYUFBYTtJQUNqQixJQUFJRixLQUFLL0IsSUFBSSxLQUFLeUIsV0FDZFEsYUFBYTtJQUVqQkcsNENBQU9BLENBQUNHLEtBQUt1QywyRUFBMkJBO0lBQ3hDLE1BQU05QyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFOUJjLG9EQUFZQSxDQUFDZixTQUFTRCxLQUFLYSxJQUFJLEVBQUVKO0lBQ2pDLElBQUlQLGVBQWUsR0FDZkksb0RBQVlBLENBQUNMLFVBQVEsR0FBR0QsS0FBSy9CLElBQUksRUFBRXdDO0lBRXZDRSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUttQixJQUFJO0FBQzNCO0FBRUFaLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQnFCO0FBRVQ7QUFHbkMsU0FBU3VDLGFBQWFDLEtBQWU7SUFDbkMsT0FBT0EsTUFBTUMsTUFBTSxDQUFFQyxDQUFBQSxJQUFLQSxFQUFFQyxRQUFRLENBQUMsY0FBZSxrQkFBa0I7QUFDeEU7QUFFQSwwQkFBMEI7QUFDMUIsU0FBU0MsNkJBQTZCQyxLQUFVLEVBQUVDLElBQVksRUFBRUMsR0FBVztJQUV6RSxTQUFTO0lBQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkYsR0FFRSxPQUFPLE1BQU0sb0NBQW9DO0FBQ25EO0FBRU8sU0FBU0Msa0JBQWtCQyxTQUFvQixFQUFFQyxFQUFZO0lBQ2xFLE1BQU0vRCxNQUFNK0QsR0FBR0MsU0FBUyxDQUFDO0lBQ3pCLE9BQU9QLDZCQUE2QnpELElBQUkwRCxLQUFLLEVBQUVJLFNBQVMsQ0FBQyxFQUFFLEVBQUVBLFNBQVMsQ0FBQyxFQUFFO0FBQzNFO0FBSUEsZUFBZTtBQUNSLFNBQVNHLGVBQWVaLEtBQWtCLEVBQUVVLEVBQVk7SUFDN0QsT0FBT1YsTUFBTWEsR0FBRyxDQUFFWCxDQUFBQSxJQUFLTSxrQkFBa0JOLEdBQUdRO0FBQzlDO0FBRUEsbUJBQW1CO0FBQ1osU0FBU0ksWUFBWWQsS0FBVSxFQUFFVSxFQUFZO0lBSWhEVixRQUFRQSxNQUFNZSxLQUFLLENBQUM7SUFFcEIsTUFBTUMsT0FBT2hCLEtBQUssQ0FBQyxFQUFFLEtBQUk7SUFFekIsT0FBT0QsYUFBYUMsT0FBT2EsR0FBRyxDQUFFSSxDQUFBQTtRQUU5QixJQUFJLENBQUNDLEdBQUdDLE9BQU9DLEtBQUssR0FBR0gsRUFBRUYsS0FBSyxDQUFDO1FBRS9CLElBQUlLLElBQUksQ0FBQ0EsS0FBS2hHLE1BQU0sR0FBQyxFQUFFLEtBQUssS0FDMUJnRyxPQUFPQSxLQUFLQyxLQUFLLENBQUMsR0FBRSxDQUFDO1FBRXZCLElBQUlmLE9BQU8sQ0FBQ2EsUUFBUTtRQUNwQixJQUFJWixNQUFPLENBQUNhO1FBRVosRUFBRWIsS0FBSyxjQUFjO1FBRXJCLElBQUllO1FBQ0osSUFBSU4sTUFBTztZQUNULElBQUlPLE1BQU1MLEVBQUVNLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCRixXQUFXSixFQUFFRyxLQUFLLENBQUMsR0FBR0U7WUFDdEIsSUFBSUQsYUFBYSxRQUNmQSxXQUFXO1lBRWIseUJBQXlCO1lBQ3pCLE1BQU0zRSxNQUFNK0QsR0FBR0MsU0FBUyxDQUFDO1lBQ3pCLE1BQU03RCxPQUFPc0QsNkJBQTZCekQsSUFBSTBELEtBQUssRUFBRUMsTUFBTUM7WUFDM0QsSUFBSXhGLHlDQUFJQSxDQUFDK0IsVUFBVWdELHNEQUFNQSxFQUN2QlMsT0FBTzlDLHVDQUFNLENBQUNYLEtBQUssQ0FBQzFCLE1BQU0sRUFBRSxtRUFBbUU7UUFFbkcsT0FBTztZQUNMLElBQUltRyxNQUFNTCxFQUFFTSxPQUFPLENBQUM7WUFDcEJGLFdBQVdKLEVBQUVHLEtBQUssQ0FBQyxHQUFHRTtZQUN0QixJQUFJRCxhQUFhLGFBQ2ZBLFdBQVc7UUFDZjtRQUVBLE9BQU87WUFBQ0E7WUFBVWhCO1lBQU1DO1NBQUk7SUFDOUI7QUFDSjtBQUVBLFNBQVNrQixzQkFBc0JDLEdBQWlCLEVBQUVoQixFQUFZO0lBRTFEaUIsUUFBUUMsSUFBSSxDQUFDLGFBQWFGO0lBRTFCLE1BQU0xQixRQUFRYyxZQUFhLElBQWFlLFNBQVMsQ0FBQzdCLEtBQUssRUFBRVU7SUFDekQsTUFBTUwsUUFBUU8sZUFBZVosT0FBT1U7SUFDcEMsd0JBQXdCO0lBQ3hCLDZCQUE2QjtJQUM3QixNQUFNb0IsWUFBWTlCLE1BQU1hLEdBQUcsQ0FBRSxDQUFDSSxHQUFFN0UsSUFBTSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFNEQsS0FBSyxDQUFDNUQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRW5GLElBQUkyRixnQkFDUixDQUFDO0VBQ0MsRUFBRUQsVUFBVUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQztJQUViTCxRQUFRTSxHQUFHLENBQUNGO0FBQ2hCO0FBRUEsU0FBU0csaUJBQWlCTCxTQUFjLEVBQUVNLFlBQWlCO0lBQ3pELGFBQWE7SUFDYixNQUFNQyxRQUFRUCxxQkFBcUJRLElBQUlDLFdBQVcsR0FDcENULFVBQVVVLGdCQUFnQixHQUUxQixJQUFJQyxJQUFJQyxXQUFXLENBQUNaO0lBRWxDSixzQkFBc0JXLE9BQU9EO0lBRTdCLE9BQU9DO0FBQ1Q7QUFFQSxpRUFBZTtJQUNYWDtJQUNBUztBQUNKLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SDhCO0FBQ0M7QUFFbEIsU0FBU3hGLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLE1BQU0sRUFBRWEsUUFBUSxFQUFFLEVBQUVBLFVBQVEsRUFBRSxFQUFFckIsc0NBQUVBLENBQUMsRUFBRSxDQUFDO0FBQzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSd0Q7QUFDaEI7QUFDcUI7QUFFOUMsU0FBUzJCLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtvRixrRUFBa0JBO0lBQy9CLE1BQU0zRixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVdELEtBQUt5QyxJQUFJLEVBQUVoQztJQUNuQ08sb0RBQVlBLENBQUNmLFVBQVEsR0FBR0QsS0FBS2EsSUFBSSxFQUFFSjtBQUV2QztBQUVBRixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDJCO0FBQ3NDO0FBQ3RCO0FBRXJCO0FBQzRCO0FBRTFELFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQixNQUFNaUcsWUFBWXRGLHVDQUFNLENBQUNYLEtBQUs7SUFFOUIsTUFBTWtHLE9BQU9ELFVBQVVFLFFBQVE7SUFFL0IsSUFBSUMsV0FBV0YsS0FBS0csV0FBVztJQUMvQixJQUFJRCxhQUFhRSxPQUFPQyxpQkFBaUIsRUFDckNILFdBQVdGLEtBQUtNLFVBQVUsR0FBRztJQUVqQyxJQUFJTixLQUFLTyxNQUFNLEtBQUsvRyxhQUFhMEcsYUFBYWxHLGFBQWEsR0FDdkQsRUFBRWtHO0lBRU4sSUFBSSxJQUFJOUcsSUFBSSxHQUFJQSxJQUFJWSxZQUFhLEVBQUVaLEVBQUc7UUFDbEMsSUFBSUEsTUFBTSxHQUNOSCx5Q0FBQ0EsQ0FBQztRQUVOLElBQUlpSCxhQUFhOUcsR0FDYkgseUNBQUNBLENBQUM7UUFFTixNQUFNdUgsU0FBU3BILE1BQU00RyxLQUFLTSxVQUFVLElBQUlsSCxNQUFNWSxhQUFXO1FBQ3pEeUcsVUFBVXJILElBQUlXLFNBQVN5RztJQUMzQjtJQUVBLElBQUlOLFdBQVdsRyxZQUNYZix5Q0FBQ0EsQ0FBQztBQUNWO0FBRUEsU0FBU3dILFVBQVUzRyxJQUFZLEVBQUUwRyxNQUFlO0lBRTVDLE1BQU0vRyxTQUFTLElBQUVLO0lBQ2pCNUIscURBQWFBLENBQUN1QixTQUFTL0IseUNBQVFBO0lBRS9CLE1BQU11RCxPQUFPUix1Q0FBTSxDQUFDWCxLQUFLO0lBQ3pCLE1BQU00RyxVQUFVM0kseUNBQUlBLENBQUMrQjtJQUVyQixJQUFJNEcsWUFBWVosNERBQW1CQSxFQUFHO1FBQ2xDLElBQUlVLFFBQ0F0SCwwQ0FBRSxDQUFDLEdBQUcsRUFBRStCLEtBQUssQ0FBQzthQUVkakMsMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1tQixNQUFNLEtBQUs7SUFDekMsT0FBTyxJQUFJeUYsWUFBWWIsNkRBQW9CQSxFQUFHO1FBQzFDN0csMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1tQixNQUFNLEtBQUs7SUFDckMsT0FBTyxJQUFJcEIsNENBQU9BLENBQUNDLFVBQVUsR0FBSTtRQUU3QixJQUFJNkcsU0FBYy9HLCtDQUFVQSxDQUFDRTtRQUM3QixJQUFJMkMsK0NBQVVBLENBQUNrRSxZQUFZZix1REFBV0EsRUFDbENlLFNBQVMvRSxtRUFBVUEsQ0FBQytFO1FBRXhCM0gsMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1tQixNQUFNLEtBQUswRjtJQUNyQyxPQUFNO1FBQ0YxSCx5Q0FBQ0EsQ0FBQ2dDO0lBQ047SUFFQS9DLHFEQUFhQSxDQUFDdUIsU0FBUzdCLHlDQUFRQTtBQUNuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRWlGO0FBRTdCO0FBQzBGO0FBQ3RGO0FBRXhELG9CQUFvQjtBQUNMLFNBQVN5QztJQUNwQiw2QkFBNkI7SUFDN0I7QUFDSjtBQUVPLE1BQU0rRyx5QkFBeUIsRUFBRTtBQUNqQyxNQUFNdkIsdUJBQXlCLEVBQUU7QUFDakMsTUFBTXdCLHdCQUF5QixFQUFFO0FBQ2pDLE1BQU12QixzQkFBeUIsRUFBRTtBQUNqQyxNQUFNd0IscUJBQXlCLEVBQUU7QUFHeENqSCxRQUFRRyxZQUFZLEdBQUc7QUFFaEIsU0FBUytHLGFBQWFqSCxHQUFXLEVBQUVSLElBQVMsRUFBRWlHLFNBQW1CLEVBQUV4RixPQUFnQjtJQUV0RixNQUFNeUYsT0FBT0QsVUFBVUUsUUFBUTtJQUUvQix3QkFBd0I7SUFDeEIsTUFBTXVCLFFBQVExSCxLQUFLZixJQUFJO0lBQ3ZCLE1BQU0wSSxhQUFhRCxNQUFNRSxNQUFNLEtBQUtsSTtJQUNwQyxNQUFNbUksWUFBYUgsTUFBTUksS0FBSyxLQUFNcEk7SUFDcEMsTUFBTXFJLFdBQWE3QixLQUFLNkIsUUFBUTtJQUNoQyxNQUFNQyxhQUFhOUIsS0FBSzhCLFVBQVU7SUFFbEMsTUFBTUMsYUFBYVAsTUFBTVEsV0FBVyxDQUFDNUosTUFBTSxHQUN4Qm9KLE1BQU16SSxJQUFJLENBQUNYLE1BQU0sR0FDakIsQ0FBQ3FKLGFBQ0RELE1BQU1TLFVBQVUsQ0FBQzdKLE1BQU0sR0FDdkIsQ0FBQ3VKO0lBRXBCeEgsNENBQU9BLENBQUNHLEtBQUt3Ryw4REFBY0E7SUFDM0IsTUFBTS9HLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLeUgsYUFBYSxPQUFPO0lBRWxELE1BQU1HLGVBQWVwSSxLQUFLZixJQUFJLENBQUNvSixRQUFRO0lBQ3ZDLE1BQU1DLFVBQVVaLE1BQU1RLFdBQVc7SUFDakMsTUFBTXpELE1BQVVpRCxNQUFNekksSUFBSTtJQUUxQixVQUFVO0lBQ1YsSUFBSXNKLFVBQVVILGFBQWE5SixNQUFNLEdBQUdnSyxRQUFRaEssTUFBTSxHQUFHbUcsSUFBSW5HLE1BQU07SUFDL0QsSUFBSSxJQUFJZ0IsSUFBSSxHQUFHQSxJQUFJZ0osUUFBUWhLLE1BQU0sRUFBRSxFQUFFZ0IsRUFBSTtRQUNyQ2tKLFlBQVlsSixJQUFJVyxTQUFTcUksT0FBTyxDQUFDaEosRUFBRSxFQUFFOEksWUFBWSxDQUFDOUksSUFBSWlKLFFBQVEsRUFBRWpCLHdCQUF3QjdHO1FBQ3hGQSxRQUFRUyxhQUFhLENBQUNvSCxPQUFPLENBQUNoSixFQUFFLENBQUNDLEdBQUcsQ0FBQyxHQUFHb0QsK0NBQVVBLENBQUNyRCxJQUFFVztJQUN6RDtJQUVBLE1BQU07SUFDTixJQUFJTixTQUFTMkksUUFBUWhLLE1BQU07SUFDekJpSyxXQUFXRCxRQUFRaEssTUFBTTtJQUMzQixJQUFJLElBQUlnQixJQUFJLEdBQUdBLElBQUltRixJQUFJbkcsTUFBTSxFQUFFLEVBQUVnQixFQUFJO1FBRWpDa0osWUFBWTdJLFNBQVNNLFNBQVN3RSxHQUFHLENBQUNuRixFQUFFLEVBQUU4SSxZQUFZLENBQUM5SSxJQUFJaUosUUFBUSxFQUFFZixvQkFBb0IvRztRQUVyRnVILFVBQVUsQ0FBQ3JJLFNBQVMsR0FBRzhFLEdBQUcsQ0FBQ25GLEVBQUUsQ0FBQ0MsR0FBRztJQUNyQztJQUVBMkcsS0FBS00sVUFBVSxHQUFHN0c7SUFFbEIsU0FBUztJQUNULElBQUlnSSxZQUFhO1FBQ2J6QixLQUFLRyxXQUFXLEdBQUdDLE9BQU9DLGlCQUFpQjtRQUUzQ2lDLFlBQVk3SSxTQUFTTSxTQUFTeUgsTUFBTUUsTUFBTSxFQUFFbEksV0FBV3NHLHFCQUFxQnZGO1FBRTVFLEVBQUVkO0lBQ04sT0FBTztRQUVIdUcsS0FBS0csV0FBVyxHQUFHMUc7UUFFbkIsTUFBTThJLGtCQUFrQkMsS0FBS0MsR0FBRyxDQUFDUCxhQUFhOUosTUFBTSxFQUFFbUcsSUFBSW5HLE1BQU07UUFDaEUsTUFBTXNLLGFBQWFSLGFBQWE5SixNQUFNLEdBQUdtRyxJQUFJbkcsTUFBTSxJQUFJMkosZUFBZXRJO1FBRXRFLElBQUk4SSxrQkFBa0IsS0FBS0Esb0JBQW9CLEtBQUtHLFlBQ2hEMUMsS0FBS0csV0FBVyxJQUFJb0M7SUFDNUI7SUFFQSxJQUFJSSxVQUFZM0MsS0FBS0csV0FBVztJQUNoQyxJQUFJd0MsWUFBWXZDLE9BQU9DLGlCQUFpQixFQUNwQ3NDLFVBQVUzQyxLQUFLTSxVQUFVO0lBQzdCLElBQUksSUFBSWxILElBQUlnSixRQUFRaEssTUFBTSxFQUFFZ0IsSUFBSXVKLFNBQVMsRUFBRXZKLEVBQ3ZDeUksUUFBUSxDQUFDcEgsdUNBQU0sQ0FBQ3JCLElBQUlXLFFBQVEsQ0FBQyxHQUFHWDtJQUVwQyxNQUFNMkMsTUFBTWlFLEtBQUtNLFVBQVUsR0FBR3FDO0lBQzlCLElBQUksSUFBSXZKLElBQUksR0FBR0EsSUFBSTJDLEtBQUssRUFBRTNDLEVBQ3RCeUksUUFBUSxDQUFDcEgsdUNBQU0sQ0FBQ3JCLElBQUlXLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFFckMsa0RBQWtEO0lBRWxELFNBQVM7SUFDVCxNQUFNNkksU0FBY3BCLE1BQU1TLFVBQVU7SUFDcEMsTUFBTVksY0FBY3JCLE1BQU1xQixXQUFXO0lBRXJDN0MsS0FBSzhDLE1BQU0sR0FBRzlDLEtBQUtNLFVBQVUsS0FBS3FDLFdBQVdDLE9BQU94SyxNQUFNLEtBQUs7SUFFL0RpSyxVQUFVUSxZQUFZekssTUFBTSxHQUFHd0ssT0FBT3hLLE1BQU07SUFDNUMsSUFBSSxJQUFJZ0IsSUFBSSxHQUFHQSxJQUFJd0osT0FBT3hLLE1BQU0sRUFBRSxFQUFFZ0IsRUFBSTtRQUVwQ2tKLFlBQVk3SSxTQUFTTSxTQUFTNkksTUFBTSxDQUFDeEosRUFBRSxFQUFFeUosV0FBVyxDQUFDekosRUFBRSxFQUFFaUksdUJBQXVCOUc7UUFFaEZzSCxRQUFRLENBQUNlLE1BQU0sQ0FBQ3hKLEVBQUUsQ0FBQ0MsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUUzQixFQUFFSTtJQUNOO0lBRUEsUUFBUTtJQUNSLElBQUlrSSxXQUFZO1FBRVpXLFlBQVk3SSxTQUFTTSxTQUFTeUgsTUFBTUksS0FBSyxFQUFFcEksV0FBV3FHLHNCQUFzQnRGO1FBRTVFeUYsS0FBS08sTUFBTSxHQUFHaUIsTUFBTUksS0FBSyxDQUFDdkksR0FBRztRQUU3QixFQUFFSTtJQUNOO0lBRUEsU0FBUztJQUNUOzs7SUFHQSxHQUVBLFNBQVM7SUFFVGdCLHVDQUFNLENBQUNILElBQUksR0FBR3lGO0lBRWQsSUFBSWdDLGVBQWUsR0FBRztRQUVsQmxCLDJEQUFtQkEsQ0FBQ3ZHLEtBQUtQLFNBQVNBLFVBQVVnSSxhQUFhO0lBRTdELE9BQU87UUFDSCxtQkFBbUI7UUFDbkIsTUFBTXhFLE1BQU16RCxLQUFLaUosVUFBVSxHQUFHLElBQUlqSixLQUFLbUIsSUFBSSxDQUFDN0MsTUFBTSxHQUFHO1FBRXJELE1BQU00SyxZQUFZLElBQUUxSTtRQUNwQjZHLHdDQUFPLENBQUU2QixZQUFZaEMsOENBQWFBLENBQUUsR0FBR0csd0NBQU8sQ0FBRTZCLFlBQVk5Qiw4Q0FBYUEsQ0FBRSxHQUFHcEgsS0FBS21KLE1BQU07UUFDekY5Qix3Q0FBTyxDQUFFNkIsWUFBWWpDLDZDQUFZQSxDQUFHLEdBQUdJLHdDQUFPLENBQUU2QixZQUFZL0IsNkNBQVlBLENBQUcsR0FBRzFEO0lBQ2xGO0FBQ0o7QUFDTyxTQUFTK0UsWUFBWWhJLEdBQVcsRUFBRVIsSUFBUyxFQUFFNkcsTUFBVyxFQUFFNUksSUFBVyxFQUFFd0MsT0FBZ0I7SUFFMUYsTUFBTVUsT0FBT25CLEtBQUtULEdBQUc7SUFFckIsa0NBQWtDO0lBQ2xDLElBQUk2SixjQUFjcEosS0FBS3FKLFVBQVUsRUFBRXpIO0lBRW5DLElBQUlpRixXQUFXbkgsV0FBWTtRQUV2QixNQUFNTyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztRQUM5QkYsb0RBQVlBLENBQUNMLFNBQVM0RyxRQUFRcEc7UUFFOUIsSUFBSTJJLGdCQUFnQjFKLFdBQVk7WUFDNUIwSixjQUFjekcsK0NBQVVBLENBQUMxQztZQUN6QixJQUFHbUosZ0JBQWdCdEQsdURBQVdBLEVBQzFCc0QsY0FBY2pILHFEQUFTQTtRQUMvQjtJQUNKO0lBRUE5Qiw0Q0FBT0EsQ0FBQ0csS0FBS3ZDO0lBQ2IyRSxrREFBYUEsQ0FBQ3BDLEtBQUs0STtJQUVuQnpJLHVDQUFNLENBQUNILElBQUksR0FBR1c7SUFDZFYsUUFBUVMsYUFBYSxDQUFDQyxLQUFLLEdBQUdpSTtJQUU5QnRDLG1EQUFXQSxDQUFDdEcsS0FBS1I7QUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SytCO0FBQzZCO0FBQ0o7QUFHeEQsU0FBU3VKLFVBQVVDLEdBQXdCO0lBRXZDLE1BQU1DLE9BQU9DLE9BQU9ELElBQUksQ0FBQ0Q7SUFDekIsSUFBR0MsS0FBS25MLE1BQU0sS0FBSyxHQUNmLE9BQU87UUFBQyxFQUFFO0tBQUM7SUFFZixNQUFNZSxNQUFNLElBQUlHLE1BQU1pSyxLQUFLbkwsTUFBTSxHQUFDO0lBQ2xDZSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFb0ssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSW5LO0lBQ0osSUFBSUEsSUFBSSxHQUFHQSxJQUFJbUssS0FBS25MLE1BQU0sRUFBRSxFQUFFZ0IsRUFDMUJELEdBQUcsQ0FBQ0MsRUFBRSxHQUFJLENBQUMsRUFBRSxFQUFFbUssSUFBSSxDQUFDbkssRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUU5QkQsR0FBRyxDQUFDQyxFQUFFLEdBQUc7SUFFVCxPQUFPO1FBQUNEO1dBQVFxSyxPQUFPQyxNQUFNLENBQUNIO0tBQUs7QUFDdkM7QUFFQSxTQUFTdEUsS0FBSzBFLElBQVcsRUFBRUMsTUFBSSxJQUFJO0lBRS9CLElBQUdELEtBQUt0TCxNQUFNLEtBQUssR0FDZixPQUFPO1FBQUM7WUFBQztTQUFHO0tBQUM7SUFFakIsTUFBTWUsTUFBTSxJQUFJRyxNQUFNb0ssS0FBS3RMLE1BQU0sR0FBQztJQUNsQ2UsR0FBRyxDQUFDLEVBQUUsR0FBRztJQUNULElBQUlDO0lBQ0osSUFBSUEsSUFBSSxHQUFHQSxJQUFJc0ssS0FBS3RMLE1BQU0sRUFBRSxFQUFFZ0IsRUFDMUJELEdBQUcsQ0FBQ0MsRUFBRSxHQUFHdUs7SUFDYnhLLEdBQUcsQ0FBQ0MsRUFBRSxHQUFHO0lBRVQsT0FBTztRQUFDRDtXQUFRdUs7S0FBSztBQUN6QjtBQUVPLFNBQVNFLGFBQWE5SixJQUFZO0lBRXJDLE1BQU1rRyxPQUFPLHVDQUFPLENBQUNsRyxLQUFLLENBQWNtRyxRQUFRO0lBRWhELE1BQU1sRyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFDOUIsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBRTNCLElBQUkrSixTQUFTN0o7SUFDYixJQUFJLElBQUlaLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QixJQUFJckIseUNBQUlBLENBQUVxQixJQUFJVyxhQUFhcUosc0VBQXNCQSxFQUFFO1FBQy9DUyxTQUFTeks7UUFDVDtJQUNKO0lBRUosSUFBSTBLLFNBQVM5RCxLQUFLRyxXQUFXO0lBQzdCLElBQUkyRCxXQUFXMUQsT0FBT0MsaUJBQWlCLEVBQ25DeUQsU0FBU3RCLEtBQUt1QixHQUFHLENBQUMvRCxLQUFLTSxVQUFVLEVBQUV1RCxTQUFPO0lBRTlDLElBQUlHLFdBQVdGLFNBQU87SUFDdEIsSUFBSTlELEtBQUs4QyxNQUFNLElBQUk5QyxLQUFLRyxXQUFXLEtBQUtDLE9BQU9DLGlCQUFpQixFQUM1RDJELFdBQVdoRSxLQUFLTSxVQUFVLEdBQUM7SUFDL0IsSUFBSS9CLE1BQU0sSUFBSWpGLE1BQU0wSztJQUVwQixNQUFNQyxLQUFpQyxDQUFDO0lBQ3hDLE1BQU0xRCxTQUFpQyxDQUFDO0lBRXhDLElBQUl1QyxTQUFTO0lBRWIsSUFBSTlDLEtBQUs4QyxNQUFNLElBQUk5QyxLQUFLRyxXQUFXLEtBQUtDLE9BQU9DLGlCQUFpQixFQUFHO1FBRS9ELE1BQU02RCxTQUFTMUIsS0FBS0MsR0FBRyxDQUFDb0IsUUFBUTdELEtBQUtNLFVBQVU7UUFFL0MsSUFBSSxJQUFJbEgsSUFBSSxHQUFHQSxJQUFJOEssUUFBUSxFQUFFOUssRUFDekJtRixHQUFHLENBQUNuRixJQUFFLEVBQUUsR0FBR0EsSUFBSVc7UUFFbkIsTUFBTW9LLGFBQWFuRSxLQUFLTSxVQUFVLEdBQUM7UUFDbkMsTUFBTThELFVBQVVQLFNBQVNNO1FBQ3pCLElBQUlDLFlBQVksR0FBSTtZQUVoQix5Q0FBeUM7WUFDekMsZ0NBQWdDO1lBQ2hDLElBQUlqTCxNQUFNLElBQUlHLE1BQU04SyxVQUFVO1lBQzlCLElBQUlqTSxNQUFNLElBQUltQixNQUFNOEssVUFBVTtZQUU5QmpMLEdBQUcsQ0FBQyxFQUFFLEdBQVM7WUFFZmhCLEdBQUcsQ0FBQyxFQUFFLEdBQVNnQjtZQUNmaEIsR0FBRyxDQUFDLEVBQUUsR0FBUzRCLFVBQVVvSztZQUN6QixJQUFJLElBQUkvSyxJQUFJLEdBQUdBLElBQUlnTCxTQUFTLEVBQUVoTCxFQUFHO2dCQUM3QkQsR0FBRyxDQUFDQyxFQUFFLEdBQUk7Z0JBQ1ZqQixHQUFHLENBQUNpQixJQUFFLEVBQUUsR0FBRVcsVUFBVW9LLGFBQWEvSztZQUNyQztZQUVBRCxHQUFHLENBQUNpTCxRQUFRLEdBQUcsS0FBSywwQkFBMEI7UUFDbEQ7SUFDSixPQUFPO1FBRUgsTUFBTUYsU0FBUzFCLEtBQUtDLEdBQUcsQ0FBQ29CLFFBQVFDLFNBQU87UUFFdkMsSUFBSSxJQUFJMUssSUFBSSxHQUFHQSxJQUFJOEssUUFBUSxFQUFFOUssRUFDekJtRixHQUFHLENBQUNuRixJQUFFLEVBQUUsR0FBR0EsSUFBSVc7UUFFbkIsTUFBTStILGFBQWE5QixLQUFLOEIsVUFBVTtRQUNsQyxJQUFJLElBQUkxSSxJQUFJOEssUUFBUTlLLElBQUl5SyxRQUFRLEVBQUV6SyxFQUM5QjZLLEVBQUUsQ0FBRW5DLFVBQVUsQ0FBQzFJLElBQUUsRUFBRSxDQUFFLEdBQUdBLElBQUlXO1FBRWhDK0ksU0FBU29CLFdBQVdMO0lBQ3hCO0lBRUEsSUFBSVEsYUFBYTtJQUVqQixNQUFNeEMsV0FBVzdCLEtBQUs2QixRQUFRO0lBRzlCLElBQUksSUFBSXpJLElBQUl5SyxRQUFRekssSUFBSVksWUFBWSxFQUFFWixFQUFHO1FBRXJDLE1BQU1DLE1BQU9ELElBQUlXO1FBQ2pCLE1BQU1rQixPQUFPUix1Q0FBTSxDQUFDcEIsSUFBSTtRQUN4QixNQUFNbEIsTUFBTzBKLFFBQVEsQ0FBRTVHLEtBQU07UUFFN0IsSUFBSTlDLE9BQU8sR0FBSTtZQUNYb0csR0FBRyxDQUFDcEcsSUFBSSxHQUFHa0I7WUFDWDtRQUNKO1FBRUF5SixTQUFTO1FBRVQsSUFBSTNLLFFBQVEsQ0FBQyxHQUNUOEwsRUFBRSxDQUFDaEosS0FBSyxHQUFHNUI7YUFDVjtZQUNEa0gsTUFBTSxDQUFDdEYsS0FBSyxHQUFHNUI7WUFDZmdMLGFBQWE7UUFDakI7SUFDSjtJQUVBLElBQUlmLE1BQTJCVztJQUMvQiw4QkFBOEI7SUFDOUIsSUFBSUksY0FBYyxDQUFFckUsS0FBSzhDLE1BQU0sRUFBRTtRQUM3QlEsTUFBTS9DO0lBQ1YsT0FBTyxJQUFJOEQsWUFBYTtRQUNwQmYsR0FBRyxDQUFDdEQsS0FBS08sTUFBTSxDQUFFLEdBQUc4QyxVQUFVOUM7SUFDbEM7SUFFQSxJQUFJdUMsUUFDQXZFLEdBQUcsQ0FBQ0EsSUFBSW5HLE1BQU0sR0FBQyxFQUFFLEdBQUdpTCxVQUFVQztTQUM3QjtRQUNELE1BQU0vRSxJQUFJbkcsTUFBTSxHQUFHLEtBQUttRyxHQUFHLENBQUNBLElBQUluRyxNQUFNLEdBQUMsRUFBRSxLQUFLb0IsVUFDMUMsRUFBRStFLElBQUluRyxNQUFNO0lBQ3BCO0lBRUEsT0FBT1UseUNBQUMsQ0FBQyxFQUFFaUIsUUFBUSxDQUFDLEVBQUVpRixLQUFLVCxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVM7QUFDakQ7QUFFZSxTQUFTN0UsT0FBT0ksSUFBWTtJQUN2Q2QsMENBQUVBLENBQUUsdUNBQU8sQ0FBQ2MsS0FBSyxDQUFjbUcsUUFBUSxDQUFDcUUsZUFBZSxDQUFFeEs7QUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Sm9EO0FBQ1c7QUFDaEI7QUFFUDtBQUV6QixTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsTUFBTVUsT0FBT25CLEtBQUsyQixJQUFJLENBQUNDLEVBQUU7SUFDekIsTUFBTStJLFdBQVdsSyxRQUFRUyxhQUFhLENBQUNDLEtBQUs7SUFDNUMsSUFBSXdKLGFBQWFqTCxXQUFZO1FBQ3pCbUYsUUFBUUMsSUFBSSxDQUFDOUU7UUFDYjZFLFFBQVFDLElBQUksQ0FBQ3JFLFFBQVFTLGFBQWE7UUFDbEMsTUFBTSxJQUFJRyxNQUFNLENBQUMsU0FBUyxFQUFFRixLQUFLLFlBQVksQ0FBQztJQUNsRDtJQUVBLE1BQU15SixNQUFNRixrREFBTSxDQUFDQyxTQUFTO0lBQzVCLE1BQU1FLFdBQVcsSUFBSzFFLFFBQVEsQ0FBa0IyRSxXQUFXO0lBRTNEekssNENBQU9BLENBQU9HLEtBQUtpSyw4REFBY0E7SUFDakM3SCxrREFBYUEsQ0FBQ3BDLEtBQUtxSztJQUNuQixJQUFJNUssVUFBVUcsNkNBQVFBLENBQUNJLEtBQUssSUFBSVIsS0FBS2YsSUFBSSxDQUFDWCxNQUFNLEdBQUcwQixLQUFLK0ssUUFBUSxDQUFDek0sTUFBTTtJQUV2RWdDLG9EQUFZQSxDQUFDTCxXQUFXRCxLQUFLMkIsSUFBSSxFQUFFbEI7SUFFbkMsSUFBSSxJQUFJbkIsSUFBSSxHQUFHQSxJQUFJVSxLQUFLZixJQUFJLENBQUNYLE1BQU0sRUFBRSxFQUFFZ0IsRUFDbkNnQixvREFBWUEsQ0FBQ0wsV0FBV0QsS0FBS2YsSUFBSSxDQUFDSyxFQUFFLEVBQUVtQjtJQUMxQyxJQUFJLElBQUluQixJQUFJLEdBQUdBLElBQUlVLEtBQUsrSyxRQUFRLENBQUN6TSxNQUFNLEVBQUUsRUFBRWdCLEVBQ3ZDZ0Isb0RBQVlBLENBQUNMLFdBQVdELEtBQUsrSyxRQUFRLENBQUN6TCxFQUFFLEVBQUVtQjtJQUU5Q0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHb0s7QUFDbEI7QUFFQXJLLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0k7QUFDTTtBQUVsQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBRVcsK0NBQVVBLENBQUNFO0FBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONEQ7QUFDZTtBQUM1QjtBQUVoQyxTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLOEksc0VBQXNCQTtJQUVuQyxNQUFNckosVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFDOUJGLG9EQUFZQSxDQUFFTCxTQUFTRCxLQUFLb0MsS0FBSyxFQUFFM0I7SUFDbkNtQyxrREFBYUEsQ0FBQ3BDLEtBQUttQywrQ0FBVUEsQ0FBQzFDO0lBRTlCVSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUtULEdBQUc7QUFDMUI7QUFFQWdCLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmUztBQUNTO0FBRTFCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTW1CLE9BQU9SLHVDQUFNLENBQUNYLEtBQUs7SUFDekIsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLFNBQVMsRUFBRStCLEtBQUssQ0FBQyxFQUFFbEIsUUFBUSxFQUFFLEVBQUVBLFVBQVEsRUFBRSxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0FBQ3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUNkQ7QUFFVDtBQUNOO0FBQ0k7QUFDQztBQUNpQztBQUVwRiwrREFBK0Q7QUFDL0QseUNBQXlDO0FBQ3pDLFNBQVNxTSxTQUFTekssR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXRELE1BQU15SyxRQUFVdkksK0NBQVVBLENBQUNuQztJQUMzQixNQUFNUCxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QixVQUFVO0lBQ1YsTUFBTTJLLFFBQVVULGtEQUFNLENBQUNRLE1BQU07SUFDN0IsTUFBTWhGLE9BQVVpRixNQUFNaEYsUUFBUTtJQUU5QiwrQ0FBK0M7SUFDL0MxRixVQUFVLElBQUlNLDJDQUFPQSxDQUFDLE9BQU9OO0lBQzdCQSxRQUFRMkssbUJBQW1CLEdBQUc1SyxLQUFLLFVBQVU7SUFFN0Msb0VBQW9FO0lBQ3BFaUgsOERBQVlBLENBQUN4SCxTQUFTRCxNQUFNbUwsT0FBTzFLO0lBQ25DLCtCQUErQjtJQUMvQjs7O3lEQUdxRCxHQUVyRCw4Q0FBOEM7SUFDOUN5RixLQUFLK0UsUUFBUSxHQUFHdkw7SUFDaEIsNkNBQTZDO0lBQzdDd0csS0FBSzRFLFdBQVcsR0FBR3BMO0lBRW5CLE1BQU0ySixhQUFhckosS0FBS3FMLE9BQU8sRUFBRXpKO0lBQ2pDLElBQUl5SCxlQUFlM0osV0FBWTtRQUMzQixJQUFJNEwsa0JBQWtCckssMERBQVVBLENBQUNvSTtRQUNqQyxrQkFBa0I7UUFDbEJuRCxLQUFLNEUsV0FBVyxHQUFHLElBQU1RO0lBQzdCO0lBRUF0SyxvREFBWUEsQ0FBQ2YsVUFBUSxHQUFHRCxLQUFLYSxJQUFJLEVBQUVKO0FBQ3ZDO0FBRWUsU0FBU0YsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLDRDQUE0QztJQUU1QyxNQUFNd0YsWUFBc0I7UUFDeEJzRixVQUFVO1FBQ1ZwRixVQUFVO1lBQ042QixZQUFpQixJQUFJeEksTUFBTVEsS0FBS2YsSUFBSSxDQUFDQSxJQUFJLENBQUNYLE1BQU0sR0FBQzBCLEtBQUtmLElBQUksQ0FBQ2lKLFdBQVcsQ0FBQzVKLE1BQU07WUFDN0V5SixVQUFpQixDQUFDO1lBQ2xCMUIsYUFBaUIsQ0FBQztZQUNsQkcsWUFBaUIsQ0FBQztZQUNsQndDLFFBQWlCO1lBQ2pCaUM7WUFDQUgsYUFBaUI7Z0JBQ2JHLFNBQVN6SyxLQUFLUixNQUFNUyxVQUFVLDRCQUE0QjtnQkFDMUQsT0FBT3dGLFVBQVVFLFFBQVEsQ0FBQzJFLFdBQVc7WUFDekM7WUFDQU4saUJBQWlCVixzREFBWUE7UUFDakM7SUFDSjtJQUVBLE1BQU0wQixVQUFVZCxrREFBTUEsQ0FBQ3BNLE1BQU07SUFDN0JvTSxrREFBTSxDQUFDYyxRQUFRLEdBQUd2RjtJQUVsQixvQkFBb0I7SUFDcEIsMENBQTBDO0lBQzFDeEYsUUFBUVMsYUFBYSxDQUFDbEIsS0FBS21CLElBQUksQ0FBQyxHQUFHcUs7SUFFbkMscUJBQXFCO0lBQ3JCLE1BQU1DLFlBQWN6TCxLQUFLYSxJQUFJLENBQUNiLEtBQUthLElBQUksQ0FBQ3ZDLE1BQU0sR0FBQyxFQUFFLENBQUNtRCxXQUFXLENBQUNDLEtBQUs7SUFDbkUsSUFBSStKLGNBQWMsWUFBWUEsY0FBYyxTQUFVO1FBRWxELE1BQU1DLFlBQVk7WUFDZGpLLGFBQWE7Z0JBQ1RDLE9BQU87WUFDWDtZQUNJeUgsUUFBUW5KLEtBQUsyTCxVQUFVO1lBQzNCQSxZQUFZM0wsS0FBSzJMLFVBQVU7WUFDdkIxQyxZQUFZakosS0FBSzRMLGNBQWM7WUFDbkNBLGdCQUFnQjVMLEtBQUs0TCxjQUFjO1FBQ3ZDO1FBQ0E1TCxLQUFLYSxJQUFJLENBQUNnTCxJQUFJLENBQUVIO0lBQ3BCO0lBRUFyTCw0Q0FBT0EsQ0FBT0csS0FBS3dLLDZEQUFhQTtJQUNoQ3BJLGtEQUFhQSxDQUFDcEMsS0FBS2dMO0lBRW5CN0ssdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLbUIsSUFBSTtBQUMzQjtBQUVBWixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEdLO0FBQ0s7QUFFbEIsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxPQUFPWiwwQ0FBRSxDQUFDLFdBQVcsRUFBRVUsK0NBQVVBLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDYjtBQUNPO0FBRWhDLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtzTCwrREFBZUE7SUFDNUIsTUFBTTdMLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBQzlCRixvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS3lDLElBQUksRUFBRWhDO0FBQ3JDO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0FDWHZCLFNBQVNxTCxPQUFPQyxJQUFhO0lBQ3pCLElBQUlBLE1BQ0E7SUFFSixNQUFNLElBQUkzSyxNQUFNO0FBQ3BCO0FBR0EsaUVBQWU7SUFDWDBLO0FBQ0osQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDVnlCO0FBRVosU0FBU25NLE9BQU93RSxDQUFTO0lBQ3BDakYseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKb0Q7QUFDdEI7QUFHZixTQUFTb0IsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS3lMLDhEQUFjQTtBQUUvQjtBQUVBMUwsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkk7QUFFWixTQUFTZCxPQUFPSSxJQUFZO0lBQ3ZDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0p1RDtBQUN6QjtBQUdmLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMEwsaUVBQWlCQTtBQUVsQztBQUVBM0wsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZRO0FBQ0Y7QUFFZCxTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLE1BQU1vQyxRQUFRekIsdUNBQU0sQ0FBQ1gsS0FBSztJQUUxQmIseUNBQUNBLENBQUNpRCxLQUFLLENBQUMsRUFBRTtJQUVWLElBQUlBLEtBQUssQ0FBQyxFQUFFLEtBQUsxQyxXQUNiUCx5Q0FBQ0EsQ0FBQyxNQUFNaUQsS0FBSyxDQUFDLEVBQUU7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWDJEO0FBQ3JCO0FBR3ZCLFNBQVM3QixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMkwscUVBQXFCQTtJQUVsQ3hMLHVDQUFNLENBQUNILElBQUksR0FBRztRQUFDUixLQUFLbUIsSUFBSTtRQUFFbkIsS0FBS29NLE1BQU07S0FBQztBQUUxQztBQUVBN0wsUUFBUUcsWUFBWSxHQUFHO0lBQUM7Q0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaRDtBQUNtQjtBQUVuQyxTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQztJQUVGLE1BQU1jLFVBQVVILCtDQUFVQSxDQUFDRTtJQUMzQixNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFM0IsSUFBSSxJQUFJVixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFBRztRQUNoQyxJQUFJQSxNQUFNLEdBQ05ILHlDQUFDQSxDQUFDO1FBQ05BLHlDQUFDQSxDQUFDRyxJQUFJVztJQUNWO0lBRUFkLHlDQUFDQSxDQUFDO0lBRUYsTUFBTWlELFFBQVF6Qix1Q0FBTSxDQUFDWCxLQUFLO0lBRTFCLElBQUdvQyxVQUFVLE1BQ1RqRCx5Q0FBQ0EsQ0FBQztTQUVGQywwQ0FBRSxDQUFDLHdCQUF3QixFQUFFZ0QsTUFBTSxFQUFFLENBQUM7QUFDOUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCcUQ7QUFDTDtBQUNEO0FBRWhDLFNBQVM3QixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLNkwsK0RBQWVBO0lBQzVCLE1BQU1uTSxhQUFhRixLQUFLc00sS0FBSyxDQUFDaE8sTUFBTTtJQUNwQyxNQUFNMkIsVUFBYUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRWpDLElBQUksSUFBSVosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLc00sS0FBSyxDQUFDaE4sRUFBRSxFQUFFbUI7SUFFN0NFLHVDQUFNLENBQUNILElBQUksR0FBR1IsS0FBS3VNLE1BQU07QUFDN0I7QUFFQWhNLFFBQVFHLFlBQVksR0FBRztJQUFDO0lBQVU7Q0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQm5CO0FBQ0s7QUFFbEIsU0FBU2QsT0FBT0ksSUFBWTtJQUN2Q1osMENBQUUsQ0FBQywwQkFBMEIsRUFBRVUsK0NBQVVBLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0FBQ3REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMb0Q7QUFDWjtBQUNPO0FBRWhDLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtnTSw4REFBY0E7SUFDM0IsTUFBTXZNLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBQzlCRixvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS3lNLEdBQUcsRUFBRWhNO0FBRXBDO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1poQixNQUFNOEUsb0JBQW9CbkU7SUFFcEJvRSxpQkFBc0I7SUFFL0JoRSxZQUFZZ0UsZ0JBQXFCLENBQUU7UUFDL0IsS0FBSztRQUNMQSxpQkFBaUJWLFNBQVMsR0FBRyxJQUFJO1FBQ2pDLElBQUksQ0FBQ1UsZ0JBQWdCLEdBQUdBO0lBQzVCO0FBQ0o7QUFHQSxpRUFBZTtJQUNYRDtBQUNKLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RpRDtBQUNKO0FBQ1c7QUFDSjtBQUNHO0FBQ0o7QUFDSTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDZTtBQUNKO0FBQ007QUFDSjtBQUNJO0FBQ0o7QUFDRztBQUNKO0FBQ0M7QUFDRTtBQUNKO0FBQ0U7QUFDSjtBQUNVO0FBQ0o7QUFDRTtBQUNKO0FBQ0Q7QUFDSjtBQUNLO0FBQ0o7QUFDSTtBQUNKO0FBQ007QUFDSjtBQUNDO0FBQ007QUFDSjtBQUNtQjtBQUNKO0FBQ2Y7QUFDSjtBQUNJO0FBQ0o7QUFDSztBQUNKO0FBQ0M7QUFDSTtBQUNKO0FBQ1U7QUFDSjtBQUNBO0FBQ0o7QUFDQztBQUNKO0FBQ0s7QUFDSjtBQUNDO0FBQ0M7QUFDSjtBQUNLO0FBQ0o7QUFDWTtBQUNKO0FBQ0o7QUFDSjtBQUNRO0FBQ0o7QUFDTztBQUNKO0FBQ0M7QUFDUztBQUNKO0FBQ0g7QUFDSjtBQUNJO0FBQ0o7QUFDTTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDTjtBQUNKO0FBR3ZDLE1BQU14QyxTQUFTLEVBQUU7QUFDakIsTUFBTWlQLGdCQUFnQixFQUFFO0FBQ3hCLE1BQU1DLGVBQWUsRUFBRTtBQUN2QixNQUFNQyxlQUFlLEVBQUU7QUFDdkIsTUFBTUMsU0FBUyxFQUFFO0FBQ2pCLE1BQU1DLE9BQU8sRUFBRTtBQUNmLE1BQU1DLGtCQUFrQixFQUFFO0FBQzFCLE1BQU1DLG9CQUFvQixFQUFFO0FBQzVCLE1BQU1DLG9CQUFvQixFQUFFO0FBQzVCLE1BQU1DLG1CQUFtQixFQUFFO0FBQzNCLE1BQU1DLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1DLHNCQUFzQixHQUFHO0FBQy9CLE1BQU1DLHFCQUFxQixHQUFHO0FBQzlCLE1BQU1DLHFCQUFxQixHQUFHO0FBQzlCLE1BQU1DLGdCQUFnQixHQUFHO0FBQ3pCLE1BQU1DLGVBQWUsR0FBRztBQUN4QixNQUFNQyxlQUFlLEdBQUc7QUFDeEIsTUFBTUMsaUJBQWlCLEdBQUc7QUFDMUIsTUFBTUMsb0JBQW9CLEdBQUc7QUFDN0IsTUFBTUMsbUNBQW1DLEdBQUc7QUFDNUMsTUFBTUMsZ0JBQWdCLEdBQUc7QUFDekIsTUFBTUMsZ0JBQWdCLEdBQUc7QUFDekIsTUFBTTdHLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1ILGtCQUFrQixHQUFHO0FBQzNCLE1BQU1GLHdCQUF3QixHQUFHO0FBQ2pDLE1BQU1ELG9CQUFvQixHQUFHO0FBQzdCLE1BQU1ELGlCQUFpQixHQUFHO0FBQzFCLE1BQU1ILGtCQUFrQixHQUFHO0FBQzNCLE1BQU1kLGdCQUFnQixHQUFHO0FBQ3pCLE1BQU1QLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1uQix5QkFBeUIsR0FBRztBQUNsQyxNQUFNdEMsaUJBQWlCLEdBQUc7QUFDMUIsTUFBTXBCLHFCQUFxQixHQUFHO0FBQzlCLE1BQU0vQyx3QkFBd0IsR0FBRztBQUNqQyxNQUFNRSw4QkFBOEIsR0FBRztBQUN2QyxNQUFNTCx1QkFBdUIsR0FBRztBQUNoQyxNQUFNTCx1QkFBdUIsR0FBRztBQUNoQyxNQUFNSCx5QkFBeUIsR0FBRztBQUNsQyxNQUFNWCxtQkFBbUIsR0FBRztBQUM1QixNQUFNVCxpQkFBaUIsR0FBRztBQUMxQixNQUFNWCxPQUFPLEdBQUc7QUFJaEIsTUFBTW1ULGNBQThCO0lBQzFDNUcsNkRBQWFBO0lBQ2JFLG9FQUFhQTtJQUNiRSxtRUFBYUE7SUFDYkUsbUVBQWFBO0lBQ2JFLDZEQUFhQTtJQUNiRSw0REFBYUE7SUFDYkUsdUVBQWFBO0lBQ2JFLHlFQUFhQTtJQUNiRSx5RUFBYUE7SUFDYkUsd0VBQWFBO0lBQ2JHLHNFQUFjQTtJQUNkRSxpRUFBY0E7SUFDZEUsMEVBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRSxpRUFBY0E7SUFDZEUsb0VBQWNBO0lBQ2RFLG9FQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEcseUVBQWNBO0lBQ2RFLHdGQUFjQTtJQUNkRSxxRUFBY0E7SUFDZEUscUVBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRyx1RUFBY0E7SUFDZEUsNkVBQWNBO0lBQ2RFLHlFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEUsdUVBQWNBO0lBQ2RHLHFFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEUsOEVBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRSwwRUFBY0E7SUFDZEUsNkVBQWNBO0lBQ2RHLG1GQUFjQTtJQUNkRSw0RUFBY0E7SUFDZEUsNEVBQWNBO0lBQ2RFLDhFQUFjQTtJQUNkRSx3RUFBY0E7SUFDZEUsc0VBQWNBO0lBQ2RFLDREQUFjQTtDQUNkO0FBRU0sTUFBTXJVLFNBQXFCO0lBQ2pDaVAseURBQVFBO0lBQ1JFLGdFQUFRQTtJQUNSRSwrREFBUUE7SUFDUkUsK0RBQVFBO0lBQ1JFLHlEQUFRQTtJQUNSRSx3REFBUUE7SUFDUkUsbUVBQVFBO0lBQ1JFLHFFQUFRQTtJQUNSRSxxRUFBUUE7SUFDUkUsb0VBQVFBO0lBQ1JHLGtFQUFTQTtJQUNURSw2REFBU0E7SUFDVEUsc0VBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURSw2REFBU0E7SUFDVEUsZ0VBQVNBO0lBQ1RFLGdFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEcscUVBQVNBO0lBQ1RFLG9GQUFTQTtJQUNURSxpRUFBU0E7SUFDVEUsaUVBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURyxtRUFBU0E7SUFDVEUseUVBQVNBO0lBQ1RFLHFFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEUsbUVBQVNBO0lBQ1RHLGlFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEUsMEVBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURSxzRUFBU0E7SUFDVEUseUVBQVNBO0lBQ1RHLCtFQUFTQTtJQUNURSx3RUFBU0E7SUFDVEUsd0VBQVNBO0lBQ1RFLDBFQUFTQTtJQUNURSxvRUFBU0E7SUFDVEUsa0VBQVNBO0lBQ1RFLHdEQUFTQTtDQUNUO0FBRUQsTUFBTXVCLFVBQVUsQ0FBQztBQUNqQjdKLE9BQU84SixNQUFNLENBQUNELFNBQVN6RixxRUFBU0E7QUFDaENwRSxPQUFPOEosTUFBTSxDQUFDRCxTQUFTeEUsbUVBQVVBO0FBQ2pDckYsT0FBTzhKLE1BQU0sQ0FBQ0QsU0FBUzdELG1FQUFVQTtBQUNqQ2hHLE9BQU84SixNQUFNLENBQUNELFNBQVNsRCxvRUFBVUE7QUFDakMzRyxPQUFPOEosTUFBTSxDQUFDRCxTQUFTckMsMEVBQVVBO0FBRzFCLE1BQU0zTCxNQUFNZ08sUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JPQTtBQUVaLFNBQVMzVCxPQUFPSSxJQUFZO0lBQ3ZDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKbUQ7QUFDTjtBQUVHO0FBRWpDLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRTBULFFBQWlCO0lBRXJFLElBQUksQ0FBRyxRQUFPMVQsS0FBS29DLEtBQUssS0FBSyxRQUFPLEtBQ3pCLENBQUUsZ0JBQWVwQyxLQUFLb0MsS0FBSyxLQUMzQnBDLEtBQUtvQyxLQUFLLENBQUN1UixTQUFTLENBQUNDLFlBQVksS0FBSyxZQUM3QyxPQUFPO0lBRVh2VCw0Q0FBT0EsQ0FBQ0csS0FBSzZTLDZEQUFhQTtJQUMxQnpRLGtEQUFhQSxDQUFDcEMsS0FBS2lULDBEQUFjQTtBQUNyQztBQUVBbFQsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7O0FDaEJtQjtBQUUxQ21ULHdEQUFRQSxDQUFDLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGSztBQUNFO0FBRWQsU0FBU2pVLE9BQU9JLElBQVk7SUFDdkNiLHlDQUFDQSxDQUFFd0IsdUNBQU0sQ0FBQ1gsS0FBSztBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTG1EO0FBQ0U7QUFFVDtBQUU3QixTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRTBULFFBQWlCO0lBRXJFLElBQUksT0FBTzFULEtBQUtvQyxLQUFLLEtBQUssV0FDdEIsT0FBTztJQUVYL0IsNENBQU9BLENBQUNHLEtBQUs0Uyw2REFBYUE7SUFDMUJ4USxrREFBYUEsQ0FBQ3BDLEtBQUtzVCxzREFBVUE7SUFFN0JuVCx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUtvQyxLQUFLLEVBQUUsaUNBQWlDO0FBQy9EO0FBRUE3QixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQ2hCMEM7QUFDVjtBQUNaO0FBRTNDbVQsd0RBQVFBLENBQUMsUUFBUTtJQUNiLEdBQUdHLGtFQUFTQSxDQUFDRCxnRUFBV0EsRUFBRUUsaUVBQWFBLENBQUM7QUFDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQ007QUFFbEIsU0FBU3JVLE9BQU9JLElBQVk7SUFFdkNiLHlDQUFDQSxDQUFDLE1BQU1XLCtDQUFVQSxDQUFDRSxPQUFPO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOc0U7QUFDOUI7QUFDTztBQUVoQyxTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMlMsZ0ZBQWdDQTtJQUM3QyxNQUFNbFQsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFFOUJGLG9EQUFZQSxDQUFDTCxTQUFTRCxLQUFLb0MsS0FBSyxFQUFFM0I7QUFDdEM7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWm1CO0FBQzRCO0FBQ2tCO0FBQzdDO0FBRTVCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkNiLHlDQUFDQSxDQUFDO0lBRUYsTUFBTWMsVUFBYUgsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQixJQUFJLElBQUlWLElBQUlXLFNBQVNYLElBQUlZLGFBQWFELFNBQVMsRUFBRVgsRUFBRztRQUVoRCxJQUFJcUQsK0NBQVVBLENBQUNyRCxPQUFPNFUscURBQVNBLEVBQUU7WUFFN0IsTUFBTXZVLFNBQVMsSUFBRUw7WUFFakIsb0NBQW9DO1lBQ3BDbEIscURBQWFBLENBQUN1QixTQUFTL0IseUNBQVFBO1lBQy9CdUIseUNBQUNBLENBQUN3Qix1Q0FBTSxDQUFDckIsRUFBRTtZQUNYbEIscURBQWFBLENBQUN1QixTQUFTN0IseUNBQVFBO1lBRS9CO1FBRUo7UUFFQSxJQUFJRyx5Q0FBSUEsQ0FBQ3FCLE9BQU82VCxnRkFBZ0NBLEVBQUU7WUFDOUNoVSx5Q0FBQ0EsQ0FBQ0c7WUFDRjtRQUNKO1FBRUEsTUFBTSxJQUFJK0IsTUFBTTtJQUNwQjtJQUVBbEMseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDdUQ7QUFDQTtBQUNSO0FBQ0o7QUFFNUIsU0FBU29CLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUswUyxpRUFBaUJBO0lBQzlCdFEsa0RBQWFBLENBQUNwQyxLQUFLMFQscURBQVNBO0lBRTVCLE1BQU1oVSxhQUFhRixLQUFLMkosTUFBTSxDQUFDckwsTUFBTTtJQUNyQyxNQUFNMkIsVUFBYUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRWpDLElBQUksSUFBSVosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLMkosTUFBTSxDQUFDckssRUFBRSxFQUFFbUI7QUFDbEQ7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCSTtBQUNFO0FBRWQsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxnRUFBZ0U7SUFDaEViLHlDQUFDQSxDQUFDLENBQUMsRUFBRXdCLHVDQUFNLENBQUNYLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQb0Q7QUFDQztBQUVSO0FBRTlCLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFMFQsUUFBaUI7SUFFckUsSUFBSSxDQUFHMVQsQ0FBQUEsS0FBS29DLEtBQUssWUFBWXNILE1BQUssS0FBTTFKLEtBQUtvQyxLQUFLLENBQUN1UixTQUFTLEVBQUVDLGlCQUFpQixTQUMzRSxPQUFPO0lBRVh2VCw0Q0FBT0EsQ0FBQ0csS0FBS3lTLDhEQUFjQTtJQUMzQnJRLGtEQUFhQSxDQUFDcEMsS0FBSzJULHVEQUFXQTtJQUU5QnhULHVDQUFNLENBQUNILElBQUksR0FBR1IsS0FBS29DLEtBQUssQ0FBQ0EsS0FBSztBQUNsQztBQUVBN0IsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNoQnZCLGlFQUFlO0lBQ1gwVCxXQUFXLENBQUNDO1FBQ1IsSUFBSUEsS0FBSyxRQUFRQSxLQUFLLE1BQU07WUFFeEIsSUFBSWhWLE1BQU1nVixFQUFFQyxhQUFhO1lBQ3pCLE1BQU1DLFdBQVdsVixJQUFJZixNQUFNLEdBQUM7WUFDNUIsSUFBR2UsR0FBRyxDQUFDa1YsU0FBUyxLQUFLLE9BQU9sVixHQUFHLENBQUNrVixTQUFTLEtBQUssS0FDMUNsVixNQUFNQSxJQUFJa0YsS0FBSyxDQUFDLEdBQUVnUSxXQUFTLEtBQUssTUFBTWxWLElBQUlrRixLQUFLLENBQUNnUSxXQUFTO1lBQzdELE9BQU9sVjtRQUNYO1FBRUEsSUFBSUEsTUFBTWdWLEVBQUV4VixRQUFRO1FBQ3BCLElBQUksQ0FBRVEsSUFBSWdFLFFBQVEsQ0FBQyxNQUNmaEUsT0FBTztRQUNYLE9BQU9BO0lBQ1g7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEIwQjtBQUN1QjtBQUNTO0FBQzZDO0FBQ2pEO0FBQ29DO0FBRU47QUFHOUUsTUFBTTBWLG1CQUFtQmxCLHdEQUFRQSxDQUFDLGVBQWU7SUFDcEQxTixVQUFVO1FBQ04sU0FBUztRQUNUMkUsYUFBYStKLDZEQUFTQTtRQUN0QnJLLGlCQUFpQixDQUFDeEs7WUFFZCxNQUFNZ1YsUUFBUWxWLCtDQUFVQSxDQUFDRSxRQUFNO1lBQy9CLE1BQU1pVixhQUFhdFMsK0NBQVVBLENBQUNxUztZQUU5QiwwQkFBMEI7WUFDMUIsSUFBSUMsZUFBZTlTLHFEQUFTQSxFQUN4QixPQUFPdVMsbUVBQVVBLENBQUNNO1lBQ3RCLElBQUlDLGVBQWVkLHVEQUFXQSxJQUFJYyxlQUFlOVMscURBQVNBLEVBQ3RELE9BQU84UztZQUVYLGdCQUFnQjtZQUNoQixJQUFJQSxlQUFlZixxREFBU0EsRUFBRztnQkFFM0IsTUFBTWdCLGNBQWN2VSx1Q0FBTSxDQUFDcVUsTUFBTTtnQkFFakMsSUFBSS9XLHlDQUFJQSxDQUFDK1csV0FBV2pDLDREQUFZQSxFQUFHO29CQUMvQixJQUFJbUMsZ0JBQWdCLFNBQVNBLGdCQUFnQixZQUN6QyxPQUFPO29CQUNYLElBQUlBLGdCQUFnQixVQUFTQSxnQkFBZ0IsYUFDekMsT0FBTztnQkFDZjtnQkFFQSxpQ0FBaUM7Z0JBQ2pDLGdFQUFnRTtnQkFFaEUsK0NBQStDO2dCQUMvQyxPQUFPbFcseUNBQUMsQ0FBQyxXQUFXLEVBQUVnVyxNQUFNLENBQUMsQ0FBQyxFQUFFLDRCQUE0QjtZQUNoRTtZQUVBLE1BQU1HLFFBQVF6SyxrREFBTSxDQUFDdUssV0FBVztZQUNoQyxNQUFNRyxTQUFTRCxPQUFPRTtZQUN0QixJQUFJRCxXQUFXMVYsV0FDWCxNQUFNLElBQUkyQixNQUFNLENBQUMsRUFBRThULE1BQU01SixRQUFRLENBQUMsb0JBQW9CLENBQUM7WUFDM0QsT0FBTzZKLE9BQU81SyxlQUFlLENBQUV4SyxNQUFNZ1Y7UUFDekM7SUFDSjtBQUNKLEdBQUc7QUFFSG5CLHdEQUFRQSxDQUFDLFNBQVM7SUFFZCxhQUFhO0lBQ2JGLFdBQVdvQjtJQUVYTyxTQUFTO1FBQ0x4SyxhQUFhZ0ssMkRBQU9BO1FBQ3BCdEssaUJBQWdCeEssSUFBSTtZQUNoQixPQUFPaEIseUNBQUMsQ0FBQyxjQUFjLEVBQUVnQixLQUFLLENBQUMsQ0FBQztRQUNwQztJQUNKO0lBRUEsR0FBR3dVLHFFQUFZQSxDQUFDO1FBQUM7UUFBTTtRQUFLO1FBQUs7UUFBSztLQUFJLEVBQUVJLGtFQUFjQSxFQUMxQztRQUNJVyxlQUFlWixpRUFBaUJBO0lBQ3BDLEVBQ2Y7SUFDRCxHQUFHSCxxRUFBWUEsQ0FBQztRQUFDO0tBQUssRUFBRUksa0VBQWNBLEVBQ2xDO1FBQ0lXLGVBQWVaLGlFQUFpQkE7UUFDaENuSyxpQkFBZ0J4SyxJQUFJLEVBQUV3VixJQUFJLEVBQUVSLEtBQUs7WUFDN0IsT0FBT2hXLHlDQUFDLENBQUMsbUJBQW1CLEVBQUV3VyxLQUFLLEVBQUUsRUFBRVIsTUFBTSxDQUFDLENBQUM7UUFDbkQ7SUFDSixFQUNIO0lBQ0QsR0FBR1IscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUVJLGtFQUFjQSxFQUNqQztRQUNJVyxlQUFlWixpRUFBaUJBO1FBQ2hDbkssaUJBQWdCeEssSUFBSSxFQUFFd1YsSUFBSSxFQUFFUixLQUFLO1lBQzdCLE9BQU9oVyx5Q0FBQyxDQUFDLGNBQWMsRUFBRXdXLEtBQUssRUFBRSxFQUFFUixNQUFNLENBQUMsQ0FBQztRQUM5QztJQUNKLEVBQ0g7SUFDRCxHQUFHUCxvRUFBV0EsQ0FBQztRQUFDO0tBQU0sRUFBTUksNkRBQVNBLENBQUM7SUFDdEMsR0FBR2Isa0VBQVNBLENBQUdELGdFQUFXQSxFQUFFRSxpRUFBYUEsQ0FBQztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEYrQjtBQUNVO0FBQ0U7QUFFNUIsU0FBU3JVLE9BQU9JLElBQVk7SUFFdkMsSUFBSW9DLFFBQVF6Qix1Q0FBTSxDQUFDWCxLQUFLO0lBRXhCLElBQUkyQywrQ0FBVUEsQ0FBQzNDLFVBQVVtQyxxREFBU0EsRUFBRztRQUNqQyxnRUFBZ0U7UUFDaEVoRCx5Q0FBQ0EsQ0FBQyxDQUFDLEVBQUVpRCxNQUFNLENBQUMsQ0FBQztRQUNiO0lBQ0o7SUFDQSxJQUFJLE9BQU9BLFVBQVUsVUFDakJBLFFBQVFrRSxPQUFPbEUsUUFBUSw0QkFBNEI7SUFFdkQsZ0VBQWdFO0lBQ2hFakQseUNBQUNBLENBQUMsQ0FBQyxFQUFFaUQsTUFBTSxDQUFDO0FBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmtEO0FBQ0c7QUFFRztBQUV6QyxTQUFTN0IsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUUwVCxRQUFpQjtJQUVyRSxJQUFJdFIsUUFBUXBDLEtBQUtvQyxLQUFLO0lBRXRCLElBQUdBLE1BQU11UixTQUFTLEVBQUVDLGlCQUFpQixPQUNqQ3hSLFFBQVFBLE1BQU1BLEtBQUs7SUFFdkIsSUFBSSxPQUFPQSxVQUFVLFlBQVksT0FBT0EsVUFBVSxVQUM5QyxPQUFPO0lBRVgsTUFBTXFULFlBQVksT0FBT3JULFVBQVUsV0FBV0QscURBQVNBLEdBQUcyRCx1REFBV0E7SUFFckV6Riw0Q0FBT0EsQ0FBQ0csS0FBS3dTLDREQUFZQTtJQUN6QnBRLGtEQUFhQSxDQUFDcEMsS0FBS2lWO0lBRW5COVUsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHNEI7QUFDbEI7QUFFQTdCLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJJO0FBQ2tCO0FBQ3lHO0FBQ2pGO0FBQzZDO0FBRWhCO0FBRTNGLE1BQU1zVixpQkFBaUJuQyx3REFBUUEsQ0FBQyxhQUFhO0lBQ2hEMU4sVUFBVTtRQUNOLFNBQVM7UUFDVDJFLGFBQWFnTCwyREFBT0E7UUFDcEJ0TCxpQkFBaUIsQ0FBQ3hLO1lBRWQsTUFBTWdWLFFBQVFsViwrQ0FBVUEsQ0FBQ0UsUUFBUTtZQUNqQyxNQUFNaVYsYUFBWXRTLCtDQUFVQSxDQUFDcVM7WUFFN0IsMEJBQTBCO1lBQzFCLElBQUlDLGVBQWU5UyxxREFBU0EsRUFDeEIsT0FBTzZTO1lBQ1gsSUFBSUMsZUFBZW5QLHVEQUFXQSxFQUMxQixPQUFPaEUsbUVBQVVBLENBQUNrVDtZQUN0QixJQUFJQyxlQUFlZCx1REFBV0EsRUFDMUIsT0FBT25WLHlDQUFDLENBQUMsa0JBQWtCLEVBQUVnVyxNQUFNLEVBQUUsQ0FBQztZQUUxQyxnQkFBZ0I7WUFDaEIsSUFBSUMsZUFBZWYscURBQVNBLEVBQUc7Z0JBRTNCLGlDQUFpQztnQkFDakMsZ0VBQWdFO2dCQUVoRSwrQ0FBK0M7Z0JBQy9DLE9BQU9sVix5Q0FBQyxDQUFDLE9BQU8sRUFBRWdXLE1BQU0sQ0FBQyxDQUFDLEVBQUUsNEJBQTRCO1lBQzVEO1lBRUEsTUFBTUcsUUFBUXpLLGtEQUFNLENBQUN1SyxXQUFXO1lBQ2hDLE1BQU1HLFNBQVNELE9BQU9FO1lBQ3RCLElBQUlELFdBQVcxVixXQUNYLE1BQU0sSUFBSTJCLE1BQU0sQ0FBQyxFQUFFOFQsTUFBTTVKLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztZQUMzRCxPQUFPNkosT0FBTzVLLGVBQWUsQ0FBRXhLLE1BQU1nVjtRQUN6QztJQUNKO0FBQ0osR0FBRztBQUVIbkIsd0RBQVFBLENBQUMsT0FBTztJQUVaLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2JGLFdBQVdxQztJQUVYVixTQUFTO1FBQ0x4SyxhQUFhZ0ssMkRBQU9BO1FBQ3BCdEssaUJBQWdCeEssSUFBSTtZQUNoQixPQUFPaEIseUNBQUMsQ0FBQyxFQUFFZ0IsS0FBSyxXQUFXLENBQUM7UUFDaEM7SUFDSjtJQUVBcVYsU0FBUztRQUNMdkssYUFBYWdMLDJEQUFPQTtRQUNwQnRMLGlCQUFnQnhLLElBQUksRUFBRXdWLElBQUk7WUFDdEIsT0FBT0UsZ0VBQU9BLENBQUMxVixNQUFNd1Y7UUFDekI7SUFDSjtJQUNBLEdBQUcsR0FDSCxHQUFHaEIscUVBQVlBLENBQUM7UUFDUix3REFBd0Q7UUFDeEQ7UUFBTTtRQUFLO1FBQ1g7UUFBSztRQUFLO1FBQUs7UUFBTTtLQUN4QixFQUNEcUIsOERBQVVBLEVBQ1Y7UUFDSU4sZUFBZUssNERBQVlBO0lBQy9CLEVBQ0g7SUFDRCxHQUFHcEIscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUV1QiwrREFBV0EsRUFDOUI7UUFDSXZMLGlCQUFnQnhLLElBQUksRUFBRWlXLENBQUMsRUFBRUMsQ0FBQztZQUV0QixJQUFJdlQsK0NBQVVBLENBQUMzQyxVQUFVbVUsdURBQVdBLEVBQ2hDLHVDQUF1QztZQUN2QyxPQUFPdE8sb0VBQVdBLENBQUM3RixNQUFNMFUsbUVBQVVBLENBQUN1QixJQUFJLEtBQUt2QixtRUFBVUEsQ0FBQ3dCO1lBRTVELE9BQU9yUSxvRUFBV0EsQ0FBQzdGLE1BQU1pVyxHQUFHLEtBQUtDO1FBQ3JDO0lBQ0osRUFDSDtJQUNELEdBQUcxQixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBRUksa0VBQWNBLEVBQ2pDO1FBQ0l1QixjQUFleEIsaUVBQWlCQTtRQUNoQ1ksZUFBZVosaUVBQWlCQTtJQUNwQyxFQUNIO0lBQ0QsR0FBR0gscUVBQVlBLENBQUM7UUFBQztLQUFLLEVBQUVxQiw4REFBVUEsRUFDOUI7UUFDSU4sZUFBaUJLLDREQUFZQTtRQUM3QnBMLGlCQUFpQixDQUFDeEssTUFBY3dWLE1BQWNSO1lBQzFDLE9BQU9oVyx5Q0FBQyxDQUFDLGlCQUFpQixFQUFFd1csS0FBSyxFQUFFLEVBQUVSLE1BQU0sQ0FBQyxDQUFDO1FBQ2pEO0lBQ0osRUFDSDtJQUNELEdBQUdSLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFcUIsOERBQVVBLEVBQzdCO1FBQ0lOLGVBQWVLLDREQUFZQTtRQUMzQnBMLGlCQUFpQixDQUFDeEssTUFBY3dWLE1BQWNSO1lBQzFDLG1CQUFtQjtZQUNuQixPQUFPaFcseUNBQUMsQ0FBQyxZQUFZLEVBQUV3VyxLQUFLLEVBQUUsRUFBRVIsTUFBTSxDQUFDLENBQUM7UUFDNUM7SUFDSixFQUNIO0lBRUQsR0FBR1Asb0VBQVdBLENBQUM7UUFBQztLQUFNLEVBQUVxQiwyREFBT0EsRUFDM0I7UUFDSXRMLGlCQUFpQixDQUFDeEssTUFBTWlXO1lBRXBCLElBQUl0VCwrQ0FBVUEsQ0FBQzNDLFVBQVVtVSx1REFBV0EsRUFDaEMsT0FBT3dCLG1FQUFVQSxDQUFDM1YsTUFBTSxLQUFLMFUsbUVBQVVBLENBQUN1QjtZQUU1QyxPQUFPTixtRUFBVUEsQ0FBQzNWLE1BQU0sS0FBS2lXO1FBQ2pDO0lBQ0osRUFDSDtJQUNELEdBQUd4QixvRUFBV0EsQ0FBRTtRQUFDO0tBQUksRUFBRXFCLDJEQUFPQSxDQUFDO0lBQy9CLEdBQUc5QixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQUVFLGlFQUFhQSxDQUFDO0FBRzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SDJCO0FBQ007QUFDNEc7QUFDeEU7QUFDbUQ7QUFDdEQ7QUFFbEVKLHdEQUFRQSxDQUFDLFNBQVM7SUFFZCxHQUFHVyxxRUFBWUEsQ0FDWCxnRUFBZ0U7SUFDaEU7UUFDSTtRQUFNO1FBQUs7UUFDWDtRQUFLO1FBQUs7UUFBSztRQUFNLEtBQUsscUNBQXFDO0tBQ2xFLEVBQ0RxQiw4REFBVUEsRUFDVjtRQUNJTSxjQUFlUCw0REFBWUE7UUFDM0JMLGVBQWVLLDREQUFZQTtJQUMvQixFQUNIO0lBQ0QsR0FBR3BCLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFcUIsOERBQVVBLEVBQzdCO1FBQ0lyTCxpQkFBaUIsQ0FBQ3hLLE1BQU1pVyxHQUFHQztZQUV2QixJQUFJdlQsK0NBQVVBLENBQUMzQyxVQUFVbVUsdURBQVdBLEVBQ2hDLHVDQUF1QztZQUN2QyxPQUFPdE8sb0VBQVdBLENBQUM3RixNQUFNMFUsbUVBQVVBLENBQUN1QixJQUFJLEtBQUt2QixtRUFBVUEsQ0FBQ3dCO1lBRTVELE9BQU9yUSxvRUFBV0EsQ0FBQzdGLE1BQU04QixtRUFBVUEsQ0FBQ21VLElBQUksS0FBS25VLG1FQUFVQSxDQUFDb1U7UUFDNUQ7SUFDSixFQUNIO0lBQ0QsR0FBRzFCLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFSSxrRUFBY0EsRUFDakM7UUFDSVcsZUFBZVosaUVBQWlCQTtJQUNwQyxFQUNIO0lBQ0QsR0FBR0gscUVBQVlBLENBQUM7UUFBQztLQUFLLEVBQUU2QixtRUFBZUEsRUFDbkM7UUFDSTdMLGlCQUFpQixDQUFDeEssTUFBY3dWLE1BQWNSO1lBQzFDLE9BQU9oVyx5Q0FBQyxDQUFDLG1CQUFtQixFQUFFd1csS0FBSyxFQUFFLEVBQUVSLE1BQU0sQ0FBQyxDQUFDO1FBQ25EO0lBQ0osRUFDSDtJQUNELEdBQUdSLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFNkIsbUVBQWVBLEVBQ2xDO1FBQ0k3TCxpQkFBaUIsQ0FBQ3hLLE1BQWN3VixNQUFjUjtZQUMxQyxtQkFBbUI7WUFDbkIsT0FBT2hXLHlDQUFDLENBQUMsWUFBWSxFQUFFd1csS0FBSyxFQUFFLEVBQUVSLE1BQU0sQ0FBQyxDQUFDO1FBQzVDO0lBQ0osRUFDSDtJQUVELEdBQUdQLG9FQUFXQSxDQUFDO1FBQUM7S0FBTSxFQUFFMkIsNkRBQVNBLEVBQzdCO1FBQ0k1TCxpQkFBaUIsQ0FBQ3hLLE1BQU1pVztZQUVwQixJQUFJdFQsK0NBQVVBLENBQUMzQyxVQUFVbUMscURBQVNBLEVBQzlCLE9BQU93VCxtRUFBVUEsQ0FBQzNWLE1BQU0sS0FBSzhCLG1FQUFVQSxDQUFDbVU7WUFFNUMsT0FBT04sbUVBQVVBLENBQUMzVixNQUFNLEtBQUtpVztRQUNqQztJQUNKLEVBQ0g7SUFDRCxHQUFHeEIsb0VBQVdBLENBQUM7UUFBQztLQUFJLEVBQ2hCcUIsMkRBQU9BLEVBQ1A7UUFDSUssY0FBZVAsNERBQVlBO0lBQy9CLEVBQ0g7SUFDRCxHQUFHNUIsa0VBQVNBLENBQUdELGdFQUFXQSxFQUFFRSxpRUFBYUEsQ0FBQztBQVE5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRTRCO0FBQ0M7QUFFZCxTQUFTclUsT0FBT0ksSUFBWTtJQUN2Q1osMENBQUUsQ0FBQyxDQUFDLEVBQUV1Qix1Q0FBTSxDQUFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMa0Q7QUFDRztBQUVWO0FBRTVCLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFMFQsUUFBaUI7SUFFckUsSUFBSSxPQUFPMVQsS0FBS29DLEtBQUssS0FBSyxVQUN0QixPQUFPO0lBRVgvQiw0Q0FBT0EsQ0FBQ0csS0FBS3VTLDREQUFZQTtJQUN6Qm5RLGtEQUFhQSxDQUFDcEMsS0FBSzBULHFEQUFTQTtJQUU1QnZULHVDQUFNLENBQUNILElBQUksR0FBR1IsS0FBS29DLEtBQUs7QUFDNUI7QUFFQTdCLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJJO0FBQ2tCO0FBQ2lDO0FBQ3ZCO0FBQzBDO0FBRXBDO0FBRXRELE1BQU0rVixpQkFBaUI1Qyx3REFBUUEsQ0FBQyxhQUFhO0lBQ2hEMU4sVUFBVTtRQUNOLFNBQVM7UUFDVDJFLGFBQWFnSywyREFBT0E7UUFDcEJ0SyxpQkFBaUIsQ0FBQ3hLO1lBRWQsTUFBTWdWLFFBQVFsViwrQ0FBVUEsQ0FBQ0UsUUFBTTtZQUMvQixNQUFNaVYsYUFBYXRTLCtDQUFVQSxDQUFDcVM7WUFFOUIsMEJBQTBCO1lBQzFCLElBQUlDLGVBQWVmLHFEQUFTQSxFQUN4QixPQUFPYztZQUVYLE1BQU1JLFNBQVMxSyxrREFBTSxDQUFDdUssV0FBVyxFQUFFSztZQUNuQyxJQUFJRixXQUFXMVYsV0FDWCxNQUFNLElBQUkyQixNQUFNLENBQUMsRUFBRXFKLGtEQUFNLENBQUN1SyxXQUFXLENBQUMxSixRQUFRLENBQUMsb0JBQW9CLENBQUM7WUFDeEUsT0FBTzZKLE9BQU81SyxlQUFlLENBQUV3SztRQUNuQztJQUNKO0FBQ0osR0FBRztBQUVIbkIsd0RBQVFBLENBQUMsT0FBTztJQUVaLGFBQWE7SUFDYkYsV0FBVzhDO0lBRVhDLFNBQVM7UUFDTDVMLGFBQWFnTCwyREFBT0E7UUFDcEJ0TCxpQkFBaUIsQ0FBQ3BHO1lBQ2QsT0FBT3BGLHlDQUFDLENBQUMsRUFBRWMsK0NBQVVBLENBQUNzRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ3pDO0lBQ0o7SUFFQSxHQUFHNFAsa0VBQVNBLENBQUlELGdFQUFXQSxFQUFFd0MsZ0VBQVlBLENBQUM7SUFDMUMsR0FBRy9CLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFRZ0MsK0RBQVdBLENBQUM7SUFDekMsR0FBR2hDLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFROEIsOERBQVVBLEVBQ25DO1FBQ0lmLGVBQWlCWixpRUFBaUJBO1FBQ2xDbkssaUJBQWlCLENBQUN4SyxNQUFjaVcsR0FBV0M7WUFFdkMsSUFBSXZULCtDQUFVQSxDQUFDc1QsT0FBTy9CLHFEQUFTQSxFQUMzQixDQUFDK0IsR0FBRUMsRUFBRSxHQUFHO2dCQUFDQTtnQkFBRUQ7YUFBRTtZQUVqQixPQUFPalgseUNBQUMsQ0FBQyxFQUFFaVgsRUFBRSxRQUFRLEVBQUVDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CO0lBQ0osRUFBRTtBQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEQrQjtBQUN1QjtBQUNEO0FBQ0c7QUFFekMsU0FBU3RXLE9BQU9JLElBQVk7SUFFdkMsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBQzNCLE1BQU1DLFVBQWFILCtDQUFVQSxDQUFDRTtJQUU5QixJQUFJLElBQUlWLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QkYsMENBQUUsQ0FBQyxFQUFFRSxJQUFFVyxRQUFRLEdBQUcsQ0FBQztJQUV2QixJQUFJMFcsU0FBYzFXO0lBQ2xCLElBQUkwQywrQ0FBVUEsQ0FBQzFDLGFBQWE2Rix1REFBV0EsSUFBSW5ELCtDQUFVQSxDQUFDM0MsVUFBVW1DLHFEQUFTQSxFQUNyRXdVLFNBQVM3VSxtRUFBVUEsQ0FBQzdCO0lBRXhCZCx5Q0FBQ0EsQ0FBQ3dYO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQjJEO0FBQ2M7QUFDMUI7QUFDcUI7QUFFckQsU0FBU3BXLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxNQUFNbVcsZ0JBQWdCLGFBQWE1VztJQUNuQyxNQUFNNlcsVUFBVUQsZ0JBQWdCNVcsS0FBSzZXLE9BQU8sR0FBRztRQUFDN1csS0FBSzZCLE1BQU07S0FBQztJQUU1RCxJQUFPcEIsUUFBUXhDLElBQUksS0FBSyxXQUNqQjRZLE9BQU8sQ0FBQyxFQUFFLENBQUNwVixXQUFXLENBQUNDLEtBQUssS0FBSyxVQUNqQyxDQUFFbVYsQ0FBQUEsT0FBTyxDQUFDLEVBQUUsQ0FBQ2pWLEVBQUUsSUFBSW5CLFFBQVFTLGFBQWEsR0FFM0MsT0FBTztJQUVYYiw0Q0FBT0EsQ0FBQ0csS0FBS3NTLDZEQUFhQTtJQUUxQixNQUFNNVMsYUFBYTJXLFFBQVF2WSxNQUFNLEdBQUc7SUFDcEMsTUFBTTJCLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUU5Qkksb0RBQVlBLENBQUNMLFNBQVNELEtBQUtvQyxLQUFLLEVBQUUzQixVQUFVLFFBQVE7SUFDcEQsSUFBSXlLLFFBQVF2SSwrQ0FBVUEsQ0FBQzFDO0lBRXZCLElBQUltSixjQUFjO0lBRWxCLE1BQU1DLGFBQWFySixNQUFNcUosWUFBWXpIO0lBQ3JDLElBQUl5SCxlQUFlM0osV0FDZjBKLGNBQWNuSSwwREFBVUEsQ0FBQ29JO0lBRTdCLElBQUlELGdCQUFnQixRQUFRQSxnQkFBZ0I4QixPQUN4Q3JHLFFBQVFDLElBQUksQ0FBQztJQUVqQixJQUFJc0UsZ0JBQWdCLE1BQU87UUFDdkJBLGNBQWM4QjtRQUNkLElBQUlBLFVBQVVwRix1REFBV0EsRUFDckJzRCxjQUFjakgscURBQVNBLEVBQUUsbUJBQW1CO0lBQzVDLHlCQUF5QjtJQUNqQztJQUVBUyxrREFBYUEsQ0FBQ3BDLEtBQUs0STtJQUVuQixJQUFJLElBQUk5SixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFBRztRQUVoQ2dCLG9EQUFZQSxDQUFDTCxVQUFRWCxHQUFHdVgsT0FBTyxDQUFDdlgsSUFBRSxFQUFFLEVBQUVtQjtRQUN0Q0EsUUFBUVMsYUFBYSxDQUFDMlYsT0FBTyxDQUFDdlgsSUFBRSxFQUFFLENBQUNzQyxFQUFFLENBQUMsR0FBR3dIO0lBRWpEOzs7Ozs7Ozs7Ozs7O0FBYUEsR0FDSTtBQUNKO0FBRUE3SSxRQUFRRyxZQUFZLEdBQUc7SUFBQztJQUFVO0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRWY7QUFDdUI7QUFDRDtBQUNHO0FBRXpDLFNBQVNkLE9BQU9JLElBQVk7SUFFdkNiLHlDQUFDQSxDQUFDO0lBRUYsTUFBTWUsYUFBYUgsNENBQU9BLENBQUNDO0lBQzNCLE1BQU1DLFVBQWFILCtDQUFVQSxDQUFDRTtJQUU5QixJQUFJLElBQUlWLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QkYsMENBQUUsQ0FBQyxFQUFFRSxJQUFFVyxRQUFRLEdBQUcsQ0FBQztJQUV2QixJQUFJMFcsU0FBYzFXO0lBQ2xCLElBQUkwQywrQ0FBVUEsQ0FBQzFDLGFBQWE2Rix1REFBV0EsSUFBSW5ELCtDQUFVQSxDQUFDM0MsVUFBVW1DLHFEQUFTQSxFQUNyRXdVLFNBQVM3VSxtRUFBVUEsQ0FBQzdCO0lBRXhCZCx5Q0FBQ0EsQ0FBQ3dYO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQndEO0FBQ1c7QUFDcEI7QUFDcUI7QUFFckQsU0FBU3BXLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxNQUFNbVcsZ0JBQWdCLGFBQWE1VztJQUNuQyxNQUFNNlcsVUFBVUQsZ0JBQWdCNVcsS0FBSzZXLE9BQU8sR0FBRztRQUFDN1csS0FBSzZCLE1BQU07S0FBQztJQUU1RCxJQUFPcEIsUUFBUXhDLElBQUksS0FBSyxXQUNqQjRZLE9BQU8sQ0FBQyxFQUFFLENBQUNwVixXQUFXLENBQUNDLEtBQUssS0FBSyxVQUNqQ21WLE9BQU8sQ0FBQyxFQUFFLENBQUNqVixFQUFFLElBQUluQixRQUFRUyxhQUFhLEVBRXpDLE9BQU87SUFFWGIsNENBQU9BLENBQUNHLEtBQUtxUyxrRUFBa0JBO0lBQy9CLE1BQU0zUyxhQUFhMlcsUUFBUXZZLE1BQU0sR0FBRztJQUNwQyxNQUFNMkIsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRTlCSSxvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS29DLEtBQUssRUFBRTNCLFVBQVUsUUFBUTtJQUNwRCxJQUFJeUssUUFBUXZJLCtDQUFVQSxDQUFDMUM7SUFFdkIsSUFBSW1KLGNBQWM7SUFFbEIsTUFBTUMsYUFBYXJKLE1BQU1xSixZQUFZekg7SUFDckMsSUFBSXlILGVBQWUzSixXQUNmMEosY0FBY25JLDBEQUFVQSxDQUFDb0k7SUFHN0IsSUFBSUQsZ0JBQWdCLFFBQVFBLGdCQUFnQjhCLE9BQ3BDckcsUUFBUUMsSUFBSSxDQUFDO0lBRXJCLElBQUlzRSxnQkFBZ0IsTUFBTztRQUN2QkEsY0FBYzhCO1FBQ2QsSUFBSUEsVUFBVXBGLHVEQUFXQSxFQUNyQnNELGNBQWNqSCxxREFBU0EsRUFBRSxtQkFBbUI7SUFDNUMseUJBQXlCO0lBQ2pDO0lBRUFTLGtEQUFhQSxDQUFDcEMsS0FBSzRJO0lBRW5CLElBQUksSUFBSTlKLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUFHO1FBQ2hDZ0Isb0RBQVlBLENBQUNMLFVBQVFYLEdBQUd1WCxPQUFPLENBQUN2WCxJQUFFLEVBQUUsRUFBRW1CO1FBQ3RDQSxRQUFRUyxhQUFhLENBQUMyVixPQUFPLENBQUN2WCxJQUFFLEVBQUUsQ0FBQ3NDLEVBQUUsQ0FBQyxHQUFHd0g7SUFDN0M7QUFDSjtBQUVBN0ksUUFBUUcsWUFBWSxHQUFHO0lBQUM7SUFBVTtDQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERsQjtBQUN5QjtBQUNLO0FBRUs7QUFFaEQsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxJQUFJZ1gsS0FBS0Ysb0VBQWUsQ0FBQ25XLHVDQUFNLENBQUNYLEtBQUssQ0FBaUM7SUFFdEUsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCLElBQUkvQixPQUFPOFksaUVBQXFCQTtJQUNoQyxJQUFJM0IsU0FBUzFLLGtEQUFNLENBQUMvSCwrQ0FBVUEsQ0FBQzFDLFNBQVMsRUFBRSxDQUFDK1csR0FBRztJQUU5QyxJQUFJNUIsV0FBVzFWLFdBQ1h6QixPQUFPbVgsT0FBT3RLLFdBQVcsQ0FBQ25JLCtDQUFVQSxDQUFDMUMsVUFBUTtJQUVqRCxnQkFBZ0I7SUFDaEIsSUFBSWhDLFNBQVM4WSxpRUFBcUJBLEVBQUU7UUFDaEMsTUFBTSxJQUFJMVYsTUFBTSxDQUFDLEVBQUVzQiwrQ0FBVUEsQ0FBQzFDLFVBQVEsR0FBRyxDQUFDLEVBQUUrVyxHQUFHLEVBQUUsRUFBRXJVLCtDQUFVQSxDQUFDMUMsU0FBUyxpQkFBaUIsQ0FBQztJQUN6Rjs7Ozs7Ozs7OztRQVVBLEdBQ0o7SUFFQWYsMENBQUVBLENBQUVrVyxPQUFPNUssZUFBZSxDQUFFeEssTUFBTUMsU0FBU0EsVUFBUTtBQUN2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25Dd0Q7QUFDbUI7QUFDNUI7QUFDUTtBQUV4QyxTQUFTTSxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsSUFBSXVXLEtBQUtDLGlFQUFZLENBQUNqWCxLQUFLZ1gsRUFBRSxDQUFDdlYsV0FBVyxDQUFDQyxLQUFLLENBQThCO0lBQzdFLElBQUlzVixPQUFPdFgsV0FBVztRQUNsQm1GLFFBQVFDLElBQUksQ0FBQyxNQUFNOUUsS0FBS2dYLEVBQUUsQ0FBQ3ZWLFdBQVcsQ0FBQ0MsS0FBSztRQUM1QyxNQUFNLElBQUlMLE1BQU07SUFDcEI7SUFDQVYsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHd1c7SUFFZDNXLDRDQUFPQSxDQUFDRyxLQUFLb1Msa0VBQWtCQTtJQUMvQixNQUFNM1MsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFFOUJGLG9EQUFZQSxDQUFDTCxTQUFXRCxLQUFLNkIsTUFBTSxFQUFFcEI7SUFDckNILG9EQUFZQSxDQUFDTCxVQUFRLEdBQUdELEtBQUtvQyxLQUFLLEVBQUczQjtJQUVyQ21DLGtEQUFhQSxDQUFDcEMsS0FBS21DLCtDQUFVQSxDQUFDMUM7QUFDbEM7QUFFQU0sUUFBUUcsWUFBWSxHQUFHO0lBQUM7Q0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QlI7QUFDSztBQUVsQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLE1BQU1DLFVBQVVILCtDQUFVQSxDQUFDRTtJQUUzQlosMENBQUUsQ0FBQyxFQUFFYSxRQUFRLENBQUMsRUFBRUEsVUFBUSxFQUFFLENBQUMsQ0FBQztBQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUnlEO0FBQ2pCO0FBQ087QUFFaEMsU0FBU00sUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS21TLG1FQUFtQkE7SUFDaEMsTUFBTTFTLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBRTlCRixvREFBWUEsQ0FBQ0wsU0FBV0QsS0FBS29DLEtBQUssRUFBRTNCLFVBQ3BDSCxvREFBWUEsQ0FBQ0wsVUFBUSxHQUFHRCxLQUFLdUUsS0FBSyxFQUFFOUQ7QUFDeEM7QUFFQUYsUUFBUUcsWUFBWSxHQUFHO0lBQUM7Q0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiUjtBQUNhO0FBRTFCLFNBQVNkLE9BQU9JLElBQVk7SUFDdkNaLDBDQUFFLENBQUMsRUFBRVUsK0NBQVVBLENBQUNFLE1BQU0sQ0FBQyxFQUFFVyx1Q0FBTSxDQUFDWCxLQUFLLENBQUMsQ0FBQztBQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTG9EO0FBQ0o7QUFDRDtBQUVoQyxTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLa1MsOERBQWNBO0lBQzNCLE1BQU16UyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVNELEtBQUtvQyxLQUFLLEVBQUUzQjtJQUVsQ0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLa1gsSUFBSTtBQUMzQjtBQUVBM1csUUFBUUcsWUFBWSxHQUFHO0lBQUM7Q0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZFI7QUFDeUI7QUFFYjtBQUV6QixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLE1BQU1DLFVBQVVILCtDQUFVQSxDQUFDRTtJQUUzQixNQUFNb1YsU0FBUzFLLGtEQUFNLENBQUMvSCwrQ0FBVUEsQ0FBQzFDLFNBQVMsQ0FBRVUsdUNBQU0sQ0FBQ1gsS0FBSyxDQUFDO0lBQ3pEZCwwQ0FBRUEsQ0FBRWtXLE9BQU81SyxlQUFlLENBQUV4SyxNQUFNQyxTQUFTQSxVQUFRO0FBQ3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1g2RDtBQUVhO0FBQ1g7QUFDVDtBQUNxQjtBQUU1RCxTQUFTTSxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsSUFBSXVXLEtBQUtDLGlFQUFZLENBQUNqWCxLQUFLZ1gsRUFBRSxDQUFDdlYsV0FBVyxDQUFDQyxLQUFLLENBQThCO0lBQzdFLElBQUlzVixPQUFPdFgsV0FBVztRQUNsQm1GLFFBQVFDLElBQUksQ0FBQyxNQUFNOUUsS0FBS2dYLEVBQUUsQ0FBQ3ZWLFdBQVcsQ0FBQ0MsS0FBSztRQUM1QyxNQUFNLElBQUlMLE1BQU07SUFDcEI7SUFFQWhCLDRDQUFPQSxDQUFDRyxLQUFLaVMsZ0VBQWdCQTtJQUU3QixNQUFNeFMsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFDOUJGLG9EQUFZQSxDQUFDTCxTQUFXRCxLQUFLcVgsSUFBSSxFQUFHNVcsVUFBVSxPQUFPO0lBQ3JESCxvREFBWUEsQ0FBQ0wsVUFBUSxHQUFHRCxLQUFLc1gsS0FBSyxFQUFFN1csVUFBVSxRQUFRO0lBRXRELE1BQU04VyxRQUFRNVUsK0NBQVVBLENBQUMxQztJQUN6QixNQUFNaUwsUUFBUXZJLCtDQUFVQSxDQUFDMUMsVUFBUTtJQUVqQyxJQUFJaEMsT0FBTzhZLGlFQUFxQkE7SUFDaEMsSUFBSTNCLFNBQVMxSyxrREFBTSxDQUFDNk0sTUFBTSxFQUFFLENBQUNQLEdBQUc7SUFFaEMsSUFBSTVCLFdBQVcxVixXQUNYekIsT0FBT21YLE9BQU90SyxXQUFXLENBQUNJO0lBRTlCLHdCQUF3QjtJQUN4QixJQUFJak4sU0FBUzhZLGlFQUFxQkEsRUFBRTtRQUNoQ0MsS0FBU0ksMEVBQWlCQSxDQUFDSjtRQUMzQjVCLFNBQVMxSyxrREFBTSxDQUFDUSxNQUFNLEVBQUUsQ0FBQzhMLEdBQUc7UUFDNUIsSUFBSTVCLFdBQVcxVixXQUNYekIsT0FBU21YLE9BQU90SyxXQUFXLENBQUN5TTtRQUVoQyxJQUFJdFosU0FBUzhZLGlFQUFxQkEsRUFDOUIsTUFBTSxJQUFJMVYsTUFBTSxDQUFDLEVBQUU2SixNQUFNLENBQUMsRUFBRThMLEdBQUcsQ0FBQyxFQUFFTyxNQUFNLGlCQUFpQixDQUFDO1FBRTlESixvREFBWUEsQ0FBQ2xYLFNBQVNBLFVBQVEsSUFBSSxpQ0FBaUM7SUFDdkU7SUFFQVUsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHd1c7SUFFZHBVLGtEQUFhQSxDQUFDcEMsS0FBS3ZDO0FBQ3ZCO0FBRUFzQyxRQUFRRyxZQUFZLEdBQUc7SUFBQztDQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNoRGhDLGlFQUFlO0lBQ1g4VyxnQkFBZ0IsQ0FBQ3ZCLEdBQVdDO1FBQ3hCLE9BQU94TixLQUFLK08sS0FBSyxDQUFFeEIsSUFBRUM7SUFDekI7SUFDQXdCLGNBQWMsQ0FBQ3pCLEdBQVdDO1FBRXRCLElBQUl5QixTQUFTMUIsSUFBRUM7UUFDZixJQUFJeUIsU0FBUyxLQUFLMUIsSUFBRUMsTUFBTSxFQUFFLEVBQ3hCLE9BQU95QjtRQUVYLE9BQU8sRUFBRUE7SUFDYjtJQUNBQyxXQUFXLENBQUkzQixHQUFXQztRQUV0QixNQUFNMkIsTUFBTSxDQUFDNUIsSUFBSUMsSUFBSUEsQ0FBQUEsSUFBS0E7UUFDMUIsSUFBSTJCLFFBQVEsS0FBSzNCLElBQUksR0FDakIsT0FBTyxDQUFDO1FBQ1osT0FBTzJCO0lBQ1g7SUFDQUMsU0FBUyxDQUFJN0IsR0FBV0M7UUFFcEIsT0FBTyxDQUFDRCxJQUFJQyxJQUFJQSxDQUFBQSxJQUFLQTtJQUN6QjtBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCMkI7QUFDQztBQUN3QjtBQUV0QyxTQUFTdFcsT0FBT0ksSUFBWTtJQUN2Q2QsMENBQUVBLENBQUU2WSxtRUFBVUEsQ0FBQy9YLE1BQU1XLHVDQUFNLENBQUNYLEtBQUs7QUFDckM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ051RDtBQUNvQjtBQUM1QjtBQUUvQyxNQUFNZ1ksYUFBYTtJQUNmLE9BQU87SUFDUCxNQUFPO0FBQ1g7QUFFZSxTQUFTelgsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS2dTLGlFQUFpQkE7SUFDOUIsTUFBTXRTLGFBQWFGLEtBQUsySixNQUFNLENBQUNyTCxNQUFNO0lBQ3JDLE1BQU0yQixVQUFhRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFakMsSUFBSSxJQUFJWixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JnQixvREFBWUEsQ0FBQ2hCLElBQUlXLFNBQVNELEtBQUsySixNQUFNLENBQUNySyxFQUFFLEVBQUVtQjtJQUU5Q21DLGtEQUFhQSxDQUFDcEMsS0FBS21DLCtDQUFVQSxDQUFDMUM7SUFFOUJVLHVDQUFNLENBQUNILElBQUksR0FBR3dYLFVBQVUsQ0FBQ2hZLEtBQUtnWCxFQUFFLENBQUN2VixXQUFXLENBQUNDLEtBQUssQ0FBNEI7QUFDbEY7QUFFQW5CLFFBQVFHLFlBQVksR0FBRztJQUFDO0NBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkY7QUFDc0I7QUFDb0I7QUFFVjtBQUcvRCxTQUFTdVgseUJBQXlCalksSUFBWSxFQUFFcVgsSUFBVyxFQUFFTCxFQUFVLEVBQUVNLEtBQWE7SUFFbEYsSUFBSVksV0FBVztJQUNmLE1BQU1oTixRQUFRdkksK0NBQVVBLENBQUMyVTtJQUN6QixNQUFNQyxRQUFRNVUsK0NBQVVBLENBQUMwVTtJQUV6QixJQUFJcFosT0FBTzhZLGlFQUFxQkE7SUFDaEMsSUFBSTNCLFNBQVMxSyxrREFBTSxDQUFDNk0sTUFBTSxFQUFFLENBQUNQLEdBQUc7SUFDaEMsSUFBSTVCLFdBQVcxVixXQUNYekIsT0FBT21YLE9BQU90SyxXQUFXLENBQUNJO0lBRTlCLElBQUlqTixTQUFTOFksaUVBQXFCQSxFQUFFO1FBRWhDQyxLQUFTSSwwRUFBaUJBLENBQUNKO1FBQzNCNUIsU0FBUzFLLGtEQUFNLENBQUNRLE1BQU0sRUFBRSxDQUFDOEwsR0FBRztRQUM1QixJQUFJNUIsV0FBVzFWLFdBQ1h6QixPQUFTbVgsT0FBT3RLLFdBQVcsQ0FBQ3lNO1FBRWhDLElBQUl0WixTQUFTOFksaUVBQXFCQSxFQUFFO1lBQ2hDLElBQUlDLE9BQU8sWUFBWUEsT0FBTyxVQUMxQixNQUFNLElBQUkzVixNQUFNLENBQUMsRUFBRWtXLE1BQU0sQ0FBQyxFQUFFUCxHQUFHLENBQUMsRUFBRTlMLE1BQU0saUJBQWlCLENBQUM7WUFFOUQsTUFBTWlOLE9BQU9uQixPQUFPLFdBQVcsUUFBUTtZQUV2QyxPQUFPblIsb0VBQVdBLENBQUM3RixNQUFNcVgsTUFBTWMsTUFBTWI7UUFDekM7UUFFQVksV0FBVztRQUNYLENBQUNiLE1BQU1DLE1BQU0sR0FBRztZQUFDQTtZQUFPRDtTQUFLO0lBQ2pDO0lBRUEsT0FBT2pDLE9BQU81SyxlQUFlLENBQUV4SyxNQUFNcVgsTUFBTUMsT0FBT1k7QUFDdEQ7QUFFZSxTQUFTdFksT0FBT0ksSUFBWTtJQUV2QyxNQUFNb0MsUUFBUXpCLHVDQUFNLENBQUNYLEtBQUs7SUFFMUIsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBRTlCLElBQUksSUFBSVYsSUFBSSxHQUFHQSxJQUFJOEMsTUFBTTlELE1BQU0sRUFBRSxFQUFFZ0IsRUFBRztRQUNsQyxJQUFJQSxNQUFNLEdBQ05ILHlDQUFDQSxDQUFDO1FBRU4sTUFBTTZYLEtBQVE1VSxLQUFLLENBQUM5QyxFQUFFO1FBQ3RCLE1BQU0rWCxPQUFRL1gsSUFBRVc7UUFDaEIsTUFBTXFYLFFBQVFoWSxJQUFFLElBQUVXO1FBRWxCLElBQUkrVyxPQUFPLE1BQU87WUFDZDlYLDBDQUFFQSxDQUFFMkcsb0VBQVdBLENBQUM3RixNQUFNcVgsTUFBTSxPQUFPQztZQUNuQztRQUNKO1FBQ0EsSUFBSU4sT0FBTyxVQUFXO1lBQ2xCOVgsMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1xWCxNQUFNLE9BQU9DO1lBQ25DO1FBQ0o7UUFFQXBZLDBDQUFFQSxDQUFFK1kseUJBQXlCalksTUFBTXFYLE1BQU1MLElBQUlNO0lBQ2pEO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEV1RDtBQUNRO0FBQ2hCO0FBQ1E7QUFDWDtBQUU3QixTQUFTL1csUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLE1BQU0yWCxNQUFNcFksS0FBS29ZLEdBQUcsQ0FBQ3JVLEdBQUcsQ0FBRSxDQUFDWDtRQUN2QixNQUFNNFQsS0FBS0MsaUVBQVksQ0FBQzdULEVBQUUzQixXQUFXLENBQUNDLEtBQUssQ0FBOEI7UUFDekUsSUFBSXNWLE9BQU90WCxXQUNQLE1BQU0sSUFBSTJCLE1BQU0sQ0FBQyxFQUFFK0IsRUFBRTNCLFdBQVcsQ0FBQ0MsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1FBQzdELE9BQU9zVjtJQUNYO0lBQ0FyVyx1Q0FBTSxDQUFDSCxJQUFJLEdBQUc0WDtJQUVkL1gsNENBQU9BLENBQUNHLEtBQUsrUixpRUFBaUJBO0lBQzlCM1Asa0RBQWFBLENBQUNwQyxLQUFLc1Qsc0RBQVVBO0lBQzdCLE1BQU01VCxhQUFhRixLQUFLcVksV0FBVyxDQUFDL1osTUFBTSxHQUFHO0lBQzdDLE1BQU0yQixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFOUJJLG9EQUFZQSxDQUFDTCxTQUFTRCxLQUFLcVgsSUFBSSxFQUFFNVc7SUFDakMsSUFBSSxJQUFJbkIsSUFBSSxHQUFJQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzlCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLcVksV0FBVyxDQUFDL1ksSUFBRSxFQUFFLEVBQUVtQjtBQUN6RDtBQUVBRixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQks7QUFDeUI7QUFDWTtBQUVaO0FBR3RDLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTXFYLE9BQVF2WCwrQ0FBVUEsQ0FBQ0U7SUFDekIsTUFBTW9DLFFBQVF6Qix1Q0FBTSxDQUFDWCxLQUFLO0lBRTFCLElBQUlvQyxVQUFVLE9BQ1YsT0FBT2xELDBDQUFFQSxDQUFFeVcsbUVBQVVBLENBQUMzVixNQUFNLEtBQUswVSxtRUFBVUEsQ0FBQzJDLE1BQU12Uix1REFBV0E7SUFFakUsTUFBTXNQLFNBQVMxSyxrREFBTSxDQUFDL0gsK0NBQVVBLENBQUMwVSxNQUFPLENBQUNqVixNQUFNO0lBRS9DbEQsMENBQUVBLENBQUVrVyxPQUFPNUssZUFBZSxDQUFFeEssTUFBTXFYO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCK0M7QUFFUTtBQUNvQjtBQUN0QjtBQUNzQjtBQUU1RCxTQUFTOVcsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBSzhSLCtEQUFlQTtJQUM1QixNQUFNclMsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFFOUJGLG9EQUFZQSxDQUFDTCxTQUFTRCxLQUFLc1ksT0FBTyxFQUFHN1g7SUFFckMsSUFBSXVXLEtBQUtDLGlFQUFZLENBQUNqWCxLQUFLZ1gsRUFBRSxDQUFDdlYsV0FBVyxDQUFDQyxLQUFLLENBQThCO0lBRTdFLElBQUlzVixPQUFPdFgsV0FBVztRQUNsQm1GLFFBQVFDLElBQUksQ0FBQyxNQUFNOUUsS0FBS2dYLEVBQUUsQ0FBQ3ZWLFdBQVcsQ0FBQ0MsS0FBSztRQUM1QyxNQUFNLElBQUlMLE1BQU07SUFDcEI7SUFFQVYsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHd1c7SUFFZCxJQUFJQSxPQUFPLE9BQU87UUFFZHBVLGtEQUFhQSxDQUFDcEMsS0FBS3NULHNEQUFVQTtRQUM3QjtJQUNKO0lBRUEsSUFBSTdWLE9BQU84WSxpRUFBcUJBO0lBQ2hDLElBQUkzQixTQUFTMUssa0RBQU0sQ0FBQy9ILCtDQUFVQSxDQUFDMUMsU0FBUyxFQUFFLENBQUMrVyxHQUFHO0lBRTlDLElBQUk1QixXQUFXMVYsV0FDWHpCLE9BQU9tWCxPQUFPdEssV0FBVztJQUU3QixJQUFJN00sU0FBUzhZLGlFQUFxQkEsRUFDOUIsTUFBTSxJQUFJMVYsTUFBTSxDQUFDLEVBQUUyVixHQUFHLENBQUMsRUFBRXJVLCtDQUFVQSxDQUFDMUMsU0FBUyxpQkFBaUIsQ0FBQztJQUVuRTJDLGtEQUFhQSxDQUFDcEMsS0FBS3ZDO0FBQ3ZCO0FBRUFzQyxRQUFRRyxZQUFZLEdBQUc7SUFBQztDQUFVOzs7Ozs7Ozs7Ozs7Ozs7O0FDekNQO0FBRVosU0FBU2QsT0FBT0ksSUFBWTtJQUN2Q2IseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKMEM7QUFDWjtBQUdmLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRTBULFFBQWlCO0lBQ3JFclQsNENBQU9BLENBQUNHLEtBQUs2UixvREFBSUE7QUFDckI7QUFHQTlSLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUUTtBQUNFO0FBRWxCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCLElBQUlDLFlBQVksR0FDWixPQUFPZCx5Q0FBQ0EsQ0FBQztJQUViLE9BQU9DLDBDQUFFLENBQUMsT0FBTyxFQUFFYSxRQUFRLENBQUM7QUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYNEM7QUFDdUI7QUFDcEI7QUFFUztBQUV6QyxTQUFTTSxRQUFRQyxHQUFVLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFbkUsOEJBQThCO0lBQzlCLElBQUkySSxjQUFjcUssMERBQWNBO0lBRWhDLElBQUd6VCxLQUFLb0MsS0FBSyxLQUFLMUMsV0FBVztRQUN6QixNQUFNTyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztRQUM5QkYsb0RBQVlBLENBQUNMLFNBQVNELEtBQUtvQyxLQUFLLEVBQUUzQjtRQUNsQzJJLGNBQWN6RywrQ0FBVUEsQ0FBQzFDO0lBQzdCO0lBRUFJLDRDQUFPQSxDQUFDRyxLQUFLNFIsc0RBQU1BO0lBQ25CeFAsa0RBQWFBLENBQUNwQyxLQUFLNEk7SUFFbkIsTUFBTWxELE9BQU8sa0RBQU8sQ0FBQ3ZELCtDQUFVQSxDQUFDbEMsUUFBUTJLLG1CQUFtQixFQUFHLENBQWNqRixRQUFRO0lBQ3BGLElBQUlELEtBQUs0RSxXQUFXLEtBQUtwTCxXQUNyQndHLEtBQUs0RSxXQUFXLEdBQUcsSUFBTTFCO0FBQ2pDO0FBRUE3SSxRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJRO0FBQ1c7QUFFM0IsU0FBU2QsT0FBT0ksSUFBWTtJQUV2Q2IseUNBQUNBLENBQUM7SUFFRixNQUFNZSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFDM0IsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBRTlCLElBQUlFLGFBQWEsR0FDYmQsMENBQUUsQ0FBQyxFQUFFYSxRQUFRLEVBQUUsRUFBRUEsVUFBUSxFQUFFLENBQUM7SUFFaEMsSUFBSSxJQUFJWCxJQUFJLEdBQUdBLElBQUlZLFlBQVlaLEtBQUcsRUFDOUJGLDBDQUFFLENBQUMsRUFBRSxFQUFFRSxJQUFFVyxRQUFRLEVBQUUsRUFBRVgsSUFBRSxJQUFFVyxRQUFRLENBQUM7SUFFdENkLHlDQUFDQSxDQUFDO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCa0Q7QUFDVjtBQUNPO0FBRWhDLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMlIsNERBQVlBO0lBQ3pCLE1BQU1sUyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBS1IsS0FBS3lKLElBQUksQ0FBQ25MLE1BQU0sR0FBRztJQUVqRCxJQUFJLElBQUlnQixJQUFJLEdBQUdBLElBQUlVLEtBQUt5SixJQUFJLENBQUNuTCxNQUFNLEVBQUUsRUFBRWdCLEVBQUc7UUFDdENnQixvREFBWUEsQ0FBQyxJQUFFaEIsSUFBRVcsU0FBU0QsS0FBT3lKLElBQUksQ0FBQ25LLEVBQUUsRUFBRW1CO1FBQzFDSCxvREFBWUEsQ0FBQyxJQUFFaEIsSUFBRSxJQUFFVyxTQUFTRCxLQUFLMkosTUFBTSxDQUFDckssRUFBRSxFQUFFbUI7SUFDaEQ7QUFDSjtBQUVBRixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkk7QUFDZTtBQUUzQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQztJQUVGLE1BQU1lLGFBQWFILDRDQUFPQSxDQUFDQztJQUMzQixNQUFNQyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFFOUIsSUFBSUUsYUFBYSxHQUNiZix5Q0FBQ0EsQ0FBQ2M7SUFFTixJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QkgseUNBQUNBLENBQUMsTUFBTUcsSUFBSVc7SUFFaEJkLHlDQUFDQSxDQUFDO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCa0Q7QUFDVjtBQUNPO0FBRWhDLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMFIsNERBQVlBO0lBQ3pCLE1BQU1oUyxhQUFhRixLQUFLdVksSUFBSSxDQUFDamEsTUFBTTtJQUNuQyxNQUFNMkIsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRTlCLElBQUksSUFBSVosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLdVksSUFBSSxDQUFDalosRUFBRSxFQUFFbUI7QUFDaEQ7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RJO0FBQ2U7QUFFM0IsU0FBU2QsT0FBT0ksSUFBWTtJQUV2Q2IseUNBQUNBLENBQUM7SUFFRixNQUFNZSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFDM0IsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBRTlCLElBQUlFLGFBQWEsR0FDYmYseUNBQUNBLENBQUNjO0lBRU4sSUFBSSxJQUFJWCxJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JILHlDQUFDQSxDQUFDLE1BQU1HLElBQUlXO0lBRWhCZCx5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQm1EO0FBQ1g7QUFDTztBQUVoQyxTQUFTb0IsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS3lSLDZEQUFhQTtJQUMxQixNQUFNL1IsYUFBYUYsS0FBS3VZLElBQUksQ0FBQ2phLE1BQU07SUFDbkMsTUFBTTJCLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUU5QixJQUFJLElBQUlaLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QmdCLG9EQUFZQSxDQUFDaEIsSUFBSVcsU0FBU0QsS0FBS3VZLElBQUksQ0FBQ2paLEVBQUUsRUFBRW1CO0FBRWhEO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmSTtBQUNFO0FBRWQsU0FBU2QsT0FBT0ksSUFBWTtJQUN2Q2IseUNBQUNBLENBQUV3Qix1Q0FBTSxDQUFDWCxLQUFLO0FBQ25COzs7Ozs7Ozs7Ozs7Ozs7OztBQ0g0QztBQUNTO0FBRXJELFNBQVN3WSxRQUFRcFUsQ0FBVTtJQUN2QixnR0FBZ0c7SUFDaEcsT0FBT3NGLE9BQU8rTyx5QkFBeUIsQ0FBQ3JVLElBQUlzVSxXQUFXQyxhQUFhO0FBQ3hFO0FBRWUsU0FBU3BZLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxJQUFJMkksY0FBYztJQUNsQixJQUFJaEgsUUFBUXBDLEtBQUs0QixFQUFFO0lBRW5CLElBQUlRLFVBQVUsUUFDVkEsUUFBUSxRQUFRLDJEQUEyRDtTQUMxRSxJQUFJQSxTQUFTM0IsUUFBUVMsYUFBYSxFQUNuQ2tJLGNBQWMzSSxRQUFRUyxhQUFhLENBQUNrQixNQUFNO0lBQzlDOzs7Ozs7OztJQVFBLEdBRUEvQiw0Q0FBT0EsQ0FBQ0csS0FBS3dDLHNEQUFNQTtJQUNuQkosa0RBQWFBLENBQUNwQyxLQUFLNEk7SUFFbkJ6SSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUc0QjtBQUNsQjtBQUdBN0IsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDcENxQjtBQUU3QixNQUFNbVkscUJBQXFCRCwyREFBU0E7QUFFbkQsRUFHQSxnQkFBZ0I7Q0FDWixVQUFVO0NBQ1YsV0FBVztDQUNQLFdBQVc7Q0FDWCx3Q0FBd0M7Q0FDeEMsa0JBQWtCO0NBQ2xCLFNBQVM7Q0FDTCx1QkFBdUI7Q0FDdkIsY0FBYzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZhO0FBRXhCLE1BQU1FLHVCQUF1QkQsa0RBQVlBO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKb0M7QUFDZ0I7QUFDRjtBQUdsRCxNQUFNdEYsVUFBVTtJQUNmLFVBQVV3RixrREFBU0E7SUFDbkIsZUFBZUMsa0VBQVNBO0lBQ3hCLGFBQWFDLGdFQUFTQTtBQUN2QjtBQUVBLGlFQUFlMUYsT0FBT0EsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDWFIsTUFBTXFGO0FBRXJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGTyxNQUFNamIsYUFBZXViLGFBQWE7QUFDekMsTUFBTUMsWUFBWTtBQUNsQixNQUFNQyxrQkFBa0IsSUFBSSxXQUFXLEtBQUksY0FBYztBQUVsRCxNQUFNcmIsWUFBWSxFQUFFO0FBQ3BCLE1BQU1GLFdBQVksRUFBRTtBQUNwQixNQUFNRCxXQUFZLEVBQUU7QUFDcEIsTUFBTUUsV0FBWSxFQUFFO0FBQ3BCLE1BQU1vSixnQkFBZ0J0SixXQUFXRyxVQUFVO0FBQzNDLE1BQU1rSixlQUFnQnJKLFdBQVdDLFNBQVM7QUFDMUMsTUFBTXVKLGdCQUFnQnRKLFdBQVdDLFVBQVU7QUFDM0MsTUFBTW9KLGVBQWdCckosV0FBV0QsU0FBUztBQUUxQyxNQUFNd0osVUFBVSxJQUFJMUosV0FBVyxJQUFFeWIsaUJBQWlCO0FBQ2xELE1BQU1wYixVQUFVLElBQUlMLFdBQVcsSUFBRXliLGlCQUFpQjtBQUV6RCxnQ0FBZ0M7QUFDekIsTUFBTXpZLFNBQVMsSUFBSW5CLFFBQWE7QUFFdkMsSUFBSTZaLG1CQUFtQjtBQUVoQixTQUFTalosU0FBU2taLE1BQWMsRUFBRXZaLE9BQWU7SUFFcEQsTUFBTUosU0FBUzJaLFNBQVNDO0lBRXhCQyxRQUFRLENBQUM3WixTQUFTOFosb0JBQW9CLEdBQUcxWjtJQUN6QyxNQUFNNkIsS0FBSzRYLFFBQVEsQ0FBQzdaLFNBQVMrWix1QkFBdUIsR0FBR0w7SUFDdkRBLG9CQUFvQnRaO0lBRXBCLE9BQU82QjtBQUNYO0FBRU8sU0FBUytYO0lBQ1osT0FBT047QUFDWDtBQUVPLFNBQVNPLGVBQWVDLEVBQVU7SUFDckNSLG9CQUFvQlE7QUFDeEI7QUFFZSxTQUFTQztJQUNwQm5aLE9BQU9yQyxNQUFNLEdBQUc7SUFDaEIrYSxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiVSxPQUFPQyxNQUFNLENBQUU7SUFDZixhQUFhO0lBQ2JELE9BQU9DLE1BQU0sQ0FBRUM7QUFDbkI7QUFFTyxNQUFNQyxrQkFBNkIsRUFBRSxDQUFDLGdCQUFnQjtBQUN0RCxNQUFNQyw2QkFBNkIsRUFBRTtBQUNyQyxNQUFNVCx5QkFBNkIsRUFBRSxDQUFDLGtCQUFrQjtBQUN4RCxNQUFNRCxzQkFBNkIsRUFBRSxDQUFDLDZCQUE2QjtBQUNuRSxNQUFNVyxzQkFBNkIsRUFBRSxDQUFDLGVBQWU7QUFDckQsTUFBTWIsZUFBNkIsRUFBRTtBQUU1QyxNQUFNVSxjQUFjVixlQUFlSixZQUFZQztBQUMvQyxhQUFhO0FBQ2IsTUFBTVcsU0FBUyxJQUFJTSxZQUFZSixhQUFhO0lBQUNLLGVBQWVMO0FBQVc7QUFFaEUsTUFBTVQsV0FBVyxJQUFJN2IsV0FBV29jLFFBQVE7QUFFeEMsU0FBUzliLEtBQUsrQixJQUFZO0lBQzdCLE9BQU93WixRQUFRLENBQUN4WixPQUFPdVosZUFBZVcsZ0JBQWdCO0FBQzFEO0FBQ08sU0FBU25hLFFBQVF1WixNQUFjO0lBQ2xDLE9BQU9FLFFBQVEsQ0FBQ0YsU0FBU0MsZUFBZUUsb0JBQW9CO0FBQ2hFO0FBQ08sU0FBUzNaLFdBQVd3WixNQUFjO0lBQ3JDLE9BQU9FLFFBQVEsQ0FBQ0YsU0FBU0MsZUFBZUcsdUJBQXVCO0FBQ25FO0FBQ08sU0FBUy9XLFdBQVczQyxJQUFZO0lBQ25DLE9BQU93WixRQUFRLENBQUN4WixPQUFPdVosZUFBZWEsb0JBQW9CO0FBQzlEO0FBQ08sU0FBU0csYUFBYXZhLElBQVk7SUFDckMsT0FBT3daLFFBQVEsQ0FBQ3haLE9BQU91WixlQUFlWSwyQkFBMkI7QUFDckU7QUFFTyxTQUFTOVosUUFBUUwsSUFBWSxFQUFFb0MsS0FBYTtJQUMvQyxPQUFPb1gsUUFBUSxDQUFDeFosT0FBT3VaLGVBQWVXLGdCQUFnQixHQUFHOVg7QUFDN0Q7QUFDTyxTQUFTUSxjQUFjNUMsSUFBWSxFQUFFb0MsS0FBYTtJQUNyRG9YLFFBQVEsQ0FBQ3haLE9BQU91WixlQUFlYSxvQkFBb0IsR0FBR2hZO0FBQzFEO0FBQ08sU0FBU29ZLGdCQUFnQnhhLElBQVksRUFBRW9DLEtBQWE7SUFDdkRvWCxRQUFRLENBQUN4WixPQUFPdVosZUFBZVksMkJBQTJCLEdBQUcvWDtBQUNqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQSxtQ0FBbUM7QUFHZ0I7QUFFVztBQUNxSztBQUNqSztBQU8zRCxTQUFTcVksVUFBVTdZLEVBQVU7SUFDaENpRCxRQUFRQyxJQUFJLENBQUM7UUFDVDdHLE1BQVd1Yix5Q0FBUSxDQUFDRCw2Q0FBWUEsR0FBQzNYLEtBQUdzWSxnREFBZUEsQ0FBQztRQUNwRHJQLFVBQVdILGtEQUFNLENBQUM4Tyx5Q0FBUSxDQUFDRCw2Q0FBWUEsR0FBQzNYLEtBQUd3WSxvREFBbUJBLENBQUMsQ0FBQztRQUNoRWhZLE9BQVd6Qix1Q0FBTSxDQUFDaUIsR0FBRztJQUN6QjtBQUNKO0FBRU8sU0FBU2tGLFlBQVlsRixFQUFVLEVBQUU4WSxZQUFpQjtJQUVyRCxNQUFNL2EsU0FBUyxJQUFFaUM7SUFDakJ5Rix3Q0FBTyxDQUFFMUgsU0FBU3VILDhDQUFhQSxDQUFFLEdBQUd3VCxhQUFhdlIsTUFBTTtJQUN2RDlCLHdDQUFPLENBQUUxSCxTQUFTc0gsNkNBQVlBLENBQUcsR0FBR3lULGFBQWF6UixVQUFVO0lBQzNENUIsd0NBQU8sQ0FBRTFILFNBQVN5SCw4Q0FBYUEsQ0FBRSxHQUFHc1QsYUFBYS9PLFVBQVU7SUFDM0R0RSx3Q0FBTyxDQUFFMUgsU0FBU3dILDZDQUFZQSxDQUFHLEdBQUd1VCxhQUFhOU8sY0FBYztBQUNuRTtBQUVPLFNBQVMrTyxzQkFBc0IvWSxFQUFVLEVBQUU4WSxZQUFpQjtJQUUvRCxNQUFNL2EsU0FBUyxJQUFFaUM7SUFFakIsTUFBTUcsTUFBTTJZLFlBQVksQ0FBQyxFQUFFO0lBQzNCLE1BQU16WSxNQUFNeVksWUFBWSxDQUFDQSxhQUFhcGMsTUFBTSxHQUFDLEVBQUU7SUFFL0MrSSx3Q0FBTyxDQUFFMUgsU0FBU3VILDhDQUFhQSxDQUFFLEdBQUduRixJQUFJb0gsTUFBTTtJQUM5QzlCLHdDQUFPLENBQUUxSCxTQUFTc0gsNkNBQVlBLENBQUcsR0FBR2xGLElBQUlrSCxVQUFVO0lBQ2xENUIsd0NBQU8sQ0FBRTFILFNBQVN5SCw4Q0FBYUEsQ0FBRSxHQUFHbkYsSUFBSTBKLFVBQVU7SUFDbER0RSx3Q0FBTyxDQUFFMUgsU0FBU3dILDZDQUFZQSxDQUFHLEdBQUdsRixJQUFJMkosY0FBYztBQUMxRDtBQUdPLFNBQVM3RSxvQkFBcUI2VCxHQUFXLEVBQUVDLE9BQWUsRUFBRUMsT0FBZTtJQUU5RSxNQUFNQyxhQUFhLElBQUVIO0lBQ3JCLE1BQU1JLGFBQWEsSUFBRUg7SUFDckIsTUFBTUksYUFBYSxJQUFFSCxVQUFVO0lBRS9CelQsd0NBQU8sQ0FBRTBULGFBQWE3VCw4Q0FBYUEsQ0FBRSxHQUFHRyx3Q0FBTyxDQUFFMlQsYUFBYWpkLDBDQUFTQSxDQUFFO0lBQ3pFc0osd0NBQU8sQ0FBRTBULGFBQWE5VCw2Q0FBWUEsQ0FBRyxHQUFHSSx3Q0FBTyxDQUFFMlQsYUFBYW5kLHlDQUFRQSxDQUFHO0lBRXpFd0osd0NBQU8sQ0FBRTBULGFBQWEzVCw4Q0FBYUEsQ0FBRSxHQUFHQyx3Q0FBTyxDQUFFNFQsYUFBYWxkLDBDQUFTQSxDQUFFO0lBQ3pFc0osd0NBQU8sQ0FBRTBULGFBQWE1VCw2Q0FBWUEsQ0FBRyxHQUFHRSx3Q0FBTyxDQUFFNFQsYUFBYXBkLHlDQUFRQSxDQUFHO0FBQzdFO0FBRUEsTUFBTXFkLFVBQW9DLENBQUM7QUFFM0MsSUFBSSxJQUFJNWIsSUFBSSxHQUFJQSxJQUFJZ1UsNERBQVdBLENBQUNoVixNQUFNLEVBQUUsRUFBRWdCLEVBQUc7SUFFekMsTUFBTWlOLFNBQVMrRyw0REFBVyxDQUFDaFUsRUFBRTtJQUU3QixJQUFJZ04sUUFBUTtRQUFDO0tBQU87SUFDcEIsSUFBSSxrQkFBa0JDLFFBQVE7UUFFMUIsSUFBSS9NLE1BQU1DLE9BQU8sQ0FBQzhNLE9BQU83TCxZQUFZLEdBQ2pDNEwsUUFBUUMsT0FBTzdMLFlBQVk7YUFFM0I0TCxRQUFRO1lBQUNDLE9BQU83TCxZQUFZO1NBQVc7SUFDL0M7SUFFQSxLQUFJLE1BQU1TLFFBQVFtTCxNQUNkLENBQUM0TyxPQUFPLENBQUMvWixLQUFLLEtBQUssRUFBRSxFQUFFMEssSUFBSSxDQUFDdk07QUFDcEM7QUFFTyxTQUFTNmIsT0FBT0MsSUFBWSxFQUFFNWMsUUFBZ0I7SUFFakQsTUFBTTZjLFNBQVMsSUFBSUMsR0FBR0MsTUFBTSxDQUFDSCxNQUFNNWMsVUFBVTtJQUNoRCxNQUFNZ2QsT0FBU0YsR0FBR0csUUFBUSxDQUFDQyxVQUFVLENBQUNMO0lBQ25DLDJCQUEyQjtJQUUzQixNQUFNOVgsUUFBUW9ZLFlBQVlIO0lBRTdCLE9BQU87UUFDQWpZO1FBQ0EvRTtJQUNKO0FBQ0o7QUFFTyxTQUFTbWQsWUFBWTliLEdBQVE7SUFFaENpYSwrQ0FBU0E7SUFFVDlZLGFBQWEyWSxrREFBYUEsSUFBSTlaLElBQUlnQixJQUFJLEVBQUUsSUFBSUU7SUFFNUMsT0FBT3lZLHlDQUFRQTtBQUVmOzs7Ozs7O2tDQU84QixHQUNsQztBQUdBLFNBQVNvQyxZQUFZbEIsWUFBaUI7SUFFbEMsaUJBQWlCO0lBQ2pCLElBQUlsYixNQUFNQyxPQUFPLENBQUNpYixlQUNkLE9BQU87SUFFWCxPQUFPQSxhQUFhalosV0FBVyxDQUFDQyxLQUFLO0FBQ3pDO0FBRU8sU0FBU3lWLGFBQWFsQixDQUFTLEVBQUVDLENBQVM7SUFFN0MsTUFBTTJGLEtBQUt0Qyw2Q0FBWUEsR0FBR3REO0lBQzFCLE1BQU02RixLQUFLdkMsNkNBQVlBLEdBQUdyRDtJQUUxQixJQUFJNkY7SUFDSixJQUFJLElBQUl6YyxJQUFJLEdBQUdBLElBQUlpYSw2Q0FBWUEsRUFBRSxFQUFFamEsRUFBRztRQUNsQ3ljLElBQUl2Qyx5Q0FBUSxDQUFDcUMsS0FBR3ZjLEVBQUU7UUFDbEJrYSx5Q0FBUSxDQUFDcUMsS0FBR3ZjLEVBQUUsR0FBR2thLHlDQUFRLENBQUNzQyxLQUFHeGMsRUFBRTtRQUMvQmthLHlDQUFRLENBQUNzQyxLQUFHeGMsRUFBRSxHQUFHeWM7SUFDckI7SUFFQSxNQUFNQyxLQUFLLElBQUUvRjtJQUNiLE1BQU1nRyxLQUFLLElBQUUvRjtJQUNiLElBQUksSUFBSTVXLElBQUksR0FBR0EsSUFBSSxHQUFHLEVBQUVBLEVBQUc7UUFDdkJ5YyxJQUFJMVUsd0NBQU8sQ0FBQzJVLEtBQUcxYyxFQUFFO1FBQ2pCK0gsd0NBQU8sQ0FBQzJVLEtBQUcxYyxFQUFFLEdBQUcrSCx3Q0FBTyxDQUFDNFUsS0FBRzNjLEVBQUU7UUFDN0IrSCx3Q0FBTyxDQUFDNFUsS0FBRzNjLEVBQUUsR0FBR3ljO0lBQ3BCO0lBRUFBLElBQUlwYix1Q0FBTSxDQUFDc1YsRUFBRTtJQUNidFYsdUNBQU0sQ0FBQ3NWLEVBQUUsR0FBR3RWLHVDQUFNLENBQUN1VixFQUFFO0lBQ3JCdlYsdUNBQU0sQ0FBQ3VWLEVBQUUsR0FBRzZGO0FBRWhCO0FBRUEsTUFBTWxiLE9BQU9xYSxRQUFRZ0IsSUFBSSxDQUFDLEVBQUU7QUFFckIsU0FBU2xiLGFBQWFZLEVBQVUsRUFBRThZLFlBQWlCLEVBQUVqYSxPQUFnQjtJQUV4RTZTLDREQUFXLENBQUN6UyxLQUFLLENBQUtlLElBQUk4WSxjQUFjamE7SUFDeENrYSxzQkFBc0IvWSxJQUFJOFk7QUFDOUI7QUFFTyxTQUFTcGEsYUFBYXNCLEVBQVUsRUFBRThZLFlBQWlCLEVBQUVqYSxPQUFnQjtJQUV4RSxJQUFJVSxPQUFPeWEsWUFBWWxCO0lBRXZCLElBQUd2WixTQUFTLFFBQVE7UUFDaEJ1WixlQUFlQSxhQUFhdFksS0FBSztRQUNqQ2pCLE9BQU95YSxZQUFZbEI7SUFDdkI7SUFFQSxNQUFNeUIsYUFBYWpCLE9BQU8sQ0FBQy9aLEtBQUs7SUFFaEMsSUFBSWdiLGVBQWV6YyxXQUFZO1FBQzNCbUYsUUFBUUMsSUFBSSxDQUFDLDBCQUEwQjNEO1FBQ3ZDMEQsUUFBUUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFNFYsYUFBYXZSLE1BQU0sQ0FBQyxDQUFDLEVBQUV1UixhQUFhelIsVUFBVSxDQUFDLENBQUM7UUFDbkVwRSxRQUFRTSxHQUFHLENBQUV1VjtRQUNidlosT0FBTztJQUNYO0lBRUEsbURBQW1EO0lBQ25ELElBQUksSUFBSTdCLElBQUksR0FBR0EsSUFBSTZjLFdBQVc3ZCxNQUFNLEVBQUUsRUFBRWdCLEVBQ3BDLElBQUlnVSw0REFBVyxDQUFDNkksVUFBVSxDQUFDN2MsRUFBRSxDQUFDLENBQUNzQyxJQUFJOFksY0FBY2phLGFBQWEsT0FBTztRQUVqRXFHLFlBQVlsRixJQUFJOFk7UUFFaEI7SUFDSjtJQUVKN1YsUUFBUXVYLEtBQUssQ0FBQzFCO0lBQ2QsTUFBTSxJQUFJclosTUFBTSxDQUFDLGlCQUFpQixFQUFFRixLQUFLLElBQUksRUFBRXVaLGFBQWF2UixNQUFNLENBQUMsQ0FBQyxFQUFFdVIsYUFBYXpSLFVBQVUsQ0FBQyxDQUFDO0FBQ25HO0FBRU8sTUFBTWxJO0lBQ1RVLFlBQVl4RCxPQUEwQixHQUFHLEVBQUVvZSxpQkFBMEJDLFdBQVcsQ0FBRTtRQUM5RSxJQUFJLENBQUNyZSxJQUFJLEdBQUdBLE1BQU0sY0FBYztRQUNoQyxJQUFJLENBQUNpRCxhQUFhLEdBQUc7WUFBQyxHQUFHbWIsZUFBZW5iLGFBQWE7UUFBQTtJQUN6RDtJQUVBQSxjQUFzQztJQUN0Q2tLLG9CQUE2QjtJQUU3Qm5OLEtBQUs7QUFDVDtBQUVBLE1BQU1zZSxXQUFXLENBQUMsRUFBRSwyQkFBMkI7QUFFL0MsZUFBZTtBQUNmLG9CQUFvQjtBQUNwQixvREFBb0Q7QUFDcEQsU0FBU0MsY0FBY3JiLElBQVksRUFBRTJKLFdBQTRCO0lBQzdELE1BQU0yUixTQUFTLENBQUMsRUFBRSxFQUFFdGIsS0FBSyxFQUFFLENBQUM7SUFDNUIsT0FBTztRQUNId1MsV0FBVzRJO1FBQ1hoUixVQUFXcEs7UUFDWGdGLFVBQVc7WUFDUCx3QkFBd0I7WUFDeEIyRSxhQUFpQkE7WUFDakIsZ0JBQWdCO1lBQ2hCTixpQkFBaUIsQ0FBQ2tTO2dCQUNkLE1BQU1yRixPQUFTdlgsK0NBQVVBLENBQUM0YyxRQUFNO2dCQUNoQyxNQUFNdEgsU0FBUzFLLGtEQUFNLENBQUMvSCwrQ0FBVUEsQ0FBQzBVLE1BQU0sQ0FBRW9GLE9BQU87Z0JBQ2hELE9BQU9ySCxPQUFPNUssZUFBZSxDQUFFa1M7WUFDbkM7UUFDSjtJQUNKO0FBQ0o7QUFFQSxzQkFBc0I7QUFDdEIsTUFBTUMsTUFBTTlJLHdEQUFRQSxDQUFDLE9BQU8ySSxjQUFjLE9BQU8xRywyREFBT0E7QUFFeEQsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNd0csY0FBdUI7SUFDekJyZSxNQUFNO0lBQ05pRCxlQUFlO1FBQ1gwYixLQUFPM2IsMERBQVVBLENBQUM7UUFDbEI1QixLQUFPNEIsMERBQVVBLENBQUM7UUFDbEI0YixPQUFPNWIsMERBQVVBLENBQUM7UUFDbEIwYjtJQUdKO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxT0EsY0FBYztBQUlrQztBQVF6QyxTQUFTeEIsT0FBT0MsSUFBWSxFQUFFNWMsUUFBZ0I7SUFFakQsTUFBTStFLFFBQVEsSUFBSS9EO0lBRWxCLElBQUl1ZCxTQUFTO1FBQ1RwZCxRQUFRO1FBQ1I2RCxNQUFNO1FBQ053WixhQUFjO0lBQ2xCO0lBRUEsSUFBSUM7SUFDSixHQUFHO1FBQ0MxWixNQUFNc0ksSUFBSSxDQUFFcVIsZ0JBQWdCOUIsTUFBTTJCO1FBQ2xDRSxPQUFPN0IsSUFBSSxDQUFDMkIsT0FBT3BkLE1BQU0sQ0FBQztRQUMxQixNQUFPc2QsU0FBUyxLQUFPO1lBQ25CQSxPQUFPN0IsSUFBSSxDQUFDLEVBQUUyQixPQUFPcGQsTUFBTSxDQUFDO1lBQzVCLEVBQUVvZCxPQUFPdlosSUFBSTtRQUNqQjtRQUVBdVosT0FBT0MsV0FBVyxHQUFHRCxPQUFPcGQsTUFBTTtJQUV0QyxRQUFTc2QsU0FBU3ZkLFVBQVk7SUFFOUIsdURBQXVEO0lBQzFELDhDQUE4QztJQUMzQywyQkFBMkI7SUFDOUIsT0FBTztRQUNBNkQ7UUFDQS9FO0lBQ0o7QUFDSjtBQUUwRDtBQUUxRCxTQUFTNGUsWUFBWWhDLElBQVksRUFBRTJCLE1BQWM7SUFFN0MsTUFBTU0sWUFBWU4sT0FBT3BkLE1BQU07SUFFL0IsSUFBSTJkLE1BQU1sQyxJQUFJLENBQUMyQixPQUFPcGQsTUFBTSxDQUFDO0lBQzdCLE1BQU8yZCxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLElBQzlGQSxNQUFPbEMsSUFBSSxDQUFDLEVBQUUyQixPQUFPcGQsTUFBTSxDQUFDO0lBRWhDLE1BQU00ZCxTQUFTbkMsS0FBSzdXLEtBQUssQ0FBQzhZLFdBQVdOLE9BQU9wZCxNQUFNO0lBRWxELHFCQUFxQjtJQUVyQixPQUFPO1FBQ0gxQixNQUFVO1FBQ1ZtRSxPQUFVbWI7UUFDVkMsVUFBVSxFQUFFO1FBQ1pwVSxhQUFhO1FBRWJxVSxNQUFNTixtRUFBY0E7SUFDeEI7QUFDSjtBQUVxRTtBQUVyRSxTQUFTUSxZQUFZdkMsSUFBWSxFQUFFMkIsTUFBYztJQUU3QyxNQUFNTSxZQUFZTixPQUFPcGQsTUFBTTtJQUUvQixlQUFlO0lBRWYsSUFBSTJkLE1BQU1sQyxJQUFJLENBQUMyQixPQUFPcGQsTUFBTSxDQUFDO0lBQzdCLE1BQU8yZCxPQUFPLE9BQU9BLE9BQU8sSUFDeEJBLE1BQU9sQyxJQUFJLENBQUMsRUFBRTJCLE9BQU9wZCxNQUFNLENBQUM7SUFFaEMsT0FBTztRQUNIMUIsTUFBVTtRQUNWbUUsT0FBVWdaLEtBQUs3VyxLQUFLLENBQUM4WSxXQUFXTixPQUFPcGQsTUFBTTtRQUM3QzZkLFVBQVUsRUFBRTtRQUNacFUsYUFBYTtRQUVicVUsTUFBTUMseUVBQW1CQTtJQUM3QjtBQUNKO0FBRXFFO0FBRXJFLFNBQVNHLFlBQVl6QyxJQUFZLEVBQUUyQixNQUFjO0lBRTdDLE1BQU1NLFlBQVlOLE9BQU9wZCxNQUFNO0lBRS9CLElBQUkyZCxNQUFNbEMsSUFBSSxDQUFDLEVBQUUyQixPQUFPcGQsTUFBTSxDQUFDO0lBQy9CLE1BQU8yZCxRQUFRNWQsYUFBYTRkLFFBQVEsT0FBT2xDLElBQUksQ0FBQzJCLE9BQU9wZCxNQUFNLEdBQUMsRUFBRSxLQUFLLEtBQ2pFMmQsTUFBTWxDLElBQUksQ0FBQyxFQUFFMkIsT0FBT3BkLE1BQU0sQ0FBQztJQUUvQixFQUFFb2QsT0FBT3BkLE1BQU07SUFFZixPQUFPO1FBQ0gxQixNQUFVO1FBQ1ZtRSxPQUFVZ1osS0FBSzdXLEtBQUssQ0FBQzhZLFdBQVdOLE9BQU9wZCxNQUFNO1FBQzdDNmQsVUFBVSxFQUFFO1FBQ1pwVSxhQUFhO1FBRWJxVSxNQUFNRyx5RUFBbUJBO0lBQzdCO0FBQ0o7QUFFQSxTQUFTVixnQkFBZ0I5QixJQUFZLEVBQUUyQixNQUFjO0lBQ2pELElBQUlFLE9BQU83QixJQUFJLENBQUMyQixPQUFPcGQsTUFBTSxDQUFDO0lBRTlCLElBQUkwWCxPQUFPeUcsV0FBVzFDLE1BQU0yQjtJQUM1QkUsT0FBTzdCLElBQUksQ0FBQzJCLE9BQU9wZCxNQUFNLENBQUM7SUFDMUIsSUFBSXNkLFNBQVMsTUFDVCxPQUFPNUY7SUFFWCxJQUFJTCxLQUFLOEcsV0FBVzFDLE1BQU0yQjtJQUMxQi9GLEdBQUl3RyxRQUFRLENBQUMsRUFBRSxHQUFHbkc7SUFDbEJMLEdBQUcrRyxNQUFNLENBQUNDLEtBQUssR0FBRzNHLEtBQUswRyxNQUFNLENBQUNDLEtBQUs7SUFFbkMsSUFBSXJVLFNBQVM7UUFBQ3FOO1FBQUk4RyxXQUFXMUMsTUFBTTJCO0tBQVE7SUFFM0NFLE9BQU83QixJQUFJLENBQUMyQixPQUFPcGQsTUFBTSxDQUFDO0lBQzFCLE1BQU9zZCxTQUFTLEtBQU87UUFFbkIsSUFBSWdCLE1BQVFILFdBQVcxQyxNQUFNMkI7UUFDN0IsSUFBSXpGLFFBQVF3RyxXQUFXMUMsTUFBTTJCO1FBRTdCLElBQUltQixNQUFPdlUsTUFBTSxDQUFDQSxPQUFPckwsTUFBTSxHQUFDLEVBQUU7UUFDbEMsSUFBSStZLE9BQU8xTixNQUFNLENBQUNBLE9BQU9yTCxNQUFNLEdBQUMsRUFBRTtRQUVsQyw2QkFBNkI7UUFDN0IsVUFBVTtRQUVWLFFBQVE7UUFDUjRmLElBQUtWLFFBQVEsQ0FBQyxFQUFFLEdBQUduRztRQUNuQjZHLElBQUtILE1BQU0sQ0FBQzliLEdBQUcsR0FBSW9WLEtBQUswRyxNQUFNLENBQUM5YixHQUFHO1FBRWxDLE9BQU87UUFDUGdjLElBQUtULFFBQVEsQ0FBQyxFQUFFLEdBQUdVO1FBQ25CRCxJQUFJRixNQUFNLENBQUNDLEtBQUssR0FBR0UsSUFBSUgsTUFBTSxDQUFDQyxLQUFLO1FBRW5DclUsTUFBTSxDQUFDQSxPQUFPckwsTUFBTSxHQUFDLEVBQUUsR0FBRzJmO1FBQzFCdFUsTUFBTSxDQUFDQSxPQUFPckwsTUFBTSxHQUFDLEVBQUUsR0FBR2daO1FBRTFCMkYsT0FBTzdCLElBQUksQ0FBQzJCLE9BQU9wZCxNQUFNLENBQUM7SUFDOUI7SUFFQWdLLE1BQU0sQ0FBQyxFQUFFLENBQUU2VCxRQUFRLENBQUMsRUFBRSxHQUFHN1QsTUFBTSxDQUFDLEVBQUU7SUFDbENBLE1BQU0sQ0FBQyxFQUFFLENBQUVvVSxNQUFNLENBQUM5YixHQUFHLEdBQUkwSCxNQUFNLENBQUMsRUFBRSxDQUFDb1UsTUFBTSxDQUFDOWIsR0FBRztJQUU3QyxPQUFPMEgsTUFBTSxDQUFDLEVBQUU7QUFDcEI7QUFFQSxTQUFTd1UsY0FBYy9DLElBQVksRUFBRTJCLE1BQWM7SUFFL0MsTUFBTU0sWUFBWU4sT0FBT3BkLE1BQU07SUFFL0IsSUFBSXNkLE9BQU83QixJQUFJLENBQUMyQixPQUFPcGQsTUFBTSxHQUFHO0lBQ2hDOztvQ0FFZ0MsR0FFaEMsT0FBTztRQUNIMUIsTUFBVSxlQUFlZ2Y7UUFDekI3YSxPQUFVO1FBQ1ZvYixVQUFVO1lBQUM5ZDtZQUFXQTtTQUFVO1FBQ2hDMEosYUFBYTtRQUVicVUsTUFBTVgsMkRBQVksQ0FBQyxlQUFlRyxLQUFLLENBQUN2ZixNQUFNO0lBQ2xEO0FBQ0o7QUFFQSxTQUFTb2dCLFdBQVcxQyxJQUFZLEVBQUUyQixNQUFjO0lBRTVDLG9CQUFvQjtJQUNwQixJQUFJRSxPQUFPN0IsSUFBSSxDQUFDMkIsT0FBT3BkLE1BQU0sQ0FBQztJQUM5QixNQUFPc2QsU0FBUyxPQUFPQSxTQUFTLEtBQzVCQSxPQUFRN0IsSUFBSSxDQUFDLEVBQUUyQixPQUFPcGQsTUFBTSxDQUFDO0lBRWpDLGNBQWM7SUFDZCxJQUFJc2QsU0FBU3ZkLFdBQ1QsT0FBTztJQUVYLE1BQU1zZSxRQUFRO1FBQ1Z4YSxNQUFNdVosT0FBT3ZaLElBQUk7UUFDakJDLEtBQU1zWixPQUFPcGQsTUFBTSxHQUFHb2QsT0FBT0MsV0FBVztJQUM1QztJQUVBLElBQUloZCxPQUFPO0lBQ1gsSUFBSWlkLFNBQVMsS0FDVGpkLE9BQU82ZCxZQUFZekMsTUFBTTJCO1NBQ3hCLElBQUlFLFFBQVEsT0FBT0EsUUFBUSxPQUFPQSxRQUFRLE9BQU9BLFFBQVEsT0FBT0EsUUFBUSxLQUN6RWpkLE9BQU9vZCxZQUFZaEMsTUFBTTJCO1NBQ3hCLElBQUlFLFFBQVEsT0FBT0EsUUFBUSxLQUM1QmpkLE9BQU8yZCxZQUFZdkMsTUFBTTJCO1NBRXpCL2MsT0FBT21lLGNBQWMvQyxNQUFNMkI7SUFDM0IsNkhBQTZIO0lBRWpJL2MsS0FBSytkLE1BQU0sR0FBRztRQUNWQztRQUNBL2IsS0FBSztZQUNEdUIsTUFBTXVaLE9BQU92WixJQUFJO1lBQ2pCQyxLQUFNc1osT0FBT3BkLE1BQU0sR0FBR29kLE9BQU9DLFdBQVc7UUFDNUM7SUFDSjtJQUVBLG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFFekIsT0FBT2hkO0FBRVg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Tm9EO0FBQ1g7QUFFdkI7QUFFbEIsV0FBVztBQUdKLE1BQU1xZTtJQUVULENBQUNDLGNBQWMsR0FBd0IsQ0FBQyxFQUFFO0lBQzFDLENBQUNDLFFBQVEsR0FBd0M7UUFDN0NDLFNBQVNDO0lBQ2IsRUFBRTtJQUVGLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFFekIsbUNBQW1DO0lBQ25DQyxZQUFZdmdCLE1BQWMsRUFBRTBCLEdBQVEsRUFBRTtRQUNsQyxJQUFHQSxJQUFJckIsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDOGYsY0FBYyxFQUNuQyxNQUFNLElBQUlqZCxNQUFNLENBQUMsSUFBSSxFQUFFeEIsSUFBSXJCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztRQUU3RCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLENBQUM4ZixjQUFjLENBQUN6ZSxJQUFJckIsUUFBUSxDQUFDLEdBQUdxQjtRQUVyQyxzQkFBc0I7UUFDdEIsT0FBTyxJQUFJOGUsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFFeGdCLE9BQU8sc0JBQXNCLENBQUM7SUFDekU7SUFFQXlnQixVQUFVemdCLE1BQWMsRUFBRTBCLEdBQVEsRUFBRTtRQUNoQyxJQUFJLENBQUMsQ0FBQzBlLFFBQVEsQ0FBQzFlLElBQUlyQixRQUFRLENBQUMsR0FBRyxJQUFJLENBQUNrZ0IsV0FBVyxDQUFDdmdCLFFBQVEwQixLQUFLLElBQUk7SUFDckU7SUFFQWdmLGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxDQUFDTixRQUFRO0lBQ3pCO0lBQ0FPLFVBQVUzZCxJQUFZLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsQ0FBQ29kLFFBQVEsQ0FBQ3BkLEtBQUs7SUFDL0I7SUFFQTBDLFVBQVVyRixRQUFnQixFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLENBQUM4ZixjQUFjLENBQUM5ZixTQUFTLEVBQUUsa0JBQWtCO0lBQzdEO0lBRUEsSUFBSWtILE1BQU07UUFDTixPQUFPQSwyREFBR0E7SUFDZDtJQUNBLElBQUlILE1BQU07UUFDTixPQUFPQSxvREFBR0E7SUFDZDtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEMkI7QUFFbUM7QUFDWjtBQUNnRTtBQUM5RDtBQUdwRCxVQUFVO0FBQ04sbUNBQW1DO0FBQ25DLHdFQUF3RTtBQUN4RSxrREFBa0Q7QUFDbEQsK0JBQStCO0FBQ25DLHlFQUF5RTtBQUNyRSxpQ0FBaUM7QUFDakMsMkNBQTJDO0FBQzNDLHFEQUFxRDtBQUV6RCxVQUFVO0FBQ04sNEVBQTRFO0FBQzVFLDhEQUE4RDtBQUNsRSxxREFBcUQ7QUFFOUMsTUFBTTBSLGVBQWU7SUFDeEIsUUFBUTtJQUNSLE9BQVE7SUFFUixPQUFRO0lBRVIsUUFBWTtJQUNaLE9BQVk7SUFDWixZQUFZO0lBQ1osT0FBWTtJQUVaLE9BQVk7SUFDWixPQUFZO0lBRVosTUFBWTtJQUNaLFNBQVk7SUFDWixNQUFZO0lBQ1osU0FBWTtJQUVaLE1BQVk7SUFDWixPQUFZO0lBQ1osTUFBWTtJQUNaLE9BQVk7SUFFWixVQUFZO0lBRVosU0FBWTtJQUNaLFVBQVk7SUFDWixVQUFZO0lBQ1osVUFBWTtJQUNaLFVBQVk7QUFDaEIsRUFBQztBQUVNLE1BQU0rSCxrQkFBa0I7SUFDM0IsV0FBZ0I7SUFDaEIsV0FBZ0I7SUFDaEIsZUFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQWdCO0lBRWhCLFdBQWU7SUFDZixXQUFlO0lBRWYsVUFBZTtJQUNmLFVBQWU7SUFFZixVQUFlO0lBQ2YsVUFBZTtJQUNmLFVBQWU7SUFDZixVQUFlO0lBRWYsV0FBZTtJQUNmLFVBQWU7SUFDZixXQUFlO0lBQ2YsV0FBZTtJQUNmLGNBQWU7SUFDZixjQUFlO0FBQ25CLEVBQUM7QUFFRCxTQUFTO0FBQ0YsTUFBTWxJLGtCQUFrQjtJQUMzQixXQUFnQjtJQUNoQixXQUFnQjtJQUNoQixlQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsV0FBZ0I7SUFFaEIsV0FBZTtJQUNmLFdBQWU7SUFFZixVQUFlO0lBQ2YsV0FBZTtJQUNmLFdBQWU7SUFDZixjQUFlO0lBQ2YsY0FBZTtBQUNuQixFQUFDO0FBR00sTUFBTW1JLFlBQVk7SUFDckIsTUFBTTtJQUNOLEtBQU07SUFDTixLQUFNO0lBQ04sTUFBTTtJQUNOLEtBQU07SUFFTixLQUFPO0lBQ1AsS0FBTztJQUNQLE9BQU87SUFFUCxNQUFPO0lBQ1AsTUFBTztJQUNQLEtBQU87SUFDUCxNQUFPO0lBQ1AsTUFBTztJQUNQLEtBQU87SUFFUCxLQUFNO0lBQ04sS0FBTTtJQUNOLEtBQU07SUFDTixLQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07QUFDVixFQUFFO0FBRUYsd0JBQXdCO0FBRXhCLHdHQUF3RztBQUN4Ryx5Q0FBeUM7QUFDbEMsTUFBTUMsY0FBYztJQUN2QixFQUFFO0lBQ0Y7UUFBQztLQUFJO0lBQUUsdUJBQXVCLEdBQzlCO1FBQUM7UUFBTTtLQUFLO0lBQ1o7UUFBQztLQUFLO0lBQ047UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFJO0lBQ0w7UUFBQztRQUFNO1FBQU07UUFBTztLQUFNO0lBQzFCO1FBQUM7UUFBSztRQUFNO1FBQU07S0FBSTtJQUN0QjtRQUFDO1FBQU07UUFBTTtLQUFNO0lBQ25CO1FBQUM7UUFBSztLQUFJO0lBQ1Y7UUFBQztRQUFLO1FBQUs7S0FBSTtJQUNmO1FBQUM7S0FBSztJQUNOO1FBQUM7UUFBSztRQUFNO1FBQU07UUFBSztLQUFNO0NBQ2hDLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZHQSxHQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0EsR0FFTyxTQUFTeEssV0FBV3VCLENBQVMsRUFBRXBVLFNBQVNzUyxnREFBVztJQUV0RCxJQUFJeFIsK0NBQVVBLENBQUNzVCxPQUFPOVQsOENBQVNBLEVBQzNCLE9BQU84VDtJQUVYLElBQUloWSx5Q0FBSUEsQ0FBQ2dZLE9BQU9qRCw0REFBWUEsRUFBRTtRQUMxQiwyQ0FBMkM7UUFDM0MsSUFBSW5SLFdBQVdzUyxnREFBV0EsRUFDdEJ2UixrREFBYUEsQ0FBQ3FULEdBQUduUSxnREFBV0E7UUFDaEMsT0FBT21RO0lBQ1g7SUFFQSxNQUFNa0osVUFBVXhlLHVDQUFNLENBQUNzVixFQUFFO0lBRXpCLE1BQU1oVyxVQUFVSCwrQ0FBVUEsQ0FBQ21XO0lBRTNCLElBQUlrSixZQUFZLGFBQWFBLFlBQVksWUFBYTtRQUNsRCxNQUFNNUgsUUFBUTVVLCtDQUFVQSxDQUFDMUM7UUFDekIsTUFBTWlMLFFBQVF2SSwrQ0FBVUEsQ0FBQzFDLFVBQVE7UUFDakMsSUFBTyxDQUFDc1gsVUFBVXBWLDhDQUFTQSxJQUFJb1YsVUFBVXpSLGdEQUFVLEtBQzNDb0YsQ0FBQUEsVUFBVS9JLDhDQUFTQSxJQUFJK0ksVUFBVXBGLGdEQUFVLEdBQ2pEO1lBQ0VsRCxrREFBYUEsQ0FBQ3FULEdBQUdwVTtZQUNqQixPQUFPb1U7UUFDWDtJQUNKO0lBQ0EsSUFBSWtKLFlBQVksYUFBYXhjLCtDQUFVQSxDQUFDMUMsYUFBYWtDLDhDQUFTQSxFQUFFO1FBQzVEUyxrREFBYUEsQ0FBQ3FULEdBQUdwVTtRQUNqQixPQUFPb1U7SUFDWDtJQUNBLElBQUlwVSxXQUFXc1MsZ0RBQVdBLEVBQ3RCLE9BQU9uVix5Q0FBQyxDQUFDLE9BQU8sRUFBRWlYLEVBQUUsQ0FBQyxDQUFDO0lBRTFCLHNDQUFzQztJQUN0QyxPQUFPQTtBQUNYO0FBRU8sU0FBU25VLFdBQVdtVSxDQUFTO0lBRWhDLElBQUl0VCwrQ0FBVUEsQ0FBQ3NULE9BQU85VCw4Q0FBU0EsRUFDM0IsT0FBTzhUO0lBRVgsSUFBSWhZLHlDQUFJQSxDQUFDZ1ksT0FBT2pELDREQUFZQSxFQUFFO1FBQzFCcFEsa0RBQWFBLENBQUNxVCxHQUFHOVQsOENBQVNBLEdBQUcsMEJBQTBCO1FBQ3ZELE9BQU84VDtJQUNYO0lBQ0EsSUFBSXRWLHVDQUFNLENBQUNzVixFQUFFLEtBQUssYUFBYXRULCtDQUFVQSxDQUFDN0MsK0NBQVVBLENBQUNtVyxRQUFRblEsZ0RBQVdBLEVBQUU7UUFDdEVsRCxrREFBYUEsQ0FBQ3FULEdBQUc5VCw4Q0FBU0E7UUFDMUIsT0FBTzhUO0lBQ1g7SUFFQSxPQUFPalgseUNBQUMsQ0FBQyxPQUFPLEVBQUVpWCxFQUFFLENBQUMsQ0FBQztBQUMxQjtBQUVBLElBQUltSixzQkFBOEMsQ0FBQztBQUNuRCxJQUFJLElBQUk5ZixJQUFJLEdBQUdBLElBQUk0ZixZQUFZNWdCLE1BQU0sRUFBRSxFQUFFZ0IsRUFBRztJQUV4QyxNQUFNK2YsV0FBVy9mO0lBQ2pCLEtBQUksTUFBTTBYLE1BQU1rSSxXQUFXLENBQUM1ZixFQUFFLENBQzFCOGYsbUJBQW1CLENBQUNwSSxHQUFHLEdBQUdxSTtBQUVsQztBQUVPLFNBQVNqSSxrQkFBMERKLEVBQUs7SUFDM0UsT0FBT2dJLGVBQWUsQ0FBQ2hJLEdBQUc7QUFDOUI7QUFFQSxNQUFNc0ksT0FBUTtBQUNkLE1BQU1DLFFBQVE7QUFFUCxTQUFTeEgsV0FBVy9YLElBQVksRUFBRWdYLEVBQVU7SUFFL0MsTUFBTXdJLFFBQWExZiwrQ0FBVUEsQ0FBQ0U7SUFDOUIsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBRTNCLE1BQU15ZixPQUFTTCxtQkFBbUIsQ0FBQ3BJLEdBQUc7SUFDdEMsTUFBTTBJLFNBQVNOLG1CQUFtQixDQUFDcEksR0FBRztJQUV0Q3dELG9EQUFlQSxDQUFDZ0YsT0FBT0M7SUFFdkIsSUFBSSxJQUFJbmdCLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QmtiLG9EQUFlQSxDQUFFZ0YsUUFBUWxnQixHQUFHbWdCLE9BQU87SUFFdkMsSUFBSTlILFNBQVMzWSx5Q0FBQyxDQUFDLEVBQUV3Z0IsTUFBTSxDQUFDO0lBQ3hCLElBQUksSUFBSWxnQixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JxWSxTQUFTM1kseUNBQUMsQ0FBQyxFQUFFMlksT0FBTyxJQUFJLEVBQUU2SCxRQUFRbGdCLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQjtJQUU1RCxJQUFJb2dCLFNBQVNELE1BQ1Q5SCxTQUFTM1kseUNBQUMsQ0FBQyxDQUFDLEVBQUUyWSxPQUFPLENBQUMsQ0FBQztJQUUzQixPQUFPQTtBQUNYO0FBRUEsZ0VBQWdFO0FBQ2hFLHdCQUF3QjtBQUNqQixTQUFTakMsUUFBUTFWLElBQVksRUFBRWlXLENBQVM7SUFFM0N1RSxvREFBZUEsQ0FBRXZFLEdBQUdzRSxpREFBWUEsQ0FBQ3ZhO0lBRWpDLE9BQU9oQix5Q0FBQyxDQUFDLEVBQUVpWCxFQUFFLENBQUM7QUFDbEI7QUFFTyxTQUFTcFEsWUFBWTdGLElBQVksRUFBRWlXLENBQWEsRUFBRWUsRUFBVSxFQUFFZCxDQUFhO0lBRTlFLE1BQVF1SixPQUFPTCxtQkFBbUIsQ0FBQ3BJLEdBQUc7SUFDdEMsTUFBTTBJLFNBQVNuRixpREFBWUEsQ0FBQ3ZhO0lBRTVCLElBQUcsT0FBT2lXLE1BQU0sVUFDWnVFLG9EQUFlQSxDQUFDdkUsR0FBR3dKO0lBRXZCLElBQUcsT0FBT3ZKLE1BQU0sVUFDWnNFLG9EQUFlQSxDQUFDdEUsR0FBR3VKO0lBRXZCLElBQUlFLE1BQU0zZ0IseUNBQUMsQ0FBQyxFQUFFaVgsRUFBRSxFQUFFZSxHQUFHLEVBQUVkLEVBQUUsQ0FBQztJQUMxQiw0Q0FBNEM7SUFDNUMsSUFBSXdKLFNBQVNELE1BQ1RFLE1BQU0zZ0IseUNBQUMsQ0FBQyxDQUFDLEVBQUUyZ0IsSUFBSSxDQUFDLENBQUM7SUFFckIsT0FBT0E7QUFDWDtBQUdPLFNBQVNoSyxXQUFXM1YsSUFBWSxFQUFFZ1gsRUFBVSxFQUFFZixDQUFhO0lBRTlELElBQUkySixNQUFNNUk7SUFDVixJQUFJNEksUUFBUSxLQUNSQSxNQUFNO0lBRVYsNEJBQTRCO0lBQzVCLE1BQU1ILE9BQVNMLG1CQUFtQixDQUFDUSxJQUFJO0lBQ3ZDLE1BQU1GLFNBQVNuRixpREFBWUEsQ0FBQ3ZhO0lBRTVCLElBQUcsT0FBT2lXLE1BQU0sVUFDWnVFLG9EQUFlQSxDQUFDdkUsR0FBR3dKO0lBRXZCLElBQUlFLE1BQU0zZ0IseUNBQUMsQ0FBQyxFQUFFZ1ksR0FBRyxFQUFFZixFQUFFLENBQUM7SUFDdEIsNENBQTRDO0lBQzVDLElBQUl5SixTQUFTRCxNQUNURSxNQUFNM2dCLHlDQUFDLENBQUMsQ0FBQyxFQUFFMmdCLElBQUksQ0FBQyxDQUFDO0lBRXJCLE9BQU9BO0FBQ1g7QUFVTyxTQUFTbEwsWUFBWTJELEdBQXVDLEVBQ3ZDdE4sV0FBNEIsRUFDNUIsRUFDSXFMLGVBQWU0SSxrREFBUyxFQUN4QnZVLGVBQWUsRUFDQSxHQUFHLENBQUMsQ0FBQztJQUdoRCxJQUFJbU4sU0FBdUMsQ0FBQztJQUU1QyxLQUFJLElBQUlYLE1BQU1vQixJQUFLO1FBRWYsTUFBTXlILE9BQU9aLFNBQVMsQ0FBQ2pJLEdBQUc7UUFDMUIsSUFBSUEsT0FBTyxPQUNQQSxLQUFLO1FBRVR4TSxvQkFBb0IsQ0FBQ3hLLE1BQWN3VjtZQUMvQixPQUFPRyxXQUFXM1YsTUFBTWdYLElBQUliLGFBQWFYO1FBQzdDO1FBRUFtQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUVrSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDcEIvVTtZQUNBTjtRQUNKO0lBQ0o7SUFFQSxPQUFPbU47QUFDWDtBQVFPLFNBQVNuRCxhQUFhNEQsR0FBK0IsRUFDaEN0TixXQUE0QixFQUMvQixFQUNHeUssZ0JBQWtCd0osa0RBQVMsRUFDM0I1SSxlQUFrQjRJLGtEQUFTLEVBQzNCdlUsZUFBZSxFQUNFLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLElBQUltTixTQUF1QyxDQUFDO0lBRTVDLEtBQUksSUFBSVgsTUFBTW9CLElBQUs7UUFFZixNQUFNeUgsT0FBT1osU0FBUyxDQUFDakksR0FBRztRQUMxQixJQUFJQSxPQUFPLE1BQ1BBLEtBQUs7UUFFVCxJQUFJOEksS0FBTSxDQUFDOWYsTUFBY3dWLE1BQWNSO1lBQ25DLE9BQU9uUCxZQUFZN0YsTUFBTW1XLGFBQWFYLE9BQU93QixJQUFJekIsY0FBY1A7UUFDbkU7UUFFQSxJQUFJK0ssTUFBTSxDQUFDL2YsTUFBY3dWLE1BQWNSO1lBQ25DLE9BQU9uUCxZQUFZN0YsTUFBTXVWLGNBQWNQLFFBQVFnQyxJQUFJYixhQUFhWDtRQUNwRTtRQUVBLElBQUloTCxvQkFBb0I5SyxXQUFZO1lBRWhDb2dCLEtBQU0sQ0FBQzlmLE1BQWN3VixNQUFjd0s7Z0JBQy9CLE9BQU94VixnQkFBZ0J4SyxNQUFNbVcsYUFBYVgsT0FBT0QsY0FBY3lLO1lBQ25FO1lBRUEsc0JBQXNCO1lBQ3RCRCxNQUFNLENBQUMvZixNQUFjd1YsTUFBY3dLO2dCQUMvQixPQUFPeFYsZ0JBQWdCeEssTUFBTXVWLGNBQWN5SyxJQUFJN0osYUFBYVg7WUFDaEU7UUFDSjtRQUVBbUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFa0ksS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHO1lBQ3BCL1U7WUFDQU4saUJBQWlCc1Y7UUFDckI7UUFDQW5JLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRWtJLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNyQi9VO1lBQ0FOLGlCQUFpQnVWO1FBQ3JCO1FBQ0EsSUFBSTVKLGlCQUFpQjRJLGtEQUFTQSxJQUFJdlUsb0JBQW9COUssV0FDbERpWSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUVrSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDckIvVTtZQUNBTixpQkFBaUIsQ0FBQ3hLLE1BQWN3VixNQUFjUjtnQkFFMUMsTUFBTUUsY0FBY3ZVLHVDQUFNLENBQUNxVSxNQUFNO2dCQUVqQyxJQUFJZ0MsT0FBTyxPQUFPOUIsZ0JBQWdCLEdBQzlCLE9BQU9TLFdBQVczVixNQUFNLE1BQU13VjtnQkFDbEMsSUFBSXdCLE9BQU8sT0FBTzlCLGdCQUFnQixHQUM5QixPQUFPUyxXQUFXM1YsTUFBTSxNQUFNd1Y7Z0JBRWxDLE9BQU8zUCxZQUFZN0YsTUFBTXdWLE1BQU13QixLQUFHLEtBQUt6QixjQUFjUDtZQUN6RDtRQUNKO0lBQ1I7SUFFQSxPQUFPMkM7QUFDWDtBQUVPLE1BQU01RCxjQUFjO0lBQUM7SUFBTTtJQUFNO0lBQUs7SUFBSztJQUFNO0NBQUssQ0FBVTtBQUV2RSxNQUFNa00sVUFBVTtJQUNaLE1BQU07SUFDTixNQUFNO0lBQ04sS0FBSztJQUNMLEtBQUs7SUFDTCxNQUFNO0lBQ04sTUFBTTtBQUNWO0FBRU8sU0FBU2pNLFVBQVlvRSxHQUE4QyxFQUM5Q3ROLFdBQTRCLEVBQzVCLEVBQ0l5SyxnQkFBa0J3SixrREFBUyxFQUMzQjVJLGVBQWtCNEksa0RBQVMsRUFDM0J2VSxlQUFlLEVBQ0UsR0FBRyxDQUFDLENBQUM7SUFFbEQsSUFBSW1OLFNBQXVDLENBQUM7SUFFNUMsS0FBSSxNQUFNWCxNQUFNb0IsSUFBSztRQUVqQixNQUFNeUgsT0FBT1osU0FBUyxDQUFDakksR0FBRztRQUUxQixJQUFJOEksS0FBTSxDQUFDOWYsTUFBY3dWLE1BQWNSLE9BQWVrRDtZQUVsRCxJQUFJZ0ksTUFBTWxKO1lBRVYsSUFBSWYsSUFBSUUsYUFBYVg7WUFDckIsSUFBSVUsSUFBSVgsY0FBY1A7WUFDdEIsSUFBSWtELFVBQVc7Z0JBQ1gsQ0FBQ2pDLEdBQUVDLEVBQUUsR0FBRztvQkFBQ0E7b0JBQUVEO2lCQUFFO2dCQUNiaUssTUFBTUQsT0FBTyxDQUFDQyxJQUFJO1lBQ3RCO1lBRUEsSUFBSUEsR0FBRyxDQUFDLEVBQUUsS0FBSyxPQUFPQSxHQUFHLENBQUMsRUFBRSxLQUFLLEtBQU07Z0JBQ25DLElBQUl2ZCwrQ0FBVUEsQ0FBQzZTLFVBQVU3UywrQ0FBVUEsQ0FBQ3FTLFFBQ2hDa0wsTUFBTUEsTUFBTTtZQUNwQjtZQUVBLE9BQU9yYSxZQUFZN0YsTUFBTWlXLEdBQUdpSyxLQUFLaEs7UUFDckM7UUFFQSxJQUFJMUwsb0JBQW9COUssV0FBWTtZQUVoQ29nQixLQUFNLENBQUM5ZixNQUFjd1YsTUFBY3dLLEdBQVc1YjtnQkFDMUMsT0FBT29HLGdCQUFnQnhLLE1BQU1tVyxhQUFhWCxPQUFPRCxjQUFjeUssS0FBTSxTQUFTO1lBQ2xGO1FBQ0o7UUFFQXJJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRWtJLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNwQi9VO1lBQ0FOLGlCQUFpQnNWO1FBQ3JCO0lBQ0o7SUFFQSxPQUFPbkk7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaG1CaUM7QUFDMEI7QUFDdEI7QUFNOUIsTUFBTW9ILFlBQVksQ0FBQy9lLE9BQWlCQSxLQUFLO0FBRXpDLE1BQU0yVSxvQkFBb0JELHdEQUFVQSxDQUFDO0FBQ3JDLE1BQU1rQixlQUFvQjlULHdEQUFVQSxDQUFDO0FBRXJDLFNBQVNxZSxnQkFBZ0I1ZixPQUFpQjtJQUU3QyxNQUFNNmYsUUFBUSxJQUFJNWdCO0lBQ2xCLElBQUksSUFBSUYsSUFBSSxHQUFHQSxJQUFJaUIsUUFBUWpDLE1BQU0sRUFBRWdCLEtBQUcsRUFDbEM4Z0IsS0FBSyxDQUFDN2YsT0FBTyxDQUFDakIsRUFBRSxDQUFDLEdBQUdpQixPQUFPLENBQUNqQixJQUFFLEVBQUU7SUFFcEMsT0FBTyxDQUFDVTtRQUNKLE1BQU00YSxNQUFTalksK0NBQVVBLENBQUMzQztRQUMxQixNQUFNNkIsU0FBU3VlLEtBQUssQ0FBQ3hGLElBQUk7UUFDekIsSUFBSS9ZLFdBQVduQyxXQUNYLE9BQU9NO1FBRVgsZ0JBQWdCO1FBQ2hCLElBQUk0YSxRQUFRelksOENBQVNBLEVBQ2pCLE9BQU91Uyw0REFBVUEsQ0FBQzFVLE1BQU02QjtRQUM1QixJQUFJQSxXQUFXTSw4Q0FBU0EsRUFDcEIsT0FBT0wsNERBQVVBLENBQUM5QjtRQUV0QixNQUFNLElBQUlxQixNQUFNO0lBQ3BCO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQzZHO0FBSXRHLFNBQVM0UyxjQUFjK0wsQ0FBUztJQUNuQyxJQUFJN2QsOENBQVNBLElBQUk2ZCxLQUFLQSxLQUFLN0wsZ0RBQVdBLEVBQ2xDLE9BQU9MLCtDQUFVQTtJQUNyQixPQUFPaUQsMERBQXFCQTtBQUNoQztBQUVPLFNBQVNuQyxlQUFlb0wsQ0FBUztJQUNwQyxJQUFJN2QsOENBQVNBLElBQUk2ZCxLQUFLQSxLQUFLN0wsZ0RBQVdBLEVBQ2xDLE9BQU9BLGdEQUFXQTtJQUN0QixPQUFPNEMsMERBQXFCQTtBQUNoQztBQUVPLFNBQVNWLGdCQUFnQjJKLENBQVM7SUFDckMsSUFBSUEsTUFBTWxhLGdEQUFXQSxFQUNqQixPQUFPQSxnREFBV0E7SUFDdEIsT0FBT2lSLDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTbEIsV0FBV21LLENBQVM7SUFDaEMsSUFBSUEsTUFBTTdkLDhDQUFTQSxJQUFJNmQsTUFBTWxhLGdEQUFXQSxFQUNwQyxPQUFPM0QsOENBQVNBO0lBQ3BCLE9BQU80VSwwREFBcUJBO0FBQ2hDO0FBQ08sU0FBU2hCLFlBQVlpSyxDQUFTO0lBQ2pDLElBQUlBLE1BQU03ZCw4Q0FBU0EsRUFDZixPQUFPQSw4Q0FBU0E7SUFDcEIsT0FBTzRVLDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTUixhQUFheUosQ0FBUztJQUNsQyxJQUFJQSxNQUFNOUwsOENBQVNBLEVBQ2YsT0FBT0osK0NBQVVBO0lBQ3JCLE9BQU9pRCwwREFBcUJBO0FBQ2hDO0FBQ08sU0FBU1AsWUFBWXdKLENBQVM7SUFDakMsSUFBSUEsTUFBTTlMLDhDQUFTQSxFQUNmLE9BQU9BLDhDQUFTQTtJQUNwQixPQUFPNkMsMERBQXFCQTtBQUNoQztBQUNPLFNBQVNULFdBQVcwSixDQUFTO0lBQ2hDLElBQUlBLE1BQU03ZCw4Q0FBU0EsSUFBSTZkLE1BQU1sYSxnREFBV0EsRUFDcEMsT0FBT29PLDhDQUFTQTtJQUNwQixPQUFPNkMsMERBQXFCQTtBQUNoQztBQUVPLFNBQVNsQyxVQUFVelEsQ0FBUztJQUFJLE9BQU8rUCxnREFBV0E7QUFBRTtBQUNwRCxTQUFTMkIsUUFBVTFSLENBQVM7SUFBSSxPQUFPakMsOENBQVNBO0FBQUk7QUFDcEQsU0FBU2lVLFVBQVVoUyxDQUFTO0lBQUksT0FBTzBCLGdEQUFXQTtBQUFFO0FBQ3BELFNBQVNnUCxRQUFVMVEsQ0FBUztJQUFJLE9BQU84UCw4Q0FBU0E7QUFBSTtBQUUzRCxTQUFTO0FBQ0YsU0FBU21NLHdCQUVoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEQrQztBQUNLO0FBQ047QUFDRTtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKdkMsTUFBTTNWLFNBQVUsSUFBSWxMLFFBQWtCO0FBQzdDLE1BQU04Z0IsZUFBdUMsQ0FBQztBQUV2QyxTQUFTQyxpQkFBcUNwZixJQUFZO0lBQzdELE9BQU91SixNQUFNLENBQUN6SixXQUFXRSxNQUFNO0FBQ25DO0FBRU8sU0FBU0YsV0FBV0UsSUFBWTtJQUVuQyxJQUFJUyxLQUFLMGUsWUFBWSxDQUFDbmYsS0FBSztJQUMzQixJQUFJUyxPQUFPbEMsV0FBWTtRQUNuQmtDLEtBQUswZSxZQUFZLENBQUNuZixLQUFLLEdBQUd1SixPQUFPcE0sTUFBTTtRQUN2Q29NLE1BQU0sQ0FBQzlJLEdBQUcsR0FBRztZQUFDMkosVUFBVXBLO1FBQUk7SUFDaEM7SUFFQSxPQUFPUztBQUNYO0FBRU8sU0FBU2lTLFNBQVMxUyxJQUFZLEVBQUVsRCxJQUFnQztJQUVuRSxNQUFNMkQsS0FBS1gsV0FBV0U7SUFDdEJ1SSxPQUFPOEosTUFBTSxDQUFFOUksTUFBTSxDQUFDOUksR0FBRyxFQUFFM0Q7SUFDM0IsT0FBTzJEO0FBQ1g7QUFFTyxNQUFNNlIsaUJBQTJCeFMsV0FBVyxZQUFZLENBQUMsT0FBTztBQUNoRSxNQUFNa0IsWUFBMkJsQixXQUFXLE9BQU87QUFDbkQsTUFBTTZFLGNBQTJCN0UsV0FBVyxTQUFTO0FBQ3JELE1BQU02UyxhQUEyQjdTLFdBQVcsUUFBUTtBQUNwRCxNQUFNa1QsY0FBMkJsVCxXQUFXLFNBQVM7QUFDckQsTUFBTWlULFlBQTJCalQsV0FBVyxPQUFPO0FBQ25ELE1BQU04Vix3QkFBMkI5VixXQUFXLHNCQUFzQjs7Ozs7OztTQ2pDekU7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2I7QUFDb0I7QUFDUDtBQUU3QywrQkFBK0I7QUFDQztBQUU0RCIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvYm9keS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2JvZHkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yX3JhbmdlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvcl9yYW5nZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz1faW5pdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89X2luaXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvZG9wLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQ29udmVydGVycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1JldHVyblR5cGVGY3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVCdWlsdGluLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUMkpTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQVJSQVlfVFlQRSwgQVNUTk9ERVMsIENPREVfQkVHLCBDT0RFX0NPTCwgQ09ERV9FTkQsIENPREVfTElORSwgSlNfQ09ERSwgdHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGNvbnN0IENVUlNPUiA9IG5ldyBBUlJBWV9UWVBFKDIpO1xuXG5leHBvcnQgbGV0IGpzY29kZTogc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0X2pzX2N1cnNvcihpZHg6IG51bWJlcikge1xuICAgIEpTX0NPREVbaWR4ICsgQ09ERV9MSU5FXSA9IENVUlNPUltDT0RFX0xJTkVdO1xuICAgIEpTX0NPREVbaWR4ICsgQ09ERV9DT0wgXSA9IGpzY29kZSEubGVuZ3RoIC0gQ1VSU09SW0NPREVfQ09MXTtcbn1cblxuZnVuY3Rpb24gbmV3X2pzY29kZShmaWxlbmFtZTogc3RyaW5nKSB7XG5cbiAgICBqc2NvZGUgID0gYC8vIyBzb3VyY2VVUkw9JHtmaWxlbmFtZX1cXG5gO1xuICAgIGpzY29kZSArPSBgY29uc3Qge19yXywgX2JffSA9IF9fU0JSWVRIT05fXztcXG5gO1xuXG4gICAgQ1VSU09SW0NPREVfTElORV0gPSAzO1xuICAgIENVUlNPUltDT0RFX0NPTF0gPSBqc2NvZGUubGVuZ3RoO1xufVxuXG50eXBlIFByaW50YWJsZSA9IHt0b1N0cmluZygpOiBzdHJpbmd9O1xuXG5sZXQgaW5kZW50ID0gXCIgICAgXCI7XG5sZXQgY3VyX2luZGVudF9sZXZlbCA9IDA7XG4vL2xldCBjdXJfaW5kZW50ID0gXCJcIjtcblxuY29uc3QgaW5kZW50cyA9IFtcbiAgICBcIlwiLFxuICAgIFwiXCIsXG4gICAgaW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuICAgIGluZGVudCs9aW5kZW50LFxuXVxuXG5leHBvcnQgY29uc3QgTkwgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICsrQ1VSU09SW0NPREVfTElORV07XG4gICAgICAgIENVUlNPUltDT0RFX0NPTF0gPSBqc2NvZGUubGVuZ3RoICsgMTtcblxuICAgICAgICByZXR1cm4gXCJcXG5cIiArIGluZGVudHNbY3VyX2luZGVudF9sZXZlbF07XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEJCID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGluZGVudHNbKytjdXJfaW5kZW50X2xldmVsXTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgQkUgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaW5kZW50c1stLWN1cl9pbmRlbnRfbGV2ZWxdO1xuICAgIH1cbn1cblxuLy8gdHJhbnNmb3JtcyBpbnRvIGEgdGVtcGxhdGUgc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gciguLi5hcmdzOiBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLihQcmludGFibGV8bnVtYmVyKVtdXSkge1xuICAgIHJldHVybiBhcmdzO1xufVxuXG4vLyB3cml0ZSBhIHRlbXBsYXRlIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIHdyKGFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxudW1iZXIpW11dKSB7XG4gICAgaWYoIHR5cGVvZiBhcmdzID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gdyhhcmdzKTtcbiAgICByZXR1cm4gd3QoLi4uYXJncyk7XG59XG5cblxuLy8gd3JpdGUgd2l0aCB0ZW1wbGF0ZSBzdHJpbmcgd3RgYFxuZXhwb3J0IGZ1bmN0aW9uIHd0KHN0cjogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmFyZ3M6IChQcmludGFibGV8bnVtYmVyKVtdKSB7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAganNjb2RlICs9IHN0cltpXTtcbiAgICAgICAgdyhhcmdzW2ldKTtcbiAgICB9XG5cbiAgICBqc2NvZGUgKz0gc3RyW2FyZ3MubGVuZ3RoXTtcbn1cblxuLy8gZ2VuZXJpYyB3cml0ZSA/XG5leHBvcnQgZnVuY3Rpb24gdyguLi5hcmdzOiAoUHJpbnRhYmxlfG51bWJlcilbXSkge1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBsZXQgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShhcmcpICkgeyAvLyBsaWtlbHkgYSByYGBcbiAgICAgICAgICAgIHdyKGFyZyBhcyBQYXJhbWV0ZXJzPHR5cGVvZiB3cj5bMF0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggdHlwZW9mIGFyZyAhPT0gXCJudW1iZXJcIiApIHtcblxuICAgICAgICAgICAgaWYoIGFyZyA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICBhcmcgPSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgaWYoIGFyZyA9PT0gbnVsbCApXG4gICAgICAgICAgICAgICAgYXJnID0gXCJudWxsXCI7XG5cbiAgICAgICAgICAgIGpzY29kZSArPSBhcmcudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gNCphcmc7XG4gICAgICAgIFxuICAgICAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfQkVHKTtcbiAgICAgICAgQVNUMkpTW3R5cGUoYXJnKSFdKGFyZyk7XG4gICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9FTkQpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBuZXdfanNjb2RlKGFzdC5maWxlbmFtZSk7XG5cbiAgICB3KDApO1xuXG4gICAgLy8gVE9ETzogYmV0dGVyIGV4cG9ydCBzdHJhdGVneSAoPylcbiAgICBqc2NvZGUgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHt9O1xcbmA7XG5cbiAgICAvL2NvbnNvbGUud2Fybihqc2NvZGUpO1xuXG4gICAgLyoqXG4gICAgY29uc3QgbGluZXMgPSBhc3QuYm9keS5jaGlsZHJlbjtcbiAgICBjb25zdCBleHBvcnRlZCA9IG5ldyBBcnJheShsaW5lcy5sZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggbGluZXNbaV0udHlwZSA9PT0gXCJmdW5jdGlvbnMuZGVmXCIpXG4gICAgICAgIGV4cG9ydGVkW2ldID0gbGluZXNbaV0udmFsdWU7XG4gICAgfVxuICAgIGV4cG9ydGVkLmxlbmd0aCA9IG9mZnNldDtcblxuICAgIGpzY29kZSArPSBgXFxuY29uc3QgX19leHBvcnRlZF9fID0geyR7ZXhwb3J0ZWQuam9pbignLCAnKX19O1xcbmA7XG4gICAgLyoqL1xuXG5cdHJldHVybiBqc2NvZGU7XG59IiwiaW1wb3J0IHsgQkIsIEJFLCBOTCwgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoQkIpO1xuXG4gICAgY29uc3QgY29mZnNldCAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICBmb3IobGV0IGkgPSBjb2Zmc2V0OyBpIDwgbmJDaGlsZHJlbitjb2Zmc2V0OyArK2kpXG4gICAgICAgIHcoTkwsIGkpO1xuXG4gICAgdyhCRSk7XG59IiwiaW1wb3J0IHsgQk9EWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlLCB0eXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBCT0RZKTtcblxuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLmxlbmd0aDtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpICsgY29mZnNldCwgbm9kZVtpXSwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJCb2R5XCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBsZXQgYmFzZTogc3RyaW5nfG51bWJlciA9IFwiX3JfLm9iamVjdFwiO1xuXG4gICAgY29uc3QgYm9keSAgICAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICBpZiggbmJDaGlsZHJlbiA9PT0gMilcbiAgICAgICAgYmFzZSA9IGJvZHkrMTtcblxuICAgIHd0YGNsYXNzICR7VkFMVUVTW25vZGVdfSBleHRlbmRzICR7YmFzZX0geyR7Ym9keX0ke05MfX1gO1xufSIsImltcG9ydCB7IENMQVNTX0NMQVNTREVGIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgZ2V0U1R5cGVJRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0gZ2V0U1R5cGVJRChub2RlLm5hbWUpO1xuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIHNldFR5cGUoZHN0ICwgQ0xBU1NfQ0xBU1NERUYpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSAxICsgbm9kZS5iYXNlcy5sZW5ndGg7XG4gICAgY29uc3QgY29mZnNldCAgICA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X2JvZHkoY29mZnNldCwgbm9kZS5ib2R5LCBjb250ZXh0KTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbiA7ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkrY29mZnNldCwgbm9kZS5iYXNlc1tpLTFdLCBjb250ZXh0KTtcblxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS5uYW1lO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2xhc3NEZWZcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGlkeCAgPSBWQUxVRVNbbm9kZV07XG5cbiAgICBjb25zdCBsaXN0ID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBib2R5ID0gbGlzdCsxO1xuXG4gICAgd3RgZm9yKHZhciAke2lkeH0gb2YgJHtsaXN0fSl7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ09OVFJPTEZMT1dTX0ZPUiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBpZiggbm9kZS5pdGVyLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkNhbGxcIiAmJiBub2RlLml0ZXIuZnVuYy5pZCA9PT0gXCJyYW5nZVwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0XSA9IDA7IC8vVE9ET1xuXG4gICAgc2V0VHlwZShkc3QsIENPTlRST0xGTE9XU19GT1IpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDIpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQgICwgbm9kZS5pdGVyLCBjb250ZXh0KTtcbiAgICBjb252ZXJ0X2JvZHkoY29mZnNldCsxLCBub2RlLmJvZHksIGNvbnRleHQpO1xuXG4gICAgVkFMVUVTW2RzdF0gPSB0YXJnZXQ7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGlkeCAgPSBWQUxVRVNbbm9kZV07XG5cbiAgICBjb25zdCBib2R5ICAgICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIGxldCBiZWcgOiBzdHJpbmd8bnVtYmVyfGFueSAgPSBcIjBuXCI7XG4gICAgbGV0IGluY3I6IHN0cmluZ3xudW1iZXJ8YW55ICA9IFwiMW5cIjtcblxuICAgIGxldCBlbmQgPSBOdW1iZXIySW50KGJvZHkrMSk7XG5cbiAgICBpZiggbmJDaGlsZHJlbiA+IDIpIHtcbiAgICAgICAgYmVnID0gZW5kO1xuICAgICAgICBlbmQgPSBOdW1iZXIySW50KGJvZHkrMSk7XG4gICAgfVxuXG4gICAgaWYoIG5iQ2hpbGRyZW4gPT09IDQpXG4gICAgICAgIGluY3IgPSBOdW1iZXIySW50KGJvZHkrMik7XG5cbiAgICByZXR1cm4gd3RgZm9yKHZhciAke2lkeH0gPSAke2JlZ307ICR7aWR4fSA8ICR7ZW5kfTsgJHtpZHh9ICs9ICR7aW5jcn0peyR7Ym9keX0ke05MfX1gO1xufSIsImltcG9ydCB7IENPTlRST0xGTE9XU19GT1JfUkFOR0UgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBpZiggbm9kZS5pdGVyLmNvbnN0cnVjdG9yLiRuYW1lICE9PSBcIkNhbGxcIiB8fCBub2RlLml0ZXIuZnVuYy5pZCAhPT0gXCJyYW5nZVwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0XSA9IDA7IC8vVE9ET1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLnZhbHVlXSA9IFNUWVBFX0lOVDtcbiAgICAvLyBUT0RPOiBqc2ludCBvcHRpIGlmIHRoaXMudmFsdWUgbm90IHVzZWQuLi5cblxuICAgIGNvbnN0IGFyZ3MgPSBub2RlLml0ZXIuYXJncztcblxuICAgIHNldFR5cGUoZHN0LCBDT05UUk9MRkxPV1NfRk9SX1JBTkdFKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gYXJncy5sZW5ndGggKyAxO1xuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgY29udmVydF9ib2R5KGNvZmZzZXQsIG5vZGUuYm9keSwgY29udGV4dCk7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5iQ2hpbGRyZW4gOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpK2NvZmZzZXQsIGFyZ3NbaS0xXSwgY29udGV4dCk7XG5cbiAgICBWQUxVRVNbZHN0XSA9IHRhcmdldDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGxldCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBsZXQgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICAvLyBpZlxuICAgIHd0YGlmKCR7Y29mZnNldCsrfSl7JHtjb2Zmc2V0Kyt9JHtOTH19YDtcblxuICAgIC8vIGVsc2UgaWZcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDI7IGkgPCBuYkNoaWxkcmVuIC0gMTsgaSArPSAyKSB7XG4gICAgICAgIHd0YGVsc2UgaWYoJHtjb2Zmc2V0Kyt9KXske2NvZmZzZXQrK30ke05MfX1gO1xuICAgIH1cblxuICAgIC8vIGVsc2VcbiAgICBpZiggaSA9PT0gbmJDaGlsZHJlbiAtIDEgKVxuICAgICAgICB3dGBlbHNlIHske2NvZmZzZXR9JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBDT05UUk9MRkxPV1NfSUZCTE9DSyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkQ291bnQgPSAyO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICkge1xuXG4gICAgICAgIGlmKCAhIChcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSApIHsgLy8gZmluYWwgZWxzZVxuICAgICAgICAgICAgKytjaGlsZENvdW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY2hpbGRDb3VudCArPSAyO1xuICAgIH1cblxuICAgIHNldFR5cGUoZHN0LCBDT05UUk9MRkxPV1NfSUZCTE9DSyk7XG4gICAgbGV0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIGNoaWxkQ291bnQpO1xuXG4gICAgLy8gaWZcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsrLCBub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgIGNvbnZlcnRfYm9keShjb2Zmc2V0KyssIG5vZGUuYm9keSwgY29udGV4dCk7XG5cbiAgICAvLyBlbHNlIGlmXG4gICAgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgLy8gY3VyLm9yZWxzZVswXSBpcyB0aGUgYm9keVxuICAgICAgICBpZiggISAoXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkgKSB7IC8vIGZpbmFsIGVsc2VcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0LCBjdXIub3JlbHNlLCBjb250ZXh0KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuXG4gICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0KyssIGN1ci50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgY29udmVydF9ib2R5KGNvZmZzZXQrKywgY3VyLmJvZHksIGNvbnRleHQpO1xuXG4gICAgICAgIGNoaWxkQ291bnQgKz0gMjtcbiAgICB9XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgY29mZnNldCA9IGZpcnN0Q2hpbGQobm9kZSk7XG5cbiAgICB3dGAoJHtjb2Zmc2V0fSA/ICR7Y29mZnNldCsxfSA6ICR7Y29mZnNldCsyfSlgO1xufSIsImltcG9ydCB7IENPTlRST0xGTE9XU19URVJOQVJZIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHJlc3VsdFR5cGUsIHNldFJlc3VsdFR5cGUsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMyk7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCAgLCBub2RlLnRlc3QgICwgY29udGV4dCk7XG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQrMSwgbm9kZS5ib2R5ICAsIGNvbnRleHQpOyAvLyB0cnVlXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQrMiwgbm9kZS5vcmVsc2UsIGNvbnRleHQpOyAvLyBmYWxzZVxuXG4gICAgc2V0VHlwZShkc3QgLCBDT05UUk9MRkxPV1NfVEVSTkFSWSk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdFR5cGUoY29mZnNldCsxKSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZkV4cFwiOyIsImltcG9ydCB7IEJCLCBCRSwgTkwsIHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgY29mZnNldCAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICB3dGB0cnkgeyR7Y29mZnNldH0ke05MfX1gO1xuICAgIHd0YGNhdGNoKF9yYXdfZXJyXyl7JHtCQn0ke05MfWA7XG5cbiAgICAgICAgdyhcImNvbnN0IF9lcnJfID0gX2JfLmdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfLCBfX1NCUllUSE9OX18pXCIpO1xuXG4gICAgICAgIGlmKCBuYkNoaWxkcmVuID4gMSlcbiAgICAgICAgICAgIHcoIDErY29mZnNldCApO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDI7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgICAgICB3KE5MLCBcImVsc2UgXCIsIGkgKyBjb2Zmc2V0ICk7XG5cbiAgICAgICAgLy8gbm90IGEgY2F0Y2ggYWxsLi4uXG4gICAgICAgIGlmKCBuYkNoaWxkKGNvZmZzZXQgKyBuYkNoaWxkcmVuLTEpICE9PSAxKVxuICAgICAgICAgICAgdyhOTCwgXCJlbHNlIHsgdGhyb3cgX3Jhd19lcnJfIH1cIik7XG5cbiAgICB3KEJFLCBOTCk7XG5cbn0iLCJpbXBvcnQgeyBDT05UUk9MRkxPV1NfVFJZQkxPQ0sgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLmhhbmRsZXJzLmxlbmd0aCsxO1xuXG4gICAgc2V0VHlwZShkc3QsIENPTlRST0xGTE9XU19UUllCTE9DSyk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbilcblxuICAgIC8vIHRyeSBib2R5XG4gICAgY29udmVydF9ib2R5KGNvZmZzZXQsIG5vZGUuYm9keSwgY29udGV4dCk7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICBjb252ZXJ0X25vZGUoaStjb2Zmc2V0LCBub2RlLmhhbmRsZXJzW2ktMV0sIGNvbnRleHQpO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIC8vIGVsc2UgaXMgaGFuZGxlZCBieSB0cnlibG9ja1xuICAgIGlmKG5iQ2hpbGRyZW4gPT09IDEpXG4gICAgICAgIHJldHVybiB3dGB7JHtjb2Zmc2V0fSR7Tkx9fWA7XG5cbiAgICB3dGBpZigke2NvZmZzZXQrMX0peyR7Y29mZnNldH0ke05MfX1gO1xufSIsImltcG9ydCB7IENPTlRST0xGTE9XU19UUllCTE9DS19DQVRDSCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbmJDaGlsZHJlbiA9IDE7XG4gICAgaWYoIG5vZGUudHlwZSAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgbmJDaGlsZHJlbiA9IDI7XG5cbiAgICBzZXRUeXBlKGRzdCwgQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIKTtcbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKTtcblxuICAgIGNvbnZlcnRfYm9keShjb2Zmc2V0LCBub2RlLmJvZHksIGNvbnRleHQpO1xuICAgIGlmKCBuYkNoaWxkcmVuID09PSAyKVxuICAgICAgICBjb252ZXJ0X25vZGUoY29mZnNldCsxLCBub2RlLnR5cGUsIGNvbnRleHQpO1xuICAgIFxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS5uYW1lO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCB7IFNZTUJPTCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuXG5mdW5jdGlvbiBmaWx0ZXJfc3RhY2soc3RhY2s6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBzdGFjay5maWx0ZXIoIGUgPT4gZS5pbmNsdWRlcygnYnJ5dGhvbl8nKSApOyAvL1RPRE8gaW1wcm92ZXMuLi5cbn1cblxuLy9UT0RPOiB1c2Ugfj1zb3VyY2VtYXAuLi5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IGFueSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8bnVtYmVyIHtcblxuICAvL1RPRE8uLi5cbiAgLypcbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuKi9cblxuICByZXR1cm4gbnVsbDsgLy90aHJvdyBuZXcgRXJyb3IoXCJub2RlIG5vdCBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrbGluZTJhc3Rub2RlKHN0YWNrbGluZTogU3RhY2tMaW5lLCBzYjogU0JyeXRob24pOiBudW1iZXIge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IG51bWJlcltdIHtcbiAgcmV0dXJuIHN0YWNrLm1hcCggZSA9PiBzdGFja2xpbmUyYXN0bm9kZShlLCBzYikgKTtcbn1cblxuLy9UT0RPOiBhZGQgZmlsZS4uLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3N0YWNrKHN0YWNrOiBhbnksIHNiOiBTQnJ5dGhvbik6IFN0YWNrTGluZVtdIHtcblxuXG4gIFxuICAgIHN0YWNrID0gc3RhY2suc3BsaXQoXCJcXG5cIik7XG5cbiAgICBjb25zdCBpc1Y4ID0gc3RhY2tbMF09PT0gXCJFcnJvclwiOyBcblxuICAgIHJldHVybiBmaWx0ZXJfc3RhY2soc3RhY2spLm1hcCggbCA9PiB7XG5cbiAgICAgIGxldCBbXywgX2xpbmUsIF9jb2xdID0gbC5zcGxpdCgnOicpO1xuICBcbiAgICAgIGlmKCBfY29sW19jb2wubGVuZ3RoLTFdID09PSAnKScpIC8vIFY4XG4gICAgICAgIF9jb2wgPSBfY29sLnNsaWNlKDAsLTEpO1xuICBcbiAgICAgIGxldCBsaW5lID0gK19saW5lIC0gMjtcbiAgICAgIGxldCBjb2wgID0gK19jb2w7XG5cbiAgICAgIC0tY29sOyAvL3N0YXJ0cyBhdCAxLlxuXG4gICAgICBsZXQgZmN0X25hbWUhOiBzdHJpbmc7XG4gICAgICBpZiggaXNWOCApIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZihcIiBcIiwgNyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSg3LCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiZXZhbFwiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCBmaWxlbmFtZS5cbiAgICAgICAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZiggdHlwZShub2RlKSA9PT0gU1lNQk9MKVxuICAgICAgICAgIGNvbCArPSBWQUxVRVNbbm9kZV0ubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIC8vIG5vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lXG4gICAgY29uc3Qgc3RhY2tfc3RyID0gc3RhY2subWFwKCAobCxpKSA9PiBgRmlsZSBcIltmaWxlXVwiLCBsaW5lICR7MH0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmZ1bmN0aW9uIGdldF9weV9leGNlcHRpb24oX3Jhd19lcnJfOiBhbnksIF9fU0JSWVRIT05fXzogYW55KSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcbiAgICAgICAgICAgICAgPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIDogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1xuXG4gIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKTtcbiAgXG4gIHJldHVybiBfZXJyXztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvbixcbiAgICBnZXRfcHlfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgd3Rgd2hpbGUoJHtjb2Zmc2V0fSl7JHtjb2Zmc2V0KzF9JHtOTH19fWA7XG59IiwiaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1dISUxFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBzZXRUeXBlKGRzdCwgQ09OVFJPTEZMT1dTX1dISUxFKTtcbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAyKTtcblxuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0ICAsIG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgY29udmVydF9ib2R5KGNvZmZzZXQrMSwgbm9kZS5ib2R5LCBjb250ZXh0KTtcblxufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyBzZXRfanNfY3Vyc29yLCB3LCB3ciwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDT0RFX0JFRywgQ09ERV9FTkQsIGZpcnN0Q2hpbGQsIG5iQ2hpbGQsIHJlc3VsdFR5cGUsIHR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0FSR1NfS1dBUkcsIEZVTkNUSU9OU19BUkdTX1ZBUkcgfSBmcm9tIFwiLi9hc3Rjb252ZXJ0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICBcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIGNvbnN0IFNUeXBlX2ZjdCA9IFZBTFVFU1tub2RlXSEgYXMgU1R5cGVGY3Q7XG5cbiAgICBjb25zdCBtZXRhID0gU1R5cGVfZmN0Ll9fY2FsbF9fO1xuXG4gICAgbGV0IGt3X3N0YXJ0ID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZigga3dfc3RhcnQgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApXG4gICAgICAgIGt3X3N0YXJ0ID0gbWV0YS5pZHhfdmFyYXJnICsgMTtcblxuICAgIGlmKCBtZXRhLmt3YXJncyAhPT0gdW5kZWZpbmVkICYmIGt3X3N0YXJ0ID09PSBuYkNoaWxkcmVuIC0gMSlcbiAgICAgICAgKytrd19zdGFydDtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IG5iQ2hpbGRyZW4gOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICB3KFwiLCBcIik7XG5cbiAgICAgICAgaWYoIGt3X3N0YXJ0ID09PSBpKVxuICAgICAgICAgICAgdyhcIntcIik7XG5cbiAgICAgICAgY29uc3QgaXNMYXN0ID0gaSA9PT0gbWV0YS5pZHhfdmFyYXJnICYmIGkgPT09IG5iQ2hpbGRyZW4tMTtcbiAgICAgICAgd3JpdGVfYXJnKGkgKyBjb2Zmc2V0LCBpc0xhc3QpO1xuICAgIH1cblxuICAgIGlmKCBrd19zdGFydCA8IG5iQ2hpbGRyZW4pXG4gICAgICAgIHcoJ30gPSB7fScpO1xufVxuXG5mdW5jdGlvbiB3cml0ZV9hcmcobm9kZTogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pIHtcbiAgICBcbiAgICBjb25zdCBvZmZzZXQgPSA0Km5vZGU7XG4gICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0JFRyk7XG5cbiAgICBjb25zdCBuYW1lID0gVkFMVUVTW25vZGVdO1xuICAgIGNvbnN0IHR5cGVfaWQgPSB0eXBlKG5vZGUpO1xuXG4gICAgaWYoIHR5cGVfaWQgPT09IEZVTkNUSU9OU19BUkdTX1ZBUkcgKSB7XG4gICAgICAgIGlmKCBpc0xhc3QgKVxuICAgICAgICAgICAgd3RgLi4uJHtuYW1lfWA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBuYW1lLCAnPScsIFwiW11cIikgKTtcbiAgICB9IGVsc2UgaWYoIHR5cGVfaWQgPT09IEZVTkNUSU9OU19BUkdTX0tXQVJHICkge1xuICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbmFtZSwgJz0nLCBcInt9XCIpICk7XG4gICAgfSBlbHNlIGlmKCBuYkNoaWxkKG5vZGUpID09PSAxICkge1xuXG4gICAgICAgIGxldCBkZWZ2YWw6IGFueSA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgICAgIGlmKCByZXN1bHRUeXBlKGRlZnZhbCkgPT09IFNUWVBFX0pTSU5UIClcbiAgICAgICAgICAgIGRlZnZhbCA9IE51bWJlcjJJbnQoZGVmdmFsKTtcblxuICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbmFtZSwgJz0nLCBkZWZ2YWwpICk7XG4gICAgfWVsc2Uge1xuICAgICAgICB3KG5hbWUpO1xuICAgIH1cblxuICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9FTkQpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSwgc2V0X3B5X2NvZGUsIHNldF9weV9mcm9tX2JlZ19lbmQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBGVU5DVElPTlNfQVJHUyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBDT0RFX0JFR19DT0wsIENPREVfQkVHX0xJTkUsIENPREVfRU5EX0NPTCwgQ09ERV9FTkRfTElORSwgUFlfQ09ERSwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG4vL1RPRE86IGZha2Ugbm9kZS4uLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydCgpIHtcbiAgICAvLyBhcmdzIG5vZGUgZG9lc24ndCBleGlzdC4uLlxuICAgIHJldHVybjtcbn1cblxuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX1BPU09OTFkgPSAwO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX0tXQVJHICAgPSAxO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX0tXT05MWSAgPSAyO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX1ZBUkcgICAgPSAzO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTX1BPUyAgICAgPSA0O1xuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJhcmd1bWVudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJncyhkc3Q6IG51bWJlciwgbm9kZTogYW55LCBTVHlwZV9mY3Q6IFNUeXBlRmN0LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBtZXRhID0gU1R5cGVfZmN0Ll9fY2FsbF9fO1xuXG4gICAgLy8gY29tcHV0ZSB0b3RhbCBhcmdzLi4uXG4gICAgY29uc3QgX2FyZ3MgPSBub2RlLmFyZ3M7XG4gICAgY29uc3QgaGFzX3ZhcmFyZyA9IF9hcmdzLnZhcmFyZyAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGhhc19rd2FyZyAgPSBfYXJncy5rd2FyZyAgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBhcmdzX3BvcyAgID0gbWV0YS5hcmdzX3BvcztcbiAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuXG4gICAgY29uc3QgdG90YWxfYXJncyA9IF9hcmdzLnBvc29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5hcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX3ZhcmFyZ1xuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5rd29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX2t3YXJnO1xuXG4gICAgc2V0VHlwZShkc3QsIEZVTkNUSU9OU19BUkdTKTtcbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCB0b3RhbF9hcmdzKTsgLy8gYXJnc1xuXG4gICAgY29uc3QgcG9zX2RlZmF1bHRzID0gbm9kZS5hcmdzLmRlZmF1bHRzO1xuICAgIGNvbnN0IHBvc29ubHkgPSBfYXJncy5wb3Nvbmx5YXJncztcbiAgICBjb25zdCBwb3MgICAgID0gX2FyZ3MuYXJncztcblxuICAgIC8vIHBvc29ubHlcbiAgICBsZXQgZG9mZnNldCA9IHBvc19kZWZhdWx0cy5sZW5ndGggLSBwb3Nvbmx5Lmxlbmd0aCAtIHBvcy5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvc29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnZlcnRfYXJnKGkgKyBjb2Zmc2V0LCBwb3Nvbmx5W2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBGVU5DVElPTlNfQVJHU19QT1NPTkxZLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3Bvc29ubHlbaV0uYXJnXSA9IHJlc3VsdFR5cGUoaStjb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyBwb3NcbiAgICBsZXQgb2Zmc2V0ID0gcG9zb25seS5sZW5ndGg7XG4gICAgICBkb2Zmc2V0IC09IHBvc29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIFxuICAgICAgICBjb252ZXJ0X2FyZyhvZmZzZXQgKyBjb2Zmc2V0LCBwb3NbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIEZVTkNUSU9OU19BUkdTX1BPUywgY29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBhcmdzX25hbWVzW29mZnNldCsrXSA9IHBvc1tpXS5hcmc7XG4gICAgfVxuXG4gICAgbWV0YS5pZHhfdmFyYXJnID0gb2Zmc2V0O1xuXG4gICAgLy8gdmFyYXJnXG4gICAgaWYoIGhhc192YXJhcmcgKSB7XG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgY29udmVydF9hcmcob2Zmc2V0ICsgY29mZnNldCwgX2FyZ3MudmFyYXJnLCB1bmRlZmluZWQsIEZVTkNUSU9OU19BUkdTX1ZBUkcsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgKytvZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbmJfcG9zX2RlZmF1bHRzID0gTWF0aC5taW4ocG9zX2RlZmF1bHRzLmxlbmd0aCwgcG9zLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGhhc19vdGhlcnMgPSBwb3NfZGVmYXVsdHMubGVuZ3RoID4gcG9zLmxlbmd0aCB8fCB0b3RhbF9hcmdzICE9PSBvZmZzZXQ7XG5cbiAgICAgICAgaWYoIG5iX3Bvc19kZWZhdWx0cyA+IDEgfHwgbmJfcG9zX2RlZmF1bHRzID09PSAxICYmIGhhc19vdGhlcnMpXG4gICAgICAgICAgICBtZXRhLmlkeF9lbmRfcG9zIC09IG5iX3Bvc19kZWZhdWx0cztcbiAgICB9XG5cbiAgICBsZXQgY3V0X29mZiAgID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZiggY3V0X29mZiA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKVxuICAgICAgICBjdXRfb2ZmID0gbWV0YS5pZHhfdmFyYXJnO1xuICAgIGZvcihsZXQgaSA9IHBvc29ubHkubGVuZ3RoOyBpIDwgY3V0X29mZjsgKytpKVxuICAgICAgICBhcmdzX3Bvc1tWQUxVRVNbaSArIGNvZmZzZXRdXSA9IGk7XG5cbiAgICBjb25zdCBlbmQgPSBtZXRhLmlkeF92YXJhcmcgLSBjdXRfb2ZmO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmQ7ICsraSlcbiAgICAgICAgYXJnc19wb3NbVkFMVUVTW2kgKyBjb2Zmc2V0XV0gPSAtMTtcblxuICAgIC8vVE9ETzogaWR4X2VuZF9wb3MgKGlmIGRlZmF1bHQgYW5kIG5vIGlkeF92YXJhcmcpXG5cbiAgICAvLyBrd29ubHlcbiAgICBjb25zdCBrd29ubHkgICAgICA9IF9hcmdzLmt3b25seWFyZ3M7XG4gICAgY29uc3Qga3dfZGVmYXVsdHMgPSBfYXJncy5rd19kZWZhdWx0cztcblxuICAgIG1ldGEuaGFzX2t3ID0gbWV0YS5pZHhfdmFyYXJnICE9PSBjdXRfb2ZmIHx8IGt3b25seS5sZW5ndGggIT09IDA7XG5cbiAgICBkb2Zmc2V0ID0ga3dfZGVmYXVsdHMubGVuZ3RoIC0ga3dvbmx5Lmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwga3dvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBcbiAgICAgICAgY29udmVydF9hcmcob2Zmc2V0ICsgY29mZnNldCwga3dvbmx5W2ldLCBrd19kZWZhdWx0c1tpXSwgRlVOQ1RJT05TX0FSR1NfS1dPTkxZLCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGFyZ3NfcG9zW2t3b25seVtpXS5hcmddID0gLTE7XG5cbiAgICAgICAgKytvZmZzZXQ7XG4gICAgfVxuXG4gICAgLy8ga3dhcmdcbiAgICBpZiggaGFzX2t3YXJnICkge1xuICAgICAgICBcbiAgICAgICAgY29udmVydF9hcmcob2Zmc2V0ICsgY29mZnNldCwgX2FyZ3Mua3dhcmcsIHVuZGVmaW5lZCwgRlVOQ1RJT05TX0FSR1NfS1dBUkcsIGNvbnRleHQpO1xuXG4gICAgICAgIG1ldGEua3dhcmdzID0gX2FyZ3Mua3dhcmcuYXJnO1xuXG4gICAgICAgICsrb2Zmc2V0O1xuICAgIH1cblxuICAgIC8vVE9ETy4uLlxuICAgIC8qXG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuICAgICovXG5cbiAgICAvL1RPRE8uLi5cblxuICAgIFZBTFVFU1tkc3RdID0gU1R5cGVfZmN0O1xuICAgIFxuICAgIGlmKCB0b3RhbF9hcmdzICE9PSAwKSB7XG5cbiAgICAgICAgc2V0X3B5X2Zyb21fYmVnX2VuZChkc3QsIGNvZmZzZXQsIGNvZmZzZXQgKyB0b3RhbF9hcmdzIC0gMSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBjb25zdCBweV9vZmZzZXQgPSA0KmRzdDtcbiAgICAgICAgUFlfQ09ERVsgcHlfb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdID0gUFlfQ09ERVsgcHlfb2Zmc2V0ICsgQ09ERV9FTkRfTElORSBdID0gbm9kZS5saW5lbm87XG4gICAgICAgIFBZX0NPREVbIHB5X29mZnNldCArIENPREVfQkVHX0NPTCAgXSA9IFBZX0NPREVbIHB5X29mZnNldCArIENPREVfRU5EX0NPTCAgXSA9IGNvbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmcoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6bnVtYmVyLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBuYW1lID0gbm9kZS5hcmc7XG5cbiAgICAvL1RPRE86IGNvbnZlcnQgYW5ub3RhdGlvbiB0eXBlLi4uXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZS5hbm5vdGF0aW9uPy5pZDsgXG5cbiAgICBpZiggZGVmdmFsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSk7XG4gICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0LCBkZWZ2YWwsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSByZXN1bHRUeXBlKGNvZmZzZXQpO1xuICAgICAgICAgICAgaWYocmVzdWx0X3R5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gU1RZUEVfSU5UO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VHlwZShkc3QsIHR5cGUpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZXN1bHRfdHlwZSk7XG5cbiAgICBWQUxVRVNbZHN0XSA9IG5hbWU7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25hbWVdID0gcmVzdWx0X3R5cGU7XG5cbiAgICBzZXRfcHlfY29kZShkc3QsIG5vZGUpO1xufSIsImltcG9ydCB7IHIsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0NBTExfS0VZV09SRCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQsIHR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZnVuY3Rpb24gcHJpbnRfb2JqKG9iajogUmVjb3JkPHN0cmluZywgYW55Pikge1xuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgaWYoa2V5cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW11dO1xuXG4gICAgY29uc3Qgc3RyID0gbmV3IEFycmF5KGtleXMubGVuZ3RoKzEpO1xuICAgIHN0clswXSA9IGB7JHtrZXlzWzBdfTogYDtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gID0gYCwgJHtrZXlzW2ldfTogYDtcblxuICAgIHN0cltpXSA9IFwifVwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLk9iamVjdC52YWx1ZXMob2JqKV07XG59XG5cbmZ1bmN0aW9uIGpvaW4oZGF0YTogYW55W10sIHNlcD1cIiwgXCIpIHtcblxuICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gW1tcIlwiXV07XG5cbiAgICBjb25zdCBzdHIgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgrMSk7XG4gICAgc3RyWzBdID0gXCJcIjtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgKytpKVxuICAgICAgICBzdHJbaV0gPSBzZXA7XG4gICAgc3RyW2ldID0gXCJcIjtcblxuICAgIHJldHVybiBbc3RyLCAuLi5kYXRhXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRfY2FsbChub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IG1ldGEgPSAoVkFMVUVTW25vZGVdIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcblxuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpO1xuXG4gICAgbGV0IGt3X3BvcyA9IG5iQ2hpbGRyZW47XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgaWYoIHR5cGUoIGkgKyBjb2Zmc2V0KSA9PT0gRlVOQ1RJT05TX0NBTExfS0VZV09SRCkge1xuICAgICAgICAgICAga3dfcG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICBsZXQgbmJfcG9zID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZiggbmJfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIG5iX3BvcyA9IE1hdGgubWF4KG1ldGEuaWR4X3ZhcmFyZywga3dfcG9zLTEpO1xuXG4gICAgbGV0IHBvc19zaXplID0gbmJfcG9zKzE7XG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApXG4gICAgICAgIHBvc19zaXplID0gbWV0YS5pZHhfdmFyYXJnKzI7XG4gICAgbGV0IHBvcyA9IG5ldyBBcnJheShwb3Nfc2l6ZSk7XG4gICAgXG4gICAgY29uc3Qga3cgICAgOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gICAgY29uc3Qga3dhcmdzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5cbiAgICBsZXQgaGFzX2t3ID0gZmFsc2U7XG5cbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZICkge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbWV0YS5pZHhfdmFyYXJnKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgY3V0b2ZmOyArK2kpXG4gICAgICAgICAgICBwb3NbaS0xXSA9IGkgKyBjb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IHZhcmdfc3RhcnQgPSBtZXRhLmlkeF92YXJhcmcrMTtcbiAgICAgICAgY29uc3QgdmFyZ19uYiA9IGt3X3BvcyAtIHZhcmdfc3RhcnQ7XG4gICAgICAgIGlmKCB2YXJnX25iICE9PSAwICkge1xuXG4gICAgICAgICAgICAvLyB0ZW1wbGF0ZSBzdHJpbmcuLi4gWyBbLi5zdHJdLCAuLi5pZHggXVxuICAgICAgICAgICAgLy8gPT4gWyAoYSksIChiKSwgKGMpLCAoZCkgXSAuLi5cbiAgICAgICAgICAgIGxldCBzdHIgPSBuZXcgQXJyYXkodmFyZ19uYiArIDEpO1xuICAgICAgICAgICAgbGV0IGlkeCA9IG5ldyBBcnJheSh2YXJnX25iICsgMSk7XG5cbiAgICAgICAgICAgIHN0clswXSAgICAgICA9IFwiW1wiO1xuXG4gICAgICAgICAgICBpZHhbMF0gICAgICAgPSBzdHI7XG4gICAgICAgICAgICBpZHhbMV0gICAgICAgPSBjb2Zmc2V0ICsgdmFyZ19zdGFydDtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YXJnX25iOyArK2kpIHtcbiAgICAgICAgICAgICAgICBzdHJbaV0gID0gXCIsIFwiO1xuICAgICAgICAgICAgICAgIGlkeFtpKzFdPSBjb2Zmc2V0ICsgdmFyZ19zdGFydCArIGk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0clt2YXJnX25iXSA9IFwiXVwiOyAvLyBwcmV2ZW50cyBzcGFyc2UgYXJyYXkgP1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG5iX3BvcysxKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgY3V0b2ZmOyArK2kpXG4gICAgICAgICAgICBwb3NbaS0xXSA9IGkgKyBjb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IGFyZ3NfbmFtZXMgPSBtZXRhLmFyZ3NfbmFtZXM7XG4gICAgICAgIGZvcihsZXQgaSA9IGN1dG9mZjsgaSA8IGt3X3BvczsgKytpKVxuICAgICAgICAgICAga3dbIGFyZ3NfbmFtZXNbaS0xXSBdID0gaSArIGNvZmZzZXQ7XG5cbiAgICAgICAgaGFzX2t3ID0gY3V0b2ZmICE9PSBrd19wb3M7XG4gICAgfVxuXG4gICAgbGV0IGhhc19rd2FyZ3MgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFyZ3NfcG9zID0gbWV0YS5hcmdzX3BvcztcbiAgICBcblxuICAgIGZvcihsZXQgaSA9IGt3X3BvczsgaSA8IG5iQ2hpbGRyZW47ICsraSkge1xuXG4gICAgICAgIGNvbnN0IGFyZyAgPSBpICsgY29mZnNldDtcbiAgICAgICAgY29uc3QgbmFtZSA9IFZBTFVFU1thcmddO1xuICAgICAgICBjb25zdCBpZHggID0gYXJnc19wb3NbIG5hbWUgXTtcblxuICAgICAgICBpZiggaWR4ID49IDAgKSB7XG4gICAgICAgICAgICBwb3NbaWR4XSA9IGFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzX2t3ID0gdHJ1ZTtcblxuICAgICAgICBpZiggaWR4ID09PSAtMSlcbiAgICAgICAgICAgIGt3W25hbWVdID0gYXJnO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGt3YXJnc1tuYW1lXSA9IGFyZztcbiAgICAgICAgICAgIGhhc19rd2FyZ3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG9iajogUmVjb3JkPHN0cmluZywgYW55PiA9IGt3O1xuICAgIC8vVE9ETzogb25seSB0aGUgb25lcyBhdCAtMS4uLlxuICAgIGlmKCBoYXNfa3dhcmdzICYmICEgbWV0YS5oYXNfa3cgKXtcbiAgICAgICAgb2JqID0ga3dhcmdzO1xuICAgIH0gZWxzZSBpZiggaGFzX2t3YXJncyApIHtcbiAgICAgICAgb2JqW21ldGEua3dhcmdzIV0gPSBwcmludF9vYmooa3dhcmdzKTtcbiAgICB9XG5cbiAgICBpZiggaGFzX2t3IClcbiAgICAgICAgcG9zW3Bvcy5sZW5ndGgtMV0gPSBwcmludF9vYmoob2JqKTtcbiAgICBlbHNlIHtcbiAgICAgICAgd2hpbGUocG9zLmxlbmd0aCA+IDAgJiYgcG9zW3Bvcy5sZW5ndGgtMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC0tcG9zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke2NvZmZzZXR9KCR7am9pbihwb3MpfSlgOyAvLyBhcmdzID9cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIHdyKCAoVkFMVUVTW25vZGVdIGFzIFNUeXBlRmN0KS5fX2NhbGxfXy5zdWJzdGl0dXRlX2NhbGwhKG5vZGUpICk7XG59IiwiaW1wb3J0IHsgRlVOQ1RJT05TX0NBTEwgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG4gICAgY29uc3QgZmN0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0hO1xuICAgIGlmKCBmY3RfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBjb25zb2xlLndhcm4obm9kZSk7XG4gICAgICAgIGNvbnNvbGUud2Fybihjb250ZXh0LmxvY2FsX3N5bWJvbHMpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uICR7bmFtZX0gbm90IGRlZmluZWRgKTtcbiAgICB9XG5cbiAgICBjb25zdCBmY3QgPSBTVHlwZXNbZmN0X3R5cGVdO1xuICAgIGNvbnN0IHJldF90eXBlID0gKGZjdC5fX2NhbGxfXyBhcyBTVHlwZUZjdFN1YnMpLnJldHVybl90eXBlKCk7XG5cbiAgICBzZXRUeXBlICAgICAgKGRzdCwgRlVOQ1RJT05TX0NBTEwpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZXRfdHlwZSk7XG4gICAgbGV0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEgKyBub2RlLmFyZ3MubGVuZ3RoICsgbm9kZS5rZXl3b3Jkcy5sZW5ndGgpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQrKywgbm9kZS5mdW5jLCBjb250ZXh0ICk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5hcmdzLmxlbmd0aDsgKytpKVxuICAgICAgICBjb252ZXJ0X25vZGUoY29mZnNldCsrLCBub2RlLmFyZ3NbaV0sIGNvbnRleHQgKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXl3b3Jkcy5sZW5ndGg7ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGNvZmZzZXQrKywgbm9kZS5rZXl3b3Jkc1tpXSwgY29udGV4dCApO1xuXG4gICAgVkFMVUVTW2RzdF0gPSBmY3Q7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDYWxsXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoIGZpcnN0Q2hpbGQobm9kZSkgKTtcbn0iLCJpbXBvcnQgeyBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHJlc3VsdFR5cGUsIHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBzZXRUeXBlKGRzdCwgRlVOQ1RJT05TX0NBTExfS0VZV09SRCk7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAxKTtcbiAgICBjb252ZXJ0X25vZGUgKGNvZmZzZXQsIG5vZGUudmFsdWUsIGNvbnRleHQgKVxuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZXN1bHRUeXBlKGNvZmZzZXQpKTtcblxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS5hcmc7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJrZXl3b3JkXCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBuYW1lID0gVkFMVUVTW25vZGVdO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgd3RgZnVuY3Rpb24gJHtuYW1lfSgke2NvZmZzZXR9KXske2NvZmZzZXQrMX0ke05MfX1gO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGVJRCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBkZWZhdWx0X2NhbGwgfSBmcm9tIFwiLi4vY2FsbC9hc3QyanNcIjtcbmltcG9ydCB7IGNvbnZlcnRfYXJncyB9IGZyb20gXCIuLi9hcmdzL2FzdGNvbnZlcnRcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19ERUYgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgbmJDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG4vLyByZXF1aXJlZCBhcyBzb21lIHN5bWJvbHMgbWF5IGhhdmUgYmVlbiBkZWNsYXJlZCBvdXQgb2Ygb3JkZXJcbi8vIChub3Qgb25seSBmb3IgcmV0dXJuIHR5cGUgY29tcHV0YXRpb24pXG5mdW5jdGlvbiBnZW5lcmF0ZShkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBydHlwZSAgID0gcmVzdWx0VHlwZShkc3QpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDIpO1xuXG4gICAgLy8gZnVjay4uLlxuICAgIGNvbnN0IHN0eXBlICAgPSBTVHlwZXNbcnR5cGVdIGFzIFNUeXBlRmN0O1xuICAgIGNvbnN0IG1ldGEgICAgPSBzdHlwZS5fX2NhbGxfXztcblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiZmN0XCIsIGNvbnRleHQpO1xuICAgIGNvbnRleHQucGFyZW50X25vZGVfY29udGV4dCA9IGRzdDsgLy8gPC0gaGVyZVxuXG4gICAgLy8gZmFrZSB0aGUgbm9kZS4uLiA9PiBiZXR0ZXIgZG9pbmcgaGVyZSB0byBub3QgaGF2ZSBjb250ZXh0IGlzc3Vlcy5cbiAgICBjb252ZXJ0X2FyZ3MoY29mZnNldCwgbm9kZSwgc3R5cGUsIGNvbnRleHQpO1xuICAgIC8vIGFscmVhZHkgZG9uZSBpbiBjb252ZXJ0X2FyZ3NcbiAgICAvKiBjb25zdCBjX29mZnNldCAgPSBmaXJzdENoaWxkKGNvZmZzZXQpO1xuICAgIGNvbnN0IGNfZW5kICAgICA9IGNfb2Zmc2V0ICsgbmJDaGlsZChjb2Zmc2V0KTtcbiAgICBmb3IobGV0IGkgPSBjX29mZnNldDsgaSA8IGNfZW5kOyArK2kpXG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tWQUxVRVNbaV1dID0gcmVzdWx0VHlwZShpKTsqL1xuXG4gICAgLy8gdGVsbCBib2R5IHRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gZ2VuZXJhdGVkLlxuICAgIG1ldGEuZ2VuZXJhdGUgPSB1bmRlZmluZWQ7XG4gICAgLy8gcHJldmVudHMgcmVjdXJzaXZlIGNhbGxzIG9yIHJlYWZmZWN0YXRpb24uXG4gICAgbWV0YS5yZXR1cm5fdHlwZSA9IHVuZGVmaW5lZCBhcyBhbnk7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZS5yZXR1cm5zPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICBsZXQgZmN0X3JldHVybl90eXBlID0gZ2V0U1R5cGVJRChhbm5vdGF0aW9uKTtcbiAgICAgICAgLy8gZm9yY2UgdGhlIHR5cGUuXG4gICAgICAgIG1ldGEucmV0dXJuX3R5cGUgPSAoKSA9PiBmY3RfcmV0dXJuX3R5cGUhO1xuICAgIH1cblxuICAgIGNvbnZlcnRfYm9keShjb2Zmc2V0KzEsIG5vZGUuYm9keSwgY29udGV4dCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy9jb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiO1xuXG4gICAgY29uc3QgU1R5cGVfZmN0OiBTVHlwZUZjdCA9IHtcbiAgICAgICAgX19uYW1lX186IFwiZnVuY3Rpb25cIixcbiAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgIGFyZ3NfbmFtZXMgICAgIDogbmV3IEFycmF5KG5vZGUuYXJncy5hcmdzLmxlbmd0aCtub2RlLmFyZ3MucG9zb25seWFyZ3MubGVuZ3RoKSxcbiAgICAgICAgICAgIGFyZ3NfcG9zICAgICAgIDoge30sXG4gICAgICAgICAgICBpZHhfZW5kX3BvcyAgICA6IC0xLFxuICAgICAgICAgICAgaWR4X3ZhcmFyZyAgICAgOiAtMSxcbiAgICAgICAgICAgIGhhc19rdyAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBnZW5lcmF0ZSxcbiAgICAgICAgICAgIHJldHVybl90eXBlICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlKGRzdCwgbm9kZSwgY29udGV4dCk7IC8vIHNob3VsZCBiZSB0aGUgbmV3IGNvbnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gU1R5cGVfZmN0Ll9fY2FsbF9fLnJldHVybl90eXBlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBkZWZhdWx0X2NhbGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IFNUeXBlSUQgPSBTVHlwZXMubGVuZ3RoO1xuICAgIFNUeXBlc1tTVHlwZUlEXSA9IFNUeXBlX2ZjdDtcblxuICAgIC8vaWYoICEgaXNNZXRob2QgKSB7XG4gICAgLy8gaWYgbWV0aG9kIGFkZCB0byBzZWxmX2NvbnRleHQuc3ltYm9scyA/XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUubmFtZV0gPSBTVHlwZUlEO1xuXG4gICAgLy8gaW1wbGljaXQgcmV0dXJuLi4uXG4gICAgY29uc3QgbGFzdF90eXBlICAgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXS5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggbGFzdF90eXBlICE9PSBcIlJldHVyblwiICYmIGxhc3RfdHlwZSAhPT0gXCJSYWlzZVwiICkge1xuXG4gICAgICAgIGNvbnN0IGZha2Vfbm9kZSA9IHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgICAgICAgJG5hbWU6IFwiUmV0dXJuXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGluZW5vOiBub2RlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBub2RlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5lbmRfY29sX29mZnNldCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBub2RlLmVuZF9jb2xfb2Zmc2V0LFxuICAgICAgICB9XG4gICAgICAgIG5vZGUuYm9keS5wdXNoKCBmYWtlX25vZGUgKTtcbiAgICB9XG5cbiAgICBzZXRUeXBlICAgICAgKGRzdCwgRlVOQ1RJT05TX0RFRik7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUeXBlSUQpO1xuXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLm5hbWU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgcmV0dXJuIHd0YF9iXy5hc3NlcnQoJHtmaXJzdENoaWxkKG5vZGUpfSlgO1xufSIsImltcG9ydCB7IEtFWVdPUkRTX0FTU0VSVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBLRVlXT1JEU19BU1NFUlQpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEpO1xuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0LCBub2RlLnRlc3QsIGNvbnRleHQpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKF86IG51bWJlcikge1xuICAgIHcoXCJicmVha1wiKTtcbn0iLCJpbXBvcnQgeyBLRVlXT1JEU19CUkVBSyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBzZXRUeXBlKGRzdCwgS0VZV09SRFNfQlJFQUspO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJCcmVha1wiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3KFwiY29udGludWVcIik7XG59IiwiaW1wb3J0IHsgS0VZV09SRFNfQ09OVElOVUUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBzZXRUeXBlKGRzdCwgS0VZV09SRFNfQ09OVElOVUUpO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb250aW51ZVwiOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCB2YWx1ZSA9IFZBTFVFU1tub2RlXTtcbiAgICBcbiAgICB3KHZhbHVlWzBdKVxuXG4gICAgaWYoIHZhbHVlWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHcoXCI6IFwiLCB2YWx1ZVsxXSk7XG59IiwiaW1wb3J0IHsgS0VZV09SRFNfSU1QT1JUX0FMSUFTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBzZXRUeXBlKGRzdCwgS0VZV09SRFNfSU1QT1JUX0FMSUFTKTtcbiAgICBcbiAgICBWQUxVRVNbZHN0XSA9IFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXTtcblxufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHcsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICB3KFwiY29uc3Qge1wiKTtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIHcoXCIsIFwiKTtcbiAgICAgICAgdyhpICsgY29mZnNldCk7XG4gICAgfVxuXG4gICAgdygnfSA9ICcpO1xuXG4gICAgY29uc3QgdmFsdWUgPSBWQUxVRVNbbm9kZV07XG4gICAgXG4gICAgaWYodmFsdWUgPT09IG51bGwpXG4gICAgICAgIHcoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIpO1xuICAgIGVsc2VcbiAgICAgICAgd3RgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dmFsdWV9XCIpYDtcbn0iLCJpbXBvcnQgeyBLRVlXT1JEU19JTVBPUlQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBLRVlXT1JEU19JTVBPUlQpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLm5hbWVzLmxlbmd0aDtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpICsgY29mZnNldCwgbm9kZS5uYW1lc1tpXSwgY29udGV4dCk7XG5cbiAgICBWQUxVRVNbZHN0XSA9IG5vZGUubW9kdWxlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgd3RgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke2ZpcnN0Q2hpbGQobm9kZSl9KWA7XG59IiwiaW1wb3J0IHsgS0VZV09SRFNfUkFJU0UgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBzZXRUeXBlKGRzdCwgS0VZV09SRFNfUkFJU0UpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEpO1xuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0LCBub2RlLmV4YywgY29udGV4dCk7XG5cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJhaXNlXCI7IiwiZXhwb3J0IGNsYXNzIFB5dGhvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgcmVhZG9ubHkgcHl0aG9uX2V4Y2VwdGlvbjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHl0aG9uX2V4Y2VwdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHB5dGhvbl9leGNlcHRpb24uX3Jhd19lcnJfID0gdGhpcztcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPV9pbml0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPV9pbml0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNCBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE2IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMSBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMSBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMiBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjQgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNCBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjUgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI1IGZyb20gXCIuL2tleXdvcmRzL2NvbnRpbnVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI2IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNiBmcm9tIFwiLi9rZXl3b3Jkcy9icmVhay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNyBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI3IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yNyBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI4IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI4IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI5IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMwIGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMwIGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzEgZnJvbSBcIi4vZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM2IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNyBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yX3JhbmdlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNyBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yX3JhbmdlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM4IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM4IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzkgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM5IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQwIGZyb20gXCIuL2JvZHkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQwIGZyb20gXCIuL2JvZHkvYXN0MmpzLnRzXCI7XG5cblxuZXhwb3J0IGNvbnN0IFNZTUJPTCA9IDA7XG5leHBvcnQgY29uc3QgU1RSVUNUU19UVVBMRSA9IDE7XG5leHBvcnQgY29uc3QgU1RSVUNUU19MSVNUID0gMjtcbmV4cG9ydCBjb25zdCBTVFJVQ1RTX0RJQ1QgPSAzO1xuZXhwb3J0IGNvbnN0IFJFVFVSTiA9IDQ7XG5leHBvcnQgY29uc3QgUEFTUyA9IDU7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX1VOQVJZID0gNjtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfQ09NUEFSRSA9IDc7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0JPT0xFQU4gPSA4O1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19CSU5BUlkgPSA5O1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19BVFRSID0gMTA7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX19CUkFDS0VUUyA9IDExO1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19BU1NJR05PUCA9IDEyO1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19fRVFfSU5JVCA9IDEzO1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19fRVEgPSAxNDtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19TVFIgPSAxNTtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19JTlQgPSAxNjtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19GTE9BVCA9IDE3O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0ZfU1RSSU5HID0gMTg7XG5leHBvcnQgY29uc3QgTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUgPSAxOTtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19CT09MID0gMjA7XG5leHBvcnQgY29uc3QgTElURVJBTFNfTk9ORSA9IDIxO1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX1JBSVNFID0gMjI7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfSU1QT1JUID0gMjM7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfSU1QT1JUX0FMSUFTID0gMjQ7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfQ09OVElOVUUgPSAyNTtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19CUkVBSyA9IDI2O1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX0FTU0VSVCA9IDI3O1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19ERUYgPSAyODtcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQ0FMTCA9IDI5O1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19DQUxMX0tFWVdPUkQgPSAzMDtcbmV4cG9ydCBjb25zdCBGVU5DVElPTlNfQVJHUyA9IDMxO1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19XSElMRSA9IDMyO1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19UUllCTE9DSyA9IDMzO1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19UUllCTE9DS19DQVRDSCA9IDM0O1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19URVJOQVJZID0gMzU7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX0lGQkxPQ0sgPSAzNjtcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfRk9SX1JBTkdFID0gMzc7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX0ZPUiA9IDM4O1xuZXhwb3J0IGNvbnN0IENMQVNTX0NMQVNTREVGID0gMzk7XG5leHBvcnQgY29uc3QgQk9EWSA9IDQwO1xuXG5pbXBvcnQgdHlwZSB7VF9BU1RDT05WRVJULCBUX0FTVDJKU30gZnJvbSAnLi8nXG5cbmV4cG9ydCBjb25zdCBBU1RfQ09OVkVSVDogVF9BU1RDT05WRVJUW10gPSBbXG5cdEFTVF9DT05WRVJUXzAsXG5cdEFTVF9DT05WRVJUXzEsXG5cdEFTVF9DT05WRVJUXzIsXG5cdEFTVF9DT05WRVJUXzMsXG5cdEFTVF9DT05WRVJUXzQsXG5cdEFTVF9DT05WRVJUXzUsXG5cdEFTVF9DT05WRVJUXzYsXG5cdEFTVF9DT05WRVJUXzcsXG5cdEFTVF9DT05WRVJUXzgsXG5cdEFTVF9DT05WRVJUXzksXG5cdEFTVF9DT05WRVJUXzEwLFxuXHRBU1RfQ09OVkVSVF8xMSxcblx0QVNUX0NPTlZFUlRfMTIsXG5cdEFTVF9DT05WRVJUXzEzLFxuXHRBU1RfQ09OVkVSVF8xNCxcblx0QVNUX0NPTlZFUlRfMTUsXG5cdEFTVF9DT05WRVJUXzE2LFxuXHRBU1RfQ09OVkVSVF8xNyxcblx0QVNUX0NPTlZFUlRfMTgsXG5cdEFTVF9DT05WRVJUXzE5LFxuXHRBU1RfQ09OVkVSVF8yMCxcblx0QVNUX0NPTlZFUlRfMjEsXG5cdEFTVF9DT05WRVJUXzIyLFxuXHRBU1RfQ09OVkVSVF8yMyxcblx0QVNUX0NPTlZFUlRfMjQsXG5cdEFTVF9DT05WRVJUXzI1LFxuXHRBU1RfQ09OVkVSVF8yNixcblx0QVNUX0NPTlZFUlRfMjcsXG5cdEFTVF9DT05WRVJUXzI4LFxuXHRBU1RfQ09OVkVSVF8yOSxcblx0QVNUX0NPTlZFUlRfMzAsXG5cdEFTVF9DT05WRVJUXzMxLFxuXHRBU1RfQ09OVkVSVF8zMixcblx0QVNUX0NPTlZFUlRfMzMsXG5cdEFTVF9DT05WRVJUXzM0LFxuXHRBU1RfQ09OVkVSVF8zNSxcblx0QVNUX0NPTlZFUlRfMzYsXG5cdEFTVF9DT05WRVJUXzM3LFxuXHRBU1RfQ09OVkVSVF8zOCxcblx0QVNUX0NPTlZFUlRfMzksXG5cdEFTVF9DT05WRVJUXzQwLFxuXVxuXG5leHBvcnQgY29uc3QgQVNUMkpTOiBUX0FTVDJKU1tdID0gW1xuXHRBU1QySlNfMCxcblx0QVNUMkpTXzEsXG5cdEFTVDJKU18yLFxuXHRBU1QySlNfMyxcblx0QVNUMkpTXzQsXG5cdEFTVDJKU181LFxuXHRBU1QySlNfNixcblx0QVNUMkpTXzcsXG5cdEFTVDJKU184LFxuXHRBU1QySlNfOSxcblx0QVNUMkpTXzEwLFxuXHRBU1QySlNfMTEsXG5cdEFTVDJKU18xMixcblx0QVNUMkpTXzEzLFxuXHRBU1QySlNfMTQsXG5cdEFTVDJKU18xNSxcblx0QVNUMkpTXzE2LFxuXHRBU1QySlNfMTcsXG5cdEFTVDJKU18xOCxcblx0QVNUMkpTXzE5LFxuXHRBU1QySlNfMjAsXG5cdEFTVDJKU18yMSxcblx0QVNUMkpTXzIyLFxuXHRBU1QySlNfMjMsXG5cdEFTVDJKU18yNCxcblx0QVNUMkpTXzI1LFxuXHRBU1QySlNfMjYsXG5cdEFTVDJKU18yNyxcblx0QVNUMkpTXzI4LFxuXHRBU1QySlNfMjksXG5cdEFTVDJKU18zMCxcblx0QVNUMkpTXzMxLFxuXHRBU1QySlNfMzIsXG5cdEFTVDJKU18zMyxcblx0QVNUMkpTXzM0LFxuXHRBU1QySlNfMzUsXG5cdEFTVDJKU18zNixcblx0QVNUMkpTXzM3LFxuXHRBU1QySlNfMzgsXG5cdEFTVDJKU18zOSxcblx0QVNUMkpTXzQwLFxuXVxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfOSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMTcpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzIyKTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yNyk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMzMpO1xuXG5cbmV4cG9ydCBjb25zdCBfYl8gPSBSVU5USU1FO1xuIiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIHcoXCJudWxsXCIpO1xufSIsImltcG9ydCB7IExJVEVSQUxTX05PTkUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUWVBFX05PTkVUWVBFIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpOiBmYWxzZXx2b2lkIHtcblxuICAgIGlmKCAhICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHx8ICEoXCJfX2NsYXNzX19cIiBpbiBub2RlLnZhbHVlKVxuICAgICAgICAgICAgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18uX19xdWFsbmFtZV9fICE9PSBcIk5vbmVUeXBlXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRUeXBlKGRzdCwgTElURVJBTFNfTk9ORSk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUWVBFX05PTkVUWVBFKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgYWRkU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ05vbmVUeXBlJywge30pOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3KCBWQUxVRVNbbm9kZV0gKTtcbn0iLCJpbXBvcnQgeyBMSVRFUkFMU19CT09MIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUWVBFX0JPT0wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19CT09MKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1RZUEVfQk9PTCk7XG4gICAgXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLnZhbHVlOyAvLyBUT0RPOiAyIHR5cGVzIGluc3RlYWQgb2Ygb25lID9cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkNtcE9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgUkVUX0lKQkYyQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1JldHVyblR5cGVGY3RzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSAgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2Jvb2wnLCB7XG4gICAgLi4uZ2VuQ21wT3BzKENNUE9QU19MSVNULCBSRVRfSUpCRjJCT09MKSxcbn0pOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICB3KFwiJHtcIiwgZmlyc3RDaGlsZChub2RlKSwgXCJ9XCIpXG59IiwiaW1wb3J0IHsgTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBzZXRUeXBlKGRzdCwgTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUudmFsdWUsIGNvbnRleHQpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9ybWF0dGVkVmFsdWVcIjsiLCJpbXBvcnQgeyBzZXRfanNfY3Vyc29yLCB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBDT0RFX0JFRywgQ09ERV9FTkQsIGZpcnN0Q2hpbGQsIG5iQ2hpbGQsIHJlc3VsdFR5cGUsIHR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IFNUWVBFX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICB3KFwiYFwiKTtcblxuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpO1xuXG4gICAgZm9yKGxldCBpID0gY29mZnNldDsgaSA8IG5iQ2hpbGRyZW4gKyBjb2Zmc2V0OyArK2kpIHtcblxuICAgICAgICBpZiggcmVzdWx0VHlwZShpKSA9PT0gU1RZUEVfU1RSKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDQqaTtcblxuICAgICAgICAgICAgLy8gd2Ugd3JpdGUgdGhlIGNoaWxkcmVuIGRpcmVjdGx5Li4uXG4gICAgICAgICAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfQkVHKTtcbiAgICAgICAgICAgIHcoVkFMVUVTW2ldKTtcbiAgICAgICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9FTkQpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiggdHlwZShpKSA9PT0gTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUpIHtcbiAgICAgICAgICAgIHcoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgdyhcImBcIik7XG59IiwiaW1wb3J0IHsgTElURVJBTFNfRl9TVFJJTkcgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUWVBFX1NUUiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19GX1NUUklORyk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUWVBFX1NUUik7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbm9kZS52YWx1ZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkgKyBjb2Zmc2V0LCBub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICAvLyBmb3JjZSBzdHIgd3JpdGUgKGVsc2UgbWlnaHQgYXNzdW1lIHRoaXMgaXMgYW4gQVNUIG5vZGUgSUQpLi4uXG4gICAgdyhgJHtWQUxVRVNbbm9kZV19YCk7XG59IiwiaW1wb3J0IHsgTElURVJBTFNfRkxPQVQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1RZUEVfRkxPQVQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgc2V0VHlwZShkc3QsIExJVEVSQUxTX0ZMT0FUKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1RZUEVfRkxPQVQpO1xuICAgIFxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS52YWx1ZS52YWx1ZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb2F0MnN0cjogKGY6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiggZiA8PSAxZS01IHx8IGYgPj0gMWUxNikge1xuXG4gICAgICAgICAgICBsZXQgc3RyID0gZi50b0V4cG9uZW50aWFsKCk7XG4gICAgICAgICAgICBjb25zdCBzaWduX2lkeCA9IHN0ci5sZW5ndGgtMjtcbiAgICAgICAgICAgIGlmKHN0cltzaWduX2lkeF0gPT09ICctJyB8fCBzdHJbc2lnbl9pZHhdID09PSAnKycpXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsc2lnbl9pZHgrMSkgKyAnMCcgKyBzdHIuc2xpY2Uoc2lnbl9pZHgrMSk7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0ciA9IGYudG9TdHJpbmcoKTtcbiAgICAgICAgaWYoICEgc3RyLmluY2x1ZGVzKCcuJykpXG4gICAgICAgICAgICBzdHIgKz0gXCIuMFwiO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfU1RSIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MLCBSRVRfSUpCRjJGTE9BVCwgUkVUX0ZMT0FULCBSRVRfU1RSIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9mbG9hdCA9IGFkZFNUeXBlKCd0eXBlW2Zsb2F0XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9GTE9BVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gZmlyc3RDaGlsZChub2RlKSsxO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IHJlc3VsdFR5cGUob3RoZXIpO1xuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0ZMT0FUIHx8IG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXJfdHlwZTtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX1NUUiApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyX3ZhbHVlID0gVkFMVUVTW290aGVyXTtcblxuICAgICAgICAgICAgICAgIGlmKCB0eXBlKG90aGVyKSA9PT0gTElURVJBTFNfU1RSICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXJfdmFsdWUgPT09IFwiaW5mXCIgfHwgb3RoZXJfdmFsdWUgPT09IFwiaW5maW5pdHlcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG90aGVyX3ZhbHVlID09PSBcIi1pbmZcInx8IG90aGVyX3ZhbHVlID09PSBcIi1pbmZpbml0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBwYXJzZUZsb2F0KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb3R5cGUgPSBTVHlwZXNbb3RoZXJfdHlwZV07XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnZmxvYXQnLCB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2Zsb2F0LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9hdDJzdHIoJHtub2RlfSlgO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycqKicsICcqJywgJy8nLCAnKycsICctJ10sIFJFVF9JSkJGMkZMT0FULFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyUnXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FULFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoWyd1Li0nXSAgICAsIFJFVF9GTE9BVCksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpLFxufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyByZXN1bHRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgbGV0IHZhbHVlID0gVkFMVUVTW25vZGVdO1xuXG4gICAgaWYoIHJlc3VsdFR5cGUobm9kZSkgPT09IFNUWVBFX0lOVCApIHtcbiAgICAgICAgLy8gZm9yY2Ugc3RyIHdyaXRlIChlbHNlIG1pZ2h0IGFzc3VtZSB0aGlzIGlzIGFuIEFTVCBub2RlIElEKS4uLlxuICAgICAgICB3KGAke3ZhbHVlfW5gKTsgXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoIHR5cGVvZiB2YWx1ZSA9PT0gXCJiaWdpbnRcIiApXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuXG4gICAgLy8gZm9yY2Ugc3RyIHdyaXRlIChlbHNlIG1pZ2h0IGFzc3VtZSB0aGlzIGlzIGFuIEFTVCBub2RlIElEKS4uLlxuICAgIHcoYCR7dmFsdWV9YCk7XG59IiwiaW1wb3J0IHsgTElURVJBTFNfSU5UIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVFlQRV9JTlQgOiBTVFlQRV9KU0lOVDtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19JTlQpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZWFsX3R5cGUpO1xuICAgIFxuICAgIFZBTFVFU1tkc3RdID0gdmFsdWU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCByZXN1bHRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIGlkX2pzb3AsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IENPTlZFUlRfMklOVCwgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MLCBSRVRfSUpCRjJGTE9BVCwgUkVUX0lKMklOVCwgUkVUX0lOVCwgUkVUX0lOVDJJTlQsIFJFVF9TVFIgfSBmcm9tIFwic3RydWN0cy9SZXR1cm5UeXBlRmN0c1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX3R5cGVfaW50ID0gYWRkU1R5cGUoJ3R5cGVbaW50XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9JTlQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlcikgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IGZpcnN0Q2hpbGQobm9kZSkgKyAxO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9cmVzdWx0VHlwZShvdGhlcik7XG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0ZMT0FUIClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoTWF0aC50cnVuYygke290aGVyfSkpYDtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX1NUUiApIHtcblxuICAgICAgICAgICAgICAgIC8vaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAzKVxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByYEJpZ0ludChwYXJzZUludCgke290aGVyfSwgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDtcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogb3B0aW1pemUgaWYgb3RoZXIgaXMgc3RyaW5nIGxpdHRlcmFsLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgQmlnSW50KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb3R5cGUgPSBTVHlwZXNbb3RoZXJfdHlwZV07XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnaW50Jywge1xuXG4gICAgLy9UT0RPOiBmaXggdHlwZS4uLlxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfaW50LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYCR7bm9kZX0udG9TdHJpbmcoKWA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKiAqL1xuICAgIC4uLmdlbkJpbmFyeU9wcyhbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgUkVUX0lKMklOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF8ySU5UXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyonXSwgUkVUX0lOVDJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBhLCBiKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvLyddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyICA6IENPTlZFUlRfMklOVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvdGhlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnJSddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBudW1iZXIsIHNlbGY6IG51bWJlciwgb3RoZXI6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhbJ3UuLSddLCBSRVRfSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCBbJ34nXSwgUkVUX0lOVCksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpXG4gICAgLyogKi9cblxufSk7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IHJlc3VsdFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF8ySU5ULCBDT05WRVJUX0lOVDJGTE9BVCB9IGZyb20gXCJzdHJ1Y3RzL0NvbnZlcnRlcnNcIjtcbmltcG9ydCB7IFJFVF9JSjJJTlQsIFJFVF9JSkJGMkJPT0wsIFJFVF9JSkJGMkZMT0FULCBSRVRfSU5ULCBSRVRfSlNJTlQsIFJFVF9KU0lOVDJKU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1JldHVyblR5cGVGY3RzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnanNpbnQnLCB7XG5cbiAgICAuLi5nZW5CaW5hcnlPcHMoXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiBDT05WRVJUXzJJTlQsXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlRcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnKiddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhLCBiKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBOdW1iZXIySW50KGEpLCAnKicsIE51bWJlcjJJbnQoYikgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8nXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FUXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8vJ10sIFJFVF9KU0lOVDJKU0lOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG90aGVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyUnXSwgUkVUX0pTSU5UMkpTSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBudW1iZXIsIHNlbGY6IG51bWJlciwgb3RoZXI6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhbJ3UuLSddLCBSRVRfSlNJTlQsIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIHJlc3VsdFR5cGUobm9kZSkgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgTnVtYmVyMkludChhKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoWyd+J10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAgUkVUX0lOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogQ09OVkVSVF8ySU5UXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULCBSRVRfSUpCRjJCT09MKVxuICAgIC8qXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sKi9cbn0pOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgd3RgJyR7VkFMVUVTW25vZGVdfSdgO1xufSIsImltcG9ydCB7IExJVEVSQUxTX1NUUiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVFlQRV9TVFIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRUeXBlKGRzdCwgTElURVJBTFNfU1RSKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1RZUEVfU1RSKTtcblxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS52YWx1ZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIHJlc3VsdFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHN9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUoyU1RSLCBSRVRfSU5ULCBSRVRfU1RSLCBSRVRfU1RSMkJPT0wsIFJFVF9TVFIyU1RSIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX3R5cGVfc3RyID0gYWRkU1R5cGUoJ3R5cGVbc3RyXScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9TVFIsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBmaXJzdENoaWxkKG5vZGUpKzE7XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gcmVzdWx0VHlwZShvdGhlcik7XG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfU1RSIClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG5cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IFNUeXBlc1tvdGhlcl90eXBlXT8uX19zdHJfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtTVHlwZXNbb3RoZXJfdHlwZV0uX19uYW1lX199Ll9fc3RyX18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ3N0cicsIHtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfc3RyLFxuXG4gICAgX19sZW5fXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAoXykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHtmaXJzdENoaWxkKF8pICsgMX0ubGVuZ3RoYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAuLi5nZW5DbXBPcHMgICAoQ01QT1BTX0xJU1QsIFJFVF9TVFIyQk9PTCksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFtcIitcIl0gICAgICAsIFJFVF9TVFIyU1RSKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoW1wiKlwiXSAgICAgICwgUkVUX0lKMlNUUixcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlciAgOiBDT05WRVJUX0lOVDJGTE9BVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShhKSAhPT0gU1RZUEVfU1RSIClcbiAgICAgICAgICAgICAgICAgICAgW2EsYl0gPSBbYixhXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByYCR7YX0ucmVwZWF0KCR7Yn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG59KTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQsIHJlc3VsdFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICBcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICB3dGAke2krY29mZnNldH0gPSBgO1xuXG4gICAgbGV0IHJjaGlsZDogYW55ID0gY29mZnNldDtcbiAgICBpZiggcmVzdWx0VHlwZShjb2Zmc2V0KSA9PT0gU1RZUEVfSlNJTlQgJiYgcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChjb2Zmc2V0KTtcblxuICAgIHcocmNoaWxkKTtcbn0iLCJpbXBvcnQgeyBPUEVSQVRPUlNfX0VRLCBTWU1CT0wgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgdHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBpZiggICAgY29udGV4dC50eXBlICE9PSBcImNsYXNzXCJcbiAgICAgICAgJiYgdGFyZ2V0c1swXS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJOYW1lXCJcbiAgICAgICAgJiYgISh0YXJnZXRzWzBdLmlkIGluIGNvbnRleHQubG9jYWxfc3ltYm9scylcbiAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfX0VRKTtcblxuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSB0YXJnZXRzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS52YWx1ZSwgY29udGV4dCk7IC8vIHJpZ2h0XG4gICAgbGV0IHJ0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJlc3VsdF90eXBlICE9PSBydHlwZSApXG4gICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJ0eXBlO1xuICAgICAgICBpZiggcnR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0X3R5cGUpO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5iQ2hpbGRyZW47ICsraSkge1xuXG4gICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0K2ksIHRhcmdldHNbaS0xXSwgY29udGV4dCApO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0c1tpLTFdLmlkXSA9IHJlc3VsdF90eXBlO1xuXG4vKlxuICAgICAgICAvLyBjb3VsZCBiZSBpbXByb3ZlZCBJIGd1ZXNzLlxuICAgICAgICBpZiggdHlwZShpK2NvZmZzZXQpID09PSBTWU1CT0wpIHtcbiAgICBcbiAgICAgICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgICAgICBjb25zdCBsdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tpK2NvZmZzZXRdO1xuICAgICAgICAgICAgaWYoIGx0eXBlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGx0eXBlICE9PSAwICYmIHJ0eXBlICE9PSBsdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4qL1xuICAgIH1cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkLCByZXN1bHRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgXG4gICAgdyhcInZhciBcIik7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICB3dGAke2krY29mZnNldH0gPSBgO1xuXG4gICAgbGV0IHJjaGlsZDogYW55ID0gY29mZnNldDtcbiAgICBpZiggcmVzdWx0VHlwZShjb2Zmc2V0KSA9PT0gU1RZUEVfSlNJTlQgJiYgcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChjb2Zmc2V0KTtcblxuICAgIHcocmNoaWxkKTtcbn0iLCJpbXBvcnQgeyBPUEVSQVRPUlNfX0VRX0lOSVQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBpZiggICAgY29udGV4dC50eXBlID09PSBcImNsYXNzXCJcbiAgICAgICAgfHwgdGFyZ2V0c1swXS5jb25zdHJ1Y3Rvci4kbmFtZSAhPT0gXCJOYW1lXCJcbiAgICAgICAgfHwgdGFyZ2V0c1swXS5pZCBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHNcbiAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfX0VRX0lOSVQpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSB0YXJnZXRzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS52YWx1ZSwgY29udGV4dCk7IC8vIHJpZ2h0XG4gICAgbGV0IHJ0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuXG5cbiAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmVzdWx0X3R5cGUgIT09IHJ0eXBlIClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJ0eXBlO1xuICAgICAgICBpZiggcnR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0X3R5cGUpO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5iQ2hpbGRyZW47ICsraSkge1xuICAgICAgICBjb252ZXJ0X25vZGUoY29mZnNldCtpLCB0YXJnZXRzW2ktMV0sIGNvbnRleHQgKTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldHNbaS0xXS5pZF0gPSByZXN1bHRfdHlwZTtcbiAgICB9XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQXNzaWduT3BlcmF0b3JzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgbGV0IG9wID0gQXNzaWduT3BlcmF0b3JzW1ZBTFVFU1tub2RlXSBhcyBrZXlvZiB0eXBlb2YgQXNzaWduT3BlcmF0b3JzXTtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tyZXN1bHRUeXBlKGNvZmZzZXQpXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJlc3VsdFR5cGUoY29mZnNldCsxKSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVFlQRV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3Jlc3VsdFR5cGUoY29mZnNldCsxKX0gJHtvcH09ICR7cmVzdWx0VHlwZShjb2Zmc2V0KX0gTk9UIElNUExFTUVOVEVEIWApO1xuICAgICAgICAvKlxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBjb2Zmc2V0LCBjb2Zmc2V0KzEpICk7XG59IiwiaW1wb3J0IHsgT1BFUkFUT1JTX0FTU0lHTk9QIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHJlc3VsdFR5cGUsIHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJweW5hbWVdO1xuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIFZBTFVFU1tkc3RdID0gb3A7XG5cbiAgICBzZXRUeXBlKGRzdCwgT1BFUkFUT1JTX0FTU0lHTk9QKTtcbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAyKTtcblxuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0LCAgIG5vZGUudGFyZ2V0LCBjb250ZXh0KTtcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsxLCBub2RlLnZhbHVlLCAgY29udGV4dCk7XG5cbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0VHlwZShjb2Zmc2V0KSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIFxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgd3RgJHtjb2Zmc2V0fVske2NvZmZzZXQrMX1dYDtcbn0iLCJpbXBvcnQgeyBPUEVSQVRPUlNfX0JSQUNLRVRTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIE9QRVJBVE9SU19fQlJBQ0tFVFMpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDIpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsICAgbm9kZS52YWx1ZSwgY29udGV4dCksXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQrMSwgbm9kZS5zbGljZSwgY29udGV4dClcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3dGAke2ZpcnN0Q2hpbGQobm9kZSl9LiR7VkFMVUVTW25vZGVdfWA7XG59IiwiaW1wb3J0IHsgT1BFUkFUT1JTX0FUVFIgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBzZXRUeXBlKGRzdCwgT1BFUkFUT1JTX0FUVFIpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLmF0dHI7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBcbiAgICBjb25zdCBtZXRob2QgPSBTVHlwZXNbcmVzdWx0VHlwZShjb2Zmc2V0KV0hW1ZBTFVFU1tub2RlXV0gYXMgU1R5cGVGY3RTdWJzO1xuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBjb2Zmc2V0LCBjb2Zmc2V0KzEpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlLCBzd2FwQVNUTm9kZXMgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19CSU5BUlkgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJweW5hbWVdO1xuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgc2V0VHlwZShkc3QsIE9QRVJBVE9SU19CSU5BUlkpO1xuXG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMik7XG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQgICwgbm9kZS5sZWZ0ICwgY29udGV4dCk7IC8vIGxlZnRcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsxLCBub2RlLnJpZ2h0LCBjb250ZXh0KTsgLy8gcmlnaHRcblxuICAgIGNvbnN0IGx0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KTtcbiAgICBjb25zdCBydHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCsxKTtcblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbHR5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocnR5cGUpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBQYXJhbWV0ZXJzPHR5cGVvZiByZXZlcnNlZF9vcGVyYXRvcj5bMF0pO1xuICAgICAgICBtZXRob2QgPSBTVHlwZXNbcnR5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGx0eXBlISk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtydHlwZX0gJHtvcH0gJHtsdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIHN3YXBBU1ROb2Rlcyhjb2Zmc2V0LCBjb2Zmc2V0KzEpOyAvLyBjb3N0bHksIHVzZSAyIGFzdDJqcyBpbnN0ZWFkID9cbiAgICB9XG5cbiAgICBWQUxVRVNbZHN0XSA9IG9wO1xuXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHR5cGUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9mbG9hdDogKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCBhL2IgKTtcbiAgICB9LFxuICAgIGZsb29yZGl2X2ludDogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIC0tcmVzdWx0O1xuICAgIH0sXG4gICAgbW9kX2Zsb2F0OiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcblxuICAgICAgICBjb25zdCBtb2QgPSAoYSAlIGIgKyBiKSAlIGI7XG4gICAgICAgIGlmKCBtb2QgPT09IDAgJiYgYiA8IDAgKVxuICAgICAgICAgICAgcmV0dXJuIC0wO1xuICAgICAgICByZXR1cm4gbW9kO1xuICAgIH0sXG4gICAgbW9kX2ludDogPFQ+KGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChhICUgYiArIGIpICUgYjtcbiAgICB9XG59IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBtdWx0aV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3ciggbXVsdGlfanNvcChub2RlLCBWQUxVRVNbbm9kZV0pICk7XG59IiwiaW1wb3J0IHsgT1BFUkFUT1JTX0JPT0xFQU4gfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfQk9PTEVBTik7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUudmFsdWVzLmxlbmd0aDtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpICsgY29mZnNldCwgbm9kZS52YWx1ZXNbaV0sIGNvbnRleHQgKVxuXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdFR5cGUoY29mZnNldCkgKTtcbiAgICBcbiAgICBWQUxVRVNbZHN0XSA9IGJuYW1lMmpzb3Bbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUyanNvcF07XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHcsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5mdW5jdGlvbiBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZTogbnVtYmVyLCBsZWZ0Om51bWJlciwgb3A6IHN0cmluZywgcmlnaHQ6IG51bWJlcikge1xuICAgIFxuICAgIGxldCByZXZlcnNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJ0eXBlID0gcmVzdWx0VHlwZShyaWdodCk7XG4gICAgY29uc3QgbHR5cGUgPSByZXN1bHRUeXBlKGxlZnQpO1xuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tsdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocnR5cGUhKTtcblxuICAgIGlmKCB0eXBlID09PSBTVFlQRV9OT1RfSU1QTEVNRU5URUQpIHtcblxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBQYXJhbWV0ZXJzPHR5cGVvZiByZXZlcnNlZF9vcGVyYXRvcj5bMF0pO1xuICAgICAgICBtZXRob2QgPSBTVHlwZXNbcnR5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICBcbiAgICBjb25zdCB2YWx1ZSA9IFZBTFVFU1tub2RlXTtcblxuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwIClcbiAgICAgICAgICAgIHcoJyAmJiAnKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHZhbHVlW2ldO1xuICAgICAgICBjb25zdCBsZWZ0ICA9IGkrY29mZnNldDtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBpKzErY29mZnNldDtcblxuICAgICAgICBpZiggb3AgPT09ICdpcycgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwgJz09PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9wID09PSAnaXMgbm90JyApIHtcbiAgICAgICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCAnIT09JywgcmlnaHQpICk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd3IoIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCBvcCwgcmlnaHQpICk7XG4gICAgfVxufSIsImltcG9ydCB7IE9QRVJBVE9SU19DT01QQVJFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IGJuYW1lMnB5bmFtZVtlLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJweW5hbWVdO1xuICAgICAgICBpZiggb3AgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlLmNvbnN0cnVjdG9yLiRuYW1lfSBub3QgaW1wbGVtZW50ZWQhYCk7XG4gICAgICAgIHJldHVybiBvcDtcbiAgICB9KTtcbiAgICBWQUxVRVNbZHN0XSA9IG9wcztcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfQ09NUEFSRSk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUWVBFX0JPT0wpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLmNvbXBhcmF0b3JzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgZm9yKGxldCBpID0gMSA7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpICsgY29mZnNldCwgbm9kZS5jb21wYXJhdG9yc1tpLTFdLCBjb250ZXh0KTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIHJlc3VsdFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9KU0lOVCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgbGVmdCAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IHZhbHVlID0gVkFMVUVTW25vZGVdO1xuXG4gICAgaWYoIHZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHdyKCB1bmFyeV9qc29wKG5vZGUsICchJywgSW50Mk51bWJlcihsZWZ0LCBTVFlQRV9KU0lOVCkgKSApO1xuXG4gICAgY29uc3QgbWV0aG9kID0gU1R5cGVzW3Jlc3VsdFR5cGUobGVmdCkhXVt2YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgd3IoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCwgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19VTkFSWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCByZXN1bHRUeXBlLCBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIE9QRVJBVE9SU19VTkFSWSk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSk7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWUgYXMga2V5b2YgdHlwZW9mIGJuYW1lMnB5bmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIFZBTFVFU1tkc3RdID0gb3A7XG5cbiAgICBpZiggb3AgPT09ICdub3QnKSB7XG5cbiAgICAgICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUWVBFX0JPT0wpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tyZXN1bHRUeXBlKGNvZmZzZXQpXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKCk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1RZUEVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B9ICR7cmVzdWx0VHlwZShjb2Zmc2V0KX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHR5cGUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlVuYXJ5T3BcIl07IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIHcoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIik7XG59IiwiaW1wb3J0IHsgUEFTUyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgc2V0VHlwZShkc3QsIFBBU1MpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIGlmKCBjb2Zmc2V0ID09PSAwKVxuICAgICAgICByZXR1cm4gdyhcInJldHVybiBudWxsXCIpO1xuXG4gICAgcmV0dXJuIHd0YHJldHVybiAke2NvZmZzZXR9YDtcbn0iLCJpbXBvcnQgeyBSRVRVUk4gfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX05PTkVUWVBFLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6bnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGNvbnRleHQucGFyZW50X25vZGVfY29udGV4dFxuICAgIGxldCByZXN1bHRfdHlwZSA9IFNUWVBFX05PTkVUWVBFO1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAxKTtcbiAgICAgICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCk7XG4gICAgfVxuXG4gICAgc2V0VHlwZShkc3QsIFJFVFVSTik7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdF90eXBlKTtcblxuICAgIGNvbnN0IG1ldGEgPSAoU1R5cGVzW3Jlc3VsdFR5cGUoY29udGV4dC5wYXJlbnRfbm9kZV9jb250ZXh0ISldIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcbiAgICBpZiggbWV0YS5yZXR1cm5fdHlwZSA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSA9ICgpID0+IHJlc3VsdF90eXBlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmV0dXJuXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICB3KCd7Jyk7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIGlmKCBuYkNoaWxkcmVuID4gMCApXG4gICAgICAgIHd0YCR7Y29mZnNldH06ICR7Y29mZnNldCsxfWA7XG5cbiAgICBmb3IobGV0IGkgPSAyOyBpIDwgbmJDaGlsZHJlbjsgaSs9MilcbiAgICAgICAgd3RgLCAke2krY29mZnNldH06ICR7aSsxK2NvZmZzZXR9YDtcblxuICAgIHcoJ30nKTtcbn0iLCJpbXBvcnQgeyBTVFJVQ1RTX0RJQ1QgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgc2V0VHlwZShkc3QsIFNUUlVDVFNfRElDVCk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb252ZXJ0X25vZGUoMippK2NvZmZzZXQsIG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY29udmVydF9ub2RlKDIqaSsxK2NvZmZzZXQsIG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCJbXCIpO1xuXG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG4gICAgY29uc3QgY29mZnNldCAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgXG4gICAgaWYoIG5iQ2hpbGRyZW4gPiAwIClcbiAgICAgICAgdyhjb2Zmc2V0KTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCBpICsgY29mZnNldCk7XG5cbiAgICB3KFwiXSlcIik7XG59IiwiaW1wb3J0IHsgU1RSVUNUU19MSVNUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIFNUUlVDVFNfTElTVCk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUuZWx0cy5sZW5ndGg7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICBjb252ZXJ0X25vZGUoaSArIGNvZmZzZXQsIG5vZGUuZWx0c1tpXSwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJMaXN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCJPYmplY3QuZnJlZXplKFtcIik7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIGlmKCBuYkNoaWxkcmVuID4gMCApXG4gICAgICAgIHcoY29mZnNldCk7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICB3KFwiLCBcIiwgaSArIGNvZmZzZXQpO1xuXG4gICAgdyhcIl0pXCIpO1xufSIsImltcG9ydCB7IFNUUlVDVFNfVFVQTEUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgc2V0VHlwZShkc3QsIFNUUlVDVFNfVFVQTEUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLmVsdHMubGVuZ3RoO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkgKyBjb2Zmc2V0LCBub2RlLmVsdHNbaV0sIGNvbnRleHQpO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3KCBWQUxVRVNbbm9kZV0gKTtcbn0iLCJpbXBvcnQgX3JfIGZyb20gXCIuLi8uLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTWU1CT0wgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gMDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIHZhbHVlID09PSAnc2VsZicpXG4gICAgICAgIHZhbHVlID0gJ3RoaXMnOyAvL1RPRE8gdHlwZSBvZiBjdXJyZW50IGNvbnRleHQgISAtPiBzZWxmIGluIGxvY2FsX3N5bWJvbHMgP1xuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdmFsdWVdO1xuICAgIC8qXG4gICAgICAgIC8vVE9ETyBnbG9iYWxTeW1ib2xzXG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG4gICAgKi9cblxuICAgIHNldFR5cGUoZHN0LCBTWU1CT0wpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZXN1bHRfdHlwZSk7XG4gICAgXG4gICAgVkFMVUVTW2RzdF0gPSB2YWx1ZTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsImV4cG9ydCBjb25zdCBBUlJBWV9UWVBFICAgPSBGbG9hdDY0QXJyYXk7XG5jb25zdCBFTEVNX1NJWkUgPSA4O1xuY29uc3QgTUFYX05CX0FTVE5PREVTID0gMTA1IC8qKiAqIDIwIC8qKi87IC8vIHdoZW4gbWVyZ2VkXG5cbmV4cG9ydCBjb25zdCBDT0RFX0xJTkUgPSAwO1xuZXhwb3J0IGNvbnN0IENPREVfQ09MICA9IDE7XG5leHBvcnQgY29uc3QgQ09ERV9CRUcgID0gMDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORCAgPSAyO1xuZXhwb3J0IGNvbnN0IENPREVfQkVHX0xJTkUgPSBDT0RFX0JFRyArIENPREVfTElORTtcbmV4cG9ydCBjb25zdCBDT0RFX0JFR19DT0wgID0gQ09ERV9CRUcgKyBDT0RFX0NPTDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORF9MSU5FID0gQ09ERV9FTkQgKyBDT0RFX0xJTkU7XG5leHBvcnQgY29uc3QgQ09ERV9FTkRfQ09MICA9IENPREVfRU5EICsgQ09ERV9DT0w7XG5cbmV4cG9ydCBjb25zdCBQWV9DT0RFID0gbmV3IEFSUkFZX1RZUEUoNCpNQVhfTkJfQVNUTk9ERVMpO1xuZXhwb3J0IGNvbnN0IEpTX0NPREUgPSBuZXcgQVJSQVlfVFlQRSg0Kk1BWF9OQl9BU1ROT0RFUyk7XG5cbi8vVE9ETzogaW5kaXJlY3Rpb24gb3UgcGFyIElELi4uXG5leHBvcnQgY29uc3QgVkFMVUVTID0gbmV3IEFycmF5PGFueT4oKTtcblxubGV0IE5FWFRfQVNUX05PREVfSUQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2hpbGQocGFyZW50OiBudW1iZXIsIG5iQ2hpbGQ6IG51bWJlcikge1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gcGFyZW50ICogQVNUTk9ERV9TSVpFO1xuICAgIFxuICAgIEFTVE5PREVTW29mZnNldCArIEFTVE5PREVfTkJfQ0hJTERSRU5dID0gbmJDaGlsZDtcbiAgICBjb25zdCBpZCA9IEFTVE5PREVTW29mZnNldCArIEFTVE5PREVfQ0hJTERSRU5fU1RBUlRdID0gTkVYVF9BU1RfTk9ERV9JRDtcbiAgICBORVhUX0FTVF9OT0RFX0lEICs9IG5iQ2hpbGQ7XG5cbiAgICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBU1ROb2RlKCkge1xuICAgIHJldHVybiBORVhUX0FTVF9OT0RFX0lEKys7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBU1ROb2RlcyhuYjogbnVtYmVyKSB7XG4gICAgTkVYVF9BU1RfTk9ERV9JRCArPSBuYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9wX3Jlc2V0KCkge1xuICAgIFZBTFVFUy5sZW5ndGggPSAwO1xuICAgIE5FWFRfQVNUX05PREVfSUQgPSAwO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBCVUZGRVIucmVzaXplKCAwICk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEJVRkZFUi5yZXNpemUoIEJVRkZFUl9TSVpFICk7XG59XG5cbmV4cG9ydCBjb25zdCBBU1ROT0RFX1RZUEVfSUQgICAgICAgICAgICA9IDA7IC8vIHNldCBpbml0aWFsbHlcbmV4cG9ydCBjb25zdCBBU1ROT0RFX1BBUkVOVF9PUF9QUklPUklUWSA9IDE7XG5leHBvcnQgY29uc3QgQVNUTk9ERV9DSElMRFJFTl9TVEFSVCAgICAgPSAyOyAvLyBzZXQgaWYgY2hpbGRyZW5cbmV4cG9ydCBjb25zdCBBU1ROT0RFX05CX0NISUxEUkVOICAgICAgICA9IDM7IC8vIHNldCBpZiB1bmtub3duIG5iIGNoaWxkcmVuXG5leHBvcnQgY29uc3QgQVNUTk9ERV9SRVNVTFRfVFlQRSAgICAgICAgPSA0OyAvLyBzZXQgaWYgZXhwci5cbmV4cG9ydCBjb25zdCBBU1ROT0RFX1NJWkUgICAgICAgICAgICAgICA9IDU7XG5cbmNvbnN0IEJVRkZFUl9TSVpFID0gQVNUTk9ERV9TSVpFICogRUxFTV9TSVpFICogTUFYX05CX0FTVE5PREVTO1xuLy8gQHRzLWlnbm9yZVxuY29uc3QgQlVGRkVSID0gbmV3IEFycmF5QnVmZmVyKEJVRkZFUl9TSVpFLCB7bWF4Qnl0ZUxlbmd0aDogQlVGRkVSX1NJWkV9KTtcblxuZXhwb3J0IGNvbnN0IEFTVE5PREVTID0gbmV3IEFSUkFZX1RZUEUoQlVGRkVSKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGUobm9kZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIEFTVE5PREVTW25vZGUgKiBBU1ROT0RFX1NJWkUgKyBBU1ROT0RFX1RZUEVfSURdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5iQ2hpbGQocGFyZW50OiBudW1iZXIpIHtcbiAgICByZXR1cm4gQVNUTk9ERVNbcGFyZW50ICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9OQl9DSElMRFJFTl07XG59XG5leHBvcnQgZnVuY3Rpb24gZmlyc3RDaGlsZChwYXJlbnQ6IG51bWJlcikge1xuICAgIHJldHVybiBBU1ROT0RFU1twYXJlbnQgKiBBU1ROT0RFX1NJWkUgKyBBU1ROT0RFX0NISUxEUkVOX1NUQVJUXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXN1bHRUeXBlKG5vZGU6IG51bWJlcikge1xuICAgIHJldHVybiBBU1ROT0RFU1tub2RlICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9SRVNVTFRfVFlQRV07XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyZW50T1BQcmlvKG5vZGU6IG51bWJlcikge1xuICAgIHJldHVybiBBU1ROT0RFU1tub2RlICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9QQVJFTlRfT1BfUFJJT1JJVFldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VHlwZShub2RlOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gQVNUTk9ERVNbbm9kZSAqIEFTVE5PREVfU0laRSArIEFTVE5PREVfVFlQRV9JRF0gPSB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRSZXN1bHRUeXBlKG5vZGU6IG51bWJlciwgdmFsdWU6IG51bWJlcikge1xuICAgIEFTVE5PREVTW25vZGUgKiBBU1ROT0RFX1NJWkUgKyBBU1ROT0RFX1JFU1VMVF9UWVBFXSA9IHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldFBhcmVudE9QUHJpbyhub2RlOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBBU1ROT0RFU1tub2RlICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9QQVJFTlRfT1BfUFJJT1JJVFldID0gdmFsdWU7XG59XG4iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHsgQVNUX0NPTlZFUlQgfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgZ2V0U1R5cGVJRCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgZG9wX3Jlc2V0LCB7QVNUTk9ERV9SRVNVTFRfVFlQRSwgQVNUTk9ERV9TSVpFLCBBU1ROT0RFX1RZUEVfSUQsIEFTVE5PREVTLCBDT0RFX0JFR19DT0wsIENPREVfQkVHX0xJTkUsIENPREVfQ09MLCBDT0RFX0VORF9DT0wsIENPREVfRU5EX0xJTkUsIENPREVfTElORSwgY3JlYXRlQVNUTm9kZSwgZmlyc3RDaGlsZCwgUFlfQ09ERSwgcmVzdWx0VHlwZSwgVkFMVUVTfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBSRVRfSU5ULCBSRVRVUk5fVFlQRV9GQ1QgfSBmcm9tIFwic3RydWN0cy9SZXR1cm5UeXBlRmN0c1wiO1xuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXMgICA6IHR5cGVvZiBBU1ROT0RFUyxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludE5vZGUoaWQ6IG51bWJlcikge1xuICAgIGNvbnNvbGUud2Fybih7XG4gICAgICAgIHR5cGUgICAgIDogQVNUTk9ERVNbQVNUTk9ERV9TSVpFKmlkK0FTVE5PREVfVFlQRV9JRF0sXG4gICAgICAgIHJldF90eXBlIDogU1R5cGVzW0FTVE5PREVTW0FTVE5PREVfU0laRSppZCtBU1ROT0RFX1JFU1VMVF9UWVBFXV0sXG4gICAgICAgIHZhbHVlICAgIDogVkFMVUVTW2lkXSxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9weV9jb2RlKGlkOiBudW1iZXIsIGJyeXRob25fbm9kZTogYW55KSB7XG5cbiAgICBjb25zdCBvZmZzZXQgPSA0KmlkO1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfQkVHX0xJTkUgXSA9IGJyeXRob25fbm9kZS5saW5lbm87XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdID0gYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXQ7XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9FTkRfTElORSBdID0gYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm87XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9FTkRfQ09MICBdID0gYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0X3B5X2NvZGVfZnJvbV9saXN0KGlkOiBudW1iZXIsIGJyeXRob25fbm9kZTogYW55KSB7XG5cbiAgICBjb25zdCBvZmZzZXQgPSA0KmlkO1xuXG4gICAgY29uc3QgYmVnID0gYnJ5dGhvbl9ub2RlWzBdO1xuICAgIGNvbnN0IGVuZCA9IGJyeXRob25fbm9kZVticnl0aG9uX25vZGUubGVuZ3RoLTFdO1xuXG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9CRUdfTElORSBdID0gYmVnLmxpbmVubztcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0JFR19DT0wgIF0gPSBiZWcuY29sX29mZnNldDtcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0VORF9MSU5FIF0gPSBlbmQuZW5kX2xpbmVubztcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0VORF9DT0wgIF0gPSBlbmQuZW5kX2NvbF9vZmZzZXQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9weV9mcm9tX2JlZ19lbmQoIHNyYzogbnVtYmVyLCBkc3RfYmVnOiBudW1iZXIsIGRzdF9lbmQ6IG51bWJlciApIHtcblxuICAgIGNvbnN0IHNyY19vZmZzZXQgPSA0KnNyYztcbiAgICBjb25zdCBiZWdfb2Zmc2V0ID0gNCpkc3RfYmVnO1xuICAgIGNvbnN0IGVuZF9vZmZzZXQgPSA0KmRzdF9lbmQgKyAyO1xuXG4gICAgUFlfQ09ERVsgc3JjX29mZnNldCArIENPREVfQkVHX0xJTkUgXSA9IFBZX0NPREVbIGJlZ19vZmZzZXQgKyBDT0RFX0xJTkUgXTtcbiAgICBQWV9DT0RFWyBzcmNfb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdID0gUFlfQ09ERVsgYmVnX29mZnNldCArIENPREVfQ09MICBdO1xuXG4gICAgUFlfQ09ERVsgc3JjX29mZnNldCArIENPREVfRU5EX0xJTkUgXSA9IFBZX0NPREVbIGVuZF9vZmZzZXQgKyBDT0RFX0xJTkUgXTtcbiAgICBQWV9DT0RFWyBzcmNfb2Zmc2V0ICsgQ09ERV9FTkRfQ09MICBdID0gUFlfQ09ERVsgZW5kX29mZnNldCArIENPREVfQ09MICBdO1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXJbXT4gPSB7fVxuXG5mb3IobGV0IGkgPSAwIDsgaSA8IEFTVF9DT05WRVJULmxlbmd0aDsgKytpKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBBU1RfQ09OVkVSVFtpXTtcblxuICAgIGxldCBuYW1lcyA9IFtcIm51bGxcIl07XG4gICAgaWYoIFwiYnJ5dGhvbl9uYW1lXCIgaW4gbW9kdWxlKSB7XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkobW9kdWxlLmJyeXRob25fbmFtZSkgKVxuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuYnJ5dGhvbl9uYW1lO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBuYW1lcyA9IFttb2R1bGUuYnJ5dGhvbl9uYW1lIGFzIHN0cmluZ11cbiAgICB9XG5cbiAgICBmb3IoY29uc3QgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ICAgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcbiAgICBcbiAgICBjb25zdCBub2RlcyA9IGNvbnZlcnRfYXN0KF9hc3QpXG5cblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsIC8vVE9ETzogc2xpY2VcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSkge1xuXG4gICAgZG9wX3Jlc2V0KCk7XG5cbiAgICBjb252ZXJ0X2JvZHkoY3JlYXRlQVNUTm9kZSgpLCBhc3QuYm9keSwgbmV3IENvbnRleHQoKSApO1xuXG4gICAgcmV0dXJuIEFTVE5PREVTO1xuXG4gICAgLypmdW5jdGlvbiBjb3VudChub2RlOiBBU1ROb2RlKSB7XG5cbiAgICAgICAgbGV0IHN1bSA9IDE7IC8vIGNvdW50IG15c2VsZlxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSApXG4gICAgICAgICAgICBzdW0gKz0gY291bnQobm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfVxuICAgIGNvbnNvbGUud2FybiggY291bnQocmVzdWx0KSApOyovXG59XG5cblxuZnVuY3Rpb24gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBzdHJpbmcge1xuXG4gICAgLy8gbGlrZWx5IGEgYm9keS5cbiAgICBpZiggQXJyYXkuaXNBcnJheShicnl0aG9uX25vZGUpIClcbiAgICAgICAgcmV0dXJuIFwiQm9keVwiO1xuXG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN3YXBBU1ROb2RlcyhhOiBudW1iZXIsIGI6IG51bWJlciApIHtcblxuICAgIGNvbnN0IGFvID0gQVNUTk9ERV9TSVpFICogYTtcbiAgICBjb25zdCBibyA9IEFTVE5PREVfU0laRSAqIGI7XG5cbiAgICBsZXQgdDphbnk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IEFTVE5PREVfU0laRTsgKytpKSB7XG4gICAgICAgIHQgPSBBU1ROT0RFU1thbytpXTtcbiAgICAgICAgQVNUTk9ERVNbYW8raV0gPSBBU1ROT0RFU1tibytpXTtcbiAgICAgICAgQVNUTk9ERVNbYm8raV0gPSB0O1xuICAgIH1cblxuICAgIGNvbnN0IGFwID0gNCphO1xuICAgIGNvbnN0IGJwID0gNCpiO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgdCA9IFBZX0NPREVbYXAraV07XG4gICAgICAgIFBZX0NPREVbYXAraV0gPSBQWV9DT0RFW2JwK2ldO1xuICAgICAgICBQWV9DT0RFW2JwK2ldID0gdDtcbiAgICB9XG5cbiAgICB0ID0gVkFMVUVTW2FdO1xuICAgIFZBTFVFU1thXSA9IFZBTFVFU1tiXTtcbiAgICBWQUxVRVNbYl0gPSB0O1xuXG59XG5cbmNvbnN0IGJvZHkgPSBtb2R1bGVzLkJvZHlbMF1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYm9keShpZDogbnVtYmVyLCBicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgQVNUX0NPTlZFUlRbYm9keV0gICAgKGlkLCBicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgIHNldF9weV9jb2RlX2Zyb21fbGlzdChpZCwgYnJ5dGhvbl9ub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShpZDogbnVtYmVyLCBicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYobmFtZSA9PT0gXCJFeHByXCIpIHtcbiAgICAgICAgYnJ5dGhvbl9ub2RlID0gYnJ5dGhvbl9ub2RlLnZhbHVlO1xuICAgICAgICBuYW1lID0gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW5kaWRhdGVzID0gbW9kdWxlc1tuYW1lXTtcblxuICAgIGlmKCBjYW5kaWRhdGVzID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk1vZHVsZSBub3QgcmVnaXN0ZXJlZDpcIiwgbmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlICk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIC8vIHdlIG1heSBoYXZlIG1hbnkgbW9kdWxlcyBmb3IgdGhlIHNhbWUgbm9kZSB0eXBlLlxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZiggQVNUX0NPTlZFUlRbY2FuZGlkYXRlc1tpXV0oaWQsIGJyeXRob25fbm9kZSwgY29udGV4dCkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHNldF9weV9jb2RlKGlkLCBicnl0aG9uX25vZGUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG5vZGUgJHtuYW1lfSBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dCA9IFJvb3RDb250ZXh0KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7IC8vVE9ETzogcmVtb3ZlXG4gICAgICAgIHRoaXMubG9jYWxfc3ltYm9scyA9IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF9zeW1ib2xzfTtcbiAgICB9XG5cbiAgICBsb2NhbF9zeW1ib2xzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xuICAgIHBhcmVudF9ub2RlX2NvbnRleHQ/OiBudW1iZXI7IFxuXG4gICAgdHlwZTsgLy9UT0RPOiByZW1vdmVcbn1cblxuY29uc3QgdHlwZV9mY3QgPSB7fSAvKiBmY3QgY2xhc3MgPT4gdHlwZSBjbGFzcyAqL1xuXG4vL1RPRE86IG1vdmUuLi5cbi8vVE9ETzogYmluYXJ5L3VuYXJ5XG4vL1RPRE86IHJlbW92ZSByZXR1cm5fdHlwZSAoZ2V0IGZyb20gdGhlIF9fe25hbWV9X18pXG5mdW5jdGlvbiBnZW5VbmFyeU9wRmN0KG5hbWU6IHN0cmluZywgcmV0dXJuX3R5cGU6IFJFVFVSTl9UWVBFX0ZDVCkge1xuICAgIGNvbnN0IG9wbmFtZSA9IGBfXyR7bmFtZX1fX2A7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX19jbGFzc19fOiB0eXBlX2ZjdCxcbiAgICAgICAgX19uYW1lX18gOiBuYW1lLFxuICAgICAgICBfX2NhbGxfXyA6IHtcbiAgICAgICAgICAgIC8vVE9ETzogSSBuZWVkIGEgc2VsZi4uLlxuICAgICAgICAgICAgcmV0dXJuX3R5cGUgICAgOiByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIC8vIG5vdCByZWFsbHkgOj9cbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKGNhbGw6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgICA9IGZpcnN0Q2hpbGQoY2FsbCkrMTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2QgPSBTVHlwZXNbcmVzdWx0VHlwZShsZWZ0KV0hW29wbmFtZV0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShjYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy9UT0RPOiBub3QgYSB0eXBlICEhIVxuY29uc3QgbGVuID0gYWRkU1R5cGUoXCJsZW5cIiwgZ2VuVW5hcnlPcEZjdChcImxlblwiLCBSRVRfSU5UKSk7XG5cbi8vIGJ1aWx0aW4gc3ltYm9scy5cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IFJvb3RDb250ZXh0OiBDb250ZXh0ID0ge1xuICAgIHR5cGU6IFwiP1wiIGFzIGNvbnN0LFxuICAgIGxvY2FsX3N5bWJvbHM6IHtcbiAgICAgICAgaW50ICA6IGdldFNUeXBlSUQoJ3R5cGVbaW50XScpLFxuICAgICAgICBzdHIgIDogZ2V0U1R5cGVJRCgndHlwZVtzdHJdJyksXG4gICAgICAgIGZsb2F0OiBnZXRTVHlwZUlEKCd0eXBlW2Zsb2F0XScpLFxuICAgICAgICBsZW4sXG5cbiAgICAgICAgLy8gYWRkIGZ1bmN0aW9ucyBsaWtlIGxlbigpIC8gcG93KCkgLyBkaXZtb2QoKVxuICAgIH1cbn0gc2F0aXNmaWVzIENvbnRleHQ7IiwiLy8gQHRzLW5vY2hlY2tcblxuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbnR5cGUgQ3Vyc29yID0ge1xuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGxpbmUgIDogbnVtYmVyLFxuICAgIGxpbmVfb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3Qgbm9kZXMgPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcblxuICAgIGxldCBjdXJzb3IgPSB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgbGluZV9vZmZzZXQgOiAwXG4gICAgfTtcblxuICAgIGxldCBjaGFyO1xuICAgIGRvIHtcbiAgICAgICAgbm9kZXMucHVzaCggcGFyc2VFeHByZXNzaW9uKGNvZGUsIGN1cnNvcikgYXMgYW55KTtcbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgICAgIHdoaWxlKCBjaGFyID09PSAnXFxuJyApIHtcbiAgICAgICAgICAgIGNoYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0gY3Vyc29yLm9mZnNldDtcblxuICAgIH0gd2hpbGUoIGNoYXIgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgLy9jb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHQvL2NvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2NvbnZlcnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTeW1ib2woY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJ2EnICYmIGNhciA8PSAneicgfHwgY2FyID49ICdBJyAmJiBjYXIgPD0gJ1onIHx8IGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyB8fCBjYXIgPT0gJ18nIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KTtcblxuICAgIC8vVE9ETzogaWYga2V5d29yZC4uLlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwic3ltYm9sXCIsXG4gICAgICAgIHZhbHVlICAgOiBzeW1ib2wsIC8vVE9ETzogY2YgY29udmVydCAoc2VhcmNoIGluIGxvY2FsIHZhcmlhYmxlcy9Db250ZXh0Li4uKVxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19jb252ZXJ0XG4gICAgfTtcbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19pbnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIC8vVE9ETzogcmVhbC4uLlxuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5pbnRcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfaW50LFxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19zdHIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJ1wiJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgICsrY3Vyc29yLm9mZnNldDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5zdHJpbmdcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfc3RyLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG5cbiAgICBsZXQgbGVmdCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICBpZiggY2hhciA9PT0gJ1xcbicpXG4gICAgICAgIHJldHVybiBsZWZ0O1xuXG4gICAgbGV0IG9wID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIG9wIS5jaGlsZHJlblswXSA9IGxlZnQ7XG4gICAgb3AucHljb2RlLnN0YXJ0ID0gbGVmdC5weWNvZGUuc3RhcnQ7XG5cbiAgICBsZXQgdmFsdWVzID0gW29wLCBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcildO1xuXG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgIT09ICdcXG4nICkge1xuXG4gICAgICAgIGxldCBvcDIgICA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGxldCBvcDEgID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl07XG4gICAgICAgIGxldCBsZWZ0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG5cbiAgICAgICAgLy9UT0RPOiBoYW5kbGUgb3AgcHJpb3JpdHkuLi5cbiAgICAgICAgLy8gKGErYikrY1xuXG4gICAgICAgIC8vIChhK2IpXG4gICAgICAgIG9wMSEuY2hpbGRyZW5bMV0gPSBsZWZ0O1xuICAgICAgICBvcDEhLnB5Y29kZS5lbmQgID0gbGVmdC5weWNvZGUuZW5kOyBcblxuICAgICAgICAvLyAoKStjXG4gICAgICAgIG9wMiEuY2hpbGRyZW5bMF0gPSBvcDE7XG4gICAgICAgIG9wMi5weWNvZGUuc3RhcnQgPSBvcDEucHljb2RlLnN0YXJ0O1xuXG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdID0gb3AyO1xuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXSA9IHJpZ2h0O1xuXG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIH1cblxuICAgIHZhbHVlc1swXSEuY2hpbGRyZW5bMV0gPSB2YWx1ZXNbMV07XG4gICAgdmFsdWVzWzBdIS5weWNvZGUuZW5kICA9IHZhbHVlc1sxXS5weWNvZGUuZW5kO1xuXG4gICAgcmV0dXJuIHZhbHVlc1swXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRvcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXQrK107XG4gICAgLypcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTsqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwib3BlcmF0b3JzLlwiICsgY2hhcixcbiAgICAgICAgdmFsdWUgICA6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBDT1JFX01PRFVMRVNbXCJvcGVyYXRvcnMuXCIgKyBjaGFyXS5BU1QySlMsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VuKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgKVxuICAgICAgICBjaGFyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIC8vIGlnbm9yZSBjaGFyXG4gICAgaWYoIGNoYXIgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gbnVsbFxuICAgIGlmKCBjaGFyID09PSAnXCInKVxuICAgICAgICBub2RlID0gcGFyc2VTdHJpbmcoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICdhJyAmJiBjaGFyIDw9ICd6JyB8fCBjaGFyID49ICdBJyAmJiBjaGFyIDw9ICdaJyB8fCBjaGFyID09ICdfJyApXG4gICAgICAgIG5vZGUgPSBwYXJzZVN5bWJvbChjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBub2RlID0gcGFyc2VOdW1iZXIoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUgPSBwYXJzZU9wZXJhdG9yKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIC8vOyB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoZW4gcGFyc2luZyAke2NoYXJ9IGF0ICR7Y3Vyc29yLmxpbmV9OiR7Y3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldH0gKCR7Y3Vyc29yLm9mZnNldH0pYCk7XG5cbiAgICBub2RlLnB5Y29kZSA9IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UT0RPOiBpcyBuZXh0IGFuIG9wZXJhdG9yID8gLT4gY29uc3RydWlyZSBhcmJyZS4uLlxuICAgIC8vVE9ETyBoYW5kbGUgb3BlcmF0b3JzID9cblxuICAgIHJldHVybiBub2RlO1xuXG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IHtfYl8sIF9yX307XG5cbi8vIGNsYXNzZSA/XG5cblxuZXhwb3J0IGNsYXNzIFNCcnl0aG9uIHtcblxuICAgICNyZWdpc3RlcmVkX0FTVDogUmVjb3JkPHN0cmluZywgQVNUPiA9IHt9O1xuICAgICNleHBvcnRlZDogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pj4gPSB7XG4gICAgICAgIGJyb3dzZXI6IGdsb2JhbFRoaXNcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBydW5BU1QoKSA/XG4gICAgLy9UT0RPOiBydW5QeXRob25Db2RlKCkgP1xuXG4gICAgLy9UT0RPOiBzb21laG93LCByZW1vdmUgQVNUIGFyZyA/Pz9cbiAgICBidWlsZE1vZHVsZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgaWYoYXN0LmZpbGVuYW1lIGluIHRoaXMuI3JlZ2lzdGVyZWRfQVNUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBU1QgJHthc3QuZmlsZW5hbWV9IGFscmVhZHkgcmVnaXN0ZXJlZCFgKTtcblxuICAgICAgICAvL1RPRE86IGZpbGVuYW1lIDIgbW9kdWxlbmFtZS5cbiAgICAgICAgdGhpcy4jcmVnaXN0ZXJlZF9BU1RbYXN0LmZpbGVuYW1lXSA9IGFzdDtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGpzY29kZSk7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgfVxuXG4gICAgcnVuSlNDb2RlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICB0aGlzLiNleHBvcnRlZFthc3QuZmlsZW5hbWVdID0gdGhpcy5idWlsZE1vZHVsZShqc2NvZGUsIGFzdCkodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCIuL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19JTlQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkLCBwYXJlbnRPUFByaW8sIHJlc3VsdFR5cGUsIHNldFBhcmVudE9QUHJpbywgc2V0UmVzdWx0VHlwZSwgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udmVydGVyLCBOT0NPTlZFUlQgfSBmcm9tIFwiLi9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRVUk5fVFlQRV9GQ1QgfSBmcm9tIFwiLi9SZXR1cm5UeXBlRmN0c1wiO1xuXG4vLyBjdXJyZW50XG4gICAgLy8gYXN0bmFtZSA9PiBweW5hbWUgKGJuYW1lMnB5bmFtZSlcbiAgICAvLyBweW5hbWUgPT4gci5weW5hbWUgKEJpbmFyeU9wZXJhdG9ycykgLSBhZGRzIHIgZXhjZXB0IGVxL25lLyhsL2cpKHQvZSlcbiAgICAvLyBweW5hbWUgPT4gYS5weW5hbWUgKEFzc2lnbk9wZXJhdG9ycykgLSBhZGRzIFwiaVwiXG4gICAgLy8ganNuYW1lID0+IHB5bmFtZSAoanNvcDJweW9wKVxuLy8gYXN0bmFtZSA9PiBJRFggPT4gUHkgbmFtZSAoPykgW25lZWRzIHB5IG5hbWUgYXMgaXQgaXMgb24gaXRzIFNUeXBlLi4uXVxuICAgIC8vIEFTVCBUeXBlIElEID0gT1BfSURYICsgQ1NOVEUgP1xuICAgIC8vIHJldmVyc2UvYXNzaWduL0pTX09QX0lEWCA9IElEWCArIENTTlRFID9cbiAgICAvLyByZW1vdmUganNuYW1lID0+IHB5bmFtZSAodXNlIENTTlRFICsgcmV1c2UgbGlzdHMpLlxuXG4vLyBjdXJyZW50XG4gICAgLy8gYSBvcCBiIGpzIGNtcCA9PiBiIG9wIGEganMgY21wIChyZXZlcnNlKSBbd2l0aCB0aGUgb3BlcmF0b3Igd2FzIHJldmVyc2VkXVxuICAgIC8vIGpzIG9wID0+IHByaW9yaXR5IChKU09wZXJhdG9yc1ByaW9yaXR5KSAhIHUuLSAoZm9yIHVuYXJ5IC0pXG4vLyB1c2UgSlNPUF9JRFggPT4gZ2V0IHJldmVyc2VkICsgcHJpb3JpdHkgKyBqc3N5bWIgP1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG4vLyBhZGRzIGlcbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbi8vIGJpZ2dlciA9IG1vcmUgcHJpb3JpdHkgKDAgYnkgZGVmYXVsdCkuXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgW10sXG4gICAgWyc9J10sIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3wnXSwgIC8vVE9ET1xuICAgIFsnXiddLCAgLy9UT0RPXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJzwnLCAnPD0nLCAnPj0nLCAnPiddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnKycsICctJ10sXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJyoqJ10sICAgICAgICAgIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnIScsICcrKycsICctLScsICd+JywgJ3UuLSddLFxuXTtcblxuLypcbmh0dHBzOi8vZG9jcy5weXRob24ub3JnLzMvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNjYWxsYWJsZVxuXG4tPiBjbGFzc2VzXG5ib29sKClcbmZsb2F0KClcbmludCgpXG5zdHIoKVxuYnl0ZWFycmF5KCkgW1VpbnQ4QXJyYXldIChSVylcbmJ5dGVzKCkgICAgIFs/XSAgICAgICAgICAoUk8pIDwtIG5vIHR5cGVzIGluIEpTLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LSBVaW50OEFycmF5IHdpdGggZmxhZyA/IGZyZWV6ZSgpIFtKUyB1bnNhZmVdXG4gICAgICAgICAgICBiXCJlXFx4RkZcIiBpbnN0ZWFkIG9mIFsxMDEsMTAxXSwgZXRjLiAoMzIgPD0gYnl0IDw9IDEyNilcbnR5cGUoKVxubGlzdCgpICAgICAgW0FycmF5XVxudHVwbGUoKSAgICAgW09iamVjdC5mcm96ZW4oQXJyYXkpXVxuXG5zZXQoKSAgICAgICAvLyByZWxpZXMgb24gaGFzaCgpLi4uID0+IHNldFtsaXRlcmFsc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBzZXQoKSAvIDwtIEpTIHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgPT4gYnl0ZXMvYnl0ZWFycmF5L2V0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IFNldCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IEludGVybmFsIGtleXMoKSBzZXQgW3JlY29tcHV0ZSBoYXNoIHdoZW4gYWRkL3JlbW92ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbnRlcm5hbGx5IHN0b3JlZCBhcyBNYXAoaGFzaCwgdmFsdWUpICg/KVxuZnJvemVuc2V0KCkgICAgICAgICAgICA9PiBleHRlbmRzIHNldCB0byByZXBsYWNlIG1vZGlmaWVycy5cblxuZGljdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3N0cl0gYXMgT2JqZWN0LmNyZWF0ZShudWxsKSArIChhbmQgcHVyZSBKU09iaiBhcyBkaWN0W3N0cl0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBNYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IFNldChoYXNoKSAvIE1hcChoYXNoLCBrZXkpIC8gTWFwKGtleSwgaGFzaCkgPz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldC9zZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gTWFwKGtleSwgdmFsdWUpXG5cbm9iamVjdCgpXG5jb21wbGV4KClcbm1lbW9yeXZpZXcoKSAgICAgICAgICAgID0+IEFycmF5QnVmZmVyID9cblxuLT4gcHJpbnRcbmFzY2lpKClcbmJpbigpXG5oZXgoKVxub2N0KClcbnJlcHIoKVxuaGFzaCgpXG5cbi0+IG1hdGhzXG5hYnMoKVxuZGl2bW9kKClcbnBvdygpXG5yb3VuZCgpXG5cbi0+IGxpc3RzXG5hbGwoKVxuYW55KClcbmZpbHRlcigpXG5tYXAoKVxubWF4KClcbm1pbigpXG5zdW0oKVxubGVuKClcbmVudW1lcmF0ZSgpXG5yZXZlcnNlZCgpXG5zbGljZSgpXG5zb3J0ZWQoKVxuemlwKClcblxuLT4gaXRlclxucmFuZ2UoKVxuYWl0ZXIoKVxuaXRlcigpXG5hbmV4dCgpXG5uZXh0KClcblxuLT4gc3RyXG5vcmQoKVxuY2hyKClcbmZvcm1hdCgpXG5wcmludCgpXG5mXCJcIlxuXG5jYWxsYWJsZSgpXG5jbGFzc21ldGhvZCgpXG5zdGF0aWNtZXRob2QoKVxucHJvcGVydHkoKVxuc3VwZXIoKVxuaXNpbnN0YW5jZSgpXG5pc3N1YmNsYXNzKClcbmRlbGF0dHIoKVxuZ2V0YXR0cigpXG5oYXNhdHRyKClcbnNldGF0dHIoKVxuZGlyKClcblxuZXZhbCgpXG5leGVjKClcbmNvbXBpbGUoKVxuYnJlYWtwb2ludCgpXG5cbmdsb2JhbHMoKVxubG9jYWxzKClcbnZhcnMoKVxuX19pbXBvcnRfXygpXG5cbmlkKClcbiAgICAtPiBvbi1kZW1hbmQgd2Vha3JlZiA/XG5cbmhlbHAoKVxuaW5wdXQoKVxub3BlbigpXG5cbiovXG5cbi8qXG51bmFyeVxuLSBwb3MgKHVuYXJ5ICspXG5cbi0gYm9vbFxuLSBmbG9hdFxuLSBpbnRcbi0gc3RyXG4tIHJlcHJcblxuLSBhYnNcbi0gY2VpbFxuLSBmbG9vclxuLSByb3VuZFxuLSB0cnVuY1xuXG5iaW5hcnlcbi0gcG93L3Jwb3dcbi0gZGl2bW9kL3JkaXZtb2RcblxuY2xhc3Ncbi0gY2xhc3Ncbi0gbmV3XG4tIGluaXRcbi0gaW5pdF9zdWJjbGFzc1xuXG4tIHN1YmNsYXNzaG9vayAvLyBfX2lzaW5zdGFuY2VjaGVja19fIFxuXG4tIGRpclxuLSBkZWxhdHRyXG4tIHNldGF0dHJcbi0gZ2V0YXR0cmlidXRlXG5cbi0gZG9jXG4tIGZvcm1hdFxuLSBnZXRuZXdhcmdzXG4tIGhhc2hcbi0gaW5kZXggKD8pXG4tIHNpemVvZlxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogbnVtYmVyLCB0YXJnZXQgPSBTVFlQRV9GTE9BVCkge1xuXG4gICAgaWYoIHJlc3VsdFR5cGUoYSkgIT09IFNUWVBFX0lOVCkgLy8gYWxyZWFkeSBhIG51bWJlclxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCB0eXBlKGEpID09PSBMSVRFUkFMU19JTlQpIHtcbiAgICAgICAgLy8gaWYgYmlnaW50IGNhbid0IHNhZmVseSBjb252ZXJ0IHRvIEpTSU5ULlxuICAgICAgICBpZiggdGFyZ2V0ID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgICAgICBzZXRSZXN1bHRUeXBlKGEsIFNUWVBFX0pTSU5UKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgY29uc3QgYV92YWx1ZSA9IFZBTFVFU1thXTtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKGEpO1xuXG4gICAgaWYoIGFfdmFsdWUgPT09ICdfX211bF9fJyB8fCBhX3ZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCk7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KzEpO1xuICAgICAgICBpZiggICAgKGx0eXBlID09PSBTVFlQRV9JTlQgfHwgbHR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgJiYgKHJ0eXBlID09PSBTVFlQRV9JTlQgfHwgcnR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNldFJlc3VsdFR5cGUoYSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCBhX3ZhbHVlID09PSAnX19uZWdfXycgJiYgcmVzdWx0VHlwZShjb2Zmc2V0KSA9PT0gU1RZUEVfSU5UKSB7XG4gICAgICAgIHNldFJlc3VsdFR5cGUoYSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCB0YXJnZXQgPT09IFNUWVBFX0ZMT0FUIClcbiAgICAgICAgcmV0dXJuIHJgTnVtYmVyKCR7YX0pYDtcblxuICAgIC8vIGludCAtPiBqc2ludCBjYXN0IGlzIGZhY3VsdGF0aXZlLi4uXG4gICAgcmV0dXJuIGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOdW1iZXIySW50KGE6IG51bWJlcikge1xuXG4gICAgaWYoIHJlc3VsdFR5cGUoYSkgPT09IFNUWVBFX0lOVClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggdHlwZShhKSA9PT0gTElURVJBTFNfSU5UKSB7XG4gICAgICAgIHNldFJlc3VsdFR5cGUoYSwgU1RZUEVfSU5UKTsgLy8gZm9yY2UgYmlnaW50IGNvbnZlcnRpb25cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBWQUxVRVNbYV0gPT09ICdfX25lZ19fJyAmJiByZXN1bHRUeXBlKGZpcnN0Q2hpbGQoYSkpID09PSBTVFlQRV9KU0lOVCkge1xuICAgICAgICBzZXRSZXN1bHRUeXBlKGEsIFNUWVBFX0lOVCk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gaTtcbiAgICBmb3IoY29uc3Qgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IG51bWJlciwgb3A6IHN0cmluZyApIHtcblxuICAgIGNvbnN0IGZpcnN0ICAgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpOyBcblxuICAgIGNvbnN0IHByaW8gICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgIGNvbnN0IHBfcHJpbyA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuXG4gICAgc2V0UGFyZW50T1BQcmlvKGZpcnN0LCBwcmlvKTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIHNldFBhcmVudE9QUHJpbyggZmlyc3QgKyBpLCBwcmlvICsgMSApO1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtmaXJzdH1gO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIHJlc3VsdCA9IHJgJHtyZXN1bHR9ICYmICR7Zmlyc3QgKyBpfWA7IC8vVE9ETzogYmV0dGVyLi4uXG5cbiAgICBpZiggcF9wcmlvIDwgcHJpbyApXG4gICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gbnVsbCBvcGVyYXRpb24sIHRoZSBub2RlIGhhcyB0aGUgc2FtZSBwcmlvcml0eSBhcyBoaXMgZmF0aGVyLlxuLy8gMippbnQoMSsxKSA9PiAyKigxKzEpXG5leHBvcnQgZnVuY3Rpb24gaWRfanNvcChub2RlOiBudW1iZXIsIGE6IG51bWJlcikgeyAvLyBUT0RPIHJlbW92ZSBhcmcgP1xuXG4gICAgc2V0UGFyZW50T1BQcmlvKCBhLCBwYXJlbnRPUFByaW8obm9kZSkgKTtcblxuICAgIHJldHVybiByYCR7YX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogbnVtYmVyLCBhOiBudW1iZXJ8YW55LCBvcDogc3RyaW5nLCBiOiBudW1iZXJ8YW55KSB7XG5cbiAgICBjb25zdCAgIHByaW8gPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICBjb25zdCBwX3ByaW8gPSBwYXJlbnRPUFByaW8obm9kZSk7XG5cbiAgICBpZih0eXBlb2YgYSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgc2V0UGFyZW50T1BQcmlvKGEsIHByaW8pO1xuXG4gICAgaWYodHlwZW9mIGIgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHNldFBhcmVudE9QUHJpbyhiLCBwcmlvKTtcblxuICAgIGxldCBjbXAgPSByYCR7YX0ke29wfSR7Yn1gO1xuICAgIC8vIGlmIGZhdGhlciBoYXMgbW9yZSBwcmlvLCBhZGQgcGFyZW50aGVzaXMuXG4gICAgaWYoIHBfcHJpbyA+IHByaW8gKVxuICAgICAgICBjbXAgPSByYCgke2NtcH0pYDtcblxuICAgIHJldHVybiBjbXA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogbnVtYmVyLCBvcDogc3RyaW5nLCBhOiBudW1iZXJ8YW55KSB7XG5cbiAgICBsZXQgcm9wID0gb3A7XG4gICAgaWYoIHJvcCA9PT0gJy0nKVxuICAgICAgICByb3AgPSAndS4tJztcblxuICAgIC8vIHVuYXJ5IEpTIE9wIHByaW8gbGlzdCAoPylcbiAgICBjb25zdCBwcmlvICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W3JvcF07XG4gICAgY29uc3QgcF9wcmlvID0gcGFyZW50T1BQcmlvKG5vZGUpO1xuXG4gICAgaWYodHlwZW9mIGEgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHNldFBhcmVudE9QUHJpbyhhLCBwcmlvKTtcblxuICAgIGxldCBjbXAgPSByYCR7b3B9JHthfWA7XG4gICAgLy8gaWYgZmF0aGVyIGhhcyBtb3JlIHByaW8sIGFkZCBwYXJlbnRoZXNpcy5cbiAgICBpZiggcF9wcmlvID4gcHJpbyApXG4gICAgICAgIGNtcCA9IHJgKCR7Y21wfSlgO1xuXG4gICAgcmV0dXJuIGNtcDtcbn1cblxuXG5cbnR5cGUgR2VuVW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogQ29udmVydGVyLFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogbnVtYmVyLCBhOiBudW1iZXIpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMob3BzICAgICAgICA6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlblVuYXJ5T3BzX09wdHMgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICd1Li0nKVxuICAgICAgICAgICAgb3AgPSAnLSc7XG5cbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsID8/PSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsIG9wLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG50eXBlIEdlbkJpbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfb3RoZXIgICA/OiBDb252ZXJ0ZXIsXG4gICAgY29udmVydF9zZWxmICAgID86IENvbnZlcnRlcixcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyfGFueSwgb3RoZXI6IG51bWJlcnxhbnkpID0+IGFueVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkJpbmFyeU9wcyhvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsIFxuICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gTk9DT05WRVJULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICcvLycpXG4gICAgICAgICAgICBvcCA9ICcvJztcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvdGhlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBvcCwgY29udmVydF9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByY3MgPSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG90aGVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X290aGVyKG90aGVyKSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG86IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252ZXJ0X290aGVyKG8pICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNhbWVfb3JkZXIgPyBmY3QgOiBcbiAgICAgICAgICAgIHJjcyA9IChub2RlOiBudW1iZXIsIHNlbGY6IG51bWJlciwgbzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X290aGVyKG8pLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdFtgX19yJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogcmNzLFxuICAgICAgICB9O1xuICAgICAgICBpZiggY29udmVydF9zZWxmID09PSBOT0NPTlZFUlQgJiYgc3Vic3RpdHV0ZV9jYWxsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHRbYF9faSR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvdGhlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlcl92YWx1ZSA9IFZBTFVFU1tvdGhlcl07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXJfdmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXJfdmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZlcnRfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5DbXBPcHMoICBvcHMgICAgICAgIDogcmVhZG9ubHkgKGtleW9mIHR5cGVvZiByZXZlcnNlKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IE5PQ09OVkVSVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9ICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgZm9yKGNvbnN0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG90aGVyOiBudW1iZXIsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb3AgPSBvcDtcblxuICAgICAgICAgICAgbGV0IGEgPSBjb252ZXJ0X3NlbGYoc2VsZik7XG4gICAgICAgICAgICBsZXQgYiA9IGNvbnZlcnRfb3RoZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIHJldmVyc2VkICkge1xuICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHJlc3VsdFR5cGUoc2VsZikgPT09IHJlc3VsdFR5cGUob3RoZXIpIClcbiAgICAgICAgICAgICAgICAgICAgY29wID0gY29wICsgJz0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgY29wLCBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBzdWJzdGl0dXRlX2NhbGwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgY3MgID0gKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvOiBudW1iZXIsIF86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udmVydF9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgcmVzdWx0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIE51bWJlcjJJbnQgfSBmcm9tIFwiLi9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG50eXBlIFByaW50YWJsZSA9IHsgdG9TdHJpbmcoKTogc3RyaW5nIH07XG5cbmV4cG9ydCB0eXBlIENvbnZlcnRlciA9IChub2RlOiBudW1iZXIpID0+IG51bWJlciB8IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKG51bWJlciB8IFByaW50YWJsZSlbXV07XG5cbmV4cG9ydCBjb25zdCBOT0NPTlZFUlQgPSAobm9kZTogbnVtYmVyKSA9PiBub2RlO1xuXG5leHBvcnQgY29uc3QgQ09OVkVSVF9JTlQyRkxPQVQgPSBJbnQyTnVtYmVyO1xuZXhwb3J0IGNvbnN0IENPTlZFUlRfMklOVCAgICAgID0gTnVtYmVyMkludDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBudW1iZXJbXSkge1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb252ZXJ0Lmxlbmd0aDsgaSs9MilcbiAgICAgICAgdGFibGVbY29udmVydFtpXV0gPSBjb252ZXJ0W2krMV07XG5cbiAgICByZXR1cm4gKG5vZGU6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBzcmMgICAgPSByZXN1bHRUeXBlKG5vZGUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0YWJsZVtzcmNdO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgICAgLy9UT0RPOiBpbXByb3ZlOlxuICAgICAgICBpZiggc3JjID09PSBTVFlQRV9JTlQpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBTVFlQRV9JTlQgKVxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQobm9kZSk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5mb3VuZCBjb252ZXJzaW9uXCIpO1xuICAgIH07XG59IiwiaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVFlQRV9CT09MLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9TVFIsIFNUWVBFX0pTSU5UIH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5cbmV4cG9ydCB0eXBlIFJFVFVSTl9UWVBFX0ZDVCA9IChvOiBudW1iZXIpID0+IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JSkJGMkJPT0wobzogbnVtYmVyKSB7XG4gICAgaWYoIFNUWVBFX0lOVCA8PSBvICYmIG8gPD0gU1RZUEVfRkxPQVQpXG4gICAgICAgIHJldHVybiBTVFlQRV9CT09MO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUpCRjJGTE9BVChvOiBudW1iZXIpIHtcbiAgICBpZiggU1RZUEVfSU5UIDw9IG8gJiYgbyA8PSBTVFlQRV9GTE9BVClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0ZMT0FUO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSlNJTlQySlNJTlQobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICByZXR1cm4gU1RZUEVfSlNJTlQ7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JSjJJTlQobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX0lOVCB8fCBvID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0lOVDtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JTlQySU5UKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9JTlQpXG4gICAgICAgIHJldHVybiBTVFlQRV9JTlQ7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9TVFIyQk9PTChvOiBudW1iZXIpIHtcbiAgICBpZiggbyA9PT0gU1RZUEVfU1RSIClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0JPT0w7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfU1RSMlNUUihvOiBudW1iZXIpIHtcbiAgICBpZiggbyA9PT0gU1RZUEVfU1RSIClcbiAgICAgICAgcmV0dXJuIFNUWVBFX1NUUjtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JSjJTVFIobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX0lOVCB8fCBvID09PSBTVFlQRV9KU0lOVCApXG4gICAgICAgIHJldHVybiBTVFlQRV9TVFI7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9GTE9BVChfOiBudW1iZXIpIHsgcmV0dXJuIFNUWVBFX0ZMT0FUOyB9XG5leHBvcnQgZnVuY3Rpb24gUkVUX0lOVCAgKF86IG51bWJlcikgeyByZXR1cm4gU1RZUEVfSU5UOyAgIH1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSlNJTlQoXzogbnVtYmVyKSB7IHJldHVybiBTVFlQRV9KU0lOVDsgfVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9TVFIgIChfOiBudW1iZXIpIHsgcmV0dXJuIFNUWVBFX1NUUjsgICB9XG5cbi8vVE9ETy4uLlxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlX3JldHVybl90eXBlKCkge1xuXG59IiwiXG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUnOyIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlcyAgPSBuZXcgQXJyYXk8U1R5cGVPYmo+KCk7XG5jb25zdCBTVHlwZW5hbWUyaWQ6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNUeXBlRnJvbU5hbWU8VCBleHRlbmRzIFNUeXBlT2JqPihuYW1lOiBzdHJpbmcpOiBUIHtcbiAgICByZXR1cm4gU1R5cGVzW2dldFNUeXBlSUQobmFtZSldIGFzIFQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTVHlwZUlEKG5hbWU6IHN0cmluZyk6IG51bWJlciB7XG5cbiAgICBsZXQgaWQgPSBTVHlwZW5hbWUyaWRbbmFtZV07XG4gICAgaWYoIGlkID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGlkID0gU1R5cGVuYW1lMmlkW25hbWVdID0gU1R5cGVzLmxlbmd0aDtcbiAgICAgICAgU1R5cGVzW2lkXSA9IHtfX25hbWVfXzogbmFtZX07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU1R5cGUobmFtZTogc3RyaW5nLCB0eXBlOiBPbWl0PFNUeXBlT2JqLCAnX19uYW1lX18nPikge1xuXG4gICAgY29uc3QgaWQgPSBnZXRTVHlwZUlEKG5hbWUpO1xuICAgIE9iamVjdC5hc3NpZ24oIFNUeXBlc1tpZF0sIHR5cGUgKTtcbiAgICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBTVFlQRV9OT05FVFlQRSAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiTm9uZVR5cGVcIik7IC8vIDAuLi5cbmV4cG9ydCBjb25zdCBTVFlQRV9JTlQgICAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiaW50XCIpO1xuZXhwb3J0IGNvbnN0IFNUWVBFX0pTSU5UICAgICAgICAgICAgICA9IGdldFNUeXBlSUQoXCJqc2ludFwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9CT09MICAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiYm9vbFwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9GTE9BVCAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiZmxvYXRcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfU1RSICAgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcInN0clwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9OT1RfSU1QTEVNRU5URUQgICAgPSBnZXRTVHlwZUlEKFwiTm90SW1wbGVtZW50ZWRUeXBlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuLy8gZGVjbGFyZSBhbGwgYnVpbHRpbiB0eXBlcy4uLlxuaW1wb3J0ICcuL3N0cnVjdHMvU1R5cGVCdWlsdGluJztcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1QySlMiLCJBUlJBWV9UWVBFIiwiQ09ERV9CRUciLCJDT0RFX0NPTCIsIkNPREVfRU5EIiwiQ09ERV9MSU5FIiwiSlNfQ09ERSIsInR5cGUiLCJDVVJTT1IiLCJqc2NvZGUiLCJzZXRfanNfY3Vyc29yIiwiaWR4IiwibGVuZ3RoIiwibmV3X2pzY29kZSIsImZpbGVuYW1lIiwiaW5kZW50IiwiY3VyX2luZGVudF9sZXZlbCIsImluZGVudHMiLCJOTCIsInRvU3RyaW5nIiwiQkIiLCJCRSIsInIiLCJhcmdzIiwid3IiLCJ3Iiwid3QiLCJzdHIiLCJpIiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwib2Zmc2V0IiwiYXN0MmpzIiwiYXN0IiwiZmlyc3RDaGlsZCIsIm5iQ2hpbGQiLCJub2RlIiwiY29mZnNldCIsIm5iQ2hpbGRyZW4iLCJCT0RZIiwiYWRkQ2hpbGQiLCJzZXRUeXBlIiwiY29udmVydF9ub2RlIiwiY29udmVydCIsImRzdCIsImNvbnRleHQiLCJicnl0aG9uX25hbWUiLCJWQUxVRVMiLCJiYXNlIiwiYm9keSIsIkNMQVNTX0NMQVNTREVGIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImdldFNUeXBlSUQiLCJsb2NhbF9zeW1ib2xzIiwibmFtZSIsImJhc2VzIiwiRXJyb3IiLCJsaXN0IiwiQ09OVFJPTEZMT1dTX0ZPUiIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsImlkIiwidGFyZ2V0IiwiTnVtYmVyMkludCIsImJlZyIsImluY3IiLCJlbmQiLCJDT05UUk9MRkxPV1NfRk9SX1JBTkdFIiwiU1RZUEVfSU5UIiwidmFsdWUiLCJDT05UUk9MRkxPV1NfSUZCTE9DSyIsImNoaWxkQ291bnQiLCJjdXIiLCJvcmVsc2UiLCJ0ZXN0IiwiQ09OVFJPTEZMT1dTX1RFUk5BUlkiLCJyZXN1bHRUeXBlIiwic2V0UmVzdWx0VHlwZSIsIkNPTlRST0xGTE9XU19UUllCTE9DSyIsImhhbmRsZXJzIiwiQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIIiwiU1lNQk9MIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJlIiwiaW5jbHVkZXMiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwibm9kZXMiLCJsaW5lIiwiY29sIiwic3RhY2tsaW5lMmFzdG5vZGUiLCJzdGFja2xpbmUiLCJzYiIsImdldEFTVEZvciIsInN0YWNrMmFzdG5vZGVzIiwibWFwIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwiam9pbiIsImxvZyIsImdldF9weV9leGNlcHRpb24iLCJfX1NCUllUSE9OX18iLCJfZXJyXyIsIl9iXyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIl9yXyIsIkpTRXhjZXB0aW9uIiwiQ09OVFJPTEZMT1dTX1dISUxFIiwiYmluYXJ5X2pzb3AiLCJTVFlQRV9KU0lOVCIsIkZVTkNUSU9OU19BUkdTX0tXQVJHIiwiRlVOQ1RJT05TX0FSR1NfVkFSRyIsIlNUeXBlX2ZjdCIsIm1ldGEiLCJfX2NhbGxfXyIsImt3X3N0YXJ0IiwiaWR4X2VuZF9wb3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImlkeF92YXJhcmciLCJrd2FyZ3MiLCJpc0xhc3QiLCJ3cml0ZV9hcmciLCJ0eXBlX2lkIiwiZGVmdmFsIiwic2V0X3B5X2NvZGUiLCJzZXRfcHlfZnJvbV9iZWdfZW5kIiwiRlVOQ1RJT05TX0FSR1MiLCJDT0RFX0JFR19DT0wiLCJDT0RFX0JFR19MSU5FIiwiQ09ERV9FTkRfQ09MIiwiQ09ERV9FTkRfTElORSIsIlBZX0NPREUiLCJGVU5DVElPTlNfQVJHU19QT1NPTkxZIiwiRlVOQ1RJT05TX0FSR1NfS1dPTkxZIiwiRlVOQ1RJT05TX0FSR1NfUE9TIiwiY29udmVydF9hcmdzIiwiX2FyZ3MiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJhcmdzX3BvcyIsImFyZ3NfbmFtZXMiLCJ0b3RhbF9hcmdzIiwicG9zb25seWFyZ3MiLCJrd29ubHlhcmdzIiwicG9zX2RlZmF1bHRzIiwiZGVmYXVsdHMiLCJwb3Nvbmx5IiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwibmJfcG9zX2RlZmF1bHRzIiwiTWF0aCIsIm1pbiIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJoYXNfa3ciLCJjb2xfb2Zmc2V0IiwicHlfb2Zmc2V0IiwibGluZW5vIiwicmVzdWx0X3R5cGUiLCJhbm5vdGF0aW9uIiwiRlVOQ1RJT05TX0NBTExfS0VZV09SRCIsInByaW50X29iaiIsIm9iaiIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJkYXRhIiwic2VwIiwiZGVmYXVsdF9jYWxsIiwia3dfcG9zIiwibmJfcG9zIiwibWF4IiwicG9zX3NpemUiLCJrdyIsImN1dG9mZiIsInZhcmdfc3RhcnQiLCJ2YXJnX25iIiwiaGFzX2t3YXJncyIsInN1YnN0aXR1dGVfY2FsbCIsIkZVTkNUSU9OU19DQUxMIiwiU1R5cGVzIiwiZmN0X3R5cGUiLCJmY3QiLCJyZXRfdHlwZSIsInJldHVybl90eXBlIiwia2V5d29yZHMiLCJGVU5DVElPTlNfREVGIiwiZ2VuZXJhdGUiLCJydHlwZSIsInN0eXBlIiwicGFyZW50X25vZGVfY29udGV4dCIsInJldHVybnMiLCJmY3RfcmV0dXJuX3R5cGUiLCJfX25hbWVfXyIsIlNUeXBlSUQiLCJsYXN0X3R5cGUiLCJmYWtlX25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJwdXNoIiwiS0VZV09SRFNfQVNTRVJUIiwiYXNzZXJ0IiwiY29uZCIsIktFWVdPUkRTX0JSRUFLIiwiS0VZV09SRFNfQ09OVElOVUUiLCJLRVlXT1JEU19JTVBPUlRfQUxJQVMiLCJhc25hbWUiLCJLRVlXT1JEU19JTVBPUlQiLCJuYW1lcyIsIm1vZHVsZSIsIktFWVdPUkRTX1JBSVNFIiwiZXhjIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIlJVTlRJTUVfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIkFTVF9DT05WRVJUXzE5IiwiQVNUMkpTXzE5IiwiQVNUX0NPTlZFUlRfMjAiLCJBU1QySlNfMjAiLCJBU1RfQ09OVkVSVF8yMSIsIkFTVDJKU18yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiUlVOVElNRV8yMiIsIkFTVF9DT05WRVJUXzIzIiwiQVNUMkpTXzIzIiwiQVNUX0NPTlZFUlRfMjQiLCJBU1QySlNfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJSVU5USU1FXzI3IiwiQVNUX0NPTlZFUlRfMjgiLCJBU1QySlNfMjgiLCJBU1RfQ09OVkVSVF8yOSIsIkFTVDJKU18yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiUlVOVElNRV8zMyIsIkFTVF9DT05WRVJUXzM0IiwiQVNUMkpTXzM0IiwiQVNUX0NPTlZFUlRfMzUiLCJBU1QySlNfMzUiLCJBU1RfQ09OVkVSVF8zNiIsIkFTVDJKU18zNiIsIkFTVF9DT05WRVJUXzM3IiwiQVNUMkpTXzM3IiwiQVNUX0NPTlZFUlRfMzgiLCJBU1QySlNfMzgiLCJBU1RfQ09OVkVSVF8zOSIsIkFTVDJKU18zOSIsIkFTVF9DT05WRVJUXzQwIiwiQVNUMkpTXzQwIiwiU1RSVUNUU19UVVBMRSIsIlNUUlVDVFNfTElTVCIsIlNUUlVDVFNfRElDVCIsIlJFVFVSTiIsIlBBU1MiLCJPUEVSQVRPUlNfVU5BUlkiLCJPUEVSQVRPUlNfQ09NUEFSRSIsIk9QRVJBVE9SU19CT09MRUFOIiwiT1BFUkFUT1JTX0JJTkFSWSIsIk9QRVJBVE9SU19BVFRSIiwiT1BFUkFUT1JTX19CUkFDS0VUUyIsIk9QRVJBVE9SU19BU1NJR05PUCIsIk9QRVJBVE9SU19fRVFfSU5JVCIsIk9QRVJBVE9SU19fRVEiLCJMSVRFUkFMU19TVFIiLCJMSVRFUkFMU19JTlQiLCJMSVRFUkFMU19GTE9BVCIsIkxJVEVSQUxTX0ZfU1RSSU5HIiwiTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUiLCJMSVRFUkFMU19CT09MIiwiTElURVJBTFNfTk9ORSIsIkFTVF9DT05WRVJUIiwiUlVOVElNRSIsImFzc2lnbiIsIlNUWVBFX05PTkVUWVBFIiwiX2NvbnRleHQiLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJhZGRTVHlwZSIsIlNUWVBFX0JPT0wiLCJDTVBPUFNfTElTVCIsImdlbkNtcE9wcyIsIlJFVF9JSkJGMkJPT0wiLCJTVFlQRV9TVFIiLCJTVFlQRV9GTE9BVCIsImZsb2F0MnN0ciIsImYiLCJ0b0V4cG9uZW50aWFsIiwic2lnbl9pZHgiLCJnZW5CaW5hcnlPcHMiLCJnZW5VbmFyeU9wcyIsIkludDJOdW1iZXIiLCJDT05WRVJUX0lOVDJGTE9BVCIsIlJFVF9JSkJGMkZMT0FUIiwiUkVUX0ZMT0FUIiwiUkVUX1NUUiIsIlNUeXBlX3R5cGVfZmxvYXQiLCJvdGhlciIsIm90aGVyX3R5cGUiLCJvdGhlcl92YWx1ZSIsIm90eXBlIiwibWV0aG9kIiwiX19pbnRfXyIsIl9fc3RyX18iLCJjb252ZXJ0X290aGVyIiwic2VsZiIsInJlYWxfdHlwZSIsImlkX2pzb3AiLCJ1bmFyeV9qc29wIiwiQ09OVkVSVF8ySU5UIiwiUkVUX0lKMklOVCIsIlJFVF9JTlQiLCJSRVRfSU5UMklOVCIsIlNUeXBlX3R5cGVfaW50IiwiYSIsImIiLCJjb252ZXJ0X3NlbGYiLCJSRVRfSlNJTlQiLCJSRVRfSlNJTlQySlNJTlQiLCJSRVRfSUoyU1RSIiwiUkVUX1NUUjJCT09MIiwiUkVUX1NUUjJTVFIiLCJTVHlwZV90eXBlX3N0ciIsIl9fbGVuX18iLCJyY2hpbGQiLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsIkFzc2lnbk9wZXJhdG9ycyIsIlNUWVBFX05PVF9JTVBMRU1FTlRFRCIsIm9wIiwiYm5hbWUycHluYW1lIiwiYXR0ciIsInN3YXBBU1ROb2RlcyIsInJldmVyc2VkX29wZXJhdG9yIiwibGVmdCIsInJpZ2h0IiwibHR5cGUiLCJmbG9vcmRpdl9mbG9hdCIsImZsb29yIiwiZmxvb3JkaXZfaW50IiwicmVzdWx0IiwibW9kX2Zsb2F0IiwibW9kIiwibW9kX2ludCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJqc29wIiwib3BzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZWx0cyIsImlzQ2xhc3MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicHJvdG90eXBlIiwid3JpdGFibGUiLCJQeV9vYmplY3QiLCJQeV9FeGNlcHRpb24iLCJQeV9KU0V4Y2VwdGlvbiIsIlJVTlRJTUVfMCIsIlJVTlRJTUVfMSIsIlJVTlRJTUVfMiIsIkZsb2F0NjRBcnJheSIsIkVMRU1fU0laRSIsIk1BWF9OQl9BU1ROT0RFUyIsIk5FWFRfQVNUX05PREVfSUQiLCJwYXJlbnQiLCJBU1ROT0RFX1NJWkUiLCJBU1ROT0RFUyIsIkFTVE5PREVfTkJfQ0hJTERSRU4iLCJBU1ROT0RFX0NISUxEUkVOX1NUQVJUIiwiY3JlYXRlQVNUTm9kZSIsImNyZWF0ZUFTVE5vZGVzIiwibmIiLCJkb3BfcmVzZXQiLCJCVUZGRVIiLCJyZXNpemUiLCJCVUZGRVJfU0laRSIsIkFTVE5PREVfVFlQRV9JRCIsIkFTVE5PREVfUEFSRU5UX09QX1BSSU9SSVRZIiwiQVNUTk9ERV9SRVNVTFRfVFlQRSIsIkFycmF5QnVmZmVyIiwibWF4Qnl0ZUxlbmd0aCIsInBhcmVudE9QUHJpbyIsInNldFBhcmVudE9QUHJpbyIsInByaW50Tm9kZSIsImJyeXRob25fbm9kZSIsInNldF9weV9jb2RlX2Zyb21fbGlzdCIsInNyYyIsImRzdF9iZWciLCJkc3RfZW5kIiwic3JjX29mZnNldCIsImJlZ19vZmZzZXQiLCJlbmRfb2Zmc2V0IiwibW9kdWxlcyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiYW8iLCJibyIsInQiLCJhcCIsImJwIiwiQm9keSIsImNhbmRpZGF0ZXMiLCJlcnJvciIsInBhcmVudF9jb250ZXh0IiwiUm9vdENvbnRleHQiLCJ0eXBlX2ZjdCIsImdlblVuYXJ5T3BGY3QiLCJvcG5hbWUiLCJjYWxsIiwibGVuIiwiaW50IiwiZmxvYXQiLCJDT1JFX01PRFVMRVMiLCJjdXJzb3IiLCJsaW5lX29mZnNldCIsImNoYXIiLCJwYXJzZUV4cHJlc3Npb24iLCJhc3QyanNfY29udmVydCIsInBhcnNlU3ltYm9sIiwiYmVnaW5fc3RyIiwiY2FyIiwic3ltYm9sIiwiY2hpbGRyZW4iLCJ0b0pTIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsInB5Y29kZSIsInN0YXJ0Iiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiZXhwb3J0ZWQiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiTk9DT05WRVJUIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJhX3ZhbHVlIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwiZmlyc3QiLCJwcmlvIiwicF9wcmlvIiwiY21wIiwicm9wIiwicHlvcCIsImNzIiwicmNzIiwibyIsInJldmVyc2UiLCJjb3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJ0YWJsZSIsImdlbmVyYXRlX3JldHVybl90eXBlIiwiU1R5cGVuYW1lMmlkIiwiZ2V0U1R5cGVGcm9tTmFtZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==