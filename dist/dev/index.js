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
        if (_args[idx].children.length === 0 && _args[idx].type !== "arg.kwarg") break;
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
    console.warn(node);
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
                    substitute_call: ()=>"" /* argument parsing */ 
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
                substitute_call: ()=>"" /* argument parsing */ 
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
    console.warn(op, this.value, left.result_type, method, (0,structs_STypes__WEBPACK_IMPORTED_MODULE_3__.name2SType)(left.result_type));
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
    console.warn(_args);
    if (context.type === "class") _args = _args.slice(1);
    const args = new Array(_args.length);
    const doffset = _args.length - defaults.length;
    for(let i = 0; i < _args.length; ++i){
        let arg_type = "pos";
        if (i < node.args.posonlyargs.length) arg_type = "posonly";
        if (i >= _args.length - node.args.kwonlyargs.length - hasKWArgs) arg_type = "kwonly";
        if (i === vararg_idx) arg_type = "vararg";
        if (hasKWArgs && i === _args.length - 1) arg_type = "kwarg";
        args[i] = convert_arg(_args[i], defaults[i - doffset], arg_type, context);
        context.local_variables[args[i].value] = args[i].result_type;
    }
    //TODO: kwargsS
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNtRDtBQUMyQjtBQUMxQztBQUU3QixTQUFTSSxPQUFPQyxHQUFRO0lBRTNCLE1BQU1DLFdBQVcsRUFBRSxFQUFFLGlCQUFpQjtJQUV6QyxJQUFJQyxLQUFLLENBQUMsY0FBYyxFQUFFRixJQUFJRyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3RDRCxNQUFLLENBQUMsa0NBQWtDLENBQUM7SUFDMUMsSUFBSUUsU0FBUztRQUFDQyxNQUFNO1FBQUdDLEtBQUs7SUFBQztJQUNoQyxLQUFJLElBQUlDLFFBQVFQLElBQUlRLEtBQUssQ0FBRTtRQUUxQk4sTUFBTU8sV0FBV0YsTUFBTUg7UUFFakIsSUFBR0csS0FBS0csSUFBSSxLQUFLLGlCQUNiVCxTQUFTVSxJQUFJLENBQUNKLEtBQUtLLEtBQUs7YUFFeEJWLE1BQU1XLEtBQUssS0FBS1Q7UUFFcEJGLE1BQVNZLFFBQVFQLE1BQU1IO0lBQzNCO0lBRUFGLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRUQsU0FBU2MsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO0lBRTdELE9BQU9iO0FBQ1I7QUFHTyxTQUFTYyxFQUFFQyxHQUF5QixFQUFFLEdBQUdDLElBQVU7SUFDdEQsT0FBTztRQUFDRDtRQUFLQztLQUFLO0FBQ3RCO0FBRU8sU0FBU0wsS0FBTUksR0FBNkMsRUFDN0NiLE1BQWU7SUFFakMsSUFBSSxPQUFPYSxRQUFRLFVBQVU7UUFDekJiLE9BQU9FLEdBQUcsSUFBSVcsSUFBSUUsTUFBTTtRQUN4QixPQUFPRjtJQUNYO0lBRUEsSUFBSUEsZUFBZW5CLDhDQUFJQSxFQUFHO1FBQ3RCLE9BQU9tQixJQUFJSixJQUFJLENBQUNUO0lBQ3BCO0lBRUEsSUFBSWEsZUFBZXRCLG9EQUFPQSxJQUNuQnNCLGVBQWVHLFVBQVUsQ0FBRUMsTUFBTUMsT0FBTyxDQUFDTCxNQUFPO1FBQ25ELE9BQU9SLFdBQVdRLEtBQUtiO0lBQzNCO0lBRUEsSUFBSUYsS0FBSztJQUVULElBQUlxQjtJQUNKLElBQUlDLElBQVk7SUFFaEIsSUFBSSxJQUFJQyxJQUFJLEdBQUdBLElBQUlSLEdBQUcsQ0FBQyxFQUFFLENBQUNFLE1BQU0sRUFBRSxFQUFFTSxFQUFHO1FBRW5DRCxJQUFJUCxHQUFHLENBQUMsRUFBRSxDQUFDUSxFQUFFO1FBQ2J2QixNQUFNc0I7UUFDTnBCLE9BQU9FLEdBQUcsSUFBSWtCLEVBQUVMLE1BQU07UUFFdEJJLElBQUlOLEdBQUcsQ0FBQyxFQUFFLENBQUNRLEVBQUU7UUFDYixJQUFJRixhQUFhSCxRQUFRO1lBQ3JCbEIsTUFBTVcsS0FBS1UsR0FBR25CO1FBQ2xCLE9BQU87WUFDSG9CLElBQUksQ0FBQyxFQUFFRCxFQUFFLENBQUM7WUFDVnJCLE1BQU1zQjtZQUNOcEIsT0FBT0UsR0FBRyxJQUFJa0IsRUFBRUwsTUFBTTtRQUMxQjtJQUNKO0lBRUFLLElBQUlQLEdBQUcsQ0FBQyxFQUFFLENBQUNBLEdBQUcsQ0FBQyxFQUFFLENBQUNFLE1BQU0sQ0FBQztJQUN6QmpCLE1BQU1zQjtJQUNOcEIsT0FBT0UsR0FBRyxJQUFJa0IsRUFBRUwsTUFBTTtJQUV0QixPQUFPakI7QUFDWDtBQUVBLDJCQUEyQjtBQUNwQixTQUFTd0IsUUFBUW5CLElBQWEsRUFBRUgsTUFBZSxFQUFFdUIsTUFBTSxDQUFDLEVBQUVDLGdCQUFnQixJQUFJO0lBRWpGLE1BQU1DLFFBQVE7UUFBQyxHQUFHekIsTUFBTTtJQUFBO0lBRXhCLElBQUlGLEtBQUs7SUFDVCxJQUFHMEIsZUFDQzFCLE1BQUk7SUFDUixNQUFNNEIsT0FBT3ZCLEtBQUt3QixRQUFRLENBQUNKLElBQUksRUFBQyxrQkFBa0I7SUFFbEQsSUFBSSxJQUFJRixJQUFJLEdBQUdBLElBQUlLLEtBQUtDLFFBQVEsQ0FBQ1osTUFBTSxFQUFFLEVBQUVNLEVBQUc7UUFDMUN2QixNQUFNWSxRQUFRUCxNQUFNSCxRQUFRO1FBQzVCRixNQUFNTyxXQUFXcUIsS0FBS0MsUUFBUSxDQUFDTixFQUFFLEVBQUVyQjtJQUN2QztJQUVBLElBQUd3QixlQUFlO1FBQ2QxQixNQUFNWSxRQUFRUCxNQUFNSDtRQUNwQkYsTUFBTTtRQUNORSxPQUFPRSxHQUFHLElBQUk7SUFDbEI7SUFFQXdCLEtBQUtFLE1BQU0sR0FBRztRQUNWSCxPQUFPQTtRQUNQSSxLQUFPO1lBQUMsR0FBRzdCLE1BQU07UUFBQTtJQUNyQjtJQUVBLE9BQU9GO0FBQ1g7QUFFQSwyQkFBMkI7QUFDcEIsU0FBU2dDLFFBQVEzQixJQUFhLEVBQUVILE1BQWU7SUFFbEQsTUFBTXlCLFFBQVE7UUFBQyxHQUFHekIsTUFBTTtJQUFBO0lBRXhCLElBQUlGLEtBQUs7SUFDVEUsT0FBT0UsR0FBRyxJQUFJO0lBRWQsTUFBTVksT0FBT1gsS0FBS3dCLFFBQVEsQ0FBQyxFQUFFO0lBQzdCLE1BQU1JLFFBQVFqQixLQUFLYSxRQUFRO0lBRTNCLElBQUlLLFNBQVM7SUFFYixJQUFJVDtJQUNKLDJCQUEyQjtJQUMzQixJQUFLQSxNQUFNUSxNQUFNaEIsTUFBTSxHQUFHLEdBQUdRLE9BQU8sR0FBRyxFQUFFQSxJQUFLO1FBQzFDLElBQUlRLEtBQUssQ0FBQ1IsSUFBSSxDQUFDakIsSUFBSSxLQUFLLGVBQ3BCO1FBQ0osSUFBSXlCLEtBQUssQ0FBQ1IsSUFBSSxDQUFDSSxRQUFRLENBQUNaLE1BQU0sS0FBSyxLQUFLZ0IsS0FBSyxDQUFDUixJQUFJLENBQUNqQixJQUFJLEtBQUssYUFDeEQ7SUFDUjtJQUVBLElBQUlpQixRQUFRUSxNQUFNaEIsTUFBTSxFQUFHO1FBQ3ZCLElBQUlrQixRQUFRRixNQUFNaEIsTUFBTSxHQUFHUSxNQUFNO1FBQ2pDLElBQUlBLE1BQU1RLE1BQU1oQixNQUFNLEdBQUcsS0FBS2dCLEtBQUssQ0FBQ1IsTUFBSSxFQUFFLENBQUNqQixJQUFJLEtBQUssY0FDaEQwQixTQUFTVCxNQUFJO1FBQ2pCLElBQUlVLFFBQVEsR0FDUkQsU0FBU1QsTUFBSTtJQUNyQjtJQUVBLElBQUksSUFBSUYsSUFBSSxHQUFJQSxJQUFJVSxNQUFNaEIsTUFBTSxFQUFFLEVBQUVNLEVBQUc7UUFDbkMsSUFBSUEsTUFBTSxHQUFHO1lBQ1R2QixNQUFNO1lBQ04sRUFBRUUsT0FBT0UsR0FBRztRQUNoQjtRQUVBLElBQUk4QixXQUFXWCxHQUNYdkIsTUFBTVcsS0FBSyxLQUFLVDtRQUNwQixJQUFJcUIsTUFBTVUsTUFBTWhCLE1BQU0sR0FBQyxLQUFLZ0IsS0FBSyxDQUFDVixFQUFFLENBQUNmLElBQUksS0FBSyxjQUMxQyxLQUFNLENBQUNlLEVBQUUsQ0FBU2EsSUFBSSxHQUFHO1FBRTdCcEMsTUFBTXFDLE9BQU9KLEtBQUssQ0FBQ1YsRUFBRSxFQUFFckI7SUFDM0I7SUFFQSxJQUFJZ0MsV0FBVyxNQUNYbEMsTUFBTVcsS0FBSyxVQUFVVDtJQUV6QkYsTUFBTTtJQUNORSxPQUFPRSxHQUFHLElBQUk7SUFFZFksS0FBS2MsTUFBTSxHQUFHO1FBQ1ZILE9BQU9BO1FBQ1BJLEtBQU87WUFBQyxHQUFHN0IsTUFBTTtRQUFBO0lBQ3JCO0lBRUEsT0FBT0Y7QUFDWDtBQUVPLFNBQVNxQyxPQUFPaEMsSUFBYSxFQUFFSCxNQUFlO0lBRWpELE1BQU15QixRQUFRO1FBQUMsR0FBR3pCLE1BQU07SUFBQTtJQUV4QixJQUFJRyxLQUFLRyxJQUFJLEtBQUssY0FBZTtRQUM3QixJQUFJLEtBQWM0QixJQUFJLEVBQ2xCLE9BQU96QixLQUFLLENBQUMsR0FBRyxFQUFFTixLQUFLSyxLQUFLLENBQUMsQ0FBQyxFQUFFUjtRQUNwQyxPQUFPUyxLQUFNakIsb0VBQVdBLENBQUNXLE1BQU1BLEtBQUtLLEtBQUssRUFBRSxLQUFLLE9BQU9SO0lBQzNEO0lBRUEsSUFBSUcsS0FBS0csSUFBSSxLQUFLLGFBQ2QsT0FBT0csS0FBTWpCLG9FQUFXQSxDQUFDVyxNQUFNQSxLQUFLSyxLQUFLLEVBQUUsS0FBSyxPQUFPUjtJQUUzRCxJQUFHRyxLQUFLd0IsUUFBUSxDQUFDWixNQUFNLEtBQUssR0FBSTtRQUU1QixJQUFJUCxRQUFhTCxLQUFLd0IsUUFBUSxDQUFDLEVBQUU7UUFDakMsSUFBSW5CLE1BQU00QixXQUFXLEtBQUssV0FBV2pDLEtBQUtpQyxXQUFXLEtBQUssT0FDdEQ1QixRQUFRZixtRUFBVUEsQ0FBQ2U7UUFFdkIsT0FBT0MsS0FBTWpCLG9FQUFXQSxDQUFDVyxNQUFNQSxLQUFLSyxLQUFLLEVBQUUsS0FBS0EsUUFBUVI7SUFDNUQ7SUFFQSxJQUFJRixLQUFLSyxLQUFLSyxLQUFLO0lBQ25CUixPQUFPRSxHQUFHLElBQUlKLEdBQUdpQixNQUFNO0lBRXZCWixLQUFLeUIsTUFBTSxHQUFHO1FBQ1ZILE9BQU9BO1FBQ1BJLEtBQU87WUFBQyxHQUFHN0IsTUFBTTtRQUFBO0lBQ3JCO0lBRUEsT0FBT0Y7QUFDWDtBQUVPLFNBQVNZLFFBQVFQLElBQWEsRUFBRUgsTUFBZSxFQUFFcUMsZUFBdUIsQ0FBQztJQUU1RSxJQUFJQyxjQUFjbkMsS0FBS3lCLE1BQU0sQ0FBRUgsS0FBSyxDQUFDdkIsR0FBRztJQUN4QyxJQUFJO1FBQUM7UUFBcUI7UUFBcUI7S0FBMEIsQ0FBQ3FDLFFBQVEsQ0FBQ3BDLEtBQUtHLElBQUksR0FBSTtRQUM3RixFQUFFZ0M7SUFDTDtJQUVBLE1BQU1FLFNBQVNILGVBQWEsSUFBSUM7SUFFaEMsRUFBRXRDLE9BQU9DLElBQUk7SUFDYkQsT0FBT0UsR0FBRyxHQUFHc0M7SUFDYixPQUFPLE9BQU8sR0FBR0MsUUFBUSxDQUFDRDtBQUM5QjtBQUVPLFNBQVNuQyxXQUFXRixJQUFhLEVBQUVILE1BQWU7SUFFckRHLEtBQUt5QixNQUFNLEdBQUc7UUFDVkgsT0FBTztZQUFDLEdBQUd6QixNQUFNO1FBQUE7UUFDakI2QixLQUFPO0lBQ1g7SUFFQSxJQUFJL0IsS0FBS0ssS0FBS00sSUFBSSxDQUFFVDtJQUVwQkcsS0FBS3lCLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHO1FBQUMsR0FBRzdCLE1BQU07SUFBQTtJQUU1QixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pPaUM7QUFFRztBQUVyQixTQUFTSCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJMEMsT0FBdUI7SUFDM0IsSUFBSSxJQUFJLENBQUNmLFFBQVEsQ0FBQ1osTUFBTSxLQUFLLEdBQ3pCMkIsT0FBTyxJQUFJLENBQUNmLFFBQVEsQ0FBQyxFQUFFO0lBRTNCLE9BQU9sQiw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUMsU0FBUyxFQUFFa0MsS0FBSyxDQUFDLEVBQUUsSUFBSWhELDhDQUFJQSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUVNO0FBQzFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1g2RDtBQUNuQjtBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZEQSxRQUFRQyxlQUFlLENBQUM3QyxLQUFLOEMsSUFBSSxDQUFDLEdBQUcsV0FBVzlDLEtBQUs4QyxJQUFJO0lBRXpERixVQUFVLElBQUlKLDJDQUFPQSxDQUFDLFNBQVNJO0lBRS9CLElBQUk1QyxLQUFLK0MsS0FBSyxDQUFDbkMsTUFBTSxHQUFHLEdBQ3BCLE1BQU0sSUFBSW9DLE1BQU07SUFFcEIsSUFBSXhCLFdBQVd4QixLQUFLK0MsS0FBSyxDQUFDbkMsTUFBTSxLQUFLLElBQy9CO1FBQUM4QixvREFBWUEsQ0FBQzFDLEtBQUsrQyxLQUFLLENBQUMsRUFBRSxFQUFFSDtRQUFVSCxvREFBWUEsQ0FBQ3pDLE1BQU00QztLQUFTLEdBQ25FO1FBQUNILG9EQUFZQSxDQUFDekMsTUFBTTRDO0tBQVM7SUFFbkMsT0FBTyxJQUFJeEQsb0RBQU9BLENBQUNZLE1BQU0sa0JBQWtCLE1BQU1BLEtBQUs4QyxJQUFJLEVBQUV0QjtBQUNoRTtBQUVBbUIsUUFBUU0sWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNqQlIsU0FBU3pELE9BQXNCMEQsT0FBZ0I7SUFFMUQsU0FBUztJQUNULE9BQU8sSUFBSSxrQkFBa0I7QUFDakM7Ozs7Ozs7Ozs7Ozs7OztBQ0plLFNBQVNQLFFBQVEzQyxJQUFTLEVBQUVtRCxRQUFpQjtJQUV4RCxRQUFRLHNEQUFzRDtBQUU5RCxpRUFBaUU7QUFDakUsK0JBQStCO0FBQy9CLGlCQUFpQjtBQUNyQjs7Ozs7Ozs7Ozs7Ozs7OztBQ1QwQztBQUczQixTQUFTM0QsT0FBc0JLLE1BQWU7SUFFekQsSUFBSSxJQUFJLENBQUNNLElBQUksS0FBSywyQkFBMkI7UUFFekMsSUFBSWlELE1BQXdCO1FBQzVCLElBQUlDLE9BQXVCO1FBQzNCLElBQUkzQixNQUFPLElBQUksQ0FBQ0YsUUFBUSxDQUFDLEVBQUU7UUFFM0IsSUFBSSxJQUFJLENBQUNBLFFBQVEsQ0FBQ1osTUFBTSxHQUFHLEdBQUc7WUFDMUJ3QyxNQUFNLElBQUksQ0FBQzVCLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCRSxNQUFNLElBQUksQ0FBQ0YsUUFBUSxDQUFDLEVBQUU7UUFDMUI7UUFDQSxJQUFJLElBQUksQ0FBQ0EsUUFBUSxDQUFDWixNQUFNLEdBQUcsR0FDdkJ5QyxPQUFPLElBQUksQ0FBQzdCLFFBQVEsQ0FBQyxFQUFFO1FBRTNCLElBQUk3QixLQUFLVyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUMsR0FBRyxFQUFFK0MsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDL0MsS0FBSyxDQUFDLEdBQUcsRUFBRXFCLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQ3JCLEtBQUssQ0FBQyxJQUFJLEVBQUVnRCxLQUFLLENBQUMsQ0FBQyxFQUFFeEQ7UUFDcEdGLE1BQU13QiwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUV0QixRQUFRLElBQUksQ0FBQzJCLFFBQVEsQ0FBQ1osTUFBTSxHQUFDO1FBRWpELE9BQU9qQjtJQUNYO0lBRUEsSUFBSUEsS0FBS1csNENBQUlBLENBQUNHLHlDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQ0osS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUVSO0lBQ3pERixNQUFNd0IsK0NBQU9BLENBQUMsSUFBSSxFQUFFdEIsUUFBUTtJQUVoQyxPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCMkU7QUFDakM7QUFFM0IsU0FBU2dELFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxNQUFNVSxTQUFTdEQsS0FBS3NELE1BQU0sQ0FBQ0MsRUFBRTtJQUM3QlgsUUFBUUMsZUFBZSxDQUFDUyxPQUFPLEdBQUcsTUFBTSxNQUFNO0lBRTlDLElBQUl0RCxLQUFLd0QsSUFBSSxDQUFDQyxXQUFXLENBQUNDLEtBQUssS0FBSyxVQUFVMUQsS0FBS3dELElBQUksQ0FBQ0csSUFBSSxDQUFDSixFQUFFLEtBQUssU0FBUztRQUV6RSxPQUFPLElBQUluRSxvREFBT0EsQ0FBQ1ksTUFBTSwyQkFBMkIsTUFBTXNELFFBQVE7ZUFDMUR0RCxLQUFLd0QsSUFBSSxDQUFDN0MsSUFBSSxDQUFDaUQsR0FBRyxDQUFFLENBQUNDLElBQVVuQixvREFBWUEsQ0FBQ21CLEdBQUdqQjtZQUNuREgsb0RBQVlBLENBQUN6QyxNQUFNNEM7U0FDdEI7SUFFTDtJQUVBLE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLG9CQUFvQixNQUFNc0QsUUFBUTtRQUN2RFosb0RBQVlBLENBQUMxQyxLQUFLd0QsSUFBSSxFQUFFWjtRQUN4Qkgsb0RBQVlBLENBQUN6QyxNQUFNNEM7S0FDdEI7QUFDTDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qm1CO0FBRzNCLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJLElBQUksQ0FBQ00sSUFBSSxLQUFLLHdCQUF3QjtRQUN0QyxJQUFJUixLQUFLO1FBQ1QsSUFBSSxJQUFJdUIsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ00sUUFBUSxDQUFDWixNQUFNLEVBQUUsRUFBRU0sRUFDdkN2QixNQUFNVyw0Q0FBSUEsQ0FBQyxJQUFJLENBQUNrQixRQUFRLENBQUNOLEVBQUUsRUFBRXJCO1FBQ2pDLE9BQU9GO0lBQ1g7SUFFQSxJQUFJO0lBQ0osSUFBSW1FLFVBQVU7SUFDZCxJQUFJLElBQUksQ0FBQzNELElBQUksS0FBSyxxQkFDZDJELFVBQVU7SUFDZCxJQUFJLElBQUksQ0FBQzNELElBQUksS0FBSyxxQkFDZDJELFVBQVU7SUFFZCxJQUFJbkUsS0FBS1csNENBQUlBLENBQUN3RCxTQUFTakU7SUFDdkIsSUFBSWtFLFNBQVM7SUFDYixJQUFJRCxZQUFZLFFBQVE7UUFDcEJDLFNBQVM7UUFDVHBFLE1BQU1XLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNlLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUzQjtJQUN6QztJQUVBRixNQUFNd0IsK0NBQU9BLENBQUMsSUFBSSxFQUFFdEIsUUFBUWtFO0lBRTVCLE9BQU9wRTtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCb0Y7QUFDMUM7QUFFM0IsU0FBU2dELFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxJQUFJLGFBQWE1QyxNQUFPO1FBRXBCLElBQUlBLEtBQUtpRSxPQUFPLEtBQUssUUFBUTtZQUN6QixPQUFPLElBQUk3RSxvREFBT0EsQ0FBQ1ksTUFBTSxDQUFDLGFBQWEsRUFBRUEsS0FBS2lFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxNQUFNO2dCQUNqRXhCLG9EQUFZQSxDQUFDekMsTUFBTTRDO2FBQ3RCO1FBQ0w7UUFFQSxNQUFNc0IsT0FBT3hCLG9EQUFZQSxDQUFDMUMsS0FBS21FLElBQUksRUFBRXZCO1FBRXJDLElBQUdzQixLQUFLakMsV0FBVyxLQUFLLFFBQ3BCLE1BQU0sSUFBSWUsTUFBTSxDQUFDLEtBQUssRUFBRWtCLEtBQUtqQyxXQUFXLENBQUMsa0NBQWtDLENBQUM7UUFFaEYsT0FBTyxJQUFJN0Msb0RBQU9BLENBQUNZLE1BQU0sQ0FBQyxhQUFhLEVBQUVBLEtBQUtpRSxPQUFPLENBQUMsQ0FBQyxFQUFFLE1BQU0sTUFBTTtZQUNqRUM7WUFDQXpCLG9EQUFZQSxDQUFDekMsTUFBTTRDO1NBQ3RCO0lBQ0w7SUFFQTVDLEtBQUtvRSxhQUFhLEdBQUc7SUFDckJwRSxLQUFLaUUsT0FBTyxHQUFHO0lBRWYsTUFBTXpDLFdBQVc7UUFDYnhCO0tBQ0g7SUFFRCxJQUFJcUUsTUFBTXJFO0lBQ1YsTUFBTyxZQUFZcUUsT0FBT0EsSUFBSUMsTUFBTSxDQUFDMUQsTUFBTSxLQUFLLEtBQUssVUFBVXlELElBQUlDLE1BQU0sQ0FBQyxFQUFFLENBQUU7UUFDMUVELE1BQU1BLElBQUlDLE1BQU0sQ0FBQyxFQUFFO1FBQ25CRCxJQUFJRCxhQUFhLEdBQUc7UUFDcEJDLElBQUlKLE9BQU8sR0FBRztRQUNkekMsU0FBU3BCLElBQUksQ0FBQ2lFO0lBQ2xCO0lBQ0EsSUFBSSxZQUFZQSxPQUFPQSxJQUFJQyxNQUFNLENBQUMxRCxNQUFNLEtBQUssR0FBSTtRQUU3Q1ksU0FBU3BCLElBQUksQ0FBQztZQUNWZ0UsZUFBZTtZQUNmSCxTQUFTO1lBQ1QxQyxNQUFTOEMsSUFBSUMsTUFBTTtZQUNuQixHQUFHTiwrQ0FBT0EsQ0FBQ0ssSUFBSUMsTUFBTSxDQUFDO1lBQ3RCLHFCQUFxQjtZQUNyQkMsUUFBWUYsSUFBSUMsTUFBTSxDQUFDLEVBQUUsQ0FBQ0MsTUFBTSxHQUFHO1lBQ25DQyxZQUFZeEUsS0FBS3dFLFVBQVU7UUFDL0I7SUFDSjtJQUVBLE1BQU1DLFVBQVUsSUFBSXJGLG9EQUFPQSxDQUFDWSxNQUFNLHdCQUF3QixNQUFNLE1BQU07V0FDM0R3QixTQUFTb0MsR0FBRyxDQUFFQyxDQUFBQSxJQUFLbkIsb0RBQVlBLENBQUNtQixHQUFHakI7S0FDekM7SUFFTCxJQUFJLElBQUkxQixJQUFJLEdBQUdBLElBQUl1RCxRQUFRakQsUUFBUSxDQUFDWixNQUFNLEdBQUMsR0FBRyxFQUFFTSxFQUFHO1FBQy9DLE1BQU13RCxLQUFLRCxRQUFRakQsUUFBUSxDQUFDTixFQUFFLENBQUNNLFFBQVE7UUFDdkNpRCxRQUFRakQsUUFBUSxDQUFDTixFQUFFLENBQUN5RCxNQUFNLENBQUNqRCxHQUFHLEdBQUdnRCxFQUFFLENBQUNBLEdBQUc5RCxNQUFNLEdBQUMsRUFBRSxDQUFDK0QsTUFBTSxDQUFDakQsR0FBRztJQUMvRDtJQUVBLE9BQU8rQztBQUNYO0FBRUE5QixRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRDRCO0FBR3BDLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLO0lBQ1QsSUFBSSxJQUFJdUIsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ00sUUFBUSxDQUFDWixNQUFNLEVBQUUsRUFBRU0sRUFDdkN2QixNQUFNVyw0Q0FBSUEsQ0FBQyxJQUFJLENBQUNrQixRQUFRLENBQUNOLEVBQUUsRUFBRXJCO0lBQ2pDLE9BQU9GO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVG9GO0FBQzFDO0FBRTNCLFNBQVNnRCxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkQsTUFBTXBCLFdBQVc7UUFDYjtZQUNJNEMsZUFBZTtZQUNmLEdBQUdwRSxJQUFJO1FBQ1g7UUFDQTtZQUNJb0UsZUFBZTtZQUNmLEdBQUdKLCtDQUFPQSxDQUFDaEUsS0FBSzRFLFFBQVEsQ0FBQztZQUN6QkEsVUFBVTVFLEtBQUs0RSxRQUFRO1FBQzNCO0tBQ0g7SUFFRCxNQUFNSCxVQUFVLElBQUlyRixvREFBT0EsQ0FBQ1ksTUFBTSx5QkFBeUIsTUFBTSxNQUFNO1dBQ2hFd0IsU0FBU29DLEdBQUcsQ0FBRUMsQ0FBQUEsSUFBS25CLG9EQUFZQSxDQUFDbUIsR0FBR2pCO0tBQ3pDO0lBRUQsYUFBYTtJQUNiNkIsUUFBUWpELFFBQVEsQ0FBQyxFQUFFLENBQUNtRCxNQUFNLENBQUNqRCxHQUFHLEdBQUcrQyxRQUFRakQsUUFBUSxDQUFDLEVBQUUsQ0FBQ21ELE1BQU0sQ0FBQ3JELEtBQUs7SUFFakUsT0FBT21EO0FBQ1g7QUFFQTlCLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQzNCNEI7QUFHcEMsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELElBQUlGLEtBQUtXLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQ2UsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTNCO0lBQ3hERixNQUFLWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWLFFBQVE7SUFDM0JGLE1BQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDVSxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ2pDVixNQUFLd0IsK0NBQU9BLENBQUMsSUFBSSxFQUFFdEIsUUFBUSxHQUFHO0lBQzlCRixNQUFLWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWO0lBQ25CRixNQUFLVyw0Q0FBSUEsQ0FBQyxLQUFLVDtJQUNuQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1oyRTtBQUNqQztBQUUzQixTQUFTZ0QsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRSxNQUFNQSxLQUFLOEMsSUFBSSxFQUFFO1FBQzVESixvREFBWUEsQ0FBQzFDLEtBQUtHLElBQUksRUFBRXlDO1FBQ3hCSCxvREFBWUEsQ0FBQ3pDLE1BQU00QztLQUN0QjtBQUNMO0FBRUFELFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0QjtBQUdwQyxTQUFTekQsT0FBc0JLLE1BQWU7SUFFekQsSUFBSUYsS0FBS1csNENBQUlBLENBQUMscUJBQXFCVDtJQUNuQ0YsTUFBS1ksK0NBQU9BLENBQUMsSUFBSSxFQUFFVixRQUFRO0lBQzNCRixNQUFLVyw0Q0FBSUEsQ0FBQyxzREFBc0RUO0lBQ2hFRixNQUFLWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWLFFBQVE7SUFDM0JGLE1BQUtXLDRDQUFJQSxDQUFDLGdDQUFnQ1Q7SUFDMUNGLE1BQUtZLCtDQUFPQSxDQUFDLElBQUksRUFBRVYsUUFBUTtJQUMzQkYsTUFBS1csNENBQUlBLENBQUMscUNBQXFDVDtJQUMzQyxRQUFRO0lBQ1JGLE1BQUtZLCtDQUFPQSxDQUFDLElBQUksRUFBRVYsUUFBUTtJQUMzQkYsTUFBTVcsNENBQUlBLENBQUMsa0RBQWtEVDtJQUNqRUYsTUFBS1ksK0NBQU9BLENBQUMsSUFBSSxFQUFFVixRQUFRO0lBRTNCRixNQUFLWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWLFFBQVE7SUFDM0IsS0FBSSxJQUFJZ0YsV0FBVyxJQUFJLENBQUNyRCxRQUFRLENBQzVCN0IsTUFBS1csNENBQUlBLENBQUN1RSxTQUFTaEY7SUFFdkJGLE1BQUtXLDRDQUFJQSxDQUFDLDJCQUEyQlQsU0FBUyxTQUFTO0lBRXZERixNQUFLWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWLFFBQVE7SUFDM0JGLE1BQUtXLDRDQUFJQSxDQUFDLEtBQUtUO0lBQ2YsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQjJFO0FBQ2pDO0FBRTNCLFNBQVNnRCxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkQsT0FBTyxJQUFJeEQsb0RBQU9BLENBQUNZLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLE1BQU0sTUFDdERBLEtBQUs0RSxRQUFRLENBQUNoQixHQUFHLENBQUUsQ0FBQ2tCLElBQVVwQyxvREFBWUEsQ0FBQ29DLEdBQUdsQztBQUV0RDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0x2QixTQUFTOEIsYUFBYUMsS0FBZTtJQUNuQyxPQUFPQSxNQUFNQyxNQUFNLENBQUVqRSxDQUFBQSxJQUFLQSxFQUFFb0IsUUFBUSxDQUFDLGNBQWUsa0JBQWtCO0FBQ3hFO0FBR0EsU0FBUzhDLDZCQUE2QmpGLEtBQWdCLEVBQUVILElBQVksRUFBRUMsR0FBVztJQUUvRSxJQUFJLElBQUltQixJQUFJLEdBQUdBLElBQUlqQixNQUFNVyxNQUFNLEVBQUUsRUFBRU0sRUFBRztRQUVsQyxJQUFJakIsS0FBSyxDQUFDaUIsRUFBRSxDQUFDTyxNQUFNLENBQUVILEtBQUssQ0FBQ3hCLElBQUksR0FBR0EsUUFDL0JHLEtBQUssQ0FBQ2lCLEVBQUUsQ0FBQ08sTUFBTSxDQUFFSCxLQUFLLENBQUN4QixJQUFJLEtBQUtBLFFBQVFHLEtBQUssQ0FBQ2lCLEVBQUUsQ0FBQ08sTUFBTSxDQUFFSCxLQUFLLENBQUN2QixHQUFHLEdBQUdBLEtBQ3BFLE9BQU87UUFFWCxJQUFPRSxLQUFLLENBQUNpQixFQUFFLENBQUNPLE1BQU0sQ0FBRUMsR0FBRyxDQUFDNUIsSUFBSSxHQUFHQSxRQUM1QkcsS0FBSyxDQUFDaUIsRUFBRSxDQUFDTyxNQUFNLENBQUVDLEdBQUcsQ0FBQzVCLElBQUksS0FBS0EsUUFBUUcsS0FBSyxDQUFDaUIsRUFBRSxDQUFDTyxNQUFNLENBQUVDLEdBQUcsQ0FBQzNCLEdBQUcsR0FBR0EsS0FDdEU7WUFDRSxJQUFJQyxPQUFPa0YsNkJBQTZCakYsS0FBSyxDQUFDaUIsRUFBRSxDQUFDTSxRQUFRLEVBQUUxQixNQUFNQztZQUNqRSxJQUFJQyxTQUFTLE1BQ1QsT0FBT0E7WUFDWCxPQUFPQyxLQUFLLENBQUNpQixFQUFFO1FBQ25CO0lBQ0o7SUFFQSxPQUFPLE1BQU0sb0NBQW9DO0FBQ25EO0FBRU8sU0FBU2lFLGtCQUFrQkMsU0FBb0IsRUFBRUMsRUFBWTtJQUNsRSxNQUFNNUYsTUFBTTRGLEdBQUdDLFNBQVMsQ0FBQztJQUN6QixPQUFPSiw2QkFBNkJ6RixJQUFJUSxLQUFLLEVBQUVtRixTQUFTLENBQUMsRUFBRSxFQUFFQSxTQUFTLENBQUMsRUFBRTtBQUMzRTtBQUlBLGVBQWU7QUFDUixTQUFTRyxlQUFlUCxLQUFrQixFQUFFSyxFQUFZO0lBQzdELE9BQU9MLE1BQU1wQixHQUFHLENBQUU1QyxDQUFBQSxJQUFLbUUsa0JBQWtCbkUsR0FBR3FFO0FBQzlDO0FBRUEsbUJBQW1CO0FBQ1osU0FBU0csWUFBWVIsS0FBVSxFQUFFSyxFQUFZO0lBSWhETCxRQUFRQSxNQUFNUyxLQUFLLENBQUM7SUFFcEIsTUFBTUMsT0FBT1YsS0FBSyxDQUFDLEVBQUUsS0FBSTtJQUV6QixPQUFPRCxhQUFhQyxPQUFPcEIsR0FBRyxDQUFFK0IsQ0FBQUE7UUFFOUIsSUFBSSxDQUFDQyxHQUFHQyxPQUFPQyxLQUFLLEdBQUdILEVBQUVGLEtBQUssQ0FBQztRQUUvQixJQUFJSyxJQUFJLENBQUNBLEtBQUtsRixNQUFNLEdBQUMsRUFBRSxLQUFLLEtBQzFCa0YsT0FBT0EsS0FBS0MsS0FBSyxDQUFDLEdBQUUsQ0FBQztRQUV2QixJQUFJakcsT0FBTyxDQUFDK0YsUUFBUTtRQUNwQixJQUFJOUYsTUFBTyxDQUFDK0Y7UUFFWixFQUFFL0YsS0FBSyxjQUFjO1FBRXJCLElBQUlpRztRQUNKLElBQUlOLE1BQU87WUFDVCxJQUFJTyxNQUFNTCxFQUFFTSxPQUFPLENBQUMsS0FBSztZQUN6QkYsV0FBV0osRUFBRUcsS0FBSyxDQUFDLEdBQUdFO1lBQ3RCLElBQUlELGFBQWEsUUFDZkEsV0FBVztZQUViLHlCQUF5QjtZQUN6QixNQUFNdkcsTUFBTTRGLEdBQUdDLFNBQVMsQ0FBQztZQUN6QixNQUFNdEYsT0FBT2tGLDZCQUE2QnpGLElBQUlRLEtBQUssRUFBRUgsTUFBTUM7WUFDM0QsSUFBR0MsS0FBS0csSUFBSSxLQUFLLFVBQ2ZKLE9BQU9DLEtBQUtLLEtBQUssQ0FBQ08sTUFBTSxFQUFFLG1FQUFtRTtRQUVqRyxPQUFPO1lBQ0wsSUFBSXFGLE1BQU1MLEVBQUVNLE9BQU8sQ0FBQztZQUNwQkYsV0FBV0osRUFBRUcsS0FBSyxDQUFDLEdBQUdFO1lBQ3RCLElBQUlELGFBQWEsYUFDZkEsV0FBVztRQUNmO1FBRUEsT0FBTztZQUFDQTtZQUFVbEc7WUFBTUM7U0FBSTtJQUM5QjtBQUNKO0FBRUEsU0FBU29HLHNCQUFzQkMsR0FBaUIsRUFBRWYsRUFBWTtJQUUxRGdCLFFBQVFDLElBQUksQ0FBQyxhQUFhRjtJQUUxQixNQUFNcEIsUUFBUVEsWUFBYSxJQUFhZSxTQUFTLENBQUN2QixLQUFLLEVBQUVLO0lBQ3pELE1BQU1wRixRQUFRc0YsZUFBZVAsT0FBT0s7SUFDcEMsd0JBQXdCO0lBQ3hCLE1BQU1tQixZQUFZeEIsTUFBTXBCLEdBQUcsQ0FBRSxDQUFDK0IsR0FBRXpFLElBQU0sQ0FBQyxvQkFBb0IsRUFBRWpCLEtBQUssQ0FBQ2lCLEVBQUUsQ0FBQ3lELE1BQU0sQ0FBQ3JELEtBQUssQ0FBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUVrRixLQUFLLENBQUM5RCxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUcsSUFBSXVGLGdCQUNSLENBQUM7RUFDQyxFQUFFRCxVQUFVaEcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQztJQUViNkYsUUFBUUssR0FBRyxDQUFDRDtBQUNoQjtBQUVBLGlFQUFlO0lBQ1hOO0FBQ0osQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNHd0M7QUFFTjtBQUVyQixTQUFTM0csT0FBc0JLLE1BQWU7SUFFekQsTUFBTTBCLE9BQU8sSUFBSWhDLDhDQUFJQSxDQUFDLElBQUk7SUFFMUIsT0FBT2UsNENBQUlBLENBQUNHLHlDQUFDLENBQUMsR0FBRyxFQUFFYyxLQUFLLENBQUMsRUFBRTFCO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7OztBQ1QyRTtBQUNqQztBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxNQUFNLE1BQU07UUFDckR5QyxvREFBWUEsQ0FBQ3pDLE1BQU00QztLQUN0QjtBQUNMO0FBRUFELFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZtQjtBQUczQixTQUFTekQsT0FBc0JLLE1BQWU7SUFFekQsSUFBSUYsS0FBS1csNENBQUlBLENBQUNHLHlDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQ2UsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTNCO0lBQzdDRixNQUFNd0IsK0NBQU9BLENBQUMsSUFBSSxFQUFFdEIsUUFBUTtJQUU1QixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1QyRTtBQUNqQztBQUUzQixTQUFTZ0QsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLHNCQUFzQixNQUFNLE1BQU07UUFDdkQwQyxvREFBWUEsQ0FBQzFDLEtBQUttRSxJQUFJLEVBQUV2QjtRQUN4Qkgsb0RBQVlBLENBQUN6QyxNQUFNNEM7S0FDdEI7QUFDTDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYVTtBQUdsQixTQUFTekQsT0FBc0JLLE1BQWU7SUFFekQsa0JBQWtCO0lBQ2xCLElBQUksSUFBSSxDQUFDUSxLQUFLLEtBQUssTUFDZixPQUFPQyw0Q0FBSUEsQ0FBQyxJQUFJLENBQUNELEtBQUssQ0FBQ3NHLFFBQVEsQ0FBQ0MsZUFBZSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUNwRixRQUFRLENBQUN1RSxLQUFLLENBQUMsS0FBS2xHO0lBR3RGLElBQUlGLEtBQUs7SUFDVCxJQUFJLElBQUksQ0FBQzZCLFFBQVEsQ0FBQyxFQUFFLENBQUNTLFdBQVcsRUFBRTRFLFdBQVcsV0FDekNsSCxNQUFLVyw0Q0FBSUEsQ0FBQyxRQUFRVDtJQUV0QkYsTUFBTVcsNENBQUlBLENBQUNHLHlDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNlLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUzQjtJQUVwQyxvQkFBb0I7SUFDcEIsSUFBSSxJQUFJcUIsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ00sUUFBUSxDQUFDWixNQUFNLEVBQUUsRUFBRU0sRUFBRztRQUUxQyxJQUFJQSxNQUFNLEdBQ052QixNQUFNVyw0Q0FBSUEsQ0FBQyxNQUFNVDtRQUVyQkYsTUFBTVcsNENBQUlBLENBQUMsSUFBSSxDQUFDa0IsUUFBUSxDQUFDTixFQUFFLEVBQUVyQjtJQUNqQztJQUVBRixNQUFNVyw0Q0FBSUEsQ0FBQyxLQUFLVDtJQUVoQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QitDO0FBQ0w7QUFDRTtBQUU3QixTQUFTZ0QsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE1BQU1FLE9BQU85QyxLQUFLMkQsSUFBSSxDQUFDSixFQUFFO0lBQ3pCLElBQU13RCxXQUFXO0lBRWpCLGVBQWU7SUFDZixNQUFNQyxRQUFRRiwwREFBVUEsQ0FBQzlHLEtBQUsyRCxJQUFJLENBQUNKLEVBQUUsR0FBRyxTQUFTO0lBQ2pELElBQUl5RCxVQUFVQyxXQUNWRixXQUFXQyxNQUFNTCxRQUFRLENBQUNPLFdBQVc7U0FDcEM7UUFDRCx1QkFBdUI7UUFFdkIsTUFBTUMsV0FBV0wsMERBQVVBLENBQUVsRSxRQUFRQyxlQUFlLENBQUNDLEtBQUs7UUFDMURpRSxXQUFXSSxTQUFTQyxRQUFRLENBQUNGLFdBQVc7SUFDNUM7SUFFQSx3Q0FBd0M7SUFDeEMsZUFBZTtJQUNmLE9BQU8sSUFBSTlILG9EQUFPQSxDQUFDWSxNQUFNLGtCQUFrQitHLFVBQVVDLE9BQU87UUFDeER0RSxvREFBWUEsQ0FBQzFDLEtBQUsyRCxJQUFJLEVBQUVmO1dBQ3JCNUMsS0FBS1csSUFBSSxDQUFDaUQsR0FBRyxDQUFFLENBQUM1QyxJQUFVMEIsb0RBQVlBLENBQUMxQixHQUFHNEI7S0FDaEQ7QUFDTDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QnFDO0FBRzdDLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLO0lBQ1QsSUFBSSxDQUFFLElBQUksQ0FBQ1EsSUFBSSxDQUFDa0gsUUFBUSxDQUFDLFdBQ3JCMUgsTUFBTVcsNENBQUlBLENBQUMsYUFBYVQ7SUFDNUJGLE1BQU1XLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUMsQ0FBQyxFQUFFUjtJQUU3QkYsTUFBTWdDLCtDQUFPQSxDQUFDLElBQUksRUFBRTlCO0lBQ3BCRixNQUFNVyw0Q0FBSUEsQ0FBQyxLQUFLVDtJQUNoQkYsTUFBTXdCLCtDQUFPQSxDQUFDLElBQUksRUFBRXRCLFFBQVEsR0FBRztJQUUvQixNQUFNMEIsT0FBTyxJQUFJLENBQUNDLFFBQVEsQ0FBQyxFQUFFLENBQUNBLFFBQVE7SUFDdEMsSUFBSUQsSUFBSSxDQUFDQSxLQUFLWCxNQUFNLEdBQUcsRUFBRSxDQUFDVCxJQUFJLEtBQUssbUJBQW9CO1FBQ25EUixNQUFNWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWLFFBQVE7UUFDNUJGLE1BQU07SUFDVjtJQUVBQSxNQUFNWSwrQ0FBT0EsQ0FBQyxJQUFJLEVBQUVWLFFBQVEsS0FBS1MsNENBQUlBLENBQUMsS0FBS1Q7SUFFM0MsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkI2RDtBQUNuQjtBQUNHO0FBRTlCLFNBQVNnRCxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkR5RCxRQUFRQyxJQUFJLENBQUN0RztJQUNiLE1BQU1XLE9BQU8yRyxvREFBWUEsQ0FBQ3RILE1BQU00QztJQUdoQyxNQUFNNEUsV0FBVzVFLFFBQVF6QyxJQUFJLEtBQUs7SUFDbEMsSUFBSXNILGtCQUFrQixTQUFTLFNBQVM7SUFFeEMsSUFBSSxDQUFFRCxVQUFXO1FBRWJDLGtCQUFrQnpILEtBQUswSCxPQUFPLEVBQUVuRTtRQUVoQyxJQUFJa0Usb0JBQW9CUixXQUFZO1lBRWhDLHNCQUFzQjtZQUN0QixJQUFJUyxVQUFVMUgsS0FBS3VCLElBQUksQ0FBQzBELE1BQU0sQ0FBRSxDQUFDcEIsSUFBVUEsRUFBRUosV0FBVyxDQUFDQyxLQUFLLEtBQUs7WUFFbkUsSUFBSWdFLFFBQVE5RyxNQUFNLEtBQUssR0FDbkI2RyxrQkFBa0I7UUFDdEIsZ0JBQWdCO1FBQ3BCO1FBRUEsSUFBSUEsb0JBQW9CUixXQUFZO1lBRWhDLE1BQU1VLFlBQVksQ0FBQyxNQUFNLEVBQUVGLGdCQUFnQixDQUFDO1lBRzVDN0UsUUFBUUMsZUFBZSxDQUFDN0MsS0FBSzhDLElBQUksQ0FBQyxHQUFHNkU7WUFDckNKLHVEQUFXLENBQUNJLFVBQVUsR0FBRztnQkFDckJQLFVBQVU7b0JBQ05GLGFBQWEsSUFBTU87b0JBQ25CRyxpQkFBaUIsSUFBTSxHQUFHLG9CQUFvQjtnQkFDbEQ7WUFDSjtRQUNKO0lBQ0o7SUFFQSwrQ0FBK0M7SUFDL0MsSUFBSUMsY0FBY2pGO0lBQ2xCQSxVQUFVLElBQUlKLDJDQUFPQSxDQUFDLE9BQU9JO0lBQzdCLE1BQU1yQixPQUFPa0Isb0RBQVlBLENBQUN6QyxNQUFNNEM7SUFFaEMsYUFBYTtJQUNiLElBQUk2RSxvQkFBb0JSLFdBQVk7UUFDaEMscUJBQXFCO1FBQ3JCLElBQUlhLE1BQU12RyxLQUFLQyxRQUFRLENBQUN5RCxNQUFNLENBQUVwQixDQUFBQSxJQUFLQSxFQUFFMUQsSUFBSSxLQUFLO1FBRWhEc0gsa0JBQWtCSyxHQUFHLENBQUMsRUFBRSxDQUFDN0YsV0FBVztRQUVwQyxNQUFNMEYsWUFBWSxDQUFDLE1BQU0sRUFBRUYsZ0JBQWdCLENBQUM7UUFFeEMsNkNBQTZDO1FBQzdDN0UsUUFBWUMsZUFBZSxDQUFDN0MsS0FBSzhDLElBQUksQ0FBQyxHQUFHNkU7UUFDekNFLFlBQVloRixlQUFlLENBQUM3QyxLQUFLOEMsSUFBSSxDQUFDLEdBQUc2RTtRQUN6Q0osdURBQVcsQ0FBQ0ksVUFBVSxHQUFHO1lBQ3JCUCxVQUFVO2dCQUNORixhQUFhLElBQU1PO2dCQUNuQkcsaUJBQWlCLElBQU0sR0FBRyxvQkFBb0I7WUFDbEQ7UUFDSjtJQUNSO0lBRUEsS0FBSSxJQUFJRyxPQUFPcEgsS0FBS2EsUUFBUSxDQUN4Qm9CLFFBQVFDLGVBQWUsQ0FBQ2tGLElBQUkxSCxLQUFLLENBQUMsR0FBRzBILElBQUk5RixXQUFXO0lBRXhELElBQUk5QixPQUFPO0lBQ1gsSUFBR3FILFVBQ0NySCxRQUFRO0lBRVosT0FBTyxJQUFJZixvREFBT0EsQ0FBQ1ksTUFBTUcsTUFBTSxNQUFNSCxLQUFLOEMsSUFBSSxFQUFFO1FBQzVDbkM7UUFDQVk7S0FDSDtBQUNMO0FBRUFvQixRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRlU7QUFHbEIsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELE9BQU9TLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUNlLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUzQjtBQUNwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOK0M7QUFDTDtBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLFVBQVUsTUFBTSxNQUFNO1FBQzNDMEMsb0RBQVlBLENBQUMxQyxLQUFLbUUsSUFBSSxFQUFFdkI7S0FDM0I7QUFDTDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQ1Z2QixTQUFTK0UsT0FBTzlELElBQWE7SUFDekIsSUFBSUEsTUFDQTtJQUVKLE1BQU0sSUFBSWxCLE1BQU07QUFDcEI7QUFHQSxpRUFBZTtJQUNYZ0Y7QUFDSixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWK0I7QUFHbEIsU0FBU3hJLE9BQXNCSyxNQUFlO0lBRXpELElBQUksSUFBSSxDQUFDUSxLQUFLLENBQUMsRUFBRSxLQUFLNEcsV0FDbEIsT0FBTzNHLDRDQUFJQSxDQUFDLElBQUksQ0FBQ0QsS0FBSyxDQUFDLEVBQUUsRUFBRVI7SUFFL0IsT0FBT1MsNENBQUlBLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDQSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRVI7QUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSMEM7QUFFM0IsU0FBUzhDLFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxPQUFPLElBQUl4RCxvREFBT0EsQ0FBQ1ksTUFBTSx5QkFBeUIsTUFBTTtRQUFDQSxLQUFLOEMsSUFBSTtRQUFFOUMsS0FBS2lJLE1BQU07S0FBQztBQUNwRjtBQUVBdEYsUUFBUU0sWUFBWSxHQUFHO0lBQUM7Q0FBUTs7Ozs7Ozs7Ozs7Ozs7OztBQ1JDO0FBR2xCLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLO0lBRVRBLE1BQU1XLDRDQUFJQSxDQUFDLFdBQVdUO0lBQ3RCLElBQUksSUFBSXFCLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNNLFFBQVEsQ0FBQ1osTUFBTSxFQUFFLEVBQUVNLEVBQUc7UUFDMUMsSUFBSUEsTUFBTSxHQUNOdkIsTUFBTVcsNENBQUlBLENBQUMsTUFBTVQ7UUFDckJGLE1BQU1XLDRDQUFJQSxDQUFFLElBQUksQ0FBQ2tCLFFBQVEsQ0FBQ04sRUFBRSxFQUFFckI7SUFDbEM7SUFDQUYsTUFBTVcsNENBQUlBLENBQUMsUUFBUVQ7SUFFbkIsSUFBRyxJQUFJLENBQUNRLEtBQUssS0FBSyxNQUNkVixNQUFNVyw0Q0FBSUEsQ0FBQyw2QkFBNkJUO1NBRXhDRixNQUFNVyw0Q0FBSUEsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFUjtJQUUxRCxPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCK0M7QUFDTDtBQUUzQixTQUFTZ0QsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLG1CQUFtQixNQUFNQSxLQUFLa0ksTUFBTSxFQUN6RGxJLEtBQUttSSxLQUFLLENBQUN2RSxHQUFHLENBQUUsQ0FBQ0MsSUFBVW5CLG9EQUFZQSxDQUFDbUIsR0FBR2pCO0FBRW5EO0FBRUFELFFBQVFNLFlBQVksR0FBRztJQUFDO0lBQVU7Q0FBYTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZkO0FBR2xCLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxPQUFPUyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUNlLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUzQjtBQUNuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOK0M7QUFDTDtBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBR3ZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLGtCQUFrQixNQUFNLE1BQU07UUFDbkQwQyxvREFBWUEsQ0FBQzFDLEtBQUtvSSxHQUFHLEVBQUV4RjtLQUMxQjtBQUNMO0FBRUFELFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hoQixNQUFNb0Ysb0JBQW9CckY7SUFFcEJzRixpQkFBc0I7SUFFL0I3RSxZQUFZNkUsZ0JBQXFCLENBQUU7UUFDL0IsS0FBSztRQUNMQSxpQkFBaUIvQixTQUFTLEdBQUcsSUFBSTtRQUNqQyxJQUFJLENBQUMrQixnQkFBZ0IsR0FBR0E7SUFDNUI7QUFDSjtBQUdBLGlFQUFlO0lBQ1hEO0FBQ0osQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RpRDtBQUNKO0FBQ1c7QUFDSjtBQUNHO0FBQ0o7QUFDSTtBQUNKO0FBQ0Y7QUFDSjtBQUNFO0FBQ0o7QUFDZTtBQUNKO0FBQ007QUFDSjtBQUNJO0FBQ0o7QUFDRztBQUNKO0FBQ0M7QUFDRTtBQUNKO0FBQ0U7QUFDSjtBQUNVO0FBQ0o7QUFDSDtBQUNKO0FBQ0s7QUFDSjtBQUNJO0FBQ0o7QUFDTTtBQUNKO0FBQ087QUFDSjtBQUNtQjtBQUNKO0FBQ2Y7QUFDSjtBQUNJO0FBQ0o7QUFDSztBQUNKO0FBQ0M7QUFDSTtBQUNKO0FBQ1U7QUFDSjtBQUNGO0FBQ0o7QUFDQztBQUNDO0FBQ0o7QUFDSztBQUNKO0FBQ1E7QUFDSjtBQUNPO0FBQ0o7QUFDQztBQUNPO0FBQ0o7QUFDVztBQUNKO0FBQ0Q7QUFDSjtBQUNIO0FBQ0o7QUFDQTtBQUNKO0FBQ0o7QUFDSjtBQUNVO0FBQ0o7QUFHeEQsTUFBTThFLFVBQVU7SUFDZixVQUFVO1FBQ1RDLGFBQWE3RSw2REFBYUE7UUFDckI4RSxRQUFhN0UseURBQVFBO0lBQzNCO0lBQ0EsaUJBQWlCO1FBQ2hCNEUsYUFBYTNFLG9FQUFhQTtRQUNyQjRFLFFBQWEzRSxnRUFBUUE7SUFDM0I7SUFDQSxnQkFBZ0I7UUFDZjBFLGFBQWF6RSxtRUFBYUE7UUFDckIwRSxRQUFhekUsK0RBQVFBO0lBQzNCO0lBQ0EsZ0JBQWdCO1FBQ2Z3RSxhQUFhdkUsbUVBQWFBO1FBQ3JCd0UsUUFBYXZFLCtEQUFRQTtJQUMzQjtJQUNBLFVBQVU7UUFDVHNFLGFBQWFyRSw2REFBYUE7UUFDckJzRSxRQUFhckUseURBQVFBO0lBQzNCO0lBQ0EsUUFBUTtRQUNQb0UsYUFBYW5FLDREQUFhQTtRQUNyQm9FLFFBQWFuRSx3REFBUUE7SUFDM0I7SUFDQSxtQkFBbUI7UUFDbEJrRSxhQUFhakUsdUVBQWFBO1FBQ3JCa0UsUUFBYWpFLG1FQUFRQTtJQUMzQjtJQUNBLHFCQUFxQjtRQUNwQmdFLGFBQWEvRCx5RUFBYUE7UUFDckJnRSxRQUFhL0QscUVBQVFBO0lBQzNCO0lBQ0EscUJBQXFCO1FBQ3BCOEQsYUFBYTdELHlFQUFhQTtRQUNyQjhELFFBQWE3RCxxRUFBUUE7SUFDM0I7SUFDQSxvQkFBb0I7UUFDbkI0RCxhQUFhM0Qsd0VBQWFBO1FBQ3JCNEQsUUFBYTNELG9FQUFRQTtJQUMzQjtJQUNBLGtCQUFrQjtRQUNqQjBELGFBQWF4RCxzRUFBY0E7UUFDdEJ5RCxRQUFheEQsa0VBQVNBO0lBQzVCO0lBQ0EsZ0JBQWdCO1FBQ2Z1RCxhQUFhdEQsaUVBQWNBO1FBQ3RCdUQsUUFBYXRELDZEQUFTQTtJQUM1QjtJQUNBLHNCQUFzQjtRQUNyQnFELGFBQWFwRCwwRUFBY0E7UUFDdEJxRCxRQUFhcEQsc0VBQVNBO0lBQzVCO0lBQ0EsZUFBZTtRQUNkbUQsYUFBYWxELGlFQUFjQTtRQUN0Qm1ELFFBQWFsRCw2REFBU0E7SUFDNUI7SUFDQSxnQkFBZ0I7UUFDZmlELGFBQWFoRCxvRUFBY0E7UUFDdEJpRCxRQUFhaEQsZ0VBQVNBO0lBQzVCO0lBQ0EsZ0JBQWdCO1FBQ2YrQyxhQUFhOUMsb0VBQWNBO1FBQ3RCK0MsUUFBYTlDLGdFQUFTQTtJQUM1QjtJQUNBLGtCQUFrQjtRQUNqQjZDLGFBQWE1QyxzRUFBY0E7UUFDdEI2QyxRQUFhNUMsa0VBQVNBO0lBQzVCO0lBQ0EscUJBQXFCO1FBQ3BCMkMsYUFBYTFDLHlFQUFjQTtRQUN0QjJDLFFBQWExQyxxRUFBU0E7SUFDNUI7SUFDQSxvQ0FBb0M7UUFDbkN5QyxhQUFheEMsd0ZBQWNBO1FBQ3RCeUMsUUFBYXhDLG9GQUFTQTtJQUM1QjtJQUNBLGlCQUFpQjtRQUNoQnVDLGFBQWF0QyxxRUFBY0E7UUFDdEJ1QyxRQUFhdEMsaUVBQVNBO0lBQzVCO0lBQ0EsaUJBQWlCO1FBQ2hCcUMsYUFBYXBDLHFFQUFjQTtRQUN0QnFDLFFBQWFwQyxpRUFBU0E7SUFDNUI7SUFDQSxrQkFBa0I7UUFDakJtQyxhQUFhbEMsc0VBQWNBO1FBQ3RCbUMsUUFBYWxDLGtFQUFTQTtJQUM1QjtJQUNBLG1CQUFtQjtRQUNsQmlDLGFBQWEvQix1RUFBY0E7UUFDdEJnQyxRQUFhL0IsbUVBQVNBO0lBQzVCO0lBQ0EseUJBQXlCO1FBQ3hCOEIsYUFBYTdCLDZFQUFjQTtRQUN0QjhCLFFBQWE3Qix5RUFBU0E7SUFDNUI7SUFDQSxtQkFBbUI7UUFDbEI0QixhQUFhM0IsdUVBQWNBO1FBQ3RCNEIsUUFBYTNCLG1FQUFTQTtJQUM1QjtJQUNBLGlCQUFpQjtRQUNoQjBCLGFBQWF4QixxRUFBY0E7UUFDdEJ5QixRQUFheEIsaUVBQVNBO0lBQzVCO0lBQ0Esa0JBQWtCO1FBQ2pCdUIsYUFBYXRCLHNFQUFjQTtRQUN0QnVCLFFBQWF0QixrRUFBU0E7SUFDNUI7SUFDQSxzQkFBc0I7UUFDckJxQixhQUFhcEIsMEVBQWNBO1FBQ3RCcUIsUUFBYXBCLHNFQUFTQTtJQUM1QjtJQUNBLHlCQUF5QjtRQUN4Qm1CLGFBQWFsQiw2RUFBY0E7UUFDdEJtQixRQUFhbEIseUVBQVNBO0lBQzVCO0lBQ0EsNkJBQTZCO1FBQzVCaUIsYUFBYWYsaUZBQWNBO1FBQ3RCZ0IsUUFBYWYsNkVBQVNBO0lBQzVCO0lBQ0Esb0NBQW9DO1FBQ25DYyxhQUFhYix3RkFBY0E7UUFDdEJjLFFBQWFiLG9GQUFTQTtJQUM1QjtJQUNBLCtCQUErQjtRQUM5QlksYUFBYVgsbUZBQWNBO1FBQ3RCWSxRQUFhWCwrRUFBU0E7SUFDNUI7SUFDQSx3QkFBd0I7UUFDdkJVLGFBQWFULDRFQUFjQTtRQUN0QlUsUUFBYVQsd0VBQVNBO0lBQzVCO0lBQ0Esb0JBQW9CO1FBQ25CUSxhQUFhUCx3RUFBY0E7UUFDdEJRLFFBQWFQLG9FQUFTQTtJQUM1QjtJQUNBLFlBQVk7UUFDWE0sYUFBYUwsZ0VBQWNBO1FBQ3RCTSxRQUFhTCw0REFBU0E7SUFDNUI7SUFDQSxrQkFBa0I7UUFDakJJLGFBQWFILHNFQUFjQTtRQUN0QkksUUFBYUgsa0VBQVNBO0lBQzVCO0FBQ0Q7QUFFQSxpRUFBZUMsT0FBT0EsRUFBQztBQUd2QixNQUFNRyxVQUFVLENBQUM7QUFDakJ6TSxPQUFPME0sTUFBTSxDQUFDRCxTQUFTM0QscUVBQVNBO0FBQ2hDOUksT0FBTzBNLE1BQU0sQ0FBQ0QsU0FBU2xDLG1FQUFVQTtBQUNqQ3ZLLE9BQU8wTSxNQUFNLENBQUNELFNBQVMzQixvRUFBVUE7QUFDakM5SyxPQUFPME0sTUFBTSxDQUFDRCxTQUFTbEIsMEVBQVVBO0FBRzFCLE1BQU1vQixNQUFNRixRQUFROzs7Ozs7Ozs7Ozs7Ozs7O0FDM09NO0FBR2xCLFNBQVM5TixPQUFxQkssTUFBZTtJQUN4RCxPQUFPUyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ0osS0FBSyxDQUFDLENBQUMsRUFBRVI7QUFDbEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKMEM7QUFFM0IsU0FBUzhDLFFBQVEzQyxJQUFTLEVBQUVtRCxRQUFpQjtJQUV4RCxJQUFJLENBQUcsUUFBT25ELEtBQUtLLEtBQUssS0FBSyxRQUFPLEtBQ3pCLENBQUUsZ0JBQWVMLEtBQUtLLEtBQUssS0FDM0JMLEtBQUtLLEtBQUssQ0FBQ29OLFNBQVMsQ0FBQ0MsWUFBWSxLQUFLLFlBQzdDO0lBRUosT0FBTyxJQUFJdE8sb0RBQU9BLENBQUNZLE1BQU0saUJBQWlCLFlBQVk7QUFDMUQ7QUFFQTJDLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0FDWHZCLE1BQU0wSyxhQUFhLENBQ25CO0FBRUEsaUVBQWVBLFVBQVVBLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMTztBQUdsQixTQUFTbk8sT0FBc0JLLE1BQWU7SUFFekQsT0FBT1MsNENBQUlBLENBQUNHLHlDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNKLEtBQUssQ0FBQyxDQUFDLEVBQUVSO0FBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7O0FDTDBDO0FBRTNCLFNBQVM4QyxRQUFRM0MsSUFBUyxFQUFFbUQsUUFBaUI7SUFFeEQsSUFBSSxPQUFPbkQsS0FBS0ssS0FBSyxLQUFLLFdBQ3RCO0lBRUosT0FBTyxJQUFJakIsb0RBQU9BLENBQUNZLE1BQU0saUJBQWlCLFFBQVFBLEtBQUtLLEtBQUs7QUFDaEU7QUFFQXNDLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1gwQztBQUdqRSxNQUFNNkssYUFBYTtJQUVmLEdBQUdELGtFQUFTQSxDQUFHRCxnRUFBV0EsRUFDdEI7UUFBQztRQUFTO1FBQVE7UUFBTztLQUFRLENBQUM7QUFFMUM7QUFFQSxpRUFBZUUsVUFBVUEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZPO0FBR2xCLFNBQVN0TyxPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLVyw0Q0FBSUEsQ0FBQyxNQUFNVDtJQUNoQkYsTUFBS1csNENBQUlBLENBQUMsSUFBSSxDQUFDa0IsUUFBUSxDQUFDLEVBQUUsRUFBRTNCO0lBQzVCRixNQUFLVyw0Q0FBSUEsQ0FBQyxLQUFLVDtJQUNuQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1QrQztBQUNMO0FBRTNCLFNBQVNnRCxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkQsT0FBTyxJQUFJeEQsb0RBQU9BLENBQUNZLE1BQU0sb0NBQW9DLE1BQU0sTUFBTTtRQUNyRTBDLG9EQUFZQSxDQUFDMUMsS0FBS0ssS0FBSyxFQUFFdUM7S0FDNUI7QUFDTDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWVTtBQUdsQixTQUFTekQsT0FBc0JLLE1BQWU7SUFFekQsSUFBSUYsS0FBS1csNENBQUlBLENBQUMsS0FBS1Q7SUFFbkIsS0FBSSxJQUFJa08sU0FBUyxJQUFJLENBQUN2TSxRQUFRLENBQUU7UUFFNUIsSUFBSXVNLE1BQU05TCxXQUFXLEtBQUssT0FBTztZQUU3QixPQUFPO1lBQ1A4TCxNQUFNdE0sTUFBTSxHQUFHO2dCQUNYSCxPQUFPO29CQUFDLEdBQUd6QixNQUFNO2dCQUFBO2dCQUNqQjZCLEtBQUs7WUFDVDtZQUNBL0IsTUFBTVcsNENBQUlBLENBQUN5TixNQUFNMU4sS0FBSyxFQUFFUjtZQUN4QmtPLE1BQU10TSxNQUFNLENBQUNDLEdBQUcsR0FBRztnQkFBQyxHQUFHN0IsTUFBTTtZQUFBO1FBRWpDLE9BQU8sSUFBR2tPLE1BQU01TixJQUFJLEtBQUssb0NBQW9DO1lBQ3pEUixNQUFNVyw0Q0FBSUEsQ0FBQ3lOLE9BQU9sTztRQUN0QixPQUNJLE1BQU0sSUFBSW1ELE1BQU07SUFDeEI7SUFFQXJELE1BQU1XLDRDQUFJQSxDQUFDLEtBQUtUO0lBRWhCLE9BQU9GO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUIrQztBQUNMO0FBRTNCLFNBQVNnRCxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkQsT0FBTyxJQUFJeEQsb0RBQU9BLENBQUNZLE1BQU0scUJBQXFCLE1BQU0sTUFBTTtXQUNuREEsS0FBS2dPLE1BQU0sQ0FBQ3BLLEdBQUcsQ0FBRSxDQUFDNUMsSUFBVTBCLG9EQUFZQSxDQUFDMUIsR0FBRzRCO0tBQ2xEO0FBQ0w7QUFFQUQsUUFBUU0sWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDVlU7QUFHbEIsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELE9BQU9TLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUMsQ0FBQyxFQUFFUjtBQUNsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0wwQztBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRW1ELFFBQWlCO0lBRXhELElBQUksQ0FBR25ELENBQUFBLEtBQUtLLEtBQUssWUFBWVEsTUFBSyxLQUFNYixLQUFLSyxLQUFLLENBQUNvTixTQUFTLEVBQUVDLGlCQUFpQixTQUMzRTtJQUVKLE9BQU8sSUFBSXRPLG9EQUFPQSxDQUFDWSxNQUFNLGtCQUFrQixTQUFTQSxLQUFLSyxLQUFLLENBQUNBLEtBQUs7QUFDeEU7QUFFQXNDLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYSTtBQUNpRTtBQUc1RixNQUFNa0wsY0FBYztJQUNoQixHQUFHRixxRUFBWUEsQ0FBQyxTQUNBO1FBQUM7UUFBTTtRQUFLO1FBQUs7UUFBSztLQUFJLEVBQzFCO1FBQUM7UUFBUztRQUFPO1FBQVM7S0FBTyxFQUNqQztRQUNJRyxlQUFlO1lBQUMsT0FBTztRQUFPO0lBQ2xDLEVBQ2Y7SUFDRCxHQUFHSCxxRUFBWUEsQ0FBQyxTQUNaO1FBQUM7S0FBSyxFQUNOO1FBQUM7UUFBUztRQUFPO1FBQVM7S0FBTyxFQUNqQztRQUNJRyxlQUFlO1lBQUMsT0FBTztRQUFPO1FBQzlCeEgsaUJBQWdCNUcsSUFBSSxFQUFFcU8sSUFBSSxFQUFFQyxLQUFLO1lBQzdCLE9BQU83Tix5Q0FBQyxDQUFDLG1CQUFtQixFQUFFNE4sS0FBSyxFQUFFLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO1FBQ25EO0lBQ0osRUFDSDtJQUNELEdBQUdMLHFFQUFZQSxDQUFDLFNBQ1o7UUFBQztLQUFJLEVBQ0w7UUFBQztRQUFTO1FBQU87UUFBUztLQUFPLEVBQ2pDO1FBQ0lHLGVBQWU7WUFBQyxPQUFPO1FBQU87UUFDOUJ4SCxpQkFBZ0I1RyxJQUFJLEVBQUVxTyxJQUFJLEVBQUVDLEtBQUs7WUFDN0IsT0FBTzdOLHlDQUFDLENBQUMsY0FBYyxFQUFFNE4sS0FBSyxFQUFFLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDO0lBQ0osRUFDSDtJQUNELEdBQUdKLG9FQUFXQSxDQUFDLFNBQVM7UUFBQztLQUFNLENBQUM7SUFDaEMsR0FBR0wsa0VBQVNBLENBQUdELGdFQUFXQSxFQUNYO1FBQUM7UUFBUztRQUFRO1FBQU87S0FBUSxDQUFDO0FBQ3JEO0FBRUEsaUVBQWVPLFdBQVdBLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ007QUFHbEIsU0FBUzNPLE9BQXNCSyxNQUFlO0lBRXpELElBQUkwTyxTQUFTO0lBQ2IsSUFBSWpMLFNBQVMsSUFBSyxDQUFTa0wsRUFBRTtJQUU3QixJQUFJbk8sUUFBUSxJQUFJLENBQUNBLEtBQUs7SUFFdEIsSUFBR2lELFdBQVcsU0FBUztRQUNuQixJQUFJLElBQUksQ0FBQ3JCLFdBQVcsS0FBSyxPQUNyQjVCLFFBQVFvTyxPQUFPcE8sUUFBUSw0QkFBNEI7SUFDM0QsT0FDSyxJQUFJaUQsV0FBVyxTQUFTLElBQUksQ0FBQ3JCLFdBQVcsS0FBSyxPQUM5QyxnRUFBZ0U7SUFDaEVzTSxTQUFTO0lBRWIsd0NBQXdDO0lBQ3hDLE9BQU9qTyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxFQUFFSixNQUFNLEVBQUVrTyxPQUFPLENBQUMsRUFBRTFPO0FBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkIwQztBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRW1ELFFBQWlCO0lBRXhELElBQUk5QyxRQUFRTCxLQUFLSyxLQUFLO0lBRXRCLElBQUdBLE1BQU1vTixTQUFTLEVBQUVDLGlCQUFpQixPQUNqQ3JOLFFBQVFBLE1BQU1BLEtBQUs7SUFFdkIsSUFBSSxPQUFPQSxVQUFVLFlBQVksT0FBT0EsVUFBVSxVQUM5QztJQUVKLE1BQU1xTyxZQUFZLE9BQU9yTyxVQUFVLFdBQVcsUUFBUTtJQUV0RCxPQUFPLElBQUlqQixvREFBT0EsQ0FBQ1ksTUFBTSxnQkFBZ0IwTyxXQUFXck87QUFDeEQ7QUFFQXNDLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJJO0FBRStHO0FBRTlGO0FBRTVDLE1BQU02TCxZQUFZO0lBRWRuSSxVQUFVO1FBQ05PLGFBQWEsSUFBTTtRQUNuQk4saUJBQWlCLENBQUM1RyxNQUFNc087WUFDcEIsTUFBTVMsU0FBU2pJLDBEQUFVQSxDQUFDd0gsTUFBTXJNLFdBQVcsR0FBRytNO1lBQzlDLElBQUlELFdBQVc5SCxXQUNYLE1BQU0sSUFBSWpFLE1BQU0sQ0FBQyxFQUFFc0wsTUFBTXJNLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztZQUM5RCxPQUFPOE0sT0FBT25JLGVBQWUsQ0FBQzVHLE1BQU1zTztRQUN4QztJQUNKO0lBQ0FVLFNBQVM7UUFDTDlILGFBQWEsSUFBTTtRQUNuQk4saUJBQWdCNUcsSUFBSSxFQUFFcU8sSUFBSTtZQUN0QixPQUFPTSxnRUFBT0EsQ0FBQzNPLE1BQU1xTztRQUN6QjtJQUNKO0lBQ0EsR0FBRyxHQUNILEdBQUdKLHFFQUFZQSxDQUFDLE9BQ1o7UUFDSSx3REFBd0Q7UUFDeEQ7UUFBTTtRQUFLO1FBQ1g7UUFBSztRQUFLO1FBQUs7UUFBTTtLQUN4QixFQUNEO1FBQUM7UUFBTztLQUFRLEVBQ2hCO1FBQ0lHLGVBQWU7WUFBQyxTQUFTO1FBQUs7SUFDbEMsRUFDSDtJQUNELEdBQUdILHFFQUFZQSxDQUFDLE9BQU87UUFBQztLQUFJLEVBQUU7UUFBQztLQUFNLEVBQ2pDO1FBQ0lySCxpQkFBZ0I1RyxJQUFJLEVBQUVpUCxDQUFDLEVBQUVDLENBQUM7WUFDdEIsTUFBTUMsT0FBTyxLQUFjWCxFQUFFLEtBQUs7WUFFbEMsSUFBSVcsTUFBTztnQkFDUCx1Q0FBdUM7Z0JBQ3ZDLE9BQU85UCxvRUFBV0EsQ0FBQ1csTUFBTTRPLG1FQUFVQSxDQUFDSyxJQUFJLEtBQUtMLG1FQUFVQSxDQUFDTTtZQUM1RDtZQUVBLE9BQU83UCxvRUFBV0EsQ0FBQ1csTUFBTWlQLEdBQUcsS0FBS0M7UUFDckM7SUFDSixFQUNIO0lBQ0QsR0FBR2pCLHFFQUFZQSxDQUFDLFNBQVM7UUFBQztLQUFJLEVBQUU7UUFBQztRQUFPO1FBQVM7S0FBUSxFQUNyRDtRQUNJbUIsY0FBZSxDQUFDbk8sSUFBTTJOLG1FQUFVQSxDQUFDM04sR0FBRztRQUNwQ21OLGVBQWU7WUFBQyxPQUFPO1FBQU87SUFDbEMsRUFDSDtJQUNELEdBQUdILHFFQUFZQSxDQUFDLE9BQU87UUFBQztLQUFLLEVBQUU7UUFBQztRQUFPO0tBQVEsRUFDM0M7UUFDSUcsZUFBZTtZQUFDLFNBQVM7UUFBSztRQUM5QnhILGlCQUFpQixDQUFDNUcsTUFBZXFPLE1BQWVDO1lBQzVDLE9BQU83Tix5Q0FBQyxDQUFDLGlCQUFpQixFQUFFNE4sS0FBSyxFQUFFLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pEO0lBQ0osRUFDSDtJQUNELEdBQUdMLHFFQUFZQSxDQUFDLE9BQU87UUFBQztLQUFJLEVBQUU7UUFBQztRQUFPO0tBQVEsRUFDMUM7UUFDSUcsZUFBZTtZQUFDLFNBQVM7UUFBSztRQUM5QnhILGlCQUFpQixDQUFDNUcsTUFBZXFPLE1BQWVDO1lBQzVDLG1CQUFtQjtZQUNuQixPQUFPN04seUNBQUMsQ0FBQyxZQUFZLEVBQUU0TixLQUFLLEVBQUUsRUFBRUMsTUFBTSxDQUFDLENBQUM7UUFDNUM7SUFDSixFQUNIO0lBRUQsR0FBR0osb0VBQVdBLENBQUMsT0FDWDtRQUFDO0tBQU0sRUFDUDtRQUNJdEgsaUJBQWlCLENBQUM1RyxNQUFNaVA7WUFDcEIsTUFBTUUsT0FBTyxLQUFjWCxFQUFFLEtBQUs7WUFFbEMsSUFBSVcsTUFBTztnQkFDUCxPQUFPTixtRUFBVUEsQ0FBQzdPLE1BQU0sS0FBSzRPLG1FQUFVQSxDQUFDSztZQUM1QztZQUVBLE9BQU9KLG1FQUFVQSxDQUFDN08sTUFBTSxLQUFLaVA7UUFDakM7SUFDSixFQUNIO0lBQ0QsR0FBR2Ysb0VBQVdBLENBQUMsT0FDWDtRQUFDO0tBQUksQ0FDUjtJQUNELEdBQUdMLGtFQUFTQSxDQUFHRCxnRUFBV0EsRUFDWDtRQUFDO1FBQVM7UUFBTztRQUFTO0tBQU8sQ0FBRTtBQUV0RDtBQUVBLGlFQUFla0IsU0FBU0EsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkU7QUFFa0g7QUFHN0ksTUFBTU8sY0FBYztJQUVoQixHQUFHcEIscUVBQVlBLENBQUMsT0FDWixnRUFBZ0U7SUFDaEU7UUFDSTtRQUFNO1FBQUs7UUFDWDtRQUFLO1FBQUs7UUFBSztRQUFNLEtBQUsscUNBQXFDO0tBQ2xFLEVBQ0Q7UUFBQztRQUFPO0tBQVEsRUFDaEI7UUFDSW1CLGNBQWUsQ0FBQ2YsT0FBUy9PLG1FQUFVQSxDQUFDK087UUFDcENELGVBQWU7WUFBQyxTQUFTO1FBQUs7SUFDbEMsRUFDSDtJQUNELEdBQUdILHFFQUFZQSxDQUFDLE9BQU87UUFBQztLQUFJLEVBQUU7UUFBQztRQUFPO0tBQVEsRUFDMUM7UUFDSXJILGlCQUFpQixDQUFDNUcsTUFBTWlQLEdBQUdDO1lBQ3ZCLE1BQU1DLE9BQU8sS0FBY1gsRUFBRSxLQUFLO1lBRWxDLElBQUlXLE1BQU87Z0JBQ1AsdUNBQXVDO2dCQUN2QyxPQUFPOVAsb0VBQVdBLENBQUNXLE1BQU00TyxtRUFBVUEsQ0FBQ0ssSUFBSSxLQUFLTCxtRUFBVUEsQ0FBQ007WUFDNUQ7WUFFQSxPQUFPN1Asb0VBQVdBLENBQUNXLE1BQU1WLG1FQUFVQSxDQUFDMlAsSUFBSSxLQUFLM1AsbUVBQVVBLENBQUM0UDtRQUM1RDtJQUNKLEVBQ0g7SUFDRCxHQUFHakIscUVBQVlBLENBQUMsU0FBUztRQUFDO0tBQUksRUFBRTtRQUFDO1FBQU87UUFBUztLQUFRLEVBQ3JEO1FBQ0lHLGVBQWU7WUFBQyxPQUFPO1FBQU87SUFDbEMsRUFDSDtJQUNELEdBQUdILHFFQUFZQSxDQUFDLFNBQVM7UUFBQztLQUFLLEVBQUU7UUFBQztLQUFRLEVBQ3RDO1FBQ0lySCxpQkFBaUIsQ0FBQzVHLE1BQWVxTyxNQUFlQztZQUM1QyxPQUFPN04seUNBQUMsQ0FBQyxtQkFBbUIsRUFBRTROLEtBQUssRUFBRSxFQUFFQyxNQUFNLENBQUMsQ0FBQztRQUNuRDtJQUNKLEVBQ0g7SUFDRCxHQUFHTCxxRUFBWUEsQ0FBQyxTQUFTO1FBQUM7S0FBSSxFQUFFO1FBQUM7S0FBUSxFQUNyQztRQUNJckgsaUJBQWlCLENBQUM1RyxNQUFlcU8sTUFBZUM7WUFDNUMsbUJBQW1CO1lBQ25CLE9BQU83Tix5Q0FBQyxDQUFDLFlBQVksRUFBRTROLEtBQUssRUFBRSxFQUFFQyxNQUFNLENBQUMsQ0FBQztRQUM1QztJQUNKLEVBQ0g7SUFFRCxHQUFHSixvRUFBV0EsQ0FBQyxTQUNYO1FBQUM7S0FBTSxFQUNQO1FBQ0l0SCxpQkFBaUIsQ0FBQzVHLE1BQU1pUDtZQUNwQixNQUFNRSxPQUFPLEtBQWNYLEVBQUUsS0FBSztZQUVsQyxJQUFJVyxNQUFPO2dCQUNQLE9BQU9OLG1FQUFVQSxDQUFDN08sTUFBTSxLQUFLVixtRUFBVUEsQ0FBQzJQO1lBQzVDO1lBRUEsT0FBT0osbUVBQVVBLENBQUM3TyxNQUFNLEtBQUtpUDtRQUNqQztJQUNKLEVBQ0g7SUFDRCxHQUFHZixvRUFBV0EsQ0FBQyxPQUNYO1FBQUM7S0FBSSxFQUNMO1FBQ0lrQixjQUFlLENBQUNmLE9BQVMvTyxtRUFBVUEsQ0FBQytPO0lBQ3hDLEVBQ0g7SUFDRCxHQUFHUixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQ1g7UUFBQztRQUFTO1FBQU87UUFBUztLQUFPLENBQUU7QUFRdEQ7QUFFQSxpRUFBZXlCLFdBQVdBLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRk07QUFHbEIsU0FBUzdQLE9BQXNCSyxNQUFlO0lBQ3pELElBQUksSUFBSSxDQUFDUSxLQUFLLENBQUMsRUFBRSxLQUFLLEtBQ2xCLE9BQU9DLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUMsQ0FBQyxFQUFFUjtJQUNsQyxPQUFPUyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUVSO0FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjBDO0FBRTNCLFNBQVM4QyxRQUFRM0MsSUFBUyxFQUFFbUQsUUFBaUI7SUFFeEQsSUFBSSxPQUFPbkQsS0FBS0ssS0FBSyxLQUFLLFVBQ3RCO0lBRUosT0FBTyxJQUFJakIsb0RBQU9BLENBQUNZLE1BQU0sZ0JBQWdCLE9BQU9BLEtBQUtLLEtBQUs7QUFDOUQ7QUFFQXNDLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYSTtBQUVtRDtBQUc5RSxNQUFNcU0sWUFBWTtJQUVkLEdBQUd6QixrRUFBU0EsQ0FBR0QsZ0VBQVdBLEVBQ3RCO1FBQUM7S0FBTSxDQUFDO0lBQ1osR0FBR0sscUVBQVlBLENBQUMsT0FBTztRQUFDO0tBQUksRUFBRTtRQUFDO0tBQU0sQ0FBQztJQUN0QyxHQUFHQSxxRUFBWUEsQ0FBQyxPQUFPO1FBQUM7S0FBSSxFQUFFO1FBQUM7UUFBTztLQUFRLEVBQzFDO1FBQ0lHLGVBQWlCO1lBQUMsT0FBTztRQUFPO1FBQ2hDeEgsaUJBQWlCLENBQUM1RyxNQUFlaVAsR0FBWUM7WUFFekMsSUFBSUQsRUFBRWhOLFdBQVcsS0FBSyxPQUNsQixDQUFDZ04sR0FBRUMsRUFBRSxHQUFHO2dCQUFDQTtnQkFBRUQ7YUFBRTtZQUVqQixPQUFPeE8seUNBQUMsQ0FBQyxFQUFFd08sRUFBRSxRQUFRLEVBQUVDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CO0lBQ0osRUFBRTtBQUNWO0FBRUEsaUVBQWVJLFNBQVNBLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJRO0FBRW9CO0FBRXRDLFNBQVM5UCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLO0lBQ1QsSUFBSSxJQUFJLENBQUNRLElBQUksQ0FBQ2tILFFBQVEsQ0FBQyxXQUNuQjFILE1BQU1XLDRDQUFJQSxDQUFDLFFBQVFUO0lBRXZCRixNQUFNVyw0Q0FBSUEsQ0FBQyxJQUFJLENBQUNrQixRQUFRLENBQUMsRUFBRSxFQUFFM0I7SUFDN0IsSUFBSSxJQUFJcUIsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ00sUUFBUSxDQUFDWixNQUFNLEdBQUcsR0FBRyxFQUFFTSxFQUMzQ3ZCLE1BQU1XLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUNlLFFBQVEsQ0FBQ04sRUFBRSxDQUFDLENBQUMsRUFBRXJCO0lBRTFDLElBQUkwUCxhQUFrQixJQUFJLENBQUMvTixRQUFRLENBQUMsSUFBSSxDQUFDQSxRQUFRLENBQUNaLE1BQU0sR0FBQyxFQUFFO0lBRTNELElBQUkyTyxXQUFXdE4sV0FBVyxLQUFLLFdBQVcsSUFBSSxDQUFDQSxXQUFXLEtBQUssT0FDM0RzTixhQUFhalEsbUVBQVVBLENBQUNpUTtJQUU1QjVQLE1BQU1XLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLEdBQUcsRUFBRThPLFdBQVcsQ0FBQyxFQUFFMVA7SUFFaEMsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QitDO0FBQ0w7QUFFM0IsU0FBU2dELFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxJQUFJekMsT0FBTztJQUVYLE1BQU1xUCxRQUFROU0sb0RBQVlBLENBQUMxQyxLQUFLSyxLQUFLLEVBQUV1QztJQUN2QyxJQUFJNk0sYUFBMEJELE1BQU12TixXQUFXO0lBRS9DLElBQUlBLGNBQWNqQyxNQUFNMFAsWUFBWW5NO0lBRXBDLElBQUl0QixnQkFBZ0JnRixhQUFhaEYsZ0JBQWdCd04sWUFBYTtRQUN0RHBKLFFBQVFDLElBQUksQ0FBQztJQUNyQjtJQUNBLElBQUlyRSxnQkFBZ0JnRixXQUFZO1FBQzVCaEYsY0FBY3dOO1FBQ2QsSUFBSUEsZUFBZSxTQUNmeE4sY0FBYyxPQUFPLG1CQUFtQjtJQUN4Qyx5QkFBeUI7SUFDakM7SUFFQSxNQUFNME4sZ0JBQWdCLGFBQWEzUDtJQUNuQyxNQUFNNFAsVUFBVUQsZ0JBQWdCM1AsS0FBSzRQLE9BQU8sR0FBRztRQUFDNVAsS0FBS3NELE1BQU07S0FBQztJQUU1RCxNQUFNdU0sUUFBUUQsUUFBUWhNLEdBQUcsQ0FBRSxDQUFDQztRQUV4QixNQUFNaU0sT0FBUXBOLG9EQUFZQSxDQUFDbUIsR0FBR2pCO1FBRTlCLDZCQUE2QjtRQUM3QixJQUFJa04sS0FBSzNQLElBQUksS0FBSyxVQUFVO1lBRXhCLDBCQUEwQjtZQUMxQixJQUFJMlAsS0FBS3pQLEtBQUssSUFBSXVDLFFBQVFDLGVBQWUsRUFBRTtnQkFDdkMsTUFBTWtOLFlBQVluTixRQUFRQyxlQUFlLENBQUNpTixLQUFLelAsS0FBSyxDQUFDO2dCQUNyRCxJQUFJMFAsY0FBYyxRQUFRTixlQUFlTSxXQUNyQzFKLFFBQVFDLElBQUksQ0FBQztZQUVqQixrQkFBa0I7WUFDdEIsT0FBTyxJQUFJMUQsUUFBUXpDLElBQUksS0FBSyxTQUFTO2dCQUNqQ3lDLFFBQVFDLGVBQWUsQ0FBQ2lOLEtBQUt6UCxLQUFLLENBQUMsR0FBRzRCO2dCQUN0QzlCLFFBQVE7WUFDWjtRQUNKO1FBRUEsT0FBTzJQO0lBQ1g7SUFFQSxPQUFPLElBQUkxUSxvREFBT0EsQ0FBQ1ksTUFBTUcsTUFBTThCLGFBQWEsTUFDeEM7V0FDTzROO1FBQ0hMO0tBQ0g7QUFFVDtBQUVBN00sUUFBUU0sWUFBWSxHQUFHO0lBQUM7SUFBVTtDQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERoQjtBQUUrQztBQUN2QjtBQUNWO0FBRTdCLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJaVEsT0FBUSxJQUFJLENBQUN0TyxRQUFRLENBQUMsRUFBRTtJQUM1QixJQUFJZ08sUUFBUSxJQUFJLENBQUNoTyxRQUFRLENBQUMsRUFBRTtJQUU1QixJQUFJME8sS0FBS0Ysb0VBQWUsQ0FBQyxJQUFJLENBQUMzUCxLQUFLLENBQUM7SUFFcEMsSUFBSUYsT0FBTzhQLGdFQUFxQkE7SUFDaEMsSUFBSWxCLFNBQVNqSSwwREFBVUEsQ0FBQ2dKLEtBQUs3TixXQUFXLEdBQWdCLENBQUNpTyxHQUFHO0lBRTVEN0osUUFBUUMsSUFBSSxDQUFDNEosSUFBSSxJQUFJLENBQUM3UCxLQUFLLEVBQUV5UCxLQUFLN04sV0FBVyxFQUFFOE0sUUFBUWpJLDBEQUFVQSxDQUFDZ0osS0FBSzdOLFdBQVc7SUFFbEYsSUFBSThNLFdBQVc5SCxXQUNYOUcsT0FBTzRPLE9BQU83SCxXQUFXLENBQUNzSSxNQUFNdk4sV0FBVztJQUUvQyxnQkFBZ0I7SUFDaEIsSUFBSTlCLFNBQVM4UCxnRUFBcUJBLEVBQUU7UUFDaEMsTUFBTSxJQUFJak4sTUFBTSxDQUFDLEVBQUV3TSxNQUFNdk4sV0FBVyxDQUFDLENBQUMsRUFBRWlPLEdBQUcsRUFBRSxFQUFFSixLQUFLN04sV0FBVyxDQUFDLGlCQUFpQixDQUFDO0lBQ2xGOzs7Ozs7Ozs7O1FBVUEsR0FDSjtJQUVBLE9BQU8zQiw0Q0FBSUEsQ0FBRXlPLE9BQU9uSSxlQUFlLENBQUMsSUFBSSxFQUFFa0osTUFBTU4sUUFBUTNQO0FBQzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QytDO0FBQ0w7QUFDZ0M7QUFFM0QsU0FBUzhDLFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RHlELFFBQVFDLElBQUksQ0FBQyxVQUFVdEc7SUFFdkIsSUFBSThQLE9BQVFwTixvREFBWUEsQ0FBQzFDLEtBQUtzRCxNQUFNLEVBQUdWO0lBQ3ZDLElBQUk0TSxRQUFROU0sb0RBQVlBLENBQUMxQyxLQUFLSyxLQUFLLEVBQUV1QztJQUVyQyxJQUFJc04sS0FBS0MsaUVBQVksQ0FBQ25RLEtBQUtrUSxFQUFFLENBQUN6TSxXQUFXLENBQUNDLEtBQUssQ0FBQztJQUVoRCxJQUFJd00sT0FBT2pKLFdBQVc7UUFDbEJaLFFBQVFDLElBQUksQ0FBQyxNQUFNdEcsS0FBS2tRLEVBQUUsQ0FBQ3pNLFdBQVcsQ0FBQ0MsS0FBSztRQUM1QyxNQUFNLElBQUlWLE1BQU07SUFDcEI7SUFFQSxPQUFPLElBQUk1RCxvREFBT0EsQ0FBQ1ksTUFBTSxvQkFBb0I4UCxLQUFLN04sV0FBVyxFQUFFaU8sSUFDM0Q7UUFDSUo7UUFDQU47S0FDSDtBQUVUO0FBRUE3TSxRQUFRTSxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJIO0FBR2xCLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxPQUFPUyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ2UsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDQSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFM0I7QUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ0w7QUFFM0IsU0FBUzhDLFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxPQUFPLElBQUl4RCxvREFBT0EsQ0FBQ1ksTUFBTSxnQkFBZ0IsTUFBTSxNQUMzQztRQUNJMEMsb0RBQVlBLENBQUMxQyxLQUFLSyxLQUFLLEVBQUV1QztRQUN6QkYsb0RBQVlBLENBQUMxQyxLQUFLK0YsS0FBSyxFQUFFbkQ7S0FDNUI7QUFFVDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7SUFBQztDQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDYkg7QUFHbEIsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELE9BQU9TLDRDQUFJQSxDQUFDRyx5Q0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDZSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUNuQixLQUFLLENBQUMsQ0FBQyxFQUFFUjtBQUN0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOK0M7QUFDTDtBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLGtCQUFrQixNQUFNQSxLQUFLb1EsSUFBSSxFQUN0RDtRQUNJMU4sb0RBQVlBLENBQUMxQyxLQUFLSyxLQUFLLEVBQUV1QztLQUM1QjtBQUVUO0FBRUFELFFBQVFNLFlBQVksR0FBRztJQUFDO0NBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWk47QUFFYztBQUU3QixTQUFTekQsT0FBc0JLLE1BQWU7SUFFekQsSUFBSWlRLE9BQVEsSUFBSSxDQUFDdE8sUUFBUSxDQUFDLEVBQUU7SUFDNUIsSUFBSWdPLFFBQVEsSUFBSSxDQUFDaE8sUUFBUSxDQUFDLEVBQUU7SUFFNUIsTUFBTXVOLFNBQVNqSSwwREFBVUEsQ0FBQ2dKLEtBQUs3TixXQUFXLENBQWMsQ0FBQyxJQUFJLENBQUM1QixLQUFLLENBQUM7SUFFcEUsT0FBT0MsNENBQUlBLENBQUV5TyxPQUFPbkksZUFBZSxDQUFDLElBQUksRUFBRWtKLE1BQU1OLFFBQVEzUDtBQUM1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaK0M7QUFDTDtBQUNZO0FBQ29CO0FBQzlCO0FBRTdCLFNBQVM4QyxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkQsSUFBSWtOLE9BQVFwTixvREFBWUEsQ0FBQzFDLEtBQUs4UCxJQUFJLEVBQUdsTjtJQUNyQyxJQUFJNE0sUUFBUTlNLG9EQUFZQSxDQUFDMUMsS0FBS3dQLEtBQUssRUFBRTVNO0lBRXJDLElBQUlzTixLQUFLQyxpRUFBWSxDQUFDblEsS0FBS2tRLEVBQUUsQ0FBQ3pNLFdBQVcsQ0FBQ0MsS0FBSyxDQUFDO0lBRWhELElBQUl3TSxPQUFPakosV0FBVztRQUNsQlosUUFBUUMsSUFBSSxDQUFDLE1BQU10RyxLQUFLa1EsRUFBRSxDQUFDek0sV0FBVyxDQUFDQyxLQUFLO1FBQzVDLE1BQU0sSUFBSVYsTUFBTTtJQUNwQjtJQUdBLElBQUk3QyxPQUFPOFAsZ0VBQXFCQTtJQUNoQyxJQUFJbEIsU0FBU2pJLDBEQUFVQSxDQUFDZ0osS0FBSzdOLFdBQVcsR0FBZ0IsQ0FBQ2lPLEdBQUc7SUFFNUQsSUFBSW5CLFdBQVc5SCxXQUNYOUcsT0FBTzRPLE9BQU83SCxXQUFXLENBQUNzSSxNQUFNdk4sV0FBVztJQUUvQyx3QkFBd0I7SUFDeEIsSUFBSTlCLFNBQVM4UCxnRUFBcUJBLEVBQUU7UUFDaENDLEtBQVNHLDBFQUFpQkEsQ0FBQ0g7UUFDM0JuQixTQUFTakksMERBQVVBLENBQUMwSSxNQUFNdk4sV0FBVyxHQUFnQixDQUFDaU8sR0FBRztRQUN6RCxJQUFJbkIsV0FBVzlILFdBQ1g5RyxPQUFTNE8sT0FBTzdILFdBQVcsQ0FBQzRJLEtBQUs3TixXQUFXO1FBRWhELElBQUk5QixTQUFTOFAsZ0VBQXFCQSxFQUM5QixNQUFNLElBQUlqTixNQUFNLENBQUMsRUFBRXdNLE1BQU12TixXQUFXLENBQUMsQ0FBQyxFQUFFaU8sR0FBRyxDQUFDLEVBQUVKLEtBQUs3TixXQUFXLENBQUMsaUJBQWlCLENBQUM7UUFFckYsQ0FBQzZOLE1BQU1OLE1BQU0sR0FBRztZQUFDQTtZQUFPTTtTQUFLO0lBQ2pDO0lBRUEsT0FBTyxJQUFJMVEsb0RBQU9BLENBQUNZLE1BQU0sb0JBQW9CRyxNQUFNK1AsSUFDL0M7UUFDSUo7UUFDQU47S0FDSDtBQUVUO0FBRUE3TSxRQUFRTSxZQUFZLEdBQUc7SUFBQztDQUFROzs7Ozs7Ozs7Ozs7Ozs7QUM5Q2hDLGlFQUFlO0lBQ1hxTixnQkFBZ0IsQ0FBQ3JCLEdBQVdDO1FBQ3hCLE9BQU9xQixLQUFLQyxLQUFLLENBQUV2QixJQUFFQztJQUN6QjtJQUNBdUIsY0FBYyxDQUFDeEIsR0FBV0M7UUFFdEIsSUFBSXdCLFNBQVN6QixJQUFFQztRQUNmLElBQUl3QixTQUFTLEtBQUt6QixJQUFFQyxNQUFNLEVBQUUsRUFDeEIsT0FBT3dCO1FBRVgsT0FBTyxFQUFFQTtJQUNiO0lBQ0FDLFdBQVcsQ0FBSTFCLEdBQVdDO1FBRXRCLE1BQU0wQixNQUFNLENBQUMzQixJQUFJQyxJQUFJQSxDQUFBQSxJQUFLQTtRQUMxQixJQUFJMEIsUUFBUSxLQUFLMUIsSUFBSSxHQUNqQixPQUFPLENBQUM7UUFDWixPQUFPMEI7SUFDWDtJQUNBQyxTQUFTLENBQUk1QixHQUFXQztRQUVwQixPQUFPLENBQUNELElBQUlDLElBQUlBLENBQUFBLElBQUtBO0lBQ3pCO0FBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QjZCO0FBRXVCO0FBRXRDLFNBQVMxUCxPQUFzQkssTUFBZTtJQUN6RCxPQUFPUyw0Q0FBSUEsQ0FBRXdRLG1FQUFVQSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUN6USxLQUFLLEtBQUssSUFBSSxDQUFDbUIsUUFBUSxHQUFJM0I7QUFDbEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ0w7QUFFMUMsTUFBTWtSLGFBQWE7SUFDZixPQUFPO0lBQ1AsTUFBTztBQUNYO0FBRWUsU0FBU3BPLFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxJQUFJcEIsV0FBV3hCLEtBQUtnTyxNQUFNLENBQUNwSyxHQUFHLENBQUVDLENBQUFBLElBQUtuQixvREFBWUEsQ0FBQ21CLEdBQUdqQjtJQUVyRCxNQUFNc04sS0FBT2EsVUFBVSxDQUFDL1EsS0FBS2tRLEVBQUUsQ0FBQ3pNLFdBQVcsQ0FBQ0MsS0FBSyxDQUFDO0lBQ2xELE1BQU12RCxPQUFPcUIsUUFBUSxDQUFDLEVBQUUsQ0FBQ1MsV0FBVztJQUVwQyxPQUFPLElBQUk3QyxvREFBT0EsQ0FBQ1ksTUFBTSxxQkFBcUJHLE1BQU0rUCxJQUFJMU87QUFDNUQ7QUFFQW1CLFFBQVFNLFlBQVksR0FBRztJQUFDO0NBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFFd0M7QUFDbkI7QUFDVjtBQUc1QyxTQUFTK04seUJBQXlCaFIsSUFBYSxFQUFFOFAsSUFBWSxFQUFFSSxFQUFVLEVBQUVWLEtBQWM7SUFFckYsSUFBSXlCLFdBQVc7SUFDZixNQUFNQyxRQUFRMUIsTUFBTXZOLFdBQVc7SUFDL0IsTUFBTWtQLFFBQVFyQixLQUFLN04sV0FBVztJQUU5QixJQUFJOUIsT0FBTzhQLGdFQUFxQkE7SUFDaEMsSUFBSWxCLFNBQVNqSSwwREFBVUEsQ0FBQ2dKLEtBQUs3TixXQUFXLEdBQUcsQ0FBQ2lPLEdBQUc7SUFDL0MsSUFBSW5CLFdBQVc5SCxXQUNYOUcsT0FBTzRPLE9BQU83SCxXQUFXLENBQUNzSSxNQUFNdk4sV0FBVztJQUUvQyxJQUFJOUIsU0FBUzhQLGdFQUFxQkEsRUFBRTtRQUVoQ0MsS0FBU0csMEVBQWlCQSxDQUFDSDtRQUMzQm5CLFNBQVNqSSwwREFBVUEsQ0FBQzBJLE1BQU12TixXQUFXLEdBQWdCLENBQUNpTyxHQUFHO1FBQ3pELElBQUluQixXQUFXOUgsV0FDWDlHLE9BQVM0TyxPQUFPN0gsV0FBVyxDQUFDNEksS0FBSzdOLFdBQVc7UUFFaEQsSUFBSTlCLFNBQVM4UCxnRUFBcUJBLEVBQUU7WUFDaEMsSUFBSUMsT0FBTyxZQUFZQSxPQUFPLFVBQzFCLE1BQU0sSUFBSWxOLE1BQU0sQ0FBQyxFQUFFbU8sTUFBTSxDQUFDLEVBQUVqQixHQUFHLENBQUMsRUFBRWdCLE1BQU0saUJBQWlCLENBQUM7WUFFOUQsTUFBTUUsT0FBT2xCLE9BQU8sV0FBVyxRQUFRO1lBRXZDLE9BQU83USxvRUFBV0EsQ0FBQ1csTUFBTThQLE1BQU1zQixNQUFNNUI7UUFDekM7UUFFQXlCLFdBQVc7UUFDWCxDQUFDbkIsTUFBTU4sTUFBTSxHQUFHO1lBQUNBO1lBQU9NO1NBQUs7SUFDakM7SUFFQSxPQUFPZixPQUFPbkksZUFBZSxDQUFDNUcsTUFBTThQLE1BQU1OLE9BQU95QjtBQUNyRDtBQUVlLFNBQVN6UixPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLO0lBRVQsSUFBSSxJQUFJdUIsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ2IsS0FBSyxDQUFDTyxNQUFNLEVBQUUsRUFBRU0sRUFBRztRQUN2QyxJQUFJQSxNQUFNLEdBQ052QixNQUFNVyw0Q0FBSUEsQ0FBQyxRQUFRVDtRQUV2QixNQUFNcVEsS0FBUSxJQUFJLENBQUM3UCxLQUFLLENBQUNhLEVBQUU7UUFDM0IsTUFBTTRPLE9BQVEsSUFBSSxDQUFDdE8sUUFBUSxDQUFDTixFQUFFO1FBQzlCLE1BQU1zTyxRQUFRLElBQUksQ0FBQ2hPLFFBQVEsQ0FBQ04sSUFBRSxFQUFFO1FBRWhDLElBQUlnUCxPQUFPLE1BQU87WUFDZHZRLE1BQU1XLDRDQUFJQSxDQUFFakIsb0VBQVdBLENBQUMsSUFBSSxFQUFFeVEsTUFBTSxPQUFPTixRQUFRM1A7WUFDbkQ7UUFDSjtRQUNBLElBQUlxUSxPQUFPLFVBQVc7WUFDbEJ2USxNQUFNVyw0Q0FBSUEsQ0FBRWpCLG9FQUFXQSxDQUFDLElBQUksRUFBRXlRLE1BQU0sT0FBT04sUUFBUTNQO1lBQ25EO1FBQ0o7UUFFQSxnQkFBZ0I7UUFFaEJGLE1BQU1XLDRDQUFJQSxDQUFFMFEseUJBQXlCLElBQUksRUFBRWxCLE1BQU1JLElBQUlWLFFBQVEzUDtJQUNqRTtJQUVBLE9BQU9GO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFK0M7QUFDTDtBQUNhO0FBRXZEOzs7QUFHQSxHQUVlLFNBQVNnRCxRQUFRM0MsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFdkQsTUFBTXlPLE1BQU1yUixLQUFLcVIsR0FBRyxDQUFDek4sR0FBRyxDQUFFLENBQUM1QztRQUN2QixNQUFNa1AsS0FBS0MsaUVBQVksQ0FBQ25QLEVBQUV5QyxXQUFXLENBQUNDLEtBQUssQ0FBQztRQUM1QyxJQUFJd00sT0FBT2pKLFdBQ1AsTUFBTSxJQUFJakUsTUFBTSxDQUFDLEVBQUVoQyxFQUFFeUMsV0FBVyxDQUFDQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDN0QsT0FBT3dNO0lBQ1g7SUFFQSxNQUFNSixPQUFTcE4sb0RBQVlBLENBQUMxQyxLQUFLOFAsSUFBSSxFQUFFbE47SUFDdkMsTUFBTTBPLFNBQVN0UixLQUFLdVIsV0FBVyxDQUFDM04sR0FBRyxDQUFFLENBQUNDLElBQVVuQixvREFBWUEsQ0FBQ21CLEdBQUdqQjtJQUVoRSxPQUFPLElBQUl4RCxvREFBT0EsQ0FBQ1ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsUUFBUXFSLEtBQ2xEO1FBQ0l2QjtXQUNHd0I7S0FDTjtBQUVUO0FBRUEzTyxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCTztBQUVtQztBQUNyQjtBQUc3QixTQUFTekQsT0FBc0JLLE1BQWU7SUFFekQsSUFBSWlRLE9BQVEsSUFBSSxDQUFDdE8sUUFBUSxDQUFDLEVBQUU7SUFDNUIsK0JBQStCO0lBRS9CLElBQUksSUFBSSxDQUFDbkIsS0FBSyxLQUFLLE9BQ2YsT0FBT0MsNENBQUlBLENBQUV1TyxtRUFBVUEsQ0FBQyxJQUFJLEVBQUUsS0FBS0QsbUVBQVVBLENBQUNrQixNQUFNLFdBQVlqUTtJQUVwRSxNQUFNa1AsU0FBU2pJLDBEQUFVQSxDQUFDZ0osS0FBSzdOLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQzVCLEtBQUssQ0FBQztJQUV2RCxPQUFPQyw0Q0FBSUEsQ0FBRXlPLE9BQU9uSSxlQUFlLENBQUMsSUFBSSxFQUFFa0osS0FBSSxTQUFTLE1BQUtqUTtBQUNoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQitDO0FBQ0w7QUFDWTtBQUNDO0FBQ1g7QUFFN0IsU0FBUzhDLFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxJQUFJa04sT0FBUXBOLG9EQUFZQSxDQUFDMUMsS0FBS3dSLE9BQU8sRUFBRzVPO0lBRXhDLElBQUlzTixLQUFLQyxpRUFBWSxDQUFDblEsS0FBS2tRLEVBQUUsQ0FBQ3pNLFdBQVcsQ0FBQ0MsS0FBSyxDQUFDO0lBRWhELElBQUl3TSxPQUFPakosV0FBVztRQUNsQlosUUFBUUMsSUFBSSxDQUFDLE1BQU10RyxLQUFLa1EsRUFBRSxDQUFDek0sV0FBVyxDQUFDQyxLQUFLO1FBQzVDLE1BQU0sSUFBSVYsTUFBTTtJQUNwQjtJQUVBLElBQUlrTixPQUFPLE9BQ1AsT0FBTyxJQUFJOVEsb0RBQU9BLENBQUNZLE1BQU0sbUJBQW1CLFFBQVEsT0FBTztRQUFFOFA7S0FBTTtJQUV2RSxJQUFJM1AsT0FBTzhQLGdFQUFxQkE7SUFDaEMsSUFBSWxCLFNBQVNqSSwwREFBVUEsQ0FBQ2dKLEtBQUs3TixXQUFXLEdBQWdCLENBQUNpTyxHQUFHO0lBRTVELElBQUluQixXQUFXOUgsV0FDWDlHLE9BQU80TyxPQUFPN0gsV0FBVztJQUU3QixJQUFJL0csU0FBUzhQLGdFQUFxQkEsRUFBRTtRQUNoQyxNQUFNLElBQUlqTixNQUFNLENBQUMsRUFBRWtOLEdBQUcsQ0FBQyxFQUFFSixLQUFLN04sV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBRTVELE1BQU0sSUFBSWUsTUFBTTtJQUNwQjtJQUVBLE9BQU8sSUFBSTVELG9EQUFPQSxDQUFDWSxNQUFNLG1CQUFtQkcsTUFBTStQLElBQUk7UUFBRUo7S0FBTTtBQUNsRTtBQUVBbk4sUUFBUU0sWUFBWSxHQUFHO0lBQUM7Q0FBVTs7Ozs7Ozs7Ozs7Ozs7OztBQ25DSjtBQUdmLFNBQVN6RCxPQUFzQkssTUFBZTtJQUN6RCxPQUFPUyw0Q0FBSUEsQ0FBQyx5QkFBeUJUO0FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSjBDO0FBRTNCLFNBQVM4QyxRQUFRM0MsSUFBUyxFQUFFbUQsUUFBaUI7SUFDeEQsT0FBTyxJQUFJL0Qsb0RBQU9BLENBQUNZLE1BQU0sUUFBUTtBQUNyQztBQUdBMkMsUUFBUU0sWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDUlU7QUFHbEIsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELElBQUksSUFBSSxDQUFDMkIsUUFBUSxDQUFDWixNQUFNLEtBQUssR0FDekIsT0FBT04sNENBQUlBLENBQUMsZUFBZVQ7SUFFL0IsT0FBT1MsNENBQUlBLENBQUNHLHlDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ2UsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUzQjtBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUK0M7QUFDTDtBQUUzQixTQUFTOEMsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELElBQUc1QyxLQUFLSyxLQUFLLEtBQUs0RyxXQUNkLE9BQU8sSUFBSTdILG9EQUFPQSxDQUFDWSxNQUFNLG1CQUFtQixRQUFRO0lBRXhELE1BQU15UixPQUFPL08sb0RBQVlBLENBQUMxQyxLQUFLSyxLQUFLLEVBQUV1QztJQUN0QyxPQUFPLElBQUl4RCxvREFBT0EsQ0FBQ1ksTUFBTSxtQkFBbUJ5UixLQUFLeFAsV0FBVyxFQUFFLE1BQU07UUFBQ3dQO0tBQUs7QUFDOUU7QUFFQTlPLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pVO0FBR2xCLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxJQUFJRixLQUFLVyw0Q0FBSUEsQ0FBQyxLQUFLVDtJQUVuQixJQUFJLElBQUlxQixJQUFJLEdBQUdBLElBQUksSUFBSSxDQUFDTSxRQUFRLENBQUNaLE1BQU0sRUFBRU0sS0FBRyxFQUFHO1FBQzNDLElBQUdBLE1BQU0sR0FDTHZCLE1BQUtXLDRDQUFJQSxDQUFDLE1BQU1UO1FBQ3BCRixNQUFNVyw0Q0FBSUEsQ0FBQ0cseUNBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQ2UsUUFBUSxDQUFDTixFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQ00sUUFBUSxDQUFDTixJQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUVyQjtJQUM5RDtJQUVJRixNQUFLVyw0Q0FBSUEsQ0FBQyxLQUFLVDtJQUVuQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCK0M7QUFDTDtBQUUzQixTQUFTZ0QsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELElBQUlwQixXQUFXLElBQUlWLE1BQU1kLEtBQUswUixJQUFJLENBQUM5USxNQUFNLEdBQUc7SUFDNUMsSUFBSSxJQUFJTSxJQUFJLEdBQUdBLElBQUlsQixLQUFLMFIsSUFBSSxDQUFDOVEsTUFBTSxFQUFFLEVBQUVNLEVBQUc7UUFDdENNLFFBQVEsQ0FBQyxJQUFFTixFQUFFLEdBQUt3QixvREFBWUEsQ0FBQzFDLEtBQU8wUixJQUFJLENBQUN4USxFQUFFLEVBQUUwQjtRQUMvQ3BCLFFBQVEsQ0FBQyxJQUFFTixJQUFFLEVBQUUsR0FBR3dCLG9EQUFZQSxDQUFDMUMsS0FBS2dPLE1BQU0sQ0FBQzlNLEVBQUUsRUFBRTBCO0lBQ25EO0lBRUEsT0FBTyxJQUFJeEQsb0RBQU9BLENBQUNZLE1BQU0sZ0JBQWdCLE1BQU0sTUFDM0N3QjtBQUVSO0FBRUFtQixRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQlU7QUFHbEIsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELElBQUlGLEtBQUtXLDRDQUFJQSxDQUFDLEtBQUtUO0lBRW5CLElBQUksSUFBSXFCLElBQUksR0FBR0EsSUFBSSxJQUFJLENBQUNNLFFBQVEsQ0FBQ1osTUFBTSxFQUFFLEVBQUVNLEVBQUc7UUFDMUMsSUFBR0EsTUFBTSxHQUNMdkIsTUFBS1csNENBQUlBLENBQUMsTUFBTVQ7UUFDcEJGLE1BQU1XLDRDQUFJQSxDQUFDLElBQUksQ0FBQ2tCLFFBQVEsQ0FBQ04sRUFBRSxFQUFFckI7SUFDakM7SUFFSUYsTUFBS1csNENBQUlBLENBQUMsS0FBS1Q7SUFFbkIsT0FBT0Y7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQitDO0FBQ0w7QUFFM0IsU0FBU2dELFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxPQUFPLElBQUl4RCxvREFBT0EsQ0FBQ1ksTUFBTSxnQkFBZ0IsTUFBTSxNQUMzQ0EsS0FBSzJSLElBQUksQ0FBQy9OLEdBQUcsQ0FBRSxDQUFDQyxJQUFXbkIsb0RBQVlBLENBQUNtQixHQUFHakI7QUFFbkQ7QUFFQUQsUUFBUU0sWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0FDVlU7QUFHbEIsU0FBU3pELE9BQXNCSyxNQUFlO0lBRXpELElBQUlGLEtBQUtXLDRDQUFJQSxDQUFDLG1CQUFtQlQ7SUFFakMsSUFBSSxJQUFJcUIsSUFBSSxHQUFHQSxJQUFJLElBQUksQ0FBQ00sUUFBUSxDQUFDWixNQUFNLEVBQUUsRUFBRU0sRUFBRztRQUMxQyxJQUFHQSxNQUFNLEdBQ0x2QixNQUFLVyw0Q0FBSUEsQ0FBQyxNQUFNVDtRQUNwQkYsTUFBTVcsNENBQUlBLENBQUMsSUFBSSxDQUFDa0IsUUFBUSxDQUFDTixFQUFFLEVBQUVyQjtJQUNqQztJQUVJRixNQUFLVyw0Q0FBSUEsQ0FBQyxNQUFNVDtJQUVwQixPQUFPRjtBQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCK0M7QUFDTDtBQUUzQixTQUFTZ0QsUUFBUTNDLElBQVMsRUFBRTRDLE9BQWdCO0lBRXZELE9BQU8sSUFBSXhELG9EQUFPQSxDQUFDWSxNQUFNLGdCQUFnQixNQUFNLE1BQzNDQSxLQUFLMlIsSUFBSSxDQUFDL04sR0FBRyxDQUFFLENBQUNDLElBQVduQixvREFBWUEsQ0FBQ21CLEdBQUdqQjtBQUVuRDtBQUVBRCxRQUFRTSxZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWTztBQUdmLFNBQVN6RCxPQUFzQkssTUFBZTtJQUV6RCxPQUFPUyw0Q0FBSUEsQ0FBQyxJQUFJLENBQUNELEtBQUssRUFBRVIsU0FBUyxNQUFNO0FBQzNDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ04yQztBQUVEO0FBRTFDLFNBQVNnUyxRQUFRak0sQ0FBVTtJQUN2QixnR0FBZ0c7SUFDaEcsT0FBTy9FLE9BQU9pUix5QkFBeUIsQ0FBQ2xNLElBQUltTSxXQUFXQyxhQUFhO0FBQ3hFO0FBRWUsU0FBU3JQLFFBQVEzQyxJQUFTLEVBQUU0QyxPQUFnQjtJQUV2RCxJQUFJWCxjQUFjO0lBQ2xCLElBQUk1QixRQUFRTCxLQUFLdUQsRUFBRTtJQUVuQixJQUFJbEQsVUFBVSxRQUNWQSxRQUFRO1NBRVAsSUFBSUEsU0FBU3VDLFFBQVFDLGVBQWUsRUFDckNaLGNBQWNXLFFBQVFDLGVBQWUsQ0FBQ3hDLE1BQU07U0FDM0MsSUFBR0EsU0FBU3VSLDJEQUFHQSxFQUFFO1FBQ2xCLElBQUlDLFFBQVFELDJEQUFHLENBQUN2UixNQUEwQixHQUN0QzRCLGNBQWMsQ0FBQyxNQUFNLEVBQUU1QixNQUFNLENBQUM7UUFFbENBLFFBQVEsQ0FBQyxJQUFJLEVBQUVBLE1BQU0sQ0FBQztJQUMxQjtJQUVELE9BQU8sSUFBSWpCLG9EQUFPQSxDQUFDWSxNQUFNLFVBQVVpQyxhQUFhNUI7QUFDbkQ7QUFHQXNDLFFBQVFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQzlCcUI7QUFFN0IsTUFBTWlQLHFCQUFxQkQsMkRBQVNBO0FBRW5ELEVBR0EsZ0JBQWdCO0NBQ1osVUFBVTtDQUNWLFdBQVc7Q0FDUCxXQUFXO0NBQ1gsd0NBQXdDO0NBQ3hDLGtCQUFrQjtDQUNsQixTQUFTO0NBQ0wsdUJBQXVCO0NBQ3ZCLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmYTtBQUV4QixNQUFNRSx1QkFBdUJELGtEQUFZQTtBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSm9DO0FBQ2dCO0FBQ0Y7QUFHbEQsTUFBTTVFLFVBQVU7SUFDZixVQUFVOEUsa0RBQVNBO0lBQ25CLGVBQWVDLGtFQUFTQTtJQUN4QixhQUFhQyxnRUFBU0E7QUFDdkI7QUFFQSxpRUFBZWhGLE9BQU9BLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1hSLE1BQU0yRTtBQUVyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBLG1DQUFtQztBQUdPO0FBRU07QUFRaEQsTUFBTU8sVUFBOEUsQ0FBQztBQUVyRixJQUFJLElBQUlDLGVBQWVGLDJEQUFZQSxDQUFFO0lBRWpDLE1BQU1ySyxTQUFTcUssMkRBQVksQ0FBQ0UsWUFBeUM7SUFFckUsSUFBSXRLLFFBQVE7UUFBQztLQUFPO0lBQ3BCLElBQUksa0JBQWtCRCxPQUFPa0YsV0FBVyxFQUFFO1FBRXRDLElBQUl0TSxNQUFNQyxPQUFPLENBQUNtSCxPQUFPa0YsV0FBVyxDQUFDbkssWUFBWSxHQUFJO1lBQ2pEa0YsUUFBUUQsT0FBT2tGLFdBQVcsQ0FBQ25LLFlBQVk7UUFDM0MsT0FBTztZQUNIa0YsUUFBUTtnQkFBQ0QsT0FBT2tGLFdBQVcsQ0FBQ25LLFlBQVk7YUFBQztRQUM3QztJQUNKO0lBRUEsS0FBSSxJQUFJSCxRQUFRcUYsTUFDWixDQUFDcUssT0FBTyxDQUFDMVAsS0FBSyxLQUFLLEVBQUUsRUFBRTFDLElBQUksQ0FBQzhIO0FBQ3BDO0FBR08sU0FBU3dLLE9BQU9DLElBQVksRUFBRS9TLFFBQWdCO0lBRWpELE1BQU1nVCxTQUFTLElBQUlDLEdBQUdDLE1BQU0sQ0FBQ0gsTUFBTS9TLFVBQVU7SUFDaEQsTUFBTW1ULE9BQU9GLEdBQUdHLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDTDtJQUNqQywyQkFBMkI7SUFDOUIsT0FBTztRQUNBM1MsT0FBT2lULFlBQVlIO1FBQ25CblQ7SUFDSjtBQUNKO0FBRUEsU0FBU3VULFlBQVlDLFlBQWlCO0lBQ2xDLE9BQU9BLGFBQWFoUCxhQUFhLElBQUlnUCxhQUFhM1AsV0FBVyxDQUFDQyxLQUFLO0FBQ3ZFO0FBRU8sU0FBU2hCLGFBQWEwUSxZQUFpQixFQUFFeFEsT0FBZ0I7SUFFNUQsSUFBSUUsT0FBT3FRLFlBQVlDO0lBRXZCLElBQUksQ0FBRXRRLENBQUFBLFFBQVEwUCxPQUFNLEdBQUs7UUFDckJuTSxRQUFRQyxJQUFJLENBQUMsMEJBQTBCeEQ7UUFDdkN1RCxRQUFRQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU4TSxhQUFhN08sTUFBTSxDQUFDLENBQUMsRUFBRTZPLGFBQWE1TyxVQUFVLENBQUMsQ0FBQztRQUNuRTZCLFFBQVFLLEdBQUcsQ0FBRTBNO1FBQ2J0USxPQUFPO0lBQ1g7SUFFQSxtREFBbUQ7SUFDbkQsS0FBSSxJQUFJb0YsVUFBVXNLLE9BQU8sQ0FBQzFQLEtBQUssQ0FBRTtRQUM3QixNQUFNNE4sU0FBU3hJLE9BQU9rRixXQUFXLENBQUNnRyxjQUFjeFE7UUFDaEQsSUFBRzhOLFdBQVd6SixXQUFXO1lBQ3JCeUosT0FBT3BRLElBQUksR0FBRzRILE9BQU9tRixNQUFNO1lBQzNCLE9BQU9xRDtRQUNYO0lBQ0o7SUFFQXJLLFFBQVFnTixLQUFLLENBQUNEO0lBQ2QsTUFBTSxJQUFJcFEsTUFBTSxDQUFDLGlCQUFpQixFQUFFRixLQUFLLElBQUksRUFBRXNRLGFBQWE3TyxNQUFNLENBQUMsQ0FBQyxFQUFFNk8sYUFBYTVPLFVBQVUsQ0FBQyxDQUFDO0FBQ25HO0FBRUEsMkJBQTJCO0FBQ3BCLFNBQVMvQixhQUFhekMsSUFBUyxFQUFFNEMsT0FBZ0I7SUFFcEQsTUFBTTBRLFFBQVF0VCxLQUFLdUIsSUFBSSxDQUFDcUMsR0FBRyxDQUFFLENBQUMyUCxJQUFVQyxhQUFhRCxHQUFHM1E7SUFDeEQsTUFBTWIsT0FBTy9CLEtBQUt1QixJQUFJLENBQUN2QixLQUFLdUIsSUFBSSxDQUFDWCxNQUFNLEdBQUMsRUFBRTtJQUUxQyxNQUFNNlMsWUFBWTtRQUNkbFAsUUFBWXZFLEtBQUt1QixJQUFJLENBQUMsRUFBRSxDQUFDZ0QsTUFBTTtRQUMvQkMsWUFBWXhFLEtBQUt1QixJQUFJLENBQUMsRUFBRSxDQUFDaUQsVUFBVTtRQUVuQ2tQLFlBQWdCM1IsS0FBSzJSLFVBQVU7UUFDL0JDLGdCQUFnQjVSLEtBQUs0UixjQUFjO0lBQ3ZDO0lBRUEsT0FBTyxJQUFJdlUscURBQU9BLENBQUNxVSxXQUFXLFFBQVEsTUFBTSxNQUFNSDtBQUN0RDtBQUNBLDJCQUEyQjtBQUNwQixTQUFTaE0sYUFBYXRILElBQVMsRUFBRTRDLE9BQWdCO0lBRXBELFFBQVE7SUFDUixJQUFJaEIsUUFBUTtXQUFJNUIsS0FBS1csSUFBSSxDQUFDaVQsV0FBVztXQUFLNVQsS0FBS1csSUFBSSxDQUFDQSxJQUFJO0tBQUM7SUFDekQsTUFBTWtULFdBQVc7V0FBSTdULEtBQUtXLElBQUksQ0FBQ2tULFFBQVE7S0FBQztJQUV4QyxJQUFJQyxhQUFhO0lBQ2pCLElBQUk5VCxLQUFLVyxJQUFJLENBQUNvVCxNQUFNLEtBQUs5TSxXQUFXO1FBQ2hDNk0sYUFBYWxTLE1BQU1oQixNQUFNO1FBQ3pCZ0IsTUFBU3hCLElBQUksQ0FBRUosS0FBS1csSUFBSSxDQUFDb1QsTUFBTTtRQUMvQkYsU0FBU3pULElBQUksQ0FBRTZHO0lBQ25CO0lBQ0FyRixNQUFNeEIsSUFBSSxJQUFJSixLQUFLVyxJQUFJLENBQUNxVCxVQUFVO0lBQ2xDSCxTQUFTelQsSUFBSSxJQUFLSixLQUFLVyxJQUFJLENBQUNzVCxXQUFXO0lBRXZDLE1BQU1DLFlBQVlsVSxLQUFLVyxJQUFJLENBQUN3VCxLQUFLLEtBQUtsTjtJQUN0QyxJQUFJaU4sV0FBWTtRQUNadFMsTUFBTXhCLElBQUksQ0FBRUosS0FBS1csSUFBSSxDQUFDd1QsS0FBSztRQUMzQk4sU0FBU3pULElBQUksQ0FBQzZHO0lBQ2xCO0lBRUFaLFFBQVFDLElBQUksQ0FBQzFFO0lBQ2IsSUFBSWdCLFFBQVF6QyxJQUFJLEtBQUssU0FDakJ5QixRQUFRQSxNQUFNbUUsS0FBSyxDQUFDO0lBRXhCLE1BQU1wRixPQUFPLElBQUlHLE1BQWVjLE1BQU1oQixNQUFNO0lBQzVDLE1BQU13VCxVQUFXeFMsTUFBTWhCLE1BQU0sR0FBR2lULFNBQVNqVCxNQUFNO0lBQy9DLElBQUksSUFBSU0sSUFBSSxHQUFHQSxJQUFJVSxNQUFNaEIsTUFBTSxFQUFFLEVBQUVNLEVBQUc7UUFDbEMsSUFBSW1ULFdBQVc7UUFDZixJQUFJblQsSUFBSWxCLEtBQUtXLElBQUksQ0FBQ2lULFdBQVcsQ0FBQ2hULE1BQU0sRUFDaEN5VCxXQUFXO1FBQ2YsSUFBSW5ULEtBQUtVLE1BQU1oQixNQUFNLEdBQUdaLEtBQUtXLElBQUksQ0FBQ3FULFVBQVUsQ0FBQ3BULE1BQU0sR0FBR3NULFdBQ2xERyxXQUFXO1FBQ2YsSUFBSW5ULE1BQU00UyxZQUNOTyxXQUFXO1FBQ2YsSUFBSUgsYUFBYWhULE1BQU1VLE1BQU1oQixNQUFNLEdBQUcsR0FDbEN5VCxXQUFXO1FBQ2YxVCxJQUFJLENBQUNPLEVBQUUsR0FBR29ULFlBQVkxUyxLQUFLLENBQUNWLEVBQUUsRUFBRTJTLFFBQVEsQ0FBQzNTLElBQUlrVCxRQUFRLEVBQUVDLFVBQVV6UjtRQUNqRUEsUUFBUUMsZUFBZSxDQUFDbEMsSUFBSSxDQUFDTyxFQUFFLENBQUNiLEtBQUssQ0FBQyxHQUFHTSxJQUFJLENBQUNPLEVBQUUsQ0FBQ2UsV0FBVztJQUNoRTtJQUVBLGVBQWU7SUFFZixJQUFJc1M7SUFDSixJQUFJeFM7SUFDSixJQUFJcEIsS0FBS0MsTUFBTSxLQUFLLEdBQUc7UUFFbkIyVCxRQUFPM1MsS0FBSyxDQUFDLEVBQUU7UUFDZkcsT0FBT0gsS0FBSyxDQUFDQSxNQUFNaEIsTUFBTSxHQUFDLEVBQUU7SUFFaEMsT0FBTztRQUNILG1CQUFtQjtRQUNuQixNQUFNYixNQUFNQyxLQUFLd0UsVUFBVSxHQUFHLElBQUl4RSxLQUFLOEMsSUFBSSxDQUFDbEMsTUFBTSxHQUFHO1FBRXJEMlQsUUFBUXhTLE9BQU87WUFDWHdDLFFBQVF2RSxLQUFLdUUsTUFBTTtZQUNuQm1QLFlBQVkxVCxLQUFLdUUsTUFBTTtZQUN2QkMsWUFBWXpFO1lBQ1o0VCxnQkFBZ0I1VDtRQUNwQjtJQUNKO0lBR0EsTUFBTTBULFlBQVk7UUFDZGxQLFFBQVlnUSxNQUFNaFEsTUFBTTtRQUN4QkMsWUFBWStQLE1BQU0vUCxVQUFVO1FBRTVCa1AsWUFBZ0IzUixLQUFLMlIsVUFBVTtRQUMvQkMsZ0JBQWdCNVIsS0FBSzRSLGNBQWM7SUFDdkM7SUFFQSxPQUFPLElBQUl2VSxxREFBT0EsQ0FBQ3FVLFdBQVcsUUFBUSxNQUFNLE1BQU05UztBQUN0RDtBQUNPLFNBQVMyVCxZQUFZdFUsSUFBUyxFQUFFd1UsTUFBVyxFQUFFclUsSUFBVyxFQUFFeUMsT0FBZ0I7SUFFN0UsSUFBSVgsY0FBY2pDLEtBQUswUCxVQUFVLEVBQUVuTTtJQUNuQyxJQUFJL0IsV0FBVyxJQUFJVjtJQUNuQixJQUFJMFQsV0FBV3ZOLFdBQVk7UUFFdkIsTUFBTThHLFFBQVFyTCxhQUFjOFIsUUFBTzVSO1FBQ25DcEIsU0FBU3BCLElBQUksQ0FBRTJOO1FBRWYsSUFBSTlMLGdCQUFnQmdGLFdBQVk7WUFDNUJoRixjQUFjOEwsTUFBTTlMLFdBQVc7WUFDL0IsSUFBR0EsZ0JBQWdCLFNBQ2ZBLGNBQWM7UUFDdEI7SUFDSjtJQUVBLE9BQU8sSUFBSTdDLHFEQUFPQSxDQUFDWSxNQUFNLENBQUMsSUFBSSxFQUFFRyxLQUFLLENBQUMsRUFBRThCLGFBQWFqQyxLQUFLK0gsR0FBRyxFQUFFdkc7QUFDbkU7QUFFTyxTQUFTd0MsUUFBUWhFLElBQVc7SUFFL0IsSUFBSW9ELE1BQU1wRCxJQUFJLENBQUMsRUFBRTtJQUNqQixJQUFJMEIsTUFBTTFCLElBQUksQ0FBQ0EsS0FBS1ksTUFBTSxHQUFDLEVBQUU7SUFFN0IsT0FBTztRQUNILDBCQUEwQjtRQUMxQiw4QkFBOEI7UUFDOUIyRCxRQUFTbkIsSUFBSW1CLE1BQU07UUFDbkJDLFlBQVlwQixJQUFJb0IsVUFBVTtRQUMxQmtQLFlBQVloUyxJQUFJZ1MsVUFBVTtRQUMxQkMsZ0JBQWdCalMsSUFBSWlTLGNBQWM7SUFDdEM7QUFDSjtBQUVPLFNBQVNILGFBQWExVCxJQUFTLEVBQUU4QyxPQUFnQjtJQUVwRCxJQUFJNUMsT0FBT0Y7SUFFWCxJQUFJQSxLQUFLMkQsV0FBVyxDQUFDQyxLQUFLLEtBQUssUUFDM0IxRCxPQUFPRixLQUFLTyxLQUFLO0lBQ3JCOzswQkFFc0IsR0FFdEIsT0FBT3FDLGFBQWMxQyxNQUFNNEM7QUFDL0I7QUFFTyxNQUFNSjtJQUNUaUIsWUFBWXRELE9BQTBCLEdBQUcsRUFBRXNVLGlCQUErQixJQUFJLENBQUU7UUFFNUUsSUFBSSxDQUFDdFUsSUFBSSxHQUFHQTtRQUVaLElBQUksQ0FBQzBDLGVBQWUsR0FBRzRSLG1CQUFtQixPQUFPNVQsT0FBTzZULE1BQU0sQ0FBQyxRQUNkO1lBQUMsR0FBR0QsZUFBZTVSLGVBQWU7UUFBQTtJQUN2RjtJQUNBMUMsS0FBSztJQUNMMEMsZ0JBQTZDO0FBQ2pEO0FBRU8sU0FBU3FRLFlBQVl6VCxHQUFRO0lBRWhDLE1BQU1tRCxVQUFVLElBQUlKO0lBRXBCLE1BQU1rTyxTQUFTLElBQUk1UCxNQUFNckIsSUFBSThCLElBQUksQ0FBQ1gsTUFBTTtJQUN4QyxJQUFJLElBQUlNLElBQUksR0FBR0EsSUFBSXpCLElBQUk4QixJQUFJLENBQUNYLE1BQU0sRUFBRSxFQUFFTSxFQUFHO1FBQ3JDLHVCQUF1QjtRQUN2QndQLE1BQU0sQ0FBQ3hQLEVBQUUsR0FBR3NTLGFBQWEvVCxJQUFJOEIsSUFBSSxDQUFDTCxFQUFFLEVBQUUwQjtJQUd0Qyw4QkFBOEI7SUFDbEM7SUFFQSwwQkFBMEI7SUFFMUIsT0FBTzhOO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1T2dEO0FBUXpDLFNBQVNnQyxPQUFPQyxJQUFZLEVBQUUvUyxRQUFnQjtJQUVqRCxNQUFNSyxRQUFRLElBQUlhO0lBRWxCLElBQUlqQixTQUFTO1FBQ1RrRSxRQUFRO1FBQ1JqRSxNQUFNO1FBQ042VSxhQUFjO0lBQ2xCO0lBRUEsSUFBSUM7SUFDSixHQUFHO1FBQ0MzVSxNQUFNRyxJQUFJLENBQUV5VSxnQkFBZ0JsQyxNQUFNOVM7UUFDbEMrVSxPQUFPakMsSUFBSSxDQUFDOVMsT0FBT2tFLE1BQU0sQ0FBQztRQUMxQixNQUFPNlEsU0FBUyxLQUFPO1lBQ25CQSxPQUFPakMsSUFBSSxDQUFDLEVBQUU5UyxPQUFPa0UsTUFBTSxDQUFDO1lBQzVCLEVBQUVsRSxPQUFPQyxJQUFJO1FBQ2pCO1FBRUFELE9BQU84VSxXQUFXLEdBQUc5VSxPQUFPa0UsTUFBTTtJQUV0QyxRQUFTNlEsU0FBUzNOLFVBQVk7SUFFOUIsdURBQXVEO0lBQzFELDhDQUE4QztJQUMzQywyQkFBMkI7SUFDOUIsT0FBTztRQUNBaEg7UUFDQUw7SUFDSjtBQUNKO0FBRTBEO0FBRTFELFNBQVNtVixZQUFZcEMsSUFBWSxFQUFFOVMsTUFBYztJQUU3QyxNQUFNbVYsWUFBWW5WLE9BQU9rRSxNQUFNO0lBRS9CLElBQUlrUixNQUFNdEMsSUFBSSxDQUFDOVMsT0FBT2tFLE1BQU0sQ0FBQztJQUM3QixNQUFPa1IsT0FBTyxPQUFPQSxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxPQUFPQSxPQUFPLE9BQU9BLE9BQU8sT0FBT0EsT0FBTyxJQUM5RkEsTUFBT3RDLElBQUksQ0FBQyxFQUFFOVMsT0FBT2tFLE1BQU0sQ0FBQztJQUVoQyxNQUFNbVIsU0FBU3ZDLEtBQUs1TSxLQUFLLENBQUNpUCxXQUFXblYsT0FBT2tFLE1BQU07SUFFbEQscUJBQXFCO0lBRXJCLE9BQU87UUFDSDVELE1BQVU7UUFDVkUsT0FBVTZVO1FBQ1YxVCxVQUFVLEVBQUU7UUFDWlMsYUFBYTtRQUViM0IsTUFBTXdVLG1FQUFjQTtJQUN4QjtBQUNKO0FBRXFFO0FBRXJFLFNBQVNNLFlBQVl6QyxJQUFZLEVBQUU5UyxNQUFjO0lBRTdDLE1BQU1tVixZQUFZblYsT0FBT2tFLE1BQU07SUFFL0IsZUFBZTtJQUVmLElBQUlrUixNQUFNdEMsSUFBSSxDQUFDOVMsT0FBT2tFLE1BQU0sQ0FBQztJQUM3QixNQUFPa1IsT0FBTyxPQUFPQSxPQUFPLElBQ3hCQSxNQUFPdEMsSUFBSSxDQUFDLEVBQUU5UyxPQUFPa0UsTUFBTSxDQUFDO0lBRWhDLE9BQU87UUFDSDVELE1BQVU7UUFDVkUsT0FBVXNTLEtBQUs1TSxLQUFLLENBQUNpUCxXQUFXblYsT0FBT2tFLE1BQU07UUFDN0N2QyxVQUFVLEVBQUU7UUFDWlMsYUFBYTtRQUViM0IsTUFBTTZVLHlFQUFtQkE7SUFDN0I7QUFDSjtBQUVxRTtBQUVyRSxTQUFTRyxZQUFZM0MsSUFBWSxFQUFFOVMsTUFBYztJQUU3QyxNQUFNbVYsWUFBWW5WLE9BQU9rRSxNQUFNO0lBRS9CLElBQUlrUixNQUFNdEMsSUFBSSxDQUFDLEVBQUU5UyxPQUFPa0UsTUFBTSxDQUFDO0lBQy9CLE1BQU9rUixRQUFRaE8sYUFBYWdPLFFBQVEsT0FBT3RDLElBQUksQ0FBQzlTLE9BQU9rRSxNQUFNLEdBQUMsRUFBRSxLQUFLLEtBQ2pFa1IsTUFBTXRDLElBQUksQ0FBQyxFQUFFOVMsT0FBT2tFLE1BQU0sQ0FBQztJQUUvQixFQUFFbEUsT0FBT2tFLE1BQU07SUFFZixPQUFPO1FBQ0g1RCxNQUFVO1FBQ1ZFLE9BQVVzUyxLQUFLNU0sS0FBSyxDQUFDaVAsV0FBV25WLE9BQU9rRSxNQUFNO1FBQzdDdkMsVUFBVSxFQUFFO1FBQ1pTLGFBQWE7UUFFYjNCLE1BQU0rVSx5RUFBbUJBO0lBQzdCO0FBQ0o7QUFFQSxTQUFTUixnQkFBZ0JsQyxJQUFZLEVBQUU5UyxNQUFjO0lBQ2pELElBQUkrVSxPQUFPakMsSUFBSSxDQUFDOVMsT0FBT2tFLE1BQU0sQ0FBQztJQUU5QixJQUFJK0wsT0FBT3lGLFdBQVc1QyxNQUFNOVM7SUFDNUIrVSxPQUFPakMsSUFBSSxDQUFDOVMsT0FBT2tFLE1BQU0sQ0FBQztJQUMxQixJQUFJNlEsU0FBUyxNQUNULE9BQU85RTtJQUVYLElBQUlJLEtBQUtxRixXQUFXNUMsTUFBTTlTO0lBQzFCcVEsR0FBSTFPLFFBQVEsQ0FBQyxFQUFFLEdBQUdzTztJQUNsQkksR0FBR3ZMLE1BQU0sQ0FBQ3JELEtBQUssR0FBR3dPLEtBQUtuTCxNQUFNLENBQUNyRCxLQUFLO0lBRW5DLElBQUkwTSxTQUFTO1FBQUNrQztRQUFJcUYsV0FBVzVDLE1BQU05UztLQUFRO0lBRTNDK1UsT0FBT2pDLElBQUksQ0FBQzlTLE9BQU9rRSxNQUFNLENBQUM7SUFDMUIsTUFBTzZRLFNBQVMsS0FBTztRQUVuQixJQUFJWSxNQUFRRCxXQUFXNUMsTUFBTTlTO1FBQzdCLElBQUkyUCxRQUFRK0YsV0FBVzVDLE1BQU05UztRQUU3QixJQUFJNFYsTUFBT3pILE1BQU0sQ0FBQ0EsT0FBT3BOLE1BQU0sR0FBQyxFQUFFO1FBQ2xDLElBQUlrUCxPQUFPOUIsTUFBTSxDQUFDQSxPQUFPcE4sTUFBTSxHQUFDLEVBQUU7UUFFbEMsNkJBQTZCO1FBQzdCLFVBQVU7UUFFVixRQUFRO1FBQ1I2VSxJQUFLalUsUUFBUSxDQUFDLEVBQUUsR0FBR3NPO1FBQ25CMkYsSUFBSzlRLE1BQU0sQ0FBQ2pELEdBQUcsR0FBSW9PLEtBQUtuTCxNQUFNLENBQUNqRCxHQUFHO1FBRWxDLE9BQU87UUFDUDhULElBQUtoVSxRQUFRLENBQUMsRUFBRSxHQUFHaVU7UUFDbkJELElBQUk3USxNQUFNLENBQUNyRCxLQUFLLEdBQUdtVSxJQUFJOVEsTUFBTSxDQUFDckQsS0FBSztRQUVuQzBNLE1BQU0sQ0FBQ0EsT0FBT3BOLE1BQU0sR0FBQyxFQUFFLEdBQUc0VTtRQUMxQnhILE1BQU0sQ0FBQ0EsT0FBT3BOLE1BQU0sR0FBQyxFQUFFLEdBQUc0TztRQUUxQm9GLE9BQU9qQyxJQUFJLENBQUM5UyxPQUFPa0UsTUFBTSxDQUFDO0lBQzlCO0lBRUFpSyxNQUFNLENBQUMsRUFBRSxDQUFFeE0sUUFBUSxDQUFDLEVBQUUsR0FBR3dNLE1BQU0sQ0FBQyxFQUFFO0lBQ2xDQSxNQUFNLENBQUMsRUFBRSxDQUFFckosTUFBTSxDQUFDakQsR0FBRyxHQUFJc00sTUFBTSxDQUFDLEVBQUUsQ0FBQ3JKLE1BQU0sQ0FBQ2pELEdBQUc7SUFFN0MsT0FBT3NNLE1BQU0sQ0FBQyxFQUFFO0FBQ3BCO0FBRUEsU0FBUzBILGNBQWMvQyxJQUFZLEVBQUU5UyxNQUFjO0lBRS9DLE1BQU1tVixZQUFZblYsT0FBT2tFLE1BQU07SUFFL0IsSUFBSTZRLE9BQU9qQyxJQUFJLENBQUM5UyxPQUFPa0UsTUFBTSxHQUFHO0lBQ2hDOztvQ0FFZ0MsR0FFaEMsT0FBTztRQUNINUQsTUFBVSxlQUFleVU7UUFDekJ2VSxPQUFVO1FBQ1ZtQixVQUFVO1lBQUN5RjtZQUFXQTtTQUFVO1FBQ2hDaEYsYUFBYTtRQUViM0IsTUFBTWlTLDJEQUFZLENBQUMsZUFBZXFDLEtBQUssQ0FBQ3ZILE1BQU07SUFDbEQ7QUFDSjtBQUVBLFNBQVNrSSxXQUFXNUMsSUFBWSxFQUFFOVMsTUFBYztJQUU1QyxvQkFBb0I7SUFDcEIsSUFBSStVLE9BQU9qQyxJQUFJLENBQUM5UyxPQUFPa0UsTUFBTSxDQUFDO0lBQzlCLE1BQU82USxTQUFTLE9BQU9BLFNBQVMsS0FDNUJBLE9BQVFqQyxJQUFJLENBQUMsRUFBRTlTLE9BQU9rRSxNQUFNLENBQUM7SUFFakMsY0FBYztJQUNkLElBQUk2USxTQUFTM04sV0FDVCxPQUFPO0lBRVgsTUFBTTNGLFFBQVE7UUFDVnhCLE1BQU1ELE9BQU9DLElBQUk7UUFDakJDLEtBQU1GLE9BQU9rRSxNQUFNLEdBQUdsRSxPQUFPOFUsV0FBVztJQUM1QztJQUVBLElBQUkzVSxPQUFPO0lBQ1gsSUFBSTRVLFNBQVMsS0FDVDVVLE9BQU9zVixZQUFZM0MsTUFBTTlTO1NBQ3hCLElBQUkrVSxRQUFRLE9BQU9BLFFBQVEsT0FBT0EsUUFBUSxPQUFPQSxRQUFRLE9BQU9BLFFBQVEsS0FDekU1VSxPQUFPK1UsWUFBWXBDLE1BQU05UztTQUN4QixJQUFJK1UsUUFBUSxPQUFPQSxRQUFRLEtBQzVCNVUsT0FBT29WLFlBQVl6QyxNQUFNOVM7U0FFekJHLE9BQU8wVixjQUFjL0MsTUFBTTlTO0lBQzNCLDZIQUE2SDtJQUVqSUcsS0FBSzJFLE1BQU0sR0FBRztRQUNWckQ7UUFDQUksS0FBSztZQUNENUIsTUFBTUQsT0FBT0MsSUFBSTtZQUNqQkMsS0FBTUYsT0FBT2tFLE1BQU0sR0FBR2xFLE9BQU84VSxXQUFXO1FBQzVDO0lBQ0o7SUFFQSxvREFBb0Q7SUFDcEQseUJBQXlCO0lBRXpCLE9BQU8zVTtBQUVYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck5vRDtBQUNYO0FBRXZCO0FBRWxCLFdBQVc7QUFHSixNQUFNNFY7SUFFVCxDQUFDQyxjQUFjLEdBQXdCLENBQUMsRUFBRTtJQUMxQyxDQUFDblcsUUFBUSxHQUF3QztRQUM3Q29XLFNBQVNDO0lBQ2IsRUFBRTtJQUVGLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFFekIsbUNBQW1DO0lBQ25DQyxZQUFZdlUsTUFBYyxFQUFFaEMsR0FBUSxFQUFFO1FBQ2xDLElBQUdBLElBQUlHLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQ2lXLGNBQWMsRUFDbkMsTUFBTSxJQUFJN1MsTUFBTSxDQUFDLElBQUksRUFBRXZELElBQUlHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztRQUU3RCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLENBQUNpVyxjQUFjLENBQUNwVyxJQUFJRyxRQUFRLENBQUMsR0FBR0g7UUFFckMsc0JBQXNCO1FBQ3RCLE9BQU8sSUFBSXdXLFNBQVMsZ0JBQWdCLENBQUMsRUFBRXhVLE9BQU8sc0JBQXNCLENBQUM7SUFDekU7SUFFQXlVLFVBQVV6VSxNQUFjLEVBQUVoQyxHQUFRLEVBQUU7UUFDaEMsSUFBSSxDQUFDLENBQUNDLFFBQVEsQ0FBQ0QsSUFBSUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDb1csV0FBVyxDQUFDdlUsUUFBUWhDLEtBQUssSUFBSTtJQUNyRTtJQUVBMFcsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLENBQUN6VyxRQUFRO0lBQ3pCO0lBQ0EwVyxVQUFVdFQsSUFBWSxFQUFFO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLENBQUNwRCxRQUFRLENBQUNvRCxLQUFLO0lBQy9CO0lBRUF3QyxVQUFVMUYsUUFBZ0IsRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQyxDQUFDaVcsY0FBYyxDQUFDalcsU0FBUyxFQUFFLGtCQUFrQjtJQUM3RDtJQUVBLElBQUlnUyxNQUFNO1FBQ04sT0FBT0EsMkRBQUdBO0lBQ2Q7SUFDQSxJQUFJcEUsTUFBTTtRQUNOLE9BQU9BLG9EQUFHQTtJQUNkO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQzlCTyxNQUFNcE87SUFFWmUsS0FBaUI7SUFDakJFLE1BQWM7SUFDZG1CLFdBQXNCLEVBQUUsQ0FBQztJQUN6QlMsY0FBMkIsS0FBSztJQUU3QjBDLE9BQWtCO0lBQ2xCbEQsT0FBbUI7SUFFdEJuQixLQUFrRDtJQUVsRG1ELFlBQVkyUCxZQUFpQixFQUFFalQsSUFBWSxFQUFFOEIsV0FBd0IsRUFBRW9VLFNBQWMsSUFBSSxFQUFFN1UsV0FBc0IsRUFBRSxDQUFFO1FBRXBILElBQUksQ0FBQ3JCLElBQUksR0FBS0E7UUFDZCxJQUFJLENBQUM4QixXQUFXLEdBQUdBO1FBQ25CLElBQUksQ0FBQzVCLEtBQUssR0FBSWdXO1FBQ2QsSUFBSSxDQUFDN1UsUUFBUSxHQUFHQTtRQUNoQixJQUFJLENBQUNtRCxNQUFNLEdBQUc7WUFDYnJELE9BQU87Z0JBQ054QixNQUFNc1QsYUFBYTdPLE1BQU07Z0JBQ3pCeEUsS0FBS3FULGFBQWE1TyxVQUFVO1lBQzdCO1lBQ0E5QyxLQUFLO2dCQUNKNUIsTUFBTXNULGFBQWFNLFVBQVU7Z0JBQzdCM1QsS0FBS3FULGFBQWFPLGNBQWM7WUFDakM7UUFDRDtJQUNEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEMkI7QUFDUztBQUMwQjtBQUd2RCxNQUFNeEQsZUFBZTtJQUN4QixRQUFRO0lBQ1IsT0FBUTtJQUVSLE9BQVE7SUFFUixRQUFZO0lBQ1osT0FBWTtJQUNaLFlBQVk7SUFDWixPQUFZO0lBRVosT0FBWTtJQUNaLE9BQVk7SUFFWixNQUFZO0lBQ1osU0FBWTtJQUNaLE1BQVk7SUFDWixTQUFZO0lBRVosTUFBWTtJQUNaLE9BQVk7SUFDWixNQUFZO0lBQ1osT0FBWTtJQUVaLFVBQVk7SUFFWixTQUFZO0lBQ1osVUFBWTtJQUNaLFVBQVk7SUFDWixVQUFZO0lBQ1osVUFBWTtBQUNoQixFQUFDO0FBRU0sTUFBTW1HLGtCQUFrQjtJQUMzQixXQUFnQjtJQUNoQixXQUFnQjtJQUNoQixlQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsV0FBZ0I7SUFFaEIsV0FBZTtJQUNmLFdBQWU7SUFFZixVQUFlO0lBQ2YsVUFBZTtJQUVmLFVBQWU7SUFDZixVQUFlO0lBQ2YsVUFBZTtJQUNmLFVBQWU7SUFFZixXQUFlO0lBQ2YsVUFBZTtJQUNmLFdBQWU7SUFDZixXQUFlO0lBQ2YsY0FBZTtJQUNmLGNBQWU7QUFDbkIsRUFBQztBQUVNLE1BQU10RyxrQkFBa0I7SUFDM0IsV0FBZ0I7SUFDaEIsV0FBZ0I7SUFDaEIsZUFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQWdCO0lBRWhCLFdBQWU7SUFDZixXQUFlO0lBRWYsVUFBZTtJQUNmLFdBQWU7SUFDZixXQUFlO0lBQ2YsY0FBZTtJQUNmLGNBQWU7QUFDbkIsRUFBQztBQUdNLE1BQU11RyxZQUFZO0lBQ3JCLE1BQU07SUFDTixLQUFNO0lBQ04sS0FBTTtJQUNOLE1BQU07SUFDTixLQUFNO0lBRU4sS0FBTztJQUNQLEtBQU87SUFDUCxPQUFPO0lBRVAsTUFBTztJQUNQLE1BQU87SUFDUCxLQUFPO0lBQ1AsTUFBTztJQUNQLE1BQU87SUFDUCxLQUFPO0lBRVAsS0FBTTtJQUNOLEtBQU07SUFDTixLQUFNO0lBQ04sS0FBTTtJQUNOLE1BQU07SUFDTixNQUFNO0FBQ1YsRUFBRTtBQUVGLHdCQUF3QjtBQUV4Qix3R0FBd0c7QUFDakcsTUFBTUMsY0FBYztJQUN2QjtRQUFDO0tBQU07SUFDUDtRQUFDO0tBQUs7SUFDTjtRQUFDO1FBQUs7UUFBSztLQUFJO0lBQ2Y7UUFBQztRQUFLO0tBQUk7SUFDVjtRQUFDO1FBQU07UUFBTTtLQUFNO0lBQ25CO1FBQUM7UUFBSztRQUFNO1FBQU07S0FBSTtJQUN0QjtRQUFDO1FBQU07UUFBTTtRQUFPO0tBQU07SUFDMUI7UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFJO0lBQ0w7UUFBQztLQUFLO0lBQ047UUFBQztRQUFNO0tBQUs7SUFDWjtRQUFDO0tBQUksQ0FBMkIsa0JBQWtCO0NBRXJELENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZHQSxHQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0EsR0FHTyxTQUFTNUgsV0FBV0ssQ0FBVSxFQUFFM0wsU0FBUyxPQUFPO0lBRW5ELElBQUkyTCxFQUFFaE4sV0FBVyxLQUFLLFNBQ2xCLE9BQU9nTjtJQUVYLElBQUlBLEVBQUU5TyxJQUFJLEtBQUssZ0JBQWdCO1FBQzFCOE8sRUFBVVQsRUFBRSxHQUFHbEw7UUFDaEIsT0FBTzJMO0lBQ1g7SUFDQSxJQUFJQSxFQUFFNU8sS0FBSyxLQUFLLGFBQWE0TyxFQUFFNU8sS0FBSyxLQUFLLFlBQWE7UUFDbEQsTUFBTThRLFFBQVFsQyxFQUFFek4sUUFBUSxDQUFDLEVBQUUsQ0FBQ1MsV0FBVztRQUN2QyxNQUFNaVAsUUFBUWpDLEVBQUV6TixRQUFRLENBQUMsRUFBRSxDQUFDUyxXQUFXO1FBQ3ZDLElBQU8sQ0FBQ2tQLFVBQVUsU0FBU0EsVUFBVSxPQUFNLEtBQ25DRCxDQUFBQSxVQUFVLFNBQVNBLFVBQVUsT0FBTSxHQUN6QztZQUNHakMsRUFBVVQsRUFBRSxHQUFHbEw7WUFDaEIsT0FBTzJMO1FBQ1g7SUFDSjtJQUNBLElBQUlBLEVBQUU1TyxLQUFLLEtBQUssYUFBYTRPLEVBQUV6TixRQUFRLENBQUMsRUFBRSxDQUFDUyxXQUFXLEtBQUssT0FBTztRQUM3RGdOLEVBQVVULEVBQUUsR0FBR2xMO1FBQ2hCLE9BQU8yTDtJQUNYO0lBQ0EsSUFBSTNMLFdBQVcsU0FDWCxPQUFPN0MseUNBQUMsQ0FBQyxPQUFPLEVBQUV3TyxFQUFFLENBQUMsQ0FBQztJQUUxQixzQ0FBc0M7SUFDdEMsT0FBT0E7QUFDWDtBQUVPLFNBQVMzUCxXQUFXMlAsQ0FBVTtJQUVqQyxJQUFJQSxFQUFFaE4sV0FBVyxLQUFLLE9BQ2xCLE9BQU9nTjtJQUVYLElBQUlBLEVBQUU5TyxJQUFJLEtBQUssZ0JBQWdCO1FBQzFCOE8sRUFBVVQsRUFBRSxHQUFHO1FBQ2hCLE9BQU9TO0lBQ1g7SUFDQSxJQUFJQSxFQUFFNU8sS0FBSyxLQUFLLGFBQWE0TyxFQUFFek4sUUFBUSxDQUFDLEVBQUUsQ0FBQ1MsV0FBVyxLQUFLLFNBQVM7UUFDL0RnTixFQUFVVCxFQUFFLEdBQUc7UUFDaEIsT0FBT1M7SUFDWDtJQUVBLE9BQU94Tyx5Q0FBQyxDQUFDLE9BQU8sRUFBRXdPLEVBQUUsQ0FBQyxDQUFDO0FBQzFCO0FBRUEsSUFBSXdILHNCQUE4QyxDQUFDO0FBQ25ELElBQUksSUFBSXZWLElBQUksR0FBR0EsSUFBSXNWLFlBQVk1VixNQUFNLEVBQUUsRUFBRU0sRUFBRztJQUV4QyxNQUFNd1YsV0FBV0YsWUFBWTVWLE1BQU0sR0FBR007SUFDdEMsS0FBSSxJQUFJZ1AsTUFBTXNHLFdBQVcsQ0FBQ3RWLEVBQUUsQ0FDeEJ1VixtQkFBbUIsQ0FBQ3ZHLEdBQUcsR0FBR3dHO0FBRWxDO0FBRU8sU0FBU3JHLGtCQUEwREgsRUFBSztJQUMzRSxPQUFPb0csZUFBZSxDQUFDcEcsR0FBRztBQUM5QjtBQUVBLE1BQU15RyxPQUFRO0FBQ2QsTUFBTUMsUUFBUTtBQUVQLFNBQVM5RixXQUFXOVEsSUFBYSxFQUFFa1EsRUFBVSxFQUFFLEdBQUdsQyxNQUFpQjtJQUV0RSxNQUFNdUcsUUFBUXZHLE1BQU0sQ0FBQyxFQUFFO0lBQ3ZCLElBQUd1RyxpQkFBaUJuViw2Q0FBT0EsRUFBRTtRQUN4Qm1WLE1BQWNzQyxTQUFTLEdBQUczRztRQUMxQnFFLE1BQWN1QyxhQUFhLEdBQUdIO0lBQ25DO0lBRUEsSUFBSSxJQUFJelYsSUFBSSxHQUFHQSxJQUFJOE0sT0FBT3BOLE1BQU0sR0FBQyxHQUFHLEVBQUVNLEVBQUc7UUFDckMsTUFBTWIsUUFBUTJOLE1BQU0sQ0FBQzlNLEVBQUU7UUFDdkIsSUFBR2IsaUJBQWlCakIsNkNBQU9BLEVBQUU7WUFDeEJpQixNQUFjd1csU0FBUyxHQUFHM0c7WUFDMUI3UCxNQUFjeVcsYUFBYSxHQUFHSCxPQUFLQztRQUN4QztJQUNKO0lBRUEsTUFBTTdVLE9BQU9pTSxNQUFNLENBQUNBLE9BQU9wTixNQUFNLEdBQUMsRUFBRTtJQUNwQyxJQUFHbUIsZ0JBQWdCM0MsNkNBQU9BLEVBQUU7UUFDdkIyQyxLQUFhOFUsU0FBUyxHQUFHM0c7UUFDekJuTyxLQUFhK1UsYUFBYSxHQUFHRjtJQUNsQztJQUVBLElBQUlsRyxTQUFTalEseUNBQUMsQ0FBQyxFQUFFOFQsTUFBTSxDQUFDO0lBQ3hCLElBQUksSUFBSXJULElBQUksR0FBR0EsSUFBSThNLE9BQU9wTixNQUFNLEVBQUUsRUFBRU0sRUFDaEN3UCxTQUFTalEseUNBQUMsQ0FBQyxFQUFFaVEsT0FBTyxJQUFJLEVBQUUxQyxNQUFNLENBQUM5TSxFQUFFLENBQUMsQ0FBQztJQUV6QyxJQUFJLGVBQWVsQixNQUFPO1FBRXRCLElBQUkrVyxZQUFrQixLQUFjRCxhQUFhO1FBQ2pELElBQUlFLGVBQWtCUCxtQkFBbUIsQ0FBQ3ZHLEdBQUc7UUFDN0MsSUFBSStHLGtCQUFrQlIsbUJBQW1CLENBQUN6VyxLQUFLNlcsU0FBUyxDQUFRO1FBRWhFLElBQUlJLGtCQUFrQkQsZ0JBQ2RDLG9CQUFvQkQsZ0JBQWlCRCxZQUFZSCxPQUVyRGxHLFNBQVNqUSx5Q0FBQyxDQUFDLENBQUMsRUFBRWlRLE9BQU8sQ0FBQyxDQUFDO0lBQy9CO0lBRUEsT0FBT0E7QUFDWDtBQUVPLFNBQVMvQixRQUFRM08sSUFBYSxFQUFFaVAsQ0FBVTtJQUM3QyxJQUFHQSxhQUFhN1AsNkNBQU9BLEVBQUU7UUFDcEI2UCxFQUFVNEgsU0FBUyxHQUFPLEtBQWNBLFNBQVM7UUFDakQ1SCxFQUFVNkgsYUFBYSxHQUFHLEtBQWNBLGFBQWE7SUFDMUQ7SUFFQSxPQUFPclcseUNBQUMsQ0FBQyxFQUFFd08sRUFBRSxDQUFDO0FBQ2xCO0FBRU8sU0FBUzVQLFlBQVlXLElBQWEsRUFBRWlQLENBQWMsRUFBRWlCLEVBQVUsRUFBRWhCLENBQWMsRUFBRWdJLGlCQUFpQixJQUFJO0lBRXhHLElBQUdqSSxhQUFhN1AsNkNBQU9BLEVBQUU7UUFDcEI2UCxFQUFVNEgsU0FBUyxHQUFHM0c7UUFDdEJqQixFQUFVNkgsYUFBYSxHQUFHSDtJQUMvQjtJQUVBLElBQUd6SCxhQUFhOVAsNkNBQU9BLEVBQUU7UUFDcEI4UCxFQUFVMkgsU0FBUyxHQUFHM0c7UUFDdEJoQixFQUFVNEgsYUFBYSxHQUFHRjtJQUMvQjtJQUVBLElBQUlsRyxTQUFTalEseUNBQUMsQ0FBQyxFQUFFd08sRUFBRSxFQUFFaUIsR0FBRyxFQUFFaEIsRUFBRSxDQUFDO0lBRTdCLElBQUlnSSxrQkFBa0IsZUFBZWxYLE1BQU87UUFFeEMsSUFBSStXLFlBQWtCLEtBQWNELGFBQWE7UUFDakQsSUFBSUUsZUFBa0JQLG1CQUFtQixDQUFDdkcsR0FBRztRQUM3QyxJQUFJK0csa0JBQWtCUixtQkFBbUIsQ0FBQ3pXLEtBQUs2VyxTQUFTLENBQVE7UUFFaEUsSUFBSUksa0JBQWtCRCxnQkFDZEMsb0JBQW9CRCxnQkFBaUJELFlBQVlILE9BRXJEbEcsU0FBU2pRLHlDQUFDLENBQUMsQ0FBQyxFQUFFaVEsT0FBTyxDQUFDLENBQUM7SUFDL0I7SUFFQSxPQUFPQTtBQUNYO0FBR08sU0FBUzdCLFdBQVc3TyxJQUFhLEVBQUVrUSxFQUFVLEVBQUVqQixDQUFjLEVBQUVpSSxpQkFBaUIsSUFBSTtJQUV2RixJQUFJeEcsU0FBU2pRLHlDQUFDLENBQUMsRUFBRXlQLEdBQUcsRUFBRWpCLEVBQUUsQ0FBQztJQUV6QixJQUFHaUIsT0FBTyxLQUNOQSxLQUFLO0lBRVQsSUFBR2pCLGFBQWE3UCw2Q0FBT0EsRUFBRTtRQUNwQjZQLEVBQVU0SCxTQUFTLEdBQUczRztRQUN0QmpCLEVBQVU2SCxhQUFhLEdBQUdGO0lBQy9CO0lBR0EsSUFBSU0sa0JBQWtCLGVBQWVsWCxNQUFPO1FBRXhDLElBQUkrVyxZQUFrQixLQUFjRCxhQUFhO1FBQ2pELElBQUlFLGVBQWtCUCxtQkFBbUIsQ0FBQ3ZHLEdBQUc7UUFDN0MsSUFBSStHLGtCQUFrQlIsbUJBQW1CLENBQUN6VyxLQUFLNlcsU0FBUyxDQUFRO1FBRWhFLElBQUksWUFBYUYsUUFBU00sa0JBQWtCRCxjQUN4Q3RHLFNBQVNqUSx5Q0FBQyxDQUFDLENBQUMsRUFBRWlRLE9BQU8sQ0FBQyxDQUFDO0lBQy9CO0lBRUEsT0FBT0E7QUFDWDtBQVVPLFNBQVN4QyxZQUFZbkgsUUFBa0IsRUFDbEJzSyxHQUFzQyxFQUN0QyxFQUNJakMsZUFBZSxDQUFDSCxJQUFNQSxDQUFDLEVBQ3ZCckksZUFBZSxFQUNBLEdBQUcsQ0FBQyxDQUFDO0lBR2hELElBQUk4SixTQUF1QyxDQUFDO0lBRTVDLE1BQU14SixjQUFjLENBQUNpUSxJQUFjcFE7SUFFbkMsS0FBSSxJQUFJbUosTUFBTW1CLElBQUs7UUFFZixNQUFNK0YsT0FBT2IsU0FBUyxDQUFDckcsR0FBRztRQUMxQixJQUFJQSxPQUFPLE9BQ1BBLEtBQUs7UUFFVHRKLG9CQUFvQixDQUFDNUcsTUFBZXFPO1lBQ2hDLE9BQU9RLFdBQVc3TyxNQUFNa1EsSUFBSWQsYUFBYWY7UUFDN0M7UUFFQXFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTBHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNwQmxRO1lBQ0FOO1FBQ0o7SUFDSjtJQUVBLE9BQU84SjtBQUNYO0FBU0EsU0FBUzJHLGdCQUFnQjFVLE9BQStCO0lBQ3BELE9BQU8sQ0FBQzNDO1FBQ0osTUFBTXNYLE1BQVN0WCxLQUFLaUMsV0FBVztRQUMvQixNQUFNcUIsU0FBU1gsT0FBTyxDQUFDMlUsSUFBSTtRQUMzQixJQUFJaFUsV0FBVzJELFdBQ1gsT0FBT2pIO1FBRVgsZ0JBQWdCO1FBQ2hCLElBQUlzWCxRQUFRLE9BQ1IsT0FBTzFJLFdBQVc1TyxNQUFNc0Q7UUFDNUIsSUFBSUEsV0FBVyxPQUNYLE9BQU9oRSxXQUFXVTtRQUV0QixNQUFNLElBQUlnRCxNQUFNO0lBQ3BCO0FBQ0o7QUFFQSxNQUFNdVUsUUFBUSxDQUFJdEksSUFBU0E7QUFFcEIsU0FBU2hCLGFBQWFsSCxRQUFnQixFQUNqQnNLLEdBQStCLEVBQy9CbUcsVUFBb0IsRUFDdkIsRUFDR3BKLGdCQUFrQixDQUFDLENBQUMsRUFDcEJnQixlQUFrQm1JLEtBQUssRUFDdkIzUSxlQUFlLEVBQ0UsR0FBRyxDQUFDLENBQUM7SUFFOUMsSUFBSThKLFNBQXVDLENBQUM7SUFFNUMsTUFBTXhKLGNBQWMsQ0FBQ2lRLElBQWNLLFdBQVdwVixRQUFRLENBQUMrVSxLQUFLcFEsV0FBV2tKLHlEQUFxQkE7SUFDNUYsTUFBTXdILGFBQWNKLGdCQUFnQmpKO0lBRXBDLEtBQUksSUFBSThCLE1BQU1tQixJQUFLO1FBRWYsTUFBTStGLE9BQU9iLFNBQVMsQ0FBQ3JHLEdBQUc7UUFDMUIsSUFBSUEsT0FBTyxNQUNQQSxLQUFLO1FBRVQsSUFBSXdILEtBQU0sQ0FBQzFYLE1BQWVxTyxNQUFlQztZQUNyQyxPQUFPalAsWUFBWVcsTUFBTW9QLGFBQWFmLE9BQU82QixJQUFJdUgsV0FBV25KO1FBQ2hFO1FBRUEsSUFBSXFKLE1BQU0sQ0FBQzNYLE1BQWVxTyxNQUFlQztZQUNyQyxPQUFPalAsWUFBWVcsTUFBTXlYLFdBQVduSixRQUFRNEIsSUFBSWQsYUFBYWY7UUFDakU7UUFFQSxJQUFJekgsb0JBQW9CSyxXQUFZO1lBRWhDeVEsS0FBTSxDQUFDMVgsTUFBZXFPLE1BQWU4STtnQkFDakMsT0FBT3ZRLGdCQUFnQjVHLE1BQU1vUCxhQUFhZixPQUFPb0osV0FBV047WUFDaEU7WUFFQSxzQkFBc0I7WUFDdEJRLE1BQU0sQ0FBQzNYLE1BQWVxTyxNQUFlOEk7Z0JBQ2pDLE9BQU92USxnQkFBZ0I1RyxNQUFNeVgsV0FBV04sSUFBSS9ILGFBQWFmO1lBQzdEO1FBQ0o7UUFFQXFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRTBHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNwQmxRO1lBQ0FOLGlCQUFpQjhRO1FBQ3JCO1FBQ0FoSCxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUwRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDckJsUTtZQUNBTixpQkFBaUIrUTtRQUNyQjtRQUNBLElBQUl2SSxpQkFBaUJtSSxTQUFTM1Esb0JBQW9CSyxXQUM5Q3lKLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRTBHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRztZQUNyQmxRO1lBQ0FOLGlCQUFpQixDQUFDNUcsTUFBZXFPLE1BQWVDO2dCQUU1QyxJQUFJNEIsT0FBTyxPQUFPNUIsTUFBTWpPLEtBQUssS0FBSyxHQUM5QixPQUFPd08sV0FBVzdPLE1BQU0sTUFBTXFPO2dCQUNsQyxJQUFJNkIsT0FBTyxPQUFPNUIsTUFBTWpPLEtBQUssS0FBSyxHQUM5QixPQUFPd08sV0FBVzdPLE1BQU0sTUFBTXFPO2dCQUVsQyxPQUFPaFAsWUFBWVcsTUFBTXFPLE1BQU02QixLQUFHLEtBQUt1SCxXQUFXbko7WUFDdEQ7UUFDSjtJQUNSO0lBRUEsT0FBT29DO0FBQ1g7QUFFTyxNQUFNOUMsY0FBYztJQUFDO0lBQU07SUFBTTtJQUFLO0lBQUs7SUFBTTtDQUFLLENBQVU7QUFFdkUsTUFBTWdLLFVBQVU7SUFDWixNQUFNO0lBQ04sTUFBTTtJQUNOLEtBQUs7SUFDTCxLQUFLO0lBQ0wsTUFBTTtJQUNOLE1BQU07QUFDVjtBQUVPLFNBQVMvSixVQUFZd0QsR0FBK0MsRUFDL0NtRyxVQUE2QixFQUM3QixFQUNJcEosZ0JBQWtCLENBQUMsQ0FBQyxFQUNwQmdCLGVBQWtCbUksS0FBSyxFQUN2QjNRLGVBQWUsRUFDRSxHQUFHLENBQUMsQ0FBQztJQUVsRCxJQUFJOEosU0FBdUMsQ0FBQztJQUU1QyxNQUFNeEosY0FBYyxDQUFDaVEsSUFBY0ssV0FBV3BWLFFBQVEsQ0FBQytVLEtBQUssU0FBU2xILHlEQUFxQkE7SUFDMUYsTUFBTXdILGFBQWNKLGdCQUFnQmpKO0lBRXBDLEtBQUksSUFBSThCLE1BQU1tQixJQUFLO1FBRWYsTUFBTStGLE9BQU9iLFNBQVMsQ0FBQ3JHLEdBQUc7UUFFMUIsSUFBSXdILEtBQU0sQ0FBQzFYLE1BQWVxTyxNQUFlQyxPQUFnQjJDO1lBRXJELElBQUk0RyxNQUFNM0g7WUFFVixJQUFJakIsSUFBSUcsYUFBYWY7WUFDckIsSUFBSWEsSUFBSXVJLFdBQVduSjtZQUNuQixJQUFJMkMsVUFBVztnQkFDWCxDQUFDaEMsR0FBRUMsRUFBRSxHQUFHO29CQUFDQTtvQkFBRUQ7aUJBQUU7Z0JBQ2I0SSxNQUFNRCxPQUFPLENBQUNDLElBQUk7WUFDdEI7WUFFQSxJQUFJQSxHQUFHLENBQUMsRUFBRSxLQUFLLE9BQU9BLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBTTtnQkFDbkMsSUFBSXhKLEtBQUtwTSxXQUFXLEtBQUtxTSxNQUFNck0sV0FBVyxFQUN0QzRWLE1BQU1BLE1BQU07WUFDcEI7WUFFQSxPQUFPeFksWUFBWVcsTUFBTWlQLEdBQUc0SSxLQUFLM0k7UUFDckM7UUFFQSxJQUFJdEksb0JBQW9CSyxXQUFZO1lBRWhDeVEsS0FBTSxDQUFDMVgsTUFBZXFPLE1BQWU4SSxHQUFZbEc7Z0JBQzdDLE9BQU9ySyxnQkFBZ0I1RyxNQUFNb1AsYUFBYWYsT0FBT29KLFdBQVdOLEtBQU0sU0FBUztZQUMvRTtRQUNKO1FBRUF6RyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUwRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDcEJsUTtZQUNBTixpQkFBaUI4UTtRQUNyQjtJQUNKO0lBRUEsT0FBT2hIO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsb0JtRDtBQUk1QyxNQUFNblI7SUFFVFMsS0FBSztJQUNMcUIsY0FBYztJQUNkRCxJQUFJO0lBRUpxQyxZQUFZekQsSUFBYSxFQUFFcUIsZ0JBQWdCLElBQUksQ0FBRTtRQUM3QyxJQUFJLENBQUNELEdBQUcsR0FBR3BCLEtBQUt3QixRQUFRLENBQUNaLE1BQU0sR0FBQyxHQUFHLHFCQUFxQjtRQUN4RCxJQUFJLENBQUNaLElBQUksR0FBR0E7UUFDWixJQUFJLENBQUNxQixhQUFhLEdBQUdBO0lBQ3pCO0lBRUFmLEtBQUtULE1BQWUsRUFBRTtRQUVsQixNQUFNeUIsUUFBUTtZQUFDLEdBQUd6QixNQUFNO1FBQUE7UUFFeEIsSUFBSUYsS0FBSztRQUNULElBQUcsSUFBSSxDQUFDMEIsYUFBYSxFQUNqQjFCLE1BQUk7UUFDUixNQUFNNEIsT0FBTyxJQUFJLENBQUN2QixJQUFJLENBQUN3QixRQUFRLENBQUMsSUFBSSxDQUFDSixHQUFHLENBQUMsRUFBQyxrQkFBa0I7UUFFNUQsSUFBSSxJQUFJRixJQUFJLEdBQUdBLElBQUlLLEtBQUtDLFFBQVEsQ0FBQ1osTUFBTSxFQUFFLEVBQUVNLEVBQUc7WUFDMUN2QixNQUFNWSwrQ0FBT0EsQ0FBQyxJQUFJLENBQUNQLElBQUksRUFBRUgsUUFBUTtZQUNqQ0YsTUFBTU8sa0RBQVVBLENBQUNxQixLQUFLQyxRQUFRLENBQUNOLEVBQUUsRUFBRXJCO1lBQ25DRixNQUFNVyw0Q0FBSUEsQ0FBQyxLQUFLVDtRQUNwQjtRQUVBLElBQUcsSUFBSSxDQUFDd0IsYUFBYSxFQUFFO1lBQ25CMUIsTUFBTVksK0NBQU9BLENBQUMsSUFBSSxDQUFDUCxJQUFJLEVBQUVIO1lBQ3pCRixNQUFNO1lBQ05FLE9BQU9FLEdBQUcsSUFBSTtRQUNsQjtRQUVBd0IsS0FBS0UsTUFBTSxHQUFHO1lBQ1ZILE9BQU9BO1lBQ1BJLEtBQU87Z0JBQUMsR0FBRzdCLE1BQU07WUFBQTtRQUNyQjtRQUVBLE9BQU9GO0lBQ1g7QUFDSjs7Ozs7Ozs7Ozs7Ozs7O0FDL0JPLE1BQU1zUSx3QkFBd0IscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkU7QUFDSjtBQUNBO0FBQ0U7QUFDQTtBQUNNO0FBR2hFLGtEQUFrRDtBQUUzQyxNQUFNMUksY0FBdUM7SUFDaEQsU0FBWTRHLHlFQUFXQTtJQUN2QixPQUFZVyx1RUFBU0E7SUFDckIsU0FBWU8sNkVBQVdBO0lBQ3ZCLFFBQVl2Qix3RUFBVUE7SUFDdEIsT0FBWXdCLHVFQUFTQTtJQUNyQixZQUFZM0Isd0VBQVVBO0FBQzFCLEVBQUM7QUFFTSxTQUFTN0csV0FBV2hFLElBQVk7SUFDbkMsT0FBT3lFLFdBQVcsQ0FBQ3pFLEtBQUs7QUFDNUI7Ozs7Ozs7U0NyQkE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNQO0FBRStDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvb2JqZWN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JpbmFyeU9wZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JvZHkudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9TVHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgSW50Mk51bWJlciwgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG4gICAgY29uc3QgZXhwb3J0ZWQgPSBbXTsgLy8gbW92ZTJhc3QgZ2VuID9cblxuXHRsZXQganMgPSBgLy8jIHNvdXJjZVVSTD0ke2FzdC5maWxlbmFtZX1cXG5gO1xuXHQgICAganMrPSBgY29uc3Qge19yXywgX2JffSA9IF9fU0JSWVRIT05fXztcXG5gO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMywgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdC5ub2Rlcykge1xuXG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gXCJmdW5jdGlvbnMuZGVmXCIpXG4gICAgICAgICAgICBleHBvcnRlZC5wdXNoKG5vZGUudmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiO1wiLCBjdXJzb3IpXG5cbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcblxuXHRyZXR1cm4ganM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGV8Qm9keSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEJvZHkgKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9KUyhjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlXG4gICAgICAgIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCAmJiAhIEFycmF5LmlzQXJyYXkoc3RyKSApIHsgLy8gZm9yIHB5MmFzdF9mYXN0XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDAsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYocHJpbnRfYnJhY2tldClcbiAgICAgICAganMrPVwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYXJnczJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCIoXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgX2FyZ3MgPSBhcmdzLmNoaWxkcmVuO1xuXG4gICAgbGV0IGt3X3BvcyA9IG51bGw7XG4gICAgXG4gICAgbGV0IGlkeDtcbiAgICAvL1RPRE86IHN0YXJ0cyBhZnRlciBrdyA/Pz9cbiAgICBmb3IoIGlkeCA9IF9hcmdzLmxlbmd0aCAtIDE7IGlkeCA+PSAwOyAtLWlkeCkge1xuICAgICAgICBpZiggX2FyZ3NbaWR4XS50eXBlID09PSAnYXJnLnBvc29ubHknIClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBpZiggX2FyZ3NbaWR4XS5jaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgX2FyZ3NbaWR4XS50eXBlICE9PSBcImFyZy5rd2FyZ1wiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYoIGlkeCAhPT0gX2FyZ3MubGVuZ3RoICkge1xuICAgICAgICBsZXQgY291bnQgPSBfYXJncy5sZW5ndGggLSBpZHggLSAxO1xuICAgICAgICBpZiggaWR4IDwgX2FyZ3MubGVuZ3RoIC0gMSAmJiBfYXJnc1tpZHgrMV0udHlwZSA9PT0gXCJhcmcua3dvbmx5XCIgKVxuICAgICAgICAgICAga3dfcG9zID0gaWR4KzE7XG4gICAgICAgIGlmKCBjb3VudCA+IDEgKSAvL3x8IGNvdW50ICE9PSAwICYmIGlkeCAhPT0gLTEgJiYgX2FyZ3NbaWR4XS5jaGlsZHJlbi5sZW5ndGggPT09IDEgKVxuICAgICAgICAgICAga3dfcG9zID0gaWR4KzE7XG4gICAgfVxuICAgIFxuICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGt3X3BvcyA9PT0gaSlcbiAgICAgICAgICAgIGpzICs9IHRvSlMoJ3snLCBjdXJzb3IpO1xuICAgICAgICBpZiggaSA9PT0gX2FyZ3MubGVuZ3RoLTEgJiYgX2FyZ3NbaV0udHlwZSA9PT0gXCJhcmcudmFyYXJnXCIgKVxuICAgICAgICAgICAgKF9hcmdzW2ldIGFzIGFueSkubGFzdCA9IHRydWU7XG5cbiAgICAgICAganMgKz0gYXJnMmpzKF9hcmdzW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBrd19wb3MgIT09IG51bGwpXG4gICAgICAgIGpzICs9IHRvSlMoJ30gPSB7fScsIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIilcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBhcmdzLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmcyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLnZhcmFyZ1wiICkge1xuICAgICAgICBpZiggKG5vZGUgYXMgYW55KS5sYXN0KVxuICAgICAgICAgICAgcmV0dXJuIHRvSlMoYC4uLiR7bm9kZS52YWx1ZX1gLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4gdG9KUyggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCBcIltdXCIpLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLmt3YXJnXCIgKVxuICAgICAgICByZXR1cm4gdG9KUyggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCBcInt9XCIpLCBjdXJzb3IpO1xuXG4gICAgaWYobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICBpZiggdmFsdWUucmVzdWx0X3R5cGUgPT09ICdqc2ludCcgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gJ2ludCcpXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcjJJbnQodmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIHZhbHVlKSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKVxuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIHJldHVybiB0b0pTKHJgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0gJHtuZXcgQm9keSh0aGlzKX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSAnY2xhc3MuJyArIG5vZGUubmFtZTtcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuYmFzZXMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICBbY29udmVydF9ub2RlKG5vZGUuYmFzZXNbMF0sIGNvbnRleHQpLCBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldXG4gICAgICAgIDogW2NvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIF9jdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGJlZyA6IHN0cmluZ3xBU1ROb2RlICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gPSAke2JlZ307ICR7dGhpcy52YWx1ZX0gPCAke2VuZH07ICR7dGhpcy52YWx1ZX0gKz0gJHtpbmNyfSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGgtMSk7XG5cbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gb2YgdGhpcy5jaGlsZHJlblswXSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7IC8vIGlmL2VsaWYgY29uZGl0aW9uLlxuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YDtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYCwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IEJvZHkodGhpcyk7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRyeSR7Ym9keX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MudHJ5YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS50cnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE86IGltcHJvdmUuLi5cbiAgICBpZiggdGhpcy52YWx1ZSAhPT0gbnVsbCApXG4gICAgICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUuX19pbml0X18uY2FsbF9zdWJzdGl0dXRlKHRoaXMsIC4uLnRoaXMuY2hpbGRyZW4uc2xpY2UoMSkpLCBjdXJzb3IpO1xuXG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlPy5zdGFydHNXaXRoKFwiY2xhc3MuXCIpIClcbiAgICAgICAganMrPSB0b0pTKFwibmV3IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19KGAsIGN1cnNvcik7XG5cbiAgICAvL1RPRE86IGFyZ3Mgbm9kZS4uLlxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBuYW1lID0gbm9kZS5mdW5jLmlkO1xuICAgIGxldCAgIHJldF90eXBlID0gbnVsbDtcblxuICAgIC8vIGlzIGEgY2xhc3MgP1xuICAgIGNvbnN0IGtsYXNzID0gbmFtZTJTVHlwZShub2RlLmZ1bmMuaWQpOyAvL1RPRE8uLi5cbiAgICBpZigga2xhc3MgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldF90eXBlID0ga2xhc3MuX19pbml0X18ucmV0dXJuX3R5cGUoKTtcbiAgICBlbHNlIHtcbiAgICAgICAgLy9UT0RPIGZjdCBpbiBvYmplY3QuLi5cblxuICAgICAgICBjb25zdCBmY3RfdHlwZSA9IG5hbWUyU1R5cGUoIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25hbWVdISApO1xuICAgICAgICByZXRfdHlwZSA9IGZjdF90eXBlLl9fY2FsbF9fLnJldHVybl90eXBlKCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbm9kZS5hcmdzIC8vIGZjdCBjYWxsIGFyZ3VtZW50LlxuICAgIC8vIFRPRE86IHRoaXMgP1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZ1bmN0aW9ucy5jYWxsXCIsIHJldF90eXBlLCBrbGFzcywgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5mdW5jLCBjb250ZXh0ICksXG4gICAgICAgIC4uLm5vZGUuYXJncy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyBhcmdzMmpzLCBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gJyc7XG4gICAgaWYoICEgdGhpcy50eXBlLmVuZHNXaXRoKFwiKG1ldGgpXCIpIClcbiAgICAgICAganMgKz0gdG9KUygnZnVuY3Rpb24gJywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhcIntcIiwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgaWYoIGJvZHlbYm9keS5sZW5ndGggLSAxXS50eXBlICE9PSBcImtleXdvcmRzLnJldHVyblwiICkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IFwicmV0dXJuIG51bGw7XCJcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCkgKyB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYXJncywgY29udmVydF9ib2R5IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IF9uYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zb2xlLndhcm4obm9kZSk7XG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuXG4gICAgY29uc3QgaXNNZXRob2QgPSBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIjtcbiAgICBsZXQgZmN0X3JldHVybl90eXBlID0gXCJrbGFzc1wiOyAvL1RPRE8uLi5cblxuICAgIGlmKCAhIGlzTWV0aG9kICkge1xuXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IG5vZGUucmV0dXJucz8uaWQ7XG5cbiAgICAgICAgaWYoIGZjdF9yZXR1cm5fdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICAvL1RPRE86IGxvb3BzLCB0cnksIGlmXG4gICAgICAgICAgICBsZXQgcmV0dXJucyA9IG5vZGUuYm9keS5maWx0ZXIoIChuOmFueSkgPT4gbi5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJSZXR1cm5cIiApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggcmV0dXJucy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgZmN0X3JldHVybl90eXBlID0gJ05vbmUnO1xuICAgICAgICAgICAgLy8gVE9ETzogcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGZjdF9yZXR1cm5fdHlwZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBgKCkgLT4gJHtmY3RfcmV0dXJuX3R5cGV9YDtcblxuXG4gICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLm5hbWVdID0gc2lnbmF0dXJlO1xuICAgICAgICAgICAgX25hbWUyU1R5cGVbc2lnbmF0dXJlXSA9IHtcbiAgICAgICAgICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gZmN0X3JldHVybl90eXBlLFxuICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6ICgpID0+IFwiXCIgLyogYXJndW1lbnQgcGFyc2luZyAqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgbGV0IG9sZF9jb250ZXh0ID0gY29udGV4dDtcbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG4gICAgY29uc3QgYm9keSA9IGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIHJlY3Vyc2l2ZS5cbiAgICBpZiggZmN0X3JldHVybl90eXBlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIC8vVE9ETzogbG9vcCwgaWYsIHRyeVxuICAgICAgICBsZXQgcmV0ID0gYm9keS5jaGlsZHJlbi5maWx0ZXIoIG4gPT4gbi50eXBlID09PSBcImtleXdvcmRzLnJldHVyblwiKTtcbiAgICAgICAgXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IHJldFswXS5yZXN1bHRfdHlwZSE7XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYCgpIC0+ICR7ZmN0X3JldHVybl90eXBlfWA7XG5cbiAgICAgICAgICAgIC8vSXNzdWU6IHdoYXQgaWYgb3RoZXIgY29udGV4dCBkdXBsaWNhdGlvbnMgP1xuICAgICAgICAgICAgY29udGV4dCAgICAubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSBzaWduYXR1cmU7XG4gICAgICAgICAgICBvbGRfY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5uYW1lXSA9IHNpZ25hdHVyZTtcbiAgICAgICAgICAgIF9uYW1lMlNUeXBlW3NpZ25hdHVyZV0gPSB7XG4gICAgICAgICAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IGZjdF9yZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAoKSA9PiBcIlwiIC8qIGFyZ3VtZW50IHBhcnNpbmcgKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gXCJmdW5jdGlvbnMuZGVmXCI7XG4gICAgaWYoaXNNZXRob2QpXG4gICAgICAgIHR5cGUgKz0gXCIobWV0aClcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgYm9keVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRnVuY3Rpb25EZWZcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmBfYl8uYXNzZXJ0KCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiQXNzZXJ0XCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkFzc2VydFwiOyIsImZ1bmN0aW9uIGFzc2VydChjb25kOiBib29sZWFuKSB7XG4gICAgaWYoIGNvbmQgKVxuICAgICAgICByZXR1cm47XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXNzZXJ0XG59OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy52YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlWzBdLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMoYCR7dGhpcy52YWx1ZVswXX06ICR7dGhpcy52YWx1ZVsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnQuYWxpYXNcIiwgbnVsbCwgW25vZGUubmFtZSwgbm9kZS5hc25hbWVdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcblxuICAgIGpzICs9IHRvSlMoXCJjb25zdCB7XCIsIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yICk7XG4gICAgICAgIGpzICs9IHRvSlMoIHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvciApO1xuICAgIH1cbiAgICBqcyArPSB0b0pTKFwifSA9IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGlmKHRoaXMudmFsdWUgPT09IG51bGwpXG4gICAgICAgIGpzICs9IHRvSlMoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBqcyArPSB0b0pTKGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt0aGlzLnZhbHVlfVwiKWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydFwiLCBudWxsLCBub2RlLm1vZHVsZSxcbiAgICAgICAgbm9kZS5uYW1lcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjUgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNiBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNyBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInN0cnVjdHMudHVwbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwic3RydWN0cy5saXN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcInN0cnVjdHMuZGljdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJvcGVyYXRvcnMudW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwib3BlcmF0b3JzLmNvbXBhcmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJvb2xlYW5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF84LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU184XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJpbmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzlcblx0fSxcblx0XCJvcGVyYXRvcnMuYXR0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5bXVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzExLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5Bc3NpZ25PcFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTZcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xN1xuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nL0Zvcm1hdHRlZFZhbHVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE4XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOVxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjBcblx0fSxcblx0XCJrZXl3b3Jkcy5yYWlzZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMVxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMlxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydC9hbGlhc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjVcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay90cnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjlcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zM1xuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM0XG5cdH0sXG5cdFwiY2xhc3MuY2xhc3NkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzVcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfOSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjEpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI0KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yOCk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVUeXBlXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX05vbmUgPSB7XG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfTm9uZTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBcImJvb2xcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IENNUE9QU19MSVNULCBnZW5DbXBPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfYm9vbCA9IHtcbiAgICBcbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgWydmbG9hdCcsICdib29sJywgJ2ludCcsICdqc2ludCddKSxcbiAgICBcbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9ib29sOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiJHtcIiwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgaWYoIGNoaWxkLnJlc3VsdF90eXBlID09PSBcInN0clwiKSB7XG5cbiAgICAgICAgICAgIC8vIGg0Y2tcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgICAgICAgICAgZW5kOiBudWxsIGFzIGFueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZC52YWx1ZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICB9IGVsc2UgaWYoY2hpbGQudHlwZSA9PT0gXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZ1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLm5vZGUudmFsdWVzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSm9pbmVkU3RyXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfZmxvYXQgPSB7XG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdmbG9hdCcsXG4gICAgICAgICAgICAgICAgICAgIFsnKionLCAnKicsICcvJywgJysnLCAnLSddLFxuICAgICAgICAgICAgICAgICAgICBbJ2Zsb2F0JywgJ2ludCcsICdqc2ludCcsICdib29sJ10sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdmbG9hdCcsXG4gICAgICAgIFsnLy8nXSxcbiAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnanNpbnQnLCAnYm9vbCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JyxcbiAgICAgICAgWyclJ10sXG4gICAgICAgIFsnZmxvYXQnLCAnaW50JywgJ2pzaW50JywgJ2Jvb2wnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmLCBvdGhlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCdmbG9hdCcsIFsndS4tJ10pLFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFsnZmxvYXQnLCAnYm9vbCcsICdpbnQnLCAnanNpbnQnXSksXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBzdWZmaXggPSBcIlwiO1xuICAgIGxldCB0YXJnZXQgPSAodGhpcyBhcyBhbnkpLmFzO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgIGlmKHRhcmdldCA9PT0gXCJmbG9hdFwiKSB7XG4gICAgICAgIGlmKCB0aGlzLnJlc3VsdF90eXBlID09PSBcImludFwiIClcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuICAgIH1cbiAgICBlbHNlIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgfHwgdGhpcy5yZXN1bHRfdHlwZSA9PT0gXCJpbnRcIiApXG4gICAgICAgIC8vIGlmIGFscmVhZHkgYmlnaW50IGRvIG5vdCBjYXN0IGludG8ganNpbnQgKGxvc3Mgb2YgcHJlY2lzaW9uKS5cbiAgICAgICAgc3VmZml4ID0gXCJuXCI7XG5cbiAgICAvLyAxZSs1NCBzaG91bGQgaGFkIGJlIHN0b3JlZCBhcyBiaWdpbnQuXG4gICAgcmV0dXJuIHRvSlMocmAke3ZhbHVlfSR7c3VmZml4fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBcImludFwiIDogXCJqc2ludFwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuaW50XCIsIHJlYWxfdHlwZSwgdmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBpZF9qc29wLCBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmNvbnN0IFNUeXBlX2ludCA9IHtcblxuICAgIF9faW5pdF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZSwgb3RoZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG5hbWUyU1R5cGUob3RoZXIucmVzdWx0X3R5cGUpPy5fX2ludF9fO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGV9Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuY2FsbF9zdWJzdGl0dXRlKG5vZGUsIG90aGVyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyogKi9cbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2ludCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC8vICcqKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8J1xuICAgICAgICBdLFxuICAgICAgICBbJ2ludCcsICdqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnaW50JywgWycqJ10sIFsnaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBhLCBiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqJywgYik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JywgWycvJ10sIFsnaW50JywgJ2pzaW50JywgJ2Zsb2F0J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzKSA9PiBJbnQyTnVtYmVyKHMsICdmbG9hdCcpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2ludCcsIFsnLy8nXSwgWydpbnQnLCAnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnaW50JywgWyclJ10sIFsnaW50JywgJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoJ2ludCcsXG4gICAgICAgIFsndS4tJ10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ3JlYWwnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgSW50Mk51bWJlcihhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKCdpbnQnLFxuICAgICAgICBbJ34nXSxcbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFsnZmxvYXQnLCAnaW50JywgJ2pzaW50JywgJ2Jvb2wnXSApXG4gICAgLyogKi9cbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9pbnQ7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9qc2ludCA9IHtcblxuICAgIC4uLmdlbkJpbmFyeU9wcygnaW50JyxcbiAgICAgICAgLy8gJyoqJyBhbmQgJyonID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgIFtcbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8JyAvLyBpbiBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgb24gMzJiaXRzXG4gICAgICAgIF0sXG4gICAgICAgIFsnaW50JywgJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2ludCcsIFsnKiddLCBbJ2ludCcsICdqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlLCBhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIE51bWJlcjJJbnQoYSksICcqJywgTnVtYmVyMkludChiKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdmbG9hdCcsIFsnLyddLCBbJ2ludCcsICdqc2ludCcsICdmbG9hdCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnanNpbnQnLCBbJy8vJ10sIFsnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnanNpbnQnLCBbJyUnXSwgWydqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcygnanNpbnQnLFxuICAgICAgICBbJ3UuLSddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2ludCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBOdW1iZXIySW50KGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoJ2ludCcsXG4gICAgICAgIFsnfiddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFsnZmxvYXQnLCAnaW50JywgJ2pzaW50JywgJ2Jvb2wnXSApXG4gICAgLypcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSwqL1xufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2pzaW50OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfc3RyID0ge1xuXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgIFsnc3RyJ10pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhcInN0clwiLCBbXCIrXCJdLCBbXCJzdHJcIl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhcInN0clwiLCBbXCIqXCJdLCBbXCJpbnRcIiwgXCJqc2ludFwiXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlciAgOiB7XCJpbnRcIjogXCJmbG9hdFwifSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggYS5yZXN1bHRfdHlwZSAhPT0gXCJzdHJcIiApXG4gICAgICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmAke2F9LnJlcGVhdCgke2J9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX3N0cjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IE51bWJlcjJJbnQgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoXCJ2YXIgXCIsIGN1cnNvcik7XG5cbiAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHJgID0gJHt0aGlzLmNoaWxkcmVuW2ldfWAsIGN1cnNvcik7XG5cbiAgICBsZXQgcmlnaHRfbm9kZTogYW55ID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aC0xXTtcblxuICAgIGlmKCByaWdodF9ub2RlLnJlc3VsdF90eXBlID09PSBcImpzaW50XCIgJiYgdGhpcy5yZXN1bHRfdHlwZSA9PT0gXCJpbnRcIiApXG4gICAgICAgIHJpZ2h0X25vZGUgPSBOdW1iZXIySW50KHJpZ2h0X25vZGUpO1xuXG4gICAganMgKz0gdG9KUyhyYCA9ICR7cmlnaHRfbm9kZX1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZT8uYW5ub3RhdGlvbj8uaWQ7XG5cbiAgICBpZiggcmVzdWx0X3R5cGUgIT09IHVuZGVmaW5lZCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmVzdWx0X3R5cGUgPSByaWdodF90eXBlO1xuICAgICAgICBpZiggcmlnaHRfdHlwZSA9PT0gXCJqc2ludFwiKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBcImludFwiOyAvLyBwcmV2ZW50cyBpc3N1ZXMuXG4gICAgICAgICAgICAvL1RPRE86IG9ubHkgaWYgYXNzaWduLi4uXG4gICAgfVxuXG4gICAgY29uc3QgaXNNdWx0aVRhcmdldCA9IFwidGFyZ2V0c1wiIGluIG5vZGU7XG4gICAgY29uc3QgdGFyZ2V0cyA9IGlzTXVsdGlUYXJnZXQgPyBub2RlLnRhcmdldHMgOiBbbm9kZS50YXJnZXRdO1xuXG4gICAgY29uc3QgbGVmdHMgPSB0YXJnZXRzLm1hcCggKG46YW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobiwgY29udGV4dCApO1xuXG4gICAgICAgIC8vIGNvdWxkIGJlIGltcHJvdmVkIEkgZ3Vlc3MuXG4gICAgICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcbiAgICBcbiAgICAgICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmKCBsZWZ0X3R5cGUgIT09IG51bGwgJiYgcmlnaHRfdHlwZSAhPT0gbGVmdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC50eXBlICE9PSBcImNsYXNzXCIpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXSA9IHJlc3VsdF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJlc3VsdF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICAuLi5sZWZ0cyxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBBc3NpZ25PcGVyYXRvcnMsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBsZXQgb3AgPSBBc3NpZ25PcGVyYXRvcnNbdGhpcy52YWx1ZV07XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG5cbiAgICBjb25zb2xlLndhcm4ob3AsIHRoaXMudmFsdWUsIGxlZnQucmVzdWx0X3R5cGUsIG1ldGhvZCwgbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSkpO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfT0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG4gICAgICAgIC8qXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zb2xlLndhcm4oXCJhc3NpZ25cIiwgbm9kZSk7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS50YXJnZXQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgbGVmdC5yZXN1bHRfdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdWdBc3NpZ25cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX1bJHt0aGlzLmNoaWxkcmVuWzFdfV1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuW11cIiwgbnVsbCwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUuc2xpY2UsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlN1YnNjcmlwdFwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfS4ke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5hdHRyXCIsIG51bGwsIG5vZGUuYXR0cixcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF0dHJpYnV0ZVwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgY29uc3QgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSlbdGhpcy52YWx1ZV07XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LCByaWdodCksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSByZXZlcnNlZCBvcGVyYXRvclxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIHR5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQmluT3BcIl07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb29yZGl2X2Zsb2F0OiAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoIGEvYiApO1xuICAgIH0sXG4gICAgZmxvb3JkaXZfaW50OiAoYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gYS9iO1xuICAgICAgICBpZiggcmVzdWx0ID4gMCB8fCBhJWIgPT09IDBuKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICByZXR1cm4gLS1yZXN1bHQ7XG4gICAgfSxcbiAgICBtb2RfZmxvYXQ6IDxUPihhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1vZCA9IChhICUgYiArIGIpICUgYjtcbiAgICAgICAgaWYoIG1vZCA9PT0gMCAmJiBiIDwgMCApXG4gICAgICAgICAgICByZXR1cm4gLTA7XG4gICAgICAgIHJldHVybiBtb2Q7XG4gICAgfSxcbiAgICBtb2RfaW50OiA8VD4oYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICByZXR1cm4gKGEgJSBiICsgYikgJSBiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKCBtdWx0aV9qc29wKHRoaXMsIHRoaXMudmFsdWUsIC4uLnRoaXMuY2hpbGRyZW4pICwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS52YWx1ZXMubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICkgKTtcblxuICAgIGNvbnN0IG9wICAgPSBibmFtZTJqc29wW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgIGNvbnN0IHR5cGUgPSBjaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5ib29sZWFuXCIsIHR5cGUsIG9wLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmZ1bmN0aW9uIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZShub2RlOiBBU1ROb2RlLCBsZWZ0OkFTVE5vZGUsIG9wOiBzdHJpbmcsIHJpZ2h0OiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IHJldmVyc2VkID0gZmFsc2U7XG4gICAgY29uc3QgcnR5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBjb25zdCBsdHlwZSA9IGxlZnQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlKT8uW29wXTtcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG4gICAgICAgIFxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgICAgICBpZiggb3AgIT09ICdfX2VxX18nICYmIG9wICE9PSAnX19uZV9fJyApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2x0eXBlfSAke29wfSAke3J0eXBlfSBub3QgaW1wbGVtZW50ZWQhYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGpzb3AgPSBvcCA9PT0gJ19fZXFfXycgPyAnPT09JyA6ICchPT0nO1xuXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwganNvcCwgcmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCByaWdodCwgcmV2ZXJzZWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gJyc7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDAgKVxuICAgICAgICAgICAganMgKz0gdG9KUygnICYmICcsIGN1cnNvcik7XG5cbiAgICAgICAgY29uc3Qgb3AgICAgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICBjb25zdCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlbltpKzFdO1xuXG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzJyApIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICc9PT0nLCByaWdodCksIGN1cnNvcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiggb3AgPT09ICdpcyBub3QnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJyE9PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UT0RPOiBjaGFpbi4uLlxuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyggZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKHRoaXMsIGxlZnQsIG9wLCByaWdodCksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuLypcbi0gZ2UvbGVcbi0gZ3QvbHRcbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBvcHMgPSBub2RlLm9wcy5tYXAoIChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3AgPSBibmFtZTJweW5hbWVbZS5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UuY29uc3RydWN0b3IuJG5hbWV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVmdCAgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0cyA9IG5vZGUuY29tcGFyYXRvcnMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBvcGVyYXRvcnMuY29tcGFyZWAsIFwiYm9vbFwiLCBvcHMsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAuLi5yaWdodHMsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29tcGFyZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgLy9sZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgaWYoIHRoaXMudmFsdWUgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gdG9KUyggdW5hcnlfanNvcCh0aGlzLCAnIScsIEludDJOdW1iZXIobGVmdCwgJ2pzaW50JykgKSwgY3Vyc29yICk7XG5cbiAgICBjb25zdCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUpW3RoaXMudmFsdWVdO1xuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdC8qLCByaWdodCovKSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTk9UX0lNUExFTUVOVEVEIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUub3BlcmFuZCAsIGNvbnRleHQgKTtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgaWYoIG9wID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLnVuYXJ5XCIsIFwiYm9vbFwiLCBcIm5vdFwiLCBbIGxlZnQgXSApO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTk9UIElNUExFTUVOVEVEIScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgXCJOb25lXCIsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIk9iamVjdC5mcmVlemUoW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXSlcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJztcblxuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3ZhbHVlXTtcbiAgICBlbHNlIGlmKHZhbHVlIGluIF9yXykge1xuICAgICAgICBpZiggaXNDbGFzcyhfcl9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7dmFsdWV9YDtcblxuICAgICAgICB2YWx1ZSA9IGBfcl8uJHt2YWx1ZX1gO1xuICAgIH1cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYoICEobmFtZSBpbiBtb2R1bGVzKSApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBtb2R1bGUgb2YgbW9kdWxlc1tuYW1lXSkgeyBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy8ga3dhcmdcbiAgICBsZXQgX2FyZ3MgPSBbLi4ubm9kZS5hcmdzLnBvc29ubHlhcmdzLCAuLi5ub2RlLmFyZ3MuYXJnc107XG4gICAgY29uc3QgZGVmYXVsdHMgPSBbLi4ubm9kZS5hcmdzLmRlZmF1bHRzXTtcblxuICAgIGxldCB2YXJhcmdfaWR4ID0gbnVsbDtcbiAgICBpZiggbm9kZS5hcmdzLnZhcmFyZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhcmFyZ19pZHggPSBfYXJncy5sZW5ndGg7XG4gICAgICAgIF9hcmdzICAgLnB1c2goIG5vZGUuYXJncy52YXJhcmcgKTtcbiAgICAgICAgZGVmYXVsdHMucHVzaCggdW5kZWZpbmVkICk7XG4gICAgfVxuICAgIF9hcmdzLnB1c2goLi4ubm9kZS5hcmdzLmt3b25seWFyZ3MpO1xuICAgIGRlZmF1bHRzLnB1c2goIC4uLm5vZGUuYXJncy5rd19kZWZhdWx0cyApO1xuXG4gICAgY29uc3QgaGFzS1dBcmdzID0gbm9kZS5hcmdzLmt3YXJnICE9PSB1bmRlZmluZWQ7XG4gICAgaWYoIGhhc0tXQXJncyApIHtcbiAgICAgICAgX2FyZ3MucHVzaCggbm9kZS5hcmdzLmt3YXJnICk7XG4gICAgICAgIGRlZmF1bHRzLnB1c2godW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oX2FyZ3MpO1xuICAgIGlmKCBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIilcbiAgICAgICAgX2FyZ3MgPSBfYXJncy5zbGljZSgxKTtcblxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXk8QVNUTm9kZT4oX2FyZ3MubGVuZ3RoKTtcbiAgICBjb25zdCBkb2Zmc2V0ICA9IF9hcmdzLmxlbmd0aCAtIGRlZmF1bHRzLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IGFyZ190eXBlID0gXCJwb3NcIjtcbiAgICAgICAgaWYoIGkgPCBub2RlLmFyZ3MucG9zb25seWFyZ3MubGVuZ3RoKVxuICAgICAgICAgICAgYXJnX3R5cGUgPSBcInBvc29ubHlcIjtcbiAgICAgICAgaWYoIGkgPj0gX2FyZ3MubGVuZ3RoIC0gbm9kZS5hcmdzLmt3b25seWFyZ3MubGVuZ3RoIC0gaGFzS1dBcmdzKVxuICAgICAgICAgICAgYXJnX3R5cGUgPSBcImt3b25seVwiO1xuICAgICAgICBpZiggaSA9PT0gdmFyYXJnX2lkeClcbiAgICAgICAgICAgIGFyZ190eXBlID0gXCJ2YXJhcmdcIjtcbiAgICAgICAgaWYoIGhhc0tXQXJncyAmJiBpID09PSBfYXJncy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgYXJnX3R5cGUgPSBcImt3YXJnXCI7XG4gICAgICAgIGFyZ3NbaV0gPSBjb252ZXJ0X2FyZyhfYXJnc1tpXSwgZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBhcmdfdHlwZSwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2FyZ3NbaV0udmFsdWVdID0gYXJnc1tpXS5yZXN1bHRfdHlwZTtcbiAgICB9XG4gICAgXG4gICAgLy9UT0RPOiBrd2FyZ3NTXG5cbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gX2FyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBfYXJnc1tfYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6c3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGFyZy4ke3R5cGV9YCwgcmVzdWx0X3R5cGUsIG5vZGUuYXJnLCBjaGlsZHJlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0cG9zKG5vZGU6IGFueVtdKSB7XG5cbiAgICBsZXQgYmVnID0gbm9kZVswXTtcbiAgICBsZXQgZW5kID0gbm9kZVtub2RlLmxlbmd0aC0xXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgIC8vY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubzogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcblxuICAgIGlmKCBsaW5lLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkV4cHJcIilcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG4gICAgLypcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlOyovXG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dHxudWxsID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5sb2NhbF92YXJpYWJsZXMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfdmFyaWFibGVzfVxuICAgIH1cbiAgICB0eXBlO1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0W2ldLnR5cGUpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgYnVpbGRNb2R1bGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiX19TQlJZVEhPTl9fXCIsIGAke2pzY29kZX1cXG5yZXR1cm4gX19leHBvcnRlZF9fO2ApO1xuICAgIH1cblxuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IHRoaXMuYnVpbGRNb2R1bGUoanNjb2RlLCBhc3QpKHRoaXMpO1xuICAgIH1cblxuICAgIGdldE1vZHVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWRbbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0QVNURm9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2ZpbGVuYW1lXTsgLy9UT0RPIG1vZHVsZW5hbWU/XG4gICAgfVxuXG4gICAgZ2V0IF9yXygpIHtcbiAgICAgICAgcmV0dXJuIF9yXztcbiAgICB9XG4gICAgZ2V0IF9iXygpIHtcbiAgICAgICAgcmV0dXJuIF9iXztcbiAgICB9XG59XG5cbiIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuaW50ZXJmYWNlIElBU1ROb2RlICB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIGltcGxlbWVudHMgSUFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlRmN0U3VicyB9IGZyb20gXCIuL1NUeXBlXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBjb25zdCBibmFtZTJweW5hbWUgPSB7XG4gICAgXCJVU3ViXCI6IFwiX19uZWdfX1wiLFxuICAgIFwiTm90XCIgOiBcIm5vdFwiLFxuXG4gICAgXCJQb3dcIiA6IFwiX19wb3dfX1wiLFxuXG4gICAgXCJNdWx0XCIgICAgOiBcIl9fbXVsX19cIixcbiAgICBcIkRpdlwiICAgICA6IFwiX190cnVlZGl2X19cIixcbiAgICBcIkZsb29yRGl2XCI6IFwiX19mbG9vcmRpdl9fXCIsXG4gICAgXCJNb2RcIiAgICAgOiBcIl9fbW9kX19cIixcblxuICAgIFwiQWRkXCIgICAgIDogXCJfX2FkZF9fXCIsXG4gICAgXCJTdWJcIiAgICAgOiBcIl9fc3ViX19cIixcblxuICAgIFwiSXNcIiAgICAgIDogXCJpc1wiLFxuICAgIFwiSXNOb3RcIiAgIDogXCJpcyBub3RcIixcbiAgICBcIkVxXCIgICAgICA6IFwiX19lcV9fXCIsXG4gICAgXCJOb3RFcVwiICAgOiBcIl9fbmVfX1wiLFxuXG4gICAgXCJHdFwiICAgICAgOiBcIl9fZ3RfX1wiLFxuICAgIFwiR3RFXCIgICAgIDogXCJfX2dlX19cIixcbiAgICBcIkx0XCIgICAgICA6IFwiX19sdF9fXCIsXG4gICAgXCJMdEVcIiAgICAgOiBcIl9fbGVfX1wiLFxuXG4gICAgXCJJbnZlcnRcIiAgOiBcIl9fbm90X19cIixcblxuICAgIFwiQml0T3JcIiAgIDogXCJfX29yX19cIixcbiAgICBcIkJpdFhvclwiICA6IFwiX194b3JfX1wiLFxuICAgIFwiQml0QW5kXCIgIDogXCJfX2FuZF9fXCIsXG4gICAgXCJSU2hpZnRcIiAgOiBcIl9fcnNoaWZ0X19cIixcbiAgICBcIkxTaGlmdFwiICA6IFwiX19sc2hpZnRfX1wiLFxufVxuXG5leHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19ycG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19ybXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19ydHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19fcmZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19ybW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19fcmFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19yc3ViX18nLFxuXG4gICAgJ19fZXFfXycgICAgIDogJ19fZXFfXycsXG4gICAgJ19fbmVfXycgICAgIDogJ19fbmVfXycsXG5cbiAgICAnX19sdF9fJyAgICAgOiAnX19ndF9fJyxcbiAgICAnX19ndF9fJyAgICAgOiAnX19sdF9fJyxcbiAgICAnX19sZV9fJyAgICAgOiAnX19nZV9fJyxcbiAgICAnX19nZV9fJyAgICAgOiAnX19sZV9fJyxcblxuICAgICdfX25vdF9fJyAgICA6ICdfX3Jub3RfXycsXG4gICAgJ19fb3JfXycgICAgIDogJ19fcm9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX3JhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19fcnhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19ybHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX3Jyc2hpZnRfXycsXG59XG5cbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbmV4cG9ydCBjb25zdCBKU09wZXJhdG9ycyA9IFtcbiAgICBbJ3UuLSddLFxuICAgIFsnKionXSwgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJysnLCAnLSddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnPCcsICc8PScsICc+PScsICc+J10sXG4gICAgWyc9PScsICchPScsICc9PT0nLCAnIT09J10sXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJ14nXSwgIC8vVE9ET1xuICAgIFsnfCddLCAgLy9UT0RPXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWyc9J10gLyogZXQgdG91cyBsZXMgZMOpcml2w6lzICovIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIC8vIGV0Yy5cbl07XG5cbi8qXG5odHRwczovL2RvY3MucHl0aG9uLm9yZy8zL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjY2FsbGFibGVcblxuLT4gY2xhc3Nlc1xuYm9vbCgpXG5mbG9hdCgpXG5pbnQoKVxuc3RyKClcbmJ5dGVhcnJheSgpIFtVaW50OEFycmF5XSAoUlcpXG5ieXRlcygpICAgICBbP10gICAgICAgICAgKFJPKSA8LSBubyB0eXBlcyBpbiBKUy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0gVWludDhBcnJheSB3aXRoIGZsYWcgPyBmcmVlemUoKSBbSlMgdW5zYWZlXVxuICAgICAgICAgICAgYlwiZVxceEZGXCIgaW5zdGVhZCBvZiBbMTAxLDEwMV0sIGV0Yy4gKDMyIDw9IGJ5dCA8PSAxMjYpXG50eXBlKClcbmxpc3QoKSAgICAgIFtBcnJheV1cbnR1cGxlKCkgICAgIFtPYmplY3QuZnJvemVuKEFycmF5KV1cblxuc2V0KCkgICAgICAgLy8gcmVsaWVzIG9uIGhhc2goKS4uLiA9PiBzZXRbbGl0ZXJhbHNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gc2V0KCkgLyA8LSBKUyBzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgID0+IGJ5dGVzL2J5dGVhcnJheS9ldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBTZXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBJbnRlcm5hbCBrZXlzKCkgc2V0IFtyZWNvbXB1dGUgaGFzaCB3aGVuIGFkZC9yZW1vdmVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW50ZXJuYWxseSBzdG9yZWQgYXMgTWFwKGhhc2gsIHZhbHVlKSAoPylcbmZyb3plbnNldCgpICAgICAgICAgICAgPT4gZXh0ZW5kcyBzZXQgdG8gcmVwbGFjZSBtb2RpZmllcnMuXG5cbmRpY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzdHJdIGFzIE9iamVjdC5jcmVhdGUobnVsbCkgKyAoYW5kIHB1cmUgSlNPYmogYXMgZGljdFtzdHJdIClcbiAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgTWFwKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBTZXQoaGFzaCkgLyBNYXAoaGFzaCwga2V5KSAvIE1hcChrZXksIGhhc2gpID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQvc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IE1hcChrZXksIHZhbHVlKVxuXG5vYmplY3QoKVxuY29tcGxleCgpXG5tZW1vcnl2aWV3KCkgICAgICAgICAgICA9PiBBcnJheUJ1ZmZlciA/XG5cbi0+IHByaW50XG5hc2NpaSgpXG5iaW4oKVxuaGV4KClcbm9jdCgpXG5yZXByKClcbmhhc2goKVxuXG4tPiBtYXRoc1xuYWJzKClcbmRpdm1vZCgpXG5wb3coKVxucm91bmQoKVxuXG4tPiBsaXN0c1xuYWxsKClcbmFueSgpXG5maWx0ZXIoKVxubWFwKClcbm1heCgpXG5taW4oKVxuc3VtKClcbmxlbigpXG5lbnVtZXJhdGUoKVxucmV2ZXJzZWQoKVxuc2xpY2UoKVxuc29ydGVkKClcbnppcCgpXG5cbi0+IGl0ZXJcbnJhbmdlKClcbmFpdGVyKClcbml0ZXIoKVxuYW5leHQoKVxubmV4dCgpXG5cbi0+IHN0clxub3JkKClcbmNocigpXG5mb3JtYXQoKVxucHJpbnQoKVxuZlwiXCJcblxuY2FsbGFibGUoKVxuY2xhc3NtZXRob2QoKVxuc3RhdGljbWV0aG9kKClcbnByb3BlcnR5KClcbnN1cGVyKClcbmlzaW5zdGFuY2UoKVxuaXNzdWJjbGFzcygpXG5kZWxhdHRyKClcbmdldGF0dHIoKVxuaGFzYXR0cigpXG5zZXRhdHRyKClcbmRpcigpXG5cbmV2YWwoKVxuZXhlYygpXG5jb21waWxlKClcbmJyZWFrcG9pbnQoKVxuXG5nbG9iYWxzKClcbmxvY2FscygpXG52YXJzKClcbl9faW1wb3J0X18oKVxuXG5pZCgpXG4gICAgLT4gb24tZGVtYW5kIHdlYWtyZWYgP1xuXG5oZWxwKClcbmlucHV0KClcbm9wZW4oKVxuXG4qL1xuXG4vKlxudW5hcnlcbi0gcG9zICh1bmFyeSArKVxuXG4tIGJvb2xcbi0gZmxvYXRcbi0gaW50XG4tIHN0clxuLSByZXByXG5cbi0gYWJzXG4tIGNlaWxcbi0gZmxvb3Jcbi0gcm91bmRcbi0gdHJ1bmNcblxuYmluYXJ5XG4tIHBvdy9ycG93XG4tIGRpdm1vZC9yZGl2bW9kXG5cbmNsYXNzXG4tIGNsYXNzXG4tIG5ld1xuLSBpbml0XG4tIGluaXRfc3ViY2xhc3NcblxuLSBzdWJjbGFzc2hvb2sgLy8gX19pc2luc3RhbmNlY2hlY2tfXyBcblxuLSBkaXJcbi0gZGVsYXR0clxuLSBzZXRhdHRyXG4tIGdldGF0dHJpYnV0ZVxuXG4tIGRvY1xuLSBmb3JtYXRcbi0gZ2V0bmV3YXJnc1xuLSBoYXNoXG4tIGluZGV4ICg/KVxuLSBzaXplb2ZcbiovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogQVNUTm9kZSwgdGFyZ2V0ID0gXCJmbG9hdFwiKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX211bF9fJyB8fCBhLnZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gYS5jaGlsZHJlblsxXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgaWYoICAgIChsdHlwZSA9PT0gJ2ludCcgfHwgbHR5cGUgPT09ICdqc2ludCcpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09ICdpbnQnIHx8IHJ0eXBlID09PSAnanNpbnQnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09ICdpbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBcImZsb2F0XCIgKVxuICAgICAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xuXG4gICAgLy8gaW50IC0+IGpzaW50IGNhc3QgaXMgZmFjdWx0YXRpdmUuLi5cbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE51bWJlcjJJbnQoYTogQVNUTm9kZSkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSAnaW50JztcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gXCJpbnRcIjtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgQmlnSW50KCR7YX0pYDtcbn1cblxubGV0IEpTT3BlcmF0b3JzUHJpb3JpdHk6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbmZvcihsZXQgaSA9IDA7IGkgPCBKU09wZXJhdG9ycy5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBKU09wZXJhdG9ycy5sZW5ndGggLSBpO1xuICAgIGZvcihsZXQgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIC4uLnZhbHVlczogQVNUTm9kZVtdKSB7XG5cbiAgICBjb25zdCBmaXJzdCA9IHZhbHVlc1swXTtcbiAgICBpZihmaXJzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUfFJJR0hUO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmKGxhc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7Zmlyc3R9YDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKVxuICAgICAgICByZXN1bHQgPSByYCR7cmVzdWx0fSAmJiAke3ZhbHVlc1tpXX1gO1xuXG4gICAgaWYoIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHthfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlfGFueSwgb3A6IHN0cmluZywgYjogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtvcH0ke2F9YDtcblxuICAgIGlmKG9wID09PSAnLScpXG4gICAgICAgIG9wID0gJ3UuLSc7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCAoZGlyZWN0aW9uICYgTEVGVCkgJiYgcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIGNhbGxfc3Vic3RpdHV0ZT86IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiBhbnlcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlblVuYXJ5T3BzKHJldF90eXBlICA6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHMgICAgICAgOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA9IChhKSA9PiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5VbmFyeU9wc19PcHRzID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiByZXRfdHlwZTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJ3UuLScpXG4gICAgICAgICAgICBvcCA9ICctJztcblxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUgPz89IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5CaW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X290aGVyICAgPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIGNhbGxfc3Vic3RpdHV0ZSA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIChub2RlOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyAgICA9IG5vZGUucmVzdWx0X3R5cGUhO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb252ZXJ0W3NyY107XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IGltcHJvdmU6XG4gICAgICAgIGlmKCBzcmMgPT09IFwiaW50XCIpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBcImludFwiIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufVxuXG5jb25zdCBpZEZjdCA9IDxUPihhOiBUKSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKHJldF90eXBlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiBzdHJpbmdbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBzdHJpbmcpID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyByZXRfdHlwZSA6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggY2FsbF9zdWJzdGl0dXRlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGNvbnZfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IGlkRmN0ICYmIGNhbGxfc3Vic3RpdHV0ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkNtcE9wcyggIG9wcyAgICAgICA6IHJlYWRvbmx5IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlciAgID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30gKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBzdHJpbmcpID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyBcImJvb2xcIiA6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG5cbiAgICAgICAgbGV0IGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvcCA9IG9wO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGNvbnZlcnRfc2VsZihzZWxmKTtcbiAgICAgICAgICAgIGxldCBiID0gY29udl9vdGhlcihvdGhlcik7XG4gICAgICAgICAgICBpZiggcmV2ZXJzZWQgKSB7XG4gICAgICAgICAgICAgICAgW2EsYl3CoD0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYucmVzdWx0X3R5cGUgPT09IG90aGVyLnJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb3AgPSBjb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCBjb3AsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGNhbGxfc3Vic3RpdHV0ZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udl9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5cblxuZXhwb3J0IGNsYXNzIEJvZHkge1xuXG4gICAgbm9kZTtcbiAgICBwcmludF9icmFja2V0O1xuICAgIGlkeDtcblxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IEFTVE5vZGUsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaWR4ID0gbm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgLy9UT0RPIHNlYXJjaCBib2R5Li4uXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMucHJpbnRfYnJhY2tldCA9IHByaW50X2JyYWNrZXQ7XG4gICAgfVxuXG4gICAgdG9KUyhjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgICAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldClcbiAgICAgICAgICAgIGpzKz1cIntcIjtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmlkeF07Ly9ib2R5OiBBU1ROb2RlW107XG4gICAgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldCkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvcik7XG4gICAgICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBib2R5LmpzY29kZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG59IiwiXG5leHBvcnQgdHlwZSBTVHlwZVN1YnMgPSB7XG4gICAgdHlwZSAgICAgICA/OiBzdHJpbmcsXG4gICAgc3Vic3RpdHV0ZSA/OiAoLi4uYXJnczogYW55W10pID0+IGFueVxufTtcbmV4cG9ydCB0eXBlIFNUeXBlRmN0U3VicyA9IHtcbiAgICB0eXBlICAgICAgICAgICAgPzogc3RyaW5nLCAvLyBvciBtYW55IHR5cGVzLi4uIFtdXG4gICAgY2FsbF9zdWJzdGl0dXRlID86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LFxuICAgIHJldHVybl90eXBlICAgICAgOiAoLi4uYXJnczogc3RyaW5nW10pID0+IHN0cmluZyAvLyBmb3IgbWV0aG9kcy9mdW5jdGlvbnMuLi5cbn07XG5leHBvcnQgdHlwZSBTVHlwZSA9IHN0cmluZyB8IFNUeXBlU3VicyB8IFNUeXBlRmN0U3VicztcbmV4cG9ydCB0eXBlIFNUeXBlT2JqID0gUmVjb3JkPHN0cmluZywgU1R5cGU+O1xuXG5leHBvcnQgY29uc3QgU1R5cGVfTk9UX0lNUExFTUVOVEVEID0gXCJOb3RJbXBsZW1lbnRlZFR5cGVcIjsiLCJpbXBvcnQgU1R5cGVfZmxvYXQgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX2ludCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX3N0ciBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX05vbmUgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlXCI7XG5pbXBvcnQgU1R5cGVfYm9vbCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9qc2ludCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludFwiO1xuaW1wb3J0IHsgU1R5cGUgfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG4vL2V4cG9ydCB0eXBlIFNUeXBlTmFtZSA9IGtleW9mIHR5cGVvZiBuYW1lMlNUeXBlO1xuXG5leHBvcnQgY29uc3QgX25hbWUyU1R5cGU6IFJlY29yZDxzdHJpbmcsU1R5cGVPYmo+ID0ge1xuICAgIFwiZmxvYXRcIiAgIDogU1R5cGVfZmxvYXQsXG4gICAgXCJpbnRcIiAgICAgOiBTVHlwZV9pbnQsXG4gICAgXCJqc2ludFwiICAgOiBTVHlwZV9qc2ludCxcbiAgICBcImJvb2xcIiAgICA6IFNUeXBlX2Jvb2wsXG4gICAgXCJzdHJcIiAgICAgOiBTVHlwZV9zdHIsXG4gICAgXCJOb25lVHlwZVwiOiBTVHlwZV9Ob25lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuYW1lMlNUeXBlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBfbmFtZTJTVHlwZVtuYW1lXTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsImJpbmFyeV9qc29wIiwiTnVtYmVyMkludCIsIkJvZHkiLCJhc3QyanMiLCJhc3QiLCJleHBvcnRlZCIsImpzIiwiZmlsZW5hbWUiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsIm5vZGVzIiwiYXN0bm9kZTJqcyIsInR5cGUiLCJwdXNoIiwidmFsdWUiLCJ0b0pTIiwibmV3bGluZSIsImpvaW4iLCJyIiwic3RyIiwiYXJncyIsImxlbmd0aCIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJwcmludF9icmFja2V0Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJqc2NvZGUiLCJlbmQiLCJhcmdzMmpzIiwiX2FyZ3MiLCJrd19wb3MiLCJjb3VudCIsImxhc3QiLCJhcmcyanMiLCJyZXN1bHRfdHlwZSIsImluZGVudF9sZXZlbCIsImJhc2VfaW5kZW50IiwiaW5jbHVkZXMiLCJpbmRlbnQiLCJwYWRTdGFydCIsImJhc2UiLCJDb250ZXh0IiwiY29udmVydF9ib2R5IiwiY29udmVydF9ub2RlIiwiY29udmVydCIsImNvbnRleHQiLCJsb2NhbF92YXJpYWJsZXMiLCJuYW1lIiwiYmFzZXMiLCJFcnJvciIsImJyeXRob25fbmFtZSIsIl9jdXJzb3IiLCJfY29udGV4dCIsImJlZyIsImluY3IiLCJ0YXJnZXQiLCJpZCIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsIm1hcCIsIm4iLCJrZXl3b3JkIiwib2Zmc2V0IiwibGlzdHBvcyIsImlmYmxvY2siLCJjb25kIiwidGVzdCIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiaCIsImZpbHRlcl9zdGFjayIsInN0YWNrIiwiZmlsdGVyIiwiZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3BvcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJzbGljZSIsImZjdF9uYW1lIiwicG9zIiwiaW5kZXhPZiIsImRlYnVnX3ByaW50X2V4Y2VwdGlvbiIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiX3Jhd19lcnJfIiwic3RhY2tfc3RyIiwiZXhjZXB0aW9uX3N0ciIsImxvZyIsIl9faW5pdF9fIiwiY2FsbF9zdWJzdGl0dXRlIiwic3RhcnRzV2l0aCIsIm5hbWUyU1R5cGUiLCJyZXRfdHlwZSIsImtsYXNzIiwidW5kZWZpbmVkIiwicmV0dXJuX3R5cGUiLCJmY3RfdHlwZSIsIl9fY2FsbF9fIiwiZW5kc1dpdGgiLCJjb252ZXJ0X2FyZ3MiLCJfbmFtZTJTVHlwZSIsImlzTWV0aG9kIiwiZmN0X3JldHVybl90eXBlIiwicmV0dXJucyIsInNpZ25hdHVyZSIsInN1YnN0aXR1dGVfY2FsbCIsIm9sZF9jb250ZXh0IiwicmV0IiwiYXJnIiwiYXNzZXJ0IiwiYXNuYW1lIiwibW9kdWxlIiwibmFtZXMiLCJleGMiLCJQeXRob25FcnJvciIsInB5dGhvbl9leGNlcHRpb24iLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJSVU5USU1FXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIkFTVF9DT05WRVJUXzE0IiwiQVNUMkpTXzE0IiwiQVNUX0NPTlZFUlRfMTUiLCJBU1QySlNfMTUiLCJBU1RfQ09OVkVSVF8xNiIsIkFTVDJKU18xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJSVU5USU1FXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiUlVOVElNRV8yNCIsIkFTVF9DT05WRVJUXzI1IiwiQVNUMkpTXzI1IiwiQVNUX0NPTlZFUlRfMjYiLCJBU1QySlNfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiUlVOVElNRV8yOCIsIkFTVF9DT05WRVJUXzI5IiwiQVNUMkpTXzI5IiwiQVNUX0NPTlZFUlRfMzAiLCJBU1QySlNfMzAiLCJBU1RfQ09OVkVSVF8zMSIsIkFTVDJKU18zMSIsIkFTVF9DT05WRVJUXzMyIiwiQVNUMkpTXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiUlVOVElNRSIsImFzc2lnbiIsIl9iXyIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsIlNUeXBlX05vbmUiLCJDTVBPUFNfTElTVCIsImdlbkNtcE9wcyIsIlNUeXBlX2Jvb2wiLCJjaGlsZCIsInZhbHVlcyIsImdlbkJpbmFyeU9wcyIsImdlblVuYXJ5T3BzIiwiU1R5cGVfZmxvYXQiLCJjb252ZXJ0X290aGVyIiwic2VsZiIsIm90aGVyIiwic3VmZml4IiwiYXMiLCJOdW1iZXIiLCJyZWFsX3R5cGUiLCJpZF9qc29wIiwiSW50Mk51bWJlciIsInVuYXJ5X2pzb3AiLCJTVHlwZV9pbnQiLCJtZXRob2QiLCJfX2ludF9fIiwiYSIsImIiLCJvcHRpIiwiY29udmVydF9zZWxmIiwiU1R5cGVfanNpbnQiLCJTVHlwZV9zdHIiLCJyaWdodF9ub2RlIiwicmlnaHQiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJsZWZ0IiwibGVmdF90eXBlIiwiQXNzaWduT3BlcmF0b3JzIiwiU1R5cGVfTk9UX0lNUExFTUVOVEVEIiwib3AiLCJibmFtZTJweW5hbWUiLCJhdHRyIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJmbG9vcmRpdl9mbG9hdCIsIk1hdGgiLCJmbG9vciIsImZsb29yZGl2X2ludCIsInJlc3VsdCIsIm1vZF9mbG9hdCIsIm1vZCIsIm1vZF9pbnQiLCJtdWx0aV9qc29wIiwiYm5hbWUyanNvcCIsImZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSIsInJldmVyc2VkIiwicnR5cGUiLCJsdHlwZSIsImpzb3AiLCJvcHMiLCJyaWdodHMiLCJjb21wYXJhdG9ycyIsIm9wZXJhbmQiLCJleHByIiwia2V5cyIsImVsdHMiLCJfcl8iLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImJyeXRob25fbm9kZSIsImVycm9yIiwibGluZXMiLCJtIiwiY29udmVydF9saW5lIiwidmlydF9ub2RlIiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwicG9zb25seWFyZ3MiLCJkZWZhdWx0cyIsInZhcmFyZ19pZHgiLCJ2YXJhcmciLCJrd29ubHlhcmdzIiwia3dfZGVmYXVsdHMiLCJoYXNLV0FyZ3MiLCJrd2FyZyIsImRvZmZzZXQiLCJhcmdfdHlwZSIsImNvbnZlcnRfYXJnIiwiZmlyc3QiLCJkZWZ2YWwiLCJwYXJlbnRfY29udGV4dCIsImNyZWF0ZSIsImxpbmVfb2Zmc2V0IiwiY2hhciIsInBhcnNlRXhwcmVzc2lvbiIsImFzdDJqc19jb252ZXJ0IiwicGFyc2VTeW1ib2wiLCJiZWdpbl9zdHIiLCJjYXIiLCJzeW1ib2wiLCJhc3QyanNfbGl0ZXJhbHNfaW50IiwicGFyc2VOdW1iZXIiLCJhc3QyanNfbGl0ZXJhbHNfc3RyIiwicGFyc2VTdHJpbmciLCJwYXJzZVRva2VuIiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiYnJvd3NlciIsImdsb2JhbFRoaXMiLCJidWlsZE1vZHVsZSIsIkZ1bmN0aW9uIiwicnVuSlNDb2RlIiwiZ2V0TW9kdWxlcyIsImdldE1vZHVsZSIsIl92YWx1ZSIsIkJpbmFyeU9wZXJhdG9ycyIsImpzb3AycHlvcCIsIkpTT3BlcmF0b3JzIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwicGFyZW50X29wIiwicGFyZW50X29wX2RpciIsImRpcmVjdGlvbiIsImN1cl9wcmlvcml0eSIsInBhcmVudF9wcmlvcml0eSIsImNoZWNrX3ByaW9yaXR5IiwibyIsInB5b3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJzcmMiLCJpZEZjdCIsIm90aGVyX3R5cGUiLCJjb252X290aGVyIiwiY3MiLCJyY3MiLCJyZXZlcnNlIiwiY29wIiwicHkyYXN0X2Zhc3QiXSwic291cmNlUm9vdCI6IiJ9