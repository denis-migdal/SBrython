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
    for(let i = 0; i < args.children.length; ++i){
        if (i !== 0) {
            js += ",";
            ++cursor.col;
        }
        js += arg2js(args.children[i], cursor);
    }
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
    let _args = node.args.args;
    if (context.type === "class") _args = _args.slice(1);
    const args = new Array(_args.length);
    const defaults = node.args.defaults;
    const doffset = _args.length - defaults.length;
    for(let i = 0; i < _args.length; ++i){
        args[i] = convert_arg(_args[i], defaults[i - doffset], context);
        context.local_variables[args[i].value] = args[i].result_type;
    }
    //TODO: kwargsS
    let first;
    let last;
    if (args.length !== 0) {
        first = node.args.args[0];
        last = node.args.args[node.args.args.length - 1];
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
function convert_arg(node, defval, context) {
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
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "arg", result_type, node.arg, children);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q05FLE9BQU9FLEdBQUcsSUFBSTtRQUNsQjtRQUVBd0IsS0FBS0UsTUFBTSxHQUFHO1lBQ1ZILE9BQU9BO1lBQ1BJLEtBQU87Z0JBQUMsR0FBRzdCLE1BQU07WUFBQTtRQUNyQjtRQUVBLE9BQU9GO0lBQ1g7QUFDSjs7Ozs7Ozs7Ozs7Ozs7O0FDL0JPLE1BQU1rUSx3QkFBd0IscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkU7QUFDSjtBQUNBO0FBQ0U7QUFDQTtBQUNNO0FBR2hFLGtEQUFrRDtBQUUzQyxNQUFNMUksY0FBdUM7SUFDaEQsU0FBWTRHLHlFQUFXQTtJQUN2QixPQUFZVyx1RUFBU0E7SUFDckIsU0FBWU8sNkVBQVdBO0lBQ3ZCLFFBQVl2Qix3RUFBVUE7SUFDdEIsT0FBWXdCLHVFQUFTQTtJQUNyQixZQUFZM0Isd0VBQVVBO0FBQzFCLEVBQUM7QUFFTSxTQUFTN0csV0FBV2hFLElBQVk7SUFDbkMsT0FBT3lFLFdBQVcsQ0FBQ3pFLEtBQUs7QUFDNUI7Ozs7Ozs7U0NyQkE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNQO0FBRStDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvb2JqZWN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JpbmFyeU9wZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JvZHkudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9TVHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgSW50Mk51bWJlciwgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG4gICAgY29uc3QgZXhwb3J0ZWQgPSBbXTsgLy8gbW92ZTJhc3QgZ2VuID9cblxuXHRsZXQganMgPSBgLy8jIHNvdXJjZVVSTD0ke2FzdC5maWxlbmFtZX1cXG5gO1xuXHQgICAganMrPSBgY29uc3Qge19yXywgX2JffSA9IF9fU0JSWVRIT05fXztcXG5gO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMywgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdC5ub2Rlcykge1xuXG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gXCJmdW5jdGlvbnMuZGVmXCIpXG4gICAgICAgICAgICBleHBvcnRlZC5wdXNoKG5vZGUudmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiO1wiLCBjdXJzb3IpXG5cbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcblxuXHRyZXR1cm4ganM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGV8Qm9keSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEJvZHkgKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9KUyhjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlXG4gICAgICAgIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCAmJiAhIEFycmF5LmlzQXJyYXkoc3RyKSApIHsgLy8gZm9yIHB5MmFzdF9mYXN0XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDAsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYocHJpbnRfYnJhY2tldClcbiAgICAgICAganMrPVwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYXJnczJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCIoXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBhcmdzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKSB7XG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgICAgICsrY3Vyc29yLmNvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGpzICs9IGFyZzJqcyhhcmdzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGFyZ3MuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZzJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgaWYobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICBsZXQgdmFsdWU6IGFueSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgIGlmKCB2YWx1ZS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JyAmJiBub2RlLnJlc3VsdF90eXBlID09PSAnaW50JylcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyMkludCh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRvSlMoIGJpbmFyeV9qc29wKG5vZGUsIG5vZGUudmFsdWUsICc9JywgdmFsdWUpLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudmFsdWU7XG4gICAgY3Vyc29yLmNvbCArPSBqcy5sZW5ndGg7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdsaW5lKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaW5kZW50X2xldmVsOiBudW1iZXIgPSAwKSB7XG5cbiAgICBsZXQgYmFzZV9pbmRlbnQgPSBub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuICAgIGlmKCBbXCJjb250cm9sZmxvd3MuZWxzZVwiLCBcImNvbnRyb2xmbG93cy5lbGlmXCIsIFwiY29udHJvbGZsb3dzLmNhdGNoYmxvY2tcIl0uaW5jbHVkZXMobm9kZS50eXBlKSApIHtcbiAgICAgICAtLWJhc2VfaW5kZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGluZGVudCA9IGluZGVudF9sZXZlbCo0ICsgYmFzZV9pbmRlbnQ7XG5cbiAgICArK2N1cnNvci5saW5lO1xuICAgIGN1cnNvci5jb2wgPSBpbmRlbnQ7XG4gICAgcmV0dXJuIFwiXFxuXCIgKyBcIlwiLnBhZFN0YXJ0KGluZGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3Rub2RlMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgZW5kICA6IG51bGwgYXMgYW55XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS50b0pTIShjdXJzb3IpO1xuXG4gICAgbm9kZS5qc2NvZGUuZW5kID0gey4uLmN1cnNvcn1cbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgYmFzZTogc3RyaW5nfEFTVE5vZGUgPSBcIl9yXy5vYmplY3RcIjtcbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDIpXG4gICAgICAgIGJhc2UgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgcmV0dXJuIHRvSlMocmBjbGFzcyAke3RoaXMudmFsdWV9IGV4dGVuZHMgJHtiYXNlfSAke25ldyBCb2R5KHRoaXMpfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5uYW1lXSA9ICdjbGFzcy4nICsgbm9kZS5uYW1lO1xuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV1cbiAgICAgICAgOiBbY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNsYXNzLmNsYXNzZGVmXCIsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2xhc3NEZWZcIjsiLCJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgX2N1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGUgID0gXCIwblwiO1xuICAgICAgICBsZXQgaW5jcjogc3RyaW5nfEFTVE5vZGUgPSBcIjFuXCI7XG4gICAgICAgIGxldCBlbmQgID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBiZWcgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgZW5kID0gdGhpcy5jaGlsZHJlblsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAzKVxuICAgICAgICAgICAgaW5jciA9IHRoaXMuY2hpbGRyZW5bMl07XG5cbiAgICAgICAgbGV0IGpzID0gdG9KUyhyYGZvcih2YXIgJHt0aGlzLnZhbHVlfSA9ICR7YmVnfTsgJHt0aGlzLnZhbHVlfSA8ICR7ZW5kfTsgJHt0aGlzLnZhbHVlfSArPSAke2luY3J9KWAsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aC0xKTtcblxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gdG9KUyhyYGZvcih2YXIgJHt0aGlzLnZhbHVlfSBvZiB0aGlzLmNoaWxkcmVuWzBdKWAsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1t0YXJnZXRdID0gbnVsbDsgLy9UT0RPXG5cbiAgICBpZiggbm9kZS5pdGVyLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkNhbGxcIiAmJiBub2RlLml0ZXIuZnVuYy5pZCA9PT0gXCJyYW5nZVwiKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgICAgICAuLi4gbm9kZS5pdGVyLmFyZ3MubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvclwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuaXRlciwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vaWZcbiAgICBsZXQga2V5d29yZCA9IFwiaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2UgaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2VcIjtcblxuICAgIGxldCBqcyA9IHRvSlMoa2V5d29yZCwgY3Vyc29yKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBpZigga2V5d29yZCAhPT0gXCJlbHNlXCIpIHsgLy8gaWYvZWxpZiBjb25kaXRpb24uXG4gICAgICAgIG9mZnNldCA9IDE7XG4gICAgICAgIGpzICs9IHRvSlMocmAoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCBvZmZzZXQpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIFwiaWZibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUuaWZibG9jayA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZCA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIG5vZGUuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICBub2RlLmlmYmxvY2sgPSBcImlmXCI7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgbm9kZVxuICAgIF07XG5cbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgJiYgXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkge1xuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuICAgICAgICBjdXIuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICAgICAgY3VyLmlmYmxvY2sgPSBcImVsaWZcIjtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjdXIpO1xuICAgIH1cbiAgICBpZiggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggIT09IDAgKSB7IC8vIGVsc2VcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiSWZcIixcbiAgICAgICAgICAgIGlmYmxvY2s6IFwiZWxzZVwiLFxuICAgICAgICAgICAgYm9keSAgIDogY3VyLm9yZWxzZSxcbiAgICAgICAgICAgIC4uLmxpc3Rwb3MoY3VyLm9yZWxzZSksXG4gICAgICAgICAgICAvLyBiZWNhdXNlIHJlYXNvbnMuLi5cbiAgICAgICAgICAgIGxpbmVubyAgICA6IGN1ci5vcmVsc2VbMF0ubGluZW5vIC0gMSxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICAgICAgXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCBjYyA9IGFzdG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW47XG4gICAgICAgIGFzdG5vZGUuY2hpbGRyZW5baV0ucHljb2RlLmVuZCA9IGNjW2NjLmxlbmd0aC0xXS5weWNvZGUuZW5kO1xuICAgIH1cblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS50cnlcIixcbiAgICAgICAgICAgIC4uLm5vZGVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkuY2F0Y2hibG9ja1wiLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhub2RlLmhhbmRsZXJzKSxcbiAgICAgICAgICAgIGhhbmRsZXJzOiBub2RlLmhhbmRsZXJzXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgXSk7XG5cbiAgICAvL2ZpeCBweWNvZGUuXG4gICAgYXN0bm9kZS5jaGlsZHJlblswXS5weWNvZGUuZW5kID0gYXN0bm9kZS5jaGlsZHJlblsxXS5weWNvZGUuc3RhcnQ7XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgaWYoX2Vycl8gaW5zdGFuY2VvZiAke3RoaXMuY2hpbGRyZW5bMF19KXtgLCBjdXJzb3IpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMrPSBgbGV0ICR7dGhpcy52YWx1ZX0gPSBfZXJyXztgO1xuICAgICAgICBqcys9IGJvZHkyanModGhpcywgY3Vyc29yLCAxLCBmYWxzZSk7XG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hgLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudHlwZSwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiY2F0Y2goX3Jhd19lcnJfKXtcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBqcys9IHRvSlMoXCJjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIj8gX3Jhd19lcnJfLnB5dGhvbl9leGNlcHRpb25cIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI6IG5ldyBfcl8uSlNFeGNlcHRpb24oX3Jhd19lcnJfKTtcIiwgY3Vyc29yKTtcbiAgICAgICAgLy8gZGVidWdcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IHRvSlMoXCJfYl8uZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBmb3IobGV0IGhhbmRsZXIgb2YgdGhpcy5jaGlsZHJlbilcbiAgICAgICAganMrPSB0b0pTKGhhbmRsZXIsIGN1cnNvcik7XG5cbiAgICBqcys9IHRvSlMoXCJlbHNleyB0aHJvdyBfcmF3X2Vycl8gfVwiLCBjdXJzb3IpOyAvL1RPRE8uLi5cblxuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApO1xuICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGJsb2NrYCwgbnVsbCwgbnVsbCxcbiAgICAgICAgbm9kZS5oYW5kbGVycy5tYXAoIChoOmFueSkgPT4gY29udmVydF9ub2RlKGgsIGNvbnRleHQpKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkuY2F0Y2hibG9ja1wiOyIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gZmlsdGVyX3N0YWNrKHN0YWNrOiBzdHJpbmdbXSkge1xuICByZXR1cm4gc3RhY2suZmlsdGVyKCBlID0+IGUuaW5jbHVkZXMoJ2JyeXRob25fJykgKTsgLy9UT0RPIGltcHJvdmVzLi4uXG59XG5cblxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogQVNUTm9kZVtdLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxBU1ROb2RlIHtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBzdGFja2xpbmVbMV0sIHN0YWNrbGluZVsyXSkhO1xufVxuXG5leHBvcnQgdHlwZSBTdGFja0xpbmUgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl07XG5cbi8vVE9ETzogY29udmVydFxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrMmFzdG5vZGVzKHN0YWNrOiBTdGFja0xpbmVbXSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZVtdIHtcbiAgcmV0dXJuIHN0YWNrLm1hcCggZSA9PiBzdGFja2xpbmUyYXN0bm9kZShlLCBzYikgKTtcbn1cblxuLy9UT0RPOiBhZGQgZmlsZS4uLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3N0YWNrKHN0YWNrOiBhbnksIHNiOiBTQnJ5dGhvbik6IFN0YWNrTGluZVtdIHtcblxuXG4gIFxuICAgIHN0YWNrID0gc3RhY2suc3BsaXQoXCJcXG5cIik7XG5cbiAgICBjb25zdCBpc1Y4ID0gc3RhY2tbMF09PT0gXCJFcnJvclwiOyBcblxuICAgIHJldHVybiBmaWx0ZXJfc3RhY2soc3RhY2spLm1hcCggbCA9PiB7XG5cbiAgICAgIGxldCBbXywgX2xpbmUsIF9jb2xdID0gbC5zcGxpdCgnOicpO1xuICBcbiAgICAgIGlmKCBfY29sW19jb2wubGVuZ3RoLTFdID09PSAnKScpIC8vIFY4XG4gICAgICAgIF9jb2wgPSBfY29sLnNsaWNlKDAsLTEpO1xuICBcbiAgICAgIGxldCBsaW5lID0gK19saW5lIC0gMjtcbiAgICAgIGxldCBjb2wgID0gK19jb2w7XG5cbiAgICAgIC0tY29sOyAvL3N0YXJ0cyBhdCAxLlxuXG4gICAgICBsZXQgZmN0X25hbWUhOiBzdHJpbmc7XG4gICAgICBpZiggaXNWOCApIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZihcIiBcIiwgNyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSg3LCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiZXZhbFwiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCBmaWxlbmFtZS5cbiAgICAgICAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgICAgY29sICs9IG5vZGUudmFsdWUubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIGNvbnN0IHN0YWNrX3N0ciA9IHN0YWNrLm1hcCggKGwsaSkgPT4gYEZpbGUgXCJbZmlsZV1cIiwgbGluZSAke25vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvblxufTsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGNvbnN0IGJvZHkgPSBuZXcgQm9keSh0aGlzKTtcblxuICAgIHJldHVybiB0b0pTKHJgdHJ5JHtib2R5fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy50cnlgLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LnRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgd2hpbGUoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy53aGlsZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETzogaW1wcm92ZS4uLlxuICAgIGlmKCB0aGlzLnZhbHVlICE9PSBudWxsIClcbiAgICAgICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZS5fX2luaXRfXy5jYWxsX3N1YnN0aXR1dGUodGhpcywgLi4udGhpcy5jaGlsZHJlbi5zbGljZSgxKSksIGN1cnNvcik7XG5cblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU/LnN0YXJ0c1dpdGgoXCJjbGFzcy5cIikgKVxuICAgICAgICBqcys9IHRvSlMoXCJuZXcgXCIsIGN1cnNvcik7XG4gICAgXG4gICAganMgKz0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0oYCwgY3Vyc29yKTtcblxuICAgIC8vVE9ETzogYXJncyBub2RlLi4uXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSlcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCIpXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG4gICAgbGV0ICAgcmV0X3R5cGUgPSBudWxsO1xuXG4gICAgLy8gaXMgYSBjbGFzcyA/XG4gICAgY29uc3Qga2xhc3MgPSBuYW1lMlNUeXBlKG5vZGUuZnVuYy5pZCk7IC8vVE9ETy4uLlxuICAgIGlmKCBrbGFzcyAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0X3R5cGUgPSBrbGFzcy5fX2luaXRfXy5yZXR1cm5fdHlwZSgpO1xuICAgIGVsc2Uge1xuICAgICAgICAvL1RPRE8gZmN0IGluIG9iamVjdC4uLlxuXG4gICAgICAgIGNvbnN0IGZjdF90eXBlID0gbmFtZTJTVHlwZSggY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbmFtZV0hICk7XG4gICAgICAgIHJldF90eXBlID0gZmN0X3R5cGUuX19jYWxsX18ucmV0dXJuX3R5cGUoKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgcmV0X3R5cGUsIGtsYXNzLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IGFyZ3MyanMsIGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSAnJztcbiAgICBpZiggISB0aGlzLnR5cGUuZW5kc1dpdGgoXCIobWV0aClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKCdmdW5jdGlvbiAnLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcblxuICAgIGpzICs9IGFyZ3MyanModGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxLCBmYWxzZSk7XG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXS5jaGlsZHJlbjtcbiAgICBpZiggYm9keVtib2R5Lmxlbmd0aCAtIDFdLnR5cGUgIT09IFwia2V5d29yZHMucmV0dXJuXCIgKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gXCJyZXR1cm4gbnVsbDtcIlxuICAgIH1cblxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKSArIHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9hcmdzLCBjb252ZXJ0X2JvZHkgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgX25hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnNvbGUud2Fybihub2RlKTtcbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIGNvbnRleHQpO1xuXG5cbiAgICBjb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiO1xuICAgIGxldCBmY3RfcmV0dXJuX3R5cGUgPSBcImtsYXNzXCI7IC8vVE9ETy4uLlxuXG4gICAgaWYoICEgaXNNZXRob2QgKSB7XG5cbiAgICAgICAgZmN0X3JldHVybl90eXBlID0gbm9kZS5yZXR1cm5zPy5pZDtcblxuICAgICAgICBpZiggZmN0X3JldHVybl90eXBlID09PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIC8vVE9ETzogbG9vcHMsIHRyeSwgaWZcbiAgICAgICAgICAgIGxldCByZXR1cm5zID0gbm9kZS5ib2R5LmZpbHRlciggKG46YW55KSA9PiBuLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIlJldHVyblwiICk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCByZXR1cm5zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICBmY3RfcmV0dXJuX3R5cGUgPSAnTm9uZSc7XG4gICAgICAgICAgICAvLyBUT0RPOiByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiggZmN0X3JldHVybl90eXBlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAoKSAtPiAke2ZjdF9yZXR1cm5fdHlwZX1gO1xuXG5cbiAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSBzaWduYXR1cmU7XG4gICAgICAgICAgICBfbmFtZTJTVHlwZVtzaWduYXR1cmVdID0ge1xuICAgICAgICAgICAgICAgIF9fY2FsbF9fOiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBmY3RfcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKCkgPT4gXCJcIiAvKiBhcmd1bWVudCBwYXJzaW5nICovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBsZXQgb2xkX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImZjdFwiLCBjb250ZXh0KTtcbiAgICBjb25zdCBib2R5ID0gY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpO1xuXG4gICAgLy8gcmVjdXJzaXZlLlxuICAgIGlmKCBmY3RfcmV0dXJuX3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgLy9UT0RPOiBsb29wLCBpZiwgdHJ5XG4gICAgICAgIGxldCByZXQgPSBib2R5LmNoaWxkcmVuLmZpbHRlciggbiA9PiBuLnR5cGUgPT09IFwia2V5d29yZHMucmV0dXJuXCIpO1xuICAgICAgICBcbiAgICAgICAgZmN0X3JldHVybl90eXBlID0gcmV0WzBdLnJlc3VsdF90eXBlITtcblxuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBgKCkgLT4gJHtmY3RfcmV0dXJuX3R5cGV9YDtcblxuICAgICAgICAgICAgLy9Jc3N1ZTogd2hhdCBpZiBvdGhlciBjb250ZXh0IGR1cGxpY2F0aW9ucyA/XG4gICAgICAgICAgICBjb250ZXh0ICAgIC5sb2NhbF92YXJpYWJsZXNbbm9kZS5uYW1lXSA9IHNpZ25hdHVyZTtcbiAgICAgICAgICAgIG9sZF9jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLm5hbWVdID0gc2lnbmF0dXJlO1xuICAgICAgICAgICAgX25hbWUyU1R5cGVbc2lnbmF0dXJlXSA9IHtcbiAgICAgICAgICAgICAgICBfX2NhbGxfXzoge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gZmN0X3JldHVybl90eXBlLFxuICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6ICgpID0+IFwiXCIgLyogYXJndW1lbnQgcGFyc2luZyAqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IGFyZyBvZiBhcmdzLmNoaWxkcmVuKVxuICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHR5cGUgPSBcImZ1bmN0aW9ucy5kZWZcIjtcbiAgICBpZihpc01ldGhvZClcbiAgICAgICAgdHlwZSArPSBcIihtZXRoKVwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBib2R5XG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYF9iXy5hc3NlcnQoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJBc3NlcnRcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnZhbHVlWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWVbMF0sIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhgJHt0aGlzLnZhbHVlWzBdfTogJHt0aGlzLnZhbHVlWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydC5hbGlhc1wiLCBudWxsLCBbbm9kZS5uYW1lLCBub2RlLmFzbmFtZV0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAganMgKz0gdG9KUyhcImNvbnN0IHtcIiwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IgKTtcbiAgICAgICAganMgKz0gdG9KUyggdGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yICk7XG4gICAgfVxuICAgIGpzICs9IHRvSlMoXCJ9ID0gXCIsIGN1cnNvcik7XG4gICAgXG4gICAgaWYodGhpcy52YWx1ZSA9PT0gbnVsbClcbiAgICAgICAganMgKz0gdG9KUyhcIl9fU0JSWVRIT05fXy5nZXRNb2R1bGVzKClcIiwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIGpzICs9IHRvSlMoYF9fU0JSWVRIT05fXy5nZXRNb2R1bGUoXCIke3RoaXMudmFsdWV9XCIpYCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0XCIsIG51bGwsIG5vZGUubW9kdWxlLFxuICAgICAgICBub2RlLm5hbWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiSW1wb3J0XCIsIFwiSW1wb3J0RnJvbVwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yYWlzZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmV4YywgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJhaXNlXCI7IiwiZXhwb3J0IGNsYXNzIFB5dGhvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgcmVhZG9ubHkgcHl0aG9uX2V4Y2VwdGlvbjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHl0aG9uX2V4Y2VwdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHB5dGhvbl9leGNlcHRpb24uX3Jhd19lcnJfID0gdGhpcztcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNCBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNSBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNSBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI2IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNiBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNyBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI3IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM0IGZyb20gXCIuL2NvbW1lbnRzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNCBmcm9tIFwiLi9jb21tZW50cy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzUgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzXCI7XG5cblxuY29uc3QgTU9EVUxFUyA9IHtcblx0XCJzeW1ib2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8wLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18wXG5cdH0sXG5cdFwic3RydWN0cy50dXBsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzFcblx0fSxcblx0XCJzdHJ1Y3RzLmxpc3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yXG5cdH0sXG5cdFwic3RydWN0cy5kaWN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcInJldHVyblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzRcblx0fSxcblx0XCJwYXNzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcIm9wZXJhdG9ycy51bmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJvcGVyYXRvcnMuY29tcGFyZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJvcGVyYXRvcnMuYm9vbGVhblwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJvcGVyYXRvcnMuYmluYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5hdHRyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEwXG5cdH0sXG5cdFwib3BlcmF0b3JzLltdXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwib3BlcmF0b3JzLkFzc2lnbk9wXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTNcblx0fSxcblx0XCJsaXRlcmFscy5zdHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTVcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNlxuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE3XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMThcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE5XG5cdH0sXG5cdFwibGl0ZXJhbHMuTm9uZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMFxuXHR9LFxuXHRcImtleXdvcmRzLnJhaXNlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIxXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIyXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0L2FsaWFzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIzXG5cdH0sXG5cdFwia2V5d29yZHMuYXNzZXJ0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI0XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmRlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNVxuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI2XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLndoaWxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI3XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI4XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL3RyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaGJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMwXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMxXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzJcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMzXG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzRcblx0fSxcblx0XCJjbGFzcy5jbGFzc2RlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNVxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV85KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yMSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjQpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI4KTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSxjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHx8ICEoXCJfX2NsYXNzX19cIiBpbiBub2RlLnZhbHVlKVxuICAgICAgICAgICAgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18uX19xdWFsbmFtZV9fICE9PSBcIk5vbmVUeXBlXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5Ob25lXCIsIFwiTm9uZVR5cGVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfTm9uZSA9IHtcbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9Ob25lOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkNtcE9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9ib29sID0ge1xuICAgIFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbJ2Zsb2F0JywgJ2Jvb2wnLCAnaW50JywgJ2pzaW50J10pLFxuICAgIFxufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2Jvb2w7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCIke1wiLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvcm1hdHRlZFZhbHVlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFwic3RyXCIpIHtcblxuICAgICAgICAgICAgLy8gaDRja1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgICAgICAgICBlbmQ6IG51bGwgYXMgYW55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLnZhbHVlLCBjdXJzb3IpO1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlID09PSBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBcImZsb2F0XCIsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9mbG9hdCA9IHtcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JyxcbiAgICAgICAgICAgICAgICAgICAgWycqKicsICcqJywgJy8nLCAnKycsICctJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnZmxvYXQnLCAnaW50JywgJ2pzaW50JywgJ2Jvb2wnXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JyxcbiAgICAgICAgWycvLyddLFxuICAgICAgICBbJ2Zsb2F0JywgJ2ludCcsICdqc2ludCcsICdib29sJ10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnZmxvYXQnLFxuICAgICAgICBbJyUnXSxcbiAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnanNpbnQnLCAnYm9vbCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYsIG90aGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoJ2Zsb2F0JywgWyd1Li0nXSksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgWydmbG9hdCcsICdib29sJywgJ2ludCcsICdqc2ludCddKSxcbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9mbG9hdDsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IHN1ZmZpeCA9IFwiXCI7XG4gICAgbGV0IHRhcmdldCA9ICh0aGlzIGFzIGFueSkuYXM7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYodGFyZ2V0ID09PSBcImZsb2F0XCIpIHtcbiAgICAgICAgaWYoIHRoaXMucmVzdWx0X3R5cGUgPT09IFwiaW50XCIgKVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpOyAvLyByZW1vdmUgdXNlbGVzcyBwcmVjaXNpb24uXG4gICAgfVxuICAgIGVsc2UgaWYoIHRhcmdldCA9PT0gXCJpbnRcIiB8fCB0aGlzLnJlc3VsdF90eXBlID09PSBcImludFwiIClcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBiaWdpbnQgZG8gbm90IGNhc3QgaW50byBqc2ludCAobG9zcyBvZiBwcmVjaXNpb24pLlxuICAgICAgICBzdWZmaXggPSBcIm5cIjtcblxuICAgIC8vIDFlKzU0IHNob3VsZCBoYWQgYmUgc3RvcmVkIGFzIGJpZ2ludC5cbiAgICByZXR1cm4gdG9KUyhyYCR7dmFsdWV9JHtzdWZmaXh9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdmFsdWUgPSBub2RlLnZhbHVlO1xuXG4gICAgaWYodmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gPT09IFwiaW50XCIpXG4gICAgICAgIHZhbHVlID0gdmFsdWUudmFsdWU7XG5cbiAgICBpZiggdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJiaWdpbnRcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHJlYWxfdHlwZSA9IHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiA/IFwiaW50XCIgOiBcImpzaW50XCI7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgcmVhbF90eXBlLCB2YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMsIGlkX2pzb3AsIEludDJOdW1iZXIsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuY29uc3QgU1R5cGVfaW50ID0ge1xuXG4gICAgX19pbml0X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlLCBvdGhlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gbmFtZTJTVHlwZShvdGhlci5yZXN1bHRfdHlwZSk/Ll9faW50X187XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZX0uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUobm9kZSwgb3RoZXIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKiAqL1xuICAgIC4uLmdlbkJpbmFyeU9wcygnaW50JyxcbiAgICAgICAgW1xuICAgICAgICAgICAgLy8gJyoqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICAgICAgJyoqJywgJysnLCAnLScsXG4gICAgICAgICAgICAnJicsICd8JywgJ14nLCAnPj4nLCAnPDwnXG4gICAgICAgIF0sXG4gICAgICAgIFsnaW50JywgJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnanNpbnQnOiAnaW50J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdpbnQnLCBbJyonXSwgWydpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGEsIGIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyonLCBiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnZmxvYXQnLCBbJy8nXSwgWydpbnQnLCAnanNpbnQnLCAnZmxvYXQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHMpID0+IEludDJOdW1iZXIocywgJ2Zsb2F0JyksXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnaW50JywgWycvLyddLCBbJ2ludCcsICdqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7XCJqc2ludFwiOiBcImludFwifSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdpbnQnLCBbJyUnXSwgWydpbnQnLCAnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcygnaW50JyxcbiAgICAgICAgWyd1Li0nXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAncmVhbCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBJbnQyTnVtYmVyKGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoJ2ludCcsXG4gICAgICAgIFsnfiddLFxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnanNpbnQnLCAnYm9vbCddIClcbiAgICAvKiAqL1xufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2ludDsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyLCBOdW1iZXIySW50LCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX2pzaW50ID0ge1xuXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdpbnQnLFxuICAgICAgICAvLyAnKionIGFuZCAnKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgW1xuICAgICAgICAgICAgJyoqJywgJysnLCAnLScsXG4gICAgICAgICAgICAnJicsICd8JywgJ14nLCAnPj4nLCAnPDwnIC8vIGluIEpTIGJpdCBvcGVyYXRpb25zIGFyZSBvbiAzMmJpdHNcbiAgICAgICAgXSxcbiAgICAgICAgWydpbnQnLCAnanNpbnQnXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHNlbGYpID0+IE51bWJlcjJJbnQoc2VsZiksXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcygnaW50JywgWycqJ10sIFsnaW50JywgJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGUsIGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgTnVtYmVyMkludChhKSwgJyonLCBOdW1iZXIySW50KGIpICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JywgWycvJ10sIFsnaW50JywgJ2pzaW50JywgJ2Zsb2F0J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdqc2ludCcsIFsnLy8nXSwgWydqc2ludCddLFxuICAgICAgICB7XG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKCdqc2ludCcsIFsnJSddLCBbJ2pzaW50J10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKCdqc2ludCcsXG4gICAgICAgIFsndS4tJ10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnaW50JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIE51bWJlcjJJbnQoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcygnaW50JyxcbiAgICAgICAgWyd+J10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHNlbGYpID0+IE51bWJlcjJJbnQoc2VsZilcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnanNpbnQnLCAnYm9vbCddIClcbiAgICAvKlxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LCovXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfanNpbnQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBpZiggdGhpcy52YWx1ZVswXSA9PT0gJ1wiJylcbiAgICAgICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbiAgICByZXR1cm4gdG9KUyhyYFwiJHt0aGlzLnZhbHVlfVwiYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBcInN0clwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHN9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9zdHIgPSB7XG5cbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgWydzdHInXSksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFwic3RyXCIsIFtcIitcIl0sIFtcInN0clwiXSksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFwic3RyXCIsIFtcIipcIl0sIFtcImludFwiLCBcImpzaW50XCJdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyICA6IHtcImludFwiOiBcImZsb2F0XCJ9LFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCBhLnJlc3VsdF90eXBlICE9PSBcInN0clwiIClcbiAgICAgICAgICAgICAgICAgICAgW2EsYl0gPSBbYixhXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByYCR7YX0ucmVwZWF0KCR7Yn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfc3RyOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlMocmAgPSAke3RoaXMuY2hpbGRyZW5baV19YCwgY3Vyc29yKTtcblxuICAgIGxldCByaWdodF9ub2RlOiBhbnkgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuXG4gICAgaWYoIHJpZ2h0X25vZGUucmVzdWx0X3R5cGUgPT09IFwianNpbnRcIiAmJiB0aGlzLnJlc3VsdF90eXBlID09PSBcImludFwiIClcbiAgICAgICAgcmlnaHRfbm9kZSA9IE51bWJlcjJJbnQocmlnaHRfbm9kZSk7XG5cbiAgICBqcyArPSB0b0pTKHJgID0gJHtyaWdodF9ub2RlfWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB0eXBlID0gXCJvcGVyYXRvcnMuPVwiO1xuXG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgbGV0IHJpZ2h0X3R5cGU6IHN0cmluZ3xudWxsID0gcmlnaHQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlPy5hbm5vdGF0aW9uPy5pZDtcblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdF90eXBlICE9PSByaWdodF90eXBlICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgfVxuICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgIGlmKCByaWdodF90eXBlID09PSBcImpzaW50XCIpXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IFwiaW50XCI7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgLy8gY291bGQgYmUgaW1wcm92ZWQgSSBndWVzcy5cbiAgICAgICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV07XG4gICAgICAgICAgICAgICAgaWYoIGxlZnRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSBsZWZ0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdID0gcmVzdWx0X3R5cGU7XG4gICAgICAgICAgICAgICAgdHlwZSArPSBcIihpbml0KVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgcmVzdWx0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEFzc2lnbk9wZXJhdG9ycywgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGxldCBvcCA9IEFzc2lnbk9wZXJhdG9yc1t0aGlzLnZhbHVlXTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcblxuICAgIGNvbnNvbGUud2FybihvcCwgdGhpcy52YWx1ZSwgbGVmdC5yZXN1bHRfdHlwZSwgbWV0aG9kLCBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKSk7XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgYSA9IGEgKyBiXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9PSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcbiAgICAgICAgLypcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlKHJpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LCByaWdodCksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnNvbGUud2FybihcImFzc2lnblwiLCBub2RlKTtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLnRhcmdldCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCBsZWZ0LnJlc3VsdF90eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF1Z0Fzc2lnblwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfVske3RoaXMuY2hpbGRyZW5bMV19XWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5bXVwiLCBudWxsLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5zbGljZSwgY29udGV4dClcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiU3Vic2NyaXB0XCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19LiR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmF0dHJcIiwgbnVsbCwgbm9kZS5hdHRyLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBjb25zdCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKVt0aGlzLnZhbHVlXTtcblxuICAgIHJldHVybiB0b0pTKCBtZXRob2QuY2FsbF9zdWJzdGl0dXRlKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTk9UX0lNUExFTUVOVEVEIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcFwiXTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZmxvb3JkaXZfZmxvYXQ6IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vciggYS9iICk7XG4gICAgfSxcbiAgICBmbG9vcmRpdl9pbnQ6IChhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhL2I7XG4gICAgICAgIGlmKCByZXN1bHQgPiAwIHx8IGElYiA9PT0gMG4pXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIHJldHVybiAtLXJlc3VsdDtcbiAgICB9LFxuICAgIG1vZF9mbG9hdDogPFQ+KGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbW9kID0gKGEgJSBiICsgYikgJSBiO1xuICAgICAgICBpZiggbW9kID09PSAwICYmIGIgPCAwIClcbiAgICAgICAgICAgIHJldHVybiAtMDtcbiAgICAgICAgcmV0dXJuIG1vZDtcbiAgICB9LFxuICAgIG1vZF9pbnQ6IDxUPihhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAoYSAlIGIgKyBiKSAlIGI7XG4gICAgfVxufSIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbXVsdGlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoIG11bHRpX2pzb3AodGhpcywgdGhpcy52YWx1ZSwgLi4udGhpcy5jaGlsZHJlbikgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmNvbnN0IGJuYW1lMmpzb3AgPSB7XG4gICAgJ0FuZCc6ICcmJicsXG4gICAgJ09yJyA6ICd8fCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLnZhbHVlcy5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKSApO1xuXG4gICAgY29uc3Qgb3AgICA9IGJuYW1lMmpzb3Bbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJvb2xlYW5cIiwgdHlwZSwgb3AsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCb29sT3BcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUpPy5bb3BdO1xuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcblxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgICAgIGlmKCBvcCAhPT0gJ19fZXFfXycgJiYgb3AgIT09ICdfX25lX18nIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bHR5cGV9ICR7b3B9ICR7cnR5cGV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcblxuICAgICAgICAgICAgY29uc3QganNvcCA9IG9wID09PSAnX19lcV9fJyA/ICc9PT0nIDogJyE9PSc7XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBqc29wLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZlcnNlZCA9IHRydWU7XG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2QuY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSAnJztcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCApXG4gICAgICAgICAgICBqcyArPSB0b0pTKCcgJiYgJywgY3Vyc29yKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJz09PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnIT09JywgcmlnaHQpLCBjdXJzb3IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvL1RPRE86IGNoYWluLi4uXG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgb3AsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG4vKlxuLSBnZS9sZVxuLSBndC9sdFxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IGJuYW1lMnB5bmFtZVtlLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICAgICAgaWYoIG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5jb25zdHJ1Y3Rvci4kbmFtZX0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZWZ0ICAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHRzID0gbm9kZS5jb21wYXJhdG9ycy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy5jb21wYXJlYCwgXCJib29sXCIsIG9wcyxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIC4uLnJpZ2h0cyxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAvL2xldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBpZiggdGhpcy52YWx1ZSA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiB0b0pTKCB1bmFyeV9qc29wKHRoaXMsICchJywgSW50Mk51bWJlcihsZWZ0LCAnanNpbnQnKSApLCBjdXJzb3IgKTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSlbdGhpcy52YWx1ZV07XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LyosIHJpZ2h0Ki8pLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiggb3AgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgXCJib29sXCIsIFwibm90XCIsIFsgbGVmdCBdICk7XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKCk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT1QgSU1QTEVNRU5URUQhJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLnVuYXJ5XCIsIHR5cGUsIG9wLCBbIGxlZnQgXSApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlVuYXJ5T3BcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRvSlMoXCJyZXR1cm4gbnVsbFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMocmByZXR1cm4gJHt0aGlzLmNoaWxkcmVuWzBdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBpZihub2RlLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBcIk5vbmVcIiwgbnVsbCk7XG5cbiAgICBjb25zdCBleHByID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBleHByLnJlc3VsdF90eXBlLCBudWxsLCBbZXhwcl0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmV0dXJuXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJ7XCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrPTIpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5baV19OiAke3RoaXMuY2hpbGRyZW5baSsxXX1gLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXkobm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGRyZW5bMippXSAgID0gY29udmVydF9ub2RlKG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW5bMippKzFdID0gY29udmVydF9ub2RlKG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmRpY3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIGNoaWxkcmVuXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkRpY3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIltcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIl1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTGlzdFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiT2JqZWN0LmZyZWV6ZShbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5saXN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlLCBjdXJzb3IpOyAvL1RPRE9cbn0iLCJpbXBvcnQgX3JfIGZyb20gXCIuLi8uLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBpc0NsYXNzKF86IHVua25vd24pIHtcbiAgICAvLyBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUyNjU1OS90ZXN0aW5nLWlmLXNvbWV0aGluZy1pcy1hLWNsYXNzLWluLWphdmFzY3JpcHRcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoXyk/LnByb3RvdHlwZT8ud3JpdGFibGUgPT09IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIHZhbHVlID09PSAnc2VsZicpXG4gICAgICAgIHZhbHVlID0gJ3RoaXMnO1xuXG4gICAgZWxzZSBpZiggdmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdmFsdWVdO1xuICAgIGVsc2UgaWYodmFsdWUgaW4gX3JfKSB7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgX3JfXSkgKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBgY2xhc3MuJHt2YWx1ZX1gO1xuXG4gICAgICAgIHZhbHVlID0gYF9yXy4ke3ZhbHVlfWA7XG4gICAgfVxuXG4gICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzeW1ib2xcIiwgcmVzdWx0X3R5cGUsIHZhbHVlKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5cbmV4cG9ydCB0eXBlIEFTVCA9IHtcbiAgICBub2RlczogQVNUTm9kZVtdLFxuICAgIGZpbGVuYW1lOiBzdHJpbmdcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgKHR5cGVvZiBDT1JFX01PRFVMRVMpW2tleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdW10+ID0ge31cblxuZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcblxuICAgIGNvbnN0IG1vZHVsZSA9IENPUkVfTU9EVUxFU1ttb2R1bGVfbmFtZSBhcyBrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXTtcblxuICAgIGxldCBuYW1lcyA9IFtcIm51bGxcIl07XG4gICAgaWYoIFwiYnJ5dGhvbl9uYW1lXCIgaW4gbW9kdWxlLkFTVF9DT05WRVJUKSB7XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkobW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZSkgKSB7XG4gICAgICAgICAgICBuYW1lcyA9IG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lcyA9IFttb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBuYW1lIG9mIG5hbWVzKVxuICAgICAgICAobW9kdWxlc1tuYW1lXSA/Pz0gW10pLnB1c2gobW9kdWxlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzOiBjb252ZXJ0X2FzdChfYXN0KSxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVUeXBlKGJyeXRob25fbm9kZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLnNicnl0aG9uX3R5cGUgPz8gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWQ6XCIsIG5hbWUpO1xuICAgICAgICBjb25zb2xlLndhcm4oYGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coIGJyeXRob25fbm9kZSApO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgaGF2ZSBtYW55IG1vZHVsZXMgZm9yIHRoZSBzYW1lIG5vZGUgdHlwZS5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7IFxuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZ3Mobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgX2FyZ3MgPSBub2RlLmFyZ3MuYXJncztcbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG5cbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5PEFTVE5vZGU+KF9hcmdzLmxlbmd0aCk7XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IG5vZGUuYXJncy5kZWZhdWx0cztcbiAgICBjb25zdCBkb2Zmc2V0ICA9IF9hcmdzLmxlbmd0aCAtIGRlZmF1bHRzLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYXJnc1tpXSA9IGNvbnZlcnRfYXJnKF9hcmdzW2ldLCBkZWZhdWx0c1tpIC0gZG9mZnNldF0sIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1thcmdzW2ldLnZhbHVlXSA9IGFyZ3NbaV0ucmVzdWx0X3R5cGU7XG4gICAgfVxuICAgIFxuICAgIC8vVE9ETzoga3dhcmdzU1xuXG4gICAgbGV0IGZpcnN0OiBhbnk7XG4gICAgbGV0IGxhc3QgOiBhbnk7XG4gICAgaWYoIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgZmlyc3Q9IG5vZGUuYXJncy5hcmdzWzBdO1xuICAgICAgICBsYXN0ID0gbm9kZS5hcmdzLmFyZ3Nbbm9kZS5hcmdzLmFyZ3MubGVuZ3RoLTFdO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW4gZXN0aW1hdGlvbi4uLlxuICAgICAgICBjb25zdCBjb2wgPSBub2RlLmNvbF9vZmZzZXQgKyA0ICsgbm9kZS5uYW1lLmxlbmd0aCArIDE7XG5cbiAgICAgICAgZmlyc3QgPSBsYXN0ID0ge1xuICAgICAgICAgICAgbGluZW5vOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgY29sX29mZnNldDogY29sLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGNvbFxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdCB2aXJ0X25vZGUgPSB7XG4gICAgICAgIGxpbmVubyAgICA6IGZpcnN0LmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogZmlyc3QuY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYXJnc1wiLCBudWxsLCBudWxsLCBhcmdzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGRlZnZhbDogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJhcmdcIiwgcmVzdWx0X3R5cGUsIG5vZGUuYXJnLCBjaGlsZHJlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0cG9zKG5vZGU6IGFueVtdKSB7XG5cbiAgICBsZXQgYmVnID0gbm9kZVswXTtcbiAgICBsZXQgZW5kID0gbm9kZVtub2RlLmxlbmd0aC0xXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgIC8vY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubzogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcblxuICAgIGlmKCBsaW5lLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkV4cHJcIilcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG4gICAgLypcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlOyovXG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dHxudWxsID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5sb2NhbF92YXJpYWJsZXMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfdmFyaWFibGVzfVxuICAgIH1cbiAgICB0eXBlO1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0W2ldLnR5cGUpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgYnVpbGRNb2R1bGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiX19TQlJZVEhPTl9fXCIsIGAke2pzY29kZX1cXG5yZXR1cm4gX19leHBvcnRlZF9fO2ApO1xuICAgIH1cblxuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IHRoaXMuYnVpbGRNb2R1bGUoanNjb2RlLCBhc3QpKHRoaXMpO1xuICAgIH1cblxuICAgIGdldE1vZHVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWRbbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0QVNURm9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2ZpbGVuYW1lXTsgLy9UT0RPIG1vZHVsZW5hbWU/XG4gICAgfVxuXG4gICAgZ2V0IF9yXygpIHtcbiAgICAgICAgcmV0dXJuIF9yXztcbiAgICB9XG4gICAgZ2V0IF9iXygpIHtcbiAgICAgICAgcmV0dXJuIF9iXztcbiAgICB9XG59XG5cbiIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuaW50ZXJmYWNlIElBU1ROb2RlICB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBU1ROb2RlIGltcGxlbWVudHMgSUFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblx0cmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlRmN0U3VicyB9IGZyb20gXCIuL1NUeXBlXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBjb25zdCBibmFtZTJweW5hbWUgPSB7XG4gICAgXCJVU3ViXCI6IFwiX19uZWdfX1wiLFxuICAgIFwiTm90XCIgOiBcIm5vdFwiLFxuXG4gICAgXCJQb3dcIiA6IFwiX19wb3dfX1wiLFxuXG4gICAgXCJNdWx0XCIgICAgOiBcIl9fbXVsX19cIixcbiAgICBcIkRpdlwiICAgICA6IFwiX190cnVlZGl2X19cIixcbiAgICBcIkZsb29yRGl2XCI6IFwiX19mbG9vcmRpdl9fXCIsXG4gICAgXCJNb2RcIiAgICAgOiBcIl9fbW9kX19cIixcblxuICAgIFwiQWRkXCIgICAgIDogXCJfX2FkZF9fXCIsXG4gICAgXCJTdWJcIiAgICAgOiBcIl9fc3ViX19cIixcblxuICAgIFwiSXNcIiAgICAgIDogXCJpc1wiLFxuICAgIFwiSXNOb3RcIiAgIDogXCJpcyBub3RcIixcbiAgICBcIkVxXCIgICAgICA6IFwiX19lcV9fXCIsXG4gICAgXCJOb3RFcVwiICAgOiBcIl9fbmVfX1wiLFxuXG4gICAgXCJHdFwiICAgICAgOiBcIl9fZ3RfX1wiLFxuICAgIFwiR3RFXCIgICAgIDogXCJfX2dlX19cIixcbiAgICBcIkx0XCIgICAgICA6IFwiX19sdF9fXCIsXG4gICAgXCJMdEVcIiAgICAgOiBcIl9fbGVfX1wiLFxuXG4gICAgXCJJbnZlcnRcIiAgOiBcIl9fbm90X19cIixcblxuICAgIFwiQml0T3JcIiAgIDogXCJfX29yX19cIixcbiAgICBcIkJpdFhvclwiICA6IFwiX194b3JfX1wiLFxuICAgIFwiQml0QW5kXCIgIDogXCJfX2FuZF9fXCIsXG4gICAgXCJSU2hpZnRcIiAgOiBcIl9fcnNoaWZ0X19cIixcbiAgICBcIkxTaGlmdFwiICA6IFwiX19sc2hpZnRfX1wiLFxufVxuXG5leHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19ycG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19ybXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19ydHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19fcmZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19ybW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19fcmFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19yc3ViX18nLFxuXG4gICAgJ19fZXFfXycgICAgIDogJ19fZXFfXycsXG4gICAgJ19fbmVfXycgICAgIDogJ19fbmVfXycsXG5cbiAgICAnX19sdF9fJyAgICAgOiAnX19ndF9fJyxcbiAgICAnX19ndF9fJyAgICAgOiAnX19sdF9fJyxcbiAgICAnX19sZV9fJyAgICAgOiAnX19nZV9fJyxcbiAgICAnX19nZV9fJyAgICAgOiAnX19sZV9fJyxcblxuICAgICdfX25vdF9fJyAgICA6ICdfX3Jub3RfXycsXG4gICAgJ19fb3JfXycgICAgIDogJ19fcm9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX3JhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19fcnhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19ybHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX3Jyc2hpZnRfXycsXG59XG5cbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbmV4cG9ydCBjb25zdCBKU09wZXJhdG9ycyA9IFtcbiAgICBbJ3UuLSddLFxuICAgIFsnKionXSwgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJysnLCAnLSddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnPCcsICc8PScsICc+PScsICc+J10sXG4gICAgWyc9PScsICchPScsICc9PT0nLCAnIT09J10sXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJ14nXSwgIC8vVE9ET1xuICAgIFsnfCddLCAgLy9UT0RPXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWyc9J10gLyogZXQgdG91cyBsZXMgZMOpcml2w6lzICovIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIC8vIGV0Yy5cbl07XG5cbi8qXG5odHRwczovL2RvY3MucHl0aG9uLm9yZy8zL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjY2FsbGFibGVcblxuLT4gY2xhc3Nlc1xuYm9vbCgpXG5mbG9hdCgpXG5pbnQoKVxuc3RyKClcbmJ5dGVhcnJheSgpIFtVaW50OEFycmF5XSAoUlcpXG5ieXRlcygpICAgICBbP10gICAgICAgICAgKFJPKSA8LSBubyB0eXBlcyBpbiBKUy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0gVWludDhBcnJheSB3aXRoIGZsYWcgPyBmcmVlemUoKSBbSlMgdW5zYWZlXVxuICAgICAgICAgICAgYlwiZVxceEZGXCIgaW5zdGVhZCBvZiBbMTAxLDEwMV0sIGV0Yy4gKDMyIDw9IGJ5dCA8PSAxMjYpXG50eXBlKClcbmxpc3QoKSAgICAgIFtBcnJheV1cbnR1cGxlKCkgICAgIFtPYmplY3QuZnJvemVuKEFycmF5KV1cblxuc2V0KCkgICAgICAgLy8gcmVsaWVzIG9uIGhhc2goKS4uLiA9PiBzZXRbbGl0ZXJhbHNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gc2V0KCkgLyA8LSBKUyBzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgID0+IGJ5dGVzL2J5dGVhcnJheS9ldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBTZXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBJbnRlcm5hbCBrZXlzKCkgc2V0IFtyZWNvbXB1dGUgaGFzaCB3aGVuIGFkZC9yZW1vdmVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW50ZXJuYWxseSBzdG9yZWQgYXMgTWFwKGhhc2gsIHZhbHVlKSAoPylcbmZyb3plbnNldCgpICAgICAgICAgICAgPT4gZXh0ZW5kcyBzZXQgdG8gcmVwbGFjZSBtb2RpZmllcnMuXG5cbmRpY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzdHJdIGFzIE9iamVjdC5jcmVhdGUobnVsbCkgKyAoYW5kIHB1cmUgSlNPYmogYXMgZGljdFtzdHJdIClcbiAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgTWFwKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBTZXQoaGFzaCkgLyBNYXAoaGFzaCwga2V5KSAvIE1hcChrZXksIGhhc2gpID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQvc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IE1hcChrZXksIHZhbHVlKVxuXG5vYmplY3QoKVxuY29tcGxleCgpXG5tZW1vcnl2aWV3KCkgICAgICAgICAgICA9PiBBcnJheUJ1ZmZlciA/XG5cbi0+IHByaW50XG5hc2NpaSgpXG5iaW4oKVxuaGV4KClcbm9jdCgpXG5yZXByKClcbmhhc2goKVxuXG4tPiBtYXRoc1xuYWJzKClcbmRpdm1vZCgpXG5wb3coKVxucm91bmQoKVxuXG4tPiBsaXN0c1xuYWxsKClcbmFueSgpXG5maWx0ZXIoKVxubWFwKClcbm1heCgpXG5taW4oKVxuc3VtKClcbmxlbigpXG5lbnVtZXJhdGUoKVxucmV2ZXJzZWQoKVxuc2xpY2UoKVxuc29ydGVkKClcbnppcCgpXG5cbi0+IGl0ZXJcbnJhbmdlKClcbmFpdGVyKClcbml0ZXIoKVxuYW5leHQoKVxubmV4dCgpXG5cbi0+IHN0clxub3JkKClcbmNocigpXG5mb3JtYXQoKVxucHJpbnQoKVxuZlwiXCJcblxuY2FsbGFibGUoKVxuY2xhc3NtZXRob2QoKVxuc3RhdGljbWV0aG9kKClcbnByb3BlcnR5KClcbnN1cGVyKClcbmlzaW5zdGFuY2UoKVxuaXNzdWJjbGFzcygpXG5kZWxhdHRyKClcbmdldGF0dHIoKVxuaGFzYXR0cigpXG5zZXRhdHRyKClcbmRpcigpXG5cbmV2YWwoKVxuZXhlYygpXG5jb21waWxlKClcbmJyZWFrcG9pbnQoKVxuXG5nbG9iYWxzKClcbmxvY2FscygpXG52YXJzKClcbl9faW1wb3J0X18oKVxuXG5pZCgpXG4gICAgLT4gb24tZGVtYW5kIHdlYWtyZWYgP1xuXG5oZWxwKClcbmlucHV0KClcbm9wZW4oKVxuXG4qL1xuXG4vKlxudW5hcnlcbi0gcG9zICh1bmFyeSArKVxuXG4tIGJvb2xcbi0gZmxvYXRcbi0gaW50XG4tIHN0clxuLSByZXByXG5cbi0gYWJzXG4tIGNlaWxcbi0gZmxvb3Jcbi0gcm91bmRcbi0gdHJ1bmNcblxuYmluYXJ5XG4tIHBvdy9ycG93XG4tIGRpdm1vZC9yZGl2bW9kXG5cbmNsYXNzXG4tIGNsYXNzXG4tIG5ld1xuLSBpbml0XG4tIGluaXRfc3ViY2xhc3NcblxuLSBzdWJjbGFzc2hvb2sgLy8gX19pc2luc3RhbmNlY2hlY2tfXyBcblxuLSBkaXJcbi0gZGVsYXR0clxuLSBzZXRhdHRyXG4tIGdldGF0dHJpYnV0ZVxuXG4tIGRvY1xuLSBmb3JtYXRcbi0gZ2V0bmV3YXJnc1xuLSBoYXNoXG4tIGluZGV4ICg/KVxuLSBzaXplb2ZcbiovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogQVNUTm9kZSwgdGFyZ2V0ID0gXCJmbG9hdFwiKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX211bF9fJyB8fCBhLnZhbHVlID09PSAnX19ybXVsX18nICkge1xuICAgICAgICBjb25zdCBsdHlwZSA9IGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGNvbnN0IHJ0eXBlID0gYS5jaGlsZHJlblsxXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgaWYoICAgIChsdHlwZSA9PT0gJ2ludCcgfHwgbHR5cGUgPT09ICdqc2ludCcpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09ICdpbnQnIHx8IHJ0eXBlID09PSAnanNpbnQnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09ICdpbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBcImZsb2F0XCIgKVxuICAgICAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xuXG4gICAgLy8gaW50IC0+IGpzaW50IGNhc3QgaXMgZmFjdWx0YXRpdmUuLi5cbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE51bWJlcjJJbnQoYTogQVNUTm9kZSkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSAnaW50JztcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gXCJpbnRcIjtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgQmlnSW50KCR7YX0pYDtcbn1cblxubGV0IEpTT3BlcmF0b3JzUHJpb3JpdHk6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbmZvcihsZXQgaSA9IDA7IGkgPCBKU09wZXJhdG9ycy5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBKU09wZXJhdG9ycy5sZW5ndGggLSBpO1xuICAgIGZvcihsZXQgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIC4uLnZhbHVlczogQVNUTm9kZVtdKSB7XG5cbiAgICBjb25zdCBmaXJzdCA9IHZhbHVlc1swXTtcbiAgICBpZihmaXJzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUfFJJR0hUO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmKGxhc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7Zmlyc3R9YDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKVxuICAgICAgICByZXN1bHQgPSByYCR7cmVzdWx0fSAmJiAke3ZhbHVlc1tpXX1gO1xuXG4gICAgaWYoIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHthfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlfGFueSwgb3A6IHN0cmluZywgYjogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtvcH0ke2F9YDtcblxuICAgIGlmKG9wID09PSAnLScpXG4gICAgICAgIG9wID0gJ3UuLSc7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCAoZGlyZWN0aW9uICYgTEVGVCkgJiYgcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIGNhbGxfc3Vic3RpdHV0ZT86IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiBhbnlcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlblVuYXJ5T3BzKHJldF90eXBlICA6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHMgICAgICAgOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA9IChhKSA9PiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5VbmFyeU9wc19PcHRzID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiByZXRfdHlwZTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJ3UuLScpXG4gICAgICAgICAgICBvcCA9ICctJztcblxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUgPz89IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5CaW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X290aGVyICAgPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0X3NlbGYgICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIGNhbGxfc3Vic3RpdHV0ZSA/OiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZXxhbnksIG90aGVyOiBBU1ROb2RlfGFueSkgPT4gYW55XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udmVydChjb252ZXJ0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgcmV0dXJuIChub2RlOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyAgICA9IG5vZGUucmVzdWx0X3R5cGUhO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb252ZXJ0W3NyY107XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IGltcHJvdmU6XG4gICAgICAgIGlmKCBzcmMgPT09IFwiaW50XCIpXG4gICAgICAgICAgICByZXR1cm4gSW50Mk51bWJlcihub2RlLCB0YXJnZXQpO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSBcImludFwiIClcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIySW50KG5vZGUpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZm91bmQgY29udmVyc2lvblwiKTtcbiAgICB9O1xufVxuXG5jb25zdCBpZEZjdCA9IDxUPihhOiBUKSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQmluYXJ5T3BzKHJldF90eXBlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiBzdHJpbmdbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBzdHJpbmcpID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyByZXRfdHlwZSA6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIGlmKCBvcCA9PT0gJy8vJylcbiAgICAgICAgICAgIG9wID0gJy8nO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIG9wLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZfb3RoZXIob3RoZXIpLCBvcCwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggY2FsbF9zdWJzdGl0dXRlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgIGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2FtZV9vcmRlciA/IGZjdCA6IFxuICAgICAgICAgICAgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGNvbnZfb3RoZXIobyksIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiBjcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX3Ike3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiByY3MsXG4gICAgICAgIH07XG4gICAgICAgIGlmKCBjb252ZXJ0X3NlbGYgPT09IGlkRmN0ICYmIGNhbGxfc3Vic3RpdHV0ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnKycgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnKysnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wID09PSAnLScgJiYgb3RoZXIudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLS0nLCBzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCsnPScsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBDTVBPUFNfTElTVCA9IFsnPT0nLCAnIT0nLCAnPicsICc8JywgJz49JywgJzw9J10gYXMgY29uc3Q7XG5cbmNvbnN0IHJldmVyc2UgPSB7XG4gICAgXCI9PVwiOiBcIj09XCIsXG4gICAgXCIhPVwiOiBcIiE9XCIsXG4gICAgXCI+XCI6IFwiPFwiLFxuICAgIFwiPFwiOiBcIj5cIixcbiAgICBcIj49XCI6IFwiPD1cIixcbiAgICBcIjw9XCI6IFwiPj1cIixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkNtcE9wcyggIG9wcyAgICAgICA6IHJlYWRvbmx5IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlciAgID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30gKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBzdHJpbmcpID0+IG90aGVyX3R5cGUuaW5jbHVkZXMobykgPyBcImJvb2xcIiA6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG5cbiAgICAgICAgbGV0IGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvcCA9IG9wO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGNvbnZlcnRfc2VsZihzZWxmKTtcbiAgICAgICAgICAgIGxldCBiID0gY29udl9vdGhlcihvdGhlcik7XG4gICAgICAgICAgICBpZiggcmV2ZXJzZWQgKSB7XG4gICAgICAgICAgICAgICAgW2EsYl3CoD0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYucmVzdWx0X3R5cGUgPT09IG90aGVyLnJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb3AgPSBjb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCBjb3AsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGNhbGxfc3Vic3RpdHV0ZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udl9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5cblxuZXhwb3J0IGNsYXNzIEJvZHkge1xuXG4gICAgbm9kZTtcbiAgICBwcmludF9icmFja2V0O1xuICAgIGlkeDtcblxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IEFTVE5vZGUsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaWR4ID0gbm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgLy9UT0RPIHNlYXJjaCBib2R5Li4uXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMucHJpbnRfYnJhY2tldCA9IHByaW50X2JyYWNrZXQ7XG4gICAgfVxuXG4gICAgdG9KUyhjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgICAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldClcbiAgICAgICAgICAgIGpzKz1cIntcIjtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmlkeF07Ly9ib2R5OiBBU1ROb2RlW107XG4gICAgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldCkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvcik7XG4gICAgICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBib2R5LmpzY29kZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG59IiwiXG5leHBvcnQgdHlwZSBTVHlwZVN1YnMgPSB7XG4gICAgdHlwZSAgICAgICA/OiBzdHJpbmcsXG4gICAgc3Vic3RpdHV0ZSA/OiAoLi4uYXJnczogYW55W10pID0+IGFueVxufTtcbmV4cG9ydCB0eXBlIFNUeXBlRmN0U3VicyA9IHtcbiAgICB0eXBlICAgICAgICAgICAgPzogc3RyaW5nLCAvLyBvciBtYW55IHR5cGVzLi4uIFtdXG4gICAgY2FsbF9zdWJzdGl0dXRlID86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LFxuICAgIHJldHVybl90eXBlICAgICAgOiAoLi4uYXJnczogc3RyaW5nW10pID0+IHN0cmluZyAvLyBmb3IgbWV0aG9kcy9mdW5jdGlvbnMuLi5cbn07XG5leHBvcnQgdHlwZSBTVHlwZSA9IHN0cmluZyB8IFNUeXBlU3VicyB8IFNUeXBlRmN0U3VicztcbmV4cG9ydCB0eXBlIFNUeXBlT2JqID0gUmVjb3JkPHN0cmluZywgU1R5cGU+O1xuXG5leHBvcnQgY29uc3QgU1R5cGVfTk9UX0lNUExFTUVOVEVEID0gXCJOb3RJbXBsZW1lbnRlZFR5cGVcIjsiLCJpbXBvcnQgU1R5cGVfZmxvYXQgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX2ludCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX3N0ciBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX05vbmUgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlXCI7XG5pbXBvcnQgU1R5cGVfYm9vbCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9qc2ludCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludFwiO1xuaW1wb3J0IHsgU1R5cGUgfSBmcm9tIFwiLi9TVHlwZVwiO1xuXG4vL2V4cG9ydCB0eXBlIFNUeXBlTmFtZSA9IGtleW9mIHR5cGVvZiBuYW1lMlNUeXBlO1xuXG5leHBvcnQgY29uc3QgX25hbWUyU1R5cGU6IFJlY29yZDxzdHJpbmcsU1R5cGVPYmo+ID0ge1xuICAgIFwiZmxvYXRcIiAgIDogU1R5cGVfZmxvYXQsXG4gICAgXCJpbnRcIiAgICAgOiBTVHlwZV9pbnQsXG4gICAgXCJqc2ludFwiICAgOiBTVHlwZV9qc2ludCxcbiAgICBcImJvb2xcIiAgICA6IFNUeXBlX2Jvb2wsXG4gICAgXCJzdHJcIiAgICAgOiBTVHlwZV9zdHIsXG4gICAgXCJOb25lVHlwZVwiOiBTVHlwZV9Ob25lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuYW1lMlNUeXBlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBfbmFtZTJTVHlwZVtuYW1lXTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsImJpbmFyeV9qc29wIiwiTnVtYmVyMkludCIsIkJvZHkiLCJhc3QyanMiLCJhc3QiLCJleHBvcnRlZCIsImpzIiwiZmlsZW5hbWUiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsIm5vZGVzIiwiYXN0bm9kZTJqcyIsInR5cGUiLCJwdXNoIiwidmFsdWUiLCJ0b0pTIiwibmV3bGluZSIsImpvaW4iLCJyIiwic3RyIiwiYXJncyIsImxlbmd0aCIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJwcmludF9icmFja2V0Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJqc2NvZGUiLCJlbmQiLCJhcmdzMmpzIiwiYXJnMmpzIiwicmVzdWx0X3R5cGUiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJiYXNlIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnZlcnQiLCJjb250ZXh0IiwibG9jYWxfdmFyaWFibGVzIiwibmFtZSIsImJhc2VzIiwiRXJyb3IiLCJicnl0aG9uX25hbWUiLCJfY3Vyc29yIiwiX2NvbnRleHQiLCJiZWciLCJpbmNyIiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJzYnJ5dGhvbl90eXBlIiwiY3VyIiwib3JlbHNlIiwibGluZW5vIiwiY29sX29mZnNldCIsImFzdG5vZGUiLCJjYyIsInB5Y29kZSIsImhhbmRsZXJzIiwiaGFuZGxlciIsImgiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInNiIiwiZ2V0QVNURm9yIiwic3RhY2syYXN0bm9kZXMiLCJwYXJzZV9zdGFjayIsInNwbGl0IiwiaXNWOCIsImwiLCJfIiwiX2xpbmUiLCJfY29sIiwic2xpY2UiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9yYXdfZXJyXyIsInN0YWNrX3N0ciIsImV4Y2VwdGlvbl9zdHIiLCJsb2ciLCJfX2luaXRfXyIsImNhbGxfc3Vic3RpdHV0ZSIsInN0YXJ0c1dpdGgiLCJuYW1lMlNUeXBlIiwicmV0X3R5cGUiLCJrbGFzcyIsInVuZGVmaW5lZCIsInJldHVybl90eXBlIiwiZmN0X3R5cGUiLCJfX2NhbGxfXyIsImVuZHNXaXRoIiwiY29udmVydF9hcmdzIiwiX25hbWUyU1R5cGUiLCJpc01ldGhvZCIsImZjdF9yZXR1cm5fdHlwZSIsInJldHVybnMiLCJzaWduYXR1cmUiLCJzdWJzdGl0dXRlX2NhbGwiLCJvbGRfY29udGV4dCIsInJldCIsImFyZyIsImFzc2VydCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiUlVOVElNRV8yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIlJVTlRJTUVfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIlJVTlRJTUVfMjgiLCJBU1RfQ09OVkVSVF8yOSIsIkFTVDJKU18yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsIlJVTlRJTUUiLCJhc3NpZ24iLCJfYl8iLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJTVHlwZV9Ob25lIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJTVHlwZV9ib29sIiwiY2hpbGQiLCJ2YWx1ZXMiLCJnZW5CaW5hcnlPcHMiLCJnZW5VbmFyeU9wcyIsIlNUeXBlX2Zsb2F0IiwiY29udmVydF9vdGhlciIsInNlbGYiLCJvdGhlciIsInN1ZmZpeCIsImFzIiwiTnVtYmVyIiwicmVhbF90eXBlIiwiaWRfanNvcCIsIkludDJOdW1iZXIiLCJ1bmFyeV9qc29wIiwiU1R5cGVfaW50IiwibWV0aG9kIiwiX19pbnRfXyIsImEiLCJiIiwib3B0aSIsImNvbnZlcnRfc2VsZiIsIlNUeXBlX2pzaW50IiwiU1R5cGVfc3RyIiwicmlnaHRfbm9kZSIsInJpZ2h0IiwicmlnaHRfdHlwZSIsImFubm90YXRpb24iLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsImxlZnRzIiwibGVmdCIsImxlZnRfdHlwZSIsIkFzc2lnbk9wZXJhdG9ycyIsIlNUeXBlX05PVF9JTVBMRU1FTlRFRCIsIm9wIiwiYm5hbWUycHluYW1lIiwiYXR0ciIsInJldmVyc2VkX29wZXJhdG9yIiwiZmxvb3JkaXZfZmxvYXQiLCJNYXRoIiwiZmxvb3IiLCJmbG9vcmRpdl9pbnQiLCJyZXN1bHQiLCJtb2RfZmxvYXQiLCJtb2QiLCJtb2RfaW50IiwibXVsdGlfanNvcCIsImJuYW1lMmpzb3AiLCJmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUiLCJyZXZlcnNlZCIsInJ0eXBlIiwibHR5cGUiLCJqc29wIiwib3BzIiwicmlnaHRzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZXhwciIsImtleXMiLCJlbHRzIiwiX3JfIiwiaXNDbGFzcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJwcm90b3R5cGUiLCJ3cml0YWJsZSIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiZ2V0Tm9kZVR5cGUiLCJicnl0aG9uX25vZGUiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsImxhc3QiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJfYXJncyIsImRlZmF1bHRzIiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwiZmlyc3QiLCJkZWZ2YWwiLCJwYXJlbnRfY29udGV4dCIsImNyZWF0ZSIsImxpbmVfb2Zmc2V0IiwiY2hhciIsInBhcnNlRXhwcmVzc2lvbiIsImFzdDJqc19jb252ZXJ0IiwicGFyc2VTeW1ib2wiLCJiZWdpbl9zdHIiLCJjYXIiLCJzeW1ib2wiLCJhc3QyanNfbGl0ZXJhbHNfaW50IiwicGFyc2VOdW1iZXIiLCJhc3QyanNfbGl0ZXJhbHNfc3RyIiwicGFyc2VTdHJpbmciLCJwYXJzZVRva2VuIiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiYnJvd3NlciIsImdsb2JhbFRoaXMiLCJidWlsZE1vZHVsZSIsIkZ1bmN0aW9uIiwicnVuSlNDb2RlIiwiZ2V0TW9kdWxlcyIsImdldE1vZHVsZSIsIl92YWx1ZSIsIkJpbmFyeU9wZXJhdG9ycyIsImpzb3AycHlvcCIsIkpTT3BlcmF0b3JzIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwicGFyZW50X29wIiwicGFyZW50X29wX2RpciIsImRpcmVjdGlvbiIsImN1cl9wcmlvcml0eSIsInBhcmVudF9wcmlvcml0eSIsImNoZWNrX3ByaW9yaXR5IiwibyIsInB5b3AiLCJnZW5lcmF0ZUNvbnZlcnQiLCJzcmMiLCJpZEZjdCIsIm90aGVyX3R5cGUiLCJjb252X290aGVyIiwiY3MiLCJyY3MiLCJyZXZlcnNlIiwiY29wIiwicHkyYXN0X2Zhc3QiXSwic291cmNlUm9vdCI6IiJ9