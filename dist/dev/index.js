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
    context.local_symbols[target] = null; //TODO
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
    //TODO...
    /*
    if( this.children[0].result_type?.startsWith("class.") )
        js+= toJS("new ", cursor);
    */ js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]}(`, cursor);
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


function convert(node, context) {
    const name = node.func.id;
    let ret_type = null;
    // is a class ?
    const klass = undefined; //getSType(node.func.id); //TODO...
    if (klass !== undefined) {} else {
        //TODO fct in object...
        const fct_type = context.local_symbols[name];
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



function convert(node, context) {
    const isMethod = context.type === "class";
    let fct_return_type = null;
    const SType_fct = {
        __name__: "function",
        __call__: {
            idx_end_pos: -1,
            idx_vararg: -1,
            return_type: ()=>fct_return_type,
            substitute_call: ()=>"" /* argument parsing */ 
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
    //TODO: idx_end_pos (if default and no idx_vararg)
    // kwonly
    const kwonly = _args.kwonlyargs;
    const kw_defaults = _args.kw_defaults;
    doffset = kw_defaults.length - kwonly.length;
    for(let i = 0; i < kwonly.length; ++i){
        const arg = convert_arg(kwonly[i], kw_defaults[i], "kwonly", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
    }
    // vararg
    if (has_kwarg) {
        const arg = convert_arg(_args.kwarg, undefined, "kwarg", context);
        context.local_symbols[arg.value] = arg.result_type;
        args[offset++] = arg;
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



(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('float', {
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



(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('int', {
    __init__: {
        return_type: ()=>structs_STypes__WEBPACK_IMPORTED_MODULE_2__.SType_int,
        substitute_call: (node, other)=>{
            const method = other.result_type?.__int__;
            if (method === undefined) throw new Error(`${other.result_type}.__int__ not defined`);
            return method.substitute_call(node, other);
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



(0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.addSType)('str', {
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
    Object.assign(getSType(name), type);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxXQUFXLENBQUNsVyxLQUFLLEtBQUs7UUFBQ0MsVUFBVUQ7SUFBSTtBQUNqRDtBQUVPLFNBQVNtTixTQUFTbk4sSUFBWSxFQUFFcEMsSUFBZ0M7SUFDbkVVLE9BQU95TyxNQUFNLENBQUV4SCxTQUFTdkYsT0FBT3BDO0FBQ25DO0FBRU8sTUFBTThHLFlBQTJCYSxTQUFTLE9BQU87QUFDakQsTUFBTWdJLGNBQTJCaEksU0FBUyxTQUFTO0FBQ25ELE1BQU0rSCxjQUEyQi9ILFNBQVMsU0FBUztBQUNuRCxNQUFNbkUsYUFBMkJtRSxTQUFTLFFBQVE7QUFDbEQsTUFBTWlJLFlBQTJCakksU0FBUyxPQUFPO0FBQ2pELE1BQU1DLGlCQUEyQkQsU0FBUyxZQUFZO0FBQ3RELE1BQU04SiwyQkFBMkI5SixTQUFTLHNCQUFzQjs7Ozs7OztTQ2xCdkU7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2I7QUFDb0I7QUFDUDtBQUU3QywrQkFBK0I7QUFDQztBQUU0RCIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZV9qc2ludC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9saXN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL29iamVjdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0X2Zhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9CaW5hcnlPcGVyYXRvcnMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9Cb2R5LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVCdWlsdGluLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGVzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1QpIHtcblxuICAgIGNvbnN0IGV4cG9ydGVkID0gW107IC8vIG1vdmUyYXN0IGdlbiA/XG5cblx0bGV0IGpzID0gYC8vIyBzb3VyY2VVUkw9JHthc3QuZmlsZW5hbWV9XFxuYDtcblx0ICAgIGpzKz0gYGNvbnN0IHtfcl8sIF9iX30gPSBfX1NCUllUSE9OX187XFxuYDtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDMsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3Qubm9kZXMpIHtcblxuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcblxuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwiZnVuY3Rpb25zLmRlZlwiKVxuICAgICAgICAgICAgZXhwb3J0ZWQucHVzaChub2RlLnZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuXG4gICAgICAgIGpzICs9ICAgIG5ld2xpbmUobm9kZSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBgXFxuY29uc3QgX19leHBvcnRlZF9fID0geyR7ZXhwb3J0ZWQuam9pbignLCAnKX19O1xcbmA7XG5cblx0cmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZXxCb2R5LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQm9keSApIHtcbiAgICAgICAgcmV0dXJuIHN0ci50b0pTKGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGVcbiAgICAgICAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0ICYmICEgQXJyYXkuaXNBcnJheShzdHIpICkgeyAvLyBmb3IgcHkyYXN0X2Zhc3RcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZihwcmludF9icmFja2V0KVxuICAgICAgICBqcys9XCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgaWYocHJpbnRfYnJhY2tldCkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgfVxuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKVxuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIHJldHVybiB0b0pTKHJgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0gJHtuZXcgQm9keSh0aGlzKX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0ge1xuICAgICAgICBfX25hbWVfXzogbm9kZS5uYW1lLFxuICAgICAgICAvL1RPRE8gX19jYWxsX19cbiAgICB9XG5cbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJjbGFzc1wiLCBjb250ZXh0KTtcblxuICAgIGlmKCBub2RlLmJhc2VzLmxlbmd0aCA+IDEpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmJhc2VzLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgW2NvbnZlcnRfbm9kZShub2RlLmJhc2VzWzBdLCBjb250ZXh0KSwgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXVxuICAgICAgICA6IFtjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY2xhc3MuY2xhc3NkZWZcIiwgbnVsbCwgbm9kZS5uYW1lLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDbGFzc0RlZlwiOyIsImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBfY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIikge1xuXG4gICAgICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZSAgPSBcIjBuXCI7XG4gICAgICAgIGxldCBpbmNyOiBzdHJpbmd8QVNUTm9kZSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBlbmQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gdGhpcy5jaGlsZHJlblsyXTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1t0YXJnZXRdID0gbnVsbDsgLy9UT0RPXG5cbiAgICBpZiggbm9kZS5pdGVyLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkNhbGxcIiAmJiBub2RlLml0ZXIuZnVuYy5pZCA9PT0gXCJyYW5nZVwiKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgICAgICAuLi4gbm9kZS5pdGVyLmFyZ3MubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmZvclwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuaXRlciwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9yXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vaWZcbiAgICBsZXQga2V5d29yZCA9IFwiaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbGlmXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2UgaWZcIjtcbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5lbHNlXCIpXG4gICAgICAgIGtleXdvcmQgPSBcImVsc2VcIjtcblxuICAgIGxldCBqcyA9IHRvSlMoa2V5d29yZCwgY3Vyc29yKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBpZigga2V5d29yZCAhPT0gXCJlbHNlXCIpIHsgLy8gaWYvZWxpZiBjb25kaXRpb24uXG4gICAgICAgIG9mZnNldCA9IDE7XG4gICAgICAgIGpzICs9IHRvSlMocmAoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCBvZmZzZXQpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFNUeXBlX2Jvb2wpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIG5vZGUuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICBub2RlLmlmYmxvY2sgPSBcImlmXCI7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgbm9kZVxuICAgIF07XG5cbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgJiYgXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkge1xuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuICAgICAgICBjdXIuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICAgICAgY3VyLmlmYmxvY2sgPSBcImVsaWZcIjtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjdXIpO1xuICAgIH1cbiAgICBpZiggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggIT09IDAgKSB7IC8vIGVsc2VcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiSWZcIixcbiAgICAgICAgICAgIGlmYmxvY2s6IFwiZWxzZVwiLFxuICAgICAgICAgICAgYm9keSAgIDogY3VyLm9yZWxzZSxcbiAgICAgICAgICAgIC4uLmxpc3Rwb3MoY3VyLm9yZWxzZSksXG4gICAgICAgICAgICAvLyBiZWNhdXNlIHJlYXNvbnMuLi5cbiAgICAgICAgICAgIGxpbmVubyAgICA6IGN1ci5vcmVsc2VbMF0ubGluZW5vIC0gMSxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICAgICAgXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCBjYyA9IGFzdG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW47XG4gICAgICAgIGFzdG5vZGUuY2hpbGRyZW5baV0ucHljb2RlLmVuZCA9IGNjW2NjLmxlbmd0aC0xXS5weWNvZGUuZW5kO1xuICAgIH1cblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS50cnlcIixcbiAgICAgICAgICAgIC4uLm5vZGVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkuY2F0Y2hibG9ja1wiLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhub2RlLmhhbmRsZXJzKSxcbiAgICAgICAgICAgIGhhbmRsZXJzOiBub2RlLmhhbmRsZXJzXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgXSk7XG5cbiAgICAvL2ZpeCBweWNvZGUuXG4gICAgYXN0bm9kZS5jaGlsZHJlblswXS5weWNvZGUuZW5kID0gYXN0bm9kZS5jaGlsZHJlblsxXS5weWNvZGUuc3RhcnQ7XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgaWYoX2Vycl8gaW5zdGFuY2VvZiAke3RoaXMuY2hpbGRyZW5bMF19KXtgLCBjdXJzb3IpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMrPSBgbGV0ICR7dGhpcy52YWx1ZX0gPSBfZXJyXztgO1xuICAgICAgICBqcys9IGJvZHkyanModGhpcywgY3Vyc29yLCAxLCBmYWxzZSk7XG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hgLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudHlwZSwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRXhjZXB0SGFuZGxlclwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiY2F0Y2goX3Jhd19lcnJfKXtcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBqcys9IHRvSlMoXCJjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIj8gX3Jhd19lcnJfLnB5dGhvbl9leGNlcHRpb25cIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI6IG5ldyBfcl8uSlNFeGNlcHRpb24oX3Jhd19lcnJfKTtcIiwgY3Vyc29yKTtcbiAgICAgICAgLy8gZGVidWdcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IHRvSlMoXCJfYl8uZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBmb3IobGV0IGhhbmRsZXIgb2YgdGhpcy5jaGlsZHJlbilcbiAgICAgICAganMrPSB0b0pTKGhhbmRsZXIsIGN1cnNvcik7XG5cbiAgICBqcys9IHRvSlMoXCJlbHNleyB0aHJvdyBfcmF3X2Vycl8gfVwiLCBjdXJzb3IpOyAvL1RPRE8uLi5cblxuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApO1xuICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGJsb2NrYCwgbnVsbCwgbnVsbCxcbiAgICAgICAgbm9kZS5oYW5kbGVycy5tYXAoIChoOmFueSkgPT4gY29udmVydF9ub2RlKGgsIGNvbnRleHQpKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkuY2F0Y2hibG9ja1wiOyIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gZmlsdGVyX3N0YWNrKHN0YWNrOiBzdHJpbmdbXSkge1xuICByZXR1cm4gc3RhY2suZmlsdGVyKCBlID0+IGUuaW5jbHVkZXMoJ2JyeXRob25fJykgKTsgLy9UT0RPIGltcHJvdmVzLi4uXG59XG5cblxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogQVNUTm9kZVtdLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxBU1ROb2RlIHtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBzdGFja2xpbmVbMV0sIHN0YWNrbGluZVsyXSkhO1xufVxuXG5leHBvcnQgdHlwZSBTdGFja0xpbmUgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl07XG5cbi8vVE9ETzogY29udmVydFxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrMmFzdG5vZGVzKHN0YWNrOiBTdGFja0xpbmVbXSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZVtdIHtcbiAgcmV0dXJuIHN0YWNrLm1hcCggZSA9PiBzdGFja2xpbmUyYXN0bm9kZShlLCBzYikgKTtcbn1cblxuLy9UT0RPOiBhZGQgZmlsZS4uLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3N0YWNrKHN0YWNrOiBhbnksIHNiOiBTQnJ5dGhvbik6IFN0YWNrTGluZVtdIHtcblxuXG4gIFxuICAgIHN0YWNrID0gc3RhY2suc3BsaXQoXCJcXG5cIik7XG5cbiAgICBjb25zdCBpc1Y4ID0gc3RhY2tbMF09PT0gXCJFcnJvclwiOyBcblxuICAgIHJldHVybiBmaWx0ZXJfc3RhY2soc3RhY2spLm1hcCggbCA9PiB7XG5cbiAgICAgIGxldCBbXywgX2xpbmUsIF9jb2xdID0gbC5zcGxpdCgnOicpO1xuICBcbiAgICAgIGlmKCBfY29sW19jb2wubGVuZ3RoLTFdID09PSAnKScpIC8vIFY4XG4gICAgICAgIF9jb2wgPSBfY29sLnNsaWNlKDAsLTEpO1xuICBcbiAgICAgIGxldCBsaW5lID0gK19saW5lIC0gMjtcbiAgICAgIGxldCBjb2wgID0gK19jb2w7XG5cbiAgICAgIC0tY29sOyAvL3N0YXJ0cyBhdCAxLlxuXG4gICAgICBsZXQgZmN0X25hbWUhOiBzdHJpbmc7XG4gICAgICBpZiggaXNWOCApIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZihcIiBcIiwgNyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSg3LCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiZXZhbFwiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCBmaWxlbmFtZS5cbiAgICAgICAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgICAgY29sICs9IG5vZGUudmFsdWUubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIGNvbnN0IHN0YWNrX3N0ciA9IHN0YWNrLm1hcCggKGwsaSkgPT4gYEZpbGUgXCJbZmlsZV1cIiwgbGluZSAke25vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvblxufTsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGNvbnN0IGJvZHkgPSBuZXcgQm9keSh0aGlzKTtcblxuICAgIHJldHVybiB0b0pTKHJgdHJ5JHtib2R5fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy50cnlgLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LnRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgd2hpbGUoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy53aGlsZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETzogaW1wcm92ZS4uLlxuICAgIGlmKCB0aGlzLnZhbHVlICE9PSBudWxsIClcbiAgICAgICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZS5fX2luaXRfXy5jYWxsX3N1YnN0aXR1dGUodGhpcywgLi4udGhpcy5jaGlsZHJlbi5zbGljZSgxKSksIGN1cnNvcik7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIFxuICAgIC8vVE9ETy4uLlxuICAgIC8qXG4gICAgaWYoIHRoaXMuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU/LnN0YXJ0c1dpdGgoXCJjbGFzcy5cIikgKVxuICAgICAgICBqcys9IHRvSlMoXCJuZXcgXCIsIGN1cnNvcik7XG4gICAgKi9cbiAgICBcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfShgLCBjdXJzb3IpO1xuXG4gICAgLy9UT0RPOiBhcmdzIG5vZGUuLi5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcIilcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGdldFNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBuYW1lID0gbm9kZS5mdW5jLmlkO1xuICAgIGxldCAgIHJldF90eXBlID0gbnVsbDtcblxuICAgIC8vIGlzIGEgY2xhc3MgP1xuICAgIGNvbnN0IGtsYXNzID0gdW5kZWZpbmVkOyAvL2dldFNUeXBlKG5vZGUuZnVuYy5pZCk7IC8vVE9ETy4uLlxuXG4gICAgaWYoIGtsYXNzICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB7fS8vcmV0X3R5cGUgPSAoa2xhc3MuX19pbml0X18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuICAgIGVsc2Uge1xuICAgICAgICAvL1RPRE8gZmN0IGluIG9iamVjdC4uLlxuXG4gICAgICAgIGNvbnN0IGZjdF90eXBlID0gY29udGV4dC5sb2NhbF9zeW1ib2xzW25hbWVdITtcbiAgICAgICAgcmV0X3R5cGUgPSAoZmN0X3R5cGUuX19jYWxsX18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCByZXRfdHlwZSwga2xhc3MsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDYWxsXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9ICcnO1xuICAgIGlmKCAhIHRoaXMudHlwZS5lbmRzV2l0aChcIihtZXRoKVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoJ2Z1bmN0aW9uICcsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuXG4gICAganMgKz0gYXJnczJqcyh0aGlzLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMoXCJ7XCIsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEsIGZhbHNlKTtcblxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmNoaWxkcmVuWzFdLmNoaWxkcmVuO1xuICAgIGlmKCBib2R5W2JvZHkubGVuZ3RoIC0gMV0udHlwZSAhPT0gXCJrZXl3b3Jkcy5yZXR1cm5cIiApIHtcbiAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSBcInJldHVybiBudWxsO1wiXG4gICAgfVxuXG4gICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApICsgdG9KUyhcIn1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn1cblxuXG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGFyZ3MyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGNvbnN0IGFyZ3MgICAgICA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgX2FyZ3MgICAgID0gYXJncy5jaGlsZHJlbjtcbiAgICBjb25zdCBTVHlwZV9mY3QgPSBhcmdzLnZhbHVlISBhcyBTVHlwZUZjdDtcblxuICAgIGxldCBqcyA9IFwiKFwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBsZXQga3dfc3RhcnQgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBrd19zdGFydCA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAga3dfc3RhcnQgPSBtZXRhLmlkeF92YXJhcmcgKyAxO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLCBcIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBrd19zdGFydCA9PT0gaSlcbiAgICAgICAgICAgIGpzICs9IHRvSlMoJ3snLCBjdXJzb3IpO1xuICAgICAgICBpZiggaSA9PT0gbWV0YS5pZHhfdmFyYXJnICYmIGkgPT09IF9hcmdzLmxlbmd0aC0xIClcbiAgICAgICAgICAgIChfYXJnc1tpXSBhcyBhbnkpLmxhc3QgPSB0cnVlO1xuXG4gICAgICAgIGpzICs9IGFyZzJqcyhfYXJnc1tpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBpZigga3dfc3RhcnQgPCBfYXJncy5sZW5ndGgpXG4gICAgICAgIGpzICs9IHRvSlMoJ30gPSB7fScsIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIilcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBhcmdzLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmcyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLnZhcmFyZ1wiICkge1xuICAgICAgICBpZiggKG5vZGUgYXMgYW55KS5sYXN0KVxuICAgICAgICAgICAgcmV0dXJuIHRvSlMoYC4uLiR7bm9kZS52YWx1ZX1gLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4gdG9KUyggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCBcIltdXCIpLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBub2RlLnR5cGUgPT09IFwiYXJnLmt3YXJnXCIgKVxuICAgICAgICByZXR1cm4gdG9KUyggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCBcInt9XCIpLCBjdXJzb3IpO1xuXG4gICAgaWYobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEgKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICBpZiggdmFsdWUucmVzdWx0X3R5cGUgPT09ICdqc2ludCcgJiYgbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KVxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIySW50KHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdG9KUyggYmluYXJ5X2pzb3Aobm9kZSwgbm9kZS52YWx1ZSwgJz0nLCB2YWx1ZSksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS52YWx1ZTtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCwgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgZ2V0U1R5cGUsIFNUeXBlX05vbmVUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiO1xuICAgIGxldCBmY3RfcmV0dXJuX3R5cGU6IG51bGx8U1R5cGVPYmogPSBudWxsO1xuXG4gICAgY29uc3QgU1R5cGVfZmN0OiBTVHlwZUZjdCA9IHtcbiAgICAgICAgX19uYW1lX186IFwiZnVuY3Rpb25cIixcbiAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgIGlkeF9lbmRfcG9zICAgIDogLTEsXG4gICAgICAgICAgICBpZHhfdmFyYXJnICAgICA6IC0xLFxuICAgICAgICAgICAgcmV0dXJuX3R5cGUgICAgOiAoKSA9PiBmY3RfcmV0dXJuX3R5cGUhLCAvLyA/XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6ICgpID0+IFwiXCIgLyogYXJndW1lbnQgcGFyc2luZyAqL1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoICEgaXNNZXRob2QgKSB7XG4gICAgICAgIC8vIGlmIG1ldGhvZCBhZGQgdG8gc2VsZl9jb250ZXh0LnN5bWJvbHMgP1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IFNUeXBlX2ZjdDtcbiAgICB9XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uID0gbm9kZS5yZXR1cm5zPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBmY3RfcmV0dXJuX3R5cGUgPSBnZXRTVHlwZShhbm5vdGF0aW9uKTtcbiAgICBlbHNlIHtcblxuICAgICAgICAvL1RPRE86IGNoYW5nZSBzZWFyY2ggc3RyYXQuLi5cbiAgICAgICAgLy9UT0RPOiBsb29wcywgdHJ5LCBpZlxuICAgICAgICBsZXQgcmV0dXJucyA9IG5vZGUuYm9keS5maWx0ZXIoIChuOmFueSkgPT4gbi5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJSZXR1cm5cIiApO1xuICAgICAgICBcbiAgICAgICAgLy8gVE9ETzogcmV0dXJuO1xuICAgICAgICBpZiggcmV0dXJucy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICBmY3RfcmV0dXJuX3R5cGUgPSBTVHlwZV9Ob25lVHlwZTtcbiAgICB9XG5cbiAgICAvLyBuZXcgY29udGV4dCBmb3IgdGhlIGZ1bmN0aW9uIGxvY2FsIHZhcmlhYmxlc1xuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImZjdFwiLCBjb250ZXh0KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBjb252ZXJ0X2FyZ3Mobm9kZSwgU1R5cGVfZmN0LCBjb250ZXh0KTtcbiAgICBmb3IobGV0IGFyZyBvZiBhcmdzLmNoaWxkcmVuKVxuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIGNvbnN0IGJvZHkgPSBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCk7XG5cbiAgICAvLyByZWN1cnNpdmUuXG4gICAgaWYoIGZjdF9yZXR1cm5fdHlwZSA9PT0gbnVsbCApIHtcbiAgICAgICAgLy9UT0RPOiBsb29wLCBpZiwgdHJ5XG4gICAgICAgIGxldCByZXQgPSBib2R5LmNoaWxkcmVuLmZpbHRlciggbiA9PiBuLnR5cGUgPT09IFwia2V5d29yZHMucmV0dXJuXCIpO1xuICAgICAgICBmY3RfcmV0dXJuX3R5cGUgPSByZXRbMF0ucmVzdWx0X3R5cGUhO1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gXCJmdW5jdGlvbnMuZGVmXCI7XG4gICAgaWYoaXNNZXRob2QpXG4gICAgICAgIHR5cGUgKz0gXCIobWV0aClcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgYm9keVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRnVuY3Rpb25EZWZcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJncyhub2RlOiBhbnksIFNUeXBlX2ZjdDogU1R5cGVGY3QsIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG1ldGEgPSBTVHlwZV9mY3QuX19jYWxsX187XG5cbiAgICBjb25zdCBfYXJncyA9IG5vZGUuYXJncztcbiAgICBjb25zdCBoYXNfdmFyYXJnID0gX2FyZ3MudmFyYXJnICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzX2t3YXJnICA9IF9hcmdzLmt3YXJnICAhPT0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgdG90YWxfYXJncyA9IF9hcmdzLnBvc29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5hcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX3ZhcmFyZ1xuICAgICAgICAgICAgICAgICAgICAgKyBfYXJncy5rd29ubHlhcmdzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgKyAraGFzX2t3YXJnO1xuXG4gICAgY29uc3QgYXJncyA9IG5ldyBBcnJheTxBU1ROb2RlPih0b3RhbF9hcmdzKTtcblxuICAgIGNvbnN0IHBvc19kZWZhdWx0cyA9IG5vZGUuYXJncy5kZWZhdWx0cztcbiAgICBjb25zdCBwb3Nvbmx5ID0gX2FyZ3MucG9zb25seWFyZ3M7XG4gICAgY29uc3QgcG9zICAgICA9IF9hcmdzLmFyZ3M7XG5cbiAgICAvLyBwb3Nvbmx5XG4gICAgbGV0IGRvZmZzZXQgPSBwb3NfZGVmYXVsdHMubGVuZ3RoIC0gcG9zb25seS5sZW5ndGggLSBwb3MubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3Nvbmx5Lmxlbmd0aDsgKytpICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhwb3Nvbmx5W2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBcInBvc29ubHlcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW2ldID0gYXJnO1xuICAgIH1cblxuICAgIC8vIHBvc1xuICAgIGxldCBvZmZzZXQgPSBwb3Nvbmx5Lmxlbmd0aDtcbiAgICAgIGRvZmZzZXQgLT0gcG9zb25seS5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBvcy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcocG9zW2ldLCBwb3NfZGVmYXVsdHNbaSAtIGRvZmZzZXRdLCBcInBvc1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH1cblxuICAgIG1ldGEuaWR4X3ZhcmFyZyA9IG9mZnNldDtcblxuICAgIC8vIHZhcmFyZ1xuICAgIGlmKCBoYXNfdmFyYXJnICkge1xuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKF9hcmdzLnZhcmFyZywgdW5kZWZpbmVkLCBcInZhcmFyZ1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBtZXRhLmlkeF9lbmRfcG9zID0gb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG5iX3Bvc19kZWZhdWx0cyA9IE1hdGgubWluKHBvc19kZWZhdWx0cy5sZW5ndGgsIHBvcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBoYXNfb3RoZXJzID0gcG9zX2RlZmF1bHRzLmxlbmd0aCA+IHBvcy5sZW5ndGggfHwgYXJncy5sZW5ndGggIT09IG9mZnNldDtcblxuICAgICAgICBpZiggbmJfcG9zX2RlZmF1bHRzID4gMSB8fCBuYl9wb3NfZGVmYXVsdHMgPT09IDEgJiYgaGFzX290aGVycylcbiAgICAgICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgLT0gbmJfcG9zX2RlZmF1bHRzO1xuICAgIH1cblxuXG4gICAgLy9UT0RPOiBpZHhfZW5kX3BvcyAoaWYgZGVmYXVsdCBhbmQgbm8gaWR4X3ZhcmFyZylcblxuICAgIC8vIGt3b25seVxuICAgIGNvbnN0IGt3b25seSAgICAgID0gX2FyZ3Mua3dvbmx5YXJncztcbiAgICBjb25zdCBrd19kZWZhdWx0cyA9IF9hcmdzLmt3X2RlZmF1bHRzO1xuXG4gICAgZG9mZnNldCA9IGt3X2RlZmF1bHRzLmxlbmd0aCAtIGt3b25seS5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGt3b25seS5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoa3dvbmx5W2ldLCBrd19kZWZhdWx0c1tpXSwgXCJrd29ubHlcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuICAgICAgICBhcmdzW29mZnNldCsrXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyB2YXJhcmdcbiAgICBpZiggaGFzX2t3YXJnICkge1xuICAgICAgICBjb25zdCBhcmcgPSBjb252ZXJ0X2FyZyhfYXJncy5rd2FyZywgdW5kZWZpbmVkLCBcImt3YXJnXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgLy9UT0RPLi4uXG4gICAgLypcbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG4gICAgKi9cblxuICAgIGxldCB2aXJ0X25vZGU6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBjb25zdCBzdGFydCA9IGFyZ3NbMF0gICAgICAgICAgICAucHljb2RlLnN0YXJ0O1xuICAgICAgICBjb25zdCBlbmQgICA9IGFyZ3NbYXJncy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcblxuICAgICAgICB2aXJ0X25vZGUgPSB7XG4gICAgICAgICAgICBsaW5lbm8gICAgICAgIDogc3RhcnQubGluZSxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQgICAgOiBzdGFydC5jb2wsXG4gICAgICAgICAgICBlbmRfbGluZW5vICAgIDogZW5kLmxpbmUsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogZW5kLmNvbFxuICAgICAgICB9O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW4gZXN0aW1hdGlvbi4uLlxuICAgICAgICBjb25zdCBjb2wgPSBub2RlLmNvbF9vZmZzZXQgKyA0ICsgbm9kZS5uYW1lLmxlbmd0aCArIDE7XG5cbiAgICAgICAgdmlydF9ub2RlID0ge1xuICAgICAgICAgICAgICAgIGxpbmVubyAgICA6IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubyAgICA6IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgICAgIGNvbF9vZmZzZXQ6IGNvbCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBjb2xcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYXJnc1wiLCBudWxsLCBTVHlwZV9mY3QsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgZGVmdmFsOiBhbnksIHR5cGU6c3RyaW5nLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBub2RlLmFubm90YXRpb24/LmlkO1xuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuICAgIGlmKCBkZWZ2YWwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IGNvbnZlcnRfbm9kZSggZGVmdmFsLGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjaGlsZCApO1xuXG4gICAgICAgIGlmKCByZXN1bHRfdHlwZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBjaGlsZC5yZXN1bHRfdHlwZTtcbiAgICAgICAgICAgIGlmKHJlc3VsdF90eXBlID09PSAnanNpbnQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdF90eXBlID0gJ2ludCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGFyZy4ke3R5cGV9YCwgcmVzdWx0X3R5cGUsIG5vZGUuYXJnLCBjaGlsZHJlbik7XG59IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgX2JfLmFzc2VydCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIkFzc2VydFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudmFsdWVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZVswXSwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKGAke3RoaXMudmFsdWVbMF19OiAke3RoaXMudmFsdWVbMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0LmFsaWFzXCIsIG51bGwsIFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiYWxpYXNcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBqcyArPSB0b0pTKFwiY29uc3Qge1wiLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvciApO1xuICAgICAgICBqcyArPSB0b0pTKCB0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IgKTtcbiAgICB9XG4gICAganMgKz0gdG9KUyhcIn0gPSBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBpZih0aGlzLnZhbHVlID09PSBudWxsKVxuICAgICAgICBqcyArPSB0b0pTKFwiX19TQlJZVEhPTl9fLmdldE1vZHVsZXMoKVwiLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAganMgKz0gdG9KUyhgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dGhpcy52YWx1ZX1cIilgLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnRcIiwgbnVsbCwgbm9kZS5tb2R1bGUsXG4gICAgICAgIG5vZGUubmFtZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJJbXBvcnRcIiwgXCJJbXBvcnRGcm9tXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRocm93IG5ldyBfYl8uUHl0aG9uRXJyb3IoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJhaXNlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI1IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI3IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzQgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM1IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLnVuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcIm9wZXJhdG9ycy5jb21wYXJlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcIm9wZXJhdG9ycy5ib29sZWFuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5iaW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwib3BlcmF0b3JzLmF0dHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJvcGVyYXRvcnMuQXNzaWduT3BcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNFxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNVxuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmdcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnQvYWxpYXNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjNcblx0fSxcblx0XCJrZXl3b3Jkcy5hc3NlcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjRcblx0fSxcblx0XCJmdW5jdGlvbnMuZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI1XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjZcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjdcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjhcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svdHJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI5XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzBcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzFcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5mb3JcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzNcblx0fSxcblx0XCJjb21tZW50c1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNFxuXHR9LFxuXHRcImNsYXNzLmNsYXNzZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM1XG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG5cblxuY29uc3QgUlVOVElNRSA9IHt9O1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzkpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzIxKTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yNCk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjgpO1xuXG5cbmV4cG9ydCBjb25zdCBfYl8gPSBSVU5USU1FO1xuIiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHx8ICEoXCJfX2NsYXNzX19cIiBpbiBub2RlLnZhbHVlKVxuICAgICAgICAgICAgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18uX19xdWFsbmFtZV9fICE9PSBcIk5vbmVUeXBlXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5Ob25lXCIsIFNUeXBlX05vbmVUeXBlLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgYWRkU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ05vbmVUeXBlJywge30pOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFNUeXBlX2Jvb2wsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQ21wT3BzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2Jvb2wnLCB7XG4gICAgXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfYm9vbCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludF0pLFxuICAgIFxufSk7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCIke1wiLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvcm1hdHRlZFZhbHVlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuXG4gICAgICAgIGlmKCBjaGlsZC5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfc3RyKSB7XG5cbiAgICAgICAgICAgIC8vIGg0Y2tcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgICAgICAgICAgZW5kOiBudWxsIGFzIGFueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZC52YWx1ZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICB9IGVsc2UgaWYoY2hpbGQudHlwZSA9PT0gXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZ1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLm5vZGUudmFsdWVzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSm9pbmVkU3RyXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9mbG9hdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChub2RlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fICE9PSBcImZsb2F0XCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmZsb2F0XCIsIFNUeXBlX2Zsb2F0LCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wcywgZ2VuVW5hcnlPcHMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnZmxvYXQnLCB7XG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LFxuICAgICAgICAgICAgICAgICAgICBbJyoqJywgJyonLCAnLycsICcrJywgJy0nXSxcbiAgICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsXG4gICAgICAgIFsnLy8nXSxcbiAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBzZWxmLCBvdGhlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LFxuICAgICAgICBbJyUnXSxcbiAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBzZWxmLCBvdGhlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2Zsb2F0LCBbJ3UuLSddKSxcbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9mbG9hdDsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgc3VmZml4ID0gXCJcIjtcbiAgICBsZXQgdGFyZ2V0ID0gKHRoaXMgYXMgYW55KS5hcztcblxuICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICBpZih0YXJnZXQgPT09IFwiZmxvYXRcIikge1xuICAgICAgICBpZiggdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTsgLy8gcmVtb3ZlIHVzZWxlc3MgcHJlY2lzaW9uLlxuICAgIH1cbiAgICBlbHNlIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgfHwgdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBiaWdpbnQgZG8gbm90IGNhc3QgaW50byBqc2ludCAobG9zcyBvZiBwcmVjaXNpb24pLlxuICAgICAgICBzdWZmaXggPSBcIm5cIjtcblxuICAgIC8vIDFlKzU0IHNob3VsZCBoYWQgYmUgc3RvcmVkIGFzIGJpZ2ludC5cbiAgICByZXR1cm4gdG9KUyhyYCR7dmFsdWV9JHtzdWZmaXh9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdmFsdWUgPSBub2RlLnZhbHVlO1xuXG4gICAgaWYodmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gPT09IFwiaW50XCIpXG4gICAgICAgIHZhbHVlID0gdmFsdWUudmFsdWU7XG5cbiAgICBpZiggdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJiaWdpbnRcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHJlYWxfdHlwZSA9IHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiA/IFNUeXBlX2ludCA6IFNUeXBlX2pzaW50O1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuaW50XCIsIHJlYWxfdHlwZSwgdmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBpZF9qc29wLCBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdpbnQnLCB7XG5cbiAgICBfX2luaXRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gU1R5cGVfaW50LFxuICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBvdGhlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gb3RoZXIucmVzdWx0X3R5cGU/Ll9faW50X18gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICAgICAgaWYoIG1ldGhvZCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3RoZXIucmVzdWx0X3R5cGV9Ll9faW50X18gbm90IGRlZmluZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2ludCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKiAqL1xuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC8vICcqKicgPT4gaWYgXCJhcyBmbG9hdFwiIGNvdWxkIGFjY2VwdCBsb3NzIG9mIHByZWNpc2lvbi5cbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8J1xuICAgICAgICBdLFxuICAgICAgICBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnanNpbnQnOiAnaW50J31cbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWycqJ10sIFtTVHlwZV9pbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgYSwgYikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnZmxvYXQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlYWxseSBpbnRlcmVzdGluZy4uLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50Mk51bWJlcihhKSwgJyonLCBJbnQyTnVtYmVyKGIpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LCBbJy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Zsb2F0XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHMpID0+IEludDJOdW1iZXIocywgJ2Zsb2F0JyksXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnLy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7XCJqc2ludFwiOiBcImludFwifSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLmZsb29yZGl2X2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCwgWyclJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYW5kbGUgLTBcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG5cbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsndS4tJ10sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ3JlYWwnO1xuXG4gICAgICAgICAgICAgICAgaWYoIG9wdGkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgSW50Mk51bWJlcihhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgWyd+J10sXG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdIClcbiAgICAvKiAqL1xuXG59KTsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzLCBJbnQyTnVtYmVyLCBOdW1iZXIySW50LCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2pzaW50Jywge1xuXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2ludCxcbiAgICAgICAgLy8gJyoqJyBhbmQgJyonID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgIFtcbiAgICAgICAgICAgICcqKicsICcrJywgJy0nLFxuICAgICAgICAgICAgJyYnLCAnfCcsICdeJywgJz4+JywgJzw8JyAvLyBpbiBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgb24gMzJiaXRzXG4gICAgICAgIF0sXG4gICAgICAgIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9zZWxmIDogKHNlbGYpID0+IE51bWJlcjJJbnQoc2VsZiksXG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnKiddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgTnVtYmVyMkludChhKSwgJyonLCBOdW1iZXIySW50KGIpICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfZmxvYXQsIFsnLyddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfZmxvYXRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9qc2ludCwgWycvLyddLCBbU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9mbG9hdCgke3NlbGZ9LCAke290aGVyfSlgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2pzaW50LCBbJyUnXSwgW1NUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfanNpbnQsXG4gICAgICAgIFsndS4tJ10sIC8vIG1pbl9zYWZlX2ludGVnZXIgPT0gbWF4X3NhZmVfaW50ZWdlci5cbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGkgPSAobm9kZSBhcyBhbnkpLmFzID09PSAnaW50JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIE51bWJlcjJJbnQoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsnfiddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkNtcE9wcyggIENNUE9QU19MSVNULFxuICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0gKVxuICAgIC8qXG4gICAgX19pbnRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sKi9cbn0pOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9zdHIgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLnN0clwiLCBTVHlwZV9zdHIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IENNUE9QU19MSVNULCBnZW5CaW5hcnlPcHMsIGdlbkNtcE9wc30gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdzdHInLCB7XG5cbiAgICAuLi5nZW5DbXBPcHMgIChDTVBPUFNfTElTVCxcbiAgICAgICAgW1NUeXBlX3N0cl0pLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9zdHIsIFtcIitcIl0sIFtTVHlwZV9zdHJdKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfc3RyLCBbXCIqXCJdLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgIDoge1wiaW50XCI6IFwiZmxvYXRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGEucmVzdWx0X3R5cGUgIT09IFNUeXBlX3N0ciApXG4gICAgICAgICAgICAgICAgICAgIFthLGJdID0gW2IsYV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmAke2F9LnJlcGVhdCgke2J9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxufSk7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKFwidmFyIFwiLCBjdXJzb3IpO1xuXG4gICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyhyYCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gLCBjdXJzb3IpO1xuXG4gICAgY29uc3QgcmlnaHRfbm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV07XG4gICAgbGV0IHJjaGlsZDogYW55ID0gcmlnaHRfbm9kZTtcblxuICAgIGlmKCByaWdodF9ub2RlLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludCAmJiB0aGlzLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQgKVxuICAgICAgICByY2hpbGQgPSBOdW1iZXIySW50KHJpZ2h0X25vZGUpO1xuXG4gICAganMgKz0gdG9KUyhyYCA9ICR7cmNoaWxkfWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGdldFNUeXBlLCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuXG4gICAgY29uc3QgYW5ub3RhdGlvbiA9IG5vZGU/LmFubm90YXRpb24/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJlc3VsdF90eXBlID0gZ2V0U1R5cGUoYW5ub3RhdGlvbik7XG5cblxuICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cbiAgICBpZiggcmVzdWx0X3R5cGUgPT09IG51bGwgKSB7XG4gICAgICAgIHJlc3VsdF90eXBlID0gcmlnaHRfdHlwZTtcbiAgICAgICAgaWYoIHJpZ2h0X3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBTVHlwZV9pbnQ7IC8vIHByZXZlbnRzIGlzc3Vlcy5cbiAgICAgICAgICAgIC8vVE9ETzogb25seSBpZiBhc3NpZ24uLi5cbiAgICB9XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgLy8gY291bGQgYmUgaW1wcm92ZWQgSSBndWVzcy5cbiAgICAgICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiggbGVmdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IGxlZnRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAge30vL2NvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tsZWZ0LnZhbHVlXSA9IHJlc3VsdF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJlc3VsdF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICAuLi5sZWZ0cyxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBBc3NpZ25PcGVyYXRvcnMgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgbGV0IG9wID0gKEFzc2lnbk9wZXJhdG9ycyBhcyBhbnkpW3RoaXMudmFsdWVdO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IGEgPSBhICsgYlxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfT0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG4gICAgICAgIC8qXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5zdWJzdGl0dXRlX2NhbGwhKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS50YXJnZXQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5iaW5hcnlcIiwgbGVmdC5yZXN1bHRfdHlwZSwgb3AsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdWdBc3NpZ25cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX1bJHt0aGlzLmNoaWxkcmVuWzFdfV1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuW11cIiwgbnVsbCwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUuc2xpY2UsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIlN1YnNjcmlwdFwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfS4ke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5hdHRyXCIsIG51bGwsIG5vZGUuYXR0cixcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkF0dHJpYnV0ZVwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHJldHVybiB0b0pTKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LCByaWdodCksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgbGV0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9ICAgICAgICBcblxuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgLy8gdHJ5IHJldmVyc2VkIG9wZXJhdG9yXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IHJpZ2h0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3JpZ2h0LnJlc3VsdF90eXBlfSAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIHR5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQmluT3BcIl07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGZsb29yZGl2X2Zsb2F0OiAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoIGEvYiApO1xuICAgIH0sXG4gICAgZmxvb3JkaXZfaW50OiAoYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gYS9iO1xuICAgICAgICBpZiggcmVzdWx0ID4gMCB8fCBhJWIgPT09IDBuKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICByZXR1cm4gLS1yZXN1bHQ7XG4gICAgfSxcbiAgICBtb2RfZmxvYXQ6IDxUPihhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuXG4gICAgICAgIGNvbnN0IG1vZCA9IChhICUgYiArIGIpICUgYjtcbiAgICAgICAgaWYoIG1vZCA9PT0gMCAmJiBiIDwgMCApXG4gICAgICAgICAgICByZXR1cm4gLTA7XG4gICAgICAgIHJldHVybiBtb2Q7XG4gICAgfSxcbiAgICBtb2RfaW50OiA8VD4oYTogYmlnaW50LCBiOiBiaWdpbnQpID0+IHtcblxuICAgICAgICByZXR1cm4gKGEgJSBiICsgYikgJSBiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKCBtdWx0aV9qc29wKHRoaXMsIHRoaXMudmFsdWUsIC4uLnRoaXMuY2hpbGRyZW4pICwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS52YWx1ZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICkgKTtcblxuICAgIGNvbnN0IG9wICAgPSAoYm5hbWUyanNvcCBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgIGNvbnN0IHR5cGUgPSBjaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5ib29sZWFuXCIsIHR5cGUsIG9wLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIHJldmVyc2VkX29wZXJhdG9yIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG5cbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3AgYXMgYW55KTtcbiAgICAgICAgbWV0aG9kID0gcmlnaHQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUhKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgICAgIGlmKCBvcCAhPT0gJ19fZXFfXycgJiYgb3AgIT09ICdfX25lX18nIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bHR5cGV9ICR7b3B9ICR7cnR5cGV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcblxuICAgICAgICAgICAgY29uc3QganNvcCA9IG9wID09PSAnX19lcV9fJyA/ICc9PT0nIDogJyE9PSc7XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBqc29wLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZlcnNlZCA9IHRydWU7XG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsIShub2RlLCBsZWZ0LCByaWdodCwgcmV2ZXJzZWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gJyc7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDAgKVxuICAgICAgICAgICAganMgKz0gdG9KUygnICYmICcsIGN1cnNvcik7XG5cbiAgICAgICAgY29uc3Qgb3AgICAgPSB0aGlzLnZhbHVlW2ldO1xuICAgICAgICBjb25zdCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlbltpKzFdO1xuXG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzJyApIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICc9PT0nLCByaWdodCksIGN1cnNvcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiggb3AgPT09ICdpcyBub3QnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJyE9PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UT0RPOiBjaGFpbi4uLlxuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyggZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKHRoaXMsIGxlZnQsIG9wLCByaWdodCksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBibmFtZTJweW5hbWUgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtlLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICAgICAgaWYoIG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5jb25zdHJ1Y3Rvci4kbmFtZX0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZWZ0ICAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHRzID0gbm9kZS5jb21wYXJhdG9ycy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy5jb21wYXJlYCwgU1R5cGVfYm9vbCwgb3BzLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgLi4ucmlnaHRzLFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEludDJOdW1iZXIsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicyB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAvL2xldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBpZiggdGhpcy52YWx1ZSA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiB0b0pTKCB1bmFyeV9qc29wKHRoaXMsICchJywgSW50Mk51bWJlcihsZWZ0LCAnanNpbnQnKSApLCBjdXJzb3IgKTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGUhW3RoaXMudmFsdWVdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIHJldHVybiB0b0pTKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LyosIHJpZ2h0Ki8pLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sLCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLm9wZXJhbmQgLCBjb250ZXh0ICk7XG5cbiAgICBsZXQgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIGlmKCBvcCA9PT0gJ25vdCcpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCBTVHlwZV9ib29sLCBcIm5vdFwiLCBbIGxlZnQgXSApO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgbGV0IG1ldGhvZCA9IGxlZnQucmVzdWx0X3R5cGU/LltvcF0gYXMgU1R5cGVGY3RTdWJzO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTk9UIElNUExFTUVOVEVEIScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9Ob25lVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIFNUeXBlX05vbmVUeXBlLCBudWxsKTtcblxuICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIntcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSs9Mikge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlbltpXX06ICR7dGhpcy5jaGlsZHJlbltpKzFdfWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheShub2RlLmtleXMubGVuZ3RoICogMik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjaGlsZHJlblsyKmldICAgPSBjb252ZXJ0X25vZGUobm9kZS4gIGtleXNbaV0sIGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlblsyKmkrMV0gPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZXNbaV0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMuZGljdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgY2hpbGRyZW5cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRGljdFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5saXN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJMaXN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJPYmplY3QuZnJlZXplKFtcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIl0pXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlR1cGxlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUsIGN1cnNvcik7IC8vVE9ET1xufSIsImltcG9ydCBfcl8gZnJvbSBcIi4uLy4uL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuICAgIGxldCB2YWx1ZSA9IG5vZGUuaWQ7XG5cbiAgICBpZiggdmFsdWUgPT09ICdzZWxmJylcbiAgICAgICAgdmFsdWUgPSAndGhpcyc7IC8vVE9ETyB0eXBlIG9mIGN1cnJlbnQgY29udGV4dCAhIC0+IHNlbGYgaW4gbG9jYWxfc3ltYm9scyA/XG4gICAgZWxzZSBpZiggdmFsdWUgaW4gY29udGV4dC5sb2NhbF9zeW1ib2xzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1t2YWx1ZV07XG5cbiAgICAvKlxuICAgICAgICAvL1RPRE8gZ2xvYmFsU3ltYm9sc1xuICAgIGVsc2UgaWYodmFsdWUgaW4gX3JfKSB7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgX3JfXSkgKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBgY2xhc3MuJHt2YWx1ZX1gO1xuXG4gICAgICAgIHZhbHVlID0gYF9yXy4ke3ZhbHVlfWA7XG4gICAgfVxuICAgICovXG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59XG5cblxuLy8gX190cmFjZWJhY2tfX1xuICAgIC8vIHRiX25leHRcbiAgICAvLyB0Yl9mcmFtZVxuICAgICAgICAvLyBmX2JhY2sgP1xuICAgICAgICAvLyBmX2xvY2FsIDogZW5hYmxlIG9ubHkgaW4gY29tcGF0IG1vZGUuXG4gICAgICAgIC8vIGZfbGluZW5vIChsaW5lKVxuICAgICAgICAvLyBmX2NvZGVcbiAgICAgICAgICAgIC8vIGNvX25hbWUgKGZjdCBuYW1lID8pXG4gICAgICAgICAgICAvLyBjb19maWxlbmFtZSIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcIi4vRXhjZXB0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0pTRXhjZXB0aW9uIGV4dGVuZHMgUHlfRXhjZXB0aW9uIHtcblxufSIsImltcG9ydCBSVU5USU1FXzAgZnJvbSBcIi4vb2JqZWN0LnRzXCI7XG5pbXBvcnQgUlVOVElNRV8xIGZyb20gXCIuL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHNcIjtcbmltcG9ydCBSVU5USU1FXzIgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiSlNFeGNlcHRpb25cIjogUlVOVElNRV8xLFxuXHRcIkV4Y2VwdGlvblwiOiBSVU5USU1FXzIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJVTlRJTUU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9vYmplY3Qge1xuXG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cblxuZXhwb3J0IHR5cGUgQVNUID0ge1xuICAgIG5vZGVzOiBBU1ROb2RlW10sXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXM6IGNvbnZlcnRfYXN0KF9hc3QpLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBicnl0aG9uX25vZGUuc2JyeXRob25fdHlwZSA/PyBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X25vZGUoYnJ5dGhvbl9ub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBuYW1lID0gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlKTtcblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk1vZHVsZSBub3QgcmVnaXN0ZXJlZDpcIiwgbmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlICk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIC8vIHdlIG1heSBoYXZlIG1hbnkgbW9kdWxlcyBmb3IgdGhlIHNhbWUgbm9kZSB0eXBlLlxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHsgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBtb2R1bGUuQVNUMkpTO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG5vZGUgJHtuYW1lfSBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG59XG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYm9keShub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxpbmVzID0gbm9kZS5ib2R5Lm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2xpbmUobSwgY29udGV4dCkgKTtcbiAgICBjb25zdCBsYXN0ID0gbm9kZS5ib2R5W25vZGUuYm9keS5sZW5ndGgtMV07XG5cbiAgICBjb25zdCB2aXJ0X25vZGUgPSB7XG4gICAgICAgIGxpbmVubyAgICA6IG5vZGUuYm9keVswXS5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuYm9keVswXS5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJib2R5XCIsIG51bGwsIG51bGwsIGxpbmVzKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdHBvcyhub2RlOiBhbnlbXSkge1xuXG4gICAgbGV0IGJlZyA9IG5vZGVbMF07XG4gICAgbGV0IGVuZCA9IG5vZGVbbm9kZS5sZW5ndGgtMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvL2xpbmVubyA6IGJlZy5saW5lbm8gLSAxLFxuICAgICAgICAvL2NvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogYmVnLmNvbF9vZmZzZXQsXG4gICAgICAgIGVuZF9saW5lbm86IGVuZC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogZW5kLmVuZF9jb2xfb2Zmc2V0LFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbm9kZSA9IGxpbmU7XG5cbiAgICBpZiggbGluZS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJFeHByXCIpXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuICAgIC8qXG4gICAgaWYoIFwidmFsdWVcIiBpbiBsaW5lICYmICEgKFwidGFyZ2V0c1wiIGluIGxpbmUpICYmICEgKFwidGFyZ2V0XCIgaW4gbGluZSkgKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTsqL1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG4gICAgY29uc3RydWN0b3IodHlwZTogXCI/XCJ8XCJjbGFzc1wifFwiZmN0XCIgPSBcIj9cIiwgcGFyZW50X2NvbnRleHQ6IENvbnRleHR8bnVsbCA9IG51bGwpIHtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIHRoaXMubG9jYWxfc3ltYm9scyA9IHBhcmVudF9jb250ZXh0ID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShudWxsKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF9zeW1ib2xzfVxuICAgIH1cbiAgICB0eXBlO1xuICAgIGxvY2FsX3N5bWJvbHM6IFJlY29yZDxzdHJpbmcsIFNUeXBlT2JqfG51bGw+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0W2ldLnR5cGUpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsIi8vIEB0cy1ub2NoZWNrXG5cbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgYnVpbGRNb2R1bGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiX19TQlJZVEhPTl9fXCIsIGAke2pzY29kZX1cXG5yZXR1cm4gX19leHBvcnRlZF9fO2ApO1xuICAgIH1cblxuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IHRoaXMuYnVpbGRNb2R1bGUoanNjb2RlLCBhc3QpKHRoaXMpO1xuICAgIH1cblxuICAgIGdldE1vZHVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZDtcbiAgICB9XG4gICAgZ2V0TW9kdWxlKG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWRbbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0QVNURm9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2ZpbGVuYW1lXTsgLy9UT0RPIG1vZHVsZW5hbWU/XG4gICAgfVxuXG4gICAgZ2V0IF9yXygpIHtcbiAgICAgICAgcmV0dXJuIF9yXztcbiAgICB9XG4gICAgZ2V0IF9iXygpIHtcbiAgICAgICAgcmV0dXJuIF9iXztcbiAgICB9XG59XG5cbiIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5pbnRlcmZhY2UgSUFTVE5vZGUgIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdO1xuXHRyZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSBpbXBsZW1lbnRzIElBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBTVHlwZU9ianxudWxsID0gbnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlOiBzdHJpbmcsIHJlc3VsdF90eXBlOiBTVHlwZU9ianxudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0U3VicywgU1R5cGVPYmogfSBmcm9tIFwiLi9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcIi4vU1R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBibmFtZTJweW5hbWUgPSB7XG4gICAgXCJVU3ViXCI6IFwiX19uZWdfX1wiLFxuICAgIFwiTm90XCIgOiBcIm5vdFwiLFxuXG4gICAgXCJQb3dcIiA6IFwiX19wb3dfX1wiLFxuXG4gICAgXCJNdWx0XCIgICAgOiBcIl9fbXVsX19cIixcbiAgICBcIkRpdlwiICAgICA6IFwiX190cnVlZGl2X19cIixcbiAgICBcIkZsb29yRGl2XCI6IFwiX19mbG9vcmRpdl9fXCIsXG4gICAgXCJNb2RcIiAgICAgOiBcIl9fbW9kX19cIixcblxuICAgIFwiQWRkXCIgICAgIDogXCJfX2FkZF9fXCIsXG4gICAgXCJTdWJcIiAgICAgOiBcIl9fc3ViX19cIixcblxuICAgIFwiSXNcIiAgICAgIDogXCJpc1wiLFxuICAgIFwiSXNOb3RcIiAgIDogXCJpcyBub3RcIixcbiAgICBcIkVxXCIgICAgICA6IFwiX19lcV9fXCIsXG4gICAgXCJOb3RFcVwiICAgOiBcIl9fbmVfX1wiLFxuXG4gICAgXCJHdFwiICAgICAgOiBcIl9fZ3RfX1wiLFxuICAgIFwiR3RFXCIgICAgIDogXCJfX2dlX19cIixcbiAgICBcIkx0XCIgICAgICA6IFwiX19sdF9fXCIsXG4gICAgXCJMdEVcIiAgICAgOiBcIl9fbGVfX1wiLFxuXG4gICAgXCJJbnZlcnRcIiAgOiBcIl9fbm90X19cIixcblxuICAgIFwiQml0T3JcIiAgIDogXCJfX29yX19cIixcbiAgICBcIkJpdFhvclwiICA6IFwiX194b3JfX1wiLFxuICAgIFwiQml0QW5kXCIgIDogXCJfX2FuZF9fXCIsXG4gICAgXCJSU2hpZnRcIiAgOiBcIl9fcnNoaWZ0X19cIixcbiAgICBcIkxTaGlmdFwiICA6IFwiX19sc2hpZnRfX1wiLFxufVxuXG5leHBvcnQgY29uc3QgQmluYXJ5T3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19ycG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19ybXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19ydHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19fcmZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19ybW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19fcmFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19yc3ViX18nLFxuXG4gICAgJ19fZXFfXycgICAgIDogJ19fZXFfXycsXG4gICAgJ19fbmVfXycgICAgIDogJ19fbmVfXycsXG5cbiAgICAnX19sdF9fJyAgICAgOiAnX19ndF9fJyxcbiAgICAnX19ndF9fJyAgICAgOiAnX19sdF9fJyxcbiAgICAnX19sZV9fJyAgICAgOiAnX19nZV9fJyxcbiAgICAnX19nZV9fJyAgICAgOiAnX19sZV9fJyxcblxuICAgICdfX25vdF9fJyAgICA6ICdfX3Jub3RfXycsXG4gICAgJ19fb3JfXycgICAgIDogJ19fcm9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX3JhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19fcnhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19ybHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX3Jyc2hpZnRfXycsXG59XG5cbmV4cG9ydCBjb25zdCBBc3NpZ25PcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX2lwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX2ltdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX2l0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19pZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX2ltb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19pYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX2lzdWJfXycsXG5cbiAgICAnX19vcl9fJyAgICAgOiAnX19pb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19faWFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19peG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX2lsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19faXJzaGlmdF9fJyxcbn1cblxuXG5leHBvcnQgY29uc3QganNvcDJweW9wID0ge1xuICAgICcqKic6ICdwb3cnLFxuICAgICcqJyA6ICdtdWwnLFxuICAgICcvJyA6ICd0cnVlZGl2JyxcbiAgICAnLy8nOiAnZmxvb3JkaXYnLFxuICAgICclJyA6ICdtb2QnLFxuICAgIFxuICAgICcrJyAgOiAnYWRkJyxcbiAgICAnLScgIDogJ3N1YicsXG4gICAgJ3UuLSc6ICduZWcnLFxuXG4gICAgJz09JyA6ICdlcScsXG4gICAgJyE9JyA6ICduZScsXG4gICAgJzwnICA6ICdsdCcsXG4gICAgJzw9JyA6ICdsZScsXG4gICAgJz49JyA6ICdnZScsXG4gICAgJz4nICA6ICdndCcsXG5cbiAgICAnficgOiAnbm90JyxcbiAgICAnfCcgOiAnb3InLFxuICAgICcmJyA6ICdhbmQnLFxuICAgICdeJyA6ICd4b3InLFxuICAgICc8PCc6ICdsc2hpZnQnLFxuICAgICc+Pic6ICdyc2hpZnQnXG59O1xuXG4vLyBUT0RPOiB1bmFyeSBvcCB0b28uLi5cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL09wZXJhdG9yX3ByZWNlZGVuY2UjdGFibGVcbmV4cG9ydCBjb25zdCBKU09wZXJhdG9ycyA9IFtcbiAgICBbJ3UuLSddLFxuICAgIFsnKionXSwgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJysnLCAnLSddLFxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sIC8vVE9ET1xuICAgIFsnPCcsICc8PScsICc+PScsICc+J10sXG4gICAgWyc9PScsICchPScsICc9PT0nLCAnIT09J10sXG4gICAgWycmJ10sICAvL1RPRE9cbiAgICBbJ14nXSwgIC8vVE9ET1xuICAgIFsnfCddLCAgLy9UT0RPXG4gICAgWycmJiddLCAvL1RPRE9cbiAgICBbJ3x8JywgJz8/J10sXG4gICAgWyc9J10gLyogZXQgdG91cyBsZXMgZMOpcml2w6lzICovIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIC8vIGV0Yy5cbl07XG5cbi8qXG5odHRwczovL2RvY3MucHl0aG9uLm9yZy8zL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjY2FsbGFibGVcblxuLT4gY2xhc3Nlc1xuYm9vbCgpXG5mbG9hdCgpXG5pbnQoKVxuc3RyKClcbmJ5dGVhcnJheSgpIFtVaW50OEFycmF5XSAoUlcpXG5ieXRlcygpICAgICBbP10gICAgICAgICAgKFJPKSA8LSBubyB0eXBlcyBpbiBKUy4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0gVWludDhBcnJheSB3aXRoIGZsYWcgPyBmcmVlemUoKSBbSlMgdW5zYWZlXVxuICAgICAgICAgICAgYlwiZVxceEZGXCIgaW5zdGVhZCBvZiBbMTAxLDEwMV0sIGV0Yy4gKDMyIDw9IGJ5dCA8PSAxMjYpXG50eXBlKClcbmxpc3QoKSAgICAgIFtBcnJheV1cbnR1cGxlKCkgICAgIFtPYmplY3QuZnJvemVuKEFycmF5KV1cblxuc2V0KCkgICAgICAgLy8gcmVsaWVzIG9uIGhhc2goKS4uLiA9PiBzZXRbbGl0ZXJhbHNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gc2V0KCkgLyA8LSBKUyBzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgID0+IGJ5dGVzL2J5dGVhcnJheS9ldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW5oZXJpdCBTZXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBJbnRlcm5hbCBrZXlzKCkgc2V0IFtyZWNvbXB1dGUgaGFzaCB3aGVuIGFkZC9yZW1vdmVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gaW50ZXJuYWxseSBzdG9yZWQgYXMgTWFwKGhhc2gsIHZhbHVlKSAoPylcbmZyb3plbnNldCgpICAgICAgICAgICAgPT4gZXh0ZW5kcyBzZXQgdG8gcmVwbGFjZSBtb2RpZmllcnMuXG5cbmRpY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzdHJdIGFzIE9iamVjdC5jcmVhdGUobnVsbCkgKyAoYW5kIHB1cmUgSlNPYmogYXMgZGljdFtzdHJdIClcbiAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgTWFwKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBTZXQoaGFzaCkgLyBNYXAoaGFzaCwga2V5KSAvIE1hcChrZXksIGhhc2gpID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQvc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IE1hcChrZXksIHZhbHVlKVxuXG5vYmplY3QoKVxuY29tcGxleCgpXG5tZW1vcnl2aWV3KCkgICAgICAgICAgICA9PiBBcnJheUJ1ZmZlciA/XG5cbi0+IHByaW50XG5hc2NpaSgpXG5iaW4oKVxuaGV4KClcbm9jdCgpXG5yZXByKClcbmhhc2goKVxuXG4tPiBtYXRoc1xuYWJzKClcbmRpdm1vZCgpXG5wb3coKVxucm91bmQoKVxuXG4tPiBsaXN0c1xuYWxsKClcbmFueSgpXG5maWx0ZXIoKVxubWFwKClcbm1heCgpXG5taW4oKVxuc3VtKClcbmxlbigpXG5lbnVtZXJhdGUoKVxucmV2ZXJzZWQoKVxuc2xpY2UoKVxuc29ydGVkKClcbnppcCgpXG5cbi0+IGl0ZXJcbnJhbmdlKClcbmFpdGVyKClcbml0ZXIoKVxuYW5leHQoKVxubmV4dCgpXG5cbi0+IHN0clxub3JkKClcbmNocigpXG5mb3JtYXQoKVxucHJpbnQoKVxuZlwiXCJcblxuY2FsbGFibGUoKVxuY2xhc3NtZXRob2QoKVxuc3RhdGljbWV0aG9kKClcbnByb3BlcnR5KClcbnN1cGVyKClcbmlzaW5zdGFuY2UoKVxuaXNzdWJjbGFzcygpXG5kZWxhdHRyKClcbmdldGF0dHIoKVxuaGFzYXR0cigpXG5zZXRhdHRyKClcbmRpcigpXG5cbmV2YWwoKVxuZXhlYygpXG5jb21waWxlKClcbmJyZWFrcG9pbnQoKVxuXG5nbG9iYWxzKClcbmxvY2FscygpXG52YXJzKClcbl9faW1wb3J0X18oKVxuXG5pZCgpXG4gICAgLT4gb24tZGVtYW5kIHdlYWtyZWYgP1xuXG5oZWxwKClcbmlucHV0KClcbm9wZW4oKVxuXG4qL1xuXG4vKlxudW5hcnlcbi0gcG9zICh1bmFyeSArKVxuXG4tIGJvb2xcbi0gZmxvYXRcbi0gaW50XG4tIHN0clxuLSByZXByXG5cbi0gYWJzXG4tIGNlaWxcbi0gZmxvb3Jcbi0gcm91bmRcbi0gdHJ1bmNcblxuYmluYXJ5XG4tIHBvdy9ycG93XG4tIGRpdm1vZC9yZGl2bW9kXG5cbmNsYXNzXG4tIGNsYXNzXG4tIG5ld1xuLSBpbml0XG4tIGluaXRfc3ViY2xhc3NcblxuLSBzdWJjbGFzc2hvb2sgLy8gX19pc2luc3RhbmNlY2hlY2tfXyBcblxuLSBkaXJcbi0gZGVsYXR0clxuLSBzZXRhdHRyXG4tIGdldGF0dHJpYnV0ZVxuXG4tIGRvY1xuLSBmb3JtYXRcbi0gZ2V0bmV3YXJnc1xuLSBoYXNoXG4tIGluZGV4ICg/KVxuLSBzaXplb2ZcbiovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIEludDJOdW1iZXIoYTogQVNUTm9kZSwgdGFyZ2V0ID0gXCJmbG9hdFwiKSB7XG5cbiAgICBpZiggYS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgIHJldHVybiBhO1xuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19tdWxfXycgfHwgYS52YWx1ZSA9PT0gJ19fcm11bF9fJyApIHtcbiAgICAgICAgY29uc3QgbHR5cGUgPSBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuICAgICAgICBjb25zdCBydHlwZSA9IGEuY2hpbGRyZW5bMV0ucmVzdWx0X3R5cGU7XG4gICAgICAgIGlmKCAgICAobHR5cGUgPT09IFNUeXBlX2ludCB8fCBsdHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICAgICAmJiAocnR5cGUgPT09IFNUeXBlX2ludCB8fCBydHlwZSA9PT0gU1R5cGVfanNpbnQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgKGEgYXMgYW55KS5hcyA9IHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCBhLnZhbHVlID09PSAnX19uZWdfXycgJiYgYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50KSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggdGFyZ2V0ID09PSBcImZsb2F0XCIgKVxuICAgICAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xuXG4gICAgLy8gaW50IC0+IGpzaW50IGNhc3QgaXMgZmFjdWx0YXRpdmUuLi5cbiAgICByZXR1cm4gYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE51bWJlcjJJbnQoYTogQVNUTm9kZSkge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICBpZiggYS50eXBlID09PSAnbGl0ZXJhbHMuaW50Jykge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gJ2ludCc7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09IFNUeXBlX2pzaW50KSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSBcImludFwiO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmBCaWdJbnQoJHthfSlgO1xufVxuXG5sZXQgSlNPcGVyYXRvcnNQcmlvcml0eTogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuZm9yKGxldCBpID0gMDsgaSA8IEpTT3BlcmF0b3JzLmxlbmd0aDsgKytpKSB7XG5cbiAgICBjb25zdCBwcmlvcml0eSA9IEpTT3BlcmF0b3JzLmxlbmd0aCAtIGk7XG4gICAgZm9yKGxldCBvcCBvZiBKU09wZXJhdG9yc1tpXSlcbiAgICAgICAgSlNPcGVyYXRvcnNQcmlvcml0eVtvcF0gPSBwcmlvcml0eTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZWRfb3BlcmF0b3I8VCBleHRlbmRzIGtleW9mIHR5cGVvZiBCaW5hcnlPcGVyYXRvcnM+KG9wOiBUKSB7XG4gICAgcmV0dXJuIEJpbmFyeU9wZXJhdG9yc1tvcF07XG59XG5cbmNvbnN0IExFRlQgID0gMTtcbmNvbnN0IFJJR0hUID0gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpX2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgLi4udmFsdWVzOiBBU1ROb2RlW10pIHtcblxuICAgIGNvbnN0IGZpcnN0ID0gdmFsdWVzWzBdO1xuICAgIGlmKGZpcnN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlR8UklHSFQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsYXN0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG4gICAgaWYobGFzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtmaXJzdH1gO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHJlc3VsdCA9IHJgJHtyZXN1bHR9ICYmICR7dmFsdWVzW2ldfWA7XG5cbiAgICBpZiggXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWRfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSB7XG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke2F9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGV8YW55LCBvcDogc3RyaW5nLCBiOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGlmKGIgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7YX0ke29wfSR7Yn1gO1xuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCBhOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke29wfSR7YX1gO1xuXG4gICAgaWYob3AgPT09ICctJylcbiAgICAgICAgb3AgPSAndS4tJztcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIChkaXJlY3Rpb24gJiBMRUZUKSAmJiBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbnR5cGUgR2VuVW5hcnlPcHNfT3B0cyA9IHtcbiAgICBjb252ZXJ0X3NlbGYgICA/OiAoczogYW55KSA9PiBhbnksXG4gICAgc3Vic3RpdHV0ZV9jYWxsID86IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiBhbnlcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlblVuYXJ5T3BzKHJldF90eXBlICA6IFNUeXBlT2JqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wcyAgICAgICA6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmID0gKGEpID0+IGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlblVuYXJ5T3BzX09wdHMgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBTVHlwZU9iaikgPT4gcmV0X3R5cGU7XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICd1Li0nKVxuICAgICAgICAgICAgb3AgPSAnLSc7XG5cbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsID8/PSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbnR5cGUgR2VuQmluYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9vdGhlciAgID86IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgY29udmVydF9zZWxmICAgID86IChzOiBhbnkpID0+IGFueSxcbiAgICBzdWJzdGl0dXRlX2NhbGwgPzogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGV8YW55LCBvdGhlcjogQVNUTm9kZXxhbnkpID0+IGFueVxufTtcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbnZlcnQoY29udmVydDogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xuICAgIHJldHVybiAobm9kZTogQVNUTm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBzcmMgICAgPSBub2RlLnJlc3VsdF90eXBlIS5fX25hbWVfXztcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gY29udmVydFtzcmNdO1xuICAgICAgICBpZiggdGFyZ2V0ID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgICAgLy9UT0RPOiBpbXByb3ZlOlxuICAgICAgICBpZiggc3JjID09PSBcImludFwiKVxuICAgICAgICAgICAgcmV0dXJuIEludDJOdW1iZXIobm9kZSwgdGFyZ2V0KTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gXCJpbnRcIiApXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyMkludChub2RlKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmZvdW5kIGNvbnZlcnNpb25cIik7XG4gICAgfTtcbn1cblxuY29uc3QgaWRGY3QgPSA8VD4oYTogVCkgPT4gYTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkJpbmFyeU9wcyhyZXRfdHlwZTogU1R5cGVPYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiBTVHlwZU9ialtdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlciAgID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gaWRGY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30pIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiBvdGhlcl90eXBlLmluY2x1ZGVzKG8pID8gcmV0X3R5cGUgOiBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgY29uc3QgY29udl9vdGhlciAgPSBnZW5lcmF0ZUNvbnZlcnQoY29udmVydF9vdGhlcik7XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuICAgICAgICBpZiggb3AgPT09ICcvLycpXG4gICAgICAgICAgICBvcCA9ICcvJztcblxuICAgICAgICBsZXQgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBvcCwgY29udl9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByY3MgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252X290aGVyKG90aGVyKSwgb3AsIGNvbnZlcnRfc2VsZihzZWxmKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udmVydF9zZWxmKHNlbGYpLCBjb252X290aGVyKG8pICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNhbWVfb3JkZXIgPyBmY3QgOiBcbiAgICAgICAgICAgIHJjcyA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252X290aGVyKG8pLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdFtgX19yJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogcmNzLFxuICAgICAgICB9O1xuICAgICAgICBpZiggY29udmVydF9zZWxmID09PSBpZEZjdCAmJiBzdWJzdGl0dXRlX2NhbGwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlc3VsdFtgX19pJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKCBvcCA9PT0gJysnICYmIG90aGVyLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJysrJywgc2VsZik7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvcCA9PT0gJy0nICYmIG90aGVyLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0tJywgc2VsZik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgc2VsZiwgb3ArJz0nLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgQ01QT1BTX0xJU1QgPSBbJz09JywgJyE9JywgJz4nLCAnPCcsICc+PScsICc8PSddIGFzIGNvbnN0O1xuXG5jb25zdCByZXZlcnNlID0ge1xuICAgIFwiPT1cIjogXCI9PVwiLFxuICAgIFwiIT1cIjogXCIhPVwiLFxuICAgIFwiPlwiOiBcIjxcIixcbiAgICBcIjxcIjogXCI+XCIsXG4gICAgXCI+PVwiOiBcIjw9XCIsXG4gICAgXCI8PVwiOiBcIj49XCIsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuQ21wT3BzKCAgb3BzICAgICAgIDogcmVhZG9ubHkgKGtleW9mIHR5cGVvZiByZXZlcnNlKVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3R5cGU6IHJlYWRvbmx5IFNUeXBlT2JqW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyICAgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9zZWxmICAgID0gaWRGY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTogR2VuQmluYXJ5T3BzX09wdHMgPSB7fSApIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IFNUeXBlT2JqKSA9PiBvdGhlcl90eXBlLmluY2x1ZGVzKG8pID8gU1R5cGVfYm9vbCA6IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBjb25zdCBjb252X290aGVyICA9IGdlbmVyYXRlQ29udmVydChjb252ZXJ0X290aGVyKTtcblxuICAgIGZvcihsZXQgb3Agb2Ygb3BzKSB7XG5cbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG5cbiAgICAgICAgbGV0IGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcblxuICAgICAgICAgICAgbGV0IGNvcCA9IG9wO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGNvbnZlcnRfc2VsZihzZWxmKTtcbiAgICAgICAgICAgIGxldCBiID0gY29udl9vdGhlcihvdGhlcik7XG4gICAgICAgICAgICBpZiggcmV2ZXJzZWQgKSB7XG4gICAgICAgICAgICAgICAgW2EsYl3CoD0gW2IsYV07XG4gICAgICAgICAgICAgICAgY29wID0gcmV2ZXJzZVtjb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggY29wWzBdID09PSAnPScgfHwgY29wWzBdID09PSAnIScgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYucmVzdWx0X3R5cGUgPT09IG90aGVyLnJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb3AgPSBjb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCBjb3AsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHN1YnN0aXR1dGVfY2FsbCAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udl9vdGhlcihvKSApOyAvL1RPRE8uLi5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogY3MsXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcywgbmV3bGluZSwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5cblxuZXhwb3J0IGNsYXNzIEJvZHkge1xuXG4gICAgbm9kZTtcbiAgICBwcmludF9icmFja2V0O1xuICAgIGlkeDtcblxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IEFTVE5vZGUsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaWR4ID0gbm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgLy9UT0RPIHNlYXJjaCBib2R5Li4uXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMucHJpbnRfYnJhY2tldCA9IHByaW50X2JyYWNrZXQ7XG4gICAgfVxuXG4gICAgdG9KUyhjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgICAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldClcbiAgICAgICAgICAgIGpzKz1cIntcIjtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubm9kZS5jaGlsZHJlblt0aGlzLmlkeF07Ly9ib2R5OiBBU1ROb2RlW107XG4gICAgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIjtcIiwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmKHRoaXMucHJpbnRfYnJhY2tldCkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvcik7XG4gICAgICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gMTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBib2R5LmpzY29kZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG59IiwiXG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZSc7XG5pbXBvcnQgJy4vLi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUnOyIsImltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuY29uc3QgX25hbWUyU1R5cGU6IFJlY29yZDxzdHJpbmcsU1R5cGVPYmo+ID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNUeXBlPFQgZXh0ZW5kcyBTVHlwZU9iaj4obmFtZTogc3RyaW5nKTogVCB7XG4gICAgcmV0dXJuIChfbmFtZTJTVHlwZVtuYW1lXSA/Pz0ge19fbmFtZV9fOiBuYW1lfSkgYXMgVDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNUeXBlKG5hbWU6IHN0cmluZywgdHlwZTogT21pdDxTVHlwZU9iaiwgJ19fbmFtZV9fJz4pIHtcbiAgICBPYmplY3QuYXNzaWduKCBnZXRTVHlwZShuYW1lKSwgdHlwZSApO1xufVxuXG5leHBvcnQgY29uc3QgU1R5cGVfaW50ICAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJpbnRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfanNpbnQgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJqc2ludFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9mbG9hdCAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImZsb2F0XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2Jvb2wgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiYm9vbFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9zdHIgICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcInN0clwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9Ob25lVHlwZSAgICAgICAgICAgPSBnZXRTVHlwZShcIk5vbmVUeXBlXCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSA9IGdldFNUeXBlKFwiTm90SW1wbGVtZW50ZWRUeXBlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuLy8gZGVjbGFyZSBhbGwgYnVpbHRpbiB0eXBlcy4uLlxuaW1wb3J0ICcuL3N0cnVjdHMvU1R5cGVCdWlsdGluJztcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiQm9keSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImluZGVudF9sZXZlbCIsImJhc2VfaW5kZW50IiwiaW5jbHVkZXMiLCJpbmRlbnQiLCJwYWRTdGFydCIsImJhc2UiLCJDb250ZXh0IiwiY29udmVydF9ib2R5IiwiY29udmVydF9ub2RlIiwiY29udmVydCIsImNvbnRleHQiLCJsb2NhbF9zeW1ib2xzIiwibmFtZSIsIl9fbmFtZV9fIiwiYmFzZXMiLCJFcnJvciIsImJyeXRob25fbmFtZSIsIl9jdXJzb3IiLCJfY29udGV4dCIsImJlZyIsImluY3IiLCJ0YXJnZXQiLCJpZCIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsIm1hcCIsIm4iLCJrZXl3b3JkIiwib2Zmc2V0IiwibGlzdHBvcyIsIlNUeXBlX2Jvb2wiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJyZXN1bHRfdHlwZSIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiaCIsImZpbHRlcl9zdGFjayIsInN0YWNrIiwiZmlsdGVyIiwiZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3BvcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJzbGljZSIsImZjdF9uYW1lIiwicG9zIiwiaW5kZXhPZiIsImRlYnVnX3ByaW50X2V4Y2VwdGlvbiIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiX3Jhd19lcnJfIiwic3RhY2tfc3RyIiwiZXhjZXB0aW9uX3N0ciIsImxvZyIsIl9faW5pdF9fIiwiY2FsbF9zdWJzdGl0dXRlIiwicmV0X3R5cGUiLCJrbGFzcyIsInVuZGVmaW5lZCIsImZjdF90eXBlIiwiX19jYWxsX18iLCJyZXR1cm5fdHlwZSIsImJpbmFyeV9qc29wIiwiTnVtYmVyMkludCIsIlNUeXBlX2ludCIsImVuZHNXaXRoIiwiYXJnczJqcyIsIl9hcmdzIiwiU1R5cGVfZmN0IiwibWV0YSIsImt3X3N0YXJ0IiwiaWR4X2VuZF9wb3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImlkeF92YXJhcmciLCJsYXN0IiwiYXJnMmpzIiwiZ2V0U1R5cGUiLCJTVHlwZV9Ob25lVHlwZSIsImlzTWV0aG9kIiwiZmN0X3JldHVybl90eXBlIiwic3Vic3RpdHV0ZV9jYWxsIiwiYW5ub3RhdGlvbiIsInJldHVybnMiLCJjb252ZXJ0X2FyZ3MiLCJhcmciLCJyZXQiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJ0b3RhbF9hcmdzIiwicG9zb25seWFyZ3MiLCJrd29ubHlhcmdzIiwicG9zX2RlZmF1bHRzIiwiZGVmYXVsdHMiLCJwb3Nvbmx5IiwiZG9mZnNldCIsImNvbnZlcnRfYXJnIiwibmJfcG9zX2RlZmF1bHRzIiwiTWF0aCIsIm1pbiIsImhhc19vdGhlcnMiLCJrd29ubHkiLCJrd19kZWZhdWx0cyIsInZpcnRfbm9kZSIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsImRlZnZhbCIsImNoaWxkIiwiYXNzZXJ0IiwiYXNuYW1lIiwibW9kdWxlIiwibmFtZXMiLCJleGMiLCJQeXRob25FcnJvciIsInB5dGhvbl9leGNlcHRpb24iLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJSVU5USU1FXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIkFTVF9DT05WRVJUXzE0IiwiQVNUMkpTXzE0IiwiQVNUX0NPTlZFUlRfMTUiLCJBU1QySlNfMTUiLCJBU1RfQ09OVkVSVF8xNiIsIkFTVDJKU18xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJSVU5USU1FXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiUlVOVElNRV8yNCIsIkFTVF9DT05WRVJUXzI1IiwiQVNUMkpTXzI1IiwiQVNUX0NPTlZFUlRfMjYiLCJBU1QySlNfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiUlVOVElNRV8yOCIsIkFTVF9DT05WRVJUXzI5IiwiQVNUMkpTXzI5IiwiQVNUX0NPTlZFUlRfMzAiLCJBU1QySlNfMzAiLCJBU1RfQ09OVkVSVF8zMSIsIkFTVDJKU18zMSIsIkFTVF9DT05WRVJUXzMyIiwiQVNUMkpTXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiUlVOVElNRSIsImFzc2lnbiIsIl9iXyIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImFkZFNUeXBlIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJTVHlwZV9mbG9hdCIsIlNUeXBlX2pzaW50IiwiU1R5cGVfc3RyIiwidmFsdWVzIiwiZ2VuQmluYXJ5T3BzIiwiZ2VuVW5hcnlPcHMiLCJjb252ZXJ0X290aGVyIiwic2VsZiIsIm90aGVyIiwic3VmZml4IiwiYXMiLCJyZWFsX3R5cGUiLCJpZF9qc29wIiwiSW50Mk51bWJlciIsInVuYXJ5X2pzb3AiLCJtZXRob2QiLCJfX2ludF9fIiwiYSIsImIiLCJvcHRpIiwiY29udmVydF9zZWxmIiwicmlnaHRfbm9kZSIsInJjaGlsZCIsInJpZ2h0IiwicmlnaHRfdHlwZSIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJsZWZ0IiwibGVmdF90eXBlIiwiQXNzaWduT3BlcmF0b3JzIiwiU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIiwib3AiLCJibmFtZTJweW5hbWUiLCJhdHRyIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJmbG9vcmRpdl9mbG9hdCIsImZsb29yIiwiZmxvb3JkaXZfaW50IiwicmVzdWx0IiwibW9kX2Zsb2F0IiwibW9kIiwibW9kX2ludCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJydHlwZSIsImx0eXBlIiwianNvcCIsIm9wcyIsInJpZ2h0cyIsImNvbXBhcmF0b3JzIiwib3BlcmFuZCIsImV4cHIiLCJrZXlzIiwiZWx0cyIsImlzQ2xhc3MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicHJvdG90eXBlIiwid3JpdGFibGUiLCJQeV9vYmplY3QiLCJQeV9FeGNlcHRpb24iLCJQeV9KU0V4Y2VwdGlvbiIsIlJVTlRJTUVfMCIsIlJVTlRJTUVfMSIsIlJVTlRJTUVfMiIsIkNPUkVfTU9EVUxFUyIsIm1vZHVsZXMiLCJtb2R1bGVfbmFtZSIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiYnJ5dGhvbl9ub2RlIiwiZXJyb3IiLCJsaW5lcyIsIm0iLCJjb252ZXJ0X2xpbmUiLCJwYXJlbnRfY29udGV4dCIsImNyZWF0ZSIsImxpbmVfb2Zmc2V0IiwiY2hhciIsInBhcnNlRXhwcmVzc2lvbiIsImFzdDJqc19jb252ZXJ0IiwicGFyc2VTeW1ib2wiLCJiZWdpbl9zdHIiLCJjYXIiLCJzeW1ib2wiLCJhc3QyanNfbGl0ZXJhbHNfaW50IiwicGFyc2VOdW1iZXIiLCJhc3QyanNfbGl0ZXJhbHNfc3RyIiwicGFyc2VTdHJpbmciLCJwYXJzZVRva2VuIiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJfcl8iLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiYnJvd3NlciIsImdsb2JhbFRoaXMiLCJidWlsZE1vZHVsZSIsIkZ1bmN0aW9uIiwicnVuSlNDb2RlIiwiZ2V0TW9kdWxlcyIsImdldE1vZHVsZSIsIl92YWx1ZSIsIkJpbmFyeU9wZXJhdG9ycyIsImpzb3AycHlvcCIsIkpTT3BlcmF0b3JzIiwiSlNPcGVyYXRvcnNQcmlvcml0eSIsInByaW9yaXR5IiwiTEVGVCIsIlJJR0hUIiwiZmlyc3QiLCJwYXJlbnRfb3AiLCJwYXJlbnRfb3BfZGlyIiwiZGlyZWN0aW9uIiwiY3VyX3ByaW9yaXR5IiwicGFyZW50X3ByaW9yaXR5IiwiY2hlY2tfcHJpb3JpdHkiLCJvIiwicHlvcCIsImdlbmVyYXRlQ29udmVydCIsInNyYyIsImlkRmN0Iiwib3RoZXJfdHlwZSIsImNvbnZfb3RoZXIiLCJjcyIsInJjcyIsInJldmVyc2UiLCJjb3AiLCJfbmFtZTJTVHlwZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==