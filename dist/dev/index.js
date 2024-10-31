/******/ var __webpack_modules__ = ({

/***/ "./src/ast2js.ts":
/*!***********************!*\
  !*** ./src/ast2js.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ast2js: () => (/* binding */ ast2js),
/* harmony export */   astnode2js: () => (/* binding */ astnode2js),
/* harmony export */   body2js: () => (/* binding */ body2js),
/* harmony export */   newline: () => (/* binding */ newline),
/* harmony export */   r: () => (/* binding */ r),
/* harmony export */   toJS: () => (/* binding */ toJS)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_Body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/Body */ "./src/structs/Body.ts");


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
    if (str instanceof structs_Body__WEBPACK_IMPORTED_MODULE_1__.Body) {
        return str.toJS(cursor);
    }
    if (str instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode || str instanceof Object && !Array.isArray(str)) {
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
        if (e instanceof Object) {
            js += toJS(e, cursor);
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
/* harmony import */ var structs_Body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/Body */ "./src/structs/Body.ts");


function ast2js(cursor) {
    let base = "_r_.object";
    if (this.children.length === 2) base = this.children[0];
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`class ${this.value} extends ${base} ${new structs_Body__WEBPACK_IMPORTED_MODULE_1__.Body(this)}`, cursor);
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
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ] : [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");


function ast2js(cursor) {
    if (this.type === "controlflows.for(range)") {
        let beg = "0n";
        let incr = "1n";
        let end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[0]);
        if (this.children.length > 2) {
            beg = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[0]);
            end = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[1]);
        }
        if (this.children.length > 3) incr = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(this.children[2]);
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    const target = node.target.id;
    context.local_symbols[target] = null; //TODO
    if (node.iter.constructor.$name === "Call" && node.iter.func.id === "range") {
        // TODO: jsint opti if this.value not used...
        context.local_symbols[node.value] = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int;
        return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.for(range)", null, target, [
            ...node.iter.args.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context)),
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ]);
    }
    //TODO: get type...
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    if ("ifblock" in node) {
        if (node.ifblock === "else") {
            return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
                (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
            ]);
        }
        const cond = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.test, context);
        if (cond.result_type !== structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_bool) throw new Error(`Type ${cond.result_type} not yet supported as if condition`);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${this.children[0]} ? ${this.children[1]} : ${this.children[2]} )`, cursor);
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
    console.warn(node.orelse);
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
    let js = "";
    let body_idx = 1;
    if (this.children.length === 1) {
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("else {", cursor);
        body_idx = 0;
    } else {
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`if(_err_ instanceof ${this.children[0]}){`, cursor);
    }
    if (this.value !== null) {
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(`let ${this.value} = _err_;`, cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, body_idx, false);
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
    let children;
    if (node.type !== undefined) {
        children = [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.type, context),
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ];
    } else {
        children = [
            (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
        ];
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.catch`, null, node.name, children);
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
    if (this.children[this.children.length - 1].children.length !== 1) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("else{ throw _raw_err_ }", cursor); //TODO...
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
/* harmony import */ var structs_Body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/Body */ "./src/structs/Body.ts");


function ast2js(cursor) {
    const body = new structs_Body__WEBPACK_IMPORTED_MODULE_1__.Body(this);
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`try${body}`, cursor);
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
/* harmony export */   "default": () => (/* binding */ ast2js),
/* harmony export */   default_call: () => (/* binding */ default_call)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function print_obj(obj) {
    let entries = Object.entries(obj);
    let str = new Array(entries.length + 1); // ?
    let data = new Array(entries.length);
    str[0] = `{${entries[0][0]}:`;
    data[0] = entries[0][1];
    for(let i = 1; i < entries.length; ++i){
        str[i] = `, ${entries[i][0]}: `;
        data[i] = entries[i][1];
    }
    str[entries.length] = '}';
    return [
        str,
        data
    ];
}
function join(data, sep = ", ") {
    if (data.length === 0) return [
        [
            ""
        ],
        []
    ];
    let result = new Array(data.length);
    let str = new Array(data.length + 1);
    str[0] = "";
    result[0] = data[0] ?? "undefined";
    for(let i = 1; i < data.length; ++i){
        str[i] = sep;
        result[i] = data[i] ?? "undefined";
    }
    str[data.length] = "";
    return [
        str,
        result
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
function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.value.__call__.substitute_call(this), cursor);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[0], cursor);
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
/* harmony export */   arg2js: () => (/* binding */ arg2js),
/* harmony export */   args2js: () => (/* binding */ args2js),
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js(cursor) {
    let js = '';
    if (!this.type.endsWith("(meth)")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)('function ', cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
    js += args2js(this, cursor);
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
//TODO: move2core_modules ?
function args2js(node, cursor) {
    const start = {
        ...cursor
    };
    const args = node.children[0];
    const _args = args.children;
    const SType_fct = args.value;
    let js = "(";
    cursor.col += 1;
    const meta = SType_fct.__call__;
    let kw_start = meta.idx_end_pos;
    if (kw_start === Number.POSITIVE_INFINITY) kw_start = meta.idx_vararg + 1;
    if (meta.kwargs !== undefined && kw_start === _args.length - 1) ++kw_start;
    for(let i = 0; i < _args.length; ++i){
        if (i !== 0) {
            js += ", ";
            cursor.col += 2;
        }
        if (kw_start === i) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)('{', cursor);
        if (i === meta.idx_vararg && i === _args.length - 1) _args[i].last = true;
        js += arg2js(_args[i], cursor);
    }
    if (kw_start < _args.length) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)('} = {}', cursor);
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
    if (node.type === "arg.vararg") {
        if (node.last) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(`...${node.value}`, cursor);
        return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', "[]"), cursor);
    }
    if (node.type === "arg.kwarg") return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', "{}"), cursor);
    if (node.children.length === 1) {
        let value = node.children[0];
        if (value.result_type === 'jsint' && node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) value = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(value);
        return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', value), cursor);
    }
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


/***/ }),

/***/ "./src/core_modules/functions/def/astconvert.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/functions/def/astconvert.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convert_arg: () => (/* binding */ convert_arg),
/* harmony export */   convert_args: () => (/* binding */ convert_args),
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
/* harmony import */ var _call_ast2js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../call/ast2js */ "./src/core_modules/functions/call/ast2js.ts");




function convert(node, context) {
    const isMethod = context.type === "class";
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
    if (!isMethod) {
        // if method add to self_context.symbols ?
        context.local_symbols[node.name] = SType_fct;
    }
    const annotation = node.returns?.id;
    if (annotation !== undefined) fct_return_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.getSType)(annotation);
    else {
        //TODO: change search strat...
        //TODO: loops, try, if
        let returns = node.body.filter((n)=>n.constructor.$name === "Return");
        // TODO: return;
        if (returns.length === 0) fct_return_type = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_NoneType;
    }
    // new context for the function local variables
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    const args = convert_args(node, SType_fct, context);
    for (let arg of args.children)context.local_symbols[arg.value] = arg.result_type;
    const body = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context);
    // recursive.
    if (fct_return_type === null) {
        //TODO: loop, if, try
        let ret = body.children.filter((n)=>n.type === "keywords.return");
        fct_return_type = ret[0].result_type;
    }
    let type = "functions.def";
    if (isMethod) type += "(meth)";
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, null, node.name, [
        args,
        body
    ]);
}
convert.brython_name = "FunctionDef";
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(virt_node, "args", null, SType_fct, args);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.assert(${this.children[0]})`, cursor);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("break", cursor);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("continue", cursor);
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
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ternary_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./controlflows/ternary/astconvert.ts */ "./src/core_modules/controlflows/ternary/astconvert.ts");
/* harmony import */ var _controlflows_ternary_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./controlflows/ternary/ast2js.ts */ "./src/core_modules/controlflows/ternary/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");





















































































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
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_69__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_70__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_71__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_72__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__["default"]
    },
    "controlflows.ternary": {
        AST_CONVERT: _controlflows_ternary_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__["default"],
        AST2JS: _controlflows_ternary_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__["default"]
    },
    "class.classdef": {
        AST_CONVERT: _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_83__["default"],
        AST2JS: _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_84__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _operators_binary_runtime_ts__WEBPACK_IMPORTED_MODULE_20__["default"]);
Object.assign(RUNTIME, _literals_float_runtime_ts__WEBPACK_IMPORTED_MODULE_35__["default"]);
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_46__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_57__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_68__["default"]);
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

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("${", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[0], cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
    return js;
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


function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("`", cursor);
    for (let child of this.children){
        if (child.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_str) {
            // h4ck
            child.jscode = {
                start: {
                    ...cursor
                },
                end: null
            };
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(child.value, cursor);
            child.jscode.end = {
                ...cursor
            };
        } else if (child.type === "literals.f-string.FormattedValue") {
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(child, cursor);
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


function ast2js(cursor) {
    let suffix = "";
    let target = this.as;
    let value = this.value;
    if (target === "float") {
        if (this.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int) value = Number(value); // remove useless precision.
    } else if (target === "int" || this.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_1__.SType_int) // if already bigint do not cast into jsint (loss of precision).
    suffix = "n";
    // 1e+54 should had be stored as bigint.
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${value}${suffix}`, cursor);
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

function ast2js(cursor) {
    if (this.value[0] === '"') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
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



function ast2js(cursor) {
    let js = "";
    if (this.type.endsWith("(init)")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("var ", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[0], cursor);
    for(let i = 1; i < this.children.length - 1; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)` = ${this.children[i]}`, cursor);
    const right_node = this.children[this.children.length - 1];
    let rchild = right_node;
    if (right_node.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_jsint && this.result_type === structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int) rchild = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(right_node);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)` = ${rchild}`, cursor);
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



function ast2js(cursor) {
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
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.substitute_call(this, left, right), cursor);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]}[${this.children[1]}]`, cursor);
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]}.${this.value}`, cursor);
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

function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    const method = left.result_type[this.value];
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.substitute_call(this, left, right), cursor);
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


function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.multi_jsop)(this, this.value, ...this.children), cursor);
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
function ast2js(cursor) {
    let js = '';
    for(let i = 0; i < this.value.length; ++i){
        if (i !== 0) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(' && ', cursor);
        const op = this.value[i];
        const left = this.children[i];
        const right = this.children[i + 1];
        if (op === 'is') {
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(this, left, '===', right), cursor);
            continue;
        }
        if (op === 'is not') {
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(this, left, '!==', right), cursor);
            continue;
        }
        //TODO: chain...
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(find_and_call_substitute(this, left, op, right), cursor);
    }
    return js;
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


function ast2js(cursor) {
    let left = this.children[0];
    //let right = this.children[1];
    if (this.value === 'not') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(this, '!', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(left, 'jsint')), cursor);
    const method = left.result_type[this.value];
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.substitute_call(this, left /*, right*/ ), cursor);
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
    if (type === structs_STypes__WEBPACK_IMPORTED_MODULE_3__.SType_NotImplementedType) {
        throw new Error(`${op} ${left.result_type} NOT IMPLEMENTED!`);
        throw new Error('NOT IMPLEMENTED!');
    }
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

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("{", cursor);
    for(let i = 0; i < this.children.length; i += 2){
        if (i !== 0) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(", ", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[i]}: ${this.children[i + 1]}`, cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
    return js;
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

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("[", cursor);
    for(let i = 0; i < this.children.length; ++i){
        if (i !== 0) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(", ", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("]", cursor);
    return js;
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

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("Object.freeze([", cursor);
    for(let i = 0; i < this.children.length; ++i){
        if (i !== 0) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(", ", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
    }
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("])", cursor);
    return js;
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
/* harmony export */   convert_body: () => (/* binding */ convert_body),
/* harmony export */   convert_line: () => (/* binding */ convert_line),
/* harmony export */   convert_node: () => (/* binding */ convert_node),
/* harmony export */   listpos: () => (/* binding */ listpos),
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");
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
function getNodeType(brython_node) {
    return brython_node.sbrython_type ?? brython_node.constructor.$name;
}
function convert_node(brython_node, context) {
    let name = getNodeType(brython_node);
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
            result.toJS = module.AST2JS;
            return result;
        }
    }
    console.error(brython_node);
    throw new Error(`Unsupported node ${name} at ${brython_node.lineno}:${brython_node.col_offset}`);
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
function convert_ast(ast) {
    const context = new Context();
    //TODO: builtin_symbols
    //TODO: fix types...
    context.local_symbols['int'] = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int.__class__;
    context.local_symbols['str'] = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_str.__class__;
    context.local_symbols['float'] = structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_float.__class__;
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

/***/ "./src/structs/Body.ts":
/*!*****************************!*\
  !*** ./src/structs/Body.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Body: () => (/* binding */ Body)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

class Body {
    node;
    print_bracket;
    idx;
    constructor(node, print_bracket = true){
        this.idx = node.children.length - 1; //TODO search body...
        this.node = node;
        this.print_bracket = print_bracket;
    }
    toJS(cursor) {
        const start = {
            ...cursor
        };
        let js = "";
        if (this.print_bracket) js += "{";
        const body = this.node.children[this.idx]; //body: ASTNode[];
        for(let i = 0; i < body.children.length; ++i){
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this.node, cursor, 1);
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(body.children[i], cursor);
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(";", cursor);
        }
        if (this.print_bracket) {
            js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this.node, cursor);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFN0MsK0JBQStCO0FBQ0M7QUFFNEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90ZXJuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQm9keS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlQnVpbHRpbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGV8Qm9keSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEJvZHkgKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9KUyhjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlXG4gICAgICAgIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCAmJiAhIEFycmF5LmlzQXJyYXkoc3RyKSApIHsgLy8gZm9yIHB5MmFzdF9mYXN0XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDAsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYocHJpbnRfYnJhY2tldClcbiAgICAgICAganMrPVwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBiYXNlX2luZGVudCA9IG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgaWYoIFtcImNvbnRyb2xmbG93cy5lbHNlXCIsIFwiY29udHJvbGZsb3dzLmVsaWZcIiwgXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiXS5pbmNsdWRlcyhub2RlLnR5cGUpICkge1xuICAgICAgIC0tYmFzZV9pbmRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBiYXNlX2luZGVudDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKGN1cnNvcik7XG5cbiAgICBub2RlLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBiYXNlOiBzdHJpbmd8QVNUTm9kZSA9IFwiX3JfLm9iamVjdFwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMilcbiAgICAgICAgYmFzZSA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICByZXR1cm4gdG9KUyhyYGNsYXNzICR7dGhpcy52YWx1ZX0gZXh0ZW5kcyAke2Jhc2V9ICR7bmV3IEJvZHkodGhpcyl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgX19uYW1lX186IG5vZGUubmFtZSxcbiAgICAgICAgLy9UT0RPIF9fY2FsbF9fXG4gICAgfVxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV1cbiAgICAgICAgOiBbY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNsYXNzLmNsYXNzZGVmXCIsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2xhc3NEZWZcIjsiLCJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgX2N1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGV8YW55ICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlfGFueSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IE51bWJlcjJJbnQodGhpcy5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICBlbmQgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gTnVtYmVyMkludCh0aGlzLmNoaWxkcmVuWzJdKTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICAvLyBUT0RPOiBqc2ludCBvcHRpIGlmIHRoaXMudmFsdWUgbm90IHVzZWQuLi5cbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUudmFsdWVdID0gU1R5cGVfaW50O1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIC8vVE9ETzogZ2V0IHR5cGUuLi5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuaWZibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy9pZlxuICAgIGxldCBrZXl3b3JkID0gXCJpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZSBpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZVwiO1xuXG4gICAgbGV0IGpzID0gdG9KUyhrZXl3b3JkLCBjdXJzb3IpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGlmKCBrZXl3b3JkICE9PSBcImVsc2VcIikgeyAvLyBpZi9lbGlmIGNvbmRpdGlvbi5cbiAgICAgICAgb2Zmc2V0ID0gMTtcbiAgICAgICAganMgKz0gdG9KUyhyYCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIG9mZnNldCk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIFwiaWZibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUuaWZibG9jayA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZCA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gU1R5cGVfYm9vbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke2NvbmQucmVzdWx0X3R5cGV9IG5vdCB5ZXQgc3VwcG9ydGVkIGFzIGlmIGNvbmRpdGlvbmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgbm9kZS5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgIG5vZGUuaWZibG9jayA9IFwiaWZcIjtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICBub2RlXG4gICAgXTtcblxuICAgIGxldCBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSAmJiBcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSB7XG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGN1ci5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgICAgICBjdXIuaWZibG9jayA9IFwiZWxpZlwiO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGN1cik7XG4gICAgfVxuICAgIGlmKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCAhPT0gMCApIHsgLy8gZWxzZVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhjdXIub3JlbHNlKSxcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgcmVhc29ucy4uLlxuICAgICAgICAgICAgbGluZW5vICAgIDogY3VyLm9yZWxzZVswXS5saW5lbm8gLSAxLFxuICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICAgICBdKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0bm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGNjID0gYXN0bm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgYXN0bm9kZS5jaGlsZHJlbltpXS5weWNvZGUuZW5kID0gY2NbY2MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAoJHt0aGlzLmNoaWxkcmVuWzBdfSA/ICR7dGhpcy5jaGlsZHJlblsxXX0gOiAke3RoaXMuY2hpbGRyZW5bMl19IClgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICBjb25zdCBib2R5X3RydWUgID0gY29udmVydF9ub2RlKG5vZGUuYm9keSwgY29udGV4dCk7XG4gICAgY29uc3QgYm9keV9mYWxzZSA9IGNvbnZlcnRfbm9kZShub2RlLm9yZWxzZSwgY29udGV4dCk7XG5cbiAgICBjb25zb2xlLndhcm4obm9kZS5vcmVsc2UpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLnRlcm5hcnlcIiwgYm9keV90cnVlLnJlc3VsdF90eXBlLCBudWxsLCBbXG4gICAgICAgIGNvbmQsXG4gICAgICAgIGJvZHlfdHJ1ZSxcbiAgICAgICAgYm9keV9mYWxzZVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZFeHBcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS50cnlcIixcbiAgICAgICAgICAgIC4uLm5vZGVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkuY2F0Y2hibG9ja1wiLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhub2RlLmhhbmRsZXJzKSxcbiAgICAgICAgICAgIGhhbmRsZXJzOiBub2RlLmhhbmRsZXJzXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgXSk7XG5cbiAgICAvL2ZpeCBweWNvZGUuXG4gICAgYXN0bm9kZS5jaGlsZHJlblswXS5weWNvZGUuZW5kID0gYXN0bm9kZS5jaGlsZHJlblsxXS5weWNvZGUuc3RhcnQ7XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIFxuICAgICAgICBsZXQgYm9keV9pZHggPSAxO1xuICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkgeyAvL1RPRE8gZW1wdHkgbm9kZS4uLlxuICAgICAgICAgICAganMgKz0gdG9KUyhcImVsc2Uge1wiLCBjdXJzb3IpO1xuICAgICAgICAgICAgYm9keV9pZHggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAganMgKz0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGhpcy52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcys9IHRvSlMoYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YCwgY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgICBqcys9IGJvZHkyanModGhpcywgY3Vyc29yLCBib2R5X2lkeCwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBjaGlsZHJlbjtcbiAgICBpZiggbm9kZS50eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBbY29udmVydF9ub2RlKG5vZGUudHlwZSwgY29udGV4dCksIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZHJlbiA9IFsgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hgLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICBmb3IobGV0IGhhbmRsZXIgb2YgdGhpcy5jaGlsZHJlbilcbiAgICAgICAganMrPSB0b0pTKGhhbmRsZXIsIGN1cnNvcik7XG4gICAgXG4gICAgaWYoIHRoaXMuY2hpbGRyZW5bIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMV0uY2hpbGRyZW4ubGVuZ3RoICE9PSAxIClcbiAgICAgICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IEJvZHkodGhpcyk7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRyeSR7Ym9keX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MudHJ5YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS50cnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5mdW5jdGlvbiBwcmludF9vYmoob2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG5cbiAgICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaik7XG5cbiAgICBsZXQgc3RyICA9IG5ldyBBcnJheShlbnRyaWVzLmxlbmd0aCsxKTsgLy8gP1xuICAgIGxldCBkYXRhID0gbmV3IEFycmF5KGVudHJpZXMubGVuZ3RoKTtcblxuICAgIHN0ciBbMF0gPSBgeyR7ZW50cmllc1swXVswXX06YDtcbiAgICBkYXRhWzBdID0gZW50cmllc1swXVsxXTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBlbnRyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHN0ciBbaV0gPSBgLCAke2VudHJpZXNbaV1bMF19OiBgXG4gICAgICAgIGRhdGFbaV0gPSBlbnRyaWVzW2ldWzFdO1xuICAgIH1cbiAgICBzdHJbZW50cmllcy5sZW5ndGhdID0gJ30nO1xuXG4gICAgcmV0dXJuIFsgc3RyLCBkYXRhIF07XG59XG5cbmZ1bmN0aW9uIGpvaW4oZGF0YTogYW55W10sIHNlcD1cIiwgXCIpIHtcblxuICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gW1tcIlwiXSwgW11dO1xuXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG5cbiAgICBsZXQgc3RyID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKzEpO1xuXG4gICAgc3RyWzBdICAgID0gXCJcIjtcbiAgICByZXN1bHRbMF0gPSBkYXRhWzBdID8/IFwidW5kZWZpbmVkXCI7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICBzdHJbaV0gPSBzZXA7XG4gICAgICAgIHJlc3VsdFtpXSA9IGRhdGFbaV0gPz8gXCJ1bmRlZmluZWRcIjtcbiAgICB9XG4gICAgc3RyW2RhdGEubGVuZ3RoXSA9IFwiXCI7XG5cbiAgICByZXR1cm4gW3N0cixyZXN1bHRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdF9jYWxsKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IG1ldGEgPSAobm9kZS52YWx1ZSBhcyBTVHlwZUZjdCkuX19jYWxsX187XG5cbiAgICBsZXQga3dfcG9zID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKG5vZGUuY2hpbGRyZW5baV0udHlwZSA9PT0gXCJmdW5jdGlvbnMua2V5d29yZFwiKSB7XG4gICAgICAgICAgICBrd19wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIGxldCBuYl9wb3MgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBuYl9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgbmJfcG9zID0gTWF0aC5tYXgobWV0YS5pZHhfdmFyYXJnLCBrd19wb3MtMSk7XG5cbiAgICBsZXQgcG9zX3NpemUgPSBuYl9wb3MrMTtcbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAgcG9zX3NpemUgPSBtZXRhLmlkeF92YXJhcmcrMjtcbiAgICBsZXQgcG9zID0gbmV3IEFycmF5KHBvc19zaXplKTtcbiAgICBcbiAgICBjb25zdCBrdyAgICA6IFJlY29yZDxzdHJpbmcsIEFTVE5vZGU+ID0ge307XG4gICAgY29uc3Qga3dhcmdzOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuXG4gICAgbGV0IGhhc19rdyA9IGZhbHNlO1xuXG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG1ldGEuaWR4X3ZhcmFyZyk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGN1dG9mZjsgKytpKVxuICAgICAgICAgICAgcG9zW2ktMV0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGlmKCBtZXRhLmlkeF92YXJhcmcrMSAhPT0ga3dfcG9zIClcbiAgICAgICAgICAgIHBvc1ttZXRhLmlkeF92YXJhcmddID0gam9pbihbXCJbXCIsIGpvaW4obm9kZS5jaGlsZHJlbi5zbGljZShtZXRhLmlkeF92YXJhcmcrMSxrd19wb3MpKSwgXCJdXCJdLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbmJfcG9zKzEpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuICAgICAgICBmb3IobGV0IGkgPSBjdXRvZmY7IGkgPCBrd19wb3M7ICsraSlcbiAgICAgICAgICAgIGt3WyBhcmdzX25hbWVzW2ktMV0gXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgaGFzX2t3ID0gY3V0b2ZmICE9PSBrd19wb3M7XG4gICAgfVxuXG4gICAgbGV0IGhhc19rd2FyZ3MgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFyZ3NfcG9zID0gbWV0YS5hcmdzX3BvcztcbiAgICBcblxuICAgIGZvcihsZXQgaSA9IGt3X3BvczsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBjb25zdCBhcmcgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGFyZy52YWx1ZTtcbiAgICAgICAgY29uc3QgaWR4ICA9IGFyZ3NfcG9zWyBuYW1lIF07XG5cbiAgICAgICAgaWYoIGlkeCA+PSAwICkge1xuICAgICAgICAgICAgcG9zW2lkeF0gPSBhcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc19rdyA9IHRydWU7XG5cbiAgICAgICAgaWYoIGlkeCA9PT0gLTEpXG4gICAgICAgICAgICBrd1tuYW1lXSA9IGFyZztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrd2FyZ3NbbmFtZV0gPSBhcmc7XG4gICAgICAgICAgICBoYXNfa3dhcmdzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4gPSBrdztcbiAgICAvL1RPRE86IG9ubHkgdGhlIG9uZXMgYXQgLTEuLi5cbiAgICBpZiggaGFzX2t3YXJncyAmJiAhIG1ldGEuaGFzX2t3ICl7XG4gICAgICAgIG9iaiA9IGt3YXJncztcbiAgICB9IGVsc2UgaWYoIGhhc19rd2FyZ3MgKSB7XG4gICAgICAgIG9ialttZXRhLmt3YXJncyFdID0gcHJpbnRfb2JqKGt3YXJncyk7XG4gICAgfVxuXG4gICAgaWYoIGhhc19rdyApXG4gICAgICAgIHBvc1twb3MubGVuZ3RoLTFdID0gcHJpbnRfb2JqKG9iaik7XG4gICAgZWxzZSB7XG4gICAgICAgIHdoaWxlKHBvcy5sZW5ndGggPiAwICYmIHBvc1twb3MubGVuZ3RoLTFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAtLXBvcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHtub2RlLmNoaWxkcmVuWzBdfSgke2pvaW4ocG9zKX0pYDsgLy8gYXJncyA/XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKCAodGhpcy52YWx1ZSBhcyBTVHlwZUZjdCkuX19jYWxsX18uc3Vic3RpdHV0ZV9jYWxsISh0aGlzKSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG5cbiAgICBjb25zdCBmY3RfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSE7XG4gICAgY29uc3QgcmV0X3R5cGUgPSAoZmN0X3R5cGUuX19jYWxsX18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgcmV0X3R5cGUsIGZjdF90eXBlLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzICAgIC5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpICksXG4gICAgICAgIC4uLm5vZGUua2V5d29yZHMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBrZXl3b3JkIG5vZGUuLi5cbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHZhbHVlICAgID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQgKVxuICAgIGNvbnN0IHJldF90eXBlID0gdmFsdWUucmVzdWx0X3R5cGU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMua2V5d29yZFwiLCByZXRfdHlwZSwgbm9kZS5hcmcsIFtcbiAgICAgICAgdmFsdWVcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImtleXdvcmRcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gJyc7XG4gICAgaWYoICEgdGhpcy50eXBlLmVuZHNXaXRoKFwiKG1ldGgpXCIpIClcbiAgICAgICAganMgKz0gdG9KUygnZnVuY3Rpb24gJywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhcIntcIiwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgaWYoIGJvZHlbYm9keS5sZW5ndGggLSAxXS50eXBlICE9PSBcImtleXdvcmRzLnJldHVyblwiICkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IFwicmV0dXJuIG51bGw7XCJcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCkgKyB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYXJnczJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgY29uc3QgYXJncyAgICAgID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBjb25zdCBfYXJncyAgICAgPSBhcmdzLmNoaWxkcmVuO1xuICAgIGNvbnN0IFNUeXBlX2ZjdCA9IGFyZ3MudmFsdWUhIGFzIFNUeXBlRmN0O1xuXG4gICAgbGV0IGpzID0gXCIoXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGxldCBrd19zdGFydCA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGt3X3N0YXJ0ID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKVxuICAgICAgICBrd19zdGFydCA9IG1ldGEuaWR4X3ZhcmFyZyArIDE7XG5cbiAgICBpZiggbWV0YS5rd2FyZ3MgIT09IHVuZGVmaW5lZCAmJiBrd19zdGFydCA9PT0gX2FyZ3MubGVuZ3RoLTEpXG4gICAgICAgICsra3dfc3RhcnQ7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBfYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCkge1xuICAgICAgICAgICAganMgKz0gXCIsIFwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGt3X3N0YXJ0ID09PSBpKVxuICAgICAgICAgICAganMgKz0gdG9KUygneycsIGN1cnNvcik7XG4gICAgICAgIGlmKCBpID09PSBtZXRhLmlkeF92YXJhcmcgJiYgaSA9PT0gX2FyZ3MubGVuZ3RoLTEgKVxuICAgICAgICAgICAgKF9hcmdzW2ldIGFzIGFueSkubGFzdCA9IHRydWU7XG5cbiAgICAgICAganMgKz0gYXJnMmpzKF9hcmdzW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBrd19zdGFydCA8IF9hcmdzLmxlbmd0aClcbiAgICAgICAganMgKz0gdG9KUygnfSA9IHt9JywgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGFyZ3MuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZzJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgaWYoIG5vZGUudHlwZSA9PT0gXCJhcmcudmFyYXJnXCIgKSB7XG4gICAgICAgIGlmKCAobm9kZSBhcyBhbnkpLmxhc3QpXG4gICAgICAgICAgICByZXR1cm4gdG9KUyhgLi4uJHtub2RlLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwiW11cIiksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIG5vZGUudHlwZSA9PT0gXCJhcmcua3dhcmdcIiApXG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwie31cIiksIGN1cnNvcik7XG5cbiAgICBpZihub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSApIHtcblxuICAgICAgICBsZXQgdmFsdWU6IGFueSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgIGlmKCB2YWx1ZS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JyAmJiBub2RlLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcjJJbnQodmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIHZhbHVlKSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0LCBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBnZXRTVHlwZSwgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IGRlZmF1bHRfY2FsbCB9IGZyb20gXCIuLi9jYWxsL2FzdDJqc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiO1xuICAgIGxldCBmY3RfcmV0dXJuX3R5cGU6IG51bGx8U1R5cGVPYmogPSBudWxsO1xuXG4gICAgY29uc3QgU1R5cGVfZmN0OiBTVHlwZUZjdCA9IHtcbiAgICAgICAgX19uYW1lX186IFwiZnVuY3Rpb25cIixcbiAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgIGFyZ3NfbmFtZXMgICAgIDogbmV3IEFycmF5KG5vZGUuYXJncy5hcmdzLmxlbmd0aCtub2RlLmFyZ3MucG9zb25seWFyZ3MubGVuZ3RoKSxcbiAgICAgICAgICAgIGFyZ3NfcG9zICAgICAgIDoge30sXG4gICAgICAgICAgICBpZHhfZW5kX3BvcyAgICA6IC0xLFxuICAgICAgICAgICAgaWR4X3ZhcmFyZyAgICAgOiAtMSxcbiAgICAgICAgICAgIGhhc19rdyAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICByZXR1cm5fdHlwZSAgICA6ICgpID0+IGZjdF9yZXR1cm5fdHlwZSEsIC8vID9cbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogZGVmYXVsdF9jYWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggISBpc01ldGhvZCApIHtcbiAgICAgICAgLy8gaWYgbWV0aG9kIGFkZCB0byBzZWxmX2NvbnRleHQuc3ltYm9scyA/XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0gU1R5cGVfZmN0O1xuICAgIH1cblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlLnJldHVybnM/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IGdldFNUeXBlKGFubm90YXRpb24pO1xuICAgIGVsc2Uge1xuXG4gICAgICAgIC8vVE9ETzogY2hhbmdlIHNlYXJjaCBzdHJhdC4uLlxuICAgICAgICAvL1RPRE86IGxvb3BzLCB0cnksIGlmXG4gICAgICAgIGxldCByZXR1cm5zID0gbm9kZS5ib2R5LmZpbHRlciggKG46YW55KSA9PiBuLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIlJldHVyblwiICk7XG4gICAgICAgIFxuICAgICAgICAvLyBUT0RPOiByZXR1cm47XG4gICAgICAgIGlmKCByZXR1cm5zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IFNUeXBlX05vbmVUeXBlO1xuICAgIH1cblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiZmN0XCIsIGNvbnRleHQpO1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBTVHlwZV9mY3QsIGNvbnRleHQpO1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgY29uc3QgYm9keSA9IGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIHJlY3Vyc2l2ZS5cbiAgICBpZiggZmN0X3JldHVybl90eXBlID09PSBudWxsICkge1xuICAgICAgICAvL1RPRE86IGxvb3AsIGlmLCB0cnlcbiAgICAgICAgbGV0IHJldCA9IGJvZHkuY2hpbGRyZW4uZmlsdGVyKCBuID0+IG4udHlwZSA9PT0gXCJrZXl3b3Jkcy5yZXR1cm5cIik7XG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IHJldFswXS5yZXN1bHRfdHlwZSE7XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBcImZ1bmN0aW9ucy5kZWZcIjtcbiAgICBpZihpc01ldGhvZClcbiAgICAgICAgdHlwZSArPSBcIihtZXRoKVwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBib2R5XG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgU1R5cGVfZmN0OiBTVHlwZUZjdCwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGNvbnN0IF9hcmdzID0gbm9kZS5hcmdzO1xuICAgIGNvbnN0IGhhc192YXJhcmcgPSBfYXJncy52YXJhcmcgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoYXNfa3dhcmcgID0gX2FyZ3Mua3dhcmcgICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgYXJnc19wb3MgICA9IG1ldGEuYXJnc19wb3M7XG4gICAgY29uc3QgYXJnc19uYW1lcyA9IG1ldGEuYXJnc19uYW1lcztcblxuICAgIGNvbnN0IHRvdGFsX2FyZ3MgPSBfYXJncy5wb3Nvbmx5YXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgX2FyZ3MuYXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgK2hhc192YXJhcmdcbiAgICAgICAgICAgICAgICAgICAgICsgX2FyZ3Mua3dvbmx5YXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgK2hhc19rd2FyZztcblxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXk8QVNUTm9kZT4odG90YWxfYXJncyk7XG5cbiAgICBjb25zdCBwb3NfZGVmYXVsdHMgPSBub2RlLmFyZ3MuZGVmYXVsdHM7XG4gICAgY29uc3QgcG9zb25seSA9IF9hcmdzLnBvc29ubHlhcmdzO1xuICAgIGNvbnN0IHBvcyAgICAgPSBfYXJncy5hcmdzO1xuXG4gICAgLy8gcG9zb25seVxuICAgIGxldCBkb2Zmc2V0ID0gcG9zX2RlZmF1bHRzLmxlbmd0aCAtIHBvc29ubHkubGVuZ3RoIC0gcG9zLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zb25seS5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcocG9zb25seVtpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgXCJwb3Nvbmx5XCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tpXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBwb3NcbiAgICBsZXQgb2Zmc2V0ID0gcG9zb25seS5sZW5ndGg7XG4gICAgICBkb2Zmc2V0IC09IHBvc29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc1tpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgXCJwb3NcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgICAgIGFyZ3NfbmFtZXNbb2Zmc2V0XSA9IGFyZy52YWx1ZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgbWV0YS5pZHhfdmFyYXJnID0gb2Zmc2V0O1xuXG4gICAgLy8gdmFyYXJnXG4gICAgaWYoIGhhc192YXJhcmcgKSB7XG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3MudmFyYXJnLCB1bmRlZmluZWQsIFwidmFyYXJnXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbmJfcG9zX2RlZmF1bHRzID0gTWF0aC5taW4ocG9zX2RlZmF1bHRzLmxlbmd0aCwgcG9zLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGhhc19vdGhlcnMgPSBwb3NfZGVmYXVsdHMubGVuZ3RoID4gcG9zLmxlbmd0aCB8fCBhcmdzLmxlbmd0aCAhPT0gb2Zmc2V0O1xuXG4gICAgICAgIGlmKCBuYl9wb3NfZGVmYXVsdHMgPiAxIHx8IG5iX3Bvc19kZWZhdWx0cyA9PT0gMSAmJiBoYXNfb3RoZXJzKVxuICAgICAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyAtPSBuYl9wb3NfZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgbGV0IGN1dF9vZmYgICA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGN1dF9vZmYgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgY3V0X29mZiA9IG1ldGEuaWR4X3ZhcmFyZztcbiAgICBmb3IobGV0IGkgPSBwb3Nvbmx5Lmxlbmd0aDsgaSA8IGN1dF9vZmY7ICsraSlcbiAgICAgICAgYXJnc19wb3NbYXJnc1tpXS52YWx1ZV0gPSBpO1xuXG4gICAgZm9yKGxldCBpID0gY3V0X29mZjsgaSA8IG1ldGEuaWR4X3ZhcmFyZzsgKytpKVxuICAgICAgICBhcmdzX3Bvc1thcmdzW2ldLnZhbHVlXSA9IC0xO1xuXG4gICAgLy9UT0RPOiBpZHhfZW5kX3BvcyAoaWYgZGVmYXVsdCBhbmQgbm8gaWR4X3ZhcmFyZylcblxuICAgIC8vIGt3b25seVxuICAgIGNvbnN0IGt3b25seSAgICAgID0gX2FyZ3Mua3dvbmx5YXJncztcbiAgICBjb25zdCBrd19kZWZhdWx0cyA9IF9hcmdzLmt3X2RlZmF1bHRzO1xuXG4gICAgbWV0YS5oYXNfa3cgPSBtZXRhLmlkeF92YXJhcmcgIT09IGN1dF9vZmYgfHwga3dvbmx5Lmxlbmd0aCAhPT0gMDtcblxuICAgIGRvZmZzZXQgPSBrd19kZWZhdWx0cy5sZW5ndGggLSBrd29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrd29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKGt3b25seVtpXSwga3dfZGVmYXVsdHNbaV0sIFwia3dvbmx5XCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgICAgICBhcmdzX3Bvc1thcmcudmFsdWVdID0gLTE7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH1cblxuICAgIC8vIGt3YXJnXG4gICAgaWYoIGhhc19rd2FyZyApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3Mua3dhcmcsIHVuZGVmaW5lZCwgXCJrd2FyZ1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuXG4gICAgICAgIG1ldGEua3dhcmdzID0gYXJnLnZhbHVlO1xuICAgIH1cblxuICAgIC8vVE9ETy4uLlxuICAgIC8qXG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuICAgICovXG5cbiAgICBsZXQgdmlydF9ub2RlOiBhbnk7XG4gICAgaWYoIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBhcmdzWzBdICAgICAgICAgICAgLnB5Y29kZS5zdGFydDtcbiAgICAgICAgY29uc3QgZW5kICAgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG5cbiAgICAgICAgdmlydF9ub2RlID0ge1xuICAgICAgICAgICAgbGluZW5vICAgICAgICA6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0ICAgIDogc3RhcnQuY29sLFxuICAgICAgICAgICAgZW5kX2xpbmVubyAgICA6IGVuZC5saW5lLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5jb2xcbiAgICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIHZpcnRfbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBsaW5lbm8gICAgOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm8gICAgOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImFyZ3NcIiwgbnVsbCwgU1R5cGVfZmN0LCBhcmdzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGRlZnZhbDogYW55LCB0eXBlOnN0cmluZywgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZS5hbm5vdGF0aW9uPy5pZDtcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcbiAgICBpZiggZGVmdmFsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSBjb252ZXJ0X25vZGUoIGRlZnZhbCxjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY2hpbGQgKTtcblxuICAgICAgICBpZiggcmVzdWx0X3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gY2hpbGQucmVzdWx0X3R5cGU7XG4gICAgICAgICAgICBpZihyZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgICAgICAgICByZXN1bHRfdHlwZSA9ICdpbnQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBhcmcuJHt0eXBlfWAsIHJlc3VsdF90eXBlLCBub2RlLmFyZywgY2hpbGRyZW4pO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYF9iXy5hc3NlcnQoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJBc3NlcnRcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKFwiYnJlYWtcIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5icmVha1wiLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkJyZWFrXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKFwiY29udGludWVcIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmNvbnRpbnVlXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29udGludWVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudmFsdWVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZVswXSwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKGAke3RoaXMudmFsdWVbMF19OiAke3RoaXMudmFsdWVbMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0LmFsaWFzXCIsIG51bGwsIFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiYWxpYXNcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBqcyArPSB0b0pTKFwiY29uc3Qge1wiLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvciApO1xuICAgICAgICBqcyArPSB0b0pTKCB0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IgKTtcbiAgICB9XG4gICAganMgKz0gdG9KUyhcIn0gPSBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBpZih0aGlzLnZhbHVlID09PSBudWxsKVxuICAgICAgICBqcyArPSB0b0pTKFwiX19TQlJZVEhPTl9fLmdldE1vZHVsZXMoKVwiLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAganMgKz0gdG9KUyhgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dGhpcy52YWx1ZX1cIilgLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnRcIiwgbnVsbCwgbm9kZS5tb2R1bGUsXG4gICAgICAgIG5vZGUubmFtZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJJbXBvcnRcIiwgXCJJbXBvcnRGcm9tXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRocm93IG5ldyBfYl8uUHl0aG9uRXJyb3IoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJhaXNlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjQgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2NvbnRpbnVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNSBmcm9tIFwiLi9rZXl3b3Jkcy9icmVhay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNiBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yNiBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI3IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI3IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI4IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI5IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI5IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdGVybmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzUgZnJvbSBcIi4vY29udHJvbGZsb3dzL3Rlcm5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM2IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM3IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM3IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzggZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM4IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM5IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zOSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLnVuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcIm9wZXJhdG9ycy5jb21wYXJlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcIm9wZXJhdG9ycy5ib29sZWFuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5iaW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwib3BlcmF0b3JzLmF0dHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJvcGVyYXRvcnMuQXNzaWduT3BcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNFxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNVxuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmdcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnQvYWxpYXNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjNcblx0fSxcblx0XCJrZXl3b3Jkcy5jb250aW51ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImtleXdvcmRzLmJyZWFrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI1XG5cdH0sXG5cdFwia2V5d29yZHMuYXNzZXJ0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI2XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmRlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI4XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGwva2V5d29yZFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay90cnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzJcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zM1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50ZXJuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM1XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzZcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM3XG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzhcblx0fSxcblx0XCJjbGFzcy5jbGFzc2RlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zOVxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV85KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8xNik7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjEpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI2KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8zMSk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05vbmVUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLk5vbmVcIiwgU1R5cGVfTm9uZVR5cGUsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBhZGRTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnTm9uZVR5cGUnLCB7fSk7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgU1R5cGVfYm9vbCwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IENNUE9QU19MSVNULCBnZW5DbXBPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnYm9vbCcsIHtcbiAgICBcbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9ib29sLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSksXG4gICAgXG59KTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIiR7XCIsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9ybWF0dGVkVmFsdWVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgaWYoIGNoaWxkLnJlc3VsdF90eXBlID09PSBTVHlwZV9zdHIpIHtcblxuICAgICAgICAgICAgLy8gaDRja1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgICAgICAgICBlbmQ6IG51bGwgYXMgYW55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLnZhbHVlLCBjdXJzb3IpO1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlID09PSBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Zsb2F0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgU1R5cGVfZmxvYXQsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvYXQyc3RyOiAoZjogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmKCBmIDw9IDFlLTUgfHwgZiA+PSAxZTE2KSB7XG5cbiAgICAgICAgICAgIGxldCBzdHIgPSBmLnRvRXhwb25lbnRpYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHNpZ25faWR4ID0gc3RyLmxlbmd0aC0yO1xuICAgICAgICAgICAgaWYoc3RyW3NpZ25faWR4XSA9PT0gJy0nIHx8IHN0cltzaWduX2lkeF0gPT09ICcrJylcbiAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCxzaWduX2lkeCsxKSArICcwJyArIHN0ci5zbGljZShzaWduX2lkeCsxKTtcbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RyID0gZi50b1N0cmluZygpO1xuICAgICAgICBpZiggISBzdHIuaW5jbHVkZXMoJy4nKSlcbiAgICAgICAgICAgIHN0ciArPSBcIi4wXCI7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufSIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5jb25zdCBTVHlwZV90eXBlX2Zsb2F0ID0gYWRkU1R5cGUoJ3R5cGVbZmxvYXRdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfZmxvYXQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IG90aGVyLnJlc3VsdF90eXBlXG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihvdGhlcik7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfZmxvYXQgfHwgb3RoZXJfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyX3R5cGU7XG5cbiAgICAgICAgICAgIC8vVE9ETzogcG93ZXIuLi5cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9zdHIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiggb3RoZXIudHlwZSA9PT0gXCJsaXRlcmFscy5zdHJcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG90aGVyLnZhbHVlID09PSBcImluZlwiIHx8IG90aGVyLnZhbHVlID09PSBcImluZmluaXR5XCIgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvdGhlci52YWx1ZSA9PT0gXCItaW5mXCJ8fCBvdGhlci52YWx1ZSA9PT0gXCItaW5maW5pdHlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk51bWJlci5ORUdBVElWRV9JTkZJTklUWVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAzKVxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByYEJpZ0ludChwYXJzZUludCgke290aGVyfSwgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDtcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogb3B0aW1pemUgaWYgb3RoZXIgaXMgc3RyaW5nIGxpdHRlcmFsLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgcGFyc2VGbG9hdCgke290aGVyfSlgOyAvLywgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG90aGVyLnJlc3VsdF90eXBlPy5fX2ludF9fIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgICAgIGlmKCBtZXRob2QgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke290aGVyLnJlc3VsdF90eXBlLl9fbmFtZV9ffS5fX2ludF9fIG5vdCBkZWZpbmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgb3RoZXIpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmFkZFNUeXBlKCdmbG9hdCcsIHtcblxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9mbG9hdCxcblxuICAgIF9fc3RyX186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX3N0cixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9hdDJzdHIoJHtub2RlfSlgO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsXG4gICAgICAgICAgICAgICAgICAgIFsnKionLCAnKicsICcvJywgJysnLCAnLSddLFxuICAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgWycvLyddLFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsXG4gICAgICAgIFsnJSddLFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfZmxvYXQsIFsndS4tJ10pLFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0pLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2Zsb2F0OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBzdWZmaXggPSBcIlwiO1xuICAgIGxldCB0YXJnZXQgPSAodGhpcyBhcyBhbnkpLmFzO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgIGlmKHRhcmdldCA9PT0gXCJmbG9hdFwiKSB7XG4gICAgICAgIGlmKCB0aGlzLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpOyAvLyByZW1vdmUgdXNlbGVzcyBwcmVjaXNpb24uXG4gICAgfVxuICAgIGVsc2UgaWYoIHRhcmdldCA9PT0gXCJpbnRcIiB8fCB0aGlzLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICAvLyBpZiBhbHJlYWR5IGJpZ2ludCBkbyBub3QgY2FzdCBpbnRvIGpzaW50IChsb3NzIG9mIHByZWNpc2lvbikuXG4gICAgICAgIHN1ZmZpeCA9IFwiblwiO1xuXG4gICAgLy8gMWUrNTQgc2hvdWxkIGhhZCBiZSBzdG9yZWQgYXMgYmlnaW50LlxuICAgIHJldHVybiB0b0pTKHJgJHt2YWx1ZX0ke3N1ZmZpeH1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB2YWx1ZSA9IG5vZGUudmFsdWU7XG5cbiAgICBpZih2YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyA9PT0gXCJpbnRcIilcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZTtcblxuICAgIGlmKCB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImJpZ2ludFwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVhbF90eXBlID0gdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiID8gU1R5cGVfaW50IDogU1R5cGVfanNpbnQ7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgcmVhbF90eXBlLCB2YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIGlkX2pzb3AsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5jb25zdCBTVHlwZV90eXBlX2ludCA9IGFkZFNUeXBlKCd0eXBlW2ludF0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBub2RlLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgY29uc3Qgb3RoZXJfdHlwZSA9IG90aGVyLnJlc3VsdF90eXBlXG5cbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhlaXIgX19pbnRfXyA/XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQob3RoZXIpO1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX2Zsb2F0IClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoTWF0aC50cnVuYygke290aGVyfSkpYDtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApIHtcblxuICAgICAgICAgICAgICAgIC8vaWYoIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAzKVxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByYEJpZ0ludChwYXJzZUludCgke290aGVyfSwgJHtub2RlLmNoaWxkcmVuWzJdfSkpYDtcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogb3B0aW1pemUgaWYgb3RoZXIgaXMgc3RyaW5nIGxpdHRlcmFsLi4uXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgQmlnSW50KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ2ludCcsIHtcblxuICAgIC8vVE9ETzogZml4IHR5cGUuLi5cbiAgICBfX2NsYXNzX186IFNUeXBlX3R5cGVfaW50LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHtub2RlfS50b1N0cmluZygpYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyogKi9cbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnKiddLCBbU1R5cGVfaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGEsIGIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyonLCBiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCwgWycvJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9mbG9hdF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzKSA9PiBJbnQyTnVtYmVyKHMsICdmbG9hdCcpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJy8vJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnJSddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ3UuLSddLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdyZWFsJztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsnfiddLFxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSApXG4gICAgLyogKi9cblxufSk7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdqc2ludCcsIHtcblxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyonXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIE51bWJlcjJJbnQoYSksICcqJywgTnVtYmVyMkludChiKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LCBbJy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Zsb2F0XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfanNpbnQsIFsnLy8nXSwgW1NUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9qc2ludCwgWyclJ10sIFtTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2pzaW50LFxuICAgICAgICBbJ3UuLSddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2ludCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBOdW1iZXIySW50KGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ34nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdIClcbiAgICAvKlxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LCovXG59KTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIGlmKCB0aGlzLnZhbHVlWzBdID09PSAnXCInKVxuICAgICAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuICAgIHJldHVybiB0b0pTKHJgXCIke3RoaXMudmFsdWV9XCJgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgU1R5cGVfc3RyLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHN9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzLCBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmNvbnN0IFNUeXBlX3R5cGVfc3RyID0gYWRkU1R5cGUoJ3R5cGVbc3RyXScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX3N0cixcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9zdHIgKVxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlcjtcblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9fc3RyX18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9fc3RyX18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ3N0cicsIHtcblxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9zdHIsXG5cbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgW1NUeXBlX3N0cl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9zdHIsIFtcIitcIl0sIFtTVHlwZV9zdHJdKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfc3RyLCBbXCIqXCJdLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDoge1wiaW50XCI6IFwiZmxvYXRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGEucmVzdWx0X3R5cGUgIT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmAke2F9LnJlcGVhdCgke2J9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxufSk7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKFwidmFyIFwiLCBjdXJzb3IpO1xuXG4gICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyhyYCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gLCBjdXJzb3IpO1xuXG4gICAgY29uc3QgcmlnaHRfbm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV07XG4gICAgbGV0IHJjaGlsZDogYW55ID0gcmlnaHRfbm9kZTtcblxuICAgIGlmKCByaWdodF9ub2RlLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludCAmJiB0aGlzLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICByY2hpbGQgPSBOdW1iZXIySW50KHJpZ2h0X25vZGUpO1xuXG4gICAganMgKz0gdG9KUyhyYCA9ICR7cmNoaWxkfWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuXG4gICAgY29uc3QgYW5ub3RhdGlvbiA9IG5vZGU/LmFubm90YXRpb24/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJlc3VsdF90eXBlID0gZ2V0U1R5cGUoYW5ub3RhdGlvbik7XG5cblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVHlwZV9pbnQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgLy8gY291bGQgYmUgaW1wcm92ZWQgSSBndWVzcy5cbiAgICAgICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiggbGVmdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IGxlZnRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXSA9IHJlc3VsdF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJlc3VsdF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICAuLi5sZWZ0cyxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBBc3NpZ25PcGVyYXRvcnMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgbGV0IG9wID0gKEFzc2lnbk9wZXJhdG9ycyBhcyBhbnkpW3RoaXMudmFsdWVdO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfT0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG4gICAgICAgIC8qXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS50YXJnZXQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgbGVmdC5yZXN1bHRfdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdWdBc3NpZ25cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX1bJHt0aGlzLmNoaWxkcmVuWzFdfV1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuW11cIiwgbnVsbCwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUuc2xpY2UsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlN1YnNjcmlwdFwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfS4ke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5hdHRyXCIsIG51bGwsIG5vZGUuYXR0cixcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF0dHJpYnV0ZVwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHJldHVybiB0b0pTKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LCByaWdodCksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IHJpZ2h0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIHR5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQmluT3BcIl07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb29yZGl2X2Zsb2F0OiAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoIGEvYiApO1xuICAgIH0sXG4gICAgZmxvb3JkaXZfaW50OiAoYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gYS9iO1xuICAgICAgICBpZiggcmVzdWx0ID4gMCB8fCBhJWIgPT09IDBuKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICByZXR1cm4gLS1yZXN1bHQ7XG4gICAgfSxcbiAgICBtb2RfZmxvYXQ6IDxUPihhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1vZCA9IChhICUgYiArIGIpICUgYjtcbiAgICAgICAgaWYoIG1vZCA9PT0gMCAmJiBiIDwgMCApXG4gICAgICAgICAgICByZXR1cm4gLTA7XG4gICAgICAgIHJldHVybiBtb2Q7XG4gICAgfSxcbiAgICBtb2RfaW50OiA8VD4oYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICByZXR1cm4gKGEgJSBiICsgYikgJSBiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKCBtdWx0aV9qc29wKHRoaXMsIHRoaXMudmFsdWUsIC4uLnRoaXMuY2hpbGRyZW4pICwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS52YWx1ZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICkgKTtcblxuICAgIGNvbnN0IG9wICAgPSAoYm5hbWUyanNvcCBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgIGNvbnN0IHR5cGUgPSBjaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5ib29sZWFuXCIsIHR5cGUsIG9wLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3AgYXMgYW55KTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgICAgIGlmKCBvcCAhPT0gJ19fZXFfXycgJiYgb3AgIT09ICdfX25lX18nIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bHR5cGV9ICR7b3B9ICR7cnR5cGV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcblxuICAgICAgICAgICAgY29uc3QganNvcCA9IG9wID09PSAnX19lcV9fJyA/ICc9PT0nIDogJyE9PSc7XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBqc29wLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZlcnNlZCA9IHRydWU7XG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBsZWZ0LCByaWdodCwgcmV2ZXJzZWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gJyc7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDAgKVxuICAgICAgICAgICAganMgKz0gdG9KUygnICYmICcsIGN1cnNvcik7XG5cbiAgICAgICAgY29uc3Qgb3AgICAgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICBjb25zdCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlbltpKzFdO1xuXG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzJyApIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICc9PT0nLCByaWdodCksIGN1cnNvcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiggb3AgPT09ICdpcyBub3QnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJyE9PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UT0RPOiBjaGFpbi4uLlxuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyggZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKHRoaXMsIGxlZnQsIG9wLCByaWdodCksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtlLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICAgICAgaWYoIG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5jb25zdHJ1Y3Rvci4kbmFtZX0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZWZ0ICAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHRzID0gbm9kZS5jb21wYXJhdG9ycy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy5jb21wYXJlYCwgU1R5cGVfYm9vbCwgb3BzLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgLi4ucmlnaHRzLFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAvL2xldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBpZiggdGhpcy52YWx1ZSA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiB0b0pTKCB1bmFyeV9qc29wKHRoaXMsICchJywgSW50Mk51bWJlcihsZWZ0LCAnanNpbnQnKSApLCBjdXJzb3IgKTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHJldHVybiB0b0pTKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LyosIHJpZ2h0Ki8pLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sLCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLm9wZXJhbmQgLCBjb250ZXh0ICk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmKCBvcCA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCBTVHlwZV9ib29sLCBcIm5vdFwiLCBbIGxlZnQgXSApO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTk9UIElNUExFTUVOVEVEIScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIFNUeXBlX05vbmVUeXBlLCBudWxsKTtcblxuICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIntcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSs9Mikge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlbltpXX06ICR7dGhpcy5jaGlsZHJlbltpKzFdfWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheShub2RlLmtleXMubGVuZ3RoICogMik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjaGlsZHJlblsyKmldICAgPSBjb252ZXJ0X25vZGUobm9kZS4gIGtleXNbaV0sIGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlblsyKmkrMV0gPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZXNbaV0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMuZGljdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgY2hpbGRyZW5cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRGljdFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5saXN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJMaXN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJPYmplY3QuZnJlZXplKFtcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIl0pXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlR1cGxlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUsIGN1cnNvcik7IC8vVE9ET1xufSIsImltcG9ydCBfcl8gZnJvbSBcIi4uLy4uL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuICAgIGxldCB2YWx1ZSA9IG5vZGUuaWQ7XG5cbiAgICBpZiggdmFsdWUgPT09ICdzZWxmJylcbiAgICAgICAgdmFsdWUgPSAndGhpcyc7IC8vVE9ETyB0eXBlIG9mIGN1cnJlbnQgY29udGV4dCAhIC0+IHNlbGYgaW4gbG9jYWxfc3ltYm9scyA/XG4gICAgZWxzZSBpZiggdmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1t2YWx1ZV07XG5cbiAgICAvKlxuICAgICAgICAvL1RPRE8gZ2xvYmFsU3ltYm9sc1xuICAgIGVsc2UgaWYodmFsdWUgaW4gX3JfKSB7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgX3JfXSkgKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBgY2xhc3MuJHt2YWx1ZX1gO1xuXG4gICAgICAgIHZhbHVlID0gYF9yXy4ke3ZhbHVlfWA7XG4gICAgfVxuICAgICovXG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59XG5cblxuLy8gX190cmFjZWJhY2tfX1xuICAgIC8vIHRiX25leHRcbiAgICAvLyB0Yl9mcmFtZVxuICAgICAgICAvLyBmX2JhY2sgP1xuICAgICAgICAvLyBmX2xvY2FsIDogZW5hYmxlIG9ubHkgaW4gY29tcGF0IG1vZGUuXG4gICAgICAgIC8vIGZfbGluZW5vIChsaW5lKVxuICAgICAgICAvLyBmX2NvZGVcbiAgICAgICAgICAgIC8vIGNvX25hbWUgKGZjdCBuYW1lID8pXG4gICAgICAgICAgICAvLyBjb19maWxlbmFtZSIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcIi4vRXhjZXB0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0pTRXhjZXB0aW9uIGV4dGVuZHMgUHlfRXhjZXB0aW9uIHtcblxufSIsImltcG9ydCBSVU5USU1FXzAgZnJvbSBcIi4vb2JqZWN0LnRzXCI7XG5pbXBvcnQgUlVOVElNRV8xIGZyb20gXCIuL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHNcIjtcbmltcG9ydCBSVU5USU1FXzIgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiSlNFeGNlcHRpb25cIjogUlVOVElNRV8xLFxuXHRcIkV4Y2VwdGlvblwiOiBSVU5USU1FXzIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJVTlRJTUU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9vYmplY3Qge1xuXG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYoICEobmFtZSBpbiBtb2R1bGVzKSApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBtb2R1bGUgb2YgbW9kdWxlc1tuYW1lXSkgeyBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0cG9zKG5vZGU6IGFueVtdKSB7XG5cbiAgICBsZXQgYmVnID0gbm9kZVswXTtcbiAgICBsZXQgZW5kID0gbm9kZVtub2RlLmxlbmd0aC0xXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgIC8vY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubzogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcblxuICAgIGlmKCBsaW5lLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkV4cHJcIilcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG4gICAgLypcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlOyovXG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dHxudWxsID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5sb2NhbF9zeW1ib2xzID0gcGFyZW50X2NvbnRleHQgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKG51bGwpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogey4uLnBhcmVudF9jb250ZXh0LmxvY2FsX3N5bWJvbHN9XG4gICAgfVxuICAgIHR5cGU7XG4gICAgbG9jYWxfc3ltYm9sczogUmVjb3JkPHN0cmluZywgU1R5cGVPYmp8bnVsbD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQoKTtcblxuICAgIC8vVE9ETzogYnVpbHRpbl9zeW1ib2xzXG4gICAgLy9UT0RPOiBmaXggdHlwZXMuLi5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbJ2ludCddICAgPSBTVHlwZV9pbnQgIC5fX2NsYXNzX187XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzWydzdHInXSAgID0gU1R5cGVfc3RyICAuX19jbGFzc19fO1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1snZmxvYXQnXSA9IFNUeXBlX2Zsb2F0Ll9fY2xhc3NfXztcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheShhc3QuYm9keS5sZW5ndGgpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3QuYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICAvL1RPRE86IGRldGVjdCBjb21tZW50c1xuICAgICAgICByZXN1bHRbaV0gPSBjb252ZXJ0X2xpbmUoYXN0LmJvZHlbaV0sIGNvbnRleHQpO1xuXG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHRbaV0udHlwZSk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiLy8gQHRzLW5vY2hlY2tcblxuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbnR5cGUgQ3Vyc29yID0ge1xuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGxpbmUgIDogbnVtYmVyLFxuICAgIGxpbmVfb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3Qgbm9kZXMgPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcblxuICAgIGxldCBjdXJzb3IgPSB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgbGluZV9vZmZzZXQgOiAwXG4gICAgfTtcblxuICAgIGxldCBjaGFyO1xuICAgIGRvIHtcbiAgICAgICAgbm9kZXMucHVzaCggcGFyc2VFeHByZXNzaW9uKGNvZGUsIGN1cnNvcikgYXMgYW55KTtcbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgICAgIHdoaWxlKCBjaGFyID09PSAnXFxuJyApIHtcbiAgICAgICAgICAgIGNoYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0gY3Vyc29yLm9mZnNldDtcblxuICAgIH0gd2hpbGUoIGNoYXIgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgLy9jb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHQvL2NvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2NvbnZlcnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTeW1ib2woY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJ2EnICYmIGNhciA8PSAneicgfHwgY2FyID49ICdBJyAmJiBjYXIgPD0gJ1onIHx8IGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyB8fCBjYXIgPT0gJ18nIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KTtcblxuICAgIC8vVE9ETzogaWYga2V5d29yZC4uLlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwic3ltYm9sXCIsXG4gICAgICAgIHZhbHVlICAgOiBzeW1ib2wsIC8vVE9ETzogY2YgY29udmVydCAoc2VhcmNoIGluIGxvY2FsIHZhcmlhYmxlcy9Db250ZXh0Li4uKVxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19jb252ZXJ0XG4gICAgfTtcbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19pbnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIC8vVE9ETzogcmVhbC4uLlxuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5pbnRcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfaW50LFxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19zdHIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJ1wiJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgICsrY3Vyc29yLm9mZnNldDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5zdHJpbmdcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfc3RyLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG5cbiAgICBsZXQgbGVmdCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICBpZiggY2hhciA9PT0gJ1xcbicpXG4gICAgICAgIHJldHVybiBsZWZ0O1xuXG4gICAgbGV0IG9wID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIG9wIS5jaGlsZHJlblswXSA9IGxlZnQ7XG4gICAgb3AucHljb2RlLnN0YXJ0ID0gbGVmdC5weWNvZGUuc3RhcnQ7XG5cbiAgICBsZXQgdmFsdWVzID0gW29wLCBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcildO1xuXG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgIT09ICdcXG4nICkge1xuXG4gICAgICAgIGxldCBvcDIgICA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGxldCBvcDEgID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl07XG4gICAgICAgIGxldCBsZWZ0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG5cbiAgICAgICAgLy9UT0RPOiBoYW5kbGUgb3AgcHJpb3JpdHkuLi5cbiAgICAgICAgLy8gKGErYikrY1xuXG4gICAgICAgIC8vIChhK2IpXG4gICAgICAgIG9wMSEuY2hpbGRyZW5bMV0gPSBsZWZ0O1xuICAgICAgICBvcDEhLnB5Y29kZS5lbmQgID0gbGVmdC5weWNvZGUuZW5kOyBcblxuICAgICAgICAvLyAoKStjXG4gICAgICAgIG9wMiEuY2hpbGRyZW5bMF0gPSBvcDE7XG4gICAgICAgIG9wMi5weWNvZGUuc3RhcnQgPSBvcDEucHljb2RlLnN0YXJ0O1xuXG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdID0gb3AyO1xuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXSA9IHJpZ2h0O1xuXG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIH1cblxuICAgIHZhbHVlc1swXSEuY2hpbGRyZW5bMV0gPSB2YWx1ZXNbMV07XG4gICAgdmFsdWVzWzBdIS5weWNvZGUuZW5kICA9IHZhbHVlc1sxXS5weWNvZGUuZW5kO1xuXG4gICAgcmV0dXJuIHZhbHVlc1swXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRvcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXQrK107XG4gICAgLypcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTsqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwib3BlcmF0b3JzLlwiICsgY2hhcixcbiAgICAgICAgdmFsdWUgICA6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBDT1JFX01PRFVMRVNbXCJvcGVyYXRvcnMuXCIgKyBjaGFyXS5BU1QySlMsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VuKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgKVxuICAgICAgICBjaGFyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIC8vIGlnbm9yZSBjaGFyXG4gICAgaWYoIGNoYXIgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gbnVsbFxuICAgIGlmKCBjaGFyID09PSAnXCInKVxuICAgICAgICBub2RlID0gcGFyc2VTdHJpbmcoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICdhJyAmJiBjaGFyIDw9ICd6JyB8fCBjaGFyID49ICdBJyAmJiBjaGFyIDw9ICdaJyB8fCBjaGFyID09ICdfJyApXG4gICAgICAgIG5vZGUgPSBwYXJzZVN5bWJvbChjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBub2RlID0gcGFyc2VOdW1iZXIoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUgPSBwYXJzZU9wZXJhdG9yKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIC8vOyB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoZW4gcGFyc2luZyAke2NoYXJ9IGF0ICR7Y3Vyc29yLmxpbmV9OiR7Y3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldH0gKCR7Y3Vyc29yLm9mZnNldH0pYCk7XG5cbiAgICBub2RlLnB5Y29kZSA9IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UT0RPOiBpcyBuZXh0IGFuIG9wZXJhdG9yID8gLT4gY29uc3RydWlyZSBhcmJyZS4uLlxuICAgIC8vVE9ETyBoYW5kbGUgb3BlcmF0b3JzID9cblxuICAgIHJldHVybiBub2RlO1xuXG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IHtfYl8sIF9yX307XG5cbi8vIGNsYXNzZSA/XG5cblxuZXhwb3J0IGNsYXNzIFNCcnl0aG9uIHtcblxuICAgICNyZWdpc3RlcmVkX0FTVDogUmVjb3JkPHN0cmluZywgQVNUPiA9IHt9O1xuICAgICNleHBvcnRlZDogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pj4gPSB7XG4gICAgICAgIGJyb3dzZXI6IGdsb2JhbFRoaXNcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBydW5BU1QoKSA/XG4gICAgLy9UT0RPOiBydW5QeXRob25Db2RlKCkgP1xuXG4gICAgLy9UT0RPOiBzb21laG93LCByZW1vdmUgQVNUIGFyZyA/Pz9cbiAgICBidWlsZE1vZHVsZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgaWYoYXN0LmZpbGVuYW1lIGluIHRoaXMuI3JlZ2lzdGVyZWRfQVNUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBU1QgJHthc3QuZmlsZW5hbWV9IGFscmVhZHkgcmVnaXN0ZXJlZCFgKTtcblxuICAgICAgICAvL1RPRE86IGZpbGVuYW1lIDIgbW9kdWxlbmFtZS5cbiAgICAgICAgdGhpcy4jcmVnaXN0ZXJlZF9BU1RbYXN0LmZpbGVuYW1lXSA9IGFzdDtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGpzY29kZSk7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgfVxuXG4gICAgcnVuSlNDb2RlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICB0aGlzLiNleHBvcnRlZFthc3QuZmlsZW5hbWVdID0gdGhpcy5idWlsZE1vZHVsZShqc2NvZGUsIGFzdCkodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG5leHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmludGVyZmFjZSBJQVNUTm9kZSAge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW107XG5cdHJlc3VsdF90eXBlOiBTVHlwZU9ianxudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIGltcGxlbWVudHMgSUFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGwsIF92YWx1ZTogYW55ID0gbnVsbCwgY2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdKSB7XG5cblx0XHR0aGlzLnR5cGUgICA9IHR5cGU7XG5cdFx0dGhpcy5yZXN1bHRfdHlwZSA9IHJlc3VsdF90eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcIi4vQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzLCBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwiLi9TVHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGJuYW1lMnB5bmFtZSA9IHtcbiAgICBcIlVTdWJcIjogXCJfX25lZ19fXCIsXG4gICAgXCJOb3RcIiA6IFwibm90XCIsXG5cbiAgICBcIlBvd1wiIDogXCJfX3Bvd19fXCIsXG5cbiAgICBcIk11bHRcIiAgICA6IFwiX19tdWxfX1wiLFxuICAgIFwiRGl2XCIgICAgIDogXCJfX3RydWVkaXZfX1wiLFxuICAgIFwiRmxvb3JEaXZcIjogXCJfX2Zsb29yZGl2X19cIixcbiAgICBcIk1vZFwiICAgICA6IFwiX19tb2RfX1wiLFxuXG4gICAgXCJBZGRcIiAgICAgOiBcIl9fYWRkX19cIixcbiAgICBcIlN1YlwiICAgICA6IFwiX19zdWJfX1wiLFxuXG4gICAgXCJJc1wiICAgICAgOiBcImlzXCIsXG4gICAgXCJJc05vdFwiICAgOiBcImlzIG5vdFwiLFxuICAgIFwiRXFcIiAgICAgIDogXCJfX2VxX19cIixcbiAgICBcIk5vdEVxXCIgICA6IFwiX19uZV9fXCIsXG5cbiAgICBcIkd0XCIgICAgICA6IFwiX19ndF9fXCIsXG4gICAgXCJHdEVcIiAgICAgOiBcIl9fZ2VfX1wiLFxuICAgIFwiTHRcIiAgICAgIDogXCJfX2x0X19cIixcbiAgICBcIkx0RVwiICAgICA6IFwiX19sZV9fXCIsXG5cbiAgICBcIkludmVydFwiICA6IFwiX19ub3RfX1wiLFxuXG4gICAgXCJCaXRPclwiICAgOiBcIl9fb3JfX1wiLFxuICAgIFwiQml0WG9yXCIgIDogXCJfX3hvcl9fXCIsXG4gICAgXCJCaXRBbmRcIiAgOiBcIl9fYW5kX19cIixcbiAgICBcIlJTaGlmdFwiICA6IFwiX19yc2hpZnRfX1wiLFxuICAgIFwiTFNoaWZ0XCIgIDogXCJfX2xzaGlmdF9fXCIsXG59XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlPcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX3Jwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX3JtdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX3J0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19yZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX3Jtb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19yYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX3JzdWJfXycsXG5cbiAgICAnX19lcV9fJyAgICAgOiAnX19lcV9fJyxcbiAgICAnX19uZV9fJyAgICAgOiAnX19uZV9fJyxcblxuICAgICdfX2x0X18nICAgICA6ICdfX2d0X18nLFxuICAgICdfX2d0X18nICAgICA6ICdfX2x0X18nLFxuICAgICdfX2xlX18nICAgICA6ICdfX2dlX18nLFxuICAgICdfX2dlX18nICAgICA6ICdfX2xlX18nLFxuXG4gICAgJ19fbm90X18nICAgIDogJ19fcm5vdF9fJyxcbiAgICAnX19vcl9fJyAgICAgOiAnX19yb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19fcmFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19yeG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX3Jsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19fcnJzaGlmdF9fJyxcbn1cblxuZXhwb3J0IGNvbnN0IEFzc2lnbk9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19faXBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19faW11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19faXRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX2lmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19faW1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX2lhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19faXN1Yl9fJyxcblxuICAgICdfX29yX18nICAgICA6ICdfX2lvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19pYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX2l4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19faWxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19pcnNoaWZ0X18nLFxufVxuXG5cbmV4cG9ydCBjb25zdCBqc29wMnB5b3AgPSB7XG4gICAgJyoqJzogJ3BvdycsXG4gICAgJyonIDogJ211bCcsXG4gICAgJy8nIDogJ3RydWVkaXYnLFxuICAgICcvLyc6ICdmbG9vcmRpdicsXG4gICAgJyUnIDogJ21vZCcsXG4gICAgXG4gICAgJysnICA6ICdhZGQnLFxuICAgICctJyAgOiAnc3ViJyxcbiAgICAndS4tJzogJ25lZycsXG5cbiAgICAnPT0nIDogJ2VxJyxcbiAgICAnIT0nIDogJ25lJyxcbiAgICAnPCcgIDogJ2x0JyxcbiAgICAnPD0nIDogJ2xlJyxcbiAgICAnPj0nIDogJ2dlJyxcbiAgICAnPicgIDogJ2d0JyxcblxuICAgICd+JyA6ICdub3QnLFxuICAgICd8JyA6ICdvcicsXG4gICAgJyYnIDogJ2FuZCcsXG4gICAgJ14nIDogJ3hvcicsXG4gICAgJzw8JzogJ2xzaGlmdCcsXG4gICAgJz4+JzogJ3JzaGlmdCdcbn07XG5cbi8vIFRPRE86IHVuYXJ5IG9wIHRvby4uLlxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9PcGVyYXRvcnMvT3BlcmF0b3JfcHJlY2VkZW5jZSN0YWJsZVxuZXhwb3J0IGNvbnN0IEpTT3BlcmF0b3JzID0gW1xuICAgIFsnIScsICcrKycsICctLScsICd+JywgJ3UuLSddLFxuICAgIFsnKionXSwgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJysnLCAnLSddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnPCcsICc8PScsICc+PScsICc+J10sXG4gICAgWyc9PScsICchPScsICc9PT0nLCAnIT09J10sXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJ14nXSwgIC8vVE9ET1xuICAgIFsnfCddLCAgLy9UT0RPXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWyc9J10gLyogZXQgdG91cyBsZXMgZMOpcml2w6lzICovIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIC8vIGV0Yy5cbl07XG5cbi8qXG5odHRwczovL2RvY3MucHl0aG9uLm9yZy8zL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjY2FsbGFibGVcblxuLT4gY2xhc3Nlc1xuYm9vbCgpXG5mbG9hdCgpXG5pbnQoKVxuc3RyKClcbmJ5dGVhcnJheSgpIFtVaW50OEFycmF5XSAoUlcpXG5ieXRlcygpICAgICBbP10gICAgICAgICAgKFJPKSA8LSBubyB0eXBlcyBpbiBKUy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0gVWludDhBcnJheSB3aXRoIGZsYWcgPyBmcmVlemUoKSBbSlMgdW5zYWZlXVxuICAgICAgICAgICAgYlwiZVxceEZGXCIgaW5zdGVhZCBvZiBbMTAxLDEwMV0sIGV0Yy4gKDMyIDw9IGJ5dCA8PSAxMjYpXG50eXBlKClcbmxpc3QoKSAgICAgIFtBcnJheV1cbnR1cGxlKCkgICAgIFtPYmplY3QuZnJvemVuKEFycmF5KV1cblxuc2V0KCkgICAgICAgLy8gcmVsaWVzIG9uIGhhc2goKS4uLiA9PiBzZXRbbGl0ZXJhbHNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gc2V0KCkgLyA8LSBKUyBzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgID0+IGJ5dGVzL2J5dGVhcnJheS9ldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBTZXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBJbnRlcm5hbCBrZXlzKCkgc2V0IFtyZWNvbXB1dGUgaGFzaCB3aGVuIGFkZC9yZW1vdmVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW50ZXJuYWxseSBzdG9yZWQgYXMgTWFwKGhhc2gsIHZhbHVlKSAoPylcbmZyb3plbnNldCgpICAgICAgICAgICAgPT4gZXh0ZW5kcyBzZXQgdG8gcmVwbGFjZSBtb2RpZmllcnMuXG5cbmRpY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzdHJdIGFzIE9iamVjdC5jcmVhdGUobnVsbCkgKyAoYW5kIHB1cmUgSlNPYmogYXMgZGljdFtzdHJdIClcbiAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgTWFwKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBTZXQoaGFzaCkgLyBNYXAoaGFzaCwga2V5KSAvIE1hcChrZXksIGhhc2gpID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQvc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IE1hcChrZXksIHZhbHVlKVxuXG5vYmplY3QoKVxuY29tcGxleCgpXG5tZW1vcnl2aWV3KCkgICAgICAgICAgICA9PiBBcnJheUJ1ZmZlciA/XG5cbi0+IHByaW50XG5hc2NpaSgpXG5iaW4oKVxuaGV4KClcbm9jdCgpXG5yZXByKClcbmhhc2goKVxuXG4tPiBtYXRoc1xuYWJzKClcbmRpdm1vZCgpXG5wb3coKVxucm91bmQoKVxuXG4tPiBsaXN0c1xuYWxsKClcbmFueSgpXG5maWx0ZXIoKVxubWFwKClcbm1heCgpXG5taW4oKVxuc3VtKClcbmxlbigpXG5lbnVtZXJhdGUoKVxucmV2ZXJzZWQoKVxuc2xpY2UoKVxuc29ydGVkKClcbnppcCgpXG5cbi0+IGl0ZXJcbnJhbmdlKClcbmFpdGVyKClcbml0ZXIoKVxuYW5leHQoKVxubmV4dCgpXG5cbi0+IHN0clxub3JkKClcbmNocigpXG5mb3JtYXQoKVxucHJpbnQoKVxuZlwiXCJcblxuY2FsbGFibGUoKVxuY2xhc3NtZXRob2QoKVxuc3RhdGljbWV0aG9kKClcbnByb3BlcnR5KClcbnN1cGVyKClcbmlzaW5zdGFuY2UoKVxuaXNzdWJjbGFzcygpXG5kZWxhdHRyKClcbmdldGF0dHIoKVxuaGFzYXR0cigpXG5zZXRhdHRyKClcbmRpcigpXG5cbmV2YWwoKVxuZXhlYygpXG5jb21waWxlKClcbmJyZWFrcG9pbnQoKVxuXG5nbG9iYWxzKClcbmxvY2FscygpXG52YXJzKClcbl9faW1wb3J0X18oKVxuXG5pZCgpXG4gICAgLT4gb24tZGVtYW5kIHdlYWtyZWYgP1xuXG5oZWxwKClcbmlucHV0KClcbm9wZW4oKVxuXG4qL1xuXG4vKlxudW5hcnlcbi0gcG9zICh1bmFyeSArKVxuXG4tIGJvb2xcbi0gZmxvYXRcbi0gaW50XG4tIHN0clxuLSByZXByXG5cbi0gYWJzXG4tIGNlaWxcbi0gZmxvb3Jcbi0gcm91bmRcbi0gdHJ1bmNcblxuYmluYXJ5XG4tIHBvdy9ycG93XG4tIGRpdm1vZC9yZGl2bW9kXG5cbmNsYXNzXG4tIGNsYXNzXG4tIG5ld1xuLSBpbml0XG4tIGluaXRfc3ViY2xhc3NcblxuLSBzdWJjbGFzc2hvb2sgLy8gX19pc2luc3RhbmNlY2hlY2tfXyBcblxuLSBkaXJcbi0gZGVsYXR0clxuLSBzZXRhdHRyXG4tIGdldGF0dHJpYnV0ZVxuXG4tIGRvY1xuLSBmb3JtYXRcbi0gZ2V0bmV3YXJnc1xuLSBoYXNoXG4tIGluZGV4ICg/KVxuLSBzaXplb2ZcbiovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogQVNUTm9kZSwgdGFyZ2V0ID0gXCJmbG9hdFwiKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgIHJldHVybiBhO1xuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19tdWxfXycgfHwgYS52YWx1ZSA9PT0gJ19fcm11bF9fJyApIHtcbiAgICAgICAgY29uc3QgbHR5cGUgPSBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuICAgICAgICBjb25zdCBydHlwZSA9IGEuY2hpbGRyZW5bMV0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGlmKCAgICAobHR5cGUgPT09IFNUeXBlX2ludCB8fCBsdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09IFNUeXBlX2ludCB8fCBydHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBcImZsb2F0XCIgKVxuICAgICAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xuXG4gICAgLy8gaW50IC0+IGpzaW50IGNhc3QgaXMgZmFjdWx0YXRpdmUuLi5cbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE51bWJlcjJJbnQoYTogQVNUTm9kZSkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gJ2ludCc7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09IFNUeXBlX2pzaW50KSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSBcImludFwiO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmBCaWdJbnQoJHthfSlgO1xufVxuXG5sZXQgSlNPcGVyYXRvcnNQcmlvcml0eTogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuZm9yKGxldCBpID0gMDsgaSA8IEpTT3BlcmF0b3JzLmxlbmd0aDsgKytpKSB7XG5cbiAgICBjb25zdCBwcmlvcml0eSA9IEpTT3BlcmF0b3JzLmxlbmd0aCAtIGk7XG4gICAgZm9yKGxldCBvcCBvZiBKU09wZXJhdG9yc1tpXSlcbiAgICAgICAgSlNPcGVyYXRvcnNQcmlvcml0eVtvcF0gPSBwcmlvcml0eTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZWRfb3BlcmF0b3I8VCBleHRlbmRzIGtleW9mIHR5cGVvZiBCaW5hcnlPcGVyYXRvcnM+KG9wOiBUKSB7XG4gICAgcmV0dXJuIEJpbmFyeU9wZXJhdG9yc1tvcF07XG59XG5cbmNvbnN0IExFRlQgID0gMTtcbmNvbnN0IFJJR0hUID0gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpX2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgLi4udmFsdWVzOiBBU1ROb2RlW10pIHtcblxuICAgIGNvbnN0IGZpcnN0ID0gdmFsdWVzWzBdO1xuICAgIGlmKGZpcnN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlR8UklHSFQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsYXN0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG4gICAgaWYobGFzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtmaXJzdH1gO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHJlc3VsdCA9IHJgJHtyZXN1bHR9ICYmICR7dmFsdWVzW2ldfWA7XG5cbiAgICBpZiggXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWRfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSB7XG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke2F9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGV8YW55LCBvcDogc3RyaW5nLCBiOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGlmKGIgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7YX0ke29wfSR7Yn1gO1xuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCBhOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke29wfSR7YX1gO1xuXG4gICAgaWYob3AgPT09ICctJylcbiAgICAgICAgb3AgPSAndS4tJztcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIChkaXJlY3Rpb24gJiBMRUZUKSAmJiBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbnR5cGUgR2VuVW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X3NlbGYgICA/OiAoczogYW55KSA9PiBhbnksXG4gICAgc3Vic3RpdHV0ZV9jYWxsID86IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiBhbnlcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlblVuYXJ5T3BzKHJldF90eXBlICA6IFNUeXBlT2JqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wcyAgICAgICA6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmID0gKGEpID0+IGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlblVuYXJ5T3BzX09wdHMgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBTVHlwZU9iaikgPT4gcmV0X3R5cGU7XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICd1Li0nKVxuICAgICAgICAgICAgb3AgPSAnLSc7XG5cbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsID8/PSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbnR5cGUgR2VuQmluYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9vdGhlciAgID86IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgY29udmVydF9zZWxmICAgID86IChzOiBhbnkpID0+IGFueSxcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGV8YW55LCBvdGhlcjogQVNUTm9kZXxhbnkpID0+IGFueVxufTtcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbnZlcnQoY29udmVydDogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xuICAgIHJldHVybiAobm9kZTogQVNUTm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBzcmMgICAgPSBub2RlLnJlc3VsdF90eXBlIS5fX25hbWVfXztcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gY29udmVydFtzcmNdO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgICAgLy9UT0RPOiBpbXByb3ZlOlxuICAgICAgICBpZiggc3JjID09PSBcImludFwiKVxuICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIobm9kZSwgdGFyZ2V0KTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gXCJpbnRcIiApXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyMkludChub2RlKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmZvdW5kIGNvbnZlcnNpb25cIik7XG4gICAgfTtcbn1cblxuY29uc3QgaWRGY3QgPSA8VD4oYTogVCkgPT4gYTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkJpbmFyeU9wcyhyZXRfdHlwZTogU1R5cGVPYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiBTVHlwZU9ialtdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlciAgID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gaWRGY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30pIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiBvdGhlcl90eXBlLmluY2x1ZGVzKG8pID8gcmV0X3R5cGUgOiBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgY29uc3QgY29udl9vdGhlciAgPSBnZW5lcmF0ZUNvbnZlcnQoY29udmVydF9vdGhlcik7XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICcvLycpXG4gICAgICAgICAgICBvcCA9ICcvJztcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBvcCwgY29udl9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByY3MgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252X290aGVyKG90aGVyKSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252X290aGVyKG8pICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNhbWVfb3JkZXIgPyBmY3QgOiBcbiAgICAgICAgICAgIHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252X290aGVyKG8pLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdFtgX19yJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogcmNzLFxuICAgICAgICB9O1xuICAgICAgICBpZiggY29udmVydF9zZWxmID09PSBpZEZjdCAmJiBzdWJzdGl0dXRlX2NhbGwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlc3VsdFtgX19pJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKCBvcCA9PT0gJysnICYmIG90aGVyLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJysrJywgc2VsZik7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvcCA9PT0gJy0nICYmIG90aGVyLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0tJywgc2VsZik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgc2VsZiwgb3ArJz0nLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgQ01QT1BTX0xJU1QgPSBbJz09JywgJyE9JywgJz4nLCAnPCcsICc+PScsICc8PSddIGFzIGNvbnN0O1xuXG5jb25zdCByZXZlcnNlID0ge1xuICAgIFwiPT1cIjogXCI9PVwiLFxuICAgIFwiIT1cIjogXCIhPVwiLFxuICAgIFwiPlwiOiBcIjxcIixcbiAgICBcIjxcIjogXCI+XCIsXG4gICAgXCI+PVwiOiBcIjw9XCIsXG4gICAgXCI8PVwiOiBcIj49XCIsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQ21wT3BzKCAgb3BzICAgICAgIDogcmVhZG9ubHkgKGtleW9mIHR5cGVvZiByZXZlcnNlKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IHJlYWRvbmx5IFNUeXBlT2JqW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gaWRGY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuQmluYXJ5T3BzX09wdHMgPSB7fSApIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiBvdGhlcl90eXBlLmluY2x1ZGVzKG8pID8gU1R5cGVfYm9vbCA6IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG5cbiAgICAgICAgbGV0IGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvcCA9IG9wO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGNvbnZlcnRfc2VsZihzZWxmKTtcbiAgICAgICAgICAgIGxldCBiID0gY29udl9vdGhlcihvdGhlcik7XG4gICAgICAgICAgICBpZiggcmV2ZXJzZWQgKSB7XG4gICAgICAgICAgICAgICAgW2EsYl3CoD0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYucmVzdWx0X3R5cGUgPT09IG90aGVyLnJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb3AgPSBjb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCBjb3AsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udl9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5cblxuZXhwb3J0IGNsYXNzIEJvZHkge1xuXG4gICAgbm9kZTtcbiAgICBwcmludF9icmFja2V0O1xuICAgIGlkeDtcblxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IEFTVE5vZGUsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaWR4ID0gbm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgLy9UT0RPIHNlYXJjaCBib2R5Li4uXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMucHJpbnRfYnJhY2tldCA9IHByaW50X2JyYWNrZXQ7XG4gICAgfVxuXG4gICAgdG9KUyhjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgICAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldClcbiAgICAgICAgICAgIGpzKz1cIntcIjtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmlkeF07Ly9ib2R5OiBBU1ROb2RlW107XG4gICAgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldCkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvcik7XG4gICAgICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBib2R5LmpzY29kZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG59IiwiXG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUnOyIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuY29uc3QgX25hbWUyU1R5cGU6IFJlY29yZDxzdHJpbmcsU1R5cGVPYmo+ID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNUeXBlPFQgZXh0ZW5kcyBTVHlwZU9iaj4obmFtZTogc3RyaW5nKTogVCB7XG4gICAgcmV0dXJuIChfbmFtZTJTVHlwZVtuYW1lXSA/Pz0ge19fbmFtZV9fOiBuYW1lfSkgYXMgVDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNUeXBlKG5hbWU6IHN0cmluZywgdHlwZTogT21pdDxTVHlwZU9iaiwgJ19fbmFtZV9fJz4pIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggZ2V0U1R5cGUobmFtZSksIHR5cGUgKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNUeXBlX2ludCAgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiaW50XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2pzaW50ICAgICAgICAgICAgICA9IGdldFNUeXBlKFwianNpbnRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfZmxvYXQgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJmbG9hdFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9ib29sICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImJvb2xcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfc3RyICAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJzdHJcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfTm9uZVR5cGUgICAgICAgICAgID0gZ2V0U1R5cGUoXCJOb25lVHlwZVwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgPSBnZXRTVHlwZShcIk5vdEltcGxlbWVudGVkVHlwZVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbi8vIGRlY2xhcmUgYWxsIGJ1aWx0aW4gdHlwZXMuLi5cbmltcG9ydCAnLi9zdHJ1Y3RzL1NUeXBlQnVpbHRpbic7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsIkJvZHkiLCJhc3QyanMiLCJhc3QiLCJleHBvcnRlZCIsImpzIiwiZmlsZW5hbWUiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsIm5vZGVzIiwiYXN0bm9kZTJqcyIsInR5cGUiLCJwdXNoIiwidmFsdWUiLCJ0b0pTIiwibmV3bGluZSIsImpvaW4iLCJyIiwic3RyIiwiYXJncyIsImxlbmd0aCIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJwcmludF9icmFja2V0Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJqc2NvZGUiLCJlbmQiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJiYXNlIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnZlcnQiLCJjb250ZXh0IiwibG9jYWxfc3ltYm9scyIsIm5hbWUiLCJfX25hbWVfXyIsImJhc2VzIiwiRXJyb3IiLCJicnl0aG9uX25hbWUiLCJfY3Vyc29yIiwiX2NvbnRleHQiLCJOdW1iZXIySW50IiwiYmVnIiwiaW5jciIsIlNUeXBlX2ludCIsInRhcmdldCIsImlkIiwiaXRlciIsImNvbnN0cnVjdG9yIiwiJG5hbWUiLCJmdW5jIiwibWFwIiwibiIsImtleXdvcmQiLCJvZmZzZXQiLCJsaXN0cG9zIiwiU1R5cGVfYm9vbCIsImlmYmxvY2siLCJjb25kIiwidGVzdCIsInJlc3VsdF90eXBlIiwic2JyeXRob25fdHlwZSIsImN1ciIsIm9yZWxzZSIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJhc3Rub2RlIiwiY2MiLCJweWNvZGUiLCJib2R5X3RydWUiLCJib2R5X2ZhbHNlIiwiY29uc29sZSIsIndhcm4iLCJoYW5kbGVycyIsImJvZHlfaWR4IiwidW5kZWZpbmVkIiwiaGFuZGxlciIsImgiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInNiIiwiZ2V0QVNURm9yIiwic3RhY2syYXN0bm9kZXMiLCJwYXJzZV9zdGFjayIsInNwbGl0IiwiaXNWOCIsImwiLCJfIiwiX2xpbmUiLCJfY29sIiwic2xpY2UiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwibG9nIiwicHJpbnRfb2JqIiwib2JqIiwiZW50cmllcyIsImRhdGEiLCJzZXAiLCJyZXN1bHQiLCJkZWZhdWx0X2NhbGwiLCJtZXRhIiwiX19jYWxsX18iLCJrd19wb3MiLCJuYl9wb3MiLCJpZHhfZW5kX3BvcyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwiTWF0aCIsIm1heCIsImlkeF92YXJhcmciLCJwb3Nfc2l6ZSIsImhhc19rdyIsImt3Iiwia3dhcmdzIiwiY3V0b2ZmIiwibWluIiwiYXJnc19uYW1lcyIsImhhc19rd2FyZ3MiLCJhcmdzX3BvcyIsImFyZyIsInN1YnN0aXR1dGVfY2FsbCIsImZjdF90eXBlIiwicmV0X3R5cGUiLCJyZXR1cm5fdHlwZSIsImtleXdvcmRzIiwiYmluYXJ5X2pzb3AiLCJlbmRzV2l0aCIsImFyZ3MyanMiLCJfYXJncyIsIlNUeXBlX2ZjdCIsImt3X3N0YXJ0IiwibGFzdCIsImFyZzJqcyIsImdldFNUeXBlIiwiU1R5cGVfTm9uZVR5cGUiLCJpc01ldGhvZCIsImZjdF9yZXR1cm5fdHlwZSIsInBvc29ubHlhcmdzIiwiYW5ub3RhdGlvbiIsInJldHVybnMiLCJjb252ZXJ0X2FyZ3MiLCJyZXQiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJ0b3RhbF9hcmdzIiwia3dvbmx5YXJncyIsInBvc19kZWZhdWx0cyIsImRlZmF1bHRzIiwicG9zb25seSIsImRvZmZzZXQiLCJjb252ZXJ0X2FyZyIsIm5iX3Bvc19kZWZhdWx0cyIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJkZWZ2YWwiLCJjaGlsZCIsImFzc2VydCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJSVU5USU1FXzE2IiwiQVNUX0NPTlZFUlRfMTciLCJBU1QySlNfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIkFTVF9DT05WRVJUXzE5IiwiQVNUMkpTXzE5IiwiQVNUX0NPTlZFUlRfMjAiLCJBU1QySlNfMjAiLCJBU1RfQ09OVkVSVF8yMSIsIkFTVDJKU18yMSIsIlJVTlRJTUVfMjEiLCJBU1RfQ09OVkVSVF8yMiIsIkFTVDJKU18yMiIsIkFTVF9DT05WRVJUXzIzIiwiQVNUMkpTXzIzIiwiQVNUX0NPTlZFUlRfMjQiLCJBU1QySlNfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiUlVOVElNRV8yNiIsIkFTVF9DT05WRVJUXzI3IiwiQVNUMkpTXzI3IiwiQVNUX0NPTlZFUlRfMjgiLCJBU1QySlNfMjgiLCJBU1RfQ09OVkVSVF8yOSIsIkFTVDJKU18yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJSVU5USU1FXzMxIiwiQVNUX0NPTlZFUlRfMzIiLCJBU1QySlNfMzIiLCJBU1RfQ09OVkVSVF8zMyIsIkFTVDJKU18zMyIsIkFTVF9DT05WRVJUXzM0IiwiQVNUMkpTXzM0IiwiQVNUX0NPTlZFUlRfMzUiLCJBU1QySlNfMzUiLCJBU1RfQ09OVkVSVF8zNiIsIkFTVDJKU18zNiIsIkFTVF9DT05WRVJUXzM3IiwiQVNUMkpTXzM3IiwiQVNUX0NPTlZFUlRfMzgiLCJBU1QySlNfMzgiLCJBU1RfQ09OVkVSVF8zOSIsIkFTVDJKU18zOSIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsIlJVTlRJTUUiLCJhc3NpZ24iLCJfYl8iLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJhZGRTVHlwZSIsIkNNUE9QU19MSVNUIiwiZ2VuQ21wT3BzIiwiU1R5cGVfZmxvYXQiLCJTVHlwZV9qc2ludCIsIlNUeXBlX3N0ciIsInZhbHVlcyIsImZsb2F0MnN0ciIsImYiLCJ0b0V4cG9uZW50aWFsIiwic2lnbl9pZHgiLCJ0b1N0cmluZyIsImdlbkJpbmFyeU9wcyIsImdlblVuYXJ5T3BzIiwiSW50Mk51bWJlciIsIlNUeXBlX3R5cGVfZmxvYXQiLCJvdGhlciIsIm90aGVyX3R5cGUiLCJtZXRob2QiLCJfX2ludF9fIiwiX19zdHJfXyIsImNvbnZlcnRfb3RoZXIiLCJzZWxmIiwic3VmZml4IiwiYXMiLCJyZWFsX3R5cGUiLCJpZF9qc29wIiwidW5hcnlfanNvcCIsIlNUeXBlX3R5cGVfaW50IiwiYSIsImIiLCJvcHRpIiwiY29udmVydF9zZWxmIiwiU1R5cGVfdHlwZV9zdHIiLCJyaWdodF9ub2RlIiwicmNoaWxkIiwicmlnaHQiLCJyaWdodF90eXBlIiwiaXNNdWx0aVRhcmdldCIsInRhcmdldHMiLCJsZWZ0cyIsImxlZnQiLCJsZWZ0X3R5cGUiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUiLCJvcCIsImJuYW1lMnB5bmFtZSIsImF0dHIiLCJyZXZlcnNlZF9vcGVyYXRvciIsImZsb29yZGl2X2Zsb2F0IiwiZmxvb3IiLCJmbG9vcmRpdl9pbnQiLCJtb2RfZmxvYXQiLCJtb2QiLCJtb2RfaW50IiwibXVsdGlfanNvcCIsImJuYW1lMmpzb3AiLCJmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUiLCJyZXZlcnNlZCIsInJ0eXBlIiwibHR5cGUiLCJqc29wIiwib3BzIiwicmlnaHRzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZXhwciIsImtleXMiLCJlbHRzIiwiaXNDbGFzcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJwcm90b3R5cGUiLCJ3cml0YWJsZSIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiZ2V0Tm9kZVR5cGUiLCJicnl0aG9uX25vZGUiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsInBhcmVudF9jb250ZXh0IiwiY3JlYXRlIiwibGluZV9vZmZzZXQiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsImFzdDJqc19saXRlcmFsc19pbnQiLCJwYXJzZU51bWJlciIsImFzdDJqc19saXRlcmFsc19zdHIiLCJwYXJzZVN0cmluZyIsInBhcnNlVG9rZW4iLCJvcDIiLCJvcDEiLCJwYXJzZU9wZXJhdG9yIiwiZGVmYXVsdCIsIl9yXyIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJKU09wZXJhdG9yc1ByaW9yaXR5IiwicHJpb3JpdHkiLCJMRUZUIiwiUklHSFQiLCJmaXJzdCIsInBhcmVudF9vcCIsInBhcmVudF9vcF9kaXIiLCJkaXJlY3Rpb24iLCJjdXJfcHJpb3JpdHkiLCJwYXJlbnRfcHJpb3JpdHkiLCJjaGVja19wcmlvcml0eSIsIm8iLCJweW9wIiwiZ2VuZXJhdGVDb252ZXJ0Iiwic3JjIiwiaWRGY3QiLCJjb252X290aGVyIiwiY3MiLCJyY3MiLCJyZXZlcnNlIiwiY29wIiwiX25hbWUyU1R5cGUiLCJweTJhc3RfZmFzdCJdLCJzb3VyY2VSb290IjoiIn0=