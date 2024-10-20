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


function convert(node, context) {
    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.call", null, null, [
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
/* harmony import */ var _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./operators/attr/astconvert.ts */ "./src/core_modules/operators/attr/astconvert.ts");
/* harmony import */ var _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./operators/attr/ast2js.ts */ "./src/core_modules/operators/attr/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./operators/[]/astconvert.ts */ "./src/core_modules/operators/[]/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./operators/[]/ast2js.ts */ "./src/core_modules/operators/[]/ast2js.ts");
/* harmony import */ var _operators_FloorDiv_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./operators/FloorDiv/astconvert.ts */ "./src/core_modules/operators/FloorDiv/astconvert.ts");
/* harmony import */ var _operators_FloorDiv_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./operators/FloorDiv/ast2js.ts */ "./src/core_modules/operators/FloorDiv/ast2js.ts");
/* harmony import */ var _operators_Div_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./operators/Div/astconvert.ts */ "./src/core_modules/operators/Div/astconvert.ts");
/* harmony import */ var _operators_Div_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./operators/Div/ast2js.ts */ "./src/core_modules/operators/Div/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./operators/==/astconvert.ts */ "./src/core_modules/operators/==/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./operators/==/ast2js.ts */ "./src/core_modules/operators/==/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./operators/-/astconvert.ts */ "./src/core_modules/operators/-/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./operators/-/ast2js.ts */ "./src/core_modules/operators/-/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./operators/+/astconvert.ts */ "./src/core_modules/operators/+/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./operators/+/ast2js.ts */ "./src/core_modules/operators/+/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./operators/* /astconvert.ts */ "./src/core_modules/operators/*/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./operators/* /ast2js.ts */ "./src/core_modules/operators/*/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
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
/* harmony import */ var _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./keywords/assert/astconvert.ts */ "./src/core_modules/keywords/assert/astconvert.ts");
/* harmony import */ var _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./keywords/assert/ast2js.ts */ "./src/core_modules/keywords/assert/ast2js.ts");
/* harmony import */ var _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./keywords/assert/runtime.ts */ "./src/core_modules/keywords/assert/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");













































































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
    "operators.attr": {
        AST_CONVERT: _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "operators.[]": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "operators.FloorDiv": {
        AST_CONVERT: _operators_FloorDiv_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _operators_FloorDiv_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    },
    "operators.Div": {
        AST_CONVERT: _operators_Div_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _operators_Div_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "operators.==": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "operators.-": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
    },
    "operators.+": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__["default"]
    },
    "operators.*": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_28__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_29__["default"]
    },
    "literals.str": {
        AST_CONVERT: _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_30__["default"],
        AST2JS: _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_31__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_32__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_33__["default"]
    },
    "literals.float": {
        AST_CONVERT: _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_34__["default"],
        AST2JS: _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_35__["default"]
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
    "keywords.assert": {
        AST_CONVERT: _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_51__["default"],
        AST2JS: _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_52__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_54__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_55__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_56__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_57__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_58__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_59__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_60__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_61__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_63__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_64__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_65__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_66__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_67__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_68__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_69__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_70__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_71__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_72__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_73__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_74__["default"]
    },
    "class.classdef": {
        AST_CONVERT: _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_75__["default"],
        AST2JS: _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_76__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_46__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_53__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_62__["default"]);
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.None", "None", null);
}
convert.brython_name = "Constant";


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
    if (typeof node.value !== "number") return;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "literals.int", "int", node.value);
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
/* harmony export */   SType_NOT_IMPLEMENTED: () => (/* binding */ SType_NOT_IMPLEMENTED),
/* harmony export */   commutative_operators: () => (/* binding */ commutative_operators),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   reversed_operator: () => (/* binding */ reversed_operator)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

const SType_NOT_IMPLEMENTED = "NotImplementedType";
const BinaryOperators = {
    '__add__': '__radd__'
};
function reversed_operator(op) {
    return BinaryOperators[op];
}
function commutative_operators(type, ...ops) {
    for (let op of ops){
        const stype_op = type[op];
        const rop = BinaryOperators[op];
        type[rop] = {
            return_type: (a)=>stype_op.return_type(a),
            substitute: (self, o)=>stype_op.substitute(o, self)
        };
    }
}
function binary_jsop(node, a, op, b) {
    a.parent_op = op;
    b.parent_op = op;
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}${op}${b}`;
    // TODO js op priority order...
    if ("parent_op" in node) result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    return result;
}
const SType_int = {
    __add__: {
        return_type: (o)=>{
            if (o === 'int') return 'int';
            return SType_NOT_IMPLEMENTED; // can't be used.
        },
        substitute: (node, self, o)=>{
            return binary_jsop(node, self, '+', o);
        }
    }
};
commutative_operators(SType_int, '__add__');
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

/***/ "./src/core_modules/operators/*/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/operators/*_/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    if (left.result_type !== right.result_type) {
        if (left.result_type === 'int') left = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${left})`;
        if (right.result_type === 'int') right = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${right})`;
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${left} * ${right}`, cursor);
}


/***/ }),

/***/ "./src/core_modules/operators/*/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/operators/*_/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let type = null;
    if (left.result_type === right.result_type) type = left.result_type;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.*", type, null, [
        left,
        right
    ]);
}
convert.brython_name = [
    "BinOp.Mult"
];


/***/ }),

/***/ "./src/core_modules/operators/+/ast2js.ts":
/*!************************************************!*\
  !*** ./src/core_modules/operators/+/ast2js.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/literals/int/stype */ "./src/core_modules/literals/int/stype.ts");


const name2SType = {
    "int": core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    const op = "__add__"; //TODO find by node name...
    console.warn(left.result_type);
    let method = name2SType[left.result_type][op];
    //TODO: reverse during ASTConversion + set type during ASTConversion
    // try reversed operator
    if (method.return_type(right.result_type) === core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__.SType_NOT_IMPLEMENTED) {
        const rop = (0,core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__.reversed_operator)(op);
        method = name2SType[right.result_type][rop];
        [left, right] = [
            right,
            left
        ];
        if (method.return_type(right.type) === core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_1__.SType_NOT_IMPLEMENTED) throw new Error('NOT IMPLEMENTED!');
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(method.substitute(this, left, right), cursor);
}


/***/ }),

/***/ "./src/core_modules/operators/+/astconvert.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/operators/+/astconvert.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let type = null;
    if (left.result_type === right.result_type) type = left.result_type;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.+", type, null, [
        left,
        right
    ]);
}
convert.brython_name = [
    "BinOp.Add"
];


/***/ }),

/***/ "./src/core_modules/operators/-/ast2js.ts":
/*!************************************************!*\
  !*** ./src/core_modules/operators/-/ast2js.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} - ${this.children[1]}`, cursor);
}


/***/ }),

/***/ "./src/core_modules/operators/-/astconvert.ts":
/*!****************************************************!*\
  !*** ./src/core_modules/operators/-/astconvert.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let type = null;
    if (left.result_type === right.result_type) type = left.result_type;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.-", type, null, [
        left,
        right
    ]);
}
convert.brython_name = [
    "BinOp.Sub"
];


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

/***/ "./src/core_modules/operators/==/ast2js.ts":
/*!*************************************************!*\
  !*** ./src/core_modules/operators/==/ast2js.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    //TODO: better...
    let op = "==";
    if (this.type.endsWith('(is)')) op = "===";
    //TODO None type...
    //TODO str
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} ${op} ${this.children[1]}`, cursor);
}


/***/ }),

/***/ "./src/core_modules/operators/==/astconvert.ts":
/*!*****************************************************!*\
  !*** ./src/core_modules/operators/==/astconvert.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.comparators[0], context);
    if (left.result_type === null || right.result_type === null) {
    //TODO: object result_type too...
    //throw new Error("Not implemented");
    }
    //TODO
    let suffix = '';
    if (node.ops[0].constructor.$name === "Is") suffix = '(is)';
    console.warn(node);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `operators.==${suffix}`, "bool", null, [
        left,
        right
    ]);
}
convert.brython_name = "Compare";


/***/ }),

/***/ "./src/core_modules/operators/Div/ast2js.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/operators/Div/ast2js.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    if (left.result_type === 'int') left = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${left})`; // delayed toJS ?
    if (right.result_type === 'int') right = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${right})`;
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${left} / ${right}`, cursor);
}


/***/ }),

/***/ "./src/core_modules/operators/Div/astconvert.ts":
/*!******************************************************!*\
  !*** ./src/core_modules/operators/Div/astconvert.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let type = null;
    if (left.result_type === right.result_type) type = left.result_type;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators./", type, null, [
        left,
        right
    ]);
}
convert.brython_name = [
    "BinOp.Div"
];


/***/ }),

/***/ "./src/core_modules/operators/FloorDiv/ast2js.ts":
/*!*******************************************************!*\
  !*** ./src/core_modules/operators/FloorDiv/ast2js.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} / ${this.children[1]}`, cursor);
}


/***/ }),

/***/ "./src/core_modules/operators/FloorDiv/astconvert.ts":
/*!***********************************************************!*\
  !*** ./src/core_modules/operators/FloorDiv/astconvert.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node, context) {
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let type = null;
    if (left.result_type === right.result_type) type = left.result_type;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators./", type, null, [
        left,
        right
    ]);
}
convert.brython_name = [
    "BinOp.FloorDiv"
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
    let name = brython_node.sbrython_type ?? brython_node.constructor.$name;
    if (name === 'BinOp') name = `BinOp.${brython_node.op.constructor.$name}`;
    return name;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU1XLDRDQUFJQSxDQUFDLEtBQUtUO1FBQ3BCO1FBRUEsSUFBRyxJQUFJLENBQUN3QixhQUFhLEVBQUU7WUFDbkIxQixNQUFNWSwrQ0FBT0EsQ0FBQyxJQUFJLENBQUNQLElBQUksRUFBRUg7WUFDekJGLE1BQU07WUFDTkUsT0FBT0UsR0FBRyxJQUFJO1FBQ2xCO1FBRUF3QixLQUFLRSxNQUFNLEdBQUc7WUFDVkgsT0FBT0E7WUFDUEksS0FBTztnQkFBQyxHQUFHN0IsTUFBTTtZQUFBO1FBQ3JCO1FBRUEsT0FBT0Y7SUFDWDtBQUNKOzs7Ozs7O1NDNUNBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ2I7QUFDb0I7QUFDUDtBQUUrQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9zdHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8qL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLyovYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvLS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8tL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9EaXYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvRGl2L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9GbG9vckRpdi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9GbG9vckRpdi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQm9keS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZXxCb2R5LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQm9keSApIHtcbiAgICAgICAgcmV0dXJuIHN0ci50b0pTKGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGVcbiAgICAgICAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0ICYmICEgQXJyYXkuaXNBcnJheShzdHIpICkgeyAvLyBmb3IgcHkyYXN0X2Zhc3RcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZihwcmludF9icmFja2V0KVxuICAgICAgICBqcys9XCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgaWYocHJpbnRfYnJhY2tldCkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgfVxuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKVxuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIHJldHVybiB0b0pTKHJgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0gJHtuZXcgQm9keSh0aGlzKX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSAnY2xhc3MuJyArIG5vZGUubmFtZTtcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuYmFzZXMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICBbY29udmVydF9ub2RlKG5vZGUuYmFzZXNbMF0sIGNvbnRleHQpLCBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldXG4gICAgICAgIDogW2NvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIF9jdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGJlZyA6IHN0cmluZ3xBU1ROb2RlICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gPSAke2JlZ307ICR7dGhpcy52YWx1ZX0gPCAke2VuZH07ICR7dGhpcy52YWx1ZX0gKz0gJHtpbmNyfSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGgtMSk7XG5cbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gb2YgdGhpcy5jaGlsZHJlblswXSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7IC8vIGlmL2VsaWYgY29uZGl0aW9uLlxuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YDtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYCwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IEJvZHkodGhpcyk7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRyeSR7Ym9keX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MudHJ5YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS50cnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlPy5zdGFydHNXaXRoKFwiY2xhc3MuXCIpIClcbiAgICAgICAganMrPSB0b0pTKFwibmV3IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19KGAsIGN1cnNvcik7XG5cbiAgICAvL1RPRE86IGFyZ3Mgbm9kZS4uLlxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5mdW5jLCBjb250ZXh0ICksXG4gICAgICAgIC4uLm5vZGUuYXJncy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyBhcmdzMmpzLCBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gJyc7XG4gICAgaWYoICEgdGhpcy50eXBlLmVuZHNXaXRoKFwiKG1ldGgpXCIpIClcbiAgICAgICAganMgKz0gdG9KUygnZnVuY3Rpb24gJywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhcIntcIiwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgaWYoIGJvZHlbYm9keS5sZW5ndGggLSAxXS50eXBlICE9PSBcImtleXdvcmRzLnJldHVyblwiICkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IFwicmV0dXJuIG51bGw7XCJcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCkgKyB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYXJncywgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuICAgIGNvbnN0IGlzTWV0aG9kID0gY29udGV4dC50eXBlID09PSBcImNsYXNzXCI7ICBcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImZjdFwiLCBjb250ZXh0KTtcbiAgICAvLyBuZXcgY29udGV4dCBmb3IgdGhlIGZ1bmN0aW9uIGxvY2FsIHZhcmlhYmxlc1xuICAgIGNvbnRleHQgPSB7XG4gICAgICAgIC4uLmNvbnRleHRcbiAgICB9XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXMgPSB7Li4uY29udGV4dC5sb2NhbF92YXJpYWJsZXN9O1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAvLyByZXR1cm4gdHlwZS4uLiBub2RlLnJldHVybnMuaWRcblxuICAgIGxldCB0eXBlID0gXCJmdW5jdGlvbnMuZGVmXCI7XG4gICAgaWYoaXNNZXRob2QpXG4gICAgICAgIHR5cGUgKz0gXCIobWV0aClcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYF9iXy5hc3NlcnQoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJBc3NlcnRcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnZhbHVlWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWVbMF0sIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhgJHt0aGlzLnZhbHVlWzBdfTogJHt0aGlzLnZhbHVlWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydC5hbGlhc1wiLCBudWxsLCBbbm9kZS5uYW1lLCBub2RlLmFzbmFtZV0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAganMgKz0gdG9KUyhcImNvbnN0IHtcIiwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IgKTtcbiAgICAgICAganMgKz0gdG9KUyggdGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yICk7XG4gICAgfVxuICAgIGpzICs9IHRvSlMoXCJ9ID0gXCIsIGN1cnNvcik7XG4gICAgXG4gICAgaWYodGhpcy52YWx1ZSA9PT0gbnVsbClcbiAgICAgICAganMgKz0gdG9KUyhcIl9fU0JSWVRIT05fXy5nZXRNb2R1bGVzKClcIiwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIGpzICs9IHRvSlMoYF9fU0JSWVRIT05fXy5nZXRNb2R1bGUoXCIke3RoaXMudmFsdWV9XCIpYCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0XCIsIG51bGwsIG5vZGUubW9kdWxlLFxuICAgICAgICBub2RlLm5hbWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiSW1wb3J0XCIsIFwiSW1wb3J0RnJvbVwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yYWlzZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmV4YywgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJhaXNlXCI7IiwiZXhwb3J0IGNsYXNzIFB5dGhvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgcmVhZG9ubHkgcHl0aG9uX2V4Y2VwdGlvbjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHl0aG9uX2V4Y2VwdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHB5dGhvbl9leGNlcHRpb24uX3Jhd19lcnJfID0gdGhpcztcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNiBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOCBmcm9tIFwiLi9vcGVyYXRvcnMvRmxvb3JEaXYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL0Zsb29yRGl2L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vb3BlcmF0b3JzL0Rpdi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9vcGVyYXRvcnMvRGl2L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL29wZXJhdG9ycy89PS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzExIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9vcGVyYXRvcnMvLS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTIgZnJvbSBcIi4vb3BlcmF0b3JzLy0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy8rL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL29wZXJhdG9ycy8qL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNCBmcm9tIFwiLi9vcGVyYXRvcnMvKi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE2IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xOSBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yMCBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIxIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzIyIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMyBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNCBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI0IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNSBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI1IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yNSBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI2IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI2IGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI3IGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI4IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzAgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzEgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMzIGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM0IGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzM2IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zNiBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLmF0dHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwib3BlcmF0b3JzLltdXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfN1xuXHR9LFxuXHRcIm9wZXJhdG9ycy5GbG9vckRpdlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzhcblx0fSxcblx0XCJvcGVyYXRvcnMuRGl2XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcIm9wZXJhdG9ycy49PVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwib3BlcmF0b3JzLi1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTJcblx0fSxcblx0XCJvcGVyYXRvcnMuK1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xM1xuXHR9LFxuXHRcIm9wZXJhdG9ycy4qXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE2XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nL0Zvcm1hdHRlZFZhbHVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE5XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMFxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjFcblx0fSxcblx0XCJrZXl3b3Jkcy5yYWlzZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMlxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydC9hbGlhc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNVxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjZcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay90cnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzBcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMzXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNFxuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM1XG5cdH0sXG5cdFwiY2xhc3MuY2xhc3NkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzZcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjIpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI1KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yOSk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCIke1wiLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvcm1hdHRlZFZhbHVlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFwic3RyXCIpIHtcblxuICAgICAgICAgICAgLy8gaDRja1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgICAgICAgICBlbmQ6IG51bGwgYXMgYW55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLnZhbHVlLCBjdXJzb3IpO1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlID09PSBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBcImZsb2F0XCIsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfW5gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCBcImludFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbnR5cGUgU1R5cGVTdWJzID0ge1xuICAgIHR5cGUgICAgICAgPzogc3RyaW5nLFxuICAgIHN1YnN0aXR1dGUgPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnlcbn07XG50eXBlIFNUeXBlRmN0U3VicyA9IHtcbiAgICB0eXBlICAgICAgID86IHN0cmluZywgLy8gb3IgbWFueSB0eXBlcy4uLiBbXVxuICAgIHN1YnN0aXR1dGUgPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksXG4gICAgcmV0dXJuX3R5cGUgOiAoLi4uYXJnczogc3RyaW5nW10pID0+IHN0cmluZyAvLyBmb3IgbWV0aG9kcy9mdW5jdGlvbnMuLi5cbn07XG50eXBlIFNUeXBlID0gc3RyaW5nIHwgU1R5cGVTdWJzIHwgU1R5cGVGY3RTdWJzO1xudHlwZSBTVHlwZU9iaiA9IFJlY29yZDxzdHJpbmcsIFNUeXBlPjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX05PVF9JTVBMRU1FTlRFRCA9IFwiTm90SW1wbGVtZW50ZWRUeXBlXCI7XG5cbmNvbnN0IEJpbmFyeU9wZXJhdG9ycyA9IHtcbiAgICAnX19hZGRfXyc6ICdfX3JhZGRfXydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tbXV0YXRpdmVfb3BlcmF0b3JzKHR5cGU6IFNUeXBlT2JqLCAuLi5vcHM6KGtleW9mIHR5cGVvZiBCaW5hcnlPcGVyYXRvcnMpW10pIHtcbiAgICBmb3IobGV0IG9wIG9mIG9wcykge1xuXG4gICAgICAgIGNvbnN0IHN0eXBlX29wID0gdHlwZVtvcF07XG5cbiAgICAgICAgY29uc3Qgcm9wID0gQmluYXJ5T3BlcmF0b3JzW29wXTtcbiAgICAgICAgdHlwZVtyb3BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGU6IChhKSA9PiAoc3R5cGVfb3AgYXMgU1R5cGVGY3RTdWJzKS5yZXR1cm5fdHlwZShhKSxcbiAgICAgICAgICAgIHN1YnN0aXR1dGU6IChzZWxmLCBvKSA9PiAoc3R5cGVfb3AgYXMgU1R5cGVGY3RTdWJzKS5zdWJzdGl0dXRlIShvLCBzZWxmKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBiaW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBvcDogc3RyaW5nLCBiOiBBU1ROb2RlKSB7XG5cbiAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgIChiIGFzIGFueSkucGFyZW50X29wID0gb3A7XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke2F9JHtvcH0ke2J9YDtcblxuICAgIC8vIFRPRE8ganMgb3AgcHJpb3JpdHkgb3JkZXIuLi5cbiAgICBpZiggXCJwYXJlbnRfb3BcIiBpbiBub2RlIClcbiAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5jb25zdCBTVHlwZV9pbnQgPSB7XG4gICAgX19hZGRfXyA6ICB7XG4gICAgICAgIHJldHVybl90eXBlOiAobykgPT4ge1xuICAgICAgICAgICAgaWYoIG8gPT09ICdpbnQnKVxuICAgICAgICAgICAgICAgIHJldHVybiAnaW50JztcblxuICAgICAgICAgICAgcmV0dXJuIFNUeXBlX05PVF9JTVBMRU1FTlRFRDsgLy8gY2FuJ3QgYmUgdXNlZC5cbiAgICAgICAgfSxcbiAgICAgICAgc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCAnKycsIG8pO1xuICAgICAgICB9XG4gICAgfVxufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmNvbW11dGF0aXZlX29wZXJhdG9ycyhTVHlwZV9pbnQsICdfX2FkZF9fJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2ludDsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIGlmKCB0aGlzLnZhbHVlWzBdID09PSAnXCInKVxuICAgICAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuICAgIHJldHVybiB0b0pTKHJgXCIke3RoaXMudmFsdWV9XCJgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuc3RyXCIsIFwic3RyXCIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgOiBhbnkgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodDogYW55ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGlmKCBsZWZ0LnJlc3VsdF90eXBlICE9PSByaWdodC5yZXN1bHRfdHlwZSApIHtcbiAgICAgICAgaWYoIGxlZnQucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICAgICAgbGVmdCA9IHJgTnVtYmVyKCR7bGVmdH0pYDtcbiAgICAgICAgaWYoIHJpZ2h0LnJlc3VsdF90eXBlID09PSAnaW50JylcbiAgICAgICAgICAgIHJpZ2h0ID0gcmBOdW1iZXIoJHtyaWdodH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7bGVmdH0gKiAke3JpZ2h0fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gcmlnaHQucmVzdWx0X3R5cGUpXG4gICAgICAgIHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLipcIiwgdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wLk11bHRcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCBTVHlwZV9pbnQsIHsgcmV2ZXJzZWRfb3BlcmF0b3IsIFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5jb25zdCBuYW1lMlNUeXBlID0ge1xuICAgIFwiaW50XCI6IFNUeXBlX2ludFxufVxudHlwZSBTVHlwZU5hbWUgPSBrZXlvZiB0eXBlb2YgbmFtZTJTVHlwZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgY29uc3Qgb3AgPSBcIl9fYWRkX19cIjsgLy9UT0RPIGZpbmQgYnkgbm9kZSBuYW1lLi4uXG5cbiAgICBjb25zb2xlLndhcm4obGVmdC5yZXN1bHRfdHlwZSk7XG4gICAgbGV0IG1ldGhvZCA9IG5hbWUyU1R5cGVbbGVmdC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWVdW29wXTtcblxuICAgIC8vVE9ETzogcmV2ZXJzZSBkdXJpbmcgQVNUQ29udmVyc2lvbiArIHNldCB0eXBlIGR1cmluZyBBU1RDb252ZXJzaW9uXG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISkgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICBjb25zdCByb3AgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGVbcmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lXVtyb3BdO1xuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcblxuICAgICAgICBpZiggbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnR5cGUpID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05PVCBJTVBMRU1FTlRFRCEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLnN1YnN0aXR1dGUodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgaWYoIGxlZnQucmVzdWx0X3R5cGUgPT09IHJpZ2h0LnJlc3VsdF90eXBlKVxuICAgICAgICB0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4rXCIsIHR5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcC5BZGRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSAtICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgaWYoIGxlZnQucmVzdWx0X3R5cGUgPT09IHJpZ2h0LnJlc3VsdF90eXBlKVxuICAgICAgICB0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4tXCIsIHR5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcC5TdWJcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoXCIoaW5pdClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKFwidmFyIFwiLCBjdXJzb3IpO1xuXG4gICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKVxuICAgICAgICBqcyArPSB0b0pTKHJgID0gJHt0aGlzLmNoaWxkcmVuW2ldfWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB0eXBlID0gXCJvcGVyYXRvcnMuPVwiO1xuXG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgbGV0IHJpZ2h0X3R5cGU6IHN0cmluZ3xudWxsID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgaWYoIFwiYW5ub3RhdGlvblwiIGluIG5vZGUpIHtcbiAgICAgICAgcmlnaHRfdHlwZSA9IG5vZGUuYW5ub3RhdGlvbi5pZCA/PyBcIk5vbmVcIjtcbiAgICAgICAgaWYoIHJpZ2h0LnJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0LnJlc3VsdF90eXBlICE9PSByaWdodF90eXBlKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgfVxuXG4gICAgY29uc3QgaXNNdWx0aVRhcmdldCA9IFwidGFyZ2V0c1wiIGluIG5vZGU7XG4gICAgY29uc3QgdGFyZ2V0cyA9IGlzTXVsdGlUYXJnZXQgPyBub2RlLnRhcmdldHMgOiBbbm9kZS50YXJnZXRdO1xuXG4gICAgY29uc3QgbGVmdHMgPSB0YXJnZXRzLm1hcCggKG46YW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobiwgY29udGV4dCApO1xuXG4gICAgICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcbiAgICBcbiAgICAgICAgICAgIC8vIGlmIGV4aXN0cywgZW5zdXJlIHR5cGUuXG4gICAgICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV07XG4gICAgICAgICAgICAgICAgaWYoIHJlc3VsdF90eXBlICE9PSBudWxsICYmIHJpZ2h0X3R5cGUgIT09IHJlc3VsdF90eXBlKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBhbm5vdGF0aW9uX3R5cGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC50eXBlICE9PSBcImNsYXNzXCIpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgICAgICAgICAgdHlwZSArPSBcIihpbml0KVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgcmlnaHRfdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgLi4ubGVmdHMsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgLy9UT0RPOiBiZXR0ZXIuLi5cbiAgICBsZXQgb3AgPSBcIj09XCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aCgnKGlzKScpIClcbiAgICAgICAgb3AgPSBcIj09PVwiO1xuXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSAke29wfSAke3RoaXMuY2hpbGRyZW5bMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5jb21wYXJhdG9yc1swXSwgY29udGV4dCk7XG5cbiAgICBpZihsZWZ0LnJlc3VsdF90eXBlID09PSBudWxsIHx8IHJpZ2h0LnJlc3VsdF90eXBlID09PSBudWxsKSB7XG4gICAgICAgIC8vVE9ETzogb2JqZWN0IHJlc3VsdF90eXBlIHRvby4uLlxuICAgICAgICAvL3Rocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICAvL1RPRE9cbiAgICBsZXQgc3VmZml4ID0gJyc7XG4gICAgaWYoIG5vZGUub3BzWzBdLmNvbnN0cnVjdG9yLiRuYW1lID09PSBcIklzXCIgKVxuICAgICAgICBzdWZmaXggPSAnKGlzKSdcblxuICAgIGNvbnNvbGUud2Fybihub2RlKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgb3BlcmF0b3JzLj09JHtzdWZmaXh9YCwgXCJib29sXCIsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb21wYXJlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0IDogYW55ID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQ6IGFueSA9IHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gJ2ludCcpXG4gICAgICAgIGxlZnQgPSByYE51bWJlcigke2xlZnR9KWA7IC8vIGRlbGF5ZWQgdG9KUyA/XG4gICAgaWYoIHJpZ2h0LnJlc3VsdF90eXBlID09PSAnaW50JylcbiAgICAgICAgcmlnaHQgPSByYE51bWJlcigke3JpZ2h0fSlgO1xuXG4gICAgcmV0dXJuIHRvSlMocmAke2xlZnR9IC8gJHtyaWdodH1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgaWYoIGxlZnQucmVzdWx0X3R5cGUgPT09IHJpZ2h0LnJlc3VsdF90eXBlKVxuICAgICAgICB0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4vXCIsIHR5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcC5EaXZcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSAvICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQgLCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgaWYoIGxlZnQucmVzdWx0X3R5cGUgPT09IHJpZ2h0LnJlc3VsdF90eXBlKVxuICAgICAgICB0eXBlID0gbGVmdC5yZXN1bHRfdHlwZTtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4vXCIsIHR5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCaW5PcC5GbG9vckRpdlwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfVske3RoaXMuY2hpbGRyZW5bMV19XWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy5bXVwiLCBudWxsLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCksXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5zbGljZSwgY29udGV4dClcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiU3Vic2NyaXB0XCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19LiR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmF0dHJcIiwgbnVsbCwgbm9kZS5hdHRyLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXR0cmlidXRlXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgXCJOb25lXCIsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIk9iamVjdC5mcmVlemUoW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXSlcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJztcblxuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3ZhbHVlXTtcbiAgICBlbHNlIGlmKHZhbHVlIGluIF9yXykge1xuICAgICAgICBpZiggaXNDbGFzcyhfcl9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7dmFsdWV9YDtcblxuICAgICAgICB2YWx1ZSA9IGBfcl8uJHt2YWx1ZX1gO1xuICAgIH1cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IG5hbWUgPSBicnl0aG9uX25vZGUuc2JyeXRob25fdHlwZSA/PyBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG5cbiAgICBpZihuYW1lID09PSAnQmluT3AnKVxuICAgICAgICBuYW1lID0gYEJpbk9wLiR7YnJ5dGhvbl9ub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lfWA7XG5cbiAgICByZXR1cm4gbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYoICEobmFtZSBpbiBtb2R1bGVzKSApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBtb2R1bGUgb2YgbW9kdWxlc1tuYW1lXSkgeyBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IF9hcmdzID0gbm9kZS5hcmdzLmFyZ3M7XG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuXG4gICAgY29uc3QgYXJncyA9IF9hcmdzLm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2FyZyhtLCBjb250ZXh0KSApOyAvL1RPRE8uLi5cbiAgICBcbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gbm9kZS5hcmdzLmFyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBub2RlLmFyZ3MuYXJnc1tub2RlLmFyZ3MuYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiYXJnXCIsIG5vZGUuYW5ub3RhdGlvbj8uaWQsIG5vZGUuYXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rwb3Mobm9kZTogYW55W10pIHtcblxuICAgIGxldCBiZWcgPSBub2RlWzBdO1xuICAgIGxldCBlbmQgPSBub2RlW25vZGUubGVuZ3RoLTFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9saW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgLy9jb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIGxpbmVubyA6IGJlZy5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3ZhcmlhYmxlcyA9IHBhcmVudF9jb250ZXh0ID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShudWxsKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF92YXJpYWJsZXN9XG4gICAgfVxuICAgIHR5cGU7XG4gICAgbG9jYWxfdmFyaWFibGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmd8bnVsbD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQoKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheShhc3QuYm9keS5sZW5ndGgpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3QuYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICAvL1RPRE86IGRldGVjdCBjb21tZW50c1xuICAgICAgICByZXN1bHRbaV0gPSBjb252ZXJ0X2xpbmUoYXN0LmJvZHlbaV0sIGNvbnRleHQpO1xuXG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHRbaV0udHlwZSk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbnR5cGUgQ3Vyc29yID0ge1xuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGxpbmUgIDogbnVtYmVyLFxuICAgIGxpbmVfb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3Qgbm9kZXMgPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcblxuICAgIGxldCBjdXJzb3IgPSB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgbGluZV9vZmZzZXQgOiAwXG4gICAgfTtcblxuICAgIGxldCBjaGFyO1xuICAgIGRvIHtcbiAgICAgICAgbm9kZXMucHVzaCggcGFyc2VFeHByZXNzaW9uKGNvZGUsIGN1cnNvcikgYXMgYW55KTtcbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgICAgIHdoaWxlKCBjaGFyID09PSAnXFxuJyApIHtcbiAgICAgICAgICAgIGNoYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0gY3Vyc29yLm9mZnNldDtcblxuICAgIH0gd2hpbGUoIGNoYXIgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgLy9jb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHQvL2NvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2NvbnZlcnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTeW1ib2woY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJ2EnICYmIGNhciA8PSAneicgfHwgY2FyID49ICdBJyAmJiBjYXIgPD0gJ1onIHx8IGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyB8fCBjYXIgPT0gJ18nIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KTtcblxuICAgIC8vVE9ETzogaWYga2V5d29yZC4uLlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwic3ltYm9sXCIsXG4gICAgICAgIHZhbHVlICAgOiBzeW1ib2wsIC8vVE9ETzogY2YgY29udmVydCAoc2VhcmNoIGluIGxvY2FsIHZhcmlhYmxlcy9Db250ZXh0Li4uKVxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19jb252ZXJ0XG4gICAgfTtcbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19pbnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIC8vVE9ETzogcmVhbC4uLlxuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5pbnRcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfaW50LFxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19zdHIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJ1wiJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgICsrY3Vyc29yLm9mZnNldDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5zdHJpbmdcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfc3RyLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG5cbiAgICBsZXQgbGVmdCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICBpZiggY2hhciA9PT0gJ1xcbicpXG4gICAgICAgIHJldHVybiBsZWZ0O1xuXG4gICAgbGV0IG9wID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIG9wIS5jaGlsZHJlblswXSA9IGxlZnQ7XG4gICAgb3AucHljb2RlLnN0YXJ0ID0gbGVmdC5weWNvZGUuc3RhcnQ7XG5cbiAgICBsZXQgdmFsdWVzID0gW29wLCBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcildO1xuXG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgIT09ICdcXG4nICkge1xuXG4gICAgICAgIGxldCBvcDIgICA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGxldCBvcDEgID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl07XG4gICAgICAgIGxldCBsZWZ0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG5cbiAgICAgICAgLy9UT0RPOiBoYW5kbGUgb3AgcHJpb3JpdHkuLi5cbiAgICAgICAgLy8gKGErYikrY1xuXG4gICAgICAgIC8vIChhK2IpXG4gICAgICAgIG9wMSEuY2hpbGRyZW5bMV0gPSBsZWZ0O1xuICAgICAgICBvcDEhLnB5Y29kZS5lbmQgID0gbGVmdC5weWNvZGUuZW5kOyBcblxuICAgICAgICAvLyAoKStjXG4gICAgICAgIG9wMiEuY2hpbGRyZW5bMF0gPSBvcDE7XG4gICAgICAgIG9wMi5weWNvZGUuc3RhcnQgPSBvcDEucHljb2RlLnN0YXJ0O1xuXG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdID0gb3AyO1xuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXSA9IHJpZ2h0O1xuXG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIH1cblxuICAgIHZhbHVlc1swXSEuY2hpbGRyZW5bMV0gPSB2YWx1ZXNbMV07XG4gICAgdmFsdWVzWzBdIS5weWNvZGUuZW5kICA9IHZhbHVlc1sxXS5weWNvZGUuZW5kO1xuXG4gICAgcmV0dXJuIHZhbHVlc1swXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRvcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXQrK107XG4gICAgLypcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTsqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwib3BlcmF0b3JzLlwiICsgY2hhcixcbiAgICAgICAgdmFsdWUgICA6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBDT1JFX01PRFVMRVNbXCJvcGVyYXRvcnMuXCIgKyBjaGFyXS5BU1QySlMsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VuKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgKVxuICAgICAgICBjaGFyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIC8vIGlnbm9yZSBjaGFyXG4gICAgaWYoIGNoYXIgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gbnVsbFxuICAgIGlmKCBjaGFyID09PSAnXCInKVxuICAgICAgICBub2RlID0gcGFyc2VTdHJpbmcoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICdhJyAmJiBjaGFyIDw9ICd6JyB8fCBjaGFyID49ICdBJyAmJiBjaGFyIDw9ICdaJyB8fCBjaGFyID09ICdfJyApXG4gICAgICAgIG5vZGUgPSBwYXJzZVN5bWJvbChjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBub2RlID0gcGFyc2VOdW1iZXIoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUgPSBwYXJzZU9wZXJhdG9yKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIC8vOyB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoZW4gcGFyc2luZyAke2NoYXJ9IGF0ICR7Y3Vyc29yLmxpbmV9OiR7Y3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldH0gKCR7Y3Vyc29yLm9mZnNldH0pYCk7XG5cbiAgICBub2RlLnB5Y29kZSA9IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UT0RPOiBpcyBuZXh0IGFuIG9wZXJhdG9yID8gLT4gY29uc3RydWlyZSBhcmJyZS4uLlxuICAgIC8vVE9ETyBoYW5kbGUgb3BlcmF0b3JzID9cblxuICAgIHJldHVybiBub2RlO1xuXG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IHtfYl8sIF9yX307XG5cbi8vIGNsYXNzZSA/XG5cblxuZXhwb3J0IGNsYXNzIFNCcnl0aG9uIHtcblxuICAgICNyZWdpc3RlcmVkX0FTVDogUmVjb3JkPHN0cmluZywgQVNUPiA9IHt9O1xuICAgICNleHBvcnRlZDogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pj4gPSB7XG4gICAgICAgIGJyb3dzZXI6IGdsb2JhbFRoaXNcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBydW5BU1QoKSA/XG4gICAgLy9UT0RPOiBydW5QeXRob25Db2RlKCkgP1xuXG4gICAgLy9UT0RPOiBzb21laG93LCByZW1vdmUgQVNUIGFyZyA/Pz9cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG5cbiAgICAgICAgaWYoYXN0LmZpbGVuYW1lIGluIHRoaXMuI3JlZ2lzdGVyZWRfQVNUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBU1QgJHthc3QuZmlsZW5hbWV9IGFscmVhZHkgcmVnaXN0ZXJlZCFgKTtcblxuICAgICAgICAvL1RPRE86IGZpbGVuYW1lIDIgbW9kdWxlbmFtZS5cbiAgICAgICAgdGhpcy4jcmVnaXN0ZXJlZF9BU1RbYXN0LmZpbGVuYW1lXSA9IGFzdDtcblxuICAgICAgICBjb25zdCBqc19mY3QgPSBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSBqc19mY3QodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5pbnRlcmZhY2UgSUFTVE5vZGUgIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUgaW1wbGVtZW50cyBJQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyBhc3Rub2RlMmpzLCBuZXdsaW5lLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCIuL0FTVE5vZGVcIjtcblxuXG5leHBvcnQgY2xhc3MgQm9keSB7XG5cbiAgICBub2RlO1xuICAgIHByaW50X2JyYWNrZXQ7XG4gICAgaWR4O1xuXG4gICAgY29uc3RydWN0b3Iobm9kZTogQVNUTm9kZSwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5pZHggPSBub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyAvL1RPRE8gc2VhcmNoIGJvZHkuLi5cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5wcmludF9icmFja2V0ID0gcHJpbnRfYnJhY2tldDtcbiAgICB9XG5cbiAgICB0b0pTKGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgaWYodGhpcy5wcmludF9icmFja2V0KVxuICAgICAgICAgICAganMrPVwie1wiO1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5ub2RlLmNoaWxkcmVuW3RoaXMuaWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcbiAgICBcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJvZHkuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IsIDEpO1xuICAgICAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiO1wiLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYodGhpcy5wcmludF9icmFja2V0KSB7XG4gICAgICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMubm9kZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSAxO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGJvZHkuanNjb2RlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge3B5MmFzdCBhcyBweTJhc3RfZmFzdH0gZnJvbSBcIi4vcHkyYXN0X2Zhc3RcIjtcbmV4cG9ydCB7U0JyeXRob24sIF9iXywgX3JffSBmcm9tIFwiLi9ydW50aW1lXCI7XG5cbmV4cG9ydCB7cGFyc2Vfc3RhY2ssIHN0YWNrbGluZTJhc3Rub2RlfSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWVcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsIkJvZHkiLCJhc3QyanMiLCJhc3QiLCJleHBvcnRlZCIsImpzIiwiZmlsZW5hbWUiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsIm5vZGVzIiwiYXN0bm9kZTJqcyIsInR5cGUiLCJwdXNoIiwidmFsdWUiLCJ0b0pTIiwibmV3bGluZSIsImpvaW4iLCJyIiwic3RyIiwiYXJncyIsImxlbmd0aCIsIk9iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJwcmludF9icmFja2V0Iiwic3RhcnQiLCJib2R5IiwiY2hpbGRyZW4iLCJqc2NvZGUiLCJlbmQiLCJhcmdzMmpzIiwiYXJnMmpzIiwiaW5kZW50X2xldmVsIiwiYmFzZV9pbmRlbnQiLCJpbmNsdWRlcyIsImluZGVudCIsInBhZFN0YXJ0IiwiYmFzZSIsIkNvbnRleHQiLCJjb252ZXJ0X2JvZHkiLCJjb252ZXJ0X25vZGUiLCJjb252ZXJ0IiwiY29udGV4dCIsImxvY2FsX3ZhcmlhYmxlcyIsIm5hbWUiLCJiYXNlcyIsIkVycm9yIiwiYnJ5dGhvbl9uYW1lIiwiX2N1cnNvciIsIl9jb250ZXh0IiwiYmVnIiwiaW5jciIsInRhcmdldCIsImlkIiwiaXRlciIsImNvbnN0cnVjdG9yIiwiJG5hbWUiLCJmdW5jIiwibWFwIiwibiIsImtleXdvcmQiLCJvZmZzZXQiLCJsaXN0cG9zIiwiaWZibG9jayIsImNvbmQiLCJ0ZXN0IiwicmVzdWx0X3R5cGUiLCJzYnJ5dGhvbl90eXBlIiwiY3VyIiwib3JlbHNlIiwibGluZW5vIiwiY29sX29mZnNldCIsImFzdG5vZGUiLCJjYyIsInB5Y29kZSIsImhhbmRsZXJzIiwiaGFuZGxlciIsImgiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInNiIiwiZ2V0QVNURm9yIiwic3RhY2syYXN0bm9kZXMiLCJwYXJzZV9zdGFjayIsInNwbGl0IiwiaXNWOCIsImwiLCJfIiwiX2xpbmUiLCJfY29sIiwic2xpY2UiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9yYXdfZXJyXyIsInN0YWNrX3N0ciIsImV4Y2VwdGlvbl9zdHIiLCJsb2ciLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiLCJjb252ZXJ0X2FyZ3MiLCJpc01ldGhvZCIsImFyZyIsImFzc2VydCIsInVuZGVmaW5lZCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJSVU5USU1FXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIkFTVF9DT05WRVJUXzI1IiwiQVNUMkpTXzI1IiwiUlVOVElNRV8yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIkFTVF9DT05WRVJUXzI5IiwiQVNUMkpTXzI5IiwiUlVOVElNRV8yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIkFTVF9DT05WRVJUXzM2IiwiQVNUMkpTXzM2IiwiTU9EVUxFUyIsIkFTVF9DT05WRVJUIiwiQVNUMkpTIiwiUlVOVElNRSIsImFzc2lnbiIsIl9iXyIsIl9fY2xhc3NfXyIsIl9fcXVhbG5hbWVfXyIsImNoaWxkIiwidmFsdWVzIiwiU1R5cGVfTk9UX0lNUExFTUVOVEVEIiwiQmluYXJ5T3BlcmF0b3JzIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJvcCIsImNvbW11dGF0aXZlX29wZXJhdG9ycyIsIm9wcyIsInN0eXBlX29wIiwicm9wIiwicmV0dXJuX3R5cGUiLCJhIiwic3Vic3RpdHV0ZSIsInNlbGYiLCJvIiwiYmluYXJ5X2pzb3AiLCJiIiwicGFyZW50X29wIiwicmVzdWx0IiwiU1R5cGVfaW50IiwiX19hZGRfXyIsImxlZnQiLCJyaWdodCIsIm5hbWUyU1R5cGUiLCJtZXRob2QiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJjb21wYXJhdG9ycyIsInN1ZmZpeCIsImF0dHIiLCJleHByIiwia2V5cyIsImVsdHMiLCJfcl8iLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImJyeXRob25fbm9kZSIsImVycm9yIiwibGluZXMiLCJtIiwiY29udmVydF9saW5lIiwibGFzdCIsInZpcnRfbm9kZSIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsIl9hcmdzIiwiY29udmVydF9hcmciLCJmaXJzdCIsInBhcmVudF9jb250ZXh0IiwiY3JlYXRlIiwibGluZV9vZmZzZXQiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsImFzdDJqc19saXRlcmFsc19pbnQiLCJwYXJzZU51bWJlciIsImFzdDJqc19saXRlcmFsc19zdHIiLCJwYXJzZVN0cmluZyIsInBhcnNlVG9rZW4iLCJvcDIiLCJvcDEiLCJwYXJzZU9wZXJhdG9yIiwiZGVmYXVsdCIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsInJ1bkpTQ29kZSIsImpzX2ZjdCIsIkZ1bmN0aW9uIiwiZ2V0TW9kdWxlcyIsImdldE1vZHVsZSIsIl92YWx1ZSIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==