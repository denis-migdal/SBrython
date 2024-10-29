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
    //TODO: int() => init.__call__().
    //if( this.value !== null )
    //    return toJS(this.value.__init__.call_substitute(this, ...this.children.slice(1)), cursor);
    //TODO...
    /*
    if( this.children[0].result_type?.startsWith("class.") )
        js+= toJS("new ", cursor);
    */ return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.value.__call__.substitute_call(this), cursor);
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
/* harmony import */ var _functions_call_keyword_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./functions/call/keyword/astconvert.ts */ "./src/core_modules/functions/call/keyword/astconvert.ts");
/* harmony import */ var _functions_call_keyword_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./functions/call/keyword/ast2js.ts */ "./src/core_modules/functions/call/keyword/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");














































































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
    "functions.call/keyword": {
        AST_CONVERT: _functions_call_keyword_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__["default"],
        AST2JS: _functions_call_keyword_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_59__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_60__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_61__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_62__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_64__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_65__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_66__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_67__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_68__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_69__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_70__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_71__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_72__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_73__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_74__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_75__["default"]
    },
    "class.classdef": {
        AST_CONVERT: _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_76__["default"],
        AST2JS: _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_77__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _operators_binary_runtime_ts__WEBPACK_IMPORTED_MODULE_20__["default"]);
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_45__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_52__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_63__["default"]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFN0MsK0JBQStCO0FBQ0M7QUFFNEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwva2V5d29yZC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2tleXdvcmQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVfanNpbnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQmluYXJ5T3BlcmF0b3JzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQm9keS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlQnVpbHRpbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGV8Qm9keSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEJvZHkgKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9KUyhjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlXG4gICAgICAgIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCAmJiAhIEFycmF5LmlzQXJyYXkoc3RyKSApIHsgLy8gZm9yIHB5MmFzdF9mYXN0XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDAsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYocHJpbnRfYnJhY2tldClcbiAgICAgICAganMrPVwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBiYXNlX2luZGVudCA9IG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgaWYoIFtcImNvbnRyb2xmbG93cy5lbHNlXCIsIFwiY29udHJvbGZsb3dzLmVsaWZcIiwgXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiXS5pbmNsdWRlcyhub2RlLnR5cGUpICkge1xuICAgICAgIC0tYmFzZV9pbmRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBiYXNlX2luZGVudDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKGN1cnNvcik7XG5cbiAgICBub2RlLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBiYXNlOiBzdHJpbmd8QVNUTm9kZSA9IFwiX3JfLm9iamVjdFwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMilcbiAgICAgICAgYmFzZSA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICByZXR1cm4gdG9KUyhyYGNsYXNzICR7dGhpcy52YWx1ZX0gZXh0ZW5kcyAke2Jhc2V9ICR7bmV3IEJvZHkodGhpcyl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgX19uYW1lX186IG5vZGUubmFtZSxcbiAgICAgICAgLy9UT0RPIF9fY2FsbF9fXG4gICAgfVxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiY2xhc3NcIiwgY29udGV4dCk7XG5cbiAgICBpZiggbm9kZS5iYXNlcy5sZW5ndGggPiAxKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS5iYXNlcy5sZW5ndGggPT09IDEgP1xuICAgICAgICAgIFtjb252ZXJ0X25vZGUobm9kZS5iYXNlc1swXSwgY29udGV4dCksIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV1cbiAgICAgICAgOiBbY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNsYXNzLmNsYXNzZGVmXCIsIG51bGwsIG5vZGUubmFtZSwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2xhc3NEZWZcIjsiLCJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgX2N1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIFwiXCI7IC8vYCR7dGhpcy52YWx1ZX1gO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuOyAvLyBjdXJyZW50bHkgY29tbWVudHMgYXJlbid0IGluY2x1ZGVkIGluIEJyeXRob24ncyBBU1RcblxuICAgIC8vY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBub2RlLnZhbHVlKTtcbiAgICAvL2FzdG5vZGUucmVzdWx0X3R5cGUgPSBcImJvb2xcIjtcbiAgICAvL3JldHVybiBhc3Rub2RlO1xufSIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIpIHtcblxuICAgICAgICBsZXQgYmVnIDogc3RyaW5nfEFTVE5vZGUgID0gXCIwblwiO1xuICAgICAgICBsZXQgaW5jcjogc3RyaW5nfEFTVE5vZGUgPSBcIjFuXCI7XG4gICAgICAgIGxldCBlbmQgID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBiZWcgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgZW5kID0gdGhpcy5jaGlsZHJlblsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAzKVxuICAgICAgICAgICAgaW5jciA9IHRoaXMuY2hpbGRyZW5bMl07XG5cbiAgICAgICAgbGV0IGpzID0gdG9KUyhyYGZvcih2YXIgJHt0aGlzLnZhbHVlfSA9ICR7YmVnfTsgJHt0aGlzLnZhbHVlfSA8ICR7ZW5kfTsgJHt0aGlzLnZhbHVlfSArPSAke2luY3J9KWAsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aC0xKTtcblxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gdG9KUyhyYGZvcih2YXIgJHt0aGlzLnZhbHVlfSBvZiB0aGlzLmNoaWxkcmVuWzBdKWAsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBub2RlLnRhcmdldC5pZDtcbiAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7IC8vIGlmL2VsaWYgY29uZGl0aW9uLlxuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggXCJpZmJsb2NrXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBpZiggbm9kZS5pZmJsb2NrID09PSBcImVsc2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBpZihjb25kLnJlc3VsdF90eXBlICE9PSBTVHlwZV9ib29sKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YDtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYCwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IEJvZHkodGhpcyk7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRyeSR7Ym9keX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MudHJ5YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS50cnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3QgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5mdW5jdGlvbiBwcmludF9vYmoob2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG5cbiAgICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaik7XG5cbiAgICBsZXQgc3RyICA9IG5ldyBBcnJheShlbnRyaWVzLmxlbmd0aCsxKTsgLy8gP1xuICAgIGxldCBkYXRhID0gbmV3IEFycmF5KGVudHJpZXMubGVuZ3RoKTtcblxuICAgIHN0ciBbMF0gPSBgeyR7ZW50cmllc1swXVswXX06YDtcbiAgICBkYXRhWzBdID0gZW50cmllc1swXVsxXTtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBlbnRyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHN0ciBbaV0gPSBgLCAke2VudHJpZXNbaV1bMF19OiBgXG4gICAgICAgIGRhdGFbaV0gPSBlbnRyaWVzW2ldWzFdO1xuICAgIH1cbiAgICBzdHJbZW50cmllcy5sZW5ndGhdID0gJ30nO1xuXG4gICAgcmV0dXJuIFsgc3RyLCBkYXRhIF07XG59XG5cbmZ1bmN0aW9uIGpvaW4oZGF0YTogYW55W10sIHNlcD1cIiwgXCIpIHtcblxuICAgIGlmKGRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gW1tcIlwiXSwgW11dO1xuXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG5cbiAgICBsZXQgc3RyID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKzEpO1xuXG4gICAgc3RyWzBdICAgID0gXCJcIjtcbiAgICByZXN1bHRbMF0gPSBkYXRhWzBdID8/IFwidW5kZWZpbmVkXCI7XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICBzdHJbaV0gPSBzZXA7XG4gICAgICAgIHJlc3VsdFtpXSA9IGRhdGFbaV0gPz8gXCJ1bmRlZmluZWRcIjtcbiAgICB9XG4gICAgc3RyW2RhdGEubGVuZ3RoXSA9IFwiXCI7XG5cbiAgICByZXR1cm4gW3N0cixyZXN1bHRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdF9jYWxsKG5vZGU6IEFTVE5vZGUpIHtcblxuICAgIGNvbnN0IG1ldGEgPSAobm9kZS52YWx1ZSBhcyBTVHlwZUZjdCkuX19jYWxsX187XG5cbiAgICBsZXQga3dfcG9zID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmKG5vZGUuY2hpbGRyZW5baV0udHlwZSA9PT0gXCJmdW5jdGlvbnMua2V5d29yZFwiKSB7XG4gICAgICAgICAgICBrd19wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIGxldCBuYl9wb3MgPSBtZXRhLmlkeF9lbmRfcG9zO1xuICAgIGlmKCBuYl9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgbmJfcG9zID0gTWF0aC5tYXgobWV0YS5pZHhfdmFyYXJnLCBrd19wb3MtMSk7XG5cbiAgICBsZXQgcG9zX3NpemUgPSBuYl9wb3MrMTtcbiAgICBpZiggbWV0YS5oYXNfa3cgJiYgbWV0YS5pZHhfZW5kX3BvcyA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIClcbiAgICAgICAgcG9zX3NpemUgPSBtZXRhLmlkeF92YXJhcmcrMjtcbiAgICBsZXQgcG9zID0gbmV3IEFycmF5KHBvc19zaXplKTtcbiAgICBcbiAgICBjb25zdCBrdyAgICA6IFJlY29yZDxzdHJpbmcsIEFTVE5vZGU+ID0ge307XG4gICAgY29uc3Qga3dhcmdzOiBSZWNvcmQ8c3RyaW5nLCBBU1ROb2RlPiA9IHt9O1xuXG4gICAgbGV0IGhhc19rdyA9IGZhbHNlO1xuXG4gICAgaWYoIG1ldGEuaGFzX2t3ICYmIG1ldGEuaWR4X2VuZF9wb3MgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSApIHtcblxuICAgICAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1pbihrd19wb3MsIG1ldGEuaWR4X3ZhcmFyZyk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGN1dG9mZjsgKytpKVxuICAgICAgICAgICAgcG9zW2ktMV0gPSBub2RlLmNoaWxkcmVuW2ldO1xuXG4gICAgICAgIGlmKCBtZXRhLmlkeF92YXJhcmcrMSAhPT0ga3dfcG9zIClcbiAgICAgICAgICAgIHBvc1ttZXRhLmlkeF92YXJhcmddID0gam9pbihbXCJbXCIsIGpvaW4obm9kZS5jaGlsZHJlbi5zbGljZShtZXRhLmlkeF92YXJhcmcrMSxrd19wb3MpKSwgXCJdXCJdLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWluKGt3X3BvcywgbmJfcG9zKzEpO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBjdXRvZmY7ICsraSlcbiAgICAgICAgICAgIHBvc1tpLTFdID0gbm9kZS5jaGlsZHJlbltpXTtcblxuICAgICAgICBjb25zdCBhcmdzX25hbWVzID0gbWV0YS5hcmdzX25hbWVzO1xuICAgICAgICBmb3IobGV0IGkgPSBjdXRvZmY7IGkgPCBrd19wb3M7ICsraSlcbiAgICAgICAgICAgIGt3WyBhcmdzX25hbWVzW2ktMV0gXSA9IG5vZGUuY2hpbGRyZW5baV07XG5cbiAgICAgICAgaGFzX2t3ID0gY3V0b2ZmICE9PSBrd19wb3M7XG4gICAgfVxuXG4gICAgbGV0IGhhc19rd2FyZ3MgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFyZ3NfcG9zID0gbWV0YS5hcmdzX3BvcztcbiAgICBcblxuICAgIGZvcihsZXQgaSA9IGt3X3BvczsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBjb25zdCBhcmcgID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGFyZy52YWx1ZTtcbiAgICAgICAgY29uc3QgaWR4ICA9IGFyZ3NfcG9zWyBuYW1lIF07XG5cbiAgICAgICAgaWYoIGlkeCA+PSAwICkge1xuICAgICAgICAgICAgcG9zW2lkeF0gPSBhcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc19rdyA9IHRydWU7XG5cbiAgICAgICAgaWYoIGlkeCA9PT0gLTEpXG4gICAgICAgICAgICBrd1tuYW1lXSA9IGFyZztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrd2FyZ3NbbmFtZV0gPSBhcmc7XG4gICAgICAgICAgICBoYXNfa3dhcmdzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4gPSBrdztcbiAgICAvL1RPRE86IG9ubHkgdGhlIG9uZXMgYXQgLTEuLi5cbiAgICBpZiggaGFzX2t3YXJncyAmJiAhIG1ldGEuaGFzX2t3ICl7XG4gICAgICAgIG9iaiA9IGt3YXJncztcbiAgICB9IGVsc2UgaWYoIGhhc19rd2FyZ3MgKSB7XG4gICAgICAgIG9ialttZXRhLmt3YXJncyFdID0gcHJpbnRfb2JqKGt3YXJncyk7XG4gICAgfVxuXG4gICAgaWYoIGhhc19rdyApXG4gICAgICAgIHBvc1twb3MubGVuZ3RoLTFdID0gcHJpbnRfb2JqKG9iaik7XG4gICAgZWxzZSB7XG4gICAgICAgIHdoaWxlKHBvcy5sZW5ndGggPiAwICYmIHBvc1twb3MubGVuZ3RoLTFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAtLXBvcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHtub2RlLmNoaWxkcmVuWzBdfSgke2pvaW4ocG9zKX0pYDsgLy8gYXJncyA/XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETzogaW50KCkgPT4gaW5pdC5fX2NhbGxfXygpLlxuICAgIC8vaWYoIHRoaXMudmFsdWUgIT09IG51bGwgKVxuICAgIC8vICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUuX19pbml0X18uY2FsbF9zdWJzdGl0dXRlKHRoaXMsIC4uLnRoaXMuY2hpbGRyZW4uc2xpY2UoMSkpLCBjdXJzb3IpO1xuICAgIC8vVE9ETy4uLlxuICAgIC8qXG4gICAgaWYoIHRoaXMuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU/LnN0YXJ0c1dpdGgoXCJjbGFzcy5cIikgKVxuICAgICAgICBqcys9IHRvSlMoXCJuZXcgXCIsIGN1cnNvcik7XG4gICAgKi9cblxuICAgIHJldHVybiB0b0pTKCAodGhpcy52YWx1ZSBhcyBTVHlwZUZjdCkuX19jYWxsX18uc3Vic3RpdHV0ZV9jYWxsISh0aGlzKSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG5hbWUgPSBub2RlLmZ1bmMuaWQ7XG5cbiAgICBjb25zdCBmY3RfdHlwZSA9IGNvbnRleHQubG9jYWxfc3ltYm9sc1tuYW1lXSE7XG4gICAgY29uc3QgcmV0X3R5cGUgPSAoZmN0X3R5cGUuX19jYWxsX18gYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgcmV0X3R5cGUsIGZjdF90eXBlLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzICAgIC5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpICksXG4gICAgICAgIC4uLm5vZGUua2V5d29yZHMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBrZXl3b3JkIG5vZGUuLi5cbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHZhbHVlICAgID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQgKVxuICAgIGNvbnN0IHJldF90eXBlID0gdmFsdWUucmVzdWx0X3R5cGU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMua2V5d29yZFwiLCByZXRfdHlwZSwgbm9kZS5hcmcsIFtcbiAgICAgICAgdmFsdWVcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcImtleXdvcmRcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBOdW1iZXIySW50IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gJyc7XG4gICAgaWYoICEgdGhpcy50eXBlLmVuZHNXaXRoKFwiKG1ldGgpXCIpIClcbiAgICAgICAganMgKz0gdG9KUygnZnVuY3Rpb24gJywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhcIntcIiwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgaWYoIGJvZHlbYm9keS5sZW5ndGggLSAxXS50eXBlICE9PSBcImtleXdvcmRzLnJldHVyblwiICkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IFwicmV0dXJuIG51bGw7XCJcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCkgKyB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYXJnczJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgY29uc3QgYXJncyAgICAgID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBjb25zdCBfYXJncyAgICAgPSBhcmdzLmNoaWxkcmVuO1xuICAgIGNvbnN0IFNUeXBlX2ZjdCA9IGFyZ3MudmFsdWUhIGFzIFNUeXBlRmN0O1xuXG4gICAgbGV0IGpzID0gXCIoXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGxldCBrd19zdGFydCA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGt3X3N0YXJ0ID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgKVxuICAgICAgICBrd19zdGFydCA9IG1ldGEuaWR4X3ZhcmFyZyArIDE7XG5cbiAgICBpZiggbWV0YS5rd2FyZ3MgIT09IHVuZGVmaW5lZCAmJiBrd19zdGFydCA9PT0gX2FyZ3MubGVuZ3RoLTEpXG4gICAgICAgICsra3dfc3RhcnQ7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBfYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCkge1xuICAgICAgICAgICAganMgKz0gXCIsIFwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGt3X3N0YXJ0ID09PSBpKVxuICAgICAgICAgICAganMgKz0gdG9KUygneycsIGN1cnNvcik7XG4gICAgICAgIGlmKCBpID09PSBtZXRhLmlkeF92YXJhcmcgJiYgaSA9PT0gX2FyZ3MubGVuZ3RoLTEgKVxuICAgICAgICAgICAgKF9hcmdzW2ldIGFzIGFueSkubGFzdCA9IHRydWU7XG5cbiAgICAgICAganMgKz0gYXJnMmpzKF9hcmdzW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBrd19zdGFydCA8IF9hcmdzLmxlbmd0aClcbiAgICAgICAganMgKz0gdG9KUygnfSA9IHt9JywgY3Vyc29yKTtcblxuICAgIGpzICs9IFwiKVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGFyZ3MuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZzJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgaWYoIG5vZGUudHlwZSA9PT0gXCJhcmcudmFyYXJnXCIgKSB7XG4gICAgICAgIGlmKCAobm9kZSBhcyBhbnkpLmxhc3QpXG4gICAgICAgICAgICByZXR1cm4gdG9KUyhgLi4uJHtub2RlLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwiW11cIiksIGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIG5vZGUudHlwZSA9PT0gXCJhcmcua3dhcmdcIiApXG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIFwie31cIiksIGN1cnNvcik7XG5cbiAgICBpZihub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSApIHtcblxuICAgICAgICBsZXQgdmFsdWU6IGFueSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgIGlmKCB2YWx1ZS5yZXN1bHRfdHlwZSA9PT0gJ2pzaW50JyAmJiBub2RlLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcjJJbnQodmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB0b0pTKCBiaW5hcnlfanNvcChub2RlLCBub2RlLnZhbHVlLCAnPScsIHZhbHVlKSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlRmN0LCBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBnZXRTVHlwZSwgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcbmltcG9ydCB7IGRlZmF1bHRfY2FsbCB9IGZyb20gXCIuLi9jYWxsL2FzdDJqc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiO1xuICAgIGxldCBmY3RfcmV0dXJuX3R5cGU6IG51bGx8U1R5cGVPYmogPSBudWxsO1xuXG4gICAgY29uc3QgU1R5cGVfZmN0OiBTVHlwZUZjdCA9IHtcbiAgICAgICAgX19uYW1lX186IFwiZnVuY3Rpb25cIixcbiAgICAgICAgX19jYWxsX186IHtcbiAgICAgICAgICAgIGFyZ3NfbmFtZXMgICAgIDogbmV3IEFycmF5KG5vZGUuYXJncy5hcmdzLmxlbmd0aCtub2RlLmFyZ3MucG9zb25seWFyZ3MubGVuZ3RoKSxcbiAgICAgICAgICAgIGFyZ3NfcG9zICAgICAgIDoge30sXG4gICAgICAgICAgICBpZHhfZW5kX3BvcyAgICA6IC0xLFxuICAgICAgICAgICAgaWR4X3ZhcmFyZyAgICAgOiAtMSxcbiAgICAgICAgICAgIGhhc19rdyAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICByZXR1cm5fdHlwZSAgICA6ICgpID0+IGZjdF9yZXR1cm5fdHlwZSEsIC8vID9cbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogZGVmYXVsdF9jYWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggISBpc01ldGhvZCApIHtcbiAgICAgICAgLy8gaWYgbWV0aG9kIGFkZCB0byBzZWxmX2NvbnRleHQuc3ltYm9scyA/XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1tub2RlLm5hbWVdID0gU1R5cGVfZmN0O1xuICAgIH1cblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlLnJldHVybnM/LmlkO1xuICAgIGlmKCBhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IGdldFNUeXBlKGFubm90YXRpb24pO1xuICAgIGVsc2Uge1xuXG4gICAgICAgIC8vVE9ETzogY2hhbmdlIHNlYXJjaCBzdHJhdC4uLlxuICAgICAgICAvL1RPRE86IGxvb3BzLCB0cnksIGlmXG4gICAgICAgIGxldCByZXR1cm5zID0gbm9kZS5ib2R5LmZpbHRlciggKG46YW55KSA9PiBuLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIlJldHVyblwiICk7XG4gICAgICAgIFxuICAgICAgICAvLyBUT0RPOiByZXR1cm47XG4gICAgICAgIGlmKCByZXR1cm5zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IFNUeXBlX05vbmVUeXBlO1xuICAgIH1cblxuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiZmN0XCIsIGNvbnRleHQpO1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBTVHlwZV9mY3QsIGNvbnRleHQpO1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgY29uc3QgYm9keSA9IGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KTtcblxuICAgIC8vIHJlY3Vyc2l2ZS5cbiAgICBpZiggZmN0X3JldHVybl90eXBlID09PSBudWxsICkge1xuICAgICAgICAvL1RPRE86IGxvb3AsIGlmLCB0cnlcbiAgICAgICAgbGV0IHJldCA9IGJvZHkuY2hpbGRyZW4uZmlsdGVyKCBuID0+IG4udHlwZSA9PT0gXCJrZXl3b3Jkcy5yZXR1cm5cIik7XG4gICAgICAgIGZjdF9yZXR1cm5fdHlwZSA9IHJldFswXS5yZXN1bHRfdHlwZSE7XG4gICAgfVxuXG4gICAgbGV0IHR5cGUgPSBcImZ1bmN0aW9ucy5kZWZcIjtcbiAgICBpZihpc01ldGhvZClcbiAgICAgICAgdHlwZSArPSBcIihtZXRoKVwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBib2R5XG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgU1R5cGVfZmN0OiBTVHlwZUZjdCwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbWV0YSA9IFNUeXBlX2ZjdC5fX2NhbGxfXztcblxuICAgIGNvbnN0IF9hcmdzID0gbm9kZS5hcmdzO1xuICAgIGNvbnN0IGhhc192YXJhcmcgPSBfYXJncy52YXJhcmcgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoYXNfa3dhcmcgID0gX2FyZ3Mua3dhcmcgICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3QgYXJnc19wb3MgICA9IG1ldGEuYXJnc19wb3M7XG4gICAgY29uc3QgYXJnc19uYW1lcyA9IG1ldGEuYXJnc19uYW1lcztcblxuICAgIGNvbnN0IHRvdGFsX2FyZ3MgPSBfYXJncy5wb3Nvbmx5YXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgX2FyZ3MuYXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgK2hhc192YXJhcmdcbiAgICAgICAgICAgICAgICAgICAgICsgX2FyZ3Mua3dvbmx5YXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICsgK2hhc19rd2FyZztcblxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXk8QVNUTm9kZT4odG90YWxfYXJncyk7XG5cbiAgICBjb25zdCBwb3NfZGVmYXVsdHMgPSBub2RlLmFyZ3MuZGVmYXVsdHM7XG4gICAgY29uc3QgcG9zb25seSA9IF9hcmdzLnBvc29ubHlhcmdzO1xuICAgIGNvbnN0IHBvcyAgICAgPSBfYXJncy5hcmdzO1xuXG4gICAgLy8gcG9zb25seVxuICAgIGxldCBkb2Zmc2V0ID0gcG9zX2RlZmF1bHRzLmxlbmd0aCAtIHBvc29ubHkubGVuZ3RoIC0gcG9zLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zb25seS5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcocG9zb25seVtpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgXCJwb3Nvbmx5XCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tpXSA9IGFyZztcbiAgICB9XG5cbiAgICAvLyBwb3NcbiAgICBsZXQgb2Zmc2V0ID0gcG9zb25seS5sZW5ndGg7XG4gICAgICBkb2Zmc2V0IC09IHBvc29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKHBvc1tpXSwgcG9zX2RlZmF1bHRzW2kgLSBkb2Zmc2V0XSwgXCJwb3NcIiwgY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQubG9jYWxfc3ltYm9sc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgICAgIGFyZ3NfbmFtZXNbb2Zmc2V0XSA9IGFyZy52YWx1ZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfVxuXG4gICAgbWV0YS5pZHhfdmFyYXJnID0gb2Zmc2V0O1xuXG4gICAgLy8gdmFyYXJnXG4gICAgaWYoIGhhc192YXJhcmcgKSB7XG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3MudmFyYXJnLCB1bmRlZmluZWQsIFwidmFyYXJnXCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcbiAgICAgICAgYXJnc1tvZmZzZXQrK10gPSBhcmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIG1ldGEuaWR4X2VuZF9wb3MgPSBvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbmJfcG9zX2RlZmF1bHRzID0gTWF0aC5taW4ocG9zX2RlZmF1bHRzLmxlbmd0aCwgcG9zLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGhhc19vdGhlcnMgPSBwb3NfZGVmYXVsdHMubGVuZ3RoID4gcG9zLmxlbmd0aCB8fCBhcmdzLmxlbmd0aCAhPT0gb2Zmc2V0O1xuXG4gICAgICAgIGlmKCBuYl9wb3NfZGVmYXVsdHMgPiAxIHx8IG5iX3Bvc19kZWZhdWx0cyA9PT0gMSAmJiBoYXNfb3RoZXJzKVxuICAgICAgICAgICAgbWV0YS5pZHhfZW5kX3BvcyAtPSBuYl9wb3NfZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgbGV0IGN1dF9vZmYgICA9IG1ldGEuaWR4X2VuZF9wb3M7XG4gICAgaWYoIGN1dF9vZmYgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlcbiAgICAgICAgY3V0X29mZiA9IG1ldGEuaWR4X3ZhcmFyZztcbiAgICBmb3IobGV0IGkgPSBwb3Nvbmx5Lmxlbmd0aDsgaSA8IGN1dF9vZmY7ICsraSlcbiAgICAgICAgYXJnc19wb3NbYXJnc1tpXS52YWx1ZV0gPSBpO1xuXG4gICAgZm9yKGxldCBpID0gY3V0X29mZjsgaSA8IG1ldGEuaWR4X3ZhcmFyZzsgKytpKVxuICAgICAgICBhcmdzX3Bvc1thcmdzW2ldLnZhbHVlXSA9IC0xO1xuXG4gICAgLy9UT0RPOiBpZHhfZW5kX3BvcyAoaWYgZGVmYXVsdCBhbmQgbm8gaWR4X3ZhcmFyZylcblxuICAgIC8vIGt3b25seVxuICAgIGNvbnN0IGt3b25seSAgICAgID0gX2FyZ3Mua3dvbmx5YXJncztcbiAgICBjb25zdCBrd19kZWZhdWx0cyA9IF9hcmdzLmt3X2RlZmF1bHRzO1xuXG4gICAgbWV0YS5oYXNfa3cgPSBtZXRhLmlkeF92YXJhcmcgIT09IGN1dF9vZmYgfHwga3dvbmx5Lmxlbmd0aCAhPT0gMDtcblxuICAgIGRvZmZzZXQgPSBrd19kZWZhdWx0cy5sZW5ndGggLSBrd29ubHkubGVuZ3RoO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrd29ubHkubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgIGNvbnN0IGFyZyA9IGNvbnZlcnRfYXJnKGt3b25seVtpXSwga3dfZGVmYXVsdHNbaV0sIFwia3dvbmx5XCIsIGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgICAgICBhcmdzX3Bvc1thcmcudmFsdWVdID0gLTE7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuICAgIH1cblxuICAgIC8vIGt3YXJnXG4gICAgaWYoIGhhc19rd2FyZyApIHtcbiAgICAgICAgY29uc3QgYXJnID0gY29udmVydF9hcmcoX2FyZ3Mua3dhcmcsIHVuZGVmaW5lZCwgXCJrd2FyZ1wiLCBjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5sb2NhbF9zeW1ib2xzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG4gICAgICAgIGFyZ3Nbb2Zmc2V0KytdID0gYXJnO1xuXG4gICAgICAgIG1ldGEua3dhcmdzID0gYXJnLnZhbHVlO1xuICAgIH1cblxuICAgIC8vVE9ETy4uLlxuICAgIC8qXG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuICAgICovXG5cbiAgICBsZXQgdmlydF9ub2RlOiBhbnk7XG4gICAgaWYoIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBhcmdzWzBdICAgICAgICAgICAgLnB5Y29kZS5zdGFydDtcbiAgICAgICAgY29uc3QgZW5kICAgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG5cbiAgICAgICAgdmlydF9ub2RlID0ge1xuICAgICAgICAgICAgbGluZW5vICAgICAgICA6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0ICAgIDogc3RhcnQuY29sLFxuICAgICAgICAgICAgZW5kX2xpbmVubyAgICA6IGVuZC5saW5lLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5jb2xcbiAgICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIHZpcnRfbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBsaW5lbm8gICAgOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm8gICAgOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImFyZ3NcIiwgbnVsbCwgU1R5cGVfZmN0LCBhcmdzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGRlZnZhbDogYW55LCB0eXBlOnN0cmluZywgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbm9kZS5hbm5vdGF0aW9uPy5pZDtcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcbiAgICBpZiggZGVmdmFsICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSBjb252ZXJ0X25vZGUoIGRlZnZhbCxjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCggY2hpbGQgKTtcblxuICAgICAgICBpZiggcmVzdWx0X3R5cGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gY2hpbGQucmVzdWx0X3R5cGU7XG4gICAgICAgICAgICBpZihyZXN1bHRfdHlwZSA9PT0gJ2pzaW50JylcbiAgICAgICAgICAgICAgICByZXN1bHRfdHlwZSA9ICdpbnQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBhcmcuJHt0eXBlfWAsIHJlc3VsdF90eXBlLCBub2RlLmFyZywgY2hpbGRyZW4pO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYF9iXy5hc3NlcnQoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJBc3NlcnRcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnZhbHVlWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWVbMF0sIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhgJHt0aGlzLnZhbHVlWzBdfTogJHt0aGlzLnZhbHVlWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydC5hbGlhc1wiLCBudWxsLCBbbm9kZS5uYW1lLCBub2RlLmFzbmFtZV0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAganMgKz0gdG9KUyhcImNvbnN0IHtcIiwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IgKTtcbiAgICAgICAganMgKz0gdG9KUyggdGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yICk7XG4gICAgfVxuICAgIGpzICs9IHRvSlMoXCJ9ID0gXCIsIGN1cnNvcik7XG4gICAgXG4gICAgaWYodGhpcy52YWx1ZSA9PT0gbnVsbClcbiAgICAgICAganMgKz0gdG9KUyhcIl9fU0JSWVRIT05fXy5nZXRNb2R1bGVzKClcIiwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIGpzICs9IHRvSlMoYF9fU0JSWVRIT05fXy5nZXRNb2R1bGUoXCIke3RoaXMudmFsdWV9XCIpYCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0XCIsIG51bGwsIG5vZGUubW9kdWxlLFxuICAgICAgICBub2RlLm5hbWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiSW1wb3J0XCIsIFwiSW1wb3J0RnJvbVwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yYWlzZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmV4YywgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJhaXNlXCI7IiwiZXhwb3J0IGNsYXNzIFB5dGhvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgcmVhZG9ubHkgcHl0aG9uX2V4Y2VwdGlvbjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHl0aG9uX2V4Y2VwdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHB5dGhvbl9leGNlcHRpb24uX3Jhd19lcnJfID0gdGhpcztcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzcgZnJvbSBcIi4vb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV85IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9Ob25lL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNCBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNSBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNSBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI2IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNiBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNyBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNyBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9rZXl3b3JkL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM2IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNiBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLnVuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcIm9wZXJhdG9ycy5jb21wYXJlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcIm9wZXJhdG9ycy5ib29sZWFuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5iaW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwib3BlcmF0b3JzLmF0dHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJvcGVyYXRvcnMuQXNzaWduT3BcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNFxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNVxuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmdcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnQvYWxpYXNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjNcblx0fSxcblx0XCJrZXl3b3Jkcy5hc3NlcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjRcblx0fSxcblx0XCJmdW5jdGlvbnMuZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI1XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjZcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbC9rZXl3b3JkXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI3XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLndoaWxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI4XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI5XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL3RyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaGJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMxXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzNcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM0XG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzVcblx0fSxcblx0XCJjbGFzcy5jbGFzc2RlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNlxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV85KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yMSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjQpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI5KTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSxjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBTVHlwZV9Ob25lVHlwZSwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IGFkZFNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdOb25lVHlwZScsIHt9KTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBTVHlwZV9ib29sLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQ01QT1BTX0xJU1QsIGdlbkNtcE9wcyB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdib29sJywge1xuICAgIFxuICAgIC4uLmdlbkNtcE9wcyAgKENNUE9QU19MSVNULFxuICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnRdKSxcbiAgICBcbn0pOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiJHtcIiwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFNUeXBlX3N0cikge1xuXG4gICAgICAgICAgICAvLyBoNGNrXG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICAgICAgICAgIGVuZDogbnVsbCBhcyBhbnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQudmFsdWUsIGN1cnNvcik7XG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICAgICAgfSBlbHNlIGlmKGNoaWxkLnR5cGUgPT09IFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIikge1xuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZCwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmdcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5ub2RlLnZhbHVlcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkpvaW5lZFN0clwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfZmxvYXQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBTVHlwZV9mbG9hdCwgbm9kZS52YWx1ZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHMsIGdlblVuYXJ5T3BzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBhZGRTVHlwZSwgU1R5cGVfYm9vbCwgU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuYWRkU1R5cGUoJ2Zsb2F0Jywge1xuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgICAgICAgICAgICAgWycqKicsICcqJywgJy8nLCAnKycsICctJ10sXG4gICAgICAgICAgICAgICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LFxuICAgICAgICBbJy8vJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCxcbiAgICAgICAgWyclJ10sXG4gICAgICAgIFtTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCwgU1R5cGVfYm9vbF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHsnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwobm9kZSwgc2VsZiwgb3RoZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2Zsb2F0KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9mbG9hdCwgWyd1Li0nXSksXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IHN1ZmZpeCA9IFwiXCI7XG4gICAgbGV0IHRhcmdldCA9ICh0aGlzIGFzIGFueSkuYXM7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYodGFyZ2V0ID09PSBcImZsb2F0XCIpIHtcbiAgICAgICAgaWYoIHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7IC8vIHJlbW92ZSB1c2VsZXNzIHByZWNpc2lvbi5cbiAgICB9XG4gICAgZWxzZSBpZiggdGFyZ2V0ID09PSBcImludFwiIHx8IHRoaXMucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCApXG4gICAgICAgIC8vIGlmIGFscmVhZHkgYmlnaW50IGRvIG5vdCBjYXN0IGludG8ganNpbnQgKGxvc3Mgb2YgcHJlY2lzaW9uKS5cbiAgICAgICAgc3VmZml4ID0gXCJuXCI7XG5cbiAgICAvLyAxZSs1NCBzaG91bGQgaGFkIGJlIHN0b3JlZCBhcyBiaWdpbnQuXG4gICAgcmV0dXJuIHRvSlMocmAke3ZhbHVlfSR7c3VmZml4fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHZhbHVlID0gbm9kZS52YWx1ZTtcblxuICAgIGlmKHZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fID09PSBcImludFwiKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYoIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYmlnaW50XCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICBjb25zdCByZWFsX3R5cGUgPSB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgPyBTVHlwZV9pbnQgOiBTVHlwZV9qc2ludDtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCByZWFsX3R5cGUsIHZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgaWRfanNvcCwgSW50Mk51bWJlciwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGFkZFNUeXBlLCBTVHlwZV9ib29sLCBTVHlwZV9mbG9hdCwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnaW50Jywge1xuXG4gICAgX19pbml0X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+IFNUeXBlX2ludCxcbiAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZSwgb3RoZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IG90aGVyLnJlc3VsdF90eXBlPy5fX2ludF9fIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgICAgIGlmKCBtZXRob2QgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke290aGVyLnJlc3VsdF90eXBlfS5fX2ludF9fIG5vdCBkZWZpbmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgb3RoZXIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiBTVHlwZV9pbnQsXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbChub2RlLCBzZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRfanNvcChub2RlLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyogKi9cbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbXG4gICAgICAgICAgICAvLyAnKionID0+IGlmIFwiYXMgZmxvYXRcIiBjb3VsZCBhY2NlcHQgbG9zcyBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCdcbiAgICAgICAgXSxcbiAgICAgICAgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2pzaW50JzogJ2ludCd9XG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnKiddLCBbU1R5cGVfaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGEsIGIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2Zsb2F0JztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZWFsbHkgaW50ZXJlc3RpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJOdW1iZXIoYSksICcqJywgSW50Mk51bWJlcihiKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyonLCBiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9mbG9hdCwgWycvJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9mbG9hdF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzKSA9PiBJbnQyTnVtYmVyKHMsICdmbG9hdCcpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJy8vJ10sIFtTVHlwZV9pbnQsIFNUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjoge1wianNpbnRcIjogXCJpbnRcIn0sXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdl9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsIFsnJSddLCBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfb3RoZXI6IHtcImpzaW50XCI6IFwiaW50XCJ9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgaGFuZGxlIC0wXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgX2JfLm1vZF9pbnQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ3UuLSddLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdyZWFsJztcblxuICAgICAgICAgICAgICAgIGlmKCBvcHRpICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIEludDJOdW1iZXIoYSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5VbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIFsnfiddLFxuICAgICksXG4gICAgLi4uZ2VuQ21wT3BzKCAgQ01QT1BTX0xJU1QsXG4gICAgICAgICAgICAgICAgICAgW1NUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50LCBTVHlwZV9ib29sXSApXG4gICAgLyogKi9cblxufSk7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgQ01QT1BTX0xJU1QsIGdlbkJpbmFyeU9wcywgZ2VuQ21wT3BzLCBnZW5VbmFyeU9wcywgSW50Mk51bWJlciwgTnVtYmVyMkludCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2Jvb2wsIFNUeXBlX2Zsb2F0LCBTVHlwZV9pbnQsIFNUeXBlX2pzaW50IH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmFkZFNUeXBlKCdqc2ludCcsIHtcblxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9pbnQsXG4gICAgICAgIC8vICcqKicgYW5kICcqJyA9PiBpZiBcImFzIGZsb2F0XCIgY291bGQgYWNjZXB0IGxvc3Mgb2YgcHJlY2lzaW9uLlxuICAgICAgICBbXG4gICAgICAgICAgICAnKionLCAnKycsICctJyxcbiAgICAgICAgICAgICcmJywgJ3wnLCAnXicsICc+PicsICc8PCcgLy8gaW4gSlMgYml0IG9wZXJhdGlvbnMgYXJlIG9uIDMyYml0c1xuICAgICAgICBdLFxuICAgICAgICBbU1R5cGVfaW50LCBTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA6IChzZWxmKSA9PiBOdW1iZXIySW50KHNlbGYpLFxuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydqc2ludCc6ICdpbnQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfaW50LCBbJyonXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IChub2RlLCBhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aSA9IChub2RlIGFzIGFueSkuYXMgPT09ICdmbG9hdCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVhbGx5IGludGVyZXN0aW5nLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBJbnQyTnVtYmVyKGEpLCAnKicsIEludDJOdW1iZXIoYikgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIE51bWJlcjJJbnQoYSksICcqJywgTnVtYmVyMkludChiKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX2Zsb2F0LCBbJy8nXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Zsb2F0XSxcbiAgICAgICAge1xuICAgICAgICAgICAgY29udmVydF9vdGhlcjogeydpbnQnOiAnZmxvYXQnfVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfanNpbnQsIFsnLy8nXSwgW1NUeXBlX2pzaW50XSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfZmxvYXQoJHtzZWxmfSwgJHtvdGhlcn0pYDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICApLFxuICAgIC4uLmdlbkJpbmFyeU9wcyhTVHlwZV9qc2ludCwgWyclJ10sIFtTVHlwZV9qc2ludF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IGhhbmRsZSAtMFxuICAgICAgICAgICAgICAgIHJldHVybiByYF9iXy5tb2RfaW50KCR7c2VsZn0sICR7b3RoZXJ9KWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgKSxcblxuICAgIC4uLmdlblVuYXJ5T3BzKFNUeXBlX2pzaW50LFxuICAgICAgICBbJ3UuLSddLCAvLyBtaW5fc2FmZV9pbnRlZ2VyID09IG1heF9zYWZlX2ludGVnZXIuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGUsIGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpID0gKG5vZGUgYXMgYW55KS5hcyA9PT0gJ2ludCc7XG5cbiAgICAgICAgICAgICAgICBpZiggb3B0aSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBOdW1iZXIySW50KGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICksXG4gICAgLi4uZ2VuVW5hcnlPcHMoU1R5cGVfaW50LFxuICAgICAgICBbJ34nXSwgLy8gbWluX3NhZmVfaW50ZWdlciA9PSBtYXhfc2FmZV9pbnRlZ2VyLlxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X3NlbGYgOiAoc2VsZikgPT4gTnVtYmVyMkludChzZWxmKVxuICAgICAgICB9XG4gICAgKSxcbiAgICAuLi5nZW5DbXBPcHMoICBDTVBPUFNfTElTVCxcbiAgICAgICAgICAgICAgICAgICBbU1R5cGVfZmxvYXQsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX2Jvb2xdIClcbiAgICAvKlxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LCovXG59KTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIGlmKCB0aGlzLnZhbHVlWzBdID09PSAnXCInKVxuICAgICAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuICAgIHJldHVybiB0b0pTKHJgXCIke3RoaXMudmFsdWV9XCJgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfc3RyIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgU1R5cGVfc3RyLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBDTVBPUFNfTElTVCwgZ2VuQmluYXJ5T3BzLCBnZW5DbXBPcHN9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYWRkU1R5cGUsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX3N0ciB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5hZGRTVHlwZSgnc3RyJywge1xuXG4gICAgLi4uZ2VuQ21wT3BzICAoQ01QT1BTX0xJU1QsXG4gICAgICAgIFtTVHlwZV9zdHJdKSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoU1R5cGVfc3RyLCBbXCIrXCJdLCBbU1R5cGVfc3RyXSksXG4gICAgLi4uZ2VuQmluYXJ5T3BzKFNUeXBlX3N0ciwgW1wiKlwiXSwgW1NUeXBlX2ludCwgU1R5cGVfanNpbnRdLFxuICAgICAgICB7XG4gICAgICAgICAgICBjb252ZXJ0X290aGVyICA6IHtcImludFwiOiBcImZsb2F0XCJ9LFxuICAgICAgICAgICAgc3Vic3RpdHV0ZV9jYWxsOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCBhLnJlc3VsdF90eXBlICE9PSBTVHlwZV9zdHIgKVxuICAgICAgICAgICAgICAgICAgICBbYSxiXSA9IFtiLGFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJgJHthfS5yZXBlYXQoJHtifSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbn0pOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgTnVtYmVyMkludCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlMocmAgPSAke3RoaXMuY2hpbGRyZW5baV19YCwgY3Vyc29yKTtcblxuICAgIGNvbnN0IHJpZ2h0X25vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdO1xuICAgIGxldCByY2hpbGQ6IGFueSA9IHJpZ2h0X25vZGU7XG5cbiAgICBpZiggcmlnaHRfbm9kZS5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfanNpbnQgJiYgdGhpcy5yZXN1bHRfdHlwZSA9PT0gU1R5cGVfaW50IClcbiAgICAgICAgcmNoaWxkID0gTnVtYmVyMkludChyaWdodF9ub2RlKTtcblxuICAgIGpzICs9IHRvSlMocmAgPSAke3JjaGlsZH1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBnZXRTVHlwZSwgU1R5cGVfaW50LCBTVHlwZV9qc2ludCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHR5cGUgPSBcIm9wZXJhdG9ycy49XCI7XG5cbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICBsZXQgcmlnaHRfdHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcblxuICAgIGNvbnN0IGFubm90YXRpb24gPSBub2RlPy5hbm5vdGF0aW9uPy5pZDtcbiAgICBpZiggYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGdldFNUeXBlKGFubm90YXRpb24pO1xuXG5cbiAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG4gICAgaWYoIHJlc3VsdF90eXBlID09PSBudWxsICkge1xuICAgICAgICByZXN1bHRfdHlwZSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgIGlmKCByaWdodF90eXBlID09PSBTVHlwZV9qc2ludClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gU1R5cGVfaW50OyAvLyBwcmV2ZW50cyBpc3N1ZXMuXG4gICAgICAgICAgICAvL1RPRE86IG9ubHkgaWYgYXNzaWduLi4uXG4gICAgfVxuXG4gICAgY29uc3QgaXNNdWx0aVRhcmdldCA9IFwidGFyZ2V0c1wiIGluIG5vZGU7XG4gICAgY29uc3QgdGFyZ2V0cyA9IGlzTXVsdGlUYXJnZXQgPyBub2RlLnRhcmdldHMgOiBbbm9kZS50YXJnZXRdO1xuXG4gICAgY29uc3QgbGVmdHMgPSB0YXJnZXRzLm1hcCggKG46YW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobiwgY29udGV4dCApO1xuXG4gICAgICAgIC8vIGNvdWxkIGJlIGltcHJvdmVkIEkgZ3Vlc3MuXG4gICAgICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcbiAgICBcbiAgICAgICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3N5bWJvbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbGVmdC52YWx1ZV07XG4gICAgICAgICAgICAgICAgaWYoIGxlZnRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSBsZWZ0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIHt9Ly9jb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC50eXBlICE9PSBcImNsYXNzXCIpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxvY2FsX3N5bWJvbHNbbGVmdC52YWx1ZV0gPSByZXN1bHRfdHlwZTtcbiAgICAgICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVmdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCByZXN1bHRfdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgLi4ubGVmdHMsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQXNzaWduT3BlcmF0b3JzIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGxldCBvcCA9IChBc3NpZ25PcGVyYXRvcnMgYXMgYW55KVt0aGlzLnZhbHVlXTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSBhID0gYSArIGJcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH09ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuICAgICAgICAvKlxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHJldHVybiB0b0pTKCBtZXRob2Quc3Vic3RpdHV0ZV9jYWxsISh0aGlzLCBsZWZ0LCByaWdodCksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUudGFyZ2V0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIGxlZnQucmVzdWx0X3R5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodCA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBjb25zdCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlIVt0aGlzLnZhbHVlXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IChibmFtZTJweW5hbWUgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSByZXZlcnNlZCBvcGVyYXRvclxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgb3AgICAgID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSByaWdodC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlISk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCB0eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9mbG9hdDogKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCBhL2IgKTtcbiAgICB9LFxuICAgIGZsb29yZGl2X2ludDogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIC0tcmVzdWx0O1xuICAgIH0sXG4gICAgbW9kX2Zsb2F0OiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcblxuICAgICAgICBjb25zdCBtb2QgPSAoYSAlIGIgKyBiKSAlIGI7XG4gICAgICAgIGlmKCBtb2QgPT09IDAgJiYgYiA8IDAgKVxuICAgICAgICAgICAgcmV0dXJuIC0wO1xuICAgICAgICByZXR1cm4gbW9kO1xuICAgIH0sXG4gICAgbW9kX2ludDogPFQ+KGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIChhICUgYiArIGIpICUgYjtcbiAgICB9XG59IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBtdWx0aV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyggbXVsdGlfanNvcCh0aGlzLCB0aGlzLnZhbHVlLCAuLi50aGlzLmNoaWxkcmVuKSAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuY29uc3QgYm5hbWUyanNvcCA9IHtcbiAgICAnQW5kJzogJyYmJyxcbiAgICAnT3InIDogJ3x8J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUudmFsdWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCApICk7XG5cbiAgICBjb25zdCBvcCAgID0gKGJuYW1lMmpzb3AgYXMgYW55KVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICBjb25zdCB0eXBlID0gY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYm9vbGVhblwiLCB0eXBlLCBvcCwgY2hpbGRyZW4pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJvb2xPcFwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmZ1bmN0aW9uIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZShub2RlOiBBU1ROb2RlLCBsZWZ0OkFTVE5vZGUsIG9wOiBzdHJpbmcsIHJpZ2h0OiBBU1ROb2RlKSB7XG4gICAgXG4gICAgbGV0IHJldmVyc2VkID0gZmFsc2U7XG4gICAgY29uc3QgcnR5cGUgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBjb25zdCBsdHlwZSA9IGxlZnQucmVzdWx0X3R5cGU7XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZTtcbiAgICBsZXQgbWV0aG9kID0gbGVmdC5yZXN1bHRfdHlwZT8uW29wXSBhcyBTVHlwZUZjdFN1YnM7XG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSkge1xuXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wIGFzIGFueSk7XG4gICAgICAgIG1ldGhvZCA9IHJpZ2h0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlISk7XG4gICAgICAgIFxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlKSB7XG4gICAgICAgICAgICBpZiggb3AgIT09ICdfX2VxX18nICYmIG9wICE9PSAnX19uZV9fJyApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2x0eXBlfSAke29wfSAke3J0eXBlfSBub3QgaW1wbGVtZW50ZWQhYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGpzb3AgPSBvcCA9PT0gJ19fZXFfXycgPyAnPT09JyA6ICchPT0nO1xuXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwganNvcCwgcmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEobm9kZSwgbGVmdCwgcmlnaHQsIHJldmVyc2VkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9ICcnO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwIClcbiAgICAgICAgICAgIGpzICs9IHRvSlMoJyAmJiAnLCBjdXJzb3IpO1xuXG4gICAgICAgIGNvbnN0IG9wICAgID0gdGhpcy52YWx1ZVtpXTtcbiAgICAgICAgY29uc3QgbGVmdCAgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuY2hpbGRyZW5baSsxXTtcblxuICAgICAgICBpZiggb3AgPT09ICdpcycgKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnPT09JywgcmlnaHQpLCBjdXJzb3IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9wID09PSAnaXMgbm90JyApIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICchPT0nLCByaWdodCksIGN1cnNvcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVE9ETzogY2hhaW4uLi5cbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlMoIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LCBvcCwgcmlnaHQpLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9ib29sIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBvcHMgPSBub2RlLm9wcy5tYXAoIChlOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3AgPSAoYm5hbWUycHluYW1lIGFzIGFueSlbZS5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UuY29uc3RydWN0b3IuJG5hbWV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcbiAgICAgICAgcmV0dXJuIG9wO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVmdCAgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0cyA9IG5vZGUuY29tcGFyYXRvcnMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBvcGVyYXRvcnMuY29tcGFyZWAsIFNUeXBlX2Jvb2wsIG9wcyxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIC4uLnJpZ2h0cyxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBJbnQyTnVtYmVyLCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgLy9sZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgaWYoIHRoaXMudmFsdWUgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gdG9KUyggdW5hcnlfanNvcCh0aGlzLCAnIScsIEludDJOdW1iZXIobGVmdCwgJ2pzaW50JykgKSwgY3Vyc29yICk7XG5cbiAgICBjb25zdCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlIVt0aGlzLnZhbHVlXSBhcyBTVHlwZUZjdFN1YnM7XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLnN1YnN0aXR1dGVfY2FsbCEodGhpcywgbGVmdC8qLCByaWdodCovKSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVGY3RTdWJzIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfYm9vbCwgU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gKGJuYW1lMnB5bmFtZSBhcyBhbnkpW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiggb3AgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgU1R5cGVfYm9vbCwgXCJub3RcIiwgWyBsZWZ0IF0gKTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGxldCBtZXRob2QgPSBsZWZ0LnJlc3VsdF90eXBlPy5bb3BdIGFzIFNUeXBlRmN0U3VicztcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUoKTtcblxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke29wfSAke2xlZnQucmVzdWx0X3R5cGV9IE5PVCBJTVBMRU1FTlRFRCFgKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05PVCBJTVBMRU1FTlRFRCEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgdHlwZSwgb3AsIFsgbGVmdCBdICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiVW5hcnlPcFwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKFwiLyogbm90IGltcGxlbWVudGVkICovXCIsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInBhc3NcIiwgbnVsbCk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlBhc3NcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdG9KUyhcInJldHVybiBudWxsXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhyYHJldHVybiAke3RoaXMuY2hpbGRyZW5bMF19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTm9uZVR5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBpZihub2RlLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBTVHlwZV9Ob25lVHlwZSwgbnVsbCk7XG5cbiAgICBjb25zdCBleHByID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBleHByLnJlc3VsdF90eXBlLCBudWxsLCBbZXhwcl0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmV0dXJuXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJ7XCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrPTIpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5baV19OiAke3RoaXMuY2hpbGRyZW5baSsxXX1gLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXkobm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGRyZW5bMippXSAgID0gY29udmVydF9ub2RlKG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW5bMippKzFdID0gY29udmVydF9ub2RlKG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmRpY3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIGNoaWxkcmVuXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkRpY3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIltcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIl1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTGlzdFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiT2JqZWN0LmZyZWV6ZShbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5saXN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlLCBjdXJzb3IpOyAvL1RPRE9cbn0iLCJpbXBvcnQgX3JfIGZyb20gXCIuLi8uLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBpc0NsYXNzKF86IHVua25vd24pIHtcbiAgICAvLyBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUyNjU1OS90ZXN0aW5nLWlmLXNvbWV0aGluZy1pcy1hLWNsYXNzLWluLWphdmFzY3JpcHRcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoXyk/LnByb3RvdHlwZT8ud3JpdGFibGUgPT09IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIHZhbHVlID09PSAnc2VsZicpXG4gICAgICAgIHZhbHVlID0gJ3RoaXMnOyAvL1RPRE8gdHlwZSBvZiBjdXJyZW50IGNvbnRleHQgISAtPiBzZWxmIGluIGxvY2FsX3N5bWJvbHMgP1xuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfc3ltYm9scylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3N5bWJvbHNbdmFsdWVdO1xuXG4gICAgLypcbiAgICAgICAgLy9UT0RPIGdsb2JhbFN5bWJvbHNcbiAgICBlbHNlIGlmKHZhbHVlIGluIF9yXykge1xuICAgICAgICBpZiggaXNDbGFzcyhfcl9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7dmFsdWV9YDtcblxuICAgICAgICB2YWx1ZSA9IGBfcl8uJHt2YWx1ZX1gO1xuICAgIH1cbiAgICAqL1xuXG4gICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzeW1ib2xcIiwgcmVzdWx0X3R5cGUsIHZhbHVlKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5cbmV4cG9ydCB0eXBlIEFTVCA9IHtcbiAgICBub2RlczogQVNUTm9kZVtdLFxuICAgIGZpbGVuYW1lOiBzdHJpbmdcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgKHR5cGVvZiBDT1JFX01PRFVMRVMpW2tleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdW10+ID0ge31cblxuZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcblxuICAgIGNvbnN0IG1vZHVsZSA9IENPUkVfTU9EVUxFU1ttb2R1bGVfbmFtZSBhcyBrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXTtcblxuICAgIGxldCBuYW1lcyA9IFtcIm51bGxcIl07XG4gICAgaWYoIFwiYnJ5dGhvbl9uYW1lXCIgaW4gbW9kdWxlLkFTVF9DT05WRVJUKSB7XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkobW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZSkgKSB7XG4gICAgICAgICAgICBuYW1lcyA9IG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lcyA9IFttb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBuYW1lIG9mIG5hbWVzKVxuICAgICAgICAobW9kdWxlc1tuYW1lXSA/Pz0gW10pLnB1c2gobW9kdWxlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzOiBjb252ZXJ0X2FzdChfYXN0KSxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVUeXBlKGJyeXRob25fbm9kZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnJ5dGhvbl9ub2RlLnNicnl0aG9uX3R5cGUgPz8gYnJ5dGhvbl9ub2RlLmNvbnN0cnVjdG9yLiRuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWQ6XCIsIG5hbWUpO1xuICAgICAgICBjb25zb2xlLndhcm4oYGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coIGJyeXRob25fbm9kZSApO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgaGF2ZSBtYW55IG1vZHVsZXMgZm9yIHRoZSBzYW1lIG5vZGUgdHlwZS5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7IFxuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rwb3Mobm9kZTogYW55W10pIHtcblxuICAgIGxldCBiZWcgPSBub2RlWzBdO1xuICAgIGxldCBlbmQgPSBub2RlW25vZGUubGVuZ3RoLTFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9saW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgLy9jb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIGxpbmVubyA6IGJlZy5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3N5bWJvbHMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfc3ltYm9sc31cbiAgICB9XG4gICAgdHlwZTtcbiAgICBsb2NhbF9zeW1ib2xzOiBSZWNvcmQ8c3RyaW5nLCBTVHlwZU9ianxudWxsPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXN0KGFzdDogYW55KTogQVNUTm9kZVtdIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5KGFzdC5ib2R5Lmxlbmd0aCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdC5ib2R5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzXG4gICAgICAgIHJlc3VsdFtpXSA9IGNvbnZlcnRfbGluZShhc3QuYm9keVtpXSwgY29udGV4dCk7XG5cblxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdFtpXS50eXBlKTtcbiAgICB9XG5cbiAgICAvL1RPRE86IGRldGVjdCBjb21tZW50cy4uLlxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvLyBAdHMtbm9jaGVja1xuXG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGluZSAgOiBudW1iZXIsXG4gICAgbGluZV9vZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBub2RlcyA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuXG4gICAgbGV0IGN1cnNvciA9IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBsaW5lX29mZnNldCA6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNoYXI7XG4gICAgZG8ge1xuICAgICAgICBub2Rlcy5wdXNoKCBwYXJzZUV4cHJlc3Npb24oY29kZSwgY3Vyc29yKSBhcyBhbnkpO1xuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgd2hpbGUoIGNoYXIgPT09ICdcXG4nICkge1xuICAgICAgICAgICAgY2hhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgfSB3aGlsZSggY2hhciAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdC8vY29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlcyxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfY29udmVydCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN5bWJvbChjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnYScgJiYgY2FyIDw9ICd6JyB8fCBjYXIgPj0gJ0EnICYmIGNhciA8PSAnWicgfHwgY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIHx8IGNhciA9PSAnXycgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgY29uc3Qgc3ltYm9sID0gY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpO1xuXG4gICAgLy9UT0RPOiBpZiBrZXl3b3JkLi4uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJzeW1ib2xcIixcbiAgICAgICAgdmFsdWUgICA6IHN5bWJvbCwgLy9UT0RPOiBjZiBjb252ZXJ0IChzZWFyY2ggaW4gbG9jYWwgdmFyaWFibGVzL0NvbnRleHQuLi4pXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2NvbnZlcnRcbiAgICB9O1xufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX2ludCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU51bWJlcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgLy9UT0RPOiByZWFsLi4uXG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLmludFwiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19pbnQsXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX3N0ciBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnXCInICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgKytjdXJzb3Iub2Zmc2V0O1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLnN0cmluZ1wiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19zdHIsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGxldCBsZWZ0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIGlmKCBjaGFyID09PSAnXFxuJylcbiAgICAgICAgcmV0dXJuIGxlZnQ7XG5cbiAgICBsZXQgb3AgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgb3AhLmNoaWxkcmVuWzBdID0gbGVmdDtcbiAgICBvcC5weWNvZGUuc3RhcnQgPSBsZWZ0LnB5Y29kZS5zdGFydDtcblxuICAgIGxldCB2YWx1ZXMgPSBbb3AsIHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKV07XG5cbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciAhPT0gJ1xcbicgKSB7XG5cbiAgICAgICAgbGV0IG9wMiAgID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG5cbiAgICAgICAgbGV0IG9wMSAgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXTtcbiAgICAgICAgbGV0IGxlZnQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcblxuICAgICAgICAvL1RPRE86IGhhbmRsZSBvcCBwcmlvcml0eS4uLlxuICAgICAgICAvLyAoYStiKStjXG5cbiAgICAgICAgLy8gKGErYilcbiAgICAgICAgb3AxIS5jaGlsZHJlblsxXSA9IGxlZnQ7XG4gICAgICAgIG9wMSEucHljb2RlLmVuZCAgPSBsZWZ0LnB5Y29kZS5lbmQ7IFxuXG4gICAgICAgIC8vICgpK2NcbiAgICAgICAgb3AyIS5jaGlsZHJlblswXSA9IG9wMTtcbiAgICAgICAgb3AyLnB5Y29kZS5zdGFydCA9IG9wMS5weWNvZGUuc3RhcnQ7XG5cbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl0gPSBvcDI7XG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdID0gcmlnaHQ7XG5cbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgfVxuXG4gICAgdmFsdWVzWzBdIS5jaGlsZHJlblsxXSA9IHZhbHVlc1sxXTtcbiAgICB2YWx1ZXNbMF0hLnB5Y29kZS5lbmQgID0gdmFsdWVzWzFdLnB5Y29kZS5lbmQ7XG5cbiAgICByZXR1cm4gdmFsdWVzWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdG9yKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldCsrXTtcbiAgICAvKlxuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICcnICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdOyovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJvcGVyYXRvcnMuXCIgKyBjaGFyLFxuICAgICAgICB2YWx1ZSAgIDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IENPUkVfTU9EVUxFU1tcIm9wZXJhdG9ycy5cIiArIGNoYXJdLkFTVDJKUyxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgLy8gaWdub3JlIHdoaXRlc3BhY2VcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgPT09ICcgJyB8fCBjaGFyID09PSAnXFx0JyApXG4gICAgICAgIGNoYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgLy8gaWdub3JlIGNoYXJcbiAgICBpZiggY2hhciA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSBudWxsXG4gICAgaWYoIGNoYXIgPT09ICdcIicpXG4gICAgICAgIG5vZGUgPSBwYXJzZVN0cmluZyhjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ3onIHx8IGNoYXIgPj0gJ0EnICYmIGNoYXIgPD0gJ1onIHx8IGNoYXIgPT0gJ18nIClcbiAgICAgICAgbm9kZSA9IHBhcnNlU3ltYm9sKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIG5vZGUgPSBwYXJzZU51bWJlcihjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZSA9IHBhcnNlT3BlcmF0b3IoY29kZSwgY3Vyc29yKTtcbiAgICAgICAgLy87IHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hlbiBwYXJzaW5nICR7Y2hhcn0gYXQgJHtjdXJzb3IubGluZX06JHtjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0fSAoJHtjdXJzb3Iub2Zmc2V0fSlgKTtcblxuICAgIG5vZGUucHljb2RlID0ge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RPRE86IGlzIG5leHQgYW4gb3BlcmF0b3IgPyAtPiBjb25zdHJ1aXJlIGFyYnJlLi4uXG4gICAgLy9UT0RPIGhhbmRsZSBvcGVyYXRvcnMgP1xuXG4gICAgcmV0dXJuIG5vZGU7XG5cbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBfcl99IGZyb20gXCIuL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHtfYl99IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5leHBvcnQge19iXywgX3JffTtcblxuLy8gY2xhc3NlID9cblxuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIGJ1aWxkTW9kdWxlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coanNjb2RlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICB9XG5cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSB0aGlzLmJ1aWxkTW9kdWxlKGpzY29kZSwgYXN0KSh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuaW50ZXJmYWNlIElBU1ROb2RlICB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXTtcblx0cmVzdWx0X3R5cGU6IFNUeXBlT2JqfG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUgaW1wbGVtZW50cyBJQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCByZXN1bHRfdHlwZTogU1R5cGVPYmp8bnVsbCwgX3ZhbHVlOiBhbnkgPSBudWxsLCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuXHRcdHRoaXMudHlwZSAgID0gdHlwZTtcblx0XHR0aGlzLnJlc3VsdF90eXBlID0gcmVzdWx0X3R5cGU7XG5cdFx0dGhpcy52YWx1ZSAgPSBfdmFsdWU7XG5cdFx0dGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuITtcblx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdH0sXG5cdFx0XHRlbmQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwiLi9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZUZjdFN1YnMsIFNUeXBlT2JqIH0gZnJvbSBcIi4vU1R5cGVcIjtcbmltcG9ydCB7IFNUeXBlX2Jvb2wsIFNUeXBlX2ludCwgU1R5cGVfanNpbnQsIFNUeXBlX05vdEltcGxlbWVudGVkVHlwZSB9IGZyb20gXCIuL1NUeXBlc1wiO1xuXG5leHBvcnQgY29uc3QgYm5hbWUycHluYW1lID0ge1xuICAgIFwiVVN1YlwiOiBcIl9fbmVnX19cIixcbiAgICBcIk5vdFwiIDogXCJub3RcIixcblxuICAgIFwiUG93XCIgOiBcIl9fcG93X19cIixcblxuICAgIFwiTXVsdFwiICAgIDogXCJfX211bF9fXCIsXG4gICAgXCJEaXZcIiAgICAgOiBcIl9fdHJ1ZWRpdl9fXCIsXG4gICAgXCJGbG9vckRpdlwiOiBcIl9fZmxvb3JkaXZfX1wiLFxuICAgIFwiTW9kXCIgICAgIDogXCJfX21vZF9fXCIsXG5cbiAgICBcIkFkZFwiICAgICA6IFwiX19hZGRfX1wiLFxuICAgIFwiU3ViXCIgICAgIDogXCJfX3N1Yl9fXCIsXG5cbiAgICBcIklzXCIgICAgICA6IFwiaXNcIixcbiAgICBcIklzTm90XCIgICA6IFwiaXMgbm90XCIsXG4gICAgXCJFcVwiICAgICAgOiBcIl9fZXFfX1wiLFxuICAgIFwiTm90RXFcIiAgIDogXCJfX25lX19cIixcblxuICAgIFwiR3RcIiAgICAgIDogXCJfX2d0X19cIixcbiAgICBcIkd0RVwiICAgICA6IFwiX19nZV9fXCIsXG4gICAgXCJMdFwiICAgICAgOiBcIl9fbHRfX1wiLFxuICAgIFwiTHRFXCIgICAgIDogXCJfX2xlX19cIixcblxuICAgIFwiSW52ZXJ0XCIgIDogXCJfX25vdF9fXCIsXG5cbiAgICBcIkJpdE9yXCIgICA6IFwiX19vcl9fXCIsXG4gICAgXCJCaXRYb3JcIiAgOiBcIl9feG9yX19cIixcbiAgICBcIkJpdEFuZFwiICA6IFwiX19hbmRfX1wiLFxuICAgIFwiUlNoaWZ0XCIgIDogXCJfX3JzaGlmdF9fXCIsXG4gICAgXCJMU2hpZnRcIiAgOiBcIl9fbHNoaWZ0X19cIixcbn1cblxuZXhwb3J0IGNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19fcnBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19fcm11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19fcnRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX3JmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19fcm1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX3JhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19fcnN1Yl9fJyxcblxuICAgICdfX2VxX18nICAgICA6ICdfX2VxX18nLFxuICAgICdfX25lX18nICAgICA6ICdfX25lX18nLFxuXG4gICAgJ19fbHRfXycgICAgIDogJ19fZ3RfXycsXG4gICAgJ19fZ3RfXycgICAgIDogJ19fbHRfXycsXG4gICAgJ19fbGVfXycgICAgIDogJ19fZ2VfXycsXG4gICAgJ19fZ2VfXycgICAgIDogJ19fbGVfXycsXG5cbiAgICAnX19ub3RfXycgICAgOiAnX19ybm90X18nLFxuICAgICdfX29yX18nICAgICA6ICdfX3Jvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19yYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX3J4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19fcmxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19ycnNoaWZ0X18nLFxufVxuXG5leHBvcnQgY29uc3QgQXNzaWduT3BlcmF0b3JzID0ge1xuICAgICdfX3Bvd19fJyAgICAgOiAnX19pcG93X18nLFxuICAgICdfX211bF9fJyAgICAgOiAnX19pbXVsX18nLFxuICAgICdfX3RydWVkaXZfXycgOiAnX19pdHJ1ZWRpdl9fJyxcbiAgICAnX19mbG9vcmRpdl9fJzogJ19faWZsb29yZGl2X18nLFxuICAgICdfX21vZF9fJyAgICAgOiAnX19pbW9kX18nLFxuXG4gICAgJ19fYWRkX18nICAgIDogJ19faWFkZF9fJyxcbiAgICAnX19zdWJfXycgICAgOiAnX19pc3ViX18nLFxuXG4gICAgJ19fb3JfXycgICAgIDogJ19faW9yX18nLFxuICAgICdfX2FuZF9fJyAgICA6ICdfX2lhbmRfXycsXG4gICAgJ19feG9yX18nICAgIDogJ19faXhvcl9fJyxcbiAgICAnX19sc2hpZnRfXycgOiAnX19pbHNoaWZ0X18nLFxuICAgICdfX3JzaGlmdF9fJyA6ICdfX2lyc2hpZnRfXycsXG59XG5cblxuZXhwb3J0IGNvbnN0IGpzb3AycHlvcCA9IHtcbiAgICAnKionOiAncG93JyxcbiAgICAnKicgOiAnbXVsJyxcbiAgICAnLycgOiAndHJ1ZWRpdicsXG4gICAgJy8vJzogJ2Zsb29yZGl2JyxcbiAgICAnJScgOiAnbW9kJyxcbiAgICBcbiAgICAnKycgIDogJ2FkZCcsXG4gICAgJy0nICA6ICdzdWInLFxuICAgICd1Li0nOiAnbmVnJyxcblxuICAgICc9PScgOiAnZXEnLFxuICAgICchPScgOiAnbmUnLFxuICAgICc8JyAgOiAnbHQnLFxuICAgICc8PScgOiAnbGUnLFxuICAgICc+PScgOiAnZ2UnLFxuICAgICc+JyAgOiAnZ3QnLFxuXG4gICAgJ34nIDogJ25vdCcsXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWyd1Li0nXSxcbiAgICBbJyoqJ10sIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnKicsICcvJywgJyUnXSwgLy8gUHl0aG9uIGFsc28gaGFzIC8vXG4gICAgWycrJywgJy0nXSxcbiAgICBbJzw8JywgJz4+JywgJz4+PiddLCAvL1RPRE9cbiAgICBbJzwnLCAnPD0nLCAnPj0nLCAnPiddLFxuICAgIFsnPT0nLCAnIT0nLCAnPT09JywgJyE9PSddLFxuICAgIFsnJiddLCAgLy9UT0RPXG4gICAgWydeJ10sICAvL1RPRE9cbiAgICBbJ3wnXSwgIC8vVE9ET1xuICAgIFsnJiYnXSwgLy9UT0RPXG4gICAgWyd8fCcsICc/PyddLFxuICAgIFsnPSddIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICAvLyBldGMuXG5dO1xuXG4vKlxuaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI2NhbGxhYmxlXG5cbi0+IGNsYXNzZXNcbmJvb2woKVxuZmxvYXQoKVxuaW50KClcbnN0cigpXG5ieXRlYXJyYXkoKSBbVWludDhBcnJheV0gKFJXKVxuYnl0ZXMoKSAgICAgWz9dICAgICAgICAgIChSTykgPC0gbm8gdHlwZXMgaW4gSlMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtIFVpbnQ4QXJyYXkgd2l0aCBmbGFnID8gZnJlZXplKCkgW0pTIHVuc2FmZV1cbiAgICAgICAgICAgIGJcImVcXHhGRlwiIGluc3RlYWQgb2YgWzEwMSwxMDFdLCBldGMuICgzMiA8PSBieXQgPD0gMTI2KVxudHlwZSgpXG5saXN0KCkgICAgICBbQXJyYXldXG50dXBsZSgpICAgICBbT2JqZWN0LmZyb3plbihBcnJheSldXG5cbnNldCgpICAgICAgIC8vIHJlbGllcyBvbiBoYXNoKCkuLi4gPT4gc2V0W2xpdGVyYWxzXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHNldCgpIC8gPC0gSlMgc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICA9PiBieXRlcy9ieXRlYXJyYXkvZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgU2V0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gSW50ZXJuYWwga2V5cygpIHNldCBbcmVjb21wdXRlIGhhc2ggd2hlbiBhZGQvcmVtb3ZlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGludGVybmFsbHkgc3RvcmVkIGFzIE1hcChoYXNoLCB2YWx1ZSkgKD8pXG5mcm96ZW5zZXQoKSAgICAgICAgICAgID0+IGV4dGVuZHMgc2V0IHRvIHJlcGxhY2UgbW9kaWZpZXJzLlxuXG5kaWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc3RyXSBhcyBPYmplY3QuY3JlYXRlKG51bGwpICsgKGFuZCBwdXJlIEpTT2JqIGFzIGRpY3Rbc3RyXSApXG4gICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IE1hcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gU2V0KGhhc2gpIC8gTWFwKGhhc2gsIGtleSkgLyBNYXAoa2V5LCBoYXNoKSA/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0L3NldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBNYXAoa2V5LCB2YWx1ZSlcblxub2JqZWN0KClcbmNvbXBsZXgoKVxubWVtb3J5dmlldygpICAgICAgICAgICAgPT4gQXJyYXlCdWZmZXIgP1xuXG4tPiBwcmludFxuYXNjaWkoKVxuYmluKClcbmhleCgpXG5vY3QoKVxucmVwcigpXG5oYXNoKClcblxuLT4gbWF0aHNcbmFicygpXG5kaXZtb2QoKVxucG93KClcbnJvdW5kKClcblxuLT4gbGlzdHNcbmFsbCgpXG5hbnkoKVxuZmlsdGVyKClcbm1hcCgpXG5tYXgoKVxubWluKClcbnN1bSgpXG5sZW4oKVxuZW51bWVyYXRlKClcbnJldmVyc2VkKClcbnNsaWNlKClcbnNvcnRlZCgpXG56aXAoKVxuXG4tPiBpdGVyXG5yYW5nZSgpXG5haXRlcigpXG5pdGVyKClcbmFuZXh0KClcbm5leHQoKVxuXG4tPiBzdHJcbm9yZCgpXG5jaHIoKVxuZm9ybWF0KClcbnByaW50KClcbmZcIlwiXG5cbmNhbGxhYmxlKClcbmNsYXNzbWV0aG9kKClcbnN0YXRpY21ldGhvZCgpXG5wcm9wZXJ0eSgpXG5zdXBlcigpXG5pc2luc3RhbmNlKClcbmlzc3ViY2xhc3MoKVxuZGVsYXR0cigpXG5nZXRhdHRyKClcbmhhc2F0dHIoKVxuc2V0YXR0cigpXG5kaXIoKVxuXG5ldmFsKClcbmV4ZWMoKVxuY29tcGlsZSgpXG5icmVha3BvaW50KClcblxuZ2xvYmFscygpXG5sb2NhbHMoKVxudmFycygpXG5fX2ltcG9ydF9fKClcblxuaWQoKVxuICAgIC0+IG9uLWRlbWFuZCB3ZWFrcmVmID9cblxuaGVscCgpXG5pbnB1dCgpXG5vcGVuKClcblxuKi9cblxuLypcbnVuYXJ5XG4tIHBvcyAodW5hcnkgKylcblxuLSBib29sXG4tIGZsb2F0XG4tIGludFxuLSBzdHJcbi0gcmVwclxuXG4tIGFic1xuLSBjZWlsXG4tIGZsb29yXG4tIHJvdW5kXG4tIHRydW5jXG5cbmJpbmFyeVxuLSBwb3cvcnBvd1xuLSBkaXZtb2QvcmRpdm1vZFxuXG5jbGFzc1xuLSBjbGFzc1xuLSBuZXdcbi0gaW5pdFxuLSBpbml0X3N1YmNsYXNzXG5cbi0gc3ViY2xhc3Nob29rIC8vIF9faXNpbnN0YW5jZWNoZWNrX18gXG5cbi0gZGlyXG4tIGRlbGF0dHJcbi0gc2V0YXR0clxuLSBnZXRhdHRyaWJ1dGVcblxuLSBkb2Ncbi0gZm9ybWF0XG4tIGdldG5ld2FyZ3Ncbi0gaGFzaFxuLSBpbmRleCAoPylcbi0gc2l6ZW9mXG4qL1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnQyTnVtYmVyKGE6IEFTVE5vZGUsIHRhcmdldCA9IFwiZmxvYXRcIikge1xuXG4gICAgaWYoIGEucmVzdWx0X3R5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICByZXR1cm4gYTtcblxuICAgIGlmKCBhLnR5cGUgPT09ICdsaXRlcmFscy5pbnQnKSB7XG4gICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbXVsX18nIHx8IGEudmFsdWUgPT09ICdfX3JtdWxfXycgKSB7XG4gICAgICAgIGNvbnN0IGx0eXBlID0gYS5jaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcbiAgICAgICAgY29uc3QgcnR5cGUgPSBhLmNoaWxkcmVuWzFdLnJlc3VsdF90eXBlO1xuICAgICAgICBpZiggICAgKGx0eXBlID09PSBTVHlwZV9pbnQgfHwgbHR5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICAgICAgJiYgKHJ0eXBlID09PSBTVHlwZV9pbnQgfHwgcnR5cGUgPT09IFNUeXBlX2pzaW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIChhIGFzIGFueSkuYXMgPSB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiggYS52YWx1ZSA9PT0gJ19fbmVnX18nICYmIGEuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGUgPT09IFNUeXBlX2ludCkge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIHRhcmdldCA9PT0gXCJmbG9hdFwiIClcbiAgICAgICAgcmV0dXJuIHJgTnVtYmVyKCR7YX0pYDtcblxuICAgIC8vIGludCAtPiBqc2ludCBjYXN0IGlzIGZhY3VsdGF0aXZlLi4uXG4gICAgcmV0dXJuIGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOdW1iZXIySW50KGE6IEFTVE5vZGUpIHtcblxuICAgIGlmKCBhLnJlc3VsdF90eXBlID09PSBTVHlwZV9pbnQpXG4gICAgICAgIHJldHVybiBhO1xuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hcyA9ICdpbnQnO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIGEudmFsdWUgPT09ICdfX25lZ19fJyAmJiBhLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlID09PSBTVHlwZV9qc2ludCkge1xuICAgICAgICAoYSBhcyBhbnkpLmFzID0gXCJpbnRcIjtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgQmlnSW50KCR7YX0pYDtcbn1cblxubGV0IEpTT3BlcmF0b3JzUHJpb3JpdHk6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbmZvcihsZXQgaSA9IDA7IGkgPCBKU09wZXJhdG9ycy5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBKU09wZXJhdG9ycy5sZW5ndGggLSBpO1xuICAgIGZvcihsZXQgb3Agb2YgSlNPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5jb25zdCBMRUZUICA9IDE7XG5jb25zdCBSSUdIVCA9IDI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aV9qc29wKG5vZGU6IEFTVE5vZGUsIG9wOiBzdHJpbmcsIC4uLnZhbHVlczogQVNUTm9kZVtdKSB7XG5cbiAgICBjb25zdCBmaXJzdCA9IHZhbHVlc1swXTtcbiAgICBpZihmaXJzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChmaXJzdCBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgICAgICAodmFsdWUgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUfFJJR0hUO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmKGxhc3QgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChsYXN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7Zmlyc3R9YDtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKVxuICAgICAgICByZXN1bHQgPSByYCR7cmVzdWx0fSAmJiAke3ZhbHVlc1tpXX1gO1xuXG4gICAgaWYoIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlkX2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkge1xuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgJHthfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlfGFueSwgb3A6IHN0cmluZywgYjogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gTEVGVDtcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgKGRpcmVjdGlvbiAmIFJJR0hUKSApXG4gICAgICAgIClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVuYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgYTogQVNUTm9kZXxhbnksIGNoZWNrX3ByaW9yaXR5ID0gdHJ1ZSkge1xuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtvcH0ke2F9YDtcblxuICAgIGlmKG9wID09PSAnLScpXG4gICAgICAgIG9wID0gJ3UuLSc7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cblxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCAoZGlyZWN0aW9uICYgTEVGVCkgJiYgcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IClcbiAgICAgICAgICAgIHJlc3VsdCA9IHJgKCR7cmVzdWx0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG50eXBlIEdlblVuYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9zZWxmICAgPzogKHM6IGFueSkgPT4gYW55LFxuICAgIHN1YnN0aXR1dGVfY2FsbCA/OiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkgPT4gYW55XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5VbmFyeU9wcyhyZXRfdHlwZSAgOiBTVHlwZU9iaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHMgICAgICAgOiAoa2V5b2YgdHlwZW9mIGpzb3AycHlvcClbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiA9IChhKSA9PiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5VbmFyeU9wc19PcHRzID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgbGV0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgU1R5cGVGY3RTdWJzPiA9IHt9O1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogU1R5cGVPYmopID0+IHJldF90eXBlO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcbiAgICAgICAgaWYoIG9wID09PSAndS4tJylcbiAgICAgICAgICAgIG9wID0gJy0nO1xuXG4gICAgICAgIHN1YnN0aXR1dGVfY2FsbCA/Pz0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsIG9wLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRbYF9fJHtweW9wfV9fYF0gPSB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG50eXBlIEdlbkJpbmFyeU9wc19PcHRzID0ge1xuICAgIGNvbnZlcnRfb3RoZXIgICA/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgIGNvbnZlcnRfc2VsZiAgICA/OiAoczogYW55KSA9PiBhbnksXG4gICAgc3Vic3RpdHV0ZV9jYWxsID86IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlfGFueSwgb3RoZXI6IEFTVE5vZGV8YW55KSA9PiBhbnlcbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICByZXR1cm4gKG5vZGU6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3JjICAgID0gbm9kZS5yZXN1bHRfdHlwZSEuX19uYW1lX187XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGNvbnZlcnRbc3JjXTtcbiAgICAgICAgaWYoIHRhcmdldCA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICAgIC8vVE9ETzogaW1wcm92ZTpcbiAgICAgICAgaWYoIHNyYyA9PT0gXCJpbnRcIilcbiAgICAgICAgICAgIHJldHVybiBJbnQyTnVtYmVyKG5vZGUsIHRhcmdldCk7XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IFwiaW50XCIgKVxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcjJJbnQobm9kZSk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5mb3VuZCBjb252ZXJzaW9uXCIpO1xuICAgIH07XG59XG5cbmNvbnN0IGlkRmN0ID0gPFQ+KGE6IFQpID0+IGE7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5CaW5hcnlPcHMocmV0X3R5cGU6IFNUeXBlT2JqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wczogKGtleW9mIHR5cGVvZiBqc29wMnB5b3ApW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdHlwZTogU1R5cGVPYmpbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgICA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICB9OiBHZW5CaW5hcnlPcHNfT3B0cyA9IHt9KSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBTVHlwZU9iaikgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IHJldF90eXBlIDogU1R5cGVfTm90SW1wbGVtZW50ZWRUeXBlO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcblxuICAgICAgICBjb25zdCBweW9wID0ganNvcDJweW9wW29wXTtcbiAgICAgICAgaWYoIG9wID09PSAnLy8nKVxuICAgICAgICAgICAgb3AgPSAnLyc7XG5cbiAgICAgICAgbGV0IGNzICA9IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgb3AsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmNzID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgY29udl9vdGhlcihvdGhlciksIG9wLCBjb252ZXJ0X3NlbGYoc2VsZikgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBzdWJzdGl0dXRlX2NhbGwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZV9jYWxsKG5vZGUsIGNvbnZlcnRfc2VsZihzZWxmKSwgY29udl9vdGhlcihvKSApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzYW1lX29yZGVyID8gZmN0IDogXG4gICAgICAgICAgICByY3MgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzdGl0dXRlX2NhbGwobm9kZSwgY29udl9vdGhlcihvKSwgY29udmVydF9zZWxmKHNlbGYpICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IGNzLFxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRbYF9fciR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IHJjcyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYoIGNvbnZlcnRfc2VsZiA9PT0gaWRGY3QgJiYgc3Vic3RpdHV0ZV9jYWxsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHRbYF9faSR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGVfY2FsbDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG90aGVyOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICcrJyAmJiBvdGhlci52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICcrKycsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBpZiggb3AgPT09ICctJyAmJiBvdGhlci52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctLScsIHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIHNlbGYsIG9wKyc9JywgY29udl9vdGhlcihvdGhlcikgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IENNUE9QU19MSVNUID0gWyc9PScsICchPScsICc+JywgJzwnLCAnPj0nLCAnPD0nXSBhcyBjb25zdDtcblxuY29uc3QgcmV2ZXJzZSA9IHtcbiAgICBcIj09XCI6IFwiPT1cIixcbiAgICBcIiE9XCI6IFwiIT1cIixcbiAgICBcIj5cIjogXCI8XCIsXG4gICAgXCI8XCI6IFwiPlwiLFxuICAgIFwiPj1cIjogXCI8PVwiLFxuICAgIFwiPD1cIjogXCI+PVwiLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkNtcE9wcyggIG9wcyAgICAgICA6IHJlYWRvbmx5IChrZXlvZiB0eXBlb2YgcmV2ZXJzZSlbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90eXBlOiByZWFkb25seSBTVHlwZU9ialtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydF9vdGhlciAgID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfc2VsZiAgICA9IGlkRmN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30gKSB7XG5cbiAgICBsZXQgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBTVHlwZUZjdFN1YnM+ID0ge307XG5cbiAgICBjb25zdCByZXR1cm5fdHlwZSA9IChvOiBTVHlwZU9iaikgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IFNUeXBlX2Jvb2wgOiBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGU7XG4gICAgY29uc3QgY29udl9vdGhlciAgPSBnZW5lcmF0ZUNvbnZlcnQoY29udmVydF9vdGhlcik7XG5cbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHB5b3AgPSBqc29wMnB5b3Bbb3BdO1xuXG4gICAgICAgIGxldCBjcyAgPSAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb3AgPSBvcDtcblxuICAgICAgICAgICAgbGV0IGEgPSBjb252ZXJ0X3NlbGYoc2VsZik7XG4gICAgICAgICAgICBsZXQgYiA9IGNvbnZfb3RoZXIob3RoZXIpO1xuICAgICAgICAgICAgaWYoIHJldmVyc2VkICkge1xuICAgICAgICAgICAgICAgIFthLGJdwqA9IFtiLGFdO1xuICAgICAgICAgICAgICAgIGNvcCA9IHJldmVyc2VbY29wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIGNvcFswXSA9PT0gJz0nIHx8IGNvcFswXSA9PT0gJyEnICkge1xuICAgICAgICAgICAgICAgIGlmKCBzZWxmLnJlc3VsdF90eXBlID09PSBvdGhlci5yZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgY29wID0gY29wICsgJz0nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgY29wLCBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBzdWJzdGl0dXRlX2NhbGwgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgY3MgID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVfY2FsbChub2RlLCBjb252ZXJ0X3NlbGYoc2VsZiksIGNvbnZfb3RoZXIobykgKTsgLy9UT0RPLi4uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0W2BfXyR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBzdWJzdGl0dXRlX2NhbGw6IGNzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcIi4vQVNUTm9kZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCb2R5IHtcblxuICAgIG5vZGU7XG4gICAgcHJpbnRfYnJhY2tldDtcbiAgICBpZHg7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBBU1ROb2RlLCBwcmludF9icmFja2V0ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmlkeCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7IC8vVE9ETyBzZWFyY2ggYm9keS4uLlxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLnByaW50X2JyYWNrZXQgPSBwcmludF9icmFja2V0O1xuICAgIH1cblxuICAgIHRvSlMoY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpXG4gICAgICAgICAgICBqcys9XCJ7XCI7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5pZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IpO1xuICAgICAgICAgICAganMgKz0gXCJ9XCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxufSIsIlxuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlX2pzaW50JztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGUnO1xuaW1wb3J0ICcuLy4uL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlJztcbmltcG9ydCAnLi8uLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlJzsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmNvbnN0IF9uYW1lMlNUeXBlOiBSZWNvcmQ8c3RyaW5nLFNUeXBlT2JqPiA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTVHlwZTxUIGV4dGVuZHMgU1R5cGVPYmo+KG5hbWU6IHN0cmluZyk6IFQge1xuICAgIHJldHVybiAoX25hbWUyU1R5cGVbbmFtZV0gPz89IHtfX25hbWVfXzogbmFtZX0pIGFzIFQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTVHlwZShuYW1lOiBzdHJpbmcsIHR5cGU6IE9taXQ8U1R5cGVPYmosICdfX25hbWVfXyc+KSB7XG4gICAgT2JqZWN0LmFzc2lnbiggZ2V0U1R5cGUobmFtZSksIHR5cGUgKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNUeXBlX2ludCAgICAgICAgICAgICAgICA9IGdldFNUeXBlKFwiaW50XCIpO1xuZXhwb3J0IGNvbnN0IFNUeXBlX2pzaW50ICAgICAgICAgICAgICA9IGdldFNUeXBlKFwianNpbnRcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfZmxvYXQgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJmbG9hdFwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9ib29sICAgICAgICAgICAgICAgPSBnZXRTVHlwZShcImJvb2xcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfc3RyICAgICAgICAgICAgICAgID0gZ2V0U1R5cGUoXCJzdHJcIik7XG5leHBvcnQgY29uc3QgU1R5cGVfTm9uZVR5cGUgICAgICAgICAgID0gZ2V0U1R5cGUoXCJOb25lVHlwZVwiKTtcbmV4cG9ydCBjb25zdCBTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUgPSBnZXRTVHlwZShcIk5vdEltcGxlbWVudGVkVHlwZVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbi8vIGRlY2xhcmUgYWxsIGJ1aWx0aW4gdHlwZXMuLi5cbmltcG9ydCAnLi9zdHJ1Y3RzL1NUeXBlQnVpbHRpbic7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsIkJvZHkiLCJhc3QyanMiLCJhc3QiLCJleHBvcnRlZCIsImpzIiwiZmlsZW5hbWUiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsIm5vZGVzIiwiYXN0bm9kZTJqcyIsInR5cGUiLCJwdXNoIiwidmFsdWUiLCJ0b0pTIiwibmV3bGluZSIsImpvaW4iLCJyIiwic3RyIiwiYXJncyIsImxlbmd0aCIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJwcmludF9icmFja2V0Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJqc2NvZGUiLCJlbmQiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJiYXNlIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnZlcnQiLCJjb250ZXh0IiwibG9jYWxfc3ltYm9scyIsIm5hbWUiLCJfX25hbWVfXyIsImJhc2VzIiwiRXJyb3IiLCJicnl0aG9uX25hbWUiLCJfY3Vyc29yIiwiX2NvbnRleHQiLCJiZWciLCJpbmNyIiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJTVHlwZV9ib29sIiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0IiwicmVzdWx0X3R5cGUiLCJzYnJ5dGhvbl90eXBlIiwiY3VyIiwib3JlbHNlIiwibGluZW5vIiwiY29sX29mZnNldCIsImFzdG5vZGUiLCJjYyIsInB5Y29kZSIsImhhbmRsZXJzIiwiaGFuZGxlciIsImgiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInNiIiwiZ2V0QVNURm9yIiwic3RhY2syYXN0bm9kZXMiLCJwYXJzZV9zdGFjayIsInNwbGl0IiwiaXNWOCIsImwiLCJfIiwiX2xpbmUiLCJfY29sIiwic2xpY2UiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9yYXdfZXJyXyIsInN0YWNrX3N0ciIsImV4Y2VwdGlvbl9zdHIiLCJsb2ciLCJwcmludF9vYmoiLCJvYmoiLCJlbnRyaWVzIiwiZGF0YSIsInNlcCIsInJlc3VsdCIsImRlZmF1bHRfY2FsbCIsIm1ldGEiLCJfX2NhbGxfXyIsImt3X3BvcyIsIm5iX3BvcyIsImlkeF9lbmRfcG9zIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJNYXRoIiwibWF4IiwiaWR4X3ZhcmFyZyIsInBvc19zaXplIiwiaGFzX2t3Iiwia3ciLCJrd2FyZ3MiLCJjdXRvZmYiLCJtaW4iLCJhcmdzX25hbWVzIiwiaGFzX2t3YXJncyIsImFyZ3NfcG9zIiwiYXJnIiwidW5kZWZpbmVkIiwic3Vic3RpdHV0ZV9jYWxsIiwiZmN0X3R5cGUiLCJyZXRfdHlwZSIsInJldHVybl90eXBlIiwia2V5d29yZHMiLCJiaW5hcnlfanNvcCIsIk51bWJlcjJJbnQiLCJTVHlwZV9pbnQiLCJlbmRzV2l0aCIsImFyZ3MyanMiLCJfYXJncyIsIlNUeXBlX2ZjdCIsImt3X3N0YXJ0IiwibGFzdCIsImFyZzJqcyIsImdldFNUeXBlIiwiU1R5cGVfTm9uZVR5cGUiLCJpc01ldGhvZCIsImZjdF9yZXR1cm5fdHlwZSIsInBvc29ubHlhcmdzIiwiYW5ub3RhdGlvbiIsInJldHVybnMiLCJjb252ZXJ0X2FyZ3MiLCJyZXQiLCJoYXNfdmFyYXJnIiwidmFyYXJnIiwiaGFzX2t3YXJnIiwia3dhcmciLCJ0b3RhbF9hcmdzIiwia3dvbmx5YXJncyIsInBvc19kZWZhdWx0cyIsImRlZmF1bHRzIiwicG9zb25seSIsImRvZmZzZXQiLCJjb252ZXJ0X2FyZyIsIm5iX3Bvc19kZWZhdWx0cyIsImhhc19vdGhlcnMiLCJjdXRfb2ZmIiwia3dvbmx5Iiwia3dfZGVmYXVsdHMiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJkZWZ2YWwiLCJjaGlsZCIsImFzc2VydCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiUlVOVElNRV8yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIlJVTlRJTUVfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIkFTVF9DT05WRVJUXzI5IiwiQVNUMkpTXzI5IiwiUlVOVElNRV8yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIkFTVF9DT05WRVJUXzM2IiwiQVNUMkpTXzM2IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiUlVOVElNRSIsImFzc2lnbiIsIl9iXyIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImFkZFNUeXBlIiwiQ01QT1BTX0xJU1QiLCJnZW5DbXBPcHMiLCJTVHlwZV9mbG9hdCIsIlNUeXBlX2pzaW50IiwiU1R5cGVfc3RyIiwidmFsdWVzIiwiZ2VuQmluYXJ5T3BzIiwiZ2VuVW5hcnlPcHMiLCJjb252ZXJ0X290aGVyIiwic2VsZiIsIm90aGVyIiwic3VmZml4IiwiYXMiLCJyZWFsX3R5cGUiLCJpZF9qc29wIiwiSW50Mk51bWJlciIsInVuYXJ5X2pzb3AiLCJfX2luaXRfXyIsIm1ldGhvZCIsIl9faW50X18iLCJhIiwiYiIsIm9wdGkiLCJjb252ZXJ0X3NlbGYiLCJyaWdodF9ub2RlIiwicmNoaWxkIiwicmlnaHQiLCJyaWdodF90eXBlIiwiaXNNdWx0aVRhcmdldCIsInRhcmdldHMiLCJsZWZ0cyIsImxlZnQiLCJsZWZ0X3R5cGUiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVHlwZV9Ob3RJbXBsZW1lbnRlZFR5cGUiLCJvcCIsImJuYW1lMnB5bmFtZSIsImF0dHIiLCJyZXZlcnNlZF9vcGVyYXRvciIsImZsb29yZGl2X2Zsb2F0IiwiZmxvb3IiLCJmbG9vcmRpdl9pbnQiLCJtb2RfZmxvYXQiLCJtb2QiLCJtb2RfaW50IiwibXVsdGlfanNvcCIsImJuYW1lMmpzb3AiLCJmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUiLCJyZXZlcnNlZCIsInJ0eXBlIiwibHR5cGUiLCJqc29wIiwib3BzIiwicmlnaHRzIiwiY29tcGFyYXRvcnMiLCJvcGVyYW5kIiwiZXhwciIsImtleXMiLCJlbHRzIiwiaXNDbGFzcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJwcm90b3R5cGUiLCJ3cml0YWJsZSIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiZ2V0Tm9kZVR5cGUiLCJicnl0aG9uX25vZGUiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsInBhcmVudF9jb250ZXh0IiwiY3JlYXRlIiwibGluZV9vZmZzZXQiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsImFzdDJqc19saXRlcmFsc19pbnQiLCJwYXJzZU51bWJlciIsImFzdDJqc19saXRlcmFsc19zdHIiLCJwYXJzZVN0cmluZyIsInBhcnNlVG9rZW4iLCJvcDIiLCJvcDEiLCJwYXJzZU9wZXJhdG9yIiwiZGVmYXVsdCIsIl9yXyIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJKU09wZXJhdG9yc1ByaW9yaXR5IiwicHJpb3JpdHkiLCJMRUZUIiwiUklHSFQiLCJmaXJzdCIsInBhcmVudF9vcCIsInBhcmVudF9vcF9kaXIiLCJkaXJlY3Rpb24iLCJjdXJfcHJpb3JpdHkiLCJwYXJlbnRfcHJpb3JpdHkiLCJjaGVja19wcmlvcml0eSIsIm8iLCJweW9wIiwiZ2VuZXJhdGVDb252ZXJ0Iiwic3JjIiwiaWRGY3QiLCJvdGhlcl90eXBlIiwiY29udl9vdGhlciIsImNzIiwicmNzIiwicmV2ZXJzZSIsImNvcCIsIl9uYW1lMlNUeXBlIiwicHkyYXN0X2Zhc3QiXSwic291cmNlUm9vdCI6IiJ9