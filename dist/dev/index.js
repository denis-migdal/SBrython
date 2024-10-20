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
/* harmony import */ var _operators_binary_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./operators/binary/astconvert.ts */ "./src/core_modules/operators/binary/astconvert.ts");
/* harmony import */ var _operators_binary_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./operators/binary/ast2js.ts */ "./src/core_modules/operators/binary/ast2js.ts");
/* harmony import */ var _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./operators/attr/astconvert.ts */ "./src/core_modules/operators/attr/astconvert.ts");
/* harmony import */ var _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./operators/attr/ast2js.ts */ "./src/core_modules/operators/attr/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./operators/[]/astconvert.ts */ "./src/core_modules/operators/[]/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./operators/[]/ast2js.ts */ "./src/core_modules/operators/[]/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./operators/==/astconvert.ts */ "./src/core_modules/operators/==/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./operators/==/ast2js.ts */ "./src/core_modules/operators/==/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
/* harmony import */ var _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./literals/f-string/astconvert.ts */ "./src/core_modules/literals/f-string/astconvert.ts");
/* harmony import */ var _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./literals/f-string/ast2js.ts */ "./src/core_modules/literals/f-string/ast2js.ts");
/* harmony import */ var _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/astconvert.ts */ "./src/core_modules/literals/f-string/FormattedValue/astconvert.ts");
/* harmony import */ var _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./literals/f-string/FormattedValue/ast2js.ts */ "./src/core_modules/literals/f-string/FormattedValue/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./keywords/import/astconvert.ts */ "./src/core_modules/keywords/import/astconvert.ts");
/* harmony import */ var _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./keywords/import/ast2js.ts */ "./src/core_modules/keywords/import/ast2js.ts");
/* harmony import */ var _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./keywords/import/alias/astconvert.ts */ "./src/core_modules/keywords/import/alias/astconvert.ts");
/* harmony import */ var _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./keywords/import/alias/ast2js.ts */ "./src/core_modules/keywords/import/alias/ast2js.ts");
/* harmony import */ var _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./keywords/assert/astconvert.ts */ "./src/core_modules/keywords/assert/astconvert.ts");
/* harmony import */ var _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./keywords/assert/ast2js.ts */ "./src/core_modules/keywords/assert/ast2js.ts");
/* harmony import */ var _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./keywords/assert/runtime.ts */ "./src/core_modules/keywords/assert/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./controlflows/tryblock/runtime.ts */ "./src/core_modules/controlflows/tryblock/runtime.ts");
/* harmony import */ var _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./controlflows/tryblock/try/astconvert.ts */ "./src/core_modules/controlflows/tryblock/try/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./controlflows/tryblock/try/ast2js.ts */ "./src/core_modules/controlflows/tryblock/try/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catchblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./controlflows/tryblock/catchblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catchblock/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./controlflows/tryblock/catch/astconvert.ts */ "./src/core_modules/controlflows/tryblock/catch/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./controlflows/tryblock/catch/ast2js.ts */ "./src/core_modules/controlflows/tryblock/catch/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");
/* harmony import */ var _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./class/classdef/astconvert.ts */ "./src/core_modules/class/classdef/astconvert.ts");
/* harmony import */ var _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./class/classdef/ast2js.ts */ "./src/core_modules/class/classdef/ast2js.ts");





































































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
    "operators.binary": {
        AST_CONVERT: _operators_binary_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _operators_binary_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "operators.attr": {
        AST_CONVERT: _operators_attr_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _operators_attr_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "operators.[]": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    },
    "operators.==": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__["default"]
    },
    "literals.str": {
        AST_CONVERT: _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_24__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_25__["default"]
    },
    "literals.float": {
        AST_CONVERT: _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_26__["default"],
        AST2JS: _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_27__["default"]
    },
    "literals.f-string": {
        AST_CONVERT: _literals_f_string_astconvert_ts__WEBPACK_IMPORTED_MODULE_28__["default"],
        AST2JS: _literals_f_string_ast2js_ts__WEBPACK_IMPORTED_MODULE_29__["default"]
    },
    "literals.f-string/FormattedValue": {
        AST_CONVERT: _literals_f_string_FormattedValue_astconvert_ts__WEBPACK_IMPORTED_MODULE_30__["default"],
        AST2JS: _literals_f_string_FormattedValue_ast2js_ts__WEBPACK_IMPORTED_MODULE_31__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_32__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_33__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_34__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_35__["default"]
    },
    "keywords.raise": {
        AST_CONVERT: _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_36__["default"],
        AST2JS: _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_37__["default"]
    },
    "keywords.import": {
        AST_CONVERT: _keywords_import_astconvert_ts__WEBPACK_IMPORTED_MODULE_39__["default"],
        AST2JS: _keywords_import_ast2js_ts__WEBPACK_IMPORTED_MODULE_40__["default"]
    },
    "keywords.import/alias": {
        AST_CONVERT: _keywords_import_alias_astconvert_ts__WEBPACK_IMPORTED_MODULE_41__["default"],
        AST2JS: _keywords_import_alias_ast2js_ts__WEBPACK_IMPORTED_MODULE_42__["default"]
    },
    "keywords.assert": {
        AST_CONVERT: _keywords_assert_astconvert_ts__WEBPACK_IMPORTED_MODULE_43__["default"],
        AST2JS: _keywords_assert_ast2js_ts__WEBPACK_IMPORTED_MODULE_44__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_46__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_47__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_48__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_49__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_50__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_51__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_52__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_53__["default"]
    },
    "controlflows.tryblock/try": {
        AST_CONVERT: _controlflows_tryblock_try_astconvert_ts__WEBPACK_IMPORTED_MODULE_55__["default"],
        AST2JS: _controlflows_tryblock_try_ast2js_ts__WEBPACK_IMPORTED_MODULE_56__["default"]
    },
    "controlflows.tryblock/catchblock": {
        AST_CONVERT: _controlflows_tryblock_catchblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_57__["default"],
        AST2JS: _controlflows_tryblock_catchblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_58__["default"]
    },
    "controlflows.tryblock/catch": {
        AST_CONVERT: _controlflows_tryblock_catch_astconvert_ts__WEBPACK_IMPORTED_MODULE_59__["default"],
        AST2JS: _controlflows_tryblock_catch_ast2js_ts__WEBPACK_IMPORTED_MODULE_60__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_61__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_62__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_63__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_64__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_65__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_66__["default"]
    },
    "class.classdef": {
        AST_CONVERT: _class_classdef_astconvert_ts__WEBPACK_IMPORTED_MODULE_67__["default"],
        AST2JS: _class_classdef_ast2js_ts__WEBPACK_IMPORTED_MODULE_68__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_38__["default"]);
Object.assign(RUNTIME, _keywords_assert_runtime_ts__WEBPACK_IMPORTED_MODULE_45__["default"]);
Object.assign(RUNTIME, _controlflows_tryblock_runtime_ts__WEBPACK_IMPORTED_MODULE_54__["default"]);
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
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('pow', {
        return_type: {
            'float': 'float',
            'int': 'float'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '**', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('mul', {
        return_type: {
            'float': 'float',
            'int': 'float'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('truediv', {
        return_type: {
            'float': 'float',
            'int': 'float'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '/', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('floordiv', {
        return_type: {
            'int': 'int',
            'float': 'int'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Math.floor(${(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '/', b, false)})`;
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('mod', {
        return_type: {
            'float': 'float',
            'int': 'float'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '%', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('add', {
        return_type: {
            'float': 'float',
            'int': 'float'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '+', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('sub', {
        return_type: {
            'float': 'float',
            'int': 'float'
        },
        convert: (a)=>a.result_type === 'int' ? (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.Int2Float)(a) : a,
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.binary_jsop)(node, a, '-', b);
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
    if (this.asFloat && typeof value === "bigint") value = Number(value);
    if (this.asFloat) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.value}`, cursor);
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
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");

const SType_int = {
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('pow', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, a, '**', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('mul', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, a, '*', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('truediv', {
        return_type: {
            'int': 'float'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.Int2Float)(a), '/', (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.Int2Float)(b), false);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('floordiv', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, a, '/', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('mod', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, a, '%', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('add', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, a, '+', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.GenBinaryOperator)('sub', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_0__.binary_jsop)(node, a, '-', b);
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `operators.==${suffix}`, "bool", null, [
        left,
        right
    ]);
}
convert.brython_name = "Compare";


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
/* harmony export */   "default": () => (/* binding */ ast2js),
/* harmony export */   name2SType: () => (/* binding */ name2SType)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core_modules/literals/float/stype */ "./src/core_modules/literals/float/stype.ts");
/* harmony import */ var core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core_modules/literals/int/stype */ "./src/core_modules/literals/int/stype.ts");



const name2SType = {
    "int": core_modules_literals_int_stype__WEBPACK_IMPORTED_MODULE_2__["default"],
    "float": core_modules_literals_float_stype__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function ast2js(cursor) {
    let left = this.children[0];
    let right = this.children[1];
    const method = name2SType[left.result_type][this.value];
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
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ast2js */ "./src/core_modules/operators/binary/ast2js.ts");
/* harmony import */ var structs_SType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! structs/SType */ "./src/structs/SType.ts");
/* harmony import */ var structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! structs/BinaryOperators */ "./src/structs/BinaryOperators.ts");





const bname2pyname = {
    "Pow": "__pow__",
    "Mult": "__mul__",
    "Div": "__truediv__",
    "FloorDiv": "__floordiv__",
    "Mod": "__mod__",
    "Add": "__add__",
    "Sub": "__sub__"
};
// __floordiv__ and __truediv__
function convert(node, context) {
    let left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context);
    let right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context);
    let op = bname2pyname[node.op.constructor.$name];
    if (op === undefined) {
        console.warn("OP", node.op.constructor.$name);
        throw new Error("not implemented");
    }
    let type = structs_SType__WEBPACK_IMPORTED_MODULE_3__.SType_NOT_IMPLEMENTED;
    let method = _ast2js__WEBPACK_IMPORTED_MODULE_2__.name2SType[left.result_type]?.[op];
    if (method !== undefined) type = method.return_type(right.result_type);
    // try reversed operator
    if (type === structs_SType__WEBPACK_IMPORTED_MODULE_3__.SType_NOT_IMPLEMENTED) {
        op = (0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_4__.reversed_operator)(op);
        method = _ast2js__WEBPACK_IMPORTED_MODULE_2__.name2SType[right.result_type][op];
        [left, right] = [
            right,
            left
        ];
        type = method.return_type(right.result_type);
        if (type === structs_SType__WEBPACK_IMPORTED_MODULE_3__.SType_NOT_IMPLEMENTED) throw new Error('NOT IMPLEMENTED!');
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
/* harmony export */   BinaryOperators: () => (/* binding */ BinaryOperators),
/* harmony export */   GenBinaryOperator: () => (/* binding */ GenBinaryOperator),
/* harmony export */   Int2Float: () => (/* binding */ Int2Float),
/* harmony export */   JSBinaryOperators: () => (/* binding */ JSBinaryOperators),
/* harmony export */   binary_jsop: () => (/* binding */ binary_jsop),
/* harmony export */   reversed_operator: () => (/* binding */ reversed_operator)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");
/* harmony import */ var _ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var _SType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SType */ "./src/structs/SType.ts");



const BinaryOperators = {
    '__pow__': '__rpow__',
    '__mul__': '__rmul__',
    '__truediv__': '__rtruediv__',
    '__floordiv__': '__rfloordiv__',
    '__mod__': '__rmod__',
    '__add__': '__radd__',
    '__sub__': '__rsub__'
};
// TODO: unary op too...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
const JSBinaryOperators = [
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
    //TODO:
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
1.__abs__()           1.__init__(           1.__rfloordiv__(
1.__add__(            1.__init_subclass__(  1.__rlshift__(
1.__and__(            1.__int__()           1.__rmod__(
1.__bool__()          1.__invert__()        1.__rmul__(
1.__ceil__(           1.__le__(             1.__ror__(
1.__class__(          1.__lshift__(         1.__round__(
1.__delattr__(        1.__lt__(             1.__rpow__(
1.__dir__()           1.__mod__(            1.__rrshift__(
1.__divmod__(         1.__mul__(            1.__rshift__(
1.__doc__             1.__ne__(             1.__rsub__(
1.__eq__(             1.__neg__()           1.__rtruediv__(
1.__float__()         1.__new__(            1.__rxor__(<-
1.__floor__(          1.__or__(             1.__setattr__(
1.__floordiv__(       1.__pos__()           1.__sizeof__()
1.__format__(         1.__pow__(            1.__str__()
1.__ge__(           ->1.__radd__(           1.__sub__(
1.__getattribute__(   1.__rand__(           1.__subclasshook__(
1.__getnewargs__()    1.__rdivmod__(        1.__truediv__(
1.__gt__(             1.__reduce__()        1.__trunc__(
1.__hash__()          1.__reduce_ex__(      1.__xor__(
1.__index__()         1.__repr__()          

*/ function Int2Float(a) {
    if (a.type === 'literals.int') {
        a.asFloat = true;
        return a;
    }
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`Number(${a})`;
}
let JSBinaryOperatorsPriority = {};
for(let i = 0; i < JSBinaryOperators.length; ++i){
    const priority = JSBinaryOperators.length - i;
    for (let op of JSBinaryOperators[i])JSBinaryOperatorsPriority[op] = priority;
}
function reversed_operator(op) {
    return BinaryOperators[op];
}
function binary_jsop(node, a, op, b, check_priority = true) {
    if (a instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        a.parent_op = op;
        a.parent_op_dir = 'left';
    }
    if (b instanceof _ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode) {
        b.parent_op = op;
        b.parent_op_dir = 'right';
    }
    let result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${a}${op}${b}`;
    // TODO js op priority order...
    if (check_priority && "parent_op" in node) {
        let direction = node.parent_op_dir;
        let cur_priority = JSBinaryOperatorsPriority[op];
        let parent_priority = JSBinaryOperatorsPriority[node.parent_op];
        if (parent_priority > cur_priority || parent_priority === cur_priority && direction === 'right') result = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`(${result})`;
    }
    return result;
}
function GenBinaryOperator(name, { call_substitute, return_type, convert = (a)=>a }) {
    return {
        [`__${name}__`]: {
            return_type: (o)=>return_type[o] ?? _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED,
            call_substitute: (node, self, o)=>{
                //TODO conversion
                return call_substitute(node, self, convert(o));
            }
        },
        [`__r${name}__`]: {
            return_type: (o)=>return_type[o] ?? _SType__WEBPACK_IMPORTED_MODULE_2__.SType_NOT_IMPLEMENTED,
            call_substitute: (node, self, o)=>{
                //TODO conversion
                return call_substitute(node, convert(o), self);
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFxQjs7Ozs7OztTQ2IxRDtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFK0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9iaW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvb2JqZWN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JpbmFyeU9wZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JvZHkudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9TVHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZXxCb2R5LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQm9keSApIHtcbiAgICAgICAgcmV0dXJuIHN0ci50b0pTKGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGVcbiAgICAgICAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0ICYmICEgQXJyYXkuaXNBcnJheShzdHIpICkgeyAvLyBmb3IgcHkyYXN0X2Zhc3RcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZihwcmludF9icmFja2V0KVxuICAgICAgICBqcys9XCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgaWYocHJpbnRfYnJhY2tldCkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgfVxuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKVxuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIHJldHVybiB0b0pTKHJgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0gJHtuZXcgQm9keSh0aGlzKX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSAnY2xhc3MuJyArIG5vZGUubmFtZTtcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuYmFzZXMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICBbY29udmVydF9ub2RlKG5vZGUuYmFzZXNbMF0sIGNvbnRleHQpLCBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldXG4gICAgICAgIDogW2NvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIF9jdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGJlZyA6IHN0cmluZ3xBU1ROb2RlICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gPSAke2JlZ307ICR7dGhpcy52YWx1ZX0gPCAke2VuZH07ICR7dGhpcy52YWx1ZX0gKz0gJHtpbmNyfSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGgtMSk7XG5cbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gb2YgdGhpcy5jaGlsZHJlblswXSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7IC8vIGlmL2VsaWYgY29uZGl0aW9uLlxuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YDtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYCwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IEJvZHkodGhpcyk7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRyeSR7Ym9keX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MudHJ5YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS50cnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlPy5zdGFydHNXaXRoKFwiY2xhc3MuXCIpIClcbiAgICAgICAganMrPSB0b0pTKFwibmV3IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19KGAsIGN1cnNvcik7XG5cbiAgICAvL1RPRE86IGFyZ3Mgbm9kZS4uLlxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5mdW5jLCBjb250ZXh0ICksXG4gICAgICAgIC4uLm5vZGUuYXJncy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyBhcmdzMmpzLCBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gJyc7XG4gICAgaWYoICEgdGhpcy50eXBlLmVuZHNXaXRoKFwiKG1ldGgpXCIpIClcbiAgICAgICAganMgKz0gdG9KUygnZnVuY3Rpb24gJywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG5cbiAgICBqcyArPSBhcmdzMmpzKHRoaXMsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhcIntcIiwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgaWYoIGJvZHlbYm9keS5sZW5ndGggLSAxXS50eXBlICE9PSBcImtleXdvcmRzLnJldHVyblwiICkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IFwicmV0dXJuIG51bGw7XCJcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMCkgKyB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYXJncywgY29udmVydF9ib2R5LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IGNvbnZlcnRfYXJncyhub2RlLCBjb250ZXh0KTtcblxuICAgIGNvbnN0IGlzTWV0aG9kID0gY29udGV4dC50eXBlID09PSBcImNsYXNzXCI7ICBcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImZjdFwiLCBjb250ZXh0KTtcbiAgICAvLyBuZXcgY29udGV4dCBmb3IgdGhlIGZ1bmN0aW9uIGxvY2FsIHZhcmlhYmxlc1xuICAgIGNvbnRleHQgPSB7XG4gICAgICAgIC4uLmNvbnRleHRcbiAgICB9XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXMgPSB7Li4uY29udGV4dC5sb2NhbF92YXJpYWJsZXN9O1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAvLyByZXR1cm4gdHlwZS4uLiBub2RlLnJldHVybnMuaWRcblxuICAgIGxldCB0eXBlID0gXCJmdW5jdGlvbnMuZGVmXCI7XG4gICAgaWYoaXNNZXRob2QpXG4gICAgICAgIHR5cGUgKz0gXCIobWV0aClcIjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCBudWxsLCBub2RlLm5hbWUsIFtcbiAgICAgICAgYXJncyxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGdW5jdGlvbkRlZlwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYF9iXy5hc3NlcnQoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJBc3NlcnRcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQXNzZXJ0XCI7IiwiZnVuY3Rpb24gYXNzZXJ0KGNvbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiggY29uZCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHRocm93IG5ldyBFcnJvcignQXNzZXJ0aW9uIGZhaWxlZCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3NlcnRcbn07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLnZhbHVlWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWVbMF0sIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhgJHt0aGlzLnZhbHVlWzBdfTogJHt0aGlzLnZhbHVlWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydC5hbGlhc1wiLCBudWxsLCBbbm9kZS5uYW1lLCBub2RlLmFzbmFtZV0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcImFsaWFzXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuXG4gICAganMgKz0gdG9KUyhcImNvbnN0IHtcIiwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMClcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IgKTtcbiAgICAgICAganMgKz0gdG9KUyggdGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yICk7XG4gICAgfVxuICAgIGpzICs9IHRvSlMoXCJ9ID0gXCIsIGN1cnNvcik7XG4gICAgXG4gICAgaWYodGhpcy52YWx1ZSA9PT0gbnVsbClcbiAgICAgICAganMgKz0gdG9KUyhcIl9fU0JSWVRIT05fXy5nZXRNb2R1bGVzKClcIiwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIGpzICs9IHRvSlMoYF9fU0JSWVRIT05fXy5nZXRNb2R1bGUoXCIke3RoaXMudmFsdWV9XCIpYCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0XCIsIG51bGwsIG5vZGUubW9kdWxlLFxuICAgICAgICBub2RlLm5hbWVzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiSW1wb3J0XCIsIFwiSW1wb3J0RnJvbVwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yYWlzZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmV4YywgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJhaXNlXCI7IiwiZXhwb3J0IGNsYXNzIFB5dGhvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgcmVhZG9ubHkgcHl0aG9uX2V4Y2VwdGlvbjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHl0aG9uX2V4Y2VwdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHB5dGhvbl9leGNlcHRpb24uX3Jhd19lcnJfID0gdGhpcztcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL3JldHVybi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNCBmcm9tIFwiLi9yZXR1cm4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNSBmcm9tIFwiLi9wYXNzL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU181IGZyb20gXCIuL3Bhc3MvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNyBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNyBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzkgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9vcGVyYXRvcnMvPS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMSBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9saXRlcmFscy9pbnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEyIGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNSBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE3IGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzE4IGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOSBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMCBmcm9tIFwiLi9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIxIGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHNcIjtcbmltcG9ydCAgICAgUlVOVElNRV8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIyIGZyb20gXCIuL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjMgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIzIGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNyBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzI5IGZyb20gXCIuL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzEgZnJvbSBcIi4vY29tbWVudHMvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2NvbW1lbnRzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMyIGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMiBmcm9tIFwiLi9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHNcIjtcblxuXG5jb25zdCBNT0RVTEVTID0ge1xuXHRcInN5bWJvbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzBcblx0fSxcblx0XCJzdHJ1Y3RzLnR1cGxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInN0cnVjdHMubGlzdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzJcblx0fSxcblx0XCJzdHJ1Y3RzLmRpY3RcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF81LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU181XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJpbmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJvcGVyYXRvcnMuYXR0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzdcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF84LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU184XG5cdH0sXG5cdFwib3BlcmF0b3JzLj09XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOVxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEwXG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzExXG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTNcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNFxuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nL0Zvcm1hdHRlZFZhbHVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNlxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJrZXl3b3Jkcy5yYWlzZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOVxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydC9hbGlhc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMFxuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMVxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjJcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI1LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay90cnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjZcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI5XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMxXG5cdH0sXG5cdFwiY2xhc3MuY2xhc3NkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzJcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMTgpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzIxKTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yNSk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCIke1wiLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZi1zdHJpbmcuRm9ybWF0dGVkVmFsdWVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvcm1hdHRlZFZhbHVlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFwic3RyXCIpIHtcblxuICAgICAgICAgICAgLy8gaDRja1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgICAgICAgICBlbmQ6IG51bGwgYXMgYW55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLnZhbHVlLCBjdXJzb3IpO1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlID09PSBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgLi4ubm9kZS52YWx1ZXMubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJKb2luZWRTdHJcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAobm9kZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyAhPT0gXCJmbG9hdFwiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mbG9hdFwiLCBcImZsb2F0XCIsIG5vZGUudmFsdWUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBHZW5CaW5hcnlPcGVyYXRvciwgSW50MkZsb2F0IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfZmxvYXQgPSB7XG5cbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcigncG93Jywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydmbG9hdCc6ICdmbG9hdCcsICdpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgY29udmVydDogKGEpID0+IGEucmVzdWx0X3R5cGUgPT09ICdpbnQnID8gSW50MkZsb2F0KGEpIDogYSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqKicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ211bCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnZmxvYXQnOiAnZmxvYXQnLCAnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgIGNvbnZlcnQ6IChhKSA9PiBhLnJlc3VsdF90eXBlID09PSAnaW50JyA/IEludDJGbG9hdChhKSA6IGEsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3RydWVkaXYnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2Zsb2F0JzogJ2Zsb2F0JywgJ2ludCc6ICdmbG9hdCd9LFxuICAgICAgICBjb252ZXJ0OiAoYSkgPT4gYS5yZXN1bHRfdHlwZSA9PT0gJ2ludCcgPyBJbnQyRmxvYXQoYSkgOiBhLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJy8nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdmbG9vcmRpdicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCcsICdmbG9hdCc6ICdpbnQnfSxcbiAgICAgICAgY29udmVydDogKGEpID0+IGEucmVzdWx0X3R5cGUgPT09ICdpbnQnID8gSW50MkZsb2F0KGEpIDogYSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgTWF0aC5mbG9vcigke2JpbmFyeV9qc29wKG5vZGUsIGEsICcvJywgYiwgZmFsc2UpfSlgO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ21vZCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnZmxvYXQnOiAnZmxvYXQnLCAnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgIGNvbnZlcnQ6IChhKSA9PiBhLnJlc3VsdF90eXBlID09PSAnaW50JyA/IEludDJGbG9hdChhKSA6IGEsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnJScsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ2FkZCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnZmxvYXQnOiAnZmxvYXQnLCAnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgIGNvbnZlcnQ6IChhKSA9PiBhLnJlc3VsdF90eXBlID09PSAnaW50JyA/IEludDJGbG9hdChhKSA6IGEsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKycsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3N1YicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnZmxvYXQnOiAnZmxvYXQnLCAnaW50JzogJ2Zsb2F0J30sXG4gICAgICAgIGNvbnZlcnQ6IChhKSA9PiBhLnJlc3VsdF90eXBlID09PSAnaW50JyA/IEludDJGbG9hdChhKSA6IGEsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnLScsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfZmxvYXQ7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICBpZiggKHRoaXMgYXMgYW55KS5hc0Zsb2F0ICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJiaWdpbnRcIiApXG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblxuICAgIGlmKCAodGhpcyBhcyBhbnkpLmFzRmxvYXQgKSAvLyBvcHRpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7ICAgICAgICBcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfW5gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCB2YWx1ZSA9IG5vZGUudmFsdWU7XG5cbiAgICBpZih2YWx1ZS5fX2NsYXNzX18/Ll9fcXVhbG5hbWVfXyA9PT0gXCJpbnRcIilcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZTtcblxuICAgIGlmKCB0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImJpZ2ludFwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuaW50XCIsIFwiaW50XCIsIHZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IGJpbmFyeV9qc29wLCBHZW5CaW5hcnlPcGVyYXRvciwgSW50MkZsb2F0IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsIFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcblxuY29uc3QgU1R5cGVfaW50ID0ge1xuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdwb3cnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqKicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ211bCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyonLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCd0cnVlZGl2Jywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJGbG9hdChhKSwgJy8nLCBJbnQyRmxvYXQoYiksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdmbG9vcmRpdicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJy8nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdtb2QnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICclJywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignYWRkJywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKycsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3N1YicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJy0nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfaW50OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyhyYCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGNvbnN0IGxlZnRzID0gdGFyZ2V0cy5tYXAoIChuOmFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKTtcblxuICAgICAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV0gPSByaWdodF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIC8vVE9ETzogYmV0dGVyLi4uXG4gICAgbGV0IG9wID0gXCI9PVwiO1xuICAgIGlmKCB0aGlzLnR5cGUuZW5kc1dpdGgoJyhpcyknKSApXG4gICAgICAgIG9wID0gXCI9PT1cIjtcblxuICAgIC8vVE9ETyBOb25lIHR5cGUuLi5cbiAgICAvL1RPRE8gc3RyXG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0gJHtvcH0gJHt0aGlzLmNoaWxkcmVuWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUuY29tcGFyYXRvcnNbMF0sIGNvbnRleHQpO1xuXG4gICAgaWYobGVmdC5yZXN1bHRfdHlwZSA9PT0gbnVsbCB8fCByaWdodC5yZXN1bHRfdHlwZSA9PT0gbnVsbCkge1xuICAgICAgICAvL1RPRE86IG9iamVjdCByZXN1bHRfdHlwZSB0b28uLi5cbiAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgLy9UT0RPXG4gICAgbGV0IHN1ZmZpeCA9ICcnO1xuICAgIGlmKCBub2RlLm9wc1swXS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJJc1wiIClcbiAgICAgICAgc3VmZml4ID0gJyhpcyknXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYG9wZXJhdG9ycy49PSR7c3VmZml4fWAsIFwiYm9vbFwiLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29tcGFyZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCBTVHlwZV9mbG9hdCBmcm9tIFwiY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlXCI7XG5pbXBvcnQgU1R5cGVfaW50IGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgY29uc3QgbmFtZTJTVHlwZSA9IHtcbiAgICBcImludFwiICA6IFNUeXBlX2ludCxcbiAgICBcImZsb2F0XCI6IFNUeXBlX2Zsb2F0XG59XG5leHBvcnQgdHlwZSBTVHlwZU5hbWUgPSBrZXlvZiB0eXBlb2YgbmFtZTJTVHlwZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICBsZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgY29uc3QgbWV0aG9kID0gbmFtZTJTVHlwZVtsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZV1bdGhpcy52YWx1ZV07XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LCByaWdodCksIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwiLi9hc3QyanNcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5jb25zdCBibmFtZTJweW5hbWUgPSB7XG4gICAgXCJQb3dcIiA6IFwiX19wb3dfX1wiLFxuXG4gICAgXCJNdWx0XCIgICAgOiBcIl9fbXVsX19cIixcbiAgICBcIkRpdlwiICAgICA6IFwiX190cnVlZGl2X19cIixcbiAgICBcIkZsb29yRGl2XCI6IFwiX19mbG9vcmRpdl9fXCIsXG4gICAgXCJNb2RcIiAgICAgOiBcIl9fbW9kX19cIixcblxuICAgIFwiQWRkXCIgICAgIDogXCJfX2FkZF9fXCIsXG4gICAgXCJTdWJcIiAgICAgOiBcIl9fc3ViX19cIixcbn1cblxuLy8gX19mbG9vcmRpdl9fIGFuZCBfX3RydWVkaXZfX1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZVtsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZV0/LltvcF07XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIG9wID0gcmV2ZXJzZWRfb3BlcmF0b3Iob3ApO1xuICAgICAgICBtZXRob2QgPSBuYW1lMlNUeXBlW3JpZ2h0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZV1bb3BdO1xuICAgICAgICBbbGVmdCwgcmlnaHRdID0gW3JpZ2h0LCBsZWZ0XTtcblxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlKTtcblxuICAgICAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT1QgSU1QTEVNRU5URUQhJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCB0eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgXCJOb25lXCIsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIk9iamVjdC5mcmVlemUoW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXSlcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJztcblxuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3ZhbHVlXTtcbiAgICBlbHNlIGlmKHZhbHVlIGluIF9yXykge1xuICAgICAgICBpZiggaXNDbGFzcyhfcl9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7dmFsdWV9YDtcblxuICAgICAgICB2YWx1ZSA9IGBfcl8uJHt2YWx1ZX1gO1xuICAgIH1cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYoICEobmFtZSBpbiBtb2R1bGVzKSApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBtb2R1bGUgb2YgbW9kdWxlc1tuYW1lXSkgeyBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IF9hcmdzID0gbm9kZS5hcmdzLmFyZ3M7XG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuXG4gICAgY29uc3QgYXJncyA9IF9hcmdzLm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2FyZyhtLCBjb250ZXh0KSApOyAvL1RPRE8uLi5cbiAgICBcbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gbm9kZS5hcmdzLmFyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBub2RlLmFyZ3MuYXJnc1tub2RlLmFyZ3MuYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiYXJnXCIsIG5vZGUuYW5ub3RhdGlvbj8uaWQsIG5vZGUuYXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rwb3Mobm9kZTogYW55W10pIHtcblxuICAgIGxldCBiZWcgPSBub2RlWzBdO1xuICAgIGxldCBlbmQgPSBub2RlW25vZGUubGVuZ3RoLTFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9saW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgLy9jb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIGxpbmVubyA6IGJlZy5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3ZhcmlhYmxlcyA9IHBhcmVudF9jb250ZXh0ID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShudWxsKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF92YXJpYWJsZXN9XG4gICAgfVxuICAgIHR5cGU7XG4gICAgbG9jYWxfdmFyaWFibGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmd8bnVsbD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQoKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheShhc3QuYm9keS5sZW5ndGgpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3QuYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICAvL1RPRE86IGRldGVjdCBjb21tZW50c1xuICAgICAgICByZXN1bHRbaV0gPSBjb252ZXJ0X2xpbmUoYXN0LmJvZHlbaV0sIGNvbnRleHQpO1xuXG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHRbaV0udHlwZSk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbnR5cGUgQ3Vyc29yID0ge1xuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGxpbmUgIDogbnVtYmVyLFxuICAgIGxpbmVfb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3Qgbm9kZXMgPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcblxuICAgIGxldCBjdXJzb3IgPSB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgbGluZV9vZmZzZXQgOiAwXG4gICAgfTtcblxuICAgIGxldCBjaGFyO1xuICAgIGRvIHtcbiAgICAgICAgbm9kZXMucHVzaCggcGFyc2VFeHByZXNzaW9uKGNvZGUsIGN1cnNvcikgYXMgYW55KTtcbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgICAgIHdoaWxlKCBjaGFyID09PSAnXFxuJyApIHtcbiAgICAgICAgICAgIGNoYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0gY3Vyc29yLm9mZnNldDtcblxuICAgIH0gd2hpbGUoIGNoYXIgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgLy9jb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHQvL2NvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2NvbnZlcnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTeW1ib2woY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJ2EnICYmIGNhciA8PSAneicgfHwgY2FyID49ICdBJyAmJiBjYXIgPD0gJ1onIHx8IGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyB8fCBjYXIgPT0gJ18nIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KTtcblxuICAgIC8vVE9ETzogaWYga2V5d29yZC4uLlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwic3ltYm9sXCIsXG4gICAgICAgIHZhbHVlICAgOiBzeW1ib2wsIC8vVE9ETzogY2YgY29udmVydCAoc2VhcmNoIGluIGxvY2FsIHZhcmlhYmxlcy9Db250ZXh0Li4uKVxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19jb252ZXJ0XG4gICAgfTtcbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19pbnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIC8vVE9ETzogcmVhbC4uLlxuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5pbnRcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfaW50LFxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19zdHIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJ1wiJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgICsrY3Vyc29yLm9mZnNldDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5zdHJpbmdcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfc3RyLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG5cbiAgICBsZXQgbGVmdCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICBpZiggY2hhciA9PT0gJ1xcbicpXG4gICAgICAgIHJldHVybiBsZWZ0O1xuXG4gICAgbGV0IG9wID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIG9wIS5jaGlsZHJlblswXSA9IGxlZnQ7XG4gICAgb3AucHljb2RlLnN0YXJ0ID0gbGVmdC5weWNvZGUuc3RhcnQ7XG5cbiAgICBsZXQgdmFsdWVzID0gW29wLCBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcildO1xuXG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgIT09ICdcXG4nICkge1xuXG4gICAgICAgIGxldCBvcDIgICA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGxldCBvcDEgID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl07XG4gICAgICAgIGxldCBsZWZ0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG5cbiAgICAgICAgLy9UT0RPOiBoYW5kbGUgb3AgcHJpb3JpdHkuLi5cbiAgICAgICAgLy8gKGErYikrY1xuXG4gICAgICAgIC8vIChhK2IpXG4gICAgICAgIG9wMSEuY2hpbGRyZW5bMV0gPSBsZWZ0O1xuICAgICAgICBvcDEhLnB5Y29kZS5lbmQgID0gbGVmdC5weWNvZGUuZW5kOyBcblxuICAgICAgICAvLyAoKStjXG4gICAgICAgIG9wMiEuY2hpbGRyZW5bMF0gPSBvcDE7XG4gICAgICAgIG9wMi5weWNvZGUuc3RhcnQgPSBvcDEucHljb2RlLnN0YXJ0O1xuXG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdID0gb3AyO1xuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXSA9IHJpZ2h0O1xuXG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIH1cblxuICAgIHZhbHVlc1swXSEuY2hpbGRyZW5bMV0gPSB2YWx1ZXNbMV07XG4gICAgdmFsdWVzWzBdIS5weWNvZGUuZW5kICA9IHZhbHVlc1sxXS5weWNvZGUuZW5kO1xuXG4gICAgcmV0dXJuIHZhbHVlc1swXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRvcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXQrK107XG4gICAgLypcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTsqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwib3BlcmF0b3JzLlwiICsgY2hhcixcbiAgICAgICAgdmFsdWUgICA6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBDT1JFX01PRFVMRVNbXCJvcGVyYXRvcnMuXCIgKyBjaGFyXS5BU1QySlMsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VuKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgKVxuICAgICAgICBjaGFyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIC8vIGlnbm9yZSBjaGFyXG4gICAgaWYoIGNoYXIgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gbnVsbFxuICAgIGlmKCBjaGFyID09PSAnXCInKVxuICAgICAgICBub2RlID0gcGFyc2VTdHJpbmcoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICdhJyAmJiBjaGFyIDw9ICd6JyB8fCBjaGFyID49ICdBJyAmJiBjaGFyIDw9ICdaJyB8fCBjaGFyID09ICdfJyApXG4gICAgICAgIG5vZGUgPSBwYXJzZVN5bWJvbChjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBub2RlID0gcGFyc2VOdW1iZXIoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUgPSBwYXJzZU9wZXJhdG9yKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIC8vOyB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoZW4gcGFyc2luZyAke2NoYXJ9IGF0ICR7Y3Vyc29yLmxpbmV9OiR7Y3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldH0gKCR7Y3Vyc29yLm9mZnNldH0pYCk7XG5cbiAgICBub2RlLnB5Y29kZSA9IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UT0RPOiBpcyBuZXh0IGFuIG9wZXJhdG9yID8gLT4gY29uc3RydWlyZSBhcmJyZS4uLlxuICAgIC8vVE9ETyBoYW5kbGUgb3BlcmF0b3JzID9cblxuICAgIHJldHVybiBub2RlO1xuXG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IHtfYl8sIF9yX307XG5cbi8vIGNsYXNzZSA/XG5cblxuZXhwb3J0IGNsYXNzIFNCcnl0aG9uIHtcblxuICAgICNyZWdpc3RlcmVkX0FTVDogUmVjb3JkPHN0cmluZywgQVNUPiA9IHt9O1xuICAgICNleHBvcnRlZDogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pj4gPSB7XG4gICAgICAgIGJyb3dzZXI6IGdsb2JhbFRoaXNcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBydW5BU1QoKSA/XG4gICAgLy9UT0RPOiBydW5QeXRob25Db2RlKCkgP1xuXG4gICAgLy9UT0RPOiBzb21laG93LCByZW1vdmUgQVNUIGFyZyA/Pz9cbiAgICBydW5KU0NvZGUoanNjb2RlOiBzdHJpbmcsIGFzdDogQVNUKSB7XG5cbiAgICAgICAgaWYoYXN0LmZpbGVuYW1lIGluIHRoaXMuI3JlZ2lzdGVyZWRfQVNUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBU1QgJHthc3QuZmlsZW5hbWV9IGFscmVhZHkgcmVnaXN0ZXJlZCFgKTtcblxuICAgICAgICAvL1RPRE86IGZpbGVuYW1lIDIgbW9kdWxlbmFtZS5cbiAgICAgICAgdGhpcy4jcmVnaXN0ZXJlZF9BU1RbYXN0LmZpbGVuYW1lXSA9IGFzdDtcblxuICAgICAgICBjb25zdCBqc19mY3QgPSBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgICAgIHRoaXMuI2V4cG9ydGVkW2FzdC5maWxlbmFtZV0gPSBqc19mY3QodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5pbnRlcmZhY2UgSUFTVE5vZGUgIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUgaW1wbGVtZW50cyBJQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCwgU1R5cGVGY3RTdWJzLCBTVHlwZU9iaiB9IGZyb20gXCIuL1NUeXBlXCI7XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlPcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX3Jwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX3JtdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX3J0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19yZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX3Jtb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19yYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX3JzdWJfXycsXG59XG5cbi8vIFRPRE86IHVuYXJ5IG9wIHRvby4uLlxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9PcGVyYXRvcnMvT3BlcmF0b3JfcHJlY2VkZW5jZSN0YWJsZVxuZXhwb3J0IGNvbnN0IEpTQmluYXJ5T3BlcmF0b3JzID0gW1xuICAgIFsnKionXSwgLy8gcmlnaHQgdG8gbGVmdCAhXG4gICAgWycqJywgJy8nLCAnJSddLCAvLyBQeXRob24gYWxzbyBoYXMgLy9cbiAgICBbJysnLCAnLSddLFxuXG4gICAgLy9UT0RPOlxuICAgIFsnPDwnLCAnPj4nLCAnPj4+J10sXG4gICAgWyc8JywgJzw9JywgJz49JywgJz4nXSxcbiAgICBbJz09JywgJyE9JywgJz09PScsICchPT0nXSxcbiAgICBbJyYnXSxcbiAgICBbJ14nXSxcbiAgICBbJ3wnXSxcbiAgICBbJyYmJ10sXG4gICAgWyd8fCcsICc/PyddLFxuICAgIFsnPSddIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICAvLyBldGMuXG5dO1xuXG5cbi8qXG4xLl9fYWJzX18oKSAgICAgICAgICAgMS5fX2luaXRfXyggICAgICAgICAgIDEuX19yZmxvb3JkaXZfXyhcbjEuX19hZGRfXyggICAgICAgICAgICAxLl9faW5pdF9zdWJjbGFzc19fKCAgMS5fX3Jsc2hpZnRfXyhcbjEuX19hbmRfXyggICAgICAgICAgICAxLl9faW50X18oKSAgICAgICAgICAgMS5fX3Jtb2RfXyhcbjEuX19ib29sX18oKSAgICAgICAgICAxLl9faW52ZXJ0X18oKSAgICAgICAgMS5fX3JtdWxfXyhcbjEuX19jZWlsX18oICAgICAgICAgICAxLl9fbGVfXyggICAgICAgICAgICAgMS5fX3Jvcl9fKFxuMS5fX2NsYXNzX18oICAgICAgICAgIDEuX19sc2hpZnRfXyggICAgICAgICAxLl9fcm91bmRfXyhcbjEuX19kZWxhdHRyX18oICAgICAgICAxLl9fbHRfXyggICAgICAgICAgICAgMS5fX3Jwb3dfXyhcbjEuX19kaXJfXygpICAgICAgICAgICAxLl9fbW9kX18oICAgICAgICAgICAgMS5fX3Jyc2hpZnRfXyhcbjEuX19kaXZtb2RfXyggICAgICAgICAxLl9fbXVsX18oICAgICAgICAgICAgMS5fX3JzaGlmdF9fKFxuMS5fX2RvY19fICAgICAgICAgICAgIDEuX19uZV9fKCAgICAgICAgICAgICAxLl9fcnN1Yl9fKFxuMS5fX2VxX18oICAgICAgICAgICAgIDEuX19uZWdfXygpICAgICAgICAgICAxLl9fcnRydWVkaXZfXyhcbjEuX19mbG9hdF9fKCkgICAgICAgICAxLl9fbmV3X18oICAgICAgICAgICAgMS5fX3J4b3JfXyg8LVxuMS5fX2Zsb29yX18oICAgICAgICAgIDEuX19vcl9fKCAgICAgICAgICAgICAxLl9fc2V0YXR0cl9fKFxuMS5fX2Zsb29yZGl2X18oICAgICAgIDEuX19wb3NfXygpICAgICAgICAgICAxLl9fc2l6ZW9mX18oKVxuMS5fX2Zvcm1hdF9fKCAgICAgICAgIDEuX19wb3dfXyggICAgICAgICAgICAxLl9fc3RyX18oKVxuMS5fX2dlX18oICAgICAgICAgICAtPjEuX19yYWRkX18oICAgICAgICAgICAxLl9fc3ViX18oXG4xLl9fZ2V0YXR0cmlidXRlX18oICAgMS5fX3JhbmRfXyggICAgICAgICAgIDEuX19zdWJjbGFzc2hvb2tfXyhcbjEuX19nZXRuZXdhcmdzX18oKSAgICAxLl9fcmRpdm1vZF9fKCAgICAgICAgMS5fX3RydWVkaXZfXyhcbjEuX19ndF9fKCAgICAgICAgICAgICAxLl9fcmVkdWNlX18oKSAgICAgICAgMS5fX3RydW5jX18oXG4xLl9faGFzaF9fKCkgICAgICAgICAgMS5fX3JlZHVjZV9leF9fKCAgICAgIDEuX194b3JfXyhcbjEuX19pbmRleF9fKCkgICAgICAgICAxLl9fcmVwcl9fKCkgICAgICAgICAgXG5cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnQyRmxvYXQoYTogQVNUTm9kZSkge1xuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hc0Zsb2F0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJgTnVtYmVyKCR7YX0pYDtcbn1cblxubGV0IEpTQmluYXJ5T3BlcmF0b3JzUHJpb3JpdHk6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcbmZvcihsZXQgaSA9IDA7IGkgPCBKU0JpbmFyeU9wZXJhdG9ycy5sZW5ndGg7ICsraSkge1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBKU0JpbmFyeU9wZXJhdG9ycy5sZW5ndGggLSBpO1xuICAgIGZvcihsZXQgb3Agb2YgSlNCaW5hcnlPcGVyYXRvcnNbaV0pXG4gICAgICAgIEpTQmluYXJ5T3BlcmF0b3JzUHJpb3JpdHlbb3BdID0gcHJpb3JpdHk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VkX29wZXJhdG9yPFQgZXh0ZW5kcyBrZXlvZiB0eXBlb2YgQmluYXJ5T3BlcmF0b3JzPihvcDogVCkge1xuICAgIHJldHVybiBCaW5hcnlPcGVyYXRvcnNbb3BdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5X2pzb3Aobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZXxhbnksIG9wOiBzdHJpbmcsIGI6IEFTVE5vZGV8YW55LCBjaGVja19wcmlvcml0eSA9IHRydWUpIHtcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9ICdsZWZ0JztcbiAgICB9XG5cbiAgICBpZihiIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYiBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSAncmlnaHQnO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7YX0ke29wfSR7Yn1gO1xuXG4gICAgLy8gVE9ETyBqcyBvcCBwcmlvcml0eSBvcmRlci4uLlxuICAgIGlmKCBjaGVja19wcmlvcml0eSAmJiBcInBhcmVudF9vcFwiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiAgICAgICA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICAgICAgbGV0IGN1cl9wcmlvcml0eSAgICA9IEpTQmluYXJ5T3BlcmF0b3JzUHJpb3JpdHlbb3BdO1xuICAgICAgICBsZXQgcGFyZW50X3ByaW9yaXR5ID0gSlNCaW5hcnlPcGVyYXRvcnNQcmlvcml0eVtub2RlLnBhcmVudF9vcCBhcyBhbnldO1xuXG4gICAgICAgIGlmKCBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgXG4gICAgICAgICAgICB8fCAocGFyZW50X3ByaW9yaXR5ID09PSBjdXJfcHJpb3JpdHkgJiYgZGlyZWN0aW9uID09PSAncmlnaHQnIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbnR5cGUgR2VuQmluYXJ5T3BlcmF0b3JfT3B0cyA9IHtcbiAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlKSA9PiBhbnksXG4gICAgcmV0dXJuX3R5cGUgICAgOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgIGNvbnZlcnQgICAgICAgPzogKGE6IEFTVE5vZGUpID0+IGFueVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2VuQmluYXJ5T3BlcmF0b3IobmFtZTogc3RyaW5nLCB7XG4gICAgY2FsbF9zdWJzdGl0dXRlLFxuICAgIHJldHVybl90eXBlLFxuICAgIGNvbnZlcnQgPSAoYTogQVNUTm9kZSkgPT4gYVxufTogR2VuQmluYXJ5T3BlcmF0b3JfT3B0cykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2BfXyR7IG5hbWV9X19gXToge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGU6IChvOiBzdHJpbmcpID0+IHJldHVybl90eXBlW29dID8/IFNUeXBlX05PVF9JTVBMRU1FTlRFRCxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAvL1RPRE8gY29udmVyc2lvblxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsX3N1YnN0aXR1dGUobm9kZSwgc2VsZiwgY29udmVydChvKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbYF9fciR7bmFtZX1fX2BdOiB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZTogKG86IHN0cmluZykgPT4gcmV0dXJuX3R5cGVbb10gPz8gU1R5cGVfTk9UX0lNUExFTUVOVEVELFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vVE9ETyBjb252ZXJzaW9uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBjb252ZXJ0KG8pLCBzZWxmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcIi4vQVNUTm9kZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCb2R5IHtcblxuICAgIG5vZGU7XG4gICAgcHJpbnRfYnJhY2tldDtcbiAgICBpZHg7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBBU1ROb2RlLCBwcmludF9icmFja2V0ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmlkeCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7IC8vVE9ETyBzZWFyY2ggYm9keS4uLlxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLnByaW50X2JyYWNrZXQgPSBwcmludF9icmFja2V0O1xuICAgIH1cblxuICAgIHRvSlMoY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpXG4gICAgICAgICAgICBqcys9XCJ7XCI7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5pZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IpO1xuICAgICAgICAgICAganMgKz0gXCJ9XCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxufSIsIlxuZXhwb3J0IHR5cGUgU1R5cGVTdWJzID0ge1xuICAgIHR5cGUgICAgICAgPzogc3RyaW5nLFxuICAgIHN1YnN0aXR1dGUgPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnlcbn07XG5leHBvcnQgdHlwZSBTVHlwZUZjdFN1YnMgPSB7XG4gICAgdHlwZSAgICAgICAgICAgID86IHN0cmluZywgLy8gb3IgbWFueSB0eXBlcy4uLiBbXVxuICAgIGNhbGxfc3Vic3RpdHV0ZSA/OiAoLi4uYXJnczogYW55W10pID0+IGFueSxcbiAgICByZXR1cm5fdHlwZSAgICAgIDogKC4uLmFyZ3M6IHN0cmluZ1tdKSA9PiBzdHJpbmcgLy8gZm9yIG1ldGhvZHMvZnVuY3Rpb25zLi4uXG59O1xuZXhwb3J0IHR5cGUgU1R5cGUgPSBzdHJpbmcgfCBTVHlwZVN1YnMgfCBTVHlwZUZjdFN1YnM7XG5leHBvcnQgdHlwZSBTVHlwZU9iaiA9IFJlY29yZDxzdHJpbmcsIFNUeXBlPjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX05PVF9JTVBMRU1FTlRFRCA9IFwiTm90SW1wbGVtZW50ZWRUeXBlXCI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQge3B5MmFzdCwgY29udmVydF9hc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiO1xuZXhwb3J0IHtweTJhc3QgYXMgcHkyYXN0X2Zhc3R9IGZyb20gXCIuL3B5MmFzdF9mYXN0XCI7XG5leHBvcnQge1NCcnl0aG9uLCBfYl8sIF9yX30gZnJvbSBcIi4vcnVudGltZVwiO1xuXG5leHBvcnQge3BhcnNlX3N0YWNrLCBzdGFja2xpbmUyYXN0bm9kZX0gZnJvbSBcIi4vY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9ydW50aW1lXCI7Il0sIm5hbWVzIjpbIkFTVE5vZGUiLCJCb2R5IiwiYXN0MmpzIiwiYXN0IiwiZXhwb3J0ZWQiLCJqcyIsImZpbGVuYW1lIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJub2RlcyIsImFzdG5vZGUyanMiLCJ0eXBlIiwicHVzaCIsInZhbHVlIiwidG9KUyIsIm5ld2xpbmUiLCJqb2luIiwiciIsInN0ciIsImFyZ3MiLCJsZW5ndGgiLCJPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJlIiwicyIsImkiLCJib2R5MmpzIiwiaWR4IiwicHJpbnRfYnJhY2tldCIsInN0YXJ0IiwiYm9keSIsImNoaWxkcmVuIiwianNjb2RlIiwiZW5kIiwiYXJnczJqcyIsImFyZzJqcyIsImluZGVudF9sZXZlbCIsImJhc2VfaW5kZW50IiwiaW5jbHVkZXMiLCJpbmRlbnQiLCJwYWRTdGFydCIsImJhc2UiLCJDb250ZXh0IiwiY29udmVydF9ib2R5IiwiY29udmVydF9ub2RlIiwiY29udmVydCIsImNvbnRleHQiLCJsb2NhbF92YXJpYWJsZXMiLCJuYW1lIiwiYmFzZXMiLCJFcnJvciIsImJyeXRob25fbmFtZSIsIl9jdXJzb3IiLCJfY29udGV4dCIsImJlZyIsImluY3IiLCJ0YXJnZXQiLCJpZCIsIml0ZXIiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwiZnVuYyIsIm1hcCIsIm4iLCJrZXl3b3JkIiwib2Zmc2V0IiwibGlzdHBvcyIsImlmYmxvY2siLCJjb25kIiwidGVzdCIsInJlc3VsdF90eXBlIiwic2JyeXRob25fdHlwZSIsImN1ciIsIm9yZWxzZSIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJhc3Rub2RlIiwiY2MiLCJweWNvZGUiLCJoYW5kbGVycyIsImhhbmRsZXIiLCJoIiwiZmlsdGVyX3N0YWNrIiwic3RhY2siLCJmaWx0ZXIiLCJmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zIiwic3RhY2tsaW5lMmFzdG5vZGUiLCJzdGFja2xpbmUiLCJzYiIsImdldEFTVEZvciIsInN0YWNrMmFzdG5vZGVzIiwicGFyc2Vfc3RhY2siLCJzcGxpdCIsImlzVjgiLCJsIiwiXyIsIl9saW5lIiwiX2NvbCIsInNsaWNlIiwiZmN0X25hbWUiLCJwb3MiLCJpbmRleE9mIiwiZGVidWdfcHJpbnRfZXhjZXB0aW9uIiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfcmF3X2Vycl8iLCJzdGFja19zdHIiLCJleGNlcHRpb25fc3RyIiwibG9nIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiY29udmVydF9hcmdzIiwiaXNNZXRob2QiLCJhcmciLCJhc3NlcnQiLCJ1bmRlZmluZWQiLCJhc25hbWUiLCJtb2R1bGUiLCJuYW1lcyIsImV4YyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJBU1RfQ09OVkVSVF8xMiIsIkFTVDJKU18xMiIsIkFTVF9DT05WRVJUXzEzIiwiQVNUMkpTXzEzIiwiQVNUX0NPTlZFUlRfMTQiLCJBU1QySlNfMTQiLCJBU1RfQ09OVkVSVF8xNSIsIkFTVDJKU18xNSIsIkFTVF9DT05WRVJUXzE2IiwiQVNUMkpTXzE2IiwiQVNUX0NPTlZFUlRfMTciLCJBU1QySlNfMTciLCJBU1RfQ09OVkVSVF8xOCIsIkFTVDJKU18xOCIsIlJVTlRJTUVfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJSVU5USU1FXzIxIiwiQVNUX0NPTlZFUlRfMjIiLCJBU1QySlNfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJSVU5USU1FXzI1IiwiQVNUX0NPTlZFUlRfMjYiLCJBU1QySlNfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJBU1RfQ09OVkVSVF8zMCIsIkFTVDJKU18zMCIsIkFTVF9DT05WRVJUXzMxIiwiQVNUMkpTXzMxIiwiQVNUX0NPTlZFUlRfMzIiLCJBU1QySlNfMzIiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJSVU5USU1FIiwiYXNzaWduIiwiX2JfIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiY2hpbGQiLCJ2YWx1ZXMiLCJiaW5hcnlfanNvcCIsIkdlbkJpbmFyeU9wZXJhdG9yIiwiSW50MkZsb2F0IiwiU1R5cGVfZmxvYXQiLCJyZXR1cm5fdHlwZSIsImEiLCJjYWxsX3N1YnN0aXR1dGUiLCJiIiwiYXNGbG9hdCIsIk51bWJlciIsIlNUeXBlX2ludCIsInJpZ2h0IiwicmlnaHRfdHlwZSIsImFubm90YXRpb24iLCJpc011bHRpVGFyZ2V0IiwidGFyZ2V0cyIsImxlZnRzIiwibGVmdCIsIm9wIiwiY29tcGFyYXRvcnMiLCJzdWZmaXgiLCJvcHMiLCJhdHRyIiwibmFtZTJTVHlwZSIsIm1ldGhvZCIsIlNUeXBlX05PVF9JTVBMRU1FTlRFRCIsInJldmVyc2VkX29wZXJhdG9yIiwiYm5hbWUycHluYW1lIiwiZXhwciIsImtleXMiLCJlbHRzIiwiX3JfIiwiaXNDbGFzcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJwcm90b3R5cGUiLCJ3cml0YWJsZSIsIlB5X29iamVjdCIsIlB5X0V4Y2VwdGlvbiIsIlB5X0pTRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiUlVOVElNRV8yIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnZlcnRfYXN0IiwiZ2V0Tm9kZVR5cGUiLCJicnl0aG9uX25vZGUiLCJyZXN1bHQiLCJlcnJvciIsImxpbmVzIiwibSIsImNvbnZlcnRfbGluZSIsImxhc3QiLCJ2aXJ0X25vZGUiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJfYXJncyIsImNvbnZlcnRfYXJnIiwiZmlyc3QiLCJwYXJlbnRfY29udGV4dCIsImNyZWF0ZSIsImxpbmVfb2Zmc2V0IiwiY2hhciIsInBhcnNlRXhwcmVzc2lvbiIsImFzdDJqc19jb252ZXJ0IiwicGFyc2VTeW1ib2wiLCJiZWdpbl9zdHIiLCJjYXIiLCJzeW1ib2wiLCJhc3QyanNfbGl0ZXJhbHNfaW50IiwicGFyc2VOdW1iZXIiLCJhc3QyanNfbGl0ZXJhbHNfc3RyIiwicGFyc2VTdHJpbmciLCJwYXJzZVRva2VuIiwib3AyIiwib3AxIiwicGFyc2VPcGVyYXRvciIsImRlZmF1bHQiLCJTQnJ5dGhvbiIsInJlZ2lzdGVyZWRfQVNUIiwiYnJvd3NlciIsImdsb2JhbFRoaXMiLCJydW5KU0NvZGUiLCJqc19mY3QiLCJGdW5jdGlvbiIsImdldE1vZHVsZXMiLCJnZXRNb2R1bGUiLCJfdmFsdWUiLCJCaW5hcnlPcGVyYXRvcnMiLCJKU0JpbmFyeU9wZXJhdG9ycyIsIkpTQmluYXJ5T3BlcmF0b3JzUHJpb3JpdHkiLCJwcmlvcml0eSIsImNoZWNrX3ByaW9yaXR5IiwicGFyZW50X29wIiwicGFyZW50X29wX2RpciIsImRpcmVjdGlvbiIsImN1cl9wcmlvcml0eSIsInBhcmVudF9wcmlvcml0eSIsIm8iLCJzZWxmIiwicHkyYXN0X2Zhc3QiXSwic291cmNlUm9vdCI6IiJ9