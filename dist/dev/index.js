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



function convert(dst, node, context) {
    (0,dop__WEBPACK_IMPORTED_MODULE_1__.setType)(dst, core_modules_lists__WEBPACK_IMPORTED_MODULE_0__.LITERALS_F_STRING);
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
const MAX_NB_ASTNODES = 105;
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
const BUFFER_SIZE = ASTNODE_SIZE * 8 * MAX_NB_ASTNODES;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQzZDO0FBR2xGLE1BQU1RLFNBQVMsSUFBSVAsMkNBQVVBLENBQUMsR0FBRztBQUVqQyxJQUFJUSxPQUFlO0FBRW5CLFNBQVNDLGNBQWNDLEdBQVc7SUFDckNMLHdDQUFPLENBQUNLLE1BQU1OLDBDQUFTQSxDQUFDLEdBQUdHLE1BQU0sQ0FBQ0gsMENBQVNBLENBQUM7SUFDNUNDLHdDQUFPLENBQUNLLE1BQU1SLHlDQUFRQSxDQUFFLEdBQUdNLE9BQVFHLE1BQU0sR0FBR0osTUFBTSxDQUFDTCx5Q0FBUUEsQ0FBQztBQUNoRTtBQUVBLFNBQVNVLFdBQVdDLFFBQWdCO0lBRWhDTCxTQUFVLENBQUMsY0FBYyxFQUFFSyxTQUFTLEVBQUUsQ0FBQztJQUN2Q0wsVUFBVSxDQUFDLGtDQUFrQyxDQUFDO0lBRTlDRCxNQUFNLENBQUNILDBDQUFTQSxDQUFDLEdBQUc7SUFDcEJHLE1BQU0sQ0FBQ0wseUNBQVFBLENBQUMsR0FBR00sT0FBT0csTUFBTTtBQUNwQztBQUlBLElBQUlHLFNBQVM7QUFDYixJQUFJQyxtQkFBbUI7QUFDdkIsc0JBQXNCO0FBRXRCLE1BQU1DLFVBQVU7SUFDWjtJQUNBO0lBQ0FGO0lBQ0FBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0lBQ1JBLFVBQVFBO0NBQ1g7QUFFTSxNQUFNRyxLQUFLO0lBQ2RDLFVBQVU7UUFFTixFQUFFWCxNQUFNLENBQUNILDBDQUFTQSxDQUFDO1FBQ25CRyxNQUFNLENBQUNMLHlDQUFRQSxDQUFDLEdBQUdNLE9BQU9HLE1BQU0sR0FBRztRQUVuQyxPQUFPLE9BQU9LLE9BQU8sQ0FBQ0QsaUJBQWlCO0lBQzNDO0FBQ0osRUFBQztBQUNNLE1BQU1JLEtBQUs7SUFDZEQsVUFBVTtRQUNOLE9BQU9GLE9BQU8sQ0FBQyxFQUFFRCxpQkFBaUI7SUFDdEM7QUFDSixFQUFDO0FBQ00sTUFBTUssS0FBSztJQUNkRixVQUFVO1FBQ04sT0FBT0YsT0FBTyxDQUFDLEVBQUVELGlCQUFpQjtJQUN0QztBQUNKLEVBQUM7QUFFRCxvQ0FBb0M7QUFDN0IsU0FBU00sRUFBRSxHQUFHQyxJQUFxRDtJQUN0RSxPQUFPQTtBQUNYO0FBRUEsMEJBQTBCO0FBQ25CLFNBQVNDLEdBQUdELElBQXFEO0lBQ3BFLElBQUksT0FBT0EsU0FBUyxVQUNoQixPQUFPRSxFQUFFRjtJQUNiLE9BQU9HLE1BQU1IO0FBQ2pCO0FBR0Esa0NBQWtDO0FBQzNCLFNBQVNHLEdBQUdDLEdBQXlCLEVBQUUsR0FBR0osSUFBMEI7SUFFdkUsSUFBSSxJQUFJSyxJQUFJLEdBQUdBLElBQUlMLEtBQUtYLE1BQU0sRUFBRSxFQUFFZ0IsRUFBRztRQUNqQ25CLFVBQVVrQixHQUFHLENBQUNDLEVBQUU7UUFDaEJILEVBQUVGLElBQUksQ0FBQ0ssRUFBRTtJQUNiO0lBRUFuQixVQUFVa0IsR0FBRyxDQUFDSixLQUFLWCxNQUFNLENBQUM7QUFDOUI7QUFFQSxrQkFBa0I7QUFDWCxTQUFTYSxFQUFFLEdBQUdGLElBQTBCO0lBRTNDLElBQUksSUFBSUssSUFBSSxHQUFHQSxJQUFJTCxLQUFLWCxNQUFNLEVBQUUsRUFBRWdCLEVBQUc7UUFFakMsSUFBSUMsTUFBTU4sSUFBSSxDQUFDSyxFQUFFO1FBRWpCLElBQUlFLE1BQU1DLE9BQU8sQ0FBQ0YsTUFBTztZQUNyQkwsR0FBR0s7WUFDSDtRQUNKO1FBRUEsSUFBSSxPQUFPQSxRQUFRLFVBQVc7WUFFMUIsSUFBSUEsUUFBUUcsV0FDUkgsTUFBTTtZQUNWLElBQUlBLFFBQVEsTUFDUkEsTUFBTTtZQUVWcEIsVUFBVW9CLElBQUlWLFFBQVE7WUFDdEI7UUFDSjtRQUVBLE1BQU1jLFNBQVMsSUFBRUo7UUFFakJuQixjQUFjdUIsU0FBUy9CLHlDQUFRQTtRQUMvQkYsc0RBQU0sQ0FBQ08seUNBQUlBLENBQUNzQixLQUFNLENBQUNBO1FBQ25CbkIsY0FBY3VCLFNBQVM3Qix5Q0FBUUE7SUFDbkM7QUFDSjtBQUVPLFNBQVM4QixPQUFPQyxHQUFRO0lBRTNCdEIsV0FBV3NCLElBQUlyQixRQUFRO0lBRXZCVyxFQUFFO0lBRUYsbUNBQW1DO0lBQ25DaEIsVUFBVSxDQUFDLDRCQUE0QixDQUFDO0lBRXhDLHVCQUF1QjtJQUV2Qjs7Ozs7Ozs7Ozs7TUFXRSxHQUVMLE9BQU9BO0FBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0l1QztBQUNHO0FBRTNCLFNBQVN5QixPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQ0wsc0NBQUVBO0lBRUosTUFBTW1CLFVBQWFILCtDQUFVQSxDQUFDRTtJQUM5QixNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFM0IsSUFBSSxJQUFJVixJQUFJVyxTQUFTWCxJQUFJWSxhQUFXRCxTQUFTLEVBQUVYLEVBQzNDSCx5Q0FBQ0EsQ0FBQ1Asc0NBQUVBLEVBQUVVO0lBRVZILHlDQUFDQSxDQUFDSixzQ0FBRUE7QUFDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDBDO0FBQ0Y7QUFDTztBQUVoQyxTQUFTd0IsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS0wsb0RBQUlBO0lBRWpCLE1BQU1ELGFBQWFGLEtBQUsxQixNQUFNO0lBQzlCLE1BQU0yQixVQUFhRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFakMsSUFBSSxJQUFJWixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JnQixvREFBWUEsQ0FBQ2hCLElBQUlXLFNBQVNELElBQUksQ0FBQ1YsRUFBRSxFQUFFbUI7QUFDM0M7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZTO0FBQ2tCO0FBRW5DLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsSUFBSVksT0FBc0I7SUFFMUIsTUFBTUMsT0FBYWYsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQixJQUFJRSxlQUFlLEdBQ2ZVLE9BQU9DLE9BQUs7SUFFaEJ6QiwwQ0FBRSxDQUFDLE1BQU0sRUFBRXVCLHVDQUFNLENBQUNYLEtBQUssQ0FBQyxTQUFTLEVBQUVZLEtBQUssRUFBRSxFQUFFQyxLQUFLLEVBQUVqQyxzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkb0Q7QUFDSjtBQUNhO0FBQ2pCO0FBRTdCLFNBQVMyQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVBLFFBQVFTLGFBQWEsQ0FBQ2xCLEtBQUttQixJQUFJLENBQUMsR0FBR0YsMERBQVVBLENBQUNqQixLQUFLbUIsSUFBSTtJQUN2RFYsVUFBVSxJQUFJTSwyQ0FBT0EsQ0FBQyxTQUFTTjtJQUUvQixJQUFJVCxLQUFLb0IsS0FBSyxDQUFDOUMsTUFBTSxHQUFHLEdBQ3BCLE1BQU0sSUFBSStDLE1BQU07SUFFcEJoQiw0Q0FBT0EsQ0FBQ0csS0FBTU0sOERBQWNBO0lBQzVCLE1BQU1aLGFBQWEsSUFBSUYsS0FBS29CLEtBQUssQ0FBQzlDLE1BQU07SUFDeEMsTUFBTTJCLFVBQWFHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUVqQ2Msb0RBQVlBLENBQUNmLFNBQVNELEtBQUthLElBQUksRUFBRUo7SUFDakMsSUFBSSxJQUFJbkIsSUFBSSxHQUFHQSxJQUFJWSxZQUFhLEVBQUVaLEVBQzlCZ0Isb0RBQVlBLENBQUNoQixJQUFFVyxTQUFTRCxLQUFLb0IsS0FBSyxDQUFDOUIsSUFBRSxFQUFFLEVBQUVtQjtJQUU3Q0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLbUIsSUFBSTtBQUMzQjtBQUVBWixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJTO0FBQ1M7QUFFMUIsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxNQUFNM0IsTUFBT3NDLHVDQUFNLENBQUNYLEtBQUs7SUFFekIsTUFBTXNCLE9BQU94QiwrQ0FBVUEsQ0FBQ0U7SUFDeEIsTUFBTWEsT0FBT1MsT0FBSztJQUVsQmxDLDBDQUFFLENBQUMsUUFBUSxFQUFFZixJQUFJLElBQUksRUFBRWlELEtBQUssRUFBRSxFQUFFVCxLQUFLLEVBQUVqQyxzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hzRDtBQUNOO0FBQ2E7QUFFOUMsU0FBUzJCLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxJQUFJVCxLQUFLd0IsSUFBSSxDQUFDQyxXQUFXLENBQUNDLEtBQUssS0FBSyxVQUFVMUIsS0FBS3dCLElBQUksQ0FBQ0csSUFBSSxDQUFDQyxFQUFFLEtBQUssU0FDaEUsT0FBTztJQUVYLE1BQU1DLFNBQVM3QixLQUFLNkIsTUFBTSxDQUFDRCxFQUFFO0lBQzdCbkIsUUFBUVMsYUFBYSxDQUFDVyxPQUFPLEdBQUcsR0FBRyxNQUFNO0lBRXpDeEIsNENBQU9BLENBQUNHLEtBQUtlLGdFQUFnQkE7SUFDN0IsTUFBTXRCLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBRTlCRixvREFBWUEsQ0FBQ0wsU0FBV0QsS0FBS3dCLElBQUksRUFBRWY7SUFDbkNPLG9EQUFZQSxDQUFDZixVQUFRLEdBQUdELEtBQUthLElBQUksRUFBRUo7SUFFbkNFLHVDQUFNLENBQUNILElBQUksR0FBR3FCO0FBQ2xCO0FBRUF0QixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCUztBQUNrQjtBQUNHO0FBRXRDLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTTNCLE1BQU9zQyx1Q0FBTSxDQUFDWCxLQUFLO0lBRXpCLE1BQU1hLE9BQWFmLCtDQUFVQSxDQUFDRTtJQUM5QixNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFM0IsSUFBSStCLE1BQTJCO0lBQy9CLElBQUlDLE9BQTJCO0lBRS9CLElBQUlDLE1BQU1ILG1FQUFVQSxDQUFDakIsT0FBSztJQUUxQixJQUFJWCxhQUFhLEdBQUc7UUFDaEI2QixNQUFNRTtRQUNOQSxNQUFNSCxtRUFBVUEsQ0FBQ2pCLE9BQUs7SUFDMUI7SUFFQSxJQUFJWCxlQUFlLEdBQ2Y4QixPQUFPRixtRUFBVUEsQ0FBQ2pCLE9BQUs7SUFFM0IsT0FBT3pCLDBDQUFFLENBQUMsUUFBUSxFQUFFZixJQUFJLEdBQUcsRUFBRTBELElBQUksRUFBRSxFQUFFMUQsSUFBSSxHQUFHLEVBQUU0RCxJQUFJLEVBQUUsRUFBRTVELElBQUksSUFBSSxFQUFFMkQsS0FBSyxFQUFFLEVBQUVuQixLQUFLLEVBQUVqQyxzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDekY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjREO0FBQ1o7QUFDYTtBQUNsQjtBQUU1QixTQUFTMkIsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLElBQUlULEtBQUt3QixJQUFJLENBQUNDLFdBQVcsQ0FBQ0MsS0FBSyxLQUFLLFVBQVUxQixLQUFLd0IsSUFBSSxDQUFDRyxJQUFJLENBQUNDLEVBQUUsS0FBSyxTQUNoRSxPQUFPO0lBRVgsTUFBTUMsU0FBUzdCLEtBQUs2QixNQUFNLENBQUNELEVBQUU7SUFDN0JuQixRQUFRUyxhQUFhLENBQUNXLE9BQU8sR0FBRyxHQUFHLE1BQU07SUFDekNwQixRQUFRUyxhQUFhLENBQUNsQixLQUFLb0MsS0FBSyxDQUFDLEdBQUdELHFEQUFTQTtJQUM3Qyw2Q0FBNkM7SUFFN0MsTUFBTWxELE9BQU9lLEtBQUt3QixJQUFJLENBQUN2QyxJQUFJO0lBRTNCb0IsNENBQU9BLENBQUNHLEtBQUswQixzRUFBc0JBO0lBQ25DLE1BQU1oQyxhQUFhakIsS0FBS1gsTUFBTSxHQUFHO0lBQ2pDLE1BQU0yQixVQUFhRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFakNjLG9EQUFZQSxDQUFDZixTQUFTRCxLQUFLYSxJQUFJLEVBQUVKO0lBQ2pDLElBQUksSUFBSW5CLElBQUksR0FBR0EsSUFBSVksWUFBYSxFQUFFWixFQUM5QmdCLG9EQUFZQSxDQUFDaEIsSUFBRVcsU0FBU2hCLElBQUksQ0FBQ0ssSUFBRSxFQUFFLEVBQUVtQjtJQUV2Q0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHcUI7QUFDbEI7QUFFQXRCLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QlM7QUFDVTtBQUUzQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLElBQUlDLFVBQWFILCtDQUFVQSxDQUFDRTtJQUM1QixJQUFJRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFekIsS0FBSztJQUNMWiwwQ0FBRSxDQUFDLEdBQUcsRUFBRWEsVUFBVSxFQUFFLEVBQUVBLFVBQVUsRUFBRXJCLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztJQUV2QyxVQUFVO0lBQ1YsSUFBSVU7SUFDSixJQUFJQSxJQUFJLEdBQUdBLElBQUlZLGFBQWEsR0FBR1osS0FBSyxFQUFHO1FBQ25DRiwwQ0FBRSxDQUFDLFFBQVEsRUFBRWEsVUFBVSxFQUFFLEVBQUVBLFVBQVUsRUFBRXJCLHNDQUFFQSxDQUFDLENBQUMsQ0FBQztJQUNoRDtJQUVBLE9BQU87SUFDUCxJQUFJVSxNQUFNWSxhQUFhLEdBQ25CZCwwQ0FBRSxDQUFDLE1BQU0sRUFBRWEsUUFBUSxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0FBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQjBEO0FBQ2xCO0FBQ3FCO0FBRTlDLFNBQVMyQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsSUFBSTZCLGFBQWE7SUFFakIsSUFBSUMsTUFBTXZDO0lBQ1YsTUFBTyxZQUFZdUMsT0FBT0EsSUFBSUMsTUFBTSxDQUFDbEUsTUFBTSxLQUFLLEVBQUk7UUFFaEQsSUFBSSxDQUFHLFdBQVVpRSxJQUFJQyxNQUFNLENBQUMsRUFBRSxHQUFJO1lBQzlCLEVBQUVGO1lBQ0Y7UUFDSjtRQUNBQyxNQUFNQSxJQUFJQyxNQUFNLENBQUMsRUFBRTtRQUNuQkYsY0FBYztJQUNsQjtJQUVBakMsNENBQU9BLENBQUNHLEtBQUs2QixvRUFBb0JBO0lBQ2pDLElBQUlwQyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSzhCO0lBRTVCLEtBQUs7SUFDTGhDLG9EQUFZQSxDQUFDTCxXQUFXRCxLQUFLeUMsSUFBSSxFQUFFaEM7SUFDbkNPLG9EQUFZQSxDQUFDZixXQUFXRCxLQUFLYSxJQUFJLEVBQUVKO0lBRW5DLFVBQVU7SUFDVjhCLE1BQU12QztJQUNOLE1BQU8sWUFBWXVDLE9BQU9BLElBQUlDLE1BQU0sQ0FBQ2xFLE1BQU0sS0FBSyxFQUFJO1FBRWhELDRCQUE0QjtRQUM1QixJQUFJLENBQUcsV0FBVWlFLElBQUlDLE1BQU0sQ0FBQyxFQUFFLEdBQUk7WUFDOUJsQyxvREFBWUEsQ0FBQ0wsU0FBU3NDLElBQUlDLE1BQU0sRUFBRS9CO1lBQ2xDO1FBQ0o7UUFFQThCLE1BQU1BLElBQUlDLE1BQU0sQ0FBQyxFQUFFO1FBRW5CbEMsb0RBQVlBLENBQUNMLFdBQVdzQyxJQUFJRSxJQUFJLEVBQUVoQztRQUNsQ08sb0RBQVlBLENBQUNmLFdBQVdzQyxJQUFJMUIsSUFBSSxFQUFFSjtRQUVsQzZCLGNBQWM7SUFDbEI7QUFDSjtBQUVBL0IsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDSztBQUNLO0FBRWxCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLENBQUMsRUFBRWEsUUFBUSxHQUFHLEVBQUVBLFVBQVEsRUFBRSxHQUFHLEVBQUVBLFVBQVEsRUFBRSxDQUFDLENBQUM7QUFDbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1IwRDtBQUNTO0FBQ3BCO0FBRWhDLFNBQVNNLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxNQUFNUixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVdELEtBQUt5QyxJQUFJLEVBQUloQztJQUNyQ0gsb0RBQVlBLENBQUNMLFVBQVEsR0FBR0QsS0FBS2EsSUFBSSxFQUFJSixVQUFVLE9BQU87SUFDdERILG9EQUFZQSxDQUFDTCxVQUFRLEdBQUdELEtBQUt3QyxNQUFNLEVBQUUvQixVQUFVLFFBQVE7SUFFdkRKLDRDQUFPQSxDQUFDRyxLQUFNa0Msb0VBQW9CQTtJQUNsQ0Usa0RBQWFBLENBQUNwQyxLQUFLbUMsK0NBQVVBLENBQUMxQyxVQUFRO0FBQzFDO0FBRUFNLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQm9CO0FBQ0Q7QUFFM0IsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxNQUFNQyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFDOUIsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBRTNCWiwwQ0FBRSxDQUFDLEtBQUssRUFBRWEsUUFBUSxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0lBQ3pCUSwwQ0FBRSxDQUFDLGlCQUFpQixFQUFFTixzQ0FBRUEsQ0FBQyxFQUFFRixzQ0FBRUEsQ0FBQyxDQUFDO0lBRTNCTyx5Q0FBQ0EsQ0FBQztJQUVGLElBQUllLGFBQWEsR0FDYmYseUNBQUNBLENBQUUsSUFBRWM7SUFFVCxJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QkgseUNBQUNBLENBQUNQLHNDQUFFQSxFQUFFLFNBQVNVLElBQUlXO0lBRXZCLHFCQUFxQjtJQUNyQixJQUFJRiw0Q0FBT0EsQ0FBQ0UsVUFBVUMsYUFBVyxPQUFPLEdBQ3BDZix5Q0FBQ0EsQ0FBQ1Asc0NBQUVBLEVBQUU7SUFFZE8seUNBQUNBLENBQUNKLHNDQUFFQSxFQUFFSCxzQ0FBRUE7QUFFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekIyRDtBQUNuQjtBQUNxQjtBQUU5QyxTQUFTMkIsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLE1BQU1QLGFBQWFGLEtBQUs4QyxRQUFRLENBQUN4RSxNQUFNLEdBQUM7SUFFeEMrQiw0Q0FBT0EsQ0FBQ0csS0FBS3FDLHFFQUFxQkE7SUFDbEMsTUFBTTVDLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUU5QixXQUFXO0lBQ1hjLG9EQUFZQSxDQUFDZixTQUFTRCxLQUFLYSxJQUFJLEVBQUVKO0lBRWpDLElBQUksSUFBSW5CLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QmdCLG9EQUFZQSxDQUFDaEIsSUFBRVcsU0FBU0QsS0FBSzhDLFFBQVEsQ0FBQ3hELElBQUUsRUFBRSxFQUFFbUI7QUFFcEQ7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CUztBQUNVO0FBRTNCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQiw4QkFBOEI7SUFDOUIsSUFBR0UsZUFBZSxHQUNkLE9BQU9kLDBDQUFFLENBQUMsQ0FBQyxFQUFFYSxRQUFRLEVBQUVyQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7SUFFaENRLDBDQUFFLENBQUMsR0FBRyxFQUFFYSxVQUFRLEVBQUUsRUFBRSxFQUFFQSxRQUFRLEVBQUVyQixzQ0FBRUEsQ0FBQyxDQUFDLENBQUM7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JpRTtBQUNqQjtBQUNhO0FBRTlDLFNBQVMyQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsSUFBSVAsYUFBYTtJQUNqQixJQUFJRixLQUFLL0IsSUFBSSxLQUFLeUIsV0FDZFEsYUFBYTtJQUVqQkcsNENBQU9BLENBQUNHLEtBQUt1QywyRUFBMkJBO0lBQ3hDLE1BQU05QyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFOUJjLG9EQUFZQSxDQUFDZixTQUFTRCxLQUFLYSxJQUFJLEVBQUVKO0lBQ2pDLElBQUlQLGVBQWUsR0FDZkksb0RBQVlBLENBQUNMLFVBQVEsR0FBR0QsS0FBSy9CLElBQUksRUFBRXdDO0lBRXZDRSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUttQixJQUFJO0FBQzNCO0FBRUFaLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQnFCO0FBRVQ7QUFHbkMsU0FBU3VDLGFBQWFDLEtBQWU7SUFDbkMsT0FBT0EsTUFBTUMsTUFBTSxDQUFFQyxDQUFBQSxJQUFLQSxFQUFFQyxRQUFRLENBQUMsY0FBZSxrQkFBa0I7QUFDeEU7QUFFQSwwQkFBMEI7QUFDMUIsU0FBU0MsNkJBQTZCQyxLQUFVLEVBQUVDLElBQVksRUFBRUMsR0FBVztJQUV6RSxTQUFTO0lBQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkYsR0FFRSxPQUFPLE1BQU0sb0NBQW9DO0FBQ25EO0FBRU8sU0FBU0Msa0JBQWtCQyxTQUFvQixFQUFFQyxFQUFZO0lBQ2xFLE1BQU0vRCxNQUFNK0QsR0FBR0MsU0FBUyxDQUFDO0lBQ3pCLE9BQU9QLDZCQUE2QnpELElBQUkwRCxLQUFLLEVBQUVJLFNBQVMsQ0FBQyxFQUFFLEVBQUVBLFNBQVMsQ0FBQyxFQUFFO0FBQzNFO0FBSUEsZUFBZTtBQUNSLFNBQVNHLGVBQWVaLEtBQWtCLEVBQUVVLEVBQVk7SUFDN0QsT0FBT1YsTUFBTWEsR0FBRyxDQUFFWCxDQUFBQSxJQUFLTSxrQkFBa0JOLEdBQUdRO0FBQzlDO0FBRUEsbUJBQW1CO0FBQ1osU0FBU0ksWUFBWWQsS0FBVSxFQUFFVSxFQUFZO0lBSWhEVixRQUFRQSxNQUFNZSxLQUFLLENBQUM7SUFFcEIsTUFBTUMsT0FBT2hCLEtBQUssQ0FBQyxFQUFFLEtBQUk7SUFFekIsT0FBT0QsYUFBYUMsT0FBT2EsR0FBRyxDQUFFSSxDQUFBQTtRQUU5QixJQUFJLENBQUNDLEdBQUdDLE9BQU9DLEtBQUssR0FBR0gsRUFBRUYsS0FBSyxDQUFDO1FBRS9CLElBQUlLLElBQUksQ0FBQ0EsS0FBS2hHLE1BQU0sR0FBQyxFQUFFLEtBQUssS0FDMUJnRyxPQUFPQSxLQUFLQyxLQUFLLENBQUMsR0FBRSxDQUFDO1FBRXZCLElBQUlmLE9BQU8sQ0FBQ2EsUUFBUTtRQUNwQixJQUFJWixNQUFPLENBQUNhO1FBRVosRUFBRWIsS0FBSyxjQUFjO1FBRXJCLElBQUllO1FBQ0osSUFBSU4sTUFBTztZQUNULElBQUlPLE1BQU1MLEVBQUVNLE9BQU8sQ0FBQyxLQUFLO1lBQ3pCRixXQUFXSixFQUFFRyxLQUFLLENBQUMsR0FBR0U7WUFDdEIsSUFBSUQsYUFBYSxRQUNmQSxXQUFXO1lBRWIseUJBQXlCO1lBQ3pCLE1BQU0zRSxNQUFNK0QsR0FBR0MsU0FBUyxDQUFDO1lBQ3pCLE1BQU03RCxPQUFPc0QsNkJBQTZCekQsSUFBSTBELEtBQUssRUFBRUMsTUFBTUM7WUFDM0QsSUFBSXhGLHlDQUFJQSxDQUFDK0IsVUFBVWdELHNEQUFNQSxFQUN2QlMsT0FBTzlDLHVDQUFNLENBQUNYLEtBQUssQ0FBQzFCLE1BQU0sRUFBRSxtRUFBbUU7UUFFbkcsT0FBTztZQUNMLElBQUltRyxNQUFNTCxFQUFFTSxPQUFPLENBQUM7WUFDcEJGLFdBQVdKLEVBQUVHLEtBQUssQ0FBQyxHQUFHRTtZQUN0QixJQUFJRCxhQUFhLGFBQ2ZBLFdBQVc7UUFDZjtRQUVBLE9BQU87WUFBQ0E7WUFBVWhCO1lBQU1DO1NBQUk7SUFDOUI7QUFDSjtBQUVBLFNBQVNrQixzQkFBc0JDLEdBQWlCLEVBQUVoQixFQUFZO0lBRTFEaUIsUUFBUUMsSUFBSSxDQUFDLGFBQWFGO0lBRTFCLE1BQU0xQixRQUFRYyxZQUFhLElBQWFlLFNBQVMsQ0FBQzdCLEtBQUssRUFBRVU7SUFDekQsTUFBTUwsUUFBUU8sZUFBZVosT0FBT1U7SUFDcEMsd0JBQXdCO0lBQ3hCLDZCQUE2QjtJQUM3QixNQUFNb0IsWUFBWTlCLE1BQU1hLEdBQUcsQ0FBRSxDQUFDSSxHQUFFN0UsSUFBTSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFNEQsS0FBSyxDQUFDNUQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRW5GLElBQUkyRixnQkFDUixDQUFDO0VBQ0MsRUFBRUQsVUFBVUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQztJQUViTCxRQUFRTSxHQUFHLENBQUNGO0FBQ2hCO0FBRUEsU0FBU0csaUJBQWlCTCxTQUFjLEVBQUVNLFlBQWlCO0lBQ3pELGFBQWE7SUFDYixNQUFNQyxRQUFRUCxxQkFBcUJRLElBQUlDLFdBQVcsR0FDcENULFVBQVVVLGdCQUFnQixHQUUxQixJQUFJQyxJQUFJQyxXQUFXLENBQUNaO0lBRWxDSixzQkFBc0JXLE9BQU9EO0lBRTdCLE9BQU9DO0FBQ1Q7QUFFQSxpRUFBZTtJQUNYWDtJQUNBUztBQUNKLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SDhCO0FBQ0M7QUFFbEIsU0FBU3hGLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLE1BQU0sRUFBRWEsUUFBUSxFQUFFLEVBQUVBLFVBQVEsRUFBRSxFQUFFckIsc0NBQUVBLENBQUMsRUFBRSxDQUFDO0FBQzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSd0Q7QUFDaEI7QUFDcUI7QUFFOUMsU0FBUzJCLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtvRixrRUFBa0JBO0lBQy9CLE1BQU0zRixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVdELEtBQUt5QyxJQUFJLEVBQUVoQztJQUNuQ08sb0RBQVlBLENBQUNmLFVBQVEsR0FBR0QsS0FBS2EsSUFBSSxFQUFFSjtBQUV2QztBQUVBRixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDJCO0FBQ3NDO0FBQ3RCO0FBRXJCO0FBQzRCO0FBRTFELFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQixNQUFNaUcsWUFBWXRGLHVDQUFNLENBQUNYLEtBQUs7SUFFOUIsTUFBTWtHLE9BQU9ELFVBQVVFLFFBQVE7SUFFL0IsSUFBSUMsV0FBV0YsS0FBS0csV0FBVztJQUMvQixJQUFJRCxhQUFhRSxPQUFPQyxpQkFBaUIsRUFDckNILFdBQVdGLEtBQUtNLFVBQVUsR0FBRztJQUVqQyxJQUFJTixLQUFLTyxNQUFNLEtBQUsvRyxhQUFhMEcsYUFBYWxHLGFBQWEsR0FDdkQsRUFBRWtHO0lBRU4sSUFBSSxJQUFJOUcsSUFBSSxHQUFJQSxJQUFJWSxZQUFhLEVBQUVaLEVBQUc7UUFDbEMsSUFBSUEsTUFBTSxHQUNOSCx5Q0FBQ0EsQ0FBQztRQUVOLElBQUlpSCxhQUFhOUcsR0FDYkgseUNBQUNBLENBQUM7UUFFTixNQUFNdUgsU0FBU3BILE1BQU00RyxLQUFLTSxVQUFVLElBQUlsSCxNQUFNWSxhQUFXO1FBQ3pEeUcsVUFBVXJILElBQUlXLFNBQVN5RztJQUMzQjtJQUVBLElBQUlOLFdBQVdsRyxZQUNYZix5Q0FBQ0EsQ0FBQztBQUNWO0FBRUEsU0FBU3dILFVBQVUzRyxJQUFZLEVBQUUwRyxNQUFlO0lBRTVDLE1BQU0vRyxTQUFTLElBQUVLO0lBQ2pCNUIscURBQWFBLENBQUN1QixTQUFTL0IseUNBQVFBO0lBRS9CLE1BQU11RCxPQUFPUix1Q0FBTSxDQUFDWCxLQUFLO0lBQ3pCLE1BQU00RyxVQUFVM0kseUNBQUlBLENBQUMrQjtJQUVyQixJQUFJNEcsWUFBWVosNERBQW1CQSxFQUFHO1FBQ2xDLElBQUlVLFFBQ0F0SCwwQ0FBRSxDQUFDLEdBQUcsRUFBRStCLEtBQUssQ0FBQzthQUVkakMsMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1tQixNQUFNLEtBQUs7SUFDekMsT0FBTyxJQUFJeUYsWUFBWWIsNkRBQW9CQSxFQUFHO1FBQzFDN0csMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1tQixNQUFNLEtBQUs7SUFDckMsT0FBTyxJQUFJcEIsNENBQU9BLENBQUNDLFVBQVUsR0FBSTtRQUU3QixJQUFJNkcsU0FBYy9HLCtDQUFVQSxDQUFDRTtRQUM3QixJQUFJMkMsK0NBQVVBLENBQUNrRSxZQUFZZix1REFBV0EsRUFDbENlLFNBQVMvRSxtRUFBVUEsQ0FBQytFO1FBRXhCM0gsMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1tQixNQUFNLEtBQUswRjtJQUNyQyxPQUFNO1FBQ0YxSCx5Q0FBQ0EsQ0FBQ2dDO0lBQ047SUFFQS9DLHFEQUFhQSxDQUFDdUIsU0FBUzdCLHlDQUFRQTtBQUNuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRWlGO0FBRTdCO0FBQzBGO0FBQ3RGO0FBRXhELG9CQUFvQjtBQUNMLFNBQVN5QztJQUNwQiw2QkFBNkI7SUFDN0I7QUFDSjtBQUVPLE1BQU0rRyx5QkFBeUIsRUFBRTtBQUNqQyxNQUFNdkIsdUJBQXlCLEVBQUU7QUFDakMsTUFBTXdCLHdCQUF5QixFQUFFO0FBQ2pDLE1BQU12QixzQkFBeUIsRUFBRTtBQUNqQyxNQUFNd0IscUJBQXlCLEVBQUU7QUFHeENqSCxRQUFRRyxZQUFZLEdBQUc7QUFFaEIsU0FBUytHLGFBQWFqSCxHQUFXLEVBQUVSLElBQVMsRUFBRWlHLFNBQW1CLEVBQUV4RixPQUFnQjtJQUV0RixNQUFNeUYsT0FBT0QsVUFBVUUsUUFBUTtJQUUvQix3QkFBd0I7SUFDeEIsTUFBTXVCLFFBQVExSCxLQUFLZixJQUFJO0lBQ3ZCLE1BQU0wSSxhQUFhRCxNQUFNRSxNQUFNLEtBQUtsSTtJQUNwQyxNQUFNbUksWUFBYUgsTUFBTUksS0FBSyxLQUFNcEk7SUFDcEMsTUFBTXFJLFdBQWE3QixLQUFLNkIsUUFBUTtJQUNoQyxNQUFNQyxhQUFhOUIsS0FBSzhCLFVBQVU7SUFFbEMsTUFBTUMsYUFBYVAsTUFBTVEsV0FBVyxDQUFDNUosTUFBTSxHQUN4Qm9KLE1BQU16SSxJQUFJLENBQUNYLE1BQU0sR0FDakIsQ0FBQ3FKLGFBQ0RELE1BQU1TLFVBQVUsQ0FBQzdKLE1BQU0sR0FDdkIsQ0FBQ3VKO0lBRXBCeEgsNENBQU9BLENBQUNHLEtBQUt3Ryw4REFBY0E7SUFDM0IsTUFBTS9HLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLeUgsYUFBYSxPQUFPO0lBRWxELE1BQU1HLGVBQWVwSSxLQUFLZixJQUFJLENBQUNvSixRQUFRO0lBQ3ZDLE1BQU1DLFVBQVVaLE1BQU1RLFdBQVc7SUFDakMsTUFBTXpELE1BQVVpRCxNQUFNekksSUFBSTtJQUUxQixVQUFVO0lBQ1YsSUFBSXNKLFVBQVVILGFBQWE5SixNQUFNLEdBQUdnSyxRQUFRaEssTUFBTSxHQUFHbUcsSUFBSW5HLE1BQU07SUFDL0QsSUFBSSxJQUFJZ0IsSUFBSSxHQUFHQSxJQUFJZ0osUUFBUWhLLE1BQU0sRUFBRSxFQUFFZ0IsRUFBSTtRQUNyQ2tKLFlBQVlsSixJQUFJVyxTQUFTcUksT0FBTyxDQUFDaEosRUFBRSxFQUFFOEksWUFBWSxDQUFDOUksSUFBSWlKLFFBQVEsRUFBRWpCLHdCQUF3QjdHO1FBQ3hGQSxRQUFRUyxhQUFhLENBQUNvSCxPQUFPLENBQUNoSixFQUFFLENBQUNDLEdBQUcsQ0FBQyxHQUFHb0QsK0NBQVVBLENBQUNyRCxJQUFFVztJQUN6RDtJQUVBLE1BQU07SUFDTixJQUFJTixTQUFTMkksUUFBUWhLLE1BQU07SUFDekJpSyxXQUFXRCxRQUFRaEssTUFBTTtJQUMzQixJQUFJLElBQUlnQixJQUFJLEdBQUdBLElBQUltRixJQUFJbkcsTUFBTSxFQUFFLEVBQUVnQixFQUFJO1FBRWpDa0osWUFBWTdJLFNBQVNNLFNBQVN3RSxHQUFHLENBQUNuRixFQUFFLEVBQUU4SSxZQUFZLENBQUM5SSxJQUFJaUosUUFBUSxFQUFFZixvQkFBb0IvRztRQUVyRnVILFVBQVUsQ0FBQ3JJLFNBQVMsR0FBRzhFLEdBQUcsQ0FBQ25GLEVBQUUsQ0FBQ0MsR0FBRztJQUNyQztJQUVBMkcsS0FBS00sVUFBVSxHQUFHN0c7SUFFbEIsU0FBUztJQUNULElBQUlnSSxZQUFhO1FBQ2J6QixLQUFLRyxXQUFXLEdBQUdDLE9BQU9DLGlCQUFpQjtRQUUzQ2lDLFlBQVk3SSxTQUFTTSxTQUFTeUgsTUFBTUUsTUFBTSxFQUFFbEksV0FBV3NHLHFCQUFxQnZGO1FBRTVFLEVBQUVkO0lBQ04sT0FBTztRQUVIdUcsS0FBS0csV0FBVyxHQUFHMUc7UUFFbkIsTUFBTThJLGtCQUFrQkMsS0FBS0MsR0FBRyxDQUFDUCxhQUFhOUosTUFBTSxFQUFFbUcsSUFBSW5HLE1BQU07UUFDaEUsTUFBTXNLLGFBQWFSLGFBQWE5SixNQUFNLEdBQUdtRyxJQUFJbkcsTUFBTSxJQUFJMkosZUFBZXRJO1FBRXRFLElBQUk4SSxrQkFBa0IsS0FBS0Esb0JBQW9CLEtBQUtHLFlBQ2hEMUMsS0FBS0csV0FBVyxJQUFJb0M7SUFDNUI7SUFFQSxJQUFJSSxVQUFZM0MsS0FBS0csV0FBVztJQUNoQyxJQUFJd0MsWUFBWXZDLE9BQU9DLGlCQUFpQixFQUNwQ3NDLFVBQVUzQyxLQUFLTSxVQUFVO0lBQzdCLElBQUksSUFBSWxILElBQUlnSixRQUFRaEssTUFBTSxFQUFFZ0IsSUFBSXVKLFNBQVMsRUFBRXZKLEVBQ3ZDeUksUUFBUSxDQUFDcEgsdUNBQU0sQ0FBQ3JCLElBQUlXLFFBQVEsQ0FBQyxHQUFHWDtJQUVwQyxNQUFNMkMsTUFBTWlFLEtBQUtNLFVBQVUsR0FBR3FDO0lBQzlCLElBQUksSUFBSXZKLElBQUksR0FBR0EsSUFBSTJDLEtBQUssRUFBRTNDLEVBQ3RCeUksUUFBUSxDQUFDcEgsdUNBQU0sQ0FBQ3JCLElBQUlXLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFFckMsa0RBQWtEO0lBRWxELFNBQVM7SUFDVCxNQUFNNkksU0FBY3BCLE1BQU1TLFVBQVU7SUFDcEMsTUFBTVksY0FBY3JCLE1BQU1xQixXQUFXO0lBRXJDN0MsS0FBSzhDLE1BQU0sR0FBRzlDLEtBQUtNLFVBQVUsS0FBS3FDLFdBQVdDLE9BQU94SyxNQUFNLEtBQUs7SUFFL0RpSyxVQUFVUSxZQUFZekssTUFBTSxHQUFHd0ssT0FBT3hLLE1BQU07SUFDNUMsSUFBSSxJQUFJZ0IsSUFBSSxHQUFHQSxJQUFJd0osT0FBT3hLLE1BQU0sRUFBRSxFQUFFZ0IsRUFBSTtRQUVwQ2tKLFlBQVk3SSxTQUFTTSxTQUFTNkksTUFBTSxDQUFDeEosRUFBRSxFQUFFeUosV0FBVyxDQUFDekosRUFBRSxFQUFFaUksdUJBQXVCOUc7UUFFaEZzSCxRQUFRLENBQUNlLE1BQU0sQ0FBQ3hKLEVBQUUsQ0FBQ0MsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUUzQixFQUFFSTtJQUNOO0lBRUEsUUFBUTtJQUNSLElBQUlrSSxXQUFZO1FBRVpXLFlBQVk3SSxTQUFTTSxTQUFTeUgsTUFBTUksS0FBSyxFQUFFcEksV0FBV3FHLHNCQUFzQnRGO1FBRTVFeUYsS0FBS08sTUFBTSxHQUFHaUIsTUFBTUksS0FBSyxDQUFDdkksR0FBRztRQUU3QixFQUFFSTtJQUNOO0lBRUEsU0FBUztJQUNUOzs7SUFHQSxHQUVBLFNBQVM7SUFFVGdCLHVDQUFNLENBQUNILElBQUksR0FBR3lGO0lBRWQsSUFBSWdDLGVBQWUsR0FBRztRQUVsQmxCLDJEQUFtQkEsQ0FBQ3ZHLEtBQUtQLFNBQVNBLFVBQVVnSSxhQUFhO0lBRTdELE9BQU87UUFDSCxtQkFBbUI7UUFDbkIsTUFBTXhFLE1BQU16RCxLQUFLaUosVUFBVSxHQUFHLElBQUlqSixLQUFLbUIsSUFBSSxDQUFDN0MsTUFBTSxHQUFHO1FBRXJELE1BQU00SyxZQUFZLElBQUUxSTtRQUNwQjZHLHdDQUFPLENBQUU2QixZQUFZaEMsOENBQWFBLENBQUUsR0FBR0csd0NBQU8sQ0FBRTZCLFlBQVk5Qiw4Q0FBYUEsQ0FBRSxHQUFHcEgsS0FBS21KLE1BQU07UUFDekY5Qix3Q0FBTyxDQUFFNkIsWUFBWWpDLDZDQUFZQSxDQUFHLEdBQUdJLHdDQUFPLENBQUU2QixZQUFZL0IsNkNBQVlBLENBQUcsR0FBRzFEO0lBQ2xGO0FBQ0o7QUFDTyxTQUFTK0UsWUFBWWhJLEdBQVcsRUFBRVIsSUFBUyxFQUFFNkcsTUFBVyxFQUFFNUksSUFBVyxFQUFFd0MsT0FBZ0I7SUFFMUYsTUFBTVUsT0FBT25CLEtBQUtULEdBQUc7SUFFckIsa0NBQWtDO0lBQ2xDLElBQUk2SixjQUFjcEosS0FBS3FKLFVBQVUsRUFBRXpIO0lBRW5DLElBQUlpRixXQUFXbkgsV0FBWTtRQUV2QixNQUFNTyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztRQUM5QkYsb0RBQVlBLENBQUNMLFNBQVM0RyxRQUFRcEc7UUFFOUIsSUFBSTJJLGdCQUFnQjFKLFdBQVk7WUFDNUIwSixjQUFjekcsK0NBQVVBLENBQUMxQztZQUN6QixJQUFHbUosZ0JBQWdCdEQsdURBQVdBLEVBQzFCc0QsY0FBY2pILHFEQUFTQTtRQUMvQjtJQUNKO0lBRUE5Qiw0Q0FBT0EsQ0FBQ0csS0FBS3ZDO0lBQ2IyRSxrREFBYUEsQ0FBQ3BDLEtBQUs0STtJQUVuQnpJLHVDQUFNLENBQUNILElBQUksR0FBR1c7SUFDZFYsUUFBUVMsYUFBYSxDQUFDQyxLQUFLLEdBQUdpSTtJQUU5QnRDLG1EQUFXQSxDQUFDdEcsS0FBS1I7QUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SytCO0FBQzZCO0FBQ0o7QUFHeEQsU0FBU3VKLFVBQVVDLEdBQXdCO0lBRXZDLE1BQU1DLE9BQU9DLE9BQU9ELElBQUksQ0FBQ0Q7SUFDekIsSUFBR0MsS0FBS25MLE1BQU0sS0FBSyxHQUNmLE9BQU87UUFBQyxFQUFFO0tBQUM7SUFFZixNQUFNZSxNQUFNLElBQUlHLE1BQU1pSyxLQUFLbkwsTUFBTSxHQUFDO0lBQ2xDZSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFb0ssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSW5LO0lBQ0osSUFBSUEsSUFBSSxHQUFHQSxJQUFJbUssS0FBS25MLE1BQU0sRUFBRSxFQUFFZ0IsRUFDMUJELEdBQUcsQ0FBQ0MsRUFBRSxHQUFJLENBQUMsRUFBRSxFQUFFbUssSUFBSSxDQUFDbkssRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUU5QkQsR0FBRyxDQUFDQyxFQUFFLEdBQUc7SUFFVCxPQUFPO1FBQUNEO1dBQVFxSyxPQUFPQyxNQUFNLENBQUNIO0tBQUs7QUFDdkM7QUFFQSxTQUFTdEUsS0FBSzBFLElBQVcsRUFBRUMsTUFBSSxJQUFJO0lBRS9CLElBQUdELEtBQUt0TCxNQUFNLEtBQUssR0FDZixPQUFPO1FBQUM7WUFBQztTQUFHO0tBQUM7SUFFakIsTUFBTWUsTUFBTSxJQUFJRyxNQUFNb0ssS0FBS3RMLE1BQU0sR0FBQztJQUNsQ2UsR0FBRyxDQUFDLEVBQUUsR0FBRztJQUNULElBQUlDO0lBQ0osSUFBSUEsSUFBSSxHQUFHQSxJQUFJc0ssS0FBS3RMLE1BQU0sRUFBRSxFQUFFZ0IsRUFDMUJELEdBQUcsQ0FBQ0MsRUFBRSxHQUFHdUs7SUFDYnhLLEdBQUcsQ0FBQ0MsRUFBRSxHQUFHO0lBRVQsT0FBTztRQUFDRDtXQUFRdUs7S0FBSztBQUN6QjtBQUVPLFNBQVNFLGFBQWE5SixJQUFZO0lBRXJDLE1BQU1rRyxPQUFPLHVDQUFPLENBQUNsRyxLQUFLLENBQWNtRyxRQUFRO0lBRWhELE1BQU1sRyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFDOUIsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBRTNCLElBQUkrSixTQUFTN0o7SUFDYixJQUFJLElBQUlaLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QixJQUFJckIseUNBQUlBLENBQUVxQixJQUFJVyxhQUFhcUosc0VBQXNCQSxFQUFFO1FBQy9DUyxTQUFTeks7UUFDVDtJQUNKO0lBRUosSUFBSTBLLFNBQVM5RCxLQUFLRyxXQUFXO0lBQzdCLElBQUkyRCxXQUFXMUQsT0FBT0MsaUJBQWlCLEVBQ25DeUQsU0FBU3RCLEtBQUt1QixHQUFHLENBQUMvRCxLQUFLTSxVQUFVLEVBQUV1RCxTQUFPO0lBRTlDLElBQUlHLFdBQVdGLFNBQU87SUFDdEIsSUFBSTlELEtBQUs4QyxNQUFNLElBQUk5QyxLQUFLRyxXQUFXLEtBQUtDLE9BQU9DLGlCQUFpQixFQUM1RDJELFdBQVdoRSxLQUFLTSxVQUFVLEdBQUM7SUFDL0IsSUFBSS9CLE1BQU0sSUFBSWpGLE1BQU0wSztJQUVwQixNQUFNQyxLQUFpQyxDQUFDO0lBQ3hDLE1BQU0xRCxTQUFpQyxDQUFDO0lBRXhDLElBQUl1QyxTQUFTO0lBRWIsSUFBSTlDLEtBQUs4QyxNQUFNLElBQUk5QyxLQUFLRyxXQUFXLEtBQUtDLE9BQU9DLGlCQUFpQixFQUFHO1FBRS9ELE1BQU02RCxTQUFTMUIsS0FBS0MsR0FBRyxDQUFDb0IsUUFBUTdELEtBQUtNLFVBQVU7UUFFL0MsSUFBSSxJQUFJbEgsSUFBSSxHQUFHQSxJQUFJOEssUUFBUSxFQUFFOUssRUFDekJtRixHQUFHLENBQUNuRixJQUFFLEVBQUUsR0FBR0EsSUFBSVc7UUFFbkIsTUFBTW9LLGFBQWFuRSxLQUFLTSxVQUFVLEdBQUM7UUFDbkMsTUFBTThELFVBQVVQLFNBQVNNO1FBQ3pCLElBQUlDLFlBQVksR0FBSTtZQUVoQix5Q0FBeUM7WUFDekMsZ0NBQWdDO1lBQ2hDLElBQUlqTCxNQUFNLElBQUlHLE1BQU04SyxVQUFVO1lBQzlCLElBQUlqTSxNQUFNLElBQUltQixNQUFNOEssVUFBVTtZQUU5QmpMLEdBQUcsQ0FBQyxFQUFFLEdBQVM7WUFFZmhCLEdBQUcsQ0FBQyxFQUFFLEdBQVNnQjtZQUNmaEIsR0FBRyxDQUFDLEVBQUUsR0FBUzRCLFVBQVVvSztZQUN6QixJQUFJLElBQUkvSyxJQUFJLEdBQUdBLElBQUlnTCxTQUFTLEVBQUVoTCxFQUFHO2dCQUM3QkQsR0FBRyxDQUFDQyxFQUFFLEdBQUk7Z0JBQ1ZqQixHQUFHLENBQUNpQixJQUFFLEVBQUUsR0FBRVcsVUFBVW9LLGFBQWEvSztZQUNyQztZQUVBRCxHQUFHLENBQUNpTCxRQUFRLEdBQUcsS0FBSywwQkFBMEI7UUFDbEQ7SUFDSixPQUFPO1FBRUgsTUFBTUYsU0FBUzFCLEtBQUtDLEdBQUcsQ0FBQ29CLFFBQVFDLFNBQU87UUFFdkMsSUFBSSxJQUFJMUssSUFBSSxHQUFHQSxJQUFJOEssUUFBUSxFQUFFOUssRUFDekJtRixHQUFHLENBQUNuRixJQUFFLEVBQUUsR0FBR0EsSUFBSVc7UUFFbkIsTUFBTStILGFBQWE5QixLQUFLOEIsVUFBVTtRQUNsQyxJQUFJLElBQUkxSSxJQUFJOEssUUFBUTlLLElBQUl5SyxRQUFRLEVBQUV6SyxFQUM5QjZLLEVBQUUsQ0FBRW5DLFVBQVUsQ0FBQzFJLElBQUUsRUFBRSxDQUFFLEdBQUdBLElBQUlXO1FBRWhDK0ksU0FBU29CLFdBQVdMO0lBQ3hCO0lBRUEsSUFBSVEsYUFBYTtJQUVqQixNQUFNeEMsV0FBVzdCLEtBQUs2QixRQUFRO0lBRzlCLElBQUksSUFBSXpJLElBQUl5SyxRQUFRekssSUFBSVksWUFBWSxFQUFFWixFQUFHO1FBRXJDLE1BQU1DLE1BQU9ELElBQUlXO1FBQ2pCLE1BQU1rQixPQUFPUix1Q0FBTSxDQUFDcEIsSUFBSTtRQUN4QixNQUFNbEIsTUFBTzBKLFFBQVEsQ0FBRTVHLEtBQU07UUFFN0IsSUFBSTlDLE9BQU8sR0FBSTtZQUNYb0csR0FBRyxDQUFDcEcsSUFBSSxHQUFHa0I7WUFDWDtRQUNKO1FBRUF5SixTQUFTO1FBRVQsSUFBSTNLLFFBQVEsQ0FBQyxHQUNUOEwsRUFBRSxDQUFDaEosS0FBSyxHQUFHNUI7YUFDVjtZQUNEa0gsTUFBTSxDQUFDdEYsS0FBSyxHQUFHNUI7WUFDZmdMLGFBQWE7UUFDakI7SUFDSjtJQUVBLElBQUlmLE1BQTJCVztJQUMvQiw4QkFBOEI7SUFDOUIsSUFBSUksY0FBYyxDQUFFckUsS0FBSzhDLE1BQU0sRUFBRTtRQUM3QlEsTUFBTS9DO0lBQ1YsT0FBTyxJQUFJOEQsWUFBYTtRQUNwQmYsR0FBRyxDQUFDdEQsS0FBS08sTUFBTSxDQUFFLEdBQUc4QyxVQUFVOUM7SUFDbEM7SUFFQSxJQUFJdUMsUUFDQXZFLEdBQUcsQ0FBQ0EsSUFBSW5HLE1BQU0sR0FBQyxFQUFFLEdBQUdpTCxVQUFVQztTQUM3QjtRQUNELE1BQU0vRSxJQUFJbkcsTUFBTSxHQUFHLEtBQUttRyxHQUFHLENBQUNBLElBQUluRyxNQUFNLEdBQUMsRUFBRSxLQUFLb0IsVUFDMUMsRUFBRStFLElBQUluRyxNQUFNO0lBQ3BCO0lBRUEsT0FBT1UseUNBQUMsQ0FBQyxFQUFFaUIsUUFBUSxDQUFDLEVBQUVpRixLQUFLVCxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVM7QUFDakQ7QUFFZSxTQUFTN0UsT0FBT0ksSUFBWTtJQUN2Q2QsMENBQUVBLENBQUUsdUNBQU8sQ0FBQ2MsS0FBSyxDQUFjbUcsUUFBUSxDQUFDcUUsZUFBZSxDQUFFeEs7QUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Sm9EO0FBQ1c7QUFDaEI7QUFFUDtBQUV6QixTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsTUFBTVUsT0FBT25CLEtBQUsyQixJQUFJLENBQUNDLEVBQUU7SUFDekIsTUFBTStJLFdBQVdsSyxRQUFRUyxhQUFhLENBQUNDLEtBQUs7SUFDNUMsSUFBSXdKLGFBQWFqTCxXQUFZO1FBQ3pCbUYsUUFBUUMsSUFBSSxDQUFDOUU7UUFDYjZFLFFBQVFDLElBQUksQ0FBQ3JFLFFBQVFTLGFBQWE7UUFDbEMsTUFBTSxJQUFJRyxNQUFNLENBQUMsU0FBUyxFQUFFRixLQUFLLFlBQVksQ0FBQztJQUNsRDtJQUVBLE1BQU15SixNQUFNRixrREFBTSxDQUFDQyxTQUFTO0lBQzVCLE1BQU1FLFdBQVcsSUFBSzFFLFFBQVEsQ0FBa0IyRSxXQUFXO0lBRTNEekssNENBQU9BLENBQU9HLEtBQUtpSyw4REFBY0E7SUFDakM3SCxrREFBYUEsQ0FBQ3BDLEtBQUtxSztJQUNuQixJQUFJNUssVUFBVUcsNkNBQVFBLENBQUNJLEtBQUssSUFBSVIsS0FBS2YsSUFBSSxDQUFDWCxNQUFNLEdBQUcwQixLQUFLK0ssUUFBUSxDQUFDek0sTUFBTTtJQUV2RWdDLG9EQUFZQSxDQUFDTCxXQUFXRCxLQUFLMkIsSUFBSSxFQUFFbEI7SUFFbkMsSUFBSSxJQUFJbkIsSUFBSSxHQUFHQSxJQUFJVSxLQUFLZixJQUFJLENBQUNYLE1BQU0sRUFBRSxFQUFFZ0IsRUFDbkNnQixvREFBWUEsQ0FBQ0wsV0FBV0QsS0FBS2YsSUFBSSxDQUFDSyxFQUFFLEVBQUVtQjtJQUMxQyxJQUFJLElBQUluQixJQUFJLEdBQUdBLElBQUlVLEtBQUsrSyxRQUFRLENBQUN6TSxNQUFNLEVBQUUsRUFBRWdCLEVBQ3ZDZ0Isb0RBQVlBLENBQUNMLFdBQVdELEtBQUsrSyxRQUFRLENBQUN6TCxFQUFFLEVBQUVtQjtJQUU5Q0UsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHb0s7QUFDbEI7QUFFQXJLLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0k7QUFDTTtBQUVsQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBRVcsK0NBQVVBLENBQUNFO0FBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONEQ7QUFDZTtBQUM1QjtBQUVoQyxTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLOEksc0VBQXNCQTtJQUVuQyxNQUFNckosVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFDOUJGLG9EQUFZQSxDQUFFTCxTQUFTRCxLQUFLb0MsS0FBSyxFQUFFM0I7SUFDbkNtQyxrREFBYUEsQ0FBQ3BDLEtBQUttQywrQ0FBVUEsQ0FBQzFDO0lBRTlCVSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUtULEdBQUc7QUFDMUI7QUFFQWdCLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmUztBQUNTO0FBRTFCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTW1CLE9BQU9SLHVDQUFNLENBQUNYLEtBQUs7SUFDekIsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLFNBQVMsRUFBRStCLEtBQUssQ0FBQyxFQUFFbEIsUUFBUSxFQUFFLEVBQUVBLFVBQVEsRUFBRSxFQUFFckIsc0NBQUVBLENBQUMsQ0FBQyxDQUFDO0FBQ3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUNkQ7QUFFVDtBQUNOO0FBQ0k7QUFDQztBQUN3QjtBQUUzRSwrREFBK0Q7QUFDL0QseUNBQXlDO0FBQ3pDLFNBQVNxTSxTQUFTekssR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXRELE1BQU15SyxRQUFVdkksK0NBQVVBLENBQUNuQztJQUMzQixNQUFNUCxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QixVQUFVO0lBQ1YsTUFBTTJLLFFBQVVULGtEQUFNLENBQUNRLE1BQU07SUFDN0IsTUFBTWhGLE9BQVVpRixNQUFNaEYsUUFBUTtJQUU5QiwrQ0FBK0M7SUFDL0MxRixVQUFVLElBQUlNLDJDQUFPQSxDQUFDLE9BQU9OO0lBQzdCQSxRQUFRMkssbUJBQW1CLEdBQUc1SyxLQUFLLFVBQVU7SUFFN0Msb0VBQW9FO0lBQ3BFaUgsOERBQVlBLENBQUN4SCxTQUFTRCxNQUFNbUwsT0FBTzFLO0lBQ25DLCtCQUErQjtJQUMvQjs7O3lEQUdxRCxHQUVyRCw4Q0FBOEM7SUFDOUN5RixLQUFLK0UsUUFBUSxHQUFHdkw7SUFDaEIsNkNBQTZDO0lBQzdDd0csS0FBSzRFLFdBQVcsR0FBR3BMO0lBRW5CLE1BQU0ySixhQUFhckosS0FBS3FMLE9BQU8sRUFBRXpKO0lBQ2pDLElBQUl5SCxlQUFlM0osV0FBWTtRQUMzQixJQUFJNEwsa0JBQWtCckssMERBQVVBLENBQUNvSTtRQUNqQyxrQkFBa0I7UUFDbEJuRCxLQUFLNEUsV0FBVyxHQUFHLElBQU1RO0lBQzdCO0lBRUF0SyxvREFBWUEsQ0FBQ2YsVUFBUSxHQUFHRCxLQUFLYSxJQUFJLEVBQUVKO0FBQ3ZDO0FBRWUsU0FBU0YsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLDRDQUE0QztJQUU1QyxNQUFNd0YsWUFBc0I7UUFDeEJzRixVQUFVO1FBQ1ZwRixVQUFVO1lBQ042QixZQUFpQixJQUFJeEksTUFBTVEsS0FBS2YsSUFBSSxDQUFDQSxJQUFJLENBQUNYLE1BQU0sR0FBQzBCLEtBQUtmLElBQUksQ0FBQ2lKLFdBQVcsQ0FBQzVKLE1BQU07WUFDN0V5SixVQUFpQixDQUFDO1lBQ2xCMUIsYUFBaUIsQ0FBQztZQUNsQkcsWUFBaUIsQ0FBQztZQUNsQndDLFFBQWlCO1lBQ2pCaUM7WUFDQUgsYUFBaUI7Z0JBQ2JHLFNBQVN6SyxLQUFLUixNQUFNUyxVQUFVLDRCQUE0QjtnQkFDMUQsT0FBT3dGLFVBQVVFLFFBQVEsQ0FBQzJFLFdBQVc7WUFDekM7WUFDQU4saUJBQWlCVixzREFBWUE7UUFDakM7SUFDSjtJQUVBLE1BQU0wQixVQUFVZCxrREFBTUEsQ0FBQ3BNLE1BQU07SUFDN0JvTSxrREFBTSxDQUFDYyxRQUFRLEdBQUd2RjtJQUVsQixvQkFBb0I7SUFDcEIsMENBQTBDO0lBQzFDeEYsUUFBUVMsYUFBYSxDQUFDbEIsS0FBS21CLElBQUksQ0FBQyxHQUFHcUs7SUFFbkMscUJBQXFCO0lBQ3JCLE1BQU1DLFlBQWN6TCxLQUFLYSxJQUFJLENBQUNiLEtBQUthLElBQUksQ0FBQ3ZDLE1BQU0sR0FBQyxFQUFFLENBQUNtRCxXQUFXLENBQUNDLEtBQUs7SUFDbkUsSUFBSStKLGNBQWMsWUFBWUEsY0FBYyxTQUFVO1FBRWxELE1BQU1DLFlBQVk7WUFDZGpLLGFBQWE7Z0JBQ1RDLE9BQU87WUFDWDtZQUNJeUgsUUFBUW5KLEtBQUsyTCxVQUFVO1lBQzNCQSxZQUFZM0wsS0FBSzJMLFVBQVU7WUFDdkIxQyxZQUFZakosS0FBSzRMLGNBQWM7WUFDbkNBLGdCQUFnQjVMLEtBQUs0TCxjQUFjO1FBQ3ZDO1FBQ0E1TCxLQUFLYSxJQUFJLENBQUNnTCxJQUFJLENBQUVIO0lBQ3BCO0lBRUFyTCw0Q0FBT0EsQ0FBT0csS0FBS3dLLDZEQUFhQTtJQUNoQ3BJLGtEQUFhQSxDQUFDcEMsS0FBS2dMO0lBRW5CN0ssdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLbUIsSUFBSTtBQUMzQjtBQUVBWixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEdLO0FBQ0s7QUFFbEIsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxPQUFPWiwwQ0FBRSxDQUFDLFdBQVcsRUFBRVUsK0NBQVVBLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDYjtBQUNPO0FBRWhDLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtzTCwrREFBZUE7SUFDNUIsTUFBTTdMLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBQzlCRixvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS3lDLElBQUksRUFBRWhDO0FBQ3JDO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0FDWHZCLFNBQVNxTCxPQUFPQyxJQUFhO0lBQ3pCLElBQUlBLE1BQ0E7SUFFSixNQUFNLElBQUkzSyxNQUFNO0FBQ3BCO0FBR0EsaUVBQWU7SUFDWDBLO0FBQ0osQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDVnlCO0FBRVosU0FBU25NLE9BQU93RSxDQUFTO0lBQ3BDakYseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKb0Q7QUFDdEI7QUFHZixTQUFTb0IsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFSiw0Q0FBT0EsQ0FBQ0csS0FBS3lMLDhEQUFjQTtBQUUvQjtBQUVBMUwsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkk7QUFFWixTQUFTZCxPQUFPSSxJQUFZO0lBQ3ZDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0p1RDtBQUN6QjtBQUdmLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMEwsaUVBQWlCQTtBQUVsQztBQUVBM0wsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZRO0FBQ0Y7QUFFZCxTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLE1BQU1vQyxRQUFRekIsdUNBQU0sQ0FBQ1gsS0FBSztJQUUxQmIseUNBQUNBLENBQUNpRCxLQUFLLENBQUMsRUFBRTtJQUVWLElBQUlBLEtBQUssQ0FBQyxFQUFFLEtBQUsxQyxXQUNiUCx5Q0FBQ0EsQ0FBQyxNQUFNaUQsS0FBSyxDQUFDLEVBQUU7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWDJEO0FBQ3JCO0FBR3ZCLFNBQVM3QixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMkwscUVBQXFCQTtJQUVsQ3hMLHVDQUFNLENBQUNILElBQUksR0FBRztRQUFDUixLQUFLbUIsSUFBSTtRQUFFbkIsS0FBS29NLE1BQU07S0FBQztBQUUxQztBQUVBN0wsUUFBUUcsWUFBWSxHQUFHO0lBQUM7Q0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaRDtBQUNtQjtBQUVuQyxTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQztJQUVGLE1BQU1jLFVBQVVILCtDQUFVQSxDQUFDRTtJQUMzQixNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFFM0IsSUFBSSxJQUFJVixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFBRztRQUNoQyxJQUFJQSxNQUFNLEdBQ05ILHlDQUFDQSxDQUFDO1FBQ05BLHlDQUFDQSxDQUFDRyxJQUFJVztJQUNWO0lBRUFkLHlDQUFDQSxDQUFDO0lBRUYsTUFBTWlELFFBQVF6Qix1Q0FBTSxDQUFDWCxLQUFLO0lBRTFCLElBQUdvQyxVQUFVLE1BQ1RqRCx5Q0FBQ0EsQ0FBQztTQUVGQywwQ0FBRSxDQUFDLHdCQUF3QixFQUFFZ0QsTUFBTSxFQUFFLENBQUM7QUFDOUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCcUQ7QUFDTDtBQUNEO0FBRWhDLFNBQVM3QixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLNkwsK0RBQWVBO0lBQzVCLE1BQU1uTSxhQUFhRixLQUFLc00sS0FBSyxDQUFDaE8sTUFBTTtJQUNwQyxNQUFNMkIsVUFBYUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRWpDLElBQUksSUFBSVosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLc00sS0FBSyxDQUFDaE4sRUFBRSxFQUFFbUI7SUFFN0NFLHVDQUFNLENBQUNILElBQUksR0FBR1IsS0FBS3VNLE1BQU07QUFDN0I7QUFFQWhNLFFBQVFHLFlBQVksR0FBRztJQUFDO0lBQVU7Q0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQm5CO0FBQ0s7QUFFbEIsU0FBU2QsT0FBT0ksSUFBWTtJQUN2Q1osMENBQUUsQ0FBQywwQkFBMEIsRUFBRVUsK0NBQVVBLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0FBQ3REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMb0Q7QUFDWjtBQUNPO0FBRWhDLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtnTSw4REFBY0E7SUFDM0IsTUFBTXZNLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBQzlCRixvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS3lNLEdBQUcsRUFBRWhNO0FBRXBDO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1poQixNQUFNOEUsb0JBQW9CbkU7SUFFcEJvRSxpQkFBc0I7SUFFL0JoRSxZQUFZZ0UsZ0JBQXFCLENBQUU7UUFDL0IsS0FBSztRQUNMQSxpQkFBaUJWLFNBQVMsR0FBRyxJQUFJO1FBQ2pDLElBQUksQ0FBQ1UsZ0JBQWdCLEdBQUdBO0lBQzVCO0FBQ0o7QUFHQSxpRUFBZTtJQUNYRDtBQUNKLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RpRDtBQUNKO0FBQ1c7QUFDSjtBQUNHO0FBQ0o7QUFDSTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDZTtBQUNKO0FBQ007QUFDSjtBQUNJO0FBQ0o7QUFDRztBQUNKO0FBQ0M7QUFDRTtBQUNKO0FBQ0U7QUFDSjtBQUNVO0FBQ0o7QUFDRTtBQUNKO0FBQ0Q7QUFDSjtBQUNLO0FBQ0o7QUFDSTtBQUNKO0FBQ007QUFDSjtBQUNDO0FBQ007QUFDSjtBQUNtQjtBQUNKO0FBQ2Y7QUFDSjtBQUNJO0FBQ0o7QUFDSztBQUNKO0FBQ0M7QUFDSTtBQUNKO0FBQ1U7QUFDSjtBQUNBO0FBQ0o7QUFDQztBQUNKO0FBQ0s7QUFDSjtBQUNDO0FBQ0M7QUFDSjtBQUNLO0FBQ0o7QUFDWTtBQUNKO0FBQ0o7QUFDSjtBQUNRO0FBQ0o7QUFDTztBQUNKO0FBQ0M7QUFDUztBQUNKO0FBQ0g7QUFDSjtBQUNJO0FBQ0o7QUFDTTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDTjtBQUNKO0FBR3ZDLE1BQU14QyxTQUFTLEVBQUU7QUFDakIsTUFBTWlQLGdCQUFnQixFQUFFO0FBQ3hCLE1BQU1DLGVBQWUsRUFBRTtBQUN2QixNQUFNQyxlQUFlLEVBQUU7QUFDdkIsTUFBTUMsU0FBUyxFQUFFO0FBQ2pCLE1BQU1DLE9BQU8sRUFBRTtBQUNmLE1BQU1DLGtCQUFrQixFQUFFO0FBQzFCLE1BQU1DLG9CQUFvQixFQUFFO0FBQzVCLE1BQU1DLG9CQUFvQixFQUFFO0FBQzVCLE1BQU1DLG1CQUFtQixFQUFFO0FBQzNCLE1BQU1DLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1DLHNCQUFzQixHQUFHO0FBQy9CLE1BQU1DLHFCQUFxQixHQUFHO0FBQzlCLE1BQU1DLHFCQUFxQixHQUFHO0FBQzlCLE1BQU1DLGdCQUFnQixHQUFHO0FBQ3pCLE1BQU1DLGVBQWUsR0FBRztBQUN4QixNQUFNQyxlQUFlLEdBQUc7QUFDeEIsTUFBTUMsaUJBQWlCLEdBQUc7QUFDMUIsTUFBTUMsb0JBQW9CLEdBQUc7QUFDN0IsTUFBTUMsbUNBQW1DLEdBQUc7QUFDNUMsTUFBTUMsZ0JBQWdCLEdBQUc7QUFDekIsTUFBTUMsZ0JBQWdCLEdBQUc7QUFDekIsTUFBTTdHLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1ILGtCQUFrQixHQUFHO0FBQzNCLE1BQU1GLHdCQUF3QixHQUFHO0FBQ2pDLE1BQU1ELG9CQUFvQixHQUFHO0FBQzdCLE1BQU1ELGlCQUFpQixHQUFHO0FBQzFCLE1BQU1ILGtCQUFrQixHQUFHO0FBQzNCLE1BQU1kLGdCQUFnQixHQUFHO0FBQ3pCLE1BQU1QLGlCQUFpQixHQUFHO0FBQzFCLE1BQU1uQix5QkFBeUIsR0FBRztBQUNsQyxNQUFNdEMsaUJBQWlCLEdBQUc7QUFDMUIsTUFBTXBCLHFCQUFxQixHQUFHO0FBQzlCLE1BQU0vQyx3QkFBd0IsR0FBRztBQUNqQyxNQUFNRSw4QkFBOEIsR0FBRztBQUN2QyxNQUFNTCx1QkFBdUIsR0FBRztBQUNoQyxNQUFNTCx1QkFBdUIsR0FBRztBQUNoQyxNQUFNSCx5QkFBeUIsR0FBRztBQUNsQyxNQUFNWCxtQkFBbUIsR0FBRztBQUM1QixNQUFNVCxpQkFBaUIsR0FBRztBQUMxQixNQUFNWCxPQUFPLEdBQUc7QUFJaEIsTUFBTW1ULGNBQThCO0lBQzFDNUcsNkRBQWFBO0lBQ2JFLG9FQUFhQTtJQUNiRSxtRUFBYUE7SUFDYkUsbUVBQWFBO0lBQ2JFLDZEQUFhQTtJQUNiRSw0REFBYUE7SUFDYkUsdUVBQWFBO0lBQ2JFLHlFQUFhQTtJQUNiRSx5RUFBYUE7SUFDYkUsd0VBQWFBO0lBQ2JHLHNFQUFjQTtJQUNkRSxpRUFBY0E7SUFDZEUsMEVBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRSxpRUFBY0E7SUFDZEUsb0VBQWNBO0lBQ2RFLG9FQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEcseUVBQWNBO0lBQ2RFLHdGQUFjQTtJQUNkRSxxRUFBY0E7SUFDZEUscUVBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRyx1RUFBY0E7SUFDZEUsNkVBQWNBO0lBQ2RFLHlFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEUsdUVBQWNBO0lBQ2RHLHFFQUFjQTtJQUNkRSxzRUFBY0E7SUFDZEUsOEVBQWNBO0lBQ2RFLHNFQUFjQTtJQUNkRSwwRUFBY0E7SUFDZEUsNkVBQWNBO0lBQ2RHLG1GQUFjQTtJQUNkRSw0RUFBY0E7SUFDZEUsNEVBQWNBO0lBQ2RFLDhFQUFjQTtJQUNkRSx3RUFBY0E7SUFDZEUsc0VBQWNBO0lBQ2RFLDREQUFjQTtDQUNkO0FBRU0sTUFBTXJVLFNBQXFCO0lBQ2pDaVAseURBQVFBO0lBQ1JFLGdFQUFRQTtJQUNSRSwrREFBUUE7SUFDUkUsK0RBQVFBO0lBQ1JFLHlEQUFRQTtJQUNSRSx3REFBUUE7SUFDUkUsbUVBQVFBO0lBQ1JFLHFFQUFRQTtJQUNSRSxxRUFBUUE7SUFDUkUsb0VBQVFBO0lBQ1JHLGtFQUFTQTtJQUNURSw2REFBU0E7SUFDVEUsc0VBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURSw2REFBU0E7SUFDVEUsZ0VBQVNBO0lBQ1RFLGdFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEcscUVBQVNBO0lBQ1RFLG9GQUFTQTtJQUNURSxpRUFBU0E7SUFDVEUsaUVBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURyxtRUFBU0E7SUFDVEUseUVBQVNBO0lBQ1RFLHFFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEUsbUVBQVNBO0lBQ1RHLGlFQUFTQTtJQUNURSxrRUFBU0E7SUFDVEUsMEVBQVNBO0lBQ1RFLGtFQUFTQTtJQUNURSxzRUFBU0E7SUFDVEUseUVBQVNBO0lBQ1RHLCtFQUFTQTtJQUNURSx3RUFBU0E7SUFDVEUsd0VBQVNBO0lBQ1RFLDBFQUFTQTtJQUNURSxvRUFBU0E7SUFDVEUsa0VBQVNBO0lBQ1RFLHdEQUFTQTtDQUNUO0FBRUQsTUFBTXVCLFVBQVUsQ0FBQztBQUNqQjdKLE9BQU84SixNQUFNLENBQUNELFNBQVN6RixxRUFBU0E7QUFDaENwRSxPQUFPOEosTUFBTSxDQUFDRCxTQUFTeEUsbUVBQVVBO0FBQ2pDckYsT0FBTzhKLE1BQU0sQ0FBQ0QsU0FBUzdELG1FQUFVQTtBQUNqQ2hHLE9BQU84SixNQUFNLENBQUNELFNBQVNsRCxvRUFBVUE7QUFDakMzRyxPQUFPOEosTUFBTSxDQUFDRCxTQUFTckMsMEVBQVVBO0FBRzFCLE1BQU0zTCxNQUFNZ08sUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JPQTtBQUVaLFNBQVMzVCxPQUFPSSxJQUFZO0lBQ3ZDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKbUQ7QUFDTjtBQUVHO0FBRWpDLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRTBULFFBQWlCO0lBRXJFLElBQUksQ0FBRyxRQUFPMVQsS0FBS29DLEtBQUssS0FBSyxRQUFPLEtBQ3pCLENBQUUsZ0JBQWVwQyxLQUFLb0MsS0FBSyxLQUMzQnBDLEtBQUtvQyxLQUFLLENBQUN1UixTQUFTLENBQUNDLFlBQVksS0FBSyxZQUM3QyxPQUFPO0lBRVh2VCw0Q0FBT0EsQ0FBQ0csS0FBSzZTLDZEQUFhQTtJQUMxQnpRLGtEQUFhQSxDQUFDcEMsS0FBS2lULDBEQUFjQTtBQUNyQztBQUVBbFQsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7O0FDaEJtQjtBQUUxQ21ULHdEQUFRQSxDQUFDLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGSztBQUNFO0FBRWQsU0FBU2pVLE9BQU9JLElBQVk7SUFDdkNiLHlDQUFDQSxDQUFFd0IsdUNBQU0sQ0FBQ1gsS0FBSztBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTG1EO0FBQ0U7QUFFVDtBQUU3QixTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRTBULFFBQWlCO0lBRXJFLElBQUksT0FBTzFULEtBQUtvQyxLQUFLLEtBQUssV0FDdEIsT0FBTztJQUVYL0IsNENBQU9BLENBQUNHLEtBQUs0Uyw2REFBYUE7SUFDMUJ4USxrREFBYUEsQ0FBQ3BDLEtBQUtzVCxzREFBVUE7SUFFN0JuVCx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUtvQyxLQUFLLEVBQUUsaUNBQWlDO0FBQy9EO0FBRUE3QixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQ2hCMEM7QUFDVjtBQUNaO0FBRTNDbVQsd0RBQVFBLENBQUMsUUFBUTtJQUNiLEdBQUdHLGtFQUFTQSxDQUFDRCxnRUFBV0EsRUFBRUUsaUVBQWFBLENBQUM7QUFDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQ007QUFFbEIsU0FBU3JVLE9BQU9JLElBQVk7SUFFdkNiLHlDQUFDQSxDQUFDLE1BQU1XLCtDQUFVQSxDQUFDRSxPQUFPO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOc0U7QUFDOUI7QUFDTztBQUVoQyxTQUFTTyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLMlMsZ0ZBQWdDQTtJQUM3QyxNQUFNbFQsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFFOUJGLG9EQUFZQSxDQUFDTCxTQUFTRCxLQUFLb0MsS0FBSyxFQUFFM0I7QUFDdEM7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWm1CO0FBQzRCO0FBQ2tCO0FBQzdDO0FBRTVCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkNiLHlDQUFDQSxDQUFDO0lBRUYsTUFBTWMsVUFBYUgsK0NBQVVBLENBQUNFO0lBQzlCLE1BQU1FLGFBQWFILDRDQUFPQSxDQUFDQztJQUUzQixJQUFJLElBQUlWLElBQUlXLFNBQVNYLElBQUlZLGFBQWFELFNBQVMsRUFBRVgsRUFBRztRQUVoRCxJQUFJcUQsK0NBQVVBLENBQUNyRCxPQUFPNFUscURBQVNBLEVBQUU7WUFFN0IsTUFBTXZVLFNBQVMsSUFBRUw7WUFFakIsb0NBQW9DO1lBQ3BDbEIscURBQWFBLENBQUN1QixTQUFTL0IseUNBQVFBO1lBQy9CdUIseUNBQUNBLENBQUN3Qix1Q0FBTSxDQUFDckIsRUFBRTtZQUNYbEIscURBQWFBLENBQUN1QixTQUFTN0IseUNBQVFBO1lBRS9CO1FBRUo7UUFFQSxJQUFJRyx5Q0FBSUEsQ0FBQ3FCLE9BQU82VCxnRkFBZ0NBLEVBQUU7WUFDOUNoVSx5Q0FBQ0EsQ0FBQ0c7WUFDRjtRQUNKO1FBRUEsTUFBTSxJQUFJK0IsTUFBTTtJQUNwQjtJQUVBbEMseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEN1RDtBQUNmO0FBQ087QUFFaEMsU0FBU29CLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUswUyxpRUFBaUJBO0lBRTlCLE1BQU1oVCxhQUFhRixLQUFLMkosTUFBTSxDQUFDckwsTUFBTTtJQUNyQyxNQUFNMkIsVUFBYUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRWpDLElBQUksSUFBSVosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLMkosTUFBTSxDQUFDckssRUFBRSxFQUFFbUI7QUFDbEQ7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZJO0FBQ0U7QUFFZCxTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLGdFQUFnRTtJQUNoRWIseUNBQUNBLENBQUMsQ0FBQyxFQUFFd0IsdUNBQU0sQ0FBQ1gsS0FBSyxDQUFDLENBQUM7QUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BvRDtBQUNDO0FBRVI7QUFFOUIsU0FBU08sUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUUwVCxRQUFpQjtJQUVyRSxJQUFJLENBQUcxVCxDQUFBQSxLQUFLb0MsS0FBSyxZQUFZc0gsTUFBSyxLQUFNMUosS0FBS29DLEtBQUssQ0FBQ3VSLFNBQVMsRUFBRUMsaUJBQWlCLFNBQzNFLE9BQU87SUFFWHZULDRDQUFPQSxDQUFDRyxLQUFLeVMsOERBQWNBO0lBQzNCclEsa0RBQWFBLENBQUNwQyxLQUFLMlQsdURBQVdBO0lBRTlCeFQsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLb0MsS0FBSyxDQUFDQSxLQUFLO0FBQ2xDO0FBRUE3QixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQ2hCdkIsaUVBQWU7SUFDWDBULFdBQVcsQ0FBQ0M7UUFDUixJQUFJQSxLQUFLLFFBQVFBLEtBQUssTUFBTTtZQUV4QixJQUFJaFYsTUFBTWdWLEVBQUVDLGFBQWE7WUFDekIsTUFBTUMsV0FBV2xWLElBQUlmLE1BQU0sR0FBQztZQUM1QixJQUFHZSxHQUFHLENBQUNrVixTQUFTLEtBQUssT0FBT2xWLEdBQUcsQ0FBQ2tWLFNBQVMsS0FBSyxLQUMxQ2xWLE1BQU1BLElBQUlrRixLQUFLLENBQUMsR0FBRWdRLFdBQVMsS0FBSyxNQUFNbFYsSUFBSWtGLEtBQUssQ0FBQ2dRLFdBQVM7WUFDN0QsT0FBT2xWO1FBQ1g7UUFFQSxJQUFJQSxNQUFNZ1YsRUFBRXhWLFFBQVE7UUFDcEIsSUFBSSxDQUFFUSxJQUFJZ0UsUUFBUSxDQUFDLE1BQ2ZoRSxPQUFPO1FBQ1gsT0FBT0E7SUFDWDtBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQjBCO0FBQ3VCO0FBQ1M7QUFDNkM7QUFDakQ7QUFDb0M7QUFFTjtBQUc5RSxNQUFNMFYsbUJBQW1CbEIsd0RBQVFBLENBQUMsZUFBZTtJQUNwRDFOLFVBQVU7UUFDTixTQUFTO1FBQ1QyRSxhQUFhK0osNkRBQVNBO1FBQ3RCckssaUJBQWlCLENBQUN4SztZQUVkLE1BQU1nVixRQUFRbFYsK0NBQVVBLENBQUNFLFFBQU07WUFDL0IsTUFBTWlWLGFBQWF0UywrQ0FBVUEsQ0FBQ3FTO1lBRTlCLDBCQUEwQjtZQUMxQixJQUFJQyxlQUFlOVMscURBQVNBLEVBQ3hCLE9BQU91UyxtRUFBVUEsQ0FBQ007WUFDdEIsSUFBSUMsZUFBZWQsdURBQVdBLElBQUljLGVBQWU5UyxxREFBU0EsRUFDdEQsT0FBTzhTO1lBRVgsZ0JBQWdCO1lBQ2hCLElBQUlBLGVBQWVmLHFEQUFTQSxFQUFHO2dCQUUzQixNQUFNZ0IsY0FBY3ZVLHVDQUFNLENBQUNxVSxNQUFNO2dCQUVqQyxJQUFJL1cseUNBQUlBLENBQUMrVyxXQUFXakMsNERBQVlBLEVBQUc7b0JBQy9CLElBQUltQyxnQkFBZ0IsU0FBU0EsZ0JBQWdCLFlBQ3pDLE9BQU87b0JBQ1gsSUFBSUEsZ0JBQWdCLFVBQVNBLGdCQUFnQixhQUN6QyxPQUFPO2dCQUNmO2dCQUVBLGlDQUFpQztnQkFDakMsZ0VBQWdFO2dCQUVoRSwrQ0FBK0M7Z0JBQy9DLE9BQU9sVyx5Q0FBQyxDQUFDLFdBQVcsRUFBRWdXLE1BQU0sQ0FBQyxDQUFDLEVBQUUsNEJBQTRCO1lBQ2hFO1lBRUEsTUFBTUcsUUFBUXpLLGtEQUFNLENBQUN1SyxXQUFXO1lBQ2hDLE1BQU1HLFNBQVNELE9BQU9FO1lBQ3RCLElBQUlELFdBQVcxVixXQUNYLE1BQU0sSUFBSTJCLE1BQU0sQ0FBQyxFQUFFOFQsTUFBTTVKLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztZQUMzRCxPQUFPNkosT0FBTzVLLGVBQWUsQ0FBRXhLLE1BQU1nVjtRQUN6QztJQUNKO0FBQ0osR0FBRztBQUVIbkIsd0RBQVFBLENBQUMsU0FBUztJQUVkLGFBQWE7SUFDYkYsV0FBV29CO0lBRVhPLFNBQVM7UUFDTHhLLGFBQWFnSywyREFBT0E7UUFDcEJ0SyxpQkFBZ0J4SyxJQUFJO1lBQ2hCLE9BQU9oQix5Q0FBQyxDQUFDLGNBQWMsRUFBRWdCLEtBQUssQ0FBQyxDQUFDO1FBQ3BDO0lBQ0o7SUFFQSxHQUFHd1UscUVBQVlBLENBQUM7UUFBQztRQUFNO1FBQUs7UUFBSztRQUFLO0tBQUksRUFBRUksa0VBQWNBLEVBQzFDO1FBQ0lXLGVBQWVaLGlFQUFpQkE7SUFDcEMsRUFDZjtJQUNELEdBQUdILHFFQUFZQSxDQUFDO1FBQUM7S0FBSyxFQUFFSSxrRUFBY0EsRUFDbEM7UUFDSVcsZUFBZVosaUVBQWlCQTtRQUNoQ25LLGlCQUFnQnhLLElBQUksRUFBRXdWLElBQUksRUFBRVIsS0FBSztZQUM3QixPQUFPaFcseUNBQUMsQ0FBQyxtQkFBbUIsRUFBRXdXLEtBQUssRUFBRSxFQUFFUixNQUFNLENBQUMsQ0FBQztRQUNuRDtJQUNKLEVBQ0g7SUFDRCxHQUFHUixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBRUksa0VBQWNBLEVBQ2pDO1FBQ0lXLGVBQWVaLGlFQUFpQkE7UUFDaENuSyxpQkFBZ0J4SyxJQUFJLEVBQUV3VixJQUFJLEVBQUVSLEtBQUs7WUFDN0IsT0FBT2hXLHlDQUFDLENBQUMsY0FBYyxFQUFFd1csS0FBSyxFQUFFLEVBQUVSLE1BQU0sQ0FBQyxDQUFDO1FBQzlDO0lBQ0osRUFDSDtJQUNELEdBQUdQLG9FQUFXQSxDQUFDO1FBQUM7S0FBTSxFQUFNSSw2REFBU0EsQ0FBQztJQUN0QyxHQUFHYixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQUVFLGlFQUFhQSxDQUFDO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RitCO0FBQ1U7QUFDRTtBQUU1QixTQUFTclUsT0FBT0ksSUFBWTtJQUV2QyxJQUFJb0MsUUFBUXpCLHVDQUFNLENBQUNYLEtBQUs7SUFFeEIsSUFBSTJDLCtDQUFVQSxDQUFDM0MsVUFBVW1DLHFEQUFTQSxFQUFHO1FBQ2pDLGdFQUFnRTtRQUNoRWhELHlDQUFDQSxDQUFDLENBQUMsRUFBRWlELE1BQU0sQ0FBQyxDQUFDO1FBQ2I7SUFDSjtJQUNBLElBQUksT0FBT0EsVUFBVSxVQUNqQkEsUUFBUWtFLE9BQU9sRSxRQUFRLDRCQUE0QjtJQUV2RCxnRUFBZ0U7SUFDaEVqRCx5Q0FBQ0EsQ0FBQyxDQUFDLEVBQUVpRCxNQUFNLENBQUM7QUFDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCa0Q7QUFDRztBQUVHO0FBRXpDLFNBQVM3QixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRTBULFFBQWlCO0lBRXJFLElBQUl0UixRQUFRcEMsS0FBS29DLEtBQUs7SUFFdEIsSUFBR0EsTUFBTXVSLFNBQVMsRUFBRUMsaUJBQWlCLE9BQ2pDeFIsUUFBUUEsTUFBTUEsS0FBSztJQUV2QixJQUFJLE9BQU9BLFVBQVUsWUFBWSxPQUFPQSxVQUFVLFVBQzlDLE9BQU87SUFFWCxNQUFNcVQsWUFBWSxPQUFPclQsVUFBVSxXQUFXRCxxREFBU0EsR0FBRzJELHVEQUFXQTtJQUVyRXpGLDRDQUFPQSxDQUFDRyxLQUFLd1MsNERBQVlBO0lBQ3pCcFEsa0RBQWFBLENBQUNwQyxLQUFLaVY7SUFFbkI5VSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUc0QjtBQUNsQjtBQUVBN0IsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qkk7QUFDa0I7QUFDeUc7QUFDakY7QUFDNkM7QUFFaEI7QUFFM0YsTUFBTXNWLGlCQUFpQm5DLHdEQUFRQSxDQUFDLGFBQWE7SUFDaEQxTixVQUFVO1FBQ04sU0FBUztRQUNUMkUsYUFBYWdMLDJEQUFPQTtRQUNwQnRMLGlCQUFpQixDQUFDeEs7WUFFZCxNQUFNZ1YsUUFBUWxWLCtDQUFVQSxDQUFDRSxRQUFRO1lBQ2pDLE1BQU1pVixhQUFZdFMsK0NBQVVBLENBQUNxUztZQUU3QiwwQkFBMEI7WUFDMUIsSUFBSUMsZUFBZTlTLHFEQUFTQSxFQUN4QixPQUFPNlM7WUFDWCxJQUFJQyxlQUFlblAsdURBQVdBLEVBQzFCLE9BQU9oRSxtRUFBVUEsQ0FBQ2tUO1lBQ3RCLElBQUlDLGVBQWVkLHVEQUFXQSxFQUMxQixPQUFPblYseUNBQUMsQ0FBQyxrQkFBa0IsRUFBRWdXLE1BQU0sRUFBRSxDQUFDO1lBRTFDLGdCQUFnQjtZQUNoQixJQUFJQyxlQUFlZixxREFBU0EsRUFBRztnQkFFM0IsaUNBQWlDO2dCQUNqQyxnRUFBZ0U7Z0JBRWhFLCtDQUErQztnQkFDL0MsT0FBT2xWLHlDQUFDLENBQUMsT0FBTyxFQUFFZ1csTUFBTSxDQUFDLENBQUMsRUFBRSw0QkFBNEI7WUFDNUQ7WUFFQSxNQUFNRyxRQUFRekssa0RBQU0sQ0FBQ3VLLFdBQVc7WUFDaEMsTUFBTUcsU0FBU0QsT0FBT0U7WUFDdEIsSUFBSUQsV0FBVzFWLFdBQ1gsTUFBTSxJQUFJMkIsTUFBTSxDQUFDLEVBQUU4VCxNQUFNNUosUUFBUSxDQUFDLG9CQUFvQixDQUFDO1lBQzNELE9BQU82SixPQUFPNUssZUFBZSxDQUFFeEssTUFBTWdWO1FBQ3pDO0lBQ0o7QUFDSixHQUFHO0FBRUhuQix3REFBUUEsQ0FBQyxPQUFPO0lBRVosbUJBQW1CO0lBQ25CLGFBQWE7SUFDYkYsV0FBV3FDO0lBRVhWLFNBQVM7UUFDTHhLLGFBQWFnSywyREFBT0E7UUFDcEJ0SyxpQkFBZ0J4SyxJQUFJO1lBQ2hCLE9BQU9oQix5Q0FBQyxDQUFDLEVBQUVnQixLQUFLLFdBQVcsQ0FBQztRQUNoQztJQUNKO0lBRUFxVixTQUFTO1FBQ0x2SyxhQUFhZ0wsMkRBQU9BO1FBQ3BCdEwsaUJBQWdCeEssSUFBSSxFQUFFd1YsSUFBSTtZQUN0QixPQUFPRSxnRUFBT0EsQ0FBQzFWLE1BQU13VjtRQUN6QjtJQUNKO0lBQ0EsR0FBRyxHQUNILEdBQUdoQixxRUFBWUEsQ0FBQztRQUNSLHdEQUF3RDtRQUN4RDtRQUFNO1FBQUs7UUFDWDtRQUFLO1FBQUs7UUFBSztRQUFNO0tBQ3hCLEVBQ0RxQiw4REFBVUEsRUFDVjtRQUNJTixlQUFlSyw0REFBWUE7SUFDL0IsRUFDSDtJQUNELEdBQUdwQixxRUFBWUEsQ0FBQztRQUFDO0tBQUksRUFBRXVCLCtEQUFXQSxFQUM5QjtRQUNJdkwsaUJBQWdCeEssSUFBSSxFQUFFaVcsQ0FBQyxFQUFFQyxDQUFDO1lBRXRCLElBQUl2VCwrQ0FBVUEsQ0FBQzNDLFVBQVVtVSx1REFBV0EsRUFDaEMsdUNBQXVDO1lBQ3ZDLE9BQU90TyxvRUFBV0EsQ0FBQzdGLE1BQU0wVSxtRUFBVUEsQ0FBQ3VCLElBQUksS0FBS3ZCLG1FQUFVQSxDQUFDd0I7WUFFNUQsT0FBT3JRLG9FQUFXQSxDQUFDN0YsTUFBTWlXLEdBQUcsS0FBS0M7UUFDckM7SUFDSixFQUNIO0lBQ0QsR0FBRzFCLHFFQUFZQSxDQUFDO1FBQUM7S0FBSSxFQUFFSSxrRUFBY0EsRUFDakM7UUFDSXVCLGNBQWV4QixpRUFBaUJBO1FBQ2hDWSxlQUFlWixpRUFBaUJBO0lBQ3BDLEVBQ0g7SUFDRCxHQUFHSCxxRUFBWUEsQ0FBQztRQUFDO0tBQUssRUFBRXFCLDhEQUFVQSxFQUM5QjtRQUNJTixlQUFpQkssNERBQVlBO1FBQzdCcEwsaUJBQWlCLENBQUN4SyxNQUFjd1YsTUFBY1I7WUFDMUMsT0FBT2hXLHlDQUFDLENBQUMsaUJBQWlCLEVBQUV3VyxLQUFLLEVBQUUsRUFBRVIsTUFBTSxDQUFDLENBQUM7UUFDakQ7SUFDSixFQUNIO0lBQ0QsR0FBR1IscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUVxQiw4REFBVUEsRUFDN0I7UUFDSU4sZUFBZUssNERBQVlBO1FBQzNCcEwsaUJBQWlCLENBQUN4SyxNQUFjd1YsTUFBY1I7WUFDMUMsbUJBQW1CO1lBQ25CLE9BQU9oVyx5Q0FBQyxDQUFDLFlBQVksRUFBRXdXLEtBQUssRUFBRSxFQUFFUixNQUFNLENBQUMsQ0FBQztRQUM1QztJQUNKLEVBQ0g7SUFFRCxHQUFHUCxvRUFBV0EsQ0FBQztRQUFDO0tBQU0sRUFBRXFCLDJEQUFPQSxFQUMzQjtRQUNJdEwsaUJBQWlCLENBQUN4SyxNQUFNaVc7WUFFcEIsSUFBSXRULCtDQUFVQSxDQUFDM0MsVUFBVW1VLHVEQUFXQSxFQUNoQyxPQUFPd0IsbUVBQVVBLENBQUMzVixNQUFNLEtBQUswVSxtRUFBVUEsQ0FBQ3VCO1lBRTVDLE9BQU9OLG1FQUFVQSxDQUFDM1YsTUFBTSxLQUFLaVc7UUFDakM7SUFDSixFQUNIO0lBQ0QsR0FBR3hCLG9FQUFXQSxDQUFFO1FBQUM7S0FBSSxFQUFFcUIsMkRBQU9BLENBQUM7SUFDL0IsR0FBRzlCLGtFQUFTQSxDQUFHRCxnRUFBV0EsRUFBRUUsaUVBQWFBLENBQUM7QUFHOUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdIMkI7QUFDTTtBQUM0RztBQUN4RTtBQUNtRDtBQUN0RDtBQUVsRUosd0RBQVFBLENBQUMsU0FBUztJQUVkLEdBQUdXLHFFQUFZQSxDQUNYLGdFQUFnRTtJQUNoRTtRQUNJO1FBQU07UUFBSztRQUNYO1FBQUs7UUFBSztRQUFLO1FBQU0sS0FBSyxxQ0FBcUM7S0FDbEUsRUFDRHFCLDhEQUFVQSxFQUNWO1FBQ0lNLGNBQWVQLDREQUFZQTtRQUMzQkwsZUFBZUssNERBQVlBO0lBQy9CLEVBQ0g7SUFDRCxHQUFHcEIscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUVxQiw4REFBVUEsRUFDN0I7UUFDSXJMLGlCQUFpQixDQUFDeEssTUFBTWlXLEdBQUdDO1lBRXZCLElBQUl2VCwrQ0FBVUEsQ0FBQzNDLFVBQVVtVSx1REFBV0EsRUFDaEMsdUNBQXVDO1lBQ3ZDLE9BQU90TyxvRUFBV0EsQ0FBQzdGLE1BQU0wVSxtRUFBVUEsQ0FBQ3VCLElBQUksS0FBS3ZCLG1FQUFVQSxDQUFDd0I7WUFFNUQsT0FBT3JRLG9FQUFXQSxDQUFDN0YsTUFBTThCLG1FQUFVQSxDQUFDbVUsSUFBSSxLQUFLblUsbUVBQVVBLENBQUNvVTtRQUM1RDtJQUNKLEVBQ0g7SUFDRCxHQUFHMUIscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUVJLGtFQUFjQSxFQUNqQztRQUNJVyxlQUFlWixpRUFBaUJBO0lBQ3BDLEVBQ0g7SUFDRCxHQUFHSCxxRUFBWUEsQ0FBQztRQUFDO0tBQUssRUFBRTZCLG1FQUFlQSxFQUNuQztRQUNJN0wsaUJBQWlCLENBQUN4SyxNQUFjd1YsTUFBY1I7WUFDMUMsT0FBT2hXLHlDQUFDLENBQUMsbUJBQW1CLEVBQUV3VyxLQUFLLEVBQUUsRUFBRVIsTUFBTSxDQUFDLENBQUM7UUFDbkQ7SUFDSixFQUNIO0lBQ0QsR0FBR1IscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQUU2QixtRUFBZUEsRUFDbEM7UUFDSTdMLGlCQUFpQixDQUFDeEssTUFBY3dWLE1BQWNSO1lBQzFDLG1CQUFtQjtZQUNuQixPQUFPaFcseUNBQUMsQ0FBQyxZQUFZLEVBQUV3VyxLQUFLLEVBQUUsRUFBRVIsTUFBTSxDQUFDLENBQUM7UUFDNUM7SUFDSixFQUNIO0lBRUQsR0FBR1Asb0VBQVdBLENBQUM7UUFBQztLQUFNLEVBQUUyQiw2REFBU0EsRUFDN0I7UUFDSTVMLGlCQUFpQixDQUFDeEssTUFBTWlXO1lBRXBCLElBQUl0VCwrQ0FBVUEsQ0FBQzNDLFVBQVVtQyxxREFBU0EsRUFDOUIsT0FBT3dULG1FQUFVQSxDQUFDM1YsTUFBTSxLQUFLOEIsbUVBQVVBLENBQUNtVTtZQUU1QyxPQUFPTixtRUFBVUEsQ0FBQzNWLE1BQU0sS0FBS2lXO1FBQ2pDO0lBQ0osRUFDSDtJQUNELEdBQUd4QixvRUFBV0EsQ0FBQztRQUFDO0tBQUksRUFDaEJxQiwyREFBT0EsRUFDUDtRQUNJSyxjQUFlUCw0REFBWUE7SUFDL0IsRUFDSDtJQUNELEdBQUc1QixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQUVFLGlFQUFhQSxDQUFDO0FBUTlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9FNEI7QUFDQztBQUVkLFNBQVNyVSxPQUFPSSxJQUFZO0lBQ3ZDWiwwQ0FBRSxDQUFDLENBQUMsRUFBRXVCLHVDQUFNLENBQUNYLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xrRDtBQUNHO0FBRVY7QUFFNUIsU0FBU08sUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUUwVCxRQUFpQjtJQUVyRSxJQUFJLE9BQU8xVCxLQUFLb0MsS0FBSyxLQUFLLFVBQ3RCLE9BQU87SUFFWC9CLDRDQUFPQSxDQUFDRyxLQUFLdVMsNERBQVlBO0lBQ3pCblEsa0RBQWFBLENBQUNwQyxLQUFLMFQscURBQVNBO0lBRTVCdlQsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHUixLQUFLb0MsS0FBSztBQUM1QjtBQUVBN0IsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkk7QUFDa0I7QUFDaUM7QUFDdkI7QUFDMEM7QUFFcEM7QUFFdEQsTUFBTStWLGlCQUFpQjVDLHdEQUFRQSxDQUFDLGFBQWE7SUFDaEQxTixVQUFVO1FBQ04sU0FBUztRQUNUMkUsYUFBYWdLLDJEQUFPQTtRQUNwQnRLLGlCQUFpQixDQUFDeEs7WUFFZCxNQUFNZ1YsUUFBUWxWLCtDQUFVQSxDQUFDRSxRQUFNO1lBQy9CLE1BQU1pVixhQUFhdFMsK0NBQVVBLENBQUNxUztZQUU5QiwwQkFBMEI7WUFDMUIsSUFBSUMsZUFBZWYscURBQVNBLEVBQ3hCLE9BQU9jO1lBRVgsTUFBTUksU0FBUzFLLGtEQUFNLENBQUN1SyxXQUFXLEVBQUVLO1lBQ25DLElBQUlGLFdBQVcxVixXQUNYLE1BQU0sSUFBSTJCLE1BQU0sQ0FBQyxFQUFFcUosa0RBQU0sQ0FBQ3VLLFdBQVcsQ0FBQzFKLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztZQUN4RSxPQUFPNkosT0FBTzVLLGVBQWUsQ0FBRXdLO1FBQ25DO0lBQ0o7QUFDSixHQUFHO0FBRUhuQix3REFBUUEsQ0FBQyxPQUFPO0lBRVosYUFBYTtJQUNiRixXQUFXOEM7SUFFWEMsU0FBUztRQUNMNUwsYUFBYWdMLDJEQUFPQTtRQUNwQnRMLGlCQUFpQixDQUFDcEc7WUFDZCxPQUFPcEYseUNBQUMsQ0FBQyxFQUFFYywrQ0FBVUEsQ0FBQ3NFLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDekM7SUFDSjtJQUVBLEdBQUc0UCxrRUFBU0EsQ0FBSUQsZ0VBQVdBLEVBQUV3QyxnRUFBWUEsQ0FBQztJQUMxQyxHQUFHL0IscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQVFnQywrREFBV0EsQ0FBQztJQUN6QyxHQUFHaEMscUVBQVlBLENBQUM7UUFBQztLQUFJLEVBQVE4Qiw4REFBVUEsRUFDbkM7UUFDSWYsZUFBaUJaLGlFQUFpQkE7UUFDbENuSyxpQkFBaUIsQ0FBQ3hLLE1BQWNpVyxHQUFXQztZQUV2QyxJQUFJdlQsK0NBQVVBLENBQUNzVCxPQUFPL0IscURBQVNBLEVBQzNCLENBQUMrQixHQUFFQyxFQUFFLEdBQUc7Z0JBQUNBO2dCQUFFRDthQUFFO1lBRWpCLE9BQU9qWCx5Q0FBQyxDQUFDLEVBQUVpWCxFQUFFLFFBQVEsRUFBRUMsRUFBRSxDQUFDLENBQUM7UUFDL0I7SUFDSixFQUFFO0FBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RCtCO0FBQ3VCO0FBQ0Q7QUFDRztBQUV6QyxTQUFTdFcsT0FBT0ksSUFBWTtJQUV2QyxNQUFNRSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFDM0IsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBRTlCLElBQUksSUFBSVYsSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCRiwwQ0FBRSxDQUFDLEVBQUVFLElBQUVXLFFBQVEsR0FBRyxDQUFDO0lBRXZCLElBQUkwVyxTQUFjMVc7SUFDbEIsSUFBSTBDLCtDQUFVQSxDQUFDMUMsYUFBYTZGLHVEQUFXQSxJQUFJbkQsK0NBQVVBLENBQUMzQyxVQUFVbUMscURBQVNBLEVBQ3JFd1UsU0FBUzdVLG1FQUFVQSxDQUFDN0I7SUFFeEJkLHlDQUFDQSxDQUFDd1g7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCMkQ7QUFDYztBQUMxQjtBQUNxQjtBQUVyRCxTQUFTcFcsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLE1BQU1tVyxnQkFBZ0IsYUFBYTVXO0lBQ25DLE1BQU02VyxVQUFVRCxnQkFBZ0I1VyxLQUFLNlcsT0FBTyxHQUFHO1FBQUM3VyxLQUFLNkIsTUFBTTtLQUFDO0lBRTVELElBQU9wQixRQUFReEMsSUFBSSxLQUFLLFdBQ2pCNFksT0FBTyxDQUFDLEVBQUUsQ0FBQ3BWLFdBQVcsQ0FBQ0MsS0FBSyxLQUFLLFVBQ2pDLENBQUVtVixDQUFBQSxPQUFPLENBQUMsRUFBRSxDQUFDalYsRUFBRSxJQUFJbkIsUUFBUVMsYUFBYSxHQUUzQyxPQUFPO0lBRVhiLDRDQUFPQSxDQUFDRyxLQUFLc1MsNkRBQWFBO0lBRTFCLE1BQU01UyxhQUFhMlcsUUFBUXZZLE1BQU0sR0FBRztJQUNwQyxNQUFNMkIsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRTlCSSxvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS29DLEtBQUssRUFBRTNCLFVBQVUsUUFBUTtJQUNwRCxJQUFJeUssUUFBUXZJLCtDQUFVQSxDQUFDMUM7SUFFdkIsSUFBSW1KLGNBQWM7SUFFbEIsTUFBTUMsYUFBYXJKLE1BQU1xSixZQUFZekg7SUFDckMsSUFBSXlILGVBQWUzSixXQUNmMEosY0FBY25JLDBEQUFVQSxDQUFDb0k7SUFFN0IsSUFBSUQsZ0JBQWdCLFFBQVFBLGdCQUFnQjhCLE9BQ3hDckcsUUFBUUMsSUFBSSxDQUFDO0lBRWpCLElBQUlzRSxnQkFBZ0IsTUFBTztRQUN2QkEsY0FBYzhCO1FBQ2QsSUFBSUEsVUFBVXBGLHVEQUFXQSxFQUNyQnNELGNBQWNqSCxxREFBU0EsRUFBRSxtQkFBbUI7SUFDNUMseUJBQXlCO0lBQ2pDO0lBRUFTLGtEQUFhQSxDQUFDcEMsS0FBSzRJO0lBRW5CLElBQUksSUFBSTlKLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUFHO1FBRWhDZ0Isb0RBQVlBLENBQUNMLFVBQVFYLEdBQUd1WCxPQUFPLENBQUN2WCxJQUFFLEVBQUUsRUFBRW1CO1FBQ3RDQSxRQUFRUyxhQUFhLENBQUMyVixPQUFPLENBQUN2WCxJQUFFLEVBQUUsQ0FBQ3NDLEVBQUUsQ0FBQyxHQUFHd0g7SUFFakQ7Ozs7Ozs7Ozs7Ozs7QUFhQSxHQUNJO0FBQ0o7QUFFQTdJLFFBQVFHLFlBQVksR0FBRztJQUFDO0lBQVU7Q0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFZjtBQUN1QjtBQUNEO0FBQ0c7QUFFekMsU0FBU2QsT0FBT0ksSUFBWTtJQUV2Q2IseUNBQUNBLENBQUM7SUFFRixNQUFNZSxhQUFhSCw0Q0FBT0EsQ0FBQ0M7SUFDM0IsTUFBTUMsVUFBYUgsK0NBQVVBLENBQUNFO0lBRTlCLElBQUksSUFBSVYsSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCRiwwQ0FBRSxDQUFDLEVBQUVFLElBQUVXLFFBQVEsR0FBRyxDQUFDO0lBRXZCLElBQUkwVyxTQUFjMVc7SUFDbEIsSUFBSTBDLCtDQUFVQSxDQUFDMUMsYUFBYTZGLHVEQUFXQSxJQUFJbkQsK0NBQVVBLENBQUMzQyxVQUFVbUMscURBQVNBLEVBQ3JFd1UsU0FBUzdVLG1FQUFVQSxDQUFDN0I7SUFFeEJkLHlDQUFDQSxDQUFDd1g7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCd0Q7QUFDVztBQUNwQjtBQUNxQjtBQUVyRCxTQUFTcFcsUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLE1BQU1tVyxnQkFBZ0IsYUFBYTVXO0lBQ25DLE1BQU02VyxVQUFVRCxnQkFBZ0I1VyxLQUFLNlcsT0FBTyxHQUFHO1FBQUM3VyxLQUFLNkIsTUFBTTtLQUFDO0lBRTVELElBQU9wQixRQUFReEMsSUFBSSxLQUFLLFdBQ2pCNFksT0FBTyxDQUFDLEVBQUUsQ0FBQ3BWLFdBQVcsQ0FBQ0MsS0FBSyxLQUFLLFVBQ2pDbVYsT0FBTyxDQUFDLEVBQUUsQ0FBQ2pWLEVBQUUsSUFBSW5CLFFBQVFTLGFBQWEsRUFFekMsT0FBTztJQUVYYiw0Q0FBT0EsQ0FBQ0csS0FBS3FTLGtFQUFrQkE7SUFDL0IsTUFBTTNTLGFBQWEyVyxRQUFRdlksTUFBTSxHQUFHO0lBQ3BDLE1BQU0yQixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFOUJJLG9EQUFZQSxDQUFDTCxTQUFTRCxLQUFLb0MsS0FBSyxFQUFFM0IsVUFBVSxRQUFRO0lBQ3BELElBQUl5SyxRQUFRdkksK0NBQVVBLENBQUMxQztJQUV2QixJQUFJbUosY0FBYztJQUVsQixNQUFNQyxhQUFhckosTUFBTXFKLFlBQVl6SDtJQUNyQyxJQUFJeUgsZUFBZTNKLFdBQ2YwSixjQUFjbkksMERBQVVBLENBQUNvSTtJQUc3QixJQUFJRCxnQkFBZ0IsUUFBUUEsZ0JBQWdCOEIsT0FDcENyRyxRQUFRQyxJQUFJLENBQUM7SUFFckIsSUFBSXNFLGdCQUFnQixNQUFPO1FBQ3ZCQSxjQUFjOEI7UUFDZCxJQUFJQSxVQUFVcEYsdURBQVdBLEVBQ3JCc0QsY0FBY2pILHFEQUFTQSxFQUFFLG1CQUFtQjtJQUM1Qyx5QkFBeUI7SUFDakM7SUFFQVMsa0RBQWFBLENBQUNwQyxLQUFLNEk7SUFFbkIsSUFBSSxJQUFJOUosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQUc7UUFDaENnQixvREFBWUEsQ0FBQ0wsVUFBUVgsR0FBR3VYLE9BQU8sQ0FBQ3ZYLElBQUUsRUFBRSxFQUFFbUI7UUFDdENBLFFBQVFTLGFBQWEsQ0FBQzJWLE9BQU8sQ0FBQ3ZYLElBQUUsRUFBRSxDQUFDc0MsRUFBRSxDQUFDLEdBQUd3SDtJQUM3QztBQUNKO0FBRUE3SSxRQUFRRyxZQUFZLEdBQUc7SUFBQztJQUFVO0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRGxCO0FBQ3lCO0FBQ0s7QUFFSztBQUVoRCxTQUFTZCxPQUFPSSxJQUFZO0lBRXZDLElBQUlnWCxLQUFLRixvRUFBZSxDQUFDblcsdUNBQU0sQ0FBQ1gsS0FBSyxDQUFpQztJQUV0RSxNQUFNQyxVQUFVSCwrQ0FBVUEsQ0FBQ0U7SUFFM0IsSUFBSS9CLE9BQU84WSxpRUFBcUJBO0lBQ2hDLElBQUkzQixTQUFTMUssa0RBQU0sQ0FBQy9ILCtDQUFVQSxDQUFDMUMsU0FBUyxFQUFFLENBQUMrVyxHQUFHO0lBRTlDLElBQUk1QixXQUFXMVYsV0FDWHpCLE9BQU9tWCxPQUFPdEssV0FBVyxDQUFDbkksK0NBQVVBLENBQUMxQyxVQUFRO0lBRWpELGdCQUFnQjtJQUNoQixJQUFJaEMsU0FBUzhZLGlFQUFxQkEsRUFBRTtRQUNoQyxNQUFNLElBQUkxVixNQUFNLENBQUMsRUFBRXNCLCtDQUFVQSxDQUFDMUMsVUFBUSxHQUFHLENBQUMsRUFBRStXLEdBQUcsRUFBRSxFQUFFclUsK0NBQVVBLENBQUMxQyxTQUFTLGlCQUFpQixDQUFDO0lBQ3pGOzs7Ozs7Ozs7O1FBVUEsR0FDSjtJQUVBZiwwQ0FBRUEsQ0FBRWtXLE9BQU81SyxlQUFlLENBQUV4SyxNQUFNQyxTQUFTQSxVQUFRO0FBQ3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkN3RDtBQUNtQjtBQUM1QjtBQUNRO0FBRXhDLFNBQVNNLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxJQUFJdVcsS0FBS0MsaUVBQVksQ0FBQ2pYLEtBQUtnWCxFQUFFLENBQUN2VixXQUFXLENBQUNDLEtBQUssQ0FBOEI7SUFDN0UsSUFBSXNWLE9BQU90WCxXQUFXO1FBQ2xCbUYsUUFBUUMsSUFBSSxDQUFDLE1BQU05RSxLQUFLZ1gsRUFBRSxDQUFDdlYsV0FBVyxDQUFDQyxLQUFLO1FBQzVDLE1BQU0sSUFBSUwsTUFBTTtJQUNwQjtJQUNBVix1Q0FBTSxDQUFDSCxJQUFJLEdBQUd3VztJQUVkM1csNENBQU9BLENBQUNHLEtBQUtvUyxrRUFBa0JBO0lBQy9CLE1BQU0zUyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVdELEtBQUs2QixNQUFNLEVBQUVwQjtJQUNyQ0gsb0RBQVlBLENBQUNMLFVBQVEsR0FBR0QsS0FBS29DLEtBQUssRUFBRzNCO0lBRXJDbUMsa0RBQWFBLENBQUNwQyxLQUFLbUMsK0NBQVVBLENBQUMxQztBQUNsQztBQUVBTSxRQUFRRyxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCUjtBQUNLO0FBRWxCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCWiwwQ0FBRSxDQUFDLEVBQUVhLFFBQVEsQ0FBQyxFQUFFQSxVQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSeUQ7QUFDakI7QUFDTztBQUVoQyxTQUFTTSxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLbVMsbUVBQW1CQTtJQUNoQyxNQUFNMVMsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUs7SUFFOUJGLG9EQUFZQSxDQUFDTCxTQUFXRCxLQUFLb0MsS0FBSyxFQUFFM0IsVUFDcENILG9EQUFZQSxDQUFDTCxVQUFRLEdBQUdELEtBQUt1RSxLQUFLLEVBQUU5RDtBQUN4QztBQUVBRixRQUFRRyxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2JSO0FBQ2E7QUFFMUIsU0FBU2QsT0FBT0ksSUFBWTtJQUN2Q1osMENBQUUsQ0FBQyxFQUFFVSwrQ0FBVUEsQ0FBQ0UsTUFBTSxDQUFDLEVBQUVXLHVDQUFNLENBQUNYLEtBQUssQ0FBQyxDQUFDO0FBQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMb0Q7QUFDSjtBQUNEO0FBRWhDLFNBQVNPLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUtrUyw4REFBY0E7SUFDM0IsTUFBTXpTLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO0lBRTlCRixvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS29DLEtBQUssRUFBRTNCO0lBRWxDRSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUdSLEtBQUtrWCxJQUFJO0FBQzNCO0FBRUEzVyxRQUFRRyxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkUjtBQUN5QjtBQUViO0FBRXpCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkMsTUFBTUMsVUFBVUgsK0NBQVVBLENBQUNFO0lBRTNCLE1BQU1vVixTQUFTMUssa0RBQU0sQ0FBQy9ILCtDQUFVQSxDQUFDMUMsU0FBUyxDQUFFVSx1Q0FBTSxDQUFDWCxLQUFLLENBQUM7SUFDekRkLDBDQUFFQSxDQUFFa1csT0FBTzVLLGVBQWUsQ0FBRXhLLE1BQU1DLFNBQVNBLFVBQVE7QUFDdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWDZEO0FBRWE7QUFDWDtBQUNUO0FBQ3FCO0FBRTVELFNBQVNNLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRSxJQUFJdVcsS0FBS0MsaUVBQVksQ0FBQ2pYLEtBQUtnWCxFQUFFLENBQUN2VixXQUFXLENBQUNDLEtBQUssQ0FBOEI7SUFDN0UsSUFBSXNWLE9BQU90WCxXQUFXO1FBQ2xCbUYsUUFBUUMsSUFBSSxDQUFDLE1BQU05RSxLQUFLZ1gsRUFBRSxDQUFDdlYsV0FBVyxDQUFDQyxLQUFLO1FBQzVDLE1BQU0sSUFBSUwsTUFBTTtJQUNwQjtJQUVBaEIsNENBQU9BLENBQUNHLEtBQUtpUyxnRUFBZ0JBO0lBRTdCLE1BQU14UyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUM5QkYsb0RBQVlBLENBQUNMLFNBQVdELEtBQUtxWCxJQUFJLEVBQUc1VyxVQUFVLE9BQU87SUFDckRILG9EQUFZQSxDQUFDTCxVQUFRLEdBQUdELEtBQUtzWCxLQUFLLEVBQUU3VyxVQUFVLFFBQVE7SUFFdEQsTUFBTThXLFFBQVE1VSwrQ0FBVUEsQ0FBQzFDO0lBQ3pCLE1BQU1pTCxRQUFRdkksK0NBQVVBLENBQUMxQyxVQUFRO0lBRWpDLElBQUloQyxPQUFPOFksaUVBQXFCQTtJQUNoQyxJQUFJM0IsU0FBUzFLLGtEQUFNLENBQUM2TSxNQUFNLEVBQUUsQ0FBQ1AsR0FBRztJQUVoQyxJQUFJNUIsV0FBVzFWLFdBQ1h6QixPQUFPbVgsT0FBT3RLLFdBQVcsQ0FBQ0k7SUFFOUIsd0JBQXdCO0lBQ3hCLElBQUlqTixTQUFTOFksaUVBQXFCQSxFQUFFO1FBQ2hDQyxLQUFTSSwwRUFBaUJBLENBQUNKO1FBQzNCNUIsU0FBUzFLLGtEQUFNLENBQUNRLE1BQU0sRUFBRSxDQUFDOEwsR0FBRztRQUM1QixJQUFJNUIsV0FBVzFWLFdBQ1h6QixPQUFTbVgsT0FBT3RLLFdBQVcsQ0FBQ3lNO1FBRWhDLElBQUl0WixTQUFTOFksaUVBQXFCQSxFQUM5QixNQUFNLElBQUkxVixNQUFNLENBQUMsRUFBRTZKLE1BQU0sQ0FBQyxFQUFFOEwsR0FBRyxDQUFDLEVBQUVPLE1BQU0saUJBQWlCLENBQUM7UUFFOURKLG9EQUFZQSxDQUFDbFgsU0FBU0EsVUFBUSxJQUFJLGlDQUFpQztJQUN2RTtJQUVBVSx1Q0FBTSxDQUFDSCxJQUFJLEdBQUd3VztJQUVkcFUsa0RBQWFBLENBQUNwQyxLQUFLdkM7QUFDdkI7QUFFQXNDLFFBQVFHLFlBQVksR0FBRztJQUFDO0NBQVE7Ozs7Ozs7Ozs7Ozs7OztBQ2hEaEMsaUVBQWU7SUFDWDhXLGdCQUFnQixDQUFDdkIsR0FBV0M7UUFDeEIsT0FBT3hOLEtBQUsrTyxLQUFLLENBQUV4QixJQUFFQztJQUN6QjtJQUNBd0IsY0FBYyxDQUFDekIsR0FBV0M7UUFFdEIsSUFBSXlCLFNBQVMxQixJQUFFQztRQUNmLElBQUl5QixTQUFTLEtBQUsxQixJQUFFQyxNQUFNLEVBQUUsRUFDeEIsT0FBT3lCO1FBRVgsT0FBTyxFQUFFQTtJQUNiO0lBQ0FDLFdBQVcsQ0FBSTNCLEdBQVdDO1FBRXRCLE1BQU0yQixNQUFNLENBQUM1QixJQUFJQyxJQUFJQSxDQUFBQSxJQUFLQTtRQUMxQixJQUFJMkIsUUFBUSxLQUFLM0IsSUFBSSxHQUNqQixPQUFPLENBQUM7UUFDWixPQUFPMkI7SUFDWDtJQUNBQyxTQUFTLENBQUk3QixHQUFXQztRQUVwQixPQUFPLENBQUNELElBQUlDLElBQUlBLENBQUFBLElBQUtBO0lBQ3pCO0FBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkIyQjtBQUNDO0FBQ3dCO0FBRXRDLFNBQVN0VyxPQUFPSSxJQUFZO0lBQ3ZDZCwwQ0FBRUEsQ0FBRTZZLG1FQUFVQSxDQUFDL1gsTUFBTVcsdUNBQU0sQ0FBQ1gsS0FBSztBQUNyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ29CO0FBQzVCO0FBRS9DLE1BQU1nWSxhQUFhO0lBQ2YsT0FBTztJQUNQLE1BQU87QUFDWDtBQUVlLFNBQVN6WCxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLZ1MsaUVBQWlCQTtJQUM5QixNQUFNdFMsYUFBYUYsS0FBSzJKLE1BQU0sQ0FBQ3JMLE1BQU07SUFDckMsTUFBTTJCLFVBQWFHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUVqQyxJQUFJLElBQUlaLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QmdCLG9EQUFZQSxDQUFDaEIsSUFBSVcsU0FBU0QsS0FBSzJKLE1BQU0sQ0FBQ3JLLEVBQUUsRUFBRW1CO0lBRTlDbUMsa0RBQWFBLENBQUNwQyxLQUFLbUMsK0NBQVVBLENBQUMxQztJQUU5QlUsdUNBQU0sQ0FBQ0gsSUFBSSxHQUFHd1gsVUFBVSxDQUFDaFksS0FBS2dYLEVBQUUsQ0FBQ3ZWLFdBQVcsQ0FBQ0MsS0FBSyxDQUE0QjtBQUNsRjtBQUVBbkIsUUFBUUcsWUFBWSxHQUFHO0lBQUM7Q0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCRjtBQUNzQjtBQUNvQjtBQUVWO0FBRy9ELFNBQVN1WCx5QkFBeUJqWSxJQUFZLEVBQUVxWCxJQUFXLEVBQUVMLEVBQVUsRUFBRU0sS0FBYTtJQUVsRixJQUFJWSxXQUFXO0lBQ2YsTUFBTWhOLFFBQVF2SSwrQ0FBVUEsQ0FBQzJVO0lBQ3pCLE1BQU1DLFFBQVE1VSwrQ0FBVUEsQ0FBQzBVO0lBRXpCLElBQUlwWixPQUFPOFksaUVBQXFCQTtJQUNoQyxJQUFJM0IsU0FBUzFLLGtEQUFNLENBQUM2TSxNQUFNLEVBQUUsQ0FBQ1AsR0FBRztJQUNoQyxJQUFJNUIsV0FBVzFWLFdBQ1h6QixPQUFPbVgsT0FBT3RLLFdBQVcsQ0FBQ0k7SUFFOUIsSUFBSWpOLFNBQVM4WSxpRUFBcUJBLEVBQUU7UUFFaENDLEtBQVNJLDBFQUFpQkEsQ0FBQ0o7UUFDM0I1QixTQUFTMUssa0RBQU0sQ0FBQ1EsTUFBTSxFQUFFLENBQUM4TCxHQUFHO1FBQzVCLElBQUk1QixXQUFXMVYsV0FDWHpCLE9BQVNtWCxPQUFPdEssV0FBVyxDQUFDeU07UUFFaEMsSUFBSXRaLFNBQVM4WSxpRUFBcUJBLEVBQUU7WUFDaEMsSUFBSUMsT0FBTyxZQUFZQSxPQUFPLFVBQzFCLE1BQU0sSUFBSTNWLE1BQU0sQ0FBQyxFQUFFa1csTUFBTSxDQUFDLEVBQUVQLEdBQUcsQ0FBQyxFQUFFOUwsTUFBTSxpQkFBaUIsQ0FBQztZQUU5RCxNQUFNaU4sT0FBT25CLE9BQU8sV0FBVyxRQUFRO1lBRXZDLE9BQU9uUixvRUFBV0EsQ0FBQzdGLE1BQU1xWCxNQUFNYyxNQUFNYjtRQUN6QztRQUVBWSxXQUFXO1FBQ1gsQ0FBQ2IsTUFBTUMsTUFBTSxHQUFHO1lBQUNBO1lBQU9EO1NBQUs7SUFDakM7SUFFQSxPQUFPakMsT0FBTzVLLGVBQWUsQ0FBRXhLLE1BQU1xWCxNQUFNQyxPQUFPWTtBQUN0RDtBQUVlLFNBQVN0WSxPQUFPSSxJQUFZO0lBRXZDLE1BQU1vQyxRQUFRekIsdUNBQU0sQ0FBQ1gsS0FBSztJQUUxQixNQUFNQyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFFOUIsSUFBSSxJQUFJVixJQUFJLEdBQUdBLElBQUk4QyxNQUFNOUQsTUFBTSxFQUFFLEVBQUVnQixFQUFHO1FBQ2xDLElBQUlBLE1BQU0sR0FDTkgseUNBQUNBLENBQUM7UUFFTixNQUFNNlgsS0FBUTVVLEtBQUssQ0FBQzlDLEVBQUU7UUFDdEIsTUFBTStYLE9BQVEvWCxJQUFFVztRQUNoQixNQUFNcVgsUUFBUWhZLElBQUUsSUFBRVc7UUFFbEIsSUFBSStXLE9BQU8sTUFBTztZQUNkOVgsMENBQUVBLENBQUUyRyxvRUFBV0EsQ0FBQzdGLE1BQU1xWCxNQUFNLE9BQU9DO1lBQ25DO1FBQ0o7UUFDQSxJQUFJTixPQUFPLFVBQVc7WUFDbEI5WCwwQ0FBRUEsQ0FBRTJHLG9FQUFXQSxDQUFDN0YsTUFBTXFYLE1BQU0sT0FBT0M7WUFDbkM7UUFDSjtRQUVBcFksMENBQUVBLENBQUUrWSx5QkFBeUJqWSxNQUFNcVgsTUFBTUwsSUFBSU07SUFDakQ7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRXVEO0FBQ1E7QUFDaEI7QUFDUTtBQUNYO0FBRTdCLFNBQVMvVyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEUsTUFBTTJYLE1BQU1wWSxLQUFLb1ksR0FBRyxDQUFDclUsR0FBRyxDQUFFLENBQUNYO1FBQ3ZCLE1BQU00VCxLQUFLQyxpRUFBWSxDQUFDN1QsRUFBRTNCLFdBQVcsQ0FBQ0MsS0FBSyxDQUE4QjtRQUN6RSxJQUFJc1YsT0FBT3RYLFdBQ1AsTUFBTSxJQUFJMkIsTUFBTSxDQUFDLEVBQUUrQixFQUFFM0IsV0FBVyxDQUFDQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDN0QsT0FBT3NWO0lBQ1g7SUFDQXJXLHVDQUFNLENBQUNILElBQUksR0FBRzRYO0lBRWQvWCw0Q0FBT0EsQ0FBQ0csS0FBSytSLGlFQUFpQkE7SUFDOUIzUCxrREFBYUEsQ0FBQ3BDLEtBQUtzVCxzREFBVUE7SUFDN0IsTUFBTTVULGFBQWFGLEtBQUtxWSxXQUFXLENBQUMvWixNQUFNLEdBQUc7SUFDN0MsTUFBTTJCLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLTjtJQUU5Qkksb0RBQVlBLENBQUNMLFNBQVNELEtBQUtxWCxJQUFJLEVBQUU1VztJQUNqQyxJQUFJLElBQUluQixJQUFJLEdBQUlBLElBQUlZLFlBQVksRUFBRVosRUFDOUJnQixvREFBWUEsQ0FBQ2hCLElBQUlXLFNBQVNELEtBQUtxWSxXQUFXLENBQUMvWSxJQUFFLEVBQUUsRUFBRW1CO0FBQ3pEO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCSztBQUN5QjtBQUNZO0FBRVo7QUFHdEMsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxNQUFNcVgsT0FBUXZYLCtDQUFVQSxDQUFDRTtJQUN6QixNQUFNb0MsUUFBUXpCLHVDQUFNLENBQUNYLEtBQUs7SUFFMUIsSUFBSW9DLFVBQVUsT0FDVixPQUFPbEQsMENBQUVBLENBQUV5VyxtRUFBVUEsQ0FBQzNWLE1BQU0sS0FBSzBVLG1FQUFVQSxDQUFDMkMsTUFBTXZSLHVEQUFXQTtJQUVqRSxNQUFNc1AsU0FBUzFLLGtEQUFNLENBQUMvSCwrQ0FBVUEsQ0FBQzBVLE1BQU8sQ0FBQ2pWLE1BQU07SUFFL0NsRCwwQ0FBRUEsQ0FBRWtXLE9BQU81SyxlQUFlLENBQUV4SyxNQUFNcVg7QUFDdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEIrQztBQUVRO0FBQ29CO0FBQ3RCO0FBQ3NCO0FBRTVELFNBQVM5VyxRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLOFIsK0RBQWVBO0lBQzVCLE1BQU1yUyxVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBSztJQUU5QkYsb0RBQVlBLENBQUNMLFNBQVNELEtBQUtzWSxPQUFPLEVBQUc3WDtJQUVyQyxJQUFJdVcsS0FBS0MsaUVBQVksQ0FBQ2pYLEtBQUtnWCxFQUFFLENBQUN2VixXQUFXLENBQUNDLEtBQUssQ0FBOEI7SUFFN0UsSUFBSXNWLE9BQU90WCxXQUFXO1FBQ2xCbUYsUUFBUUMsSUFBSSxDQUFDLE1BQU05RSxLQUFLZ1gsRUFBRSxDQUFDdlYsV0FBVyxDQUFDQyxLQUFLO1FBQzVDLE1BQU0sSUFBSUwsTUFBTTtJQUNwQjtJQUVBVix1Q0FBTSxDQUFDSCxJQUFJLEdBQUd3VztJQUVkLElBQUlBLE9BQU8sT0FBTztRQUVkcFUsa0RBQWFBLENBQUNwQyxLQUFLc1Qsc0RBQVVBO1FBQzdCO0lBQ0o7SUFFQSxJQUFJN1YsT0FBTzhZLGlFQUFxQkE7SUFDaEMsSUFBSTNCLFNBQVMxSyxrREFBTSxDQUFDL0gsK0NBQVVBLENBQUMxQyxTQUFTLEVBQUUsQ0FBQytXLEdBQUc7SUFFOUMsSUFBSTVCLFdBQVcxVixXQUNYekIsT0FBT21YLE9BQU90SyxXQUFXO0lBRTdCLElBQUk3TSxTQUFTOFksaUVBQXFCQSxFQUM5QixNQUFNLElBQUkxVixNQUFNLENBQUMsRUFBRTJWLEdBQUcsQ0FBQyxFQUFFclUsK0NBQVVBLENBQUMxQyxTQUFTLGlCQUFpQixDQUFDO0lBRW5FMkMsa0RBQWFBLENBQUNwQyxLQUFLdkM7QUFDdkI7QUFFQXNDLFFBQVFHLFlBQVksR0FBRztJQUFDO0NBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q1A7QUFFWixTQUFTZCxPQUFPSSxJQUFZO0lBQ3ZDYix5Q0FBQ0EsQ0FBQztBQUNOOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0owQztBQUNaO0FBR2YsU0FBU29CLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFMFQsUUFBaUI7SUFDckVyVCw0Q0FBT0EsQ0FBQ0csS0FBSzZSLG9EQUFJQTtBQUNyQjtBQUdBOVIsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RRO0FBQ0U7QUFFbEIsU0FBU2QsT0FBT0ksSUFBWTtJQUV2QyxNQUFNQyxVQUFVSCwrQ0FBVUEsQ0FBQ0U7SUFFM0IsSUFBSUMsWUFBWSxHQUNaLE9BQU9kLHlDQUFDQSxDQUFDO0lBRWIsT0FBT0MsMENBQUUsQ0FBQyxPQUFPLEVBQUVhLFFBQVEsQ0FBQztBQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0QztBQUN1QjtBQUNwQjtBQUVTO0FBRXpDLFNBQVNNLFFBQVFDLEdBQVUsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVuRSw4QkFBOEI7SUFDOUIsSUFBSTJJLGNBQWNxSywwREFBY0E7SUFFaEMsSUFBR3pULEtBQUtvQyxLQUFLLEtBQUsxQyxXQUFXO1FBQ3pCLE1BQU1PLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLO1FBQzlCRixvREFBWUEsQ0FBQ0wsU0FBU0QsS0FBS29DLEtBQUssRUFBRTNCO1FBQ2xDMkksY0FBY3pHLCtDQUFVQSxDQUFDMUM7SUFDN0I7SUFFQUksNENBQU9BLENBQUNHLEtBQUs0UixzREFBTUE7SUFDbkJ4UCxrREFBYUEsQ0FBQ3BDLEtBQUs0STtJQUVuQixNQUFNbEQsT0FBTyxrREFBTyxDQUFDdkQsK0NBQVVBLENBQUNsQyxRQUFRMkssbUJBQW1CLEVBQUcsQ0FBY2pGLFFBQVE7SUFDcEYsSUFBSUQsS0FBSzRFLFdBQVcsS0FBS3BMLFdBQ3JCd0csS0FBSzRFLFdBQVcsR0FBRyxJQUFNMUI7QUFDakM7QUFFQTdJLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QlE7QUFDVztBQUUzQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQztJQUVGLE1BQU1lLGFBQWFILDRDQUFPQSxDQUFDQztJQUMzQixNQUFNQyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFFOUIsSUFBSUUsYUFBYSxHQUNiZCwwQ0FBRSxDQUFDLEVBQUVhLFFBQVEsRUFBRSxFQUFFQSxVQUFRLEVBQUUsQ0FBQztJQUVoQyxJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVksWUFBWVosS0FBRyxFQUM5QkYsMENBQUUsQ0FBQyxFQUFFLEVBQUVFLElBQUVXLFFBQVEsRUFBRSxFQUFFWCxJQUFFLElBQUVXLFFBQVEsQ0FBQztJQUV0Q2QseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJrRDtBQUNWO0FBQ087QUFFaEMsU0FBU29CLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUsyUiw0REFBWUE7SUFDekIsTUFBTWxTLFVBQVVHLDZDQUFRQSxDQUFDSSxLQUFLUixLQUFLeUosSUFBSSxDQUFDbkwsTUFBTSxHQUFHO0lBRWpELElBQUksSUFBSWdCLElBQUksR0FBR0EsSUFBSVUsS0FBS3lKLElBQUksQ0FBQ25MLE1BQU0sRUFBRSxFQUFFZ0IsRUFBRztRQUN0Q2dCLG9EQUFZQSxDQUFDLElBQUVoQixJQUFFVyxTQUFTRCxLQUFPeUosSUFBSSxDQUFDbkssRUFBRSxFQUFFbUI7UUFDMUNILG9EQUFZQSxDQUFDLElBQUVoQixJQUFFLElBQUVXLFNBQVNELEtBQUsySixNQUFNLENBQUNySyxFQUFFLEVBQUVtQjtJQUNoRDtBQUNKO0FBRUFGLFFBQVFHLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmSTtBQUNlO0FBRTNCLFNBQVNkLE9BQU9JLElBQVk7SUFFdkNiLHlDQUFDQSxDQUFDO0lBRUYsTUFBTWUsYUFBYUgsNENBQU9BLENBQUNDO0lBQzNCLE1BQU1DLFVBQWFILCtDQUFVQSxDQUFDRTtJQUU5QixJQUFJRSxhQUFhLEdBQ2JmLHlDQUFDQSxDQUFDYztJQUVOLElBQUksSUFBSVgsSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCSCx5Q0FBQ0EsQ0FBQyxNQUFNRyxJQUFJVztJQUVoQmQseUNBQUNBLENBQUM7QUFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJrRDtBQUNWO0FBQ087QUFFaEMsU0FBU29CLFFBQVFDLEdBQVcsRUFBRVIsSUFBUyxFQUFFUyxPQUFnQjtJQUVwRUosNENBQU9BLENBQUNHLEtBQUswUiw0REFBWUE7SUFDekIsTUFBTWhTLGFBQWFGLEtBQUt1WSxJQUFJLENBQUNqYSxNQUFNO0lBQ25DLE1BQU0yQixVQUFVRyw2Q0FBUUEsQ0FBQ0ksS0FBS047SUFFOUIsSUFBSSxJQUFJWixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JnQixvREFBWUEsQ0FBQ2hCLElBQUlXLFNBQVNELEtBQUt1WSxJQUFJLENBQUNqWixFQUFFLEVBQUVtQjtBQUNoRDtBQUVBRixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEk7QUFDZTtBQUUzQixTQUFTZCxPQUFPSSxJQUFZO0lBRXZDYix5Q0FBQ0EsQ0FBQztJQUVGLE1BQU1lLGFBQWFILDRDQUFPQSxDQUFDQztJQUMzQixNQUFNQyxVQUFhSCwrQ0FBVUEsQ0FBQ0U7SUFFOUIsSUFBSUUsYUFBYSxHQUNiZix5Q0FBQ0EsQ0FBQ2M7SUFFTixJQUFJLElBQUlYLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QkgseUNBQUNBLENBQUMsTUFBTUcsSUFBSVc7SUFFaEJkLHlDQUFDQSxDQUFDO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCbUQ7QUFDWDtBQUNPO0FBRWhDLFNBQVNvQixRQUFRQyxHQUFXLEVBQUVSLElBQVMsRUFBRVMsT0FBZ0I7SUFFcEVKLDRDQUFPQSxDQUFDRyxLQUFLeVIsNkRBQWFBO0lBQzFCLE1BQU0vUixhQUFhRixLQUFLdVksSUFBSSxDQUFDamEsTUFBTTtJQUNuQyxNQUFNMkIsVUFBVUcsNkNBQVFBLENBQUNJLEtBQUtOO0lBRTlCLElBQUksSUFBSVosSUFBSSxHQUFHQSxJQUFJWSxZQUFZLEVBQUVaLEVBQzdCZ0Isb0RBQVlBLENBQUNoQixJQUFJVyxTQUFTRCxLQUFLdVksSUFBSSxDQUFDalosRUFBRSxFQUFFbUI7QUFFaEQ7QUFFQUYsUUFBUUcsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZJO0FBQ0U7QUFFZCxTQUFTZCxPQUFPSSxJQUFZO0lBQ3ZDYix5Q0FBQ0EsQ0FBRXdCLHVDQUFNLENBQUNYLEtBQUs7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSDRDO0FBQ1M7QUFFckQsU0FBU3dZLFFBQVFwVSxDQUFVO0lBQ3ZCLGdHQUFnRztJQUNoRyxPQUFPc0YsT0FBTytPLHlCQUF5QixDQUFDclUsSUFBSXNVLFdBQVdDLGFBQWE7QUFDeEU7QUFFZSxTQUFTcFksUUFBUUMsR0FBVyxFQUFFUixJQUFTLEVBQUVTLE9BQWdCO0lBRXBFLElBQUkySSxjQUFjO0lBQ2xCLElBQUloSCxRQUFRcEMsS0FBSzRCLEVBQUU7SUFFbkIsSUFBSVEsVUFBVSxRQUNWQSxRQUFRLFFBQVEsMkRBQTJEO1NBQzFFLElBQUlBLFNBQVMzQixRQUFRUyxhQUFhLEVBQ25Da0ksY0FBYzNJLFFBQVFTLGFBQWEsQ0FBQ2tCLE1BQU07SUFDOUM7Ozs7Ozs7O0lBUUEsR0FFQS9CLDRDQUFPQSxDQUFDRyxLQUFLd0Msc0RBQU1BO0lBQ25CSixrREFBYUEsQ0FBQ3BDLEtBQUs0STtJQUVuQnpJLHVDQUFNLENBQUNILElBQUksR0FBRzRCO0FBQ2xCO0FBR0E3QixRQUFRRyxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ3FCO0FBRTdCLE1BQU1tWSxxQkFBcUJELDJEQUFTQTtBQUVuRCxFQUdBLGdCQUFnQjtDQUNaLFVBQVU7Q0FDVixXQUFXO0NBQ1AsV0FBVztDQUNYLHdDQUF3QztDQUN4QyxrQkFBa0I7Q0FDbEIsU0FBUztDQUNMLHVCQUF1QjtDQUN2QixjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FDZmE7QUFFeEIsTUFBTUUsdUJBQXVCRCxrREFBWUE7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pvQztBQUNnQjtBQUNGO0FBR2xELE1BQU10RixVQUFVO0lBQ2YsVUFBVXdGLGtEQUFTQTtJQUNuQixlQUFlQyxrRUFBU0E7SUFDeEIsYUFBYUMsZ0VBQVNBO0FBQ3ZCO0FBRUEsaUVBQWUxRixPQUFPQSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNYUixNQUFNcUY7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZPLE1BQU1qYixhQUFldWIsYUFBYTtBQUN6QyxNQUFNQyxrQkFBa0I7QUFFakIsTUFBTXBiLFlBQVksRUFBRTtBQUNwQixNQUFNRixXQUFZLEVBQUU7QUFDcEIsTUFBTUQsV0FBWSxFQUFFO0FBQ3BCLE1BQU1FLFdBQVksRUFBRTtBQUNwQixNQUFNb0osZ0JBQWdCdEosV0FBV0csVUFBVTtBQUMzQyxNQUFNa0osZUFBZ0JySixXQUFXQyxTQUFTO0FBQzFDLE1BQU11SixnQkFBZ0J0SixXQUFXQyxVQUFVO0FBQzNDLE1BQU1vSixlQUFnQnJKLFdBQVdELFNBQVM7QUFFMUMsTUFBTXdKLFVBQVUsSUFBSTFKLFdBQVcsSUFBRXdiLGlCQUFpQjtBQUNsRCxNQUFNbmIsVUFBVSxJQUFJTCxXQUFXLElBQUV3YixpQkFBaUI7QUFFekQsZ0NBQWdDO0FBQ3pCLE1BQU14WSxTQUFTLElBQUluQixRQUFhO0FBRXZDLElBQUk0WixtQkFBbUI7QUFFaEIsU0FBU2haLFNBQVNpWixNQUFjLEVBQUV0WixPQUFlO0lBRXBELE1BQU1KLFNBQVMwWixTQUFTQztJQUV4QkMsUUFBUSxDQUFDNVosU0FBUzZaLG9CQUFvQixHQUFHelo7SUFDekMsTUFBTTZCLEtBQUsyWCxRQUFRLENBQUM1WixTQUFTOFosdUJBQXVCLEdBQUdMO0lBQ3ZEQSxvQkFBb0JyWjtJQUVwQixPQUFPNkI7QUFDWDtBQUVPLFNBQVM4WDtJQUNaLE9BQU9OO0FBQ1g7QUFFTyxTQUFTTyxlQUFlQyxFQUFVO0lBQ3JDUixvQkFBb0JRO0FBQ3hCO0FBRWUsU0FBU0M7SUFDcEJsWixPQUFPckMsTUFBTSxHQUFHO0lBQ2hCOGEsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYlUsT0FBT0MsTUFBTSxDQUFFO0lBQ2YsYUFBYTtJQUNiRCxPQUFPQyxNQUFNLENBQUVDO0FBQ25CO0FBRU8sTUFBTUMsa0JBQTZCLEVBQUUsQ0FBQyxnQkFBZ0I7QUFDdEQsTUFBTUMsNkJBQTZCLEVBQUU7QUFDckMsTUFBTVQseUJBQTZCLEVBQUUsQ0FBQyxrQkFBa0I7QUFDeEQsTUFBTUQsc0JBQTZCLEVBQUUsQ0FBQyw2QkFBNkI7QUFDbkUsTUFBTVcsc0JBQTZCLEVBQUUsQ0FBQyxlQUFlO0FBQ3JELE1BQU1iLGVBQTZCLEVBQUU7QUFFNUMsTUFBTVUsY0FBY1YsZUFBZSxJQUFJSDtBQUN2QyxhQUFhO0FBQ2IsTUFBTVcsU0FBUyxJQUFJTSxZQUFZSixhQUFhO0lBQUNLLGVBQWVMO0FBQVc7QUFFaEUsTUFBTVQsV0FBVyxJQUFJNWIsV0FBV21jLFFBQVE7QUFFeEMsU0FBUzdiLEtBQUsrQixJQUFZO0lBQzdCLE9BQU91WixRQUFRLENBQUN2WixPQUFPc1osZUFBZVcsZ0JBQWdCO0FBQzFEO0FBQ08sU0FBU2xhLFFBQVFzWixNQUFjO0lBQ2xDLE9BQU9FLFFBQVEsQ0FBQ0YsU0FBU0MsZUFBZUUsb0JBQW9CO0FBQ2hFO0FBQ08sU0FBUzFaLFdBQVd1WixNQUFjO0lBQ3JDLE9BQU9FLFFBQVEsQ0FBQ0YsU0FBU0MsZUFBZUcsdUJBQXVCO0FBQ25FO0FBQ08sU0FBUzlXLFdBQVczQyxJQUFZO0lBQ25DLE9BQU91WixRQUFRLENBQUN2WixPQUFPc1osZUFBZWEsb0JBQW9CO0FBQzlEO0FBQ08sU0FBU0csYUFBYXRhLElBQVk7SUFDckMsT0FBT3VaLFFBQVEsQ0FBQ3ZaLE9BQU9zWixlQUFlWSwyQkFBMkI7QUFDckU7QUFFTyxTQUFTN1osUUFBUUwsSUFBWSxFQUFFb0MsS0FBYTtJQUMvQyxPQUFPbVgsUUFBUSxDQUFDdlosT0FBT3NaLGVBQWVXLGdCQUFnQixHQUFHN1g7QUFDN0Q7QUFDTyxTQUFTUSxjQUFjNUMsSUFBWSxFQUFFb0MsS0FBYTtJQUNyRG1YLFFBQVEsQ0FBQ3ZaLE9BQU9zWixlQUFlYSxvQkFBb0IsR0FBRy9YO0FBQzFEO0FBQ08sU0FBU21ZLGdCQUFnQnZhLElBQVksRUFBRW9DLEtBQWE7SUFDdkRtWCxRQUFRLENBQUN2WixPQUFPc1osZUFBZVksMkJBQTJCLEdBQUc5WDtBQUNqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGQSxtQ0FBbUM7QUFHZ0I7QUFFVztBQUNxSztBQUNqSztBQU8zRCxTQUFTb1ksVUFBVTVZLEVBQVU7SUFDaENpRCxRQUFRQyxJQUFJLENBQUM7UUFDVDdHLE1BQVdzYix5Q0FBUSxDQUFDRCw2Q0FBWUEsR0FBQzFYLEtBQUdxWSxnREFBZUEsQ0FBQztRQUNwRHBQLFVBQVdILGtEQUFNLENBQUM2Tyx5Q0FBUSxDQUFDRCw2Q0FBWUEsR0FBQzFYLEtBQUd1WSxvREFBbUJBLENBQUMsQ0FBQztRQUNoRS9YLE9BQVd6Qix1Q0FBTSxDQUFDaUIsR0FBRztJQUN6QjtBQUNKO0FBRU8sU0FBU2tGLFlBQVlsRixFQUFVLEVBQUU2WSxZQUFpQjtJQUVyRCxNQUFNOWEsU0FBUyxJQUFFaUM7SUFDakJ5Rix3Q0FBTyxDQUFFMUgsU0FBU3VILDhDQUFhQSxDQUFFLEdBQUd1VCxhQUFhdFIsTUFBTTtJQUN2RDlCLHdDQUFPLENBQUUxSCxTQUFTc0gsNkNBQVlBLENBQUcsR0FBR3dULGFBQWF4UixVQUFVO0lBQzNENUIsd0NBQU8sQ0FBRTFILFNBQVN5SCw4Q0FBYUEsQ0FBRSxHQUFHcVQsYUFBYTlPLFVBQVU7SUFDM0R0RSx3Q0FBTyxDQUFFMUgsU0FBU3dILDZDQUFZQSxDQUFHLEdBQUdzVCxhQUFhN08sY0FBYztBQUNuRTtBQUVPLFNBQVM4TyxzQkFBc0I5WSxFQUFVLEVBQUU2WSxZQUFpQjtJQUUvRCxNQUFNOWEsU0FBUyxJQUFFaUM7SUFFakIsTUFBTUcsTUFBTTBZLFlBQVksQ0FBQyxFQUFFO0lBQzNCLE1BQU14WSxNQUFNd1ksWUFBWSxDQUFDQSxhQUFhbmMsTUFBTSxHQUFDLEVBQUU7SUFFL0MrSSx3Q0FBTyxDQUFFMUgsU0FBU3VILDhDQUFhQSxDQUFFLEdBQUduRixJQUFJb0gsTUFBTTtJQUM5QzlCLHdDQUFPLENBQUUxSCxTQUFTc0gsNkNBQVlBLENBQUcsR0FBR2xGLElBQUlrSCxVQUFVO0lBQ2xENUIsd0NBQU8sQ0FBRTFILFNBQVN5SCw4Q0FBYUEsQ0FBRSxHQUFHbkYsSUFBSTBKLFVBQVU7SUFDbER0RSx3Q0FBTyxDQUFFMUgsU0FBU3dILDZDQUFZQSxDQUFHLEdBQUdsRixJQUFJMkosY0FBYztBQUMxRDtBQUdPLFNBQVM3RSxvQkFBcUI0VCxHQUFXLEVBQUVDLE9BQWUsRUFBRUMsT0FBZTtJQUU5RSxNQUFNQyxhQUFhLElBQUVIO0lBQ3JCLE1BQU1JLGFBQWEsSUFBRUg7SUFDckIsTUFBTUksYUFBYSxJQUFFSCxVQUFVO0lBRS9CeFQsd0NBQU8sQ0FBRXlULGFBQWE1VCw4Q0FBYUEsQ0FBRSxHQUFHRyx3Q0FBTyxDQUFFMFQsYUFBYWhkLDBDQUFTQSxDQUFFO0lBQ3pFc0osd0NBQU8sQ0FBRXlULGFBQWE3VCw2Q0FBWUEsQ0FBRyxHQUFHSSx3Q0FBTyxDQUFFMFQsYUFBYWxkLHlDQUFRQSxDQUFHO0lBRXpFd0osd0NBQU8sQ0FBRXlULGFBQWExVCw4Q0FBYUEsQ0FBRSxHQUFHQyx3Q0FBTyxDQUFFMlQsYUFBYWpkLDBDQUFTQSxDQUFFO0lBQ3pFc0osd0NBQU8sQ0FBRXlULGFBQWEzVCw2Q0FBWUEsQ0FBRyxHQUFHRSx3Q0FBTyxDQUFFMlQsYUFBYW5kLHlDQUFRQSxDQUFHO0FBQzdFO0FBRUEsTUFBTW9kLFVBQW9DLENBQUM7QUFFM0MsSUFBSSxJQUFJM2IsSUFBSSxHQUFJQSxJQUFJZ1UsNERBQVdBLENBQUNoVixNQUFNLEVBQUUsRUFBRWdCLEVBQUc7SUFFekMsTUFBTWlOLFNBQVMrRyw0REFBVyxDQUFDaFUsRUFBRTtJQUU3QixJQUFJZ04sUUFBUTtRQUFDO0tBQU87SUFDcEIsSUFBSSxrQkFBa0JDLFFBQVE7UUFFMUIsSUFBSS9NLE1BQU1DLE9BQU8sQ0FBQzhNLE9BQU83TCxZQUFZLEdBQ2pDNEwsUUFBUUMsT0FBTzdMLFlBQVk7YUFFM0I0TCxRQUFRO1lBQUNDLE9BQU83TCxZQUFZO1NBQVc7SUFDL0M7SUFFQSxLQUFJLE1BQU1TLFFBQVFtTCxNQUNkLENBQUMyTyxPQUFPLENBQUM5WixLQUFLLEtBQUssRUFBRSxFQUFFMEssSUFBSSxDQUFDdk07QUFDcEM7QUFFTyxTQUFTNGIsT0FBT0MsSUFBWSxFQUFFM2MsUUFBZ0I7SUFFakQsTUFBTTRjLFNBQVMsSUFBSUMsR0FBR0MsTUFBTSxDQUFDSCxNQUFNM2MsVUFBVTtJQUNoRCxNQUFNK2MsT0FBU0YsR0FBR0csUUFBUSxDQUFDQyxVQUFVLENBQUNMO0lBQ25DLDJCQUEyQjtJQUUzQixNQUFNN1gsUUFBUW1ZLFlBQVlIO0lBRTdCLE9BQU87UUFDQWhZO1FBQ0EvRTtJQUNKO0FBQ0o7QUFFTyxTQUFTa2QsWUFBWTdiLEdBQVE7SUFFaENnYSwrQ0FBU0E7SUFFVDdZLGFBQWEwWSxrREFBYUEsSUFBSTdaLElBQUlnQixJQUFJLEVBQUUsSUFBSUU7SUFFNUMsT0FBT3dZLHlDQUFRQTtBQUVmOzs7Ozs7O2tDQU84QixHQUNsQztBQUdBLFNBQVNvQyxZQUFZbEIsWUFBaUI7SUFFbEMsaUJBQWlCO0lBQ2pCLElBQUlqYixNQUFNQyxPQUFPLENBQUNnYixlQUNkLE9BQU87SUFFWCxPQUFPQSxhQUFhaFosV0FBVyxDQUFDQyxLQUFLO0FBQ3pDO0FBRU8sU0FBU3lWLGFBQWFsQixDQUFTLEVBQUVDLENBQVM7SUFFN0MsTUFBTTBGLEtBQUt0Qyw2Q0FBWUEsR0FBR3JEO0lBQzFCLE1BQU00RixLQUFLdkMsNkNBQVlBLEdBQUdwRDtJQUUxQixJQUFJNEY7SUFDSixJQUFJLElBQUl4YyxJQUFJLEdBQUdBLElBQUlnYSw2Q0FBWUEsRUFBRSxFQUFFaGEsRUFBRztRQUNsQ3djLElBQUl2Qyx5Q0FBUSxDQUFDcUMsS0FBR3RjLEVBQUU7UUFDbEJpYSx5Q0FBUSxDQUFDcUMsS0FBR3RjLEVBQUUsR0FBR2lhLHlDQUFRLENBQUNzQyxLQUFHdmMsRUFBRTtRQUMvQmlhLHlDQUFRLENBQUNzQyxLQUFHdmMsRUFBRSxHQUFHd2M7SUFDckI7SUFFQSxNQUFNQyxLQUFLLElBQUU5RjtJQUNiLE1BQU0rRixLQUFLLElBQUU5RjtJQUNiLElBQUksSUFBSTVXLElBQUksR0FBR0EsSUFBSSxHQUFHLEVBQUVBLEVBQUc7UUFDdkJ3YyxJQUFJelUsd0NBQU8sQ0FBQzBVLEtBQUd6YyxFQUFFO1FBQ2pCK0gsd0NBQU8sQ0FBQzBVLEtBQUd6YyxFQUFFLEdBQUcrSCx3Q0FBTyxDQUFDMlUsS0FBRzFjLEVBQUU7UUFDN0IrSCx3Q0FBTyxDQUFDMlUsS0FBRzFjLEVBQUUsR0FBR3djO0lBQ3BCO0lBRUFBLElBQUluYix1Q0FBTSxDQUFDc1YsRUFBRTtJQUNidFYsdUNBQU0sQ0FBQ3NWLEVBQUUsR0FBR3RWLHVDQUFNLENBQUN1VixFQUFFO0lBQ3JCdlYsdUNBQU0sQ0FBQ3VWLEVBQUUsR0FBRzRGO0FBRWhCO0FBRUEsTUFBTWpiLE9BQU9vYSxRQUFRZ0IsSUFBSSxDQUFDLEVBQUU7QUFFckIsU0FBU2piLGFBQWFZLEVBQVUsRUFBRTZZLFlBQWlCLEVBQUVoYSxPQUFnQjtJQUV4RTZTLDREQUFXLENBQUN6UyxLQUFLLENBQUtlLElBQUk2WSxjQUFjaGE7SUFDeENpYSxzQkFBc0I5WSxJQUFJNlk7QUFDOUI7QUFFTyxTQUFTbmEsYUFBYXNCLEVBQVUsRUFBRTZZLFlBQWlCLEVBQUVoYSxPQUFnQjtJQUV4RSxJQUFJVSxPQUFPd2EsWUFBWWxCO0lBRXZCLElBQUd0WixTQUFTLFFBQVE7UUFDaEJzWixlQUFlQSxhQUFhclksS0FBSztRQUNqQ2pCLE9BQU93YSxZQUFZbEI7SUFDdkI7SUFFQSxNQUFNeUIsYUFBYWpCLE9BQU8sQ0FBQzlaLEtBQUs7SUFFaEMsSUFBSSthLGVBQWV4YyxXQUFZO1FBQzNCbUYsUUFBUUMsSUFBSSxDQUFDLDBCQUEwQjNEO1FBQ3ZDMEQsUUFBUUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFMlYsYUFBYXRSLE1BQU0sQ0FBQyxDQUFDLEVBQUVzUixhQUFheFIsVUFBVSxDQUFDLENBQUM7UUFDbkVwRSxRQUFRTSxHQUFHLENBQUVzVjtRQUNidFosT0FBTztJQUNYO0lBRUEsbURBQW1EO0lBQ25ELElBQUksSUFBSTdCLElBQUksR0FBR0EsSUFBSTRjLFdBQVc1ZCxNQUFNLEVBQUUsRUFBRWdCLEVBQ3BDLElBQUlnVSw0REFBVyxDQUFDNEksVUFBVSxDQUFDNWMsRUFBRSxDQUFDLENBQUNzQyxJQUFJNlksY0FBY2hhLGFBQWEsT0FBTztRQUVqRXFHLFlBQVlsRixJQUFJNlk7UUFFaEI7SUFDSjtJQUVKNVYsUUFBUXNYLEtBQUssQ0FBQzFCO0lBQ2QsTUFBTSxJQUFJcFosTUFBTSxDQUFDLGlCQUFpQixFQUFFRixLQUFLLElBQUksRUFBRXNaLGFBQWF0UixNQUFNLENBQUMsQ0FBQyxFQUFFc1IsYUFBYXhSLFVBQVUsQ0FBQyxDQUFDO0FBQ25HO0FBRU8sTUFBTWxJO0lBQ1RVLFlBQVl4RCxPQUEwQixHQUFHLEVBQUVtZSxpQkFBMEJDLFdBQVcsQ0FBRTtRQUM5RSxJQUFJLENBQUNwZSxJQUFJLEdBQUdBLE1BQU0sY0FBYztRQUNoQyxJQUFJLENBQUNpRCxhQUFhLEdBQUc7WUFBQyxHQUFHa2IsZUFBZWxiLGFBQWE7UUFBQTtJQUN6RDtJQUVBQSxjQUFzQztJQUN0Q2tLLG9CQUE2QjtJQUU3Qm5OLEtBQUs7QUFDVDtBQUVBLE1BQU1xZSxXQUFXLENBQUMsRUFBRSwyQkFBMkI7QUFFL0MsZUFBZTtBQUNmLG9CQUFvQjtBQUNwQixvREFBb0Q7QUFDcEQsU0FBU0MsY0FBY3BiLElBQVksRUFBRTJKLFdBQTRCO0lBQzdELE1BQU0wUixTQUFTLENBQUMsRUFBRSxFQUFFcmIsS0FBSyxFQUFFLENBQUM7SUFDNUIsT0FBTztRQUNId1MsV0FBVzJJO1FBQ1gvUSxVQUFXcEs7UUFDWGdGLFVBQVc7WUFDUCx3QkFBd0I7WUFDeEIyRSxhQUFpQkE7WUFDakIsZ0JBQWdCO1lBQ2hCTixpQkFBaUIsQ0FBQ2lTO2dCQUNkLE1BQU1wRixPQUFTdlgsK0NBQVVBLENBQUMyYyxRQUFNO2dCQUNoQyxNQUFNckgsU0FBUzFLLGtEQUFNLENBQUMvSCwrQ0FBVUEsQ0FBQzBVLE1BQU0sQ0FBRW1GLE9BQU87Z0JBQ2hELE9BQU9wSCxPQUFPNUssZUFBZSxDQUFFaVM7WUFDbkM7UUFDSjtJQUNKO0FBQ0o7QUFFQSxzQkFBc0I7QUFDdEIsTUFBTUMsTUFBTTdJLHdEQUFRQSxDQUFDLE9BQU8wSSxjQUFjLE9BQU96RywyREFBT0E7QUFFeEQsbUJBQW1CO0FBQ25CLGFBQWE7QUFDYixNQUFNdUcsY0FBdUI7SUFDekJwZSxNQUFNO0lBQ05pRCxlQUFlO1FBQ1h5YixLQUFPMWIsMERBQVVBLENBQUM7UUFDbEI1QixLQUFPNEIsMERBQVVBLENBQUM7UUFDbEIyYixPQUFPM2IsMERBQVVBLENBQUM7UUFDbEJ5YjtJQUdKO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxT0EsY0FBYztBQUlrQztBQVF6QyxTQUFTeEIsT0FBT0MsSUFBWSxFQUFFM2MsUUFBZ0I7SUFFakQsTUFBTStFLFFBQVEsSUFBSS9EO0lBRWxCLElBQUlzZCxTQUFTO1FBQ1RuZCxRQUFRO1FBQ1I2RCxNQUFNO1FBQ051WixhQUFjO0lBQ2xCO0lBRUEsSUFBSUM7SUFDSixHQUFHO1FBQ0N6WixNQUFNc0ksSUFBSSxDQUFFb1IsZ0JBQWdCOUIsTUFBTTJCO1FBQ2xDRSxPQUFPN0IsSUFBSSxDQUFDMkIsT0FBT25kLE1BQU0sQ0FBQztRQUMxQixNQUFPcWQsU0FBUyxLQUFPO1lBQ25CQSxPQUFPN0IsSUFBSSxDQUFDLEVBQUUyQixPQUFPbmQsTUFBTSxDQUFDO1lBQzVCLEVBQUVtZCxPQUFPdFosSUFBSTtRQUNqQjtRQUVBc1osT0FBT0MsV0FBVyxHQUFHRCxPQUFPbmQsTUFBTTtJQUV0QyxRQUFTcWQsU0FBU3RkLFVBQVk7SUFFOUIsdURBQXVEO0lBQzFELDhDQUE4QztJQUMzQywyQkFBMkI7SUFDOUIsT0FBTztRQUNBNkQ7UUFDQS9FO0lBQ0o7QUFDSjtBQUUwRDtBQUUxRCxTQUFTMmUsWUFBWWhDLElBQVksRUFBRTJCLE1BQWM7SUFFN0MsTUFBTU0sWUFBWU4sT0FBT25kLE1BQU07SUFFL0IsSUFBSTBkLE1BQU1sQyxJQUFJLENBQUMyQixPQUFPbmQsTUFBTSxDQUFDO0lBQzdCLE1BQU8wZCxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLElBQzlGQSxNQUFPbEMsSUFBSSxDQUFDLEVBQUUyQixPQUFPbmQsTUFBTSxDQUFDO0lBRWhDLE1BQU0yZCxTQUFTbkMsS0FBSzVXLEtBQUssQ0FBQzZZLFdBQVdOLE9BQU9uZCxNQUFNO0lBRWxELHFCQUFxQjtJQUVyQixPQUFPO1FBQ0gxQixNQUFVO1FBQ1ZtRSxPQUFVa2I7UUFDVkMsVUFBVSxFQUFFO1FBQ1puVSxhQUFhO1FBRWJvVSxNQUFNTixtRUFBY0E7SUFDeEI7QUFDSjtBQUVxRTtBQUVyRSxTQUFTUSxZQUFZdkMsSUFBWSxFQUFFMkIsTUFBYztJQUU3QyxNQUFNTSxZQUFZTixPQUFPbmQsTUFBTTtJQUUvQixlQUFlO0lBRWYsSUFBSTBkLE1BQU1sQyxJQUFJLENBQUMyQixPQUFPbmQsTUFBTSxDQUFDO0lBQzdCLE1BQU8wZCxPQUFPLE9BQU9BLE9BQU8sSUFDeEJBLE1BQU9sQyxJQUFJLENBQUMsRUFBRTJCLE9BQU9uZCxNQUFNLENBQUM7SUFFaEMsT0FBTztRQUNIMUIsTUFBVTtRQUNWbUUsT0FBVStZLEtBQUs1VyxLQUFLLENBQUM2WSxXQUFXTixPQUFPbmQsTUFBTTtRQUM3QzRkLFVBQVUsRUFBRTtRQUNablUsYUFBYTtRQUVib1UsTUFBTUMseUVBQW1CQTtJQUM3QjtBQUNKO0FBRXFFO0FBRXJFLFNBQVNHLFlBQVl6QyxJQUFZLEVBQUUyQixNQUFjO0lBRTdDLE1BQU1NLFlBQVlOLE9BQU9uZCxNQUFNO0lBRS9CLElBQUkwZCxNQUFNbEMsSUFBSSxDQUFDLEVBQUUyQixPQUFPbmQsTUFBTSxDQUFDO0lBQy9CLE1BQU8wZCxRQUFRM2QsYUFBYTJkLFFBQVEsT0FBT2xDLElBQUksQ0FBQzJCLE9BQU9uZCxNQUFNLEdBQUMsRUFBRSxLQUFLLEtBQ2pFMGQsTUFBTWxDLElBQUksQ0FBQyxFQUFFMkIsT0FBT25kLE1BQU0sQ0FBQztJQUUvQixFQUFFbWQsT0FBT25kLE1BQU07SUFFZixPQUFPO1FBQ0gxQixNQUFVO1FBQ1ZtRSxPQUFVK1ksS0FBSzVXLEtBQUssQ0FBQzZZLFdBQVdOLE9BQU9uZCxNQUFNO1FBQzdDNGQsVUFBVSxFQUFFO1FBQ1puVSxhQUFhO1FBRWJvVSxNQUFNRyx5RUFBbUJBO0lBQzdCO0FBQ0o7QUFFQSxTQUFTVixnQkFBZ0I5QixJQUFZLEVBQUUyQixNQUFjO0lBQ2pELElBQUlFLE9BQU83QixJQUFJLENBQUMyQixPQUFPbmQsTUFBTSxDQUFDO0lBRTlCLElBQUkwWCxPQUFPd0csV0FBVzFDLE1BQU0yQjtJQUM1QkUsT0FBTzdCLElBQUksQ0FBQzJCLE9BQU9uZCxNQUFNLENBQUM7SUFDMUIsSUFBSXFkLFNBQVMsTUFDVCxPQUFPM0Y7SUFFWCxJQUFJTCxLQUFLNkcsV0FBVzFDLE1BQU0yQjtJQUMxQjlGLEdBQUl1RyxRQUFRLENBQUMsRUFBRSxHQUFHbEc7SUFDbEJMLEdBQUc4RyxNQUFNLENBQUNDLEtBQUssR0FBRzFHLEtBQUt5RyxNQUFNLENBQUNDLEtBQUs7SUFFbkMsSUFBSXBVLFNBQVM7UUFBQ3FOO1FBQUk2RyxXQUFXMUMsTUFBTTJCO0tBQVE7SUFFM0NFLE9BQU83QixJQUFJLENBQUMyQixPQUFPbmQsTUFBTSxDQUFDO0lBQzFCLE1BQU9xZCxTQUFTLEtBQU87UUFFbkIsSUFBSWdCLE1BQVFILFdBQVcxQyxNQUFNMkI7UUFDN0IsSUFBSXhGLFFBQVF1RyxXQUFXMUMsTUFBTTJCO1FBRTdCLElBQUltQixNQUFPdFUsTUFBTSxDQUFDQSxPQUFPckwsTUFBTSxHQUFDLEVBQUU7UUFDbEMsSUFBSStZLE9BQU8xTixNQUFNLENBQUNBLE9BQU9yTCxNQUFNLEdBQUMsRUFBRTtRQUVsQyw2QkFBNkI7UUFDN0IsVUFBVTtRQUVWLFFBQVE7UUFDUjJmLElBQUtWLFFBQVEsQ0FBQyxFQUFFLEdBQUdsRztRQUNuQjRHLElBQUtILE1BQU0sQ0FBQzdiLEdBQUcsR0FBSW9WLEtBQUt5RyxNQUFNLENBQUM3YixHQUFHO1FBRWxDLE9BQU87UUFDUCtiLElBQUtULFFBQVEsQ0FBQyxFQUFFLEdBQUdVO1FBQ25CRCxJQUFJRixNQUFNLENBQUNDLEtBQUssR0FBR0UsSUFBSUgsTUFBTSxDQUFDQyxLQUFLO1FBRW5DcFUsTUFBTSxDQUFDQSxPQUFPckwsTUFBTSxHQUFDLEVBQUUsR0FBRzBmO1FBQzFCclUsTUFBTSxDQUFDQSxPQUFPckwsTUFBTSxHQUFDLEVBQUUsR0FBR2daO1FBRTFCMEYsT0FBTzdCLElBQUksQ0FBQzJCLE9BQU9uZCxNQUFNLENBQUM7SUFDOUI7SUFFQWdLLE1BQU0sQ0FBQyxFQUFFLENBQUU0VCxRQUFRLENBQUMsRUFBRSxHQUFHNVQsTUFBTSxDQUFDLEVBQUU7SUFDbENBLE1BQU0sQ0FBQyxFQUFFLENBQUVtVSxNQUFNLENBQUM3YixHQUFHLEdBQUkwSCxNQUFNLENBQUMsRUFBRSxDQUFDbVUsTUFBTSxDQUFDN2IsR0FBRztJQUU3QyxPQUFPMEgsTUFBTSxDQUFDLEVBQUU7QUFDcEI7QUFFQSxTQUFTdVUsY0FBYy9DLElBQVksRUFBRTJCLE1BQWM7SUFFL0MsTUFBTU0sWUFBWU4sT0FBT25kLE1BQU07SUFFL0IsSUFBSXFkLE9BQU83QixJQUFJLENBQUMyQixPQUFPbmQsTUFBTSxHQUFHO0lBQ2hDOztvQ0FFZ0MsR0FFaEMsT0FBTztRQUNIMUIsTUFBVSxlQUFlK2U7UUFDekI1YSxPQUFVO1FBQ1ZtYixVQUFVO1lBQUM3ZDtZQUFXQTtTQUFVO1FBQ2hDMEosYUFBYTtRQUVib1UsTUFBTVgsMkRBQVksQ0FBQyxlQUFlRyxLQUFLLENBQUN0ZixNQUFNO0lBQ2xEO0FBQ0o7QUFFQSxTQUFTbWdCLFdBQVcxQyxJQUFZLEVBQUUyQixNQUFjO0lBRTVDLG9CQUFvQjtJQUNwQixJQUFJRSxPQUFPN0IsSUFBSSxDQUFDMkIsT0FBT25kLE1BQU0sQ0FBQztJQUM5QixNQUFPcWQsU0FBUyxPQUFPQSxTQUFTLEtBQzVCQSxPQUFRN0IsSUFBSSxDQUFDLEVBQUUyQixPQUFPbmQsTUFBTSxDQUFDO0lBRWpDLGNBQWM7SUFDZCxJQUFJcWQsU0FBU3RkLFdBQ1QsT0FBTztJQUVYLE1BQU1xZSxRQUFRO1FBQ1Z2YSxNQUFNc1osT0FBT3RaLElBQUk7UUFDakJDLEtBQU1xWixPQUFPbmQsTUFBTSxHQUFHbWQsT0FBT0MsV0FBVztJQUM1QztJQUVBLElBQUkvYyxPQUFPO0lBQ1gsSUFBSWdkLFNBQVMsS0FDVGhkLE9BQU80ZCxZQUFZekMsTUFBTTJCO1NBQ3hCLElBQUlFLFFBQVEsT0FBT0EsUUFBUSxPQUFPQSxRQUFRLE9BQU9BLFFBQVEsT0FBT0EsUUFBUSxLQUN6RWhkLE9BQU9tZCxZQUFZaEMsTUFBTTJCO1NBQ3hCLElBQUlFLFFBQVEsT0FBT0EsUUFBUSxLQUM1QmhkLE9BQU8wZCxZQUFZdkMsTUFBTTJCO1NBRXpCOWMsT0FBT2tlLGNBQWMvQyxNQUFNMkI7SUFDM0IsNkhBQTZIO0lBRWpJOWMsS0FBSzhkLE1BQU0sR0FBRztRQUNWQztRQUNBOWIsS0FBSztZQUNEdUIsTUFBTXNaLE9BQU90WixJQUFJO1lBQ2pCQyxLQUFNcVosT0FBT25kLE1BQU0sR0FBR21kLE9BQU9DLFdBQVc7UUFDNUM7SUFDSjtJQUVBLG9EQUFvRDtJQUNwRCx5QkFBeUI7SUFFekIsT0FBTy9jO0FBRVg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Tm9EO0FBQ1g7QUFFdkI7QUFFbEIsV0FBVztBQUdKLE1BQU1vZTtJQUVULENBQUNDLGNBQWMsR0FBd0IsQ0FBQyxFQUFFO0lBQzFDLENBQUNDLFFBQVEsR0FBd0M7UUFDN0NDLFNBQVNDO0lBQ2IsRUFBRTtJQUVGLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFFekIsbUNBQW1DO0lBQ25DQyxZQUFZdGdCLE1BQWMsRUFBRTBCLEdBQVEsRUFBRTtRQUNsQyxJQUFHQSxJQUFJckIsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDNmYsY0FBYyxFQUNuQyxNQUFNLElBQUloZCxNQUFNLENBQUMsSUFBSSxFQUFFeEIsSUFBSXJCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztRQUU3RCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLENBQUM2ZixjQUFjLENBQUN4ZSxJQUFJckIsUUFBUSxDQUFDLEdBQUdxQjtRQUVyQyxzQkFBc0I7UUFDdEIsT0FBTyxJQUFJNmUsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFFdmdCLE9BQU8sc0JBQXNCLENBQUM7SUFDekU7SUFFQXdnQixVQUFVeGdCLE1BQWMsRUFBRTBCLEdBQVEsRUFBRTtRQUNoQyxJQUFJLENBQUMsQ0FBQ3llLFFBQVEsQ0FBQ3plLElBQUlyQixRQUFRLENBQUMsR0FBRyxJQUFJLENBQUNpZ0IsV0FBVyxDQUFDdGdCLFFBQVEwQixLQUFLLElBQUk7SUFDckU7SUFFQStlLGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxDQUFDTixRQUFRO0lBQ3pCO0lBQ0FPLFVBQVUxZCxJQUFZLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsQ0FBQ21kLFFBQVEsQ0FBQ25kLEtBQUs7SUFDL0I7SUFFQTBDLFVBQVVyRixRQUFnQixFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLENBQUM2ZixjQUFjLENBQUM3ZixTQUFTLEVBQUUsa0JBQWtCO0lBQzdEO0lBRUEsSUFBSWtILE1BQU07UUFDTixPQUFPQSwyREFBR0E7SUFDZDtJQUNBLElBQUlILE1BQU07UUFDTixPQUFPQSxvREFBR0E7SUFDZDtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEMkI7QUFFbUM7QUFDWjtBQUNnRTtBQUM5RDtBQUc3QyxNQUFNMFIsZUFBZTtJQUN4QixRQUFRO0lBQ1IsT0FBUTtJQUVSLE9BQVE7SUFFUixRQUFZO0lBQ1osT0FBWTtJQUNaLFlBQVk7SUFDWixPQUFZO0lBRVosT0FBWTtJQUNaLE9BQVk7SUFFWixNQUFZO0lBQ1osU0FBWTtJQUNaLE1BQVk7SUFDWixTQUFZO0lBRVosTUFBWTtJQUNaLE9BQVk7SUFDWixNQUFZO0lBQ1osT0FBWTtJQUVaLFVBQVk7SUFFWixTQUFZO0lBQ1osVUFBWTtJQUNaLFVBQVk7SUFDWixVQUFZO0lBQ1osVUFBWTtBQUNoQixFQUFDO0FBRUQsaUNBQWlDO0FBQzFCLE1BQU04SCxrQkFBa0I7SUFDM0IsV0FBZ0I7SUFDaEIsV0FBZ0I7SUFDaEIsZUFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQWdCO0lBRWhCLFdBQWU7SUFDZixXQUFlO0lBRWYsVUFBZTtJQUNmLFVBQWU7SUFFZixVQUFlO0lBQ2YsVUFBZTtJQUNmLFVBQWU7SUFDZixVQUFlO0lBRWYsV0FBZTtJQUNmLFVBQWU7SUFDZixXQUFlO0lBQ2YsV0FBZTtJQUNmLGNBQWU7SUFDZixjQUFlO0FBQ25CLEVBQUM7QUFFRCxTQUFTO0FBQ0YsTUFBTWpJLGtCQUFrQjtJQUMzQixXQUFnQjtJQUNoQixXQUFnQjtJQUNoQixlQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsV0FBZ0I7SUFFaEIsV0FBZTtJQUNmLFdBQWU7SUFFZixVQUFlO0lBQ2YsV0FBZTtJQUNmLFdBQWU7SUFDZixjQUFlO0lBQ2YsY0FBZTtBQUNuQixFQUFDO0FBR00sTUFBTWtJLFlBQVk7SUFDckIsTUFBTTtJQUNOLEtBQU07SUFDTixLQUFNO0lBQ04sTUFBTTtJQUNOLEtBQU07SUFFTixLQUFPO0lBQ1AsS0FBTztJQUNQLE9BQU87SUFFUCxNQUFPO0lBQ1AsTUFBTztJQUNQLEtBQU87SUFDUCxNQUFPO0lBQ1AsTUFBTztJQUNQLEtBQU87SUFFUCxLQUFNO0lBQ04sS0FBTTtJQUNOLEtBQU07SUFDTixLQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07QUFDVixFQUFFO0FBRUYsd0JBQXdCO0FBRXhCLHdHQUF3RztBQUN4Ryx5Q0FBeUM7QUFDbEMsTUFBTUMsY0FBYztJQUN2QixFQUFFO0lBQ0Y7UUFBQztLQUFJO0lBQUUsdUJBQXVCLEdBQzlCO1FBQUM7UUFBTTtLQUFLO0lBQ1o7UUFBQztLQUFLO0lBQ047UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFJO0lBQ0w7UUFBQztRQUFNO1FBQU07UUFBTztLQUFNO0lBQzFCO1FBQUM7UUFBSztRQUFNO1FBQU07S0FBSTtJQUN0QjtRQUFDO1FBQU07UUFBTTtLQUFNO0lBQ25CO1FBQUM7UUFBSztLQUFJO0lBQ1Y7UUFBQztRQUFLO1FBQUs7S0FBSTtJQUNmO1FBQUM7S0FBSztJQUNOO1FBQUM7UUFBSztRQUFNO1FBQU07UUFBSztLQUFNO0NBQ2hDLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZHQSxHQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0EsR0FFTyxTQUFTdkssV0FBV3VCLENBQVMsRUFBRXBVLFNBQVNzUyxnREFBVztJQUV0RCxJQUFJeFIsK0NBQVVBLENBQUNzVCxPQUFPOVQsOENBQVNBLEVBQzNCLE9BQU84VDtJQUVYLElBQUloWSx5Q0FBSUEsQ0FBQ2dZLE9BQU9qRCw0REFBWUEsRUFBRTtRQUMxQiwyQ0FBMkM7UUFDM0MsSUFBSW5SLFdBQVdzUyxnREFBV0EsRUFDdEJ2UixrREFBYUEsQ0FBQ3FULEdBQUduUSxnREFBV0E7UUFDaEMsT0FBT21RO0lBQ1g7SUFFQSxNQUFNaUosVUFBVXZlLHVDQUFNLENBQUNzVixFQUFFO0lBRXpCLE1BQU1oVyxVQUFVSCwrQ0FBVUEsQ0FBQ21XO0lBRTNCLElBQUlpSixZQUFZLGFBQWFBLFlBQVksWUFBYTtRQUNsRCxNQUFNM0gsUUFBUTVVLCtDQUFVQSxDQUFDMUM7UUFDekIsTUFBTWlMLFFBQVF2SSwrQ0FBVUEsQ0FBQzFDLFVBQVE7UUFDakMsSUFBTyxDQUFDc1gsVUFBVXBWLDhDQUFTQSxJQUFJb1YsVUFBVXpSLGdEQUFVLEtBQzNDb0YsQ0FBQUEsVUFBVS9JLDhDQUFTQSxJQUFJK0ksVUFBVXBGLGdEQUFVLEdBQ2pEO1lBQ0VsRCxrREFBYUEsQ0FBQ3FULEdBQUdwVTtZQUNqQixPQUFPb1U7UUFDWDtJQUNKO0lBQ0EsSUFBSWlKLFlBQVksYUFBYXZjLCtDQUFVQSxDQUFDMUMsYUFBYWtDLDhDQUFTQSxFQUFFO1FBQzVEUyxrREFBYUEsQ0FBQ3FULEdBQUdwVTtRQUNqQixPQUFPb1U7SUFDWDtJQUNBLElBQUlwVSxXQUFXc1MsZ0RBQVdBLEVBQ3RCLE9BQU9uVix5Q0FBQyxDQUFDLE9BQU8sRUFBRWlYLEVBQUUsQ0FBQyxDQUFDO0lBRTFCLHNDQUFzQztJQUN0QyxPQUFPQTtBQUNYO0FBRU8sU0FBU25VLFdBQVdtVSxDQUFTO0lBRWhDLElBQUl0VCwrQ0FBVUEsQ0FBQ3NULE9BQU85VCw4Q0FBU0EsRUFDM0IsT0FBTzhUO0lBRVgsSUFBSWhZLHlDQUFJQSxDQUFDZ1ksT0FBT2pELDREQUFZQSxFQUFFO1FBQzFCcFEsa0RBQWFBLENBQUNxVCxHQUFHOVQsOENBQVNBLEdBQUcsMEJBQTBCO1FBQ3ZELE9BQU84VDtJQUNYO0lBQ0EsSUFBSXRWLHVDQUFNLENBQUNzVixFQUFFLEtBQUssYUFBYXRULCtDQUFVQSxDQUFDN0MsK0NBQVVBLENBQUNtVyxRQUFRblEsZ0RBQVdBLEVBQUU7UUFDdEVsRCxrREFBYUEsQ0FBQ3FULEdBQUc5VCw4Q0FBU0E7UUFDMUIsT0FBTzhUO0lBQ1g7SUFFQSxPQUFPalgseUNBQUMsQ0FBQyxPQUFPLEVBQUVpWCxFQUFFLENBQUMsQ0FBQztBQUMxQjtBQUVBLElBQUlrSixzQkFBOEMsQ0FBQztBQUNuRCxJQUFJLElBQUk3ZixJQUFJLEdBQUdBLElBQUkyZixZQUFZM2dCLE1BQU0sRUFBRSxFQUFFZ0IsRUFBRztJQUV4QyxNQUFNOGYsV0FBVzlmO0lBQ2pCLEtBQUksTUFBTTBYLE1BQU1pSSxXQUFXLENBQUMzZixFQUFFLENBQzFCNmYsbUJBQW1CLENBQUNuSSxHQUFHLEdBQUdvSTtBQUVsQztBQUVPLFNBQVNoSSxrQkFBMERKLEVBQUs7SUFDM0UsT0FBTytILGVBQWUsQ0FBQy9ILEdBQUc7QUFDOUI7QUFFQSxNQUFNcUksT0FBUTtBQUNkLE1BQU1DLFFBQVE7QUFFUCxTQUFTdkgsV0FBVy9YLElBQVksRUFBRWdYLEVBQVU7SUFFL0MsTUFBTXVJLFFBQWF6ZiwrQ0FBVUEsQ0FBQ0U7SUFDOUIsTUFBTUUsYUFBYUgsNENBQU9BLENBQUNDO0lBRTNCLE1BQU13ZixPQUFTTCxtQkFBbUIsQ0FBQ25JLEdBQUc7SUFDdEMsTUFBTXlJLFNBQVNOLG1CQUFtQixDQUFDbkksR0FBRztJQUV0Q3VELG9EQUFlQSxDQUFDZ0YsT0FBT0M7SUFFdkIsSUFBSSxJQUFJbGdCLElBQUksR0FBR0EsSUFBSVksWUFBWSxFQUFFWixFQUM3QmliLG9EQUFlQSxDQUFFZ0YsUUFBUWpnQixHQUFHa2dCLE9BQU87SUFFdkMsSUFBSTdILFNBQVMzWSx5Q0FBQyxDQUFDLEVBQUV1Z0IsTUFBTSxDQUFDO0lBQ3hCLElBQUksSUFBSWpnQixJQUFJLEdBQUdBLElBQUlZLFlBQVksRUFBRVosRUFDN0JxWSxTQUFTM1kseUNBQUMsQ0FBQyxFQUFFMlksT0FBTyxJQUFJLEVBQUU0SCxRQUFRamdCLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQjtJQUU1RCxJQUFJbWdCLFNBQVNELE1BQ1Q3SCxTQUFTM1kseUNBQUMsQ0FBQyxDQUFDLEVBQUUyWSxPQUFPLENBQUMsQ0FBQztJQUUzQixPQUFPQTtBQUNYO0FBRUEsZ0VBQWdFO0FBQ2hFLHdCQUF3QjtBQUNqQixTQUFTakMsUUFBUTFWLElBQVksRUFBRWlXLENBQVM7SUFFM0NzRSxvREFBZUEsQ0FBRXRFLEdBQUdxRSxpREFBWUEsQ0FBQ3RhO0lBRWpDLE9BQU9oQix5Q0FBQyxDQUFDLEVBQUVpWCxFQUFFLENBQUM7QUFDbEI7QUFFTyxTQUFTcFEsWUFBWTdGLElBQVksRUFBRWlXLENBQWEsRUFBRWUsRUFBVSxFQUFFZCxDQUFhO0lBRTlFLE1BQVFzSixPQUFPTCxtQkFBbUIsQ0FBQ25JLEdBQUc7SUFDdEMsTUFBTXlJLFNBQVNuRixpREFBWUEsQ0FBQ3RhO0lBRTVCLElBQUcsT0FBT2lXLE1BQU0sVUFDWnNFLG9EQUFlQSxDQUFDdEUsR0FBR3VKO0lBRXZCLElBQUcsT0FBT3RKLE1BQU0sVUFDWnFFLG9EQUFlQSxDQUFDckUsR0FBR3NKO0lBRXZCLElBQUlFLE1BQU0xZ0IseUNBQUMsQ0FBQyxFQUFFaVgsRUFBRSxFQUFFZSxHQUFHLEVBQUVkLEVBQUUsQ0FBQztJQUMxQiw0Q0FBNEM7SUFDNUMsSUFBSXVKLFNBQVNELE1BQ1RFLE1BQU0xZ0IseUNBQUMsQ0FBQyxDQUFDLEVBQUUwZ0IsSUFBSSxDQUFDLENBQUM7SUFFckIsT0FBT0E7QUFDWDtBQUdPLFNBQVMvSixXQUFXM1YsSUFBWSxFQUFFZ1gsRUFBVSxFQUFFZixDQUFhO0lBRTlELElBQUkwSixNQUFNM0k7SUFDVixJQUFJMkksUUFBUSxLQUNSQSxNQUFNO0lBRVYsNEJBQTRCO0lBQzVCLE1BQU1ILE9BQVNMLG1CQUFtQixDQUFDUSxJQUFJO0lBQ3ZDLE1BQU1GLFNBQVNuRixpREFBWUEsQ0FBQ3RhO0lBRTVCLElBQUcsT0FBT2lXLE1BQU0sVUFDWnNFLG9EQUFlQSxDQUFDdEUsR0FBR3VKO0lBRXZCLElBQUlFLE1BQU0xZ0IseUNBQUMsQ0FBQyxFQUFFZ1ksR0FBRyxFQUFFZixFQUFFLENBQUM7SUFDdEIsNENBQTRDO0lBQzVDLElBQUl3SixTQUFTRCxNQUNURSxNQUFNMWdCLHlDQUFDLENBQUMsQ0FBQyxFQUFFMGdCLElBQUksQ0FBQyxDQUFDO0lBRXJCLE9BQU9BO0FBQ1g7QUFVTyxTQUFTakwsWUFBWTJELEdBQXVDLEVBQ3ZDdE4sV0FBNEIsRUFDNUIsRUFDSXFMLGVBQWUySSxrREFBUyxFQUN4QnRVLGVBQWUsRUFDQSxHQUFHLENBQUMsQ0FBQztJQUdoRCxJQUFJbU4sU0FBdUMsQ0FBQztJQUU1QyxLQUFJLElBQUlYLE1BQU1vQixJQUFLO1FBRWYsTUFBTXdILE9BQU9aLFNBQVMsQ0FBQ2hJLEdBQUc7UUFDMUIsSUFBSUEsT0FBTyxPQUNQQSxLQUFLO1FBRVR4TSxvQkFBb0IsQ0FBQ3hLLE1BQWN3VjtZQUMvQixPQUFPRyxXQUFXM1YsTUFBTWdYLElBQUliLGFBQWFYO1FBQzdDO1FBRUFtQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUVpSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDcEI5VTtZQUNBTjtRQUNKO0lBQ0o7SUFFQSxPQUFPbU47QUFDWDtBQVFPLFNBQVNuRCxhQUFhNEQsR0FBK0IsRUFDaEN0TixXQUE0QixFQUMvQixFQUNHeUssZ0JBQWtCdUosa0RBQVMsRUFDM0IzSSxlQUFrQjJJLGtEQUFTLEVBQzNCdFUsZUFBZSxFQUNFLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLElBQUltTixTQUF1QyxDQUFDO0lBRTVDLEtBQUksSUFBSVgsTUFBTW9CLElBQUs7UUFFZixNQUFNd0gsT0FBT1osU0FBUyxDQUFDaEksR0FBRztRQUMxQixJQUFJQSxPQUFPLE1BQ1BBLEtBQUs7UUFFVCxJQUFJNkksS0FBTSxDQUFDN2YsTUFBY3dWLE1BQWNSO1lBQ25DLE9BQU9uUCxZQUFZN0YsTUFBTW1XLGFBQWFYLE9BQU93QixJQUFJekIsY0FBY1A7UUFDbkU7UUFFQSxJQUFJOEssTUFBTSxDQUFDOWYsTUFBY3dWLE1BQWNSO1lBQ25DLE9BQU9uUCxZQUFZN0YsTUFBTXVWLGNBQWNQLFFBQVFnQyxJQUFJYixhQUFhWDtRQUNwRTtRQUVBLElBQUloTCxvQkFBb0I5SyxXQUFZO1lBRWhDbWdCLEtBQU0sQ0FBQzdmLE1BQWN3VixNQUFjdUs7Z0JBQy9CLE9BQU92VixnQkFBZ0J4SyxNQUFNbVcsYUFBYVgsT0FBT0QsY0FBY3dLO1lBQ25FO1lBRUEsc0JBQXNCO1lBQ3RCRCxNQUFNLENBQUM5ZixNQUFjd1YsTUFBY3VLO2dCQUMvQixPQUFPdlYsZ0JBQWdCeEssTUFBTXVWLGNBQWN3SyxJQUFJNUosYUFBYVg7WUFDaEU7UUFDSjtRQUVBbUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFaUksS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHO1lBQ3BCOVU7WUFDQU4saUJBQWlCcVY7UUFDckI7UUFDQWxJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRWlJLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNyQjlVO1lBQ0FOLGlCQUFpQnNWO1FBQ3JCO1FBQ0EsSUFBSTNKLGlCQUFpQjJJLGtEQUFTQSxJQUFJdFUsb0JBQW9COUssV0FDbERpWSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUVpSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDckI5VTtZQUNBTixpQkFBaUIsQ0FBQ3hLLE1BQWN3VixNQUFjUjtnQkFFMUMsTUFBTUUsY0FBY3ZVLHVDQUFNLENBQUNxVSxNQUFNO2dCQUVqQyxJQUFJZ0MsT0FBTyxPQUFPOUIsZ0JBQWdCLEdBQzlCLE9BQU9TLFdBQVczVixNQUFNLE1BQU13VjtnQkFDbEMsSUFBSXdCLE9BQU8sT0FBTzlCLGdCQUFnQixHQUM5QixPQUFPUyxXQUFXM1YsTUFBTSxNQUFNd1Y7Z0JBRWxDLE9BQU8zUCxZQUFZN0YsTUFBTXdWLE1BQU13QixLQUFHLEtBQUt6QixjQUFjUDtZQUN6RDtRQUNKO0lBQ1I7SUFFQSxPQUFPMkM7QUFDWDtBQUVPLE1BQU01RCxjQUFjO0lBQUM7SUFBTTtJQUFNO0lBQUs7SUFBSztJQUFNO0NBQUssQ0FBVTtBQUV2RSxNQUFNaU0sVUFBVTtJQUNaLE1BQU07SUFDTixNQUFNO0lBQ04sS0FBSztJQUNMLEtBQUs7SUFDTCxNQUFNO0lBQ04sTUFBTTtBQUNWO0FBRU8sU0FBU2hNLFVBQVlvRSxHQUE4QyxFQUM5Q3ROLFdBQTRCLEVBQzVCLEVBQ0l5SyxnQkFBa0J1SixrREFBUyxFQUMzQjNJLGVBQWtCMkksa0RBQVMsRUFDM0J0VSxlQUFlLEVBQ0UsR0FBRyxDQUFDLENBQUM7SUFFbEQsSUFBSW1OLFNBQXVDLENBQUM7SUFFNUMsS0FBSSxNQUFNWCxNQUFNb0IsSUFBSztRQUVqQixNQUFNd0gsT0FBT1osU0FBUyxDQUFDaEksR0FBRztRQUUxQixJQUFJNkksS0FBTSxDQUFDN2YsTUFBY3dWLE1BQWNSLE9BQWVrRDtZQUVsRCxJQUFJK0gsTUFBTWpKO1lBRVYsSUFBSWYsSUFBSUUsYUFBYVg7WUFDckIsSUFBSVUsSUFBSVgsY0FBY1A7WUFDdEIsSUFBSWtELFVBQVc7Z0JBQ1gsQ0FBQ2pDLEdBQUVDLEVBQUUsR0FBRztvQkFBQ0E7b0JBQUVEO2lCQUFFO2dCQUNiZ0ssTUFBTUQsT0FBTyxDQUFDQyxJQUFJO1lBQ3RCO1lBRUEsSUFBSUEsR0FBRyxDQUFDLEVBQUUsS0FBSyxPQUFPQSxHQUFHLENBQUMsRUFBRSxLQUFLLEtBQU07Z0JBQ25DLElBQUl0ZCwrQ0FBVUEsQ0FBQzZTLFVBQVU3UywrQ0FBVUEsQ0FBQ3FTLFFBQ2hDaUwsTUFBTUEsTUFBTTtZQUNwQjtZQUVBLE9BQU9wYSxZQUFZN0YsTUFBTWlXLEdBQUdnSyxLQUFLL0o7UUFDckM7UUFFQSxJQUFJMUwsb0JBQW9COUssV0FBWTtZQUVoQ21nQixLQUFNLENBQUM3ZixNQUFjd1YsTUFBY3VLLEdBQVczYjtnQkFDMUMsT0FBT29HLGdCQUFnQnhLLE1BQU1tVyxhQUFhWCxPQUFPRCxjQUFjd0ssS0FBTSxTQUFTO1lBQ2xGO1FBQ0o7UUFFQXBJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRWlJLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNwQjlVO1lBQ0FOLGlCQUFpQnFWO1FBQ3JCO0lBQ0o7SUFFQSxPQUFPbEk7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbGxCaUM7QUFDMEI7QUFDdEI7QUFNOUIsTUFBTW1ILFlBQVksQ0FBQzllLE9BQWlCQSxLQUFLO0FBRXpDLE1BQU0yVSxvQkFBb0JELHdEQUFVQSxDQUFDO0FBQ3JDLE1BQU1rQixlQUFvQjlULHdEQUFVQSxDQUFDO0FBRXJDLFNBQVNvZSxnQkFBZ0IzZixPQUFpQjtJQUU3QyxNQUFNNGYsUUFBUSxJQUFJM2dCO0lBQ2xCLElBQUksSUFBSUYsSUFBSSxHQUFHQSxJQUFJaUIsUUFBUWpDLE1BQU0sRUFBRWdCLEtBQUcsRUFDbEM2Z0IsS0FBSyxDQUFDNWYsT0FBTyxDQUFDakIsRUFBRSxDQUFDLEdBQUdpQixPQUFPLENBQUNqQixJQUFFLEVBQUU7SUFFcEMsT0FBTyxDQUFDVTtRQUNKLE1BQU0yYSxNQUFTaFksK0NBQVVBLENBQUMzQztRQUMxQixNQUFNNkIsU0FBU3NlLEtBQUssQ0FBQ3hGLElBQUk7UUFDekIsSUFBSTlZLFdBQVduQyxXQUNYLE9BQU9NO1FBRVgsZ0JBQWdCO1FBQ2hCLElBQUkyYSxRQUFReFksOENBQVNBLEVBQ2pCLE9BQU91Uyw0REFBVUEsQ0FBQzFVLE1BQU02QjtRQUM1QixJQUFJQSxXQUFXTSw4Q0FBU0EsRUFDcEIsT0FBT0wsNERBQVVBLENBQUM5QjtRQUV0QixNQUFNLElBQUlxQixNQUFNO0lBQ3BCO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQzZHO0FBSXRHLFNBQVM0UyxjQUFjOEwsQ0FBUztJQUNuQyxJQUFJNWQsOENBQVNBLElBQUk0ZCxLQUFLQSxLQUFLNUwsZ0RBQVdBLEVBQ2xDLE9BQU9MLCtDQUFVQTtJQUNyQixPQUFPaUQsMERBQXFCQTtBQUNoQztBQUVPLFNBQVNuQyxlQUFlbUwsQ0FBUztJQUNwQyxJQUFJNWQsOENBQVNBLElBQUk0ZCxLQUFLQSxLQUFLNUwsZ0RBQVdBLEVBQ2xDLE9BQU9BLGdEQUFXQTtJQUN0QixPQUFPNEMsMERBQXFCQTtBQUNoQztBQUVPLFNBQVNWLGdCQUFnQjBKLENBQVM7SUFDckMsSUFBSUEsTUFBTWphLGdEQUFXQSxFQUNqQixPQUFPQSxnREFBV0E7SUFDdEIsT0FBT2lSLDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTbEIsV0FBV2tLLENBQVM7SUFDaEMsSUFBSUEsTUFBTTVkLDhDQUFTQSxJQUFJNGQsTUFBTWphLGdEQUFXQSxFQUNwQyxPQUFPM0QsOENBQVNBO0lBQ3BCLE9BQU80VSwwREFBcUJBO0FBQ2hDO0FBQ08sU0FBU2hCLFlBQVlnSyxDQUFTO0lBQ2pDLElBQUlBLE1BQU01ZCw4Q0FBU0EsRUFDZixPQUFPQSw4Q0FBU0E7SUFDcEIsT0FBTzRVLDBEQUFxQkE7QUFDaEM7QUFFTyxTQUFTUixhQUFhd0osQ0FBUztJQUNsQyxJQUFJQSxNQUFNN0wsOENBQVNBLEVBQ2YsT0FBT0osK0NBQVVBO0lBQ3JCLE9BQU9pRCwwREFBcUJBO0FBQ2hDO0FBQ08sU0FBU1AsWUFBWXVKLENBQVM7SUFDakMsSUFBSUEsTUFBTTdMLDhDQUFTQSxFQUNmLE9BQU9BLDhDQUFTQTtJQUNwQixPQUFPNkMsMERBQXFCQTtBQUNoQztBQUNPLFNBQVNULFdBQVd5SixDQUFTO0lBQ2hDLElBQUlBLE1BQU01ZCw4Q0FBU0EsSUFBSTRkLE1BQU1qYSxnREFBV0EsRUFDcEMsT0FBT29PLDhDQUFTQTtJQUNwQixPQUFPNkMsMERBQXFCQTtBQUNoQztBQUVPLFNBQVNsQyxVQUFVelEsQ0FBUztJQUFJLE9BQU8rUCxnREFBV0E7QUFBRTtBQUNwRCxTQUFTMkIsUUFBVTFSLENBQVM7SUFBSSxPQUFPakMsOENBQVNBO0FBQUk7QUFDcEQsU0FBU2lVLFVBQVVoUyxDQUFTO0lBQUksT0FBTzBCLGdEQUFXQTtBQUFFO0FBQ3BELFNBQVNnUCxRQUFVMVEsQ0FBUztJQUFJLE9BQU84UCw4Q0FBU0E7QUFBSTtBQUUzRCxTQUFTO0FBQ0YsU0FBU2tNLHdCQUVoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEQrQztBQUNLO0FBQ047QUFDRTtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKdkMsTUFBTTFWLFNBQVUsSUFBSWxMLFFBQWtCO0FBQzdDLE1BQU02Z0IsZUFBdUMsQ0FBQztBQUV2QyxTQUFTQyxpQkFBcUNuZixJQUFZO0lBQzdELE9BQU91SixNQUFNLENBQUN6SixXQUFXRSxNQUFNO0FBQ25DO0FBRU8sU0FBU0YsV0FBV0UsSUFBWTtJQUVuQyxJQUFJUyxLQUFLeWUsWUFBWSxDQUFDbGYsS0FBSztJQUMzQixJQUFJUyxPQUFPbEMsV0FBWTtRQUNuQmtDLEtBQUt5ZSxZQUFZLENBQUNsZixLQUFLLEdBQUd1SixPQUFPcE0sTUFBTTtRQUN2Q29NLE1BQU0sQ0FBQzlJLEdBQUcsR0FBRztZQUFDMkosVUFBVXBLO1FBQUk7SUFDaEM7SUFFQSxPQUFPUztBQUNYO0FBRU8sU0FBU2lTLFNBQVMxUyxJQUFZLEVBQUVsRCxJQUFnQztJQUVuRSxNQUFNMkQsS0FBS1gsV0FBV0U7SUFDdEJ1SSxPQUFPOEosTUFBTSxDQUFFOUksTUFBTSxDQUFDOUksR0FBRyxFQUFFM0Q7SUFDM0IsT0FBTzJEO0FBQ1g7QUFFTyxNQUFNNlIsaUJBQTJCeFMsV0FBVyxZQUFZLENBQUMsT0FBTztBQUNoRSxNQUFNa0IsWUFBMkJsQixXQUFXLE9BQU87QUFDbkQsTUFBTTZFLGNBQTJCN0UsV0FBVyxTQUFTO0FBQ3JELE1BQU02UyxhQUEyQjdTLFdBQVcsUUFBUTtBQUNwRCxNQUFNa1QsY0FBMkJsVCxXQUFXLFNBQVM7QUFDckQsTUFBTWlULFlBQTJCalQsV0FBVyxPQUFPO0FBQ25ELE1BQU04Vix3QkFBMkI5VixXQUFXLHNCQUFzQjs7Ozs7OztTQ2pDekU7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2I7QUFDb0I7QUFDUDtBQUU3QywrQkFBK0I7QUFDQztBQUU0RCIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvYm9keS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2JvZHkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yX3JhbmdlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvcl9yYW5nZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9hcmdzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2FyZ3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz1faW5pdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89X2luaXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvZG9wLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQ29udmVydGVycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1JldHVyblR5cGVGY3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVCdWlsdGluLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUMkpTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgQVJSQVlfVFlQRSwgQ09ERV9CRUcsIENPREVfQ09MLCBDT0RFX0VORCwgQ09ERV9MSU5FLCBKU19DT0RFLCB0eXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgY29uc3QgQ1VSU09SID0gbmV3IEFSUkFZX1RZUEUoMik7XG5cbmV4cG9ydCBsZXQganNjb2RlOiBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfanNfY3Vyc29yKGlkeDogbnVtYmVyKSB7XG4gICAgSlNfQ09ERVtpZHggKyBDT0RFX0xJTkVdID0gQ1VSU09SW0NPREVfTElORV07XG4gICAgSlNfQ09ERVtpZHggKyBDT0RFX0NPTCBdID0ganNjb2RlIS5sZW5ndGggLSBDVVJTT1JbQ09ERV9DT0xdO1xufVxuXG5mdW5jdGlvbiBuZXdfanNjb2RlKGZpbGVuYW1lOiBzdHJpbmcpIHtcblxuICAgIGpzY29kZSAgPSBgLy8jIHNvdXJjZVVSTD0ke2ZpbGVuYW1lfVxcbmA7XG4gICAganNjb2RlICs9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG5cbiAgICBDVVJTT1JbQ09ERV9MSU5FXSA9IDM7XG4gICAgQ1VSU09SW0NPREVfQ09MXSA9IGpzY29kZS5sZW5ndGg7XG59XG5cbnR5cGUgUHJpbnRhYmxlID0ge3RvU3RyaW5nKCk6IHN0cmluZ307XG5cbmxldCBpbmRlbnQgPSBcIiAgICBcIjtcbmxldCBjdXJfaW5kZW50X2xldmVsID0gMDtcbi8vbGV0IGN1cl9pbmRlbnQgPSBcIlwiO1xuXG5jb25zdCBpbmRlbnRzID0gW1xuICAgIFwiXCIsXG4gICAgXCJcIixcbiAgICBpbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG4gICAgaW5kZW50Kz1pbmRlbnQsXG5dXG5cbmV4cG9ydCBjb25zdCBOTCA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgKytDVVJTT1JbQ09ERV9MSU5FXTtcbiAgICAgICAgQ1VSU09SW0NPREVfQ09MXSA9IGpzY29kZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIHJldHVybiBcIlxcblwiICsgaW5kZW50c1tjdXJfaW5kZW50X2xldmVsXTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgQkIgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaW5kZW50c1srK2N1cl9pbmRlbnRfbGV2ZWxdO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBCRSA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpbmRlbnRzWy0tY3VyX2luZGVudF9sZXZlbF07XG4gICAgfVxufVxuXG4vLyB0cmFuc2Zvcm1zIGludG8gYSB0ZW1wbGF0ZSBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiByKC4uLmFyZ3M6IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKFByaW50YWJsZXxudW1iZXIpW11dKSB7XG4gICAgcmV0dXJuIGFyZ3M7XG59XG5cbi8vIHdyaXRlIGEgdGVtcGxhdGUgc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gd3IoYXJnczogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi4oUHJpbnRhYmxlfG51bWJlcilbXV0pIHtcbiAgICBpZiggdHlwZW9mIGFyZ3MgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiB3KGFyZ3MpO1xuICAgIHJldHVybiB3dCguLi5hcmdzKTtcbn1cblxuXG4vLyB3cml0ZSB3aXRoIHRlbXBsYXRlIHN0cmluZyB3dGBgXG5leHBvcnQgZnVuY3Rpb24gd3Qoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczogKFByaW50YWJsZXxudW1iZXIpW10pIHtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBqc2NvZGUgKz0gc3RyW2ldO1xuICAgICAgICB3KGFyZ3NbaV0pO1xuICAgIH1cblxuICAgIGpzY29kZSArPSBzdHJbYXJncy5sZW5ndGhdO1xufVxuXG4vLyBnZW5lcmljIHdyaXRlID9cbmV4cG9ydCBmdW5jdGlvbiB3KC4uLmFyZ3M6IChQcmludGFibGV8bnVtYmVyKVtdKSB7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGxldCBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KGFyZykgKSB7IC8vIGxpa2VseSBhIHJgYFxuICAgICAgICAgICAgd3IoYXJnIGFzIFBhcmFtZXRlcnM8dHlwZW9mIHdyPlswXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCB0eXBlb2YgYXJnICE9PSBcIm51bWJlclwiICkge1xuXG4gICAgICAgICAgICBpZiggYXJnID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIGFyZyA9IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICBpZiggYXJnID09PSBudWxsIClcbiAgICAgICAgICAgICAgICBhcmcgPSBcIm51bGxcIjtcblxuICAgICAgICAgICAganNjb2RlICs9IGFyZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSA0KmFyZztcbiAgICAgICAgXG4gICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9CRUcpO1xuICAgICAgICBBU1QySlNbdHlwZShhcmcpIV0oYXJnKTtcbiAgICAgICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0VORClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1QpIHtcblxuICAgIG5ld19qc2NvZGUoYXN0LmZpbGVuYW1lKTtcblxuICAgIHcoMCk7XG5cbiAgICAvLyBUT0RPOiBiZXR0ZXIgZXhwb3J0IHN0cmF0ZWd5ICg/KVxuICAgIGpzY29kZSArPSBgXFxuY29uc3QgX19leHBvcnRlZF9fID0ge307XFxuYDtcblxuICAgIC8vY29uc29sZS53YXJuKGpzY29kZSk7XG5cbiAgICAvKipcbiAgICBjb25zdCBsaW5lcyA9IGFzdC5ib2R5LmNoaWxkcmVuO1xuICAgIGNvbnN0IGV4cG9ydGVkID0gbmV3IEFycmF5KGxpbmVzLmxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBsaW5lc1tpXS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgZXhwb3J0ZWRbaV0gPSBsaW5lc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgZXhwb3J0ZWQubGVuZ3RoID0gb2Zmc2V0O1xuXG4gICAganNjb2RlICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcbiAgICAvKiovXG5cblx0cmV0dXJuIGpzY29kZTtcbn0iLCJpbXBvcnQgeyBCQiwgQkUsIE5MLCB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgdyhCQik7XG5cbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIGZvcihsZXQgaSA9IGNvZmZzZXQ7IGkgPCBuYkNoaWxkcmVuK2NvZmZzZXQ7ICsraSlcbiAgICAgICAgdyhOTCwgaSk7XG5cbiAgICB3KEJFKTtcbn0iLCJpbXBvcnQgeyBCT0RZIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIEJPRFkpO1xuXG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUubGVuZ3RoO1xuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkgKyBjb2Zmc2V0LCBub2RlW2ldLCBjb250ZXh0KTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJvZHlcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGxldCBiYXNlOiBzdHJpbmd8bnVtYmVyID0gXCJfcl8ub2JqZWN0XCI7XG5cbiAgICBjb25zdCBib2R5ICAgICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIGlmKCBuYkNoaWxkcmVuID09PSAyKVxuICAgICAgICBiYXNlID0gYm9keSsxO1xuXG4gICAgd3RgY2xhc3MgJHtWQUxVRVNbbm9kZV19IGV4dGVuZHMgJHtiYXNlfSB7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ0xBU1NfQ0xBU1NERUYgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBnZXRTVHlwZUlEIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUubmFtZV0gPSBnZXRTVHlwZUlEKG5vZGUubmFtZSk7XG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgc2V0VHlwZShkc3QgLCBDTEFTU19DTEFTU0RFRik7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IDEgKyBub2RlLmJhc2VzLmxlbmd0aDtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKTtcblxuICAgIGNvbnZlcnRfYm9keShjb2Zmc2V0LCBub2RlLmJvZHksIGNvbnRleHQpO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuIDsgKytpKVxuICAgICAgICBjb252ZXJ0X25vZGUoaStjb2Zmc2V0LCBub2RlLmJhc2VzW2ktMV0sIGNvbnRleHQpO1xuXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLm5hbWU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDbGFzc0RlZlwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgaWR4ICA9IFZBTFVFU1tub2RlXTtcblxuICAgIGNvbnN0IGxpc3QgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IGJvZHkgPSBsaXN0KzE7XG5cbiAgICB3dGBmb3IodmFyICR7aWR4fSBvZiAke2xpc3R9KXske2JvZHl9JHtOTH19YDtcbn0iLCJpbXBvcnQgeyBDT05UUk9MRkxPV1NfRk9SIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBmYWxzZXx2b2lkIHtcblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1t0YXJnZXRdID0gMDsgLy9UT0RPXG5cbiAgICBzZXRUeXBlKGRzdCwgQ09OVFJPTEZMT1dTX0ZPUik7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCAgLCBub2RlLml0ZXIsIGNvbnRleHQpO1xuICAgIGNvbnZlcnRfYm9keShjb2Zmc2V0KzEsIG5vZGUuYm9keSwgY29udGV4dCk7XG5cbiAgICBWQUxVRVNbZHN0XSA9IHRhcmdldDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgaWR4ICA9IFZBTFVFU1tub2RlXTtcblxuICAgIGNvbnN0IGJvZHkgICAgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpO1xuXG4gICAgbGV0IGJlZyA6IHN0cmluZ3xudW1iZXJ8YW55ICA9IFwiMG5cIjtcbiAgICBsZXQgaW5jcjogc3RyaW5nfG51bWJlcnxhbnkgID0gXCIxblwiO1xuXG4gICAgbGV0IGVuZCA9IE51bWJlcjJJbnQoYm9keSsxKTtcblxuICAgIGlmKCBuYkNoaWxkcmVuID4gMikge1xuICAgICAgICBiZWcgPSBlbmQ7XG4gICAgICAgIGVuZCA9IE51bWJlcjJJbnQoYm9keSsxKTtcbiAgICB9XG5cbiAgICBpZiggbmJDaGlsZHJlbiA9PT0gNClcbiAgICAgICAgaW5jciA9IE51bWJlcjJJbnQoYm9keSsyKTtcblxuICAgIHJldHVybiB3dGBmb3IodmFyICR7aWR4fSA9ICR7YmVnfTsgJHtpZHh9IDwgJHtlbmR9OyAke2lkeH0gKz0gJHtpbmNyfSl7JHtib2R5fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ09OVFJPTEZMT1dTX0ZPUl9SQU5HRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBmYWxzZXx2b2lkIHtcblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgIT09IFwiQ2FsbFwiIHx8IG5vZGUuaXRlci5mdW5jLmlkICE9PSBcInJhbmdlXCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1t0YXJnZXRdID0gMDsgLy9UT0RPXG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUudmFsdWVdID0gU1RZUEVfSU5UO1xuICAgIC8vIFRPRE86IGpzaW50IG9wdGkgaWYgdGhpcy52YWx1ZSBub3QgdXNlZC4uLlxuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuaXRlci5hcmdzO1xuXG4gICAgc2V0VHlwZShkc3QsIENPTlRST0xGTE9XU19GT1JfUkFOR0UpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBhcmdzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCAgICA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X2JvZHkoY29mZnNldCwgbm9kZS5ib2R5LCBjb250ZXh0KTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbiA7ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkrY29mZnNldCwgYXJnc1tpLTFdLCBjb250ZXh0KTtcblxuICAgIFZBTFVFU1tkc3RdID0gdGFyZ2V0O1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgbGV0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGxldCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIC8vIGlmXG4gICAgd3RgaWYoJHtjb2Zmc2V0Kyt9KXske2NvZmZzZXQrK30ke05MfX1gO1xuXG4gICAgLy8gZWxzZSBpZlxuICAgIGxldCBpO1xuICAgIGZvcihpID0gMjsgaSA8IG5iQ2hpbGRyZW4gLSAxOyBpICs9IDIpIHtcbiAgICAgICAgd3RgZWxzZSBpZigke2NvZmZzZXQrK30peyR7Y29mZnNldCsrfSR7Tkx9fWA7XG4gICAgfVxuXG4gICAgLy8gZWxzZVxuICAgIGlmKCBpID09PSBuYkNoaWxkcmVuIC0gMSApXG4gICAgICAgIHd0YGVsc2UgeyR7Y29mZnNldH0ke05MfX1gO1xufSIsImltcG9ydCB7IENPTlRST0xGTE9XU19JRkJMT0NLIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRDb3VudCA9IDI7XG5cbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgaWYoICEgKFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pICkgeyAvLyBmaW5hbCBlbHNlXG4gICAgICAgICAgICArK2NoaWxkQ291bnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuICAgICAgICBjaGlsZENvdW50ICs9IDI7XG4gICAgfVxuXG4gICAgc2V0VHlwZShkc3QsIENPTlRST0xGTE9XU19JRkJMT0NLKTtcbiAgICBsZXQgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgY2hpbGRDb3VudCk7XG5cbiAgICAvLyBpZlxuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0KyssIG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgY29udmVydF9ib2R5KGNvZmZzZXQrKywgbm9kZS5ib2R5LCBjb250ZXh0KTtcblxuICAgIC8vIGVsc2UgaWZcbiAgICBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSApIHtcblxuICAgICAgICAvLyBjdXIub3JlbHNlWzBdIGlzIHRoZSBib2R5XG4gICAgICAgIGlmKCAhIChcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSApIHsgLy8gZmluYWwgZWxzZVxuICAgICAgICAgICAgY29udmVydF9ub2RlKGNvZmZzZXQsIGN1ci5vcmVsc2UsIGNvbnRleHQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG5cbiAgICAgICAgY29udmVydF9ub2RlKGNvZmZzZXQrKywgY3VyLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBjb252ZXJ0X2JvZHkoY29mZnNldCsrLCBjdXIuYm9keSwgY29udGV4dCk7XG5cbiAgICAgICAgY2hpbGRDb3VudCArPSAyO1xuICAgIH1cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIHd0YCgke2NvZmZzZXR9ID8gJHtjb2Zmc2V0KzF9IDogJHtjb2Zmc2V0KzJ9KWA7XG59IiwiaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1RFUk5BUlkgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAzKTtcblxuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0ICAsIG5vZGUudGVzdCAgLCBjb250ZXh0KTtcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsxLCBub2RlLmJvZHkgICwgY29udGV4dCk7IC8vIHRydWVcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsyLCBub2RlLm9yZWxzZSwgY29udGV4dCk7IC8vIGZhbHNlXG5cbiAgICBzZXRUeXBlKGRzdCAsIENPTlRST0xGTE9XU19URVJOQVJZKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0VHlwZShjb2Zmc2V0KzEpKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmRXhwXCI7IiwiaW1wb3J0IHsgQkIsIEJFLCBOTCwgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcblxuICAgIHd0YHRyeSB7JHtjb2Zmc2V0fSR7Tkx9fWA7XG4gICAgd3RgY2F0Y2goX3Jhd19lcnJfKXske0JCfSR7Tkx9YDtcblxuICAgICAgICB3KFwiY29uc3QgX2Vycl8gPSBfYl8uZ2V0X3B5X2V4Y2VwdGlvbihfcmF3X2Vycl8sIF9fU0JSWVRIT05fXylcIik7XG5cbiAgICAgICAgaWYoIG5iQ2hpbGRyZW4gPiAxKVxuICAgICAgICAgICAgdyggMStjb2Zmc2V0ICk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMjsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgICAgIHcoTkwsIFwiZWxzZSBcIiwgaSArIGNvZmZzZXQgKTtcblxuICAgICAgICAvLyBub3QgYSBjYXRjaCBhbGwuLi5cbiAgICAgICAgaWYoIG5iQ2hpbGQoY29mZnNldCArIG5iQ2hpbGRyZW4tMSkgIT09IDEpXG4gICAgICAgICAgICB3KE5MLCBcImVsc2UgeyB0aHJvdyBfcmF3X2Vycl8gfVwiKTtcblxuICAgIHcoQkUsIE5MKTtcblxufSIsImltcG9ydCB7IENPTlRST0xGTE9XU19UUllCTE9DSyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUuaGFuZGxlcnMubGVuZ3RoKzE7XG5cbiAgICBzZXRUeXBlKGRzdCwgQ09OVFJPTEZMT1dTX1RSWUJMT0NLKTtcbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKVxuXG4gICAgLy8gdHJ5IGJvZHlcbiAgICBjb252ZXJ0X2JvZHkoY29mZnNldCwgbm9kZS5ib2R5LCBjb250ZXh0KTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpK2NvZmZzZXQsIG5vZGUuaGFuZGxlcnNbaS0xXSwgY29udGV4dCk7XG5cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeVwiOyIsImltcG9ydCB7IE5MLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpO1xuXG4gICAgLy8gZWxzZSBpcyBoYW5kbGVkIGJ5IHRyeWJsb2NrXG4gICAgaWYobmJDaGlsZHJlbiA9PT0gMSlcbiAgICAgICAgcmV0dXJuIHd0YHske2NvZmZzZXR9JHtOTH19YDtcblxuICAgIHd0YGlmKCR7Y29mZnNldCsxfSl7JHtjb2Zmc2V0fSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBuYkNoaWxkcmVuID0gMTtcbiAgICBpZiggbm9kZS50eXBlICE9PSB1bmRlZmluZWQgKVxuICAgICAgICBuYkNoaWxkcmVuID0gMjtcblxuICAgIHNldFR5cGUoZHN0LCBDT05UUk9MRkxPV1NfVFJZQkxPQ0tfQ0FUQ0gpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgY29udmVydF9ib2R5KGNvZmZzZXQsIG5vZGUuYm9keSwgY29udGV4dCk7XG4gICAgaWYoIG5iQ2hpbGRyZW4gPT09IDIpXG4gICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0KzEsIG5vZGUudHlwZSwgY29udGV4dCk7XG4gICAgXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLm5hbWU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJFeGNlcHRIYW5kbGVyXCI7IiwiaW1wb3J0IHsgU1lNQk9MIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyB0eXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBTQnJ5dGhvbiB9IGZyb20gXCJydW50aW1lXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG4vL1RPRE86IHVzZSB+PXNvdXJjZW1hcC4uLlxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogYW55LCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxudW1iZXIge1xuXG4gIC8vVE9ETy4uLlxuICAvKlxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG4qL1xuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IG51bWJlciB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBzdGFja2xpbmVbMV0sIHN0YWNrbGluZVsyXSkhO1xufVxuXG5leHBvcnQgdHlwZSBTdGFja0xpbmUgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl07XG5cbi8vVE9ETzogY29udmVydFxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrMmFzdG5vZGVzKHN0YWNrOiBTdGFja0xpbmVbXSwgc2I6IFNCcnl0aG9uKTogbnVtYmVyW10ge1xuICByZXR1cm4gc3RhY2subWFwKCBlID0+IHN0YWNrbGluZTJhc3Rub2RlKGUsIHNiKSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgc2I6IFNCcnl0aG9uKTogU3RhY2tMaW5lW10ge1xuXG5cbiAgXG4gICAgc3RhY2sgPSBzdGFjay5zcGxpdChcIlxcblwiKTtcblxuICAgIGNvbnN0IGlzVjggPSBzdGFja1swXT09PSBcIkVycm9yXCI7IFxuXG4gICAgcmV0dXJuIGZpbHRlcl9zdGFjayhzdGFjaykubWFwKCBsID0+IHtcblxuICAgICAgbGV0IFtfLCBfbGluZSwgX2NvbF0gPSBsLnNwbGl0KCc6Jyk7XG4gIFxuICAgICAgaWYoIF9jb2xbX2NvbC5sZW5ndGgtMV0gPT09ICcpJykgLy8gVjhcbiAgICAgICAgX2NvbCA9IF9jb2wuc2xpY2UoMCwtMSk7XG4gIFxuICAgICAgbGV0IGxpbmUgPSArX2xpbmUgLSAyO1xuICAgICAgbGV0IGNvbCAgPSArX2NvbDtcblxuICAgICAgLS1jb2w7IC8vc3RhcnRzIGF0IDEuXG5cbiAgICAgIGxldCBmY3RfbmFtZSE6IHN0cmluZztcbiAgICAgIGlmKCBpc1Y4ICkge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKFwiIFwiLCA3KTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDcsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJldmFsXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG5cbiAgICAgICAgLy9UT0RPOiBleHRyYWN0IGZpbGVuYW1lLlxuICAgICAgICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2RlcywgbGluZSwgY29sKSE7XG4gICAgICAgIGlmKCB0eXBlKG5vZGUpID09PSBTWU1CT0wpXG4gICAgICAgICAgY29sICs9IFZBTFVFU1tub2RlXS5sZW5ndGg7IC8vIFY4IGdpdmVzIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgc3ltYm9sIG5hbWUgd2hlbiBGRiBnaXZlcyBcIihcIi4uLlxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKCdAJyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSgwLCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiYW5vbnltb3VzXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbZmN0X25hbWUsIGxpbmUsIGNvbF0gYXMgY29uc3Q7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihlcnI6IFB5X0V4Y2VwdGlvbiwgc2I6IFNCcnl0aG9uKSB7XG5cbiAgICBjb25zb2xlLndhcm4oXCJFeGNlcHRpb25cIiwgZXJyKTtcblxuICAgIGNvbnN0IHN0YWNrID0gcGFyc2Vfc3RhY2soIChlcnIgYXMgYW55KS5fcmF3X2Vycl8uc3RhY2ssIHNiKTtcbiAgICBjb25zdCBub2RlcyA9IHN0YWNrMmFzdG5vZGVzKHN0YWNrLCBzYik7XG4gICAgLy9UT0RPOiBjb252ZXJ0IHN0YWNrLi4uXG4gICAgLy8gbm9kZXNbaV0ucHljb2RlLnN0YXJ0LmxpbmVcbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHswfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZnVuY3Rpb24gZ2V0X3B5X2V4Y2VwdGlvbihfcmF3X2Vycl86IGFueSwgX19TQlJZVEhPTl9fOiBhbnkpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclxuICAgICAgICAgICAgICA/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XG5cbiAgZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pO1xuICBcbiAgcmV0dXJuIF9lcnJfO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVidWdfcHJpbnRfZXhjZXB0aW9uLFxuICAgIGdldF9weV9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgTkwsIHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgY29mZnNldCA9IGZpcnN0Q2hpbGQobm9kZSk7XG5cbiAgICB3dGB3aGlsZSgke2NvZmZzZXR9KXske2NvZmZzZXQrMX0ke05MfX19YDtcbn0iLCJpbXBvcnQgeyBDT05UUk9MRkxPV1NfV0hJTEUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBDT05UUk9MRkxPV1NfV0hJTEUpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDIpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQgICwgbm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICBjb252ZXJ0X2JvZHkoY29mZnNldCsxLCBub2RlLmJvZHksIGNvbnRleHQpO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHNldF9qc19jdXJzb3IsIHcsIHdyLCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENPREVfQkVHLCBDT0RFX0VORCwgZmlyc3RDaGlsZCwgbmJDaGlsZCwgcmVzdWx0VHlwZSwgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5pbXBvcnQgeyBGVU5DVElPTlNfQVJHU19LV0FSRywgRlVOQ1RJT05TX0FSR1NfVkFSRyB9IGZyb20gXCIuL2FzdGNvbnZlcnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIFxuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpO1xuXG4gICAgY29uc3QgU1R5cGVfZmN0ID0gVkFMVUVTW25vZGVdISBhcyBTVHlwZUZjdDtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBsZXQga3dfc3RhcnQgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBrd19zdGFydCA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAga3dfc3RhcnQgPSBtZXRhLmlkeF92YXJhcmcgKyAxO1xuXG4gICAgaWYoIG1ldGEua3dhcmdzICE9PSB1bmRlZmluZWQgJiYga3dfc3RhcnQgPT09IG5iQ2hpbGRyZW4gLSAxKVxuICAgICAgICArK2t3X3N0YXJ0O1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgbmJDaGlsZHJlbiA7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIHcoXCIsIFwiKTtcblxuICAgICAgICBpZigga3dfc3RhcnQgPT09IGkpXG4gICAgICAgICAgICB3KFwie1wiKTtcblxuICAgICAgICBjb25zdCBpc0xhc3QgPSBpID09PSBtZXRhLmlkeF92YXJhcmcgJiYgaSA9PT0gbmJDaGlsZHJlbi0xO1xuICAgICAgICB3cml0ZV9hcmcoaSArIGNvZmZzZXQsIGlzTGFzdCk7XG4gICAgfVxuXG4gICAgaWYoIGt3X3N0YXJ0IDwgbmJDaGlsZHJlbilcbiAgICAgICAgdygnfSA9IHt9Jyk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlX2FyZyhub2RlOiBudW1iZXIsIGlzTGFzdDogYm9vbGVhbikge1xuICAgIFxuICAgIGNvbnN0IG9mZnNldCA9IDQqbm9kZTtcbiAgICBzZXRfanNfY3Vyc29yKG9mZnNldCArIENPREVfQkVHKTtcblxuICAgIGNvbnN0IG5hbWUgPSBWQUxVRVNbbm9kZV07XG4gICAgY29uc3QgdHlwZV9pZCA9IHR5cGUobm9kZSk7XG5cbiAgICBpZiggdHlwZV9pZCA9PT0gRlVOQ1RJT05TX0FSR1NfVkFSRyApIHtcbiAgICAgICAgaWYoIGlzTGFzdCApXG4gICAgICAgICAgICB3dGAuLi4ke25hbWV9YDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd3IoIGJpbmFyeV9qc29wKG5vZGUsIG5hbWUsICc9JywgXCJbXVwiKSApO1xuICAgIH0gZWxzZSBpZiggdHlwZV9pZCA9PT0gRlVOQ1RJT05TX0FSR1NfS1dBUkcgKSB7XG4gICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBuYW1lLCAnPScsIFwie31cIikgKTtcbiAgICB9IGVsc2UgaWYoIG5iQ2hpbGQobm9kZSkgPT09IDEgKSB7XG5cbiAgICAgICAgbGV0IGRlZnZhbDogYW55ID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICAgICAgaWYoIHJlc3VsdFR5cGUoZGVmdmFsKSA9PT0gU1RZUEVfSlNJTlQgKVxuICAgICAgICAgICAgZGVmdmFsID0gTnVtYmVyMkludChkZWZ2YWwpO1xuXG4gICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBuYW1lLCAnPScsIGRlZnZhbCkgKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIHcobmFtZSk7XG4gICAgfVxuXG4gICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0VORCk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlLCBzZXRfcHlfY29kZSwgc2V0X3B5X2Zyb21fYmVnX2VuZCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IEZVTkNUSU9OU19BUkdTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIENPREVfQkVHX0NPTCwgQ09ERV9CRUdfTElORSwgQ09ERV9FTkRfQ09MLCBDT0RFX0VORF9MSU5FLCBQWV9DT0RFLCByZXN1bHRUeXBlLCBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbi8vVE9ETzogZmFrZSBub2RlLi4uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KCkge1xuICAgIC8vIGFyZ3Mgbm9kZSBkb2Vzbid0IGV4aXN0Li4uXG4gICAgcmV0dXJuO1xufVxuXG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0FSR1NfUE9TT05MWSA9IDA7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0FSR1NfS1dBUkcgICA9IDE7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0FSR1NfS1dPTkxZICA9IDI7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0FSR1NfVkFSRyAgICA9IDM7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0FSR1NfUE9TICAgICA9IDQ7XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImFyZ3VtZW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKGRzdDogbnVtYmVyLCBub2RlOiBhbnksIFNUeXBlX2ZjdDogU1R5cGVGY3QsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICAvLyBjb21wdXRlIHRvdGFsIGFyZ3MuLi5cbiAgICBjb25zdCBfYXJncyA9IG5vZGUuYXJncztcbiAgICBjb25zdCBoYXNfdmFyYXJnID0gX2FyZ3MudmFyYXJnICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzX2t3YXJnICA9IF9hcmdzLmt3YXJnICAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFyZ3NfcG9zICAgPSBtZXRhLmFyZ3NfcG9zO1xuICAgIGNvbnN0IGFyZ3NfbmFtZXMgPSBtZXRhLmFyZ3NfbmFtZXM7XG5cbiAgICBjb25zdCB0b3RhbF9hcmdzID0gX2FyZ3MucG9zb25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfdmFyYXJnXG4gICAgICAgICAgICAgICAgICAgICArIF9hcmdzLmt3b25seWFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICArICtoYXNfa3dhcmc7XG5cbiAgICBzZXRUeXBlKGRzdCwgRlVOQ1RJT05TX0FSR1MpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIHRvdGFsX2FyZ3MpOyAvLyBhcmdzXG5cbiAgICBjb25zdCBwb3NfZGVmYXVsdHMgPSBub2RlLmFyZ3MuZGVmYXVsdHM7XG4gICAgY29uc3QgcG9zb25seSA9IF9hcmdzLnBvc29ubHlhcmdzO1xuICAgIGNvbnN0IHBvcyAgICAgPSBfYXJncy5hcmdzO1xuXG4gICAgLy8gcG9zb25seVxuICAgIGxldCBkb2Zmc2V0ID0gcG9zX2RlZmF1bHRzLmxlbmd0aCAtIHBvc29ubHkubGVuZ3RoIC0gcG9zLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zb25seS5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29udmVydF9hcmcoaSArIGNvZmZzZXQsIHBvc29ubHlbaV0sIHBvc19kZWZhdWx0c1tpIC0gZG9mZnNldF0sIEZVTkNUSU9OU19BUkdTX1BPU09OTFksIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbcG9zb25seVtpXS5hcmddID0gcmVzdWx0VHlwZShpK2NvZmZzZXQpO1xuICAgIH1cblxuICAgIC8vIHBvc1xuICAgIGxldCBvZmZzZXQgPSBwb3Nvbmx5Lmxlbmd0aDtcbiAgICAgIGRvZmZzZXQgLT0gcG9zb25seS5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvcy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnZlcnRfYXJnKG9mZnNldCArIGNvZmZzZXQsIHBvc1tpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgRlVOQ1RJT05TX0FSR1NfUE9TLCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGFyZ3NfbmFtZXNbb2Zmc2V0KytdID0gcG9zW2ldLmFyZztcbiAgICB9XG5cbiAgICBtZXRhLmlkeF92YXJhcmcgPSBvZmZzZXQ7XG5cbiAgICAvLyB2YXJhcmdcbiAgICBpZiggaGFzX3ZhcmFyZyApIHtcbiAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgICAgICBjb252ZXJ0X2FyZyhvZmZzZXQgKyBjb2Zmc2V0LCBfYXJncy52YXJhcmcsIHVuZGVmaW5lZCwgRlVOQ1RJT05TX0FSR1NfVkFSRywgY29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICArK29mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyA9IG9mZnNldDtcblxuICAgICAgICBjb25zdCBuYl9wb3NfZGVmYXVsdHMgPSBNYXRoLm1pbihwb3NfZGVmYXVsdHMubGVuZ3RoLCBwb3MubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgaGFzX290aGVycyA9IHBvc19kZWZhdWx0cy5sZW5ndGggPiBwb3MubGVuZ3RoIHx8IHRvdGFsX2FyZ3MgIT09IG9mZnNldDtcblxuICAgICAgICBpZiggbmJfcG9zX2RlZmF1bHRzID4gMSB8fCBuYl9wb3NfZGVmYXVsdHMgPT09IDEgJiYgaGFzX290aGVycylcbiAgICAgICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgLT0gbmJfcG9zX2RlZmF1bHRzO1xuICAgIH1cblxuICAgIGxldCBjdXRfb2ZmICAgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBjdXRfb2ZmID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpXG4gICAgICAgIGN1dF9vZmYgPSBtZXRhLmlkeF92YXJhcmc7XG4gICAgZm9yKGxldCBpID0gcG9zb25seS5sZW5ndGg7IGkgPCBjdXRfb2ZmOyArK2kpXG4gICAgICAgIGFyZ3NfcG9zW1ZBTFVFU1tpICsgY29mZnNldF1dID0gaTtcblxuICAgIGNvbnN0IGVuZCA9IG1ldGEuaWR4X3ZhcmFyZyAtIGN1dF9vZmY7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGVuZDsgKytpKVxuICAgICAgICBhcmdzX3Bvc1tWQUxVRVNbaSArIGNvZmZzZXRdXSA9IC0xO1xuXG4gICAgLy9UT0RPOiBpZHhfZW5kX3BvcyAoaWYgZGVmYXVsdCBhbmQgbm8gaWR4X3ZhcmFyZylcblxuICAgIC8vIGt3b25seVxuICAgIGNvbnN0IGt3b25seSAgICAgID0gX2FyZ3Mua3dvbmx5YXJncztcbiAgICBjb25zdCBrd19kZWZhdWx0cyA9IF9hcmdzLmt3X2RlZmF1bHRzO1xuXG4gICAgbWV0YS5oYXNfa3cgPSBtZXRhLmlkeF92YXJhcmcgIT09IGN1dF9vZmYgfHwga3dvbmx5Lmxlbmd0aCAhPT0gMDtcblxuICAgIGRvZmZzZXQgPSBrd19kZWZhdWx0cy5sZW5ndGggLSBrd29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrd29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIFxuICAgICAgICBjb252ZXJ0X2FyZyhvZmZzZXQgKyBjb2Zmc2V0LCBrd29ubHlbaV0sIGt3X2RlZmF1bHRzW2ldLCBGVU5DVElPTlNfQVJHU19LV09OTFksIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgYXJnc19wb3Nba3dvbmx5W2ldLmFyZ10gPSAtMTtcblxuICAgICAgICArK29mZnNldDtcbiAgICB9XG5cbiAgICAvLyBrd2FyZ1xuICAgIGlmKCBoYXNfa3dhcmcgKSB7XG4gICAgICAgIFxuICAgICAgICBjb252ZXJ0X2FyZyhvZmZzZXQgKyBjb2Zmc2V0LCBfYXJncy5rd2FyZywgdW5kZWZpbmVkLCBGVU5DVElPTlNfQVJHU19LV0FSRywgY29udGV4dCk7XG5cbiAgICAgICAgbWV0YS5rd2FyZ3MgPSBfYXJncy5rd2FyZy5hcmc7XG5cbiAgICAgICAgKytvZmZzZXQ7XG4gICAgfVxuXG4gICAgLy9UT0RPLi4uXG4gICAgLypcbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG4gICAgKi9cblxuICAgIC8vVE9ETy4uLlxuXG4gICAgVkFMVUVTW2RzdF0gPSBTVHlwZV9mY3Q7XG4gICAgXG4gICAgaWYoIHRvdGFsX2FyZ3MgIT09IDApIHtcblxuICAgICAgICBzZXRfcHlfZnJvbV9iZWdfZW5kKGRzdCwgY29mZnNldCwgY29mZnNldCArIHRvdGFsX2FyZ3MgLSAxKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIGNvbnN0IHB5X29mZnNldCA9IDQqZHN0O1xuICAgICAgICBQWV9DT0RFWyBweV9vZmZzZXQgKyBDT0RFX0JFR19MSU5FIF0gPSBQWV9DT0RFWyBweV9vZmZzZXQgKyBDT0RFX0VORF9MSU5FIF0gPSBub2RlLmxpbmVubztcbiAgICAgICAgUFlfQ09ERVsgcHlfb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdID0gUFlfQ09ERVsgcHlfb2Zmc2V0ICsgQ09ERV9FTkRfQ09MICBdID0gY29sO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhkc3Q6IG51bWJlciwgbm9kZTogYW55LCBkZWZ2YWw6IGFueSwgdHlwZTpudW1iZXIsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmFyZztcblxuICAgIC8vVE9ETzogY29udmVydCBhbm5vdGF0aW9uIHR5cGUuLi5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkOyBcblxuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAxKTtcbiAgICAgICAgY29udmVydF9ub2RlKGNvZmZzZXQsIGRlZnZhbCwgY29udGV4dCk7XG5cbiAgICAgICAgaWYoIHJlc3VsdF90eXBlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCk7XG4gICAgICAgICAgICBpZihyZXN1bHRfdHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRUeXBlKGRzdCwgdHlwZSk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdF90eXBlKTtcblxuICAgIFZBTFVFU1tkc3RdID0gbmFtZTtcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbmFtZV0gPSByZXN1bHRfdHlwZTtcblxuICAgIHNldF9weV9jb2RlKGRzdCwgbm9kZSk7XG59IiwiaW1wb3J0IHsgciwgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCwgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5mdW5jdGlvbiBwcmludF9vYmoob2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBpZihrZXlzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIFtbXV07XG5cbiAgICBjb25zdCBzdHIgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgrMSk7XG4gICAgc3RyWzBdID0gYHske2tleXNbMF19OiBgO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSAgPSBgLCAke2tleXNbaV19OiBgO1xuXG4gICAgc3RyW2ldID0gXCJ9XCI7XG5cbiAgICByZXR1cm4gW3N0ciwgLi4uT2JqZWN0LnZhbHVlcyhvYmopXTtcbn1cblxuZnVuY3Rpb24gam9pbihkYXRhOiBhbnlbXSwgc2VwPVwiLCBcIikge1xuXG4gICAgaWYoZGF0YS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW1wiXCJdXTtcblxuICAgIGNvbnN0IHN0ciA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCsxKTtcbiAgICBzdHJbMF0gPSBcIlwiO1xuICAgIGxldCBpO1xuICAgIGZvcihpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyArK2kpXG4gICAgICAgIHN0cltpXSA9IHNlcDtcbiAgICBzdHJbaV0gPSBcIlwiO1xuXG4gICAgcmV0dXJuIFtzdHIsIC4uLmRhdGFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdF9jYWxsKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgbWV0YSA9IChWQUxVRVNbbm9kZV0gYXMgU1R5cGVGY3QpLl9fY2FsbF9fO1xuXG4gICAgY29uc3QgY29mZnNldCAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICBsZXQga3dfcG9zID0gbmJDaGlsZHJlbjtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICBpZiggdHlwZSggaSArIGNvZmZzZXQpID09PSBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEKSB7XG4gICAgICAgICAgICBrd19wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIGxldCBuYl9wb3MgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBuYl9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgbmJfcG9zID0gTWF0aC5tYXgobWV0YS5pZHhfdmFyYXJnLCBrd19wb3MtMSk7XG5cbiAgICBsZXQgcG9zX3NpemUgPSBuYl9wb3MrMTtcbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAgcG9zX3NpemUgPSBtZXRhLmlkeF92YXJhcmcrMjtcbiAgICBsZXQgcG9zID0gbmV3IEFycmF5KHBvc19zaXplKTtcbiAgICBcbiAgICBjb25zdCBrdyAgICA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbiAgICBjb25zdCBrd2FyZ3M6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcblxuICAgIGxldCBoYXNfa3cgPSBmYWxzZTtcblxuICAgIGlmKCBtZXRhLmhhc19rdyAmJiBtZXRhLmlkeF9lbmRfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKSB7XG5cbiAgICAgICAgY29uc3QgY3V0b2ZmID0gTWF0aC5taW4oa3dfcG9zLCBtZXRhLmlkeF92YXJhcmcpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gaSArIGNvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgdmFyZ19zdGFydCA9IG1ldGEuaWR4X3ZhcmFyZysxO1xuICAgICAgICBjb25zdCB2YXJnX25iID0ga3dfcG9zIC0gdmFyZ19zdGFydDtcbiAgICAgICAgaWYoIHZhcmdfbmIgIT09IDAgKSB7XG5cbiAgICAgICAgICAgIC8vIHRlbXBsYXRlIHN0cmluZy4uLiBbIFsuLnN0cl0sIC4uLmlkeCBdXG4gICAgICAgICAgICAvLyA9PiBbIChhKSwgKGIpLCAoYyksIChkKSBdIC4uLlxuICAgICAgICAgICAgbGV0IHN0ciA9IG5ldyBBcnJheSh2YXJnX25iICsgMSk7XG4gICAgICAgICAgICBsZXQgaWR4ID0gbmV3IEFycmF5KHZhcmdfbmIgKyAxKTtcblxuICAgICAgICAgICAgc3RyWzBdICAgICAgID0gXCJbXCI7XG5cbiAgICAgICAgICAgIGlkeFswXSAgICAgICA9IHN0cjtcbiAgICAgICAgICAgIGlkeFsxXSAgICAgICA9IGNvZmZzZXQgKyB2YXJnX3N0YXJ0O1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHZhcmdfbmI7ICsraSkge1xuICAgICAgICAgICAgICAgIHN0cltpXSAgPSBcIiwgXCI7XG4gICAgICAgICAgICAgICAgaWR4W2krMV09IGNvZmZzZXQgKyB2YXJnX3N0YXJ0ICsgaTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RyW3ZhcmdfbmJdID0gXCJdXCI7IC8vIHByZXZlbnRzIHNwYXJzZSBhcnJheSA/XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbmJfcG9zKzEpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gaSArIGNvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgYXJnc19uYW1lcyA9IG1ldGEuYXJnc19uYW1lcztcbiAgICAgICAgZm9yKGxldCBpID0gY3V0b2ZmOyBpIDwga3dfcG9zOyArK2kpXG4gICAgICAgICAgICBrd1sgYXJnc19uYW1lc1tpLTFdIF0gPSBpICsgY29mZnNldDtcblxuICAgICAgICBoYXNfa3cgPSBjdXRvZmYgIT09IGt3X3BvcztcbiAgICB9XG5cbiAgICBsZXQgaGFzX2t3YXJncyA9IGZhbHNlO1xuXG4gICAgY29uc3QgYXJnc19wb3MgPSBtZXRhLmFyZ3NfcG9zO1xuICAgIFxuXG4gICAgZm9yKGxldCBpID0ga3dfcG9zOyBpIDwgbmJDaGlsZHJlbjsgKytpKSB7XG5cbiAgICAgICAgY29uc3QgYXJnICA9IGkgKyBjb2Zmc2V0O1xuICAgICAgICBjb25zdCBuYW1lID0gVkFMVUVTW2FyZ107XG4gICAgICAgIGNvbnN0IGlkeCAgPSBhcmdzX3Bvc1sgbmFtZSBdO1xuXG4gICAgICAgIGlmKCBpZHggPj0gMCApIHtcbiAgICAgICAgICAgIHBvc1tpZHhdID0gYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNfa3cgPSB0cnVlO1xuXG4gICAgICAgIGlmKCBpZHggPT09IC0xKVxuICAgICAgICAgICAga3dbbmFtZV0gPSBhcmc7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAga3dhcmdzW25hbWVdID0gYXJnO1xuICAgICAgICAgICAgaGFzX2t3YXJncyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgb2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ga3c7XG4gICAgLy9UT0RPOiBvbmx5IHRoZSBvbmVzIGF0IC0xLi4uXG4gICAgaWYoIGhhc19rd2FyZ3MgJiYgISBtZXRhLmhhc19rdyApe1xuICAgICAgICBvYmogPSBrd2FyZ3M7XG4gICAgfSBlbHNlIGlmKCBoYXNfa3dhcmdzICkge1xuICAgICAgICBvYmpbbWV0YS5rd2FyZ3MhXSA9IHByaW50X29iaihrd2FyZ3MpO1xuICAgIH1cblxuICAgIGlmKCBoYXNfa3cgKVxuICAgICAgICBwb3NbcG9zLmxlbmd0aC0xXSA9IHByaW50X29iaihvYmopO1xuICAgIGVsc2Uge1xuICAgICAgICB3aGlsZShwb3MubGVuZ3RoID4gMCAmJiBwb3NbcG9zLmxlbmd0aC0xXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgLS1wb3MubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiByYCR7Y29mZnNldH0oJHtqb2luKHBvcyl9KWA7IC8vIGFyZ3MgP1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgd3IoIChWQUxVRVNbbm9kZV0gYXMgU1R5cGVGY3QpLl9fY2FsbF9fLnN1YnN0aXR1dGVfY2FsbCEobm9kZSkgKTtcbn0iLCJpbXBvcnQgeyBGVU5DVElPTlNfQ0FMTCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbmFtZSA9IG5vZGUuZnVuYy5pZDtcbiAgICBjb25zdCBmY3RfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSE7XG4gICAgaWYoIGZjdF90eXBlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihub2RlKTtcbiAgICAgICAgY29uc29sZS53YXJuKGNvbnRleHQubG9jYWxfc3ltYm9scyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gJHtuYW1lfSBub3QgZGVmaW5lZGApO1xuICAgIH1cblxuICAgIGNvbnN0IGZjdCA9IFNUeXBlc1tmY3RfdHlwZV07XG4gICAgY29uc3QgcmV0X3R5cGUgPSAoZmN0Ll9fY2FsbF9fIGFzIFNUeXBlRmN0U3VicykucmV0dXJuX3R5cGUoKTtcblxuICAgIHNldFR5cGUgICAgICAoZHN0LCBGVU5DVElPTlNfQ0FMTCk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJldF90eXBlKTtcbiAgICBsZXQgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSArIG5vZGUuYXJncy5sZW5ndGggKyBub2RlLmtleXdvcmRzLmxlbmd0aCk7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsrLCBub2RlLmZ1bmMsIGNvbnRleHQgKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmFyZ3MubGVuZ3RoOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0KyssIG5vZGUuYXJnc1tpXSwgY29udGV4dCApO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmtleXdvcmRzLmxlbmd0aDsgKytpKVxuICAgICAgICBjb252ZXJ0X25vZGUoY29mZnNldCsrLCBub2RlLmtleXdvcmRzW2ldLCBjb250ZXh0ICk7XG5cbiAgICBWQUxVRVNbZHN0XSA9IGZjdDtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgdyggZmlyc3RDaGlsZChub2RlKSApO1xufSIsImltcG9ydCB7IEZVTkNUSU9OU19DQUxMX0tFWVdPUkQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBGVU5DVElPTlNfQ0FMTF9LRVlXT1JEKTtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEpO1xuICAgIGNvbnZlcnRfbm9kZSAoY29mZnNldCwgbm9kZS52YWx1ZSwgY29udGV4dCApXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdFR5cGUoY29mZnNldCkpO1xuXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLmFyZztcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImtleXdvcmRcIjsiLCJpbXBvcnQgeyBOTCwgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBWQUxVRVNbbm9kZV07XG4gICAgY29uc3QgY29mZnNldCA9IGZpcnN0Q2hpbGQobm9kZSk7XG5cbiAgICB3dGBmdW5jdGlvbiAke25hbWV9KCR7Y29mZnNldH0peyR7Y29mZnNldCsxfSR7Tkx9fWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBnZXRTVHlwZUlELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IGRlZmF1bHRfY2FsbCB9IGZyb20gXCIuLi9jYWxsL2FzdDJqc1wiO1xuaW1wb3J0IHsgY29udmVydF9hcmdzIH0gZnJvbSBcIi4uL2FyZ3MvYXN0Y29udmVydFwiO1xuaW1wb3J0IHsgRlVOQ1RJT05TX0RFRiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCByZXN1bHRUeXBlLCBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbi8vIHJlcXVpcmVkIGFzIHNvbWUgc3ltYm9scyBtYXkgaGF2ZSBiZWVuIGRlY2xhcmVkIG91dCBvZiBvcmRlclxuLy8gKG5vdCBvbmx5IGZvciByZXR1cm4gdHlwZSBjb21wdXRhdGlvbilcbmZ1bmN0aW9uIGdlbmVyYXRlKGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHJ0eXBlICAgPSByZXN1bHRUeXBlKGRzdCk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMik7XG5cbiAgICAvLyBmdWNrLi4uXG4gICAgY29uc3Qgc3R5cGUgICA9IFNUeXBlc1tydHlwZV0gYXMgU1R5cGVGY3Q7XG4gICAgY29uc3QgbWV0YSAgICA9IHN0eXBlLl9fY2FsbF9fO1xuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG4gICAgY29udGV4dC5wYXJlbnRfbm9kZV9jb250ZXh0ID0gZHN0OyAvLyA8LSBoZXJlXG5cbiAgICAvLyBmYWtlIHRoZSBub2RlLi4uID0+IGJldHRlciBkb2luZyBoZXJlIHRvIG5vdCBoYXZlIGNvbnRleHQgaXNzdWVzLlxuICAgIGNvbnZlcnRfYXJncyhjb2Zmc2V0LCBub2RlLCBzdHlwZSwgY29udGV4dCk7XG4gICAgLy8gYWxyZWFkeSBkb25lIGluIGNvbnZlcnRfYXJnc1xuICAgIC8qIGNvbnN0IGNfb2Zmc2V0ICA9IGZpcnN0Q2hpbGQoY29mZnNldCk7XG4gICAgY29uc3QgY19lbmQgICAgID0gY19vZmZzZXQgKyBuYkNoaWxkKGNvZmZzZXQpO1xuICAgIGZvcihsZXQgaSA9IGNfb2Zmc2V0OyBpIDwgY19lbmQ7ICsraSlcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW1ZBTFVFU1tpXV0gPSByZXN1bHRUeXBlKGkpOyovXG5cbiAgICAvLyB0ZWxsIGJvZHkgdGhpcyBmdW5jdGlvbiBoYXMgYmVlbiBnZW5lcmF0ZWQuXG4gICAgbWV0YS5nZW5lcmF0ZSA9IHVuZGVmaW5lZDtcbiAgICAvLyBwcmV2ZW50cyByZWN1cnNpdmUgY2FsbHMgb3IgcmVhZmZlY3RhdGlvbi5cbiAgICBtZXRhLnJldHVybl90eXBlID0gdW5kZWZpbmVkIGFzIGFueTtcblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlLnJldHVybnM/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGxldCBmY3RfcmV0dXJuX3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuICAgICAgICAvLyBmb3JjZSB0aGUgdHlwZS5cbiAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSA9ICgpID0+IGZjdF9yZXR1cm5fdHlwZSE7XG4gICAgfVxuXG4gICAgY29udmVydF9ib2R5KGNvZmZzZXQrMSwgbm9kZS5ib2R5LCBjb250ZXh0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvL2NvbnN0IGlzTWV0aG9kID0gY29udGV4dC50eXBlID09PSBcImNsYXNzXCI7XG5cbiAgICBjb25zdCBTVHlwZV9mY3Q6IFNUeXBlRmN0ID0ge1xuICAgICAgICBfX25hbWVfXzogXCJmdW5jdGlvblwiLFxuICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgYXJnc19uYW1lcyAgICAgOiBuZXcgQXJyYXkobm9kZS5hcmdzLmFyZ3MubGVuZ3RoK25vZGUuYXJncy5wb3Nvbmx5YXJncy5sZW5ndGgpLFxuICAgICAgICAgICAgYXJnc19wb3MgICAgICAgOiB7fSxcbiAgICAgICAgICAgIGlkeF9lbmRfcG9zICAgIDogLTEsXG4gICAgICAgICAgICBpZHhfdmFyYXJnICAgICA6IC0xLFxuICAgICAgICAgICAgaGFzX2t3ICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIGdlbmVyYXRlLFxuICAgICAgICAgICAgcmV0dXJuX3R5cGUgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGUoZHN0LCBub2RlLCBjb250ZXh0KTsgLy8gc2hvdWxkIGJlIHRoZSBuZXcgY29udGV4dFxuICAgICAgICAgICAgICAgIHJldHVybiBTVHlwZV9mY3QuX19jYWxsX18ucmV0dXJuX3R5cGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IGRlZmF1bHRfY2FsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgU1R5cGVJRCA9IFNUeXBlcy5sZW5ndGg7XG4gICAgU1R5cGVzW1NUeXBlSURdID0gU1R5cGVfZmN0O1xuXG4gICAgLy9pZiggISBpc01ldGhvZCApIHtcbiAgICAvLyBpZiBtZXRob2QgYWRkIHRvIHNlbGZfY29udGV4dC5zeW1ib2xzID9cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IFNUeXBlSUQ7XG5cbiAgICAvLyBpbXBsaWNpdCByZXR1cm4uLi5cbiAgICBjb25zdCBsYXN0X3R5cGUgICA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdLmNvbnN0cnVjdG9yLiRuYW1lO1xuICAgIGlmKCBsYXN0X3R5cGUgIT09IFwiUmV0dXJuXCIgJiYgbGFzdF90eXBlICE9PSBcIlJhaXNlXCIgKSB7XG5cbiAgICAgICAgY29uc3QgZmFrZV9ub2RlID0ge1xuICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICAkbmFtZTogXCJSZXR1cm5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsaW5lbm86IG5vZGUuZW5kX2xpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm86IG5vZGUuZW5kX2xpbmVubyxcbiAgICAgICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmVuZF9jb2xfb2Zmc2V0LFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IG5vZGUuZW5kX2NvbF9vZmZzZXQsXG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5ib2R5LnB1c2goIGZha2Vfbm9kZSApO1xuICAgIH1cblxuICAgIHNldFR5cGUgICAgICAoZHN0LCBGVU5DVElPTlNfREVGKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1R5cGVJRCk7XG5cbiAgICBWQUxVRVNbZHN0XSA9IG5vZGUubmFtZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICByZXR1cm4gd3RgX2JfLmFzc2VydCgke2ZpcnN0Q2hpbGQobm9kZSl9KWA7XG59IiwiaW1wb3J0IHsgS0VZV09SRFNfQVNTRVJUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIEtFWVdPUkRTX0FTU0VSVCk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSk7XG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUudGVzdCwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMoXzogbnVtYmVyKSB7XG4gICAgdyhcImJyZWFrXCIpO1xufSIsImltcG9ydCB7IEtFWVdPUkRTX0JSRUFLIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHNldFR5cGUoZHN0LCBLRVlXT1JEU19CUkVBSyk7XG5cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJyZWFrXCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIHcoXCJjb250aW51ZVwiKTtcbn0iLCJpbXBvcnQgeyBLRVlXT1JEU19DT05USU5VRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBLRVlXT1JEU19DT05USU5VRSk7XG5cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnRpbnVlXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIGNvbnN0IHZhbHVlID0gVkFMVUVTW25vZGVdO1xuICAgIFxuICAgIHcodmFsdWVbMF0pXG5cbiAgICBpZiggdmFsdWVbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdyhcIjogXCIsIHZhbHVlWzFdKTtcbn0iLCJpbXBvcnQgeyBLRVlXT1JEU19JTVBPUlRfQUxJQVMgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBLRVlXT1JEU19JTVBPUlRfQUxJQVMpO1xuICAgIFxuICAgIFZBTFVFU1tkc3RdID0gW25vZGUubmFtZSwgbm9kZS5hc25hbWVdO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiYWxpYXNcIl07IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCJjb25zdCB7XCIpO1xuXG4gICAgY29uc3QgY29mZnNldCA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmJDaGlsZHJlbjsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAgdyhcIiwgXCIpO1xuICAgICAgICB3KGkgKyBjb2Zmc2V0KTtcbiAgICB9XG5cbiAgICB3KCd9ID0gJyk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IFZBTFVFU1tub2RlXTtcbiAgICBcbiAgICBpZih2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgdyhcIl9fU0JSWVRIT05fXy5nZXRNb2R1bGVzKClcIik7XG4gICAgZWxzZVxuICAgICAgICB3dGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt2YWx1ZX1cIilgO1xufSIsImltcG9ydCB7IEtFWVdPUkRTX0lNUE9SVCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIEtFWVdPUkRTX0lNUE9SVCk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUubmFtZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkgKyBjb2Zmc2V0LCBub2RlLm5hbWVzW2ldLCBjb250ZXh0KTtcblxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS5tb2R1bGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiSW1wb3J0XCIsIFwiSW1wb3J0RnJvbVwiXTsiLCJpbXBvcnQgeyB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3dGB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7Zmlyc3RDaGlsZChub2RlKX0pYDtcbn0iLCJpbXBvcnQgeyBLRVlXT1JEU19SQUlTRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBLRVlXT1JEU19SQUlTRSk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSk7XG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUuZXhjLCBjb250ZXh0KTtcblxufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL29wZXJhdG9ycy89X2luaXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89X2luaXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNSBmcm9tIFwiLi9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4va2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI3IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI3IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOSBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9mdW5jdGlvbnMvYXJncy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzEgZnJvbSBcIi4vZnVuY3Rpb25zL2FyZ3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdGVybmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzUgZnJvbSBcIi4vY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM2IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM3IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3JfcmFuZ2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM3IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3JfcmFuZ2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzggZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzggZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zOSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzkgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNDAgZnJvbSBcIi4vYm9keS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNDAgZnJvbSBcIi4vYm9keS9hc3QyanMudHNcIjtcblxuXG5leHBvcnQgY29uc3QgU1lNQk9MID0gMDtcbmV4cG9ydCBjb25zdCBTVFJVQ1RTX1RVUExFID0gMTtcbmV4cG9ydCBjb25zdCBTVFJVQ1RTX0xJU1QgPSAyO1xuZXhwb3J0IGNvbnN0IFNUUlVDVFNfRElDVCA9IDM7XG5leHBvcnQgY29uc3QgUkVUVVJOID0gNDtcbmV4cG9ydCBjb25zdCBQQVNTID0gNTtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfVU5BUlkgPSA2O1xuZXhwb3J0IGNvbnN0IE9QRVJBVE9SU19DT01QQVJFID0gNztcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfQk9PTEVBTiA9IDg7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0JJTkFSWSA9IDk7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0FUVFIgPSAxMDtcbmV4cG9ydCBjb25zdCBPUEVSQVRPUlNfX0JSQUNLRVRTID0gMTE7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX0FTU0lHTk9QID0gMTI7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX19FUV9JTklUID0gMTM7XG5leHBvcnQgY29uc3QgT1BFUkFUT1JTX19FUSA9IDE0O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX1NUUiA9IDE1O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0lOVCA9IDE2O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0ZMT0FUID0gMTc7XG5leHBvcnQgY29uc3QgTElURVJBTFNfRl9TVFJJTkcgPSAxODtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSA9IDE5O1xuZXhwb3J0IGNvbnN0IExJVEVSQUxTX0JPT0wgPSAyMDtcbmV4cG9ydCBjb25zdCBMSVRFUkFMU19OT05FID0gMjE7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfUkFJU0UgPSAyMjtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19JTVBPUlQgPSAyMztcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19JTVBPUlRfQUxJQVMgPSAyNDtcbmV4cG9ydCBjb25zdCBLRVlXT1JEU19DT05USU5VRSA9IDI1O1xuZXhwb3J0IGNvbnN0IEtFWVdPUkRTX0JSRUFLID0gMjY7XG5leHBvcnQgY29uc3QgS0VZV09SRFNfQVNTRVJUID0gMjc7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0RFRiA9IDI4O1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19DQUxMID0gMjk7XG5leHBvcnQgY29uc3QgRlVOQ1RJT05TX0NBTExfS0VZV09SRCA9IDMwO1xuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19BUkdTID0gMzE7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1dISUxFID0gMzI7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1RSWUJMT0NLID0gMzM7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIID0gMzQ7XG5leHBvcnQgY29uc3QgQ09OVFJPTEZMT1dTX1RFUk5BUlkgPSAzNTtcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfSUZCTE9DSyA9IDM2O1xuZXhwb3J0IGNvbnN0IENPTlRST0xGTE9XU19GT1JfUkFOR0UgPSAzNztcbmV4cG9ydCBjb25zdCBDT05UUk9MRkxPV1NfRk9SID0gMzg7XG5leHBvcnQgY29uc3QgQ0xBU1NfQ0xBU1NERUYgPSAzOTtcbmV4cG9ydCBjb25zdCBCT0RZID0gNDA7XG5cbmltcG9ydCB0eXBlIHtUX0FTVENPTlZFUlQsIFRfQVNUMkpTfSBmcm9tICcuLydcblxuZXhwb3J0IGNvbnN0IEFTVF9DT05WRVJUOiBUX0FTVENPTlZFUlRbXSA9IFtcblx0QVNUX0NPTlZFUlRfMCxcblx0QVNUX0NPTlZFUlRfMSxcblx0QVNUX0NPTlZFUlRfMixcblx0QVNUX0NPTlZFUlRfMyxcblx0QVNUX0NPTlZFUlRfNCxcblx0QVNUX0NPTlZFUlRfNSxcblx0QVNUX0NPTlZFUlRfNixcblx0QVNUX0NPTlZFUlRfNyxcblx0QVNUX0NPTlZFUlRfOCxcblx0QVNUX0NPTlZFUlRfOSxcblx0QVNUX0NPTlZFUlRfMTAsXG5cdEFTVF9DT05WRVJUXzExLFxuXHRBU1RfQ09OVkVSVF8xMixcblx0QVNUX0NPTlZFUlRfMTMsXG5cdEFTVF9DT05WRVJUXzE0LFxuXHRBU1RfQ09OVkVSVF8xNSxcblx0QVNUX0NPTlZFUlRfMTYsXG5cdEFTVF9DT05WRVJUXzE3LFxuXHRBU1RfQ09OVkVSVF8xOCxcblx0QVNUX0NPTlZFUlRfMTksXG5cdEFTVF9DT05WRVJUXzIwLFxuXHRBU1RfQ09OVkVSVF8yMSxcblx0QVNUX0NPTlZFUlRfMjIsXG5cdEFTVF9DT05WRVJUXzIzLFxuXHRBU1RfQ09OVkVSVF8yNCxcblx0QVNUX0NPTlZFUlRfMjUsXG5cdEFTVF9DT05WRVJUXzI2LFxuXHRBU1RfQ09OVkVSVF8yNyxcblx0QVNUX0NPTlZFUlRfMjgsXG5cdEFTVF9DT05WRVJUXzI5LFxuXHRBU1RfQ09OVkVSVF8zMCxcblx0QVNUX0NPTlZFUlRfMzEsXG5cdEFTVF9DT05WRVJUXzMyLFxuXHRBU1RfQ09OVkVSVF8zMyxcblx0QVNUX0NPTlZFUlRfMzQsXG5cdEFTVF9DT05WRVJUXzM1LFxuXHRBU1RfQ09OVkVSVF8zNixcblx0QVNUX0NPTlZFUlRfMzcsXG5cdEFTVF9DT05WRVJUXzM4LFxuXHRBU1RfQ09OVkVSVF8zOSxcblx0QVNUX0NPTlZFUlRfNDAsXG5dXG5cbmV4cG9ydCBjb25zdCBBU1QySlM6IFRfQVNUMkpTW10gPSBbXG5cdEFTVDJKU18wLFxuXHRBU1QySlNfMSxcblx0QVNUMkpTXzIsXG5cdEFTVDJKU18zLFxuXHRBU1QySlNfNCxcblx0QVNUMkpTXzUsXG5cdEFTVDJKU182LFxuXHRBU1QySlNfNyxcblx0QVNUMkpTXzgsXG5cdEFTVDJKU185LFxuXHRBU1QySlNfMTAsXG5cdEFTVDJKU18xMSxcblx0QVNUMkpTXzEyLFxuXHRBU1QySlNfMTMsXG5cdEFTVDJKU18xNCxcblx0QVNUMkpTXzE1LFxuXHRBU1QySlNfMTYsXG5cdEFTVDJKU18xNyxcblx0QVNUMkpTXzE4LFxuXHRBU1QySlNfMTksXG5cdEFTVDJKU18yMCxcblx0QVNUMkpTXzIxLFxuXHRBU1QySlNfMjIsXG5cdEFTVDJKU18yMyxcblx0QVNUMkpTXzI0LFxuXHRBU1QySlNfMjUsXG5cdEFTVDJKU18yNixcblx0QVNUMkpTXzI3LFxuXHRBU1QySlNfMjgsXG5cdEFTVDJKU18yOSxcblx0QVNUMkpTXzMwLFxuXHRBU1QySlNfMzEsXG5cdEFTVDJKU18zMixcblx0QVNUMkpTXzMzLFxuXHRBU1QySlNfMzQsXG5cdEFTVDJKU18zNSxcblx0QVNUMkpTXzM2LFxuXHRBU1QySlNfMzcsXG5cdEFTVDJKU18zOCxcblx0QVNUMkpTXzM5LFxuXHRBU1QySlNfNDAsXG5dXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV85KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8xNyk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjIpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI3KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8zMyk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgdyhcIm51bGxcIik7XG59IiwiaW1wb3J0IHsgTElURVJBTFNfTk9ORSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFJlc3VsdFR5cGUsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1RZUEVfTk9ORVRZUEUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19OT05FKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1RZUEVfTk9ORVRZUEUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBhZGRTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnTm9uZVR5cGUnLCB7fSk7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIHcoIFZBTFVFU1tub2RlXSApO1xufSIsImltcG9ydCB7IExJVEVSQUxTX0JPT0wgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgc2V0VHlwZShkc3QsIExJVEVSQUxTX0JPT0wpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCBTVFlQRV9CT09MKTtcbiAgICBcbiAgICBWQUxVRVNbZHN0XSA9IG5vZGUudmFsdWU7IC8vIFRPRE86IDIgdHlwZXMgaW5zdGVhZCBvZiBvbmUgP1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQ21wT3BzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IGFkZFNUeXBlICB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnYm9vbCcsIHtcbiAgICAuLi5nZW5DbXBPcHMoQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpLFxufSk7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCIke1wiLCBmaXJzdENoaWxkKG5vZGUpLCBcIn1cIilcbn0iLCJpbXBvcnQgeyBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSk7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS52YWx1ZSwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHNldF9qc19jdXJzb3IsIHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IENPREVfQkVHLCBDT0RFX0VORCwgZmlyc3RDaGlsZCwgbmJDaGlsZCwgcmVzdWx0VHlwZSwgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU1RZUEVfU1RSIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCJgXCIpO1xuXG4gICAgY29uc3QgY29mZnNldCAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG5cbiAgICBmb3IobGV0IGkgPSBjb2Zmc2V0OyBpIDwgbmJDaGlsZHJlbiArIGNvZmZzZXQ7ICsraSkge1xuXG4gICAgICAgIGlmKCByZXN1bHRUeXBlKGkpID09PSBTVFlQRV9TVFIpIHtcblxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gNCppO1xuXG4gICAgICAgICAgICAvLyB3ZSB3cml0ZSB0aGUgY2hpbGRyZW4gZGlyZWN0bHkuLi5cbiAgICAgICAgICAgIHNldF9qc19jdXJzb3Iob2Zmc2V0ICsgQ09ERV9CRUcpO1xuICAgICAgICAgICAgdyhWQUxVRVNbaV0pO1xuICAgICAgICAgICAgc2V0X2pzX2N1cnNvcihvZmZzZXQgKyBDT0RFX0VORCk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlKGkpID09PSBMSVRFUkFMU19GX1NUUklOR19GT1JNQVRURURWQUxVRSkge1xuICAgICAgICAgICAgdyhpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICB3KFwiYFwiKTtcbn0iLCJpbXBvcnQgeyBMSVRFUkFMU19GX1NUUklORyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCBzZXRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19GX1NUUklORyk7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbm9kZS52YWx1ZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkgKyBjb2Zmc2V0LCBub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyB3IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICAvLyBmb3JjZSBzdHIgd3JpdGUgKGVsc2UgbWlnaHQgYXNzdW1lIHRoaXMgaXMgYW4gQVNUIG5vZGUgSUQpLi4uXG4gICAgdyhgJHtWQUxVRVNbbm9kZV19YCk7XG59IiwiaW1wb3J0IHsgTElURVJBTFNfRkxPQVQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1RZUEVfRkxPQVQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgc2V0VHlwZShkc3QsIExJVEVSQUxTX0ZMT0FUKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1RZUEVfRkxPQVQpO1xuICAgIFxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS52YWx1ZS52YWx1ZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb2F0MnN0cjogKGY6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiggZiA8PSAxZS01IHx8IGYgPj0gMWUxNikge1xuXG4gICAgICAgICAgICBsZXQgc3RyID0gZi50b0V4cG9uZW50aWFsKCk7XG4gICAgICAgICAgICBjb25zdCBzaWduX2lkeCA9IHN0ci5sZW5ndGgtMjtcbiAgICAgICAgICAgIGlmKHN0cltzaWduX2lkeF0gPT09ICctJyB8fCBzdHJbc2lnbl9pZHhdID09PSAnKycpXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsc2lnbl9pZHgrMSkgKyAnMCcgKyBzdHIuc2xpY2Uoc2lnbl9pZHgrMSk7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0ciA9IGYudG9TdHJpbmcoKTtcbiAgICAgICAgaWYoICEgc3RyLmluY2x1ZGVzKCcuJykpXG4gICAgICAgICAgICBzdHIgKz0gXCIuMFwiO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfU1RSIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgdHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MLCBSRVRfSUpCRjJGTE9BVCwgUkVUX0ZMT0FULCBSRVRfU1RSIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgY29uc3QgU1R5cGVfdHlwZV9mbG9hdCA9IGFkZFNUeXBlKCd0eXBlW2Zsb2F0XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9GTE9BVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gZmlyc3RDaGlsZChub2RlKSsxO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IHJlc3VsdFR5cGUob3RoZXIpO1xuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0ZMT0FUIHx8IG90aGVyX3R5cGUgPT09IFNUWVBFX0lOVClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXJfdHlwZTtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX1NUUiApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyX3ZhbHVlID0gVkFMVUVTW290aGVyXTtcblxuICAgICAgICAgICAgICAgIGlmKCB0eXBlKG90aGVyKSA9PT0gTElURVJBTFNfU1RSICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXJfdmFsdWUgPT09IFwiaW5mXCIgfHwgb3RoZXJfdmFsdWUgPT09IFwiaW5maW5pdHlcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG90aGVyX3ZhbHVlID09PSBcIi1pbmZcInx8IG90aGVyX3ZhbHVlID09PSBcIi1pbmZpbml0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBwYXJzZUZsb2F0KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb3R5cGUgPSBTVHlwZXNbb3RoZXJfdHlwZV07XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnZmxvYXQnLCB7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2Zsb2F0LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9hdDJzdHIoJHtub2RlfSlgO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycqKicsICcqJywgJy8nLCAnKycsICctJ10sIFJFVF9JSkJGMkZMT0FULFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyUnXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FULFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoWyd1Li0nXSAgICAsIFJFVF9GTE9BVCksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpLFxufSk7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyByZXN1bHRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgbGV0IHZhbHVlID0gVkFMVUVTW25vZGVdO1xuXG4gICAgaWYoIHJlc3VsdFR5cGUobm9kZSkgPT09IFNUWVBFX0lOVCApIHtcbiAgICAgICAgLy8gZm9yY2Ugc3RyIHdyaXRlIChlbHNlIG1pZ2h0IGFzc3VtZSB0aGlzIGlzIGFuIEFTVCBub2RlIElEKS4uLlxuICAgICAgICB3KGAke3ZhbHVlfW5gKTsgXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoIHR5cGVvZiB2YWx1ZSA9PT0gXCJiaWdpbnRcIiApXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuXG4gICAgLy8gZm9yY2Ugc3RyIHdyaXRlIChlbHNlIG1pZ2h0IGFzc3VtZSB0aGlzIGlzIGFuIEFTVCBub2RlIElEKS4uLlxuICAgIHcoYCR7dmFsdWV9YCk7XG59IiwiaW1wb3J0IHsgTElURVJBTFNfSU5UIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVFlQRV9JTlQgOiBTVFlQRV9KU0lOVDtcblxuICAgIHNldFR5cGUoZHN0LCBMSVRFUkFMU19JTlQpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZWFsX3R5cGUpO1xuICAgIFxuICAgIFZBTFVFU1tkc3RdID0gdmFsdWU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCByZXN1bHRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIGlkX2pzb3AsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IENPTlZFUlRfMklOVCwgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUpCRjJCT09MLCBSRVRfSUpCRjJGTE9BVCwgUkVUX0lKMklOVCwgUkVUX0lOVCwgUkVUX0lOVDJJTlQsIFJFVF9TVFIgfSBmcm9tIFwic3RydWN0cy9SZXR1cm5UeXBlRmN0c1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX3R5cGVfaW50ID0gYWRkU1R5cGUoJ3R5cGVbaW50XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9JTlQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlcikgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IGZpcnN0Q2hpbGQobm9kZSkgKyAxO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9cmVzdWx0VHlwZShvdGhlcik7XG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfSlNJTlQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX0ZMT0FUIClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoTWF0aC50cnVuYygke290aGVyfSkpYDtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUWVBFX1NUUiApIHtcblxuICAgICAgICAgICAgICAgIC8vaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAzKVxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByYEJpZ0ludChwYXJzZUludCgke290aGVyfSwgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDtcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogb3B0aW1pemUgaWYgb3RoZXIgaXMgc3RyaW5nIGxpdHRlcmFsLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgQmlnSW50KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb3R5cGUgPSBTVHlwZXNbb3RoZXJfdHlwZV07XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnaW50Jywge1xuXG4gICAgLy9UT0RPOiBmaXggdHlwZS4uLlxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfaW50LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX1NUUixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYCR7bm9kZX0udG9TdHJpbmcoKWA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKiAqL1xuICAgIC4uLmdlbkJpbmFyeU9wcyhbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgUkVUX0lKMklOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogQ09OVkVSVF8ySU5UXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyonXSwgUkVUX0lOVDJJTlQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBhLCBiKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnLyddLCBSRVRfSUpCRjJGTE9BVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogQ09OVkVSVF9JTlQyRkxPQVQsXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUX0lOVDJGTE9BVFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoWycvLyddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyICA6IENPTlZFUlRfMklOVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvdGhlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnJSddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlQsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBudW1iZXIsIHNlbGY6IG51bWJlciwgb3RoZXI6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhbJ3UuLSddLCBSRVRfSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCBbJ34nXSwgUkVUX0lOVCksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsIFJFVF9JSkJGMkJPT0wpXG4gICAgLyogKi9cblxufSk7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IHJlc3VsdFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF8ySU5ULCBDT05WRVJUX0lOVDJGTE9BVCB9IGZyb20gXCJzdHJ1Y3RzL0NvbnZlcnRlcnNcIjtcbmltcG9ydCB7IFJFVF9JSjJJTlQsIFJFVF9JSkJGMkJPT0wsIFJFVF9JSkJGMkZMT0FULCBSRVRfSU5ULCBSRVRfSlNJTlQsIFJFVF9KU0lOVDJKU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1JldHVyblR5cGVGY3RzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnanNpbnQnLCB7XG5cbiAgICAuLi5nZW5CaW5hcnlPcHMoXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiBDT05WRVJUXzJJTlQsXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiBDT05WRVJUXzJJTlRcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFsnKiddLCBSRVRfSUoySU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhLCBiKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfRkxPQVQgKVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBOdW1iZXIySW50KGEpLCAnKicsIE51bWJlcjJJbnQoYikgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8nXSwgUkVUX0lKQkYyRkxPQVQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IENPTlZFUlRfSU5UMkZMT0FUXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJy8vJ10sIFJFVF9KU0lOVDJKU0lOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG90aGVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhbJyUnXSwgUkVUX0pTSU5UMkpTSU5ULFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBudW1iZXIsIHNlbGY6IG51bWJlciwgb3RoZXI6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhbJ3UuLSddLCBSRVRfSlNJTlQsIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIHJlc3VsdFR5cGUobm9kZSkgPT09IFNUWVBFX0lOVCApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgTnVtYmVyMkludChhKSApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoWyd+J10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAgUkVUX0lOVCxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogQ09OVkVSVF8ySU5UXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULCBSRVRfSUpCRjJCT09MKVxuICAgIC8qXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sKi9cbn0pOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgd3RgJyR7VkFMVUVTW25vZGVdfSdgO1xufSIsImltcG9ydCB7IExJVEVSQUxTX1NUUiB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVFlQRV9TVFIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCk6IGZhbHNlfHZvaWQge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRUeXBlKGRzdCwgTElURVJBTFNfU1RSKTtcbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgU1RZUEVfU1RSKTtcblxuICAgIFZBTFVFU1tkc3RdID0gbm9kZS52YWx1ZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIHJlc3VsdFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHN9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQ09OVkVSVF9JTlQyRkxPQVQgfSBmcm9tIFwic3RydWN0cy9Db252ZXJ0ZXJzXCI7XG5pbXBvcnQgeyBSRVRfSUoyU1RSLCBSRVRfSU5ULCBSRVRfU1RSLCBSRVRfU1RSMkJPT0wsIFJFVF9TVFIyU1RSIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1RZUEVfU1RSLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX3R5cGVfc3RyID0gYWRkU1R5cGUoJ3R5cGVbc3RyXScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6IFJFVF9TVFIsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBmaXJzdENoaWxkKG5vZGUpKzE7XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gcmVzdWx0VHlwZShvdGhlcik7XG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1RZUEVfU1RSIClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG5cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IFNUeXBlc1tvdGhlcl90eXBlXT8uX19zdHJfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtTVHlwZXNbb3RoZXJfdHlwZV0uX19uYW1lX199Ll9fc3RyX18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ3N0cicsIHtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfc3RyLFxuXG4gICAgX19sZW5fXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogUkVUX0lOVCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAoXykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHtmaXJzdENoaWxkKF8pICsgMX0ubGVuZ3RoYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAuLi5nZW5DbXBPcHMgICAoQ01QT1BTX0xJU1QsIFJFVF9TVFIyQk9PTCksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFtcIitcIl0gICAgICAsIFJFVF9TVFIyU1RSKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoW1wiKlwiXSAgICAgICwgUkVUX0lKMlNUUixcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlciAgOiBDT05WRVJUX0lOVDJGTE9BVCxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0VHlwZShhKSAhPT0gU1RZUEVfU1RSIClcbiAgICAgICAgICAgICAgICAgICAgW2EsYl0gPSBbYixhXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByYCR7YX0ucmVwZWF0KCR7Yn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG59KTsiLCJpbXBvcnQgeyB3LCB3dCB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQsIHJlc3VsdFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVFlQRV9JTlQsIFNUWVBFX0pTSU5UIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICBcbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICB3dGAke2krY29mZnNldH0gPSBgO1xuXG4gICAgbGV0IHJjaGlsZDogYW55ID0gY29mZnNldDtcbiAgICBpZiggcmVzdWx0VHlwZShjb2Zmc2V0KSA9PT0gU1RZUEVfSlNJTlQgJiYgcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChjb2Zmc2V0KTtcblxuICAgIHcocmNoaWxkKTtcbn0iLCJpbXBvcnQgeyBPUEVSQVRPUlNfX0VRLCBTWU1CT0wgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgdHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBpZiggICAgY29udGV4dC50eXBlICE9PSBcImNsYXNzXCJcbiAgICAgICAgJiYgdGFyZ2V0c1swXS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJOYW1lXCJcbiAgICAgICAgJiYgISh0YXJnZXRzWzBdLmlkIGluIGNvbnRleHQubG9jYWxfc3ltYm9scylcbiAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfX0VRKTtcblxuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSB0YXJnZXRzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS52YWx1ZSwgY29udGV4dCk7IC8vIHJpZ2h0XG4gICAgbGV0IHJ0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJlc3VsdF90eXBlICE9PSBydHlwZSApXG4gICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJ0eXBlO1xuICAgICAgICBpZiggcnR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0X3R5cGUpO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5iQ2hpbGRyZW47ICsraSkge1xuXG4gICAgICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0K2ksIHRhcmdldHNbaS0xXSwgY29udGV4dCApO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0c1tpLTFdLmlkXSA9IHJlc3VsdF90eXBlO1xuXG4vKlxuICAgICAgICAvLyBjb3VsZCBiZSBpbXByb3ZlZCBJIGd1ZXNzLlxuICAgICAgICBpZiggdHlwZShpK2NvZmZzZXQpID09PSBTWU1CT0wpIHtcbiAgICBcbiAgICAgICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgICAgICBjb25zdCBsdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tpK2NvZmZzZXRdO1xuICAgICAgICAgICAgaWYoIGx0eXBlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGx0eXBlICE9PSAwICYmIHJ0eXBlICE9PSBsdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4qL1xuICAgIH1cbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkLCByZXN1bHRUeXBlIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfSU5ULCBTVFlQRV9KU0lOVCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG4gICAgXG4gICAgdyhcInZhciBcIik7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICB3dGAke2krY29mZnNldH0gPSBgO1xuXG4gICAgbGV0IHJjaGlsZDogYW55ID0gY29mZnNldDtcbiAgICBpZiggcmVzdWx0VHlwZShjb2Zmc2V0KSA9PT0gU1RZUEVfSlNJTlQgJiYgcmVzdWx0VHlwZShub2RlKSA9PT0gU1RZUEVfSU5UIClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChjb2Zmc2V0KTtcblxuICAgIHcocmNoaWxkKTtcbn0iLCJpbXBvcnQgeyBPUEVSQVRPUlNfX0VRX0lOSVQgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGdldFNUeXBlSUQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogZmFsc2V8dm9pZCB7XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBpZiggICAgY29udGV4dC50eXBlID09PSBcImNsYXNzXCJcbiAgICAgICAgfHwgdGFyZ2V0c1swXS5jb25zdHJ1Y3Rvci4kbmFtZSAhPT0gXCJOYW1lXCJcbiAgICAgICAgfHwgdGFyZ2V0c1swXS5pZCBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHNcbiAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfX0VRX0lOSVQpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSB0YXJnZXRzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS52YWx1ZSwgY29udGV4dCk7IC8vIHJpZ2h0XG4gICAgbGV0IHJ0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZUlEKGFubm90YXRpb24pO1xuXG5cbiAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmVzdWx0X3R5cGUgIT09IHJ0eXBlIClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJ0eXBlO1xuICAgICAgICBpZiggcnR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVFlQRV9JTlQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0X3R5cGUpO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5iQ2hpbGRyZW47ICsraSkge1xuICAgICAgICBjb252ZXJ0X25vZGUoY29mZnNldCtpLCB0YXJnZXRzW2ktMV0sIGNvbnRleHQgKTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldHNbaS0xXS5pZF0gPSByZXN1bHRfdHlwZTtcbiAgICB9XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQXNzaWduT3BlcmF0b3JzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgbGV0IG9wID0gQXNzaWduT3BlcmF0b3JzW1ZBTFVFU1tub2RlXSBhcyBrZXlvZiB0eXBlb2YgQXNzaWduT3BlcmF0b3JzXTtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tyZXN1bHRUeXBlKGNvZmZzZXQpXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJlc3VsdFR5cGUoY29mZnNldCsxKSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVFlQRV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3Jlc3VsdFR5cGUoY29mZnNldCsxKX0gJHtvcH09ICR7cmVzdWx0VHlwZShjb2Zmc2V0KX0gTk9UIElNUExFTUVOVEVEIWApO1xuICAgICAgICAvKlxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBjb2Zmc2V0LCBjb2Zmc2V0KzEpICk7XG59IiwiaW1wb3J0IHsgT1BFUkFUT1JTX0FTU0lHTk9QIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHJlc3VsdFR5cGUsIHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJweW5hbWVdO1xuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIFZBTFVFU1tkc3RdID0gb3A7XG5cbiAgICBzZXRUeXBlKGRzdCwgT1BFUkFUT1JTX0FTU0lHTk9QKTtcbiAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAyKTtcblxuICAgIGNvbnZlcnRfbm9kZShjb2Zmc2V0LCAgIG5vZGUudGFyZ2V0LCBjb250ZXh0KTtcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsxLCBub2RlLnZhbHVlLCAgY29udGV4dCk7XG5cbiAgICBzZXRSZXN1bHRUeXBlKGRzdCwgcmVzdWx0VHlwZShjb2Zmc2V0KSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHd0IH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCB9IGZyb20gXCJkb3BcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIFxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgd3RgJHtjb2Zmc2V0fVske2NvZmZzZXQrMX1dYDtcbn0iLCJpbXBvcnQgeyBPUEVSQVRPUlNfX0JSQUNLRVRTIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIE9QRVJBVE9SU19fQlJBQ0tFVFMpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDIpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsICAgbm9kZS52YWx1ZSwgY29udGV4dCksXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQrMSwgbm9kZS5zbGljZSwgY29udGV4dClcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3dGAke2ZpcnN0Q2hpbGQobm9kZSl9LiR7VkFMVUVTW25vZGVdfWA7XG59IiwiaW1wb3J0IHsgT1BFUkFUT1JTX0FUVFIgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBzZXRUeXBlKGRzdCwgT1BFUkFUT1JTX0FUVFIpO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIDEpO1xuXG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgVkFMVUVTW2RzdF0gPSBub2RlLmF0dHI7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gZmlyc3RDaGlsZChub2RlKTtcbiAgICBcbiAgICBjb25zdCBtZXRob2QgPSBTVHlwZXNbcmVzdWx0VHlwZShjb2Zmc2V0KV0hW1ZBTFVFU1tub2RlXV0gYXMgU1R5cGVGY3RTdWJzO1xuICAgIHdyKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBjb2Zmc2V0LCBjb2Zmc2V0KzEpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlLCBzd2FwQVNUTm9kZXMgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19CSU5BUlkgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJweW5hbWVdO1xuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgc2V0VHlwZShkc3QsIE9QRVJBVE9SU19CSU5BUlkpO1xuXG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMik7XG4gICAgY29udmVydF9ub2RlKGNvZmZzZXQgICwgbm9kZS5sZWZ0ICwgY29udGV4dCk7IC8vIGxlZnRcbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCsxLCBub2RlLnJpZ2h0LCBjb250ZXh0KTsgLy8gcmlnaHRcblxuICAgIGNvbnN0IGx0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KTtcbiAgICBjb25zdCBydHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCsxKTtcblxuICAgIGxldCB0eXBlID0gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBTVHlwZXNbbHR5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocnR5cGUpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBQYXJhbWV0ZXJzPHR5cGVvZiByZXZlcnNlZF9vcGVyYXRvcj5bMF0pO1xuICAgICAgICBtZXRob2QgPSBTVHlwZXNbcnR5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGx0eXBlISk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtydHlwZX0gJHtvcH0gJHtsdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIHN3YXBBU1ROb2Rlcyhjb2Zmc2V0LCBjb2Zmc2V0KzEpOyAvLyBjb3N0bHksIHVzZSAyIGFzdDJqcyBpbnN0ZWFkID9cbiAgICB9XG5cbiAgICBWQUxVRVNbZHN0XSA9IG9wO1xuXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHR5cGUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9mbG9hdDogKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCBhL2IgKTtcbiAgICB9LFxuICAgIGZsb29yZGl2X2ludDogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIC0tcmVzdWx0O1xuICAgIH0sXG4gICAgbW9kX2Zsb2F0OiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcblxuICAgICAgICBjb25zdCBtb2QgPSAoYSAlIGIgKyBiKSAlIGI7XG4gICAgICAgIGlmKCBtb2QgPT09IDAgJiYgYiA8IDAgKVxuICAgICAgICAgICAgcmV0dXJuIC0wO1xuICAgICAgICByZXR1cm4gbW9kO1xuICAgIH0sXG4gICAgbW9kX2ludDogPFQ+KGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChhICUgYiArIGIpICUgYjtcbiAgICB9XG59IiwiaW1wb3J0IHsgd3IgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBtdWx0aV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3ciggbXVsdGlfanNvcChub2RlLCBWQUxVRVNbbm9kZV0pICk7XG59IiwiaW1wb3J0IHsgT1BFUkFUT1JTX0JPT0xFQU4gfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfQk9PTEVBTik7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUudmFsdWVzLmxlbmd0aDtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gYWRkQ2hpbGQoZHN0LCBuYkNoaWxkcmVuKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpICsgY29mZnNldCwgbm9kZS52YWx1ZXNbaV0sIGNvbnRleHQgKVxuXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdFR5cGUoY29mZnNldCkgKTtcbiAgICBcbiAgICBWQUxVRVNbZHN0XSA9IGJuYW1lMmpzb3Bbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSBhcyBrZXlvZiB0eXBlb2YgYm5hbWUyanNvcF07XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHcsIHdyIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgcmVzdWx0VHlwZSwgVkFMVUVTIH0gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5mdW5jdGlvbiBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZTogbnVtYmVyLCBsZWZ0Om51bWJlciwgb3A6IHN0cmluZywgcmlnaHQ6IG51bWJlcikge1xuICAgIFxuICAgIGxldCByZXZlcnNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJ0eXBlID0gcmVzdWx0VHlwZShyaWdodCk7XG4gICAgY29uc3QgbHR5cGUgPSByZXN1bHRUeXBlKGxlZnQpO1xuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tsdHlwZV0/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocnR5cGUhKTtcblxuICAgIGlmKCB0eXBlID09PSBTVFlQRV9OT1RfSU1QTEVNRU5URUQpIHtcblxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBQYXJhbWV0ZXJzPHR5cGVvZiByZXZlcnNlZF9vcGVyYXRvcj5bMF0pO1xuICAgICAgICBtZXRob2QgPSBTVHlwZXNbcnR5cGVdPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUWVBFX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICBcbiAgICBjb25zdCB2YWx1ZSA9IFZBTFVFU1tub2RlXTtcblxuICAgIGNvbnN0IGNvZmZzZXQgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwIClcbiAgICAgICAgICAgIHcoJyAmJiAnKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHZhbHVlW2ldO1xuICAgICAgICBjb25zdCBsZWZ0ICA9IGkrY29mZnNldDtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBpKzErY29mZnNldDtcblxuICAgICAgICBpZiggb3AgPT09ICdpcycgKSB7XG4gICAgICAgICAgICB3ciggYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwgJz09PScsIHJpZ2h0KSApO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9wID09PSAnaXMgbm90JyApIHtcbiAgICAgICAgICAgIHdyKCBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCAnIT09JywgcmlnaHQpICk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd3IoIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCBvcCwgcmlnaHQpICk7XG4gICAgfVxufSIsImltcG9ydCB7IE9QRVJBVE9SU19DT01QQVJFIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFJlc3VsdFR5cGUsIHNldFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IGJuYW1lMnB5bmFtZVtlLmNvbnN0cnVjdG9yLiRuYW1lIGFzIGtleW9mIHR5cGVvZiBibmFtZTJweW5hbWVdO1xuICAgICAgICBpZiggb3AgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlLmNvbnN0cnVjdG9yLiRuYW1lfSBub3QgaW1wbGVtZW50ZWQhYCk7XG4gICAgICAgIHJldHVybiBvcDtcbiAgICB9KTtcbiAgICBWQUxVRVNbZHN0XSA9IG9wcztcblxuICAgIHNldFR5cGUoZHN0LCBPUEVSQVRPUlNfQ09NUEFSRSk7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUWVBFX0JPT0wpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLmNvbXBhcmF0b3JzLmxlbmd0aCArIDE7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgZm9yKGxldCBpID0gMSA7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIGNvbnZlcnRfbm9kZShpICsgY29mZnNldCwgbm9kZS5jb21wYXJhdG9yc1tpLTFdLCBjb250ZXh0KTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyB3ciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIHJlc3VsdFR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVFlQRV9KU0lOVCwgU1R5cGVzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuXG4gICAgY29uc3QgbGVmdCAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IHZhbHVlID0gVkFMVUVTW25vZGVdO1xuXG4gICAgaWYoIHZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHdyKCB1bmFyeV9qc29wKG5vZGUsICchJywgSW50Mk51bWJlcihsZWZ0LCBTVFlQRV9KU0lOVCkgKSApO1xuXG4gICAgY29uc3QgbWV0aG9kID0gU1R5cGVzW3Jlc3VsdFR5cGUobGVmdCkhXVt2YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgd3IoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQpICk7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1RZUEVfQk9PTCwgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IE9QRVJBVE9SU19VTkFSWSB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IGFkZENoaWxkLCByZXN1bHRUeXBlLCBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIE9QRVJBVE9SU19VTkFSWSk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgMSk7XG5cbiAgICBjb252ZXJ0X25vZGUoY29mZnNldCwgbm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWUgYXMga2V5b2YgdHlwZW9mIGJuYW1lMnB5bmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIFZBTFVFU1tkc3RdID0gb3A7XG5cbiAgICBpZiggb3AgPT09ICdub3QnKSB7XG5cbiAgICAgICAgc2V0UmVzdWx0VHlwZShkc3QsIFNUWVBFX0JPT0wpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IFNUeXBlc1tyZXN1bHRUeXBlKGNvZmZzZXQpXT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKCk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1RZUEVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B9ICR7cmVzdWx0VHlwZShjb2Zmc2V0KX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHR5cGUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlVuYXJ5T3BcIl07IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKG5vZGU6IG51bWJlcikge1xuICAgIHcoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIik7XG59IiwiaW1wb3J0IHsgUEFTUyB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KGRzdDogbnVtYmVyLCBub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgc2V0VHlwZShkc3QsIFBBU1MpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb2Zmc2V0ID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIGlmKCBjb2Zmc2V0ID09PSAwKVxuICAgICAgICByZXR1cm4gdyhcInJldHVybiBudWxsXCIpO1xuXG4gICAgcmV0dXJuIHd0YHJldHVybiAke2NvZmZzZXR9YDtcbn0iLCJpbXBvcnQgeyBSRVRVUk4gfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgcmVzdWx0VHlwZSwgc2V0UmVzdWx0VHlwZSwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUWVBFX05PTkVUWVBFLCBTVHlwZXMgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6bnVtYmVyLCBub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIGNvbnRleHQucGFyZW50X25vZGVfY29udGV4dFxuICAgIGxldCByZXN1bHRfdHlwZSA9IFNUWVBFX05PTkVUWVBFO1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBjb2Zmc2V0ID0gYWRkQ2hpbGQoZHN0LCAxKTtcbiAgICAgICAgY29udmVydF9ub2RlKGNvZmZzZXQsIG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCk7XG4gICAgfVxuXG4gICAgc2V0VHlwZShkc3QsIFJFVFVSTik7XG4gICAgc2V0UmVzdWx0VHlwZShkc3QsIHJlc3VsdF90eXBlKTtcblxuICAgIGNvbnN0IG1ldGEgPSAoU1R5cGVzW3Jlc3VsdFR5cGUoY29udGV4dC5wYXJlbnRfbm9kZV9jb250ZXh0ISldIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcbiAgICBpZiggbWV0YS5yZXR1cm5fdHlwZSA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgbWV0YS5yZXR1cm5fdHlwZSA9ICgpID0+IHJlc3VsdF90eXBlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmV0dXJuXCI7IiwiaW1wb3J0IHsgdywgd3QgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBmaXJzdENoaWxkLCBuYkNoaWxkIH0gZnJvbSBcImRvcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanMobm9kZTogbnVtYmVyKSB7XG5cbiAgICB3KCd7Jyk7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIGlmKCBuYkNoaWxkcmVuID4gMCApXG4gICAgICAgIHd0YCR7Y29mZnNldH06ICR7Y29mZnNldCsxfWA7XG5cbiAgICBmb3IobGV0IGkgPSAyOyBpIDwgbmJDaGlsZHJlbjsgaSs9MilcbiAgICAgICAgd3RgLCAke2krY29mZnNldH06ICR7aSsxK2NvZmZzZXR9YDtcblxuICAgIHcoJ30nKTtcbn0iLCJpbXBvcnQgeyBTVFJVQ1RTX0RJQ1QgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgc2V0VHlwZShkc3QsIFNUUlVDVFNfRElDVCk7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb252ZXJ0X25vZGUoMippK2NvZmZzZXQsIG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY29udmVydF9ub2RlKDIqaSsxK2NvZmZzZXQsIG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCJbXCIpO1xuXG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5iQ2hpbGQobm9kZSk7XG4gICAgY29uc3QgY29mZnNldCAgICA9IGZpcnN0Q2hpbGQobm9kZSk7XG4gICAgXG4gICAgaWYoIG5iQ2hpbGRyZW4gPiAwIClcbiAgICAgICAgdyhjb2Zmc2V0KTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIHcoXCIsIFwiLCBpICsgY29mZnNldCk7XG5cbiAgICB3KFwiXSlcIik7XG59IiwiaW1wb3J0IHsgU1RSVUNUU19MSVNUIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgYWRkQ2hpbGQsIHNldFR5cGUgfSBmcm9tIFwiZG9wXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgc2V0VHlwZShkc3QsIFNUUlVDVFNfTElTVCk7XG4gICAgY29uc3QgbmJDaGlsZHJlbiA9IG5vZGUuZWx0cy5sZW5ndGg7XG4gICAgY29uc3QgY29mZnNldCA9IGFkZENoaWxkKGRzdCwgbmJDaGlsZHJlbik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICBjb252ZXJ0X25vZGUoaSArIGNvZmZzZXQsIG5vZGUuZWx0c1tpXSwgY29udGV4dCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJMaXN0XCI7IiwiaW1wb3J0IHsgdyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IGZpcnN0Q2hpbGQsIG5iQ2hpbGQgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcblxuICAgIHcoXCJPYmplY3QuZnJlZXplKFtcIik7XG5cbiAgICBjb25zdCBuYkNoaWxkcmVuID0gbmJDaGlsZChub2RlKTtcbiAgICBjb25zdCBjb2Zmc2V0ICAgID0gZmlyc3RDaGlsZChub2RlKTtcblxuICAgIGlmKCBuYkNoaWxkcmVuID4gMCApXG4gICAgICAgIHcoY29mZnNldCk7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbmJDaGlsZHJlbjsgKytpKVxuICAgICAgICB3KFwiLCBcIiwgaSArIGNvZmZzZXQpO1xuXG4gICAgdyhcIl0pXCIpO1xufSIsImltcG9ydCB7IFNUUlVDVFNfVFVQTEUgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBhZGRDaGlsZCwgc2V0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChkc3Q6IG51bWJlciwgbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgc2V0VHlwZShkc3QsIFNUUlVDVFNfVFVQTEUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBub2RlLmVsdHMubGVuZ3RoO1xuICAgIGNvbnN0IGNvZmZzZXQgPSBhZGRDaGlsZChkc3QsIG5iQ2hpbGRyZW4pO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5iQ2hpbGRyZW47ICsraSlcbiAgICAgICAgY29udmVydF9ub2RlKGkgKyBjb2Zmc2V0LCBub2RlLmVsdHNbaV0sIGNvbnRleHQpO1xuXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHcgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyhub2RlOiBudW1iZXIpIHtcbiAgICB3KCBWQUxVRVNbbm9kZV0gKTtcbn0iLCJpbXBvcnQgX3JfIGZyb20gXCIuLi8uLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTWU1CT0wgfSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBzZXRSZXN1bHRUeXBlLCBzZXRUeXBlLCBWQUxVRVMgfSBmcm9tIFwiZG9wXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQoZHN0OiBudW1iZXIsIG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gMDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIHZhbHVlID09PSAnc2VsZicpXG4gICAgICAgIHZhbHVlID0gJ3RoaXMnOyAvL1RPRE8gdHlwZSBvZiBjdXJyZW50IGNvbnRleHQgISAtPiBzZWxmIGluIGxvY2FsX3N5bWJvbHMgP1xuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdmFsdWVdO1xuICAgIC8qXG4gICAgICAgIC8vVE9ETyBnbG9iYWxTeW1ib2xzXG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG4gICAgKi9cblxuICAgIHNldFR5cGUoZHN0LCBTWU1CT0wpO1xuICAgIHNldFJlc3VsdFR5cGUoZHN0LCByZXN1bHRfdHlwZSk7XG4gICAgXG4gICAgVkFMVUVTW2RzdF0gPSB2YWx1ZTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsImV4cG9ydCBjb25zdCBBUlJBWV9UWVBFICAgPSBGbG9hdDY0QXJyYXk7XG5jb25zdCBNQVhfTkJfQVNUTk9ERVMgPSAxMDU7XG5cbmV4cG9ydCBjb25zdCBDT0RFX0xJTkUgPSAwO1xuZXhwb3J0IGNvbnN0IENPREVfQ09MICA9IDE7XG5leHBvcnQgY29uc3QgQ09ERV9CRUcgID0gMDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORCAgPSAyO1xuZXhwb3J0IGNvbnN0IENPREVfQkVHX0xJTkUgPSBDT0RFX0JFRyArIENPREVfTElORTtcbmV4cG9ydCBjb25zdCBDT0RFX0JFR19DT0wgID0gQ09ERV9CRUcgKyBDT0RFX0NPTDtcbmV4cG9ydCBjb25zdCBDT0RFX0VORF9MSU5FID0gQ09ERV9FTkQgKyBDT0RFX0xJTkU7XG5leHBvcnQgY29uc3QgQ09ERV9FTkRfQ09MICA9IENPREVfRU5EICsgQ09ERV9DT0w7XG5cbmV4cG9ydCBjb25zdCBQWV9DT0RFID0gbmV3IEFSUkFZX1RZUEUoNCpNQVhfTkJfQVNUTk9ERVMpO1xuZXhwb3J0IGNvbnN0IEpTX0NPREUgPSBuZXcgQVJSQVlfVFlQRSg0Kk1BWF9OQl9BU1ROT0RFUyk7XG5cbi8vVE9ETzogaW5kaXJlY3Rpb24gb3UgcGFyIElELi4uXG5leHBvcnQgY29uc3QgVkFMVUVTID0gbmV3IEFycmF5PGFueT4oKTtcblxubGV0IE5FWFRfQVNUX05PREVfSUQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2hpbGQocGFyZW50OiBudW1iZXIsIG5iQ2hpbGQ6IG51bWJlcikge1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gcGFyZW50ICogQVNUTk9ERV9TSVpFO1xuICAgIFxuICAgIEFTVE5PREVTW29mZnNldCArIEFTVE5PREVfTkJfQ0hJTERSRU5dID0gbmJDaGlsZDtcbiAgICBjb25zdCBpZCA9IEFTVE5PREVTW29mZnNldCArIEFTVE5PREVfQ0hJTERSRU5fU1RBUlRdID0gTkVYVF9BU1RfTk9ERV9JRDtcbiAgICBORVhUX0FTVF9OT0RFX0lEICs9IG5iQ2hpbGQ7XG5cbiAgICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBU1ROb2RlKCkge1xuICAgIHJldHVybiBORVhUX0FTVF9OT0RFX0lEKys7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBU1ROb2RlcyhuYjogbnVtYmVyKSB7XG4gICAgTkVYVF9BU1RfTk9ERV9JRCArPSBuYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9wX3Jlc2V0KCkge1xuICAgIFZBTFVFUy5sZW5ndGggPSAwO1xuICAgIE5FWFRfQVNUX05PREVfSUQgPSAwO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBCVUZGRVIucmVzaXplKCAwICk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEJVRkZFUi5yZXNpemUoIEJVRkZFUl9TSVpFICk7XG59XG5cbmV4cG9ydCBjb25zdCBBU1ROT0RFX1RZUEVfSUQgICAgICAgICAgICA9IDA7IC8vIHNldCBpbml0aWFsbHlcbmV4cG9ydCBjb25zdCBBU1ROT0RFX1BBUkVOVF9PUF9QUklPUklUWSA9IDE7XG5leHBvcnQgY29uc3QgQVNUTk9ERV9DSElMRFJFTl9TVEFSVCAgICAgPSAyOyAvLyBzZXQgaWYgY2hpbGRyZW5cbmV4cG9ydCBjb25zdCBBU1ROT0RFX05CX0NISUxEUkVOICAgICAgICA9IDM7IC8vIHNldCBpZiB1bmtub3duIG5iIGNoaWxkcmVuXG5leHBvcnQgY29uc3QgQVNUTk9ERV9SRVNVTFRfVFlQRSAgICAgICAgPSA0OyAvLyBzZXQgaWYgZXhwci5cbmV4cG9ydCBjb25zdCBBU1ROT0RFX1NJWkUgICAgICAgICAgICAgICA9IDU7XG5cbmNvbnN0IEJVRkZFUl9TSVpFID0gQVNUTk9ERV9TSVpFICogOCAqIE1BWF9OQl9BU1ROT0RFUztcbi8vIEB0cy1pZ25vcmVcbmNvbnN0IEJVRkZFUiA9IG5ldyBBcnJheUJ1ZmZlcihCVUZGRVJfU0laRSwge21heEJ5dGVMZW5ndGg6IEJVRkZFUl9TSVpFfSk7XG5cbmV4cG9ydCBjb25zdCBBU1ROT0RFUyA9IG5ldyBBUlJBWV9UWVBFKEJVRkZFUik7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlKG5vZGU6IG51bWJlcikge1xuICAgIHJldHVybiBBU1ROT0RFU1tub2RlICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9UWVBFX0lEXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuYkNoaWxkKHBhcmVudDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIEFTVE5PREVTW3BhcmVudCAqIEFTVE5PREVfU0laRSArIEFTVE5PREVfTkJfQ0hJTERSRU5dO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0Q2hpbGQocGFyZW50OiBudW1iZXIpIHtcbiAgICByZXR1cm4gQVNUTk9ERVNbcGFyZW50ICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9DSElMRFJFTl9TVEFSVF07XG59XG5leHBvcnQgZnVuY3Rpb24gcmVzdWx0VHlwZShub2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gQVNUTk9ERVNbbm9kZSAqIEFTVE5PREVfU0laRSArIEFTVE5PREVfUkVTVUxUX1RZUEVdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudE9QUHJpbyhub2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gQVNUTk9ERVNbbm9kZSAqIEFTVE5PREVfU0laRSArIEFTVE5PREVfUEFSRU5UX09QX1BSSU9SSVRZXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFR5cGUobm9kZTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIEFTVE5PREVTW25vZGUgKiBBU1ROT0RFX1NJWkUgKyBBU1ROT0RFX1RZUEVfSURdID0gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0UmVzdWx0VHlwZShub2RlOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBBU1ROT0RFU1tub2RlICogQVNUTk9ERV9TSVpFICsgQVNUTk9ERV9SRVNVTFRfVFlQRV0gPSB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRQYXJlbnRPUFByaW8obm9kZTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgQVNUTk9ERVNbbm9kZSAqIEFTVE5PREVfU0laRSArIEFTVE5PREVfUEFSRU5UX09QX1BSSU9SSVRZXSA9IHZhbHVlO1xufVxuIiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7IEFTVF9DT05WRVJUIH0gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIGdldFNUeXBlSUQsIFNUeXBlcyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IGRvcF9yZXNldCwge0FTVE5PREVfUkVTVUxUX1RZUEUsIEFTVE5PREVfU0laRSwgQVNUTk9ERV9UWVBFX0lELCBBU1ROT0RFUywgQ09ERV9CRUdfQ09MLCBDT0RFX0JFR19MSU5FLCBDT0RFX0NPTCwgQ09ERV9FTkRfQ09MLCBDT0RFX0VORF9MSU5FLCBDT0RFX0xJTkUsIGNyZWF0ZUFTVE5vZGUsIGZpcnN0Q2hpbGQsIFBZX0NPREUsIHJlc3VsdFR5cGUsIFZBTFVFU30gZnJvbSBcImRvcFwiO1xuaW1wb3J0IHsgUkVUX0lOVCwgUkVUVVJOX1RZUEVfRkNUIH0gZnJvbSBcInN0cnVjdHMvUmV0dXJuVHlwZUZjdHNcIjtcblxuZXhwb3J0IHR5cGUgQVNUID0ge1xuICAgIG5vZGVzICAgOiB0eXBlb2YgQVNUTk9ERVMsXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnROb2RlKGlkOiBudW1iZXIpIHtcbiAgICBjb25zb2xlLndhcm4oe1xuICAgICAgICB0eXBlICAgICA6IEFTVE5PREVTW0FTVE5PREVfU0laRSppZCtBU1ROT0RFX1RZUEVfSURdLFxuICAgICAgICByZXRfdHlwZSA6IFNUeXBlc1tBU1ROT0RFU1tBU1ROT0RFX1NJWkUqaWQrQVNUTk9ERV9SRVNVTFRfVFlQRV1dLFxuICAgICAgICB2YWx1ZSAgICA6IFZBTFVFU1tpZF0sXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfcHlfY29kZShpZDogbnVtYmVyLCBicnl0aG9uX25vZGU6IGFueSkge1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gNCppZDtcbiAgICBQWV9DT0RFWyBvZmZzZXQgKyBDT0RFX0JFR19MSU5FIF0gPSBicnl0aG9uX25vZGUubGluZW5vO1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfQkVHX0NPTCAgXSA9IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0O1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfRU5EX0xJTkUgXSA9IGJyeXRob25fbm9kZS5lbmRfbGluZW5vO1xuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfRU5EX0NPTCAgXSA9IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9weV9jb2RlX2Zyb21fbGlzdChpZDogbnVtYmVyLCBicnl0aG9uX25vZGU6IGFueSkge1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gNCppZDtcblxuICAgIGNvbnN0IGJlZyA9IGJyeXRob25fbm9kZVswXTtcbiAgICBjb25zdCBlbmQgPSBicnl0aG9uX25vZGVbYnJ5dGhvbl9ub2RlLmxlbmd0aC0xXTtcblxuICAgIFBZX0NPREVbIG9mZnNldCArIENPREVfQkVHX0xJTkUgXSA9IGJlZy5saW5lbm87XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9CRUdfQ09MICBdID0gYmVnLmNvbF9vZmZzZXQ7XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9FTkRfTElORSBdID0gZW5kLmVuZF9saW5lbm87XG4gICAgUFlfQ09ERVsgb2Zmc2V0ICsgQ09ERV9FTkRfQ09MICBdID0gZW5kLmVuZF9jb2xfb2Zmc2V0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfcHlfZnJvbV9iZWdfZW5kKCBzcmM6IG51bWJlciwgZHN0X2JlZzogbnVtYmVyLCBkc3RfZW5kOiBudW1iZXIgKSB7XG5cbiAgICBjb25zdCBzcmNfb2Zmc2V0ID0gNCpzcmM7XG4gICAgY29uc3QgYmVnX29mZnNldCA9IDQqZHN0X2JlZztcbiAgICBjb25zdCBlbmRfb2Zmc2V0ID0gNCpkc3RfZW5kICsgMjtcblxuICAgIFBZX0NPREVbIHNyY19vZmZzZXQgKyBDT0RFX0JFR19MSU5FIF0gPSBQWV9DT0RFWyBiZWdfb2Zmc2V0ICsgQ09ERV9MSU5FIF07XG4gICAgUFlfQ09ERVsgc3JjX29mZnNldCArIENPREVfQkVHX0NPTCAgXSA9IFBZX0NPREVbIGJlZ19vZmZzZXQgKyBDT0RFX0NPTCAgXTtcblxuICAgIFBZX0NPREVbIHNyY19vZmZzZXQgKyBDT0RFX0VORF9MSU5FIF0gPSBQWV9DT0RFWyBlbmRfb2Zmc2V0ICsgQ09ERV9MSU5FIF07XG4gICAgUFlfQ09ERVsgc3JjX29mZnNldCArIENPREVfRU5EX0NPTCAgXSA9IFBZX0NPREVbIGVuZF9vZmZzZXQgKyBDT0RFX0NPTCAgXTtcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgbnVtYmVyW10+ID0ge31cblxuZm9yKGxldCBpID0gMCA7IGkgPCBBU1RfQ09OVkVSVC5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQVNUX0NPTlZFUlRbaV07XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZSkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5icnl0aG9uX25hbWUpIClcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLmJyeXRob25fbmFtZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLmJyeXRob25fbmFtZSBhcyBzdHJpbmddXG4gICAgfVxuXG4gICAgZm9yKGNvbnN0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCAgID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG4gICAgXG4gICAgY29uc3Qgbm9kZXMgPSBjb252ZXJ0X2FzdChfYXN0KVxuXG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLCAvL1RPRE86IHNsaWNlXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpIHtcblxuICAgIGRvcF9yZXNldCgpO1xuXG4gICAgY29udmVydF9ib2R5KGNyZWF0ZUFTVE5vZGUoKSwgYXN0LmJvZHksIG5ldyBDb250ZXh0KCkgKTtcblxuICAgIHJldHVybiBBU1ROT0RFUztcblxuICAgIC8qZnVuY3Rpb24gY291bnQobm9kZTogQVNUTm9kZSkge1xuXG4gICAgICAgIGxldCBzdW0gPSAxOyAvLyBjb3VudCBteXNlbGZcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kgKVxuICAgICAgICAgICAgc3VtICs9IGNvdW50KG5vZGUuY2hpbGRyZW5baV0pO1xuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4oIGNvdW50KHJlc3VsdCkgKTsqL1xufVxuXG5cbmZ1bmN0aW9uIGdldE5vZGVUeXBlKGJyeXRob25fbm9kZTogYW55KTogc3RyaW5nIHtcblxuICAgIC8vIGxpa2VseSBhIGJvZHkuXG4gICAgaWYoIEFycmF5LmlzQXJyYXkoYnJ5dGhvbl9ub2RlKSApXG4gICAgICAgIHJldHVybiBcIkJvZHlcIjtcblxuICAgIHJldHVybiBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzd2FwQVNUTm9kZXMoYTogbnVtYmVyLCBiOiBudW1iZXIgKSB7XG5cbiAgICBjb25zdCBhbyA9IEFTVE5PREVfU0laRSAqIGE7XG4gICAgY29uc3QgYm8gPSBBU1ROT0RFX1NJWkUgKiBiO1xuXG4gICAgbGV0IHQ6YW55O1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBBU1ROT0RFX1NJWkU7ICsraSkge1xuICAgICAgICB0ID0gQVNUTk9ERVNbYW8raV07XG4gICAgICAgIEFTVE5PREVTW2FvK2ldID0gQVNUTk9ERVNbYm8raV07XG4gICAgICAgIEFTVE5PREVTW2JvK2ldID0gdDtcbiAgICB9XG5cbiAgICBjb25zdCBhcCA9IDQqYTtcbiAgICBjb25zdCBicCA9IDQqYjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgIHQgPSBQWV9DT0RFW2FwK2ldO1xuICAgICAgICBQWV9DT0RFW2FwK2ldID0gUFlfQ09ERVticCtpXTtcbiAgICAgICAgUFlfQ09ERVticCtpXSA9IHQ7XG4gICAgfVxuXG4gICAgdCA9IFZBTFVFU1thXTtcbiAgICBWQUxVRVNbYV0gPSBWQUxVRVNbYl07XG4gICAgVkFMVUVTW2JdID0gdDtcblxufVxuXG5jb25zdCBib2R5ID0gbW9kdWxlcy5Cb2R5WzBdXG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkoaWQ6IG51bWJlciwgYnJ5dGhvbl9ub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIEFTVF9DT05WRVJUW2JvZHldICAgIChpZCwgYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICBzZXRfcHlfY29kZV9mcm9tX2xpc3QoaWQsIGJyeXRob25fbm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X25vZGUoaWQ6IG51bWJlciwgYnJ5dGhvbl9ub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBuYW1lID0gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlKTtcblxuICAgIGlmKG5hbWUgPT09IFwiRXhwclwiKSB7XG4gICAgICAgIGJyeXRob25fbm9kZSA9IGJyeXRob25fbm9kZS52YWx1ZTtcbiAgICAgICAgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FuZGlkYXRlcyA9IG1vZHVsZXNbbmFtZV07XG5cbiAgICBpZiggY2FuZGlkYXRlcyA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWQ6XCIsIG5hbWUpO1xuICAgICAgICBjb25zb2xlLndhcm4oYGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coIGJyeXRob25fbm9kZSApO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgaGF2ZSBtYW55IG1vZHVsZXMgZm9yIHRoZSBzYW1lIG5vZGUgdHlwZS5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYoIEFTVF9DT05WRVJUW2NhbmRpZGF0ZXNbaV1dKGlkLCBicnl0aG9uX25vZGUsIGNvbnRleHQpICE9PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBzZXRfcHlfY29kZShpZCwgYnJ5dGhvbl9ub2RlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG4gICAgY29uc3RydWN0b3IodHlwZTogXCI/XCJ8XCJjbGFzc1wifFwiZmN0XCIgPSBcIj9cIiwgcGFyZW50X2NvbnRleHQ6IENvbnRleHQgPSBSb290Q29udGV4dCkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlOyAvL1RPRE86IHJlbW92ZVxuICAgICAgICB0aGlzLmxvY2FsX3N5bWJvbHMgPSB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfc3ltYm9sc307XG4gICAgfVxuXG4gICAgbG9jYWxfc3ltYm9sczogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgICBwYXJlbnRfbm9kZV9jb250ZXh0PzogbnVtYmVyOyBcblxuICAgIHR5cGU7IC8vVE9ETzogcmVtb3ZlXG59XG5cbmNvbnN0IHR5cGVfZmN0ID0ge30gLyogZmN0IGNsYXNzID0+IHR5cGUgY2xhc3MgKi9cblxuLy9UT0RPOiBtb3ZlLi4uXG4vL1RPRE86IGJpbmFyeS91bmFyeVxuLy9UT0RPOiByZW1vdmUgcmV0dXJuX3R5cGUgKGdldCBmcm9tIHRoZSBfX3tuYW1lfV9fKVxuZnVuY3Rpb24gZ2VuVW5hcnlPcEZjdChuYW1lOiBzdHJpbmcsIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QpIHtcbiAgICBjb25zdCBvcG5hbWUgPSBgX18ke25hbWV9X19gO1xuICAgIHJldHVybiB7XG4gICAgICAgIF9fY2xhc3NfXzogdHlwZV9mY3QsXG4gICAgICAgIF9fbmFtZV9fIDogbmFtZSxcbiAgICAgICAgX19jYWxsX18gOiB7XG4gICAgICAgICAgICAvL1RPRE86IEkgbmVlZCBhIHNlbGYuLi5cbiAgICAgICAgICAgIHJldHVybl90eXBlICAgIDogcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAvLyBub3QgcmVhbGx5IDo/XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChjYWxsOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ICAgPSBmaXJzdENoaWxkKGNhbGwpKzE7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gU1R5cGVzW3Jlc3VsdFR5cGUobGVmdCldIVtvcG5hbWVdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEoY2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vVE9ETzogbm90IGEgdHlwZSAhISFcbmNvbnN0IGxlbiA9IGFkZFNUeXBlKFwibGVuXCIsIGdlblVuYXJ5T3BGY3QoXCJsZW5cIiwgUkVUX0lOVCkpO1xuXG4vLyBidWlsdGluIHN5bWJvbHMuXG4vLyBAdHMtaWdub3JlXG5jb25zdCBSb290Q29udGV4dDogQ29udGV4dCA9IHtcbiAgICB0eXBlOiBcIj9cIiBhcyBjb25zdCxcbiAgICBsb2NhbF9zeW1ib2xzOiB7XG4gICAgICAgIGludCAgOiBnZXRTVHlwZUlEKCd0eXBlW2ludF0nKSxcbiAgICAgICAgc3RyICA6IGdldFNUeXBlSUQoJ3R5cGVbc3RyXScpLFxuICAgICAgICBmbG9hdDogZ2V0U1R5cGVJRCgndHlwZVtmbG9hdF0nKSxcbiAgICAgICAgbGVuLFxuXG4gICAgICAgIC8vIGFkZCBmdW5jdGlvbnMgbGlrZSBsZW4oKSAvIHBvdygpIC8gZGl2bW9kKClcbiAgICB9XG59IHNhdGlzZmllcyBDb250ZXh0OyIsIi8vIEB0cy1ub2NoZWNrXG5cbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgYnVpbGRNb2R1bGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiX19TQlJZVEhPTl9fXCIsIGAke2pzY29kZX1cXG5yZXR1cm4gX19leHBvcnRlZF9fO2ApO1xuICAgIH1cblxuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IHRoaXMuYnVpbGRNb2R1bGUoanNjb2RlLCBhc3QpKHRoaXMpO1xuICAgIH1cblxuICAgIGdldE1vZHVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWRbbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0QVNURm9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2ZpbGVuYW1lXTsgLy9UT0RPIG1vZHVsZW5hbWU/XG4gICAgfVxuXG4gICAgZ2V0IF9yXygpIHtcbiAgICAgICAgcmV0dXJuIF9yXztcbiAgICB9XG4gICAgZ2V0IF9iXygpIHtcbiAgICAgICAgcmV0dXJuIF9iXztcbiAgICB9XG59XG5cbiIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwiLi9TVHlwZVwiO1xuaW1wb3J0IHsgU1RZUEVfRkxPQVQsIFNUWVBFX0lOVCwgU1RZUEVfSlNJTlR9IGZyb20gXCIuL1NUeXBlc1wiO1xuaW1wb3J0IHsgTElURVJBTFNfSU5UIH0gZnJvbSBcImNvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgZmlyc3RDaGlsZCwgbmJDaGlsZCwgcGFyZW50T1BQcmlvLCByZXN1bHRUeXBlLCBzZXRQYXJlbnRPUFByaW8sIHNldFJlc3VsdFR5cGUsIHR5cGUsIFZBTFVFUyB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IENvbnZlcnRlciwgTk9DT05WRVJUIH0gZnJvbSBcIi4vQ29udmVydGVyc1wiO1xuaW1wb3J0IHsgUkVUVVJOX1RZUEVfRkNUIH0gZnJvbSBcIi4vUmV0dXJuVHlwZUZjdHNcIjtcblxuZXhwb3J0IGNvbnN0IGJuYW1lMnB5bmFtZSA9IHtcbiAgICBcIlVTdWJcIjogXCJfX25lZ19fXCIsXG4gICAgXCJOb3RcIiA6IFwibm90XCIsXG5cbiAgICBcIlBvd1wiIDogXCJfX3Bvd19fXCIsXG5cbiAgICBcIk11bHRcIiAgICA6IFwiX19tdWxfX1wiLFxuICAgIFwiRGl2XCIgICAgIDogXCJfX3RydWVkaXZfX1wiLFxuICAgIFwiRmxvb3JEaXZcIjogXCJfX2Zsb29yZGl2X19cIixcbiAgICBcIk1vZFwiICAgICA6IFwiX19tb2RfX1wiLFxuXG4gICAgXCJBZGRcIiAgICAgOiBcIl9fYWRkX19cIixcbiAgICBcIlN1YlwiICAgICA6IFwiX19zdWJfX1wiLFxuXG4gICAgXCJJc1wiICAgICAgOiBcImlzXCIsXG4gICAgXCJJc05vdFwiICAgOiBcImlzIG5vdFwiLFxuICAgIFwiRXFcIiAgICAgIDogXCJfX2VxX19cIixcbiAgICBcIk5vdEVxXCIgICA6IFwiX19uZV9fXCIsXG5cbiAgICBcIkd0XCIgICAgICA6IFwiX19ndF9fXCIsXG4gICAgXCJHdEVcIiAgICAgOiBcIl9fZ2VfX1wiLFxuICAgIFwiTHRcIiAgICAgIDogXCJfX2x0X19cIixcbiAgICBcIkx0RVwiICAgICA6IFwiX19sZV9fXCIsXG5cbiAgICBcIkludmVydFwiICA6IFwiX19ub3RfX1wiLFxuXG4gICAgXCJCaXRPclwiICAgOiBcIl9fb3JfX1wiLFxuICAgIFwiQml0WG9yXCIgIDogXCJfX3hvcl9fXCIsXG4gICAgXCJCaXRBbmRcIiAgOiBcIl9fYW5kX19cIixcbiAgICBcIlJTaGlmdFwiICA6IFwiX19yc2hpZnRfX1wiLFxuICAgIFwiTFNoaWZ0XCIgIDogXCJfX2xzaGlmdF9fXCIsXG59XG5cbi8vIGFkZHMgciBleGNlcHQgZXEvbmUvKGwvZykodC9lKVxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG4vLyBhZGRzIGlcbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbi8vIGJpZ2dlciA9IG1vcmUgcHJpb3JpdHkgKDAgYnkgZGVmYXVsdCkuXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgW10sXG4gICAgWyc9J10sIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3wnXSwgIC8vVE9ET1xuICAgIFsnXiddLCAgLy9UT0RPXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJzwnLCAnPD0nLCAnPj0nLCAnPiddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnKycsICctJ10sXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJyoqJ10sICAgICAgICAgIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnIScsICcrKycsICctLScsICd+JywgJ3UuLSddLFxuXTtcblxuLypcbmh0dHBzOi8vZG9jcy5weXRob24ub3JnLzMvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNjYWxsYWJsZVxuXG4tPiBjbGFzc2VzXG5ib29sKClcbmZsb2F0KClcbmludCgpXG5zdHIoKVxuYnl0ZWFycmF5KCkgW1VpbnQ4QXJyYXldIChSVylcbmJ5dGVzKCkgICAgIFs/XSAgICAgICAgICAoUk8pIDwtIG5vIHR5cGVzIGluIEpTLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LSBVaW50OEFycmF5IHdpdGggZmxhZyA/IGZyZWV6ZSgpIFtKUyB1bnNhZmVdXG4gICAgICAgICAgICBiXCJlXFx4RkZcIiBpbnN0ZWFkIG9mIFsxMDEsMTAxXSwgZXRjLiAoMzIgPD0gYnl0IDw9IDEyNilcbnR5cGUoKVxubGlzdCgpICAgICAgW0FycmF5XVxudHVwbGUoKSAgICAgW09iamVjdC5mcm96ZW4oQXJyYXkpXVxuXG5zZXQoKSAgICAgICAvLyByZWxpZXMgb24gaGFzaCgpLi4uID0+IHNldFtsaXRlcmFsc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBzZXQoKSAvIDwtIEpTIHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgPT4gYnl0ZXMvYnl0ZWFycmF5L2V0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IFNldCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IEludGVybmFsIGtleXMoKSBzZXQgW3JlY29tcHV0ZSBoYXNoIHdoZW4gYWRkL3JlbW92ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbnRlcm5hbGx5IHN0b3JlZCBhcyBNYXAoaGFzaCwgdmFsdWUpICg/KVxuZnJvemVuc2V0KCkgICAgICAgICAgICA9PiBleHRlbmRzIHNldCB0byByZXBsYWNlIG1vZGlmaWVycy5cblxuZGljdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3N0cl0gYXMgT2JqZWN0LmNyZWF0ZShudWxsKSArIChhbmQgcHVyZSBKU09iaiBhcyBkaWN0W3N0cl0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBNYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IFNldChoYXNoKSAvIE1hcChoYXNoLCBrZXkpIC8gTWFwKGtleSwgaGFzaCkgPz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldC9zZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gTWFwKGtleSwgdmFsdWUpXG5cbm9iamVjdCgpXG5jb21wbGV4KClcbm1lbW9yeXZpZXcoKSAgICAgICAgICAgID0+IEFycmF5QnVmZmVyID9cblxuLT4gcHJpbnRcbmFzY2lpKClcbmJpbigpXG5oZXgoKVxub2N0KClcbnJlcHIoKVxuaGFzaCgpXG5cbi0+IG1hdGhzXG5hYnMoKVxuZGl2bW9kKClcbnBvdygpXG5yb3VuZCgpXG5cbi0+IGxpc3RzXG5hbGwoKVxuYW55KClcbmZpbHRlcigpXG5tYXAoKVxubWF4KClcbm1pbigpXG5zdW0oKVxubGVuKClcbmVudW1lcmF0ZSgpXG5yZXZlcnNlZCgpXG5zbGljZSgpXG5zb3J0ZWQoKVxuemlwKClcblxuLT4gaXRlclxucmFuZ2UoKVxuYWl0ZXIoKVxuaXRlcigpXG5hbmV4dCgpXG5uZXh0KClcblxuLT4gc3RyXG5vcmQoKVxuY2hyKClcbmZvcm1hdCgpXG5wcmludCgpXG5mXCJcIlxuXG5jYWxsYWJsZSgpXG5jbGFzc21ldGhvZCgpXG5zdGF0aWNtZXRob2QoKVxucHJvcGVydHkoKVxuc3VwZXIoKVxuaXNpbnN0YW5jZSgpXG5pc3N1YmNsYXNzKClcbmRlbGF0dHIoKVxuZ2V0YXR0cigpXG5oYXNhdHRyKClcbnNldGF0dHIoKVxuZGlyKClcblxuZXZhbCgpXG5leGVjKClcbmNvbXBpbGUoKVxuYnJlYWtwb2ludCgpXG5cbmdsb2JhbHMoKVxubG9jYWxzKClcbnZhcnMoKVxuX19pbXBvcnRfXygpXG5cbmlkKClcbiAgICAtPiBvbi1kZW1hbmQgd2Vha3JlZiA/XG5cbmhlbHAoKVxuaW5wdXQoKVxub3BlbigpXG5cbiovXG5cbi8qXG51bmFyeVxuLSBwb3MgKHVuYXJ5ICspXG5cbi0gYm9vbFxuLSBmbG9hdFxuLSBpbnRcbi0gc3RyXG4tIHJlcHJcblxuLSBhYnNcbi0gY2VpbFxuLSBmbG9vclxuLSByb3VuZFxuLSB0cnVuY1xuXG5iaW5hcnlcbi0gcG93L3Jwb3dcbi0gZGl2bW9kL3JkaXZtb2RcblxuY2xhc3Ncbi0gY2xhc3Ncbi0gbmV3XG4tIGluaXRcbi0gaW5pdF9zdWJjbGFzc1xuXG4tIHN1YmNsYXNzaG9vayAvLyBfX2lzaW5zdGFuY2VjaGVja19fIFxuXG4tIGRpclxuLSBkZWxhdHRyXG4tIHNldGF0dHJcbi0gZ2V0YXR0cmlidXRlXG5cbi0gZG9jXG4tIGZvcm1hdFxuLSBnZXRuZXdhcmdzXG4tIGhhc2hcbi0gaW5kZXggKD8pXG4tIHNpemVvZlxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogbnVtYmVyLCB0YXJnZXQgPSBTVFlQRV9GTE9BVCkge1xuXG4gICAgaWYoIHJlc3VsdFR5cGUoYSkgIT09IFNUWVBFX0lOVCkgLy8gYWxyZWFkeSBhIG51bWJlclxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCB0eXBlKGEpID09PSBMSVRFUkFMU19JTlQpIHtcbiAgICAgICAgLy8gaWYgYmlnaW50IGNhbid0IHNhZmVseSBjb252ZXJ0IHRvIEpTSU5ULlxuICAgICAgICBpZiggdGFyZ2V0ID09PSBTVFlQRV9GTE9BVCApXG4gICAgICAgICAgICBzZXRSZXN1bHRUeXBlKGEsIFNUWVBFX0pTSU5UKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgY29uc3QgYV92YWx1ZSA9IFZBTFVFU1thXTtcblxuICAgIGNvbnN0IGNvZmZzZXQgPSBmaXJzdENoaWxkKGEpO1xuXG4gICAgaWYoIGFfdmFsdWUgPT09ICdfX211bF9fJyB8fCBhX3ZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IHJlc3VsdFR5cGUoY29mZnNldCk7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gcmVzdWx0VHlwZShjb2Zmc2V0KzEpO1xuICAgICAgICBpZiggICAgKGx0eXBlID09PSBTVFlQRV9JTlQgfHwgbHR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICAgICAgJiYgKHJ0eXBlID09PSBTVFlQRV9JTlQgfHwgcnR5cGUgPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHNldFJlc3VsdFR5cGUoYSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCBhX3ZhbHVlID09PSAnX19uZWdfXycgJiYgcmVzdWx0VHlwZShjb2Zmc2V0KSA9PT0gU1RZUEVfSU5UKSB7XG4gICAgICAgIHNldFJlc3VsdFR5cGUoYSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCB0YXJnZXQgPT09IFNUWVBFX0ZMT0FUIClcbiAgICAgICAgcmV0dXJuIHJgTnVtYmVyKCR7YX0pYDtcblxuICAgIC8vIGludCAtPiBqc2ludCBjYXN0IGlzIGZhY3VsdGF0aXZlLi4uXG4gICAgcmV0dXJuIGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOdW1iZXIySW50KGE6IG51bWJlcikge1xuXG4gICAgaWYoIHJlc3VsdFR5cGUoYSkgPT09IFNUWVBFX0lOVClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggdHlwZShhKSA9PT0gTElURVJBTFNfSU5UKSB7XG4gICAgICAgIHNldFJlc3VsdFR5cGUoYSwgU1RZUEVfSU5UKTsgLy8gZm9yY2UgYmlnaW50IGNvbnZlcnRpb25cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBWQUxVRVNbYV0gPT09ICdfX25lZ19fJyAmJiByZXN1bHRUeXBlKGZpcnN0Q2hpbGQoYSkpID09PSBTVFlQRV9KU0lOVCkge1xuICAgICAgICBzZXRSZXN1bHRUeXBlKGEsIFNUWVBFX0lOVCk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gaTtcbiAgICBmb3IoY29uc3Qgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IG51bWJlciwgb3A6IHN0cmluZyApIHtcblxuICAgIGNvbnN0IGZpcnN0ICAgICAgPSBmaXJzdENoaWxkKG5vZGUpO1xuICAgIGNvbnN0IG5iQ2hpbGRyZW4gPSBuYkNoaWxkKG5vZGUpOyBcblxuICAgIGNvbnN0IHByaW8gICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgIGNvbnN0IHBfcHJpbyA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuXG4gICAgc2V0UGFyZW50T1BQcmlvKGZpcnN0LCBwcmlvKTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIHNldFBhcmVudE9QUHJpbyggZmlyc3QgKyBpLCBwcmlvICsgMSApO1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtmaXJzdH1gO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBuYkNoaWxkcmVuOyArK2kpXG4gICAgICAgIHJlc3VsdCA9IHJgJHtyZXN1bHR9ICYmICR7Zmlyc3QgKyBpfWA7IC8vVE9ETzogYmV0dGVyLi4uXG5cbiAgICBpZiggcF9wcmlvIDwgcHJpbyApXG4gICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gbnVsbCBvcGVyYXRpb24sIHRoZSBub2RlIGhhcyB0aGUgc2FtZSBwcmlvcml0eSBhcyBoaXMgZmF0aGVyLlxuLy8gMippbnQoMSsxKSA9PiAyKigxKzEpXG5leHBvcnQgZnVuY3Rpb24gaWRfanNvcChub2RlOiBudW1iZXIsIGE6IG51bWJlcikgeyAvLyBUT0RPIHJlbW92ZSBhcmcgP1xuXG4gICAgc2V0UGFyZW50T1BQcmlvKCBhLCBwYXJlbnRPUFByaW8obm9kZSkgKTtcblxuICAgIHJldHVybiByYCR7YX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogbnVtYmVyLCBhOiBudW1iZXJ8YW55LCBvcDogc3RyaW5nLCBiOiBudW1iZXJ8YW55KSB7XG5cbiAgICBjb25zdCAgIHByaW8gPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICBjb25zdCBwX3ByaW8gPSBwYXJlbnRPUFByaW8obm9kZSk7XG5cbiAgICBpZih0eXBlb2YgYSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgc2V0UGFyZW50T1BQcmlvKGEsIHByaW8pO1xuXG4gICAgaWYodHlwZW9mIGIgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHNldFBhcmVudE9QUHJpbyhiLCBwcmlvKTtcblxuICAgIGxldCBjbXAgPSByYCR7YX0ke29wfSR7Yn1gO1xuICAgIC8vIGlmIGZhdGhlciBoYXMgbW9yZSBwcmlvLCBhZGQgcGFyZW50aGVzaXMuXG4gICAgaWYoIHBfcHJpbyA+IHByaW8gKVxuICAgICAgICBjbXAgPSByYCgke2NtcH0pYDtcblxuICAgIHJldHVybiBjbXA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogbnVtYmVyLCBvcDogc3RyaW5nLCBhOiBudW1iZXJ8YW55KSB7XG5cbiAgICBsZXQgcm9wID0gb3A7XG4gICAgaWYoIHJvcCA9PT0gJy0nKVxuICAgICAgICByb3AgPSAndS4tJztcblxuICAgIC8vIHVuYXJ5IEpTIE9wIHByaW8gbGlzdCAoPylcbiAgICBjb25zdCBwcmlvICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W3JvcF07XG4gICAgY29uc3QgcF9wcmlvID0gcGFyZW50T1BQcmlvKG5vZGUpO1xuXG4gICAgaWYodHlwZW9mIGEgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHNldFBhcmVudE9QUHJpbyhhLCBwcmlvKTtcblxuICAgIGxldCBjbXAgPSByYCR7b3B9JHthfWA7XG4gICAgLy8gaWYgZmF0aGVyIGhhcyBtb3JlIHByaW8sIGFkZCBwYXJlbnRoZXNpcy5cbiAgICBpZiggcF9wcmlvID4gcHJpbyApXG4gICAgICAgIGNtcCA9IHJgKCR7Y21wfSlgO1xuXG4gICAgcmV0dXJuIGNtcDtcbn1cblxuXG5cbnR5cGUgR2VuVW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogQ29udmVydGVyLFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogbnVtYmVyLCBhOiBudW1iZXIpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMob3BzICAgICAgICA6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlblVuYXJ5T3BzX09wdHMgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICd1Li0nKVxuICAgICAgICAgICAgb3AgPSAnLSc7XG5cbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsID8/PSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsIG9wLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG50eXBlIEdlbkJpbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfb3RoZXIgICA/OiBDb252ZXJ0ZXIsXG4gICAgY29udmVydF9zZWxmICAgID86IENvbnZlcnRlcixcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyfGFueSwgb3RoZXI6IG51bWJlcnxhbnkpID0+IGFueVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkJpbmFyeU9wcyhvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsIFxuICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gTk9DT05WRVJULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICcvLycpXG4gICAgICAgICAgICBvcCA9ICcvJztcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvdGhlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBvcCwgY29udmVydF9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByY3MgPSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG90aGVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X290aGVyKG90aGVyKSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG86IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252ZXJ0X290aGVyKG8pICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNhbWVfb3JkZXIgPyBmY3QgOiBcbiAgICAgICAgICAgIHJjcyA9IChub2RlOiBudW1iZXIsIHNlbGY6IG51bWJlciwgbzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X290aGVyKG8pLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdFtgX19yJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogcmNzLFxuICAgICAgICB9O1xuICAgICAgICBpZiggY29udmVydF9zZWxmID09PSBOT0NPTlZFUlQgJiYgc3Vic3RpdHV0ZV9jYWxsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHRbYF9faSR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvdGhlcjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlcl92YWx1ZSA9IFZBTFVFU1tvdGhlcl07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXJfdmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXJfdmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZlcnRfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5DbXBPcHMoICBvcHMgICAgICAgIDogcmVhZG9ubHkgKGtleW9mIHR5cGVvZiByZXZlcnNlKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiBSRVRVUk5fVFlQRV9GQ1QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSBOT0NPTlZFUlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IE5PQ09OVkVSVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9ICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgZm9yKGNvbnN0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogbnVtYmVyLCBzZWxmOiBudW1iZXIsIG90aGVyOiBudW1iZXIsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb3AgPSBvcDtcblxuICAgICAgICAgICAgbGV0IGEgPSBjb252ZXJ0X3NlbGYoc2VsZik7XG4gICAgICAgICAgICBsZXQgYiA9IGNvbnZlcnRfb3RoZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIHJldmVyc2VkICkge1xuICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHJlc3VsdFR5cGUoc2VsZikgPT09IHJlc3VsdFR5cGUob3RoZXIpIClcbiAgICAgICAgICAgICAgICAgICAgY29wID0gY29wICsgJz0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgY29wLCBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBzdWJzdGl0dXRlX2NhbGwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgY3MgID0gKG5vZGU6IG51bWJlciwgc2VsZjogbnVtYmVyLCBvOiBudW1iZXIsIF86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udmVydF9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgcmVzdWx0VHlwZSB9IGZyb20gXCJkb3BcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIE51bWJlcjJJbnQgfSBmcm9tIFwiLi9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUWVBFX0lOVCB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG50eXBlIFByaW50YWJsZSA9IHsgdG9TdHJpbmcoKTogc3RyaW5nIH07XG5cbmV4cG9ydCB0eXBlIENvbnZlcnRlciA9IChub2RlOiBudW1iZXIpID0+IG51bWJlciB8IFtUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uKG51bWJlciB8IFByaW50YWJsZSlbXV07XG5cbmV4cG9ydCBjb25zdCBOT0NPTlZFUlQgPSAobm9kZTogbnVtYmVyKSA9PiBub2RlO1xuXG5leHBvcnQgY29uc3QgQ09OVkVSVF9JTlQyRkxPQVQgPSBJbnQyTnVtYmVyO1xuZXhwb3J0IGNvbnN0IENPTlZFUlRfMklOVCAgICAgID0gTnVtYmVyMkludDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBudW1iZXJbXSkge1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb252ZXJ0Lmxlbmd0aDsgaSs9MilcbiAgICAgICAgdGFibGVbY29udmVydFtpXV0gPSBjb252ZXJ0W2krMV07XG5cbiAgICByZXR1cm4gKG5vZGU6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBzcmMgICAgPSByZXN1bHRUeXBlKG5vZGUpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0YWJsZVtzcmNdO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgICAgLy9UT0RPOiBpbXByb3ZlOlxuICAgICAgICBpZiggc3JjID09PSBTVFlQRV9JTlQpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBTVFlQRV9JTlQgKVxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQobm9kZSk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5mb3VuZCBjb252ZXJzaW9uXCIpO1xuICAgIH07XG59IiwiaW1wb3J0IHsgU1RZUEVfTk9UX0lNUExFTUVOVEVELCBTVFlQRV9CT09MLCBTVFlQRV9GTE9BVCwgU1RZUEVfSU5ULCBTVFlQRV9TVFIsIFNUWVBFX0pTSU5UIH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5cbmV4cG9ydCB0eXBlIFJFVFVSTl9UWVBFX0ZDVCA9IChvOiBudW1iZXIpID0+IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JSkJGMkJPT0wobzogbnVtYmVyKSB7XG4gICAgaWYoIFNUWVBFX0lOVCA8PSBvICYmIG8gPD0gU1RZUEVfRkxPQVQpXG4gICAgICAgIHJldHVybiBTVFlQRV9CT09MO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSUpCRjJGTE9BVChvOiBudW1iZXIpIHtcbiAgICBpZiggU1RZUEVfSU5UIDw9IG8gJiYgbyA8PSBTVFlQRV9GTE9BVClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0ZMT0FUO1xuICAgIHJldHVybiBTVFlQRV9OT1RfSU1QTEVNRU5URUQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSlNJTlQySlNJTlQobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX0pTSU5UKVxuICAgICAgICByZXR1cm4gU1RZUEVfSlNJTlQ7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JSjJJTlQobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX0lOVCB8fCBvID09PSBTVFlQRV9KU0lOVClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0lOVDtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JTlQySU5UKG86IG51bWJlcikge1xuICAgIGlmKCBvID09PSBTVFlQRV9JTlQpXG4gICAgICAgIHJldHVybiBTVFlQRV9JTlQ7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9TVFIyQk9PTChvOiBudW1iZXIpIHtcbiAgICBpZiggbyA9PT0gU1RZUEVfU1RSIClcbiAgICAgICAgcmV0dXJuIFNUWVBFX0JPT0w7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfU1RSMlNUUihvOiBudW1iZXIpIHtcbiAgICBpZiggbyA9PT0gU1RZUEVfU1RSIClcbiAgICAgICAgcmV0dXJuIFNUWVBFX1NUUjtcbiAgICByZXR1cm4gU1RZUEVfTk9UX0lNUExFTUVOVEVEO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9JSjJTVFIobzogbnVtYmVyKSB7XG4gICAgaWYoIG8gPT09IFNUWVBFX0lOVCB8fCBvID09PSBTVFlQRV9KU0lOVCApXG4gICAgICAgIHJldHVybiBTVFlQRV9TVFI7XG4gICAgcmV0dXJuIFNUWVBFX05PVF9JTVBMRU1FTlRFRDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9GTE9BVChfOiBudW1iZXIpIHsgcmV0dXJuIFNUWVBFX0ZMT0FUOyB9XG5leHBvcnQgZnVuY3Rpb24gUkVUX0lOVCAgKF86IG51bWJlcikgeyByZXR1cm4gU1RZUEVfSU5UOyAgIH1cbmV4cG9ydCBmdW5jdGlvbiBSRVRfSlNJTlQoXzogbnVtYmVyKSB7IHJldHVybiBTVFlQRV9KU0lOVDsgfVxuZXhwb3J0IGZ1bmN0aW9uIFJFVF9TVFIgIChfOiBudW1iZXIpIHsgcmV0dXJuIFNUWVBFX1NUUjsgICB9XG5cbi8vVE9ETy4uLlxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlX3JldHVybl90eXBlKCkge1xuXG59IiwiXG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUnOyIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlcyAgPSBuZXcgQXJyYXk8U1R5cGVPYmo+KCk7XG5jb25zdCBTVHlwZW5hbWUyaWQ6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNUeXBlRnJvbU5hbWU8VCBleHRlbmRzIFNUeXBlT2JqPihuYW1lOiBzdHJpbmcpOiBUIHtcbiAgICByZXR1cm4gU1R5cGVzW2dldFNUeXBlSUQobmFtZSldIGFzIFQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTVHlwZUlEKG5hbWU6IHN0cmluZyk6IG51bWJlciB7XG5cbiAgICBsZXQgaWQgPSBTVHlwZW5hbWUyaWRbbmFtZV07XG4gICAgaWYoIGlkID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGlkID0gU1R5cGVuYW1lMmlkW25hbWVdID0gU1R5cGVzLmxlbmd0aDtcbiAgICAgICAgU1R5cGVzW2lkXSA9IHtfX25hbWVfXzogbmFtZX07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU1R5cGUobmFtZTogc3RyaW5nLCB0eXBlOiBPbWl0PFNUeXBlT2JqLCAnX19uYW1lX18nPikge1xuXG4gICAgY29uc3QgaWQgPSBnZXRTVHlwZUlEKG5hbWUpO1xuICAgIE9iamVjdC5hc3NpZ24oIFNUeXBlc1tpZF0sIHR5cGUgKTtcbiAgICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBTVFlQRV9OT05FVFlQRSAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiTm9uZVR5cGVcIik7IC8vIDAuLi5cbmV4cG9ydCBjb25zdCBTVFlQRV9JTlQgICAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiaW50XCIpO1xuZXhwb3J0IGNvbnN0IFNUWVBFX0pTSU5UICAgICAgICAgICAgICA9IGdldFNUeXBlSUQoXCJqc2ludFwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9CT09MICAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiYm9vbFwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9GTE9BVCAgICAgICAgICAgICAgPSBnZXRTVHlwZUlEKFwiZmxvYXRcIik7XG5leHBvcnQgY29uc3QgU1RZUEVfU1RSICAgICAgICAgICAgICAgID0gZ2V0U1R5cGVJRChcInN0clwiKTtcbmV4cG9ydCBjb25zdCBTVFlQRV9OT1RfSU1QTEVNRU5URUQgICAgPSBnZXRTVHlwZUlEKFwiTm90SW1wbGVtZW50ZWRUeXBlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuLy8gZGVjbGFyZSBhbGwgYnVpbHRpbiB0eXBlcy4uLlxuaW1wb3J0ICcuL3N0cnVjdHMvU1R5cGVCdWlsdGluJztcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1QySlMiLCJBUlJBWV9UWVBFIiwiQ09ERV9CRUciLCJDT0RFX0NPTCIsIkNPREVfRU5EIiwiQ09ERV9MSU5FIiwiSlNfQ09ERSIsInR5cGUiLCJDVVJTT1IiLCJqc2NvZGUiLCJzZXRfanNfY3Vyc29yIiwiaWR4IiwibGVuZ3RoIiwibmV3X2pzY29kZSIsImZpbGVuYW1lIiwiaW5kZW50IiwiY3VyX2luZGVudF9sZXZlbCIsImluZGVudHMiLCJOTCIsInRvU3RyaW5nIiwiQkIiLCJCRSIsInIiLCJhcmdzIiwid3IiLCJ3Iiwid3QiLCJzdHIiLCJpIiwiYXJnIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwib2Zmc2V0IiwiYXN0MmpzIiwiYXN0IiwiZmlyc3RDaGlsZCIsIm5iQ2hpbGQiLCJub2RlIiwiY29mZnNldCIsIm5iQ2hpbGRyZW4iLCJCT0RZIiwiYWRkQ2hpbGQiLCJzZXRUeXBlIiwiY29udmVydF9ub2RlIiwiY29udmVydCIsImRzdCIsImNvbnRleHQiLCJicnl0aG9uX25hbWUiLCJWQUxVRVMiLCJiYXNlIiwiYm9keSIsIkNMQVNTX0NMQVNTREVGIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImdldFNUeXBlSUQiLCJsb2NhbF9zeW1ib2xzIiwibmFtZSIsImJhc2VzIiwiRXJyb3IiLCJsaXN0IiwiQ09OVFJPTEZMT1dTX0ZPUiIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsImlkIiwidGFyZ2V0IiwiTnVtYmVyMkludCIsImJlZyIsImluY3IiLCJlbmQiLCJDT05UUk9MRkxPV1NfRk9SX1JBTkdFIiwiU1RZUEVfSU5UIiwidmFsdWUiLCJDT05UUk9MRkxPV1NfSUZCTE9DSyIsImNoaWxkQ291bnQiLCJjdXIiLCJvcmVsc2UiLCJ0ZXN0IiwiQ09OVFJPTEZMT1dTX1RFUk5BUlkiLCJyZXN1bHRUeXBlIiwic2V0UmVzdWx0VHlwZSIsIkNPTlRST0xGTE9XU19UUllCTE9DSyIsImhhbmRsZXJzIiwiQ09OVFJPTEZMT1dTX1RSWUJMT0NLX0NBVENIIiwiU1lNQk9MIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJlIiwiaW5jbHVkZXMiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwibm9kZXMiLCJsaW5lIiwiY29sIiwic3RhY2tsaW5lMmFzdG5vZGUiLCJzdGFja2xpbmUiLCJzYiIsImdldEFTVEZvciIsInN0YWNrMmFzdG5vZGVzIiwibWFwIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwiam9pbiIsImxvZyIsImdldF9weV9leGNlcHRpb24iLCJfX1NCUllUSE9OX18iLCJfZXJyXyIsIl9iXyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIl9yXyIsIkpTRXhjZXB0aW9uIiwiQ09OVFJPTEZMT1dTX1dISUxFIiwiYmluYXJ5X2pzb3AiLCJTVFlQRV9KU0lOVCIsIkZVTkNUSU9OU19BUkdTX0tXQVJHIiwiRlVOQ1RJT05TX0FSR1NfVkFSRyIsIlNUeXBlX2ZjdCIsIm1ldGEiLCJfX2NhbGxfXyIsImt3X3N0YXJ0IiwiaWR4X2VuZF9wb3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImlkeF92YXJhcmciLCJrd2FyZ3MiLCJpc0xhc3QiLCJ3cml0ZV9hcmciLCJ0eXBlX2lkIiwiZGVmdmFsIiwic2V0X3B5X2NvZGUiLCJzZXRfcHlfZnJvbV9iZWdfZW5kIiwiRlVOQ1RJT05TX0FSR1MiLCJDT0RFX0JFR19DT0wiLCJDT0RFX0JFR19MSU5FIiwiQ09ERV9FTkRfQ09MIiwiQ09ERV9FTkRfTElORSIsIlBZX0NPREUiLCJGVU5DVElPTlNfQVJHU19QT1NPTkxZIiwiRlVOQ1RJT05TX0FSR1NfS1dPTkxZIiwiRlVOQ1RJT05TX0FSR1NfUE9TIiwiY29udmVydF9hcmdzIiwiX2FyZ3MiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJhcmdzX3BvcyIsImFyZ3NfbmFtZXMiLCJ0b3RhbF9hcmdzIiwicG9zb25seWFyZ3MiLCJrd29ubHlhcmdzIiwicG9zX2RlZmF1bHRzIiwiZGVmYXVsdHMiLCJwb3Nvbmx5IiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwibmJfcG9zX2RlZmF1bHRzIiwiTWF0aCIsIm1pbiIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJoYXNfa3ciLCJjb2xfb2Zmc2V0IiwicHlfb2Zmc2V0IiwibGluZW5vIiwicmVzdWx0X3R5cGUiLCJhbm5vdGF0aW9uIiwiRlVOQ1RJT05TX0NBTExfS0VZV09SRCIsInByaW50X29iaiIsIm9iaiIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJkYXRhIiwic2VwIiwiZGVmYXVsdF9jYWxsIiwia3dfcG9zIiwibmJfcG9zIiwibWF4IiwicG9zX3NpemUiLCJrdyIsImN1dG9mZiIsInZhcmdfc3RhcnQiLCJ2YXJnX25iIiwiaGFzX2t3YXJncyIsInN1YnN0aXR1dGVfY2FsbCIsIkZVTkNUSU9OU19DQUxMIiwiU1R5cGVzIiwiZmN0X3R5cGUiLCJmY3QiLCJyZXRfdHlwZSIsInJldHVybl90eXBlIiwia2V5d29yZHMiLCJGVU5DVElPTlNfREVGIiwiZ2VuZXJhdGUiLCJydHlwZSIsInN0eXBlIiwicGFyZW50X25vZGVfY29udGV4dCIsInJldHVybnMiLCJmY3RfcmV0dXJuX3R5cGUiLCJfX25hbWVfXyIsIlNUeXBlSUQiLCJsYXN0X3R5cGUiLCJmYWtlX25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJwdXNoIiwiS0VZV09SRFNfQVNTRVJUIiwiYXNzZXJ0IiwiY29uZCIsIktFWVdPUkRTX0JSRUFLIiwiS0VZV09SRFNfQ09OVElOVUUiLCJLRVlXT1JEU19JTVBPUlRfQUxJQVMiLCJhc25hbWUiLCJLRVlXT1JEU19JTVBPUlQiLCJuYW1lcyIsIm1vZHVsZSIsIktFWVdPUkRTX1JBSVNFIiwiZXhjIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIlJVTlRJTUVfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIkFTVF9DT05WRVJUXzE5IiwiQVNUMkpTXzE5IiwiQVNUX0NPTlZFUlRfMjAiLCJBU1QySlNfMjAiLCJBU1RfQ09OVkVSVF8yMSIsIkFTVDJKU18yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiUlVOVElNRV8yMiIsIkFTVF9DT05WRVJUXzIzIiwiQVNUMkpTXzIzIiwiQVNUX0NPTlZFUlRfMjQiLCJBU1QySlNfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJSVU5USU1FXzI3IiwiQVNUX0NPTlZFUlRfMjgiLCJBU1QySlNfMjgiLCJBU1RfQ09OVkVSVF8yOSIsIkFTVDJKU18yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiUlVOVElNRV8zMyIsIkFTVF9DT05WRVJUXzM0IiwiQVNUMkpTXzM0IiwiQVNUX0NPTlZFUlRfMzUiLCJBU1QySlNfMzUiLCJBU1RfQ09OVkVSVF8zNiIsIkFTVDJKU18zNiIsIkFTVF9DT05WRVJUXzM3IiwiQVNUMkpTXzM3IiwiQVNUX0NPTlZFUlRfMzgiLCJBU1QySlNfMzgiLCJBU1RfQ09OVkVSVF8zOSIsIkFTVDJKU18zOSIsIkFTVF9DT05WRVJUXzQwIiwiQVNUMkpTXzQwIiwiU1RSVUNUU19UVVBMRSIsIlNUUlVDVFNfTElTVCIsIlNUUlVDVFNfRElDVCIsIlJFVFVSTiIsIlBBU1MiLCJPUEVSQVRPUlNfVU5BUlkiLCJPUEVSQVRPUlNfQ09NUEFSRSIsIk9QRVJBVE9SU19CT09MRUFOIiwiT1BFUkFUT1JTX0JJTkFSWSIsIk9QRVJBVE9SU19BVFRSIiwiT1BFUkFUT1JTX19CUkFDS0VUUyIsIk9QRVJBVE9SU19BU1NJR05PUCIsIk9QRVJBVE9SU19fRVFfSU5JVCIsIk9QRVJBVE9SU19fRVEiLCJMSVRFUkFMU19TVFIiLCJMSVRFUkFMU19JTlQiLCJMSVRFUkFMU19GTE9BVCIsIkxJVEVSQUxTX0ZfU1RSSU5HIiwiTElURVJBTFNfRl9TVFJJTkdfRk9STUFUVEVEVkFMVUUiLCJMSVRFUkFMU19CT09MIiwiTElURVJBTFNfTk9ORSIsIkFTVF9DT05WRVJUIiwiUlVOVElNRSIsImFzc2lnbiIsIlNUWVBFX05PTkVUWVBFIiwiX2NvbnRleHQiLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJhZGRTVHlwZSIsIlNUWVBFX0JPT0wiLCJDTVBPUFNfTElTVCIsImdlbkNtcE9wcyIsIlJFVF9JSkJGMkJPT0wiLCJTVFlQRV9TVFIiLCJTVFlQRV9GTE9BVCIsImZsb2F0MnN0ciIsImYiLCJ0b0V4cG9uZW50aWFsIiwic2lnbl9pZHgiLCJnZW5CaW5hcnlPcHMiLCJnZW5VbmFyeU9wcyIsIkludDJOdW1iZXIiLCJDT05WRVJUX0lOVDJGTE9BVCIsIlJFVF9JSkJGMkZMT0FUIiwiUkVUX0ZMT0FUIiwiUkVUX1NUUiIsIlNUeXBlX3R5cGVfZmxvYXQiLCJvdGhlciIsIm90aGVyX3R5cGUiLCJvdGhlcl92YWx1ZSIsIm90eXBlIiwibWV0aG9kIiwiX19pbnRfXyIsIl9fc3RyX18iLCJjb252ZXJ0X290aGVyIiwic2VsZiIsInJlYWxfdHlwZSIsImlkX2pzb3AiLCJ1bmFyeV9qc29wIiwiQ09OVkVSVF8ySU5UIiwiUkVUX0lKMklOVCIsIlJFVF9JTlQiLCJSRVRfSU5UMklOVCIsIlNUeXBlX3R5cGVfaW50IiwiYSIsImIiLCJjb252ZXJ0X3NlbGYiLCJSRVRfSlNJTlQiLCJSRVRfSlNJTlQySlNJTlQiLCJSRVRfSUoyU1RSIiwiUkVUX1NUUjJCT09MIiwiUkVUX1NUUjJTVFIiLCJTVHlwZV90eXBlX3N0ciIsIl9fbGVuX18iLCJyY2hpbGQiLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsIkFzc2lnbk9wZXJhdG9ycyIsIlNUWVBFX05PVF9JTVBMRU1FTlRFRCIsIm9wIiwiYm5hbWUycHluYW1lIiwiYXR0ciIsInN3YXBBU1ROb2RlcyIsInJldmVyc2VkX29wZXJhdG9yIiwibGVmdCIsInJpZ2h0IiwibHR5cGUiLCJmbG9vcmRpdl9mbG9hdCIsImZsb29yIiwiZmxvb3JkaXZfaW50IiwicmVzdWx0IiwibW9kX2Zsb2F0IiwibW9kIiwibW9kX2ludCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJqc29wIiwib3BzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZWx0cyIsImlzQ2xhc3MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicHJvdG90eXBlIiwid3JpdGFibGUiLCJQeV9vYmplY3QiLCJQeV9FeGNlcHRpb24iLCJQeV9KU0V4Y2VwdGlvbiIsIlJVTlRJTUVfMCIsIlJVTlRJTUVfMSIsIlJVTlRJTUVfMiIsIkZsb2F0NjRBcnJheSIsIk1BWF9OQl9BU1ROT0RFUyIsIk5FWFRfQVNUX05PREVfSUQiLCJwYXJlbnQiLCJBU1ROT0RFX1NJWkUiLCJBU1ROT0RFUyIsIkFTVE5PREVfTkJfQ0hJTERSRU4iLCJBU1ROT0RFX0NISUxEUkVOX1NUQVJUIiwiY3JlYXRlQVNUTm9kZSIsImNyZWF0ZUFTVE5vZGVzIiwibmIiLCJkb3BfcmVzZXQiLCJCVUZGRVIiLCJyZXNpemUiLCJCVUZGRVJfU0laRSIsIkFTVE5PREVfVFlQRV9JRCIsIkFTVE5PREVfUEFSRU5UX09QX1BSSU9SSVRZIiwiQVNUTk9ERV9SRVNVTFRfVFlQRSIsIkFycmF5QnVmZmVyIiwibWF4Qnl0ZUxlbmd0aCIsInBhcmVudE9QUHJpbyIsInNldFBhcmVudE9QUHJpbyIsInByaW50Tm9kZSIsImJyeXRob25fbm9kZSIsInNldF9weV9jb2RlX2Zyb21fbGlzdCIsInNyYyIsImRzdF9iZWciLCJkc3RfZW5kIiwic3JjX29mZnNldCIsImJlZ19vZmZzZXQiLCJlbmRfb2Zmc2V0IiwibW9kdWxlcyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiYW8iLCJibyIsInQiLCJhcCIsImJwIiwiQm9keSIsImNhbmRpZGF0ZXMiLCJlcnJvciIsInBhcmVudF9jb250ZXh0IiwiUm9vdENvbnRleHQiLCJ0eXBlX2ZjdCIsImdlblVuYXJ5T3BGY3QiLCJvcG5hbWUiLCJjYWxsIiwibGVuIiwiaW50IiwiZmxvYXQiLCJDT1JFX01PRFVMRVMiLCJjdXJzb3IiLCJsaW5lX29mZnNldCIsImNoYXIiLCJwYXJzZUV4cHJlc3Npb24iLCJhc3QyanNfY29udmVydCIsInBhcnNlU3ltYm9sIiwiYmVnaW5fc3RyIiwiY2FyIiwic3ltYm9sIiwiY2hpbGRyZW4iLCJ0b0pTIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsInB5Y29kZSIsInN0YXJ0Iiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiZXhwb3J0ZWQiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiTk9DT05WRVJUIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJhX3ZhbHVlIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwiZmlyc3QiLCJwcmlvIiwicF9wcmlvIiwiY21wIiwicm9wIiwicHlvcCIsImNzIiwicmNzIiwibyIsInJldmVyc2UiLCJjb3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJ0YWJsZSIsImdlbmVyYXRlX3JldHVybl90eXBlIiwiU1R5cGVuYW1lMmlkIiwiZ2V0U1R5cGVGcm9tTmFtZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==