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
    //TODO %
    //TODO...
    // => substitute_call => no *= ?
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
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.floordiv_int(${a},${b})`; // binary_jsop(node, a, '/', b);
        }
    }),
    ...(0,structs_BinaryOperators__WEBPACK_IMPORTED_MODULE_1__.GenBinaryOperator)('mod', {
        return_type: {
            'int': 'int'
        },
        call_substitute: (node, a, b)=>{
            return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`_b_.mod_int(${a}, ${b})`;
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
    floordiv_int: (a, b)=>{
        let result = a / b;
        if (result > 0 || a % b === 0n) return result;
        return --result;
    },
    mod_real: (a, b)=>{
        // @ts-ignore
        return a % b + b * (a < 0 !== b < 0);
    },
    mod_int: (a, b)=>{
        if (a < 0 !== b < 0) return a % b + b;
        // @ts-ignore
        return a % b;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTTtZQUNORSxPQUFPRSxHQUFHLElBQUk7UUFDbEI7UUFFQXdCLEtBQUtFLE1BQU0sR0FBRztZQUNWSCxPQUFPQTtZQUNQSSxLQUFPO2dCQUFDLEdBQUc3QixNQUFNO1lBQUE7UUFDckI7UUFFQSxPQUFPRjtJQUNYO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQy9CTyxNQUFNd1Asd0JBQXdCLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiRTtBQUNKO0FBQ0E7QUFDRTtBQUNBO0FBRTFELGtEQUFrRDtBQUUzQyxTQUFTekksV0FBV2pFLElBQVk7SUFFbkMsTUFBTWlFLGFBQWE7UUFDZixTQUFZaUgseUVBQVdBO1FBQ3ZCLE9BQVlRLHVFQUFTQTtRQUNyQixRQUFZbkIsd0VBQVVBO1FBQ3RCLE9BQVkyQix1RUFBU0E7UUFDckIsWUFBWTlCLHdFQUFVQTtJQUMxQjtJQUVBLE9BQU9uRyxVQUFVLENBQUNqRSxLQUFnQztBQUN0RDs7Ozs7OztTQ25CQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ042QztBQUNiO0FBQ29CO0FBQ1A7QUFFK0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3RyeS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2NhbGwvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvZnVuY3Rpb25zL2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvYXNzZXJ0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9pbXBvcnQvYWxpYXMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvc3R5cGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL3N0eXBlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvPS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9Bc3NpZ25PcC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2JpbmFyeS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9ib29sZWFuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2NvbXBhcmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvY29tcGFyZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvdW5hcnkvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcmV0dXJuL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL2xpc3QvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9saXN0cy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvb2JqZWN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3RfZmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9ydW50aW1lLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JpbmFyeU9wZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0JvZHkudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9TVHlwZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL1NUeXBlcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZXxCb2R5LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQm9keSApIHtcbiAgICAgICAgcmV0dXJuIHN0ci50b0pTKGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGVcbiAgICAgICAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0ICYmICEgQXJyYXkuaXNBcnJheShzdHIpICkgeyAvLyBmb3IgcHkyYXN0X2Zhc3RcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZihwcmludF9icmFja2V0KVxuICAgICAgICBqcys9XCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgaWYocHJpbnRfYnJhY2tldCkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgfVxuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKVxuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIHJldHVybiB0b0pTKHJgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0gJHtuZXcgQm9keSh0aGlzKX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSAnY2xhc3MuJyArIG5vZGUubmFtZTtcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuYmFzZXMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICBbY29udmVydF9ub2RlKG5vZGUuYmFzZXNbMF0sIGNvbnRleHQpLCBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldXG4gICAgICAgIDogW2NvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIF9jdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGJlZyA6IHN0cmluZ3xBU1ROb2RlICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gPSAke2JlZ307ICR7dGhpcy52YWx1ZX0gPCAke2VuZH07ICR7dGhpcy52YWx1ZX0gKz0gJHtpbmNyfSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGgtMSk7XG5cbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gb2YgdGhpcy5jaGlsZHJlblswXSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7IC8vIGlmL2VsaWYgY29uZGl0aW9uLlxuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YDtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYCwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImNhdGNoKF9yYXdfZXJyXyl7XCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAganMrPSB0b0pTKFwiY29uc3QgX2Vycl8gPSBfcmF3X2Vycl8gaW5zdGFuY2VvZiBfYl8uUHl0aG9uRXJyb3JcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI/IF9yYXdfZXJyXy5weXRob25fZXhjZXB0aW9uXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgNCk7XG4gICAganMrPSB0b0pTKFwiOiBuZXcgX3JfLkpTRXhjZXB0aW9uKF9yYXdfZXJyXyk7XCIsIGN1cnNvcik7XG4gICAgICAgIC8vIGRlYnVnXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSB0b0pTKFwiX2JfLmRlYnVnX3ByaW50X2V4Y2VwdGlvbihfZXJyXywgX19TQlJZVEhPTl9fKVwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuXG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgZm9yKGxldCBoYW5kbGVyIG9mIHRoaXMuY2hpbGRyZW4pXG4gICAgICAgIGpzKz0gdG9KUyhoYW5kbGVyLCBjdXJzb3IpO1xuXG4gICAganMrPSB0b0pTKFwiZWxzZXsgdGhyb3cgX3Jhd19lcnJfIH1cIiwgY3Vyc29yKTsgLy9UT0RPLi4uXG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKTtcbiAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuY2F0Y2hibG9ja2AsIG51bGwsIG51bGwsXG4gICAgICAgIG5vZGUuaGFuZGxlcnMubWFwKCAoaDphbnkpID0+IGNvbnZlcnRfbm9kZShoLCBjb250ZXh0KSlcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LmNhdGNoYmxvY2tcIjsiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCJjb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb25cIjtcbmltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IFNCcnl0aG9uIH0gZnJvbSBcInJ1bnRpbWVcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGZpbHRlcl9zdGFjayhzdGFjazogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHN0YWNrLmZpbHRlciggZSA9PiBlLmluY2x1ZGVzKCdicnl0aG9uXycpICk7IC8vVE9ETyBpbXByb3Zlcy4uLlxufVxuXG5cbmZ1bmN0aW9uIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXM6IEFTVE5vZGVbXSwgbGluZTogbnVtYmVyLCBjb2w6IG51bWJlcik6IG51bGx8QVNUTm9kZSB7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmKCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPiBsaW5lXG4gICAgICB8fCBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5zdGFydC5jb2wgPiBjb2wpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIGlmKCAgICBub2Rlc1tpXS5qc2NvZGUhLmVuZC5saW5lID4gbGluZVxuICAgICAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPT09IGxpbmUgJiYgbm9kZXNbaV0uanNjb2RlIS5lbmQuY29sID4gY29sXG4gICAgICApIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3Mobm9kZXNbaV0uY2hpbGRyZW4sIGxpbmUsIGNvbCk7XG4gICAgICAgICAgaWYoIG5vZGUgIT09IG51bGwpXG4gICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsOyAvL3Rocm93IG5ldyBFcnJvcihcIm5vZGUgbm90IGZvdW5kXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhY2tsaW5lMmFzdG5vZGUoc3RhY2tsaW5lOiBTdGFja0xpbmUsIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGUge1xuICBjb25zdCBhc3QgPSBzYi5nZXRBU1RGb3IoXCJzYnJ5dGhvbl9lZGl0b3IuanNcIik7XG4gIHJldHVybiBmaW5kX2FzdG5vZGVfZnJvbV9qc2NvZGVfcG9zKGFzdC5ub2Rlcywgc3RhY2tsaW5lWzFdLCBzdGFja2xpbmVbMl0pITtcbn1cblxuZXhwb3J0IHR5cGUgU3RhY2tMaW5lID0gW3N0cmluZywgbnVtYmVyLCBudW1iZXJdO1xuXG4vL1RPRE86IGNvbnZlcnRcbmV4cG9ydCBmdW5jdGlvbiBzdGFjazJhc3Rub2RlcyhzdGFjazogU3RhY2tMaW5lW10sIHNiOiBTQnJ5dGhvbik6IEFTVE5vZGVbXSB7XG4gIHJldHVybiBzdGFjay5tYXAoIGUgPT4gc3RhY2tsaW5lMmFzdG5vZGUoZSwgc2IpICk7XG59XG5cbi8vVE9ETzogYWRkIGZpbGUuLi5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9zdGFjayhzdGFjazogYW55LCBzYjogU0JyeXRob24pOiBTdGFja0xpbmVbXSB7XG5cblxuICBcbiAgICBzdGFjayA9IHN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgY29uc3QgaXNWOCA9IHN0YWNrWzBdPT09IFwiRXJyb3JcIjsgXG5cbiAgICByZXR1cm4gZmlsdGVyX3N0YWNrKHN0YWNrKS5tYXAoIGwgPT4ge1xuXG4gICAgICBsZXQgW18sIF9saW5lLCBfY29sXSA9IGwuc3BsaXQoJzonKTtcbiAgXG4gICAgICBpZiggX2NvbFtfY29sLmxlbmd0aC0xXSA9PT0gJyknKSAvLyBWOFxuICAgICAgICBfY29sID0gX2NvbC5zbGljZSgwLC0xKTtcbiAgXG4gICAgICBsZXQgbGluZSA9ICtfbGluZSAtIDI7XG4gICAgICBsZXQgY29sICA9ICtfY29sO1xuXG4gICAgICAtLWNvbDsgLy9zdGFydHMgYXQgMS5cblxuICAgICAgbGV0IGZjdF9uYW1lITogc3RyaW5nO1xuICAgICAgaWYoIGlzVjggKSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoXCIgXCIsIDcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoNywgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImV2YWxcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcblxuICAgICAgICAvL1RPRE86IGV4dHJhY3QgZmlsZW5hbWUuXG4gICAgICAgIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBsaW5lLCBjb2wpITtcbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcInN5bWJvbFwiKVxuICAgICAgICAgIGNvbCArPSBub2RlLnZhbHVlLmxlbmd0aDsgLy8gVjggZ2l2ZXMgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzeW1ib2wgbmFtZSB3aGVuIEZGIGdpdmVzIFwiKFwiLi4uXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwb3MgPSBfLmluZGV4T2YoJ0AnKTtcbiAgICAgICAgZmN0X25hbWUgPSBfLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgIGlmKCBmY3RfbmFtZSA9PT0gXCJhbm9ueW1vdXNcIikgLy9UT0RPOiBiZXR0ZXJcbiAgICAgICAgICBmY3RfbmFtZSA9IFwiPG1vZHVsZT5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmY3RfbmFtZSwgbGluZSwgY29sXSBhcyBjb25zdDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVidWdfcHJpbnRfZXhjZXB0aW9uKGVycjogUHlfRXhjZXB0aW9uLCBzYjogU0JyeXRob24pIHtcblxuICAgIGNvbnNvbGUud2FybihcIkV4Y2VwdGlvblwiLCBlcnIpO1xuXG4gICAgY29uc3Qgc3RhY2sgPSBwYXJzZV9zdGFjayggKGVyciBhcyBhbnkpLl9yYXdfZXJyXy5zdGFjaywgc2IpO1xuICAgIGNvbnN0IG5vZGVzID0gc3RhY2syYXN0bm9kZXMoc3RhY2ssIHNiKTtcbiAgICAvL1RPRE86IGNvbnZlcnQgc3RhY2suLi5cbiAgICBjb25zdCBzdGFja19zdHIgPSBzdGFjay5tYXAoIChsLGkpID0+IGBGaWxlIFwiW2ZpbGVdXCIsIGxpbmUgJHtub2Rlc1tpXS5weWNvZGUuc3RhcnQubGluZX0sIGluICR7c3RhY2tbaV1bMF19YCk7XG5cbiAgICBsZXQgZXhjZXB0aW9uX3N0ciA9IFxuYFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KTpcbiAgJHtzdGFja19zdHIuam9pbihgXFxuICBgKX1cbkV4Y2VwdGlvbjogW21zZ11gO1xuXG4gICAgY29uc29sZS5sb2coZXhjZXB0aW9uX3N0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJ1Z19wcmludF9leGNlcHRpb25cbn07IiwiaW1wb3J0IHsgYm9keTJqcywgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IEJvZHkodGhpcyk7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRyeSR7Ym9keX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MudHJ5YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlRyeS50cnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAvL1RPRE86IGltcHJvdmUuLi5cbiAgICBpZiggdGhpcy52YWx1ZSAhPT0gbnVsbCApXG4gICAgICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUuX19pbml0X18uY2FsbF9zdWJzdGl0dXRlKHRoaXMsIC4uLnRoaXMuY2hpbGRyZW4uc2xpY2UoMSkpLCBjdXJzb3IpO1xuXG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlPy5zdGFydHNXaXRoKFwiY2xhc3MuXCIpIClcbiAgICAgICAganMrPSB0b0pTKFwibmV3IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19KGAsIGN1cnNvcik7XG5cbiAgICAvL1RPRE86IGFyZ3Mgbm9kZS4uLlxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvL1RPRE86IGNhbiBiZSBiZXR0ZXJcbiAgICBjb25zdCBrbGFzcyA9IG5hbWUyU1R5cGUobm9kZS5mdW5jLmlkKTtcbiAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgaWYoIGtsYXNzICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0ga2xhc3MuX19pbml0X18ucmV0dXJuX3R5cGUoKTtcbiAgICBcbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgdHlwZSwga2xhc3MsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZnVuYywgY29udGV4dCApLFxuICAgICAgICAuLi5ub2RlLmFyZ3MubWFwKCAoZTphbnkpID0+IGNvbnZlcnRfbm9kZShlLCBjb250ZXh0KSApXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDYWxsXCI7IiwiaW1wb3J0IHsgYXJnczJqcywgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9ICcnO1xuICAgIGlmKCAhIHRoaXMudHlwZS5lbmRzV2l0aChcIihtZXRoKVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoJ2Z1bmN0aW9uICcsIGN1cnNvcik7XG4gICAganMgKz0gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuXG4gICAganMgKz0gYXJnczJqcyh0aGlzLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMoXCJ7XCIsIGN1cnNvcik7XG4gICAganMgKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IsIDEsIGZhbHNlKTtcblxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmNoaWxkcmVuWzFdLmNoaWxkcmVuO1xuICAgIGlmKCBib2R5W2JvZHkubGVuZ3RoIC0gMV0udHlwZSAhPT0gXCJrZXl3b3Jkcy5yZXR1cm5cIiApIHtcbiAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSBcInJldHVybiBudWxsO1wiXG4gICAgfVxuXG4gICAganMgKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApICsgdG9KUyhcIn1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2FyZ3MsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFyZ3MgPSBjb252ZXJ0X2FyZ3Mobm9kZSwgY29udGV4dCk7XG5cbiAgICBjb25zdCBpc01ldGhvZCA9IGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiOyAgXG5cbiAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoXCJmY3RcIiwgY29udGV4dCk7XG4gICAgLy8gbmV3IGNvbnRleHQgZm9yIHRoZSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZXNcbiAgICBjb250ZXh0ID0ge1xuICAgICAgICAuLi5jb250ZXh0XG4gICAgfVxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzID0gey4uLmNvbnRleHQubG9jYWxfdmFyaWFibGVzfTtcbiAgICBmb3IobGV0IGFyZyBvZiBhcmdzLmNoaWxkcmVuKVxuICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1thcmcudmFsdWVdID0gYXJnLnJlc3VsdF90eXBlO1xuXG4gICAgLy8gcmV0dXJuIHR5cGUuLi4gbm9kZS5yZXR1cm5zLmlkXG5cbiAgICBsZXQgdHlwZSA9IFwiZnVuY3Rpb25zLmRlZlwiO1xuICAgIGlmKGlzTWV0aG9kKVxuICAgICAgICB0eXBlICs9IFwiKG1ldGgpXCI7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgdHlwZSwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRnVuY3Rpb25EZWZcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmBfYl8uYXNzZXJ0KCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiQXNzZXJ0XCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudGVzdCwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkFzc2VydFwiOyIsImZ1bmN0aW9uIGFzc2VydChjb25kOiBib29sZWFuKSB7XG4gICAgaWYoIGNvbmQgKVxuICAgICAgICByZXR1cm47XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXNzZXJ0XG59OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy52YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlWzBdLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMoYCR7dGhpcy52YWx1ZVswXX06ICR7dGhpcy52YWx1ZVsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnQuYWxpYXNcIiwgbnVsbCwgW25vZGUubmFtZSwgbm9kZS5hc25hbWVdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJhbGlhc1wiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gXCJcIjtcblxuICAgIGpzICs9IHRvSlMoXCJjb25zdCB7XCIsIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yICk7XG4gICAgICAgIGpzICs9IHRvSlMoIHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvciApO1xuICAgIH1cbiAgICBqcyArPSB0b0pTKFwifSA9IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGlmKHRoaXMudmFsdWUgPT09IG51bGwpXG4gICAgICAgIGpzICs9IHRvSlMoXCJfX1NCUllUSE9OX18uZ2V0TW9kdWxlcygpXCIsIGN1cnNvcik7XG4gICAgZWxzZVxuICAgICAgICBqcyArPSB0b0pTKGBfX1NCUllUSE9OX18uZ2V0TW9kdWxlKFwiJHt0aGlzLnZhbHVlfVwiKWAsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLmltcG9ydFwiLCBudWxsLCBub2RlLm1vZHVsZSxcbiAgICAgICAgbm9kZS5uYW1lcy5tYXAoIChuOmFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkltcG9ydFwiLCBcIkltcG9ydEZyb21cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgdGhyb3cgbmV3IF9iXy5QeXRob25FcnJvcigke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHJlYWRvbmx5IHB5dGhvbl9leGNlcHRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB5dGhvbl9leGNlcHRpb246IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBweXRob25fZXhjZXB0aW9uLl9yYXdfZXJyXyA9IHRoaXM7XG4gICAgICAgIHRoaXMucHl0aG9uX2V4Y2VwdGlvbiA9IHB5dGhvbl9leGNlcHRpb247XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBQeXRob25FcnJvclxufTsiLCJpbXBvcnQgQVNUX0NPTlZFUlRfMCBmcm9tIFwiLi9zeW1ib2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzAgZnJvbSBcIi4vc3ltYm9sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMSBmcm9tIFwiLi9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vc3RydWN0cy9saXN0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zIGZyb20gXCIuL3N0cnVjdHMvZGljdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNCBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzQgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfNSBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzYgZnJvbSBcIi4vb3BlcmF0b3JzL3VuYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy91bmFyeS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF83IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9jb21wYXJlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzggZnJvbSBcIi4vb3BlcmF0b3JzL2Jvb2xlYW4vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9iaW5hcnkvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfOSBmcm9tIFwiLi9vcGVyYXRvcnMvYmluYXJ5L3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMCBmcm9tIFwiLi9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTAgZnJvbSBcIi4vb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMSBmcm9tIFwiLi9vcGVyYXRvcnMvW10vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTIgZnJvbSBcIi4vb3BlcmF0b3JzL0Fzc2lnbk9wL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvQXNzaWduT3AvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEzIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE0IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTQgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNiBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNyBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE4IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjAgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMSBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIyIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI0IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjUgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNiBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjcgZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yNyBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMwIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzIgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNCBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzUgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM1IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInN0cnVjdHMudHVwbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwic3RydWN0cy5saXN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcInN0cnVjdHMuZGljdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJvcGVyYXRvcnMudW5hcnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF82LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU182XG5cdH0sXG5cdFwib3BlcmF0b3JzLmNvbXBhcmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJvb2xlYW5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF84LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU184XG5cdH0sXG5cdFwib3BlcmF0b3JzLmJpbmFyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzlcblx0fSxcblx0XCJvcGVyYXRvcnMuYXR0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5bXVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzExLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMVxuXHR9LFxuXHRcIm9wZXJhdG9ycy5Bc3NpZ25PcFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwibGl0ZXJhbHMuc3RyXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE0XG5cdH0sXG5cdFwibGl0ZXJhbHMuaW50XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE1XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTZcblx0fSxcblx0XCJsaXRlcmFscy5mLXN0cmluZ1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xN1xuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nL0Zvcm1hdHRlZFZhbHVlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE4XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE5LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOVxuXHR9LFxuXHRcImxpdGVyYWxzLk5vbmVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjBcblx0fSxcblx0XCJrZXl3b3Jkcy5yYWlzZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMVxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMlxuXHR9LFxuXHRcImtleXdvcmRzLmltcG9ydC9hbGlhc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yM1xuXHR9LFxuXHRcImtleXdvcmRzLmFzc2VydFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI0LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNFxuXHR9LFxuXHRcImZ1bmN0aW9ucy5kZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjVcblx0fSxcblx0XCJmdW5jdGlvbnMuY2FsbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy53aGlsZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yN1xuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yOFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay90cnlcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMjlcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2svY2F0Y2hibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMVxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5pZmJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmZvclwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMzLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zM1xuXHR9LFxuXHRcImNvbW1lbnRzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM0XG5cdH0sXG5cdFwiY2xhc3MuY2xhc3NkZWZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzVcblx0fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFUztcblxuXG5jb25zdCBSVU5USU1FID0ge307XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfOSk7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjEpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI0KTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yOCk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVUeXBlXCIsIG51bGwpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX05vbmUgPSB7XG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfTm9uZTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwiYm9vbGVhblwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuYm9vbFwiLCBcImJvb2xcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IGJpbmFyeV9qc29wLCBHZW5CaW5hcnlPcGVyYXRvciwgR2VuRXFPcGVyYXRvciwgSW50MkZsb2F0IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX2Jvb2wgPSB7XG4gICAgXG4gICAgLi4uR2VuRXFPcGVyYXRvcih7XG4gICAgICAgIHN1cHBvcnRlZF90eXBlczogW1wiZmxvYXRcIiwgXCJib29sXCJdLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgb3AsIHJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwgb3AsIHJpZ2h0KTtcbiAgICAgICAgfSxcbiAgICB9KSxcbiAgICBcbn0gc2F0aXNmaWVzIFNUeXBlT2JqO1xuXG5leHBvcnQgZGVmYXVsdCBTVHlwZV9ib29sOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiJHtcIiwgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJGb3JtYXR0ZWRWYWx1ZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiYFwiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgaWYoIGNoaWxkLnJlc3VsdF90eXBlID09PSBcInN0clwiKSB7XG5cbiAgICAgICAgICAgIC8vIGg0Y2tcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgICAgICAgICAgZW5kOiBudWxsIGFzIGFueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMgKz0gdG9KUyhjaGlsZC52YWx1ZSwgY3Vyc29yKTtcbiAgICAgICAgICAgIGNoaWxkLmpzY29kZS5lbmQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICB9IGVsc2UgaWYoY2hpbGQudHlwZSA9PT0gXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLCBjdXJzb3IpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCJgXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZ1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLm5vZGUudmFsdWVzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSm9pbmVkU3RyXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgR2VuQmluYXJ5T3BlcmF0b3IsIGdlbkJpbmFyeU9wcywgR2VuRXFPcGVyYXRvciwgSW50MkZsb2F0LCB1bmFyeV9qc29wIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX2Zsb2F0ID0ge1xuICAgIC4uLkdlbkVxT3BlcmF0b3Ioe1xuICAgICAgICBzdXBwb3J0ZWRfdHlwZXM6IFtcImZsb2F0XCIsIFwiYm9vbFwiXSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIGxlZnQsIG9wLCByaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIG9wLCByaWdodCk7XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgXCJfX25lZ19fXCI6IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdmbG9hdCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC4uLmdlbkJpbmFyeU9wcygnZmxvYXQnLFxuICAgICAgICAgICAgICAgICAgICBbJyoqJywgJyonLCAnLycsICcrJywgJy0nXSxcbiAgICAgICAgICAgICAgICAgICAgWydmbG9hdCcsICdpbnQnLCAnYm9vbCddLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0X290aGVyOiB7J2ludCc6ICdmbG9hdCd9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICApLFxuICAgIC8vVE9ETyAlXG4gICAgLy9UT0RPLi4uXG4gICAgLy8gPT4gc3Vic3RpdHV0ZV9jYWxsID0+IG5vICo9ID9cbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignZmxvb3JkaXYnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnLCAnZmxvYXQnOiAnaW50J30sXG4gICAgICAgIGNvbnZlcnQ6IChhKSA9PiBhLnJlc3VsdF90eXBlID09PSAnaW50JyA/IEludDJGbG9hdChhKSA6IGEsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByYE1hdGguZmxvb3IoJHtiaW5hcnlfanNvcChub2RlLCBhLCAnLycsIGIsIGZhbHNlKX0pYDtcbiAgICAgICAgfVxuICAgIH0pLFxufSBzYXRpc2ZpZXMgU1R5cGVPYmo7XG5cbmV4cG9ydCBkZWZhdWx0IFNUeXBlX2Zsb2F0OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYoICh0aGlzIGFzIGFueSkuYXNGbG9hdCAmJiAoISAodGhpcyBhcyBhbnkpLmFzRmxvYXRJc09wdCkgJiYgdHlwZW9mIHZhbHVlID09PSBcImJpZ2ludFwiKVxuICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG5cbiAgICBpZiggKHRoaXMgYXMgYW55KS5hc0Zsb2F0ICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgLy8gb3B0aVxuICAgICAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpOyAgICAgICAgXG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1uYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdmFsdWUgPSBub2RlLnZhbHVlO1xuXG4gICAgaWYodmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gPT09IFwiaW50XCIpXG4gICAgICAgIHZhbHVlID0gdmFsdWUudmFsdWU7XG5cbiAgICBpZiggdHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJiaWdpbnRcIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmludFwiLCBcImludFwiLCB2YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIEdlbkJpbmFyeU9wZXJhdG9yLCBHZW5FcU9wZXJhdG9yLCBpZF9qc29wLCBJbnQyRmxvYXQsIHVuYXJ5X2pzb3AgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlT2JqIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuY29uc3QgU1R5cGVfaW50ID0ge1xuXG4gICAgX19pbml0X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlLCBvdGhlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gbmFtZTJTVHlwZShvdGhlci5yZXN1bHRfdHlwZSk/Ll9faW50X187XG4gICAgICAgICAgICBpZiggbWV0aG9kID09PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtvdGhlci5yZXN1bHRfdHlwZX0uX19pbnRfXyBub3QgZGVmaW5lZGApO1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUobm9kZSwgb3RoZXIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfX2ludF9fOiB7XG4gICAgICAgIHJldHVybl90eXBlOiAoKSA9PiAnaW50JyxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlKG5vZGUsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBpZF9qc29wKG5vZGUsIHNlbGYpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAuLi5HZW5FcU9wZXJhdG9yKHtcbiAgICAgICAgc3VwcG9ydGVkX3R5cGVzOiBbXCJpbnRcIiwgXCJmbG9hdFwiLCBcImJvb2xcIl0sXG4gICAgICAgIGNvbnZlcnQgICAgIDogKGEpID0+IEludDJGbG9hdChhLCB0cnVlKSxcbiAgICAgICAgc2VsZl9jb252ZXJ0OiAoYSkgPT4gSW50MkZsb2F0KGEsIHRydWUpLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgb3AsIHJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgbGVmdCwgb3AsIHJpZ2h0KTtcbiAgICAgICAgfSxcbiAgICB9KSxcbiAgICBcIl9fbmVnX19cIjoge1xuICAgICAgICByZXR1cm5fdHlwZTogKCkgPT4gJ2ludCcsXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bmFyeV9qc29wKG5vZGUsICctJywgYSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdwb3cnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICcqKicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ211bCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJyonLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCd0cnVlZGl2Jywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnZmxvYXQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIEludDJGbG9hdChhKSwgJy8nLCBJbnQyRmxvYXQoYiksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdmbG9vcmRpdicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmBfYl8uZmxvb3JkaXZfaW50KCR7YX0sJHtifSlgOyAvLyBiaW5hcnlfanNvcChub2RlLCBhLCAnLycsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ21vZCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmBfYl8ubW9kX2ludCgke2F9LCAke2J9KWA7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignYWRkJywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnKycsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ3N1YicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJy0nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIF9fbm90X186IHtcbiAgICAgICAgcmV0dXJuX3R5cGU6ICgpID0+ICdpbnQnLFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSA9PiB1bmFyeV9qc29wKG5vZGUsICd+JywgYSlcbiAgICB9LFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdvcicsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJ3wnLCBiKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCd4b3InLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdpbnQnfSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGEsICdeJywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcignYW5kJywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnJicsIGIpO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ2xzaGlmdCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnaW50JzogJ2ludCd9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJzw8JywgYik7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICAuLi5HZW5CaW5hcnlPcGVyYXRvcigncnNoaWZ0Jywge1xuICAgICAgICByZXR1cm5fdHlwZTogeydpbnQnOiAnaW50J30sXG4gICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGUsIGI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBhLCAnPj4nLCBiKTtcbiAgICAgICAgfVxuICAgIH0pXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfaW50OyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYmluYXJ5X2pzb3AsIEdlbkJpbmFyeU9wZXJhdG9yLCBHZW5DbXBPcGVyYXRvciwgR2VuRXFPcGVyYXRvciwgSW50MkZsb2F0IH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBTVHlwZU9iaiB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5cbmNvbnN0IFNUeXBlX3N0ciA9IHtcbiAgICAuLi5HZW5DbXBPcGVyYXRvcih7XG4gICAgICAgc3VwcG9ydGVkX3R5cGVzOiBbJ3N0ciddIFxuICAgIH0pLFxuICAgIC4uLkdlbkJpbmFyeU9wZXJhdG9yKCdtdWwnLCB7XG4gICAgICAgIHJldHVybl90eXBlOiB7J2ludCc6ICdzdHInfSxcbiAgICAgICAgY29udmVydDogKGEpID0+IEludDJGbG9hdChhKSxcbiAgICAgICAgc2FtZV9vcmRlcjogdHJ1ZSxcbiAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgYTogQVNUTm9kZSwgYjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJgJHthfS5yZXBlYXQoJHtifSlgO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgLi4uR2VuQmluYXJ5T3BlcmF0b3IoJ2FkZCcsIHtcbiAgICAgICAgcmV0dXJuX3R5cGU6IHsnc3RyJzogJ3N0cid9LFxuICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlLCBiOiBBU1ROb2RlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgYSwgJysnLCBiKTtcbiAgICAgICAgfVxuICAgIH0pXG59IHNhdGlzZmllcyBTVHlwZU9iajtcblxuZXhwb3J0IGRlZmF1bHQgU1R5cGVfc3RyOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZiggdGhpcy50eXBlLmVuZHNXaXRoKFwiKGluaXQpXCIpIClcbiAgICAgICAganMgKz0gdG9KUyhcInZhciBcIiwgY3Vyc29yKTtcblxuICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlblswXSwgY3Vyc29yKTtcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAganMgKz0gdG9KUyhyYCA9ICR7dGhpcy5jaGlsZHJlbltpXX1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIGxldCByaWdodF90eXBlOiBzdHJpbmd8bnVsbCA9IHJpZ2h0LnJlc3VsdF90eXBlO1xuICAgIGlmKCBcImFubm90YXRpb25cIiBpbiBub2RlKSB7XG4gICAgICAgIHJpZ2h0X3R5cGUgPSBub2RlLmFubm90YXRpb24uaWQgPz8gXCJOb25lXCI7XG4gICAgICAgIGlmKCByaWdodC5yZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodC5yZXN1bHRfdHlwZSAhPT0gcmlnaHRfdHlwZSlcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTXVsdGlUYXJnZXQgPSBcInRhcmdldHNcIiBpbiBub2RlO1xuICAgIGNvbnN0IHRhcmdldHMgPSBpc011bHRpVGFyZ2V0ID8gbm9kZS50YXJnZXRzIDogW25vZGUudGFyZ2V0XTtcblxuICAgIGNvbnN0IGxlZnRzID0gdGFyZ2V0cy5tYXAoIChuOmFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKTtcblxuICAgICAgICBpZiggbGVmdC50eXBlID09PSBcInN5bWJvbFwiKSB7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICAgICAgaWYoIGxlZnQudmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV3JvbmcgcmVzdWx0X3R5cGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudHlwZSAhPT0gXCJjbGFzc1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbGVmdC52YWx1ZV0gPSByaWdodF90eXBlO1xuICAgICAgICAgICAgICAgIHR5cGUgKz0gXCIoaW5pdClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZWZ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIC4uLmxlZnRzLFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkFzc2lnblwiLCBcIkFubkFzc2lnblwiXTsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEFzc2lnbk9wZXJhdG9ycywgcmV2ZXJzZWRfb3BlcmF0b3IgfSBmcm9tIFwic3RydWN0cy9CaW5hcnlPcGVyYXRvcnNcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGxldCBvcCA9IEFzc2lnbk9wZXJhdG9yc1t0aGlzLnZhbHVlXTtcblxuICAgIGxldCB0eXBlID0gU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGxldCBtZXRob2QgPSBuYW1lMlNUeXBlKGxlZnQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcblxuICAgIGlmKCBtZXRob2QgIT09IHVuZGVmaW5lZCApXG4gICAgICAgIHR5cGUgPSBtZXRob2QucmV0dXJuX3R5cGUocmlnaHQucmVzdWx0X3R5cGUhKTtcblxuICAgIC8vIHRyeSBhID0gYSArIGJcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH09ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuICAgICAgICAvKlxuICAgICAgICBvcCAgICAgPSByZXZlcnNlZF9vcGVyYXRvcihvcCk7XG4gICAgICAgIG1ldGhvZCA9IG5hbWUyU1R5cGUocmlnaHQucmVzdWx0X3R5cGUgYXMgU1R5cGVOYW1lKT8uW29wXTtcbiAgICAgICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuXG4gICAgICAgIGlmKCB0eXBlID09PSBTVHlwZV9OT1RfSU1QTEVNRU5URUQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmlnaHQucmVzdWx0X3R5cGV9ICR7b3B9ICR7bGVmdC5yZXN1bHRfdHlwZX0gTk9UIElNUExFTUVOVEVEIWApO1xuXG4gICAgICAgIFtsZWZ0LCByaWdodF0gPSBbcmlnaHQsIGxlZnRdO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHJldHVybiB0b0pTKCBtZXRob2QuY2FsbF9zdWJzdGl0dXRlKHRoaXMsIGxlZnQsIHJpZ2h0KSwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc29sZS53YXJuKFwiYXNzaWduXCIsIG5vZGUpO1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUudGFyZ2V0ICwgY29udGV4dCApO1xuICAgIGxldCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcblxuICAgIGxldCBvcCA9IGJuYW1lMnB5bmFtZVtub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lXTtcblxuICAgIGlmKCBvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9QXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfSAgICAgICAgXG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYmluYXJ5XCIsIGxlZnQucmVzdWx0X3R5cGUsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXVnQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpW3RoaXMudmFsdWVdO1xuXG4gICAgcmV0dXJuIHRvSlMoIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUodGhpcywgbGVmdCwgcmlnaHQpLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lLCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBsZXQgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5yaWdodCwgY29udGV4dCk7XG5cbiAgICBsZXQgb3AgPSBibmFtZTJweW5hbWVbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG5cbiAgICBpZiggb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPUFwiLCBub2RlLm9wLmNvbnN0cnVjdG9yLiRuYW1lKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm90IGltcGxlbWVudGVkXCIpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKHJpZ2h0LnJlc3VsdF90eXBlISk7XG5cbiAgICAvLyB0cnkgcmV2ZXJzZWQgb3BlcmF0b3JcbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKSB7XG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZShyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWUpPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0eXBlICAgPSBtZXRob2QucmV0dXJuX3R5cGUobGVmdC5yZXN1bHRfdHlwZSk7XG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyaWdodC5yZXN1bHRfdHlwZX0gJHtvcH0gJHtsZWZ0LnJlc3VsdF90eXBlfSBOT1QgSU1QTEVNRU5URUQhYCk7XG5cbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJpbmFyeVwiLCB0eXBlLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wXCJdOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBmbG9vcmRpdl9pbnQ6IChhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhL2I7XG4gICAgICAgIGlmKCByZXN1bHQgPiAwIHx8IGElYiA9PT0gMG4pXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIHJldHVybiAtLXJlc3VsdDtcbiAgICB9LFxuICAgIG1vZF9yZWFsOiA8VD4oYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gKGElYikrYiooYSA8IDAgIT09IGIgPCAwKTtcbiAgICB9LFxuICAgIG1vZF9pbnQ6IDxUPihhOiBiaWdpbnQsIGI6IGJpZ2ludCkgPT4ge1xuXG4gICAgICAgIGlmKCBhIDwgMCAhPT0gYiA8IDApXG4gICAgICAgICAgICByZXR1cm4gKGElYikrYjtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBhJWI7XG4gICAgfVxufSIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgbXVsdGlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoIG11bHRpX2pzb3AodGhpcywgdGhpcy52YWx1ZSwgLi4udGhpcy5jaGlsZHJlbikgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmNvbnN0IGJuYW1lMmpzb3AgPSB7XG4gICAgJ0FuZCc6ICcmJicsXG4gICAgJ09yJyA6ICd8fCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSBub2RlLnZhbHVlcy5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQgKSApO1xuXG4gICAgY29uc3Qgb3AgICA9IGJuYW1lMmpzb3Bbbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZV07XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuWzBdLnJlc3VsdF90eXBlO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLmJvb2xlYW5cIiwgdHlwZSwgb3AsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJCb29sT3BcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBiaW5hcnlfanNvcCwgSW50MkZsb2F0LCByZXZlcnNlZF9vcGVyYXRvciB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgU1R5cGVfTk9UX0lNUExFTUVOVEVEIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVcIjtcbmltcG9ydCB7IG5hbWUyU1R5cGUgfSBmcm9tIFwic3RydWN0cy9TVHlwZXNcIjtcblxuXG5mdW5jdGlvbiBmaW5kX2FuZF9jYWxsX3N1YnN0aXR1dGUobm9kZTogQVNUTm9kZSwgbGVmdDpBU1ROb2RlLCBvcDogc3RyaW5nLCByaWdodDogQVNUTm9kZSkge1xuICAgIFxuICAgIGxldCByZXZlcnNlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJ0eXBlID0gcmlnaHQucmVzdWx0X3R5cGU7XG4gICAgY29uc3QgbHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgbGV0IHR5cGUgPSBTVHlwZV9OT1RfSU1QTEVNRU5URUQ7XG4gICAgbGV0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSk/LltvcF07XG4gICAgaWYoIG1ldGhvZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgdHlwZSA9IG1ldGhvZC5yZXR1cm5fdHlwZShyaWdodC5yZXN1bHRfdHlwZSEpO1xuXG4gICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuXG4gICAgICAgIG9wICAgICA9IHJldmVyc2VkX29wZXJhdG9yKG9wKTtcbiAgICAgICAgbWV0aG9kID0gbmFtZTJTVHlwZVtyaWdodC5yZXN1bHRfdHlwZSBhcyBTVHlwZU5hbWVdPy5bb3BdO1xuICAgICAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgdHlwZSAgID0gbWV0aG9kLnJldHVybl90eXBlKGxlZnQucmVzdWx0X3R5cGUpO1xuICAgICAgICBcbiAgICAgICAgaWYoIHR5cGUgPT09IFNUeXBlX05PVF9JTVBMRU1FTlRFRCkge1xuICAgICAgICAgICAgaWYoIG9wICE9PSAnX19lcV9fJyAmJiBvcCAhPT0gJ19fbmVfXycgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtsdHlwZX0gJHtvcH0gJHtydHlwZX0gbm90IGltcGxlbWVudGVkIWApO1xuXG4gICAgICAgICAgICBjb25zdCBqc29wID0gb3AgPT09ICdfX2VxX18nID8gJz09PScgOiAnIT09JztcblxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeV9qc29wKG5vZGUsIGxlZnQsIGpzb3AsIHJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgW2xlZnQsIHJpZ2h0XSA9IFtyaWdodCwgbGVmdF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZC5jYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgcmlnaHQsIHJldmVyc2VkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9ICcnO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwIClcbiAgICAgICAgICAgIGpzICs9IHRvSlMoJyAmJiAnLCBjdXJzb3IpO1xuXG4gICAgICAgIGNvbnN0IG9wICAgID0gdGhpcy52YWx1ZVtpXTtcbiAgICAgICAgY29uc3QgbGVmdCAgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuY2hpbGRyZW5baSsxXTtcblxuICAgICAgICBpZiggb3AgPT09ICdpcycgKSB7XG4gICAgICAgICAgICBqcyArPSB0b0pTKCBiaW5hcnlfanNvcCh0aGlzLCBsZWZ0LCAnPT09JywgcmlnaHQpLCBjdXJzb3IpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIG9wID09PSAnaXMgbm90JyApIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoIGJpbmFyeV9qc29wKHRoaXMsIGxlZnQsICchPT0nLCByaWdodCksIGN1cnNvcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVE9ETzogY2hhaW4uLi5cbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlMoIGZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LCBvcCwgcmlnaHQpLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5cbi8qXG4tIGdlL2xlXG4tIGd0L2x0XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3Qgb3BzID0gbm9kZS5vcHMubWFwKCAoZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wID0gYm5hbWUycHluYW1lW2UuY29uc3RydWN0b3IuJG5hbWVdO1xuICAgICAgICBpZiggb3AgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlLmNvbnN0cnVjdG9yLiRuYW1lfSBub3QgaW1wbGVtZW50ZWQhYCk7XG4gICAgICAgIHJldHVybiBvcDtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlZnQgICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodHMgPSBub2RlLmNvbXBhcmF0b3JzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgb3BlcmF0b3JzLmNvbXBhcmVgLCBcImJvb2xcIiwgb3BzLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgLi4ucmlnaHRzLFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEludDJGbG9hdCwgdW5hcnlfanNvcCB9IGZyb20gXCJzdHJ1Y3RzL0JpbmFyeU9wZXJhdG9yc1wiO1xuaW1wb3J0IHsgbmFtZTJTVHlwZSB9IGZyb20gXCJzdHJ1Y3RzL1NUeXBlc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBsZWZ0ICA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgLy9sZXQgcmlnaHQgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgaWYoIHRoaXMudmFsdWUgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gdG9KUyggdW5hcnlfanNvcCh0aGlzLCAnIScsIEludDJGbG9hdChsZWZ0LCB0cnVlKSApLCBjdXJzb3IgKTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IG5hbWUyU1R5cGUobGVmdC5yZXN1bHRfdHlwZSlbdGhpcy52YWx1ZV07XG5cbiAgICByZXR1cm4gdG9KUyggbWV0aG9kLmNhbGxfc3Vic3RpdHV0ZSh0aGlzLCBsZWZ0LyosIHJpZ2h0Ki8pLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBTVHlwZV9OT1RfSU1QTEVNRU5URUQgfSBmcm9tIFwic3RydWN0cy9TVHlwZVwiO1xuaW1wb3J0IHsgYm5hbWUycHluYW1lIH0gZnJvbSBcInN0cnVjdHMvQmluYXJ5T3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBuYW1lMlNUeXBlIH0gZnJvbSBcInN0cnVjdHMvU1R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5vcGVyYW5kICwgY29udGV4dCApO1xuXG4gICAgbGV0IG9wID0gYm5hbWUycHluYW1lW25vZGUub3AuY29uc3RydWN0b3IuJG5hbWVdO1xuXG4gICAgaWYoIG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1BcIiwgbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiggb3AgPT09ICdub3QnKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMudW5hcnlcIiwgXCJib29sXCIsIFwibm90XCIsIFsgbGVmdCBdICk7XG5cbiAgICBsZXQgdHlwZSA9IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcbiAgICBsZXQgbWV0aG9kID0gbmFtZTJTVHlwZShsZWZ0LnJlc3VsdF90eXBlIGFzIFNUeXBlTmFtZSk/LltvcF07XG5cbiAgICBpZiggbWV0aG9kICE9PSB1bmRlZmluZWQgKVxuICAgICAgICB0eXBlID0gbWV0aG9kLnJldHVybl90eXBlKCk7XG5cbiAgICBpZiggdHlwZSA9PT0gU1R5cGVfTk9UX0lNUExFTUVOVEVEKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05PVCBJTVBMRU1FTlRFRCEnKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy51bmFyeVwiLCB0eXBlLCBvcCwgWyBsZWZ0IF0gKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJVbmFyeU9wXCJdOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuIG51bGxcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKHJgcmV0dXJuICR7dGhpcy5jaGlsZHJlblswXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgaWYobm9kZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgXCJOb25lXCIsIG51bGwpO1xuXG4gICAgY29uc3QgZXhwciA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5yZXR1cm5cIiwgZXhwci5yZXN1bHRfdHlwZSwgbnVsbCwgW2V4cHJdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIlJldHVyblwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuW2ldfTogJHt0aGlzLmNoaWxkcmVuW2krMV19YCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gbmV3IEFycmF5KG5vZGUua2V5cy5sZW5ndGggKiAyKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZS5rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkcmVuWzIqaV0gICA9IGNvbnZlcnRfbm9kZShub2RlLiAga2V5c1tpXSwgY29udGV4dCk7XG4gICAgICAgIGNoaWxkcmVuWzIqaSsxXSA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlc1tpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5kaWN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBjaGlsZHJlblxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJEaWN0XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmxpc3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIG5vZGUuZWx0cy5tYXAoIChuOiBhbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkxpc3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIk9iamVjdC5mcmVlemUoW1wiLCBjdXJzb3IpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICAgICAganMrPSB0b0pTKFwiXSlcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHVwbGVcIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZSwgY3Vyc29yKTsgLy9UT0RPXG59IiwiaW1wb3J0IF9yXyBmcm9tIFwiLi4vLi4vY29yZV9ydW50aW1lL2xpc3RzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gaXNDbGFzcyhfOiB1bmtub3duKSB7XG4gICAgLy8gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MjY1NTkvdGVzdGluZy1pZi1zb21ldGhpbmctaXMtYS1jbGFzcy1pbi1qYXZhc2NyaXB0XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKF8pPy5wcm90b3R5cGU/LndyaXRhYmxlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGxldCByZXN1bHRfdHlwZSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbm9kZS5pZDtcblxuICAgIGlmKCB2YWx1ZSA9PT0gJ3NlbGYnKVxuICAgICAgICB2YWx1ZSA9ICd0aGlzJztcblxuICAgIGVsc2UgaWYoIHZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKVxuICAgICAgICByZXN1bHRfdHlwZSA9IGNvbnRleHQubG9jYWxfdmFyaWFibGVzW3ZhbHVlXTtcbiAgICBlbHNlIGlmKHZhbHVlIGluIF9yXykge1xuICAgICAgICBpZiggaXNDbGFzcyhfcl9bdmFsdWUgYXMga2V5b2YgdHlwZW9mIF9yX10pIClcbiAgICAgICAgICAgIHJlc3VsdF90eXBlID0gYGNsYXNzLiR7dmFsdWV9YDtcblxuICAgICAgICB2YWx1ZSA9IGBfcl8uJHt2YWx1ZX1gO1xuICAgIH1cblxuICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3ltYm9sXCIsIHJlc3VsdF90eXBlLCB2YWx1ZSk7XG59XG5cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIk5hbWVcIjsiLCJpbXBvcnQgUHlfb2JqZWN0IGZyb20gXCJjb3JlX3J1bnRpbWUvb2JqZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X0V4Y2VwdGlvbiBleHRlbmRzIFB5X29iamVjdCB7XG5cbn1cblxuXG4vLyBfX3RyYWNlYmFja19fXG4gICAgLy8gdGJfbmV4dFxuICAgIC8vIHRiX2ZyYW1lXG4gICAgICAgIC8vIGZfYmFjayA/XG4gICAgICAgIC8vIGZfbG9jYWwgOiBlbmFibGUgb25seSBpbiBjb21wYXQgbW9kZS5cbiAgICAgICAgLy8gZl9saW5lbm8gKGxpbmUpXG4gICAgICAgIC8vIGZfY29kZVxuICAgICAgICAgICAgLy8gY29fbmFtZSAoZmN0IG5hbWUgPylcbiAgICAgICAgICAgIC8vIGNvX2ZpbGVuYW1lIiwiaW1wb3J0IFB5X0V4Y2VwdGlvbiBmcm9tIFwiLi9FeGNlcHRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfSlNFeGNlcHRpb24gZXh0ZW5kcyBQeV9FeGNlcHRpb24ge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9KU0V4Y2VwdGlvbi50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMiBmcm9tIFwiLi9FeGNlcHRpb25zL0V4Y2VwdGlvbi50c1wiO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7XG5cdFwib2JqZWN0XCI6IFJVTlRJTUVfMCxcblx0XCJKU0V4Y2VwdGlvblwiOiBSVU5USU1FXzEsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMixcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5leHBvcnQgdHlwZSBBU1QgPSB7XG4gICAgbm9kZXM6IEFTVE5vZGVbXSxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IG1vZHVsZXM6IFJlY29yZDxzdHJpbmcsICh0eXBlb2YgQ09SRV9NT0RVTEVTKVtrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXVtdPiA9IHt9XG5cbmZvcihsZXQgbW9kdWxlX25hbWUgaW4gQ09SRV9NT0RVTEVTKSB7XG5cbiAgICBjb25zdCBtb2R1bGUgPSBDT1JFX01PRFVMRVNbbW9kdWxlX25hbWUgYXMga2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU107XG5cbiAgICBsZXQgbmFtZXMgPSBbXCJudWxsXCJdO1xuICAgIGlmKCBcImJyeXRob25fbmFtZVwiIGluIG1vZHVsZS5BU1RfQ09OVkVSVCkge1xuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWUpICkge1xuICAgICAgICAgICAgbmFtZXMgPSBtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZXMgPSBbbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgbmFtZSBvZiBuYW1lcylcbiAgICAgICAgKG1vZHVsZXNbbmFtZV0gPz89IFtdKS5wdXNoKG1vZHVsZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBmaWxlbmFtZSwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlczogY29udmVydF9hc3QoX2FzdCksXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlVHlwZShicnl0aG9uX25vZGU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBnZXROb2RlVHlwZShicnl0aG9uX25vZGUpO1xuXG4gICAgaWYoICEobmFtZSBpbiBtb2R1bGVzKSApIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkOlwiLCBuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBhdCAke2JyeXRob25fbm9kZS5saW5lbm99OiR7YnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBicnl0aG9uX25vZGUgKTtcbiAgICAgICAgbmFtZSA9IFwibnVsbFwiXG4gICAgfVxuXG4gICAgLy8gd2UgbWF5IGhhdmUgbWFueSBtb2R1bGVzIGZvciB0aGUgc2FtZSBub2RlIHR5cGUuXG4gICAgZm9yKGxldCBtb2R1bGUgb2YgbW9kdWxlc1tuYW1lXSkgeyBcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihicnl0aG9uX25vZGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbm9kZSAke25hbWV9IGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IF9hcmdzID0gbm9kZS5hcmdzLmFyZ3M7XG4gICAgaWYoIGNvbnRleHQudHlwZSA9PT0gXCJjbGFzc1wiKVxuICAgICAgICBfYXJncyA9IF9hcmdzLnNsaWNlKDEpO1xuXG4gICAgY29uc3QgYXJncyA9IF9hcmdzLm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2FyZyhtLCBjb250ZXh0KSApOyAvL1RPRE8uLi5cbiAgICBcbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gbm9kZS5hcmdzLmFyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBub2RlLmFyZ3MuYXJnc1tub2RlLmFyZ3MuYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiYXJnXCIsIG5vZGUuYW5ub3RhdGlvbj8uaWQsIG5vZGUuYXJnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rwb3Mobm9kZTogYW55W10pIHtcblxuICAgIGxldCBiZWcgPSBub2RlWzBdO1xuICAgIGxldCBlbmQgPSBub2RlW25vZGUubGVuZ3RoLTFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9saW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgLy9jb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIGxpbmVubyA6IGJlZy5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGJlZy5jb2xfb2Zmc2V0LFxuICAgICAgICBlbmRfbGluZW5vOiBlbmQuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFwiP1wifFwiY2xhc3NcInxcImZjdFwiID0gXCI/XCIsIHBhcmVudF9jb250ZXh0OiBDb250ZXh0fG51bGwgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmxvY2FsX3ZhcmlhYmxlcyA9IHBhcmVudF9jb250ZXh0ID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShudWxsKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsuLi5wYXJlbnRfY29udGV4dC5sb2NhbF92YXJpYWJsZXN9XG4gICAgfVxuICAgIHR5cGU7XG4gICAgbG9jYWxfdmFyaWFibGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmd8bnVsbD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQoKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheShhc3QuYm9keS5sZW5ndGgpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3QuYm9keS5sZW5ndGg7ICsraSkge1xuICAgICAgICAvL1RPRE86IGRldGVjdCBjb21tZW50c1xuICAgICAgICByZXN1bHRbaV0gPSBjb252ZXJ0X2xpbmUoYXN0LmJvZHlbaV0sIGNvbnRleHQpO1xuXG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHRbaV0udHlwZSk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCBDT1JFX01PRFVMRVMgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpc3RzXCI7XG5cbnR5cGUgQ3Vyc29yID0ge1xuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGxpbmUgIDogbnVtYmVyLFxuICAgIGxpbmVfb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBBU1Qge1xuXG4gICAgY29uc3Qgbm9kZXMgPSBuZXcgQXJyYXk8QVNUTm9kZT4oKTtcblxuICAgIGxldCBjdXJzb3IgPSB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGluZTogMSxcbiAgICAgICAgbGluZV9vZmZzZXQgOiAwXG4gICAgfTtcblxuICAgIGxldCBjaGFyO1xuICAgIGRvIHtcbiAgICAgICAgbm9kZXMucHVzaCggcGFyc2VFeHByZXNzaW9uKGNvZGUsIGN1cnNvcikgYXMgYW55KTtcbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgICAgIHdoaWxlKCBjaGFyID09PSAnXFxuJyApIHtcbiAgICAgICAgICAgIGNoYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgICAgICAgICArK2N1cnNvci5saW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgY3Vyc29yLmxpbmVfb2Zmc2V0ID0gY3Vyc29yLm9mZnNldDtcblxuICAgIH0gd2hpbGUoIGNoYXIgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgLy9jb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHQvL2NvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgLy9jb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblx0cmV0dXJuIHtcbiAgICAgICAgbm9kZXMsXG4gICAgICAgIGZpbGVuYW1lXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2NvbnZlcnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL3N5bWJvbC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTeW1ib2woY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjYXIgPj0gJ2EnICYmIGNhciA8PSAneicgfHwgY2FyID49ICdBJyAmJiBjYXIgPD0gJ1onIHx8IGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyB8fCBjYXIgPT0gJ18nIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KTtcblxuICAgIC8vVE9ETzogaWYga2V5d29yZC4uLlxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwic3ltYm9sXCIsXG4gICAgICAgIHZhbHVlICAgOiBzeW1ib2wsIC8vVE9ETzogY2YgY29udmVydCAoc2VhcmNoIGluIGxvY2FsIHZhcmlhYmxlcy9Db250ZXh0Li4uKVxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19jb252ZXJ0XG4gICAgfTtcbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19pbnQgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL2ludC9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VOdW1iZXIoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIC8vVE9ETzogcmVhbC4uLlxuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnMCcgJiYgY2FyIDw9ICc5JyApXG4gICAgICAgIGNhciAgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5pbnRcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfaW50LFxuICAgIH1cbn1cblxuaW1wb3J0IGFzdDJqc19saXRlcmFsc19zdHIgZnJvbSBcIi4vY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanNcIjtcblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgY29uc3QgYmVnaW5fc3RyID0gY3Vyc29yLm9mZnNldDtcblxuICAgIGxldCBjYXIgPSBjb2RlWysrY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciAhPT0gdW5kZWZpbmVkICYmIGNhciAhPT0gJ1wiJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgICsrY3Vyc29yLm9mZnNldDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJsaXRlcmFscy5zdHJpbmdcIixcbiAgICAgICAgdmFsdWUgICA6IGNvZGUuc2xpY2UoYmVnaW5fc3RyLCBjdXJzb3Iub2Zmc2V0KSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBhc3QyanNfbGl0ZXJhbHNfc3RyLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG5cbiAgICBsZXQgbGVmdCA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICBpZiggY2hhciA9PT0gJ1xcbicpXG4gICAgICAgIHJldHVybiBsZWZ0O1xuXG4gICAgbGV0IG9wID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIG9wIS5jaGlsZHJlblswXSA9IGxlZnQ7XG4gICAgb3AucHljb2RlLnN0YXJ0ID0gbGVmdC5weWNvZGUuc3RhcnQ7XG5cbiAgICBsZXQgdmFsdWVzID0gW29wLCBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcildO1xuXG4gICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgIT09ICdcXG4nICkge1xuXG4gICAgICAgIGxldCBvcDIgICA9IHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuXG4gICAgICAgIGxldCBvcDEgID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl07XG4gICAgICAgIGxldCBsZWZ0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG5cbiAgICAgICAgLy9UT0RPOiBoYW5kbGUgb3AgcHJpb3JpdHkuLi5cbiAgICAgICAgLy8gKGErYikrY1xuXG4gICAgICAgIC8vIChhK2IpXG4gICAgICAgIG9wMSEuY2hpbGRyZW5bMV0gPSBsZWZ0O1xuICAgICAgICBvcDEhLnB5Y29kZS5lbmQgID0gbGVmdC5weWNvZGUuZW5kOyBcblxuICAgICAgICAvLyAoKStjXG4gICAgICAgIG9wMiEuY2hpbGRyZW5bMF0gPSBvcDE7XG4gICAgICAgIG9wMi5weWNvZGUuc3RhcnQgPSBvcDEucHljb2RlLnN0YXJ0O1xuXG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTJdID0gb3AyO1xuICAgICAgICB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXSA9IHJpZ2h0O1xuXG4gICAgICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIH1cblxuICAgIHZhbHVlc1swXSEuY2hpbGRyZW5bMV0gPSB2YWx1ZXNbMV07XG4gICAgdmFsdWVzWzBdIS5weWNvZGUuZW5kICA9IHZhbHVlc1sxXS5weWNvZGUuZW5kO1xuXG4gICAgcmV0dXJuIHZhbHVlc1swXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRvcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXQrK107XG4gICAgLypcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnJyAmJiBjb2RlW2N1cnNvci5vZmZzZXQtMV0gIT09ICdcXFxcJyApXG4gICAgICAgIGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTsqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IFwib3BlcmF0b3JzLlwiICsgY2hhcixcbiAgICAgICAgdmFsdWUgICA6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdLFxuICAgICAgICByZXN1bHRfdHlwZTogbnVsbCxcblxuICAgICAgICB0b0pTOiBDT1JFX01PRFVMRVNbXCJvcGVyYXRvcnMuXCIgKyBjaGFyXS5BU1QySlMsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VuKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gICAgbGV0IGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIHdoaWxlKCBjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgKVxuICAgICAgICBjaGFyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIC8vIGlnbm9yZSBjaGFyXG4gICAgaWYoIGNoYXIgPT09IHVuZGVmaW5lZCApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgIGxpbmU6IGN1cnNvci5saW5lLFxuICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgfTtcblxuICAgIGxldCBub2RlID0gbnVsbFxuICAgIGlmKCBjaGFyID09PSAnXCInKVxuICAgICAgICBub2RlID0gcGFyc2VTdHJpbmcoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlIGlmKCBjaGFyID49ICdhJyAmJiBjaGFyIDw9ICd6JyB8fCBjaGFyID49ICdBJyAmJiBjaGFyIDw9ICdaJyB8fCBjaGFyID09ICdfJyApXG4gICAgICAgIG5vZGUgPSBwYXJzZVN5bWJvbChjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJzAnICYmIGNoYXIgPD0gJzknKVxuICAgICAgICBub2RlID0gcGFyc2VOdW1iZXIoY29kZSwgY3Vyc29yKTtcbiAgICBlbHNlXG4gICAgICAgIG5vZGUgPSBwYXJzZU9wZXJhdG9yKGNvZGUsIGN1cnNvcik7XG4gICAgICAgIC8vOyB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoZW4gcGFyc2luZyAke2NoYXJ9IGF0ICR7Y3Vyc29yLmxpbmV9OiR7Y3Vyc29yLm9mZnNldCAtIGN1cnNvci5saW5lX29mZnNldH0gKCR7Y3Vyc29yLm9mZnNldH0pYCk7XG5cbiAgICBub2RlLnB5Y29kZSA9IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICBjb2wgOiBjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UT0RPOiBpcyBuZXh0IGFuIG9wZXJhdG9yID8gLT4gY29uc3RydWlyZSBhcmJyZS4uLlxuICAgIC8vVE9ETyBoYW5kbGUgb3BlcmF0b3JzID9cblxuICAgIHJldHVybiBub2RlO1xuXG59IiwiaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuZXhwb3J0IHtfYl8sIF9yX307XG5cbi8vIGNsYXNzZSA/XG5cblxuZXhwb3J0IGNsYXNzIFNCcnl0aG9uIHtcblxuICAgICNyZWdpc3RlcmVkX0FTVDogUmVjb3JkPHN0cmluZywgQVNUPiA9IHt9O1xuICAgICNleHBvcnRlZDogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pj4gPSB7XG4gICAgICAgIGJyb3dzZXI6IGdsb2JhbFRoaXNcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBydW5BU1QoKSA/XG4gICAgLy9UT0RPOiBydW5QeXRob25Db2RlKCkgP1xuXG4gICAgLy9UT0RPOiBzb21laG93LCByZW1vdmUgQVNUIGFyZyA/Pz9cbiAgICBidWlsZE1vZHVsZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcbiAgICAgICAgaWYoYXN0LmZpbGVuYW1lIGluIHRoaXMuI3JlZ2lzdGVyZWRfQVNUKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBU1QgJHthc3QuZmlsZW5hbWV9IGFscmVhZHkgcmVnaXN0ZXJlZCFgKTtcblxuICAgICAgICAvL1RPRE86IGZpbGVuYW1lIDIgbW9kdWxlbmFtZS5cbiAgICAgICAgdGhpcy4jcmVnaXN0ZXJlZF9BU1RbYXN0LmZpbGVuYW1lXSA9IGFzdDtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGpzY29kZSk7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJfX1NCUllUSE9OX19cIiwgYCR7anNjb2RlfVxcbnJldHVybiBfX2V4cG9ydGVkX187YCk7XG4gICAgfVxuXG4gICAgcnVuSlNDb2RlKGpzY29kZTogc3RyaW5nLCBhc3Q6IEFTVCkge1xuICAgICAgICB0aGlzLiNleHBvcnRlZFthc3QuZmlsZW5hbWVdID0gdGhpcy5idWlsZE1vZHVsZShqc2NvZGUsIGFzdCkodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkO1xuICAgIH1cbiAgICBnZXRNb2R1bGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNleHBvcnRlZFtuYW1lXTtcbiAgICB9XG5cbiAgICBnZXRBU1RGb3IoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy4jcmVnaXN0ZXJlZF9BU1RbZmlsZW5hbWVdOyAvL1RPRE8gbW9kdWxlbmFtZT9cbiAgICB9XG5cbiAgICBnZXQgX3JfKCkge1xuICAgICAgICByZXR1cm4gX3JfO1xuICAgIH1cbiAgICBnZXQgX2JfKCkge1xuICAgICAgICByZXR1cm4gX2JfO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5pbnRlcmZhY2UgSUFTVE5vZGUgIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUgaW1wbGVtZW50cyBJQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyByIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCIuL0FTVE5vZGVcIjtcbmltcG9ydCB7IFNUeXBlX05PVF9JTVBMRU1FTlRFRCwgU1R5cGVGY3RTdWJzIH0gZnJvbSBcIi4vU1R5cGVcIjtcblxuZXhwb3J0IGNvbnN0IGJuYW1lMnB5bmFtZSA9IHtcbiAgICBcIlVTdWJcIjogXCJfX25lZ19fXCIsXG4gICAgXCJOb3RcIiA6IFwibm90XCIsXG5cbiAgICBcIlBvd1wiIDogXCJfX3Bvd19fXCIsXG5cbiAgICBcIk11bHRcIiAgICA6IFwiX19tdWxfX1wiLFxuICAgIFwiRGl2XCIgICAgIDogXCJfX3RydWVkaXZfX1wiLFxuICAgIFwiRmxvb3JEaXZcIjogXCJfX2Zsb29yZGl2X19cIixcbiAgICBcIk1vZFwiICAgICA6IFwiX19tb2RfX1wiLFxuXG4gICAgXCJBZGRcIiAgICAgOiBcIl9fYWRkX19cIixcbiAgICBcIlN1YlwiICAgICA6IFwiX19zdWJfX1wiLFxuXG4gICAgXCJJc1wiICAgICAgOiBcImlzXCIsXG4gICAgXCJJc05vdFwiICAgOiBcImlzIG5vdFwiLFxuICAgIFwiRXFcIiAgICAgIDogXCJfX2VxX19cIixcbiAgICBcIk5vdEVxXCIgICA6IFwiX19uZV9fXCIsXG5cbiAgICBcIkd0XCIgICAgICA6IFwiX19ndF9fXCIsXG4gICAgXCJHdEVcIiAgICAgOiBcIl9fZ2VfX1wiLFxuICAgIFwiTHRcIiAgICAgIDogXCJfX2x0X19cIixcbiAgICBcIkx0RVwiICAgICA6IFwiX19sZV9fXCIsXG5cbiAgICBcIkludmVydFwiICA6IFwiX19ub3RfX1wiLFxuXG4gICAgXCJCaXRPclwiICAgOiBcIl9fb3JfX1wiLFxuICAgIFwiQml0WG9yXCIgIDogXCJfX3hvcl9fXCIsXG4gICAgXCJCaXRBbmRcIiAgOiBcIl9fYW5kX19cIixcbiAgICBcIlJTaGlmdFwiICA6IFwiX19yc2hpZnRfX1wiLFxuICAgIFwiTFNoaWZ0XCIgIDogXCJfX2xzaGlmdF9fXCIsXG59XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlPcGVyYXRvcnMgPSB7XG4gICAgJ19fcG93X18nICAgICA6ICdfX3Jwb3dfXycsXG4gICAgJ19fbXVsX18nICAgICA6ICdfX3JtdWxfXycsXG4gICAgJ19fdHJ1ZWRpdl9fJyA6ICdfX3J0cnVlZGl2X18nLFxuICAgICdfX2Zsb29yZGl2X18nOiAnX19yZmxvb3JkaXZfXycsXG4gICAgJ19fbW9kX18nICAgICA6ICdfX3Jtb2RfXycsXG5cbiAgICAnX19hZGRfXycgICAgOiAnX19yYWRkX18nLFxuICAgICdfX3N1Yl9fJyAgICA6ICdfX3JzdWJfXycsXG5cbiAgICAnX19lcV9fJyAgICAgOiAnX19lcV9fJyxcbiAgICAnX19uZV9fJyAgICAgOiAnX19uZV9fJyxcblxuICAgICdfX2x0X18nICAgICA6ICdfX2d0X18nLFxuICAgICdfX2d0X18nICAgICA6ICdfX2x0X18nLFxuICAgICdfX2xlX18nICAgICA6ICdfX2dlX18nLFxuICAgICdfX2dlX18nICAgICA6ICdfX2xlX18nLFxuXG4gICAgJ19fbm90X18nICAgIDogJ19fcm5vdF9fJyxcbiAgICAnX19vcl9fJyAgICAgOiAnX19yb3JfXycsXG4gICAgJ19fYW5kX18nICAgIDogJ19fcmFuZF9fJyxcbiAgICAnX194b3JfXycgICAgOiAnX19yeG9yX18nLFxuICAgICdfX2xzaGlmdF9fJyA6ICdfX3Jsc2hpZnRfXycsXG4gICAgJ19fcnNoaWZ0X18nIDogJ19fcnJzaGlmdF9fJyxcbn1cblxuZXhwb3J0IGNvbnN0IEFzc2lnbk9wZXJhdG9ycyA9IHtcbiAgICAnX19wb3dfXycgICAgIDogJ19faXBvd19fJyxcbiAgICAnX19tdWxfXycgICAgIDogJ19faW11bF9fJyxcbiAgICAnX190cnVlZGl2X18nIDogJ19faXRydWVkaXZfXycsXG4gICAgJ19fZmxvb3JkaXZfXyc6ICdfX2lmbG9vcmRpdl9fJyxcbiAgICAnX19tb2RfXycgICAgIDogJ19faW1vZF9fJyxcblxuICAgICdfX2FkZF9fJyAgICA6ICdfX2lhZGRfXycsXG4gICAgJ19fc3ViX18nICAgIDogJ19faXN1Yl9fJyxcblxuICAgICdfX29yX18nICAgICA6ICdfX2lvcl9fJyxcbiAgICAnX19hbmRfXycgICAgOiAnX19pYW5kX18nLFxuICAgICdfX3hvcl9fJyAgICA6ICdfX2l4b3JfXycsXG4gICAgJ19fbHNoaWZ0X18nIDogJ19faWxzaGlmdF9fJyxcbiAgICAnX19yc2hpZnRfXycgOiAnX19pcnNoaWZ0X18nLFxufVxuXG5cbmV4cG9ydCBjb25zdCBqc29wMnB5b3AgPSB7XG4gICAgJyoqJzogJ3BvdycsXG4gICAgJyonIDogJ211bCcsXG4gICAgJy8nIDogJ3RydWVkaXYnLFxuICAgICcvLyc6ICdmbG9vcmRpdicsXG4gICAgJyUnIDogJ21vZCcsXG4gICAgXG4gICAgJysnIDogJ2FkZCcsXG4gICAgJy0nIDogJ3N1YicsXG4gICAgXG4gICAgJ3wnIDogJ29yJyxcbiAgICAnJicgOiAnYW5kJyxcbiAgICAnXicgOiAneG9yJyxcbiAgICAnPDwnOiAnbHNoaWZ0JyxcbiAgICAnPj4nOiAncnNoaWZ0J1xufTtcblxuLy8gVE9ETzogdW5hcnkgb3AgdG9vLi4uXG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL09wZXJhdG9ycy9PcGVyYXRvcl9wcmVjZWRlbmNlI3RhYmxlXG5leHBvcnQgY29uc3QgSlNPcGVyYXRvcnMgPSBbXG4gICAgWyd1Li0nXSxcbiAgICBbJyoqJ10sIC8vIHJpZ2h0IHRvIGxlZnQgIVxuICAgIFsnKicsICcvJywgJyUnXSwgLy8gUHl0aG9uIGFsc28gaGFzIC8vXG4gICAgWycrJywgJy0nXSxcbiAgICBbJzw8JywgJz4+JywgJz4+PiddLCAvL1RPRE9cbiAgICBbJzwnLCAnPD0nLCAnPj0nLCAnPiddLFxuICAgIFsnPT0nLCAnIT0nLCAnPT09JywgJyE9PSddLFxuICAgIFsnJiddLCAgLy9UT0RPXG4gICAgWydeJ10sICAvL1RPRE9cbiAgICBbJ3wnXSwgIC8vVE9ET1xuICAgIFsnJiYnXSwgLy9UT0RPXG4gICAgWyd8fCcsICc/PyddLFxuICAgIFsnPSddIC8qIGV0IHRvdXMgbGVzIGTDqXJpdsOpcyAqLyAvLyByaWdodCB0byBsZWZ0ICFcbiAgICAvLyBldGMuXG5dO1xuXG4vKlxuaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI2NhbGxhYmxlXG5cbi0+IGNsYXNzZXNcbmJvb2woKVxuZmxvYXQoKVxuaW50KClcbnN0cigpXG5ieXRlYXJyYXkoKSBbVWludDhBcnJheV0gKFJXKVxuYnl0ZXMoKSAgICAgWz9dICAgICAgICAgIChSTykgPC0gbm8gdHlwZXMgaW4gSlMuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtIFVpbnQ4QXJyYXkgd2l0aCBmbGFnID8gZnJlZXplKCkgW0pTIHVuc2FmZV1cbiAgICAgICAgICAgIGJcImVcXHhGRlwiIGluc3RlYWQgb2YgWzEwMSwxMDFdLCBldGMuICgzMiA8PSBieXQgPD0gMTI2KVxudHlwZSgpXG5saXN0KCkgICAgICBbQXJyYXldXG50dXBsZSgpICAgICBbT2JqZWN0LmZyb3plbihBcnJheSldXG5cbnNldCgpICAgICAgIC8vIHJlbGllcyBvbiBoYXNoKCkuLi4gPT4gc2V0W2xpdGVyYWxzXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHNldCgpIC8gPC0gSlMgc2V0LlxuICAgICAgICAgICAgICAgICAgICAgICA9PiBieXRlcy9ieXRlYXJyYXkvZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGluaGVyaXQgU2V0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gSW50ZXJuYWwga2V5cygpIHNldCBbcmVjb21wdXRlIGhhc2ggd2hlbiBhZGQvcmVtb3ZlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IGludGVybmFsbHkgc3RvcmVkIGFzIE1hcChoYXNoLCB2YWx1ZSkgKD8pXG5mcm96ZW5zZXQoKSAgICAgICAgICAgID0+IGV4dGVuZHMgc2V0IHRvIHJlcGxhY2UgbW9kaWZpZXJzLlxuXG5kaWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc3RyXSBhcyBPYmplY3QuY3JlYXRlKG51bGwpICsgKGFuZCBwdXJlIEpTT2JqIGFzIGRpY3Rbc3RyXSApXG4gICAgICAgICAgICAgICAgICAgICAgICA9PiBpbmhlcml0IE1hcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4gU2V0KGhhc2gpIC8gTWFwKGhhc2gsIGtleSkgLyBNYXAoa2V5LCBoYXNoKSA/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0L3NldC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiBNYXAoa2V5LCB2YWx1ZSlcblxub2JqZWN0KClcbmNvbXBsZXgoKVxubWVtb3J5dmlldygpICAgICAgICAgICAgPT4gQXJyYXlCdWZmZXIgP1xuXG4tPiBwcmludFxuYXNjaWkoKVxuYmluKClcbmhleCgpXG5vY3QoKVxucmVwcigpXG5oYXNoKClcblxuLT4gbWF0aHNcbmFicygpXG5kaXZtb2QoKVxucG93KClcbnJvdW5kKClcblxuLT4gbGlzdHNcbmFsbCgpXG5hbnkoKVxuZmlsdGVyKClcbm1hcCgpXG5tYXgoKVxubWluKClcbnN1bSgpXG5sZW4oKVxuZW51bWVyYXRlKClcbnJldmVyc2VkKClcbnNsaWNlKClcbnNvcnRlZCgpXG56aXAoKVxuXG4tPiBpdGVyXG5yYW5nZSgpXG5haXRlcigpXG5pdGVyKClcbmFuZXh0KClcbm5leHQoKVxuXG4tPiBzdHJcbm9yZCgpXG5jaHIoKVxuZm9ybWF0KClcbnByaW50KClcbmZcIlwiXG5cbmNhbGxhYmxlKClcbmNsYXNzbWV0aG9kKClcbnN0YXRpY21ldGhvZCgpXG5wcm9wZXJ0eSgpXG5zdXBlcigpXG5pc2luc3RhbmNlKClcbmlzc3ViY2xhc3MoKVxuZGVsYXR0cigpXG5nZXRhdHRyKClcbmhhc2F0dHIoKVxuc2V0YXR0cigpXG5kaXIoKVxuXG5ldmFsKClcbmV4ZWMoKVxuY29tcGlsZSgpXG5icmVha3BvaW50KClcblxuZ2xvYmFscygpXG5sb2NhbHMoKVxudmFycygpXG5fX2ltcG9ydF9fKClcblxuaWQoKVxuICAgIC0+IG9uLWRlbWFuZCB3ZWFrcmVmID9cblxuaGVscCgpXG5pbnB1dCgpXG5vcGVuKClcblxuKi9cblxuLypcbnVuYXJ5XG4tIHBvcyAodW5hcnkgKylcblxuLSBib29sXG4tIGZsb2F0XG4tIGludFxuLSBzdHJcbi0gcmVwclxuXG4tIGFic1xuLSBjZWlsXG4tIGZsb29yXG4tIHJvdW5kXG4tIHRydW5jXG5cbmJpbmFyeVxuLSBwb3cvcnBvd1xuLSBkaXZtb2QvcmRpdm1vZFxuXG5jbGFzc1xuLSBjbGFzc1xuLSBuZXdcbi0gaW5pdFxuLSBpbml0X3N1YmNsYXNzXG5cbi0gc3ViY2xhc3Nob29rIC8vIF9faXNpbnN0YW5jZWNoZWNrX18gXG5cbi0gZGlyXG4tIGRlbGF0dHJcbi0gc2V0YXR0clxuLSBnZXRhdHRyaWJ1dGVcblxuLSBkb2Ncbi0gZm9ybWF0XG4tIGdldG5ld2FyZ3Ncbi0gaGFzaFxuLSBpbmRleCAoPylcbi0gc2l6ZW9mXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gSW50MkZsb2F0KGE6IEFTVE5vZGUsIG9wdGlvbmFsID0gZmFsc2UpIHtcblxuICAgIC8vVE9ETyBjYW5CZUZsb2F0ICsgZXRjLlxuXG4gICAgaWYoIGEudHlwZSA9PT0gJ2xpdGVyYWxzLmludCcpIHtcbiAgICAgICAgKGEgYXMgYW55KS5hc0Zsb2F0ICAgICAgPSB0cnVlO1xuICAgICAgICAoYSBhcyBhbnkpLmFzRmxvYXRJc09wdCA9IG9wdGlvbmFsO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgaWYoIG9wdGlvbmFsIClcbiAgICAgICAgcmV0dXJuIGE7XG5cbiAgICByZXR1cm4gcmBOdW1iZXIoJHthfSlgO1xufVxuXG5sZXQgSlNPcGVyYXRvcnNQcmlvcml0eTogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuZm9yKGxldCBpID0gMDsgaSA8IEpTT3BlcmF0b3JzLmxlbmd0aDsgKytpKSB7XG5cbiAgICBjb25zdCBwcmlvcml0eSA9IEpTT3BlcmF0b3JzLmxlbmd0aCAtIGk7XG4gICAgZm9yKGxldCBvcCBvZiBKU09wZXJhdG9yc1tpXSlcbiAgICAgICAgSlNPcGVyYXRvcnNQcmlvcml0eVtvcF0gPSBwcmlvcml0eTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZWRfb3BlcmF0b3I8VCBleHRlbmRzIGtleW9mIHR5cGVvZiBCaW5hcnlPcGVyYXRvcnM+KG9wOiBUKSB7XG4gICAgcmV0dXJuIEJpbmFyeU9wZXJhdG9yc1tvcF07XG59XG5cbmNvbnN0IExFRlQgID0gMTtcbmNvbnN0IFJJR0hUID0gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpX2pzb3Aobm9kZTogQVNUTm9kZSwgb3A6IHN0cmluZywgLi4udmFsdWVzOiBBU1ROb2RlW10pIHtcblxuICAgIGNvbnN0IGZpcnN0ID0gdmFsdWVzWzBdO1xuICAgIGlmKGZpcnN0IGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoZmlyc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGZpcnN0IGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlQ7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHZhbHVlcy5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICBpZih2YWx1ZSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgICAgICh2YWx1ZSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAgICAgKHZhbHVlIGFzIGFueSkucGFyZW50X29wX2RpciA9IExFRlR8UklHSFQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsYXN0ID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG4gICAgaWYobGFzdCBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3AgPSBvcDtcbiAgICAgICAgKGxhc3QgYXMgYW55KS5wYXJlbnRfb3BfZGlyID0gUklHSFQ7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHJgJHtmaXJzdH1gO1xuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIHJlc3VsdCA9IHJgJHtyZXN1bHR9ICYmICR7dmFsdWVzW2ldfWA7XG5cbiAgICBpZiggXCJwYXJlbnRfb3BcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gICAgICAgPSAobm9kZSBhcyBhbnkpLnBhcmVudF9vcF9kaXI7XG4gICAgICAgIGxldCBjdXJfcHJpb3JpdHkgICAgPSBKU09wZXJhdG9yc1ByaW9yaXR5W29wXTtcbiAgICAgICAgbGV0IHBhcmVudF9wcmlvcml0eSA9IEpTT3BlcmF0b3JzUHJpb3JpdHlbbm9kZS5wYXJlbnRfb3AgYXMgYW55XTtcblxuICAgICAgICBpZiggcGFyZW50X3ByaW9yaXR5ID4gY3VyX3ByaW9yaXR5IFxuICAgICAgICAgICAgfHwgKHBhcmVudF9wcmlvcml0eSA9PT0gY3VyX3ByaW9yaXR5ICYmIChkaXJlY3Rpb24gJiBSSUdIVCkgKVxuICAgICAgICApXG4gICAgICAgICAgICByZXN1bHQgPSByYCgke3Jlc3VsdH0pYDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWRfanNvcChub2RlOiBBU1ROb2RlLCBhOiBBU1ROb2RlKSB7XG4gICAgaWYoYSBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgKGEgYXMgYW55KS5wYXJlbnRfb3AgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IChub2RlIGFzIGFueSkucGFyZW50X29wX2RpcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmAke2F9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeV9qc29wKG5vZGU6IEFTVE5vZGUsIGE6IEFTVE5vZGV8YW55LCBvcDogc3RyaW5nLCBiOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBpZihhIGluc3RhbmNlb2YgQVNUTm9kZSkge1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcCA9IG9wO1xuICAgICAgICAoYSBhcyBhbnkpLnBhcmVudF9vcF9kaXIgPSBMRUZUO1xuICAgIH1cblxuICAgIGlmKGIgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChiIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSByYCR7YX0ke29wfSR7Yn1gO1xuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIHBhcmVudF9wcmlvcml0eSA+IGN1cl9wcmlvcml0eSBcbiAgICAgICAgICAgIHx8IChwYXJlbnRfcHJpb3JpdHkgPT09IGN1cl9wcmlvcml0eSAmJiAoZGlyZWN0aW9uICYgUklHSFQpIClcbiAgICAgICAgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdW5hcnlfanNvcChub2RlOiBBU1ROb2RlLCBvcDogc3RyaW5nLCBhOiBBU1ROb2RlfGFueSwgY2hlY2tfcHJpb3JpdHkgPSB0cnVlKSB7XG5cbiAgICBsZXQgcmVzdWx0ID0gcmAke29wfSR7YX1gO1xuXG4gICAgaWYob3AgPT09ICctJylcbiAgICAgICAgb3AgPSAndS4tJztcblxuICAgIGlmKGEgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wID0gb3A7XG4gICAgICAgIChhIGFzIGFueSkucGFyZW50X29wX2RpciA9IFJJR0hUO1xuICAgIH1cblxuXG4gICAgaWYoIGNoZWNrX3ByaW9yaXR5ICYmIFwicGFyZW50X29wXCIgaW4gbm9kZSApIHtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uICAgICAgID0gKG5vZGUgYXMgYW55KS5wYXJlbnRfb3BfZGlyO1xuICAgICAgICBsZXQgY3VyX3ByaW9yaXR5ICAgID0gSlNPcGVyYXRvcnNQcmlvcml0eVtvcF07XG4gICAgICAgIGxldCBwYXJlbnRfcHJpb3JpdHkgPSBKU09wZXJhdG9yc1ByaW9yaXR5W25vZGUucGFyZW50X29wIGFzIGFueV07XG5cbiAgICAgICAgaWYoIChkaXJlY3Rpb24gJiBMRUZUKSAmJiBwYXJlbnRfcHJpb3JpdHkgPiBjdXJfcHJpb3JpdHkgKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmAoJHtyZXN1bHR9KWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuRGVmYXVsdEpTVW5hcmllcygpIHtcblxufVxuXG5mdW5jdGlvbiBnZW5EZWZhdWx0SlNDbXBzKCkge1xuXG59XG5cbnR5cGUgR2VuQmluYXJ5T3BzX09wdHMgPSB7XG4gICAgY29udmVydF9vdGhlcj86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICByZXR1cm4gKG5vZGU6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gY29udmVydFtub2RlLnJlc3VsdF90eXBlIV07XG4gICAgICAgIGlmKCB0YXJnZXQgPT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgICAvL1RPRE86IG90aGVyIHR5cGVzXG4gICAgICAgIC8vVE9ETzogdXNlIF9feF9fIG9wZXJhdG9ycyA/XG4gICAgICAgIHJldHVybiBJbnQyRmxvYXQobm9kZSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkJpbmFyeU9wcyhyZXRfdHlwZTogc3RyaW5nLCBvcHM6IChrZXlvZiB0eXBlb2YganNvcDJweW9wKVtdLCBvdGhlcl90eXBlOiBzdHJpbmdbXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRfb3RoZXIgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgIH06IEdlbkJpbmFyeU9wc19PcHRzID0ge30pIHtcblxuICAgIGxldCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFNUeXBlRmN0U3Vicz4gPSB7fTtcblxuICAgIGNvbnN0IHJldHVybl90eXBlID0gKG86IHN0cmluZykgPT4gb3RoZXJfdHlwZS5pbmNsdWRlcyhvKSA/IHJldF90eXBlIDogU1R5cGVfTk9UX0lNUExFTUVOVEVEO1xuICAgIGNvbnN0IGNvbnZfb3RoZXIgID0gZ2VuZXJhdGVDb252ZXJ0KGNvbnZlcnRfb3RoZXIpO1xuXG4gICAgZm9yKGxldCBvcCBvZiBvcHMpIHtcbiAgICAgICAgY29uc3QgcHlvcCA9IGpzb3AycHlvcFtvcF07XG4gICAgICAgIHJlc3VsdFtgX18ke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgc2VsZiwgb3AsIGNvbnZfb3RoZXIob3RoZXIpICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRbYF9fciR7cHlvcH1fX2BdID0ge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvdGhlcjogQVNUTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5hcnlfanNvcChub2RlLCBjb252X290aGVyKG90aGVyKSwgb3AsIHNlbGYpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0W2BfX2kke3B5b3B9X19gXSA9IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgb3RoZXI6IEFTVE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5X2pzb3Aobm9kZSwgc2VsZiwgb3ArJz0nLCBjb252X290aGVyKG90aGVyKSApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudHlwZSBHZW5DbXBPcGVyYXRvcl9PcHRzID0ge1xuICAgIHN1cHBvcnRlZF90eXBlczogc3RyaW5nW10sXG59O1xuXG5mdW5jdGlvbiBfZ2VuQ21wKG9wMTogc3RyaW5nLCBvcDI6IHN0cmluZykge1xuICAgIHJldHVybiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgaW52ZXJ0X2RpcjogYm9vbGVhbiwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBvcCA9IG9wMTtcbiAgICAgICAgaWYoIHJldmVyc2VkIClcbiAgICAgICAgICAgIGludmVydF9kaXIgPSAhIGludmVydF9kaXI7XG4gICAgICAgIGlmKCBpbnZlcnRfZGlyIClcbiAgICAgICAgICAgIG9wID0gb3AyO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZWQgPyBiaW5hcnlfanNvcChub2RlLCBvLCBvcCwgc2VsZikgOiBiaW5hcnlfanNvcChub2RlLCBzZWxmLCBvcCwgbyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2VuQ21wT3BlcmF0b3Ioe1xuICAgIHN1cHBvcnRlZF90eXBlc1xufTogR2VuQ21wT3BlcmF0b3JfT3B0cykge1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiBzdXBwb3J0ZWRfdHlwZXMuaW5jbHVkZXMobykgPyAnYm9vbCc6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcblxuICAgIGNvbnN0IHh0ID0gX2dlbkNtcCgnPCcgLCAnPicpO1xuICAgIGNvbnN0IHhlID0gX2dlbkNtcCgnPD0nLCAnPj0nKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIF9fbHRfXzoge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImx0XCIsIHNlbGYsIG8sIHJldmVyc2VkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geHQobm9kZSwgc2VsZiwgbywgZmFsc2UsIHJldmVyc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19ndF9fOiB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZ3RcIiwgc2VsZiwgbywgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB4dChub2RlLCBzZWxmLCBvLCB0cnVlLCByZXZlcnNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9fbGVfXzoge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB4ZShub2RlLCBzZWxmLCBvLCBmYWxzZSwgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfX2dlX186IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlLFxuICAgICAgICAgICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSwgcmV2ZXJzZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geGUobm9kZSwgc2VsZiwgbywgdHJ1ZSwgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG50eXBlIEdlbkVxT3BlcmF0b3JfT3B0cyA9IHtcbiAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBsZWZ0OiBBU1ROb2RlLCBvcDogXCI9PVwifFwiIT1cIiwgcmlnaHQ6IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuKSA9PiBhbnksXG4gICAgc3VwcG9ydGVkX3R5cGVzOiBzdHJpbmdbXSxcbiAgICBjb252ZXJ0ICAgICAgID86IChhOiBBU1ROb2RlKSA9PiBhbnksXG4gICAgc2VsZl9jb252ZXJ0ICA/OiAoYTogQVNUTm9kZSkgPT4gYW55LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2VuRXFPcGVyYXRvcih7XG4gICAgY2FsbF9zdWJzdGl0dXRlLFxuICAgIHN1cHBvcnRlZF90eXBlcyxcbiAgICBjb252ZXJ0ID0gKGE6IEFTVE5vZGUpID0+IGEsXG4gICAgc2VsZl9jb252ZXJ0ID0gKGE6IEFTVE5vZGUpID0+IGFcbn06IEdlbkVxT3BlcmF0b3JfT3B0cykge1xuXG4gICAgY29uc3QgcmV0dXJuX3R5cGUgPSAobzogc3RyaW5nKSA9PiBzdXBwb3J0ZWRfdHlwZXMuaW5jbHVkZXMobykgPyAnYm9vbCc6IFNUeXBlX05PVF9JTVBMRU1FTlRFRDtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdfX2VxX18nOiB7XG4gICAgICAgICAgICByZXR1cm5fdHlwZSxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUsIHJldmVyc2VkOiBib29sZWFuID0gZmFsc2UpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ICA9IHJldmVyc2VkID8gY29udmVydChvKSAgICAgICAgIDogc2VsZl9jb252ZXJ0KHNlbGYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gcmV2ZXJzZWQgPyBzZWxmX2NvbnZlcnQoc2VsZikgOiBjb252ZXJ0KG8pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBsZWZ0LCAnPT0nLCByaWdodCwgcmV2ZXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnX19uZV9fJzoge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGUsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IChub2RlOiBBU1ROb2RlLCBzZWxmOiBBU1ROb2RlLCBvOiBBU1ROb2RlLCByZXZlcnNlZDogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdCAgPSByZXZlcnNlZCA/IGNvbnZlcnQobykgICAgICAgICA6IHNlbGZfY29udmVydChzZWxmKTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodCA9IHJldmVyc2VkID8gc2VsZl9jb252ZXJ0KHNlbGYpIDogY29udmVydChvKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsX3N1YnN0aXR1dGUobm9kZSwgbGVmdCwgJyE9JywgcmlnaHQsIHJldmVyc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG50eXBlIEdlbkJpbmFyeU9wZXJhdG9yX09wdHMgPSB7XG4gICAgY2FsbF9zdWJzdGl0dXRlOiAobm9kZTogQVNUTm9kZSwgc2VsZjogQVNUTm9kZSwgbzogQVNUTm9kZSkgPT4gYW55LFxuICAgIHJldHVybl90eXBlICAgIDogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbiAgICBjb252ZXJ0ICAgICAgID86IChhOiBBU1ROb2RlKSA9PiBhbnksXG4gICAgc2FtZV9vcmRlciAgICA/OiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHZW5CaW5hcnlPcGVyYXRvcihuYW1lOiBzdHJpbmcsIHtcbiAgICBjYWxsX3N1YnN0aXR1dGUsXG4gICAgcmV0dXJuX3R5cGUsXG4gICAgc2FtZV9vcmRlciA9IGZhbHNlLFxuICAgIGNvbnZlcnQgPSAoYTogQVNUTm9kZSkgPT4gYVxufTogR2VuQmluYXJ5T3BlcmF0b3JfT3B0cykge1xuXG4gICAgY29uc3QgZmN0ID0gKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBzZWxmLCBjb252ZXJ0KG8pICk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJmY3QgPSBzYW1lX29yZGVyID8gZmN0IDogKG5vZGU6IEFTVE5vZGUsIHNlbGY6IEFTVE5vZGUsIG86IEFTVE5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxfc3Vic3RpdHV0ZShub2RlLCBjb252ZXJ0KG8pLCBzZWxmKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2BfXyR7IG5hbWV9X19gXToge1xuICAgICAgICAgICAgcmV0dXJuX3R5cGU6IChvOiBzdHJpbmcpID0+IHJldHVybl90eXBlW29dID8/IFNUeXBlX05PVF9JTVBMRU1FTlRFRCxcbiAgICAgICAgICAgIGNhbGxfc3Vic3RpdHV0ZTogZmN0XG4gICAgICAgIH0sXG4gICAgICAgIFtgX19yJHtuYW1lfV9fYF06IHtcbiAgICAgICAgICAgIHJldHVybl90eXBlOiAobzogc3RyaW5nKSA9PiByZXR1cm5fdHlwZVtvXSA/PyBTVHlwZV9OT1RfSU1QTEVNRU5URUQsXG4gICAgICAgICAgICBjYWxsX3N1YnN0aXR1dGU6IHJmY3RcbiAgICAgICAgfSxcbiAgICB9O1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcIi4vQVNUTm9kZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCb2R5IHtcblxuICAgIG5vZGU7XG4gICAgcHJpbnRfYnJhY2tldDtcbiAgICBpZHg7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBBU1ROb2RlLCBwcmludF9icmFja2V0ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmlkeCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7IC8vVE9ETyBzZWFyY2ggYm9keS4uLlxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLnByaW50X2JyYWNrZXQgPSBwcmludF9icmFja2V0O1xuICAgIH1cblxuICAgIHRvSlMoY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpXG4gICAgICAgICAgICBqcys9XCJ7XCI7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5pZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IpO1xuICAgICAgICAgICAganMgKz0gXCJ9XCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxufSIsIlxuZXhwb3J0IHR5cGUgU1R5cGVTdWJzID0ge1xuICAgIHR5cGUgICAgICAgPzogc3RyaW5nLFxuICAgIHN1YnN0aXR1dGUgPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnlcbn07XG5leHBvcnQgdHlwZSBTVHlwZUZjdFN1YnMgPSB7XG4gICAgdHlwZSAgICAgICAgICAgID86IHN0cmluZywgLy8gb3IgbWFueSB0eXBlcy4uLiBbXVxuICAgIGNhbGxfc3Vic3RpdHV0ZSA/OiAoLi4uYXJnczogYW55W10pID0+IGFueSxcbiAgICByZXR1cm5fdHlwZSAgICAgIDogKC4uLmFyZ3M6IHN0cmluZ1tdKSA9PiBzdHJpbmcgLy8gZm9yIG1ldGhvZHMvZnVuY3Rpb25zLi4uXG59O1xuZXhwb3J0IHR5cGUgU1R5cGUgPSBzdHJpbmcgfCBTVHlwZVN1YnMgfCBTVHlwZUZjdFN1YnM7XG5leHBvcnQgdHlwZSBTVHlwZU9iaiA9IFJlY29yZDxzdHJpbmcsIFNUeXBlPjtcblxuZXhwb3J0IGNvbnN0IFNUeXBlX05PVF9JTVBMRU1FTlRFRCA9IFwiTm90SW1wbGVtZW50ZWRUeXBlXCI7IiwiaW1wb3J0IFNUeXBlX2Zsb2F0IGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9pbnQgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9zdHIgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9zdHIvc3R5cGVcIjtcbmltcG9ydCBTVHlwZV9Ob25lIGZyb20gXCJjb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9zdHlwZVwiO1xuaW1wb3J0IFNUeXBlX2Jvb2wgZnJvbSBcImNvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL3N0eXBlXCI7XG5cbi8vZXhwb3J0IHR5cGUgU1R5cGVOYW1lID0ga2V5b2YgdHlwZW9mIG5hbWUyU1R5cGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYW1lMlNUeXBlKG5hbWU6IHN0cmluZykge1xuXG4gICAgY29uc3QgbmFtZTJTVHlwZSA9IHtcbiAgICAgICAgXCJmbG9hdFwiICAgOiBTVHlwZV9mbG9hdCxcbiAgICAgICAgXCJpbnRcIiAgICAgOiBTVHlwZV9pbnQsXG4gICAgICAgIFwiYm9vbFwiICAgIDogU1R5cGVfYm9vbCxcbiAgICAgICAgXCJzdHJcIiAgICAgOiBTVHlwZV9zdHIsXG4gICAgICAgIFwiTm9uZVR5cGVcIjogU1R5cGVfTm9uZVxuICAgIH1cblxuICAgIHJldHVybiBuYW1lMlNUeXBlW25hbWUgYXMga2V5b2YgdHlwZW9mIG5hbWUyU1R5cGVdO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiQm9keSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImFyZ3MyanMiLCJhcmcyanMiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJiYXNlIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnZlcnQiLCJjb250ZXh0IiwibG9jYWxfdmFyaWFibGVzIiwibmFtZSIsImJhc2VzIiwiRXJyb3IiLCJicnl0aG9uX25hbWUiLCJfY3Vyc29yIiwiX2NvbnRleHQiLCJiZWciLCJpbmNyIiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJyZXN1bHRfdHlwZSIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiaCIsImZpbHRlcl9zdGFjayIsInN0YWNrIiwiZmlsdGVyIiwiZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3BvcyIsInN0YWNrbGluZTJhc3Rub2RlIiwic3RhY2tsaW5lIiwic2IiLCJnZXRBU1RGb3IiLCJzdGFjazJhc3Rub2RlcyIsInBhcnNlX3N0YWNrIiwic3BsaXQiLCJpc1Y4IiwibCIsIl8iLCJfbGluZSIsIl9jb2wiLCJzbGljZSIsImZjdF9uYW1lIiwicG9zIiwiaW5kZXhPZiIsImRlYnVnX3ByaW50X2V4Y2VwdGlvbiIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiX3Jhd19lcnJfIiwic3RhY2tfc3RyIiwiZXhjZXB0aW9uX3N0ciIsImxvZyIsIl9faW5pdF9fIiwiY2FsbF9zdWJzdGl0dXRlIiwic3RhcnRzV2l0aCIsIm5hbWUyU1R5cGUiLCJrbGFzcyIsInVuZGVmaW5lZCIsInJldHVybl90eXBlIiwiZW5kc1dpdGgiLCJjb252ZXJ0X2FyZ3MiLCJpc01ldGhvZCIsImFyZyIsImFzc2VydCIsImFzbmFtZSIsIm1vZHVsZSIsIm5hbWVzIiwiZXhjIiwiUHl0aG9uRXJyb3IiLCJweXRob25fZXhjZXB0aW9uIiwiQVNUX0NPTlZFUlRfMCIsIkFTVDJKU18wIiwiQVNUX0NPTlZFUlRfMSIsIkFTVDJKU18xIiwiQVNUX0NPTlZFUlRfMiIsIkFTVDJKU18yIiwiQVNUX0NPTlZFUlRfMyIsIkFTVDJKU18zIiwiQVNUX0NPTlZFUlRfNCIsIkFTVDJKU180IiwiQVNUX0NPTlZFUlRfNSIsIkFTVDJKU181IiwiQVNUX0NPTlZFUlRfNiIsIkFTVDJKU182IiwiQVNUX0NPTlZFUlRfNyIsIkFTVDJKU183IiwiQVNUX0NPTlZFUlRfOCIsIkFTVDJKU184IiwiQVNUX0NPTlZFUlRfOSIsIkFTVDJKU185IiwiUlVOVElNRV85IiwiQVNUX0NPTlZFUlRfMTAiLCJBU1QySlNfMTAiLCJBU1RfQ09OVkVSVF8xMSIsIkFTVDJKU18xMSIsIkFTVF9DT05WRVJUXzEyIiwiQVNUMkpTXzEyIiwiQVNUX0NPTlZFUlRfMTMiLCJBU1QySlNfMTMiLCJBU1RfQ09OVkVSVF8xNCIsIkFTVDJKU18xNCIsIkFTVF9DT05WRVJUXzE1IiwiQVNUMkpTXzE1IiwiQVNUX0NPTlZFUlRfMTYiLCJBU1QySlNfMTYiLCJBU1RfQ09OVkVSVF8xNyIsIkFTVDJKU18xNyIsIkFTVF9DT05WRVJUXzE4IiwiQVNUMkpTXzE4IiwiQVNUX0NPTlZFUlRfMTkiLCJBU1QySlNfMTkiLCJBU1RfQ09OVkVSVF8yMCIsIkFTVDJKU18yMCIsIkFTVF9DT05WRVJUXzIxIiwiQVNUMkpTXzIxIiwiUlVOVElNRV8yMSIsIkFTVF9DT05WRVJUXzIyIiwiQVNUMkpTXzIyIiwiQVNUX0NPTlZFUlRfMjMiLCJBU1QySlNfMjMiLCJBU1RfQ09OVkVSVF8yNCIsIkFTVDJKU18yNCIsIlJVTlRJTUVfMjQiLCJBU1RfQ09OVkVSVF8yNSIsIkFTVDJKU18yNSIsIkFTVF9DT05WRVJUXzI2IiwiQVNUMkpTXzI2IiwiQVNUX0NPTlZFUlRfMjciLCJBU1QySlNfMjciLCJBU1RfQ09OVkVSVF8yOCIsIkFTVDJKU18yOCIsIlJVTlRJTUVfMjgiLCJBU1RfQ09OVkVSVF8yOSIsIkFTVDJKU18yOSIsIkFTVF9DT05WRVJUXzMwIiwiQVNUMkpTXzMwIiwiQVNUX0NPTlZFUlRfMzEiLCJBU1QySlNfMzEiLCJBU1RfQ09OVkVSVF8zMiIsIkFTVDJKU18zMiIsIkFTVF9DT05WRVJUXzMzIiwiQVNUMkpTXzMzIiwiQVNUX0NPTlZFUlRfMzQiLCJBU1QySlNfMzQiLCJBU1RfQ09OVkVSVF8zNSIsIkFTVDJKU18zNSIsIk1PRFVMRVMiLCJBU1RfQ09OVkVSVCIsIkFTVDJKUyIsIlJVTlRJTUUiLCJhc3NpZ24iLCJfYl8iLCJfX2NsYXNzX18iLCJfX3F1YWxuYW1lX18iLCJTVHlwZV9Ob25lIiwiYmluYXJ5X2pzb3AiLCJHZW5FcU9wZXJhdG9yIiwiU1R5cGVfYm9vbCIsInN1cHBvcnRlZF90eXBlcyIsImxlZnQiLCJvcCIsInJpZ2h0IiwiY2hpbGQiLCJ2YWx1ZXMiLCJHZW5CaW5hcnlPcGVyYXRvciIsImdlbkJpbmFyeU9wcyIsIkludDJGbG9hdCIsInVuYXJ5X2pzb3AiLCJTVHlwZV9mbG9hdCIsImEiLCJjb252ZXJ0X290aGVyIiwiYiIsImFzRmxvYXQiLCJhc0Zsb2F0SXNPcHQiLCJOdW1iZXIiLCJpZF9qc29wIiwiU1R5cGVfaW50Iiwib3RoZXIiLCJtZXRob2QiLCJfX2ludF9fIiwic2VsZiIsInNlbGZfY29udmVydCIsIl9fbm90X18iLCJHZW5DbXBPcGVyYXRvciIsIlNUeXBlX3N0ciIsInNhbWVfb3JkZXIiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJBc3NpZ25PcGVyYXRvcnMiLCJTVHlwZV9OT1RfSU1QTEVNRU5URUQiLCJibmFtZTJweW5hbWUiLCJhdHRyIiwicmV2ZXJzZWRfb3BlcmF0b3IiLCJmbG9vcmRpdl9pbnQiLCJyZXN1bHQiLCJtb2RfcmVhbCIsIm1vZF9pbnQiLCJtdWx0aV9qc29wIiwiYm5hbWUyanNvcCIsImZpbmRfYW5kX2NhbGxfc3Vic3RpdHV0ZSIsInJldmVyc2VkIiwicnR5cGUiLCJsdHlwZSIsImpzb3AiLCJvcHMiLCJyaWdodHMiLCJjb21wYXJhdG9ycyIsIm9wZXJhbmQiLCJleHByIiwia2V5cyIsImVsdHMiLCJfcl8iLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImJyeXRob25fbm9kZSIsImVycm9yIiwibGluZXMiLCJtIiwiY29udmVydF9saW5lIiwibGFzdCIsInZpcnRfbm9kZSIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsIl9hcmdzIiwiY29udmVydF9hcmciLCJmaXJzdCIsInBhcmVudF9jb250ZXh0IiwiY3JlYXRlIiwibGluZV9vZmZzZXQiLCJjaGFyIiwicGFyc2VFeHByZXNzaW9uIiwiYXN0MmpzX2NvbnZlcnQiLCJwYXJzZVN5bWJvbCIsImJlZ2luX3N0ciIsImNhciIsInN5bWJvbCIsImFzdDJqc19saXRlcmFsc19pbnQiLCJwYXJzZU51bWJlciIsImFzdDJqc19saXRlcmFsc19zdHIiLCJwYXJzZVN0cmluZyIsInBhcnNlVG9rZW4iLCJvcDIiLCJvcDEiLCJwYXJzZU9wZXJhdG9yIiwiZGVmYXVsdCIsIlNCcnl0aG9uIiwicmVnaXN0ZXJlZF9BU1QiLCJicm93c2VyIiwiZ2xvYmFsVGhpcyIsImJ1aWxkTW9kdWxlIiwiRnVuY3Rpb24iLCJydW5KU0NvZGUiLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwiQmluYXJ5T3BlcmF0b3JzIiwianNvcDJweW9wIiwiSlNPcGVyYXRvcnMiLCJvcHRpb25hbCIsIkpTT3BlcmF0b3JzUHJpb3JpdHkiLCJwcmlvcml0eSIsIkxFRlQiLCJSSUdIVCIsInBhcmVudF9vcCIsInBhcmVudF9vcF9kaXIiLCJkaXJlY3Rpb24iLCJjdXJfcHJpb3JpdHkiLCJwYXJlbnRfcHJpb3JpdHkiLCJjaGVja19wcmlvcml0eSIsImdlbkRlZmF1bHRKU1VuYXJpZXMiLCJnZW5EZWZhdWx0SlNDbXBzIiwiZ2VuZXJhdGVDb252ZXJ0IiwicmV0X3R5cGUiLCJvdGhlcl90eXBlIiwibyIsImNvbnZfb3RoZXIiLCJweW9wIiwiX2dlbkNtcCIsImludmVydF9kaXIiLCJ4dCIsInhlIiwiX19sdF9fIiwiX19ndF9fIiwiX19sZV9fIiwiX19nZV9fIiwiZmN0IiwicmZjdCIsInB5MmFzdF9mYXN0Il0sInNvdXJjZVJvb3QiOiIifQ==