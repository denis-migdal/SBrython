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
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");



















































































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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTJCckksU0FBUyxPQUFPO0FBQ2pELE1BQU1DLGlCQUEyQkQsU0FBUyxZQUFZO0FBQ3RELE1BQU00SywyQkFBMkI1SyxTQUFTLHNCQUFzQjs7Ozs7OztTQ2xCdkU7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2I7QUFDb0I7QUFDUDtBQUU3QywrQkFBK0I7QUFDQztBQUU0RCIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQm9keS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlQnVpbHRpbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGV8Qm9keSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEJvZHkgKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9KUyhjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlXG4gICAgICAgIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCAmJiAhIEFycmF5LmlzQXJyYXkoc3RyKSApIHsgLy8gZm9yIHB5MmFzdF9mYXN0XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDAsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYocHJpbnRfYnJhY2tldClcbiAgICAgICAganMrPVwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBiYXNlX2luZGVudCA9IG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgaWYoIFtcImNvbnRyb2xmbG93cy5lbHNlXCIsIFwiY29udHJvbGZsb3dzLmVsaWZcIiwgXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiXS5pbmNsdWRlcyhub2RlLnR5cGUpICkge1xuICAgICAgIC0tYmFzZV9pbmRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBiYXNlX2luZGVudDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKGN1cnNvcik7XG5cbiAgICBub2RlLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBiYXNlOiBzdHJpbmd8QVNUTm9kZSA9IFwiX3JfLm9iamVjdFwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMilcbiAgICAgICAgYmFzZSA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICByZXR1cm4gdG9KUyhyYGNsYXNzICR7dGhpcy52YWx1ZX0gZXh0ZW5kcyAke2Jhc2V9ICR7bmV3IEJvZHkodGhpcyl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgX19uYW1lX186IG5vZGUubmFtZSxcbiAgICAgICAgLy9UT0RPIF9fY2FsbF9fXG4gICAgfVxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV1cbiAgICAgICAgOiBbY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNsYXNzLmNsYXNzZGVmXCIsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2xhc3NEZWZcIjsiLCJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgX2N1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGV8YW55ICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlfGFueSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMF0pO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IE51bWJlcjJJbnQodGhpcy5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICBlbmQgPSBOdW1iZXIySW50KHRoaXMuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gTnVtYmVyMkludCh0aGlzLmNoaWxkcmVuWzJdKTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICAvLyBUT0RPOiBqc2ludCBvcHRpIGlmIHRoaXMudmFsdWUgbm90IHVzZWQuLi5cbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUudmFsdWVdID0gU1R5cGVfaW50O1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIC8vVE9ETzogZ2V0IHR5cGUuLi5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuaWZibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy9pZlxuICAgIGxldCBrZXl3b3JkID0gXCJpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZSBpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZVwiO1xuXG4gICAgbGV0IGpzID0gdG9KUyhrZXl3b3JkLCBjdXJzb3IpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGlmKCBrZXl3b3JkICE9PSBcImVsc2VcIikgeyAvLyBpZi9lbGlmIGNvbmRpdGlvbi5cbiAgICAgICAgb2Zmc2V0ID0gMTtcbiAgICAgICAganMgKz0gdG9KUyhyYCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIG9mZnNldCk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIFwiaWZibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUuaWZibG9jayA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZCA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gU1R5cGVfYm9vbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke2NvbmQucmVzdWx0X3R5cGV9IG5vdCB5ZXQgc3VwcG9ydGVkIGFzIGlmIGNvbmRpdGlvbmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgbm9kZS5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgIG5vZGUuaWZibG9jayA9IFwiaWZcIjtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICBub2RlXG4gICAgXTtcblxuICAgIGxldCBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSAmJiBcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSB7XG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGN1ci5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgICAgICBjdXIuaWZibG9jayA9IFwiZWxpZlwiO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGN1cik7XG4gICAgfVxuICAgIGlmKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCAhPT0gMCApIHsgLy8gZWxzZVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhjdXIub3JlbHNlKSxcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgcmVhc29ucy4uLlxuICAgICAgICAgICAgbGluZW5vICAgIDogY3VyLm9yZWxzZVswXS5saW5lbm8gLSAxLFxuICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICAgICBdKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0bm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGNjID0gYXN0bm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgYXN0bm9kZS5jaGlsZHJlbltpXS5weWNvZGUuZW5kID0gY2NbY2MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LnRyeVwiLFxuICAgICAgICAgICAgLi4ubm9kZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS5jYXRjaGJsb2NrXCIsXG4gICAgICAgICAgICAuLi5saXN0cG9zKG5vZGUuaGFuZGxlcnMpLFxuICAgICAgICAgICAgaGFuZGxlcnM6IG5vZGUuaGFuZGxlcnNcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICBdKTtcblxuICAgIC8vZml4IHB5Y29kZS5cbiAgICBhc3Rub2RlLmNoaWxkcmVuWzBdLnB5Y29kZS5lbmQgPSBhc3Rub2RlLmNoaWxkcmVuWzFdLnB5Y29kZS5zdGFydDtcblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgXG4gICAgICAgIGxldCBib2R5X2lkeCA9IDE7XG4gICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7IC8vVE9ETyBlbXB0eSBub2RlLi4uXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiZWxzZSB7XCIsIGN1cnNvcik7XG4gICAgICAgICAgICBib2R5X2lkeCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKHJgaWYoX2Vycl8gaW5zdGFuY2VvZiAke3RoaXMuY2hpbGRyZW5bMF19KXtgLCBjdXJzb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzKz0gdG9KUyhgbGV0ICR7dGhpcy52YWx1ZX0gPSBfZXJyXztgLCBjdXJzb3IpO1xuICAgICAgICB9XG4gICAgICAgIGpzKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIGJvZHlfaWR4LCBmYWxzZSk7XG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuO1xuICAgIGlmKCBub2RlLnR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGlsZHJlbiA9IFtjb252ZXJ0X25vZGUobm9kZS50eXBlLCBjb250ZXh0KSwgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkcmVuID0gWyBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCkgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGAsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiY2F0Y2goX3Jhd19lcnJfKXtcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBqcys9IHRvSlMoXCJjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIj8gX3Jhd19lcnJfLnB5dGhvbl9leGNlcHRpb25cIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI6IG5ldyBfcl8uSlNFeGNlcHRpb24oX3Jhd19lcnJfKTtcIiwgY3Vyc29yKTtcbiAgICAgICAgLy8gZGVidWdcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IHRvSlMoXCJfYl8uZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcblxuICAgIGZvcihsZXQgaGFuZGxlciBvZiB0aGlzLmNoaWxkcmVuKVxuICAgICAgICBqcys9IHRvSlMoaGFuZGxlciwgY3Vyc29yKTtcbiAgICBcbiAgICBpZiggdGhpcy5jaGlsZHJlblsgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlbi5sZW5ndGggIT09IDEgKVxuICAgICAgICBqcys9IHRvSlMoXCJlbHNleyB0aHJvdyBfcmF3X2Vycl8gfVwiLCBjdXJzb3IpOyAvL1RPRE8uLi5cblxuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApO1xuICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGJsb2NrYCwgbnVsbCwgbnVsbCxcbiAgICAgICAgbm9kZS5oYW5kbGVycy5tYXAoIChoOmFueSkgPT4gY29udmVydF9ub2RlKGgsIGNvbnRleHQpKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkuY2F0Y2hibG9ja1wiOyIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gZmlsdGVyX3N0YWNrKHN0YWNrOiBzdHJpbmdbXSkge1xuICByZXR1cm4gc3RhY2suZmlsdGVyKCBlID0+IGUuaW5jbHVkZXMoJ2JyeXRob25fJykgKTsgLy9UT0RPIGltcHJvdmVzLi4uXG59XG5cblxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogQVNUTm9kZVtdLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxBU1ROb2RlIHtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBzdGFja2xpbmVbMV0sIHN0YWNrbGluZVsyXSkhO1xufVxuXG5leHBvcnQgdHlwZSBTdGFja0xpbmUgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl07XG5cbi8vVE9ETzogY29udmVydFxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrMmFzdG5vZGVzKHN0YWNrOiBTdGFja0xpbmVbXSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZVtdIHtcbiAgcmV0dXJuIHN0YWNrLm1hcCggZSA9PiBzdGFja2xpbmUyYXN0bm9kZShlLCBzYikgKTtcbn1cblxuLy9UT0RPOiBhZGQgZmlsZS4uLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3N0YWNrKHN0YWNrOiBhbnksIHNiOiBTQnJ5dGhvbik6IFN0YWNrTGluZVtdIHtcblxuXG4gIFxuICAgIHN0YWNrID0gc3RhY2suc3BsaXQoXCJcXG5cIik7XG5cbiAgICBjb25zdCBpc1Y4ID0gc3RhY2tbMF09PT0gXCJFcnJvclwiOyBcblxuICAgIHJldHVybiBmaWx0ZXJfc3RhY2soc3RhY2spLm1hcCggbCA9PiB7XG5cbiAgICAgIGxldCBbXywgX2xpbmUsIF9jb2xdID0gbC5zcGxpdCgnOicpO1xuICBcbiAgICAgIGlmKCBfY29sW19jb2wubGVuZ3RoLTFdID09PSAnKScpIC8vIFY4XG4gICAgICAgIF9jb2wgPSBfY29sLnNsaWNlKDAsLTEpO1xuICBcbiAgICAgIGxldCBsaW5lID0gK19saW5lIC0gMjtcbiAgICAgIGxldCBjb2wgID0gK19jb2w7XG5cbiAgICAgIC0tY29sOyAvL3N0YXJ0cyBhdCAxLlxuXG4gICAgICBsZXQgZmN0X25hbWUhOiBzdHJpbmc7XG4gICAgICBpZiggaXNWOCApIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZihcIiBcIiwgNyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSg3LCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiZXZhbFwiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCBmaWxlbmFtZS5cbiAgICAgICAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgICAgY29sICs9IG5vZGUudmFsdWUubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIGNvbnN0IHN0YWNrX3N0ciA9IHN0YWNrLm1hcCggKGwsaSkgPT4gYEZpbGUgXCJbZmlsZV1cIiwgbGluZSAke25vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvblxufTsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGNvbnN0IGJvZHkgPSBuZXcgQm9keSh0aGlzKTtcblxuICAgIHJldHVybiB0b0pTKHJgdHJ5JHtib2R5fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy50cnlgLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LnRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgd2hpbGUoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy53aGlsZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmZ1bmN0aW9uIHByaW50X29iaihvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcblxuICAgIGxldCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob2JqKTtcblxuICAgIGxldCBzdHIgID0gbmV3IEFycmF5KGVudHJpZXMubGVuZ3RoKzEpOyAvLyA/XG4gICAgbGV0IGRhdGEgPSBuZXcgQXJyYXkoZW50cmllcy5sZW5ndGgpO1xuXG4gICAgc3RyIFswXSA9IGB7JHtlbnRyaWVzWzBdWzBdfTpgO1xuICAgIGRhdGFbMF0gPSBlbnRyaWVzWzBdWzFdO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IGVudHJpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgc3RyIFtpXSA9IGAsICR7ZW50cmllc1tpXVswXX06IGBcbiAgICAgICAgZGF0YVtpXSA9IGVudHJpZXNbaV1bMV07XG4gICAgfVxuICAgIHN0cltlbnRyaWVzLmxlbmd0aF0gPSAnfSc7XG5cbiAgICByZXR1cm4gWyBzdHIsIGRhdGEgXTtcbn1cblxuZnVuY3Rpb24gam9pbihkYXRhOiBhbnlbXSwgc2VwPVwiLCBcIikge1xuXG4gICAgaWYoZGF0YS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBbW1wiXCJdLCBbXV07XG5cbiAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcblxuICAgIGxldCBzdHIgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgrMSk7XG5cbiAgICBzdHJbMF0gICAgPSBcIlwiO1xuICAgIHJlc3VsdFswXSA9IGRhdGFbMF0gPz8gXCJ1bmRlZmluZWRcIjtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgIHN0cltpXSA9IHNlcDtcbiAgICAgICAgcmVzdWx0W2ldID0gZGF0YVtpXSA/PyBcInVuZGVmaW5lZFwiO1xuICAgIH1cbiAgICBzdHJbZGF0YS5sZW5ndGhdID0gXCJcIjtcblxuICAgIHJldHVybiBbc3RyLHJlc3VsdF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0X2NhbGwobm9kZTogQVNUTm9kZSkge1xuXG4gICAgY29uc3QgbWV0YSA9IChub2RlLnZhbHVlIGFzIFNUeXBlRmN0KS5fX2NhbGxfXztcblxuICAgIGxldCBrd19wb3MgPSBub2RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYobm9kZS5jaGlsZHJlbltpXS50eXBlID09PSBcImZ1bmN0aW9ucy5rZXl3b3JkXCIpIHtcbiAgICAgICAgICAgIGt3X3BvcyA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgbGV0IG5iX3BvcyA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIG5iX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKVxuICAgICAgICBuYl9wb3MgPSBNYXRoLm1heChtZXRhLmlkeF92YXJhcmcsIGt3X3Bvcy0xKTtcblxuICAgIGxldCBwb3Nfc2l6ZSA9IG5iX3BvcysxO1xuICAgIGlmKCBtZXRhLmhhc19rdyAmJiBtZXRhLmlkeF9lbmRfcG9zID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKVxuICAgICAgICBwb3Nfc2l6ZSA9IG1ldGEuaWR4X3ZhcmFyZysyO1xuICAgIGxldCBwb3MgPSBuZXcgQXJyYXkocG9zX3NpemUpO1xuICAgIFxuICAgIGNvbnN0IGt3ICAgIDogUmVjb3JkPHN0cmluZywgQVNUTm9kZT4gPSB7fTtcbiAgICBjb25zdCBrd2FyZ3M6IFJlY29yZDxzdHJpbmcsIEFTVE5vZGU+ID0ge307XG5cbiAgICBsZXQgaGFzX2t3ID0gZmFsc2U7XG5cbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZICkge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbWV0YS5pZHhfdmFyYXJnKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgY3V0b2ZmOyArK2kpXG4gICAgICAgICAgICBwb3NbaS0xXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgaWYoIG1ldGEuaWR4X3ZhcmFyZysxICE9PSBrd19wb3MgKVxuICAgICAgICAgICAgcG9zW21ldGEuaWR4X3ZhcmFyZ10gPSBqb2luKFtcIltcIiwgam9pbihub2RlLmNoaWxkcmVuLnNsaWNlKG1ldGEuaWR4X3ZhcmFyZysxLGt3X3BvcykpLCBcIl1cIl0sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3QgY3V0b2ZmID0gTWF0aC5taW4oa3dfcG9zLCBuYl9wb3MrMSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGN1dG9mZjsgKytpKVxuICAgICAgICAgICAgcG9zW2ktMV0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGNvbnN0IGFyZ3NfbmFtZXMgPSBtZXRhLmFyZ3NfbmFtZXM7XG4gICAgICAgIGZvcihsZXQgaSA9IGN1dG9mZjsgaSA8IGt3X3BvczsgKytpKVxuICAgICAgICAgICAga3dbIGFyZ3NfbmFtZXNbaS0xXSBdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBoYXNfa3cgPSBjdXRvZmYgIT09IGt3X3BvcztcbiAgICB9XG5cbiAgICBsZXQgaGFzX2t3YXJncyA9IGZhbHNlO1xuXG4gICAgY29uc3QgYXJnc19wb3MgPSBtZXRhLmFyZ3NfcG9zO1xuICAgIFxuXG4gICAgZm9yKGxldCBpID0ga3dfcG9zOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGNvbnN0IGFyZyAgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICBjb25zdCBuYW1lID0gYXJnLnZhbHVlO1xuICAgICAgICBjb25zdCBpZHggID0gYXJnc19wb3NbIG5hbWUgXTtcblxuICAgICAgICBpZiggaWR4ID49IDAgKSB7XG4gICAgICAgICAgICBwb3NbaWR4XSA9IGFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzX2t3ID0gdHJ1ZTtcblxuICAgICAgICBpZiggaWR4ID09PSAtMSlcbiAgICAgICAgICAgIGt3W25hbWVdID0gYXJnO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGt3YXJnc1tuYW1lXSA9IGFyZztcbiAgICAgICAgICAgIGhhc19rd2FyZ3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG9iajogUmVjb3JkPHN0cmluZywgYW55PiA9IGt3O1xuICAgIC8vVE9ETzogb25seSB0aGUgb25lcyBhdCAtMS4uLlxuICAgIGlmKCBoYXNfa3dhcmdzICYmICEgbWV0YS5oYXNfa3cgKXtcbiAgICAgICAgb2JqID0ga3dhcmdzO1xuICAgIH0gZWxzZSBpZiggaGFzX2t3YXJncyApIHtcbiAgICAgICAgb2JqW21ldGEua3dhcmdzIV0gPSBwcmludF9vYmooa3dhcmdzKTtcbiAgICB9XG5cbiAgICBpZiggaGFzX2t3IClcbiAgICAgICAgcG9zW3Bvcy5sZW5ndGgtMV0gPSBwcmludF9vYmoob2JqKTtcbiAgICBlbHNlIHtcbiAgICAgICAgd2hpbGUocG9zLmxlbmd0aCA+IDAgJiYgcG9zW3Bvcy5sZW5ndGgtMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC0tcG9zLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke25vZGUuY2hpbGRyZW5bMF19KCR7am9pbihwb3MpfSlgOyAvLyBhcmdzID9cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMoICh0aGlzLnZhbHVlIGFzIFNUeXBlRmN0KS5fX2NhbGxfXy5zdWJzdGl0dXRlX2NhbGwhKHRoaXMpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbmFtZSA9IG5vZGUuZnVuYy5pZDtcblxuICAgIGNvbnN0IGZjdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW25hbWVdITtcbiAgICBjb25zdCByZXRfdHlwZSA9IChmY3RfdHlwZS5fX2NhbGxfXyBhcyBTVHlwZUZjdFN1YnMpLnJldHVybl90eXBlKCk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCByZXRfdHlwZSwgZmN0X3R5cGUsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MgICAgLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKSxcbiAgICAgICAgLi4ubm9kZS5rZXl3b3Jkcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGtleXdvcmQgbm9kZS4uLlxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdmFsdWUgICAgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCApXG4gICAgY29uc3QgcmV0X3R5cGUgPSB2YWx1ZS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZ1bmN0aW9ucy5rZXl3b3JkXCIsIHJldF90eXBlLCBub2RlLmFyZywgW1xuICAgICAgICB2YWx1ZVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwia2V5d29yZFwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSAnJztcbiAgICBpZiggISB0aGlzLnR5cGUuZW5kc1dpdGgoXCIobWV0aClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKCdmdW5jdGlvbiAnLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcblxuICAgIGpzICs9IGFyZ3MyanModGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxLCBmYWxzZSk7XG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXS5jaGlsZHJlbjtcbiAgICBpZiggYm9keVtib2R5Lmxlbmd0aCAtIDFdLnR5cGUgIT09IFwia2V5d29yZHMucmV0dXJuXCIgKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gXCJyZXR1cm4gbnVsbDtcIlxuICAgIH1cblxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKSArIHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59XG5cblxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBjb25zdCBhcmdzICAgICAgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIGNvbnN0IF9hcmdzICAgICA9IGFyZ3MuY2hpbGRyZW47XG4gICAgY29uc3QgU1R5cGVfZmN0ID0gYXJncy52YWx1ZSEgYXMgU1R5cGVGY3Q7XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBtZXRhID0gU1R5cGVfZmN0Ll9fY2FsbF9fO1xuXG4gICAgbGV0IGt3X3N0YXJ0ID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZigga3dfc3RhcnQgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApXG4gICAgICAgIGt3X3N0YXJ0ID0gbWV0YS5pZHhfdmFyYXJnICsgMTtcblxuICAgIGlmKCBtZXRhLmt3YXJncyAhPT0gdW5kZWZpbmVkICYmIGt3X3N0YXJ0ID09PSBfYXJncy5sZW5ndGgtMSlcbiAgICAgICAgKytrd19zdGFydDtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IF9hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKSB7XG4gICAgICAgICAgICBqcyArPSBcIiwgXCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBpZigga3dfc3RhcnQgPT09IGkpXG4gICAgICAgICAgICBqcyArPSB0b0pTKCd7JywgY3Vyc29yKTtcbiAgICAgICAgaWYoIGkgPT09IG1ldGEuaWR4X3ZhcmFyZyAmJiBpID09PSBfYXJncy5sZW5ndGgtMSApXG4gICAgICAgICAgICAoX2FyZ3NbaV0gYXMgYW55KS5sYXN0ID0gdHJ1ZTtcblxuICAgICAgICBqcyArPSBhcmcyanMoX2FyZ3NbaV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIGt3X3N0YXJ0IDwgX2FyZ3MubGVuZ3RoKVxuICAgICAgICBqcyArPSB0b0pTKCd9ID0ge30nLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBpZiggbm9kZS50eXBlID09PSBcImFyZy52YXJhcmdcIiApIHtcbiAgICAgICAgaWYoIChub2RlIGFzIGFueSkubGFzdClcbiAgICAgICAgICAgIHJldHVybiB0b0pTKGAuLi4ke25vZGUudmFsdWV9YCwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIHRvSlMoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgXCJbXVwiKSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBpZiggbm9kZS50eXBlID09PSBcImFyZy5rd2FyZ1wiIClcbiAgICAgICAgcmV0dXJuIHRvSlMoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgXCJ7fVwiKSwgY3Vyc29yKTtcblxuICAgIGlmKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxICkge1xuXG4gICAgICAgIGxldCB2YWx1ZTogYW55ID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgaWYoIHZhbHVlLnJlc3VsdF90eXBlID09PSAnanNpbnQnICYmIG5vZGUucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludClcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyMkludCh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRvSlMoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgdmFsdWUpLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudmFsdWU7XG4gICAgY3Vyc29yLmNvbCArPSBqcy5sZW5ndGg7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGdldFNUeXBlLCBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuaW1wb3J0IHsgZGVmYXVsdF9jYWxsIH0gZnJvbSBcIi4uL2NhbGwvYXN0MmpzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGlzTWV0aG9kID0gY29udGV4dC50eXBlID09PSBcImNsYXNzXCI7XG4gICAgbGV0IGZjdF9yZXR1cm5fdHlwZTogbnVsbHxTVHlwZU9iaiA9IG51bGw7XG5cbiAgICBjb25zdCBTVHlwZV9mY3Q6IFNUeXBlRmN0ID0ge1xuICAgICAgICBfX25hbWVfXzogXCJmdW5jdGlvblwiLFxuICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgYXJnc19uYW1lcyAgICAgOiBuZXcgQXJyYXkobm9kZS5hcmdzLmFyZ3MubGVuZ3RoK25vZGUuYXJncy5wb3Nvbmx5YXJncy5sZW5ndGgpLFxuICAgICAgICAgICAgYXJnc19wb3MgICAgICAgOiB7fSxcbiAgICAgICAgICAgIGlkeF9lbmRfcG9zICAgIDogLTEsXG4gICAgICAgICAgICBpZHhfdmFyYXJnICAgICA6IC0xLFxuICAgICAgICAgICAgaGFzX2t3ICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHJldHVybl90eXBlICAgIDogKCkgPT4gZmN0X3JldHVybl90eXBlISwgLy8gP1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBkZWZhdWx0X2NhbGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKCAhIGlzTWV0aG9kICkge1xuICAgICAgICAvLyBpZiBtZXRob2QgYWRkIHRvIHNlbGZfY29udGV4dC5zeW1ib2xzID9cbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW25vZGUubmFtZV0gPSBTVHlwZV9mY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgYW5ub3RhdGlvbiA9IG5vZGUucmV0dXJucz8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgZmN0X3JldHVybl90eXBlID0gZ2V0U1R5cGUoYW5ub3RhdGlvbik7XG4gICAgZWxzZSB7XG5cbiAgICAgICAgLy9UT0RPOiBjaGFuZ2Ugc2VhcmNoIHN0cmF0Li4uXG4gICAgICAgIC8vVE9ETzogbG9vcHMsIHRyeSwgaWZcbiAgICAgICAgbGV0IHJldHVybnMgPSBub2RlLmJvZHkuZmlsdGVyKCAobjphbnkpID0+IG4uY29uc3RydWN0b3IuJG5hbWUgPT09IFwiUmV0dXJuXCIgKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRPRE86IHJldHVybjtcbiAgICAgICAgaWYoIHJldHVybnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgZmN0X3JldHVybl90eXBlID0gU1R5cGVfTm9uZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG5cbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIFNUeXBlX2ZjdCwgY29udGV4dCk7XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICBjb25zdCBib2R5ID0gY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpO1xuXG4gICAgLy8gcmVjdXJzaXZlLlxuICAgIGlmKCBmY3RfcmV0dXJuX3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIC8vVE9ETzogbG9vcCwgaWYsIHRyeVxuICAgICAgICBsZXQgcmV0ID0gYm9keS5jaGlsZHJlbi5maWx0ZXIoIG4gPT4gbi50eXBlID09PSBcImtleXdvcmRzLnJldHVyblwiKTtcbiAgICAgICAgZmN0X3JldHVybl90eXBlID0gcmV0WzBdLnJlc3VsdF90eXBlITtcbiAgICB9XG5cbiAgICBsZXQgdHlwZSA9IFwiZnVuY3Rpb25zLmRlZlwiO1xuICAgIGlmKGlzTWV0aG9kKVxuICAgICAgICB0eXBlICs9IFwiKG1ldGgpXCI7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGJvZHlcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZ3Mobm9kZTogYW55LCBTVHlwZV9mY3Q6IFNUeXBlRmN0LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBtZXRhID0gU1R5cGVfZmN0Ll9fY2FsbF9fO1xuXG4gICAgY29uc3QgX2FyZ3MgPSBub2RlLmFyZ3M7XG4gICAgY29uc3QgaGFzX3ZhcmFyZyA9IF9hcmdzLnZhcmFyZyAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGhhc19rd2FyZyAgPSBfYXJncy5rd2FyZyAgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBhcmdzX3BvcyAgID0gbWV0YS5hcmdzX3BvcztcbiAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuXG4gICAgY29uc3QgdG90YWxfYXJncyA9IF9hcmdzLnBvc29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5hcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX3ZhcmFyZ1xuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5rd29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX2t3YXJnO1xuXG4gICAgY29uc3QgYXJncyA9IG5ldyBBcnJheTxBU1ROb2RlPih0b3RhbF9hcmdzKTtcblxuICAgIGNvbnN0IHBvc19kZWZhdWx0cyA9IG5vZGUuYXJncy5kZWZhdWx0cztcbiAgICBjb25zdCBwb3Nvbmx5ID0gX2FyZ3MucG9zb25seWFyZ3M7XG4gICAgY29uc3QgcG9zICAgICA9IF9hcmdzLmFyZ3M7XG5cbiAgICAvLyBwb3Nvbmx5XG4gICAgbGV0IGRvZmZzZXQgPSBwb3NfZGVmYXVsdHMubGVuZ3RoIC0gcG9zb25seS5sZW5ndGggLSBwb3MubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3Nvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhwb3Nvbmx5W2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBcInBvc29ubHlcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW2ldID0gYXJnO1xuICAgIH1cblxuICAgIC8vIHBvc1xuICAgIGxldCBvZmZzZXQgPSBwb3Nvbmx5Lmxlbmd0aDtcbiAgICAgIGRvZmZzZXQgLT0gcG9zb25seS5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvcy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcocG9zW2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBcInBvc1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAgICAgYXJnc19uYW1lc1tvZmZzZXRdID0gYXJnLnZhbHVlO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9XG5cbiAgICBtZXRhLmlkeF92YXJhcmcgPSBvZmZzZXQ7XG5cbiAgICAvLyB2YXJhcmdcbiAgICBpZiggaGFzX3ZhcmFyZyApIHtcbiAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhfYXJncy52YXJhcmcsIHVuZGVmaW5lZCwgXCJ2YXJhcmdcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyA9IG9mZnNldDtcblxuICAgICAgICBjb25zdCBuYl9wb3NfZGVmYXVsdHMgPSBNYXRoLm1pbihwb3NfZGVmYXVsdHMubGVuZ3RoLCBwb3MubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgaGFzX290aGVycyA9IHBvc19kZWZhdWx0cy5sZW5ndGggPiBwb3MubGVuZ3RoIHx8IGFyZ3MubGVuZ3RoICE9PSBvZmZzZXQ7XG5cbiAgICAgICAgaWYoIG5iX3Bvc19kZWZhdWx0cyA+IDEgfHwgbmJfcG9zX2RlZmF1bHRzID09PSAxICYmIGhhc19vdGhlcnMpXG4gICAgICAgICAgICBtZXRhLmlkeF9lbmRfcG9zIC09IG5iX3Bvc19kZWZhdWx0cztcbiAgICB9XG5cbiAgICBsZXQgY3V0X29mZiAgID0gbWV0YS5pZHhfZW5kX3BvcztcbiAgICBpZiggY3V0X29mZiA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKVxuICAgICAgICBjdXRfb2ZmID0gbWV0YS5pZHhfdmFyYXJnO1xuICAgIGZvcihsZXQgaSA9IHBvc29ubHkubGVuZ3RoOyBpIDwgY3V0X29mZjsgKytpKVxuICAgICAgICBhcmdzX3Bvc1thcmdzW2ldLnZhbHVlXSA9IGk7XG5cbiAgICBmb3IobGV0IGkgPSBjdXRfb2ZmOyBpIDwgbWV0YS5pZHhfdmFyYXJnOyArK2kpXG4gICAgICAgIGFyZ3NfcG9zW2FyZ3NbaV0udmFsdWVdID0gLTE7XG5cbiAgICAvL1RPRE86IGlkeF9lbmRfcG9zIChpZiBkZWZhdWx0IGFuZCBubyBpZHhfdmFyYXJnKVxuXG4gICAgLy8ga3dvbmx5XG4gICAgY29uc3Qga3dvbmx5ICAgICAgPSBfYXJncy5rd29ubHlhcmdzO1xuICAgIGNvbnN0IGt3X2RlZmF1bHRzID0gX2FyZ3Mua3dfZGVmYXVsdHM7XG5cbiAgICBtZXRhLmhhc19rdyA9IG1ldGEuaWR4X3ZhcmFyZyAhPT0gY3V0X29mZiB8fCBrd29ubHkubGVuZ3RoICE9PSAwO1xuXG4gICAgZG9mZnNldCA9IGt3X2RlZmF1bHRzLmxlbmd0aCAtIGt3b25seS5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGt3b25seS5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoa3dvbmx5W2ldLCBrd19kZWZhdWx0c1tpXSwgXCJrd29ubHlcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgICAgIGFyZ3NfcG9zW2FyZy52YWx1ZV0gPSAtMTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgLy8ga3dhcmdcbiAgICBpZiggaGFzX2t3YXJnICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhfYXJncy5rd2FyZywgdW5kZWZpbmVkLCBcImt3YXJnXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG5cbiAgICAgICAgbWV0YS5rd2FyZ3MgPSBhcmcudmFsdWU7XG4gICAgfVxuXG4gICAgLy9UT0RPLi4uXG4gICAgLypcbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG4gICAgKi9cblxuICAgIGxldCB2aXJ0X25vZGU6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBjb25zdCBzdGFydCA9IGFyZ3NbMF0gICAgICAgICAgICAucHljb2RlLnN0YXJ0O1xuICAgICAgICBjb25zdCBlbmQgICA9IGFyZ3NbYXJncy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcblxuICAgICAgICB2aXJ0X25vZGUgPSB7XG4gICAgICAgICAgICBsaW5lbm8gICAgICAgIDogc3RhcnQubGluZSxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQgICAgOiBzdGFydC5jb2wsXG4gICAgICAgICAgICBlbmRfbGluZW5vICAgIDogZW5kLmxpbmUsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogZW5kLmNvbFxuICAgICAgICB9O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW4gZXN0aW1hdGlvbi4uLlxuICAgICAgICBjb25zdCBjb2wgPSBub2RlLmNvbF9vZmZzZXQgKyA0ICsgbm9kZS5uYW1lLmxlbmd0aCArIDE7XG5cbiAgICAgICAgdmlydF9ub2RlID0ge1xuICAgICAgICAgICAgICAgIGxpbmVubyAgICA6IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubyAgICA6IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgICAgIGNvbF9vZmZzZXQ6IGNvbCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBjb2xcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYXJnc1wiLCBudWxsLCBTVHlwZV9mY3QsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6c3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGFyZy4ke3R5cGV9YCwgcmVzdWx0X3R5cGUsIG5vZGUuYXJnLCBjaGlsZHJlbik7XG59IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgX2JfLmFzc2VydCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIkFzc2VydFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMoXCJicmVha1wiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmJyZWFrXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQnJlYWtcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMoXCJjb250aW51ZVwiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuY29udGludWVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb250aW51ZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy52YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlWzBdLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMoYCR7dGhpcy52YWx1ZVswXX06ICR7dGhpcy52YWx1ZVsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnQuYWxpYXNcIiwgbnVsbCwgW25vZGUubmFtZSwgbm9kZS5hc25hbWVdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcblxuICAgIGpzICs9IHRvSlMoXCJjb25zdCB7XCIsIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yICk7XG4gICAgICAgIGpzICs9IHRvSlMoIHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvciApO1xuICAgIH1cbiAgICBqcyArPSB0b0pTKFwifSA9IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGlmKHRoaXMudmFsdWUgPT09IG51bGwpXG4gICAgICAgIGpzICs9IHRvSlMoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBqcyArPSB0b0pTKGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt0aGlzLnZhbHVlfVwiKWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydFwiLCBudWxsLCBub2RlLm1vZHVsZSxcbiAgICAgICAgbm9kZS5uYW1lcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9jb250aW51ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvY29udGludWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjUgZnJvbSBcIi4va2V5d29yZHMvYnJlYWsvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI1IGZyb20gXCIuL2tleXdvcmRzL2JyZWFrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI2IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI2IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOCBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMCBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM1IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM3IGZyb20gXCIuL2NvbW1lbnRzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNyBmcm9tIFwiLi9jb21tZW50cy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zOCBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzggZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzXCI7XG5cblxuY29uc3QgTU9EVUxFUyA9IHtcblx0XCJzeW1ib2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8wLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18wXG5cdH0sXG5cdFwic3RydWN0cy50dXBsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJzdHJ1Y3RzLmxpc3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yXG5cdH0sXG5cdFwic3RydWN0cy5kaWN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcInJldHVyblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJwYXNzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcIm9wZXJhdG9ycy51bmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJvcGVyYXRvcnMuY29tcGFyZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJvcGVyYXRvcnMuYm9vbGVhblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJvcGVyYXRvcnMuYmluYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5hdHRyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEwXG5cdH0sXG5cdFwib3BlcmF0b3JzLltdXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwib3BlcmF0b3JzLkFzc2lnbk9wXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTNcblx0fSxcblx0XCJsaXRlcmFscy5zdHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTVcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNlxuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE3XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMThcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE5XG5cdH0sXG5cdFwibGl0ZXJhbHMuTm9uZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMFxuXHR9LFxuXHRcImtleXdvcmRzLnJhaXNlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIxXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIyXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0L2FsaWFzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIzXG5cdH0sXG5cdFwia2V5d29yZHMuY29udGludWVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjRcblx0fSxcblx0XCJrZXl3b3Jkcy5icmVha1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNVxuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNlxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjdcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsL2tleXdvcmRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjlcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzBcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzFcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svdHJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzNcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzRcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5mb3JcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzZcblx0fSxcblx0XCJjb21tZW50c1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zN1xuXHR9LFxuXHRcImNsYXNzLmNsYXNzZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM4XG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG5cblxuY29uc3QgUlVOVElNRSA9IHt9O1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzkpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzE2KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yMSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjYpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzMxKTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSxjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBTVHlwZV9Ob25lVHlwZSwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IGFkZFNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdOb25lVHlwZScsIHt9KTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBTVHlwZV9ib29sLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkNtcE9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdib29sJywge1xuICAgIFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnRdKSxcbiAgICBcbn0pOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiJHtcIiwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFNUeXBlX3N0cikge1xuXG4gICAgICAgICAgICAvLyBoNGNrXG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICAgICAgICAgIGVuZDogbnVsbCBhcyBhbnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQudmFsdWUsIGN1cnNvcik7XG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICAgICAgfSBlbHNlIGlmKGNoaWxkLnR5cGUgPT09IFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIikge1xuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZCwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmdcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5ub2RlLnZhbHVlcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkpvaW5lZFN0clwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfZmxvYXQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBTVHlwZV9mbG9hdCwgbm9kZS52YWx1ZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9hdDJzdHI6IChmOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYoIGYgPD0gMWUtNSB8fCBmID49IDFlMTYpIHtcblxuICAgICAgICAgICAgbGV0IHN0ciA9IGYudG9FeHBvbmVudGlhbCgpO1xuICAgICAgICAgICAgY29uc3Qgc2lnbl9pZHggPSBzdHIubGVuZ3RoLTI7XG4gICAgICAgICAgICBpZihzdHJbc2lnbl9pZHhdID09PSAnLScgfHwgc3RyW3NpZ25faWR4XSA9PT0gJysnKVxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLHNpZ25faWR4KzEpICsgJzAnICsgc3RyLnNsaWNlKHNpZ25faWR4KzEpO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHIgPSBmLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKCAhIHN0ci5pbmNsdWRlcygnLicpKVxuICAgICAgICAgICAgc3RyICs9IFwiLjBcIjtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIEludDJOdW1iZXIgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmNvbnN0IFNUeXBlX3R5cGVfZmxvYXQgPSBhZGRTVHlwZSgndHlwZVtmbG9hdF0nLCB7XG4gICAgX19jYWxsX186IHtcbiAgICAgICAgLy9UT0RPLi4uXG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9mbG9hdCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9mbG9hdCB8fCBvdGhlcl90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXJfdHlwZTtcblxuICAgICAgICAgICAgLy9UT0RPOiBwb3dlci4uLlxuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApIHtcblxuICAgICAgICAgICAgICAgIGlmKCBvdGhlci50eXBlID09PSBcImxpdGVyYWxzLnN0clwiICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggb3RoZXIudmFsdWUgPT09IFwiaW5mXCIgfHwgb3RoZXIudmFsdWUgPT09IFwiaW5maW5pdHlcIiApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG90aGVyLnZhbHVlID09PSBcIi1pbmZcInx8IG90aGVyLnZhbHVlID09PSBcIi1pbmZpbml0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBwYXJzZUZsb2F0KCR7b3RoZXJ9KWA7IC8vLCAke25vZGUuY2hpbGRyZW5bMl19KSlgOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGUuX19uYW1lX199Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYWRkU1R5cGUoJ2Zsb2F0Jywge1xuXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX2Zsb2F0LFxuXG4gICAgX19zdHJfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb2F0MnN0cigke25vZGV9KWA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgICAgICAgICAgICAgWycqKicsICcqJywgJy8nLCAnKycsICctJ10sXG4gICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LFxuICAgICAgICBbJy8vJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgWyclJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9mbG9hdCwgWyd1Li0nXSksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IHN1ZmZpeCA9IFwiXCI7XG4gICAgbGV0IHRhcmdldCA9ICh0aGlzIGFzIGFueSkuYXM7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYodGFyZ2V0ID09PSBcImZsb2F0XCIpIHtcbiAgICAgICAgaWYoIHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7IC8vIHJlbW92ZSB1c2VsZXNzIHByZWNpc2lvbi5cbiAgICB9XG4gICAgZWxzZSBpZiggdGFyZ2V0ID09PSBcImludFwiIHx8IHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgIC8vIGlmIGFscmVhZHkgYmlnaW50IGRvIG5vdCBjYXN0IGludG8ganNpbnQgKGxvc3Mgb2YgcHJlY2lzaW9uKS5cbiAgICAgICAgc3VmZml4ID0gXCJuXCI7XG5cbiAgICAvLyAxZSs1NCBzaG91bGQgaGFkIGJlIHN0b3JlZCBhcyBiaWdpbnQuXG4gICAgcmV0dXJuIHRvSlMocmAke3ZhbHVlfSR7c3VmZml4fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVHlwZV9pbnQgOiBTVHlwZV9qc2ludDtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCByZWFsX3R5cGUsIHZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgaWRfanNvcCwgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmNvbnN0IFNUeXBlX3R5cGVfaW50ID0gYWRkU1R5cGUoJ3R5cGVbaW50XScsIHtcbiAgICBfX2NhbGxfXzoge1xuICAgICAgICAvL1RPRE8uLi5cbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2ludCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBvdGhlciA9IG5vZGUuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICBjb25zdCBvdGhlcl90eXBlID0gb3RoZXIucmVzdWx0X3R5cGVcblxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGVpciBfX2ludF9fID9cbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlcjtcbiAgICAgICAgICAgIGlmKCBvdGhlcl90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyMkludChvdGhlcik7XG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfZmxvYXQgKVxuICAgICAgICAgICAgICAgIHJldHVybiByYEJpZ0ludChNYXRoLnRydW5jKCR7b3RoZXJ9KSlgO1xuXG4gICAgICAgICAgICAvL1RPRE86IHBvd2VyLi4uXG4gICAgICAgICAgICBpZiggb3RoZXJfdHlwZSA9PT0gU1R5cGVfc3RyICkge1xuXG4gICAgICAgICAgICAgICAgLy9pZiggbm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDMpXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJgQmlnSW50KHBhcnNlSW50KCR7b3RoZXJ9LCAke25vZGUuY2hpbGRyZW5bMl19KSlgO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBvcHRpbWl6ZSBpZiBvdGhlciBpcyBzdHJpbmcgbGl0dGVyYWwuLi5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmBCaWdJbnQoJHtvdGhlcn0pYDsgLy8sICR7bm9kZS5jaGlsZHJlblsyXX0pKWA7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19pbnRfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnaW50Jywge1xuXG4gICAgLy9UT0RPOiBmaXggdHlwZS4uLlxuICAgIF9fY2xhc3NfXzogU1R5cGVfdHlwZV9pbnQsXG5cbiAgICBfX3N0cl9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9zdHIsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmAke25vZGV9LnRvU3RyaW5nKClgO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2ludCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKiAqL1xuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC8vICcqKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8J1xuICAgICAgICBdLFxuICAgICAgICBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnanNpbnQnOiAnaW50J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWycqJ10sIFtTVHlwZV9pbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgYSwgYikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnZmxvYXQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LCBbJy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Zsb2F0XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHMpID0+IEludDJOdW1iZXIocywgJ2Zsb2F0JyksXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnLy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7XCJqc2ludFwiOiBcImludFwifSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWyclJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsndS4tJ10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ3JlYWwnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgSW50Mk51bWJlcihhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgWyd+J10sXG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdIClcbiAgICAvKiAqL1xuXG59KTsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyLCBOdW1iZXIySW50LCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2pzaW50Jywge1xuXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgLy8gJyoqJyBhbmQgJyonID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgIFtcbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8JyAvLyBpbiBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgb24gMzJiaXRzXG4gICAgICAgIF0sXG4gICAgICAgIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHNlbGYpID0+IE51bWJlcjJJbnQoc2VsZiksXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnKiddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgTnVtYmVyMkludChhKSwgJyonLCBOdW1iZXIySW50KGIpICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsIFsnLyddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfZmxvYXRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9qc2ludCwgWycvLyddLCBbU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2pzaW50LCBbJyUnXSwgW1NUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfanNpbnQsXG4gICAgICAgIFsndS4tJ10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnaW50JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIE51bWJlcjJJbnQoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsnfiddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0gKVxuICAgIC8qXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sKi9cbn0pOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBTVHlwZV9zdHIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wc30gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuY29uc3QgU1R5cGVfdHlwZV9zdHIgPSBhZGRTVHlwZSgndHlwZVtzdHJdJywge1xuICAgIF9fY2FsbF9fOiB7XG4gICAgICAgIC8vVE9ETy4uLlxuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfc3RyLFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gbm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyX3R5cGUgPSBvdGhlci5yZXN1bHRfdHlwZVxuXG4gICAgICAgICAgICAvL1RPRE8gdXNlIHRoZWlyIF9faW50X18gP1xuICAgICAgICAgICAgaWYoIG90aGVyX3R5cGUgPT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyO1xuXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBvdGhlci5yZXN1bHRfdHlwZT8uX19zdHJfXyBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZS5fX25hbWVfX30uX19zdHJfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hZGRTVHlwZSgnc3RyJywge1xuXG4gICAgX19jbGFzc19fOiBTVHlwZV90eXBlX3N0cixcblxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbU1R5cGVfc3RyXSksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX3N0ciwgW1wiK1wiXSwgW1NUeXBlX3N0cl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9zdHIsIFtcIipcIl0sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlciAgOiB7XCJpbnRcIjogXCJmbG9hdFwifSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggYS5yZXN1bHRfdHlwZSAhPT0gU1R5cGVfc3RyIClcbiAgICAgICAgICAgICAgICAgICAgW2EsYl0gPSBbYixhXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByYCR7YX0ucmVwZWF0KCR7Yn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG59KTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoXCJ2YXIgXCIsIGN1cnNvcik7XG5cbiAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHJgID0gJHt0aGlzLmNoaWxkcmVuW2ldfWAsIGN1cnNvcik7XG5cbiAgICBjb25zdCByaWdodF9ub2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aC0xXTtcbiAgICBsZXQgcmNoaWxkOiBhbnkgPSByaWdodF9ub2RlO1xuXG4gICAgaWYoIHJpZ2h0X25vZGUucmVzdWx0X3R5cGUgPT09IFNUeXBlX2pzaW50ICYmIHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgIHJjaGlsZCA9IE51bWJlcjJJbnQocmlnaHRfbm9kZSk7XG5cbiAgICBqcyArPSB0b0pTKHJgID0gJHtyY2hpbGR9YCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGUsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB0eXBlID0gXCJvcGVyYXRvcnMuPVwiO1xuXG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgbGV0IHJpZ2h0X3R5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG4gICAgaWYoIGFubm90YXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBnZXRTVHlwZShhbm5vdGF0aW9uKTtcblxuXG4gICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJlc3VsdF90eXBlICE9PSByaWdodF90eXBlICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgfVxuICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gbnVsbCApIHtcbiAgICAgICAgcmVzdWx0X3R5cGUgPSByaWdodF90eXBlO1xuICAgICAgICBpZiggcmlnaHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IFNUeXBlX2ludDsgLy8gcHJldmVudHMgaXNzdWVzLlxuICAgICAgICAgICAgLy9UT0RPOiBvbmx5IGlmIGFzc2lnbi4uLlxuICAgIH1cblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGNvbnN0IGxlZnRzID0gdGFyZ2V0cy5tYXAoIChuOmFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKTtcblxuICAgICAgICAvLyBjb3VsZCBiZSBpbXByb3ZlZCBJIGd1ZXNzLlxuICAgICAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmKCBsZWZ0X3R5cGUgIT09IG51bGwgJiYgcmlnaHRfdHlwZSAhPT0gbGVmdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICB7fS8vY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2xlZnQudmFsdWVdID0gcmVzdWx0X3R5cGU7XG4gICAgICAgICAgICAgICAgdHlwZSArPSBcIihpbml0KVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgcmVzdWx0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEFzc2lnbk9wZXJhdG9ycyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBsZXQgb3AgPSAoQXNzaWduT3BlcmF0b3JzIGFzIGFueSlbdGhpcy52YWx1ZV07XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgYSA9IGEgKyBiXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9PSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcbiAgICAgICAgLypcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLnRhcmdldCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCBsZWZ0LnJlc3VsdF90eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF1Z0Fzc2lnblwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfVske3RoaXMuY2hpbGRyZW5bMV19XWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5bXVwiLCBudWxsLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5zbGljZSwgY29udGV4dClcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiU3Vic2NyaXB0XCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19LiR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmF0dHJcIiwgbnVsbCwgbm9kZS5hdHRyLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgY29uc3QgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZSFbdGhpcy52YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcFwiXTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvb3JkaXZfZmxvYXQ6IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vciggYS9iICk7XG4gICAgfSxcbiAgICBmbG9vcmRpdl9pbnQ6IChhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhL2I7XG4gICAgICAgIGlmKCByZXN1bHQgPiAwIHx8IGElYiA9PT0gMG4pXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIHJldHVybiAtLXJlc3VsdDtcbiAgICB9LFxuICAgIG1vZF9mbG9hdDogPFQ+KGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbW9kID0gKGEgJSBiICsgYikgJSBiO1xuICAgICAgICBpZiggbW9kID09PSAwICYmIGIgPCAwIClcbiAgICAgICAgICAgIHJldHVybiAtMDtcbiAgICAgICAgcmV0dXJuIG1vZDtcbiAgICB9LFxuICAgIG1vZF9pbnQ6IDxUPihhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAoYSAlIGIgKyBiKSAlIGI7XG4gICAgfVxufSIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbXVsdGlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoIG11bHRpX2pzb3AodGhpcywgdGhpcy52YWx1ZSwgLi4udGhpcy5jaGlsZHJlbikgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmNvbnN0IGJuYW1lMmpzb3AgPSB7XG4gICAgJ0FuZCc6ICcmJicsXG4gICAgJ09yJyA6ICd8fCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLnZhbHVlcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKSApO1xuXG4gICAgY29uc3Qgb3AgICA9IChibmFtZTJqc29wIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJvb2xlYW5cIiwgdHlwZSwgb3AsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCb29sT3BcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5mdW5jdGlvbiBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZTogQVNUTm9kZSwgbGVmdDpBU1ROb2RlLCBvcDogc3RyaW5nLCByaWdodDogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCByZXZlcnNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJ0eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgY29uc3QgbHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcblxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCBhcyBhbnkpO1xuICAgICAgICBtZXRob2QgPSByaWdodC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSAnJztcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCApXG4gICAgICAgICAgICBqcyArPSB0b0pTKCcgJiYgJywgY3Vyc29yKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJz09PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnIT09JywgcmlnaHQpLCBjdXJzb3IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvL1RPRE86IGNoYWluLi4uXG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgb3AsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3Qgb3BzID0gbm9kZS5vcHMubWFwKCAoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW2UuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgICAgICBpZiggb3AgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlLmNvbnN0cnVjdG9yLiRuYW1lfSBub3QgaW1wbGVtZW50ZWQhYCk7XG4gICAgICAgIHJldHVybiBvcDtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlZnQgICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodHMgPSBub2RlLmNvbXBhcmF0b3JzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgb3BlcmF0b3JzLmNvbXBhcmVgLCBTVHlwZV9ib29sLCBvcHMsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAuLi5yaWdodHMsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29tcGFyZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIC8vbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGlmKCB0aGlzLnZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHRvSlMoIHVuYXJ5X2pzb3AodGhpcywgJyEnLCBJbnQyTnVtYmVyKGxlZnQsICdqc2ludCcpICksIGN1cnNvciApO1xuXG4gICAgY29uc3QgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZSFbdGhpcy52YWx1ZV0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKHRoaXMsIGxlZnQvKiwgcmlnaHQqLyksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wsIFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUub3BlcmFuZCAsIGNvbnRleHQgKTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgaWYoIG9wID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLnVuYXJ5XCIsIFNUeXBlX2Jvb2wsIFwibm90XCIsIFsgbGVmdCBdICk7XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKCk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT1QgSU1QTEVNRU5URUQhJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLnVuYXJ5XCIsIHR5cGUsIG9wLCBbIGxlZnQgXSApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlVuYXJ5T3BcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRvSlMoXCJyZXR1cm4gbnVsbFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMocmByZXR1cm4gJHt0aGlzLmNoaWxkcmVuWzBdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05vbmVUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgU1R5cGVfTm9uZVR5cGUsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIk9iamVjdC5mcmVlemUoW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXSlcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJzsgLy9UT0RPIHR5cGUgb2YgY3VycmVudCBjb250ZXh0ICEgLT4gc2VsZiBpbiBsb2NhbF9zeW1ib2xzID9cbiAgICBlbHNlIGlmKCB2YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW3ZhbHVlXTtcblxuICAgIC8qXG4gICAgICAgIC8vVE9ETyBnbG9iYWxTeW1ib2xzXG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG4gICAgKi9cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmV4cG9ydCB0eXBlIEFTVCA9IHtcbiAgICBub2RlczogQVNUTm9kZVtdLFxuICAgIGZpbGVuYW1lOiBzdHJpbmdcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgKHR5cGVvZiBDT1JFX01PRFVMRVMpW2tleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdW10+ID0ge31cblxuZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcblxuICAgIGNvbnN0IG1vZHVsZSA9IENPUkVfTU9EVUxFU1ttb2R1bGVfbmFtZSBhcyBrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXTtcblxuICAgIGxldCBuYW1lcyA9IFtcIm51bGxcIl07XG4gICAgaWYoIFwiYnJ5dGhvbl9uYW1lXCIgaW4gbW9kdWxlLkFTVF9DT05WRVJUKSB7XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkobW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZSkgKSB7XG4gICAgICAgICAgICBuYW1lcyA9IG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lcyA9IFttb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBuYW1lIG9mIG5hbWVzKVxuICAgICAgICAobW9kdWxlc1tuYW1lXSA/Pz0gW10pLnB1c2gobW9kdWxlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzOiBjb252ZXJ0X2FzdChfYXN0KSxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVUeXBlKGJyeXRob25fbm9kZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLnNicnl0aG9uX3R5cGUgPz8gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWQ6XCIsIG5hbWUpO1xuICAgICAgICBjb25zb2xlLndhcm4oYGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coIGJyeXRob25fbm9kZSApO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgaGF2ZSBtYW55IG1vZHVsZXMgZm9yIHRoZSBzYW1lIG5vZGUgdHlwZS5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7IFxuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rwb3Mobm9kZTogYW55W10pIHtcblxuICAgIGxldCBiZWcgPSBub2RlWzBdO1xuICAgIGxldCBlbmQgPSBub2RlW25vZGUubGVuZ3RoLTFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9saW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgLy9jb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIGxpbmVubyA6IGJlZy5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3N5bWJvbHMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfc3ltYm9sc31cbiAgICB9XG4gICAgdHlwZTtcbiAgICBsb2NhbF9zeW1ib2xzOiBSZWNvcmQ8c3RyaW5nLCBTVHlwZU9ianxudWxsPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXN0KGFzdDogYW55KTogQVNUTm9kZVtdIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gICAgLy9UT0RPOiBidWlsdGluX3N5bWJvbHNcbiAgICAvL1RPRE86IGZpeCB0eXBlcy4uLlxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1snaW50J10gICA9IFNUeXBlX2ludCAgLl9fY2xhc3NfXztcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbJ3N0ciddICAgPSBTVHlwZV9zdHIgIC5fX2NsYXNzX187XG4gICAgY29udGV4dC5sb2NhbF9zeW1ib2xzWydmbG9hdCddID0gU1R5cGVfZmxvYXQuX19jbGFzc19fO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5KGFzdC5ib2R5Lmxlbmd0aCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdC5ib2R5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzXG4gICAgICAgIHJlc3VsdFtpXSA9IGNvbnZlcnRfbGluZShhc3QuYm9keVtpXSwgY29udGV4dCk7XG5cblxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdFtpXS50eXBlKTtcbiAgICB9XG5cbiAgICAvL1RPRE86IGRldGVjdCBjb21tZW50cy4uLlxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvLyBAdHMtbm9jaGVja1xuXG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGluZSAgOiBudW1iZXIsXG4gICAgbGluZV9vZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBub2RlcyA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuXG4gICAgbGV0IGN1cnNvciA9IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBsaW5lX29mZnNldCA6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNoYXI7XG4gICAgZG8ge1xuICAgICAgICBub2Rlcy5wdXNoKCBwYXJzZUV4cHJlc3Npb24oY29kZSwgY3Vyc29yKSBhcyBhbnkpO1xuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgd2hpbGUoIGNoYXIgPT09ICdcXG4nICkge1xuICAgICAgICAgICAgY2hhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgfSB3aGlsZSggY2hhciAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdC8vY29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlcyxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfY29udmVydCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN5bWJvbChjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnYScgJiYgY2FyIDw9ICd6JyB8fCBjYXIgPj0gJ0EnICYmIGNhciA8PSAnWicgfHwgY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIHx8IGNhciA9PSAnXycgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgY29uc3Qgc3ltYm9sID0gY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpO1xuXG4gICAgLy9UT0RPOiBpZiBrZXl3b3JkLi4uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJzeW1ib2xcIixcbiAgICAgICAgdmFsdWUgICA6IHN5bWJvbCwgLy9UT0RPOiBjZiBjb252ZXJ0IChzZWFyY2ggaW4gbG9jYWwgdmFyaWFibGVzL0NvbnRleHQuLi4pXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2NvbnZlcnRcbiAgICB9O1xufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX2ludCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU51bWJlcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgLy9UT0RPOiByZWFsLi4uXG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLmludFwiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19pbnQsXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX3N0ciBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnXCInICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgKytjdXJzb3Iub2Zmc2V0O1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLnN0cmluZ1wiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19zdHIsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGxldCBsZWZ0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIGlmKCBjaGFyID09PSAnXFxuJylcbiAgICAgICAgcmV0dXJuIGxlZnQ7XG5cbiAgICBsZXQgb3AgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgb3AhLmNoaWxkcmVuWzBdID0gbGVmdDtcbiAgICBvcC5weWNvZGUuc3RhcnQgPSBsZWZ0LnB5Y29kZS5zdGFydDtcblxuICAgIGxldCB2YWx1ZXMgPSBbb3AsIHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKV07XG5cbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciAhPT0gJ1xcbicgKSB7XG5cbiAgICAgICAgbGV0IG9wMiAgID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG5cbiAgICAgICAgbGV0IG9wMSAgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXTtcbiAgICAgICAgbGV0IGxlZnQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcblxuICAgICAgICAvL1RPRE86IGhhbmRsZSBvcCBwcmlvcml0eS4uLlxuICAgICAgICAvLyAoYStiKStjXG5cbiAgICAgICAgLy8gKGErYilcbiAgICAgICAgb3AxIS5jaGlsZHJlblsxXSA9IGxlZnQ7XG4gICAgICAgIG9wMSEucHljb2RlLmVuZCAgPSBsZWZ0LnB5Y29kZS5lbmQ7IFxuXG4gICAgICAgIC8vICgpK2NcbiAgICAgICAgb3AyIS5jaGlsZHJlblswXSA9IG9wMTtcbiAgICAgICAgb3AyLnB5Y29kZS5zdGFydCA9IG9wMS5weWNvZGUuc3RhcnQ7XG5cbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl0gPSBvcDI7XG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdID0gcmlnaHQ7XG5cbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgfVxuXG4gICAgdmFsdWVzWzBdIS5jaGlsZHJlblsxXSA9IHZhbHVlc1sxXTtcbiAgICB2YWx1ZXNbMF0hLnB5Y29kZS5lbmQgID0gdmFsdWVzWzFdLnB5Y29kZS5lbmQ7XG5cbiAgICByZXR1cm4gdmFsdWVzWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdG9yKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldCsrXTtcbiAgICAvKlxuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICcnICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdOyovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJvcGVyYXRvcnMuXCIgKyBjaGFyLFxuICAgICAgICB2YWx1ZSAgIDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IENPUkVfTU9EVUxFU1tcIm9wZXJhdG9ycy5cIiArIGNoYXJdLkFTVDJKUyxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgLy8gaWdub3JlIHdoaXRlc3BhY2VcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgPT09ICcgJyB8fCBjaGFyID09PSAnXFx0JyApXG4gICAgICAgIGNoYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgLy8gaWdub3JlIGNoYXJcbiAgICBpZiggY2hhciA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSBudWxsXG4gICAgaWYoIGNoYXIgPT09ICdcIicpXG4gICAgICAgIG5vZGUgPSBwYXJzZVN0cmluZyhjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ3onIHx8IGNoYXIgPj0gJ0EnICYmIGNoYXIgPD0gJ1onIHx8IGNoYXIgPT0gJ18nIClcbiAgICAgICAgbm9kZSA9IHBhcnNlU3ltYm9sKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIG5vZGUgPSBwYXJzZU51bWJlcihjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZSA9IHBhcnNlT3BlcmF0b3IoY29kZSwgY3Vyc29yKTtcbiAgICAgICAgLy87IHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hlbiBwYXJzaW5nICR7Y2hhcn0gYXQgJHtjdXJzb3IubGluZX06JHtjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0fSAoJHtjdXJzb3Iub2Zmc2V0fSlgKTtcblxuICAgIG5vZGUucHljb2RlID0ge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RPRE86IGlzIG5leHQgYW4gb3BlcmF0b3IgPyAtPiBjb25zdHJ1aXJlIGFyYnJlLi4uXG4gICAgLy9UT0RPIGhhbmRsZSBvcGVyYXRvcnMgP1xuXG4gICAgcmV0dXJuIG5vZGU7XG5cbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBfcl99IGZyb20gXCIuL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHtfYl99IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5leHBvcnQge19iXywgX3JffTtcblxuLy8gY2xhc3NlID9cblxuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIGJ1aWxkTW9kdWxlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coanNjb2RlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICB9XG5cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSB0aGlzLmJ1aWxkTW9kdWxlKGpzY29kZSwgYXN0KSh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuaW50ZXJmYWNlIElBU1ROb2RlICB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXTtcblx0cmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUgaW1wbGVtZW50cyBJQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCByZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG5leHBvcnQgY29uc3QgQXNzaWduT3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19pcG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19pbXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19pdHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19faWZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19pbW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19faWFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19pc3ViX18nLFxuXG4gICAgJ19fb3JfXycgICAgIDogJ19faW9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX2lhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19faXhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19pbHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX2lyc2hpZnRfXycsXG59XG5cblxuZXhwb3J0IGNvbnN0IGpzb3AycHlvcCA9IHtcbiAgICAnKionOiAncG93JyxcbiAgICAnKicgOiAnbXVsJyxcbiAgICAnLycgOiAndHJ1ZWRpdicsXG4gICAgJy8vJzogJ2Zsb29yZGl2JyxcbiAgICAnJScgOiAnbW9kJyxcbiAgICBcbiAgICAnKycgIDogJ2FkZCcsXG4gICAgJy0nICA6ICdzdWInLFxuICAgICd1Li0nOiAnbmVnJyxcblxuICAgICc9PScgOiAnZXEnLFxuICAgICchPScgOiAnbmUnLFxuICAgICc8JyAgOiAnbHQnLFxuICAgICc8PScgOiAnbGUnLFxuICAgICc+PScgOiAnZ2UnLFxuICAgICc+JyAgOiAnZ3QnLFxuXG4gICAgJ34nIDogJ25vdCcsXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWychJywgJysrJywgJy0tJywgJ34nLCAndS4tJ10sXG4gICAgWycqKiddLCAvLyByaWdodCB0byBsZWZ0ICFcbiAgICBbJyonLCAnLycsICclJ10sIC8vIFB5dGhvbiBhbHNvIGhhcyAvL1xuICAgIFsnKycsICctJ10sXG4gICAgWyc8PCcsICc+PicsICc+Pj4nXSwgLy9UT0RPXG4gICAgWyc8JywgJzw9JywgJz49JywgJz4nXSxcbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJyYnXSwgIC8vVE9ET1xuICAgIFsnXiddLCAgLy9UT0RPXG4gICAgWyd8J10sICAvL1RPRE9cbiAgICBbJyYmJ10sIC8vVE9ET1xuICAgIFsnfHwnLCAnPz8nXSxcbiAgICBbJz0nXSAvKiBldCB0b3VzIGxlcyBkw6lyaXbDqXMgKi8gLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgLy8gZXRjLlxuXTtcblxuLypcbmh0dHBzOi8vZG9jcy5weXRob24ub3JnLzMvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNjYWxsYWJsZVxuXG4tPiBjbGFzc2VzXG5ib29sKClcbmZsb2F0KClcbmludCgpXG5zdHIoKVxuYnl0ZWFycmF5KCkgW1VpbnQ4QXJyYXldIChSVylcbmJ5dGVzKCkgICAgIFs/XSAgICAgICAgICAoUk8pIDwtIG5vIHR5cGVzIGluIEpTLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LSBVaW50OEFycmF5IHdpdGggZmxhZyA/IGZyZWV6ZSgpIFtKUyB1bnNhZmVdXG4gICAgICAgICAgICBiXCJlXFx4RkZcIiBpbnN0ZWFkIG9mIFsxMDEsMTAxXSwgZXRjLiAoMzIgPD0gYnl0IDw9IDEyNilcbnR5cGUoKVxubGlzdCgpICAgICAgW0FycmF5XVxudHVwbGUoKSAgICAgW09iamVjdC5mcm96ZW4oQXJyYXkpXVxuXG5zZXQoKSAgICAgICAvLyByZWxpZXMgb24gaGFzaCgpLi4uID0+IHNldFtsaXRlcmFsc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBzZXQoKSAvIDwtIEpTIHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgPT4gYnl0ZXMvYnl0ZWFycmF5L2V0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IFNldCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IEludGVybmFsIGtleXMoKSBzZXQgW3JlY29tcHV0ZSBoYXNoIHdoZW4gYWRkL3JlbW92ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBpbnRlcm5hbGx5IHN0b3JlZCBhcyBNYXAoaGFzaCwgdmFsdWUpICg/KVxuZnJvemVuc2V0KCkgICAgICAgICAgICA9PiBleHRlbmRzIHNldCB0byByZXBsYWNlIG1vZGlmaWVycy5cblxuZGljdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3N0cl0gYXMgT2JqZWN0LmNyZWF0ZShudWxsKSArIChhbmQgcHVyZSBKU09iaiBhcyBkaWN0W3N0cl0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBNYXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IFNldChoYXNoKSAvIE1hcChoYXNoLCBrZXkpIC8gTWFwKGtleSwgaGFzaCkgPz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldC9zZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gTWFwKGtleSwgdmFsdWUpXG5cbm9iamVjdCgpXG5jb21wbGV4KClcbm1lbW9yeXZpZXcoKSAgICAgICAgICAgID0+IEFycmF5QnVmZmVyID9cblxuLT4gcHJpbnRcbmFzY2lpKClcbmJpbigpXG5oZXgoKVxub2N0KClcbnJlcHIoKVxuaGFzaCgpXG5cbi0+IG1hdGhzXG5hYnMoKVxuZGl2bW9kKClcbnBvdygpXG5yb3VuZCgpXG5cbi0+IGxpc3RzXG5hbGwoKVxuYW55KClcbmZpbHRlcigpXG5tYXAoKVxubWF4KClcbm1pbigpXG5zdW0oKVxubGVuKClcbmVudW1lcmF0ZSgpXG5yZXZlcnNlZCgpXG5zbGljZSgpXG5zb3J0ZWQoKVxuemlwKClcblxuLT4gaXRlclxucmFuZ2UoKVxuYWl0ZXIoKVxuaXRlcigpXG5hbmV4dCgpXG5uZXh0KClcblxuLT4gc3RyXG5vcmQoKVxuY2hyKClcbmZvcm1hdCgpXG5wcmludCgpXG5mXCJcIlxuXG5jYWxsYWJsZSgpXG5jbGFzc21ldGhvZCgpXG5zdGF0aWNtZXRob2QoKVxucHJvcGVydHkoKVxuc3VwZXIoKVxuaXNpbnN0YW5jZSgpXG5pc3N1YmNsYXNzKClcbmRlbGF0dHIoKVxuZ2V0YXR0cigpXG5oYXNhdHRyKClcbnNldGF0dHIoKVxuZGlyKClcblxuZXZhbCgpXG5leGVjKClcbmNvbXBpbGUoKVxuYnJlYWtwb2ludCgpXG5cbmdsb2JhbHMoKVxubG9jYWxzKClcbnZhcnMoKVxuX19pbXBvcnRfXygpXG5cbmlkKClcbiAgICAtPiBvbi1kZW1hbmQgd2Vha3JlZiA/XG5cbmhlbHAoKVxuaW5wdXQoKVxub3BlbigpXG5cbiovXG5cbi8qXG51bmFyeVxuLSBwb3MgKHVuYXJ5ICspXG5cbi0gYm9vbFxuLSBmbG9hdFxuLSBpbnRcbi0gc3RyXG4tIHJlcHJcblxuLSBhYnNcbi0gY2VpbFxuLSBmbG9vclxuLSByb3VuZFxuLSB0cnVuY1xuXG5iaW5hcnlcbi0gcG93L3Jwb3dcbi0gZGl2bW9kL3JkaXZtb2RcblxuY2xhc3Ncbi0gY2xhc3Ncbi0gbmV3XG4tIGluaXRcbi0gaW5pdF9zdWJjbGFzc1xuXG4tIHN1YmNsYXNzaG9vayAvLyBfX2lzaW5zdGFuY2VjaGVja19fIFxuXG4tIGRpclxuLSBkZWxhdHRyXG4tIHNldGF0dHJcbi0gZ2V0YXR0cmlidXRlXG5cbi0gZG9jXG4tIGZvcm1hdFxuLSBnZXRuZXdhcmdzXG4tIGhhc2hcbi0gaW5kZXggKD8pXG4tIHNpemVvZlxuKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gSW50Mk51bWJlcihhOiBBU1ROb2RlLCB0YXJnZXQgPSBcImZsb2F0XCIpIHtcblxuICAgIGlmKCBhLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX211bF9fJyB8fCBhLnZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gYS5jaGlsZHJlblsxXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgaWYoICAgIChsdHlwZSA9PT0gU1R5cGVfaW50IHx8IGx0eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgICYmIChydHlwZSA9PT0gU1R5cGVfaW50IHx8IHJ0eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX25lZ19fJyAmJiBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCB0YXJnZXQgPT09IFwiZmxvYXRcIiApXG4gICAgICAgIHJldHVybiByYE51bWJlcigke2F9KWA7XG5cbiAgICAvLyBpbnQgLT4ganNpbnQgY2FzdCBpcyBmYWN1bHRhdGl2ZS4uLlxuICAgIHJldHVybiBhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTnVtYmVyMkludChhOiBBU1ROb2RlKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSAnaW50JztcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IFwiaW50XCI7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIHJldHVybiByYEJpZ0ludCgke2F9KWA7XG59XG5cbmxldCBKU09wZXJhdG9yc1ByaW9yaXR5OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG5mb3IobGV0IGkgPSAwOyBpIDwgSlNPcGVyYXRvcnMubGVuZ3RoOyArK2kpIHtcblxuICAgIGNvbnN0IHByaW9yaXR5ID0gSlNPcGVyYXRvcnMubGVuZ3RoIC0gaTtcbiAgICBmb3IobGV0IG9wIG9mIEpTT3BlcmF0b3JzW2ldKVxuICAgICAgICBKU09wZXJhdG9yc1ByaW9yaXR5W29wXSA9IHByaW9yaXR5O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlZF9vcGVyYXRvcjxUIGV4dGVuZHMga2V5b2YgdHlwZW9mIEJpbmFyeU9wZXJhdG9ycz4ob3A6IFQpIHtcbiAgICByZXR1cm4gQmluYXJ5T3BlcmF0b3JzW29wXTtcbn1cblxuY29uc3QgTEVGVCAgPSAxO1xuY29uc3QgUklHSFQgPSAyO1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCAuLi52YWx1ZXM6IEFTVE5vZGVbXSkge1xuXG4gICAgY29uc3QgZmlyc3QgPSB2YWx1ZXNbMF07XG4gICAgaWYoZmlyc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVHxSSUdIVDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICBpZihsYXN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAobGFzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2ZpcnN0fWA7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGg7ICsraSlcbiAgICAgICAgcmVzdWx0ID0gcmAke3Jlc3VsdH0gJiYgJHt2YWx1ZXNbaV19YDtcblxuICAgIGlmKCBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZF9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpIHtcbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgIH1cblxuICAgIHJldHVybiByYCR7YX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZXxhbnksIG9wOiBzdHJpbmcsIGI6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgaWYoYiBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGIgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGIgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHthfSR7b3B9JHtifWA7XG5cbiAgICBpZiggY2hlY2tfcHJpb3JpdHkgJiYgXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB1bmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIGE6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGxldCByZXN1bHQgPSByYCR7b3B9JHthfWA7XG5cbiAgICBpZihvcCA9PT0gJy0nKVxuICAgICAgICBvcCA9ICd1Li0nO1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG5cbiAgICBpZiggY2hlY2tfcHJpb3JpdHkgJiYgXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggKGRpcmVjdGlvbiAmIExFRlQpICYmIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxudHlwZSBHZW5VbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfc2VsZiAgID86IChzOiBhbnkpID0+IGFueSxcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IGFueVxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuVW5hcnlPcHMocmV0X3R5cGUgIDogU1R5cGVPYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzICAgICAgIDogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgPSAoYSkgPT4gYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuVW5hcnlPcHNfT3B0cyA9IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiByZXRfdHlwZTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJ3UuLScpXG4gICAgICAgICAgICBvcCA9ICctJztcblxuICAgICAgICBzdWJzdGl0dXRlX2NhbGwgPz89IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5CaW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X290aGVyICAgPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIChub2RlOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyAgICA9IG5vZGUucmVzdWx0X3R5cGUhLl9fbmFtZV9fO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb252ZXJ0W3NyY107XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IGltcHJvdmU6XG4gICAgICAgIGlmKCBzcmMgPT09IFwiaW50XCIpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBcImludFwiIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufVxuXG5jb25zdCBpZEZjdCA9IDxUPihhOiBUKSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKHJldF90eXBlOiBTVHlwZU9iaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IFNUeXBlT2JqW10sIFxuICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBpZEZjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuQmluYXJ5T3BzX09wdHMgPSB7fSkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyByZXRfdHlwZSA6IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IGlkRmN0ICYmIHN1YnN0aXR1dGVfY2FsbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5DbXBPcHMoICBvcHMgICAgICAgOiByZWFkb25seSAoa2V5b2YgdHlwZW9mIHJldmVyc2UpW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdHlwZTogcmVhZG9ubHkgU1R5cGVPYmpbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X3NlbGYgICAgPSBpZEZjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9ICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyBTVHlwZV9ib29sIDogU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY29wID0gb3A7XG5cbiAgICAgICAgICAgIGxldCBhID0gY29udmVydF9zZWxmKHNlbGYpO1xuICAgICAgICAgICAgbGV0IGIgPSBjb252X290aGVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCByZXZlcnNlZCApIHtcbiAgICAgICAgICAgICAgICBbYSxiXcKgPSBbYixhXTtcbiAgICAgICAgICAgICAgICBjb3AgPSByZXZlcnNlW2NvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBjb3BbMF0gPT09ICc9JyB8fCBjb3BbMF0gPT09ICchJyApIHtcbiAgICAgICAgICAgICAgICBpZiggc2VsZi5yZXN1bHRfdHlwZSA9PT0gb3RoZXIucmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIGNvcCA9IGNvcCArICc9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsIGNvcCwgYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggc3Vic3RpdHV0ZV9jYWxsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252X290aGVyKG8pICk7IC8vVE9ETy4uLlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiBjcyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzLCBuZXdsaW5lLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCIuL0FTVE5vZGVcIjtcblxuXG5leHBvcnQgY2xhc3MgQm9keSB7XG5cbiAgICBub2RlO1xuICAgIHByaW50X2JyYWNrZXQ7XG4gICAgaWR4O1xuXG4gICAgY29uc3RydWN0b3Iobm9kZTogQVNUTm9kZSwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5pZHggPSBub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyAvL1RPRE8gc2VhcmNoIGJvZHkuLi5cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5wcmludF9icmFja2V0ID0gcHJpbnRfYnJhY2tldDtcbiAgICB9XG5cbiAgICB0b0pTKGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgaWYodGhpcy5wcmludF9icmFja2V0KVxuICAgICAgICAgICAganMrPVwie1wiO1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuaWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcbiAgICBcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJvZHkuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IsIDEpO1xuICAgICAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiO1wiLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYodGhpcy5wcmludF9icmFja2V0KSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbn0iLCJcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludCc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZSc7IiwiaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG5jb25zdCBfbmFtZTJTVHlwZTogUmVjb3JkPHN0cmluZyxTVHlwZU9iaj4gPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1R5cGU8VCBleHRlbmRzIFNUeXBlT2JqPihuYW1lOiBzdHJpbmcpOiBUIHtcbiAgICByZXR1cm4gKF9uYW1lMlNUeXBlW25hbWVdID8/PSB7X19uYW1lX186IG5hbWV9KSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU1R5cGUobmFtZTogc3RyaW5nLCB0eXBlOiBPbWl0PFNUeXBlT2JqLCAnX19uYW1lX18nPikge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBnZXRTVHlwZShuYW1lKSwgdHlwZSApO1xufVxuXG5leHBvcnQgY29uc3QgU1R5cGVfaW50ICAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJpbnRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfanNpbnQgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJqc2ludFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9mbG9hdCAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImZsb2F0XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2Jvb2wgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiYm9vbFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9zdHIgICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcInN0clwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9Ob25lVHlwZSAgICAgICAgICAgPSBnZXRTVHlwZShcIk5vbmVUeXBlXCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSA9IGdldFNUeXBlKFwiTm90SW1wbGVtZW50ZWRUeXBlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuLy8gZGVjbGFyZSBhbGwgYnVpbHRpbiB0eXBlcy4uLlxuaW1wb3J0ICcuL3N0cnVjdHMvU1R5cGVCdWlsdGluJztcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiQm9keSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImluZGVudF9sZXZlbCIsImJhc2VfaW5kZW50IiwiaW5jbHVkZXMiLCJpbmRlbnQiLCJwYWRTdGFydCIsImJhc2UiLCJDb250ZXh0IiwiY29udmVydF9ib2R5IiwiY29udmVydF9ub2RlIiwiY29udmVydCIsImNvbnRleHQiLCJsb2NhbF9zeW1ib2xzIiwibmFtZSIsIl9fbmFtZV9fIiwiYmFzZXMiLCJFcnJvciIsImJyeXRob25fbmFtZSIsIl9jdXJzb3IiLCJfY29udGV4dCIsIk51bWJlcjJJbnQiLCJiZWciLCJpbmNyIiwiU1R5cGVfaW50IiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJTVHlwZV9ib29sIiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0IiwicmVzdWx0X3R5cGUiLCJzYnJ5dGhvbl90eXBlIiwiY3VyIiwib3JlbHNlIiwibGluZW5vIiwiY29sX29mZnNldCIsImFzdG5vZGUiLCJjYyIsInB5Y29kZSIsImhhbmRsZXJzIiwiYm9keV9pZHgiLCJ1bmRlZmluZWQiLCJoYW5kbGVyIiwiaCIsImZpbHRlcl9zdGFjayIsInN0YWNrIiwiZmlsdGVyIiwiZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3BvcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJzbGljZSIsImZjdF9uYW1lIiwicG9zIiwiaW5kZXhPZiIsImRlYnVnX3ByaW50X2V4Y2VwdGlvbiIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiX3Jhd19lcnJfIiwic3RhY2tfc3RyIiwiZXhjZXB0aW9uX3N0ciIsImxvZyIsInByaW50X29iaiIsIm9iaiIsImVudHJpZXMiLCJkYXRhIiwic2VwIiwicmVzdWx0IiwiZGVmYXVsdF9jYWxsIiwibWV0YSIsIl9fY2FsbF9fIiwia3dfcG9zIiwibmJfcG9zIiwiaWR4X2VuZF9wb3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsIk1hdGgiLCJtYXgiLCJpZHhfdmFyYXJnIiwicG9zX3NpemUiLCJoYXNfa3ciLCJrdyIsImt3YXJncyIsImN1dG9mZiIsIm1pbiIsImFyZ3NfbmFtZXMiLCJoYXNfa3dhcmdzIiwiYXJnc19wb3MiLCJhcmciLCJzdWJzdGl0dXRlX2NhbGwiLCJmY3RfdHlwZSIsInJldF90eXBlIiwicmV0dXJuX3R5cGUiLCJrZXl3b3JkcyIsImJpbmFyeV9qc29wIiwiZW5kc1dpdGgiLCJhcmdzMmpzIiwiX2FyZ3MiLCJTVHlwZV9mY3QiLCJrd19zdGFydCIsImxhc3QiLCJhcmcyanMiLCJnZXRTVHlwZSIsIlNUeXBlX05vbmVUeXBlIiwiaXNNZXRob2QiLCJmY3RfcmV0dXJuX3R5cGUiLCJwb3Nvbmx5YXJncyIsImFubm90YXRpb24iLCJyZXR1cm5zIiwiY29udmVydF9hcmdzIiwicmV0IiwiaGFzX3ZhcmFyZyIsInZhcmFyZyIsImhhc19rd2FyZyIsImt3YXJnIiwidG90YWxfYXJncyIsImt3b25seWFyZ3MiLCJwb3NfZGVmYXVsdHMiLCJkZWZhdWx0cyIsInBvc29ubHkiLCJkb2Zmc2V0IiwiY29udmVydF9hcmciLCJuYl9wb3NfZGVmYXVsdHMiLCJoYXNfb3RoZXJzIiwiY3V0X29mZiIsImt3b25seSIsImt3X2RlZmF1bHRzIiwidmlydF9ub2RlIiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiZGVmdmFsIiwiY2hpbGQiLCJhc3NlcnQiLCJhc25hbWUiLCJtb2R1bGUiLCJuYW1lcyIsImV4YyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIlJVTlRJTUVfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiUlVOVElNRV8xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJSVU5USU1FXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJBU1RfQ09OVkVSVF8yNiIsIkFTVDJKU18yNiIsIlJVTlRJTUVfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJBU1RfQ09OVkVSVF8zMCIsIkFTVDJKU18zMCIsIkFTVF9DT05WRVJUXzMxIiwiQVNUMkpTXzMxIiwiUlVOVElNRV8zMSIsIkFTVF9DT05WRVJUXzMyIiwiQVNUMkpTXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiQVNUX0NPTlZFUlRfMzYiLCJBU1QySlNfMzYiLCJBU1RfQ09OVkVSVF8zNyIsIkFTVDJKU18zNyIsIkFTVF9DT05WRVJUXzM4IiwiQVNUMkpTXzM4IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiUlVOVElNRSIsImFzc2lnbiIsIl9iXyIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImFkZFNUeXBlIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJTVHlwZV9mbG9hdCIsIlNUeXBlX2pzaW50IiwiU1R5cGVfc3RyIiwidmFsdWVzIiwiZmxvYXQyc3RyIiwiZiIsInRvRXhwb25lbnRpYWwiLCJzaWduX2lkeCIsInRvU3RyaW5nIiwiZ2VuQmluYXJ5T3BzIiwiZ2VuVW5hcnlPcHMiLCJJbnQyTnVtYmVyIiwiU1R5cGVfdHlwZV9mbG9hdCIsIm90aGVyIiwib3RoZXJfdHlwZSIsIm1ldGhvZCIsIl9faW50X18iLCJfX3N0cl9fIiwiY29udmVydF9vdGhlciIsInNlbGYiLCJzdWZmaXgiLCJhcyIsInJlYWxfdHlwZSIsImlkX2pzb3AiLCJ1bmFyeV9qc29wIiwiU1R5cGVfdHlwZV9pbnQiLCJhIiwiYiIsIm9wdGkiLCJjb252ZXJ0X3NlbGYiLCJTVHlwZV90eXBlX3N0ciIsInJpZ2h0X25vZGUiLCJyY2hpbGQiLCJyaWdodCIsInJpZ2h0X3R5cGUiLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsImxlZnRzIiwibGVmdCIsImxlZnRfdHlwZSIsIkFzc2lnbk9wZXJhdG9ycyIsIlNUeXBlX05vdEltcGxlbWVudGVkVHlwZSIsIm9wIiwiYm5hbWUycHluYW1lIiwiYXR0ciIsInJldmVyc2VkX29wZXJhdG9yIiwiZmxvb3JkaXZfZmxvYXQiLCJmbG9vciIsImZsb29yZGl2X2ludCIsIm1vZF9mbG9hdCIsIm1vZCIsIm1vZF9pbnQiLCJtdWx0aV9qc29wIiwiYm5hbWUyanNvcCIsImZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSIsInJldmVyc2VkIiwicnR5cGUiLCJsdHlwZSIsImpzb3AiLCJvcHMiLCJyaWdodHMiLCJjb21wYXJhdG9ycyIsIm9wZXJhbmQiLCJleHByIiwia2V5cyIsImVsdHMiLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImJyeXRob25fbm9kZSIsImVycm9yIiwibGluZXMiLCJtIiwiY29udmVydF9saW5lIiwicGFyZW50X2NvbnRleHQiLCJjcmVhdGUiLCJsaW5lX29mZnNldCIsImNoYXIiLCJwYXJzZUV4cHJlc3Npb24iLCJhc3QyanNfY29udmVydCIsInBhcnNlU3ltYm9sIiwiYmVnaW5fc3RyIiwiY2FyIiwic3ltYm9sIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsIm9wMiIsIm9wMSIsInBhcnNlT3BlcmF0b3IiLCJkZWZhdWx0IiwiX3JfIiwiU0JyeXRob24iLCJyZWdpc3RlcmVkX0FTVCIsImJyb3dzZXIiLCJnbG9iYWxUaGlzIiwiYnVpbGRNb2R1bGUiLCJGdW5jdGlvbiIsInJ1bkpTQ29kZSIsImdldE1vZHVsZXMiLCJnZXRNb2R1bGUiLCJfdmFsdWUiLCJCaW5hcnlPcGVyYXRvcnMiLCJqc29wMnB5b3AiLCJKU09wZXJhdG9ycyIsIkpTT3BlcmF0b3JzUHJpb3JpdHkiLCJwcmlvcml0eSIsIkxFRlQiLCJSSUdIVCIsImZpcnN0IiwicGFyZW50X29wIiwicGFyZW50X29wX2RpciIsImRpcmVjdGlvbiIsImN1cl9wcmlvcml0eSIsInBhcmVudF9wcmlvcml0eSIsImNoZWNrX3ByaW9yaXR5IiwibyIsInB5b3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJzcmMiLCJpZEZjdCIsImNvbnZfb3RoZXIiLCJjcyIsInJjcyIsInJldmVyc2UiLCJjb3AiLCJfbmFtZTJTVHlwZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==