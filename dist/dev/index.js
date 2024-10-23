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
    //TODO: can be better
    const klass = (0,structs_STypes__WEBPACK_IMPORTED_MODULE_2__.name2SType)(node.func.id);
    let type = null;
    if (klass !== undefined) type = klass.__init__.return_type();
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.call", type, klass, [
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


function convert(node, context) {
    const args = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_args)(node, context);
    const isMethod = context.type === "class";
    context = new py2ast__WEBPACK_IMPORTED_MODULE_0__.Context("fct", context);
    // new context for the function local variables
    context = {
        ...context
    };
    context.local_variables = {
        ...context.local_variables
    };
    for (let arg of args.children)context.local_variables[arg.value] = arg.result_type;
    // return type... node.returns.id
    let type = "functions.def";
    if (isMethod) type += "(meth)";
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, null, node.name, [
        args,
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
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
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenEqOperator)({
        supported_types: [
            "float",
            "bool"
        ],
        call_substitute (node, left, op, right) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, left, op, right);
        }
    })
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
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenEqOperator)({
        supported_types: [
            "float",
            "bool"
        ],
        call_substitute (node, left, op, right) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, left, op, right);
        }
    }),
    "__neg__": {
        return_type: ()=>'float',
        call_substitute: (node, a)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.genBinaryOps)('float', [
        '**',
        '*',
        '/',
        '%',
        '+',
        '-'
    ], [
        'float',
        'int',
        'bool'
    ], {
        convert_other: {
            'int': 'float'
        }
    }),
    //TODO... => substitute_call => no *= ?
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('floordiv', {
        return_type: {
            'int': 'int',
            'float': 'int'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Math.floor(${(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '/', b, false)})`;
        }
    })
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
    let value = this.value;
    if (this.asFloat && !this.asFloatIsOpt && typeof value === "bigint") value = Number(value);
    if (this.asFloat && typeof value === "number") return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}n`, cursor);
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.int", "int", value);
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
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenEqOperator)({
        supported_types: [
            "int",
            "float",
            "bool"
        ],
        convert: (a)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a, true),
        self_convert: (a)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a, true),
        call_substitute (node, left, op, right) {
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, left, op, right);
        }
    }),
    "__neg__": {
        return_type: ()=>'int',
        call_substitute: (node, a)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '-', a);
        }
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('pow', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '**', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('mul', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('truediv', {
        return_type: {
            'int': 'float'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a), '/', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(b), false);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('floordiv', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv(${a},${b})`; // binary_jsop(node, a, '/', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('mod', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '%', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('add', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '+', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('sub', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '-', b);
        }
    }),
    __not__: {
        return_type: ()=>'int',
        call_substitute: (node, a)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(node, '~', a)
    },
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('or', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '|', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('xor', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '^', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('and', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '&', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('lshift', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '<<', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('rshift', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '>>', b);
        }
    })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SType_int);


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
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenCmpOperator)({
        supported_types: [
            'str'
        ]
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('mul', {
        return_type: {
            'int': 'str'
        },
        convert: (a)=>(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a),
        same_order: true,
        call_substitute: (node, a, b)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}.repeat(${b})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('add', {
        return_type: {
            'str': 'str'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '+', b);
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

function ast2js(cursor) {
    let js = "";
    if (this.type.endsWith("(init)")) js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("var ", cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[0], cursor);
    for(let i = 1; i < this.children.length; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)` = ${this.children[i]}`, cursor);
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
    if ("annotation" in node) {
        right_type = node.annotation.id ?? "None";
        if (right.result_type !== null && right.result_type !== right_type) console.warn("Wrong result_type");
    }
    const isMultiTarget = "targets" in node;
    const targets = isMultiTarget ? node.targets : [
        node.target
    ];
    const lefts = targets.map((n)=>{
        const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context);
        if (left.type === "symbol") {
            // if exists, ensure type.
            if (left.value in context.local_variables) {
                const result_type = context.local_variables[left.value];
                if (result_type !== null && right_type !== result_type) console.warn("Wrong result_type");
            // annotation_type
            } else if (context.type !== "class") {
                context.local_variables[left.value] = right_type;
                type += "(init)";
            }
        }
        return left;
    });
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, right_type, null, [
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
    floordiv: (a, b)=>{
        let result = a / b;
        if (result > 0 || a % b === 0n) return result;
        return result - 1n;
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
        method = structs_STypes__WEBPACK_IMPORTED_MODULE_3__.name2SType[right.result_type]?.[op];
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
    if (this.value === 'not') return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.unary_jsop)(this, '!', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(left, true)), cursor);
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
    if (type === structs_SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED) throw new Error('NOT IMPLEMENTED!');
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
    const args = _args.map((m)=>convert_arg(m, context)); //TODO...
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
function convert_arg(node, context) {
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "arg", node.annotation?.id, node.arg);
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
    runJSCode(jscode, ast) {
        if (ast.filename in this.#registered_AST) throw new Error(`AST ${ast.filename} already registered!`);
        //TODO: filename 2 modulename.
        this.#registered_AST[ast.filename] = ast;
        //console.log(jscode);
        const js_fct = new Function("__SBRYTHON__", `${jscode}\nreturn __exported__;`);
        this.#exported[ast.filename] = js_fct(this);
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
/* harmony export */   GenBinaryOperator: () => (/* binding */ GenBinaryOperator),
/* harmony export */   GenCmpOperator: () => (/* binding */ GenCmpOperator),
/* harmony export */   GenEqOperator: () => (/* binding */ GenEqOperator),
/* harmony export */   Int2Float: () => (/* binding */ Int2Float),
/* harmony export */   JSOperators: () => (/* binding */ JSOperators),
/* harmony export */   binary_jsop: () => (/* binding */ binary_jsop),
/* harmony export */   bname2pyname: () => (/* binding */ bname2pyname),
/* harmony export */   genBinaryOps: () => (/* binding */ genBinaryOps),
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
*/ function Int2Float(a, optional = false) {
    //TODO canBeFloat + etc.
    if (a.type === 'literals.int') {
        a.asFloat = true;
        a.asFloatIsOpt = optional;
        return a;
    }
    if (optional) return a;
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${a})`;
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
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        a.parent_op = op;
        a.parent_op_dir = RIGHT;
    }
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${op}${a}`;
    if (check_priority && "parent_op" in node) {
        let direction = node.parent_op_dir;
        let cur_priority = JSOperatorsPriority[op];
        let parent_priority = JSOperatorsPriority[node.parent_op];
        if (direction & LEFT && parent_priority > cur_priority) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    }
    return result;
}
function genDefaultJSUnaries() {}
function genDefaultJSCmps() {}
function generateConvert(convert) {
    return (node)=>{
        const target = convert[node.result_type];
        if (target === undefined) return node;
        //TODO: other types
        //TODO: use __x__ operators ?
        return Int2Float(node);
    };
}
function genBinaryOps(ret_type, ops, other_type, { convert_other = {} } = {}) {
    let result = {};
    const return_type = (o)=>other_type.includes(o) ? ret_type : _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    const conv_other = generateConvert(convert_other);
    for (let op of ops){
        const pyop = jsop2pyop[op];
        result[`__${pyop}__`] = {
            return_type,
            call_substitute: (node, self, other)=>{
                return binary_jsop(node, self, op, conv_other(other));
            }
        };
        result[`__r${pyop}__`] = {
            return_type,
            call_substitute: (node, self, other)=>{
                return binary_jsop(node, conv_other(other), op, self);
            }
        };
        result[`__i${pyop}__`] = {
            return_type,
            call_substitute: (node, self, other)=>{
                return binary_jsop(node, self, op + '=', conv_other(other));
            }
        };
    }
    return result;
}
function _genCmp(op1, op2) {
    return (node, self, o, invert_dir, reversed)=>{
        let op = op1;
        if (reversed) invert_dir = !invert_dir;
        if (invert_dir) op = op2;
        return reversed ? binary_jsop(node, o, op, self) : binary_jsop(node, self, op, o);
    };
}
function GenCmpOperator({ supported_types }) {
    const return_type = (o)=>supported_types.includes(o) ? 'bool' : _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    const xt = _genCmp('<', '>');
    const xe = _genCmp('<=', '>=');
    return {
        __lt__: {
            return_type,
            call_substitute: (node, self, o, reversed)=>{
                console.warn("lt", self, o, reversed);
                return xt(node, self, o, false, reversed);
            }
        },
        __gt__: {
            return_type,
            call_substitute: (node, self, o, reversed)=>{
                console.warn("gt", self, o, reversed);
                return xt(node, self, o, true, reversed);
            }
        },
        __le__: {
            return_type,
            call_substitute: (node, self, o, reversed)=>{
                return xe(node, self, o, false, reversed);
            }
        },
        __ge__: {
            return_type,
            call_substitute: (node, self, o, reversed)=>{
                return xe(node, self, o, true, reversed);
            }
        }
    };
}
function GenEqOperator({ call_substitute, supported_types, convert = (a)=>a, self_convert = (a)=>a }) {
    const return_type = (o)=>supported_types.includes(o) ? 'bool' : _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED;
    return {
        '__eq__': {
            return_type,
            call_substitute: (node, self, o, reversed = false)=>{
                const left = reversed ? convert(o) : self_convert(self);
                const right = reversed ? self_convert(self) : convert(o);
                return call_substitute(node, left, '==', right, reversed);
            }
        },
        '__ne__': {
            return_type,
            call_substitute: (node, self, o, reversed = false)=>{
                const left = reversed ? convert(o) : self_convert(self);
                const right = reversed ? self_convert(self) : convert(o);
                return call_substitute(node, left, '!=', right, reversed);
            }
        }
    };
}
function GenBinaryOperator(name, { call_substitute, return_type, same_order = false, convert = (a)=>a }) {
    const fct = (node, self, o)=>{
        return call_substitute(node, self, convert(o));
    };
    const rfct = same_order ? fct : (node, self, o)=>{
        return call_substitute(node, convert(o), self);
    };
    return {
        [`__${name}__`]: {
            return_type: (o)=>return_type[o] ?? _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED,
            call_substitute: fct
        },
        [`__r${name}__`]: {
            return_type: (o)=>return_type[o] ?? _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED,
            call_substitute: rfct
        }
    };
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
/* harmony export */   name2SType: () => (/* binding */ name2SType)
/* harmony export */ });
/* harmony import */ var core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core_modules/literals/float/stype */ "./src/core_modules/literals/float/stype.ts");
/* harmony import */ var core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/literals/int/stype */ "./src/core_modules/literals/int/stype.ts");
/* harmony import */ var core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/literals/str/stype */ "./src/core_modules/literals/str/stype.ts");
/* harmony import */ var core_modules_literals_None_stype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core_modules/literals/None/stype */ "./src/core_modules/literals/None/stype.ts");
/* harmony import */ var core_modules_literals_bool_stype__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core_modules/literals/bool/stype */ "./src/core_modules/literals/bool/stype.ts");





//export type STypeName = keyof typeof name2SType;
function name2SType(name) {
    const name2SType = {
        "float": core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_0__["default"],
        "int": core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__["default"],
        "bool": core_modules_literals_bool_stype__WEBPACK_IMPORTED_MODULE_4__["default"],
        "str": core_modules_literals_str_stype__WEBPACK_IMPORTED_MODULE_2__["default"],
        "NoneType": core_modules_literals_None_stype__WEBPACK_IMPORTED_MODULE_3__["default"]
    };
    return name2SType[name];
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVQTtRQUN0QixPQUFZMkIsdUVBQVNBO1FBQ3JCLFlBQVk5Qix3RUFBVUE7SUFDMUI7SUFFQSxPQUFPbkcsVUFBVSxDQUFDakUsS0FBZ0M7QUFDdEQ7Ozs7Ozs7U0NuQkE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNQO0FBRStDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvQXNzaWduT3AvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYm9vbGVhbi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL3VuYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9saXN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N5bWJvbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL29iamVjdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0X2Zhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9CaW5hcnlPcGVyYXRvcnMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9Cb2R5LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvU1R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9TVHlwZXMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVCkge1xuXG4gICAgY29uc3QgZXhwb3J0ZWQgPSBbXTsgLy8gbW92ZTJhc3QgZ2VuID9cblxuXHRsZXQganMgPSBgLy8jIHNvdXJjZVVSTD0ke2FzdC5maWxlbmFtZX1cXG5gO1xuXHQgICAganMrPSBgY29uc3Qge19yXywgX2JffSA9IF9fU0JSWVRIT05fXztcXG5gO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMywgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdC5ub2Rlcykge1xuXG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gXCJmdW5jdGlvbnMuZGVmXCIpXG4gICAgICAgICAgICBleHBvcnRlZC5wdXNoKG5vZGUudmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiO1wiLCBjdXJzb3IpXG5cbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGBcXG5jb25zdCBfX2V4cG9ydGVkX18gPSB7JHtleHBvcnRlZC5qb2luKCcsICcpfX07XFxuYDtcblxuXHRyZXR1cm4ganM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGV8Qm9keSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IENvZGVQb3MgKSB7XG5cbiAgICBpZiggdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjdXJzb3IuY29sICs9IHN0ci5sZW5ndGg7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEJvZHkgKSB7XG4gICAgICAgIHJldHVybiBzdHIudG9KUyhjdXJzb3IpO1xuICAgIH1cblxuICAgIGlmKCBzdHIgaW5zdGFuY2VvZiBBU1ROb2RlXG4gICAgICAgIHx8IHN0ciBpbnN0YW5jZW9mIE9iamVjdCAmJiAhIEFycmF5LmlzQXJyYXkoc3RyKSApIHsgLy8gZm9yIHB5MmFzdF9mYXN0XG4gICAgICAgIHJldHVybiBhc3Rub2RlMmpzKHN0ciwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAgbGV0IGU6IGFueTtcbiAgICBsZXQgczogc3RyaW5nID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdHJbMV0ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBzID0gc3RyWzBdW2ldO1xuICAgICAgICBqcyArPSBzO1xuICAgICAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgICAgIGUgPSBzdHJbMV1baV07XG4gICAgICAgIGlmKCBlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDAsIHByaW50X2JyYWNrZXQgPSB0cnVlKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYocHJpbnRfYnJhY2tldClcbiAgICAgICAganMrPVwie1wiO1xuICAgIGNvbnN0IGJvZHkgPSBub2RlLmNoaWxkcmVuW2lkeF07Ly9ib2R5OiBBU1ROb2RlW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IGFzdG5vZGUyanMoYm9keS5jaGlsZHJlbltpXSwgY3Vyc29yKVxuICAgIH1cblxuICAgIGlmKHByaW50X2JyYWNrZXQpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBcIn1cIjtcbiAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgIH1cblxuICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYXJnczJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCIoXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCBhcmdzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKSB7XG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgICAgICsrY3Vyc29yLmNvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGpzICs9IGFyZzJqcyhhcmdzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IFwiKVwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGFyZ3MuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZzJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gbm9kZS52YWx1ZTtcbiAgICBjdXJzb3IuY29sICs9IGpzLmxlbmd0aDtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZCAgOiB7Li4uY3Vyc29yfVxuICAgIH1cblxuICAgIHJldHVybiBqcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld2xpbmUobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zLCBpbmRlbnRfbGV2ZWw6IG51bWJlciA9IDApIHtcblxuICAgIGxldCBiYXNlX2luZGVudCA9IG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG4gICAgaWYoIFtcImNvbnRyb2xmbG93cy5lbHNlXCIsIFwiY29udHJvbGZsb3dzLmVsaWZcIiwgXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiXS5pbmNsdWRlcyhub2RlLnR5cGUpICkge1xuICAgICAgIC0tYmFzZV9pbmRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZW50ID0gaW5kZW50X2xldmVsKjQgKyBiYXNlX2luZGVudDtcblxuICAgICsrY3Vyc29yLmxpbmU7XG4gICAgY3Vyc29yLmNvbCA9IGluZGVudDtcbiAgICByZXR1cm4gXCJcXG5cIiArIFwiXCIucGFkU3RhcnQoaW5kZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKGN1cnNvcik7XG5cbiAgICBub2RlLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBiYXNlOiBzdHJpbmd8QVNUTm9kZSA9IFwiX3JfLm9iamVjdFwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMilcbiAgICAgICAgYmFzZSA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICByZXR1cm4gdG9KUyhyYGNsYXNzICR7dGhpcy52YWx1ZX0gZXh0ZW5kcyAke2Jhc2V9ICR7bmV3IEJvZHkodGhpcyl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tub2RlLm5hbWVdID0gJ2NsYXNzLicgKyBub2RlLm5hbWU7XG5cbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJjbGFzc1wiLCBjb250ZXh0KTtcblxuICAgIGlmKCBub2RlLmJhc2VzLmxlbmd0aCA+IDEpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmJhc2VzLmxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgW2NvbnZlcnRfbm9kZShub2RlLmJhc2VzWzBdLCBjb250ZXh0KSwgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXVxuICAgICAgICA6IFtjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY2xhc3MuY2xhc3NkZWZcIiwgbnVsbCwgbm9kZS5uYW1lLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDbGFzc0RlZlwiOyIsImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBfY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gXCJcIjsgLy9gJHt0aGlzLnZhbHVlfWA7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm47IC8vIGN1cnJlbnRseSBjb21tZW50cyBhcmVuJ3QgaW5jbHVkZWQgaW4gQnJ5dGhvbidzIEFTVFxuXG4gICAgLy9jb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIG5vZGUudmFsdWUpO1xuICAgIC8vYXN0bm9kZS5yZXN1bHRfdHlwZSA9IFwiYm9vbFwiO1xuICAgIC8vcmV0dXJuIGFzdG5vZGU7XG59IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmZvcihyYW5nZSlcIikge1xuXG4gICAgICAgIGxldCBiZWcgOiBzdHJpbmd8QVNUTm9kZSAgPSBcIjBuXCI7XG4gICAgICAgIGxldCBpbmNyOiBzdHJpbmd8QVNUTm9kZSA9IFwiMW5cIjtcbiAgICAgICAgbGV0IGVuZCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuXG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGJlZyA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBlbmQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDMpXG4gICAgICAgICAgICBpbmNyID0gdGhpcy5jaGlsZHJlblsyXTtcblxuICAgICAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9ID0gJHtiZWd9OyAke3RoaXMudmFsdWV9IDwgJHtlbmR9OyAke3RoaXMudmFsdWV9ICs9ICR7aW5jcn0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO1xuXG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICBsZXQganMgPSB0b0pTKHJgZm9yKHZhciAke3RoaXMudmFsdWV9IG9mIHRoaXMuY2hpbGRyZW5bMF0pYCwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IG5vZGUudGFyZ2V0LmlkO1xuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3RhcmdldF0gPSBudWxsOyAvL1RPRE9cblxuICAgIGlmKCBub2RlLml0ZXIuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiQ2FsbFwiICYmIG5vZGUuaXRlci5mdW5jLmlkID09PSBcInJhbmdlXCIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiLCBudWxsLCB0YXJnZXQsIFtcbiAgICAgICAgICAgIC4uLiBub2RlLml0ZXIuYXJncy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICksXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuZm9yXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5pdGVyLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuaWZibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IFwiXCI7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy9pZlxuICAgIGxldCBrZXl3b3JkID0gXCJpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsaWZcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZSBpZlwiO1xuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLmVsc2VcIilcbiAgICAgICAga2V5d29yZCA9IFwiZWxzZVwiO1xuXG4gICAgbGV0IGpzID0gdG9KUyhrZXl3b3JkLCBjdXJzb3IpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGlmKCBrZXl3b3JkICE9PSBcImVsc2VcIikgeyAvLyBpZi9lbGlmIGNvbmRpdGlvbi5cbiAgICAgICAgb2Zmc2V0ID0gMTtcbiAgICAgICAganMgKz0gdG9KUyhyYCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIG9mZnNldCk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggXCJpZmJsb2NrXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBpZiggbm9kZS5pZmJsb2NrID09PSBcImVsc2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25kID0gY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBpZihjb25kLnJlc3VsdF90eXBlICE9PSBcImJvb2xcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSAke2NvbmQucmVzdWx0X3R5cGV9IG5vdCB5ZXQgc3VwcG9ydGVkIGFzIGlmIGNvbmRpdGlvbmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIGNvbmQsXG4gICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgbm9kZS5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgIG5vZGUuaWZibG9jayA9IFwiaWZcIjtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICBub2RlXG4gICAgXTtcblxuICAgIGxldCBjdXIgPSBub2RlO1xuICAgIHdoaWxlKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCA9PT0gMSAmJiBcInRlc3RcIiBpbiBjdXIub3JlbHNlWzBdKSB7XG4gICAgICAgIGN1ciA9IGN1ci5vcmVsc2VbMF07XG4gICAgICAgIGN1ci5zYnJ5dGhvbl90eXBlID0gXCJJZlwiO1xuICAgICAgICBjdXIuaWZibG9jayA9IFwiZWxpZlwiO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGN1cik7XG4gICAgfVxuICAgIGlmKCBcIm9yZWxzZVwiIGluIGN1ciAmJiBjdXIub3JlbHNlLmxlbmd0aCAhPT0gMCApIHsgLy8gZWxzZVxuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJJZlwiLFxuICAgICAgICAgICAgaWZibG9jazogXCJlbHNlXCIsXG4gICAgICAgICAgICBib2R5ICAgOiBjdXIub3JlbHNlLFxuICAgICAgICAgICAgLi4ubGlzdHBvcyhjdXIub3JlbHNlKSxcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgcmVhc29ucy4uLlxuICAgICAgICAgICAgbGluZW5vICAgIDogY3VyLm9yZWxzZVswXS5saW5lbm8gLSAxLFxuICAgICAgICAgICAgY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICAgICBdKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0bm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGNjID0gYXN0bm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgYXN0bm9kZS5jaGlsZHJlbltpXS5weWNvZGUuZW5kID0gY2NbY2MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJJZlwiOyIsImltcG9ydCB7IGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUsIGxpc3Rwb3MgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LnRyeVwiLFxuICAgICAgICAgICAgLi4ubm9kZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIlRyeS5jYXRjaGJsb2NrXCIsXG4gICAgICAgICAgICAuLi5saXN0cG9zKG5vZGUuaGFuZGxlcnMpLFxuICAgICAgICAgICAgaGFuZGxlcnM6IG5vZGUuaGFuZGxlcnNcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICBdKTtcblxuICAgIC8vZml4IHB5Y29kZS5cbiAgICBhc3Rub2RlLmNoaWxkcmVuWzBdLnB5Y29kZS5lbmQgPSBhc3Rub2RlLmNoaWxkcmVuWzFdLnB5Y29kZS5zdGFydDtcblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmBpZihfZXJyXyBpbnN0YW5jZW9mICR7dGhpcy5jaGlsZHJlblswXX0pe2AsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcys9IGBsZXQgJHt0aGlzLnZhbHVlfSA9IF9lcnJfO2A7XG4gICAgICAgIGpzKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEsIGZhbHNlKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGAsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50eXBlLCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJFeGNlcHRIYW5kbGVyXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJjYXRjaChfcmF3X2Vycl8pe1wiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIGpzKz0gdG9KUyhcImNvbnN0IF9lcnJfID0gX3Jhd19lcnJfIGluc3RhbmNlb2YgX2JfLlB5dGhvbkVycm9yXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiPyBfcmF3X2Vycl8ucHl0aG9uX2V4Y2VwdGlvblwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIjogbmV3IF9yXy5KU0V4Y2VwdGlvbihfcmF3X2Vycl8pO1wiLCBjdXJzb3IpO1xuICAgICAgICAvLyBkZWJ1Z1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gdG9KUyhcIl9iXy5kZWJ1Z19wcmludF9leGNlcHRpb24oX2Vycl8sIF9fU0JSWVRIT05fXylcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcblxuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgIGZvcihsZXQgaGFuZGxlciBvZiB0aGlzLmNoaWxkcmVuKVxuICAgICAgICBqcys9IHRvSlMoaGFuZGxlciwgY3Vyc29yKTtcblxuICAgIGpzKz0gdG9KUyhcImVsc2V7IHRocm93IF9yYXdfZXJyXyB9XCIsIGN1cnNvcik7IC8vVE9ETy4uLlxuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCk7XG4gICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYmxvY2tgLCBudWxsLCBudWxsLFxuICAgICAgICBub2RlLmhhbmRsZXJzLm1hcCggKGg6YW55KSA9PiBjb252ZXJ0X25vZGUoaCwgY29udGV4dCkpXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS5jYXRjaGJsb2NrXCI7IiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBTQnJ5dGhvbiB9IGZyb20gXCJydW50aW1lXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBmaWx0ZXJfc3RhY2soc3RhY2s6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBzdGFjay5maWx0ZXIoIGUgPT4gZS5pbmNsdWRlcygnYnJ5dGhvbl8nKSApOyAvL1RPRE8gaW1wcm92ZXMuLi5cbn1cblxuXG5mdW5jdGlvbiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzOiBBU1ROb2RlW10sIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIpOiBudWxsfEFTVE5vZGUge1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICBpZiggbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID4gbGluZVxuICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQuY29sID4gY29sKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBpZiggICAgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA+IGxpbmVcbiAgICAgICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID09PSBsaW5lICYmIG5vZGVzW2ldLmpzY29kZSEuZW5kLmNvbCA+IGNvbFxuICAgICAgKSB7XG4gICAgICAgICAgbGV0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKG5vZGVzW2ldLmNoaWxkcmVuLCBsaW5lLCBjb2wpO1xuICAgICAgICAgIGlmKCBub2RlICE9PSBudWxsKVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV07XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDsgLy90aHJvdyBuZXcgRXJyb3IoXCJub2RlIG5vdCBmb3VuZFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrbGluZTJhc3Rub2RlKHN0YWNrbGluZTogU3RhY2tMaW5lLCBzYjogU0JyeXRob24pOiBBU1ROb2RlIHtcbiAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICByZXR1cm4gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIHN0YWNrbGluZVsxXSwgc3RhY2tsaW5lWzJdKSE7XG59XG5cbmV4cG9ydCB0eXBlIFN0YWNrTGluZSA9IFtzdHJpbmcsIG51bWJlciwgbnVtYmVyXTtcblxuLy9UT0RPOiBjb252ZXJ0XG5leHBvcnQgZnVuY3Rpb24gc3RhY2syYXN0bm9kZXMoc3RhY2s6IFN0YWNrTGluZVtdLCBzYjogU0JyeXRob24pOiBBU1ROb2RlW10ge1xuICByZXR1cm4gc3RhY2subWFwKCBlID0+IHN0YWNrbGluZTJhc3Rub2RlKGUsIHNiKSApO1xufVxuXG4vL1RPRE86IGFkZCBmaWxlLi4uXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc3RhY2soc3RhY2s6IGFueSwgc2I6IFNCcnl0aG9uKTogU3RhY2tMaW5lW10ge1xuXG5cbiAgXG4gICAgc3RhY2sgPSBzdGFjay5zcGxpdChcIlxcblwiKTtcblxuICAgIGNvbnN0IGlzVjggPSBzdGFja1swXT09PSBcIkVycm9yXCI7IFxuXG4gICAgcmV0dXJuIGZpbHRlcl9zdGFjayhzdGFjaykubWFwKCBsID0+IHtcblxuICAgICAgbGV0IFtfLCBfbGluZSwgX2NvbF0gPSBsLnNwbGl0KCc6Jyk7XG4gIFxuICAgICAgaWYoIF9jb2xbX2NvbC5sZW5ndGgtMV0gPT09ICcpJykgLy8gVjhcbiAgICAgICAgX2NvbCA9IF9jb2wuc2xpY2UoMCwtMSk7XG4gIFxuICAgICAgbGV0IGxpbmUgPSArX2xpbmUgLSAyO1xuICAgICAgbGV0IGNvbCAgPSArX2NvbDtcblxuICAgICAgLS1jb2w7IC8vc3RhcnRzIGF0IDEuXG5cbiAgICAgIGxldCBmY3RfbmFtZSE6IHN0cmluZztcbiAgICAgIGlmKCBpc1Y4ICkge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKFwiIFwiLCA3KTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDcsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJldmFsXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG5cbiAgICAgICAgLy9UT0RPOiBleHRyYWN0IGZpbGVuYW1lLlxuICAgICAgICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2RlcywgbGluZSwgY29sKSE7XG4gICAgICAgIGlmKG5vZGUudHlwZSA9PT0gXCJzeW1ib2xcIilcbiAgICAgICAgICBjb2wgKz0gbm9kZS52YWx1ZS5sZW5ndGg7IC8vIFY4IGdpdmVzIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgc3ltYm9sIG5hbWUgd2hlbiBGRiBnaXZlcyBcIihcIi4uLlxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcG9zID0gXy5pbmRleE9mKCdAJyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSgwLCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiYW5vbnltb3VzXCIpIC8vVE9ETzogYmV0dGVyXG4gICAgICAgICAgZmN0X25hbWUgPSBcIjxtb2R1bGU+XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbZmN0X25hbWUsIGxpbmUsIGNvbF0gYXMgY29uc3Q7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlYnVnX3ByaW50X2V4Y2VwdGlvbihlcnI6IFB5X0V4Y2VwdGlvbiwgc2I6IFNCcnl0aG9uKSB7XG5cbiAgICBjb25zb2xlLndhcm4oXCJFeGNlcHRpb25cIiwgZXJyKTtcblxuICAgIGNvbnN0IHN0YWNrID0gcGFyc2Vfc3RhY2soIChlcnIgYXMgYW55KS5fcmF3X2Vycl8uc3RhY2ssIHNiKTtcbiAgICBjb25zdCBub2RlcyA9IHN0YWNrMmFzdG5vZGVzKHN0YWNrLCBzYik7XG4gICAgLy9UT0RPOiBjb252ZXJ0IHN0YWNrLi4uXG4gICAgY29uc3Qgc3RhY2tfc3RyID0gc3RhY2subWFwKCAobCxpKSA9PiBgRmlsZSBcIltmaWxlXVwiLCBsaW5lICR7bm9kZXNbaV0ucHljb2RlLnN0YXJ0LmxpbmV9LCBpbiAke3N0YWNrW2ldWzBdfWApO1xuXG4gICAgbGV0IGV4Y2VwdGlvbl9zdHIgPSBcbmBUcmFjZWJhY2sgKG1vc3QgcmVjZW50IGNhbGwgbGFzdCk6XG4gICR7c3RhY2tfc3RyLmpvaW4oYFxcbiAgYCl9XG5FeGNlcHRpb246IFttc2ddYDtcblxuICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbl9zdHIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGVidWdfcHJpbnRfZXhjZXB0aW9uXG59OyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgY29uc3QgYm9keSA9IG5ldyBCb2R5KHRoaXMpO1xuXG4gICAgcmV0dXJuIHRvSlMocmB0cnkke2JvZHl9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLnRyeWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkudHJ5XCI7IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMocmB3aGlsZSgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLndoaWxlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dCksXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiV2hpbGVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgLy9UT0RPOiBpbXByb3ZlLi4uXG4gICAgaWYoIHRoaXMudmFsdWUgIT09IG51bGwgKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlLl9faW5pdF9fLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCAuLi50aGlzLmNoaWxkcmVuLnNsaWNlKDEpKSwgY3Vyc29yKTtcblxuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy5jaGlsZHJlblswXS5yZXN1bHRfdHlwZT8uc3RhcnRzV2l0aChcImNsYXNzLlwiKSApXG4gICAgICAgIGpzKz0gdG9KUyhcIm5ldyBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfShgLCBjdXJzb3IpO1xuXG4gICAgLy9UT0RPOiBhcmdzIG5vZGUuLi5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGlmKCBpICE9PSAxKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcIilcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgLy9UT0RPOiBjYW4gYmUgYmV0dGVyXG4gICAgY29uc3Qga2xhc3MgPSBuYW1lMlNUeXBlKG5vZGUuZnVuYy5pZCk7XG4gICAgbGV0IHR5cGUgPSBudWxsO1xuICAgIGlmKCBrbGFzcyAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IGtsYXNzLl9faW5pdF9fLnJldHVybl90eXBlKCk7XG4gICAgXG4gICAgLy8gVE9ETzogbm9kZS5hcmdzIC8vIGZjdCBjYWxsIGFyZ3VtZW50LlxuICAgIC8vIFRPRE86IHRoaXMgP1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZ1bmN0aW9ucy5jYWxsXCIsIHR5cGUsIGtsYXNzLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IGFyZ3MyanMsIGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSAnJztcbiAgICBpZiggISB0aGlzLnR5cGUuZW5kc1dpdGgoXCIobWV0aClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKCdmdW5jdGlvbiAnLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcblxuICAgIGpzICs9IGFyZ3MyanModGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxLCBmYWxzZSk7XG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXS5jaGlsZHJlbjtcbiAgICBpZiggYm9keVtib2R5Lmxlbmd0aCAtIDFdLnR5cGUgIT09IFwia2V5d29yZHMucmV0dXJuXCIgKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gXCJyZXR1cm4gbnVsbDtcIlxuICAgIH1cblxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKSArIHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9hcmdzLCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIGNvbnRleHQpO1xuXG4gICAgY29uc3QgaXNNZXRob2QgPSBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIjsgIFxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiZmN0XCIsIGNvbnRleHQpO1xuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IHtcbiAgICAgICAgLi4uY29udGV4dFxuICAgIH1cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcyA9IHsuLi5jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc307XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIC8vIHJldHVybiB0eXBlLi4uIG5vZGUucmV0dXJucy5pZFxuXG4gICAgbGV0IHR5cGUgPSBcImZ1bmN0aW9ucy5kZWZcIjtcbiAgICBpZihpc01ldGhvZClcbiAgICAgICAgdHlwZSArPSBcIihtZXRoKVwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgX2JfLmFzc2VydCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIkFzc2VydFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudmFsdWVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZVswXSwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKGAke3RoaXMudmFsdWVbMF19OiAke3RoaXMudmFsdWVbMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0LmFsaWFzXCIsIG51bGwsIFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiYWxpYXNcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBqcyArPSB0b0pTKFwiY29uc3Qge1wiLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvciApO1xuICAgICAgICBqcyArPSB0b0pTKCB0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IgKTtcbiAgICB9XG4gICAganMgKz0gdG9KUyhcIn0gPSBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBpZih0aGlzLnZhbHVlID09PSBudWxsKVxuICAgICAgICBqcyArPSB0b0pTKFwiX19TQlJZVEhPTl9fLmdldE1vZHVsZXMoKVwiLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAganMgKz0gdG9KUyhgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dGhpcy52YWx1ZX1cIilgLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnRcIiwgbnVsbCwgbm9kZS5tb2R1bGUsXG4gICAgICAgIG5vZGUubmFtZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJJbXBvcnRcIiwgXCJJbXBvcnRGcm9tXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRocm93IG5ldyBfYl8uUHl0aG9uRXJyb3IoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJhaXNlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvY29tcGFyZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzkgZnJvbSBcIi4vb3BlcmF0b3JzL2JpbmFyeS9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIxIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI1IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI3IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzQgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM1IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNSBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLnVuYXJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNlxuXHR9LFxuXHRcIm9wZXJhdG9ycy5jb21wYXJlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcIm9wZXJhdG9ycy5ib29sZWFuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5iaW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwib3BlcmF0b3JzLmF0dHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTBcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJvcGVyYXRvcnMuQXNzaWduT3BcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcblx0XCJvcGVyYXRvcnMuPVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNFxuXHR9LFxuXHRcImxpdGVyYWxzLmludFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNVxuXHR9LFxuXHRcImxpdGVyYWxzLmZsb2F0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmdcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImxpdGVyYWxzLmJvb2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJrZXl3b3Jkcy5pbXBvcnQvYWxpYXNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjNcblx0fSxcblx0XCJrZXl3b3Jkcy5hc3NlcnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjRcblx0fSxcblx0XCJmdW5jdGlvbnMuZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI1XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjZcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjdcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjhcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svdHJ5XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI5XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzBcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzFcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5mb3JcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzNcblx0fSxcblx0XCJjb21tZW50c1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNFxuXHR9LFxuXHRcImNsYXNzLmNsYXNzZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM1XG5cdH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1PRFVMRVM7XG5cblxuY29uc3QgUlVOVElNRSA9IHt9O1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzkpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzIxKTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yNCk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjgpO1xuXG5cbmV4cG9ydCBjb25zdCBfYl8gPSBSVU5USU1FO1xuIiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKHR5cGVvZiBub2RlLnZhbHVlID09PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgfHwgIShcIl9fY2xhc3NfX1wiIGluIG5vZGUudmFsdWUpXG4gICAgICAgICAgICB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXy5fX3F1YWxuYW1lX18gIT09IFwiTm9uZVR5cGVcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLk5vbmVcIiwgXCJOb25lVHlwZVwiLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9Ob25lID0ge1xufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX05vbmU7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgXCJib29sXCIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBiaW5hcnlfanNvcCwgR2VuQmluYXJ5T3BlcmF0b3IsIEdlbkVxT3BlcmF0b3IsIEludDJGbG9hdCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9ib29sID0ge1xuICAgIFxuICAgIC4uLkdlbkVxT3BlcmF0b3Ioe1xuICAgICAgICBzdXBwb3J0ZWRfdHlwZXM6IFtcImZsb2F0XCIsIFwiYm9vbFwiXSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGxlZnQsIG9wLCByaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIG9wLCByaWdodCk7XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfYm9vbDsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIiR7XCIsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9ybWF0dGVkVmFsdWVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuXG4gICAgICAgIGlmKCBjaGlsZC5yZXN1bHRfdHlwZSA9PT0gXCJzdHJcIikge1xuXG4gICAgICAgICAgICAvLyBoNGNrXG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHsuLi5jdXJzb3J9LFxuICAgICAgICAgICAgICAgIGVuZDogbnVsbCBhcyBhbnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQudmFsdWUsIGN1cnNvcik7XG4gICAgICAgICAgICBjaGlsZC5qc2NvZGUuZW5kID0gey4uLmN1cnNvcn07XG5cbiAgICAgICAgfSBlbHNlIGlmKGNoaWxkLnR5cGUgPT09IFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIikge1xuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZCwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmdcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5ub2RlLnZhbHVlcy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkpvaW5lZFN0clwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhIChub2RlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBub2RlLnZhbHVlLl9fY2xhc3NfXz8uX19xdWFsbmFtZV9fICE9PSBcImZsb2F0XCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmZsb2F0XCIsIFwiZmxvYXRcIiwgbm9kZS52YWx1ZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIEdlbkJpbmFyeU9wZXJhdG9yLCBnZW5CaW5hcnlPcHMsIEdlbkVxT3BlcmF0b3IsIEludDJGbG9hdCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuXG5jb25zdCBTVHlwZV9mbG9hdCA9IHtcbiAgICAuLi5HZW5FcU9wZXJhdG9yKHtcbiAgICAgICAgc3VwcG9ydGVkX3R5cGVzOiBbXCJmbG9hdFwiLCBcImJvb2xcIl0sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCBvcCwgcmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBvcCwgcmlnaHQpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIFwiX19uZWdfX1wiOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnZmxvYXQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5hcnlfanNvcChub2RlLCAnLScsIGEpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAuLi5nZW5CaW5hcnlPcHMoJ2Zsb2F0JyxcbiAgICAgICAgICAgICAgICAgICAgWycqKicsICcqJywgJy8nLCAnJScsICcrJywgJy0nXSxcbiAgICAgICAgICAgICAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnYm9vbCddLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICApLFxuICAgIC8vVE9ETy4uLiA9PiBzdWJzdGl0dXRlX2NhbGwgPT4gbm8gKj0gP1xuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdmbG9vcmRpdicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCcsICdmbG9hdCc6ICdpbnQnfSxcbiAgICAgICAgY29udmVydDogKGEpID0+IGEucmVzdWx0X3R5cGUgPT09ICdpbnQnID8gSW50MkZsb2F0KGEpIDogYSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgTWF0aC5mbG9vcigke2JpbmFyeV9qc29wKG5vZGUsIGEsICcvJywgYiwgZmFsc2UpfSlgO1xuICAgICAgICB9XG4gICAgfSksXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICBpZiggKHRoaXMgYXMgYW55KS5hc0Zsb2F0ICYmICghICh0aGlzIGFzIGFueSkuYXNGbG9hdElzT3B0KSAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIpXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblxuICAgIGlmKCAodGhpcyBhcyBhbnkpLmFzRmxvYXQgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSAvLyBvcHRpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7ICAgICAgICBcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfW5gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB2YWx1ZSA9IG5vZGUudmFsdWU7XG5cbiAgICBpZih2YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyA9PT0gXCJpbnRcIilcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZTtcblxuICAgIGlmKCB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImJpZ2ludFwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuaW50XCIsIFwiaW50XCIsIHZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgR2VuQmluYXJ5T3BlcmF0b3IsIEdlbkVxT3BlcmF0b3IsIGlkX2pzb3AsIEludDJGbG9hdCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVPYmogfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5jb25zdCBTVHlwZV9pbnQgPSB7XG5cbiAgICBfX2luaXRfXzoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGUsIG90aGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBuYW1lMlNUeXBlKG90aGVyLnJlc3VsdF90eXBlKT8uX19pbnRfXztcbiAgICAgICAgICAgIGlmKCBtZXRob2QgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke290aGVyLnJlc3VsdF90eXBlfS5fX2ludF9fIG5vdCBkZWZpbmVkYCk7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZShub2RlLCBvdGhlcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9faW50X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIGlkX2pzb3Aobm9kZSwgc2VsZik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC4uLkdlbkVxT3BlcmF0b3Ioe1xuICAgICAgICBzdXBwb3J0ZWRfdHlwZXM6IFtcImludFwiLCBcImZsb2F0XCIsIFwiYm9vbFwiXSxcbiAgICAgICAgY29udmVydCAgICAgOiAoYSkgPT4gSW50MkZsb2F0KGEsIHRydWUpLFxuICAgICAgICBzZWxmX2NvbnZlcnQ6IChhKSA9PiBJbnQyRmxvYXQoYSwgdHJ1ZSksXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCBvcCwgcmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBvcCwgcmlnaHQpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIFwiX19uZWdfX1wiOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuYXJ5X2pzb3Aobm9kZSwgJy0nLCBhKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3BvdycsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyoqJywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignbXVsJywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3RydWVkaXYnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdmbG9hdCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgSW50MkZsb2F0KGEpLCAnLycsIEludDJGbG9hdChiKSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ2Zsb29yZGl2Jywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByYF9iXy5mbG9vcmRpdigke2F9LCR7Yn0pYDsgLy8gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJy8nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdtb2QnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICclJywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignYWRkJywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKycsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3N1YicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJy0nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIF9fbm90X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiB1bmFyeV9qc29wKG5vZGUsICd+JywgYSlcbiAgICB9LFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdvcicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJ3wnLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCd4b3InLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICdeJywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignYW5kJywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnJicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ2xzaGlmdCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJzw8JywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcigncnNoaWZ0Jywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnPj4nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfaW50OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIEdlbkJpbmFyeU9wZXJhdG9yLCBHZW5DbXBPcGVyYXRvciwgR2VuRXFPcGVyYXRvciwgSW50MkZsb2F0IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX3N0ciA9IHtcbiAgICAuLi5HZW5DbXBPcGVyYXRvcih7XG4gICAgICAgc3VwcG9ydGVkX3R5cGVzOiBbJ3N0ciddIFxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdtdWwnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdzdHInfSxcbiAgICAgICAgY29udmVydDogKGEpID0+IEludDJGbG9hdChhKSxcbiAgICAgICAgc2FtZV9vcmRlcjogdHJ1ZSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHthfS5yZXBlYXQoJHtifSlgO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ2FkZCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnc3RyJzogJ3N0cid9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJysnLCBiKTtcbiAgICAgICAgfVxuICAgIH0pXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfc3RyOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyhyYCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGNvbnN0IGxlZnRzID0gdGFyZ2V0cy5tYXAoIChuOmFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKTtcblxuICAgICAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV0gPSByaWdodF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEFzc2lnbk9wZXJhdG9ycywgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGxldCBvcCA9IEFzc2lnbk9wZXJhdG9yc1t0aGlzLnZhbHVlXTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSBhID0gYSArIGJcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH09ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuICAgICAgICAvKlxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHJldHVybiB0b0pTKCBtZXRob2QuY2FsbF9zdWJzdGl0dXRlKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc29sZS53YXJuKFwiYXNzaWduXCIsIG5vZGUpO1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUudGFyZ2V0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIGxlZnQucmVzdWx0X3R5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpW3RoaXMudmFsdWVdO1xuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCB0eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdjogKGE6IGJpZ2ludCwgYjogYmlnaW50KSA9PiB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGEvYjtcbiAgICAgICAgaWYoIHJlc3VsdCA+IDAgfHwgYSViID09PSAwbilcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCAtIDFuO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG11bHRpX2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKCBtdWx0aV9qc29wKHRoaXMsIHRoaXMudmFsdWUsIC4uLnRoaXMuY2hpbGRyZW4pICwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5jb25zdCBibmFtZTJqc29wID0ge1xuICAgICdBbmQnOiAnJiYnLFxuICAgICdPcicgOiAnfHwnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGNoaWxkcmVuID0gbm9kZS52YWx1ZXMubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICkgKTtcblxuICAgIGNvbnN0IG9wICAgPSBibmFtZTJqc29wW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgIGNvbnN0IHR5cGUgPSBjaGlsZHJlblswXS5yZXN1bHRfdHlwZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5ib29sZWFuXCIsIHR5cGUsIG9wLCBjaGlsZHJlbik7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQm9vbE9wXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIEludDJGbG9hdCwgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cblxuZnVuY3Rpb24gZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlKG5vZGU6IEFTVE5vZGUsIGxlZnQ6QVNUTm9kZSwgb3A6IHN0cmluZywgcmlnaHQ6IEFTVE5vZGUpIHtcbiAgICBcbiAgICBsZXQgcmV2ZXJzZWQgPSBmYWxzZTtcbiAgICBjb25zdCBydHlwZSA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGNvbnN0IGx0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUpPy5bb3BdO1xuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcblxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGVbcmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lXT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHR5cGUgICA9IG1ldGhvZC5yZXR1cm5fdHlwZShsZWZ0LnJlc3VsdF90eXBlKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpIHtcbiAgICAgICAgICAgIGlmKCBvcCAhPT0gJ19fZXFfXycgJiYgb3AgIT09ICdfX25lX18nIClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bHR5cGV9ICR7b3B9ICR7cnR5cGV9IG5vdCBpbXBsZW1lbnRlZCFgKTtcblxuICAgICAgICAgICAgY29uc3QganNvcCA9IG9wID09PSAnX19lcV9fJyA/ICc9PT0nIDogJyE9PSc7XG5cbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBsZWZ0LCBqc29wLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZlcnNlZCA9IHRydWU7XG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2QuY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGxlZnQsIHJpZ2h0LCByZXZlcnNlZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSAnJztcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCApXG4gICAgICAgICAgICBqcyArPSB0b0pTKCcgJiYgJywgY3Vyc29yKTtcblxuICAgICAgICBjb25zdCBvcCAgICA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgIGNvbnN0IGxlZnQgID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmNoaWxkcmVuW2krMV07XG5cbiAgICAgICAgaWYoIG9wID09PSAnaXMnICkge1xuICAgICAgICAgICAganMgKz0gdG9KUyggYmluYXJ5X2pzb3AodGhpcywgbGVmdCwgJz09PScsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBvcCA9PT0gJ2lzIG5vdCcgKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnIT09JywgcmlnaHQpLCBjdXJzb3IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvL1RPRE86IGNoYWluLi4uXG4gICAgICAgIFxuICAgICAgICBqcyArPSB0b0pTKCBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgb3AsIHJpZ2h0KSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG4vKlxuLSBnZS9sZVxuLSBndC9sdFxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IG9wcyA9IG5vZGUub3BzLm1hcCggKGU6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBvcCA9IGJuYW1lMnB5bmFtZVtlLmNvbnN0cnVjdG9yLiRuYW1lXTtcbiAgICAgICAgaWYoIG9wID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5jb25zdHJ1Y3Rvci4kbmFtZX0gbm90IGltcGxlbWVudGVkIWApO1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZWZ0ICAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHRzID0gbm9kZS5jb21wYXJhdG9ycy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpICk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy5jb21wYXJlYCwgXCJib29sXCIsIG9wcyxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIC4uLnJpZ2h0cyxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBJbnQyRmxvYXQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCAgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIC8vbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGlmKCB0aGlzLnZhbHVlID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIHRvSlMoIHVuYXJ5X2pzb3AodGhpcywgJyEnLCBJbnQyRmxvYXQobGVmdCwgdHJ1ZSkgKSwgY3Vyc29yICk7XG5cbiAgICBjb25zdCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUpW3RoaXMudmFsdWVdO1xuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdC8qLCByaWdodCovKSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgU1R5cGVfTk9UX0lNUExFTUVOVEVEIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IGJuYW1lMnB5bmFtZSB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUub3BlcmFuZCAsIGNvbnRleHQgKTtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgaWYoIG9wID09PSAnbm90JylcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLnVuYXJ5XCIsIFwiYm9vbFwiLCBcIm5vdFwiLCBbIGxlZnQgXSApO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuXG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZSgpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT1QgSU1QTEVNRU5URUQhJyk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgdHlwZSwgb3AsIFsgbGVmdCBdICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiVW5hcnlPcFwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKFwiLyogbm90IGltcGxlbWVudGVkICovXCIsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInBhc3NcIiwgbnVsbCk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlBhc3NcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdG9KUyhcInJldHVybiBudWxsXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhyYHJldHVybiAke3RoaXMuY2hpbGRyZW5bMF19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIFwiTm9uZVwiLCBudWxsKTtcblxuICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIntcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSs9Mikge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlbltpXX06ICR7dGhpcy5jaGlsZHJlbltpKzFdfWAsIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGxldCBjaGlsZHJlbiA9IG5ldyBBcnJheShub2RlLmtleXMubGVuZ3RoICogMik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGUua2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjaGlsZHJlblsyKmldICAgPSBjb252ZXJ0X25vZGUobm9kZS4gIGtleXNbaV0sIGNvbnRleHQpO1xuICAgICAgICBjaGlsZHJlblsyKmkrMV0gPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZXNbaV0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMuZGljdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgY2hpbGRyZW5cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRGljdFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5saXN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJMaXN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJPYmplY3QuZnJlZXplKFtcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIl0pXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlR1cGxlXCI7IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUsIGN1cnNvcik7IC8vVE9ET1xufSIsImltcG9ydCBfcl8gZnJvbSBcIi4uLy4uL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIC8vIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI2NTU5L3Rlc3RpbmctaWYtc29tZXRoaW5nLWlzLWEtY2xhc3MtaW4tamF2YXNjcmlwdFxuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhfKT8ucHJvdG90eXBlPy53cml0YWJsZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgcmVzdWx0X3R5cGUgPSBudWxsO1xuICAgIGxldCB2YWx1ZSA9IG5vZGUuaWQ7XG5cbiAgICBpZiggdmFsdWUgPT09ICdzZWxmJylcbiAgICAgICAgdmFsdWUgPSAndGhpcyc7XG5cbiAgICBlbHNlIGlmKCB2YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcylcbiAgICAgICAgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1t2YWx1ZV07XG4gICAgZWxzZSBpZih2YWx1ZSBpbiBfcl8pIHtcbiAgICAgICAgaWYoIGlzQ2xhc3MoX3JfW3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke3ZhbHVlfWA7XG5cbiAgICAgICAgdmFsdWUgPSBgX3JfLiR7dmFsdWV9YDtcbiAgICB9XG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59XG5cblxuLy8gX190cmFjZWJhY2tfX1xuICAgIC8vIHRiX25leHRcbiAgICAvLyB0Yl9mcmFtZVxuICAgICAgICAvLyBmX2JhY2sgP1xuICAgICAgICAvLyBmX2xvY2FsIDogZW5hYmxlIG9ubHkgaW4gY29tcGF0IG1vZGUuXG4gICAgICAgIC8vIGZfbGluZW5vIChsaW5lKVxuICAgICAgICAvLyBmX2NvZGVcbiAgICAgICAgICAgIC8vIGNvX25hbWUgKGZjdCBuYW1lID8pXG4gICAgICAgICAgICAvLyBjb19maWxlbmFtZSIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcIi4vRXhjZXB0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0pTRXhjZXB0aW9uIGV4dGVuZHMgUHlfRXhjZXB0aW9uIHtcblxufSIsImltcG9ydCBSVU5USU1FXzAgZnJvbSBcIi4vb2JqZWN0LnRzXCI7XG5pbXBvcnQgUlVOVElNRV8xIGZyb20gXCIuL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHNcIjtcbmltcG9ydCBSVU5USU1FXzIgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiSlNFeGNlcHRpb25cIjogUlVOVElNRV8xLFxuXHRcIkV4Y2VwdGlvblwiOiBSVU5USU1FXzIsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJVTlRJTUU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9vYmplY3Qge1xuXG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cblxuZXhwb3J0IHR5cGUgQVNUID0ge1xuICAgIG5vZGVzOiBBU1ROb2RlW10sXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xufVxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXM6IGNvbnZlcnRfYXN0KF9hc3QpLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBicnl0aG9uX25vZGUuc2JyeXRob25fdHlwZSA/PyBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X25vZGUoYnJ5dGhvbl9ub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBuYW1lID0gZ2V0Tm9kZVR5cGUoYnJ5dGhvbl9ub2RlKTtcblxuICAgIGlmKCAhKG5hbWUgaW4gbW9kdWxlcykgKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk1vZHVsZSBub3QgcmVnaXN0ZXJlZDpcIiwgbmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlICk7XG4gICAgICAgIG5hbWUgPSBcIm51bGxcIlxuICAgIH1cblxuICAgIC8vIHdlIG1heSBoYXZlIG1hbnkgbW9kdWxlcyBmb3IgdGhlIHNhbWUgbm9kZSB0eXBlLlxuICAgIGZvcihsZXQgbW9kdWxlIG9mIG1vZHVsZXNbbmFtZV0pIHsgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBtb2R1bGUuQVNUMkpTO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoYnJ5dGhvbl9ub2RlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG5vZGUgJHtuYW1lfSBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG59XG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYm9keShub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxpbmVzID0gbm9kZS5ib2R5Lm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2xpbmUobSwgY29udGV4dCkgKTtcbiAgICBjb25zdCBsYXN0ID0gbm9kZS5ib2R5W25vZGUuYm9keS5sZW5ndGgtMV07XG5cbiAgICBjb25zdCB2aXJ0X25vZGUgPSB7XG4gICAgICAgIGxpbmVubyAgICA6IG5vZGUuYm9keVswXS5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuYm9keVswXS5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJib2R5XCIsIG51bGwsIG51bGwsIGxpbmVzKTtcbn1cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJncyhub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCBfYXJncyA9IG5vZGUuYXJncy5hcmdzO1xuICAgIGlmKCBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIilcbiAgICAgICAgX2FyZ3MgPSBfYXJncy5zbGljZSgxKTtcblxuICAgIGNvbnN0IGFyZ3MgPSBfYXJncy5tYXAoIChtOmFueSkgPT4gY29udmVydF9hcmcobSwgY29udGV4dCkgKTsgLy9UT0RPLi4uXG4gICAgXG4gICAgbGV0IGZpcnN0OiBhbnk7XG4gICAgbGV0IGxhc3QgOiBhbnk7XG4gICAgaWYoIGFyZ3MubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgZmlyc3Q9IG5vZGUuYXJncy5hcmdzWzBdO1xuICAgICAgICBsYXN0ID0gbm9kZS5hcmdzLmFyZ3Nbbm9kZS5hcmdzLmFyZ3MubGVuZ3RoLTFdO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW4gZXN0aW1hdGlvbi4uLlxuICAgICAgICBjb25zdCBjb2wgPSBub2RlLmNvbF9vZmZzZXQgKyA0ICsgbm9kZS5uYW1lLmxlbmd0aCArIDE7XG5cbiAgICAgICAgZmlyc3QgPSBsYXN0ID0ge1xuICAgICAgICAgICAgbGluZW5vOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGVuZF9saW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgY29sX29mZnNldDogY29sLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGNvbFxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdCB2aXJ0X25vZGUgPSB7XG4gICAgICAgIGxpbmVubyAgICA6IGZpcnN0LmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogZmlyc3QuY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYXJnc1wiLCBudWxsLCBudWxsLCBhcmdzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZyhub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImFyZ1wiLCBub2RlLmFubm90YXRpb24/LmlkLCBub2RlLmFyZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0cG9zKG5vZGU6IGFueVtdKSB7XG5cbiAgICBsZXQgYmVnID0gbm9kZVswXTtcbiAgICBsZXQgZW5kID0gbm9kZVtub2RlLmxlbmd0aC0xXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vbGluZW5vIDogYmVnLmxpbmVubyAtIDEsXG4gICAgICAgIC8vY29sX29mZnNldDogbm9kZS5jb2xfb2Zmc2V0LFxuICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBiZWcuY29sX29mZnNldCxcbiAgICAgICAgZW5kX2xpbmVubzogZW5kLmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBlbmQuZW5kX2NvbF9vZmZzZXQsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbGluZShsaW5lOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBBU1ROb2RlIHtcblxuICAgIGxldCBub2RlID0gbGluZTtcblxuICAgIGlmKCBsaW5lLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIkV4cHJcIilcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7XG4gICAgLypcbiAgICBpZiggXCJ2YWx1ZVwiIGluIGxpbmUgJiYgISAoXCJ0YXJnZXRzXCIgaW4gbGluZSkgJiYgISAoXCJ0YXJnZXRcIiBpbiBsaW5lKSApXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlOyovXG5cbiAgICByZXR1cm4gY29udmVydF9ub2RlKCBub2RlLCBjb250ZXh0ICk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBcIj9cInxcImNsYXNzXCJ8XCJmY3RcIiA9IFwiP1wiLCBwYXJlbnRfY29udGV4dDogQ29udGV4dHxudWxsID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5sb2NhbF92YXJpYWJsZXMgPSBwYXJlbnRfY29udGV4dCA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUobnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7Li4ucGFyZW50X2NvbnRleHQubG9jYWxfdmFyaWFibGVzfVxuICAgIH1cbiAgICB0eXBlO1xuICAgIGxvY2FsX3ZhcmlhYmxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bGw+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXkoYXN0LmJvZHkubGVuZ3RoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0LmJvZHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHNcbiAgICAgICAgcmVzdWx0W2ldID0gY29udmVydF9saW5lKGFzdC5ib2R5W2ldLCBjb250ZXh0KTtcblxuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0W2ldLnR5cGUpO1xuICAgIH1cblxuICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzLi4uXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG50eXBlIEN1cnNvciA9IHtcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBsaW5lICA6IG51bWJlcixcbiAgICBsaW5lX29mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKTogQVNUIHtcblxuICAgIGNvbnN0IG5vZGVzID0gbmV3IEFycmF5PEFTVE5vZGU+KCk7XG5cbiAgICBsZXQgY3Vyc29yID0ge1xuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIGxpbmVfb2Zmc2V0IDogMFxuICAgIH07XG5cbiAgICBsZXQgY2hhcjtcbiAgICBkbyB7XG4gICAgICAgIG5vZGVzLnB1c2goIHBhcnNlRXhwcmVzc2lvbihjb2RlLCBjdXJzb3IpIGFzIGFueSk7XG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgICAgICB3aGlsZSggY2hhciA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICBjaGFyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgICAgICAgICAgKytjdXJzb3IubGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvci5saW5lX29mZnNldCA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICB9IHdoaWxlKCBjaGFyICE9PSB1bmRlZmluZWQgKTtcblxuICAgIC8vY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Ly9jb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzLFxuICAgICAgICBmaWxlbmFtZVxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19jb252ZXJ0IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3ltYm9sKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICdhJyAmJiBjYXIgPD0gJ3onIHx8IGNhciA+PSAnQScgJiYgY2FyIDw9ICdaJyB8fCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgfHwgY2FyID09ICdfJyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICBjb25zdCBzeW1ib2wgPSBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCk7XG5cbiAgICAvL1RPRE86IGlmIGtleXdvcmQuLi5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcInN5bWJvbFwiLFxuICAgICAgICB2YWx1ZSAgIDogc3ltYm9sLCAvL1RPRE86IGNmIGNvbnZlcnQgKHNlYXJjaCBpbiBsb2NhbCB2YXJpYWJsZXMvQ29udGV4dC4uLilcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfY29udmVydFxuICAgIH07XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfaW50IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICAvL1RPRE86IHJlYWwuLi5cblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJzAnICYmIGNhciA8PSAnOScgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuaW50XCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX2ludCxcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfbGl0ZXJhbHNfc3RyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICdcIicgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICArK2N1cnNvci5vZmZzZXQ7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwibGl0ZXJhbHMuc3RyaW5nXCIsXG4gICAgICAgIHZhbHVlICAgOiBjb2RlLnNsaWNlKGJlZ2luX3N0ciwgY3Vyc29yLm9mZnNldCksXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2xpdGVyYWxzX3N0cixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuXG4gICAgbGV0IGxlZnQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgaWYoIGNoYXIgPT09ICdcXG4nKVxuICAgICAgICByZXR1cm4gbGVmdDtcblxuICAgIGxldCBvcCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBvcCEuY2hpbGRyZW5bMF0gPSBsZWZ0O1xuICAgIG9wLnB5Y29kZS5zdGFydCA9IGxlZnQucHljb2RlLnN0YXJ0O1xuXG4gICAgbGV0IHZhbHVlcyA9IFtvcCwgcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpXTtcblxuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyICE9PSAnXFxuJyApIHtcblxuICAgICAgICBsZXQgb3AyICAgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIGxldCByaWdodCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcblxuICAgICAgICBsZXQgb3AxICA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdO1xuICAgICAgICBsZXQgbGVmdCA9IHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuXG4gICAgICAgIC8vVE9ETzogaGFuZGxlIG9wIHByaW9yaXR5Li4uXG4gICAgICAgIC8vIChhK2IpK2NcblxuICAgICAgICAvLyAoYStiKVxuICAgICAgICBvcDEhLmNoaWxkcmVuWzFdID0gbGVmdDtcbiAgICAgICAgb3AxIS5weWNvZGUuZW5kICA9IGxlZnQucHljb2RlLmVuZDsgXG5cbiAgICAgICAgLy8gKCkrY1xuICAgICAgICBvcDIhLmNoaWxkcmVuWzBdID0gb3AxO1xuICAgICAgICBvcDIucHljb2RlLnN0YXJ0ID0gb3AxLnB5Y29kZS5zdGFydDtcblxuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXSA9IG9wMjtcbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV0gPSByaWdodDtcblxuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB9XG5cbiAgICB2YWx1ZXNbMF0hLmNoaWxkcmVuWzFdID0gdmFsdWVzWzFdO1xuICAgIHZhbHVlc1swXSEucHljb2RlLmVuZCAgPSB2YWx1ZXNbMV0ucHljb2RlLmVuZDtcblxuICAgIHJldHVybiB2YWx1ZXNbMF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0b3IoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0KytdO1xuICAgIC8qXG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJycgJiYgY29kZVtjdXJzb3Iub2Zmc2V0LTFdICE9PSAnXFxcXCcgKVxuICAgICAgICBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07Ki9cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcIm9wZXJhdG9ycy5cIiArIGNoYXIsXG4gICAgICAgIHZhbHVlICAgOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogW3VuZGVmaW5lZCwgdW5kZWZpbmVkXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogQ09SRV9NT0RVTEVTW1wib3BlcmF0b3JzLlwiICsgY2hhcl0uQVNUMkpTLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciA9PT0gJyAnIHx8IGNoYXIgPT09ICdcXHQnIClcbiAgICAgICAgY2hhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICAvLyBpZ25vcmUgY2hhclxuICAgIGlmKCBjaGFyID09PSB1bmRlZmluZWQgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgIH07XG5cbiAgICBsZXQgbm9kZSA9IG51bGxcbiAgICBpZiggY2hhciA9PT0gJ1wiJylcbiAgICAgICAgbm9kZSA9IHBhcnNlU3RyaW5nKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnYScgJiYgY2hhciA8PSAneicgfHwgY2hhciA+PSAnQScgJiYgY2hhciA8PSAnWicgfHwgY2hhciA9PSAnXycgKVxuICAgICAgICBub2RlID0gcGFyc2VTeW1ib2woY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICcwJyAmJiBjaGFyIDw9ICc5JylcbiAgICAgICAgbm9kZSA9IHBhcnNlTnVtYmVyKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBub2RlID0gcGFyc2VPcGVyYXRvcihjb2RlLCBjdXJzb3IpO1xuICAgICAgICAvLzsgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGVuIHBhcnNpbmcgJHtjaGFyfSBhdCAke2N1cnNvci5saW5lfToke2N1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXR9ICgke2N1cnNvci5vZmZzZXR9KWApO1xuXG4gICAgbm9kZS5weWNvZGUgPSB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICAgICAgY29sIDogY3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVE9ETzogaXMgbmV4dCBhbiBvcGVyYXRvciA/IC0+IGNvbnN0cnVpcmUgYXJicmUuLi5cbiAgICAvL1RPRE8gaGFuZGxlIG9wZXJhdG9ycyA/XG5cbiAgICByZXR1cm4gbm9kZTtcblxufSIsImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcblxuaW1wb3J0IHtkZWZhdWx0IGFzIF9yX30gZnJvbSBcIi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQge19iX30gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbmV4cG9ydCB7X2JfLCBfcl99O1xuXG4vLyBjbGFzc2UgP1xuXG5cbmV4cG9ydCBjbGFzcyBTQnJ5dGhvbiB7XG5cbiAgICAjcmVnaXN0ZXJlZF9BU1Q6IFJlY29yZDxzdHJpbmcsIEFTVD4gPSB7fTtcbiAgICAjZXhwb3J0ZWQ6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+ID0ge1xuICAgICAgICBicm93c2VyOiBnbG9iYWxUaGlzXG4gICAgfTtcblxuICAgIC8vVE9ETzogcnVuQVNUKCkgP1xuICAgIC8vVE9ETzogcnVuUHl0aG9uQ29kZSgpID9cblxuICAgIC8vVE9ETzogc29tZWhvdywgcmVtb3ZlIEFTVCBhcmcgPz8/XG4gICAgcnVuSlNDb2RlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuXG4gICAgICAgIGlmKGFzdC5maWxlbmFtZSBpbiB0aGlzLiNyZWdpc3RlcmVkX0FTVClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVNUICR7YXN0LmZpbGVuYW1lfSBhbHJlYWR5IHJlZ2lzdGVyZWQhYCk7XG5cbiAgICAgICAgLy9UT0RPOiBmaWxlbmFtZSAyIG1vZHVsZW5hbWUuXG4gICAgICAgIHRoaXMuI3JlZ2lzdGVyZWRfQVNUW2FzdC5maWxlbmFtZV0gPSBhc3Q7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhqc2NvZGUpO1xuICAgICAgICBjb25zdCBqc19mY3QgPSBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSBqc19mY3QodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5pbnRlcmZhY2UgSUFTVE5vZGUgIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUgaW1wbGVtZW50cyBJQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCwgU1R5cGVGY3RTdWJzIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuZXhwb3J0IGNvbnN0IGJuYW1lMnB5bmFtZSA9IHtcbiAgICBcIlVTdWJcIjogXCJfX25lZ19fXCIsXG4gICAgXCJOb3RcIiA6IFwibm90XCIsXG5cbiAgICBcIlBvd1wiIDogXCJfX3Bvd19fXCIsXG5cbiAgICBcIk11bHRcIiAgICA6IFwiX19tdWxfX1wiLFxuICAgIFwiRGl2XCIgICAgIDogXCJfX3RydWVkaXZfX1wiLFxuICAgIFwiRmxvb3JEaXZcIjogXCJfX2Zsb29yZGl2X19cIixcbiAgICBcIk1vZFwiICAgICA6IFwiX19tb2RfX1wiLFxuXG4gICAgXCJBZGRcIiAgICAgOiBcIl9fYWRkX19cIixcbiAgICBcIlN1YlwiICAgICA6IFwiX19zdWJfX1wiLFxuXG4gICAgXCJJc1wiICAgICAgOiBcImlzXCIsXG4gICAgXCJJc05vdFwiICAgOiBcImlzIG5vdFwiLFxuICAgIFwiRXFcIiAgICAgIDogXCJfX2VxX19cIixcbiAgICBcIk5vdEVxXCIgICA6IFwiX19uZV9fXCIsXG5cbiAgICBcIkd0XCIgICAgICA6IFwiX19ndF9fXCIsXG4gICAgXCJHdEVcIiAgICAgOiBcIl9fZ2VfX1wiLFxuICAgIFwiTHRcIiAgICAgIDogXCJfX2x0X19cIixcbiAgICBcIkx0RVwiICAgICA6IFwiX19sZV9fXCIsXG5cbiAgICBcIkludmVydFwiICA6IFwiX19ub3RfX1wiLFxuXG4gICAgXCJCaXRPclwiICAgOiBcIl9fb3JfX1wiLFxuICAgIFwiQml0WG9yXCIgIDogXCJfX3hvcl9fXCIsXG4gICAgXCJCaXRBbmRcIiAgOiBcIl9fYW5kX19cIixcbiAgICBcIlJTaGlmdFwiICA6IFwiX19yc2hpZnRfX1wiLFxuICAgIFwiTFNoaWZ0XCIgIDogXCJfX2xzaGlmdF9fXCIsXG59XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlPcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX3Jwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX3JtdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX3J0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19yZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX3Jtb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19yYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX3JzdWJfXycsXG5cbiAgICAnX19lcV9fJyAgICAgOiAnX19lcV9fJyxcbiAgICAnX19uZV9fJyAgICAgOiAnX19uZV9fJyxcblxuICAgICdfX2x0X18nICAgICA6ICdfX2d0X18nLFxuICAgICdfX2d0X18nICAgICA6ICdfX2x0X18nLFxuICAgICdfX2xlX18nICAgICA6ICdfX2dlX18nLFxuICAgICdfX2dlX18nICAgICA6ICdfX2xlX18nLFxuXG4gICAgJ19fbm90X18nICAgIDogJ19fcm5vdF9fJyxcbiAgICAnX19vcl9fJyAgICAgOiAnX19yb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19fcmFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19yeG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX3Jsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19fcnJzaGlmdF9fJyxcbn1cblxuZXhwb3J0IGNvbnN0IEFzc2lnbk9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19faXBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19faW11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19faXRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX2lmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19faW1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX2lhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19faXN1Yl9fJyxcblxuICAgICdfX29yX18nICAgICA6ICdfX2lvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19pYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX2l4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19faWxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19pcnNoaWZ0X18nLFxufVxuXG5cbmV4cG9ydCBjb25zdCBqc29wMnB5b3AgPSB7XG4gICAgJyoqJzogJ3BvdycsXG4gICAgJyonIDogJ211bCcsXG4gICAgJy8nIDogJ3RydWVkaXYnLFxuICAgICcvLyc6ICdmbG9vcmRpdicsXG4gICAgJyUnIDogJ21vZCcsXG4gICAgXG4gICAgJysnIDogJ2FkZCcsXG4gICAgJy0nIDogJ3N1YicsXG4gICAgXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWyd1Li0nXSxcbiAgICBbJyoqJ10sIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnKicsICcvJywgJyUnXSwgLy8gUHl0aG9uIGFsc28gaGFzIC8vXG4gICAgWycrJywgJy0nXSxcbiAgICBbJzw8JywgJz4+JywgJz4+PiddLCAvL1RPRE9cbiAgICBbJzwnLCAnPD0nLCAnPj0nLCAnPiddLFxuICAgIFsnPT0nLCAnIT0nLCAnPT09JywgJyE9PSddLFxuICAgIFsnJiddLCAgLy9UT0RPXG4gICAgWydeJ10sICAvL1RPRE9cbiAgICBbJ3wnXSwgIC8vVE9ET1xuICAgIFsnJiYnXSwgLy9UT0RPXG4gICAgWyd8fCcsICc/PyddLFxuICAgIFsnPSddIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICAvLyBldGMuXG5dO1xuXG4vKlxuaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI2NhbGxhYmxlXG5cbi0+IGNsYXNzZXNcbmJvb2woKVxuZmxvYXQoKVxuaW50KClcbnN0cigpXG5ieXRlYXJyYXkoKSBbVWludDhBcnJheV0gKFJXKVxuYnl0ZXMoKSAgICAgWz9dICAgICAgICAgIChSTykgPC0gbm8gdHlwZXMgaW4gSlMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtIFVpbnQ4QXJyYXkgd2l0aCBmbGFnID8gZnJlZXplKCkgW0pTIHVuc2FmZV1cbiAgICAgICAgICAgIGJcImVcXHhGRlwiIGluc3RlYWQgb2YgWzEwMSwxMDFdLCBldGMuICgzMiA8PSBieXQgPD0gMTI2KVxudHlwZSgpXG5saXN0KCkgICAgICBbQXJyYXldXG50dXBsZSgpICAgICBbT2JqZWN0LmZyb3plbihBcnJheSldXG5cbnNldCgpICAgICAgIC8vIHJlbGllcyBvbiBoYXNoKCkuLi4gPT4gc2V0W2xpdGVyYWxzXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHNldCgpIC8gPC0gSlMgc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICA9PiBieXRlcy9ieXRlYXJyYXkvZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgU2V0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gSW50ZXJuYWwga2V5cygpIHNldCBbcmVjb21wdXRlIGhhc2ggd2hlbiBhZGQvcmVtb3ZlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGludGVybmFsbHkgc3RvcmVkIGFzIE1hcChoYXNoLCB2YWx1ZSkgKD8pXG5mcm96ZW5zZXQoKSAgICAgICAgICAgID0+IGV4dGVuZHMgc2V0IHRvIHJlcGxhY2UgbW9kaWZpZXJzLlxuXG5kaWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc3RyXSBhcyBPYmplY3QuY3JlYXRlKG51bGwpICsgKGFuZCBwdXJlIEpTT2JqIGFzIGRpY3Rbc3RyXSApXG4gICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IE1hcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gU2V0KGhhc2gpIC8gTWFwKGhhc2gsIGtleSkgLyBNYXAoa2V5LCBoYXNoKSA/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0L3NldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBNYXAoa2V5LCB2YWx1ZSlcblxub2JqZWN0KClcbmNvbXBsZXgoKVxubWVtb3J5dmlldygpICAgICAgICAgICAgPT4gQXJyYXlCdWZmZXIgP1xuXG4tPiBwcmludFxuYXNjaWkoKVxuYmluKClcbmhleCgpXG5vY3QoKVxucmVwcigpXG5oYXNoKClcblxuLT4gbWF0aHNcbmFicygpXG5kaXZtb2QoKVxucG93KClcbnJvdW5kKClcblxuLT4gbGlzdHNcbmFsbCgpXG5hbnkoKVxuZmlsdGVyKClcbm1hcCgpXG5tYXgoKVxubWluKClcbnN1bSgpXG5sZW4oKVxuZW51bWVyYXRlKClcbnJldmVyc2VkKClcbnNsaWNlKClcbnNvcnRlZCgpXG56aXAoKVxuXG4tPiBpdGVyXG5yYW5nZSgpXG5haXRlcigpXG5pdGVyKClcbmFuZXh0KClcbm5leHQoKVxuXG4tPiBzdHJcbm9yZCgpXG5jaHIoKVxuZm9ybWF0KClcbnByaW50KClcbmZcIlwiXG5cbmNhbGxhYmxlKClcbmNsYXNzbWV0aG9kKClcbnN0YXRpY21ldGhvZCgpXG5wcm9wZXJ0eSgpXG5zdXBlcigpXG5pc2luc3RhbmNlKClcbmlzc3ViY2xhc3MoKVxuZGVsYXR0cigpXG5nZXRhdHRyKClcbmhhc2F0dHIoKVxuc2V0YXR0cigpXG5kaXIoKVxuXG5ldmFsKClcbmV4ZWMoKVxuY29tcGlsZSgpXG5icmVha3BvaW50KClcblxuZ2xvYmFscygpXG5sb2NhbHMoKVxudmFycygpXG5fX2ltcG9ydF9fKClcblxuaWQoKVxuICAgIC0+IG9uLWRlbWFuZCB3ZWFrcmVmID9cblxuaGVscCgpXG5pbnB1dCgpXG5vcGVuKClcblxuKi9cblxuLypcbnVuYXJ5XG4tIHBvcyAodW5hcnkgKylcblxuLSBib29sXG4tIGZsb2F0XG4tIGludFxuLSBzdHJcbi0gcmVwclxuXG4tIGFic1xuLSBjZWlsXG4tIGZsb29yXG4tIHJvdW5kXG4tIHRydW5jXG5cbmJpbmFyeVxuLSBwb3cvcnBvd1xuLSBkaXZtb2QvcmRpdm1vZFxuXG5jbGFzc1xuLSBjbGFzc1xuLSBuZXdcbi0gaW5pdFxuLSBpbml0X3N1YmNsYXNzXG5cbi0gc3ViY2xhc3Nob29rIC8vIF9faXNpbnN0YW5jZWNoZWNrX18gXG5cbi0gZGlyXG4tIGRlbGF0dHJcbi0gc2V0YXR0clxuLSBnZXRhdHRyaWJ1dGVcblxuLSBkb2Ncbi0gZm9ybWF0XG4tIGdldG5ld2FyZ3Ncbi0gaGFzaFxuLSBpbmRleCAoPylcbi0gc2l6ZW9mXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gSW50MkZsb2F0KGE6IEFTVE5vZGUsIG9wdGlvbmFsID0gZmFsc2UpIHtcblxuICAgIC8vVE9ETyBjYW5CZUZsb2F0ICsgZXRjLlxuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hc0Zsb2F0ICAgICAgPSB0cnVlO1xuICAgICAgICAoYSBhcyBhbnkpLmFzRmxvYXRJc09wdCA9IG9wdGlvbmFsO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIG9wdGlvbmFsIClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xufVxuXG5sZXQgSlNPcGVyYXRvcnNQcmlvcml0eTogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuZm9yKGxldCBpID0gMDsgaSA8IEpTT3BlcmF0b3JzLmxlbmd0aDsgKytpKSB7XG5cbiAgICBjb25zdCBwcmlvcml0eSA9IEpTT3BlcmF0b3JzLmxlbmd0aCAtIGk7XG4gICAgZm9yKGxldCBvcCBvZiBKU09wZXJhdG9yc1tpXSlcbiAgICAgICAgSlNPcGVyYXRvcnNQcmlvcml0eVtvcF0gPSBwcmlvcml0eTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZWRfb3BlcmF0b3I8VCBleHRlbmRzIGtleW9mIHR5cGVvZiBCaW5hcnlPcGVyYXRvcnM+KG9wOiBUKSB7XG4gICAgcmV0dXJuIEJpbmFyeU9wZXJhdG9yc1tvcF07XG59XG5cbmNvbnN0IExFRlQgID0gMTtcbmNvbnN0IFJJR0hUID0gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpX2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgLi4udmFsdWVzOiBBU1ROb2RlW10pIHtcblxuICAgIGNvbnN0IGZpcnN0ID0gdmFsdWVzWzBdO1xuICAgIGlmKGZpcnN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlR8UklHSFQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsYXN0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG4gICAgaWYobGFzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtmaXJzdH1gO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHJlc3VsdCA9IHJgJHtyZXN1bHR9ICYmICR7dmFsdWVzW2ldfWA7XG5cbiAgICBpZiggXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWRfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSB7XG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke2F9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGV8YW55LCBvcDogc3RyaW5nLCBiOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGlmKGIgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7YX0ke29wfSR7Yn1gO1xuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCBhOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBSSUdIVDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke29wfSR7YX1gO1xuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIChkaXJlY3Rpb24gJiBMRUZUKSAmJiBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuRGVmYXVsdEpTVW5hcmllcygpIHtcblxufVxuXG5mdW5jdGlvbiBnZW5EZWZhdWx0SlNDbXBzKCkge1xuXG59XG5cbnR5cGUgR2VuQmluYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9vdGhlcj86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICByZXR1cm4gKG5vZGU6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gY29udmVydFtub2RlLnJlc3VsdF90eXBlIV07XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IG90aGVyIHR5cGVzXG4gICAgICAgIC8vVE9ETzogdXNlIF9feF9fIG9wZXJhdG9ycyA/XG4gICAgICAgIHJldHVybiBJbnQyRmxvYXQobm9kZSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkJpbmFyeU9wcyhyZXRfdHlwZTogc3RyaW5nLCBvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLCBvdGhlcl90eXBlOiBzdHJpbmdbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30pIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IHN0cmluZykgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IHJldF90eXBlIDogU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgc2VsZiwgb3AsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRbYF9fciR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252X290aGVyKG90aGVyKSwgb3AsIHNlbGYpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgc2VsZiwgb3ArJz0nLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5DbXBPcGVyYXRvcl9PcHRzID0ge1xuICAgIHN1cHBvcnRlZF90eXBlczogc3RyaW5nW10sXG59O1xuXG5mdW5jdGlvbiBfZ2VuQ21wKG9wMTogc3RyaW5nLCBvcDI6IHN0cmluZykge1xuICAgIHJldHVybiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgaW52ZXJ0X2RpcjogYm9vbGVhbiwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBvcCA9IG9wMTtcbiAgICAgICAgaWYoIHJldmVyc2VkIClcbiAgICAgICAgICAgIGludmVydF9kaXIgPSAhIGludmVydF9kaXI7XG4gICAgICAgIGlmKCBpbnZlcnRfZGlyIClcbiAgICAgICAgICAgIG9wID0gb3AyO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZWQgPyBiaW5hcnlfanNvcChub2RlLCBvLCBvcCwgc2VsZikgOiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCwgbyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2VuQ21wT3BlcmF0b3Ioe1xuICAgIHN1cHBvcnRlZF90eXBlc1xufTogR2VuQ21wT3BlcmF0b3JfT3B0cykge1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiBzdXBwb3J0ZWRfdHlwZXMuaW5jbHVkZXMobykgPyAnYm9vbCc6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcblxuICAgIGNvbnN0IHh0ID0gX2dlbkNtcCgnPCcgLCAnPicpO1xuICAgIGNvbnN0IHhlID0gX2dlbkNtcCgnPD0nLCAnPj0nKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIF9fbHRfXzoge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImx0XCIsIHNlbGYsIG8sIHJldmVyc2VkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geHQobm9kZSwgc2VsZiwgbywgZmFsc2UsIHJldmVyc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19ndF9fOiB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZ3RcIiwgc2VsZiwgbywgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB4dChub2RlLCBzZWxmLCBvLCB0cnVlLCByZXZlcnNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9fbGVfXzoge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB4ZShub2RlLCBzZWxmLCBvLCBmYWxzZSwgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfX2dlX186IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geGUobm9kZSwgc2VsZiwgbywgdHJ1ZSwgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG50eXBlIEdlbkVxT3BlcmF0b3JfT3B0cyA9IHtcbiAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBsZWZ0OiBBU1ROb2RlLCBvcDogXCI9PVwifFwiIT1cIiwgcmlnaHQ6IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiBhbnksXG4gICAgc3VwcG9ydGVkX3R5cGVzOiBzdHJpbmdbXSxcbiAgICBjb252ZXJ0ICAgICAgID86IChhOiBBU1ROb2RlKSA9PiBhbnksXG4gICAgc2VsZl9jb252ZXJ0ICA/OiAoYTogQVNUTm9kZSkgPT4gYW55LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2VuRXFPcGVyYXRvcih7XG4gICAgY2FsbF9zdWJzdGl0dXRlLFxuICAgIHN1cHBvcnRlZF90eXBlcyxcbiAgICBjb252ZXJ0ID0gKGE6IEFTVE5vZGUpID0+IGEsXG4gICAgc2VsZl9jb252ZXJ0ID0gKGE6IEFTVE5vZGUpID0+IGFcbn06IEdlbkVxT3BlcmF0b3JfT3B0cykge1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiBzdXBwb3J0ZWRfdHlwZXMuaW5jbHVkZXMobykgPyAnYm9vbCc6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfX2VxX18nOiB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ICA9IHJldmVyc2VkID8gY29udmVydChvKSAgICAgICAgIDogc2VsZl9jb252ZXJ0KHNlbGYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gcmV2ZXJzZWQgPyBzZWxmX2NvbnZlcnQoc2VsZikgOiBjb252ZXJ0KG8pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCAnPT0nLCByaWdodCwgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX19uZV9fJzoge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdCAgPSByZXZlcnNlZCA/IGNvbnZlcnQobykgICAgICAgICA6IHNlbGZfY29udmVydChzZWxmKTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodCA9IHJldmVyc2VkID8gc2VsZl9jb252ZXJ0KHNlbGYpIDogY29udmVydChvKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgJyE9JywgcmlnaHQsIHJldmVyc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG50eXBlIEdlbkJpbmFyeU9wZXJhdG9yX09wdHMgPSB7XG4gICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4gYW55LFxuICAgIHJldHVybl90eXBlICAgIDogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0ICAgICAgID86IChhOiBBU1ROb2RlKSA9PiBhbnksXG4gICAgc2FtZV9vcmRlciAgICA/OiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHZW5CaW5hcnlPcGVyYXRvcihuYW1lOiBzdHJpbmcsIHtcbiAgICBjYWxsX3N1YnN0aXR1dGUsXG4gICAgcmV0dXJuX3R5cGUsXG4gICAgc2FtZV9vcmRlciA9IGZhbHNlLFxuICAgIGNvbnZlcnQgPSAoYTogQVNUTm9kZSkgPT4gYVxufTogR2VuQmluYXJ5T3BlcmF0b3JfT3B0cykge1xuXG4gICAgY29uc3QgZmN0ID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmLCBjb252ZXJ0KG8pICk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJmY3QgPSBzYW1lX29yZGVyID8gZmN0IDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBjb252ZXJ0KG8pLCBzZWxmKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2BfXyR7IG5hbWV9X19gXToge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGU6IChvOiBzdHJpbmcpID0+IHJldHVybl90eXBlW29dID8/IFNUeXBlX05PVF9JTVBMRU1FTlRFRCxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogZmN0XG4gICAgICAgIH0sXG4gICAgICAgIFtgX19yJHtuYW1lfV9fYF06IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlOiAobzogc3RyaW5nKSA9PiByZXR1cm5fdHlwZVtvXSA/PyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IHJmY3RcbiAgICAgICAgfSxcbiAgICB9O1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcIi4vQVNUTm9kZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCb2R5IHtcblxuICAgIG5vZGU7XG4gICAgcHJpbnRfYnJhY2tldDtcbiAgICBpZHg7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBBU1ROb2RlLCBwcmludF9icmFja2V0ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmlkeCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7IC8vVE9ETyBzZWFyY2ggYm9keS4uLlxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLnByaW50X2JyYWNrZXQgPSBwcmludF9icmFja2V0O1xuICAgIH1cblxuICAgIHRvSlMoY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpXG4gICAgICAgICAgICBqcys9XCJ7XCI7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5pZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IpO1xuICAgICAgICAgICAganMgKz0gXCJ9XCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxufSIsIlxuZXhwb3J0IHR5cGUgU1R5cGVTdWJzID0ge1xuICAgIHR5cGUgICAgICAgPzogc3RyaW5nLFxuICAgIHN1YnN0aXR1dGUgPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnlcbn07XG5leHBvcnQgdHlwZSBTVHlwZUZjdFN1YnMgPSB7XG4gICAgdHlwZSAgICAgICAgICAgID86IHN0cmluZywgLy8gb3IgbWFueSB0eXBlcy4uLiBbXVxuICAgIGNhbGxfc3Vic3RpdHV0ZSA/OiAoLi4uYXJnczogYW55W10pID0+IGFueSxcbiAgICByZXR1cm5fdHlwZSAgICAgIDogKC4uLmFyZ3M6IHN0cmluZ1tdKSA9PiBzdHJpbmcgLy8gZm9yIG1ldGhvZHMvZnVuY3Rpb25zLi4uXG59O1xuZXhwb3J0IHR5cGUgU1R5cGUgPSBzdHJpbmcgfCBTVHlwZVN1YnMgfCBTVHlwZUZjdFN1YnM7XG5leHBvcnQgdHlwZSBTVHlwZU9iaiA9IFJlY29yZDxzdHJpbmcsIFNUeXBlPjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX05PVF9JTVBMRU1FTlRFRCA9IFwiTm90SW1wbGVtZW50ZWRUeXBlXCI7IiwiaW1wb3J0IFNUeXBlX2Zsb2F0IGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9pbnQgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9zdHIgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9Ob25lIGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX2Jvb2wgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlXCI7XG5cbi8vZXhwb3J0IHR5cGUgU1R5cGVOYW1lID0ga2V5b2YgdHlwZW9mIG5hbWUyU1R5cGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYW1lMlNUeXBlKG5hbWU6IHN0cmluZykge1xuXG4gICAgY29uc3QgbmFtZTJTVHlwZSA9IHtcbiAgICAgICAgXCJmbG9hdFwiICAgOiBTVHlwZV9mbG9hdCxcbiAgICAgICAgXCJpbnRcIiAgICAgOiBTVHlwZV9pbnQsXG4gICAgICAgIFwiYm9vbFwiICAgIDogU1R5cGVfYm9vbCxcbiAgICAgICAgXCJzdHJcIiAgICAgOiBTVHlwZV9zdHIsXG4gICAgICAgIFwiTm9uZVR5cGVcIjogU1R5cGVfTm9uZVxuICAgIH1cblxuICAgIHJldHVybiBuYW1lMlNUeXBlW25hbWUgYXMga2V5b2YgdHlwZW9mIG5hbWUyU1R5cGVdO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiQm9keSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImFyZ3MyanMiLCJhcmcyanMiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJiYXNlIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnZlcnQiLCJjb250ZXh0IiwibG9jYWxfdmFyaWFibGVzIiwibmFtZSIsImJhc2VzIiwiRXJyb3IiLCJicnl0aG9uX25hbWUiLCJfY3Vyc29yIiwiX2NvbnRleHQiLCJiZWciLCJpbmNyIiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJyZXN1bHRfdHlwZSIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiaCIsImZpbHRlcl9zdGFjayIsInN0YWNrIiwiZmlsdGVyIiwiZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3BvcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJzbGljZSIsImZjdF9uYW1lIiwicG9zIiwiaW5kZXhPZiIsImRlYnVnX3ByaW50X2V4Y2VwdGlvbiIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiX3Jhd19lcnJfIiwic3RhY2tfc3RyIiwiZXhjZXB0aW9uX3N0ciIsImxvZyIsIl9faW5pdF9fIiwiY2FsbF9zdWJzdGl0dXRlIiwic3RhcnRzV2l0aCIsIm5hbWUyU1R5cGUiLCJrbGFzcyIsInVuZGVmaW5lZCIsInJldHVybl90eXBlIiwiZW5kc1dpdGgiLCJjb252ZXJ0X2FyZ3MiLCJpc01ldGhvZCIsImFyZyIsImFzc2VydCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiUlVOVElNRV8yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIlJVTlRJTUVfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIlJVTlRJTUVfMjgiLCJBU1RfQ09OVkVSVF8yOSIsIkFTVDJKU18yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsIlJVTlRJTUUiLCJhc3NpZ24iLCJfYl8iLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJTVHlwZV9Ob25lIiwiYmluYXJ5X2pzb3AiLCJHZW5FcU9wZXJhdG9yIiwiU1R5cGVfYm9vbCIsInN1cHBvcnRlZF90eXBlcyIsImxlZnQiLCJvcCIsInJpZ2h0IiwiY2hpbGQiLCJ2YWx1ZXMiLCJHZW5CaW5hcnlPcGVyYXRvciIsImdlbkJpbmFyeU9wcyIsIkludDJGbG9hdCIsInVuYXJ5X2pzb3AiLCJTVHlwZV9mbG9hdCIsImEiLCJjb252ZXJ0X290aGVyIiwiYiIsImFzRmxvYXQiLCJhc0Zsb2F0SXNPcHQiLCJOdW1iZXIiLCJpZF9qc29wIiwiU1R5cGVfaW50Iiwib3RoZXIiLCJtZXRob2QiLCJfX2ludF9fIiwic2VsZiIsInNlbGZfY29udmVydCIsIl9fbm90X18iLCJHZW5DbXBPcGVyYXRvciIsIlNUeXBlX3N0ciIsInNhbWVfb3JkZXIiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVHlwZV9OT1RfSU1QTEVNRU5URUQiLCJibmFtZTJweW5hbWUiLCJhdHRyIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJmbG9vcmRpdiIsInJlc3VsdCIsIm11bHRpX2pzb3AiLCJibmFtZTJqc29wIiwiZmluZF9hbmRfY2FsbF9zdWJzdGl0dXRlIiwicmV2ZXJzZWQiLCJydHlwZSIsImx0eXBlIiwianNvcCIsIm9wcyIsInJpZ2h0cyIsImNvbXBhcmF0b3JzIiwib3BlcmFuZCIsImV4cHIiLCJrZXlzIiwiZWx0cyIsIl9yXyIsImlzQ2xhc3MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicHJvdG90eXBlIiwid3JpdGFibGUiLCJQeV9vYmplY3QiLCJQeV9FeGNlcHRpb24iLCJQeV9KU0V4Y2VwdGlvbiIsIlJVTlRJTUVfMCIsIlJVTlRJTUVfMSIsIlJVTlRJTUVfMiIsIkNPUkVfTU9EVUxFUyIsIm1vZHVsZXMiLCJtb2R1bGVfbmFtZSIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb252ZXJ0X2FzdCIsImdldE5vZGVUeXBlIiwiYnJ5dGhvbl9ub2RlIiwiZXJyb3IiLCJsaW5lcyIsIm0iLCJjb252ZXJ0X2xpbmUiLCJsYXN0IiwidmlydF9ub2RlIiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiX2FyZ3MiLCJjb252ZXJ0X2FyZyIsImZpcnN0IiwicGFyZW50X2NvbnRleHQiLCJjcmVhdGUiLCJsaW5lX29mZnNldCIsImNoYXIiLCJwYXJzZUV4cHJlc3Npb24iLCJhc3QyanNfY29udmVydCIsInBhcnNlU3ltYm9sIiwiYmVnaW5fc3RyIiwiY2FyIiwic3ltYm9sIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsIm9wMiIsIm9wMSIsInBhcnNlT3BlcmF0b3IiLCJkZWZhdWx0IiwiU0JyeXRob24iLCJyZWdpc3RlcmVkX0FTVCIsImJyb3dzZXIiLCJnbG9iYWxUaGlzIiwicnVuSlNDb2RlIiwianNfZmN0IiwiRnVuY3Rpb24iLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJvcHRpb25hbCIsIkpTT3BlcmF0b3JzUHJpb3JpdHkiLCJwcmlvcml0eSIsIkxFRlQiLCJSSUdIVCIsInBhcmVudF9vcCIsInBhcmVudF9vcF9kaXIiLCJkaXJlY3Rpb24iLCJjdXJfcHJpb3JpdHkiLCJwYXJlbnRfcHJpb3JpdHkiLCJjaGVja19wcmlvcml0eSIsImdlbkRlZmF1bHRKU1VuYXJpZXMiLCJnZW5EZWZhdWx0SlNDbXBzIiwiZ2VuZXJhdGVDb252ZXJ0IiwicmV0X3R5cGUiLCJvdGhlcl90eXBlIiwibyIsImNvbnZfb3RoZXIiLCJweW9wIiwiX2dlbkNtcCIsImludmVydF9kaXIiLCJ4dCIsInhlIiwiX19sdF9fIiwiX19ndF9fIiwiX19sZV9fIiwiX19nZV9fIiwiZmN0IiwicmZjdCIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==