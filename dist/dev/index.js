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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_Body__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/Body */ "./src/structs/Body.ts");



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
    if (str instanceof structs_Body__WEBPACK_IMPORTED_MODULE_2__.Body) {
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
//TODO: move2core_modules ?
function args2js(node, cursor) {
    const start = {
        ...cursor
    };
    let js = "(";
    cursor.col += 1;
    const args = node.children[0];
    const _args = args.children;
    let kw_pos = null;
    let idx;
    //TODO: starts after kw ???
    for(idx = _args.length - 1; idx >= 0; --idx){
        if (_args[idx].type === 'arg.posonly') break;
        if (_args[idx].children.length === 0 && _args[idx].type !== "arg.kwarg" && _args[idx].type !== "arg.kwonly") break;
    }
    if (idx !== _args.length) {
        let count = _args.length - idx - 1;
        if (idx < _args.length - 1 && _args[idx + 1].type === "arg.kwonly") kw_pos = idx + 1;
        if (count > 1) kw_pos = idx + 1;
    }
    for(let i = 0; i < _args.length; ++i){
        if (i !== 0) {
            js += ",";
            ++cursor.col;
        }
        if (kw_pos === i) js += toJS('{', cursor);
        if (i === _args.length - 1 && _args[i].type === "arg.vararg") _args[i].last = true;
        js += arg2js(_args[i], cursor);
    }
    if (kw_pos !== null) js += toJS('} = {}', cursor);
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
        if (node.last) return toJS(`...${node.value}`, cursor);
        return toJS((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', "[]"), cursor);
    }
    if (node.type === "arg.kwarg") return toJS((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', "{}"), cursor);
    if (node.children.length === 1) {
        let value = node.children[0];
        if (value.result_type === 'jsint' && node.result_type === 'int') value = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(value);
        return toJS((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, node.value, '=', value), cursor);
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
    context.local_variables[node.name] = 'class.' + node.name;
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
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    //TODO: improve...
    if (this.value !== null) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.value.__init__.call_substitute(this, ...this.children.slice(1)), cursor);
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    const name = node.func.id;
    let ret_type = null;
    //-1) return_type must become SType ?
    // => circular deps ? => singleton getter ? gen => add...
    // 0) py2ast args => 4 different loops, compute here (=> value is free for kw_pos ?)
    // 1) local_fcts[str] = { __call__ } + context clone...
    // in convert_args => undefined ret_type.
    // NOPE => MUST BE in result_type...
    // struct with toString()
    // also RecordType + Klass Type
    // 2) deduce {} in ASTConv instead of AST2JS...
    //         => struct in result_type ? OR better children ?
    //         => (éviter de recalculer...)
    //         => set in local_fcts[str] 
    // 3) call => fetch local_fcts, call __call__.substitute_call(self, node).
    // node.args vs node.keywords
    // ...args, [undef + somekeywords], [...t], {keywords + somepos + kwargs}
    //TODO: autogenerate when fct def ?
    //TODO: parser...
    // __call__.substitute_call(self, astnode) <= can be standard
    // isClass
    // end_pos_idx / vararg_idx
    // [idx]  => name   [for the pos in {}]
    // [name] => idx|-1 [all except pos_only & vararg & kwarg -1 for in {}]
    // can generate type desc + help JS gen ?
    // 1) Pos (node.args)
    //     pos_idx (infinity if vararg)
    //     vararg_idx = pos_idx if none ?
    // i < vararg_idx >>> pos
    // i > vararg_idx >>> vararg (if last ...t)
    // i > pos_idx ==> search in kw for {} => [i]=name
    // could be removed, but harder JS usage if multi defaults.
    // kw => [name] = 0/-1  stared => {a: 4, ...stared, ...stared}.
    //        -1 => {}
    //       >=0 => pos idx
    // undefined : kwargs
    // TODO *t,**d
    // is a class ?
    const klass = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.name2SType)(node.func.id); //TODO...
    if (klass !== undefined) ret_type = klass.__init__.return_type();
    else {
        //TODO fct in object...
        const fct_type = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.name2SType)(context.local_variables[name]);
        ret_type = fct_type.__call__.return_type();
    }
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.call", ret_type, klass, [
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
    let js = '';
    if (!this.type.endsWith("(meth)")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)('function ', cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function convert(node, context) {
    const args = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_args)(node, context);
    const isMethod = context.type === "class";
    let fct_return_type = "klass"; //TODO...
    if (!isMethod) {
        fct_return_type = node.returns?.id;
        if (fct_return_type === undefined) {
            //TODO: loops, try, if
            let returns = node.body.filter((n)=>n.constructor.$name === "Return");
            if (returns.length === 0) fct_return_type = 'None';
        // TODO: return;
        }
        if (fct_return_type !== undefined) {
            const signature = `() -> ${fct_return_type}`;
            context.local_variables[node.name] = signature;
            structs_STypes__WEBPACK_IMPORTED_MODULE_2__._name2SType[signature] = {
                __call__: {
                    return_type: ()=>fct_return_type,
                    call_substitute: ()=>"" /* argument parsing */ 
                }
            };
        }
    }
    // new context for the function local variables
    let old_context = context;
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    const body = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context);
    // recursive.
    if (fct_return_type === undefined) {
        //TODO: loop, if, try
        let ret = body.children.filter((n)=>n.type === "keywords.return");
        fct_return_type = ret[0].result_type;
        const signature = `() -> ${fct_return_type}`;
        //Issue: what if other context duplications ?
        context.local_variables[node.name] = signature;
        old_context.local_variables[node.name] = signature;
        structs_STypes__WEBPACK_IMPORTED_MODULE_2__._name2SType[signature] = {
            __call__: {
                return_type: ()=>fct_return_type,
                call_substitute: ()=>"" /* argument parsing */ 
            }
        };
    }
    for (let arg of args.children)context.local_variables[arg.value] = arg.result_type;
    let type = "functions.def";
    if (isMethod) type += "(meth)";
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
/* harmony import */ var _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./literals/f-string/astconvert.ts */ "./src/core_modules/literals/f-string/astconvert.ts");
/* harmony import */ var _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./literals/f-string/ast2js.ts */ "./src/core_modules/literals/f-string/ast2js.ts");
/* harmony import */ var _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/astconvert.ts */ "./src/core_modules/literals/f-string/FormattedValue/astconvert.ts");
/* harmony import */ var _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/ast2js.ts */ "./src/core_modules/literals/f-string/FormattedValue/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./keywords/import/astconvert.ts */ "./src/core_modules/keywords/import/astconvert.ts");
/* harmony import */ var _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./keywords/import/ast2js.ts */ "./src/core_modules/keywords/import/ast2js.ts");
/* harmony import */ var _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./keywords/import/alias/astconvert.ts */ "./src/core_modules/keywords/import/alias/astconvert.ts");
/* harmony import */ var _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./keywords/import/alias/ast2js.ts */ "./src/core_modules/keywords/import/alias/ast2js.ts");
/* harmony import */ var _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./keywords/assert/astconvert.ts */ "./src/core_modules/keywords/assert/astconvert.ts");
/* harmony import */ var _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./keywords/assert/ast2js.ts */ "./src/core_modules/keywords/assert/ast2js.ts");
/* harmony import */ var _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./keywords/assert/runtime.ts */ "./src/core_modules/keywords/assert/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");












































































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
        AST_CONVERT: _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__["default"],
        AST2JS: _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__["default"]
    },
    "literals.f-string/FormattedValue": {
        AST_CONVERT: _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_37__["default"],
        AST2JS: _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_38__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_39__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_40__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_41__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_42__["default"]
    },
    "keywords.raise": {
        AST_CONVERT: _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_43__["default"],
        AST2JS: _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_44__["default"]
    },
    "keywords.import": {
        AST_CONVERT: _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__["default"],
        AST2JS: _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__["default"]
    },
    "keywords.import/alias": {
        AST_CONVERT: _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_48__["default"],
        AST2JS: _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_49__["default"]
    },
    "keywords.assert": {
        AST_CONVERT: _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_50__["default"],
        AST2JS: _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_51__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_53__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_54__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_59__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_60__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_62__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_63__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_70__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_71__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_72__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_73__["default"]
    },
    "class.classdef": {
        AST_CONVERT: _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_74__["default"],
        AST2JS: _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_75__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _operators_binary_runtime_ts__WEBPACK_IMPORTED_MODULE_20__["default"]);
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_45__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_52__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_61__["default"]);
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.None", "NoneType", null);
}
convert.brython_name = "Constant";


/***/ }),

/***/ "./src/core_modules/literals/None/stype.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/literals/None/stype.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const SType_None = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_None);


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

/***/ "./src/core_modules/literals/bool/stype.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/literals/bool/stype.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");

const SType_bool = {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.CMPOPS_LIST, [
        'float',
        'bool',
        'int',
        'jsint'
    ])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_bool);


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

function ast2js(cursor) {
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("`", cursor);
    for (let child of this.children){
        if (child.result_type === "str") {
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

function convert(node, _context) {
    if (!(node.value instanceof Object) || node.value.__class__?.__qualname__ !== "float") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.float", "float", node.value.value);
}
convert.brython_name = "Constant";


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


const SType_float = {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('float', [
        '**',
        '*',
        '/',
        '+',
        '-'
    ], [
        'float',
        'int',
        'jsint',
        'bool'
    ], {
        convert_other: {
            'int': 'float'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('float', [
        '//'
    ], [
        'float',
        'int',
        'jsint',
        'bool'
    ], {
        convert_other: {
            'int': 'float'
        },
        call_substitute (node, self, other) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('float', [
        '%'
    ], [
        'float',
        'int',
        'jsint',
        'bool'
    ], {
        convert_other: {
            'int': 'float'
        },
        call_substitute (node, self, other) {
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)('float', [
        'u.-'
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        'float',
        'bool',
        'int',
        'jsint'
    ])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_float);


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
    let suffix = "";
    let target = this.as;
    let value = this.value;
    if (target === "float") {
        if (this.result_type === "int") value = Number(value); // remove useless precision.
    } else if (target === "int" || this.result_type === "int") // if already bigint do not cast into jsint (loss of precision).
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

function convert(node, _context) {
    let value = node.value;
    if (value.__class__?.__qualname__ === "int") value = value.value;
    if (typeof value !== "number" && typeof value !== "bigint") return;
    const real_type = typeof value !== "number" ? "int" : "jsint";
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



const SType_int = {
    __init__: {
        return_type: ()=>'int',
        call_substitute: (node, other)=>{
            const method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.name2SType)(other.result_type)?.__int__;
            if (method === undefined) throw new Error(`${other.result_type}.__int__ not defined`);
            return method.call_substitute(node, other);
        }
    },
    __int__: {
        return_type: ()=>'int',
        call_substitute (node, self) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.id_jsop)(node, self);
        }
    },
    /* */ ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('int', [
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
        'int',
        'jsint'
    ], {
        convert_other: {
            'jsint': 'int'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('int', [
        '*'
    ], [
        'int'
    ], {
        call_substitute (node, a, b) {
            const opti = node.as === 'float';
            if (opti) {
                // TODO: check if really interesting...
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(b));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('float', [
        '/'
    ], [
        'int',
        'jsint',
        'float'
    ], {
        convert_self: (s)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(s, 'float'),
        convert_other: {
            'int': 'float'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('int', [
        '//'
    ], [
        'int',
        'jsint'
    ], {
        convert_other: {
            "jsint": "int"
        },
        call_substitute: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('int', [
        '%'
    ], [
        'int',
        'jsint'
    ], {
        convert_other: {
            "jsint": "int"
        },
        call_substitute: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)('int', [
        'u.-'
    ], {
        call_substitute: (node, a)=>{
            const opti = node.as === 'real';
            if (opti) {
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)('int', [
        '~'
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        'float',
        'int',
        'jsint',
        'bool'
    ])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_int);


/***/ }),

/***/ "./src/core_modules/literals/int/stype_jsint.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/literals/int/stype_jsint.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");


const SType_jsint = {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('int', // '**' and '*' => if "as float" could accept loss of precision.
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
        'int',
        'jsint'
    ], {
        convert_self: (self)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(self),
        convert_other: {
            'jsint': 'int'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('int', [
        '*'
    ], [
        'int',
        'jsint'
    ], {
        call_substitute: (node, a, b)=>{
            const opti = node.as === 'float';
            if (opti) {
                // TODO: check if really interesting...
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(b));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(a), '*', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(b));
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('float', [
        '/'
    ], [
        'int',
        'jsint',
        'float'
    ], {
        convert_other: {
            'int': 'float'
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('jsint', [
        '//'
    ], [
        'jsint'
    ], {
        call_substitute: (node, self, other)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_float(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('jsint', [
        '%'
    ], [
        'jsint'
    ], {
        call_substitute: (node, self, other)=>{
            // do not handle -0
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${self}, ${other})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)('jsint', [
        'u.-'
    ], {
        call_substitute: (node, a)=>{
            const opti = node.as === 'int';
            if (opti) {
                return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(a));
            }
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genUnaryOps)('int', [
        '~'
    ], {
        convert_self: (self)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(self)
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        'float',
        'int',
        'jsint',
        'bool'
    ])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_jsint);


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

function convert(node, _context) {
    if (typeof node.value !== "string") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.str", "str", node.value);
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");


const SType_str = {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genCmpOps)(structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.CMPOPS_LIST, [
        'str'
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)("str", [
        "+"
    ], [
        "str"
    ]),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)("str", [
        "*"
    ], [
        "int",
        "jsint"
    ], {
        convert_other: {
            "int": "float"
        },
        call_substitute: (node, a, b)=>{
            if (a.result_type !== "str") [a, b] = [
                b,
                a
            ];
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}.repeat(${b})`;
        }
    })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_str);


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


function ast2js(cursor) {
    let js = "";
    if (this.type.endsWith("(init)")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("var ", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[0], cursor);
    for(let i = 1; i < this.children.length - 1; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)` = ${this.children[i]}`, cursor);
    let right_node = this.children[this.children.length - 1];
    if (right_node.result_type === "jsint" && this.result_type === "int") right_node = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Number2Int)(right_node);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)` = ${right_node}`, cursor);
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
    let type = "operators.=";
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    let right_type = right.result_type;
    let result_type = node?.annotation?.id;
    if (result_type !== undefined && result_type !== right_type) {
        console.warn("Wrong result_type");
    }
    if (result_type === undefined) {
        result_type = right_type;
        if (right_type === "jsint") result_type = "int"; // prevents issues.
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
            if (left.value in context.local_variables) {
                const left_type = context.local_variables[left.value];
                if (left_type !== null && right_type !== left_type) console.warn("Wrong result_type");
            // annotation_type
            } else if (context.type !== "class") {
                context.local_variables[left.value] = result_type;
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
/* harmony import */ var structs_SType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/SType */ "./src/structs/SType.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.AssignOperators[this.value];
    let type = structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    let method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.name2SType)(left.result_type)?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try a = a + b
    if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) {
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
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.call_substitute(this, left, right), cursor);
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
    console.warn("assign", node);
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");


function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    const method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_1__.name2SType)(left.result_type)[this.value];
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.call_substitute(this, left, right), cursor);
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
/* harmony import */ var structs_SType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/SType */ "./src/structs/SType.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    let right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    let type = structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    let method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.name2SType)(left.result_type)?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try reversed operator
    if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.reversed_operator)(op);
        method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.name2SType)(right.result_type)?.[op];
        if (method !== undefined) type = method.return_type(left.result_type);
        if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) throw new Error(`${right.result_type} ${op} ${left.result_type} NOT IMPLEMENTED!`);
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
/* harmony import */ var structs_SType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/SType */ "./src/structs/SType.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");




function find_and_call_substitute(node, left, op, right) {
    let reversed = false;
    const rtype = right.result_type;
    const ltype = left.result_type;
    let type = structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    let method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.name2SType)(left.result_type)?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.reversed_operator)(op);
        method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.name2SType)(right.result_type)?.[op];
        if (method !== undefined) type = method.return_type(left.result_type);
        if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) {
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
    return method.call_substitute(node, left, right, reversed);
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



/*
- ge/le
- gt/lt
*/ function convert(node, context) {
    const ops = node.ops.map((e)=>{
        const op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_2__.bname2pyname[e.constructor.$name];
        if (op === undefined) throw new Error(`${e.constructor.$name} not implemented!`);
        return op;
    });
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const rights = node.comparators.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context));
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `operators.compare`, "bool", ops, [
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
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");



function ast2js(cursor) {
    let left = this.children[0];
    //let right = this.children[1];
    if (this.value === 'not') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(this, '!', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Number)(left, 'jsint')), cursor);
    const method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.name2SType)(left.result_type)[this.value];
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.call_substitute(this, left /*, right*/ ), cursor);
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
/* harmony import */ var structs_SType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! structs/SType */ "./src/structs/SType.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");
/* harmony import */ var structs_STypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/STypes */ "./src/structs/STypes.ts");





function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.operand, context);
    let op = structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_3__.bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    if (op === 'not') return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.unary", "bool", "not", [
        left
    ]);
    let type = structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    let method = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_4__.name2SType)(left.result_type)?.[op];
    if (method !== undefined) type = method.return_type();
    if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) {
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


function convert(node, context) {
    if (node.value === undefined) return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "keywords.return", "None", null);
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
/* harmony import */ var _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core_runtime/lists */ "./src/core_runtime/lists.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function isClass(_) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}
function convert(node, context) {
    let result_type = null;
    let value = node.id;
    if (value === 'self') value = 'this';
    else if (value in context.local_variables) result_type = context.local_variables[value];
    else if (value in _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        if (isClass(_core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"][value])) result_type = `class.${value}`;
        value = `_r_.${value}`;
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
/* harmony export */   Context: () => (/* binding */ Context),
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
//TODO: move2core_modules ?
function convert_args(node, context) {
    // kwarg
    let _args = [
        ...node.args.posonlyargs,
        ...node.args.args
    ];
    const defaults = [
        ...node.args.defaults
    ];
    let vararg_idx = null;
    if (node.args.vararg !== undefined) {
        vararg_idx = _args.length;
        _args.push(node.args.vararg);
        defaults.push(undefined);
    }
    _args.push(...node.args.kwonlyargs);
    defaults.push(...node.args.kw_defaults);
    const hasKWArgs = node.args.kwarg !== undefined;
    if (hasKWArgs) {
        _args.push(node.args.kwarg);
        defaults.push(undefined);
    }
    if (context.type === "class") _args = _args.slice(1);
    const args = new Array(_args.length);
    const doffset = _args.length - defaults.length;
    //TODO: 4 different loops...
    for(let i = 0; i < _args.length; ++i){
        let arg_type = "pos";
        if (i < node.args.posonlyargs.length) arg_type = "posonly";
        if (i >= _args.length - node.args.kwonlyargs.length - +hasKWArgs) arg_type = "kwonly";
        if (i === vararg_idx) arg_type = "vararg";
        if (hasKWArgs && i === _args.length - 1) arg_type = "kwarg";
        args[i] = convert_arg(_args[i], defaults[i - doffset], arg_type, context);
        context.local_variables[args[i].value] = args[i].result_type;
    }
    let first;
    let last;
    if (args.length !== 0) {
        first = _args[0];
        last = _args[_args.length - 1];
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
function convert_arg(node, defval, type, context) {
    let result_type = node.annotation?.id;
    let children = new Array();
    if (defval !== undefined) {
        const child = convert_node(defval, context);
        children.push(child);
        if (result_type === undefined) {
            result_type = child.result_type;
            if (result_type === 'jsint') result_type = 'int';
        }
    }
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, `arg.${type}`, result_type, node.arg, children);
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
        this.local_variables = parent_context === null ? Object.create(null) : {
            ...parent_context.local_variables
        };
    }
    type;
    local_variables;
}
function convert_ast(ast) {
    const context = new Context();
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
/* harmony import */ var _SType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SType */ "./src/structs/SType.ts");



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
    if (a.result_type === 'jsint') return a;
    if (a.type === 'literals.int') {
        a.as = target;
        return a;
    }
    if (a.value === '__mul__' || a.value === '__rmul__') {
        const ltype = a.children[0].result_type;
        const rtype = a.children[1].result_type;
        if ((ltype === 'int' || ltype === 'jsint') && (rtype === 'int' || rtype === 'jsint')) {
            a.as = target;
            return a;
        }
    }
    if (a.value === '__neg__' && a.children[0].result_type === 'int') {
        a.as = target;
        return a;
    }
    if (target === "float") return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${a})`;
    // int -> jsint cast is facultative...
    return a;
}
function Number2Int(a) {
    if (a.result_type === 'int') return a;
    if (a.type === 'literals.int') {
        a.as = 'int';
        return a;
    }
    if (a.value === '__neg__' && a.children[0].result_type === 'jsint') {
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
function genUnaryOps(ret_type, ops, { convert_self = (a)=>a, call_substitute } = {}) {
    let result = {};
    const return_type = (o)=>ret_type;
    for (let op of ops){
        const pyop = jsop2pyop[op];
        if (op === 'u.-') op = '-';
        call_substitute ??= (node, self)=>{
            return unary_jsop(node, op, convert_self(self));
        };
        result[`__${pyop}__`] = {
            return_type,
            call_substitute
        };
    }
    return result;
}
function generateConvert(convert) {
    return (node)=>{
        const src = node.result_type;
        const target = convert[src];
        if (target === undefined) return node;
        //TODO: improve:
        if (src === "int") return Int2Number(node, target);
        if (target === "int") return Number2Int(node);
        throw new Error("Unfound conversion");
    };
}
const idFct = (a)=>a;
function genBinaryOps(ret_type, ops, other_type, { convert_other = {}, convert_self = idFct, call_substitute } = {}) {
    let result = {};
    const return_type = (o)=>other_type.includes(o) ? ret_type : _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
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
        if (call_substitute !== undefined) {
            cs = (node, self, o)=>{
                return call_substitute(node, convert_self(self), conv_other(o));
            };
            // same_order ? fct : 
            rcs = (node, self, o)=>{
                return call_substitute(node, conv_other(o), convert_self(self));
            };
        }
        result[`__${pyop}__`] = {
            return_type,
            call_substitute: cs
        };
        result[`__r${pyop}__`] = {
            return_type,
            call_substitute: rcs
        };
        if (convert_self === idFct && call_substitute === undefined) result[`__i${pyop}__`] = {
            return_type,
            call_substitute: (node, self, other)=>{
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
function genCmpOps(ops, other_type, { convert_other = {}, convert_self = idFct, call_substitute } = {}) {
    let result = {};
    const return_type = (o)=>other_type.includes(o) ? "bool" : _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
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
        if (call_substitute !== undefined) {
            cs = (node, self, o, reversed)=>{
                return call_substitute(node, convert_self(self), conv_other(o)); //TODO...
            };
        }
        result[`__${pyop}__`] = {
            return_type,
            call_substitute: cs
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

/***/ "./src/structs/SType.ts":
/*!******************************!*\
  !*** ./src/structs/SType.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SType_NOT_IMPLEMENTED: () => (/* binding */ SType_NOT_IMPLEMENTED)
/* harmony export */ });
const SType_NOT_IMPLEMENTED = "NotImplementedType";


/***/ }),

/***/ "./src/structs/STypes.ts":
/*!*******************************!*\
  !*** ./src/structs/STypes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _name2SType: () => (/* binding */ _name2SType),
/* harmony export */   name2SType: () => (/* binding */ name2SType)
/* harmony export */ });
/* harmony import */ var core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/literals/float/stype */ "./src/core_modules/literals/float/stype.ts");
/* harmony import */ var core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/literals/int/stype */ "./src/core_modules/literals/int/stype.ts");
/* harmony import */ var core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/literals/str/stype */ "./src/core_modules/literals/str/stype.ts");
/* harmony import */ var core_modules_literals_None_stype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core_modules/literals/None/stype */ "./src/core_modules/literals/None/stype.ts");
/* harmony import */ var core_modules_literals_bool_stype__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core_modules/literals/bool/stype */ "./src/core_modules/literals/bool/stype.ts");
/* harmony import */ var core_modules_literals_int_stype_jsint__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core_modules/literals/int/stype_jsint */ "./src/core_modules/literals/int/stype_jsint.ts");






//export type STypeName = keyof typeof name2SType;
const _name2SType = {
    "float": core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_0__["default"],
    "int": core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__["default"],
    "jsint": core_modules_literals_int_stype_jsint__WEBPACK_IMPORTED_MODULE_5__["default"],
    "bool": core_modules_literals_bool_stype__WEBPACK_IMPORTED_MODULE_4__["default"],
    "str": core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_2__["default"],
    "NoneType": core_modules_literals_None_stype__WEBPACK_IMPORTED_MODULE_3__["default"]
};
function name2SType(name) {
    return _name2SType[name];
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
/* harmony export */   SBrython: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_3__.SBrython),
/* harmony export */   _b_: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_3__._b_),
/* harmony export */   _r_: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_3__._r_),
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   convert_ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_ast),
/* harmony export */   parse_stack: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_4__.parse_stack),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast),
/* harmony export */   py2ast_fast: () => (/* reexport safe */ _py2ast_fast__WEBPACK_IMPORTED_MODULE_2__.py2ast),
/* harmony export */   stackline2astnode: () => (/* reexport safe */ _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_4__.stackline2astnode)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");
/* harmony import */ var _py2ast_fast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./py2ast_fast */ "./src/py2ast_fast.ts");
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runtime */ "./src/runtime.ts");
/* harmony import */ var _core_modules_controlflows_tryblock_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_modules/controlflows/tryblock/runtime */ "./src/core_modules/controlflows/tryblock/runtime.ts");






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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFK0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQm9keS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBJbnQyTnVtYmVyLCBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZXxCb2R5LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQm9keSApIHtcbiAgICAgICAgcmV0dXJuIHN0ci50b0pTKGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGVcbiAgICAgICAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0ICYmICEgQXJyYXkuaXNBcnJheShzdHIpICkgeyAvLyBmb3IgcHkyYXN0X2Zhc3RcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZihwcmludF9icmFja2V0KVxuICAgICAgICBqcys9XCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgaWYocHJpbnRfYnJhY2tldCkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgfVxuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBjb25zdCBfYXJncyA9IGFyZ3MuY2hpbGRyZW47XG5cbiAgICBsZXQga3dfcG9zID0gbnVsbDtcbiAgICBcbiAgICBsZXQgaWR4O1xuICAgIC8vVE9ETzogc3RhcnRzIGFmdGVyIGt3ID8/P1xuICAgIGZvciggaWR4ID0gX2FyZ3MubGVuZ3RoIC0gMTsgaWR4ID49IDA7IC0taWR4KSB7XG4gICAgICAgIGlmKCBfYXJnc1tpZHhdLnR5cGUgPT09ICdhcmcucG9zb25seScgKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGlmKCBfYXJnc1tpZHhdLmNoaWxkcmVuLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgJiYgX2FyZ3NbaWR4XS50eXBlICE9PSBcImFyZy5rd2FyZ1wiXG4gICAgICAgICAgICAmJiBfYXJnc1tpZHhdLnR5cGUgIT09IFwiYXJnLmt3b25seVwiXG4gICAgICAgIClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmKCBpZHggIT09IF9hcmdzLmxlbmd0aCApIHtcbiAgICAgICAgbGV0IGNvdW50ID0gX2FyZ3MubGVuZ3RoIC0gaWR4IC0gMTtcbiAgICAgICAgaWYoIGlkeCA8IF9hcmdzLmxlbmd0aCAtIDEgJiYgX2FyZ3NbaWR4KzFdLnR5cGUgPT09IFwiYXJnLmt3b25seVwiIClcbiAgICAgICAgICAgIGt3X3BvcyA9IGlkeCsxO1xuICAgICAgICBpZiggY291bnQgPiAxICkgLy98fCBjb3VudCAhPT0gMCAmJiBpZHggIT09IC0xICYmIF9hcmdzW2lkeF0uY2hpbGRyZW4ubGVuZ3RoID09PSAxIClcbiAgICAgICAgICAgIGt3X3BvcyA9IGlkeCsxO1xuICAgIH1cbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IF9hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKSB7XG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgICAgICsrY3Vyc29yLmNvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBrd19wb3MgPT09IGkpXG4gICAgICAgICAgICBqcyArPSB0b0pTKCd7JywgY3Vyc29yKTtcbiAgICAgICAgaWYoIGkgPT09IF9hcmdzLmxlbmd0aC0xICYmIF9hcmdzW2ldLnR5cGUgPT09IFwiYXJnLnZhcmFyZ1wiIClcbiAgICAgICAgICAgIChfYXJnc1tpXSBhcyBhbnkpLmxhc3QgPSB0cnVlO1xuXG4gICAgICAgIGpzICs9IGFyZzJqcyhfYXJnc1tpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBpZigga3dfcG9zICE9PSBudWxsKVxuICAgICAgICBqcyArPSB0b0pTKCd9ID0ge30nLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBpZiggbm9kZS50eXBlID09PSBcImFyZy52YXJhcmdcIiApIHtcbiAgICAgICAgaWYoIChub2RlIGFzIGFueSkubGFzdClcbiAgICAgICAgICAgIHJldHVybiB0b0pTKGAuLi4ke25vZGUudmFsdWV9YCwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIHRvSlMoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgXCJbXVwiKSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBpZiggbm9kZS50eXBlID09PSBcImFyZy5rd2FyZ1wiIClcbiAgICAgICAgcmV0dXJuIHRvSlMoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgXCJ7fVwiKSwgY3Vyc29yKTtcblxuICAgIGlmKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxICkge1xuXG4gICAgICAgIGxldCB2YWx1ZTogYW55ID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgaWYoIHZhbHVlLnJlc3VsdF90eXBlID09PSAnanNpbnQnICYmIG5vZGUucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIySW50KHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdG9KUyggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCB2YWx1ZSksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS52YWx1ZTtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBiYXNlX2luZGVudCA9IG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgaWYoIFtcImNvbnRyb2xmbG93cy5lbHNlXCIsIFwiY29udHJvbGZsb3dzLmVsaWZcIiwgXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiXS5pbmNsdWRlcyhub2RlLnR5cGUpICkge1xuICAgICAgIC0tYmFzZV9pbmRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBiYXNlX2luZGVudDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKGN1cnNvcik7XG5cbiAgICBub2RlLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBiYXNlOiBzdHJpbmd8QVNUTm9kZSA9IFwiX3JfLm9iamVjdFwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMilcbiAgICAgICAgYmFzZSA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICByZXR1cm4gdG9KUyhyYGNsYXNzICR7dGhpcy52YWx1ZX0gZXh0ZW5kcyAke2Jhc2V9ICR7bmV3IEJvZHkodGhpcyl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLm5hbWVdID0gJ2NsYXNzLicgKyBub2RlLm5hbWU7XG5cbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJjbGFzc1wiLCBjb250ZXh0KTtcblxuICAgIGlmKCBub2RlLmJhc2VzLmxlbmd0aCA+IDEpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmJhc2VzLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgW2NvbnZlcnRfbm9kZShub2RlLmJhc2VzWzBdLCBjb250ZXh0KSwgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXVxuICAgICAgICA6IFtjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY2xhc3MuY2xhc3NkZWZcIiwgbnVsbCwgbm9kZS5uYW1lLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDbGFzc0RlZlwiOyIsImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBfY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIikge1xuXG4gICAgICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZSAgPSBcIjBuXCI7XG4gICAgICAgIGxldCBpbmNyOiBzdHJpbmd8QVNUTm9kZSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBlbmQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gdGhpcy5jaGlsZHJlblsyXTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgICAgIC4uLiBub2RlLml0ZXIuYXJncy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICksXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuaWZibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy9pZlxuICAgIGxldCBrZXl3b3JkID0gXCJpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZSBpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZVwiO1xuXG4gICAgbGV0IGpzID0gdG9KUyhrZXl3b3JkLCBjdXJzb3IpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGlmKCBrZXl3b3JkICE9PSBcImVsc2VcIikgeyAvLyBpZi9lbGlmIGNvbmRpdGlvbi5cbiAgICAgICAgb2Zmc2V0ID0gMTtcbiAgICAgICAganMgKz0gdG9KUyhyYCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIG9mZnNldCk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggXCJpZmJsb2NrXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBpZiggbm9kZS5pZmJsb2NrID09PSBcImVsc2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBpZihjb25kLnJlc3VsdF90eXBlICE9PSBcImJvb2xcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke2NvbmQucmVzdWx0X3R5cGV9IG5vdCB5ZXQgc3VwcG9ydGVkIGFzIGlmIGNvbmRpdGlvbmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgbm9kZS5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgIG5vZGUuaWZibG9jayA9IFwiaWZcIjtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICBub2RlXG4gICAgXTtcblxuICAgIGxldCBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSAmJiBcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSB7XG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGN1ci5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgICAgICBjdXIuaWZibG9jayA9IFwiZWxpZlwiO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGN1cik7XG4gICAgfVxuICAgIGlmKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCAhPT0gMCApIHsgLy8gZWxzZVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhjdXIub3JlbHNlKSxcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgcmVhc29ucy4uLlxuICAgICAgICAgICAgbGluZW5vICAgIDogY3VyLm9yZWxzZVswXS5saW5lbm8gLSAxLFxuICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICAgICBdKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0bm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGNjID0gYXN0bm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgYXN0bm9kZS5jaGlsZHJlbltpXS5weWNvZGUuZW5kID0gY2NbY2MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LnRyeVwiLFxuICAgICAgICAgICAgLi4ubm9kZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS5jYXRjaGJsb2NrXCIsXG4gICAgICAgICAgICAuLi5saXN0cG9zKG5vZGUuaGFuZGxlcnMpLFxuICAgICAgICAgICAgaGFuZGxlcnM6IG5vZGUuaGFuZGxlcnNcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICBdKTtcblxuICAgIC8vZml4IHB5Y29kZS5cbiAgICBhc3Rub2RlLmNoaWxkcmVuWzBdLnB5Y29kZS5lbmQgPSBhc3Rub2RlLmNoaWxkcmVuWzFdLnB5Y29kZS5zdGFydDtcblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmBpZihfZXJyXyBpbnN0YW5jZW9mICR7dGhpcy5jaGlsZHJlblswXX0pe2AsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcys9IGBsZXQgJHt0aGlzLnZhbHVlfSA9IF9lcnJfO2A7XG4gICAgICAgIGpzKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEsIGZhbHNlKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGAsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50eXBlLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJFeGNlcHRIYW5kbGVyXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJjYXRjaChfcmF3X2Vycl8pe1wiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIGpzKz0gdG9KUyhcImNvbnN0IF9lcnJfID0gX3Jhd19lcnJfIGluc3RhbmNlb2YgX2JfLlB5dGhvbkVycm9yXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIjogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1wiLCBjdXJzb3IpO1xuICAgICAgICAvLyBkZWJ1Z1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gdG9KUyhcIl9iXy5kZWJ1Z19wcmludF9leGNlcHRpb24oX2Vycl8sIF9fU0JSWVRIT05fXylcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcblxuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIGZvcihsZXQgaGFuZGxlciBvZiB0aGlzLmNoaWxkcmVuKVxuICAgICAgICBqcys9IHRvSlMoaGFuZGxlciwgY3Vyc29yKTtcblxuICAgIGpzKz0gdG9KUyhcImVsc2V7IHRocm93IF9yYXdfZXJyXyB9XCIsIGN1cnNvcik7IC8vVE9ETy4uLlxuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCk7XG4gICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYmxvY2tgLCBudWxsLCBudWxsLFxuICAgICAgICBub2RlLmhhbmRsZXJzLm1hcCggKGg6YW55KSA9PiBjb252ZXJ0X25vZGUoaCwgY29udGV4dCkpXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS5jYXRjaGJsb2NrXCI7IiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTQnJ5dGhvbiB9IGZyb20gXCJydW50aW1lXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBmaWx0ZXJfc3RhY2soc3RhY2s6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBzdGFjay5maWx0ZXIoIGUgPT4gZS5pbmNsdWRlcygnYnJ5dGhvbl8nKSApOyAvL1RPRE8gaW1wcm92ZXMuLi5cbn1cblxuXG5mdW5jdGlvbiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzOiBBU1ROb2RlW10sIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIpOiBudWxsfEFTVE5vZGUge1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICBpZiggbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID4gbGluZVxuICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQuY29sID4gY29sKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiggICAgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA+IGxpbmVcbiAgICAgICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuZW5kLmNvbCA+IGNvbFxuICAgICAgKSB7XG4gICAgICAgICAgbGV0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzW2ldLmNoaWxkcmVuLCBsaW5lLCBjb2wpO1xuICAgICAgICAgIGlmKCBub2RlICE9PSBudWxsKVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV07XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDsgLy90aHJvdyBuZXcgRXJyb3IoXCJub2RlIG5vdCBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrbGluZTJhc3Rub2RlKHN0YWNrbGluZTogU3RhY2tMaW5lLCBzYjogU0JyeXRob24pOiBBU1ROb2RlIHtcbiAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICByZXR1cm4gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIHN0YWNrbGluZVsxXSwgc3RhY2tsaW5lWzJdKSE7XG59XG5cbmV4cG9ydCB0eXBlIFN0YWNrTGluZSA9IFtzdHJpbmcsIG51bWJlciwgbnVtYmVyXTtcblxuLy9UT0RPOiBjb252ZXJ0XG5leHBvcnQgZnVuY3Rpb24gc3RhY2syYXN0bm9kZXMoc3RhY2s6IFN0YWNrTGluZVtdLCBzYjogU0JyeXRob24pOiBBU1ROb2RlW10ge1xuICByZXR1cm4gc3RhY2subWFwKCBlID0+IHN0YWNrbGluZTJhc3Rub2RlKGUsIHNiKSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgc2I6IFNCcnl0aG9uKTogU3RhY2tMaW5lW10ge1xuXG5cbiAgXG4gICAgc3RhY2sgPSBzdGFjay5zcGxpdChcIlxcblwiKTtcblxuICAgIGNvbnN0IGlzVjggPSBzdGFja1swXT09PSBcIkVycm9yXCI7IFxuXG4gICAgcmV0dXJuIGZpbHRlcl9zdGFjayhzdGFjaykubWFwKCBsID0+IHtcblxuICAgICAgbGV0IFtfLCBfbGluZSwgX2NvbF0gPSBsLnNwbGl0KCc6Jyk7XG4gIFxuICAgICAgaWYoIF9jb2xbX2NvbC5sZW5ndGgtMV0gPT09ICcpJykgLy8gVjhcbiAgICAgICAgX2NvbCA9IF9jb2wuc2xpY2UoMCwtMSk7XG4gIFxuICAgICAgbGV0IGxpbmUgPSArX2xpbmUgLSAyO1xuICAgICAgbGV0IGNvbCAgPSArX2NvbDtcblxuICAgICAgLS1jb2w7IC8vc3RhcnRzIGF0IDEuXG5cbiAgICAgIGxldCBmY3RfbmFtZSE6IHN0cmluZztcbiAgICAgIGlmKCBpc1Y4ICkge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKFwiIFwiLCA3KTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDcsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJldmFsXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG5cbiAgICAgICAgLy9UT0RPOiBleHRyYWN0IGZpbGVuYW1lLlxuICAgICAgICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2RlcywgbGluZSwgY29sKSE7XG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gXCJzeW1ib2xcIilcbiAgICAgICAgICBjb2wgKz0gbm9kZS52YWx1ZS5sZW5ndGg7IC8vIFY4IGdpdmVzIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgc3ltYm9sIG5hbWUgd2hlbiBGRiBnaXZlcyBcIihcIi4uLlxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKCdAJyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSgwLCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiYW5vbnltb3VzXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbZmN0X25hbWUsIGxpbmUsIGNvbF0gYXMgY29uc3Q7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihlcnI6IFB5X0V4Y2VwdGlvbiwgc2I6IFNCcnl0aG9uKSB7XG5cbiAgICBjb25zb2xlLndhcm4oXCJFeGNlcHRpb25cIiwgZXJyKTtcblxuICAgIGNvbnN0IHN0YWNrID0gcGFyc2Vfc3RhY2soIChlcnIgYXMgYW55KS5fcmF3X2Vycl8uc3RhY2ssIHNiKTtcbiAgICBjb25zdCBub2RlcyA9IHN0YWNrMmFzdG5vZGVzKHN0YWNrLCBzYik7XG4gICAgLy9UT0RPOiBjb252ZXJ0IHN0YWNrLi4uXG4gICAgY29uc3Qgc3RhY2tfc3RyID0gc3RhY2subWFwKCAobCxpKSA9PiBgRmlsZSBcIltmaWxlXVwiLCBsaW5lICR7bm9kZXNbaV0ucHljb2RlLnN0YXJ0LmxpbmV9LCBpbiAke3N0YWNrW2ldWzBdfWApO1xuXG4gICAgbGV0IGV4Y2VwdGlvbl9zdHIgPSBcbmBUcmFjZWJhY2sgKG1vc3QgcmVjZW50IGNhbGwgbGFzdCk6XG4gICR7c3RhY2tfc3RyLmpvaW4oYFxcbiAgYCl9XG5FeGNlcHRpb246IFttc2ddYDtcblxuICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbl9zdHIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVidWdfcHJpbnRfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgY29uc3QgYm9keSA9IG5ldyBCb2R5KHRoaXMpO1xuXG4gICAgcmV0dXJuIHRvSlMocmB0cnkke2JvZHl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLnRyeWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkudHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmB3aGlsZSgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPOiBpbXByb3ZlLi4uXG4gICAgaWYoIHRoaXMudmFsdWUgIT09IG51bGwgKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlLl9faW5pdF9fLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCAuLi50aGlzLmNoaWxkcmVuLnNsaWNlKDEpKSwgY3Vyc29yKTtcblxuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy5jaGlsZHJlblswXS5yZXN1bHRfdHlwZT8uc3RhcnRzV2l0aChcImNsYXNzLlwiKSApXG4gICAgICAgIGpzKz0gdG9KUyhcIm5ldyBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfShgLCBjdXJzb3IpO1xuXG4gICAgLy9UT0RPOiBhcmdzIG5vZGUuLi5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcIilcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG4gICAgbGV0ICAgcmV0X3R5cGUgPSBudWxsO1xuXG4gICAgLy8tMSkgcmV0dXJuX3R5cGUgbXVzdCBiZWNvbWUgU1R5cGUgP1xuICAgICAgICAvLyA9PiBjaXJjdWxhciBkZXBzID8gPT4gc2luZ2xldG9uIGdldHRlciA/IGdlbiA9PiBhZGQuLi5cbiAgICAvLyAwKSBweTJhc3QgYXJncyA9PiA0IGRpZmZlcmVudCBsb29wcywgY29tcHV0ZSBoZXJlICg9PiB2YWx1ZSBpcyBmcmVlIGZvciBrd19wb3MgPylcbiAgICAvLyAxKSBsb2NhbF9mY3RzW3N0cl0gPSB7IF9fY2FsbF9fIH0gKyBjb250ZXh0IGNsb25lLi4uXG4gICAgICAgIC8vIGluIGNvbnZlcnRfYXJncyA9PiB1bmRlZmluZWQgcmV0X3R5cGUuXG4gICAgICAgIC8vIE5PUEUgPT4gTVVTVCBCRSBpbiByZXN1bHRfdHlwZS4uLlxuICAgICAgICAvLyBzdHJ1Y3Qgd2l0aCB0b1N0cmluZygpXG4gICAgICAgIC8vIGFsc28gUmVjb3JkVHlwZSArIEtsYXNzIFR5cGVcbiAgICAvLyAyKSBkZWR1Y2Uge30gaW4gQVNUQ29udiBpbnN0ZWFkIG9mIEFTVDJKUy4uLlxuICAgIC8vICAgICAgICAgPT4gc3RydWN0IGluIHJlc3VsdF90eXBlID8gT1IgYmV0dGVyIGNoaWxkcmVuID9cbiAgICAvLyAgICAgICAgID0+ICjDqXZpdGVyIGRlIHJlY2FsY3VsZXIuLi4pXG4gICAgLy8gICAgICAgICA9PiBzZXQgaW4gbG9jYWxfZmN0c1tzdHJdIFxuICAgIC8vIDMpIGNhbGwgPT4gZmV0Y2ggbG9jYWxfZmN0cywgY2FsbCBfX2NhbGxfXy5zdWJzdGl0dXRlX2NhbGwoc2VsZiwgbm9kZSkuXG5cbiAgICAvLyBub2RlLmFyZ3MgdnMgbm9kZS5rZXl3b3Jkc1xuICAgIC8vIC4uLmFyZ3MsIFt1bmRlZiArIHNvbWVrZXl3b3Jkc10sIFsuLi50XSwge2tleXdvcmRzICsgc29tZXBvcyArIGt3YXJnc31cblxuICAgIC8vVE9ETzogYXV0b2dlbmVyYXRlIHdoZW4gZmN0IGRlZiA/XG4gICAgLy9UT0RPOiBwYXJzZXIuLi5cbiAgICAgICAgLy8gX19jYWxsX18uc3Vic3RpdHV0ZV9jYWxsKHNlbGYsIGFzdG5vZGUpIDw9IGNhbiBiZSBzdGFuZGFyZFxuICAgICAgICAvLyBpc0NsYXNzXG5cblxuICAgIC8vIGVuZF9wb3NfaWR4IC8gdmFyYXJnX2lkeFxuICAgIC8vIFtpZHhdICA9PiBuYW1lICAgW2ZvciB0aGUgcG9zIGluIHt9XVxuICAgIC8vIFtuYW1lXSA9PiBpZHh8LTEgW2FsbCBleGNlcHQgcG9zX29ubHkgJiB2YXJhcmcgJiBrd2FyZyAtMSBmb3IgaW4ge31dXG4gICAgICAgIC8vIGNhbiBnZW5lcmF0ZSB0eXBlIGRlc2MgKyBoZWxwIEpTIGdlbiA/XG5cbiAgICAvLyAxKSBQb3MgKG5vZGUuYXJncylcbiAgICAvLyAgICAgcG9zX2lkeCAoaW5maW5pdHkgaWYgdmFyYXJnKVxuICAgIC8vICAgICB2YXJhcmdfaWR4ID0gcG9zX2lkeCBpZiBub25lID9cbiAgICAvLyBpIDwgdmFyYXJnX2lkeCA+Pj4gcG9zXG4gICAgLy8gaSA+IHZhcmFyZ19pZHggPj4+IHZhcmFyZyAoaWYgbGFzdCAuLi50KVxuICAgIC8vIGkgPiBwb3NfaWR4ID09PiBzZWFyY2ggaW4ga3cgZm9yIHt9ID0+IFtpXT1uYW1lXG4gICAgICAgIC8vIGNvdWxkIGJlIHJlbW92ZWQsIGJ1dCBoYXJkZXIgSlMgdXNhZ2UgaWYgbXVsdGkgZGVmYXVsdHMuXG4gICAgLy8ga3cgPT4gW25hbWVdID0gMC8tMSAgc3RhcmVkID0+IHthOiA0LCAuLi5zdGFyZWQsIC4uLnN0YXJlZH0uXG4gICAgICAgIC8vICAgICAgICAtMSA9PiB7fVxuICAgICAgICAvLyAgICAgICA+PTAgPT4gcG9zIGlkeFxuICAgICAgICAvLyB1bmRlZmluZWQgOiBrd2FyZ3NcbiAgICAvLyBUT0RPICp0LCoqZFxuXG5cbiAgICAvLyBpcyBhIGNsYXNzID9cbiAgICBjb25zdCBrbGFzcyA9IG5hbWUyU1R5cGUobm9kZS5mdW5jLmlkKTsgLy9UT0RPLi4uXG4gICAgaWYoIGtsYXNzICE9PSB1bmRlZmluZWQgKVxuICAgICAgICByZXRfdHlwZSA9IChrbGFzcy5fX2luaXRfXyBhcyBTVHlwZUZjdFN1YnMpLnJldHVybl90eXBlKCk7XG4gICAgZWxzZSB7XG4gICAgICAgIC8vVE9ETyBmY3QgaW4gb2JqZWN0Li4uXG5cbiAgICAgICAgY29uc3QgZmN0X3R5cGUgPSBuYW1lMlNUeXBlKCBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tuYW1lXSEgKTtcbiAgICAgICAgcmV0X3R5cGUgPSAoZmN0X3R5cGUuX19jYWxsX18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCByZXRfdHlwZSwga2xhc3MsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDYWxsXCI7IiwiaW1wb3J0IHsgYXJnczJqcywgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9ICcnO1xuICAgIGlmKCAhIHRoaXMudHlwZS5lbmRzV2l0aChcIihtZXRoKVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoJ2Z1bmN0aW9uICcsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuXG4gICAganMgKz0gYXJnczJqcyh0aGlzLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMoXCJ7XCIsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEsIGZhbHNlKTtcblxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmNoaWxkcmVuWzFdLmNoaWxkcmVuO1xuICAgIGlmKCBib2R5W2JvZHkubGVuZ3RoIC0gMV0udHlwZSAhPT0gXCJrZXl3b3Jkcy5yZXR1cm5cIiApIHtcbiAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSBcInJldHVybiBudWxsO1wiXG4gICAgfVxuXG4gICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApICsgdG9KUyhcIn1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2FyZ3MsIGNvbnZlcnRfYm9keSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBfbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuXG4gICAgY29uc3QgaXNNZXRob2QgPSBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIjtcbiAgICBsZXQgZmN0X3JldHVybl90eXBlID0gXCJrbGFzc1wiOyAvL1RPRE8uLi5cblxuICAgIGlmKCAhIGlzTWV0aG9kICkge1xuXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IG5vZGUucmV0dXJucz8uaWQ7XG5cbiAgICAgICAgaWYoIGZjdF9yZXR1cm5fdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICAvL1RPRE86IGxvb3BzLCB0cnksIGlmXG4gICAgICAgICAgICBsZXQgcmV0dXJucyA9IG5vZGUuYm9keS5maWx0ZXIoIChuOmFueSkgPT4gbi5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJSZXR1cm5cIiApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggcmV0dXJucy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgZmN0X3JldHVybl90eXBlID0gJ05vbmUnO1xuICAgICAgICAgICAgLy8gVE9ETzogcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGZjdF9yZXR1cm5fdHlwZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBgKCkgLT4gJHtmY3RfcmV0dXJuX3R5cGV9YDtcblxuXG4gICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLm5hbWVdID0gc2lnbmF0dXJlO1xuICAgICAgICAgICAgX25hbWUyU1R5cGVbc2lnbmF0dXJlXSA9IHtcbiAgICAgICAgICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gZmN0X3JldHVybl90eXBlLFxuICAgICAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6ICgpID0+IFwiXCIgLyogYXJndW1lbnQgcGFyc2luZyAqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgbGV0IG9sZF9jb250ZXh0ID0gY29udGV4dDtcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG4gICAgY29uc3QgYm9keSA9IGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIHJlY3Vyc2l2ZS5cbiAgICBpZiggZmN0X3JldHVybl90eXBlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIC8vVE9ETzogbG9vcCwgaWYsIHRyeVxuICAgICAgICBsZXQgcmV0ID0gYm9keS5jaGlsZHJlbi5maWx0ZXIoIG4gPT4gbi50eXBlID09PSBcImtleXdvcmRzLnJldHVyblwiKTtcbiAgICAgICAgXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IHJldFswXS5yZXN1bHRfdHlwZSE7XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYCgpIC0+ICR7ZmN0X3JldHVybl90eXBlfWA7XG5cbiAgICAgICAgICAgIC8vSXNzdWU6IHdoYXQgaWYgb3RoZXIgY29udGV4dCBkdXBsaWNhdGlvbnMgP1xuICAgICAgICAgICAgY29udGV4dCAgICAubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSBzaWduYXR1cmU7XG4gICAgICAgICAgICBvbGRfY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5uYW1lXSA9IHNpZ25hdHVyZTtcbiAgICAgICAgICAgIF9uYW1lMlNUeXBlW3NpZ25hdHVyZV0gPSB7XG4gICAgICAgICAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IGZjdF9yZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAoKSA9PiBcIlwiIC8qIGFyZ3VtZW50IHBhcnNpbmcgKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gXCJmdW5jdGlvbnMuZGVmXCI7XG4gICAgaWYoaXNNZXRob2QpXG4gICAgICAgIHR5cGUgKz0gXCIobWV0aClcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgYm9keVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRnVuY3Rpb25EZWZcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmBfYl8uYXNzZXJ0KCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiQXNzZXJ0XCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkFzc2VydFwiOyIsImZ1bmN0aW9uIGFzc2VydChjb25kOiBib29sZWFuKSB7XG4gICAgaWYoIGNvbmQgKVxuICAgICAgICByZXR1cm47XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXNzZXJ0XG59OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy52YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlWzBdLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMoYCR7dGhpcy52YWx1ZVswXX06ICR7dGhpcy52YWx1ZVsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnQuYWxpYXNcIiwgbnVsbCwgW25vZGUubmFtZSwgbm9kZS5hc25hbWVdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcblxuICAgIGpzICs9IHRvSlMoXCJjb25zdCB7XCIsIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yICk7XG4gICAgICAgIGpzICs9IHRvSlMoIHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvciApO1xuICAgIH1cbiAgICBqcyArPSB0b0pTKFwifSA9IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGlmKHRoaXMudmFsdWUgPT09IG51bGwpXG4gICAgICAgIGpzICs9IHRvSlMoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBqcyArPSB0b0pTKGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt0aGlzLnZhbHVlfVwiKWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydFwiLCBudWxsLCBub2RlLm1vZHVsZSxcbiAgICAgICAgbm9kZS5uYW1lcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjUgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNiBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNyBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInN0cnVjdHMudHVwbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwic3RydWN0cy5saXN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcInN0cnVjdHMuZGljdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJvcGVyYXRvcnMudW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwib3BlcmF0b3JzLmNvbXBhcmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJvb2xlYW5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF84LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU184XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJpbmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzlcblx0fSxcblx0XCJvcGVyYXRvcnMuYXR0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5bXVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzExLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5Bc3NpZ25PcFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTZcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xN1xuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nL0Zvcm1hdHRlZFZhbHVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE4XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOVxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjBcblx0fSxcblx0XCJrZXl3b3Jkcy5yYWlzZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMVxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMlxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydC9hbGlhc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjVcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay90cnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjlcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zM1xuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM0XG5cdH0sXG5cdFwiY2xhc3MuY2xhc3NkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzVcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfOSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjEpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI0KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yOCk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVUeXBlXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX05vbmUgPSB7XG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfTm9uZTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBcImJvb2xcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IENNUE9QU19MSVNULCBnZW5DbXBPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfYm9vbCA9IHtcbiAgICBcbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgWydmbG9hdCcsICdib29sJywgJ2ludCcsICdqc2ludCddKSxcbiAgICBcbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9ib29sOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiJHtcIiwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgaWYoIGNoaWxkLnJlc3VsdF90eXBlID09PSBcInN0clwiKSB7XG5cbiAgICAgICAgICAgIC8vIGg0Y2tcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgICAgICAgICAgZW5kOiBudWxsIGFzIGFueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZC52YWx1ZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICB9IGVsc2UgaWYoY2hpbGQudHlwZSA9PT0gXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZ1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLm5vZGUudmFsdWVzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSm9pbmVkU3RyXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfZmxvYXQgPSB7XG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdmbG9hdCcsXG4gICAgICAgICAgICAgICAgICAgIFsnKionLCAnKicsICcvJywgJysnLCAnLSddLFxuICAgICAgICAgICAgICAgICAgICBbJ2Zsb2F0JywgJ2ludCcsICdqc2ludCcsICdib29sJ10sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdmbG9hdCcsXG4gICAgICAgIFsnLy8nXSxcbiAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnanNpbnQnLCAnYm9vbCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JyxcbiAgICAgICAgWyclJ10sXG4gICAgICAgIFsnZmxvYXQnLCAnaW50JywgJ2pzaW50JywgJ2Jvb2wnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmLCBvdGhlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCdmbG9hdCcsIFsndS4tJ10pLFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFsnZmxvYXQnLCAnYm9vbCcsICdpbnQnLCAnanNpbnQnXSksXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBzdWZmaXggPSBcIlwiO1xuICAgIGxldCB0YXJnZXQgPSAodGhpcyBhcyBhbnkpLmFzO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgIGlmKHRhcmdldCA9PT0gXCJmbG9hdFwiKSB7XG4gICAgICAgIGlmKCB0aGlzLnJlc3VsdF90eXBlID09PSBcImludFwiIClcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuICAgIH1cbiAgICBlbHNlIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgfHwgdGhpcy5yZXN1bHRfdHlwZSA9PT0gXCJpbnRcIiApXG4gICAgICAgIC8vIGlmIGFscmVhZHkgYmlnaW50IGRvIG5vdCBjYXN0IGludG8ganNpbnQgKGxvc3Mgb2YgcHJlY2lzaW9uKS5cbiAgICAgICAgc3VmZml4ID0gXCJuXCI7XG5cbiAgICAvLyAxZSs1NCBzaG91bGQgaGFkIGJlIHN0b3JlZCBhcyBiaWdpbnQuXG4gICAgcmV0dXJuIHRvSlMocmAke3ZhbHVlfSR7c3VmZml4fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBcImludFwiIDogXCJqc2ludFwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuaW50XCIsIHJlYWxfdHlwZSwgdmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBpZF9qc29wLCBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuY29uc3QgU1R5cGVfaW50ID0ge1xuXG4gICAgX19pbml0X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlLCBvdGhlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gbmFtZTJTVHlwZShvdGhlci5yZXN1bHRfdHlwZSk/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGV9Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuY2FsbF9zdWJzdGl0dXRlIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qICovXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdpbnQnLFxuICAgICAgICBbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgWydpbnQnLCAnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2ludCcsIFsnKiddLCBbJ2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgYSwgYikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnZmxvYXQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdmbG9hdCcsIFsnLyddLCBbJ2ludCcsICdqc2ludCcsICdmbG9hdCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAocykgPT4gSW50Mk51bWJlcihzLCAnZmxvYXQnKSxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdpbnQnLCBbJy8vJ10sIFsnaW50JywgJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2ludCcsIFsnJSddLCBbJ2ludCcsICdqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7XCJqc2ludFwiOiBcImludFwifSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKCdpbnQnLFxuICAgICAgICBbJ3UuLSddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdyZWFsJztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcygnaW50JyxcbiAgICAgICAgWyd+J10sXG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbJ2Zsb2F0JywgJ2ludCcsICdqc2ludCcsICdib29sJ10gKVxuICAgIC8qICovXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfaW50OyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIEludDJOdW1iZXIsIE51bWJlcjJJbnQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfanNpbnQgPSB7XG5cbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2ludCcsXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBbJ2ludCcsICdqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKSxcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnanNpbnQnOiAnaW50J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdpbnQnLCBbJyonXSwgWydpbnQnLCAnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZSwgYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnZmxvYXQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBOdW1iZXIySW50KGEpLCAnKicsIE51bWJlcjJJbnQoYikgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnZmxvYXQnLCBbJy8nXSwgWydpbnQnLCAnanNpbnQnLCAnZmxvYXQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2pzaW50JywgWycvLyddLCBbJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2pzaW50JywgWyclJ10sIFsnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoJ2pzaW50JyxcbiAgICAgICAgWyd1Li0nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdpbnQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgTnVtYmVyMkludChhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCdpbnQnLFxuICAgICAgICBbJ34nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbJ2Zsb2F0JywgJ2ludCcsICdqc2ludCcsICdib29sJ10gKVxuICAgIC8qXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sKi9cbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9qc2ludDsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIGlmKCB0aGlzLnZhbHVlWzBdID09PSAnXCInKVxuICAgICAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuICAgIHJldHVybiB0b0pTKHJgXCIke3RoaXMudmFsdWV9XCJgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuc3RyXCIsIFwic3RyXCIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wc30gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX3N0ciA9IHtcblxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbJ3N0ciddKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoXCJzdHJcIiwgW1wiK1wiXSwgW1wic3RyXCJdKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoXCJzdHJcIiwgW1wiKlwiXSwgW1wiaW50XCIsIFwianNpbnRcIl0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDoge1wiaW50XCI6IFwiZmxvYXRcIn0sXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGEucmVzdWx0X3R5cGUgIT09IFwic3RyXCIgKVxuICAgICAgICAgICAgICAgICAgICBbYSxiXSA9IFtiLGFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgJHthfS5yZXBlYXQoJHtifSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9zdHI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKFwidmFyIFwiLCBjdXJzb3IpO1xuXG4gICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyhyYCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gLCBjdXJzb3IpO1xuXG4gICAgbGV0IHJpZ2h0X25vZGU6IGFueSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV07XG5cbiAgICBpZiggcmlnaHRfbm9kZS5yZXN1bHRfdHlwZSA9PT0gXCJqc2ludFwiICYmIHRoaXMucmVzdWx0X3R5cGUgPT09IFwiaW50XCIgKVxuICAgICAgICByaWdodF9ub2RlID0gTnVtYmVyMkludChyaWdodF9ub2RlKTtcblxuICAgIGpzICs9IHRvSlMocmAgPSAke3JpZ2h0X25vZGV9YCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHR5cGUgPSBcIm9wZXJhdG9ycy49XCI7XG5cbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICBsZXQgcmlnaHRfdHlwZTogc3RyaW5nfG51bGwgPSByaWdodC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG5vZGU/LmFubm90YXRpb24/LmlkO1xuXG4gICAgaWYoIHJlc3VsdF90eXBlICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG4gICAgaWYoIHJlc3VsdF90eXBlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFwianNpbnRcIilcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gXCJpbnRcIjsgLy8gcHJldmVudHMgaXNzdWVzLlxuICAgICAgICAgICAgLy9UT0RPOiBvbmx5IGlmIGFzc2lnbi4uLlxuICAgIH1cblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGNvbnN0IGxlZnRzID0gdGFyZ2V0cy5tYXAoIChuOmFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKTtcblxuICAgICAgICAvLyBjb3VsZCBiZSBpbXByb3ZlZCBJIGd1ZXNzLlxuICAgICAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiggbGVmdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IGxlZnRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV0gPSByZXN1bHRfdHlwZTtcbiAgICAgICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVmdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCByZXN1bHRfdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgLi4ubGVmdHMsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQXNzaWduT3BlcmF0b3JzLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfTk9UX0lNUExFTUVOVEVELCBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBsZXQgb3AgPSAoQXNzaWduT3BlcmF0b3JzIGFzIGFueSlbdGhpcy52YWx1ZV07XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlISk/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfT0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG4gICAgICAgIC8qXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUhKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc29sZS53YXJuKFwiYXNzaWduXCIsIG5vZGUpO1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUudGFyZ2V0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIGxlZnQucmVzdWx0X3R5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBjb25zdCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUhKVt0aGlzLnZhbHVlXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSEodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUhKT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSEpPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIHR5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQmluT3BcIl07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb29yZGl2X2Zsb2F0OiAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoIGEvYiApO1xuICAgIH0sXG4gICAgZmxvb3JkaXZfaW50OiAoYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gYS9iO1xuICAgICAgICBpZiggcmVzdWx0ID4gMCB8fCBhJWIgPT09IDBuKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICByZXR1cm4gLS1yZXN1bHQ7XG4gICAgfSxcbiAgICBtb2RfZmxvYXQ6IDxUPihhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1vZCA9IChhICUgYiArIGIpICUgYjtcbiAgICAgICAgaWYoIG1vZCA9PT0gMCAmJiBiIDwgMCApXG4gICAgICAgICAgICByZXR1cm4gLTA7XG4gICAgICAgIHJldHVybiBtb2Q7XG4gICAgfSxcbiAgICBtb2RfaW50OiA8VD4oYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICByZXR1cm4gKGEgJSBiICsgYikgJSBiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKCBtdWx0aV9qc29wKHRoaXMsIHRoaXMudmFsdWUsIC4uLnRoaXMuY2hpbGRyZW4pICwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS52YWx1ZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICkgKTtcblxuICAgIGNvbnN0IG9wICAgPSAoYm5hbWUyanNvcCBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgIGNvbnN0IHR5cGUgPSBjaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5ib29sZWFuXCIsIHR5cGUsIG9wLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUhKT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wIGFzIGFueSk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUhKT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUhKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSAnJztcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCApXG4gICAgICAgICAgICBqcyArPSB0b0pTKCcgJiYgJywgY3Vyc29yKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJz09PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnIT09JywgcmlnaHQpLCBjdXJzb3IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvL1RPRE86IGNoYWluLi4uXG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgb3AsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG4vKlxuLSBnZS9sZVxuLSBndC9sdFxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtlLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICAgICAgaWYoIG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5jb25zdHJ1Y3Rvci4kbmFtZX0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZWZ0ICAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHRzID0gbm9kZS5jb21wYXJhdG9ycy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy5jb21wYXJlYCwgXCJib29sXCIsIG9wcyxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIC4uLnJpZ2h0cyxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgLy9sZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgaWYoIHRoaXMudmFsdWUgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gdG9KUyggdW5hcnlfanNvcCh0aGlzLCAnIScsIEludDJOdW1iZXIobGVmdCwgJ2pzaW50JykgKSwgY3Vyc29yICk7XG5cbiAgICBjb25zdCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUhKVt0aGlzLnZhbHVlXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSEodGhpcywgbGVmdC8qLCByaWdodCovKSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTk9UX0lNUExFTUVOVEVELCBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiggb3AgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgXCJib29sXCIsIFwibm90XCIsIFsgbGVmdCBdICk7XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlISk/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTk9UIElNUExFTUVOVEVEIScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgXCJOb25lXCIsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIk9iamVjdC5mcmVlemUoW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXSlcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJztcblxuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3ZhbHVlXTtcbiAgICBlbHNlIGlmKHZhbHVlIGluIF9yXykge1xuICAgICAgICBpZiggaXNDbGFzcyhfcl9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7dmFsdWV9YDtcblxuICAgICAgICB2YWx1ZSA9IGBfcl8uJHt2YWx1ZX1gO1xuICAgIH1cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYoICEobmFtZSBpbiBtb2R1bGVzKSApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBtb2R1bGUgb2YgbW9kdWxlc1tuYW1lXSkgeyBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8ga3dhcmdcbiAgICBsZXQgX2FyZ3MgPSBbLi4ubm9kZS5hcmdzLnBvc29ubHlhcmdzLCAuLi5ub2RlLmFyZ3MuYXJnc107XG4gICAgY29uc3QgZGVmYXVsdHMgPSBbLi4ubm9kZS5hcmdzLmRlZmF1bHRzXTtcblxuICAgIGxldCB2YXJhcmdfaWR4ID0gbnVsbDtcbiAgICBpZiggbm9kZS5hcmdzLnZhcmFyZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhcmFyZ19pZHggPSBfYXJncy5sZW5ndGg7XG4gICAgICAgIF9hcmdzICAgLnB1c2goIG5vZGUuYXJncy52YXJhcmcgKTtcbiAgICAgICAgZGVmYXVsdHMucHVzaCggdW5kZWZpbmVkICk7XG4gICAgfVxuICAgIF9hcmdzLnB1c2goLi4ubm9kZS5hcmdzLmt3b25seWFyZ3MpO1xuICAgIGRlZmF1bHRzLnB1c2goIC4uLm5vZGUuYXJncy5rd19kZWZhdWx0cyApO1xuXG4gICAgY29uc3QgaGFzS1dBcmdzID0gbm9kZS5hcmdzLmt3YXJnICE9PSB1bmRlZmluZWQ7XG4gICAgaWYoIGhhc0tXQXJncyApIHtcbiAgICAgICAgX2FyZ3MucHVzaCggbm9kZS5hcmdzLmt3YXJnICk7XG4gICAgICAgIGRlZmF1bHRzLnB1c2godW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG5cbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5PEFTVE5vZGU+KF9hcmdzLmxlbmd0aCk7XG4gICAgY29uc3QgZG9mZnNldCAgPSBfYXJncy5sZW5ndGggLSBkZWZhdWx0cy5sZW5ndGg7XG4gICAgLy9UT0RPOiA0IGRpZmZlcmVudCBsb29wcy4uLlxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBfYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgYXJnX3R5cGUgPSBcInBvc1wiO1xuICAgICAgICBpZiggaSA8IG5vZGUuYXJncy5wb3Nvbmx5YXJncy5sZW5ndGgpXG4gICAgICAgICAgICBhcmdfdHlwZSA9IFwicG9zb25seVwiO1xuICAgICAgICBpZiggaSA+PSBfYXJncy5sZW5ndGggLSBub2RlLmFyZ3Mua3dvbmx5YXJncy5sZW5ndGggLSAraGFzS1dBcmdzKVxuICAgICAgICAgICAgYXJnX3R5cGUgPSBcImt3b25seVwiO1xuICAgICAgICBpZiggaSA9PT0gdmFyYXJnX2lkeClcbiAgICAgICAgICAgIGFyZ190eXBlID0gXCJ2YXJhcmdcIjtcbiAgICAgICAgaWYoIGhhc0tXQXJncyAmJiBpID09PSBfYXJncy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgYXJnX3R5cGUgPSBcImt3YXJnXCI7XG4gICAgICAgIGFyZ3NbaV0gPSBjb252ZXJ0X2FyZyhfYXJnc1tpXSwgZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBhcmdfdHlwZSwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2FyZ3NbaV0udmFsdWVdID0gYXJnc1tpXS5yZXN1bHRfdHlwZTtcbiAgICB9XG5cbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gX2FyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBfYXJnc1tfYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6c3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGFyZy4ke3R5cGV9YCwgcmVzdWx0X3R5cGUsIG5vZGUuYXJnLCBjaGlsZHJlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0cG9zKG5vZGU6IGFueVtdKSB7XG5cbiAgICBsZXQgYmVnID0gbm9kZVswXTtcbiAgICBsZXQgZW5kID0gbm9kZVtub2RlLmxlbmd0aC0xXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgIC8vY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubzogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcblxuICAgIGlmKCBsaW5lLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkV4cHJcIilcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG4gICAgLypcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlOyovXG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dHxudWxsID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5sb2NhbF92YXJpYWJsZXMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfdmFyaWFibGVzfVxuICAgIH1cbiAgICB0eXBlO1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0W2ldLnR5cGUpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsIi8vIEB0cy1ub2NoZWNrXG5cbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgYnVpbGRNb2R1bGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiX19TQlJZVEhPTl9fXCIsIGAke2pzY29kZX1cXG5yZXR1cm4gX19leHBvcnRlZF9fO2ApO1xuICAgIH1cblxuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IHRoaXMuYnVpbGRNb2R1bGUoanNjb2RlLCBhc3QpKHRoaXMpO1xuICAgIH1cblxuICAgIGdldE1vZHVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWRbbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0QVNURm9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2ZpbGVuYW1lXTsgLy9UT0RPIG1vZHVsZW5hbWU/XG4gICAgfVxuXG4gICAgZ2V0IF9yXygpIHtcbiAgICAgICAgcmV0dXJuIF9yXztcbiAgICB9XG4gICAgZ2V0IF9iXygpIHtcbiAgICAgICAgcmV0dXJuIF9iXztcbiAgICB9XG59XG5cbiIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuaW50ZXJmYWNlIElBU1ROb2RlICB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIGltcGxlbWVudHMgSUFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlRmN0U3VicyB9IGZyb20gXCIuL1NUeXBlXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBjb25zdCBibmFtZTJweW5hbWUgPSB7XG4gICAgXCJVU3ViXCI6IFwiX19uZWdfX1wiLFxuICAgIFwiTm90XCIgOiBcIm5vdFwiLFxuXG4gICAgXCJQb3dcIiA6IFwiX19wb3dfX1wiLFxuXG4gICAgXCJNdWx0XCIgICAgOiBcIl9fbXVsX19cIixcbiAgICBcIkRpdlwiICAgICA6IFwiX190cnVlZGl2X19cIixcbiAgICBcIkZsb29yRGl2XCI6IFwiX19mbG9vcmRpdl9fXCIsXG4gICAgXCJNb2RcIiAgICAgOiBcIl9fbW9kX19cIixcblxuICAgIFwiQWRkXCIgICAgIDogXCJfX2FkZF9fXCIsXG4gICAgXCJTdWJcIiAgICAgOiBcIl9fc3ViX19cIixcblxuICAgIFwiSXNcIiAgICAgIDogXCJpc1wiLFxuICAgIFwiSXNOb3RcIiAgIDogXCJpcyBub3RcIixcbiAgICBcIkVxXCIgICAgICA6IFwiX19lcV9fXCIsXG4gICAgXCJOb3RFcVwiICAgOiBcIl9fbmVfX1wiLFxuXG4gICAgXCJHdFwiICAgICAgOiBcIl9fZ3RfX1wiLFxuICAgIFwiR3RFXCIgICAgIDogXCJfX2dlX19cIixcbiAgICBcIkx0XCIgICAgICA6IFwiX19sdF9fXCIsXG4gICAgXCJMdEVcIiAgICAgOiBcIl9fbGVfX1wiLFxuXG4gICAgXCJJbnZlcnRcIiAgOiBcIl9fbm90X19cIixcblxuICAgIFwiQml0T3JcIiAgIDogXCJfX29yX19cIixcbiAgICBcIkJpdFhvclwiICA6IFwiX194b3JfX1wiLFxuICAgIFwiQml0QW5kXCIgIDogXCJfX2FuZF9fXCIsXG4gICAgXCJSU2hpZnRcIiAgOiBcIl9fcnNoaWZ0X19cIixcbiAgICBcIkxTaGlmdFwiICA6IFwiX19sc2hpZnRfX1wiLFxufVxuXG5leHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19ycG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19ybXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19ydHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19fcmZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19ybW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19fcmFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19yc3ViX18nLFxuXG4gICAgJ19fZXFfXycgICAgIDogJ19fZXFfXycsXG4gICAgJ19fbmVfXycgICAgIDogJ19fbmVfXycsXG5cbiAgICAnX19sdF9fJyAgICAgOiAnX19ndF9fJyxcbiAgICAnX19ndF9fJyAgICAgOiAnX19sdF9fJyxcbiAgICAnX19sZV9fJyAgICAgOiAnX19nZV9fJyxcbiAgICAnX19nZV9fJyAgICAgOiAnX19sZV9fJyxcblxuICAgICdfX25vdF9fJyAgICA6ICdfX3Jub3RfXycsXG4gICAgJ19fb3JfXycgICAgIDogJ19fcm9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX3JhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19fcnhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19ybHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX3Jyc2hpZnRfXycsXG59XG5cbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbmV4cG9ydCBjb25zdCBKU09wZXJhdG9ycyA9IFtcbiAgICBbJ3UuLSddLFxuICAgIFsnKionXSwgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJysnLCAnLSddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnPCcsICc8PScsICc+PScsICc+J10sXG4gICAgWyc9PScsICchPScsICc9PT0nLCAnIT09J10sXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJ14nXSwgIC8vVE9ET1xuICAgIFsnfCddLCAgLy9UT0RPXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWyc9J10gLyogZXQgdG91cyBsZXMgZMOpcml2w6lzICovIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIC8vIGV0Yy5cbl07XG5cbi8qXG5odHRwczovL2RvY3MucHl0aG9uLm9yZy8zL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjY2FsbGFibGVcblxuLT4gY2xhc3Nlc1xuYm9vbCgpXG5mbG9hdCgpXG5pbnQoKVxuc3RyKClcbmJ5dGVhcnJheSgpIFtVaW50OEFycmF5XSAoUlcpXG5ieXRlcygpICAgICBbP10gICAgICAgICAgKFJPKSA8LSBubyB0eXBlcyBpbiBKUy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0gVWludDhBcnJheSB3aXRoIGZsYWcgPyBmcmVlemUoKSBbSlMgdW5zYWZlXVxuICAgICAgICAgICAgYlwiZVxceEZGXCIgaW5zdGVhZCBvZiBbMTAxLDEwMV0sIGV0Yy4gKDMyIDw9IGJ5dCA8PSAxMjYpXG50eXBlKClcbmxpc3QoKSAgICAgIFtBcnJheV1cbnR1cGxlKCkgICAgIFtPYmplY3QuZnJvemVuKEFycmF5KV1cblxuc2V0KCkgICAgICAgLy8gcmVsaWVzIG9uIGhhc2goKS4uLiA9PiBzZXRbbGl0ZXJhbHNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gc2V0KCkgLyA8LSBKUyBzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgID0+IGJ5dGVzL2J5dGVhcnJheS9ldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBTZXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBJbnRlcm5hbCBrZXlzKCkgc2V0IFtyZWNvbXB1dGUgaGFzaCB3aGVuIGFkZC9yZW1vdmVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW50ZXJuYWxseSBzdG9yZWQgYXMgTWFwKGhhc2gsIHZhbHVlKSAoPylcbmZyb3plbnNldCgpICAgICAgICAgICAgPT4gZXh0ZW5kcyBzZXQgdG8gcmVwbGFjZSBtb2RpZmllcnMuXG5cbmRpY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzdHJdIGFzIE9iamVjdC5jcmVhdGUobnVsbCkgKyAoYW5kIHB1cmUgSlNPYmogYXMgZGljdFtzdHJdIClcbiAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgTWFwKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBTZXQoaGFzaCkgLyBNYXAoaGFzaCwga2V5KSAvIE1hcChrZXksIGhhc2gpID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQvc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IE1hcChrZXksIHZhbHVlKVxuXG5vYmplY3QoKVxuY29tcGxleCgpXG5tZW1vcnl2aWV3KCkgICAgICAgICAgICA9PiBBcnJheUJ1ZmZlciA/XG5cbi0+IHByaW50XG5hc2NpaSgpXG5iaW4oKVxuaGV4KClcbm9jdCgpXG5yZXByKClcbmhhc2goKVxuXG4tPiBtYXRoc1xuYWJzKClcbmRpdm1vZCgpXG5wb3coKVxucm91bmQoKVxuXG4tPiBsaXN0c1xuYWxsKClcbmFueSgpXG5maWx0ZXIoKVxubWFwKClcbm1heCgpXG5taW4oKVxuc3VtKClcbmxlbigpXG5lbnVtZXJhdGUoKVxucmV2ZXJzZWQoKVxuc2xpY2UoKVxuc29ydGVkKClcbnppcCgpXG5cbi0+IGl0ZXJcbnJhbmdlKClcbmFpdGVyKClcbml0ZXIoKVxuYW5leHQoKVxubmV4dCgpXG5cbi0+IHN0clxub3JkKClcbmNocigpXG5mb3JtYXQoKVxucHJpbnQoKVxuZlwiXCJcblxuY2FsbGFibGUoKVxuY2xhc3NtZXRob2QoKVxuc3RhdGljbWV0aG9kKClcbnByb3BlcnR5KClcbnN1cGVyKClcbmlzaW5zdGFuY2UoKVxuaXNzdWJjbGFzcygpXG5kZWxhdHRyKClcbmdldGF0dHIoKVxuaGFzYXR0cigpXG5zZXRhdHRyKClcbmRpcigpXG5cbmV2YWwoKVxuZXhlYygpXG5jb21waWxlKClcbmJyZWFrcG9pbnQoKVxuXG5nbG9iYWxzKClcbmxvY2FscygpXG52YXJzKClcbl9faW1wb3J0X18oKVxuXG5pZCgpXG4gICAgLT4gb24tZGVtYW5kIHdlYWtyZWYgP1xuXG5oZWxwKClcbmlucHV0KClcbm9wZW4oKVxuXG4qL1xuXG4vKlxudW5hcnlcbi0gcG9zICh1bmFyeSArKVxuXG4tIGJvb2xcbi0gZmxvYXRcbi0gaW50XG4tIHN0clxuLSByZXByXG5cbi0gYWJzXG4tIGNlaWxcbi0gZmxvb3Jcbi0gcm91bmRcbi0gdHJ1bmNcblxuYmluYXJ5XG4tIHBvdy9ycG93XG4tIGRpdm1vZC9yZGl2bW9kXG5cbmNsYXNzXG4tIGNsYXNzXG4tIG5ld1xuLSBpbml0XG4tIGluaXRfc3ViY2xhc3NcblxuLSBzdWJjbGFzc2hvb2sgLy8gX19pc2luc3RhbmNlY2hlY2tfXyBcblxuLSBkaXJcbi0gZGVsYXR0clxuLSBzZXRhdHRyXG4tIGdldGF0dHJpYnV0ZVxuXG4tIGRvY1xuLSBmb3JtYXRcbi0gZ2V0bmV3YXJnc1xuLSBoYXNoXG4tIGluZGV4ICg/KVxuLSBzaXplb2ZcbiovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogQVNUTm9kZSwgdGFyZ2V0ID0gXCJmbG9hdFwiKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX211bF9fJyB8fCBhLnZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gYS5jaGlsZHJlblsxXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgaWYoICAgIChsdHlwZSA9PT0gJ2ludCcgfHwgbHR5cGUgPT09ICdqc2ludCcpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09ICdpbnQnIHx8IHJ0eXBlID09PSAnanNpbnQnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09ICdpbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBcImZsb2F0XCIgKVxuICAgICAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xuXG4gICAgLy8gaW50IC0+IGpzaW50IGNhc3QgaXMgZmFjdWx0YXRpdmUuLi5cbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE51bWJlcjJJbnQoYTogQVNUTm9kZSkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSAnaW50JztcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gXCJpbnRcIjtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgQmlnSW50KCR7YX0pYDtcbn1cblxubGV0IEpTT3BlcmF0b3JzUHJpb3JpdHk6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbmZvcihsZXQgaSA9IDA7IGkgPCBKU09wZXJhdG9ycy5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBKU09wZXJhdG9ycy5sZW5ndGggLSBpO1xuICAgIGZvcihsZXQgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIC4uLnZhbHVlczogQVNUTm9kZVtdKSB7XG5cbiAgICBjb25zdCBmaXJzdCA9IHZhbHVlc1swXTtcbiAgICBpZihmaXJzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUfFJJR0hUO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmKGxhc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7Zmlyc3R9YDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKVxuICAgICAgICByZXN1bHQgPSByYCR7cmVzdWx0fSAmJiAke3ZhbHVlc1tpXX1gO1xuXG4gICAgaWYoIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHthfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlfGFueSwgb3A6IHN0cmluZywgYjogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtvcH0ke2F9YDtcblxuICAgIGlmKG9wID09PSAnLScpXG4gICAgICAgIG9wID0gJ3UuLSc7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCAoZGlyZWN0aW9uICYgTEVGVCkgJiYgcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIGNhbGxfc3Vic3RpdHV0ZT86IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiBhbnlcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlblVuYXJ5T3BzKHJldF90eXBlICA6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHMgICAgICAgOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA9IChhKSA9PiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5VbmFyeU9wc19PcHRzID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiByZXRfdHlwZTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJ3UuLScpXG4gICAgICAgICAgICBvcCA9ICctJztcblxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUgPz89IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5CaW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X290aGVyICAgPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIGNhbGxfc3Vic3RpdHV0ZSA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIChub2RlOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyAgICA9IG5vZGUucmVzdWx0X3R5cGUhO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb252ZXJ0W3NyY107XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IGltcHJvdmU6XG4gICAgICAgIGlmKCBzcmMgPT09IFwiaW50XCIpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBcImludFwiIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufVxuXG5jb25zdCBpZEZjdCA9IDxUPihhOiBUKSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKHJldF90eXBlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiBzdHJpbmdbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBzdHJpbmcpID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyByZXRfdHlwZSA6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggY2FsbF9zdWJzdGl0dXRlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGNvbnZfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IGlkRmN0ICYmIGNhbGxfc3Vic3RpdHV0ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5DbXBPcHMoICBvcHMgICAgICAgOiByZWFkb25seSAoa2V5b2YgdHlwZW9mIHJldmVyc2UpW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdHlwZTogcmVhZG9ubHkgc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gaWRGY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuQmluYXJ5T3BzX09wdHMgPSB7fSApIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IHN0cmluZykgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IFwiYm9vbFwiIDogU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY29wID0gb3A7XG5cbiAgICAgICAgICAgIGxldCBhID0gY29udmVydF9zZWxmKHNlbGYpO1xuICAgICAgICAgICAgbGV0IGIgPSBjb252X290aGVyKG90aGVyKTtcbiAgICAgICAgICAgIGlmKCByZXZlcnNlZCApIHtcbiAgICAgICAgICAgICAgICBbYSxiXcKgPSBbYixhXTtcbiAgICAgICAgICAgICAgICBjb3AgPSByZXZlcnNlW2NvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBjb3BbMF0gPT09ICc9JyB8fCBjb3BbMF0gPT09ICchJyApIHtcbiAgICAgICAgICAgICAgICBpZiggc2VsZi5yZXN1bHRfdHlwZSA9PT0gb3RoZXIucmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIGNvcCA9IGNvcCArICc9JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsIGNvcCwgYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggY2FsbF9zdWJzdGl0dXRlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsX3N1YnN0aXR1dGUobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252X290aGVyKG8pICk7IC8vVE9ETy4uLlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiBjcyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzLCBuZXdsaW5lLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCIuL0FTVE5vZGVcIjtcblxuXG5leHBvcnQgY2xhc3MgQm9keSB7XG5cbiAgICBub2RlO1xuICAgIHByaW50X2JyYWNrZXQ7XG4gICAgaWR4O1xuXG4gICAgY29uc3RydWN0b3Iobm9kZTogQVNUTm9kZSwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5pZHggPSBub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyAvL1RPRE8gc2VhcmNoIGJvZHkuLi5cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5wcmludF9icmFja2V0ID0gcHJpbnRfYnJhY2tldDtcbiAgICB9XG5cbiAgICB0b0pTKGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgaWYodGhpcy5wcmludF9icmFja2V0KVxuICAgICAgICAgICAganMrPVwie1wiO1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuaWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcbiAgICBcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJvZHkuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IsIDEpO1xuICAgICAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiO1wiLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYodGhpcy5wcmludF9icmFja2V0KSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbn0iLCJcbmV4cG9ydCB0eXBlIFNUeXBlU3VicyA9IHtcbiAgICB0eXBlICAgICAgID86IHN0cmluZyxcbiAgICBzdWJzdGl0dXRlID86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55XG59O1xuZXhwb3J0IHR5cGUgU1R5cGVGY3RTdWJzID0ge1xuICAgIHR5cGUgICAgICAgICAgICA/OiBzdHJpbmcsIC8vIG9yIG1hbnkgdHlwZXMuLi4gW11cbiAgICBjYWxsX3N1YnN0aXR1dGUgPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksXG4gICAgcmV0dXJuX3R5cGUgICAgICA6ICguLi5hcmdzOiBzdHJpbmdbXSkgPT4gc3RyaW5nIC8vIGZvciBtZXRob2RzL2Z1bmN0aW9ucy4uLlxufTtcbmV4cG9ydCB0eXBlIFNUeXBlID0gc3RyaW5nIHwgU1R5cGVTdWJzIHwgU1R5cGVGY3RTdWJzO1xuZXhwb3J0IHR5cGUgU1R5cGVPYmogPSBSZWNvcmQ8c3RyaW5nLCBTVHlwZT47XG5cbmV4cG9ydCBjb25zdCBTVHlwZV9OT1RfSU1QTEVNRU5URUQgPSBcIk5vdEltcGxlbWVudGVkVHlwZVwiOyIsImltcG9ydCBTVHlwZV9mbG9hdCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlXCI7XG5pbXBvcnQgU1R5cGVfaW50IGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlXCI7XG5pbXBvcnQgU1R5cGVfc3RyIGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlXCI7XG5pbXBvcnQgU1R5cGVfTm9uZSBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9ib29sIGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX2pzaW50IGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50XCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbi8vZXhwb3J0IHR5cGUgU1R5cGVOYW1lID0ga2V5b2YgdHlwZW9mIG5hbWUyU1R5cGU7XG5cbmV4cG9ydCBjb25zdCBfbmFtZTJTVHlwZTogUmVjb3JkPHN0cmluZyxTVHlwZU9iaj4gPSB7XG4gICAgXCJmbG9hdFwiICAgOiBTVHlwZV9mbG9hdCxcbiAgICBcImludFwiICAgICA6IFNUeXBlX2ludCxcbiAgICBcImpzaW50XCIgICA6IFNUeXBlX2pzaW50LFxuICAgIFwiYm9vbFwiICAgIDogU1R5cGVfYm9vbCxcbiAgICBcInN0clwiICAgICA6IFNUeXBlX3N0cixcbiAgICBcIk5vbmVUeXBlXCI6IFNUeXBlX05vbmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hbWUyU1R5cGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIF9uYW1lMlNUeXBlW25hbWVdO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiYmluYXJ5X2pzb3AiLCJOdW1iZXIySW50IiwiQm9keSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImFyZ3MyanMiLCJfYXJncyIsImt3X3BvcyIsImNvdW50IiwibGFzdCIsImFyZzJqcyIsInJlc3VsdF90eXBlIiwiaW5kZW50X2xldmVsIiwiYmFzZV9pbmRlbnQiLCJpbmNsdWRlcyIsImluZGVudCIsInBhZFN0YXJ0IiwiYmFzZSIsIkNvbnRleHQiLCJjb252ZXJ0X2JvZHkiLCJjb252ZXJ0X25vZGUiLCJjb252ZXJ0IiwiY29udGV4dCIsImxvY2FsX3ZhcmlhYmxlcyIsIm5hbWUiLCJiYXNlcyIsIkVycm9yIiwiYnJ5dGhvbl9uYW1lIiwiX2N1cnNvciIsIl9jb250ZXh0IiwiYmVnIiwiaW5jciIsInRhcmdldCIsImlkIiwiaXRlciIsImNvbnN0cnVjdG9yIiwiJG5hbWUiLCJmdW5jIiwibWFwIiwibiIsImtleXdvcmQiLCJvZmZzZXQiLCJsaXN0cG9zIiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0Iiwic2JyeXRob25fdHlwZSIsImN1ciIsIm9yZWxzZSIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJhc3Rub2RlIiwiY2MiLCJweWNvZGUiLCJoYW5kbGVycyIsImhhbmRsZXIiLCJoIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwic3RhY2tsaW5lMmFzdG5vZGUiLCJzdGFja2xpbmUiLCJzYiIsImdldEFTVEZvciIsInN0YWNrMmFzdG5vZGVzIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwibG9nIiwiX19pbml0X18iLCJjYWxsX3N1YnN0aXR1dGUiLCJzdGFydHNXaXRoIiwibmFtZTJTVHlwZSIsInJldF90eXBlIiwia2xhc3MiLCJ1bmRlZmluZWQiLCJyZXR1cm5fdHlwZSIsImZjdF90eXBlIiwiX19jYWxsX18iLCJlbmRzV2l0aCIsImNvbnZlcnRfYXJncyIsIl9uYW1lMlNUeXBlIiwiaXNNZXRob2QiLCJmY3RfcmV0dXJuX3R5cGUiLCJyZXR1cm5zIiwic2lnbmF0dXJlIiwib2xkX2NvbnRleHQiLCJyZXQiLCJhcmciLCJhc3NlcnQiLCJhc25hbWUiLCJtb2R1bGUiLCJuYW1lcyIsImV4YyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIlJVTlRJTUVfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiQVNUX0NPTlZFUlRfMTciLCJBU1QySlNfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIkFTVF9DT05WRVJUXzE5IiwiQVNUMkpTXzE5IiwiQVNUX0NPTlZFUlRfMjAiLCJBU1QySlNfMjAiLCJBU1RfQ09OVkVSVF8yMSIsIkFTVDJKU18yMSIsIlJVTlRJTUVfMjEiLCJBU1RfQ09OVkVSVF8yMiIsIkFTVDJKU18yMiIsIkFTVF9DT05WRVJUXzIzIiwiQVNUMkpTXzIzIiwiQVNUX0NPTlZFUlRfMjQiLCJBU1QySlNfMjQiLCJSVU5USU1FXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJBU1RfQ09OVkVSVF8yNiIsIkFTVDJKU18yNiIsIkFTVF9DT05WRVJUXzI3IiwiQVNUMkpTXzI3IiwiQVNUX0NPTlZFUlRfMjgiLCJBU1QySlNfMjgiLCJSVU5USU1FXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJBU1RfQ09OVkVSVF8zMCIsIkFTVDJKU18zMCIsIkFTVF9DT05WRVJUXzMxIiwiQVNUMkpTXzMxIiwiQVNUX0NPTlZFUlRfMzIiLCJBU1QySlNfMzIiLCJBU1RfQ09OVkVSVF8zMyIsIkFTVDJKU18zMyIsIkFTVF9DT05WRVJUXzM0IiwiQVNUMkpTXzM0IiwiQVNUX0NPTlZFUlRfMzUiLCJBU1QySlNfMzUiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJSVU5USU1FIiwiYXNzaWduIiwiX2JfIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiU1R5cGVfTm9uZSIsIkNNUE9QU19MSVNUIiwiZ2VuQ21wT3BzIiwiU1R5cGVfYm9vbCIsImNoaWxkIiwidmFsdWVzIiwiZ2VuQmluYXJ5T3BzIiwiZ2VuVW5hcnlPcHMiLCJTVHlwZV9mbG9hdCIsImNvbnZlcnRfb3RoZXIiLCJzZWxmIiwib3RoZXIiLCJzdWZmaXgiLCJhcyIsIk51bWJlciIsInJlYWxfdHlwZSIsImlkX2pzb3AiLCJJbnQyTnVtYmVyIiwidW5hcnlfanNvcCIsIlNUeXBlX2ludCIsIm1ldGhvZCIsIl9faW50X18iLCJhIiwiYiIsIm9wdGkiLCJjb252ZXJ0X3NlbGYiLCJTVHlwZV9qc2ludCIsIlNUeXBlX3N0ciIsInJpZ2h0X25vZGUiLCJyaWdodCIsInJpZ2h0X3R5cGUiLCJhbm5vdGF0aW9uIiwiaXNNdWx0aVRhcmdldCIsInRhcmdldHMiLCJsZWZ0cyIsImxlZnQiLCJsZWZ0X3R5cGUiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVHlwZV9OT1RfSU1QTEVNRU5URUQiLCJvcCIsImJuYW1lMnB5bmFtZSIsImF0dHIiLCJyZXZlcnNlZF9vcGVyYXRvciIsImZsb29yZGl2X2Zsb2F0IiwiTWF0aCIsImZsb29yIiwiZmxvb3JkaXZfaW50IiwicmVzdWx0IiwibW9kX2Zsb2F0IiwibW9kIiwibW9kX2ludCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJydHlwZSIsImx0eXBlIiwianNvcCIsIm9wcyIsInJpZ2h0cyIsImNvbXBhcmF0b3JzIiwib3BlcmFuZCIsImV4cHIiLCJrZXlzIiwiZWx0cyIsIl9yXyIsImlzQ2xhc3MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicHJvdG90eXBlIiwid3JpdGFibGUiLCJQeV9vYmplY3QiLCJQeV9FeGNlcHRpb24iLCJQeV9KU0V4Y2VwdGlvbiIsIlJVTlRJTUVfMCIsIlJVTlRJTUVfMSIsIlJVTlRJTUVfMiIsIkNPUkVfTU9EVUxFUyIsIm1vZHVsZXMiLCJtb2R1bGVfbmFtZSIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiYnJ5dGhvbl9ub2RlIiwiZXJyb3IiLCJsaW5lcyIsIm0iLCJjb252ZXJ0X2xpbmUiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJwb3Nvbmx5YXJncyIsImRlZmF1bHRzIiwidmFyYXJnX2lkeCIsInZhcmFyZyIsImt3b25seWFyZ3MiLCJrd19kZWZhdWx0cyIsImhhc0tXQXJncyIsImt3YXJnIiwiZG9mZnNldCIsImFyZ190eXBlIiwiY29udmVydF9hcmciLCJmaXJzdCIsImRlZnZhbCIsInBhcmVudF9jb250ZXh0IiwiY3JlYXRlIiwibGluZV9vZmZzZXQiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsImFzdDJqc19saXRlcmFsc19pbnQiLCJwYXJzZU51bWJlciIsImFzdDJqc19saXRlcmFsc19zdHIiLCJwYXJzZVN0cmluZyIsInBhcnNlVG9rZW4iLCJvcDIiLCJvcDEiLCJwYXJzZU9wZXJhdG9yIiwiZGVmYXVsdCIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJKU09wZXJhdG9yc1ByaW9yaXR5IiwicHJpb3JpdHkiLCJMRUZUIiwiUklHSFQiLCJwYXJlbnRfb3AiLCJwYXJlbnRfb3BfZGlyIiwiZGlyZWN0aW9uIiwiY3VyX3ByaW9yaXR5IiwicGFyZW50X3ByaW9yaXR5IiwiY2hlY2tfcHJpb3JpdHkiLCJvIiwicHlvcCIsImdlbmVyYXRlQ29udmVydCIsInNyYyIsImlkRmN0Iiwib3RoZXJfdHlwZSIsImNvbnZfb3RoZXIiLCJjcyIsInJjcyIsInJldmVyc2UiLCJjb3AiLCJweTJhc3RfZmFzdCJdLCJzb3VyY2VSb290IjoiIn0=